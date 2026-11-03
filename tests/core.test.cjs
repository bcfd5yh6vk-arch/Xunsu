const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../core.js');
const farm={timeZone:'Asia/Shanghai',seasonMonths:{spring:[3,4,5],summer:[6,7,8],autumn:[9,10,11],winter:[12,1,2]}};
const corn={id:'corn',months:[4,5,6],sellable:true};

test('按产区时区跨月切换季节；过季玉米只能在显式春播体验中种植',()=>{
  assert.equal(C.seasonAt(new Date('2026-02-28T16:01:00Z'),farm),'spring');
  assert.equal(C.seasonAt(new Date('2026-11-03T04:00:00Z'),farm),'autumn');
  assert.equal(C.canPlant(corn,new Date('2026-11-03T04:00:00Z'),farm,null),false);
  assert.equal(C.canPlant(corn,new Date('2026-11-03T04:00:00Z'),farm,'spring'),true);
});
test('同一照料不能重复领取积分，完成三项照料可以成熟，不依赖剩余积分',()=>{
  const s=C.fresh();s.planted=true;s.growth=10;
  const task={id:'water',growth:25,points:15};
  assert.equal(C.care(s,task),true);assert.equal(s.points,15);
  assert.equal(C.care(s,task),false);assert.equal(s.points,15);
  C.care(s,{...task,id:'weed'});C.care(s,{...task,id:'soil'});
  assert.equal(s.growth,100);
  assert.equal(C.care(s,{...task,id:'extra'}),false);
});
test('错误答案没有积分；已领取的锦囊和编织首奖不能重复领取',()=>{
  const s=C.fresh();assert.equal(C.quiz(s,'filler',false),false);assert.equal(s.points,0);
  C.quiz(s,'filler',true);C.quiz(s,'filler',true);assert.equal(s.points,20);
  C.completeWeave(s);C.completeWeave(s);assert.equal(s.points,30);
});
test('加速不会令积分为负，成熟作物不能继续消费加速',()=>{
  const s=C.fresh();s.planted=true;s.growth=90;s.points=19;
  assert.equal(C.accelerate(s),false);assert.equal(s.points,19);
  s.points=20;assert.equal(C.accelerate(s),true);assert.equal(s.growth,100);assert.equal(s.points,0);
  s.points=20;assert.equal(C.accelerate(s),false);assert.equal(s.points,20);
});
test('成熟、收获和选好包装才解锁选购；拓展作物不伪装成已上架商品',()=>{
  const s=C.fresh();s.growth=100;assert.equal(C.orderAllowed(s,corn),false);
  s.harvested=true;s.journey='packing';assert.equal(C.orderAllowed(s,corn),false);
  s.journey='ready';assert.equal(C.orderAllowed(s,corn),true);
  assert.equal(C.orderAllowed(s,{...corn,sellable:false}),false);
});
test('材料搭配在同一轮记录下稳定，新一季保留身份、积分与既有订单',()=>{
  const s=C.fresh();s.role='eco';s.points=40;s.care=['water'];s.orders=[{id:'test'}];
  assert.deepEqual(C.packing(s,'autumn'),C.packing(s,'autumn'));
  C.nextCycle(s);assert.equal(s.role,'eco');assert.equal(s.points,40);assert.equal(s.orders[0].id,'test');assert.equal(s.planted,false);assert.equal(s.cycle,2);
});
test('损坏的本地存储不会阻断初次体验',()=>{
  assert.deepEqual(C.safeLoad('not-json'),C.fresh());
  assert.equal(C.safeLoad('{"version":1,"points":-20}').points,0);
});
