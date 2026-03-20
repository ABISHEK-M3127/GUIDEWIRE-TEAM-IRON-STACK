'use strict';

const DB = (() => {
  const USERS = [
    {id:'u1',email:'worker@gigshield.in',password:'worker123',role:'worker',
     name:'Ravi Kumar',city:'Hyderabad',plan:'standard',weeks:6,claims:1,
     ncr_wallet:38,kyc:'verified',loyalty_tier:'none',joined:'2024-01-15'},
    {id:'u2',email:'admin@gigshield.in',password:'admin123',role:'admin',
     name:'Admin — GigShield',city:null,plan:null,weeks:0,claims:0,
     ncr_wallet:0,kyc:'verified',loyalty_tier:null,joined:'2023-06-01'},
  ];

  const PLANS = {
    simple: {name:'Simple',weekly:25,insured:800,cap_normal:500,cap_monsoon:320,ncr:8,
      payouts:{light_rain:80,heavy_rain:150,heat:120,lockdown:150,downtime:60,cyclone:150}},
    standard: {name:'Standard',weekly:50,insured:1500,cap_normal:1200,cap_monsoon:750,ncr:15,
      payouts:{light_rain:120,heavy_rain:300,heat:200,lockdown:350,downtime:100,cyclone:350}},
    premium: {name:'Premium',weekly:90,insured:3000,cap_normal:2200,cap_monsoon:1400,ncr:25,
      payouts:{light_rain:180,heavy_rain:450,heat:300,lockdown:450,downtime:150,cyclone:450}},
  };

  const CITIES = [
    {id:'hyd',name:'Hyderabad',rain:24,temp:32,risk:'high',claim_rate:68,workers:287,ncr_paused:true,alert:'IMD Red Alert Active'},
    {id:'che',name:'Chennai',rain:19,temp:34,risk:'medium',claim_rate:62,workers:198,ncr_paused:true,alert:'Light rain expected'},
    {id:'mum',name:'Mumbai',rain:31,temp:29,risk:'high',claim_rate:38,workers:342,ncr_paused:true,alert:'IMD Orange Alert'},
    {id:'blr',name:'Bengaluru',rain:8,temp:28,risk:'low',claim_rate:12,workers:156,ncr_paused:false,alert:'Clear skies'},
    {id:'del',name:'Delhi',rain:2,temp:38,risk:'low',claim_rate:9,workers:143,ncr_paused:false,alert:'Dry — no trigger'},
    {id:'pun',name:'Pune',rain:14,temp:31,risk:'medium',claim_rate:14,workers:121,ncr_paused:false,alert:'Light rain'},
  ];

  const PAYOUTS = [
    {id:'p1',user_id:'u1',date:'Today',event:'Heavy Rain',detail:'IMD Red Alert · 24mm',amount:300,status:'processing'},
    {id:'p2',user_id:'u1',date:'Week 5',event:'NCR Cashback',detail:'Calm week',amount:15,status:'credited'},
    {id:'p3',user_id:'u1',date:'Week 4',event:'Heavy Rain',detail:'IMD Red Alert · 31mm',amount:300,status:'credited'},
    {id:'p4',user_id:'u1',date:'Week 4',event:'Light Rain',detail:'8mm rainfall',amount:120,status:'credited'},
    {id:'p5',user_id:'u1',date:'Week 3',event:'Heavy Rain',detail:'IMD Red Alert',amount:300,status:'credited'},
    {id:'p6',user_id:'u1',date:'Week 2',event:'NCR Cashback',detail:'Calm week',amount:15,status:'credited'},
    {id:'p7',user_id:'u1',date:'Week 1',event:'Light Rain',detail:'12mm rainfall',amount:120,status:'credited'},
  ];

  const WORKERS = [
    {id:'w1',name:'Ravi Kumar',city:'Hyderabad',plan:'standard',weeks:6,claims:1,risk:'High',status:'active',email:'worker@gigshield.in'},
    {id:'w2',name:'Priya Sharma',city:'Chennai',plan:'premium',weeks:10,claims:1,risk:'Medium',status:'active',email:'priya@gig.in'},
    {id:'w3',name:'Amit Patel',city:'Mumbai',plan:'standard',weeks:3,claims:2,risk:'High',status:'active',email:'amit@gig.in'},
    {id:'w4',name:'Sunita Rao',city:'Bengaluru',plan:'simple',weeks:8,claims:0,risk:'Low',status:'active',email:'sunita@gig.in'},
    {id:'w5',name:'Karan Singh',city:'Delhi',plan:'simple',weeks:2,claims:0,risk:'Low',status:'active',email:'karan@gig.in'},
    {id:'w6',name:'Divya Nair',city:'Hyderabad',plan:'premium',weeks:11,claims:2,risk:'High',status:'active',email:'divya@gig.in'},
    {id:'w7',name:'Mohan Das',city:'Pune',plan:'standard',weeks:5,claims:1,risk:'Medium',status:'active',email:'mohan@gig.in'},
    {id:'w8',name:'Fatima Sheikh',city:'Mumbai',plan:'standard',weeks:7,claims:3,risk:'High',status:'review',email:'fatima@gig.in'},
  ];

  const FRAUD_QUEUE = [
    {id:'f1',worker:'W-4421',city:'Mumbai',signal:'GPS spoofing suspected',action:'hold'},
    {id:'f2',worker:'W-8837',city:'Delhi',signal:'Duplicate event submission',action:'review'},
    {id:'f3',worker:'W-2291',city:'Hyderabad',signal:'Abnormal claim pattern',action:'review'},
    {id:'f4',worker:'W-5512',city:'Pune',signal:'Location mismatch',action:'hold'},
  ];

  const TRIGGER_EVENTS = [
    {icon:'🌊',title:'Heavy Rain — Hyderabad',sub:'24mm · IMD Red Alert · 287 workers',amount:'₹300 × 287',bg:'rgba(37,99,235,.08)'},
    {icon:'🌊',title:'Heavy Rain — Mumbai',sub:'31mm · IMD Orange Alert · 342 workers',amount:'₹300 × 342',bg:'rgba(37,99,235,.08)'},
    {icon:'🌧️',title:'Light Rain — Chennai',sub:'19mm · Threshold met · 198 workers',amount:'₹120 × 198',bg:'rgba(5,150,105,.07)'},
    {icon:'🌧️',title:'Light Rain — Pune',sub:'14mm · Monitoring · 121 workers',amount:'₹120 × 121',bg:'rgba(5,150,105,.05)'},
  ];

  return {USERS, PLANS, CITIES, PAYOUTS, WORKERS, FRAUD_QUEUE, TRIGGER_EVENTS};
})();

// ═══════════════════════════════════════════════
//  AUTH SERVICE
// ═══════════════════════════════════════════════

window.DB = DB;
