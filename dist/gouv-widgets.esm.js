var Bt = Object.defineProperty;
var u = (a, e) => Bt(a, "name", { value: e, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = globalThis, rt = Ne.ShadowRoot && (Ne.ShadyCSS === void 0 || Ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = Symbol(), gt = /* @__PURE__ */ new WeakMap();
var te;
let Ot = (te = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== st) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (rt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = gt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && gt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}, u(te, "n"), te);
const qt = /* @__PURE__ */ u((a) => new Ot(typeof a == "string" ? a : a + "", void 0, st), "r$4"), Tt = /* @__PURE__ */ u((a, ...e) => {
  const t = a.length === 1 ? a[0] : e.reduce((i, r, s) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + a[s + 1], a[0]);
  return new Ot(t, a, st);
}, "i$3"), Vt = /* @__PURE__ */ u((a, e) => {
  if (rt) a.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = Ne.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, a.appendChild(i);
  }
}, "S$1"), _t = rt ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return qt(t);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ht, defineProperty: Gt, getOwnPropertyDescriptor: Wt, getOwnPropertyNames: Qt, getOwnPropertySymbols: Jt, getPrototypeOf: Kt } = Object, q = globalThis, mt = q.trustedTypes, Xt = mt ? mt.emptyScript : "", qe = q.reactiveElementPolyfillSupport, xe = /* @__PURE__ */ u((a, e) => a, "d$1"), Le = { toAttribute(a, e) {
  switch (e) {
    case Boolean:
      a = a ? Xt : null;
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
} }, nt = /* @__PURE__ */ u((a, e) => !Ht(a, e), "f$1"), bt = { attribute: !0, type: String, converter: Le, reflect: !1, useDefault: !1, hasChanged: nt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), q.litPropertyMetadata ?? (q.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var ie;
let ee = (ie = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = bt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && Gt(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: s } = Wt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: r, set(n) {
      const o = r == null ? void 0 : r.call(this);
      s == null || s.call(this, n), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(xe("elementProperties"))) return;
    const e = Kt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(xe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(xe("properties"))) {
      const t = this.properties, i = [...Qt(t), ...Jt(t)];
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
      for (const r of i) t.unshift(_t(r));
    } else e !== void 0 && t.push(_t(e));
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
    return Vt(e, this.constructor.elementStyles), e;
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
      const n = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : Le).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, n;
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const o = i.getPropertyOptions(r), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? o.converter : Le;
      this._$Em = r;
      const d = l.fromAttribute(t, o.type);
      this[r] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, s) {
    var n;
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (s = this[e]), i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? nt)(s, t) || i.useDefault && i.reflect && s === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: s }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), s !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, n] of r) {
        const { wrapped: o } = n, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, n, l);
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
}, u(ie, "y"), ie);
ee.elementStyles = [], ee.shadowRootOptions = { mode: "open" }, ee[xe("elementProperties")] = /* @__PURE__ */ new Map(), ee[xe("finalized")] = /* @__PURE__ */ new Map(), qe == null || qe({ ReactiveElement: ee }), (q.reactiveElementVersions ?? (q.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ce = globalThis, vt = /* @__PURE__ */ u((a) => a, "i$1"), Ue = Ce.trustedTypes, yt = Ue ? Ue.createPolicy("lit-html", { createHTML: /* @__PURE__ */ u((a) => a, "createHTML") }) : void 0, Nt = "$lit$", B = `lit$${Math.random().toFixed(9).slice(2)}$`, Lt = "?" + B, Zt = `<${Lt}>`, X = document, Ae = /* @__PURE__ */ u(() => X.createComment(""), "c"), Pe = /* @__PURE__ */ u((a) => a === null || typeof a != "object" && typeof a != "function", "a"), at = Array.isArray, Yt = /* @__PURE__ */ u((a) => at(a) || typeof (a == null ? void 0 : a[Symbol.iterator]) == "function", "d"), Ve = `[ 	
\f\r]`, Se = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $t = /-->/g, wt = />/g, W = RegExp(`>|${Ve}(?:([^\\s"'>=/]+)(${Ve}*=${Ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), St = /'/g, xt = /"/g, Ut = /^(?:script|style|textarea|title)$/i, ei = /* @__PURE__ */ u((a) => (e, ...t) => ({ _$litType$: a, strings: e, values: t }), "x"), h = ei(1), me = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Ct = /* @__PURE__ */ new WeakMap(), Q = X.createTreeWalker(X, 129);
function zt(a, e) {
  if (!at(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return yt !== void 0 ? yt.createHTML(e) : e;
}
u(zt, "V");
const ti = /* @__PURE__ */ u((a, e) => {
  const t = a.length - 1, i = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = Se;
  for (let o = 0; o < t; o++) {
    const l = a[o];
    let d, f, p = -1, m = 0;
    for (; m < l.length && (n.lastIndex = m, f = n.exec(l), f !== null); ) m = n.lastIndex, n === Se ? f[1] === "!--" ? n = $t : f[1] !== void 0 ? n = wt : f[2] !== void 0 ? (Ut.test(f[2]) && (r = RegExp("</" + f[2], "g")), n = W) : f[3] !== void 0 && (n = W) : n === W ? f[0] === ">" ? (n = r ?? Se, p = -1) : f[1] === void 0 ? p = -2 : (p = n.lastIndex - f[2].length, d = f[1], n = f[3] === void 0 ? W : f[3] === '"' ? xt : St) : n === xt || n === St ? n = W : n === $t || n === wt ? n = Se : (n = W, r = void 0);
    const D = n === W && a[o + 1].startsWith("/>") ? " " : "";
    s += n === Se ? l + Zt : p >= 0 ? (i.push(d), l.slice(0, p) + Nt + l.slice(p) + B + D) : l + B + (p === -2 ? o : D);
  }
  return [zt(a, s + (a[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
}, "N"), ze = class ze {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let s = 0, n = 0;
    const o = e.length - 1, l = this.parts, [d, f] = ti(e, t);
    if (this.el = ze.createElement(d, i), Q.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = Q.nextNode()) !== null && l.length < o; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(Nt)) {
          const m = f[n++], D = r.getAttribute(p).split(B), Oe = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: s, name: Oe[2], strings: D, ctor: Oe[1] === "." ? Xe : Oe[1] === "?" ? Ze : Oe[1] === "@" ? Ye : ve }), r.removeAttribute(p);
        } else p.startsWith(B) && (l.push({ type: 6, index: s }), r.removeAttribute(p));
        if (Ut.test(r.tagName)) {
          const p = r.textContent.split(B), m = p.length - 1;
          if (m > 0) {
            r.textContent = Ue ? Ue.emptyScript : "";
            for (let D = 0; D < m; D++) r.append(p[D], Ae()), Q.nextNode(), l.push({ type: 2, index: ++s });
            r.append(p[m], Ae());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Lt) l.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(B, p + 1)) !== -1; ) l.push({ type: 7, index: s }), p += B.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = X.createElement("template");
    return i.innerHTML = e, i;
  }
};
u(ze, "S");
let ke = ze;
function be(a, e, t = a, i) {
  var n, o;
  if (e === me) return e;
  let r = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const s = Pe(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== s && ((o = r == null ? void 0 : r._$AO) == null || o.call(r, !1), s === void 0 ? r = void 0 : (r = new s(a), r._$AT(a, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = r : t._$Cl = r), r !== void 0 && (e = be(a, r._$AS(a, e.values), r, i)), e;
}
u(be, "M");
const lt = class lt {
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
    const { el: { content: t }, parts: i } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? X).importNode(t, !0);
    Q.currentNode = r;
    let s = Q.nextNode(), n = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let d;
        l.type === 2 ? d = new Ee(s, s.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (d = new et(s, this, e)), this._$AV.push(d), l = i[++o];
      }
      n !== (l == null ? void 0 : l.index) && (s = Q.nextNode(), n++);
    }
    return Q.currentNode = X, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
};
u(lt, "R");
let Ke = lt;
const je = class je {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = be(this, e, t), Pe(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== me && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Yt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && Pe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(X.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = ke.createElement(zt(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === r) this._$AH.p(t);
    else {
      const n = new Ke(r, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Ct.get(e.strings);
    return t === void 0 && Ct.set(e.strings, t = new ke(e)), t;
  }
  k(e) {
    at(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const s of e) r === t.length ? t.push(i = new je(this.O(Ae()), this.O(Ae()), this, this.options)) : i = t[r], i._$AI(s), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = vt(e).nextSibling;
      vt(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
};
u(je, "k");
let Ee = je;
const ct = class ct {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, r, s) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = g;
  }
  _$AI(e, t = this, i, r) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) e = be(this, e, t, 0), n = !Pe(e) || e !== this._$AH && e !== me, n && (this._$AH = e);
    else {
      const o = e;
      let l, d;
      for (e = s[0], l = 0; l < s.length - 1; l++) d = be(this, o[i + l], t, l), d === me && (d = this._$AH[l]), n || (n = !Pe(d) || d !== this._$AH[l]), d === g ? e = g : e !== g && (e += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    n && !r && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
u(ct, "H");
let ve = ct;
const ut = class ut extends ve {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
};
u(ut, "I");
let Xe = ut;
const dt = class dt extends ve {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
};
u(dt, "L");
let Ze = dt;
const ht = class ht extends ve {
  constructor(e, t, i, r, s) {
    super(e, t, i, r, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = be(this, e, t, 0) ?? g) === me) return;
    const i = this._$AH, r = e === g && i !== g || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== g && (i === g || r);
    r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
};
u(ht, "z");
let Ye = ht;
const pt = class pt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    be(this, e);
  }
};
u(pt, "Z");
let et = pt;
const He = Ce.litHtmlPolyfillSupport;
He == null || He(ke, Ee), (Ce.litHtmlVersions ?? (Ce.litHtmlVersions = [])).push("3.3.2");
const ii = /* @__PURE__ */ u((a, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = r = new Ee(e.insertBefore(Ae(), s), s, void 0, t ?? {});
  }
  return r._$AI(a), r;
}, "D");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, ft = class ft extends ee {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ii(t, this.renderRoot, this.renderOptions);
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
    return me;
  }
};
u(ft, "i");
let $ = ft;
var Ft;
$._$litElement$ = !0, $.finalized = !0, (Ft = J.litElementHydrateSupport) == null || Ft.call(J, { LitElement: $ });
const Ge = J.litElementPolyfillSupport;
Ge == null || Ge({ LitElement: $ });
(J.litElementVersions ?? (J.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = /* @__PURE__ */ u((a) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(a, e);
  }) : customElements.define(a, e);
}, "t");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ri = { attribute: !0, type: String, converter: Le, reflect: !1, hasChanged: nt }, si = /* @__PURE__ */ u((a = ri, e, t) => {
  const { kind: i, metadata: r } = t;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), i === "setter" && ((a = Object.create(a)).wrapped = !0), s.set(t.name, a), i === "accessor") {
    const { name: n } = t;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(n, l, a, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(n, void 0, a, o), o;
    } };
  }
  if (i === "setter") {
    const { name: n } = t;
    return function(o) {
      const l = this[n];
      e.call(this, o), this.requestUpdate(n, l, a, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
}, "r$1");
function c(a) {
  return (e, t) => typeof t == "object" ? si(a, e, t) : ((i, r, s) => {
    const n = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, i), n ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(a, e, t);
}
u(c, "n");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _(a) {
  return c({ ...a, state: !0, attribute: !1 });
}
u(_, "r");
function y(a, e) {
  if (!e || e.trim() === "")
    return a;
  const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let r = a;
  for (const s of i) {
    if (r == null || typeof r != "object")
      return;
    r = r[s];
  }
  return r;
}
u(y, "getByPath");
function Si(a, e) {
  return y(a, e) !== void 0;
}
u(Si, "hasPath");
function At(a, e, t) {
  const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let s = a;
  for (let n = 0; n < r.length - 1; n++) {
    const o = r[n];
    (!(o in s) || typeof s[o] != "object" || s[o] === null) && (s[o] = {}), s = s[o];
  }
  s[r[r.length - 1]] = t;
}
u(At, "setByPath");
function xi(a, e, t) {
  const i = y(a, e);
  return i !== void 0 ? i : t;
}
u(xi, "getByPathOrDefault");
const ni = "https://chartsbuilder.matge.com/beacon", Pt = /* @__PURE__ */ new Set();
function j(a, e) {
  const t = `${a}:${e || ""}`;
  if (Pt.has(t) || (Pt.add(t), typeof window > "u"))
    return;
  const i = window.location.hostname;
  if (i === "localhost" || i === "127.0.0.1" || i === "chartsbuilder.matge.com")
    return;
  const r = new URLSearchParams();
  r.set("c", a), e && r.set("t", e);
  const s = `${ni}?${r.toString()}`;
  try {
    fetch(s, { method: "GET", keepalive: !0, mode: "no-cors" }).catch(() => {
    });
  } catch {
  }
}
u(j, "sendWidgetBeacon");
function tt(a) {
  return a ? String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
}
u(tt, "escapeHtml");
function kt(a, e = !1) {
  if (typeof a == "number")
    return isNaN(a) ? e ? null : 0 : a;
  if (typeof a != "string")
    return e ? null : 0;
  let t = a.trim();
  if (t === "")
    return e ? null : 0;
  t = t.replace(/\s/g, "");
  const i = t.includes(","), r = t.includes(".");
  if (i && r) {
    const n = t.lastIndexOf(","), o = t.lastIndexOf(".");
    n > o ? t = t.replace(/\./g, "").replace(",", ".") : t = t.replace(/,/g, "");
  } else i && (t = t.replace(",", "."));
  const s = parseFloat(t);
  return isNaN(s) ? e ? null : 0 : s;
}
u(kt, "toNumber");
function ai(a) {
  if (typeof a != "string")
    return !1;
  const e = a.trim();
  return e === "" ? !1 : /^-?[\d\s]+([.,]\d+)?$/.test(e);
}
u(ai, "looksLikeNumber");
function oi(a) {
  return !a || typeof a != "string" || ["N/A", "null", "undefined", "00", ""].includes(a) ? !1 : !!(a === "2A" || a === "2B" || /^97[1-6]$/.test(a) || /^(0[1-9]|[1-8]\d|9[0-5])$/.test(a));
}
u(oi, "isValidDeptCode");
const We = {
  baseUrl: "https://chartsbuilder.matge.com",
  endpoints: {
    grist: "/grist-proxy",
    gristGouv: "/grist-gouv-proxy",
    albert: "/albert-proxy",
    tabular: "/tabular-proxy"
  }
};
function li() {
  return typeof window < "u" && window.location.hostname === "localhost" && window.location.port === "5173";
}
u(li, "isViteDevMode");
function ci() {
  return typeof window < "u" && "__TAURI__" in window;
}
u(ci, "isTauriMode");
function jt() {
  var i;
  const a = { ...We.endpoints };
  return li() ? { baseUrl: "", endpoints: a } : ci() ? { baseUrl: We.baseUrl, endpoints: a } : {
    baseUrl: ((i = import.meta.env) == null ? void 0 : i.VITE_PROXY_URL) || We.baseUrl,
    endpoints: a
  };
}
u(jt, "getProxyConfig");
function ui(a) {
  const e = jt();
  return a.includes("tabular-api.data.gouv.fr") ? a.replace("https://tabular-api.data.gouv.fr", `${e.baseUrl}${e.endpoints.tabular}`) : a.includes("docs.getgrist.com") ? a.replace("https://docs.getgrist.com", `${e.baseUrl}${e.endpoints.grist}`) : a.includes("grist.numerique.gouv.fr") ? a.replace("https://grist.numerique.gouv.fr", `${e.baseUrl}${e.endpoints.gristGouv}`) : a.includes("albert.api.etalab.gouv.fr") ? a.replace("https://albert.api.etalab.gouv.fr", `${e.baseUrl}${e.endpoints.albert}`) : a;
}
u(ui, "getProxiedUrl");
const z = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading"
}, ot = /* @__PURE__ */ new Map();
function di(a, e) {
  ot.set(a, e);
}
u(di, "setDataCache");
function ye(a) {
  return ot.get(a);
}
u(ye, "getDataCache");
function Re(a) {
  ot.delete(a);
}
u(Re, "clearDataCache");
function K(a, e) {
  di(a, e);
  const t = new CustomEvent(z.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: a, data: e }
  });
  document.dispatchEvent(t);
}
u(K, "dispatchDataLoaded");
function V(a, e) {
  const t = new CustomEvent(z.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: a, error: e }
  });
  document.dispatchEvent(t);
}
u(V, "dispatchDataError");
function H(a) {
  const e = new CustomEvent(z.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: a }
  });
  document.dispatchEvent(e);
}
u(H, "dispatchDataLoading");
function Me(a, e) {
  const t = /* @__PURE__ */ u((s) => {
    const n = s;
    n.detail.sourceId === a && e.onLoaded && e.onLoaded(n.detail.data);
  }, "handleLoaded"), i = /* @__PURE__ */ u((s) => {
    const n = s;
    n.detail.sourceId === a && e.onError && e.onError(n.detail.error);
  }, "handleError"), r = /* @__PURE__ */ u((s) => {
    s.detail.sourceId === a && e.onLoading && e.onLoading();
  }, "handleLoading");
  return document.addEventListener(z.LOADED, t), document.addEventListener(z.ERROR, i), document.addEventListener(z.LOADING, r), () => {
    document.removeEventListener(z.LOADED, t), document.removeEventListener(z.ERROR, i), document.removeEventListener(z.LOADING, r);
  };
}
u(Me, "subscribeToSource");
var L = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, re;
let F = (re = class extends $ {
  constructor() {
    super(...arguments), this.url = "", this.method = "GET", this.headers = "", this.params = "", this.refresh = 0, this.transform = "", this._loading = !1, this._error = null, this._data = null, this._refreshInterval = null, this._abortController = null;
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return h``;
  }
  connectedCallback() {
    super.connectedCallback(), j("gouv-source"), this._setupRefresh();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && Re(this.id);
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
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, H(this.id);
      try {
        const e = ui(this._buildUrl()), t = this._buildFetchOptions(), i = await fetch(e, {
          ...t,
          signal: this._abortController.signal
        });
        if (!i.ok)
          throw new Error(`HTTP ${i.status}: ${i.statusText}`);
        const r = await i.json();
        this._data = this.transform ? y(r, this.transform) : r, K(this.id, this._data);
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
        Object.entries(i).forEach(([r, s]) => {
          t.searchParams.set(r, String(s));
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
}, u(re, "GouvSource"), re);
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
  _()
], F.prototype, "_loading", void 0);
L([
  _()
], F.prototype, "_error", void 0);
L([
  _()
], F.prototype, "_data", void 0);
F = L([
  E("gouv-source")
], F);
var x = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
};
const Te = 100, Qe = 10;
var se;
let w = (se = class extends $ {
  constructor() {
    super(...arguments), this.apiType = "generic", this.source = "", this.baseUrl = "", this.datasetId = "", this.resource = "", this.select = "", this.where = "", this.filter = "", this.groupBy = "", this.aggregate = "", this.orderBy = "", this.limit = 0, this.transform = "", this.refresh = 0, this._loading = !1, this._error = null, this._data = [], this._rawData = [], this._refreshInterval = null, this._abortController = null, this._unsubscribe = null;
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return h``;
  }
  connectedCallback() {
    super.connectedCallback(), j("gouv-query", this.apiType), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && Re(this.id);
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
    const e = ye(this.source);
    e !== void 0 && (this._rawData = Array.isArray(e) ? e : [e], this._processClientSide()), this._unsubscribe = Me(this.source, {
      onLoaded: /* @__PURE__ */ u((t) => {
        this._rawData = Array.isArray(t) ? t : [t], this._processClientSide();
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ u(() => {
        this._loading = !0, H(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ u((t) => {
        this._error = t, this._loading = !1, V(this.id, t);
      }, "onError")
    });
  }
  /**
   * Traitement côté client des données
   */
  _processClientSide() {
    try {
      H(this.id), this._loading = !0;
      let e = [...this._rawData];
      const t = this.filter || this.where;
      t && (e = this._applyFilters(e, t)), this.groupBy && (e = this._applyGroupByAndAggregate(e)), this.orderBy && (e = this._applySort(e)), this.limit > 0 && (e = e.slice(0, this.limit)), this._data = e, K(this.id, this._data);
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
    return e.filter((r) => i.every((s) => this._matchesFilter(r, s)));
  }
  _parseFilters(e) {
    const t = [], i = e.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const s = r.split(":");
      if (s.length >= 2) {
        const n = s[0], o = s[1];
        let l;
        if (s.length > 2) {
          const d = s.slice(2).join(":");
          o === "in" || o === "notin" ? l = d.split("|").map((f) => {
            const p = this._parseValue(f);
            return typeof p == "boolean" ? String(p) : p;
          }) : l = this._parseValue(d);
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
    const i = y(e, t.field);
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
    const t = this.groupBy.split(",").map((n) => n.trim()).filter(Boolean), i = this._parseAggregates(this.aggregate), r = /* @__PURE__ */ new Map();
    for (const n of e) {
      const o = t.map((l) => String(y(n, l) ?? "")).join("|||");
      r.has(o) || r.set(o, []), r.get(o).push(n);
    }
    const s = [];
    for (const [n, o] of r) {
      const l = {}, d = n.split("|||");
      t.forEach((f, p) => {
        At(l, f, d[p]);
      });
      for (const f of i) {
        const p = f.alias || `${f.field}__${f.function}`;
        At(l, p, this._computeAggregate(o, f));
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
    const i = e.map((r) => Number(y(r, t.field))).filter((r) => !isNaN(r));
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
    return [...e].sort((s, n) => {
      const o = y(s, i), l = y(n, i), d = Number(o), f = Number(l);
      if (!isNaN(d) && !isNaN(f))
        return r === "desc" ? f - d : d - f;
      const p = String(o ?? ""), m = String(l ?? "");
      return r === "desc" ? m.localeCompare(p) : p.localeCompare(m);
    });
  }
  /**
   * Mode API: fait une requête directe à l'API
   */
  async _fetchFromApi() {
    if (this.apiType === "opendatasoft" && !this.datasetId) {
      console.warn('gouv-query: attribut "dataset-id" requis pour les requêtes OpenDataSoft');
      return;
    }
    if (this.apiType === "tabular" && !this.resource) {
      console.warn('gouv-query: attribut "resource" requis pour les requêtes Tabular');
      return;
    }
    this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, H(this.id);
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
    let r = this.transform ? y(i, this.transform) : i;
    Array.isArray(r) || (this.apiType === "tabular" && i.data ? r = i.data : r = [r]), this._data = r, K(this.id, this._data);
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
    const t = this.limit <= 0 ? Qe * Te : this.limit, i = Te;
    let r = [], s = 0, n = -1;
    for (let o = 0; o < Qe; o++) {
      const l = t - r.length;
      if (l <= 0)
        break;
      const d = this._buildOpenDataSoftUrl(Math.min(i, l), s), f = await fetch(d, {
        signal: this._abortController.signal
      });
      if (!f.ok)
        throw new Error(`HTTP ${f.status}: ${f.statusText}`);
      const p = await f.json(), m = p.results || [];
      if (r = r.concat(m), typeof p.total_count == "number" && (n = p.total_count), n >= 0 && r.length >= n || m.length < i)
        break;
      s += m.length;
    }
    n >= 0 && r.length < n && r.length < t && console.warn(`gouv-query[${this.id}]: pagination incomplete - ${r.length}/${n} resultats recuperes (limite de securite: ${Qe} pages de ${Te})`), this._data = this.transform ? y(r, this.transform) : r, K(this.id, this._data);
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
    if (this.select)
      r.searchParams.set("select", this.select);
    else if (this.aggregate && this.groupBy) {
      const n = this._parseAggregates(this.aggregate), o = [];
      for (const d of n) {
        const f = d.function === "count" ? "count(*)" : `${d.function}(${d.field})`, p = d.alias || `${d.field}__${d.function}`;
        o.push(`${f} as ${p}`);
      }
      const l = this.groupBy.split(",").map((d) => d.trim()).filter(Boolean);
      for (const d of l)
        o.push(d);
      r.searchParams.set("select", o.join(", "));
    }
    const s = this.where || this.filter;
    if (s && r.searchParams.set("where", s), this.groupBy && r.searchParams.set("group_by", this.groupBy), this.orderBy) {
      const n = this.orderBy.replace(/:(\w+)$/, (o, l) => ` ${l.toUpperCase()}`);
      r.searchParams.set("order_by", n);
    }
    return e !== void 0 ? r.searchParams.set("limit", String(e)) : this.limit > 0 && r.searchParams.set("limit", String(Math.min(this.limit, Te))), t && t > 0 && r.searchParams.set("offset", String(t)), r.toString();
  }
  /**
   * Construit une URL Tabular API (data.gouv.fr)
   */
  _buildTabularUrl() {
    let e;
    if (this.baseUrl)
      e = this.baseUrl;
    else {
      const r = jt();
      e = `${r.baseUrl}${r.endpoints.tabular}`;
    }
    if (!this.resource)
      throw new Error(`gouv-query: attribut "resource" requis pour l'API Tabular`);
    const t = new URL(`${e}/api/resources/${this.resource}/data/`, window.location.origin), i = this.filter || this.where;
    if (i) {
      const r = i.split(",").map((s) => s.trim());
      for (const s of r) {
        const n = s.split(":");
        if (n.length >= 3) {
          const o = n[0], l = this._mapOperatorToTabular(n[1]), d = n.slice(2).join(":");
          t.searchParams.set(`${o}__${l}`, d);
        }
      }
    }
    if (this.groupBy) {
      const r = this.groupBy.split(",").map((s) => s.trim());
      for (const s of r)
        t.searchParams.append(`${s}__groupby`, "");
    }
    if (this.aggregate) {
      const r = this.aggregate.split(",").map((s) => s.trim());
      for (const s of r) {
        const n = s.split(":");
        if (n.length >= 2) {
          const o = n[0], l = n[1];
          t.searchParams.append(`${o}__${l}`, "");
        }
      }
    }
    if (this.orderBy) {
      const r = this.orderBy.split(":"), s = r[0], n = r[1] || "asc";
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
}, u(se, "GouvQuery"), se);
x([
  c({ type: String, attribute: "api-type" })
], w.prototype, "apiType", void 0);
x([
  c({ type: String })
], w.prototype, "source", void 0);
x([
  c({ type: String, attribute: "base-url" })
], w.prototype, "baseUrl", void 0);
x([
  c({ type: String, attribute: "dataset-id" })
], w.prototype, "datasetId", void 0);
x([
  c({ type: String })
], w.prototype, "resource", void 0);
x([
  c({ type: String })
], w.prototype, "select", void 0);
x([
  c({ type: String })
], w.prototype, "where", void 0);
x([
  c({ type: String })
], w.prototype, "filter", void 0);
x([
  c({ type: String, attribute: "group-by" })
], w.prototype, "groupBy", void 0);
x([
  c({ type: String })
], w.prototype, "aggregate", void 0);
x([
  c({ type: String, attribute: "order-by" })
], w.prototype, "orderBy", void 0);
x([
  c({ type: Number })
], w.prototype, "limit", void 0);
x([
  c({ type: String })
], w.prototype, "transform", void 0);
x([
  c({ type: Number })
], w.prototype, "refresh", void 0);
x([
  _()
], w.prototype, "_loading", void 0);
x([
  _()
], w.prototype, "_error", void 0);
x([
  _()
], w.prototype, "_data", void 0);
x([
  _()
], w.prototype, "_rawData", void 0);
w = x([
  E("gouv-query")
], w);
var U = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, ne;
let O = (ne = class extends $ {
  constructor() {
    super(...arguments), this.source = "", this.numeric = "", this.numericAuto = !1, this.rename = "", this.trim = !1, this.stripHtml = !1, this.replace = "", this.flatten = "", this.lowercaseKeys = !1, this._unsubscribe = null;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return h``;
  }
  connectedCallback() {
    super.connectedCallback(), j("gouv-normalize"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && Re(this.id);
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    if (["flatten", "numeric", "numericAuto", "rename", "trim", "stripHtml", "replace", "lowercaseKeys"].some((r) => e.has(r))) {
      const r = this.source ? ye(this.source) : void 0;
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
    const e = ye(this.source);
    e !== void 0 && this._processData(e), this._unsubscribe = Me(this.source, {
      onLoaded: /* @__PURE__ */ u((t) => {
        this._processData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ u(() => {
        H(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ u((t) => {
        V(this.id, t);
      }, "onError")
    });
  }
  _processData(e) {
    try {
      H(this.id);
      let t = Array.isArray(e) ? e : [e];
      this.flatten && (t = t.map((o) => o == null || typeof o != "object" || Array.isArray(o) ? o : this._flattenRow(o, this.flatten)));
      const i = this._parseNumericFields(), r = this._parsePipeMap(this.rename), s = this._parsePipeMap(this.replace), n = t.map((o) => o == null || typeof o != "object" ? o : this._normalizeRow(o, i, r, s));
      K(this.id, n);
    } catch (t) {
      V(this.id, t), console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`, t);
    }
  }
  _normalizeRow(e, t, i, r) {
    const s = {};
    for (const [n, o] of Object.entries(e)) {
      const l = this.trim ? n.trim() : n;
      let d = o;
      if (this.trim && typeof d == "string" && (d = d.trim()), this.stripHtml && typeof d == "string" && (d = d.replace(/<[^>]*>/g, "")), r.size > 0 && typeof d == "string") {
        for (const [m, D] of r)
          if (d === m) {
            d = D;
            break;
          }
      }
      if (t.has(l))
        d = kt(d);
      else if (this.numericAuto && typeof d == "string" && ai(d)) {
        const m = kt(d, !0);
        m !== null && (d = m);
      }
      const f = i.get(l) ?? l, p = this.lowercaseKeys ? f.toLowerCase() : f;
      s[p] = d;
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
      const n = r.substring(0, s).trim(), o = r.substring(s + 1).trim();
      n && t.set(n, o);
    }
    return t;
  }
}, u(ne, "GouvNormalize"), ne);
U([
  c({ type: String })
], O.prototype, "source", void 0);
U([
  c({ type: String })
], O.prototype, "numeric", void 0);
U([
  c({ type: Boolean, attribute: "numeric-auto" })
], O.prototype, "numericAuto", void 0);
U([
  c({ type: String })
], O.prototype, "rename", void 0);
U([
  c({ type: Boolean })
], O.prototype, "trim", void 0);
U([
  c({ type: Boolean, attribute: "strip-html" })
], O.prototype, "stripHtml", void 0);
U([
  c({ type: String })
], O.prototype, "replace", void 0);
U([
  c({ type: String })
], O.prototype, "flatten", void 0);
U([
  c({ type: Boolean, attribute: "lowercase-keys" })
], O.prototype, "lowercaseKeys", void 0);
O = U([
  E("gouv-normalize")
], O);
var C = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, ae;
let S = (ae = class extends $ {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.labels = "", this.maxValues = 6, this.disjunctive = "", this.sort = "count", this.searchable = "", this.hideEmpty = !1, this.display = "", this.urlParams = !1, this.urlParamMap = "", this.urlSync = !1, this._rawData = [], this._facetGroups = [], this._activeSelections = {}, this._expandedFacets = /* @__PURE__ */ new Set(), this._searchQueries = {}, this._openMultiselectField = null, this._unsubscribe = null, this._popstateHandler = null, this._urlParamsApplied = !1, this._onClickOutsideMultiselect = (e) => {
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
    super.connectedCallback(), j("gouv-facets"), this._initialize(), document.addEventListener("click", this._onClickOutsideMultiselect), this.urlSync && (this._popstateHandler = () => {
      this._applyUrlParams(), this._buildFacetGroups(), this._applyFilters();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._onClickOutsideMultiselect), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && Re(this.id);
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    ["fields", "labels", "sort", "hideEmpty", "maxValues", "disjunctive", "searchable", "display"].some((r) => e.has(r)) && this._rawData.length > 0 && (this._buildFacetGroups(), this._applyFilters());
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
    const e = ye(this.source);
    e !== void 0 && this._onData(e), this._unsubscribe = Me(this.source, {
      onLoaded: /* @__PURE__ */ u((t) => {
        this._onData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ u(() => {
        H(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ u((t) => {
        V(this.id, t);
      }, "onError")
    });
  }
  _onData(e) {
    this._rawData = Array.isArray(e) ? e : [], this.urlParams && !this._urlParamsApplied && (this._applyUrlParams(), this._urlParamsApplied = !0), this._buildFacetGroups(), this._applyFilters();
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
    return this.fields ? Je(this.fields) : this._autoDetectFields();
  }
  /** Auto-detect categorical fields: string type, 2-50 unique values, not all unique (ID-like) */
  _autoDetectFields() {
    if (this._rawData.length === 0)
      return [];
    const e = [], t = this._rawData[0];
    for (const i of Object.keys(t)) {
      const r = /* @__PURE__ */ new Set();
      let s = !0;
      for (const n of this._rawData) {
        const o = n[i];
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
      const n = s[e];
      if (n == null || n === "")
        continue;
      const o = String(n);
      i.set(o, (i.get(o) ?? 0) + 1);
    }
    const r = [];
    for (const [s, n] of i)
      r.push({ value: s, count: n });
    return this._sortValues(r);
  }
  /** Filter data by all active selections EXCEPT the given field */
  _getDataFilteredExcluding(e) {
    const t = Object.keys(this._activeSelections).filter((i) => i !== e && this._activeSelections[i].size > 0);
    return t.length === 0 ? this._rawData : this._rawData.filter((i) => t.every((r) => {
      const s = this._activeSelections[r], n = i[r];
      return n == null ? !1 : s.has(String(n));
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
  // --- Filtering ---
  _applyFilters() {
    const e = Object.keys(this._activeSelections).filter((i) => this._activeSelections[i].size > 0);
    let t;
    e.length === 0 ? t = this._rawData : t = this._rawData.filter((i) => e.every((r) => {
      const s = this._activeSelections[r], n = i[r];
      return n == null ? !1 : s.has(String(n));
    })), K(this.id, t);
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
      const s = i.substring(0, r).trim(), n = i.substring(r + 1).trim();
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
    for (const i of t) {
      const r = i.indexOf(":");
      if (r === -1)
        continue;
      const s = i.substring(0, r).trim(), n = i.substring(r + 1).trim();
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
    const i = { ...this._activeSelections }, r = new Set(i[e] ?? []), s = this._getDisplayMode(e), n = Je(this.disjunctive), o = s === "multiselect" || s === "checkbox" && n.includes(e);
    r.has(t) ? r.delete(t) : (o || r.clear(), r.add(t)), r.size === 0 ? delete i[e] : i[e] = r, this._activeSelections = i, this._buildFacetGroups(), this._applyFilters(), this.urlSync && this._syncUrl();
  }
  _handleSelectChange(e, t) {
    const r = t.target.value, s = { ...this._activeSelections };
    r ? s[e] = /* @__PURE__ */ new Set([r]) : delete s[e], this._activeSelections = s, this._buildFacetGroups(), this._applyFilters(), this.urlSync && this._syncUrl();
  }
  _clearFieldSelections(e) {
    const t = { ...this._activeSelections };
    delete t[e], this._activeSelections = t, this._buildFacetGroups(), this._applyFilters(), this.urlSync && this._syncUrl();
  }
  _toggleMultiselectDropdown(e) {
    this._openMultiselectField = this._openMultiselectField === e ? null : e;
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
    this._activeSelections = {}, this._searchQueries = {}, this._buildFacetGroups(), this._applyFilters(), this.urlSync && this._syncUrl();
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
      const s = i.substring(0, r).trim(), n = i.substring(r + 1).trim();
      s && n && e.set(s, n);
    }
    return e;
  }
  /** Read URL search params and apply as facet pre-selections */
  _applyUrlParams() {
    const e = new URLSearchParams(window.location.search), t = this._parseUrlParamMap(), i = {};
    for (const [r, s] of e.entries()) {
      const n = t.size > 0 ? t.get(r) ?? null : r;
      if (!n)
        continue;
      const o = s.split(",").map((l) => l.trim()).filter(Boolean);
      i[n] || (i[n] = /* @__PURE__ */ new Set());
      for (const l of o)
        i[n].add(l);
    }
    Object.keys(i).length > 0 && (this._activeSelections = i);
  }
  /** Sync current facet selections back to URL (replaceState) */
  _syncUrl() {
    const e = new URLSearchParams(), t = this._parseUrlParamMap(), i = /* @__PURE__ */ new Map();
    for (const [n, o] of t)
      i.set(o, n);
    for (const [n, o] of Object.entries(this._activeSelections)) {
      if (o.size === 0)
        continue;
      const l = i.get(n) ?? n;
      e.set(l, [...o].join(","));
    }
    const r = e.toString(), s = r ? `${window.location.pathname}?${r}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", s);
  }
  // --- Rendering ---
  render() {
    if (this._rawData.length === 0 || this._facetGroups.length === 0)
      return g;
    const e = Object.keys(this._activeSelections).some((t) => this._activeSelections[t].size > 0);
    return h`
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
        ${e ? h`
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
    const i = Je(this.searchable).includes(e.field), r = (this._searchQueries[e.field] ?? "").toLowerCase(), s = this._expandedFacets.has(e.field), n = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set();
    let o = e.values;
    i && r && (o = o.filter((p) => p.value.toLowerCase().includes(r)));
    const l = s ? o : o.slice(0, this.maxValues), d = o.length > this.maxValues, f = `facet-${this.id}-${e.field}`;
    return h`
      <fieldset class="gouv-facets__group fr-fieldset" aria-labelledby="${f}-legend">
        <legend class="gouv-facets__legend" id="${f}-legend">${e.label}</legend>
        ${i ? h`
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
      const m = `${f}-${p.value.replace(/[^a-zA-Z0-9]/g, "_")}`, D = n.has(p.value);
      return h`
              <li class="gouv-facets__value">
                <input type="checkbox" id="${m}"
                  .checked="${D}"
                  @change="${() => this._toggleValue(e.field, p.value)}">
                <label class="gouv-facets__value-label" for="${m}">${p.value}</label>
                <span class="gouv-facets__value-count">${p.count}</span>
              </li>
            `;
    })}
        </ul>
        ${d ? h`
          <button class="gouv-facets__more" type="button"
            @click="${() => this._toggleExpand(e.field)}">
            ${s ? "Voir moins" : `Voir plus (${o.length - this.maxValues})`}
          </button>
        ` : g}
      </fieldset>
    `;
  }
  _renderSelectGroup(e) {
    const t = `facet-${this.id}-${e.field}`, i = this._activeSelections[e.field], r = i ? [...i][0] ?? "" : "";
    return h`
      <div class="gouv-facets__group fr-select-group" data-field="${e.field}">
        <label class="fr-label" for="${t}-select">${e.label}</label>
        <select class="fr-select" id="${t}-select"
          @change="${(s) => this._handleSelectChange(e.field, s)}">
          <option value="" ?selected="${!r}">Tous</option>
          ${e.values.map((s) => h`
            <option value="${s.value}" ?selected="${s.value === r}">
              ${s.value} (${s.count})
            </option>
          `)}
        </select>
      </div>
    `;
  }
  _renderMultiselectGroup(e) {
    const t = `facet-${this.id}-${e.field}`, i = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set(), r = this._openMultiselectField === e.field, s = (this._searchQueries[e.field] ?? "").toLowerCase();
    let n = e.values;
    s && (n = n.filter((l) => l.value.toLowerCase().includes(s)));
    const o = i.size > 0 ? `${i.size} option${i.size > 1 ? "s" : ""} selectionnee${i.size > 1 ? "s" : ""}` : "Selectionnez des options";
    return h`
      <div class="gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}">
        <label class="gouv-facets__legend" id="${t}-legend">${e.label}</label>
        <button class="fr-btn fr-btn--secondary fr-btn--sm gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${r}"
          aria-controls="${t}-panel"
          @click="${(l) => {
      l.stopPropagation(), this._toggleMultiselectDropdown(e.field);
    }}">
          ${o}
          <span class="fr-icon-arrow-${r ? "up" : "down"}-s-line" aria-hidden="true"></span>
        </button>
        ${r ? h`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               @click="${(l) => l.stopPropagation()}">
            ${i.size > 0 ? h`
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
      const d = `${t}-${l.value.replace(/[^a-zA-Z0-9]/g, "_")}`, f = i.has(l.value);
      return h`
                  <li class="gouv-facets__value">
                    <input type="checkbox" id="${d}"
                      .checked="${f}"
                      @change="${() => this._toggleValue(e.field, l.value)}">
                    <label class="gouv-facets__value-label" for="${d}">${l.value}</label>
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
}, u(ae, "GouvFacets"), ae);
C([
  c({ type: String })
], S.prototype, "source", void 0);
C([
  c({ type: String })
], S.prototype, "fields", void 0);
C([
  c({ type: String })
], S.prototype, "labels", void 0);
C([
  c({ type: Number, attribute: "max-values" })
], S.prototype, "maxValues", void 0);
C([
  c({ type: String })
], S.prototype, "disjunctive", void 0);
C([
  c({ type: String })
], S.prototype, "sort", void 0);
C([
  c({ type: String })
], S.prototype, "searchable", void 0);
C([
  c({ type: Boolean, attribute: "hide-empty" })
], S.prototype, "hideEmpty", void 0);
C([
  c({ type: String })
], S.prototype, "display", void 0);
C([
  c({ type: Boolean, attribute: "url-params" })
], S.prototype, "urlParams", void 0);
C([
  c({ type: String, attribute: "url-param-map" })
], S.prototype, "urlParamMap", void 0);
C([
  c({ type: Boolean, attribute: "url-sync" })
], S.prototype, "urlSync", void 0);
C([
  _()
], S.prototype, "_rawData", void 0);
C([
  _()
], S.prototype, "_facetGroups", void 0);
C([
  _()
], S.prototype, "_activeSelections", void 0);
C([
  _()
], S.prototype, "_expandedFacets", void 0);
C([
  _()
], S.prototype, "_searchQueries", void 0);
C([
  _()
], S.prototype, "_openMultiselectField", void 0);
S = C([
  E("gouv-facets")
], S);
function Je(a) {
  return a ? a.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
u(Je, "_parseCSV");
var P = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, oe;
let A = (oe = class extends $ {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.placeholder = "Rechercher…", this.label = "Rechercher", this.debounce = 300, this.minLength = 0, this.highlight = !1, this.operator = "contains", this.srLabel = !1, this.count = !1, this.urlSearchParam = "", this.urlSync = !1, this._allData = [], this._filteredData = [], this._term = "", this._resultCount = 0, this._debounceTimer = null, this._unsubscribe = null, this._urlParamApplied = !1;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), j("gouv-search"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._debounceTimer !== null && (clearTimeout(this._debounceTimer), this._debounceTimer = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && Re(this.id);
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
    const e = ye(this.source);
    e !== void 0 && this._onData(e), this._unsubscribe = Me(this.source, {
      onLoaded: /* @__PURE__ */ u((t) => {
        this._onData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ u(() => {
        H(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ u((t) => {
        V(this.id, t);
      }, "onError")
    });
  }
  _onData(e) {
    this._allData = Array.isArray(e) ? e : [], this.urlSearchParam && !this._urlParamApplied && (this._applyUrlSearchParam(), this._urlParamApplied = !0), this._applyFilter();
  }
  /** Read URL search param and set as initial search term */
  _applyUrlSearchParam() {
    if (!this.urlSearchParam)
      return;
    const t = new URLSearchParams(window.location.search).get(this.urlSearchParam);
    t && (this._term = t);
  }
  _applyFilter() {
    const e = this._term;
    if (!e || e.length < this.minLength)
      this._filteredData = [...this._allData];
    else {
      const t = this._getFields(), i = this.operator || "contains", r = this._normalize(e);
      this._filteredData = this._allData.filter((s) => this._matchRecord(s, r, t, i));
    }
    this.highlight && e && e.length >= this.minLength && (this._filteredData = this._filteredData.map((t) => this._addHighlight(t, e))), this._resultCount = this._filteredData.length, this._dispatch();
  }
  _matchRecord(e, t, i, r) {
    const s = i.length > 0 ? i : Object.keys(e).filter((n) => !n.startsWith("_"));
    switch (r) {
      case "starts":
        return s.some((n) => this._normalize(String(e[n] ?? "")).split(/\s+/).some((l) => l.startsWith(t)));
      case "words":
        return t.split(/\s+/).filter(Boolean).every((o) => s.some((l) => this._normalize(String(e[l] ?? "")).includes(o)));
      case "contains":
      default:
        return s.some((n) => this._normalize(String(e[n] ?? "")).includes(t));
    }
  }
  _normalize(e) {
    return String(e).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }
  _getFields() {
    return this.fields ? this.fields.split(",").map((e) => e.trim()).filter(Boolean) : [];
  }
  _addHighlight(e, t) {
    const i = { ...e }, r = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), s = new RegExp("(" + r + ")", "gi"), n = this._getFields(), o = n.length > 0 ? n : Object.keys(e).filter((d) => typeof e[d] == "string"), l = [];
    return o.forEach((d) => {
      typeof e[d] == "string" && l.push(e[d].replace(s, "<mark>$1</mark>"));
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
    this.id && (K(this.id, this._filteredData), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
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
    return h`
      <div class="fr-search-bar" role="search" aria-label="${this.label}">
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
      ${this.count ? h`
        <p class="fr-text--sm fr-mt-1v gouv-search-count" aria-live="polite">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      ` : g}
    `;
  }
}, u(oe, "GouvSearch"), oe);
P([
  c({ type: String })
], A.prototype, "source", void 0);
P([
  c({ type: String })
], A.prototype, "fields", void 0);
P([
  c({ type: String })
], A.prototype, "placeholder", void 0);
P([
  c({ type: String })
], A.prototype, "label", void 0);
P([
  c({ type: Number })
], A.prototype, "debounce", void 0);
P([
  c({ type: Number, attribute: "min-length" })
], A.prototype, "minLength", void 0);
P([
  c({ type: Boolean })
], A.prototype, "highlight", void 0);
P([
  c({ type: String })
], A.prototype, "operator", void 0);
P([
  c({ type: Boolean, attribute: "sr-label" })
], A.prototype, "srLabel", void 0);
P([
  c({ type: Boolean })
], A.prototype, "count", void 0);
P([
  c({ type: String, attribute: "url-search-param" })
], A.prototype, "urlSearchParam", void 0);
P([
  c({ type: Boolean, attribute: "url-sync" })
], A.prototype, "urlSync", void 0);
P([
  _()
], A.prototype, "_allData", void 0);
P([
  _()
], A.prototype, "_filteredData", void 0);
P([
  _()
], A.prototype, "_term", void 0);
P([
  _()
], A.prototype, "_resultCount", void 0);
A = P([
  E("gouv-search")
], A);
function Ie(a) {
  const t = class t extends a {
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
      const s = ye(r);
      s !== void 0 && (this._sourceData = s, this.onSourceData(s)), this._unsubscribeSource = Me(r, {
        onLoaded: /* @__PURE__ */ u((n) => {
          this._sourceData = n, this._sourceLoading = !1, this._sourceError = null, this.onSourceData(n), this.requestUpdate();
        }, "onLoaded"),
        onLoading: /* @__PURE__ */ u(() => {
          this._sourceLoading = !0, this.requestUpdate();
        }, "onLoading"),
        onError: /* @__PURE__ */ u((n) => {
          this._sourceError = n, this._sourceLoading = !1, this.requestUpdate();
        }, "onError")
      });
    }
    _cleanupSubscription() {
      this._unsubscribeSource && (this._unsubscribeSource(), this._unsubscribeSource = null);
    }
  };
  u(t, "SourceSubscriberElement");
  let e = t;
  return e;
}
u(Ie, "SourceSubscriberMixin");
function Et(a, e = "nombre") {
  if (a == null || a === "")
    return "—";
  const t = typeof a == "string" ? parseFloat(a) : a;
  if (isNaN(t))
    return "—";
  switch (e) {
    case "nombre":
      return Dt(t);
    case "pourcentage":
      return hi(t);
    case "euro":
      return pi(t);
    case "decimal":
      return fi(t);
    default:
      return Dt(t);
  }
}
u(Et, "formatValue");
function Dt(a) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(a));
}
u(Dt, "formatNumber");
function hi(a) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(a / 100);
}
u(hi, "formatPercentage");
function pi(a) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(a);
}
u(pi, "formatCurrency");
function fi(a) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(a);
}
u(fi, "formatDecimal");
function Ci(a) {
  const e = typeof a == "string" ? new Date(a) : a;
  return isNaN(e.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(e);
}
u(Ci, "formatDate");
function gi(a, e, t) {
  return e !== void 0 && a >= e ? "vert" : t !== void 0 && a >= t ? "orange" : e !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
u(gi, "getColorBySeuil");
function _i(a) {
  const e = a.split(":");
  if (e.length === 1)
    return e[0] === "count" ? { type: "count", field: "" } : { type: "direct", field: e[0] };
  const t = e[0], i = e[1];
  if (e.length === 3) {
    let r = e[2];
    return r === "true" ? r = !0 : r === "false" ? r = !1 : isNaN(Number(r)) || (r = Number(r)), { type: t, field: i, filterField: i, filterValue: r };
  }
  return { type: t, field: i };
}
u(_i, "parseExpression");
function Rt(a, e) {
  const t = _i(e);
  if (t.type === "direct" && !Array.isArray(a))
    return a[t.field];
  if (!Array.isArray(a))
    return null;
  const i = a;
  switch (t.type) {
    case "direct":
    case "first":
      return i.length > 0 ? i[0][t.field] : null;
    case "last":
      return i.length > 0 ? i[i.length - 1][t.field] : null;
    case "count":
      return t.filterValue !== void 0 ? i.filter((s) => s[t.field] === t.filterValue).length : i.length;
    case "sum":
      return i.reduce((s, n) => {
        const o = Number(n[t.field]);
        return s + (isNaN(o) ? 0 : o);
      }, 0);
    case "avg":
      return i.length === 0 ? null : i.reduce((s, n) => {
        const o = Number(n[t.field]);
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
u(Rt, "computeAggregation");
var T = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
};
const Mt = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
var le;
let R = (le = class extends Ie($) {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "";
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), j("gouv-kpi");
  }
  _computeValue() {
    return !this._sourceData || !this.valeur ? null : Rt(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const e = this._computeValue();
    return typeof e != "number" ? "bleu" : gi(e, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const e = Rt(this._sourceData, this.tendance);
    return typeof e != "number" ? null : {
      value: e,
      direction: e > 0 ? "up" : e < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const e = this._computeValue(), t = Et(e, this.format);
    return `${this.label}: ${t}`;
  }
  render() {
    const e = this._computeValue(), t = Et(e, this.format), i = Mt[this._getColor()] || Mt.bleu, r = this._getTendanceInfo();
    return h`
      <div
        class="gouv-kpi ${i}"
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
              ${r ? h`
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
}, u(le, "GouvKpi"), le);
R.styles = Tt``;
T([
  c({ type: String })
], R.prototype, "source", void 0);
T([
  c({ type: String })
], R.prototype, "valeur", void 0);
T([
  c({ type: String })
], R.prototype, "label", void 0);
T([
  c({ type: String })
], R.prototype, "description", void 0);
T([
  c({ type: String })
], R.prototype, "icone", void 0);
T([
  c({ type: String })
], R.prototype, "format", void 0);
T([
  c({ type: String })
], R.prototype, "tendance", void 0);
T([
  c({ type: Number, attribute: "seuil-vert" })
], R.prototype, "seuilVert", void 0);
T([
  c({ type: Number, attribute: "seuil-orange" })
], R.prototype, "seuilOrange", void 0);
T([
  c({ type: String })
], R.prototype, "couleur", void 0);
R = T([
  E("gouv-kpi")
], R);
var M = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, ce;
let k = (ce = class extends Ie($) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), j("gouv-datalist"), this._initSort();
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
      e.sort((r, s) => {
        const n = r[t], o = s[t];
        if (n === o)
          return 0;
        if (n == null)
          return 1;
        if (o == null)
          return -1;
        const l = typeof n == "number" && typeof o == "number" ? n - o : String(n).localeCompare(String(o), "fr");
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
    const e = this.parseColumns(), t = this.getFilteredData(), i = e.map((d) => d.label).join(";"), r = t.map((d) => e.map((f) => {
      const p = String(d[f.key] ?? "");
      return p.includes(";") || p.includes('"') ? `"${p.replace(/"/g, '""')}"` : p;
    }).join(";")), s = [i, ...r].join(`
`), n = new Blob([s], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(n), l = document.createElement("a");
    l.href = o, l.download = "export.csv", l.click(), URL.revokeObjectURL(o);
  }
  _exportHtml() {
    const e = this.parseColumns(), t = this.getFilteredData(), i = e.map((d) => `<th>${tt(d.label)}</th>`).join(""), r = t.map((d) => `<tr>${e.map((p) => {
      const m = d[p.key];
      return `<td>${m == null ? "" : tt(String(m))}</td>`;
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
</html>`, n = new Blob([s], { type: "text/html;charset=utf-8;" }), o = URL.createObjectURL(n), l = document.createElement("a");
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
        ${t.map((i) => {
      const r = e.find((o) => o.key === i), s = (r == null ? void 0 : r.label) || i, n = this._getUniqueValues(i);
      return h`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${i}">${s}</label>
              <select
                class="fr-select"
                id="filter-${i}"
                @change="${(o) => this._handleFilter(i, o)}"
              >
                <option value="">Tous</option>
                ${n.map((o) => h`
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
          ${(r = this.export) != null && r.includes("csv") ? h`
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
              ${e.map((i) => {
      var r;
      return h`
                <th scope="col">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${() => this._handleSort(i.key)}"
                    aria-label="Trier par ${i.label}"
                    type="button"
                  >
                    ${i.label}
                    ${((r = this._sort) == null ? void 0 : r.key) === i.key ? h`
                      <span aria-hidden="true">${this._sort.direction === "asc" ? "↑" : "↓"}</span>
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
            ` : t.map((i) => h`
              <tr>
                ${e.map((r) => h`
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
    return h`
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
          ${t.map((i) => h`
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
    const e = this.parseColumns(), t = this._getFilterableColumns(), i = this._getPaginatedData(), r = this._getTotalPages(), s = this.getFilteredData().length;
    return h`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
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
            ${this._searchQuery || Object.values(this._activeFilters).some((n) => n) ? " (filtré)" : ""}
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
}, u(ce, "GouvDatalist"), ce);
k.styles = Tt``;
M([
  c({ type: String })
], k.prototype, "source", void 0);
M([
  c({ type: String })
], k.prototype, "colonnes", void 0);
M([
  c({ type: Boolean })
], k.prototype, "recherche", void 0);
M([
  c({ type: String })
], k.prototype, "filtres", void 0);
M([
  c({ type: String })
], k.prototype, "tri", void 0);
M([
  c({ type: Number })
], k.prototype, "pagination", void 0);
M([
  c({ type: String })
], k.prototype, "export", void 0);
M([
  _()
], k.prototype, "_data", void 0);
M([
  _()
], k.prototype, "_searchQuery", void 0);
M([
  _()
], k.prototype, "_activeFilters", void 0);
M([
  _()
], k.prototype, "_sort", void 0);
M([
  _()
], k.prototype, "_currentPage", void 0);
k = M([
  E("gouv-datalist")
], k);
var I = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, ue;
let N = (ue = class extends Ie($) {
  constructor() {
    super(...arguments), this.source = "", this.cols = 1, this.pagination = 0, this.empty = "Aucun resultat", this.gap = "fr-grid-row--gutters", this.uidField = "", this._data = [], this._currentPage = 1, this._templateContent = "", this._hashScrollDone = !1;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), j("gouv-display"), this._captureTemplate();
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [], this._currentPage = 1, this._hashScrollDone = !1;
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
      const n = this._resolveExpression(e, s.trim(), t);
      return tt(n);
    }), i;
  }
  /** Resout une expression : champ, champ.nested, champ|defaut, $index, $uid */
  _resolveExpression(e, t, i) {
    if (t === "$index")
      return String(i);
    if (t === "$uid")
      return this._getItemUid(e, i);
    let r = t, s = "";
    const n = t.indexOf("|");
    n !== -1 && (r = t.substring(0, n).trim(), s = t.substring(n + 1).trim());
    const o = y(e, r);
    return o == null ? s : String(o);
  }
  // --- Pagination ---
  _getPaginatedData() {
    if (!this.pagination || this.pagination <= 0)
      return this._data;
    const e = (this._currentPage - 1) * this.pagination;
    return this._data.slice(e, e + this.pagination);
  }
  _getTotalPages() {
    return !this.pagination || this.pagination <= 0 ? 1 : Math.ceil(this._data.length / this.pagination);
  }
  _handlePageChange(e) {
    this._currentPage = e;
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
      const i = y(e, this.uidField);
      if (i != null && i !== "")
        return `item-${String(i).replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    }
    return `item-${t}`;
  }
  _renderGrid(e) {
    const t = this._getColClass(), i = this.pagination > 0 ? (this._currentPage - 1) * this.pagination : 0, r = e.map((n, o) => {
      const l = i + o, d = this._renderItem(n, l), f = this._getItemUid(n, l);
      return `<div class="${t}" id="${f}">${d}</div>`;
    }).join(""), s = `<div class="fr-grid-row ${this.gap}">${r}</div>`;
    return h`<div .innerHTML="${s}"></div>`;
  }
  _renderPagination(e) {
    if (this.pagination <= 0 || e <= 1)
      return "";
    const t = [];
    for (let i = Math.max(1, this._currentPage - 2); i <= Math.min(e, this._currentPage + 2); i++)
      t.push(i);
    return h`
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
          ${t.map((i) => h`
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
              aria-label="Derniere page" type="button">Derniere page</button>
          </li>
        </ul>
      </nav>
    `;
  }
  render() {
    this._templateContent || this._captureTemplate();
    const e = this._getPaginatedData(), t = this._getTotalPages(), i = this._data.length;
    return h`
      <div class="gouv-display" role="region" aria-label="Liste de resultats">
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
        ` : i === 0 ? h`
          <div class="gouv-display__empty" aria-live="polite">
            ${this.empty}
          </div>
        ` : h`
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
}, u(ue, "GouvDisplay"), ue);
I([
  c({ type: String })
], N.prototype, "source", void 0);
I([
  c({ type: Number })
], N.prototype, "cols", void 0);
I([
  c({ type: Number })
], N.prototype, "pagination", void 0);
I([
  c({ type: String })
], N.prototype, "empty", void 0);
I([
  c({ type: String })
], N.prototype, "gap", void 0);
I([
  c({ type: String, attribute: "uid-field" })
], N.prototype, "uidField", void 0);
I([
  _()
], N.prototype, "_data", void 0);
I([
  _()
], N.prototype, "_currentPage", void 0);
N = I([
  E("gouv-display")
], N);
var v = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
};
const mi = {
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
var de;
let b = (de = class extends Ie($) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.codeField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._data = [];
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), j("gouv-dsfr-chart", this.type);
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
      e.push(String(y(r, this.labelField) ?? "N/A")), t.push(Number(y(r, this.valueField)) || 0), this.valueField2 && i.push(Number(y(r, this.valueField2)) || 0);
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
      let r = String(y(i, e) ?? "").trim();
      /^\d+$/.test(r) && r.length < 3 && (r = r.padStart(2, "0"));
      const s = Number(y(i, this.valueField)) || 0;
      (this.type === "map" ? oi(r) : r !== "") && (t[r] = Math.round(s * 100) / 100);
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
    const { x: e, y: t, y2: i, labels: r } = this._processData(), s = {}, n = {};
    switch (this.type) {
      case "gauge": {
        const o = this.gaugeValue ?? (this._data.length > 0 && Number(y(this._data[0], this.valueField)) || 0);
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
          for (const d of this._data) {
            const f = Number(y(d, this.valueField));
            isNaN(f) || (o += f, l++);
          }
          if (l > 0) {
            const d = Math.round(o / l * 100) / 100;
            n.value = String(d);
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
    }[this.type] || this.type, i = this._data.length;
    return `Graphique ${t}, ${i} valeurs`;
  }
  _createChartElement(e, t, i = {}) {
    const r = document.createElement(e);
    for (const [n, o] of Object.entries(t))
      o !== void 0 && o !== "" && r.setAttribute(n, o);
    Object.keys(i).length > 0 && setTimeout(() => {
      for (const [n, o] of Object.entries(i))
        r.setAttribute(n, o);
    }, 500);
    const s = document.createElement("div");
    return s.className = "gouv-dsfr-chart__wrapper", s.setAttribute("role", "img"), s.setAttribute("aria-label", this._getAriaLabel()), s.appendChild(r), s;
  }
  _renderChart() {
    const e = mi[this.type];
    if (!e)
      return h`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const { attrs: t, deferred: i } = this._getTypeSpecificAttributes(), r = {
      ...this._getCommonAttributes(),
      ...t
    }, s = this._createChartElement(e, r, i), n = this.querySelector(".gouv-dsfr-chart__wrapper");
    return n && n.remove(), h`${s}`;
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
}, u(de, "GouvDsfrChart"), de);
v([
  c({ type: String })
], b.prototype, "source", void 0);
v([
  c({ type: String })
], b.prototype, "type", void 0);
v([
  c({ type: String, attribute: "label-field" })
], b.prototype, "labelField", void 0);
v([
  c({ type: String, attribute: "code-field" })
], b.prototype, "codeField", void 0);
v([
  c({ type: String, attribute: "value-field" })
], b.prototype, "valueField", void 0);
v([
  c({ type: String, attribute: "value-field-2" })
], b.prototype, "valueField2", void 0);
v([
  c({ type: String })
], b.prototype, "name", void 0);
v([
  c({ type: String, attribute: "selected-palette" })
], b.prototype, "selectedPalette", void 0);
v([
  c({ type: String, attribute: "unit-tooltip" })
], b.prototype, "unitTooltip", void 0);
v([
  c({ type: String, attribute: "unit-tooltip-bar" })
], b.prototype, "unitTooltipBar", void 0);
v([
  c({ type: Boolean })
], b.prototype, "horizontal", void 0);
v([
  c({ type: Boolean })
], b.prototype, "stacked", void 0);
v([
  c({ type: Boolean })
], b.prototype, "fill", void 0);
v([
  c({ type: String, attribute: "highlight-index" })
], b.prototype, "highlightIndex", void 0);
v([
  c({ type: String, attribute: "x-min" })
], b.prototype, "xMin", void 0);
v([
  c({ type: String, attribute: "x-max" })
], b.prototype, "xMax", void 0);
v([
  c({ type: String, attribute: "y-min" })
], b.prototype, "yMin", void 0);
v([
  c({ type: String, attribute: "y-max" })
], b.prototype, "yMax", void 0);
v([
  c({ type: Number, attribute: "gauge-value" })
], b.prototype, "gaugeValue", void 0);
v([
  c({ type: String, attribute: "map-highlight" })
], b.prototype, "mapHighlight", void 0);
v([
  _()
], b.prototype, "_data", void 0);
b = v([
  E("gouv-dsfr-chart")
], b);
var Be = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, he;
let De = (he = class extends $ {
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
    return h`
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
                        Favoris${this._favCount > 0 ? h` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>` : g}
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
    `;
  }
}, u(he, "AppHeader"), he);
Be([
  c({ type: String, attribute: "current-page" })
], De.prototype, "currentPage", void 0);
Be([
  c({ type: String, attribute: "base-path" })
], De.prototype, "basePath", void 0);
Be([
  _()
], De.prototype, "_favCount", void 0);
De = Be([
  E("app-header")
], De);
var It = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, pe;
let it = (pe = class extends $ {
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
}, u(pe, "AppFooter"), pe);
It([
  c({ type: String, attribute: "base-path" })
], it.prototype, "basePath", void 0);
it = It([
  E("app-footer")
], it);
var we = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, fe;
let Z = (fe = class extends $ {
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
}, u(fe, "AppLayoutBuilder"), fe);
we([
  c({ type: Number, attribute: "left-ratio" })
], Z.prototype, "leftRatio", void 0);
we([
  c({ type: Number, attribute: "min-left-width" })
], Z.prototype, "minLeftWidth", void 0);
we([
  c({ type: Number, attribute: "min-right-width" })
], Z.prototype, "minRightWidth", void 0);
we([
  _()
], Z.prototype, "_isResizing", void 0);
we([
  _()
], Z.prototype, "_currentLeftRatio", void 0);
Z = we([
  E("app-layout-builder")
], Z);
var Fe = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, ge;
let $e = (ge = class extends $ {
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
      return h`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${s}"
                  aria-controls="${r}">
            ${e.label}
          </button>
          <div class="fr-collapse ${s ? "fr-collapse--expanded" : ""}" id="${r}">
            <ul class="fr-sidemenu__list">
              ${e.children.map((n) => this._renderMenuItem(n))}
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
      const i = e[0] === "components" ? "Composants gouv-widgets" : "Composants dsfr-charts";
      t.push({ label: i, href: "#" });
    }
    return t.push({ label: this.title, href: "" }), h`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((i, r) => h`
              <li>
                ${r === t.length - 1 ? h`<a class="fr-breadcrumb__link" aria-current="page">${i.label}</a>` : h`<a class="fr-breadcrumb__link" href="${i.href}">${i.label}</a>`}
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
}, u(ge, "AppLayoutDemo"), ge);
Fe([
  c({ type: String })
], $e.prototype, "title", void 0);
Fe([
  c({ type: String })
], $e.prototype, "icon", void 0);
Fe([
  c({ type: String, attribute: "active-path" })
], $e.prototype, "activePath", void 0);
Fe([
  c({ type: String, attribute: "base-path" })
], $e.prototype, "basePath", void 0);
$e = Fe([
  E("app-layout-demo")
], $e);
var Y = function(a, e, t, i) {
  var r = arguments.length, s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(a, e, t, i);
  else for (var o = a.length - 1; o >= 0; o--) (n = a[o]) && (s = (r < 3 ? n(s) : r > 3 ? n(e, t, s) : n(e, t)) || s);
  return r > 3 && s && Object.defineProperty(e, t, s), s;
}, _e;
let G = (_e = class extends $ {
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
            ${i || "Code"}
          </button>
          ${this.showDataTab ? h`
            <button
              class="preview-panel-tab ${this._activeTab === "data" ? "active" : ""}"
              data-tab="data"
              @click="${() => this._handleTabClick("data")}">
              ${r || "Données"}
            </button>
          ` : g}
          ${this.showPlaygroundButton ? h`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          ` : g}
          ${this.showSaveButton ? h`
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
}, u(_e, "AppPreviewPanel"), _e);
Y([
  c({ type: Boolean, attribute: "show-data-tab" })
], G.prototype, "showDataTab", void 0);
Y([
  c({ type: Boolean, attribute: "show-save-button" })
], G.prototype, "showSaveButton", void 0);
Y([
  c({ type: Boolean, attribute: "show-playground-button" })
], G.prototype, "showPlaygroundButton", void 0);
Y([
  c({ type: String, attribute: "tab-labels" })
], G.prototype, "tabLabels", void 0);
Y([
  c({ type: String, attribute: "active-tab" })
], G.prototype, "activeTab", void 0);
Y([
  _()
], G.prototype, "_activeTab", void 0);
G = Y([
  E("app-preview-panel")
], G);
function bi(a, e, t) {
  return a.map((i) => ({
    label: String(y(i, e) ?? "N/A"),
    value: Number(y(i, t)) || 0
  }));
}
u(bi, "extractLabelValues");
function vi(a, e) {
  if (e === "none")
    return a;
  const t = /* @__PURE__ */ new Map();
  for (const r of a) {
    const s = t.get(r.label) || [];
    s.push(r.value), t.set(r.label, s);
  }
  const i = [];
  for (const [r, s] of t)
    i.push({ label: r, value: yi(s, e) });
  return i;
}
u(vi, "aggregateByLabel");
function yi(a, e) {
  switch (e) {
    case "sum":
      return a.reduce((t, i) => t + i, 0);
    case "avg":
      return a.reduce((t, i) => t + i, 0) / a.length;
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
u(yi, "computeGroupValue");
function $i(a, e) {
  return e === "none" ? a : [...a].sort((t, i) => e === "desc" ? i.value - t.value : t.value - i.value);
}
u($i, "sortByValue");
function Ai(a, e, t, i = "none", r = "none", s = 0) {
  if (!a || a.length === 0)
    return { labels: [], values: [] };
  let n = bi(a, e, t);
  return n = vi(n, i), n = $i(n, r), s > 0 && (n = n.slice(0, s)), {
    labels: n.map((o) => o.label),
    values: n.map((o) => Math.round(o.value * 100) / 100)
  };
}
u(Ai, "processChartData");
export {
  it as AppFooter,
  De as AppHeader,
  Z as AppLayoutBuilder,
  $e as AppLayoutDemo,
  z as DATA_EVENTS,
  k as GouvDatalist,
  N as GouvDisplay,
  b as GouvDsfrChart,
  S as GouvFacets,
  R as GouvKpi,
  O as GouvNormalize,
  w as GouvQuery,
  A as GouvSearch,
  F as GouvSource,
  Ie as SourceSubscriberMixin,
  vi as aggregateByLabel,
  Rt as computeAggregation,
  V as dispatchDataError,
  K as dispatchDataLoaded,
  H as dispatchDataLoading,
  bi as extractLabelValues,
  pi as formatCurrency,
  Ci as formatDate,
  Dt as formatNumber,
  hi as formatPercentage,
  Et as formatValue,
  y as getByPath,
  xi as getByPathOrDefault,
  ye as getDataCache,
  Si as hasPath,
  _i as parseExpression,
  Ai as processChartData,
  $i as sortByValue,
  Me as subscribeToSource
};
