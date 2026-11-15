import {demoMaskedCpf,maskCpf} from './affiliate-identity';
import {normalizeFinance} from './finance-domain';
import {addMemberFixtures} from './member-fixtures';
import {normalizeStock} from './stock-types';
import type {ManagerState} from './manager-domain';
export interface ClubOperationSettings {clubId:string;entryMode:'Livre'|'Agendamento';identification:'Facial simulada'|'Recepção';trackLanes:boolean;laneFee:'Gratuita'|'Inclusa na filiação'|'Por sessão'|'Por hora';lanePrice:number;rentWeapons:boolean;weaponPrice:number;supplyAmmo:boolean;chargeAmmo:boolean;ammoPrices:Record<string,number>}
export interface Attendance {id:string;clubId:string;membershipId:string;enteredAt:string;identification:'Facial simulada'|'Recepção';scheduledFor?:string;status:'Presente'|'Em prática'|'Finalizado';sessionId?:string}
export interface SessionConsumption {source:'Clube'|'Própria';itemId:string;caliber:string;quantity:number}
export interface SessionBillLine {description:string;quantity:number;unitPrice:number;total:number}
export interface SessionOperationFields {attendanceId?:string;calibers?:string[];weaponSource?:'Clube'|'Própria'|'Sem arma';ownWeaponReference?:string;pricingSnapshot?:ClubOperationSettings;consumptions?:SessionConsumption[];billLines?:SessionBillLine[];billTotal?:number;durationMinutes?:number;chargeId?:string}
export const demoCalibers=['.22 LR','9 mm'];
export const defaultOperationSettings=():ClubOperationSettings[]=>['a','b'].map(clubId=>({clubId,entryMode:'Livre',identification:'Facial simulada',trackLanes:clubId==='b',laneFee:clubId==='a'?'Inclusa na filiação':'Por sessão',lanePrice:clubId==='a'?0:60,rentWeapons:clubId==='b',weaponPrice:35,supplyAmmo:true,chargeAmmo:true,ammoPrices:{'.22 LR':2,'9 mm':3}}));
export function normalizeOperations(data:ManagerState):ManagerState {
const s=JSON.parse(JSON.stringify(data)) as ManagerState;
s.attendances??=[];s.operationSettings??=defaultOperationSettings();
for(const staff of s.staff)if(staff.role==='Gestor'&&staff.name==='Ana Martins')staff.name='Daniel Keterer';
for(const member of s.memberships)member.cpfMasked=member.cpfMasked?maskCpf(member.cpfMasked):demoMaskedCpf(member.name);
for(const member of s.memberships)member.documentedCalibers??=['.22 LR','9 mm'];
for(const weapon of s.weapons)weapon.caliber??=weapon.id.endsWith('-2')?'9 mm':'.22 LR';
for(const item of s.stock){if(item.id.endsWith('-ammo'))item.caliber??='.22 LR'}
for(const clubId of ['a','b'])if(!s.stock.some(i=>i.id===clubId+'-ammo9'))s.stock.push({id:clubId+'-ammo9',clubId,name:'Munição 9 mm · fictícia',caliber:'9 mm',unit:'unidades',lot:'LOTE-DEMO-9-'+clubId,balance:120,minimum:50,movements:[]});
for(const session of s.sessions){session.calibers??=['.22 LR'];session.weaponSource??=session.weaponId?'Clube':'Própria';session.pricingSnapshot??=s.operationSettings.find(c=>c.clubId===session.clubId)}
const result=normalizeFinance(addMemberFixtures(normalizeStock(s)));for(const member of result.memberships)member.cpfMasked=member.cpfMasked?maskCpf(member.cpfMasked):demoMaskedCpf(member.name);return result;
}
