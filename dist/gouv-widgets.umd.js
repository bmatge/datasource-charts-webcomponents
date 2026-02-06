(function(o,D){typeof exports=="object"&&typeof module<"u"?D(exports):typeof define=="function"&&define.amd?define(["exports"],D):(o=typeof globalThis<"u"?globalThis:o||self,D(o.GouvWidgets={}))})(this,function(o){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Tt;const D=globalThis,Z=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol(),ut=new WeakMap;let ht=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Z&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ut.set(e,t))}return t}toString(){return this.cssText}};const Nt=n=>new ht(typeof n=="string"?n:n+"",void 0,X),ct=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,r,s)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[s+1],n[0]);return new ht(e,n,X)},Mt=(n,t)=>{if(Z)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),r=D.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,n.appendChild(i)}},dt=Z?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Nt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ft,defineProperty:Lt,getOwnPropertyDescriptor:xt,getOwnPropertyNames:jt,getOwnPropertySymbols:Ut,getPrototypeOf:Ht}=Object,w=globalThis,pt=w.trustedTypes,It=pt?pt.emptyScript:"",Y=w.reactiveElementPolyfillSupport,L=(n,t)=>n,q={toAttribute(n,t){switch(t){case Boolean:n=n?It:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},tt=(n,t)=>!Ft(n,t),ft={attribute:!0,type:String,converter:q,reflect:!1,useDefault:!1,hasChanged:tt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);let N=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ft){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Lt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=xt(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:r,set(a){const l=r==null?void 0:r.call(this);s==null||s.call(this,a),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ft}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;const t=Ht(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){const e=this.properties,i=[...jt(e),...Ut(e)];for(const r of i)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(dt(r))}else t!==void 0&&e.push(dt(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Mt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var s;const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const a=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:q).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){var s,a;const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const l=i.getPropertyOptions(r),u=typeof l.converter=="function"?{fromAttribute:l.converter}:((s=l.converter)==null?void 0:s.fromAttribute)!==void 0?l.converter:q;this._$Em=r;const p=u.fromAttribute(e,l.type);this[r]=p??((a=this._$Ej)==null?void 0:a.get(r))??p,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){var a;if(t!==void 0){const l=this.constructor;if(r===!1&&(s=this[t]),i??(i=l.getPropertyOptions(t)),!((i.hasChanged??tt)(s,e)||i.useDefault&&i.reflect&&s===((a=this._$Ej)==null?void 0:a.get(t))&&!this.hasAttribute(l._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),s!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,a]of r){const{wrapped:l}=a,u=this[s];l!==!0||this._$AL.has(s)||u===void 0||this.C(s,void 0,a,u)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[L("elementProperties")]=new Map,N[L("finalized")]=new Map,Y==null||Y({ReactiveElement:N}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis,gt=n=>n,W=x.trustedTypes,_t=W?W.createPolicy("lit-html",{createHTML:n=>n}):void 0,vt="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,mt="?"+P,Vt=`<${mt}>`,O=document,j=()=>O.createComment(""),U=n=>n===null||typeof n!="object"&&typeof n!="function",et=Array.isArray,zt=n=>et(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",it=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,yt=/>/g,k=RegExp(`>|${it}(?:([^\\s"'>=/]+)(${it}*=${it}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$t=/'/g,Ct=/"/g,At=/^(?:script|style|textarea|title)$/i,Bt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),d=Bt(1),M=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),St=new WeakMap,R=O.createTreeWalker(O,129);function Et(n,t){if(!et(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return _t!==void 0?_t.createHTML(t):t}const Kt=(n,t)=>{const e=n.length-1,i=[];let r,s=t===2?"<svg>":t===3?"<math>":"",a=H;for(let l=0;l<e;l++){const u=n[l];let p,g,c=-1,$=0;for(;$<u.length&&(a.lastIndex=$,g=a.exec(u),g!==null);)$=a.lastIndex,a===H?g[1]==="!--"?a=bt:g[1]!==void 0?a=yt:g[2]!==void 0?(At.test(g[2])&&(r=RegExp("</"+g[2],"g")),a=k):g[3]!==void 0&&(a=k):a===k?g[0]===">"?(a=r??H,c=-1):g[1]===void 0?c=-2:(c=a.lastIndex-g[2].length,p=g[1],a=g[3]===void 0?k:g[3]==='"'?Ct:$t):a===Ct||a===$t?a=k:a===bt||a===yt?a=H:(a=k,r=void 0);const G=a===k&&n[l+1].startsWith("/>")?" ":"";s+=a===H?u+Vt:c>=0?(i.push(p),u.slice(0,c)+vt+u.slice(c)+P+G):u+P+(c===-2?l:G)}return[Et(n,s+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class I{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,a=0;const l=t.length-1,u=this.parts,[p,g]=Kt(t,e);if(this.el=I.createElement(p,i),R.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=R.nextNode())!==null&&u.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(vt)){const $=g[a++],G=r.getAttribute(c).split(P),Q=/([.?@])?(.*)/.exec($);u.push({type:1,index:s,name:Q[2],strings:G,ctor:Q[1]==="."?Wt:Q[1]==="?"?Jt:Q[1]==="@"?Qt:J}),r.removeAttribute(c)}else c.startsWith(P)&&(u.push({type:6,index:s}),r.removeAttribute(c));if(At.test(r.tagName)){const c=r.textContent.split(P),$=c.length-1;if($>0){r.textContent=W?W.emptyScript:"";for(let G=0;G<$;G++)r.append(c[G],j()),R.nextNode(),u.push({type:2,index:++s});r.append(c[$],j())}}}else if(r.nodeType===8)if(r.data===mt)u.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(P,c+1))!==-1;)u.push({type:7,index:s}),c+=P.length-1}s++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function F(n,t,e=n,i){var a,l;if(t===M)return t;let r=i!==void 0?(a=e._$Co)==null?void 0:a[i]:e._$Cl;const s=U(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),s===void 0?r=void 0:(r=new s(n),r._$AT(n,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=r:e._$Cl=r),r!==void 0&&(t=F(n,r._$AS(n,t.values),r,i)),t}class qt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=((t==null?void 0:t.creationScope)??O).importNode(e,!0);R.currentNode=r;let s=R.nextNode(),a=0,l=0,u=i[0];for(;u!==void 0;){if(a===u.index){let p;u.type===2?p=new V(s,s.nextSibling,this,t):u.type===1?p=new u.ctor(s,u.name,u.strings,this,t):u.type===6&&(p=new Zt(s,this,t)),this._$AV.push(p),u=i[++l]}a!==(u==null?void 0:u.index)&&(s=R.nextNode(),a++)}return R.currentNode=O,r}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class V{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),U(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==M&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){var s;const{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=I.createElement(Et(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(e);else{const a=new qt(r,this),l=a.u(this.options);a.p(e),this.T(l),this._$AH=a}}_$AC(t){let e=St.get(t.strings);return e===void 0&&St.set(t.strings,e=new I(t)),e}k(t){et(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new V(this.O(j()),this.O(j()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const r=gt(t).nextSibling;gt(t).remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=v}_$AI(t,e=this,i,r){const s=this.strings;let a=!1;if(s===void 0)t=F(this,t,e,0),a=!U(t)||t!==this._$AH&&t!==M,a&&(this._$AH=t);else{const l=t;let u,p;for(t=s[0],u=0;u<s.length-1;u++)p=F(this,l[i+u],e,u),p===M&&(p=this._$AH[u]),a||(a=!U(p)||p!==this._$AH[u]),p===v?t=v:t!==v&&(t+=(p??"")+s[u+1]),this._$AH[u]=p}a&&!r&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Wt extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}class Jt extends J{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}}class Qt extends J{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??v)===M)return;const i=this._$AH,r=t===v&&i!==v||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==v&&(i===v||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Zt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const rt=x.litHtmlPolyfillSupport;rt==null||rt(I,V),(x.litHtmlVersions??(x.litHtmlVersions=[])).push("3.3.2");const Xt=(n,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let r=i._$litPart$;if(r===void 0){const s=(e==null?void 0:e.renderBefore)??null;i._$litPart$=r=new V(t.insertBefore(j(),s),s,void 0,e??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis;class E extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Xt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return M}}E._$litElement$=!0,E.finalized=!0,(Tt=T.litElementHydrateSupport)==null||Tt.call(T,{LitElement:E});const st=T.litElementPolyfillSupport;st==null||st({LitElement:E}),(T.litElementVersions??(T.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yt={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:tt},te=(n=Yt,t,e)=>{const{kind:i,metadata:r}=e;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(e.name,n),i==="accessor"){const{name:a}=e;return{set(l){const u=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,u,n,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,n,l),l}}}if(i==="setter"){const{name:a}=e;return function(l){const u=this[a];t.call(this,l),this.requestUpdate(a,u,n,!0,l)}}throw Error("Unsupported decorator location: "+i)};function h(n){return(t,e)=>typeof e=="object"?te(n,t,e):((i,r,s)=>{const a=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),a?Object.getOwnPropertyDescriptor(r,s):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(n){return h({...n,state:!0,attribute:!1})}function C(n,t){if(!t||t.trim()==="")return n;const i=t.replace(/\[(\d+)\]/g,".$1").split(".");let r=n;for(const s of i){if(r==null||typeof r!="object")return;r=r[s]}return r}function ee(n,t){return C(n,t)!==void 0}function ie(n,t,e){const i=C(n,t);return i!==void 0?i:e}const A={LOADED:"gouv-data-loaded",ERROR:"gouv-data-error",LOADING:"gouv-data-loading"},nt=new Map;function re(n,t){nt.set(n,t)}function B(n){return nt.get(n)}function se(n){nt.delete(n)}function Dt(n,t){re(n,t);const e=new CustomEvent(A.LOADED,{bubbles:!0,composed:!0,detail:{sourceId:n,data:t}});document.dispatchEvent(e)}function wt(n,t){const e=new CustomEvent(A.ERROR,{bubbles:!0,composed:!0,detail:{sourceId:n,error:t}});document.dispatchEvent(e)}function Pt(n){const t=new CustomEvent(A.LOADING,{bubbles:!0,composed:!0,detail:{sourceId:n}});document.dispatchEvent(t)}function K(n,t){const e=s=>{const a=s;a.detail.sourceId===n&&t.onLoaded&&t.onLoaded(a.detail.data)},i=s=>{const a=s;a.detail.sourceId===n&&t.onError&&t.onError(a.detail.error)},r=s=>{s.detail.sourceId===n&&t.onLoading&&t.onLoading()};return document.addEventListener(A.LOADED,e),document.addEventListener(A.ERROR,i),document.addEventListener(A.LOADING,r),()=>{document.removeEventListener(A.LOADED,e),document.removeEventListener(A.ERROR,i),document.removeEventListener(A.LOADING,r)}}var S=function(n,t,e,i){var r=arguments.length,s=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,t,e,i);else for(var l=n.length-1;l>=0;l--)(a=n[l])&&(s=(r<3?a(s):r>3?a(t,e,s):a(t,e))||s);return r>3&&s&&Object.defineProperty(t,e,s),s};o.GouvSource=class extends E{constructor(){super(...arguments),this.url="",this.method="GET",this.headers="",this.params="",this.refresh=0,this.transform="",this._loading=!1,this._error=null,this._data=null,this._refreshInterval=null,this._abortController=null}createRenderRoot(){return this}render(){return d``}connectedCallback(){super.connectedCallback(),this._fetchData(),this._setupRefresh()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&se(this.id)}updated(t){(t.has("url")||t.has("params")||t.has("transform"))&&this._fetchData(),t.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._fetchData()},this.refresh*1e3))}async _fetchData(){if(this.url){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,Pt(this.id);try{const t=this._buildUrl(),e=this._buildFetchOptions(),i=await fetch(t,{...e,signal:this._abortController.signal});if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);const r=await i.json();this._data=this.transform?C(r,this.transform):r,Dt(this.id,this._data)}catch(t){if(t.name==="AbortError")return;this._error=t,wt(this.id,this._error),console.error(`gouv-source[${this.id}]: Erreur de chargement`,t)}finally{this._loading=!1}}}_buildUrl(){const t=new URL(this.url,window.location.origin);if(this.params&&this.method==="GET")try{const e=JSON.parse(this.params);Object.entries(e).forEach(([i,r])=>{t.searchParams.set(i,String(r))})}catch(e){console.warn("gouv-source: params invalides (JSON attendu)",e)}return t.toString()}_buildFetchOptions(){const t={method:this.method};if(this.headers)try{t.headers=JSON.parse(this.headers)}catch(e){console.warn("gouv-source: headers invalides (JSON attendu)",e)}return this.method==="POST"&&this.params&&(t.headers={"Content-Type":"application/json",...t.headers||{}},t.body=this.params),t}reload(){this._fetchData()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},S([h({type:String})],o.GouvSource.prototype,"url",void 0),S([h({type:String})],o.GouvSource.prototype,"method",void 0),S([h({type:String})],o.GouvSource.prototype,"headers",void 0),S([h({type:String})],o.GouvSource.prototype,"params",void 0),S([h({type:Number})],o.GouvSource.prototype,"refresh",void 0),S([h({type:String})],o.GouvSource.prototype,"transform",void 0),S([_()],o.GouvSource.prototype,"_loading",void 0),S([_()],o.GouvSource.prototype,"_error",void 0),S([_()],o.GouvSource.prototype,"_data",void 0),o.GouvSource=S([z("gouv-source")],o.GouvSource);function at(n,t="nombre"){if(n==null||n==="")return"—";const e=typeof n=="string"?parseFloat(n):n;if(isNaN(e))return"—";switch(t){case"nombre":return ot(e);case"pourcentage":return Gt(e);case"euro":return Ot(e);case"decimal":return ne(e);default:return ot(e)}}function ot(n){return new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(Math.round(n))}function Gt(n){return new Intl.NumberFormat("fr-FR",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:1}).format(n/100)}function Ot(n){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(n)}function ne(n){return new Intl.NumberFormat("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:2}).format(n)}function ae(n){const t=typeof n=="string"?new Date(n):n;return isNaN(t.getTime())?"—":new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(t)}function oe(n,t,e){return t!==void 0&&n>=t?"vert":e!==void 0&&n>=e?"orange":t!==void 0||e!==void 0?"rouge":"bleu"}function kt(n){const t=n.split(":");if(t.length===1)return{type:"direct",field:t[0]};const e=t[0],i=t[1];if(t.length===3){let r=t[2];return r==="true"?r=!0:r==="false"?r=!1:isNaN(Number(r))||(r=Number(r)),{type:e,field:i,filterField:i,filterValue:r}}return{type:e,field:i}}function lt(n,t){const e=kt(t);if(e.type==="direct"&&!Array.isArray(n))return n[e.field];if(!Array.isArray(n))return null;const i=n;switch(e.type){case"direct":case"first":return i.length>0?i[0][e.field]:null;case"last":return i.length>0?i[i.length-1][e.field]:null;case"count":return e.filterValue!==void 0?i.filter(s=>s[e.field]===e.filterValue).length:i.length;case"sum":return i.reduce((s,a)=>{const l=Number(a[e.field]);return s+(isNaN(l)?0:l)},0);case"avg":return i.length===0?null:i.reduce((s,a)=>{const l=Number(a[e.field]);return s+(isNaN(l)?0:l)},0)/i.length;case"min":return i.length===0?null:Math.min(...i.map(s=>Number(s[e.field])).filter(s=>!isNaN(s)));case"max":return i.length===0?null:Math.max(...i.map(s=>Number(s[e.field])).filter(s=>!isNaN(s)));default:return null}}var y=function(n,t,e,i){var r=arguments.length,s=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,t,e,i);else for(var l=n.length-1;l>=0;l--)(a=n[l])&&(s=(r<3?a(s):r>3?a(t,e,s):a(t,e))||s);return r>3&&s&&Object.defineProperty(t,e,s),s};o.GouvKpi=class extends E{constructor(){super(...arguments),this.source="",this.valeur="",this.label="",this.description="",this.icone="",this.format="nombre",this.tendance="",this.couleur="",this._loading=!1,this._data=null,this._error=null,this._unsubscribe=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)}updated(t){t.has("source")&&this._subscribeToSource()}_subscribeToSource(){if(this._unsubscribe&&this._unsubscribe(),!this.source)return;const t=B(this.source);t!==void 0&&(this._data=t),this._unsubscribe=K(this.source,{onLoaded:e=>{this._data=e,this._loading=!1,this._error=null},onLoading:()=>{this._loading=!0},onError:e=>{this._error=e,this._loading=!1}})}_computeValue(){return!this._data||!this.valeur?null:lt(this._data,this.valeur)}_getColor(){if(this.couleur)return this.couleur;const t=this._computeValue();return typeof t!="number"?"bleu":oe(t,this.seuilVert,this.seuilOrange)}_getTendanceInfo(){if(!this.tendance||!this._data)return null;const t=lt(this._data,this.tendance);return typeof t!="number"?null:{value:t,direction:t>0?"up":t<0?"down":"stable"}}_getColorClass(){const t=this._getColor(),e={vert:"gouv-kpi--success",orange:"gouv-kpi--warning",rouge:"gouv-kpi--error",bleu:"gouv-kpi--info"};return e[t]||e.bleu}_getAriaLabel(){if(this.description)return this.description;const t=this._computeValue(),e=at(t,this.format);return`${this.label}: ${e}`}render(){const t=this._computeValue(),e=at(t,this.format),i=this._getColorClass(),r=this._getTendanceInfo();return d`
      <div
        class="gouv-kpi ${i}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._loading?d`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        `:this._error?d`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        `:d`
          <div class="gouv-kpi__content">
            ${this.icone?d`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            `:""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${e}</span>
              ${r?d`
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
    `}},o.GouvKpi.styles=ct`
    /* Styles injectés via Light DOM, utilise les classes DSFR */
  `,y([h({type:String})],o.GouvKpi.prototype,"source",void 0),y([h({type:String})],o.GouvKpi.prototype,"valeur",void 0),y([h({type:String})],o.GouvKpi.prototype,"label",void 0),y([h({type:String})],o.GouvKpi.prototype,"description",void 0),y([h({type:String})],o.GouvKpi.prototype,"icone",void 0),y([h({type:String})],o.GouvKpi.prototype,"format",void 0),y([h({type:String})],o.GouvKpi.prototype,"tendance",void 0),y([h({type:Number,attribute:"seuil-vert"})],o.GouvKpi.prototype,"seuilVert",void 0),y([h({type:Number,attribute:"seuil-orange"})],o.GouvKpi.prototype,"seuilOrange",void 0),y([h({type:String})],o.GouvKpi.prototype,"couleur",void 0),y([_()],o.GouvKpi.prototype,"_loading",void 0),y([_()],o.GouvKpi.prototype,"_data",void 0),y([_()],o.GouvKpi.prototype,"_error",void 0),o.GouvKpi=y([z("gouv-kpi")],o.GouvKpi);var b=function(n,t,e,i){var r=arguments.length,s=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,t,e,i);else for(var l=n.length-1;l>=0;l--)(a=n[l])&&(s=(r<3?a(s):r>3?a(t,e,s):a(t,e))||s);return r>3&&s&&Object.defineProperty(t,e,s),s};o.GouvDatalist=class extends E{constructor(){super(...arguments),this.source="",this.colonnes="",this.recherche=!1,this.filtres="",this.tri="",this.pagination=0,this.export="",this._loading=!1,this._data=[],this._error=null,this._searchQuery="",this._activeFilters={},this._sort=null,this._currentPage=1,this._unsubscribe=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._initSort(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&this._unsubscribe()}updated(t){t.has("source")&&this._subscribeToSource(),t.has("tri")&&this._initSort()}_initSort(){if(this.tri){const[t,e]=this.tri.split(":");this._sort={key:t,direction:e||"asc"}}}_subscribeToSource(){if(this._unsubscribe&&this._unsubscribe(),!this.source)return;const t=B(this.source);Array.isArray(t)&&(this._data=t),this._unsubscribe=K(this.source,{onLoaded:e=>{this._data=Array.isArray(e)?e:[],this._loading=!1,this._error=null,this._currentPage=1},onLoading:()=>{this._loading=!0},onError:e=>{this._error=e,this._loading=!1}})}_parseColumns(){return this.colonnes?this.colonnes.split(",").map(t=>{const[e,i]=t.trim().split(":");return{key:e.trim(),label:(i==null?void 0:i.trim())||e.trim()}}):[]}_getFilterableColumns(){return this.filtres?this.filtres.split(",").map(t=>t.trim()):[]}_getUniqueValues(t){const e=new Set;return this._data.forEach(i=>{const r=i[t];r!=null&&e.add(String(r))}),Array.from(e).sort()}_getFilteredData(){let t=[...this._data];if(this._searchQuery){const e=this._searchQuery.toLowerCase();t=t.filter(i=>Object.values(i).some(r=>String(r).toLowerCase().includes(e)))}if(Object.entries(this._activeFilters).forEach(([e,i])=>{i&&(t=t.filter(r=>String(r[e])===i))}),this._sort){const{key:e,direction:i}=this._sort;t.sort((r,s)=>{const a=r[e],l=s[e];if(a===l)return 0;if(a==null)return 1;if(l==null)return-1;const u=typeof a=="number"&&typeof l=="number"?a-l:String(a).localeCompare(String(l),"fr");return i==="desc"?-u:u})}return t}_getPaginatedData(){const t=this._getFilteredData();if(!this.pagination||this.pagination<=0)return t;const e=(this._currentPage-1)*this.pagination;return t.slice(e,e+this.pagination)}_getTotalPages(){return!this.pagination||this.pagination<=0?1:Math.ceil(this._getFilteredData().length/this.pagination)}_handleSearch(t){const e=t.target;this._searchQuery=e.value,this._currentPage=1}_handleFilter(t,e){const i=e.target;this._activeFilters={...this._activeFilters,[t]:i.value},this._currentPage=1}_handleSort(t){var e;((e=this._sort)==null?void 0:e.key)===t?this._sort={key:t,direction:this._sort.direction==="asc"?"desc":"asc"}:this._sort={key:t,direction:"asc"}}_handlePageChange(t){this._currentPage=t}_exportCsv(){const t=this._parseColumns(),e=this._getFilteredData(),i=t.map(p=>p.label).join(";"),r=e.map(p=>t.map(g=>{const c=p[g.key],$=String(c??"");return $.includes(";")||$.includes('"')?`"${$.replace(/"/g,'""')}"`:$}).join(";")),s=[i,...r].join(`
`),a=new Blob([s],{type:"text/csv;charset=utf-8;"}),l=URL.createObjectURL(a),u=document.createElement("a");u.href=l,u.download="export.csv",u.click(),URL.revokeObjectURL(l)}_formatCellValue(t){return t==null?"—":typeof t=="boolean"?t?"Oui":"Non":String(t)}render(){var a;const t=this._parseColumns(),e=this._getFilterableColumns(),i=this._getPaginatedData(),r=this._getTotalPages(),s=this._getFilteredData().length;return d`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        <!-- Barre de recherche et filtres -->
        <div class="gouv-datalist__controls">
          ${this.recherche?d`
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

          ${e.map(l=>{const u=t.find(c=>c.key===l),p=(u==null?void 0:u.label)||l,g=this._getUniqueValues(l);return d`
              <div class="fr-select-group">
                <label class="fr-label" for="filter-${l}">${p}</label>
                <select
                  class="fr-select"
                  id="filter-${l}"
                  @change="${c=>this._handleFilter(l,c)}"
                >
                  <option value="">Tous</option>
                  ${g.map(c=>d`
                    <option value="${c}" ?selected="${this._activeFilters[l]===c}">${c}</option>
                  `)}
                </select>
              </div>
            `})}

          ${(a=this.export)!=null&&a.includes("csv")?d`
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
        ${this._loading?d`
          <div class="gouv-datalist__loading" aria-live="polite">
            Chargement des données...
          </div>
        `:this._error?d`
          <div class="gouv-datalist__error" aria-live="assertive">
            Erreur: ${this._error.message}
          </div>
        `:d`
          <!-- Compteur de résultats -->
          <p class="fr-text--sm" aria-live="polite">
            ${s} résultat${s>1?"s":""}
            ${this._searchQuery||Object.values(this._activeFilters).some(l=>l)?" (filtré)":""}
          </p>

          <!-- Tableau -->
          <div class="fr-table fr-table--bordered">
            <table>
              <caption class="fr-sr-only">Liste des données</caption>
              <thead>
                <tr>
                  ${t.map(l=>{var u;return d`
                    <th scope="col">
                      <button
                        class="gouv-datalist__sort-btn"
                        @click="${()=>this._handleSort(l.key)}"
                        aria-label="Trier par ${l.label}"
                        type="button"
                      >
                        ${l.label}
                        ${((u=this._sort)==null?void 0:u.key)===l.key?d`
                          <span aria-hidden="true">${this._sort.direction==="asc"?"↑":"↓"}</span>
                        `:""}
                      </button>
                    </th>
                  `})}
                </tr>
              </thead>
              <tbody>
                ${i.length===0?d`
                  <tr>
                    <td colspan="${t.length}" class="gouv-datalist__empty">
                      Aucune donnée à afficher
                    </td>
                  </tr>
                `:i.map(l=>d`
                  <tr>
                    ${t.map(u=>d`
                      <td>${this._formatCellValue(l[u.key])}</td>
                    `)}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          ${this.pagination>0&&r>1?d`
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
    `}_renderPageNumbers(t){const e=[],i=this._currentPage;for(let r=Math.max(1,i-2);r<=Math.min(t,i+2);r++)e.push(r);return e.map(r=>d`
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
    `)}},o.GouvDatalist.styles=ct``,b([h({type:String})],o.GouvDatalist.prototype,"source",void 0),b([h({type:String})],o.GouvDatalist.prototype,"colonnes",void 0),b([h({type:Boolean})],o.GouvDatalist.prototype,"recherche",void 0),b([h({type:String})],o.GouvDatalist.prototype,"filtres",void 0),b([h({type:String})],o.GouvDatalist.prototype,"tri",void 0),b([h({type:Number})],o.GouvDatalist.prototype,"pagination",void 0),b([h({type:String})],o.GouvDatalist.prototype,"export",void 0),b([_()],o.GouvDatalist.prototype,"_loading",void 0),b([_()],o.GouvDatalist.prototype,"_data",void 0),b([_()],o.GouvDatalist.prototype,"_error",void 0),b([_()],o.GouvDatalist.prototype,"_searchQuery",void 0),b([_()],o.GouvDatalist.prototype,"_activeFilters",void 0),b([_()],o.GouvDatalist.prototype,"_sort",void 0),b([_()],o.GouvDatalist.prototype,"_currentPage",void 0),o.GouvDatalist=b([z("gouv-datalist")],o.GouvDatalist);var m=function(n,t,e,i){var r=arguments.length,s=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,t,e,i);else for(var l=n.length-1;l>=0;l--)(a=n[l])&&(s=(r<3?a(s):r>3?a(t,e,s):a(t,e))||s);return r>3&&s&&Object.defineProperty(t,e,s),s};const Rt=["#000091","#009081","#A558A0","#C9191E","#E4794A","#FFD1A1","#68A532","#5770BE"];o.GouvChart=class extends E{constructor(){super(...arguments),this.source="",this.type="bar",this.indexAxis="x",this.labelField="",this.valueField="",this.aggregation="none",this.limit=0,this.sortOrder="desc",this.title="",this.subtitle="",this.color="#000091",this.height=350,this._loading=!1,this._data=[],this._error=null,this._chartInstance=null,this._unsubscribe=null,this._canvasId=`gouv-chart-${Math.random().toString(36).substr(2,9)}`}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this._destroyChart()}updated(t){t.has("source")&&this._subscribeToSource(),["type","indexAxis","labelField","valueField","aggregation","limit","sortOrder","title","subtitle","color","height"].some(r=>t.has(r))&&this._data.length>0&&this._renderChart()}_subscribeToSource(){if(this._unsubscribe&&this._unsubscribe(),!this.source)return;const t=B(this.source);t!==void 0&&Array.isArray(t)&&(this._data=t,this.updateComplete.then(()=>this._renderChart())),this._unsubscribe=K(this.source,{onLoaded:e=>{this._data=Array.isArray(e)?e:[],this._loading=!1,this._error=null,this.updateComplete.then(()=>this._renderChart())},onLoading:()=>{this._loading=!0},onError:e=>{this._error=e,this._loading=!1}})}_processData(){if(!this._data||!Array.isArray(this._data)||this._data.length===0)return{labels:[],values:[]};let t=this._data.map(e=>({label:String(C(e,this.labelField)??"N/A"),value:Number(C(e,this.valueField))||0}));return this.aggregation!=="none"&&(t=this._aggregate(t)),this.sortOrder!=="none"&&t.sort((e,i)=>this.sortOrder==="desc"?i.value-e.value:e.value-i.value),this.limit>0&&(t=t.slice(0,this.limit)),{labels:t.map(e=>e.label),values:t.map(e=>Math.round(e.value*100)/100)}}_aggregate(t){const e=new Map;for(const r of t){const s=e.get(r.label)||[];s.push(r.value),e.set(r.label,s)}const i=[];for(const[r,s]of e){let a;switch(this.aggregation){case"sum":a=s.reduce((l,u)=>l+u,0);break;case"avg":a=s.reduce((l,u)=>l+u,0)/s.length;break;case"count":a=s.length;break;case"min":a=Math.min(...s);break;case"max":a=Math.max(...s);break;default:a=s[0]||0}i.push({label:r,value:a})}return i}_destroyChart(){this._chartInstance&&(this._chartInstance.destroy(),this._chartInstance=null)}_renderChart(){const t=this.querySelector(`#${this._canvasId}`);if(!t)return;if(typeof Chart>"u"){console.error("gouv-chart: Chart.js non chargé");return}this._destroyChart();const{labels:e,values:i}=this._processData();if(e.length===0)return;const r=t.getContext("2d");if(!r)return;const s=["pie","doughnut","radar"].includes(this.type),a=s?e.map((u,p)=>Rt[p%Rt.length]):this.color,l={type:this.type==="radar"?"radar":this.type,data:{labels:e,datasets:[{label:this.valueField.split(".").pop()||"Valeur",data:i,backgroundColor:a,borderColor:s?a:this.color,borderWidth:this.type==="line"?2:1}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:this.type==="bar"?this.indexAxis:void 0,plugins:{title:{display:!!this.title,text:this.title,font:{size:16,weight:"bold"}},subtitle:{display:!!this.subtitle,text:this.subtitle,font:{size:12}},legend:{display:s,position:"bottom"}},scales:["pie","doughnut","radar"].includes(this.type)?void 0:{y:{beginAtZero:!0}}}};this._chartInstance=new Chart(r,l)}_getAccessibleTableHtml(){const{labels:t,values:e}=this._processData();if(t.length===0)return"";const i=t.map((r,s)=>`<tr><td>${this._escapeHtml(r)}</td><td>${e[s]}</td></tr>`).join("");return`
      <table class="fr-table">
        <thead>
          <tr>
            <th>${this.labelField.split(".").pop()||"Label"}</th>
            <th>${this.valueField.split(".").pop()||"Valeur"}</th>
          </tr>
        </thead>
        <tbody>${i}</tbody>
      </table>
    `}_escapeHtml(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}render(){return d`
      <div class="gouv-chart-container" style="height: ${this.height}px;">
        ${this._loading?d`
          <div class="gouv-chart__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        `:this._error?d`
          <div class="gouv-chart__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement: ${this._error.message}
          </div>
        `:d`
          <canvas id="${this._canvasId}" role="img" aria-label="${this.title||"Graphique"}"></canvas>
        `}
      </div>

      <!-- Tableau accessible (RGAA) -->
      <details class="fr-accordion fr-mt-2w">
        <summary class="fr-accordion__btn">Données du graphique (tableau accessible)</summary>
        <div class="fr-collapse" .innerHTML=${this._getAccessibleTableHtml()}></div>
      </details>

      <style>
        .gouv-chart-container {
          position: relative;
          width: 100%;
        }

        .gouv-chart__loading,
        .gouv-chart__error {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height: 100%;
          color: var(--text-mention-grey, #666);
          font-size: 0.875rem;
        }

        .gouv-chart__error {
          color: var(--text-default-error, #ce0500);
        }
      </style>
    `}},m([h({type:String})],o.GouvChart.prototype,"source",void 0),m([h({type:String})],o.GouvChart.prototype,"type",void 0),m([h({type:String,attribute:"index-axis"})],o.GouvChart.prototype,"indexAxis",void 0),m([h({type:String,attribute:"label-field"})],o.GouvChart.prototype,"labelField",void 0),m([h({type:String,attribute:"value-field"})],o.GouvChart.prototype,"valueField",void 0),m([h({type:String})],o.GouvChart.prototype,"aggregation",void 0),m([h({type:Number})],o.GouvChart.prototype,"limit",void 0),m([h({type:String,attribute:"sort-order"})],o.GouvChart.prototype,"sortOrder",void 0),m([h({type:String})],o.GouvChart.prototype,"title",void 0),m([h({type:String})],o.GouvChart.prototype,"subtitle",void 0),m([h({type:String})],o.GouvChart.prototype,"color",void 0),m([h({type:Number})],o.GouvChart.prototype,"height",void 0),m([_()],o.GouvChart.prototype,"_loading",void 0),m([_()],o.GouvChart.prototype,"_data",void 0),m([_()],o.GouvChart.prototype,"_error",void 0),o.GouvChart=m([z("gouv-chart")],o.GouvChart);var f=function(n,t,e,i){var r=arguments.length,s=r<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,t,e,i);else for(var l=n.length-1;l>=0;l--)(a=n[l])&&(s=(r<3?a(s):r>3?a(t,e,s):a(t,e))||s);return r>3&&s&&Object.defineProperty(t,e,s),s};o.GouvDsfrChart=class extends E{constructor(){super(...arguments),this.source="",this.type="bar",this.labelField="",this.valueField="",this.valueField2="",this.name="",this.selectedPalette="categorical",this.unitTooltip="",this.unitTooltipBar="",this.horizontal=!1,this.stacked=!1,this.fill=!1,this.highlightIndex="",this.xMin="",this.xMax="",this.yMin="",this.yMax="",this.gaugeValue=null,this.mapHighlight="",this._loading=!1,this._data=[],this._error=null,this._unsubscribe=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)}updated(t){t.has("source")&&this._subscribeToSource()}_subscribeToSource(){if(this._unsubscribe&&this._unsubscribe(),!this.source)return;const t=B(this.source);t!==void 0&&Array.isArray(t)&&(this._data=t),this._unsubscribe=K(this.source,{onLoaded:e=>{this._data=Array.isArray(e)?e:[],this._loading=!1,this._error=null},onLoading:()=>{this._loading=!0},onError:e=>{this._error=e,this._loading=!1}})}_processData(){if(!this._data||!Array.isArray(this._data)||this._data.length===0)return{x:"[[]]",y:"[[]]"};const t=[],e=[],i=[];for(const l of this._data){const u=C(l,this.labelField),p=C(l,this.valueField);if(t.push(String(u??"N/A")),e.push(Number(p)||0),this.valueField2){const g=C(l,this.valueField2);i.push(Number(g)||0)}}const r=JSON.stringify([t]),s=JSON.stringify([e]),a=this.valueField2?JSON.stringify([i]):void 0;return{x:r,y:s,y2:a}}_getCommonAttributes(){const t={};return this.selectedPalette&&(t["selected-palette"]=this.selectedPalette),this.unitTooltip&&(t["unit-tooltip"]=this.unitTooltip),this.xMin&&(t["x-min"]=this.xMin),this.xMax&&(t["x-max"]=this.xMax),this.yMin&&(t["y-min"]=this.yMin),this.yMax&&(t["y-max"]=this.yMax),this.name&&(t.name=this.name),t}_renderChart(){const{x:t,y:e,y2:i}=this._processData(),r=this._getCommonAttributes();switch(this.type){case"line":return this._createChartElement("line-chart",{x:t,y:e,...r});case"bar":return this._createChartElement("bar-chart",{x:t,y:e,...r,...this.horizontal?{horizontal:"true"}:{},...this.stacked?{stacked:"true"}:{},...this.highlightIndex?{"highlight-index":this.highlightIndex}:{}});case"pie":return this._createChartElement("pie-chart",{x:t,y:e,...r,...this.fill?{fill:"true"}:{}});case"radar":return this._createChartElement("radar-chart",{x:t,y:e,...r});case"scatter":return this._createChartElement("scatter-chart",{x:t,y:e,...r});case"gauge":const s=this.gaugeValue??(this._data.length>0&&Number(C(this._data[0],this.valueField))||0);return this._createChartElement("gauge-chart",{value:String(s),...r});case"bar-line":return this._createChartElement("bar-line-chart",{x:t,"y-bar":e,"y-line":i||e,...r,...this.unitTooltipBar?{"unit-tooltip-bar":this.unitTooltipBar}:{}});case"map":return this._createChartElement("map-chart",{x:t,y:e,...r,...this.mapHighlight?{highlight:this.mapHighlight}:{}});case"map-reg":return this._createChartElement("map-chart-reg",{x:t,y:e,...r,...this.mapHighlight?{highlight:this.mapHighlight}:{}});default:return d`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`}}_createChartElement(t,e){const i=document.createElement(t);for(const[s,a]of Object.entries(e))a!==void 0&&a!==""&&i.setAttribute(s,a);const r=Object.entries(e).filter(([,s])=>s!==void 0&&s!=="").map(([s,a])=>`${s}='${a.replace(/'/g,"\\'")}'`).join(" ");return d`<div class="gouv-dsfr-chart__wrapper" .innerHTML="${`<${t} ${r}></${t}>`}"></div>`}render(){return this._loading?d`
        <div class="gouv-dsfr-chart__loading" aria-live="polite">
          <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
          Chargement du graphique...
        </div>
        <style>
          .gouv-dsfr-chart__loading {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 2rem;
            color: var(--text-mention-grey, #666);
            font-size: 0.875rem;
          }
        </style>
      `:this._error?d`
        <div class="gouv-dsfr-chart__error" aria-live="assertive">
          <span class="fr-icon-error-line" aria-hidden="true"></span>
          Erreur de chargement: ${this._error.message}
        </div>
        <style>
          .gouv-dsfr-chart__error {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            color: var(--text-default-error, #ce0500);
            background: var(--background-alt-red-marianne, #ffe5e5);
            border-radius: 4px;
          }
        </style>
      `:!this._data||this._data.length===0?d`
        <div class="gouv-dsfr-chart__empty" aria-live="polite">
          <span class="fr-icon-information-line" aria-hidden="true"></span>
          Aucune donnée disponible
        </div>
        <style>
          .gouv-dsfr-chart__empty {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            color: var(--text-mention-grey, #666);
            background: var(--background-alt-grey, #f5f5f5);
            border-radius: 4px;
          }
        </style>
      `:this._renderChart()}},f([h({type:String})],o.GouvDsfrChart.prototype,"source",void 0),f([h({type:String})],o.GouvDsfrChart.prototype,"type",void 0),f([h({type:String,attribute:"label-field"})],o.GouvDsfrChart.prototype,"labelField",void 0),f([h({type:String,attribute:"value-field"})],o.GouvDsfrChart.prototype,"valueField",void 0),f([h({type:String,attribute:"value-field-2"})],o.GouvDsfrChart.prototype,"valueField2",void 0),f([h({type:String})],o.GouvDsfrChart.prototype,"name",void 0),f([h({type:String,attribute:"selected-palette"})],o.GouvDsfrChart.prototype,"selectedPalette",void 0),f([h({type:String,attribute:"unit-tooltip"})],o.GouvDsfrChart.prototype,"unitTooltip",void 0),f([h({type:String,attribute:"unit-tooltip-bar"})],o.GouvDsfrChart.prototype,"unitTooltipBar",void 0),f([h({type:Boolean})],o.GouvDsfrChart.prototype,"horizontal",void 0),f([h({type:Boolean})],o.GouvDsfrChart.prototype,"stacked",void 0),f([h({type:Boolean})],o.GouvDsfrChart.prototype,"fill",void 0),f([h({type:String,attribute:"highlight-index"})],o.GouvDsfrChart.prototype,"highlightIndex",void 0),f([h({type:String,attribute:"x-min"})],o.GouvDsfrChart.prototype,"xMin",void 0),f([h({type:String,attribute:"x-max"})],o.GouvDsfrChart.prototype,"xMax",void 0),f([h({type:String,attribute:"y-min"})],o.GouvDsfrChart.prototype,"yMin",void 0),f([h({type:String,attribute:"y-max"})],o.GouvDsfrChart.prototype,"yMax",void 0),f([h({type:Number,attribute:"gauge-value"})],o.GouvDsfrChart.prototype,"gaugeValue",void 0),f([h({type:String,attribute:"map-highlight"})],o.GouvDsfrChart.prototype,"mapHighlight",void 0),f([_()],o.GouvDsfrChart.prototype,"_loading",void 0),f([_()],o.GouvDsfrChart.prototype,"_data",void 0),f([_()],o.GouvDsfrChart.prototype,"_error",void 0),o.GouvDsfrChart=f([z("gouv-dsfr-chart")],o.GouvDsfrChart),o.DATA_EVENTS=A,o.computeAggregation=lt,o.dispatchDataError=wt,o.dispatchDataLoaded=Dt,o.dispatchDataLoading=Pt,o.formatCurrency=Ot,o.formatDate=ae,o.formatNumber=ot,o.formatPercentage=Gt,o.formatValue=at,o.getByPath=C,o.getByPathOrDefault=ie,o.getDataCache=B,o.hasPath=ee,o.parseExpression=kt,o.subscribeToSource=K,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
