(function(l,D){typeof exports=="object"&&typeof module<"u"?D(exports):typeof define=="function"&&define.amd?define(["exports"],D):(l=typeof globalThis<"u"?globalThis:l||self,D(l.GouvWidgets={}))})(this,(function(l){"use strict";var sr=Object.defineProperty;var c=(l,D)=>sr(l,"name",{value:D,configurable:!0});var W,K,Et,J,X,Y,Z,ee,te,re,ie,ne,ae,se;var D=typeof document<"u"?document.currentScript:null;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const me=globalThis,Pe=me.ShadowRoot&&(me.ShadyCSS===void 0||me.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ee=Symbol(),Ze=new WeakMap;let et=(W=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Pe&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Ze.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ze.set(t,e))}return e}toString(){return this.cssText}},c(W,"n"),W);const Dt=c(a=>new et(typeof a=="string"?a:a+"",void 0,Ee),"r$4"),tt=c((a,...e)=>{const t=a.length===1?a[0]:e.reduce((i,r,n)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+a[n+1],a[0]);return new et(t,a,Ee)},"i$3"),kt=c((a,e)=>{if(Pe)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=me.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,a.appendChild(i)}},"S$1"),rt=Pe?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Dt(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Rt,defineProperty:xt,getOwnPropertyDescriptor:Nt,getOwnPropertyNames:Mt,getOwnPropertySymbols:Tt,getPrototypeOf:Ot}=Object,R=globalThis,it=R.trustedTypes,Lt=it?it.emptyScript:"",De=R.reactiveElementPolyfillSupport,oe=c((a,e)=>a,"d$1"),ve={toAttribute(a,e){switch(e){case Boolean:a=a?Lt:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},ke=c((a,e)=>!Rt(a,e),"f$1"),nt={attribute:!0,type:String,converter:ve,reflect:!1,useDefault:!1,hasChanged:ke};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),R.litPropertyMetadata??(R.litPropertyMetadata=new WeakMap);let B=(K=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=nt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&xt(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:n}=Nt(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:r,set(s){const o=r==null?void 0:r.call(this);n==null||n.call(this,s),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??nt}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;const e=Ot(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){const t=this.properties,i=[...Mt(t),...Tt(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(rt(r))}else e!==void 0&&t.push(rt(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return kt(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var n;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const s=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:ve).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){var n,s;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),u=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:ve;this._$Em=r;const f=u.fromAttribute(t,o.type);this[r]=f??((s=this._$Ej)==null?void 0:s.get(r))??f,this._$Em=null}}requestUpdate(e,t,i,r=!1,n){var s;if(e!==void 0){const o=this.constructor;if(r===!1&&(n=this[e]),i??(i=o.getPropertyOptions(e)),!((i.hasChanged??ke)(n,t)||i.useDefault&&i.reflect&&n===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:n},s){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),n!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,s]of r){const{wrapped:o}=s,u=this[n];o!==!0||this._$AL.has(n)||u===void 0||this.C(n,void 0,s,u)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}},c(K,"y"),K);B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[oe("elementProperties")]=new Map,B[oe("finalized")]=new Map,De==null||De({ReactiveElement:B}),(R.reactiveElementVersions??(R.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const le=globalThis,at=c(a=>a,"i$1"),be=le.trustedTypes,st=be?be.createPolicy("lit-html",{createHTML:c(a=>a,"createHTML")}):void 0,ot="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,lt="?"+x,Gt=`<${lt}>`,T=document,ue=c(()=>T.createComment(""),"c"),ce=c(a=>a===null||typeof a!="object"&&typeof a!="function","a"),Re=Array.isArray,Ut=c(a=>Re(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function","d"),xe=`[ 	
\f\r]`,de=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,ct=/>/g,O=RegExp(`>|${xe}(?:([^\\s"'>=/]+)(${xe}*=${xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dt=/'/g,ht=/"/g,pt=/^(?:script|style|textarea|title)$/i,Ft=c(a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),"x"),h=Ft(1),j=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ft=new WeakMap,L=T.createTreeWalker(T,129);function gt(a,e){if(!Re(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return st!==void 0?st.createHTML(e):e}c(gt,"V");const zt=c((a,e)=>{const t=a.length-1,i=[];let r,n=e===2?"<svg>":e===3?"<math>":"",s=de;for(let o=0;o<t;o++){const u=a[o];let f,g,p=-1,y=0;for(;y<u.length&&(s.lastIndex=y,g=s.exec(u),g!==null);)y=s.lastIndex,s===de?g[1]==="!--"?s=ut:g[1]!==void 0?s=ct:g[2]!==void 0?(pt.test(g[2])&&(r=RegExp("</"+g[2],"g")),s=O):g[3]!==void 0&&(s=O):s===O?g[0]===">"?(s=r??de,p=-1):g[1]===void 0?p=-2:(p=s.lastIndex-g[2].length,f=g[1],s=g[3]===void 0?O:g[3]==='"'?ht:dt):s===ht||s===dt?s=O:s===ut||s===ct?s=de:(s=O,r=void 0);const M=s===O&&a[o+1].startsWith("/>")?" ":"";n+=s===de?u+Gt:p>=0?(i.push(f),u.slice(0,p)+ot+u.slice(p)+x+M):u+x+(p===-2?o:M)}return[gt(a,n+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},"N"),Se=class Se{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,s=0;const o=e.length-1,u=this.parts,[f,g]=zt(e,t);if(this.el=Se.createElement(f,i),L.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=L.nextNode())!==null&&u.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(ot)){const y=g[s++],M=r.getAttribute(p).split(x),Ce=/([.?@])?(.*)/.exec(y);u.push({type:1,index:n,name:Ce[2],strings:M,ctor:Ce[1]==="."?Me:Ce[1]==="?"?Te:Ce[1]==="@"?Oe:q}),r.removeAttribute(p)}else p.startsWith(x)&&(u.push({type:6,index:n}),r.removeAttribute(p));if(pt.test(r.tagName)){const p=r.textContent.split(x),y=p.length-1;if(y>0){r.textContent=be?be.emptyScript:"";for(let M=0;M<y;M++)r.append(p[M],ue()),L.nextNode(),u.push({type:2,index:++n});r.append(p[y],ue())}}}else if(r.nodeType===8)if(r.data===lt)u.push({type:2,index:n});else{let p=-1;for(;(p=r.data.indexOf(x,p+1))!==-1;)u.push({type:7,index:n}),p+=x.length-1}n++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}};c(Se,"S");let he=Se;function I(a,e,t=a,i){var s,o;if(e===j)return e;let r=i!==void 0?(s=t._$Co)==null?void 0:s[i]:t._$Cl;const n=ce(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((o=r==null?void 0:r._$AO)==null||o.call(r,!1),n===void 0?r=void 0:(r=new n(a),r._$AT(a,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=I(a,r._$AS(a,e.values),r,i)),e}c(I,"M");const Ve=class Ve{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??T).importNode(t,!0);L.currentNode=r;let n=L.nextNode(),s=0,o=0,u=i[0];for(;u!==void 0;){if(s===u.index){let f;u.type===2?f=new pe(n,n.nextSibling,this,e):u.type===1?f=new u.ctor(n,u.name,u.strings,this,e):u.type===6&&(f=new Le(n,this,e)),this._$AV.push(f),u=i[++o]}s!==(u==null?void 0:u.index)&&(n=L.nextNode(),s++)}return L.currentNode=T,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};c(Ve,"R");let Ne=Ve;const Ae=class Ae{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),ce(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==j&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ut(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&ce(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=he.createElement(gt(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(t);else{const s=new Ne(r,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(e){let t=ft.get(e.strings);return t===void 0&&ft.set(e.strings,t=new he(e)),t}k(e){Re(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const n of e)r===t.length?t.push(i=new Ae(this.O(ue()),this.O(ue()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const r=at(e).nextSibling;at(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}};c(Ae,"k");let pe=Ae;const Qe=class Qe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(e,t=this,i,r){const n=this.strings;let s=!1;if(n===void 0)e=I(this,e,t,0),s=!ce(e)||e!==this._$AH&&e!==j,s&&(this._$AH=e);else{const o=e;let u,f;for(e=n[0],u=0;u<n.length-1;u++)f=I(this,o[i+u],t,u),f===j&&(f=this._$AH[u]),s||(s=!ce(f)||f!==this._$AH[u]),f===m?e=m:e!==m&&(e+=(f??"")+n[u+1]),this._$AH[u]=f}s&&!r&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};c(Qe,"H");let q=Qe;const We=class We extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}};c(We,"I");let Me=We;const Ke=class Ke extends q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}};c(Ke,"L");let Te=Ke;const Je=class Je extends q{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){if((e=I(this,e,t,0)??m)===j)return;const i=this._$AH,r=e===m&&i!==m||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==m&&(i===m||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}};c(Je,"z");let Oe=Je;const Xe=class Xe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}};c(Xe,"Z");let Le=Xe;const Ge=le.litHtmlPolyfillSupport;Ge==null||Ge(he,pe),(le.litHtmlVersions??(le.litHtmlVersions=[])).push("3.3.2");const Bt=c((a,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const n=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new pe(e.insertBefore(ue(),n),n,void 0,t??{})}return r._$AI(a),r},"D");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=globalThis,Ye=class Ye extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Bt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return j}};c(Ye,"i");let $=Ye;$._$litElement$=!0,$.finalized=!0,(Et=G.litElementHydrateSupport)==null||Et.call(G,{LitElement:$});const Ue=G.litElementPolyfillSupport;Ue==null||Ue({LitElement:$}),(G.litElementVersions??(G.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=c(a=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)},"t");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:ke},It=c((a=jt,e,t)=>{const{kind:i,metadata:r}=t;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((a=Object.create(a)).wrapped=!0),n.set(t.name,a),i==="accessor"){const{name:s}=t;return{set(o){const u=e.get.call(this);e.set.call(this,o),this.requestUpdate(s,u,a,!0,o)},init(o){return o!==void 0&&this.C(s,void 0,a,o),o}}}if(i==="setter"){const{name:s}=t;return function(o){const u=this[s];e.call(this,o),this.requestUpdate(s,u,a,!0,o)}}throw Error("Unsupported decorator location: "+i)},"r$1");function d(a){return(e,t)=>typeof t=="object"?It(a,e,t):((i,r,n)=>{const s=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),s?Object.getOwnPropertyDescriptor(r,n):void 0})(a,e,t)}c(d,"n");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function w(a){return d({...a,state:!0,attribute:!1})}c(w,"r");function b(a,e){if(!e||e.trim()==="")return a;const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=a;for(const n of i){if(r==null||typeof r!="object")return;r=r[n]}return r}c(b,"getByPath");function qt(a,e){return b(a,e)!==void 0}c(qt,"hasPath");function mt(a,e,t){const r=e.replace(/\[(\d+)\]/g,".$1").split(".");let n=a;for(let s=0;s<r.length-1;s++){const o=r[s];(!(o in n)||typeof n[o]!="object"||n[o]===null)&&(n[o]={}),n=n[o]}n[r[r.length-1]]=t}c(mt,"setByPath");function Ht(a,e,t){const i=b(a,e);return i!==void 0?i:t}c(Ht,"getByPathOrDefault");const Vt="https://chartsbuilder.matge.com/beacon",vt=new Set;function H(a,e){const t=`${a}:${e||""}`;if(vt.has(t)||(vt.add(t),typeof window>"u"))return;const i=window.location.hostname;if(i==="localhost"||i==="127.0.0.1"||i==="chartsbuilder.matge.com")return;const r=new URLSearchParams;r.set("c",a),e&&r.set("t",e);const n=`${Vt}?${r.toString()}`;try{fetch(n,{method:"GET",keepalive:!0,mode:"no-cors"}).catch(()=>{})}catch{}}c(H,"sendWidgetBeacon");function bt(a,e=!1){if(typeof a=="number")return isNaN(a)?e?null:0:a;if(typeof a!="string")return e?null:0;let t=a.trim();if(t==="")return e?null:0;t=t.replace(/\s/g,"");const i=t.includes(","),r=t.includes(".");if(i&&r){const s=t.lastIndexOf(","),o=t.lastIndexOf(".");s>o?t=t.replace(/\./g,"").replace(",","."):t=t.replace(/,/g,"")}else i&&(t=t.replace(",","."));const n=parseFloat(t);return isNaN(n)?e?null:0:n}c(bt,"toNumber");function Qt(a){if(typeof a!="string")return!1;const e=a.trim();return e===""?!1:/^-?[\d\s]+([.,]\d+)?$/.test(e)}c(Qt,"looksLikeNumber");function Wt(a){return!a||typeof a!="string"||["N/A","null","undefined","00",""].includes(a)?!1:!!(a==="2A"||a==="2B"||/^97[1-6]$/.test(a)||/^(0[1-9]|[1-8]\d|9[0-5])$/.test(a))}c(Wt,"isValidDeptCode");const Fe={baseUrl:"https://chartsbuilder.matge.com",endpoints:{grist:"/grist-proxy",gristGouv:"/grist-gouv-proxy",albert:"/albert-proxy",tabular:"/tabular-proxy"}};function Kt(){return typeof window<"u"&&window.location.hostname==="localhost"&&window.location.port==="5173"}c(Kt,"isViteDevMode");function Jt(){return typeof window<"u"&&"__TAURI__"in window}c(Jt,"isTauriMode");function Xt(){var i;const a={...Fe.endpoints};return Kt()?{baseUrl:"",endpoints:a}:Jt()?{baseUrl:Fe.baseUrl,endpoints:a}:{baseUrl:((i={url:typeof document>"u"&&typeof location>"u"?require("url").pathToFileURL(__filename).href:typeof document>"u"?location.href:D&&D.tagName.toUpperCase()==="SCRIPT"&&D.src||new URL("gouv-widgets.umd.js",document.baseURI).href}.env)==null?void 0:i.VITE_PROXY_URL)||Fe.baseUrl,endpoints:a}}c(Xt,"getProxyConfig");function Yt(a){return typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&a.includes("tabular-api.data.gouv.fr")?a.replace("https://tabular-api.data.gouv.fr","/tabular-proxy"):a}c(Yt,"getProxiedUrl");const P={LOADED:"gouv-data-loaded",ERROR:"gouv-data-error",LOADING:"gouv-data-loading"},ze=new Map;function Zt(a,e){ze.set(a,e)}c(Zt,"setDataCache");function fe(a){return ze.get(a)}c(fe,"getDataCache");function Be(a){ze.delete(a)}c(Be,"clearDataCache");function V(a,e){Zt(a,e);const t=new CustomEvent(P.LOADED,{bubbles:!0,composed:!0,detail:{sourceId:a,data:e}});document.dispatchEvent(t)}c(V,"dispatchDataLoaded");function U(a,e){const t=new CustomEvent(P.ERROR,{bubbles:!0,composed:!0,detail:{sourceId:a,error:e}});document.dispatchEvent(t)}c(U,"dispatchDataError");function F(a){const e=new CustomEvent(P.LOADING,{bubbles:!0,composed:!0,detail:{sourceId:a}});document.dispatchEvent(e)}c(F,"dispatchDataLoading");function _e(a,e){const t=c(n=>{const s=n;s.detail.sourceId===a&&e.onLoaded&&e.onLoaded(s.detail.data)},"handleLoaded"),i=c(n=>{const s=n;s.detail.sourceId===a&&e.onError&&e.onError(s.detail.error)},"handleError"),r=c(n=>{n.detail.sourceId===a&&e.onLoading&&e.onLoading()},"handleLoading");return document.addEventListener(P.LOADED,t),document.addEventListener(P.ERROR,i),document.addEventListener(P.LOADING,r),()=>{document.removeEventListener(P.LOADED,t),document.removeEventListener(P.ERROR,i),document.removeEventListener(P.LOADING,r)}}c(_e,"subscribeToSource");var E=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};l.GouvSource=(J=class extends ${constructor(){super(...arguments),this.url="",this.method="GET",this.headers="",this.params="",this.refresh=0,this.transform="",this._loading=!1,this._error=null,this._data=null,this._refreshInterval=null,this._abortController=null}createRenderRoot(){return this}render(){return h``}connectedCallback(){super.connectedCallback(),H("gouv-source"),this._setupRefresh()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&Be(this.id)}updated(e){(e.has("url")||e.has("params")||e.has("transform"))&&this._fetchData(),e.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._fetchData()},this.refresh*1e3))}async _fetchData(){if(this.url){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,F(this.id);try{const e=Yt(this._buildUrl()),t=this._buildFetchOptions(),i=await fetch(e,{...t,signal:this._abortController.signal});if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);const r=await i.json();this._data=this.transform?b(r,this.transform):r,V(this.id,this._data)}catch(e){if(e.name==="AbortError")return;this._error=e,U(this.id,this._error),console.error(`gouv-source[${this.id}]: Erreur de chargement`,e)}finally{this._loading=!1}}}_buildUrl(){const e=window.location.origin!=="null"?window.location.origin:void 0,t=new URL(this.url,e);if(this.params&&this.method==="GET")try{const i=JSON.parse(this.params);Object.entries(i).forEach(([r,n])=>{t.searchParams.set(r,String(n))})}catch(i){console.warn("gouv-source: params invalides (JSON attendu)",i)}return t.toString()}_buildFetchOptions(){const e={method:this.method};if(this.headers)try{e.headers=JSON.parse(this.headers)}catch(t){console.warn("gouv-source: headers invalides (JSON attendu)",t)}return this.method==="POST"&&this.params&&(e.headers={"Content-Type":"application/json",...e.headers||{}},e.body=this.params),e}reload(){this._fetchData()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},c(J,"GouvSource"),J),E([d({type:String})],l.GouvSource.prototype,"url",void 0),E([d({type:String})],l.GouvSource.prototype,"method",void 0),E([d({type:String})],l.GouvSource.prototype,"headers",void 0),E([d({type:String})],l.GouvSource.prototype,"params",void 0),E([d({type:Number})],l.GouvSource.prototype,"refresh",void 0),E([d({type:String})],l.GouvSource.prototype,"transform",void 0),E([w()],l.GouvSource.prototype,"_loading",void 0),E([w()],l.GouvSource.prototype,"_error",void 0),E([w()],l.GouvSource.prototype,"_data",void 0),l.GouvSource=E([A("gouv-source")],l.GouvSource);var _=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};const ye=100,je=10;l.GouvQuery=(X=class extends ${constructor(){super(...arguments),this.apiType="generic",this.source="",this.baseUrl="",this.datasetId="",this.resource="",this.select="",this.where="",this.filter="",this.groupBy="",this.aggregate="",this.orderBy="",this.limit=0,this.transform="",this.refresh=0,this._loading=!1,this._error=null,this._data=[],this._rawData=[],this._refreshInterval=null,this._abortController=null,this._unsubscribe=null}createRenderRoot(){return this}render(){return h``}connectedCallback(){super.connectedCallback(),H("gouv-query",this.apiType),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&Be(this.id)}updated(e){["source","apiType","baseUrl","dataset","resource","select","where","filter","groupBy","aggregate","orderBy","limit","transform"].some(i=>e.has(i))&&this._initialize(),e.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._initialize()},this.refresh*1e3))}_initialize(){if(!this.id){console.warn('gouv-query: attribut "id" requis pour identifier la requête');return}this.apiType==="generic"?this._subscribeToSource():this._fetchFromApi()}_subscribeToSource(){if(!this.source){console.warn('gouv-query: attribut "source" requis en mode generic');return}this._unsubscribe&&this._unsubscribe();const e=fe(this.source);e!==void 0&&(this._rawData=Array.isArray(e)?e:[e],this._processClientSide()),this._unsubscribe=_e(this.source,{onLoaded:c(t=>{this._rawData=Array.isArray(t)?t:[t],this._processClientSide()},"onLoaded"),onLoading:c(()=>{this._loading=!0,F(this.id)},"onLoading"),onError:c(t=>{this._error=t,this._loading=!1,U(this.id,t)},"onError")})}_processClientSide(){try{F(this.id),this._loading=!0;let e=[...this._rawData];const t=this.filter||this.where;t&&(e=this._applyFilters(e,t)),this.groupBy&&(e=this._applyGroupByAndAggregate(e)),this.orderBy&&(e=this._applySort(e)),this.limit>0&&(e=e.slice(0,this.limit)),this._data=e,V(this.id,this._data)}catch(e){this._error=e,U(this.id,this._error),console.error(`gouv-query[${this.id}]: Erreur de traitement`,e)}finally{this._loading=!1}}_applyFilters(e,t){const i=this._parseFilters(t);return e.filter(r=>i.every(n=>this._matchesFilter(r,n)))}_parseFilters(e){const t=[],i=e.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const n=r.split(":");if(n.length>=2){const s=n[0],o=n[1];let u;if(n.length>2){const f=n.slice(2).join(":");o==="in"||o==="notin"?u=f.split("|").map(g=>{const p=this._parseValue(g);return typeof p=="boolean"?String(p):p}):u=this._parseValue(f)}t.push({field:s,operator:o,value:u})}}return t}_parseValue(e){return e==="true"?!0:e==="false"?!1:!isNaN(Number(e))&&e!==""?Number(e):e}_matchesFilter(e,t){const i=b(e,t.field);switch(t.operator){case"eq":return i==t.value;case"neq":return i!=t.value;case"gt":return Number(i)>Number(t.value);case"gte":return Number(i)>=Number(t.value);case"lt":return Number(i)<Number(t.value);case"lte":return Number(i)<=Number(t.value);case"contains":return String(i).toLowerCase().includes(String(t.value).toLowerCase());case"notcontains":return!String(i).toLowerCase().includes(String(t.value).toLowerCase());case"in":return Array.isArray(t.value)&&t.value.includes(i);case"notin":return Array.isArray(t.value)&&!t.value.includes(i);case"isnull":return i==null;case"isnotnull":return i!=null;default:return!0}}_applyGroupByAndAggregate(e){const t=this.groupBy.split(",").map(s=>s.trim()).filter(Boolean),i=this._parseAggregates(this.aggregate),r=new Map;for(const s of e){const o=t.map(u=>String(b(s,u)??"")).join("|||");r.has(o)||r.set(o,[]),r.get(o).push(s)}const n=[];for(const[s,o]of r){const u={},f=s.split("|||");t.forEach((g,p)=>{mt(u,g,f[p])});for(const g of i){const p=g.alias||`${g.field}__${g.function}`;mt(u,p,this._computeAggregate(o,g))}n.push(u)}return n}_parseAggregates(e){if(!e)return[];const t=[],i=e.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const n=r.split(":");n.length>=2&&t.push({field:n[0],function:n[1],alias:n[2]})}return t}_computeAggregate(e,t){const i=e.map(r=>Number(b(r,t.field))).filter(r=>!isNaN(r));switch(t.function){case"count":return e.length;case"sum":return i.reduce((r,n)=>r+n,0);case"avg":return i.length>0?i.reduce((r,n)=>r+n,0)/i.length:0;case"min":return i.length>0?Math.min(...i):0;case"max":return i.length>0?Math.max(...i):0;default:return 0}}_applySort(e){const t=this.orderBy.split(":");if(t.length<1)return e;const i=t[0],r=(t[1]||"asc").toLowerCase();return[...e].sort((n,s)=>{const o=b(n,i),u=b(s,i),f=Number(o),g=Number(u);if(!isNaN(f)&&!isNaN(g))return r==="desc"?g-f:f-g;const p=String(o??""),y=String(u??"");return r==="desc"?y.localeCompare(p):p.localeCompare(y)})}async _fetchFromApi(){if(!this.datasetId){console.warn('gouv-query: attribut "dataset" requis pour les requêtes API');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,F(this.id);try{this.apiType==="opendatasoft"?await this._fetchFromOdsWithPagination():await this._fetchSinglePage()}catch(e){if(e.name==="AbortError")return;this._error=e,U(this.id,this._error),console.error(`gouv-query[${this.id}]: Erreur de requête API`,e)}finally{this._loading=!1}}async _fetchSinglePage(){const e=this._buildApiUrl(),t=await fetch(e,{signal:this._abortController.signal});if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);const i=await t.json();let r=this.transform?b(i,this.transform):i;Array.isArray(r)||(this.apiType==="tabular"&&i.data?r=i.data:r=[r]),this._data=r,V(this.id,this._data)}async _fetchFromOdsWithPagination(){const t=this.limit<=0?je*ye:this.limit,i=ye;let r=[],n=0,s=-1;for(let o=0;o<je;o++){const u=t-r.length;if(u<=0)break;const f=this._buildOpenDataSoftUrl(Math.min(i,u),n),g=await fetch(f,{signal:this._abortController.signal});if(!g.ok)throw new Error(`HTTP ${g.status}: ${g.statusText}`);const p=await g.json(),y=p.results||[];if(r=r.concat(y),typeof p.total_count=="number"&&(s=p.total_count),s>=0&&r.length>=s||y.length<i)break;n+=y.length}s>=0&&r.length<s&&r.length<t&&console.warn(`gouv-query[${this.id}]: pagination incomplete - ${r.length}/${s} resultats recuperes (limite de securite: ${je} pages de ${ye})`),this._data=this.transform?b(r,this.transform):r,V(this.id,this._data)}_buildApiUrl(){if(this.apiType==="opendatasoft")return this._buildOpenDataSoftUrl();if(this.apiType==="tabular")return this._buildTabularUrl();throw new Error(`Type d'API non supporté: ${this.apiType}`)}_buildOpenDataSoftUrl(e,t){const i=this.baseUrl||"https://data.opendatasoft.com",r=new URL(`${i}/api/explore/v2.1/catalog/datasets/${this.datasetId}/records`);this.select&&r.searchParams.set("select",this.select);const n=this.where||this.filter;if(n&&r.searchParams.set("where",n),this.groupBy&&r.searchParams.set("group_by",this.groupBy),this.orderBy){const s=this.orderBy.replace(/:(\w+)$/,(o,u)=>` ${u.toUpperCase()}`);r.searchParams.set("order_by",s)}return e!==void 0?r.searchParams.set("limit",String(e)):this.limit>0&&r.searchParams.set("limit",String(Math.min(this.limit,ye))),t&&t>0&&r.searchParams.set("offset",String(t)),r.toString()}_buildTabularUrl(){let e;if(this.baseUrl)e=this.baseUrl;else{const r=Xt();e=`${r.baseUrl}${r.endpoints.tabular}`}if(!this.resource)throw new Error(`gouv-query: attribut "resource" requis pour l'API Tabular`);const t=new URL(`${e}/api/resources/${this.resource}/data/`,window.location.origin),i=this.filter||this.where;if(i){const r=i.split(",").map(n=>n.trim());for(const n of r){const s=n.split(":");if(s.length>=3){const o=s[0],u=this._mapOperatorToTabular(s[1]),f=s.slice(2).join(":");t.searchParams.set(`${o}__${u}`,f)}}}if(this.groupBy){const r=this.groupBy.split(",").map(n=>n.trim());for(const n of r)t.searchParams.append(`${n}__groupby`,"")}if(this.aggregate){const r=this.aggregate.split(",").map(n=>n.trim());for(const n of r){const s=n.split(":");if(s.length>=2){const o=s[0],u=s[1];t.searchParams.append(`${o}__${u}`,"")}}}if(this.orderBy){const r=this.orderBy.split(":"),n=r[0],s=r[1]||"asc";t.searchParams.set(`${n}__sort`,s)}return this.limit>0&&t.searchParams.set("page_size",String(Math.min(this.limit,50))),t.toString()}_mapOperatorToTabular(e){return{eq:"exact",neq:"differs",gt:"strictly_greater",gte:"greater",lt:"strictly_less",lte:"less",contains:"contains",notcontains:"notcontains",in:"in",notin:"notin",isnull:"isnull",isnotnull:"isnotnull"}[e]||e}reload(){this._initialize()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},c(X,"GouvQuery"),X),_([d({type:String,attribute:"api-type"})],l.GouvQuery.prototype,"apiType",void 0),_([d({type:String})],l.GouvQuery.prototype,"source",void 0),_([d({type:String,attribute:"base-url"})],l.GouvQuery.prototype,"baseUrl",void 0),_([d({type:String,attribute:"dataset-id"})],l.GouvQuery.prototype,"datasetId",void 0),_([d({type:String})],l.GouvQuery.prototype,"resource",void 0),_([d({type:String})],l.GouvQuery.prototype,"select",void 0),_([d({type:String})],l.GouvQuery.prototype,"where",void 0),_([d({type:String})],l.GouvQuery.prototype,"filter",void 0),_([d({type:String,attribute:"group-by"})],l.GouvQuery.prototype,"groupBy",void 0),_([d({type:String})],l.GouvQuery.prototype,"aggregate",void 0),_([d({type:String,attribute:"order-by"})],l.GouvQuery.prototype,"orderBy",void 0),_([d({type:Number})],l.GouvQuery.prototype,"limit",void 0),_([d({type:String})],l.GouvQuery.prototype,"transform",void 0),_([d({type:Number})],l.GouvQuery.prototype,"refresh",void 0),_([w()],l.GouvQuery.prototype,"_loading",void 0),_([w()],l.GouvQuery.prototype,"_error",void 0),_([w()],l.GouvQuery.prototype,"_data",void 0),_([w()],l.GouvQuery.prototype,"_rawData",void 0),l.GouvQuery=_([A("gouv-query")],l.GouvQuery);var k=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};l.GouvNormalize=(Y=class extends ${constructor(){super(...arguments),this.source="",this.numeric="",this.numericAuto=!1,this.rename="",this.trim=!1,this.stripHtml=!1,this.replace="",this.lowercaseKeys=!1,this._unsubscribe=null}createRenderRoot(){return this}render(){return h``}connectedCallback(){super.connectedCallback(),H("gouv-normalize"),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this.id&&Be(this.id)}updated(e){if(super.updated(e),e.has("source")){this._initialize();return}if(["numeric","numericAuto","rename","trim","stripHtml","replace","lowercaseKeys"].some(r=>e.has(r))){const r=this.source?fe(this.source):void 0;r!==void 0&&this._processData(r)}}_initialize(){if(!this.id){console.warn('gouv-normalize: attribut "id" requis pour identifier la sortie');return}if(!this.source){console.warn('gouv-normalize: attribut "source" requis');return}this._unsubscribe&&this._unsubscribe();const e=fe(this.source);e!==void 0&&this._processData(e),this._unsubscribe=_e(this.source,{onLoaded:c(t=>{this._processData(t)},"onLoaded"),onLoading:c(()=>{F(this.id)},"onLoading"),onError:c(t=>{U(this.id,t)},"onError")})}_processData(e){try{F(this.id);const t=Array.isArray(e)?e:[e],i=this._parseNumericFields(),r=this._parsePipeMap(this.rename),n=this._parsePipeMap(this.replace),s=t.map(o=>o==null||typeof o!="object"?o:this._normalizeRow(o,i,r,n));V(this.id,s)}catch(t){U(this.id,t),console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`,t)}}_normalizeRow(e,t,i,r){const n={};for(const[s,o]of Object.entries(e)){let u=o;if(this.trim&&typeof u=="string"&&(u=u.trim()),this.stripHtml&&typeof u=="string"&&(u=u.replace(/<[^>]*>/g,"")),r.size>0&&typeof u=="string"){for(const[p,y]of r)if(u===p){u=y;break}}if(t.has(s))u=bt(u);else if(this.numericAuto&&typeof u=="string"&&Qt(u)){const p=bt(u,!0);p!==null&&(u=p)}const f=i.get(s)??s,g=this.lowercaseKeys?f.toLowerCase():f;n[g]=u}return n}_parseNumericFields(){return this.numeric?new Set(this.numeric.split(",").map(e=>e.trim()).filter(Boolean)):new Set}_parsePipeMap(e){const t=new Map;if(!e)return t;const i=e.split("|");for(const r of i){const n=r.indexOf(":");if(n===-1)continue;const s=r.substring(0,n).trim(),o=r.substring(n+1).trim();s&&t.set(s,o)}return t}},c(Y,"GouvNormalize"),Y),k([d({type:String})],l.GouvNormalize.prototype,"source",void 0),k([d({type:String})],l.GouvNormalize.prototype,"numeric",void 0),k([d({type:Boolean,attribute:"numeric-auto"})],l.GouvNormalize.prototype,"numericAuto",void 0),k([d({type:String})],l.GouvNormalize.prototype,"rename",void 0),k([d({type:Boolean})],l.GouvNormalize.prototype,"trim",void 0),k([d({type:Boolean,attribute:"strip-html"})],l.GouvNormalize.prototype,"stripHtml",void 0),k([d({type:String})],l.GouvNormalize.prototype,"replace",void 0),k([d({type:Boolean,attribute:"lowercase-keys"})],l.GouvNormalize.prototype,"lowercaseKeys",void 0),l.GouvNormalize=k([A("gouv-normalize")],l.GouvNormalize);function $e(a){const t=class t extends a{constructor(){super(...arguments),this._sourceLoading=!1,this._sourceData=null,this._sourceError=null,this._unsubscribeSource=null}onSourceData(r){}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSubscription()}updated(r){super.updated(r),r.has("source")&&this._subscribeToSource()}_subscribeToSource(){this._cleanupSubscription();const r=this.source;if(!r)return;const n=fe(r);n!==void 0&&(this._sourceData=n,this.onSourceData(n)),this._unsubscribeSource=_e(r,{onLoaded:c(s=>{this._sourceData=s,this._sourceLoading=!1,this._sourceError=null,this.onSourceData(s),this.requestUpdate()},"onLoaded"),onLoading:c(()=>{this._sourceLoading=!0,this.requestUpdate()},"onLoading"),onError:c(s=>{this._sourceError=s,this._sourceLoading=!1,this.requestUpdate()},"onError")})}_cleanupSubscription(){this._unsubscribeSource&&(this._unsubscribeSource(),this._unsubscribeSource=null)}};c(t,"SourceSubscriberElement");let e=t;return e}c($e,"SourceSubscriberMixin");function Ie(a,e="nombre"){if(a==null||a==="")return"—";const t=typeof a=="string"?parseFloat(a):a;if(isNaN(t))return"—";switch(e){case"nombre":return qe(t);case"pourcentage":return _t(t);case"euro":return yt(t);case"decimal":return er(t);default:return qe(t)}}c(Ie,"formatValue");function qe(a){return new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(Math.round(a))}c(qe,"formatNumber");function _t(a){return new Intl.NumberFormat("fr-FR",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:1}).format(a/100)}c(_t,"formatPercentage");function yt(a){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(a)}c(yt,"formatCurrency");function er(a){return new Intl.NumberFormat("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:2}).format(a)}c(er,"formatDecimal");function tr(a){const e=typeof a=="string"?new Date(a):a;return isNaN(e.getTime())?"—":new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(e)}c(tr,"formatDate");function rr(a,e,t){return e!==void 0&&a>=e?"vert":t!==void 0&&a>=t?"orange":e!==void 0||t!==void 0?"rouge":"bleu"}c(rr,"getColorBySeuil");function $t(a){const e=a.split(":");if(e.length===1)return e[0]==="count"?{type:"count",field:""}:{type:"direct",field:e[0]};const t=e[0],i=e[1];if(e.length===3){let r=e[2];return r==="true"?r=!0:r==="false"?r=!1:isNaN(Number(r))||(r=Number(r)),{type:t,field:i,filterField:i,filterValue:r}}return{type:t,field:i}}c($t,"parseExpression");function He(a,e){const t=$t(e);if(t.type==="direct"&&!Array.isArray(a))return a[t.field];if(!Array.isArray(a))return null;const i=a;switch(t.type){case"direct":case"first":return i.length>0?i[0][t.field]:null;case"last":return i.length>0?i[i.length-1][t.field]:null;case"count":return t.filterValue!==void 0?i.filter(n=>n[t.field]===t.filterValue).length:i.length;case"sum":return i.reduce((n,s)=>{const o=Number(s[t.field]);return n+(isNaN(o)?0:o)},0);case"avg":return i.length===0?null:i.reduce((n,s)=>{const o=Number(s[t.field]);return n+(isNaN(o)?0:o)},0)/i.length;case"min":return i.length===0?null:Math.min(...i.map(n=>Number(n[t.field])).filter(n=>!isNaN(n)));case"max":return i.length===0?null:Math.max(...i.map(n=>Number(n[t.field])).filter(n=>!isNaN(n)));default:return null}}c(He,"computeAggregation");var C=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};const wt={vert:"gouv-kpi--success",orange:"gouv-kpi--warning",rouge:"gouv-kpi--error",bleu:"gouv-kpi--info"};l.GouvKpi=(Z=class extends $e($){constructor(){super(...arguments),this.source="",this.valeur="",this.label="",this.description="",this.icone="",this.format="nombre",this.tendance="",this.couleur=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),H("gouv-kpi")}_computeValue(){return!this._sourceData||!this.valeur?null:He(this._sourceData,this.valeur)}_getColor(){if(this.couleur)return this.couleur;const e=this._computeValue();return typeof e!="number"?"bleu":rr(e,this.seuilVert,this.seuilOrange)}_getTendanceInfo(){if(!this.tendance||!this._sourceData)return null;const e=He(this._sourceData,this.tendance);return typeof e!="number"?null:{value:e,direction:e>0?"up":e<0?"down":"stable"}}_getAriaLabel(){if(this.description)return this.description;const e=this._computeValue(),t=Ie(e,this.format);return`${this.label}: ${t}`}render(){const e=this._computeValue(),t=Ie(e,this.format),i=wt[this._getColor()]||wt.bleu,r=this._getTendanceInfo();return h`
      <div
        class="gouv-kpi ${i}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._sourceLoading?h`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        `:this._sourceError?h`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        `:h`
          <div class="gouv-kpi__content">
            ${this.icone?h`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            `:""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${t}</span>
              ${r?h`
                <span class="gouv-kpi__tendance gouv-kpi__tendance--${r.direction}" aria-label="${r.value>0?"en hausse":r.value<0?"en baisse":"stable"}">
                  ${r.direction==="up"?"↑":r.direction==="down"?"↓":"→"}
                  ${Math.abs(r.value).toFixed(1)}%
                </span>
              `:""}
            </div>
            <span class="gouv-kpi__label">${this.label}</span>
          </div>
        `}
      </div>
      <style>
        .gouv-kpi {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1.5rem;
          background: var(--background-default-grey);
          border-radius: 0.25rem;
          border-left: 4px solid var(--border-default-grey);
          min-height: 140px;
          height: 100%;
          box-sizing: border-box;
        }
        .gouv-kpi--success { border-left-color: var(--background-flat-success); }
        .gouv-kpi--warning { border-left-color: var(--background-flat-warning); }
        .gouv-kpi--error { border-left-color: var(--background-flat-error); }
        .gouv-kpi--info { border-left-color: var(--background-flat-info); }
        .gouv-kpi__content { display: flex; flex-direction: column; gap: 0.5rem; }
        .gouv-kpi__icon { font-size: 1.5rem; color: var(--text-mention-grey); }
        .gouv-kpi__value-wrapper { display: flex; align-items: baseline; gap: 0.5rem; }
        .gouv-kpi__value { font-size: 2.5rem; font-weight: 700; line-height: 1; color: var(--text-title-grey); }
        .gouv-kpi__tendance { font-size: 0.875rem; font-weight: 500; }
        .gouv-kpi__tendance--up { color: var(--text-default-success); }
        .gouv-kpi__tendance--down { color: var(--text-default-error); }
        .gouv-kpi__tendance--stable { color: var(--text-mention-grey); }
        .gouv-kpi__label { font-size: 0.875rem; color: var(--text-mention-grey); }
        .gouv-kpi__loading,
        .gouv-kpi__error { display: flex; align-items: center; gap: 0.5rem; color: var(--text-mention-grey); font-size: 0.875rem; }
        .gouv-kpi__error { color: var(--text-default-error); }
      </style>
    `}},c(Z,"GouvKpi"),Z),l.GouvKpi.styles=tt``,C([d({type:String})],l.GouvKpi.prototype,"source",void 0),C([d({type:String})],l.GouvKpi.prototype,"valeur",void 0),C([d({type:String})],l.GouvKpi.prototype,"label",void 0),C([d({type:String})],l.GouvKpi.prototype,"description",void 0),C([d({type:String})],l.GouvKpi.prototype,"icone",void 0),C([d({type:String})],l.GouvKpi.prototype,"format",void 0),C([d({type:String})],l.GouvKpi.prototype,"tendance",void 0),C([d({type:Number,attribute:"seuil-vert"})],l.GouvKpi.prototype,"seuilVert",void 0),C([d({type:Number,attribute:"seuil-orange"})],l.GouvKpi.prototype,"seuilOrange",void 0),C([d({type:String})],l.GouvKpi.prototype,"couleur",void 0),l.GouvKpi=C([A("gouv-kpi")],l.GouvKpi);var S=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};l.GouvDatalist=(ee=class extends $e($){constructor(){super(...arguments),this.source="",this.colonnes="",this.recherche=!1,this.filtres="",this.tri="",this.pagination=0,this.export="",this._data=[],this._searchQuery="",this._activeFilters={},this._sort=null,this._currentPage=1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),H("gouv-datalist"),this._initSort()}updated(e){super.updated(e),e.has("tri")&&this._initSort()}onSourceData(e){this._data=Array.isArray(e)?e:[],this._currentPage=1}parseColumns(){return this.colonnes?this.colonnes.split(",").map(e=>{const[t,i]=e.trim().split(":");return{key:t.trim(),label:(i==null?void 0:i.trim())||t.trim()}}):[]}_getFilterableColumns(){return this.filtres?this.filtres.split(",").map(e=>e.trim()):[]}_initSort(){if(this.tri){const[e,t]=this.tri.split(":");this._sort={key:e,direction:t||"asc"}}}_getUniqueValues(e){const t=new Set;return this._data.forEach(i=>{const r=i[e];r!=null&&t.add(String(r))}),Array.from(t).sort()}getFilteredData(){let e=[...this._data];if(this._searchQuery){const t=this._searchQuery.toLowerCase();e=e.filter(i=>Object.values(i).some(r=>String(r).toLowerCase().includes(t)))}if(Object.entries(this._activeFilters).forEach(([t,i])=>{i&&(e=e.filter(r=>String(r[t])===i))}),this._sort){const{key:t,direction:i}=this._sort;e.sort((r,n)=>{const s=r[t],o=n[t];if(s===o)return 0;if(s==null)return 1;if(o==null)return-1;const u=typeof s=="number"&&typeof o=="number"?s-o:String(s).localeCompare(String(o),"fr");return i==="desc"?-u:u})}return e}_getPaginatedData(){const e=this.getFilteredData();if(!this.pagination||this.pagination<=0)return e;const t=(this._currentPage-1)*this.pagination;return e.slice(t,t+this.pagination)}_getTotalPages(){return!this.pagination||this.pagination<=0?1:Math.ceil(this.getFilteredData().length/this.pagination)}_handleSearch(e){this._searchQuery=e.target.value,this._currentPage=1}_handleFilter(e,t){this._activeFilters={...this._activeFilters,[e]:t.target.value},this._currentPage=1}_handleSort(e){var t;((t=this._sort)==null?void 0:t.key)===e?this._sort={key:e,direction:this._sort.direction==="asc"?"desc":"asc"}:this._sort={key:e,direction:"asc"}}_handlePageChange(e){this._currentPage=e}_exportCsv(){const e=this.parseColumns(),t=this.getFilteredData(),i=e.map(f=>f.label).join(";"),r=t.map(f=>e.map(g=>{const p=String(f[g.key]??"");return p.includes(";")||p.includes('"')?`"${p.replace(/"/g,'""')}"`:p}).join(";")),n=[i,...r].join(`
`),s=new Blob([n],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(s),u=document.createElement("a");u.href=o,u.download="export.csv",u.click(),URL.revokeObjectURL(o)}formatCellValue(e){return e==null?"—":typeof e=="boolean"?e?"Oui":"Non":String(e)}_renderFilters(e,t){return t.length===0?"":h`
      <div class="gouv-datalist__filters">
        ${t.map(i=>{const r=e.find(o=>o.key===i),n=(r==null?void 0:r.label)||i,s=this._getUniqueValues(i);return h`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${i}">${n}</label>
              <select
                class="fr-select"
                id="filter-${i}"
                @change="${o=>this._handleFilter(i,o)}"
              >
                <option value="">Tous</option>
                ${s.map(o=>h`
                  <option value="${o}" ?selected="${this._activeFilters[i]===o}">${o}</option>
                `)}
              </select>
            </div>
          `})}
      </div>
    `}_renderToolbar(){var e,t;return!this.recherche&&!((e=this.export)!=null&&e.includes("csv"))?"":h`
      <div class="gouv-datalist__toolbar">
        ${this.recherche?h`
          <div class="fr-search-bar" role="search">
            <label class="fr-label fr-sr-only" for="search-${this.source}">Rechercher</label>
            <input
              class="fr-input"
              type="search"
              id="search-${this.source}"
              placeholder="Rechercher..."
              .value="${this._searchQuery}"
              @input="${this._handleSearch}"
            />
            <button class="fr-btn" title="Rechercher" type="button">
              <span class="fr-icon-search-line" aria-hidden="true"></span>
            </button>
          </div>
        `:h`<div></div>`}

        ${(t=this.export)!=null&&t.includes("csv")?h`
          <button
            class="fr-btn fr-btn--secondary fr-btn--sm"
            @click="${this._exportCsv}"
            type="button"
          >
            <span class="fr-icon-download-line fr-icon--sm" aria-hidden="true"></span>
            Exporter CSV
          </button>
        `:""}
      </div>
    `}_renderTable(e,t){return h`
      <div class="fr-table fr-table--bordered">
        <table>
          <caption class="fr-sr-only">Liste des données</caption>
          <thead>
            <tr>
              ${e.map(i=>{var r;return h`
                <th scope="col">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${()=>this._handleSort(i.key)}"
                    aria-label="Trier par ${i.label}"
                    type="button"
                  >
                    ${i.label}
                    ${((r=this._sort)==null?void 0:r.key)===i.key?h`
                      <span aria-hidden="true">${this._sort.direction==="asc"?"↑":"↓"}</span>
                    `:""}
                  </button>
                </th>
              `})}
            </tr>
          </thead>
          <tbody>
            ${t.length===0?h`
              <tr>
                <td colspan="${e.length}" class="gouv-datalist__empty">
                  Aucune donnée à afficher
                </td>
              </tr>
            `:t.map(i=>h`
              <tr>
                ${e.map(r=>h`
                  <td>${this.formatCellValue(i[r.key])}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}_renderPagination(e){if(this.pagination<=0||e<=1)return"";const t=[];for(let i=Math.max(1,this._currentPage-2);i<=Math.min(e,this._currentPage+2);i++)t.push(i);return h`
      <nav class="fr-pagination" aria-label="Pagination">
        <ul class="fr-pagination__list">
          <li>
            <button class="fr-pagination__link fr-pagination__link--first"
              ?disabled="${this._currentPage===1}"
              @click="${()=>this._handlePageChange(1)}"
              aria-label="Première page" type="button">Première page</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--prev"
              ?disabled="${this._currentPage===1}"
              @click="${()=>this._handlePageChange(this._currentPage-1)}"
              aria-label="Page précédente" type="button">Page précédente</button>
          </li>
          ${t.map(i=>h`
            <li>
              <button
                class="fr-pagination__link ${i===this._currentPage?"fr-pagination__link--active":""}"
                @click="${()=>this._handlePageChange(i)}"
                aria-current="${i===this._currentPage?"page":"false"}"
                type="button"
              >${i}</button>
            </li>
          `)}
          <li>
            <button class="fr-pagination__link fr-pagination__link--next"
              ?disabled="${this._currentPage===e}"
              @click="${()=>this._handlePageChange(this._currentPage+1)}"
              aria-label="Page suivante" type="button">Page suivante</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--last"
              ?disabled="${this._currentPage===e}"
              @click="${()=>this._handlePageChange(e)}"
              aria-label="Dernière page" type="button">Dernière page</button>
          </li>
        </ul>
      </nav>
    `}render(){const e=this.parseColumns(),t=this._getFilterableColumns(),i=this._getPaginatedData(),r=this._getTotalPages(),n=this.getFilteredData().length;return h`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        ${this._renderFilters(e,t)}
        ${this._renderToolbar()}

        ${this._sourceLoading?h`
          <div class="gouv-datalist__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement des données...
          </div>
        `:this._sourceError?h`
          <div class="gouv-datalist__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur: ${this._sourceError.message}
          </div>
        `:h`
          <p class="fr-text--sm" aria-live="polite">
            ${n} résultat${n>1?"s":""}
            ${this._searchQuery||Object.values(this._activeFilters).some(s=>s)?" (filtré)":""}
          </p>
          ${this._renderTable(e,i)}
          ${this._renderPagination(r)}
        `}
      </div>

      <style>
        .gouv-datalist__filters {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .gouv-datalist__filters .fr-select-group { margin-bottom: 0; }
        .gouv-datalist__toolbar {
          display: flex; flex-wrap: wrap; gap: 1rem;
          align-items: center; justify-content: space-between; margin-bottom: 1rem;
        }
        .gouv-datalist__toolbar .fr-search-bar { flex: 1; min-width: 200px; max-width: 400px; }
        @media (max-width: 576px) {
          .gouv-datalist__filters { grid-template-columns: 1fr; }
          .gouv-datalist__toolbar { flex-direction: column; align-items: stretch; }
          .gouv-datalist__toolbar .fr-search-bar { max-width: none; }
        }
        .gouv-datalist__sort-btn {
          background: none; border: none; cursor: pointer;
          font-weight: 700; font-size: inherit; font-family: inherit;
          display: flex; align-items: center; gap: 0.25rem;
        }
        .gouv-datalist__sort-btn:hover { text-decoration: underline; }
        .gouv-datalist__loading,
        .gouv-datalist__error {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; padding: 2rem; color: var(--text-mention-grey, #666); font-size: 0.875rem;
        }
        .gouv-datalist__error { color: var(--text-default-error, #ce0500); }
        .gouv-datalist__empty { text-align: center; color: var(--text-mention-grey); padding: 2rem !important; }
      </style>
    `}},c(ee,"GouvDatalist"),ee),l.GouvDatalist.styles=tt``,S([d({type:String})],l.GouvDatalist.prototype,"source",void 0),S([d({type:String})],l.GouvDatalist.prototype,"colonnes",void 0),S([d({type:Boolean})],l.GouvDatalist.prototype,"recherche",void 0),S([d({type:String})],l.GouvDatalist.prototype,"filtres",void 0),S([d({type:String})],l.GouvDatalist.prototype,"tri",void 0),S([d({type:Number})],l.GouvDatalist.prototype,"pagination",void 0),S([d({type:String})],l.GouvDatalist.prototype,"export",void 0),S([w()],l.GouvDatalist.prototype,"_data",void 0),S([w()],l.GouvDatalist.prototype,"_searchQuery",void 0),S([w()],l.GouvDatalist.prototype,"_activeFilters",void 0),S([w()],l.GouvDatalist.prototype,"_sort",void 0),S([w()],l.GouvDatalist.prototype,"_currentPage",void 0),l.GouvDatalist=S([A("gouv-datalist")],l.GouvDatalist);var v=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};const ir={line:"line-chart",bar:"bar-chart",pie:"pie-chart",radar:"radar-chart",scatter:"scatter-chart",gauge:"gauge-chart","bar-line":"bar-line-chart",map:"map-chart","map-reg":"map-chart-reg"};l.GouvDsfrChart=(te=class extends $e($){constructor(){super(...arguments),this.source="",this.type="bar",this.labelField="",this.codeField="",this.valueField="",this.valueField2="",this.name="",this.selectedPalette="categorical",this.unitTooltip="",this.unitTooltipBar="",this.horizontal=!1,this.stacked=!1,this.fill=!1,this.highlightIndex="",this.xMin="",this.xMax="",this.yMin="",this.yMax="",this.gaugeValue=null,this.mapHighlight="",this._data=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),H("gouv-dsfr-chart",this.type)}onSourceData(e){this._data=Array.isArray(e)?e:[]}_processData(){if(!this._data||this._data.length===0)return{x:"[[]]",y:"[[]]"};const e=[],t=[],i=[];for(const r of this._data)e.push(String(b(r,this.labelField)??"N/A")),t.push(Number(b(r,this.valueField))||0),this.valueField2&&i.push(Number(b(r,this.valueField2))||0);return{x:JSON.stringify([e]),y:JSON.stringify([t]),y2:this.valueField2?JSON.stringify([i]):void 0}}_processMapData(){if(!this._data||this._data.length===0)return"{}";const e=this.codeField||this.labelField,t={};for(const i of this._data){let r=String(b(i,e)??"").trim();/^\d+$/.test(r)&&r.length<3&&(r=r.padStart(2,"0"));const n=Number(b(i,this.valueField))||0;(this.type==="map"?Wt(r):r!=="")&&(t[r]=Math.round(n*100)/100)}return JSON.stringify(t)}_getCommonAttributes(){const e={};if(this.selectedPalette&&(e["selected-palette"]=this.selectedPalette),this.unitTooltip&&(e["unit-tooltip"]=this.unitTooltip),this.xMin&&(e["x-min"]=this.xMin),this.xMax&&(e["x-max"]=this.xMax),this.yMin&&(e["y-min"]=this.yMin),this.yMax&&(e["y-max"]=this.yMax),this.name){const t=this.name.trim();e.name=t.startsWith("[")?t:JSON.stringify([t])}else if(this.valueField){const t=this.valueField2?[this.valueField,this.valueField2]:[this.valueField];e.name=JSON.stringify(t)}return e}_getTypeSpecificAttributes(){const{x:e,y:t,y2:i}=this._processData(),r={},n={};switch(this.type){case"gauge":{const s=this.gaugeValue??(this._data.length>0&&Number(b(this._data[0],this.valueField))||0);r.percent=String(Math.round(s)),r.init="0",r.target="100";break}case"bar-line":r.x=e,r["y-bar"]=t,r["y-line"]=i||t,this.unitTooltipBar&&(r["unit-tooltip-bar"]=this.unitTooltipBar);break;case"map":case"map-reg":{if(r.data=this._processMapData(),this._data.length>0){let s=0,o=0;for(const u of this._data){const f=Number(b(u,this.valueField));isNaN(f)||(s+=f,o++)}if(o>0){const u=Math.round(s/o*100)/100;n.value=String(u)}}n.date=new Date().toISOString().split("T")[0];break}default:r.x=e,r.y=t;break}return this.type==="bar"&&(this.horizontal&&(r.horizontal="true"),this.stacked&&(r.stacked="true"),this.highlightIndex&&(r["highlight-index"]=this.highlightIndex)),this.type==="pie"&&this.fill&&(r.fill="true"),(this.type==="map"||this.type==="map-reg")&&this.mapHighlight&&(r.highlight=this.mapHighlight),{attrs:r,deferred:n}}_getAriaLabel(){const t={bar:"barres",line:"lignes",pie:"camembert",radar:"radar",gauge:"jauge",scatter:"nuage de points","bar-line":"barres et lignes",map:"carte departements","map-reg":"carte regions"}[this.type]||this.type,i=this._data.length;return`Graphique ${t}, ${i} valeurs`}_createChartElement(e,t,i={}){const r=document.createElement(e);for(const[s,o]of Object.entries(t))o!==void 0&&o!==""&&r.setAttribute(s,o);Object.keys(i).length>0&&setTimeout(()=>{for(const[s,o]of Object.entries(i))r.setAttribute(s,o)},500);const n=document.createElement("div");return n.className="gouv-dsfr-chart__wrapper",n.setAttribute("role","img"),n.setAttribute("aria-label",this._getAriaLabel()),n.appendChild(r),n}_renderChart(){const e=ir[this.type];if(!e)return h`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;const{attrs:t,deferred:i}=this._getTypeSpecificAttributes(),r={...this._getCommonAttributes(),...t},n=this._createChartElement(e,r,i),s=this.querySelector(".gouv-dsfr-chart__wrapper");return s&&s.remove(),h`${n}`}render(){return this._sourceLoading?h`
        <div class="gouv-dsfr-chart__loading" aria-live="polite">
          <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
          Chargement du graphique...
        </div>
        <style>
          .gouv-dsfr-chart__loading {
            display: flex; align-items: center; justify-content: center;
            gap: 0.5rem; padding: 2rem; color: var(--text-mention-grey, #666); font-size: 0.875rem;
          }
        </style>
      `:this._sourceError?h`
        <div class="gouv-dsfr-chart__error" aria-live="assertive">
          <span class="fr-icon-error-line" aria-hidden="true"></span>
          Erreur de chargement: ${this._sourceError.message}
        </div>
        <style>
          .gouv-dsfr-chart__error {
            display: flex; align-items: center; gap: 0.5rem; padding: 1rem;
            color: var(--text-default-error, #ce0500);
            background: var(--background-alt-red-marianne, #ffe5e5); border-radius: 4px;
          }
        </style>
      `:!this._data||this._data.length===0?h`
        <div class="gouv-dsfr-chart__empty" aria-live="polite">
          <span class="fr-icon-information-line" aria-hidden="true"></span>
          Aucune donnée disponible
        </div>
        <style>
          .gouv-dsfr-chart__empty {
            display: flex; align-items: center; gap: 0.5rem; padding: 1rem;
            color: var(--text-mention-grey, #666);
            background: var(--background-alt-grey, #f5f5f5); border-radius: 4px;
          }
        </style>
      `:this._renderChart()}},c(te,"GouvDsfrChart"),te),v([d({type:String})],l.GouvDsfrChart.prototype,"source",void 0),v([d({type:String})],l.GouvDsfrChart.prototype,"type",void 0),v([d({type:String,attribute:"label-field"})],l.GouvDsfrChart.prototype,"labelField",void 0),v([d({type:String,attribute:"code-field"})],l.GouvDsfrChart.prototype,"codeField",void 0),v([d({type:String,attribute:"value-field"})],l.GouvDsfrChart.prototype,"valueField",void 0),v([d({type:String,attribute:"value-field-2"})],l.GouvDsfrChart.prototype,"valueField2",void 0),v([d({type:String})],l.GouvDsfrChart.prototype,"name",void 0),v([d({type:String,attribute:"selected-palette"})],l.GouvDsfrChart.prototype,"selectedPalette",void 0),v([d({type:String,attribute:"unit-tooltip"})],l.GouvDsfrChart.prototype,"unitTooltip",void 0),v([d({type:String,attribute:"unit-tooltip-bar"})],l.GouvDsfrChart.prototype,"unitTooltipBar",void 0),v([d({type:Boolean})],l.GouvDsfrChart.prototype,"horizontal",void 0),v([d({type:Boolean})],l.GouvDsfrChart.prototype,"stacked",void 0),v([d({type:Boolean})],l.GouvDsfrChart.prototype,"fill",void 0),v([d({type:String,attribute:"highlight-index"})],l.GouvDsfrChart.prototype,"highlightIndex",void 0),v([d({type:String,attribute:"x-min"})],l.GouvDsfrChart.prototype,"xMin",void 0),v([d({type:String,attribute:"x-max"})],l.GouvDsfrChart.prototype,"xMax",void 0),v([d({type:String,attribute:"y-min"})],l.GouvDsfrChart.prototype,"yMin",void 0),v([d({type:String,attribute:"y-max"})],l.GouvDsfrChart.prototype,"yMax",void 0),v([d({type:Number,attribute:"gauge-value"})],l.GouvDsfrChart.prototype,"gaugeValue",void 0),v([d({type:String,attribute:"map-highlight"})],l.GouvDsfrChart.prototype,"mapHighlight",void 0),v([w()],l.GouvDsfrChart.prototype,"_data",void 0),l.GouvDsfrChart=v([A("gouv-dsfr-chart")],l.GouvDsfrChart);var we=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};l.AppHeader=(re=class extends ${constructor(){super(...arguments),this.currentPage="",this.basePath="",this._favCount=0}createRenderRoot(){return this}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}connectedCallback(){super.connectedCallback();try{const e=JSON.parse(localStorage.getItem("gouv-widgets-favorites")||"[]");this._favCount=Array.isArray(e)?e.length:0}catch{}if(!document.getElementById("app-header-active-style")){const e=document.createElement("style");e.id="app-header-active-style",e.textContent='.fr-nav__link[aria-current="page"]{font-weight:700;border-bottom:2px solid var(--border-action-high-blue-france);color:var(--text-action-high-blue-france)}',document.head.appendChild(e)}}_getNavItems(){return[{id:"accueil",label:"Accueil",href:"index.html"},{id:"composants",label:"Composants",href:"demo/index.html"},{id:"builder",label:"Builder",href:"apps/builder/index.html"},{id:"builder-ia",label:"Builder IA",href:"apps/builder-ia/index.html"},{id:"playground",label:"Playground",href:"apps/playground/index.html"},{id:"dashboard",label:"Dashboard",href:"apps/dashboard/index.html"},{id:"sources",label:"Sources",href:"apps/sources/index.html"},{id:"monitoring",label:"Monitoring",href:"apps/monitoring/index.html"}]}render(){const e=this._getNavItems();return h`
      <div class="fr-skiplinks">
        <nav class="fr-container" role="navigation" aria-label="Accès rapide">
          <ul class="fr-skiplinks__list">
            <li><a class="fr-link" href="#main-content">Contenu</a></li>
            <li><a class="fr-link" href="${this._base}demo/index.html">Composants</a></li>
          </ul>
        </nav>
      </div>
      <header role="banner" class="fr-header">
        <div class="fr-header__body">
          <div class="fr-container">
            <div class="fr-header__body-row">
              <div class="fr-header__brand fr-enlarge-link">
                <div class="fr-header__brand-top">
                  <div class="fr-header__logo">
                    <p class="fr-logo">
                      République<br>Française
                    </p>
                  </div>
                  <div class="fr-header__navbar">
                    <button class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-menu" aria-haspopup="menu" id="button-menu" title="Menu">
                      Menu
                    </button>
                  </div>
                </div>
                <div class="fr-header__service">
                  <a href="${this._base}index.html" title="Accueil - Charts builder">
                    <p class="fr-header__service-title">Charts builder</p>
                  </a>
                  <p class="fr-header__service-tagline">Création de visualisations dynamiques conformes DSFR</p>
                </div>
              </div>
              <div class="fr-header__tools">
                <div class="fr-header__tools-links">
                  <ul class="fr-btns-group">
                    <li>
                      <a class="fr-btn fr-btn--tertiary-no-outline fr-icon-book-2-line" href="${this._base}docs/guide.html">
                        Guide
                      </a>
                    </li>
                    <li>
                      <a class="fr-btn fr-btn--tertiary-no-outline fr-icon-star-fill" href="${this._base}apps/favorites/index.html">
                        Favoris${this._favCount>0?h` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>`:m}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fr-header__menu fr-modal" id="modal-menu" aria-labelledby="button-menu">
          <div class="fr-container">
            <button class="fr-btn--close fr-btn" aria-controls="modal-menu" title="Fermer">
              Fermer
            </button>
            <div class="fr-header__menu-links"></div>
            <nav class="fr-nav" id="header-navigation" role="navigation" aria-label="Menu principal">
              <ul class="fr-nav__list">
                ${e.map(t=>h`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this._base}${t.href}"
                       ${this.currentPage===t.id?h`aria-current="page"`:""}>
                      ${t.label}
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    `}},c(re,"AppHeader"),re),we([d({type:String,attribute:"current-page"})],l.AppHeader.prototype,"currentPage",void 0),we([d({type:String,attribute:"base-path"})],l.AppHeader.prototype,"basePath",void 0),we([w()],l.AppHeader.prototype,"_favCount",void 0),l.AppHeader=we([A("app-header")],l.AppHeader);var St=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};l.AppFooter=(ie=class extends ${constructor(){super(...arguments),this.basePath=""}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}createRenderRoot(){return this}render(){return h`
      <footer class="fr-footer" role="contentinfo" id="footer">
        <div class="fr-container">
          <div class="fr-footer__body">
            <div class="fr-footer__brand fr-enlarge-link">
              <a href="${this._base}index.html" title="Retour à l'accueil du site - République Française">
                <p class="fr-logo">
                  République<br>Française
                </p>
              </a>
            </div>
            <div class="fr-footer__content">
              <p class="fr-footer__content-desc">
                Charts builder est un projet open-source permettant de créer des visualisations de données conformes au Design System de l'État (DSFR).
              </p>
              <ul class="fr-footer__content-list">
                <li class="fr-footer__content-item">
                  <a class="fr-footer__content-link" target="_blank" rel="noopener" href="https://www.systeme-de-design.gouv.fr/">
                    systeme-de-design.gouv.fr
                  </a>
                </li>
                <li class="fr-footer__content-item">
                  <a class="fr-footer__content-link" target="_blank" rel="noopener" href="https://github.com/bmatge/datasource-charts-webcomponents">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="fr-footer__bottom">
            <ul class="fr-footer__bottom-list">
              <li class="fr-footer__bottom-item">
                <a class="fr-footer__bottom-link" href="#">Accessibilité : non conforme</a>
              </li>
              <li class="fr-footer__bottom-item">
                <a class="fr-footer__bottom-link" href="#">Mentions légales</a>
              </li>
            </ul>
            <div class="fr-footer__bottom-copy">
              <p>
                Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous
                <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank" rel="noopener">licence etalab-2.0</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    `}},c(ie,"AppFooter"),ie),St([d({type:String,attribute:"base-path"})],l.AppFooter.prototype,"basePath",void 0),l.AppFooter=St([A("app-footer")],l.AppFooter);var Q=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};l.AppLayoutBuilder=(ne=class extends ${constructor(){super(...arguments),this.leftRatio=40,this.minLeftWidth=280,this.minRightWidth=300,this._isResizing=!1,this._currentLeftRatio=40,this._leftContent=[],this._rightContent=[],this._contentMoved=!1,this._boundMouseMove=null,this._boundMouseUp=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._currentLeftRatio=this.leftRatio,this._setupResizer(),this._saveSlotContent()}_saveSlotContent(){this._leftContent=Array.from(this.querySelectorAll('[slot="left"]')),this._rightContent=Array.from(this.querySelectorAll('[slot="right"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".builder-layout-left"),t=this.querySelector(".builder-layout-right");e&&t&&(this._leftContent.forEach(i=>e.appendChild(i)),this._rightContent.forEach(i=>t.appendChild(i)),this._contentMoved=!0)}disconnectedCallback(){super.disconnectedCallback(),this._cleanupResizer()}_setupResizer(){this._boundMouseMove=this._handleMouseMove.bind(this),this._boundMouseUp=this._handleMouseUp.bind(this)}_cleanupResizer(){this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp)}_handleMouseDown(e){e.preventDefault(),this._isResizing=!0,document.body.style.cursor="col-resize",document.body.style.userSelect="none",this._boundMouseMove&&document.addEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.addEventListener("mouseup",this._boundMouseUp)}_handleMouseMove(e){if(!this._isResizing)return;const t=this.querySelector(".builder-layout-container");if(!t)return;const i=t.getBoundingClientRect(),r=i.width;let n=e.clientX-i.left;n=Math.max(this.minLeftWidth,Math.min(n,r-this.minRightWidth)),this._currentLeftRatio=n/r*100,this.requestUpdate()}_handleMouseUp(){this._isResizing&&(this._isResizing=!1,document.body.style.cursor="",document.body.style.userSelect="",this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp))}render(){return h`
      <div class="builder-layout-container">
        <aside class="builder-layout-left" style="flex: 0 0 ${this._currentLeftRatio}%">
          <!-- Contenu slot="left" sera déplacé ici -->
        </aside>

        <div class="builder-layout-resizer ${this._isResizing?"dragging":""}"
             @mousedown="${this._handleMouseDown}">
        </div>

        <main class="builder-layout-right" id="main-content">
          <!-- Contenu slot="right" sera déplacé ici -->
        </main>
      </div>

      <style>
        app-layout-builder {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }

        .builder-layout-container {
          display: flex;
          flex: 1;
          min-height: 0;
        }

        .builder-layout-left {
          overflow-y: auto;
          overflow-x: hidden;
          border-right: 1px solid var(--border-default-grey);
          background: var(--background-alt-grey);
          display: flex;
          flex-direction: column;
          min-height: 0;
          min-width: 280px;
        }

        .builder-layout-resizer {
          width: 6px;
          background: var(--border-default-grey);
          cursor: col-resize;
          flex-shrink: 0;
          transition: background 0.15s;
        }

        .builder-layout-resizer:hover,
        .builder-layout-resizer.dragging {
          background: var(--border-action-high-blue-france);
        }

        .builder-layout-right {
          flex: 1;
          overflow: auto;
          background: var(--background-default-grey);
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        /* Responsive: stack vertical on mobile */
        @media (max-width: 900px) {
          .builder-layout-container {
            flex-direction: column;
          }

          .builder-layout-left {
            width: 100% !important;
            max-height: 50vh;
            border-right: none;
            border-bottom: 1px solid var(--border-default-grey);
          }

          .builder-layout-resizer {
            display: none;
          }

          .builder-layout-right {
            height: 50vh;
          }
        }
      </style>
    `}},c(ne,"AppLayoutBuilder"),ne),Q([d({type:Number,attribute:"left-ratio"})],l.AppLayoutBuilder.prototype,"leftRatio",void 0),Q([d({type:Number,attribute:"min-left-width"})],l.AppLayoutBuilder.prototype,"minLeftWidth",void 0),Q([d({type:Number,attribute:"min-right-width"})],l.AppLayoutBuilder.prototype,"minRightWidth",void 0),Q([w()],l.AppLayoutBuilder.prototype,"_isResizing",void 0),Q([w()],l.AppLayoutBuilder.prototype,"_currentLeftRatio",void 0),l.AppLayoutBuilder=Q([A("app-layout-builder")],l.AppLayoutBuilder);var ge=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};l.AppLayoutDemo=(ae=class extends ${constructor(){super(...arguments),this.title="",this.icon="",this.activePath="",this.basePath="",this._contentElements=[],this._contentMoved=!1}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._contentElements=Array.from(this.querySelectorAll('[slot="content"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".demo-content-slot");e&&(this._contentElements.forEach(t=>e.appendChild(t)),this._contentMoved=!0)}_getMenuStructure(){return[{id:"overview",label:"Vue d'ensemble",href:"index.html"},{id:"components",label:"Nos composants",href:"#",children:[{id:"components/gouv-source",label:"gouv-source",href:"components/gouv-source.html"},{id:"components/gouv-query",label:"gouv-query",href:"components/gouv-query.html"},{id:"components/gouv-kpi",label:"gouv-kpi",href:"components/gouv-kpi.html"},{id:"components/gouv-datalist",label:"gouv-datalist",href:"components/gouv-datalist.html"},{id:"components/gouv-dsfr-chart",label:"gouv-dsfr-chart",href:"components/gouv-dsfr-chart.html"}]},{id:"charts",label:"Graphiques DSFR",href:"#",children:[{id:"charts/line-chart",label:"line-chart",href:"charts/line-chart.html"},{id:"charts/bar-chart",label:"bar-chart",href:"charts/bar-chart.html"},{id:"charts/pie-chart",label:"pie-chart",href:"charts/pie-chart.html"},{id:"charts/radar-chart",label:"radar-chart",href:"charts/radar-chart.html"},{id:"charts/gauge-chart",label:"gauge-chart",href:"charts/gauge-chart.html"},{id:"charts/map-chart",label:"map-chart",href:"charts/map-chart.html"},{id:"charts/scatter-chart",label:"scatter-chart",href:"charts/scatter-chart.html"}]}]}_isActive(e){return this.activePath===e}_isParentActive(e){return e.children?e.children.some(t=>this._isActive(t.id)):!1}_renderMenuItem(e){const t=this._isActive(e.id),i=this._isParentActive(e);if(e.children){const r=`fr-sidemenu-${e.id}`,n=i;return h`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${n}"
                  aria-controls="${r}">
            ${e.label}
          </button>
          <div class="fr-collapse ${n?"fr-collapse--expanded":""}" id="${r}">
            <ul class="fr-sidemenu__list">
              ${e.children.map(s=>this._renderMenuItem(s))}
            </ul>
          </div>
        </li>
      `}else return h`
        <li class="fr-sidemenu__item ${t?"fr-sidemenu__item--active":""}">
          <a class="fr-sidemenu__link"
             href="${this._base}${e.href}"
             ${t?h`aria-current="page"`:""}>
            ${e.label}
          </a>
        </li>
      `}_renderBreadcrumb(){if(!this.activePath||this.activePath==="overview")return"";const e=this.activePath.split("/"),t=[{label:"Composants",href:`${this._base}index.html`}];if(e.length>1){const i=e[0]==="components"?"Nos composants":"Graphiques DSFR";t.push({label:i,href:"#"})}return t.push({label:this.title,href:""}),h`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((i,r)=>h`
              <li>
                ${r===t.length-1?h`<a class="fr-breadcrumb__link" aria-current="page">${i.label}</a>`:h`<a class="fr-breadcrumb__link" href="${i.href}">${i.label}</a>`}
              </li>
            `)}
          </ol>
        </div>
      </nav>
    `}render(){const e=this._getMenuStructure();return h`
      <main class="fr-container fr-py-4w" id="main-content">
        <div class="demo-layout">
          <!-- Sidemenu -->
          <nav class="fr-sidemenu" role="navigation" aria-labelledby="fr-sidemenu-title">
            <div class="fr-sidemenu__inner">
              <button class="fr-sidemenu__btn" hidden aria-controls="fr-sidemenu-wrapper" aria-expanded="true">
                Menu
              </button>
              <div class="fr-collapse" id="fr-sidemenu-wrapper">
                <div class="fr-sidemenu__title" id="fr-sidemenu-title">Composants</div>
                <ul class="fr-sidemenu__list">
                  ${e.map(t=>this._renderMenuItem(t))}
                </ul>
              </div>
            </div>
          </nav>

          <!-- Contenu principal -->
          <div class="demo-content">
            ${this._renderBreadcrumb()}

            ${this.title?h`
              <h1>
                ${this.icon?h`<span class="${this.icon} fr-mr-1w" aria-hidden="true"></span>`:""}
                ${this.title}
              </h1>
            `:""}

            <!-- Contenu slot="content" sera déplacé ici -->
            <div class="demo-content-slot"></div>
          </div>
        </div>
      </main>

      <style>
        .demo-layout {
          display: flex;
          gap: 2rem;
        }

        .fr-sidemenu {
          flex: 0 0 280px;
          position: sticky;
          top: 1rem;
          height: fit-content;
        }

        .demo-content {
          flex: 1;
          min-width: 0;
        }

        @media (max-width: 992px) {
          .demo-layout {
            flex-direction: column;
          }

          .fr-sidemenu {
            position: static;
            flex: none;
          }
        }

        /* Styles communs pour les sections de démo */
        .demo-section {
          background: var(--background-alt-grey);
          padding: 1.5rem;
          border-radius: 4px;
          margin: 1.5rem 0;
        }

        .code-block {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.85rem;
          overflow-x: auto;
          white-space: pre-wrap;
        }

        .attr-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        .attr-table th,
        .attr-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid var(--border-default-grey);
        }

        .attr-table th {
          background: var(--background-alt-grey);
          font-weight: 600;
        }

        .attr-table code {
          background: var(--background-contrast-grey);
          padding: 0.125rem 0.375rem;
          border-radius: 2px;
          font-size: 0.85em;
        }
      </style>
    `}},c(ae,"AppLayoutDemo"),ae),ge([d({type:String})],l.AppLayoutDemo.prototype,"title",void 0),ge([d({type:String})],l.AppLayoutDemo.prototype,"icon",void 0),ge([d({type:String,attribute:"active-path"})],l.AppLayoutDemo.prototype,"activePath",void 0),ge([d({type:String,attribute:"base-path"})],l.AppLayoutDemo.prototype,"basePath",void 0),l.AppLayoutDemo=ge([A("app-layout-demo")],l.AppLayoutDemo);var z=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(s=a[o])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};let N=(se=class extends ${constructor(){super(...arguments),this.showDataTab=!1,this.showSaveButton=!1,this.showPlaygroundButton=!1,this.tabLabels="Aperçu,Code,Données",this.activeTab="preview",this._activeTab="preview",this._previewContent=[],this._codeContent=[],this._dataContent=[],this._contentMoved=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._activeTab=this.activeTab,this._saveSlotContent()}_saveSlotContent(){this._previewContent=Array.from(this.querySelectorAll('[slot="preview"]')),this._codeContent=Array.from(this.querySelectorAll('[slot="code"]')),this._dataContent=Array.from(this.querySelectorAll('[slot="data"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector("#tab-preview"),t=this.querySelector("#tab-code"),i=this.querySelector("#tab-data");e&&this._previewContent.forEach(r=>e.appendChild(r)),t&&this._codeContent.forEach(r=>t.appendChild(r)),i&&this._dataContent.forEach(r=>i.appendChild(r)),this._contentMoved=!0}setActiveTab(e){this._activeTab=e,this.requestUpdate()}getActiveTab(){return this._activeTab}_handleTabClick(e){this._activeTab=e,this.dispatchEvent(new CustomEvent("tab-change",{detail:{tab:e},bubbles:!0,composed:!0})),this.requestUpdate()}_getTabLabels(){return this.tabLabels.split(",").map(e=>e.trim())}_handleSaveClick(){this.dispatchEvent(new CustomEvent("save-favorite",{bubbles:!0,composed:!0}))}_handlePlaygroundClick(){this.dispatchEvent(new CustomEvent("open-playground",{bubbles:!0,composed:!0}))}render(){const e=this._getTabLabels(),[t,i,r]=e;return h`
      <div class="preview-panel">
        <!-- Onglets -->
        <div class="preview-panel-tabs">
          <button
            class="preview-panel-tab ${this._activeTab==="preview"?"active":""}"
            data-tab="preview"
            @click="${()=>this._handleTabClick("preview")}">
            ${t||"Aperçu"}
          </button>
          <button
            class="preview-panel-tab ${this._activeTab==="code"?"active":""}"
            data-tab="code"
            @click="${()=>this._handleTabClick("code")}">
            ${i||"Code"}
          </button>
          ${this.showDataTab?h`
            <button
              class="preview-panel-tab ${this._activeTab==="data"?"active":""}"
              data-tab="data"
              @click="${()=>this._handleTabClick("data")}">
              ${r||"Données"}
            </button>
          `:m}
          ${this.showPlaygroundButton?h`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          `:m}
          ${this.showSaveButton?h`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          `:m}
        </div>

        <!-- Contenu des onglets -->
        <div class="preview-panel-content">
          <!-- Onglet Aperçu - contenu slot="preview" sera déplacé ici -->
          <div class="preview-panel-tab-content ${this._activeTab==="preview"?"active":""}" id="tab-preview">
          </div>

          <!-- Onglet Code - contenu slot="code" sera déplacé ici -->
          <div class="preview-panel-tab-content ${this._activeTab==="code"?"active":""}" id="tab-code">
          </div>

          <!-- Onglet Données - contenu slot="data" sera déplacé ici -->
          <div class="preview-panel-tab-content ${this._activeTab==="data"?"active":""}" id="tab-data">
          </div>
        </div>
      </div>

      <style>
        app-preview-panel {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          background: var(--background-alt-grey);
        }

        .preview-panel {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }

        /* Onglets */
        .preview-panel-tabs {
          display: flex;
          background: var(--background-default-grey);
          border-bottom: 1px solid var(--border-default-grey);
          flex-shrink: 0;
        }

        .preview-panel-tab {
          padding: 0.75rem 1.5rem;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 0.85rem;
          border-bottom: 2px solid transparent;
          color: var(--text-mention-grey);
          transition: color 0.15s, border-color 0.15s;
        }

        .preview-panel-tab:hover {
          color: var(--text-action-high-blue-france);
        }

        .preview-panel-tab.active {
          color: var(--text-action-high-blue-france);
          border-bottom-color: var(--border-action-high-blue-france);
          font-weight: 600;
        }

        /* Boutons d'action (Playground, Favoris) */
        .preview-panel-action-btn {
          padding: 0.5rem 1rem;
          border: none;
          background: var(--background-action-low-blue-france);
          color: var(--text-action-high-blue-france);
          cursor: pointer;
          font-size: 0.8rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-right: 0.5rem;
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
          transition: background 0.15s;
        }

        .preview-panel-action-btn:first-of-type {
          margin-left: auto;
        }

        .preview-panel-action-btn:hover {
          background: var(--background-action-low-blue-france-hover);
        }

        .preview-panel-action-btn i {
          font-size: 1rem;
        }

        /* Contenu des onglets */
        .preview-panel-content {
          flex: 1;
          overflow: auto;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .preview-panel-tab-content {
          display: none;
          flex-direction: column;
          flex: 1;
          padding: 1.5rem;
          min-height: 0;
          overflow: auto;
        }

        .preview-panel-tab-content.active {
          display: flex;
        }

        /* Styles communs pour le contenu des slots */

        /* Preview content */
        .preview-panel-tab-content .preview-chart,
        .preview-panel-tab-content .chart-wrapper {
          position: relative;
          flex: 1;
          min-height: 300px;
          background: var(--background-default-grey);
          border-radius: 8px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
        }

        .preview-panel-tab-content .preview-title,
        .preview-panel-tab-content h2:first-child {
          margin: 0 0 0.25rem;
          font-size: 1.25rem;
          color: var(--text-title-grey);
        }

        .preview-panel-tab-content .preview-subtitle,
        .preview-panel-tab-content .subtitle {
          margin: 0 0 1rem;
          font-size: 0.9rem;
          color: var(--text-mention-grey);
        }

        .preview-panel-tab-content .chart-container {
          position: relative;
          flex: 1;
          min-height: 300px;
        }

        .preview-panel-tab-content .empty-state {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-mention-grey);
          text-align: center;
          pointer-events: none;
        }

        .preview-panel-tab-content .empty-state i {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        /* Code output styles */
        .preview-panel-tab-content .code-output,
        .preview-panel-tab-content pre#generated-code,
        .preview-panel-tab-content pre#raw-data {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1rem;
          border-radius: 8px;
          font-family: 'Fira Code', 'Consolas', monospace;
          font-size: 0.8rem;
          white-space: pre-wrap;
          word-break: break-word;
          overflow: auto;
          flex: 1;
          margin: 0;
          min-height: 200px;
        }

        /* Copy button */
        .preview-panel-tab-content .copy-btn,
        .preview-panel-tab-content #copy-code-btn {
          align-self: flex-end;
          margin-bottom: 0.5rem;
        }

        /* Canvas and iframe in preview */
        .preview-panel-tab-content canvas {
          width: 100% !important;
          height: 100% !important;
        }

        .preview-panel-tab-content iframe {
          width: 100%;
          height: 100%;
          min-height: 400px;
          border: none;
          background: white;
          border-radius: 4px;
        }

        /* Data summary */
        .preview-panel-tab-content .data-summary {
          background: var(--background-default-grey);
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .preview-panel-tab-content .data-summary h4 {
          margin: 0 0 0.5rem;
          font-size: 0.9rem;
        }

        .preview-panel-tab-content .field-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .preview-panel-tab-content .field-tag {
          padding: 0.25rem 0.5rem;
          background: var(--background-contrast-info);
          border-radius: 4px;
          font-size: 0.75rem;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .preview-panel-tab {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }

          .preview-panel-tab-content {
            padding: 1rem;
          }
        }
      </style>
    `}},c(se,"AppPreviewPanel"),se);z([d({type:Boolean,attribute:"show-data-tab"})],N.prototype,"showDataTab",void 0),z([d({type:Boolean,attribute:"show-save-button"})],N.prototype,"showSaveButton",void 0),z([d({type:Boolean,attribute:"show-playground-button"})],N.prototype,"showPlaygroundButton",void 0),z([d({type:String,attribute:"tab-labels"})],N.prototype,"tabLabels",void 0),z([d({type:String,attribute:"active-tab"})],N.prototype,"activeTab",void 0),z([w()],N.prototype,"_activeTab",void 0),N=z([A("app-preview-panel")],N);function At(a,e,t){return a.map(i=>({label:String(b(i,e)??"N/A"),value:Number(b(i,t))||0}))}c(At,"extractLabelValues");function Ct(a,e){if(e==="none")return a;const t=new Map;for(const r of a){const n=t.get(r.label)||[];n.push(r.value),t.set(r.label,n)}const i=[];for(const[r,n]of t)i.push({label:r,value:nr(n,e)});return i}c(Ct,"aggregateByLabel");function nr(a,e){switch(e){case"sum":return a.reduce((t,i)=>t+i,0);case"avg":return a.reduce((t,i)=>t+i,0)/a.length;case"count":return a.length;case"min":return Math.min(...a);case"max":return Math.max(...a);default:return a[0]||0}}c(nr,"computeGroupValue");function Pt(a,e){return e==="none"?a:[...a].sort((t,i)=>e==="desc"?i.value-t.value:t.value-i.value)}c(Pt,"sortByValue");function ar(a,e,t,i="none",r="none",n=0){if(!a||a.length===0)return{labels:[],values:[]};let s=At(a,e,t);return s=Ct(s,i),s=Pt(s,r),n>0&&(s=s.slice(0,n)),{labels:s.map(o=>o.label),values:s.map(o=>Math.round(o.value*100)/100)}}c(ar,"processChartData"),l.DATA_EVENTS=P,l.SourceSubscriberMixin=$e,l.aggregateByLabel=Ct,l.computeAggregation=He,l.dispatchDataError=U,l.dispatchDataLoaded=V,l.dispatchDataLoading=F,l.extractLabelValues=At,l.formatCurrency=yt,l.formatDate=tr,l.formatNumber=qe,l.formatPercentage=_t,l.formatValue=Ie,l.getByPath=b,l.getByPathOrDefault=Ht,l.getDataCache=fe,l.hasPath=qt,l.parseExpression=$t,l.processChartData=ar,l.sortByValue=Pt,l.subscribeToSource=_e,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})}));
