!function(e){var r={};function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,r,t){s.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,r){if(1&r&&(e=s(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)s.d(t,n,function(r){return e[r]}.bind(null,n));return t},s.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(r,"a",r),r},s.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},s.p="",s(s.s=7)}({0:function(e,r,s){(function(s){var t,n,a;n=[e],void 0===(a="function"==typeof(t=function(e){"use strict";if(void 0===window.browser||Object.getPrototypeOf(window.browser)!==Object.prototype||Object.getPrototypeOf(s)!==Object.prototype){const r="The message port closed before a response was received.",s="Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",t=()=>{const e={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getBrowserInfo:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(e).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class t extends WeakMap{constructor(e,r){super(r),this.createItem=e}get(e){return this.has(e)||this.set(e,this.createItem(e)),super.get(e)}}const n=(e,r)=>(...s)=>{chrome.runtime.lastError?e.reject(chrome.runtime.lastError):r.singleCallbackArg||s.length<=1?e.resolve(s[0]):e.resolve(s)},a=e=>1==e?"argument":"arguments",g=(e,r,s)=>new Proxy(r,{apply:(r,t,n)=>s.call(t,e,...n)});let m=Function.call.bind(Object.prototype.hasOwnProperty);const i=(e,r={},s={})=>{let t=Object.create(null),o={has:(r,s)=>s in e||s in t,get(o,l,A){if(l in t)return t[l];if(!(l in e))return;let c=e[l];if("function"==typeof c)if("function"==typeof r[l])c=g(e,e[l],r[l]);else if(m(s,l)){let r=((e,r)=>function(s,...t){if(t.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${a(r.minArgs)} for ${e}(), got ${t.length}`);if(t.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${a(r.maxArgs)} for ${e}(), got ${t.length}`);return new Promise((a,g)=>{if(r.fallbackToNoCallback)try{s[e](...t,n({resolve:a,reject:g},r))}catch(n){console.warn(e+" API method doesn't seem to support the callback parameter, falling back to call it without a callback: ",n),s[e](...t),r.fallbackToNoCallback=!1,r.noCallback=!0,a()}else r.noCallback?(s[e](...t),a()):s[e](...t,n({resolve:a,reject:g},r))})})(l,s[l]);c=g(e,e[l],r)}else c=c.bind(e);else{if("object"!=typeof c||null===c||!m(r,l)&&!m(s,l))return Object.defineProperty(t,l,{configurable:!0,enumerable:!0,get:()=>e[l],set(r){e[l]=r}}),c;c=i(c,r[l],s[l])}return t[l]=c,c},set:(r,s,n,a)=>(s in t?t[s]=n:e[s]=n,!0),defineProperty:(e,r,s)=>Reflect.defineProperty(t,r,s),deleteProperty:(e,r)=>Reflect.deleteProperty(t,r)},l=Object.create(e);return new Proxy(l,o)},o=e=>({addListener(r,s,...t){r.addListener(e.get(s),...t)},hasListener:(r,s)=>r.hasListener(e.get(s)),removeListener(r,s){r.removeListener(e.get(s))}});let l=!1;const A=new t(e=>"function"!=typeof e?e:function(r,t,n){let a,g,m=!1,i=new Promise(e=>{a=function(r){l||(console.warn(s,(new Error).stack),l=!0),m=!0,e(r)}});try{g=e(r,t,a)}catch(e){g=Promise.reject(e)}const o=!0!==g&&(A=g)&&"object"==typeof A&&"function"==typeof A.then;var A;if(!0!==g&&!o&&!m)return!1;const c=e=>{e.then(e=>{n(e)},e=>{let r;r=e&&(e instanceof Error||"string"==typeof e.message)?e.message:"An unexpected error occurred",n({__mozWebExtensionPolyfillReject__:!0,message:r})}).catch(e=>{console.error("Failed to send onMessage rejected reply",e)})};return c(o?g:i),!0}),c=({reject:e,resolve:s},t)=>{chrome.runtime.lastError?chrome.runtime.lastError.message===r?s():e(chrome.runtime.lastError):t&&t.__mozWebExtensionPolyfillReject__?e(new Error(t.message)):s(t)},d=(e,r,s,...t)=>{if(t.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${a(r.minArgs)} for ${e}(), got ${t.length}`);if(t.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${a(r.maxArgs)} for ${e}(), got ${t.length}`);return new Promise((e,r)=>{const n=c.bind(null,{resolve:e,reject:r});t.push(n),s.sendMessage(...t)})},x={runtime:{onMessage:o(A),onMessageExternal:o(A),sendMessage:d.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:d.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},u={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return e.privacy={network:{networkPredictionEnabled:u,webRTCIPHandlingPolicy:u},services:{passwordSavingEnabled:u},websites:{hyperlinkAuditingEnabled:u,referrersEnabled:u}},i(chrome,x,e)};e.exports=t()}else e.exports=s})?t.apply(r,n):t)||(e.exports=a)}).call(this,s(0))},7:function(e,r,s){(function(e){let r;r=chrome||e;const s=e=>new Promise((s,t)=>r.storage.local.get(e,e=>r.runtime.lastError?t(Error(r.runtime.lastError.message)):s(e)));document.getElementById("elimina-tutti").addEventListener("click",()=>{confirm("Sicuro di volerli eliminare tutti?")&&(r.storage.local.set({msgProgrammati:[]}),document.getElementById("elenco-messaggi").innerHTML='<tr class="row100 body">\n        <td class="cell100 column1" colspan=4><span class="text-center">Nessun messaggio programmato!</span></td>\n    </tr>')});const t=async(e,t)=>{if(confirm("Sicuro di voler eliminare il messaggio?")){let n;try{if(n=(await s("msgProgrammati")).msgProgrammati,null==n)throw Exception();n.splice(t,1)}catch(e){n=[]}r.storage.local.set({msgProgrammati:n}),e.parentElement.parentElement.remove()}},n=async(e,t,n,a,g)=>{let m;try{if(m=(await s("msgProgrammati")).msgProgrammati,null==m)throw Exception();m[e][t]=n}catch(e){m=[]}try{r.storage.local.set({msgProgrammati:m}),a.className+=" td-success"}catch(e){console.error(e),a.className+=" td-error"}setTimeout(()=>{a.className=g},500)};document.addEventListener("DOMContentLoaded",async()=>{try{(await s("temaScuro")).temaScuro?(document.getElementById("tabella").className="table100 ver3 m-b-110",document.getElementById("style").setAttribute("href","programmati/css/stylesDark.css")):document.getElementById("tabella").className="table100 ver1 m-b-110";const e=(await s("msgProgrammati")).msgProgrammati;if(e.length>0){document.getElementById("elenco-messaggi").innerHTML="";for(let r=0;r<e.length;r++){const s=e[r].orario.split("T");let a=`${s[0]} alle ${s[1]}`;document.getElementById("elenco-messaggi").innerHTML+=`<tr class="row100 body">\n    <td class="cell100 column1" contenteditable="true" id="msg-${r}">${e[r].msg}</td>\n    <td class="cell100 column2" contenteditable="true" id="nome-${r}">${e[r].nome}</td>\n    <td class="cell100 column3" contenteditable="true" id="orario-${r}">${a}</td>\n    <td class="cell100 column4">\n        <button class="btn btn-danger" id="elimina-${r}">\n            <i class="fa fa-trash"></i>\n        </button>\n    </td>\n</tr>`,setTimeout(()=>{document.getElementById("msg-"+r).addEventListener("keypress",(async function(e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),await n(r,"msg",this.innerHTML,this,"cell100 column1"))})),document.getElementById("nome-"+r).addEventListener("keypress",(async function(e){"Enter"===e.key&&(e.preventDefault(),await n(r,"nome",this.innerText,this,"cell100 column2"))})),document.getElementById("orario-"+r).addEventListener("keypress",(async function(e){if("Enter"===e.key){e.preventDefault();const s=this.innerText.split(" alle ");await n(r,"orario",`${s[0]}T${s[1]}`,this,"cell100 column3")}})),document.getElementById("elimina-"+r).addEventListener("click",(async function(){await t(this,parseInt(this.id.split("-")[1]))}))},500)}}else document.getElementById("elenco-messaggi").innerHTML='<tr class="row100 body">\n        <td class="cell100 column1" colspan=4><span class="text-center">Nessun messaggio programmato!</span></td>\n    </tr>'}catch(e){console.error(e)}})}).call(this,s(0))}});