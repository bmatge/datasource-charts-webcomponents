var Nt = Object.defineProperty;
var c = (a, e) => Nt(a, "name", { value: e, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis, Je = Ee.ShadowRoot && (Ee.ShadyCSS === void 0 || Ee.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ke = Symbol(), lt = /* @__PURE__ */ new WeakMap();
var X;
let kt = (X = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== Ke) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Je && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = lt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && lt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}, c(X, "n"), X);
const Tt = /* @__PURE__ */ c((a) => new kt(typeof a == "string" ? a : a + "", void 0, Ke), "r$4"), Et = /* @__PURE__ */ c((a, ...e) => {
  const t = a.length === 1 ? a[0] : e.reduce((r, i, s) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + a[s + 1], a[0]);
  return new kt(t, a, Ke);
}, "i$3"), Lt = /* @__PURE__ */ c((a, e) => {
  if (Je) a.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = Ee.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, a.appendChild(r);
  }
}, "S$1"), ct = Je ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return Tt(t);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: zt, defineProperty: Ut, getOwnPropertyDescriptor: jt, getOwnPropertyNames: It, getOwnPropertySymbols: Bt, getPrototypeOf: qt } = Object, z = globalThis, ut = z.trustedTypes, Vt = ut ? ut.emptyScript : "", Te = z.reactiveElementPolyfillSupport, be = /* @__PURE__ */ c((a, e) => a, "d$1"), Pe = { toAttribute(a, e) {
  switch (e) {
    case Boolean:
      a = a ? Vt : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, e) {
  let t = a;
  switch (e) {
    case Boolean:
      t = a !== null;
      break;
    case Number:
      t = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(a);
      } catch {
        t = null;
      }
  }
  return t;
} }, Xe = /* @__PURE__ */ c((a, e) => !zt(a, e), "f$1"), dt = { attribute: !0, type: String, converter: Pe, reflect: !1, useDefault: !1, hasChanged: Xe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), z.litPropertyMetadata ?? (z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var Z;
let J = (Z = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = dt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Ut(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: s } = jt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: i, set(n) {
      const o = i == null ? void 0 : i.call(this);
      s == null || s.call(this, n), this.requestUpdate(e, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? dt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(be("elementProperties"))) return;
    const e = qt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(be("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(be("properties"))) {
      const t = this.properties, r = [...It(t), ...Bt(t)];
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
      for (const i of r) t.unshift(ct(i));
    } else e !== void 0 && t.push(ct(e));
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
    return Lt(e, this.constructor.elementStyles), e;
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
      const n = (((s = r.converter) == null ? void 0 : s.toAttribute) !== void 0 ? r.converter : Pe).toAttribute(t, r.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, n;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? o.converter : Pe;
      this._$Em = i;
      const h = l.fromAttribute(t, o.type);
      this[i] = h ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, s) {
    var n;
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (s = this[e]), r ?? (r = o.getPropertyOptions(e)), !((r.hasChanged ?? Xe)(s, t) || r.useDefault && r.reflect && s === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(o._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: s }, n) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), s !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, n] of i) {
        const { wrapped: o } = n, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, n, l);
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
}, c(Z, "y"), Z);
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[be("elementProperties")] = /* @__PURE__ */ new Map(), J[be("finalized")] = /* @__PURE__ */ new Map(), Te == null || Te({ ReactiveElement: J }), (z.reactiveElementVersions ?? (z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const me = globalThis, ht = /* @__PURE__ */ c((a) => a, "i$1"), Re = me.trustedTypes, pt = Re ? Re.createPolicy("lit-html", { createHTML: /* @__PURE__ */ c((a) => a, "createHTML") }) : void 0, Pt = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, Rt = "?" + L, Ht = `<${Rt}>`, H = document, ve = /* @__PURE__ */ c(() => H.createComment(""), "c"), ye = /* @__PURE__ */ c((a) => a === null || typeof a != "object" && typeof a != "function", "a"), Ze = Array.isArray, Gt = /* @__PURE__ */ c((a) => Ze(a) || typeof (a == null ? void 0 : a[Symbol.iterator]) == "function", "d"), Le = `[ 	
\f\r]`, _e = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ft = /-->/g, gt = />/g, j = RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _t = /'/g, bt = /"/g, Mt = /^(?:script|style|textarea|title)$/i, Wt = /* @__PURE__ */ c((a) => (e, ...t) => ({ _$litType$: a, strings: e, values: t }), "x"), d = Wt(1), de = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), mt = /* @__PURE__ */ new WeakMap(), I = H.createTreeWalker(H, 129);
function Dt(a, e) {
  if (!Ze(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pt !== void 0 ? pt.createHTML(e) : e;
}
c(Dt, "V");
const Qt = /* @__PURE__ */ c((a, e) => {
  const t = a.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = _e;
  for (let o = 0; o < t; o++) {
    const l = a[o];
    let h, f, p = -1, _ = 0;
    for (; _ < l.length && (n.lastIndex = _, f = n.exec(l), f !== null); ) _ = n.lastIndex, n === _e ? f[1] === "!--" ? n = ft : f[1] !== void 0 ? n = gt : f[2] !== void 0 ? (Mt.test(f[2]) && (i = RegExp("</" + f[2], "g")), n = j) : f[3] !== void 0 && (n = j) : n === j ? f[0] === ">" ? (n = i ?? _e, p = -1) : f[1] === void 0 ? p = -2 : (p = n.lastIndex - f[2].length, h = f[1], n = f[3] === void 0 ? j : f[3] === '"' ? bt : _t) : n === bt || n === _t ? n = j : n === ft || n === gt ? n = _e : (n = j, i = void 0);
    const P = n === j && a[o + 1].startsWith("/>") ? " " : "";
    s += n === _e ? l + Ht : p >= 0 ? (r.push(h), l.slice(0, p) + Pt + l.slice(p) + L + P) : l + L + (p === -2 ? o : P);
  }
  return [Dt(a, s + (a[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
}, "N"), Me = class Me {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let s = 0, n = 0;
    const o = e.length - 1, l = this.parts, [h, f] = Qt(e, t);
    if (this.el = Me.createElement(h, r), I.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = I.nextNode()) !== null && l.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Pt)) {
          const _ = f[n++], P = i.getAttribute(p).split(L), Ae = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: s, name: Ae[2], strings: P, ctor: Ae[1] === "." ? Ve : Ae[1] === "?" ? He : Ae[1] === "@" ? Ge : pe }), i.removeAttribute(p);
        } else p.startsWith(L) && (l.push({ type: 6, index: s }), i.removeAttribute(p));
        if (Mt.test(i.tagName)) {
          const p = i.textContent.split(L), _ = p.length - 1;
          if (_ > 0) {
            i.textContent = Re ? Re.emptyScript : "";
            for (let P = 0; P < _; P++) i.append(p[P], ve()), I.nextNode(), l.push({ type: 2, index: ++s });
            i.append(p[_], ve());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Rt) l.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(L, p + 1)) !== -1; ) l.push({ type: 7, index: s }), p += L.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const r = H.createElement("template");
    return r.innerHTML = e, r;
  }
};
c(Me, "S");
let $e = Me;
function he(a, e, t = a, r) {
  var n, o;
  if (e === de) return e;
  let i = r !== void 0 ? (n = t._$Co) == null ? void 0 : n[r] : t._$Cl;
  const s = ye(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), s === void 0 ? i = void 0 : (i = new s(a), i._$AT(a, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = i : t._$Cl = i), i !== void 0 && (e = he(a, i._$AS(a, e.values), i, r)), e;
}
c(he, "M");
const tt = class tt {
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
    const { el: { content: t }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? H).importNode(t, !0);
    I.currentNode = i;
    let s = I.nextNode(), n = 0, o = 0, l = r[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let h;
        l.type === 2 ? h = new we(s, s.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (h = new We(s, this, e)), this._$AV.push(h), l = r[++o];
      }
      n !== (l == null ? void 0 : l.index) && (s = I.nextNode(), n++);
    }
    return I.currentNode = H, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
};
c(tt, "R");
let qe = tt;
const De = class De {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = he(this, e, t), ye(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== de && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Gt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && ye(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = $e.createElement(Dt(r.h, r.h[0]), this.options)), r);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(t);
    else {
      const n = new qe(i, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = mt.get(e.strings);
    return t === void 0 && mt.set(e.strings, t = new $e(e)), t;
  }
  k(e) {
    Ze(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const s of e) i === t.length ? t.push(r = new De(this.O(ve()), this.O(ve()), this, this.options)) : r = t[i], r._$AI(s), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = ht(e).nextSibling;
      ht(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
};
c(De, "k");
let we = De;
const rt = class rt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, s) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(e, t = this, r, i) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) e = he(this, e, t, 0), n = !ye(e) || e !== this._$AH && e !== de, n && (this._$AH = e);
    else {
      const o = e;
      let l, h;
      for (e = s[0], l = 0; l < s.length - 1; l++) h = he(this, o[r + l], t, l), h === de && (h = this._$AH[l]), n || (n = !ye(h) || h !== this._$AH[l]), h === g ? e = g : e !== g && (e += (h ?? "") + s[l + 1]), this._$AH[l] = h;
    }
    n && !i && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
c(rt, "H");
let pe = rt;
const it = class it extends pe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
};
c(it, "I");
let Ve = it;
const st = class st extends pe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
};
c(st, "L");
let He = st;
const nt = class nt extends pe {
  constructor(e, t, r, i, s) {
    super(e, t, r, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = he(this, e, t, 0) ?? g) === de) return;
    const r = this._$AH, i = e === g && r !== g || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== g && (r === g || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
};
c(nt, "z");
let Ge = nt;
const at = class at {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    he(this, e);
  }
};
c(at, "Z");
let We = at;
const ze = me.litHtmlPolyfillSupport;
ze == null || ze($e, we), (me.litHtmlVersions ?? (me.litHtmlVersions = [])).push("3.3.2");
const Jt = /* @__PURE__ */ c((a, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = i = new we(e.insertBefore(ve(), s), s, void 0, t ?? {});
  }
  return i._$AI(a), i;
}, "D");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = globalThis, ot = class ot extends J {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Jt(t, this.renderRoot, this.renderOptions);
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
    return de;
  }
};
c(ot, "i");
let x = ot;
var At;
x._$litElement$ = !0, x.finalized = !0, (At = B.litElementHydrateSupport) == null || At.call(B, { LitElement: x });
const Ue = B.litElementPolyfillSupport;
Ue == null || Ue({ LitElement: x });
(B.litElementVersions ?? (B.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = /* @__PURE__ */ c((a) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(a, e);
  }) : customElements.define(a, e);
}, "t");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kt = { attribute: !0, type: String, converter: Pe, reflect: !1, hasChanged: Xe }, Xt = /* @__PURE__ */ c((a = Kt, e, t) => {
  const { kind: r, metadata: i } = t;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), r === "setter" && ((a = Object.create(a)).wrapped = !0), s.set(t.name, a), r === "accessor") {
    const { name: n } = t;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(n, l, a, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(n, void 0, a, o), o;
    } };
  }
  if (r === "setter") {
    const { name: n } = t;
    return function(o) {
      const l = this[n];
      e.call(this, o), this.requestUpdate(n, l, a, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
}, "r$1");
function u(a) {
  return (e, t) => typeof t == "object" ? Xt(a, e, t) : ((r, i, s) => {
    const n = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), n ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(a, e, t);
}
c(u, "n");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function m(a) {
  return u({ ...a, state: !0, attribute: !1 });
}
c(m, "r");
function $(a, e) {
  if (!e || e.trim() === "")
    return a;
  const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let i = a;
  for (const s of r) {
    if (i == null || typeof i != "object")
      return;
    i = i[s];
  }
  return i;
}
c($, "getByPath");
function _r(a, e) {
  return $(a, e) !== void 0;
}
c(_r, "hasPath");
function vt(a, e, t) {
  const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let s = a;
  for (let n = 0; n < i.length - 1; n++) {
    const o = i[n];
    (!(o in s) || typeof s[o] != "object" || s[o] === null) && (s[o] = {}), s = s[o];
  }
  s[i[i.length - 1]] = t;
}
c(vt, "setByPath");
function br(a, e, t) {
  const r = $(a, e);
  return r !== void 0 ? r : t;
}
c(br, "getByPathOrDefault");
const Zt = "https://chartsbuilder.matge.com/beacon", yt = /* @__PURE__ */ new Set();
function W(a, e) {
  const t = `${a}:${e || ""}`;
  if (yt.has(t) || (yt.add(t), typeof window > "u"))
    return;
  const r = window.location.hostname;
  if (r === "localhost" || r === "127.0.0.1" || r === "chartsbuilder.matge.com")
    return;
  const i = new URLSearchParams();
  i.set("c", a), e && i.set("t", e);
  const s = `${Zt}?${i.toString()}`;
  try {
    fetch(s, { method: "GET", keepalive: !0, mode: "no-cors" }).catch(() => {
    });
  } catch {
  }
}
c(W, "sendWidgetBeacon");
function $t(a, e = !1) {
  if (typeof a == "number")
    return isNaN(a) ? e ? null : 0 : a;
  if (typeof a != "string")
    return e ? null : 0;
  let t = a.trim();
  if (t === "")
    return e ? null : 0;
  t = t.replace(/\s/g, "");
  const r = t.includes(","), i = t.includes(".");
  if (r && i) {
    const n = t.lastIndexOf(","), o = t.lastIndexOf(".");
    n > o ? t = t.replace(/\./g, "").replace(",", ".") : t = t.replace(/,/g, "");
  } else r && (t = t.replace(",", "."));
  const s = parseFloat(t);
  return isNaN(s) ? e ? null : 0 : s;
}
c($t, "toNumber");
function Yt(a) {
  if (typeof a != "string")
    return !1;
  const e = a.trim();
  return e === "" ? !1 : /^-?[\d\s]+([.,]\d+)?$/.test(e);
}
c(Yt, "looksLikeNumber");
function er(a) {
  return !a || typeof a != "string" || ["N/A", "null", "undefined", "00", ""].includes(a) ? !1 : !!(a === "2A" || a === "2B" || /^97[1-6]$/.test(a) || /^(0[1-9]|[1-8]\d|9[0-5])$/.test(a));
}
c(er, "isValidDeptCode");
const je = {
  baseUrl: "https://chartsbuilder.matge.com",
  endpoints: {
    grist: "/grist-proxy",
    gristGouv: "/grist-gouv-proxy",
    albert: "/albert-proxy",
    tabular: "/tabular-proxy"
  }
};
function tr() {
  return typeof window < "u" && window.location.hostname === "localhost" && window.location.port === "5173";
}
c(tr, "isViteDevMode");
function rr() {
  return typeof window < "u" && "__TAURI__" in window;
}
c(rr, "isTauriMode");
function Ot() {
  var r;
  const a = { ...je.endpoints };
  return tr() ? { baseUrl: "", endpoints: a } : rr() ? { baseUrl: je.baseUrl, endpoints: a } : {
    baseUrl: ((r = import.meta.env) == null ? void 0 : r.VITE_PROXY_URL) || je.baseUrl,
    endpoints: a
  };
}
c(Ot, "getProxyConfig");
function ir(a) {
  const e = Ot();
  return a.includes("tabular-api.data.gouv.fr") ? a.replace("https://tabular-api.data.gouv.fr", `${e.baseUrl}${e.endpoints.tabular}`) : a.includes("docs.getgrist.com") ? a.replace("https://docs.getgrist.com", `${e.baseUrl}${e.endpoints.grist}`) : a.includes("grist.numerique.gouv.fr") ? a.replace("https://grist.numerique.gouv.fr", `${e.baseUrl}${e.endpoints.gristGouv}`) : a.includes("albert.api.etalab.gouv.fr") ? a.replace("https://albert.api.etalab.gouv.fr", `${e.baseUrl}${e.endpoints.albert}`) : a;
}
c(ir, "getProxiedUrl");
const N = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading"
}, Ye = /* @__PURE__ */ new Map();
function sr(a, e) {
  Ye.set(a, e);
}
c(sr, "setDataCache");
function xe(a) {
  return Ye.get(a);
}
c(xe, "getDataCache");
function Oe(a) {
  Ye.delete(a);
}
c(Oe, "clearDataCache");
function K(a, e) {
  sr(a, e);
  const t = new CustomEvent(N.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: a, data: e }
  });
  document.dispatchEvent(t);
}
c(K, "dispatchDataLoaded");
function q(a, e) {
  const t = new CustomEvent(N.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: a, error: e }
  });
  document.dispatchEvent(t);
}
c(q, "dispatchDataError");
function V(a) {
  const e = new CustomEvent(N.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: a }
  });
  document.dispatchEvent(e);
}
c(V, "dispatchDataLoading");
function Fe(a, e) {
  const t = /* @__PURE__ */ c((s) => {
    const n = s;
    n.detail.sourceId === a && e.onLoaded && e.onLoaded(n.detail.data);
  }, "handleLoaded"), r = /* @__PURE__ */ c((s) => {
    const n = s;
    n.detail.sourceId === a && e.onError && e.onError(n.detail.error);
  }, "handleError"), i = /* @__PURE__ */ c((s) => {
    s.detail.sourceId === a && e.onLoading && e.onLoading();
  }, "handleLoading");
  return document.addEventListener(N.LOADED, t), document.addEventListener(N.ERROR, r), document.addEventListener(N.LOADING, i), () => {
    document.removeEventListener(N.LOADED, t), document.removeEventListener(N.ERROR, r), document.removeEventListener(N.LOADING, i);
  };
}
c(Fe, "subscribeToSource");
var F = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, Y;
let M = (Y = class extends x {
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
    super.connectedCallback(), W("gouv-source"), this._setupRefresh();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && Oe(this.id);
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
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, V(this.id);
      try {
        const e = ir(this._buildUrl()), t = this._buildFetchOptions(), r = await fetch(e, {
          ...t,
          signal: this._abortController.signal
        });
        if (!r.ok)
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        const i = await r.json();
        this._data = this.transform ? $(i, this.transform) : i, K(this.id, this._data);
      } catch (e) {
        if (e.name === "AbortError")
          return;
        this._error = e, q(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, e);
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
}, c(Y, "GouvSource"), Y);
F([
  u({ type: String })
], M.prototype, "url", void 0);
F([
  u({ type: String })
], M.prototype, "method", void 0);
F([
  u({ type: String })
], M.prototype, "headers", void 0);
F([
  u({ type: String })
], M.prototype, "params", void 0);
F([
  u({ type: Number })
], M.prototype, "refresh", void 0);
F([
  u({ type: String })
], M.prototype, "transform", void 0);
F([
  m()
], M.prototype, "_loading", void 0);
F([
  m()
], M.prototype, "_error", void 0);
F([
  m()
], M.prototype, "_data", void 0);
M = F([
  R("gouv-source")
], M);
var w = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
const ke = 100, Ie = 10;
var ee;
let y = (ee = class extends x {
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
    super.connectedCallback(), W("gouv-query", this.apiType), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && Oe(this.id);
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
    const e = xe(this.source);
    e !== void 0 && (this._rawData = Array.isArray(e) ? e : [e], this._processClientSide()), this._unsubscribe = Fe(this.source, {
      onLoaded: /* @__PURE__ */ c((t) => {
        this._rawData = Array.isArray(t) ? t : [t], this._processClientSide();
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ c(() => {
        this._loading = !0, V(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ c((t) => {
        this._error = t, this._loading = !1, q(this.id, t);
      }, "onError")
    });
  }
  /**
   * Traitement côté client des données
   */
  _processClientSide() {
    try {
      V(this.id), this._loading = !0;
      let e = [...this._rawData];
      const t = this.filter || this.where;
      t && (e = this._applyFilters(e, t)), this.groupBy && (e = this._applyGroupByAndAggregate(e)), this.orderBy && (e = this._applySort(e)), this.limit > 0 && (e = e.slice(0, this.limit)), this._data = e, K(this.id, this._data);
    } catch (e) {
      this._error = e, q(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de traitement`, e);
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
        const n = s[0], o = s[1];
        let l;
        if (s.length > 2) {
          const h = s.slice(2).join(":");
          o === "in" || o === "notin" ? l = h.split("|").map((f) => {
            const p = this._parseValue(f);
            return typeof p == "boolean" ? String(p) : p;
          }) : l = this._parseValue(h);
        }
        t.push({ field: n, operator: o, value: l });
      }
    }
    return t;
  }
  _parseValue(e) {
    return e === "true" ? !0 : e === "false" ? !1 : !isNaN(Number(e)) && e !== "" ? Number(e) : e;
  }
  _matchesFilter(e, t) {
    const r = $(e, t.field);
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
    const t = this.groupBy.split(",").map((n) => n.trim()).filter(Boolean), r = this._parseAggregates(this.aggregate), i = /* @__PURE__ */ new Map();
    for (const n of e) {
      const o = t.map((l) => String($(n, l) ?? "")).join("|||");
      i.has(o) || i.set(o, []), i.get(o).push(n);
    }
    const s = [];
    for (const [n, o] of i) {
      const l = {}, h = n.split("|||");
      t.forEach((f, p) => {
        vt(l, f, h[p]);
      });
      for (const f of r) {
        const p = f.alias || `${f.field}__${f.function}`;
        vt(l, p, this._computeAggregate(o, f));
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
    const r = e.map((i) => Number($(i, t.field))).filter((i) => !isNaN(i));
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
    return [...e].sort((s, n) => {
      const o = $(s, r), l = $(n, r), h = Number(o), f = Number(l);
      if (!isNaN(h) && !isNaN(f))
        return i === "desc" ? f - h : h - f;
      const p = String(o ?? ""), _ = String(l ?? "");
      return i === "desc" ? _.localeCompare(p) : p.localeCompare(_);
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
    this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, V(this.id);
    try {
      this.apiType === "opendatasoft" ? await this._fetchFromOdsWithPagination() : await this._fetchSinglePage();
    } catch (e) {
      if (e.name === "AbortError")
        return;
      this._error = e, q(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de requête API`, e);
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
    const r = await t.json();
    let i = this.transform ? $(r, this.transform) : r;
    Array.isArray(i) || (this.apiType === "tabular" && r.data ? i = r.data : i = [i]), this._data = i, K(this.id, this._data);
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
    const t = this.limit <= 0 ? Ie * ke : this.limit, r = ke;
    let i = [], s = 0, n = -1;
    for (let o = 0; o < Ie; o++) {
      const l = t - i.length;
      if (l <= 0)
        break;
      const h = this._buildOpenDataSoftUrl(Math.min(r, l), s), f = await fetch(h, {
        signal: this._abortController.signal
      });
      if (!f.ok)
        throw new Error(`HTTP ${f.status}: ${f.statusText}`);
      const p = await f.json(), _ = p.results || [];
      if (i = i.concat(_), typeof p.total_count == "number" && (n = p.total_count), n >= 0 && i.length >= n || _.length < r)
        break;
      s += _.length;
    }
    n >= 0 && i.length < n && i.length < t && console.warn(`gouv-query[${this.id}]: pagination incomplete - ${i.length}/${n} resultats recuperes (limite de securite: ${Ie} pages de ${ke})`), this._data = this.transform ? $(i, this.transform) : i, K(this.id, this._data);
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
    const r = this.baseUrl || "https://data.opendatasoft.com", i = new URL(`${r}/api/explore/v2.1/catalog/datasets/${this.datasetId}/records`);
    this.select && i.searchParams.set("select", this.select);
    const s = this.where || this.filter;
    if (s && i.searchParams.set("where", s), this.groupBy && i.searchParams.set("group_by", this.groupBy), this.orderBy) {
      const n = this.orderBy.replace(/:(\w+)$/, (o, l) => ` ${l.toUpperCase()}`);
      i.searchParams.set("order_by", n);
    }
    return e !== void 0 ? i.searchParams.set("limit", String(e)) : this.limit > 0 && i.searchParams.set("limit", String(Math.min(this.limit, ke))), t && t > 0 && i.searchParams.set("offset", String(t)), i.toString();
  }
  /**
   * Construit une URL Tabular API (data.gouv.fr)
   */
  _buildTabularUrl() {
    let e;
    if (this.baseUrl)
      e = this.baseUrl;
    else {
      const i = Ot();
      e = `${i.baseUrl}${i.endpoints.tabular}`;
    }
    if (!this.resource)
      throw new Error(`gouv-query: attribut "resource" requis pour l'API Tabular`);
    const t = new URL(`${e}/api/resources/${this.resource}/data/`, window.location.origin), r = this.filter || this.where;
    if (r) {
      const i = r.split(",").map((s) => s.trim());
      for (const s of i) {
        const n = s.split(":");
        if (n.length >= 3) {
          const o = n[0], l = this._mapOperatorToTabular(n[1]), h = n.slice(2).join(":");
          t.searchParams.set(`${o}__${l}`, h);
        }
      }
    }
    if (this.groupBy) {
      const i = this.groupBy.split(",").map((s) => s.trim());
      for (const s of i)
        t.searchParams.append(`${s}__groupby`, "");
    }
    if (this.aggregate) {
      const i = this.aggregate.split(",").map((s) => s.trim());
      for (const s of i) {
        const n = s.split(":");
        if (n.length >= 2) {
          const o = n[0], l = n[1];
          t.searchParams.append(`${o}__${l}`, "");
        }
      }
    }
    if (this.orderBy) {
      const i = this.orderBy.split(":"), s = i[0], n = i[1] || "asc";
      t.searchParams.set(`${s}__sort`, n);
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
}, c(ee, "GouvQuery"), ee);
w([
  u({ type: String, attribute: "api-type" })
], y.prototype, "apiType", void 0);
w([
  u({ type: String })
], y.prototype, "source", void 0);
w([
  u({ type: String, attribute: "base-url" })
], y.prototype, "baseUrl", void 0);
w([
  u({ type: String, attribute: "dataset-id" })
], y.prototype, "datasetId", void 0);
w([
  u({ type: String })
], y.prototype, "resource", void 0);
w([
  u({ type: String })
], y.prototype, "select", void 0);
w([
  u({ type: String })
], y.prototype, "where", void 0);
w([
  u({ type: String })
], y.prototype, "filter", void 0);
w([
  u({ type: String, attribute: "group-by" })
], y.prototype, "groupBy", void 0);
w([
  u({ type: String })
], y.prototype, "aggregate", void 0);
w([
  u({ type: String, attribute: "order-by" })
], y.prototype, "orderBy", void 0);
w([
  u({ type: Number })
], y.prototype, "limit", void 0);
w([
  u({ type: String })
], y.prototype, "transform", void 0);
w([
  u({ type: Number })
], y.prototype, "refresh", void 0);
w([
  m()
], y.prototype, "_loading", void 0);
w([
  m()
], y.prototype, "_error", void 0);
w([
  m()
], y.prototype, "_data", void 0);
w([
  m()
], y.prototype, "_rawData", void 0);
y = w([
  R("gouv-query")
], y);
var T = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, te;
let O = (te = class extends x {
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
    super.connectedCallback(), W("gouv-normalize"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && Oe(this.id);
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    if (["numeric", "numericAuto", "rename", "trim", "stripHtml", "replace", "lowercaseKeys"].some((i) => e.has(i))) {
      const i = this.source ? xe(this.source) : void 0;
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
    this._unsubscribe && this._unsubscribe();
    const e = xe(this.source);
    e !== void 0 && this._processData(e), this._unsubscribe = Fe(this.source, {
      onLoaded: /* @__PURE__ */ c((t) => {
        this._processData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ c(() => {
        V(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ c((t) => {
        q(this.id, t);
      }, "onError")
    });
  }
  _processData(e) {
    try {
      V(this.id);
      const t = Array.isArray(e) ? e : [e], r = this._parseNumericFields(), i = this._parsePipeMap(this.rename), s = this._parsePipeMap(this.replace), n = t.map((o) => o == null || typeof o != "object" ? o : this._normalizeRow(o, r, i, s));
      K(this.id, n);
    } catch (t) {
      q(this.id, t), console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`, t);
    }
  }
  _normalizeRow(e, t, r, i) {
    const s = {};
    for (const [n, o] of Object.entries(e)) {
      const l = this.trim ? n.trim() : n;
      let h = o;
      if (this.trim && typeof h == "string" && (h = h.trim()), this.stripHtml && typeof h == "string" && (h = h.replace(/<[^>]*>/g, "")), i.size > 0 && typeof h == "string") {
        for (const [_, P] of i)
          if (h === _) {
            h = P;
            break;
          }
      }
      if (t.has(l))
        h = $t(h);
      else if (this.numericAuto && typeof h == "string" && Yt(h)) {
        const _ = $t(h, !0);
        _ !== null && (h = _);
      }
      const f = r.get(l) ?? l, p = this.lowercaseKeys ? f.toLowerCase() : f;
      s[p] = h;
    }
    return s;
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
      const n = i.substring(0, s).trim(), o = i.substring(s + 1).trim();
      n && t.set(n, o);
    }
    return t;
  }
}, c(te, "GouvNormalize"), te);
T([
  u({ type: String })
], O.prototype, "source", void 0);
T([
  u({ type: String })
], O.prototype, "numeric", void 0);
T([
  u({ type: Boolean, attribute: "numeric-auto" })
], O.prototype, "numericAuto", void 0);
T([
  u({ type: String })
], O.prototype, "rename", void 0);
T([
  u({ type: Boolean })
], O.prototype, "trim", void 0);
T([
  u({ type: Boolean, attribute: "strip-html" })
], O.prototype, "stripHtml", void 0);
T([
  u({ type: String })
], O.prototype, "replace", void 0);
T([
  u({ type: Boolean, attribute: "lowercase-keys" })
], O.prototype, "lowercaseKeys", void 0);
O = T([
  R("gouv-normalize")
], O);
var C = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, re;
let S = (re = class extends x {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.labels = "", this.maxValues = 6, this.disjunctive = "", this.sort = "count", this.searchable = "", this.hideEmpty = !1, this.display = "", this._rawData = [], this._facetGroups = [], this._activeSelections = {}, this._expandedFacets = /* @__PURE__ */ new Set(), this._searchQueries = {}, this._openMultiselectField = null, this._unsubscribe = null, this._onClickOutsideMultiselect = (e) => {
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
    super.connectedCallback(), W("gouv-facets"), this._initialize(), document.addEventListener("click", this._onClickOutsideMultiselect);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._onClickOutsideMultiselect), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && Oe(this.id);
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    ["fields", "labels", "sort", "hideEmpty", "maxValues", "disjunctive", "searchable", "display"].some((i) => e.has(i)) && this._rawData.length > 0 && (this._buildFacetGroups(), this._applyFilters());
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
    const e = xe(this.source);
    e !== void 0 && this._onData(e), this._unsubscribe = Fe(this.source, {
      onLoaded: /* @__PURE__ */ c((t) => {
        this._onData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ c(() => {
        V(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ c((t) => {
        q(this.id, t);
      }, "onError")
    });
  }
  _onData(e) {
    this._rawData = Array.isArray(e) ? e : [], this._buildFacetGroups(), this._applyFilters();
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
    return this.fields ? Be(this.fields) : this._autoDetectFields();
  }
  /** Auto-detect categorical fields: string type, 2-50 unique values, not all unique (ID-like) */
  _autoDetectFields() {
    if (this._rawData.length === 0)
      return [];
    const e = [], t = this._rawData[0];
    for (const r of Object.keys(t)) {
      const i = /* @__PURE__ */ new Set();
      let s = !0;
      for (const n of this._rawData) {
        const o = n[r];
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
      const n = s[e];
      if (n == null || n === "")
        continue;
      const o = String(n);
      r.set(o, (r.get(o) ?? 0) + 1);
    }
    const i = [];
    for (const [s, n] of r)
      i.push({ value: s, count: n });
    return this._sortValues(i);
  }
  /** Filter data by all active selections EXCEPT the given field */
  _getDataFilteredExcluding(e) {
    const t = Object.keys(this._activeSelections).filter((r) => r !== e && this._activeSelections[r].size > 0);
    return t.length === 0 ? this._rawData : this._rawData.filter((r) => t.every((i) => {
      const s = this._activeSelections[i], n = r[i];
      return n == null ? !1 : s.has(String(n));
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
  // --- Filtering ---
  _applyFilters() {
    const e = Object.keys(this._activeSelections).filter((r) => this._activeSelections[r].size > 0);
    let t;
    e.length === 0 ? t = this._rawData : t = this._rawData.filter((r) => e.every((i) => {
      const s = this._activeSelections[i], n = r[i];
      return n == null ? !1 : s.has(String(n));
    })), K(this.id, t);
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
      const s = r.substring(0, i).trim(), n = r.substring(i + 1).trim();
      s && e.set(s, n);
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
      const s = r.substring(0, i).trim(), n = r.substring(i + 1).trim();
      s && (n === "checkbox" || n === "select" || n === "multiselect") && e.set(s, n);
    }
    return e;
  }
  /** Get the display mode for a specific field */
  _getDisplayMode(e) {
    return this._parseDisplayModes().get(e) ?? "checkbox";
  }
  // --- User interaction ---
  _toggleValue(e, t) {
    const r = { ...this._activeSelections }, i = new Set(r[e] ?? []), s = this._getDisplayMode(e), n = Be(this.disjunctive), o = s === "multiselect" || s === "checkbox" && n.includes(e);
    i.has(t) ? i.delete(t) : (o || i.clear(), i.add(t)), i.size === 0 ? delete r[e] : r[e] = i, this._activeSelections = r, this._buildFacetGroups(), this._applyFilters();
  }
  _handleSelectChange(e, t) {
    const i = t.target.value, s = { ...this._activeSelections };
    i ? s[e] = /* @__PURE__ */ new Set([i]) : delete s[e], this._activeSelections = s, this._buildFacetGroups(), this._applyFilters();
  }
  _clearFieldSelections(e) {
    const t = { ...this._activeSelections };
    delete t[e], this._activeSelections = t, this._buildFacetGroups(), this._applyFilters();
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
    this._activeSelections = {}, this._searchQueries = {}, this._buildFacetGroups(), this._applyFilters();
  }
  // --- Rendering ---
  render() {
    if (this._rawData.length === 0 || this._facetGroups.length === 0)
      return g;
    const e = Object.keys(this._activeSelections).some((t) => this._activeSelections[t].size > 0);
    return d`
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
        ${e ? d`
          <div class="gouv-facets__header">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm" type="button" @click="${this._clearAll}">
              Reinitialiser les filtres
            </button>
          </div>
        ` : g}
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
      default:
        return this._renderCheckboxGroup(e);
    }
  }
  _renderCheckboxGroup(e) {
    const r = Be(this.searchable).includes(e.field), i = (this._searchQueries[e.field] ?? "").toLowerCase(), s = this._expandedFacets.has(e.field), n = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set();
    let o = e.values;
    r && i && (o = o.filter((p) => p.value.toLowerCase().includes(i)));
    const l = s ? o : o.slice(0, this.maxValues), h = o.length > this.maxValues, f = `facet-${this.id}-${e.field}`;
    return d`
      <fieldset class="gouv-facets__group fr-fieldset" aria-labelledby="${f}-legend">
        <legend class="gouv-facets__legend" id="${f}-legend">${e.label}</legend>
        ${r ? d`
          <div class="gouv-facets__search">
            <input class="fr-input fr-input--sm" type="search"
              placeholder="Rechercher..."
              .value="${this._searchQueries[e.field] ?? ""}"
              @input="${(p) => this._handleSearch(e.field, p)}"
              aria-label="Rechercher dans ${e.label}">
          </div>
        ` : g}
        <ul class="gouv-facets__values" role="group">
          ${l.map((p) => {
      const _ = `${f}-${p.value.replace(/[^a-zA-Z0-9]/g, "_")}`, P = n.has(p.value);
      return d`
              <li class="gouv-facets__value">
                <input type="checkbox" id="${_}"
                  .checked="${P}"
                  @change="${() => this._toggleValue(e.field, p.value)}">
                <label class="gouv-facets__value-label" for="${_}">${p.value}</label>
                <span class="gouv-facets__value-count">${p.count}</span>
              </li>
            `;
    })}
        </ul>
        ${h ? d`
          <button class="gouv-facets__more" type="button"
            @click="${() => this._toggleExpand(e.field)}">
            ${s ? "Voir moins" : `Voir plus (${o.length - this.maxValues})`}
          </button>
        ` : g}
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
              ${s.value} (${s.count})
            </option>
          `)}
        </select>
      </div>
    `;
  }
  _renderMultiselectGroup(e) {
    const t = `facet-${this.id}-${e.field}`, r = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set(), i = this._openMultiselectField === e.field, s = (this._searchQueries[e.field] ?? "").toLowerCase();
    let n = e.values;
    s && (n = n.filter((l) => l.value.toLowerCase().includes(s)));
    const o = r.size > 0 ? `${r.size} option${r.size > 1 ? "s" : ""} selectionnee${r.size > 1 ? "s" : ""}` : "Selectionnez des options";
    return d`
      <div class="gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}">
        <label class="gouv-facets__legend" id="${t}-legend">${e.label}</label>
        <button class="fr-btn fr-btn--secondary fr-btn--sm gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${i}"
          aria-controls="${t}-panel"
          @click="${(l) => {
      l.stopPropagation(), this._toggleMultiselectDropdown(e.field);
    }}">
          ${o}
          <span class="fr-icon-arrow-${i ? "up" : "down"}-s-line" aria-hidden="true"></span>
        </button>
        ${i ? d`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               @click="${(l) => l.stopPropagation()}">
            ${r.size > 0 ? d`
              <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm gouv-facets__multiselect-clear"
                type="button"
                @click="${() => this._clearFieldSelections(e.field)}">
                Tout deselectionner
              </button>
            ` : g}
            <div class="gouv-facets__search">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(l) => this._handleSearch(e.field, l)}"
                aria-label="Rechercher dans ${e.label}">
            </div>
            <ul class="gouv-facets__values" role="group">
              ${n.map((l) => {
      const h = `${t}-${l.value.replace(/[^a-zA-Z0-9]/g, "_")}`, f = r.has(l.value);
      return d`
                  <li class="gouv-facets__value">
                    <input type="checkbox" id="${h}"
                      .checked="${f}"
                      @change="${() => this._toggleValue(e.field, l.value)}">
                    <label class="gouv-facets__value-label" for="${h}">${l.value}</label>
                    <span class="gouv-facets__value-count">${l.count}</span>
                  </li>
                `;
    })}
            </ul>
          </div>
        ` : g}
      </div>
    `;
  }
}, c(re, "GouvFacets"), re);
C([
  u({ type: String })
], S.prototype, "source", void 0);
C([
  u({ type: String })
], S.prototype, "fields", void 0);
C([
  u({ type: String })
], S.prototype, "labels", void 0);
C([
  u({ type: Number, attribute: "max-values" })
], S.prototype, "maxValues", void 0);
C([
  u({ type: String })
], S.prototype, "disjunctive", void 0);
C([
  u({ type: String })
], S.prototype, "sort", void 0);
C([
  u({ type: String })
], S.prototype, "searchable", void 0);
C([
  u({ type: Boolean, attribute: "hide-empty" })
], S.prototype, "hideEmpty", void 0);
C([
  u({ type: String })
], S.prototype, "display", void 0);
C([
  m()
], S.prototype, "_rawData", void 0);
C([
  m()
], S.prototype, "_facetGroups", void 0);
C([
  m()
], S.prototype, "_activeSelections", void 0);
C([
  m()
], S.prototype, "_expandedFacets", void 0);
C([
  m()
], S.prototype, "_searchQueries", void 0);
C([
  m()
], S.prototype, "_openMultiselectField", void 0);
S = C([
  R("gouv-facets")
], S);
function Be(a) {
  return a ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
c(Be, "_parseCSV");
function et(a) {
  const t = class t extends a {
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
      const s = xe(i);
      s !== void 0 && (this._sourceData = s, this.onSourceData(s)), this._unsubscribeSource = Fe(i, {
        onLoaded: /* @__PURE__ */ c((n) => {
          this._sourceData = n, this._sourceLoading = !1, this._sourceError = null, this.onSourceData(n), this.requestUpdate();
        }, "onLoaded"),
        onLoading: /* @__PURE__ */ c(() => {
          this._sourceLoading = !0, this.requestUpdate();
        }, "onLoading"),
        onError: /* @__PURE__ */ c((n) => {
          this._sourceError = n, this._sourceLoading = !1, this.requestUpdate();
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
c(et, "SourceSubscriberMixin");
function wt(a, e = "nombre") {
  if (a == null || a === "")
    return "—";
  const t = typeof a == "string" ? parseFloat(a) : a;
  if (isNaN(t))
    return "—";
  switch (e) {
    case "nombre":
      return xt(t);
    case "pourcentage":
      return nr(t);
    case "euro":
      return ar(t);
    case "decimal":
      return or(t);
    default:
      return xt(t);
  }
}
c(wt, "formatValue");
function xt(a) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(a));
}
c(xt, "formatNumber");
function nr(a) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(a / 100);
}
c(nr, "formatPercentage");
function ar(a) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(a);
}
c(ar, "formatCurrency");
function or(a) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(a);
}
c(or, "formatDecimal");
function mr(a) {
  const e = typeof a == "string" ? new Date(a) : a;
  return isNaN(e.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(e);
}
c(mr, "formatDate");
function lr(a, e, t) {
  return e !== void 0 && a >= e ? "vert" : t !== void 0 && a >= t ? "orange" : e !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
c(lr, "getColorBySeuil");
function cr(a) {
  const e = a.split(":");
  if (e.length === 1)
    return e[0] === "count" ? { type: "count", field: "" } : { type: "direct", field: e[0] };
  const t = e[0], r = e[1];
  if (e.length === 3) {
    let i = e[2];
    return i === "true" ? i = !0 : i === "false" ? i = !1 : isNaN(Number(i)) || (i = Number(i)), { type: t, field: r, filterField: r, filterValue: i };
  }
  return { type: t, field: r };
}
c(cr, "parseExpression");
function St(a, e) {
  const t = cr(e);
  if (t.type === "direct" && !Array.isArray(a))
    return a[t.field];
  if (!Array.isArray(a))
    return null;
  const r = a;
  switch (t.type) {
    case "direct":
    case "first":
      return r.length > 0 ? r[0][t.field] : null;
    case "last":
      return r.length > 0 ? r[r.length - 1][t.field] : null;
    case "count":
      return t.filterValue !== void 0 ? r.filter((s) => s[t.field] === t.filterValue).length : r.length;
    case "sum":
      return r.reduce((s, n) => {
        const o = Number(n[t.field]);
        return s + (isNaN(o) ? 0 : o);
      }, 0);
    case "avg":
      return r.length === 0 ? null : r.reduce((s, n) => {
        const o = Number(n[t.field]);
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
c(St, "computeAggregation");
var D = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
const Ct = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
var ie;
let k = (ie = class extends et(x) {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "";
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), W("gouv-kpi");
  }
  _computeValue() {
    return !this._sourceData || !this.valeur ? null : St(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const e = this._computeValue();
    return typeof e != "number" ? "bleu" : lr(e, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const e = St(this._sourceData, this.tendance);
    return typeof e != "number" ? null : {
      value: e,
      direction: e > 0 ? "up" : e < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const e = this._computeValue(), t = wt(e, this.format);
    return `${this.label}: ${t}`;
  }
  render() {
    const e = this._computeValue(), t = wt(e, this.format), r = Ct[this._getColor()] || Ct.bleu, i = this._getTendanceInfo();
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
}, c(ie, "GouvKpi"), ie);
k.styles = Et``;
D([
  u({ type: String })
], k.prototype, "source", void 0);
D([
  u({ type: String })
], k.prototype, "valeur", void 0);
D([
  u({ type: String })
], k.prototype, "label", void 0);
D([
  u({ type: String })
], k.prototype, "description", void 0);
D([
  u({ type: String })
], k.prototype, "icone", void 0);
D([
  u({ type: String })
], k.prototype, "format", void 0);
D([
  u({ type: String })
], k.prototype, "tendance", void 0);
D([
  u({ type: Number, attribute: "seuil-vert" })
], k.prototype, "seuilVert", void 0);
D([
  u({ type: Number, attribute: "seuil-orange" })
], k.prototype, "seuilOrange", void 0);
D([
  u({ type: String })
], k.prototype, "couleur", void 0);
k = D([
  R("gouv-kpi")
], k);
var E = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, se;
let A = (se = class extends et(x) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), W("gouv-datalist"), this._initSort();
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
      e.sort((i, s) => {
        const n = i[t], o = s[t];
        if (n === o)
          return 0;
        if (n == null)
          return 1;
        if (o == null)
          return -1;
        const l = typeof n == "number" && typeof o == "number" ? n - o : String(n).localeCompare(String(o), "fr");
        return r === "desc" ? -l : l;
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
    const e = this.parseColumns(), t = this.getFilteredData(), r = e.map((h) => h.label).join(";"), i = t.map((h) => e.map((f) => {
      const p = String(h[f.key] ?? "");
      return p.includes(";") || p.includes('"') ? `"${p.replace(/"/g, '""')}"` : p;
    }).join(";")), s = [r, ...i].join(`
`), n = new Blob([s], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(n), l = document.createElement("a");
    l.href = o, l.download = "export.csv", l.click(), URL.revokeObjectURL(o);
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
      const i = e.find((o) => o.key === r), s = (i == null ? void 0 : i.label) || r, n = this._getUniqueValues(r);
      return d`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${r}">${s}</label>
              <select
                class="fr-select"
                id="filter-${r}"
                @change="${(o) => this._handleFilter(r, o)}"
              >
                <option value="">Tous</option>
                ${n.map((o) => d`
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
    const e = this.parseColumns(), t = this._getFilterableColumns(), r = this._getPaginatedData(), i = this._getTotalPages(), s = this.getFilteredData().length;
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
            ${this._searchQuery || Object.values(this._activeFilters).some((n) => n) ? " (filtré)" : ""}
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
}, c(se, "GouvDatalist"), se);
A.styles = Et``;
E([
  u({ type: String })
], A.prototype, "source", void 0);
E([
  u({ type: String })
], A.prototype, "colonnes", void 0);
E([
  u({ type: Boolean })
], A.prototype, "recherche", void 0);
E([
  u({ type: String })
], A.prototype, "filtres", void 0);
E([
  u({ type: String })
], A.prototype, "tri", void 0);
E([
  u({ type: Number })
], A.prototype, "pagination", void 0);
E([
  u({ type: String })
], A.prototype, "export", void 0);
E([
  m()
], A.prototype, "_data", void 0);
E([
  m()
], A.prototype, "_searchQuery", void 0);
E([
  m()
], A.prototype, "_activeFilters", void 0);
E([
  m()
], A.prototype, "_sort", void 0);
E([
  m()
], A.prototype, "_currentPage", void 0);
A = E([
  R("gouv-datalist")
], A);
var v = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
const ur = {
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
var ne;
let b = (ne = class extends et(x) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.codeField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._data = [];
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), W("gouv-dsfr-chart", this.type);
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
      e.push(String($(i, this.labelField) ?? "N/A")), t.push(Number($(i, this.valueField)) || 0), this.valueField2 && r.push(Number($(i, this.valueField2)) || 0);
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
      let i = String($(r, e) ?? "").trim();
      /^\d+$/.test(i) && i.length < 3 && (i = i.padStart(2, "0"));
      const s = Number($(r, this.valueField)) || 0;
      (this.type === "map" ? er(i) : i !== "") && (t[i] = Math.round(s * 100) / 100);
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
    const { x: e, y: t, y2: r, labels: i } = this._processData(), s = {}, n = {};
    switch (this.type) {
      case "gauge": {
        const o = this.gaugeValue ?? (this._data.length > 0 && Number($(this._data[0], this.valueField)) || 0);
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
          for (const h of this._data) {
            const f = Number($(h, this.valueField));
            isNaN(f) || (o += f, l++);
          }
          if (l > 0) {
            const h = Math.round(o / l * 100) / 100;
            n.value = String(h);
          }
        }
        n.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        break;
      }
      default:
        s.x = e, s.y = t;
        break;
    }
    return this.type === "bar" && (this.horizontal && (s.horizontal = "true"), this.stacked && (s.stacked = "true"), this.highlightIndex && (s["highlight-index"] = this.highlightIndex)), this.type === "pie" && this.fill && (s.fill = "true"), (this.type === "map" || this.type === "map-reg") && this.mapHighlight && (s.highlight = this.mapHighlight), { attrs: s, deferred: n };
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
    for (const [n, o] of Object.entries(t))
      o !== void 0 && o !== "" && i.setAttribute(n, o);
    Object.keys(r).length > 0 && setTimeout(() => {
      for (const [n, o] of Object.entries(r))
        i.setAttribute(n, o);
    }, 500);
    const s = document.createElement("div");
    return s.className = "gouv-dsfr-chart__wrapper", s.setAttribute("role", "img"), s.setAttribute("aria-label", this._getAriaLabel()), s.appendChild(i), s;
  }
  _renderChart() {
    const e = ur[this.type];
    if (!e)
      return d`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const { attrs: t, deferred: r } = this._getTypeSpecificAttributes(), i = {
      ...this._getCommonAttributes(),
      ...t
    }, s = this._createChartElement(e, i, r), n = this.querySelector(".gouv-dsfr-chart__wrapper");
    return n && n.remove(), d`${s}`;
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
}, c(ne, "GouvDsfrChart"), ne);
v([
  u({ type: String })
], b.prototype, "source", void 0);
v([
  u({ type: String })
], b.prototype, "type", void 0);
v([
  u({ type: String, attribute: "label-field" })
], b.prototype, "labelField", void 0);
v([
  u({ type: String, attribute: "code-field" })
], b.prototype, "codeField", void 0);
v([
  u({ type: String, attribute: "value-field" })
], b.prototype, "valueField", void 0);
v([
  u({ type: String, attribute: "value-field-2" })
], b.prototype, "valueField2", void 0);
v([
  u({ type: String })
], b.prototype, "name", void 0);
v([
  u({ type: String, attribute: "selected-palette" })
], b.prototype, "selectedPalette", void 0);
v([
  u({ type: String, attribute: "unit-tooltip" })
], b.prototype, "unitTooltip", void 0);
v([
  u({ type: String, attribute: "unit-tooltip-bar" })
], b.prototype, "unitTooltipBar", void 0);
v([
  u({ type: Boolean })
], b.prototype, "horizontal", void 0);
v([
  u({ type: Boolean })
], b.prototype, "stacked", void 0);
v([
  u({ type: Boolean })
], b.prototype, "fill", void 0);
v([
  u({ type: String, attribute: "highlight-index" })
], b.prototype, "highlightIndex", void 0);
v([
  u({ type: String, attribute: "x-min" })
], b.prototype, "xMin", void 0);
v([
  u({ type: String, attribute: "x-max" })
], b.prototype, "xMax", void 0);
v([
  u({ type: String, attribute: "y-min" })
], b.prototype, "yMin", void 0);
v([
  u({ type: String, attribute: "y-max" })
], b.prototype, "yMax", void 0);
v([
  u({ type: Number, attribute: "gauge-value" })
], b.prototype, "gaugeValue", void 0);
v([
  u({ type: String, attribute: "map-highlight" })
], b.prototype, "mapHighlight", void 0);
v([
  m()
], b.prototype, "_data", void 0);
b = v([
  R("gouv-dsfr-chart")
], b);
var Ne = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, ae;
let Se = (ae = class extends x {
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
                        Favoris${this._favCount > 0 ? d` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>` : g}
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
}, c(ae, "AppHeader"), ae);
Ne([
  u({ type: String, attribute: "current-page" })
], Se.prototype, "currentPage", void 0);
Ne([
  u({ type: String, attribute: "base-path" })
], Se.prototype, "basePath", void 0);
Ne([
  m()
], Se.prototype, "_favCount", void 0);
Se = Ne([
  R("app-header")
], Se);
var Ft = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, oe;
let Qe = (oe = class extends x {
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
}, c(oe, "AppFooter"), oe);
Ft([
  u({ type: String, attribute: "base-path" })
], Qe.prototype, "basePath", void 0);
Qe = Ft([
  R("app-footer")
], Qe);
var ge = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, le;
let G = (le = class extends x {
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
}, c(le, "AppLayoutBuilder"), le);
ge([
  u({ type: Number, attribute: "left-ratio" })
], G.prototype, "leftRatio", void 0);
ge([
  u({ type: Number, attribute: "min-left-width" })
], G.prototype, "minLeftWidth", void 0);
ge([
  u({ type: Number, attribute: "min-right-width" })
], G.prototype, "minRightWidth", void 0);
ge([
  m()
], G.prototype, "_isResizing", void 0);
ge([
  m()
], G.prototype, "_currentLeftRatio", void 0);
G = ge([
  R("app-layout-builder")
], G);
var Ce = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, ce;
let fe = (ce = class extends x {
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
          { id: "components/gouv-kpi", label: "gouv-kpi", href: "components/gouv-kpi.html" },
          { id: "components/gouv-datalist", label: "gouv-datalist", href: "components/gouv-datalist.html" },
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
              ${e.children.map((n) => this._renderMenuItem(n))}
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
}, c(ce, "AppLayoutDemo"), ce);
Ce([
  u({ type: String })
], fe.prototype, "title", void 0);
Ce([
  u({ type: String })
], fe.prototype, "icon", void 0);
Ce([
  u({ type: String, attribute: "active-path" })
], fe.prototype, "activePath", void 0);
Ce([
  u({ type: String, attribute: "base-path" })
], fe.prototype, "basePath", void 0);
fe = Ce([
  R("app-layout-demo")
], fe);
var Q = function(a, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, r);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (i < 3 ? n(s) : i > 3 ? n(e, t, s) : n(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
}, ue;
let U = (ue = class extends x {
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
          ` : g}
          ${this.showPlaygroundButton ? d`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          ` : g}
          ${this.showSaveButton ? d`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          ` : g}
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
}, c(ue, "AppPreviewPanel"), ue);
Q([
  u({ type: Boolean, attribute: "show-data-tab" })
], U.prototype, "showDataTab", void 0);
Q([
  u({ type: Boolean, attribute: "show-save-button" })
], U.prototype, "showSaveButton", void 0);
Q([
  u({ type: Boolean, attribute: "show-playground-button" })
], U.prototype, "showPlaygroundButton", void 0);
Q([
  u({ type: String, attribute: "tab-labels" })
], U.prototype, "tabLabels", void 0);
Q([
  u({ type: String, attribute: "active-tab" })
], U.prototype, "activeTab", void 0);
Q([
  m()
], U.prototype, "_activeTab", void 0);
U = Q([
  R("app-preview-panel")
], U);
function dr(a, e, t) {
  return a.map((r) => ({
    label: String($(r, e) ?? "N/A"),
    value: Number($(r, t)) || 0
  }));
}
c(dr, "extractLabelValues");
function hr(a, e) {
  if (e === "none")
    return a;
  const t = /* @__PURE__ */ new Map();
  for (const i of a) {
    const s = t.get(i.label) || [];
    s.push(i.value), t.set(i.label, s);
  }
  const r = [];
  for (const [i, s] of t)
    r.push({ label: i, value: pr(s, e) });
  return r;
}
c(hr, "aggregateByLabel");
function pr(a, e) {
  switch (e) {
    case "sum":
      return a.reduce((t, r) => t + r, 0);
    case "avg":
      return a.reduce((t, r) => t + r, 0) / a.length;
    case "count":
      return a.length;
    case "min":
      return Math.min(...a);
    case "max":
      return Math.max(...a);
    default:
      return a[0] || 0;
  }
}
c(pr, "computeGroupValue");
function fr(a, e) {
  return e === "none" ? a : [...a].sort((t, r) => e === "desc" ? r.value - t.value : t.value - r.value);
}
c(fr, "sortByValue");
function vr(a, e, t, r = "none", i = "none", s = 0) {
  if (!a || a.length === 0)
    return { labels: [], values: [] };
  let n = dr(a, e, t);
  return n = hr(n, r), n = fr(n, i), s > 0 && (n = n.slice(0, s)), {
    labels: n.map((o) => o.label),
    values: n.map((o) => Math.round(o.value * 100) / 100)
  };
}
c(vr, "processChartData");
export {
  Qe as AppFooter,
  Se as AppHeader,
  G as AppLayoutBuilder,
  fe as AppLayoutDemo,
  N as DATA_EVENTS,
  A as GouvDatalist,
  b as GouvDsfrChart,
  S as GouvFacets,
  k as GouvKpi,
  O as GouvNormalize,
  y as GouvQuery,
  M as GouvSource,
  et as SourceSubscriberMixin,
  hr as aggregateByLabel,
  St as computeAggregation,
  q as dispatchDataError,
  K as dispatchDataLoaded,
  V as dispatchDataLoading,
  dr as extractLabelValues,
  ar as formatCurrency,
  mr as formatDate,
  xt as formatNumber,
  nr as formatPercentage,
  wt as formatValue,
  $ as getByPath,
  br as getByPathOrDefault,
  xe as getDataCache,
  _r as hasPath,
  cr as parseExpression,
  vr as processChartData,
  fr as sortByValue,
  Fe as subscribeToSource
};
