/* 运营配置入口。只有经核实并获授权的案主资料才能替换 pending 字段。 */
window.XUNSU_DATA = {
  version: 1,
  brand: '循塑',
  farm: {
    name: null, province: null, timeZone: 'Asia/Shanghai', verified: false,
    climateLabel: '华北季候 · 示范配置',
    seasonMonths: { spring: [3,4,5], summer: [6,7,8], autumn: [9,10,11], winter: [12,1,2] }
  },
  commerce: {
    mode: 'demo', sellerVerified: false, paymentConfigured: false,
    sellerName: null, origin: null, stock: null, shippingFee: null,
    // 改为 live 前，必须接入服务端库存、支付签名、订单与物流；不能在前端存密钥。
    checkoutEndpoint: null,
    demoProductPrice: 39, demoEcoFee: 8, wovenPoints: 30
  },
  roles: [
    {id:'consumer', name:'好奇的消费者', short:'消费者', icon:'basket', wish:'想把一份亲手照料的心意带回家。', focus:'侧重：种植记录与实物选购'},
    {id:'farmer', name:'土地的照料者', short:'种植农户', icon:'sprout', wish:'想看看一穗玉米怎样被更多人喜欢。', focus:'侧重：农时与作物生长'},
    {id:'eco', name:'环保行动派', short:'环保关注者', icon:'leaf', wish:'想让每一份包装都有更好的去处。', focus:'侧重：环保锦囊与包装探索'},
    {id:'maker', name:'手作收藏家', short:'手作爱好者', icon:'weave', wish:'想让土地的材料变成手里的作品。', focus:'侧重：编织与手作体验'},
    {id:'returner', name:'新农人', short:'返乡青年', icon:'sun', wish:'想连接乡村、手艺与新的生活。', focus:'侧重：案主故事与共创记录'}
  ],
  crops: [
    {id:'corn', name:'文玩玉米', latin:'ORNAMENTAL CORN', months:[4,5,6], window:'4—6月播种', intro:'小小一穗，慢慢长成独一份的颜色。', icon:'corn', demoPrice:39, sellable:true, stages:['一粒种子','幼苗舒展','拔节向上','抽雄吐丝','玉米成熟']},
    {id:'radish', name:'秋日萝卜', latin:'RADISH', months:[3,4,8,9,10,11], window:'示例：春秋播种', intro:'先在土里扎根，再把好奇收进篮子。', icon:'radish', sellable:false, stages:['一粒种子','破土发芽','叶片展开','根部膨大','收获时节']},
    {id:'spinach', name:'当季菠菜', latin:'SPINACH', months:[2,3,4,9,10,11], window:'示例：春秋播种', intro:'一抹新绿，也是土地给生活的回应。', icon:'leaf', sellable:false, stages:['一粒种子','破土发芽','小叶生长','叶丛舒展','收获时节']}
  ],
  seasons: {
    spring:{name:'春', label:'春播时节', line:'风把新的生长，带到你面前。', detail:'嫩芽、微风与一块等你照料的土地。', nature:'一片嫩叶', color:'#89a362'},
    summer:{name:'夏', label:'万物生长', line:'在长长的日照里，照料一份期待。', detail:'浓绿树荫、蝉鸣与舒展的作物。', nature:'一缕日光', color:'#477d51'},
    autumn:{name:'秋', label:'秋意渐浓', line:'把一季的认真，装进一份礼物。', detail:'金黄树叶、轻轻的风与收获的颜色。', nature:'一片落叶', color:'#bd8744'},
    winter:{name:'冬', label:'土地休息', line:'土地也需要休息，好让春天再来。', detail:'安静枝条、薄霜与蓄积力量的土壤。', nature:'冬日枝影', color:'#8d9b9a'}
  },
  care: [
    {id:'water', name:'浇一点水', icon:'water', note:'按需浇水，让根系慢慢舒展。', growth:25, points:15, log:'完成了浇水照料'},
    {id:'weed', name:'看看叶片', icon:'search', note:'观察叶片与虫情，先判断再处理。', growth:25, points:15, log:'观察了叶片与虫情'},
    {id:'soil', name:'照料土壤', icon:'shovel', note:'了解土壤状态，不盲目追加肥料。', growth:25, points:15, log:'学习了土壤照料'}
  ],
  tips: [
    {id:'filler', tag:'包装小锦囊', title:'填充物，越多越好吗？', text:'保护需要先确认。合适的结构和适量缓冲，比堆满材料更有意义。', options:['能装多少就装多少','按保护需要选材与用量','所有材料都可直接回收'], answer:1, explanation:'按实际保护需求选择材料和用量；材料能否回收，也要结合当地规则。'},
    {id:'life', tag:'玉米的一生', title:'玉米怎样长成一穗？', text:'从发芽、幼苗、拔节，到抽雄吐丝与籽粒成熟，生长需要合适的水、温度和时间。', options:['播种后马上结穗','经历多个生长阶段','只靠多施肥就能成熟'], answer:1, explanation:'游戏会压缩时间；真实作物仍要遵循农时，照料也要结合当地条件。'},
    {id:'cost', tag:'环保包装小账本', title:'一只编织外包装，多了什么成本？', text:'看见材料，也看见清理、整理、编织与打包所需的手工时间。', options:['只需要一把免费的苞叶','材料处理与手工时间','一定比所有包装便宜'], answer:1, explanation:'编织包装的价格也包含材料整理与劳动。是否采用，仍要比较保护效果、费用和运输条件。'}
  ],
  // 发起者与7位守村人的个人资料尚未提供；占位条目不是虚构的真实人物。
  cases: [
    {id:'initiator', name:'项目发起者', status:'pending', label:'案主资料待补充', wish:null, photos:[], note:'待本人授权后，补充姓名、项目从0到1的记录与心愿。'},
    ...Array.from({length:7},(_,i)=>({id:`guardian-${i+1}`, name:`守村人 ${String(i+1).padStart(2,'0')}`, status:'pending', label:'等待真实的土地故事', wish:null, photos:[], note:'待核实种植地、种植批次，并由本人授权发布照片与心愿。'}))
  ],
  research: [
    {name:'玉米手工业者', tag:'调研记录归纳', note:'关注原料干燥完整、稳定供货，也关心包装防潮、防损和新增工时。'},
    {name:'集美那厝生态商店', tag:'调研对象 · 非已签约卖家', note:'希望连接生产者与消费者，了解产品来源，并探索更多合适的包装。'},
    {name:'关注环保的年轻消费者', tag:'调研记录归纳', note:'希望看到实际案例与减塑成果，也愿意了解环保包装的价格构成。'}
  ]
};
