import {State} from './domain';
import {ManagerState} from './manager-domain';
/** Projects operational changes into the existing simulated instructor/athlete API. */
export function mergeManagerChanges(previous:ManagerState,next:ManagerState,legacy:State):State{
let links=[...legacy.links];
for(const staff of next.staff.filter(s=>s.role==='Instrutor')){const old=previous.staff.find(s=>s.id===staff.id);if(old?.status===staff.status)continue;links=links.filter(l=>!(l.club===staff.clubId&&l.instructor===staff.name));if(staff.status!=='Encerrado')links.push({club:staff.clubId,instructor:staff.name,status:staff.status==='Ativo'?'Ativo':'Solicitado'})}
const generated=(s:ManagerState)=>s.practices.filter(p=>!p.sessionId.endsWith('previous'));
const ownedIds=new Set([...generated(previous),...generated(next)].map(p=>p.id));
const practices=legacy.practices.filter(p=>!ownedIds.has(p.id));
for(const p of generated(next))practices.unshift({id:p.id,club:p.clubId,athlete:p.athlete,cpfMasked:p.cpfMasked,date:p.date,calibers:p.calibers,modality:p.modality,type:'Treino',author:p.author,status:p.status,reviews:p.revisions.map(r=>({date:r.at.slice(0,10),author:r.by,status:r.status as 'Validado'|'Devolvido',reason:r.reason}))});
return {...legacy,links,practices};
}
