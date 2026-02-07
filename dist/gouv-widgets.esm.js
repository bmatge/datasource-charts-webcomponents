/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = globalThis, he = te.ShadowRoot && (te.ShadyCSS === void 0 || te.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pe = Symbol(), me = /* @__PURE__ */ new WeakMap();
let Ne = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== pe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (he && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const qe = (s) => new Ne(typeof s == "string" ? s : s + "", void 0, pe), Fe = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new Ne(t, s, pe);
}, Be = (s, e) => {
  if (he) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), i = te.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, s.appendChild(r);
  }
}, _e = he ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return qe(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ve, defineProperty: Ge, getOwnPropertyDescriptor: We, getOwnPropertyNames: Je, getOwnPropertySymbols: Qe, getPrototypeOf: Ke } = Object, D = globalThis, ye = D.trustedTypes, Ze = ye ? ye.emptyScript : "", ae = D.reactiveElementPolyfillSupport, W = (s, e) => s, re = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Ze : null;
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
} }, fe = (s, e) => !Ve(s, e), $e = { attribute: !0, type: String, converter: re, reflect: !1, useDefault: !1, hasChanged: fe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), D.litPropertyMetadata ?? (D.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let I = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = $e) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && Ge(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: n } = We(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(e, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? $e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const e = Ke(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const t = this.properties, r = [...Je(t), ...Qe(t)];
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
      for (const i of r) t.unshift(_e(i));
    } else e !== void 0 && t.push(_e(e));
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
    return Be(e, this.constructor.elementStyles), e;
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
      const o = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : re).toAttribute(t, r.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, o;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : re;
      this._$Em = i;
      const h = d.fromAttribute(t, a.type);
      this[i] = h ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, t, r, i = !1, n) {
    var o;
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[e]), r ?? (r = a.getPropertyOptions(e)), !((r.hasChanged ?? fe)(n, t) || r.useDefault && r.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: a } = o, d = this[n];
        a !== !0 || this._$AL.has(n) || d === void 0 || this.C(n, void 0, o, d);
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
};
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[W("elementProperties")] = /* @__PURE__ */ new Map(), I[W("finalized")] = /* @__PURE__ */ new Map(), ae == null || ae({ ReactiveElement: I }), (D.reactiveElementVersions ?? (D.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis, xe = (s) => s, ie = J.trustedTypes, we = ie ? ie.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ue = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, je = "?" + O, Xe = `<${je}>`, U = document, Q = () => U.createComment(""), K = (s) => s === null || typeof s != "object" && typeof s != "function", ve = Array.isArray, Ye = (s) => ve(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", le = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Se = /-->/g, Ae = />/g, L = RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ce = /'/g, Ee = /"/g, ze = /^(?:script|style|textarea|title)$/i, et = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), c = et(1), H = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Pe = /* @__PURE__ */ new WeakMap(), N = U.createTreeWalker(U, 129);
function Ie(s, e) {
  if (!ve(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return we !== void 0 ? we.createHTML(e) : e;
}
const tt = (s, e) => {
  const t = s.length - 1, r = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = G;
  for (let a = 0; a < t; a++) {
    const d = s[a];
    let h, b, u = -1, P = 0;
    for (; P < d.length && (o.lastIndex = P, b = o.exec(d), b !== null); ) P = o.lastIndex, o === G ? b[1] === "!--" ? o = Se : b[1] !== void 0 ? o = Ae : b[2] !== void 0 ? (ze.test(b[2]) && (i = RegExp("</" + b[2], "g")), o = L) : b[3] !== void 0 && (o = L) : o === L ? b[0] === ">" ? (o = i ?? G, u = -1) : b[1] === void 0 ? u = -2 : (u = o.lastIndex - b[2].length, h = b[1], o = b[3] === void 0 ? L : b[3] === '"' ? Ee : Ce) : o === Ee || o === Ce ? o = L : o === Se || o === Ae ? o = G : (o = L, i = void 0);
    const M = o === L && s[a + 1].startsWith("/>") ? " " : "";
    n += o === G ? d + Xe : u >= 0 ? (r.push(h), d.slice(0, u) + Ue + d.slice(u) + O + M) : d + O + (u === -2 ? a : M);
  }
  return [Ie(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Z {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = e.length - 1, d = this.parts, [h, b] = tt(e, t);
    if (this.el = Z.createElement(h, r), N.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = N.nextNode()) !== null && d.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Ue)) {
          const P = b[o++], M = i.getAttribute(u).split(O), ee = /([.?@])?(.*)/.exec(P);
          d.push({ type: 1, index: n, name: ee[2], strings: M, ctor: ee[1] === "." ? it : ee[1] === "?" ? nt : ee[1] === "@" ? st : se }), i.removeAttribute(u);
        } else u.startsWith(O) && (d.push({ type: 6, index: n }), i.removeAttribute(u));
        if (ze.test(i.tagName)) {
          const u = i.textContent.split(O), P = u.length - 1;
          if (P > 0) {
            i.textContent = ie ? ie.emptyScript : "";
            for (let M = 0; M < P; M++) i.append(u[M], Q()), N.nextNode(), d.push({ type: 2, index: ++n });
            i.append(u[P], Q());
          }
        }
      } else if (i.nodeType === 8) if (i.data === je) d.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(O, u + 1)) !== -1; ) d.push({ type: 7, index: n }), u += O.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const r = U.createElement("template");
    return r.innerHTML = e, r;
  }
}
function q(s, e, t = s, r) {
  var o, a;
  if (e === H) return e;
  let i = r !== void 0 ? (o = t._$Co) == null ? void 0 : o[r] : t._$Cl;
  const n = K(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = i : t._$Cl = i), i !== void 0 && (e = q(s, i._$AS(s, e.values), i, r)), e;
}
class rt {
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
    const { el: { content: t }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? U).importNode(t, !0);
    N.currentNode = i;
    let n = N.nextNode(), o = 0, a = 0, d = r[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let h;
        d.type === 2 ? h = new X(n, n.nextSibling, this, e) : d.type === 1 ? h = new d.ctor(n, d.name, d.strings, this, e) : d.type === 6 && (h = new ot(n, this, e)), this._$AV.push(h), d = r[++a];
      }
      o !== (d == null ? void 0 : d.index) && (n = N.nextNode(), o++);
    }
    return N.currentNode = U, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class X {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = q(this, e, t), K(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== H && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ye(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && K(this._$AH) ? this._$AA.nextSibling.data = e : this.T(U.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Z.createElement(Ie(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(t);
    else {
      const o = new rt(i, this), a = o.u(this.options);
      o.p(t), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Pe.get(e.strings);
    return t === void 0 && Pe.set(e.strings, t = new Z(e)), t;
  }
  k(e) {
    ve(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const n of e) i === t.length ? t.push(r = new X(this.O(Q()), this.O(Q()), this, this.options)) : r = t[i], r._$AI(n), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = xe(e).nextSibling;
      xe(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class se {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = f;
  }
  _$AI(e, t = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = q(this, e, t, 0), o = !K(e) || e !== this._$AH && e !== H, o && (this._$AH = e);
    else {
      const a = e;
      let d, h;
      for (e = n[0], d = 0; d < n.length - 1; d++) h = q(this, a[r + d], t, d), h === H && (h = this._$AH[d]), o || (o = !K(h) || h !== this._$AH[d]), h === f ? e = f : e !== f && (e += (h ?? "") + n[d + 1]), this._$AH[d] = h;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class it extends se {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class nt extends se {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class st extends se {
  constructor(e, t, r, i, n) {
    super(e, t, r, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = q(this, e, t, 0) ?? f) === H) return;
    const r = this._$AH, i = e === f && r !== f || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== f && (r === f || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ot {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    q(this, e);
  }
}
const ce = J.litHtmlPolyfillSupport;
ce == null || ce(Z, X), (J.litHtmlVersions ?? (J.litHtmlVersions = [])).push("3.3.2");
const at = (s, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = i = new X(e.insertBefore(Q(), n), n, void 0, t ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis;
class _ extends I {
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
    return H;
  }
}
var Le;
_._$litElement$ = !0, _.finalized = !0, (Le = F.litElementHydrateSupport) == null || Le.call(F, { LitElement: _ });
const de = F.litElementPolyfillSupport;
de == null || de({ LitElement: _ });
(F.litElementVersions ?? (F.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = (s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = { attribute: !0, type: String, converter: re, reflect: !1, hasChanged: fe }, ct = (s = lt, e, t) => {
  const { kind: r, metadata: i } = t;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(t.name, s), r === "accessor") {
    const { name: o } = t;
    return { set(a) {
      const d = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, d, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (r === "setter") {
    const { name: o } = t;
    return function(a) {
      const d = this[o];
      e.call(this, a), this.requestUpdate(o, d, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function l(s) {
  return (e, t) => typeof t == "object" ? ct(s, e, t) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(s) {
  return l({ ...s, state: !0, attribute: !1 });
}
function k(s, e) {
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
function kt(s, e) {
  return k(s, e) !== void 0;
}
function Mt(s, e, t) {
  const r = k(s, e);
  return r !== void 0 ? r : t;
}
const R = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading"
}, be = /* @__PURE__ */ new Map();
function dt(s, e) {
  be.set(s, e);
}
function ut(s) {
  return be.get(s);
}
function ht(s) {
  be.delete(s);
}
function pt(s, e) {
  dt(s, e);
  const t = new CustomEvent(R.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, data: e }
  });
  document.dispatchEvent(t);
}
function ft(s, e) {
  const t = new CustomEvent(R.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, error: e }
  });
  document.dispatchEvent(t);
}
function vt(s) {
  const e = new CustomEvent(R.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s }
  });
  document.dispatchEvent(e);
}
function bt(s, e) {
  const t = (n) => {
    const o = n;
    o.detail.sourceId === s && e.onLoaded && e.onLoaded(o.detail.data);
  }, r = (n) => {
    const o = n;
    o.detail.sourceId === s && e.onError && e.onError(o.detail.error);
  }, i = (n) => {
    n.detail.sourceId === s && e.onLoading && e.onLoading();
  };
  return document.addEventListener(R.LOADED, t), document.addEventListener(R.ERROR, r), document.addEventListener(R.LOADING, i), () => {
    document.removeEventListener(R.LOADED, t), document.removeEventListener(R.ERROR, r), document.removeEventListener(R.LOADING, i);
  };
}
var E = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
let S = class extends _ {
  constructor() {
    super(...arguments), this.url = "", this.method = "GET", this.headers = "", this.params = "", this.refresh = 0, this.transform = "", this._loading = !1, this._error = null, this._data = null, this._refreshInterval = null, this._abortController = null;
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return c``;
  }
  connectedCallback() {
    super.connectedCallback(), this._fetchData(), this._setupRefresh();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && ht(this.id);
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
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, vt(this.id);
      try {
        const e = this._buildUrl(), t = this._buildFetchOptions(), r = await fetch(e, {
          ...t,
          signal: this._abortController.signal
        });
        if (!r.ok)
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        const i = await r.json();
        this._data = this.transform ? k(i, this.transform) : i, pt(this.id, this._data);
      } catch (e) {
        if (e.name === "AbortError")
          return;
        this._error = e, ft(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, e);
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
E([
  l({ type: String })
], S.prototype, "url", void 0);
E([
  l({ type: String })
], S.prototype, "method", void 0);
E([
  l({ type: String })
], S.prototype, "headers", void 0);
E([
  l({ type: String })
], S.prototype, "params", void 0);
E([
  l({ type: Number })
], S.prototype, "refresh", void 0);
E([
  l({ type: String })
], S.prototype, "transform", void 0);
E([
  x()
], S.prototype, "_loading", void 0);
E([
  x()
], S.prototype, "_error", void 0);
E([
  x()
], S.prototype, "_data", void 0);
S = E([
  C("gouv-source")
], S);
function oe(s) {
  class e extends s {
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
      const i = ut(r);
      i !== void 0 && (this._sourceData = i, this.onSourceData(i)), this._unsubscribeSource = bt(r, {
        onLoaded: (n) => {
          this._sourceData = n, this._sourceLoading = !1, this._sourceError = null, this.onSourceData(n), this.requestUpdate();
        },
        onLoading: () => {
          this._sourceLoading = !0, this.requestUpdate();
        },
        onError: (n) => {
          this._sourceError = n, this._sourceLoading = !1, this.requestUpdate();
        }
      });
    }
    _cleanupSubscription() {
      this._unsubscribeSource && (this._unsubscribeSource(), this._unsubscribeSource = null);
    }
  }
  return e;
}
function Re(s, e = "nombre") {
  if (s == null || s === "")
    return "—";
  const t = typeof s == "string" ? parseFloat(s) : s;
  if (isNaN(t))
    return "—";
  switch (e) {
    case "nombre":
      return ke(t);
    case "pourcentage":
      return gt(t);
    case "euro":
      return mt(t);
    case "decimal":
      return _t(t);
    default:
      return ke(t);
  }
}
function ke(s) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(s));
}
function gt(s) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(s / 100);
}
function mt(s) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(s);
}
function _t(s) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(s);
}
function Dt(s) {
  const e = typeof s == "string" ? new Date(s) : s;
  return isNaN(e.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(e);
}
function yt(s, e, t) {
  return e !== void 0 && s >= e ? "vert" : t !== void 0 && s >= t ? "orange" : e !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
function $t(s) {
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
function Me(s, e) {
  const t = $t(e);
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
      return r.reduce((n, o) => {
        const a = Number(o[t.field]);
        return n + (isNaN(a) ? 0 : a);
      }, 0);
    case "avg":
      return r.length === 0 ? null : r.reduce((n, o) => {
        const a = Number(o[t.field]);
        return n + (isNaN(a) ? 0 : a);
      }, 0) / r.length;
    case "min":
      return r.length === 0 ? null : Math.min(...r.map((n) => Number(n[t.field])).filter((n) => !isNaN(n)));
    case "max":
      return r.length === 0 ? null : Math.max(...r.map((n) => Number(n[t.field])).filter((n) => !isNaN(n)));
    default:
      return null;
  }
}
var A = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
const Oe = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
let $ = class extends oe(_) {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "";
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  _computeValue() {
    return !this._sourceData || !this.valeur ? null : Me(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const e = this._computeValue();
    return typeof e != "number" ? "bleu" : yt(e, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const e = Me(this._sourceData, this.tendance);
    return typeof e != "number" ? null : {
      value: e,
      direction: e > 0 ? "up" : e < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const e = this._computeValue(), t = Re(e, this.format);
    return `${this.label}: ${t}`;
  }
  render() {
    const e = this._computeValue(), t = Re(e, this.format), r = Oe[this._getColor()] || Oe.bleu, i = this._getTendanceInfo();
    return c`
      <div
        class="gouv-kpi ${r}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._sourceLoading ? c`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? c`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : c`
          <div class="gouv-kpi__content">
            ${this.icone ? c`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            ` : ""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${t}</span>
              ${i ? c`
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
};
$.styles = Fe``;
A([
  l({ type: String })
], $.prototype, "source", void 0);
A([
  l({ type: String })
], $.prototype, "valeur", void 0);
A([
  l({ type: String })
], $.prototype, "label", void 0);
A([
  l({ type: String })
], $.prototype, "description", void 0);
A([
  l({ type: String })
], $.prototype, "icone", void 0);
A([
  l({ type: String })
], $.prototype, "format", void 0);
A([
  l({ type: String })
], $.prototype, "tendance", void 0);
A([
  l({ type: Number, attribute: "seuil-vert" })
], $.prototype, "seuilVert", void 0);
A([
  l({ type: Number, attribute: "seuil-orange" })
], $.prototype, "seuilOrange", void 0);
A([
  l({ type: String })
], $.prototype, "couleur", void 0);
$ = A([
  C("gouv-kpi")
], $);
var w = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
let g = class extends oe(_) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this._initSort();
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
        const o = i[t], a = n[t];
        if (o === a)
          return 0;
        if (o == null)
          return 1;
        if (a == null)
          return -1;
        const d = typeof o == "number" && typeof a == "number" ? o - a : String(o).localeCompare(String(a), "fr");
        return r === "desc" ? -d : d;
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
    const e = this.parseColumns(), t = this.getFilteredData(), r = e.map((h) => h.label).join(";"), i = t.map((h) => e.map((b) => {
      const u = String(h[b.key] ?? "");
      return u.includes(";") || u.includes('"') ? `"${u.replace(/"/g, '""')}"` : u;
    }).join(";")), n = [r, ...i].join(`
`), o = new Blob([n], { type: "text/csv;charset=utf-8;" }), a = URL.createObjectURL(o), d = document.createElement("a");
    d.href = a, d.download = "export.csv", d.click(), URL.revokeObjectURL(a);
  }
  // --- Cell formatting ---
  formatCellValue(e) {
    return e == null ? "—" : typeof e == "boolean" ? e ? "Oui" : "Non" : String(e);
  }
  // --- Render sub-templates ---
  _renderFilters(e, t) {
    return t.length === 0 ? "" : c`
      <div class="gouv-datalist__filters">
        ${t.map((r) => {
      const i = e.find((a) => a.key === r), n = (i == null ? void 0 : i.label) || r, o = this._getUniqueValues(r);
      return c`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${r}">${n}</label>
              <select
                class="fr-select"
                id="filter-${r}"
                @change="${(a) => this._handleFilter(r, a)}"
              >
                <option value="">Tous</option>
                ${o.map((a) => c`
                  <option value="${a}" ?selected="${this._activeFilters[r] === a}">${a}</option>
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
    return !this.recherche && !((e = this.export) != null && e.includes("csv")) ? "" : c`
      <div class="gouv-datalist__toolbar">
        ${this.recherche ? c`
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
        ` : c`<div></div>`}

        ${(t = this.export) != null && t.includes("csv") ? c`
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
    return c`
      <div class="fr-table fr-table--bordered">
        <table>
          <caption class="fr-sr-only">Liste des données</caption>
          <thead>
            <tr>
              ${e.map((r) => {
      var i;
      return c`
                <th scope="col">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${() => this._handleSort(r.key)}"
                    aria-label="Trier par ${r.label}"
                    type="button"
                  >
                    ${r.label}
                    ${((i = this._sort) == null ? void 0 : i.key) === r.key ? c`
                      <span aria-hidden="true">${this._sort.direction === "asc" ? "↑" : "↓"}</span>
                    ` : ""}
                  </button>
                </th>
              `;
    })}
            </tr>
          </thead>
          <tbody>
            ${t.length === 0 ? c`
              <tr>
                <td colspan="${e.length}" class="gouv-datalist__empty">
                  Aucune donnée à afficher
                </td>
              </tr>
            ` : t.map((r) => c`
              <tr>
                ${e.map((i) => c`
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
    return c`
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
          ${t.map((r) => c`
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
    return c`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        ${this._renderFilters(e, t)}
        ${this._renderToolbar()}

        ${this._sourceLoading ? c`
          <div class="gouv-datalist__loading" aria-live="polite">Chargement des données...</div>
        ` : this._sourceError ? c`
          <div class="gouv-datalist__error" aria-live="assertive">Erreur: ${this._sourceError.message}</div>
        ` : c`
          <p class="fr-text--sm" aria-live="polite">
            ${n} résultat${n > 1 ? "s" : ""}
            ${this._searchQuery || Object.values(this._activeFilters).some((o) => o) ? " (filtré)" : ""}
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
        .gouv-datalist__error { padding: 2rem; text-align: center; }
        .gouv-datalist__error { color: var(--text-default-error); }
        .gouv-datalist__empty { text-align: center; color: var(--text-mention-grey); padding: 2rem !important; }
      </style>
    `;
  }
};
g.styles = Fe``;
w([
  l({ type: String })
], g.prototype, "source", void 0);
w([
  l({ type: String })
], g.prototype, "colonnes", void 0);
w([
  l({ type: Boolean })
], g.prototype, "recherche", void 0);
w([
  l({ type: String })
], g.prototype, "filtres", void 0);
w([
  l({ type: String })
], g.prototype, "tri", void 0);
w([
  l({ type: Number })
], g.prototype, "pagination", void 0);
w([
  l({ type: String })
], g.prototype, "export", void 0);
w([
  x()
], g.prototype, "_data", void 0);
w([
  x()
], g.prototype, "_searchQuery", void 0);
w([
  x()
], g.prototype, "_activeFilters", void 0);
w([
  x()
], g.prototype, "_sort", void 0);
w([
  x()
], g.prototype, "_currentPage", void 0);
g = w([
  C("gouv-datalist")
], g);
function xt(s, e, t) {
  return s.map((r) => ({
    label: String(k(r, e) ?? "N/A"),
    value: Number(k(r, t)) || 0
  }));
}
function wt(s, e) {
  if (e === "none")
    return s;
  const t = /* @__PURE__ */ new Map();
  for (const i of s) {
    const n = t.get(i.label) || [];
    n.push(i.value), t.set(i.label, n);
  }
  const r = [];
  for (const [i, n] of t)
    r.push({ label: i, value: St(n, e) });
  return r;
}
function St(s, e) {
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
function At(s, e) {
  return e === "none" ? s : [...s].sort((t, r) => e === "desc" ? r.value - t.value : t.value - r.value);
}
function Ct(s, e, t, r = "none", i = "none", n = 0) {
  if (!s || s.length === 0)
    return { labels: [], values: [] };
  let o = xt(s, e, t);
  return o = wt(o, r), o = At(o, i), n > 0 && (o = o.slice(0, n)), {
    labels: o.map((a) => a.label),
    values: o.map((a) => Math.round(a.value * 100) / 100)
  };
}
var y = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
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
], Te = /* @__PURE__ */ new Set(["pie", "doughnut", "radar"]);
let m = class extends oe(_) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.indexAxis = "x", this.labelField = "", this.valueField = "", this.aggregation = "none", this.limit = 0, this.sortOrder = "desc", this.title = "", this.subtitle = "", this.color = "#000091", this.height = 350, this._data = [], this._chartInstance = null, this._canvasId = `gouv-chart-${Math.random().toString(36).substr(2, 9)}`;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._destroyChart();
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [], this.updateComplete.then(() => this._renderChart());
  }
  updated(e) {
    super.updated(e), ["type", "indexAxis", "labelField", "valueField", "aggregation", "limit", "sortOrder", "title", "subtitle", "color", "height"].some((i) => e.has(i)) && this._data.length > 0 && this._renderChart();
  }
  _processData() {
    return Ct(this._data, this.labelField, this.valueField, this.aggregation, this.sortOrder, this.limit);
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
    const n = Te.has(this.type), o = n ? t.map((d, h) => De[h % De.length]) : this.color, a = {
      type: this.type,
      data: {
        labels: t,
        datasets: [{
          label: this.valueField.split(".").pop() || "Valeur",
          data: r,
          backgroundColor: o,
          borderColor: n ? o : this.color,
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
            display: n,
            position: "bottom"
          }
        },
        scales: Te.has(this.type) ? void 0 : {
          y: { beginAtZero: !0 }
        }
      }
    };
    this._chartInstance = new Chart(i, a);
  }
  _renderAccessibleTable() {
    const { labels: e, values: t } = this._processData();
    if (e.length === 0)
      return c``;
    const r = this.labelField.split(".").pop() || "Label", i = this.valueField.split(".").pop() || "Valeur";
    return c`
      <table class="fr-table">
        <thead>
          <tr>
            <th>${r}</th>
            <th>${i}</th>
          </tr>
        </thead>
        <tbody>
          ${e.map((n, o) => c`
            <tr><td>${n}</td><td>${t[o]}</td></tr>
          `)}
        </tbody>
      </table>
    `;
  }
  render() {
    return c`
      <div class="gouv-chart-container" style="height: ${this.height}px;">
        ${this._sourceLoading ? c`
          <div class="gouv-chart__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? c`
          <div class="gouv-chart__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement: ${this._sourceError.message}
          </div>
        ` : c`
          <canvas id="${this._canvasId}" role="img" aria-label="${this.title || "Graphique"}"></canvas>
        `}
      </div>

      <!-- Tableau accessible (RGAA) -->
      <details class="fr-accordion fr-mt-2w">
        <summary class="fr-accordion__btn">Données du graphique (tableau accessible)</summary>
        <div class="fr-collapse">${this._renderAccessibleTable()}</div>
      </details>

      <style>
        .gouv-chart-container { position: relative; width: 100%; }
        .gouv-chart__loading,
        .gouv-chart__error {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; height: 100%; color: var(--text-mention-grey, #666); font-size: 0.875rem;
        }
        .gouv-chart__error { color: var(--text-default-error, #ce0500); }
      </style>
    `;
  }
};
y([
  l({ type: String })
], m.prototype, "source", void 0);
y([
  l({ type: String })
], m.prototype, "type", void 0);
y([
  l({ type: String, attribute: "index-axis" })
], m.prototype, "indexAxis", void 0);
y([
  l({ type: String, attribute: "label-field" })
], m.prototype, "labelField", void 0);
y([
  l({ type: String, attribute: "value-field" })
], m.prototype, "valueField", void 0);
y([
  l({ type: String })
], m.prototype, "aggregation", void 0);
y([
  l({ type: Number })
], m.prototype, "limit", void 0);
y([
  l({ type: String, attribute: "sort-order" })
], m.prototype, "sortOrder", void 0);
y([
  l({ type: String })
], m.prototype, "title", void 0);
y([
  l({ type: String })
], m.prototype, "subtitle", void 0);
y([
  l({ type: String })
], m.prototype, "color", void 0);
y([
  l({ type: Number })
], m.prototype, "height", void 0);
y([
  x()
], m.prototype, "_data", void 0);
m = y([
  C("gouv-chart")
], m);
var v = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
const Et = {
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
let p = class extends oe(_) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._data = [];
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
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
      e.push(String(k(i, this.labelField) ?? "N/A")), t.push(Number(k(i, this.valueField)) || 0), this.valueField2 && r.push(Number(k(i, this.valueField2)) || 0);
    return {
      x: JSON.stringify([e]),
      y: JSON.stringify([t]),
      y2: this.valueField2 ? JSON.stringify([r]) : void 0
    };
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
    const { x: e, y: t, y2: r } = this._processData(), i = {};
    switch (this.type) {
      case "gauge": {
        const n = this.gaugeValue ?? (this._data.length > 0 && Number(k(this._data[0], this.valueField)) || 0);
        i.percent = String(Math.round(n)), i.init = "0", i.target = "100";
        break;
      }
      case "bar-line":
        i.x = e, i["y-bar"] = t, i["y-line"] = r || t, this.unitTooltipBar && (i["unit-tooltip-bar"] = this.unitTooltipBar);
        break;
      default:
        i.x = e, i.y = t;
        break;
    }
    return this.type === "bar" && (this.horizontal && (i.horizontal = "true"), this.stacked && (i.stacked = "true"), this.highlightIndex && (i["highlight-index"] = this.highlightIndex)), this.type === "pie" && this.fill && (i.fill = "true"), (this.type === "map" || this.type === "map-reg") && this.mapHighlight && (i.highlight = this.mapHighlight), i;
  }
  /**
   * Crée un élément DSFR Chart via DOM API (pas d'innerHTML)
   */
  _createChartElement(e, t) {
    const r = document.createElement(e);
    for (const [n, o] of Object.entries(t))
      o !== void 0 && o !== "" && r.setAttribute(n, o);
    const i = document.createElement("div");
    return i.className = "gouv-dsfr-chart__wrapper", i.appendChild(r), i;
  }
  _renderChart() {
    const e = Et[this.type];
    if (!e)
      return c`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const t = {
      ...this._getCommonAttributes(),
      ...this._getTypeSpecificAttributes()
    }, r = this._createChartElement(e, t), i = this.querySelector(".gouv-dsfr-chart__wrapper");
    return i && i.remove(), c`${r}`;
  }
  render() {
    return this._sourceLoading ? c`
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
      ` : this._sourceError ? c`
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
      ` : !this._data || this._data.length === 0 ? c`
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
};
v([
  l({ type: String })
], p.prototype, "source", void 0);
v([
  l({ type: String })
], p.prototype, "type", void 0);
v([
  l({ type: String, attribute: "label-field" })
], p.prototype, "labelField", void 0);
v([
  l({ type: String, attribute: "value-field" })
], p.prototype, "valueField", void 0);
v([
  l({ type: String, attribute: "value-field-2" })
], p.prototype, "valueField2", void 0);
v([
  l({ type: String })
], p.prototype, "name", void 0);
v([
  l({ type: String, attribute: "selected-palette" })
], p.prototype, "selectedPalette", void 0);
v([
  l({ type: String, attribute: "unit-tooltip" })
], p.prototype, "unitTooltip", void 0);
v([
  l({ type: String, attribute: "unit-tooltip-bar" })
], p.prototype, "unitTooltipBar", void 0);
v([
  l({ type: Boolean })
], p.prototype, "horizontal", void 0);
v([
  l({ type: Boolean })
], p.prototype, "stacked", void 0);
v([
  l({ type: Boolean })
], p.prototype, "fill", void 0);
v([
  l({ type: String, attribute: "highlight-index" })
], p.prototype, "highlightIndex", void 0);
v([
  l({ type: String, attribute: "x-min" })
], p.prototype, "xMin", void 0);
v([
  l({ type: String, attribute: "x-max" })
], p.prototype, "xMax", void 0);
v([
  l({ type: String, attribute: "y-min" })
], p.prototype, "yMin", void 0);
v([
  l({ type: String, attribute: "y-max" })
], p.prototype, "yMax", void 0);
v([
  l({ type: Number, attribute: "gauge-value" })
], p.prototype, "gaugeValue", void 0);
v([
  l({ type: String, attribute: "map-highlight" })
], p.prototype, "mapHighlight", void 0);
v([
  x()
], p.prototype, "_data", void 0);
p = v([
  C("gouv-dsfr-chart")
], p);
var ge = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
let ne = class extends _ {
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
      { id: "favoris", label: "Favoris", href: "favoris.html" },
      { id: "sources", label: "Sources", href: "sources.html" }
    ];
  }
  render() {
    const e = this._getNavItems();
    return c`
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
                      <a class="fr-btn fr-btn--secondary fr-icon-star-fill" href="${this.basePath}favoris.html">
                        Favoris
                      </a>
                    </li>
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
                ${e.map((t) => c`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this.basePath}${t.href}"
                       ${this.currentPage === t.id ? c`aria-current="page"` : ""}>
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
ge([
  l({ type: String, attribute: "current-page" })
], ne.prototype, "currentPage", void 0);
ge([
  l({ type: String, attribute: "base-path" })
], ne.prototype, "basePath", void 0);
ne = ge([
  C("app-header")
], ne);
var He = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
let ue = class extends _ {
  constructor() {
    super(...arguments), this.basePath = "";
  }
  // Light DOM pour hériter des styles DSFR
  createRenderRoot() {
    return this;
  }
  render() {
    return c`
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
He([
  l({ type: String, attribute: "base-path" })
], ue.prototype, "basePath", void 0);
ue = He([
  C("app-footer")
], ue);
var V = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
let j = class extends _ {
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
    return c`
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
  l({ type: Number, attribute: "left-ratio" })
], j.prototype, "leftRatio", void 0);
V([
  l({ type: Number, attribute: "min-left-width" })
], j.prototype, "minLeftWidth", void 0);
V([
  l({ type: Number, attribute: "min-right-width" })
], j.prototype, "minRightWidth", void 0);
V([
  x()
], j.prototype, "_isResizing", void 0);
V([
  x()
], j.prototype, "_currentLeftRatio", void 0);
j = V([
  C("app-layout-builder")
], j);
var Y = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
let B = class extends _ {
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
      const i = `fr-sidemenu-${e.id}`, n = r;
      return c`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${n}"
                  aria-controls="${i}">
            ${e.label}
          </button>
          <div class="fr-collapse ${n ? "fr-collapse--expanded" : ""}" id="${i}">
            <ul class="fr-sidemenu__list">
              ${e.children.map((o) => this._renderMenuItem(o))}
            </ul>
          </div>
        </li>
      `;
    } else
      return c`
        <li class="fr-sidemenu__item ${t ? "fr-sidemenu__item--active" : ""}">
          <a class="fr-sidemenu__link"
             href="${this.basePath}${e.href}"
             ${t ? c`aria-current="page"` : ""}>
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
    return t.push({ label: this.title, href: "" }), c`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((r, i) => c`
              <li>
                ${i === t.length - 1 ? c`<a class="fr-breadcrumb__link" aria-current="page">${r.label}</a>` : c`<a class="fr-breadcrumb__link" href="${r.href}">${r.label}</a>`}
              </li>
            `)}
          </ol>
        </div>
      </nav>
    `;
  }
  render() {
    const e = this._getMenuStructure();
    return c`
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

            ${this.title ? c`
              <h1>
                ${this.icon ? c`<span class="${this.icon} fr-mr-1w" aria-hidden="true"></span>` : ""}
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
Y([
  l({ type: String })
], B.prototype, "title", void 0);
Y([
  l({ type: String })
], B.prototype, "icon", void 0);
Y([
  l({ type: String, attribute: "active-path" })
], B.prototype, "activePath", void 0);
Y([
  l({ type: String, attribute: "base-path" })
], B.prototype, "basePath", void 0);
B = Y([
  C("app-layout-demo")
], B);
var z = function(s, e, t, r) {
  var i = arguments.length, n = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, t) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, t, n) : o(e, t)) || n);
  return i > 3 && n && Object.defineProperty(e, t, n), n;
};
let T = class extends _ {
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
    return c`
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
          ${this.showDataTab ? c`
            <button
              class="preview-panel-tab ${this._activeTab === "data" ? "active" : ""}"
              data-tab="data"
              @click="${() => this._handleTabClick("data")}">
              ${i || "Données"}
            </button>
          ` : f}
          ${this.showPlaygroundButton ? c`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          ` : f}
          ${this.showSaveButton ? c`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          ` : f}
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
};
z([
  l({ type: Boolean, attribute: "show-data-tab" })
], T.prototype, "showDataTab", void 0);
z([
  l({ type: Boolean, attribute: "show-save-button" })
], T.prototype, "showSaveButton", void 0);
z([
  l({ type: Boolean, attribute: "show-playground-button" })
], T.prototype, "showPlaygroundButton", void 0);
z([
  l({ type: String, attribute: "tab-labels" })
], T.prototype, "tabLabels", void 0);
z([
  l({ type: String, attribute: "active-tab" })
], T.prototype, "activeTab", void 0);
z([
  x()
], T.prototype, "_activeTab", void 0);
T = z([
  C("app-preview-panel")
], T);
export {
  ue as AppFooter,
  ne as AppHeader,
  j as AppLayoutBuilder,
  B as AppLayoutDemo,
  R as DATA_EVENTS,
  m as GouvChart,
  g as GouvDatalist,
  p as GouvDsfrChart,
  $ as GouvKpi,
  S as GouvSource,
  oe as SourceSubscriberMixin,
  wt as aggregateByLabel,
  Me as computeAggregation,
  ft as dispatchDataError,
  pt as dispatchDataLoaded,
  vt as dispatchDataLoading,
  xt as extractLabelValues,
  mt as formatCurrency,
  Dt as formatDate,
  ke as formatNumber,
  gt as formatPercentage,
  Re as formatValue,
  k as getByPath,
  Mt as getByPathOrDefault,
  ut as getDataCache,
  kt as hasPath,
  $t as parseExpression,
  Ct as processChartData,
  At as sortByValue,
  bt as subscribeToSource
};
