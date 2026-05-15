async function loadContent(){
  const fallback = await fetch('data/content.json').then(r=>r.json());
  const local = JSON.parse(localStorage.getItem('jollysContent') || 'null');
  const data = local || fallback;
  const $ = id => document.getElementById(id);
  ['brand','address','heroTitle','heroText','ctaPrimary','ctaSecondary','aboutTitle','aboutText'].forEach(k=>{ if($(k)) $(k).textContent=data[k]||''; });
  $('address2').textContent=data.address; $('phone').textContent=data.phone; $('phone').href='tel:'+data.phone.replaceAll(' ',''); $('email').textContent=data.email; $('email').href='mailto:'+data.email;
  $('services').innerHTML=(data.services||[]).map(s=>`<div class="service">${s}</div>`).join('');
  $('projects').innerHTML=(data.projects||[]).map(p=>`<article class="project"><img src="${p.image}" alt="${p.title}"><h3>${p.title}</h3></article>`).join('');
  $('year').textContent=new Date().getFullYear();
}
loadContent();
