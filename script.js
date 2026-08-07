
const LANGS=['ru','en','fi','et','pom'];
function currentLang(){return localStorage.getItem('bjarmkirja-lang')||'ru'}
function setLang(lang,btn){
  localStorage.setItem('bjarmkirja-lang',lang);
  document.documentElement.lang=lang;
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  document.querySelectorAll('[data-ru][data-en][data-fi][data-et][data-pom]').forEach(el=>{
    const text=el.getAttribute('data-'+lang);
    if(text!==null) el.innerHTML=text;
  });
  document.querySelectorAll('input[data-ru-placeholder]').forEach(input=>{
    const p=input.getAttribute('data-'+lang+'-placeholder');
    if(p) input.placeholder=p;
  });
  document.querySelectorAll('[data-lang-link]').forEach(a=>{
    const base=a.getAttribute('href-base')||a.getAttribute('href');
    if(base) a.href=base;
  });
  if(typeof updateLanguageFiles==='function') updateLanguageFiles(lang);
}
function initLang(){
  const lang=currentLang();
  const btn=document.querySelector('.lang-btn[data-lang="'+lang+'"]')||document.querySelector('.lang-btn[data-lang="ru"]');
  setLang(lang,btn);
}
function langButtons(){
 return LANGS.map(l=>`<button class="lang-btn" data-lang="${l}" onclick="setLang('${l}',this)">${l.toUpperCase()}</button>`).join('');
}
function filterPeople(people){
 document.querySelectorAll('[data-people]').forEach(el=>el.style.display=(people==='all'||el.dataset.people===people)?'':'none');
}
document.addEventListener('DOMContentLoaded',initLang);
