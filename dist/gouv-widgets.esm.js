var ci = Object.defineProperty;
var h = (n, e) => ci(n, "name", { value: e, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Be = globalThis, ft = Be.ShadowRoot && (Be.ShadyCSS === void 0 || Be.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = Symbol(), Ot = /* @__PURE__ */ new WeakMap();
var ae;
let ei = (ae = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ft && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Ot.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ot.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}, h(ae, "n"), ae);
const ui = /* @__PURE__ */ h((n) => new ei(typeof n == "string" ? n : n + "", void 0, gt), "r$4"), ti = /* @__PURE__ */ h((n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, r, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[s + 1], n[0]);
  return new ei(t, n, gt);
}, "i$3"), hi = /* @__PURE__ */ h((n, e) => {
  if (ft) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = Be.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, n.appendChild(i);
  }
}, "S$1"), Tt = ft ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ui(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: di, defineProperty: pi, getOwnPropertyDescriptor: fi, getOwnPropertyNames: gi, getOwnPropertySymbols: _i, getPrototypeOf: bi } = Object, G = globalThis, Ut = G.trustedTypes, mi = Ut ? Ut.emptyScript : "", Je = G.reactiveElementPolyfillSupport, ke = /* @__PURE__ */ h((n, e) => n, "d$1"), qe = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? mi : null;
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
} }, _t = /* @__PURE__ */ h((n, e) => !di(n, e), "f$1"), Lt = { attribute: !0, type: String, converter: qe, reflect: !1, useDefault: !1, hasChanged: _t };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), G.litPropertyMetadata ?? (G.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var ne;
let se = (ne = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Lt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && pi(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: s } = fi(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: r, set(a) {
      const o = r == null ? void 0 : r.call(this);
      s == null || s.call(this, a), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ke("elementProperties"))) return;
    const e = bi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ke("properties"))) {
      const t = this.properties, i = [...gi(t), ..._i(t)];
      for (const r of i) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, r] of t) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const r = this._$Eu(t, i);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) t.unshift(Tt(r));
    } else e !== void 0 && t.push(Tt(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return hi(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var s;
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const a = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : qe).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, a;
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? o.converter : qe;
      this._$Em = r;
      const c = l.fromAttribute(t, o.type);
      this[r] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(r)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, s) {
    var a;
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (s = this[e]), i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? _t)(s, t) || i.useDefault && i.reflect && s === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: s }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), s !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, a] of r) {
        const { wrapped: o } = a, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, a, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((r) => {
        var s;
        return (s = r.hostUpdate) == null ? void 0 : s.call(r);
      }), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
}, h(ne, "y"), ne);
se.elementStyles = [], se.shadowRootOptions = { mode: "open" }, se[ke("elementProperties")] = /* @__PURE__ */ new Map(), se[ke("finalized")] = /* @__PURE__ */ new Map(), Je == null || Je({ ReactiveElement: se }), (G.reactiveElementVersions ?? (G.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis, Nt = /* @__PURE__ */ h((n) => n, "i$1"), Ie = Ee.trustedTypes, zt = Ie ? Ie.createPolicy("lit-html", { createHTML: /* @__PURE__ */ h((n) => n, "createHTML") }) : void 0, ii = "$lit$", V = `lit$${Math.random().toFixed(9).slice(2)}$`, ri = "?" + V, vi = `<${ri}>`, ee = document, Re = /* @__PURE__ */ h(() => ee.createComment(""), "c"), Me = /* @__PURE__ */ h((n) => n === null || typeof n != "object" && typeof n != "function", "a"), bt = Array.isArray, yi = /* @__PURE__ */ h((n) => bt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", "d"), Ke = `[ 	
\f\r]`, Ae = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, jt = /-->/g, Bt = />/g, Z = RegExp(`>|${Ke}(?:([^\\s"'>=/]+)(${Ke}*=${Ke}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), qt = /'/g, It = /"/g, si = /^(?:script|style|textarea|title)$/i, $i = /* @__PURE__ */ h((n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), "x"), d = $i(1), $e = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), X = ee.createTreeWalker(ee, 129);
function ai(n, e) {
  if (!bt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zt !== void 0 ? zt.createHTML(e) : e;
}
h(ai, "V");
const wi = /* @__PURE__ */ h((n, e) => {
  const t = n.length - 1, i = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Ae;
  for (let o = 0; o < t; o++) {
    const l = n[o];
    let c, p, f = -1, g = 0;
    for (; g < l.length && (a.lastIndex = g, p = a.exec(l), p !== null); ) g = a.lastIndex, a === Ae ? p[1] === "!--" ? a = jt : p[1] !== void 0 ? a = Bt : p[2] !== void 0 ? (si.test(p[2]) && (r = RegExp("</" + p[2], "g")), a = Z) : p[3] !== void 0 && (a = Z) : a === Z ? p[0] === ">" ? (a = r ?? Ae, f = -1) : p[1] === void 0 ? f = -2 : (f = a.lastIndex - p[2].length, c = p[1], a = p[3] === void 0 ? Z : p[3] === '"' ? It : qt) : a === It || a === qt ? a = Z : a === jt || a === Bt ? a = Ae : (a = Z, r = void 0);
    const _ = a === Z && n[o + 1].startsWith("/>") ? " " : "";
    s += a === Ae ? l + vi : f >= 0 ? (i.push(c), l.slice(0, f) + ii + l.slice(f) + V + _) : l + V + (f === -2 ? o : _);
  }
  return [ai(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
}, "N"), He = class He {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let s = 0, a = 0;
    const o = e.length - 1, l = this.parts, [c, p] = wi(e, t);
    if (this.el = He.createElement(c, i), X.currentNode = this.el.content, t === 2 || t === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (r = X.nextNode()) !== null && l.length < o; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const f of r.getAttributeNames()) if (f.endsWith(ii)) {
          const g = p[a++], _ = r.getAttribute(f).split(V), R = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: s, name: R[2], strings: _, ctor: R[1] === "." ? at : R[1] === "?" ? nt : R[1] === "@" ? ot : Se }), r.removeAttribute(f);
        } else f.startsWith(V) && (l.push({ type: 6, index: s }), r.removeAttribute(f));
        if (si.test(r.tagName)) {
          const f = r.textContent.split(V), g = f.length - 1;
          if (g > 0) {
            r.textContent = Ie ? Ie.emptyScript : "";
            for (let _ = 0; _ < g; _++) r.append(f[_], Re()), X.nextNode(), l.push({ type: 2, index: ++s });
            r.append(f[g], Re());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ri) l.push({ type: 2, index: s });
      else {
        let f = -1;
        for (; (f = r.data.indexOf(V, f + 1)) !== -1; ) l.push({ type: 7, index: s }), f += V.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = ee.createElement("template");
    return i.innerHTML = e, i;
  }
};
h(He, "S");
let De = He;
function we(n, e, t = n, i) {
  var a, o;
  if (e === $e) return e;
  let r = i !== void 0 ? (a = t._$Co) == null ? void 0 : a[i] : t._$Cl;
  const s = Me(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== s && ((o = r == null ? void 0 : r._$AO) == null || o.call(r, !1), s === void 0 ? r = void 0 : (r = new s(n), r._$AT(n, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = r : t._$Cl = r), r !== void 0 && (e = we(n, r._$AS(n, e.values), r, i)), e;
}
h(we, "M");
const St = class St {
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
    const { el: { content: t }, parts: i } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? ee).importNode(t, !0);
    X.currentNode = r;
    let s = X.nextNode(), a = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new Fe(s, s.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (c = new lt(s, this, e)), this._$AV.push(c), l = i[++o];
      }
      a !== (l == null ? void 0 : l.index) && (s = X.nextNode(), a++);
    }
    return X.currentNode = ee, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
};
h(St, "R");
let st = St;
const Ve = class Ve {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = we(this, e, t), Me(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== $e && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : yi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && Me(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ee.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = De.createElement(ai(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === r) this._$AH.p(t);
    else {
      const a = new st(r, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Ht.get(e.strings);
    return t === void 0 && Ht.set(e.strings, t = new De(e)), t;
  }
  k(e) {
    bt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const s of e) r === t.length ? t.push(i = new Ve(this.O(Re()), this.O(Re()), this, this.options)) : i = t[r], i._$AI(s), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = Nt(e).nextSibling;
      Nt(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
};
h(Ve, "k");
let Fe = Ve;
const Pt = class Pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, s) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = b;
  }
  _$AI(e, t = this, i, r) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = we(this, e, t, 0), a = !Me(e) || e !== this._$AH && e !== $e, a && (this._$AH = e);
    else {
      const o = e;
      let l, c;
      for (e = s[0], l = 0; l < s.length - 1; l++) c = we(this, o[i + l], t, l), c === $e && (c = this._$AH[l]), a || (a = !Me(c) || c !== this._$AH[l]), c === b ? e = b : e !== b && (e += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
h(Pt, "H");
let Se = Pt;
const xt = class xt extends Se {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
};
h(xt, "I");
let at = xt;
const Ct = class Ct extends Se {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
};
h(Ct, "L");
let nt = Ct;
const At = class At extends Se {
  constructor(e, t, i, r, s) {
    super(e, t, i, r, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = we(this, e, t, 0) ?? b) === $e) return;
    const i = this._$AH, r = e === b && i !== b || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== b && (i === b || r);
    r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
};
h(At, "z");
let ot = At;
const kt = class kt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    we(this, e);
  }
};
h(kt, "Z");
let lt = kt;
const Ze = Ee.litHtmlPolyfillSupport;
Ze == null || Ze(De, Fe), (Ee.litHtmlVersions ?? (Ee.litHtmlVersions = [])).push("3.3.2");
const Si = /* @__PURE__ */ h((n, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = r = new Fe(e.insertBefore(Re(), s), s, void 0, t ?? {});
  }
  return r._$AI(n), r;
}, "D");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, Et = class Et extends se {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Si(t, this.renderRoot, this.renderOptions);
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
    return $e;
  }
};
h(Et, "i");
let C = Et;
var Yt;
C._$litElement$ = !0, C.finalized = !0, (Yt = Y.litElementHydrateSupport) == null || Yt.call(Y, { LitElement: C });
const Xe = Y.litElementPolyfillSupport;
Xe == null || Xe({ LitElement: C });
(Y.litElementVersions ?? (Y.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = /* @__PURE__ */ h((n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
}, "t");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pi = { attribute: !0, type: String, converter: qe, reflect: !1, hasChanged: _t }, xi = /* @__PURE__ */ h((n = Pi, e, t) => {
  const { kind: i, metadata: r } = t;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), s.set(t.name, n), i === "accessor") {
    const { name: a } = t;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, l, n, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, n, o), o;
    } };
  }
  if (i === "setter") {
    const { name: a } = t;
    return function(o) {
      const l = this[a];
      e.call(this, o), this.requestUpdate(a, l, n, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
}, "r$1");
function u(n) {
  return (e, t) => typeof t == "object" ? xi(n, e, t) : ((i, r, s) => {
    const a = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, i), a ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(n, e, t);
}
h(u, "n");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function m(n) {
  return u({ ...n, state: !0, attribute: !1 });
}
h(m, "r");
function w(n, e) {
  if (!e || e.trim() === "")
    return n;
  const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let r = n;
  for (const s of i) {
    if (r == null || typeof r != "object")
      return;
    r = r[s];
  }
  return r;
}
h(w, "getByPath");
function Hi(n, e) {
  return w(n, e) !== void 0;
}
h(Hi, "hasPath");
function Vt(n, e, t) {
  const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let s = n;
  for (let a = 0; a < r.length - 1; a++) {
    const o = r[a];
    (!(o in s) || typeof s[o] != "object" || s[o] === null) && (s[o] = {}), s = s[o];
  }
  s[r[r.length - 1]] = t;
}
h(Vt, "setByPath");
function Vi(n, e, t) {
  const i = w(n, e);
  return i !== void 0 ? i : t;
}
h(Vi, "getByPathOrDefault");
const Ci = "https://chartsbuilder.matge.com/beacon", Gt = /* @__PURE__ */ new Set();
function H(n, e) {
  const t = `${n}:${e || ""}`;
  if (Gt.has(t) || (Gt.add(t), typeof window > "u"))
    return;
  const i = window.location.hostname;
  if (i === "localhost" || i === "127.0.0.1" || i === "chartsbuilder.matge.com")
    return;
  const r = new URLSearchParams();
  r.set("c", n), e && r.set("t", e);
  const s = `${Ci}?${r.toString()}`;
  try {
    fetch(s, { method: "GET", keepalive: !0, mode: "no-cors" }).catch(() => {
    });
  } catch {
  }
}
h(H, "sendWidgetBeacon");
function ct(n) {
  return n ? String(n).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
}
h(ct, "escapeHtml");
function Wt(n, e = !1) {
  if (typeof n == "number")
    return isNaN(n) ? e ? null : 0 : n;
  if (typeof n != "string")
    return e ? null : 0;
  let t = n.trim();
  if (t === "")
    return e ? null : 0;
  t = t.replace(/\s/g, "");
  const i = t.includes(","), r = t.includes(".");
  if (i && r) {
    const a = t.lastIndexOf(","), o = t.lastIndexOf(".");
    a > o ? t = t.replace(/\./g, "").replace(",", ".") : t = t.replace(/,/g, "");
  } else i && (t = t.replace(",", "."));
  const s = parseFloat(t);
  return isNaN(s) ? e ? null : 0 : s;
}
h(Wt, "toNumber");
function Ai(n) {
  if (typeof n != "string")
    return !1;
  const e = n.trim();
  return e === "" ? !1 : /^-?[\d\s]+([.,]\d+)?$/.test(e);
}
h(Ai, "looksLikeNumber");
function ki(n) {
  return !n || typeof n != "string" || ["N/A", "null", "undefined", "00", ""].includes(n) ? !1 : !!(n === "2A" || n === "2B" || /^97[1-6]$/.test(n) || /^(0[1-9]|[1-8]\d|9[0-5])$/.test(n));
}
h(ki, "isValidDeptCode");
const Ye = {
  baseUrl: "https://chartsbuilder.matge.com",
  endpoints: {
    grist: "/grist-proxy",
    gristGouv: "/grist-gouv-proxy",
    albert: "/albert-proxy",
    tabular: "/tabular-proxy"
  }
};
function Ei() {
  return typeof window < "u" && window.location.hostname === "localhost" && window.location.port === "5173";
}
h(Ei, "isViteDevMode");
function Ri() {
  return typeof window < "u" && "__TAURI__" in window;
}
h(Ri, "isTauriMode");
function ni() {
  var i;
  const n = { ...Ye.endpoints };
  return Ei() ? { baseUrl: "", endpoints: n } : Ri() ? { baseUrl: Ye.baseUrl, endpoints: n } : {
    baseUrl: ((i = import.meta.env) == null ? void 0 : i.VITE_PROXY_URL) || Ye.baseUrl,
    endpoints: n
  };
}
h(ni, "getProxyConfig");
function Mi(n) {
  const e = ni();
  return n.includes("tabular-api.data.gouv.fr") ? n.replace("https://tabular-api.data.gouv.fr", `${e.baseUrl}${e.endpoints.tabular}`) : n.includes("docs.getgrist.com") ? n.replace("https://docs.getgrist.com", `${e.baseUrl}${e.endpoints.grist}`) : n.includes("grist.numerique.gouv.fr") ? n.replace("https://grist.numerique.gouv.fr", `${e.baseUrl}${e.endpoints.gristGouv}`) : n.includes("albert.api.etalab.gouv.fr") ? n.replace("https://albert.api.etalab.gouv.fr", `${e.baseUrl}${e.endpoints.albert}`) : n;
}
h(Mi, "getProxiedUrl");
const U = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading",
  SOURCE_COMMAND: "gouv-source-command"
}, mt = /* @__PURE__ */ new Map(), vt = /* @__PURE__ */ new Map();
function Di(n, e) {
  mt.set(n, e);
}
h(Di, "setDataCache");
function Pe(n) {
  return mt.get(n);
}
h(Pe, "getDataCache");
function Te(n) {
  mt.delete(n);
}
h(Te, "clearDataCache");
function yt(n, e) {
  vt.set(n, e);
}
h(yt, "setDataMeta");
function Ge(n) {
  return vt.get(n);
}
h(Ge, "getDataMeta");
function $t(n) {
  vt.delete(n);
}
h($t, "clearDataMeta");
function q(n, e) {
  Di(n, e);
  const t = new CustomEvent(U.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, data: e }
  });
  document.dispatchEvent(t);
}
h(q, "dispatchDataLoaded");
function W(n, e) {
  const t = new CustomEvent(U.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, error: e }
  });
  document.dispatchEvent(t);
}
h(W, "dispatchDataError");
function Q(n) {
  const e = new CustomEvent(U.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n }
  });
  document.dispatchEvent(e);
}
h(Q, "dispatchDataLoading");
function J(n, e) {
  const t = new CustomEvent(U.SOURCE_COMMAND, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, ...e }
  });
  document.dispatchEvent(t);
}
h(J, "dispatchSourceCommand");
function wt(n, e) {
  const t = /* @__PURE__ */ h((i) => {
    const r = i;
    if (r.detail.sourceId === n) {
      const { sourceId: s, ...a } = r.detail;
      e(a);
    }
  }, "handler");
  return document.addEventListener(U.SOURCE_COMMAND, t), () => document.removeEventListener(U.SOURCE_COMMAND, t);
}
h(wt, "subscribeToSourceCommands");
function Ue(n, e) {
  const t = /* @__PURE__ */ h((s) => {
    const a = s;
    a.detail.sourceId === n && e.onLoaded && e.onLoaded(a.detail.data);
  }, "handleLoaded"), i = /* @__PURE__ */ h((s) => {
    const a = s;
    a.detail.sourceId === n && e.onError && e.onError(a.detail.error);
  }, "handleError"), r = /* @__PURE__ */ h((s) => {
    s.detail.sourceId === n && e.onLoading && e.onLoading();
  }, "handleLoading");
  return document.addEventListener(U.LOADED, t), document.addEventListener(U.ERROR, i), document.addEventListener(U.LOADING, r), () => {
    document.removeEventListener(U.LOADED, t), document.removeEventListener(U.ERROR, i), document.removeEventListener(U.LOADING, r);
  };
}
h(Ue, "subscribeToSource");
var L = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, oe;
let F = (oe = class extends C {
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
    super.connectedCallback(), H("gouv-source"), this._setupRefresh(), this._setupPageRequestListener();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && (Te(this.id), $t(this.id));
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
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, Q(this.id);
      try {
        const e = Mi(this._buildUrl()), t = this._buildFetchOptions(), i = await fetch(e, {
          ...t,
          signal: this._abortController.signal
        });
        if (!i.ok)
          throw new Error(`HTTP ${i.status}: ${i.statusText}`);
        const r = await i.json();
        this.paginate && r.meta && yt(this.id, {
          page: r.meta.page ?? this._currentPage,
          pageSize: r.meta.page_size ?? this.pageSize,
          total: r.meta.total ?? 0
        }), this.transform ? this._data = w(r, this.transform) : this.paginate && r.data && !this.transform ? this._data = r.data : this._data = r, q(this.id, this._data);
      } catch (e) {
        if (e.name === "AbortError")
          return;
        this._error = e, W(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, e);
      } finally {
        this._loading = !1;
      }
    }
  }
  _buildUrl() {
    const e = window.location.origin !== "null" ? window.location.origin : void 0, t = new URL(this.url, e);
    if (this.params && this.method === "GET")
      try {
        const i = JSON.parse(this.params);
        Object.entries(i).forEach(([r, s]) => {
          t.searchParams.set(r, String(s));
        });
      } catch (i) {
        console.warn("gouv-source: params invalides (JSON attendu)", i);
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
    this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null), this.paginate && this.id && (this._unsubscribePageRequests = wt(this.id, (e) => {
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
}, h(oe, "GouvSource"), oe);
L([
  u({ type: String })
], F.prototype, "url", void 0);
L([
  u({ type: String })
], F.prototype, "method", void 0);
L([
  u({ type: String })
], F.prototype, "headers", void 0);
L([
  u({ type: String })
], F.prototype, "params", void 0);
L([
  u({ type: Number })
], F.prototype, "refresh", void 0);
L([
  u({ type: String })
], F.prototype, "transform", void 0);
L([
  u({ type: Boolean })
], F.prototype, "paginate", void 0);
L([
  u({ type: Number, attribute: "page-size" })
], F.prototype, "pageSize", void 0);
L([
  m()
], F.prototype, "_loading", void 0);
L([
  m()
], F.prototype, "_error", void 0);
L([
  m()
], F.prototype, "_data", void 0);
F = L([
  D("gouv-source")
], F);
const Rt = class Rt {
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
h(Rt, "GenericAdapter");
let ut = Rt;
function et(n, e) {
  const t = {};
  return e && (t.signal = e), n.headers && Object.keys(n.headers).length > 0 && (t.headers = n.headers), t;
}
h(et, "buildFetchOptions$1");
const Ne = 100, tt = 10, Mt = class Mt {
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
    const r = e.limit <= 0 ? tt * Ne : e.limit, s = Ne;
    let a = [], o = 0, l = -1;
    for (let c = 0; c < tt; c++) {
      const p = r - a.length;
      if (p <= 0)
        break;
      const f = this.buildUrl(e, Math.min(s, p), o), g = await fetch(f, et(e, t));
      if (!g.ok)
        throw new Error(`HTTP ${g.status}: ${g.statusText}`);
      const _ = await g.json(), R = _.results || [];
      if (a = a.concat(R), typeof _.total_count == "number" && (l = _.total_count), l >= 0 && a.length >= l || R.length < s)
        break;
      o += R.length;
    }
    return l >= 0 && a.length < l && a.length < r && console.warn(`gouv-query: pagination incomplete - ${a.length}/${l} resultats recuperes (limite de securite: ${tt} pages de ${Ne})`), {
      data: a,
      totalCount: l >= 0 ? l : a.length,
      needsClientProcessing: !1
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(e, t, i) {
    const r = this.buildServerSideUrl(e, t), s = await fetch(r, et(e, i));
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
  buildUrl(e, t, i) {
    const r = e.baseUrl || "https://data.opendatasoft.com", s = new URL(`${r}/api/explore/v2.1/catalog/datasets/${e.datasetId}/records`);
    e.select ? s.searchParams.set("select", e.select) : e.aggregate && e.groupBy && s.searchParams.set("select", this._buildSelectFromAggregate(e));
    const a = e.where || e.filter;
    if (a && s.searchParams.set("where", a), e.groupBy && s.searchParams.set("group_by", e.groupBy), e.orderBy) {
      const o = e.orderBy.replace(/:(\w+)$/, (l, c) => ` ${c.toUpperCase()}`);
      s.searchParams.set("order_by", o);
    }
    return t !== void 0 ? s.searchParams.set("limit", String(t)) : e.limit > 0 && s.searchParams.set("limit", String(Math.min(e.limit, Ne))), i && i > 0 && s.searchParams.set("offset", String(i)), s.toString();
  }
  /**
   * Construit l'URL ODS en mode server-side (une seule page).
   */
  buildServerSideUrl(e, t) {
    const i = e.baseUrl || "https://data.opendatasoft.com", r = new URL(`${i}/api/explore/v2.1/catalog/datasets/${e.datasetId}/records`);
    e.select ? r.searchParams.set("select", e.select) : e.aggregate && e.groupBy && r.searchParams.set("select", this._buildSelectFromAggregate(e)), t.effectiveWhere && r.searchParams.set("where", t.effectiveWhere), e.groupBy && r.searchParams.set("group_by", e.groupBy);
    const s = t.orderBy;
    if (s) {
      const o = s.replace(/:(\w+)$/, (l, c) => ` ${c.toUpperCase()}`);
      r.searchParams.set("order_by", o);
    }
    r.searchParams.set("limit", String(e.pageSize));
    const a = (t.page - 1) * e.pageSize;
    return a > 0 && r.searchParams.set("offset", String(a)), r.toString();
  }
  /**
   * Fetch les valeurs de facettes depuis l'endpoint ODS /facets.
   */
  async fetchFacets(e, t, i, r) {
    const s = e.baseUrl || "https://data.opendatasoft.com", a = new URL(`${s}/api/explore/v2.1/catalog/datasets/${e.datasetId}/facets`);
    for (const p of t)
      a.searchParams.append("facet", p);
    i && a.searchParams.set("where", i);
    const o = await fetch(a.toString(), et(e, r));
    if (!o.ok)
      throw new Error(`HTTP ${o.status}: ${o.statusText}`);
    const l = await o.json(), c = [];
    for (const p of l.facets || [])
      c.push({
        field: p.name,
        values: (p.facets || []).map((f) => ({
          value: f.value,
          count: f.count
        }))
      });
    return c;
  }
  getDefaultSearchTemplate() {
    return 'search("{q}")';
  }
  parseAggregates(e) {
    if (!e)
      return [];
    const t = [], i = e.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const s = r.split(":");
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
    const t = this.parseAggregates(e.aggregate), i = [];
    for (const s of t) {
      const a = s.function === "count" ? "count(*)" : `${s.function}(${s.field})`, o = s.alias || `${s.field}__${s.function}`;
      i.push(`${a} as ${o}`);
    }
    const r = e.groupBy.split(",").map((s) => s.trim()).filter(Boolean);
    for (const s of r)
      i.push(s);
    return i.join(", ");
  }
};
h(Mt, "OpenDataSoftAdapter");
let ht = Mt;
function Qt(n, e) {
  const t = {};
  return e && (t.signal = e), n.headers && Object.keys(n.headers).length > 0 && (t.headers = n.headers), t;
}
h(Qt, "buildFetchOptions");
const ze = 100, it = 500, Dt = class Dt {
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
    const i = e.limit <= 0, r = i ? it * ze : e.limit;
    let s = [], a = -1, o = 1;
    for (let c = 0; c < it && !(r - s.length <= 0); c++) {
      const f = this.buildUrl(e, ze, o), g = await fetch(f, Qt(e, t));
      if (!g.ok)
        throw new Error(`HTTP ${g.status}: ${g.statusText}`);
      const _ = await g.json(), R = _.data || [];
      s = s.concat(R), _.meta && typeof _.meta.total == "number" && (a = _.meta.total);
      let re = !1;
      if ((l = _.links) != null && l.next)
        try {
          const B = new URL(_.links.next, "https://tabular-api.data.gouv.fr"), Ft = Number(B.searchParams.get("page"));
          Ft > 0 && (o = Ft, re = !0);
        } catch {
        }
      if (!re || a >= 0 && s.length >= a || R.length < ze)
        break;
    }
    return !i && s.length > r && (s = s.slice(0, r)), a >= 0 && s.length < a && s.length < r && console.warn(`gouv-query: pagination incomplete - ${s.length}/${a} resultats recuperes (limite de securite: ${it} pages de ${ze})`), {
      data: s,
      totalCount: a >= 0 ? a : s.length,
      needsClientProcessing: !0
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(e, t, i) {
    var c;
    const r = this.buildServerSideUrl(e, t), s = await fetch(r, Qt(e, i));
    if (!s.ok)
      throw new Error(`HTTP ${s.status}: ${s.statusText}`);
    const a = await s.json(), o = a.data || [], l = ((c = a.meta) == null ? void 0 : c.total) ?? 0;
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
  buildUrl(e, t, i) {
    const r = this._getBaseUrl(e), s = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, a = new URL(`${r}/api/resources/${e.resource}/data/`, s), o = e.filter || e.where;
    if (o) {
      const l = o.split(",").map((c) => c.trim());
      for (const c of l) {
        const p = c.split(":");
        if (p.length >= 3) {
          const f = p[0], g = this._mapOperator(p[1]), _ = p.slice(2).join(":");
          a.searchParams.set(`${f}__${g}`, _);
        }
      }
    }
    if (e.groupBy) {
      const l = e.groupBy.split(",").map((c) => c.trim());
      for (const c of l)
        a.searchParams.append(`${c}__groupby`, "");
    }
    if (e.aggregate) {
      const l = e.aggregate.split(",").map((c) => c.trim());
      for (const c of l) {
        const p = c.split(":");
        if (p.length >= 2) {
          const f = p[0], g = p[1];
          a.searchParams.append(`${f}__${g}`, "");
        }
      }
    }
    if (e.orderBy) {
      const l = e.orderBy.split(":"), c = l[0], p = l[1] || "asc";
      a.searchParams.set(`${c}__sort`, p);
    }
    return t ? a.searchParams.set("page_size", String(t)) : e.limit > 0 && a.searchParams.set("page_size", String(e.limit)), i && a.searchParams.set("page", String(i)), a.toString();
  }
  /**
   * Construit l'URL Tabular en mode server-side (une seule page).
   */
  buildServerSideUrl(e, t) {
    const i = this._getBaseUrl(e), r = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, s = new URL(`${i}/api/resources/${e.resource}/data/`, r), a = e.filter || e.where;
    if (a) {
      const l = a.split(",").map((c) => c.trim());
      for (const c of l) {
        const p = c.split(":");
        if (p.length >= 3) {
          const f = p[0], g = this._mapOperator(p[1]), _ = p.slice(2).join(":");
          s.searchParams.set(`${f}__${g}`, _);
        }
      }
    }
    const o = t.orderBy;
    if (o) {
      const l = o.split(":"), c = l[0], p = l[1] || "asc";
      s.searchParams.set(`${c}__sort`, p);
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
    const t = ni();
    return `${t.baseUrl}${t.endpoints.tabular}`;
  }
};
h(Dt, "TabularAdapter");
let dt = Dt;
const oi = /* @__PURE__ */ new Map([
  ["generic", new ut()],
  ["opendatasoft", new ht()],
  ["tabular", new dt()]
]);
function rt(n) {
  const e = oi.get(n);
  if (!e)
    throw new Error(`Type d'API non supporte: ${n}`);
  return e;
}
h(rt, "getAdapter");
function Gi(n) {
  oi.set(n.type, n);
}
h(Gi, "registerAdapter");
var S = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, le;
let v = (le = class extends C {
  constructor() {
    super(...arguments), this.apiType = "generic", this.source = "", this.baseUrl = "", this.datasetId = "", this.resource = "", this.select = "", this.where = "", this.filter = "", this.groupBy = "", this.aggregate = "", this.orderBy = "", this.limit = 0, this.transform = "", this.serverSide = !1, this.pageSize = 20, this.headers = "", this.refresh = 0, this._loading = !1, this._error = null, this._data = [], this._rawData = [], this._adapter = rt("generic"), this._refreshInterval = null, this._abortController = null, this._unsubscribe = null, this._unsubscribeCommands = null, this._serverPage = 1, this._serverWheres = /* @__PURE__ */ new Map(), this._serverOrderBy = "";
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return d``;
  }
  connectedCallback() {
    super.connectedCallback(), H("gouv-query", this.apiType), this._adapter = rt(this.apiType), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && (Te(this.id), $t(this.id));
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
    ].some((i) => e.has(i)) && (e.has("apiType") && (this._adapter = rt(this.apiType)), this.serverSide && [
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
    ].some((r) => e.has(r)) && (this._serverPage = 1, this._serverWheres.clear(), this._serverOrderBy = ""), this._initialize()), e.has("refresh") && this._setupRefresh();
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
    const e = Pe(this.source);
    e !== void 0 && (this._rawData = Array.isArray(e) ? e : [e], this._processClientSide()), this._unsubscribe = Ue(this.source, {
      onLoaded: /* @__PURE__ */ h((t) => {
        this._rawData = Array.isArray(t) ? t : [t], this._processClientSide();
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ h(() => {
        this._loading = !0, Q(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ h((t) => {
        this._error = t, this._loading = !1, W(this.id, t);
      }, "onError")
    });
  }
  /**
   * Traitement cote client des donnees
   */
  _processClientSide() {
    try {
      Q(this.id), this._loading = !0;
      let e = [...this._rawData];
      const t = this.filter || this.where;
      t && (e = this._applyFilters(e, t)), this.groupBy && (e = this._applyGroupByAndAggregate(e)), this.orderBy && (e = this._applySort(e)), this.limit > 0 && (e = e.slice(0, this.limit)), this._data = e, q(this.id, this._data);
    } catch (e) {
      this._error = e, W(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de traitement`, e);
    } finally {
      this._loading = !1;
    }
  }
  /**
   * Parse et applique les filtres (format: "field:operator:value")
   */
  _applyFilters(e, t) {
    const i = this._parseFilters(t);
    return e.filter((r) => i.every((s) => this._matchesFilter(r, s)));
  }
  _parseFilters(e) {
    const t = [], i = e.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const s = r.split(":");
      if (s.length >= 2) {
        const a = s[0], o = s[1];
        let l;
        if (s.length > 2) {
          const c = s.slice(2).join(":");
          o === "in" || o === "notin" ? l = c.split("|").map((p) => {
            const f = this._parseValue(p);
            return typeof f == "boolean" ? String(f) : f;
          }) : l = this._parseValue(c);
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
    const i = w(e, t.field);
    switch (t.operator) {
      case "eq":
        return i == t.value;
      case "neq":
        return i != t.value;
      case "gt":
        return Number(i) > Number(t.value);
      case "gte":
        return Number(i) >= Number(t.value);
      case "lt":
        return Number(i) < Number(t.value);
      case "lte":
        return Number(i) <= Number(t.value);
      case "contains":
        return String(i).toLowerCase().includes(String(t.value).toLowerCase());
      case "notcontains":
        return !String(i).toLowerCase().includes(String(t.value).toLowerCase());
      case "in":
        return Array.isArray(t.value) && t.value.includes(i);
      case "notin":
        return Array.isArray(t.value) && !t.value.includes(i);
      case "isnull":
        return i == null;
      case "isnotnull":
        return i != null;
      default:
        return !0;
    }
  }
  /**
   * Applique le GROUP BY et les agregations
   */
  _applyGroupByAndAggregate(e) {
    const t = this.groupBy.split(",").map((a) => a.trim()).filter(Boolean), i = this._parseAggregates(this.aggregate), r = /* @__PURE__ */ new Map();
    for (const a of e) {
      const o = t.map((l) => String(w(a, l) ?? "")).join("|||");
      r.has(o) || r.set(o, []), r.get(o).push(a);
    }
    const s = [];
    for (const [a, o] of r) {
      const l = {}, c = a.split("|||");
      t.forEach((p, f) => {
        Vt(l, p, c[f]);
      });
      for (const p of i) {
        const f = p.alias || `${p.field}__${p.function}`;
        Vt(l, f, this._computeAggregate(o, p));
      }
      s.push(l);
    }
    return s;
  }
  _parseAggregates(e) {
    if (!e)
      return [];
    const t = [], i = e.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const s = r.split(":");
      s.length >= 2 && t.push({
        field: s[0],
        function: s[1],
        alias: s[2]
      });
    }
    return t;
  }
  _computeAggregate(e, t) {
    const i = e.map((r) => Number(w(r, t.field))).filter((r) => !isNaN(r));
    switch (t.function) {
      case "count":
        return e.length;
      case "sum":
        return i.reduce((r, s) => r + s, 0);
      case "avg":
        return i.length > 0 ? i.reduce((r, s) => r + s, 0) / i.length : 0;
      case "min":
        return i.length > 0 ? Math.min(...i) : 0;
      case "max":
        return i.length > 0 ? Math.max(...i) : 0;
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
    const i = t[0], r = (t[1] || "asc").toLowerCase();
    return [...e].sort((s, a) => {
      const o = w(s, i), l = w(a, i), c = Number(o), p = Number(l);
      if (!isNaN(c) && !isNaN(p))
        return r === "desc" ? p - c : c - p;
      const f = String(o ?? ""), g = String(l ?? "");
      return r === "desc" ? g.localeCompare(f) : f.localeCompare(g);
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
    this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, Q(this.id);
    try {
      this.serverSide && this._adapter.capabilities.serverFetch ? await this._fetchServerSideDelegated() : this._adapter.capabilities.serverFetch ? await this._fetchAllDelegated() : await this._fetchSinglePage();
    } catch (i) {
      if (i.name === "AbortError")
        return;
      this._error = i, W(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de requete API`, i);
    } finally {
      this._loading = !1;
    }
  }
  /**
   * Fetch toutes les donnees avec pagination automatique via l'adapter.
   */
  async _fetchAllDelegated() {
    const e = await this._adapter.fetchAll(this._getAdapterParams(), this._abortController.signal);
    e.needsClientProcessing ? (this._rawData = e.data, this._processClientSide()) : (this._data = this.transform ? w(e.data, this.transform) : e.data, q(this.id, this._data));
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
    let i = t.data;
    if (this.transform) {
      const r = t.rawJson || i, s = w(r, this.transform);
      i = Array.isArray(s) ? s : [s];
    }
    yt(this.id, {
      page: this._serverPage,
      pageSize: this.pageSize,
      total: t.totalCount
    }), this._data = i, q(this.id, this._data);
  }
  /**
   * Fetch single page fallback (mode non-pagine)
   */
  async _fetchSinglePage() {
    const e = this._getAdapterParams(), t = this._adapter.buildUrl(e), i = { signal: this._abortController.signal };
    e.headers && Object.keys(e.headers).length > 0 && (i.headers = e.headers);
    const r = await fetch(t, i);
    if (!r.ok)
      throw new Error(`HTTP ${r.status}: ${r.statusText}`);
    const s = await r.json();
    let a = this.transform ? w(s, this.transform) : s;
    Array.isArray(a) || (this._adapter.type === "tabular" && s.data ? a = s.data : a = [a]), this._data = a, q(this.id, this._data);
  }
  /**
   * Parse le JSON de headers en objet.
   */
  _parseHeaders() {
    if (this.headers)
      try {
        return JSON.parse(this.headers);
      } catch (e) {
        console.warn("gouv-query: headers invalides (JSON attendu)", e);
        return;
      }
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
      pageSize: this.pageSize,
      headers: this._parseHeaders()
    };
  }
  // --- Server-side command handling ---
  /**
   * Configure l'ecoute des commandes pour le mode server-side.
   * Les composants en aval (search, display, datalist) emettent des
   * gouv-source-command avec page/where/orderBy que query recoit ici.
   */
  _setupServerSideListener() {
    this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), !(!this.serverSide || !this.id) && (this._unsubscribeCommands = wt(this.id, (e) => {
      let t = !1;
      if (e.page !== void 0 && e.page !== this._serverPage && (this._serverPage = e.page, t = !0), e.where !== void 0) {
        const i = e.whereKey || "_default", r = this._getMergedWhere();
        e.where ? this._serverWheres.set(i, e.where) : this._serverWheres.delete(i), this._getMergedWhere() !== r && (e.page === void 0 && (this._serverPage = 1), t = !0);
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
    const t = [], i = this.where || this.filter;
    i && t.push(i);
    for (const [r, s] of this._serverWheres)
      e && r === e || s && t.push(s);
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
}, h(le, "GouvQuery"), le);
S([
  u({ type: String, attribute: "api-type" })
], v.prototype, "apiType", void 0);
S([
  u({ type: String })
], v.prototype, "source", void 0);
S([
  u({ type: String, attribute: "base-url" })
], v.prototype, "baseUrl", void 0);
S([
  u({ type: String, attribute: "dataset-id" })
], v.prototype, "datasetId", void 0);
S([
  u({ type: String })
], v.prototype, "resource", void 0);
S([
  u({ type: String })
], v.prototype, "select", void 0);
S([
  u({ type: String })
], v.prototype, "where", void 0);
S([
  u({ type: String })
], v.prototype, "filter", void 0);
S([
  u({ type: String, attribute: "group-by" })
], v.prototype, "groupBy", void 0);
S([
  u({ type: String })
], v.prototype, "aggregate", void 0);
S([
  u({ type: String, attribute: "order-by" })
], v.prototype, "orderBy", void 0);
S([
  u({ type: Number })
], v.prototype, "limit", void 0);
S([
  u({ type: String })
], v.prototype, "transform", void 0);
S([
  u({ type: Boolean, attribute: "server-side" })
], v.prototype, "serverSide", void 0);
S([
  u({ type: Number, attribute: "page-size" })
], v.prototype, "pageSize", void 0);
S([
  u({ type: String })
], v.prototype, "headers", void 0);
S([
  u({ type: Number })
], v.prototype, "refresh", void 0);
S([
  m()
], v.prototype, "_loading", void 0);
S([
  m()
], v.prototype, "_error", void 0);
S([
  m()
], v.prototype, "_data", void 0);
S([
  m()
], v.prototype, "_rawData", void 0);
v = S([
  D("gouv-query")
], v);
var I = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, ce;
let z = (ce = class extends C {
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
    super.connectedCallback(), H("gouv-normalize"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null), this.id && (Te(this.id), $t(this.id));
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    if (["flatten", "numeric", "numericAuto", "rename", "trim", "stripHtml", "replace", "lowercaseKeys"].some((r) => e.has(r))) {
      const r = this.source ? Pe(this.source) : void 0;
      r !== void 0 && this._processData(r);
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
    const e = Pe(this.source);
    e !== void 0 && this._processData(e), this._unsubscribe = Ue(this.source, {
      onLoaded: /* @__PURE__ */ h((t) => {
        this._processData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ h(() => {
        Q(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ h((t) => {
        W(this.id, t);
      }, "onError")
    }), this._unsubscribePageRequests = wt(this.id, (t) => {
      J(this.source, t);
    });
  }
  _processData(e) {
    try {
      Q(this.id);
      let t = Array.isArray(e) ? e : [e];
      this.flatten && (t = t.map((l) => l == null || typeof l != "object" || Array.isArray(l) ? l : this._flattenRow(l, this.flatten)));
      const i = this._parseNumericFields(), r = this._parsePipeMap(this.rename), s = this._parsePipeMap(this.replace), a = t.map((l) => l == null || typeof l != "object" ? l : this._normalizeRow(l, i, r, s));
      q(this.id, a);
      const o = Ge(this.source);
      o && yt(this.id, o);
    } catch (t) {
      W(this.id, t), console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`, t);
    }
  }
  _normalizeRow(e, t, i, r) {
    const s = {};
    for (const [a, o] of Object.entries(e)) {
      const l = this.trim ? a.trim() : a;
      let c = o;
      if (this.trim && typeof c == "string" && (c = c.trim()), this.stripHtml && typeof c == "string" && (c = c.replace(/<[^>]*>/g, "")), r.size > 0 && typeof c == "string") {
        for (const [g, _] of r)
          if (c === g) {
            c = _;
            break;
          }
      }
      if (t.has(l))
        c = Wt(c);
      else if (this.numericAuto && typeof c == "string" && Ai(c)) {
        const g = Wt(c, !0);
        g !== null && (c = g);
      }
      const p = i.get(l) ?? l, f = this.lowercaseKeys ? p.toLowerCase() : p;
      s[f] = c;
    }
    return s;
  }
  /** Aplatit un sous-objet au premier niveau d'un enregistrement */
  _flattenRow(e, t) {
    const i = this._resolvePath(e, t);
    if (i && typeof i == "object" && !Array.isArray(i)) {
      const r = { ...e };
      return this._deleteByPath(r, t), Object.assign(r, i), r;
    }
    return e;
  }
  /** Resout un chemin en dot notation sur un objet */
  _resolvePath(e, t) {
    return t.split(".").reduce((i, r) => i != null && typeof i == "object" ? i[r] : void 0, e);
  }
  /** Supprime une cle par chemin dot notation (supprime aussi la racine du chemin) */
  _deleteByPath(e, t) {
    const i = t.split(".");
    delete e[i[0]];
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
    const i = e.split("|");
    for (const r of i) {
      const s = r.indexOf(":");
      if (s === -1)
        continue;
      const a = r.substring(0, s).trim(), o = r.substring(s + 1).trim();
      a && t.set(a, o);
    }
    return t;
  }
}, h(ce, "GouvNormalize"), ce);
I([
  u({ type: String })
], z.prototype, "source", void 0);
I([
  u({ type: String })
], z.prototype, "numeric", void 0);
I([
  u({ type: Boolean, attribute: "numeric-auto" })
], z.prototype, "numericAuto", void 0);
I([
  u({ type: String })
], z.prototype, "rename", void 0);
I([
  u({ type: Boolean })
], z.prototype, "trim", void 0);
I([
  u({ type: Boolean, attribute: "strip-html" })
], z.prototype, "stripHtml", void 0);
I([
  u({ type: String })
], z.prototype, "replace", void 0);
I([
  u({ type: String })
], z.prototype, "flatten", void 0);
I([
  u({ type: Boolean, attribute: "lowercase-keys" })
], z.prototype, "lowercaseKeys", void 0);
z = I([
  D("gouv-normalize")
], z);
var P = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, ue;
let y = (ue = class extends C {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.labels = "", this.maxValues = 6, this.disjunctive = "", this.sort = "count", this.searchable = "", this.hideEmpty = !1, this.display = "", this.urlParams = !1, this.urlParamMap = "", this.urlSync = !1, this.serverFacets = !1, this.hideCounts = !1, this.cols = "", this._rawData = [], this._facetGroups = [], this._activeSelections = {}, this._expandedFacets = /* @__PURE__ */ new Set(), this._searchQueries = {}, this._openMultiselectField = null, this._unsubscribe = null, this._popstateHandler = null, this._urlParamsApplied = !1, this._onClickOutsideMultiselect = (e) => {
      if (!this._openMultiselectField)
        return;
      const t = e.target, i = this.querySelector(`[data-multiselect="${this._openMultiselectField}"]`);
      i && !i.contains(t) && (this._openMultiselectField = null);
    };
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), H("gouv-facets"), this._initialize(), document.addEventListener("click", this._onClickOutsideMultiselect), this.urlSync && (this._popstateHandler = () => {
      this._applyUrlParams(), this._buildFacetGroups(), this._applyFilters();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._onClickOutsideMultiselect), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && Te(this.id);
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
    ["fields", "labels", "sort", "hideEmpty", "maxValues", "disjunctive", "searchable", "display", "cols"].some((r) => e.has(r)) && this._rawData.length > 0 && (this.serverFacets ? this._fetchServerFacets() : (this._buildFacetGroups(), this._applyFilters()));
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
    const e = Pe(this.source);
    e !== void 0 && this._onData(e), this._unsubscribe = Ue(this.source, {
      onLoaded: /* @__PURE__ */ h((t) => {
        this._onData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ h(() => {
        Q(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ h((t) => {
        W(this.id, t);
      }, "onError")
    });
  }
  _onData(e) {
    if (this._rawData = Array.isArray(e) ? e : [], this.urlParams && !this._urlParamsApplied && (this._applyUrlParams(), this._urlParamsApplied = !0, this.serverFacets && this._hasActiveSelections())) {
      this._dispatchFacetCommand();
      return;
    }
    this.serverFacets ? (this._fetchServerFacets(), this.id && q(this.id, this._rawData)) : (this._buildFacetGroups(), this._applyFilters());
  }
  // --- Facet index building ---
  _buildFacetGroups() {
    const e = this._getFields(), t = this._parseLabels();
    this._facetGroups = e.map((i) => {
      const r = this._computeFacetValues(i);
      return {
        field: i,
        label: t.get(i) ?? i,
        values: r
      };
    }).filter((i) => this.hideEmpty && i.values.length <= 1 ? !1 : i.values.length > 0);
  }
  /** Get fields to use as facets — explicit or auto-detected */
  _getFields() {
    return this.fields ? je(this.fields) : this._autoDetectFields();
  }
  /** Auto-detect categorical fields: string type, 2-50 unique values, not all unique (ID-like) */
  _autoDetectFields() {
    if (this._rawData.length === 0)
      return [];
    const e = [], t = this._rawData[0];
    for (const i of Object.keys(t)) {
      const r = /* @__PURE__ */ new Set();
      let s = !0;
      for (const a of this._rawData) {
        const o = a[i];
        if (!(o == null || o === "")) {
          if (typeof o != "string") {
            s = !1;
            break;
          }
          if (r.add(o), r.size > 50)
            break;
        }
      }
      s && (r.size <= 1 || r.size > 50 || r.size !== this._rawData.length && e.push(i));
    }
    return e;
  }
  /** Compute facet values with counts, applying cross-facet filtering for dynamic counts */
  _computeFacetValues(e) {
    const t = this._getDataFilteredExcluding(e), i = /* @__PURE__ */ new Map();
    for (const s of t) {
      const a = s[e];
      if (a == null || a === "")
        continue;
      const o = String(a);
      i.set(o, (i.get(o) ?? 0) + 1);
    }
    const r = [];
    for (const [s, a] of i)
      r.push({ value: s, count: a });
    return this._sortValues(r);
  }
  /** Filter data by all active selections EXCEPT the given field */
  _getDataFilteredExcluding(e) {
    const t = Object.keys(this._activeSelections).filter((i) => i !== e && this._activeSelections[i].size > 0);
    return t.length === 0 ? this._rawData : this._rawData.filter((i) => t.every((r) => {
      const s = this._activeSelections[r], a = i[r];
      return a == null ? !1 : s.has(String(a));
    }));
  }
  _sortValues(e) {
    const t = [...e];
    switch (this.sort) {
      case "count":
        t.sort((i, r) => r.count - i.count);
        break;
      case "-count":
        t.sort((i, r) => i.count - r.count);
        break;
      case "alpha":
        t.sort((i, r) => i.value.localeCompare(r.value, "fr"));
        break;
      case "-alpha":
        t.sort((i, r) => r.value.localeCompare(i.value, "fr"));
        break;
      default:
        t.sort((i, r) => r.count - i.count);
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
    var f, g;
    const e = document.getElementById(this.source);
    if (!e)
      return;
    const t = (f = e.getAdapter) == null ? void 0 : f.call(e);
    if (!(t != null && t.capabilities.serverFacets) || !t.fetchFacets) {
      this._buildFacetGroups(), this._applyFilters();
      return;
    }
    const i = e.baseUrl || e.getAttribute("base-url") || "", r = e.datasetId || e.getAttribute("dataset-id") || "";
    if (!r)
      return;
    let s;
    const a = e.headers || e.getAttribute("headers") || "";
    if (a)
      try {
        s = JSON.parse(a);
      } catch {
      }
    const o = je(this.fields);
    if (o.length === 0)
      return;
    const l = this._parseLabels(), c = /* @__PURE__ */ new Map();
    for (const _ of o) {
      const R = ((g = e.getEffectiveWhere) == null ? void 0 : g.call(e, this.id)) || "", re = this._buildFacetWhereExcluding(_), B = [R, re].filter(Boolean).join(" AND ");
      c.has(B) || c.set(B, []), c.get(B).push(_);
    }
    const p = [];
    for (const [_, R] of c)
      try {
        const re = await t.fetchFacets({ baseUrl: i, datasetId: r, headers: s }, R, _);
        for (const B of re)
          p.push({
            field: B.field,
            label: l.get(B.field) ?? B.field,
            values: this._sortValues(B.values)
          });
      } catch {
      }
    this._facetGroups = o.map((_) => p.find((R) => R.field === _)).filter((_) => !!_).filter((_) => !(this.hideEmpty && _.values.length <= 1));
  }
  /** Build ODSQL where clause for all active facet selections EXCEPT the given field */
  _buildFacetWhereExcluding(e) {
    const t = [];
    for (const [i, r] of Object.entries(this._activeSelections))
      if (!(i === e || r.size === 0))
        if (r.size === 1) {
          const s = [...r][0].replace(/"/g, '\\"');
          t.push(`${i} = "${s}"`);
        } else {
          const s = [...r].map((a) => `"${a.replace(/"/g, '\\"')}"`).join(", ");
          t.push(`${i} IN (${s})`);
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
    J(this.source, { where: e, whereKey: this.id });
  }
  // --- Filtering ---
  _applyFilters() {
    const e = Object.keys(this._activeSelections).filter((i) => this._activeSelections[i].size > 0);
    let t;
    e.length === 0 ? t = this._rawData : t = this._rawData.filter((i) => e.every((r) => {
      const s = this._activeSelections[r], a = i[r];
      return a == null ? !1 : s.has(String(a));
    })), q(this.id, t);
  }
  // --- Parsing helpers ---
  _parseLabels() {
    const e = /* @__PURE__ */ new Map();
    if (!this.labels)
      return e;
    const t = this.labels.split("|");
    for (const i of t) {
      const r = i.indexOf(":");
      if (r === -1)
        continue;
      const s = i.substring(0, r).trim(), a = i.substring(r + 1).trim();
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
    for (const i of t) {
      const r = i.indexOf(":");
      if (r === -1)
        continue;
      const s = i.substring(0, r).trim(), a = i.substring(r + 1).trim();
      s && (a === "checkbox" || a === "select" || a === "multiselect" || a === "radio") && e.set(s, a);
    }
    return e;
  }
  /** Get the display mode for a specific field */
  _getDisplayMode(e) {
    return this._parseDisplayModes().get(e) ?? "checkbox";
  }
  /** Parse cols attribute: returns global col size or per-field map */
  _parseCols() {
    if (!this.cols)
      return null;
    const e = this.cols.trim();
    if (/^\d+$/.test(e))
      return { global: parseInt(e, 10) };
    const t = /* @__PURE__ */ new Map(), i = e.split("|");
    for (const r of i) {
      const s = r.indexOf(":");
      if (s === -1)
        continue;
      const a = r.substring(0, s).trim(), o = parseInt(r.substring(s + 1).trim(), 10);
      a && !isNaN(o) && t.set(a, o);
    }
    return t.size > 0 ? { map: t, fallback: 6 } : null;
  }
  /** Get DSFR col class for a specific field */
  _getColClass(e) {
    const t = this._parseCols();
    return t ? "global" in t ? `fr-col-${t.global}` : `fr-col-${t.map.get(e) ?? t.fallback}` : "";
  }
  // --- User interaction ---
  _toggleValue(e, t) {
    const i = { ...this._activeSelections }, r = new Set(i[e] ?? []), s = this._getDisplayMode(e), a = je(this.disjunctive), o = s === "multiselect" || s === "checkbox" && a.includes(e);
    r.has(t) ? r.delete(t) : (o || r.clear(), r.add(t)), r.size === 0 ? delete i[e] : i[e] = r, this._activeSelections = i, this._afterSelectionChange();
  }
  _handleSelectChange(e, t) {
    const r = t.target.value, s = { ...this._activeSelections };
    r ? s[e] = /* @__PURE__ */ new Set([r]) : delete s[e], this._activeSelections = s, this._afterSelectionChange();
  }
  _clearFieldSelections(e) {
    const t = { ...this._activeSelections };
    delete t[e], this._activeSelections = t, this._afterSelectionChange();
  }
  _selectAllValues(e) {
    const t = this._facetGroups.find((r) => r.field === e);
    if (!t)
      return;
    const i = { ...this._activeSelections };
    i[e] = new Set(t.values.map((r) => r.value)), this._activeSelections = i, this._afterSelectionChange();
  }
  _toggleMultiselectDropdown(e) {
    this._openMultiselectField === e ? this._openMultiselectField = null : (this._openMultiselectField = e, this.updateComplete.then(() => {
      const t = this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-panel`), i = t == null ? void 0 : t.querySelector("button, input, select, [tabindex]");
      i == null || i.focus();
    }));
  }
  _handleMultiselectKeydown(e, t) {
    if (t.key === "Escape") {
      this._openMultiselectField = null;
      const i = this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-trigger`);
      i == null || i.focus();
    }
  }
  _handleMultiselectFocusout(e) {
    this._openMultiselectField === e && setTimeout(() => {
      const t = this.querySelector(`[data-multiselect="${e}"]`);
      t && !t.contains(document.activeElement) && (this._openMultiselectField = null);
    }, 0);
  }
  _toggleExpand(e) {
    const t = new Set(this._expandedFacets);
    t.has(e) ? t.delete(e) : t.add(e), this._expandedFacets = t;
  }
  _handleSearch(e, t) {
    const i = t.target;
    this._searchQueries = { ...this._searchQueries, [e]: i.value };
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
    for (const i of t) {
      const r = i.indexOf(":");
      if (r === -1)
        continue;
      const s = i.substring(0, r).trim(), a = i.substring(r + 1).trim();
      s && a && e.set(s, a);
    }
    return e;
  }
  /** Read URL search params and apply as facet pre-selections */
  _applyUrlParams() {
    const e = new URLSearchParams(window.location.search), t = this._parseUrlParamMap(), i = {};
    for (const [r, s] of e.entries()) {
      const a = t.size > 0 ? t.get(r) ?? null : r;
      if (!a)
        continue;
      const o = s.split(",").map((l) => l.trim()).filter(Boolean);
      i[a] || (i[a] = /* @__PURE__ */ new Set());
      for (const l of o)
        i[a].add(l);
    }
    Object.keys(i).length > 0 && (this._activeSelections = i);
  }
  /** Sync current facet selections back to URL (replaceState) */
  _syncUrl() {
    const e = new URLSearchParams(), t = this._parseUrlParamMap(), i = /* @__PURE__ */ new Map();
    for (const [a, o] of t)
      i.set(o, a);
    for (const [a, o] of Object.entries(this._activeSelections)) {
      if (o.size === 0)
        continue;
      const l = i.get(a) ?? a;
      e.set(l, [...o].join(","));
    }
    const r = e.toString(), s = r ? `${window.location.pathname}?${r}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", s);
  }
  // --- Rendering ---
  render() {
    if (this._rawData.length === 0 || this._facetGroups.length === 0)
      return b;
    const e = Object.keys(this._activeSelections).some((i) => this._activeSelections[i].size > 0), t = !!this.cols;
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
        ` : b}
        ${t ? d`
          <div class="fr-grid-row fr-grid-row--gutters">
            ${this._facetGroups.map((i) => d`
              <div class="${this._getColClass(i.field)}">
                ${this._renderFacetGroup(i)}
              </div>
            `)}
          </div>
        ` : d`
          <div class="gouv-facets__groups">
            ${this._facetGroups.map((i) => this._renderFacetGroup(i))}
          </div>
        `}
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
    const i = je(this.searchable).includes(e.field), r = (this._searchQueries[e.field] ?? "").toLowerCase(), s = this._expandedFacets.has(e.field), a = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set();
    let o = e.values;
    i && r && (o = o.filter((f) => f.value.toLowerCase().includes(r)));
    const l = s ? o : o.slice(0, this.maxValues), c = o.length > this.maxValues, p = `facet-${this.id}-${e.field}`;
    return d`
      <fieldset class="fr-fieldset gouv-facets__group" aria-labelledby="${p}-legend">
        <legend class="fr-fieldset__legend fr-text--bold" id="${p}-legend">${e.label}</legend>
        ${i ? d`
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(f) => this._handleSearch(e.field, f)}"
                aria-label="Rechercher dans ${e.label}">
            </div>
          </div>
        ` : b}
        ${l.map((f) => {
      const g = `${p}-${f.value.replace(/[^a-zA-Z0-9]/g, "_")}`, _ = a.has(f.value);
      return d`
            <div class="fr-fieldset__element">
              <div class="fr-checkbox-group fr-checkbox-group--sm">
                <input type="checkbox" id="${g}"
                  .checked="${_}"
                  @change="${() => this._toggleValue(e.field, f.value)}">
                <label class="fr-label" for="${g}">
                  ${f.value}${this.hideCounts ? b : d` <span class="gouv-facets__count">${f.count}</span>`}
                </label>
              </div>
            </div>
          `;
    })}
        ${c ? d`
          <div class="fr-fieldset__element">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm" type="button"
              @click="${() => this._toggleExpand(e.field)}">
              ${s ? "Voir moins" : `Voir plus (${o.length - this.maxValues})`}
            </button>
          </div>
        ` : b}
      </fieldset>
    `;
  }
  _renderSelectGroup(e) {
    const t = `facet-${this.id}-${e.field}`, i = this._activeSelections[e.field], r = i ? [...i][0] ?? "" : "";
    return d`
      <div class="gouv-facets__group fr-select-group" data-field="${e.field}">
        <label class="fr-label" for="${t}-select">${e.label}</label>
        <select class="fr-select" id="${t}-select"
          @change="${(s) => this._handleSelectChange(e.field, s)}">
          <option value="" ?selected="${!r}">Tous</option>
          ${e.values.map((s) => d`
            <option value="${s.value}" ?selected="${s.value === r}">
              ${this.hideCounts ? s.value : `${s.value} (${s.count})`}
            </option>
          `)}
        </select>
      </div>
    `;
  }
  _renderMultiselectGroup(e) {
    const t = `facet-${this.id}-${e.field}`, i = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set(), r = this._openMultiselectField === e.field, s = (this._searchQueries[e.field] ?? "").toLowerCase();
    let a = e.values;
    s && (a = a.filter((l) => l.value.toLowerCase().includes(s)));
    const o = i.size > 0 ? `${i.size} option${i.size > 1 ? "s" : ""} selectionnee${i.size > 1 ? "s" : ""}` : "Selectionnez des options";
    return d`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}"
           @keydown="${(l) => this._handleMultiselectKeydown(e.field, l)}"
           @focusout="${() => this._handleMultiselectFocusout(e.field)}">
        <label class="fr-label" id="${t}-legend">${e.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${r}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          @click="${(l) => {
      l.stopPropagation(), this._toggleMultiselectDropdown(e.field);
    }}">
          ${o}
        </button>
        ${r ? d`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-label="${e.label}"
               @click="${(l) => l.stopPropagation()}">
            <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left ${i.size > 0 ? "fr-icon-close-circle-line" : "fr-icon-check-line"} gouv-facets__multiselect-toggle"
              type="button"
              @click="${() => i.size > 0 ? this._clearFieldSelections(e.field) : this._selectAllValues(e.field)}">
              ${i.size > 0 ? "Tout deselectionner" : "Tout selectionner"}
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
      const c = `${t}-${l.value.replace(/[^a-zA-Z0-9]/g, "_")}`, p = i.has(l.value);
      return d`
                  <div class="fr-fieldset__element">
                    <div class="fr-checkbox-group fr-checkbox-group--sm">
                      <input type="checkbox" id="${c}"
                        .checked="${p}"
                        @change="${() => this._toggleValue(e.field, l.value)}">
                      <label class="fr-label" for="${c}">
                        ${l.value}${this.hideCounts ? b : d` <span class="gouv-facets__count">${l.count}</span>`}
                      </label>
                    </div>
                  </div>
                `;
    })}
            </fieldset>
          </div>
        ` : b}
      </div>
    `;
  }
  _renderRadioGroup(e) {
    const t = `facet-${this.id}-${e.field}`, i = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set(), r = this._openMultiselectField === e.field, s = (this._searchQueries[e.field] ?? "").toLowerCase();
    let a = e.values;
    s && (a = a.filter((c) => c.value.toLowerCase().includes(s)));
    const l = (i.size > 0 ? [...i][0] : null) ?? "Selectionnez une option";
    return d`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}"
           @keydown="${(c) => this._handleMultiselectKeydown(e.field, c)}"
           @focusout="${() => this._handleMultiselectFocusout(e.field)}">
        <label class="fr-label" id="${t}-legend">${e.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${r}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          @click="${(c) => {
      c.stopPropagation(), this._toggleMultiselectDropdown(e.field);
    }}">
          ${l}
        </button>
        ${r ? d`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-label="${e.label}"
               @click="${(c) => c.stopPropagation()}">
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${e.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(c) => this._handleSearch(e.field, c)}">
              <button class="fr-btn" type="button" title="Rechercher" aria-label="Rechercher">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${e.label}">
              ${a.map((c) => {
      const p = `${t}-${c.value.replace(/[^a-zA-Z0-9]/g, "_")}`, f = i.has(c.value);
      return d`
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-group--sm">
                      <input type="radio" id="${p}" name="${t}-radio"
                        .checked="${f}"
                        @change="${() => this._toggleValue(e.field, c.value)}">
                      <label class="fr-label" for="${p}">
                        ${c.value}${this.hideCounts ? b : d` <span class="gouv-facets__count">${c.count}</span>`}
                      </label>
                    </div>
                  </div>
                `;
    })}
            </fieldset>
          </div>
        ` : b}
      </div>
    `;
  }
}, h(ue, "GouvFacets"), ue);
P([
  u({ type: String })
], y.prototype, "source", void 0);
P([
  u({ type: String })
], y.prototype, "fields", void 0);
P([
  u({ type: String })
], y.prototype, "labels", void 0);
P([
  u({ type: Number, attribute: "max-values" })
], y.prototype, "maxValues", void 0);
P([
  u({ type: String })
], y.prototype, "disjunctive", void 0);
P([
  u({ type: String })
], y.prototype, "sort", void 0);
P([
  u({ type: String })
], y.prototype, "searchable", void 0);
P([
  u({ type: Boolean, attribute: "hide-empty" })
], y.prototype, "hideEmpty", void 0);
P([
  u({ type: String })
], y.prototype, "display", void 0);
P([
  u({ type: Boolean, attribute: "url-params" })
], y.prototype, "urlParams", void 0);
P([
  u({ type: String, attribute: "url-param-map" })
], y.prototype, "urlParamMap", void 0);
P([
  u({ type: Boolean, attribute: "url-sync" })
], y.prototype, "urlSync", void 0);
P([
  u({ type: Boolean, attribute: "server-facets" })
], y.prototype, "serverFacets", void 0);
P([
  u({ type: Boolean, attribute: "hide-counts" })
], y.prototype, "hideCounts", void 0);
P([
  u({ type: String })
], y.prototype, "cols", void 0);
P([
  m()
], y.prototype, "_rawData", void 0);
P([
  m()
], y.prototype, "_facetGroups", void 0);
P([
  m()
], y.prototype, "_activeSelections", void 0);
P([
  m()
], y.prototype, "_expandedFacets", void 0);
P([
  m()
], y.prototype, "_searchQueries", void 0);
P([
  m()
], y.prototype, "_openMultiselectField", void 0);
y = P([
  D("gouv-facets")
], y);
function je(n) {
  return n ? n.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
h(je, "_parseCSV");
var E = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, he;
let A = (he = class extends C {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.placeholder = "Rechercher…", this.label = "Rechercher", this.debounce = 300, this.minLength = 0, this.highlight = !1, this.operator = "contains", this.srLabel = !1, this.count = !1, this.urlSearchParam = "", this.urlSync = !1, this.serverSearch = !1, this.searchTemplate = 'search("{q}")', this._allData = [], this._filteredData = [], this._term = "", this._resultCount = 0, this._debounceTimer = null, this._unsubscribe = null, this._urlParamApplied = !1;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), H("gouv-search"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._debounceTimer !== null && (clearTimeout(this._debounceTimer), this._debounceTimer = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && Te(this.id);
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    ["fields", "operator", "minLength", "highlight"].some((r) => e.has(r)) && this._allData.length > 0 && this._applyFilter();
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
    const e = Pe(this.source);
    e !== void 0 && this._onData(e), this._unsubscribe = Ue(this.source, {
      onLoaded: /* @__PURE__ */ h((t) => {
        this._onData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ h(() => {
        Q(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ h((t) => {
        W(this.id, t);
      }, "onError")
    });
  }
  _onData(e) {
    const t = Array.isArray(e) ? e : [];
    if (this.serverSearch) {
      this._allData = t, this._filteredData = t;
      const i = Ge(this.source);
      this._resultCount = i ? i.total : t.length, this.id && q(this.id, t), this.urlSearchParam && !this._urlParamApplied && (this._applyUrlSearchParam(), this._urlParamApplied = !0, this._term && this._applyServerSearch());
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
      const t = this._getFields(), i = this.operator || "contains", r = this._normalize(e);
      this._filteredData = this._allData.filter((s) => this._matchRecord(s, r, t, i));
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
      const i = e.replace(/"/g, '\\"');
      t = this.searchTemplate.replace(/\{q\}/g, i);
    }
    J(this.source, { where: t, whereKey: this.id }), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
      bubbles: !0,
      composed: !0,
      detail: {
        sourceId: this.id,
        term: this._term,
        count: this._resultCount
      }
    }));
  }
  _matchRecord(e, t, i, r) {
    const s = i.length > 0 ? i : Object.keys(e).filter((a) => !a.startsWith("_"));
    switch (r) {
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
    const i = { ...e }, r = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), s = new RegExp("(" + r + ")", "gi"), a = this._getFields(), o = a.length > 0 ? a : Object.keys(e).filter((c) => typeof e[c] == "string"), l = [];
    return o.forEach((c) => {
      typeof e[c] == "string" && l.push(e[c].replace(s, "<mark>$1</mark>"));
    }), i._highlight = l.join(" … "), i;
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
    this.id && (q(this.id, this._filteredData), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
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
    const t = e.toString(), i = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", i);
  }
  render() {
    const e = this.id || "search", t = this.srLabel ? "fr-label sr-only" : "fr-label";
    return d`
      <div class="fr-search-bar" role="search" aria-label="${this.getAttribute("aria-label") || this.label}">
        <label class="${t}" for="gouv-search-${e}">${this.label}</label>
        <input class="fr-input"
          type="search"
          id="gouv-search-${e}"
          placeholder="${this.placeholder}"
          autocomplete="off"
          .value="${this._term}"
          @input="${(i) => this._onInput(i.target.value)}"
          @search="${(i) => {
      this._term = i.target.value, this._onSubmit();
    }}"
          @keydown="${(i) => {
      i.key === "Enter" && (i.preventDefault(), this._onSubmit());
    }}">
        <button class="fr-btn" title="Rechercher" type="button"
          @click="${(i) => {
      i.preventDefault(), this._onSubmit();
    }}">
          Rechercher
        </button>
      </div>
      ${this.count ? d`
        <p class="fr-text--sm fr-mt-1v gouv-search-count" aria-live="polite">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      ` : d`
        <p class="fr-sr-only" aria-live="polite">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      `}
    `;
  }
}, h(he, "GouvSearch"), he);
E([
  u({ type: String })
], A.prototype, "source", void 0);
E([
  u({ type: String })
], A.prototype, "fields", void 0);
E([
  u({ type: String })
], A.prototype, "placeholder", void 0);
E([
  u({ type: String })
], A.prototype, "label", void 0);
E([
  u({ type: Number })
], A.prototype, "debounce", void 0);
E([
  u({ type: Number, attribute: "min-length" })
], A.prototype, "minLength", void 0);
E([
  u({ type: Boolean })
], A.prototype, "highlight", void 0);
E([
  u({ type: String })
], A.prototype, "operator", void 0);
E([
  u({ type: Boolean, attribute: "sr-label" })
], A.prototype, "srLabel", void 0);
E([
  u({ type: Boolean })
], A.prototype, "count", void 0);
E([
  u({ type: String, attribute: "url-search-param" })
], A.prototype, "urlSearchParam", void 0);
E([
  u({ type: Boolean, attribute: "url-sync" })
], A.prototype, "urlSync", void 0);
E([
  u({ type: Boolean, attribute: "server-search" })
], A.prototype, "serverSearch", void 0);
E([
  u({ type: String, attribute: "search-template" })
], A.prototype, "searchTemplate", void 0);
E([
  m()
], A.prototype, "_allData", void 0);
E([
  m()
], A.prototype, "_filteredData", void 0);
E([
  m()
], A.prototype, "_term", void 0);
E([
  m()
], A.prototype, "_resultCount", void 0);
A = E([
  D("gouv-search")
], A);
function We(n) {
  const t = class t extends n {
    constructor() {
      super(...arguments), this._sourceLoading = !1, this._sourceData = null, this._sourceError = null, this._unsubscribeSource = null;
    }
    /**
     * Hook appelé quand de nouvelles données arrivent.
     * À surcharger dans le composant hôte.
     */
    onSourceData(r) {
    }
    connectedCallback() {
      super.connectedCallback(), this._subscribeToSource();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._cleanupSubscription();
    }
    updated(r) {
      super.updated(r), r.has("source") && this._subscribeToSource();
    }
    _subscribeToSource() {
      this._cleanupSubscription();
      const r = this.source;
      if (!r)
        return;
      const s = Pe(r);
      s !== void 0 && (this._sourceData = s, this.onSourceData(s)), this._unsubscribeSource = Ue(r, {
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
h(We, "SourceSubscriberMixin");
function Jt(n, e = "nombre") {
  if (n == null || n === "")
    return "—";
  const t = typeof n == "string" ? parseFloat(n) : n;
  if (isNaN(t))
    return "—";
  switch (e) {
    case "nombre":
      return Kt(t);
    case "pourcentage":
      return Fi(t);
    case "euro":
      return Oi(t);
    case "decimal":
      return Ti(t);
    default:
      return Kt(t);
  }
}
h(Jt, "formatValue");
function Kt(n) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(n));
}
h(Kt, "formatNumber");
function Fi(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(n / 100);
}
h(Fi, "formatPercentage");
function Oi(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n);
}
h(Oi, "formatCurrency");
function Ti(n) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(n);
}
h(Ti, "formatDecimal");
function Wi(n) {
  const e = typeof n == "string" ? new Date(n) : n;
  return isNaN(e.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(e);
}
h(Wi, "formatDate");
function Ui(n, e, t) {
  return e !== void 0 && n >= e ? "vert" : t !== void 0 && n >= t ? "orange" : e !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
h(Ui, "getColorBySeuil");
function Li(n) {
  const e = n.split(":");
  if (e.length === 1)
    return e[0] === "count" ? { type: "count", field: "" } : { type: "direct", field: e[0] };
  const t = e[0], i = e[1];
  if (e.length === 3) {
    let r = e[2];
    return r === "true" ? r = !0 : r === "false" ? r = !1 : isNaN(Number(r)) || (r = Number(r)), { type: t, field: i, filterField: i, filterValue: r };
  }
  return { type: t, field: i };
}
h(Li, "parseExpression");
function Zt(n, e) {
  const t = Li(e);
  if (t.type === "direct" && !Array.isArray(n))
    return n[t.field];
  if (!Array.isArray(n))
    return null;
  const i = n;
  switch (t.type) {
    case "direct":
    case "first":
      return i.length > 0 ? i[0][t.field] : null;
    case "last":
      return i.length > 0 ? i[i.length - 1][t.field] : null;
    case "count":
      return t.filterValue !== void 0 ? i.filter((s) => s[t.field] === t.filterValue).length : i.length;
    case "sum":
      return i.reduce((s, a) => {
        const o = Number(a[t.field]);
        return s + (isNaN(o) ? 0 : o);
      }, 0);
    case "avg":
      return i.length === 0 ? null : i.reduce((s, a) => {
        const o = Number(a[t.field]);
        return s + (isNaN(o) ? 0 : o);
      }, 0) / i.length;
    case "min":
      return i.length === 0 ? null : Math.min(...i.map((s) => Number(s[t.field])).filter((s) => !isNaN(s)));
    case "max":
      return i.length === 0 ? null : Math.max(...i.map((s) => Number(s[t.field])).filter((s) => !isNaN(s)));
    default:
      return null;
  }
}
h(Zt, "computeAggregation");
var j = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
};
const Xt = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
var de;
let O = (de = class extends We(C) {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "";
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), H("gouv-kpi");
  }
  _computeValue() {
    return !this._sourceData || !this.valeur ? null : Zt(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const e = this._computeValue();
    return typeof e != "number" ? "bleu" : Ui(e, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const e = Zt(this._sourceData, this.tendance);
    return typeof e != "number" ? null : {
      value: e,
      direction: e > 0 ? "up" : e < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const e = this._computeValue(), t = Jt(e, this.format);
    let i = `${this.label}: ${t}`;
    if (typeof e == "number" && (this.seuilVert !== void 0 || this.seuilOrange !== void 0)) {
      const r = this._getColor(), a = { vert: "bon", orange: "attention", rouge: "critique", bleu: "" }[r];
      a && (i += `, etat ${a}`);
    }
    return i;
  }
  render() {
    const e = this._computeValue(), t = Jt(e, this.format), i = Xt[this._getColor()] || Xt.bleu, r = this._getTendanceInfo();
    return d`
      <div
        class="gouv-kpi ${i}"
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
              ${r ? d`
                <span class="gouv-kpi__tendance gouv-kpi__tendance--${r.direction}" role="img" aria-label="${r.value > 0 ? `en hausse de ${Math.abs(r.value).toFixed(1)}%` : r.value < 0 ? `en baisse de ${Math.abs(r.value).toFixed(1)}%` : "stable"}">
                  ${r.direction === "up" ? "↑" : r.direction === "down" ? "↓" : "→"}
                  ${Math.abs(r.value).toFixed(1)}%
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
}, h(de, "GouvKpi"), de);
O.styles = ti``;
j([
  u({ type: String })
], O.prototype, "source", void 0);
j([
  u({ type: String })
], O.prototype, "valeur", void 0);
j([
  u({ type: String })
], O.prototype, "label", void 0);
j([
  u({ type: String })
], O.prototype, "description", void 0);
j([
  u({ type: String })
], O.prototype, "icone", void 0);
j([
  u({ type: String })
], O.prototype, "format", void 0);
j([
  u({ type: String })
], O.prototype, "tendance", void 0);
j([
  u({ type: Number, attribute: "seuil-vert" })
], O.prototype, "seuilVert", void 0);
j([
  u({ type: Number, attribute: "seuil-orange" })
], O.prototype, "seuilOrange", void 0);
j([
  u({ type: String })
], O.prototype, "couleur", void 0);
O = j([
  D("gouv-kpi")
], O);
var M = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, pe;
let k = (pe = class extends We(C) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this.urlSync = !1, this.urlPageParam = "page", this.serverTri = !1, this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._popstateHandler = null;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), H("gouv-datalist"), this._initSort(), this.urlSync && (this._applyUrlPage(), this._popstateHandler = () => {
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
    const t = this.source ? Ge(this.source) : void 0;
    t && t.total > 0 ? (this._serverPagination = !0, this._serverTotal = t.total, this._serverPageSize = t.pageSize, this._currentPage = t.page) : (this._serverPagination = !1, this._currentPage = 1);
  }
  // --- Parsing ---
  parseColumns() {
    return this.colonnes ? this.colonnes.split(",").map((e) => {
      const [t, i] = e.trim().split(":");
      return { key: t.trim(), label: (i == null ? void 0 : i.trim()) || t.trim() };
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
    return this._data.forEach((i) => {
      const r = i[e];
      r != null && t.add(String(r));
    }), Array.from(t).sort();
  }
  getFilteredData() {
    let e = [...this._data];
    if (this._searchQuery) {
      const t = this._searchQuery.toLowerCase();
      e = e.filter((i) => Object.values(i).some((r) => String(r).toLowerCase().includes(t)));
    }
    if (Object.entries(this._activeFilters).forEach(([t, i]) => {
      i && (e = e.filter((r) => String(r[t]) === i));
    }), this._sort && !this.serverTri) {
      const { key: t, direction: i } = this._sort;
      e.sort((r, s) => {
        const a = r[t], o = s[t];
        if (a === o)
          return 0;
        if (a == null)
          return 1;
        if (o == null)
          return -1;
        const l = typeof a == "number" && typeof o == "number" ? a - o : String(a).localeCompare(String(o), "fr");
        return i === "desc" ? -l : l;
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
      const i = parseInt(t, 10);
      !isNaN(i) && i >= 1 && (this._currentPage = i, this._serverPagination && this.source && J(this.source, { page: i }));
    }
  }
  /** Sync current page to URL via replaceState */
  _syncPageUrl() {
    const e = new URLSearchParams(window.location.search);
    this._currentPage > 1 ? e.set(this.urlPageParam, String(this._currentPage)) : e.delete(this.urlPageParam);
    const t = e.toString(), i = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", i);
  }
  _handleSearch(e) {
    this._searchQuery = e.target.value, this._currentPage = 1, this.urlSync && this._syncPageUrl();
  }
  _handleFilter(e, t) {
    this._activeFilters = { ...this._activeFilters, [e]: t.target.value }, this._currentPage = 1, this.urlSync && this._syncPageUrl();
  }
  _handleSort(e) {
    var t;
    ((t = this._sort) == null ? void 0 : t.key) === e ? this._sort = { key: e, direction: this._sort.direction === "asc" ? "desc" : "asc" } : this._sort = { key: e, direction: "asc" }, this.serverTri && this.source && J(this.source, {
      orderBy: `${this._sort.key}:${this._sort.direction}`
    });
  }
  _handlePageChange(e) {
    this._currentPage = e, this._serverPagination && this.source && J(this.source, { page: e }), this.urlSync && this._syncPageUrl();
  }
  // --- Export ---
  _exportCsv() {
    const e = this.parseColumns(), t = this.getFilteredData(), i = e.map((c) => c.label).join(";"), r = t.map((c) => e.map((p) => {
      const f = String(c[p.key] ?? "");
      return f.includes(";") || f.includes('"') ? `"${f.replace(/"/g, '""')}"` : f;
    }).join(";")), s = [i, ...r].join(`
`), a = new Blob([s], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(a), l = document.createElement("a");
    l.href = o, l.download = "export.csv", l.click(), URL.revokeObjectURL(o);
  }
  _exportHtml() {
    const e = this.parseColumns(), t = this.getFilteredData(), i = e.map((c) => `<th>${ct(c.label)}</th>`).join(""), r = t.map((c) => `<tr>${e.map((f) => {
      const g = c[f.key];
      return `<td>${g == null ? "" : ct(String(g))}</td>`;
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
<thead><tr>${i}</tr></thead>
<tbody>
${r}
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
        ${t.map((i) => {
      const r = e.find((o) => o.key === i), s = (r == null ? void 0 : r.label) || i, a = this._getUniqueValues(i);
      return d`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${i}">${s}</label>
              <select
                class="fr-select"
                id="filter-${i}"
                @change="${(o) => this._handleFilter(i, o)}"
              >
                <option value="">Tous</option>
                ${a.map((o) => d`
                  <option value="${o}" ?selected="${this._activeFilters[i] === o}">${o}</option>
                `)}
              </select>
            </div>
          `;
    })}
      </div>
    `;
  }
  _renderToolbar() {
    var t, i, r, s;
    const e = ((t = this.export) == null ? void 0 : t.includes("csv")) || ((i = this.export) == null ? void 0 : i.includes("html"));
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
          ${(r = this.export) != null && r.includes("csv") ? d`
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
              ${e.map((i) => {
      var l;
      const r = ((l = this._sort) == null ? void 0 : l.key) === i.key, s = r ? this._sort.direction : null, a = s === "asc" ? "ascending" : s === "desc" ? "descending" : "none", o = r ? `Trier par ${i.label}, actuellement tri ${s === "asc" ? "croissant" : "decroissant"}` : `Trier par ${i.label}`;
      return d`
                <th scope="col" aria-sort="${a}">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${() => this._handleSort(i.key)}"
                    aria-label="${o}"
                    type="button"
                  >
                    ${i.label}
                    ${r ? d`
                      <span aria-hidden="true">${s === "asc" ? "↑" : "↓"}</span>
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
            ` : t.map((i) => d`
              <tr>
                ${e.map((r) => d`
                  <td>${this.formatCellValue(i[r.key])}</td>
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
    for (let i = Math.max(1, this._currentPage - 2); i <= Math.min(e, this._currentPage + 2); i++)
      t.push(i);
    return d`
      <nav class="fr-pagination" aria-label="${this.getAttribute("aria-label") ? "Pagination - " + this.getAttribute("aria-label") : "Pagination"}">
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
          ${t.map((i) => d`
            <li>
              <button
                class="fr-pagination__link ${i === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(i)}"
                aria-current="${i === this._currentPage ? "page" : "false"}"
                aria-label="Page ${i}"
                type="button"
              >${i}</button>
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
  // --- Main render ---
  render() {
    const e = this.parseColumns(), t = this._getFilterableColumns(), i = this._getPaginatedData(), r = this._getTotalPages(), s = this._serverPagination ? this._serverTotal : this.getFilteredData().length;
    return d`
      <div class="gouv-datalist" role="region" aria-label="${this.getAttribute("aria-label") || "Liste de donnees"}">
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
          ${this._renderTable(e, i)}
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
    `;
  }
}, h(pe, "GouvDatalist"), pe);
k.styles = ti``;
M([
  u({ type: String })
], k.prototype, "source", void 0);
M([
  u({ type: String })
], k.prototype, "colonnes", void 0);
M([
  u({ type: Boolean })
], k.prototype, "recherche", void 0);
M([
  u({ type: String })
], k.prototype, "filtres", void 0);
M([
  u({ type: String })
], k.prototype, "tri", void 0);
M([
  u({ type: Number })
], k.prototype, "pagination", void 0);
M([
  u({ type: String })
], k.prototype, "export", void 0);
M([
  u({ type: Boolean, attribute: "url-sync" })
], k.prototype, "urlSync", void 0);
M([
  u({ type: String, attribute: "url-page-param" })
], k.prototype, "urlPageParam", void 0);
M([
  u({ type: Boolean, attribute: "server-tri" })
], k.prototype, "serverTri", void 0);
M([
  m()
], k.prototype, "_data", void 0);
M([
  m()
], k.prototype, "_searchQuery", void 0);
M([
  m()
], k.prototype, "_activeFilters", void 0);
M([
  m()
], k.prototype, "_sort", void 0);
M([
  m()
], k.prototype, "_currentPage", void 0);
M([
  m()
], k.prototype, "_serverPagination", void 0);
k = M([
  D("gouv-datalist")
], k);
var N = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, fe;
let T = (fe = class extends We(C) {
  constructor() {
    super(...arguments), this.source = "", this.cols = 1, this.pagination = 0, this.empty = "Aucun resultat", this.gap = "fr-grid-row--gutters", this.uidField = "", this.urlSync = !1, this.urlPageParam = "page", this._data = [], this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._templateContent = "", this._hashScrollDone = !1, this._popstateHandler = null;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), H("gouv-display"), this._captureTemplate(), this.urlSync && (this._applyUrlPage(), this._popstateHandler = () => {
      this._applyUrlPage(), this.requestUpdate();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [], this._hashScrollDone = !1;
    const t = this.source ? Ge(this.source) : void 0;
    t && t.total > 0 ? (this._serverPagination = !0, this._serverTotal = t.total, this._serverPageSize = t.pageSize, this._currentPage = t.page) : (this._serverPagination = !1, this._currentPage = 1);
  }
  updated(e) {
    if (super.updated(e), !this._hashScrollDone && this._data.length > 0 && window.location.hash) {
      this._hashScrollDone = !0;
      const t = window.location.hash.substring(1);
      requestAnimationFrame(() => {
        const i = this.querySelector(`#${CSS.escape(t)}`);
        i && i.scrollIntoView({ behavior: "smooth", block: "center" });
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
    let i = this._templateContent;
    return i = i.replace(/\{\{\{([^}]+)\}\}\}/g, (r, s) => this._resolveExpression(e, s.trim(), t)), i = i.replace(/\{\{([^}]+)\}\}/g, (r, s) => {
      const a = this._resolveExpression(e, s.trim(), t);
      return ct(a);
    }), i;
  }
  /** Resout une expression : champ, champ.nested, champ|defaut, $index, $uid */
  _resolveExpression(e, t, i) {
    if (t === "$index")
      return String(i);
    if (t === "$uid")
      return this._getItemUid(e, i);
    let r = t, s = "";
    const a = t.indexOf("|");
    a !== -1 && (r = t.substring(0, a).trim(), s = t.substring(a + 1).trim());
    const o = w(e, r);
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
      const i = parseInt(t, 10);
      !isNaN(i) && i >= 1 && (this._currentPage = i, this._serverPagination && this.source && J(this.source, { page: i }));
    }
  }
  /** Sync current page to URL via replaceState */
  _syncPageUrl() {
    const e = new URLSearchParams(window.location.search);
    this._currentPage > 1 ? e.set(this.urlPageParam, String(this._currentPage)) : e.delete(this.urlPageParam);
    const t = e.toString(), i = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", i);
  }
  _handlePageChange(e) {
    this._currentPage = e, this._serverPagination && this.source && J(this.source, { page: e }), this.urlSync && this._syncPageUrl();
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
      const i = w(e, this.uidField);
      if (i != null && i !== "")
        return `item-${String(i).replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    }
    return `item-${t}`;
  }
  _renderGrid(e) {
    const t = this._getColClass(), i = this.pagination > 0 ? (this._currentPage - 1) * this.pagination : 0, r = e.map((a, o) => {
      const l = i + o, c = this._renderItem(a, l), p = this._getItemUid(a, l);
      return `<div class="${t}" id="${p}">${c}</div>`;
    }).join(""), s = `<div class="fr-grid-row ${this.gap}">${r}</div>`;
    return d`<div .innerHTML="${s}"></div>`;
  }
  _renderPagination(e) {
    if (this.pagination <= 0 || e <= 1)
      return "";
    const t = [];
    for (let i = Math.max(1, this._currentPage - 2); i <= Math.min(e, this._currentPage + 2); i++)
      t.push(i);
    return d`
      <nav class="fr-pagination fr-mt-2w" aria-label="${this.getAttribute("aria-label") ? "Pagination - " + this.getAttribute("aria-label") : "Pagination"}">
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
          ${t.map((i) => d`
            <li>
              <button
                class="fr-pagination__link ${i === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(i)}"
                aria-current="${i === this._currentPage ? "page" : "false"}"
                aria-label="Page ${i}"
                type="button"
              >${i}</button>
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
    const e = this._getPaginatedData(), t = this._getTotalPages(), i = this._serverPagination ? this._serverTotal : this._data.length;
    return d`
      <div class="gouv-display" role="region" aria-label="${this.getAttribute("aria-label") || "Liste de resultats"}">
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
        ` : i === 0 ? d`
          <div class="gouv-display__empty" aria-live="polite">
            ${this.empty}
          </div>
        ` : d`
          <p class="fr-text--sm fr-mb-1w" aria-live="polite">
            ${i} resultat${i > 1 ? "s" : ""}
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
}, h(fe, "GouvDisplay"), fe);
N([
  u({ type: String })
], T.prototype, "source", void 0);
N([
  u({ type: Number })
], T.prototype, "cols", void 0);
N([
  u({ type: Number })
], T.prototype, "pagination", void 0);
N([
  u({ type: String })
], T.prototype, "empty", void 0);
N([
  u({ type: String })
], T.prototype, "gap", void 0);
N([
  u({ type: String, attribute: "uid-field" })
], T.prototype, "uidField", void 0);
N([
  u({ type: Boolean, attribute: "url-sync" })
], T.prototype, "urlSync", void 0);
N([
  u({ type: String, attribute: "url-page-param" })
], T.prototype, "urlPageParam", void 0);
N([
  m()
], T.prototype, "_data", void 0);
N([
  m()
], T.prototype, "_currentPage", void 0);
N([
  m()
], T.prototype, "_serverPagination", void 0);
T = N([
  D("gouv-display")
], T);
var x = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
};
const Ni = {
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
var ge;
let $ = (ge = class extends We(C) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.codeField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._data = [];
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), H("gouv-dsfr-chart", this.type);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [];
  }
  // --- Data processing ---
  _processData() {
    if (!this._data || this._data.length === 0)
      return { x: "[[]]", y: "[[]]", labels: [] };
    const e = [], t = [], i = [];
    for (const r of this._data)
      e.push(String(w(r, this.labelField) ?? "N/A")), t.push(Number(w(r, this.valueField)) || 0), this.valueField2 && i.push(Number(w(r, this.valueField2)) || 0);
    return {
      x: JSON.stringify([e]),
      y: JSON.stringify([t]),
      y2: this.valueField2 ? JSON.stringify([i]) : void 0,
      labels: e
    };
  }
  _processMapData() {
    if (!this._data || this._data.length === 0)
      return "{}";
    const e = this.codeField || this.labelField, t = {};
    for (const i of this._data) {
      let r = String(w(i, e) ?? "").trim();
      /^\d+$/.test(r) && r.length < 3 && (r = r.padStart(2, "0"));
      const s = Number(w(i, this.valueField)) || 0;
      (this.type === "map" ? ki(r) : r !== "") && (t[r] = Math.round(s * 100) / 100);
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
    const { x: e, y: t, y2: i, labels: r } = this._processData(), s = {}, a = {};
    switch (this.type) {
      case "gauge": {
        const o = this.gaugeValue ?? (this._data.length > 0 && Number(w(this._data[0], this.valueField)) || 0);
        s.percent = String(Math.round(o)), s.init = "0", s.target = "100";
        break;
      }
      case "pie":
        s.x = e, s.y = t, !this.name && r.length > 0 && (s.name = JSON.stringify(r));
        break;
      case "bar-line":
        s.x = e, s["y-bar"] = t, s["y-line"] = i || t, this.unitTooltipBar && (s["unit-tooltip-bar"] = this.unitTooltipBar);
        break;
      case "map":
      case "map-reg": {
        if (s.data = this._processMapData(), this._data.length > 0) {
          let o = 0, l = 0;
          for (const c of this._data) {
            const p = Number(w(c, this.valueField));
            isNaN(p) || (o += p, l++);
          }
          if (l > 0) {
            const c = Math.round(o / l * 100) / 100;
            a.value = String(c);
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
    }[this.type] || this.type, i = this._data.length;
    return `Graphique ${t}, ${i} valeurs`;
  }
  _createChartElement(e, t, i = {}) {
    const r = document.createElement(e);
    for (const [a, o] of Object.entries(t))
      o !== void 0 && o !== "" && r.setAttribute(a, o);
    Object.keys(i).length > 0 && setTimeout(() => {
      for (const [a, o] of Object.entries(i))
        r.setAttribute(a, o);
    }, 500);
    const s = document.createElement("div");
    return s.className = "gouv-dsfr-chart__wrapper", s.setAttribute("role", "img"), s.setAttribute("aria-label", this._getAriaLabel()), s.appendChild(r), s;
  }
  _renderChart() {
    const e = Ni[this.type];
    if (!e)
      return d`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const { attrs: t, deferred: i } = this._getTypeSpecificAttributes(), r = {
      ...this._getCommonAttributes(),
      ...t
    }, s = this._createChartElement(e, r, i), a = this.querySelector(".gouv-dsfr-chart__wrapper");
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
}, h(ge, "GouvDsfrChart"), ge);
x([
  u({ type: String })
], $.prototype, "source", void 0);
x([
  u({ type: String })
], $.prototype, "type", void 0);
x([
  u({ type: String, attribute: "label-field" })
], $.prototype, "labelField", void 0);
x([
  u({ type: String, attribute: "code-field" })
], $.prototype, "codeField", void 0);
x([
  u({ type: String, attribute: "value-field" })
], $.prototype, "valueField", void 0);
x([
  u({ type: String, attribute: "value-field-2" })
], $.prototype, "valueField2", void 0);
x([
  u({ type: String })
], $.prototype, "name", void 0);
x([
  u({ type: String, attribute: "selected-palette" })
], $.prototype, "selectedPalette", void 0);
x([
  u({ type: String, attribute: "unit-tooltip" })
], $.prototype, "unitTooltip", void 0);
x([
  u({ type: String, attribute: "unit-tooltip-bar" })
], $.prototype, "unitTooltipBar", void 0);
x([
  u({ type: Boolean })
], $.prototype, "horizontal", void 0);
x([
  u({ type: Boolean })
], $.prototype, "stacked", void 0);
x([
  u({ type: Boolean })
], $.prototype, "fill", void 0);
x([
  u({ type: String, attribute: "highlight-index" })
], $.prototype, "highlightIndex", void 0);
x([
  u({ type: String, attribute: "x-min" })
], $.prototype, "xMin", void 0);
x([
  u({ type: String, attribute: "x-max" })
], $.prototype, "xMax", void 0);
x([
  u({ type: String, attribute: "y-min" })
], $.prototype, "yMin", void 0);
x([
  u({ type: String, attribute: "y-max" })
], $.prototype, "yMax", void 0);
x([
  u({ type: Number, attribute: "gauge-value" })
], $.prototype, "gaugeValue", void 0);
x([
  u({ type: String, attribute: "map-highlight" })
], $.prototype, "mapHighlight", void 0);
x([
  m()
], $.prototype, "_data", void 0);
$ = x([
  D("gouv-dsfr-chart")
], $);
var Qe = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, _e;
let Oe = (_e = class extends C {
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
                        Favoris${this._favCount > 0 ? d` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>` : b}
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
}, h(_e, "AppHeader"), _e);
Qe([
  u({ type: String, attribute: "current-page" })
], Oe.prototype, "currentPage", void 0);
Qe([
  u({ type: String, attribute: "base-path" })
], Oe.prototype, "basePath", void 0);
Qe([
  m()
], Oe.prototype, "_favCount", void 0);
Oe = Qe([
  D("app-header")
], Oe);
var li = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, be;
let pt = (be = class extends C {
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
}, h(be, "AppFooter"), be);
li([
  u({ type: String, attribute: "base-path" })
], pt.prototype, "basePath", void 0);
pt = li([
  D("app-footer")
], pt);
var Ce = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, me;
let te = (me = class extends C {
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
    e && t && (this._leftContent.forEach((i) => e.appendChild(i)), this._rightContent.forEach((i) => t.appendChild(i)), this._contentMoved = !0);
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
    const i = t.getBoundingClientRect(), r = i.width;
    let s = e.clientX - i.left;
    s = Math.max(this.minLeftWidth, Math.min(s, r - this.minRightWidth)), this._currentLeftRatio = s / r * 100, this.requestUpdate();
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
}, h(me, "AppLayoutBuilder"), me);
Ce([
  u({ type: Number, attribute: "left-ratio" })
], te.prototype, "leftRatio", void 0);
Ce([
  u({ type: Number, attribute: "min-left-width" })
], te.prototype, "minLeftWidth", void 0);
Ce([
  u({ type: Number, attribute: "min-right-width" })
], te.prototype, "minRightWidth", void 0);
Ce([
  m()
], te.prototype, "_isResizing", void 0);
Ce([
  m()
], te.prototype, "_currentLeftRatio", void 0);
te = Ce([
  D("app-layout-builder")
], te);
var Le = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, ve;
let xe = (ve = class extends C {
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
    const t = this._isActive(e.id), i = this._isParentActive(e);
    if (e.children) {
      const r = `fr-sidemenu-${e.id}`, s = i;
      return d`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${s}"
                  aria-controls="${r}">
            ${e.label}
          </button>
          <div class="fr-collapse ${s ? "fr-collapse--expanded" : ""}" id="${r}">
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
      const i = e[0] === "components" ? "Composants gouv-widgets" : "Composants dsfr-charts";
      t.push({ label: i, href: "#" });
    }
    return t.push({ label: this.title, href: "" }), d`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((i, r) => d`
              <li>
                ${r === t.length - 1 ? d`<a class="fr-breadcrumb__link" aria-current="page">${i.label}</a>` : d`<a class="fr-breadcrumb__link" href="${i.href}">${i.label}</a>`}
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
}, h(ve, "AppLayoutDemo"), ve);
Le([
  u({ type: String })
], xe.prototype, "title", void 0);
Le([
  u({ type: String })
], xe.prototype, "icon", void 0);
Le([
  u({ type: String, attribute: "active-path" })
], xe.prototype, "activePath", void 0);
Le([
  u({ type: String, attribute: "base-path" })
], xe.prototype, "basePath", void 0);
xe = Le([
  D("app-layout-demo")
], xe);
var ie = function(n, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, i);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (r < 3 ? a(s) : r > 3 ? a(e, t, s) : a(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, ye;
let K = (ye = class extends C {
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
    const e = this.querySelector("#tab-preview"), t = this.querySelector("#tab-code"), i = this.querySelector("#tab-data");
    e && this._previewContent.forEach((r) => e.appendChild(r)), t && this._codeContent.forEach((r) => t.appendChild(r)), i && this._dataContent.forEach((r) => i.appendChild(r)), this._contentMoved = !0;
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
    const e = this._getTabLabels(), [t, i, r] = e;
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
            ${i || "Code"}
          </button>
          ${this.showDataTab ? d`
            <button
              class="preview-panel-tab ${this._activeTab === "data" ? "active" : ""}"
              data-tab="data"
              @click="${() => this._handleTabClick("data")}">
              ${r || "Données"}
            </button>
          ` : b}
          ${this.showPlaygroundButton ? d`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          ` : b}
          ${this.showSaveButton ? d`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          ` : b}
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
}, h(ye, "AppPreviewPanel"), ye);
ie([
  u({ type: Boolean, attribute: "show-data-tab" })
], K.prototype, "showDataTab", void 0);
ie([
  u({ type: Boolean, attribute: "show-save-button" })
], K.prototype, "showSaveButton", void 0);
ie([
  u({ type: Boolean, attribute: "show-playground-button" })
], K.prototype, "showPlaygroundButton", void 0);
ie([
  u({ type: String, attribute: "tab-labels" })
], K.prototype, "tabLabels", void 0);
ie([
  u({ type: String, attribute: "active-tab" })
], K.prototype, "activeTab", void 0);
ie([
  m()
], K.prototype, "_activeTab", void 0);
K = ie([
  D("app-preview-panel")
], K);
function zi(n, e, t) {
  return n.map((i) => ({
    label: String(w(i, e) ?? "N/A"),
    value: Number(w(i, t)) || 0
  }));
}
h(zi, "extractLabelValues");
function ji(n, e) {
  if (e === "none")
    return n;
  const t = /* @__PURE__ */ new Map();
  for (const r of n) {
    const s = t.get(r.label) || [];
    s.push(r.value), t.set(r.label, s);
  }
  const i = [];
  for (const [r, s] of t)
    i.push({ label: r, value: Bi(s, e) });
  return i;
}
h(ji, "aggregateByLabel");
function Bi(n, e) {
  switch (e) {
    case "sum":
      return n.reduce((t, i) => t + i, 0);
    case "avg":
      return n.reduce((t, i) => t + i, 0) / n.length;
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
h(Bi, "computeGroupValue");
function qi(n, e) {
  return e === "none" ? n : [...n].sort((t, i) => e === "desc" ? i.value - t.value : t.value - i.value);
}
h(qi, "sortByValue");
function Qi(n, e, t, i = "none", r = "none", s = 0) {
  if (!n || n.length === 0)
    return { labels: [], values: [] };
  let a = zi(n, e, t);
  return a = ji(a, i), a = qi(a, r), s > 0 && (a = a.slice(0, s)), {
    labels: a.map((o) => o.label),
    values: a.map((o) => Math.round(o.value * 100) / 100)
  };
}
h(Qi, "processChartData");
export {
  pt as AppFooter,
  Oe as AppHeader,
  te as AppLayoutBuilder,
  xe as AppLayoutDemo,
  U as DATA_EVENTS,
  k as GouvDatalist,
  T as GouvDisplay,
  $ as GouvDsfrChart,
  y as GouvFacets,
  O as GouvKpi,
  z as GouvNormalize,
  v as GouvQuery,
  A as GouvSearch,
  F as GouvSource,
  We as SourceSubscriberMixin,
  ji as aggregateByLabel,
  Zt as computeAggregation,
  W as dispatchDataError,
  q as dispatchDataLoaded,
  Q as dispatchDataLoading,
  zi as extractLabelValues,
  Oi as formatCurrency,
  Wi as formatDate,
  Kt as formatNumber,
  Fi as formatPercentage,
  Jt as formatValue,
  rt as getAdapter,
  w as getByPath,
  Vi as getByPathOrDefault,
  Pe as getDataCache,
  Hi as hasPath,
  Li as parseExpression,
  Qi as processChartData,
  Gi as registerAdapter,
  qi as sortByValue,
  Ue as subscribeToSource
};
