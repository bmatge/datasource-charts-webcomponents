(function(o,C){typeof exports=="object"&&typeof module<"u"?C(exports):typeof define=="function"&&define.amd?define(["exports"],C):(o=typeof globalThis<"u"?globalThis:o||self,C(o.GouvWidgets={}))})(this,(function(o){"use strict";var Kt=Object.defineProperty;var c=(o,C)=>Kt(o,"name",{value:C,configurable:!0});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var q,z,$t,H,V,Q,W,K,J,X,Z,Y,ee;const C=globalThis,$e=C.ShadowRoot&&(C.ShadyCSS===void 0||C.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),We=new WeakMap;let Ke=(q=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if($e&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=We.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&We.set(t,e))}return e}toString(){return this.cssText}},c(q,"n"),q);const wt=c(a=>new Ke(typeof a=="string"?a:a+"",void 0,we),"r$4"),Je=c((a,...e)=>{const t=a.length===1?a[0]:e.reduce((r,i,n)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[n+1],a[0]);return new Ke(t,a,we)},"i$3"),St=c((a,e)=>{if($e)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),i=C.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,a.appendChild(r)}},"S$1"),Xe=$e?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return wt(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:At,defineProperty:Ct,getOwnPropertyDescriptor:Et,getOwnPropertyNames:Pt,getOwnPropertySymbols:Dt,getPrototypeOf:kt}=Object,k=globalThis,Ze=k.trustedTypes,Rt=Ze?Ze.emptyScript:"",Se=k.reactiveElementPolyfillSupport,te=c((a,e)=>a,"d$1"),de={toAttribute(a,e){switch(e){case Boolean:a=a?Rt:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},Ae=c((a,e)=>!At(a,e),"f$1"),Ye={attribute:!0,type:String,converter:de,reflect:!1,useDefault:!1,hasChanged:Ae};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);let F=(z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ye){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&Ct(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){const{get:i,set:n}=Et(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:i,set(s){const l=i==null?void 0:i.call(this);n==null||n.call(this,s),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ye}static _$Ei(){if(this.hasOwnProperty(te("elementProperties")))return;const e=kt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(te("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(te("properties"))){const t=this.properties,r=[...Pt(t),...Dt(t)];for(const i of r)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const i of r)t.unshift(Xe(i))}else e!==void 0&&t.push(Xe(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return St(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var n;const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){const s=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:de).toAttribute(t,r.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){var n,s;const r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=r.getPropertyOptions(i),u=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:de;this._$Em=i;const f=u.fromAttribute(t,l.type);this[i]=f??((s=this._$Ej)==null?void 0:s.get(i))??f,this._$Em=null}}requestUpdate(e,t,r,i=!1,n){var s;if(e!==void 0){const l=this.constructor;if(i===!1&&(n=this[e]),r??(r=l.getPropertyOptions(e)),!((r.hasChanged??Ae)(n,t)||r.useDefault&&r.reflect&&n===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(l._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:n},s){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),n!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,s]of i){const{wrapped:l}=s,u=this[n];l!==!0||this._$AL.has(n)||u===void 0||this.C(n,void 0,s,u)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}},c(z,"y"),z);F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[te("elementProperties")]=new Map,F[te("finalized")]=new Map,Se==null||Se({ReactiveElement:F}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const re=globalThis,et=c(a=>a,"i$1"),he=re.trustedTypes,tt=he?he.createPolicy("lit-html",{createHTML:c(a=>a,"createHTML")}):void 0,rt="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,it="?"+R,xt=`<${it}>`,T=document,ie=c(()=>T.createComment(""),"c"),ne=c(a=>a===null||typeof a!="object"&&typeof a!="function","a"),Ce=Array.isArray,Mt=c(a=>Ce(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function","d"),Ee=`[ 	
\f\r]`,ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,at=/>/g,N=RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),st=/'/g,ot=/"/g,lt=/^(?:script|style|textarea|title)$/i,Tt=c(a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),"x"),h=Tt(1),U=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),ut=new WeakMap,O=T.createTreeWalker(T,129);function ct(a,e){if(!Ce(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return tt!==void 0?tt.createHTML(e):e}c(ct,"V");const Nt=c((a,e)=>{const t=a.length-1,r=[];let i,n=e===2?"<svg>":e===3?"<math>":"",s=ae;for(let l=0;l<t;l++){const u=a[l];let f,g,p=-1,w=0;for(;w<u.length&&(s.lastIndex=w,g=s.exec(u),g!==null);)w=s.lastIndex,s===ae?g[1]==="!--"?s=nt:g[1]!==void 0?s=at:g[2]!==void 0?(lt.test(g[2])&&(i=RegExp("</"+g[2],"g")),s=N):g[3]!==void 0&&(s=N):s===N?g[0]===">"?(s=i??ae,p=-1):g[1]===void 0?p=-2:(p=s.lastIndex-g[2].length,f=g[1],s=g[3]===void 0?N:g[3]==='"'?ot:st):s===ot||s===st?s=N:s===nt||s===at?s=ae:(s=N,i=void 0);const M=s===N&&a[l+1].startsWith("/>")?" ":"";n+=s===ae?u+xt:p>=0?(r.push(f),u.slice(0,p)+rt+u.slice(p)+R+M):u+R+(p===-2?l:M)}return[ct(a,n+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},"N"),me=class me{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let n=0,s=0;const l=e.length-1,u=this.parts,[f,g]=Nt(e,t);if(this.el=me.createElement(f,r),O.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=O.nextNode())!==null&&u.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(rt)){const w=g[s++],M=i.getAttribute(p).split(R),ye=/([.?@])?(.*)/.exec(w);u.push({type:1,index:n,name:ye[2],strings:M,ctor:ye[1]==="."?De:ye[1]==="?"?ke:ye[1]==="@"?Re:j}),i.removeAttribute(p)}else p.startsWith(R)&&(u.push({type:6,index:n}),i.removeAttribute(p));if(lt.test(i.tagName)){const p=i.textContent.split(R),w=p.length-1;if(w>0){i.textContent=he?he.emptyScript:"";for(let M=0;M<w;M++)i.append(p[M],ie()),O.nextNode(),u.push({type:2,index:++n});i.append(p[w],ie())}}}else if(i.nodeType===8)if(i.data===it)u.push({type:2,index:n});else{let p=-1;for(;(p=i.data.indexOf(R,p+1))!==-1;)u.push({type:7,index:n}),p+=R.length-1}n++}}static createElement(e,t){const r=T.createElement("template");return r.innerHTML=e,r}};c(me,"S");let se=me;function B(a,e,t=a,r){var s,l;if(e===U)return e;let i=r!==void 0?(s=t._$Co)==null?void 0:s[r]:t._$Cl;const n=ne(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(a),i._$AT(a,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=i:t._$Cl=i),i!==void 0&&(e=B(a,i._$AS(a,e.values),i,r)),e}c(B,"M");const je=class je{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,i=((e==null?void 0:e.creationScope)??T).importNode(t,!0);O.currentNode=i;let n=O.nextNode(),s=0,l=0,u=r[0];for(;u!==void 0;){if(s===u.index){let f;u.type===2?f=new oe(n,n.nextSibling,this,e):u.type===1?f=new u.ctor(n,u.name,u.strings,this,e):u.type===6&&(f=new xe(n,this,e)),this._$AV.push(f),u=r[++l]}s!==(u==null?void 0:u.index)&&(n=O.nextNode(),s++)}return O.currentNode=T,i}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}};c(je,"R");let Pe=je;const _e=class _e{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),ne(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==U&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Mt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&ne(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=se.createElement(ct(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const s=new Pe(i,this),l=s.u(this.options);s.p(t),this.T(l),this._$AH=s}}_$AC(e){let t=ut.get(e.strings);return t===void 0&&ut.set(e.strings,t=new se(e)),t}k(e){Ce(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const n of e)i===t.length?t.push(r=new _e(this.O(ie()),this.O(ie()),this,this.options)):r=t[i],r._$AI(n),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e!==this._$AB;){const i=et(e).nextSibling;et(e).remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}};c(_e,"k");let oe=_e;const Ie=class Ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=v}_$AI(e,t=this,r,i){const n=this.strings;let s=!1;if(n===void 0)e=B(this,e,t,0),s=!ne(e)||e!==this._$AH&&e!==U,s&&(this._$AH=e);else{const l=e;let u,f;for(e=n[0],u=0;u<n.length-1;u++)f=B(this,l[r+u],t,u),f===U&&(f=this._$AH[u]),s||(s=!ne(f)||f!==this._$AH[u]),f===v?e=v:e!==v&&(e+=(f??"")+n[u+1]),this._$AH[u]=f}s&&!i&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};c(Ie,"H");let j=Ie;const qe=class qe extends j{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}};c(qe,"I");let De=qe;const ze=class ze extends j{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}};c(ze,"L");let ke=ze;const He=class He extends j{constructor(e,t,r,i,n){super(e,t,r,i,n),this.type=5}_$AI(e,t=this){if((e=B(this,e,t,0)??v)===U)return;const r=this._$AH,i=e===v&&r!==v||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==v&&(r===v||i);i&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}};c(He,"z");let Re=He;const Ve=class Ve{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}};c(Ve,"Z");let xe=Ve;const Me=re.litHtmlPolyfillSupport;Me==null||Me(se,oe),(re.litHtmlVersions??(re.litHtmlVersions=[])).push("3.3.2");const Ot=c((a,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let i=r._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;r._$litPart$=i=new oe(e.insertBefore(ie(),n),n,void 0,t??{})}return i._$AI(a),i},"D");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis,Qe=class Qe extends F{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ot(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return U}};c(Qe,"i");let $=Qe;$._$litElement$=!0,$.finalized=!0,($t=L.litElementHydrateSupport)==null||$t.call(L,{LitElement:$});const Te=L.litElementPolyfillSupport;Te==null||Te({LitElement:$}),(L.litElementVersions??(L.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=c(a=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)},"t");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt={attribute:!0,type:String,converter:de,reflect:!1,hasChanged:Ae},Gt=c((a=Lt,e,t)=>{const{kind:r,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),r==="setter"&&((a=Object.create(a)).wrapped=!0),n.set(t.name,a),r==="accessor"){const{name:s}=t;return{set(l){const u=e.get.call(this);e.set.call(this,l),this.requestUpdate(s,u,a,!0,l)},init(l){return l!==void 0&&this.C(s,void 0,a,l),l}}}if(r==="setter"){const{name:s}=t;return function(l){const u=this[s];e.call(this,l),this.requestUpdate(s,u,a,!0,l)}}throw Error("Unsupported decorator location: "+r)},"r$1");function d(a){return(e,t)=>typeof t=="object"?Gt(a,e,t):((r,i,n)=>{const s=i.hasOwnProperty(n);return i.constructor.createProperty(n,r),s?Object.getOwnPropertyDescriptor(i,n):void 0})(a,e,t)}c(d,"n");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(a){return d({...a,state:!0,attribute:!1})}c(y,"r");function m(a,e){if(!e||e.trim()==="")return a;const r=e.replace(/\[(\d+)\]/g,".$1").split(".");let i=a;for(const n of r){if(i==null||typeof i!="object")return;i=i[n]}return i}c(m,"getByPath");function Ft(a,e){return m(a,e)!==void 0}c(Ft,"hasPath");function Ut(a,e,t){const r=m(a,e);return r!==void 0?r:t}c(Ut,"getByPathOrDefault");const Bt="https://chartsbuilder.matge.com/beacon",dt=new Set;function le(a,e){const t=`${a}:${e||""}`;if(dt.has(t)||(dt.add(t),typeof window>"u"))return;const r=window.location.hostname;if(r==="localhost"||r==="127.0.0.1"||r==="chartsbuilder.matge.com")return;const i=new URLSearchParams;i.set("c",a),e&&i.set("t",e);const n=`${Bt}?${i.toString()}`;try{fetch(n,{method:"GET",keepalive:!0,mode:"no-cors"}).catch(()=>{})}catch{}}c(le,"sendWidgetBeacon");const P={LOADED:"gouv-data-loaded",ERROR:"gouv-data-error",LOADING:"gouv-data-loading"},Ne=new Map;function jt(a,e){Ne.set(a,e)}c(jt,"setDataCache");function Oe(a){return Ne.get(a)}c(Oe,"getDataCache");function ht(a){Ne.delete(a)}c(ht,"clearDataCache");function ue(a,e){jt(a,e);const t=new CustomEvent(P.LOADED,{bubbles:!0,composed:!0,detail:{sourceId:a,data:e}});document.dispatchEvent(t)}c(ue,"dispatchDataLoaded");function pe(a,e){const t=new CustomEvent(P.ERROR,{bubbles:!0,composed:!0,detail:{sourceId:a,error:e}});document.dispatchEvent(t)}c(pe,"dispatchDataError");function fe(a){const e=new CustomEvent(P.LOADING,{bubbles:!0,composed:!0,detail:{sourceId:a}});document.dispatchEvent(e)}c(fe,"dispatchDataLoading");function Le(a,e){const t=c(n=>{const s=n;s.detail.sourceId===a&&e.onLoaded&&e.onLoaded(s.detail.data)},"handleLoaded"),r=c(n=>{const s=n;s.detail.sourceId===a&&e.onError&&e.onError(s.detail.error)},"handleError"),i=c(n=>{n.detail.sourceId===a&&e.onLoading&&e.onLoading()},"handleLoading");return document.addEventListener(P.LOADED,t),document.addEventListener(P.ERROR,r),document.addEventListener(P.LOADING,i),()=>{document.removeEventListener(P.LOADED,t),document.removeEventListener(P.ERROR,r),document.removeEventListener(P.LOADING,i)}}c(Le,"subscribeToSource");var D=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};o.GouvSource=(H=class extends ${constructor(){super(...arguments),this.url="",this.method="GET",this.headers="",this.params="",this.refresh=0,this.transform="",this._loading=!1,this._error=null,this._data=null,this._refreshInterval=null,this._abortController=null}createRenderRoot(){return this}render(){return h``}connectedCallback(){super.connectedCallback(),le("gouv-source"),this._setupRefresh()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&ht(this.id)}updated(e){(e.has("url")||e.has("params")||e.has("transform"))&&this._fetchData(),e.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._fetchData()},this.refresh*1e3))}async _fetchData(){if(this.url){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,fe(this.id);try{const e=this._buildUrl(),t=this._buildFetchOptions(),r=await fetch(e,{...t,signal:this._abortController.signal});if(!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);const i=await r.json();this._data=this.transform?m(i,this.transform):i,ue(this.id,this._data)}catch(e){if(e.name==="AbortError")return;this._error=e,pe(this.id,this._error),console.error(`gouv-source[${this.id}]: Erreur de chargement`,e)}finally{this._loading=!1}}}_buildUrl(){const e=window.location.origin!=="null"?window.location.origin:void 0,t=new URL(this.url,e);if(this.params&&this.method==="GET")try{const r=JSON.parse(this.params);Object.entries(r).forEach(([i,n])=>{t.searchParams.set(i,String(n))})}catch(r){console.warn("gouv-source: params invalides (JSON attendu)",r)}return t.toString()}_buildFetchOptions(){const e={method:this.method};if(this.headers)try{e.headers=JSON.parse(this.headers)}catch(t){console.warn("gouv-source: headers invalides (JSON attendu)",t)}return this.method==="POST"&&this.params&&(e.headers={"Content-Type":"application/json",...e.headers||{}},e.body=this.params),e}reload(){this._fetchData()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},c(H,"GouvSource"),H),D([d({type:String})],o.GouvSource.prototype,"url",void 0),D([d({type:String})],o.GouvSource.prototype,"method",void 0),D([d({type:String})],o.GouvSource.prototype,"headers",void 0),D([d({type:String})],o.GouvSource.prototype,"params",void 0),D([d({type:Number})],o.GouvSource.prototype,"refresh",void 0),D([d({type:String})],o.GouvSource.prototype,"transform",void 0),D([y()],o.GouvSource.prototype,"_loading",void 0),D([y()],o.GouvSource.prototype,"_error",void 0),D([y()],o.GouvSource.prototype,"_data",void 0),o.GouvSource=D([E("gouv-source")],o.GouvSource);var _=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};const ge=100,Ge=10;o.GouvQuery=(V=class extends ${constructor(){super(...arguments),this.apiType="generic",this.source="",this.baseUrl="",this.datasetId="",this.resource="",this.select="",this.where="",this.filter="",this.groupBy="",this.aggregate="",this.orderBy="",this.limit=0,this.transform="",this.refresh=0,this._loading=!1,this._error=null,this._data=[],this._rawData=[],this._refreshInterval=null,this._abortController=null,this._unsubscribe=null}createRenderRoot(){return this}render(){return h``}connectedCallback(){super.connectedCallback(),le("gouv-query",this.apiType),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&ht(this.id)}updated(e){["source","apiType","baseUrl","dataset","resource","select","where","filter","groupBy","aggregate","orderBy","limit","transform"].some(r=>e.has(r))&&this._initialize(),e.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._initialize()},this.refresh*1e3))}_initialize(){if(!this.id){console.warn('gouv-query: attribut "id" requis pour identifier la requête');return}this.apiType==="generic"?this._subscribeToSource():this._fetchFromApi()}_subscribeToSource(){if(!this.source){console.warn('gouv-query: attribut "source" requis en mode generic');return}this._unsubscribe&&this._unsubscribe();const e=Oe(this.source);e!==void 0&&(this._rawData=Array.isArray(e)?e:[e],this._processClientSide()),this._unsubscribe=Le(this.source,{onLoaded:c(t=>{this._rawData=Array.isArray(t)?t:[t],this._processClientSide()},"onLoaded")})}_processClientSide(){try{fe(this.id),this._loading=!0;let e=[...this._rawData];const t=this.filter||this.where;t&&(e=this._applyFilters(e,t)),this.groupBy&&(e=this._applyGroupByAndAggregate(e)),this.orderBy&&(e=this._applySort(e)),this.limit>0&&(e=e.slice(0,this.limit)),this._data=e,ue(this.id,this._data)}catch(e){this._error=e,pe(this.id,this._error),console.error(`gouv-query[${this.id}]: Erreur de traitement`,e)}finally{this._loading=!1}}_applyFilters(e,t){const r=this._parseFilters(t);return e.filter(i=>r.every(n=>this._matchesFilter(i,n)))}_parseFilters(e){const t=[],r=e.split(",").map(i=>i.trim()).filter(Boolean);for(const i of r){const n=i.split(":");if(n.length>=2){const s=n[0],l=n[1];let u;if(n.length>2){const f=n.slice(2).join(":");l==="in"||l==="notin"?u=f.split("|").map(g=>{const p=this._parseValue(g);return typeof p=="boolean"?String(p):p}):u=this._parseValue(f)}t.push({field:s,operator:l,value:u})}}return t}_parseValue(e){return e==="true"?!0:e==="false"?!1:!isNaN(Number(e))&&e!==""?Number(e):e}_matchesFilter(e,t){const r=m(e,t.field);switch(t.operator){case"eq":return r==t.value;case"neq":return r!=t.value;case"gt":return Number(r)>Number(t.value);case"gte":return Number(r)>=Number(t.value);case"lt":return Number(r)<Number(t.value);case"lte":return Number(r)<=Number(t.value);case"contains":return String(r).toLowerCase().includes(String(t.value).toLowerCase());case"notcontains":return!String(r).toLowerCase().includes(String(t.value).toLowerCase());case"in":return Array.isArray(t.value)&&t.value.includes(r);case"notin":return Array.isArray(t.value)&&!t.value.includes(r);case"isnull":return r==null;case"isnotnull":return r!=null;default:return!0}}_applyGroupByAndAggregate(e){const t=this.groupBy.split(",").map(s=>s.trim()).filter(Boolean),r=this._parseAggregates(this.aggregate),i=new Map;for(const s of e){const l=t.map(u=>String(m(s,u)??"")).join("|||");i.has(l)||i.set(l,[]),i.get(l).push(s)}const n=[];for(const[s,l]of i){const u={},f=s.split("|||");t.forEach((g,p)=>{u[g]=f[p]});for(const g of r){const p=g.alias||`${g.field}__${g.function}`;u[p]=this._computeAggregate(l,g)}n.push(u)}return n}_parseAggregates(e){if(!e)return[];const t=[],r=e.split(",").map(i=>i.trim()).filter(Boolean);for(const i of r){const n=i.split(":");n.length>=2&&t.push({field:n[0],function:n[1],alias:n[2]})}return t}_computeAggregate(e,t){const r=e.map(i=>Number(m(i,t.field))).filter(i=>!isNaN(i));switch(t.function){case"count":return e.length;case"sum":return r.reduce((i,n)=>i+n,0);case"avg":return r.length>0?r.reduce((i,n)=>i+n,0)/r.length:0;case"min":return r.length>0?Math.min(...r):0;case"max":return r.length>0?Math.max(...r):0;default:return 0}}_applySort(e){const t=this.orderBy.split(":");if(t.length<1)return e;const r=t[0],i=(t[1]||"asc").toLowerCase();return[...e].sort((n,s)=>{const l=m(n,r),u=m(s,r),f=Number(l),g=Number(u);if(!isNaN(f)&&!isNaN(g))return i==="desc"?g-f:f-g;const p=String(l??""),w=String(u??"");return i==="desc"?w.localeCompare(p):p.localeCompare(w)})}async _fetchFromApi(){if(!this.datasetId){console.warn('gouv-query: attribut "dataset" requis pour les requêtes API');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,fe(this.id);try{this.apiType==="opendatasoft"?await this._fetchFromOdsWithPagination():await this._fetchSinglePage()}catch(e){if(e.name==="AbortError")return;this._error=e,pe(this.id,this._error),console.error(`gouv-query[${this.id}]: Erreur de requête API`,e)}finally{this._loading=!1}}async _fetchSinglePage(){const e=this._buildApiUrl(),t=await fetch(e,{signal:this._abortController.signal});if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);const r=await t.json();let i=this.transform?m(r,this.transform):r;Array.isArray(i)||(this.apiType==="tabular"&&r.data?i=r.data:i=[i]),this._data=i,ue(this.id,this._data)}async _fetchFromOdsWithPagination(){const t=this.limit<=0?Ge*ge:this.limit,r=ge;let i=[],n=0,s=-1;for(let l=0;l<Ge;l++){const u=t-i.length;if(u<=0)break;const f=this._buildOpenDataSoftUrl(Math.min(r,u),n),g=await fetch(f,{signal:this._abortController.signal});if(!g.ok)throw new Error(`HTTP ${g.status}: ${g.statusText}`);const p=await g.json(),w=p.results||[];if(i=i.concat(w),typeof p.total_count=="number"&&(s=p.total_count),s>=0&&i.length>=s||w.length<r)break;n+=w.length}s>=0&&i.length<s&&i.length<t&&console.warn(`gouv-query[${this.id}]: pagination incomplete - ${i.length}/${s} resultats recuperes (limite de securite: ${Ge} pages de ${ge})`),this._data=this.transform?m(i,this.transform):i,ue(this.id,this._data)}_buildApiUrl(){if(this.apiType==="opendatasoft")return this._buildOpenDataSoftUrl();if(this.apiType==="tabular")return this._buildTabularUrl();throw new Error(`Type d'API non supporté: ${this.apiType}`)}_buildOpenDataSoftUrl(e,t){const r=this.baseUrl||"https://data.opendatasoft.com",i=new URL(`${r}/api/explore/v2.1/catalog/datasets/${this.datasetId}/records`);this.select&&i.searchParams.set("select",this.select);const n=this.where||this.filter;if(n&&i.searchParams.set("where",n),this.groupBy&&i.searchParams.set("group_by",this.groupBy),this.orderBy){const s=this.orderBy.replace(/:(\w+)$/,(l,u)=>` ${u.toUpperCase()}`);i.searchParams.set("order_by",s)}return e!==void 0?i.searchParams.set("limit",String(e)):this.limit>0&&i.searchParams.set("limit",String(Math.min(this.limit,ge))),t&&t>0&&i.searchParams.set("offset",String(t)),i.toString()}_buildTabularUrl(){const e=this.baseUrl||"https://tabular-api.data.gouv.fr";if(!this.resource)throw new Error(`gouv-query: attribut "resource" requis pour l'API Tabular`);const t=new URL(`${e}/api/resources/${this.resource}/data/`),r=this.filter||this.where;if(r){const i=r.split(",").map(n=>n.trim());for(const n of i){const s=n.split(":");if(s.length>=3){const l=s[0],u=this._mapOperatorToTabular(s[1]),f=s.slice(2).join(":");t.searchParams.set(`${l}__${u}`,f)}}}if(this.groupBy){const i=this.groupBy.split(",").map(n=>n.trim());for(const n of i)t.searchParams.append(`${n}__groupby`,"")}if(this.aggregate){const i=this.aggregate.split(",").map(n=>n.trim());for(const n of i){const s=n.split(":");if(s.length>=2){const l=s[0],u=s[1];t.searchParams.append(`${l}__${u}`,"")}}}if(this.orderBy){const i=this.orderBy.split(":"),n=i[0],s=i[1]||"asc";t.searchParams.set(`${n}__sort`,s)}return this.limit>0&&t.searchParams.set("page_size",String(Math.min(this.limit,50))),t.toString()}_mapOperatorToTabular(e){return{eq:"exact",neq:"differs",gt:"strictly_greater",gte:"greater",lt:"strictly_less",lte:"less",contains:"contains",notcontains:"notcontains",in:"in",notin:"notin",isnull:"isnull",isnotnull:"isnotnull"}[e]||e}reload(){this._initialize()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},c(V,"GouvQuery"),V),_([d({type:String,attribute:"api-type"})],o.GouvQuery.prototype,"apiType",void 0),_([d({type:String})],o.GouvQuery.prototype,"source",void 0),_([d({type:String,attribute:"base-url"})],o.GouvQuery.prototype,"baseUrl",void 0),_([d({type:String,attribute:"dataset-id"})],o.GouvQuery.prototype,"datasetId",void 0),_([d({type:String})],o.GouvQuery.prototype,"resource",void 0),_([d({type:String})],o.GouvQuery.prototype,"select",void 0),_([d({type:String})],o.GouvQuery.prototype,"where",void 0),_([d({type:String})],o.GouvQuery.prototype,"filter",void 0),_([d({type:String,attribute:"group-by"})],o.GouvQuery.prototype,"groupBy",void 0),_([d({type:String})],o.GouvQuery.prototype,"aggregate",void 0),_([d({type:String,attribute:"order-by"})],o.GouvQuery.prototype,"orderBy",void 0),_([d({type:Number})],o.GouvQuery.prototype,"limit",void 0),_([d({type:String})],o.GouvQuery.prototype,"transform",void 0),_([d({type:Number})],o.GouvQuery.prototype,"refresh",void 0),_([y()],o.GouvQuery.prototype,"_loading",void 0),_([y()],o.GouvQuery.prototype,"_error",void 0),_([y()],o.GouvQuery.prototype,"_data",void 0),_([y()],o.GouvQuery.prototype,"_rawData",void 0),o.GouvQuery=_([E("gouv-query")],o.GouvQuery);function ve(a){const t=class t extends a{constructor(){super(...arguments),this._sourceLoading=!1,this._sourceData=null,this._sourceError=null,this._unsubscribeSource=null}onSourceData(i){}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSubscription()}updated(i){super.updated(i),i.has("source")&&this._subscribeToSource()}_subscribeToSource(){this._cleanupSubscription();const i=this.source;if(!i)return;const n=Oe(i);n!==void 0&&(this._sourceData=n,this.onSourceData(n)),this._unsubscribeSource=Le(i,{onLoaded:c(s=>{this._sourceData=s,this._sourceLoading=!1,this._sourceError=null,this.onSourceData(s),this.requestUpdate()},"onLoaded"),onLoading:c(()=>{this._sourceLoading=!0,this.requestUpdate()},"onLoading"),onError:c(s=>{this._sourceError=s,this._sourceLoading=!1,this.requestUpdate()},"onError")})}_cleanupSubscription(){this._unsubscribeSource&&(this._unsubscribeSource(),this._unsubscribeSource=null)}};c(t,"SourceSubscriberElement");let e=t;return e}c(ve,"SourceSubscriberMixin");function Fe(a,e="nombre"){if(a==null||a==="")return"—";const t=typeof a=="string"?parseFloat(a):a;if(isNaN(t))return"—";switch(e){case"nombre":return Ue(t);case"pourcentage":return pt(t);case"euro":return ft(t);case"decimal":return It(t);default:return Ue(t)}}c(Fe,"formatValue");function Ue(a){return new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(Math.round(a))}c(Ue,"formatNumber");function pt(a){return new Intl.NumberFormat("fr-FR",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:1}).format(a/100)}c(pt,"formatPercentage");function ft(a){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(a)}c(ft,"formatCurrency");function It(a){return new Intl.NumberFormat("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:2}).format(a)}c(It,"formatDecimal");function qt(a){const e=typeof a=="string"?new Date(a):a;return isNaN(e.getTime())?"—":new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(e)}c(qt,"formatDate");function zt(a,e,t){return e!==void 0&&a>=e?"vert":t!==void 0&&a>=t?"orange":e!==void 0||t!==void 0?"rouge":"bleu"}c(zt,"getColorBySeuil");function gt(a){const e=a.split(":");if(e.length===1)return{type:"direct",field:e[0]};const t=e[0],r=e[1];if(e.length===3){let i=e[2];return i==="true"?i=!0:i==="false"?i=!1:isNaN(Number(i))||(i=Number(i)),{type:t,field:r,filterField:r,filterValue:i}}return{type:t,field:r}}c(gt,"parseExpression");function Be(a,e){const t=gt(e);if(t.type==="direct"&&!Array.isArray(a))return a[t.field];if(!Array.isArray(a))return null;const r=a;switch(t.type){case"direct":case"first":return r.length>0?r[0][t.field]:null;case"last":return r.length>0?r[r.length-1][t.field]:null;case"count":return t.filterValue!==void 0?r.filter(n=>n[t.field]===t.filterValue).length:r.length;case"sum":return r.reduce((n,s)=>{const l=Number(s[t.field]);return n+(isNaN(l)?0:l)},0);case"avg":return r.length===0?null:r.reduce((n,s)=>{const l=Number(s[t.field]);return n+(isNaN(l)?0:l)},0)/r.length;case"min":return r.length===0?null:Math.min(...r.map(n=>Number(n[t.field])).filter(n=>!isNaN(n)));case"max":return r.length===0?null:Math.max(...r.map(n=>Number(n[t.field])).filter(n=>!isNaN(n)));default:return null}}c(Be,"computeAggregation");var A=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};const vt={vert:"gouv-kpi--success",orange:"gouv-kpi--warning",rouge:"gouv-kpi--error",bleu:"gouv-kpi--info"};o.GouvKpi=(Q=class extends ve($){constructor(){super(...arguments),this.source="",this.valeur="",this.label="",this.description="",this.icone="",this.format="nombre",this.tendance="",this.couleur=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),le("gouv-kpi")}_computeValue(){return!this._sourceData||!this.valeur?null:Be(this._sourceData,this.valeur)}_getColor(){if(this.couleur)return this.couleur;const e=this._computeValue();return typeof e!="number"?"bleu":zt(e,this.seuilVert,this.seuilOrange)}_getTendanceInfo(){if(!this.tendance||!this._sourceData)return null;const e=Be(this._sourceData,this.tendance);return typeof e!="number"?null:{value:e,direction:e>0?"up":e<0?"down":"stable"}}_getAriaLabel(){if(this.description)return this.description;const e=this._computeValue(),t=Fe(e,this.format);return`${this.label}: ${t}`}render(){const e=this._computeValue(),t=Fe(e,this.format),r=vt[this._getColor()]||vt.bleu,i=this._getTendanceInfo();return h`
      <div
        class="gouv-kpi ${r}"
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
              ${i?h`
                <span class="gouv-kpi__tendance gouv-kpi__tendance--${i.direction}" aria-label="${i.value>0?"en hausse":i.value<0?"en baisse":"stable"}">
                  ${i.direction==="up"?"↑":i.direction==="down"?"↓":"→"}
                  ${Math.abs(i.value).toFixed(1)}%
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
    `}},c(Q,"GouvKpi"),Q),o.GouvKpi.styles=Je``,A([d({type:String})],o.GouvKpi.prototype,"source",void 0),A([d({type:String})],o.GouvKpi.prototype,"valeur",void 0),A([d({type:String})],o.GouvKpi.prototype,"label",void 0),A([d({type:String})],o.GouvKpi.prototype,"description",void 0),A([d({type:String})],o.GouvKpi.prototype,"icone",void 0),A([d({type:String})],o.GouvKpi.prototype,"format",void 0),A([d({type:String})],o.GouvKpi.prototype,"tendance",void 0),A([d({type:Number,attribute:"seuil-vert"})],o.GouvKpi.prototype,"seuilVert",void 0),A([d({type:Number,attribute:"seuil-orange"})],o.GouvKpi.prototype,"seuilOrange",void 0),A([d({type:String})],o.GouvKpi.prototype,"couleur",void 0),o.GouvKpi=A([E("gouv-kpi")],o.GouvKpi);var S=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};o.GouvDatalist=(W=class extends ve($){constructor(){super(...arguments),this.source="",this.colonnes="",this.recherche=!1,this.filtres="",this.tri="",this.pagination=0,this.export="",this._data=[],this._searchQuery="",this._activeFilters={},this._sort=null,this._currentPage=1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),le("gouv-datalist"),this._initSort()}updated(e){super.updated(e),e.has("tri")&&this._initSort()}onSourceData(e){this._data=Array.isArray(e)?e:[],this._currentPage=1}parseColumns(){return this.colonnes?this.colonnes.split(",").map(e=>{const[t,r]=e.trim().split(":");return{key:t.trim(),label:(r==null?void 0:r.trim())||t.trim()}}):[]}_getFilterableColumns(){return this.filtres?this.filtres.split(",").map(e=>e.trim()):[]}_initSort(){if(this.tri){const[e,t]=this.tri.split(":");this._sort={key:e,direction:t||"asc"}}}_getUniqueValues(e){const t=new Set;return this._data.forEach(r=>{const i=r[e];i!=null&&t.add(String(i))}),Array.from(t).sort()}getFilteredData(){let e=[...this._data];if(this._searchQuery){const t=this._searchQuery.toLowerCase();e=e.filter(r=>Object.values(r).some(i=>String(i).toLowerCase().includes(t)))}if(Object.entries(this._activeFilters).forEach(([t,r])=>{r&&(e=e.filter(i=>String(i[t])===r))}),this._sort){const{key:t,direction:r}=this._sort;e.sort((i,n)=>{const s=i[t],l=n[t];if(s===l)return 0;if(s==null)return 1;if(l==null)return-1;const u=typeof s=="number"&&typeof l=="number"?s-l:String(s).localeCompare(String(l),"fr");return r==="desc"?-u:u})}return e}_getPaginatedData(){const e=this.getFilteredData();if(!this.pagination||this.pagination<=0)return e;const t=(this._currentPage-1)*this.pagination;return e.slice(t,t+this.pagination)}_getTotalPages(){return!this.pagination||this.pagination<=0?1:Math.ceil(this.getFilteredData().length/this.pagination)}_handleSearch(e){this._searchQuery=e.target.value,this._currentPage=1}_handleFilter(e,t){this._activeFilters={...this._activeFilters,[e]:t.target.value},this._currentPage=1}_handleSort(e){var t;((t=this._sort)==null?void 0:t.key)===e?this._sort={key:e,direction:this._sort.direction==="asc"?"desc":"asc"}:this._sort={key:e,direction:"asc"}}_handlePageChange(e){this._currentPage=e}_exportCsv(){const e=this.parseColumns(),t=this.getFilteredData(),r=e.map(f=>f.label).join(";"),i=t.map(f=>e.map(g=>{const p=String(f[g.key]??"");return p.includes(";")||p.includes('"')?`"${p.replace(/"/g,'""')}"`:p}).join(";")),n=[r,...i].join(`
`),s=new Blob([n],{type:"text/csv;charset=utf-8;"}),l=URL.createObjectURL(s),u=document.createElement("a");u.href=l,u.download="export.csv",u.click(),URL.revokeObjectURL(l)}formatCellValue(e){return e==null?"—":typeof e=="boolean"?e?"Oui":"Non":String(e)}_renderFilters(e,t){return t.length===0?"":h`
      <div class="gouv-datalist__filters">
        ${t.map(r=>{const i=e.find(l=>l.key===r),n=(i==null?void 0:i.label)||r,s=this._getUniqueValues(r);return h`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${r}">${n}</label>
              <select
                class="fr-select"
                id="filter-${r}"
                @change="${l=>this._handleFilter(r,l)}"
              >
                <option value="">Tous</option>
                ${s.map(l=>h`
                  <option value="${l}" ?selected="${this._activeFilters[r]===l}">${l}</option>
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
              ${e.map(r=>{var i;return h`
                <th scope="col">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${()=>this._handleSort(r.key)}"
                    aria-label="Trier par ${r.label}"
                    type="button"
                  >
                    ${r.label}
                    ${((i=this._sort)==null?void 0:i.key)===r.key?h`
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
            `:t.map(r=>h`
              <tr>
                ${e.map(i=>h`
                  <td>${this.formatCellValue(r[i.key])}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}_renderPagination(e){if(this.pagination<=0||e<=1)return"";const t=[];for(let r=Math.max(1,this._currentPage-2);r<=Math.min(e,this._currentPage+2);r++)t.push(r);return h`
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
          ${t.map(r=>h`
            <li>
              <button
                class="fr-pagination__link ${r===this._currentPage?"fr-pagination__link--active":""}"
                @click="${()=>this._handlePageChange(r)}"
                aria-current="${r===this._currentPage?"page":"false"}"
                type="button"
              >${r}</button>
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
    `}render(){const e=this.parseColumns(),t=this._getFilterableColumns(),r=this._getPaginatedData(),i=this._getTotalPages(),n=this.getFilteredData().length;return h`
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
          ${this._renderTable(e,r)}
          ${this._renderPagination(i)}
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
    `}},c(W,"GouvDatalist"),W),o.GouvDatalist.styles=Je``,S([d({type:String})],o.GouvDatalist.prototype,"source",void 0),S([d({type:String})],o.GouvDatalist.prototype,"colonnes",void 0),S([d({type:Boolean})],o.GouvDatalist.prototype,"recherche",void 0),S([d({type:String})],o.GouvDatalist.prototype,"filtres",void 0),S([d({type:String})],o.GouvDatalist.prototype,"tri",void 0),S([d({type:Number})],o.GouvDatalist.prototype,"pagination",void 0),S([d({type:String})],o.GouvDatalist.prototype,"export",void 0),S([y()],o.GouvDatalist.prototype,"_data",void 0),S([y()],o.GouvDatalist.prototype,"_searchQuery",void 0),S([y()],o.GouvDatalist.prototype,"_activeFilters",void 0),S([y()],o.GouvDatalist.prototype,"_sort",void 0),S([y()],o.GouvDatalist.prototype,"_currentPage",void 0),o.GouvDatalist=S([E("gouv-datalist")],o.GouvDatalist);function Ht(a){return!a||typeof a!="string"||["N/A","null","undefined","00",""].includes(a)?!1:!!(a==="2A"||a==="2B"||/^97[1-6]$/.test(a)||/^(0[1-9]|[1-8]\d|9[0-5])$/.test(a))}c(Ht,"isValidDeptCode");var b=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};const Vt={line:"line-chart",bar:"bar-chart",pie:"pie-chart",radar:"radar-chart",scatter:"scatter-chart",gauge:"gauge-chart","bar-line":"bar-line-chart",map:"map-chart","map-reg":"map-chart-reg"};o.GouvDsfrChart=(K=class extends ve($){constructor(){super(...arguments),this.source="",this.type="bar",this.labelField="",this.codeField="",this.valueField="",this.valueField2="",this.name="",this.selectedPalette="categorical",this.unitTooltip="",this.unitTooltipBar="",this.horizontal=!1,this.stacked=!1,this.fill=!1,this.highlightIndex="",this.xMin="",this.xMax="",this.yMin="",this.yMax="",this.gaugeValue=null,this.mapHighlight="",this._data=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),le("gouv-dsfr-chart",this.type)}onSourceData(e){this._data=Array.isArray(e)?e:[]}_processData(){if(!this._data||this._data.length===0)return{x:"[[]]",y:"[[]]"};const e=[],t=[],r=[];for(const i of this._data)e.push(String(m(i,this.labelField)??"N/A")),t.push(Number(m(i,this.valueField))||0),this.valueField2&&r.push(Number(m(i,this.valueField2))||0);return{x:JSON.stringify([e]),y:JSON.stringify([t]),y2:this.valueField2?JSON.stringify([r]):void 0}}_processMapData(){if(!this._data||this._data.length===0)return"{}";const e=this.codeField||this.labelField,t={};for(const r of this._data){let i=String(m(r,e)??"").trim();/^\d+$/.test(i)&&i.length<3&&(i=i.padStart(2,"0"));const n=Number(m(r,this.valueField))||0;(this.type==="map"?Ht(i):i!=="")&&(t[i]=Math.round(n*100)/100)}return JSON.stringify(t)}_getCommonAttributes(){const e={};if(this.selectedPalette&&(e["selected-palette"]=this.selectedPalette),this.unitTooltip&&(e["unit-tooltip"]=this.unitTooltip),this.xMin&&(e["x-min"]=this.xMin),this.xMax&&(e["x-max"]=this.xMax),this.yMin&&(e["y-min"]=this.yMin),this.yMax&&(e["y-max"]=this.yMax),this.name)e.name=this.name;else if(this.valueField){const t=this.valueField2?[this.valueField,this.valueField2]:[this.valueField];e.name=JSON.stringify(t)}return e}_getTypeSpecificAttributes(){const{x:e,y:t,y2:r}=this._processData(),i={},n={};switch(this.type){case"gauge":{const s=this.gaugeValue??(this._data.length>0&&Number(m(this._data[0],this.valueField))||0);i.percent=String(Math.round(s)),i.init="0",i.target="100";break}case"bar-line":i.x=e,i["y-bar"]=t,i["y-line"]=r||t,this.unitTooltipBar&&(i["unit-tooltip-bar"]=this.unitTooltipBar);break;case"map":case"map-reg":{if(i.data=this._processMapData(),this._data.length>0){let s=0,l=0;for(const u of this._data){const f=Number(m(u,this.valueField));isNaN(f)||(s+=f,l++)}if(l>0){const u=Math.round(s/l*100)/100;n.value=String(u)}}n.date=new Date().toISOString().split("T")[0];break}default:i.x=e,i.y=t;break}return this.type==="bar"&&(this.horizontal&&(i.horizontal="true"),this.stacked&&(i.stacked="true"),this.highlightIndex&&(i["highlight-index"]=this.highlightIndex)),this.type==="pie"&&this.fill&&(i.fill="true"),(this.type==="map"||this.type==="map-reg")&&this.mapHighlight&&(i.highlight=this.mapHighlight),{attrs:i,deferred:n}}_getAriaLabel(){const t={bar:"barres",line:"lignes",pie:"camembert",radar:"radar",gauge:"jauge",scatter:"nuage de points","bar-line":"barres et lignes",map:"carte departements","map-reg":"carte regions"}[this.type]||this.type,r=this._data.length;return`Graphique ${t}, ${r} valeurs`}_createChartElement(e,t,r={}){const i=document.createElement(e);for(const[s,l]of Object.entries(t))l!==void 0&&l!==""&&i.setAttribute(s,l);Object.keys(r).length>0&&setTimeout(()=>{for(const[s,l]of Object.entries(r))i.setAttribute(s,l)},500);const n=document.createElement("div");return n.className="gouv-dsfr-chart__wrapper",n.setAttribute("role","img"),n.setAttribute("aria-label",this._getAriaLabel()),n.appendChild(i),n}_renderChart(){const e=Vt[this.type];if(!e)return h`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;const{attrs:t,deferred:r}=this._getTypeSpecificAttributes(),i={...this._getCommonAttributes(),...t},n=this._createChartElement(e,i,r),s=this.querySelector(".gouv-dsfr-chart__wrapper");return s&&s.remove(),h`${n}`}render(){return this._sourceLoading?h`
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
      `:this._renderChart()}},c(K,"GouvDsfrChart"),K),b([d({type:String})],o.GouvDsfrChart.prototype,"source",void 0),b([d({type:String})],o.GouvDsfrChart.prototype,"type",void 0),b([d({type:String,attribute:"label-field"})],o.GouvDsfrChart.prototype,"labelField",void 0),b([d({type:String,attribute:"code-field"})],o.GouvDsfrChart.prototype,"codeField",void 0),b([d({type:String,attribute:"value-field"})],o.GouvDsfrChart.prototype,"valueField",void 0),b([d({type:String,attribute:"value-field-2"})],o.GouvDsfrChart.prototype,"valueField2",void 0),b([d({type:String})],o.GouvDsfrChart.prototype,"name",void 0),b([d({type:String,attribute:"selected-palette"})],o.GouvDsfrChart.prototype,"selectedPalette",void 0),b([d({type:String,attribute:"unit-tooltip"})],o.GouvDsfrChart.prototype,"unitTooltip",void 0),b([d({type:String,attribute:"unit-tooltip-bar"})],o.GouvDsfrChart.prototype,"unitTooltipBar",void 0),b([d({type:Boolean})],o.GouvDsfrChart.prototype,"horizontal",void 0),b([d({type:Boolean})],o.GouvDsfrChart.prototype,"stacked",void 0),b([d({type:Boolean})],o.GouvDsfrChart.prototype,"fill",void 0),b([d({type:String,attribute:"highlight-index"})],o.GouvDsfrChart.prototype,"highlightIndex",void 0),b([d({type:String,attribute:"x-min"})],o.GouvDsfrChart.prototype,"xMin",void 0),b([d({type:String,attribute:"x-max"})],o.GouvDsfrChart.prototype,"xMax",void 0),b([d({type:String,attribute:"y-min"})],o.GouvDsfrChart.prototype,"yMin",void 0),b([d({type:String,attribute:"y-max"})],o.GouvDsfrChart.prototype,"yMax",void 0),b([d({type:Number,attribute:"gauge-value"})],o.GouvDsfrChart.prototype,"gaugeValue",void 0),b([d({type:String,attribute:"map-highlight"})],o.GouvDsfrChart.prototype,"mapHighlight",void 0),b([y()],o.GouvDsfrChart.prototype,"_data",void 0),o.GouvDsfrChart=b([E("gouv-dsfr-chart")],o.GouvDsfrChart);var be=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};o.AppHeader=(J=class extends ${constructor(){super(...arguments),this.currentPage="",this.basePath="",this._favCount=0}createRenderRoot(){return this}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}connectedCallback(){super.connectedCallback();try{const e=JSON.parse(localStorage.getItem("gouv-widgets-favorites")||"[]");this._favCount=Array.isArray(e)?e.length:0}catch{}if(!document.getElementById("app-header-active-style")){const e=document.createElement("style");e.id="app-header-active-style",e.textContent='.fr-nav__link[aria-current="page"]{font-weight:700;border-bottom:2px solid var(--border-action-high-blue-france);color:var(--text-action-high-blue-france)}',document.head.appendChild(e)}}_getNavItems(){return[{id:"accueil",label:"Accueil",href:"index.html"},{id:"composants",label:"Composants",href:"demo/index.html"},{id:"builder",label:"Builder",href:"apps/builder/index.html"},{id:"builder-ia",label:"Builder IA",href:"apps/builder-ia/index.html"},{id:"playground",label:"Playground",href:"apps/playground/index.html"},{id:"dashboard",label:"Dashboard",href:"apps/dashboard/index.html"},{id:"sources",label:"Sources",href:"apps/sources/index.html"},{id:"monitoring",label:"Monitoring",href:"apps/monitoring/index.html"}]}render(){const e=this._getNavItems();return h`
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
                        Favoris${this._favCount>0?h` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>`:v}
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
    `}},c(J,"AppHeader"),J),be([d({type:String,attribute:"current-page"})],o.AppHeader.prototype,"currentPage",void 0),be([d({type:String,attribute:"base-path"})],o.AppHeader.prototype,"basePath",void 0),be([y()],o.AppHeader.prototype,"_favCount",void 0),o.AppHeader=be([E("app-header")],o.AppHeader);var bt=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};o.AppFooter=(X=class extends ${constructor(){super(...arguments),this.basePath=""}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}createRenderRoot(){return this}render(){return h`
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
    `}},c(X,"AppFooter"),X),bt([d({type:String,attribute:"base-path"})],o.AppFooter.prototype,"basePath",void 0),o.AppFooter=bt([E("app-footer")],o.AppFooter);var I=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};o.AppLayoutBuilder=(Z=class extends ${constructor(){super(...arguments),this.leftRatio=40,this.minLeftWidth=280,this.minRightWidth=300,this._isResizing=!1,this._currentLeftRatio=40,this._leftContent=[],this._rightContent=[],this._contentMoved=!1,this._boundMouseMove=null,this._boundMouseUp=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._currentLeftRatio=this.leftRatio,this._setupResizer(),this._saveSlotContent()}_saveSlotContent(){this._leftContent=Array.from(this.querySelectorAll('[slot="left"]')),this._rightContent=Array.from(this.querySelectorAll('[slot="right"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".builder-layout-left"),t=this.querySelector(".builder-layout-right");e&&t&&(this._leftContent.forEach(r=>e.appendChild(r)),this._rightContent.forEach(r=>t.appendChild(r)),this._contentMoved=!0)}disconnectedCallback(){super.disconnectedCallback(),this._cleanupResizer()}_setupResizer(){this._boundMouseMove=this._handleMouseMove.bind(this),this._boundMouseUp=this._handleMouseUp.bind(this)}_cleanupResizer(){this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp)}_handleMouseDown(e){e.preventDefault(),this._isResizing=!0,document.body.style.cursor="col-resize",document.body.style.userSelect="none",this._boundMouseMove&&document.addEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.addEventListener("mouseup",this._boundMouseUp)}_handleMouseMove(e){if(!this._isResizing)return;const t=this.querySelector(".builder-layout-container");if(!t)return;const r=t.getBoundingClientRect(),i=r.width;let n=e.clientX-r.left;n=Math.max(this.minLeftWidth,Math.min(n,i-this.minRightWidth)),this._currentLeftRatio=n/i*100,this.requestUpdate()}_handleMouseUp(){this._isResizing&&(this._isResizing=!1,document.body.style.cursor="",document.body.style.userSelect="",this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp))}render(){return h`
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
    `}},c(Z,"AppLayoutBuilder"),Z),I([d({type:Number,attribute:"left-ratio"})],o.AppLayoutBuilder.prototype,"leftRatio",void 0),I([d({type:Number,attribute:"min-left-width"})],o.AppLayoutBuilder.prototype,"minLeftWidth",void 0),I([d({type:Number,attribute:"min-right-width"})],o.AppLayoutBuilder.prototype,"minRightWidth",void 0),I([y()],o.AppLayoutBuilder.prototype,"_isResizing",void 0),I([y()],o.AppLayoutBuilder.prototype,"_currentLeftRatio",void 0),o.AppLayoutBuilder=I([E("app-layout-builder")],o.AppLayoutBuilder);var ce=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};o.AppLayoutDemo=(Y=class extends ${constructor(){super(...arguments),this.title="",this.icon="",this.activePath="",this.basePath="",this._contentElements=[],this._contentMoved=!1}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._contentElements=Array.from(this.querySelectorAll('[slot="content"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".demo-content-slot");e&&(this._contentElements.forEach(t=>e.appendChild(t)),this._contentMoved=!0)}_getMenuStructure(){return[{id:"overview",label:"Vue d'ensemble",href:"index.html"},{id:"components",label:"Nos composants",href:"#",children:[{id:"components/gouv-source",label:"gouv-source",href:"components/gouv-source.html"},{id:"components/gouv-query",label:"gouv-query",href:"components/gouv-query.html"},{id:"components/gouv-kpi",label:"gouv-kpi",href:"components/gouv-kpi.html"},{id:"components/gouv-datalist",label:"gouv-datalist",href:"components/gouv-datalist.html"},{id:"components/gouv-dsfr-chart",label:"gouv-dsfr-chart",href:"components/gouv-dsfr-chart.html"}]},{id:"charts",label:"Graphiques DSFR",href:"#",children:[{id:"charts/line-chart",label:"line-chart",href:"charts/line-chart.html"},{id:"charts/bar-chart",label:"bar-chart",href:"charts/bar-chart.html"},{id:"charts/pie-chart",label:"pie-chart",href:"charts/pie-chart.html"},{id:"charts/radar-chart",label:"radar-chart",href:"charts/radar-chart.html"},{id:"charts/gauge-chart",label:"gauge-chart",href:"charts/gauge-chart.html"},{id:"charts/map-chart",label:"map-chart",href:"charts/map-chart.html"},{id:"charts/scatter-chart",label:"scatter-chart",href:"charts/scatter-chart.html"}]}]}_isActive(e){return this.activePath===e}_isParentActive(e){return e.children?e.children.some(t=>this._isActive(t.id)):!1}_renderMenuItem(e){const t=this._isActive(e.id),r=this._isParentActive(e);if(e.children){const i=`fr-sidemenu-${e.id}`,n=r;return h`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${n}"
                  aria-controls="${i}">
            ${e.label}
          </button>
          <div class="fr-collapse ${n?"fr-collapse--expanded":""}" id="${i}">
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
      `}_renderBreadcrumb(){if(!this.activePath||this.activePath==="overview")return"";const e=this.activePath.split("/"),t=[{label:"Composants",href:`${this._base}index.html`}];if(e.length>1){const r=e[0]==="components"?"Nos composants":"Graphiques DSFR";t.push({label:r,href:"#"})}return t.push({label:this.title,href:""}),h`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((r,i)=>h`
              <li>
                ${i===t.length-1?h`<a class="fr-breadcrumb__link" aria-current="page">${r.label}</a>`:h`<a class="fr-breadcrumb__link" href="${r.href}">${r.label}</a>`}
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
    `}},c(Y,"AppLayoutDemo"),Y),ce([d({type:String})],o.AppLayoutDemo.prototype,"title",void 0),ce([d({type:String})],o.AppLayoutDemo.prototype,"icon",void 0),ce([d({type:String,attribute:"active-path"})],o.AppLayoutDemo.prototype,"activePath",void 0),ce([d({type:String,attribute:"base-path"})],o.AppLayoutDemo.prototype,"basePath",void 0),o.AppLayoutDemo=ce([E("app-layout-demo")],o.AppLayoutDemo);var G=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(i<3?s(n):i>3?s(e,t,n):s(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};let x=(ee=class extends ${constructor(){super(...arguments),this.showDataTab=!1,this.showSaveButton=!1,this.showPlaygroundButton=!1,this.tabLabels="Aperçu,Code,Données",this.activeTab="preview",this._activeTab="preview",this._previewContent=[],this._codeContent=[],this._dataContent=[],this._contentMoved=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._activeTab=this.activeTab,this._saveSlotContent()}_saveSlotContent(){this._previewContent=Array.from(this.querySelectorAll('[slot="preview"]')),this._codeContent=Array.from(this.querySelectorAll('[slot="code"]')),this._dataContent=Array.from(this.querySelectorAll('[slot="data"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector("#tab-preview"),t=this.querySelector("#tab-code"),r=this.querySelector("#tab-data");e&&this._previewContent.forEach(i=>e.appendChild(i)),t&&this._codeContent.forEach(i=>t.appendChild(i)),r&&this._dataContent.forEach(i=>r.appendChild(i)),this._contentMoved=!0}setActiveTab(e){this._activeTab=e,this.requestUpdate()}getActiveTab(){return this._activeTab}_handleTabClick(e){this._activeTab=e,this.dispatchEvent(new CustomEvent("tab-change",{detail:{tab:e},bubbles:!0,composed:!0})),this.requestUpdate()}_getTabLabels(){return this.tabLabels.split(",").map(e=>e.trim())}_handleSaveClick(){this.dispatchEvent(new CustomEvent("save-favorite",{bubbles:!0,composed:!0}))}_handlePlaygroundClick(){this.dispatchEvent(new CustomEvent("open-playground",{bubbles:!0,composed:!0}))}render(){const e=this._getTabLabels(),[t,r,i]=e;return h`
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
            ${r||"Code"}
          </button>
          ${this.showDataTab?h`
            <button
              class="preview-panel-tab ${this._activeTab==="data"?"active":""}"
              data-tab="data"
              @click="${()=>this._handleTabClick("data")}">
              ${i||"Données"}
            </button>
          `:v}
          ${this.showPlaygroundButton?h`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          `:v}
          ${this.showSaveButton?h`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          `:v}
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
    `}},c(ee,"AppPreviewPanel"),ee);G([d({type:Boolean,attribute:"show-data-tab"})],x.prototype,"showDataTab",void 0),G([d({type:Boolean,attribute:"show-save-button"})],x.prototype,"showSaveButton",void 0),G([d({type:Boolean,attribute:"show-playground-button"})],x.prototype,"showPlaygroundButton",void 0),G([d({type:String,attribute:"tab-labels"})],x.prototype,"tabLabels",void 0),G([d({type:String,attribute:"active-tab"})],x.prototype,"activeTab",void 0),G([y()],x.prototype,"_activeTab",void 0),x=G([E("app-preview-panel")],x);function mt(a,e,t){return a.map(r=>({label:String(m(r,e)??"N/A"),value:Number(m(r,t))||0}))}c(mt,"extractLabelValues");function _t(a,e){if(e==="none")return a;const t=new Map;for(const i of a){const n=t.get(i.label)||[];n.push(i.value),t.set(i.label,n)}const r=[];for(const[i,n]of t)r.push({label:i,value:Qt(n,e)});return r}c(_t,"aggregateByLabel");function Qt(a,e){switch(e){case"sum":return a.reduce((t,r)=>t+r,0);case"avg":return a.reduce((t,r)=>t+r,0)/a.length;case"count":return a.length;case"min":return Math.min(...a);case"max":return Math.max(...a);default:return a[0]||0}}c(Qt,"computeGroupValue");function yt(a,e){return e==="none"?a:[...a].sort((t,r)=>e==="desc"?r.value-t.value:t.value-r.value)}c(yt,"sortByValue");function Wt(a,e,t,r="none",i="none",n=0){if(!a||a.length===0)return{labels:[],values:[]};let s=mt(a,e,t);return s=_t(s,r),s=yt(s,i),n>0&&(s=s.slice(0,n)),{labels:s.map(l=>l.label),values:s.map(l=>Math.round(l.value*100)/100)}}c(Wt,"processChartData"),o.DATA_EVENTS=P,o.SourceSubscriberMixin=ve,o.aggregateByLabel=_t,o.computeAggregation=Be,o.dispatchDataError=pe,o.dispatchDataLoaded=ue,o.dispatchDataLoading=fe,o.extractLabelValues=mt,o.formatCurrency=ft,o.formatDate=qt,o.formatNumber=Ue,o.formatPercentage=pt,o.formatValue=Fe,o.getByPath=m,o.getByPathOrDefault=Ut,o.getDataCache=Oe,o.hasPath=Ft,o.parseExpression=gt,o.processChartData=Wt,o.sortByValue=yt,o.subscribeToSource=Le,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})}));
