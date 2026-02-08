var wt = Object.defineProperty;
var l = (s, e) => wt(s, "name", { value: e, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const me = globalThis, Le = me.ShadowRoot && (me.ShadyCSS === void 0 || me.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ue = Symbol(), Qe = /* @__PURE__ */ new WeakMap();
var z;
let ht = (z = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Ue) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Le && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = Qe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Qe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}, l(z, "n"), z);
const xt = /* @__PURE__ */ l((s) => new ht(typeof s == "string" ? s : s + "", void 0, Ue), "r$4"), pt = /* @__PURE__ */ l((s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((r, i, n) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new ht(t, s, Ue);
}, "i$3"), St = /* @__PURE__ */ l((s, e) => {
  if (Le) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = me.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, s.appendChild(r);
  }
}, "S$1"), Ke = Le ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return xt(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: At, defineProperty: Ct, getOwnPropertyDescriptor: Et, getOwnPropertyNames: Pt, getOwnPropertySymbols: kt, getPrototypeOf: Rt } = Object, O = globalThis, Xe = O.trustedTypes, Mt = Xe ? Xe.emptyScript : "", xe = O.reactiveElementPolyfillSupport, oe = /* @__PURE__ */ l((s, e) => s, "d$1"), ve = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Mt : null;
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
} }, Fe = /* @__PURE__ */ l((s, e) => !At(s, e), "f$1"), Ye = { attribute: !0, type: String, converter: ve, reflect: !1, useDefault: !1, hasChanged: Fe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), O.litPropertyMetadata ?? (O.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var H;
let q = (H = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ye) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Ct(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: n } = Et(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const o = i == null ? void 0 : i.call(this);
      n == null || n.call(this, a), this.requestUpdate(e, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ye;
  }
  static _$Ei() {
    if (this.hasOwnProperty(oe("elementProperties"))) return;
    const e = Rt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(oe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(oe("properties"))) {
      const t = this.properties, r = [...Pt(t), ...kt(t)];
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
      for (const i of r) t.unshift(Ke(i));
    } else e !== void 0 && t.push(Ke(e));
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
    return St(e, this.constructor.elementStyles), e;
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
    var n;
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const a = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : ve).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, a;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((n = o.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? o.converter : ve;
      this._$Em = i;
      const p = c.fromAttribute(t, o.type);
      this[i] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, n) {
    var a;
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[e]), r ?? (r = o.getPropertyOptions(e)), !((r.hasChanged ?? Fe)(n, t) || r.useDefault && r.reflect && n === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: n }, a) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, a] of i) {
        const { wrapped: o } = a, c = this[n];
        o !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, a, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this._$EO) == null || r.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
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
}, l(H, "y"), H);
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[oe("elementProperties")] = /* @__PURE__ */ new Map(), q[oe("finalized")] = /* @__PURE__ */ new Map(), xe == null || xe({ ReactiveElement: q }), (O.reactiveElementVersions ?? (O.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = globalThis, Ze = /* @__PURE__ */ l((s) => s, "i$1"), _e = le.trustedTypes, et = _e ? _e.createPolicy("lit-html", { createHTML: /* @__PURE__ */ l((s) => s, "createHTML") }) : void 0, ft = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, gt = "?" + T, Nt = `<${gt}>`, j = document, ce = /* @__PURE__ */ l(() => j.createComment(""), "c"), ue = /* @__PURE__ */ l((s) => s === null || typeof s != "object" && typeof s != "function", "a"), je = Array.isArray, Tt = /* @__PURE__ */ l((s) => je(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", "d"), Se = `[ 	
\f\r]`, ae = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tt = /-->/g, rt = />/g, L = RegExp(`>|${Se}(?:([^\\s"'>=/]+)(${Se}*=${Se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), it = /'/g, nt = /"/g, bt = /^(?:script|style|textarea|title)$/i, Ot = /* @__PURE__ */ l((s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), "x"), d = Ot(1), te = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), st = /* @__PURE__ */ new WeakMap(), U = j.createTreeWalker(j, 129);
function mt(s, e) {
  if (!je(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(e) : e;
}
l(mt, "V");
const Dt = /* @__PURE__ */ l((s, e) => {
  const t = s.length - 1, r = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = ae;
  for (let o = 0; o < t; o++) {
    const c = s[o];
    let p, f, h = -1, C = 0;
    for (; C < c.length && (a.lastIndex = C, f = a.exec(c), f !== null); ) C = a.lastIndex, a === ae ? f[1] === "!--" ? a = tt : f[1] !== void 0 ? a = rt : f[2] !== void 0 ? (bt.test(f[2]) && (i = RegExp("</" + f[2], "g")), a = L) : f[3] !== void 0 && (a = L) : a === L ? f[0] === ">" ? (a = i ?? ae, h = -1) : f[1] === void 0 ? h = -2 : (h = a.lastIndex - f[2].length, p = f[1], a = f[3] === void 0 ? L : f[3] === '"' ? nt : it) : a === nt || a === it ? a = L : a === tt || a === rt ? a = ae : (a = L, i = void 0);
    const N = a === L && s[o + 1].startsWith("/>") ? " " : "";
    n += a === ae ? c + Nt : h >= 0 ? (r.push(p), c.slice(0, h) + ft + c.slice(h) + T + N) : c + T + (h === -2 ? o : N);
  }
  return [mt(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
}, "N"), ye = class ye {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const o = e.length - 1, c = this.parts, [p, f] = Dt(e, t);
    if (this.el = ye.createElement(p, r), U.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = U.nextNode()) !== null && c.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(ft)) {
          const C = f[a++], N = i.getAttribute(h).split(T), be = /([.?@])?(.*)/.exec(C);
          c.push({ type: 1, index: n, name: be[2], strings: N, ctor: be[1] === "." ? Pe : be[1] === "?" ? ke : be[1] === "@" ? Re : ie }), i.removeAttribute(h);
        } else h.startsWith(T) && (c.push({ type: 6, index: n }), i.removeAttribute(h));
        if (bt.test(i.tagName)) {
          const h = i.textContent.split(T), C = h.length - 1;
          if (C > 0) {
            i.textContent = _e ? _e.emptyScript : "";
            for (let N = 0; N < C; N++) i.append(h[N], ce()), U.nextNode(), c.push({ type: 2, index: ++n });
            i.append(h[C], ce());
          }
        }
      } else if (i.nodeType === 8) if (i.data === gt) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(T, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += T.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const r = j.createElement("template");
    return r.innerHTML = e, r;
  }
};
l(ye, "S");
let de = ye;
function re(s, e, t = s, r) {
  var a, o;
  if (e === te) return e;
  let i = r !== void 0 ? (a = t._$Co) == null ? void 0 : a[r] : t._$Cl;
  const n = ue(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = i : t._$Cl = i), i !== void 0 && (e = re(s, i._$AS(s, e.values), i, r)), e;
}
l(re, "M");
const qe = class qe {
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
    const { el: { content: t }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? j).importNode(t, !0);
    U.currentNode = i;
    let n = U.nextNode(), a = 0, o = 0, c = r[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let p;
        c.type === 2 ? p = new he(n, n.nextSibling, this, e) : c.type === 1 ? p = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (p = new Me(n, this, e)), this._$AV.push(p), c = r[++o];
      }
      a !== (c == null ? void 0 : c.index) && (n = U.nextNode(), a++);
    }
    return U.currentNode = j, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
};
l(qe, "R");
let Ee = qe;
const $e = class $e {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = re(this, e, t), ue(e) ? e === b || e == null || e === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : e !== this._$AH && e !== te && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Tt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== b && ue(this._$AH) ? this._$AA.nextSibling.data = e : this.T(j.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = de.createElement(mt(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(t);
    else {
      const a = new Ee(i, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = st.get(e.strings);
    return t === void 0 && st.set(e.strings, t = new de(e)), t;
  }
  k(e) {
    je(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const n of e) i === t.length ? t.push(r = new $e(this.O(ce()), this.O(ce()), this, this.options)) : r = t[i], r._$AI(n), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = Ze(e).nextSibling;
      Ze(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
};
l($e, "k");
let he = $e;
const ze = class ze {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, n) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = b;
  }
  _$AI(e, t = this, r, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = re(this, e, t, 0), a = !ue(e) || e !== this._$AH && e !== te, a && (this._$AH = e);
    else {
      const o = e;
      let c, p;
      for (e = n[0], c = 0; c < n.length - 1; c++) p = re(this, o[r + c], t, c), p === te && (p = this._$AH[c]), a || (a = !ue(p) || p !== this._$AH[c]), p === b ? e = b : e !== b && (e += (p ?? "") + n[c + 1]), this._$AH[c] = p;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
l(ze, "H");
let ie = ze;
const He = class He extends ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === b ? void 0 : e;
  }
};
l(He, "I");
let Pe = He;
const Ve = class Ve extends ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== b);
  }
};
l(Ve, "L");
let ke = Ve;
const Ge = class Ge extends ie {
  constructor(e, t, r, i, n) {
    super(e, t, r, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = re(this, e, t, 0) ?? b) === te) return;
    const r = this._$AH, i = e === b && r !== b || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== b && (r === b || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
};
l(Ge, "z");
let Re = Ge;
const We = class We {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    re(this, e);
  }
};
l(We, "Z");
let Me = We;
const Ae = le.litHtmlPolyfillSupport;
Ae == null || Ae(de, he), (le.litHtmlVersions ?? (le.litHtmlVersions = [])).push("3.3.2");
const Lt = /* @__PURE__ */ l((s, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = i = new he(e.insertBefore(ce(), n), n, void 0, t ?? {});
  }
  return i._$AI(s), i;
}, "D");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, Je = class Je extends q {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Lt(t, this.renderRoot, this.renderOptions);
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
    return te;
  }
};
l(Je, "i");
let w = Je;
var dt;
w._$litElement$ = !0, w.finalized = !0, (dt = F.litElementHydrateSupport) == null || dt.call(F, { LitElement: w });
const Ce = F.litElementPolyfillSupport;
Ce == null || Ce({ LitElement: w });
(F.litElementVersions ?? (F.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = /* @__PURE__ */ l((s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
}, "t");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = { attribute: !0, type: String, converter: ve, reflect: !1, hasChanged: Fe }, Ft = /* @__PURE__ */ l((s = Ut, e, t) => {
  const { kind: r, metadata: i } = t;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), r === "accessor") {
    const { name: a } = t;
    return { set(o) {
      const c = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, c, s, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, s, o), o;
    } };
  }
  if (r === "setter") {
    const { name: a } = t;
    return function(o) {
      const c = this[a];
      e.call(this, o), this.requestUpdate(a, c, s, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
}, "r$1");
function u(s) {
  return (e, t) => typeof t == "object" ? Ft(s, e, t) : ((r, i, n) => {
    const a = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), a ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, e, t);
}
l(u, "n");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $(s) {
  return u({ ...s, state: !0, attribute: !1 });
}
l($, "r");
function y(s, e) {
  if (!e || e.trim() === "")
    return s;
  const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let i = s;
  for (const n of r) {
    if (i == null || typeof i != "object")
      return;
    i = i[n];
  }
  return i;
}
l(y, "getByPath");
function Zt(s, e) {
  return y(s, e) !== void 0;
}
l(Zt, "hasPath");
function er(s, e, t) {
  const r = y(s, e);
  return r !== void 0 ? r : t;
}
l(er, "getByPathOrDefault");
const jt = "https://chartsbuilder.matge.com/beacon", at = /* @__PURE__ */ new Set();
function fe(s, e) {
  const t = `${s}:${e || ""}`;
  if (at.has(t) || (at.add(t), typeof window > "u"))
    return;
  const r = window.location.hostname;
  if (r === "localhost" || r === "127.0.0.1" || r === "chartsbuilder.matge.com")
    return;
  const i = new URLSearchParams();
  i.set("c", s), e && i.set("t", e);
  const n = `${jt}?${i.toString()}`;
  try {
    fetch(n, { method: "GET", keepalive: !0, mode: "no-cors" }).catch(() => {
    });
  } catch {
  }
}
l(fe, "sendWidgetBeacon");
const M = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading"
}, Be = /* @__PURE__ */ new Map();
function Bt(s, e) {
  Be.set(s, e);
}
l(Bt, "setDataCache");
function vt(s) {
  return Be.get(s);
}
l(vt, "getDataCache");
function _t(s) {
  Be.delete(s);
}
l(_t, "clearDataCache");
function Ne(s, e) {
  Bt(s, e);
  const t = new CustomEvent(M.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, data: e }
  });
  document.dispatchEvent(t);
}
l(Ne, "dispatchDataLoaded");
function Te(s, e) {
  const t = new CustomEvent(M.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, error: e }
  });
  document.dispatchEvent(t);
}
l(Te, "dispatchDataError");
function Oe(s) {
  const e = new CustomEvent(M.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s }
  });
  document.dispatchEvent(e);
}
l(Oe, "dispatchDataLoading");
function yt(s, e) {
  const t = /* @__PURE__ */ l((n) => {
    const a = n;
    a.detail.sourceId === s && e.onLoaded && e.onLoaded(a.detail.data);
  }, "handleLoaded"), r = /* @__PURE__ */ l((n) => {
    const a = n;
    a.detail.sourceId === s && e.onError && e.onError(a.detail.error);
  }, "handleError"), i = /* @__PURE__ */ l((n) => {
    n.detail.sourceId === s && e.onLoading && e.onLoading();
  }, "handleLoading");
  return document.addEventListener(M.LOADED, t), document.addEventListener(M.ERROR, r), document.addEventListener(M.LOADING, i), () => {
    document.removeEventListener(M.LOADED, t), document.removeEventListener(M.ERROR, r), document.removeEventListener(M.LOADING, i);
  };
}
l(yt, "subscribeToSource");
var R = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (i < 3 ? a(n) : i > 3 ? a(e, t, n) : a(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
}, V;
let E = (V = class extends w {
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
    super.connectedCallback(), fe("gouv-source"), this._setupRefresh();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && _t(this.id);
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
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, Oe(this.id);
      try {
        const e = this._buildUrl(), t = this._buildFetchOptions(), r = await fetch(e, {
          ...t,
          signal: this._abortController.signal
        });
        if (!r.ok)
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        const i = await r.json();
        this._data = this.transform ? y(i, this.transform) : i, Ne(this.id, this._data);
      } catch (e) {
        if (e.name === "AbortError")
          return;
        this._error = e, Te(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, e);
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
        Object.entries(r).forEach(([i, n]) => {
          t.searchParams.set(i, String(n));
        });
      } catch (r) {
        console.warn("gouv-source: params invalides (JSON attendu)", r);
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
}, l(V, "GouvSource"), V);
R([
  u({ type: String })
], E.prototype, "url", void 0);
R([
  u({ type: String })
], E.prototype, "method", void 0);
R([
  u({ type: String })
], E.prototype, "headers", void 0);
R([
  u({ type: String })
], E.prototype, "params", void 0);
R([
  u({ type: Number })
], E.prototype, "refresh", void 0);
R([
  u({ type: String })
], E.prototype, "transform", void 0);
R([
  $()
], E.prototype, "_loading", void 0);
R([
  $()
], E.prototype, "_error", void 0);
R([
  $()
], E.prototype, "_data", void 0);
E = R([
  k("gouv-source")
], E);
var _ = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (i < 3 ? a(n) : i > 3 ? a(e, t, n) : a(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
}, G;
let v = (G = class extends w {
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
    super.connectedCallback(), fe("gouv-query", this.apiType), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && _t(this.id);
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
    ].some((r) => e.has(r)) && this._initialize(), e.has("refresh") && this._setupRefresh();
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
    const e = vt(this.source);
    e !== void 0 && (this._rawData = Array.isArray(e) ? e : [e], this._processClientSide()), this._unsubscribe = yt(this.source, {
      onLoaded: /* @__PURE__ */ l((t) => {
        this._rawData = Array.isArray(t) ? t : [t], this._processClientSide();
      }, "onLoaded")
    });
  }
  /**
   * Traitement côté client des données
   */
  _processClientSide() {
    try {
      Oe(this.id), this._loading = !0;
      let e = [...this._rawData];
      const t = this.filter || this.where;
      t && (e = this._applyFilters(e, t)), this.groupBy && (e = this._applyGroupByAndAggregate(e)), this.orderBy && (e = this._applySort(e)), this.limit > 0 && (e = e.slice(0, this.limit)), this._data = e, Ne(this.id, this._data);
    } catch (e) {
      this._error = e, Te(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de traitement`, e);
    } finally {
      this._loading = !1;
    }
  }
  /**
   * Parse et applique les filtres (format: "field:operator:value")
   */
  _applyFilters(e, t) {
    const r = this._parseFilters(t);
    return e.filter((i) => r.every((n) => this._matchesFilter(i, n)));
  }
  _parseFilters(e) {
    const t = [], r = e.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of r) {
      const n = i.split(":");
      if (n.length >= 2) {
        const a = n[0], o = n[1];
        let c;
        if (n.length > 2) {
          const p = n.slice(2).join(":");
          o === "in" || o === "notin" ? c = p.split("|").map((f) => {
            const h = this._parseValue(f);
            return typeof h == "boolean" ? String(h) : h;
          }) : c = this._parseValue(p);
        }
        t.push({ field: a, operator: o, value: c });
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
   * Applique le GROUP BY et les agrégations
   */
  _applyGroupByAndAggregate(e) {
    const t = this.groupBy.split(",").map((a) => a.trim()).filter(Boolean), r = this._parseAggregates(this.aggregate), i = /* @__PURE__ */ new Map();
    for (const a of e) {
      const o = t.map((c) => String(y(a, c) ?? "")).join("|||");
      i.has(o) || i.set(o, []), i.get(o).push(a);
    }
    const n = [];
    for (const [a, o] of i) {
      const c = {}, p = a.split("|||");
      t.forEach((f, h) => {
        c[f] = p[h];
      });
      for (const f of r) {
        const h = f.alias || `${f.field}__${f.function}`;
        c[h] = this._computeAggregate(o, f);
      }
      n.push(c);
    }
    return n;
  }
  _parseAggregates(e) {
    if (!e)
      return [];
    const t = [], r = e.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of r) {
      const n = i.split(":");
      n.length >= 2 && t.push({
        field: n[0],
        function: n[1],
        alias: n[2]
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
        return r.reduce((i, n) => i + n, 0);
      case "avg":
        return r.length > 0 ? r.reduce((i, n) => i + n, 0) / r.length : 0;
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
    return [...e].sort((n, a) => {
      const o = y(n, r), c = y(a, r), p = Number(o), f = Number(c);
      if (!isNaN(p) && !isNaN(f))
        return i === "desc" ? f - p : p - f;
      const h = String(o ?? ""), C = String(c ?? "");
      return i === "desc" ? C.localeCompare(h) : h.localeCompare(C);
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
    this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, Oe(this.id);
    try {
      const e = this._buildApiUrl(), t = await fetch(e, {
        signal: this._abortController.signal
      });
      if (!t.ok)
        throw new Error(`HTTP ${t.status}: ${t.statusText}`);
      const r = await t.json();
      let i = this.transform ? y(r, this.transform) : r;
      Array.isArray(i) || (this.apiType === "opendatasoft" && r.results ? i = r.results : this.apiType === "tabular" && r.data ? i = r.data : i = [i]), this._data = i, Ne(this.id, this._data);
    } catch (e) {
      if (e.name === "AbortError")
        return;
      this._error = e, Te(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de requête API`, e);
    } finally {
      this._loading = !1;
    }
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
   * Construit une URL OpenDataSoft
   */
  _buildOpenDataSoftUrl() {
    const e = this.baseUrl || "https://data.opendatasoft.com", t = new URL(`${e}/api/explore/v2.1/catalog/datasets/${this.datasetId}/records`);
    this.select && t.searchParams.set("select", this.select);
    const r = this.where || this.filter;
    if (r && t.searchParams.set("where", r), this.groupBy && t.searchParams.set("group_by", this.groupBy), this.orderBy) {
      const i = this.orderBy.replace(/:(\w+)$/, (n, a) => ` ${a.toUpperCase()}`);
      t.searchParams.set("order_by", i);
    }
    return this.limit > 0 && t.searchParams.set("limit", String(this.limit)), t.toString();
  }
  /**
   * Construit une URL Tabular API (data.gouv.fr)
   */
  _buildTabularUrl() {
    const e = this.baseUrl || "https://tabular-api.data.gouv.fr";
    if (!this.resource)
      throw new Error(`gouv-query: attribut "resource" requis pour l'API Tabular`);
    const t = new URL(`${e}/api/resources/${this.resource}/data/`), r = this.filter || this.where;
    if (r) {
      const i = r.split(",").map((n) => n.trim());
      for (const n of i) {
        const a = n.split(":");
        if (a.length >= 3) {
          const o = a[0], c = this._mapOperatorToTabular(a[1]), p = a.slice(2).join(":");
          t.searchParams.set(`${o}__${c}`, p);
        }
      }
    }
    if (this.groupBy) {
      const i = this.groupBy.split(",").map((n) => n.trim());
      for (const n of i)
        t.searchParams.append(`${n}__groupby`, "");
    }
    if (this.aggregate) {
      const i = this.aggregate.split(",").map((n) => n.trim());
      for (const n of i) {
        const a = n.split(":");
        if (a.length >= 2) {
          const o = a[0], c = a[1];
          t.searchParams.append(`${o}__${c}`, "");
        }
      }
    }
    if (this.orderBy) {
      const i = this.orderBy.split(":"), n = i[0], a = i[1] || "asc";
      t.searchParams.set(`${n}__sort`, a);
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
}, l(G, "GouvQuery"), G);
_([
  u({ type: String, attribute: "api-type" })
], v.prototype, "apiType", void 0);
_([
  u({ type: String })
], v.prototype, "source", void 0);
_([
  u({ type: String, attribute: "base-url" })
], v.prototype, "baseUrl", void 0);
_([
  u({ type: String, attribute: "dataset-id" })
], v.prototype, "datasetId", void 0);
_([
  u({ type: String })
], v.prototype, "resource", void 0);
_([
  u({ type: String })
], v.prototype, "select", void 0);
_([
  u({ type: String })
], v.prototype, "where", void 0);
_([
  u({ type: String })
], v.prototype, "filter", void 0);
_([
  u({ type: String, attribute: "group-by" })
], v.prototype, "groupBy", void 0);
_([
  u({ type: String })
], v.prototype, "aggregate", void 0);
_([
  u({ type: String, attribute: "order-by" })
], v.prototype, "orderBy", void 0);
_([
  u({ type: Number })
], v.prototype, "limit", void 0);
_([
  u({ type: String })
], v.prototype, "transform", void 0);
_([
  u({ type: Number })
], v.prototype, "refresh", void 0);
_([
  $()
], v.prototype, "_loading", void 0);
_([
  $()
], v.prototype, "_error", void 0);
_([
  $()
], v.prototype, "_data", void 0);
_([
  $()
], v.prototype, "_rawData", void 0);
v = _([
  k("gouv-query")
], v);
function Ie(s) {
  const t = class t extends s {
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
      const n = vt(i);
      n !== void 0 && (this._sourceData = n, this.onSourceData(n)), this._unsubscribeSource = yt(i, {
        onLoaded: /* @__PURE__ */ l((a) => {
          this._sourceData = a, this._sourceLoading = !1, this._sourceError = null, this.onSourceData(a), this.requestUpdate();
        }, "onLoaded"),
        onLoading: /* @__PURE__ */ l(() => {
          this._sourceLoading = !0, this.requestUpdate();
        }, "onLoading"),
        onError: /* @__PURE__ */ l((a) => {
          this._sourceError = a, this._sourceLoading = !1, this.requestUpdate();
        }, "onError")
      });
    }
    _cleanupSubscription() {
      this._unsubscribeSource && (this._unsubscribeSource(), this._unsubscribeSource = null);
    }
  };
  l(t, "SourceSubscriberElement");
  let e = t;
  return e;
}
l(Ie, "SourceSubscriberMixin");
function ot(s, e = "nombre") {
  if (s == null || s === "")
    return "—";
  const t = typeof s == "string" ? parseFloat(s) : s;
  if (isNaN(t))
    return "—";
  switch (e) {
    case "nombre":
      return lt(t);
    case "pourcentage":
      return It(t);
    case "euro":
      return qt(t);
    case "decimal":
      return zt(t);
    default:
      return lt(t);
  }
}
l(ot, "formatValue");
function lt(s) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(s));
}
l(lt, "formatNumber");
function It(s) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(s / 100);
}
l(It, "formatPercentage");
function qt(s) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(s);
}
l(qt, "formatCurrency");
function zt(s) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(s);
}
l(zt, "formatDecimal");
function tr(s) {
  const e = typeof s == "string" ? new Date(s) : s;
  return isNaN(e.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(e);
}
l(tr, "formatDate");
function Ht(s, e, t) {
  return e !== void 0 && s >= e ? "vert" : t !== void 0 && s >= t ? "orange" : e !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
l(Ht, "getColorBySeuil");
function Vt(s) {
  const e = s.split(":");
  if (e.length === 1)
    return { type: "direct", field: e[0] };
  const t = e[0], r = e[1];
  if (e.length === 3) {
    let i = e[2];
    return i === "true" ? i = !0 : i === "false" ? i = !1 : isNaN(Number(i)) || (i = Number(i)), { type: t, field: r, filterField: r, filterValue: i };
  }
  return { type: t, field: r };
}
l(Vt, "parseExpression");
function ct(s, e) {
  const t = Vt(e);
  if (t.type === "direct" && !Array.isArray(s))
    return s[t.field];
  if (!Array.isArray(s))
    return null;
  const r = s;
  switch (t.type) {
    case "direct":
    case "first":
      return r.length > 0 ? r[0][t.field] : null;
    case "last":
      return r.length > 0 ? r[r.length - 1][t.field] : null;
    case "count":
      return t.filterValue !== void 0 ? r.filter((n) => n[t.field] === t.filterValue).length : r.length;
    case "sum":
      return r.reduce((n, a) => {
        const o = Number(a[t.field]);
        return n + (isNaN(o) ? 0 : o);
      }, 0);
    case "avg":
      return r.length === 0 ? null : r.reduce((n, a) => {
        const o = Number(a[t.field]);
        return n + (isNaN(o) ? 0 : o);
      }, 0) / r.length;
    case "min":
      return r.length === 0 ? null : Math.min(...r.map((n) => Number(n[t.field])).filter((n) => !isNaN(n)));
    case "max":
      return r.length === 0 ? null : Math.max(...r.map((n) => Number(n[t.field])).filter((n) => !isNaN(n)));
    default:
      return null;
  }
}
l(ct, "computeAggregation");
var P = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (i < 3 ? a(n) : i > 3 ? a(e, t, n) : a(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
const ut = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
var W;
let S = (W = class extends Ie(w) {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "";
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), fe("gouv-kpi");
  }
  _computeValue() {
    return !this._sourceData || !this.valeur ? null : ct(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const e = this._computeValue();
    return typeof e != "number" ? "bleu" : Ht(e, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const e = ct(this._sourceData, this.tendance);
    return typeof e != "number" ? null : {
      value: e,
      direction: e > 0 ? "up" : e < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const e = this._computeValue(), t = ot(e, this.format);
    return `${this.label}: ${t}`;
  }
  render() {
    const e = this._computeValue(), t = ot(e, this.format), r = ut[this._getColor()] || ut.bleu, i = this._getTendanceInfo();
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
}, l(W, "GouvKpi"), W);
S.styles = pt``;
P([
  u({ type: String })
], S.prototype, "source", void 0);
P([
  u({ type: String })
], S.prototype, "valeur", void 0);
P([
  u({ type: String })
], S.prototype, "label", void 0);
P([
  u({ type: String })
], S.prototype, "description", void 0);
P([
  u({ type: String })
], S.prototype, "icone", void 0);
P([
  u({ type: String })
], S.prototype, "format", void 0);
P([
  u({ type: String })
], S.prototype, "tendance", void 0);
P([
  u({ type: Number, attribute: "seuil-vert" })
], S.prototype, "seuilVert", void 0);
P([
  u({ type: Number, attribute: "seuil-orange" })
], S.prototype, "seuilOrange", void 0);
P([
  u({ type: String })
], S.prototype, "couleur", void 0);
S = P([
  k("gouv-kpi")
], S);
var A = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (i < 3 ? a(n) : i > 3 ? a(e, t, n) : a(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
}, J;
let x = (J = class extends Ie(w) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), fe("gouv-datalist"), this._initSort();
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
    }), this._sort) {
      const { key: t, direction: r } = this._sort;
      e.sort((i, n) => {
        const a = i[t], o = n[t];
        if (a === o)
          return 0;
        if (a == null)
          return 1;
        if (o == null)
          return -1;
        const c = typeof a == "number" && typeof o == "number" ? a - o : String(a).localeCompare(String(o), "fr");
        return r === "desc" ? -c : c;
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
    const e = this.parseColumns(), t = this.getFilteredData(), r = e.map((p) => p.label).join(";"), i = t.map((p) => e.map((f) => {
      const h = String(p[f.key] ?? "");
      return h.includes(";") || h.includes('"') ? `"${h.replace(/"/g, '""')}"` : h;
    }).join(";")), n = [r, ...i].join(`
`), a = new Blob([n], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(a), c = document.createElement("a");
    c.href = o, c.download = "export.csv", c.click(), URL.revokeObjectURL(o);
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
      const i = e.find((o) => o.key === r), n = (i == null ? void 0 : i.label) || r, a = this._getUniqueValues(r);
      return d`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${r}">${n}</label>
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
    const e = this.parseColumns(), t = this._getFilterableColumns(), r = this._getPaginatedData(), i = this._getTotalPages(), n = this.getFilteredData().length;
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
            ${this._searchQuery || Object.values(this._activeFilters).some((a) => a) ? " (filtré)" : ""}
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
}, l(J, "GouvDatalist"), J);
x.styles = pt``;
A([
  u({ type: String })
], x.prototype, "source", void 0);
A([
  u({ type: String })
], x.prototype, "colonnes", void 0);
A([
  u({ type: Boolean })
], x.prototype, "recherche", void 0);
A([
  u({ type: String })
], x.prototype, "filtres", void 0);
A([
  u({ type: String })
], x.prototype, "tri", void 0);
A([
  u({ type: Number })
], x.prototype, "pagination", void 0);
A([
  u({ type: String })
], x.prototype, "export", void 0);
A([
  $()
], x.prototype, "_data", void 0);
A([
  $()
], x.prototype, "_searchQuery", void 0);
A([
  $()
], x.prototype, "_activeFilters", void 0);
A([
  $()
], x.prototype, "_sort", void 0);
A([
  $()
], x.prototype, "_currentPage", void 0);
x = A([
  k("gouv-datalist")
], x);
function Gt(s) {
  return !s || typeof s != "string" || ["N/A", "null", "undefined", "00", ""].includes(s) ? !1 : !!(s === "2A" || s === "2B" || /^97[1-6]$/.test(s) || /^(0[1-9]|[1-8]\d|9[0-5])$/.test(s));
}
l(Gt, "isValidDeptCode");
var m = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (i < 3 ? a(n) : i > 3 ? a(e, t, n) : a(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
const Wt = {
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
var Q;
let g = (Q = class extends Ie(w) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.codeField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._data = [];
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), fe("gouv-dsfr-chart", this.type);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [];
  }
  // --- Data processing ---
  _processData() {
    if (!this._data || this._data.length === 0)
      return { x: "[[]]", y: "[[]]" };
    const e = [], t = [], r = [];
    for (const i of this._data)
      e.push(String(y(i, this.labelField) ?? "N/A")), t.push(Number(y(i, this.valueField)) || 0), this.valueField2 && r.push(Number(y(i, this.valueField2)) || 0);
    return {
      x: JSON.stringify([e]),
      y: JSON.stringify([t]),
      y2: this.valueField2 ? JSON.stringify([r]) : void 0
    };
  }
  _processMapData() {
    if (!this._data || this._data.length === 0)
      return "{}";
    const e = this.codeField || this.labelField, t = {};
    for (const r of this._data) {
      let i = String(y(r, e) ?? "").trim();
      /^\d+$/.test(i) && i.length < 3 && (i = i.padStart(2, "0"));
      const n = Number(y(r, this.valueField)) || 0;
      (this.type === "map" ? Gt(i) : i !== "") && (t[i] = Math.round(n * 100) / 100);
    }
    return JSON.stringify(t);
  }
  // --- Attribute builders ---
  _getCommonAttributes() {
    const e = {};
    if (this.selectedPalette && (e["selected-palette"] = this.selectedPalette), this.unitTooltip && (e["unit-tooltip"] = this.unitTooltip), this.xMin && (e["x-min"] = this.xMin), this.xMax && (e["x-max"] = this.xMax), this.yMin && (e["y-min"] = this.yMin), this.yMax && (e["y-max"] = this.yMax), this.name)
      e.name = this.name;
    else if (this.valueField) {
      const t = this.valueField2 ? [this.valueField, this.valueField2] : [this.valueField];
      e.name = JSON.stringify(t);
    }
    return e;
  }
  _getTypeSpecificAttributes() {
    const { x: e, y: t, y2: r } = this._processData(), i = {}, n = {};
    switch (this.type) {
      case "gauge": {
        const a = this.gaugeValue ?? (this._data.length > 0 && Number(y(this._data[0], this.valueField)) || 0);
        i.percent = String(Math.round(a)), i.init = "0", i.target = "100";
        break;
      }
      case "bar-line":
        i.x = e, i["y-bar"] = t, i["y-line"] = r || t, this.unitTooltipBar && (i["unit-tooltip-bar"] = this.unitTooltipBar);
        break;
      case "map":
      case "map-reg": {
        if (i.data = this._processMapData(), this._data.length > 0) {
          let a = 0, o = 0;
          for (const c of this._data) {
            const p = Number(y(c, this.valueField));
            isNaN(p) || (a += p, o++);
          }
          if (o > 0) {
            const c = Math.round(a / o * 100) / 100;
            n.value = String(c);
          }
        }
        n.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        break;
      }
      default:
        i.x = e, i.y = t;
        break;
    }
    return this.type === "bar" && (this.horizontal && (i.horizontal = "true"), this.stacked && (i.stacked = "true"), this.highlightIndex && (i["highlight-index"] = this.highlightIndex)), this.type === "pie" && this.fill && (i.fill = "true"), (this.type === "map" || this.type === "map-reg") && this.mapHighlight && (i.highlight = this.mapHighlight), { attrs: i, deferred: n };
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
    const n = document.createElement("div");
    return n.className = "gouv-dsfr-chart__wrapper", n.setAttribute("role", "img"), n.setAttribute("aria-label", this._getAriaLabel()), n.appendChild(i), n;
  }
  _renderChart() {
    const e = Wt[this.type];
    if (!e)
      return d`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const { attrs: t, deferred: r } = this._getTypeSpecificAttributes(), i = {
      ...this._getCommonAttributes(),
      ...t
    }, n = this._createChartElement(e, i, r), a = this.querySelector(".gouv-dsfr-chart__wrapper");
    return a && a.remove(), d`${n}`;
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
}, l(Q, "GouvDsfrChart"), Q);
m([
  u({ type: String })
], g.prototype, "source", void 0);
m([
  u({ type: String })
], g.prototype, "type", void 0);
m([
  u({ type: String, attribute: "label-field" })
], g.prototype, "labelField", void 0);
m([
  u({ type: String, attribute: "code-field" })
], g.prototype, "codeField", void 0);
m([
  u({ type: String, attribute: "value-field" })
], g.prototype, "valueField", void 0);
m([
  u({ type: String, attribute: "value-field-2" })
], g.prototype, "valueField2", void 0);
m([
  u({ type: String })
], g.prototype, "name", void 0);
m([
  u({ type: String, attribute: "selected-palette" })
], g.prototype, "selectedPalette", void 0);
m([
  u({ type: String, attribute: "unit-tooltip" })
], g.prototype, "unitTooltip", void 0);
m([
  u({ type: String, attribute: "unit-tooltip-bar" })
], g.prototype, "unitTooltipBar", void 0);
m([
  u({ type: Boolean })
], g.prototype, "horizontal", void 0);
m([
  u({ type: Boolean })
], g.prototype, "stacked", void 0);
m([
  u({ type: Boolean })
], g.prototype, "fill", void 0);
m([
  u({ type: String, attribute: "highlight-index" })
], g.prototype, "highlightIndex", void 0);
m([
  u({ type: String, attribute: "x-min" })
], g.prototype, "xMin", void 0);
m([
  u({ type: String, attribute: "x-max" })
], g.prototype, "xMax", void 0);
m([
  u({ type: String, attribute: "y-min" })
], g.prototype, "yMin", void 0);
m([
  u({ type: String, attribute: "y-max" })
], g.prototype, "yMax", void 0);
m([
  u({ type: Number, attribute: "gauge-value" })
], g.prototype, "gaugeValue", void 0);
m([
  u({ type: String, attribute: "map-highlight" })
], g.prototype, "mapHighlight", void 0);
m([
  $()
], g.prototype, "_data", void 0);
g = m([
  k("gouv-dsfr-chart")
], g);
var we = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (i < 3 ? a(n) : i > 3 ? a(e, t, n) : a(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
}, K;
let pe = (K = class extends w {
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
}, l(K, "AppHeader"), K);
we([
  u({ type: String, attribute: "current-page" })
], pe.prototype, "currentPage", void 0);
we([
  u({ type: String, attribute: "base-path" })
], pe.prototype, "basePath", void 0);
we([
  $()
], pe.prototype, "_favCount", void 0);
pe = we([
  k("app-header")
], pe);
var $t = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (i < 3 ? a(n) : i > 3 ? a(e, t, n) : a(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
}, X;
let De = (X = class extends w {
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
}, l(X, "AppFooter"), X);
$t([
  u({ type: String, attribute: "base-path" })
], De.prototype, "basePath", void 0);
De = $t([
  k("app-footer")
], De);
var se = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (i < 3 ? a(n) : i > 3 ? a(e, t, n) : a(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
}, Y;
let B = (Y = class extends w {
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
    let n = e.clientX - r.left;
    n = Math.max(this.minLeftWidth, Math.min(n, i - this.minRightWidth)), this._currentLeftRatio = n / i * 100, this.requestUpdate();
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
}, l(Y, "AppLayoutBuilder"), Y);
se([
  u({ type: Number, attribute: "left-ratio" })
], B.prototype, "leftRatio", void 0);
se([
  u({ type: Number, attribute: "min-left-width" })
], B.prototype, "minLeftWidth", void 0);
se([
  u({ type: Number, attribute: "min-right-width" })
], B.prototype, "minRightWidth", void 0);
se([
  $()
], B.prototype, "_isResizing", void 0);
se([
  $()
], B.prototype, "_currentLeftRatio", void 0);
B = se([
  k("app-layout-builder")
], B);
var ge = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (i < 3 ? a(n) : i > 3 ? a(e, t, n) : a(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
}, Z;
let ne = (Z = class extends w {
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
    const t = this._isActive(e.id), r = this._isParentActive(e);
    if (e.children) {
      const i = `fr-sidemenu-${e.id}`, n = r;
      return d`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${n}"
                  aria-controls="${i}">
            ${e.label}
          </button>
          <div class="fr-collapse ${n ? "fr-collapse--expanded" : ""}" id="${i}">
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
      const r = e[0] === "components" ? "Nos composants" : "Graphiques DSFR";
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
}, l(Z, "AppLayoutDemo"), Z);
ge([
  u({ type: String })
], ne.prototype, "title", void 0);
ge([
  u({ type: String })
], ne.prototype, "icon", void 0);
ge([
  u({ type: String, attribute: "active-path" })
], ne.prototype, "activePath", void 0);
ge([
  u({ type: String, attribute: "base-path" })
], ne.prototype, "basePath", void 0);
ne = ge([
  k("app-layout-demo")
], ne);
var I = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (i < 3 ? a(n) : i > 3 ? a(e, t, n) : a(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
}, ee;
let D = (ee = class extends w {
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
}, l(ee, "AppPreviewPanel"), ee);
I([
  u({ type: Boolean, attribute: "show-data-tab" })
], D.prototype, "showDataTab", void 0);
I([
  u({ type: Boolean, attribute: "show-save-button" })
], D.prototype, "showSaveButton", void 0);
I([
  u({ type: Boolean, attribute: "show-playground-button" })
], D.prototype, "showPlaygroundButton", void 0);
I([
  u({ type: String, attribute: "tab-labels" })
], D.prototype, "tabLabels", void 0);
I([
  u({ type: String, attribute: "active-tab" })
], D.prototype, "activeTab", void 0);
I([
  $()
], D.prototype, "_activeTab", void 0);
D = I([
  k("app-preview-panel")
], D);
function Jt(s, e, t) {
  return s.map((r) => ({
    label: String(y(r, e) ?? "N/A"),
    value: Number(y(r, t)) || 0
  }));
}
l(Jt, "extractLabelValues");
function Qt(s, e) {
  if (e === "none")
    return s;
  const t = /* @__PURE__ */ new Map();
  for (const i of s) {
    const n = t.get(i.label) || [];
    n.push(i.value), t.set(i.label, n);
  }
  const r = [];
  for (const [i, n] of t)
    r.push({ label: i, value: Kt(n, e) });
  return r;
}
l(Qt, "aggregateByLabel");
function Kt(s, e) {
  switch (e) {
    case "sum":
      return s.reduce((t, r) => t + r, 0);
    case "avg":
      return s.reduce((t, r) => t + r, 0) / s.length;
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
l(Kt, "computeGroupValue");
function Xt(s, e) {
  return e === "none" ? s : [...s].sort((t, r) => e === "desc" ? r.value - t.value : t.value - r.value);
}
l(Xt, "sortByValue");
function rr(s, e, t, r = "none", i = "none", n = 0) {
  if (!s || s.length === 0)
    return { labels: [], values: [] };
  let a = Jt(s, e, t);
  return a = Qt(a, r), a = Xt(a, i), n > 0 && (a = a.slice(0, n)), {
    labels: a.map((o) => o.label),
    values: a.map((o) => Math.round(o.value * 100) / 100)
  };
}
l(rr, "processChartData");
export {
  De as AppFooter,
  pe as AppHeader,
  B as AppLayoutBuilder,
  ne as AppLayoutDemo,
  M as DATA_EVENTS,
  x as GouvDatalist,
  g as GouvDsfrChart,
  S as GouvKpi,
  v as GouvQuery,
  E as GouvSource,
  Ie as SourceSubscriberMixin,
  Qt as aggregateByLabel,
  ct as computeAggregation,
  Te as dispatchDataError,
  Ne as dispatchDataLoaded,
  Oe as dispatchDataLoading,
  Jt as extractLabelValues,
  qt as formatCurrency,
  tr as formatDate,
  lt as formatNumber,
  It as formatPercentage,
  ot as formatValue,
  y as getByPath,
  er as getByPathOrDefault,
  vt as getDataCache,
  Zt as hasPath,
  Vt as parseExpression,
  rr as processChartData,
  Xt as sortByValue,
  yt as subscribeToSource
};
