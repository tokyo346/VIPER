/* ============================================================
   CONTENT MODEL — everything editable lives here, persisted as one object
   ============================================================ */
const DEFAULT_CONTENT = {
  heroEyebrow: "Neglected Tropical Disease No. 11",
  heroTitle: "Kenya counts its <em>snakebite</em> dead in silence. Baringo is done waiting.",
  heroLede: "V.I.P.E.R is a community-rooted drive confronting snake envenomation through education, rapid response, and direct support for the households carrying the heaviest bite burden in Kenya.",
  heroStatBig: "411",
  heroStatCap: "snakebite cases per 100,000 people per year recorded in Baringo County — the second-highest rate in Kenya, behind only Turkana.",
  heroStatFoot: "Source: nationwide community survey, PLOS Neglected Tropical Diseases, 2023.",
  aboutIntro: "In June 2017 the World Health Organization re-classified snakebite envenoming as a neglected tropical disease — a problem big enough to kill, yet small enough on paper to be forgotten by budgets. V.I.P.E.R exists to make sure Baringo is not forgotten.",
  aboutMission: "We educate herders and households on safe coexistence with snakes, equip the most exposed homes with lamps and protective gumboots, document and follow up on bite cases, and push for better-stocked, closer health facilities so a bite is a treatable emergency — not a death sentence.",
  missionPoints: [
    {title:"Educate", text:"Community sessions on snake identification, avoidance behaviour, and what to do — and not do — in the first minutes after a bite."},
    {title:"Equip", text:"Distributing solar lamps and gumboots to herding and farming households, the two interventions shown to cut night-time and field bites."},
    {title:"Document", text:"A living case registry of bites and outcomes in Baringo, closing the gap between hospital records and what is really happening in villages."},
    {title:"Advocate", text:"Campaigning county and national health authorities for antivenom stock, trained staff, and facilities closer to bite hot-spots."}
  ],
  mpesaNumber: "Till No. 000000",
  contactEmail: "info@viperinitiative.org",
  contactPhone: "+254 700 000 000",
  contactLocation: "Kabarnet, Baringo County, Kenya",

  galleryItems: [
    {color:"#4B5A2A", caption:"Lamp distribution, Baringo South"},
    {color:"#B5402A", caption:"Community education session"},
    {color:"#D9A53B", caption:"Gumboot handover, herding household"},
    {color:"#36421C", caption:"Field case-mapping exercise"},
    {color:"#221F18", caption:"Committee site visit"},
    {color:"#6B5B36", caption:"Health facility advocacy meeting"}
  ],

  blogPosts: [
    {date:"12 May 2026", title:"Why a gumboot can be the difference between a story and a statistic", excerpt:"Most Baringo bites we log happen below the knee, after dark, on the walk between the cattle pen and the house. A simple pair of boots changes that walk entirely."},
    {date:"02 Apr 2026", title:"What the WHO's 2017 listing actually changed — and what it didn't", excerpt:"Snakebite envenoming became an official neglected tropical disease nine years ago. We look at what that reclassification unlocked, and where the gaps still sit."},
    {date:"21 Feb 2026", title:"Inside a traditional remedy conversation, without judgement", excerpt:"A third of survivors in published Baringo case data used traditional remedies first. We talk to elders about why, and where education — not dismissal — moves the needle."}
  ],

  events: [
    {date:"2026-07-18", title:"Household Equipping Day — Marigat", location:"Marigat, Baringo South", description:"Distribution of solar lamps and gumboots to registered herding households."},
    {date:"2026-08-09", title:"Community Education Session — Kabarnet", location:"Kabarnet Chief's Camp", description:"Snake identification and first-response training open to the public."},
    {date:"2026-09-02", title:"County Health Advocacy Meeting", location:"Baringo County Offices", description:"Presenting case registry data to county health officials, pushing for antivenom stocking."}
  ],

  committee: {
    ceo: {name:"Program Director", role:"Chief Executive Officer", initials:"CEO", color:"#B5402A"},
    topThree: [
      {name:"Deputy Director", role:"Vice Chairperson", initials:"VC", color:"#4B5A2A"},
      {name:"Secretary", role:"Records & Communication", initials:"SC", color:"#D9A53B"},
      {name:"Treasurer", role:"Finance & Resources", initials:"TR", color:"#36421C"}
    ],
    constituencyReps: [
      {constituency:"Baringo Central", name:"Representative — Baringo Central", role:"Constituency Coordinator", initials:"BC", color:"#6B5B36"},
      {constituency:"Baringo North", name:"Representative — Baringo North", role:"Constituency Coordinator", initials:"BN", color:"#4B5A2A"},
      {constituency:"Baringo South", name:"Representative — Baringo South", role:"Constituency Coordinator", initials:"BS", color:"#B5402A"},
      {constituency:"Eldama Ravine", name:"Representative — Eldama Ravine", role:"Constituency Coordinator", initials:"ER", color:"#D9A53B"},
      {constituency:"Mogotio", name:"Representative — Mogotio", role:"Constituency Coordinator", initials:"MG", color:"#36421C"},
      {constituency:"Tiaty", name:"Representative — Tiaty", role:"Constituency Coordinator", initials:"TT", color:"#221F18"}
    ]
  }
};

function deepClone(o){ return JSON.parse(JSON.stringify(o)); }

function loadContent(){
  try{
    const raw = localStorage.getItem('viper_content');
    if(raw){
      const parsed = JSON.parse(raw);
      const merged = Object.assign({}, DEFAULT_CONTENT, parsed);
      merged.committee = Object.assign({}, DEFAULT_CONTENT.committee, parsed.committee || {});
      return merged;
    }
  }catch(e){}
  return deepClone(DEFAULT_CONTENT);
}
function saveContent(c){ try{ localStorage.setItem('viper_content', JSON.stringify(c)); }catch(e){} }
let CONTENT = loadContent();

function loadList(key){
  try{ const raw = localStorage.getItem(key); if(raw) return JSON.parse(raw); }catch(e){}
  return [];
}
function saveList(key, list){ try{ localStorage.setItem(key, JSON.stringify(list)); }catch(e){} }

/* ============================================================
   SNAKE LIBRARY — original vector line illustrations (not photos,
   to keep things accurate without relying on external/copyrighted images)
   ============================================================ */
function snakeSvg(pattern, base){
  const bodies = {
    adder: `<path d="M15 60 Q35 20 65 45 Q90 65 100 35" stroke="${base}" stroke-width="16" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="35" rx="9" ry="6" fill="${base}"/>`,
    cobra: `<path d="M20 70 Q30 30 55 50 Q60 20 50 5" stroke="${base}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M35 35 Q48 15 62 25 Q55 8 38 10 Q22 15 35 35" fill="${base}" opacity="0.9"/><ellipse cx="50" cy="8" rx="6" ry="5" fill="${base}"/>`,
    tree: `<path d="M10 70 Q40 75 45 45 Q50 15 75 25 Q95 33 95 15" stroke="${base}" stroke-width="11" fill="none" stroke-linecap="round"/><ellipse cx="95" cy="15" rx="6" ry="4.5" fill="${base}"/>`,
    mamba: `<path d="M10 65 Q45 55 55 30 Q65 10 95 15" stroke="${base}" stroke-width="12" fill="none" stroke-linecap="round"/><ellipse cx="95" cy="15" rx="6.5" ry="5" fill="${base}"/>`,
    sand: `<path d="M10 50 Q30 35 50 50 Q70 65 95 45" stroke="${base}" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="95" cy="45" rx="5" ry="4" fill="${base}"/>`
  };
  const body = bodies[pattern] || bodies.adder;
  return `<svg viewBox="0 0 110 80" style="width:100%; height:100%;"><rect width="110" height="80" fill="${base}" opacity="0.1"/>${body}</svg>`;
}

const SNAKES = [
  {name:"Puff Adder", latin:"Bitis arietans", risk:"High", note:"Responsible for the majority of documented bites in Baringo's puff adder case series; sluggish, often stepped on rather than seen.", color:"#6B5B36", svg:snakeSvg('adder','#6B5B36'), img:"https://commons.wikimedia.org/wiki/Special:FilePath/Bitis%20arietans%202010.JPG"},
  {name:"Black-necked Spitting Cobra", latin:"Naja nigricollis", risk:"High", note:"Can spit venom toward the eyes from a distance; causes severe tissue damage if bitten.", color:"#23211C", svg:snakeSvg('cobra','#23211C'), img:"https://commons.wikimedia.org/wiki/Special:FilePath/N.nigricollis.jpg"},
  {name:"Egyptian Cobra", latin:"Naja haje", risk:"High", note:"Large, fast-moving, found near homesteads and granaries hunting rodents.", color:"#3A3424", svg:snakeSvg('cobra','#3A3424'), img:"https://commons.wikimedia.org/wiki/Special:FilePath/N.haje%20Morocco.jpg"},
  {name:"Boomslang", latin:"Dispholidus typus", risk:"Moderate", note:"Tree-dwelling; bite causes delayed but serious bleeding disorders.", color:"#4B5A2A", svg:snakeSvg('tree','#4B5A2A'), img:"https://commons.wikimedia.org/wiki/Special:FilePath/Dispholidus%20typus.jpg"},
  {name:"Black Mamba", latin:"Dendroaspis polylepis", risk:"Severe", note:"Highly venomous and fast; rare bites but historically high fatality without rapid antivenom.", color:"#15130F", svg:snakeSvg('mamba','#15130F'), img:"https://commons.wikimedia.org/wiki/Special:FilePath/Dendroaspis%20polylepis%20Schwarze%20mamba.jpg"},
  {name:"East African Sand Snake", latin:"Psammophis spp.", risk:"Low", note:"Common and fast-moving but mostly non-dangerous to humans; frequently mistaken for dangerous species.", color:"#B5402A", svg:snakeSvg('sand','#B5402A'), img:null}
];

function scaleDivider(){
  let path = "M0 7 ";
  for(let x=0; x<=1400; x+=28){ path += `Q${x+14} ${x%56===0?1:13} ${x+28} 7 `; }
  return `<div class="scaleline"><svg viewBox="0 0 1400 14" preserveAspectRatio="none"><path d="${path}" stroke="#B5402A" stroke-width="2" fill="none" opacity="0.55"/></svg></div>`;
}

/* ============================================================
   PAGE TEMPLATES
   ============================================================ */
function pageHome(){
  return `
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <span class="eyebrow" style="color:var(--venom);">${CONTENT.heroEyebrow}</span>
        <h1>${CONTENT.heroTitle}</h1>
        <p class="lede">${CONTENT.heroLede}</p>
        <div class="hero-actions">
          <a href="report.html" class="cta-pill">Report a Snakebite Case</a>
          <a href="about.html" class="btn-ghost">Learn About the Drive</a>
        </div>
      </div>
      <div class="stat-card">
        <span class="eyebrow" style="color:var(--venom);">The Baringo Burden</span>
        <div class="stat-big">${CONTENT.heroStatBig}<span style="font-size:1.6rem;">/100k</span></div>
        <p class="stat-cap">${CONTENT.heroStatCap}</p>
        <div class="stat-foot">${CONTENT.heroStatFoot}</div>
      </div>
    </div>
  </section>
  ${scaleDivider()}
  <section>
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">The Problem</span>
        <h2>A disease the world agreed to notice, and then mostly forgot.</h2>
        <p>Snakebite envenoming kills an estimated 81,000–138,000 people globally each year and disables hundreds of thousands more — yet it competes for almost none of the attention given to other neglected tropical diseases. In Kenya, the burden is sharply uneven: Turkana and Baringo counties carry rates more than ten times the national average.</p>
      </div>
      <div class="grid-3">
        <div class="card">
          <span class="tag rust">Incidence</span>
          <h3>411 per 100,000</h3>
          <p>Baringo's annual snakebite incidence, the second-highest of any county surveyed nationwide — close behind Turkana at 413.</p>
        </div>
        <div class="card">
          <span class="tag">Care gap</span>
          <h3>1 in 3 use traditional remedies</h3>
          <p>Documented Baringo survivors often turn to traditional remedies before, or instead of, a health facility — frequently due to distance and cost.</p>
        </div>
        <div class="card">
          <span class="tag venom">Global scale</span>
          <h3>~138,000 deaths a year</h3>
          <p>The upper estimate of annual global snakebite deaths, a toll the WHO formally recognised as a neglected tropical disease in 2017.</p>
        </div>
      </div>
    </div>
  </section>
  <section class="olive">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow" style="color:var(--venom);">What We Do</span>
        <h2>Four interventions, one village at a time.</h2>
      </div>
      <div class="grid-2">
        ${CONTENT.missionPoints.map((m,i)=>`
          <div class="panel" style="background:rgba(248,244,233,0.06); border-color:rgba(239,231,211,0.18); color:var(--sand);">
            <span class="eyebrow" style="color:var(--venom);">0${i+1}</span>
            <h3 style="font-family:var(--font-display); margin:10px 0 8px;">${m.title}</h3>
            <p style="color:rgba(239,231,211,0.78); font-size:0.92rem; line-height:1.6;">${m.text}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  <section>
    <div class="wrap mpesa-box">
      <div>
        <span class="eyebrow" style="color:var(--venom);">Support Directly</span>
        <h2 style="font-family:var(--font-display); margin:10px 0 6px; font-size:1.6rem;">One lamp. One pair of boots. One fewer bite.</h2>
        <p style="color:var(--sand-dim); max-width:420px; font-size:0.92rem;">Every contribution is tracked against equipment delivered to named households in Baringo.</p>
      </div>
      <div style="text-align:right;">
        <div class="eyebrow" style="color:var(--venom); justify-content:flex-end;">M-Pesa</div>
        <div class="mpesa-number" id="mpesaDisplay">${CONTENT.mpesaNumber}</div>
        <button class="copy-btn" id="copyMpesa">Copy Number</button>
      </div>
    </div>
  </section>
  `;
}

function pageAbout(){
  return `
  <section style="padding-top:64px;">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">About V.I.P.E.R</span>
        <h2>Venom Intervention, Prevention, Education and Response.</h2>
        <p>${CONTENT.aboutIntro}</p>
      </div>
      <div class="grid-2" style="margin-bottom:50px;">
        <div class="panel">
          <span class="eyebrow">Our Mission</span>
          <p style="margin-top:12px; line-height:1.65; font-size:0.96rem;">${CONTENT.aboutMission}</p>
        </div>
        <div class="panel">
          <span class="eyebrow">Why Baringo First</span>
          <p style="margin-top:12px; line-height:1.65; font-size:0.96rem;">Baringo records one of the highest community snakebite incidence rates documented anywhere in Kenya — 411 cases per 100,000 people a year, behind only Turkana. Bites cluster among pastoralist households doing night-time herding, water collection, and field work, often far from the nearest stocked health facility. We start here because the data — and the people — say we must.</p>
        </div>
      </div>
    </div>
  </section>
  ${scaleDivider()}
  <section>
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">How The Drive Works</span>
        <h2>From a bite, to a case, to a change.</h2>
      </div>
      <div class="timeline">
        <div class="step"><h4>1. Community education sessions</h4><p>Chiefs' meetings, schools, and church gatherings host sessions on snake identification, safe land-clearing, and correct first response to a bite.</p></div>
        <div class="step"><h4>2. Household equipping</h4><p>Solar lamps and gumboots are distributed to the households most exposed — herders, water-fetchers, and those in thatch-and-earth homes near grazing land.</p></div>
        <div class="step"><h4>3. Case reporting and follow-up</h4><p>Every reported bite is logged, the victim is followed up, and outcomes are recorded into a registry shared with county health officials.</p></div>
        <div class="step"><h4>4. Facility and policy advocacy</h4><p>Aggregated, anonymised case data is taken to county and national health offices to push for antivenom stocking and staff training closer to hot-spot wards.</p></div>
      </div>
    </div>
  </section>
  `;
}

function pageLearn(){
  return `
  <section style="padding-top:64px;">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Learn More</span>
        <h2>The Snake Library</h2>
        <p>Knowing what you're dealing with is the first defence. These are the species most relevant to bite risk in Baringo and the wider Rift Valley.</p>
      </div>
      <div class="grid-3">
        ${SNAKES.map(s=>`
          <div class="card">
            <div class="snake-illustration" style="${s.img ? `background-image:url('${s.img}'); background-size:cover; background-position:center;` : ''}">${s.img ? '' : s.svg}</div>
            ${s.img ? `<p style="font-size:0.68rem; color:#9a9580; margin:6px 0 0;">Photo: Wikimedia Commons</p>` : ''}
            <span class="tag ${s.risk==='Severe'||s.risk==='High'?'rust':(s.risk==='Low'?'':'venom')}" style="margin-top:10px;">${s.risk} risk</span>
            <h3>${s.name}</h3>
            <p style="font-style:italic; font-size:0.82rem; margin-bottom:8px; color:#7a7561;">${s.latin}</p>
            <p>${s.note}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  <section class="olive">
    <div class="wrap grid-2">
      <div>
        <span class="eyebrow" style="color:var(--venom);">First Response</span>
        <h2 style="font-family:var(--font-display); color:var(--sand); margin:10px 0 16px; font-size:1.8rem;">If a bite happens</h2>
        <ul style="color:rgba(239,231,211,0.85); line-height:1.8; padding-left:18px; font-size:0.95rem;">
          <li>Keep the person calm and still — movement spreads venom faster.</li>
          <li>Remove rings, watches or tight clothing near the bite before swelling sets in.</li>
          <li>Keep the bitten limb at or below heart level.</li>
          <li>Get to the nearest health facility immediately — do not wait to see symptoms.</li>
          <li>Try to remember the snake's colour and shape, but never delay travel to look for it.</li>
        </ul>
      </div>
      <div>
        <span class="eyebrow" style="color:var(--rust);">Avoid</span>
        <h2 style="font-family:var(--font-display); color:var(--sand); margin:10px 0 16px; font-size:1.8rem;">What not to do</h2>
        <ul style="color:rgba(239,231,211,0.85); line-height:1.8; padding-left:18px; font-size:0.95rem;">
          <li>Do not cut, suck, or apply ice to the bite.</li>
          <li>Do not apply a tight tourniquet.</li>
          <li>Do not give the person alcohol or unverified herbal remedies as a substitute for care.</li>
          <li>Do not try to catch or kill the snake — it risks a second bite.</li>
        </ul>
      </div>
    </div>
  </section>
  `;
}

function pageGallery(){
  return `
  <section style="padding-top:64px;">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Gallery</span>
        <h2>From the field</h2>
        <p>Moments from outreach, equipping, and education work across Baringo's wards. Photographs are added as outreach continues.</p>
      </div>
      <div class="gallery-grid">
        ${CONTENT.galleryItems.map(g=>`
          <figure style="margin:0;">
            <div class="gallery-item" style="${g.url ? `background-image:url('${g.url}');` : `background:${g.color};`}">${g.url ? '' : g.caption}</div>
            ${g.url ? `<figcaption style="font-size:0.78rem; margin-top:6px; color:#75705c;">${g.caption}</figcaption>` : ''}
          </figure>
        `).join('')}
      </div>
    </div>
  </section>
  `;
}

function personCard(p, size){
  size = size || 'normal';
  const dims = size==='big' ? '120px' : '84px';
  const font = size==='big' ? '2rem' : '1.5rem';
  return `
    <div class="card person-card">
      <div class="avatar" style="background:${p.color}; width:${dims}; height:${dims}; font-size:${font}; border-radius:50%;">${p.initials}</div>
      <h3 style="margin-bottom:2px;">${p.name}</h3>
      <p style="color:var(--rust); font-weight:600; font-size:0.85rem;">${p.role}</p>
    </div>`;
}

function pageCommittee(){
  const c = CONTENT.committee;
  return `
  <section style="padding-top:64px;">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Committee</span>
        <h2>Who runs the drive</h2>
        <p>A small, working committee coordinating field outreach, health-facility advocacy, and community partnerships across Baringo.</p>
      </div>

      <div class="eyebrow" style="margin-bottom:18px; justify-content:center;">Leadership</div>
      <div style="display:flex; justify-content:center; margin-bottom:46px;">
        <div style="max-width:240px;">${personCard(c.ceo, 'big')}</div>
      </div>

      <div class="grid-3" style="margin-bottom:46px;">
        ${c.topThree.map(p=>personCard(p)).join('')}
      </div>

      <button class="acc-trigger-solo" id="constituencyToggle" type="button">
        <span>Constituency Representatives — all six wards</span>
        <span class="acc-caret">⌄</span>
      </button>
      <div class="acc-panel-solo" id="constituencyPanel">
        <div class="grid-3" style="padding-top:24px;">
          ${c.constituencyReps.map(r=>`
            <div class="card person-card" style="text-align:left; display:flex; gap:14px; align-items:center;">
              <div class="avatar" style="background:${r.color}; width:56px; height:56px; font-size:0.92rem; border-radius:50%; flex-shrink:0; margin:0;">${r.initials}</div>
              <div>
                <span class="tag" style="margin-bottom:6px;">${r.constituency}</span>
                <h3 style="margin:6px 0 0; font-size:0.98rem;">${r.name}</h3>
                <p style="color:var(--rust); font-weight:600; font-size:0.8rem; margin:0;">${r.role}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>
  `;
}

function pageBlog(){
  return `
  <section style="padding-top:64px;">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Field Blog</span>
        <h2>Notes from the ground</h2>
      </div>
      <div class="blog-list">
        ${CONTENT.blogPosts.map(p=>`
          <div class="blog-item">
            <div class="blog-date">${p.date}</div>
            <div>
              <h3>${p.title}</h3>
              <p>${p.excerpt}</p>
              <a href="contact.html" style="font-size:0.85rem; font-weight:700; color:var(--rust);">Read more →</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;
}

function formatEventDate(iso){
  try{
    const d = new Date(iso+'T00:00:00');
    return d.toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric'});
  }catch(e){ return iso; }
}

function pageEvents(){
  const today = new Date().toISOString().slice(0,10);
  const sorted = CONTENT.events.slice().sort((a,b)=>a.date.localeCompare(b.date));
  return `
  <section style="padding-top:64px;">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Upcoming Events</span>
        <h2>Where the drive shows up next</h2>
        <p>Outreach days, education sessions, and advocacy meetings across Baringo. Come through, volunteer, or just learn more in person.</p>
      </div>
      <div class="timeline">
        ${sorted.map(e=>`
          <div class="step">
            <span class="tag ${e.date < today ? '' : 'rust'}" style="margin-bottom:8px;">${formatEventDate(e.date)}${e.date < today ? ' · Past' : ''}</span>
            <h4>${e.title}</h4>
            <p><strong>${e.location}</strong> — ${e.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;
}

function pageSupport(){
  return `
  <section style="padding-top:64px;">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">Support Us</span>
        <h2>Fund a lamp. Fund a boot. Fund a follow-up visit.</h2>
        <p>V.I.P.E.R runs on direct, traceable contributions from individuals, partners, and organisations who want to see fewer preventable snakebite deaths in Baringo.</p>
      </div>
      <div class="mpesa-box" style="margin-bottom:32px;">
        <div>
          <div class="eyebrow" style="color:var(--venom);">Send via M-Pesa</div>
          <h2 style="font-family:var(--font-display); margin:10px 0 6px; font-size:1.5rem;">Direct to the field fund</h2>
        </div>
        <div style="text-align:right;">
          <div class="mpesa-number" id="mpesaDisplay2">${CONTENT.mpesaNumber}</div>
          <button class="copy-btn" id="copyMpesa2">Copy Number</button>
        </div>
      </div>
      <div class="grid-3">
        <div class="card"><span class="tag">Partner</span><h3>Become a Partner</h3><p>NGOs, health agencies, and county offices can co-fund equipping drives or facility advocacy.</p></div>
        <div class="card"><span class="tag rust">Volunteer</span><h3>Join Field Outreach</h3><p>Help run education sessions, translate, or assist with household equipping days.</p></div>
        <div class="card"><span class="tag venom">In-kind</span><h3>Donate Equipment</h3><p>Lamps, gumboots, and basic first-response supplies can be donated directly for distribution.</p></div>
      </div>
    </div>
  </section>
  `;
}

function pageContact(){
  return `
  <section style="padding-top:64px;">
    <div class="wrap grid-2">
      <div>
        <span class="eyebrow">Contact Us</span>
        <h2 style="font-family:var(--font-display); font-size:2.1rem; margin:12px 0 16px;">Talk to the drive.</h2>
        <p style="color:#4a4738; line-height:1.6; margin-bottom:26px;">Questions, partnership enquiries, media requests, or general support — reach the committee directly.</p>
        <div class="panel" style="margin-bottom:16px;"><strong>Email</strong><br>${CONTENT.contactEmail}</div>
        <div class="panel" style="margin-bottom:16px;"><strong>Phone</strong><br>${CONTENT.contactPhone}</div>
        <div class="panel"><strong>Based in</strong><br>${CONTENT.contactLocation}</div>
      </div>
      <div>
        <form id="contactForm" class="panel">
          <div class="field"><label>Full name</label><input required type="text" id="cf_name" placeholder="Your name"></div>
          <div class="field"><label>Email</label><input required type="email" id="cf_email" placeholder="you@example.com"></div>
          <div class="field"><label>Message</label><textarea required rows="5" id="cf_message" placeholder="How can we help?"></textarea></div>
          <button class="btn-solid" type="submit">Send message</button>
          <div class="success-msg" id="contactSuccess">Thanks — your message has been recorded. We'll get back to you.</div>
        </form>
      </div>
    </div>
  </section>
  `;
}

function pageReport(){
  return `
  <section style="padding-top:64px;">
    <div class="wrap" style="max-width:760px;">
      <span class="eyebrow">Report a Case</span>
      <h2 style="font-family:var(--font-display); font-size:2.1rem; margin:12px 0 16px;">Log a snakebite case</h2>
      <p style="color:#4a4738; line-height:1.6; margin-bottom:30px;">This helps us follow up with the affected household and strengthens the data we bring to health authorities. If this is an active emergency, go to the nearest health facility first — report the case afterward.</p>
      <form id="reportForm" class="panel">
        <div class="grid-2">
          <div class="field"><label>Reporter name</label><input required type="text" id="rf_name"></div>
          <div class="field"><label>Phone number</label><input required type="tel" id="rf_phone"></div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Victim's age</label><input type="number" min="0" id="rf_age"></div>
          <div class="field"><label>Date of bite</label><input type="date" id="rf_date"></div>
        </div>
        <div class="field"><label>Location / village / ward</label><input required type="text" id="rf_location" placeholder="e.g. Marigat, Baringo South"></div>
        <div class="field"><label>Snake species, if known</label><input type="text" id="rf_species" placeholder="Unknown is fine"></div>
        <div class="field">
          <label>Severity observed</label>
          <div class="severity-grid" id="severityGrid">
            <label class="sev-opt"><input type="radio" name="severity" value="Mild">Mild swelling</label>
            <label class="sev-opt"><input type="radio" name="severity" value="Moderate">Moderate / spreading</label>
            <label class="sev-opt"><input type="radio" name="severity" value="Severe">Severe / systemic</label>
            <label class="sev-opt"><input type="radio" name="severity" value="Fatal">Fatality</label>
          </div>
        </div>
        <div class="field"><label>Was a health facility reached?</label>
          <select id="rf_facility"><option>Yes</option><option>No</option><option>En route</option></select>
        </div>
        <div class="field"><label>Additional notes</label><textarea rows="4" id="rf_notes"></textarea></div>
        <button class="btn-solid" type="submit">Submit case report</button>
        <div class="success-msg" id="reportSuccess">Case recorded. Thank you for helping us track this. Our team may follow up by phone.</div>
        <p class="form-note">All case data is used for outreach follow-up and anonymised advocacy reporting only.</p>
      </form>
    </div>
  </section>
  `;
}

/* ============================================================
   PAGE RUNNER
   ============================================================ */
function runPage(templateFn){
  window.__currentPageFn = templateFn;
  document.getElementById('app').innerHTML = `<div class="page">${templateFn()}</div>`;
  wirePageScripts();
}

function wirePageScripts(){
  const copy1 = document.getElementById('copyMpesa');
  const copy2 = document.getElementById('copyMpesa2');
  [copy1,copy2].forEach(btn=>{
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      navigator.clipboard?.writeText(CONTENT.mpesaNumber).catch(()=>{});
      btn.textContent = 'Copied!';
      setTimeout(()=>btn.textContent='Copy Number', 1500);
    });
  });

  const cf = document.getElementById('contactForm');
  if(cf) cf.addEventListener('submit', e=>{
    e.preventDefault();
    const messages = loadList('viper_messages');
    messages.push({
      name: document.getElementById('cf_name').value,
      email: document.getElementById('cf_email').value,
      message: document.getElementById('cf_message').value,
      submittedAt: new Date().toISOString()
    });
    saveList('viper_messages', messages);
    document.getElementById('contactSuccess').style.display='block';
    cf.querySelectorAll('input,textarea').forEach(i=>i.value='');
  });

  const rf = document.getElementById('reportForm');
  if(rf) rf.addEventListener('submit', e=>{
    e.preventDefault();
    const sevEl = document.querySelector('input[name="severity"]:checked');
    const cases = loadList('viper_cases');
    cases.push({
      reporter: document.getElementById('rf_name').value,
      phone: document.getElementById('rf_phone').value,
      age: document.getElementById('rf_age').value,
      biteDate: document.getElementById('rf_date').value,
      location: document.getElementById('rf_location').value,
      species: document.getElementById('rf_species').value,
      severity: sevEl ? sevEl.value : '',
      facilityReached: document.getElementById('rf_facility').value,
      notes: document.getElementById('rf_notes').value,
      submittedAt: new Date().toISOString()
    });
    saveList('viper_cases', cases);
    document.getElementById('reportSuccess').style.display='block';
    rf.reset();
    document.querySelectorAll('.sev-opt').forEach(s=>s.classList.remove('checked'));
  });

  document.querySelectorAll('.sev-opt input').forEach(inp=>{
    inp.addEventListener('change', ()=>{
      document.querySelectorAll('.sev-opt').forEach(s=>s.classList.remove('checked'));
      inp.closest('.sev-opt').classList.add('checked');
    });
  });

  const constToggle = document.getElementById('constituencyToggle');
  const constPanel = document.getElementById('constituencyPanel');
  if(constToggle) constToggle.addEventListener('click', ()=>{
    const open = constPanel.classList.toggle('open');
    constToggle.classList.toggle('open', open);
  });
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initChrome(){
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  function closeMobileMenu(){
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded','false');
    mobileMenu.classList.remove('open');
  }
  burgerBtn.addEventListener('click', ()=>{
    const open = mobileMenu.classList.toggle('open');
    burgerBtn.classList.toggle('open', open);
    burgerBtn.setAttribute('aria-expanded', open ? 'true':'false');
  });
  document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click', closeMobileMenu));
}

/* ============================================================
   ADMIN DASHBOARD — tabbed, per-page CRUD. K opens login first.
   ============================================================ */
const ADMIN_USERNAME = "Issquah";
const ADMIN_PASSWORD = "Issquah34#";
const ADMIN_TABS = ['Home','About','Gallery','Blog','Events','Committee','Support & Contact','Messages','Cases'];

function initAdmin(){
  const adminOverlay = document.getElementById('adminOverlay');
  const adminBody = document.getElementById('adminBody');
  const adminTabsEl = document.getElementById('adminTabs');
  const adminToast = document.getElementById('adminToast');
  const loginOverlay = document.getElementById('loginOverlay');
  const loginUser = document.getElementById('loginUser');
  const loginPass = document.getElementById('loginPass');
  const loginError = document.getElementById('loginError');
  let activeTab = 'Home';

  function isAuthed(){ try{ return sessionStorage.getItem('viper_admin_auth') === '1'; }catch(e){ return false; } }
  function setAuthed(){ try{ sessionStorage.setItem('viper_admin_auth', '1'); }catch(e){} }
  function openLogin(){
    loginError.style.display = 'none';
    loginUser.value = ''; loginPass.value = '';
    loginOverlay.classList.add('open');
    setTimeout(()=>loginUser.focus(), 50);
  }
  function closeLogin(){ loginOverlay.classList.remove('open'); }
  function tryLogin(){
    if(loginUser.value === ADMIN_USERNAME && loginPass.value === ADMIN_PASSWORD){
      setAuthed(); closeLogin(); openAdmin();
    } else { loginError.style.display = 'block'; }
  }
  document.getElementById('loginCloseBtn').addEventListener('click', closeLogin);
  document.getElementById('loginSubmitBtn').addEventListener('click', tryLogin);
  loginOverlay.addEventListener('click', e=>{ if(e.target===loginOverlay) closeLogin(); });
  [loginPass, loginUser].forEach(el=>el.addEventListener('keydown', e=>{ if(e.key==='Enter') tryLogin(); }));

  function toast(msg){
    adminToast.style.display='block'; adminToast.textContent=msg;
    setTimeout(()=>adminToast.style.display='none', 2200);
  }
  function refreshSite(){ if(window.__currentPageFn) runPage(window.__currentPageFn); }
  function escapeHtml(s){ return (s==null?'':String(s)).replace(/"/g,'&quot;'); }
  function row(id, label, value, multiline){
    return `<div class="admin-row"><label>${label}</label>${multiline ? `<textarea id="${id}" rows="${multiline}">${escapeHtml(value)}</textarea>` : `<input id="${id}" value="${escapeHtml(value)}">`}</div>`;
  }

  function renderTabs(){
    adminTabsEl.innerHTML = ADMIN_TABS.map(t=>`<button class="admin-tab${t===activeTab?' active':''}" data-tab="${t}">${t}</button>`).join('');
    adminTabsEl.querySelectorAll('.admin-tab').forEach(b=>{
      b.addEventListener('click', ()=>{ activeTab = b.dataset.tab; renderTabs(); renderBody(); });
    });
  }

  function renderBody(){
    if(activeTab==='Home') renderHomeTab();
    else if(activeTab==='About') renderAboutTab();
    else if(activeTab==='Gallery') renderGalleryTab();
    else if(activeTab==='Blog') renderBlogTab();
    else if(activeTab==='Events') renderEventsTab();
    else if(activeTab==='Committee') renderCommitteeTab();
    else if(activeTab==='Support & Contact') renderSupportTab();
    else if(activeTab==='Messages') renderMessagesTab();
    else if(activeTab==='Cases') renderCasesTab();
  }

  function renderHomeTab(){
    adminBody.innerHTML = `
      <div class="admin-section">
        <h4>Hero</h4>
        ${row('f_heroEyebrow','Eyebrow label', CONTENT.heroEyebrow)}
        ${row('f_heroTitle','Headline (HTML allowed)', CONTENT.heroTitle, 2)}
        ${row('f_heroLede','Lede paragraph', CONTENT.heroLede, 3)}
        ${row('f_heroStatBig','Stat — big number', CONTENT.heroStatBig)}
        ${row('f_heroStatCap','Stat — caption', CONTENT.heroStatCap, 2)}
        ${row('f_heroStatFoot','Stat — source footnote', CONTENT.heroStatFoot)}
      </div>
      <div class="admin-section">
        <h4>Mission Points</h4>
        ${CONTENT.missionPoints.map((m,i)=>`
          ${row('f_mp_title_'+i,'Point '+(i+1)+' title', m.title)}
          ${row('f_mp_text_'+i,'Point '+(i+1)+' text', m.text, 2)}
        `).join('')}
      </div>
      <button class="btn-solid" id="saveHomeBtn">Save Home page</button>
    `;
    document.getElementById('saveHomeBtn').addEventListener('click', ()=>{
      ['heroEyebrow','heroTitle','heroLede','heroStatBig','heroStatCap','heroStatFoot'].forEach(k=>{
        CONTENT[k] = document.getElementById('f_'+k).value;
      });
      CONTENT.missionPoints.forEach((m,i)=>{
        m.title = document.getElementById('f_mp_title_'+i).value;
        m.text = document.getElementById('f_mp_text_'+i).value;
      });
      saveContent(CONTENT); refreshSite(); toast('Home page saved.');
    });
  }

  function renderAboutTab(){
    adminBody.innerHTML = `
      <div class="admin-section">
        <h4>About Page</h4>
        ${row('f_aboutIntro','Intro paragraph', CONTENT.aboutIntro, 3)}
        ${row('f_aboutMission','Mission paragraph', CONTENT.aboutMission, 3)}
      </div>
      <button class="btn-solid" id="saveAboutBtn">Save About page</button>
    `;
    document.getElementById('saveAboutBtn').addEventListener('click', ()=>{
      CONTENT.aboutIntro = document.getElementById('f_aboutIntro').value;
      CONTENT.aboutMission = document.getElementById('f_aboutMission').value;
      saveContent(CONTENT); refreshSite(); toast('About page saved.');
    });
  }

  function renderGalleryTab(){
    adminBody.innerHTML = `
      <div class="admin-section">
        <h4>Gallery Items</h4>
        <p class="admin-hint" style="padding:0 0 10px;">Paste an image URL to show a real photo, or leave blank to use a colour placeholder.</p>
        <div id="galleryList"></div>
        <button class="btn-solid olive" id="addGalleryBtn" type="button" style="margin-top:10px;">+ Add gallery item</button>
      </div>
      <button class="btn-solid" id="saveGalleryBtn">Save Gallery</button>
    `;
    const list = document.getElementById('galleryList');
    function renderList(){
      list.innerHTML = CONTENT.galleryItems.map((g,i)=>`
        <div class="admin-subitem">
          <div class="admin-row"><label>Caption</label><input class="g_caption" data-i="${i}" value="${escapeHtml(g.caption)}"></div>
          <div class="admin-row"><label>Image URL (optional)</label><input class="g_url" data-i="${i}" value="${escapeHtml(g.url||'')}"></div>
          <button class="admin-remove" data-i="${i}" type="button">Remove</button>
        </div>
      `).join('');
      list.querySelectorAll('.admin-remove').forEach(b=>b.addEventListener('click', ()=>{
        CONTENT.galleryItems.splice(Number(b.dataset.i),1); renderList();
      }));
    }
    renderList();
    document.getElementById('addGalleryBtn').addEventListener('click', ()=>{
      CONTENT.galleryItems.push({color:'#4B5A2A', caption:'New photo'}); renderList();
    });
    document.getElementById('saveGalleryBtn').addEventListener('click', ()=>{
      list.querySelectorAll('.g_caption').forEach(el=>{ CONTENT.galleryItems[el.dataset.i].caption = el.value; });
      list.querySelectorAll('.g_url').forEach(el=>{ CONTENT.galleryItems[el.dataset.i].url = el.value; });
      saveContent(CONTENT); refreshSite(); toast('Gallery saved.');
    });
  }

  function renderBlogTab(){
    adminBody.innerHTML = `
      <div class="admin-section">
        <h4>Blog Posts</h4>
        <div id="blogList"></div>
        <button class="btn-solid olive" id="addBlogBtn" type="button" style="margin-top:10px;">+ Add blog post</button>
      </div>
      <button class="btn-solid" id="saveBlogBtn">Save Blog</button>
    `;
    const list = document.getElementById('blogList');
    function renderList(){
      list.innerHTML = CONTENT.blogPosts.map((p,i)=>`
        <div class="admin-subitem">
          <div class="admin-row"><label>Date</label><input class="b_date" data-i="${i}" value="${escapeHtml(p.date)}"></div>
          <div class="admin-row"><label>Title</label><input class="b_title" data-i="${i}" value="${escapeHtml(p.title)}"></div>
          <div class="admin-row"><label>Excerpt</label><textarea class="b_excerpt" data-i="${i}" rows="2">${escapeHtml(p.excerpt)}</textarea></div>
          <button class="admin-remove" data-i="${i}" type="button">Remove</button>
        </div>
      `).join('');
      list.querySelectorAll('.admin-remove').forEach(b=>b.addEventListener('click', ()=>{
        CONTENT.blogPosts.splice(Number(b.dataset.i),1); renderList();
      }));
    }
    renderList();
    document.getElementById('addBlogBtn').addEventListener('click', ()=>{
      CONTENT.blogPosts.unshift({date:new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}), title:'New post title', excerpt:'Write a short excerpt here.'});
      renderList();
    });
    document.getElementById('saveBlogBtn').addEventListener('click', ()=>{
      list.querySelectorAll('.b_date').forEach(el=>{ CONTENT.blogPosts[el.dataset.i].date = el.value; });
      list.querySelectorAll('.b_title').forEach(el=>{ CONTENT.blogPosts[el.dataset.i].title = el.value; });
      list.querySelectorAll('.b_excerpt').forEach(el=>{ CONTENT.blogPosts[el.dataset.i].excerpt = el.value; });
      saveContent(CONTENT); refreshSite(); toast('Blog saved.');
    });
  }

  function renderEventsTab(){
    adminBody.innerHTML = `
      <div class="admin-section">
        <h4>Events</h4>
        <div id="eventsList"></div>
        <button class="btn-solid olive" id="addEventBtn" type="button" style="margin-top:10px;">+ Add event</button>
      </div>
      <button class="btn-solid" id="saveEventsBtn">Save Events</button>
    `;
    const list = document.getElementById('eventsList');
    function renderList(){
      list.innerHTML = CONTENT.events.map((e,i)=>`
        <div class="admin-subitem">
          <div class="admin-row"><label>Date</label><input type="date" class="e_date" data-i="${i}" value="${escapeHtml(e.date)}"></div>
          <div class="admin-row"><label>Title</label><input class="e_title" data-i="${i}" value="${escapeHtml(e.title)}"></div>
          <div class="admin-row"><label>Location</label><input class="e_location" data-i="${i}" value="${escapeHtml(e.location)}"></div>
          <div class="admin-row"><label>Description</label><textarea class="e_description" data-i="${i}" rows="2">${escapeHtml(e.description)}</textarea></div>
          <button class="admin-remove" data-i="${i}" type="button">Remove</button>
        </div>
      `).join('');
      list.querySelectorAll('.admin-remove').forEach(b=>b.addEventListener('click', ()=>{
        CONTENT.events.splice(Number(b.dataset.i),1); renderList();
      }));
    }
    renderList();
    document.getElementById('addEventBtn').addEventListener('click', ()=>{
      CONTENT.events.push({date:new Date().toISOString().slice(0,10), title:'New event', location:'Location', description:'Description.'});
      renderList();
    });
    document.getElementById('saveEventsBtn').addEventListener('click', ()=>{
      list.querySelectorAll('.e_date').forEach(el=>{ CONTENT.events[el.dataset.i].date = el.value; });
      list.querySelectorAll('.e_title').forEach(el=>{ CONTENT.events[el.dataset.i].title = el.value; });
      list.querySelectorAll('.e_location').forEach(el=>{ CONTENT.events[el.dataset.i].location = el.value; });
      list.querySelectorAll('.e_description').forEach(el=>{ CONTENT.events[el.dataset.i].description = el.value; });
      saveContent(CONTENT); refreshSite(); toast('Events saved.');
    });
  }

  function renderCommitteeTab(){
    const c = CONTENT.committee;
    adminBody.innerHTML = `
      <div class="admin-section">
        <h4>CEO</h4>
        ${row('f_ceo_name','Name', c.ceo.name)}
        ${row('f_ceo_role','Role', c.ceo.role)}
      </div>
      <div class="admin-section">
        <h4>Top Three (Vice / Secretary / Treasurer)</h4>
        ${c.topThree.map((p,i)=>`
          ${row('f_top_name_'+i,'Name '+(i+1), p.name)}
          ${row('f_top_role_'+i,'Role '+(i+1), p.role)}
        `).join('')}
      </div>
      <div class="admin-section">
        <h4>Constituency Representatives</h4>
        ${c.constituencyReps.map((r,i)=>`
          ${row('f_rep_name_'+i, r.constituency+' — name', r.name)}
          ${row('f_rep_role_'+i, r.constituency+' — role', r.role)}
        `).join('')}
      </div>
      <button class="btn-solid" id="saveCommitteeBtn">Save Committee</button>
    `;
    document.getElementById('saveCommitteeBtn').addEventListener('click', ()=>{
      c.ceo.name = document.getElementById('f_ceo_name').value;
      c.ceo.role = document.getElementById('f_ceo_role').value;
      c.topThree.forEach((p,i)=>{
        p.name = document.getElementById('f_top_name_'+i).value;
        p.role = document.getElementById('f_top_role_'+i).value;
      });
      c.constituencyReps.forEach((r,i)=>{
        r.name = document.getElementById('f_rep_name_'+i).value;
        r.role = document.getElementById('f_rep_role_'+i).value;
      });
      saveContent(CONTENT); refreshSite(); toast('Committee saved.');
    });
  }

  function renderSupportTab(){
    adminBody.innerHTML = `
      <div class="admin-section">
        <h4>Support / M-Pesa</h4>
        ${row('f_mpesaNumber','M-Pesa number / till', CONTENT.mpesaNumber)}
      </div>
      <div class="admin-section">
        <h4>Contact Details</h4>
        ${row('f_contactEmail','Email', CONTENT.contactEmail)}
        ${row('f_contactPhone','Phone', CONTENT.contactPhone)}
        ${row('f_contactLocation','Location', CONTENT.contactLocation)}
      </div>
      <button class="btn-solid" id="saveSupportBtn">Save</button>
    `;
    document.getElementById('saveSupportBtn').addEventListener('click', ()=>{
      ['mpesaNumber','contactEmail','contactPhone','contactLocation'].forEach(k=>{
        CONTENT[k] = document.getElementById('f_'+k).value;
      });
      saveContent(CONTENT); refreshSite(); toast('Saved.');
    });
  }

  function renderMessagesTab(){
    const messages = loadList('viper_messages').slice().reverse();
    adminBody.innerHTML = `
      <div class="admin-section">
        <h4>Contact Messages (${messages.length})</h4>
        ${messages.length===0 ? '<p class="admin-hint">No messages submitted yet.</p>' : messages.map(m=>`
          <div class="admin-subitem">
            <strong>${escapeHtml(m.name)}</strong> — ${escapeHtml(m.email)}<br>
            <span style="font-size:0.8rem; color:#75705c;">${new Date(m.submittedAt).toLocaleString()}</span>
            <p style="margin:8px 0 0;">${escapeHtml(m.message)}</p>
          </div>
        `).join('')}
      </div>
      ${messages.length ? '<button class="btn-solid olive" id="clearMessagesBtn" type="button">Clear all messages</button>' : ''}
    `;
    const clearBtn = document.getElementById('clearMessagesBtn');
    if(clearBtn) clearBtn.addEventListener('click', ()=>{
      if(!confirm('Clear all contact messages?')) return;
      saveList('viper_messages', []); renderBody(); toast('Messages cleared.');
    });
  }

  function renderCasesTab(){
    const cases = loadList('viper_cases').slice().reverse();
    adminBody.innerHTML = `
      <div class="admin-section">
        <h4>Reported Snakebite Cases (${cases.length})</h4>
        ${cases.length===0 ? '<p class="admin-hint">No cases reported yet.</p>' : cases.map(c=>`
          <div class="admin-subitem">
            <strong>${escapeHtml(c.location)}</strong> — ${escapeHtml(c.severity)||'severity not given'}<br>
            <span style="font-size:0.8rem; color:#75705c;">Reported by ${escapeHtml(c.reporter)} (${escapeHtml(c.phone)}) · ${new Date(c.submittedAt).toLocaleString()}</span>
            <p style="margin:8px 0 0; font-size:0.88rem;">Bite date: ${escapeHtml(c.biteDate)||'—'} · Age: ${escapeHtml(c.age)||'—'} · Species: ${escapeHtml(c.species)||'unknown'} · Facility reached: ${escapeHtml(c.facilityReached)}</p>
            ${c.notes ? `<p style="margin:6px 0 0; font-size:0.88rem;">Notes: ${escapeHtml(c.notes)}</p>` : ''}
          </div>
        `).join('')}
      </div>
      ${cases.length ? '<button class="btn-solid olive" id="clearCasesBtn" type="button">Clear all cases</button>' : ''}
    `;
    const clearBtn = document.getElementById('clearCasesBtn');
    if(clearBtn) clearBtn.addEventListener('click', ()=>{
      if(!confirm('Clear all reported cases?')) return;
      saveList('viper_cases', []); renderBody(); toast('Cases cleared.');
    });
  }

  function openAdmin(){ activeTab='Home'; renderTabs(); renderBody(); adminOverlay.classList.add('open'); }
  function closeAdmin(){ adminOverlay.classList.remove('open'); }

  document.addEventListener('keydown', (e)=>{
    if(adminOverlay.classList.contains('open') || loginOverlay.classList.contains('open')) return;
    const tag = (e.target.tagName||'').toLowerCase();
    if(tag==='input'||tag==='textarea'||tag==='select') return;
    if(e.key.toLowerCase() === 'k' && !e.ctrlKey && !e.metaKey && !e.altKey){
      e.preventDefault();
      if(isAuthed()) openAdmin(); else openLogin();
    }
  });
  document.getElementById('adminCloseBtn').addEventListener('click', closeAdmin);
  adminOverlay.addEventListener('click', e=>{ if(e.target===adminOverlay) closeAdmin(); });
  document.getElementById('adminResetAllBtn').addEventListener('click', ()=>{
    if(!confirm('Reset ALL site content to defaults? This clears your edits but keeps messages/cases.')) return;
    CONTENT = deepClone(DEFAULT_CONTENT);
    saveContent(CONTENT); refreshSite(); renderBody();
    toast('Reset to defaults.');
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initChrome();
  initAdmin();
});
