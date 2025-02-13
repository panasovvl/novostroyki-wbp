(()=>{"use strict";var e,t={188:(e,t,r)=>{var n=r(660),o=r.n(n),s=r(177),a=r(591),i=r(236),l=r(848),c=r(344),d=r.n(c);window.ResizeObserver=a.A;const p=(e,t)=>(t||document).querySelector(e);p(".m-header__burger").addEventListener("click",(e=>{p(".m-header__box").classList.add("m-header__box_trans"),p(".m-header__box").classList.add("open"),document.body.style.overflow="hidden"})),p(".m-header__burger-close").addEventListener("click",(e=>{p(".m-header__box").classList.remove("open"),p(".m-header__box").scrollTop=0,document.body.style.overflow=""})),document.addEventListener("click",(e=>{!p(".m-header__box").classList.contains("open")||p(".m-header__box").contains(e.target)||p(".m-header__burger").contains(e.target)||(p(".m-header__box").classList.remove("open"),document.body.style.overflow="")}));const _=getComputedStyle(document.documentElement).getPropertyValue("--ham-res"),m=window.matchMedia(`(max-width: ${_}px)`);function u(e,t,r){const n=new s.A(p(".dropsearch__list ul",e));function o(t){const n=t.currentTarget;p("input",e).value=n.getAttribute("data-label"),e.classList.remove("drop_open"),r(n.getAttribute("data-value"))}async function a(){const r=p("input",e).value.trim(),s=await t(r),a=n.getContentElement();if(a.innerHTML="",s.forEach((e=>{if(e.label.toLowerCase().startsWith(r.toLowerCase())){const t=document.createElement("li");t.className="dropsearch__item",t.setAttribute("data-value",e.value),t.setAttribute("data-label",e.label);let n='<span class="dropsearch__item_start">'+e.label.substr(0,r.length)+"</span>";n+=e.label.substr(r.length),t.innerHTML=n,t.addEventListener("click",o),a.appendChild(t)}})),""==a.innerHTML){const e=document.createElement("p");e.className="dropsearch__empty",a.appendChild(e)}}p("input",e).addEventListener("focus",(t=>{a(),p(".dropsearch__list",e).style.display="block",p(".dropsearch__list",e).offsetHeight,e.classList.add("drop_open"),p("input",e).select()})),p("ul",e).addEventListener("transitionend",(t=>{e.classList.contains("drop_open")||(p(".dropsearch__list",e).style.display="none")})),document.addEventListener("click",(t=>{!e.classList.contains("drop_open")||(p(".dropsearch__field",e).contains(t.target)||p(".dropsearch__list",e).contains(t.target))&&p(".dropsearch__icon",e)!=t.target||(e.classList.remove("drop_open"),t.preventDefault())})),p(".dropsearch__clear",e).addEventListener("click",(t=>{p("input",e).value="",p("input",e).focus(),a()})),p("input",e).addEventListener("keyup",a)}function f(e){p("button",e).addEventListener("click",(t=>{e.classList.contains("drop_open")||(p(".drop__box",e).style.display="inherit",p(".drop__box",e).offsetHeight,e.classList.add("drop_open"),t.openning=!0)})),p(".drop__inner",e).addEventListener("transitionend",(t=>{e.classList.contains("drop_open")||(p(".drop__box",e).style.display="none")})),document.addEventListener("click",(t=>{!e.classList.contains("drop_open")||e.contains(t.target)&&(p(".drop__icon",e)!=t.target||t.openning)||e.classList.remove("drop_open")}))}m.addEventListener("change",(e=>{p(".m-header__box").classList.remove("m-header__box_trans"),p(".m-header__box").classList.remove("open"),p(".m-header__box").scrollTop=0,document.body.style.overflow=""}));let h=null,v=null;u(p(".m-filter__city"),(async e=>{const t=await fetch("data/cities.json?c="+encodeURIComponent(e));return await t.json()}),(e=>{h=e,console.log("Выбран город ",h)})),u(p(".m-filter__distr"),(async e=>{const t=await fetch("data/districts.json?c="+encodeURIComponent(h)+"&d="+encodeURIComponent(e));return await t.json()}),(e=>{v=e,console.log("Выбран район ",v)})),f(p(".m-filter__rooms")),p(".m-filter__rooms").addEventListener("change",(e=>{"studio"==e.target.value?console.log("Студия",e.target.checked):console.log("Комнат",e.target.value)})),p(".m-filter__type-grp").addEventListener("change",(e=>{console.log("Тип недвижимости",e.target.value)})),f(p(".m-filter__price"));const b=o()({alias:"integer",min:0,allowMinus:!1,showMaskOnHover:!0,rightAlign:!1,numericInput:!0});function g(){let e=p(".m-filter__city input").getAttribute(m.matches?"data-ph-mobile":"data-ph");p(".m-filter__city input").setAttribute("placeholder",e),e=p(".m-filter__distr input").getAttribute(m.matches?"data-ph-mobile":"data-ph"),p(".m-filter__distr input").setAttribute("placeholder",e)}b.mask(p(".m-filter__price input[name=price-from]")),b.mask(p(".m-filter__price input[name=price-to]")),f(p(".m-filter__area")),b.mask(p(".m-filter__area input[name=area-from]")),b.mask(p(".m-filter__area input[name=area-to]")),g(),p(".m-filter__mobile-search").addEventListener("click",(e=>{p(".m-filter__group").classList.add("m-filter__group_trans"),p(".m-filter__group").classList.add("open"),document.body.style.overflow="hidden"})),p(".m-filter__mobile-close").addEventListener("click",(e=>{p(".m-filter__group").classList.remove("open"),p(".m-filter__group").scrollTop=0,document.body.style.overflow=""})),document.addEventListener("click",(e=>{!p(".m-filter__group").classList.contains("open")||p(".m-filter__group").contains(e.target)||p(".m-filter__mobile-search").contains(e.target)||(p(".m-filter__group").classList.remove("open"),document.body.style.overflow="")})),m.addEventListener("change",(e=>{p(".m-filter__group").classList.remove("m-filter__group_trans"),p(".m-filter__group").classList.remove("open"),p(".m-filter__group").scrollTop=0,document.body.style.overflow="",g()})),new i.A(".m-popular__swiper",{loop:!0,slidesPerView:1.1,spaceBetween:8,breakpoints:{[_]:{slidesPerView:2,spaceBetween:24},1100:{slidesPerView:3,spaceBetween:25}},centeredSlides:!0,modules:[l.Vx,l.dK],pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});let L=null;function w(){m.matches?L?(L.attachEvents(),L.closeAll()):L=new(d())(".m-serv__accord",{}):L&&(L.detachEvents(),L.openAll())}w(),m.addEventListener("change",w),o()({mask:"+7 999 999 99 99",showMaskOnHover:!0}).mask(p(".m-consult__tel"))}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var s=r[e]={exports:{}};return t[e].call(s.exports,s,s.exports,n),s.exports}n.m=t,e=[],n.O=(t,r,o,s)=>{if(!r){var a=1/0;for(d=0;d<e.length;d++){for(var[r,o,s]=e[d],i=!0,l=0;l<r.length;l++)(!1&s||a>=s)&&Object.keys(n.O).every((e=>n.O[e](r[l])))?r.splice(l--,1):(i=!1,s<a&&(a=s));if(i){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[r,o,s]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={524:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,s,[a,i,l]=r,c=0;if(a.some((t=>0!==e[t]))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(l)var d=l(n)}for(t&&t(r);c<a.length;c++)s=a[c],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(d)},r=self.webpackChunkwebpack_test1=self.webpackChunkwebpack_test1||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[96],(()=>n(188)));o=n.O(o)})();