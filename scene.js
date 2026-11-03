(function(){
  'use strict';
  const palettes={
    spring:{sky:'#e3eee4',far:'#c7d6ad',hill:'#b6cb94',grass:'#9cb976',leaf:'#7f9c54',light:'#adbf75',soil:'#aa805b'},
    summer:{sky:'#d9ebdf',far:'#b3cda5',hill:'#8db37d',grass:'#71995d',leaf:'#477b4e',light:'#779e5b',soil:'#a97d55'},
    autumn:{sky:'#eee9d9',far:'#ded6b4',hill:'#cccca0',grass:'#bdc18c',leaf:'#b98949',light:'#d9b66b',soil:'#a67b55'},
    winter:{sky:'#e4e9e7',far:'#d0d6cb',hill:'#bec9b7',grass:'#b4bdab',leaf:'#a3afa0',light:'#ccd4c8',soil:'#998975'}
  };
  function corn(x,y,scale,growth){
    if(growth<=0)return '';
    const h=growth<35?40:growth<65?82:growth<100?119:144;
    const leaves=growth<35?2:4;
    return `<g class="plant-sway" style="transform-origin:${x}px ${y}px;animation-delay:-${x/100}s"><g transform="translate(${x} ${y}) scale(${scale})"><path d="M0 0Q-4 -${h/2} 0 -${h}" stroke="#527d43" stroke-width="5" fill="none"/>${Array.from({length:leaves},(_,i)=>{const yy=-15-i*22;const side=i%2?1:-1;return `<path d="M0 ${yy}Q${side*43} ${yy-41} ${side*52} ${yy-27}Q${side*33} ${yy+1} 0 ${yy+4}" fill="${i%2?'#71934e':'#5b8146'}"/>`;}).join('')}${growth>=65?`<path d="M0 -${h}l-8 -12m8 8l8 -10m-8 7v-12" stroke="#a08748" stroke-width="2"/>`:''}${growth>=100?`<g transform="translate(9 -85) rotate(19)"><ellipse rx="13" ry="29" fill="#c69743"/><path d="M-9 -23V22M0 -28V28M9 -23V22" stroke="#e7bb62" stroke-width="4"/><path d="M-11 -13h22M-13 -3h26M-13 7h26M-10 17h20" stroke="#9e713b" stroke-width="2"/><path d="M-13 10Q-25 35 0 39Q17 24 15 5L0 31Z" fill="#6b8a43"/></g>`:''}</g></g>`;
  }
  function cropSVG(crop,growth,x,y,scale){
    if(crop==='corn')return corn(x,y,scale,growth);
    if(!growth)return '';
    return `<g transform="translate(${x} ${y}) scale(${scale})">${crop==='radish'&&growth>=65?'<path d="M-12 0Q0 28 13 0Z" fill="#e7dfbd"/>':''}${Array.from({length:5},(_,i)=>`<ellipse cx="${(i-2)*8}" cy="${-12-growth/9}" rx="${5+growth/18}" ry="${12+growth/5}" transform="rotate(${(i-2)*20} ${(i-2)*8} 0)" fill="${i%2?'#668c55':'#7d9f5e'}"/>`).join('')}</g>`;
  }
  function person(season){
    const shirt=season==='winter'?'#5d7565':season==='summer'?'#f1e5c9':'#e8d9b7';
    return `<g class="farmer-figure" transform="translate(235 314)"><ellipse cx="25" cy="121" rx="42" ry="9" fill="#4d6140" opacity=".15"/><path d="M11 84L5 113q7 8 17 1l5-25M34 85l9 26q15 9 19 1L48 81" fill="#455c48"/><path d="M8 41Q-2 61 4 88Q27 97 52 83L47 45Z" fill="${shirt}"/><path d="M13 44l3 20h23l4-21 8 4 5 43H5L8 44Z" fill="#6b7e5c"/><path d="M45 51q18 14 28 11" stroke="${shirt}" stroke-width="13" stroke-linecap="round"/><path d="M71 62l8-5" stroke="#c99870" stroke-width="8" stroke-linecap="round"/><path d="M6 51l-11 28" stroke="${shirt}" stroke-width="12" stroke-linecap="round"/><circle cx="28" cy="25" r="20" fill="#d9ac84"/><path d="M9 21q-1-27 27-21 18 8 13 26l-9-15-21 4-7 14" fill="#514d37"/><path d="M20 24h1m16 0h1" stroke="#4c4c38" stroke-width="3" stroke-linecap="round"/><path d="M26 33q5 4 9-1" fill="none" stroke="#9c7054" stroke-width="2" stroke-linecap="round"/><ellipse cx="24" cy="4" rx="40" ry="9" transform="rotate(-8 24 4)" fill="#c9ad77"/><path d="M2 2Q-1-28 20-29q24-5 27 24" fill="#deca97"/><path d="M4-4q20 5 40-4" fill="none" stroke="#a68e5f" stroke-width="5"/>${season==='winter'?'<path d="M9 42l38-2-5 11-29-1Z" fill="#b98c65"/>':''}<g transform="translate(76 55)"><path d="M-9 5h29l-2 17H-6Z" fill="#789c93"/><path d="M20 8l16-6 3 5-19 8M-5 4q1-16 15-12" fill="none" stroke="#789c93" stroke-width="5"/><path d="M36 5l8 1" stroke="#52796e" stroke-width="5"/></g></g>`;
  }
  function tree(season,p){
    const branches='<path d="M785 381Q780 283 792 191M788 285l-47-64-18-39M788 279l48-63 14-42M790 239l-23-78M791 214l37-60" stroke="#8b7656" stroke-width="14" stroke-linecap="round" fill="none"/>';
    return `<g class="tree"><ellipse cx="786" cy="386" rx="104" ry="14" fill="#485d3c" opacity=".1"/>${branches}${season==='winter'?'<path d="M722 180l26 8m83-32 26 6" stroke="#f3f5ef" stroke-width="9" stroke-linecap="round"/>':`<g class="tree-crown"><path d="M690 212Q659 177 688 145Q678 102 722 98Q737 63 776 82Q814 53 841 90Q890 87 890 128Q931 153 907 190Q907 229 860 233Q830 260 794 238Q757 259 729 233Q704 244 690 212Z" fill="${p.leaf}"/><path d="M696 154Q689 116 727 117Q746 85 774 105Q813 76 840 112Q881 102 885 140Q840 123 824 145Q789 117 768 149Q732 128 696 154Z" fill="${p.light}"/><path d="M717 207l8-5m20-39 8-6m46 51 8-5m38-41 7-6m-50-56 7-5m-70 14 7-4m105 62 7-4" stroke="#eee2ad" stroke-width="5" opacity=".42" stroke-linecap="round"/></g>`}${season==='autumn'?'<g fill="#b78745"><path class="falling-leaf leaf-a" d="M724 240q16-3 11 10-11 5-11-10"/><path class="falling-leaf leaf-b" d="M852 251q16-3 11 10-11 5-11-10"/><path d="M758 388q13-8 17 1-9 9-17-1M834 392q10-9 15-1-4 8-15 1"/></g>':''}</g>`;
  }
  function render({season='autumn',growth=0,crop='corn',night=false,harvested=false}){
    const p=palettes[season];
    return `<svg class="farm-svg ${night?'is-night':''}" viewBox="0 0 1000 560" role="img" aria-label="${season==='spring'?'春日':season==='summer'?'夏日':season==='winter'?'冬日':'秋日'}田地：一位照料者、一块土地和一棵随季节变化的树。当前成长值${growth}。"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="${night?'#718682':p.sky}"/><stop offset="1" stop-color="${night?'#c8ccad':'#f6f0df'}"/></linearGradient><linearGradient id="ground" x2="0" y2="1"><stop stop-color="${p.grass}"/><stop offset="1" stop-color="#dce0bd"/></linearGradient><linearGradient id="plot" x2="0" y2="1"><stop stop-color="${p.soil}"/><stop offset="1" stop-color="#b78d65"/></linearGradient><filter id="soft"><feGaussianBlur stdDeviation="13"/></filter></defs>
    <rect width="1000" height="560" fill="url(#sky)"/>
    ${night?'<circle cx="743" cy="83" r="28" fill="#faf0ca"/><circle cx="754" cy="75" r="25" fill="#718682"/><g fill="#fff6d7" opacity=".8"><circle cx="210" cy="77" r="2"/><circle cx="486" cy="49" r="2"/><circle cx="598" cy="109" r="2"/><circle cx="898" cy="74" r="2"/></g>':'<circle cx="677" cy="95" r="53" fill="#f2df9c" opacity=".45" filter="url(#soft)"/><circle cx="677" cy="95" r="33" fill="#f4e7b8"/>'}
    <g class="cloud cloud-one" fill="#fbfaf1" opacity=".66"><path d="M113 104q-8-15 7-21 4-23 27-14 15-16 30 0 20-4 23 17 18 2 15 18Z"/></g><g class="cloud cloud-two" fill="#fffaf0" opacity=".52"><path d="M435 143q-8-17 12-21 9-26 29-12 18-13 30 5 22-2 20 19 11 0 13 9Z"/></g>
    <path d="M0 269Q145 160 292 245Q421 158 573 238Q713 166 1000 242V560H0Z" fill="${p.far}"/>
    <path d="M0 295Q184 228 333 284Q559 188 741 272Q892 221 1000 273V560H0Z" fill="${p.hill}"/>
    <path d="M0 353Q254 287 448 322Q706 263 1000 334V560H0Z" fill="url(#ground)"/>
    <path d="M1000 292Q779 326 664 364Q553 400 565 560H741Q638 445 744 398Q856 343 1000 352Z" fill="#e5d8b5" opacity=".85"/>
    <g transform="translate(71 232) scale(.8)"><path d="M0 20h102v69H0Z" fill="#ede6d0"/><path d="M-14 22L44-20 114 22Z" fill="#aa8f71"/><path d="M59 43h23v46H59Z" fill="#90836c"/><path d="M14 43h25v24H14Z" fill="${night?'#f0cf82':'#a3b0a0'}"/><path d="M-18 89h134" stroke="#9ca780" stroke-width="4"/></g>
    <g opacity=".45" stroke="#77915e" stroke-width="2"><path d="M31 371l-7-13m7 13 5-16m54 55-7-12m7 12 4-15m773 24-8-13m8 13 4-19M922 475l-8-15m8 15 4-16"/></g>
    <ellipse cx="492" cy="461" rx="192" ry="48" fill="#718350" opacity=".13" filter="url(#soft)"/>
    <path d="M356 367L661 397 602 483 295 443Z" fill="#94704f"/><path d="M356 358L663 391 600 475 294 435Z" fill="url(#plot)"/>
    <g stroke="#8c694d" stroke-width="6" opacity=".5" stroke-linecap="round"><path d="M353 382l252 27M336 403l253 29M321 426l251 28"/></g>
    <g stroke="#d7b58a" stroke-width="2" opacity=".55"><path d="M359 371l254 28M342 394l253 29M328 416l253 28"/></g>
    ${harvested?'<g transform="translate(482 393)"><path d="M-39 0h78l-7 49H-32Z" fill="#c49c62"/><path d="M-33 0q3-45 33-45T33 0" stroke="#a67e4b" stroke-width="8" fill="none"/><path d="M-30 11h60m-57 12h54m-51 12h48" stroke="#a67e4b" stroke-width="3"/><ellipse cx="0" cy="-2" rx="11" ry="26" fill="#d6a94d" transform="rotate(30)"/><ellipse cx="-20" cy="1" rx="11" ry="25" fill="#af7848" transform="rotate(-20 -20 1)"/></g>':[[390,397,.9],[465,407,1],[545,415,.95],[352,429,.9],[431,440,1.05],[515,447,1]].map(([x,y,s])=>cropSVG(crop,growth,x,y,s)).join('')}
    ${tree(season,p)}${person(season)}
    <g transform="translate(320 313)"><path d="M0 25V74" stroke="#8f7a51" stroke-width="5"/><path d="M-20 0h65l-5 29h-64Z" fill="#ebdfbb"/><path d="M-12 7h40M-13 15h25" stroke="#9a9b70" stroke-width="3" stroke-linecap="round"/></g>
    ${season==='winter'?'<path d="M1 528q180-15 298 0m456-31 232-8" stroke="#eaf0e3" stroke-width="16" opacity=".65" stroke-linecap="round"/>':''}
    <g fill="#d6c49a"><ellipse cx="118" cy="470" rx="6" ry="3"/><ellipse cx="855" cy="487" rx="8" ry="4"/><ellipse cx="906" cy="368" rx="5" ry="3"/></g>
    </svg>`;
  }
  window.XunsuScene={render};
})();
