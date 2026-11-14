import {Users,CalendarDays,Clock,AlertCircle,Wallet,FileText,ArrowUpRight,LucideIcon} from 'lucide-react';
import {Membership,Charge,scenarioDate,money} from './manager-domain';
import './membership-summary.css';
const next30=new Date(new Date(scenarioDate+'T12:00:00Z').getTime()+30*86400000).toISOString().slice(0,10);
export const membershipFilterLabels:Record<string,string>={vigentes:'Filiações com vigência atual',proximas:'Filiações que vencem nos próximos 30 dias',vencidas:'Filiações vencidas',atraso:'Associados com cobranças em atraso',documentos:'Associados com pendências documentais',vencendo:'Filiações com vencimento até 14/12/2026, incluindo vencidas'};
export function matchesMembershipFilter(member:Membership,charges:Charge[],filter:string){
switch(filter){case 'vigentes':return member.startsOn<=scenarioDate&&member.expiresOn>=scenarioDate;
case 'proximas':return member.expiresOn>=scenarioDate&&member.expiresOn<=next30;
case 'vencidas':return member.expiresOn<scenarioDate;
case 'atraso':return charges.some(c=>c.clubId===member.clubId&&c.membershipId===member.id&&c.status!=='Pago'&&c.dueOn<scenarioDate);
case 'documentos':return member.documentStatus!=='Validado';
case 'vencendo':return member.expiresOn<=next30;
default:return true;}
}
function CounterCard({label,count,hint,Icon,tone,active,onClick}:{label:string;count:number;hint:string;Icon:LucideIcon;tone:string;active:boolean;onClick:()=>void}){return <button type="button" className={'stat membercounter '+tone+(active?' selected':'')} aria-pressed={active} onClick={onClick}><div><span>{label}</span><span className="countericon"><Icon size={17}/></span></div><strong>{count.toString().padStart(2,'0')}</strong><small>{hint}</small><span className="counteraction">{active?'Filtro selecionado':'Consultar associados'}<ArrowUpRight size={13}/></span></button>}
export function MembershipSummary({members,charges,filter,onFilter}:{members:Membership[];charges:Charge[];filter:string;onFilter:(filter:string)=>void}){
const count=(filter:string)=>members.filter(m=>matchesMembershipFilter(m,charges,filter)).length;
const overdueAmount=charges.filter(c=>c.status!=='Pago'&&c.dueOn<scenarioDate&&members.some(m=>m.clubId===c.clubId&&m.id===c.membershipId)).reduce((sum,c)=>sum+c.amount,0);
const cards=[{id:'',label:'Total de associados',count:members.length,hint:'Vínculos cadastrados neste clube',Icon:Users,tone:'neutral'},{id:'vigentes',label:'Filiações vigentes',count:count('vigentes'),hint:'Somente a vigência da filiação',Icon:CalendarDays,tone:'green'},{id:'proximas',label:'Prestes a vencer',count:count('proximas'),hint:'De 14/11 a 14/12/2026 · próximos 30 dias',Icon:Clock,tone:'amber'},{id:'vencidas',label:'Filiações vencidas',count:count('vencidas'),hint:'Vigência anterior à data do cenário',Icon:AlertCircle,tone:'red'},{id:'atraso',label:'Associados inadimplentes',count:count('atraso'),hint:money(overdueAmount)+' em cobranças vencidas',Icon:Wallet,tone:'red'},{id:'documentos',label:'Pendências documentais',count:count('documentos'),hint:'Associados com documento vencido ou em análise',Icon:FileText,tone:'amber'}];
return <section aria-label="Resumo dos associados" className="membershipsummary"><div className="summarycaption"><span>RESUMO DO CLUBE ATIVO</span><small>Clique em um contador para filtrar a lista. Os grupos podem se sobrepor.</small></div><div className="membercountergrid">{cards.map(c=><CounterCard key={c.id} label={c.label} count={c.count} hint={c.hint} Icon={c.Icon} tone={c.tone} active={filter===c.id} onClick={()=>onFilter(filter===c.id?'':c.id)}/>)}</div></section>;
}
