/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = globalThis, pe = te.ShadowRoot && (te.ShadyCSS === void 0 || te.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, fe = Symbol(), me = /* @__PURE__ */ new WeakMap();
let Ne = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== fe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (pe && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const He = (n) => new Ne(typeof n == "string" ? n : n + "", void 0, fe), Le = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((r, i, s) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[s + 1], n[0]);
  return new Ne(t, n, fe);
}, qe = (n, e) => {
  if (pe) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = te.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
  }
}, ye = pe ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return He(t);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ve, defineProperty: Be, getOwnPropertyDescriptor: Ge, getOwnPropertyNames: We, getOwnPropertySymbols: Je, getPrototypeOf: Qe } = Object, D = globalThis, $e = D.trustedTypes, Ke = $e ? $e.emptyScript : "", le = D.reactiveElementPolyfillSupport, G = (n, e) => n, re = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? Ke : null;
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
} }, be = (n, e) => !Ve(n, e), xe = { attribute: !0, type: String, converter: re, reflect: !1, useDefault: !1, hasChanged: be };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), D.litPropertyMetadata ?? (D.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = xe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Be(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: s } = Ge(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? xe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(G("elementProperties"))) return;
    const e = Qe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(G("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(G("properties"))) {
      const t = this.properties, r = [...We(t), ...Je(t)];
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
      for (const i of r) t.unshift(ye(i));
    } else e !== void 0 && t.push(ye(e));
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
    return qe(e, this.constructor.elementStyles), e;
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
      const a = (((s = r.converter) == null ? void 0 : s.toAttribute) !== void 0 ? r.converter : re).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, a;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? o.converter : re;
      this._$Em = i;
      const u = l.fromAttribute(t, o.type);
      this[i] = u ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, s) {
    var a;
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (s = this[e]), r ?? (r = o.getPropertyOptions(e)), !((r.hasChanged ?? be)(s, t) || r.useDefault && r.reflect && s === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, r)))) return;
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
};
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[G("elementProperties")] = /* @__PURE__ */ new Map(), U[G("finalized")] = /* @__PURE__ */ new Map(), le == null || le({ ReactiveElement: U }), (D.reactiveElementVersions ?? (D.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, we = (n) => n, ie = W.trustedTypes, Ce = ie ? ie.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Fe = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, je = "?" + O, Ze = `<${je}>`, F = document, J = () => F.createComment(""), Q = (n) => n === null || typeof n != "object" && typeof n != "function", _e = Array.isArray, Xe = (n) => _e(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", ce = `[ 	
\f\r]`, B = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ae = /-->/g, Se = />/g, T = RegExp(`>|${ce}(?:([^\\s"'>=/]+)(${ce}*=${ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ee = /'/g, Re = /"/g, Ue = /^(?:script|style|textarea|title)$/i, Ye = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), d = Ye(1), z = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), Pe = /* @__PURE__ */ new WeakMap(), N = F.createTreeWalker(F, 129);
function ze(n, e) {
  if (!_e(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ce !== void 0 ? Ce.createHTML(e) : e;
}
const et = (n, e) => {
  const t = n.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = B;
  for (let o = 0; o < t; o++) {
    const l = n[o];
    let u, b, h = -1, _ = 0;
    for (; _ < l.length && (a.lastIndex = _, b = a.exec(l), b !== null); ) _ = a.lastIndex, a === B ? b[1] === "!--" ? a = Ae : b[1] !== void 0 ? a = Se : b[2] !== void 0 ? (Ue.test(b[2]) && (i = RegExp("</" + b[2], "g")), a = T) : b[3] !== void 0 && (a = T) : a === T ? b[0] === ">" ? (a = i ?? B, h = -1) : b[1] === void 0 ? h = -2 : (h = a.lastIndex - b[2].length, u = b[1], a = b[3] === void 0 ? T : b[3] === '"' ? Re : Ee) : a === Re || a === Ee ? a = T : a === Ae || a === Se ? a = B : (a = T, i = void 0);
    const M = a === T && n[o + 1].startsWith("/>") ? " " : "";
    s += a === B ? l + Ze : h >= 0 ? (r.push(u), l.slice(0, h) + Fe + l.slice(h) + O + M) : l + O + (h === -2 ? o : M);
  }
  return [ze(n, s + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class K {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let s = 0, a = 0;
    const o = e.length - 1, l = this.parts, [u, b] = et(e, t);
    if (this.el = K.createElement(u, r), N.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = N.nextNode()) !== null && l.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Fe)) {
          const _ = b[a++], M = i.getAttribute(h).split(O), ee = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: s, name: ee[2], strings: M, ctor: ee[1] === "." ? rt : ee[1] === "?" ? it : ee[1] === "@" ? st : ne }), i.removeAttribute(h);
        } else h.startsWith(O) && (l.push({ type: 6, index: s }), i.removeAttribute(h));
        if (Ue.test(i.tagName)) {
          const h = i.textContent.split(O), _ = h.length - 1;
          if (_ > 0) {
            i.textContent = ie ? ie.emptyScript : "";
            for (let M = 0; M < _; M++) i.append(h[M], J()), N.nextNode(), l.push({ type: 2, index: ++s });
            i.append(h[_], J());
          }
        }
      } else if (i.nodeType === 8) if (i.data === je) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(O, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += O.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const r = F.createElement("template");
    return r.innerHTML = e, r;
  }
}
function I(n, e, t = n, r) {
  var a, o;
  if (e === z) return e;
  let i = r !== void 0 ? (a = t._$Co) == null ? void 0 : a[r] : t._$Cl;
  const s = Q(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((o = i == null ? void 0 : i._$AO) == null || o.call(i, !1), s === void 0 ? i = void 0 : (i = new s(n), i._$AT(n, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = i : t._$Cl = i), i !== void 0 && (e = I(n, i._$AS(n, e.values), i, r)), e;
}
class tt {
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
    const { el: { content: t }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? F).importNode(t, !0);
    N.currentNode = i;
    let s = N.nextNode(), a = 0, o = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new Z(s, s.nextSibling, this, e) : l.type === 1 ? u = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (u = new nt(s, this, e)), this._$AV.push(u), l = r[++o];
      }
      a !== (l == null ? void 0 : l.index) && (s = N.nextNode(), a++);
    }
    return N.currentNode = F, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class Z {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = I(this, e, t), Q(e) ? e === v || e == null || e === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : e !== this._$AH && e !== z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Xe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== v && Q(this._$AH) ? this._$AA.nextSibling.data = e : this.T(F.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = K.createElement(ze(r.h, r.h[0]), this.options)), r);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(t);
    else {
      const a = new tt(i, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Pe.get(e.strings);
    return t === void 0 && Pe.set(e.strings, t = new K(e)), t;
  }
  k(e) {
    _e(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const s of e) i === t.length ? t.push(r = new Z(this.O(J()), this.O(J()), this, this.options)) : r = t[i], r._$AI(s), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = we(e).nextSibling;
      we(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class ne {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, s) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = v;
  }
  _$AI(e, t = this, r, i) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = I(this, e, t, 0), a = !Q(e) || e !== this._$AH && e !== z, a && (this._$AH = e);
    else {
      const o = e;
      let l, u;
      for (e = s[0], l = 0; l < s.length - 1; l++) u = I(this, o[r + l], t, l), u === z && (u = this._$AH[l]), a || (a = !Q(u) || u !== this._$AH[l]), u === v ? e = v : e !== v && (e += (u ?? "") + s[l + 1]), this._$AH[l] = u;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class rt extends ne {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === v ? void 0 : e;
  }
}
class it extends ne {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== v);
  }
}
class st extends ne {
  constructor(e, t, r, i, s) {
    super(e, t, r, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = I(this, e, t, 0) ?? v) === z) return;
    const r = this._$AH, i = e === v && r !== v || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== v && (r === v || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class nt {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    I(this, e);
  }
}
const de = W.litHtmlPolyfillSupport;
de == null || de(K, Z), (W.litHtmlVersions ?? (W.litHtmlVersions = [])).push("3.3.2");
const at = (n, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = i = new Z(e.insertBefore(J(), s), s, void 0, t ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis;
class C extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = at(t, this.renderRoot, this.renderOptions);
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
    return z;
  }
}
var Te;
C._$litElement$ = !0, C.finalized = !0, (Te = L.litElementHydrateSupport) == null || Te.call(L, { LitElement: C });
const ue = L.litElementPolyfillSupport;
ue == null || ue({ LitElement: C });
(L.litElementVersions ?? (L.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = (n) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(n, e);
  }) : customElements.define(n, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = { attribute: !0, type: String, converter: re, reflect: !1, hasChanged: be }, lt = (n = ot, e, t) => {
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
};
function c(n) {
  return (e, t) => typeof t == "object" ? lt(n, e, t) : ((r, i, s) => {
    const a = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), a ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(n, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function g(n) {
  return c({ ...n, state: !0, attribute: !1 });
}
function k(n, e) {
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
function $t(n, e) {
  return k(n, e) !== void 0;
}
function xt(n, e, t) {
  const r = k(n, e);
  return r !== void 0 ? r : t;
}
const P = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading"
}, ge = /* @__PURE__ */ new Map();
function ct(n, e) {
  ge.set(n, e);
}
function ae(n) {
  return ge.get(n);
}
function dt(n) {
  ge.delete(n);
}
function ut(n, e) {
  ct(n, e);
  const t = new CustomEvent(P.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, data: e }
  });
  document.dispatchEvent(t);
}
function ht(n, e) {
  const t = new CustomEvent(P.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, error: e }
  });
  document.dispatchEvent(t);
}
function pt(n) {
  const e = new CustomEvent(P.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n }
  });
  document.dispatchEvent(e);
}
function oe(n, e) {
  const t = (s) => {
    const a = s;
    a.detail.sourceId === n && e.onLoaded && e.onLoaded(a.detail.data);
  }, r = (s) => {
    const a = s;
    a.detail.sourceId === n && e.onError && e.onError(a.detail.error);
  }, i = (s) => {
    s.detail.sourceId === n && e.onLoading && e.onLoading();
  };
  return document.addEventListener(P.LOADED, t), document.addEventListener(P.ERROR, r), document.addEventListener(P.LOADING, i), () => {
    document.removeEventListener(P.LOADED, t), document.removeEventListener(P.ERROR, r), document.removeEventListener(P.LOADING, i);
  };
}
var R = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
let S = class extends C {
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
    super.connectedCallback(), this._fetchData(), this._setupRefresh();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && dt(this.id);
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
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, pt(this.id);
      try {
        const e = this._buildUrl(), t = this._buildFetchOptions(), r = await fetch(e, {
          ...t,
          signal: this._abortController.signal
        });
        if (!r.ok)
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        const i = await r.json();
        this._data = this.transform ? k(i, this.transform) : i, ut(this.id, this._data);
      } catch (e) {
        if (e.name === "AbortError")
          return;
        this._error = e, ht(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, e);
      } finally {
        this._loading = !1;
      }
    }
  }
  _buildUrl() {
    const e = new URL(this.url, window.location.origin);
    if (this.params && this.method === "GET")
      try {
        const t = JSON.parse(this.params);
        Object.entries(t).forEach(([r, i]) => {
          e.searchParams.set(r, String(i));
        });
      } catch (t) {
        console.warn("gouv-source: params invalides (JSON attendu)", t);
      }
    return e.toString();
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
};
R([
  c({ type: String })
], S.prototype, "url", void 0);
R([
  c({ type: String })
], S.prototype, "method", void 0);
R([
  c({ type: String })
], S.prototype, "headers", void 0);
R([
  c({ type: String })
], S.prototype, "params", void 0);
R([
  c({ type: Number })
], S.prototype, "refresh", void 0);
R([
  c({ type: String })
], S.prototype, "transform", void 0);
R([
  g()
], S.prototype, "_loading", void 0);
R([
  g()
], S.prototype, "_error", void 0);
R([
  g()
], S.prototype, "_data", void 0);
S = R([
  E("gouv-source")
], S);
function ke(n, e = "nombre") {
  if (n == null || n === "")
    return "—";
  const t = typeof n == "string" ? parseFloat(n) : n;
  if (isNaN(t))
    return "—";
  switch (e) {
    case "nombre":
      return Me(t);
    case "pourcentage":
      return ft(t);
    case "euro":
      return bt(t);
    case "decimal":
      return _t(t);
    default:
      return Me(t);
  }
}
function Me(n) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(n));
}
function ft(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(n / 100);
}
function bt(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n);
}
function _t(n) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(n);
}
function Ct(n) {
  const e = typeof n == "string" ? new Date(n) : n;
  return isNaN(e.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(e);
}
function gt(n, e, t) {
  return e !== void 0 && n >= e ? "vert" : t !== void 0 && n >= t ? "orange" : e !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
function vt(n) {
  const e = n.split(":");
  if (e.length === 1)
    return { type: "direct", field: e[0] };
  const t = e[0], r = e[1];
  if (e.length === 3) {
    let i = e[2];
    return i === "true" ? i = !0 : i === "false" ? i = !1 : isNaN(Number(i)) || (i = Number(i)), { type: t, field: r, filterField: r, filterValue: i };
  }
  return { type: t, field: r };
}
function Oe(n, e) {
  const t = vt(e);
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
var A = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
let $ = class extends C {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "", this._loading = !1, this._data = null, this._error = null, this._unsubscribe = null;
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this._subscribeToSource();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null);
  }
  updated(e) {
    e.has("source") && this._subscribeToSource();
  }
  _subscribeToSource() {
    if (this._unsubscribe && this._unsubscribe(), !this.source)
      return;
    const e = ae(this.source);
    e !== void 0 && (this._data = e), this._unsubscribe = oe(this.source, {
      onLoaded: (t) => {
        this._data = t, this._loading = !1, this._error = null;
      },
      onLoading: () => {
        this._loading = !0;
      },
      onError: (t) => {
        this._error = t, this._loading = !1;
      }
    });
  }
  _computeValue() {
    return !this._data || !this.valeur ? null : Oe(this._data, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const e = this._computeValue();
    return typeof e != "number" ? "bleu" : gt(e, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._data)
      return null;
    const e = Oe(this._data, this.tendance);
    return typeof e != "number" ? null : {
      value: e,
      direction: e > 0 ? "up" : e < 0 ? "down" : "stable"
    };
  }
  _getColorClass() {
    const e = this._getColor(), t = {
      vert: "gouv-kpi--success",
      orange: "gouv-kpi--warning",
      rouge: "gouv-kpi--error",
      bleu: "gouv-kpi--info"
    };
    return t[e] || t.bleu;
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const e = this._computeValue(), t = ke(e, this.format);
    return `${this.label}: ${t}`;
  }
  render() {
    const e = this._computeValue(), t = ke(e, this.format), r = this._getColorClass(), i = this._getTendanceInfo();
    return d`
      <div
        class="gouv-kpi ${r}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._loading ? d`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._error ? d`
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
    `;
  }
};
$.styles = Le`
    /* Styles injectés via Light DOM, utilise les classes DSFR */
  `;
A([
  c({ type: String })
], $.prototype, "source", void 0);
A([
  c({ type: String })
], $.prototype, "valeur", void 0);
A([
  c({ type: String })
], $.prototype, "label", void 0);
A([
  c({ type: String })
], $.prototype, "description", void 0);
A([
  c({ type: String })
], $.prototype, "icone", void 0);
A([
  c({ type: String })
], $.prototype, "format", void 0);
A([
  c({ type: String })
], $.prototype, "tendance", void 0);
A([
  c({ type: Number, attribute: "seuil-vert" })
], $.prototype, "seuilVert", void 0);
A([
  c({ type: Number, attribute: "seuil-orange" })
], $.prototype, "seuilOrange", void 0);
A([
  c({ type: String })
], $.prototype, "couleur", void 0);
A([
  g()
], $.prototype, "_loading", void 0);
A([
  g()
], $.prototype, "_data", void 0);
A([
  g()
], $.prototype, "_error", void 0);
$ = A([
  E("gouv-kpi")
], $);
var w = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
let m = class extends C {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this._loading = !1, this._data = [], this._error = null, this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1, this._unsubscribe = null;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this._initSort(), this._subscribeToSource();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && this._unsubscribe();
  }
  updated(e) {
    e.has("source") && this._subscribeToSource(), e.has("tri") && this._initSort();
  }
  _initSort() {
    if (this.tri) {
      const [e, t] = this.tri.split(":");
      this._sort = { key: e, direction: t || "asc" };
    }
  }
  _subscribeToSource() {
    if (this._unsubscribe && this._unsubscribe(), !this.source)
      return;
    const e = ae(this.source);
    Array.isArray(e) && (this._data = e), this._unsubscribe = oe(this.source, {
      onLoaded: (t) => {
        this._data = Array.isArray(t) ? t : [], this._loading = !1, this._error = null, this._currentPage = 1;
      },
      onLoading: () => {
        this._loading = !0;
      },
      onError: (t) => {
        this._error = t, this._loading = !1;
      }
    });
  }
  _parseColumns() {
    return this.colonnes ? this.colonnes.split(",").map((e) => {
      const [t, r] = e.trim().split(":");
      return { key: t.trim(), label: (r == null ? void 0 : r.trim()) || t.trim() };
    }) : [];
  }
  _getFilterableColumns() {
    return this.filtres ? this.filtres.split(",").map((e) => e.trim()) : [];
  }
  _getUniqueValues(e) {
    const t = /* @__PURE__ */ new Set();
    return this._data.forEach((r) => {
      const i = r[e];
      i != null && t.add(String(i));
    }), Array.from(t).sort();
  }
  _getFilteredData() {
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
    const e = this._getFilteredData();
    if (!this.pagination || this.pagination <= 0)
      return e;
    const t = (this._currentPage - 1) * this.pagination;
    return e.slice(t, t + this.pagination);
  }
  _getTotalPages() {
    return !this.pagination || this.pagination <= 0 ? 1 : Math.ceil(this._getFilteredData().length / this.pagination);
  }
  _handleSearch(e) {
    const t = e.target;
    this._searchQuery = t.value, this._currentPage = 1;
  }
  _handleFilter(e, t) {
    const r = t.target;
    this._activeFilters = { ...this._activeFilters, [e]: r.value }, this._currentPage = 1;
  }
  _handleSort(e) {
    var t;
    ((t = this._sort) == null ? void 0 : t.key) === e ? this._sort = {
      key: e,
      direction: this._sort.direction === "asc" ? "desc" : "asc"
    } : this._sort = { key: e, direction: "asc" };
  }
  _handlePageChange(e) {
    this._currentPage = e;
  }
  _exportCsv() {
    const e = this._parseColumns(), t = this._getFilteredData(), r = e.map((u) => u.label).join(";"), i = t.map((u) => e.map((b) => {
      const h = u[b.key], _ = String(h ?? "");
      return _.includes(";") || _.includes('"') ? `"${_.replace(/"/g, '""')}"` : _;
    }).join(";")), s = [r, ...i].join(`
`), a = new Blob([s], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(a), l = document.createElement("a");
    l.href = o, l.download = "export.csv", l.click(), URL.revokeObjectURL(o);
  }
  _formatCellValue(e) {
    return e == null ? "—" : typeof e == "boolean" ? e ? "Oui" : "Non" : String(e);
  }
  render() {
    var a, o;
    const e = this._parseColumns(), t = this._getFilterableColumns(), r = this._getPaginatedData(), i = this._getTotalPages(), s = this._getFilteredData().length;
    return d`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        <!-- Filtres -->
        ${t.length > 0 ? d`
          <div class="gouv-datalist__filters">
            ${t.map((l) => {
      const u = e.find((_) => _.key === l), b = (u == null ? void 0 : u.label) || l, h = this._getUniqueValues(l);
      return d`
                <div class="fr-select-group">
                  <label class="fr-label" for="filter-${l}">${b}</label>
                  <select
                    class="fr-select"
                    id="filter-${l}"
                    @change="${(_) => this._handleFilter(l, _)}"
                  >
                    <option value="">Tous</option>
                    ${h.map((_) => d`
                      <option value="${_}" ?selected="${this._activeFilters[l] === _}">${_}</option>
                    `)}
                  </select>
                </div>
              `;
    })}
          </div>
        ` : ""}

        <!-- Barre de recherche et export -->
        ${this.recherche || (a = this.export) != null && a.includes("csv") ? d`
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

            ${(o = this.export) != null && o.includes("csv") ? d`
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
        ` : ""}

        <!-- État de chargement -->
        ${this._loading ? d`
          <div class="gouv-datalist__loading" aria-live="polite">
            Chargement des données...
          </div>
        ` : this._error ? d`
          <div class="gouv-datalist__error" aria-live="assertive">
            Erreur: ${this._error.message}
          </div>
        ` : d`
          <!-- Compteur de résultats -->
          <p class="fr-text--sm" aria-live="polite">
            ${s} résultat${s > 1 ? "s" : ""}
            ${this._searchQuery || Object.values(this._activeFilters).some((l) => l) ? " (filtré)" : ""}
          </p>

          <!-- Tableau -->
          <div class="fr-table fr-table--bordered">
            <table>
              <caption class="fr-sr-only">Liste des données</caption>
              <thead>
                <tr>
                  ${e.map((l) => {
      var u;
      return d`
                    <th scope="col">
                      <button
                        class="gouv-datalist__sort-btn"
                        @click="${() => this._handleSort(l.key)}"
                        aria-label="Trier par ${l.label}"
                        type="button"
                      >
                        ${l.label}
                        ${((u = this._sort) == null ? void 0 : u.key) === l.key ? d`
                          <span aria-hidden="true">${this._sort.direction === "asc" ? "↑" : "↓"}</span>
                        ` : ""}
                      </button>
                    </th>
                  `;
    })}
                </tr>
              </thead>
              <tbody>
                ${r.length === 0 ? d`
                  <tr>
                    <td colspan="${e.length}" class="gouv-datalist__empty">
                      Aucune donnée à afficher
                    </td>
                  </tr>
                ` : r.map((l) => d`
                  <tr>
                    ${e.map((u) => d`
                      <td>${this._formatCellValue(l[u.key])}</td>
                    `)}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          ${this.pagination > 0 && i > 1 ? d`
            <nav class="fr-pagination" aria-label="Pagination">
              <ul class="fr-pagination__list">
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--first"
                    ?disabled="${this._currentPage === 1}"
                    @click="${() => this._handlePageChange(1)}"
                    aria-label="Première page"
                    type="button"
                  >
                    Première page
                  </button>
                </li>
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--prev"
                    ?disabled="${this._currentPage === 1}"
                    @click="${() => this._handlePageChange(this._currentPage - 1)}"
                    aria-label="Page précédente"
                    type="button"
                  >
                    Page précédente
                  </button>
                </li>
                ${this._renderPageNumbers(i)}
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--next"
                    ?disabled="${this._currentPage === i}"
                    @click="${() => this._handlePageChange(this._currentPage + 1)}"
                    aria-label="Page suivante"
                    type="button"
                  >
                    Page suivante
                  </button>
                </li>
                <li>
                  <button
                    class="fr-pagination__link fr-pagination__link--last"
                    ?disabled="${this._currentPage === i}"
                    @click="${() => this._handlePageChange(i)}"
                    aria-label="Dernière page"
                    type="button"
                  >
                    Dernière page
                  </button>
                </li>
              </ul>
            </nav>
          ` : ""}
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
    `;
  }
  _renderPageNumbers(e) {
    const t = [], r = this._currentPage;
    for (let i = Math.max(1, r - 2); i <= Math.min(e, r + 2); i++)
      t.push(i);
    return t.map((i) => d`
      <li>
        <button
          class="fr-pagination__link ${i === r ? "fr-pagination__link--active" : ""}"
          @click="${() => this._handlePageChange(i)}"
          aria-current="${i === r ? "page" : "false"}"
          type="button"
        >
          ${i}
        </button>
      </li>
    `);
  }
};
m.styles = Le``;
w([
  c({ type: String })
], m.prototype, "source", void 0);
w([
  c({ type: String })
], m.prototype, "colonnes", void 0);
w([
  c({ type: Boolean })
], m.prototype, "recherche", void 0);
w([
  c({ type: String })
], m.prototype, "filtres", void 0);
w([
  c({ type: String })
], m.prototype, "tri", void 0);
w([
  c({ type: Number })
], m.prototype, "pagination", void 0);
w([
  c({ type: String })
], m.prototype, "export", void 0);
w([
  g()
], m.prototype, "_loading", void 0);
w([
  g()
], m.prototype, "_data", void 0);
w([
  g()
], m.prototype, "_error", void 0);
w([
  g()
], m.prototype, "_searchQuery", void 0);
w([
  g()
], m.prototype, "_activeFilters", void 0);
w([
  g()
], m.prototype, "_sort", void 0);
w([
  g()
], m.prototype, "_currentPage", void 0);
m = w([
  E("gouv-datalist")
], m);
var x = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
const De = [
  "#000091",
  // Bleu France
  "#009081",
  // Emeraude
  "#A558A0",
  // Glycine
  "#C9191E",
  // Marianne
  "#E4794A",
  // Tuile
  "#FFD1A1",
  // Mandarine
  "#68A532",
  // Bourgeon
  "#5770BE"
  // Archipel
];
let y = class extends C {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.indexAxis = "x", this.labelField = "", this.valueField = "", this.aggregation = "none", this.limit = 0, this.sortOrder = "desc", this.title = "", this.subtitle = "", this.color = "#000091", this.height = 350, this._loading = !1, this._data = [], this._error = null, this._chartInstance = null, this._unsubscribe = null, this._canvasId = `gouv-chart-${Math.random().toString(36).substr(2, 9)}`;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this._subscribeToSource();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._destroyChart();
  }
  updated(e) {
    e.has("source") && this._subscribeToSource(), ["type", "indexAxis", "labelField", "valueField", "aggregation", "limit", "sortOrder", "title", "subtitle", "color", "height"].some((i) => e.has(i)) && this._data.length > 0 && this._renderChart();
  }
  _subscribeToSource() {
    if (this._unsubscribe && this._unsubscribe(), !this.source)
      return;
    const e = ae(this.source);
    e !== void 0 && Array.isArray(e) && (this._data = e, this.updateComplete.then(() => this._renderChart())), this._unsubscribe = oe(this.source, {
      onLoaded: (t) => {
        this._data = Array.isArray(t) ? t : [], this._loading = !1, this._error = null, this.updateComplete.then(() => this._renderChart());
      },
      onLoading: () => {
        this._loading = !0;
      },
      onError: (t) => {
        this._error = t, this._loading = !1;
      }
    });
  }
  _processData() {
    if (!this._data || !Array.isArray(this._data) || this._data.length === 0)
      return { labels: [], values: [] };
    let e = this._data.map((t) => ({
      label: String(k(t, this.labelField) ?? "N/A"),
      value: Number(k(t, this.valueField)) || 0
    }));
    return this.aggregation !== "none" && (e = this._aggregate(e)), this.sortOrder !== "none" && e.sort((t, r) => this.sortOrder === "desc" ? r.value - t.value : t.value - r.value), this.limit > 0 && (e = e.slice(0, this.limit)), {
      labels: e.map((t) => t.label),
      values: e.map((t) => Math.round(t.value * 100) / 100)
    };
  }
  _aggregate(e) {
    const t = /* @__PURE__ */ new Map();
    for (const i of e) {
      const s = t.get(i.label) || [];
      s.push(i.value), t.set(i.label, s);
    }
    const r = [];
    for (const [i, s] of t) {
      let a;
      switch (this.aggregation) {
        case "sum":
          a = s.reduce((o, l) => o + l, 0);
          break;
        case "avg":
          a = s.reduce((o, l) => o + l, 0) / s.length;
          break;
        case "count":
          a = s.length;
          break;
        case "min":
          a = Math.min(...s);
          break;
        case "max":
          a = Math.max(...s);
          break;
        default:
          a = s[0] || 0;
      }
      r.push({ label: i, value: a });
    }
    return r;
  }
  _destroyChart() {
    this._chartInstance && (this._chartInstance.destroy(), this._chartInstance = null);
  }
  _renderChart() {
    const e = this.querySelector(`#${this._canvasId}`);
    if (!e)
      return;
    if (typeof Chart > "u") {
      console.error("gouv-chart: Chart.js non chargé");
      return;
    }
    this._destroyChart();
    const { labels: t, values: r } = this._processData();
    if (t.length === 0)
      return;
    const i = e.getContext("2d");
    if (!i)
      return;
    const s = ["pie", "doughnut", "radar"].includes(this.type), a = s ? t.map((l, u) => De[u % De.length]) : this.color, o = {
      type: this.type === "radar" ? "radar" : this.type,
      data: {
        labels: t,
        datasets: [{
          label: this.valueField.split(".").pop() || "Valeur",
          data: r,
          backgroundColor: a,
          borderColor: s ? a : this.color,
          borderWidth: this.type === "line" ? 2 : 1
        }]
      },
      options: {
        responsive: !0,
        maintainAspectRatio: !1,
        indexAxis: this.type === "bar" ? this.indexAxis : void 0,
        plugins: {
          title: {
            display: !!this.title,
            text: this.title,
            font: { size: 16, weight: "bold" }
          },
          subtitle: {
            display: !!this.subtitle,
            text: this.subtitle,
            font: { size: 12 }
          },
          legend: {
            display: s,
            position: "bottom"
          }
        },
        scales: ["pie", "doughnut", "radar"].includes(this.type) ? void 0 : {
          y: {
            beginAtZero: !0
          }
        }
      }
    };
    this._chartInstance = new Chart(i, o);
  }
  _getAccessibleTableHtml() {
    const { labels: e, values: t } = this._processData();
    if (e.length === 0)
      return "";
    const r = e.map((i, s) => `<tr><td>${this._escapeHtml(i)}</td><td>${t[s]}</td></tr>`).join("");
    return `
      <table class="fr-table">
        <thead>
          <tr>
            <th>${this.labelField.split(".").pop() || "Label"}</th>
            <th>${this.valueField.split(".").pop() || "Valeur"}</th>
          </tr>
        </thead>
        <tbody>${r}</tbody>
      </table>
    `;
  }
  _escapeHtml(e) {
    const t = document.createElement("div");
    return t.textContent = e, t.innerHTML;
  }
  render() {
    return d`
      <div class="gouv-chart-container" style="height: ${this.height}px;">
        ${this._loading ? d`
          <div class="gouv-chart__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._error ? d`
          <div class="gouv-chart__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement: ${this._error.message}
          </div>
        ` : d`
          <canvas id="${this._canvasId}" role="img" aria-label="${this.title || "Graphique"}"></canvas>
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
    `;
  }
};
x([
  c({ type: String })
], y.prototype, "source", void 0);
x([
  c({ type: String })
], y.prototype, "type", void 0);
x([
  c({ type: String, attribute: "index-axis" })
], y.prototype, "indexAxis", void 0);
x([
  c({ type: String, attribute: "label-field" })
], y.prototype, "labelField", void 0);
x([
  c({ type: String, attribute: "value-field" })
], y.prototype, "valueField", void 0);
x([
  c({ type: String })
], y.prototype, "aggregation", void 0);
x([
  c({ type: Number })
], y.prototype, "limit", void 0);
x([
  c({ type: String, attribute: "sort-order" })
], y.prototype, "sortOrder", void 0);
x([
  c({ type: String })
], y.prototype, "title", void 0);
x([
  c({ type: String })
], y.prototype, "subtitle", void 0);
x([
  c({ type: String })
], y.prototype, "color", void 0);
x([
  c({ type: Number })
], y.prototype, "height", void 0);
x([
  g()
], y.prototype, "_loading", void 0);
x([
  g()
], y.prototype, "_data", void 0);
x([
  g()
], y.prototype, "_error", void 0);
y = x([
  E("gouv-chart")
], y);
var f = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
let p = class extends C {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._loading = !1, this._data = [], this._error = null, this._unsubscribe = null;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this._subscribeToSource();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null);
  }
  updated(e) {
    e.has("source") && this._subscribeToSource();
  }
  _subscribeToSource() {
    if (this._unsubscribe && this._unsubscribe(), !this.source)
      return;
    const e = ae(this.source);
    e !== void 0 && Array.isArray(e) && (this._data = e), this._unsubscribe = oe(this.source, {
      onLoaded: (t) => {
        this._data = Array.isArray(t) ? t : [], this._loading = !1, this._error = null;
      },
      onLoading: () => {
        this._loading = !0;
      },
      onError: (t) => {
        this._error = t, this._loading = !1;
      }
    });
  }
  /**
   * Transforme les données en format DSFR Chart
   * Retourne { x: string, y: string } avec les données JSON stringifiées
   */
  _processData() {
    if (!this._data || !Array.isArray(this._data) || this._data.length === 0)
      return { x: "[[]]", y: "[[]]" };
    const e = [], t = [], r = [];
    for (const o of this._data) {
      const l = k(o, this.labelField), u = k(o, this.valueField);
      if (e.push(String(l ?? "N/A")), t.push(Number(u) || 0), this.valueField2) {
        const b = k(o, this.valueField2);
        r.push(Number(b) || 0);
      }
    }
    const i = JSON.stringify([e]), s = JSON.stringify([t]), a = this.valueField2 ? JSON.stringify([r]) : void 0;
    return { x: i, y: s, y2: a };
  }
  /**
   * Génère les attributs communs pour tous les types de charts
   */
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
  /**
   * Rend le composant DSFR Chart approprié selon le type
   */
  _renderChart() {
    const { x: e, y: t, y2: r } = this._processData(), i = this._getCommonAttributes();
    switch (this.type) {
      case "line":
        return this._createChartElement("line-chart", { x: e, y: t, ...i });
      case "bar":
        return this._createChartElement("bar-chart", {
          x: e,
          y: t,
          ...i,
          ...this.horizontal ? { horizontal: "true" } : {},
          ...this.stacked ? { stacked: "true" } : {},
          ...this.highlightIndex ? { "highlight-index": this.highlightIndex } : {}
        });
      case "pie":
        return this._createChartElement("pie-chart", {
          x: e,
          y: t,
          ...i,
          ...this.fill ? { fill: "true" } : {}
        });
      case "radar":
        return this._createChartElement("radar-chart", { x: e, y: t, ...i });
      case "scatter":
        return this._createChartElement("scatter-chart", { x: e, y: t, ...i });
      case "gauge":
        const s = this.gaugeValue ?? (this._data.length > 0 && Number(k(this._data[0], this.valueField)) || 0);
        return this._createChartElement("gauge-chart", {
          percent: String(Math.round(s)),
          init: "0",
          target: "100",
          ...i
        });
      case "bar-line":
        return this._createChartElement("bar-line-chart", {
          x: e,
          "y-bar": t,
          "y-line": r || t,
          ...i,
          ...this.unitTooltipBar ? { "unit-tooltip-bar": this.unitTooltipBar } : {}
        });
      case "map":
        return this._createChartElement("map-chart", {
          x: e,
          y: t,
          ...i,
          ...this.mapHighlight ? { highlight: this.mapHighlight } : {}
        });
      case "map-reg":
        return this._createChartElement("map-chart-reg", {
          x: e,
          y: t,
          ...i,
          ...this.mapHighlight ? { highlight: this.mapHighlight } : {}
        });
      default:
        return d`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    }
  }
  /**
   * Crée un élément DSFR Chart avec les attributs spécifiés
   */
  _createChartElement(e, t) {
    const r = document.createElement(e);
    for (const [s, a] of Object.entries(t))
      a !== void 0 && a !== "" && r.setAttribute(s, a);
    const i = Object.entries(t).filter(([, s]) => s !== void 0 && s !== "").map(([s, a]) => `${s}='${a.replace(/'/g, "\\'")}'`).join(" ");
    return d`<div class="gouv-dsfr-chart__wrapper" .innerHTML="${`<${e} ${i}></${e}>`}"></div>`;
  }
  render() {
    return this._loading ? d`
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
      ` : this._error ? d`
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
      ` : !this._data || this._data.length === 0 ? d`
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
      ` : this._renderChart();
  }
};
f([
  c({ type: String })
], p.prototype, "source", void 0);
f([
  c({ type: String })
], p.prototype, "type", void 0);
f([
  c({ type: String, attribute: "label-field" })
], p.prototype, "labelField", void 0);
f([
  c({ type: String, attribute: "value-field" })
], p.prototype, "valueField", void 0);
f([
  c({ type: String, attribute: "value-field-2" })
], p.prototype, "valueField2", void 0);
f([
  c({ type: String })
], p.prototype, "name", void 0);
f([
  c({ type: String, attribute: "selected-palette" })
], p.prototype, "selectedPalette", void 0);
f([
  c({ type: String, attribute: "unit-tooltip" })
], p.prototype, "unitTooltip", void 0);
f([
  c({ type: String, attribute: "unit-tooltip-bar" })
], p.prototype, "unitTooltipBar", void 0);
f([
  c({ type: Boolean })
], p.prototype, "horizontal", void 0);
f([
  c({ type: Boolean })
], p.prototype, "stacked", void 0);
f([
  c({ type: Boolean })
], p.prototype, "fill", void 0);
f([
  c({ type: String, attribute: "highlight-index" })
], p.prototype, "highlightIndex", void 0);
f([
  c({ type: String, attribute: "x-min" })
], p.prototype, "xMin", void 0);
f([
  c({ type: String, attribute: "x-max" })
], p.prototype, "xMax", void 0);
f([
  c({ type: String, attribute: "y-min" })
], p.prototype, "yMin", void 0);
f([
  c({ type: String, attribute: "y-max" })
], p.prototype, "yMax", void 0);
f([
  c({ type: Number, attribute: "gauge-value" })
], p.prototype, "gaugeValue", void 0);
f([
  c({ type: String, attribute: "map-highlight" })
], p.prototype, "mapHighlight", void 0);
f([
  g()
], p.prototype, "_loading", void 0);
f([
  g()
], p.prototype, "_data", void 0);
f([
  g()
], p.prototype, "_error", void 0);
p = f([
  E("gouv-dsfr-chart")
], p);
var ve = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
let se = class extends C {
  constructor() {
    super(...arguments), this.currentPage = "", this.basePath = "";
  }
  // Light DOM pour hériter des styles DSFR
  createRenderRoot() {
    return this;
  }
  _getNavItems() {
    return [
      { id: "accueil", label: "Accueil", href: "index.html" },
      { id: "composants", label: "Composants", href: "demo/index.html" },
      { id: "builder", label: "Builder", href: "builder.html" },
      { id: "builder-ia", label: "Builder IA", href: "builderIA.html" },
      { id: "playground", label: "Playground", href: "playground.html" },
      { id: "sources", label: "Sources", href: "sources.html" }
    ];
  }
  render() {
    const e = this._getNavItems();
    return d`
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
                ${e.map((t) => d`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this.basePath}${t.href}"
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
};
ve([
  c({ type: String, attribute: "current-page" })
], se.prototype, "currentPage", void 0);
ve([
  c({ type: String, attribute: "base-path" })
], se.prototype, "basePath", void 0);
se = ve([
  E("app-header")
], se);
var Ie = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
let he = class extends C {
  constructor() {
    super(...arguments), this.basePath = "";
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
    `;
  }
};
Ie([
  c({ type: String, attribute: "base-path" })
], he.prototype, "basePath", void 0);
he = Ie([
  E("app-footer")
], he);
var V = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
let j = class extends C {
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
};
V([
  c({ type: Number, attribute: "left-ratio" })
], j.prototype, "leftRatio", void 0);
V([
  c({ type: Number, attribute: "min-left-width" })
], j.prototype, "minLeftWidth", void 0);
V([
  c({ type: Number, attribute: "min-right-width" })
], j.prototype, "minRightWidth", void 0);
V([
  g()
], j.prototype, "_isResizing", void 0);
V([
  g()
], j.prototype, "_currentLeftRatio", void 0);
j = V([
  E("app-layout-builder")
], j);
var X = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
let H = class extends C {
  constructor() {
    super(...arguments), this.title = "", this.icon = "", this.activePath = "", this.basePath = "", this._contentElements = [], this._contentMoved = !1;
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
             href="${this.basePath}${e.href}"
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
      { label: "Composants", href: `${this.basePath}index.html` }
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
};
X([
  c({ type: String })
], H.prototype, "title", void 0);
X([
  c({ type: String })
], H.prototype, "icon", void 0);
X([
  c({ type: String, attribute: "active-path" })
], H.prototype, "activePath", void 0);
X([
  c({ type: String, attribute: "base-path" })
], H.prototype, "basePath", void 0);
H = X([
  E("app-layout-demo")
], H);
var Y = function(n, e, t, r) {
  var i = arguments.length, s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, e, t, r);
  else for (var o = n.length - 1; o >= 0; o--) (a = n[o]) && (s = (i < 3 ? a(s) : i > 3 ? a(e, t, s) : a(e, t)) || s);
  return i > 3 && s && Object.defineProperty(e, t, s), s;
};
let q = class extends C {
  constructor() {
    super(...arguments), this.showDataTab = !1, this.tabLabels = "Aperçu,Code,Données", this.activeTab = "preview", this._activeTab = "preview", this._previewContent = [], this._codeContent = [], this._dataContent = [], this._contentMoved = !1;
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
          ` : v}
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
};
Y([
  c({ type: Boolean, attribute: "show-data-tab" })
], q.prototype, "showDataTab", void 0);
Y([
  c({ type: String, attribute: "tab-labels" })
], q.prototype, "tabLabels", void 0);
Y([
  c({ type: String, attribute: "active-tab" })
], q.prototype, "activeTab", void 0);
Y([
  g()
], q.prototype, "_activeTab", void 0);
q = Y([
  E("app-preview-panel")
], q);
export {
  he as AppFooter,
  se as AppHeader,
  j as AppLayoutBuilder,
  H as AppLayoutDemo,
  P as DATA_EVENTS,
  y as GouvChart,
  m as GouvDatalist,
  p as GouvDsfrChart,
  $ as GouvKpi,
  S as GouvSource,
  Oe as computeAggregation,
  ht as dispatchDataError,
  ut as dispatchDataLoaded,
  pt as dispatchDataLoading,
  bt as formatCurrency,
  Ct as formatDate,
  Me as formatNumber,
  ft as formatPercentage,
  ke as formatValue,
  k as getByPath,
  xt as getByPathOrDefault,
  ae as getDataCache,
  $t as hasPath,
  vt as parseExpression,
  oe as subscribeToSource
};
