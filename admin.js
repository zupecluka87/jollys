let data={};
const fields=['brand','address','phone','email','heroTitle','heroText','ctaPrimary','ctaSecondary','aboutTitle','aboutText'];
async function init(){data=JSON.parse(localStorage.getItem('jollysContent')||'null')||await fetch('data/content.json').then(r=>r.json());fields.forEach(k=>document.getElementById(k).value=data[k]||'');document.getElementById('services').value=(data.services||[]).join('\n');renderProjects();}
function renderProjects(){document.getElementById('projects').innerHTML=(data.projects||[]).map((p,i)=>`<div class="project-edit"><input value="${p.title||''}" onchange="data.projects[${i}].title=this.value" placeholder="Naslov"><input value="${p.image||''}" onchange="data.projects[${i}].image=this.value" placeholder="Pot do slike, npr. images/slika.jpg"><button class="btn" onclick="data.projects.splice(${i},1);renderProjects()">X</button></div>`).join('')}
function collect(){fields.forEach(k=>data[k]=document.getElementById(k).value);data.services=document.getElementById('services').value.split('\n').map(x=>x.trim()).filter(Boolean);return data;}
function addProject(){data.projects=data.projects||[];data.projects.push({title:'Nov projekt',image:'images/project-1.svg'});renderProjects();}
function saveLocal(){localStorage.setItem('jollysContent',JSON.stringify(collect(),null,2));alert('Shranjeno za predogled v tem brskalniku.');}
function exportJson(){const blob=new Blob([JSON.stringify(collect(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='content.json';a.click();}
init();
