(function(s,D){typeof exports=="object"&&typeof module<"u"?D(exports):typeof define=="function"&&define.amd?define(["exports"],D):(s=typeof globalThis<"u"?globalThis:s||self,D(s.GouvWidgets={}))})(this,function(s){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ve;const D=globalThis,ee=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),pe=new WeakMap;let fe=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ee&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=pe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&pe.set(t,e))}return e}toString(){return this.cssText}};const We=a=>new fe(typeof a=="string"?a:a+"",void 0,te),ve=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((r,i,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[n+1],a[0]);return new fe(t,a,te)},Ke=(a,e)=>{if(ee)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),i=D.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,a.appendChild(r)}},be=ee?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return We(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Je,defineProperty:Qe,getOwnPropertyDescriptor:Ze,getOwnPropertyNames:Xe,getOwnPropertySymbols:Ye,getPrototypeOf:et}=Object,P=globalThis,ge=P.trustedTypes,tt=ge?ge.emptyScript:"",re=P.reactiveElementPolyfillSupport,z=(a,e)=>a,Q={toAttribute(a,e){switch(e){case Boolean:a=a?tt:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},ie=(a,e)=>!Je(a,e),me={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),P.litPropertyMetadata??(P.litPropertyMetadata=new WeakMap);let N=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=me){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&Qe(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){const{get:i,set:n}=Ze(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??me}static _$Ei(){if(this.hasOwnProperty(z("elementProperties")))return;const e=et(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(z("properties"))){const t=this.properties,r=[...Xe(t),...Ye(t)];for(const i of r)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const i of r)t.unshift(be(i))}else e!==void 0&&t.push(be(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ke(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var n;const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){const o=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:Q).toAttribute(t,r.type);this._$Em=e,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){var n,o;const r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=r.getPropertyOptions(i),d=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:Q;this._$Em=i;const p=d.fromAttribute(t,l.type);this[i]=p??((o=this._$Ej)==null?void 0:o.get(i))??p,this._$Em=null}}requestUpdate(e,t,r,i=!1,n){var o;if(e!==void 0){const l=this.constructor;if(i===!1&&(n=this[e]),r??(r=l.getPropertyOptions(e)),!((r.hasChanged??ie)(n,t)||r.useDefault&&r.reflect&&n===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(l._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:n},o){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:l}=o,d=this[n];l!==!0||this._$AL.has(n)||d===void 0||this.C(n,void 0,o,d)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[z("elementProperties")]=new Map,N[z("finalized")]=new Map,re==null||re({ReactiveElement:N}),(P.reactiveElementVersions??(P.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=globalThis,_e=a=>a,Z=I.trustedTypes,ye=Z?Z.createPolicy("lit-html",{createHTML:a=>a}):void 0,$e="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Ce="?"+x,rt=`<${Ce}>`,M=document,B=()=>M.createComment(""),H=a=>a===null||typeof a!="object"&&typeof a!="function",ne=Array.isArray,it=a=>ne(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",ae=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,we=/-->/g,Ae=/>/g,O=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Se=/'/g,Ee=/"/g,De=/^(?:script|style|textarea|title)$/i,nt=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),u=nt(1),F=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),Pe=new WeakMap,L=M.createTreeWalker(M,129);function xe(a,e){if(!ne(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ye!==void 0?ye.createHTML(e):e}const at=(a,e)=>{const t=a.length-1,r=[];let i,n=e===2?"<svg>":e===3?"<math>":"",o=q;for(let l=0;l<t;l++){const d=a[l];let p,b,h=-1,E=0;for(;E<d.length&&(o.lastIndex=E,b=o.exec(d),b!==null);)E=o.lastIndex,o===q?b[1]==="!--"?o=we:b[1]!==void 0?o=Ae:b[2]!==void 0?(De.test(b[2])&&(i=RegExp("</"+b[2],"g")),o=O):b[3]!==void 0&&(o=O):o===O?b[0]===">"?(o=i??q,h=-1):b[1]===void 0?h=-2:(h=o.lastIndex-b[2].length,p=b[1],o=b[3]===void 0?O:b[3]==='"'?Ee:Se):o===Ee||o===Se?o=O:o===we||o===Ae?o=q:(o=O,i=void 0);const k=o===O&&a[l+1].startsWith("/>")?" ":"";n+=o===q?d+rt:h>=0?(r.push(p),d.slice(0,h)+$e+d.slice(h)+x+k):d+x+(h===-2?l:k)}return[xe(a,n+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class V{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let n=0,o=0;const l=e.length-1,d=this.parts,[p,b]=at(e,t);if(this.el=V.createElement(p,r),L.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=L.nextNode())!==null&&d.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith($e)){const E=b[o++],k=i.getAttribute(h).split(x),Y=/([.?@])?(.*)/.exec(E);d.push({type:1,index:n,name:Y[2],strings:k,ctor:Y[1]==="."?st:Y[1]==="?"?lt:Y[1]==="@"?ct:X}),i.removeAttribute(h)}else h.startsWith(x)&&(d.push({type:6,index:n}),i.removeAttribute(h));if(De.test(i.tagName)){const h=i.textContent.split(x),E=h.length-1;if(E>0){i.textContent=Z?Z.emptyScript:"";for(let k=0;k<E;k++)i.append(h[k],B()),L.nextNode(),d.push({type:2,index:++n});i.append(h[E],B())}}}else if(i.nodeType===8)if(i.data===Ce)d.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(x,h+1))!==-1;)d.push({type:7,index:n}),h+=x.length-1}n++}}static createElement(e,t){const r=M.createElement("template");return r.innerHTML=e,r}}function U(a,e,t=a,r){var o,l;if(e===F)return e;let i=r!==void 0?(o=t._$Co)==null?void 0:o[r]:t._$Cl;const n=H(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(a),i._$AT(a,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=i:t._$Cl=i),i!==void 0&&(e=U(a,i._$AS(a,e.values),i,r)),e}class ot{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,i=((e==null?void 0:e.creationScope)??M).importNode(t,!0);L.currentNode=i;let n=L.nextNode(),o=0,l=0,d=r[0];for(;d!==void 0;){if(o===d.index){let p;d.type===2?p=new W(n,n.nextSibling,this,e):d.type===1?p=new d.ctor(n,d.name,d.strings,this,e):d.type===6&&(p=new ut(n,this,e)),this._$AV.push(p),d=r[++l]}o!==(d==null?void 0:d.index)&&(n=L.nextNode(),o++)}return L.currentNode=M,i}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class W{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),H(e)?e===f||e==null||e===""?(this._$AH!==f&&this._$AR(),this._$AH=f):e!==this._$AH&&e!==F&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):it(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==f&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=V.createElement(xe(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const o=new ot(i,this),l=o.u(this.options);o.p(t),this.T(l),this._$AH=o}}_$AC(e){let t=Pe.get(e.strings);return t===void 0&&Pe.set(e.strings,t=new V(e)),t}k(e){ne(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const n of e)i===t.length?t.push(r=new W(this.O(B()),this.O(B()),this,this.options)):r=t[i],r._$AI(n),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e!==this._$AB;){const i=_e(e).nextSibling;_e(e).remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,n){this.type=1,this._$AH=f,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=f}_$AI(e,t=this,r,i){const n=this.strings;let o=!1;if(n===void 0)e=U(this,e,t,0),o=!H(e)||e!==this._$AH&&e!==F,o&&(this._$AH=e);else{const l=e;let d,p;for(e=n[0],d=0;d<n.length-1;d++)p=U(this,l[r+d],t,d),p===F&&(p=this._$AH[d]),o||(o=!H(p)||p!==this._$AH[d]),p===f?e=f:e!==f&&(e+=(p??"")+n[d+1]),this._$AH[d]=p}o&&!i&&this.j(e)}j(e){e===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class st extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===f?void 0:e}}class lt extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==f)}}class ct extends X{constructor(e,t,r,i,n){super(e,t,r,i,n),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??f)===F)return;const r=this._$AH,i=e===f&&r!==f||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==f&&(r===f||i);i&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class ut{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}}const oe=I.litHtmlPolyfillSupport;oe==null||oe(V,W),(I.litHtmlVersions??(I.litHtmlVersions=[])).push("3.3.2");const dt=(a,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let i=r._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;r._$litPart$=i=new W(e.insertBefore(B(),n),n,void 0,t??{})}return i._$AI(a),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis;class g extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=dt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return F}}g._$litElement$=!0,g.finalized=!0,(Ve=T.litElementHydrateSupport)==null||Ve.call(T,{LitElement:g});const se=T.litElementPolyfillSupport;se==null||se({LitElement:g}),(T.litElementVersions??(T.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=a=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:ie},pt=(a=ht,e,t)=>{const{kind:r,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),r==="setter"&&((a=Object.create(a)).wrapped=!0),n.set(t.name,a),r==="accessor"){const{name:o}=t;return{set(l){const d=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,d,a,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,a,l),l}}}if(r==="setter"){const{name:o}=t;return function(l){const d=this[o];e.call(this,l),this.requestUpdate(o,d,a,!0,l)}}throw Error("Unsupported decorator location: "+r)};function c(a){return(e,t)=>typeof t=="object"?pt(a,e,t):((r,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,r),o?Object.getOwnPropertyDescriptor(i,n):void 0})(a,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(a){return c({...a,state:!0,attribute:!1})}function w(a,e){if(!e||e.trim()==="")return a;const r=e.replace(/\[(\d+)\]/g,".$1").split(".");let i=a;for(const n of r){if(i==null||typeof i!="object")return;i=i[n]}return i}function ft(a,e){return w(a,e)!==void 0}function vt(a,e,t){const r=w(a,e);return r!==void 0?r:t}const A={LOADED:"gouv-data-loaded",ERROR:"gouv-data-error",LOADING:"gouv-data-loading"},le=new Map;function bt(a,e){le.set(a,e)}function Re(a){return le.get(a)}function gt(a){le.delete(a)}function ke(a,e){bt(a,e);const t=new CustomEvent(A.LOADED,{bubbles:!0,composed:!0,detail:{sourceId:a,data:e}});document.dispatchEvent(t)}function Me(a,e){const t=new CustomEvent(A.ERROR,{bubbles:!0,composed:!0,detail:{sourceId:a,error:e}});document.dispatchEvent(t)}function Oe(a){const e=new CustomEvent(A.LOADING,{bubbles:!0,composed:!0,detail:{sourceId:a}});document.dispatchEvent(e)}function Le(a,e){const t=n=>{const o=n;o.detail.sourceId===a&&e.onLoaded&&e.onLoaded(o.detail.data)},r=n=>{const o=n;o.detail.sourceId===a&&e.onError&&e.onError(o.detail.error)},i=n=>{n.detail.sourceId===a&&e.onLoading&&e.onLoading()};return document.addEventListener(A.LOADED,t),document.addEventListener(A.ERROR,r),document.addEventListener(A.LOADING,i),()=>{document.removeEventListener(A.LOADED,t),document.removeEventListener(A.ERROR,r),document.removeEventListener(A.LOADING,i)}}var S=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(e,t,n):o(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};s.GouvSource=class extends g{constructor(){super(...arguments),this.url="",this.method="GET",this.headers="",this.params="",this.refresh=0,this.transform="",this._loading=!1,this._error=null,this._data=null,this._refreshInterval=null,this._abortController=null}createRenderRoot(){return this}render(){return u``}connectedCallback(){super.connectedCallback(),this._fetchData(),this._setupRefresh()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&gt(this.id)}updated(e){(e.has("url")||e.has("params")||e.has("transform"))&&this._fetchData(),e.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._fetchData()},this.refresh*1e3))}async _fetchData(){if(this.url){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,Oe(this.id);try{const e=this._buildUrl(),t=this._buildFetchOptions(),r=await fetch(e,{...t,signal:this._abortController.signal});if(!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);const i=await r.json();this._data=this.transform?w(i,this.transform):i,ke(this.id,this._data)}catch(e){if(e.name==="AbortError")return;this._error=e,Me(this.id,this._error),console.error(`gouv-source[${this.id}]: Erreur de chargement`,e)}finally{this._loading=!1}}}_buildUrl(){const e=new URL(this.url,window.location.origin);if(this.params&&this.method==="GET")try{const t=JSON.parse(this.params);Object.entries(t).forEach(([r,i])=>{e.searchParams.set(r,String(i))})}catch(t){console.warn("gouv-source: params invalides (JSON attendu)",t)}return e.toString()}_buildFetchOptions(){const e={method:this.method};if(this.headers)try{e.headers=JSON.parse(this.headers)}catch(t){console.warn("gouv-source: headers invalides (JSON attendu)",t)}return this.method==="POST"&&this.params&&(e.headers={"Content-Type":"application/json",...e.headers||{}},e.body=this.params),e}reload(){this._fetchData()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},S([c({type:String})],s.GouvSource.prototype,"url",void 0),S([c({type:String})],s.GouvSource.prototype,"method",void 0),S([c({type:String})],s.GouvSource.prototype,"headers",void 0),S([c({type:String})],s.GouvSource.prototype,"params",void 0),S([c({type:Number})],s.GouvSource.prototype,"refresh",void 0),S([c({type:String})],s.GouvSource.prototype,"transform",void 0),S([_()],s.GouvSource.prototype,"_loading",void 0),S([_()],s.GouvSource.prototype,"_error",void 0),S([_()],s.GouvSource.prototype,"_data",void 0),s.GouvSource=S([C("gouv-source")],s.GouvSource);function K(a){class e extends a{constructor(){super(...arguments),this._sourceLoading=!1,this._sourceData=null,this._sourceError=null,this._unsubscribeSource=null}onSourceData(r){}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSubscription()}updated(r){super.updated(r),r.has("source")&&this._subscribeToSource()}_subscribeToSource(){this._cleanupSubscription();const r=this.source;if(!r)return;const i=Re(r);i!==void 0&&(this._sourceData=i,this.onSourceData(i)),this._unsubscribeSource=Le(r,{onLoaded:n=>{this._sourceData=n,this._sourceLoading=!1,this._sourceError=null,this.onSourceData(n),this.requestUpdate()},onLoading:()=>{this._sourceLoading=!0,this.requestUpdate()},onError:n=>{this._sourceError=n,this._sourceLoading=!1,this.requestUpdate()}})}_cleanupSubscription(){this._unsubscribeSource&&(this._unsubscribeSource(),this._unsubscribeSource=null)}}return e}function ce(a,e="nombre"){if(a==null||a==="")return"—";const t=typeof a=="string"?parseFloat(a):a;if(isNaN(t))return"—";switch(e){case"nombre":return ue(t);case"pourcentage":return Te(t);case"euro":return Ge(t);case"decimal":return mt(t);default:return ue(t)}}function ue(a){return new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(Math.round(a))}function Te(a){return new Intl.NumberFormat("fr-FR",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:1}).format(a/100)}function Ge(a){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(a)}function mt(a){return new Intl.NumberFormat("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:2}).format(a)}function _t(a){const e=typeof a=="string"?new Date(a):a;return isNaN(e.getTime())?"—":new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(e)}function yt(a,e,t){return e!==void 0&&a>=e?"vert":t!==void 0&&a>=t?"orange":e!==void 0||t!==void 0?"rouge":"bleu"}function Ne(a){const e=a.split(":");if(e.length===1)return{type:"direct",field:e[0]};const t=e[0],r=e[1];if(e.length===3){let i=e[2];return i==="true"?i=!0:i==="false"?i=!1:isNaN(Number(i))||(i=Number(i)),{type:t,field:r,filterField:r,filterValue:i}}return{type:t,field:r}}function de(a,e){const t=Ne(e);if(t.type==="direct"&&!Array.isArray(a))return a[t.field];if(!Array.isArray(a))return null;const r=a;switch(t.type){case"direct":case"first":return r.length>0?r[0][t.field]:null;case"last":return r.length>0?r[r.length-1][t.field]:null;case"count":return t.filterValue!==void 0?r.filter(n=>n[t.field]===t.filterValue).length:r.length;case"sum":return r.reduce((n,o)=>{const l=Number(o[t.field]);return n+(isNaN(l)?0:l)},0);case"avg":return r.length===0?null:r.reduce((n,o)=>{const l=Number(o[t.field]);return n+(isNaN(l)?0:l)},0)/r.length;case"min":return r.length===0?null:Math.min(...r.map(n=>Number(n[t.field])).filter(n=>!isNaN(n)));case"max":return r.length===0?null:Math.max(...r.map(n=>Number(n[t.field])).filter(n=>!isNaN(n)));default:return null}}var $=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(e,t,n):o(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};const Fe={vert:"gouv-kpi--success",orange:"gouv-kpi--warning",rouge:"gouv-kpi--error",bleu:"gouv-kpi--info"};s.GouvKpi=class extends K(g){constructor(){super(...arguments),this.source="",this.valeur="",this.label="",this.description="",this.icone="",this.format="nombre",this.tendance="",this.couleur=""}createRenderRoot(){return this}_computeValue(){return!this._sourceData||!this.valeur?null:de(this._sourceData,this.valeur)}_getColor(){if(this.couleur)return this.couleur;const e=this._computeValue();return typeof e!="number"?"bleu":yt(e,this.seuilVert,this.seuilOrange)}_getTendanceInfo(){if(!this.tendance||!this._sourceData)return null;const e=de(this._sourceData,this.tendance);return typeof e!="number"?null:{value:e,direction:e>0?"up":e<0?"down":"stable"}}_getAriaLabel(){if(this.description)return this.description;const e=this._computeValue(),t=ce(e,this.format);return`${this.label}: ${t}`}render(){const e=this._computeValue(),t=ce(e,this.format),r=Fe[this._getColor()]||Fe.bleu,i=this._getTendanceInfo();return u`
      <div
        class="gouv-kpi ${r}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._sourceLoading?u`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        `:this._sourceError?u`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        `:u`
          <div class="gouv-kpi__content">
            ${this.icone?u`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            `:""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${t}</span>
              ${i?u`
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
    `}},s.GouvKpi.styles=ve``,$([c({type:String})],s.GouvKpi.prototype,"source",void 0),$([c({type:String})],s.GouvKpi.prototype,"valeur",void 0),$([c({type:String})],s.GouvKpi.prototype,"label",void 0),$([c({type:String})],s.GouvKpi.prototype,"description",void 0),$([c({type:String})],s.GouvKpi.prototype,"icone",void 0),$([c({type:String})],s.GouvKpi.prototype,"format",void 0),$([c({type:String})],s.GouvKpi.prototype,"tendance",void 0),$([c({type:Number,attribute:"seuil-vert"})],s.GouvKpi.prototype,"seuilVert",void 0),$([c({type:Number,attribute:"seuil-orange"})],s.GouvKpi.prototype,"seuilOrange",void 0),$([c({type:String})],s.GouvKpi.prototype,"couleur",void 0),s.GouvKpi=$([C("gouv-kpi")],s.GouvKpi);var y=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(e,t,n):o(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};s.GouvDatalist=class extends K(g){constructor(){super(...arguments),this.source="",this.colonnes="",this.recherche=!1,this.filtres="",this.tri="",this.pagination=0,this.export="",this._data=[],this._searchQuery="",this._activeFilters={},this._sort=null,this._currentPage=1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._initSort()}updated(e){super.updated(e),e.has("tri")&&this._initSort()}onSourceData(e){this._data=Array.isArray(e)?e:[],this._currentPage=1}parseColumns(){return this.colonnes?this.colonnes.split(",").map(e=>{const[t,r]=e.trim().split(":");return{key:t.trim(),label:(r==null?void 0:r.trim())||t.trim()}}):[]}_getFilterableColumns(){return this.filtres?this.filtres.split(",").map(e=>e.trim()):[]}_initSort(){if(this.tri){const[e,t]=this.tri.split(":");this._sort={key:e,direction:t||"asc"}}}_getUniqueValues(e){const t=new Set;return this._data.forEach(r=>{const i=r[e];i!=null&&t.add(String(i))}),Array.from(t).sort()}getFilteredData(){let e=[...this._data];if(this._searchQuery){const t=this._searchQuery.toLowerCase();e=e.filter(r=>Object.values(r).some(i=>String(i).toLowerCase().includes(t)))}if(Object.entries(this._activeFilters).forEach(([t,r])=>{r&&(e=e.filter(i=>String(i[t])===r))}),this._sort){const{key:t,direction:r}=this._sort;e.sort((i,n)=>{const o=i[t],l=n[t];if(o===l)return 0;if(o==null)return 1;if(l==null)return-1;const d=typeof o=="number"&&typeof l=="number"?o-l:String(o).localeCompare(String(l),"fr");return r==="desc"?-d:d})}return e}_getPaginatedData(){const e=this.getFilteredData();if(!this.pagination||this.pagination<=0)return e;const t=(this._currentPage-1)*this.pagination;return e.slice(t,t+this.pagination)}_getTotalPages(){return!this.pagination||this.pagination<=0?1:Math.ceil(this.getFilteredData().length/this.pagination)}_handleSearch(e){this._searchQuery=e.target.value,this._currentPage=1}_handleFilter(e,t){this._activeFilters={...this._activeFilters,[e]:t.target.value},this._currentPage=1}_handleSort(e){var t;((t=this._sort)==null?void 0:t.key)===e?this._sort={key:e,direction:this._sort.direction==="asc"?"desc":"asc"}:this._sort={key:e,direction:"asc"}}_handlePageChange(e){this._currentPage=e}_exportCsv(){const e=this.parseColumns(),t=this.getFilteredData(),r=e.map(p=>p.label).join(";"),i=t.map(p=>e.map(b=>{const h=String(p[b.key]??"");return h.includes(";")||h.includes('"')?`"${h.replace(/"/g,'""')}"`:h}).join(";")),n=[r,...i].join(`
`),o=new Blob([n],{type:"text/csv;charset=utf-8;"}),l=URL.createObjectURL(o),d=document.createElement("a");d.href=l,d.download="export.csv",d.click(),URL.revokeObjectURL(l)}formatCellValue(e){return e==null?"—":typeof e=="boolean"?e?"Oui":"Non":String(e)}_renderFilters(e,t){return t.length===0?"":u`
      <div class="gouv-datalist__filters">
        ${t.map(r=>{const i=e.find(l=>l.key===r),n=(i==null?void 0:i.label)||r,o=this._getUniqueValues(r);return u`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${r}">${n}</label>
              <select
                class="fr-select"
                id="filter-${r}"
                @change="${l=>this._handleFilter(r,l)}"
              >
                <option value="">Tous</option>
                ${o.map(l=>u`
                  <option value="${l}" ?selected="${this._activeFilters[r]===l}">${l}</option>
                `)}
              </select>
            </div>
          `})}
      </div>
    `}_renderToolbar(){var e,t;return!this.recherche&&!((e=this.export)!=null&&e.includes("csv"))?"":u`
      <div class="gouv-datalist__toolbar">
        ${this.recherche?u`
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
        `:u`<div></div>`}

        ${(t=this.export)!=null&&t.includes("csv")?u`
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
    `}_renderTable(e,t){return u`
      <div class="fr-table fr-table--bordered">
        <table>
          <caption class="fr-sr-only">Liste des données</caption>
          <thead>
            <tr>
              ${e.map(r=>{var i;return u`
                <th scope="col">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${()=>this._handleSort(r.key)}"
                    aria-label="Trier par ${r.label}"
                    type="button"
                  >
                    ${r.label}
                    ${((i=this._sort)==null?void 0:i.key)===r.key?u`
                      <span aria-hidden="true">${this._sort.direction==="asc"?"↑":"↓"}</span>
                    `:""}
                  </button>
                </th>
              `})}
            </tr>
          </thead>
          <tbody>
            ${t.length===0?u`
              <tr>
                <td colspan="${e.length}" class="gouv-datalist__empty">
                  Aucune donnée à afficher
                </td>
              </tr>
            `:t.map(r=>u`
              <tr>
                ${e.map(i=>u`
                  <td>${this.formatCellValue(r[i.key])}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}_renderPagination(e){if(this.pagination<=0||e<=1)return"";const t=[];for(let r=Math.max(1,this._currentPage-2);r<=Math.min(e,this._currentPage+2);r++)t.push(r);return u`
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
          ${t.map(r=>u`
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
    `}render(){const e=this.parseColumns(),t=this._getFilterableColumns(),r=this._getPaginatedData(),i=this._getTotalPages(),n=this.getFilteredData().length;return u`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        ${this._renderFilters(e,t)}
        ${this._renderToolbar()}

        ${this._sourceLoading?u`
          <div class="gouv-datalist__loading" aria-live="polite">Chargement des données...</div>
        `:this._sourceError?u`
          <div class="gouv-datalist__error" aria-live="assertive">Erreur: ${this._sourceError.message}</div>
        `:u`
          <p class="fr-text--sm" aria-live="polite">
            ${n} résultat${n>1?"s":""}
            ${this._searchQuery||Object.values(this._activeFilters).some(o=>o)?" (filtré)":""}
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
        .gouv-datalist__error { padding: 2rem; text-align: center; }
        .gouv-datalist__error { color: var(--text-default-error); }
        .gouv-datalist__empty { text-align: center; color: var(--text-mention-grey); padding: 2rem !important; }
      </style>
    `}},s.GouvDatalist.styles=ve``,y([c({type:String})],s.GouvDatalist.prototype,"source",void 0),y([c({type:String})],s.GouvDatalist.prototype,"colonnes",void 0),y([c({type:Boolean})],s.GouvDatalist.prototype,"recherche",void 0),y([c({type:String})],s.GouvDatalist.prototype,"filtres",void 0),y([c({type:String})],s.GouvDatalist.prototype,"tri",void 0),y([c({type:Number})],s.GouvDatalist.prototype,"pagination",void 0),y([c({type:String})],s.GouvDatalist.prototype,"export",void 0),y([_()],s.GouvDatalist.prototype,"_data",void 0),y([_()],s.GouvDatalist.prototype,"_searchQuery",void 0),y([_()],s.GouvDatalist.prototype,"_activeFilters",void 0),y([_()],s.GouvDatalist.prototype,"_sort",void 0),y([_()],s.GouvDatalist.prototype,"_currentPage",void 0),s.GouvDatalist=y([C("gouv-datalist")],s.GouvDatalist);function Ue(a,e,t){return a.map(r=>({label:String(w(r,e)??"N/A"),value:Number(w(r,t))||0}))}function je(a,e){if(e==="none")return a;const t=new Map;for(const i of a){const n=t.get(i.label)||[];n.push(i.value),t.set(i.label,n)}const r=[];for(const[i,n]of t)r.push({label:i,value:$t(n,e)});return r}function $t(a,e){switch(e){case"sum":return a.reduce((t,r)=>t+r,0);case"avg":return a.reduce((t,r)=>t+r,0)/a.length;case"count":return a.length;case"min":return Math.min(...a);case"max":return Math.max(...a);default:return a[0]||0}}function ze(a,e){return e==="none"?a:[...a].sort((t,r)=>e==="desc"?r.value-t.value:t.value-r.value)}function Ie(a,e,t,r="none",i="none",n=0){if(!a||a.length===0)return{labels:[],values:[]};let o=Ue(a,e,t);return o=je(o,r),o=ze(o,i),n>0&&(o=o.slice(0,n)),{labels:o.map(l=>l.label),values:o.map(l=>Math.round(l.value*100)/100)}}var m=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(e,t,n):o(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};const Be=["#000091","#009081","#A558A0","#C9191E","#E4794A","#FFD1A1","#68A532","#5770BE"],He=new Set(["pie","doughnut","radar"]);s.GouvChart=class extends K(g){constructor(){super(...arguments),this.source="",this.type="bar",this.indexAxis="x",this.labelField="",this.valueField="",this.aggregation="none",this.limit=0,this.sortOrder="desc",this.title="",this.subtitle="",this.color="#000091",this.height=350,this._data=[],this._chartInstance=null,this._canvasId=`gouv-chart-${Math.random().toString(36).substr(2,9)}`}createRenderRoot(){return this}disconnectedCallback(){super.disconnectedCallback(),this._destroyChart()}onSourceData(e){this._data=Array.isArray(e)?e:[],this.updateComplete.then(()=>this._renderChart())}updated(e){super.updated(e),["type","indexAxis","labelField","valueField","aggregation","limit","sortOrder","title","subtitle","color","height"].some(i=>e.has(i))&&this._data.length>0&&this._renderChart()}_processData(){return Ie(this._data,this.labelField,this.valueField,this.aggregation,this.sortOrder,this.limit)}_destroyChart(){this._chartInstance&&(this._chartInstance.destroy(),this._chartInstance=null)}_renderChart(){const e=this.querySelector(`#${this._canvasId}`);if(!e)return;if(typeof Chart>"u"){console.error("gouv-chart: Chart.js non chargé");return}this._destroyChart();const{labels:t,values:r}=this._processData();if(t.length===0)return;const i=e.getContext("2d");if(!i)return;const n=He.has(this.type),o=n?t.map((d,p)=>Be[p%Be.length]):this.color,l={type:this.type,data:{labels:t,datasets:[{label:this.valueField.split(".").pop()||"Valeur",data:r,backgroundColor:o,borderColor:n?o:this.color,borderWidth:this.type==="line"?2:1}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:this.type==="bar"?this.indexAxis:void 0,plugins:{title:{display:!!this.title,text:this.title,font:{size:16,weight:"bold"}},subtitle:{display:!!this.subtitle,text:this.subtitle,font:{size:12}},legend:{display:n,position:"bottom"}},scales:He.has(this.type)?void 0:{y:{beginAtZero:!0}}}};this._chartInstance=new Chart(i,l)}_renderAccessibleTable(){const{labels:e,values:t}=this._processData();if(e.length===0)return u``;const r=this.labelField.split(".").pop()||"Label",i=this.valueField.split(".").pop()||"Valeur";return u`
      <table class="fr-table">
        <thead>
          <tr>
            <th>${r}</th>
            <th>${i}</th>
          </tr>
        </thead>
        <tbody>
          ${e.map((n,o)=>u`
            <tr><td>${n}</td><td>${t[o]}</td></tr>
          `)}
        </tbody>
      </table>
    `}render(){return u`
      <div class="gouv-chart-container" style="height: ${this.height}px;">
        ${this._sourceLoading?u`
          <div class="gouv-chart__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        `:this._sourceError?u`
          <div class="gouv-chart__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement: ${this._sourceError.message}
          </div>
        `:u`
          <canvas id="${this._canvasId}" role="img" aria-label="${this.title||"Graphique"}"></canvas>
        `}
      </div>

      <!-- Tableau accessible (RGAA) -->
      <details class="fr-accordion fr-mt-2w">
        <summary class="fr-accordion__btn">Données du graphique (tableau accessible)</summary>
        <div class="fr-collapse">${this._renderAccessibleTable()}</div>
      </details>

      <style>
        .gouv-chart-container { position: relative; width: 100%; }
        .gouv-chart__loading,
        .gouv-chart__error {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; height: 100%; color: var(--text-mention-grey, #666); font-size: 0.875rem;
        }
        .gouv-chart__error { color: var(--text-default-error, #ce0500); }
      </style>
    `}},m([c({type:String})],s.GouvChart.prototype,"source",void 0),m([c({type:String})],s.GouvChart.prototype,"type",void 0),m([c({type:String,attribute:"index-axis"})],s.GouvChart.prototype,"indexAxis",void 0),m([c({type:String,attribute:"label-field"})],s.GouvChart.prototype,"labelField",void 0),m([c({type:String,attribute:"value-field"})],s.GouvChart.prototype,"valueField",void 0),m([c({type:String})],s.GouvChart.prototype,"aggregation",void 0),m([c({type:Number})],s.GouvChart.prototype,"limit",void 0),m([c({type:String,attribute:"sort-order"})],s.GouvChart.prototype,"sortOrder",void 0),m([c({type:String})],s.GouvChart.prototype,"title",void 0),m([c({type:String})],s.GouvChart.prototype,"subtitle",void 0),m([c({type:String})],s.GouvChart.prototype,"color",void 0),m([c({type:Number})],s.GouvChart.prototype,"height",void 0),m([_()],s.GouvChart.prototype,"_data",void 0),s.GouvChart=m([C("gouv-chart")],s.GouvChart);var v=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(e,t,n):o(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};const Ct={line:"line-chart",bar:"bar-chart",pie:"pie-chart",radar:"radar-chart",scatter:"scatter-chart",gauge:"gauge-chart","bar-line":"bar-line-chart",map:"map-chart","map-reg":"map-chart-reg"};s.GouvDsfrChart=class extends K(g){constructor(){super(...arguments),this.source="",this.type="bar",this.labelField="",this.valueField="",this.valueField2="",this.name="",this.selectedPalette="categorical",this.unitTooltip="",this.unitTooltipBar="",this.horizontal=!1,this.stacked=!1,this.fill=!1,this.highlightIndex="",this.xMin="",this.xMax="",this.yMin="",this.yMax="",this.gaugeValue=null,this.mapHighlight="",this._data=[]}createRenderRoot(){return this}onSourceData(e){this._data=Array.isArray(e)?e:[]}_processData(){if(!this._data||this._data.length===0)return{x:"[[]]",y:"[[]]"};const e=[],t=[],r=[];for(const i of this._data)e.push(String(w(i,this.labelField)??"N/A")),t.push(Number(w(i,this.valueField))||0),this.valueField2&&r.push(Number(w(i,this.valueField2))||0);return{x:JSON.stringify([e]),y:JSON.stringify([t]),y2:this.valueField2?JSON.stringify([r]):void 0}}_getCommonAttributes(){const e={};if(this.selectedPalette&&(e["selected-palette"]=this.selectedPalette),this.unitTooltip&&(e["unit-tooltip"]=this.unitTooltip),this.xMin&&(e["x-min"]=this.xMin),this.xMax&&(e["x-max"]=this.xMax),this.yMin&&(e["y-min"]=this.yMin),this.yMax&&(e["y-max"]=this.yMax),this.name)e.name=this.name;else if(this.valueField){const t=this.valueField2?[this.valueField,this.valueField2]:[this.valueField];e.name=JSON.stringify(t)}return e}_getTypeSpecificAttributes(){const{x:e,y:t,y2:r}=this._processData(),i={};switch(this.type){case"gauge":{const n=this.gaugeValue??(this._data.length>0&&Number(w(this._data[0],this.valueField))||0);i.percent=String(Math.round(n)),i.init="0",i.target="100";break}case"bar-line":i.x=e,i["y-bar"]=t,i["y-line"]=r||t,this.unitTooltipBar&&(i["unit-tooltip-bar"]=this.unitTooltipBar);break;default:i.x=e,i.y=t;break}return this.type==="bar"&&(this.horizontal&&(i.horizontal="true"),this.stacked&&(i.stacked="true"),this.highlightIndex&&(i["highlight-index"]=this.highlightIndex)),this.type==="pie"&&this.fill&&(i.fill="true"),(this.type==="map"||this.type==="map-reg")&&this.mapHighlight&&(i.highlight=this.mapHighlight),i}_createChartElement(e,t){const r=document.createElement(e);for(const[n,o]of Object.entries(t))o!==void 0&&o!==""&&r.setAttribute(n,o);const i=document.createElement("div");return i.className="gouv-dsfr-chart__wrapper",i.appendChild(r),i}_renderChart(){const e=Ct[this.type];if(!e)return u`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;const t={...this._getCommonAttributes(),...this._getTypeSpecificAttributes()},r=this._createChartElement(e,t),i=this.querySelector(".gouv-dsfr-chart__wrapper");return i&&i.remove(),u`${r}`}render(){return this._sourceLoading?u`
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
      `:this._sourceError?u`
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
      `:!this._data||this._data.length===0?u`
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
      `:this._renderChart()}},v([c({type:String})],s.GouvDsfrChart.prototype,"source",void 0),v([c({type:String})],s.GouvDsfrChart.prototype,"type",void 0),v([c({type:String,attribute:"label-field"})],s.GouvDsfrChart.prototype,"labelField",void 0),v([c({type:String,attribute:"value-field"})],s.GouvDsfrChart.prototype,"valueField",void 0),v([c({type:String,attribute:"value-field-2"})],s.GouvDsfrChart.prototype,"valueField2",void 0),v([c({type:String})],s.GouvDsfrChart.prototype,"name",void 0),v([c({type:String,attribute:"selected-palette"})],s.GouvDsfrChart.prototype,"selectedPalette",void 0),v([c({type:String,attribute:"unit-tooltip"})],s.GouvDsfrChart.prototype,"unitTooltip",void 0),v([c({type:String,attribute:"unit-tooltip-bar"})],s.GouvDsfrChart.prototype,"unitTooltipBar",void 0),v([c({type:Boolean})],s.GouvDsfrChart.prototype,"horizontal",void 0),v([c({type:Boolean})],s.GouvDsfrChart.prototype,"stacked",void 0),v([c({type:Boolean})],s.GouvDsfrChart.prototype,"fill",void 0),v([c({type:String,attribute:"highlight-index"})],s.GouvDsfrChart.prototype,"highlightIndex",void 0),v([c({type:String,attribute:"x-min"})],s.GouvDsfrChart.prototype,"xMin",void 0),v([c({type:String,attribute:"x-max"})],s.GouvDsfrChart.prototype,"xMax",void 0),v([c({type:String,attribute:"y-min"})],s.GouvDsfrChart.prototype,"yMin",void 0),v([c({type:String,attribute:"y-max"})],s.GouvDsfrChart.prototype,"yMax",void 0),v([c({type:Number,attribute:"gauge-value"})],s.GouvDsfrChart.prototype,"gaugeValue",void 0),v([c({type:String,attribute:"map-highlight"})],s.GouvDsfrChart.prototype,"mapHighlight",void 0),v([_()],s.GouvDsfrChart.prototype,"_data",void 0),s.GouvDsfrChart=v([C("gouv-dsfr-chart")],s.GouvDsfrChart);var he=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(e,t,n):o(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};s.AppHeader=class extends g{constructor(){super(...arguments),this.currentPage="",this.basePath=""}createRenderRoot(){return this}_getNavItems(){return[{id:"accueil",label:"Accueil",href:"index.html"},{id:"composants",label:"Composants",href:"demo/index.html"},{id:"builder",label:"Builder",href:"builder.html"},{id:"builder-ia",label:"Builder IA",href:"builderIA.html"},{id:"playground",label:"Playground",href:"playground.html"},{id:"favoris",label:"Favoris",href:"favoris.html"},{id:"sources",label:"Sources",href:"sources.html"}]}render(){const e=this._getNavItems();return u`
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
                  <a href="${this.basePath}index.html" title="Accueil - Charts builder">
                    <p class="fr-header__service-title">Charts builder</p>
                  </a>
                  <p class="fr-header__service-tagline">Création de visualisations dynamiques conformes DSFR</p>
                </div>
              </div>
              <div class="fr-header__tools">
                <div class="fr-header__tools-links">
                  <ul class="fr-btns-group">
                    <li>
                      <a class="fr-btn fr-btn--secondary fr-icon-star-fill" href="${this.basePath}favoris.html">
                        Favoris
                      </a>
                    </li>
                    <li>
                      <a class="fr-btn fr-icon-github-fill" href="https://github.com/bmatge/datasource-charts-webcomponents" target="_blank" rel="noopener">
                        GitHub
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
                ${e.map(t=>u`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this.basePath}${t.href}"
                       ${this.currentPage===t.id?u`aria-current="page"`:""}>
                      ${t.label}
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    `}},he([c({type:String,attribute:"current-page"})],s.AppHeader.prototype,"currentPage",void 0),he([c({type:String,attribute:"base-path"})],s.AppHeader.prototype,"basePath",void 0),s.AppHeader=he([C("app-header")],s.AppHeader);var qe=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(e,t,n):o(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};s.AppFooter=class extends g{constructor(){super(...arguments),this.basePath=""}createRenderRoot(){return this}render(){return u`
      <footer class="fr-footer" role="contentinfo" id="footer">
        <div class="fr-container">
          <div class="fr-footer__body">
            <div class="fr-footer__brand fr-enlarge-link">
              <a href="${this.basePath}index.html" title="Retour à l'accueil du site - République Française">
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
    `}},qe([c({type:String,attribute:"base-path"})],s.AppFooter.prototype,"basePath",void 0),s.AppFooter=qe([C("app-footer")],s.AppFooter);var j=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(e,t,n):o(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};s.AppLayoutBuilder=class extends g{constructor(){super(...arguments),this.leftRatio=40,this.minLeftWidth=280,this.minRightWidth=300,this._isResizing=!1,this._currentLeftRatio=40,this._leftContent=[],this._rightContent=[],this._contentMoved=!1,this._boundMouseMove=null,this._boundMouseUp=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._currentLeftRatio=this.leftRatio,this._setupResizer(),this._saveSlotContent()}_saveSlotContent(){this._leftContent=Array.from(this.querySelectorAll('[slot="left"]')),this._rightContent=Array.from(this.querySelectorAll('[slot="right"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".builder-layout-left"),t=this.querySelector(".builder-layout-right");e&&t&&(this._leftContent.forEach(r=>e.appendChild(r)),this._rightContent.forEach(r=>t.appendChild(r)),this._contentMoved=!0)}disconnectedCallback(){super.disconnectedCallback(),this._cleanupResizer()}_setupResizer(){this._boundMouseMove=this._handleMouseMove.bind(this),this._boundMouseUp=this._handleMouseUp.bind(this)}_cleanupResizer(){this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp)}_handleMouseDown(e){e.preventDefault(),this._isResizing=!0,document.body.style.cursor="col-resize",document.body.style.userSelect="none",this._boundMouseMove&&document.addEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.addEventListener("mouseup",this._boundMouseUp)}_handleMouseMove(e){if(!this._isResizing)return;const t=this.querySelector(".builder-layout-container");if(!t)return;const r=t.getBoundingClientRect(),i=r.width;let n=e.clientX-r.left;n=Math.max(this.minLeftWidth,Math.min(n,i-this.minRightWidth)),this._currentLeftRatio=n/i*100,this.requestUpdate()}_handleMouseUp(){this._isResizing&&(this._isResizing=!1,document.body.style.cursor="",document.body.style.userSelect="",this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp))}render(){return u`
      <div class="builder-layout-container">
        <aside class="builder-layout-left" style="flex: 0 0 ${this._currentLeftRatio}%">
          <!-- Contenu slot="left" sera déplacé ici -->
        </aside>

        <div class="builder-layout-resizer ${this._isResizing?"dragging":""}"
             @mousedown="${this._handleMouseDown}">
        </div>

        <main class="builder-layout-right">
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
    `}},j([c({type:Number,attribute:"left-ratio"})],s.AppLayoutBuilder.prototype,"leftRatio",void 0),j([c({type:Number,attribute:"min-left-width"})],s.AppLayoutBuilder.prototype,"minLeftWidth",void 0),j([c({type:Number,attribute:"min-right-width"})],s.AppLayoutBuilder.prototype,"minRightWidth",void 0),j([_()],s.AppLayoutBuilder.prototype,"_isResizing",void 0),j([_()],s.AppLayoutBuilder.prototype,"_currentLeftRatio",void 0),s.AppLayoutBuilder=j([C("app-layout-builder")],s.AppLayoutBuilder);var J=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(e,t,n):o(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};s.AppLayoutDemo=class extends g{constructor(){super(...arguments),this.title="",this.icon="",this.activePath="",this.basePath="",this._contentElements=[],this._contentMoved=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._contentElements=Array.from(this.querySelectorAll('[slot="content"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".demo-content-slot");e&&(this._contentElements.forEach(t=>e.appendChild(t)),this._contentMoved=!0)}_getMenuStructure(){return[{id:"overview",label:"Vue d'ensemble",href:"index.html"},{id:"components",label:"Nos composants",href:"#",children:[{id:"components/gouv-source",label:"gouv-source",href:"components/gouv-source.html"},{id:"components/gouv-kpi",label:"gouv-kpi",href:"components/gouv-kpi.html"},{id:"components/gouv-datalist",label:"gouv-datalist",href:"components/gouv-datalist.html"},{id:"components/gouv-dsfr-chart",label:"gouv-dsfr-chart",href:"components/gouv-dsfr-chart.html"}]},{id:"charts",label:"Graphiques DSFR",href:"#",children:[{id:"charts/line-chart",label:"line-chart",href:"charts/line-chart.html"},{id:"charts/bar-chart",label:"bar-chart",href:"charts/bar-chart.html"},{id:"charts/pie-chart",label:"pie-chart",href:"charts/pie-chart.html"},{id:"charts/radar-chart",label:"radar-chart",href:"charts/radar-chart.html"},{id:"charts/gauge-chart",label:"gauge-chart",href:"charts/gauge-chart.html"},{id:"charts/map-chart",label:"map-chart",href:"charts/map-chart.html"},{id:"charts/scatter-chart",label:"scatter-chart",href:"charts/scatter-chart.html"}]}]}_isActive(e){return this.activePath===e}_isParentActive(e){return e.children?e.children.some(t=>this._isActive(t.id)):!1}_renderMenuItem(e){const t=this._isActive(e.id),r=this._isParentActive(e);if(e.children){const i=`fr-sidemenu-${e.id}`,n=r;return u`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${n}"
                  aria-controls="${i}">
            ${e.label}
          </button>
          <div class="fr-collapse ${n?"fr-collapse--expanded":""}" id="${i}">
            <ul class="fr-sidemenu__list">
              ${e.children.map(o=>this._renderMenuItem(o))}
            </ul>
          </div>
        </li>
      `}else return u`
        <li class="fr-sidemenu__item ${t?"fr-sidemenu__item--active":""}">
          <a class="fr-sidemenu__link"
             href="${this.basePath}${e.href}"
             ${t?u`aria-current="page"`:""}>
            ${e.label}
          </a>
        </li>
      `}_renderBreadcrumb(){if(!this.activePath||this.activePath==="overview")return"";const e=this.activePath.split("/"),t=[{label:"Composants",href:`${this.basePath}index.html`}];if(e.length>1){const r=e[0]==="components"?"Nos composants":"Graphiques DSFR";t.push({label:r,href:"#"})}return t.push({label:this.title,href:""}),u`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((r,i)=>u`
              <li>
                ${i===t.length-1?u`<a class="fr-breadcrumb__link" aria-current="page">${r.label}</a>`:u`<a class="fr-breadcrumb__link" href="${r.href}">${r.label}</a>`}
              </li>
            `)}
          </ol>
        </div>
      </nav>
    `}render(){const e=this._getMenuStructure();return u`
      <main class="fr-container fr-py-4w">
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

            ${this.title?u`
              <h1>
                ${this.icon?u`<span class="${this.icon} fr-mr-1w" aria-hidden="true"></span>`:""}
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
    `}},J([c({type:String})],s.AppLayoutDemo.prototype,"title",void 0),J([c({type:String})],s.AppLayoutDemo.prototype,"icon",void 0),J([c({type:String,attribute:"active-path"})],s.AppLayoutDemo.prototype,"activePath",void 0),J([c({type:String,attribute:"base-path"})],s.AppLayoutDemo.prototype,"basePath",void 0),s.AppLayoutDemo=J([C("app-layout-demo")],s.AppLayoutDemo);var G=function(a,e,t,r){var i=arguments.length,n=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,r);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(e,t,n):o(e,t))||n);return i>3&&n&&Object.defineProperty(e,t,n),n};let R=class extends g{constructor(){super(...arguments),this.showDataTab=!1,this.showSaveButton=!1,this.showPlaygroundButton=!1,this.tabLabels="Aperçu,Code,Données",this.activeTab="preview",this._activeTab="preview",this._previewContent=[],this._codeContent=[],this._dataContent=[],this._contentMoved=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._activeTab=this.activeTab,this._saveSlotContent()}_saveSlotContent(){this._previewContent=Array.from(this.querySelectorAll('[slot="preview"]')),this._codeContent=Array.from(this.querySelectorAll('[slot="code"]')),this._dataContent=Array.from(this.querySelectorAll('[slot="data"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector("#tab-preview"),t=this.querySelector("#tab-code"),r=this.querySelector("#tab-data");e&&this._previewContent.forEach(i=>e.appendChild(i)),t&&this._codeContent.forEach(i=>t.appendChild(i)),r&&this._dataContent.forEach(i=>r.appendChild(i)),this._contentMoved=!0}setActiveTab(e){this._activeTab=e,this.requestUpdate()}getActiveTab(){return this._activeTab}_handleTabClick(e){this._activeTab=e,this.dispatchEvent(new CustomEvent("tab-change",{detail:{tab:e},bubbles:!0,composed:!0})),this.requestUpdate()}_getTabLabels(){return this.tabLabels.split(",").map(e=>e.trim())}_handleSaveClick(){this.dispatchEvent(new CustomEvent("save-favorite",{bubbles:!0,composed:!0}))}_handlePlaygroundClick(){this.dispatchEvent(new CustomEvent("open-playground",{bubbles:!0,composed:!0}))}render(){const e=this._getTabLabels(),[t,r,i]=e;return u`
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
          ${this.showDataTab?u`
            <button
              class="preview-panel-tab ${this._activeTab==="data"?"active":""}"
              data-tab="data"
              @click="${()=>this._handleTabClick("data")}">
              ${i||"Données"}
            </button>
          `:f}
          ${this.showPlaygroundButton?u`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          `:f}
          ${this.showSaveButton?u`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          `:f}
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
    `}};G([c({type:Boolean,attribute:"show-data-tab"})],R.prototype,"showDataTab",void 0),G([c({type:Boolean,attribute:"show-save-button"})],R.prototype,"showSaveButton",void 0),G([c({type:Boolean,attribute:"show-playground-button"})],R.prototype,"showPlaygroundButton",void 0),G([c({type:String,attribute:"tab-labels"})],R.prototype,"tabLabels",void 0),G([c({type:String,attribute:"active-tab"})],R.prototype,"activeTab",void 0),G([_()],R.prototype,"_activeTab",void 0),R=G([C("app-preview-panel")],R),s.DATA_EVENTS=A,s.SourceSubscriberMixin=K,s.aggregateByLabel=je,s.computeAggregation=de,s.dispatchDataError=Me,s.dispatchDataLoaded=ke,s.dispatchDataLoading=Oe,s.extractLabelValues=Ue,s.formatCurrency=Ge,s.formatDate=_t,s.formatNumber=ue,s.formatPercentage=Te,s.formatValue=ce,s.getByPath=w,s.getByPathOrDefault=vt,s.getDataCache=Re,s.hasPath=ft,s.parseExpression=Ne,s.processChartData=Ie,s.sortByValue=ze,s.subscribeToSource=Le,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});
