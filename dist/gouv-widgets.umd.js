(function(l,M){typeof exports=="object"&&typeof module<"u"?M(exports):typeof define=="function"&&define.amd?define(["exports"],M):(l=typeof globalThis<"u"?globalThis:l||self,M(l.GouvWidgets={}))})(this,(function(l){"use strict";var Si=Object.defineProperty;var h=(l,M)=>Si(l,"name",{value:M,configurable:!0});var Y,ee,It,te,ie,re,se,ae,ne,oe,le,ce,ue,he,de,pe,fe;var M=typeof document<"u"?document.currentScript:null;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De=globalThis,xe=De.ShadowRoot&&(De.ShadyCSS===void 0||De.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Le=Symbol(),dt=new WeakMap;let pt=(Y=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(xe&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=dt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&dt.set(t,e))}return e}toString(){return this.cssText}},h(Y,"n"),Y);const Vt=h(n=>new pt(typeof n=="string"?n:n+"",void 0,Le),"r$4"),ft=h((n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,r,s)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[s+1],n[0]);return new pt(t,n,Le)},"i$3"),Qt=h((n,e)=>{if(xe)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=De.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,n.appendChild(i)}},"S$1"),gt=xe?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Vt(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Wt,defineProperty:Kt,getOwnPropertyDescriptor:Jt,getOwnPropertyNames:Xt,getOwnPropertySymbols:Zt,getPrototypeOf:Yt}=Object,N=globalThis,_t=N.trustedTypes,ei=_t?_t.emptyScript:"",Ne=N.reactiveElementPolyfillSupport,_e=h((n,e)=>n,"d$1"),ke={toAttribute(n,e){switch(e){case Boolean:n=n?ei:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Ue=h((n,e)=>!Wt(n,e),"f$1"),mt={attribute:!0,type:String,converter:ke,reflect:!1,useDefault:!1,hasChanged:Ue};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),N.litPropertyMetadata??(N.litPropertyMetadata=new WeakMap);let Q=(ee=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=mt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Kt(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=Jt(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:r,set(a){const o=r==null?void 0:r.call(this);s==null||s.call(this,a),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??mt}static _$Ei(){if(this.hasOwnProperty(_e("elementProperties")))return;const e=Yt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_e("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_e("properties"))){const t=this.properties,i=[...Xt(t),...Zt(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(gt(r))}else e!==void 0&&t.push(gt(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Qt(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var s;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const a=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:ke).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){var s,a;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:ke;this._$Em=r;const d=c.fromAttribute(t,o.type);this[r]=d??((a=this._$Ej)==null?void 0:a.get(r))??d,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){var a;if(e!==void 0){const o=this.constructor;if(r===!1&&(s=this[e]),i??(i=o.getPropertyOptions(e)),!((i.hasChanged??Ue)(s,t)||i.useDefault&&i.reflect&&s===((a=this._$Ej)==null?void 0:a.get(e))&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),s!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,a]of r){const{wrapped:o}=a,c=this[s];o!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,a,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}},h(ee,"y"),ee);Q.elementStyles=[],Q.shadowRootOptions={mode:"open"},Q[_e("elementProperties")]=new Map,Q[_e("finalized")]=new Map,Ne==null||Ne({ReactiveElement:Q}),(N.reactiveElementVersions??(N.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const me=globalThis,vt=h(n=>n,"i$1"),Ee=me.trustedTypes,bt=Ee?Ee.createPolicy("lit-html",{createHTML:h(n=>n,"createHTML")}):void 0,yt="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,$t="?"+U,ti=`<${$t}>`,j=document,ve=h(()=>j.createComment(""),"c"),be=h(n=>n===null||typeof n!="object"&&typeof n!="function","a"),Oe=Array.isArray,ii=h(n=>Oe(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function","d"),ze=`[ 	
\f\r]`,ye=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wt=/-->/g,St=/>/g,q=RegExp(`>|${ze}(?:([^\\s"'>=/]+)(${ze}*=${ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pt=/'/g,Ct=/"/g,At=/^(?:script|style|textarea|title)$/i,ri=h(n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),"x"),p=ri(1),W=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Dt=new WeakMap,B=j.createTreeWalker(j,129);function kt(n,e){if(!Oe(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(e):e}h(kt,"V");const si=h((n,e)=>{const t=n.length-1,i=[];let r,s=e===2?"<svg>":e===3?"<math>":"",a=ye;for(let o=0;o<t;o++){const c=n[o];let d,g,f=-1,_=0;for(;_<c.length&&(a.lastIndex=_,g=a.exec(c),g!==null);)_=a.lastIndex,a===ye?g[1]==="!--"?a=wt:g[1]!==void 0?a=St:g[2]!==void 0?(At.test(g[2])&&(r=RegExp("</"+g[2],"g")),a=q):g[3]!==void 0&&(a=q):a===q?g[0]===">"?(a=r??ye,f=-1):g[1]===void 0?f=-2:(f=a.lastIndex-g[2].length,d=g[1],a=g[3]===void 0?q:g[3]==='"'?Ct:Pt):a===Ct||a===Pt?a=q:a===wt||a===St?a=ye:(a=q,r=void 0);const A=a===q&&n[o+1].startsWith("/>")?" ":"";s+=a===ye?c+ti:f>=0?(i.push(d),c.slice(0,f)+yt+c.slice(f)+U+A):c+U+(f===-2?o:A)}return[kt(n,s+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},"N"),Me=class Me{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,a=0;const o=e.length-1,c=this.parts,[d,g]=si(e,t);if(this.el=Me.createElement(d,i),B.currentNode=this.el.content,t===2||t===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=B.nextNode())!==null&&c.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(const f of r.getAttributeNames())if(f.endsWith(yt)){const _=g[a++],A=r.getAttribute(f).split(U),ge=/([.?@])?(.*)/.exec(_);c.push({type:1,index:s,name:ge[2],strings:A,ctor:ge[1]==="."?qe:ge[1]==="?"?Be:ge[1]==="@"?Ie:J}),r.removeAttribute(f)}else f.startsWith(U)&&(c.push({type:6,index:s}),r.removeAttribute(f));if(At.test(r.tagName)){const f=r.textContent.split(U),_=f.length-1;if(_>0){r.textContent=Ee?Ee.emptyScript:"";for(let A=0;A<_;A++)r.append(f[A],ve()),B.nextNode(),c.push({type:2,index:++s});r.append(f[_],ve())}}}else if(r.nodeType===8)if(r.data===$t)c.push({type:2,index:s});else{let f=-1;for(;(f=r.data.indexOf(U,f+1))!==-1;)c.push({type:7,index:s}),f+=U.length-1}s++}}static createElement(e,t){const i=j.createElement("template");return i.innerHTML=e,i}};h(Me,"S");let $e=Me;function K(n,e,t=n,i){var a,o;if(e===W)return e;let r=i!==void 0?(a=t._$Co)==null?void 0:a[i]:t._$Cl;const s=be(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((o=r==null?void 0:r._$AO)==null||o.call(r,!1),s===void 0?r=void 0:(r=new s(n),r._$AT(n,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=K(n,r._$AS(n,e.values),r,i)),e}h(K,"M");const at=class at{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??j).importNode(t,!0);B.currentNode=r;let s=B.nextNode(),a=0,o=0,c=i[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new we(s,s.nextSibling,this,e):c.type===1?d=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(d=new He(s,this,e)),this._$AV.push(d),c=i[++o]}a!==(c==null?void 0:c.index)&&(s=B.nextNode(),a++)}return B.currentNode=j,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};h(at,"R");let je=at;const Te=class Te{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),be(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==W&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ii(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&be(this._$AH)?this._$AA.nextSibling.data=e:this.T(j.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=$e.createElement(kt(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(t);else{const a=new je(r,this),o=a.u(this.options);a.p(t),this.T(o),this._$AH=a}}_$AC(e){let t=Dt.get(e.strings);return t===void 0&&Dt.set(e.strings,t=new $e(e)),t}k(e){Oe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new Te(this.O(ve()),this.O(ve()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const r=vt(e).nextSibling;vt(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}};h(Te,"k");let we=Te;const nt=class nt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=v}_$AI(e,t=this,i,r){const s=this.strings;let a=!1;if(s===void 0)e=K(this,e,t,0),a=!be(e)||e!==this._$AH&&e!==W,a&&(this._$AH=e);else{const o=e;let c,d;for(e=s[0],c=0;c<s.length-1;c++)d=K(this,o[i+c],t,c),d===W&&(d=this._$AH[c]),a||(a=!be(d)||d!==this._$AH[c]),d===v?e=v:e!==v&&(e+=(d??"")+s[c+1]),this._$AH[c]=d}a&&!r&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};h(nt,"H");let J=nt;const ot=class ot extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}};h(ot,"I");let qe=ot;const lt=class lt extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}};h(lt,"L");let Be=lt;const ct=class ct extends J{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??v)===W)return;const i=this._$AH,r=e===v&&i!==v||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==v&&(i===v||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}};h(ct,"z");let Ie=ct;const ut=class ut{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}};h(ut,"Z");let He=ut;const Ve=me.litHtmlPolyfillSupport;Ve==null||Ve($e,we),(me.litHtmlVersions??(me.litHtmlVersions=[])).push("3.3.2");const ai=h((n,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const s=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new we(e.insertBefore(ve(),s),s,void 0,t??{})}return r._$AI(n),r},"D");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=globalThis,ht=class ht extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ai(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return W}};h(ht,"i");let $=ht;$._$litElement$=!0,$.finalized=!0,(It=I.litElementHydrateSupport)==null||It.call(I,{LitElement:$});const Qe=I.litElementPolyfillSupport;Qe==null||Qe({LitElement:$}),(I.litElementVersions??(I.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=h(n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)},"t");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ni={attribute:!0,type:String,converter:ke,reflect:!1,hasChanged:Ue},oi=h((n=ni,e,t)=>{const{kind:i,metadata:r}=t;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),s.set(t.name,n),i==="accessor"){const{name:a}=t;return{set(o){const c=e.get.call(this);e.set.call(this,o),this.requestUpdate(a,c,n,!0,o)},init(o){return o!==void 0&&this.C(a,void 0,n,o),o}}}if(i==="setter"){const{name:a}=t;return function(o){const c=this[a];e.call(this,o),this.requestUpdate(a,c,n,!0,o)}}throw Error("Unsupported decorator location: "+i)},"r$1");function u(n){return(e,t)=>typeof t=="object"?oi(n,e,t):((i,r,s)=>{const a=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),a?Object.getOwnPropertyDescriptor(r,s):void 0})(n,e,t)}h(u,"n");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(n){return u({...n,state:!0,attribute:!1})}h(m,"r");function b(n,e){if(!e||e.trim()==="")return n;const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=n;for(const s of i){if(r==null||typeof r!="object")return;r=r[s]}return r}h(b,"getByPath");function li(n,e){return b(n,e)!==void 0}h(li,"hasPath");function Et(n,e,t){const r=e.replace(/\[(\d+)\]/g,".$1").split(".");let s=n;for(let a=0;a<r.length-1;a++){const o=r[a];(!(o in s)||typeof s[o]!="object"||s[o]===null)&&(s[o]={}),s=s[o]}s[r[r.length-1]]=t}h(Et,"setByPath");function ci(n,e,t){const i=b(n,e);return i!==void 0?i:t}h(ci,"getByPathOrDefault");const ui="https://chartsbuilder.matge.com/beacon",Rt=new Set;function T(n,e){const t=`${n}:${e||""}`;if(Rt.has(t)||(Rt.add(t),typeof window>"u"))return;const i=window.location.hostname;if(i==="localhost"||i==="127.0.0.1"||i==="chartsbuilder.matge.com")return;const r=new URLSearchParams;r.set("c",n),e&&r.set("t",e);const s=`${ui}?${r.toString()}`;try{fetch(s,{method:"GET",keepalive:!0,mode:"no-cors"}).catch(()=>{})}catch{}}h(T,"sendWidgetBeacon");function We(n){return n?String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}h(We,"escapeHtml");function Gt(n,e=!1){if(typeof n=="number")return isNaN(n)?e?null:0:n;if(typeof n!="string")return e?null:0;let t=n.trim();if(t==="")return e?null:0;t=t.replace(/\s/g,"");const i=t.includes(","),r=t.includes(".");if(i&&r){const a=t.lastIndexOf(","),o=t.lastIndexOf(".");a>o?t=t.replace(/\./g,"").replace(",","."):t=t.replace(/,/g,"")}else i&&(t=t.replace(",","."));const s=parseFloat(t);return isNaN(s)?e?null:0:s}h(Gt,"toNumber");function hi(n){if(typeof n!="string")return!1;const e=n.trim();return e===""?!1:/^-?[\d\s]+([.,]\d+)?$/.test(e)}h(hi,"looksLikeNumber");function di(n){return!n||typeof n!="string"||["N/A","null","undefined","00",""].includes(n)?!1:!!(n==="2A"||n==="2B"||/^97[1-6]$/.test(n)||/^(0[1-9]|[1-8]\d|9[0-5])$/.test(n))}h(di,"isValidDeptCode");const Ke={baseUrl:"https://chartsbuilder.matge.com",endpoints:{grist:"/grist-proxy",gristGouv:"/grist-gouv-proxy",albert:"/albert-proxy",tabular:"/tabular-proxy"}};function pi(){return typeof window<"u"&&window.location.hostname==="localhost"&&window.location.port==="5173"}h(pi,"isViteDevMode");function fi(){return typeof window<"u"&&"__TAURI__"in window}h(fi,"isTauriMode");function Ft(){var i;const n={...Ke.endpoints};return pi()?{baseUrl:"",endpoints:n}:fi()?{baseUrl:Ke.baseUrl,endpoints:n}:{baseUrl:((i={url:typeof document>"u"&&typeof location>"u"?require("url").pathToFileURL(__filename).href:typeof document>"u"?location.href:M&&M.tagName.toUpperCase()==="SCRIPT"&&M.src||new URL("gouv-widgets.umd.js",document.baseURI).href}.env)==null?void 0:i.VITE_PROXY_URL)||Ke.baseUrl,endpoints:n}}h(Ft,"getProxyConfig");function gi(n){const e=Ft();return n.includes("tabular-api.data.gouv.fr")?n.replace("https://tabular-api.data.gouv.fr",`${e.baseUrl}${e.endpoints.tabular}`):n.includes("docs.getgrist.com")?n.replace("https://docs.getgrist.com",`${e.baseUrl}${e.endpoints.grist}`):n.includes("grist.numerique.gouv.fr")?n.replace("https://grist.numerique.gouv.fr",`${e.baseUrl}${e.endpoints.gristGouv}`):n.includes("albert.api.etalab.gouv.fr")?n.replace("https://albert.api.etalab.gouv.fr",`${e.baseUrl}${e.endpoints.albert}`):n}h(gi,"getProxiedUrl");const k={LOADED:"gouv-data-loaded",ERROR:"gouv-data-error",LOADING:"gouv-data-loading",PAGE_REQUEST:"gouv-page-request"},Je=new Map,Xe=new Map;function _i(n,e){Je.set(n,e)}h(_i,"setDataCache");function H(n){return Je.get(n)}h(H,"getDataCache");function Se(n){Je.delete(n)}h(Se,"clearDataCache");function Mt(n,e){Xe.set(n,e)}h(Mt,"setDataMeta");function Ze(n){return Xe.get(n)}h(Ze,"getDataMeta");function Tt(n){Xe.delete(n)}h(Tt,"clearDataMeta");function O(n,e){_i(n,e);const t=new CustomEvent(k.LOADED,{bubbles:!0,composed:!0,detail:{sourceId:n,data:e}});document.dispatchEvent(t)}h(O,"dispatchDataLoaded");function x(n,e){const t=new CustomEvent(k.ERROR,{bubbles:!0,composed:!0,detail:{sourceId:n,error:e}});document.dispatchEvent(t)}h(x,"dispatchDataError");function L(n){const e=new CustomEvent(k.LOADING,{bubbles:!0,composed:!0,detail:{sourceId:n}});document.dispatchEvent(e)}h(L,"dispatchDataLoading");function Pe(n,e){const t=new CustomEvent(k.PAGE_REQUEST,{bubbles:!0,composed:!0,detail:{sourceId:n,page:e}});document.dispatchEvent(t)}h(Pe,"dispatchPageRequest");function xt(n,e){const t=h(i=>{const r=i;r.detail.sourceId===n&&e(r.detail.page)},"handler");return document.addEventListener(k.PAGE_REQUEST,t),()=>document.removeEventListener(k.PAGE_REQUEST,t)}h(xt,"subscribeToPageRequests");function X(n,e){const t=h(s=>{const a=s;a.detail.sourceId===n&&e.onLoaded&&e.onLoaded(a.detail.data)},"handleLoaded"),i=h(s=>{const a=s;a.detail.sourceId===n&&e.onError&&e.onError(a.detail.error)},"handleError"),r=h(s=>{s.detail.sourceId===n&&e.onLoading&&e.onLoading()},"handleLoading");return document.addEventListener(k.LOADED,t),document.addEventListener(k.ERROR,i),document.addEventListener(k.LOADING,r),()=>{document.removeEventListener(k.LOADED,t),document.removeEventListener(k.ERROR,i),document.removeEventListener(k.LOADING,r)}}h(X,"subscribeToSource");var E=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.GouvSource=(te=class extends ${constructor(){super(...arguments),this.url="",this.method="GET",this.headers="",this.params="",this.refresh=0,this.transform="",this.paginate=!1,this.pageSize=20,this._loading=!1,this._error=null,this._data=null,this._currentPage=1,this._refreshInterval=null,this._abortController=null,this._unsubscribePageRequests=null}createRenderRoot(){return this}render(){return p``}connectedCallback(){super.connectedCallback(),T("gouv-source"),this._setupRefresh(),this._setupPageRequestListener()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&(Se(this.id),Tt(this.id))}updated(e){(e.has("url")||e.has("params")||e.has("transform"))&&(this.paginate&&(e.has("url")||e.has("params"))&&(this._currentPage=1),this._fetchData()),e.has("refresh")&&this._setupRefresh(),(e.has("paginate")||e.has("pageSize"))&&this._setupPageRequestListener()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null),this._unsubscribePageRequests&&(this._unsubscribePageRequests(),this._unsubscribePageRequests=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._fetchData()},this.refresh*1e3))}async _fetchData(){if(this.url){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,L(this.id);try{const e=gi(this._buildUrl()),t=this._buildFetchOptions(),i=await fetch(e,{...t,signal:this._abortController.signal});if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);const r=await i.json();this.paginate&&r.meta&&Mt(this.id,{page:r.meta.page??this._currentPage,pageSize:r.meta.page_size??this.pageSize,total:r.meta.total??0}),this.transform?this._data=b(r,this.transform):this.paginate&&r.data&&!this.transform?this._data=r.data:this._data=r,O(this.id,this._data)}catch(e){if(e.name==="AbortError")return;this._error=e,x(this.id,this._error),console.error(`gouv-source[${this.id}]: Erreur de chargement`,e)}finally{this._loading=!1}}}_buildUrl(){const e=window.location.origin!=="null"?window.location.origin:void 0,t=new URL(this.url,e);if(this.params&&this.method==="GET")try{const i=JSON.parse(this.params);Object.entries(i).forEach(([r,s])=>{t.searchParams.set(r,String(s))})}catch(i){console.warn("gouv-source: params invalides (JSON attendu)",i)}return this.paginate&&(t.searchParams.set("page",String(this._currentPage)),t.searchParams.set("page_size",String(this.pageSize))),t.toString()}_buildFetchOptions(){const e={method:this.method};if(this.headers)try{e.headers=JSON.parse(this.headers)}catch(t){console.warn("gouv-source: headers invalides (JSON attendu)",t)}return this.method==="POST"&&this.params&&(e.headers={"Content-Type":"application/json",...e.headers||{}},e.body=this.params),e}_setupPageRequestListener(){this._unsubscribePageRequests&&(this._unsubscribePageRequests(),this._unsubscribePageRequests=null),this.paginate&&this.id&&(this._unsubscribePageRequests=xt(this.id,e=>{e!==this._currentPage&&(this._currentPage=e,this._fetchData())}))}reload(){this._fetchData()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},h(te,"GouvSource"),te),E([u({type:String})],l.GouvSource.prototype,"url",void 0),E([u({type:String})],l.GouvSource.prototype,"method",void 0),E([u({type:String})],l.GouvSource.prototype,"headers",void 0),E([u({type:String})],l.GouvSource.prototype,"params",void 0),E([u({type:Number})],l.GouvSource.prototype,"refresh",void 0),E([u({type:String})],l.GouvSource.prototype,"transform",void 0),E([u({type:Boolean})],l.GouvSource.prototype,"paginate",void 0),E([u({type:Number,attribute:"page-size"})],l.GouvSource.prototype,"pageSize",void 0),E([m()],l.GouvSource.prototype,"_loading",void 0),E([m()],l.GouvSource.prototype,"_error",void 0),E([m()],l.GouvSource.prototype,"_data",void 0),l.GouvSource=E([D("gouv-source")],l.GouvSource);var w=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};const Re=100,Ye=10,Ge=100,et=500;l.GouvQuery=(ie=class extends ${constructor(){super(...arguments),this.apiType="generic",this.source="",this.baseUrl="",this.datasetId="",this.resource="",this.select="",this.where="",this.filter="",this.groupBy="",this.aggregate="",this.orderBy="",this.limit=0,this.transform="",this.refresh=0,this._loading=!1,this._error=null,this._data=[],this._rawData=[],this._refreshInterval=null,this._abortController=null,this._unsubscribe=null}createRenderRoot(){return this}render(){return p``}connectedCallback(){super.connectedCallback(),T("gouv-query",this.apiType),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&Se(this.id)}updated(e){["source","apiType","baseUrl","dataset","resource","select","where","filter","groupBy","aggregate","orderBy","limit","transform"].some(i=>e.has(i))&&this._initialize(),e.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._initialize()},this.refresh*1e3))}_initialize(){if(!this.id){console.warn('gouv-query: attribut "id" requis pour identifier la requête');return}this.apiType==="generic"?this._subscribeToSource():this._fetchFromApi()}_subscribeToSource(){if(!this.source){console.warn('gouv-query: attribut "source" requis en mode generic');return}this._unsubscribe&&this._unsubscribe();const e=H(this.source);e!==void 0&&(this._rawData=Array.isArray(e)?e:[e],this._processClientSide()),this._unsubscribe=X(this.source,{onLoaded:h(t=>{this._rawData=Array.isArray(t)?t:[t],this._processClientSide()},"onLoaded"),onLoading:h(()=>{this._loading=!0,L(this.id)},"onLoading"),onError:h(t=>{this._error=t,this._loading=!1,x(this.id,t)},"onError")})}_processClientSide(){try{L(this.id),this._loading=!0;let e=[...this._rawData];const t=this.filter||this.where;t&&(e=this._applyFilters(e,t)),this.groupBy&&(e=this._applyGroupByAndAggregate(e)),this.orderBy&&(e=this._applySort(e)),this.limit>0&&(e=e.slice(0,this.limit)),this._data=e,O(this.id,this._data)}catch(e){this._error=e,x(this.id,this._error),console.error(`gouv-query[${this.id}]: Erreur de traitement`,e)}finally{this._loading=!1}}_applyFilters(e,t){const i=this._parseFilters(t);return e.filter(r=>i.every(s=>this._matchesFilter(r,s)))}_parseFilters(e){const t=[],i=e.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const s=r.split(":");if(s.length>=2){const a=s[0],o=s[1];let c;if(s.length>2){const d=s.slice(2).join(":");o==="in"||o==="notin"?c=d.split("|").map(g=>{const f=this._parseValue(g);return typeof f=="boolean"?String(f):f}):c=this._parseValue(d)}t.push({field:a,operator:o,value:c})}}return t}_parseValue(e){return e==="true"?!0:e==="false"?!1:!isNaN(Number(e))&&e!==""?Number(e):e}_matchesFilter(e,t){const i=b(e,t.field);switch(t.operator){case"eq":return i==t.value;case"neq":return i!=t.value;case"gt":return Number(i)>Number(t.value);case"gte":return Number(i)>=Number(t.value);case"lt":return Number(i)<Number(t.value);case"lte":return Number(i)<=Number(t.value);case"contains":return String(i).toLowerCase().includes(String(t.value).toLowerCase());case"notcontains":return!String(i).toLowerCase().includes(String(t.value).toLowerCase());case"in":return Array.isArray(t.value)&&t.value.includes(i);case"notin":return Array.isArray(t.value)&&!t.value.includes(i);case"isnull":return i==null;case"isnotnull":return i!=null;default:return!0}}_applyGroupByAndAggregate(e){const t=this.groupBy.split(",").map(a=>a.trim()).filter(Boolean),i=this._parseAggregates(this.aggregate),r=new Map;for(const a of e){const o=t.map(c=>String(b(a,c)??"")).join("|||");r.has(o)||r.set(o,[]),r.get(o).push(a)}const s=[];for(const[a,o]of r){const c={},d=a.split("|||");t.forEach((g,f)=>{Et(c,g,d[f])});for(const g of i){const f=g.alias||`${g.field}__${g.function}`;Et(c,f,this._computeAggregate(o,g))}s.push(c)}return s}_parseAggregates(e){if(!e)return[];const t=[],i=e.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const s=r.split(":");s.length>=2&&t.push({field:s[0],function:s[1],alias:s[2]})}return t}_computeAggregate(e,t){const i=e.map(r=>Number(b(r,t.field))).filter(r=>!isNaN(r));switch(t.function){case"count":return e.length;case"sum":return i.reduce((r,s)=>r+s,0);case"avg":return i.length>0?i.reduce((r,s)=>r+s,0)/i.length:0;case"min":return i.length>0?Math.min(...i):0;case"max":return i.length>0?Math.max(...i):0;default:return 0}}_applySort(e){const t=this.orderBy.split(":");if(t.length<1)return e;const i=t[0],r=(t[1]||"asc").toLowerCase();return[...e].sort((s,a)=>{const o=b(s,i),c=b(a,i),d=Number(o),g=Number(c);if(!isNaN(d)&&!isNaN(g))return r==="desc"?g-d:d-g;const f=String(o??""),_=String(c??"");return r==="desc"?_.localeCompare(f):f.localeCompare(_)})}async _fetchFromApi(){if(this.apiType==="opendatasoft"&&!this.datasetId){console.warn('gouv-query: attribut "dataset-id" requis pour les requêtes OpenDataSoft');return}if(this.apiType==="tabular"&&!this.resource){console.warn('gouv-query: attribut "resource" requis pour les requêtes Tabular');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,L(this.id);try{this.apiType==="opendatasoft"?await this._fetchFromOdsWithPagination():this.apiType==="tabular"?await this._fetchFromTabularWithPagination():await this._fetchSinglePage()}catch(e){if(e.name==="AbortError")return;this._error=e,x(this.id,this._error),console.error(`gouv-query[${this.id}]: Erreur de requête API`,e)}finally{this._loading=!1}}async _fetchSinglePage(){const e=this._buildApiUrl(),t=await fetch(e,{signal:this._abortController.signal});if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);const i=await t.json();let r=this.transform?b(i,this.transform):i;Array.isArray(r)||(this.apiType==="tabular"&&i.data?r=i.data:r=[r]),this._data=r,O(this.id,this._data)}async _fetchFromOdsWithPagination(){const t=this.limit<=0?Ye*Re:this.limit,i=Re;let r=[],s=0,a=-1;for(let o=0;o<Ye;o++){const c=t-r.length;if(c<=0)break;const d=this._buildOpenDataSoftUrl(Math.min(i,c),s),g=await fetch(d,{signal:this._abortController.signal});if(!g.ok)throw new Error(`HTTP ${g.status}: ${g.statusText}`);const f=await g.json(),_=f.results||[];if(r=r.concat(_),typeof f.total_count=="number"&&(a=f.total_count),a>=0&&r.length>=a||_.length<i)break;s+=_.length}a>=0&&r.length<a&&r.length<t&&console.warn(`gouv-query[${this.id}]: pagination incomplete - ${r.length}/${a} resultats recuperes (limite de securite: ${Ye} pages de ${Re})`),this._data=this.transform?b(r,this.transform):r,O(this.id,this._data)}async _fetchFromTabularWithPagination(){var a;const e=this.limit<=0,t=e?et*Ge:this.limit;let i=[],r=-1,s=1;for(let o=0;o<et&&!(t-i.length<=0);o++){const d=this._buildTabularUrl(Ge,s),g=await fetch(d,{signal:this._abortController.signal});if(!g.ok)throw new Error(`HTTP ${g.status}: ${g.statusText}`);const f=await g.json(),_=f.data||[];i=i.concat(_),f.meta&&typeof f.meta.total=="number"&&(r=f.meta.total);let A=!1;if((a=f.links)!=null&&a.next)try{const ge=new URL(f.links.next,"https://tabular-api.data.gouv.fr"),Ht=Number(ge.searchParams.get("page"));Ht>0&&(s=Ht,A=!0)}catch{}if(!A||r>=0&&i.length>=r||_.length<Ge)break}!e&&i.length>t&&(i=i.slice(0,t)),r>=0&&i.length<r&&i.length<t&&console.warn(`gouv-query[${this.id}]: pagination incomplete - ${i.length}/${r} resultats recuperes (limite de securite: ${et} pages de ${Ge})`),this._rawData=i,this._processClientSide()}_buildApiUrl(){if(this.apiType==="opendatasoft")return this._buildOpenDataSoftUrl();if(this.apiType==="tabular")return this._buildTabularUrl();throw new Error(`Type d'API non supporté: ${this.apiType}`)}_buildOpenDataSoftUrl(e,t){const i=this.baseUrl||"https://data.opendatasoft.com",r=new URL(`${i}/api/explore/v2.1/catalog/datasets/${this.datasetId}/records`);if(this.select)r.searchParams.set("select",this.select);else if(this.aggregate&&this.groupBy){const a=this._parseAggregates(this.aggregate),o=[];for(const d of a){const g=d.function==="count"?"count(*)":`${d.function}(${d.field})`,f=d.alias||`${d.field}__${d.function}`;o.push(`${g} as ${f}`)}const c=this.groupBy.split(",").map(d=>d.trim()).filter(Boolean);for(const d of c)o.push(d);r.searchParams.set("select",o.join(", "))}const s=this.where||this.filter;if(s&&r.searchParams.set("where",s),this.groupBy&&r.searchParams.set("group_by",this.groupBy),this.orderBy){const a=this.orderBy.replace(/:(\w+)$/,(o,c)=>` ${c.toUpperCase()}`);r.searchParams.set("order_by",a)}return e!==void 0?r.searchParams.set("limit",String(e)):this.limit>0&&r.searchParams.set("limit",String(Math.min(this.limit,Re))),t&&t>0&&r.searchParams.set("offset",String(t)),r.toString()}_buildTabularUrl(e,t){let i;if(this.baseUrl)i=this.baseUrl;else{const o=Ft();i=`${o.baseUrl}${o.endpoints.tabular}`}if(!this.resource)throw new Error(`gouv-query: attribut "resource" requis pour l'API Tabular`);const r=window.location.origin!=="null"?window.location.origin:void 0,s=new URL(`${i}/api/resources/${this.resource}/data/`,r),a=this.filter||this.where;if(a){const o=a.split(",").map(c=>c.trim());for(const c of o){const d=c.split(":");if(d.length>=3){const g=d[0],f=this._mapOperatorToTabular(d[1]),_=d.slice(2).join(":");s.searchParams.set(`${g}__${f}`,_)}}}if(this.groupBy){const o=this.groupBy.split(",").map(c=>c.trim());for(const c of o)s.searchParams.append(`${c}__groupby`,"")}if(this.aggregate){const o=this.aggregate.split(",").map(c=>c.trim());for(const c of o){const d=c.split(":");if(d.length>=2){const g=d[0],f=d[1];s.searchParams.append(`${g}__${f}`,"")}}}if(this.orderBy){const o=this.orderBy.split(":"),c=o[0],d=o[1]||"asc";s.searchParams.set(`${c}__sort`,d)}return e?s.searchParams.set("page_size",String(e)):this.limit>0&&s.searchParams.set("page_size",String(this.limit)),t&&s.searchParams.set("page",String(t)),s.toString()}_mapOperatorToTabular(e){return{eq:"exact",neq:"differs",gt:"strictly_greater",gte:"greater",lt:"strictly_less",lte:"less",contains:"contains",notcontains:"notcontains",in:"in",notin:"notin",isnull:"isnull",isnotnull:"isnotnull"}[e]||e}reload(){this._initialize()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},h(ie,"GouvQuery"),ie),w([u({type:String,attribute:"api-type"})],l.GouvQuery.prototype,"apiType",void 0),w([u({type:String})],l.GouvQuery.prototype,"source",void 0),w([u({type:String,attribute:"base-url"})],l.GouvQuery.prototype,"baseUrl",void 0),w([u({type:String,attribute:"dataset-id"})],l.GouvQuery.prototype,"datasetId",void 0),w([u({type:String})],l.GouvQuery.prototype,"resource",void 0),w([u({type:String})],l.GouvQuery.prototype,"select",void 0),w([u({type:String})],l.GouvQuery.prototype,"where",void 0),w([u({type:String})],l.GouvQuery.prototype,"filter",void 0),w([u({type:String,attribute:"group-by"})],l.GouvQuery.prototype,"groupBy",void 0),w([u({type:String})],l.GouvQuery.prototype,"aggregate",void 0),w([u({type:String,attribute:"order-by"})],l.GouvQuery.prototype,"orderBy",void 0),w([u({type:Number})],l.GouvQuery.prototype,"limit",void 0),w([u({type:String})],l.GouvQuery.prototype,"transform",void 0),w([u({type:Number})],l.GouvQuery.prototype,"refresh",void 0),w([m()],l.GouvQuery.prototype,"_loading",void 0),w([m()],l.GouvQuery.prototype,"_error",void 0),w([m()],l.GouvQuery.prototype,"_data",void 0),w([m()],l.GouvQuery.prototype,"_rawData",void 0),l.GouvQuery=w([D("gouv-query")],l.GouvQuery);var F=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.GouvNormalize=(re=class extends ${constructor(){super(...arguments),this.source="",this.numeric="",this.numericAuto=!1,this.rename="",this.trim=!1,this.stripHtml=!1,this.replace="",this.flatten="",this.lowercaseKeys=!1,this._unsubscribe=null,this._unsubscribePageRequests=null}createRenderRoot(){return this}render(){return p``}connectedCallback(){super.connectedCallback(),T("gouv-normalize"),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this._unsubscribePageRequests&&(this._unsubscribePageRequests(),this._unsubscribePageRequests=null),this.id&&(Se(this.id),Tt(this.id))}updated(e){if(super.updated(e),e.has("source")){this._initialize();return}if(["flatten","numeric","numericAuto","rename","trim","stripHtml","replace","lowercaseKeys"].some(r=>e.has(r))){const r=this.source?H(this.source):void 0;r!==void 0&&this._processData(r)}}_initialize(){if(!this.id){console.warn('gouv-normalize: attribut "id" requis pour identifier la sortie');return}if(!this.source){console.warn('gouv-normalize: attribut "source" requis');return}this._unsubscribe&&this._unsubscribe(),this._unsubscribePageRequests&&(this._unsubscribePageRequests(),this._unsubscribePageRequests=null);const e=H(this.source);e!==void 0&&this._processData(e),this._unsubscribe=X(this.source,{onLoaded:h(t=>{this._processData(t)},"onLoaded"),onLoading:h(()=>{L(this.id)},"onLoading"),onError:h(t=>{x(this.id,t)},"onError")}),this._unsubscribePageRequests=xt(this.id,t=>{Pe(this.source,t)})}_processData(e){try{L(this.id);let t=Array.isArray(e)?e:[e];this.flatten&&(t=t.map(c=>c==null||typeof c!="object"||Array.isArray(c)?c:this._flattenRow(c,this.flatten)));const i=this._parseNumericFields(),r=this._parsePipeMap(this.rename),s=this._parsePipeMap(this.replace),a=t.map(c=>c==null||typeof c!="object"?c:this._normalizeRow(c,i,r,s));O(this.id,a);const o=Ze(this.source);o&&Mt(this.id,o)}catch(t){x(this.id,t),console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`,t)}}_normalizeRow(e,t,i,r){const s={};for(const[a,o]of Object.entries(e)){const c=this.trim?a.trim():a;let d=o;if(this.trim&&typeof d=="string"&&(d=d.trim()),this.stripHtml&&typeof d=="string"&&(d=d.replace(/<[^>]*>/g,"")),r.size>0&&typeof d=="string"){for(const[_,A]of r)if(d===_){d=A;break}}if(t.has(c))d=Gt(d);else if(this.numericAuto&&typeof d=="string"&&hi(d)){const _=Gt(d,!0);_!==null&&(d=_)}const g=i.get(c)??c,f=this.lowercaseKeys?g.toLowerCase():g;s[f]=d}return s}_flattenRow(e,t){const i=this._resolvePath(e,t);if(i&&typeof i=="object"&&!Array.isArray(i)){const r={...e};return this._deleteByPath(r,t),Object.assign(r,i),r}return e}_resolvePath(e,t){return t.split(".").reduce((i,r)=>i!=null&&typeof i=="object"?i[r]:void 0,e)}_deleteByPath(e,t){const i=t.split(".");delete e[i[0]]}_parseNumericFields(){return this.numeric?new Set(this.numeric.split(",").map(e=>e.trim()).filter(Boolean)):new Set}_parsePipeMap(e){const t=new Map;if(!e)return t;const i=e.split("|");for(const r of i){const s=r.indexOf(":");if(s===-1)continue;const a=r.substring(0,s).trim(),o=r.substring(s+1).trim();a&&t.set(a,o)}return t}},h(re,"GouvNormalize"),re),F([u({type:String})],l.GouvNormalize.prototype,"source",void 0),F([u({type:String})],l.GouvNormalize.prototype,"numeric",void 0),F([u({type:Boolean,attribute:"numeric-auto"})],l.GouvNormalize.prototype,"numericAuto",void 0),F([u({type:String})],l.GouvNormalize.prototype,"rename",void 0),F([u({type:Boolean})],l.GouvNormalize.prototype,"trim",void 0),F([u({type:Boolean,attribute:"strip-html"})],l.GouvNormalize.prototype,"stripHtml",void 0),F([u({type:String})],l.GouvNormalize.prototype,"replace",void 0),F([u({type:String})],l.GouvNormalize.prototype,"flatten",void 0),F([u({type:Boolean,attribute:"lowercase-keys"})],l.GouvNormalize.prototype,"lowercaseKeys",void 0),l.GouvNormalize=F([D("gouv-normalize")],l.GouvNormalize);var S=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.GouvFacets=(se=class extends ${constructor(){super(...arguments),this.source="",this.fields="",this.labels="",this.maxValues=6,this.disjunctive="",this.sort="count",this.searchable="",this.hideEmpty=!1,this.display="",this.urlParams=!1,this.urlParamMap="",this.urlSync=!1,this._rawData=[],this._facetGroups=[],this._activeSelections={},this._expandedFacets=new Set,this._searchQueries={},this._openMultiselectField=null,this._unsubscribe=null,this._popstateHandler=null,this._urlParamsApplied=!1,this._onClickOutsideMultiselect=e=>{if(!this._openMultiselectField)return;const t=e.target,i=this.querySelector(`[data-multiselect="${this._openMultiselectField}"]`);i&&!i.contains(t)&&(this._openMultiselectField=null)}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),T("gouv-facets"),this._initialize(),document.addEventListener("click",this._onClickOutsideMultiselect),this.urlSync&&(this._popstateHandler=()=>{this._applyUrlParams(),this._buildFacetGroups(),this._applyFilters()},window.addEventListener("popstate",this._popstateHandler))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onClickOutsideMultiselect),this._popstateHandler&&(window.removeEventListener("popstate",this._popstateHandler),this._popstateHandler=null),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this.id&&Se(this.id)}updated(e){if(super.updated(e),e.has("source")){this._initialize();return}["fields","labels","sort","hideEmpty","maxValues","disjunctive","searchable","display"].some(r=>e.has(r))&&this._rawData.length>0&&(this._buildFacetGroups(),this._applyFilters())}_initialize(){if(!this.id){console.warn('gouv-facets: attribut "id" requis pour identifier la sortie');return}if(!this.source){console.warn('gouv-facets: attribut "source" requis');return}this._unsubscribe&&this._unsubscribe(),this._activeSelections={},this._expandedFacets=new Set,this._searchQueries={};const e=H(this.source);e!==void 0&&this._onData(e),this._unsubscribe=X(this.source,{onLoaded:h(t=>{this._onData(t)},"onLoaded"),onLoading:h(()=>{L(this.id)},"onLoading"),onError:h(t=>{x(this.id,t)},"onError")})}_onData(e){this._rawData=Array.isArray(e)?e:[],this.urlParams&&!this._urlParamsApplied&&(this._applyUrlParams(),this._urlParamsApplied=!0),this._buildFacetGroups(),this._applyFilters()}_buildFacetGroups(){const e=this._getFields(),t=this._parseLabels();this._facetGroups=e.map(i=>{const r=this._computeFacetValues(i);return{field:i,label:t.get(i)??i,values:r}}).filter(i=>this.hideEmpty&&i.values.length<=1?!1:i.values.length>0)}_getFields(){return this.fields?tt(this.fields):this._autoDetectFields()}_autoDetectFields(){if(this._rawData.length===0)return[];const e=[],t=this._rawData[0];for(const i of Object.keys(t)){const r=new Set;let s=!0;for(const a of this._rawData){const o=a[i];if(!(o==null||o==="")){if(typeof o!="string"){s=!1;break}if(r.add(o),r.size>50)break}}s&&(r.size<=1||r.size>50||r.size!==this._rawData.length&&e.push(i))}return e}_computeFacetValues(e){const t=this._getDataFilteredExcluding(e),i=new Map;for(const s of t){const a=s[e];if(a==null||a==="")continue;const o=String(a);i.set(o,(i.get(o)??0)+1)}const r=[];for(const[s,a]of i)r.push({value:s,count:a});return this._sortValues(r)}_getDataFilteredExcluding(e){const t=Object.keys(this._activeSelections).filter(i=>i!==e&&this._activeSelections[i].size>0);return t.length===0?this._rawData:this._rawData.filter(i=>t.every(r=>{const s=this._activeSelections[r],a=i[r];return a==null?!1:s.has(String(a))}))}_sortValues(e){const t=[...e];switch(this.sort){case"count":t.sort((i,r)=>r.count-i.count);break;case"-count":t.sort((i,r)=>i.count-r.count);break;case"alpha":t.sort((i,r)=>i.value.localeCompare(r.value,"fr"));break;case"-alpha":t.sort((i,r)=>r.value.localeCompare(i.value,"fr"));break;default:t.sort((i,r)=>r.count-i.count)}return t}_applyFilters(){const e=Object.keys(this._activeSelections).filter(i=>this._activeSelections[i].size>0);let t;e.length===0?t=this._rawData:t=this._rawData.filter(i=>e.every(r=>{const s=this._activeSelections[r],a=i[r];return a==null?!1:s.has(String(a))})),O(this.id,t)}_parseLabels(){const e=new Map;if(!this.labels)return e;const t=this.labels.split("|");for(const i of t){const r=i.indexOf(":");if(r===-1)continue;const s=i.substring(0,r).trim(),a=i.substring(r+1).trim();s&&e.set(s,a)}return e}_parseDisplayModes(){const e=new Map;if(!this.display)return e;const t=this.display.split("|");for(const i of t){const r=i.indexOf(":");if(r===-1)continue;const s=i.substring(0,r).trim(),a=i.substring(r+1).trim();s&&(a==="checkbox"||a==="select"||a==="multiselect")&&e.set(s,a)}return e}_getDisplayMode(e){return this._parseDisplayModes().get(e)??"checkbox"}_toggleValue(e,t){const i={...this._activeSelections},r=new Set(i[e]??[]),s=this._getDisplayMode(e),a=tt(this.disjunctive),o=s==="multiselect"||s==="checkbox"&&a.includes(e);r.has(t)?r.delete(t):(o||r.clear(),r.add(t)),r.size===0?delete i[e]:i[e]=r,this._activeSelections=i,this._buildFacetGroups(),this._applyFilters(),this.urlSync&&this._syncUrl()}_handleSelectChange(e,t){const r=t.target.value,s={...this._activeSelections};r?s[e]=new Set([r]):delete s[e],this._activeSelections=s,this._buildFacetGroups(),this._applyFilters(),this.urlSync&&this._syncUrl()}_clearFieldSelections(e){const t={...this._activeSelections};delete t[e],this._activeSelections=t,this._buildFacetGroups(),this._applyFilters(),this.urlSync&&this._syncUrl()}_toggleMultiselectDropdown(e){this._openMultiselectField=this._openMultiselectField===e?null:e}_toggleExpand(e){const t=new Set(this._expandedFacets);t.has(e)?t.delete(e):t.add(e),this._expandedFacets=t}_handleSearch(e,t){const i=t.target;this._searchQueries={...this._searchQueries,[e]:i.value}}_clearAll(){this._activeSelections={},this._searchQueries={},this._buildFacetGroups(),this._applyFilters(),this.urlSync&&this._syncUrl()}_parseUrlParamMap(){const e=new Map;if(!this.urlParamMap)return e;const t=this.urlParamMap.split("|");for(const i of t){const r=i.indexOf(":");if(r===-1)continue;const s=i.substring(0,r).trim(),a=i.substring(r+1).trim();s&&a&&e.set(s,a)}return e}_applyUrlParams(){const e=new URLSearchParams(window.location.search),t=this._parseUrlParamMap(),i={};for(const[r,s]of e.entries()){const a=t.size>0?t.get(r)??null:r;if(!a)continue;const o=s.split(",").map(c=>c.trim()).filter(Boolean);i[a]||(i[a]=new Set);for(const c of o)i[a].add(c)}Object.keys(i).length>0&&(this._activeSelections=i)}_syncUrl(){const e=new URLSearchParams,t=this._parseUrlParamMap(),i=new Map;for(const[a,o]of t)i.set(o,a);for(const[a,o]of Object.entries(this._activeSelections)){if(o.size===0)continue;const c=i.get(a)??a;e.set(c,[...o].join(","))}const r=e.toString(),s=r?`${window.location.pathname}?${r}${window.location.hash}`:`${window.location.pathname}${window.location.hash}`;window.history.replaceState(null,"",s)}render(){if(this._rawData.length===0||this._facetGroups.length===0)return v;const e=Object.keys(this._activeSelections).some(t=>this._activeSelections[t].size>0);return p`
      <style>
        .gouv-facets { margin-bottom: 1.5rem; }
        .gouv-facets__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .gouv-facets__groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
        .gouv-facets__group { min-width: 0; }
        .gouv-facets__legend { font-weight: 700; font-size: 0.875rem; margin-bottom: 0.5rem; display: block; }
        .gouv-facets__search { margin-bottom: 0.5rem; }
        .gouv-facets__search input { width: 100%; padding: 0.375rem 0.5rem; font-size: 0.8125rem; }
        .gouv-facets__values { list-style: none; padding: 0; margin: 0; }
        .gouv-facets__value { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; cursor: pointer; font-size: 0.875rem; }
        .gouv-facets__value:hover { background: var(--background-alt-grey, #f6f6f6); }
        .gouv-facets__value input[type="checkbox"] { flex-shrink: 0; }
        .gouv-facets__value-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .gouv-facets__value-count { flex-shrink: 0; font-size: 0.75rem; color: var(--text-mention-grey, #666); }
        .gouv-facets__more { background: none; border: none; color: var(--text-action-high-blue-france, #000091); cursor: pointer; font-size: 0.8125rem; padding: 0.25rem 0; margin-top: 0.25rem; }
        .gouv-facets__more:hover { text-decoration: underline; }
        .gouv-facets__multiselect { position: relative; }
        .gouv-facets__multiselect-trigger { width: 100%; display: flex; justify-content: space-between; align-items: center; text-align: left; font-weight: 400; }
        .gouv-facets__multiselect-panel { position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; background: var(--background-default-grey, #fff); border: 1px solid var(--border-default-grey, #ddd); border-radius: 0 0 0.25rem 0.25rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); max-height: 320px; overflow-y: auto; padding: 0.5rem; }
        .gouv-facets__multiselect-clear { width: 100%; text-align: left; margin-bottom: 0.5rem; }
        @media (max-width: 576px) { .gouv-facets__groups { grid-template-columns: 1fr; } }
      </style>
      <div class="gouv-facets">
        ${e?p`
          <div class="gouv-facets__header">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm" type="button" @click="${this._clearAll}">
              Reinitialiser les filtres
            </button>
          </div>
        `:v}
        <div class="gouv-facets__groups">
          ${this._facetGroups.map(t=>this._renderFacetGroup(t))}
        </div>
      </div>
    `}_renderFacetGroup(e){switch(this._getDisplayMode(e.field)){case"select":return this._renderSelectGroup(e);case"multiselect":return this._renderMultiselectGroup(e);default:return this._renderCheckboxGroup(e)}}_renderCheckboxGroup(e){const i=tt(this.searchable).includes(e.field),r=(this._searchQueries[e.field]??"").toLowerCase(),s=this._expandedFacets.has(e.field),a=this._activeSelections[e.field]??new Set;let o=e.values;i&&r&&(o=o.filter(f=>f.value.toLowerCase().includes(r)));const c=s?o:o.slice(0,this.maxValues),d=o.length>this.maxValues,g=`facet-${this.id}-${e.field}`;return p`
      <fieldset class="gouv-facets__group fr-fieldset" aria-labelledby="${g}-legend">
        <legend class="gouv-facets__legend" id="${g}-legend">${e.label}</legend>
        ${i?p`
          <div class="gouv-facets__search">
            <input class="fr-input fr-input--sm" type="search"
              placeholder="Rechercher..."
              .value="${this._searchQueries[e.field]??""}"
              @input="${f=>this._handleSearch(e.field,f)}"
              aria-label="Rechercher dans ${e.label}">
          </div>
        `:v}
        <ul class="gouv-facets__values" role="group">
          ${c.map(f=>{const _=`${g}-${f.value.replace(/[^a-zA-Z0-9]/g,"_")}`,A=a.has(f.value);return p`
              <li class="gouv-facets__value">
                <input type="checkbox" id="${_}"
                  .checked="${A}"
                  @change="${()=>this._toggleValue(e.field,f.value)}">
                <label class="gouv-facets__value-label" for="${_}">${f.value}</label>
                <span class="gouv-facets__value-count">${f.count}</span>
              </li>
            `})}
        </ul>
        ${d?p`
          <button class="gouv-facets__more" type="button"
            @click="${()=>this._toggleExpand(e.field)}">
            ${s?"Voir moins":`Voir plus (${o.length-this.maxValues})`}
          </button>
        `:v}
      </fieldset>
    `}_renderSelectGroup(e){const t=`facet-${this.id}-${e.field}`,i=this._activeSelections[e.field],r=i?[...i][0]??"":"";return p`
      <div class="gouv-facets__group fr-select-group" data-field="${e.field}">
        <label class="fr-label" for="${t}-select">${e.label}</label>
        <select class="fr-select" id="${t}-select"
          @change="${s=>this._handleSelectChange(e.field,s)}">
          <option value="" ?selected="${!r}">Tous</option>
          ${e.values.map(s=>p`
            <option value="${s.value}" ?selected="${s.value===r}">
              ${s.value} (${s.count})
            </option>
          `)}
        </select>
      </div>
    `}_renderMultiselectGroup(e){const t=`facet-${this.id}-${e.field}`,i=this._activeSelections[e.field]??new Set,r=this._openMultiselectField===e.field,s=(this._searchQueries[e.field]??"").toLowerCase();let a=e.values;s&&(a=a.filter(c=>c.value.toLowerCase().includes(s)));const o=i.size>0?`${i.size} option${i.size>1?"s":""} selectionnee${i.size>1?"s":""}`:"Selectionnez des options";return p`
      <div class="gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}">
        <label class="gouv-facets__legend" id="${t}-legend">${e.label}</label>
        <button class="fr-btn fr-btn--secondary fr-btn--sm gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${r}"
          aria-controls="${t}-panel"
          @click="${c=>{c.stopPropagation(),this._toggleMultiselectDropdown(e.field)}}">
          ${o}
          <span class="fr-icon-arrow-${r?"up":"down"}-s-line" aria-hidden="true"></span>
        </button>
        ${r?p`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               @click="${c=>c.stopPropagation()}">
            ${i.size>0?p`
              <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm gouv-facets__multiselect-clear"
                type="button"
                @click="${()=>this._clearFieldSelections(e.field)}">
                Tout deselectionner
              </button>
            `:v}
            <div class="gouv-facets__search">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field]??""}"
                @input="${c=>this._handleSearch(e.field,c)}"
                aria-label="Rechercher dans ${e.label}">
            </div>
            <ul class="gouv-facets__values" role="group">
              ${a.map(c=>{const d=`${t}-${c.value.replace(/[^a-zA-Z0-9]/g,"_")}`,g=i.has(c.value);return p`
                  <li class="gouv-facets__value">
                    <input type="checkbox" id="${d}"
                      .checked="${g}"
                      @change="${()=>this._toggleValue(e.field,c.value)}">
                    <label class="gouv-facets__value-label" for="${d}">${c.value}</label>
                    <span class="gouv-facets__value-count">${c.count}</span>
                  </li>
                `})}
            </ul>
          </div>
        `:v}
      </div>
    `}},h(se,"GouvFacets"),se),S([u({type:String})],l.GouvFacets.prototype,"source",void 0),S([u({type:String})],l.GouvFacets.prototype,"fields",void 0),S([u({type:String})],l.GouvFacets.prototype,"labels",void 0),S([u({type:Number,attribute:"max-values"})],l.GouvFacets.prototype,"maxValues",void 0),S([u({type:String})],l.GouvFacets.prototype,"disjunctive",void 0),S([u({type:String})],l.GouvFacets.prototype,"sort",void 0),S([u({type:String})],l.GouvFacets.prototype,"searchable",void 0),S([u({type:Boolean,attribute:"hide-empty"})],l.GouvFacets.prototype,"hideEmpty",void 0),S([u({type:String})],l.GouvFacets.prototype,"display",void 0),S([u({type:Boolean,attribute:"url-params"})],l.GouvFacets.prototype,"urlParams",void 0),S([u({type:String,attribute:"url-param-map"})],l.GouvFacets.prototype,"urlParamMap",void 0),S([u({type:Boolean,attribute:"url-sync"})],l.GouvFacets.prototype,"urlSync",void 0),S([m()],l.GouvFacets.prototype,"_rawData",void 0),S([m()],l.GouvFacets.prototype,"_facetGroups",void 0),S([m()],l.GouvFacets.prototype,"_activeSelections",void 0),S([m()],l.GouvFacets.prototype,"_expandedFacets",void 0),S([m()],l.GouvFacets.prototype,"_searchQueries",void 0),S([m()],l.GouvFacets.prototype,"_openMultiselectField",void 0),l.GouvFacets=S([D("gouv-facets")],l.GouvFacets);function tt(n){return n?n.split(",").map(e=>e.trim()).filter(Boolean):[]}h(tt,"_parseCSV");var P=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.GouvSearch=(ae=class extends ${constructor(){super(...arguments),this.source="",this.fields="",this.placeholder="Rechercher…",this.label="Rechercher",this.debounce=300,this.minLength=0,this.highlight=!1,this.operator="contains",this.srLabel=!1,this.count=!1,this.urlSearchParam="",this.urlSync=!1,this._allData=[],this._filteredData=[],this._term="",this._resultCount=0,this._debounceTimer=null,this._unsubscribe=null,this._urlParamApplied=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),T("gouv-search"),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._debounceTimer!==null&&(clearTimeout(this._debounceTimer),this._debounceTimer=null),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this.id&&Se(this.id)}updated(e){if(super.updated(e),e.has("source")){this._initialize();return}["fields","operator","minLength","highlight"].some(r=>e.has(r))&&this._allData.length>0&&this._applyFilter()}clear(){this._term="";const e=this.querySelector("input");e&&(e.value=""),this._applyFilter()}search(e){this._term=e;const t=this.querySelector("input");t&&(t.value=e),this._applyFilter()}getData(){return this._filteredData}setData(e){this._allData=Array.isArray(e)?e:[],this._applyFilter()}_initialize(){if(!this.id){console.warn('gouv-search: attribut "id" requis');return}if(!this.source){console.warn('gouv-search: attribut "source" requis');return}this._unsubscribe&&this._unsubscribe();const e=H(this.source);e!==void 0&&this._onData(e),this._unsubscribe=X(this.source,{onLoaded:h(t=>{this._onData(t)},"onLoaded"),onLoading:h(()=>{L(this.id)},"onLoading"),onError:h(t=>{x(this.id,t)},"onError")})}_onData(e){this._allData=Array.isArray(e)?e:[],this.urlSearchParam&&!this._urlParamApplied&&(this._applyUrlSearchParam(),this._urlParamApplied=!0),this._applyFilter()}_applyUrlSearchParam(){if(!this.urlSearchParam)return;const t=new URLSearchParams(window.location.search).get(this.urlSearchParam);t&&(this._term=t)}_applyFilter(){const e=this._term;if(!e||e.length<this.minLength)this._filteredData=[...this._allData];else{const t=this._getFields(),i=this.operator||"contains",r=this._normalize(e);this._filteredData=this._allData.filter(s=>this._matchRecord(s,r,t,i))}this.highlight&&e&&e.length>=this.minLength&&(this._filteredData=this._filteredData.map(t=>this._addHighlight(t,e))),this._resultCount=this._filteredData.length,this._dispatch()}_matchRecord(e,t,i,r){const s=i.length>0?i:Object.keys(e).filter(a=>!a.startsWith("_"));switch(r){case"starts":return s.some(a=>this._normalize(String(e[a]??"")).split(/\s+/).some(c=>c.startsWith(t)));case"words":return t.split(/\s+/).filter(Boolean).every(o=>s.some(c=>this._normalize(String(e[c]??"")).includes(o)));case"contains":default:return s.some(a=>this._normalize(String(e[a]??"")).includes(t))}}_normalize(e){return String(e).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}_getFields(){return this.fields?this.fields.split(",").map(e=>e.trim()).filter(Boolean):[]}_addHighlight(e,t){const i={...e},r=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp("("+r+")","gi"),a=this._getFields(),o=a.length>0?a:Object.keys(e).filter(d=>typeof e[d]=="string"),c=[];return o.forEach(d=>{typeof e[d]=="string"&&c.push(e[d].replace(s,"<mark>$1</mark>"))}),i._highlight=c.join(" … "),i}_onInput(e){this._term=e,this._debounceTimer!==null&&clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._debounceTimer=null,this._applyFilter()},this.debounce)}_onSubmit(){this._debounceTimer!==null&&(clearTimeout(this._debounceTimer),this._debounceTimer=null),this._applyFilter()}_dispatch(){this.id&&(O(this.id,this._filteredData),this.urlSync&&this.urlSearchParam&&this._syncUrl(),document.dispatchEvent(new CustomEvent("gouv-search-change",{bubbles:!0,composed:!0,detail:{sourceId:this.id,term:this._term,count:this._filteredData.length}})))}_syncUrl(){const e=new URLSearchParams(window.location.search);this._term?e.set(this.urlSearchParam,this._term):e.delete(this.urlSearchParam);const t=e.toString(),i=t?`${window.location.pathname}?${t}${window.location.hash}`:`${window.location.pathname}${window.location.hash}`;window.history.replaceState(null,"",i)}render(){const e=this.id||"search",t=this.srLabel?"fr-label sr-only":"fr-label";return p`
      <div class="fr-search-bar" role="search" aria-label="${this.label}">
        <label class="${t}" for="gouv-search-${e}">${this.label}</label>
        <input class="fr-input"
          type="search"
          id="gouv-search-${e}"
          placeholder="${this.placeholder}"
          autocomplete="off"
          .value="${this._term}"
          @input="${i=>this._onInput(i.target.value)}"
          @search="${i=>{this._term=i.target.value,this._onSubmit()}}"
          @keydown="${i=>{i.key==="Enter"&&(i.preventDefault(),this._onSubmit())}}">
        <button class="fr-btn" title="Rechercher" type="button"
          @click="${i=>{i.preventDefault(),this._onSubmit()}}">
          Rechercher
        </button>
      </div>
      ${this.count?p`
        <p class="fr-text--sm fr-mt-1v gouv-search-count" aria-live="polite">
          ${this._resultCount} resultat${this._resultCount!==1?"s":""}
        </p>
      `:v}
    `}},h(ae,"GouvSearch"),ae),P([u({type:String})],l.GouvSearch.prototype,"source",void 0),P([u({type:String})],l.GouvSearch.prototype,"fields",void 0),P([u({type:String})],l.GouvSearch.prototype,"placeholder",void 0),P([u({type:String})],l.GouvSearch.prototype,"label",void 0),P([u({type:Number})],l.GouvSearch.prototype,"debounce",void 0),P([u({type:Number,attribute:"min-length"})],l.GouvSearch.prototype,"minLength",void 0),P([u({type:Boolean})],l.GouvSearch.prototype,"highlight",void 0),P([u({type:String})],l.GouvSearch.prototype,"operator",void 0),P([u({type:Boolean,attribute:"sr-label"})],l.GouvSearch.prototype,"srLabel",void 0),P([u({type:Boolean})],l.GouvSearch.prototype,"count",void 0),P([u({type:String,attribute:"url-search-param"})],l.GouvSearch.prototype,"urlSearchParam",void 0),P([u({type:Boolean,attribute:"url-sync"})],l.GouvSearch.prototype,"urlSync",void 0),P([m()],l.GouvSearch.prototype,"_allData",void 0),P([m()],l.GouvSearch.prototype,"_filteredData",void 0),P([m()],l.GouvSearch.prototype,"_term",void 0),P([m()],l.GouvSearch.prototype,"_resultCount",void 0),l.GouvSearch=P([D("gouv-search")],l.GouvSearch);function Ce(n){const t=class t extends n{constructor(){super(...arguments),this._sourceLoading=!1,this._sourceData=null,this._sourceError=null,this._unsubscribeSource=null}onSourceData(r){}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSubscription()}updated(r){super.updated(r),r.has("source")&&this._subscribeToSource()}_subscribeToSource(){this._cleanupSubscription();const r=this.source;if(!r)return;const s=H(r);s!==void 0&&(this._sourceData=s,this.onSourceData(s)),this._unsubscribeSource=X(r,{onLoaded:h(a=>{this._sourceData=a,this._sourceLoading=!1,this._sourceError=null,this.onSourceData(a),this.requestUpdate()},"onLoaded"),onLoading:h(()=>{this._sourceLoading=!0,this.requestUpdate()},"onLoading"),onError:h(a=>{this._sourceError=a,this._sourceLoading=!1,this.requestUpdate()},"onError")})}_cleanupSubscription(){this._unsubscribeSource&&(this._unsubscribeSource(),this._unsubscribeSource=null)}};h(t,"SourceSubscriberElement");let e=t;return e}h(Ce,"SourceSubscriberMixin");function it(n,e="nombre"){if(n==null||n==="")return"—";const t=typeof n=="string"?parseFloat(n):n;if(isNaN(t))return"—";switch(e){case"nombre":return rt(t);case"pourcentage":return Lt(t);case"euro":return Nt(t);case"decimal":return mi(t);default:return rt(t)}}h(it,"formatValue");function rt(n){return new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(Math.round(n))}h(rt,"formatNumber");function Lt(n){return new Intl.NumberFormat("fr-FR",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:1}).format(n/100)}h(Lt,"formatPercentage");function Nt(n){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(n)}h(Nt,"formatCurrency");function mi(n){return new Intl.NumberFormat("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:2}).format(n)}h(mi,"formatDecimal");function vi(n){const e=typeof n=="string"?new Date(n):n;return isNaN(e.getTime())?"—":new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(e)}h(vi,"formatDate");function bi(n,e,t){return e!==void 0&&n>=e?"vert":t!==void 0&&n>=t?"orange":e!==void 0||t!==void 0?"rouge":"bleu"}h(bi,"getColorBySeuil");function Ut(n){const e=n.split(":");if(e.length===1)return e[0]==="count"?{type:"count",field:""}:{type:"direct",field:e[0]};const t=e[0],i=e[1];if(e.length===3){let r=e[2];return r==="true"?r=!0:r==="false"?r=!1:isNaN(Number(r))||(r=Number(r)),{type:t,field:i,filterField:i,filterValue:r}}return{type:t,field:i}}h(Ut,"parseExpression");function st(n,e){const t=Ut(e);if(t.type==="direct"&&!Array.isArray(n))return n[t.field];if(!Array.isArray(n))return null;const i=n;switch(t.type){case"direct":case"first":return i.length>0?i[0][t.field]:null;case"last":return i.length>0?i[i.length-1][t.field]:null;case"count":return t.filterValue!==void 0?i.filter(s=>s[t.field]===t.filterValue).length:i.length;case"sum":return i.reduce((s,a)=>{const o=Number(a[t.field]);return s+(isNaN(o)?0:o)},0);case"avg":return i.length===0?null:i.reduce((s,a)=>{const o=Number(a[t.field]);return s+(isNaN(o)?0:o)},0)/i.length;case"min":return i.length===0?null:Math.min(...i.map(s=>Number(s[t.field])).filter(s=>!isNaN(s)));case"max":return i.length===0?null:Math.max(...i.map(s=>Number(s[t.field])).filter(s=>!isNaN(s)));default:return null}}h(st,"computeAggregation");var G=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};const Ot={vert:"gouv-kpi--success",orange:"gouv-kpi--warning",rouge:"gouv-kpi--error",bleu:"gouv-kpi--info"};l.GouvKpi=(ne=class extends Ce($){constructor(){super(...arguments),this.source="",this.valeur="",this.label="",this.description="",this.icone="",this.format="nombre",this.tendance="",this.couleur=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),T("gouv-kpi")}_computeValue(){return!this._sourceData||!this.valeur?null:st(this._sourceData,this.valeur)}_getColor(){if(this.couleur)return this.couleur;const e=this._computeValue();return typeof e!="number"?"bleu":bi(e,this.seuilVert,this.seuilOrange)}_getTendanceInfo(){if(!this.tendance||!this._sourceData)return null;const e=st(this._sourceData,this.tendance);return typeof e!="number"?null:{value:e,direction:e>0?"up":e<0?"down":"stable"}}_getAriaLabel(){if(this.description)return this.description;const e=this._computeValue(),t=it(e,this.format);return`${this.label}: ${t}`}render(){const e=this._computeValue(),t=it(e,this.format),i=Ot[this._getColor()]||Ot.bleu,r=this._getTendanceInfo();return p`
      <div
        class="gouv-kpi ${i}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._sourceLoading?p`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        `:this._sourceError?p`
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
              <span class="gouv-kpi__value">${t}</span>
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
    `}},h(ne,"GouvKpi"),ne),l.GouvKpi.styles=ft``,G([u({type:String})],l.GouvKpi.prototype,"source",void 0),G([u({type:String})],l.GouvKpi.prototype,"valeur",void 0),G([u({type:String})],l.GouvKpi.prototype,"label",void 0),G([u({type:String})],l.GouvKpi.prototype,"description",void 0),G([u({type:String})],l.GouvKpi.prototype,"icone",void 0),G([u({type:String})],l.GouvKpi.prototype,"format",void 0),G([u({type:String})],l.GouvKpi.prototype,"tendance",void 0),G([u({type:Number,attribute:"seuil-vert"})],l.GouvKpi.prototype,"seuilVert",void 0),G([u({type:Number,attribute:"seuil-orange"})],l.GouvKpi.prototype,"seuilOrange",void 0),G([u({type:String})],l.GouvKpi.prototype,"couleur",void 0),l.GouvKpi=G([D("gouv-kpi")],l.GouvKpi);var C=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.GouvDatalist=(oe=class extends Ce($){constructor(){super(...arguments),this.source="",this.colonnes="",this.recherche=!1,this.filtres="",this.tri="",this.pagination=0,this.export="",this.urlSync=!1,this.urlPageParam="page",this._data=[],this._searchQuery="",this._activeFilters={},this._sort=null,this._currentPage=1,this._serverPagination=!1,this._serverTotal=0,this._serverPageSize=0,this._popstateHandler=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),T("gouv-datalist"),this._initSort(),this.urlSync&&(this._applyUrlPage(),this._popstateHandler=()=>{this._applyUrlPage(),this.requestUpdate()},window.addEventListener("popstate",this._popstateHandler))}disconnectedCallback(){super.disconnectedCallback(),this._popstateHandler&&(window.removeEventListener("popstate",this._popstateHandler),this._popstateHandler=null)}updated(e){super.updated(e),e.has("tri")&&this._initSort()}onSourceData(e){this._data=Array.isArray(e)?e:[];const t=this.source?Ze(this.source):void 0;t&&t.total>0?(this._serverPagination=!0,this._serverTotal=t.total,this._serverPageSize=t.pageSize,this._currentPage=t.page):(this._serverPagination=!1,this._currentPage=1)}parseColumns(){return this.colonnes?this.colonnes.split(",").map(e=>{const[t,i]=e.trim().split(":");return{key:t.trim(),label:(i==null?void 0:i.trim())||t.trim()}}):[]}_getFilterableColumns(){return this.filtres?this.filtres.split(",").map(e=>e.trim()):[]}_initSort(){if(this.tri){const[e,t]=this.tri.split(":");this._sort={key:e,direction:t||"asc"}}}_getUniqueValues(e){const t=new Set;return this._data.forEach(i=>{const r=i[e];r!=null&&t.add(String(r))}),Array.from(t).sort()}getFilteredData(){let e=[...this._data];if(this._searchQuery){const t=this._searchQuery.toLowerCase();e=e.filter(i=>Object.values(i).some(r=>String(r).toLowerCase().includes(t)))}if(Object.entries(this._activeFilters).forEach(([t,i])=>{i&&(e=e.filter(r=>String(r[t])===i))}),this._sort){const{key:t,direction:i}=this._sort;e.sort((r,s)=>{const a=r[t],o=s[t];if(a===o)return 0;if(a==null)return 1;if(o==null)return-1;const c=typeof a=="number"&&typeof o=="number"?a-o:String(a).localeCompare(String(o),"fr");return i==="desc"?-c:c})}return e}_getPaginatedData(){const e=this.getFilteredData();if(this._serverPagination||!this.pagination||this.pagination<=0)return e;const t=(this._currentPage-1)*this.pagination;return e.slice(t,t+this.pagination)}_getTotalPages(){return this._serverPagination?Math.ceil(this._serverTotal/this._serverPageSize):!this.pagination||this.pagination<=0?1:Math.ceil(this.getFilteredData().length/this.pagination)}_applyUrlPage(){const t=new URLSearchParams(window.location.search).get(this.urlPageParam);if(t){const i=parseInt(t,10);!isNaN(i)&&i>=1&&(this._currentPage=i,this._serverPagination&&this.source&&Pe(this.source,i))}}_syncPageUrl(){const e=new URLSearchParams(window.location.search);this._currentPage>1?e.set(this.urlPageParam,String(this._currentPage)):e.delete(this.urlPageParam);const t=e.toString(),i=t?`${window.location.pathname}?${t}${window.location.hash}`:`${window.location.pathname}${window.location.hash}`;window.history.replaceState(null,"",i)}_handleSearch(e){this._searchQuery=e.target.value,this._currentPage=1,this.urlSync&&this._syncPageUrl()}_handleFilter(e,t){this._activeFilters={...this._activeFilters,[e]:t.target.value},this._currentPage=1,this.urlSync&&this._syncPageUrl()}_handleSort(e){var t;((t=this._sort)==null?void 0:t.key)===e?this._sort={key:e,direction:this._sort.direction==="asc"?"desc":"asc"}:this._sort={key:e,direction:"asc"}}_handlePageChange(e){this._currentPage=e,this._serverPagination&&this.source&&Pe(this.source,e),this.urlSync&&this._syncPageUrl()}_exportCsv(){const e=this.parseColumns(),t=this.getFilteredData(),i=e.map(d=>d.label).join(";"),r=t.map(d=>e.map(g=>{const f=String(d[g.key]??"");return f.includes(";")||f.includes('"')?`"${f.replace(/"/g,'""')}"`:f}).join(";")),s=[i,...r].join(`
`),a=new Blob([s],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(a),c=document.createElement("a");c.href=o,c.download="export.csv",c.click(),URL.revokeObjectURL(o)}_exportHtml(){const e=this.parseColumns(),t=this.getFilteredData(),i=e.map(d=>`<th>${We(d.label)}</th>`).join(""),r=t.map(d=>`<tr>${e.map(f=>{const _=d[f.key];return`<td>${_==null?"":We(String(_))}</td>`}).join("")}</tr>`).join(`
`),s=`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Export</title>
<style>
table { border-collapse: collapse; width: 100%; font-family: system-ui, sans-serif; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background: #f5f5fe; font-weight: 700; }
tr:nth-child(even) { background: #f6f6f6; }
</style>
</head>
<body>
<table>
<thead><tr>${i}</tr></thead>
<tbody>
${r}
</tbody>
</table>
</body>
</html>`,a=new Blob([s],{type:"text/html;charset=utf-8;"}),o=URL.createObjectURL(a),c=document.createElement("a");c.href=o,c.download="export.html",c.click(),URL.revokeObjectURL(o)}formatCellValue(e){return e==null?"—":typeof e=="boolean"?e?"Oui":"Non":String(e)}_renderFilters(e,t){return t.length===0?"":p`
      <div class="gouv-datalist__filters">
        ${t.map(i=>{const r=e.find(o=>o.key===i),s=(r==null?void 0:r.label)||i,a=this._getUniqueValues(i);return p`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${i}">${s}</label>
              <select
                class="fr-select"
                id="filter-${i}"
                @change="${o=>this._handleFilter(i,o)}"
              >
                <option value="">Tous</option>
                ${a.map(o=>p`
                  <option value="${o}" ?selected="${this._activeFilters[i]===o}">${o}</option>
                `)}
              </select>
            </div>
          `})}
      </div>
    `}_renderToolbar(){var t,i,r,s;const e=((t=this.export)==null?void 0:t.includes("csv"))||((i=this.export)==null?void 0:i.includes("html"));return!this.recherche&&!e?"":p`
      <div class="gouv-datalist__toolbar">
        ${this.recherche?p`
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
        `:p`<div></div>`}

        <div class="gouv-datalist__export-buttons">
          ${(r=this.export)!=null&&r.includes("csv")?p`
            <button
              class="fr-btn fr-btn--secondary fr-btn--sm"
              @click="${this._exportCsv}"
              type="button"
            >
              <span class="fr-icon-download-line fr-icon--sm" aria-hidden="true"></span>
              Exporter CSV
            </button>
          `:""}

          ${(s=this.export)!=null&&s.includes("html")?p`
            <button
              class="fr-btn fr-btn--secondary fr-btn--sm"
              @click="${this._exportHtml}"
              type="button"
            >
              <span class="fr-icon-code-s-slash-line fr-icon--sm" aria-hidden="true"></span>
              Exporter HTML
            </button>
          `:""}
        </div>
      </div>
    `}_renderTable(e,t){return p`
      <div class="fr-table fr-table--bordered">
        <table>
          <caption class="fr-sr-only">Liste des données</caption>
          <thead>
            <tr>
              ${e.map(i=>{var r;return p`
                <th scope="col">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${()=>this._handleSort(i.key)}"
                    aria-label="Trier par ${i.label}"
                    type="button"
                  >
                    ${i.label}
                    ${((r=this._sort)==null?void 0:r.key)===i.key?p`
                      <span aria-hidden="true">${this._sort.direction==="asc"?"↑":"↓"}</span>
                    `:""}
                  </button>
                </th>
              `})}
            </tr>
          </thead>
          <tbody>
            ${t.length===0?p`
              <tr>
                <td colspan="${e.length}" class="gouv-datalist__empty">
                  Aucune donnée à afficher
                </td>
              </tr>
            `:t.map(i=>p`
              <tr>
                ${e.map(r=>p`
                  <td>${this.formatCellValue(i[r.key])}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}_renderPagination(e){if(this.pagination<=0||e<=1)return"";const t=[];for(let i=Math.max(1,this._currentPage-2);i<=Math.min(e,this._currentPage+2);i++)t.push(i);return p`
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
          ${t.map(i=>p`
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
    `}render(){const e=this.parseColumns(),t=this._getFilterableColumns(),i=this._getPaginatedData(),r=this._getTotalPages(),s=this._serverPagination?this._serverTotal:this.getFilteredData().length;return p`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        ${this._renderFilters(e,t)}
        ${this._renderToolbar()}

        ${this._sourceLoading?p`
          <div class="gouv-datalist__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement des données...
          </div>
        `:this._sourceError?p`
          <div class="gouv-datalist__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur: ${this._sourceError.message}
          </div>
        `:p`
          <p class="fr-text--sm" aria-live="polite">
            ${s} résultat${s>1?"s":""}
            ${!this._serverPagination&&(this._searchQuery||Object.values(this._activeFilters).some(a=>a))?" (filtré)":""}
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
        .gouv-datalist__export-buttons {
          display: flex; gap: 0.5rem; flex-wrap: wrap;
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
    `}},h(oe,"GouvDatalist"),oe),l.GouvDatalist.styles=ft``,C([u({type:String})],l.GouvDatalist.prototype,"source",void 0),C([u({type:String})],l.GouvDatalist.prototype,"colonnes",void 0),C([u({type:Boolean})],l.GouvDatalist.prototype,"recherche",void 0),C([u({type:String})],l.GouvDatalist.prototype,"filtres",void 0),C([u({type:String})],l.GouvDatalist.prototype,"tri",void 0),C([u({type:Number})],l.GouvDatalist.prototype,"pagination",void 0),C([u({type:String})],l.GouvDatalist.prototype,"export",void 0),C([u({type:Boolean,attribute:"url-sync"})],l.GouvDatalist.prototype,"urlSync",void 0),C([u({type:String,attribute:"url-page-param"})],l.GouvDatalist.prototype,"urlPageParam",void 0),C([m()],l.GouvDatalist.prototype,"_data",void 0),C([m()],l.GouvDatalist.prototype,"_searchQuery",void 0),C([m()],l.GouvDatalist.prototype,"_activeFilters",void 0),C([m()],l.GouvDatalist.prototype,"_sort",void 0),C([m()],l.GouvDatalist.prototype,"_currentPage",void 0),C([m()],l.GouvDatalist.prototype,"_serverPagination",void 0),l.GouvDatalist=C([D("gouv-datalist")],l.GouvDatalist);var R=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.GouvDisplay=(le=class extends Ce($){constructor(){super(...arguments),this.source="",this.cols=1,this.pagination=0,this.empty="Aucun resultat",this.gap="fr-grid-row--gutters",this.uidField="",this.urlSync=!1,this.urlPageParam="page",this._data=[],this._currentPage=1,this._serverPagination=!1,this._serverTotal=0,this._serverPageSize=0,this._templateContent="",this._hashScrollDone=!1,this._popstateHandler=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),T("gouv-display"),this._captureTemplate(),this.urlSync&&(this._applyUrlPage(),this._popstateHandler=()=>{this._applyUrlPage(),this.requestUpdate()},window.addEventListener("popstate",this._popstateHandler))}disconnectedCallback(){super.disconnectedCallback(),this._popstateHandler&&(window.removeEventListener("popstate",this._popstateHandler),this._popstateHandler=null)}onSourceData(e){this._data=Array.isArray(e)?e:[],this._hashScrollDone=!1;const t=this.source?Ze(this.source):void 0;t&&t.total>0?(this._serverPagination=!0,this._serverTotal=t.total,this._serverPageSize=t.pageSize,this._currentPage=t.page):(this._serverPagination=!1,this._currentPage=1)}updated(e){if(super.updated(e),!this._hashScrollDone&&this._data.length>0&&window.location.hash){this._hashScrollDone=!0;const t=window.location.hash.substring(1);requestAnimationFrame(()=>{const i=this.querySelector(`#${CSS.escape(t)}`);i&&i.scrollIntoView({behavior:"smooth",block:"center"})})}}_captureTemplate(){const e=this.querySelector("template");e&&(this._templateContent=e.innerHTML)}_renderItem(e,t){if(!this._templateContent)return"";let i=this._templateContent;return i=i.replace(/\{\{\{([^}]+)\}\}\}/g,(r,s)=>this._resolveExpression(e,s.trim(),t)),i=i.replace(/\{\{([^}]+)\}\}/g,(r,s)=>{const a=this._resolveExpression(e,s.trim(),t);return We(a)}),i}_resolveExpression(e,t,i){if(t==="$index")return String(i);if(t==="$uid")return this._getItemUid(e,i);let r=t,s="";const a=t.indexOf("|");a!==-1&&(r=t.substring(0,a).trim(),s=t.substring(a+1).trim());const o=b(e,r);return o==null?s:String(o)}_getPaginatedData(){if(this._serverPagination)return this._data;if(!this.pagination||this.pagination<=0)return this._data;const e=(this._currentPage-1)*this.pagination;return this._data.slice(e,e+this.pagination)}_getTotalPages(){return this._serverPagination?Math.ceil(this._serverTotal/this._serverPageSize):!this.pagination||this.pagination<=0?1:Math.ceil(this._data.length/this.pagination)}_applyUrlPage(){const t=new URLSearchParams(window.location.search).get(this.urlPageParam);if(t){const i=parseInt(t,10);!isNaN(i)&&i>=1&&(this._currentPage=i,this._serverPagination&&this.source&&Pe(this.source,i))}}_syncPageUrl(){const e=new URLSearchParams(window.location.search);this._currentPage>1?e.set(this.urlPageParam,String(this._currentPage)):e.delete(this.urlPageParam);const t=e.toString(),i=t?`${window.location.pathname}?${t}${window.location.hash}`:`${window.location.pathname}${window.location.hash}`;window.history.replaceState(null,"",i)}_handlePageChange(e){this._currentPage=e,this._serverPagination&&this.source&&Pe(this.source,e),this.urlSync&&this._syncPageUrl()}_getColClass(){const e=Math.max(1,Math.min(6,this.cols));return`fr-col-12 fr-col-md-${Math.floor(12/e)}`}_getItemUid(e,t){if(this.uidField){const i=b(e,this.uidField);if(i!=null&&i!=="")return`item-${String(i).replace(/[^a-zA-Z0-9_-]/g,"_")}`}return`item-${t}`}_renderGrid(e){const t=this._getColClass(),i=this.pagination>0?(this._currentPage-1)*this.pagination:0,r=e.map((a,o)=>{const c=i+o,d=this._renderItem(a,c),g=this._getItemUid(a,c);return`<div class="${t}" id="${g}">${d}</div>`}).join(""),s=`<div class="fr-grid-row ${this.gap}">${r}</div>`;return p`<div .innerHTML="${s}"></div>`}_renderPagination(e){if(this.pagination<=0||e<=1)return"";const t=[];for(let i=Math.max(1,this._currentPage-2);i<=Math.min(e,this._currentPage+2);i++)t.push(i);return p`
      <nav class="fr-pagination fr-mt-2w" aria-label="Pagination">
        <ul class="fr-pagination__list">
          <li>
            <button class="fr-pagination__link fr-pagination__link--first"
              ?disabled="${this._currentPage===1}"
              @click="${()=>this._handlePageChange(1)}"
              aria-label="Premiere page" type="button">Premiere page</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--prev"
              ?disabled="${this._currentPage===1}"
              @click="${()=>this._handlePageChange(this._currentPage-1)}"
              aria-label="Page precedente" type="button">Page precedente</button>
          </li>
          ${t.map(i=>p`
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
              aria-label="Derniere page" type="button">Derniere page</button>
          </li>
        </ul>
      </nav>
    `}render(){this._templateContent||this._captureTemplate();const e=this._getPaginatedData(),t=this._getTotalPages(),i=this._serverPagination?this._serverTotal:this._data.length;return p`
      <div class="gouv-display" role="region" aria-label="Liste de resultats">
        ${this._sourceLoading?p`
          <div class="gouv-display__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        `:this._sourceError?p`
          <div class="gouv-display__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        `:i===0?p`
          <div class="gouv-display__empty" aria-live="polite">
            ${this.empty}
          </div>
        `:p`
          <p class="fr-text--sm fr-mb-1w" aria-live="polite">
            ${i} resultat${i>1?"s":""}
          </p>
          ${this._renderGrid(e)}
          ${this._renderPagination(t)}
        `}
      </div>

      <style>
        .gouv-display__loading,
        .gouv-display__error {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; padding: 2rem; color: var(--text-mention-grey, #666);
          font-size: 0.875rem;
        }
        .gouv-display__error { color: var(--text-default-error, #ce0500); }
        .gouv-display__empty {
          text-align: center; color: var(--text-mention-grey, #666);
          padding: 2rem; font-size: 0.875rem;
        }
      </style>
    `}},h(le,"GouvDisplay"),le),R([u({type:String})],l.GouvDisplay.prototype,"source",void 0),R([u({type:Number})],l.GouvDisplay.prototype,"cols",void 0),R([u({type:Number})],l.GouvDisplay.prototype,"pagination",void 0),R([u({type:String})],l.GouvDisplay.prototype,"empty",void 0),R([u({type:String})],l.GouvDisplay.prototype,"gap",void 0),R([u({type:String,attribute:"uid-field"})],l.GouvDisplay.prototype,"uidField",void 0),R([u({type:Boolean,attribute:"url-sync"})],l.GouvDisplay.prototype,"urlSync",void 0),R([u({type:String,attribute:"url-page-param"})],l.GouvDisplay.prototype,"urlPageParam",void 0),R([m()],l.GouvDisplay.prototype,"_data",void 0),R([m()],l.GouvDisplay.prototype,"_currentPage",void 0),R([m()],l.GouvDisplay.prototype,"_serverPagination",void 0),l.GouvDisplay=R([D("gouv-display")],l.GouvDisplay);var y=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};const yi={line:"line-chart",bar:"bar-chart",pie:"pie-chart",radar:"radar-chart",scatter:"scatter-chart",gauge:"gauge-chart","bar-line":"bar-line-chart",map:"map-chart","map-reg":"map-chart-reg"};l.GouvDsfrChart=(ce=class extends Ce($){constructor(){super(...arguments),this.source="",this.type="bar",this.labelField="",this.codeField="",this.valueField="",this.valueField2="",this.name="",this.selectedPalette="categorical",this.unitTooltip="",this.unitTooltipBar="",this.horizontal=!1,this.stacked=!1,this.fill=!1,this.highlightIndex="",this.xMin="",this.xMax="",this.yMin="",this.yMax="",this.gaugeValue=null,this.mapHighlight="",this._data=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),T("gouv-dsfr-chart",this.type)}onSourceData(e){this._data=Array.isArray(e)?e:[]}_processData(){if(!this._data||this._data.length===0)return{x:"[[]]",y:"[[]]",labels:[]};const e=[],t=[],i=[];for(const r of this._data)e.push(String(b(r,this.labelField)??"N/A")),t.push(Number(b(r,this.valueField))||0),this.valueField2&&i.push(Number(b(r,this.valueField2))||0);return{x:JSON.stringify([e]),y:JSON.stringify([t]),y2:this.valueField2?JSON.stringify([i]):void 0,labels:e}}_processMapData(){if(!this._data||this._data.length===0)return"{}";const e=this.codeField||this.labelField,t={};for(const i of this._data){let r=String(b(i,e)??"").trim();/^\d+$/.test(r)&&r.length<3&&(r=r.padStart(2,"0"));const s=Number(b(i,this.valueField))||0;(this.type==="map"?di(r):r!=="")&&(t[r]=Math.round(s*100)/100)}return JSON.stringify(t)}_getCommonAttributes(){const e={};if(this.selectedPalette&&(e["selected-palette"]=this.selectedPalette),this.unitTooltip&&(e["unit-tooltip"]=this.unitTooltip),this.xMin&&(e["x-min"]=this.xMin),this.xMax&&(e["x-max"]=this.xMax),this.yMin&&(e["y-min"]=this.yMin),this.yMax&&(e["y-max"]=this.yMax),this.name){const t=this.name.trim();e.name=t.startsWith("[")?t:JSON.stringify([t])}else if(this.valueField){const t=this.valueField2?[this.valueField,this.valueField2]:[this.valueField];e.name=JSON.stringify(t)}return e}_getTypeSpecificAttributes(){const{x:e,y:t,y2:i,labels:r}=this._processData(),s={},a={};switch(this.type){case"gauge":{const o=this.gaugeValue??(this._data.length>0&&Number(b(this._data[0],this.valueField))||0);s.percent=String(Math.round(o)),s.init="0",s.target="100";break}case"pie":s.x=e,s.y=t,!this.name&&r.length>0&&(s.name=JSON.stringify(r));break;case"bar-line":s.x=e,s["y-bar"]=t,s["y-line"]=i||t,this.unitTooltipBar&&(s["unit-tooltip-bar"]=this.unitTooltipBar);break;case"map":case"map-reg":{if(s.data=this._processMapData(),this._data.length>0){let o=0,c=0;for(const d of this._data){const g=Number(b(d,this.valueField));isNaN(g)||(o+=g,c++)}if(c>0){const d=Math.round(o/c*100)/100;a.value=String(d)}}a.date=new Date().toISOString().split("T")[0];break}default:s.x=e,s.y=t;break}return this.type==="bar"&&(this.horizontal&&(s.horizontal="true"),this.stacked&&(s.stacked="true"),this.highlightIndex&&(s["highlight-index"]=this.highlightIndex)),this.type==="pie"&&this.fill&&(s.fill="true"),(this.type==="map"||this.type==="map-reg")&&this.mapHighlight&&(s.highlight=this.mapHighlight),{attrs:s,deferred:a}}_getAriaLabel(){const t={bar:"barres",line:"lignes",pie:"camembert",radar:"radar",gauge:"jauge",scatter:"nuage de points","bar-line":"barres et lignes",map:"carte departements","map-reg":"carte regions"}[this.type]||this.type,i=this._data.length;return`Graphique ${t}, ${i} valeurs`}_createChartElement(e,t,i={}){const r=document.createElement(e);for(const[a,o]of Object.entries(t))o!==void 0&&o!==""&&r.setAttribute(a,o);Object.keys(i).length>0&&setTimeout(()=>{for(const[a,o]of Object.entries(i))r.setAttribute(a,o)},500);const s=document.createElement("div");return s.className="gouv-dsfr-chart__wrapper",s.setAttribute("role","img"),s.setAttribute("aria-label",this._getAriaLabel()),s.appendChild(r),s}_renderChart(){const e=yi[this.type];if(!e)return p`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;const{attrs:t,deferred:i}=this._getTypeSpecificAttributes(),r={...this._getCommonAttributes(),...t},s=this._createChartElement(e,r,i),a=this.querySelector(".gouv-dsfr-chart__wrapper");return a&&a.remove(),p`${s}`}render(){return this._sourceLoading?p`
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
      `:this._sourceError?p`
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
      `:!this._data||this._data.length===0?p`
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
      `:this._renderChart()}},h(ce,"GouvDsfrChart"),ce),y([u({type:String})],l.GouvDsfrChart.prototype,"source",void 0),y([u({type:String})],l.GouvDsfrChart.prototype,"type",void 0),y([u({type:String,attribute:"label-field"})],l.GouvDsfrChart.prototype,"labelField",void 0),y([u({type:String,attribute:"code-field"})],l.GouvDsfrChart.prototype,"codeField",void 0),y([u({type:String,attribute:"value-field"})],l.GouvDsfrChart.prototype,"valueField",void 0),y([u({type:String,attribute:"value-field-2"})],l.GouvDsfrChart.prototype,"valueField2",void 0),y([u({type:String})],l.GouvDsfrChart.prototype,"name",void 0),y([u({type:String,attribute:"selected-palette"})],l.GouvDsfrChart.prototype,"selectedPalette",void 0),y([u({type:String,attribute:"unit-tooltip"})],l.GouvDsfrChart.prototype,"unitTooltip",void 0),y([u({type:String,attribute:"unit-tooltip-bar"})],l.GouvDsfrChart.prototype,"unitTooltipBar",void 0),y([u({type:Boolean})],l.GouvDsfrChart.prototype,"horizontal",void 0),y([u({type:Boolean})],l.GouvDsfrChart.prototype,"stacked",void 0),y([u({type:Boolean})],l.GouvDsfrChart.prototype,"fill",void 0),y([u({type:String,attribute:"highlight-index"})],l.GouvDsfrChart.prototype,"highlightIndex",void 0),y([u({type:String,attribute:"x-min"})],l.GouvDsfrChart.prototype,"xMin",void 0),y([u({type:String,attribute:"x-max"})],l.GouvDsfrChart.prototype,"xMax",void 0),y([u({type:String,attribute:"y-min"})],l.GouvDsfrChart.prototype,"yMin",void 0),y([u({type:String,attribute:"y-max"})],l.GouvDsfrChart.prototype,"yMax",void 0),y([u({type:Number,attribute:"gauge-value"})],l.GouvDsfrChart.prototype,"gaugeValue",void 0),y([u({type:String,attribute:"map-highlight"})],l.GouvDsfrChart.prototype,"mapHighlight",void 0),y([m()],l.GouvDsfrChart.prototype,"_data",void 0),l.GouvDsfrChart=y([D("gouv-dsfr-chart")],l.GouvDsfrChart);var Fe=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.AppHeader=(ue=class extends ${constructor(){super(...arguments),this.currentPage="",this.basePath="",this._favCount=0}createRenderRoot(){return this}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}connectedCallback(){super.connectedCallback();try{const e=JSON.parse(localStorage.getItem("gouv-widgets-favorites")||"[]");this._favCount=Array.isArray(e)?e.length:0}catch{}if(!document.getElementById("app-header-active-style")){const e=document.createElement("style");e.id="app-header-active-style",e.textContent='.fr-nav__link[aria-current="page"]{font-weight:700;border-bottom:2px solid var(--border-action-high-blue-france);color:var(--text-action-high-blue-france)}',document.head.appendChild(e)}}_getNavItems(){return[{id:"accueil",label:"Accueil",href:"index.html"},{id:"composants",label:"Composants",href:"demo/index.html"},{id:"builder",label:"Builder",href:"apps/builder/index.html"},{id:"builder-ia",label:"Builder IA",href:"apps/builder-ia/index.html"},{id:"playground",label:"Playground",href:"apps/playground/index.html"},{id:"dashboard",label:"Dashboard",href:"apps/dashboard/index.html"},{id:"sources",label:"Sources",href:"apps/sources/index.html"},{id:"monitoring",label:"Monitoring",href:"apps/monitoring/index.html"}]}render(){const e=this._getNavItems();return p`
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
                        Favoris${this._favCount>0?p` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>`:v}
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
                ${e.map(t=>p`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this._base}${t.href}"
                       ${this.currentPage===t.id?p`aria-current="page"`:""}>
                      ${t.label}
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    `}},h(ue,"AppHeader"),ue),Fe([u({type:String,attribute:"current-page"})],l.AppHeader.prototype,"currentPage",void 0),Fe([u({type:String,attribute:"base-path"})],l.AppHeader.prototype,"basePath",void 0),Fe([m()],l.AppHeader.prototype,"_favCount",void 0),l.AppHeader=Fe([D("app-header")],l.AppHeader);var zt=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.AppFooter=(he=class extends ${constructor(){super(...arguments),this.basePath=""}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}createRenderRoot(){return this}render(){return p`
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
    `}},h(he,"AppFooter"),he),zt([u({type:String,attribute:"base-path"})],l.AppFooter.prototype,"basePath",void 0),l.AppFooter=zt([D("app-footer")],l.AppFooter);var Z=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.AppLayoutBuilder=(de=class extends ${constructor(){super(...arguments),this.leftRatio=40,this.minLeftWidth=280,this.minRightWidth=300,this._isResizing=!1,this._currentLeftRatio=40,this._leftContent=[],this._rightContent=[],this._contentMoved=!1,this._boundMouseMove=null,this._boundMouseUp=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._currentLeftRatio=this.leftRatio,this._setupResizer(),this._saveSlotContent()}_saveSlotContent(){this._leftContent=Array.from(this.querySelectorAll('[slot="left"]')),this._rightContent=Array.from(this.querySelectorAll('[slot="right"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".builder-layout-left"),t=this.querySelector(".builder-layout-right");e&&t&&(this._leftContent.forEach(i=>e.appendChild(i)),this._rightContent.forEach(i=>t.appendChild(i)),this._contentMoved=!0)}disconnectedCallback(){super.disconnectedCallback(),this._cleanupResizer()}_setupResizer(){this._boundMouseMove=this._handleMouseMove.bind(this),this._boundMouseUp=this._handleMouseUp.bind(this)}_cleanupResizer(){this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp)}_handleMouseDown(e){e.preventDefault(),this._isResizing=!0,document.body.style.cursor="col-resize",document.body.style.userSelect="none",this._boundMouseMove&&document.addEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.addEventListener("mouseup",this._boundMouseUp)}_handleMouseMove(e){if(!this._isResizing)return;const t=this.querySelector(".builder-layout-container");if(!t)return;const i=t.getBoundingClientRect(),r=i.width;let s=e.clientX-i.left;s=Math.max(this.minLeftWidth,Math.min(s,r-this.minRightWidth)),this._currentLeftRatio=s/r*100,this.requestUpdate()}_handleMouseUp(){this._isResizing&&(this._isResizing=!1,document.body.style.cursor="",document.body.style.userSelect="",this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp))}render(){return p`
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
          overflow: hidden;
        }

        .builder-layout-container {
          display: flex;
          flex: 1;
          min-height: 0;
          overflow: hidden;
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
    `}},h(de,"AppLayoutBuilder"),de),Z([u({type:Number,attribute:"left-ratio"})],l.AppLayoutBuilder.prototype,"leftRatio",void 0),Z([u({type:Number,attribute:"min-left-width"})],l.AppLayoutBuilder.prototype,"minLeftWidth",void 0),Z([u({type:Number,attribute:"min-right-width"})],l.AppLayoutBuilder.prototype,"minRightWidth",void 0),Z([m()],l.AppLayoutBuilder.prototype,"_isResizing",void 0),Z([m()],l.AppLayoutBuilder.prototype,"_currentLeftRatio",void 0),l.AppLayoutBuilder=Z([D("app-layout-builder")],l.AppLayoutBuilder);var Ae=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.AppLayoutDemo=(pe=class extends ${constructor(){super(...arguments),this.title="",this.icon="",this.activePath="",this.basePath="",this._contentElements=[],this._contentMoved=!1}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._contentElements=Array.from(this.querySelectorAll('[slot="content"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".demo-content-slot");e&&(this._contentElements.forEach(t=>e.appendChild(t)),this._contentMoved=!0)}_getMenuStructure(){return[{id:"overview",label:"Vue d'ensemble",href:"index.html"},{id:"components",label:"Composants gouv-widgets",href:"#",children:[{id:"components/gouv-source",label:"gouv-source",href:"components/gouv-source.html"},{id:"components/gouv-normalize",label:"gouv-normalize",href:"components/gouv-normalize.html"},{id:"components/gouv-query",label:"gouv-query",href:"components/gouv-query.html"},{id:"components/gouv-facets",label:"gouv-facets",href:"components/gouv-facets.html"},{id:"components/gouv-search",label:"gouv-search",href:"components/gouv-search.html"},{id:"components/gouv-kpi",label:"gouv-kpi",href:"components/gouv-kpi.html"},{id:"components/gouv-datalist",label:"gouv-datalist",href:"components/gouv-datalist.html"},{id:"components/gouv-display",label:"gouv-display",href:"components/gouv-display.html"},{id:"components/gouv-dsfr-chart",label:"gouv-dsfr-chart",href:"components/gouv-dsfr-chart.html"}]},{id:"charts",label:"Composants dsfr-charts",href:"#",children:[{id:"charts/line-chart",label:"line-chart",href:"charts/line-chart.html"},{id:"charts/bar-chart",label:"bar-chart",href:"charts/bar-chart.html"},{id:"charts/pie-chart",label:"pie-chart",href:"charts/pie-chart.html"},{id:"charts/radar-chart",label:"radar-chart",href:"charts/radar-chart.html"},{id:"charts/gauge-chart",label:"gauge-chart",href:"charts/gauge-chart.html"},{id:"charts/map-chart",label:"map-chart",href:"charts/map-chart.html"},{id:"charts/scatter-chart",label:"scatter-chart",href:"charts/scatter-chart.html"}]}]}_isActive(e){return this.activePath===e}_isParentActive(e){return e.children?e.children.some(t=>this._isActive(t.id)):!1}_renderMenuItem(e){const t=this._isActive(e.id),i=this._isParentActive(e);if(e.children){const r=`fr-sidemenu-${e.id}`,s=i;return p`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${s}"
                  aria-controls="${r}">
            ${e.label}
          </button>
          <div class="fr-collapse ${s?"fr-collapse--expanded":""}" id="${r}">
            <ul class="fr-sidemenu__list">
              ${e.children.map(a=>this._renderMenuItem(a))}
            </ul>
          </div>
        </li>
      `}else return p`
        <li class="fr-sidemenu__item ${t?"fr-sidemenu__item--active":""}">
          <a class="fr-sidemenu__link"
             href="${this._base}${e.href}"
             ${t?p`aria-current="page"`:""}>
            ${e.label}
          </a>
        </li>
      `}_renderBreadcrumb(){if(!this.activePath||this.activePath==="overview")return"";const e=this.activePath.split("/"),t=[{label:"Composants",href:`${this._base}index.html`}];if(e.length>1){const i=e[0]==="components"?"Composants gouv-widgets":"Composants dsfr-charts";t.push({label:i,href:"#"})}return t.push({label:this.title,href:""}),p`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((i,r)=>p`
              <li>
                ${r===t.length-1?p`<a class="fr-breadcrumb__link" aria-current="page">${i.label}</a>`:p`<a class="fr-breadcrumb__link" href="${i.href}">${i.label}</a>`}
              </li>
            `)}
          </ol>
        </div>
      </nav>
    `}render(){const e=this._getMenuStructure();return p`
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

            ${this.title?p`
              <h1>
                ${this.icon?p`<span class="${this.icon} fr-mr-1w" aria-hidden="true"></span>`:""}
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
    `}},h(pe,"AppLayoutDemo"),pe),Ae([u({type:String})],l.AppLayoutDemo.prototype,"title",void 0),Ae([u({type:String})],l.AppLayoutDemo.prototype,"icon",void 0),Ae([u({type:String,attribute:"active-path"})],l.AppLayoutDemo.prototype,"activePath",void 0),Ae([u({type:String,attribute:"base-path"})],l.AppLayoutDemo.prototype,"basePath",void 0),l.AppLayoutDemo=Ae([D("app-layout-demo")],l.AppLayoutDemo);var V=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var o=n.length-1;o>=0;o--)(a=n[o])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};let z=(fe=class extends ${constructor(){super(...arguments),this.showDataTab=!1,this.showSaveButton=!1,this.showPlaygroundButton=!1,this.tabLabels="Aperçu,Code,Données",this.activeTab="preview",this._activeTab="preview",this._previewContent=[],this._codeContent=[],this._dataContent=[],this._contentMoved=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._activeTab=this.activeTab,this._saveSlotContent()}_saveSlotContent(){this._previewContent=Array.from(this.querySelectorAll('[slot="preview"]')),this._codeContent=Array.from(this.querySelectorAll('[slot="code"]')),this._dataContent=Array.from(this.querySelectorAll('[slot="data"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector("#tab-preview"),t=this.querySelector("#tab-code"),i=this.querySelector("#tab-data");e&&this._previewContent.forEach(r=>e.appendChild(r)),t&&this._codeContent.forEach(r=>t.appendChild(r)),i&&this._dataContent.forEach(r=>i.appendChild(r)),this._contentMoved=!0}setActiveTab(e){this._activeTab=e,this.requestUpdate()}getActiveTab(){return this._activeTab}_handleTabClick(e){this._activeTab=e,this.dispatchEvent(new CustomEvent("tab-change",{detail:{tab:e},bubbles:!0,composed:!0})),this.requestUpdate()}_getTabLabels(){return this.tabLabels.split(",").map(e=>e.trim())}_handleSaveClick(){this.dispatchEvent(new CustomEvent("save-favorite",{bubbles:!0,composed:!0}))}_handlePlaygroundClick(){this.dispatchEvent(new CustomEvent("open-playground",{bubbles:!0,composed:!0}))}render(){const e=this._getTabLabels(),[t,i,r]=e;return p`
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
          ${this.showDataTab?p`
            <button
              class="preview-panel-tab ${this._activeTab==="data"?"active":""}"
              data-tab="data"
              @click="${()=>this._handleTabClick("data")}">
              ${r||"Données"}
            </button>
          `:v}
          ${this.showPlaygroundButton?p`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          `:v}
          ${this.showSaveButton?p`
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
    `}},h(fe,"AppPreviewPanel"),fe);V([u({type:Boolean,attribute:"show-data-tab"})],z.prototype,"showDataTab",void 0),V([u({type:Boolean,attribute:"show-save-button"})],z.prototype,"showSaveButton",void 0),V([u({type:Boolean,attribute:"show-playground-button"})],z.prototype,"showPlaygroundButton",void 0),V([u({type:String,attribute:"tab-labels"})],z.prototype,"tabLabels",void 0),V([u({type:String,attribute:"active-tab"})],z.prototype,"activeTab",void 0),V([m()],z.prototype,"_activeTab",void 0),z=V([D("app-preview-panel")],z);function jt(n,e,t){return n.map(i=>({label:String(b(i,e)??"N/A"),value:Number(b(i,t))||0}))}h(jt,"extractLabelValues");function qt(n,e){if(e==="none")return n;const t=new Map;for(const r of n){const s=t.get(r.label)||[];s.push(r.value),t.set(r.label,s)}const i=[];for(const[r,s]of t)i.push({label:r,value:$i(s,e)});return i}h(qt,"aggregateByLabel");function $i(n,e){switch(e){case"sum":return n.reduce((t,i)=>t+i,0);case"avg":return n.reduce((t,i)=>t+i,0)/n.length;case"count":return n.length;case"min":return Math.min(...n);case"max":return Math.max(...n);default:return n[0]||0}}h($i,"computeGroupValue");function Bt(n,e){return e==="none"?n:[...n].sort((t,i)=>e==="desc"?i.value-t.value:t.value-i.value)}h(Bt,"sortByValue");function wi(n,e,t,i="none",r="none",s=0){if(!n||n.length===0)return{labels:[],values:[]};let a=jt(n,e,t);return a=qt(a,i),a=Bt(a,r),s>0&&(a=a.slice(0,s)),{labels:a.map(o=>o.label),values:a.map(o=>Math.round(o.value*100)/100)}}h(wi,"processChartData"),l.DATA_EVENTS=k,l.SourceSubscriberMixin=Ce,l.aggregateByLabel=qt,l.computeAggregation=st,l.dispatchDataError=x,l.dispatchDataLoaded=O,l.dispatchDataLoading=L,l.extractLabelValues=jt,l.formatCurrency=Nt,l.formatDate=vi,l.formatNumber=rt,l.formatPercentage=Lt,l.formatValue=it,l.getByPath=b,l.getByPathOrDefault=ci,l.getDataCache=H,l.hasPath=li,l.parseExpression=Ut,l.processChartData=wi,l.sortByValue=Bt,l.subscribeToSource=X,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})}));
