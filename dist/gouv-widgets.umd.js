(function(h,ue){typeof exports=="object"&&typeof module<"u"?ue(exports):typeof define=="function"&&define.amd?define(["exports"],ue):(h=typeof globalThis<"u"?globalThis:h||self,ue(h.GouvWidgets={}))})(this,(function(h){"use strict";var sl=Object.defineProperty;var l=(h,ue)=>sl(h,"name",{value:ue,configurable:!0});var Js,Ys,Zs,Xs,ct,ut,dt,ht,pt,ft,gt,mt,_t,vt,bt,yt,St,wt,$t,At,Ct,Pt,Et;var ue=typeof document<"u"?document.currentScript:null;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ea=!1,ei=globalThis,Oi=ei.ShadowRoot&&(ei.ShadyCSS===void 0||ei.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Li=Symbol(),un=new WeakMap,Wr=class Wr{constructor(e,t,i){if(this._$cssResult$=!0,i!==Li)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=t}get styleSheet(){let e=this._styleSheet;const t=this._strings;if(Oi&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=un.get(t)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),i&&un.set(t,e))}return e}toString(){return this.cssText}};l(Wr,"CSSResult");let ti=Wr;const ta=l(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${s}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},"textFromCSSResult"),ia=l(s=>new ti(typeof s=="string"?s:String(s),void 0,Li),"unsafeCSS"),Bi=l((s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,r,n)=>i+ta(r)+s[n+1],s[0]);return new ti(t,s,Li)},"css"),ra=l((s,e)=>{if(Oi)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=ei.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},"adoptStyles"),na=l(s=>{let e="";for(const t of s.cssRules)e+=t.cssText;return ia(e)},"cssResultFromStyleSheet"),dn=Oi||ea?s=>s:s=>s instanceof CSSStyleSheet?na(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:sa,defineProperty:aa,getOwnPropertyDescriptor:hn,getOwnPropertyNames:oa,getOwnPropertySymbols:la,getPrototypeOf:pn}=Object,Y=globalThis;let ye;const fn=Y.trustedTypes,ca=fn?fn.emptyScript:"",ii=Y.reactiveElementPolyfillSupportDevMode;Y.litIssuedWarnings??(Y.litIssuedWarnings=new Set),ye=l((s,e)=>{e+=` See https://lit.dev/msg/${s} for more information.`,!Y.litIssuedWarnings.has(e)&&!Y.litIssuedWarnings.has(s)&&(console.warn(e),Y.litIssuedWarnings.add(e))},"issueWarning$3"),queueMicrotask(()=>{var s;ye("dev-mode","Lit is in dev mode. Not recommended for production!"),(s=Y.ShadyDOM)!=null&&s.inUse&&ii===void 0&&ye("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.")});const Ii=l(s=>{Y.emitLitDebugLogEvents&&Y.dispatchEvent(new CustomEvent("lit-debug",{detail:s}))},"debugLogEvent$1"),Ye=l((s,e)=>s,"JSCompiler_renameProperty$1"),ri={toAttribute(s,e){switch(e){case Boolean:s=s?ca:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s);break}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}break}return t}},xi=l((s,e)=>!sa(s,e),"notEqual"),gn={attribute:!0,type:String,converter:ri,reflect:!1,useDefault:!1,hasChanged:xi};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Y.litPropertyMetadata??(Y.litPropertyMetadata=new WeakMap);const Kr=class Kr extends HTMLElement{static addInitializer(e){this.__prepare(),(this._initializers??(this._initializers=[])).push(e)}static get observedAttributes(){return this.finalize(),this.__attributeToPropertyMap&&[...this.__attributeToPropertyMap.keys()]}static createProperty(e,t=gn){if(t.state&&(t.attribute=!1),this.__prepare(),this.prototype.hasOwnProperty(e)&&(t=Object.create(t),t.wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol.for(`${String(e)} (@property() cache)`),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&aa(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:n}=hn(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};if(r==null){if("value"in(hn(this.prototype,e)??{}))throw new Error(`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);ye("reactive-property-without-getter",`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`)}return{get:r,set(a){const o=r==null?void 0:r.call(this);n==null||n.call(this,a),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??gn}static __prepare(){if(this.hasOwnProperty(Ye("elementProperties")))return;const e=pn(this);e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ye("finalized")))return;if(this.finalized=!0,this.__prepare(),this.hasOwnProperty(Ye("properties"))){const t=this.properties,i=[...oa(t),...la(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this.__attributeToPropertyMap=new Map;for(const[t,i]of this.elementProperties){const r=this.__attributeNameForProperty(t,i);r!==void 0&&this.__attributeToPropertyMap.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles),this.hasOwnProperty("createProperty")&&ye("no-override-create-property","Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators"),this.hasOwnProperty("getPropertyDescriptor")&&ye("no-override-get-property-descriptor","Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators")}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(dn(r))}else e!==void 0&&t.push(dn(e));return t}static __attributeNameForProperty(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this.__instanceProperties=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}__initialize(){var e;this.__updatePromise=new Promise(t=>this.enableUpdating=t),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)==null||e.forEach(t=>t(this))}addController(e){var t;(this.__controllers??(this.__controllers=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this.__controllers)==null||t.delete(e)}__saveInstanceProperties(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this.__instanceProperties=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ra(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$attributeToProperty(e,i)}__propertyToAttribute(e,t){var a;const r=this.constructor.elementProperties.get(e),n=this.constructor.__attributeNameForProperty(e,r);if(n!==void 0&&r.reflect===!0){const p=(((a=r.converter)==null?void 0:a.toAttribute)!==void 0?r.converter:ri).toAttribute(t,r.type);this.constructor.enabledWarnings.includes("migration")&&p===void 0&&ye("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,p==null?this.removeAttribute(n):this.setAttribute(n,p),this.__reflectingProperty=null}}_$attributeToProperty(e,t){var n,a;const i=this.constructor,r=i.__attributeToPropertyMap.get(e);if(r!==void 0&&this.__reflectingProperty!==r){const o=i.getPropertyOptions(r),p=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:ri;this.__reflectingProperty=r;const u=p.fromAttribute(t,o.type);this[r]=u??((a=this.__defaultValues)==null?void 0:a.get(r))??u,this.__reflectingProperty=null}}requestUpdate(e,t,i,r=!1,n){var a;if(e!==void 0){e instanceof Event&&ye("","The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()");const o=this.constructor;if(r===!1&&(n=this[e]),i??(i=o.getPropertyOptions(e)),(i.hasChanged??xi)(n,t)||i.useDefault&&i.reflect&&n===((a=this.__defaultValues)==null?void 0:a.get(e))&&!this.hasAttribute(o.__attributeNameForProperty(e,i)))this._$changeProperty(e,t,i);else return}this.isUpdatePending===!1&&(this.__updatePromise=this.__enqueueUpdate())}_$changeProperty(e,t,{useDefault:i,reflect:r,wrapped:n},a){i&&!(this.__defaultValues??(this.__defaultValues=new Map)).has(e)&&(this.__defaultValues.set(e,a??t??this[e]),n!==!0||a!==void 0)||(this._$changedProperties.has(e)||(!this.hasUpdated&&!i&&(t=void 0),this._$changedProperties.set(e,t)),r===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties??(this.__reflectingProperties=new Set)).add(e))}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){const e=this.performUpdate();return this.constructor.enabledWarnings.includes("async-perform-update")&&typeof(e==null?void 0:e.then)=="function"&&ye("async-perform-update",`Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`),e}performUpdate(){var i;if(!this.isUpdatePending)return;if(Ii==null||Ii({kind:"update"}),!this.hasUpdated){this.renderRoot??(this.renderRoot=this.createRenderRoot());{const a=[...this.constructor.elementProperties.keys()].filter(o=>this.hasOwnProperty(o)&&o in pn(this));if(a.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${a.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}if(this.__instanceProperties){for(const[n,a]of this.__instanceProperties)this[n]=a;this.__instanceProperties=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,a]of r){const{wrapped:o}=a,p=this[n];o===!0&&!this._$changedProperties.has(n)&&p!==void 0&&this._$changeProperty(n,void 0,a,p)}}let e=!1;const t=this._$changedProperties;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this.__controllers)==null||i.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(t)):this.__markUpdated()}catch(r){throw e=!1,this.__markUpdated(),r}e&&this._$didUpdate(t)}willUpdate(e){}_$didUpdate(e){var t;(t=this.__controllers)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.includes("change-in-update")&&ye("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties&&(this.__reflectingProperties=this.__reflectingProperties.forEach(t=>this.__propertyToAttribute(t,this[t]))),this.__markUpdated()}updated(e){}firstUpdated(e){}};l(Kr,"ReactiveElement");let Se=Kr;Se.elementStyles=[],Se.shadowRootOptions={mode:"open"},Se[Ye("elementProperties")]=new Map,Se[Ye("finalized")]=new Map,ii==null||ii({ReactiveElement:Se});{Se.enabledWarnings=["change-in-update","async-perform-update"];const s=l(function(e){e.hasOwnProperty(Ye("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())},"ensureOwnWarnings");Se.enableWarning=function(e){s(this),this.enabledWarnings.includes(e)||this.enabledWarnings.push(e)},Se.disableWarning=function(e){s(this);const t=this.enabledWarnings.indexOf(e);t>=0&&this.enabledWarnings.splice(t,1)}}(Y.reactiveElementVersions??(Y.reactiveElementVersions=[])).push("2.1.2"),Y.reactiveElementVersions.length>1&&queueMicrotask(()=>{ye("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ee=globalThis,F=l(s=>{ee.emitLitDebugLogEvents&&ee.dispatchEvent(new CustomEvent("lit-debug",{detail:s}))},"debugLogEvent");let ua=0,Rt;ee.litIssuedWarnings??(ee.litIssuedWarnings=new Set),Rt=l((s,e)=>{e+=s?` See https://lit.dev/msg/${s} for more information.`:"",!ee.litIssuedWarnings.has(e)&&!ee.litIssuedWarnings.has(s)&&(console.warn(e),ee.litIssuedWarnings.add(e))},"issueWarning$2"),queueMicrotask(()=>{Rt("dev-mode","Lit is in dev mode. Not recommended for production!")});const we=(Js=ee.ShadyDOM)!=null&&Js.inUse&&((Ys=ee.ShadyDOM)==null?void 0:Ys.noPatch)===!0?ee.ShadyDOM.wrap:s=>s,ni=ee.trustedTypes,mn=ni?ni.createPolicy("lit-html",{createHTML:l(s=>s,"createHTML")}):void 0,da=l(s=>s,"identityFunction"),si=l((s,e,t)=>da,"noopSanitizer"),ha=l(s=>{if(ze!==si)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");ze=s},"setSanitizer"),pa=l(()=>{ze=si},"_testOnlyClearSanitizerFactoryDoNotCallOrElse"),Ui=l((s,e,t)=>ze(s,e,t),"createSanitizer"),_n="$lit$",Ee=`lit$${Math.random().toFixed(9).slice(2)}$`,vn="?"+Ee,fa=`<${vn}>`,Ie=document,kt=l(()=>Ie.createComment(""),"createMarker"),Mt=l(s=>s===null||typeof s!="object"&&typeof s!="function","isPrimitive"),zi=Array.isArray,ga=l(s=>zi(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function","isIterable"),ji=`[ 	
\f\r]`,ma=`[^ 	
\f\r"'\`<>=]`,_a=`[^\\s"'>=/]`,Nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bn=1,qi=2,va=3,yn=/-->/g,Sn=/>/g,xe=new RegExp(`>|${ji}(?:(${_a}+)(${ji}*=${ji}*(?:${ma}|("|')|))|$)`,"g"),ba=0,wn=1,ya=2,$n=3,Vi=/'/g,Hi=/"/g,An=/^(?:script|style|textarea|title)$/i,Sa=1,ai=2,Wi=3,Ki=1,oi=2,wa=3,$a=4,Aa=5,Qi=6,Ca=7,Cn=l(s=>(e,...t)=>(e.some(i=>i===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),t.some(i=>i==null?void 0:i._$litStatic$)&&Rt("",`Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`),{_$litType$:s,strings:e,values:t}),"tag"),v=Cn(Sa),Pn=Cn(ai),Ze=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),En=new WeakMap,Ue=Ie.createTreeWalker(Ie,129);let ze=si;function Tn(s,e){if(!zi(s)||!s.hasOwnProperty("raw")){let t="invalid template strings array";throw t=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(t)}return mn!==void 0?mn.createHTML(e):e}l(Tn,"trustFromTemplateString");const Pa=l((s,e)=>{const t=s.length-1,i=[];let r=e===ai?"<svg>":e===Wi?"<math>":"",n,a=Nt;for(let p=0;p<t;p++){const u=s[p];let c=-1,d,f=0,g;for(;f<u.length&&(a.lastIndex=f,g=a.exec(u),g!==null);)if(f=a.lastIndex,a===Nt){if(g[bn]==="!--")a=yn;else if(g[bn]!==void 0)a=Sn;else if(g[qi]!==void 0)An.test(g[qi])&&(n=new RegExp(`</${g[qi]}`,"g")),a=xe;else if(g[va]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else a===xe?g[ba]===">"?(a=n??Nt,c=-1):g[wn]===void 0?c=-2:(c=a.lastIndex-g[ya].length,d=g[wn],a=g[$n]===void 0?xe:g[$n]==='"'?Hi:Vi):a===Hi||a===Vi?a=xe:a===yn||a===Sn?a=Nt:(a=xe,n=void 0);console.assert(c===-1||a===xe||a===Vi||a===Hi,"unexpected parse state B");const _=a===xe&&s[p+1].startsWith("/>")?" ":"";r+=a===Nt?u+fa:c>=0?(i.push(d),u.slice(0,c)+_n+u.slice(c)+Ee+_):u+Ee+(c===-2?p:_)}const o=r+(s[t]||"<?>")+(e===ai?"</svg>":e===Wi?"</math>":"");return[Tn(s,o),i]},"getTemplateHtml"),Fi=class Fi{constructor({strings:e,["_$litType$"]:t},i){this.parts=[];let r,n=0,a=0;const o=e.length-1,p=this.parts,[u,c]=Pa(e,t);if(this.el=Fi.createElement(u,i),Ue.currentNode=this.el.content,t===ai||t===Wi){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=Ue.nextNode())!==null&&p.length<o;){if(r.nodeType===1){{const d=r.localName;if(/^(?:textarea|template)$/i.test(d)&&r.innerHTML.includes(Ee)){const f=`Expressions are not supported inside \`${d}\` elements. See https://lit.dev/msg/expression-in-${d} for more information.`;if(d==="template")throw new Error(f);Rt("",f)}}if(r.hasAttributes())for(const d of r.getAttributeNames())if(d.endsWith(_n)){const f=c[a++],_=r.getAttribute(d).split(Ee),S=/([.?@])?(.*)/.exec(f);p.push({type:Ki,index:n,name:S[2],strings:_,ctor:S[1]==="."?Yi:S[1]==="?"?Zi:S[1]==="@"?Xi:et}),r.removeAttribute(d)}else d.startsWith(Ee)&&(p.push({type:Qi,index:n}),r.removeAttribute(d));if(An.test(r.tagName)){const d=r.textContent.split(Ee),f=d.length-1;if(f>0){r.textContent=ni?ni.emptyScript:"";for(let g=0;g<f;g++)r.append(d[g],kt()),Ue.nextNode(),p.push({type:oi,index:++n});r.append(d[f],kt())}}}else if(r.nodeType===8)if(r.data===vn)p.push({type:oi,index:n});else{let f=-1;for(;(f=r.data.indexOf(Ee,f+1))!==-1;)p.push({type:Ca,index:n}),f+=Ee.length-1}n++}if(c.length!==a)throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`'+e.join("${...}")+"`");F&&F({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,t){const i=Ie.createElement("template");return i.innerHTML=e,i}};l(Fi,"Template");let Ft=Fi;function Xe(s,e,t=s,i){var a,o;if(e===Ze)return e;let r=i!==void 0?(a=t.__directives)==null?void 0:a[i]:t.__directive;const n=Mt(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((o=r==null?void 0:r._$notifyDirectiveConnectionChanged)==null||o.call(r,!1),n===void 0?r=void 0:(r=new n(s),r._$initialize(s,t,i)),i!==void 0?(t.__directives??(t.__directives=[]))[i]=r:t.__directive=r),r!==void 0&&(e=Xe(s,r._$resolve(s,e.values),r,i)),e}l(Xe,"resolveDirective");const Qr=class Qr{constructor(e,t){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=t}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){const{el:{content:t},parts:i}=this._$template,r=((e==null?void 0:e.creationScope)??Ie).importNode(t,!0);Ue.currentNode=r;let n=Ue.nextNode(),a=0,o=0,p=i[0];for(;p!==void 0;){if(a===p.index){let u;p.type===oi?u=new Dt(n,n.nextSibling,this,e):p.type===Ki?u=new p.ctor(n,p.name,p.strings,this,e):p.type===Qi&&(u=new er(n,this,e)),this._$parts.push(u),p=i[++o]}a!==(p==null?void 0:p.index)&&(n=Ue.nextNode(),a++)}return Ue.currentNode=Ie,r}_update(e){let t=0;for(const i of this._$parts)i!==void 0&&(F&&F({kind:"set part",part:i,value:e[t],valueIndex:t,values:e,templateInstance:this}),i.strings!==void 0?(i._$setValue(e,i,t),t+=i.strings.length-2):i._$setValue(e[t])),t++}};l(Qr,"TemplateInstance");let Ji=Qr;const Di=class Di{get _$isConnected(){var e;return((e=this._$parent)==null?void 0:e._$isConnected)??this.__isConnected}constructor(e,t,i,r){this.type=oi,this._$committedValue=w,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=t,this._$parent=i,this.options=r,this.__isConnected=(r==null?void 0:r.isConnected)??!0,this._textSanitizer=void 0}get parentNode(){let e=we(this._$startNode).parentNode;const t=this._$parent;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,t=this){var i;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Xe(this,e,t),Mt(e))e===w||e==null||e===""?(this._$committedValue!==w&&(F&&F({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=w):e!==this._$committedValue&&e!==Ze&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((i=this.options)==null?void 0:i.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else ga(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return we(we(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var t;if(this._$committedValue!==e){if(this._$clear(),ze!==si){const i=(t=this._$startNode.parentNode)==null?void 0:t.nodeName;if(i==="STYLE"||i==="SCRIPT"){let r="Forbidden";throw i==="STYLE"?r="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":r="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(r)}}F&&F({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==w&&Mt(this._$committedValue)){const t=we(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=Ui(t,"data","property")),e=this._textSanitizer(e),F&&F({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}else{const t=Ie.createTextNode("");this._commitNode(t),this._textSanitizer===void 0&&(this._textSanitizer=Ui(t,"data","property")),e=this._textSanitizer(e),F&&F({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}this._$committedValue=e}_commitTemplateResult(e){var n;const{values:t,["_$litType$"]:i}=e,r=typeof i=="number"?this._$getTemplate(e):(i.el===void 0&&(i.el=Ft.createElement(Tn(i.h,i.h[0]),this.options)),i);if(((n=this._$committedValue)==null?void 0:n._$template)===r)F&&F({kind:"template updating",template:r,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:t}),this._$committedValue._update(t);else{const a=new Ji(r,this),o=a._clone(this.options);F&&F({kind:"template instantiated",template:r,instance:a,parts:a._$parts,options:this.options,fragment:o,values:t}),a._update(t),F&&F({kind:"template instantiated and updated",template:r,instance:a,parts:a._$parts,options:this.options,fragment:o,values:t}),this._commitNode(o),this._$committedValue=a}}_$getTemplate(e){let t=En.get(e.strings);return t===void 0&&En.set(e.strings,t=new Ft(e)),t}_commitIterable(e){zi(this._$committedValue)||(this._$committedValue=[],this._$clear());const t=this._$committedValue;let i=0,r;for(const n of e)i===t.length?t.push(r=new Di(this._insert(kt()),this._insert(kt()),this,this.options)):r=t[i],r._$setValue(n),i++;i<t.length&&(this._$clear(r&&we(r._$endNode).nextSibling,i),t.length=i)}_$clear(e=we(this._$startNode).nextSibling,t){var i;for((i=this._$notifyConnectionChanged)==null||i.call(this,!1,!0,t);e!==this._$endNode;){const r=we(e).nextSibling;we(e).remove(),e=r}}setConnected(e){var t;if(this._$parent===void 0)this.__isConnected=e,(t=this._$notifyConnectionChanged)==null||t.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}};l(Di,"ChildPart");let Dt=Di;const Jr=class Jr{get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}constructor(e,t,i,r,n){this.type=Ki,this._$committedValue=w,this._$disconnectableChildren=void 0,this.element=e,this.name=t,this._$parent=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$committedValue=new Array(i.length-1).fill(new String),this.strings=i):this._$committedValue=w,this._sanitizer=void 0}_$setValue(e,t=this,i,r){const n=this.strings;let a=!1;if(n===void 0)e=Xe(this,e,t,0),a=!Mt(e)||e!==this._$committedValue&&e!==Ze,a&&(this._$committedValue=e);else{const o=e;e=n[0];let p,u;for(p=0;p<n.length-1;p++)u=Xe(this,o[i+p],t,p),u===Ze&&(u=this._$committedValue[p]),a||(a=!Mt(u)||u!==this._$committedValue[p]),u===w?e=w:e!==w&&(e+=(u??"")+n[p+1]),this._$committedValue[p]=u}a&&!r&&this._commitValue(e)}_commitValue(e){e===w?we(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=ze(this.element,this.name,"attribute")),e=this._sanitizer(e??""),F&&F({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),we(this.element).setAttribute(this.name,e??""))}};l(Jr,"AttributePart");let et=Jr;const Yr=class Yr extends et{constructor(){super(...arguments),this.type=wa}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=ze(this.element,this.name,"property")),e=this._sanitizer(e),F&&F({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===w?void 0:e}};l(Yr,"PropertyPart");let Yi=Yr;const Zr=class Zr extends et{constructor(){super(...arguments),this.type=$a}_commitValue(e){F&&F({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==w),options:this.options}),we(this.element).toggleAttribute(this.name,!!e&&e!==w)}};l(Zr,"BooleanAttributePart");let Zi=Zr;const Xr=class Xr extends et{constructor(e,t,i,r,n){if(super(e,t,i,r,n),this.type=Aa,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${t}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,t=this){if(e=Xe(this,e,t,0)??w,e===Ze)return;const i=this._$committedValue,r=e===w&&i!==w||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==w&&(i===w||r);F&&F({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:r,addListener:n,oldListener:i}),r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var t;typeof this._$committedValue=="function"?this._$committedValue.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$committedValue.handleEvent(e)}};l(Xr,"EventPart");let Xi=Xr;const en=class en{constructor(e,t,i){this.element=e,this.type=Qi,this._$disconnectableChildren=void 0,this._$parent=t,this.options=i}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){F&&F({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Xe(this,e)}};l(en,"ElementPart");let er=en;const tr=ee.litHtmlPolyfillSupportDevMode;tr==null||tr(Ft,Dt),(ee.litHtmlVersions??(ee.litHtmlVersions=[])).push("3.3.2"),ee.litHtmlVersions.length>1&&queueMicrotask(()=>{Rt("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});const li=l((s,e,t)=>{if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const i=ua++,r=(t==null?void 0:t.renderBefore)??e;let n=r._$litPart$;if(F&&F({kind:"begin render",id:i,value:s,container:e,options:t,part:n}),n===void 0){const a=(t==null?void 0:t.renderBefore)??null;r._$litPart$=n=new Dt(e.insertBefore(kt(),a),a,void 0,t??{})}return n._$setValue(s),F&&F({kind:"end render",id:i,value:s,container:e,options:t,part:n}),n},"render");li.setSanitizer=ha,li.createSanitizer=Ui,li._testOnlyClearSanitizerFactoryDoNotCallOrElse=pa;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ea=l((s,e)=>s,"JSCompiler_renameProperty"),re=globalThis;let Rn;re.litIssuedWarnings??(re.litIssuedWarnings=new Set),Rn=l((s,e)=>{e+=` See https://lit.dev/msg/${s} for more information.`,!re.litIssuedWarnings.has(e)&&!re.litIssuedWarnings.has(s)&&(console.warn(e),re.litIssuedWarnings.add(e))},"issueWarning$1");const tn=class tn extends Se{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=li(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)==null||e.setConnected(!1)}render(){return Ze}};l(tn,"LitElement");let x=tn;x._$litElement$=!0,x[Ea("finalized")]=!0,(Zs=re.litElementHydrateSupport)==null||Zs.call(re,{LitElement:x});const ir=re.litElementPolyfillSupportDevMode;ir==null||ir({LitElement:x}),(re.litElementVersions??(re.litElementVersions=[])).push("4.2.2"),re.litElementVersions.length>1&&queueMicrotask(()=>{Rn("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.")});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=l(s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)},"customElement");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let kn;globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set),kn=l((s,e)=>{e+=` See https://lit.dev/msg/${s} for more information.`,!globalThis.litIssuedWarnings.has(e)&&!globalThis.litIssuedWarnings.has(s)&&(console.warn(e),globalThis.litIssuedWarnings.add(e))},"issueWarning");const Ta=l((s,e,t)=>{const i=e.hasOwnProperty(t);return e.constructor.createProperty(t,s),i?Object.getOwnPropertyDescriptor(e,t):void 0},"legacyProperty"),Ra={attribute:!0,type:String,converter:ri,reflect:!1,hasChanged:xi},ka=l((s=Ra,e,t)=>{const{kind:i,metadata:r}=t;r==null&&kn("missing-class-metadata",`The class ${e} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&(s=Object.create(s),s.wrapped=!0),n.set(t.name,s),i==="accessor"){const{name:a}=t;return{set(o){const p=e.get.call(this);e.set.call(this,o),this.requestUpdate(a,p,s,!0,o)},init(o){return o!==void 0&&this._$changeProperty(a,void 0,s,o),o}}}else if(i==="setter"){const{name:a}=t;return function(o){const p=this[a];e.call(this,o),this.requestUpdate(a,p,s,!0,o)}}throw new Error(`Unsupported decorator location: ${i}`)},"standardProperty");function m(s){return(e,t)=>typeof t=="object"?ka(s,e,t):Ta(s,e,t)}l(m,"property");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $(s){return m({...s,state:!0,attribute:!1})}l($,"state");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */globalThis.litIssuedWarnings??(globalThis.litIssuedWarnings=new Set);function q(s,e){if(!e||e.trim()==="")return s;const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=s;for(const n of i){if(r==null||typeof r!="object")return;r=r[n]}return r}l(q,"getByPath");function Ma(s,e){return q(s,e)!==void 0}l(Ma,"hasPath");function Mn(s,e,t){const r=e.replace(/\[(\d+)\]/g,".$1").split(".");let n=s;for(let a=0;a<r.length-1;a++){const o=r[a];(!(o in n)||typeof n[o]!="object"||n[o]===null)&&(n[o]={}),n=n[o]}n[r[r.length-1]]=t}l(Mn,"setByPath");function Na(s,e,t){const i=q(s,e);return i!==void 0?i:t}l(Na,"getByPathOrDefault");function rr(s){return s?String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}l(rr,"escapeHtml");function Nn(s,e=!1){if(typeof s=="number")return isNaN(s)?e?null:0:s;if(typeof s!="string")return e?null:0;let t=s.trim();if(t==="")return e?null:0;t=t.replace(/\s/g,"");const i=t.includes(","),r=t.includes(".");if(i&&r){const a=t.lastIndexOf(","),o=t.lastIndexOf(".");a>o?t=t.replace(/\./g,"").replace(",","."):t=t.replace(/,/g,"")}else i&&(t=t.replace(",","."));const n=parseFloat(t);return isNaN(n)?e?null:0:n}l(Nn,"toNumber");function Fa(s){if(typeof s!="string")return!1;const e=s.trim();return e===""?!1:/^-?[\d\s]+([.,]\d+)?$/.test(e)}l(Fa,"looksLikeNumber");function Da(s){return!s||typeof s!="string"||["N/A","null","undefined","00",""].includes(s)?!1:!!(s==="2A"||s==="2B"||/^97[1-6]$/.test(s)||/^(0[1-9]|[1-8]\d|9[0-5])$/.test(s))}l(Da,"isValidDeptCode");const Fn={url:typeof document>"u"&&typeof location>"u"?require("url").pathToFileURL(__filename).href:typeof document>"u"?location.href:ue&&ue.tagName.toUpperCase()==="SCRIPT"&&ue.src||new URL("gouv-widgets.umd.js",document.baseURI).href},Gt=((Xs=Fn.env)==null?void 0:Xs.VITE_PROXY_URL)||"https://chartsbuilder.matge.com";function Ga(){var e;const s=((e=Fn.env)==null?void 0:e.VITE_LIB_URL)||"";return s?s==="unpkg"?"https://unpkg.com/gouv-widgets/dist":s==="jsdelivr"?"https://cdn.jsdelivr.net/npm/gouv-widgets/dist":s:`${Gt}/dist`}l(Ga,"resolveLibUrl"),Ga();const Dn={baseUrl:Gt,endpoints:{grist:"/grist-proxy",gristGouv:"/grist-gouv-proxy",albert:"/albert-proxy",tabular:"/tabular-proxy",corsProxy:"/cors-proxy"}};function Oa(){if(typeof window>"u")return!1;const{hostname:s,port:e}=window.location;return(s==="localhost"||s==="127.0.0.1")&&!!e&&e!=="80"&&e!=="443"}l(Oa,"isViteDevMode");function La(){return typeof window<"u"&&"__TAURI__"in window}l(La,"isTauriMode");function nr(){const s={...Dn.endpoints};return Oa()?{baseUrl:"",endpoints:s}:La()?{baseUrl:Dn.baseUrl,endpoints:s}:{baseUrl:Gt,endpoints:s}}l(nr,"getProxyConfig");function Ba(s){if(!s)throw new Error("getProxiedUrl: url is required");const e=nr();return s.includes("tabular-api.data.gouv.fr")?s.replace("https://tabular-api.data.gouv.fr",`${e.baseUrl}${e.endpoints.tabular}`):s.includes("docs.getgrist.com")?s.replace("https://docs.getgrist.com",`${e.baseUrl}${e.endpoints.grist}`):s.includes("grist.numerique.gouv.fr")?s.replace("https://grist.numerique.gouv.fr",`${e.baseUrl}${e.endpoints.gristGouv}`):s.includes("albert.api.etalab.gouv.fr")?s.replace("https://albert.api.etalab.gouv.fr",`${e.baseUrl}${e.endpoints.albert}`):s}l(Ba,"getProxiedUrl");function Ia(s,e){const t=nr();return{url:`${t.baseUrl}${t.endpoints.corsProxy}`,headers:{...e||{},"X-Target-URL":s}}}l(Ia,"buildCorsProxyRequest");const ci={FAVORITES:"gouv-widgets-favorites",DASHBOARDS:"gouv-widgets-dashboards",CONNECTIONS:"gouv_widgets_connections",SOURCES:"gouv_widgets_sources"};function ui(s,e){try{const t=localStorage.getItem(s);return t?JSON.parse(t):e}catch{return e}}l(ui,"loadFromStorage");let xa="idle",Ua=0,Gn=new Set;function za(s){Gn.add(s);try{s(xa,Ua)}catch{}return()=>{Gn.delete(s)}}l(za,"onSyncStatusChange");const On=/\/api\/explore\/v2\.1\/catalog\/datasets\/([^/]+)/,Ln={id:"opendatasoft",displayName:"OpenDataSoft",urlPatterns:[On],knownHosts:[],defaultBaseUrl:"https://data.opendatasoft.com",defaultAuthType:"apikey-header",response:{dataPath:"results",totalCountPath:"total_count",nestedDataKey:null,requiresFlatten:!1},pagination:{type:"offset",pageSize:100,maxPages:10,maxRecords:1e3,params:{offset:"offset",limit:"limit"},nextPagePath:null},capabilities:{serverFetch:!0,serverFacets:!0,serverSearch:!0,serverGroupBy:!0,serverOrderBy:!0,serverAggregation:!0},query:{whereFormat:"odsql",whereSeparator:" AND ",aggregationSyntax:"odsql-select",searchTemplate:'search("{q}")'},facets:{defaultMode:"server",endpoint:"/facets"},resource:{idFields:["datasetId"],apiPathTemplate:"/api/explore/v2.1/catalog/datasets/{datasetId}/records",extractIds:l(s=>{const e=s.match(On);return e?{datasetId:e[1]}:null},"extractIds")},codeGen:{usesGouvSource:!0,usesGouvQuery:!0,usesGouvNormalize:!1,sourceApiType:"opendatasoft",fieldPrefix:"",dependencies:{dsfr:!0,dsfrChart:!0,gouvWidgets:!0}}},Bn=/tabular-api\.data\.gouv\.fr\/api\/resources\/([^/]+)/,In={id:"tabular",displayName:"Tabular (data.gouv.fr)",urlPatterns:[Bn],knownHosts:[{hostname:"tabular-api.data.gouv.fr",proxyEndpoint:"/tabular-proxy"}],defaultBaseUrl:"https://tabular-api.data.gouv.fr",defaultAuthType:"none",response:{dataPath:"data",totalCountPath:"meta.total",nestedDataKey:null,requiresFlatten:!1},pagination:{type:"page",pageSize:50,maxPages:500,maxRecords:25e3,params:{page:"page",pageSize:"page_size"},nextPagePath:"next",serverMeta:{pagePath:"meta.page",pageSizePath:"meta.page_size",totalPath:"meta.total"}},capabilities:{serverFetch:!0,serverFacets:!1,serverSearch:!1,serverGroupBy:!0,serverOrderBy:!0,serverAggregation:!0},query:{whereFormat:"colon",whereSeparator:", ",aggregationSyntax:"colon-attr",searchTemplate:null,operatorMapping:{eq:"exact",neq:"differs",gt:"strictly_greater",gte:"greater",lt:"strictly_less",lte:"less",contains:"contains",notcontains:"notcontains",in:"in",notin:"notin",isnull:"isnull",isnotnull:"isnotnull"}},facets:{defaultMode:"static"},resource:{idFields:["resourceId"],apiPathTemplate:"/api/resources/{resourceId}/data/",extractIds:l(s=>{const e=s.match(Bn);return e?{resourceId:e[1]}:null},"extractIds")},codeGen:{usesGouvSource:!0,usesGouvQuery:!0,usesGouvNormalize:!1,sourceApiType:"tabular",fieldPrefix:"",dependencies:{dsfr:!0,dsfrChart:!0,gouvWidgets:!0}}},xn=/\/api\/docs\/([^/]+)\/tables\/([^/]+)/,Un={id:"grist",displayName:"Grist",urlPatterns:[xn],knownHosts:[{hostname:"grist.numerique.gouv.fr",proxyEndpoint:"/grist-gouv-proxy"},{hostname:"docs.getgrist.com",proxyEndpoint:"/grist-proxy"}],defaultBaseUrl:"https://grist.numerique.gouv.fr",defaultAuthType:"bearer",response:{dataPath:"records",totalCountPath:null,nestedDataKey:"fields",requiresFlatten:!0},pagination:{type:"offset",pageSize:100,maxPages:0,maxRecords:0,params:{offset:"offset",limit:"limit"},nextPagePath:null},capabilities:{serverFetch:!0,serverFacets:!0,serverSearch:!1,serverGroupBy:!0,serverOrderBy:!0,serverAggregation:!0},query:{whereFormat:"colon",whereSeparator:", ",aggregationSyntax:"sql",searchTemplate:null},facets:{defaultMode:"server"},resource:{idFields:["documentId","tableId"],apiPathTemplate:"/api/docs/{documentId}/tables/{tableId}/records",extractIds:l(s=>{const e=s.match(xn);return e?{documentId:e[1],tableId:e[2]}:null},"extractIds")},codeGen:{usesGouvSource:!0,usesGouvQuery:!0,usesGouvNormalize:!1,sourceApiType:"grist",fieldPrefix:"",dependencies:{dsfr:!0,dsfrChart:!0,gouvWidgets:!0}}},zn={id:"generic",displayName:"Generic REST",urlPatterns:[],knownHosts:[],defaultBaseUrl:"",defaultAuthType:"none",response:{dataPath:"",totalCountPath:null,nestedDataKey:null,requiresFlatten:!1},pagination:{type:"none",pageSize:0,maxPages:0,maxRecords:0,params:{},nextPagePath:null},capabilities:{serverFetch:!1,serverFacets:!1,serverSearch:!1,serverGroupBy:!1,serverOrderBy:!1,serverAggregation:!1},query:{whereFormat:"colon",whereSeparator:", ",aggregationSyntax:"client-only",searchTemplate:null},facets:{defaultMode:"client"},resource:{idFields:[],apiPathTemplate:"",extractIds:l(()=>null,"extractIds")},codeGen:{usesGouvSource:!0,usesGouvQuery:!0,usesGouvNormalize:!1,sourceApiType:"generic",fieldPrefix:"",dependencies:{dsfr:!0,dsfrChart:!0,gouvWidgets:!0}}},jn=/melodi\/data\/([^?/]+)/,qn={id:"insee",displayName:"INSEE (Melodi)",urlPatterns:[jn],knownHosts:[],defaultBaseUrl:"https://api.insee.fr/melodi",defaultAuthType:"none",response:{dataPath:"observations",totalCountPath:"paging.count",nestedDataKey:null,requiresFlatten:!0},pagination:{type:"page",pageSize:1e3,maxPages:100,maxRecords:1e5,params:{page:"page",pageSize:"maxResult"},nextPagePath:"paging.next",serverMeta:{pagePath:"",pageSizePath:"",totalPath:"paging.count"}},capabilities:{serverFetch:!0,serverFacets:!1,serverSearch:!1,serverGroupBy:!1,serverOrderBy:!1,serverAggregation:!1},query:{whereFormat:"colon",whereSeparator:", ",aggregationSyntax:"client-only",searchTemplate:null},facets:{defaultMode:"client"},resource:{idFields:["datasetId"],apiPathTemplate:"/data/{datasetId}",extractIds:l(s=>{const e=s.match(jn);return e?{datasetId:e[1]}:null},"extractIds")},codeGen:{usesGouvSource:!0,usesGouvQuery:!0,usesGouvNormalize:!1,sourceApiType:"insee",fieldPrefix:"",dependencies:{dsfr:!0,dsfrChart:!0,gouvWidgets:!0}}},ja=new Map;function Ot(s){ja.set(s.id,s)}l(Ot,"registerProvider"),Ot(Ln),Ot(In),Ot(Un),Ot(qn),Ot(zn);let tt={...{user:null,isAuthenticated:!1,isLoading:!0}},it=null,Lt=null,Vn="";const sr=new Set;function qa(){for(const s of sr)try{s(tt)}catch{}}l(qa,"notify");function je(s){tt={...tt,...s},qa()}l(je,"setState");async function Bt(s,e){return fetch(`${Vn}${s}`,{...e,credentials:"include",headers:{"Content-Type":"application/json",...e==null?void 0:e.headers}})}l(Bt,"apiFetch");async function Hn(){if(it!==null)return it;try{const s=await fetch(`${Vn}/api/auth/me`,{credentials:"include"});it=s.status===200||s.status===401}catch{it=!1}return it&&typeof window<"u"&&(window.__gwDbMode=!0),it}l(Hn,"isDbMode");async function Va(){return Lt||(Lt=Ha(),Lt)}l(Va,"checkAuth");async function Ha(){try{if(!await Hn())return je({user:null,isAuthenticated:!1,isLoading:!1}),tt;const e=await Bt("/api/auth/me");if(e.ok){const t=await e.json();je({user:t.user,isAuthenticated:!0,isLoading:!1})}else je({user:null,isAuthenticated:!1,isLoading:!1})}catch{Lt=null,je({user:null,isAuthenticated:!1,isLoading:!1})}return tt}l(Ha,"_doCheckAuth");async function Wa(s){try{const e=await Bt("/api/auth/login",{method:"POST",body:JSON.stringify(s)});if(!e.ok)return{success:!1,error:(await e.json()).error||"Login failed"};const t=await e.json();return je({user:t.user,isAuthenticated:!0,isLoading:!1}),await Wn(),{success:!0}}catch{return{success:!1,error:"Network error"}}}l(Wa,"login");async function Ka(s){try{const e=await Bt("/api/auth/register",{method:"POST",body:JSON.stringify(s)});if(!e.ok)return{success:!1,error:(await e.json()).error||"Registration failed"};const t=await e.json();return je({user:t.user,isAuthenticated:!0,isLoading:!1}),await Wn(),{success:!0}}catch{return{success:!1,error:"Network error"}}}l(Ka,"register");async function Qa(){try{await Bt("/api/auth/logout",{method:"POST"})}catch{}je({user:null,isAuthenticated:!1,isLoading:!1})}l(Qa,"logout");function Ja(s){return sr.add(s),()=>{sr.delete(s)}}l(Ja,"onAuthChange");function di(){return tt.isAuthenticated}l(di,"isAuthenticated");const ar="gw-migrated";async function Wn(){if(localStorage.getItem(ar))return;const s=ui(ci.SOURCES,[]),e=ui(ci.CONNECTIONS,[]),t=ui(ci.FAVORITES,[]),i=ui(ci.DASHBOARDS,[]);if(!(s.length>0||e.length>0||t.length>0||i.length>0)){localStorage.setItem(ar,"1");return}try{(await Bt("/api/migrate",{method:"POST",body:JSON.stringify({sources:s,connections:e,favorites:t,dashboards:i})})).ok&&(localStorage.setItem(ar,"1"),console.info("[auth] localStorage data migrated to server"))}catch{console.warn("[auth] Migration failed, will retry on next login")}}l(Wn,"autoMigrateIfNeeded");const Kn=`${Gt}/beacon`,Qn=new Set;function de(s,e){const t=`${s}:${e||""}`;if(Qn.has(t)||(Qn.add(t),typeof window>"u"))return;const i=window.location.hostname;if(i==="localhost"||i==="127.0.0.1"||i===new URL(Gt).hostname)return;const r=new URLSearchParams;if(r.set("c",s),e&&r.set("t",e),r.set("r",window.location.origin),typeof window<"u"&&window.__gwDbMode===!0)try{fetch("/api/monitoring/beacon",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({component:s,chartType:e||null,origin:window.location.origin})}).catch(()=>{new Image().src=`${Kn}?${r.toString()}`});return}catch{}const a=`${Kn}?${r.toString()}`;try{new Image().src=a}catch{}}l(de,"sendWidgetBeacon");const rn=class rn{constructor(){this.type="generic",this.capabilities={serverFetch:!1,serverFacets:!1,serverSearch:!1,serverGroupBy:!1,serverOrderBy:!1,whereFormat:"odsql"}}validate(e){return null}fetchAll(){throw new Error("GenericAdapter ne supporte pas le fetch serveur")}fetchPage(){throw new Error("GenericAdapter ne supporte pas le mode server-side")}buildUrl(){throw new Error("GenericAdapter ne construit pas d'URL API")}buildServerSideUrl(){throw new Error("GenericAdapter ne supporte pas le mode server-side")}getDefaultSearchTemplate(){return null}getProviderConfig(){return zn}buildFacetWhere(e,t){const i=[];for(const[r,n]of Object.entries(e))r===t||n.size===0||(n.size===1?i.push(`${r}:eq:${[...n][0]}`):i.push(`${r}:in:${[...n].join("|")}`));return i.join(", ")}};l(rn,"GenericAdapter");let or=rn;function lr(s,e){const t={};return e&&(t.signal=e),s.headers&&Object.keys(s.headers).length>0&&(t.headers=s.headers),t}l(lr,"buildFetchOptions$3");const hi=100,cr=10,nn=class nn{constructor(){this.type="opendatasoft",this.capabilities={serverFetch:!0,serverFacets:!0,serverSearch:!0,serverGroupBy:!0,serverOrderBy:!0,whereFormat:"odsql"}}validate(e){return e.datasetId?null:'attribut "dataset-id" requis pour les requetes OpenDataSoft'}async fetchAll(e,t){const r=e.limit<=0?cr*hi:e.limit,n=hi;let a=[],o=0,p=-1;for(let u=0;u<cr;u++){const c=r-a.length;if(c<=0)break;const d=this.buildUrl(e,Math.min(n,c),o),f=await fetch(d,lr(e,t));if(!f.ok)throw new Error(`HTTP ${f.status}: ${f.statusText}`);const g=await f.json(),_=g.results||[];if(a=a.concat(_),typeof g.total_count=="number"&&(p=g.total_count),p>=0&&a.length>=p||_.length<n)break;o+=_.length}return p>=0&&a.length<p&&a.length<r&&console.warn(`gouv-query: pagination incomplete - ${a.length}/${p} resultats recuperes (limite de securite: ${cr} pages de ${hi})`),{data:a,totalCount:p>=0?p:a.length,needsClientProcessing:!1}}async fetchPage(e,t,i){const r=this.buildServerSideUrl(e,t),n=await fetch(r,lr(e,i));if(!n.ok)throw new Error(`HTTP ${n.status}: ${n.statusText}`);const a=await n.json(),o=a.results||[],p=typeof a.total_count=="number"?a.total_count:0;return{data:o,totalCount:p,needsClientProcessing:!1,rawJson:a}}buildUrl(e,t,i){const r=e.baseUrl||"https://data.opendatasoft.com",n=new URL(`${r}/api/explore/v2.1/catalog/datasets/${e.datasetId}/records`);e.select?n.searchParams.set("select",e.select):e.aggregate&&e.groupBy&&n.searchParams.set("select",this._buildSelectFromAggregate(e));const a=e.where||e.filter;if(a&&n.searchParams.set("where",a),e.groupBy&&n.searchParams.set("group_by",e.groupBy),e.orderBy){const o=e.orderBy.replace(/:(\w+)$/,(p,u)=>` ${u.toUpperCase()}`);n.searchParams.set("order_by",o)}return t!==void 0?n.searchParams.set("limit",String(t)):e.limit>0&&n.searchParams.set("limit",String(Math.min(e.limit,hi))),i&&i>0&&n.searchParams.set("offset",String(i)),n.toString()}buildServerSideUrl(e,t){const i=e.baseUrl||"https://data.opendatasoft.com",r=new URL(`${i}/api/explore/v2.1/catalog/datasets/${e.datasetId}/records`);e.select?r.searchParams.set("select",e.select):e.aggregate&&e.groupBy&&r.searchParams.set("select",this._buildSelectFromAggregate(e)),t.effectiveWhere&&r.searchParams.set("where",t.effectiveWhere),e.groupBy&&r.searchParams.set("group_by",e.groupBy);const n=t.orderBy;if(n){const o=n.replace(/:(\w+)$/,(p,u)=>` ${u.toUpperCase()}`);r.searchParams.set("order_by",o)}r.searchParams.set("limit",String(e.pageSize));const a=(t.page-1)*e.pageSize;return a>0&&r.searchParams.set("offset",String(a)),r.toString()}async fetchFacets(e,t,i,r){const n=e.baseUrl||"https://data.opendatasoft.com",a=new URL(`${n}/api/explore/v2.1/catalog/datasets/${e.datasetId}/facets`);for(const c of t)a.searchParams.append("facet",c);i&&a.searchParams.set("where",i);const o=await fetch(a.toString(),lr(e,r));if(!o.ok)throw new Error(`HTTP ${o.status}: ${o.statusText}`);const p=await o.json(),u=[];for(const c of p.facets||[])u.push({field:c.name,values:(c.facets||[]).map(d=>({value:d.value,count:d.count}))});return u}getDefaultSearchTemplate(){return'search("{q}")'}getProviderConfig(){return Ln}buildFacetWhere(e,t){const i=[];for(const[r,n]of Object.entries(e))if(!(r===t||n.size===0))if(n.size===1){const a=[...n][0].replace(/"/g,'\\"');i.push(`${r} = "${a}"`)}else{const a=[...n].map(o=>`"${o.replace(/"/g,'\\"')}"`).join(", ");i.push(`${r} IN (${a})`)}return i.join(" AND ")}parseAggregates(e){if(!e)return[];const t=[],i=e.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const n=r.split(":");n.length>=2&&t.push({field:n[0],function:n[1],alias:n[2]})}return t}_buildSelectFromAggregate(e){const t=this.parseAggregates(e.aggregate),i=[];for(const n of t){const a=n.function==="count"?"count(*)":`${n.function}(${n.field})`,o=n.alias||`${n.field}__${n.function}`;i.push(`${a} as ${o}`)}const r=e.groupBy.split(",").map(n=>n.trim()).filter(Boolean);for(const n of r)i.push(n);return i.join(", ")}};l(nn,"OpenDataSoftAdapter");let ur=nn;function Jn(s,e){const t={};return e&&(t.signal=e),s.headers&&Object.keys(s.headers).length>0&&(t.headers=s.headers),t}l(Jn,"buildFetchOptions$2");const pi=50,dr=500,sn=class sn{constructor(){this.type="tabular",this.capabilities={serverFetch:!0,serverFacets:!1,serverSearch:!1,serverGroupBy:!0,serverOrderBy:!0,whereFormat:"colon"}}validate(e){return e.resource?null:'attribut "resource" requis pour les requetes Tabular'}async fetchAll(e,t){var u;const i=e.limit<=0,r=i?dr*pi:e.limit;let n=[],a=-1,o=1;for(let c=0;c<dr&&!(r-n.length<=0);c++){const f=this.buildUrl(e,pi,o),g=await fetch(f,Jn(e,t));if(!g.ok)throw new Error(`HTTP ${g.status}: ${g.statusText}`);const _=await g.json(),S=_.data||[];n=n.concat(S),_.meta&&typeof _.meta.total=="number"&&(a=_.meta.total);let b=!1;if((u=_.links)!=null&&u.next)try{const R=new URL(_.links.next,"https://tabular-api.data.gouv.fr"),C=Number(R.searchParams.get("page"));C>0&&(o=C,b=!0)}catch{}if(!b||a>=0&&n.length>=a||S.length<pi)break}!i&&n.length>r&&(n=n.slice(0,r)),a>=0&&n.length<a&&n.length<r&&console.warn(`gouv-query: pagination incomplete - ${n.length}/${a} resultats recuperes (limite de securite: ${dr} pages de ${pi})`);const p=!!(e.groupBy||e.aggregate);return{data:n,totalCount:a>=0?a:n.length,needsClientProcessing:!p}}async fetchPage(e,t,i){var u;const r=this.buildServerSideUrl(e,t),n=await fetch(r,Jn(e,i));if(!n.ok)throw new Error(`HTTP ${n.status}: ${n.statusText}`);const a=await n.json(),o=a.data||[],p=((u=a.meta)==null?void 0:u.total)??0;return{data:o,totalCount:p,needsClientProcessing:!1,rawJson:a}}buildUrl(e,t,i){const r=this._getBaseUrl(e),n=typeof window<"u"&&window.location.origin!=="null"?window.location.origin:void 0,a=new URL(`${r}/api/resources/${e.resource}/data/`,n),o=e.filter||e.where;if(o&&this._applyColonFilters(a,o),e.groupBy){const p=e.groupBy.split(",").map(u=>u.trim());for(const u of p)a.searchParams.append(`${u}__groupby`,"")}if(e.aggregate){const p=e.aggregate.split(",").map(u=>u.trim());for(const u of p){const c=u.split(":");if(c.length>=2){const d=c[0],f=c[1];a.searchParams.append(`${d}__${f}`,"")}}}if(e.orderBy){const p=e.orderBy.split(":"),u=p[0],c=p[1]||"asc";a.searchParams.set(`${u}__sort`,c)}return t?a.searchParams.set("page_size",String(t)):e.limit>0&&a.searchParams.set("page_size",String(e.limit)),i&&a.searchParams.set("page",String(i)),a.toString()}buildServerSideUrl(e,t){const i=this._getBaseUrl(e),r=typeof window<"u"&&window.location.origin!=="null"?window.location.origin:void 0,n=new URL(`${i}/api/resources/${e.resource}/data/`,r),a=t.effectiveWhere||e.filter||e.where;a&&this._applyColonFilters(n,a);const o=t.orderBy;if(o){const p=o.split(":"),u=p[0],c=p[1]||"asc";n.searchParams.set(`${u}__sort`,c)}return n.searchParams.set("page_size",String(e.pageSize)),n.searchParams.set("page",String(t.page)),n.toString()}_applyColonFilters(e,t){const i=t.split(",").map(r=>r.trim());for(const r of i){const n=r.split(":");if(n.length>=3){const a=n[0],o=this._mapOperator(n[1]),p=n.slice(2).join(":");e.searchParams.set(`${a}__${o}`,p)}}}_mapOperator(e){return{eq:"exact",neq:"differs",gt:"strictly_greater",gte:"greater",lt:"strictly_less",lte:"less",contains:"contains",notcontains:"notcontains",in:"in",notin:"notin",isnull:"isnull",isnotnull:"isnotnull"}[e]||e}getDefaultSearchTemplate(){return null}getProviderConfig(){return In}buildFacetWhere(e,t){const i=[];for(const[r,n]of Object.entries(e))r===t||n.size===0||(n.size===1?i.push(`${r}:eq:${[...n][0]}`):i.push(`${r}:in:${[...n].join("|")}`));return i.join(", ")}_getBaseUrl(e){if(e.baseUrl)return e.baseUrl;const t=nr();return`${t.baseUrl}${t.endpoints.tabular}`}};l(sn,"TabularAdapter");let hr=sn;function It(s,e){const t={};return e&&(t.signal=e),s.headers&&Object.keys(s.headers).length>0&&(t.headers=s.headers),t}l(It,"buildFetchOptions$1");const an=class an{constructor(){this.type="grist",this.capabilities={serverFetch:!0,serverFacets:!0,serverSearch:!1,serverGroupBy:!0,serverOrderBy:!0,whereFormat:"colon"},this._sqlAvailableByHost=new Map}validate(e){return e.baseUrl?null:'attribut "base-url" requis pour les requetes Grist'}async fetchAll(e,t){if(this._needsSqlMode(e)&&await this._checkSqlAvailability(e))return this._fetchSql(e,void 0,t);const i=this.buildUrl(e),r=await fetch(i,It(e,t));if(!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);const n=await r.json(),a=this._flattenRecords(n.records||[]);return{data:a,totalCount:a.length,needsClientProcessing:!e.where&&!e.orderBy}}async fetchPage(e,t,i){if(this._needsSqlMode(e,t)&&await this._checkSqlAvailability(e))return this._fetchSql(e,t,i);const r=this.buildServerSideUrl(e,t),n=await fetch(r,It(e,i));if(!n.ok)throw new Error(`HTTP ${n.status}: ${n.statusText}`);const a=await n.json(),o=this._flattenRecords(a.records||[]),p=e.pageSize||o.length,u=o.length<p;return{data:o,totalCount:u?((t.page||1)-1)*p+o.length:-1,needsClientProcessing:!1}}buildUrl(e){const t=new URL(e.baseUrl);if(e.where){const i=this._colonWhereToGristFilter(e.where);i&&t.searchParams.set("filter",JSON.stringify(i))}return e.orderBy&&t.searchParams.set("sort",this._orderByToGristSort(e.orderBy)),e.limit&&t.searchParams.set("limit",String(e.limit)),t.toString()}buildServerSideUrl(e,t){const i=new URL(e.baseUrl),r=t.effectiveWhere||e.where;if(r){const a=this._colonWhereToGristFilter(r);a&&i.searchParams.set("filter",JSON.stringify(a))}const n=t.orderBy||e.orderBy;return n&&i.searchParams.set("sort",this._orderByToGristSort(n)),t.page&&e.pageSize&&(i.searchParams.set("limit",String(e.pageSize)),i.searchParams.set("offset",String((t.page-1)*e.pageSize))),i.toString()}async fetchFacets(e,t,i,r){const n=[],a=e;if(!await this._checkSqlAvailability(a))return n;for(const o of t){const p=this._getTableId(a),u=this._escapeIdentifier(o),c=[];let d=`SELECT ${u}, COUNT(*) as cnt FROM ${this._escapeIdentifier(p)}`;i&&(d+=` WHERE ${this._colonWhereToSql(i,c)}`),d+=` GROUP BY ${u} ORDER BY cnt DESC LIMIT 200`;const f=this._getSqlEndpointUrl(a);try{const g=await fetch(f,{method:"POST",headers:{"Content-Type":"application/json",...e.headers||{}},body:JSON.stringify({sql:d,args:c,timeout:500}),signal:r});if(!g.ok)continue;const S=(await g.json()).records||[];n.push({field:o,values:S.map(b=>({value:String(b[0]??""),count:Number(b[1])||0})).filter(b=>b.value!=="")})}catch{continue}}return n}getDefaultSearchTemplate(){return null}getProviderConfig(){return Un}buildFacetWhere(e,t){const i=[];for(const[r,n]of Object.entries(e))r===t||n.size===0||(n.size===1?i.push(`${r}:eq:${[...n][0]}`):i.push(`${r}:in:${[...n].join("|")}`));return i.join(", ")}parseAggregates(e){return e.split(",").map(t=>{const[i,r,n]=t.trim().split(":");return{field:i,function:r,alias:n||`${r}_${i}`}})}async fetchColumns(e,t){const i=e.baseUrl.replace(/\/records.*$/,"/columns");try{const r=await fetch(i,It(e,t));return r.ok?((await r.json()).columns||[]).map(a=>{const o=a.fields;return{id:a.id,label:(o==null?void 0:o.label)||a.id,type:(o==null?void 0:o.type)||"Any",isFormula:(o==null?void 0:o.isFormula)||!1,formula:(o==null?void 0:o.formula)||""}}):[]}catch{return[]}}async fetchTables(e,t){const i=e.baseUrl.replace(/\/tables\/[^/]+\/records.*$/,"/tables");try{const r=await fetch(i,It(e,t));return r.ok?((await r.json()).tables||[]).map(a=>({id:a.id})):[]}catch{return[]}}_colonWhereToGristFilter(e){const t={},i=e.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const[n,a,...o]=r.split(":"),p=o.join(":");a==="eq"?t[n]=[p]:a==="in"&&(t[n]=p.split("|"))}return Object.keys(t).length>0?t:null}_orderByToGristSort(e){return e.split(",").map(t=>{const[i,r]=t.trim().split(":");return r==="desc"?`-${i}`:i}).join(",")}_flattenRecords(e){return e.map(t=>{const i=t,r=i.fields;return r?{...r}:i})}_needsSqlMode(e,t){if(e.groupBy||e.aggregate)return!0;const i=this._mergeWhere(e.where,t==null?void 0:t.effectiveWhere);return!!(i&&this._hasAdvancedOperators(i))}_hasAdvancedOperators(e){const t=["gt","gte","lt","lte","contains","notcontains","neq","isnull","isnotnull","notin"];return e.split(",").some(i=>{const r=i.trim().split(":");return r.length>=2&&t.includes(r[1])})}_mergeWhere(e,t){return t&&e?`${e}, ${t}`:t||e||""}async _fetchSql(e,t,i){const r=this._getTableId(e),{select:n,groupBy:a,where:o,orderBy:p,limit:u,offset:c,args:d}=this._buildSqlQuery(e,t,r),f=[`SELECT ${n}`,`FROM ${this._escapeIdentifier(r)}`,o?`WHERE ${o}`:"",a?`GROUP BY ${a}`:"",p?`ORDER BY ${p}`:"",u?`LIMIT ${u}`:"",c?`OFFSET ${c}`:""].filter(Boolean).join(" "),g=this._getSqlEndpointUrl(e),_=await fetch(g,{method:"POST",headers:{"Content-Type":"application/json",...e.headers||{}},body:JSON.stringify({sql:f,args:d,timeout:800}),signal:i});if(!_.ok){if(_.status===404||_.status===403)return console.warn("[gouv-widgets] Grist SQL endpoint not available, falling back to client-side processing"),this._sqlAvailableByHost.set(this._extractHostname(e.baseUrl),!1),this._fetchAllRecords(e,i);throw new Error(`Grist SQL HTTP ${_.status}: ${_.statusText}`)}const S=await _.json(),b=this._sqlResultToObjects(S);return{data:b,totalCount:b.length,needsClientProcessing:!1}}async _fetchAllRecords(e,t){const i=this.buildUrl(e),r=await fetch(i,It(e,t));if(!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);const n=await r.json(),a=this._flattenRecords(n.records||[]);return{data:a,totalCount:a.length,needsClientProcessing:!0}}_buildSqlQuery(e,t,i){const r=[];let n="*",a="",o="",p="",u="",c="";if(e.groupBy){const g=e.groupBy.split(",").map(_=>this._escapeIdentifier(_.trim()));if(a=g.join(", "),e.aggregate){const _=this.parseAggregates(e.aggregate);n=[...g,..._.map(b=>`${b.function.toUpperCase()}(${this._escapeIdentifier(b.field)}) as ${this._escapeIdentifier(b.alias||`${b.function}_${b.field}`)}`)].join(", ")}else n=g.join(", ")+", COUNT(*) as count"}const d=this._mergeWhere(e.where,t==null?void 0:t.effectiveWhere);d&&(o=this._colonWhereToSql(d,r));const f=(t==null?void 0:t.orderBy)||e.orderBy;return f&&(p=f.split(",").map(g=>{const[_,S]=g.trim().split(":");return`${this._escapeIdentifier(_)} ${S==="desc"?"DESC":"ASC"}`}).join(", ")),t!=null&&t.page&&e.pageSize?(u=String(e.pageSize),t.page>1&&(c=String((t.page-1)*e.pageSize))):e.limit&&(u=String(e.limit)),{select:n,groupBy:a,where:o,orderBy:p,limit:u,offset:c,args:r}}_colonWhereToSql(e,t){const i=[],r=e.split(",").map(n=>n.trim()).filter(Boolean);for(const n of r){const[a,o,...p]=n.split(":"),u=p.join(":"),c=this._escapeIdentifier(a);switch(o){case"eq":i.push(`${c} = ?`),t.push(u);break;case"neq":i.push(`${c} != ?`),t.push(u);break;case"gt":i.push(`${c} > ?`),t.push(this._toNumberOrString(u));break;case"gte":i.push(`${c} >= ?`),t.push(this._toNumberOrString(u));break;case"lt":i.push(`${c} < ?`),t.push(this._toNumberOrString(u));break;case"lte":i.push(`${c} <= ?`),t.push(this._toNumberOrString(u));break;case"contains":i.push(`${c} LIKE ?`),t.push(`%${u}%`);break;case"notcontains":i.push(`${c} NOT LIKE ?`),t.push(`%${u}%`);break;case"in":{const d=u.split("|");i.push(`${c} IN (${d.map(()=>"?").join(",")})`),t.push(...d);break}case"notin":{const d=u.split("|");i.push(`${c} NOT IN (${d.map(()=>"?").join(",")})`),t.push(...d);break}case"isnull":i.push(`${c} IS NULL`);break;case"isnotnull":i.push(`${c} IS NOT NULL`);break}}return i.join(" AND ")}_sqlResultToObjects(e){const{records:t=[],columns:i=[]}=e;return t.map(r=>{const n={};return i.forEach((a,o)=>{n[a]=r[o]}),n})}_getSqlEndpointUrl(e){const t=e.baseUrl;if(!t.match(/\/api\/docs\/([^/]+)/))throw new Error("Cannot derive SQL endpoint from Grist URL: "+t);return t.replace(/\/tables\/[^/]+\/records.*$/,"/sql")}_getTableId(e){const t=e.baseUrl.match(/\/tables\/([^/]+)/);if(!t)throw new Error("Cannot extract table ID from Grist URL: "+e.baseUrl);return t[1]}_escapeIdentifier(e){const t=e.trim();if(!t)throw new Error("Empty SQL identifier");return`"${t.replace(/"/g,'""')}"`}_toNumberOrString(e){const t=Number(e);return!isNaN(t)&&e.trim()!==""?t:e}async _checkSqlAvailability(e){const t=this._extractHostname(e.baseUrl),i=this._sqlAvailableByHost.get(t);if(i!==void 0)return i;try{const r=this._getSqlEndpointUrl(e),a=(await fetch(r+"?q=SELECT%201",{method:"GET",headers:e.headers||{},signal:AbortSignal.timeout(2e3)})).ok;return this._sqlAvailableByHost.set(t,a),a||console.info(`[gouv-widgets] Grist SQL endpoint not available on ${t} — using client-side processing`),a}catch{return this._sqlAvailableByHost.set(t,!1),console.info(`[gouv-widgets] Grist SQL endpoint not available on ${t} — using client-side processing`),!1}}_extractHostname(e){try{return new URL(e).hostname}catch{return e}}};l(an,"GristAdapter");let pr=an;const Yn="https://api.insee.fr/melodi",Zn=1e3,fr=100;function Xn(s,e){const t={};return e&&(t.signal=e),s.headers&&Object.keys(s.headers).length>0&&(t.headers=s.headers),t}l(Xn,"buildFetchOptions");const on=class on{constructor(){this.type="insee",this.capabilities={serverFetch:!0,serverFacets:!1,serverSearch:!1,serverGroupBy:!1,serverOrderBy:!1,whereFormat:"colon"}}validate(e){return e.datasetId?null:'attribut "dataset-id" requis pour les requetes INSEE Melodi'}async fetchAll(e,t){var p;const i=e.pageSize>0?e.pageSize:Zn,n=e.limit<=0?fr*i:e.limit;let a=[],o=-1;for(let u=1;u<=fr;u++){const c=n-a.length;if(c<=0)break;const d=Math.min(i,c),f=this.buildUrl(e,d,u),g=await fetch(f,Xn(e,t));if(!g.ok)throw new Error(`HTTP ${g.status}: ${g.statusText}`);const _=await g.json(),S=_.observations||[],b=this._flattenObservations(S);if(a=a.concat(b),_.paging&&typeof _.paging.count=="number"&&(o=_.paging.count),((p=_.paging)==null?void 0:p.isLast)===!0||o>=0&&a.length>=o||S.length<d)break}return o>=0&&a.length<o&&a.length<n&&console.warn(`gouv-source[insee]: pagination incomplete - ${a.length}/${o} resultats (limite: ${fr} pages de ${i})`),{data:a,totalCount:o>=0?o:a.length,needsClientProcessing:!0}}async fetchPage(e,t,i){var c;const r=this.buildServerSideUrl(e,t),n=await fetch(r,Xn(e,i));if(!n.ok)throw new Error(`HTTP ${n.status}: ${n.statusText}`);const a=await n.json(),o=a.observations||[],p=this._flattenObservations(o),u=((c=a.paging)==null?void 0:c.count)??0;return{data:p,totalCount:u,needsClientProcessing:!0,rawJson:a}}buildUrl(e,t,i){const r=e.baseUrl||Yn,n=new URL(`${r}/data/${e.datasetId}`),a=t??(e.limit>0?e.limit:Zn);n.searchParams.set("maxResult",String(a)),n.searchParams.set("totalCount","TRUE"),i&&i>0&&n.searchParams.set("page",String(i));const o=e.where||e.filter;return o&&this._applyDimensionFilters(n,o),n.toString()}buildServerSideUrl(e,t){const i=e.baseUrl||Yn,r=new URL(`${i}/data/${e.datasetId}`);return r.searchParams.set("maxResult",String(e.pageSize)),r.searchParams.set("totalCount","TRUE"),r.searchParams.set("page",String(t.page)),t.effectiveWhere&&this._applyDimensionFilters(r,t.effectiveWhere),r.toString()}getDefaultSearchTemplate(){return null}getProviderConfig(){return qn}buildFacetWhere(e,t){const i=[];for(const[r,n]of Object.entries(e))r===t||n.size===0||(n.size===1?i.push(`${r}:eq:${[...n][0]}`):i.push(`${r}:in:${[...n].join("|")}`));return i.join(", ")}_flattenObservations(e){return e.map(t=>{const i=t,r={},n=i.dimensions;if(n)for(const[p,u]of Object.entries(n))r[p]=u;const a=i.measures;if(a)for(const[p,u]of Object.entries(a)){const c=u;if(c&&"value"in c){const d=p.replace(/_NIVEAU$/,"");r[d]=c.value}}const o=i.attributes;if(o)for(const[p,u]of Object.entries(o))r[p]=u;return r})}_applyDimensionFilters(e,t){const i=t.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const n=r.split(":");if(n.length<3){n.length===2&&e.searchParams.append(n[0],n[1]);continue}const[a,o,...p]=n,u=p.join(":");switch(o){case"eq":e.searchParams.append(a,u);break;case"in":{const c=u.split("|");for(const d of c)e.searchParams.append(a,d);break}}}}};l(on,"InseeAdapter");let gr=on;const es=new Map([["generic",new or],["opendatasoft",new ur],["tabular",new hr],["grist",new pr],["insee",new gr]]);function ts(s){const e=es.get(s);if(!e)throw new Error(`Type d'API non supporte: ${s}`);return e}l(ts,"getAdapter");function Ya(s){es.set(s.type,s)}l(Ya,"registerAdapter");const ae={LOADED:"gouv-data-loaded",ERROR:"gouv-data-error",LOADING:"gouv-data-loading",SOURCE_COMMAND:"gouv-source-command"},mr=new Map,_r=new Map;function Za(s,e){mr.set(s,e)}l(Za,"setDataCache");function Ge(s){return mr.get(s)}l(Ge,"getDataCache");function xt(s){mr.delete(s)}l(xt,"clearDataCache");function qe(s,e){_r.set(s,e)}l(qe,"setDataMeta");function Ve(s){return _r.get(s)}l(Ve,"getDataMeta");function vr(s){_r.delete(s)}l(vr,"clearDataMeta");function oe(s,e){Za(s,e);const t=new CustomEvent(ae.LOADED,{bubbles:!0,composed:!0,detail:{sourceId:s,data:e}});document.dispatchEvent(t)}l(oe,"dispatchDataLoaded");function Ae(s,e){const t=new CustomEvent(ae.ERROR,{bubbles:!0,composed:!0,detail:{sourceId:s,error:e}});document.dispatchEvent(t)}l(Ae,"dispatchDataError");function Te(s){const e=new CustomEvent(ae.LOADING,{bubbles:!0,composed:!0,detail:{sourceId:s}});document.dispatchEvent(e)}l(Te,"dispatchDataLoading");function he(s,e){const t=new CustomEvent(ae.SOURCE_COMMAND,{bubbles:!0,composed:!0,detail:{sourceId:s,...e}});document.dispatchEvent(t)}l(he,"dispatchSourceCommand");function fi(s,e){const t=l(i=>{const r=i;if(r.detail.sourceId===s){const{sourceId:n,...a}=r.detail;e(a)}},"handler");return document.addEventListener(ae.SOURCE_COMMAND,t),()=>document.removeEventListener(ae.SOURCE_COMMAND,t)}l(fi,"subscribeToSourceCommands");function rt(s,e){const t=l(n=>{const a=n;a.detail.sourceId===s&&e.onLoaded&&e.onLoaded(a.detail.data)},"handleLoaded"),i=l(n=>{const a=n;a.detail.sourceId===s&&e.onError&&e.onError(a.detail.error)},"handleError"),r=l(n=>{n.detail.sourceId===s&&e.onLoading&&e.onLoading()},"handleLoading");return document.addEventListener(ae.LOADED,t),document.addEventListener(ae.ERROR,i),document.addEventListener(ae.LOADING,r),()=>{document.removeEventListener(ae.LOADED,t),document.removeEventListener(ae.ERROR,i),document.removeEventListener(ae.LOADING,r)}}l(rt,"subscribeToSource");var I=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.GouvSource=(ct=class extends x{constructor(){super(...arguments),this.url="",this.method="GET",this.headers="",this.params="",this.refresh=0,this.transform="",this.paginate=!1,this.pageSize=20,this.cacheTtl=3600,this.useProxy=!1,this.data="",this.apiType="generic",this.baseUrl="",this.datasetId="",this.resource="",this.where="",this.select="",this.groupBy="",this.aggregate="",this.orderBy="",this.serverSide=!1,this.limit=0,this._loading=!1,this._error=null,this._data=null,this._currentPage=1,this._refreshInterval=null,this._abortController=null,this._unsubscribeCommands=null,this._whereOverlays=new Map,this._orderByOverlay="",this._groupByOverlay="",this._aggregateOverlay="",this._adapter=null}createRenderRoot(){return this}render(){return v``}connectedCallback(){super.connectedCallback(),de("gouv-source",this._isAdapterMode()?this.apiType:void 0),this._setupRefresh(),this._setupCommandListener()}disconnectedCallback(){super.disconnectedCallback(),this._cleanup(),this.id&&(xt(this.id),vr(this.id))}updated(e){if(e.has("data")&&this.data){this._dispatchInlineData();return}const t=e.has("url")||e.has("params")||e.has("transform"),i=e.has("apiType")||e.has("baseUrl")||e.has("datasetId")||e.has("resource")||e.has("where")||e.has("select")||e.has("groupBy")||e.has("aggregate")||e.has("orderBy")||e.has("limit");(t||i)&&((this.paginate||this.serverSide)&&(e.has("url")||e.has("params")||i)&&(this._currentPage=1),e.has("apiType")&&(this._adapter=null),this._fetchData()),e.has("refresh")&&this._setupRefresh(),(e.has("paginate")||e.has("pageSize")||e.has("serverSide")||e.has("apiType"))&&this._setupCommandListener()}getAdapter(){return this._isAdapterMode()?(this._adapter||(this._adapter=ts(this.apiType)),this._adapter):null}getEffectiveWhere(e){const t=[];this.where&&t.push(this.where);for(const[n,a]of this._whereOverlays)n!==e&&a&&t.push(a);const i=this.getAdapter(),r=(i==null?void 0:i.capabilities.whereFormat)==="odsql"?" AND ":", ";return t.join(r)}reload(){this._fetchData()}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}_dispatchInlineData(){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}try{const e=JSON.parse(this.data);this._data=e,oe(this.id,this._data)}catch(e){this._error=new Error("Donnees inline invalides (JSON attendu)"),Ae(this.id,this._error),console.error(`gouv-source[${this.id}]: JSON invalide dans data`,e)}}_isAdapterMode(){return this.apiType!=="generic"||this.apiType==="generic"&&!this.url&&this.baseUrl!==""}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._abortController&&(this._abortController.abort(),this._abortController=null),this._unsubscribeCommands&&(this._unsubscribeCommands(),this._unsubscribeCommands=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._fetchData()},this.refresh*1e3))}_setupCommandListener(){this._unsubscribeCommands&&(this._unsubscribeCommands(),this._unsubscribeCommands=null),!(!this.id||!(this.paginate||this.serverSide||this._isAdapterMode()))&&(this._unsubscribeCommands=fi(this.id,t=>{let i=!1;if(t.page!==void 0&&t.page!==this._currentPage&&(this._currentPage=t.page,i=!0),t.where!==void 0){const r=t.whereKey||"__default";t.where?this._whereOverlays.set(r,t.where):this._whereOverlays.delete(r),this._currentPage=1,i=!0}t.orderBy!==void 0&&t.orderBy!==this._orderByOverlay&&(this._orderByOverlay=t.orderBy,i=!0),t.groupBy!==void 0&&t.groupBy!==this._groupByOverlay&&(this._groupByOverlay=t.groupBy,i=!0),t.aggregate!==void 0&&t.aggregate!==this._aggregateOverlay&&(this._aggregateOverlay=t.aggregate,i=!0),i&&this._fetchData()}))}async _fetchData(){return this._isAdapterMode()?this._fetchViaAdapter():this._fetchViaUrl()}async _fetchViaUrl(){var e,t;if(this.url){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,Te(this.id);try{const i=this._buildUrl();let r=Ba(i);const n=this._buildFetchOptions();if(this.useProxy&&r===i){const p=Ia(r,n.headers);r=p.url,n.headers=p.headers}const a=await fetch(r,{...n,signal:this._abortController.signal});if(!a.ok)throw new Error(`HTTP ${a.status}: ${a.statusText}`);let o;try{o=await a.json()}catch{const p=((t=(e=a.headers)==null?void 0:e.get)==null?void 0:t.call(e,"content-type"))||"unknown";throw new Error(`Reponse non-JSON (content-type: ${p}) — verifiez l'URL ou la configuration du proxy`)}this.paginate&&o.meta&&qe(this.id,{page:o.meta.page??this._currentPage,pageSize:o.meta.page_size??this.pageSize,total:o.meta.total??0}),this.transform?this._data=q(o,this.transform):this.paginate&&o.data&&!this.transform?this._data=o.data:this._data=o,oe(this.id,this._data),this.cacheTtl>0&&di()&&this._putCache(this._data).catch(()=>{})}catch(i){if(i.name==="AbortError")return;if(this.cacheTtl>0&&di()){const r=await this._getCache();if(r){this._data=r,oe(this.id,this._data),this.dispatchEvent(new CustomEvent("cache-fallback",{detail:{sourceId:this.id}}));return}}this._error=i,Ae(this.id,this._error),console.error(`gouv-source[${this.id}]: Erreur de chargement`,i)}finally{this._loading=!1}}}async _fetchViaAdapter(){if(!this.id){console.warn('gouv-source: attribut "id" requis pour identifier la source');return}const e=this.getAdapter();if(!e){console.warn(`gouv-source[${this.id}]: adapter introuvable pour api-type="${this.apiType}"`);return}const t=this._getAdapterParams(),i=e.validate(t);if(i){console.warn(`gouv-source[${this.id}]: ${i}`);return}this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._loading=!0,this._error=null,Te(this.id);try{let r;if(this.serverSide){const n={page:this._currentPage,effectiveWhere:this.getEffectiveWhere(),orderBy:this._orderByOverlay||this.orderBy};r=await e.fetchPage(t,n,this._abortController.signal),qe(this.id,{page:this._currentPage,pageSize:this.pageSize,total:r.totalCount,needsClientProcessing:r.needsClientProcessing})}else r=await e.fetchAll(t,this._abortController.signal),qe(this.id,{page:1,pageSize:0,total:r.totalCount,needsClientProcessing:r.needsClientProcessing});this._data=r.data,oe(this.id,this._data),this.cacheTtl>0&&di()&&this._putCache(this._data).catch(()=>{})}catch(r){if(r.name==="AbortError")return;if(this.cacheTtl>0&&di()){const n=await this._getCache();if(n){this._data=n,oe(this.id,this._data),this.dispatchEvent(new CustomEvent("cache-fallback",{detail:{sourceId:this.id}}));return}}this._error=r,Ae(this.id,this._error),console.error(`gouv-source[${this.id}]: Erreur de chargement`,r)}finally{this._loading=!1}}_getAdapterParams(){let e;if(this.headers)try{e=JSON.parse(this.headers)}catch{}return{baseUrl:this.baseUrl,datasetId:this.datasetId,resource:this.resource,select:this.select,where:this.getEffectiveWhere(),filter:"",groupBy:this._groupByOverlay||this.groupBy,aggregate:this._aggregateOverlay||this.aggregate,orderBy:this._orderByOverlay||this.orderBy,limit:this.limit,transform:this.transform,pageSize:this.pageSize,headers:e}}_buildUrl(){const e=window.location.origin!=="null"?window.location.origin:void 0,t=new URL(this.url,e);if(this.params&&this.method==="GET")try{const i=JSON.parse(this.params);Object.entries(i).forEach(([r,n])=>{t.searchParams.set(r,String(n))})}catch(i){console.warn("gouv-source: params invalides (JSON attendu)",i)}return this.paginate&&(t.searchParams.set("page",String(this._currentPage)),t.searchParams.set("page_size",String(this.pageSize))),t.toString()}_buildFetchOptions(){const e={method:this.method};if(this.headers)try{e.headers=JSON.parse(this.headers)}catch(t){console.warn("gouv-source: headers invalides (JSON attendu)",t)}return this.method==="POST"&&this.params&&(e.headers={"Content-Type":"application/json",...e.headers||{}},e.body=this.params),e}async _putCache(e){const t=Array.isArray(e)?e.length:1;await fetch(`/api/cache/${encodeURIComponent(this.id)}`,{method:"PUT",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({data:e,recordCount:t,ttlSeconds:this.cacheTtl})})}async _getCache(){try{const e=await fetch(`/api/cache/${encodeURIComponent(this.id)}`,{credentials:"include"});return e.ok?(await e.json()).data??null:null}catch{return null}}},l(ct,"GouvSource"),ct),I([m({type:String})],h.GouvSource.prototype,"url",void 0),I([m({type:String})],h.GouvSource.prototype,"method",void 0),I([m({type:String})],h.GouvSource.prototype,"headers",void 0),I([m({type:String})],h.GouvSource.prototype,"params",void 0),I([m({type:Number})],h.GouvSource.prototype,"refresh",void 0),I([m({type:String})],h.GouvSource.prototype,"transform",void 0),I([m({type:Boolean})],h.GouvSource.prototype,"paginate",void 0),I([m({type:Number,attribute:"page-size"})],h.GouvSource.prototype,"pageSize",void 0),I([m({type:Number,attribute:"cache-ttl"})],h.GouvSource.prototype,"cacheTtl",void 0),I([m({type:Boolean,attribute:"use-proxy"})],h.GouvSource.prototype,"useProxy",void 0),I([m({type:String})],h.GouvSource.prototype,"data",void 0),I([m({type:String,attribute:"api-type"})],h.GouvSource.prototype,"apiType",void 0),I([m({type:String,attribute:"base-url"})],h.GouvSource.prototype,"baseUrl",void 0),I([m({type:String,attribute:"dataset-id"})],h.GouvSource.prototype,"datasetId",void 0),I([m({type:String})],h.GouvSource.prototype,"resource",void 0),I([m({type:String})],h.GouvSource.prototype,"where",void 0),I([m({type:String})],h.GouvSource.prototype,"select",void 0),I([m({type:String,attribute:"group-by"})],h.GouvSource.prototype,"groupBy",void 0),I([m({type:String})],h.GouvSource.prototype,"aggregate",void 0),I([m({type:String,attribute:"order-by"})],h.GouvSource.prototype,"orderBy",void 0),I([m({type:Boolean,attribute:"server-side"})],h.GouvSource.prototype,"serverSide",void 0),I([m({type:Number})],h.GouvSource.prototype,"limit",void 0),I([$()],h.GouvSource.prototype,"_loading",void 0),I([$()],h.GouvSource.prototype,"_error",void 0),I([$()],h.GouvSource.prototype,"_data",void 0),h.GouvSource=I([Q("gouv-source")],h.GouvSource);var te=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.GouvQuery=(ut=class extends x{constructor(){super(...arguments),this.source="",this.where="",this.filter="",this.groupBy="",this.aggregate="",this.orderBy="",this.limit=0,this.transform="",this.serverSide=!1,this.pageSize=20,this.refresh=0,this._loading=!1,this._error=null,this._data=[],this._rawData=[],this._refreshInterval=null,this._unsubscribe=null,this._unsubscribeCommands=null,this._serverDelegated={groupBy:!1,aggregate:!1,orderBy:!1}}createRenderRoot(){return this}render(){return v``}connectedCallback(){super.connectedCallback(),de("gouv-query"),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._clearServerDelegation(),this._cleanup(),this.id&&(xt(this.id),vr(this.id))}updated(e){["source","where","filter","groupBy","aggregate","orderBy","limit","transform","serverSide","pageSize"].some(i=>e.has(i))&&this._initialize(),e.has("refresh")&&this._setupRefresh()}_cleanup(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this._unsubscribeCommands&&(this._unsubscribeCommands(),this._unsubscribeCommands=null)}_setupRefresh(){this._refreshInterval&&(clearInterval(this._refreshInterval),this._refreshInterval=null),this.refresh>0&&(this._refreshInterval=window.setInterval(()=>{this._initialize()},this.refresh*1e3))}_initialize(){if(!this.id){console.warn('gouv-query: attribut "id" requis pour identifier la requete');return}if(this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this._unsubscribeCommands&&(this._unsubscribeCommands(),this._unsubscribeCommands=null),!this.source){console.warn(`gouv-query[${this.id}]: attribut "source" requis`);return}this._negotiateServerSide(),this._subscribeToSourceData(this.source),this._setupCommandForwarding()}_negotiateServerSide(){var p;this._serverDelegated={groupBy:!1,aggregate:!1,orderBy:!1};const e=document.getElementById(this.source);if(!e||!("getAdapter"in e))return;const t=(p=e.getAdapter)==null?void 0:p.call(e);if(!(t!=null&&t.capabilities))return;const i=t.capabilities,r=e.groupBy||"",n=e.aggregate||"",a={};this.groupBy&&i.serverGroupBy&&!r&&!n&&(a.groupBy=this.groupBy,this._serverDelegated.groupBy=!0,this.aggregate&&(a.aggregate=this.aggregate,this._serverDelegated.aggregate=!0));const o=e.orderBy||"";this.orderBy&&i.serverOrderBy&&!o&&(a.orderBy=this.orderBy,this._serverDelegated.orderBy=!0),Object.keys(a).length>0&&he(this.source,a)}_clearServerDelegation(){if(!this.source||!this._hasServerDelegation())return;const e={};this._serverDelegated.groupBy&&(e.groupBy=""),this._serverDelegated.aggregate&&(e.aggregate=""),this._serverDelegated.orderBy&&(e.orderBy=""),Object.keys(e).length>0&&he(this.source,e),this._serverDelegated={groupBy:!1,aggregate:!1,orderBy:!1}}_hasServerDelegation(){return this._serverDelegated.groupBy||this._serverDelegated.aggregate||this._serverDelegated.orderBy}_subscribeToSourceData(e){if(!this._hasServerDelegation()){const t=Ge(e);t!==void 0&&(this._rawData=Array.isArray(t)?t:[t],this._handleSourceData())}this._unsubscribe=rt(e,{onLoaded:l(t=>{this._rawData=Array.isArray(t)?t:[t],this._handleSourceData()},"onLoaded"),onLoading:l(()=>{this._loading=!0,Te(this.id)},"onLoading"),onError:l(t=>{this._error=t,this._loading=!1,Ae(this.id,t)},"onError")})}_handleSourceData(){try{Te(this.id),this._loading=!0,this._processClientSide()}catch(e){this._error=e,Ae(this.id,this._error),console.error(`gouv-query[${this.id}]: Erreur de traitement`,e)}finally{this._loading=!1}}_processClientSide(){let e=[...this._rawData];const t=Ve(this.source),i=(t==null?void 0:t.needsClientProcessing)===!0,r=this.filter||this.where;r&&(e=this._applyFilters(e,r)),this.groupBy&&(!this._serverDelegated.groupBy||i)&&(e=this._applyGroupByAndAggregate(e)),this.orderBy&&(!this._serverDelegated.orderBy||i)&&(e=this._applySort(e)),this.limit>0&&(e=e.slice(0,this.limit)),this._data=e,oe(this.id,this._data)}_applyFilters(e,t){const i=this._parseFilters(t);return e.filter(r=>i.every(n=>this._matchesFilter(r,n)))}_parseFilters(e){const t=[],i=e.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const n=r.split(":");if(n.length>=2){const a=n[0],o=n[1];let p;if(n.length>2){const u=n.slice(2).join(":");o==="in"||o==="notin"?p=u.split("|").map(c=>{const d=this._parseValue(c);return typeof d=="boolean"?String(d):d}):p=this._parseValue(u)}t.push({field:a,operator:o,value:p})}}return t}_parseValue(e){return e==="true"?!0:e==="false"?!1:!isNaN(Number(e))&&e!==""?Number(e):e}_matchesFilter(e,t){const i=q(e,t.field);switch(t.operator){case"eq":return i==t.value;case"neq":return i!=t.value;case"gt":return Number(i)>Number(t.value);case"gte":return Number(i)>=Number(t.value);case"lt":return Number(i)<Number(t.value);case"lte":return Number(i)<=Number(t.value);case"contains":return String(i).toLowerCase().includes(String(t.value).toLowerCase());case"notcontains":return!String(i).toLowerCase().includes(String(t.value).toLowerCase());case"in":return Array.isArray(t.value)&&t.value.includes(i);case"notin":return Array.isArray(t.value)&&!t.value.includes(i);case"isnull":return i==null;case"isnotnull":return i!=null;default:return!0}}_applyGroupByAndAggregate(e){const t=this.groupBy.split(",").map(a=>a.trim()).filter(Boolean),i=this._parseAggregates(this.aggregate),r=new Map;for(const a of e){const o=t.map(p=>String(q(a,p)??"")).join("|||");r.has(o)||r.set(o,[]),r.get(o).push(a)}const n=[];for(const[a,o]of r){const p={},u=a.split("|||");t.forEach((c,d)=>{Mn(p,c,u[d])});for(const c of i){const d=c.alias||`${c.field}__${c.function}`;Mn(p,d,this._computeAggregate(o,c))}n.push(p)}return n}_parseAggregates(e){if(!e)return[];const t=[],i=e.split(",").map(r=>r.trim()).filter(Boolean);for(const r of i){const n=r.split(":");n.length>=2&&t.push({field:n[0],function:n[1],alias:n[2]})}return t}_computeAggregate(e,t){const i=e.map(r=>Number(q(r,t.field))).filter(r=>!isNaN(r));switch(t.function){case"count":return e.length;case"sum":return i.reduce((r,n)=>r+n,0);case"avg":return i.length>0?i.reduce((r,n)=>r+n,0)/i.length:0;case"min":return i.length>0?Math.min(...i):0;case"max":return i.length>0?Math.max(...i):0;default:return 0}}_applySort(e){const t=this.orderBy.split(":");if(t.length<1)return e;const i=t[0],r=(t[1]||"asc").toLowerCase();return[...e].sort((n,a)=>{const o=q(n,i),p=q(a,i),u=Number(o),c=Number(p);if(!isNaN(u)&&!isNaN(c))return r==="desc"?c-u:u-c;const d=String(o??""),f=String(p??"");return r==="desc"?f.localeCompare(d):d.localeCompare(f)})}_setupCommandForwarding(){this._unsubscribeCommands&&(this._unsubscribeCommands(),this._unsubscribeCommands=null),!(!this.id||!this.serverSide)&&this.source&&(this._unsubscribeCommands=fi(this.id,e=>{he(this.source,e)}))}getEffectiveWhere(e){if(this.source){const t=document.getElementById(this.source);if(t&&"getEffectiveWhere"in t)return t.getEffectiveWhere(e)}return this.where||this.filter||""}getAdapter(){if(this.source){const e=document.getElementById(this.source);if(e&&"getAdapter"in e)return e.getAdapter()}return null}reload(){if(this.source){const e=Ge(this.source);e!==void 0&&(this._rawData=Array.isArray(e)?e:[e],this._handleSourceData())}}getData(){return this._data}isLoading(){return this._loading}getError(){return this._error}},l(ut,"GouvQuery"),ut),te([m({type:String})],h.GouvQuery.prototype,"source",void 0),te([m({type:String})],h.GouvQuery.prototype,"where",void 0),te([m({type:String})],h.GouvQuery.prototype,"filter",void 0),te([m({type:String,attribute:"group-by"})],h.GouvQuery.prototype,"groupBy",void 0),te([m({type:String})],h.GouvQuery.prototype,"aggregate",void 0),te([m({type:String,attribute:"order-by"})],h.GouvQuery.prototype,"orderBy",void 0),te([m({type:Number})],h.GouvQuery.prototype,"limit",void 0),te([m({type:String})],h.GouvQuery.prototype,"transform",void 0),te([m({type:Boolean,attribute:"server-side"})],h.GouvQuery.prototype,"serverSide",void 0),te([m({type:Number,attribute:"page-size"})],h.GouvQuery.prototype,"pageSize",void 0),te([m({type:Number})],h.GouvQuery.prototype,"refresh",void 0),te([$()],h.GouvQuery.prototype,"_loading",void 0),te([$()],h.GouvQuery.prototype,"_error",void 0),te([$()],h.GouvQuery.prototype,"_data",void 0),te([$()],h.GouvQuery.prototype,"_rawData",void 0),h.GouvQuery=te([Q("gouv-query")],h.GouvQuery);var pe=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.GouvNormalize=(dt=class extends x{constructor(){super(...arguments),this.source="",this.numeric="",this.numericAuto=!1,this.rename="",this.trim=!1,this.stripHtml=!1,this.replace="",this.replaceFields="",this.flatten="",this.round="",this.lowercaseKeys=!1,this._unsubscribe=null,this._unsubscribePageRequests=null}createRenderRoot(){return this}render(){return v``}connectedCallback(){super.connectedCallback(),de("gouv-normalize"),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this._unsubscribePageRequests&&(this._unsubscribePageRequests(),this._unsubscribePageRequests=null),this.id&&(xt(this.id),vr(this.id))}updated(e){if(super.updated(e),e.has("source")){this._initialize();return}if(["flatten","numeric","numericAuto","round","rename","trim","stripHtml","replace","replaceFields","lowercaseKeys"].some(r=>e.has(r))){const r=this.source?Ge(this.source):void 0;r!==void 0&&this._processData(r)}}_initialize(){if(!this.id){console.warn('gouv-normalize: attribut "id" requis pour identifier la sortie');return}if(!this.source){console.warn('gouv-normalize: attribut "source" requis');return}this._unsubscribe&&this._unsubscribe(),this._unsubscribePageRequests&&(this._unsubscribePageRequests(),this._unsubscribePageRequests=null);const e=Ge(this.source);e!==void 0&&this._processData(e),this._unsubscribe=rt(this.source,{onLoaded:l(t=>{this._processData(t)},"onLoaded"),onLoading:l(()=>{Te(this.id)},"onLoading"),onError:l(t=>{Ae(this.id,t)},"onError")}),this._unsubscribePageRequests=fi(this.id,t=>{he(this.source,t)})}_processData(e){try{Te(this.id);let t=Array.isArray(e)?e:[e];this.flatten&&(t=t.map(c=>c==null||typeof c!="object"||Array.isArray(c)?c:this._flattenRow(c,this.flatten)));const i=this._parseNumericFields(),r=this._parseRoundFields(),n=this._parsePipeMap(this.rename),a=this._parsePipeMap(this.replace),o=this._parseReplaceFields(this.replaceFields),p=t.map(c=>c==null||typeof c!="object"?c:this._normalizeRow(c,i,r,n,a,o));oe(this.id,p);const u=Ve(this.source);u&&qe(this.id,u)}catch(t){Ae(this.id,t),console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`,t)}}_normalizeRow(e,t,i,r,n,a){const o={};for(const[p,u]of Object.entries(e)){const c=this.trim?p.trim():p;let d=u;if(this.trim&&typeof d=="string"&&(d=d.trim()),this.stripHtml&&typeof d=="string"&&(d=d.replace(/<[^>]*>/g,"")),a.size>0&&typeof d=="string"){const _=a.get(c);if(_){for(const[S,b]of _)if(d===S){d=b;break}}}if(n.size>0&&typeof d=="string"){for(const[_,S]of n)if(d===_){d=S;break}}if(t.has(c))d=Nn(d);else if(this.numericAuto&&typeof d=="string"&&Fa(d)){const _=Nn(d,!0);_!==null&&(d=_)}if(i.has(c)&&typeof d=="number"&&isFinite(d)){const _=i.get(c);if(_===0)d=Math.round(d);else{const S=10**_;d=Math.round(d*S)/S}}const f=r.get(c)??c,g=this.lowercaseKeys?f.toLowerCase():f;o[g]=d}return o}_flattenRow(e,t){const i=this._resolvePath(e,t);if(i&&typeof i=="object"&&!Array.isArray(i)){const r={...e};return this._deleteByPath(r,t),Object.assign(r,i),r}return e}_resolvePath(e,t){return t.split(".").reduce((i,r)=>i!=null&&typeof i=="object"?i[r]:void 0,e)}_deleteByPath(e,t){const i=t.split(".");delete e[i[0]]}_parseNumericFields(){return this.numeric?new Set(this.numeric.split(",").map(e=>e.trim()).filter(Boolean)):new Set}_parseRoundFields(){const e=new Map;if(!this.round)return e;for(const t of this.round.split(",")){const i=t.trim();if(!i)continue;const r=i.indexOf(":");if(r===-1)e.set(i,0);else{const n=i.substring(0,r).trim(),a=parseInt(i.substring(r+1).trim(),10);n&&e.set(n,isNaN(a)?0:a)}}return e}_parseReplaceFields(e){const t=new Map;if(!e)return t;const i=e.split("|");for(const r of i){const n=r.trim(),a=n.indexOf(":");if(a===-1)continue;const o=n.indexOf(":",a+1);if(o===-1)continue;const p=n.substring(0,a).trim(),u=n.substring(a+1,o).trim(),c=n.substring(o+1).trim();!p||!u||(t.has(p)||t.set(p,new Map),t.get(p).set(u,c))}return t}_parsePipeMap(e){const t=new Map;if(!e)return t;const i=e.split("|");for(const r of i){const n=r.indexOf(":");if(n===-1)continue;const a=r.substring(0,n).trim(),o=r.substring(n+1).trim();a&&t.set(a,o)}return t}},l(dt,"GouvNormalize"),dt),pe([m({type:String})],h.GouvNormalize.prototype,"source",void 0),pe([m({type:String})],h.GouvNormalize.prototype,"numeric",void 0),pe([m({type:Boolean,attribute:"numeric-auto"})],h.GouvNormalize.prototype,"numericAuto",void 0),pe([m({type:String})],h.GouvNormalize.prototype,"rename",void 0),pe([m({type:Boolean})],h.GouvNormalize.prototype,"trim",void 0),pe([m({type:Boolean,attribute:"strip-html"})],h.GouvNormalize.prototype,"stripHtml",void 0),pe([m({type:String})],h.GouvNormalize.prototype,"replace",void 0),pe([m({type:String,attribute:"replace-fields"})],h.GouvNormalize.prototype,"replaceFields",void 0),pe([m({type:String})],h.GouvNormalize.prototype,"flatten",void 0),pe([m({type:String})],h.GouvNormalize.prototype,"round",void 0),pe([m({type:Boolean,attribute:"lowercase-keys"})],h.GouvNormalize.prototype,"lowercaseKeys",void 0),h.GouvNormalize=pe([Q("gouv-normalize")],h.GouvNormalize);var U=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.GouvFacets=(ht=class extends x{constructor(){super(...arguments),this.source="",this.fields="",this.labels="",this.maxValues=6,this.disjunctive="",this.sort="count",this.searchable="",this.hideEmpty=!1,this.display="",this.urlParams=!1,this.urlParamMap="",this.urlSync=!1,this.serverFacets=!1,this.staticValues="",this.hideCounts=!1,this.cols="",this._rawData=[],this._facetGroups=[],this._activeSelections={},this._expandedFacets=new Set,this._searchQueries={},this._openMultiselectField=null,this._liveAnnouncement="",this._unsubscribe=null,this._unsubscribeCommands=null,this._popstateHandler=null,this._urlParamsApplied=!1,this._onClickOutsideMultiselect=e=>{if(!this._openMultiselectField)return;const t=e.target,i=this.querySelector(`[data-multiselect="${this._openMultiselectField}"]`);i&&!i.contains(t)&&(this._openMultiselectField=null,this._setBackgroundInert(!1))},this._searchDebounceTimer=null}get _effectiveHideCounts(){return this.hideCounts||!!this.staticValues}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),de("gouv-facets"),this._initialize(),document.addEventListener("click",this._onClickOutsideMultiselect),this.urlSync&&(this._popstateHandler=()=>{this._applyUrlParams(),this._buildFacetGroups(),this._applyFilters()},window.addEventListener("popstate",this._popstateHandler))}disconnectedCallback(){super.disconnectedCallback(),this._setBackgroundInert(!1),document.removeEventListener("click",this._onClickOutsideMultiselect),this._popstateHandler&&(window.removeEventListener("popstate",this._popstateHandler),this._popstateHandler=null),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this._unsubscribeCommands&&(this._unsubscribeCommands(),this._unsubscribeCommands=null),this.id&&xt(this.id)}updated(e){if(super.updated(e),e.has("source")){this._initialize();return}if(e.has("serverFacets")||e.has("staticValues")){this._initialize();return}["fields","labels","sort","hideEmpty","maxValues","disjunctive","searchable","display","cols"].some(r=>e.has(r))&&this._rawData.length>0&&(this.serverFacets?this._fetchServerFacets():this.staticValues?this._buildStaticFacetGroups():(this._buildFacetGroups(),this._applyFilters()))}_initialize(){if(!this.id){console.warn('gouv-facets: attribut "id" requis pour identifier la sortie');return}if(!this.source){console.warn('gouv-facets: attribut "source" requis');return}this._unsubscribe&&this._unsubscribe(),this._activeSelections={},this._expandedFacets=new Set,this._searchQueries={},(this.serverFacets||!!this.staticValues)&&this.urlParams&&!this._urlParamsApplied&&(this._applyUrlParams(),this._urlParamsApplied=!0,this._hasActiveSelections()&&this._dispatchFacetCommand());const t=Ge(this.source);t!==void 0&&this._onData(t),this._unsubscribe=rt(this.source,{onLoaded:l(i=>{this._onData(i)},"onLoaded"),onLoading:l(()=>{Te(this.id)},"onLoading"),onError:l(i=>{Ae(this.id,i)},"onError")}),this._unsubscribeCommands&&this._unsubscribeCommands(),this._unsubscribeCommands=fi(this.id,i=>{he(this.source,i)})}_onData(e){this._rawData=Array.isArray(e)?e:[];const t=this.serverFacets||!!this.staticValues;if(this.urlParams&&!this._urlParamsApplied&&(this._applyUrlParams(),this._urlParamsApplied=!0,t&&this._hasActiveSelections())){this._dispatchFacetCommand();return}if(this.serverFacets){if(this._fetchServerFacets(),this.id){const i=Ve(this.source);i&&qe(this.id,i),oe(this.id,this._rawData)}}else if(this.staticValues){if(this._buildStaticFacetGroups(),this.id){const i=Ve(this.source);i&&qe(this.id,i),oe(this.id,this._rawData)}}else this._buildFacetGroups(),this._applyFilters()}_buildFacetGroups(){const e=this._getFields(),t=this._parseLabels();this._facetGroups=e.map(i=>{const r=this._computeFacetValues(i);return{field:i,label:t.get(i)??i,values:r}}).filter(i=>this.hideEmpty&&i.values.length<=1?!1:i.values.length>0)}_buildStaticFacetGroups(){if(this.staticValues)try{const e=JSON.parse(this.staticValues),t=this._parseLabels(),i=this.fields?Ut(this.fields):Object.keys(e);this._facetGroups=i.filter(r=>e[r]&&e[r].length>0).map(r=>({field:r,label:t.get(r)??r,values:e[r].map(n=>({value:n,count:0}))})).filter(r=>!(this.hideEmpty&&r.values.length<=1))}catch{console.warn("gouv-facets: static-values invalide (JSON attendu)")}}_buildFacetWhere(e){var n;const t=document.getElementById(this.source),i=(n=t==null?void 0:t.getAdapter)==null?void 0:n.call(t);if(i!=null&&i.buildFacetWhere)return i.buildFacetWhere(this._activeSelections,e);const r=[];for(const[a,o]of Object.entries(this._activeSelections))a===e||o.size===0||(o.size===1?r.push(`${a}:eq:${[...o][0]}`):r.push(`${a}:in:${[...o].join("|")}`));return r.join(", ")}_resolveValue(e,t){if(!t.includes("."))return e[t];const i=t.split(".");let r=e;for(const n of i){if(r==null||typeof r!="object")return;r=r[n]}return r}_getFields(){return this.fields?Ut(this.fields):this._autoDetectFields()}_autoDetectFields(){if(this._rawData.length===0)return[];const e=[],t=this._rawData[0];for(const i of Object.keys(t)){const r=new Set;let n=!0;for(const a of this._rawData){const o=a[i];if(!(o==null||o==="")){if(typeof o!="string"){n=!1;break}if(r.add(o),r.size>50)break}}n&&(r.size<=1||r.size>50||r.size!==this._rawData.length&&e.push(i))}return e}_computeFacetValues(e){const t=this._getDataFilteredExcluding(e),i=new Map;for(const n of t){const a=this._resolveValue(n,e);if(a==null||a==="")continue;const o=String(a);i.set(o,(i.get(o)??0)+1)}const r=[];for(const[n,a]of i)r.push({value:n,count:a});return this._sortValues(r)}_getDataFilteredExcluding(e){const t=Object.keys(this._activeSelections).filter(i=>i!==e&&this._activeSelections[i].size>0);return t.length===0?this._rawData:this._rawData.filter(i=>t.every(r=>{const n=this._activeSelections[r],a=this._resolveValue(i,r);return a==null?!1:n.has(String(a))}))}_sortValues(e){const t=[...e];switch(this.sort){case"count":t.sort((i,r)=>r.count-i.count);break;case"-count":t.sort((i,r)=>i.count-r.count);break;case"alpha":t.sort((i,r)=>i.value.localeCompare(r.value,"fr"));break;case"-alpha":t.sort((i,r)=>r.value.localeCompare(i.value,"fr"));break;default:t.sort((i,r)=>r.count-i.count)}return t}_hasActiveSelections(){return Object.keys(this._activeSelections).some(e=>this._activeSelections[e].size>0)}async _fetchServerFacets(){var d,f;const e=document.getElementById(this.source);if(!e)return;const t=(d=e.getAdapter)==null?void 0:d.call(e);if(!(t!=null&&t.capabilities.serverFacets)||!t.fetchFacets){this._buildFacetGroups(),this._applyFilters();return}const i=e.baseUrl||e.getAttribute("base-url")||"",r=e.datasetId||e.getAttribute("dataset-id")||"";if(!r)return;let n;const a=e.headers||e.getAttribute("headers")||"";if(a)try{n=JSON.parse(a)}catch{}const o=Ut(this.fields);if(o.length===0)return;const p=this._parseLabels(),u=new Map;for(const g of o){const _=((f=e.getEffectiveWhere)==null?void 0:f.call(e,this.id))||"",S=this._buildFacetWhere(g),b=[_,S].filter(Boolean).join(" AND ");u.has(b)||u.set(b,[]),u.get(b).push(g)}const c=[];for(const[g,_]of u)try{const S=await t.fetchFacets({baseUrl:i,datasetId:r,headers:n},_,g);for(const b of S)c.push({field:b.field,label:p.get(b.field)??b.field,values:this._sortValues(b.values)})}catch{}this._facetGroups=o.map(g=>c.find(_=>_.field===g)).filter(g=>!!g).filter(g=>!(this.hideEmpty&&g.values.length<=1))}_dispatchFacetCommand(){const e=this._buildFacetWhere();he(this.source,{where:e,whereKey:this.id})}_applyFilters(){const e=Object.keys(this._activeSelections).filter(i=>this._activeSelections[i].size>0);let t;e.length===0?t=this._rawData:t=this._rawData.filter(i=>e.every(r=>{const n=this._activeSelections[r],a=this._resolveValue(i,r);return a==null?!1:n.has(String(a))})),oe(this.id,t)}_parseLabels(){const e=new Map;if(!this.labels)return e;const t=this.labels.split("|");for(const i of t){const r=i.indexOf(":");if(r===-1)continue;const n=i.substring(0,r).trim(),a=i.substring(r+1).trim();n&&e.set(n,a)}return e}_parseDisplayModes(){const e=new Map;if(!this.display)return e;const t=this.display.split("|");for(const i of t){const r=i.indexOf(":");if(r===-1)continue;const n=i.substring(0,r).trim(),a=i.substring(r+1).trim();n&&(a==="checkbox"||a==="select"||a==="multiselect"||a==="radio")&&e.set(n,a)}return e}_getDisplayMode(e){return this._parseDisplayModes().get(e)??"checkbox"}_parseCols(){if(!this.cols)return null;const e=this.cols.trim();if(/^\d+$/.test(e))return{global:parseInt(e,10)};const t=new Map,i=e.split("|");for(const r of i){const n=r.indexOf(":");if(n===-1)continue;const a=r.substring(0,n).trim(),o=parseInt(r.substring(n+1).trim(),10);a&&!isNaN(o)&&t.set(a,o)}return t.size>0?{map:t,fallback:6}:null}_getColClass(e){const t=this._parseCols();return t?"global"in t?`fr-col-${t.global}`:`fr-col-${t.map.get(e)??t.fallback}`:""}_toggleValue(e,t){const i={...this._activeSelections},r=new Set(i[e]??[]),n=this._getDisplayMode(e),a=Ut(this.disjunctive),o=n==="multiselect"||n==="checkbox"&&a.includes(e),p=r.has(t);if(p?r.delete(t):(o||r.clear(),r.add(t)),r.size===0?delete i[e]:i[e]=r,this._activeSelections=i,this._afterSelectionChange(),n==="multiselect"||n==="radio"||n==="checkbox"){const u=p?"deselectionnee":"selectionnee";this._announce(`${t} ${u}, ${r.size} option${r.size>1?"s":""} selectionnee${r.size>1?"s":""}`)}}_handleSelectChange(e,t){const r=t.target.value,n={...this._activeSelections};r?n[e]=new Set([r]):delete n[e],this._activeSelections=n,this._afterSelectionChange()}_clearFieldSelections(e){const t={...this._activeSelections};delete t[e],this._activeSelections=t,this._afterSelectionChange(),this._announce("Aucune option selectionnee")}_selectAllValues(e){const t=this._facetGroups.find(r=>r.field===e);if(!t)return;const i={...this._activeSelections};i[e]=new Set(t.values.map(r=>r.value)),this._activeSelections=i,this._afterSelectionChange(),this._announce(`${t.values.length} options selectionnees`)}_toggleMultiselectDropdown(e){this._openMultiselectField===e?(this._openMultiselectField=null,this._setBackgroundInert(!1)):(this._openMultiselectField=e,this._setBackgroundInert(!0),this.updateComplete.then(()=>{const t=this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-panel`),i=t==null?void 0:t.querySelector("button, input, select, [tabindex]");i==null||i.focus();const r=this._facetGroups.find(n=>n.field===e);if(r){const n=this._activeSelections[e]??new Set;this._announce(`${r.label}, ${r.values.length} options disponibles, ${n.size} selectionnee${n.size>1?"s":""}`)}}))}_announce(e){this._liveAnnouncement="",requestAnimationFrame(()=>{this._liveAnnouncement=e})}_setBackgroundInert(e){const t=this.closest("gouv-facets")??this;document.querySelectorAll("body > *").forEach(i=>{i.contains(t)||(e?i.setAttribute("inert",""):i.removeAttribute("inert"))})}_handleMultiselectKeydown(e,t){if(t.key==="Escape"){this._openMultiselectField=null,this._setBackgroundInert(!1);const i=this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-trigger`);i==null||i.focus();return}if(t.key==="Tab"){const i=this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-panel`);if(!i)return;const r=[...i.querySelectorAll('button:not([tabindex="-1"]), input, select, [tabindex]:not([tabindex="-1"])')];if(r.length===0)return;const n=r[0],a=r[r.length-1];t.shiftKey&&document.activeElement===n?(t.preventDefault(),a.focus()):!t.shiftKey&&document.activeElement===a&&(t.preventDefault(),n.focus());return}if(t.key==="ArrowDown"||t.key==="ArrowUp"||t.key==="Home"||t.key==="End"){const i=this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-panel`);if(!i)return;const r=[...i.querySelectorAll('input[type="checkbox"], input[type="radio"]')];if(r.length===0)return;const n=r.indexOf(t.target);if(n===-1&&t.key!=="ArrowDown")return;t.preventDefault();let a;t.key==="ArrowDown"?a=n===-1?0:Math.min(n+1,r.length-1):t.key==="ArrowUp"?a=Math.max(n-1,0):t.key==="Home"?a=0:a=r.length-1,r[a].focus()}}_handleMultiselectFocusout(e,t){if(this._openMultiselectField!==e)return;const i=t.relatedTarget;if(!i)return;const r=this.querySelector(`[data-multiselect="${e}"]`);r!=null&&r.contains(i)||(this._openMultiselectField=null,this._setBackgroundInert(!1))}_toggleExpand(e){const t=new Set(this._expandedFacets);t.has(e)?t.delete(e):t.add(e),this._expandedFacets=t}_handleSearch(e,t){const i=t.target;this._searchQueries={...this._searchQueries,[e]:i.value},this._searchDebounceTimer&&clearTimeout(this._searchDebounceTimer),this._searchDebounceTimer=setTimeout(()=>{const r=this._facetGroups.find(o=>o.field===e);if(!r)return;const n=i.value.toLowerCase(),a=n?r.values.filter(o=>o.value.toLowerCase().includes(n)).length:r.values.length;this._announce(a===0?"Aucune option trouvee":`${a} option${a>1?"s":""} disponible${a>1?"s":""}`)},300)}_clearAll(){this._activeSelections={},this._searchQueries={},this._afterSelectionChange()}_afterSelectionChange(){this.serverFacets||this.staticValues?this._dispatchFacetCommand():(this._buildFacetGroups(),this._applyFilters()),this.urlSync&&this._syncUrl()}_parseUrlParamMap(){const e=new Map;if(!this.urlParamMap)return e;const t=this.urlParamMap.split("|");for(const i of t){const r=i.indexOf(":");if(r===-1)continue;const n=i.substring(0,r).trim(),a=i.substring(r+1).trim();n&&a&&e.set(n,a)}return e}_applyUrlParams(){const e=new URLSearchParams(window.location.search),t=this._parseUrlParamMap(),i={};for(const[r,n]of e.entries()){const a=t.size>0?t.get(r)??null:r;if(!a)continue;const o=n.split(",").map(p=>p.trim()).filter(Boolean);i[a]||(i[a]=new Set);for(const p of o)i[a].add(p)}Object.keys(i).length>0&&(this._activeSelections=i)}_syncUrl(){const e=new URLSearchParams,t=this._parseUrlParamMap(),i=new Map;for(const[a,o]of t)i.set(o,a);for(const[a,o]of Object.entries(this._activeSelections)){if(o.size===0)continue;const p=i.get(a)??a;e.set(p,[...o].join(","))}const r=e.toString(),n=r?`${window.location.pathname}?${r}${window.location.hash}`:`${window.location.pathname}${window.location.hash}`;window.history.replaceState(null,"",n)}render(){if(this._rawData.length===0||this._facetGroups.length===0)return w;const e=Object.keys(this._activeSelections).some(i=>this._activeSelections[i].size>0),t=!!this.cols;return v`
      <style>
        .gouv-facets { margin-bottom: 1.5rem; }
        .gouv-facets__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .gouv-facets__groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
        .gouv-facets__group { min-width: 0; }
        .gouv-facets__count { font-weight: 400; font-size: 0.75rem; color: var(--text-mention-grey, #666); margin-left: 0.25rem; }
        .gouv-facets .fr-radio-group .fr-label,
        .gouv-facets .fr-checkbox-group .fr-label { flex-wrap: nowrap; }
        .gouv-facets__multiselect { position: relative; }
        .gouv-facets__multiselect-trigger { width: 100%; text-align: left; cursor: pointer; appearance: none; }
        .gouv-facets__multiselect-trigger[aria-expanded="true"]::after { transform: rotate(180deg); }
        .gouv-facets__multiselect-panel { position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; background: var(--background-default-grey, #fff); border: 1px solid var(--border-default-grey, #ddd); border-radius: 0 0 0.25rem 0.25rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); max-height: 320px; overflow-y: auto; padding: 0.75rem; }
        .gouv-facets__multiselect-panel .fr-search-bar { margin-bottom: 0.75rem; }
        .gouv-facets__dropdown-fieldset { margin: 0; padding: 0; border: none; }
        .gouv-facets__dropdown-fieldset .fr-fieldset__element { padding: 0; }
        .gouv-facets__multiselect-toggle { width: 100%; margin-bottom: 0.75rem; }
        @media (max-width: 576px) { .gouv-facets__groups { grid-template-columns: 1fr; } }
      </style>
      <div class="gouv-facets">
        ${e?v`
          <div class="gouv-facets__header">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line" type="button" @click="${this._clearAll}">
              Reinitialiser les filtres
            </button>
          </div>
        `:w}
        ${t?v`
          <div class="fr-grid-row fr-grid-row--gutters">
            ${this._facetGroups.map(i=>v`
              <div class="${this._getColClass(i.field)}">
                ${this._renderFacetGroup(i)}
              </div>
            `)}
          </div>
        `:v`
          <div class="gouv-facets__groups">
            ${this._facetGroups.map(i=>this._renderFacetGroup(i))}
          </div>
        `}
      </div>
    `}_renderFacetGroup(e){switch(this._getDisplayMode(e.field)){case"select":return this._renderSelectGroup(e);case"multiselect":return this._renderMultiselectGroup(e);case"radio":return this._renderRadioGroup(e);default:return this._renderCheckboxGroup(e)}}_renderCheckboxGroup(e){const i=Ut(this.searchable).includes(e.field),r=(this._searchQueries[e.field]??"").toLowerCase(),n=this._expandedFacets.has(e.field),a=this._activeSelections[e.field]??new Set;let o=e.values;i&&r&&(o=o.filter(d=>d.value.toLowerCase().includes(r)));const p=n?o:o.slice(0,this.maxValues),u=o.length>this.maxValues,c=`facet-${this.id}-${e.field}`;return v`
      <fieldset class="fr-fieldset gouv-facets__group" aria-labelledby="${c}-legend">
        <legend class="fr-fieldset__legend fr-text--bold" id="${c}-legend">${e.label}</legend>
        <div aria-live="polite" class="fr-sr-only">${this._liveAnnouncement}</div>
        ${i?v`
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field]??""}"
                @input="${d=>this._handleSearch(e.field,d)}"
                aria-label="Rechercher dans ${e.label}">
            </div>
          </div>
        `:w}
        ${p.map(d=>{const f=`${c}-${d.value.replace(/[^a-zA-Z0-9]/g,"_")}`,g=a.has(d.value);return v`
            <div class="fr-fieldset__element">
              <div class="fr-checkbox-group fr-checkbox-group--sm">
                <input type="checkbox" id="${f}"
                  .checked="${g}"
                  @change="${()=>this._toggleValue(e.field,d.value)}">
                <label class="fr-label" for="${f}">
                  ${d.value}${this._effectiveHideCounts?w:v`<span class="gouv-facets__count" aria-hidden="true">${d.count}</span><span class="fr-sr-only">, ${d.count} resultat${d.count>1?"s":""}</span>`}
                </label>
              </div>
            </div>
          `})}
        ${u?v`
          <div class="fr-fieldset__element">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm" type="button"
              @click="${()=>this._toggleExpand(e.field)}">
              ${n?"Voir moins":`Voir plus (${o.length-this.maxValues})`}
            </button>
          </div>
        `:w}
      </fieldset>
    `}_renderSelectGroup(e){const t=`facet-${this.id}-${e.field}`,i=this._activeSelections[e.field],r=i?[...i][0]??"":"";return v`
      <div class="gouv-facets__group fr-select-group" data-field="${e.field}">
        <label class="fr-label" for="${t}-select">${e.label}</label>
        <select class="fr-select" id="${t}-select"
          @change="${n=>this._handleSelectChange(e.field,n)}">
          <option value="" ?selected="${!r}">Tous</option>
          ${e.values.map(n=>v`
            <option value="${n.value}" ?selected="${n.value===r}">
              ${this._effectiveHideCounts?n.value:`${n.value} (${n.count})`}
            </option>
          `)}
        </select>
      </div>
    `}_renderMultiselectGroup(e){const t=`facet-${this.id}-${e.field}`,i=this._activeSelections[e.field]??new Set,r=this._openMultiselectField===e.field,n=(this._searchQueries[e.field]??"").toLowerCase();let a=e.values;n&&(a=a.filter(u=>u.value.toLowerCase().includes(n)));const o=i.size>0?`${i.size} option${i.size>1?"s":""} selectionnee${i.size>1?"s":""}`:"Selectionnez des options",p=i.size>0?[...i].join(", "):"";return v`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}"
           @keydown="${u=>this._handleMultiselectKeydown(e.field,u)}"
           @focusout="${u=>this._handleMultiselectFocusout(e.field,u)}">
        <label class="fr-label" id="${t}-legend">${e.label}</label>
        ${p?v`<span class="fr-sr-only" id="${t}-desc">${p}</span>`:w}
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${r}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          aria-describedby="${p?`${t}-desc`:w}"
          @click="${u=>{u.stopPropagation(),this._toggleMultiselectDropdown(e.field)}}">
          ${o}
        </button>
        ${r?v`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-modal="true" aria-label="${e.label}"
               @click="${u=>u.stopPropagation()}">
            <div aria-live="polite" class="fr-sr-only">${this._liveAnnouncement}</div>
            <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left ${i.size>0?"fr-icon-close-circle-line":"fr-icon-check-line"} gouv-facets__multiselect-toggle"
              type="button"
              aria-label="${i.size>0?`Tout deselectionner pour ${e.label}`:`Tout selectionner pour ${e.label}`}"
              @click="${()=>i.size>0?this._clearFieldSelections(e.field):this._selectAllValues(e.field)}">
              ${i.size>0?"Tout deselectionner":"Tout selectionner"}
            </button>
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${e.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                aria-describedby="${t}-search-hint"
                .value="${this._searchQueries[e.field]??""}"
                @input="${u=>this._handleSearch(e.field,u)}">
              <span class="fr-sr-only" id="${t}-search-hint">Les resultats se mettent a jour automatiquement</span>
              <button class="fr-btn" type="button" title="Rechercher" aria-hidden="true" tabindex="-1">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${e.label}">
              ${a.map(u=>{const c=`${t}-${u.value.replace(/[^a-zA-Z0-9]/g,"_")}`,d=i.has(u.value);return v`
                  <div class="fr-fieldset__element">
                    <div class="fr-checkbox-group fr-checkbox-group--sm">
                      <input type="checkbox" id="${c}"
                        .checked="${d}"
                        @change="${()=>this._toggleValue(e.field,u.value)}">
                      <label class="fr-label" for="${c}">
                        ${u.value}${this._effectiveHideCounts?w:v`<span class="gouv-facets__count" aria-hidden="true">${u.count}</span><span class="fr-sr-only">, ${u.count} resultat${u.count>1?"s":""}</span>`}
                      </label>
                    </div>
                  </div>
                `})}
            </fieldset>
          </div>
        `:w}
      </div>
    `}_renderRadioGroup(e){const t=`facet-${this.id}-${e.field}`,i=this._activeSelections[e.field]??new Set,r=this._openMultiselectField===e.field,n=(this._searchQueries[e.field]??"").toLowerCase();let a=e.values;n&&(a=a.filter(u=>u.value.toLowerCase().includes(n)));const o=i.size>0?[...i][0]:null,p=o??"Selectionnez une option";return v`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}"
           @keydown="${u=>this._handleMultiselectKeydown(e.field,u)}"
           @focusout="${u=>this._handleMultiselectFocusout(e.field,u)}">
        <label class="fr-label" id="${t}-legend">${e.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${r}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          @click="${u=>{u.stopPropagation(),this._toggleMultiselectDropdown(e.field)}}">
          ${p}
        </button>
        ${r?v`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-modal="true" aria-label="${e.label}"
               @click="${u=>u.stopPropagation()}">
            <div aria-live="polite" class="fr-sr-only">${this._liveAnnouncement}</div>
            ${o?v`
              <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line gouv-facets__multiselect-toggle"
                type="button"
                aria-label="Reinitialiser ${e.label}"
                @click="${()=>this._clearFieldSelections(e.field)}">
                Reinitialiser
              </button>
            `:w}
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${e.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                aria-describedby="${t}-search-hint"
                .value="${this._searchQueries[e.field]??""}"
                @input="${u=>this._handleSearch(e.field,u)}">
              <span class="fr-sr-only" id="${t}-search-hint">Les resultats se mettent a jour automatiquement</span>
              <button class="fr-btn" type="button" title="Rechercher" aria-hidden="true" tabindex="-1">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${e.label}">
              ${a.map(u=>{const c=`${t}-${u.value.replace(/[^a-zA-Z0-9]/g,"_")}`,d=i.has(u.value);return v`
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-group--sm">
                      <input type="radio" id="${c}" name="${t}-radio"
                        .checked="${d}"
                        @change="${()=>this._toggleValue(e.field,u.value)}">
                      <label class="fr-label" for="${c}">
                        ${u.value}${this._effectiveHideCounts?w:v`<span class="gouv-facets__count" aria-hidden="true">${u.count}</span><span class="fr-sr-only">, ${u.count} resultat${u.count>1?"s":""}</span>`}
                      </label>
                    </div>
                  </div>
                `})}
            </fieldset>
          </div>
        `:w}
      </div>
    `}},l(ht,"GouvFacets"),ht),U([m({type:String})],h.GouvFacets.prototype,"source",void 0),U([m({type:String})],h.GouvFacets.prototype,"fields",void 0),U([m({type:String})],h.GouvFacets.prototype,"labels",void 0),U([m({type:Number,attribute:"max-values"})],h.GouvFacets.prototype,"maxValues",void 0),U([m({type:String})],h.GouvFacets.prototype,"disjunctive",void 0),U([m({type:String})],h.GouvFacets.prototype,"sort",void 0),U([m({type:String})],h.GouvFacets.prototype,"searchable",void 0),U([m({type:Boolean,attribute:"hide-empty"})],h.GouvFacets.prototype,"hideEmpty",void 0),U([m({type:String})],h.GouvFacets.prototype,"display",void 0),U([m({type:Boolean,attribute:"url-params"})],h.GouvFacets.prototype,"urlParams",void 0),U([m({type:String,attribute:"url-param-map"})],h.GouvFacets.prototype,"urlParamMap",void 0),U([m({type:Boolean,attribute:"url-sync"})],h.GouvFacets.prototype,"urlSync",void 0),U([m({type:Boolean,attribute:"server-facets"})],h.GouvFacets.prototype,"serverFacets",void 0),U([m({type:String,attribute:"static-values"})],h.GouvFacets.prototype,"staticValues",void 0),U([m({type:Boolean,attribute:"hide-counts"})],h.GouvFacets.prototype,"hideCounts",void 0),U([m({type:String})],h.GouvFacets.prototype,"cols",void 0),U([$()],h.GouvFacets.prototype,"_rawData",void 0),U([$()],h.GouvFacets.prototype,"_facetGroups",void 0),U([$()],h.GouvFacets.prototype,"_activeSelections",void 0),U([$()],h.GouvFacets.prototype,"_expandedFacets",void 0),U([$()],h.GouvFacets.prototype,"_searchQueries",void 0),U([$()],h.GouvFacets.prototype,"_openMultiselectField",void 0),U([$()],h.GouvFacets.prototype,"_liveAnnouncement",void 0),h.GouvFacets=U([Q("gouv-facets")],h.GouvFacets);function Ut(s){return s?s.split(",").map(e=>e.trim()).filter(Boolean):[]}l(Ut,"_parseCSV");var J=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.GouvSearch=(pt=class extends x{constructor(){super(...arguments),this.source="",this.fields="",this.placeholder="Rechercher…",this.label="Rechercher",this.debounce=300,this.minLength=0,this.highlight=!1,this.operator="contains",this.srLabel=!1,this.count=!1,this.urlSearchParam="",this.urlSync=!1,this.serverSearch=!1,this.searchTemplate="",this._allData=[],this._filteredData=[],this._term="",this._resultCount=0,this._debounceTimer=null,this._unsubscribe=null,this._urlParamApplied=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),de("gouv-search"),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._debounceTimer!==null&&(clearTimeout(this._debounceTimer),this._debounceTimer=null),this._unsubscribe&&(this._unsubscribe(),this._unsubscribe=null),this.id&&xt(this.id)}updated(e){if(super.updated(e),e.has("source")){this._initialize();return}["fields","operator","minLength","highlight"].some(r=>e.has(r))&&this._allData.length>0&&this._applyFilter()}clear(){this._term="";const e=this.querySelector("input");e&&(e.value="",e.focus()),this._applyFilter()}search(e){this._term=e;const t=this.querySelector("input");t&&(t.value=e),this._applyFilter()}getData(){return this._filteredData}setData(e){this._allData=Array.isArray(e)?e:[],this._applyFilter()}_initialize(){var t;if(!this.id){console.warn('gouv-search: attribut "id" requis');return}if(!this.source){console.warn('gouv-search: attribut "source" requis');return}if(this._unsubscribe&&this._unsubscribe(),this.serverSearch&&!this.searchTemplate){const i=document.getElementById(this.source),r=(t=i==null?void 0:i.getAdapter)==null?void 0:t.call(i);r!=null&&r.getDefaultSearchTemplate&&(this.searchTemplate=r.getDefaultSearchTemplate()||"")}this.serverSearch&&this.urlSearchParam&&!this._urlParamApplied&&(this._applyUrlSearchParam(),this._urlParamApplied=!0,this._term&&this._applyServerSearch());const e=Ge(this.source);e!==void 0&&this._onData(e),this._unsubscribe=rt(this.source,{onLoaded:l(i=>{this._onData(i)},"onLoaded"),onLoading:l(()=>{Te(this.id)},"onLoading"),onError:l(i=>{Ae(this.id,i)},"onError")})}_onData(e){const t=Array.isArray(e)?e:[];if(this.serverSearch){this._allData=t,this._filteredData=t;const i=Ve(this.source);this._resultCount=i?i.total:t.length,this.id&&(i&&qe(this.id,i),oe(this.id,t)),this.urlSearchParam&&!this._urlParamApplied&&(this._applyUrlSearchParam(),this._urlParamApplied=!0,this._term&&this._applyServerSearch());return}this._allData=t,this.urlSearchParam&&!this._urlParamApplied&&(this._applyUrlSearchParam(),this._urlParamApplied=!0),this._applyFilter()}_applyUrlSearchParam(){if(!this.urlSearchParam)return;const t=new URLSearchParams(window.location.search).get(this.urlSearchParam);t&&(this._term=t)}_applyFilter(){if(this.serverSearch&&this.source){this._applyServerSearch();return}const e=this._term;if(!e||e.length<this.minLength)this._filteredData=[...this._allData];else{const t=this._getFields(),i=this.operator||"contains",r=this._normalize(e);this._filteredData=this._allData.filter(n=>this._matchRecord(n,r,t,i))}this.highlight&&e&&e.length>=this.minLength&&(this._filteredData=this._filteredData.map(t=>this._addHighlight(t,e))),this._resultCount=this._filteredData.length,this._dispatch()}_applyServerSearch(){const e=this._term;let t="";if(e&&e.length>=this.minLength){const i=e.replace(/"/g,'\\"');t=this.searchTemplate.replace(/\{q\}/g,i)}he(this.source,{where:t,whereKey:this.id}),this.urlSync&&this.urlSearchParam&&this._syncUrl(),document.dispatchEvent(new CustomEvent("gouv-search-change",{bubbles:!0,composed:!0,detail:{sourceId:this.id,term:this._term,count:this._resultCount}}))}_matchRecord(e,t,i,r){const n=i.length>0?i:Object.keys(e).filter(a=>!a.startsWith("_"));switch(r){case"starts":return n.some(a=>this._normalize(String(e[a]??"")).split(/\s+/).some(p=>p.startsWith(t)));case"words":return t.split(/\s+/).filter(Boolean).every(o=>n.some(p=>this._normalize(String(e[p]??"")).includes(o)));case"contains":default:return n.some(a=>this._normalize(String(e[a]??"")).includes(t))}}_normalize(e){return String(e).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}_getFields(){return this.fields?this.fields.split(",").map(e=>e.trim()).filter(Boolean):[]}_addHighlight(e,t){const i={...e},r=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),n=new RegExp("("+r+")","gi"),a=this._getFields(),o=a.length>0?a:Object.keys(e).filter(u=>typeof e[u]=="string"),p=[];return o.forEach(u=>{typeof e[u]=="string"&&p.push(e[u].replace(n,"<mark>$1</mark>"))}),i._highlight=p.join(" … "),i}_onInput(e){this._term=e,this._debounceTimer!==null&&clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this._debounceTimer=null,this._applyFilter()},this.debounce)}_onSubmit(){this._debounceTimer!==null&&(clearTimeout(this._debounceTimer),this._debounceTimer=null),this._applyFilter()}_dispatch(){this.id&&(oe(this.id,this._filteredData),this.urlSync&&this.urlSearchParam&&this._syncUrl(),document.dispatchEvent(new CustomEvent("gouv-search-change",{bubbles:!0,composed:!0,detail:{sourceId:this.id,term:this._term,count:this._filteredData.length}})))}_syncUrl(){const e=new URLSearchParams(window.location.search);this._term?e.set(this.urlSearchParam,this._term):e.delete(this.urlSearchParam);const t=e.toString(),i=t?`${window.location.pathname}?${t}${window.location.hash}`:`${window.location.pathname}${window.location.hash}`;window.history.replaceState(null,"",i)}render(){const e=this.id||"search",t=this.srLabel?"fr-label sr-only":"fr-label";return v`
      <div class="fr-search-bar" role="search" aria-label="${this.getAttribute("aria-label")||this.label}">
        <label class="${t}" for="gouv-search-${e}">${this.label}</label>
        <input class="fr-input"
          type="search"
          id="gouv-search-${e}"
          placeholder="${this.placeholder}"
          autocomplete="off"
          .value="${this._term}"
          @input="${i=>this._onInput(i.target.value)}"
          @search="${i=>{this._term=i.target.value,this._onSubmit()}}"
          @keydown="${i=>{i.key==="Enter"&&(i.preventDefault(),this._onSubmit()),i.key==="Escape"&&this.clear()}}">
        <button class="fr-btn" title="Rechercher" type="button"
          @click="${i=>{i.preventDefault(),this._onSubmit()}}">
          Rechercher
        </button>
      </div>
      ${this.count?v`
        <p class="fr-text--sm fr-mt-1v gouv-search-count" aria-live="polite" aria-atomic="true" role="status">
          ${this._resultCount} resultat${this._resultCount!==1?"s":""}
        </p>
      `:v`
        <p class="fr-sr-only" aria-live="polite" aria-atomic="true" role="status">
          ${this._resultCount} resultat${this._resultCount!==1?"s":""}
        </p>
      `}
    `}},l(pt,"GouvSearch"),pt),J([m({type:String})],h.GouvSearch.prototype,"source",void 0),J([m({type:String})],h.GouvSearch.prototype,"fields",void 0),J([m({type:String})],h.GouvSearch.prototype,"placeholder",void 0),J([m({type:String})],h.GouvSearch.prototype,"label",void 0),J([m({type:Number})],h.GouvSearch.prototype,"debounce",void 0),J([m({type:Number,attribute:"min-length"})],h.GouvSearch.prototype,"minLength",void 0),J([m({type:Boolean})],h.GouvSearch.prototype,"highlight",void 0),J([m({type:String})],h.GouvSearch.prototype,"operator",void 0),J([m({type:Boolean,attribute:"sr-label"})],h.GouvSearch.prototype,"srLabel",void 0),J([m({type:Boolean})],h.GouvSearch.prototype,"count",void 0),J([m({type:String,attribute:"url-search-param"})],h.GouvSearch.prototype,"urlSearchParam",void 0),J([m({type:Boolean,attribute:"url-sync"})],h.GouvSearch.prototype,"urlSync",void 0),J([m({type:Boolean,attribute:"server-search"})],h.GouvSearch.prototype,"serverSearch",void 0),J([m({type:String,attribute:"search-template"})],h.GouvSearch.prototype,"searchTemplate",void 0),J([$()],h.GouvSearch.prototype,"_allData",void 0),J([$()],h.GouvSearch.prototype,"_filteredData",void 0),J([$()],h.GouvSearch.prototype,"_term",void 0),J([$()],h.GouvSearch.prototype,"_resultCount",void 0),h.GouvSearch=J([Q("gouv-search")],h.GouvSearch);function He(s){const t=class t extends s{constructor(){super(...arguments),this._sourceLoading=!1,this._sourceData=null,this._sourceError=null,this._unsubscribeSource=null}onSourceData(r){}onSourceError(r){}connectedCallback(){super.connectedCallback(),this._subscribeToSource()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupSubscription()}updated(r){super.updated(r),r.has("source")&&this._subscribeToSource()}_subscribeToSource(){this._cleanupSubscription();const r=this.source;if(!r)return;const n=Ge(r);n!==void 0&&(this._sourceData=n,this.onSourceData(n)),this._unsubscribeSource=rt(r,{onLoaded:l(a=>{this._sourceData=a,this._sourceLoading=!1,this._sourceError=null,this.onSourceData(a),this.requestUpdate()},"onLoaded"),onLoading:l(()=>{this._sourceLoading=!0,this.requestUpdate()},"onLoading"),onError:l(a=>{this._sourceError=a,this._sourceLoading=!1,this.onSourceError(a),this.requestUpdate()},"onError")})}_cleanupSubscription(){this._unsubscribeSource&&(this._unsubscribeSource(),this._unsubscribeSource=null)}};l(t,"SourceSubscriberElement");let e=t;return e}l(He,"SourceSubscriberMixin");function br(s,e="nombre"){if(s==null||s==="")return"—";const t=typeof s=="string"?parseFloat(s):s;if(isNaN(t))return"—";switch(e){case"nombre":return yr(t);case"pourcentage":return is(t);case"euro":return rs(t);case"decimal":return Xa(t);default:return yr(t)}}l(br,"formatValue");function yr(s){return new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0}).format(Math.round(s))}l(yr,"formatNumber");function is(s){return new Intl.NumberFormat("fr-FR",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:1}).format(s/100)}l(is,"formatPercentage");function rs(s){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:0}).format(s)}l(rs,"formatCurrency");function Xa(s){return new Intl.NumberFormat("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:2}).format(s)}l(Xa,"formatDecimal");function eo(s){const e=typeof s=="string"?new Date(s):s;return isNaN(e.getTime())?"—":new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(e)}l(eo,"formatDate");function to(s,e,t){return e!==void 0&&s>=e?"vert":t!==void 0&&s>=t?"orange":e!==void 0||t!==void 0?"rouge":"bleu"}l(to,"getColorBySeuil");function ns(s){const e=s.split(":");if(e.length===1)return e[0]==="count"?{type:"count",field:""}:{type:"direct",field:e[0]};const t=e[0],i=e[1];if(e.length===3){let r=e[2];return r==="true"?r=!0:r==="false"?r=!1:isNaN(Number(r))||(r=Number(r)),{type:t,field:i,filterField:i,filterValue:r}}return{type:t,field:i}}l(ns,"parseExpression");function Sr(s,e){const t=ns(e);if(t.type==="direct"&&!Array.isArray(s))return s[t.field];if(!Array.isArray(s))return null;const i=s;switch(t.type){case"direct":case"first":return i.length>0?i[0][t.field]:null;case"last":return i.length>0?i[i.length-1][t.field]:null;case"count":return t.filterValue!==void 0?i.filter(n=>n[t.field]===t.filterValue).length:i.length;case"sum":return i.reduce((n,a)=>{const o=Number(a[t.field]);return n+(isNaN(o)?0:o)},0);case"avg":return i.length===0?null:i.reduce((n,a)=>{const o=Number(a[t.field]);return n+(isNaN(o)?0:o)},0)/i.length;case"min":return i.length===0?null:Math.min(...i.map(n=>Number(n[t.field])).filter(n=>!isNaN(n)));case"max":return i.length===0?null:Math.max(...i.map(n=>Number(n[t.field])).filter(n=>!isNaN(n)));default:return null}}l(Sr,"computeAggregation");var fe=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};const ss={vert:"gouv-kpi--success",orange:"gouv-kpi--warning",rouge:"gouv-kpi--error",bleu:"gouv-kpi--info"};h.GouvKpi=(ft=class extends He(x){constructor(){super(...arguments),this.source="",this.valeur="",this.label="",this.description="",this.icone="",this.format="nombre",this.tendance="",this.couleur=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),de("gouv-kpi")}_computeValue(){return!this._sourceData||!this.valeur?null:Sr(this._sourceData,this.valeur)}_getColor(){if(this.couleur)return this.couleur;const e=this._computeValue();return typeof e!="number"?"bleu":to(e,this.seuilVert,this.seuilOrange)}_getTendanceInfo(){if(!this.tendance||!this._sourceData)return null;const e=Sr(this._sourceData,this.tendance);return typeof e!="number"?null:{value:e,direction:e>0?"up":e<0?"down":"stable"}}_getAriaLabel(){if(this.description)return this.description;const e=this._computeValue(),t=br(e,this.format);let i=`${this.label}: ${t}`;if(typeof e=="number"&&(this.seuilVert!==void 0||this.seuilOrange!==void 0)){const r=this._getColor(),a={vert:"bon",orange:"attention",rouge:"critique",bleu:""}[r];a&&(i+=`, etat ${a}`)}return i}render(){const e=this._computeValue(),t=br(e,this.format),i=ss[this._getColor()]||ss.bleu,r=this._getTendanceInfo();return v`
      <div
        class="gouv-kpi ${i}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._sourceLoading?v`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        `:this._sourceError?v`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        `:v`
          <div class="gouv-kpi__content">
            ${this.icone?v`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            `:""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${t}</span>
              ${r?v`
                <span class="gouv-kpi__tendance gouv-kpi__tendance--${r.direction}" role="img" aria-label="${r.value>0?`en hausse de ${Math.abs(r.value).toFixed(1)}%`:r.value<0?`en baisse de ${Math.abs(r.value).toFixed(1)}%`:"stable"}">
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
    `}},l(ft,"GouvKpi"),ft),h.GouvKpi.styles=Bi``,fe([m({type:String})],h.GouvKpi.prototype,"source",void 0),fe([m({type:String})],h.GouvKpi.prototype,"valeur",void 0),fe([m({type:String})],h.GouvKpi.prototype,"label",void 0),fe([m({type:String})],h.GouvKpi.prototype,"description",void 0),fe([m({type:String})],h.GouvKpi.prototype,"icone",void 0),fe([m({type:String})],h.GouvKpi.prototype,"format",void 0),fe([m({type:String})],h.GouvKpi.prototype,"tendance",void 0),fe([m({type:Number,attribute:"seuil-vert"})],h.GouvKpi.prototype,"seuilVert",void 0),fe([m({type:Number,attribute:"seuil-orange"})],h.GouvKpi.prototype,"seuilOrange",void 0),fe([m({type:String})],h.GouvKpi.prototype,"couleur",void 0),fe([m({type:Number,reflect:!0})],h.GouvKpi.prototype,"col",void 0),h.GouvKpi=fe([Q("gouv-kpi")],h.GouvKpi);var wr=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.GouvKpiGroup=(gt=class extends x{constructor(){super(...arguments),this.cols=3,this.gap="md"}connectedCallback(){super.connectedCallback(),de("gouv-kpi-group"),this.hasAttribute("role")||this.setAttribute("role","group")}updated(e){if(super.updated(e),e.has("cols")){const t=Math.max(1,Math.min(12,this.cols)),i=Math.max(1,Math.floor(12/t));this.style.setProperty("--_kpi-default-span",String(i))}}render(){const e=Math.max(1,Math.floor(12/Math.max(1,Math.min(12,this.cols))));return v`
      <style>
        ::slotted(*:not([col])) {
          grid-column: span ${e};
        }
      </style>
      <slot></slot>
    `}},l(gt,"GouvKpiGroup"),gt),h.GouvKpiGroup.styles=Bi`
    :host {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--gouv-kpi-group-gap, 1rem);
    }

    :host([gap="sm"]) { --gouv-kpi-group-gap: 0.5rem; }
    :host([gap="md"]) { --gouv-kpi-group-gap: 1rem; }
    :host([gap="lg"]) { --gouv-kpi-group-gap: 1.5rem; }

    /* Per-KPI col overrides (1-12) */
    ::slotted([col="1"])  { grid-column: span 1; }
    ::slotted([col="2"])  { grid-column: span 2; }
    ::slotted([col="3"])  { grid-column: span 3; }
    ::slotted([col="4"])  { grid-column: span 4; }
    ::slotted([col="5"])  { grid-column: span 5; }
    ::slotted([col="6"])  { grid-column: span 6; }
    ::slotted([col="7"])  { grid-column: span 7; }
    ::slotted([col="8"])  { grid-column: span 8; }
    ::slotted([col="9"])  { grid-column: span 9; }
    ::slotted([col="10"]) { grid-column: span 10; }
    ::slotted([col="11"]) { grid-column: span 11; }
    ::slotted([col="12"]) { grid-column: span 12; }

    /* Responsive: stack on mobile */
    @media (max-width: 767px) {
      :host {
        grid-template-columns: 1fr;
      }
      ::slotted(*) {
        grid-column: span 1 !important;
      }
    }
  `,wr([m({type:Number})],h.GouvKpiGroup.prototype,"cols",void 0),wr([m({type:String})],h.GouvKpiGroup.prototype,"gap",void 0),h.GouvKpiGroup=wr([Q("gouv-kpi-group")],h.GouvKpiGroup);var Z=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.GouvDatalist=(mt=class extends He(x){constructor(){super(...arguments),this.source="",this.colonnes="",this.recherche=!1,this.filtres="",this.tri="",this.pagination=0,this.export="",this.urlSync=!1,this.urlPageParam="page",this.serverTri=!1,this._data=[],this._searchQuery="",this._activeFilters={},this._sort=null,this._currentPage=1,this._serverPagination=!1,this._serverTotal=0,this._serverPageSize=0,this._previousPage=1,this._popstateHandler=null,this._liveAnnouncement=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),de("gouv-datalist"),this._initSort(),this.urlSync&&(this._applyUrlPage(),this._popstateHandler=()=>{this._applyUrlPage(),this.requestUpdate()},window.addEventListener("popstate",this._popstateHandler))}disconnectedCallback(){super.disconnectedCallback(),this._popstateHandler&&(window.removeEventListener("popstate",this._popstateHandler),this._popstateHandler=null)}updated(e){super.updated(e),e.has("tri")&&this._initSort()}onSourceError(e){this._serverPagination&&this._data.length>0&&(this._currentPage=this._previousPage)}onSourceData(e){this._data=Array.isArray(e)?e:[];const t=this.source?Ve(this.source):void 0;t&&t.total>0?(this._serverPagination=!0,this._serverTotal=t.total,this._serverPageSize=t.pageSize,this._currentPage=t.page):(this._serverPagination=!1,this._currentPage=1)}parseColumns(){return this.colonnes?this.colonnes.split(",").map(e=>{const[t,i]=e.trim().split(":");return{key:t.trim(),label:(i==null?void 0:i.trim())||t.trim()}}):[]}_getFilterableColumns(){return this.filtres?this.filtres.split(",").map(e=>e.trim()):[]}_initSort(){if(this.tri){const[e,t]=this.tri.split(":");this._sort={key:e,direction:t||"asc"}}}_getUniqueValues(e){const t=new Set;return this._data.forEach(i=>{const r=i[e];r!=null&&t.add(String(r))}),Array.from(t).sort()}getFilteredData(){let e=[...this._data];if(this._searchQuery){const t=this._searchQuery.toLowerCase();e=e.filter(i=>Object.values(i).some(r=>String(r).toLowerCase().includes(t)))}if(Object.entries(this._activeFilters).forEach(([t,i])=>{i&&(e=e.filter(r=>String(r[t])===i))}),this._sort&&!this.serverTri){const{key:t,direction:i}=this._sort;e.sort((r,n)=>{const a=r[t],o=n[t];if(a===o)return 0;if(a==null)return 1;if(o==null)return-1;const p=typeof a=="number"&&typeof o=="number"?a-o:String(a).localeCompare(String(o),"fr");return i==="desc"?-p:p})}return e}_getPaginatedData(){const e=this.getFilteredData();if(this._serverPagination||!this.pagination||this.pagination<=0)return e;const t=(this._currentPage-1)*this.pagination;return e.slice(t,t+this.pagination)}_getTotalPages(){return this._serverPagination?Math.ceil(this._serverTotal/this._serverPageSize):!this.pagination||this.pagination<=0?1:Math.ceil(this.getFilteredData().length/this.pagination)}_applyUrlPage(){const t=new URLSearchParams(window.location.search).get(this.urlPageParam);if(t){const i=parseInt(t,10);!isNaN(i)&&i>=1&&(this._currentPage=i,this.source&&he(this.source,{page:i}))}}_syncPageUrl(){const e=new URLSearchParams(window.location.search);this._currentPage>1?e.set(this.urlPageParam,String(this._currentPage)):e.delete(this.urlPageParam);const t=e.toString(),i=t?`${window.location.pathname}?${t}${window.location.hash}`:`${window.location.pathname}${window.location.hash}`;window.history.replaceState(null,"",i)}_handleSearch(e){this._searchQuery=e.target.value,this._currentPage=1,this.urlSync&&this._syncPageUrl()}_handleFilter(e,t){this._activeFilters={...this._activeFilters,[e]:t.target.value},this._currentPage=1,this.urlSync&&this._syncPageUrl()}_announce(e){this._liveAnnouncement="",requestAnimationFrame(()=>{this._liveAnnouncement=e})}_handleSort(e){var r,n;const i=((r=this.parseColumns().find(a=>a.key===e))==null?void 0:r.label)??e;((n=this._sort)==null?void 0:n.key)===e?this._sort={key:e,direction:this._sort.direction==="asc"?"desc":"asc"}:this._sort={key:e,direction:"asc"},this._announce(`Tri par ${i}, ordre ${this._sort.direction==="asc"?"croissant":"decroissant"}`),this.serverTri&&this.source&&he(this.source,{orderBy:`${this._sort.key}:${this._sort.direction}`})}_handlePageChange(e){this._previousPage=this._currentPage,this._currentPage=e;const t=this._getTotalPages();this._announce(`Page ${e} sur ${t}`),this._serverPagination&&this.source&&he(this.source,{page:e}),this.urlSync&&this._syncPageUrl()}_exportCsv(){const e=this.parseColumns(),t=this.getFilteredData(),i=e.map(u=>u.label).join(";"),r=t.map(u=>e.map(c=>{const d=String(u[c.key]??"");return d.includes(";")||d.includes('"')?`"${d.replace(/"/g,'""')}"`:d}).join(";")),n=[i,...r].join(`
`),a=new Blob([n],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(a),p=document.createElement("a");p.href=o,p.download="export.csv",p.click(),URL.revokeObjectURL(o)}_exportHtml(){const e=this.parseColumns(),t=this.getFilteredData(),i=e.map(u=>`<th>${rr(u.label)}</th>`).join(""),r=t.map(u=>`<tr>${e.map(d=>{const f=u[d.key];return`<td>${f==null?"":rr(String(f))}</td>`}).join("")}</tr>`).join(`
`),n=`<!DOCTYPE html>
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
</html>`,a=new Blob([n],{type:"text/html;charset=utf-8;"}),o=URL.createObjectURL(a),p=document.createElement("a");p.href=o,p.download="export.html",p.click(),URL.revokeObjectURL(o)}formatCellValue(e){return e==null?"—":typeof e=="boolean"?e?"Oui":"Non":String(e)}_renderFilters(e,t){return t.length===0?"":v`
      <div class="gouv-datalist__filters">
        ${t.map(i=>{const r=e.find(o=>o.key===i),n=(r==null?void 0:r.label)||i,a=this._getUniqueValues(i);return v`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${i}">${n}</label>
              <select
                class="fr-select"
                id="filter-${i}"
                @change="${o=>this._handleFilter(i,o)}"
              >
                <option value="">Tous</option>
                ${a.map(o=>v`
                  <option value="${o}" ?selected="${this._activeFilters[i]===o}">${o}</option>
                `)}
              </select>
            </div>
          `})}
      </div>
    `}_renderToolbar(){var t,i,r,n;const e=((t=this.export)==null?void 0:t.includes("csv"))||((i=this.export)==null?void 0:i.includes("html"));return!this.recherche&&!e?"":v`
      <div class="gouv-datalist__toolbar">
        ${this.recherche?v`
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
        `:v`<div></div>`}

        <div class="gouv-datalist__export-buttons">
          ${(r=this.export)!=null&&r.includes("csv")?v`
            <button
              class="fr-btn fr-btn--secondary fr-btn--sm"
              @click="${this._exportCsv}"
              type="button"
            >
              <span class="fr-icon-download-line fr-icon--sm" aria-hidden="true"></span>
              Exporter CSV
            </button>
          `:""}

          ${(n=this.export)!=null&&n.includes("html")?v`
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
    `}_renderTable(e,t){return v`
      <div class="fr-table fr-table--bordered">
        <table>
          <caption class="fr-sr-only">Liste des données</caption>
          <thead>
            <tr>
              ${e.map(i=>{var p;const r=((p=this._sort)==null?void 0:p.key)===i.key,n=r?this._sort.direction:null,a=n==="asc"?"ascending":n==="desc"?"descending":"none",o=r?`Trier par ${i.label}, actuellement tri ${n==="asc"?"croissant":"decroissant"}`:`Trier par ${i.label}`;return v`
                <th scope="col" aria-sort="${a}">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${()=>this._handleSort(i.key)}"
                    aria-label="${o}"
                    type="button"
                  >
                    ${i.label}
                    ${r?v`
                      <span aria-hidden="true">${n==="asc"?"↑":"↓"}</span>
                    `:""}
                  </button>
                </th>
              `})}
            </tr>
          </thead>
          <tbody>
            ${t.length===0?v`
              <tr>
                <td colspan="${e.length}" class="gouv-datalist__empty" role="status">
                  Aucune donnée à afficher
                </td>
              </tr>
            `:t.map(i=>v`
              <tr>
                ${e.map(r=>v`
                  <td>${this.formatCellValue(i[r.key])}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `}_renderPagination(e){if(this.pagination<=0||e<=1)return"";const t=[];for(let i=Math.max(1,this._currentPage-2);i<=Math.min(e,this._currentPage+2);i++)t.push(i);return v`
      <nav class="fr-pagination" aria-label="${this.getAttribute("aria-label")?"Pagination - "+this.getAttribute("aria-label"):"Pagination"}">
        <ul class="fr-pagination__list">
          <li>
            <button class="fr-pagination__link fr-pagination__link--first"
              ?disabled="${this._currentPage===1}"
              @click="${()=>this._handlePageChange(1)}"
              aria-label="Premi\u00e8re page" type="button">Premi\u00e8re page</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--prev"
              ?disabled="${this._currentPage===1}"
              @click="${()=>this._handlePageChange(this._currentPage-1)}"
              aria-label="Page pr\u00e9c\u00e9dente" type="button">Page pr\u00e9c\u00e9dente</button>
          </li>
          ${t.map(i=>v`
            <li>
              <button
                class="fr-pagination__link ${i===this._currentPage?"fr-pagination__link--active":""}"
                @click="${()=>this._handlePageChange(i)}"
                aria-current="${i===this._currentPage?"page":w}"
                aria-label="Page ${i} sur ${e}"
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
              aria-label="Derni\u00e8re page" type="button">Derni\u00e8re page</button>
          </li>
        </ul>
      </nav>
    `}render(){const e=this.parseColumns(),t=this._getFilterableColumns(),i=this._getPaginatedData(),r=this._getTotalPages(),n=this._serverPagination?this._serverTotal:this.getFilteredData().length;return v`
      <div class="gouv-datalist" role="region" aria-label="${this.getAttribute("aria-label")||"Liste de donnees"}">
        ${this._renderFilters(e,t)}
        ${this._renderToolbar()}

        <div aria-live="polite" aria-atomic="true" class="fr-sr-only">${this._liveAnnouncement}</div>
        ${this._sourceLoading?v`
          <div class="gouv-datalist__loading" aria-live="polite" aria-busy="true">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement des données...
          </div>
        `:this._sourceError&&!(this._serverPagination&&this._data.length>0)?v`
          <div class="gouv-datalist__error" aria-live="assertive" role="alert">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur: ${this._sourceError.message}
          </div>
        `:v`
          <p class="fr-text--sm" aria-live="polite" aria-atomic="true" role="status">
            ${n} résultat${n>1?"s":""}
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
    `}},l(mt,"GouvDatalist"),mt),h.GouvDatalist.styles=Bi``,Z([m({type:String})],h.GouvDatalist.prototype,"source",void 0),Z([m({type:String})],h.GouvDatalist.prototype,"colonnes",void 0),Z([m({type:Boolean})],h.GouvDatalist.prototype,"recherche",void 0),Z([m({type:String})],h.GouvDatalist.prototype,"filtres",void 0),Z([m({type:String})],h.GouvDatalist.prototype,"tri",void 0),Z([m({type:Number})],h.GouvDatalist.prototype,"pagination",void 0),Z([m({type:String})],h.GouvDatalist.prototype,"export",void 0),Z([m({type:Boolean,attribute:"url-sync"})],h.GouvDatalist.prototype,"urlSync",void 0),Z([m({type:String,attribute:"url-page-param"})],h.GouvDatalist.prototype,"urlPageParam",void 0),Z([m({type:Boolean,attribute:"server-tri"})],h.GouvDatalist.prototype,"serverTri",void 0),Z([$()],h.GouvDatalist.prototype,"_data",void 0),Z([$()],h.GouvDatalist.prototype,"_searchQuery",void 0),Z([$()],h.GouvDatalist.prototype,"_activeFilters",void 0),Z([$()],h.GouvDatalist.prototype,"_sort",void 0),Z([$()],h.GouvDatalist.prototype,"_currentPage",void 0),Z([$()],h.GouvDatalist.prototype,"_serverPagination",void 0),Z([$()],h.GouvDatalist.prototype,"_liveAnnouncement",void 0),h.GouvDatalist=Z([Q("gouv-datalist")],h.GouvDatalist);var le=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.GouvDisplay=(_t=class extends He(x){constructor(){super(...arguments),this.source="",this.cols=1,this.pagination=0,this.empty="Aucun resultat",this.gap="fr-grid-row--gutters",this.uidField="",this.urlSync=!1,this.urlPageParam="page",this._data=[],this._currentPage=1,this._serverPagination=!1,this._serverTotal=0,this._serverPageSize=0,this._templateContent="",this._hashScrollDone=!1,this._popstateHandler=null,this._liveAnnouncement=""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),de("gouv-display"),this._captureTemplate(),this.urlSync&&(this._applyUrlPage(),this._popstateHandler=()=>{this._applyUrlPage(),this.requestUpdate()},window.addEventListener("popstate",this._popstateHandler))}disconnectedCallback(){super.disconnectedCallback(),this._popstateHandler&&(window.removeEventListener("popstate",this._popstateHandler),this._popstateHandler=null)}onSourceData(e){this._data=Array.isArray(e)?e:[],this._hashScrollDone=!1;const t=this.source?Ve(this.source):void 0;t&&t.total>0?(this._serverPagination=!0,this._serverTotal=t.total,this._serverPageSize=t.pageSize,this._currentPage=t.page):(this._serverPagination=!1,this._currentPage=1)}updated(e){if(super.updated(e),!this._hashScrollDone&&this._data.length>0&&window.location.hash){this._hashScrollDone=!0;const t=window.location.hash.substring(1);requestAnimationFrame(()=>{const i=this.querySelector(`#${CSS.escape(t)}`);i&&i.scrollIntoView({behavior:"smooth",block:"center"})})}}_captureTemplate(){const e=this.querySelector("template");e&&(this._templateContent=e.innerHTML)}_renderItem(e,t){if(!this._templateContent)return"";let i=this._templateContent;return i=i.replace(/\{\{\{([^}]+)\}\}\}/g,(r,n)=>this._resolveExpression(e,n.trim(),t)),i=i.replace(/\{\{([^}]+)\}\}/g,(r,n)=>{const a=this._resolveExpression(e,n.trim(),t);return rr(a)}),i}_resolveExpression(e,t,i){if(t==="$index")return String(i);if(t==="$uid")return this._getItemUid(e,i);let r=t,n="";const a=t.indexOf("|");a!==-1&&(r=t.substring(0,a).trim(),n=t.substring(a+1).trim());let o="";const p=r.indexOf(":");p!==-1&&(o=r.substring(p+1).trim(),r=r.substring(0,p).trim());const u=q(e,r);return u==null?n:o?this._formatValue(u,o):String(u)}_formatValue(e,t){if(t==="number"){const i=typeof e=="number"?e:parseFloat(String(e));if(!isNaN(i))return i.toLocaleString("fr-FR")}return String(e)}_getPaginatedData(){if(this._serverPagination)return this._data;if(!this.pagination||this.pagination<=0)return this._data;const e=(this._currentPage-1)*this.pagination;return this._data.slice(e,e+this.pagination)}_getTotalPages(){return this._serverPagination?Math.ceil(this._serverTotal/this._serverPageSize):!this.pagination||this.pagination<=0?1:Math.ceil(this._data.length/this.pagination)}_applyUrlPage(){const t=new URLSearchParams(window.location.search).get(this.urlPageParam);if(t){const i=parseInt(t,10);!isNaN(i)&&i>=1&&(this._currentPage=i,this.source&&he(this.source,{page:i}))}}_syncPageUrl(){const e=new URLSearchParams(window.location.search);this._currentPage>1?e.set(this.urlPageParam,String(this._currentPage)):e.delete(this.urlPageParam);const t=e.toString(),i=t?`${window.location.pathname}?${t}${window.location.hash}`:`${window.location.pathname}${window.location.hash}`;window.history.replaceState(null,"",i)}_announce(e){this._liveAnnouncement="",requestAnimationFrame(()=>{this._liveAnnouncement=e})}_handlePageChange(e){this._currentPage=e;const t=this._getTotalPages();this._announce(`Page ${e} sur ${t}`),this._serverPagination&&this.source&&he(this.source,{page:e}),this.urlSync&&this._syncPageUrl()}_getColClass(){const e=Math.max(1,Math.min(6,this.cols));return`fr-col-12 fr-col-md-${Math.floor(12/e)}`}_getItemUid(e,t){if(this.uidField){const i=q(e,this.uidField);if(i!=null&&i!=="")return`item-${String(i).replace(/[^a-zA-Z0-9_-]/g,"_")}`}return`item-${t}`}_renderGrid(e){const t=this._getColClass(),i=this.pagination>0?(this._currentPage-1)*this.pagination:0,r=e.map((a,o)=>{const p=i+o,u=this._renderItem(a,p),c=this._getItemUid(a,p);return`<div class="${t}" id="${c}">${u}</div>`}).join(""),n=`<div class="fr-grid-row ${this.gap}">${r}</div>`;return v`<div .innerHTML="${n}"></div>`}_renderPagination(e){if(this.pagination<=0||e<=1)return"";const t=[];for(let i=Math.max(1,this._currentPage-2);i<=Math.min(e,this._currentPage+2);i++)t.push(i);return v`
      <nav class="fr-pagination fr-mt-2w" aria-label="${this.getAttribute("aria-label")?"Pagination - "+this.getAttribute("aria-label"):"Pagination"}">
        <ul class="fr-pagination__list">
          <li>
            <button class="fr-pagination__link fr-pagination__link--first"
              ?disabled="${this._currentPage===1}"
              @click="${()=>this._handlePageChange(1)}"
              aria-label="Premi\u00e8re page" type="button">Premi\u00e8re page</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--prev"
              ?disabled="${this._currentPage===1}"
              @click="${()=>this._handlePageChange(this._currentPage-1)}"
              aria-label="Page pr\u00e9c\u00e9dente" type="button">Page pr\u00e9c\u00e9dente</button>
          </li>
          ${t.map(i=>v`
            <li>
              <button
                class="fr-pagination__link ${i===this._currentPage?"fr-pagination__link--active":""}"
                @click="${()=>this._handlePageChange(i)}"
                aria-current="${i===this._currentPage?"page":w}"
                aria-label="Page ${i} sur ${e}"
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
              aria-label="Derni\u00e8re page" type="button">Derni\u00e8re page</button>
          </li>
        </ul>
      </nav>
    `}render(){this._templateContent||this._captureTemplate();const e=this._getPaginatedData(),t=this._getTotalPages(),i=this._serverPagination?this._serverTotal:this._data.length;return v`
      <div class="gouv-display" role="region" aria-label="${this.getAttribute("aria-label")||"Liste de resultats"}">
        <div aria-live="polite" aria-atomic="true" class="fr-sr-only">${this._liveAnnouncement}</div>
        ${this._sourceLoading?v`
          <div class="gouv-display__loading" aria-live="polite" aria-busy="true">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        `:this._sourceError?v`
          <div class="gouv-display__error" aria-live="assertive" role="alert">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        `:i===0?v`
          <div class="gouv-display__empty" aria-live="polite" role="status">
            ${this.empty}
          </div>
        `:v`
          <p class="fr-text--sm fr-mb-1w" aria-live="polite" aria-atomic="true" role="status">
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
    `}},l(_t,"GouvDisplay"),_t),le([m({type:String})],h.GouvDisplay.prototype,"source",void 0),le([m({type:Number})],h.GouvDisplay.prototype,"cols",void 0),le([m({type:Number})],h.GouvDisplay.prototype,"pagination",void 0),le([m({type:String})],h.GouvDisplay.prototype,"empty",void 0),le([m({type:String})],h.GouvDisplay.prototype,"gap",void 0),le([m({type:String,attribute:"uid-field"})],h.GouvDisplay.prototype,"uidField",void 0),le([m({type:Boolean,attribute:"url-sync"})],h.GouvDisplay.prototype,"urlSync",void 0),le([m({type:String,attribute:"url-page-param"})],h.GouvDisplay.prototype,"urlPageParam",void 0),le([$()],h.GouvDisplay.prototype,"_data",void 0),le([$()],h.GouvDisplay.prototype,"_currentPage",void 0),le([$()],h.GouvDisplay.prototype,"_serverPagination",void 0),le([$()],h.GouvDisplay.prototype,"_liveAnnouncement",void 0),h.GouvDisplay=le([Q("gouv-display")],h.GouvDisplay);var V=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};const io={line:"line-chart",bar:"bar-chart",pie:"pie-chart",radar:"radar-chart",scatter:"scatter-chart",gauge:"gauge-chart","bar-line":"bar-line-chart",map:"map-chart","map-reg":"map-chart-reg"};h.GouvDsfrChart=(vt=class extends He(x){constructor(){super(...arguments),this.source="",this.type="bar",this.labelField="",this.codeField="",this.valueField="",this.valueField2="",this.name="",this.selectedPalette="categorical",this.unitTooltip="",this.unitTooltipBar="",this.horizontal=!1,this.stacked=!1,this.fill=!1,this.highlightIndex="",this.xMin="",this.xMax="",this.yMin="",this.yMax="",this.gaugeValue=null,this.mapHighlight="",this._data=[]}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),de("gouv-dsfr-chart",this.type)}onSourceData(e){this._data=Array.isArray(e)?e:[]}_processData(){if(!this._data||this._data.length===0)return{x:"[[]]",y:"[[]]",labels:[],values:[],values2:[]};const e=[],t=[],i=[];for(const r of this._data)e.push(String(q(r,this.labelField)??"N/A")),t.push(Number(q(r,this.valueField))||0),this.valueField2&&i.push(Number(q(r,this.valueField2))||0);return{x:JSON.stringify([e]),y:JSON.stringify([t]),y2:this.valueField2?JSON.stringify([i]):void 0,yMulti:this.valueField2?JSON.stringify([t,i]):void 0,labels:e,values:t,values2:i}}_processMapData(){if(!this._data||this._data.length===0)return"{}";const e=this.codeField||this.labelField,t={};for(const i of this._data){let r=String(q(i,e)??"").trim();/^\d+$/.test(r)&&r.length<3&&(r=r.padStart(2,"0"));const n=Number(q(i,this.valueField))||0;(this.type==="map"?Da(r):r!=="")&&(t[r]=Math.round(n*100)/100)}return JSON.stringify(t)}_getCommonAttributes(){const e={};if(this.selectedPalette&&(e["selected-palette"]=this.selectedPalette),this.unitTooltip&&(e["unit-tooltip"]=this.unitTooltip),this.xMin&&(e["x-min"]=this.xMin),this.xMax&&(e["x-max"]=this.xMax),this.yMin&&(e["y-min"]=this.yMin),this.yMax&&(e["y-max"]=this.yMax),this.name){const t=this.name.trim(),i=this.type==="map"||this.type==="map-reg";e.name=i||t.startsWith("[")?t:JSON.stringify([t])}else if(this.valueField)if(this.type==="map"||this.type==="map-reg")e.name=this.valueField;else{const i=this.valueField2?[this.valueField,this.valueField2]:[this.valueField];e.name=JSON.stringify(i)}return e}_getTypeSpecificAttributes(){const{x:e,y:t,yMulti:i,labels:r,values:n,values2:a}=this._processData(),o={},p={};switch(this.type){case"gauge":{const u=this.gaugeValue??(this._data.length>0&&Number(q(this._data[0],this.valueField))||0);o.percent=String(Math.round(u)),o.init="0",o.target="100";break}case"pie":o.x=e,o.y=t,!this.name&&r.length>0&&(o.name=JSON.stringify(r));break;case"bar-line":{if(o.x=JSON.stringify(r),o["y-bar"]=JSON.stringify(n),o["y-line"]=JSON.stringify(a.length?a:n),this.name)try{const u=this.name.trim(),c=u.startsWith("[")?JSON.parse(u):[u];c[0]&&(o["name-bar"]=c[0]),c[1]&&(o["name-line"]=c[1])}catch{}this.unitTooltipBar&&(o["unit-tooltip-bar"]=this.unitTooltipBar),this.unitTooltip&&(o["unit-tooltip-line"]=this.unitTooltip);break}case"map":case"map-reg":{if(o.data=this._processMapData(),this._data.length>0){let u=0,c=0;for(const d of this._data){const f=Number(q(d,this.valueField));isNaN(f)||(u+=f,c++)}if(c>0){const d=Math.round(u/c*100)/100;p.value=String(d)}}p.date=new Date().toISOString().split("T")[0];break}default:o.x=e,o.y=i||t;break}return this.type==="bar"&&(this.horizontal&&(o.horizontal="true"),this.stacked&&(o.stacked="true"),this.highlightIndex&&(o["highlight-index"]=this.highlightIndex)),this.type==="pie"&&this.fill&&(o.fill="true"),(this.type==="map"||this.type==="map-reg")&&this.mapHighlight&&(o.highlight=this.mapHighlight),{attrs:o,deferred:p}}_getAriaLabel(){const t={bar:"barres",line:"lignes",pie:"camembert",radar:"radar",gauge:"jauge",scatter:"nuage de points","bar-line":"barres et lignes",map:"carte departements","map-reg":"carte regions"}[this.type]||this.type,i=this._data.length;return`Graphique ${t}, ${i} valeurs`}_createChartElement(e,t,i={}){const r=document.createElement(e);for(const[a,o]of Object.entries(t))o!==void 0&&o!==""&&r.setAttribute(a,o);Object.keys(i).length>0&&setTimeout(()=>{for(const[a,o]of Object.entries(i))r.setAttribute(a,o)},500);const n=document.createElement("div");return n.className="gouv-dsfr-chart__wrapper",n.setAttribute("role","img"),n.setAttribute("aria-label",this._getAriaLabel()),n.appendChild(r),n}_renderChart(){const e=io[this.type];if(!e)return v`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;const{attrs:t,deferred:i}=this._getTypeSpecificAttributes(),r={...this._getCommonAttributes(),...t};this.type==="bar-line"&&(delete r.name,delete r["unit-tooltip"]);const n=this._createChartElement(e,r,i),a=this.querySelector(".gouv-dsfr-chart__wrapper");return a&&a.remove(),v`${n}`}render(){return this._sourceLoading?v`
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
      `:this._sourceError?v`
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
      `:!this._data||this._data.length===0?v`
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
      `:this._renderChart()}},l(vt,"GouvDsfrChart"),vt),V([m({type:String})],h.GouvDsfrChart.prototype,"source",void 0),V([m({type:String})],h.GouvDsfrChart.prototype,"type",void 0),V([m({type:String,attribute:"label-field"})],h.GouvDsfrChart.prototype,"labelField",void 0),V([m({type:String,attribute:"code-field"})],h.GouvDsfrChart.prototype,"codeField",void 0),V([m({type:String,attribute:"value-field"})],h.GouvDsfrChart.prototype,"valueField",void 0),V([m({type:String,attribute:"value-field-2"})],h.GouvDsfrChart.prototype,"valueField2",void 0),V([m({type:String})],h.GouvDsfrChart.prototype,"name",void 0),V([m({type:String,attribute:"selected-palette"})],h.GouvDsfrChart.prototype,"selectedPalette",void 0),V([m({type:String,attribute:"unit-tooltip"})],h.GouvDsfrChart.prototype,"unitTooltip",void 0),V([m({type:String,attribute:"unit-tooltip-bar"})],h.GouvDsfrChart.prototype,"unitTooltipBar",void 0),V([m({type:Boolean})],h.GouvDsfrChart.prototype,"horizontal",void 0),V([m({type:Boolean})],h.GouvDsfrChart.prototype,"stacked",void 0),V([m({type:Boolean})],h.GouvDsfrChart.prototype,"fill",void 0),V([m({type:String,attribute:"highlight-index"})],h.GouvDsfrChart.prototype,"highlightIndex",void 0),V([m({type:String,attribute:"x-min"})],h.GouvDsfrChart.prototype,"xMin",void 0),V([m({type:String,attribute:"x-max"})],h.GouvDsfrChart.prototype,"xMax",void 0),V([m({type:String,attribute:"y-min"})],h.GouvDsfrChart.prototype,"yMin",void 0),V([m({type:String,attribute:"y-max"})],h.GouvDsfrChart.prototype,"yMax",void 0),V([m({type:Number,attribute:"gauge-value"})],h.GouvDsfrChart.prototype,"gaugeValue",void 0),V([m({type:String,attribute:"map-highlight"})],h.GouvDsfrChart.prototype,"mapHighlight",void 0),V([$()],h.GouvDsfrChart.prototype,"_data",void 0),h.GouvDsfrChart=V([Q("gouv-dsfr-chart")],h.GouvDsfrChart);const ln=class ln{constructor(){this._partials=new Float64Array(32),this._n=0}add(e){const t=this._partials;let i=0;for(let r=0;r<this._n&&r<32;r++){const n=t[r],a=e+n,o=Math.abs(e)<Math.abs(n)?e-(a-n):n-(a-e);o&&(t[i++]=o),e=a}return t[i]=e,this._n=i+1,this}valueOf(){const e=this._partials;let t=this._n,i,r,n,a=0;if(t>0){for(a=e[--t];t>0&&(i=a,r=e[--t],a=i+r,n=r-(a-i),!n););t>0&&(n<0&&e[t-1]<0||n>0&&e[t-1]>0)&&(r=n*2,i=a+r,r==i-a&&(a=i))}return a}};l(ln,"Adder");let Re=ln;function*ro(s){for(const e of s)yield*e}l(ro,"flatten");function as(s){return Array.from(ro(s))}l(as,"merge");var O=1e-6,N=Math.PI,ge=N/2,os=N/4,me=N*2,ke=180/N,ce=N/180,z=Math.abs,no=Math.atan,zt=Math.atan2,H=Math.cos,W=Math.sin,so=Math.sign||function(s){return s>0?1:s<0?-1:0},We=Math.sqrt;function ao(s){return s>1?0:s<-1?N:Math.acos(s)}l(ao,"acos");function jt(s){return s>1?ge:s<-1?-ge:Math.asin(s)}l(jt,"asin");function _e(){}l(_e,"noop");function gi(s,e){s&&cs.hasOwnProperty(s.type)&&cs[s.type](s,e)}l(gi,"streamGeometry");var ls={Feature:l(function(s,e){gi(s.geometry,e)},"Feature"),FeatureCollection:l(function(s,e){for(var t=s.features,i=-1,r=t.length;++i<r;)gi(t[i].geometry,e)},"FeatureCollection")},cs={Sphere:l(function(s,e){e.sphere()},"Sphere"),Point:l(function(s,e){s=s.coordinates,e.point(s[0],s[1],s[2])},"Point"),MultiPoint:l(function(s,e){for(var t=s.coordinates,i=-1,r=t.length;++i<r;)s=t[i],e.point(s[0],s[1],s[2])},"MultiPoint"),LineString:l(function(s,e){$r(s.coordinates,e,0)},"LineString"),MultiLineString:l(function(s,e){for(var t=s.coordinates,i=-1,r=t.length;++i<r;)$r(t[i],e,0)},"MultiLineString"),Polygon:l(function(s,e){us(s.coordinates,e)},"Polygon"),MultiPolygon:l(function(s,e){for(var t=s.coordinates,i=-1,r=t.length;++i<r;)us(t[i],e)},"MultiPolygon"),GeometryCollection:l(function(s,e){for(var t=s.geometries,i=-1,r=t.length;++i<r;)gi(t[i],e)},"GeometryCollection")};function $r(s,e,t){var i=-1,r=s.length-t,n;for(e.lineStart();++i<r;)n=s[i],e.point(n[0],n[1],n[2]);e.lineEnd()}l($r,"streamLine");function us(s,e){var t=-1,i=s.length;for(e.polygonStart();++t<i;)$r(s[t],e,1);e.polygonEnd()}l(us,"streamPolygon");function nt(s,e){s&&ls.hasOwnProperty(s.type)?ls[s.type](s,e):gi(s,e)}l(nt,"geoStream");function Ar(s){return[zt(s[1],s[0]),jt(s[2])]}l(Ar,"spherical");function st(s){var e=s[0],t=s[1],i=H(t);return[i*H(e),i*W(e),W(t)]}l(st,"cartesian");function mi(s,e){return s[0]*e[0]+s[1]*e[1]+s[2]*e[2]}l(mi,"cartesianDot");function _i(s,e){return[s[1]*e[2]-s[2]*e[1],s[2]*e[0]-s[0]*e[2],s[0]*e[1]-s[1]*e[0]]}l(_i,"cartesianCross");function Cr(s,e){s[0]+=e[0],s[1]+=e[1],s[2]+=e[2]}l(Cr,"cartesianAddInPlace");function vi(s,e){return[s[0]*e,s[1]*e,s[2]*e]}l(vi,"cartesianScale");function Pr(s){var e=We(s[0]*s[0]+s[1]*s[1]+s[2]*s[2]);s[0]/=e,s[1]/=e,s[2]/=e}l(Pr,"cartesianNormalizeInPlace");function Er(s,e){function t(i,r){return i=s(i,r),e(i[0],i[1])}return l(t,"compose"),s.invert&&e.invert&&(t.invert=function(i,r){return i=e.invert(i,r),i&&s.invert(i[0],i[1])}),t}l(Er,"compose");function Tr(s,e){return z(s)>N&&(s-=Math.round(s/me)*me),[s,e]}l(Tr,"rotationIdentity"),Tr.invert=Tr;function oo(s,e,t){return(s%=me)?e||t?Er(hs(s),ps(e,t)):hs(s):e||t?ps(e,t):Tr}l(oo,"rotateRadians");function ds(s){return function(e,t){return e+=s,z(e)>N&&(e-=Math.round(e/me)*me),[e,t]}}l(ds,"forwardRotationLambda");function hs(s){var e=ds(s);return e.invert=ds(-s),e}l(hs,"rotationLambda");function ps(s,e){var t=H(s),i=W(s),r=H(e),n=W(e);function a(o,p){var u=H(p),c=H(o)*u,d=W(o)*u,f=W(p),g=f*t+c*i;return[zt(d*r-g*n,c*t-f*i),jt(g*r+d*n)]}return l(a,"rotation"),a.invert=function(o,p){var u=H(p),c=H(o)*u,d=W(o)*u,f=W(p),g=f*r-d*n;return[zt(d*r+f*n,c*t+g*i),jt(g*t-c*i)]},a}l(ps,"rotationPhiGamma");function lo(s,e,t,i,r,n){if(t){var a=H(e),o=W(e),p=i*t;r==null?(r=e+i*me,n=e-p/2):(r=fs(a,r),n=fs(a,n),(i>0?r<n:r>n)&&(r+=i*me));for(var u,c=r;i>0?c>n:c<n;c-=p)u=Ar([a,-o*H(c),-o*W(c)]),s.point(u[0],u[1])}}l(lo,"circleStream");function fs(s,e){e=st(e),e[0]-=s,Pr(e);var t=ao(-e[1]);return((-e[2]<0?-t:t)+me-O)%me}l(fs,"circleRadius");function gs(){var s=[],e;return{point:l(function(t,i,r){e.push([t,i,r])},"point"),lineStart:l(function(){s.push(e=[])},"lineStart"),lineEnd:_e,rejoin:l(function(){s.length>1&&s.push(s.pop().concat(s.shift()))},"rejoin"),result:l(function(){var t=s;return s=[],e=null,t},"result")}}l(gs,"clipBuffer");function bi(s,e){return z(s[0]-e[0])<O&&z(s[1]-e[1])<O}l(bi,"pointEqual");function yi(s,e,t,i){this.x=s,this.z=e,this.o=t,this.e=i,this.v=!1,this.n=this.p=null}l(yi,"Intersection");function ms(s,e,t,i,r){var n=[],a=[],o,p;if(s.forEach(function(_){if(!((S=_.length-1)<=0)){var S,b=_[0],R=_[S],C;if(bi(b,R)){if(!b[2]&&!R[2]){for(r.lineStart(),o=0;o<S;++o)r.point((b=_[o])[0],b[1]);r.lineEnd();return}R[0]+=2*O}n.push(C=new yi(b,_,null,!0)),a.push(C.o=new yi(b,null,C,!1)),n.push(C=new yi(R,_,null,!1)),a.push(C.o=new yi(R,null,C,!0))}}),!!n.length){for(a.sort(e),_s(n),_s(a),o=0,p=a.length;o<p;++o)a[o].e=t=!t;for(var u=n[0],c,d;;){for(var f=u,g=!0;f.v;)if((f=f.n)===u)return;c=f.z,r.lineStart();do{if(f.v=f.o.v=!0,f.e){if(g)for(o=0,p=c.length;o<p;++o)r.point((d=c[o])[0],d[1]);else i(f.x,f.n.x,1,r);f=f.n}else{if(g)for(c=f.p.z,o=c.length-1;o>=0;--o)r.point((d=c[o])[0],d[1]);else i(f.x,f.p.x,-1,r);f=f.p}f=f.o,c=f.z,g=!g}while(!f.v);r.lineEnd()}}}l(ms,"clipRejoin");function _s(s){if(e=s.length){for(var e,t=0,i=s[0],r;++t<e;)i.n=r=s[t],r.p=i,i=r;i.n=r=s[0],r.p=i}}l(_s,"link");function Rr(s){return z(s[0])<=N?s[0]:so(s[0])*((z(s[0])+N)%me-N)}l(Rr,"longitude");function co(s,e){var t=Rr(e),i=e[1],r=W(i),n=[W(t),-H(t),0],a=0,o=0,p=new Re;r===1?i=ge+O:r===-1&&(i=-ge-O);for(var u=0,c=s.length;u<c;++u)if(f=(d=s[u]).length)for(var d,f,g=d[f-1],_=Rr(g),S=g[1]/2+os,b=W(S),R=H(S),C=0;C<f;++C,_=A,b=k,R=L,g=E){var E=d[C],A=Rr(E),T=E[1]/2+os,k=W(T),L=H(T),D=A-_,G=D>=0?1:-1,j=G*D,P=j>N,ne=b*k;if(p.add(zt(ne*G*W(j),R*L+ne*H(j))),a+=P?D+G*me:D,P^_>=t^A>=t){var K=_i(st(g),st(E));Pr(K);var B=_i(n,K);Pr(B);var y=(P^D>=0?-1:1)*jt(B[2]);(i>y||i===y&&(K[0]||K[1]))&&(o+=P^D>=0?1:-1)}}return(a<-O||a<O&&p<-1e-12)^o&1}l(co,"polygonContains");function vs(s,e,t,i){return function(r){var n=e(r),a=gs(),o=e(a),p=!1,u,c,d,f={point:g,lineStart:S,lineEnd:b,polygonStart:l(function(){f.point=R,f.lineStart=C,f.lineEnd=E,c=[],u=[]},"polygonStart"),polygonEnd:l(function(){f.point=g,f.lineStart=S,f.lineEnd=b,c=as(c);var A=co(u,i);c.length?(p||(r.polygonStart(),p=!0),ms(c,ho,A,t,r)):A&&(p||(r.polygonStart(),p=!0),r.lineStart(),t(null,null,1,r),r.lineEnd()),p&&(r.polygonEnd(),p=!1),c=u=null},"polygonEnd"),sphere:l(function(){r.polygonStart(),r.lineStart(),t(null,null,1,r),r.lineEnd(),r.polygonEnd()},"sphere")};function g(A,T){s(A,T)&&r.point(A,T)}l(g,"point");function _(A,T){n.point(A,T)}l(_,"pointLine");function S(){f.point=_,n.lineStart()}l(S,"lineStart");function b(){f.point=g,n.lineEnd()}l(b,"lineEnd");function R(A,T){d.push([A,T]),o.point(A,T)}l(R,"pointRing");function C(){o.lineStart(),d=[]}l(C,"ringStart");function E(){R(d[0][0],d[0][1]),o.lineEnd();var A=o.clean(),T=a.result(),k,L=T.length,D,G,j;if(d.pop(),u.push(d),d=null,!!L){if(A&1){if(G=T[0],(D=G.length-1)>0){for(p||(r.polygonStart(),p=!0),r.lineStart(),k=0;k<D;++k)r.point((j=G[k])[0],j[1]);r.lineEnd()}return}L>1&&A&2&&T.push(T.pop().concat(T.shift())),c.push(T.filter(uo))}}return l(E,"ringEnd"),f}}l(vs,"clip");function uo(s){return s.length>1}l(uo,"validSegment");function ho(s,e){return((s=s.x)[0]<0?s[1]-ge-O:ge-s[1])-((e=e.x)[0]<0?e[1]-ge-O:ge-e[1])}l(ho,"compareIntersection");const bs=vs(function(){return!0},po,go,[-N,-ge]);function po(s){var e=NaN,t=NaN,i=NaN,r;return{lineStart:l(function(){s.lineStart(),r=1},"lineStart"),point:l(function(n,a){var o=n>0?N:-N,p=z(n-e);z(p-N)<O?(s.point(e,t=(t+a)/2>0?ge:-ge),s.point(i,t),s.lineEnd(),s.lineStart(),s.point(o,t),s.point(n,t),r=0):i!==o&&p>=N&&(z(e-i)<O&&(e-=i*O),z(n-o)<O&&(n-=o*O),t=fo(e,t,n,a),s.point(i,t),s.lineEnd(),s.lineStart(),s.point(o,t),r=0),s.point(e=n,t=a),i=o},"point"),lineEnd:l(function(){s.lineEnd(),e=t=NaN},"lineEnd"),clean:l(function(){return 2-r},"clean")}}l(po,"clipAntimeridianLine");function fo(s,e,t,i){var r,n,a=W(s-t);return z(a)>O?no((W(e)*(n=H(i))*W(t)-W(i)*(r=H(e))*W(s))/(r*n*a)):(e+i)/2}l(fo,"clipAntimeridianIntersect");function go(s,e,t,i){var r;if(s==null)r=t*ge,i.point(-N,r),i.point(0,r),i.point(N,r),i.point(N,0),i.point(N,-r),i.point(0,-r),i.point(-N,-r),i.point(-N,0),i.point(-N,r);else if(z(s[0]-e[0])>O){var n=s[0]<e[0]?N:-N;r=t*n/2,i.point(-n,r),i.point(0,r),i.point(n,r)}else i.point(e[0],e[1])}l(go,"clipAntimeridianInterpolate");function mo(s){var e=H(s),t=2*ce,i=e>0,r=z(e)>O;function n(c,d,f,g){lo(g,s,t,f,c,d)}l(n,"interpolate");function a(c,d){return H(c)*H(d)>e}l(a,"visible");function o(c){var d,f,g,_,S;return{lineStart:l(function(){_=g=!1,S=1},"lineStart"),point:l(function(b,R){var C=[b,R],E,A=a(b,R),T=i?A?0:u(b,R):A?u(b+(b<0?N:-N),R):0;if(!d&&(_=g=A)&&c.lineStart(),A!==g&&(E=p(d,C),(!E||bi(d,E)||bi(C,E))&&(C[2]=1)),A!==g)S=0,A?(c.lineStart(),E=p(C,d),c.point(E[0],E[1])):(E=p(d,C),c.point(E[0],E[1],2),c.lineEnd()),d=E;else if(r&&d&&i^A){var k;!(T&f)&&(k=p(C,d,!0))&&(S=0,i?(c.lineStart(),c.point(k[0][0],k[0][1]),c.point(k[1][0],k[1][1]),c.lineEnd()):(c.point(k[1][0],k[1][1]),c.lineEnd(),c.lineStart(),c.point(k[0][0],k[0][1],3)))}A&&(!d||!bi(d,C))&&c.point(C[0],C[1]),d=C,g=A,f=T},"point"),lineEnd:l(function(){g&&c.lineEnd(),d=null},"lineEnd"),clean:l(function(){return S|(_&&g)<<1},"clean")}}l(o,"clipLine");function p(c,d,f){var g=st(c),_=st(d),S=[1,0,0],b=_i(g,_),R=mi(b,b),C=b[0],E=R-C*C;if(!E)return!f&&c;var A=e*R/E,T=-e*C/E,k=_i(S,b),L=vi(S,A),D=vi(b,T);Cr(L,D);var G=k,j=mi(L,G),P=mi(G,G),ne=j*j-P*(mi(L,L)-1);if(!(ne<0)){var K=We(ne),B=vi(G,(-j-K)/P);if(Cr(B,L),B=Ar(B),!f)return B;var y=c[0],M=d[0],X=c[1],se=d[1],be;M<y&&(be=y,y=M,M=be);var Xt=M-y,Fe=z(Xt-N)<O,Je=Fe||Xt<O;if(!Fe&&se<X&&(be=X,X=se,se=be),Je?Fe?X+se>0^B[1]<(z(B[0]-y)<O?X:se):X<=B[1]&&B[1]<=se:Xt>N^(y<=B[0]&&B[0]<=M)){var De=vi(G,(-j+K)/P);return Cr(De,L),[B,Ar(De)]}}}l(p,"intersect");function u(c,d){var f=i?s:N-s,g=0;return c<-f?g|=1:c>f&&(g|=2),d<-f?g|=4:d>f&&(g|=8),g}return l(u,"code"),vs(a,o,n,i?[0,-s]:[-N,s-N])}l(mo,"clipCircle");function _o(s,e,t,i,r,n){var a=s[0],o=s[1],p=e[0],u=e[1],c=0,d=1,f=p-a,g=u-o,_;if(_=t-a,!(!f&&_>0)){if(_/=f,f<0){if(_<c)return;_<d&&(d=_)}else if(f>0){if(_>d)return;_>c&&(c=_)}if(_=r-a,!(!f&&_<0)){if(_/=f,f<0){if(_>d)return;_>c&&(c=_)}else if(f>0){if(_<c)return;_<d&&(d=_)}if(_=i-o,!(!g&&_>0)){if(_/=g,g<0){if(_<c)return;_<d&&(d=_)}else if(g>0){if(_>d)return;_>c&&(c=_)}if(_=n-o,!(!g&&_<0)){if(_/=g,g<0){if(_>d)return;_>c&&(c=_)}else if(g>0){if(_<c)return;_<d&&(d=_)}return c>0&&(s[0]=a+c*f,s[1]=o+c*g),d<1&&(e[0]=a+d*f,e[1]=o+d*g),!0}}}}}l(_o,"clipLine");var qt=1e9,Si=-qt;function vo(s,e,t,i){function r(u,c){return s<=u&&u<=t&&e<=c&&c<=i}l(r,"visible");function n(u,c,d,f){var g=0,_=0;if(u==null||(g=a(u,d))!==(_=a(c,d))||p(u,c)<0^d>0)do f.point(g===0||g===3?s:t,g>1?i:e);while((g=(g+d+4)%4)!==_);else f.point(c[0],c[1])}l(n,"interpolate");function a(u,c){return z(u[0]-s)<O?c>0?0:3:z(u[0]-t)<O?c>0?2:1:z(u[1]-e)<O?c>0?1:0:c>0?3:2}l(a,"corner");function o(u,c){return p(u.x,c.x)}l(o,"compareIntersection");function p(u,c){var d=a(u,1),f=a(c,1);return d!==f?d-f:d===0?c[1]-u[1]:d===1?u[0]-c[0]:d===2?u[1]-c[1]:c[0]-u[0]}return l(p,"comparePoint"),function(u){var c=u,d=gs(),f,g,_,S,b,R,C,E,A,T,k,L={point:D,lineStart:ne,lineEnd:K,polygonStart:j,polygonEnd:P};function D(y,M){r(y,M)&&c.point(y,M)}l(D,"point");function G(){for(var y=0,M=0,X=g.length;M<X;++M)for(var se=g[M],be=1,Xt=se.length,Fe=se[0],Je,De,Gi=Fe[0],Tt=Fe[1];be<Xt;++be)Je=Gi,De=Tt,Fe=se[be],Gi=Fe[0],Tt=Fe[1],De<=i?Tt>i&&(Gi-Je)*(i-De)>(Tt-De)*(s-Je)&&++y:Tt<=i&&(Gi-Je)*(i-De)<(Tt-De)*(s-Je)&&--y;return y}l(G,"polygonInside");function j(){c=d,f=[],g=[],k=!0}l(j,"polygonStart");function P(){var y=G(),M=k&&y,X=(f=as(f)).length;(M||X)&&(u.polygonStart(),M&&(u.lineStart(),n(null,null,1,u),u.lineEnd()),X&&ms(f,o,y,n,u),u.polygonEnd()),c=u,f=g=_=null}l(P,"polygonEnd");function ne(){L.point=B,g&&g.push(_=[]),T=!0,A=!1,C=E=NaN}l(ne,"lineStart");function K(){f&&(B(S,b),R&&A&&d.rejoin(),f.push(d.result())),L.point=D,A&&c.lineEnd()}l(K,"lineEnd");function B(y,M){var X=r(y,M);if(g&&_.push([y,M]),T)S=y,b=M,R=X,T=!1,X&&(c.lineStart(),c.point(y,M));else if(X&&A)c.point(y,M);else{var se=[C=Math.max(Si,Math.min(qt,C)),E=Math.max(Si,Math.min(qt,E))],be=[y=Math.max(Si,Math.min(qt,y)),M=Math.max(Si,Math.min(qt,M))];_o(se,be,s,e,t,i)?(A||(c.lineStart(),c.point(se[0],se[1])),c.point(be[0],be[1]),X||c.lineEnd(),k=!1):X&&(c.lineStart(),c.point(y,M),k=!1)}C=y,E=M,A=X}return l(B,"linePoint"),L}}l(vo,"clipRectangle");const kr=l(s=>s,"identity$1");var Mr=new Re,Nr=new Re,ys,Ss,Fr,Dr,Me={point:_e,lineStart:_e,lineEnd:_e,polygonStart:l(function(){Me.lineStart=bo,Me.lineEnd=So},"polygonStart"),polygonEnd:l(function(){Me.lineStart=Me.lineEnd=Me.point=_e,Mr.add(z(Nr)),Nr=new Re},"polygonEnd"),result:l(function(){var s=Mr/2;return Mr=new Re,s},"result")};function bo(){Me.point=yo}l(bo,"areaRingStart");function yo(s,e){Me.point=ws,ys=Fr=s,Ss=Dr=e}l(yo,"areaPointFirst");function ws(s,e){Nr.add(Dr*s-Fr*e),Fr=s,Dr=e}l(ws,"areaPoint");function So(){ws(ys,Ss)}l(So,"areaRingEnd");var at=1/0,wi=at,Vt=-at,$i=Vt,Ai={point:wo,lineStart:_e,lineEnd:_e,polygonStart:_e,polygonEnd:_e,result:l(function(){var s=[[at,wi],[Vt,$i]];return Vt=$i=-(wi=at=1/0),s},"result")};function wo(s,e){s<at&&(at=s),s>Vt&&(Vt=s),e<wi&&(wi=e),e>$i&&($i=e)}l(wo,"boundsPoint");var Gr=0,Or=0,Ht=0,Ci=0,Pi=0,ot=0,Lr=0,Br=0,Wt=0,$s,As,Ce,Pe,ve={point:Ke,lineStart:Cs,lineEnd:Ps,polygonStart:l(function(){ve.lineStart=Co,ve.lineEnd=Po},"polygonStart"),polygonEnd:l(function(){ve.point=Ke,ve.lineStart=Cs,ve.lineEnd=Ps},"polygonEnd"),result:l(function(){var s=Wt?[Lr/Wt,Br/Wt]:ot?[Ci/ot,Pi/ot]:Ht?[Gr/Ht,Or/Ht]:[NaN,NaN];return Gr=Or=Ht=Ci=Pi=ot=Lr=Br=Wt=0,s},"result")};function Ke(s,e){Gr+=s,Or+=e,++Ht}l(Ke,"centroidPoint");function Cs(){ve.point=$o}l(Cs,"centroidLineStart");function $o(s,e){ve.point=Ao,Ke(Ce=s,Pe=e)}l($o,"centroidPointFirstLine");function Ao(s,e){var t=s-Ce,i=e-Pe,r=We(t*t+i*i);Ci+=r*(Ce+s)/2,Pi+=r*(Pe+e)/2,ot+=r,Ke(Ce=s,Pe=e)}l(Ao,"centroidPointLine");function Ps(){ve.point=Ke}l(Ps,"centroidLineEnd");function Co(){ve.point=Eo}l(Co,"centroidRingStart");function Po(){Es($s,As)}l(Po,"centroidRingEnd");function Eo(s,e){ve.point=Es,Ke($s=Ce=s,As=Pe=e)}l(Eo,"centroidPointFirstRing");function Es(s,e){var t=s-Ce,i=e-Pe,r=We(t*t+i*i);Ci+=r*(Ce+s)/2,Pi+=r*(Pe+e)/2,ot+=r,r=Pe*s-Ce*e,Lr+=r*(Ce+s),Br+=r*(Pe+e),Wt+=r*3,Ke(Ce=s,Pe=e)}l(Es,"centroidPointRing");function Ts(s){this._context=s}l(Ts,"PathContext"),Ts.prototype={_radius:4.5,pointRadius:l(function(s){return this._radius=s,this},"pointRadius"),polygonStart:l(function(){this._line=0},"polygonStart"),polygonEnd:l(function(){this._line=NaN},"polygonEnd"),lineStart:l(function(){this._point=0},"lineStart"),lineEnd:l(function(){this._line===0&&this._context.closePath(),this._point=NaN},"lineEnd"),point:l(function(s,e){switch(this._point){case 0:{this._context.moveTo(s,e),this._point=1;break}case 1:{this._context.lineTo(s,e);break}default:{this._context.moveTo(s+this._radius,e),this._context.arc(s,e,this._radius,0,me);break}}},"point"),result:_e};var Ir=new Re,xr,Rs,ks,Kt,Qt,Jt={point:_e,lineStart:l(function(){Jt.point=To},"lineStart"),lineEnd:l(function(){xr&&Ms(Rs,ks),Jt.point=_e},"lineEnd"),polygonStart:l(function(){xr=!0},"polygonStart"),polygonEnd:l(function(){xr=null},"polygonEnd"),result:l(function(){var s=+Ir;return Ir=new Re,s},"result")};function To(s,e){Jt.point=Ms,Rs=Kt=s,ks=Qt=e}l(To,"lengthPointFirst");function Ms(s,e){Kt-=s,Qt-=e,Ir.add(We(Kt*Kt+Qt*Qt)),Kt=s,Qt=e}l(Ms,"lengthPoint");let Ns,Ei,Fs,Ds;const cn=class cn{constructor(e){this._append=e==null?Gs:Ro(e),this._radius=4.5,this._=""}pointRadius(e){return this._radius=+e,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(e,t){switch(this._point){case 0:{this._append`M${e},${t}`,this._point=1;break}case 1:{this._append`L${e},${t}`;break}default:{if(this._append`M${e},${t}`,this._radius!==Fs||this._append!==Ei){const i=this._radius,r=this._;this._="",this._append`m0,${i}a${i},${i} 0 1,1 0,${-2*i}a${i},${i} 0 1,1 0,${2*i}z`,Fs=i,Ei=this._append,Ds=this._,this._=r}this._+=Ds;break}}}result(){const e=this._;return this._="",e.length?e:null}};l(cn,"PathString");let Ti=cn;function Gs(s){let e=1;this._+=s[0];for(const t=s.length;e<t;++e)this._+=arguments[e]+s[e]}l(Gs,"append");function Ro(s){const e=Math.floor(s);if(!(e>=0))throw new RangeError(`invalid digits: ${s}`);if(e>15)return Gs;if(e!==Ns){const t=10**e;Ns=e,Ei=l(function(r){let n=1;this._+=r[0];for(const a=r.length;n<a;++n)this._+=Math.round(arguments[n]*t)/t+r[n]},"append")}return Ei}l(Ro,"appendRound");function ko(s,e){let t=3,i=4.5,r,n;function a(o){return o&&(typeof i=="function"&&n.pointRadius(+i.apply(this,arguments)),nt(o,r(n))),n.result()}return l(a,"path"),a.area=function(o){return nt(o,r(Me)),Me.result()},a.measure=function(o){return nt(o,r(Jt)),Jt.result()},a.bounds=function(o){return nt(o,r(Ai)),Ai.result()},a.centroid=function(o){return nt(o,r(ve)),ve.result()},a.projection=function(o){return arguments.length?(r=o==null?(s=null,kr):(s=o).stream,a):s},a.context=function(o){return arguments.length?(n=o==null?(e=null,new Ti(t)):new Ts(e=o),typeof i!="function"&&n.pointRadius(i),a):e},a.pointRadius=function(o){return arguments.length?(i=typeof o=="function"?o:(n.pointRadius(+o),+o),a):i},a.digits=function(o){if(!arguments.length)return t;if(o==null)t=null;else{const p=Math.floor(o);if(!(p>=0))throw new RangeError(`invalid digits: ${o}`);t=p}return e===null&&(n=new Ti(t)),a},a.projection(s).digits(t).context(e)}l(ko,"geoPath");function Ur(s){return function(e){var t=new zr;for(var i in s)t[i]=s[i];return t.stream=e,t}}l(Ur,"transformer");function zr(){}l(zr,"TransformStream"),zr.prototype={constructor:zr,point:l(function(s,e){this.stream.point(s,e)},"point"),sphere:l(function(){this.stream.sphere()},"sphere"),lineStart:l(function(){this.stream.lineStart()},"lineStart"),lineEnd:l(function(){this.stream.lineEnd()},"lineEnd"),polygonStart:l(function(){this.stream.polygonStart()},"polygonStart"),polygonEnd:l(function(){this.stream.polygonEnd()},"polygonEnd")};function jr(s,e,t){var i=s.clipExtent&&s.clipExtent();return s.scale(150).translate([0,0]),i!=null&&s.clipExtent(null),nt(t,s.stream(Ai)),e(Ai.result()),i!=null&&s.clipExtent(i),s}l(jr,"fit");function Os(s,e,t){return jr(s,function(i){var r=e[1][0]-e[0][0],n=e[1][1]-e[0][1],a=Math.min(r/(i[1][0]-i[0][0]),n/(i[1][1]-i[0][1])),o=+e[0][0]+(r-a*(i[1][0]+i[0][0]))/2,p=+e[0][1]+(n-a*(i[1][1]+i[0][1]))/2;s.scale(150*a).translate([o,p])},t)}l(Os,"fitExtent");function Mo(s,e,t){return Os(s,[[0,0],e],t)}l(Mo,"fitSize");function No(s,e,t){return jr(s,function(i){var r=+e,n=r/(i[1][0]-i[0][0]),a=(r-n*(i[1][0]+i[0][0]))/2,o=-n*i[0][1];s.scale(150*n).translate([a,o])},t)}l(No,"fitWidth");function Fo(s,e,t){return jr(s,function(i){var r=+e,n=r/(i[1][1]-i[0][1]),a=-n*i[0][0],o=(r-n*(i[1][1]+i[0][1]))/2;s.scale(150*n).translate([a,o])},t)}l(Fo,"fitHeight");var Ls=16,Do=H(30*ce);function Bs(s,e){return+e?Oo(s,e):Go(s)}l(Bs,"resample$1");function Go(s){return Ur({point:l(function(e,t){e=s(e,t),this.stream.point(e[0],e[1])},"point")})}l(Go,"resampleNone");function Oo(s,e){function t(i,r,n,a,o,p,u,c,d,f,g,_,S,b){var R=u-i,C=c-r,E=R*R+C*C;if(E>4*e&&S--){var A=a+f,T=o+g,k=p+_,L=We(A*A+T*T+k*k),D=jt(k/=L),G=z(z(k)-1)<O||z(n-d)<O?(n+d)/2:zt(T,A),j=s(G,D),P=j[0],ne=j[1],K=P-i,B=ne-r,y=C*K-R*B;(y*y/E>e||z((R*K+C*B)/E-.5)>.3||a*f+o*g+p*_<Do)&&(t(i,r,n,a,o,p,P,ne,G,A/=L,T/=L,k,S,b),b.point(P,ne),t(P,ne,G,A,T,k,u,c,d,f,g,_,S,b))}}return l(t,"resampleLineTo"),function(i){var r,n,a,o,p,u,c,d,f,g,_,S,b={point:R,lineStart:C,lineEnd:A,polygonStart:l(function(){i.polygonStart(),b.lineStart=T},"polygonStart"),polygonEnd:l(function(){i.polygonEnd(),b.lineStart=C},"polygonEnd")};function R(D,G){D=s(D,G),i.point(D[0],D[1])}l(R,"point");function C(){d=NaN,b.point=E,i.lineStart()}l(C,"lineStart");function E(D,G){var j=st([D,G]),P=s(D,G);t(d,f,c,g,_,S,d=P[0],f=P[1],c=D,g=j[0],_=j[1],S=j[2],Ls,i),i.point(d,f)}l(E,"linePoint");function A(){b.point=R,i.lineEnd()}l(A,"lineEnd");function T(){C(),b.point=k,b.lineEnd=L}l(T,"ringStart");function k(D,G){E(r=D,G),n=d,a=f,o=g,p=_,u=S,b.point=E}l(k,"ringPoint");function L(){t(d,f,c,g,_,S,n,a,r,o,p,u,Ls,i),b.lineEnd=A,A()}return l(L,"ringEnd"),b}}l(Oo,"resample");var Lo=Ur({point:l(function(s,e){this.stream.point(s*ce,e*ce)},"point")});function Bo(s){return Ur({point:l(function(e,t){var i=s(e,t);return this.stream.point(i[0],i[1])},"point")})}l(Bo,"transformRotate");function Io(s,e,t,i,r){function n(a,o){return a*=i,o*=r,[e+s*a,t-s*o]}return l(n,"transform"),n.invert=function(a,o){return[(a-e)/s*i,(t-o)/s*r]},n}l(Io,"scaleTranslate");function Is(s,e,t,i,r,n){if(!n)return Io(s,e,t,i,r);var a=H(n),o=W(n),p=a*s,u=o*s,c=a/s,d=o/s,f=(o*t-a*e)/s,g=(o*e+a*t)/s;function _(S,b){return S*=i,b*=r,[p*S-u*b+e,t-u*S-p*b]}return l(_,"transform"),_.invert=function(S,b){return[i*(c*S-d*b+f),r*(g-d*S-c*b)]},_}l(Is,"scaleTranslateRotate");function xo(s){return Uo(function(){return s})()}l(xo,"projection");function Uo(s){var e,t=150,i=480,r=250,n=0,a=0,o=0,p=0,u=0,c,d=0,f=1,g=1,_=null,S=bs,b=null,R,C,E,A=kr,T=.5,k,L,D,G,j;function P(y){return D(y[0]*ce,y[1]*ce)}l(P,"projection");function ne(y){return y=D.invert(y[0],y[1]),y&&[y[0]*ke,y[1]*ke]}l(ne,"invert"),P.stream=function(y){return G&&j===y?G:G=Lo(Bo(c)(S(k(A(j=y)))))},P.preclip=function(y){return arguments.length?(S=y,_=void 0,B()):S},P.postclip=function(y){return arguments.length?(A=y,b=R=C=E=null,B()):A},P.clipAngle=function(y){return arguments.length?(S=+y?mo(_=y*ce):(_=null,bs),B()):_*ke},P.clipExtent=function(y){return arguments.length?(A=y==null?(b=R=C=E=null,kr):vo(b=+y[0][0],R=+y[0][1],C=+y[1][0],E=+y[1][1]),B()):b==null?null:[[b,R],[C,E]]},P.scale=function(y){return arguments.length?(t=+y,K()):t},P.translate=function(y){return arguments.length?(i=+y[0],r=+y[1],K()):[i,r]},P.center=function(y){return arguments.length?(n=y[0]%360*ce,a=y[1]%360*ce,K()):[n*ke,a*ke]},P.rotate=function(y){return arguments.length?(o=y[0]%360*ce,p=y[1]%360*ce,u=y.length>2?y[2]%360*ce:0,K()):[o*ke,p*ke,u*ke]},P.angle=function(y){return arguments.length?(d=y%360*ce,K()):d*ke},P.reflectX=function(y){return arguments.length?(f=y?-1:1,K()):f<0},P.reflectY=function(y){return arguments.length?(g=y?-1:1,K()):g<0},P.precision=function(y){return arguments.length?(k=Bs(L,T=y*y),B()):We(T)},P.fitExtent=function(y,M){return Os(P,y,M)},P.fitSize=function(y,M){return Mo(P,y,M)},P.fitWidth=function(y,M){return No(P,y,M)},P.fitHeight=function(y,M){return Fo(P,y,M)};function K(){var y=Is(t,0,0,f,g,d).apply(null,e(n,a)),M=Is(t,i-y[0],r-y[1],f,g,d);return c=oo(o,p,u),L=Er(e,M),D=Er(c,L),k=Bs(L,T),B()}l(K,"recenter");function B(){return G=j=null,P}return l(B,"reset"),function(){return e=s.apply(this,arguments),P.invert=e.invert&&ne,K()}}l(Uo,"projectionMutator");function xs(s,e){var t=e*e,i=t*t;return[s*(.8707-.131979*t+i*(-.013791+i*(.003971*t-.001529*i))),e*(1.007226+t*(.015085+i*(-.044475+.028874*t-.005916*i)))]}l(xs,"naturalEarth1Raw"),xs.invert=function(s,e){var t=e,i=25,r;do{var n=t*t,a=n*n;t-=r=(t*(1.007226+n*(.015085+a*(-.044475+.028874*n-.005916*a)))-e)/(1.007226+n*(.015085*3+a*(-.044475*7+.028874*9*n-.005916*11*a)))}while(z(r)>O&&--i>0);return[s/(.8707+(n=t*t)*(-.131979+n*(-.013791+n*n*n*(.003971-.001529*n)))),t]};function zo(){return xo(xs).scale(175.295)}l(zo,"geoNaturalEarth1");function jo(s){return s}l(jo,"identity");function qo(s){if(s==null)return jo;var e,t,i=s.scale[0],r=s.scale[1],n=s.translate[0],a=s.translate[1];return function(o,p){p||(e=t=0);var u=2,c=o.length,d=new Array(c);for(d[0]=(e+=o[0])*i+n,d[1]=(t+=o[1])*r+a;u<c;)d[u]=o[u],++u;return d}}l(qo,"transform");function Vo(s,e){for(var t,i=s.length,r=i-e;r<--i;)t=s[r],s[r++]=s[i],s[i]=t}l(Vo,"reverse");function Ho(s,e){return typeof e=="string"&&(e=s.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(t){return Us(s,t)})}:Us(s,e)}l(Ho,"feature$1");function Us(s,e){var t=e.id,i=e.bbox,r=e.properties==null?{}:e.properties,n=zs(s,e);return t==null&&i==null?{type:"Feature",properties:r,geometry:n}:i==null?{type:"Feature",id:t,properties:r,geometry:n}:{type:"Feature",id:t,bbox:i,properties:r,geometry:n}}l(Us,"feature");function zs(s,e){var t=qo(s.transform),i=s.arcs;function r(c,d){d.length&&d.pop();for(var f=i[c<0?~c:c],g=0,_=f.length;g<_;++g)d.push(t(f[g],g));c<0&&Vo(d,_)}l(r,"arc");function n(c){return t(c)}l(n,"point");function a(c){for(var d=[],f=0,g=c.length;f<g;++f)r(c[f],d);return d.length<2&&d.push(d[0]),d}l(a,"line");function o(c){for(var d=a(c);d.length<4;)d.push(d[0]);return d}l(o,"ring");function p(c){return c.map(o)}l(p,"polygon");function u(c){var d=c.type,f;switch(d){case"GeometryCollection":return{type:d,geometries:c.geometries.map(u)};case"Point":f=n(c.coordinates);break;case"MultiPoint":f=c.coordinates.map(n);break;case"LineString":f=a(c.arcs);break;case"MultiLineString":f=c.arcs.map(a);break;case"Polygon":f=p(c.arcs);break;case"MultiPolygon":f=c.arcs.map(p);break;default:return null}return{type:d,coordinates:f}}return l(u,"geometry"),u(e)}l(zs,"object");function Wo(s,e){var t={},i={},r={},n=[],a=-1;e.forEach(function(u,c){var d=s.arcs[u<0?~u:u],f;d.length<3&&!d[1][0]&&!d[1][1]&&(f=e[++a],e[a]=u,e[c]=f)}),e.forEach(function(u){var c=o(u),d=c[0],f=c[1],g,_;if(g=r[d])if(delete r[g.end],g.push(u),g.end=f,_=i[f]){delete i[_.start];var S=_===g?g:g.concat(_);i[S.start=g.start]=r[S.end=_.end]=S}else i[g.start]=r[g.end]=g;else if(g=i[f])if(delete i[g.start],g.unshift(u),g.start=d,_=r[d]){delete r[_.end];var b=_===g?g:_.concat(g);i[b.start=_.start]=r[b.end=g.end]=b}else i[g.start]=r[g.end]=g;else g=[u],i[g.start=d]=r[g.end=f]=g});function o(u){var c=s.arcs[u<0?~u:u],d=c[0],f;return s.transform?(f=[0,0],c.forEach(function(g){f[0]+=g[0],f[1]+=g[1]})):f=c[c.length-1],u<0?[f,d]:[d,f]}l(o,"ends");function p(u,c){for(var d in u){var f=u[d];delete c[f.start],delete f.start,delete f.end,f.forEach(function(g){t[g<0?~g:g]=1}),n.push(f)}}return l(p,"flush"),p(r,i),p(i,r),e.forEach(function(u){t[u<0?~u:u]||n.push([u])}),n}l(Wo,"stitch");function Ko(s){return zs(s,Qo.apply(this,arguments))}l(Ko,"mesh");function Qo(s,e,t){var i,r,n;if(arguments.length>1)i=Jo(s,e,t);else for(r=0,i=new Array(n=s.arcs.length);r<n;++r)i[r]=r;return{type:"MultiLineString",arcs:Wo(s,i)}}l(Qo,"meshArcs");function Jo(s,e,t){var i=[],r=[],n;function a(d){var f=d<0?~d:d;(r[f]||(r[f]=[])).push({i:d,g:n})}l(a,"extract0");function o(d){d.forEach(a)}l(o,"extract1");function p(d){d.forEach(o)}l(p,"extract2");function u(d){d.forEach(p)}l(u,"extract3");function c(d){switch(n=d,d.type){case"GeometryCollection":d.geometries.forEach(c);break;case"LineString":o(d.arcs);break;case"MultiLineString":case"Polygon":p(d.arcs);break;case"MultiPolygon":u(d.arcs);break}}return l(c,"geometry"),c(e),r.forEach(t==null?function(d){i.push(d[0].i)}:function(d){t(d[0].g,d[d.length-1].g)&&i.push(d[0].i)}),i}l(Jo,"extractArcs");const js={"012":"Africa","024":"Africa","072":"Africa","084":"Africa",108:"Africa",120:"Africa",140:"Africa",148:"Africa",178:"Africa",180:"Africa",204:"Africa",226:"Africa",231:"Africa",232:"Africa",260:"Africa",262:"Africa",266:"Africa",270:"Africa",288:"Africa",324:"Africa",384:"Africa",404:"Africa",426:"Africa",430:"Africa",434:"Africa",450:"Africa",454:"Africa",466:"Africa",478:"Africa",504:"Africa",508:"Africa",516:"Africa",562:"Africa",566:"Africa",624:"Africa",646:"Africa",686:"Africa",694:"Africa",706:"Africa",710:"Africa",716:"Africa",728:"Africa",729:"Africa",732:"Africa",748:"Africa",768:"Africa",788:"Africa",800:"Africa",834:"Africa",854:"Africa",894:"Africa","008":"Europe","040":"Europe","056":"Europe","070":"Europe",100:"Europe",112:"Europe",191:"Europe",196:"Europe",203:"Europe",208:"Europe",233:"Europe",246:"Europe",250:"Europe",268:"Europe",276:"Europe",300:"Europe",348:"Europe",352:"Europe",372:"Europe",380:"Europe",428:"Europe",440:"Europe",442:"Europe",498:"Europe",499:"Europe",528:"Europe",578:"Europe",616:"Europe",620:"Europe",642:"Europe",643:"Europe",688:"Europe",703:"Europe",705:"Europe",724:"Europe",752:"Europe",756:"Europe",804:"Europe",807:"Europe",826:"Europe","004":"Asia","031":"Asia","048":"Asia","050":"Asia","051":"Asia","064":"Asia","096":"Asia",104:"Asia",116:"Asia",144:"Asia",156:"Asia",158:"Asia",275:"Asia",356:"Asia",360:"Asia",364:"Asia",368:"Asia",376:"Asia",392:"Asia",398:"Asia",400:"Asia",408:"Asia",410:"Asia",414:"Asia",417:"Asia",418:"Asia",422:"Asia",458:"Asia",496:"Asia",512:"Asia",524:"Asia",586:"Asia",608:"Asia",626:"Asia",634:"Asia",682:"Asia",702:"Asia",704:"Asia",760:"Asia",762:"Asia",764:"Asia",784:"Asia",792:"Asia",795:"Asia",860:"Asia",887:"Asia","044":"North America",124:"North America",188:"North America",192:"North America",214:"North America",222:"North America",320:"North America",332:"North America",340:"North America",388:"North America",484:"North America",558:"North America",591:"North America",630:"North America",780:"North America",840:"North America","032":"South America","068":"South America","076":"South America",152:"South America",170:"South America",218:"South America",238:"South America",328:"South America",600:"South America",604:"South America",740:"South America",858:"South America",862:"South America","010":"Oceania","036":"Oceania","090":"Oceania",242:"Oceania",540:"Oceania",548:"Oceania",554:"Oceania",598:"Oceania",304:"Oceania"},Yo={AF:"004",AL:"008",AQ:"010",DZ:"012",AO:"024",AZ:"031",AR:"032",AU:"036",AT:"040",BS:"044",BD:"050",AM:"051",BE:"056",BT:"064",BO:"068",BA:"070",BW:"072",BZ:"084",BR:"076",BN:"096",BG:"100",MM:"104",BI:"108",BY:"112",KH:"116",CM:"120",CA:"124",CF:"140",LK:"144",TD:"148",CL:"152",CN:"156",TW:"158",CO:"170",CG:"178",CD:"180",CR:"188",HR:"191",CU:"192",CY:"196",CZ:"203",BJ:"204",DK:"208",DO:"214",EC:"218",SV:"222",GQ:"226",ER:"232",EE:"233",ET:"231",FK:"238",FJ:"242",FI:"246",FR:"250",DJ:"262",GA:"266",GE:"268",GM:"270",PS:"275",DE:"276",GH:"288",GR:"300",GL:"304",GT:"320",GN:"324",GY:"328",HT:"332",HN:"340",HU:"348",IS:"352",IN:"356",ID:"360",IR:"364",IQ:"368",IE:"372",IL:"376",IT:"380",CI:"384",JM:"388",JP:"392",KZ:"398",JO:"400",KE:"404",KP:"408",KR:"410",KW:"414",KG:"417",LA:"418",LB:"422",LS:"426",LV:"428",LR:"430",LY:"434",LT:"440",LU:"442",MG:"450",MW:"454",MY:"458",ML:"466",MR:"478",MX:"484",MN:"496",MD:"498",ME:"499",MA:"504",MZ:"508",OM:"512",NA:"516",NP:"524",NL:"528",NC:"540",VU:"548",NZ:"554",NI:"558",NE:"562",NG:"566",NO:"578",PK:"586",PA:"591",PG:"598",PY:"600",PE:"604",PH:"608",PL:"616",PT:"620",GW:"624",TL:"626",PR:"630",QA:"634",RO:"642",RU:"643",RW:"646",SA:"682",SN:"686",RS:"688",SL:"694",SK:"703",VN:"704",SI:"705",SO:"706",ZA:"710",ZW:"716",SS:"728",SD:"729",EH:"732",SR:"740",SZ:"748",SE:"752",CH:"756",SY:"760",TJ:"762",TH:"764",TG:"768",TT:"780",AE:"784",TN:"788",TR:"792",TM:"795",UG:"800",UA:"804",MK:"807",EG:"818",GB:"826",TZ:"834",US:"840",BF:"854",UY:"858",UZ:"860",VE:"862",YE:"887",ZM:"894",ES:"724",SG:"702",BH:"048",SB:"090",GD:"308"},Zo={AFG:"004",ALB:"008",ATA:"010",DZA:"012",AGO:"024",AZE:"031",ARG:"032",AUS:"036",AUT:"040",BHS:"044",BGD:"050",ARM:"051",BEL:"056",BTN:"064",BOL:"068",BIH:"070",BWA:"072",BLZ:"084",BRA:"076",BRN:"096",BGR:"100",MMR:"104",BDI:"108",BLR:"112",KHM:"116",CMR:"120",CAN:"124",CAF:"140",LKA:"144",TCD:"148",CHL:"152",CHN:"156",TWN:"158",COL:"170",COG:"178",COD:"180",CRI:"188",HRV:"191",CUB:"192",CYP:"196",CZE:"203",BEN:"204",DNK:"208",DOM:"214",ECU:"218",SLV:"222",GNQ:"226",ERI:"232",EST:"233",ETH:"231",FLK:"238",FJI:"242",FIN:"246",FRA:"250",DJI:"262",GAB:"266",GEO:"268",GMB:"270",PSE:"275",DEU:"276",GHA:"288",GRC:"300",GRL:"304",GTM:"320",GIN:"324",GUY:"328",HTI:"332",HND:"340",HUN:"348",ISL:"352",IND:"356",IDN:"360",IRN:"364",IRQ:"368",IRL:"372",ISR:"376",ITA:"380",CIV:"384",JAM:"388",JPN:"392",KAZ:"398",JOR:"400",KEN:"404",PRK:"408",KOR:"410",KWT:"414",KGZ:"417",LAO:"418",LBN:"422",LSO:"426",LVA:"428",LBR:"430",LBY:"434",LTU:"440",LUX:"442",MDG:"450",MWI:"454",MYS:"458",MLI:"466",MRT:"478",MEX:"484",MNG:"496",MDA:"498",MNE:"499",MAR:"504",MOZ:"508",OMN:"512",NAM:"516",NPL:"524",NLD:"528",NCL:"540",VUT:"548",NZL:"554",NIC:"558",NER:"562",NGA:"566",NOR:"578",PAK:"586",PAN:"591",PNG:"598",PRY:"600",PER:"604",PHL:"608",POL:"616",PRT:"620",GNB:"624",TLS:"626",PRI:"630",QAT:"634",ROU:"642",RUS:"643",RWA:"646",SAU:"682",SEN:"686",SRB:"688",SLE:"694",SVK:"703",VNM:"704",SVN:"705",SOM:"706",ZAF:"710",ZWE:"716",SSD:"728",SDN:"729",ESH:"732",SUR:"740",SWZ:"748",SWE:"752",CHE:"756",SYR:"760",TJK:"762",THA:"764",TGO:"768",TTO:"780",ARE:"784",TUN:"788",TUR:"792",TKM:"795",UGA:"800",UKR:"804",MKD:"807",EGY:"818",GBR:"826",TZA:"834",USA:"840",BFA:"854",URY:"858",UZB:"860",VEN:"862",YEM:"887",ZMB:"894",ESP:"724",SGP:"702",BHR:"048",SLB:"090"};function Xo(s,e){const t=s.trim().toUpperCase();switch(e){case"iso-a2":return Yo[t]||"";case"iso-a3":return Zo[t]||"";case"iso-num":return t.padStart(3,"0")}}l(Xo,"toIsoNumeric");const el={"004":"Afghanistan","008":"Albanie","010":"Antarctique","012":"Algerie","024":"Angola","031":"Azerbaidjan","032":"Argentine","036":"Australie","040":"Autriche","044":"Bahamas","050":"Bangladesh","051":"Armenie","056":"Belgique","064":"Bhoutan","068":"Bolivie","070":"Bosnie-Herzegovine","072":"Botswana","076":"Bresil","084":"Belize","090":"Iles Salomon","096":"Brunei",100:"Bulgarie",104:"Myanmar",108:"Burundi",112:"Bielorussie",116:"Cambodge",120:"Cameroun",124:"Canada",140:"Republique centrafricaine",144:"Sri Lanka",148:"Tchad",152:"Chili",156:"Chine",158:"Taiwan",170:"Colombie",178:"Congo",180:"Republique democratique du Congo",188:"Costa Rica",191:"Croatie",192:"Cuba",196:"Chypre",203:"Republique tcheque",204:"Benin",208:"Danemark",214:"Republique dominicaine",218:"Equateur",222:"Salvador",226:"Guinee equatoriale",231:"Ethiopie",232:"Erythree",233:"Estonie",238:"Iles Malouines",242:"Fidji",246:"Finlande",250:"France",260:"Terres australes francaises",262:"Djibouti",266:"Gabon",268:"Georgie",270:"Gambie",275:"Palestine",276:"Allemagne",288:"Ghana",300:"Grece",304:"Groenland",320:"Guatemala",324:"Guinee",328:"Guyana",332:"Haiti",340:"Honduras",348:"Hongrie",352:"Islande",356:"Inde",360:"Indonesie",364:"Iran",368:"Irak",372:"Irlande",376:"Israel",380:"Italie",384:"Cote d'Ivoire",388:"Jamaique",392:"Japon",398:"Kazakhstan",400:"Jordanie",404:"Kenya",408:"Coree du Nord",410:"Coree du Sud",414:"Koweit",417:"Kirghizistan",418:"Laos",422:"Liban",426:"Lesotho",428:"Lettonie",430:"Liberia",434:"Libye",440:"Lituanie",442:"Luxembourg",450:"Madagascar",454:"Malawi",458:"Malaisie",466:"Mali",478:"Mauritanie",484:"Mexique",496:"Mongolie",498:"Moldavie",499:"Montenegro",504:"Maroc",508:"Mozambique",512:"Oman",516:"Namibie",524:"Nepal",528:"Pays-Bas",540:"Nouvelle-Caledonie",548:"Vanuatu",554:"Nouvelle-Zelande",558:"Nicaragua",562:"Niger",566:"Nigeria",578:"Norvege",586:"Pakistan",591:"Panama",598:"Papouasie-Nouvelle-Guinee",600:"Paraguay",604:"Perou",608:"Philippines",616:"Pologne",620:"Portugal",624:"Guinee-Bissau",626:"Timor oriental",630:"Porto Rico",634:"Qatar",642:"Roumanie",643:"Russie",646:"Rwanda",682:"Arabie saoudite",686:"Senegal",688:"Serbie",694:"Sierra Leone",703:"Slovaquie",704:"Vietnam",705:"Slovenie",706:"Somalie",710:"Afrique du Sud",716:"Zimbabwe",724:"Espagne",728:"Soudan du Sud",729:"Soudan",732:"Sahara occidental",740:"Suriname",748:"Eswatini",752:"Suede",756:"Suisse",760:"Syrie",762:"Tadjikistan",764:"Thailande",768:"Togo",780:"Trinite-et-Tobago",784:"Emirats arabes unis",788:"Tunisie",792:"Turquie",795:"Turkmenistan",800:"Ouganda",804:"Ukraine",807:"Macedoine du Nord",818:"Egypte",826:"Royaume-Uni",834:"Tanzanie",840:"Etats-Unis",854:"Burkina Faso",858:"Uruguay",860:"Ouzbekistan",862:"Venezuela",887:"Yemen",894:"Zambie"};var ie=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};let Ri=null;const ki="world-countries-110m.json";async function tl(){if(Ri)return Ri;const s=(typeof document>"u"&&typeof location>"u"?require("url").pathToFileURL(__filename).href:typeof document>"u"?location.href:ue&&ue.tagName.toUpperCase()==="SCRIPT"&&ue.src||new URL("gouv-widgets.umd.js",document.baseURI).href).replace(/\/[^/]+$/,""),e=[`${s}/data/${ki}`,`${s}/../data/${ki}`,`/data/${ki}`];for(const t of e)try{const i=await fetch(t);if(i.ok)return Ri=await i.json(),Ri}catch{}throw new Error(`Could not load ${ki} from any candidate path`)}l(tl,"loadTopology");const qr=960,Vr=500,Mi=20,qs={sequentialAscending:["#F5F5FE","#E3E3FD","#C1C1FB","#A1A1F8","#8585F6","#6A6AF4","#4747E5","#2323B4","#000091"],sequentialDescending:["#000091","#2323B4","#4747E5","#6A6AF4","#8585F6","#A1A1F8","#C1C1FB","#E3E3FD","#F5F5FE"],divergentAscending:["#000091","#4747E5","#8585F6","#C1C1FB","#F5F5F5","#FCC0B4","#F58050","#E3541C","#C9191E"],divergentDescending:["#C9191E","#E3541C","#F58050","#FCC0B4","#F5F5F5","#C1C1FB","#8585F6","#4747E5","#000091"],neutral:["#F6F6F6","#E5E5E5","#CECECE","#B5B5B5","#929292","#777777","#666666","#3A3A3A","#161616"],default:["#F5F5FE","#E3E3FD","#C1C1FB","#A1A1F8","#8585F6","#6A6AF4","#4747E5","#2323B4","#000091"],categorical:["#000091","#6A6AF4","#009081","#C9191E","#FF9940","#A558A0","#417DC4","#716043","#18753C"]},Vs={Africa:"Afrique",Europe:"Europe",Asia:"Asie","North America":"Amerique du Nord","South America":"Amerique du Sud",Oceania:"Oceanie"};h.GouvWorldMap=(bt=class extends He(x){constructor(){super(...arguments),this.source="",this.codeField="",this.valueField="",this.codeFormat="iso-a2",this.name="",this.selectedPalette="sequentialAscending",this.unitTooltip="",this.zoom="continent",this._data=[],this._topology=null,this._zoomedContinent=null,this._hoveredCountryId=null,this._tooltipX=0,this._tooltipY=0}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),de("gouv-world-map"),this._loadMap()}onSourceData(e){this._data=Array.isArray(e)?e:[]}async _loadMap(){try{this._topology=await tl(),this.requestUpdate()}catch(e){console.error("gouv-world-map: failed to load topology",e)}}_buildValueMap(){const e=new Map;if(!this._data.length||!this.codeField||!this.valueField)return e;for(const t of this._data){const i=String(q(t,this.codeField)??"").trim();if(!i)continue;const r=Xo(i,this.codeFormat);if(!r)continue;const n=Number(q(t,this.valueField));isNaN(n)||e.set(r,Math.round(n*100)/100)}return e}_getChoroplethPalette(){return qs[this.selectedPalette]||qs.sequentialAscending}_getColorScale(e){if(e.length===0)return()=>"#E5E5F4";const t=this._getChoroplethPalette(),i=[...e].sort((n,a)=>n-a),r=[];for(let n=1;n<t.length;n++)r.push(i[Math.floor(n/t.length*i.length)]);return n=>{let a=0;for(let o=0;o<r.length;o++)n>=r[o]&&(a=o+1);return t[Math.min(a,t.length-1)]}}_getFeatures(){if(!this._topology)return[];const e=this._topology.objects.countries;return Ho(this._topology,e).features}_getBorders(){if(!this._topology)return null;const e=this._topology.objects.countries;return Ko(this._topology,e,(t,i)=>t!==i)}_getProjection(){const e=zo().translate([qr/2,Vr/2]).scale(153);if(this._zoomedContinent){const t=this._getFeatures().filter(i=>js[i.id]===this._zoomedContinent);if(t.length>0){const i={type:"FeatureCollection",features:t};e.fitExtent([[Mi,Mi],[qr-Mi,Vr-Mi]],i)}}return e}_onCountryClick(e){if(this.zoom!=="none")if(this._zoomedContinent)this._zoomedContinent=null;else{const t=js[e];t&&(this._zoomedContinent=t)}}_onCountryHover(e,t){if(this._hoveredCountryId=t,t){const i=this.getBoundingClientRect();this._tooltipX=e.clientX-i.left+12,this._tooltipY=e.clientY-i.top-8}}_onBackClick(){this._zoomedContinent=null}_renderMap(){const e=this._getFeatures(),t=this._getBorders(),i=this._getProjection(),r=ko(i),n=this._buildValueMap(),a=[...n.values()],o=this._getColorScale(a),p="#F0F0F0",u=e.map(d=>{const f=r(d.geometry)||"",g=n.get(d.id),_=g!==void 0?o(g):p,S=this._hoveredCountryId===d.id;return Pn`<path
        class="gouv-world-map__country"
        d=${f}
        fill=${_}
        stroke=${S?"#000091":"none"}
        stroke-width=${S?"1.5":"0"}
        data-id=${d.id}
        style="cursor: ${this.zoom!=="none"?"pointer":"default"}"
        @click=${()=>this._onCountryClick(d.id)}
        @mouseenter=${b=>this._onCountryHover(b,d.id)}
        @mousemove=${b=>this._onCountryHover(b,d.id)}
        @mouseleave=${b=>this._onCountryHover(b,null)}
      />`}),c=t&&r(t)||"";return v`
      <div class="gouv-world-map__container" style="position: relative;">
        ${this._zoomedContinent?v`
          <button
            class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
            style="position: absolute; top: 8px; left: 8px; z-index: 2;"
            @click=${this._onBackClick}
            aria-label="Revenir a la vue monde">
            <span class="fr-icon-arrow-left-line" aria-hidden="true"></span>
            ${Vs[this._zoomedContinent]||this._zoomedContinent}
          </button>
        `:w}

        <svg
          viewBox="0 0 ${qr} ${Vr}"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label=${this._getAriaLabel()}
          style="width: 100%; height: auto; display: block;">
          <g class="gouv-world-map__countries">
            ${u}
          </g>
          ${c?Pn`<path
            class="gouv-world-map__borders"
            d=${c}
            fill="none"
            stroke="#fff"
            stroke-width="0.5"
            stroke-linejoin="round"
            pointer-events="none"
          />`:w}
        </svg>

        ${this._renderTooltip(n)}
        ${this._renderLegend(a,o)}
      </div>
    `}_renderTooltip(e){var n,a;if(!this._hoveredCountryId)return w;const t=el[this._hoveredCountryId]||((a=(n=this._getFeatures().find(o=>o.id===this._hoveredCountryId))==null?void 0:n.properties)==null?void 0:a.name)||this._hoveredCountryId,i=e.get(this._hoveredCountryId),r=i!==void 0?`${i.toLocaleString("fr-FR")}${this.unitTooltip?" "+this.unitTooltip:""}`:"Pas de donnees";return v`
      <div class="gouv-world-map__tooltip"
        style="position: absolute; left: ${this._tooltipX}px; top: ${this._tooltipY}px;
          pointer-events: none; z-index: 10;
          background: var(--background-default-grey, #fff);
          color: var(--text-default-grey, #161616);
          border: 1px solid var(--border-default-grey, #ddd);
          border-radius: 4px; padding: 4px 8px; font-size: 0.8125rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15); white-space: nowrap;">
        <strong>${t}</strong><br/>
        ${r}
      </div>
    `}_renderLegend(e,t){if(e.length===0)return w;const i=this._getChoroplethPalette(),r=[...e].sort((o,p)=>o-p),n=r[0],a=r[r.length-1];return v`
      <div class="gouv-world-map__legend" style="display: flex; align-items: center; gap: 4px;
        margin-top: 8px; font-size: 0.75rem; color: var(--text-mention-grey, #666);">
        ${this.name?v`<span style="margin-right: 4px; font-weight: 500;">${this.name}</span>`:w}
        <span>${n.toLocaleString("fr-FR")}</span>
        <div style="display: flex; height: 12px; border-radius: 2px; overflow: hidden;">
          ${i.map(o=>v`<div style="width: 20px; background: ${o};"></div>`)}
        </div>
        <span>${a.toLocaleString("fr-FR")}</span>
        ${this.unitTooltip?v`<span>${this.unitTooltip}</span>`:w}
      </div>
    `}_getAriaLabel(){const e=this._data.length;return`Carte ${this._zoomedContinent?Vs[this._zoomedContinent]||this._zoomedContinent:"monde"}, ${e} valeurs`}render(){return this._sourceLoading?v`
        <div class="gouv-world-map__loading" aria-live="polite">
          <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
          Chargement de la carte...
        </div>
        <style>
          .gouv-world-map__loading {
            display: flex; align-items: center; justify-content: center;
            gap: 0.5rem; padding: 2rem; color: var(--text-mention-grey, #666); font-size: 0.875rem;
          }
        </style>
      `:this._sourceError?v`
        <div class="gouv-world-map__error" aria-live="assertive">
          <span class="fr-icon-error-line" aria-hidden="true"></span>
          Erreur de chargement: ${this._sourceError.message}
        </div>
        <style>
          .gouv-world-map__error {
            display: flex; align-items: center; gap: 0.5rem; padding: 1rem;
            color: var(--text-default-error, #ce0500);
            background: var(--background-alt-red-marianne, #ffe5e5); border-radius: 4px;
          }
        </style>
      `:this._topology?!this._data||this._data.length===0?this._renderMap():this._renderMap():v`
        <div class="gouv-world-map__loading" aria-live="polite">
          <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
          Chargement de la carte...
        </div>
        <style>
          .gouv-world-map__loading {
            display: flex; align-items: center; justify-content: center;
            gap: 0.5rem; padding: 2rem; color: var(--text-mention-grey, #666); font-size: 0.875rem;
          }
        </style>
      `}},l(bt,"GouvWorldMap"),bt),ie([m({type:String})],h.GouvWorldMap.prototype,"source",void 0),ie([m({type:String,attribute:"code-field"})],h.GouvWorldMap.prototype,"codeField",void 0),ie([m({type:String,attribute:"value-field"})],h.GouvWorldMap.prototype,"valueField",void 0),ie([m({type:String,attribute:"code-format"})],h.GouvWorldMap.prototype,"codeFormat",void 0),ie([m({type:String})],h.GouvWorldMap.prototype,"name",void 0),ie([m({type:String,attribute:"selected-palette"})],h.GouvWorldMap.prototype,"selectedPalette",void 0),ie([m({type:String,attribute:"unit-tooltip"})],h.GouvWorldMap.prototype,"unitTooltip",void 0),ie([m({type:String})],h.GouvWorldMap.prototype,"zoom",void 0),ie([$()],h.GouvWorldMap.prototype,"_data",void 0),ie([$()],h.GouvWorldMap.prototype,"_topology",void 0),ie([$()],h.GouvWorldMap.prototype,"_zoomedContinent",void 0),ie([$()],h.GouvWorldMap.prototype,"_hoveredCountryId",void 0),ie([$()],h.GouvWorldMap.prototype,"_tooltipX",void 0),ie([$()],h.GouvWorldMap.prototype,"_tooltipY",void 0),h.GouvWorldMap=ie([Q("gouv-world-map")],h.GouvWorldMap);var $e=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};let il=0;const Hr=100;h.GouvChartA11y=(yt=class extends He(x){constructor(){super(...arguments),this.source="",this.for="",this.table=!1,this.download=!1,this.filename="donnees.csv",this.description="",this.labelField="",this.valueField="",this.label="",this.noAutoAria=!1,this._previousForTarget=null,this._injectedSkipLink=null}createRenderRoot(){return this}get _showAll(){return!this.table&&!this.download&&!this.description}get _showTable(){return this.table||this._showAll}get _showDownload(){return this.download||this._showAll}get _showDescription(){return!!this.description}connectedCallback(){super.connectedCallback(),de("gouv-chart-a11y"),this._ensureId(),this._injectSkipLink(),this._applyAria()}disconnectedCallback(){super.disconnectedCallback(),this._removeSkipLink(),this._removeAria()}updated(e){super.updated(e),(e.has("for")||e.has("noAutoAria"))&&(this._removeSkipLink(),this._removeAria(),this._injectSkipLink(),this._applyAria())}_ensureId(){this.id||(this.id=`gouv-chart-a11y-${++il}`)}_injectSkipLink(){if(this.noAutoAria||!this.for)return;const e=document.getElementById(this.for);if(!e)return;const t=document.createElement("a");t.href=`#${this.id}-section`,t.className="gouv-chart-a11y__skiplink",t.textContent="Voir les donnees accessibles",t.setAttribute("data-gouv-a11y-link",this.id),e.insertBefore(t,e.firstChild),this._injectedSkipLink=t}_removeSkipLink(){this._injectedSkipLink&&(this._injectedSkipLink.remove(),this._injectedSkipLink=null)}_applyAria(){if(this.noAutoAria||!this.for)return;const e=document.getElementById(this.for);if(!e)return;this._previousForTarget=e;const t=`${this.id}-desc`,i=e.getAttribute("aria-describedby")||"";if(!i.split(/\s+/).includes(t)){const r=i?`${i} ${t}`:t;e.setAttribute("aria-describedby",r)}this._showTable&&e.setAttribute("aria-details",`${this.id}-table`)}_removeAria(){if(!this._previousForTarget)return;const e=this._previousForTarget,t=`${this.id}-desc`,r=(e.getAttribute("aria-describedby")||"").split(/\s+/).filter(n=>n!==t);r.length>0?e.setAttribute("aria-describedby",r.join(" ")):e.removeAttribute("aria-describedby"),e.getAttribute("aria-details")===`${this.id}-table`&&e.removeAttribute("aria-details"),this._previousForTarget=null}_handleDownload(){const e=this._sourceData;if(!e||!Array.isArray(e)||e.length===0)return;const t=this._buildCsv(e);this._triggerDownload(t)}_buildCsv(e){const t=Object.keys(e[0]),i=t.join(";"),r=e.map(n=>t.map(a=>{const o=String(n[a]??"");return o.includes(";")||o.includes('"')?`"${o.replace(/"/g,'""')}"`:o}).join(";"));return[i,...r].join(`
`)}_triggerDownload(e){const t=new Blob([e],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(t),r=document.createElement("a");r.href=i,r.download=this.filename,r.click(),URL.revokeObjectURL(i)}_getColumns(e){if(this.labelField||this.valueField){const t=[];if(this.labelField&&t.push(this.labelField),this.valueField)for(const i of this.valueField.split(",").map(r=>r.trim()))i&&t.push(i);return t}return e.length===0?[]:Object.keys(e[0])}_getAutoDescription(e,t){if(!e)return"Aucune donnee disponible.";const r=[`Donnees du graphique : ${t.length} lignes.`];return this.description&&r.push(this.description),this._showDownload&&r.push("Telechargement CSV disponible."),this._showTable&&r.push("Tableau de donnees disponible."),r.join(" ")}render(){const e=this._sourceData,t=Array.isArray(e)&&e.length>0,i=this.label||"Accessibilite : donnees et description",r=`${this.id}-desc`,n=`${this.id}-table`,a=t?e:[],o=t?this._getColumns(a):[],p=a.slice(0,Hr),u=a.length>Hr;return v`
      <section class="gouv-chart-a11y"
               id="${this.id}-section"
               role="complementary"
               aria-label="${i}">

        <!-- Concise description for aria-describedby (sr-only) -->
        <p id="${r}" class="gouv-chart-a11y__sr-only">
          ${this._getAutoDescription(t,e)}
        </p>

        <details class="fr-accordion">
          <summary class="fr-accordion__btn">${i}</summary>
          <div class="fr-accordion__content">

            ${this._showDescription?v`
              <div class="fr-mb-2w">
                <p class="fr-text--sm">${this.description}</p>
              </div>
            `:w}

            ${this._showTable&&t?v`
              <div class="fr-table fr-mb-2w" id="${n}">
                <table>
                  <caption class="gouv-chart-a11y__sr-only">Donnees du graphique</caption>
                  <thead>
                    <tr>
                      ${o.map(c=>v`<th scope="col">${c}</th>`)}
                    </tr>
                  </thead>
                  <tbody>
                    ${p.map(c=>v`
                      <tr>
                        ${o.map(d=>v`<td>${c[d]??""}</td>`)}
                      </tr>
                    `)}
                  </tbody>
                </table>
                ${u?v`
                  <p class="fr-text--xs fr-mt-1w">
                    Affichage limite aux ${Hr} premieres lignes.
                    ${this._showDownload?"Telechargez le CSV pour les donnees completes.":""}
                  </p>
                `:w}
              </div>
            `:w}

            ${this._showDownload?v`
              <button
                class="fr-btn fr-btn--secondary fr-btn--sm fr-btn--icon-left fr-icon-download-line"
                @click="${this._handleDownload}"
                ?disabled="${!t||this._sourceLoading}"
                title="Telecharger les donnees (CSV)">
                Telecharger en CSV
              </button>
            `:w}

          </div>
        </details>
      </section>

      <style>
        .gouv-chart-a11y {
          margin-top: 0.5rem;
        }
        .gouv-chart-a11y__sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          margin: -1px;
          padding: 0;
          border: 0;
        }
        .gouv-chart-a11y__skiplink {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          margin: -1px;
          padding: 0;
          border: 0;
        }
        .gouv-chart-a11y__skiplink:focus {
          position: static;
          width: auto;
          height: auto;
          overflow: visible;
          clip: auto;
          white-space: normal;
          margin: 0;
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: var(--background-default-grey, #fff);
          color: var(--text-action-high-blue-france, #000091);
          text-decoration: underline;
          font-size: 0.875rem;
          z-index: 1;
        }
      </style>
    `}},l(yt,"GouvChartA11y"),yt),$e([m({type:String})],h.GouvChartA11y.prototype,"source",void 0),$e([m({type:String,attribute:"for"})],h.GouvChartA11y.prototype,"for",void 0),$e([m({type:Boolean})],h.GouvChartA11y.prototype,"table",void 0),$e([m({type:Boolean})],h.GouvChartA11y.prototype,"download",void 0),$e([m({type:String})],h.GouvChartA11y.prototype,"filename",void 0),$e([m({type:String})],h.GouvChartA11y.prototype,"description",void 0),$e([m({type:String,attribute:"label-field"})],h.GouvChartA11y.prototype,"labelField",void 0),$e([m({type:String,attribute:"value-field"})],h.GouvChartA11y.prototype,"valueField",void 0),$e([m({type:String})],h.GouvChartA11y.prototype,"label",void 0),$e([m({type:Boolean,attribute:"no-auto-aria"})],h.GouvChartA11y.prototype,"noAutoAria",void 0),h.GouvChartA11y=$e([Q("gouv-chart-a11y")],h.GouvChartA11y);var Oe=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};let Ne=(St=class extends x{constructor(){super(...arguments),this._open=!1,this._tab="login",this._error="",this._loading=!1,this._email="",this._password="",this._displayName=""}createRenderRoot(){return this}open(e="login"){this._tab=e,this._error="",this._email="",this._password="",this._displayName="",this._open=!0}close(){this._open=!1}async _handleSubmit(e){e.preventDefault(),this._error="",this._loading=!0;try{if(this._tab==="login"){const t=await Wa({email:this._email,password:this._password});if(!t.success){this._error=t.error||"Identifiants incorrects";return}}else{if(!this._displayName.trim()){this._error="Le nom est requis";return}const t=await Ka({email:this._email,password:this._password,displayName:this._displayName});if(!t.success){this._error=t.error||"Erreur lors de l'inscription";return}}this.close(),window.location.reload()}finally{this._loading=!1}}_switchTab(e){this._tab=e,this._error=""}render(){if(!this._open)return w;const e=this._tab==="login";return v`
      <dialog class="fr-modal fr-modal--opened" role="dialog" aria-labelledby="auth-modal-title" aria-modal="true"
              style="display:flex" @click=${t=>{t.target===t.currentTarget&&this.close()}}>
        <div class="fr-container fr-container--fluid fr-container-md">
          <div class="fr-grid-row fr-grid-row--center">
            <div class="fr-col-12 fr-col-md-6 fr-col-lg-4">
              <div class="fr-modal__body">
                <div class="fr-modal__header">
                  <button class="fr-btn--close fr-btn" title="Fermer"
                          @click=${()=>this.close()}>Fermer</button>
                </div>
                <div class="fr-modal__content">
                  <h1 id="auth-modal-title" class="fr-modal__title">
                    ${e?"Connexion":"Inscription"}
                  </h1>

                  <!-- Tabs -->
                  <div class="fr-tabs" style="margin-bottom:1rem">
                    <ul class="fr-tabs__list" role="tablist">
                      <li role="presentation">
                        <button class="fr-tabs__tab ${e?"fr-tabs__tab--selected":""}"
                                role="tab" aria-selected="${e}"
                                @click=${()=>this._switchTab("login")}>
                          Connexion
                        </button>
                      </li>
                      <li role="presentation">
                        <button class="fr-tabs__tab ${e?"":"fr-tabs__tab--selected"}"
                                role="tab" aria-selected="${!e}"
                                @click=${()=>this._switchTab("register")}>
                          Inscription
                        </button>
                      </li>
                    </ul>
                  </div>

                  ${this._error?v`
                    <div class="fr-alert fr-alert--error fr-alert--sm" style="margin-bottom:1rem">
                      <p>${this._error}</p>
                    </div>
                  `:w}

                  <form @submit=${this._handleSubmit}>
                    ${e?w:v`
                      <div class="fr-input-group">
                        <label class="fr-label" for="auth-name">Nom d'affichage</label>
                        <input class="fr-input" type="text" id="auth-name"
                               .value=${this._displayName}
                               @input=${t=>{this._displayName=t.target.value}}
                               required>
                      </div>
                    `}

                    <div class="fr-input-group">
                      <label class="fr-label" for="auth-email">Email</label>
                      <input class="fr-input" type="email" id="auth-email" autocomplete="email"
                             .value=${this._email}
                             @input=${t=>{this._email=t.target.value}}
                             required>
                    </div>

                    <div class="fr-input-group">
                      <label class="fr-label" for="auth-password">Mot de passe</label>
                      <input class="fr-input" type="password" id="auth-password"
                             autocomplete="${e?"current-password":"new-password"}"
                             minlength="6"
                             .value=${this._password}
                             @input=${t=>{this._password=t.target.value}}
                             required>
                      ${e?w:v`<p class="fr-hint-text">6 caracteres minimum</p>`}
                    </div>

                    <div class="fr-input-group" style="margin-top:1.5rem">
                      <button class="fr-btn" type="submit" ?disabled=${this._loading}
                              style="width:100%">
                        ${this._loading?"Chargement...":e?"Se connecter":"S'inscrire"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    `}},l(St,"AuthModal"),St);Oe([$()],Ne.prototype,"_open",void 0),Oe([$()],Ne.prototype,"_tab",void 0),Oe([$()],Ne.prototype,"_error",void 0),Oe([$()],Ne.prototype,"_loading",void 0),Oe([$()],Ne.prototype,"_email",void 0),Oe([$()],Ne.prototype,"_password",void 0),Oe([$()],Ne.prototype,"_displayName",void 0),Ne=Oe([Q("auth-modal")],Ne);var Le=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.AppHeader=(wt=class extends x{constructor(){super(...arguments),this.currentPage="",this.basePath="",this._favCount=0,this._user=null,this._dbMode=!1,this._syncStatus="idle",this._syncErrorCount=0}createRenderRoot(){return this}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}connectedCallback(){super.connectedCallback();try{const e=JSON.parse(localStorage.getItem("gouv-widgets-favorites")||"[]");this._favCount=Array.isArray(e)?e.length:0}catch{}if(!document.getElementById("app-header-active-style")){const e=document.createElement("style");e.id="app-header-active-style",e.textContent='.fr-nav__link[aria-current="page"]{font-weight:700;border-bottom:2px solid var(--border-action-high-blue-france);color:var(--text-action-high-blue-france)}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}',document.head.appendChild(e)}this._initAuth(),this._unsubSync=za((e,t)=>{this._syncStatus=e,this._syncErrorCount=t})}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this._unsubAuth)==null||e.call(this),(t=this._unsubSync)==null||t.call(this)}async _initAuth(){try{const e=await Va();this._dbMode=await Hn(),this._user=e.user,this._unsubAuth=Ja(t=>{this._user=t.user})}catch{}}_openAuthModal(){const e=this.querySelector("auth-modal");e==null||e.open("login")}async _handleLogout(){await Qa(),window.location.reload()}_getNavItems(){return[{id:"accueil",label:"Accueil",href:"index.html"},{id:"composants",label:"Composants",href:"specs/index.html"},{id:"sources",label:"Sources",href:"apps/sources/index.html"},{id:"builder",label:"Builder",href:"apps/builder/index.html"},{id:"builder-ia",label:"Builder IA",href:"apps/builder-ia/index.html"},{id:"playground",label:"Playground",href:"apps/playground/index.html"},{id:"dashboard",label:"Dashboard",href:"apps/dashboard/index.html"},{id:"monitoring",label:"Monitoring",href:"apps/monitoring/index.html"}]}_renderSyncStatus(){return!this._dbMode||this._syncStatus==="idle"&&this._syncErrorCount===0?w:this._syncStatus==="syncing"?v`
        <li>
          <span class="fr-btn fr-btn--tertiary-no-outline" style="pointer-events:none;color:var(--text-mention-grey);" title="Synchronisation en cours...">
            <i class="ri-refresh-line" style="animation:spin 1s linear infinite;"></i>
          </span>
        </li>
      `:this._syncStatus==="error"||this._syncErrorCount>0?v`
        <li>
          <span class="fr-btn fr-btn--tertiary-no-outline" style="pointer-events:none;color:var(--text-default-warning);" title="Erreurs de synchronisation (${this._syncErrorCount})">
            <i class="ri-error-warning-line"></i>
          </span>
        </li>
      `:w}_renderAuthButton(){return this._dbMode?this._user?v`
        <li>
          <span class="fr-btn fr-btn--tertiary-no-outline fr-icon-account-circle-line" style="pointer-events:none;">
            ${this._user.displayName||this._user.email}
          </span>
        </li>
        <li>
          <button class="fr-btn fr-btn--tertiary-no-outline fr-icon-logout-box-r-line"
                  @click=${this._handleLogout}>
            Deconnexion
          </button>
        </li>
      `:v`
      <li>
        <button class="fr-btn fr-btn--tertiary-no-outline fr-icon-account-circle-line"
                @click=${this._openAuthModal}>
          Connexion
        </button>
      </li>
    `:w}render(){const e=this._getNavItems();return v`
      <div class="fr-skiplinks">
        <nav class="fr-container" role="navigation" aria-label="Accès rapide">
          <ul class="fr-skiplinks__list">
            <li><a class="fr-link" href="#main-content">Contenu</a></li>
            <li><a class="fr-link" href="${this._base}specs/index.html">Composants</a></li>
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
                  <p class="fr-header__service-tagline" style="display:flex;align-items:center;gap:0.5rem;">
                    <span class="fr-badge fr-badge--sm fr-badge--warning fr-badge--no-icon">En developpement</span>
                    Création de visualisations dynamiques conformes DSFR
                  </p>
                </div>
              </div>
              <div class="fr-header__tools">
                <div class="fr-header__tools-links">
                  <ul class="fr-btns-group">
                    <li>
                      <a class="fr-btn fr-btn--tertiary-no-outline fr-icon-book-2-line" href="${this._base}guide/guide.html">
                        Guide
                      </a>
                    </li>
                    <li>
                      <a class="fr-btn fr-btn--tertiary-no-outline fr-icon-star-fill" href="${this._base}apps/favorites/index.html">
                        Favoris${this._favCount>0?v` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>`:w}
                      </a>
                    </li>
                    ${this._renderSyncStatus()}
                    ${this._renderAuthButton()}
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
                ${e.map(t=>v`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this._base}${t.href}"
                       ${this.currentPage===t.id?v`aria-current="page"`:""}>
                      ${t.label}
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      ${this._dbMode?v`<auth-modal></auth-modal>`:w}
    `}},l(wt,"AppHeader"),wt),Le([m({type:String,attribute:"current-page"})],h.AppHeader.prototype,"currentPage",void 0),Le([m({type:String,attribute:"base-path"})],h.AppHeader.prototype,"basePath",void 0),Le([$()],h.AppHeader.prototype,"_favCount",void 0),Le([$()],h.AppHeader.prototype,"_user",void 0),Le([$()],h.AppHeader.prototype,"_dbMode",void 0),Le([$()],h.AppHeader.prototype,"_syncStatus",void 0),Le([$()],h.AppHeader.prototype,"_syncErrorCount",void 0),h.AppHeader=Le([Q("app-header")],h.AppHeader);var Hs=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.AppFooter=($t=class extends x{constructor(){super(...arguments),this.basePath=""}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}createRenderRoot(){return this}render(){return v`
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
    `}},l($t,"AppFooter"),$t),Hs([m({type:String,attribute:"base-path"})],h.AppFooter.prototype,"basePath",void 0),h.AppFooter=Hs([Q("app-footer")],h.AppFooter);var lt=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.AppLayoutBuilder=(At=class extends x{constructor(){super(...arguments),this.leftRatio=40,this.minLeftWidth=280,this.minRightWidth=300,this._isResizing=!1,this._currentLeftRatio=40,this._leftContent=[],this._rightContent=[],this._contentMoved=!1,this._boundMouseMove=null,this._boundMouseUp=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._currentLeftRatio=this.leftRatio,this._setupResizer(),this._saveSlotContent()}_saveSlotContent(){this._leftContent=Array.from(this.querySelectorAll('[slot="left"]')),this._rightContent=Array.from(this.querySelectorAll('[slot="right"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".builder-layout-left"),t=this.querySelector(".builder-layout-right");e&&t&&(this._leftContent.forEach(i=>e.appendChild(i)),this._rightContent.forEach(i=>t.appendChild(i)),this._contentMoved=!0)}disconnectedCallback(){super.disconnectedCallback(),this._cleanupResizer()}_setupResizer(){this._boundMouseMove=this._handleMouseMove.bind(this),this._boundMouseUp=this._handleMouseUp.bind(this)}_cleanupResizer(){this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp)}_handleMouseDown(e){e.preventDefault(),this._isResizing=!0,document.body.style.cursor="col-resize",document.body.style.userSelect="none",this._boundMouseMove&&document.addEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.addEventListener("mouseup",this._boundMouseUp)}_handleMouseMove(e){if(!this._isResizing)return;const t=this.querySelector(".builder-layout-container");if(!t)return;const i=t.getBoundingClientRect(),r=i.width;let n=e.clientX-i.left;n=Math.max(this.minLeftWidth,Math.min(n,r-this.minRightWidth)),this._currentLeftRatio=n/r*100,this.requestUpdate()}_handleMouseUp(){this._isResizing&&(this._isResizing=!1,document.body.style.cursor="",document.body.style.userSelect="",this._boundMouseMove&&document.removeEventListener("mousemove",this._boundMouseMove),this._boundMouseUp&&document.removeEventListener("mouseup",this._boundMouseUp))}render(){return v`
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
        }

        .builder-layout-left {
          overflow-y: auto;
          overflow-x: hidden;
          border-right: 1px solid var(--border-default-grey);
          background: var(--background-alt-grey);
          display: flex;
          flex-direction: column;
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
    `}},l(At,"AppLayoutBuilder"),At),lt([m({type:Number,attribute:"left-ratio"})],h.AppLayoutBuilder.prototype,"leftRatio",void 0),lt([m({type:Number,attribute:"min-left-width"})],h.AppLayoutBuilder.prototype,"minLeftWidth",void 0),lt([m({type:Number,attribute:"min-right-width"})],h.AppLayoutBuilder.prototype,"minRightWidth",void 0),lt([$()],h.AppLayoutBuilder.prototype,"_isResizing",void 0),lt([$()],h.AppLayoutBuilder.prototype,"_currentLeftRatio",void 0),h.AppLayoutBuilder=lt([Q("app-layout-builder")],h.AppLayoutBuilder);var Yt=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};h.AppLayoutDemo=(Ct=class extends x{constructor(){super(...arguments),this.title="",this.icon="",this.activePath="",this.basePath="",this._contentElements=[],this._contentMoved=!1}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._contentElements=Array.from(this.querySelectorAll('[slot="content"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector(".demo-content-slot");e&&(this._contentElements.forEach(t=>e.appendChild(t)),this._contentMoved=!0)}_getMenuStructure(){return[{id:"overview",label:"Vue d'ensemble",href:"index.html"},{id:"apis",label:"API supportees",href:"#",children:[{id:"apis/opendatasoft",label:"OpenDataSoft",href:"apis/opendatasoft.html"},{id:"apis/tabular",label:"Tabular",href:"apis/tabular.html"},{id:"apis/grist",label:"Grist",href:"apis/grist.html"},{id:"apis/insee",label:"INSEE (Melodi)",href:"apis/insee.html"},{id:"apis/generic",label:"Generique (REST)",href:"apis/generic.html"}]},{id:"components",label:"Composants gouv-widgets",href:"#",children:[{id:"components/gouv-source",label:"gouv-source",href:"components/gouv-source.html"},{id:"components/gouv-normalize",label:"gouv-normalize",href:"components/gouv-normalize.html"},{id:"components/gouv-query",label:"gouv-query",href:"components/gouv-query.html"},{id:"components/gouv-facets",label:"gouv-facets",href:"components/gouv-facets.html"},{id:"components/gouv-search",label:"gouv-search",href:"components/gouv-search.html"},{id:"components/gouv-kpi",label:"gouv-kpi",href:"components/gouv-kpi.html"},{id:"components/gouv-datalist",label:"gouv-datalist",href:"components/gouv-datalist.html"},{id:"components/gouv-display",label:"gouv-display",href:"components/gouv-display.html"},{id:"components/gouv-world-map",label:"gouv-world-map",href:"components/gouv-world-map.html"},{id:"components/gouv-chart-a11y",label:"gouv-chart-a11y",href:"components/gouv-chart-a11y.html"},{id:"components/gouv-dsfr-chart",label:"gouv-dsfr-chart",href:"components/gouv-dsfr-chart.html"}]},{id:"charts",label:"Composants dsfr-charts",href:"#",children:[{id:"charts/line-chart",label:"line-chart",href:"charts/line-chart.html"},{id:"charts/bar-chart",label:"bar-chart",href:"charts/bar-chart.html"},{id:"charts/pie-chart",label:"pie-chart",href:"charts/pie-chart.html"},{id:"charts/radar-chart",label:"radar-chart",href:"charts/radar-chart.html"},{id:"charts/gauge-chart",label:"gauge-chart",href:"charts/gauge-chart.html"},{id:"charts/map-chart",label:"map-chart",href:"charts/map-chart.html"},{id:"charts/scatter-chart",label:"scatter-chart",href:"charts/scatter-chart.html"}]}]}_isActive(e){return this.activePath===e}_isParentActive(e){return e.children?e.children.some(t=>this._isActive(t.id)):!1}_renderMenuItem(e){const t=this._isActive(e.id),i=this._isParentActive(e);if(e.children){const r=`fr-sidemenu-${e.id}`,n=i;return v`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${n}"
                  aria-controls="${r}">
            ${e.label}
          </button>
          <div class="fr-collapse ${n?"fr-collapse--expanded":""}" id="${r}">
            <ul class="fr-sidemenu__list">
              ${e.children.map(a=>this._renderMenuItem(a))}
            </ul>
          </div>
        </li>
      `}else return v`
        <li class="fr-sidemenu__item ${t?"fr-sidemenu__item--active":""}">
          <a class="fr-sidemenu__link"
             href="${this._base}${e.href}"
             ${t?v`aria-current="page"`:""}>
            ${e.label}
          </a>
        </li>
      `}_renderBreadcrumb(){if(!this.activePath||this.activePath==="overview")return"";const e=this.activePath.split("/"),t=[{label:"Composants",href:`${this._base}index.html`}];if(e.length>1){const i=e[0]==="components"?"Composants gouv-widgets":"Composants dsfr-charts";t.push({label:i,href:"#"})}return t.push({label:this.title,href:""}),v`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((i,r)=>v`
              <li>
                ${r===t.length-1?v`<a class="fr-breadcrumb__link" aria-current="page">${i.label}</a>`:v`<a class="fr-breadcrumb__link" href="${i.href}">${i.label}</a>`}
              </li>
            `)}
          </ol>
        </div>
      </nav>
    `}render(){const e=this._getMenuStructure();return v`
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

            ${this.title?v`
              <h1>
                ${this.icon?v`<span class="${this.icon} fr-mr-1w" aria-hidden="true"></span>`:""}
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
    `}},l(Ct,"AppLayoutDemo"),Ct),Yt([m({type:String})],h.AppLayoutDemo.prototype,"title",void 0),Yt([m({type:String})],h.AppLayoutDemo.prototype,"icon",void 0),Yt([m({type:String,attribute:"active-path"})],h.AppLayoutDemo.prototype,"activePath",void 0),Yt([m({type:String,attribute:"base-path"})],h.AppLayoutDemo.prototype,"basePath",void 0),h.AppLayoutDemo=Yt([Q("app-layout-demo")],h.AppLayoutDemo);var Ni=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};let Zt=(Pt=class extends x{constructor(){super(...arguments),this.section="",this.activePath="",this.basePath=""}createRenderRoot(){return this}get _base(){const e=this.basePath;return e?e.endsWith("/")?e:e+"/":""}_getMenu(){var e;return((e=window.__APP_MENUS__)==null?void 0:e[this.section])??[]}_getActivePath(){if(this.activePath)return this.activePath;const t=window.location.pathname.split("/").pop()||"",i=window.location.hash,r=this._getMenu();for(const n of r)for(const a of n.items){const o=this._findMatchingItem(a,t,i);if(o)return o}return""}_findMatchingItem(e,t,i){const r=e.href;if(i&&r===t+i||r===t||i&&r===i)return e.id;if(e.children){for(const n of e.children){const a=this._findMatchingItem(n,t,i);if(a)return a}if(!i){const n=e.children.find(a=>{const[o]=(a.href||"").split("#");return o===t});if(n)return n.id}}return null}_isActive(e,t){return t===e}_isParentActive(e,t){return e.children?e.children.some(i=>this._isActive(i.id,t)||this._isParentActive(i,t)):!1}_renderItem(e,t){const i=this._isActive(e.id,t);if(e.children){const r=`fr-sidemenu-${e.id}`,n=this._isParentActive(e,t);return v`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${n}"
                  aria-controls="${r}">
            ${e.label}
          </button>
          <div class="fr-collapse ${n?"fr-collapse--expanded":""}" id="${r}">
            <ul class="fr-sidemenu__list">
              ${e.children.map(a=>this._renderItem(a,t))}
            </ul>
          </div>
        </li>
      `}return v`
      <li class="fr-sidemenu__item ${i?"fr-sidemenu__item--active":""}">
        <a class="fr-sidemenu__link"
           href="${this._base}${e.href}"
           ${i?v`aria-current="true"`:w}>
          ${e.label}
        </a>
      </li>
    `}render(){const e=this._getMenu();if(!e.length)return w;const t=this._getActivePath();return v`
      <nav class="fr-sidemenu guide-sidemenu" role="navigation" aria-labelledby="app-sidemenu-title">
        <div class="fr-sidemenu__inner">
          <button class="fr-sidemenu__btn" hidden aria-controls="app-sidemenu-wrapper" aria-expanded="true">Menu</button>
          <div class="fr-collapse" id="app-sidemenu-wrapper">
            ${e.map((i,r)=>v`
              ${i.title?v`
                <div class="fr-sidemenu__title ${r>0?"fr-mt-1w":""}"
                     id="${r===0?"app-sidemenu-title":`app-sidemenu-title-${r}`}">
                  ${i.title}
                </div>
              `:w}
              <ul class="fr-sidemenu__list">
                ${i.items.map(n=>this._renderItem(n,t))}
              </ul>
            `)}
          </div>
        </div>
      </nav>

      <style>
        .guide-sidemenu {
          flex: 0 0 280px;
          position: sticky;
          top: 1rem;
          height: fit-content;
          max-height: calc(100vh - 2rem);
          overflow-y: auto;
        }
        @media (max-width: 992px) {
          .guide-sidemenu {
            position: static;
            flex: none;
            max-height: none;
          }
        }
        .fr-sidemenu__link[aria-current="true"] {
          font-weight: 700;
          color: var(--text-action-high-blue-france);
        }
      </style>
    `}},l(Pt,"AppSidemenu"),Pt);Ni([m({type:String})],Zt.prototype,"section",void 0),Ni([m({type:String,attribute:"active-path"})],Zt.prototype,"activePath",void 0),Ni([m({type:String,attribute:"base-path"})],Zt.prototype,"basePath",void 0),Zt=Ni([Q("app-sidemenu")],Zt);var Qe=function(s,e,t,i){var r=arguments.length,n=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,t,i);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(n=(r<3?a(n):r>3?a(e,t,n):a(e,t))||n);return r>3&&n&&Object.defineProperty(e,t,n),n};let Be=(Et=class extends x{constructor(){super(...arguments),this.showDataTab=!1,this.showSaveButton=!1,this.showPlaygroundButton=!1,this.tabLabels="Aperçu,Code,Données",this.activeTab="preview",this._activeTab="preview",this._previewContent=[],this._codeContent=[],this._dataContent=[],this._contentMoved=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._activeTab=this.activeTab,this._saveSlotContent()}_saveSlotContent(){this._previewContent=Array.from(this.querySelectorAll('[slot="preview"]')),this._codeContent=Array.from(this.querySelectorAll('[slot="code"]')),this._dataContent=Array.from(this.querySelectorAll('[slot="data"]'))}firstUpdated(){this._moveContent()}updated(){this._contentMoved||this._moveContent()}_moveContent(){const e=this.querySelector("#tab-preview"),t=this.querySelector("#tab-code"),i=this.querySelector("#tab-data");e&&this._previewContent.forEach(r=>e.appendChild(r)),t&&this._codeContent.forEach(r=>t.appendChild(r)),i&&this._dataContent.forEach(r=>i.appendChild(r)),this._contentMoved=!0}setActiveTab(e){this._activeTab=e,this.requestUpdate()}getActiveTab(){return this._activeTab}_handleTabClick(e){this._activeTab=e,this.dispatchEvent(new CustomEvent("tab-change",{detail:{tab:e},bubbles:!0,composed:!0})),this.requestUpdate()}_getTabLabels(){return this.tabLabels.split(",").map(e=>e.trim())}_handleSaveClick(){this.dispatchEvent(new CustomEvent("save-favorite",{bubbles:!0,composed:!0}))}_handlePlaygroundClick(){this.dispatchEvent(new CustomEvent("open-playground",{bubbles:!0,composed:!0}))}render(){const e=this._getTabLabels(),[t,i,r]=e;return v`
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
          ${this.showDataTab?v`
            <button
              class="preview-panel-tab ${this._activeTab==="data"?"active":""}"
              data-tab="data"
              @click="${()=>this._handleTabClick("data")}">
              ${r||"Données"}
            </button>
          `:w}
          ${this.showPlaygroundButton?v`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          `:w}
          ${this.showSaveButton?v`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          `:w}
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
    `}},l(Et,"AppPreviewPanel"),Et);Qe([m({type:Boolean,attribute:"show-data-tab"})],Be.prototype,"showDataTab",void 0),Qe([m({type:Boolean,attribute:"show-save-button"})],Be.prototype,"showSaveButton",void 0),Qe([m({type:Boolean,attribute:"show-playground-button"})],Be.prototype,"showPlaygroundButton",void 0),Qe([m({type:String,attribute:"tab-labels"})],Be.prototype,"tabLabels",void 0),Qe([m({type:String,attribute:"active-tab"})],Be.prototype,"activeTab",void 0),Qe([$()],Be.prototype,"_activeTab",void 0),Be=Qe([Q("app-preview-panel")],Be);function Ws(s,e,t){return s.map(i=>({label:String(q(i,e)??"N/A"),value:Number(q(i,t))||0}))}l(Ws,"extractLabelValues");function Ks(s,e){if(e==="none")return s;const t=new Map;for(const r of s){const n=t.get(r.label)||[];n.push(r.value),t.set(r.label,n)}const i=[];for(const[r,n]of t)i.push({label:r,value:rl(n,e)});return i}l(Ks,"aggregateByLabel");function rl(s,e){switch(e){case"sum":return s.reduce((t,i)=>t+i,0);case"avg":return s.reduce((t,i)=>t+i,0)/s.length;case"count":return s.length;case"min":return Math.min(...s);case"max":return Math.max(...s);default:return s[0]||0}}l(rl,"computeGroupValue");function Qs(s,e){return e==="none"?s:[...s].sort((t,i)=>e==="desc"?i.value-t.value:t.value-i.value)}l(Qs,"sortByValue");function nl(s,e,t,i="none",r="none",n=0){if(!s||s.length===0)return{labels:[],values:[]};let a=Ws(s,e,t);return a=Ks(a,i),a=Qs(a,r),n>0&&(a=a.slice(0,n)),{labels:a.map(o=>o.label),values:a.map(o=>Math.round(o.value*100)/100)}}l(nl,"processChartData"),h.DATA_EVENTS=ae,h.SourceSubscriberMixin=He,h.aggregateByLabel=Ks,h.computeAggregation=Sr,h.dispatchDataError=Ae,h.dispatchDataLoaded=oe,h.dispatchDataLoading=Te,h.extractLabelValues=Ws,h.formatCurrency=rs,h.formatDate=eo,h.formatNumber=yr,h.formatPercentage=is,h.formatValue=br,h.getAdapter=ts,h.getByPath=q,h.getByPathOrDefault=Na,h.getDataCache=Ge,h.hasPath=Ma,h.parseExpression=ns,h.processChartData=nl,h.registerAdapter=Ya,h.sortByValue=Qs,h.subscribeToSource=rt,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})}));
