import './polyfills.server.mjs';
import{C as y,a as i,b as n,c as r,d as c,e as m,f as p,m as d,o as l,p as u,q as v,r as h,s as g,v as C,z as x}from"./chunk-DHHQYQC5.mjs";var M=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=i({type:e,selectors:[["app-header"]],standalone:!0,features:[p],decls:2,vars:0,template:function(o,s){o&1&&(n(0,"p"),m(1,"header works!"),r())}});let t=e;return t})();var F=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=i({type:e,selectors:[["app-footer"]],standalone:!0,features:[p],decls:2,vars:0,template:function(o,s){o&1&&(n(0,"p"),m(1,"footer works!"),r())}});let t=e;return t})();var S=(()=>{let e=class e{constructor(){this.title="test"}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=i({type:e,selectors:[["app-root"]],standalone:!0,features:[p],decls:7,vars:0,consts:[["id","container"]],template:function(o,s){o&1&&(n(0,"div",0)(1,"header"),c(2,"app-header"),r(),n(3,"main"),c(4,"router-outlet"),r(),n(5,"footer"),c(6,"app-footer"),r()())},dependencies:[l,x,M,F],styles:["#container[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;min-height:100vh}main[_ngcontent-%COMP%]{flex-grow:1}"]});let t=e;return t})();var w=(()=>{let e=class e{constructor(){}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=i({type:e,selectors:[["app-main"]],standalone:!0,features:[p],decls:2,vars:0,template:function(o,s){o&1&&(n(0,"p"),m(1,"main works!"),r())}});let t=e;return t})();var D=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=i({type:e,selectors:[["app-pagenotfound"]],standalone:!0,features:[p],decls:2,vars:0,template:function(o,s){o&1&&(n(0,"p"),m(1,"Error 404: Page not Found!"),r())}});let t=e;return t})();var E=[{path:"",redirectTo:"/main-component",pathMatch:"full"},{path:"main-component",component:w},{path:"**",component:D}];var T={providers:[y(E),g(),u(v())]};var k={providers:[C()]},P=d(T,k);var A=()=>h(S,P),te=A;export{te as a};
