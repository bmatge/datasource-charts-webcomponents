var Rt = Object.defineProperty;
var c = (s, e) => Rt(s, "name", { value: e, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = globalThis, qe = Se.ShadowRoot && (Se.ShadyCSS === void 0 || Se.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, He = Symbol(), nt = /* @__PURE__ */ new WeakMap();
var W;
let xt = (W = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== He) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (qe && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = nt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && nt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}, c(W, "n"), W);
const Mt = /* @__PURE__ */ c((s) => new xt(typeof s == "string" ? s : s + "", void 0, He), "r$4"), St = /* @__PURE__ */ c((s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1], s[0]);
  return new xt(t, s, He);
}, "i$3"), Nt = /* @__PURE__ */ c((s, e) => {
  if (qe) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = Se.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, s.appendChild(i);
  }
}, "S$1"), st = qe ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Mt(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ot, defineProperty: Dt, getOwnPropertyDescriptor: Tt, getOwnPropertyNames: Lt, getOwnPropertySymbols: Ut, getPrototypeOf: Ft } = Object, L = globalThis, ot = L.trustedTypes, zt = ot ? ot.emptyScript : "", Me = L.reactiveElementPolyfillSupport, pe = /* @__PURE__ */ c((s, e) => s, "d$1"), Ae = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? zt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ve = /* @__PURE__ */ c((s, e) => !Ot(s, e), "f$1"), at = { attribute: !0, type: String, converter: Ae, reflect: !1, useDefault: !1, hasChanged: Ve };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), L.litPropertyMetadata ?? (L.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var J;
let H = (J = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = at) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && Dt(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: n } = Tt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: r, set(o) {
      const a = r == null ? void 0 : r.call(this);
      n == null || n.call(this, o), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pe("elementProperties"))) return;
    const e = Ft(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pe("properties"))) {
      const t = this.properties, i = [...Lt(t), ...Ut(t)];
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
      for (const r of i) t.unshift(st(r));
    } else e !== void 0 && t.push(st(e));
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
    return Nt(e, this.constructor.elementStyles), e;
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
    var n;
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) == null ? void 0 : n.toAttribute) !== void 0 ? i.converter : Ae).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, o;
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : Ae;
      this._$Em = r;
      const p = l.fromAttribute(t, a.type);
      this[r] = p ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, n) {
    var o;
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[e]), i ?? (i = a.getPropertyOptions(e)), !((i.hasChanged ?? Ve)(n, t) || i.useDefault && i.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: n }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, o] of r) {
        const { wrapped: a } = o, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((r) => {
        var n;
        return (n = r.hostUpdate) == null ? void 0 : n.call(r);
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
}, c(J, "y"), J);
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[pe("elementProperties")] = /* @__PURE__ */ new Map(), H[pe("finalized")] = /* @__PURE__ */ new Map(), Me == null || Me({ ReactiveElement: H }), (L.reactiveElementVersions ?? (L.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis, lt = /* @__PURE__ */ c((s) => s, "i$1"), Ce = fe.trustedTypes, ct = Ce ? Ce.createPolicy("lit-html", { createHTML: /* @__PURE__ */ c((s) => s, "createHTML") }) : void 0, At = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, Ct = "?" + T, jt = `<${Ct}>`, B = document, me = /* @__PURE__ */ c(() => B.createComment(""), "c"), be = /* @__PURE__ */ c((s) => s === null || typeof s != "object" && typeof s != "function", "a"), Ge = Array.isArray, Bt = /* @__PURE__ */ c((s) => Ge(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", "d"), Ne = `[ 	
\f\r]`, he = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ut = /-->/g, dt = />/g, F = RegExp(`>|${Ne}(?:([^\\s"'>=/]+)(${Ne}*=${Ne}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, pt = /"/g, Pt = /^(?:script|style|textarea|title)$/i, It = /* @__PURE__ */ c((s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), "x"), d = It(1), oe = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), z = B.createTreeWalker(B, 129);
function Et(s, e) {
  if (!Ge(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ct !== void 0 ? ct.createHTML(e) : e;
}
c(Et, "V");
const qt = /* @__PURE__ */ c((s, e) => {
  const t = s.length - 1, i = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = he;
  for (let a = 0; a < t; a++) {
    const l = s[a];
    let p, f, h = -1, $ = 0;
    for (; $ < l.length && (o.lastIndex = $, f = o.exec(l), f !== null); ) $ = o.lastIndex, o === he ? f[1] === "!--" ? o = ut : f[1] !== void 0 ? o = dt : f[2] !== void 0 ? (Pt.test(f[2]) && (r = RegExp("</" + f[2], "g")), o = F) : f[3] !== void 0 && (o = F) : o === F ? f[0] === ">" ? (o = r ?? he, h = -1) : f[1] === void 0 ? h = -2 : (h = o.lastIndex - f[2].length, p = f[1], o = f[3] === void 0 ? F : f[3] === '"' ? pt : ht) : o === pt || o === ht ? o = F : o === ut || o === dt ? o = he : (o = F, r = void 0);
    const D = o === F && s[a + 1].startsWith("/>") ? " " : "";
    n += o === he ? l + jt : h >= 0 ? (i.push(p), l.slice(0, h) + At + l.slice(h) + T + D) : l + T + (h === -2 ? a : D);
  }
  return [Et(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
}, "N"), Ee = class Ee {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const a = e.length - 1, l = this.parts, [p, f] = qt(e, t);
    if (this.el = Ee.createElement(p, i), z.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = z.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(At)) {
          const $ = f[o++], D = r.getAttribute(h).split(T), we = /([.?@])?(.*)/.exec($);
          l.push({ type: 1, index: n, name: we[2], strings: D, ctor: we[1] === "." ? Fe : we[1] === "?" ? ze : we[1] === "@" ? je : le }), r.removeAttribute(h);
        } else h.startsWith(T) && (l.push({ type: 6, index: n }), r.removeAttribute(h));
        if (Pt.test(r.tagName)) {
          const h = r.textContent.split(T), $ = h.length - 1;
          if ($ > 0) {
            r.textContent = Ce ? Ce.emptyScript : "";
            for (let D = 0; D < $; D++) r.append(h[D], me()), z.nextNode(), l.push({ type: 2, index: ++n });
            r.append(h[$], me());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ct) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(T, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += T.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = B.createElement("template");
    return i.innerHTML = e, i;
  }
};
c(Ee, "S");
let _e = Ee;
function ae(s, e, t = s, i) {
  var o, a;
  if (e === oe) return e;
  let r = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const n = be(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== n && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), n === void 0 ? r = void 0 : (r = new n(s), r._$AT(s, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = r : t._$Cl = r), r !== void 0 && (e = ae(s, r._$AS(s, e.values), r, i)), e;
}
c(ae, "M");
const Xe = class Xe {
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
    const { el: { content: t }, parts: i } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? B).importNode(t, !0);
    z.currentNode = r;
    let n = z.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let p;
        l.type === 2 ? p = new ve(n, n.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (p = new Be(n, this, e)), this._$AV.push(p), l = i[++a];
      }
      o !== (l == null ? void 0 : l.index) && (n = z.nextNode(), o++);
    }
    return z.currentNode = B, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
};
c(Xe, "R");
let Ue = Xe;
const ke = class ke {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = ae(this, e, t), be(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== oe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Bt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && be(this._$AH) ? this._$AA.nextSibling.data = e : this.T(B.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = _e.createElement(Et(i.h, i.h[0]), this.options)), i);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === r) this._$AH.p(t);
    else {
      const o = new Ue(r, this), a = o.u(this.options);
      o.p(t), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = ft.get(e.strings);
    return t === void 0 && ft.set(e.strings, t = new _e(e)), t;
  }
  k(e) {
    Ge(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const n of e) r === t.length ? t.push(i = new ke(this.O(me()), this.O(me()), this, this.options)) : i = t[r], i._$AI(n), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = lt(e).nextSibling;
      lt(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
};
c(ke, "k");
let ve = ke;
const Ye = class Ye {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, n) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(e, t = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = ae(this, e, t, 0), o = !be(e) || e !== this._$AH && e !== oe, o && (this._$AH = e);
    else {
      const a = e;
      let l, p;
      for (e = n[0], l = 0; l < n.length - 1; l++) p = ae(this, a[i + l], t, l), p === oe && (p = this._$AH[l]), o || (o = !be(p) || p !== this._$AH[l]), p === m ? e = m : e !== m && (e += (p ?? "") + n[l + 1]), this._$AH[l] = p;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
c(Ye, "H");
let le = Ye;
const Ze = class Ze extends le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
};
c(Ze, "I");
let Fe = Ze;
const et = class et extends le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
};
c(et, "L");
let ze = et;
const tt = class tt extends le {
  constructor(e, t, i, r, n) {
    super(e, t, i, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ae(this, e, t, 0) ?? m) === oe) return;
    const i = this._$AH, r = e === m && i !== m || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== m && (i === m || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
};
c(tt, "z");
let je = tt;
const rt = class rt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ae(this, e);
  }
};
c(rt, "Z");
let Be = rt;
const Oe = fe.litHtmlPolyfillSupport;
Oe == null || Oe(_e, ve), (fe.litHtmlVersions ?? (fe.litHtmlVersions = [])).push("3.3.2");
const Ht = /* @__PURE__ */ c((s, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = r = new ve(e.insertBefore(me(), n), n, void 0, t ?? {});
  }
  return r._$AI(s), r;
}, "D");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, it = class it extends H {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ht(t, this.renderRoot, this.renderOptions);
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
    return oe;
  }
};
c(it, "i");
let w = it;
var wt;
w._$litElement$ = !0, w.finalized = !0, (wt = j.litElementHydrateSupport) == null || wt.call(j, { LitElement: w });
const De = j.litElementPolyfillSupport;
De == null || De({ LitElement: w });
(j.litElementVersions ?? (j.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = /* @__PURE__ */ c((s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
}, "t");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vt = { attribute: !0, type: String, converter: Ae, reflect: !1, hasChanged: Ve }, Gt = /* @__PURE__ */ c((s = Vt, e, t) => {
  const { kind: i, metadata: r } = t;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), i === "accessor") {
    const { name: o } = t;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = t;
    return function(a) {
      const l = this[o];
      e.call(this, a), this.requestUpdate(o, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
}, "r$1");
function u(s) {
  return (e, t) => typeof t == "object" ? Gt(s, e, t) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(s, e, t);
}
c(u, "n");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(s) {
  return u({ ...s, state: !0, attribute: !1 });
}
c(x, "r");
function v(s, e) {
  if (!e || e.trim() === "")
    return s;
  const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let r = s;
  for (const n of i) {
    if (r == null || typeof r != "object")
      return;
    r = r[n];
  }
  return r;
}
c(v, "getByPath");
function hr(s, e) {
  return v(s, e) !== void 0;
}
c(hr, "hasPath");
function gt(s, e, t) {
  const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let n = s;
  for (let o = 0; o < r.length - 1; o++) {
    const a = r[o];
    (!(a in n) || typeof n[a] != "object" || n[a] === null) && (n[a] = {}), n = n[a];
  }
  n[r[r.length - 1]] = t;
}
c(gt, "setByPath");
function pr(s, e, t) {
  const i = v(s, e);
  return i !== void 0 ? i : t;
}
c(pr, "getByPathOrDefault");
const Wt = "https://chartsbuilder.matge.com/beacon", mt = /* @__PURE__ */ new Set();
function ue(s, e) {
  const t = `${s}:${e || ""}`;
  if (mt.has(t) || (mt.add(t), typeof window > "u"))
    return;
  const i = window.location.hostname;
  if (i === "localhost" || i === "127.0.0.1" || i === "chartsbuilder.matge.com")
    return;
  const r = new URLSearchParams();
  r.set("c", s), e && r.set("t", e);
  const n = `${Wt}?${r.toString()}`;
  try {
    fetch(n, { method: "GET", keepalive: !0, mode: "no-cors" }).catch(() => {
    });
  } catch {
  }
}
c(ue, "sendWidgetBeacon");
function bt(s, e = !1) {
  if (typeof s == "number")
    return isNaN(s) ? e ? null : 0 : s;
  if (typeof s != "string")
    return e ? null : 0;
  let t = s.trim();
  if (t === "")
    return e ? null : 0;
  t = t.replace(/\s/g, "");
  const i = t.includes(","), r = t.includes(".");
  if (i && r) {
    const o = t.lastIndexOf(","), a = t.lastIndexOf(".");
    o > a ? t = t.replace(/\./g, "").replace(",", ".") : t = t.replace(/,/g, "");
  } else i && (t = t.replace(",", "."));
  const n = parseFloat(t);
  return isNaN(n) ? e ? null : 0 : n;
}
c(bt, "toNumber");
function Jt(s) {
  if (typeof s != "string")
    return !1;
  const e = s.trim();
  return e === "" ? !1 : /^-?[\d\s]+([.,]\d+)?$/.test(e);
}
c(Jt, "looksLikeNumber");
function Kt(s) {
  return !s || typeof s != "string" || ["N/A", "null", "undefined", "00", ""].includes(s) ? !1 : !!(s === "2A" || s === "2B" || /^97[1-6]$/.test(s) || /^(0[1-9]|[1-8]\d|9[0-5])$/.test(s));
}
c(Kt, "isValidDeptCode");
const Te = {
  baseUrl: "https://chartsbuilder.matge.com",
  endpoints: {
    grist: "/grist-proxy",
    gristGouv: "/grist-gouv-proxy",
    albert: "/albert-proxy",
    tabular: "/tabular-proxy"
  }
};
function Qt() {
  return typeof window < "u" && window.location.hostname === "localhost" && window.location.port === "5173";
}
c(Qt, "isViteDevMode");
function Xt() {
  return typeof window < "u" && "__TAURI__" in window;
}
c(Xt, "isTauriMode");
function Yt() {
  var i;
  const s = { ...Te.endpoints };
  return Qt() ? { baseUrl: "", endpoints: s } : Xt() ? { baseUrl: Te.baseUrl, endpoints: s } : {
    baseUrl: ((i = import.meta.env) == null ? void 0 : i.VITE_PROXY_URL) || Te.baseUrl,
    endpoints: s
  };
}
c(Yt, "getProxyConfig");
function Zt(s) {
  return typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && s.includes("tabular-api.data.gouv.fr") ? s.replace("https://tabular-api.data.gouv.fr", "/tabular-proxy") : s;
}
c(Zt, "getProxiedUrl");
const N = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading"
}, We = /* @__PURE__ */ new Map();
function er(s, e) {
  We.set(s, e);
}
c(er, "setDataCache");
function Pe(s) {
  return We.get(s);
}
c(Pe, "getDataCache");
function Je(s) {
  We.delete(s);
}
c(Je, "clearDataCache");
function ge(s, e) {
  er(s, e);
  const t = new CustomEvent(N.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, data: e }
  });
  document.dispatchEvent(t);
}
c(ge, "dispatchDataLoaded");
function V(s, e) {
  const t = new CustomEvent(N.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, error: e }
  });
  document.dispatchEvent(t);
}
c(V, "dispatchDataError");
function G(s) {
  const e = new CustomEvent(N.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s }
  });
  document.dispatchEvent(e);
}
c(G, "dispatchDataLoading");
function Ke(s, e) {
  const t = /* @__PURE__ */ c((n) => {
    const o = n;
    o.detail.sourceId === s && e.onLoaded && e.onLoaded(o.detail.data);
  }, "handleLoaded"), i = /* @__PURE__ */ c((n) => {
    const o = n;
    o.detail.sourceId === s && e.onError && e.onError(o.detail.error);
  }, "handleError"), r = /* @__PURE__ */ c((n) => {
    n.detail.sourceId === s && e.onLoading && e.onLoading();
  }, "handleLoading");
  return document.addEventListener(N.LOADED, t), document.addEventListener(N.ERROR, i), document.addEventListener(N.LOADING, r), () => {
    document.removeEventListener(N.LOADED, t), document.removeEventListener(N.ERROR, i), document.removeEventListener(N.LOADING, r);
  };
}
c(Ke, "subscribeToSource");
var M = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, K;
let P = (K = class extends w {
  constructor() {
    super(...arguments), this.url = "", this.method = "GET", this.headers = "", this.params = "", this.refresh = 0, this.transform = "", this._loading = !1, this._error = null, this._data = null, this._refreshInterval = null, this._abortController = null;
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return d``;
  }
  connectedCallback() {
    super.connectedCallback(), ue("gouv-source"), this._setupRefresh();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && Je(this.id);
  }
  updated(e) {
    (e.has("url") || e.has("params") || e.has("transform")) && this._fetchData(), e.has("refresh") && this._setupRefresh();
  }
  _cleanup() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = null), this._abortController && (this._abortController.abort(), this._abortController = null);
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
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, G(this.id);
      try {
        const e = Zt(this._buildUrl()), t = this._buildFetchOptions(), i = await fetch(e, {
          ...t,
          signal: this._abortController.signal
        });
        if (!i.ok)
          throw new Error(`HTTP ${i.status}: ${i.statusText}`);
        const r = await i.json();
        this._data = this.transform ? v(r, this.transform) : r, ge(this.id, this._data);
      } catch (e) {
        if (e.name === "AbortError")
          return;
        this._error = e, V(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, e);
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
        Object.entries(i).forEach(([r, n]) => {
          t.searchParams.set(r, String(n));
        });
      } catch (i) {
        console.warn("gouv-source: params invalides (JSON attendu)", i);
      }
    return t.toString();
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
}, c(K, "GouvSource"), K);
M([
  u({ type: String })
], P.prototype, "url", void 0);
M([
  u({ type: String })
], P.prototype, "method", void 0);
M([
  u({ type: String })
], P.prototype, "headers", void 0);
M([
  u({ type: String })
], P.prototype, "params", void 0);
M([
  u({ type: Number })
], P.prototype, "refresh", void 0);
M([
  u({ type: String })
], P.prototype, "transform", void 0);
M([
  x()
], P.prototype, "_loading", void 0);
M([
  x()
], P.prototype, "_error", void 0);
M([
  x()
], P.prototype, "_data", void 0);
P = M([
  E("gouv-source")
], P);
var y = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
};
const xe = 100, Le = 10;
var Q;
let _ = (Q = class extends w {
  constructor() {
    super(...arguments), this.apiType = "generic", this.source = "", this.baseUrl = "", this.datasetId = "", this.resource = "", this.select = "", this.where = "", this.filter = "", this.groupBy = "", this.aggregate = "", this.orderBy = "", this.limit = 0, this.transform = "", this.refresh = 0, this._loading = !1, this._error = null, this._data = [], this._rawData = [], this._refreshInterval = null, this._abortController = null, this._unsubscribe = null;
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return d``;
  }
  connectedCallback() {
    super.connectedCallback(), ue("gouv-query", this.apiType), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && Je(this.id);
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
      "transform"
    ].some((i) => e.has(i)) && this._initialize(), e.has("refresh") && this._setupRefresh();
  }
  _cleanup() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = null), this._abortController && (this._abortController.abort(), this._abortController = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null);
  }
  _setupRefresh() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = null), this.refresh > 0 && (this._refreshInterval = window.setInterval(() => {
      this._initialize();
    }, this.refresh * 1e3));
  }
  _initialize() {
    if (!this.id) {
      console.warn('gouv-query: attribut "id" requis pour identifier la requête');
      return;
    }
    this.apiType === "generic" ? this._subscribeToSource() : this._fetchFromApi();
  }
  /**
   * Mode generic: s'abonne à une source et traite les données côté client
   */
  _subscribeToSource() {
    if (!this.source) {
      console.warn('gouv-query: attribut "source" requis en mode generic');
      return;
    }
    this._unsubscribe && this._unsubscribe();
    const e = Pe(this.source);
    e !== void 0 && (this._rawData = Array.isArray(e) ? e : [e], this._processClientSide()), this._unsubscribe = Ke(this.source, {
      onLoaded: /* @__PURE__ */ c((t) => {
        this._rawData = Array.isArray(t) ? t : [t], this._processClientSide();
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ c(() => {
        this._loading = !0, G(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ c((t) => {
        this._error = t, this._loading = !1, V(this.id, t);
      }, "onError")
    });
  }
  /**
   * Traitement côté client des données
   */
  _processClientSide() {
    try {
      G(this.id), this._loading = !0;
      let e = [...this._rawData];
      const t = this.filter || this.where;
      t && (e = this._applyFilters(e, t)), this.groupBy && (e = this._applyGroupByAndAggregate(e)), this.orderBy && (e = this._applySort(e)), this.limit > 0 && (e = e.slice(0, this.limit)), this._data = e, ge(this.id, this._data);
    } catch (e) {
      this._error = e, V(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de traitement`, e);
    } finally {
      this._loading = !1;
    }
  }
  /**
   * Parse et applique les filtres (format: "field:operator:value")
   */
  _applyFilters(e, t) {
    const i = this._parseFilters(t);
    return e.filter((r) => i.every((n) => this._matchesFilter(r, n)));
  }
  _parseFilters(e) {
    const t = [], i = e.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const n = r.split(":");
      if (n.length >= 2) {
        const o = n[0], a = n[1];
        let l;
        if (n.length > 2) {
          const p = n.slice(2).join(":");
          a === "in" || a === "notin" ? l = p.split("|").map((f) => {
            const h = this._parseValue(f);
            return typeof h == "boolean" ? String(h) : h;
          }) : l = this._parseValue(p);
        }
        t.push({ field: o, operator: a, value: l });
      }
    }
    return t;
  }
  _parseValue(e) {
    return e === "true" ? !0 : e === "false" ? !1 : !isNaN(Number(e)) && e !== "" ? Number(e) : e;
  }
  _matchesFilter(e, t) {
    const i = v(e, t.field);
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
   * Applique le GROUP BY et les agrégations
   */
  _applyGroupByAndAggregate(e) {
    const t = this.groupBy.split(",").map((o) => o.trim()).filter(Boolean), i = this._parseAggregates(this.aggregate), r = /* @__PURE__ */ new Map();
    for (const o of e) {
      const a = t.map((l) => String(v(o, l) ?? "")).join("|||");
      r.has(a) || r.set(a, []), r.get(a).push(o);
    }
    const n = [];
    for (const [o, a] of r) {
      const l = {}, p = o.split("|||");
      t.forEach((f, h) => {
        gt(l, f, p[h]);
      });
      for (const f of i) {
        const h = f.alias || `${f.field}__${f.function}`;
        gt(l, h, this._computeAggregate(a, f));
      }
      n.push(l);
    }
    return n;
  }
  _parseAggregates(e) {
    if (!e)
      return [];
    const t = [], i = e.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const n = r.split(":");
      n.length >= 2 && t.push({
        field: n[0],
        function: n[1],
        alias: n[2]
      });
    }
    return t;
  }
  _computeAggregate(e, t) {
    const i = e.map((r) => Number(v(r, t.field))).filter((r) => !isNaN(r));
    switch (t.function) {
      case "count":
        return e.length;
      case "sum":
        return i.reduce((r, n) => r + n, 0);
      case "avg":
        return i.length > 0 ? i.reduce((r, n) => r + n, 0) / i.length : 0;
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
    return [...e].sort((n, o) => {
      const a = v(n, i), l = v(o, i), p = Number(a), f = Number(l);
      if (!isNaN(p) && !isNaN(f))
        return r === "desc" ? f - p : p - f;
      const h = String(a ?? ""), $ = String(l ?? "");
      return r === "desc" ? $.localeCompare(h) : h.localeCompare($);
    });
  }
  /**
   * Mode API: fait une requête directe à l'API
   */
  async _fetchFromApi() {
    if (!this.datasetId) {
      console.warn('gouv-query: attribut "dataset" requis pour les requêtes API');
      return;
    }
    this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, G(this.id);
    try {
      this.apiType === "opendatasoft" ? await this._fetchFromOdsWithPagination() : await this._fetchSinglePage();
    } catch (e) {
      if (e.name === "AbortError")
        return;
      this._error = e, V(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de requête API`, e);
    } finally {
      this._loading = !1;
    }
  }
  /**
   * Fetch single page for tabular/generic API types
   */
  async _fetchSinglePage() {
    const e = this._buildApiUrl(), t = await fetch(e, {
      signal: this._abortController.signal
    });
    if (!t.ok)
      throw new Error(`HTTP ${t.status}: ${t.statusText}`);
    const i = await t.json();
    let r = this.transform ? v(i, this.transform) : i;
    Array.isArray(r) || (this.apiType === "tabular" && i.data ? r = i.data : r = [r]), this._data = r, ge(this.id, this._data);
  }
  /**
   * Fetch from ODS API with automatic pagination via offset.
   * ODS APIs limit to 100 records per request.
   *
   * - limit > 0: fetch exactly that many records (paginated in chunks of 100)
   * - limit = 0 (default): fetch ALL available records using total_count
   *
   * After fetching, verifies that the number of results received matches
   * total_count from the API response to detect incomplete data.
   */
  async _fetchFromOdsWithPagination() {
    const t = this.limit <= 0 ? Le * xe : this.limit, i = xe;
    let r = [], n = 0, o = -1;
    for (let a = 0; a < Le; a++) {
      const l = t - r.length;
      if (l <= 0)
        break;
      const p = this._buildOpenDataSoftUrl(Math.min(i, l), n), f = await fetch(p, {
        signal: this._abortController.signal
      });
      if (!f.ok)
        throw new Error(`HTTP ${f.status}: ${f.statusText}`);
      const h = await f.json(), $ = h.results || [];
      if (r = r.concat($), typeof h.total_count == "number" && (o = h.total_count), o >= 0 && r.length >= o || $.length < i)
        break;
      n += $.length;
    }
    o >= 0 && r.length < o && r.length < t && console.warn(`gouv-query[${this.id}]: pagination incomplete - ${r.length}/${o} resultats recuperes (limite de securite: ${Le} pages de ${xe})`), this._data = this.transform ? v(r, this.transform) : r, ge(this.id, this._data);
  }
  /**
   * Construit l'URL de requête selon le type d'API
   */
  _buildApiUrl() {
    if (this.apiType === "opendatasoft")
      return this._buildOpenDataSoftUrl();
    if (this.apiType === "tabular")
      return this._buildTabularUrl();
    throw new Error(`Type d'API non supporté: ${this.apiType}`);
  }
  /**
   * Construit une URL OpenDataSoft.
   * When called from the pagination loop, limitOverride and offsetOverride
   * control the per-page limit and offset. When called without overrides
   * (e.g. from _buildApiUrl for non-paginated paths), caps limit at ODS_PAGE_SIZE.
   */
  _buildOpenDataSoftUrl(e, t) {
    const i = this.baseUrl || "https://data.opendatasoft.com", r = new URL(`${i}/api/explore/v2.1/catalog/datasets/${this.datasetId}/records`);
    this.select && r.searchParams.set("select", this.select);
    const n = this.where || this.filter;
    if (n && r.searchParams.set("where", n), this.groupBy && r.searchParams.set("group_by", this.groupBy), this.orderBy) {
      const o = this.orderBy.replace(/:(\w+)$/, (a, l) => ` ${l.toUpperCase()}`);
      r.searchParams.set("order_by", o);
    }
    return e !== void 0 ? r.searchParams.set("limit", String(e)) : this.limit > 0 && r.searchParams.set("limit", String(Math.min(this.limit, xe))), t && t > 0 && r.searchParams.set("offset", String(t)), r.toString();
  }
  /**
   * Construit une URL Tabular API (data.gouv.fr)
   */
  _buildTabularUrl() {
    let e;
    if (this.baseUrl)
      e = this.baseUrl;
    else {
      const r = Yt();
      e = `${r.baseUrl}${r.endpoints.tabular}`;
    }
    if (!this.resource)
      throw new Error(`gouv-query: attribut "resource" requis pour l'API Tabular`);
    const t = new URL(`${e}/api/resources/${this.resource}/data/`, window.location.origin), i = this.filter || this.where;
    if (i) {
      const r = i.split(",").map((n) => n.trim());
      for (const n of r) {
        const o = n.split(":");
        if (o.length >= 3) {
          const a = o[0], l = this._mapOperatorToTabular(o[1]), p = o.slice(2).join(":");
          t.searchParams.set(`${a}__${l}`, p);
        }
      }
    }
    if (this.groupBy) {
      const r = this.groupBy.split(",").map((n) => n.trim());
      for (const n of r)
        t.searchParams.append(`${n}__groupby`, "");
    }
    if (this.aggregate) {
      const r = this.aggregate.split(",").map((n) => n.trim());
      for (const n of r) {
        const o = n.split(":");
        if (o.length >= 2) {
          const a = o[0], l = o[1];
          t.searchParams.append(`${a}__${l}`, "");
        }
      }
    }
    if (this.orderBy) {
      const r = this.orderBy.split(":"), n = r[0], o = r[1] || "asc";
      t.searchParams.set(`${n}__sort`, o);
    }
    return this.limit > 0 && t.searchParams.set("page_size", String(Math.min(this.limit, 50))), t.toString();
  }
  _mapOperatorToTabular(e) {
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
   * Force le rechargement des données
   */
  reload() {
    this._initialize();
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
}, c(Q, "GouvQuery"), Q);
y([
  u({ type: String, attribute: "api-type" })
], _.prototype, "apiType", void 0);
y([
  u({ type: String })
], _.prototype, "source", void 0);
y([
  u({ type: String, attribute: "base-url" })
], _.prototype, "baseUrl", void 0);
y([
  u({ type: String, attribute: "dataset-id" })
], _.prototype, "datasetId", void 0);
y([
  u({ type: String })
], _.prototype, "resource", void 0);
y([
  u({ type: String })
], _.prototype, "select", void 0);
y([
  u({ type: String })
], _.prototype, "where", void 0);
y([
  u({ type: String })
], _.prototype, "filter", void 0);
y([
  u({ type: String, attribute: "group-by" })
], _.prototype, "groupBy", void 0);
y([
  u({ type: String })
], _.prototype, "aggregate", void 0);
y([
  u({ type: String, attribute: "order-by" })
], _.prototype, "orderBy", void 0);
y([
  u({ type: Number })
], _.prototype, "limit", void 0);
y([
  u({ type: String })
], _.prototype, "transform", void 0);
y([
  u({ type: Number })
], _.prototype, "refresh", void 0);
y([
  x()
], _.prototype, "_loading", void 0);
y([
  x()
], _.prototype, "_error", void 0);
y([
  x()
], _.prototype, "_data", void 0);
y([
  x()
], _.prototype, "_rawData", void 0);
_ = y([
  E("gouv-query")
], _);
var O = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, X;
let R = (X = class extends w {
  constructor() {
    super(...arguments), this.source = "", this.numeric = "", this.numericAuto = !1, this.rename = "", this.trim = !1, this.stripHtml = !1, this.replace = "", this.lowercaseKeys = !1, this._unsubscribe = null;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return d``;
  }
  connectedCallback() {
    super.connectedCallback(), ue("gouv-normalize"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && Je(this.id);
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    if (["numeric", "numericAuto", "rename", "trim", "stripHtml", "replace", "lowercaseKeys"].some((r) => e.has(r))) {
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
    this._unsubscribe && this._unsubscribe();
    const e = Pe(this.source);
    e !== void 0 && this._processData(e), this._unsubscribe = Ke(this.source, {
      onLoaded: /* @__PURE__ */ c((t) => {
        this._processData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ c(() => {
        G(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ c((t) => {
        V(this.id, t);
      }, "onError")
    });
  }
  _processData(e) {
    try {
      G(this.id);
      const t = Array.isArray(e) ? e : [e], i = this._parseNumericFields(), r = this._parsePipeMap(this.rename), n = this._parsePipeMap(this.replace), o = t.map((a) => a == null || typeof a != "object" ? a : this._normalizeRow(a, i, r, n));
      ge(this.id, o);
    } catch (t) {
      V(this.id, t), console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`, t);
    }
  }
  _normalizeRow(e, t, i, r) {
    const n = {};
    for (const [o, a] of Object.entries(e)) {
      let l = a;
      if (this.trim && typeof l == "string" && (l = l.trim()), this.stripHtml && typeof l == "string" && (l = l.replace(/<[^>]*>/g, "")), r.size > 0 && typeof l == "string") {
        for (const [h, $] of r)
          if (l === h) {
            l = $;
            break;
          }
      }
      if (t.has(o))
        l = bt(l);
      else if (this.numericAuto && typeof l == "string" && Jt(l)) {
        const h = bt(l, !0);
        h !== null && (l = h);
      }
      const p = i.get(o) ?? o, f = this.lowercaseKeys ? p.toLowerCase() : p;
      n[f] = l;
    }
    return n;
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
      const n = r.indexOf(":");
      if (n === -1)
        continue;
      const o = r.substring(0, n).trim(), a = r.substring(n + 1).trim();
      o && t.set(o, a);
    }
    return t;
  }
}, c(X, "GouvNormalize"), X);
O([
  u({ type: String })
], R.prototype, "source", void 0);
O([
  u({ type: String })
], R.prototype, "numeric", void 0);
O([
  u({ type: Boolean, attribute: "numeric-auto" })
], R.prototype, "numericAuto", void 0);
O([
  u({ type: String })
], R.prototype, "rename", void 0);
O([
  u({ type: Boolean })
], R.prototype, "trim", void 0);
O([
  u({ type: Boolean, attribute: "strip-html" })
], R.prototype, "stripHtml", void 0);
O([
  u({ type: String })
], R.prototype, "replace", void 0);
O([
  u({ type: Boolean, attribute: "lowercase-keys" })
], R.prototype, "lowercaseKeys", void 0);
R = O([
  E("gouv-normalize")
], R);
function Qe(s) {
  const t = class t extends s {
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
      const n = Pe(r);
      n !== void 0 && (this._sourceData = n, this.onSourceData(n)), this._unsubscribeSource = Ke(r, {
        onLoaded: /* @__PURE__ */ c((o) => {
          this._sourceData = o, this._sourceLoading = !1, this._sourceError = null, this.onSourceData(o), this.requestUpdate();
        }, "onLoaded"),
        onLoading: /* @__PURE__ */ c(() => {
          this._sourceLoading = !0, this.requestUpdate();
        }, "onLoading"),
        onError: /* @__PURE__ */ c((o) => {
          this._sourceError = o, this._sourceLoading = !1, this.requestUpdate();
        }, "onError")
      });
    }
    _cleanupSubscription() {
      this._unsubscribeSource && (this._unsubscribeSource(), this._unsubscribeSource = null);
    }
  };
  c(t, "SourceSubscriberElement");
  let e = t;
  return e;
}
c(Qe, "SourceSubscriberMixin");
function _t(s, e = "nombre") {
  if (s == null || s === "")
    return "—";
  const t = typeof s == "string" ? parseFloat(s) : s;
  if (isNaN(t))
    return "—";
  switch (e) {
    case "nombre":
      return vt(t);
    case "pourcentage":
      return tr(t);
    case "euro":
      return rr(t);
    case "decimal":
      return ir(t);
    default:
      return vt(t);
  }
}
c(_t, "formatValue");
function vt(s) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(s));
}
c(vt, "formatNumber");
function tr(s) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(s / 100);
}
c(tr, "formatPercentage");
function rr(s) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(s);
}
c(rr, "formatCurrency");
function ir(s) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(s);
}
c(ir, "formatDecimal");
function fr(s) {
  const e = typeof s == "string" ? new Date(s) : s;
  return isNaN(e.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(e);
}
c(fr, "formatDate");
function nr(s, e, t) {
  return e !== void 0 && s >= e ? "vert" : t !== void 0 && s >= t ? "orange" : e !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
c(nr, "getColorBySeuil");
function sr(s) {
  const e = s.split(":");
  if (e.length === 1)
    return e[0] === "count" ? { type: "count", field: "" } : { type: "direct", field: e[0] };
  const t = e[0], i = e[1];
  if (e.length === 3) {
    let r = e[2];
    return r === "true" ? r = !0 : r === "false" ? r = !1 : isNaN(Number(r)) || (r = Number(r)), { type: t, field: i, filterField: i, filterValue: r };
  }
  return { type: t, field: i };
}
c(sr, "parseExpression");
function yt(s, e) {
  const t = sr(e);
  if (t.type === "direct" && !Array.isArray(s))
    return s[t.field];
  if (!Array.isArray(s))
    return null;
  const i = s;
  switch (t.type) {
    case "direct":
    case "first":
      return i.length > 0 ? i[0][t.field] : null;
    case "last":
      return i.length > 0 ? i[i.length - 1][t.field] : null;
    case "count":
      return t.filterValue !== void 0 ? i.filter((n) => n[t.field] === t.filterValue).length : i.length;
    case "sum":
      return i.reduce((n, o) => {
        const a = Number(o[t.field]);
        return n + (isNaN(a) ? 0 : a);
      }, 0);
    case "avg":
      return i.length === 0 ? null : i.reduce((n, o) => {
        const a = Number(o[t.field]);
        return n + (isNaN(a) ? 0 : a);
      }, 0) / i.length;
    case "min":
      return i.length === 0 ? null : Math.min(...i.map((n) => Number(n[t.field])).filter((n) => !isNaN(n)));
    case "max":
      return i.length === 0 ? null : Math.max(...i.map((n) => Number(n[t.field])).filter((n) => !isNaN(n)));
    default:
      return null;
  }
}
c(yt, "computeAggregation");
var k = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
};
const $t = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
var Y;
let A = (Y = class extends Qe(w) {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "";
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), ue("gouv-kpi");
  }
  _computeValue() {
    return !this._sourceData || !this.valeur ? null : yt(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const e = this._computeValue();
    return typeof e != "number" ? "bleu" : nr(e, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const e = yt(this._sourceData, this.tendance);
    return typeof e != "number" ? null : {
      value: e,
      direction: e > 0 ? "up" : e < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const e = this._computeValue(), t = _t(e, this.format);
    return `${this.label}: ${t}`;
  }
  render() {
    const e = this._computeValue(), t = _t(e, this.format), i = $t[this._getColor()] || $t.bleu, r = this._getTendanceInfo();
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
                <span class="gouv-kpi__tendance gouv-kpi__tendance--${r.direction}" aria-label="${r.value > 0 ? "en hausse" : r.value < 0 ? "en baisse" : "stable"}">
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
}, c(Y, "GouvKpi"), Y);
A.styles = St``;
k([
  u({ type: String })
], A.prototype, "source", void 0);
k([
  u({ type: String })
], A.prototype, "valeur", void 0);
k([
  u({ type: String })
], A.prototype, "label", void 0);
k([
  u({ type: String })
], A.prototype, "description", void 0);
k([
  u({ type: String })
], A.prototype, "icone", void 0);
k([
  u({ type: String })
], A.prototype, "format", void 0);
k([
  u({ type: String })
], A.prototype, "tendance", void 0);
k([
  u({ type: Number, attribute: "seuil-vert" })
], A.prototype, "seuilVert", void 0);
k([
  u({ type: Number, attribute: "seuil-orange" })
], A.prototype, "seuilOrange", void 0);
k([
  u({ type: String })
], A.prototype, "couleur", void 0);
A = k([
  E("gouv-kpi")
], A);
var C = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, Z;
let S = (Z = class extends Qe(w) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), ue("gouv-datalist"), this._initSort();
  }
  updated(e) {
    super.updated(e), e.has("tri") && this._initSort();
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [], this._currentPage = 1;
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
    }), this._sort) {
      const { key: t, direction: i } = this._sort;
      e.sort((r, n) => {
        const o = r[t], a = n[t];
        if (o === a)
          return 0;
        if (o == null)
          return 1;
        if (a == null)
          return -1;
        const l = typeof o == "number" && typeof a == "number" ? o - a : String(o).localeCompare(String(a), "fr");
        return i === "desc" ? -l : l;
      });
    }
    return e;
  }
  _getPaginatedData() {
    const e = this.getFilteredData();
    if (!this.pagination || this.pagination <= 0)
      return e;
    const t = (this._currentPage - 1) * this.pagination;
    return e.slice(t, t + this.pagination);
  }
  _getTotalPages() {
    return !this.pagination || this.pagination <= 0 ? 1 : Math.ceil(this.getFilteredData().length / this.pagination);
  }
  // --- Event handlers ---
  _handleSearch(e) {
    this._searchQuery = e.target.value, this._currentPage = 1;
  }
  _handleFilter(e, t) {
    this._activeFilters = { ...this._activeFilters, [e]: t.target.value }, this._currentPage = 1;
  }
  _handleSort(e) {
    var t;
    ((t = this._sort) == null ? void 0 : t.key) === e ? this._sort = { key: e, direction: this._sort.direction === "asc" ? "desc" : "asc" } : this._sort = { key: e, direction: "asc" };
  }
  _handlePageChange(e) {
    this._currentPage = e;
  }
  // --- Export ---
  _exportCsv() {
    const e = this.parseColumns(), t = this.getFilteredData(), i = e.map((p) => p.label).join(";"), r = t.map((p) => e.map((f) => {
      const h = String(p[f.key] ?? "");
      return h.includes(";") || h.includes('"') ? `"${h.replace(/"/g, '""')}"` : h;
    }).join(";")), n = [i, ...r].join(`
`), o = new Blob([n], { type: "text/csv;charset=utf-8;" }), a = URL.createObjectURL(o), l = document.createElement("a");
    l.href = a, l.download = "export.csv", l.click(), URL.revokeObjectURL(a);
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
      const r = e.find((a) => a.key === i), n = (r == null ? void 0 : r.label) || i, o = this._getUniqueValues(i);
      return d`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${i}">${n}</label>
              <select
                class="fr-select"
                id="filter-${i}"
                @change="${(a) => this._handleFilter(i, a)}"
              >
                <option value="">Tous</option>
                ${o.map((a) => d`
                  <option value="${a}" ?selected="${this._activeFilters[i] === a}">${a}</option>
                `)}
              </select>
            </div>
          `;
    })}
      </div>
    `;
  }
  _renderToolbar() {
    var e, t;
    return !this.recherche && !((e = this.export) != null && e.includes("csv")) ? "" : d`
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

        ${(t = this.export) != null && t.includes("csv") ? d`
          <button
            class="fr-btn fr-btn--secondary fr-btn--sm"
            @click="${this._exportCsv}"
            type="button"
          >
            <span class="fr-icon-download-line fr-icon--sm" aria-hidden="true"></span>
            Exporter CSV
          </button>
        ` : ""}
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
      var r;
      return d`
                <th scope="col">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${() => this._handleSort(i.key)}"
                    aria-label="Trier par ${i.label}"
                    type="button"
                  >
                    ${i.label}
                    ${((r = this._sort) == null ? void 0 : r.key) === i.key ? d`
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
          ${t.map((i) => d`
            <li>
              <button
                class="fr-pagination__link ${i === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(i)}"
                aria-current="${i === this._currentPage ? "page" : "false"}"
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
              aria-label="Dernière page" type="button">Dernière page</button>
          </li>
        </ul>
      </nav>
    `;
  }
  // --- Main render ---
  render() {
    const e = this.parseColumns(), t = this._getFilterableColumns(), i = this._getPaginatedData(), r = this._getTotalPages(), n = this.getFilteredData().length;
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
            ${n} résultat${n > 1 ? "s" : ""}
            ${this._searchQuery || Object.values(this._activeFilters).some((o) => o) ? " (filtré)" : ""}
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
}, c(Z, "GouvDatalist"), Z);
S.styles = St``;
C([
  u({ type: String })
], S.prototype, "source", void 0);
C([
  u({ type: String })
], S.prototype, "colonnes", void 0);
C([
  u({ type: Boolean })
], S.prototype, "recherche", void 0);
C([
  u({ type: String })
], S.prototype, "filtres", void 0);
C([
  u({ type: String })
], S.prototype, "tri", void 0);
C([
  u({ type: Number })
], S.prototype, "pagination", void 0);
C([
  u({ type: String })
], S.prototype, "export", void 0);
C([
  x()
], S.prototype, "_data", void 0);
C([
  x()
], S.prototype, "_searchQuery", void 0);
C([
  x()
], S.prototype, "_activeFilters", void 0);
C([
  x()
], S.prototype, "_sort", void 0);
C([
  x()
], S.prototype, "_currentPage", void 0);
S = C([
  E("gouv-datalist")
], S);
var b = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
};
const or = {
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
var ee;
let g = (ee = class extends Qe(w) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.codeField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._data = [];
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), ue("gouv-dsfr-chart", this.type);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [];
  }
  // --- Data processing ---
  _processData() {
    if (!this._data || this._data.length === 0)
      return { x: "[[]]", y: "[[]]" };
    const e = [], t = [], i = [];
    for (const r of this._data)
      e.push(String(v(r, this.labelField) ?? "N/A")), t.push(Number(v(r, this.valueField)) || 0), this.valueField2 && i.push(Number(v(r, this.valueField2)) || 0);
    return {
      x: JSON.stringify([e]),
      y: JSON.stringify([t]),
      y2: this.valueField2 ? JSON.stringify([i]) : void 0
    };
  }
  _processMapData() {
    if (!this._data || this._data.length === 0)
      return "{}";
    const e = this.codeField || this.labelField, t = {};
    for (const i of this._data) {
      let r = String(v(i, e) ?? "").trim();
      /^\d+$/.test(r) && r.length < 3 && (r = r.padStart(2, "0"));
      const n = Number(v(i, this.valueField)) || 0;
      (this.type === "map" ? Kt(r) : r !== "") && (t[r] = Math.round(n * 100) / 100);
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
    const { x: e, y: t, y2: i } = this._processData(), r = {}, n = {};
    switch (this.type) {
      case "gauge": {
        const o = this.gaugeValue ?? (this._data.length > 0 && Number(v(this._data[0], this.valueField)) || 0);
        r.percent = String(Math.round(o)), r.init = "0", r.target = "100";
        break;
      }
      case "bar-line":
        r.x = e, r["y-bar"] = t, r["y-line"] = i || t, this.unitTooltipBar && (r["unit-tooltip-bar"] = this.unitTooltipBar);
        break;
      case "map":
      case "map-reg": {
        if (r.data = this._processMapData(), this._data.length > 0) {
          let o = 0, a = 0;
          for (const l of this._data) {
            const p = Number(v(l, this.valueField));
            isNaN(p) || (o += p, a++);
          }
          if (a > 0) {
            const l = Math.round(o / a * 100) / 100;
            n.value = String(l);
          }
        }
        n.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        break;
      }
      default:
        r.x = e, r.y = t;
        break;
    }
    return this.type === "bar" && (this.horizontal && (r.horizontal = "true"), this.stacked && (r.stacked = "true"), this.highlightIndex && (r["highlight-index"] = this.highlightIndex)), this.type === "pie" && this.fill && (r.fill = "true"), (this.type === "map" || this.type === "map-reg") && this.mapHighlight && (r.highlight = this.mapHighlight), { attrs: r, deferred: n };
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
    for (const [o, a] of Object.entries(t))
      a !== void 0 && a !== "" && r.setAttribute(o, a);
    Object.keys(i).length > 0 && setTimeout(() => {
      for (const [o, a] of Object.entries(i))
        r.setAttribute(o, a);
    }, 500);
    const n = document.createElement("div");
    return n.className = "gouv-dsfr-chart__wrapper", n.setAttribute("role", "img"), n.setAttribute("aria-label", this._getAriaLabel()), n.appendChild(r), n;
  }
  _renderChart() {
    const e = or[this.type];
    if (!e)
      return d`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const { attrs: t, deferred: i } = this._getTypeSpecificAttributes(), r = {
      ...this._getCommonAttributes(),
      ...t
    }, n = this._createChartElement(e, r, i), o = this.querySelector(".gouv-dsfr-chart__wrapper");
    return o && o.remove(), d`${n}`;
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
}, c(ee, "GouvDsfrChart"), ee);
b([
  u({ type: String })
], g.prototype, "source", void 0);
b([
  u({ type: String })
], g.prototype, "type", void 0);
b([
  u({ type: String, attribute: "label-field" })
], g.prototype, "labelField", void 0);
b([
  u({ type: String, attribute: "code-field" })
], g.prototype, "codeField", void 0);
b([
  u({ type: String, attribute: "value-field" })
], g.prototype, "valueField", void 0);
b([
  u({ type: String, attribute: "value-field-2" })
], g.prototype, "valueField2", void 0);
b([
  u({ type: String })
], g.prototype, "name", void 0);
b([
  u({ type: String, attribute: "selected-palette" })
], g.prototype, "selectedPalette", void 0);
b([
  u({ type: String, attribute: "unit-tooltip" })
], g.prototype, "unitTooltip", void 0);
b([
  u({ type: String, attribute: "unit-tooltip-bar" })
], g.prototype, "unitTooltipBar", void 0);
b([
  u({ type: Boolean })
], g.prototype, "horizontal", void 0);
b([
  u({ type: Boolean })
], g.prototype, "stacked", void 0);
b([
  u({ type: Boolean })
], g.prototype, "fill", void 0);
b([
  u({ type: String, attribute: "highlight-index" })
], g.prototype, "highlightIndex", void 0);
b([
  u({ type: String, attribute: "x-min" })
], g.prototype, "xMin", void 0);
b([
  u({ type: String, attribute: "x-max" })
], g.prototype, "xMax", void 0);
b([
  u({ type: String, attribute: "y-min" })
], g.prototype, "yMin", void 0);
b([
  u({ type: String, attribute: "y-max" })
], g.prototype, "yMax", void 0);
b([
  u({ type: Number, attribute: "gauge-value" })
], g.prototype, "gaugeValue", void 0);
b([
  u({ type: String, attribute: "map-highlight" })
], g.prototype, "mapHighlight", void 0);
b([
  x()
], g.prototype, "_data", void 0);
g = b([
  E("gouv-dsfr-chart")
], g);
var Re = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, te;
let ye = (te = class extends w {
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
}, c(te, "AppHeader"), te);
Re([
  u({ type: String, attribute: "current-page" })
], ye.prototype, "currentPage", void 0);
Re([
  u({ type: String, attribute: "base-path" })
], ye.prototype, "basePath", void 0);
Re([
  x()
], ye.prototype, "_favCount", void 0);
ye = Re([
  E("app-header")
], ye);
var kt = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, re;
let Ie = (re = class extends w {
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
}, c(re, "AppFooter"), re);
kt([
  u({ type: String, attribute: "base-path" })
], Ie.prototype, "basePath", void 0);
Ie = kt([
  E("app-footer")
], Ie);
var de = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, ie;
let I = (ie = class extends w {
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
    let n = e.clientX - i.left;
    n = Math.max(this.minLeftWidth, Math.min(n, r - this.minRightWidth)), this._currentLeftRatio = n / r * 100, this.requestUpdate();
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
    `;
  }
}, c(ie, "AppLayoutBuilder"), ie);
de([
  u({ type: Number, attribute: "left-ratio" })
], I.prototype, "leftRatio", void 0);
de([
  u({ type: Number, attribute: "min-left-width" })
], I.prototype, "minLeftWidth", void 0);
de([
  u({ type: Number, attribute: "min-right-width" })
], I.prototype, "minRightWidth", void 0);
de([
  x()
], I.prototype, "_isResizing", void 0);
de([
  x()
], I.prototype, "_currentLeftRatio", void 0);
I = de([
  E("app-layout-builder")
], I);
var $e = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, ne;
let ce = (ne = class extends w {
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
        label: "Nos composants",
        href: "#",
        children: [
          { id: "components/gouv-source", label: "gouv-source", href: "components/gouv-source.html" },
          { id: "components/gouv-query", label: "gouv-query", href: "components/gouv-query.html" },
          { id: "components/gouv-kpi", label: "gouv-kpi", href: "components/gouv-kpi.html" },
          { id: "components/gouv-datalist", label: "gouv-datalist", href: "components/gouv-datalist.html" },
          { id: "components/gouv-dsfr-chart", label: "gouv-dsfr-chart", href: "components/gouv-dsfr-chart.html" }
        ]
      },
      {
        id: "charts",
        label: "Graphiques DSFR",
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
      const r = `fr-sidemenu-${e.id}`, n = i;
      return d`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${n}"
                  aria-controls="${r}">
            ${e.label}
          </button>
          <div class="fr-collapse ${n ? "fr-collapse--expanded" : ""}" id="${r}">
            <ul class="fr-sidemenu__list">
              ${e.children.map((o) => this._renderMenuItem(o))}
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
      const i = e[0] === "components" ? "Nos composants" : "Graphiques DSFR";
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
}, c(ne, "AppLayoutDemo"), ne);
$e([
  u({ type: String })
], ce.prototype, "title", void 0);
$e([
  u({ type: String })
], ce.prototype, "icon", void 0);
$e([
  u({ type: String, attribute: "active-path" })
], ce.prototype, "activePath", void 0);
$e([
  u({ type: String, attribute: "base-path" })
], ce.prototype, "basePath", void 0);
ce = $e([
  E("app-layout-demo")
], ce);
var q = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (r < 3 ? o(n) : r > 3 ? o(e, t, n) : o(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, se;
let U = (se = class extends w {
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
}, c(se, "AppPreviewPanel"), se);
q([
  u({ type: Boolean, attribute: "show-data-tab" })
], U.prototype, "showDataTab", void 0);
q([
  u({ type: Boolean, attribute: "show-save-button" })
], U.prototype, "showSaveButton", void 0);
q([
  u({ type: Boolean, attribute: "show-playground-button" })
], U.prototype, "showPlaygroundButton", void 0);
q([
  u({ type: String, attribute: "tab-labels" })
], U.prototype, "tabLabels", void 0);
q([
  u({ type: String, attribute: "active-tab" })
], U.prototype, "activeTab", void 0);
q([
  x()
], U.prototype, "_activeTab", void 0);
U = q([
  E("app-preview-panel")
], U);
function ar(s, e, t) {
  return s.map((i) => ({
    label: String(v(i, e) ?? "N/A"),
    value: Number(v(i, t)) || 0
  }));
}
c(ar, "extractLabelValues");
function lr(s, e) {
  if (e === "none")
    return s;
  const t = /* @__PURE__ */ new Map();
  for (const r of s) {
    const n = t.get(r.label) || [];
    n.push(r.value), t.set(r.label, n);
  }
  const i = [];
  for (const [r, n] of t)
    i.push({ label: r, value: cr(n, e) });
  return i;
}
c(lr, "aggregateByLabel");
function cr(s, e) {
  switch (e) {
    case "sum":
      return s.reduce((t, i) => t + i, 0);
    case "avg":
      return s.reduce((t, i) => t + i, 0) / s.length;
    case "count":
      return s.length;
    case "min":
      return Math.min(...s);
    case "max":
      return Math.max(...s);
    default:
      return s[0] || 0;
  }
}
c(cr, "computeGroupValue");
function ur(s, e) {
  return e === "none" ? s : [...s].sort((t, i) => e === "desc" ? i.value - t.value : t.value - i.value);
}
c(ur, "sortByValue");
function gr(s, e, t, i = "none", r = "none", n = 0) {
  if (!s || s.length === 0)
    return { labels: [], values: [] };
  let o = ar(s, e, t);
  return o = lr(o, i), o = ur(o, r), n > 0 && (o = o.slice(0, n)), {
    labels: o.map((a) => a.label),
    values: o.map((a) => Math.round(a.value * 100) / 100)
  };
}
c(gr, "processChartData");
export {
  Ie as AppFooter,
  ye as AppHeader,
  I as AppLayoutBuilder,
  ce as AppLayoutDemo,
  N as DATA_EVENTS,
  S as GouvDatalist,
  g as GouvDsfrChart,
  A as GouvKpi,
  R as GouvNormalize,
  _ as GouvQuery,
  P as GouvSource,
  Qe as SourceSubscriberMixin,
  lr as aggregateByLabel,
  yt as computeAggregation,
  V as dispatchDataError,
  ge as dispatchDataLoaded,
  G as dispatchDataLoading,
  ar as extractLabelValues,
  rr as formatCurrency,
  fr as formatDate,
  vt as formatNumber,
  tr as formatPercentage,
  _t as formatValue,
  v as getByPath,
  pr as getByPathOrDefault,
  Pe as getDataCache,
  hr as hasPath,
  sr as parseExpression,
  gr as processChartData,
  ur as sortByValue,
  Ke as subscribeToSource
};
