(function(root){
  'use strict';
  const fresh = () => ({version:1, role:null, remember:false, points:0, crop:'corn', cycle:1, growth:0, planted:false, harvested:false, care:[], tips:[], logs:[], nature:false, previewSeason:null, teaching:false, woven:false, weaveRewarded:false, weaveRounds:0, badges:[], orders:[], packaging:'standard', journey:'plant'});
  function localParts(date,zone='Asia/Shanghai'){
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(date);
    return Object.fromEntries(parts.filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]));
  }
  function seasonAt(date, farm){
    const p=localParts(date,farm.timeZone);
    return Object.keys(farm.seasonMonths).find(s=>farm.seasonMonths[s].includes(p.month))||'spring';
  }
  function canPlant(crop,date,farm,previewSeason){
    if(previewSeason==='spring' && crop.id==='corn') return true;
    return crop.months.includes(localParts(date,farm.timeZone).month);
  }
  function stage(growth){return growth>=100?4:growth>=65?3:growth>=40?2:growth>0?1:0;}
  function care(state,task){
    if(!state.planted||state.harvested||state.care.includes(task.id)||state.growth>=100)return false;
    state.care.push(task.id); state.points+=task.points; state.growth=Math.min(100,state.growth+task.growth);
    if(state.care.length>=3)state.growth=100;
    return true;
  }
  function quiz(state,id,correct){
    if(!correct||state.tips.includes(id))return false;
    state.tips.push(id); state.points+=20;
    if(state.planted&&!state.harvested)state.growth=Math.min(100,state.growth+15);
    return true;
  }
  function accelerate(state){
    if(!state.planted||state.harvested||state.growth>=100||state.points<20)return false;
    state.points-=20;state.growth=Math.min(100,state.growth+15);return true;
  }
  function completeWeave(state){
    state.woven=true;
    if(!state.weaveRewarded){state.points+=10;state.weaveRewarded=true;}
  }
  function packing(state,season){
    // 同一次收获的搭配稳定；重开页面不会反复抽取更高价值物品。
    const seed=state.cycle*17+state.care.length*7+state.tips.length*3;
    const candidates=state.crop==='corn'?['清洁干燥的玉米苞叶（候选）','玉米秸秆纹样纸卡','再生纸缓冲（候选）']:['再生纸缓冲（候选）','作物纹样纸卡'];
    return {filler:candidates[seed%candidates.length], memory:season==='autumn'?'秋叶纹样小卡':'这一季的生长记录卡', growthCard:true};
  }
  function orderAllowed(state,crop){return Boolean(state.harvested&&crop.sellable&&['ready','ordered'].includes(state.journey));}
  function nextCycle(state){
    Object.assign(state,{cycle:state.cycle+1,growth:0,planted:false,harvested:false,care:[],nature:false,teaching:false,packaging:'standard',journey:'plant'});
  }
  function safeLoad(value){
    try{
      const s=JSON.parse(value);if(!s||s.version!==1)return fresh();
      const n=Object.assign(fresh(),s);
      n.points=Math.max(0,Number(n.points)||0);n.growth=Math.max(0,Math.min(100,Number(n.growth)||0));
      ['care','tips','logs','badges','orders'].forEach(k=>{if(!Array.isArray(n[k]))n[k]=[];});
      return n;
    }catch{return fresh();}
  }
  const api={fresh,localParts,seasonAt,canPlant,stage,care,quiz,accelerate,completeWeave,packing,orderAllowed,nextCycle,safeLoad};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.XunsuCore=api;
})(typeof window!=='undefined'?window:globalThis);
