(function(o,D){typeof exports=="object"&&typeof module<"u"?D(exports):typeof define=="function"&&define.amd?define(["exports"],D):(o=typeof globalThis<"u"?globalThis:o||self,D(o.GouvWidgets={}))})(this,function(o){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var je;const D=globalThis,te=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ie=Symbol(),fe=new WeakMap;let ve=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(te&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=fe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&fe.set(t,e))}return e}toString(){return this.cssText}};const Ue=a=>new ve(typeof a=="string"?a:a+"",void 0,ie),be=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((i,r,n)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+a[n+1],a[0]);return new ve(t,a,ie)},ze=(a,e)=>{if(te)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=D.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,a.appendChild(i)}},ge=te?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Ue(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ie,defineProperty:He,getOwnPropertyDescriptor:Be,getOwnPropertyNames:qe,getOwnPropertySymbols:Ve,getPrototypeOf:We}=Object,P=globalThis,_e=P.trustedTypes,Ke=_e?_e.emptyScript:"",re=P.reactiveElementPolyfillSupport,U=(a,e)=>a,Z={toAttribute(a,e){switch(e){case Boolean:a=a?Ke:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},ne=(a,e)=>!Ie(a,e),me={attribute:!0,type:String,converter:Z,reflect:!1,useDefault:!1,hasChanged:ne};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),P.litPropertyMetadata??(P.litPropertyMetadata=new WeakMap);let G=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=me){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&He(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:n}=Be(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:r,set(s){const l=r==null?void 0:r.call(this);n==null||n.call(this,s),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??me}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;const e=We(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){const t=this.properties,i=[...qe(t),...Ve(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(ge(r))}else e!==void 0&&t.push(ge(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ze(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var n;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const s=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:Z).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){var n,s;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const l=i.getPropertyOptions(r),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:Z;this._$Em=r;const h=c.fromAttribute(t,l.type);this[r]=h??((s=this._$Ej)==null?void 0:s.get(r))??h,this._$Em=null}}requestUpdate(e,t,i,r=!1,n){var s;if(e!==void 0){const l=this.constructor;if(r===!1&&(n=this[e]),i??(i=l.getPropertyOptions(e)),!((i.hasChanged??ne)(n,t)||i.useDefault&&i.reflect&&n===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(l._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:n},s){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),n!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,s]of r){const{wrapped:l}=s,c=this[n];l!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,s,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[U("elementProperties")]=new Map,G[U("finalized")]=new Map,re==null||re({ReactiveElement:G}),(P.reactiveElementVersions??(P.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis,ye=a=>a,X=z.trustedTypes,$e=X?X.createPolicy("lit-html",{createHTML:a=>a}):void 0,Ce="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Ae="?"+x,Je=`<${Ae}>`,R=document,I=()=>R.createComment(""),H=a=>a===null||typeof a!="object"&&typeof a!="function",ae=Array.isArray,Qe=a=>ae(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",se=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,we=/-->/g,Se=/>/g,M=RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ee=/'/g,De=/"/g,Pe=/^(?:script|style|textarea|title)$/i,Ze=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),d=Ze(1),L=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),xe=new WeakMap,O=R.createTreeWalker(R,129);function ke(a,e){if(!ae(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(e):e}const Xe=(a,e)=>{const t=a.length-1,i=[];let r,n=e===2?"<svg>":e===3?"<math>":"",s=B;for(let l=0;l<t;l++){const c=a[l];let h,b,p=-1,g=0;for(;g<c.length&&(s.lastIndex=g,b=s.exec(c),b!==null);)g=s.lastIndex,s===B?b[1]==="!--"?s=we:b[1]!==void 0?s=Se:b[2]!==void 0?(Pe.test(b[2])&&(r=RegExp("</"+b[2],"g")),s=M):b[3]!==void 0&&(s=M):s===M?b[0]===">"?(s=r??B,p=-1):b[1]===void 0?p=-2:(p=s.lastIndex-b[2].length,h=b[1],s=b[3]===void 0?M:b[3]==='"'?De:Ee):s===De||s===Ee?s=M:s===we||s===Se?s=B:(s=M,r=void 0);const k=s===M&&a[l+1].startsWith("/>")?" ":"";n+=s===B?c+Je:p>=0?(i.push(h),c.slice(0,p)+Ce+c.slice(p)+x+k):c+x+(p===-2?l:k)}return[ke(a,n+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class q{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,s=0;const l=e.length-1,c=this.parts,[h,b]=Xe(e,t);if(this.el=q.createElement(h,i),O.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=O.nextNode())!==null&&c.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Ce)){const g=b[s++],k=r.getAttribute(p).split(x),ee=/([.?@])?(.*)/.exec(g);c.push({type:1,index:n,name:ee[2],strings:k,ctor:ee[1]==="."?et:ee[1]==="?"?tt:ee[1]==="@"?it:Y}),r.removeAttribute(p)}else p.startsWith(x)&&(c.push({type:6,index:n}),r.removeAttribute(p));if(Pe.test(r.tagName)){const p=r.textContent.split(x),g=p.length-1;if(g>0){r.textContent=X?X.emptyScript:"";for(let k=0;k<g;k++)r.append(p[k],I()),O.nextNode(),c.push({type:2,index:++n});r.append(p[g],I())}}}else if(r.nodeType===8)if(r.data===Ae)c.push({type:2,index:n});else{let p=-1;for(;(p=r.data.indexOf(x,p+1))!==-1;)c.push({type:7,index:n}),p+=x.length-1}n++}}static createElement(e,t){const i=R.createElement("template");return i.innerHTML=e,i}}function N(a,e,t=a,i){var s,l;if(e===L)return e;let r=i!==void 0?(s=t._$Co)==null?void 0:s[i]:t._$Cl;const n=H(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),n===void 0?r=void 0:(r=new n(a),r._$AT(a,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=N(a,r._$AS(a,e.values),r,i)),e}class Ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??R).importNode(t,!0);O.currentNode=r;let n=O.nextNode(),s=0,l=0,c=i[0];for(;c!==void 0;){if(s===c.index){let h;c.type===2?h=new V(n,n.nextSibling,this,e):c.type===1?h=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(h=new rt(n,this,e)),this._$AV.push(h),c=i[++l]}s!==(c==null?void 0:c.index)&&(n=O.nextNode(),s++)}return O.currentNode=R,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class V{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),H(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==L&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=q.createElement(ke(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(t);else{const s=new Ye(r,this),l=s.u(this.options);s.p(t),this.T(l),this._$AH=s}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new q(e)),t}k(e){ae(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const n of e)r===t.length?t.push(i=new V(this.O(I()),this.O(I()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const r=ye(e).nextSibling;ye(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,n){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}_$AI(e,t=this,i,r){const n=this.strings;let s=!1;if(n===void 0)e=N(this,e,t,0),s=!H(e)||e!==this._$AH&&e!==L,s&&(this._$AH=e);else{const l=e;let c,h;for(e=n[0],c=0;c<n.length-1;c++)h=N(this,l[i+c],t,c),h===L&&(h=this._$AH[c]),s||(s=!H(h)||h!==this._$AH[c]),h===_?e=_:e!==_&&(e+=(h??"")+n[c+1]),this._$AH[c]=h}s&&!r&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class et extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}class tt extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}}class it extends Y{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??_)===L)return;const i=this._$AH,r=e===_&&i!==_||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==_&&(i===_||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class rt{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}}const oe=z.litHtmlPolyfillSupport;oe==null||oe(q,V),(z.litHtmlVersions??(z.litHtmlVersions=[])).push("3.3.2");const nt=(a,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const n=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new V(e.insertBefore(I(),n),n,void 0,t??{})}return r._$AI(a),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis;class $ extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=nt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return L}}$._$litElement$=!0,$.finalized=!0,(je=T.litElementHydrateSupport)==null||je.call(T,{LitElement:$});const le=T.litElementPolyfillSupport;le==null||le({LitElement:$}),(T.litElementVersions??(T.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=a=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:ne},st=(a=at,e,t)=>{const{kind:i,metadata:r}=t;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((a=Object.create(a)).wrapped=!0),n.set(t.name,a),i==="accessor"){const{name:s}=t;return{set(l){const c=e.get.call(this);e.set.call(this,l),this.requestUpdate(s,c,a,!0,l)},init(l){return l!==void 0&&this.C(s,void 0,a,l),l}}}if(i==="setter"){const{name:s}=t;return function(l){const c=this[s];e.call(this,l),this.requestUpdate(s,c,a,!0,l)}}throw Error("Unsupported decorator location: "+i)};function u(a){return(e,t)=>typeof t=="object"?st(a,e,t):((i,r,n)=>{const s=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),s?Object.getOwnPropertyDescriptor(r,n):void 0})(a,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(a){return u({...a,state:!0,attribute:!1})}function w(a,e){if(!e||e.trim()==="")return a;const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=a;for(const n of i){if(r==null||typeof r!="object")return;r=r[n]}return r}function ot(a,e){return w(a,e)!==void 0}function lt(a,e,t){const i=w(a,e);return i!==void 0?i:t}const S={LOADED:"gouv-data-loaded",ERROR:"gouv-data-error",LOADING:"gouv-data-loading"},ce=new Map;function ct(a,e){ce.set(a,e)}function W(a){return ce.get(a)}function ut(a){ce.delete(a)}function Re(a,e){ct(a,e);const t=new CustomEvent(S.LOADED,{bubbles:!0,composed:!0,detail:{sourceId:a,data:e}});document.dispatchEvent(t)}function Me(a,e){const t=new CustomEvent(S.ERROR,{bubbles:!0,composed:!0,detail:{sourceId:a,error:e}});document.dispatchEvent(t)}function Oe(a){const e=new CustomEvent(S.LOADING,{bubbles:!0,composed:!0,detail:{sourceId:a}});document.dispatchEvent(e)}function K(a,e){const t=n=>{const s=n;s.detail.sourceId===a&&e.onLoaded&&e.onLoaded(s.detail.data)},i=n=>{const s=n;s.detail.sourceId===a&&e.onError&&e.onError(s.detail.error)},r=n=>{n.detail.sourceId===a&&e.onLoading&&e.onLoading()};return document.addEventListener(S.LOADED,t),document.addEventListener(S.ERROR,i),document.addEventListener(S.LOADING,r),()=>{document.removeEventListener(S.LOADED,t),document.removeEventListener(S.ERROR,i),document.removeEventListener(S.LOADING,r)}}var E=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};o.GouvSource=class extends ${constructor(){super(...arguments),this.url="",this.method="GET",this.headers="",this.params="",this.refresh=0,this.transform="",this._loading=!1,this._error=null,this._data=null,this._refreshInterval=null,this._abortController=null}createRenderRoot(){return this}render(){return d``}connectedCallback(){super.connectedCallback(),this._fetchData(),this._setupRefresh()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&ut(this.id)}updated(e){(e.has("url")||e.has("params")||e.has("transform"))&&this._fetchData(),e.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._fetchData()},this.refresh*1e3))}async _fetchData(){if(this.url){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,Oe(this.id);try{const e=this._buildUrl(),t=this._buildFetchOptions(),i=await fetch(e,{...t,signal:this._abortController.signal});if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);const r=await i.json();this._data=this.transform?w(r,this.transform):r,Re(this.id,this._data)}catch(e){if(e.name==="AbortError")return;this._error=e,Me(this.id,this._error),console.error(`gouv-source[${this.id}]: Erreur de chargement`,e)}finally{this._loading=!1}}}_buildUrl(){const e=new URL(this.url,window.location.origin);if(this.params&&this.method==="GET")try{const t=JSON.parse(this.params);Object.entries(t).forEach(([i,r])=>{e.searchParams.set(i,String(r))})}catch(t){console.warn("gouv-source: params invalides (JSON attendu)",t)}return e.toString()}_buildFetchOptions(){const e={method:this.method};if(this.headers)try{e.headers=JSON.parse(this.headers)}catch(t){console.warn("gouv-source: headers invalides (JSON attendu)",t)}return this.method==="POST"&&this.params&&(e.headers={"Content-Type":"application/json",...e.headers||{}},e.body=this.params),e}reload(){this._fetchData()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},E([u({type:String})],o.GouvSource.prototype,"url",void 0),E([u({type:String})],o.GouvSource.prototype,"method",void 0),E([u({type:String})],o.GouvSource.prototype,"headers",void 0),E([u({type:String})],o.GouvSource.prototype,"params",void 0),E([u({type:Number})],o.GouvSource.prototype,"refresh",void 0),E([u({type:String})],o.GouvSource.prototype,"transform",void 0),E([v()],o.GouvSource.prototype,"_loading",void 0),E([v()],o.GouvSource.prototype,"_error",void 0),E([v()],o.GouvSource.prototype,"_data",void 0),o.GouvSource=E([A("gouv-source")],o.GouvSource);function ue(a,e="nombre"){if(a==null||a==="")return"—";const t=typeof a=="string"?parseFloat(a):a;if(isNaN(t))return"—";switch(e){case"nombre":return de(t);case"pourcentage":return Te(t);case"euro":return Ge(t);case"decimal":return dt(t);default:return de(t)}}function de(a){return new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(Math.round(a))}function Te(a){return new Intl.NumberFormat("fr-FR",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:1}).format(a/100)}function Ge(a){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(a)}function dt(a){return new Intl.NumberFormat("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:2}).format(a)}function ht(a){const e=typeof a=="string"?new Date(a):a;return isNaN(e.getTime())?"—":new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(e)}function pt(a,e,t){return e!==void 0&&a>=e?"vert":t!==void 0&&a>=t?"orange":e!==void 0||t!==void 0?"rouge":"bleu"}function Le(a){const e=a.split(":");if(e.length===1)return{type:"direct",field:e[0]};const t=e[0],i=e[1];if(e.length===3){let r=e[2];return r==="true"?r=!0:r==="false"?r=!1:isNaN(Number(r))||(r=Number(r)),{type:t,field:i,filterField:i,filterValue:r}}return{type:t,field:i}}function he(a,e){const t=Le(e);if(t.type==="direct"&&!Array.isArray(a))return a[t.field];if(!Array.isArray(a))return null;const i=a;switch(t.type){case"direct":case"first":return i.length>0?i[0][t.field]:null;case"last":return i.length>0?i[i.length-1][t.field]:null;case"count":return t.filterValue!==void 0?i.filter(n=>n[t.field]===t.filterValue).length:i.length;case"sum":return i.reduce((n,s)=>{const l=Number(s[t.field]);return n+(isNaN(l)?0:l)},0);case"avg":return i.length===0?null:i.reduce((n,s)=>{const l=Number(s[t.field]);return n+(isNaN(l)?0:l)},0)/i.length;case"min":return i.length===0?null:Math.min(...i.map(n=>Number(n[t.field])).filter(n=>!isNaN(n)));case"max":return i.length===0?null:Math.max(...i.map(n=>Number(n[t.field])).filter(n=>!isNaN(n)));default:return null}}var C=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};o.GouvKpi=class extends ${constructor(){super(...arguments),this.source="",this.valeur="",this.label="",this.description="",this.icone="",this.format="nombre",this.tendance="",this.couleur="",this._loading=!1,this._data=null,this._error=null,this._unsubscribe=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)}updated(e){e.has("source")&&this._subscribeToSource()}_subscribeToSource(){if(this._unsubscribe&&this._unsubscribe(),!this.source)return;const e=W(this.source);e!==void 0&&(this._data=e),this._unsubscribe=K(this.source,{onLoaded:t=>{this._data=t,this._loading=!1,this._error=null},onLoading:()=>{this._loading=!0},onError:t=>{this._error=t,this._loading=!1}})}_computeValue(){return!this._data||!this.valeur?null:he(this._data,this.valeur)}_getColor(){if(this.couleur)return this.couleur;const e=this._computeValue();return typeof e!="number"?"bleu":pt(e,this.seuilVert,this.seuilOrange)}_getTendanceInfo(){if(!this.tendance||!this._data)return null;const e=he(this._data,this.tendance);return typeof e!="number"?null:{value:e,direction:e>0?"up":e<0?"down":"stable"}}_getColorClass(){const e=this._getColor(),t={vert:"gouv-kpi--success",orange:"gouv-kpi--warning",rouge:"gouv-kpi--error",bleu:"gouv-kpi--info"};return t[e]||t.bleu}_getAriaLabel(){if(this.description)return this.description;const e=this._computeValue(),t=ue(e,this.format);return`${this.label}: ${t}`}render(){const e=this._computeValue(),t=ue(e,this.format),i=this._getColorClass(),r=this._getTendanceInfo();return d`
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
              <span class="gouv-kpi__value">${t}</span>
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
          justify-content: center;
          padding: 1.5rem;
          background: var(--background-default-grey);
          border-radius: 0.25rem;
          border-left: 4px solid var(--border-default-grey);
          min-height: 140px;
          height: 100%;
          box-sizing: border-box;
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
    `}},o.GouvKpi.styles=be`
    /* Styles injectés via Light DOM, utilise les classes DSFR */
  `,C([u({type:String})],o.GouvKpi.prototype,"source",void 0),C([u({type:String})],o.GouvKpi.prototype,"valeur",void 0),C([u({type:String})],o.GouvKpi.prototype,"label",void 0),C([u({type:String})],o.GouvKpi.prototype,"description",void 0),C([u({type:String})],o.GouvKpi.prototype,"icone",void 0),C([u({type:String})],o.GouvKpi.prototype,"format",void 0),C([u({type:String})],o.GouvKpi.prototype,"tendance",void 0),C([u({type:Number,attribute:"seuil-vert"})],o.GouvKpi.prototype,"seuilVert",void 0),C([u({type:Number,attribute:"seuil-orange"})],o.GouvKpi.prototype,"seuilOrange",void 0),C([u({type:String})],o.GouvKpi.prototype,"couleur",void 0),C([v()],o.GouvKpi.prototype,"_loading",void 0),C([v()],o.GouvKpi.prototype,"_data",void 0),C([v()],o.GouvKpi.prototype,"_error",void 0),o.GouvKpi=C([A("gouv-kpi")],o.GouvKpi);var y=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};o.GouvDatalist=class extends ${constructor(){super(...arguments),this.source="",this.colonnes="",this.recherche=!1,this.filtres="",this.tri="",this.pagination=0,this.export="",this._loading=!1,this._data=[],this._error=null,this._searchQuery="",this._activeFilters={},this._sort=null,this._currentPage=1,this._unsubscribe=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._initSort(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&this._unsubscribe()}updated(e){e.has("source")&&this._subscribeToSource(),e.has("tri")&&this._initSort()}_initSort(){if(this.tri){const[e,t]=this.tri.split(":");this._sort={key:e,direction:t||"asc"}}}_subscribeToSource(){if(this._unsubscribe&&this._unsubscribe(),!this.source)return;const e=W(this.source);Array.isArray(e)&&(this._data=e),this._unsubscribe=K(this.source,{onLoaded:t=>{this._data=Array.isArray(t)?t:[],this._loading=!1,this._error=null,this._currentPage=1},onLoading:()=>{this._loading=!0},onError:t=>{this._error=t,this._loading=!1}})}_parseColumns(){return this.colonnes?this.colonnes.split(",").map(e=>{const[t,i]=e.trim().split(":");return{key:t.trim(),label:(i==null?void 0:i.trim())||t.trim()}}):[]}_getFilterableColumns(){return this.filtres?this.filtres.split(",").map(e=>e.trim()):[]}_getUniqueValues(e){const t=new Set;return this._data.forEach(i=>{const r=i[e];r!=null&&t.add(String(r))}),Array.from(t).sort()}_getFilteredData(){let e=[...this._data];if(this._searchQuery){const t=this._searchQuery.toLowerCase();e=e.filter(i=>Object.values(i).some(r=>String(r).toLowerCase().includes(t)))}if(Object.entries(this._activeFilters).forEach(([t,i])=>{i&&(e=e.filter(r=>String(r[t])===i))}),this._sort){const{key:t,direction:i}=this._sort;e.sort((r,n)=>{const s=r[t],l=n[t];if(s===l)return 0;if(s==null)return 1;if(l==null)return-1;const c=typeof s=="number"&&typeof l=="number"?s-l:String(s).localeCompare(String(l),"fr");return i==="desc"?-c:c})}return e}_getPaginatedData(){const e=this._getFilteredData();if(!this.pagination||this.pagination<=0)return e;const t=(this._currentPage-1)*this.pagination;return e.slice(t,t+this.pagination)}_getTotalPages(){return!this.pagination||this.pagination<=0?1:Math.ceil(this._getFilteredData().length/this.pagination)}_handleSearch(e){const t=e.target;this._searchQuery=t.value,this._currentPage=1}_handleFilter(e,t){const i=t.target;this._activeFilters={...this._activeFilters,[e]:i.value},this._currentPage=1}_handleSort(e){var t;((t=this._sort)==null?void 0:t.key)===e?this._sort={key:e,direction:this._sort.direction==="asc"?"desc":"asc"}:this._sort={key:e,direction:"asc"}}_handlePageChange(e){this._currentPage=e}_exportCsv(){const e=this._parseColumns(),t=this._getFilteredData(),i=e.map(h=>h.label).join(";"),r=t.map(h=>e.map(b=>{const p=h[b.key],g=String(p??"");return g.includes(";")||g.includes('"')?`"${g.replace(/"/g,'""')}"`:g}).join(";")),n=[i,...r].join(`
`),s=new Blob([n],{type:"text/csv;charset=utf-8;"}),l=URL.createObjectURL(s),c=document.createElement("a");c.href=l,c.download="export.csv",c.click(),URL.revokeObjectURL(l)}_formatCellValue(e){return e==null?"—":typeof e=="boolean"?e?"Oui":"Non":String(e)}render(){var s,l;const e=this._parseColumns(),t=this._getFilterableColumns(),i=this._getPaginatedData(),r=this._getTotalPages(),n=this._getFilteredData().length;return d`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        <!-- Filtres -->
        ${t.length>0?d`
          <div class="gouv-datalist__filters">
            ${t.map(c=>{const h=e.find(g=>g.key===c),b=(h==null?void 0:h.label)||c,p=this._getUniqueValues(c);return d`
                <div class="fr-select-group">
                  <label class="fr-label" for="filter-${c}">${b}</label>
                  <select
                    class="fr-select"
                    id="filter-${c}"
                    @change="${g=>this._handleFilter(c,g)}"
                  >
                    <option value="">Tous</option>
                    ${p.map(g=>d`
                      <option value="${g}" ?selected="${this._activeFilters[c]===g}">${g}</option>
                    `)}
                  </select>
                </div>
              `})}
          </div>
        `:""}

        <!-- Barre de recherche et export -->
        ${this.recherche||(s=this.export)!=null&&s.includes("csv")?d`
          <div class="gouv-datalist__toolbar">
            ${this.recherche?d`
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
            `:d`<div></div>`}

            ${(l=this.export)!=null&&l.includes("csv")?d`
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
        `:""}

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
            ${n} résultat${n>1?"s":""}
            ${this._searchQuery||Object.values(this._activeFilters).some(c=>c)?" (filtré)":""}
          </p>

          <!-- Tableau -->
          <div class="fr-table fr-table--bordered">
            <table>
              <caption class="fr-sr-only">Liste des données</caption>
              <thead>
                <tr>
                  ${e.map(c=>{var h;return d`
                    <th scope="col">
                      <button
                        class="gouv-datalist__sort-btn"
                        @click="${()=>this._handleSort(c.key)}"
                        aria-label="Trier par ${c.label}"
                        type="button"
                      >
                        ${c.label}
                        ${((h=this._sort)==null?void 0:h.key)===c.key?d`
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
                    <td colspan="${e.length}" class="gouv-datalist__empty">
                      Aucune donnée à afficher
                    </td>
                  </tr>
                `:i.map(c=>d`
                  <tr>
                    ${e.map(h=>d`
                      <td>${this._formatCellValue(c[h.key])}</td>
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
        .gouv-datalist__filters {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .gouv-datalist__filters .fr-select-group {
          margin-bottom: 0;
        }

        .gouv-datalist__toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .gouv-datalist__toolbar .fr-search-bar {
          flex: 1;
          min-width: 200px;
          max-width: 400px;
        }

        @media (max-width: 576px) {
          .gouv-datalist__filters {
            grid-template-columns: 1fr;
          }
          .gouv-datalist__toolbar {
            flex-direction: column;
            align-items: stretch;
          }
          .gouv-datalist__toolbar .fr-search-bar {
            max-width: none;
          }
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
    `}_renderPageNumbers(e){const t=[],i=this._currentPage;for(let r=Math.max(1,i-2);r<=Math.min(e,i+2);r++)t.push(r);return t.map(r=>d`
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
    `)}},o.GouvDatalist.styles=be``,y([u({type:String})],o.GouvDatalist.prototype,"source",void 0),y([u({type:String})],o.GouvDatalist.prototype,"colonnes",void 0),y([u({type:Boolean})],o.GouvDatalist.prototype,"recherche",void 0),y([u({type:String})],o.GouvDatalist.prototype,"filtres",void 0),y([u({type:String})],o.GouvDatalist.prototype,"tri",void 0),y([u({type:Number})],o.GouvDatalist.prototype,"pagination",void 0),y([u({type:String})],o.GouvDatalist.prototype,"export",void 0),y([v()],o.GouvDatalist.prototype,"_loading",void 0),y([v()],o.GouvDatalist.prototype,"_data",void 0),y([v()],o.GouvDatalist.prototype,"_error",void 0),y([v()],o.GouvDatalist.prototype,"_searchQuery",void 0),y([v()],o.GouvDatalist.prototype,"_activeFilters",void 0),y([v()],o.GouvDatalist.prototype,"_sort",void 0),y([v()],o.GouvDatalist.prototype,"_currentPage",void 0),o.GouvDatalist=y([A("gouv-datalist")],o.GouvDatalist);var m=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};const Ne=["#000091","#009081","#A558A0","#C9191E","#E4794A","#FFD1A1","#68A532","#5770BE"];o.GouvChart=class extends ${constructor(){super(...arguments),this.source="",this.type="bar",this.indexAxis="x",this.labelField="",this.valueField="",this.aggregation="none",this.limit=0,this.sortOrder="desc",this.title="",this.subtitle="",this.color="#000091",this.height=350,this._loading=!1,this._data=[],this._error=null,this._chartInstance=null,this._unsubscribe=null,this._canvasId=`gouv-chart-${Math.random().toString(36).substr(2,9)}`}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this._destroyChart()}updated(e){e.has("source")&&this._subscribeToSource(),["type","indexAxis","labelField","valueField","aggregation","limit","sortOrder","title","subtitle","color","height"].some(r=>e.has(r))&&this._data.length>0&&this._renderChart()}_subscribeToSource(){if(this._unsubscribe&&this._unsubscribe(),!this.source)return;const e=W(this.source);e!==void 0&&Array.isArray(e)&&(this._data=e,this.updateComplete.then(()=>this._renderChart())),this._unsubscribe=K(this.source,{onLoaded:t=>{this._data=Array.isArray(t)?t:[],this._loading=!1,this._error=null,this.updateComplete.then(()=>this._renderChart())},onLoading:()=>{this._loading=!0},onError:t=>{this._error=t,this._loading=!1}})}_processData(){if(!this._data||!Array.isArray(this._data)||this._data.length===0)return{labels:[],values:[]};let e=this._data.map(t=>({label:String(w(t,this.labelField)??"N/A"),value:Number(w(t,this.valueField))||0}));return this.aggregation!=="none"&&(e=this._aggregate(e)),this.sortOrder!=="none"&&e.sort((t,i)=>this.sortOrder==="desc"?i.value-t.value:t.value-i.value),this.limit>0&&(e=e.slice(0,this.limit)),{labels:e.map(t=>t.label),values:e.map(t=>Math.round(t.value*100)/100)}}_aggregate(e){const t=new Map;for(const r of e){const n=t.get(r.label)||[];n.push(r.value),t.set(r.label,n)}const i=[];for(const[r,n]of t){let s;switch(this.aggregation){case"sum":s=n.reduce((l,c)=>l+c,0);break;case"avg":s=n.reduce((l,c)=>l+c,0)/n.length;break;case"count":s=n.length;break;case"min":s=Math.min(...n);break;case"max":s=Math.max(...n);break;default:s=n[0]||0}i.push({label:r,value:s})}return i}_destroyChart(){this._chartInstance&&(this._chartInstance.destroy(),this._chartInstance=null)}_renderChart(){const e=this.querySelector(`#${this._canvasId}`);if(!e)return;if(typeof Chart>"u"){console.error("gouv-chart: Chart.js non chargé");return}this._destroyChart();const{labels:t,values:i}=this._processData();if(t.length===0)return;const r=e.getContext("2d");if(!r)return;const n=["pie","doughnut","radar"].includes(this.type),s=n?t.map((c,h)=>Ne[h%Ne.length]):this.color,l={type:this.type==="radar"?"radar":this.type,data:{labels:t,datasets:[{label:this.valueField.split(".").pop()||"Valeur",data:i,backgroundColor:s,borderColor:n?s:this.color,borderWidth:this.type==="line"?2:1}]},options:{responsive:!0,maintainAspectRatio:!1,indexAxis:this.type==="bar"?this.indexAxis:void 0,plugins:{title:{display:!!this.title,text:this.title,font:{size:16,weight:"bold"}},subtitle:{display:!!this.subtitle,text:this.subtitle,font:{size:12}},legend:{display:n,position:"bottom"}},scales:["pie","doughnut","radar"].includes(this.type)?void 0:{y:{beginAtZero:!0}}}};this._chartInstance=new Chart(r,l)}_getAccessibleTableHtml(){const{labels:e,values:t}=this._processData();if(e.length===0)return"";const i=e.map((r,n)=>`<tr><td>${this._escapeHtml(r)}</td><td>${t[n]}</td></tr>`).join("");return`
      <table class="fr-table">
        <thead>
          <tr>
            <th>${this.labelField.split(".").pop()||"Label"}</th>
            <th>${this.valueField.split(".").pop()||"Valeur"}</th>
          </tr>
        </thead>
        <tbody>${i}</tbody>
      </table>
    `}_escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}render(){return d`
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
    `}},m([u({type:String})],o.GouvChart.prototype,"source",void 0),m([u({type:String})],o.GouvChart.prototype,"type",void 0),m([u({type:String,attribute:"index-axis"})],o.GouvChart.prototype,"indexAxis",void 0),m([u({type:String,attribute:"label-field"})],o.GouvChart.prototype,"labelField",void 0),m([u({type:String,attribute:"value-field"})],o.GouvChart.prototype,"valueField",void 0),m([u({type:String})],o.GouvChart.prototype,"aggregation",void 0),m([u({type:Number})],o.GouvChart.prototype,"limit",void 0),m([u({type:String,attribute:"sort-order"})],o.GouvChart.prototype,"sortOrder",void 0),m([u({type:String})],o.GouvChart.prototype,"title",void 0),m([u({type:String})],o.GouvChart.prototype,"subtitle",void 0),m([u({type:String})],o.GouvChart.prototype,"color",void 0),m([u({type:Number})],o.GouvChart.prototype,"height",void 0),m([v()],o.GouvChart.prototype,"_loading",void 0),m([v()],o.GouvChart.prototype,"_data",void 0),m([v()],o.GouvChart.prototype,"_error",void 0),o.GouvChart=m([A("gouv-chart")],o.GouvChart);var f=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};o.GouvDsfrChart=class extends ${constructor(){super(...arguments),this.source="",this.type="bar",this.labelField="",this.valueField="",this.valueField2="",this.name="",this.selectedPalette="categorical",this.unitTooltip="",this.unitTooltipBar="",this.horizontal=!1,this.stacked=!1,this.fill=!1,this.highlightIndex="",this.xMin="",this.xMax="",this.yMin="",this.yMax="",this.gaugeValue=null,this.mapHighlight="",this._loading=!1,this._data=[],this._error=null,this._unsubscribe=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)}updated(e){e.has("source")&&this._subscribeToSource()}_subscribeToSource(){if(this._unsubscribe&&this._unsubscribe(),!this.source)return;const e=W(this.source);e!==void 0&&Array.isArray(e)&&(this._data=e),this._unsubscribe=K(this.source,{onLoaded:t=>{this._data=Array.isArray(t)?t:[],this._loading=!1,this._error=null},onLoading:()=>{this._loading=!0},onError:t=>{this._error=t,this._loading=!1}})}_processData(){if(!this._data||!Array.isArray(this._data)||this._data.length===0)return{x:"[[]]",y:"[[]]"};const e=[],t=[],i=[];for(const l of this._data){const c=w(l,this.labelField),h=w(l,this.valueField);if(e.push(String(c??"N/A")),t.push(Number(h)||0),this.valueField2){const b=w(l,this.valueField2);i.push(Number(b)||0)}}const r=JSON.stringify([e]),n=JSON.stringify([t]),s=this.valueField2?JSON.stringify([i]):void 0;return{x:r,y:n,y2:s}}_getCommonAttributes(){const e={};if(this.selectedPalette&&(e["selected-palette"]=this.selectedPalette),this.unitTooltip&&(e["unit-tooltip"]=this.unitTooltip),this.xMin&&(e["x-min"]=this.xMin),this.xMax&&(e["x-max"]=this.xMax),this.yMin&&(e["y-min"]=this.yMin),this.yMax&&(e["y-max"]=this.yMax),this.name)e.name=this.name;else if(this.valueField){const t=this.valueField2?[this.valueField,this.valueField2]:[this.valueField];e.name=JSON.stringify(t)}return e}_renderChart(){const{x:e,y:t,y2:i}=this._processData(),r=this._getCommonAttributes();switch(this.type){case"line":return this._createChartElement("line-chart",{x:e,y:t,...r});case"bar":return this._createChartElement("bar-chart",{x:e,y:t,...r,...this.horizontal?{horizontal:"true"}:{},...this.stacked?{stacked:"true"}:{},...this.highlightIndex?{"highlight-index":this.highlightIndex}:{}});case"pie":return this._createChartElement("pie-chart",{x:e,y:t,...r,...this.fill?{fill:"true"}:{}});case"radar":return this._createChartElement("radar-chart",{x:e,y:t,...r});case"scatter":return this._createChartElement("scatter-chart",{x:e,y:t,...r});case"gauge":const n=this.gaugeValue??(this._data.length>0&&Number(w(this._data[0],this.valueField))||0);return this._createChartElement("gauge-chart",{percent:String(Math.round(n)),init:"0",target:"100",...r});case"bar-line":return this._createChartElement("bar-line-chart",{x:e,"y-bar":t,"y-line":i||t,...r,...this.unitTooltipBar?{"unit-tooltip-bar":this.unitTooltipBar}:{}});case"map":return this._createChartElement("map-chart",{x:e,y:t,...r,...this.mapHighlight?{highlight:this.mapHighlight}:{}});case"map-reg":return this._createChartElement("map-chart-reg",{x:e,y:t,...r,...this.mapHighlight?{highlight:this.mapHighlight}:{}});default:return d`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`}}_createChartElement(e,t){const i=document.createElement(e);for(const[n,s]of Object.entries(t))s!==void 0&&s!==""&&i.setAttribute(n,s);const r=Object.entries(t).filter(([,n])=>n!==void 0&&n!=="").map(([n,s])=>`${n}='${s.replace(/'/g,"\\'")}'`).join(" ");return d`<div class="gouv-dsfr-chart__wrapper" .innerHTML="${`<${e} ${r}></${e}>`}"></div>`}render(){return this._loading?d`
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
      `:this._renderChart()}},f([u({type:String})],o.GouvDsfrChart.prototype,"source",void 0),f([u({type:String})],o.GouvDsfrChart.prototype,"type",void 0),f([u({type:String,attribute:"label-field"})],o.GouvDsfrChart.prototype,"labelField",void 0),f([u({type:String,attribute:"value-field"})],o.GouvDsfrChart.prototype,"valueField",void 0),f([u({type:String,attribute:"value-field-2"})],o.GouvDsfrChart.prototype,"valueField2",void 0),f([u({type:String})],o.GouvDsfrChart.prototype,"name",void 0),f([u({type:String,attribute:"selected-palette"})],o.GouvDsfrChart.prototype,"selectedPalette",void 0),f([u({type:String,attribute:"unit-tooltip"})],o.GouvDsfrChart.prototype,"unitTooltip",void 0),f([u({type:String,attribute:"unit-tooltip-bar"})],o.GouvDsfrChart.prototype,"unitTooltipBar",void 0),f([u({type:Boolean})],o.GouvDsfrChart.prototype,"horizontal",void 0),f([u({type:Boolean})],o.GouvDsfrChart.prototype,"stacked",void 0),f([u({type:Boolean})],o.GouvDsfrChart.prototype,"fill",void 0),f([u({type:String,attribute:"highlight-index"})],o.GouvDsfrChart.prototype,"highlightIndex",void 0),f([u({type:String,attribute:"x-min"})],o.GouvDsfrChart.prototype,"xMin",void 0),f([u({type:String,attribute:"x-max"})],o.GouvDsfrChart.prototype,"xMax",void 0),f([u({type:String,attribute:"y-min"})],o.GouvDsfrChart.prototype,"yMin",void 0),f([u({type:String,attribute:"y-max"})],o.GouvDsfrChart.prototype,"yMax",void 0),f([u({type:Number,attribute:"gauge-value"})],o.GouvDsfrChart.prototype,"gaugeValue",void 0),f([u({type:String,attribute:"map-highlight"})],o.GouvDsfrChart.prototype,"mapHighlight",void 0),f([v()],o.GouvDsfrChart.prototype,"_loading",void 0),f([v()],o.GouvDsfrChart.prototype,"_data",void 0),f([v()],o.GouvDsfrChart.prototype,"_error",void 0),o.GouvDsfrChart=f([A("gouv-dsfr-chart")],o.GouvDsfrChart);var pe=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};o.AppHeader=class extends ${constructor(){super(...arguments),this.currentPage="",this.basePath=""}createRenderRoot(){return this}_getNavItems(){return[{id:"accueil",label:"Accueil",href:"index.html"},{id:"composants",label:"Composants",href:"demo/index.html"},{id:"builder",label:"Builder",href:"builder.html"},{id:"builder-ia",label:"Builder IA",href:"builderIA.html"},{id:"playground",label:"Playground",href:"playground.html"},{id:"sources",label:"Sources",href:"sources.html"}]}render(){const e=this._getNavItems();return d`
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
                ${e.map(t=>d`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this.basePath}${t.href}"
                       ${this.currentPage===t.id?d`aria-current="page"`:""}>
                      ${t.label}
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    `}},pe([u({type:String,attribute:"current-page"})],o.AppHeader.prototype,"currentPage",void 0),pe([u({type:String,attribute:"base-path"})],o.AppHeader.prototype,"basePath",void 0),o.AppHeader=pe([A("app-header")],o.AppHeader);var Fe=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};o.AppFooter=class extends ${constructor(){super(...arguments),this.basePath=""}createRenderRoot(){return this}render(){return d`
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
    `}},Fe([u({type:String,attribute:"base-path"})],o.AppFooter.prototype,"basePath",void 0),o.AppFooter=Fe([A("app-footer")],o.AppFooter);var F=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};o.AppLayoutBuilder=class extends ${constructor(){super(...arguments),this.leftWidth=400,this.minLeftWidth=280,this.minRightWidth=300,this._isResizing=!1,this._currentLeftWidth=400,this._leftContent=[],this._rightContent=[],this._contentMoved=!1,this._boundMouseMove=null,this._boundMouseUp=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._currentLeftWidth=this.leftWidth,this._setupResizer(),this._saveSlotContent()}_saveSlotContent(){this._leftContent=Array.from(this.querySelectorAll('[slot="left"]')),this._rightContent=Array.from(this.querySelectorAll('[slot="right"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".builder-layout-left"),t=this.querySelector(".builder-layout-right");e&&t&&(this._leftContent.forEach(i=>e.appendChild(i)),this._rightContent.forEach(i=>t.appendChild(i)),this._contentMoved=!0)}disconnectedCallback(){super.disconnectedCallback(),this._cleanupResizer()}_setupResizer(){this._boundMouseMove=this._handleMouseMove.bind(this),this._boundMouseUp=this._handleMouseUp.bind(this)}_cleanupResizer(){this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp)}_handleMouseDown(e){e.preventDefault(),this._isResizing=!0,document.body.style.cursor="col-resize",document.body.style.userSelect="none",this._boundMouseMove&&document.addEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.addEventListener("mouseup",this._boundMouseUp)}_handleMouseMove(e){if(!this._isResizing)return;const t=this.querySelector(".builder-layout-container");if(!t)return;const i=t.getBoundingClientRect();let r=e.clientX-i.left;r=Math.max(this.minLeftWidth,Math.min(r,i.width-this.minRightWidth)),this._currentLeftWidth=r,this.requestUpdate()}_handleMouseUp(){this._isResizing&&(this._isResizing=!1,document.body.style.cursor="",document.body.style.userSelect="",this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp))}render(){return d`
      <div class="builder-layout-container">
        <aside class="builder-layout-left" style="width: ${this._currentLeftWidth}px">
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
          flex-shrink: 0;
          overflow-y: auto;
          overflow-x: hidden;
          border-right: 1px solid var(--border-default-grey);
          background: var(--background-alt-grey);
          display: flex;
          flex-direction: column;
          min-height: 0;
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
    `}},F([u({type:Number,attribute:"left-width"})],o.AppLayoutBuilder.prototype,"leftWidth",void 0),F([u({type:Number,attribute:"min-left-width"})],o.AppLayoutBuilder.prototype,"minLeftWidth",void 0),F([u({type:Number,attribute:"min-right-width"})],o.AppLayoutBuilder.prototype,"minRightWidth",void 0),F([v()],o.AppLayoutBuilder.prototype,"_isResizing",void 0),F([v()],o.AppLayoutBuilder.prototype,"_currentLeftWidth",void 0),o.AppLayoutBuilder=F([A("app-layout-builder")],o.AppLayoutBuilder);var J=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};o.AppLayoutDemo=class extends ${constructor(){super(...arguments),this.title="",this.icon="",this.activePath="",this.basePath="",this._contentElements=[],this._contentMoved=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._contentElements=Array.from(this.querySelectorAll('[slot="content"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".demo-content-slot");e&&(this._contentElements.forEach(t=>e.appendChild(t)),this._contentMoved=!0)}_getMenuStructure(){return[{id:"overview",label:"Vue d'ensemble",href:"index.html"},{id:"components",label:"Nos composants",href:"#",children:[{id:"components/gouv-source",label:"gouv-source",href:"components/gouv-source.html"},{id:"components/gouv-kpi",label:"gouv-kpi",href:"components/gouv-kpi.html"},{id:"components/gouv-datalist",label:"gouv-datalist",href:"components/gouv-datalist.html"},{id:"components/gouv-dsfr-chart",label:"gouv-dsfr-chart",href:"components/gouv-dsfr-chart.html"}]},{id:"charts",label:"Graphiques DSFR",href:"#",children:[{id:"charts/line-chart",label:"line-chart",href:"charts/line-chart.html"},{id:"charts/bar-chart",label:"bar-chart",href:"charts/bar-chart.html"},{id:"charts/pie-chart",label:"pie-chart",href:"charts/pie-chart.html"},{id:"charts/radar-chart",label:"radar-chart",href:"charts/radar-chart.html"},{id:"charts/gauge-chart",label:"gauge-chart",href:"charts/gauge-chart.html"},{id:"charts/map-chart",label:"map-chart",href:"charts/map-chart.html"},{id:"charts/scatter-chart",label:"scatter-chart",href:"charts/scatter-chart.html"}]}]}_isActive(e){return this.activePath===e}_isParentActive(e){return e.children?e.children.some(t=>this._isActive(t.id)):!1}_renderMenuItem(e){const t=this._isActive(e.id),i=this._isParentActive(e);if(e.children){const r=`fr-sidemenu-${e.id}`,n=i;return d`
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
      `}else return d`
        <li class="fr-sidemenu__item ${t?"fr-sidemenu__item--active":""}">
          <a class="fr-sidemenu__link"
             href="${this.basePath}${e.href}"
             ${t?d`aria-current="page"`:""}>
            ${e.label}
          </a>
        </li>
      `}_renderBreadcrumb(){if(!this.activePath||this.activePath==="overview")return"";const e=this.activePath.split("/"),t=[{label:"Composants",href:`${this.basePath}index.html`}];if(e.length>1){const i=e[0]==="components"?"Nos composants":"Graphiques DSFR";t.push({label:i,href:"#"})}return t.push({label:this.title,href:""}),d`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((i,r)=>d`
              <li>
                ${r===t.length-1?d`<a class="fr-breadcrumb__link" aria-current="page">${i.label}</a>`:d`<a class="fr-breadcrumb__link" href="${i.href}">${i.label}</a>`}
              </li>
            `)}
          </ol>
        </div>
      </nav>
    `}render(){const e=this._getMenuStructure();return d`
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

            ${this.title?d`
              <h1>
                ${this.icon?d`<span class="${this.icon} fr-mr-1w" aria-hidden="true"></span>`:""}
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
    `}},J([u({type:String})],o.AppLayoutDemo.prototype,"title",void 0),J([u({type:String})],o.AppLayoutDemo.prototype,"icon",void 0),J([u({type:String,attribute:"active-path"})],o.AppLayoutDemo.prototype,"activePath",void 0),J([u({type:String,attribute:"base-path"})],o.AppLayoutDemo.prototype,"basePath",void 0),o.AppLayoutDemo=J([A("app-layout-demo")],o.AppLayoutDemo);var Q=function(a,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(n=(r<3?s(n):r>3?s(e,t,n):s(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};let j=class extends ${constructor(){super(...arguments),this.showDataTab=!1,this.tabLabels="Aperçu,Code,Données",this.activeTab="preview",this._activeTab="preview",this._previewContent=[],this._codeContent=[],this._dataContent=[],this._contentMoved=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._activeTab=this.activeTab,this._saveSlotContent()}_saveSlotContent(){this._previewContent=Array.from(this.querySelectorAll('[slot="preview"]')),this._codeContent=Array.from(this.querySelectorAll('[slot="code"]')),this._dataContent=Array.from(this.querySelectorAll('[slot="data"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector("#tab-preview"),t=this.querySelector("#tab-code"),i=this.querySelector("#tab-data");e&&this._previewContent.forEach(r=>e.appendChild(r)),t&&this._codeContent.forEach(r=>t.appendChild(r)),i&&this._dataContent.forEach(r=>i.appendChild(r)),this._contentMoved=!0}setActiveTab(e){this._activeTab=e,this.requestUpdate()}getActiveTab(){return this._activeTab}_handleTabClick(e){this._activeTab=e,this.dispatchEvent(new CustomEvent("tab-change",{detail:{tab:e},bubbles:!0,composed:!0})),this.requestUpdate()}_getTabLabels(){return this.tabLabels.split(",").map(e=>e.trim())}render(){const e=this._getTabLabels(),[t,i,r]=e;return d`
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
          ${this.showDataTab?d`
            <button
              class="preview-panel-tab ${this._activeTab==="data"?"active":""}"
              data-tab="data"
              @click="${()=>this._handleTabClick("data")}">
              ${r||"Données"}
            </button>
          `:_}
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
    `}};Q([u({type:Boolean,attribute:"show-data-tab"})],j.prototype,"showDataTab",void 0),Q([u({type:String,attribute:"tab-labels"})],j.prototype,"tabLabels",void 0),Q([u({type:String,attribute:"active-tab"})],j.prototype,"activeTab",void 0),Q([v()],j.prototype,"_activeTab",void 0),j=Q([A("app-preview-panel")],j),o.DATA_EVENTS=S,o.computeAggregation=he,o.dispatchDataError=Me,o.dispatchDataLoaded=Re,o.dispatchDataLoading=Oe,o.formatCurrency=Ge,o.formatDate=ht,o.formatNumber=de,o.formatPercentage=Te,o.formatValue=ue,o.getByPath=w,o.getByPathOrDefault=lt,o.getDataCache=W,o.hasPath=ot,o.parseExpression=Le,o.subscribeToSource=K,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
