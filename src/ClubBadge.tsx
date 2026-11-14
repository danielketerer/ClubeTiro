import {clubs} from './domain';
export function ClubBadge({club}:{club:string}){const item=clubs.find(c=>c.id===club);return club==='a'?<img className="clubicon clublogo" src="/brand/clube-horizonte-logo.png" alt="Logo fictício do Clube Horizonte" width={36} height={36}/>:<span className="clubicon">{item?.initials||'CL'}</span>}
