import{_ as l,s as m,a as u,u as p,r as s,o as t,c as o,b as a,d as _,w as r,F as x,e as g,f,g as v,t as y}from"./index-b7e74c7d.js";import{C as b}from"./Card-81ccef60.js";import"./leaflet-src-5870507e.js";const h={components:{Card:b,LMap:m,LTileLayer:u},setup(){return{buildingsStore:p()}},data(){return{zoom:2}},computed:{tents(){return this.buildingsStore.buildings}}},k={class:"mx-4 lg:mx-auto lg:max-w-4xl xl:max-w-6xl pt-20"},C={class:"grid gap-4 divide-y divide-gray-200"},L={class:"divide-y divide-y-200 -mx-4"};function w(n,B,S,$,V,i){const c=s("RouterLink"),d=s("Card");return t(),o("main",k,[a("div",C,[_(d,{title:"Tenten"},{default:r(()=>[a("div",L,[(t(!0),o(x,null,g(i.tents,e=>(t(),f(c,{to:"/accommodations/"+e.id,class:"block px-4 py-2"},{default:r(()=>[v(y(e.name),1)]),_:2},1032,["to"]))),256))])]),_:1})])])}const R=l(h,[["render",w]]);export{R as default};
