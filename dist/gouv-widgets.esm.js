var Fr = Object.defineProperty;
var c = (n, e) => Fr(n, "name", { value: e, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis, kt = et.ShadowRoot && (et.ShadyCSS === void 0 || et.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Rt = Symbol(), Jt = /* @__PURE__ */ new WeakMap();
var ue;
let vr = (ue = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (kt && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = Jt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Jt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}, c(ue, "n"), ue);
const Mr = /* @__PURE__ */ c((n) => new vr(typeof n == "string" ? n : n + "", void 0, Rt), "r$4"), yr = /* @__PURE__ */ c((n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((r, i, s) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[s + 1], n[0]);
  return new vr(t, n, Rt);
}, "i$3"), Dr = /* @__PURE__ */ c((n, e) => {
  if (kt) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = et.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
  }
}, "S$1"), Qt = kt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return Mr(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Tr, defineProperty: Or, getOwnPropertyDescriptor: Nr, getOwnPropertyNames: Ur, getOwnPropertySymbols: Lr, getPrototypeOf: zr } = Object, W = globalThis, Kt = W.trustedTypes, Br = Kt ? Kt.emptyScript : "", ot = W.reactiveElementPolyfillSupport, ze = /* @__PURE__ */ c((n, e) => n, "d$1"), tt = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Br : null;
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
} }, Et = /* @__PURE__ */ c((n, e) => !Tr(n, e), "f$1"), Yt = { attribute: !0, type: String, converter: tt, reflect: !1, useDefault: !1, hasChanged: Et };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), W.litPropertyMetadata ?? (W.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var de;
let ce = (de = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Yt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Or(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: s } = Nr(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Yt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ze("elementProperties"))) return;
    const e = zr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ze("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ze("properties"))) {
      const t = this.properties, r = [...Ur(t), ...Lr(t)];
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
      for (const i of r) t.unshift(Qt(i));
    } else e !== void 0 && t.push(Qt(e));
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
    return Dr(e, this.constructor.elementStyles), e;
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
      const a = (((s = r.converter) == null ? void 0 : s.toAttribute) !== void 0 ? r.converter : tt).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, a;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? o.converter : tt;
      this._$Em = i;
      const d = l.fromAttribute(t, o.type);
      this[i] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, s) {
    var a;
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (s = this[e]), r ?? (r = o.getPropertyOptions(e)), !((r.hasChanged ?? Et)(s, t) || r.useDefault && r.reflect && s === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, r)))) return;
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
}, c(de, "y"), de);
ce.elementStyles = [], ce.shadowRootOptions = { mode: "open" }, ce[ze("elementProperties")] = /* @__PURE__ */ new Map(), ce[ze("finalized")] = /* @__PURE__ */ new Map(), ot == null || ot({ ReactiveElement: ce }), (W.reactiveElementVersions ?? (W.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Be = globalThis, Xt = /* @__PURE__ */ c((n) => n, "i$1"), rt = Be.trustedTypes, Zt = rt ? rt.createPolicy("lit-html", { createHTML: /* @__PURE__ */ c((n) => n, "createHTML") }) : void 0, $r = "$lit$", H = `lit$${Math.random().toFixed(9).slice(2)}$`, wr = "?" + H, jr = `<${wr}>`, ie = document, je = /* @__PURE__ */ c(() => ie.createComment(""), "c"), Ie = /* @__PURE__ */ c((n) => n === null || typeof n != "object" && typeof n != "function", "a"), Ft = Array.isArray, Ir = /* @__PURE__ */ c((n) => Ft(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", "d"), lt = `[ 	
\f\r]`, Ue = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, er = /-->/g, tr = />/g, Z = RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rr = /'/g, ir = /"/g, Sr = /^(?:script|style|textarea|title)$/i, qr = /* @__PURE__ */ c((n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), "x"), h = qr(1), Ae = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), sr = /* @__PURE__ */ new WeakMap(), ee = ie.createTreeWalker(ie, 129);
function Pr(n, e) {
  if (!Ft(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Zt !== void 0 ? Zt.createHTML(e) : e;
}
c(Pr, "V");
const Gr = /* @__PURE__ */ c((n, e) => {
  const t = n.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Ue;
  for (let o = 0; o < t; o++) {
    const l = n[o];
    let d, p, f = -1, g = 0;
    for (; g < l.length && (a.lastIndex = g, p = a.exec(l), p !== null); ) g = a.lastIndex, a === Ue ? p[1] === "!--" ? a = er : p[1] !== void 0 ? a = tr : p[2] !== void 0 ? (Sr.test(p[2]) && (i = RegExp("</" + p[2], "g")), a = Z) : p[3] !== void 0 && (a = Z) : a === Z ? p[0] === ">" ? (a = i ?? Ue, f = -1) : p[1] === void 0 ? f = -2 : (f = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? Z : p[3] === '"' ? ir : rr) : a === ir || a === rr ? a = Z : a === er || a === tr ? a = Ue : (a = Z, i = void 0);
    const b = a === Z && n[o + 1].startsWith("/>") ? " " : "";
    s += a === Ue ? l + jr : f >= 0 ? (r.push(d), l.slice(0, f) + $r + l.slice(f) + H + b) : l + H + (f === -2 ? o : b);
  }
  return [Pr(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
}, "N"), it = class it {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let s = 0, a = 0;
    const o = e.length - 1, l = this.parts, [d, p] = Gr(e, t);
    if (this.el = it.createElement(d, r), ee.currentNode = this.el.content, t === 2 || t === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (i = ee.nextNode()) !== null && l.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const f of i.getAttributeNames()) if (f.endsWith($r)) {
          const g = p[a++], b = i.getAttribute(f).split(H), E = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: s, name: E[2], strings: b, ctor: E[1] === "." ? bt : E[1] === "?" ? vt : E[1] === "@" ? yt : Re }), i.removeAttribute(f);
        } else f.startsWith(H) && (l.push({ type: 6, index: s }), i.removeAttribute(f));
        if (Sr.test(i.tagName)) {
          const f = i.textContent.split(H), g = f.length - 1;
          if (g > 0) {
            i.textContent = rt ? rt.emptyScript : "";
            for (let b = 0; b < g; b++) i.append(f[b], je()), ee.nextNode(), l.push({ type: 2, index: ++s });
            i.append(f[g], je());
          }
        }
      } else if (i.nodeType === 8) if (i.data === wr) l.push({ type: 2, index: s });
      else {
        let f = -1;
        for (; (f = i.data.indexOf(H, f + 1)) !== -1; ) l.push({ type: 7, index: s }), f += H.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const r = ie.createElement("template");
    return r.innerHTML = e, r;
  }
};
c(it, "S");
let qe = it;
function ke(n, e, t = n, r) {
  var a, o;
  if (e === Ae) return e;
  let i = r !== void 0 ? (a = t._$Co) == null ? void 0 : a[r] : t._$Cl;
  const s = Ie(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), s === void 0 ? i = void 0 : (i = new s(n), i._$AT(n, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = i : t._$Cl = i), i !== void 0 && (e = ke(n, i._$AS(n, e.values), i, r)), e;
}
c(ke, "M");
const Ut = class Ut {
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
    const { el: { content: t }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? ie).importNode(t, !0);
    ee.currentNode = i;
    let s = ee.nextNode(), a = 0, o = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new Ge(s, s.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (d = new $t(s, this, e)), this._$AV.push(d), l = r[++o];
      }
      a !== (l == null ? void 0 : l.index) && (s = ee.nextNode(), a++);
    }
    return ee.currentNode = ie, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
};
c(Ut, "R");
let mt = Ut;
const st = class st {
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
    e = ke(this, e, t), Ie(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== Ae && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ir(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && Ie(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ie.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = qe.createElement(Pr(r.h, r.h[0]), this.options)), r);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(t);
    else {
      const a = new mt(i, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = sr.get(e.strings);
    return t === void 0 && sr.set(e.strings, t = new qe(e)), t;
  }
  k(e) {
    Ft(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const s of e) i === t.length ? t.push(r = new st(this.O(je()), this.O(je()), this, this.options)) : r = t[i], r._$AI(s), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = Xt(e).nextSibling;
      Xt(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
};
c(st, "k");
let Ge = st;
const Lt = class Lt {
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
    if (s === void 0) e = ke(this, e, t, 0), a = !Ie(e) || e !== this._$AH && e !== Ae, a && (this._$AH = e);
    else {
      const o = e;
      let l, d;
      for (e = s[0], l = 0; l < s.length - 1; l++) d = ke(this, o[r + l], t, l), d === Ae && (d = this._$AH[l]), a || (a = !Ie(d) || d !== this._$AH[l]), d === m ? e = m : e !== m && (e += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
c(Lt, "H");
let Re = Lt;
const zt = class zt extends Re {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
};
c(zt, "I");
let bt = zt;
const Bt = class Bt extends Re {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
};
c(Bt, "L");
let vt = Bt;
const jt = class jt extends Re {
  constructor(e, t, r, i, s) {
    super(e, t, r, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ke(this, e, t, 0) ?? m) === Ae) return;
    const r = this._$AH, i = e === m && r !== m || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== m && (r === m || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
};
c(jt, "z");
let yt = jt;
const It = class It {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ke(this, e);
  }
};
c(It, "Z");
let $t = It;
const ct = Be.litHtmlPolyfillSupport;
ct == null || ct(qe, Ge), (Be.litHtmlVersions ?? (Be.litHtmlVersions = [])).push("3.3.2");
const Vr = /* @__PURE__ */ c((n, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = i = new Ge(e.insertBefore(je(), s), s, void 0, t ?? {});
  }
  return i._$AI(n), i;
}, "D");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = globalThis, qt = class qt extends ce {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Vr(t, this.renderRoot, this.renderOptions);
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
    return Ae;
  }
};
c(qt, "i");
let C = qt;
var br;
C._$litElement$ = !0, C.finalized = !0, (br = re.litElementHydrateSupport) == null || br.call(re, { LitElement: C });
const ut = re.litElementPolyfillSupport;
ut == null || ut({ LitElement: C });
(re.litElementVersions ?? (re.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = /* @__PURE__ */ c((n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
}, "t");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Hr = { attribute: !0, type: String, converter: tt, reflect: !1, hasChanged: Et }, Wr = /* @__PURE__ */ c((n = Hr, e, t) => {
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
function u(n) {
  return (e, t) => typeof t == "object" ? Wr(n, e, t) : ((r, i, s) => {
    const a = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), a ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(n, e, t);
}
c(u, "n");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _(n) {
  return u({ ...n, state: !0, attribute: !1 });
}
c(_, "r");
function S(n, e) {
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
c(S, "getByPath");
function Pi(n, e) {
  return S(n, e) !== void 0;
}
c(Pi, "hasPath");
function ar(n, e, t) {
  const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let s = n;
  for (let a = 0; a < i.length - 1; a++) {
    const o = i[a];
    (!(o in s) || typeof s[o] != "object" || s[o] === null) && (s[o] = {}), s = s[o];
  }
  s[i[i.length - 1]] = t;
}
c(ar, "setByPath");
function xi(n, e, t) {
  const r = S(n, e);
  return r !== void 0 ? r : t;
}
c(xi, "getByPathOrDefault");
function wt(n) {
  return n ? String(n).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
}
c(wt, "escapeHtml");
function nr(n, e = !1) {
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
c(nr, "toNumber");
function Jr(n) {
  if (typeof n != "string")
    return !1;
  const e = n.trim();
  return e === "" ? !1 : /^-?[\d\s]+([.,]\d+)?$/.test(e);
}
c(Jr, "looksLikeNumber");
function Qr(n) {
  return !n || typeof n != "string" || ["N/A", "null", "undefined", "00", ""].includes(n) ? !1 : !!(n === "2A" || n === "2B" || /^97[1-6]$/.test(n) || /^(0[1-9]|[1-8]\d|9[0-5])$/.test(n));
}
c(Qr, "isValidDeptCode");
const Mt = "https://chartsbuilder.matge.com", dt = {
  baseUrl: Mt,
  endpoints: {
    grist: "/grist-proxy",
    gristGouv: "/grist-gouv-proxy",
    albert: "/albert-proxy",
    tabular: "/tabular-proxy"
  }
};
function Kr() {
  return typeof window < "u" && window.location.hostname === "localhost" && window.location.port === "5173";
}
c(Kr, "isViteDevMode");
function Yr() {
  return typeof window < "u" && "__TAURI__" in window;
}
c(Yr, "isTauriMode");
function xr() {
  var r;
  const n = { ...dt.endpoints };
  return Kr() ? { baseUrl: "", endpoints: n } : Yr() ? { baseUrl: dt.baseUrl, endpoints: n } : {
    baseUrl: ((r = import.meta.env) == null ? void 0 : r.VITE_PROXY_URL) || dt.baseUrl,
    endpoints: n
  };
}
c(xr, "getProxyConfig");
function Xr(n) {
  const e = xr();
  return n.includes("tabular-api.data.gouv.fr") ? n.replace("https://tabular-api.data.gouv.fr", `${e.baseUrl}${e.endpoints.tabular}`) : n.includes("docs.getgrist.com") ? n.replace("https://docs.getgrist.com", `${e.baseUrl}${e.endpoints.grist}`) : n.includes("grist.numerique.gouv.fr") ? n.replace("https://grist.numerique.gouv.fr", `${e.baseUrl}${e.endpoints.gristGouv}`) : n.includes("albert.api.etalab.gouv.fr") ? n.replace("https://albert.api.etalab.gouv.fr", `${e.baseUrl}${e.endpoints.albert}`) : n;
}
c(Xr, "getProxiedUrl");
const Qe = {
  FAVORITES: "gouv-widgets-favorites",
  DASHBOARDS: "gouv-widgets-dashboards",
  CONNECTIONS: "gouv_widgets_connections",
  SOURCES: "gouv_widgets_sources"
};
function Ke(n, e) {
  try {
    const t = localStorage.getItem(n);
    return t ? JSON.parse(t) : e;
  } catch {
    return e;
  }
}
c(Ke, "loadFromStorage");
const Zr = {
  user: null,
  isAuthenticated: !1,
  isLoading: !0
};
let Ee = { ...Zr }, le = null, Ye = null, Cr = "";
const St = /* @__PURE__ */ new Set();
function ei() {
  for (const n of St)
    try {
      n(Ee);
    } catch {
    }
}
c(ei, "notify");
function te(n) {
  Ee = { ...Ee, ...n }, ei();
}
c(te, "setState");
async function Ve(n, e) {
  return fetch(`${Cr}${n}`, {
    ...e,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...e == null ? void 0 : e.headers
    }
  });
}
c(Ve, "apiFetch");
async function Ar() {
  if (le !== null)
    return le;
  try {
    const n = await fetch(`${Cr}/api/auth/me`, {
      credentials: "include"
    });
    le = n.status === 200 || n.status === 401;
  } catch {
    le = !1;
  }
  return le && typeof window < "u" && (window.__gwDbMode = !0), le;
}
c(Ar, "isDbMode");
async function ti() {
  return Ye || (Ye = ri(), Ye);
}
c(ti, "checkAuth");
async function ri() {
  if (!await Ar())
    return te({ user: null, isAuthenticated: !1, isLoading: !1 }), Ee;
  try {
    const e = await Ve("/api/auth/me");
    if (e.ok) {
      const t = await e.json();
      te({ user: t.user, isAuthenticated: !0, isLoading: !1 });
    } else
      te({ user: null, isAuthenticated: !1, isLoading: !1 });
  } catch {
    te({ user: null, isAuthenticated: !1, isLoading: !1 });
  }
  return Ee;
}
c(ri, "_doCheckAuth");
async function ii(n) {
  try {
    const e = await Ve("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(n)
    });
    if (!e.ok)
      return { success: !1, error: (await e.json()).error || "Login failed" };
    const t = await e.json();
    return te({ user: t.user, isAuthenticated: !0, isLoading: !1 }), await kr(), { success: !0 };
  } catch {
    return { success: !1, error: "Network error" };
  }
}
c(ii, "login");
async function si(n) {
  try {
    const e = await Ve("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(n)
    });
    if (!e.ok)
      return { success: !1, error: (await e.json()).error || "Registration failed" };
    const t = await e.json();
    return te({ user: t.user, isAuthenticated: !0, isLoading: !1 }), await kr(), { success: !0 };
  } catch {
    return { success: !1, error: "Network error" };
  }
}
c(si, "register");
async function ai() {
  try {
    await Ve("/api/auth/logout", { method: "POST" });
  } catch {
  }
  te({ user: null, isAuthenticated: !1, isLoading: !1 });
}
c(ai, "logout");
function ni(n) {
  return St.add(n), () => {
    St.delete(n);
  };
}
c(ni, "onAuthChange");
function or() {
  return Ee.isAuthenticated;
}
c(or, "isAuthenticated");
const ht = "gw-migrated";
async function kr() {
  if (localStorage.getItem(ht))
    return;
  const n = Ke(Qe.SOURCES, []), e = Ke(Qe.CONNECTIONS, []), t = Ke(Qe.FAVORITES, []), r = Ke(Qe.DASHBOARDS, []);
  if (!(n.length > 0 || e.length > 0 || t.length > 0 || r.length > 0)) {
    localStorage.setItem(ht, "1");
    return;
  }
  try {
    (await Ve("/api/migrate", {
      method: "POST",
      body: JSON.stringify({ sources: n, connections: e, favorites: t, dashboards: r })
    })).ok && (localStorage.setItem(ht, "1"), console.info("[auth] localStorage data migrated to server"));
  } catch {
    console.warn("[auth] Migration failed, will retry on next login");
  }
}
c(kr, "autoMigrateIfNeeded");
const lr = /\/api\/explore\/v2\.1\/catalog\/datasets\/([^/]+)/, oi = {
  id: "opendatasoft",
  displayName: "OpenDataSoft",
  urlPatterns: [lr],
  knownHosts: [],
  // any ODS domain is valid — no fixed host
  defaultBaseUrl: "https://data.opendatasoft.com",
  defaultAuthType: "apikey-header",
  response: {
    dataPath: "results",
    totalCountPath: "total_count",
    nestedDataKey: null,
    requiresFlatten: !1
  },
  pagination: {
    type: "offset",
    pageSize: 100,
    maxPages: 10,
    maxRecords: 1e3,
    params: { offset: "offset", limit: "limit" },
    nextPagePath: null
  },
  capabilities: {
    serverFetch: !0,
    serverFacets: !0,
    serverSearch: !0,
    serverGroupBy: !0,
    serverOrderBy: !0,
    serverAggregation: !0
  },
  query: {
    whereFormat: "odsql",
    whereSeparator: " AND ",
    aggregationSyntax: "odsql-select"
  },
  facets: {
    defaultMode: "server",
    endpoint: "/facets"
  },
  resource: {
    idFields: ["datasetId"],
    apiPathTemplate: "/api/explore/v2.1/catalog/datasets/{datasetId}/records",
    extractIds: /* @__PURE__ */ c((n) => {
      const e = n.match(lr);
      return e ? { datasetId: e[1] } : null;
    }, "extractIds")
  },
  codeGen: {
    usesGouvSource: !1,
    usesGouvQuery: !0,
    usesGouvNormalize: !1,
    queryApiType: "opendatasoft",
    fieldPrefix: "",
    dependencies: { dsfr: !0, dsfrChart: !0, gouvWidgets: !0 }
  }
}, cr = /tabular-api\.data\.gouv\.fr\/api\/resources\/([^/]+)/, li = {
  id: "tabular",
  displayName: "Tabular (data.gouv.fr)",
  urlPatterns: [cr],
  knownHosts: [
    { hostname: "tabular-api.data.gouv.fr", proxyEndpoint: "/tabular-proxy" }
  ],
  defaultBaseUrl: "https://tabular-api.data.gouv.fr",
  defaultAuthType: "none",
  response: {
    dataPath: "data",
    totalCountPath: "meta.total",
    nestedDataKey: null,
    requiresFlatten: !1
  },
  pagination: {
    type: "page",
    pageSize: 100,
    maxPages: 500,
    maxRecords: 5e4,
    params: { page: "page", pageSize: "page_size" },
    nextPagePath: "next",
    serverMeta: {
      pagePath: "meta.page",
      pageSizePath: "meta.page_size",
      totalPath: "meta.total"
    }
  },
  capabilities: {
    serverFetch: !0,
    serverFacets: !1,
    serverSearch: !1,
    serverGroupBy: !1,
    serverOrderBy: !0,
    serverAggregation: !1
  },
  query: {
    whereFormat: "colon",
    whereSeparator: ", ",
    aggregationSyntax: "colon-attr"
  },
  facets: {
    defaultMode: "static"
  },
  resource: {
    idFields: ["resourceId"],
    apiPathTemplate: "/api/resources/{resourceId}/data/",
    extractIds: /* @__PURE__ */ c((n) => {
      const e = n.match(cr);
      return e ? { resourceId: e[1] } : null;
    }, "extractIds")
  },
  codeGen: {
    usesGouvSource: !1,
    usesGouvQuery: !0,
    usesGouvNormalize: !1,
    queryApiType: "tabular",
    fieldPrefix: "",
    dependencies: { dsfr: !0, dsfrChart: !0, gouvWidgets: !0 }
  }
}, ur = /\/api\/docs\/([^/]+)\/tables\/([^/]+)/, ci = {
  id: "grist",
  displayName: "Grist",
  urlPatterns: [ur],
  knownHosts: [
    { hostname: "grist.numerique.gouv.fr", proxyEndpoint: "/grist-gouv-proxy" },
    { hostname: "docs.getgrist.com", proxyEndpoint: "/grist-proxy" }
  ],
  defaultBaseUrl: "https://grist.numerique.gouv.fr",
  defaultAuthType: "bearer",
  response: {
    dataPath: "records",
    totalCountPath: null,
    nestedDataKey: "fields",
    requiresFlatten: !0
  },
  pagination: {
    type: "none",
    pageSize: 0,
    maxPages: 0,
    maxRecords: 0,
    params: {},
    nextPagePath: null
  },
  capabilities: {
    serverFetch: !0,
    serverFacets: !1,
    serverSearch: !1,
    serverGroupBy: !1,
    serverOrderBy: !1,
    serverAggregation: !1
  },
  query: {
    whereFormat: "colon",
    whereSeparator: ", ",
    aggregationSyntax: "client-only"
  },
  facets: {
    defaultMode: "client"
  },
  resource: {
    idFields: ["documentId", "tableId"],
    apiPathTemplate: "/api/docs/{documentId}/tables/{tableId}/records",
    extractIds: /* @__PURE__ */ c((n) => {
      const e = n.match(ur);
      return e ? { documentId: e[1], tableId: e[2] } : null;
    }, "extractIds")
  },
  codeGen: {
    usesGouvSource: !0,
    usesGouvQuery: !0,
    usesGouvNormalize: !0,
    queryApiType: null,
    // becomes 'grist' after Phase 5
    fieldPrefix: "fields.",
    dependencies: { dsfr: !0, dsfrChart: !0, gouvWidgets: !0 }
  }
}, ui = {
  id: "generic",
  displayName: "Generic REST",
  urlPatterns: [],
  // fallback — matches anything not matched by other providers
  knownHosts: [],
  defaultBaseUrl: "",
  defaultAuthType: "none",
  response: {
    dataPath: "",
    totalCountPath: null,
    nestedDataKey: null,
    requiresFlatten: !1
  },
  pagination: {
    type: "none",
    pageSize: 0,
    maxPages: 0,
    maxRecords: 0,
    params: {},
    nextPagePath: null
  },
  capabilities: {
    serverFetch: !1,
    serverFacets: !1,
    serverSearch: !1,
    serverGroupBy: !1,
    serverOrderBy: !1,
    serverAggregation: !1
  },
  query: {
    whereFormat: "colon",
    whereSeparator: ", ",
    aggregationSyntax: "client-only"
  },
  facets: {
    defaultMode: "client"
  },
  resource: {
    idFields: [],
    apiPathTemplate: "",
    extractIds: /* @__PURE__ */ c(() => null, "extractIds")
  },
  codeGen: {
    usesGouvSource: !0,
    usesGouvQuery: !0,
    usesGouvNormalize: !1,
    queryApiType: null,
    fieldPrefix: "",
    dependencies: { dsfr: !0, dsfrChart: !0, gouvWidgets: !0 }
  }
}, di = /* @__PURE__ */ new Map();
function at(n) {
  di.set(n.id, n);
}
c(at, "registerProvider");
at(oi);
at(li);
at(ci);
at(ui);
const dr = `${Mt}/beacon`, hr = /* @__PURE__ */ new Set();
function V(n, e) {
  const t = `${n}:${e || ""}`;
  if (hr.has(t) || (hr.add(t), typeof window > "u"))
    return;
  const r = window.location.hostname;
  if (r === "localhost" || r === "127.0.0.1" || r === new URL(Mt).hostname)
    return;
  const i = new URLSearchParams();
  if (i.set("c", n), e && i.set("t", e), i.set("r", window.location.origin), typeof window < "u" && window.__gwDbMode === !0)
    try {
      fetch("/api/monitoring/beacon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          component: n,
          chartType: e || null,
          origin: window.location.origin
        })
      }).catch(() => {
        new Image().src = `${dr}?${i.toString()}`;
      });
      return;
    } catch {
    }
  const a = `${dr}?${i.toString()}`;
  try {
    new Image().src = a;
  } catch {
  }
}
c(V, "sendWidgetBeacon");
const U = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading",
  SOURCE_COMMAND: "gouv-source-command"
}, Dt = /* @__PURE__ */ new Map(), Tt = /* @__PURE__ */ new Map();
function hi(n, e) {
  Dt.set(n, e);
}
c(hi, "setDataCache");
function Fe(n) {
  return Dt.get(n);
}
c(Fe, "getDataCache");
function He(n) {
  Dt.delete(n);
}
c(He, "clearDataCache");
function Me(n, e) {
  Tt.set(n, e);
}
c(Me, "setDataMeta");
function De(n) {
  return Tt.get(n);
}
c(De, "getDataMeta");
function Ot(n) {
  Tt.delete(n);
}
c(Ot, "clearDataMeta");
function L(n, e) {
  hi(n, e);
  const t = new CustomEvent(U.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, data: e }
  });
  document.dispatchEvent(t);
}
c(L, "dispatchDataLoaded");
function J(n, e) {
  const t = new CustomEvent(U.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, error: e }
  });
  document.dispatchEvent(t);
}
c(J, "dispatchDataError");
function Q(n) {
  const e = new CustomEvent(U.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n }
  });
  document.dispatchEvent(e);
}
c(Q, "dispatchDataLoading");
function K(n, e) {
  const t = new CustomEvent(U.SOURCE_COMMAND, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, ...e }
  });
  document.dispatchEvent(t);
}
c(K, "dispatchSourceCommand");
function Nt(n, e) {
  const t = /* @__PURE__ */ c((r) => {
    const i = r;
    if (i.detail.sourceId === n) {
      const { sourceId: s, ...a } = i.detail;
      e(a);
    }
  }, "handler");
  return document.addEventListener(U.SOURCE_COMMAND, t), () => document.removeEventListener(U.SOURCE_COMMAND, t);
}
c(Nt, "subscribeToSourceCommands");
function We(n, e) {
  const t = /* @__PURE__ */ c((s) => {
    const a = s;
    a.detail.sourceId === n && e.onLoaded && e.onLoaded(a.detail.data);
  }, "handleLoaded"), r = /* @__PURE__ */ c((s) => {
    const a = s;
    a.detail.sourceId === n && e.onError && e.onError(a.detail.error);
  }, "handleError"), i = /* @__PURE__ */ c((s) => {
    s.detail.sourceId === n && e.onLoading && e.onLoading();
  }, "handleLoading");
  return document.addEventListener(U.LOADED, t), document.addEventListener(U.ERROR, r), document.addEventListener(U.LOADING, i), () => {
    document.removeEventListener(U.LOADED, t), document.removeEventListener(U.ERROR, r), document.removeEventListener(U.LOADING, i);
  };
}
c(We, "subscribeToSource");
var N = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, he;
let D = (he = class extends C {
  constructor() {
    super(...arguments), this.url = "", this.method = "GET", this.headers = "", this.params = "", this.refresh = 0, this.transform = "", this.paginate = !1, this.pageSize = 20, this.cacheTtl = 3600, this._loading = !1, this._error = null, this._data = null, this._currentPage = 1, this._refreshInterval = null, this._abortController = null, this._unsubscribePageRequests = null;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return h``;
  }
  connectedCallback() {
    super.connectedCallback(), V("gouv-source"), this._setupRefresh(), this._setupPageRequestListener();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && (He(this.id), Ot(this.id));
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
        const e = Xr(this._buildUrl()), t = this._buildFetchOptions(), r = await fetch(e, {
          ...t,
          signal: this._abortController.signal
        });
        if (!r.ok)
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        const i = await r.json();
        this.paginate && i.meta && Me(this.id, {
          page: i.meta.page ?? this._currentPage,
          pageSize: i.meta.page_size ?? this.pageSize,
          total: i.meta.total ?? 0
        }), this.transform ? this._data = S(i, this.transform) : this.paginate && i.data && !this.transform ? this._data = i.data : this._data = i, L(this.id, this._data), this.cacheTtl > 0 && or() && this._putCache(this._data).catch(() => {
        });
      } catch (e) {
        if (e.name === "AbortError")
          return;
        if (this.cacheTtl > 0 && or()) {
          const t = await this._getCache();
          if (t) {
            this._data = t, L(this.id, this._data), this.dispatchEvent(new CustomEvent("cache-fallback", { detail: { sourceId: this.id } }));
            return;
          }
        }
        this._error = e, J(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, e);
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
    this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null), this.paginate && this.id && (this._unsubscribePageRequests = Nt(this.id, (e) => {
      e.page !== void 0 && e.page !== this._currentPage && (this._currentPage = e.page, this._fetchData());
    }));
  }
  async _putCache(e) {
    const t = Array.isArray(e) ? e.length : 1;
    await fetch(`/api/cache/${encodeURIComponent(this.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ data: e, recordCount: t, ttlSeconds: this.cacheTtl })
    });
  }
  async _getCache() {
    try {
      const e = await fetch(`/api/cache/${encodeURIComponent(this.id)}`, {
        credentials: "include"
      });
      return e.ok ? (await e.json()).data ?? null : null;
    } catch {
      return null;
    }
  }
  reload() {
    this._fetchData();
  }
  getData() {
    return this._data;
  }
  isLoading() {
    return this._loading;
  }
  getError() {
    return this._error;
  }
}, c(he, "GouvSource"), he);
N([
  u({ type: String })
], D.prototype, "url", void 0);
N([
  u({ type: String })
], D.prototype, "method", void 0);
N([
  u({ type: String })
], D.prototype, "headers", void 0);
N([
  u({ type: String })
], D.prototype, "params", void 0);
N([
  u({ type: Number })
], D.prototype, "refresh", void 0);
N([
  u({ type: String })
], D.prototype, "transform", void 0);
N([
  u({ type: Boolean })
], D.prototype, "paginate", void 0);
N([
  u({ type: Number, attribute: "page-size" })
], D.prototype, "pageSize", void 0);
N([
  u({ type: Number, attribute: "cache-ttl" })
], D.prototype, "cacheTtl", void 0);
N([
  _()
], D.prototype, "_loading", void 0);
N([
  _()
], D.prototype, "_error", void 0);
N([
  _()
], D.prototype, "_data", void 0);
D = N([
  M("gouv-source")
], D);
const Gt = class Gt {
  constructor() {
    this.type = "generic", this.capabilities = {
      serverFetch: !1,
      serverFacets: !1,
      serverSearch: !1,
      serverGroupBy: !1,
      serverOrderBy: !1,
      whereFormat: "odsql"
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
c(Gt, "GenericAdapter");
let Pt = Gt;
function pt(n, e) {
  const t = {};
  return e && (t.signal = e), n.headers && Object.keys(n.headers).length > 0 && (t.headers = n.headers), t;
}
c(pt, "buildFetchOptions$1");
const Xe = 100, ft = 10, Vt = class Vt {
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
    const i = e.limit <= 0 ? ft * Xe : e.limit, s = Xe;
    let a = [], o = 0, l = -1;
    for (let d = 0; d < ft; d++) {
      const p = i - a.length;
      if (p <= 0)
        break;
      const f = this.buildUrl(e, Math.min(s, p), o), g = await fetch(f, pt(e, t));
      if (!g.ok)
        throw new Error(`HTTP ${g.status}: ${g.statusText}`);
      const b = await g.json(), E = b.results || [];
      if (a = a.concat(E), typeof b.total_count == "number" && (l = b.total_count), l >= 0 && a.length >= l || E.length < s)
        break;
      o += E.length;
    }
    return l >= 0 && a.length < l && a.length < i && console.warn(`gouv-query: pagination incomplete - ${a.length}/${l} resultats recuperes (limite de securite: ${ft} pages de ${Xe})`), {
      data: a,
      totalCount: l >= 0 ? l : a.length,
      needsClientProcessing: !1
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(e, t, r) {
    const i = this.buildServerSideUrl(e, t), s = await fetch(i, pt(e, r));
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
      const o = e.orderBy.replace(/:(\w+)$/, (l, d) => ` ${d.toUpperCase()}`);
      s.searchParams.set("order_by", o);
    }
    return t !== void 0 ? s.searchParams.set("limit", String(t)) : e.limit > 0 && s.searchParams.set("limit", String(Math.min(e.limit, Xe))), r && r > 0 && s.searchParams.set("offset", String(r)), s.toString();
  }
  /**
   * Construit l'URL ODS en mode server-side (une seule page).
   */
  buildServerSideUrl(e, t) {
    const r = e.baseUrl || "https://data.opendatasoft.com", i = new URL(`${r}/api/explore/v2.1/catalog/datasets/${e.datasetId}/records`);
    e.select ? i.searchParams.set("select", e.select) : e.aggregate && e.groupBy && i.searchParams.set("select", this._buildSelectFromAggregate(e)), t.effectiveWhere && i.searchParams.set("where", t.effectiveWhere), e.groupBy && i.searchParams.set("group_by", e.groupBy);
    const s = t.orderBy;
    if (s) {
      const o = s.replace(/:(\w+)$/, (l, d) => ` ${d.toUpperCase()}`);
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
    for (const p of t)
      a.searchParams.append("facet", p);
    r && a.searchParams.set("where", r);
    const o = await fetch(a.toString(), pt(e, i));
    if (!o.ok)
      throw new Error(`HTTP ${o.status}: ${o.statusText}`);
    const l = await o.json(), d = [];
    for (const p of l.facets || [])
      d.push({
        field: p.name,
        values: (p.facets || []).map((f) => ({
          value: f.value,
          count: f.count
        }))
      });
    return d;
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
c(Vt, "OpenDataSoftAdapter");
let xt = Vt;
function pr(n, e) {
  const t = {};
  return e && (t.signal = e), n.headers && Object.keys(n.headers).length > 0 && (t.headers = n.headers), t;
}
c(pr, "buildFetchOptions");
const Ze = 100, gt = 500, Ht = class Ht {
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
    const r = e.limit <= 0, i = r ? gt * Ze : e.limit;
    let s = [], a = -1, o = 1;
    for (let d = 0; d < gt && !(i - s.length <= 0); d++) {
      const f = this.buildUrl(e, Ze, o), g = await fetch(f, pr(e, t));
      if (!g.ok)
        throw new Error(`HTTP ${g.status}: ${g.statusText}`);
      const b = await g.json(), E = b.data || [];
      s = s.concat(E), b.meta && typeof b.meta.total == "number" && (a = b.meta.total);
      let oe = !1;
      if ((l = b.links) != null && l.next)
        try {
          const I = new URL(b.links.next, "https://tabular-api.data.gouv.fr"), Wt = Number(I.searchParams.get("page"));
          Wt > 0 && (o = Wt, oe = !0);
        } catch {
        }
      if (!oe || a >= 0 && s.length >= a || E.length < Ze)
        break;
    }
    return !r && s.length > i && (s = s.slice(0, i)), a >= 0 && s.length < a && s.length < i && console.warn(`gouv-query: pagination incomplete - ${s.length}/${a} resultats recuperes (limite de securite: ${gt} pages de ${Ze})`), {
      data: s,
      totalCount: a >= 0 ? a : s.length,
      needsClientProcessing: !0
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(e, t, r) {
    var d;
    const i = this.buildServerSideUrl(e, t), s = await fetch(i, pr(e, r));
    if (!s.ok)
      throw new Error(`HTTP ${s.status}: ${s.statusText}`);
    const a = await s.json(), o = a.data || [], l = ((d = a.meta) == null ? void 0 : d.total) ?? 0;
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
    if (o && this._applyColonFilters(a, o), e.groupBy) {
      const l = e.groupBy.split(",").map((d) => d.trim());
      for (const d of l)
        a.searchParams.append(`${d}__groupby`, "");
    }
    if (e.aggregate) {
      const l = e.aggregate.split(",").map((d) => d.trim());
      for (const d of l) {
        const p = d.split(":");
        if (p.length >= 2) {
          const f = p[0], g = p[1];
          a.searchParams.append(`${f}__${g}`, "");
        }
      }
    }
    if (e.orderBy) {
      const l = e.orderBy.split(":"), d = l[0], p = l[1] || "asc";
      a.searchParams.set(`${d}__sort`, p);
    }
    return t ? a.searchParams.set("page_size", String(t)) : e.limit > 0 && a.searchParams.set("page_size", String(e.limit)), r && a.searchParams.set("page", String(r)), a.toString();
  }
  /**
   * Construit l'URL Tabular en mode server-side (une seule page).
   */
  buildServerSideUrl(e, t) {
    const r = this._getBaseUrl(e), i = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, s = new URL(`${r}/api/resources/${e.resource}/data/`, i), a = t.effectiveWhere || e.filter || e.where;
    a && this._applyColonFilters(s, a);
    const o = t.orderBy;
    if (o) {
      const l = o.split(":"), d = l[0], p = l[1] || "asc";
      s.searchParams.set(`${d}__sort`, p);
    }
    return s.searchParams.set("page_size", String(e.pageSize)), s.searchParams.set("page", String(t.page)), s.toString();
  }
  /**
   * Applique des filtres colon-syntax (field:op:value, ...) comme query params.
   */
  _applyColonFilters(e, t) {
    const r = t.split(",").map((i) => i.trim());
    for (const i of r) {
      const s = i.split(":");
      if (s.length >= 3) {
        const a = s[0], o = this._mapOperator(s[1]), l = s.slice(2).join(":");
        e.searchParams.set(`${a}__${o}`, l);
      }
    }
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
    const t = xr();
    return `${t.baseUrl}${t.endpoints.tabular}`;
  }
};
c(Ht, "TabularAdapter");
let Ct = Ht;
const Rr = /* @__PURE__ */ new Map([
  ["generic", new Pt()],
  ["opendatasoft", new xt()],
  ["tabular", new Ct()]
]);
function _t(n) {
  const e = Rr.get(n);
  if (!e)
    throw new Error(`Type d'API non supporte: ${n}`);
  return e;
}
c(_t, "getAdapter");
function Ci(n) {
  Rr.set(n.type, n);
}
c(Ci, "registerAdapter");
var P = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, pe;
let y = (pe = class extends C {
  constructor() {
    super(...arguments), this.apiType = "generic", this.source = "", this.baseUrl = "", this.datasetId = "", this.resource = "", this.select = "", this.where = "", this.filter = "", this.groupBy = "", this.aggregate = "", this.orderBy = "", this.limit = 0, this.transform = "", this.serverSide = !1, this.pageSize = 20, this.headers = "", this.refresh = 0, this._loading = !1, this._error = null, this._data = [], this._rawData = [], this._adapter = _t("generic"), this._refreshInterval = null, this._abortController = null, this._unsubscribe = null, this._unsubscribeCommands = null, this._serverPage = 1, this._serverWheres = /* @__PURE__ */ new Map(), this._serverOrderBy = "";
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return h``;
  }
  connectedCallback() {
    super.connectedCallback(), V("gouv-query", this.apiType), this._adapter = _t(this.apiType), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && (He(this.id), Ot(this.id));
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
    ].some((r) => e.has(r)) && (e.has("apiType") && (this._adapter = _t(this.apiType)), this.serverSide && [
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
    const e = Fe(this.source);
    e !== void 0 && (this._rawData = Array.isArray(e) ? e : [e], this._processClientSide()), this._unsubscribe = We(this.source, {
      onLoaded: /* @__PURE__ */ c((t) => {
        this._rawData = Array.isArray(t) ? t : [t], this._processClientSide();
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ c(() => {
        this._loading = !0, Q(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ c((t) => {
        this._error = t, this._loading = !1, J(this.id, t);
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
      t && (e = this._applyFilters(e, t)), this.groupBy && (e = this._applyGroupByAndAggregate(e)), this.orderBy && (e = this._applySort(e)), this.limit > 0 && (e = e.slice(0, this.limit)), this._data = e, L(this.id, this._data);
    } catch (e) {
      this._error = e, J(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de traitement`, e);
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
          const d = s.slice(2).join(":");
          o === "in" || o === "notin" ? l = d.split("|").map((p) => {
            const f = this._parseValue(p);
            return typeof f == "boolean" ? String(f) : f;
          }) : l = this._parseValue(d);
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
    const r = S(e, t.field);
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
      const o = t.map((l) => String(S(a, l) ?? "")).join("|||");
      i.has(o) || i.set(o, []), i.get(o).push(a);
    }
    const s = [];
    for (const [a, o] of i) {
      const l = {}, d = a.split("|||");
      t.forEach((p, f) => {
        ar(l, p, d[f]);
      });
      for (const p of r) {
        const f = p.alias || `${p.field}__${p.function}`;
        ar(l, f, this._computeAggregate(o, p));
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
    const r = e.map((i) => Number(S(i, t.field))).filter((i) => !isNaN(i));
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
      const o = S(s, r), l = S(a, r), d = Number(o), p = Number(l);
      if (!isNaN(d) && !isNaN(p))
        return i === "desc" ? p - d : d - p;
      const f = String(o ?? ""), g = String(l ?? "");
      return i === "desc" ? g.localeCompare(f) : f.localeCompare(g);
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
    } catch (r) {
      if (r.name === "AbortError")
        return;
      this._error = r, J(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de requete API`, r);
    } finally {
      this._loading = !1;
    }
  }
  /**
   * Fetch toutes les donnees avec pagination automatique via l'adapter.
   */
  async _fetchAllDelegated() {
    const e = await this._adapter.fetchAll(this._getAdapterParams(), this._abortController.signal);
    e.needsClientProcessing ? (this._rawData = e.data, this._processClientSide()) : (this._data = this.transform ? S(e.data, this.transform) : e.data, L(this.id, this._data));
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
      const i = t.rawJson || r, s = S(i, this.transform);
      r = Array.isArray(s) ? s : [s];
    }
    Me(this.id, {
      page: this._serverPage,
      pageSize: this.pageSize,
      total: t.totalCount
    }), this._data = r, L(this.id, this._data);
  }
  /**
   * Fetch single page fallback (mode non-pagine)
   */
  async _fetchSinglePage() {
    const e = this._getAdapterParams(), t = this._adapter.buildUrl(e), r = { signal: this._abortController.signal };
    e.headers && Object.keys(e.headers).length > 0 && (r.headers = e.headers);
    const i = await fetch(t, r);
    if (!i.ok)
      throw new Error(`HTTP ${i.status}: ${i.statusText}`);
    const s = await i.json();
    let a = this.transform ? S(s, this.transform) : s;
    Array.isArray(a) || (this._adapter.type === "tabular" && s.data ? a = s.data : a = [a]), this._data = a, L(this.id, this._data);
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
    this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), !(!this.serverSide || !this.id) && (this._unsubscribeCommands = Nt(this.id, (e) => {
      let t = !1;
      if (e.page !== void 0 && e.page !== this._serverPage && (this._serverPage = e.page, t = !0), e.where !== void 0) {
        const r = e.whereKey || "_default", i = this._getMergedWhere();
        e.where ? this._serverWheres.set(r, e.where) : this._serverWheres.delete(r), this._getMergedWhere() !== i && (e.page === void 0 && (this._serverPage = 1), t = !0);
      }
      e.orderBy !== void 0 && e.orderBy !== this._serverOrderBy && (this._serverOrderBy = e.orderBy, e.page === void 0 && (this._serverPage = 1), t = !0), t && this._fetchFromApi();
    }));
  }
  /**
   * Retourne le separateur de clauses WHERE selon le format de l'adapter.
   * ODSQL: ' AND ', colon: ', '
   */
  _getWhereSeparator() {
    return this._adapter.capabilities.whereFormat === "colon" ? ", " : " AND ";
  }
  /**
   * Retourne le where dynamique fusionne de toutes les sources (search, facets, etc.)
   */
  _getMergedWhere() {
    return [...this._serverWheres.values()].filter(Boolean).join(this._getWhereSeparator());
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
    return t.join(this._getWhereSeparator());
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
}, c(pe, "GouvQuery"), pe);
P([
  u({ type: String, attribute: "api-type" })
], y.prototype, "apiType", void 0);
P([
  u({ type: String })
], y.prototype, "source", void 0);
P([
  u({ type: String, attribute: "base-url" })
], y.prototype, "baseUrl", void 0);
P([
  u({ type: String, attribute: "dataset-id" })
], y.prototype, "datasetId", void 0);
P([
  u({ type: String })
], y.prototype, "resource", void 0);
P([
  u({ type: String })
], y.prototype, "select", void 0);
P([
  u({ type: String })
], y.prototype, "where", void 0);
P([
  u({ type: String })
], y.prototype, "filter", void 0);
P([
  u({ type: String, attribute: "group-by" })
], y.prototype, "groupBy", void 0);
P([
  u({ type: String })
], y.prototype, "aggregate", void 0);
P([
  u({ type: String, attribute: "order-by" })
], y.prototype, "orderBy", void 0);
P([
  u({ type: Number })
], y.prototype, "limit", void 0);
P([
  u({ type: String })
], y.prototype, "transform", void 0);
P([
  u({ type: Boolean, attribute: "server-side" })
], y.prototype, "serverSide", void 0);
P([
  u({ type: Number, attribute: "page-size" })
], y.prototype, "pageSize", void 0);
P([
  u({ type: String })
], y.prototype, "headers", void 0);
P([
  u({ type: Number })
], y.prototype, "refresh", void 0);
P([
  _()
], y.prototype, "_loading", void 0);
P([
  _()
], y.prototype, "_error", void 0);
P([
  _()
], y.prototype, "_data", void 0);
P([
  _()
], y.prototype, "_rawData", void 0);
y = P([
  M("gouv-query")
], y);
var q = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, fe;
let B = (fe = class extends C {
  constructor() {
    super(...arguments), this.source = "", this.numeric = "", this.numericAuto = !1, this.rename = "", this.trim = !1, this.stripHtml = !1, this.replace = "", this.flatten = "", this.lowercaseKeys = !1, this._unsubscribe = null, this._unsubscribePageRequests = null;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return h``;
  }
  connectedCallback() {
    super.connectedCallback(), V("gouv-normalize"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null), this.id && (He(this.id), Ot(this.id));
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    if (["flatten", "numeric", "numericAuto", "rename", "trim", "stripHtml", "replace", "lowercaseKeys"].some((i) => e.has(i))) {
      const i = this.source ? Fe(this.source) : void 0;
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
    const e = Fe(this.source);
    e !== void 0 && this._processData(e), this._unsubscribe = We(this.source, {
      onLoaded: /* @__PURE__ */ c((t) => {
        this._processData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ c(() => {
        Q(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ c((t) => {
        J(this.id, t);
      }, "onError")
    }), this._unsubscribePageRequests = Nt(this.id, (t) => {
      K(this.source, t);
    });
  }
  _processData(e) {
    try {
      Q(this.id);
      let t = Array.isArray(e) ? e : [e];
      this.flatten && (t = t.map((l) => l == null || typeof l != "object" || Array.isArray(l) ? l : this._flattenRow(l, this.flatten)));
      const r = this._parseNumericFields(), i = this._parsePipeMap(this.rename), s = this._parsePipeMap(this.replace), a = t.map((l) => l == null || typeof l != "object" ? l : this._normalizeRow(l, r, i, s));
      L(this.id, a);
      const o = De(this.source);
      o && Me(this.id, o);
    } catch (t) {
      J(this.id, t), console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`, t);
    }
  }
  _normalizeRow(e, t, r, i) {
    const s = {};
    for (const [a, o] of Object.entries(e)) {
      const l = this.trim ? a.trim() : a;
      let d = o;
      if (this.trim && typeof d == "string" && (d = d.trim()), this.stripHtml && typeof d == "string" && (d = d.replace(/<[^>]*>/g, "")), i.size > 0 && typeof d == "string") {
        for (const [g, b] of i)
          if (d === g) {
            d = b;
            break;
          }
      }
      if (t.has(l))
        d = nr(d);
      else if (this.numericAuto && typeof d == "string" && Jr(d)) {
        const g = nr(d, !0);
        g !== null && (d = g);
      }
      const p = r.get(l) ?? l, f = this.lowercaseKeys ? p.toLowerCase() : p;
      s[f] = d;
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
}, c(fe, "GouvNormalize"), fe);
q([
  u({ type: String })
], B.prototype, "source", void 0);
q([
  u({ type: String })
], B.prototype, "numeric", void 0);
q([
  u({ type: Boolean, attribute: "numeric-auto" })
], B.prototype, "numericAuto", void 0);
q([
  u({ type: String })
], B.prototype, "rename", void 0);
q([
  u({ type: Boolean })
], B.prototype, "trim", void 0);
q([
  u({ type: Boolean, attribute: "strip-html" })
], B.prototype, "stripHtml", void 0);
q([
  u({ type: String })
], B.prototype, "replace", void 0);
q([
  u({ type: String })
], B.prototype, "flatten", void 0);
q([
  u({ type: Boolean, attribute: "lowercase-keys" })
], B.prototype, "lowercaseKeys", void 0);
B = q([
  M("gouv-normalize")
], B);
var w = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, ge;
let v = (ge = class extends C {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.labels = "", this.maxValues = 6, this.disjunctive = "", this.sort = "count", this.searchable = "", this.hideEmpty = !1, this.display = "", this.urlParams = !1, this.urlParamMap = "", this.urlSync = !1, this.serverFacets = !1, this.staticValues = "", this.hideCounts = !1, this.cols = "", this._rawData = [], this._facetGroups = [], this._activeSelections = {}, this._expandedFacets = /* @__PURE__ */ new Set(), this._searchQueries = {}, this._openMultiselectField = null, this._unsubscribe = null, this._popstateHandler = null, this._urlParamsApplied = !1, this._onClickOutsideMultiselect = (e) => {
      if (!this._openMultiselectField)
        return;
      const t = e.target, r = this.querySelector(`[data-multiselect="${this._openMultiselectField}"]`);
      r && !r.contains(t) && (this._openMultiselectField = null);
    };
  }
  /** Compteurs effectivement masques (force a true en mode static-values) */
  get _effectiveHideCounts() {
    return this.hideCounts || !!this.staticValues;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), V("gouv-facets"), this._initialize(), document.addEventListener("click", this._onClickOutsideMultiselect), this.urlSync && (this._popstateHandler = () => {
      this._applyUrlParams(), this._buildFacetGroups(), this._applyFilters();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._onClickOutsideMultiselect), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && He(this.id);
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    if (e.has("serverFacets") || e.has("staticValues")) {
      this._initialize();
      return;
    }
    ["fields", "labels", "sort", "hideEmpty", "maxValues", "disjunctive", "searchable", "display", "cols"].some((i) => e.has(i)) && this._rawData.length > 0 && (this.serverFacets ? this._fetchServerFacets() : this.staticValues ? this._buildStaticFacetGroups() : (this._buildFacetGroups(), this._applyFilters()));
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
    const e = Fe(this.source);
    e !== void 0 && this._onData(e), this._unsubscribe = We(this.source, {
      onLoaded: /* @__PURE__ */ c((t) => {
        this._onData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ c(() => {
        Q(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ c((t) => {
        J(this.id, t);
      }, "onError")
    });
  }
  _onData(e) {
    this._rawData = Array.isArray(e) ? e : [];
    const t = this.serverFacets || !!this.staticValues;
    if (this.urlParams && !this._urlParamsApplied && (this._applyUrlParams(), this._urlParamsApplied = !0, t && this._hasActiveSelections())) {
      this._dispatchFacetCommand();
      return;
    }
    if (this.serverFacets) {
      if (this._fetchServerFacets(), this.id) {
        const r = De(this.source);
        r && Me(this.id, r), L(this.id, this._rawData);
      }
    } else if (this.staticValues) {
      if (this._buildStaticFacetGroups(), this.id) {
        const r = De(this.source);
        r && Me(this.id, r), L(this.id, this._rawData);
      }
    } else
      this._buildFacetGroups(), this._applyFilters();
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
  /**
   * Build facet groups from static-values attribute (pre-computed values).
   * Values are displayed without counts (count=0, hidden via hideCounts).
   */
  _buildStaticFacetGroups() {
    if (this.staticValues)
      try {
        const e = JSON.parse(this.staticValues), t = this._parseLabels(), r = this.fields ? Le(this.fields) : Object.keys(e);
        this._facetGroups = r.filter((i) => e[i] && e[i].length > 0).map((i) => ({
          field: i,
          label: t.get(i) ?? i,
          values: e[i].map((s) => ({ value: s, count: 0 }))
        })).filter((i) => !(this.hideEmpty && i.values.length <= 1));
      } catch {
        console.warn("gouv-facets: static-values invalide (JSON attendu)");
      }
  }
  /** Build colon-syntax where clause for all active facet selections */
  _buildColonFacetWhere() {
    const e = [];
    for (const [t, r] of Object.entries(this._activeSelections))
      r.size !== 0 && (r.size === 1 ? e.push(`${t}:eq:${[...r][0]}`) : e.push(`${t}:in:${[...r].join("|")}`));
    return e.join(", ");
  }
  /** Resolve a possibly dotted field path on a row (e.g. "fields.Region") */
  _resolveValue(e, t) {
    if (!t.includes("."))
      return e[t];
    const r = t.split(".");
    let i = e;
    for (const s of r) {
      if (i == null || typeof i != "object")
        return;
      i = i[s];
    }
    return i;
  }
  /** Get fields to use as facets — explicit or auto-detected */
  _getFields() {
    return this.fields ? Le(this.fields) : this._autoDetectFields();
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
      const a = this._resolveValue(s, e);
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
      const s = this._activeSelections[i], a = this._resolveValue(r, i);
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
    var f, g;
    const e = document.getElementById(this.source);
    if (!e)
      return;
    const t = (f = e.getAdapter) == null ? void 0 : f.call(e);
    if (!(t != null && t.capabilities.serverFacets) || !t.fetchFacets) {
      this._buildFacetGroups(), this._applyFilters();
      return;
    }
    const r = e.baseUrl || e.getAttribute("base-url") || "", i = e.datasetId || e.getAttribute("dataset-id") || "";
    if (!i)
      return;
    let s;
    const a = e.headers || e.getAttribute("headers") || "";
    if (a)
      try {
        s = JSON.parse(a);
      } catch {
      }
    const o = Le(this.fields);
    if (o.length === 0)
      return;
    const l = this._parseLabels(), d = /* @__PURE__ */ new Map();
    for (const b of o) {
      const E = ((g = e.getEffectiveWhere) == null ? void 0 : g.call(e, this.id)) || "", oe = this._buildFacetWhereExcluding(b), I = [E, oe].filter(Boolean).join(" AND ");
      d.has(I) || d.set(I, []), d.get(I).push(b);
    }
    const p = [];
    for (const [b, E] of d)
      try {
        const oe = await t.fetchFacets({ baseUrl: r, datasetId: i, headers: s }, E, b);
        for (const I of oe)
          p.push({
            field: I.field,
            label: l.get(I.field) ?? I.field,
            values: this._sortValues(I.values)
          });
      } catch {
      }
    this._facetGroups = o.map((b) => p.find((E) => E.field === b)).filter((b) => !!b).filter((b) => !(this.hideEmpty && b.values.length <= 1));
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
    const e = this.staticValues ? this._buildColonFacetWhere() : this._buildFullFacetWhere();
    K(this.source, { where: e, whereKey: this.id });
  }
  // --- Filtering ---
  _applyFilters() {
    const e = Object.keys(this._activeSelections).filter((r) => this._activeSelections[r].size > 0);
    let t;
    e.length === 0 ? t = this._rawData : t = this._rawData.filter((r) => e.every((i) => {
      const s = this._activeSelections[i], a = this._resolveValue(r, i);
      return a == null ? !1 : s.has(String(a));
    })), L(this.id, t);
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
  /** Parse cols attribute: returns global col size or per-field map */
  _parseCols() {
    if (!this.cols)
      return null;
    const e = this.cols.trim();
    if (/^\d+$/.test(e))
      return { global: parseInt(e, 10) };
    const t = /* @__PURE__ */ new Map(), r = e.split("|");
    for (const i of r) {
      const s = i.indexOf(":");
      if (s === -1)
        continue;
      const a = i.substring(0, s).trim(), o = parseInt(i.substring(s + 1).trim(), 10);
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
    const r = { ...this._activeSelections }, i = new Set(r[e] ?? []), s = this._getDisplayMode(e), a = Le(this.disjunctive), o = s === "multiselect" || s === "checkbox" && a.includes(e);
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
    this._openMultiselectField === e ? this._openMultiselectField = null : (this._openMultiselectField = e, this.updateComplete.then(() => {
      const t = this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-panel`), r = t == null ? void 0 : t.querySelector("button, input, select, [tabindex]");
      r == null || r.focus();
    }));
  }
  _handleMultiselectKeydown(e, t) {
    if (t.key === "Escape") {
      this._openMultiselectField = null;
      const r = this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-trigger`);
      r == null || r.focus();
    }
  }
  _handleMultiselectFocusout(e, t) {
    if (this._openMultiselectField !== e)
      return;
    const r = t.relatedTarget;
    if (!r)
      return;
    const i = this.querySelector(`[data-multiselect="${e}"]`);
    i != null && i.contains(r) || (this._openMultiselectField = null);
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
  /** Common logic after any selection change — routes to client, server, or static mode */
  _afterSelectionChange() {
    this.serverFacets || this.staticValues ? this._dispatchFacetCommand() : (this._buildFacetGroups(), this._applyFilters()), this.urlSync && this._syncUrl();
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
    const e = Object.keys(this._activeSelections).some((r) => this._activeSelections[r].size > 0), t = !!this.cols;
    return h`
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
        ${e ? h`
          <div class="gouv-facets__header">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line" type="button" @click="${this._clearAll}">
              Reinitialiser les filtres
            </button>
          </div>
        ` : m}
        ${t ? h`
          <div class="fr-grid-row fr-grid-row--gutters">
            ${this._facetGroups.map((r) => h`
              <div class="${this._getColClass(r.field)}">
                ${this._renderFacetGroup(r)}
              </div>
            `)}
          </div>
        ` : h`
          <div class="gouv-facets__groups">
            ${this._facetGroups.map((r) => this._renderFacetGroup(r))}
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
    const r = Le(this.searchable).includes(e.field), i = (this._searchQueries[e.field] ?? "").toLowerCase(), s = this._expandedFacets.has(e.field), a = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set();
    let o = e.values;
    r && i && (o = o.filter((f) => f.value.toLowerCase().includes(i)));
    const l = s ? o : o.slice(0, this.maxValues), d = o.length > this.maxValues, p = `facet-${this.id}-${e.field}`;
    return h`
      <fieldset class="fr-fieldset gouv-facets__group" aria-labelledby="${p}-legend">
        <legend class="fr-fieldset__legend fr-text--bold" id="${p}-legend">${e.label}</legend>
        ${r ? h`
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(f) => this._handleSearch(e.field, f)}"
                aria-label="Rechercher dans ${e.label}">
            </div>
          </div>
        ` : m}
        ${l.map((f) => {
      const g = `${p}-${f.value.replace(/[^a-zA-Z0-9]/g, "_")}`, b = a.has(f.value);
      return h`
            <div class="fr-fieldset__element">
              <div class="fr-checkbox-group fr-checkbox-group--sm">
                <input type="checkbox" id="${g}"
                  .checked="${b}"
                  @change="${() => this._toggleValue(e.field, f.value)}">
                <label class="fr-label" for="${g}">
                  ${f.value}${this._effectiveHideCounts ? m : h` <span class="gouv-facets__count">${f.count}</span>`}
                </label>
              </div>
            </div>
          `;
    })}
        ${d ? h`
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
    return h`
      <div class="gouv-facets__group fr-select-group" data-field="${e.field}">
        <label class="fr-label" for="${t}-select">${e.label}</label>
        <select class="fr-select" id="${t}-select"
          @change="${(s) => this._handleSelectChange(e.field, s)}">
          <option value="" ?selected="${!i}">Tous</option>
          ${e.values.map((s) => h`
            <option value="${s.value}" ?selected="${s.value === i}">
              ${this._effectiveHideCounts ? s.value : `${s.value} (${s.count})`}
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
    return h`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}"
           @keydown="${(l) => this._handleMultiselectKeydown(e.field, l)}"
           @focusout="${(l) => this._handleMultiselectFocusout(e.field, l)}">
        <label class="fr-label" id="${t}-legend">${e.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${i}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          @click="${(l) => {
      l.stopPropagation(), this._toggleMultiselectDropdown(e.field);
    }}">
          ${o}
        </button>
        ${i ? h`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-label="${e.label}"
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
      const d = `${t}-${l.value.replace(/[^a-zA-Z0-9]/g, "_")}`, p = r.has(l.value);
      return h`
                  <div class="fr-fieldset__element">
                    <div class="fr-checkbox-group fr-checkbox-group--sm">
                      <input type="checkbox" id="${d}"
                        .checked="${p}"
                        @change="${() => this._toggleValue(e.field, l.value)}">
                      <label class="fr-label" for="${d}">
                        ${l.value}${this._effectiveHideCounts ? m : h` <span class="gouv-facets__count">${l.count}</span>`}
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
    s && (a = a.filter((d) => d.value.toLowerCase().includes(s)));
    const o = r.size > 0 ? [...r][0] : null, l = o ?? "Selectionnez une option";
    return h`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}"
           @keydown="${(d) => this._handleMultiselectKeydown(e.field, d)}"
           @focusout="${(d) => this._handleMultiselectFocusout(e.field, d)}">
        <label class="fr-label" id="${t}-legend">${e.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${i}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          @click="${(d) => {
      d.stopPropagation(), this._toggleMultiselectDropdown(e.field);
    }}">
          ${l}
        </button>
        ${i ? h`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-label="${e.label}"
               @click="${(d) => d.stopPropagation()}">
            ${o ? h`
              <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line gouv-facets__multiselect-toggle"
                type="button"
                @click="${() => this._clearFieldSelections(e.field)}">
                Reinitialiser
              </button>
            ` : m}
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${e.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(d) => this._handleSearch(e.field, d)}">
              <button class="fr-btn" type="button" title="Rechercher" aria-label="Rechercher">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${e.label}">
              ${a.map((d) => {
      const p = `${t}-${d.value.replace(/[^a-zA-Z0-9]/g, "_")}`, f = r.has(d.value);
      return h`
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-group--sm">
                      <input type="radio" id="${p}" name="${t}-radio"
                        .checked="${f}"
                        @change="${() => this._toggleValue(e.field, d.value)}">
                      <label class="fr-label" for="${p}">
                        ${d.value}${this._effectiveHideCounts ? m : h` <span class="gouv-facets__count">${d.count}</span>`}
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
}, c(ge, "GouvFacets"), ge);
w([
  u({ type: String })
], v.prototype, "source", void 0);
w([
  u({ type: String })
], v.prototype, "fields", void 0);
w([
  u({ type: String })
], v.prototype, "labels", void 0);
w([
  u({ type: Number, attribute: "max-values" })
], v.prototype, "maxValues", void 0);
w([
  u({ type: String })
], v.prototype, "disjunctive", void 0);
w([
  u({ type: String })
], v.prototype, "sort", void 0);
w([
  u({ type: String })
], v.prototype, "searchable", void 0);
w([
  u({ type: Boolean, attribute: "hide-empty" })
], v.prototype, "hideEmpty", void 0);
w([
  u({ type: String })
], v.prototype, "display", void 0);
w([
  u({ type: Boolean, attribute: "url-params" })
], v.prototype, "urlParams", void 0);
w([
  u({ type: String, attribute: "url-param-map" })
], v.prototype, "urlParamMap", void 0);
w([
  u({ type: Boolean, attribute: "url-sync" })
], v.prototype, "urlSync", void 0);
w([
  u({ type: Boolean, attribute: "server-facets" })
], v.prototype, "serverFacets", void 0);
w([
  u({ type: String, attribute: "static-values" })
], v.prototype, "staticValues", void 0);
w([
  u({ type: Boolean, attribute: "hide-counts" })
], v.prototype, "hideCounts", void 0);
w([
  u({ type: String })
], v.prototype, "cols", void 0);
w([
  _()
], v.prototype, "_rawData", void 0);
w([
  _()
], v.prototype, "_facetGroups", void 0);
w([
  _()
], v.prototype, "_activeSelections", void 0);
w([
  _()
], v.prototype, "_expandedFacets", void 0);
w([
  _()
], v.prototype, "_searchQueries", void 0);
w([
  _()
], v.prototype, "_openMultiselectField", void 0);
v = w([
  M("gouv-facets")
], v);
function Le(n) {
  return n ? n.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
c(Le, "_parseCSV");
var R = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, _e;
let A = (_e = class extends C {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.placeholder = "Rechercher…", this.label = "Rechercher", this.debounce = 300, this.minLength = 0, this.highlight = !1, this.operator = "contains", this.srLabel = !1, this.count = !1, this.urlSearchParam = "", this.urlSync = !1, this.serverSearch = !1, this.searchTemplate = 'search("{q}")', this._allData = [], this._filteredData = [], this._term = "", this._resultCount = 0, this._debounceTimer = null, this._unsubscribe = null, this._urlParamApplied = !1;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), V("gouv-search"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._debounceTimer !== null && (clearTimeout(this._debounceTimer), this._debounceTimer = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && He(this.id);
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
    const e = Fe(this.source);
    e !== void 0 && this._onData(e), this._unsubscribe = We(this.source, {
      onLoaded: /* @__PURE__ */ c((t) => {
        this._onData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ c(() => {
        Q(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ c((t) => {
        J(this.id, t);
      }, "onError")
    });
  }
  _onData(e) {
    const t = Array.isArray(e) ? e : [];
    if (this.serverSearch) {
      this._allData = t, this._filteredData = t;
      const r = De(this.source);
      this._resultCount = r ? r.total : t.length, this.id && (r && Me(this.id, r), L(this.id, t)), this.urlSearchParam && !this._urlParamApplied && (this._applyUrlSearchParam(), this._urlParamApplied = !0, this._term && this._applyServerSearch());
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
    K(this.source, { where: t, whereKey: this.id }), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
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
    const r = { ...e }, i = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), s = new RegExp("(" + i + ")", "gi"), a = this._getFields(), o = a.length > 0 ? a : Object.keys(e).filter((d) => typeof e[d] == "string"), l = [];
    return o.forEach((d) => {
      typeof e[d] == "string" && l.push(e[d].replace(s, "<mark>$1</mark>"));
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
    this.id && (L(this.id, this._filteredData), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
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
    return h`
      <div class="fr-search-bar" role="search" aria-label="${this.getAttribute("aria-label") || this.label}">
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
      ${this.count ? h`
        <p class="fr-text--sm fr-mt-1v gouv-search-count" aria-live="polite">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      ` : h`
        <p class="fr-sr-only" aria-live="polite">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      `}
    `;
  }
}, c(_e, "GouvSearch"), _e);
R([
  u({ type: String })
], A.prototype, "source", void 0);
R([
  u({ type: String })
], A.prototype, "fields", void 0);
R([
  u({ type: String })
], A.prototype, "placeholder", void 0);
R([
  u({ type: String })
], A.prototype, "label", void 0);
R([
  u({ type: Number })
], A.prototype, "debounce", void 0);
R([
  u({ type: Number, attribute: "min-length" })
], A.prototype, "minLength", void 0);
R([
  u({ type: Boolean })
], A.prototype, "highlight", void 0);
R([
  u({ type: String })
], A.prototype, "operator", void 0);
R([
  u({ type: Boolean, attribute: "sr-label" })
], A.prototype, "srLabel", void 0);
R([
  u({ type: Boolean })
], A.prototype, "count", void 0);
R([
  u({ type: String, attribute: "url-search-param" })
], A.prototype, "urlSearchParam", void 0);
R([
  u({ type: Boolean, attribute: "url-sync" })
], A.prototype, "urlSync", void 0);
R([
  u({ type: Boolean, attribute: "server-search" })
], A.prototype, "serverSearch", void 0);
R([
  u({ type: String, attribute: "search-template" })
], A.prototype, "searchTemplate", void 0);
R([
  _()
], A.prototype, "_allData", void 0);
R([
  _()
], A.prototype, "_filteredData", void 0);
R([
  _()
], A.prototype, "_term", void 0);
R([
  _()
], A.prototype, "_resultCount", void 0);
A = R([
  M("gouv-search")
], A);
function nt(n) {
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
      const s = Fe(i);
      s !== void 0 && (this._sourceData = s, this.onSourceData(s)), this._unsubscribeSource = We(i, {
        onLoaded: /* @__PURE__ */ c((a) => {
          this._sourceData = a, this._sourceLoading = !1, this._sourceError = null, this.onSourceData(a), this.requestUpdate();
        }, "onLoaded"),
        onLoading: /* @__PURE__ */ c(() => {
          this._sourceLoading = !0, this.requestUpdate();
        }, "onLoading"),
        onError: /* @__PURE__ */ c((a) => {
          this._sourceError = a, this._sourceLoading = !1, this.requestUpdate();
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
c(nt, "SourceSubscriberMixin");
function fr(n, e = "nombre") {
  if (n == null || n === "")
    return "—";
  const t = typeof n == "string" ? parseFloat(n) : n;
  if (isNaN(t))
    return "—";
  switch (e) {
    case "nombre":
      return gr(t);
    case "pourcentage":
      return pi(t);
    case "euro":
      return fi(t);
    case "decimal":
      return gi(t);
    default:
      return gr(t);
  }
}
c(fr, "formatValue");
function gr(n) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(n));
}
c(gr, "formatNumber");
function pi(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(n / 100);
}
c(pi, "formatPercentage");
function fi(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n);
}
c(fi, "formatCurrency");
function gi(n) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(n);
}
c(gi, "formatDecimal");
function Ai(n) {
  const e = typeof n == "string" ? new Date(n) : n;
  return isNaN(e.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(e);
}
c(Ai, "formatDate");
function _i(n, e, t) {
  return e !== void 0 && n >= e ? "vert" : t !== void 0 && n >= t ? "orange" : e !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
c(_i, "getColorBySeuil");
function mi(n) {
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
c(mi, "parseExpression");
function _r(n, e) {
  const t = mi(e);
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
c(_r, "computeAggregation");
var j = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
const mr = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
var me;
let T = (me = class extends nt(C) {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "";
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), V("gouv-kpi");
  }
  _computeValue() {
    return !this._sourceData || !this.valeur ? null : _r(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const e = this._computeValue();
    return typeof e != "number" ? "bleu" : _i(e, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const e = _r(this._sourceData, this.tendance);
    return typeof e != "number" ? null : {
      value: e,
      direction: e > 0 ? "up" : e < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const e = this._computeValue(), t = fr(e, this.format);
    let r = `${this.label}: ${t}`;
    if (typeof e == "number" && (this.seuilVert !== void 0 || this.seuilOrange !== void 0)) {
      const i = this._getColor(), a = { vert: "bon", orange: "attention", rouge: "critique", bleu: "" }[i];
      a && (r += `, etat ${a}`);
    }
    return r;
  }
  render() {
    const e = this._computeValue(), t = fr(e, this.format), r = mr[this._getColor()] || mr.bleu, i = this._getTendanceInfo();
    return h`
      <div
        class="gouv-kpi ${r}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._sourceLoading ? h`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? h`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : h`
          <div class="gouv-kpi__content">
            ${this.icone ? h`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            ` : ""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${t}</span>
              ${i ? h`
                <span class="gouv-kpi__tendance gouv-kpi__tendance--${i.direction}" role="img" aria-label="${i.value > 0 ? `en hausse de ${Math.abs(i.value).toFixed(1)}%` : i.value < 0 ? `en baisse de ${Math.abs(i.value).toFixed(1)}%` : "stable"}">
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
}, c(me, "GouvKpi"), me);
T.styles = yr``;
j([
  u({ type: String })
], T.prototype, "source", void 0);
j([
  u({ type: String })
], T.prototype, "valeur", void 0);
j([
  u({ type: String })
], T.prototype, "label", void 0);
j([
  u({ type: String })
], T.prototype, "description", void 0);
j([
  u({ type: String })
], T.prototype, "icone", void 0);
j([
  u({ type: String })
], T.prototype, "format", void 0);
j([
  u({ type: String })
], T.prototype, "tendance", void 0);
j([
  u({ type: Number, attribute: "seuil-vert" })
], T.prototype, "seuilVert", void 0);
j([
  u({ type: Number, attribute: "seuil-orange" })
], T.prototype, "seuilOrange", void 0);
j([
  u({ type: String })
], T.prototype, "couleur", void 0);
T = j([
  M("gouv-kpi")
], T);
var F = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, be;
let k = (be = class extends nt(C) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this.urlSync = !1, this.urlPageParam = "page", this.serverTri = !1, this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._popstateHandler = null;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), V("gouv-datalist"), this._initSort(), this.urlSync && (this._applyUrlPage(), this._popstateHandler = () => {
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
    const t = this.source ? De(this.source) : void 0;
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
      !isNaN(r) && r >= 1 && (this._currentPage = r, this._serverPagination && this.source && K(this.source, { page: r }));
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
    ((t = this._sort) == null ? void 0 : t.key) === e ? this._sort = { key: e, direction: this._sort.direction === "asc" ? "desc" : "asc" } : this._sort = { key: e, direction: "asc" }, this.serverTri && this.source && K(this.source, {
      orderBy: `${this._sort.key}:${this._sort.direction}`
    });
  }
  _handlePageChange(e) {
    this._currentPage = e, this._serverPagination && this.source && K(this.source, { page: e }), this.urlSync && this._syncPageUrl();
  }
  // --- Export ---
  _exportCsv() {
    const e = this.parseColumns(), t = this.getFilteredData(), r = e.map((d) => d.label).join(";"), i = t.map((d) => e.map((p) => {
      const f = String(d[p.key] ?? "");
      return f.includes(";") || f.includes('"') ? `"${f.replace(/"/g, '""')}"` : f;
    }).join(";")), s = [r, ...i].join(`
`), a = new Blob([s], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(a), l = document.createElement("a");
    l.href = o, l.download = "export.csv", l.click(), URL.revokeObjectURL(o);
  }
  _exportHtml() {
    const e = this.parseColumns(), t = this.getFilteredData(), r = e.map((d) => `<th>${wt(d.label)}</th>`).join(""), i = t.map((d) => `<tr>${e.map((f) => {
      const g = d[f.key];
      return `<td>${g == null ? "" : wt(String(g))}</td>`;
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
    return t.length === 0 ? "" : h`
      <div class="gouv-datalist__filters">
        ${t.map((r) => {
      const i = e.find((o) => o.key === r), s = (i == null ? void 0 : i.label) || r, a = this._getUniqueValues(r);
      return h`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${r}">${s}</label>
              <select
                class="fr-select"
                id="filter-${r}"
                @change="${(o) => this._handleFilter(r, o)}"
              >
                <option value="">Tous</option>
                ${a.map((o) => h`
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
    return !this.recherche && !e ? "" : h`
      <div class="gouv-datalist__toolbar">
        ${this.recherche ? h`
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
        ` : h`<div></div>`}

        <div class="gouv-datalist__export-buttons">
          ${(i = this.export) != null && i.includes("csv") ? h`
            <button
              class="fr-btn fr-btn--secondary fr-btn--sm"
              @click="${this._exportCsv}"
              type="button"
            >
              <span class="fr-icon-download-line fr-icon--sm" aria-hidden="true"></span>
              Exporter CSV
            </button>
          ` : ""}

          ${(s = this.export) != null && s.includes("html") ? h`
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
    return h`
      <div class="fr-table fr-table--bordered">
        <table>
          <caption class="fr-sr-only">Liste des données</caption>
          <thead>
            <tr>
              ${e.map((r) => {
      var l;
      const i = ((l = this._sort) == null ? void 0 : l.key) === r.key, s = i ? this._sort.direction : null, a = s === "asc" ? "ascending" : s === "desc" ? "descending" : "none", o = i ? `Trier par ${r.label}, actuellement tri ${s === "asc" ? "croissant" : "decroissant"}` : `Trier par ${r.label}`;
      return h`
                <th scope="col" aria-sort="${a}">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${() => this._handleSort(r.key)}"
                    aria-label="${o}"
                    type="button"
                  >
                    ${r.label}
                    ${i ? h`
                      <span aria-hidden="true">${s === "asc" ? "↑" : "↓"}</span>
                    ` : ""}
                  </button>
                </th>
              `;
    })}
            </tr>
          </thead>
          <tbody>
            ${t.length === 0 ? h`
              <tr>
                <td colspan="${e.length}" class="gouv-datalist__empty">
                  Aucune donnée à afficher
                </td>
              </tr>
            ` : t.map((r) => h`
              <tr>
                ${e.map((i) => h`
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
    return h`
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
          ${t.map((r) => h`
            <li>
              <button
                class="fr-pagination__link ${r === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(r)}"
                aria-current="${r === this._currentPage ? "page" : "false"}"
                aria-label="Page ${r}"
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
  // --- Main render ---
  render() {
    const e = this.parseColumns(), t = this._getFilterableColumns(), r = this._getPaginatedData(), i = this._getTotalPages(), s = this._serverPagination ? this._serverTotal : this.getFilteredData().length;
    return h`
      <div class="gouv-datalist" role="region" aria-label="${this.getAttribute("aria-label") || "Liste de donnees"}">
        ${this._renderFilters(e, t)}
        ${this._renderToolbar()}

        ${this._sourceLoading ? h`
          <div class="gouv-datalist__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement des données...
          </div>
        ` : this._sourceError ? h`
          <div class="gouv-datalist__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur: ${this._sourceError.message}
          </div>
        ` : h`
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
}, c(be, "GouvDatalist"), be);
k.styles = yr``;
F([
  u({ type: String })
], k.prototype, "source", void 0);
F([
  u({ type: String })
], k.prototype, "colonnes", void 0);
F([
  u({ type: Boolean })
], k.prototype, "recherche", void 0);
F([
  u({ type: String })
], k.prototype, "filtres", void 0);
F([
  u({ type: String })
], k.prototype, "tri", void 0);
F([
  u({ type: Number })
], k.prototype, "pagination", void 0);
F([
  u({ type: String })
], k.prototype, "export", void 0);
F([
  u({ type: Boolean, attribute: "url-sync" })
], k.prototype, "urlSync", void 0);
F([
  u({ type: String, attribute: "url-page-param" })
], k.prototype, "urlPageParam", void 0);
F([
  u({ type: Boolean, attribute: "server-tri" })
], k.prototype, "serverTri", void 0);
F([
  _()
], k.prototype, "_data", void 0);
F([
  _()
], k.prototype, "_searchQuery", void 0);
F([
  _()
], k.prototype, "_activeFilters", void 0);
F([
  _()
], k.prototype, "_sort", void 0);
F([
  _()
], k.prototype, "_currentPage", void 0);
F([
  _()
], k.prototype, "_serverPagination", void 0);
k = F([
  M("gouv-datalist")
], k);
var z = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, ve;
let O = (ve = class extends nt(C) {
  constructor() {
    super(...arguments), this.source = "", this.cols = 1, this.pagination = 0, this.empty = "Aucun resultat", this.gap = "fr-grid-row--gutters", this.uidField = "", this.urlSync = !1, this.urlPageParam = "page", this._data = [], this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._templateContent = "", this._hashScrollDone = !1, this._popstateHandler = null;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), V("gouv-display"), this._captureTemplate(), this.urlSync && (this._applyUrlPage(), this._popstateHandler = () => {
      this._applyUrlPage(), this.requestUpdate();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [], this._hashScrollDone = !1;
    const t = this.source ? De(this.source) : void 0;
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
      return wt(a);
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
    const o = S(e, i);
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
      !isNaN(r) && r >= 1 && (this._currentPage = r, this._serverPagination && this.source && K(this.source, { page: r }));
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
    this._currentPage = e, this._serverPagination && this.source && K(this.source, { page: e }), this.urlSync && this._syncPageUrl();
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
      const r = S(e, this.uidField);
      if (r != null && r !== "")
        return `item-${String(r).replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    }
    return `item-${t}`;
  }
  _renderGrid(e) {
    const t = this._getColClass(), r = this.pagination > 0 ? (this._currentPage - 1) * this.pagination : 0, i = e.map((a, o) => {
      const l = r + o, d = this._renderItem(a, l), p = this._getItemUid(a, l);
      return `<div class="${t}" id="${p}">${d}</div>`;
    }).join(""), s = `<div class="fr-grid-row ${this.gap}">${i}</div>`;
    return h`<div .innerHTML="${s}"></div>`;
  }
  _renderPagination(e) {
    if (this.pagination <= 0 || e <= 1)
      return "";
    const t = [];
    for (let r = Math.max(1, this._currentPage - 2); r <= Math.min(e, this._currentPage + 2); r++)
      t.push(r);
    return h`
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
          ${t.map((r) => h`
            <li>
              <button
                class="fr-pagination__link ${r === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(r)}"
                aria-current="${r === this._currentPage ? "page" : "false"}"
                aria-label="Page ${r}"
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
    return h`
      <div class="gouv-display" role="region" aria-label="${this.getAttribute("aria-label") || "Liste de resultats"}">
        ${this._sourceLoading ? h`
          <div class="gouv-display__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? h`
          <div class="gouv-display__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : r === 0 ? h`
          <div class="gouv-display__empty" aria-live="polite">
            ${this.empty}
          </div>
        ` : h`
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
}, c(ve, "GouvDisplay"), ve);
z([
  u({ type: String })
], O.prototype, "source", void 0);
z([
  u({ type: Number })
], O.prototype, "cols", void 0);
z([
  u({ type: Number })
], O.prototype, "pagination", void 0);
z([
  u({ type: String })
], O.prototype, "empty", void 0);
z([
  u({ type: String })
], O.prototype, "gap", void 0);
z([
  u({ type: String, attribute: "uid-field" })
], O.prototype, "uidField", void 0);
z([
  u({ type: Boolean, attribute: "url-sync" })
], O.prototype, "urlSync", void 0);
z([
  u({ type: String, attribute: "url-page-param" })
], O.prototype, "urlPageParam", void 0);
z([
  _()
], O.prototype, "_data", void 0);
z([
  _()
], O.prototype, "_currentPage", void 0);
z([
  _()
], O.prototype, "_serverPagination", void 0);
O = z([
  M("gouv-display")
], O);
var x = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
const bi = {
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
var ye;
let $ = (ye = class extends nt(C) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.codeField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._data = [];
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), V("gouv-dsfr-chart", this.type);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [];
  }
  // --- Data processing ---
  _processData() {
    if (!this._data || this._data.length === 0)
      return { x: "[[]]", y: "[[]]", labels: [], values: [], values2: [] };
    const e = [], t = [], r = [];
    for (const i of this._data)
      e.push(String(S(i, this.labelField) ?? "N/A")), t.push(Number(S(i, this.valueField)) || 0), this.valueField2 && r.push(Number(S(i, this.valueField2)) || 0);
    return {
      x: JSON.stringify([e]),
      y: JSON.stringify([t]),
      y2: this.valueField2 ? JSON.stringify([r]) : void 0,
      // Combined y with both series for multi-series charts (bar, line, radar)
      yMulti: this.valueField2 ? JSON.stringify([t, r]) : void 0,
      labels: e,
      values: t,
      values2: r
    };
  }
  _processMapData() {
    if (!this._data || this._data.length === 0)
      return "{}";
    const e = this.codeField || this.labelField, t = {};
    for (const r of this._data) {
      let i = String(S(r, e) ?? "").trim();
      /^\d+$/.test(i) && i.length < 3 && (i = i.padStart(2, "0"));
      const s = Number(S(r, this.valueField)) || 0;
      (this.type === "map" ? Qr(i) : i !== "") && (t[i] = Math.round(s * 100) / 100);
    }
    return JSON.stringify(t);
  }
  // --- Attribute builders ---
  _getCommonAttributes() {
    const e = {};
    if (this.selectedPalette && (e["selected-palette"] = this.selectedPalette), this.unitTooltip && (e["unit-tooltip"] = this.unitTooltip), this.xMin && (e["x-min"] = this.xMin), this.xMax && (e["x-max"] = this.xMax), this.yMin && (e["y-min"] = this.yMin), this.yMax && (e["y-max"] = this.yMax), this.name) {
      const t = this.name.trim(), r = this.type === "map" || this.type === "map-reg";
      e.name = r || t.startsWith("[") ? t : JSON.stringify([t]);
    } else if (this.valueField)
      if (this.type === "map" || this.type === "map-reg")
        e.name = this.valueField;
      else {
        const r = this.valueField2 ? [this.valueField, this.valueField2] : [this.valueField];
        e.name = JSON.stringify(r);
      }
    return e;
  }
  _getTypeSpecificAttributes() {
    const { x: e, y: t, yMulti: r, labels: i, values: s, values2: a } = this._processData(), o = {}, l = {};
    switch (this.type) {
      case "gauge": {
        const d = this.gaugeValue ?? (this._data.length > 0 && Number(S(this._data[0], this.valueField)) || 0);
        o.percent = String(Math.round(d)), o.init = "0", o.target = "100";
        break;
      }
      case "pie":
        o.x = e, o.y = t, !this.name && i.length > 0 && (o.name = JSON.stringify(i));
        break;
      case "bar-line": {
        if (o.x = JSON.stringify(i), o["y-bar"] = JSON.stringify(s), o["y-line"] = JSON.stringify(a.length ? a : s), this.name)
          try {
            const d = this.name.trim(), p = d.startsWith("[") ? JSON.parse(d) : [d];
            p[0] && (o["name-bar"] = p[0]), p[1] && (o["name-line"] = p[1]);
          } catch {
          }
        this.unitTooltipBar && (o["unit-tooltip-bar"] = this.unitTooltipBar), this.unitTooltip && (o["unit-tooltip-line"] = this.unitTooltip);
        break;
      }
      case "map":
      case "map-reg": {
        if (o.data = this._processMapData(), this._data.length > 0) {
          let d = 0, p = 0;
          for (const f of this._data) {
            const g = Number(S(f, this.valueField));
            isNaN(g) || (d += g, p++);
          }
          if (p > 0) {
            const f = Math.round(d / p * 100) / 100;
            l.value = String(f);
          }
        }
        l.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        break;
      }
      default:
        o.x = e, o.y = r || t;
        break;
    }
    return this.type === "bar" && (this.horizontal && (o.horizontal = "true"), this.stacked && (o.stacked = "true"), this.highlightIndex && (o["highlight-index"] = this.highlightIndex)), this.type === "pie" && this.fill && (o.fill = "true"), (this.type === "map" || this.type === "map-reg") && this.mapHighlight && (o.highlight = this.mapHighlight), { attrs: o, deferred: l };
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
    const e = bi[this.type];
    if (!e)
      return h`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const { attrs: t, deferred: r } = this._getTypeSpecificAttributes(), i = {
      ...this._getCommonAttributes(),
      ...t
    };
    this.type === "bar-line" && (delete i.name, delete i["unit-tooltip"]);
    const s = this._createChartElement(e, i, r), a = this.querySelector(".gouv-dsfr-chart__wrapper");
    return a && a.remove(), h`${s}`;
  }
  render() {
    return this._sourceLoading ? h`
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
      ` : this._sourceError ? h`
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
      ` : !this._data || this._data.length === 0 ? h`
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
}, c(ye, "GouvDsfrChart"), ye);
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
  _()
], $.prototype, "_data", void 0);
$ = x([
  M("gouv-dsfr-chart")
], $);
var X = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, $e;
let G = ($e = class extends C {
  constructor() {
    super(...arguments), this._open = !1, this._tab = "login", this._error = "", this._loading = !1, this._email = "", this._password = "", this._displayName = "";
  }
  // Light DOM for DSFR
  createRenderRoot() {
    return this;
  }
  open(e = "login") {
    this._tab = e, this._error = "", this._email = "", this._password = "", this._displayName = "", this._open = !0;
  }
  close() {
    this._open = !1;
  }
  async _handleSubmit(e) {
    e.preventDefault(), this._error = "", this._loading = !0;
    try {
      if (this._tab === "login") {
        const t = await ii({ email: this._email, password: this._password });
        if (!t.success) {
          this._error = t.error || "Identifiants incorrects";
          return;
        }
      } else {
        if (!this._displayName.trim()) {
          this._error = "Le nom est requis";
          return;
        }
        const t = await si({
          email: this._email,
          password: this._password,
          displayName: this._displayName
        });
        if (!t.success) {
          this._error = t.error || "Erreur lors de l'inscription";
          return;
        }
      }
      this.close(), window.location.reload();
    } finally {
      this._loading = !1;
    }
  }
  _switchTab(e) {
    this._tab = e, this._error = "";
  }
  render() {
    if (!this._open)
      return m;
    const e = this._tab === "login";
    return h`
      <dialog class="fr-modal fr-modal--opened" role="dialog" aria-labelledby="auth-modal-title" aria-modal="true"
              style="display:flex" @click=${(t) => {
      t.target === t.currentTarget && this.close();
    }}>
        <div class="fr-container fr-container--fluid fr-container-md">
          <div class="fr-grid-row fr-grid-row--center">
            <div class="fr-col-12 fr-col-md-6 fr-col-lg-4">
              <div class="fr-modal__body">
                <div class="fr-modal__header">
                  <button class="fr-btn--close fr-btn" title="Fermer"
                          @click=${() => this.close()}>Fermer</button>
                </div>
                <div class="fr-modal__content">
                  <h1 id="auth-modal-title" class="fr-modal__title">
                    ${e ? "Connexion" : "Inscription"}
                  </h1>

                  <!-- Tabs -->
                  <div class="fr-tabs" style="margin-bottom:1rem">
                    <ul class="fr-tabs__list" role="tablist">
                      <li role="presentation">
                        <button class="fr-tabs__tab ${e ? "fr-tabs__tab--selected" : ""}"
                                role="tab" aria-selected="${e}"
                                @click=${() => this._switchTab("login")}>
                          Connexion
                        </button>
                      </li>
                      <li role="presentation">
                        <button class="fr-tabs__tab ${e ? "" : "fr-tabs__tab--selected"}"
                                role="tab" aria-selected="${!e}"
                                @click=${() => this._switchTab("register")}>
                          Inscription
                        </button>
                      </li>
                    </ul>
                  </div>

                  ${this._error ? h`
                    <div class="fr-alert fr-alert--error fr-alert--sm" style="margin-bottom:1rem">
                      <p>${this._error}</p>
                    </div>
                  ` : m}

                  <form @submit=${this._handleSubmit}>
                    ${e ? m : h`
                      <div class="fr-input-group">
                        <label class="fr-label" for="auth-name">Nom d'affichage</label>
                        <input class="fr-input" type="text" id="auth-name"
                               .value=${this._displayName}
                               @input=${(t) => {
      this._displayName = t.target.value;
    }}
                               required>
                      </div>
                    `}

                    <div class="fr-input-group">
                      <label class="fr-label" for="auth-email">Email</label>
                      <input class="fr-input" type="email" id="auth-email" autocomplete="email"
                             .value=${this._email}
                             @input=${(t) => {
      this._email = t.target.value;
    }}
                             required>
                    </div>

                    <div class="fr-input-group">
                      <label class="fr-label" for="auth-password">Mot de passe</label>
                      <input class="fr-input" type="password" id="auth-password"
                             autocomplete="${e ? "current-password" : "new-password"}"
                             minlength="6"
                             .value=${this._password}
                             @input=${(t) => {
      this._password = t.target.value;
    }}
                             required>
                      ${e ? m : h`<p class="fr-hint-text">6 caracteres minimum</p>`}
                    </div>

                    <div class="fr-input-group" style="margin-top:1.5rem">
                      <button class="fr-btn" type="submit" ?disabled=${this._loading}
                              style="width:100%">
                        ${this._loading ? "Chargement..." : e ? "Se connecter" : "S'inscrire"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    `;
  }
}, c($e, "AuthModal"), $e);
X([
  _()
], G.prototype, "_open", void 0);
X([
  _()
], G.prototype, "_tab", void 0);
X([
  _()
], G.prototype, "_error", void 0);
X([
  _()
], G.prototype, "_loading", void 0);
X([
  _()
], G.prototype, "_email", void 0);
X([
  _()
], G.prototype, "_password", void 0);
X([
  _()
], G.prototype, "_displayName", void 0);
G = X([
  M("auth-modal")
], G);
var Oe = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, we;
let se = (we = class extends C {
  constructor() {
    super(...arguments), this.currentPage = "", this.basePath = "", this._favCount = 0, this._user = null, this._dbMode = !1;
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
    this._initAuth();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._unsubAuth) == null || e.call(this);
  }
  async _initAuth() {
    try {
      const e = await ti();
      this._dbMode = await Ar(), this._user = e.user, this._unsubAuth = ni((t) => {
        this._user = t.user;
      });
    } catch {
    }
  }
  _openAuthModal() {
    const e = this.querySelector("auth-modal");
    e == null || e.open("login");
  }
  async _handleLogout() {
    await ai(), window.location.reload();
  }
  _getNavItems() {
    return [
      { id: "accueil", label: "Accueil", href: "index.html" },
      { id: "composants", label: "Composants", href: "specs/index.html" },
      { id: "builder", label: "Builder", href: "apps/builder/index.html" },
      { id: "builder-ia", label: "Builder IA", href: "apps/builder-ia/index.html" },
      { id: "playground", label: "Playground", href: "apps/playground/index.html" },
      { id: "dashboard", label: "Dashboard", href: "apps/dashboard/index.html" },
      { id: "sources", label: "Sources", href: "apps/sources/index.html" },
      { id: "monitoring", label: "Monitoring", href: "apps/monitoring/index.html" }
    ];
  }
  _renderAuthButton() {
    return this._dbMode ? this._user ? h`
        <li>
          <span class="fr-btn fr-btn--tertiary-no-outline fr-icon-account-circle-line" style="pointer-events:none;">
            ${this._user.displayName || this._user.email}
          </span>
        </li>
        <li>
          <button class="fr-btn fr-btn--tertiary-no-outline fr-icon-logout-box-r-line"
                  @click=${this._handleLogout}>
            Deconnexion
          </button>
        </li>
      ` : h`
      <li>
        <button class="fr-btn fr-btn--tertiary-no-outline fr-icon-account-circle-line"
                @click=${this._openAuthModal}>
          Connexion
        </button>
      </li>
    ` : m;
  }
  render() {
    const e = this._getNavItems();
    return h`
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
                  <p class="fr-header__service-tagline">Création de visualisations dynamiques conformes DSFR</p>
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
                        Favoris${this._favCount > 0 ? h` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>` : m}
                      </a>
                    </li>
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
                ${e.map((t) => h`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this._base}${t.href}"
                       ${this.currentPage === t.id ? h`aria-current="page"` : ""}>
                      ${t.label}
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      ${this._dbMode ? h`<auth-modal></auth-modal>` : m}
    `;
  }
}, c(we, "AppHeader"), we);
Oe([
  u({ type: String, attribute: "current-page" })
], se.prototype, "currentPage", void 0);
Oe([
  u({ type: String, attribute: "base-path" })
], se.prototype, "basePath", void 0);
Oe([
  _()
], se.prototype, "_favCount", void 0);
Oe([
  _()
], se.prototype, "_user", void 0);
Oe([
  _()
], se.prototype, "_dbMode", void 0);
se = Oe([
  M("app-header")
], se);
var Er = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, Se;
let At = (Se = class extends C {
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
    return h`
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
}, c(Se, "AppFooter"), Se);
Er([
  u({ type: String, attribute: "base-path" })
], At.prototype, "basePath", void 0);
At = Er([
  M("app-footer")
], At);
var Ne = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, Pe;
let ae = (Pe = class extends C {
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
    return h`
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
}, c(Pe, "AppLayoutBuilder"), Pe);
Ne([
  u({ type: Number, attribute: "left-ratio" })
], ae.prototype, "leftRatio", void 0);
Ne([
  u({ type: Number, attribute: "min-left-width" })
], ae.prototype, "minLeftWidth", void 0);
Ne([
  u({ type: Number, attribute: "min-right-width" })
], ae.prototype, "minRightWidth", void 0);
Ne([
  _()
], ae.prototype, "_isResizing", void 0);
Ne([
  _()
], ae.prototype, "_currentLeftRatio", void 0);
ae = Ne([
  M("app-layout-builder")
], ae);
var Je = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, xe;
let Te = (xe = class extends C {
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
      return h`
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
      return h`
        <li class="fr-sidemenu__item ${t ? "fr-sidemenu__item--active" : ""}">
          <a class="fr-sidemenu__link"
             href="${this._base}${e.href}"
             ${t ? h`aria-current="page"` : ""}>
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
    return t.push({ label: this.title, href: "" }), h`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((r, i) => h`
              <li>
                ${i === t.length - 1 ? h`<a class="fr-breadcrumb__link" aria-current="page">${r.label}</a>` : h`<a class="fr-breadcrumb__link" href="${r.href}">${r.label}</a>`}
              </li>
            `)}
          </ol>
        </div>
      </nav>
    `;
  }
  render() {
    const e = this._getMenuStructure();
    return h`
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

            ${this.title ? h`
              <h1>
                ${this.icon ? h`<span class="${this.icon} fr-mr-1w" aria-hidden="true"></span>` : ""}
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
}, c(xe, "AppLayoutDemo"), xe);
Je([
  u({ type: String })
], Te.prototype, "title", void 0);
Je([
  u({ type: String })
], Te.prototype, "icon", void 0);
Je([
  u({ type: String, attribute: "active-path" })
], Te.prototype, "activePath", void 0);
Je([
  u({ type: String, attribute: "base-path" })
], Te.prototype, "basePath", void 0);
Te = Je([
  M("app-layout-demo")
], Te);
var ne = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, Ce;
let Y = (Ce = class extends C {
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
    return h`
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
          ${this.showDataTab ? h`
            <button
              class="preview-panel-tab ${this._activeTab === "data" ? "active" : ""}"
              data-tab="data"
              @click="${() => this._handleTabClick("data")}">
              ${i || "Données"}
            </button>
          ` : m}
          ${this.showPlaygroundButton ? h`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          ` : m}
          ${this.showSaveButton ? h`
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
}, c(Ce, "AppPreviewPanel"), Ce);
ne([
  u({ type: Boolean, attribute: "show-data-tab" })
], Y.prototype, "showDataTab", void 0);
ne([
  u({ type: Boolean, attribute: "show-save-button" })
], Y.prototype, "showSaveButton", void 0);
ne([
  u({ type: Boolean, attribute: "show-playground-button" })
], Y.prototype, "showPlaygroundButton", void 0);
ne([
  u({ type: String, attribute: "tab-labels" })
], Y.prototype, "tabLabels", void 0);
ne([
  u({ type: String, attribute: "active-tab" })
], Y.prototype, "activeTab", void 0);
ne([
  _()
], Y.prototype, "_activeTab", void 0);
Y = ne([
  M("app-preview-panel")
], Y);
function vi(n, e, t) {
  return n.map((r) => ({
    label: String(S(r, e) ?? "N/A"),
    value: Number(S(r, t)) || 0
  }));
}
c(vi, "extractLabelValues");
function yi(n, e) {
  if (e === "none")
    return n;
  const t = /* @__PURE__ */ new Map();
  for (const i of n) {
    const s = t.get(i.label) || [];
    s.push(i.value), t.set(i.label, s);
  }
  const r = [];
  for (const [i, s] of t)
    r.push({ label: i, value: $i(s, e) });
  return r;
}
c(yi, "aggregateByLabel");
function $i(n, e) {
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
c($i, "computeGroupValue");
function wi(n, e) {
  return e === "none" ? n : [...n].sort((t, r) => e === "desc" ? r.value - t.value : t.value - r.value);
}
c(wi, "sortByValue");
function ki(n, e, t, r = "none", i = "none", s = 0) {
  if (!n || n.length === 0)
    return { labels: [], values: [] };
  let a = vi(n, e, t);
  return a = yi(a, r), a = wi(a, i), s > 0 && (a = a.slice(0, s)), {
    labels: a.map((o) => o.label),
    values: a.map((o) => Math.round(o.value * 100) / 100)
  };
}
c(ki, "processChartData");
export {
  At as AppFooter,
  se as AppHeader,
  ae as AppLayoutBuilder,
  Te as AppLayoutDemo,
  U as DATA_EVENTS,
  k as GouvDatalist,
  O as GouvDisplay,
  $ as GouvDsfrChart,
  v as GouvFacets,
  T as GouvKpi,
  B as GouvNormalize,
  y as GouvQuery,
  A as GouvSearch,
  D as GouvSource,
  nt as SourceSubscriberMixin,
  yi as aggregateByLabel,
  _r as computeAggregation,
  J as dispatchDataError,
  L as dispatchDataLoaded,
  Q as dispatchDataLoading,
  vi as extractLabelValues,
  fi as formatCurrency,
  Ai as formatDate,
  gr as formatNumber,
  pi as formatPercentage,
  fr as formatValue,
  _t as getAdapter,
  S as getByPath,
  xi as getByPathOrDefault,
  Fe as getDataCache,
  Pi as hasPath,
  mi as parseExpression,
  ki as processChartData,
  Ci as registerAdapter,
  wi as sortByValue,
  We as subscribeToSource
};
