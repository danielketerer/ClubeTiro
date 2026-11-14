import type {ManagerState,StockItem} from './manager-domain';
export type StockCategory='AMMUNITION_ORIGINAL'|'RELOADING_INPUT'|'AMMUNITION_RELOADED'|'PPE'|'OTHER';
export const stockCategoryLabels:Record<StockCategory,string>={AMMUNITION_ORIGINAL:'Munição original',RELOADING_INPUT:'Insumo de recarga',AMMUNITION_RELOADED:'Munição recarregada pronta',PPE:'EPI',OTHER:'Outro material'};
export const stockCategory=(item:StockItem):StockCategory=>item.category||(item.caliber?'AMMUNITION_ORIGINAL':'OTHER');
export const canConsumeAmmo=(item:StockItem)=>!!item.caliber&&['AMMUNITION_ORIGINAL','AMMUNITION_RELOADED'].includes(stockCategory(item));
/** Adds inventory examples once and preserves existing balances and movements. */
export function normalizeStock(s:ManagerState):ManagerState {
for(const item of s.stock)item.category??=stockCategory(item);
for(const clubId of ['a','b']){
const examples:StockItem[]=[{id:clubId+'-reloaded9',clubId,category:'AMMUNITION_RELOADED',name:'Munição recarregada 9 mm · fictícia',caliber:'9 mm',unit:'unidades',lot:'REC-DEMO-9-'+clubId,balance:60,minimum:50,movements:[]},{id:clubId+'-cases9',clubId,category:'RELOADING_INPUT',name:'Estojos vazios 9 mm · insumo fictício',caliber:'9 mm',unit:'unidades',lot:'INS-EST-DEMO-'+clubId,balance:200,minimum:100,movements:[]},{id:clubId+'-projectiles9',clubId,category:'RELOADING_INPUT',name:'Projéteis 9 mm · insumo fictício',caliber:'9 mm',unit:'unidades',lot:'INS-PROJ-DEMO-'+clubId,balance:40,minimum:50,movements:[]},{id:clubId+'-earmuffs',clubId,category:'PPE',name:'Protetores auriculares',unit:'unidades',lot:'EPI-AUR-DEMO-'+clubId,balance:12,minimum:10,movements:[]},{id:clubId+'-glasses',clubId,category:'PPE',name:'Óculos de proteção',unit:'unidades',lot:'EPI-OC-DEMO-'+clubId,balance:6,minimum:8,movements:[]},{id:clubId+'-earplugs',clubId,category:'PPE',name:'Protetores auriculares descartáveis',unit:'pares',lot:'EPI-DESC-DEMO-'+clubId,balance:50,minimum:20,movements:[]},{id:clubId+'-cleaning',clubId,category:'OTHER',name:'Materiais de limpeza do clube',unit:'kits',lot:'MAT-LIMP-DEMO-'+clubId,balance:10,minimum:15,movements:[]},{id:clubId+'-tape',clubId,category:'OTHER',name:'Fitas para fixação de alvos',unit:'rolos',lot:'MAT-FITA-DEMO-'+clubId,balance:20,minimum:10,movements:[]}];
for(const item of examples)if(!s.stock.some(i=>i.id===item.id))s.stock.push(item);
}
return s;
}
