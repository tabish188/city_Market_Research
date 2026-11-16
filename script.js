(function(){
  /* ---------- data ---------- */
  var M = {ok:['b-ok','✓ Meets'], warn:['b-warn','~ Partial'], bad:['b-bad','✕ Below'], pend:['b-pend','… Pending'], na:['b-pend','N/A for B2B']};
  function badge(k){ var b=M[k]; return '<span class="badge '+b[0]+'">'+b[1]+'</span>'; }


  var MEAN = {
    'Population':'How many people live in the city. A bigger city means more homes and businesses that may need storage.',
    'Urbanization':'Share of people living in towns and cities instead of villages. Urban homes are smaller and people move more, so they need storage more.',
    'In-migrant population':'Share of people who moved into the city from elsewhere. New arrivals often need storage while they settle in.',
    'Out-migrant / relocation population':'Share of people moving out or relocating. People who move often store things they cannot take with them.',
    'Working professionals':'Salaried people in IT, offices and PSUs. They rent smaller homes and can pay for storage.',
    'Student population':'Colleges and students in the city. Students store their things during holidays and when changing hostels.',
    'SME density':'Number of small and medium businesses. They are the main customers for shared warehouse space.',
    'D2C / startup ecosystem':'Online brands and startups. They need someone to store, pack and ship their orders (3PL).',
    'Manufacturing / trade ecosystem':'Factories, traders and ports. They need space to keep raw material and stock.',
    'Warehouse cost / sq. ft.':'Monthly rent for 1 sq. ft. of warehouse space. Lower rent means more profit for us.',
    'Labour cost':'Salaries of pickers, packers and loaders. One of our biggest running costs.',
    'Logistics connectivity':'Ports, highways, rail and airports. Good links make it easy to move goods in and out.',
    'Competition':'How many similar companies already work here. Fewer strong rivals means it is easier to win customers.',
    'Projected B2C CAC':'Average marketing spend to win one storage customer. Lower is better.',
    'Projected B2B CAC':'Average sales and marketing spend to win one business client. Lower is better.',
    'Revenue / sq. ft. potential':'How much money each sq. ft. of our space can earn per month.',
    'EBITDA potential':'Profit before interest, tax and depreciation, as a % of revenue. Shows whether the city makes money.',
    'Break-even potential':'Number of months until the city earns back what we spent to open it.'
  };
  var ALIAS = {'Out-migrant / relocation':'Out-migrant / relocation population','Manufacturing / trade':'Manufacturing / trade ecosystem',
    'Revenue / sq. ft.':'Revenue / sq. ft. potential','EBITDA':'EBITDA potential','Break-even':'Break-even potential',
    'In / out migration':'In-migrant population'};
  MEAN['Storage searches / month']='How many people in the city search Google for storage each month (Keyword Planner).';
  MEAN['3PL searches / month']='How many people in the city search Google for 3PL / warehousing each month (Keyword Planner).';
  function term(name){
    var key = ALIAS[name]||name, t = MEAN[key];
    if(name==='In / out migration') t='Share of people moving into and out of the city. People on the move often need storage.';
    if(!t) return '<b>'+name+'</b>';
    return '<span class="term" tabindex="0" data-tip="'+t.replace(/"/g,'&quot;')+'">'+name+'</span>';
  }
  var B2C_LIST = ['Population','Urbanization','In-migrant population','Out-migrant / relocation population','Working professionals','Student population','Competition','Projected B2C CAC'];

  var CRITERIA = [
    ['Population','>10 million','More people = more homes and businesses that may need storage'],
    ['In-migrant population','>25%','People moving in often need storage while they settle'],
    ['Out-migrant / relocation population','>15%','People moving out store goods they cannot take'],
    ['Working professionals','High','Renters in small flats with steady income: our core storage customer'],
    ['Student population','Medium–High','Students store belongings between semesters'],
    ['SME density','>3 lakh active SMEs','Small businesses are the main buyers of flexible warehouse space'],
    ['D2C / startup ecosystem','Strong','Online brands need fulfilment and 3PL'],
    ['Manufacturing / trade ecosystem','Strong','Factories and traders need inventory storage'],
    ['Warehouse cost / sq. ft.','<₹40 preferred','Lower rent = better margin'],
    ['Labour cost','Moderate','Pickers and packers are a big running cost'],
    ['Logistics connectivity','Strong','Ports, highways and rail make the city a useful hub'],
    ['Competition','Moderate or lower','Fewer strong rivals = easier to win customers'],
    ['Projected B2C CAC','<₹3,300','Cost to win one storage customer'],
    ['Projected B2B CAC','<₹13,000','Cost to win one business customer'],
    ['Revenue / sq. ft. potential','>₹45','What each sq. ft. of space can earn per month'],
    ['EBITDA potential','>15%','Operating profit margin'],
    ['Break-even potential','<15 months','How fast the city pays back its setup cost']
  ];

  var VIZAG_B2C = [
    ['Population','>10 million','~2.5 million metro (2026 estimate)','bad'],
    ['Urbanization','High','89.69% urban (current Visakhapatnam district, Census 2011)','ok'],
    ['In-migrant population','>25%','No reliable 2026 city figure published','pend'],
    ['Out-migrant / relocation','>15%','No reliable city figure published','pend'],
    ['Working professionals','High','IT campuses coming (TCS, Cognizant, Accenture) + Navy, port, steel, PSU','warn'],
    ['Student population','Medium–High','Andhra University 77,000+ UG and 20,000+ PG; GITAM 58% from outside AP','ok'],
    ['Competition','Moderate or lower','Only one organised storage player found (SafeStorage)','warn'],
    ['Projected B2C CAC','<₹3,300','Needs a paid test','pend']
  ];
  var AHD_B2C = [
    ['Population','>10 million','~9.3–10.6 million metro (2026 estimates)','warn'],
    ['Urbanization','High','84.04% urban (Ahmedabad district, Census 2011)','ok'],
    ['In-migrant population','>25%','No reliable 2026 city figure published','pend'],
    ['Out-migrant / relocation','>15%','No reliable city figure published','pend'],
    ['Working professionals','High','GIFT City ~27,000 jobs, target 1 lakh by 2030; SG Highway office corridor','ok'],
    ['Student population','Medium–High','Gujarat University network 2–3 lakh students; Ahmedabad Univ. 33% from outside Gujarat','ok'],
    ['Competition','Moderate or lower','SafeStorage (since 2015), Storekar, StoreMyGoods','warn'],
    ['Projected B2C CAC','<₹3,300','Needs a paid test','pend']
  ];
  var VIZAG_B2B = [
    ['Population','>10 million','~2.5 million metro (2026 estimate)','bad'],
    ['In-migrant population','>25%','No reliable 2026 city figure published','pend'],
    ['Out-migrant / relocation','>15%','No reliable city figure published','pend'],
    ['Working professionals','High','Port, steel, pharma, PSU + IT pipeline','warn'],
    ['Student population','Medium–High','Andhra University 77,000+ UG and 20,000+ PG','ok'],
    ['SME density','>3 lakh active','3,39,200 registrations (Vizag + Anakapalli), 99% micro; registrations ≠ active','warn'],
    ['D2C / startup ecosystem','Strong','Thin D2C base; WareIQ runs a Vizag fulfilment centre','warn'],
    ['Manufacturing / trade','Strong','Port record 91.17 MT; steel, pharma, chemicals, shipbuilding','ok'],
    ['Warehouse cost / sq. ft.','<₹40','₹12–40 across 6 areas (asking rents)','ok'],
    ['Labour cost','Moderate','Needs 3–5 local quotes','pend'],
    ['Logistics connectivity','Strong','2 ports, NH-16, East Coast Railway, Bhogapuram airport (Aug 2026)','ok'],
    ['Competition','Moderate or lower','TVS ILP park, WareIQ, Delhivery, local godowns','warn'],
    ['Projected B2C CAC','<₹3,300','Not applicable to B2B','na'],
    ['Projected B2B CAC','<₹13,000','Only ~150 3PL searches/month; needs an outbound pilot','pend'],
    ['Revenue / sq. ft.','>₹45','Needs pricing + occupancy model','pend'],
    ['EBITDA','>15%','Needs internal P&L','pend'],
    ['Break-even','<15 months','Needs capex + cash-flow model','pend']
  ];
  var AHD_B2B = [
    ['Population','>10 million','~9.3–10.6 million metro (2026 estimates)','warn'],
    ['In-migrant population','>25%','No reliable 2026 city figure published','pend'],
    ['Out-migrant / relocation','>15%','No reliable city figure published','pend'],
    ['Working professionals','High','GIFT City ~27,000 jobs; Gujarat’s trade capital','ok'],
    ['Student population','Medium–High','Gujarat University network 2–3 lakh students','ok'],
    ['SME density','>3 lakh active','4.21 lakh Udyam registrations (Aug 2024), highest in Gujarat','ok'],
    ['D2C / startup ecosystem','Strong','Gujarat 19,270+ DPIIT startups (Mar 2026); Ahmedabad startups raised $930 mn (2014–2024)','ok'],
    ['Manufacturing / trade','Strong','Auto plants in Sanand and Changodar; textiles, pharma, chemicals','ok'],
    ['Warehouse cost / sq. ft.','<₹40','City average ₹19.4 (H1 2026); areas ₹15–27','ok'],
    ['Labour cost','Moderate','Needs 3–5 local quotes','pend'],
    ['Logistics connectivity','Strong','Kheda/Aslali, Changodar–Bagodara, Sanand belts','ok'],
    ['Competition','Moderate or lower','Amazon (3 FCs), WareIQ, Delhivery, TCI, local 3PLs','bad'],
    ['Projected B2C CAC','<₹3,300','Not applicable to B2B','na'],
    ['Projected B2B CAC','<₹13,000','~470 3PL searches/month; needs paid + outbound pilot','pend'],
    ['Revenue / sq. ft.','>₹45','Needs model (market rent ₹19.4 leaves a wide spread)','pend'],
    ['EBITDA','>15%','Needs internal P&L','pend'],
    ['Break-even','<15 months','Needs capex + cash-flow model','pend']
  ];

  /* comparison rows: [criteria, benchmark, vizag, ahd, winner: 'v'|'a'|''] */
  var CMP_B2C = [
    ['Population','>10 million','~2.5 million '+badge('bad'),'~9.3–10.6 million '+badge('warn'),'a'],
    ['Urbanization','High','89.69% urban '+badge('ok'),'84.04% urban '+badge('ok'),''],
    ['Working professionals','High','IT pipeline + Navy, PSU '+badge('warn'),'GIFT City ~27,000 jobs '+badge('ok'),'a'],
    ['Student population','Medium–High','97,000+ (Andhra Univ.) '+badge('ok'),'2–3 lakh (Gujarat Univ. network) '+badge('ok'),'a'],
    ['In / out migration','>25% / >15%','No data '+badge('pend'),'No data '+badge('pend'),''],
    ['Competition','Moderate or lower','SafeStorage only '+badge('warn'),'SafeStorage, Storekar, StoreMyGoods '+badge('warn'),'v'],
    ['Biggest storage trigger','—','Navy transfers, IT inflow','GIFT City/IT inflow, high western rents',''],
    ['Premium-area 2 BHK rent','—','Yendada ~₹23,800 avg; MVP Colony ~₹19,300','SG Highway ₹23k–30k; Satellite/Bodakdev ₹20k–38k','a'],
    ['Same 5 storage keywords, searches/month','—','110','260','a'],
    ['Projected B2C CAC','<₹3,300','Needs test '+badge('pend'),'Needs test '+badge('pend'),''],
    ['<b>Score (8 rows)</b>','—','2 ✓ · 2 ~ · 1 ✕ · 3 …','3 ✓ · 2 ~ · 0 ✕ · 3 …','a']
  ];
  var CMP_B2B = [];
  for (var i=0;i<17;i++){
    var v=VIZAG_B2B[i], a=AHD_B2B[i];
    var rank={ok:3,warn:2,bad:1,pend:0,na:0};
    var w = (rank[v[3]]>rank[a[3]])?'v':(rank[a[3]]>rank[v[3]])?'a':'';
    CMP_B2B.push([v[0],v[1],v[2]+' '+badge(v[3]),a[2]+' '+badge(a[3]),w]);
  }
  CMP_B2B.push(['3PL searches / month','—','~150','~470','a']);
  CMP_B2B.push(['<b>Score (17 criteria)</b>','—','4 ✓ · 4 ~ · 1 ✕ · 7 … · 1 N/A','7 ✓ · 1 ~ · 1 ✕ · 7 … · 1 N/A','a']);

  /* ---------- render tables ---------- */
  function esc(s){return s;}
  var BENCH = {'Urbanization':'High'}; CRITERIA.forEach(function(r){ BENCH[r[0]]=r[1]; });
  function crit(id,list){ document.getElementById(id).innerHTML = list.map(function(n){
    return '<li>'+term(n)+'<span class="bench">'+BENCH[n]+'</span></li>'; }).join(''); }
  crit('crit-b2c',B2C_LIST);
  crit('crit-b2b',CRITERIA.map(function(r){return r[0];}));
  function score(id,rows){ document.getElementById(id).innerHTML = rows.map(function(r){
    return '<tr><td>'+term(r[0])+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+badge(r[3])+'</td></tr>';}).join(''); }
  score('vizag-b2c-score',VIZAG_B2C); score('ahd-b2c-score',AHD_B2C);
  score('vizag-b2b-score',VIZAG_B2B); score('ahd-b2b-score',AHD_B2B);
  function cmp(id,rows){ document.getElementById(id).innerHTML = rows.map(function(r){
    return '<tr><td>'+term(r[0])+'</td><td>'+r[1]+'</td><td class="'+(r[4]==='v'?'win':'')+'">'+r[2]+'</td><td class="'+(r[4]==='a'?'win':'')+'">'+r[3]+'</td></tr>';}).join(''); }
  var H2H = {
    b2c: [
      ['Population','25 lakh','bad','93 lakh','warn','a',
        '~25 lakh in the metro area (Macrotrends 2026 estimate). The city had 17.28 lakh in Census 2011. Our target is 100 lakh.',
        '~92.7 lakh in the metro area (Macrotrends 2026 estimate; other estimates go up to 1.06 crore). The city had 55.78 lakh in Census 2011.'],
      ['Urbanization','90% urban','ok','84% urban','ok','',
        '89.69% of people in the current Visakhapatnam district live in urban areas (Census 2011, district as it is after the 2022 split).',
        '84.04% of people in Ahmedabad district live in urban areas (Census 2011).'],
      ['In-migrant population','No data','pend','No data','pend','',
        'Census 2011 city-level migration tables not yet added. For reference, about 37% of all Indians were migrants in 2011.',
        'Census 2011 city-level migration tables not yet added. For reference, about 37% of all Indians were migrants in 2011.'],
      ['Out-migrant / relocation','No data','pend','No data','pend','',
        'Not published at city level.','Not published at city level.'],
      ['Working professionals','IT jobs coming','warn','GIFT City 27k jobs','ok','a',
        'TCS: ₹1,370 cr campus, up to 12,000 jobs. Cognizant: ₹1,583 cr campus, 8,000 seats. Accenture: new campus with ~12,000 jobs proposed. Plus Navy, port, steel plant and PSU staff. Most IT jobs are still being built (2026–2030).',
        'GIFT City: ~27,000 people work there today, target 1 lakh by 2030. Hexaware: new GIFT City centre scaling to 1,000 people. Plus the SG Highway office corridor.'],
      ['Student population','97k+','ok','2–3 lakh','ok','a',
        'Andhra University: 77,000+ UG and 20,000+ PG students (incl. affiliated colleges). GITAM: 58% of students come from outside Andhra Pradesh.',
        'Gujarat University: 300+ affiliated colleges with 2–3 lakh students. Ahmedabad University: 33% of the 2025 UG intake came from outside Gujarat.'],
      ['Competition','1 rival','warn','3 rivals','warn','v',
        'Only one organised storage company found: SafeStorage (household, self, luggage and document storage, doorstep pickup).',
        'SafeStorage (in Ahmedabad since 2015, 10 areas), Storekar and StoreMyGoods.'],
      ['Projected B2C CAC','Test needed','pend','Test needed','pend','',
        'Cost to win one customer can only be measured with a paid ad test.','Will be measured in the 30-day ₹10,000 Google Ads test.'],
      ['Storage searches / month','110','','260','','a',
        'storage units 70 + storage rental, storage for rent, self storage, household storage (10 each). Google Keyword Planner, 16 Nov 2026.',
        'storage unit 210 + self storage 20 + storage rental, storage for rent, household storage (10 each). Google Keyword Planner, 16 Nov 2026.']
    ],
    b2b: [
      ['Population','25 lakh','bad','93 lakh','warn','a',
        '~25 lakh in the metro area (Macrotrends 2026 estimate). Our target is 100 lakh.',
        '~92.7 lakh in the metro area (Macrotrends 2026 estimate).'],
      ['In-migrant population','No data','pend','No data','pend','',
        'Census 2011 city-level migration tables not yet added.','Census 2011 city-level migration tables not yet added.'],
      ['Out-migrant / relocation','No data','pend','No data','pend','',
        'Not published at city level.','Not published at city level.'],
      ['Working professionals','Port, PSU, IT','warn','GIFT City 27k jobs','ok','a',
        'Port, steel plant, pharma and PSU staff today. Coming: TCS (up to 12,000 jobs), Cognizant (8,000 seats), Accenture (~12,000 proposed).',
        'GIFT City ~27,000 jobs today (target 1 lakh by 2030). Gujarat’s trade and commerce capital.'],
      ['Student population','97k+','ok','2–3 lakh','ok','a',
        'Andhra University 77,000+ UG and 20,000+ PG students: a good pool for warehouse staff and interns.',
        'Gujarat University network: 2–3 lakh students across 300+ colleges.'],
      ['SME density','3.39 lakh','warn','4.21 lakh','ok','a',
        'Udyam + Udyam Assist registrations (Jul 2020 – Dec 2025): Visakhapatnam 2,65,580 + Anakapalli 73,620. 99% are micro units. Registered is not the same as active.',
        '4.21 lakh Udyam registrations in Ahmedabad district (Aug 2024), the highest in Gujarat.'],
      ['D2C / startup ecosystem','Thin','warn','Strong','ok','a',
        'No verified startup count. Few D2C brands. WareIQ runs a fulfilment centre here, so some online-seller demand exists.',
        'Gujarat has 19,270+ DPIIT-recognised startups (Mar 2026). Ahmedabad startups raised $930 mn across 160 deals (2014–2024).'],
      ['Manufacturing / trade','Port 91 MT','ok','Auto, pharma','ok','',
        'Visakhapatnam Port handled a record 91.17 million tonnes in FY 2025-26. Steel, pharma, chemicals and shipbuilding.',
        'Auto plants in Sanand and Changodar, plus textiles, pharma and chemicals.'],
      ['Warehouse cost / sq. ft.','₹12–40','ok','₹19.4 avg','ok','',
        'Area ranges per sq. ft. per month: Anakapalle from ₹12, Gajuwaka ₹18–30, Auto Nagar ₹22–28, Duvvada ₹20–35, Mindi ₹24–30, Pedagantyada ₹25–40.',
        'Knight Frank H1 2026 city average: ₹19.4 per sq. ft. per month (+6% YoY). Areas (Grade A): Changodar ₹15–25, Vithalapur ₹16–21, Aslali ₹17–25, Sanand ₹18–27.'],
      ['Labour cost','Quotes needed','pend','Quotes needed','pend','',
        'Needs 3–5 local quotes from staffing vendors.','Needs 3–5 local quotes from staffing vendors.'],
      ['Logistics connectivity','2 ports','ok','Big logistics belts','ok','',
        'Visakhapatnam Port + Gangavaram Port, NH-16, East Coast Railway, new Bhogapuram airport (flights since Aug 2026).',
        'Main warehousing belts: Kheda / Aslali, Changodar–Bagodara and Sanand.'],
      ['Competition','Moderate','warn','High','bad','v',
        'TVS ILP Grade-A logistics park, WareIQ, Delhivery and local godowns.',
        'Amazon (3 fulfilment centres), WareIQ, Delhivery, TCI and many local 3PLs.'],
      ['Projected B2C CAC','N/A','na','N/A','na','',
        'Not used for the B2B score.','Not used for the B2B score.'],
      ['Projected B2B CAC','Test needed','pend','Test needed','pend','',
        'Needs a paid ads + outbound sales test.','Will be measured in the 30-day ₹10,000 Google Ads test.'],
      ['Revenue / sq. ft.','Model needed','pend','Model needed','pend','',
        'Needs StowNest’s own pricing and occupancy model.','Needs StowNest’s own pricing and occupancy model. Market rent is ₹19.4, so the gap to our ₹45 target is wide.'],
      ['EBITDA','Model needed','pend','Model needed','pend','',
        'Needs an internal profit & loss model.','Needs an internal profit & loss model.'],
      ['Break-even','Model needed','pend','Model needed','pend','',
        'Needs setup cost + cash-flow model.','Needs setup cost + cash-flow model.'],
      ['3PL searches / month','150','','470','','a',
        '3pl logistics, third party logistics, 3rd party logistics (20 each) + other 3PL terms. Google Keyword Planner, 16 Nov 2026.',
        '3pl logistics, third party logistics, 3rd party logistics (90 each), 3pl (70) + other 3PL terms. Google Keyword Planner, 16 Nov 2026.']
    ]
  };
  var ICON = {ok:['✓','i-ok'],warn:['~','i-warn'],bad:['✕','i-bad'],pend:['…','i-pend'],na:['–','i-pend']};
  function cell(val,st,win,tip){
    var ic = st && ICON[st] ? '<span class="h-ic '+ICON[st][1]+'">'+ICON[st][0]+'</span>' : '';
    var t = tip ? ' tabindex="0" data-tip="'+tip.replace(/"/g,'&quot;')+'"' : '';
    return '<div class="h-cell'+(win?' h-win':'')+(tip?' has-tip':'')+'"'+t+'>'+ic+'<span class="h-val">'+val+'</span>'+(tip?'<span class="h-info">i</span>':'')+(win?'<span class="h-cup">Leads</span>':'')+'</div>';
  }
  function renderH2H(k){
    document.getElementById('h2h-rows').innerHTML = H2H[k].map(function(r){
      return '<div class="h-row"><div class="h-name">'+term(r[0])+'</div>'+cell(r[1],r[2],r[5]==='v',r[6])+cell(r[3],r[4],r[5]==='a',r[7])+'</div>';
    }).join('');
  }
  renderH2H('b2c');
  document.querySelectorAll('#h2h-seg button').forEach(function(b){
    b.addEventListener('click',function(){
      document.querySelectorAll('#h2h-seg button').forEach(function(x){ x.setAttribute('aria-pressed', x===b?'true':'false'); });
      renderH2H(b.dataset.h2h);
    });
  });

  /* ---------- tabs ---------- */
  document.querySelectorAll('.tab').forEach(function(t){
    t.addEventListener('click',function(){
      document.querySelectorAll('.tab').forEach(function(x){x.setAttribute('aria-selected', x===t?'true':'false');});
      document.getElementById('panel-vizag').hidden = t.dataset.city!=='vizag';
      document.getElementById('panel-ahd').hidden = t.dataset.city!=='ahd';
      drawAll();
    });
  });
  document.querySelectorAll('.seg').forEach(function(g){
    var btns=g.querySelectorAll('button');
    if(g.id==='h2h-seg') return;
    btns.forEach(function(b){ b.addEventListener('click',function(){
      btns.forEach(function(x){ x.setAttribute('aria-pressed', x===b?'true':'false'); document.getElementById(x.dataset.seg).hidden = x!==b; });
      drawAll();
    });});
  });

  /* ---------- sources ---------- */
  var SOURCES = {
    'Map': [
      ['India boundaries by DataMeet India community (CC BY 4.0)','https://github.com/datameet/maps/blob/master/Country/india-composite.geojson']
    ],
    'Google Ads (StowNest account)': [
      ['Google Keyword Planner exports, 16 Nov 2026: Visakhapatnam & Ahmedabad, seeds "3pl service, cowarehousing service" and "household storage, self storage, storage unit"', null]
    ],
    'Visakhapatnam': [
      ['Census 2011 & 2026 estimate, Visakhapatnam city','https://census2011.co.in/census/city/402-visakhapatnam.html'],
      ['Metro population estimate (Macrotrends)','https://www.macrotrends.net/global-metrics/cities/21436/visakhapatnam/population'],
      ['Urbanization: current Visakhapatnam district 89.69% urban (Census 2011 basis)','https://en.wikipedia.org/wiki/Visakhapatnam_district'],
      ['MSME registrations by district, Lok Sabha reply (15 Dec 2025)','https://eparlib.sansad.in/bitstream/123456789/3018505/1/AU3082_t21SI1.pdf'],
      ['Vizag Port record 91.17 MT, FY 2025-26 (PTI / ThePrint)','https://theprint.in/india/vizag-port-handles-record-91-17-mn-tonnes-of-cargo-in-2025-26/2895284'],
      ['Vizag Port exports & imports FY26 (Maritime Gateway)','https://www.maritimegateway.com/vizag-port-exports-surge-19-4-to-33-67-mt-in-fy26/'],
      ['Vizag Port 50 MT in 196 days, FY27 (Maritime Gateway)','https://www.maritimegateway.com/visakhapatnam-port-handles-50-million-tonnes-of-cargo-in-record-196-days/'],
      ['Warehousing transactions +265% (India Seatrade News)','https://indiaseatradenews.com/vizags-warehousing-demand-surges-265-per-cent-driven-by-sectors/'],
      ['TVS ILP Vizag park (Construction World)','https://www.constructionworld.in/urban-infrastructure/warehouse-and-logistics/tvs-ilp-invests-rs-2.5-billion-in-new-vizag-logistics-park/79993'],
      ['TVS ILP lease to ATC Tires (Construction World)','https://www.constructionworld.in/urban-infrastructure/warehouse-and-logistics/tvs-ilp-leases-80-000-sq-ft-to-atc-tires-in-visakhapatnam/99145'],
      ['Warehouse rent by area: Gajuwaka, Auto Nagar, Duvvada, Anakapalle, Pedagantyada, Mindi (AddressAdvisors)','https://addressadvisors.com/blog/top-locations-for-warehouse-in-visakhapatnam'],
      ['Warehouse rent ranges (AddressAdvisors)','https://addressadvisors.com/services/warehouse-for-rent-in-visakhapatnam'],
      ['IT campuses: TCS & Cognizant (Let’s Data Science / The Hindu)','https://letsdatascience.com/news/it-investment-spurs-visakhapatnam-housing-demand-edddf4b4'],
      ['Accenture campus, 12,000 jobs (Storyboard18)','https://stgwww.storyboard18.com/how-it-works/accenture-seeks-land-in-vizag-for-new-campus-12000-jobs-in-pipeline-81447.htm'],
      ['Google data centre & Bhogapuram airport (RealtyHunting)','https://realtyhunting.com/vizag-real-estate-market'],
      ['Locality rents (Housing.com)','https://housing.com/rent/2bhk-flat-for-rent-in-mvv-&-mk-park-AG4abrAH0C4'],
      ['1 BHK listings: Vishalakshi Nagar ₹14,000 (99acres)','https://www.99acres.com/1-bhk-property-for-rent-in-visakhapatnam-ffid'],
      ['1 BHK listing: Seethammadhara ₹11,500 (99acres)','https://www.99acres.com/independent-house-for-rent-in-mvp-colony-visakhapatnam-10-thousand-to-20-thousand-ffid'],
      ['1 BHK listings: Seethammadhara ₹8,300, MVP Colony ₹4,800 – ₹6,900 (OLX)','https://www.olx.in/seethammadhara_g5301190/rent-apartments_c1723'],
      ['1 BHK listings: Akkayyapalem ₹6,500 – ₹8,200 (OLX)','https://www.olx.in/visakhapatnam_g4058593/for-rent-houses-apartments_c1723'],
      ['1 BHK listing: Kurmannapalem ₹7,000 (Sulekha)','https://property.sulekha.com/1-bhk-apartments-flats-for-rent/visakhapatnam'],
      ['SafeStorage Visakhapatnam','https://safestorage.in/visakhapatnam'],
      ['SafeStorage Visakhapatnam self storage','https://safestorage.in/visakhapatnam-self-storage'],
      ['Andhra University enrolment','https://ipfs.ssi.eecc.de/ipns/en.wikipedia-on-ipfs.org/wiki/Andhra_University'],
      ['GITAM students from outside AP (CollegeDekho)','https://www.collegedekho.com/colleges/gitam-university-reviews'],
      ['WareIQ Vizag fulfilment centre','https://wareiq.com/fulfillment-network/ecommerce-warehouse-in-visakhapatnam-vizag/']
    ],
    'Ahmedabad': [
      ['Census 2011 & 2026 estimate, Ahmedabad city','https://census2011.co.in/census/city/314-ahmedabad.html'],
      ['Metro population estimate (Macrotrends data)','https://profitbridge.it.com/datasets/global-metrics/cities/21152/ahmadabad/population'],
      ['Metro population estimate (World Population Review)','https://worldpopulationreview.com/cities/india/ahmedabad'],
      ['Urbanization: Ahmedabad district 84.04% urban (Census 2011)','https://www.census2011.co.in/census/district/188-ahmadabad.html'],
      ['Knight Frank India Warehousing Market Report H1 2026','https://content.knightfrank.com/research/3131/documents/en/india-warehousing-market-report-h1-2026-12992.pdf'],
      ['Cushman & Wakefield Ahmedabad MarketBeat','https://www.cushmanwakefield.com/en/india/insights/ahmedabad-marketbeat'],
      ['Warehouse rent by cluster: Aslali, Changodar, Sanand, Vithalapur (Knight Frank India Warehousing Market Report 2026)','https://content.knightfrank.com/research/3084/documents/en/india-warehousing-market-report-2025-12733.pdf'],
      ['Nearest port: Deendayal Port (Kandla) record 160.11 MT, FY 2025-26 (DPA press note)','https://www.deendayalport.gov.in/wp-content/uploads/2026/04/Press-Note-160-MMT-DPA-01-04-2026.pdf'],
      ['Ahmedabad 4.21 lakh Udyam registrations (SME Connect)','https://www.smeconnect.in/?p=4109'],
      ['Gujarat 30 lakh MSMEs; Ahmedabad in top 10 districts (DeshGujarat)','https://deshgujarat.com/2026/04/02/over-30-lakh-msmes-registered-in-gujarat-among-top-5-states'],
      ['Gujarat 19,270+ DPIIT startups (Vajiram & Ravi / PIB)','https://vajiramandravi.com/current-affairs/india-startup-ecosystem/'],
      ['Ahmedabad startup funding (Inc42)','https://inc42.com/lists/list-of-startups-in-ahmedabad/'],
      ['GIFT City jobs, target 1 lakh by 2030','https://courtkutchehry.com/blog/gift-city-targets-1-lakh-jobs-by-2030'],
      ['Hexaware GIFT City centre, 1,000 jobs','https://www.newkerala.com/news/a/gujarat-cm-inaugurates-hexaware-delivery-centre-gift-city-863.htm'],
      ['Gujarat University affiliated colleges & students (Collegedunia)','https://collegedunia.com/university/25491-gujarat-university-gu-ahmedabad'],
      ['Ahmedabad University 2025 intake','https://ahduni.edu.in/news/ahmedabad-university-welcomes-future-thinkers-and-leaders-at-orientation-2025/'],
      ['2 BHK rents by locality (Housivity)','https://housivity.com/blog/real-cost-of-2bhk-flats-in-ahmedabad-affordable-or-overpriced'],
      ['1 BHK city average ₹17,000 (Square Yards)','https://www.squareyards.com/rent/1-bhk-for-rent-in-ahmedabad'],
      ['1 BHK rent by area: Bopal, Satellite, SG Highway, May 2026 (Niptao)','https://niptao.app/en/blog/ahmedabad-cost-of-living-2026'],
      ['Cost of living & rents 2026 (Square Yards)','https://www.squareyards.com/blog/cost-of-living-in-ahmedabad'],
      ['SafeStorage Ahmedabad','https://safestorage.in/ahmedabad'],
      ['SafeStorage Ahmedabad household storage','https://safestorage.in/ahmedabad-household-storage'],
      ['SafeStorage Ahmedabad 2 BHK storage','https://safestorage.in/ahmedabad-2bhk-storage'],
      ['SafeStorage Ahmedabad 4 BHK storage','https://safestorage.in/ahmedabad-4bhk-storage'],
      ['SafeStorage Ahmedabad areas served','https://www.safestorage.in/ahmedabad-storage-areas'],
      ['Storekar Ahmedabad','https://www.storekar.com/self-storage-services-ahmedabad.html'],
      ['StoreMyGoods','https://storemygoods.com/'],
      ['Amazon’s 3rd Ahmedabad fulfilment centre (ITLN)','https://www.itln.in/amp/amazon-opens-3rd-fulfilment-centre-in-ahmedabad-with-2-lakh-sq-ft-area-trade-e-commerce'],
      ['WareIQ Ahmedabad fulfilment centre','https://wareiq.com/fulfillment-network/ecommerce-warehouse-in-ahmedabad/']
    ]
  };
  var html='';
  Object.keys(SOURCES).forEach(function(k){
    html += '<h4>'+k+'</h4><ul>' + SOURCES[k].map(function(s){
      return '<li>'+(s[1]?'<a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+'</a>':s[0])+'</li>';}).join('') + '</ul>';
  });
  document.getElementById('sources-list').innerHTML = html;
  var sb=document.getElementById('src-btn');
  sb.addEventListener('click',function(){
    var l=document.getElementById('sources-list'); l.hidden=!l.hidden;
    sb.setAttribute('aria-expanded', String(!l.hidden));
    sb.textContent = l.hidden ? 'Show all sources ↓' : 'Hide sources ↑';
  });

  /* ---------- charts (vanilla SVG) ---------- */
  var NS='http://www.w3.org/2000/svg';
  function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
  function nice(m){var p=Math.pow(10,Math.floor(Math.log10(m/4))),r=(m/4)/p,st=r<=1?1:r<=2?2:r<=2.5?2.5:r<=5?5:10;return st*p*4;}
  function fmt(v,u){ var s = (Math.round(v*100)/100).toLocaleString('en-IN'); return (u&&u.pre?u.pre:'')+s+(u&&u.post?u.post:''); }

  /* horizontal bar chart: rows [{label, value, color, tip}] */
  function hbar(id, rows, opt){
    var box=document.getElementById(id); if(!box||box.offsetParent===null) return;
    box.innerHTML='';
    opt=opt||{};
    var W=Math.max(box.clientWidth,300), labelW=Math.min(opt.labelW||150, Math.round(W*0.42)), rowH=30, gap=8, top=opt.bench?26:8, bottom=26;
    var H=top+rows.length*(rowH+gap)+bottom;
    var max=opt.max||nice(Math.max.apply(null,rows.map(function(r){return r.value;}).concat(opt.bench||0))*1.08);
    var x0=labelW, x1=W-48;
    var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':opt.aria||''},box);
    var g=el('g',{'class':'grid'},svg), ax=el('g',{'class':'axis'},svg);
    for(var t=0;t<=4;t++){ var v=max*t/4, x=x0+(x1-x0)*t/4;
      el('line',{x1:x,x2:x,y1:top-4,y2:H-bottom+2},g);
      var tx=el('text',{x:x,y:H-8,'text-anchor':'middle'},ax); tx.textContent=fmt(v,opt.unit); }
    var tip=document.createElement('div'); tip.className='tip'; box.appendChild(tip);
    var bars=[];
    rows.forEach(function(r,i){
      var y=top+i*(rowH+gap), w=Math.max(2,(x1-x0)*r.value/max);
      var lt=el('text',{x:x0-8,y:y+rowH/2+4,'text-anchor':'end','class':'lbl'},svg); lt.textContent=r.label;
      var b=el('rect',{x:x0,y:y,width:w,height:rowH,rx:4,fill:r.color,'class':'bar h'},svg); bars.push(b);
      var vt=el('text',{x:x0+w+6,y:y+rowH/2+4,'class':'val'},svg); vt.textContent=r.text||fmt(r.value,opt.unit);
      var hit=el('rect',{x:0,y:y-gap/2,width:W,height:rowH+gap,fill:'transparent'},svg);
      hit.addEventListener('mousemove',function(ev){
        bars.forEach(function(o){o.classList.toggle('dim',o!==b);});
        var rb=box.getBoundingClientRect(); tip.style.left=(ev.clientX-rb.left)+'px'; tip.style.top=(ev.clientY-rb.top)+'px';
        tip.innerHTML='<b>'+r.label+'</b>'+(r.tip||fmt(r.value,opt.unit)); tip.style.opacity=1; });
      hit.addEventListener('mouseleave',function(){ bars.forEach(function(o){o.classList.remove('dim');}); tip.style.opacity=0; });
    });
    if(opt.bench){ var bx=x0+(x1-x0)*opt.bench/max, bg=el('g',{'class':'bench'},svg);
      el('line',{x1:bx,x2:bx,y1:top-4,y2:H-bottom+2},bg);
      var bt=el('text',{x:bx,y:top-10,'text-anchor':'middle'},bg); bt.textContent=opt.benchLabel||'benchmark'; }
  }

  /* grouped vertical bars: groups [{label, values:[v,a]}], series colors */
  function gbar(id, groups, opt){
    var box=document.getElementById(id); if(!box||box.offsetParent===null) return;
    box.innerHTML=''; opt=opt||{};
    var W=Math.max(box.clientWidth,300), H=opt.h||240, left=36, right=8, top=18, bottom=34;
    var all=[]; groups.forEach(function(g){all=all.concat(g.values);});
    var max=opt.max||nice(Math.max.apply(null,all.concat(opt.bench||0))*1.12);
    var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':opt.aria||''},box);
    var gg=el('g',{'class':'grid'},svg), ax=el('g',{'class':'axis'},svg);
    var ph=H-top-bottom;
    for(var t=0;t<=4;t++){ var v=max*t/4, y=top+ph-ph*t/4;
      el('line',{x1:left,x2:W-right,y1:y,y2:y},gg);
      var tx=el('text',{x:left-6,y:y+4,'text-anchor':'end'},ax); tx.textContent=fmt(v); }
    var tip=document.createElement('div'); tip.className='tip'; box.appendChild(tip);
    var cw=(W-left-right)/groups.length, bw=Math.min(46,(cw-24)/2), bars=[];
    var colors=[getComputedStyle(document.documentElement).getPropertyValue('--vizag').trim(),getComputedStyle(document.documentElement).getPropertyValue('--ahd').trim()];
    var names=['Visakhapatnam','Ahmedabad'];
    groups.forEach(function(g,i){
      var cx=left+cw*i+cw/2;
      var lt=el('text',{x:cx,y:H-12,'text-anchor':'middle','class':'lbl'},svg); lt.textContent=g.label;
      g.values.forEach(function(v,j){
        var h=ph*v/max, x=cx-bw-1+j*(bw+2), y=top+ph-h;
        var b=el('rect',{x:x,y:y,width:bw,height:Math.max(h,1.5),rx:4,fill:colors[j],'class':'bar v'},svg); bars.push(b);
        var vt=el('text',{x:x+bw/2,y:y-5,'text-anchor':'middle','class':'val'},svg); vt.textContent=fmt(v,opt.unit);
        var hit=el('rect',{x:x-1,y:top,width:bw+2,height:ph,fill:'transparent'},svg);
        hit.addEventListener('mousemove',function(ev){
          bars.forEach(function(o){o.classList.toggle('dim',o!==b);});
          var rb=box.getBoundingClientRect(); tip.style.left=(ev.clientX-rb.left)+'px'; tip.style.top=(ev.clientY-rb.top)+'px';
          tip.innerHTML='<b>'+names[j]+' · '+g.label+'</b>'+(g.tips?g.tips[j]:fmt(v,opt.unit)); tip.style.opacity=1; });
        hit.addEventListener('mouseleave',function(){ bars.forEach(function(o){o.classList.remove('dim');}); tip.style.opacity=0; });
      });
    });
    if(opt.bench){ var by=top+ph-ph*opt.bench/max, bg=el('g',{'class':'bench'},svg);
      el('line',{x1:left,x2:W-right,y1:by,y2:by},bg);
      var bt=el('text',{x:W-right,y:by-5,'text-anchor':'end'},bg); bt.textContent=opt.benchLabel||''; }
  }

  var V='#2a78d6', A='#eb6834';
  function drawAll(){
    /* Vizag B2C */
    hbar('c-vizag-kw',[
      {label:'storage units',value:70,color:V,tip:'70 searches/month · competition Low'},
      {label:'storage rental',value:10,color:V,tip:'10 searches/month · competition Low'},
      {label:'storage for rent',value:10,color:V,tip:'10 searches/month · competition Low'},
      {label:'self storage',value:10,color:V,tip:'10 searches/month · competition Low'},
      {label:'household storage',value:10,color:V,tip:'10 searches/month · competition not available'}
    ],{labelW:130,aria:'Vizag storage keyword searches per month'});
    hbar('c-vizag-rent',[
      {label:'Yendada',value:23821,color:V},{label:'MVP Colony',value:19333,color:V},
      {label:'Seethammadhara',value:18899,color:V},{label:'Akkayyapalem',value:15249,color:V},
      {label:'Madhurawada',value:14819,color:V},{label:'Kurmannapalem',value:13974,color:V},
      {label:'Anakapalle',value:10375,color:V}
    ],{labelW:120,unit:{pre:'₹'},aria:'Vizag average rent by locality'});
    /* Vizag B2B */
    hbar('c-vizag-wh',[
      {label:'Pedagantyada',value:32.5,text:'₹25–40',color:V,tip:'₹25 – ₹40 per sq. ft.'},
      {label:'Duvvada',value:27.5,text:'₹20–35',color:V,tip:'₹20 – ₹35 per sq. ft.'},
      {label:'Mindi / Kurmannapalem',value:27,text:'₹24–30',color:V,tip:'₹24 – ₹30 per sq. ft.'},
      {label:'Auto Nagar',value:25,text:'₹22–28',color:V,tip:'₹22 – ₹28 per sq. ft.'},
      {label:'Gajuwaka',value:24,text:'₹18–30',color:V,tip:'₹18 – ₹30 per sq. ft.'},
      {label:'Anakapalle',value:12,text:'from ₹12',color:V,tip:'Starts from ₹12 per sq. ft. (cheapest area)'}
    ],{labelW:160,unit:{pre:'₹'},bench:40,benchLabel:'₹40 limit',max:50,aria:'Vizag warehouse rent by area'});
    hbar('c-vizag-3pl',[
      {label:'3pl logistics',value:20,color:V,tip:'20/month · bid ₹65.23–₹548.68'},
      {label:'third party logistics',value:20,color:V,tip:'20/month · bid ₹65.23–₹548.68'},
      {label:'3rd party logistics',value:20,color:V,tip:'20/month · bid ₹65.23–₹548.68'},
      {label:'3pl',value:10,color:V},{label:'3pl companies',value:10,color:V},
      {label:'3pl service',value:10,color:V},{label:'3pl warehouse',value:10,color:V}
    ],{labelW:150,max:100,aria:'Vizag 3PL keyword searches per month'});

    /* Ahmedabad B2C */
    hbar('c-ahd-kw',[
      {label:'storage unit',value:210,color:A,tip:'210/month · Medium · bid ₹31.09–₹275.83'},
      {label:'self storage',value:20,color:A,tip:'20/month · Low · bid ₹90.63–₹281.35'},
      {label:'storage space',value:20,color:A,tip:'20/month · Low'},
      {label:'household storage',value:10,color:A,tip:'10/month · High'},
      {label:'storage rental',value:10,color:A,tip:'10/month · Medium · bid ₹39.07–₹133.30'},
      {label:'storage for rent',value:10,color:A,tip:'10/month · Medium · bid ₹39.07–₹133.30'},
      {label:'rent a storage unit',value:10,color:A},
      {label:'rent storage space',value:10,color:A},
      {label:'mini storage',value:10,color:A},
      {label:'storage room',value:10,color:A}
    ],{labelW:140,aria:'Ahmedabad storage keyword searches per month'});
    hbar('c-ahd-rent',[
      {label:'Satellite / Bodakdev',value:38000,color:A,tip:'₹20,000 – ₹38,000 (premium 2 BHK)'},
      {label:'SG Highway',value:30000,color:A,tip:'₹23,000 – ₹30,000'},
      {label:'South Bopal',value:23000,color:A,tip:'₹17,000 – ₹23,000'},
      {label:'Shela',value:20000,color:A,tip:'₹15,000 – ₹20,000'},
      {label:'Gota',value:18000,color:A,tip:'₹14,000 – ₹18,000'}
    ],{labelW:140,unit:{pre:'₹'},aria:'Ahmedabad 2 BHK rent by locality'});
    /* Ahmedabad B2B */
    hbar('c-ahd-wh',[
      {label:'Sanand-Viramgam',value:22.5,text:'₹18–27',color:A,tip:'₹18 – ₹27 per sq. ft. (Grade A)'},
      {label:'Aslali-Kheda',value:21,text:'₹17–25',color:A,tip:'₹17 – ₹25 per sq. ft. (Grade A)'},
      {label:'Changodar-Bagodara',value:20,text:'₹15–25',color:A,tip:'₹15 – ₹25 per sq. ft. (Grade A)'},
      {label:'Vithalapur-Becharaji',value:18.5,text:'₹16–21',color:A,tip:'₹16 – ₹21 per sq. ft. (Grade A)'}
    ],{labelW:160,unit:{pre:'₹'},bench:40,benchLabel:'₹40 limit',max:50,aria:'Ahmedabad warehouse rent by area'});
    hbar('c-ahd-3pl',[
      {label:'3pl logistics',value:90,color:A,tip:'90/month · bid ₹47.46–₹151.74'},
      {label:'third party logistics',value:90,color:A,tip:'90/month · bid ₹47.46–₹151.74'},
      {label:'3rd party logistics',value:90,color:A,tip:'90/month · bid ₹47.46–₹151.74'},
      {label:'3pl',value:70,color:A,tip:'70/month · bid ₹33.78–₹136.66'},
      {label:'3pl service',value:20,color:A},
      {label:'3pl companies',value:10,color:A,tip:'10/month · bid ₹64.96–₹3,063.08'},
      {label:'3pl warehouse',value:10,color:A,tip:'10/month · bid ₹33.88–₹309.08'}
    ],{labelW:150,max:100,aria:'Ahmedabad 3PL keyword searches per month'});

    /* comparison */
    gbar('c-cmp-pop',[{label:'Metro population',values:[24.97,92.73],tips:['24.97 lakh (Macrotrends 2026)','92.73 lakh (Macrotrends 2026)']}],
      {max:120,bench:100,benchLabel:'Benchmark 100 lakh',aria:'Population comparison'});
    gbar('c-cmp-kw',[
      {label:'B2C storage',values:[110,260],tips:['storage units 70 + 4 terms at 10','storage unit 210 + self storage 20 + 3 terms at 10']},
      {label:'B2B 3PL',values:[150,470],tips:['Same 16 3PL terms','Same 16 3PL terms']}
    ],{aria:'Search volume comparison'});
    gbar('c-cmp-msme',[{label:'MSME registrations',values:[3.39,4.21],tips:['3,39,200 (Udyam + Assist, Jul 2020–Dec 2025)','4.21 lakh Udyam (Aug 2024)']}],
      {max:6,bench:3,benchLabel:'Benchmark 3 lakh',aria:'MSME comparison'});
    gbar('c-cmp-score',[
      {label:'✓ Meets',values:[4,7]},{label:'~ Partial',values:[4,1]},
      {label:'✕ Below',values:[1,1]},{label:'… Pending',values:[7,7]}
    ],{max:10,aria:'B2B scorecard comparison'});
  }

  /* ---------- reveal buttons ---------- */
  function reveal(sectionId, hideId){
    var sec=document.getElementById(sectionId); sec.hidden=false;
    var h=document.getElementById(hideId); if(h) h.style.display='none';
    drawAll(); sec.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function setView(){
    var on = location.hash==='#compare';
    document.body.classList.toggle('view-compare', on);
    if(on){ document.getElementById('compare').hidden=false; drawAll();
      document.querySelectorAll('#compare .fx').forEach(function(e){ e.classList.add('in'); });
      window.scrollTo(0,0); }
  }
  document.getElementById('btn-compare').addEventListener('click',function(){ location.hash='compare'; });
  function goMain(){
    history.replaceState(null,'',location.pathname+location.search);
    ['compare','verdict','plan'].forEach(function(id){ document.getElementById(id).hidden=true; });
    ['verdict-cta','plan-cta'].forEach(function(id){ var e=document.getElementById(id); if(e) e.style.display=''; });
    setView();
  }
  document.getElementById('btn-back').addEventListener('click',function(){
    goMain(); var c=document.getElementById('compare-cta'); if(c) c.scrollIntoView({block:'center'});
  });
  document.getElementById('home-link').addEventListener('click',function(ev){
    ev.preventDefault(); goMain(); window.scrollTo({top:0,behavior:'smooth'});
  });
  window.addEventListener('hashchange',setView);
  setView();
  document.getElementById('btn-verdict').addEventListener('click',function(){ reveal('verdict','verdict-cta'); });
  document.getElementById('btn-plan').addEventListener('click',function(){ reveal('plan','plan-cta'); });


  /* ---------- feel: scroll reveal, progress bar, button pulse ---------- */
  var fxEls=document.querySelectorAll('section .sub, .card, .table-wrap, .verdict, .callout');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); },{threshold:.08});
    fxEls.forEach(function(e){ if(!e.closest('header')){ e.classList.add('fx'); io.observe(e);
      e.addEventListener('animationend',function(ev){ if(ev.target===e) e.classList.remove('fx'); }); } });
  }
  window.addEventListener('scroll',function(){
    var h=document.documentElement, p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);
    document.getElementById('progress').style.width=(p*100)+'%';
  },{passive:true});
  document.querySelectorAll('.big-btn').forEach(function(b){
    b.addEventListener('click',function(ev){
      var r=b.getBoundingClientRect(); b.style.setProperty('--x',(ev.clientX-r.left)+'px'); b.style.setProperty('--y',(ev.clientY-r.top)+'px');
      b.classList.add('pulse'); requestAnimationFrame(function(){ requestAnimationFrame(function(){ b.classList.remove('pulse'); }); });
    });
  });


  /* ---------- map trigger & count-up ---------- */
  var mapEl=document.getElementById('india-map');
  try{ var ip=mapEl.querySelector('.india'), L=Math.ceil(ip.getTotalLength()); ip.style.strokeDasharray=L; ip.style.strokeDashoffset=L; }catch(e){}
  if('IntersectionObserver' in window){
    var mo=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ mapEl.classList.add('go'); mo.disconnect(); } }); },{threshold:.3});
    mo.observe(mapEl);
  } else { mapEl.classList.add('go'); }

  function countUp(el){
    var txt=el.textContent, m=txt.match(/\d[\d,]*(\.\d+)?/); if(!m) return;
    var raw=m[0], target=parseFloat(raw.replace(/,/g,'')), dec=(m[1]||'').length-1; if(dec<0) dec=0;
    var pre=txt.slice(0,m.index), post=txt.slice(m.index+raw.length), useComma=raw.indexOf(',')>-1, t0=null, dur=1100;
    function f(v){ var s=v.toFixed(dec); return useComma? Number(s).toLocaleString('en-IN',{minimumFractionDigits:dec,maximumFractionDigits:dec}) : s; }
    function step(ts){ if(!t0) t0=ts; var p=Math.min(1,(ts-t0)/dur), e=1-Math.pow(1-p,3);
      el.textContent=pre+f(target*e)+post; if(p<1) requestAnimationFrame(step); else el.textContent=txt; }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){
    var co=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); co.unobserve(e.target);} }); },{threshold:.6});
    document.querySelectorAll('.stat .value').forEach(function(v){ co.observe(v); });
  }


  /* ---------- end goal map ---------- */
  (function(){
    var btn=document.getElementById('btn-vision'), box=document.getElementById('vision-box'), built=false;
    var K=20, C=Math.cos(22*Math.PI/180), LON0=68, LAT1=37.2;
    function P(lat,lon){ return [((lon-LON0)*C*K).toFixed(1), ((LAT1-lat)*K).toFixed(1)]; }
    var CITIES=[['Delhi',28.61,77.21],['Mumbai',19.08,72.88],['Bengaluru',12.97,77.59],['Chennai',13.08,80.27],['Hyderabad',17.39,78.49],
      ['Kolkata',22.57,88.36],['Pune',18.52,73.86],['Ahmedabad',23.02,72.57],['Visakhapatnam',17.69,83.22],['Jaipur',26.91,75.79],
      ['Lucknow',26.85,80.95],['Chandigarh',30.73,76.78],['Kochi',9.93,76.27],['Bhopal',23.26,77.41],['Indore',22.72,75.86],
      ['Nagpur',21.15,79.09],['Patna',25.59,85.14],['Bhubaneswar',20.30,85.82],['Guwahati',26.14,91.74],['Coimbatore',11.02,76.96],
      ['Surat',21.17,72.83],['Srinagar',34.08,74.80],['Dehradun',30.32,78.03],['Raipur',21.25,81.63],['Ranchi',23.34,85.31],
      ['Goa',15.49,73.83],['Thiruvananthapuram',8.52,76.94],['Mangaluru',12.91,74.86],['Vijayawada',16.51,80.65],['Madurai',9.93,78.12],
      ['Rajkot',22.30,70.80],['Jodhpur',26.24,73.02],['Amritsar',31.63,74.87],['Varanasi',25.32,82.97],['Jabalpur',23.18,79.95],
      ['Aurangabad',19.88,75.34],['Hubballi',15.36,75.12],['Siliguri',26.73,88.40],['Imphal',24.82,93.94],['Agra',27.18,78.01]];
    var LANES=[['Delhi','Mumbai'],['Mumbai','Bengaluru'],['Bengaluru','Chennai'],['Chennai','Kolkata'],['Kolkata','Delhi'],
      ['Delhi','Ahmedabad'],['Hyderabad','Visakhapatnam'],['Kolkata','Guwahati'],['Bengaluru','Kochi'],['Hyderabad','Nagpur'],
      ['Srinagar','Delhi'],['Jodhpur','Jaipur'],['Rajkot','Ahmedabad'],['Varanasi','Patna'],['Bhubaneswar','Visakhapatnam'],
      ['Guwahati','Imphal'],['Pune','Hyderabad'],['Madurai','Thiruvananthapuram'],['Indore','Bhopal'],['Goa','Hubballi'],
      ['Lucknow','Agra'],['Raipur','Ranchi']];
    function build(){
      var src=document.querySelector('#india-map .india'), svg=document.getElementById('vision-svg');
      var vb=document.getElementById('india-map').getAttribute('viewBox'); svg.setAttribute('viewBox',vb);
      var NS='http://www.w3.org/2000/svg', html='';
      html+='<path class="india" d="'+src.getAttribute('d')+'"/>';
      var pos={}; CITIES.forEach(function(c){ pos[c[0]]=P(c[1],c[2]); });
      LANES.forEach(function(l,i){
        var a=pos[l[0]], b=pos[l[1]], mx=(+a[0]+ +b[0])/2, my=(+a[1]+ +b[1])/2-30;
        html+='<path id="lane'+i+'" class="lane" d="M'+a[0]+','+a[1]+' Q'+mx+','+my+' '+b[0]+','+b[1]+'"/>';
      });
      CITIES.forEach(function(c,i){
        var p=pos[c[0]], d=(0.15+i*0.07).toFixed(2);
        html+='<g transform="translate('+p[0]+','+p[1]+')"><title>'+c[0]+'</title>'+
          '<circle class="wh-pulse" r="9" style="animation-delay:'+d+'s"/>'+
          '<g class="wh" style="animation-delay:'+d+'s"><path d="M-8,0 L0,-7 L8,0 V9 H-8 Z" fill="#56a857" stroke="#fff" stroke-width="1.2" transform="translate(0,-9)"/>'+
          '<rect x="-2.6" y="-6" width="5.2" height="6" fill="#fff"/></g>'+
          ''+'</g>';
      });
      LANES.forEach(function(l,i){
        var dur=(4+ (i%5))+'s', beg=(2.8+i*0.2).toFixed(1)+'s';
        html+='<g class="truck" style="animation-delay:'+beg+'"><g transform="translate(-13,-8) scale(.9)"><rect x="0" y="2" width="18" height="12" rx="2" fill="#56a857"/>'+
          '<path d="M18 6h5l4 4v4h-9z" fill="#d9531e"/><circle cx="6" cy="15" r="2.6" fill="#1d2321"/><circle cx="22" cy="15" r="2.6" fill="#1d2321"/></g>'+
          '<animateMotion dur="'+dur+'" begin="'+beg+'" repeatCount="indefinite" rotate="auto"><mpath href="#lane'+i+'"/></animateMotion></g>';
      });
      svg.innerHTML=html; built=true;
    }
    btn.addEventListener('click',function(){
      box.hidden=false; if(!built) build(); btn.style.display='none';
      box.scrollIntoView({behavior:'smooth',block:'center'});
    });
  })();



  /* ---------- research-report layer: figure/table numbers, section rail, stagger ---------- */
  (function(){
    var f=2, t=1;
    document.querySelectorAll('.chart-card h4').forEach(function(h){ var n=document.createElement('span'); n.className='fig-no'; n.textContent='Fig. '+(f++); h.insertBefore(n,h.firstChild); });
    document.querySelectorAll('.table-wrap').forEach(function(w){ var c=document.createElement('div'); c.className='tab-no'; c.textContent='Table '+(t++); w.parentNode.insertBefore(c,w); });
    var secs=[].slice.call(document.querySelectorAll('main section'));
    var rail=document.createElement('nav'); rail.className='rail'; rail.setAttribute('aria-label','Report sections');
    var items=[];
    secs.forEach(function(sec){ var no=sec.querySelector('.sec-no'), st=sec.querySelector('.step'); if(!no||!st) return;
      var a=document.createElement('a'); a.href='#'+sec.id; a.innerHTML='<b>'+no.textContent+'</b><span>'+st.textContent.split('·')[1].trim()+'</span>';
      a.addEventListener('click',function(ev){ if(sec.hidden){ ev.preventDefault(); } });
      rail.appendChild(a); items.push([sec,a]); });
    var bar=document.createElement('i'); rail.appendChild(bar); document.body.appendChild(rail);
    function upd(){ var y=window.innerHeight*0.35, cur=null;
      items.forEach(function(it){ var vis=!it[0].hidden && getComputedStyle(it[0]).display!=='none'; it[1].style.display=vis?'':'none';
        if(vis && it[0].getBoundingClientRect().top<y) cur=it; });
      items.forEach(function(it){ it[1].classList.toggle('on',it===cur); });
      var h=document.documentElement, p=h.scrollTop/((h.scrollHeight-h.clientHeight)||1); bar.style.transform='scaleY('+Math.min(1,p)+')';
      rail.classList.toggle('show', h.scrollTop>window.innerHeight*0.5 && !document.body.classList.contains('view-compare')); }
    window.addEventListener('scroll',upd,{passive:true}); window.addEventListener('hashchange',function(){setTimeout(upd,50);});
    document.addEventListener('click',function(){setTimeout(upd,400);}); upd();
    if('IntersectionObserver' in window){
      var so=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('seen'); } }); },{threshold:.12});
      secs.forEach(function(x){ so.observe(x); });
    } else secs.forEach(function(x){ x.classList.add('seen'); });
    document.querySelectorAll('.grid').forEach(function(g){ [].forEach.call(g.children,function(c,i){ c.style.setProperty('--d',(i*0.08)+'s'); }); });
  })();

  /* ---------- polish layer 2: word reveals, table labels, parallax, menu, progress ---------- */
  (function(){
    function words(h,base){ if(h.children.length) return; var ws=h.textContent.trim().split(/\s+/);
      h.innerHTML=ws.map(function(w,i){ return '<span class="w"><span style="--i:'+(base+i)+'">'+w+'</span></span>'; }).join(' '); h.classList.add('split'); }
    document.querySelectorAll('main section h2').forEach(function(h){ words(h,0); });
    var h1=document.querySelector('.hero h1'); if(h1) words(h1,0);
    /* data-labels so tables can stack as cards on phones */
    function label(t){ var th=[].map.call(t.querySelectorAll('thead th'),function(x){return x.textContent.trim();});
      t.querySelectorAll('tbody tr').forEach(function(tr){ [].forEach.call(tr.children,function(td,i){ if(th[i]) td.setAttribute('data-label',th[i]); }); }); }
    document.querySelectorAll('.table-wrap table').forEach(label);
    /* progress line */
    var pr=document.getElementById('progress');
    /* parallax numerals + cover map */
    var nums=[].slice.call(document.querySelectorAll('.sec-no')), map=document.querySelector('.hero-map'), tick=false;
    function frame(){ tick=false; var vh=window.innerHeight, h=document.documentElement;
      pr.style.transform='scaleX('+Math.min(1,h.scrollTop/((h.scrollHeight-h.clientHeight)||1))+')';
      nums.forEach(function(n){ var r=n.parentNode.getBoundingClientRect(); if(r.bottom<0||r.top>vh) return;
        n.style.setProperty('--py',((r.top-vh*0.3)*-0.12).toFixed(1)+'px'); });
      if(map && h.scrollTop<vh) map.style.transform='translateY('+(h.scrollTop*0.12).toFixed(1)+'px)'; }
    window.addEventListener('scroll',function(){ if(!tick){ tick=true; requestAnimationFrame(frame);} },{passive:true}); frame();
    /* mobile contents menu */
    var mb=document.getElementById('menu-btn'), mm=document.getElementById('m-menu');
    function close(){ mm.hidden=true; mb.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); }
    mb.addEventListener('click',function(){ var open=mm.hidden; mm.hidden=!open; mb.setAttribute('aria-expanded',open?'true':'false'); document.body.classList.toggle('menu-open',open); });
    mm.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',function(){ close(); if(document.body.classList.contains('view-compare')){ location.hash=''; } }); });
    /* intro curtain removal */
    setTimeout(function(){ var it=document.getElementById('intro'); if(it) it.remove(); },2200);
  })();

  drawAll();
  var rt; window.addEventListener('resize',function(){clearTimeout(rt); rt=setTimeout(drawAll,150);});
})();
