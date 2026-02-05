(function(l,A){typeof exports=="object"&&typeof module<"u"?A(exports):typeof define=="function"&&define.amd?define(["exports"],A):(l=typeof globalThis<"u"?globalThis:l||self,A(l.GouvWidgets={}))})(this,function(l){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var kt;const A=globalThis,B=A.ShadowRoot&&(A.ShadyCSS===void 0||A.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),at=new WeakMap;let lt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(B&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=at.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&at.set(e,t))}return t}toString(){return this.cssText}};const Nt=s=>new lt(typeof s=="string"?s:s+"",void 0,q),ct=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((i,r,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new lt(e,s,q)},Rt=(s,t)=>{if(B)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),r=A.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},ut=B?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Nt(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Tt,defineProperty:Gt,getOwnPropertyDescriptor:Lt,getOwnPropertyNames:Ut,getOwnPropertySymbols:Mt,getPrototypeOf:jt}=Object,S=globalThis,ht=S.trustedTypes,Ft=ht?ht.emptyScript:"",W=S.reactiveElementPolyfillSupport,G=(s,t)=>s,I={toAttribute(s,t){switch(t){case Boolean:s=s?Ft:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Q=(s,t)=>!Tt(s,t),dt={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:Q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),S.litPropertyMetadata??(S.litPropertyMetadata=new WeakMap);let N=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Gt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:n}=Lt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){const a=r==null?void 0:r.call(this);n==null||n.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;const t=jt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){const e=this.properties,i=[...Ut(e),...Mt(e)];for(const r of i)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(ut(r))}else t!==void 0&&e.push(ut(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Rt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var n;const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:I).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){var n,o;const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const a=i.getPropertyOptions(r),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:I;this._$Em=r;const h=c.fromAttribute(e,a.type);this[r]=h??((o=this._$Ej)==null?void 0:o.get(r))??h,this._$Em=null}}requestUpdate(t,e,i,r=!1,n){var o;if(t!==void 0){const a=this.constructor;if(r===!1&&(n=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??Q)(n,e)||i.useDefault&&i.reflect&&n===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:n},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,o]of r){const{wrapped:a}=o,c=this[n];a!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[G("elementProperties")]=new Map,N[G("finalized")]=new Map,W==null||W({ReactiveElement:N}),(S.reactiveElementVersions??(S.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis,pt=s=>s,x=L.trustedTypes,ft=x?x.createPolicy("lit-html",{createHTML:s=>s}):void 0,_t="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+E,Ht=`<${gt}>`,w=document,U=()=>w.createComment(""),M=s=>s===null||typeof s!="object"&&typeof s!="function",J=Array.isArray,It=s=>J(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Z=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vt=/-->/g,mt=/>/g,P=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bt=/'/g,$t=/"/g,yt=/^(?:script|style|textarea|title)$/i,xt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),p=xt(1),R=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),At=new WeakMap,D=w.createTreeWalker(w,129);function St(s,t){if(!J(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ft!==void 0?ft.createHTML(t):t}const Vt=(s,t)=>{const e=s.length-1,i=[];let r,n=t===2?"<svg>":t===3?"<math>":"",o=j;for(let a=0;a<e;a++){const c=s[a];let h,f,u=-1,m=0;for(;m<c.length&&(o.lastIndex=m,f=o.exec(c),f!==null);)m=o.lastIndex,o===j?f[1]==="!--"?o=vt:f[1]!==void 0?o=mt:f[2]!==void 0?(yt.test(f[2])&&(r=RegExp("</"+f[2],"g")),o=P):f[3]!==void 0&&(o=P):o===P?f[0]===">"?(o=r??j,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,h=f[1],o=f[3]===void 0?P:f[3]==='"'?$t:bt):o===$t||o===bt?o=P:o===vt||o===mt?o=j:(o=P,r=void 0);const C=o===P&&s[a+1].startsWith("/>")?" ":"";n+=o===j?c+Ht:u>=0?(i.push(h),c.slice(0,u)+_t+c.slice(u)+E+C):c+E+(u===-2?a:C)}return[St(s,n+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class F{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,o=0;const a=t.length-1,c=this.parts,[h,f]=Vt(t,e);if(this.el=F.createElement(h,i),D.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=D.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const u of r.getAttributeNames())if(u.endsWith(_t)){const m=f[o++],C=r.getAttribute(u).split(E),K=/([.?@])?(.*)/.exec(m);c.push({type:1,index:n,name:K[2],strings:C,ctor:K[1]==="."?Kt:K[1]==="?"?Bt:K[1]==="@"?qt:V}),r.removeAttribute(u)}else u.startsWith(E)&&(c.push({type:6,index:n}),r.removeAttribute(u));if(yt.test(r.tagName)){const u=r.textContent.split(E),m=u.length-1;if(m>0){r.textContent=x?x.emptyScript:"";for(let C=0;C<m;C++)r.append(u[C],U()),D.nextNode(),c.push({type:2,index:++n});r.append(u[m],U())}}}else if(r.nodeType===8)if(r.data===gt)c.push({type:2,index:n});else{let u=-1;for(;(u=r.data.indexOf(E,u+1))!==-1;)c.push({type:7,index:n}),u+=E.length-1}n++}}static createElement(t,e){const i=w.createElement("template");return i.innerHTML=t,i}}function T(s,t,e=s,i){var o,a;if(t===R)return t;let r=i!==void 0?(o=e._$Co)==null?void 0:o[i]:e._$Cl;const n=M(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((a=r==null?void 0:r._$AO)==null||a.call(r,!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=r:e._$Cl=r),r!==void 0&&(t=T(s,r._$AS(s,t.values),r,i)),t}class zt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=((t==null?void 0:t.creationScope)??w).importNode(e,!0);D.currentNode=r;let n=D.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let h;c.type===2?h=new H(n,n.nextSibling,this,t):c.type===1?h=new c.ctor(n,c.name,c.strings,this,t):c.type===6&&(h=new Wt(n,this,t)),this._$AV.push(h),c=i[++a]}o!==(c==null?void 0:c.index)&&(n=D.nextNode(),o++)}return D.currentNode=w,r}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class H{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),M(t)?t===_||t==null||t===""?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):It(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==_&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(w.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=F.createElement(St(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(e);else{const o=new zt(r,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=At.get(t.strings);return e===void 0&&At.set(t.strings,e=new F(t)),e}k(t){J(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const n of t)r===e.length?e.push(i=new H(this.O(U()),this.O(U()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const r=pt(t).nextSibling;pt(t).remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class V{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}_$AI(t,e=this,i,r){const n=this.strings;let o=!1;if(n===void 0)t=T(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==R,o&&(this._$AH=t);else{const a=t;let c,h;for(t=n[0],c=0;c<n.length-1;c++)h=T(this,a[i+c],e,c),h===R&&(h=this._$AH[c]),o||(o=!M(h)||h!==this._$AH[c]),h===_?t=_:t!==_&&(t+=(h??"")+n[c+1]),this._$AH[c]=h}o&&!r&&this.j(t)}j(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Kt extends V{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_?void 0:t}}class Bt extends V{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_)}}class qt extends V{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=T(this,t,e,0)??_)===R)return;const i=this._$AH,r=t===_&&i!==_||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==_&&(i===_||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Wt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}}const X=L.litHtmlPolyfillSupport;X==null||X(F,H),(L.litHtmlVersions??(L.litHtmlVersions=[])).push("3.3.2");const Qt=(s,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let r=i._$litPart$;if(r===void 0){const n=(e==null?void 0:e.renderBefore)??null;i._$litPart$=r=new H(t.insertBefore(U(),n),n,void 0,e??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=globalThis;class k extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Qt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return R}}k._$litElement$=!0,k.finalized=!0,(kt=O.litElementHydrateSupport)==null||kt.call(O,{LitElement:k});const Y=O.litElementPolyfillSupport;Y==null||Y({LitElement:k}),(O.litElementVersions??(O.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tt=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:Q},Zt=(s=Jt,t,e)=>{const{kind:i,metadata:r}=e;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(e.name,s),i==="accessor"){const{name:o}=e;return{set(a){const c=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,c,s,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,s,a),a}}}if(i==="setter"){const{name:o}=e;return function(a){const c=this[o];t.call(this,a),this.requestUpdate(o,c,s,!0,a)}}throw Error("Unsupported decorator location: "+i)};function d(s){return(t,e)=>typeof e=="object"?Zt(s,t,e):((i,r,n)=>{const o=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),o?Object.getOwnPropertyDescriptor(r,n):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(s){return d({...s,state:!0,attribute:!1})}function z(s,t){if(!t||t.trim()==="")return s;const i=t.replace(/\[(\d+)\]/g,".$1").split(".");let r=s;for(const n of i){if(r==null||typeof r!="object")return;r=r[n]}return r}function Xt(s,t){return z(s,t)!==void 0}function Yt(s,t,e){const i=z(s,t);return i!==void 0?i:e}const $={LOADED:"gouv-data-loaded",ERROR:"gouv-data-error",LOADING:"gouv-data-loading"},et=new Map;function te(s,t){et.set(s,t)}function it(s){return et.get(s)}function ee(s){et.delete(s)}function Et(s,t){te(s,t);const e=new CustomEvent($.LOADED,{bubbles:!0,composed:!0,detail:{sourceId:s,data:t}});document.dispatchEvent(e)}function Ct(s,t){const e=new CustomEvent($.ERROR,{bubbles:!0,composed:!0,detail:{sourceId:s,error:t}});document.dispatchEvent(e)}function wt(s){const t=new CustomEvent($.LOADING,{bubbles:!0,composed:!0,detail:{sourceId:s}});document.dispatchEvent(t)}function rt(s,t){const e=n=>{const o=n;o.detail.sourceId===s&&t.onLoaded&&t.onLoaded(o.detail.data)},i=n=>{const o=n;o.detail.sourceId===s&&t.onError&&t.onError(o.detail.error)},r=n=>{n.detail.sourceId===s&&t.onLoading&&t.onLoading()};return document.addEventListener($.LOADED,e),document.addEventListener($.ERROR,i),document.addEventListener($.LOADING,r),()=>{document.removeEventListener($.LOADED,e),document.removeEventListener($.ERROR,i),document.removeEventListener($.LOADING,r)}}var y=function(s,t,e,i){var r=arguments.length,n=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,t,e,i);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(t,e,n):o(t,e))||n);return r>3&&n&&Object.defineProperty(t,e,n),n};l.GouvSource=class extends k{constructor(){super(...arguments),this.url="",this.method="GET",this.headers="",this.params="",this.refresh=0,this.transform="",this._loading=!1,this._error=null,this._data=null,this._refreshInterval=null,this._abortController=null}createRenderRoot(){return this}render(){return p``}connectedCallback(){super.connectedCallback(),this._fetchData(),this._setupRefresh()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&ee(this.id)}updated(t){(t.has("url")||t.has("params")||t.has("transform"))&&this._fetchData(),t.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._fetchData()},this.refresh*1e3))}async _fetchData(){if(this.url){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,wt(this.id);try{const t=this._buildUrl(),e=this._buildFetchOptions(),i=await fetch(t,{...e,signal:this._abortController.signal});if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);const r=await i.json();this._data=this.transform?z(r,this.transform):r,Et(this.id,this._data)}catch(t){if(t.name==="AbortError")return;this._error=t,Ct(this.id,this._error),console.error(`gouv-source[${this.id}]: Erreur de chargement`,t)}finally{this._loading=!1}}}_buildUrl(){const t=new URL(this.url,window.location.origin);if(this.params&&this.method==="GET")try{const e=JSON.parse(this.params);Object.entries(e).forEach(([i,r])=>{t.searchParams.set(i,String(r))})}catch(e){console.warn("gouv-source: params invalides (JSON attendu)",e)}return t.toString()}_buildFetchOptions(){const t={method:this.method};if(this.headers)try{t.headers=JSON.parse(this.headers)}catch(e){console.warn("gouv-source: headers invalides (JSON attendu)",e)}return this.method==="POST"&&this.params&&(t.headers={"Content-Type":"application/json",...t.headers||{}},t.body=this.params),t}reload(){this._fetchData()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},y([d({type:String})],l.GouvSource.prototype,"url",void 0),y([d({type:String})],l.GouvSource.prototype,"method",void 0),y([d({type:String})],l.GouvSource.prototype,"headers",void 0),y([d({type:String})],l.GouvSource.prototype,"params",void 0),y([d({type:Number})],l.GouvSource.prototype,"refresh",void 0),y([d({type:String})],l.GouvSource.prototype,"transform",void 0),y([b()],l.GouvSource.prototype,"_loading",void 0),y([b()],l.GouvSource.prototype,"_error",void 0),y([b()],l.GouvSource.prototype,"_data",void 0),l.GouvSource=y([tt("gouv-source")],l.GouvSource);function st(s,t="nombre"){if(s==null||s==="")return"—";const e=typeof s=="string"?parseFloat(s):s;if(isNaN(e))return"—";switch(t){case"nombre":return nt(e);case"pourcentage":return Pt(e);case"euro":return Dt(e);case"decimal":return ie(e);default:return nt(e)}}function nt(s){return new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(Math.round(s))}function Pt(s){return new Intl.NumberFormat("fr-FR",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:1}).format(s/100)}function Dt(s){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(s)}function ie(s){return new Intl.NumberFormat("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:2}).format(s)}function re(s){const t=typeof s=="string"?new Date(s):s;return isNaN(t.getTime())?"—":new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(t)}function se(s,t,e){return t!==void 0&&s>=t?"vert":e!==void 0&&s>=e?"orange":t!==void 0||e!==void 0?"rouge":"bleu"}function Ot(s){const t=s.split(":");if(t.length===1)return{type:"direct",field:t[0]};const e=t[0],i=t[1];if(t.length===3){let r=t[2];return r==="true"?r=!0:r==="false"?r=!1:isNaN(Number(r))||(r=Number(r)),{type:e,field:i,filterField:i,filterValue:r}}return{type:e,field:i}}function ot(s,t){const e=Ot(t);if(e.type==="direct"&&!Array.isArray(s))return s[e.field];if(!Array.isArray(s))return null;const i=s;switch(e.type){case"direct":case"first":return i.length>0?i[0][e.field]:null;case"last":return i.length>0?i[i.length-1][e.field]:null;case"count":return e.filterValue!==void 0?i.filter(n=>n[e.field]===e.filterValue).length:i.length;case"sum":return i.reduce((n,o)=>{const a=Number(o[e.field]);return n+(isNaN(a)?0:a)},0);case"avg":return i.length===0?null:i.reduce((n,o)=>{const a=Number(o[e.field]);return n+(isNaN(a)?0:a)},0)/i.length;case"min":return i.length===0?null:Math.min(...i.map(n=>Number(n[e.field])).filter(n=>!isNaN(n)));case"max":return i.length===0?null:Math.max(...i.map(n=>Number(n[e.field])).filter(n=>!isNaN(n)));default:return null}}var v=function(s,t,e,i){var r=arguments.length,n=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,t,e,i);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(t,e,n):o(t,e))||n);return r>3&&n&&Object.defineProperty(t,e,n),n};l.GouvKpi=class extends k{constructor(){super(...arguments),this.source="",this.valeur="",this.label="",this.description="",this.icone="",this.format="nombre",this.tendance="",this.couleur="",this._loading=!1,this._data=null,this._error=null,this._unsubscribe=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)}updated(t){t.has("source")&&this._subscribeToSource()}_subscribeToSource(){if(this._unsubscribe&&this._unsubscribe(),!this.source)return;const t=it(this.source);t!==void 0&&(this._data=t),this._unsubscribe=rt(this.source,{onLoaded:e=>{this._data=e,this._loading=!1,this._error=null},onLoading:()=>{this._loading=!0},onError:e=>{this._error=e,this._loading=!1}})}_computeValue(){return!this._data||!this.valeur?null:ot(this._data,this.valeur)}_getColor(){if(this.couleur)return this.couleur;const t=this._computeValue();return typeof t!="number"?"bleu":se(t,this.seuilVert,this.seuilOrange)}_getTendanceInfo(){if(!this.tendance||!this._data)return null;const t=ot(this._data,this.tendance);return typeof t!="number"?null:{value:t,direction:t>0?"up":t<0?"down":"stable"}}_getColorClass(){const t=this._getColor(),e={vert:"gouv-kpi--success",orange:"gouv-kpi--warning",rouge:"gouv-kpi--error",bleu:"gouv-kpi--info"};return e[t]||e.bleu}_getAriaLabel(){if(this.description)return this.description;const t=this._computeValue(),e=st(t,this.format);return`${this.label}: ${e}`}render(){const t=this._computeValue(),e=st(t,this.format),i=this._getColorClass(),r=this._getTendanceInfo();return p`
      <div
        class="gouv-kpi ${i}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._loading?p`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        `:this._error?p`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        `:p`
          <div class="gouv-kpi__content">
            ${this.icone?p`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            `:""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${e}</span>
              ${r?p`
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
          padding: 1.5rem;
          background: var(--background-default-grey);
          border-radius: 0.25rem;
          border-left: 4px solid var(--border-default-grey);
          min-height: 120px;
        }

        .gouv-kpi--success {
          border-left-color: var(--background-flat-success);
        }

        .gouv-kpi--warning {
          border-left-color: var(--background-flat-warning);
        }

        .gouv-kpi--error {
          border-left-color: var(--background-flat-error);
        }

        .gouv-kpi--info {
          border-left-color: var(--background-flat-info);
        }

        .gouv-kpi__content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .gouv-kpi__icon {
          font-size: 1.5rem;
          color: var(--text-mention-grey);
        }

        .gouv-kpi__value-wrapper {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .gouv-kpi__value {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          color: var(--text-title-grey);
        }

        .gouv-kpi__tendance {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .gouv-kpi__tendance--up {
          color: var(--text-default-success);
        }

        .gouv-kpi__tendance--down {
          color: var(--text-default-error);
        }

        .gouv-kpi__tendance--stable {
          color: var(--text-mention-grey);
        }

        .gouv-kpi__label {
          font-size: 0.875rem;
          color: var(--text-mention-grey);
        }

        .gouv-kpi__loading,
        .gouv-kpi__error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-mention-grey);
          font-size: 0.875rem;
        }

        .gouv-kpi__error {
          color: var(--text-default-error);
        }
      </style>
    `}},l.GouvKpi.styles=ct`
    /* Styles injectés via Light DOM, utilise les classes DSFR */
  `,v([d({type:String})],l.GouvKpi.prototype,"source",void 0),v([d({type:String})],l.GouvKpi.prototype,"valeur",void 0),v([d({type:String})],l.GouvKpi.prototype,"label",void 0),v([d({type:String})],l.GouvKpi.prototype,"description",void 0),v([d({type:String})],l.GouvKpi.prototype,"icone",void 0),v([d({type:String})],l.GouvKpi.prototype,"format",void 0),v([d({type:String})],l.GouvKpi.prototype,"tendance",void 0),v([d({type:Number,attribute:"seuil-vert"})],l.GouvKpi.prototype,"seuilVert",void 0),v([d({type:Number,attribute:"seuil-orange"})],l.GouvKpi.prototype,"seuilOrange",void 0),v([d({type:String})],l.GouvKpi.prototype,"couleur",void 0),v([b()],l.GouvKpi.prototype,"_loading",void 0),v([b()],l.GouvKpi.prototype,"_data",void 0),v([b()],l.GouvKpi.prototype,"_error",void 0),l.GouvKpi=v([tt("gouv-kpi")],l.GouvKpi);var g=function(s,t,e,i){var r=arguments.length,n=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,t,e,i);else for(var a=s.length-1;a>=0;a--)(o=s[a])&&(n=(r<3?o(n):r>3?o(t,e,n):o(t,e))||n);return r>3&&n&&Object.defineProperty(t,e,n),n};l.GouvDatalist=class extends k{constructor(){super(...arguments),this.source="",this.colonnes="",this.recherche=!1,this.filtres="",this.tri="",this.pagination=0,this.export="",this._loading=!1,this._data=[],this._error=null,this._searchQuery="",this._activeFilters={},this._sort=null,this._currentPage=1,this._unsubscribe=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._initSort(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&this._unsubscribe()}updated(t){t.has("source")&&this._subscribeToSource(),t.has("tri")&&this._initSort()}_initSort(){if(this.tri){const[t,e]=this.tri.split(":");this._sort={key:t,direction:e||"asc"}}}_subscribeToSource(){if(this._unsubscribe&&this._unsubscribe(),!this.source)return;const t=it(this.source);Array.isArray(t)&&(this._data=t),this._unsubscribe=rt(this.source,{onLoaded:e=>{this._data=Array.isArray(e)?e:[],this._loading=!1,this._error=null,this._currentPage=1},onLoading:()=>{this._loading=!0},onError:e=>{this._error=e,this._loading=!1}})}_parseColumns(){return this.colonnes?this.colonnes.split(",").map(t=>{const[e,i]=t.trim().split(":");return{key:e.trim(),label:(i==null?void 0:i.trim())||e.trim()}}):[]}_getFilterableColumns(){return this.filtres?this.filtres.split(",").map(t=>t.trim()):[]}_getUniqueValues(t){const e=new Set;return this._data.forEach(i=>{const r=i[t];r!=null&&e.add(String(r))}),Array.from(e).sort()}_getFilteredData(){let t=[...this._data];if(this._searchQuery){const e=this._searchQuery.toLowerCase();t=t.filter(i=>Object.values(i).some(r=>String(r).toLowerCase().includes(e)))}if(Object.entries(this._activeFilters).forEach(([e,i])=>{i&&(t=t.filter(r=>String(r[e])===i))}),this._sort){const{key:e,direction:i}=this._sort;t.sort((r,n)=>{const o=r[e],a=n[e];if(o===a)return 0;if(o==null)return 1;if(a==null)return-1;const c=typeof o=="number"&&typeof a=="number"?o-a:String(o).localeCompare(String(a),"fr");return i==="desc"?-c:c})}return t}_getPaginatedData(){const t=this._getFilteredData();if(!this.pagination||this.pagination<=0)return t;const e=(this._currentPage-1)*this.pagination;return t.slice(e,e+this.pagination)}_getTotalPages(){return!this.pagination||this.pagination<=0?1:Math.ceil(this._getFilteredData().length/this.pagination)}_handleSearch(t){const e=t.target;this._searchQuery=e.value,this._currentPage=1}_handleFilter(t,e){const i=e.target;this._activeFilters={...this._activeFilters,[t]:i.value},this._currentPage=1}_handleSort(t){var e;((e=this._sort)==null?void 0:e.key)===t?this._sort={key:t,direction:this._sort.direction==="asc"?"desc":"asc"}:this._sort={key:t,direction:"asc"}}_handlePageChange(t){this._currentPage=t}_exportCsv(){const t=this._parseColumns(),e=this._getFilteredData(),i=t.map(h=>h.label).join(";"),r=e.map(h=>t.map(f=>{const u=h[f.key],m=String(u??"");return m.includes(";")||m.includes('"')?`"${m.replace(/"/g,'""')}"`:m}).join(";")),n=[i,...r].join(`
`),o=new Blob([n],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(o),c=document.createElement("a");c.href=a,c.download="export.csv",c.click(),URL.revokeObjectURL(a)}_formatCellValue(t){return t==null?"—":typeof t=="boolean"?t?"Oui":"Non":String(t)}render(){var o;const t=this._parseColumns(),e=this._getFilterableColumns(),i=this._getPaginatedData(),r=this._getTotalPages(),n=this._getFilteredData().length;return p`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        <!-- Barre de recherche et filtres -->
        <div class="gouv-datalist__controls">
          ${this.recherche?p`
            <div class="fr-search-bar" role="search">
              <label class="fr-label" for="search-${this.source}">Rechercher</label>
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
          `:""}

          ${e.map(a=>{const c=t.find(u=>u.key===a),h=(c==null?void 0:c.label)||a,f=this._getUniqueValues(a);return p`
              <div class="fr-select-group">
                <label class="fr-label" for="filter-${a}">${h}</label>
                <select
                  class="fr-select"
                  id="filter-${a}"
                  @change="${u=>this._handleFilter(a,u)}"
                >
                  <option value="">Tous</option>
                  ${f.map(u=>p`
                    <option value="${u}" ?selected="${this._activeFilters[a]===u}">${u}</option>
                  `)}
                </select>
              </div>
            `})}

          ${(o=this.export)!=null&&o.includes("csv")?p`
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

        <!-- État de chargement -->
        ${this._loading?p`
          <div class="gouv-datalist__loading" aria-live="polite">
            Chargement des données...
          </div>
        `:this._error?p`
          <div class="gouv-datalist__error" aria-live="assertive">
            Erreur: ${this._error.message}
          </div>
        `:p`
          <!-- Compteur de résultats -->
          <p class="fr-text--sm" aria-live="polite">
            ${n} résultat${n>1?"s":""}
            ${this._searchQuery||Object.values(this._activeFilters).some(a=>a)?" (filtré)":""}
          </p>

          <!-- Tableau -->
          <div class="fr-table fr-table--bordered">
            <table>
              <caption class="fr-sr-only">Liste des données</caption>
              <thead>
                <tr>
                  ${t.map(a=>{var c;return p`
                    <th scope="col">
                      <button
                        class="gouv-datalist__sort-btn"
                        @click="${()=>this._handleSort(a.key)}"
                        aria-label="Trier par ${a.label}"
                        type="button"
                      >
                        ${a.label}
                        ${((c=this._sort)==null?void 0:c.key)===a.key?p`
                          <span aria-hidden="true">${this._sort.direction==="asc"?"↑":"↓"}</span>
                        `:""}
                      </button>
                    </th>
                  `})}
                </tr>
              </thead>
              <tbody>
                ${i.length===0?p`
                  <tr>
                    <td colspan="${t.length}" class="gouv-datalist__empty">
                      Aucune donnée à afficher
                    </td>
                  </tr>
                `:i.map(a=>p`
                  <tr>
                    ${t.map(c=>p`
                      <td>${this._formatCellValue(a[c.key])}</td>
                    `)}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          ${this.pagination>0&&r>1?p`
            <nav class="fr-pagination" aria-label="Pagination">
              <ul class="fr-pagination__list">
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--first"
                    ?disabled="${this._currentPage===1}"
                    @click="${()=>this._handlePageChange(1)}"
                    aria-label="Première page"
                    type="button"
                  >
                    Première page
                  </button>
                </li>
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--prev"
                    ?disabled="${this._currentPage===1}"
                    @click="${()=>this._handlePageChange(this._currentPage-1)}"
                    aria-label="Page précédente"
                    type="button"
                  >
                    Page précédente
                  </button>
                </li>
                ${this._renderPageNumbers(r)}
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--next"
                    ?disabled="${this._currentPage===r}"
                    @click="${()=>this._handlePageChange(this._currentPage+1)}"
                    aria-label="Page suivante"
                    type="button"
                  >
                    Page suivante
                  </button>
                </li>
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--last"
                    ?disabled="${this._currentPage===r}"
                    @click="${()=>this._handlePageChange(r)}"
                    aria-label="Dernière page"
                    type="button"
                  >
                    Dernière page
                  </button>
                </li>
              </ul>
            </nav>
          `:""}
        `}
      </div>

      <style>
        .gouv-datalist__controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: flex-end;
          margin-bottom: 1rem;
        }

        .gouv-datalist__controls .fr-search-bar {
          flex: 1;
          min-width: 200px;
        }

        .gouv-datalist__controls .fr-select-group {
          min-width: 150px;
        }

        .gouv-datalist__sort-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 700;
          font-size: inherit;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .gouv-datalist__sort-btn:hover {
          text-decoration: underline;
        }

        .gouv-datalist__loading,
        .gouv-datalist__error {
          padding: 2rem;
          text-align: center;
        }

        .gouv-datalist__error {
          color: var(--text-default-error);
        }

        .gouv-datalist__empty {
          text-align: center;
          color: var(--text-mention-grey);
          padding: 2rem !important;
        }
      </style>
    `}_renderPageNumbers(t){const e=[],i=this._currentPage;for(let r=Math.max(1,i-2);r<=Math.min(t,i+2);r++)e.push(r);return e.map(r=>p`
      <li>
        <button
          class="fr-pagination__link ${r===i?"fr-pagination__link--active":""}"
          @click="${()=>this._handlePageChange(r)}"
          aria-current="${r===i?"page":"false"}"
          type="button"
        >
          ${r}
        </button>
      </li>
    `)}},l.GouvDatalist.styles=ct``,g([d({type:String})],l.GouvDatalist.prototype,"source",void 0),g([d({type:String})],l.GouvDatalist.prototype,"colonnes",void 0),g([d({type:Boolean})],l.GouvDatalist.prototype,"recherche",void 0),g([d({type:String})],l.GouvDatalist.prototype,"filtres",void 0),g([d({type:String})],l.GouvDatalist.prototype,"tri",void 0),g([d({type:Number})],l.GouvDatalist.prototype,"pagination",void 0),g([d({type:String})],l.GouvDatalist.prototype,"export",void 0),g([b()],l.GouvDatalist.prototype,"_loading",void 0),g([b()],l.GouvDatalist.prototype,"_data",void 0),g([b()],l.GouvDatalist.prototype,"_error",void 0),g([b()],l.GouvDatalist.prototype,"_searchQuery",void 0),g([b()],l.GouvDatalist.prototype,"_activeFilters",void 0),g([b()],l.GouvDatalist.prototype,"_sort",void 0),g([b()],l.GouvDatalist.prototype,"_currentPage",void 0),l.GouvDatalist=g([tt("gouv-datalist")],l.GouvDatalist),l.DATA_EVENTS=$,l.computeAggregation=ot,l.dispatchDataError=Ct,l.dispatchDataLoaded=Et,l.dispatchDataLoading=wt,l.formatCurrency=Dt,l.formatDate=re,l.formatNumber=nt,l.formatPercentage=Pt,l.formatValue=st,l.getByPath=z,l.getByPathOrDefault=Yt,l.getDataCache=it,l.hasPath=Xt,l.parseExpression=Ot,l.subscribeToSource=rt,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
