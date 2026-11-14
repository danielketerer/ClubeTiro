export type PortalDecision='manager'|'redirect-manager'|'denied'|'member';
export function resolvePortal(profile:string,path:string):PortalDecision{if(profile==='gestor')return path.startsWith('/gestor/')?'manager':'redirect-manager';return path.startsWith('/gestor')||['/pessoas','/relatorios'].includes(path)?'denied':'member'}
