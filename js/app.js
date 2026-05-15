async function loadJSON(path){
  const res = await fetch(path + '?v=' + Date.now());
  if(!res.ok) throw new Error(path);
  return res.json();
}
function img(src){ return src || '/images/uploads/hero.jpg'; }

Promise.all([loadJSON('/data/site.json'), loadJSON('/data/projects.json')]).then(([site, projects])=>{
  const project = (projects.items && projects.items[0]) || {};
  const gallery = project.gallery || [];

  document.body.innerHTML = `
  <div class="page">
    <section class="hero">
      <div class="hero-bg"><img src="${img(site.heroImage)}" alt=""></div>

      <nav class="nav">
        <div class="logo-wrap">
          <div class="logo-box"><img src="${img(site.logo)}" alt=""></div>
          <div class="brand">
            <h1>${site.company}</h1>
            <span>${site.address}</span>
          </div>
        </div>

        <div class="menu">
          <a href="#domov">Domov</a>
          <a href="#projekti">Projekti</a>
          <a href="#proces">Proces</a>
          <a href="#kontakt">Kontakt</a>
          <div class="menu-btn"><span></span></div>
        </div>
      </nav>

      <div class="hero-content" id="domov">
        <div class="kicker">${site.heroKicker}</div>
        <h2>${site.heroTitle}</h2>
        <div class="line"></div>
        <p>${site.heroText}</p>
        <div class="actions">
          <a href="#projekti" class="btn">${site.ctaPrimary} →</a>
          <a href="#kontakt" class="link">${site.ctaSecondary}</a>
        </div>
      </div>

      <div class="hero-card">
        <div class="hero-card-item"><strong>Po meri</strong><p>100% unikatno po vaših željah.</p></div>
        <div class="hero-card-item"><strong>Naravni materiali</strong><p>Kakovostni materiali za dolgotrajno uporabo.</p></div>
        <div class="hero-card-item"><strong>Funkcionalno</strong><p>Pametne rešitve za vsakodnevno življenje.</p></div>
      </div>
    </section>

    <section class="featured" id="projekti">
      <div class="featured-grid">
        <div class="featured-img"><img src="${img(project.cover)}" alt=""></div>
        <div class="featured-info">
          <div>
            <div class="small">${project.subtitle || 'Izbrani projekt'}</div>
            <h3>${project.title || 'Projekt'}</h3>
            <div class="line"></div>
            <p>${project.description || ''}</p>
            <br><br>
            <a href="#galerija" class="link">Oglejte si galerijo →</a>
          </div>

          <div class="project-meta">
            <div class="meta-text">
              <div class="small">Lokacija</div>${project.location || ''}
              <br><br>
              <div class="small">Leto</div>${project.year || ''}
              <br><br>
              <div class="small">Tip projekta</div>${project.type || ''}
            </div>
            <div class="meta-img"><img src="${img(project.detail || project.cover)}" alt=""></div>
          </div>
        </div>
      </div>

      <div class="process" id="proces">
        <div class="process-grid">
          <div>
            <div class="small">Naš proces</div>
            <h2>${site.processTitle}</h2>
            <div class="line"></div>
            <p>${site.processText}</p>
          </div>

          <div class="steps">
            ${['Svetovanje','Načrtovanje','Izdelava','Montaža'].map((title,i)=>`
              <div class="step">
                <img src="${img(gallery[i] || project.cover)}" alt="">
                <div class="step-overlay">
                  <div class="step-number">0${i+1}</div>
                  <div><h4>${title}</h4><p>${['Prisluhnemo vašim željam.','Ustvarimo funkcionalne rešitve.','Natančna izdelava v delavnici.','Strokovna montaža pri stranki.'][i]}</p></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="gallery" id="galerija">
        ${gallery.map(src=>`<img src="${img(src)}" alt="">`).join('')}
      </div>

      <div class="bottom" id="kontakt">
        <div class="bottom-img"><img src="${img(gallery[0] || project.cover)}" alt=""></div>
        <div class="bottom-block">
          <div class="small">Vsak detajl ima namen</div>
          <h3>${site.footerText}</h3>
          <p>Izbrani materiali, natančna izdelava in dovršeni detajli.</p>
        </div>
        <div class="bottom-block contact">
          <div class="small">Ustvarimo nekaj skupaj</div>
          <h3>${site.footerTitle}</h3>
          <div>☎ ${site.phone}</div>
          <div>✉ ${site.email}</div>
          <div>⌖ ${site.address}</div>
        </div>
      </div>
    </section>
  </div>`;
}).catch(()=>{
  document.body.innerHTML = '<div class="loading">Napaka pri nalaganju podatkov. Preveri mapo /data.</div>';
});