var or = Object.defineProperty;
var h = (n, e) => or(n, "name", { value: e, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ze = globalThis, ht = ze.ShadowRoot && (ze.ShadyCSS === void 0 || ze.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, dt = Symbol(), Mt = /* @__PURE__ */ new WeakMap();
var ie;
let Zt = (ie = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== dt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ht && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = Mt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Mt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}, h(ie, "n"), ie);
const lr = /* @__PURE__ */ h((n) => new Zt(typeof n == "string" ? n : n + "", void 0, dt), "r$4"), Xt = /* @__PURE__ */ h((n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((r, i, s) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[s + 1], n[0]);
  return new Zt(t, n, dt);
}, "i$3"), cr = /* @__PURE__ */ h((n, e) => {
  if (ht) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = ze.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
  }
}, "S$1"), Ft = ht ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return lr(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ur, defineProperty: hr, getOwnPropertyDescriptor: dr, getOwnPropertyNames: pr, getOwnPropertySymbols: fr, getPrototypeOf: gr } = Object, V = globalThis, Ut = V.trustedTypes, _r = Ut ? Ut.emptyScript : "", We = V.reactiveElementPolyfillSupport, Ce = /* @__PURE__ */ h((n, e) => n, "d$1"), Be = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? _r : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, pt = /* @__PURE__ */ h((n, e) => !ur(n, e), "f$1"), Tt = { attribute: !0, type: String, converter: Be, reflect: !1, useDefault: !1, hasChanged: pt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), V.litPropertyMetadata ?? (V.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var se;
let re = (se = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Tt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && hr(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: s } = dr(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const o = i == null ? void 0 : i.call(this);
      s == null || s.call(this, a), this.requestUpdate(e, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ce("elementProperties"))) return;
    const e = gr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ce("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ce("properties"))) {
      const t = this.properties, r = [...pr(t), ...fr(t)];
      for (const i of r) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, i] of t) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const i = this._$Eu(t, r);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) t.unshift(Ft(i));
    } else e !== void 0 && t.push(Ft(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return cr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostConnected) == null ? void 0 : r.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostDisconnected) == null ? void 0 : r.call(t);
    });
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    var s;
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const a = (((s = r.converter) == null ? void 0 : s.toAttribute) !== void 0 ? r.converter : Be).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, a;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? o.converter : Be;
      this._$Em = i;
      const u = l.fromAttribute(t, o.type);
      this[i] = u ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, s) {
    var a;
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (s = this[e]), r ?? (r = o.getPropertyOptions(e)), !((r.hasChanged ?? pt)(s, t) || r.useDefault && r.reflect && s === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: s }, a) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), s !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, a] of i) {
        const { wrapped: o } = a, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, a, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this._$EO) == null || r.forEach((i) => {
        var s;
        return (s = i.hostUpdate) == null ? void 0 : s.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}, h(se, "y"), se);
re.elementStyles = [], re.shadowRootOptions = { mode: "open" }, re[Ce("elementProperties")] = /* @__PURE__ */ new Map(), re[Ce("finalized")] = /* @__PURE__ */ new Map(), We == null || We({ ReactiveElement: re }), (V.reactiveElementVersions ?? (V.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis, Ot = /* @__PURE__ */ h((n) => n, "i$1"), je = Ae.trustedTypes, Lt = je ? je.createPolicy("lit-html", { createHTML: /* @__PURE__ */ h((n) => n, "createHTML") }) : void 0, Yt = "$lit$", H = `lit$${Math.random().toFixed(9).slice(2)}$`, er = "?" + H, mr = `<${er}>`, Y = document, ke = /* @__PURE__ */ h(() => Y.createComment(""), "c"), Re = /* @__PURE__ */ h((n) => n === null || typeof n != "object" && typeof n != "function", "a"), ft = Array.isArray, br = /* @__PURE__ */ h((n) => ft(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", "d"), Qe = `[ 	
\f\r]`, xe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nt = /-->/g, zt = />/g, K = RegExp(`>|${Qe}(?:([^\\s"'>=/]+)(${Qe}*=${Qe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Bt = /'/g, jt = /"/g, tr = /^(?:script|style|textarea|title)$/i, vr = /* @__PURE__ */ h((n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), "x"), d = vr(1), ve = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), It = /* @__PURE__ */ new WeakMap(), Z = Y.createTreeWalker(Y, 129);
function rr(n, e) {
  if (!ft(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Lt !== void 0 ? Lt.createHTML(e) : e;
}
h(rr, "V");
const yr = /* @__PURE__ */ h((n, e) => {
  const t = n.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = xe;
  for (let o = 0; o < t; o++) {
    const l = n[o];
    let u, f, p = -1, g = 0;
    for (; g < l.length && (a.lastIndex = g, f = a.exec(l), f !== null); ) g = a.lastIndex, a === xe ? f[1] === "!--" ? a = Nt : f[1] !== void 0 ? a = zt : f[2] !== void 0 ? (tr.test(f[2]) && (i = RegExp("</" + f[2], "g")), a = K) : f[3] !== void 0 && (a = K) : a === K ? f[0] === ">" ? (a = i ?? xe, p = -1) : f[1] === void 0 ? p = -2 : (p = a.lastIndex - f[2].length, u = f[1], a = f[3] === void 0 ? K : f[3] === '"' ? jt : Bt) : a === jt || a === Bt ? a = K : a === Nt || a === zt ? a = xe : (a = K, i = void 0);
    const _ = a === K && n[o + 1].startsWith("/>") ? " " : "";
    s += a === xe ? l + mr : p >= 0 ? (r.push(u), l.slice(0, p) + Yt + l.slice(p) + H + _) : l + H + (p === -2 ? o : _);
  }
  return [rr(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
}, "N"), Ie = class Ie {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let s = 0, a = 0;
    const o = e.length - 1, l = this.parts, [u, f] = yr(e, t);
    if (this.el = Ie.createElement(u, r), Z.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = Z.nextNode()) !== null && l.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Yt)) {
          const g = f[a++], _ = i.getAttribute(p).split(H), C = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: s, name: C[2], strings: _, ctor: C[1] === "." ? rt : C[1] === "?" ? it : C[1] === "@" ? st : $e }), i.removeAttribute(p);
        } else p.startsWith(H) && (l.push({ type: 6, index: s }), i.removeAttribute(p));
        if (tr.test(i.tagName)) {
          const p = i.textContent.split(H), g = p.length - 1;
          if (g > 0) {
            i.textContent = je ? je.emptyScript : "";
            for (let _ = 0; _ < g; _++) i.append(p[_], ke()), Z.nextNode(), l.push({ type: 2, index: ++s });
            i.append(p[g], ke());
          }
        }
      } else if (i.nodeType === 8) if (i.data === er) l.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(H, p + 1)) !== -1; ) l.push({ type: 7, index: s }), p += H.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const r = Y.createElement("template");
    return r.innerHTML = e, r;
  }
};
h(Ie, "S");
let Ee = Ie;
function ye(n, e, t = n, r) {
  var a, o;
  if (e === ve) return e;
  let i = r !== void 0 ? (a = t._$Co) == null ? void 0 : a[r] : t._$Cl;
  const s = Re(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), s === void 0 ? i = void 0 : (i = new s(n), i._$AT(n, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = i : t._$Cl = i), i !== void 0 && (e = ye(n, i._$AS(n, e.values), i, r)), e;
}
h(ye, "M");
const yt = class yt {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? Y).importNode(t, !0);
    Z.currentNode = i;
    let s = Z.nextNode(), a = 0, o = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new De(s, s.nextSibling, this, e) : l.type === 1 ? u = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (u = new at(s, this, e)), this._$AV.push(u), l = r[++o];
      }
      a !== (l == null ? void 0 : l.index) && (s = Z.nextNode(), a++);
    }
    return Z.currentNode = Y, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
};
h(yt, "R");
let tt = yt;
const qe = class qe {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = ye(this, e, t), Re(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== ve && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : br(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && Re(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Y.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Ee.createElement(rr(r.h, r.h[0]), this.options)), r);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(t);
    else {
      const a = new tt(i, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = It.get(e.strings);
    return t === void 0 && It.set(e.strings, t = new Ee(e)), t;
  }
  k(e) {
    ft(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const s of e) i === t.length ? t.push(r = new qe(this.O(ke()), this.O(ke()), this, this.options)) : r = t[i], r._$AI(s), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = Ot(e).nextSibling;
      Ot(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
};
h(qe, "k");
let De = qe;
const $t = class $t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = m;
  }
  _$AI(e, t = this, r, i) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = ye(this, e, t, 0), a = !Re(e) || e !== this._$AH && e !== ve, a && (this._$AH = e);
    else {
      const o = e;
      let l, u;
      for (e = s[0], l = 0; l < s.length - 1; l++) u = ye(this, o[r + l], t, l), u === ve && (u = this._$AH[l]), a || (a = !Re(u) || u !== this._$AH[l]), u === m ? e = m : e !== m && (e += (u ?? "") + s[l + 1]), this._$AH[l] = u;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
h($t, "H");
let $e = $t;
const wt = class wt extends $e {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
};
h(wt, "I");
let rt = wt;
const St = class St extends $e {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
};
h(St, "L");
let it = St;
const Pt = class Pt extends $e {
  constructor(e, t, r, i, s) {
    super(e, t, r, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ye(this, e, t, 0) ?? m) === ve) return;
    const r = this._$AH, i = e === m && r !== m || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== m && (r === m || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
};
h(Pt, "z");
let st = Pt;
const xt = class xt {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ye(this, e);
  }
};
h(xt, "Z");
let at = xt;
const Je = Ae.litHtmlPolyfillSupport;
Je == null || Je(Ee, De), (Ae.litHtmlVersions ?? (Ae.litHtmlVersions = [])).push("3.3.2");
const $r = /* @__PURE__ */ h((n, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = i = new De(e.insertBefore(ke(), s), s, void 0, t ?? {});
  }
  return i._$AI(n), i;
}, "D");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, Ct = class Ct extends re {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = $r(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return ve;
  }
};
h(Ct, "i");
let A = Ct;
var Kt;
A._$litElement$ = !0, A.finalized = !0, (Kt = X.litElementHydrateSupport) == null || Kt.call(X, { LitElement: A });
const Ke = X.litElementPolyfillSupport;
Ke == null || Ke({ LitElement: A });
(X.litElementVersions ?? (X.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = /* @__PURE__ */ h((n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
}, "t");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wr = { attribute: !0, type: String, converter: Be, reflect: !1, hasChanged: pt }, Sr = /* @__PURE__ */ h((n = wr, e, t) => {
  const { kind: r, metadata: i } = t;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), r === "setter" && ((n = Object.create(n)).wrapped = !0), s.set(t.name, n), r === "accessor") {
    const { name: a } = t;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, l, n, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, n, o), o;
    } };
  }
  if (r === "setter") {
    const { name: a } = t;
    return function(o) {
      const l = this[a];
      e.call(this, o), this.requestUpdate(a, l, n, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
}, "r$1");
function c(n) {
  return (e, t) => typeof t == "object" ? Sr(n, e, t) : ((r, i, s) => {
    const a = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), a ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(n, e, t);
}
h(c, "n");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(n) {
  return c({ ...n, state: !0, attribute: !1 });
}
h(b, "r");
function y(n, e) {
  if (!e || e.trim() === "")
    return n;
  const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let i = n;
  for (const s of r) {
    if (i == null || typeof i != "object")
      return;
    i = i[s];
  }
  return i;
}
h(y, "getByPath");
function Ir(n, e) {
  return y(n, e) !== void 0;
}
h(Ir, "hasPath");
function qt(n, e, t) {
  const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let s = n;
  for (let a = 0; a < i.length - 1; a++) {
    const o = i[a];
    (!(o in s) || typeof s[o] != "object" || s[o] === null) && (s[o] = {}), s = s[o];
  }
  s[i[i.length - 1]] = t;
}
h(qt, "setByPath");
function qr(n, e, t) {
  const r = y(n, e);
  return r !== void 0 ? r : t;
}
h(qr, "getByPathOrDefault");
const Pr = "https://chartsbuilder.matge.com/beacon", Ht = /* @__PURE__ */ new Set();
function q(n, e) {
  const t = `${n}:${e || ""}`;
  if (Ht.has(t) || (Ht.add(t), typeof window > "u"))
    return;
  const r = window.location.hostname;
  if (r === "localhost" || r === "127.0.0.1" || r === "chartsbuilder.matge.com")
    return;
  const i = new URLSearchParams();
  i.set("c", n), e && i.set("t", e);
  const s = `${Pr}?${i.toString()}`;
  try {
    fetch(s, { method: "GET", keepalive: !0, mode: "no-cors" }).catch(() => {
    });
  } catch {
  }
}
h(q, "sendWidgetBeacon");
function nt(n) {
  return n ? String(n).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
}
h(nt, "escapeHtml");
function Vt(n, e = !1) {
  if (typeof n == "number")
    return isNaN(n) ? e ? null : 0 : n;
  if (typeof n != "string")
    return e ? null : 0;
  let t = n.trim();
  if (t === "")
    return e ? null : 0;
  t = t.replace(/\s/g, "");
  const r = t.includes(","), i = t.includes(".");
  if (r && i) {
    const a = t.lastIndexOf(","), o = t.lastIndexOf(".");
    a > o ? t = t.replace(/\./g, "").replace(",", ".") : t = t.replace(/,/g, "");
  } else r && (t = t.replace(",", "."));
  const s = parseFloat(t);
  return isNaN(s) ? e ? null : 0 : s;
}
h(Vt, "toNumber");
function xr(n) {
  if (typeof n != "string")
    return !1;
  const e = n.trim();
  return e === "" ? !1 : /^-?[\d\s]+([.,]\d+)?$/.test(e);
}
h(xr, "looksLikeNumber");
function Cr(n) {
  return !n || typeof n != "string" || ["N/A", "null", "undefined", "00", ""].includes(n) ? !1 : !!(n === "2A" || n === "2B" || /^97[1-6]$/.test(n) || /^(0[1-9]|[1-8]\d|9[0-5])$/.test(n));
}
h(Cr, "isValidDeptCode");
const Ze = {
  baseUrl: "https://chartsbuilder.matge.com",
  endpoints: {
    grist: "/grist-proxy",
    gristGouv: "/grist-gouv-proxy",
    albert: "/albert-proxy",
    tabular: "/tabular-proxy"
  }
};
function Ar() {
  return typeof window < "u" && window.location.hostname === "localhost" && window.location.port === "5173";
}
h(Ar, "isViteDevMode");
function kr() {
  return typeof window < "u" && "__TAURI__" in window;
}
h(kr, "isTauriMode");
function ir() {
  var r;
  const n = { ...Ze.endpoints };
  return Ar() ? { baseUrl: "", endpoints: n } : kr() ? { baseUrl: Ze.baseUrl, endpoints: n } : {
    baseUrl: ((r = import.meta.env) == null ? void 0 : r.VITE_PROXY_URL) || Ze.baseUrl,
    endpoints: n
  };
}
h(ir, "getProxyConfig");
function Rr(n) {
  const e = ir();
  return n.includes("tabular-api.data.gouv.fr") ? n.replace("https://tabular-api.data.gouv.fr", `${e.baseUrl}${e.endpoints.tabular}`) : n.includes("docs.getgrist.com") ? n.replace("https://docs.getgrist.com", `${e.baseUrl}${e.endpoints.grist}`) : n.includes("grist.numerique.gouv.fr") ? n.replace("https://grist.numerique.gouv.fr", `${e.baseUrl}${e.endpoints.gristGouv}`) : n.includes("albert.api.etalab.gouv.fr") ? n.replace("https://albert.api.etalab.gouv.fr", `${e.baseUrl}${e.endpoints.albert}`) : n;
}
h(Rr, "getProxiedUrl");
const O = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading",
  SOURCE_COMMAND: "gouv-source-command"
}, gt = /* @__PURE__ */ new Map(), _t = /* @__PURE__ */ new Map();
function Er(n, e) {
  gt.set(n, e);
}
h(Er, "setDataCache");
function we(n) {
  return gt.get(n);
}
h(we, "getDataCache");
function Fe(n) {
  gt.delete(n);
}
h(Fe, "clearDataCache");
function mt(n, e) {
  _t.set(n, e);
}
h(mt, "setDataMeta");
function He(n) {
  return _t.get(n);
}
h(He, "getDataMeta");
function bt(n) {
  _t.delete(n);
}
h(bt, "clearDataMeta");
function j(n, e) {
  Er(n, e);
  const t = new CustomEvent(O.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, data: e }
  });
  document.dispatchEvent(t);
}
h(j, "dispatchDataLoaded");
function G(n, e) {
  const t = new CustomEvent(O.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, error: e }
  });
  document.dispatchEvent(t);
}
h(G, "dispatchDataError");
function W(n) {
  const e = new CustomEvent(O.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n }
  });
  document.dispatchEvent(e);
}
h(W, "dispatchDataLoading");
function Q(n, e) {
  const t = new CustomEvent(O.SOURCE_COMMAND, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, ...e }
  });
  document.dispatchEvent(t);
}
h(Q, "dispatchSourceCommand");
function vt(n, e) {
  const t = /* @__PURE__ */ h((r) => {
    const i = r;
    if (i.detail.sourceId === n) {
      const { sourceId: s, ...a } = i.detail;
      e(a);
    }
  }, "handler");
  return document.addEventListener(O.SOURCE_COMMAND, t), () => document.removeEventListener(O.SOURCE_COMMAND, t);
}
h(vt, "subscribeToSourceCommands");
function Ue(n, e) {
  const t = /* @__PURE__ */ h((s) => {
    const a = s;
    a.detail.sourceId === n && e.onLoaded && e.onLoaded(a.detail.data);
  }, "handleLoaded"), r = /* @__PURE__ */ h((s) => {
    const a = s;
    a.detail.sourceId === n && e.onError && e.onError(a.detail.error);
  }, "handleError"), i = /* @__PURE__ */ h((s) => {
    s.detail.sourceId === n && e.onLoading && e.onLoading();
  }, "handleLoading");
  return document.addEventListener(O.LOADED, t), document.addEventListener(O.ERROR, r), document.addEventListener(O.LOADING, i), () => {
    document.removeEventListener(O.LOADED, t), document.removeEventListener(O.ERROR, r), document.removeEventListener(O.LOADING, i);
  };
}
h(Ue, "subscribeToSource");
var L = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, ae;
let F = (ae = class extends A {
  constructor() {
    super(...arguments), this.url = "", this.method = "GET", this.headers = "", this.params = "", this.refresh = 0, this.transform = "", this.paginate = !1, this.pageSize = 20, this._loading = !1, this._error = null, this._data = null, this._currentPage = 1, this._refreshInterval = null, this._abortController = null, this._unsubscribePageRequests = null;
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return d``;
  }
  connectedCallback() {
    super.connectedCallback(), q("gouv-source"), this._setupRefresh(), this._setupPageRequestListener();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && (Fe(this.id), bt(this.id));
  }
  updated(e) {
    (e.has("url") || e.has("params") || e.has("transform")) && (this.paginate && (e.has("url") || e.has("params")) && (this._currentPage = 1), this._fetchData()), e.has("refresh") && this._setupRefresh(), (e.has("paginate") || e.has("pageSize")) && this._setupPageRequestListener();
  }
  _cleanup() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = null), this._abortController && (this._abortController.abort(), this._abortController = null), this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null);
  }
  _setupRefresh() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = null), this.refresh > 0 && (this._refreshInterval = window.setInterval(() => {
      this._fetchData();
    }, this.refresh * 1e3));
  }
  async _fetchData() {
    if (this.url) {
      if (!this.id) {
        console.warn('gouv-source: attribut "id" requis pour identifier la source');
        return;
      }
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, W(this.id);
      try {
        const e = Rr(this._buildUrl()), t = this._buildFetchOptions(), r = await fetch(e, {
          ...t,
          signal: this._abortController.signal
        });
        if (!r.ok)
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        const i = await r.json();
        this.paginate && i.meta && mt(this.id, {
          page: i.meta.page ?? this._currentPage,
          pageSize: i.meta.page_size ?? this.pageSize,
          total: i.meta.total ?? 0
        }), this.transform ? this._data = y(i, this.transform) : this.paginate && i.data && !this.transform ? this._data = i.data : this._data = i, j(this.id, this._data);
      } catch (e) {
        if (e.name === "AbortError")
          return;
        this._error = e, G(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, e);
      } finally {
        this._loading = !1;
      }
    }
  }
  _buildUrl() {
    const e = window.location.origin !== "null" ? window.location.origin : void 0, t = new URL(this.url, e);
    if (this.params && this.method === "GET")
      try {
        const r = JSON.parse(this.params);
        Object.entries(r).forEach(([i, s]) => {
          t.searchParams.set(i, String(s));
        });
      } catch (r) {
        console.warn("gouv-source: params invalides (JSON attendu)", r);
      }
    return this.paginate && (t.searchParams.set("page", String(this._currentPage)), t.searchParams.set("page_size", String(this.pageSize))), t.toString();
  }
  _buildFetchOptions() {
    const e = {
      method: this.method
    };
    if (this.headers)
      try {
        e.headers = JSON.parse(this.headers);
      } catch (t) {
        console.warn("gouv-source: headers invalides (JSON attendu)", t);
      }
    return this.method === "POST" && this.params && (e.headers = {
      "Content-Type": "application/json",
      ...e.headers || {}
    }, e.body = this.params), e;
  }
  _setupPageRequestListener() {
    this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null), this.paginate && this.id && (this._unsubscribePageRequests = vt(this.id, (e) => {
      e.page !== void 0 && e.page !== this._currentPage && (this._currentPage = e.page, this._fetchData());
    }));
  }
  /**
   * Force le rechargement des données
   */
  reload() {
    this._fetchData();
  }
  /**
   * Retourne les données actuelles
   */
  getData() {
    return this._data;
  }
  /**
   * Retourne l'état de chargement
   */
  isLoading() {
    return this._loading;
  }
  /**
   * Retourne l'erreur éventuelle
   */
  getError() {
    return this._error;
  }
}, h(ae, "GouvSource"), ae);
L([
  c({ type: String })
], F.prototype, "url", void 0);
L([
  c({ type: String })
], F.prototype, "method", void 0);
L([
  c({ type: String })
], F.prototype, "headers", void 0);
L([
  c({ type: String })
], F.prototype, "params", void 0);
L([
  c({ type: Number })
], F.prototype, "refresh", void 0);
L([
  c({ type: String })
], F.prototype, "transform", void 0);
L([
  c({ type: Boolean })
], F.prototype, "paginate", void 0);
L([
  c({ type: Number, attribute: "page-size" })
], F.prototype, "pageSize", void 0);
L([
  b()
], F.prototype, "_loading", void 0);
L([
  b()
], F.prototype, "_error", void 0);
L([
  b()
], F.prototype, "_data", void 0);
F = L([
  M("gouv-source")
], F);
const At = class At {
  constructor() {
    this.type = "generic", this.capabilities = {
      serverFetch: !1,
      serverFacets: !1,
      serverSearch: !1,
      serverGroupBy: !1,
      serverOrderBy: !1,
      whereFormat: "colon"
    };
  }
  validate(e) {
    return null;
  }
  fetchAll() {
    throw new Error("GenericAdapter ne supporte pas le fetch serveur");
  }
  fetchPage() {
    throw new Error("GenericAdapter ne supporte pas le mode server-side");
  }
  buildUrl() {
    throw new Error("GenericAdapter ne construit pas d'URL API");
  }
  buildServerSideUrl() {
    throw new Error("GenericAdapter ne supporte pas le mode server-side");
  }
};
h(At, "GenericAdapter");
let ot = At;
const Oe = 100, Xe = 10, kt = class kt {
  constructor() {
    this.type = "opendatasoft", this.capabilities = {
      serverFetch: !0,
      serverFacets: !0,
      serverSearch: !0,
      serverGroupBy: !0,
      serverOrderBy: !0,
      whereFormat: "odsql"
    };
  }
  validate(e) {
    return e.datasetId ? null : 'attribut "dataset-id" requis pour les requetes OpenDataSoft';
  }
  /**
   * Fetch toutes les donnees avec pagination automatique via offset.
   * ODS limite a 100 records par requete.
   *
   * - limit > 0 : fetch exactement ce nombre de records
   * - limit = 0 : fetch TOUS les records disponibles (via total_count)
   */
  async fetchAll(e, t) {
    const i = e.limit <= 0 ? Xe * Oe : e.limit, s = Oe;
    let a = [], o = 0, l = -1;
    for (let u = 0; u < Xe; u++) {
      const f = i - a.length;
      if (f <= 0)
        break;
      const p = this.buildUrl(e, Math.min(s, f), o), g = await fetch(p, { signal: t });
      if (!g.ok)
        throw new Error(`HTTP ${g.status}: ${g.statusText}`);
      const _ = await g.json(), C = _.results || [];
      if (a = a.concat(C), typeof _.total_count == "number" && (l = _.total_count), l >= 0 && a.length >= l || C.length < s)
        break;
      o += C.length;
    }
    return l >= 0 && a.length < l && a.length < i && console.warn(`gouv-query: pagination incomplete - ${a.length}/${l} resultats recuperes (limite de securite: ${Xe} pages de ${Oe})`), {
      data: a,
      totalCount: l >= 0 ? l : a.length,
      needsClientProcessing: !1
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(e, t, r) {
    const i = this.buildServerSideUrl(e, t), s = await fetch(i, { signal: r });
    if (!s.ok)
      throw new Error(`HTTP ${s.status}: ${s.statusText}`);
    const a = await s.json(), o = a.results || [], l = typeof a.total_count == "number" ? a.total_count : 0;
    return {
      data: o,
      totalCount: l,
      needsClientProcessing: !1,
      rawJson: a
    };
  }
  /**
   * Construit une URL ODS pour le fetch complet (avec pagination).
   * limitOverride et pageOrOffsetOverride controlent la pagination per-page.
   */
  buildUrl(e, t, r) {
    const i = e.baseUrl || "https://data.opendatasoft.com", s = new URL(`${i}/api/explore/v2.1/catalog/datasets/${e.datasetId}/records`);
    e.select ? s.searchParams.set("select", e.select) : e.aggregate && e.groupBy && s.searchParams.set("select", this._buildSelectFromAggregate(e));
    const a = e.where || e.filter;
    if (a && s.searchParams.set("where", a), e.groupBy && s.searchParams.set("group_by", e.groupBy), e.orderBy) {
      const o = e.orderBy.replace(/:(\w+)$/, (l, u) => ` ${u.toUpperCase()}`);
      s.searchParams.set("order_by", o);
    }
    return t !== void 0 ? s.searchParams.set("limit", String(t)) : e.limit > 0 && s.searchParams.set("limit", String(Math.min(e.limit, Oe))), r && r > 0 && s.searchParams.set("offset", String(r)), s.toString();
  }
  /**
   * Construit l'URL ODS en mode server-side (une seule page).
   */
  buildServerSideUrl(e, t) {
    const r = e.baseUrl || "https://data.opendatasoft.com", i = new URL(`${r}/api/explore/v2.1/catalog/datasets/${e.datasetId}/records`);
    e.select ? i.searchParams.set("select", e.select) : e.aggregate && e.groupBy && i.searchParams.set("select", this._buildSelectFromAggregate(e)), t.effectiveWhere && i.searchParams.set("where", t.effectiveWhere), e.groupBy && i.searchParams.set("group_by", e.groupBy);
    const s = t.orderBy;
    if (s) {
      const o = s.replace(/:(\w+)$/, (l, u) => ` ${u.toUpperCase()}`);
      i.searchParams.set("order_by", o);
    }
    i.searchParams.set("limit", String(e.pageSize));
    const a = (t.page - 1) * e.pageSize;
    return a > 0 && i.searchParams.set("offset", String(a)), i.toString();
  }
  /**
   * Fetch les valeurs de facettes depuis l'endpoint ODS /facets.
   */
  async fetchFacets(e, t, r, i) {
    const s = e.baseUrl || "https://data.opendatasoft.com", a = new URL(`${s}/api/explore/v2.1/catalog/datasets/${e.datasetId}/facets`);
    for (const f of t)
      a.searchParams.append("facet", f);
    r && a.searchParams.set("where", r);
    const o = await fetch(a.toString(), i ? { signal: i } : void 0);
    if (!o.ok)
      throw new Error(`HTTP ${o.status}: ${o.statusText}`);
    const l = await o.json(), u = [];
    for (const f of l.facets || [])
      u.push({
        field: f.name,
        values: (f.facets || []).map((p) => ({
          value: p.value,
          count: p.count
        }))
      });
    return u;
  }
  getDefaultSearchTemplate() {
    return 'search("{q}")';
  }
  parseAggregates(e) {
    if (!e)
      return [];
    const t = [], r = e.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of r) {
      const s = i.split(":");
      s.length >= 2 && t.push({
        field: s[0],
        function: s[1],
        alias: s[2]
      });
    }
    return t;
  }
  /**
   * Convertit aggregate="field:func" + group-by en syntaxe ODS select.
   */
  _buildSelectFromAggregate(e) {
    const t = this.parseAggregates(e.aggregate), r = [];
    for (const s of t) {
      const a = s.function === "count" ? "count(*)" : `${s.function}(${s.field})`, o = s.alias || `${s.field}__${s.function}`;
      r.push(`${a} as ${o}`);
    }
    const i = e.groupBy.split(",").map((s) => s.trim()).filter(Boolean);
    for (const s of i)
      r.push(s);
    return r.join(", ");
  }
};
h(kt, "OpenDataSoftAdapter");
let lt = kt;
const Le = 100, Ye = 500, Rt = class Rt {
  constructor() {
    this.type = "tabular", this.capabilities = {
      serverFetch: !0,
      serverFacets: !1,
      serverSearch: !1,
      serverGroupBy: !1,
      serverOrderBy: !0,
      whereFormat: "colon"
    };
  }
  validate(e) {
    return e.resource ? null : 'attribut "resource" requis pour les requetes Tabular';
  }
  /**
   * Fetch toutes les donnees avec pagination automatique via links.next.
   * Retourne needsClientProcessing=true car Tabular ne supporte pas
   * group-by/aggregation cote serveur.
   */
  async fetchAll(e, t) {
    var l;
    const r = e.limit <= 0, i = r ? Ye * Le : e.limit;
    let s = [], a = -1, o = 1;
    for (let u = 0; u < Ye && !(i - s.length <= 0); u++) {
      const p = this.buildUrl(e, Le, o), g = await fetch(p, { signal: t });
      if (!g.ok)
        throw new Error(`HTTP ${g.status}: ${g.statusText}`);
      const _ = await g.json(), C = _.data || [];
      s = s.concat(C), _.meta && typeof _.meta.total == "number" && (a = _.meta.total);
      let Et = !1;
      if ((l = _.links) != null && l.next)
        try {
          const nr = new URL(_.links.next, "https://tabular-api.data.gouv.fr"), Dt = Number(nr.searchParams.get("page"));
          Dt > 0 && (o = Dt, Et = !0);
        } catch {
        }
      if (!Et || a >= 0 && s.length >= a || C.length < Le)
        break;
    }
    return !r && s.length > i && (s = s.slice(0, i)), a >= 0 && s.length < a && s.length < i && console.warn(`gouv-query: pagination incomplete - ${s.length}/${a} resultats recuperes (limite de securite: ${Ye} pages de ${Le})`), {
      data: s,
      totalCount: a >= 0 ? a : s.length,
      needsClientProcessing: !0
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(e, t, r) {
    var u;
    const i = this.buildServerSideUrl(e, t), s = await fetch(i, { signal: r });
    if (!s.ok)
      throw new Error(`HTTP ${s.status}: ${s.statusText}`);
    const a = await s.json(), o = a.data || [], l = ((u = a.meta) == null ? void 0 : u.total) ?? 0;
    return {
      data: o,
      totalCount: l,
      needsClientProcessing: !1,
      rawJson: a
    };
  }
  /**
   * Construit une URL Tabular pour le fetch complet.
   */
  buildUrl(e, t, r) {
    const i = this._getBaseUrl(e), s = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, a = new URL(`${i}/api/resources/${e.resource}/data/`, s), o = e.filter || e.where;
    if (o) {
      const l = o.split(",").map((u) => u.trim());
      for (const u of l) {
        const f = u.split(":");
        if (f.length >= 3) {
          const p = f[0], g = this._mapOperator(f[1]), _ = f.slice(2).join(":");
          a.searchParams.set(`${p}__${g}`, _);
        }
      }
    }
    if (e.groupBy) {
      const l = e.groupBy.split(",").map((u) => u.trim());
      for (const u of l)
        a.searchParams.append(`${u}__groupby`, "");
    }
    if (e.aggregate) {
      const l = e.aggregate.split(",").map((u) => u.trim());
      for (const u of l) {
        const f = u.split(":");
        if (f.length >= 2) {
          const p = f[0], g = f[1];
          a.searchParams.append(`${p}__${g}`, "");
        }
      }
    }
    if (e.orderBy) {
      const l = e.orderBy.split(":"), u = l[0], f = l[1] || "asc";
      a.searchParams.set(`${u}__sort`, f);
    }
    return t ? a.searchParams.set("page_size", String(t)) : e.limit > 0 && a.searchParams.set("page_size", String(e.limit)), r && a.searchParams.set("page", String(r)), a.toString();
  }
  /**
   * Construit l'URL Tabular en mode server-side (une seule page).
   */
  buildServerSideUrl(e, t) {
    const r = this._getBaseUrl(e), i = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, s = new URL(`${r}/api/resources/${e.resource}/data/`, i), a = e.filter || e.where;
    if (a) {
      const l = a.split(",").map((u) => u.trim());
      for (const u of l) {
        const f = u.split(":");
        if (f.length >= 3) {
          const p = f[0], g = this._mapOperator(f[1]), _ = f.slice(2).join(":");
          s.searchParams.set(`${p}__${g}`, _);
        }
      }
    }
    const o = t.orderBy;
    if (o) {
      const l = o.split(":"), u = l[0], f = l[1] || "asc";
      s.searchParams.set(`${u}__sort`, f);
    }
    return s.searchParams.set("page_size", String(e.pageSize)), s.searchParams.set("page", String(t.page)), s.toString();
  }
  /**
   * Mappe les operateurs generiques vers la syntaxe Tabular.
   */
  _mapOperator(e) {
    return {
      eq: "exact",
      neq: "differs",
      gt: "strictly_greater",
      gte: "greater",
      lt: "strictly_less",
      lte: "less",
      contains: "contains",
      notcontains: "notcontains",
      in: "in",
      notin: "notin",
      isnull: "isnull",
      isnotnull: "isnotnull"
    }[e] || e;
  }
  /**
   * Determine le base URL, avec fallback sur le proxy CORS.
   */
  _getBaseUrl(e) {
    if (e.baseUrl)
      return e.baseUrl;
    const t = ir();
    return `${t.baseUrl}${t.endpoints.tabular}`;
  }
};
h(Rt, "TabularAdapter");
let ct = Rt;
const sr = /* @__PURE__ */ new Map([
  ["generic", new ot()],
  ["opendatasoft", new lt()],
  ["tabular", new ct()]
]);
function et(n) {
  const e = sr.get(n);
  if (!e)
    throw new Error(`Type d'API non supporte: ${n}`);
  return e;
}
h(et, "getAdapter");
function Hr(n) {
  sr.set(n.type, n);
}
h(Hr, "registerAdapter");
var P = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, ne;
let $ = (ne = class extends A {
  constructor() {
    super(...arguments), this.apiType = "generic", this.source = "", this.baseUrl = "", this.datasetId = "", this.resource = "", this.select = "", this.where = "", this.filter = "", this.groupBy = "", this.aggregate = "", this.orderBy = "", this.limit = 0, this.transform = "", this.serverSide = !1, this.pageSize = 20, this.refresh = 0, this._loading = !1, this._error = null, this._data = [], this._rawData = [], this._adapter = et("generic"), this._refreshInterval = null, this._abortController = null, this._unsubscribe = null, this._unsubscribeCommands = null, this._serverPage = 1, this._serverWheres = /* @__PURE__ */ new Map(), this._serverOrderBy = "";
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return d``;
  }
  connectedCallback() {
    super.connectedCallback(), q("gouv-query", this.apiType), this._adapter = et(this.apiType), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && (Fe(this.id), bt(this.id));
  }
  updated(e) {
    [
      "source",
      "apiType",
      "baseUrl",
      "dataset",
      "resource",
      "select",
      "where",
      "filter",
      "groupBy",
      "aggregate",
      "orderBy",
      "limit",
      "transform",
      "serverSide",
      "pageSize"
    ].some((r) => e.has(r)) && (e.has("apiType") && (this._adapter = et(this.apiType)), this.serverSide && [
      "source",
      "apiType",
      "baseUrl",
      "dataset",
      "resource",
      "select",
      "where",
      "filter",
      "groupBy",
      "aggregate",
      "orderBy",
      "limit",
      "transform",
      "pageSize"
    ].some((i) => e.has(i)) && (this._serverPage = 1, this._serverWheres.clear(), this._serverOrderBy = ""), this._initialize()), e.has("refresh") && this._setupRefresh();
  }
  _cleanup() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = null), this._abortController && (this._abortController.abort(), this._abortController = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null);
  }
  _setupRefresh() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = null), this.refresh > 0 && (this._refreshInterval = window.setInterval(() => {
      this._initialize();
    }, this.refresh * 1e3));
  }
  _initialize() {
    if (!this.id) {
      console.warn('gouv-query: attribut "id" requis pour identifier la requete');
      return;
    }
    this._setupServerSideListener(), this.apiType === "generic" ? this._subscribeToSource() : this._fetchFromApi();
  }
  /**
   * Mode generic: s'abonne a une source et traite les donnees cote client
   */
  _subscribeToSource() {
    if (!this.source) {
      console.warn('gouv-query: attribut "source" requis en mode generic');
      return;
    }
    this._unsubscribe && this._unsubscribe();
    const e = we(this.source);
    e !== void 0 && (this._rawData = Array.isArray(e) ? e : [e], this._processClientSide()), this._unsubscribe = Ue(this.source, {
      onLoaded: /* @__PURE__ */ h((t) => {
        this._rawData = Array.isArray(t) ? t : [t], this._processClientSide();
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ h(() => {
        this._loading = !0, W(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ h((t) => {
        this._error = t, this._loading = !1, G(this.id, t);
      }, "onError")
    });
  }
  /**
   * Traitement cote client des donnees
   */
  _processClientSide() {
    try {
      W(this.id), this._loading = !0;
      let e = [...this._rawData];
      const t = this.filter || this.where;
      t && (e = this._applyFilters(e, t)), this.groupBy && (e = this._applyGroupByAndAggregate(e)), this.orderBy && (e = this._applySort(e)), this.limit > 0 && (e = e.slice(0, this.limit)), this._data = e, j(this.id, this._data);
    } catch (e) {
      this._error = e, G(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de traitement`, e);
    } finally {
      this._loading = !1;
    }
  }
  /**
   * Parse et applique les filtres (format: "field:operator:value")
   */
  _applyFilters(e, t) {
    const r = this._parseFilters(t);
    return e.filter((i) => r.every((s) => this._matchesFilter(i, s)));
  }
  _parseFilters(e) {
    const t = [], r = e.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of r) {
      const s = i.split(":");
      if (s.length >= 2) {
        const a = s[0], o = s[1];
        let l;
        if (s.length > 2) {
          const u = s.slice(2).join(":");
          o === "in" || o === "notin" ? l = u.split("|").map((f) => {
            const p = this._parseValue(f);
            return typeof p == "boolean" ? String(p) : p;
          }) : l = this._parseValue(u);
        }
        t.push({ field: a, operator: o, value: l });
      }
    }
    return t;
  }
  _parseValue(e) {
    return e === "true" ? !0 : e === "false" ? !1 : !isNaN(Number(e)) && e !== "" ? Number(e) : e;
  }
  _matchesFilter(e, t) {
    const r = y(e, t.field);
    switch (t.operator) {
      case "eq":
        return r == t.value;
      case "neq":
        return r != t.value;
      case "gt":
        return Number(r) > Number(t.value);
      case "gte":
        return Number(r) >= Number(t.value);
      case "lt":
        return Number(r) < Number(t.value);
      case "lte":
        return Number(r) <= Number(t.value);
      case "contains":
        return String(r).toLowerCase().includes(String(t.value).toLowerCase());
      case "notcontains":
        return !String(r).toLowerCase().includes(String(t.value).toLowerCase());
      case "in":
        return Array.isArray(t.value) && t.value.includes(r);
      case "notin":
        return Array.isArray(t.value) && !t.value.includes(r);
      case "isnull":
        return r == null;
      case "isnotnull":
        return r != null;
      default:
        return !0;
    }
  }
  /**
   * Applique le GROUP BY et les agregations
   */
  _applyGroupByAndAggregate(e) {
    const t = this.groupBy.split(",").map((a) => a.trim()).filter(Boolean), r = this._parseAggregates(this.aggregate), i = /* @__PURE__ */ new Map();
    for (const a of e) {
      const o = t.map((l) => String(y(a, l) ?? "")).join("|||");
      i.has(o) || i.set(o, []), i.get(o).push(a);
    }
    const s = [];
    for (const [a, o] of i) {
      const l = {}, u = a.split("|||");
      t.forEach((f, p) => {
        qt(l, f, u[p]);
      });
      for (const f of r) {
        const p = f.alias || `${f.field}__${f.function}`;
        qt(l, p, this._computeAggregate(o, f));
      }
      s.push(l);
    }
    return s;
  }
  _parseAggregates(e) {
    if (!e)
      return [];
    const t = [], r = e.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of r) {
      const s = i.split(":");
      s.length >= 2 && t.push({
        field: s[0],
        function: s[1],
        alias: s[2]
      });
    }
    return t;
  }
  _computeAggregate(e, t) {
    const r = e.map((i) => Number(y(i, t.field))).filter((i) => !isNaN(i));
    switch (t.function) {
      case "count":
        return e.length;
      case "sum":
        return r.reduce((i, s) => i + s, 0);
      case "avg":
        return r.length > 0 ? r.reduce((i, s) => i + s, 0) / r.length : 0;
      case "min":
        return r.length > 0 ? Math.min(...r) : 0;
      case "max":
        return r.length > 0 ? Math.max(...r) : 0;
      default:
        return 0;
    }
  }
  /**
   * Applique le tri
   */
  _applySort(e) {
    const t = this.orderBy.split(":");
    if (t.length < 1)
      return e;
    const r = t[0], i = (t[1] || "asc").toLowerCase();
    return [...e].sort((s, a) => {
      const o = y(s, r), l = y(a, r), u = Number(o), f = Number(l);
      if (!isNaN(u) && !isNaN(f))
        return i === "desc" ? f - u : u - f;
      const p = String(o ?? ""), g = String(l ?? "");
      return i === "desc" ? g.localeCompare(p) : p.localeCompare(g);
    });
  }
  // --- API fetch (delegue aux adapters) ---
  /**
   * Mode API: fait une requete directe a l'API via l'adapter
   */
  async _fetchFromApi() {
    const e = this._getAdapterParams(), t = this._adapter.validate(e);
    if (t) {
      console.warn(`gouv-query: ${t}`);
      return;
    }
    this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, W(this.id);
    try {
      this.serverSide && this._adapter.capabilities.serverFetch ? await this._fetchServerSideDelegated() : this._adapter.capabilities.serverFetch ? await this._fetchAllDelegated() : await this._fetchSinglePage();
    } catch (r) {
      if (r.name === "AbortError")
        return;
      this._error = r, G(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de requete API`, r);
    } finally {
      this._loading = !1;
    }
  }
  /**
   * Fetch toutes les donnees avec pagination automatique via l'adapter.
   */
  async _fetchAllDelegated() {
    const e = await this._adapter.fetchAll(this._getAdapterParams(), this._abortController.signal);
    e.needsClientProcessing ? (this._rawData = e.data, this._processClientSide()) : (this._data = this.transform ? y(e.data, this.transform) : e.data, j(this.id, this._data));
  }
  /**
   * Fetch une seule page en mode server-side via l'adapter.
   */
  async _fetchServerSideDelegated() {
    const e = {
      page: this._serverPage,
      effectiveWhere: this.getEffectiveWhere(),
      orderBy: this._serverOrderBy || this.orderBy
    }, t = await this._adapter.fetchPage(this._getAdapterParams(), e, this._abortController.signal);
    let r = t.data;
    if (this.transform) {
      const i = t.rawJson || r, s = y(i, this.transform);
      r = Array.isArray(s) ? s : [s];
    }
    mt(this.id, {
      page: this._serverPage,
      pageSize: this.pageSize,
      total: t.totalCount
    }), this._data = r, j(this.id, this._data);
  }
  /**
   * Fetch single page fallback (mode non-pagine)
   */
  async _fetchSinglePage() {
    const e = this._adapter.buildUrl(this._getAdapterParams()), t = await fetch(e, {
      signal: this._abortController.signal
    });
    if (!t.ok)
      throw new Error(`HTTP ${t.status}: ${t.statusText}`);
    const r = await t.json();
    let i = this.transform ? y(r, this.transform) : r;
    Array.isArray(i) || (this._adapter.type === "tabular" && r.data ? i = r.data : i = [i]), this._data = i, j(this.id, this._data);
  }
  /**
   * Collecte les parametres pour l'adapter.
   */
  _getAdapterParams() {
    return {
      baseUrl: this.baseUrl,
      datasetId: this.datasetId,
      resource: this.resource,
      select: this.select,
      where: this.where,
      filter: this.filter,
      groupBy: this.groupBy,
      aggregate: this.aggregate,
      orderBy: this.orderBy,
      limit: this.limit,
      transform: this.transform,
      pageSize: this.pageSize
    };
  }
  // --- Server-side command handling ---
  /**
   * Configure l'ecoute des commandes pour le mode server-side.
   * Les composants en aval (search, display, datalist) emettent des
   * gouv-source-command avec page/where/orderBy que query recoit ici.
   */
  _setupServerSideListener() {
    this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), !(!this.serverSide || !this.id) && (this._unsubscribeCommands = vt(this.id, (e) => {
      let t = !1;
      if (e.page !== void 0 && e.page !== this._serverPage && (this._serverPage = e.page, t = !0), e.where !== void 0) {
        const r = e.whereKey || "_default", i = this._getMergedWhere();
        e.where ? this._serverWheres.set(r, e.where) : this._serverWheres.delete(r), this._getMergedWhere() !== i && (e.page === void 0 && (this._serverPage = 1), t = !0);
      }
      e.orderBy !== void 0 && e.orderBy !== this._serverOrderBy && (this._serverOrderBy = e.orderBy, e.page === void 0 && (this._serverPage = 1), t = !0), t && this._fetchFromApi();
    }));
  }
  /**
   * Retourne le where dynamique fusionne de toutes les sources (search, facets, etc.)
   */
  _getMergedWhere() {
    return [...this._serverWheres.values()].filter(Boolean).join(" AND ");
  }
  /**
   * Retourne le where effectif complet (statique + dynamique),
   * en excluant optionnellement une cle specifique.
   * Utilise par gouv-facets server-facets pour construire l'URL facets API
   * sans inclure ses propres filtres dans les compteurs.
   */
  getEffectiveWhere(e) {
    const t = [], r = this.where || this.filter;
    r && t.push(r);
    for (const [i, s] of this._serverWheres)
      e && i === e || s && t.push(s);
    return t.join(" AND ");
  }
  // --- Public API ---
  /**
   * Retourne l'adapter courant (pour les composants en aval)
   */
  getAdapter() {
    return this._adapter;
  }
  /**
   * Force le rechargement des donnees
   */
  reload() {
    this._initialize();
  }
  /**
   * Retourne les donnees actuelles
   */
  getData() {
    return this._data;
  }
  /**
   * Retourne l'etat de chargement
   */
  isLoading() {
    return this._loading;
  }
  /**
   * Retourne l'erreur eventuelle
   */
  getError() {
    return this._error;
  }
}, h(ne, "GouvQuery"), ne);
P([
  c({ type: String, attribute: "api-type" })
], $.prototype, "apiType", void 0);
P([
  c({ type: String })
], $.prototype, "source", void 0);
P([
  c({ type: String, attribute: "base-url" })
], $.prototype, "baseUrl", void 0);
P([
  c({ type: String, attribute: "dataset-id" })
], $.prototype, "datasetId", void 0);
P([
  c({ type: String })
], $.prototype, "resource", void 0);
P([
  c({ type: String })
], $.prototype, "select", void 0);
P([
  c({ type: String })
], $.prototype, "where", void 0);
P([
  c({ type: String })
], $.prototype, "filter", void 0);
P([
  c({ type: String, attribute: "group-by" })
], $.prototype, "groupBy", void 0);
P([
  c({ type: String })
], $.prototype, "aggregate", void 0);
P([
  c({ type: String, attribute: "order-by" })
], $.prototype, "orderBy", void 0);
P([
  c({ type: Number })
], $.prototype, "limit", void 0);
P([
  c({ type: String })
], $.prototype, "transform", void 0);
P([
  c({ type: Boolean, attribute: "server-side" })
], $.prototype, "serverSide", void 0);
P([
  c({ type: Number, attribute: "page-size" })
], $.prototype, "pageSize", void 0);
P([
  c({ type: Number })
], $.prototype, "refresh", void 0);
P([
  b()
], $.prototype, "_loading", void 0);
P([
  b()
], $.prototype, "_error", void 0);
P([
  b()
], $.prototype, "_data", void 0);
P([
  b()
], $.prototype, "_rawData", void 0);
$ = P([
  M("gouv-query")
], $);
var I = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, oe;
let z = (oe = class extends A {
  constructor() {
    super(...arguments), this.source = "", this.numeric = "", this.numericAuto = !1, this.rename = "", this.trim = !1, this.stripHtml = !1, this.replace = "", this.flatten = "", this.lowercaseKeys = !1, this._unsubscribe = null, this._unsubscribePageRequests = null;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return d``;
  }
  connectedCallback() {
    super.connectedCallback(), q("gouv-normalize"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null), this.id && (Fe(this.id), bt(this.id));
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    if (["flatten", "numeric", "numericAuto", "rename", "trim", "stripHtml", "replace", "lowercaseKeys"].some((i) => e.has(i))) {
      const i = this.source ? we(this.source) : void 0;
      i !== void 0 && this._processData(i);
    }
  }
  _initialize() {
    if (!this.id) {
      console.warn('gouv-normalize: attribut "id" requis pour identifier la sortie');
      return;
    }
    if (!this.source) {
      console.warn('gouv-normalize: attribut "source" requis');
      return;
    }
    this._unsubscribe && this._unsubscribe(), this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null);
    const e = we(this.source);
    e !== void 0 && this._processData(e), this._unsubscribe = Ue(this.source, {
      onLoaded: /* @__PURE__ */ h((t) => {
        this._processData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ h(() => {
        W(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ h((t) => {
        G(this.id, t);
      }, "onError")
    }), this._unsubscribePageRequests = vt(this.id, (t) => {
      Q(this.source, t);
    });
  }
  _processData(e) {
    try {
      W(this.id);
      let t = Array.isArray(e) ? e : [e];
      this.flatten && (t = t.map((l) => l == null || typeof l != "object" || Array.isArray(l) ? l : this._flattenRow(l, this.flatten)));
      const r = this._parseNumericFields(), i = this._parsePipeMap(this.rename), s = this._parsePipeMap(this.replace), a = t.map((l) => l == null || typeof l != "object" ? l : this._normalizeRow(l, r, i, s));
      j(this.id, a);
      const o = He(this.source);
      o && mt(this.id, o);
    } catch (t) {
      G(this.id, t), console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`, t);
    }
  }
  _normalizeRow(e, t, r, i) {
    const s = {};
    for (const [a, o] of Object.entries(e)) {
      const l = this.trim ? a.trim() : a;
      let u = o;
      if (this.trim && typeof u == "string" && (u = u.trim()), this.stripHtml && typeof u == "string" && (u = u.replace(/<[^>]*>/g, "")), i.size > 0 && typeof u == "string") {
        for (const [g, _] of i)
          if (u === g) {
            u = _;
            break;
          }
      }
      if (t.has(l))
        u = Vt(u);
      else if (this.numericAuto && typeof u == "string" && xr(u)) {
        const g = Vt(u, !0);
        g !== null && (u = g);
      }
      const f = r.get(l) ?? l, p = this.lowercaseKeys ? f.toLowerCase() : f;
      s[p] = u;
    }
    return s;
  }
  /** Aplatit un sous-objet au premier niveau d'un enregistrement */
  _flattenRow(e, t) {
    const r = this._resolvePath(e, t);
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const i = { ...e };
      return this._deleteByPath(i, t), Object.assign(i, r), i;
    }
    return e;
  }
  /** Resout un chemin en dot notation sur un objet */
  _resolvePath(e, t) {
    return t.split(".").reduce((r, i) => r != null && typeof r == "object" ? r[i] : void 0, e);
  }
  /** Supprime une cle par chemin dot notation (supprime aussi la racine du chemin) */
  _deleteByPath(e, t) {
    const r = t.split(".");
    delete e[r[0]];
  }
  /** Parse l'attribut numeric en Set de noms de champs */
  _parseNumericFields() {
    return this.numeric ? new Set(this.numeric.split(",").map((e) => e.trim()).filter(Boolean)) : /* @__PURE__ */ new Set();
  }
  /** Parse un attribut pipe-separe en Map cle:valeur */
  _parsePipeMap(e) {
    const t = /* @__PURE__ */ new Map();
    if (!e)
      return t;
    const r = e.split("|");
    for (const i of r) {
      const s = i.indexOf(":");
      if (s === -1)
        continue;
      const a = i.substring(0, s).trim(), o = i.substring(s + 1).trim();
      a && t.set(a, o);
    }
    return t;
  }
}, h(oe, "GouvNormalize"), oe);
I([
  c({ type: String })
], z.prototype, "source", void 0);
I([
  c({ type: String })
], z.prototype, "numeric", void 0);
I([
  c({ type: Boolean, attribute: "numeric-auto" })
], z.prototype, "numericAuto", void 0);
I([
  c({ type: String })
], z.prototype, "rename", void 0);
I([
  c({ type: Boolean })
], z.prototype, "trim", void 0);
I([
  c({ type: Boolean, attribute: "strip-html" })
], z.prototype, "stripHtml", void 0);
I([
  c({ type: String })
], z.prototype, "replace", void 0);
I([
  c({ type: String })
], z.prototype, "flatten", void 0);
I([
  c({ type: Boolean, attribute: "lowercase-keys" })
], z.prototype, "lowercaseKeys", void 0);
z = I([
  M("gouv-normalize")
], z);
var x = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, le;
let w = (le = class extends A {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.labels = "", this.maxValues = 6, this.disjunctive = "", this.sort = "count", this.searchable = "", this.hideEmpty = !1, this.display = "", this.urlParams = !1, this.urlParamMap = "", this.urlSync = !1, this.serverFacets = !1, this.hideCounts = !1, this._rawData = [], this._facetGroups = [], this._activeSelections = {}, this._expandedFacets = /* @__PURE__ */ new Set(), this._searchQueries = {}, this._openMultiselectField = null, this._unsubscribe = null, this._popstateHandler = null, this._urlParamsApplied = !1, this._onClickOutsideMultiselect = (e) => {
      if (!this._openMultiselectField)
        return;
      const t = e.target, r = this.querySelector(`[data-multiselect="${this._openMultiselectField}"]`);
      r && !r.contains(t) && (this._openMultiselectField = null);
    };
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), q("gouv-facets"), this._initialize(), document.addEventListener("click", this._onClickOutsideMultiselect), this.urlSync && (this._popstateHandler = () => {
      this._applyUrlParams(), this._buildFacetGroups(), this._applyFilters();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._onClickOutsideMultiselect), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && Fe(this.id);
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    if (e.has("serverFacets")) {
      this._initialize();
      return;
    }
    ["fields", "labels", "sort", "hideEmpty", "maxValues", "disjunctive", "searchable", "display"].some((i) => e.has(i)) && this._rawData.length > 0 && (this.serverFacets ? this._fetchServerFacets() : (this._buildFacetGroups(), this._applyFilters()));
  }
  _initialize() {
    if (!this.id) {
      console.warn('gouv-facets: attribut "id" requis pour identifier la sortie');
      return;
    }
    if (!this.source) {
      console.warn('gouv-facets: attribut "source" requis');
      return;
    }
    this._unsubscribe && this._unsubscribe(), this._activeSelections = {}, this._expandedFacets = /* @__PURE__ */ new Set(), this._searchQueries = {};
    const e = we(this.source);
    e !== void 0 && this._onData(e), this._unsubscribe = Ue(this.source, {
      onLoaded: /* @__PURE__ */ h((t) => {
        this._onData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ h(() => {
        W(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ h((t) => {
        G(this.id, t);
      }, "onError")
    });
  }
  _onData(e) {
    if (this._rawData = Array.isArray(e) ? e : [], this.urlParams && !this._urlParamsApplied && (this._applyUrlParams(), this._urlParamsApplied = !0, this.serverFacets && this._hasActiveSelections())) {
      this._dispatchFacetCommand();
      return;
    }
    this.serverFacets ? (this._fetchServerFacets(), this.id && j(this.id, this._rawData)) : (this._buildFacetGroups(), this._applyFilters());
  }
  // --- Facet index building ---
  _buildFacetGroups() {
    const e = this._getFields(), t = this._parseLabels();
    this._facetGroups = e.map((r) => {
      const i = this._computeFacetValues(r);
      return {
        field: r,
        label: t.get(r) ?? r,
        values: i
      };
    }).filter((r) => this.hideEmpty && r.values.length <= 1 ? !1 : r.values.length > 0);
  }
  /** Get fields to use as facets — explicit or auto-detected */
  _getFields() {
    return this.fields ? Ne(this.fields) : this._autoDetectFields();
  }
  /** Auto-detect categorical fields: string type, 2-50 unique values, not all unique (ID-like) */
  _autoDetectFields() {
    if (this._rawData.length === 0)
      return [];
    const e = [], t = this._rawData[0];
    for (const r of Object.keys(t)) {
      const i = /* @__PURE__ */ new Set();
      let s = !0;
      for (const a of this._rawData) {
        const o = a[r];
        if (!(o == null || o === "")) {
          if (typeof o != "string") {
            s = !1;
            break;
          }
          if (i.add(o), i.size > 50)
            break;
        }
      }
      s && (i.size <= 1 || i.size > 50 || i.size !== this._rawData.length && e.push(r));
    }
    return e;
  }
  /** Compute facet values with counts, applying cross-facet filtering for dynamic counts */
  _computeFacetValues(e) {
    const t = this._getDataFilteredExcluding(e), r = /* @__PURE__ */ new Map();
    for (const s of t) {
      const a = s[e];
      if (a == null || a === "")
        continue;
      const o = String(a);
      r.set(o, (r.get(o) ?? 0) + 1);
    }
    const i = [];
    for (const [s, a] of r)
      i.push({ value: s, count: a });
    return this._sortValues(i);
  }
  /** Filter data by all active selections EXCEPT the given field */
  _getDataFilteredExcluding(e) {
    const t = Object.keys(this._activeSelections).filter((r) => r !== e && this._activeSelections[r].size > 0);
    return t.length === 0 ? this._rawData : this._rawData.filter((r) => t.every((i) => {
      const s = this._activeSelections[i], a = r[i];
      return a == null ? !1 : s.has(String(a));
    }));
  }
  _sortValues(e) {
    const t = [...e];
    switch (this.sort) {
      case "count":
        t.sort((r, i) => i.count - r.count);
        break;
      case "-count":
        t.sort((r, i) => r.count - i.count);
        break;
      case "alpha":
        t.sort((r, i) => r.value.localeCompare(i.value, "fr"));
        break;
      case "-alpha":
        t.sort((r, i) => i.value.localeCompare(r.value, "fr"));
        break;
      default:
        t.sort((r, i) => i.count - r.count);
    }
    return t;
  }
  // --- Server-facets ---
  /** Check if there are any active selections */
  _hasActiveSelections() {
    return Object.keys(this._activeSelections).some((e) => this._activeSelections[e].size > 0);
  }
  /** Fetch facet values from server API with cross-facet counts */
  async _fetchServerFacets() {
    var u, f;
    const e = document.getElementById(this.source);
    if (!e)
      return;
    const t = (u = e.getAdapter) == null ? void 0 : u.call(e);
    if (!(t != null && t.capabilities.serverFacets) || !t.fetchFacets) {
      this._buildFacetGroups(), this._applyFilters();
      return;
    }
    const r = e.baseUrl || e.getAttribute("base-url") || "", i = e.datasetId || e.getAttribute("dataset-id") || "";
    if (!i)
      return;
    const s = Ne(this.fields);
    if (s.length === 0)
      return;
    const a = this._parseLabels(), o = /* @__PURE__ */ new Map();
    for (const p of s) {
      const g = ((f = e.getEffectiveWhere) == null ? void 0 : f.call(e, this.id)) || "", _ = this._buildFacetWhereExcluding(p), C = [g, _].filter(Boolean).join(" AND ");
      o.has(C) || o.set(C, []), o.get(C).push(p);
    }
    const l = [];
    for (const [p, g] of o)
      try {
        const _ = await t.fetchFacets({ baseUrl: r, datasetId: i }, g, p);
        for (const C of _)
          l.push({
            field: C.field,
            label: a.get(C.field) ?? C.field,
            values: this._sortValues(C.values)
          });
      } catch {
      }
    this._facetGroups = s.map((p) => l.find((g) => g.field === p)).filter((p) => !!p).filter((p) => !(this.hideEmpty && p.values.length <= 1));
  }
  /** Build ODSQL where clause for all active facet selections EXCEPT the given field */
  _buildFacetWhereExcluding(e) {
    const t = [];
    for (const [r, i] of Object.entries(this._activeSelections))
      if (!(r === e || i.size === 0))
        if (i.size === 1) {
          const s = [...i][0].replace(/"/g, '\\"');
          t.push(`${r} = "${s}"`);
        } else {
          const s = [...i].map((a) => `"${a.replace(/"/g, '\\"')}"`).join(", ");
          t.push(`${r} IN (${s})`);
        }
    return t.join(" AND ");
  }
  /** Build ODSQL where clause for ALL active facet selections */
  _buildFullFacetWhere() {
    return this._buildFacetWhereExcluding("");
  }
  /** Dispatch facet where command to upstream gouv-query */
  _dispatchFacetCommand() {
    const e = this._buildFullFacetWhere();
    Q(this.source, { where: e, whereKey: this.id });
  }
  // --- Filtering ---
  _applyFilters() {
    const e = Object.keys(this._activeSelections).filter((r) => this._activeSelections[r].size > 0);
    let t;
    e.length === 0 ? t = this._rawData : t = this._rawData.filter((r) => e.every((i) => {
      const s = this._activeSelections[i], a = r[i];
      return a == null ? !1 : s.has(String(a));
    })), j(this.id, t);
  }
  // --- Parsing helpers ---
  _parseLabels() {
    const e = /* @__PURE__ */ new Map();
    if (!this.labels)
      return e;
    const t = this.labels.split("|");
    for (const r of t) {
      const i = r.indexOf(":");
      if (i === -1)
        continue;
      const s = r.substring(0, i).trim(), a = r.substring(i + 1).trim();
      s && e.set(s, a);
    }
    return e;
  }
  /** Parse display attribute into per-field mode map */
  _parseDisplayModes() {
    const e = /* @__PURE__ */ new Map();
    if (!this.display)
      return e;
    const t = this.display.split("|");
    for (const r of t) {
      const i = r.indexOf(":");
      if (i === -1)
        continue;
      const s = r.substring(0, i).trim(), a = r.substring(i + 1).trim();
      s && (a === "checkbox" || a === "select" || a === "multiselect" || a === "radio") && e.set(s, a);
    }
    return e;
  }
  /** Get the display mode for a specific field */
  _getDisplayMode(e) {
    return this._parseDisplayModes().get(e) ?? "checkbox";
  }
  // --- User interaction ---
  _toggleValue(e, t) {
    const r = { ...this._activeSelections }, i = new Set(r[e] ?? []), s = this._getDisplayMode(e), a = Ne(this.disjunctive), o = s === "multiselect" || s === "checkbox" && a.includes(e);
    i.has(t) ? i.delete(t) : (o || i.clear(), i.add(t)), i.size === 0 ? delete r[e] : r[e] = i, this._activeSelections = r, this._afterSelectionChange();
  }
  _handleSelectChange(e, t) {
    const i = t.target.value, s = { ...this._activeSelections };
    i ? s[e] = /* @__PURE__ */ new Set([i]) : delete s[e], this._activeSelections = s, this._afterSelectionChange();
  }
  _clearFieldSelections(e) {
    const t = { ...this._activeSelections };
    delete t[e], this._activeSelections = t, this._afterSelectionChange();
  }
  _selectAllValues(e) {
    const t = this._facetGroups.find((i) => i.field === e);
    if (!t)
      return;
    const r = { ...this._activeSelections };
    r[e] = new Set(t.values.map((i) => i.value)), this._activeSelections = r, this._afterSelectionChange();
  }
  _toggleMultiselectDropdown(e) {
    this._openMultiselectField = this._openMultiselectField === e ? null : e;
  }
  _toggleExpand(e) {
    const t = new Set(this._expandedFacets);
    t.has(e) ? t.delete(e) : t.add(e), this._expandedFacets = t;
  }
  _handleSearch(e, t) {
    const r = t.target;
    this._searchQueries = { ...this._searchQueries, [e]: r.value };
  }
  _clearAll() {
    this._activeSelections = {}, this._searchQueries = {}, this._afterSelectionChange();
  }
  /** Common logic after any selection change — routes to client or server mode */
  _afterSelectionChange() {
    this.serverFacets ? this._dispatchFacetCommand() : (this._buildFacetGroups(), this._applyFilters()), this.urlSync && this._syncUrl();
  }
  // --- URL params ---
  /** Parse url-param-map attribute into a map of URL param name -> facet field name */
  _parseUrlParamMap() {
    const e = /* @__PURE__ */ new Map();
    if (!this.urlParamMap)
      return e;
    const t = this.urlParamMap.split("|");
    for (const r of t) {
      const i = r.indexOf(":");
      if (i === -1)
        continue;
      const s = r.substring(0, i).trim(), a = r.substring(i + 1).trim();
      s && a && e.set(s, a);
    }
    return e;
  }
  /** Read URL search params and apply as facet pre-selections */
  _applyUrlParams() {
    const e = new URLSearchParams(window.location.search), t = this._parseUrlParamMap(), r = {};
    for (const [i, s] of e.entries()) {
      const a = t.size > 0 ? t.get(i) ?? null : i;
      if (!a)
        continue;
      const o = s.split(",").map((l) => l.trim()).filter(Boolean);
      r[a] || (r[a] = /* @__PURE__ */ new Set());
      for (const l of o)
        r[a].add(l);
    }
    Object.keys(r).length > 0 && (this._activeSelections = r);
  }
  /** Sync current facet selections back to URL (replaceState) */
  _syncUrl() {
    const e = new URLSearchParams(), t = this._parseUrlParamMap(), r = /* @__PURE__ */ new Map();
    for (const [a, o] of t)
      r.set(o, a);
    for (const [a, o] of Object.entries(this._activeSelections)) {
      if (o.size === 0)
        continue;
      const l = r.get(a) ?? a;
      e.set(l, [...o].join(","));
    }
    const i = e.toString(), s = i ? `${window.location.pathname}?${i}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", s);
  }
  // --- Rendering ---
  render() {
    if (this._rawData.length === 0 || this._facetGroups.length === 0)
      return m;
    const e = Object.keys(this._activeSelections).some((t) => this._activeSelections[t].size > 0);
    return d`
      <style>
        .gouv-facets { margin-bottom: 1.5rem; }
        .gouv-facets__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .gouv-facets__groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
        .gouv-facets__group { min-width: 0; }
        .gouv-facets__count { font-weight: 400; font-size: 0.75rem; color: var(--text-mention-grey, #666); margin-left: 0.25rem; }
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
        ${e ? d`
          <div class="gouv-facets__header">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line" type="button" @click="${this._clearAll}">
              Reinitialiser les filtres
            </button>
          </div>
        ` : m}
        <div class="gouv-facets__groups">
          ${this._facetGroups.map((t) => this._renderFacetGroup(t))}
        </div>
      </div>
    `;
  }
  _renderFacetGroup(e) {
    switch (this._getDisplayMode(e.field)) {
      case "select":
        return this._renderSelectGroup(e);
      case "multiselect":
        return this._renderMultiselectGroup(e);
      case "radio":
        return this._renderRadioGroup(e);
      default:
        return this._renderCheckboxGroup(e);
    }
  }
  _renderCheckboxGroup(e) {
    const r = Ne(this.searchable).includes(e.field), i = (this._searchQueries[e.field] ?? "").toLowerCase(), s = this._expandedFacets.has(e.field), a = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set();
    let o = e.values;
    r && i && (o = o.filter((p) => p.value.toLowerCase().includes(i)));
    const l = s ? o : o.slice(0, this.maxValues), u = o.length > this.maxValues, f = `facet-${this.id}-${e.field}`;
    return d`
      <fieldset class="fr-fieldset gouv-facets__group" aria-labelledby="${f}-legend">
        <legend class="fr-fieldset__legend fr-text--bold" id="${f}-legend">${e.label}</legend>
        ${r ? d`
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(p) => this._handleSearch(e.field, p)}"
                aria-label="Rechercher dans ${e.label}">
            </div>
          </div>
        ` : m}
        ${l.map((p) => {
      const g = `${f}-${p.value.replace(/[^a-zA-Z0-9]/g, "_")}`, _ = a.has(p.value);
      return d`
            <div class="fr-fieldset__element">
              <div class="fr-checkbox-group fr-checkbox-group--sm">
                <input type="checkbox" id="${g}"
                  .checked="${_}"
                  @change="${() => this._toggleValue(e.field, p.value)}">
                <label class="fr-label" for="${g}">
                  ${p.value}${this.hideCounts ? m : d` <span class="gouv-facets__count">${p.count}</span>`}
                </label>
              </div>
            </div>
          `;
    })}
        ${u ? d`
          <div class="fr-fieldset__element">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm" type="button"
              @click="${() => this._toggleExpand(e.field)}">
              ${s ? "Voir moins" : `Voir plus (${o.length - this.maxValues})`}
            </button>
          </div>
        ` : m}
      </fieldset>
    `;
  }
  _renderSelectGroup(e) {
    const t = `facet-${this.id}-${e.field}`, r = this._activeSelections[e.field], i = r ? [...r][0] ?? "" : "";
    return d`
      <div class="gouv-facets__group fr-select-group" data-field="${e.field}">
        <label class="fr-label" for="${t}-select">${e.label}</label>
        <select class="fr-select" id="${t}-select"
          @change="${(s) => this._handleSelectChange(e.field, s)}">
          <option value="" ?selected="${!i}">Tous</option>
          ${e.values.map((s) => d`
            <option value="${s.value}" ?selected="${s.value === i}">
              ${this.hideCounts ? s.value : `${s.value} (${s.count})`}
            </option>
          `)}
        </select>
      </div>
    `;
  }
  _renderMultiselectGroup(e) {
    const t = `facet-${this.id}-${e.field}`, r = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set(), i = this._openMultiselectField === e.field, s = (this._searchQueries[e.field] ?? "").toLowerCase();
    let a = e.values;
    s && (a = a.filter((l) => l.value.toLowerCase().includes(s)));
    const o = r.size > 0 ? `${r.size} option${r.size > 1 ? "s" : ""} selectionnee${r.size > 1 ? "s" : ""}` : "Selectionnez des options";
    return d`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}">
        <label class="fr-label" id="${t}-legend">${e.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${i}"
          aria-controls="${t}-panel"
          @click="${(l) => {
      l.stopPropagation(), this._toggleMultiselectDropdown(e.field);
    }}">
          ${o}
        </button>
        ${i ? d`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               @click="${(l) => l.stopPropagation()}">
            <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left ${r.size > 0 ? "fr-icon-close-circle-line" : "fr-icon-check-line"} gouv-facets__multiselect-toggle"
              type="button"
              @click="${() => r.size > 0 ? this._clearFieldSelections(e.field) : this._selectAllValues(e.field)}">
              ${r.size > 0 ? "Tout deselectionner" : "Tout selectionner"}
            </button>
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${e.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(l) => this._handleSearch(e.field, l)}">
              <button class="fr-btn" type="button" title="Rechercher" aria-label="Rechercher">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${e.label}">
              ${a.map((l) => {
      const u = `${t}-${l.value.replace(/[^a-zA-Z0-9]/g, "_")}`, f = r.has(l.value);
      return d`
                  <div class="fr-fieldset__element">
                    <div class="fr-checkbox-group fr-checkbox-group--sm">
                      <input type="checkbox" id="${u}"
                        .checked="${f}"
                        @change="${() => this._toggleValue(e.field, l.value)}">
                      <label class="fr-label" for="${u}">
                        ${l.value}${this.hideCounts ? m : d` <span class="gouv-facets__count">${l.count}</span>`}
                      </label>
                    </div>
                  </div>
                `;
    })}
            </fieldset>
          </div>
        ` : m}
      </div>
    `;
  }
  _renderRadioGroup(e) {
    const t = `facet-${this.id}-${e.field}`, r = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set(), i = this._openMultiselectField === e.field, s = (this._searchQueries[e.field] ?? "").toLowerCase();
    let a = e.values;
    s && (a = a.filter((u) => u.value.toLowerCase().includes(s)));
    const l = (r.size > 0 ? [...r][0] : null) ?? "Selectionnez une option";
    return d`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}">
        <label class="fr-label" id="${t}-legend">${e.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${i}"
          aria-controls="${t}-panel"
          @click="${(u) => {
      u.stopPropagation(), this._toggleMultiselectDropdown(e.field);
    }}">
          ${l}
        </button>
        ${i ? d`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               @click="${(u) => u.stopPropagation()}">
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${e.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(u) => this._handleSearch(e.field, u)}">
              <button class="fr-btn" type="button" title="Rechercher" aria-label="Rechercher">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${e.label}">
              ${a.map((u) => {
      const f = `${t}-${u.value.replace(/[^a-zA-Z0-9]/g, "_")}`, p = r.has(u.value);
      return d`
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-group--sm">
                      <input type="radio" id="${f}" name="${t}-radio"
                        .checked="${p}"
                        @change="${() => this._toggleValue(e.field, u.value)}">
                      <label class="fr-label" for="${f}">
                        ${u.value}${this.hideCounts ? m : d` <span class="gouv-facets__count">${u.count}</span>`}
                      </label>
                    </div>
                  </div>
                `;
    })}
            </fieldset>
          </div>
        ` : m}
      </div>
    `;
  }
}, h(le, "GouvFacets"), le);
x([
  c({ type: String })
], w.prototype, "source", void 0);
x([
  c({ type: String })
], w.prototype, "fields", void 0);
x([
  c({ type: String })
], w.prototype, "labels", void 0);
x([
  c({ type: Number, attribute: "max-values" })
], w.prototype, "maxValues", void 0);
x([
  c({ type: String })
], w.prototype, "disjunctive", void 0);
x([
  c({ type: String })
], w.prototype, "sort", void 0);
x([
  c({ type: String })
], w.prototype, "searchable", void 0);
x([
  c({ type: Boolean, attribute: "hide-empty" })
], w.prototype, "hideEmpty", void 0);
x([
  c({ type: String })
], w.prototype, "display", void 0);
x([
  c({ type: Boolean, attribute: "url-params" })
], w.prototype, "urlParams", void 0);
x([
  c({ type: String, attribute: "url-param-map" })
], w.prototype, "urlParamMap", void 0);
x([
  c({ type: Boolean, attribute: "url-sync" })
], w.prototype, "urlSync", void 0);
x([
  c({ type: Boolean, attribute: "server-facets" })
], w.prototype, "serverFacets", void 0);
x([
  c({ type: Boolean, attribute: "hide-counts" })
], w.prototype, "hideCounts", void 0);
x([
  b()
], w.prototype, "_rawData", void 0);
x([
  b()
], w.prototype, "_facetGroups", void 0);
x([
  b()
], w.prototype, "_activeSelections", void 0);
x([
  b()
], w.prototype, "_expandedFacets", void 0);
x([
  b()
], w.prototype, "_searchQueries", void 0);
x([
  b()
], w.prototype, "_openMultiselectField", void 0);
w = x([
  M("gouv-facets")
], w);
function Ne(n) {
  return n ? n.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
h(Ne, "_parseCSV");
var E = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, ce;
let k = (ce = class extends A {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.placeholder = "Rechercher…", this.label = "Rechercher", this.debounce = 300, this.minLength = 0, this.highlight = !1, this.operator = "contains", this.srLabel = !1, this.count = !1, this.urlSearchParam = "", this.urlSync = !1, this.serverSearch = !1, this.searchTemplate = 'search("{q}")', this._allData = [], this._filteredData = [], this._term = "", this._resultCount = 0, this._debounceTimer = null, this._unsubscribe = null, this._urlParamApplied = !1;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), q("gouv-search"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._debounceTimer !== null && (clearTimeout(this._debounceTimer), this._debounceTimer = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && Fe(this.id);
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    ["fields", "operator", "minLength", "highlight"].some((i) => e.has(i)) && this._allData.length > 0 && this._applyFilter();
  }
  // --- Public methods ---
  /** Efface le champ et restaure toutes les donnees */
  clear() {
    this._term = "";
    const e = this.querySelector("input");
    e && (e.value = ""), this._applyFilter();
  }
  /** Declenche une recherche programmatique */
  search(e) {
    this._term = e;
    const t = this.querySelector("input");
    t && (t.value = e), this._applyFilter();
  }
  /** Retourne les donnees actuellement filtrees */
  getData() {
    return this._filteredData;
  }
  /** Remplace le jeu de donnees source */
  setData(e) {
    this._allData = Array.isArray(e) ? e : [], this._applyFilter();
  }
  // --- Private implementation ---
  _initialize() {
    if (!this.id) {
      console.warn('gouv-search: attribut "id" requis');
      return;
    }
    if (!this.source) {
      console.warn('gouv-search: attribut "source" requis');
      return;
    }
    this._unsubscribe && this._unsubscribe();
    const e = we(this.source);
    e !== void 0 && this._onData(e), this._unsubscribe = Ue(this.source, {
      onLoaded: /* @__PURE__ */ h((t) => {
        this._onData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ h(() => {
        W(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ h((t) => {
        G(this.id, t);
      }, "onError")
    });
  }
  _onData(e) {
    const t = Array.isArray(e) ? e : [];
    if (this.serverSearch) {
      this._allData = t, this._filteredData = t;
      const r = He(this.source);
      this._resultCount = r ? r.total : t.length, this.id && j(this.id, t), this.urlSearchParam && !this._urlParamApplied && (this._applyUrlSearchParam(), this._urlParamApplied = !0, this._term && this._applyServerSearch());
      return;
    }
    this._allData = t, this.urlSearchParam && !this._urlParamApplied && (this._applyUrlSearchParam(), this._urlParamApplied = !0), this._applyFilter();
  }
  /** Read URL search param and set as initial search term */
  _applyUrlSearchParam() {
    if (!this.urlSearchParam)
      return;
    const t = new URLSearchParams(window.location.search).get(this.urlSearchParam);
    t && (this._term = t);
  }
  _applyFilter() {
    if (this.serverSearch && this.source) {
      this._applyServerSearch();
      return;
    }
    const e = this._term;
    if (!e || e.length < this.minLength)
      this._filteredData = [...this._allData];
    else {
      const t = this._getFields(), r = this.operator || "contains", i = this._normalize(e);
      this._filteredData = this._allData.filter((s) => this._matchRecord(s, i, t, r));
    }
    this.highlight && e && e.length >= this.minLength && (this._filteredData = this._filteredData.map((t) => this._addHighlight(t, e))), this._resultCount = this._filteredData.length, this._dispatch();
  }
  /**
   * Server-search: envoie une commande { where } au source upstream
   * au lieu de filtrer localement.
   */
  _applyServerSearch() {
    const e = this._term;
    let t = "";
    if (e && e.length >= this.minLength) {
      const r = e.replace(/"/g, '\\"');
      t = this.searchTemplate.replace(/\{q\}/g, r);
    }
    Q(this.source, { where: t, whereKey: this.id }), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
      bubbles: !0,
      composed: !0,
      detail: {
        sourceId: this.id,
        term: this._term,
        count: this._resultCount
      }
    }));
  }
  _matchRecord(e, t, r, i) {
    const s = r.length > 0 ? r : Object.keys(e).filter((a) => !a.startsWith("_"));
    switch (i) {
      case "starts":
        return s.some((a) => this._normalize(String(e[a] ?? "")).split(/\s+/).some((l) => l.startsWith(t)));
      case "words":
        return t.split(/\s+/).filter(Boolean).every((o) => s.some((l) => this._normalize(String(e[l] ?? "")).includes(o)));
      case "contains":
      default:
        return s.some((a) => this._normalize(String(e[a] ?? "")).includes(t));
    }
  }
  _normalize(e) {
    return String(e).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }
  _getFields() {
    return this.fields ? this.fields.split(",").map((e) => e.trim()).filter(Boolean) : [];
  }
  _addHighlight(e, t) {
    const r = { ...e }, i = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), s = new RegExp("(" + i + ")", "gi"), a = this._getFields(), o = a.length > 0 ? a : Object.keys(e).filter((u) => typeof e[u] == "string"), l = [];
    return o.forEach((u) => {
      typeof e[u] == "string" && l.push(e[u].replace(s, "<mark>$1</mark>"));
    }), r._highlight = l.join(" … "), r;
  }
  _onInput(e) {
    this._term = e, this._debounceTimer !== null && clearTimeout(this._debounceTimer), this._debounceTimer = setTimeout(() => {
      this._debounceTimer = null, this._applyFilter();
    }, this.debounce);
  }
  _onSubmit() {
    this._debounceTimer !== null && (clearTimeout(this._debounceTimer), this._debounceTimer = null), this._applyFilter();
  }
  _dispatch() {
    this.id && (j(this.id, this._filteredData), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
      bubbles: !0,
      composed: !0,
      detail: {
        sourceId: this.id,
        term: this._term,
        count: this._filteredData.length
      }
    })));
  }
  /** Sync current search term back to URL (replaceState) */
  _syncUrl() {
    const e = new URLSearchParams(window.location.search);
    this._term ? e.set(this.urlSearchParam, this._term) : e.delete(this.urlSearchParam);
    const t = e.toString(), r = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", r);
  }
  render() {
    const e = this.id || "search", t = this.srLabel ? "fr-label sr-only" : "fr-label";
    return d`
      <div class="fr-search-bar" role="search" aria-label="${this.label}">
        <label class="${t}" for="gouv-search-${e}">${this.label}</label>
        <input class="fr-input"
          type="search"
          id="gouv-search-${e}"
          placeholder="${this.placeholder}"
          autocomplete="off"
          .value="${this._term}"
          @input="${(r) => this._onInput(r.target.value)}"
          @search="${(r) => {
      this._term = r.target.value, this._onSubmit();
    }}"
          @keydown="${(r) => {
      r.key === "Enter" && (r.preventDefault(), this._onSubmit());
    }}">
        <button class="fr-btn" title="Rechercher" type="button"
          @click="${(r) => {
      r.preventDefault(), this._onSubmit();
    }}">
          Rechercher
        </button>
      </div>
      ${this.count ? d`
        <p class="fr-text--sm fr-mt-1v gouv-search-count" aria-live="polite">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      ` : m}
    `;
  }
}, h(ce, "GouvSearch"), ce);
E([
  c({ type: String })
], k.prototype, "source", void 0);
E([
  c({ type: String })
], k.prototype, "fields", void 0);
E([
  c({ type: String })
], k.prototype, "placeholder", void 0);
E([
  c({ type: String })
], k.prototype, "label", void 0);
E([
  c({ type: Number })
], k.prototype, "debounce", void 0);
E([
  c({ type: Number, attribute: "min-length" })
], k.prototype, "minLength", void 0);
E([
  c({ type: Boolean })
], k.prototype, "highlight", void 0);
E([
  c({ type: String })
], k.prototype, "operator", void 0);
E([
  c({ type: Boolean, attribute: "sr-label" })
], k.prototype, "srLabel", void 0);
E([
  c({ type: Boolean })
], k.prototype, "count", void 0);
E([
  c({ type: String, attribute: "url-search-param" })
], k.prototype, "urlSearchParam", void 0);
E([
  c({ type: Boolean, attribute: "url-sync" })
], k.prototype, "urlSync", void 0);
E([
  c({ type: Boolean, attribute: "server-search" })
], k.prototype, "serverSearch", void 0);
E([
  c({ type: String, attribute: "search-template" })
], k.prototype, "searchTemplate", void 0);
E([
  b()
], k.prototype, "_allData", void 0);
E([
  b()
], k.prototype, "_filteredData", void 0);
E([
  b()
], k.prototype, "_term", void 0);
E([
  b()
], k.prototype, "_resultCount", void 0);
k = E([
  M("gouv-search")
], k);
function Ve(n) {
  const t = class t extends n {
    constructor() {
      super(...arguments), this._sourceLoading = !1, this._sourceData = null, this._sourceError = null, this._unsubscribeSource = null;
    }
    /**
     * Hook appelé quand de nouvelles données arrivent.
     * À surcharger dans le composant hôte.
     */
    onSourceData(i) {
    }
    connectedCallback() {
      super.connectedCallback(), this._subscribeToSource();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._cleanupSubscription();
    }
    updated(i) {
      super.updated(i), i.has("source") && this._subscribeToSource();
    }
    _subscribeToSource() {
      this._cleanupSubscription();
      const i = this.source;
      if (!i)
        return;
      const s = we(i);
      s !== void 0 && (this._sourceData = s, this.onSourceData(s)), this._unsubscribeSource = Ue(i, {
        onLoaded: /* @__PURE__ */ h((a) => {
          this._sourceData = a, this._sourceLoading = !1, this._sourceError = null, this.onSourceData(a), this.requestUpdate();
        }, "onLoaded"),
        onLoading: /* @__PURE__ */ h(() => {
          this._sourceLoading = !0, this.requestUpdate();
        }, "onLoading"),
        onError: /* @__PURE__ */ h((a) => {
          this._sourceError = a, this._sourceLoading = !1, this.requestUpdate();
        }, "onError")
      });
    }
    _cleanupSubscription() {
      this._unsubscribeSource && (this._unsubscribeSource(), this._unsubscribeSource = null);
    }
  };
  h(t, "SourceSubscriberElement");
  let e = t;
  return e;
}
h(Ve, "SourceSubscriberMixin");
function Gt(n, e = "nombre") {
  if (n == null || n === "")
    return "—";
  const t = typeof n == "string" ? parseFloat(n) : n;
  if (isNaN(t))
    return "—";
  switch (e) {
    case "nombre":
      return Wt(t);
    case "pourcentage":
      return Dr(t);
    case "euro":
      return Mr(t);
    case "decimal":
      return Fr(t);
    default:
      return Wt(t);
  }
}
h(Gt, "formatValue");
function Wt(n) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(n));
}
h(Wt, "formatNumber");
function Dr(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(n / 100);
}
h(Dr, "formatPercentage");
function Mr(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n);
}
h(Mr, "formatCurrency");
function Fr(n) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(n);
}
h(Fr, "formatDecimal");
function Vr(n) {
  const e = typeof n == "string" ? new Date(n) : n;
  return isNaN(e.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(e);
}
h(Vr, "formatDate");
function Ur(n, e, t) {
  return e !== void 0 && n >= e ? "vert" : t !== void 0 && n >= t ? "orange" : e !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
h(Ur, "getColorBySeuil");
function Tr(n) {
  const e = n.split(":");
  if (e.length === 1)
    return e[0] === "count" ? { type: "count", field: "" } : { type: "direct", field: e[0] };
  const t = e[0], r = e[1];
  if (e.length === 3) {
    let i = e[2];
    return i === "true" ? i = !0 : i === "false" ? i = !1 : isNaN(Number(i)) || (i = Number(i)), { type: t, field: r, filterField: r, filterValue: i };
  }
  return { type: t, field: r };
}
h(Tr, "parseExpression");
function Qt(n, e) {
  const t = Tr(e);
  if (t.type === "direct" && !Array.isArray(n))
    return n[t.field];
  if (!Array.isArray(n))
    return null;
  const r = n;
  switch (t.type) {
    case "direct":
    case "first":
      return r.length > 0 ? r[0][t.field] : null;
    case "last":
      return r.length > 0 ? r[r.length - 1][t.field] : null;
    case "count":
      return t.filterValue !== void 0 ? r.filter((s) => s[t.field] === t.filterValue).length : r.length;
    case "sum":
      return r.reduce((s, a) => {
        const o = Number(a[t.field]);
        return s + (isNaN(o) ? 0 : o);
      }, 0);
    case "avg":
      return r.length === 0 ? null : r.reduce((s, a) => {
        const o = Number(a[t.field]);
        return s + (isNaN(o) ? 0 : o);
      }, 0) / r.length;
    case "min":
      return r.length === 0 ? null : Math.min(...r.map((s) => Number(s[t.field])).filter((s) => !isNaN(s)));
    case "max":
      return r.length === 0 ? null : Math.max(...r.map((s) => Number(s[t.field])).filter((s) => !isNaN(s)));
    default:
      return null;
  }
}
h(Qt, "computeAggregation");
var B = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
const Jt = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
var ue;
let U = (ue = class extends Ve(A) {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "";
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), q("gouv-kpi");
  }
  _computeValue() {
    return !this._sourceData || !this.valeur ? null : Qt(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const e = this._computeValue();
    return typeof e != "number" ? "bleu" : Ur(e, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const e = Qt(this._sourceData, this.tendance);
    return typeof e != "number" ? null : {
      value: e,
      direction: e > 0 ? "up" : e < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const e = this._computeValue(), t = Gt(e, this.format);
    return `${this.label}: ${t}`;
  }
  render() {
    const e = this._computeValue(), t = Gt(e, this.format), r = Jt[this._getColor()] || Jt.bleu, i = this._getTendanceInfo();
    return d`
      <div
        class="gouv-kpi ${r}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._sourceLoading ? d`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? d`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : d`
          <div class="gouv-kpi__content">
            ${this.icone ? d`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            ` : ""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${t}</span>
              ${i ? d`
                <span class="gouv-kpi__tendance gouv-kpi__tendance--${i.direction}" aria-label="${i.value > 0 ? "en hausse" : i.value < 0 ? "en baisse" : "stable"}">
                  ${i.direction === "up" ? "↑" : i.direction === "down" ? "↓" : "→"}
                  ${Math.abs(i.value).toFixed(1)}%
                </span>
              ` : ""}
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
    `;
  }
}, h(ue, "GouvKpi"), ue);
U.styles = Xt``;
B([
  c({ type: String })
], U.prototype, "source", void 0);
B([
  c({ type: String })
], U.prototype, "valeur", void 0);
B([
  c({ type: String })
], U.prototype, "label", void 0);
B([
  c({ type: String })
], U.prototype, "description", void 0);
B([
  c({ type: String })
], U.prototype, "icone", void 0);
B([
  c({ type: String })
], U.prototype, "format", void 0);
B([
  c({ type: String })
], U.prototype, "tendance", void 0);
B([
  c({ type: Number, attribute: "seuil-vert" })
], U.prototype, "seuilVert", void 0);
B([
  c({ type: Number, attribute: "seuil-orange" })
], U.prototype, "seuilOrange", void 0);
B([
  c({ type: String })
], U.prototype, "couleur", void 0);
U = B([
  M("gouv-kpi")
], U);
var D = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, he;
let R = (he = class extends Ve(A) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this.urlSync = !1, this.urlPageParam = "page", this.serverTri = !1, this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._popstateHandler = null;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), q("gouv-datalist"), this._initSort(), this.urlSync && (this._applyUrlPage(), this._popstateHandler = () => {
      this._applyUrlPage(), this.requestUpdate();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null);
  }
  updated(e) {
    super.updated(e), e.has("tri") && this._initSort();
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [];
    const t = this.source ? He(this.source) : void 0;
    t && t.total > 0 ? (this._serverPagination = !0, this._serverTotal = t.total, this._serverPageSize = t.pageSize, this._currentPage = t.page) : (this._serverPagination = !1, this._currentPage = 1);
  }
  // --- Parsing ---
  parseColumns() {
    return this.colonnes ? this.colonnes.split(",").map((e) => {
      const [t, r] = e.trim().split(":");
      return { key: t.trim(), label: (r == null ? void 0 : r.trim()) || t.trim() };
    }) : [];
  }
  _getFilterableColumns() {
    return this.filtres ? this.filtres.split(",").map((e) => e.trim()) : [];
  }
  _initSort() {
    if (this.tri) {
      const [e, t] = this.tri.split(":");
      this._sort = { key: e, direction: t || "asc" };
    }
  }
  // --- Data processing ---
  _getUniqueValues(e) {
    const t = /* @__PURE__ */ new Set();
    return this._data.forEach((r) => {
      const i = r[e];
      i != null && t.add(String(i));
    }), Array.from(t).sort();
  }
  getFilteredData() {
    let e = [...this._data];
    if (this._searchQuery) {
      const t = this._searchQuery.toLowerCase();
      e = e.filter((r) => Object.values(r).some((i) => String(i).toLowerCase().includes(t)));
    }
    if (Object.entries(this._activeFilters).forEach(([t, r]) => {
      r && (e = e.filter((i) => String(i[t]) === r));
    }), this._sort && !this.serverTri) {
      const { key: t, direction: r } = this._sort;
      e.sort((i, s) => {
        const a = i[t], o = s[t];
        if (a === o)
          return 0;
        if (a == null)
          return 1;
        if (o == null)
          return -1;
        const l = typeof a == "number" && typeof o == "number" ? a - o : String(a).localeCompare(String(o), "fr");
        return r === "desc" ? -l : l;
      });
    }
    return e;
  }
  _getPaginatedData() {
    const e = this.getFilteredData();
    if (this._serverPagination || !this.pagination || this.pagination <= 0)
      return e;
    const t = (this._currentPage - 1) * this.pagination;
    return e.slice(t, t + this.pagination);
  }
  _getTotalPages() {
    return this._serverPagination ? Math.ceil(this._serverTotal / this._serverPageSize) : !this.pagination || this.pagination <= 0 ? 1 : Math.ceil(this.getFilteredData().length / this.pagination);
  }
  // --- Event handlers ---
  /** Read page number from URL and apply */
  _applyUrlPage() {
    const t = new URLSearchParams(window.location.search).get(this.urlPageParam);
    if (t) {
      const r = parseInt(t, 10);
      !isNaN(r) && r >= 1 && (this._currentPage = r, this._serverPagination && this.source && Q(this.source, { page: r }));
    }
  }
  /** Sync current page to URL via replaceState */
  _syncPageUrl() {
    const e = new URLSearchParams(window.location.search);
    this._currentPage > 1 ? e.set(this.urlPageParam, String(this._currentPage)) : e.delete(this.urlPageParam);
    const t = e.toString(), r = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", r);
  }
  _handleSearch(e) {
    this._searchQuery = e.target.value, this._currentPage = 1, this.urlSync && this._syncPageUrl();
  }
  _handleFilter(e, t) {
    this._activeFilters = { ...this._activeFilters, [e]: t.target.value }, this._currentPage = 1, this.urlSync && this._syncPageUrl();
  }
  _handleSort(e) {
    var t;
    ((t = this._sort) == null ? void 0 : t.key) === e ? this._sort = { key: e, direction: this._sort.direction === "asc" ? "desc" : "asc" } : this._sort = { key: e, direction: "asc" }, this.serverTri && this.source && Q(this.source, {
      orderBy: `${this._sort.key}:${this._sort.direction}`
    });
  }
  _handlePageChange(e) {
    this._currentPage = e, this._serverPagination && this.source && Q(this.source, { page: e }), this.urlSync && this._syncPageUrl();
  }
  // --- Export ---
  _exportCsv() {
    const e = this.parseColumns(), t = this.getFilteredData(), r = e.map((u) => u.label).join(";"), i = t.map((u) => e.map((f) => {
      const p = String(u[f.key] ?? "");
      return p.includes(";") || p.includes('"') ? `"${p.replace(/"/g, '""')}"` : p;
    }).join(";")), s = [r, ...i].join(`
`), a = new Blob([s], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(a), l = document.createElement("a");
    l.href = o, l.download = "export.csv", l.click(), URL.revokeObjectURL(o);
  }
  _exportHtml() {
    const e = this.parseColumns(), t = this.getFilteredData(), r = e.map((u) => `<th>${nt(u.label)}</th>`).join(""), i = t.map((u) => `<tr>${e.map((p) => {
      const g = u[p.key];
      return `<td>${g == null ? "" : nt(String(g))}</td>`;
    }).join("")}</tr>`).join(`
`), s = `<!DOCTYPE html>
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
<thead><tr>${r}</tr></thead>
<tbody>
${i}
</tbody>
</table>
</body>
</html>`, a = new Blob([s], { type: "text/html;charset=utf-8;" }), o = URL.createObjectURL(a), l = document.createElement("a");
    l.href = o, l.download = "export.html", l.click(), URL.revokeObjectURL(o);
  }
  // --- Cell formatting ---
  formatCellValue(e) {
    return e == null ? "—" : typeof e == "boolean" ? e ? "Oui" : "Non" : String(e);
  }
  // --- Render sub-templates ---
  _renderFilters(e, t) {
    return t.length === 0 ? "" : d`
      <div class="gouv-datalist__filters">
        ${t.map((r) => {
      const i = e.find((o) => o.key === r), s = (i == null ? void 0 : i.label) || r, a = this._getUniqueValues(r);
      return d`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${r}">${s}</label>
              <select
                class="fr-select"
                id="filter-${r}"
                @change="${(o) => this._handleFilter(r, o)}"
              >
                <option value="">Tous</option>
                ${a.map((o) => d`
                  <option value="${o}" ?selected="${this._activeFilters[r] === o}">${o}</option>
                `)}
              </select>
            </div>
          `;
    })}
      </div>
    `;
  }
  _renderToolbar() {
    var t, r, i, s;
    const e = ((t = this.export) == null ? void 0 : t.includes("csv")) || ((r = this.export) == null ? void 0 : r.includes("html"));
    return !this.recherche && !e ? "" : d`
      <div class="gouv-datalist__toolbar">
        ${this.recherche ? d`
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
        ` : d`<div></div>`}

        <div class="gouv-datalist__export-buttons">
          ${(i = this.export) != null && i.includes("csv") ? d`
            <button
              class="fr-btn fr-btn--secondary fr-btn--sm"
              @click="${this._exportCsv}"
              type="button"
            >
              <span class="fr-icon-download-line fr-icon--sm" aria-hidden="true"></span>
              Exporter CSV
            </button>
          ` : ""}

          ${(s = this.export) != null && s.includes("html") ? d`
            <button
              class="fr-btn fr-btn--secondary fr-btn--sm"
              @click="${this._exportHtml}"
              type="button"
            >
              <span class="fr-icon-code-s-slash-line fr-icon--sm" aria-hidden="true"></span>
              Exporter HTML
            </button>
          ` : ""}
        </div>
      </div>
    `;
  }
  _renderTable(e, t) {
    return d`
      <div class="fr-table fr-table--bordered">
        <table>
          <caption class="fr-sr-only">Liste des données</caption>
          <thead>
            <tr>
              ${e.map((r) => {
      var i;
      return d`
                <th scope="col">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${() => this._handleSort(r.key)}"
                    aria-label="Trier par ${r.label}"
                    type="button"
                  >
                    ${r.label}
                    ${((i = this._sort) == null ? void 0 : i.key) === r.key ? d`
                      <span aria-hidden="true">${this._sort.direction === "asc" ? "↑" : "↓"}</span>
                    ` : ""}
                  </button>
                </th>
              `;
    })}
            </tr>
          </thead>
          <tbody>
            ${t.length === 0 ? d`
              <tr>
                <td colspan="${e.length}" class="gouv-datalist__empty">
                  Aucune donnée à afficher
                </td>
              </tr>
            ` : t.map((r) => d`
              <tr>
                ${e.map((i) => d`
                  <td>${this.formatCellValue(r[i.key])}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
  _renderPagination(e) {
    if (this.pagination <= 0 || e <= 1)
      return "";
    const t = [];
    for (let r = Math.max(1, this._currentPage - 2); r <= Math.min(e, this._currentPage + 2); r++)
      t.push(r);
    return d`
      <nav class="fr-pagination" aria-label="Pagination">
        <ul class="fr-pagination__list">
          <li>
            <button class="fr-pagination__link fr-pagination__link--first"
              ?disabled="${this._currentPage === 1}"
              @click="${() => this._handlePageChange(1)}"
              aria-label="Première page" type="button">Première page</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--prev"
              ?disabled="${this._currentPage === 1}"
              @click="${() => this._handlePageChange(this._currentPage - 1)}"
              aria-label="Page précédente" type="button">Page précédente</button>
          </li>
          ${t.map((r) => d`
            <li>
              <button
                class="fr-pagination__link ${r === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(r)}"
                aria-current="${r === this._currentPage ? "page" : "false"}"
                type="button"
              >${r}</button>
            </li>
          `)}
          <li>
            <button class="fr-pagination__link fr-pagination__link--next"
              ?disabled="${this._currentPage === e}"
              @click="${() => this._handlePageChange(this._currentPage + 1)}"
              aria-label="Page suivante" type="button">Page suivante</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--last"
              ?disabled="${this._currentPage === e}"
              @click="${() => this._handlePageChange(e)}"
              aria-label="Dernière page" type="button">Dernière page</button>
          </li>
        </ul>
      </nav>
    `;
  }
  // --- Main render ---
  render() {
    const e = this.parseColumns(), t = this._getFilterableColumns(), r = this._getPaginatedData(), i = this._getTotalPages(), s = this._serverPagination ? this._serverTotal : this.getFilteredData().length;
    return d`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        ${this._renderFilters(e, t)}
        ${this._renderToolbar()}

        ${this._sourceLoading ? d`
          <div class="gouv-datalist__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement des données...
          </div>
        ` : this._sourceError ? d`
          <div class="gouv-datalist__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur: ${this._sourceError.message}
          </div>
        ` : d`
          <p class="fr-text--sm" aria-live="polite">
            ${s} résultat${s > 1 ? "s" : ""}
            ${!this._serverPagination && (this._searchQuery || Object.values(this._activeFilters).some((a) => a)) ? " (filtré)" : ""}
          </p>
          ${this._renderTable(e, r)}
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
    `;
  }
}, h(he, "GouvDatalist"), he);
R.styles = Xt``;
D([
  c({ type: String })
], R.prototype, "source", void 0);
D([
  c({ type: String })
], R.prototype, "colonnes", void 0);
D([
  c({ type: Boolean })
], R.prototype, "recherche", void 0);
D([
  c({ type: String })
], R.prototype, "filtres", void 0);
D([
  c({ type: String })
], R.prototype, "tri", void 0);
D([
  c({ type: Number })
], R.prototype, "pagination", void 0);
D([
  c({ type: String })
], R.prototype, "export", void 0);
D([
  c({ type: Boolean, attribute: "url-sync" })
], R.prototype, "urlSync", void 0);
D([
  c({ type: String, attribute: "url-page-param" })
], R.prototype, "urlPageParam", void 0);
D([
  c({ type: Boolean, attribute: "server-tri" })
], R.prototype, "serverTri", void 0);
D([
  b()
], R.prototype, "_data", void 0);
D([
  b()
], R.prototype, "_searchQuery", void 0);
D([
  b()
], R.prototype, "_activeFilters", void 0);
D([
  b()
], R.prototype, "_sort", void 0);
D([
  b()
], R.prototype, "_currentPage", void 0);
D([
  b()
], R.prototype, "_serverPagination", void 0);
R = D([
  M("gouv-datalist")
], R);
var N = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, de;
let T = (de = class extends Ve(A) {
  constructor() {
    super(...arguments), this.source = "", this.cols = 1, this.pagination = 0, this.empty = "Aucun resultat", this.gap = "fr-grid-row--gutters", this.uidField = "", this.urlSync = !1, this.urlPageParam = "page", this._data = [], this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._templateContent = "", this._hashScrollDone = !1, this._popstateHandler = null;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), q("gouv-display"), this._captureTemplate(), this.urlSync && (this._applyUrlPage(), this._popstateHandler = () => {
      this._applyUrlPage(), this.requestUpdate();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [], this._hashScrollDone = !1;
    const t = this.source ? He(this.source) : void 0;
    t && t.total > 0 ? (this._serverPagination = !0, this._serverTotal = t.total, this._serverPageSize = t.pageSize, this._currentPage = t.page) : (this._serverPagination = !1, this._currentPage = 1);
  }
  updated(e) {
    if (super.updated(e), !this._hashScrollDone && this._data.length > 0 && window.location.hash) {
      this._hashScrollDone = !0;
      const t = window.location.hash.substring(1);
      requestAnimationFrame(() => {
        const r = this.querySelector(`#${CSS.escape(t)}`);
        r && r.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }
  _captureTemplate() {
    const e = this.querySelector("template");
    e && (this._templateContent = e.innerHTML);
  }
  /** Remplace les placeholders dans le template pour un item donne */
  _renderItem(e, t) {
    if (!this._templateContent)
      return "";
    let r = this._templateContent;
    return r = r.replace(/\{\{\{([^}]+)\}\}\}/g, (i, s) => this._resolveExpression(e, s.trim(), t)), r = r.replace(/\{\{([^}]+)\}\}/g, (i, s) => {
      const a = this._resolveExpression(e, s.trim(), t);
      return nt(a);
    }), r;
  }
  /** Resout une expression : champ, champ.nested, champ|defaut, $index, $uid */
  _resolveExpression(e, t, r) {
    if (t === "$index")
      return String(r);
    if (t === "$uid")
      return this._getItemUid(e, r);
    let i = t, s = "";
    const a = t.indexOf("|");
    a !== -1 && (i = t.substring(0, a).trim(), s = t.substring(a + 1).trim());
    const o = y(e, i);
    return o == null ? s : String(o);
  }
  // --- Pagination ---
  _getPaginatedData() {
    if (this._serverPagination)
      return this._data;
    if (!this.pagination || this.pagination <= 0)
      return this._data;
    const e = (this._currentPage - 1) * this.pagination;
    return this._data.slice(e, e + this.pagination);
  }
  _getTotalPages() {
    return this._serverPagination ? Math.ceil(this._serverTotal / this._serverPageSize) : !this.pagination || this.pagination <= 0 ? 1 : Math.ceil(this._data.length / this.pagination);
  }
  /** Read page number from URL and apply */
  _applyUrlPage() {
    const t = new URLSearchParams(window.location.search).get(this.urlPageParam);
    if (t) {
      const r = parseInt(t, 10);
      !isNaN(r) && r >= 1 && (this._currentPage = r, this._serverPagination && this.source && Q(this.source, { page: r }));
    }
  }
  /** Sync current page to URL via replaceState */
  _syncPageUrl() {
    const e = new URLSearchParams(window.location.search);
    this._currentPage > 1 ? e.set(this.urlPageParam, String(this._currentPage)) : e.delete(this.urlPageParam);
    const t = e.toString(), r = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", r);
  }
  _handlePageChange(e) {
    this._currentPage = e, this._serverPagination && this.source && Q(this.source, { page: e }), this.urlSync && this._syncPageUrl();
  }
  // --- Grid ---
  _getColClass() {
    const e = Math.max(1, Math.min(6, this.cols));
    return `fr-col-12 fr-col-md-${Math.floor(12 / e)}`;
  }
  // --- Render ---
  /** Generate the unique ID string for an item */
  _getItemUid(e, t) {
    if (this.uidField) {
      const r = y(e, this.uidField);
      if (r != null && r !== "")
        return `item-${String(r).replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    }
    return `item-${t}`;
  }
  _renderGrid(e) {
    const t = this._getColClass(), r = this.pagination > 0 ? (this._currentPage - 1) * this.pagination : 0, i = e.map((a, o) => {
      const l = r + o, u = this._renderItem(a, l), f = this._getItemUid(a, l);
      return `<div class="${t}" id="${f}">${u}</div>`;
    }).join(""), s = `<div class="fr-grid-row ${this.gap}">${i}</div>`;
    return d`<div .innerHTML="${s}"></div>`;
  }
  _renderPagination(e) {
    if (this.pagination <= 0 || e <= 1)
      return "";
    const t = [];
    for (let r = Math.max(1, this._currentPage - 2); r <= Math.min(e, this._currentPage + 2); r++)
      t.push(r);
    return d`
      <nav class="fr-pagination fr-mt-2w" aria-label="Pagination">
        <ul class="fr-pagination__list">
          <li>
            <button class="fr-pagination__link fr-pagination__link--first"
              ?disabled="${this._currentPage === 1}"
              @click="${() => this._handlePageChange(1)}"
              aria-label="Premiere page" type="button">Premiere page</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--prev"
              ?disabled="${this._currentPage === 1}"
              @click="${() => this._handlePageChange(this._currentPage - 1)}"
              aria-label="Page precedente" type="button">Page precedente</button>
          </li>
          ${t.map((r) => d`
            <li>
              <button
                class="fr-pagination__link ${r === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(r)}"
                aria-current="${r === this._currentPage ? "page" : "false"}"
                type="button"
              >${r}</button>
            </li>
          `)}
          <li>
            <button class="fr-pagination__link fr-pagination__link--next"
              ?disabled="${this._currentPage === e}"
              @click="${() => this._handlePageChange(this._currentPage + 1)}"
              aria-label="Page suivante" type="button">Page suivante</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--last"
              ?disabled="${this._currentPage === e}"
              @click="${() => this._handlePageChange(e)}"
              aria-label="Derniere page" type="button">Derniere page</button>
          </li>
        </ul>
      </nav>
    `;
  }
  render() {
    this._templateContent || this._captureTemplate();
    const e = this._getPaginatedData(), t = this._getTotalPages(), r = this._serverPagination ? this._serverTotal : this._data.length;
    return d`
      <div class="gouv-display" role="region" aria-label="Liste de resultats">
        ${this._sourceLoading ? d`
          <div class="gouv-display__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? d`
          <div class="gouv-display__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : r === 0 ? d`
          <div class="gouv-display__empty" aria-live="polite">
            ${this.empty}
          </div>
        ` : d`
          <p class="fr-text--sm fr-mb-1w" aria-live="polite">
            ${r} resultat${r > 1 ? "s" : ""}
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
    `;
  }
}, h(de, "GouvDisplay"), de);
N([
  c({ type: String })
], T.prototype, "source", void 0);
N([
  c({ type: Number })
], T.prototype, "cols", void 0);
N([
  c({ type: Number })
], T.prototype, "pagination", void 0);
N([
  c({ type: String })
], T.prototype, "empty", void 0);
N([
  c({ type: String })
], T.prototype, "gap", void 0);
N([
  c({ type: String, attribute: "uid-field" })
], T.prototype, "uidField", void 0);
N([
  c({ type: Boolean, attribute: "url-sync" })
], T.prototype, "urlSync", void 0);
N([
  c({ type: String, attribute: "url-page-param" })
], T.prototype, "urlPageParam", void 0);
N([
  b()
], T.prototype, "_data", void 0);
N([
  b()
], T.prototype, "_currentPage", void 0);
N([
  b()
], T.prototype, "_serverPagination", void 0);
T = N([
  M("gouv-display")
], T);
var S = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
const Or = {
  line: "line-chart",
  bar: "bar-chart",
  pie: "pie-chart",
  radar: "radar-chart",
  scatter: "scatter-chart",
  gauge: "gauge-chart",
  "bar-line": "bar-line-chart",
  map: "map-chart",
  "map-reg": "map-chart-reg"
};
var pe;
let v = (pe = class extends Ve(A) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.codeField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._data = [];
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), q("gouv-dsfr-chart", this.type);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [];
  }
  // --- Data processing ---
  _processData() {
    if (!this._data || this._data.length === 0)
      return { x: "[[]]", y: "[[]]", labels: [] };
    const e = [], t = [], r = [];
    for (const i of this._data)
      e.push(String(y(i, this.labelField) ?? "N/A")), t.push(Number(y(i, this.valueField)) || 0), this.valueField2 && r.push(Number(y(i, this.valueField2)) || 0);
    return {
      x: JSON.stringify([e]),
      y: JSON.stringify([t]),
      y2: this.valueField2 ? JSON.stringify([r]) : void 0,
      labels: e
    };
  }
  _processMapData() {
    if (!this._data || this._data.length === 0)
      return "{}";
    const e = this.codeField || this.labelField, t = {};
    for (const r of this._data) {
      let i = String(y(r, e) ?? "").trim();
      /^\d+$/.test(i) && i.length < 3 && (i = i.padStart(2, "0"));
      const s = Number(y(r, this.valueField)) || 0;
      (this.type === "map" ? Cr(i) : i !== "") && (t[i] = Math.round(s * 100) / 100);
    }
    return JSON.stringify(t);
  }
  // --- Attribute builders ---
  _getCommonAttributes() {
    const e = {};
    if (this.selectedPalette && (e["selected-palette"] = this.selectedPalette), this.unitTooltip && (e["unit-tooltip"] = this.unitTooltip), this.xMin && (e["x-min"] = this.xMin), this.xMax && (e["x-max"] = this.xMax), this.yMin && (e["y-min"] = this.yMin), this.yMax && (e["y-max"] = this.yMax), this.name) {
      const t = this.name.trim();
      e.name = t.startsWith("[") ? t : JSON.stringify([t]);
    } else if (this.valueField) {
      const t = this.valueField2 ? [this.valueField, this.valueField2] : [this.valueField];
      e.name = JSON.stringify(t);
    }
    return e;
  }
  _getTypeSpecificAttributes() {
    const { x: e, y: t, y2: r, labels: i } = this._processData(), s = {}, a = {};
    switch (this.type) {
      case "gauge": {
        const o = this.gaugeValue ?? (this._data.length > 0 && Number(y(this._data[0], this.valueField)) || 0);
        s.percent = String(Math.round(o)), s.init = "0", s.target = "100";
        break;
      }
      case "pie":
        s.x = e, s.y = t, !this.name && i.length > 0 && (s.name = JSON.stringify(i));
        break;
      case "bar-line":
        s.x = e, s["y-bar"] = t, s["y-line"] = r || t, this.unitTooltipBar && (s["unit-tooltip-bar"] = this.unitTooltipBar);
        break;
      case "map":
      case "map-reg": {
        if (s.data = this._processMapData(), this._data.length > 0) {
          let o = 0, l = 0;
          for (const u of this._data) {
            const f = Number(y(u, this.valueField));
            isNaN(f) || (o += f, l++);
          }
          if (l > 0) {
            const u = Math.round(o / l * 100) / 100;
            a.value = String(u);
          }
        }
        a.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        break;
      }
      default:
        s.x = e, s.y = t;
        break;
    }
    return this.type === "bar" && (this.horizontal && (s.horizontal = "true"), this.stacked && (s.stacked = "true"), this.highlightIndex && (s["highlight-index"] = this.highlightIndex)), this.type === "pie" && this.fill && (s.fill = "true"), (this.type === "map" || this.type === "map-reg") && this.mapHighlight && (s.highlight = this.mapHighlight), { attrs: s, deferred: a };
  }
  /**
   * Crée un élément DSFR Chart via DOM API (pas d'innerHTML)
   */
  _getAriaLabel() {
    const t = {
      bar: "barres",
      line: "lignes",
      pie: "camembert",
      radar: "radar",
      gauge: "jauge",
      scatter: "nuage de points",
      "bar-line": "barres et lignes",
      map: "carte departements",
      "map-reg": "carte regions"
    }[this.type] || this.type, r = this._data.length;
    return `Graphique ${t}, ${r} valeurs`;
  }
  _createChartElement(e, t, r = {}) {
    const i = document.createElement(e);
    for (const [a, o] of Object.entries(t))
      o !== void 0 && o !== "" && i.setAttribute(a, o);
    Object.keys(r).length > 0 && setTimeout(() => {
      for (const [a, o] of Object.entries(r))
        i.setAttribute(a, o);
    }, 500);
    const s = document.createElement("div");
    return s.className = "gouv-dsfr-chart__wrapper", s.setAttribute("role", "img"), s.setAttribute("aria-label", this._getAriaLabel()), s.appendChild(i), s;
  }
  _renderChart() {
    const e = Or[this.type];
    if (!e)
      return d`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const { attrs: t, deferred: r } = this._getTypeSpecificAttributes(), i = {
      ...this._getCommonAttributes(),
      ...t
    }, s = this._createChartElement(e, i, r), a = this.querySelector(".gouv-dsfr-chart__wrapper");
    return a && a.remove(), d`${s}`;
  }
  render() {
    return this._sourceLoading ? d`
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
      ` : this._sourceError ? d`
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
      ` : !this._data || this._data.length === 0 ? d`
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
      ` : this._renderChart();
  }
}, h(pe, "GouvDsfrChart"), pe);
S([
  c({ type: String })
], v.prototype, "source", void 0);
S([
  c({ type: String })
], v.prototype, "type", void 0);
S([
  c({ type: String, attribute: "label-field" })
], v.prototype, "labelField", void 0);
S([
  c({ type: String, attribute: "code-field" })
], v.prototype, "codeField", void 0);
S([
  c({ type: String, attribute: "value-field" })
], v.prototype, "valueField", void 0);
S([
  c({ type: String, attribute: "value-field-2" })
], v.prototype, "valueField2", void 0);
S([
  c({ type: String })
], v.prototype, "name", void 0);
S([
  c({ type: String, attribute: "selected-palette" })
], v.prototype, "selectedPalette", void 0);
S([
  c({ type: String, attribute: "unit-tooltip" })
], v.prototype, "unitTooltip", void 0);
S([
  c({ type: String, attribute: "unit-tooltip-bar" })
], v.prototype, "unitTooltipBar", void 0);
S([
  c({ type: Boolean })
], v.prototype, "horizontal", void 0);
S([
  c({ type: Boolean })
], v.prototype, "stacked", void 0);
S([
  c({ type: Boolean })
], v.prototype, "fill", void 0);
S([
  c({ type: String, attribute: "highlight-index" })
], v.prototype, "highlightIndex", void 0);
S([
  c({ type: String, attribute: "x-min" })
], v.prototype, "xMin", void 0);
S([
  c({ type: String, attribute: "x-max" })
], v.prototype, "xMax", void 0);
S([
  c({ type: String, attribute: "y-min" })
], v.prototype, "yMin", void 0);
S([
  c({ type: String, attribute: "y-max" })
], v.prototype, "yMax", void 0);
S([
  c({ type: Number, attribute: "gauge-value" })
], v.prototype, "gaugeValue", void 0);
S([
  c({ type: String, attribute: "map-highlight" })
], v.prototype, "mapHighlight", void 0);
S([
  b()
], v.prototype, "_data", void 0);
v = S([
  M("gouv-dsfr-chart")
], v);
var Ge = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, fe;
let Me = (fe = class extends A {
  constructor() {
    super(...arguments), this.currentPage = "", this.basePath = "", this._favCount = 0;
  }
  // Light DOM pour hériter des styles DSFR
  createRenderRoot() {
    return this;
  }
  /** Normalized base path with trailing slash */
  get _base() {
    const e = this.basePath;
    return e ? e.endsWith("/") ? e : e + "/" : "";
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const e = JSON.parse(localStorage.getItem("gouv-widgets-favorites") || "[]");
      this._favCount = Array.isArray(e) ? e.length : 0;
    } catch {
    }
    if (!document.getElementById("app-header-active-style")) {
      const e = document.createElement("style");
      e.id = "app-header-active-style", e.textContent = '.fr-nav__link[aria-current="page"]{font-weight:700;border-bottom:2px solid var(--border-action-high-blue-france);color:var(--text-action-high-blue-france)}', document.head.appendChild(e);
    }
  }
  _getNavItems() {
    return [
      { id: "accueil", label: "Accueil", href: "index.html" },
      { id: "composants", label: "Composants", href: "demo/index.html" },
      { id: "builder", label: "Builder", href: "apps/builder/index.html" },
      { id: "builder-ia", label: "Builder IA", href: "apps/builder-ia/index.html" },
      { id: "playground", label: "Playground", href: "apps/playground/index.html" },
      { id: "dashboard", label: "Dashboard", href: "apps/dashboard/index.html" },
      { id: "sources", label: "Sources", href: "apps/sources/index.html" },
      { id: "monitoring", label: "Monitoring", href: "apps/monitoring/index.html" }
    ];
  }
  render() {
    const e = this._getNavItems();
    return d`
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
                        Favoris${this._favCount > 0 ? d` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>` : m}
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
                ${e.map((t) => d`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this._base}${t.href}"
                       ${this.currentPage === t.id ? d`aria-current="page"` : ""}>
                      ${t.label}
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    `;
  }
}, h(fe, "AppHeader"), fe);
Ge([
  c({ type: String, attribute: "current-page" })
], Me.prototype, "currentPage", void 0);
Ge([
  c({ type: String, attribute: "base-path" })
], Me.prototype, "basePath", void 0);
Ge([
  b()
], Me.prototype, "_favCount", void 0);
Me = Ge([
  M("app-header")
], Me);
var ar = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, ge;
let ut = (ge = class extends A {
  constructor() {
    super(...arguments), this.basePath = "";
  }
  get _base() {
    const e = this.basePath;
    return e ? e.endsWith("/") ? e : e + "/" : "";
  }
  // Light DOM pour hériter des styles DSFR
  createRenderRoot() {
    return this;
  }
  render() {
    return d`
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
    `;
  }
}, h(ge, "AppFooter"), ge);
ar([
  c({ type: String, attribute: "base-path" })
], ut.prototype, "basePath", void 0);
ut = ar([
  M("app-footer")
], ut);
var Pe = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, _e;
let ee = (_e = class extends A {
  constructor() {
    super(...arguments), this.leftRatio = 40, this.minLeftWidth = 280, this.minRightWidth = 300, this._isResizing = !1, this._currentLeftRatio = 40, this._leftContent = [], this._rightContent = [], this._contentMoved = !1, this._boundMouseMove = null, this._boundMouseUp = null;
  }
  // Light DOM pour hériter des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this._currentLeftRatio = this.leftRatio, this._setupResizer(), this._saveSlotContent();
  }
  /**
   * Sauvegarde les éléments enfants avec slot="left" et slot="right"
   * pour les déplacer après le rendu (Light DOM n'a pas de slots natifs)
   */
  _saveSlotContent() {
    this._leftContent = Array.from(this.querySelectorAll('[slot="left"]')), this._rightContent = Array.from(this.querySelectorAll('[slot="right"]'));
  }
  /**
   * Déplace le contenu sauvegardé dans les conteneurs après le rendu
   */
  firstUpdated() {
    this._moveContent();
  }
  updated() {
    this._contentMoved || this._moveContent();
  }
  _moveContent() {
    const e = this.querySelector(".builder-layout-left"), t = this.querySelector(".builder-layout-right");
    e && t && (this._leftContent.forEach((r) => e.appendChild(r)), this._rightContent.forEach((r) => t.appendChild(r)), this._contentMoved = !0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanupResizer();
  }
  _setupResizer() {
    this._boundMouseMove = this._handleMouseMove.bind(this), this._boundMouseUp = this._handleMouseUp.bind(this);
  }
  _cleanupResizer() {
    this._boundMouseMove && document.removeEventListener("mousemove", this._boundMouseMove), this._boundMouseUp && document.removeEventListener("mouseup", this._boundMouseUp);
  }
  _handleMouseDown(e) {
    e.preventDefault(), this._isResizing = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", this._boundMouseMove && document.addEventListener("mousemove", this._boundMouseMove), this._boundMouseUp && document.addEventListener("mouseup", this._boundMouseUp);
  }
  _handleMouseMove(e) {
    if (!this._isResizing)
      return;
    const t = this.querySelector(".builder-layout-container");
    if (!t)
      return;
    const r = t.getBoundingClientRect(), i = r.width;
    let s = e.clientX - r.left;
    s = Math.max(this.minLeftWidth, Math.min(s, i - this.minRightWidth)), this._currentLeftRatio = s / i * 100, this.requestUpdate();
  }
  _handleMouseUp() {
    this._isResizing && (this._isResizing = !1, document.body.style.cursor = "", document.body.style.userSelect = "", this._boundMouseMove && document.removeEventListener("mousemove", this._boundMouseMove), this._boundMouseUp && document.removeEventListener("mouseup", this._boundMouseUp));
  }
  render() {
    return d`
      <div class="builder-layout-container">
        <aside class="builder-layout-left" style="flex: 0 0 ${this._currentLeftRatio}%">
          <!-- Contenu slot="left" sera déplacé ici -->
        </aside>

        <div class="builder-layout-resizer ${this._isResizing ? "dragging" : ""}"
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
    `;
  }
}, h(_e, "AppLayoutBuilder"), _e);
Pe([
  c({ type: Number, attribute: "left-ratio" })
], ee.prototype, "leftRatio", void 0);
Pe([
  c({ type: Number, attribute: "min-left-width" })
], ee.prototype, "minLeftWidth", void 0);
Pe([
  c({ type: Number, attribute: "min-right-width" })
], ee.prototype, "minRightWidth", void 0);
Pe([
  b()
], ee.prototype, "_isResizing", void 0);
Pe([
  b()
], ee.prototype, "_currentLeftRatio", void 0);
ee = Pe([
  M("app-layout-builder")
], ee);
var Te = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, me;
let Se = (me = class extends A {
  constructor() {
    super(...arguments), this.title = "", this.icon = "", this.activePath = "", this.basePath = "", this._contentElements = [], this._contentMoved = !1;
  }
  get _base() {
    const e = this.basePath;
    return e ? e.endsWith("/") ? e : e + "/" : "";
  }
  // Light DOM pour hériter des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this._contentElements = Array.from(this.querySelectorAll('[slot="content"]'));
  }
  firstUpdated() {
    this._moveContent();
  }
  updated() {
    this._contentMoved || this._moveContent();
  }
  _moveContent() {
    const e = this.querySelector(".demo-content-slot");
    e && (this._contentElements.forEach((t) => e.appendChild(t)), this._contentMoved = !0);
  }
  _getMenuStructure() {
    return [
      { id: "overview", label: "Vue d'ensemble", href: "index.html" },
      {
        id: "components",
        label: "Composants gouv-widgets",
        href: "#",
        children: [
          { id: "components/gouv-source", label: "gouv-source", href: "components/gouv-source.html" },
          { id: "components/gouv-normalize", label: "gouv-normalize", href: "components/gouv-normalize.html" },
          { id: "components/gouv-query", label: "gouv-query", href: "components/gouv-query.html" },
          { id: "components/gouv-facets", label: "gouv-facets", href: "components/gouv-facets.html" },
          { id: "components/gouv-search", label: "gouv-search", href: "components/gouv-search.html" },
          { id: "components/gouv-kpi", label: "gouv-kpi", href: "components/gouv-kpi.html" },
          { id: "components/gouv-datalist", label: "gouv-datalist", href: "components/gouv-datalist.html" },
          { id: "components/gouv-display", label: "gouv-display", href: "components/gouv-display.html" },
          { id: "components/gouv-dsfr-chart", label: "gouv-dsfr-chart", href: "components/gouv-dsfr-chart.html" }
        ]
      },
      {
        id: "charts",
        label: "Composants dsfr-charts",
        href: "#",
        children: [
          { id: "charts/line-chart", label: "line-chart", href: "charts/line-chart.html" },
          { id: "charts/bar-chart", label: "bar-chart", href: "charts/bar-chart.html" },
          { id: "charts/pie-chart", label: "pie-chart", href: "charts/pie-chart.html" },
          { id: "charts/radar-chart", label: "radar-chart", href: "charts/radar-chart.html" },
          { id: "charts/gauge-chart", label: "gauge-chart", href: "charts/gauge-chart.html" },
          { id: "charts/map-chart", label: "map-chart", href: "charts/map-chart.html" },
          { id: "charts/scatter-chart", label: "scatter-chart", href: "charts/scatter-chart.html" }
        ]
      }
    ];
  }
  _isActive(e) {
    return this.activePath === e;
  }
  _isParentActive(e) {
    return e.children ? e.children.some((t) => this._isActive(t.id)) : !1;
  }
  _renderMenuItem(e) {
    const t = this._isActive(e.id), r = this._isParentActive(e);
    if (e.children) {
      const i = `fr-sidemenu-${e.id}`, s = r;
      return d`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${s}"
                  aria-controls="${i}">
            ${e.label}
          </button>
          <div class="fr-collapse ${s ? "fr-collapse--expanded" : ""}" id="${i}">
            <ul class="fr-sidemenu__list">
              ${e.children.map((a) => this._renderMenuItem(a))}
            </ul>
          </div>
        </li>
      `;
    } else
      return d`
        <li class="fr-sidemenu__item ${t ? "fr-sidemenu__item--active" : ""}">
          <a class="fr-sidemenu__link"
             href="${this._base}${e.href}"
             ${t ? d`aria-current="page"` : ""}>
            ${e.label}
          </a>
        </li>
      `;
  }
  _renderBreadcrumb() {
    if (!this.activePath || this.activePath === "overview")
      return "";
    const e = this.activePath.split("/"), t = [
      { label: "Composants", href: `${this._base}index.html` }
    ];
    if (e.length > 1) {
      const r = e[0] === "components" ? "Composants gouv-widgets" : "Composants dsfr-charts";
      t.push({ label: r, href: "#" });
    }
    return t.push({ label: this.title, href: "" }), d`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((r, i) => d`
              <li>
                ${i === t.length - 1 ? d`<a class="fr-breadcrumb__link" aria-current="page">${r.label}</a>` : d`<a class="fr-breadcrumb__link" href="${r.href}">${r.label}</a>`}
              </li>
            `)}
          </ol>
        </div>
      </nav>
    `;
  }
  render() {
    const e = this._getMenuStructure();
    return d`
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
                  ${e.map((t) => this._renderMenuItem(t))}
                </ul>
              </div>
            </div>
          </nav>

          <!-- Contenu principal -->
          <div class="demo-content">
            ${this._renderBreadcrumb()}

            ${this.title ? d`
              <h1>
                ${this.icon ? d`<span class="${this.icon} fr-mr-1w" aria-hidden="true"></span>` : ""}
                ${this.title}
              </h1>
            ` : ""}

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
    `;
  }
}, h(me, "AppLayoutDemo"), me);
Te([
  c({ type: String })
], Se.prototype, "title", void 0);
Te([
  c({ type: String })
], Se.prototype, "icon", void 0);
Te([
  c({ type: String, attribute: "active-path" })
], Se.prototype, "activePath", void 0);
Te([
  c({ type: String, attribute: "base-path" })
], Se.prototype, "basePath", void 0);
Se = Te([
  M("app-layout-demo")
], Se);
var te = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, be;
let J = (be = class extends A {
  constructor() {
    super(...arguments), this.showDataTab = !1, this.showSaveButton = !1, this.showPlaygroundButton = !1, this.tabLabels = "Aperçu,Code,Données", this.activeTab = "preview", this._activeTab = "preview", this._previewContent = [], this._codeContent = [], this._dataContent = [], this._contentMoved = !1;
  }
  // Light DOM pour hériter des styles DSFR et permettre l'accès aux IDs
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this._activeTab = this.activeTab, this._saveSlotContent();
  }
  /**
   * Sauvegarde les éléments enfants avec slot="preview", slot="code", slot="data"
   * pour les déplacer après le rendu (Light DOM n'a pas de slots natifs)
   */
  _saveSlotContent() {
    this._previewContent = Array.from(this.querySelectorAll('[slot="preview"]')), this._codeContent = Array.from(this.querySelectorAll('[slot="code"]')), this._dataContent = Array.from(this.querySelectorAll('[slot="data"]'));
  }
  /**
   * Déplace le contenu sauvegardé dans les conteneurs d'onglets après le rendu
   */
  firstUpdated() {
    this._moveContent();
  }
  updated() {
    this._contentMoved || this._moveContent();
  }
  _moveContent() {
    const e = this.querySelector("#tab-preview"), t = this.querySelector("#tab-code"), r = this.querySelector("#tab-data");
    e && this._previewContent.forEach((i) => e.appendChild(i)), t && this._codeContent.forEach((i) => t.appendChild(i)), r && this._dataContent.forEach((i) => r.appendChild(i)), this._contentMoved = !0;
  }
  /**
   * Changer l'onglet actif programmatiquement
   */
  setActiveTab(e) {
    this._activeTab = e, this.requestUpdate();
  }
  /**
   * Obtenir l'onglet actif
   */
  getActiveTab() {
    return this._activeTab;
  }
  _handleTabClick(e) {
    this._activeTab = e, this.dispatchEvent(new CustomEvent("tab-change", {
      detail: { tab: e },
      bubbles: !0,
      composed: !0
    })), this.requestUpdate();
  }
  _getTabLabels() {
    return this.tabLabels.split(",").map((e) => e.trim());
  }
  _handleSaveClick() {
    this.dispatchEvent(new CustomEvent("save-favorite", {
      bubbles: !0,
      composed: !0
    }));
  }
  _handlePlaygroundClick() {
    this.dispatchEvent(new CustomEvent("open-playground", {
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const e = this._getTabLabels(), [t, r, i] = e;
    return d`
      <div class="preview-panel">
        <!-- Onglets -->
        <div class="preview-panel-tabs">
          <button
            class="preview-panel-tab ${this._activeTab === "preview" ? "active" : ""}"
            data-tab="preview"
            @click="${() => this._handleTabClick("preview")}">
            ${t || "Aperçu"}
          </button>
          <button
            class="preview-panel-tab ${this._activeTab === "code" ? "active" : ""}"
            data-tab="code"
            @click="${() => this._handleTabClick("code")}">
            ${r || "Code"}
          </button>
          ${this.showDataTab ? d`
            <button
              class="preview-panel-tab ${this._activeTab === "data" ? "active" : ""}"
              data-tab="data"
              @click="${() => this._handleTabClick("data")}">
              ${i || "Données"}
            </button>
          ` : m}
          ${this.showPlaygroundButton ? d`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          ` : m}
          ${this.showSaveButton ? d`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          ` : m}
        </div>

        <!-- Contenu des onglets -->
        <div class="preview-panel-content">
          <!-- Onglet Aperçu - contenu slot="preview" sera déplacé ici -->
          <div class="preview-panel-tab-content ${this._activeTab === "preview" ? "active" : ""}" id="tab-preview">
          </div>

          <!-- Onglet Code - contenu slot="code" sera déplacé ici -->
          <div class="preview-panel-tab-content ${this._activeTab === "code" ? "active" : ""}" id="tab-code">
          </div>

          <!-- Onglet Données - contenu slot="data" sera déplacé ici -->
          <div class="preview-panel-tab-content ${this._activeTab === "data" ? "active" : ""}" id="tab-data">
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
    `;
  }
}, h(be, "AppPreviewPanel"), be);
te([
  c({ type: Boolean, attribute: "show-data-tab" })
], J.prototype, "showDataTab", void 0);
te([
  c({ type: Boolean, attribute: "show-save-button" })
], J.prototype, "showSaveButton", void 0);
te([
  c({ type: Boolean, attribute: "show-playground-button" })
], J.prototype, "showPlaygroundButton", void 0);
te([
  c({ type: String, attribute: "tab-labels" })
], J.prototype, "tabLabels", void 0);
te([
  c({ type: String, attribute: "active-tab" })
], J.prototype, "activeTab", void 0);
te([
  b()
], J.prototype, "_activeTab", void 0);
J = te([
  M("app-preview-panel")
], J);
function Lr(n, e, t) {
  return n.map((r) => ({
    label: String(y(r, e) ?? "N/A"),
    value: Number(y(r, t)) || 0
  }));
}
h(Lr, "extractLabelValues");
function Nr(n, e) {
  if (e === "none")
    return n;
  const t = /* @__PURE__ */ new Map();
  for (const i of n) {
    const s = t.get(i.label) || [];
    s.push(i.value), t.set(i.label, s);
  }
  const r = [];
  for (const [i, s] of t)
    r.push({ label: i, value: zr(s, e) });
  return r;
}
h(Nr, "aggregateByLabel");
function zr(n, e) {
  switch (e) {
    case "sum":
      return n.reduce((t, r) => t + r, 0);
    case "avg":
      return n.reduce((t, r) => t + r, 0) / n.length;
    case "count":
      return n.length;
    case "min":
      return Math.min(...n);
    case "max":
      return Math.max(...n);
    default:
      return n[0] || 0;
  }
}
h(zr, "computeGroupValue");
function Br(n, e) {
  return e === "none" ? n : [...n].sort((t, r) => e === "desc" ? r.value - t.value : t.value - r.value);
}
h(Br, "sortByValue");
function Gr(n, e, t, r = "none", i = "none", s = 0) {
  if (!n || n.length === 0)
    return { labels: [], values: [] };
  let a = Lr(n, e, t);
  return a = Nr(a, r), a = Br(a, i), s > 0 && (a = a.slice(0, s)), {
    labels: a.map((o) => o.label),
    values: a.map((o) => Math.round(o.value * 100) / 100)
  };
}
h(Gr, "processChartData");
export {
  ut as AppFooter,
  Me as AppHeader,
  ee as AppLayoutBuilder,
  Se as AppLayoutDemo,
  O as DATA_EVENTS,
  R as GouvDatalist,
  T as GouvDisplay,
  v as GouvDsfrChart,
  w as GouvFacets,
  U as GouvKpi,
  z as GouvNormalize,
  $ as GouvQuery,
  k as GouvSearch,
  F as GouvSource,
  Ve as SourceSubscriberMixin,
  Nr as aggregateByLabel,
  Qt as computeAggregation,
  G as dispatchDataError,
  j as dispatchDataLoaded,
  W as dispatchDataLoading,
  Lr as extractLabelValues,
  Mr as formatCurrency,
  Vr as formatDate,
  Wt as formatNumber,
  Dr as formatPercentage,
  Gt as formatValue,
  et as getAdapter,
  y as getByPath,
  qr as getByPathOrDefault,
  we as getDataCache,
  Ir as hasPath,
  Tr as parseExpression,
  Gr as processChartData,
  Hr as registerAdapter,
  Br as sortByValue,
  Ue as subscribeToSource
};
