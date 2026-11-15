/** Presentation DTO: the demo never creates or stores a complete CPF. */
export interface AffiliateIdentity {name:string;cpfMasked:string}
export function maskCpf(value?:string):string {if(!value)return '***.***.***-**';if(/^\*{3}\.\d{3}\.\d{3}-\*{2}$/.test(value))return value;const digits=value.replace(/\D/g,'');return digits.length===11?`***.${digits.slice(3,6)}.${digits.slice(6,9)}-**`:'***.***.***-**'}
export function demoMaskedCpf(name:string):string {let hash=2166136261;for(const character of name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase())hash=Math.imul(hash^character.charCodeAt(0),16777619)>>>0;const middle=String(hash%1000000).padStart(6,'0');return `***.${middle.slice(0,3)}.${middle.slice(3)}-**`}
export function affiliateLabel(name:string,cpfMasked?:string):string{return `${name} · CPF ${maskCpf(cpfMasked||demoMaskedCpf(name))}`}
