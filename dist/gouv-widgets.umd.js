(function(l,x){typeof exports=="object"&&typeof module<"u"?x(exports):typeof define=="function"&&define.amd?define(["exports"],x):(l=typeof globalThis<"u"?globalThis:l||self,x(l.GouvWidgets={}))})(this,(function(l){"use strict";var ci=Object.defineProperty;var u=(l,x)=>ci(l,"name",{value:x,configurable:!0});var J,X,Rt,Z,Y,ee,te,ie,re,se,ne,ae,oe,le,ce;var x=typeof document<"u"?document.currentScript:null;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _e=globalThis,Pe=_e.ShadowRoot&&(_e.ShadyCSS===void 0||_e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xe=Symbol(),it=new WeakMap;let rt=(J=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==xe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Pe&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=it.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&it.set(t,e))}return e}toString(){return this.cssText}},u(J,"n"),J);const Mt=u(a=>new rt(typeof a=="string"?a:a+"",void 0,xe),"r$4"),st=u((a,...e)=>{const t=a.length===1?a[0]:e.reduce((i,r,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+a[s+1],a[0]);return new rt(t,a,xe)},"i$3"),Ft=u((a,e)=>{if(Pe)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=_e.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,a.appendChild(i)}},"S$1"),nt=Pe?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Mt(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Gt,defineProperty:Nt,getOwnPropertyDescriptor:Ot,getOwnPropertyNames:Tt,getOwnPropertySymbols:Lt,getPrototypeOf:zt}=Object,M=globalThis,at=M.trustedTypes,Ut=at?at.emptyScript:"",Re=M.reactiveElementPolyfillSupport,ue=u((a,e)=>a,"d$1"),ye={toAttribute(a,e){switch(e){case Boolean:a=a?Ut:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},Me=u((a,e)=>!Gt(a,e),"f$1"),ot={attribute:!0,type:String,converter:ye,reflect:!1,useDefault:!1,hasChanged:Me};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),M.litPropertyMetadata??(M.litPropertyMetadata=new WeakMap);let q=(X=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ot){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Nt(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=Ot(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const o=r==null?void 0:r.call(this);s==null||s.call(this,n),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ot}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;const e=zt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){const t=this.properties,i=[...Tt(t),...Lt(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(nt(r))}else e!==void 0&&t.push(nt(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ft(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var s;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const n=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:ye).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var s,n;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:ye;this._$Em=r;const p=c.fromAttribute(t,o.type);this[r]=p??((n=this._$Ej)==null?void 0:n.get(r))??p,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){var n;if(e!==void 0){const o=this.constructor;if(r===!1&&(s=this[e]),i??(i=o.getPropertyOptions(e)),!((i.hasChanged??Me)(s,t)||i.useDefault&&i.reflect&&s===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),s!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,n]of r){const{wrapped:o}=n,c=this[s];o!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,n,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}},u(X,"y"),X);q.elementStyles=[],q.shadowRootOptions={mode:"open"},q[ue("elementProperties")]=new Map,q[ue("finalized")]=new Map,Re==null||Re({ReactiveElement:q}),(M.reactiveElementVersions??(M.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de=globalThis,lt=u(a=>a,"i$1"),$e=de.trustedTypes,ct=$e?$e.createPolicy("lit-html",{createHTML:u(a=>a,"createHTML")}):void 0,ut="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,dt="?"+F,jt=`<${dt}>`,T=document,he=u(()=>T.createComment(""),"c"),pe=u(a=>a===null||typeof a!="object"&&typeof a!="function","a"),Fe=Array.isArray,Bt=u(a=>Fe(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function","d"),Ge=`[ 	
\f\r]`,fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ht=/-->/g,pt=/>/g,L=RegExp(`>|${Ge}(?:([^\\s"'>=/]+)(${Ge}*=${Ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,gt=/"/g,vt=/^(?:script|style|textarea|title)$/i,It=u(a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),"x"),h=It(1),V=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),mt=new WeakMap,z=T.createTreeWalker(T,129);function bt(a,e){if(!Fe(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(e):e}u(bt,"V");const qt=u((a,e)=>{const t=a.length-1,i=[];let r,s=e===2?"<svg>":e===3?"<math>":"",n=fe;for(let o=0;o<t;o++){const c=a[o];let p,g,f=-1,m=0;for(;m<c.length&&(n.lastIndex=m,g=n.exec(c),g!==null);)m=n.lastIndex,n===fe?g[1]==="!--"?n=ht:g[1]!==void 0?n=pt:g[2]!==void 0?(vt.test(g[2])&&(r=RegExp("</"+g[2],"g")),n=L):g[3]!==void 0&&(n=L):n===L?g[0]===">"?(n=r??fe,f=-1):g[1]===void 0?f=-2:(f=n.lastIndex-g[2].length,p=g[1],n=g[3]===void 0?L:g[3]==='"'?gt:ft):n===gt||n===ft?n=L:n===ht||n===pt?n=fe:(n=L,r=void 0);const k=n===L&&a[o+1].startsWith("/>")?" ":"";s+=n===fe?c+jt:f>=0?(i.push(p),c.slice(0,f)+ut+c.slice(f)+F+k):c+F+(f===-2?o:k)}return[bt(a,s+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},"N"),ke=class ke{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,n=0;const o=e.length-1,c=this.parts,[p,g]=qt(e,t);if(this.el=ke.createElement(p,i),z.currentNode=this.el.content,t===2||t===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=z.nextNode())!==null&&c.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(const f of r.getAttributeNames())if(f.endsWith(ut)){const m=g[n++],k=r.getAttribute(f).split(F),Ee=/([.?@])?(.*)/.exec(m);c.push({type:1,index:s,name:Ee[2],strings:k,ctor:Ee[1]==="."?Oe:Ee[1]==="?"?Te:Ee[1]==="@"?Le:Q}),r.removeAttribute(f)}else f.startsWith(F)&&(c.push({type:6,index:s}),r.removeAttribute(f));if(vt.test(r.tagName)){const f=r.textContent.split(F),m=f.length-1;if(m>0){r.textContent=$e?$e.emptyScript:"";for(let k=0;k<m;k++)r.append(f[k],he()),z.nextNode(),c.push({type:2,index:++s});r.append(f[m],he())}}}else if(r.nodeType===8)if(r.data===dt)c.push({type:2,index:s});else{let f=-1;for(;(f=r.data.indexOf(F,f+1))!==-1;)c.push({type:7,index:s}),f+=F.length-1}s++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}};u(ke,"S");let ge=ke;function H(a,e,t=a,i){var n,o;if(e===V)return e;let r=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const s=pe(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((o=r==null?void 0:r._$AO)==null||o.call(r,!1),s===void 0?r=void 0:(r=new s(a),r._$AT(a,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=H(a,r._$AS(a,e.values),r,i)),e}u(H,"M");const Ke=class Ke{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??T).importNode(t,!0);z.currentNode=r;let s=z.nextNode(),n=0,o=0,c=i[0];for(;c!==void 0;){if(n===c.index){let p;c.type===2?p=new ve(s,s.nextSibling,this,e):c.type===1?p=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(p=new ze(s,this,e)),this._$AV.push(p),c=i[++o]}n!==(c==null?void 0:c.index)&&(s=z.nextNode(),n++)}return z.currentNode=T,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};u(Ke,"R");let Ne=Ke;const De=class De{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=H(this,e,t),pe(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==V&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Bt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&pe(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ge.createElement(bt(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(t);else{const n=new Ne(r,this),o=n.u(this.options);n.p(t),this.T(o),this._$AH=n}}_$AC(e){let t=mt.get(e.strings);return t===void 0&&mt.set(e.strings,t=new ge(e)),t}k(e){Fe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new De(this.O(he()),this.O(he()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const r=lt(e).nextSibling;lt(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}};u(De,"k");let ve=De;const Je=class Je{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=v}_$AI(e,t=this,i,r){const s=this.strings;let n=!1;if(s===void 0)e=H(this,e,t,0),n=!pe(e)||e!==this._$AH&&e!==V,n&&(this._$AH=e);else{const o=e;let c,p;for(e=s[0],c=0;c<s.length-1;c++)p=H(this,o[i+c],t,c),p===V&&(p=this._$AH[c]),n||(n=!pe(p)||p!==this._$AH[c]),p===v?e=v:e!==v&&(e+=(p??"")+s[c+1]),this._$AH[c]=p}n&&!r&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};u(Je,"H");let Q=Je;const Xe=class Xe extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}};u(Xe,"I");let Oe=Xe;const Ze=class Ze extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}};u(Ze,"L");let Te=Ze;const Ye=class Ye extends Q{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=H(this,e,t,0)??v)===V)return;const i=this._$AH,r=e===v&&i!==v||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==v&&(i===v||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}};u(Ye,"z");let Le=Ye;const et=class et{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){H(this,e)}};u(et,"Z");let ze=et;const Ue=de.litHtmlPolyfillSupport;Ue==null||Ue(ge,ve),(de.litHtmlVersions??(de.litHtmlVersions=[])).push("3.3.2");const Vt=u((a,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const s=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new ve(e.insertBefore(he(),s),s,void 0,t??{})}return r._$AI(a),r},"D");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=globalThis,tt=class tt extends q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Vt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return V}};u(tt,"i");let w=tt;w._$litElement$=!0,w.finalized=!0,(Rt=U.litElementHydrateSupport)==null||Rt.call(U,{LitElement:w});const je=U.litElementPolyfillSupport;je==null||je({LitElement:w}),(U.litElementVersions??(U.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=u(a=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(a,e)}):customElements.define(a,e)},"t");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht={attribute:!0,type:String,converter:ye,reflect:!1,hasChanged:Me},Qt=u((a=Ht,e,t)=>{const{kind:i,metadata:r}=t;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((a=Object.create(a)).wrapped=!0),s.set(t.name,a),i==="accessor"){const{name:n}=t;return{set(o){const c=e.get.call(this);e.set.call(this,o),this.requestUpdate(n,c,a,!0,o)},init(o){return o!==void 0&&this.C(n,void 0,a,o),o}}}if(i==="setter"){const{name:n}=t;return function(o){const c=this[n];e.call(this,o),this.requestUpdate(n,c,a,!0,o)}}throw Error("Unsupported decorator location: "+i)},"r$1");function d(a){return(e,t)=>typeof t=="object"?Qt(a,e,t):((i,r,s)=>{const n=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),n?Object.getOwnPropertyDescriptor(r,s):void 0})(a,e,t)}u(d,"n");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(a){return d({...a,state:!0,attribute:!1})}u(b,"r");function y(a,e){if(!e||e.trim()==="")return a;const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=a;for(const s of i){if(r==null||typeof r!="object")return;r=r[s]}return r}u(y,"getByPath");function Wt(a,e){return y(a,e)!==void 0}u(Wt,"hasPath");function _t(a,e,t){const r=e.replace(/\[(\d+)\]/g,".$1").split(".");let s=a;for(let n=0;n<r.length-1;n++){const o=r[n];(!(o in s)||typeof s[o]!="object"||s[o]===null)&&(s[o]={}),s=s[o]}s[r[r.length-1]]=t}u(_t,"setByPath");function Kt(a,e,t){const i=y(a,e);return i!==void 0?i:t}u(Kt,"getByPathOrDefault");const Jt="https://chartsbuilder.matge.com/beacon",yt=new Set;function j(a,e){const t=`${a}:${e||""}`;if(yt.has(t)||(yt.add(t),typeof window>"u"))return;const i=window.location.hostname;if(i==="localhost"||i==="127.0.0.1"||i==="chartsbuilder.matge.com")return;const r=new URLSearchParams;r.set("c",a),e&&r.set("t",e);const s=`${Jt}?${r.toString()}`;try{fetch(s,{method:"GET",keepalive:!0,mode:"no-cors"}).catch(()=>{})}catch{}}u(j,"sendWidgetBeacon");function $t(a,e=!1){if(typeof a=="number")return isNaN(a)?e?null:0:a;if(typeof a!="string")return e?null:0;let t=a.trim();if(t==="")return e?null:0;t=t.replace(/\s/g,"");const i=t.includes(","),r=t.includes(".");if(i&&r){const n=t.lastIndexOf(","),o=t.lastIndexOf(".");n>o?t=t.replace(/\./g,"").replace(",","."):t=t.replace(/,/g,"")}else i&&(t=t.replace(",","."));const s=parseFloat(t);return isNaN(s)?e?null:0:s}u($t,"toNumber");function Xt(a){if(typeof a!="string")return!1;const e=a.trim();return e===""?!1:/^-?[\d\s]+([.,]\d+)?$/.test(e)}u(Xt,"looksLikeNumber");function Zt(a){return!a||typeof a!="string"||["N/A","null","undefined","00",""].includes(a)?!1:!!(a==="2A"||a==="2B"||/^97[1-6]$/.test(a)||/^(0[1-9]|[1-8]\d|9[0-5])$/.test(a))}u(Zt,"isValidDeptCode");const Be={baseUrl:"https://chartsbuilder.matge.com",endpoints:{grist:"/grist-proxy",gristGouv:"/grist-gouv-proxy",albert:"/albert-proxy",tabular:"/tabular-proxy"}};function Yt(){return typeof window<"u"&&window.location.hostname==="localhost"&&window.location.port==="5173"}u(Yt,"isViteDevMode");function ei(){return typeof window<"u"&&"__TAURI__"in window}u(ei,"isTauriMode");function wt(){var i;const a={...Be.endpoints};return Yt()?{baseUrl:"",endpoints:a}:ei()?{baseUrl:Be.baseUrl,endpoints:a}:{baseUrl:((i={url:typeof document>"u"&&typeof location>"u"?require("url").pathToFileURL(__filename).href:typeof document>"u"?location.href:x&&x.tagName.toUpperCase()==="SCRIPT"&&x.src||new URL("gouv-widgets.umd.js",document.baseURI).href}.env)==null?void 0:i.VITE_PROXY_URL)||Be.baseUrl,endpoints:a}}u(wt,"getProxyConfig");function ti(a){const e=wt();return a.includes("tabular-api.data.gouv.fr")?a.replace("https://tabular-api.data.gouv.fr",`${e.baseUrl}${e.endpoints.tabular}`):a.includes("docs.getgrist.com")?a.replace("https://docs.getgrist.com",`${e.baseUrl}${e.endpoints.grist}`):a.includes("grist.numerique.gouv.fr")?a.replace("https://grist.numerique.gouv.fr",`${e.baseUrl}${e.endpoints.gristGouv}`):a.includes("albert.api.etalab.gouv.fr")?a.replace("https://albert.api.etalab.gouv.fr",`${e.baseUrl}${e.endpoints.albert}`):a}u(ti,"getProxiedUrl");const E={LOADED:"gouv-data-loaded",ERROR:"gouv-data-error",LOADING:"gouv-data-loading"},Ie=new Map;function ii(a,e){Ie.set(a,e)}u(ii,"setDataCache");function W(a){return Ie.get(a)}u(W,"getDataCache");function we(a){Ie.delete(a)}u(we,"clearDataCache");function B(a,e){ii(a,e);const t=new CustomEvent(E.LOADED,{bubbles:!0,composed:!0,detail:{sourceId:a,data:e}});document.dispatchEvent(t)}u(B,"dispatchDataLoaded");function G(a,e){const t=new CustomEvent(E.ERROR,{bubbles:!0,composed:!0,detail:{sourceId:a,error:e}});document.dispatchEvent(t)}u(G,"dispatchDataError");function N(a){const e=new CustomEvent(E.LOADING,{bubbles:!0,composed:!0,detail:{sourceId:a}});document.dispatchEvent(e)}u(N,"dispatchDataLoading");function me(a,e){const t=u(s=>{const n=s;n.detail.sourceId===a&&e.onLoaded&&e.onLoaded(n.detail.data)},"handleLoaded"),i=u(s=>{const n=s;n.detail.sourceId===a&&e.onError&&e.onError(n.detail.error)},"handleError"),r=u(s=>{s.detail.sourceId===a&&e.onLoading&&e.onLoading()},"handleLoading");return document.addEventListener(E.LOADED,t),document.addEventListener(E.ERROR,i),document.addEventListener(E.LOADING,r),()=>{document.removeEventListener(E.LOADED,t),document.removeEventListener(E.ERROR,i),document.removeEventListener(E.LOADING,r)}}u(me,"subscribeToSource");var P=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.GouvSource=(Z=class extends w{constructor(){super(...arguments),this.url="",this.method="GET",this.headers="",this.params="",this.refresh=0,this.transform="",this._loading=!1,this._error=null,this._data=null,this._refreshInterval=null,this._abortController=null}createRenderRoot(){return this}render(){return h``}connectedCallback(){super.connectedCallback(),j("gouv-source"),this._setupRefresh()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&we(this.id)}updated(e){(e.has("url")||e.has("params")||e.has("transform"))&&this._fetchData(),e.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._fetchData()},this.refresh*1e3))}async _fetchData(){if(this.url){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,N(this.id);try{const e=ti(this._buildUrl()),t=this._buildFetchOptions(),i=await fetch(e,{...t,signal:this._abortController.signal});if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);const r=await i.json();this._data=this.transform?y(r,this.transform):r,B(this.id,this._data)}catch(e){if(e.name==="AbortError")return;this._error=e,G(this.id,this._error),console.error(`gouv-source[${this.id}]: Erreur de chargement`,e)}finally{this._loading=!1}}}_buildUrl(){const e=window.location.origin!=="null"?window.location.origin:void 0,t=new URL(this.url,e);if(this.params&&this.method==="GET")try{const i=JSON.parse(this.params);Object.entries(i).forEach(([r,s])=>{t.searchParams.set(r,String(s))})}catch(i){console.warn("gouv-source: params invalides (JSON attendu)",i)}return t.toString()}_buildFetchOptions(){const e={method:this.method};if(this.headers)try{e.headers=JSON.parse(this.headers)}catch(t){console.warn("gouv-source: headers invalides (JSON attendu)",t)}return this.method==="POST"&&this.params&&(e.headers={"Content-Type":"application/json",...e.headers||{}},e.body=this.params),e}reload(){this._fetchData()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},u(Z,"GouvSource"),Z),P([d({type:String})],l.GouvSource.prototype,"url",void 0),P([d({type:String})],l.GouvSource.prototype,"method",void 0),P([d({type:String})],l.GouvSource.prototype,"headers",void 0),P([d({type:String})],l.GouvSource.prototype,"params",void 0),P([d({type:Number})],l.GouvSource.prototype,"refresh",void 0),P([d({type:String})],l.GouvSource.prototype,"transform",void 0),P([b()],l.GouvSource.prototype,"_loading",void 0),P([b()],l.GouvSource.prototype,"_error",void 0),P([b()],l.GouvSource.prototype,"_data",void 0),l.GouvSource=P([A("gouv-source")],l.GouvSource);var $=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};const Se=100,qe=10;l.GouvQuery=(Y=class extends w{constructor(){super(...arguments),this.apiType="generic",this.source="",this.baseUrl="",this.datasetId="",this.resource="",this.select="",this.where="",this.filter="",this.groupBy="",this.aggregate="",this.orderBy="",this.limit=0,this.transform="",this.refresh=0,this._loading=!1,this._error=null,this._data=[],this._rawData=[],this._refreshInterval=null,this._abortController=null,this._unsubscribe=null}createRenderRoot(){return this}render(){return h``}connectedCallback(){super.connectedCallback(),j("gouv-query",this.apiType),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&we(this.id)}updated(e){["source","apiType","baseUrl","dataset","resource","select","where","filter","groupBy","aggregate","orderBy","limit","transform"].some(i=>e.has(i))&&this._initialize(),e.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._initialize()},this.refresh*1e3))}_initialize(){if(!this.id){console.warn('gouv-query: attribut "id" requis pour identifier la requête');return}this.apiType==="generic"?this._subscribeToSource():this._fetchFromApi()}_subscribeToSource(){if(!this.source){console.warn('gouv-query: attribut "source" requis en mode generic');return}this._unsubscribe&&this._unsubscribe();const e=W(this.source);e!==void 0&&(this._rawData=Array.isArray(e)?e:[e],this._processClientSide()),this._unsubscribe=me(this.source,{onLoaded:u(t=>{this._rawData=Array.isArray(t)?t:[t],this._processClientSide()},"onLoaded"),onLoading:u(()=>{this._loading=!0,N(this.id)},"onLoading"),onError:u(t=>{this._error=t,this._loading=!1,G(this.id,t)},"onError")})}_processClientSide(){try{N(this.id),this._loading=!0;let e=[...this._rawData];const t=this.filter||this.where;t&&(e=this._applyFilters(e,t)),this.groupBy&&(e=this._applyGroupByAndAggregate(e)),this.orderBy&&(e=this._applySort(e)),this.limit>0&&(e=e.slice(0,this.limit)),this._data=e,B(this.id,this._data)}catch(e){this._error=e,G(this.id,this._error),console.error(`gouv-query[${this.id}]: Erreur de traitement`,e)}finally{this._loading=!1}}_applyFilters(e,t){const i=this._parseFilters(t);return e.filter(r=>i.every(s=>this._matchesFilter(r,s)))}_parseFilters(e){const t=[],i=e.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const s=r.split(":");if(s.length>=2){const n=s[0],o=s[1];let c;if(s.length>2){const p=s.slice(2).join(":");o==="in"||o==="notin"?c=p.split("|").map(g=>{const f=this._parseValue(g);return typeof f=="boolean"?String(f):f}):c=this._parseValue(p)}t.push({field:n,operator:o,value:c})}}return t}_parseValue(e){return e==="true"?!0:e==="false"?!1:!isNaN(Number(e))&&e!==""?Number(e):e}_matchesFilter(e,t){const i=y(e,t.field);switch(t.operator){case"eq":return i==t.value;case"neq":return i!=t.value;case"gt":return Number(i)>Number(t.value);case"gte":return Number(i)>=Number(t.value);case"lt":return Number(i)<Number(t.value);case"lte":return Number(i)<=Number(t.value);case"contains":return String(i).toLowerCase().includes(String(t.value).toLowerCase());case"notcontains":return!String(i).toLowerCase().includes(String(t.value).toLowerCase());case"in":return Array.isArray(t.value)&&t.value.includes(i);case"notin":return Array.isArray(t.value)&&!t.value.includes(i);case"isnull":return i==null;case"isnotnull":return i!=null;default:return!0}}_applyGroupByAndAggregate(e){const t=this.groupBy.split(",").map(n=>n.trim()).filter(Boolean),i=this._parseAggregates(this.aggregate),r=new Map;for(const n of e){const o=t.map(c=>String(y(n,c)??"")).join("|||");r.has(o)||r.set(o,[]),r.get(o).push(n)}const s=[];for(const[n,o]of r){const c={},p=n.split("|||");t.forEach((g,f)=>{_t(c,g,p[f])});for(const g of i){const f=g.alias||`${g.field}__${g.function}`;_t(c,f,this._computeAggregate(o,g))}s.push(c)}return s}_parseAggregates(e){if(!e)return[];const t=[],i=e.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const s=r.split(":");s.length>=2&&t.push({field:s[0],function:s[1],alias:s[2]})}return t}_computeAggregate(e,t){const i=e.map(r=>Number(y(r,t.field))).filter(r=>!isNaN(r));switch(t.function){case"count":return e.length;case"sum":return i.reduce((r,s)=>r+s,0);case"avg":return i.length>0?i.reduce((r,s)=>r+s,0)/i.length:0;case"min":return i.length>0?Math.min(...i):0;case"max":return i.length>0?Math.max(...i):0;default:return 0}}_applySort(e){const t=this.orderBy.split(":");if(t.length<1)return e;const i=t[0],r=(t[1]||"asc").toLowerCase();return[...e].sort((s,n)=>{const o=y(s,i),c=y(n,i),p=Number(o),g=Number(c);if(!isNaN(p)&&!isNaN(g))return r==="desc"?g-p:p-g;const f=String(o??""),m=String(c??"");return r==="desc"?m.localeCompare(f):f.localeCompare(m)})}async _fetchFromApi(){if(!this.datasetId){console.warn('gouv-query: attribut "dataset" requis pour les requêtes API');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,N(this.id);try{this.apiType==="opendatasoft"?await this._fetchFromOdsWithPagination():await this._fetchSinglePage()}catch(e){if(e.name==="AbortError")return;this._error=e,G(this.id,this._error),console.error(`gouv-query[${this.id}]: Erreur de requête API`,e)}finally{this._loading=!1}}async _fetchSinglePage(){const e=this._buildApiUrl(),t=await fetch(e,{signal:this._abortController.signal});if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);const i=await t.json();let r=this.transform?y(i,this.transform):i;Array.isArray(r)||(this.apiType==="tabular"&&i.data?r=i.data:r=[r]),this._data=r,B(this.id,this._data)}async _fetchFromOdsWithPagination(){const t=this.limit<=0?qe*Se:this.limit,i=Se;let r=[],s=0,n=-1;for(let o=0;o<qe;o++){const c=t-r.length;if(c<=0)break;const p=this._buildOpenDataSoftUrl(Math.min(i,c),s),g=await fetch(p,{signal:this._abortController.signal});if(!g.ok)throw new Error(`HTTP ${g.status}: ${g.statusText}`);const f=await g.json(),m=f.results||[];if(r=r.concat(m),typeof f.total_count=="number"&&(n=f.total_count),n>=0&&r.length>=n||m.length<i)break;s+=m.length}n>=0&&r.length<n&&r.length<t&&console.warn(`gouv-query[${this.id}]: pagination incomplete - ${r.length}/${n} resultats recuperes (limite de securite: ${qe} pages de ${Se})`),this._data=this.transform?y(r,this.transform):r,B(this.id,this._data)}_buildApiUrl(){if(this.apiType==="opendatasoft")return this._buildOpenDataSoftUrl();if(this.apiType==="tabular")return this._buildTabularUrl();throw new Error(`Type d'API non supporté: ${this.apiType}`)}_buildOpenDataSoftUrl(e,t){const i=this.baseUrl||"https://data.opendatasoft.com",r=new URL(`${i}/api/explore/v2.1/catalog/datasets/${this.datasetId}/records`);this.select&&r.searchParams.set("select",this.select);const s=this.where||this.filter;if(s&&r.searchParams.set("where",s),this.groupBy&&r.searchParams.set("group_by",this.groupBy),this.orderBy){const n=this.orderBy.replace(/:(\w+)$/,(o,c)=>` ${c.toUpperCase()}`);r.searchParams.set("order_by",n)}return e!==void 0?r.searchParams.set("limit",String(e)):this.limit>0&&r.searchParams.set("limit",String(Math.min(this.limit,Se))),t&&t>0&&r.searchParams.set("offset",String(t)),r.toString()}_buildTabularUrl(){let e;if(this.baseUrl)e=this.baseUrl;else{const r=wt();e=`${r.baseUrl}${r.endpoints.tabular}`}if(!this.resource)throw new Error(`gouv-query: attribut "resource" requis pour l'API Tabular`);const t=new URL(`${e}/api/resources/${this.resource}/data/`,window.location.origin),i=this.filter||this.where;if(i){const r=i.split(",").map(s=>s.trim());for(const s of r){const n=s.split(":");if(n.length>=3){const o=n[0],c=this._mapOperatorToTabular(n[1]),p=n.slice(2).join(":");t.searchParams.set(`${o}__${c}`,p)}}}if(this.groupBy){const r=this.groupBy.split(",").map(s=>s.trim());for(const s of r)t.searchParams.append(`${s}__groupby`,"")}if(this.aggregate){const r=this.aggregate.split(",").map(s=>s.trim());for(const s of r){const n=s.split(":");if(n.length>=2){const o=n[0],c=n[1];t.searchParams.append(`${o}__${c}`,"")}}}if(this.orderBy){const r=this.orderBy.split(":"),s=r[0],n=r[1]||"asc";t.searchParams.set(`${s}__sort`,n)}return this.limit>0&&t.searchParams.set("page_size",String(Math.min(this.limit,50))),t.toString()}_mapOperatorToTabular(e){return{eq:"exact",neq:"differs",gt:"strictly_greater",gte:"greater",lt:"strictly_less",lte:"less",contains:"contains",notcontains:"notcontains",in:"in",notin:"notin",isnull:"isnull",isnotnull:"isnotnull"}[e]||e}reload(){this._initialize()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},u(Y,"GouvQuery"),Y),$([d({type:String,attribute:"api-type"})],l.GouvQuery.prototype,"apiType",void 0),$([d({type:String})],l.GouvQuery.prototype,"source",void 0),$([d({type:String,attribute:"base-url"})],l.GouvQuery.prototype,"baseUrl",void 0),$([d({type:String,attribute:"dataset-id"})],l.GouvQuery.prototype,"datasetId",void 0),$([d({type:String})],l.GouvQuery.prototype,"resource",void 0),$([d({type:String})],l.GouvQuery.prototype,"select",void 0),$([d({type:String})],l.GouvQuery.prototype,"where",void 0),$([d({type:String})],l.GouvQuery.prototype,"filter",void 0),$([d({type:String,attribute:"group-by"})],l.GouvQuery.prototype,"groupBy",void 0),$([d({type:String})],l.GouvQuery.prototype,"aggregate",void 0),$([d({type:String,attribute:"order-by"})],l.GouvQuery.prototype,"orderBy",void 0),$([d({type:Number})],l.GouvQuery.prototype,"limit",void 0),$([d({type:String})],l.GouvQuery.prototype,"transform",void 0),$([d({type:Number})],l.GouvQuery.prototype,"refresh",void 0),$([b()],l.GouvQuery.prototype,"_loading",void 0),$([b()],l.GouvQuery.prototype,"_error",void 0),$([b()],l.GouvQuery.prototype,"_data",void 0),$([b()],l.GouvQuery.prototype,"_rawData",void 0),l.GouvQuery=$([A("gouv-query")],l.GouvQuery);var R=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.GouvNormalize=(ee=class extends w{constructor(){super(...arguments),this.source="",this.numeric="",this.numericAuto=!1,this.rename="",this.trim=!1,this.stripHtml=!1,this.replace="",this.lowercaseKeys=!1,this._unsubscribe=null}createRenderRoot(){return this}render(){return h``}connectedCallback(){super.connectedCallback(),j("gouv-normalize"),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this.id&&we(this.id)}updated(e){if(super.updated(e),e.has("source")){this._initialize();return}if(["numeric","numericAuto","rename","trim","stripHtml","replace","lowercaseKeys"].some(r=>e.has(r))){const r=this.source?W(this.source):void 0;r!==void 0&&this._processData(r)}}_initialize(){if(!this.id){console.warn('gouv-normalize: attribut "id" requis pour identifier la sortie');return}if(!this.source){console.warn('gouv-normalize: attribut "source" requis');return}this._unsubscribe&&this._unsubscribe();const e=W(this.source);e!==void 0&&this._processData(e),this._unsubscribe=me(this.source,{onLoaded:u(t=>{this._processData(t)},"onLoaded"),onLoading:u(()=>{N(this.id)},"onLoading"),onError:u(t=>{G(this.id,t)},"onError")})}_processData(e){try{N(this.id);const t=Array.isArray(e)?e:[e],i=this._parseNumericFields(),r=this._parsePipeMap(this.rename),s=this._parsePipeMap(this.replace),n=t.map(o=>o==null||typeof o!="object"?o:this._normalizeRow(o,i,r,s));B(this.id,n)}catch(t){G(this.id,t),console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`,t)}}_normalizeRow(e,t,i,r){const s={};for(const[n,o]of Object.entries(e)){const c=this.trim?n.trim():n;let p=o;if(this.trim&&typeof p=="string"&&(p=p.trim()),this.stripHtml&&typeof p=="string"&&(p=p.replace(/<[^>]*>/g,"")),r.size>0&&typeof p=="string"){for(const[m,k]of r)if(p===m){p=k;break}}if(t.has(c))p=$t(p);else if(this.numericAuto&&typeof p=="string"&&Xt(p)){const m=$t(p,!0);m!==null&&(p=m)}const g=i.get(c)??c,f=this.lowercaseKeys?g.toLowerCase():g;s[f]=p}return s}_parseNumericFields(){return this.numeric?new Set(this.numeric.split(",").map(e=>e.trim()).filter(Boolean)):new Set}_parsePipeMap(e){const t=new Map;if(!e)return t;const i=e.split("|");for(const r of i){const s=r.indexOf(":");if(s===-1)continue;const n=r.substring(0,s).trim(),o=r.substring(s+1).trim();n&&t.set(n,o)}return t}},u(ee,"GouvNormalize"),ee),R([d({type:String})],l.GouvNormalize.prototype,"source",void 0),R([d({type:String})],l.GouvNormalize.prototype,"numeric",void 0),R([d({type:Boolean,attribute:"numeric-auto"})],l.GouvNormalize.prototype,"numericAuto",void 0),R([d({type:String})],l.GouvNormalize.prototype,"rename",void 0),R([d({type:Boolean})],l.GouvNormalize.prototype,"trim",void 0),R([d({type:Boolean,attribute:"strip-html"})],l.GouvNormalize.prototype,"stripHtml",void 0),R([d({type:String})],l.GouvNormalize.prototype,"replace",void 0),R([d({type:Boolean,attribute:"lowercase-keys"})],l.GouvNormalize.prototype,"lowercaseKeys",void 0),l.GouvNormalize=R([A("gouv-normalize")],l.GouvNormalize);var S=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.GouvFacets=(te=class extends w{constructor(){super(...arguments),this.source="",this.fields="",this.labels="",this.maxValues=6,this.disjunctive="",this.sort="count",this.searchable="",this.hideEmpty=!1,this.display="",this._rawData=[],this._facetGroups=[],this._activeSelections={},this._expandedFacets=new Set,this._searchQueries={},this._openMultiselectField=null,this._unsubscribe=null,this._onClickOutsideMultiselect=e=>{if(!this._openMultiselectField)return;const t=e.target,i=this.querySelector(`[data-multiselect="${this._openMultiselectField}"]`);i&&!i.contains(t)&&(this._openMultiselectField=null)}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),j("gouv-facets"),this._initialize(),document.addEventListener("click",this._onClickOutsideMultiselect)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onClickOutsideMultiselect),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this.id&&we(this.id)}updated(e){if(super.updated(e),e.has("source")){this._initialize();return}["fields","labels","sort","hideEmpty","maxValues","disjunctive","searchable","display"].some(r=>e.has(r))&&this._rawData.length>0&&(this._buildFacetGroups(),this._applyFilters())}_initialize(){if(!this.id){console.warn('gouv-facets: attribut "id" requis pour identifier la sortie');return}if(!this.source){console.warn('gouv-facets: attribut "source" requis');return}this._unsubscribe&&this._unsubscribe(),this._activeSelections={},this._expandedFacets=new Set,this._searchQueries={};const e=W(this.source);e!==void 0&&this._onData(e),this._unsubscribe=me(this.source,{onLoaded:u(t=>{this._onData(t)},"onLoaded"),onLoading:u(()=>{N(this.id)},"onLoading"),onError:u(t=>{G(this.id,t)},"onError")})}_onData(e){this._rawData=Array.isArray(e)?e:[],this._buildFacetGroups(),this._applyFilters()}_buildFacetGroups(){const e=this._getFields(),t=this._parseLabels();this._facetGroups=e.map(i=>{const r=this._computeFacetValues(i);return{field:i,label:t.get(i)??i,values:r}}).filter(i=>this.hideEmpty&&i.values.length<=1?!1:i.values.length>0)}_getFields(){return this.fields?Ve(this.fields):this._autoDetectFields()}_autoDetectFields(){if(this._rawData.length===0)return[];const e=[],t=this._rawData[0];for(const i of Object.keys(t)){const r=new Set;let s=!0;for(const n of this._rawData){const o=n[i];if(!(o==null||o==="")){if(typeof o!="string"){s=!1;break}if(r.add(o),r.size>50)break}}s&&(r.size<=1||r.size>50||r.size!==this._rawData.length&&e.push(i))}return e}_computeFacetValues(e){const t=this._getDataFilteredExcluding(e),i=new Map;for(const s of t){const n=s[e];if(n==null||n==="")continue;const o=String(n);i.set(o,(i.get(o)??0)+1)}const r=[];for(const[s,n]of i)r.push({value:s,count:n});return this._sortValues(r)}_getDataFilteredExcluding(e){const t=Object.keys(this._activeSelections).filter(i=>i!==e&&this._activeSelections[i].size>0);return t.length===0?this._rawData:this._rawData.filter(i=>t.every(r=>{const s=this._activeSelections[r],n=i[r];return n==null?!1:s.has(String(n))}))}_sortValues(e){const t=[...e];switch(this.sort){case"count":t.sort((i,r)=>r.count-i.count);break;case"-count":t.sort((i,r)=>i.count-r.count);break;case"alpha":t.sort((i,r)=>i.value.localeCompare(r.value,"fr"));break;case"-alpha":t.sort((i,r)=>r.value.localeCompare(i.value,"fr"));break;default:t.sort((i,r)=>r.count-i.count)}return t}_applyFilters(){const e=Object.keys(this._activeSelections).filter(i=>this._activeSelections[i].size>0);let t;e.length===0?t=this._rawData:t=this._rawData.filter(i=>e.every(r=>{const s=this._activeSelections[r],n=i[r];return n==null?!1:s.has(String(n))})),B(this.id,t)}_parseLabels(){const e=new Map;if(!this.labels)return e;const t=this.labels.split("|");for(const i of t){const r=i.indexOf(":");if(r===-1)continue;const s=i.substring(0,r).trim(),n=i.substring(r+1).trim();s&&e.set(s,n)}return e}_parseDisplayModes(){const e=new Map;if(!this.display)return e;const t=this.display.split("|");for(const i of t){const r=i.indexOf(":");if(r===-1)continue;const s=i.substring(0,r).trim(),n=i.substring(r+1).trim();s&&(n==="checkbox"||n==="select"||n==="multiselect")&&e.set(s,n)}return e}_getDisplayMode(e){return this._parseDisplayModes().get(e)??"checkbox"}_toggleValue(e,t){const i={...this._activeSelections},r=new Set(i[e]??[]),s=this._getDisplayMode(e),n=Ve(this.disjunctive),o=s==="multiselect"||s==="checkbox"&&n.includes(e);r.has(t)?r.delete(t):(o||r.clear(),r.add(t)),r.size===0?delete i[e]:i[e]=r,this._activeSelections=i,this._buildFacetGroups(),this._applyFilters()}_handleSelectChange(e,t){const r=t.target.value,s={...this._activeSelections};r?s[e]=new Set([r]):delete s[e],this._activeSelections=s,this._buildFacetGroups(),this._applyFilters()}_clearFieldSelections(e){const t={...this._activeSelections};delete t[e],this._activeSelections=t,this._buildFacetGroups(),this._applyFilters()}_toggleMultiselectDropdown(e){this._openMultiselectField=this._openMultiselectField===e?null:e}_toggleExpand(e){const t=new Set(this._expandedFacets);t.has(e)?t.delete(e):t.add(e),this._expandedFacets=t}_handleSearch(e,t){const i=t.target;this._searchQueries={...this._searchQueries,[e]:i.value}}_clearAll(){this._activeSelections={},this._searchQueries={},this._buildFacetGroups(),this._applyFilters()}render(){if(this._rawData.length===0||this._facetGroups.length===0)return v;const e=Object.keys(this._activeSelections).some(t=>this._activeSelections[t].size>0);return h`
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
        ${e?h`
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
    `}_renderFacetGroup(e){switch(this._getDisplayMode(e.field)){case"select":return this._renderSelectGroup(e);case"multiselect":return this._renderMultiselectGroup(e);default:return this._renderCheckboxGroup(e)}}_renderCheckboxGroup(e){const i=Ve(this.searchable).includes(e.field),r=(this._searchQueries[e.field]??"").toLowerCase(),s=this._expandedFacets.has(e.field),n=this._activeSelections[e.field]??new Set;let o=e.values;i&&r&&(o=o.filter(f=>f.value.toLowerCase().includes(r)));const c=s?o:o.slice(0,this.maxValues),p=o.length>this.maxValues,g=`facet-${this.id}-${e.field}`;return h`
      <fieldset class="gouv-facets__group fr-fieldset" aria-labelledby="${g}-legend">
        <legend class="gouv-facets__legend" id="${g}-legend">${e.label}</legend>
        ${i?h`
          <div class="gouv-facets__search">
            <input class="fr-input fr-input--sm" type="search"
              placeholder="Rechercher..."
              .value="${this._searchQueries[e.field]??""}"
              @input="${f=>this._handleSearch(e.field,f)}"
              aria-label="Rechercher dans ${e.label}">
          </div>
        `:v}
        <ul class="gouv-facets__values" role="group">
          ${c.map(f=>{const m=`${g}-${f.value.replace(/[^a-zA-Z0-9]/g,"_")}`,k=n.has(f.value);return h`
              <li class="gouv-facets__value">
                <input type="checkbox" id="${m}"
                  .checked="${k}"
                  @change="${()=>this._toggleValue(e.field,f.value)}">
                <label class="gouv-facets__value-label" for="${m}">${f.value}</label>
                <span class="gouv-facets__value-count">${f.count}</span>
              </li>
            `})}
        </ul>
        ${p?h`
          <button class="gouv-facets__more" type="button"
            @click="${()=>this._toggleExpand(e.field)}">
            ${s?"Voir moins":`Voir plus (${o.length-this.maxValues})`}
          </button>
        `:v}
      </fieldset>
    `}_renderSelectGroup(e){const t=`facet-${this.id}-${e.field}`,i=this._activeSelections[e.field],r=i?[...i][0]??"":"";return h`
      <div class="gouv-facets__group fr-select-group" data-field="${e.field}">
        <label class="fr-label" for="${t}-select">${e.label}</label>
        <select class="fr-select" id="${t}-select"
          @change="${s=>this._handleSelectChange(e.field,s)}">
          <option value="" ?selected="${!r}">Tous</option>
          ${e.values.map(s=>h`
            <option value="${s.value}" ?selected="${s.value===r}">
              ${s.value} (${s.count})
            </option>
          `)}
        </select>
      </div>
    `}_renderMultiselectGroup(e){const t=`facet-${this.id}-${e.field}`,i=this._activeSelections[e.field]??new Set,r=this._openMultiselectField===e.field,s=(this._searchQueries[e.field]??"").toLowerCase();let n=e.values;s&&(n=n.filter(c=>c.value.toLowerCase().includes(s)));const o=i.size>0?`${i.size} option${i.size>1?"s":""} selectionnee${i.size>1?"s":""}`:"Selectionnez des options";return h`
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
        ${r?h`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               @click="${c=>c.stopPropagation()}">
            ${i.size>0?h`
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
              ${n.map(c=>{const p=`${t}-${c.value.replace(/[^a-zA-Z0-9]/g,"_")}`,g=i.has(c.value);return h`
                  <li class="gouv-facets__value">
                    <input type="checkbox" id="${p}"
                      .checked="${g}"
                      @change="${()=>this._toggleValue(e.field,c.value)}">
                    <label class="gouv-facets__value-label" for="${p}">${c.value}</label>
                    <span class="gouv-facets__value-count">${c.count}</span>
                  </li>
                `})}
            </ul>
          </div>
        `:v}
      </div>
    `}},u(te,"GouvFacets"),te),S([d({type:String})],l.GouvFacets.prototype,"source",void 0),S([d({type:String})],l.GouvFacets.prototype,"fields",void 0),S([d({type:String})],l.GouvFacets.prototype,"labels",void 0),S([d({type:Number,attribute:"max-values"})],l.GouvFacets.prototype,"maxValues",void 0),S([d({type:String})],l.GouvFacets.prototype,"disjunctive",void 0),S([d({type:String})],l.GouvFacets.prototype,"sort",void 0),S([d({type:String})],l.GouvFacets.prototype,"searchable",void 0),S([d({type:Boolean,attribute:"hide-empty"})],l.GouvFacets.prototype,"hideEmpty",void 0),S([d({type:String})],l.GouvFacets.prototype,"display",void 0),S([b()],l.GouvFacets.prototype,"_rawData",void 0),S([b()],l.GouvFacets.prototype,"_facetGroups",void 0),S([b()],l.GouvFacets.prototype,"_activeSelections",void 0),S([b()],l.GouvFacets.prototype,"_expandedFacets",void 0),S([b()],l.GouvFacets.prototype,"_searchQueries",void 0),S([b()],l.GouvFacets.prototype,"_openMultiselectField",void 0),l.GouvFacets=S([A("gouv-facets")],l.GouvFacets);function Ve(a){return a?a.split(",").map(e=>e.trim()).filter(Boolean):[]}u(Ve,"_parseCSV");function Ce(a){const t=class t extends a{constructor(){super(...arguments),this._sourceLoading=!1,this._sourceData=null,this._sourceError=null,this._unsubscribeSource=null}onSourceData(r){}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSubscription()}updated(r){super.updated(r),r.has("source")&&this._subscribeToSource()}_subscribeToSource(){this._cleanupSubscription();const r=this.source;if(!r)return;const s=W(r);s!==void 0&&(this._sourceData=s,this.onSourceData(s)),this._unsubscribeSource=me(r,{onLoaded:u(n=>{this._sourceData=n,this._sourceLoading=!1,this._sourceError=null,this.onSourceData(n),this.requestUpdate()},"onLoaded"),onLoading:u(()=>{this._sourceLoading=!0,this.requestUpdate()},"onLoading"),onError:u(n=>{this._sourceError=n,this._sourceLoading=!1,this.requestUpdate()},"onError")})}_cleanupSubscription(){this._unsubscribeSource&&(this._unsubscribeSource(),this._unsubscribeSource=null)}};u(t,"SourceSubscriberElement");let e=t;return e}u(Ce,"SourceSubscriberMixin");function He(a,e="nombre"){if(a==null||a==="")return"—";const t=typeof a=="string"?parseFloat(a):a;if(isNaN(t))return"—";switch(e){case"nombre":return Qe(t);case"pourcentage":return St(t);case"euro":return Ct(t);case"decimal":return ri(t);default:return Qe(t)}}u(He,"formatValue");function Qe(a){return new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(Math.round(a))}u(Qe,"formatNumber");function St(a){return new Intl.NumberFormat("fr-FR",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:1}).format(a/100)}u(St,"formatPercentage");function Ct(a){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(a)}u(Ct,"formatCurrency");function ri(a){return new Intl.NumberFormat("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:2}).format(a)}u(ri,"formatDecimal");function si(a){const e=typeof a=="string"?new Date(a):a;return isNaN(e.getTime())?"—":new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(e)}u(si,"formatDate");function ni(a,e,t){return e!==void 0&&a>=e?"vert":t!==void 0&&a>=t?"orange":e!==void 0||t!==void 0?"rouge":"bleu"}u(ni,"getColorBySeuil");function At(a){const e=a.split(":");if(e.length===1)return e[0]==="count"?{type:"count",field:""}:{type:"direct",field:e[0]};const t=e[0],i=e[1];if(e.length===3){let r=e[2];return r==="true"?r=!0:r==="false"?r=!1:isNaN(Number(r))||(r=Number(r)),{type:t,field:i,filterField:i,filterValue:r}}return{type:t,field:i}}u(At,"parseExpression");function We(a,e){const t=At(e);if(t.type==="direct"&&!Array.isArray(a))return a[t.field];if(!Array.isArray(a))return null;const i=a;switch(t.type){case"direct":case"first":return i.length>0?i[0][t.field]:null;case"last":return i.length>0?i[i.length-1][t.field]:null;case"count":return t.filterValue!==void 0?i.filter(s=>s[t.field]===t.filterValue).length:i.length;case"sum":return i.reduce((s,n)=>{const o=Number(n[t.field]);return s+(isNaN(o)?0:o)},0);case"avg":return i.length===0?null:i.reduce((s,n)=>{const o=Number(n[t.field]);return s+(isNaN(o)?0:o)},0)/i.length;case"min":return i.length===0?null:Math.min(...i.map(s=>Number(s[t.field])).filter(s=>!isNaN(s)));case"max":return i.length===0?null:Math.max(...i.map(s=>Number(s[t.field])).filter(s=>!isNaN(s)));default:return null}}u(We,"computeAggregation");var D=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};const kt={vert:"gouv-kpi--success",orange:"gouv-kpi--warning",rouge:"gouv-kpi--error",bleu:"gouv-kpi--info"};l.GouvKpi=(ie=class extends Ce(w){constructor(){super(...arguments),this.source="",this.valeur="",this.label="",this.description="",this.icone="",this.format="nombre",this.tendance="",this.couleur=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),j("gouv-kpi")}_computeValue(){return!this._sourceData||!this.valeur?null:We(this._sourceData,this.valeur)}_getColor(){if(this.couleur)return this.couleur;const e=this._computeValue();return typeof e!="number"?"bleu":ni(e,this.seuilVert,this.seuilOrange)}_getTendanceInfo(){if(!this.tendance||!this._sourceData)return null;const e=We(this._sourceData,this.tendance);return typeof e!="number"?null:{value:e,direction:e>0?"up":e<0?"down":"stable"}}_getAriaLabel(){if(this.description)return this.description;const e=this._computeValue(),t=He(e,this.format);return`${this.label}: ${t}`}render(){const e=this._computeValue(),t=He(e,this.format),i=kt[this._getColor()]||kt.bleu,r=this._getTendanceInfo();return h`
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
    `}},u(ie,"GouvKpi"),ie),l.GouvKpi.styles=st``,D([d({type:String})],l.GouvKpi.prototype,"source",void 0),D([d({type:String})],l.GouvKpi.prototype,"valeur",void 0),D([d({type:String})],l.GouvKpi.prototype,"label",void 0),D([d({type:String})],l.GouvKpi.prototype,"description",void 0),D([d({type:String})],l.GouvKpi.prototype,"icone",void 0),D([d({type:String})],l.GouvKpi.prototype,"format",void 0),D([d({type:String})],l.GouvKpi.prototype,"tendance",void 0),D([d({type:Number,attribute:"seuil-vert"})],l.GouvKpi.prototype,"seuilVert",void 0),D([d({type:Number,attribute:"seuil-orange"})],l.GouvKpi.prototype,"seuilOrange",void 0),D([d({type:String})],l.GouvKpi.prototype,"couleur",void 0),l.GouvKpi=D([A("gouv-kpi")],l.GouvKpi);var C=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.GouvDatalist=(re=class extends Ce(w){constructor(){super(...arguments),this.source="",this.colonnes="",this.recherche=!1,this.filtres="",this.tri="",this.pagination=0,this.export="",this._data=[],this._searchQuery="",this._activeFilters={},this._sort=null,this._currentPage=1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),j("gouv-datalist"),this._initSort()}updated(e){super.updated(e),e.has("tri")&&this._initSort()}onSourceData(e){this._data=Array.isArray(e)?e:[],this._currentPage=1}parseColumns(){return this.colonnes?this.colonnes.split(",").map(e=>{const[t,i]=e.trim().split(":");return{key:t.trim(),label:(i==null?void 0:i.trim())||t.trim()}}):[]}_getFilterableColumns(){return this.filtres?this.filtres.split(",").map(e=>e.trim()):[]}_initSort(){if(this.tri){const[e,t]=this.tri.split(":");this._sort={key:e,direction:t||"asc"}}}_getUniqueValues(e){const t=new Set;return this._data.forEach(i=>{const r=i[e];r!=null&&t.add(String(r))}),Array.from(t).sort()}getFilteredData(){let e=[...this._data];if(this._searchQuery){const t=this._searchQuery.toLowerCase();e=e.filter(i=>Object.values(i).some(r=>String(r).toLowerCase().includes(t)))}if(Object.entries(this._activeFilters).forEach(([t,i])=>{i&&(e=e.filter(r=>String(r[t])===i))}),this._sort){const{key:t,direction:i}=this._sort;e.sort((r,s)=>{const n=r[t],o=s[t];if(n===o)return 0;if(n==null)return 1;if(o==null)return-1;const c=typeof n=="number"&&typeof o=="number"?n-o:String(n).localeCompare(String(o),"fr");return i==="desc"?-c:c})}return e}_getPaginatedData(){const e=this.getFilteredData();if(!this.pagination||this.pagination<=0)return e;const t=(this._currentPage-1)*this.pagination;return e.slice(t,t+this.pagination)}_getTotalPages(){return!this.pagination||this.pagination<=0?1:Math.ceil(this.getFilteredData().length/this.pagination)}_handleSearch(e){this._searchQuery=e.target.value,this._currentPage=1}_handleFilter(e,t){this._activeFilters={...this._activeFilters,[e]:t.target.value},this._currentPage=1}_handleSort(e){var t;((t=this._sort)==null?void 0:t.key)===e?this._sort={key:e,direction:this._sort.direction==="asc"?"desc":"asc"}:this._sort={key:e,direction:"asc"}}_handlePageChange(e){this._currentPage=e}_exportCsv(){const e=this.parseColumns(),t=this.getFilteredData(),i=e.map(p=>p.label).join(";"),r=t.map(p=>e.map(g=>{const f=String(p[g.key]??"");return f.includes(";")||f.includes('"')?`"${f.replace(/"/g,'""')}"`:f}).join(";")),s=[i,...r].join(`
`),n=new Blob([s],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(n),c=document.createElement("a");c.href=o,c.download="export.csv",c.click(),URL.revokeObjectURL(o)}formatCellValue(e){return e==null?"—":typeof e=="boolean"?e?"Oui":"Non":String(e)}_renderFilters(e,t){return t.length===0?"":h`
      <div class="gouv-datalist__filters">
        ${t.map(i=>{const r=e.find(o=>o.key===i),s=(r==null?void 0:r.label)||i,n=this._getUniqueValues(i);return h`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${i}">${s}</label>
              <select
                class="fr-select"
                id="filter-${i}"
                @change="${o=>this._handleFilter(i,o)}"
              >
                <option value="">Tous</option>
                ${n.map(o=>h`
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
    `}render(){const e=this.parseColumns(),t=this._getFilterableColumns(),i=this._getPaginatedData(),r=this._getTotalPages(),s=this.getFilteredData().length;return h`
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
            ${s} résultat${s>1?"s":""}
            ${this._searchQuery||Object.values(this._activeFilters).some(n=>n)?" (filtré)":""}
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
    `}},u(re,"GouvDatalist"),re),l.GouvDatalist.styles=st``,C([d({type:String})],l.GouvDatalist.prototype,"source",void 0),C([d({type:String})],l.GouvDatalist.prototype,"colonnes",void 0),C([d({type:Boolean})],l.GouvDatalist.prototype,"recherche",void 0),C([d({type:String})],l.GouvDatalist.prototype,"filtres",void 0),C([d({type:String})],l.GouvDatalist.prototype,"tri",void 0),C([d({type:Number})],l.GouvDatalist.prototype,"pagination",void 0),C([d({type:String})],l.GouvDatalist.prototype,"export",void 0),C([b()],l.GouvDatalist.prototype,"_data",void 0),C([b()],l.GouvDatalist.prototype,"_searchQuery",void 0),C([b()],l.GouvDatalist.prototype,"_activeFilters",void 0),C([b()],l.GouvDatalist.prototype,"_sort",void 0),C([b()],l.GouvDatalist.prototype,"_currentPage",void 0),l.GouvDatalist=C([A("gouv-datalist")],l.GouvDatalist);var _=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};const ai={line:"line-chart",bar:"bar-chart",pie:"pie-chart",radar:"radar-chart",scatter:"scatter-chart",gauge:"gauge-chart","bar-line":"bar-line-chart",map:"map-chart","map-reg":"map-chart-reg"};l.GouvDsfrChart=(se=class extends Ce(w){constructor(){super(...arguments),this.source="",this.type="bar",this.labelField="",this.codeField="",this.valueField="",this.valueField2="",this.name="",this.selectedPalette="categorical",this.unitTooltip="",this.unitTooltipBar="",this.horizontal=!1,this.stacked=!1,this.fill=!1,this.highlightIndex="",this.xMin="",this.xMax="",this.yMin="",this.yMax="",this.gaugeValue=null,this.mapHighlight="",this._data=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),j("gouv-dsfr-chart",this.type)}onSourceData(e){this._data=Array.isArray(e)?e:[]}_processData(){if(!this._data||this._data.length===0)return{x:"[[]]",y:"[[]]",labels:[]};const e=[],t=[],i=[];for(const r of this._data)e.push(String(y(r,this.labelField)??"N/A")),t.push(Number(y(r,this.valueField))||0),this.valueField2&&i.push(Number(y(r,this.valueField2))||0);return{x:JSON.stringify([e]),y:JSON.stringify([t]),y2:this.valueField2?JSON.stringify([i]):void 0,labels:e}}_processMapData(){if(!this._data||this._data.length===0)return"{}";const e=this.codeField||this.labelField,t={};for(const i of this._data){let r=String(y(i,e)??"").trim();/^\d+$/.test(r)&&r.length<3&&(r=r.padStart(2,"0"));const s=Number(y(i,this.valueField))||0;(this.type==="map"?Zt(r):r!=="")&&(t[r]=Math.round(s*100)/100)}return JSON.stringify(t)}_getCommonAttributes(){const e={};if(this.selectedPalette&&(e["selected-palette"]=this.selectedPalette),this.unitTooltip&&(e["unit-tooltip"]=this.unitTooltip),this.xMin&&(e["x-min"]=this.xMin),this.xMax&&(e["x-max"]=this.xMax),this.yMin&&(e["y-min"]=this.yMin),this.yMax&&(e["y-max"]=this.yMax),this.name){const t=this.name.trim();e.name=t.startsWith("[")?t:JSON.stringify([t])}else if(this.valueField){const t=this.valueField2?[this.valueField,this.valueField2]:[this.valueField];e.name=JSON.stringify(t)}return e}_getTypeSpecificAttributes(){const{x:e,y:t,y2:i,labels:r}=this._processData(),s={},n={};switch(this.type){case"gauge":{const o=this.gaugeValue??(this._data.length>0&&Number(y(this._data[0],this.valueField))||0);s.percent=String(Math.round(o)),s.init="0",s.target="100";break}case"pie":s.x=e,s.y=t,!this.name&&r.length>0&&(s.name=JSON.stringify(r));break;case"bar-line":s.x=e,s["y-bar"]=t,s["y-line"]=i||t,this.unitTooltipBar&&(s["unit-tooltip-bar"]=this.unitTooltipBar);break;case"map":case"map-reg":{if(s.data=this._processMapData(),this._data.length>0){let o=0,c=0;for(const p of this._data){const g=Number(y(p,this.valueField));isNaN(g)||(o+=g,c++)}if(c>0){const p=Math.round(o/c*100)/100;n.value=String(p)}}n.date=new Date().toISOString().split("T")[0];break}default:s.x=e,s.y=t;break}return this.type==="bar"&&(this.horizontal&&(s.horizontal="true"),this.stacked&&(s.stacked="true"),this.highlightIndex&&(s["highlight-index"]=this.highlightIndex)),this.type==="pie"&&this.fill&&(s.fill="true"),(this.type==="map"||this.type==="map-reg")&&this.mapHighlight&&(s.highlight=this.mapHighlight),{attrs:s,deferred:n}}_getAriaLabel(){const t={bar:"barres",line:"lignes",pie:"camembert",radar:"radar",gauge:"jauge",scatter:"nuage de points","bar-line":"barres et lignes",map:"carte departements","map-reg":"carte regions"}[this.type]||this.type,i=this._data.length;return`Graphique ${t}, ${i} valeurs`}_createChartElement(e,t,i={}){const r=document.createElement(e);for(const[n,o]of Object.entries(t))o!==void 0&&o!==""&&r.setAttribute(n,o);Object.keys(i).length>0&&setTimeout(()=>{for(const[n,o]of Object.entries(i))r.setAttribute(n,o)},500);const s=document.createElement("div");return s.className="gouv-dsfr-chart__wrapper",s.setAttribute("role","img"),s.setAttribute("aria-label",this._getAriaLabel()),s.appendChild(r),s}_renderChart(){const e=ai[this.type];if(!e)return h`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;const{attrs:t,deferred:i}=this._getTypeSpecificAttributes(),r={...this._getCommonAttributes(),...t},s=this._createChartElement(e,r,i),n=this.querySelector(".gouv-dsfr-chart__wrapper");return n&&n.remove(),h`${s}`}render(){return this._sourceLoading?h`
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
      `:this._renderChart()}},u(se,"GouvDsfrChart"),se),_([d({type:String})],l.GouvDsfrChart.prototype,"source",void 0),_([d({type:String})],l.GouvDsfrChart.prototype,"type",void 0),_([d({type:String,attribute:"label-field"})],l.GouvDsfrChart.prototype,"labelField",void 0),_([d({type:String,attribute:"code-field"})],l.GouvDsfrChart.prototype,"codeField",void 0),_([d({type:String,attribute:"value-field"})],l.GouvDsfrChart.prototype,"valueField",void 0),_([d({type:String,attribute:"value-field-2"})],l.GouvDsfrChart.prototype,"valueField2",void 0),_([d({type:String})],l.GouvDsfrChart.prototype,"name",void 0),_([d({type:String,attribute:"selected-palette"})],l.GouvDsfrChart.prototype,"selectedPalette",void 0),_([d({type:String,attribute:"unit-tooltip"})],l.GouvDsfrChart.prototype,"unitTooltip",void 0),_([d({type:String,attribute:"unit-tooltip-bar"})],l.GouvDsfrChart.prototype,"unitTooltipBar",void 0),_([d({type:Boolean})],l.GouvDsfrChart.prototype,"horizontal",void 0),_([d({type:Boolean})],l.GouvDsfrChart.prototype,"stacked",void 0),_([d({type:Boolean})],l.GouvDsfrChart.prototype,"fill",void 0),_([d({type:String,attribute:"highlight-index"})],l.GouvDsfrChart.prototype,"highlightIndex",void 0),_([d({type:String,attribute:"x-min"})],l.GouvDsfrChart.prototype,"xMin",void 0),_([d({type:String,attribute:"x-max"})],l.GouvDsfrChart.prototype,"xMax",void 0),_([d({type:String,attribute:"y-min"})],l.GouvDsfrChart.prototype,"yMin",void 0),_([d({type:String,attribute:"y-max"})],l.GouvDsfrChart.prototype,"yMax",void 0),_([d({type:Number,attribute:"gauge-value"})],l.GouvDsfrChart.prototype,"gaugeValue",void 0),_([d({type:String,attribute:"map-highlight"})],l.GouvDsfrChart.prototype,"mapHighlight",void 0),_([b()],l.GouvDsfrChart.prototype,"_data",void 0),l.GouvDsfrChart=_([A("gouv-dsfr-chart")],l.GouvDsfrChart);var Ae=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.AppHeader=(ne=class extends w{constructor(){super(...arguments),this.currentPage="",this.basePath="",this._favCount=0}createRenderRoot(){return this}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}connectedCallback(){super.connectedCallback();try{const e=JSON.parse(localStorage.getItem("gouv-widgets-favorites")||"[]");this._favCount=Array.isArray(e)?e.length:0}catch{}if(!document.getElementById("app-header-active-style")){const e=document.createElement("style");e.id="app-header-active-style",e.textContent='.fr-nav__link[aria-current="page"]{font-weight:700;border-bottom:2px solid var(--border-action-high-blue-france);color:var(--text-action-high-blue-france)}',document.head.appendChild(e)}}_getNavItems(){return[{id:"accueil",label:"Accueil",href:"index.html"},{id:"composants",label:"Composants",href:"demo/index.html"},{id:"builder",label:"Builder",href:"apps/builder/index.html"},{id:"builder-ia",label:"Builder IA",href:"apps/builder-ia/index.html"},{id:"playground",label:"Playground",href:"apps/playground/index.html"},{id:"dashboard",label:"Dashboard",href:"apps/dashboard/index.html"},{id:"sources",label:"Sources",href:"apps/sources/index.html"},{id:"monitoring",label:"Monitoring",href:"apps/monitoring/index.html"}]}render(){const e=this._getNavItems();return h`
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
    `}},u(ne,"AppHeader"),ne),Ae([d({type:String,attribute:"current-page"})],l.AppHeader.prototype,"currentPage",void 0),Ae([d({type:String,attribute:"base-path"})],l.AppHeader.prototype,"basePath",void 0),Ae([b()],l.AppHeader.prototype,"_favCount",void 0),l.AppHeader=Ae([A("app-header")],l.AppHeader);var Dt=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.AppFooter=(ae=class extends w{constructor(){super(...arguments),this.basePath=""}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}createRenderRoot(){return this}render(){return h`
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
    `}},u(ae,"AppFooter"),ae),Dt([d({type:String,attribute:"base-path"})],l.AppFooter.prototype,"basePath",void 0),l.AppFooter=Dt([A("app-footer")],l.AppFooter);var K=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.AppLayoutBuilder=(oe=class extends w{constructor(){super(...arguments),this.leftRatio=40,this.minLeftWidth=280,this.minRightWidth=300,this._isResizing=!1,this._currentLeftRatio=40,this._leftContent=[],this._rightContent=[],this._contentMoved=!1,this._boundMouseMove=null,this._boundMouseUp=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._currentLeftRatio=this.leftRatio,this._setupResizer(),this._saveSlotContent()}_saveSlotContent(){this._leftContent=Array.from(this.querySelectorAll('[slot="left"]')),this._rightContent=Array.from(this.querySelectorAll('[slot="right"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".builder-layout-left"),t=this.querySelector(".builder-layout-right");e&&t&&(this._leftContent.forEach(i=>e.appendChild(i)),this._rightContent.forEach(i=>t.appendChild(i)),this._contentMoved=!0)}disconnectedCallback(){super.disconnectedCallback(),this._cleanupResizer()}_setupResizer(){this._boundMouseMove=this._handleMouseMove.bind(this),this._boundMouseUp=this._handleMouseUp.bind(this)}_cleanupResizer(){this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp)}_handleMouseDown(e){e.preventDefault(),this._isResizing=!0,document.body.style.cursor="col-resize",document.body.style.userSelect="none",this._boundMouseMove&&document.addEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.addEventListener("mouseup",this._boundMouseUp)}_handleMouseMove(e){if(!this._isResizing)return;const t=this.querySelector(".builder-layout-container");if(!t)return;const i=t.getBoundingClientRect(),r=i.width;let s=e.clientX-i.left;s=Math.max(this.minLeftWidth,Math.min(s,r-this.minRightWidth)),this._currentLeftRatio=s/r*100,this.requestUpdate()}_handleMouseUp(){this._isResizing&&(this._isResizing=!1,document.body.style.cursor="",document.body.style.userSelect="",this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp))}render(){return h`
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
    `}},u(oe,"AppLayoutBuilder"),oe),K([d({type:Number,attribute:"left-ratio"})],l.AppLayoutBuilder.prototype,"leftRatio",void 0),K([d({type:Number,attribute:"min-left-width"})],l.AppLayoutBuilder.prototype,"minLeftWidth",void 0),K([d({type:Number,attribute:"min-right-width"})],l.AppLayoutBuilder.prototype,"minRightWidth",void 0),K([b()],l.AppLayoutBuilder.prototype,"_isResizing",void 0),K([b()],l.AppLayoutBuilder.prototype,"_currentLeftRatio",void 0),l.AppLayoutBuilder=K([A("app-layout-builder")],l.AppLayoutBuilder);var be=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};l.AppLayoutDemo=(le=class extends w{constructor(){super(...arguments),this.title="",this.icon="",this.activePath="",this.basePath="",this._contentElements=[],this._contentMoved=!1}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._contentElements=Array.from(this.querySelectorAll('[slot="content"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".demo-content-slot");e&&(this._contentElements.forEach(t=>e.appendChild(t)),this._contentMoved=!0)}_getMenuStructure(){return[{id:"overview",label:"Vue d'ensemble",href:"index.html"},{id:"components",label:"Composants gouv-widgets",href:"#",children:[{id:"components/gouv-source",label:"gouv-source",href:"components/gouv-source.html"},{id:"components/gouv-normalize",label:"gouv-normalize",href:"components/gouv-normalize.html"},{id:"components/gouv-query",label:"gouv-query",href:"components/gouv-query.html"},{id:"components/gouv-facets",label:"gouv-facets",href:"components/gouv-facets.html"},{id:"components/gouv-kpi",label:"gouv-kpi",href:"components/gouv-kpi.html"},{id:"components/gouv-datalist",label:"gouv-datalist",href:"components/gouv-datalist.html"},{id:"components/gouv-dsfr-chart",label:"gouv-dsfr-chart",href:"components/gouv-dsfr-chart.html"}]},{id:"charts",label:"Composants dsfr-charts",href:"#",children:[{id:"charts/line-chart",label:"line-chart",href:"charts/line-chart.html"},{id:"charts/bar-chart",label:"bar-chart",href:"charts/bar-chart.html"},{id:"charts/pie-chart",label:"pie-chart",href:"charts/pie-chart.html"},{id:"charts/radar-chart",label:"radar-chart",href:"charts/radar-chart.html"},{id:"charts/gauge-chart",label:"gauge-chart",href:"charts/gauge-chart.html"},{id:"charts/map-chart",label:"map-chart",href:"charts/map-chart.html"},{id:"charts/scatter-chart",label:"scatter-chart",href:"charts/scatter-chart.html"}]}]}_isActive(e){return this.activePath===e}_isParentActive(e){return e.children?e.children.some(t=>this._isActive(t.id)):!1}_renderMenuItem(e){const t=this._isActive(e.id),i=this._isParentActive(e);if(e.children){const r=`fr-sidemenu-${e.id}`,s=i;return h`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${s}"
                  aria-controls="${r}">
            ${e.label}
          </button>
          <div class="fr-collapse ${s?"fr-collapse--expanded":""}" id="${r}">
            <ul class="fr-sidemenu__list">
              ${e.children.map(n=>this._renderMenuItem(n))}
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
      `}_renderBreadcrumb(){if(!this.activePath||this.activePath==="overview")return"";const e=this.activePath.split("/"),t=[{label:"Composants",href:`${this._base}index.html`}];if(e.length>1){const i=e[0]==="components"?"Composants gouv-widgets":"Composants dsfr-charts";t.push({label:i,href:"#"})}return t.push({label:this.title,href:""}),h`
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
    `}},u(le,"AppLayoutDemo"),le),be([d({type:String})],l.AppLayoutDemo.prototype,"title",void 0),be([d({type:String})],l.AppLayoutDemo.prototype,"icon",void 0),be([d({type:String,attribute:"active-path"})],l.AppLayoutDemo.prototype,"activePath",void 0),be([d({type:String,attribute:"base-path"})],l.AppLayoutDemo.prototype,"basePath",void 0),l.AppLayoutDemo=be([A("app-layout-demo")],l.AppLayoutDemo);var I=function(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var o=a.length-1;o>=0;o--)(n=a[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};let O=(ce=class extends w{constructor(){super(...arguments),this.showDataTab=!1,this.showSaveButton=!1,this.showPlaygroundButton=!1,this.tabLabels="Aperçu,Code,Données",this.activeTab="preview",this._activeTab="preview",this._previewContent=[],this._codeContent=[],this._dataContent=[],this._contentMoved=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._activeTab=this.activeTab,this._saveSlotContent()}_saveSlotContent(){this._previewContent=Array.from(this.querySelectorAll('[slot="preview"]')),this._codeContent=Array.from(this.querySelectorAll('[slot="code"]')),this._dataContent=Array.from(this.querySelectorAll('[slot="data"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector("#tab-preview"),t=this.querySelector("#tab-code"),i=this.querySelector("#tab-data");e&&this._previewContent.forEach(r=>e.appendChild(r)),t&&this._codeContent.forEach(r=>t.appendChild(r)),i&&this._dataContent.forEach(r=>i.appendChild(r)),this._contentMoved=!0}setActiveTab(e){this._activeTab=e,this.requestUpdate()}getActiveTab(){return this._activeTab}_handleTabClick(e){this._activeTab=e,this.dispatchEvent(new CustomEvent("tab-change",{detail:{tab:e},bubbles:!0,composed:!0})),this.requestUpdate()}_getTabLabels(){return this.tabLabels.split(",").map(e=>e.trim())}_handleSaveClick(){this.dispatchEvent(new CustomEvent("save-favorite",{bubbles:!0,composed:!0}))}_handlePlaygroundClick(){this.dispatchEvent(new CustomEvent("open-playground",{bubbles:!0,composed:!0}))}render(){const e=this._getTabLabels(),[t,i,r]=e;return h`
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
    `}},u(ce,"AppPreviewPanel"),ce);I([d({type:Boolean,attribute:"show-data-tab"})],O.prototype,"showDataTab",void 0),I([d({type:Boolean,attribute:"show-save-button"})],O.prototype,"showSaveButton",void 0),I([d({type:Boolean,attribute:"show-playground-button"})],O.prototype,"showPlaygroundButton",void 0),I([d({type:String,attribute:"tab-labels"})],O.prototype,"tabLabels",void 0),I([d({type:String,attribute:"active-tab"})],O.prototype,"activeTab",void 0),I([b()],O.prototype,"_activeTab",void 0),O=I([A("app-preview-panel")],O);function Et(a,e,t){return a.map(i=>({label:String(y(i,e)??"N/A"),value:Number(y(i,t))||0}))}u(Et,"extractLabelValues");function Pt(a,e){if(e==="none")return a;const t=new Map;for(const r of a){const s=t.get(r.label)||[];s.push(r.value),t.set(r.label,s)}const i=[];for(const[r,s]of t)i.push({label:r,value:oi(s,e)});return i}u(Pt,"aggregateByLabel");function oi(a,e){switch(e){case"sum":return a.reduce((t,i)=>t+i,0);case"avg":return a.reduce((t,i)=>t+i,0)/a.length;case"count":return a.length;case"min":return Math.min(...a);case"max":return Math.max(...a);default:return a[0]||0}}u(oi,"computeGroupValue");function xt(a,e){return e==="none"?a:[...a].sort((t,i)=>e==="desc"?i.value-t.value:t.value-i.value)}u(xt,"sortByValue");function li(a,e,t,i="none",r="none",s=0){if(!a||a.length===0)return{labels:[],values:[]};let n=Et(a,e,t);return n=Pt(n,i),n=xt(n,r),s>0&&(n=n.slice(0,s)),{labels:n.map(o=>o.label),values:n.map(o=>Math.round(o.value*100)/100)}}u(li,"processChartData"),l.DATA_EVENTS=E,l.SourceSubscriberMixin=Ce,l.aggregateByLabel=Pt,l.computeAggregation=We,l.dispatchDataError=G,l.dispatchDataLoaded=B,l.dispatchDataLoading=N,l.extractLabelValues=Et,l.formatCurrency=Ct,l.formatDate=si,l.formatNumber=Qe,l.formatPercentage=St,l.formatValue=He,l.getByPath=y,l.getByPathOrDefault=Kt,l.getDataCache=W,l.hasPath=Wt,l.parseExpression=At,l.processChartData=li,l.sortByValue=xt,l.subscribeToSource=me,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})}));
