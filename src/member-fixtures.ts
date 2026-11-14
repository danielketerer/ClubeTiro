import type {ManagerState,Membership,Charge} from './manager-domain';
const common=['Camila Rocha','Bruno Ferreira','Juliana Mendes','Felipe Cardoso','Larissa Teixeira','André Nascimento'];
const horizon=[...common,'Renata Alves','Diego Monteiro','Patrícia Ramos','Gustavo Ribeiro','Mariana Azevedo','Thiago Barros','Fernanda Dias','Rodrigo Vieira','Carolina Batista','Eduardo Freitas','Isabela Moreira','Leandro Castro','Natália Campos','Ricardo Pires','Vanessa Duarte','Marcelo Farias','Aline Correia','Henrique Melo','Priscila Tavares','Caio Martins','Débora Lima'];
const serra=[...common,'Gabriela Cunha','Vinícius Borges','Luana Rezende','Daniela Lopes','Rafael Torres','Letícia Moura','Igor Santana','Amanda Brito','César Neves','Bianca Peixoto','Alexandre Nunes','Jéssica Silveira','Vítor Guimarães','Sabrina Matos','Otávio Sales','Cláudia Reis','Fábio Coelho','Mônica Leite','Paulo Assis','Elisa Fonseca','Renan Costa'];
/** Independent 3 × 3 × 3 scenarios for membership, finances and documents. */
export function addMemberFixtures(state:ManagerState):ManagerState {
for(const clubId of ['a','b']){
const names=clubId==='a'?horizon:serra;const offset=clubId==='a'?0:1;
for(let i=0;i<27;i++){
const id=`${clubId}-affiliate-demo-${String(i+1).padStart(2,'0')}`;
if(state.memberships.some(m=>m.id===id))continue;
const term=(Math.floor(i/9)+offset)%3,finance=(Math.floor(i/3)+offset)%3,doc=(i+(offset?2:0))%3;
const soon=['2026-11-15','2026-11-18','2026-11-21','2026-11-24','2026-11-27','2026-11-30','2026-12-03','2026-12-08','2026-12-12'];
const expiresOn=term===0?`2027-${String(2+i%8).padStart(2,'0')}-15`:term===1?soon[i%9]:`2026-${String(8+i%3).padStart(2,'0')}-${String(10+i%15).padStart(2,'0')}`;
const member:Membership={id,clubId,personId:i<6?'shared-affiliate-'+i:clubId+'-affiliate-person-'+i,name:names[i],startsOn:'2025-01-01',expiresOn,documentStatus:(['Validado','Em análise','Vencido'] as const)[doc],documentedCalibers:i%2?['.22 LR']:['.22 LR','9 mm'],renewals:[]};
const charge:Charge={id:id+'-annual',clubId,membershipId:id,kind:'Filiação',amount:clubId==='a'?420+i%5*20:560+i%4*25,dueOn:finance===0?'2026-11-01':finance===1?`2026-11-${String(1+i%10).padStart(2,'0')}`:`2026-12-${String(1+i%10).padStart(2,'0')}`,status:finance===0?'Pago':'Aberto',...(finance===0?{payment:{id:id+'-payment',paidOn:'2026-11-01',method:'Pix fictício',by:'Daniel Keterer'}}:{})};
state.memberships.push(member);state.charges.push(charge);
}
}
return state;
}
