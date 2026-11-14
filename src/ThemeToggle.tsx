import {useEffect,useState} from 'react';
import {Moon,Sun} from 'lucide-react';
const storageKey='elo-theme';
function preferredTheme(){try{const saved=localStorage.getItem(storageKey);if(saved==='light'||saved==='dark')return saved}catch{}return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
export function ThemeToggle(){const[theme,setTheme]=useState(preferredTheme);const dark=theme==='dark';
useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;document.documentElement.style.backgroundColor=dark?'#0f0f10':'#f5f5f5';document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#0f0f10':'#f5f5f5')},[theme,dark]);
useEffect(()=>{const media=window.matchMedia('(prefers-color-scheme: dark)');const systemChange=()=>{try{if(!localStorage.getItem(storageKey))setTheme(preferredTheme())}catch{setTheme(preferredTheme())}};const storageChange=(e:StorageEvent)=>{if(e.key===storageKey||e.key===null)setTheme(preferredTheme())};media.addEventListener('change',systemChange);window.addEventListener('storage',storageChange);return()=>{media.removeEventListener('change',systemChange);window.removeEventListener('storage',storageChange)}},[]);
return <button type="button" className="theme-toggle" aria-label={dark?'Ativar tema claro':'Ativar tema escuro'} title={dark?'Ativar tema claro':'Ativar tema escuro'} aria-pressed={dark} onClick={()=>{const next=dark?'light':'dark';setTheme(next);try{localStorage.setItem(storageKey,next)}catch{}}}>{dark?<Sun size={17}/>:<Moon size={17}/>}<span className="theme-toggle-label">Tema</span></button>;
}
