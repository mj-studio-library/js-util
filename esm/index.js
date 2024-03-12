function t(t){return t.trim().replace(/[:-]/g,"_").replace(/(^_+|_+$)/g,"").replace(/_+[a-z0-9]/g,(t=>t.charAt(t.length-1).toUpperCase()))}function e(t){if(!t||"object"!=typeof t)return!1;if(null===Object.getPrototypeOf(t))return!0;let e=t;for(;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}function r(t){return Array.isArray(t)}function n(o){if(0===o||null===o)return o;if(!o)return o;if(!r(o)&&!e(o))return o;if(r(o))return o.map(n);{const i={};return Object.entries(o).forEach((([o,u])=>{e(u)?u=n(u):r(u)&&(u=u.map(n)),i[t(o)]=u})),i}}const o={number:t=>"number"==typeof t&&!isNaN(t),string:t=>"string"==typeof t,integerString:t=>u.notEmptyString(t)&&u.number(Number(t))&&/^-?\d+$/.test(t),numberString:t=>u.notEmptyString(t)&&u.number(Number(t))&&/^-?\d+(\.\d+)?$/.test(t),null:t=>null===t,undefined:t=>void 0===t,nullOrUndefined:t=>null==t,falsy:t=>!t,truthy:t=>!!t,function:t=>"function"==typeof t,object:t=>"object"==typeof t&&null!==t,plainObject:t=>e(t),array:t=>Array.isArray(t),boolean:t=>"boolean"==typeof t,promise:t=>null!==t&&"object"==typeof t&&"function"==typeof t.then&&"function"==typeof t.catch},i={notEmptyString:t=>o.string(t)&&t.length>0,emptyString:t=>o.string(t)&&0===t.length,emptyArray:t=>o.array(t)&&0===t.length,notEmptyArray:t=>o.array(t)&&t.length>0},u={...o,...i};function f(t){return u.notEmptyString(t)?`${t[0].toUpperCase()}${t.substring(1)}`:t}function c(t,e){if(!t||"object"!=typeof t&&!Array.isArray(t))return t;let r=JSON.stringify(t);return Object.entries(e).forEach((([t,e])=>{const n=new RegExp(`"${t}":`,"g");r=r.replace(n,`"${e}":`)})),JSON.parse(r)}function a(t,e,r){if(!Array.isArray(t))return;let n=0,o=Math.floor(t.length/r);t.length%r!=0&&o++;const i=[];for(let u=0;n<o;u+=r){const o=t.slice(u,u+r);i.push(e(o,n)),n++}return i}function l(t,e,r,n){if(function(t){return!("function"==typeof t||null!==t&&"object"==typeof t||Array.isArray(t))}(t))return[!1,t];if(Array.isArray(t)){let o=t.map((t=>l(t,e,r,!1)));return r?[!0,o.map((t=>t[1]))]:n?[!0,o.filter((t=>t[0])).map((t=>t[1]))]:(o=o.filter((t=>t[0])),0===o.length?[!1,void 0]:[!0,o.map((t=>t[1]))])}{const o={};return Object.entries(t).forEach((([t,n])=>{const i=function(t,e){return"function"==typeof e?e(t):Array.isArray(e)?e.includes(t):t===e}(t,e),u=l(n,e,r||i,!1);(i||u[0]||r)&&(o[t]=u[1])})),n||r||0!==Object.keys(o).length?[!0,o]:[!1,void 0]}}function s(t,e){return l(t,e,!1,!0)[1]}function p(t){return t.filter((t=>!u.null(t)&&!u.undefined(t)))}function y(t){if(u.number(t)||u.string(t)||!t)return t+"";try{return JSON.stringify(t,null,2)}catch(t){return"Error"}}function h(t){return t<0?[]:[...new Array(t).keys()]}function g(t,e){const r=new Map;return t.reduce(((t,n)=>{const o="function"==typeof e?e(n):e;if(r.has(o))t[r.get(o)].push(n);else{const e=t.length;r.set(o,e),t[e]=[n]}return t}),[])}function m(t,e){return t.reduce(((t,r)=>{const n="function"==typeof e?e(r):e;return(t[n]=t[n]||[]).push(r),t}),{})}function b(t){return Boolean(t&&"function"==typeof t.then)}function d(t,e){for(let r=t.length-e.length;r>=0;r--)if(t.substring(r,r+e.length)===e)return r;return-1}function A(t){return t[t.length-1]}function j(t){if(!u.number(t))return"";const e=t.toString().split(".");return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),e.join(".")}function O(t,e=2){return u.number(t)?(t+"").padStart(e,"0"):""}function M(t,e){return new Promise(((r,n)=>{const o=Date.now();e.then((e=>{const n=Date.now()-o;n>t?r(e):setTimeout((()=>{r(e)}),t-n)})).catch(n)}))}function E(t,e){return Promise.race([e,new Promise(((e,r)=>setTimeout((()=>{r(new Error("Promise timeout in withTimeout<T>"))}),t)))])}function w(t){return t[Math.floor(Math.random()*t.length)]}function S(t){return Array.isArray(t)}function $(t,r){if(!t)return t;if(!S(t)&&!e(t))return t;if(S(t))return t.map((t=>$(t,r)));{const n={};return Object.entries(t).forEach((([t,o])=>{r.replaceMap&&r.replaceMap[t]?"function"==typeof r.replaceMap[t]?n[t]=r.replaceMap[t](o):n[t]=r.replaceMap[t]:(e(o)?o=$(o,r):S(o)&&(o=o.map((t=>$(t,r)))),n[t]=o);let i=!1;r.stripUndefined&&void 0===n[t]&&(delete n[t],i=!0),S(n[t])||e(n[t])||i||!r.postLeafTransform||(n[t]=r.postLeafTransform(n[t]))})),n}}function P(t){if(!t||Array.isArray(t)||"object"!=typeof t)return t;const e={};return Object.entries(t).forEach((([t,r])=>{if("string"!=typeof r&&"number"!=typeof r)throw new Error("All values have to be string or number in reverseObjectKeyValues()");e[r]=t})),e}class T{handlerRef={id:-1};cleared=!1;get handler(){return this.handlerRef.id}set handler(t){this.handlerRef.id=t}clear(){this.cleared=!0,clearTimeout(this.handlerRef.id)}}function v(t,e){const r=new T,n=()=>{r.handler=setTimeout((()=>{t((()=>{r.clear()})),r.cleared||n()}),e)};return n(),()=>{r.clear()}}function N(t,e,r=""){return t?.toFixed?.(e)??r}function R(t,e,r=""){let n=N(t,e,r);for(;n.length&&"0"===n.charAt(n.length-1);)n=n.substring(0,n.length-1);return n.length&&"."===n.charAt(n.length-1)&&(n=n.substring(0,n.length-1)),n}function U(t,e){return t.includes(e)?t.filter((t=>t!==e)):[...t,e]}function _(t){if(!u.number(t))return"";if(t<1e3)return t+"";if(t<1e6){const e=Math.floor(t/1e3),r=Math.floor(t%1e3/100);return 0!==r?`${e}.${r}K`:`${e}K`}const e=Math.floor(t/1e6),r=Math.floor(t%1e6/1e5);return 0!==r?`${e}.${r}M`:`${e}M`}function x(t){return[...new Set(t)]}export{T as TimeoutHandler,t as camelCase,n as camelCaseObject,f as capitalize,c as convertJsonKeys,a as doBatch,s as filterJsonKeys,p as filterNullish,y as formatJson,h as generateArray,g as groupByArray,m as groupByObject,u as is,e as isPlainObject,b as isPromise,d as lastMatchIndex,A as lastOf,j as numberWithComma,O as padZero,w as randomItem,$ as replaceJsonKeys,P as reverseObjectKeyValues,v as setIntervalWithTimeout,N as toFixed,R as toFixedIfNeed,_ as toSiUnitString,U as toggled,x as unique,M as withMinimumResolveTime,E as withTimeout};
