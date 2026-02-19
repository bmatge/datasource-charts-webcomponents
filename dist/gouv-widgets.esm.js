var gr = Object.defineProperty;
var a = (r, s) => gr(r, "name", { value: s, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = globalThis, Ii = be.ShadowRoot && (be.ShadyCSS === void 0 || be.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Wi = Symbol(), Hi = /* @__PURE__ */ new WeakMap();
var rt;
let ZM = (rt = class {
  constructor(s, t, e) {
    if (this._$cssResult$ = !0, e !== Wi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = s, this.t = t;
  }
  get styleSheet() {
    let s = this.o;
    const t = this.t;
    if (Ii && s === void 0) {
      const e = t !== void 0 && t.length === 1;
      e && (s = Hi.get(t)), s === void 0 && ((this.o = s = new CSSStyleSheet()).replaceSync(this.cssText), e && Hi.set(t, s));
    }
    return s;
  }
  toString() {
    return this.cssText;
  }
}, a(rt, "n"), rt);
const Xr = /* @__PURE__ */ a((r) => new ZM(typeof r == "string" ? r : r + "", void 0, Wi), "r$4"), PM = /* @__PURE__ */ a((r, ...s) => {
  const t = r.length === 1 ? r[0] : s.reduce((e, i, M) => e + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[M + 1], r[0]);
  return new ZM(t, r, Wi);
}, "i$3"), jr = /* @__PURE__ */ a((r, s) => {
  if (Ii) r.adoptedStyleSheets = s.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of s) {
    const e = document.createElement("style"), i = be.litNonce;
    i !== void 0 && e.setAttribute("nonce", i), e.textContent = t.cssText, r.appendChild(e);
  }
}, "S$1"), qi = Ii ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((s) => {
  let t = "";
  for (const e of s.cssRules) t += e.cssText;
  return Xr(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Cr, defineProperty: Or, getOwnPropertyDescriptor: Er, getOwnPropertyNames: mr, getOwnPropertySymbols: vr, getPrototypeOf: _r } = Object, Es = globalThis, Ki = Es.trustedTypes, Ur = Ki ? Ki.emptyScript : "", ve = Es.reactiveElementPolyfillSupport, Jt = /* @__PURE__ */ a((r, s) => r, "d$1"), Se = { toAttribute(r, s) {
  switch (s) {
    case Boolean:
      r = r ? Ur : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, s) {
  let t = r;
  switch (s) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, fi = /* @__PURE__ */ a((r, s) => !Cr(r, s), "f$1"), sM = { attribute: !0, type: String, converter: Se, reflect: !1, useDefault: !1, hasChanged: fi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Es.litPropertyMetadata ?? (Es.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var nt;
let et = (nt = class extends HTMLElement {
  static addInitializer(s) {
    this._$Ei(), (this.l ?? (this.l = [])).push(s);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(s, t = sM) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(s) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(s, t), !t.noAccessor) {
      const e = Symbol(), i = this.getPropertyDescriptor(s, e, t);
      i !== void 0 && Or(this.prototype, s, i);
    }
  }
  static getPropertyDescriptor(s, t, e) {
    const { get: i, set: M } = Er(this.prototype, s) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: i, set(n) {
      const L = i == null ? void 0 : i.call(this);
      M == null || M.call(this, n), this.requestUpdate(s, L, e);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(s) {
    return this.elementProperties.get(s) ?? sM;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Jt("elementProperties"))) return;
    const s = _r(this);
    s.finalize(), s.l !== void 0 && (this.l = [...s.l]), this.elementProperties = new Map(s.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Jt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Jt("properties"))) {
      const t = this.properties, e = [...mr(t), ...vr(t)];
      for (const i of e) this.createProperty(i, t[i]);
    }
    const s = this[Symbol.metadata];
    if (s !== null) {
      const t = litPropertyMetadata.get(s);
      if (t !== void 0) for (const [e, i] of t) this.elementProperties.set(e, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, e] of this.elementProperties) {
      const i = this._$Eu(t, e);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s) {
    const t = [];
    if (Array.isArray(s)) {
      const e = new Set(s.flat(1 / 0).reverse());
      for (const i of e) t.unshift(qi(i));
    } else s !== void 0 && t.push(qi(s));
    return t;
  }
  static _$Eu(s, t) {
    const e = t.attribute;
    return e === !1 ? void 0 : typeof e == "string" ? e : typeof s == "string" ? s.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var s;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (s = this.constructor.l) == null || s.forEach((t) => t(this));
  }
  addController(s) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(s), this.renderRoot !== void 0 && this.isConnected && ((t = s.hostConnected) == null || t.call(s));
  }
  removeController(s) {
    var t;
    (t = this._$EO) == null || t.delete(s);
  }
  _$E_() {
    const s = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const e of t.keys()) this.hasOwnProperty(e) && (s.set(e, this[e]), delete this[e]);
    s.size > 0 && (this._$Ep = s);
  }
  createRenderRoot() {
    const s = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return jr(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    var s;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (s = this._$EO) == null || s.forEach((t) => {
      var e;
      return (e = t.hostConnected) == null ? void 0 : e.call(t);
    });
  }
  enableUpdating(s) {
  }
  disconnectedCallback() {
    var s;
    (s = this._$EO) == null || s.forEach((t) => {
      var e;
      return (e = t.hostDisconnected) == null ? void 0 : e.call(t);
    });
  }
  attributeChangedCallback(s, t, e) {
    this._$AK(s, e);
  }
  _$ET(s, t) {
    var M;
    const e = this.constructor.elementProperties.get(s), i = this.constructor._$Eu(s, e);
    if (i !== void 0 && e.reflect === !0) {
      const n = (((M = e.converter) == null ? void 0 : M.toAttribute) !== void 0 ? e.converter : Se).toAttribute(t, e.type);
      this._$Em = s, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(s, t) {
    var M, n;
    const e = this.constructor, i = e._$Eh.get(s);
    if (i !== void 0 && this._$Em !== i) {
      const L = e.getPropertyOptions(i), d = typeof L.converter == "function" ? { fromAttribute: L.converter } : ((M = L.converter) == null ? void 0 : M.fromAttribute) !== void 0 ? L.converter : Se;
      this._$Em = i;
      const l = d.fromAttribute(t, L.type);
      this[i] = l ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(s, t, e, i = !1, M) {
    var n;
    if (s !== void 0) {
      const L = this.constructor;
      if (i === !1 && (M = this[s]), e ?? (e = L.getPropertyOptions(s)), !((e.hasChanged ?? fi)(M, t) || e.useDefault && e.reflect && M === ((n = this._$Ej) == null ? void 0 : n.get(s)) && !this.hasAttribute(L._$Eu(s, e)))) return;
      this.C(s, t, e);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(s, t, { useDefault: e, reflect: i, wrapped: M }, n) {
    e && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(s) && (this._$Ej.set(s, n ?? t ?? this[s]), M !== !0 || n !== void 0) || (this._$AL.has(s) || (this.hasUpdated || e || (t = void 0), this._$AL.set(s, t)), i === !0 && this._$Em !== s && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(s));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const s = this.scheduleUpdate();
    return s != null && await s, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [M, n] of this._$Ep) this[M] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [M, n] of i) {
        const { wrapped: L } = n, d = this[M];
        L !== !0 || this._$AL.has(M) || d === void 0 || this.C(M, void 0, n, d);
      }
    }
    let s = !1;
    const t = this._$AL;
    try {
      s = this.shouldUpdate(t), s ? (this.willUpdate(t), (e = this._$EO) == null || e.forEach((i) => {
        var M;
        return (M = i.hostUpdate) == null ? void 0 : M.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw s = !1, this._$EM(), i;
    }
    s && this._$AE(t);
  }
  willUpdate(s) {
  }
  _$AE(s) {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostUpdated) == null ? void 0 : i.call(e);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(s)), this.updated(s);
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
  shouldUpdate(s) {
    return !0;
  }
  update(s) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(s) {
  }
  firstUpdated(s) {
  }
}, a(nt, "y"), nt);
et.elementStyles = [], et.shadowRootOptions = { mode: "open" }, et[Jt("elementProperties")] = /* @__PURE__ */ new Map(), et[Jt("finalized")] = /* @__PURE__ */ new Map(), ve == null || ve({ ReactiveElement: et }), (Es.reactiveElementVersions ?? (Es.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = globalThis, tM = /* @__PURE__ */ a((r) => r, "i$1"), he = Bt.trustedTypes, eM = he ? he.createPolicy("lit-html", { createHTML: /* @__PURE__ */ a((r) => r, "createHTML") }) : void 0, GM = "$lit$", Os = `lit$${Math.random().toFixed(9).slice(2)}$`, HM = "?" + Os, Vr = `<${HM}>`, Bs = document, Rt = /* @__PURE__ */ a(() => Bs.createComment(""), "c"), $t = /* @__PURE__ */ a((r) => r === null || typeof r != "object" && typeof r != "function", "a"), gi = Array.isArray, Ar = /* @__PURE__ */ a((r) => gi(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", "d"), _e = `[ 	
\f\r]`, vt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, iM = /-->/g, MM = />/g, As = RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rM = /'/g, nM = /"/g, qM = /^(?:script|style|textarea|title)$/i, KM = /* @__PURE__ */ a((r) => (s, ...t) => ({ _$litType$: r, strings: s, values: t }), "x"), z = KM(1), LM = KM(2), pt = Symbol.for("lit-noChange"), F = Symbol.for("lit-nothing"), aM = /* @__PURE__ */ new WeakMap(), Qs = Bs.createTreeWalker(Bs, 129);
function sr(r, s) {
  if (!gi(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return eM !== void 0 ? eM.createHTML(s) : s;
}
a(sr, "V");
const Qr = /* @__PURE__ */ a((r, s) => {
  const t = r.length - 1, e = [];
  let i, M = s === 2 ? "<svg>" : s === 3 ? "<math>" : "", n = vt;
  for (let L = 0; L < t; L++) {
    const d = r[L];
    let l, o, c = -1, N = 0;
    for (; N < d.length && (n.lastIndex = N, o = n.exec(d), o !== null); ) N = n.lastIndex, n === vt ? o[1] === "!--" ? n = iM : o[1] !== void 0 ? n = MM : o[2] !== void 0 ? (qM.test(o[2]) && (i = RegExp("</" + o[2], "g")), n = As) : o[3] !== void 0 && (n = As) : n === As ? o[0] === ">" ? (n = i ?? vt, c = -1) : o[1] === void 0 ? c = -2 : (c = n.lastIndex - o[2].length, l = o[1], n = o[3] === void 0 ? As : o[3] === '"' ? nM : rM) : n === nM || n === rM ? n = As : n === iM || n === MM ? n = vt : (n = As, i = void 0);
    const T = n === As && r[L + 1].startsWith("/>") ? " " : "";
    M += n === vt ? d + Vr : c >= 0 ? (e.push(l), d.slice(0, c) + GM + d.slice(c) + Os + T) : d + Os + (c === -2 ? L : T);
  }
  return [sr(r, M + (r[t] || "<?>") + (s === 2 ? "</svg>" : s === 3 ? "</math>" : "")), e];
}, "N"), Ce = class Ce {
  constructor({ strings: s, _$litType$: t }, e) {
    let i;
    this.parts = [];
    let M = 0, n = 0;
    const L = s.length - 1, d = this.parts, [l, o] = Qr(s, t);
    if (this.el = Ce.createElement(l, e), Qs.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = Qs.nextNode()) !== null && d.length < L; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(GM)) {
          const N = o[n++], T = i.getAttribute(c).split(Os), x = /([.?@])?(.*)/.exec(N);
          d.push({ type: 1, index: M, name: x[2], strings: T, ctor: x[1] === "." ? Ke : x[1] === "?" ? si : x[1] === "@" ? ti : Wt }), i.removeAttribute(c);
        } else c.startsWith(Os) && (d.push({ type: 6, index: M }), i.removeAttribute(c));
        if (qM.test(i.tagName)) {
          const c = i.textContent.split(Os), N = c.length - 1;
          if (N > 0) {
            i.textContent = he ? he.emptyScript : "";
            for (let T = 0; T < N; T++) i.append(c[T], Rt()), Qs.nextNode(), d.push({ type: 2, index: ++M });
            i.append(c[N], Rt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === HM) d.push({ type: 2, index: M });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(Os, c + 1)) !== -1; ) d.push({ type: 7, index: M }), c += Os.length - 1;
      }
      M++;
    }
  }
  static createElement(s, t) {
    const e = Bs.createElement("template");
    return e.innerHTML = s, e;
  }
};
a(Ce, "S");
let Zt = Ce;
function It(r, s, t = r, e) {
  var n, L;
  if (s === pt) return s;
  let i = e !== void 0 ? (n = t._$Co) == null ? void 0 : n[e] : t._$Cl;
  const M = $t(s) ? void 0 : s._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== M && ((L = i == null ? void 0 : i._$AO) == null || L.call(i, !1), M === void 0 ? i = void 0 : (i = new M(r), i._$AT(r, t, e)), e !== void 0 ? (t._$Co ?? (t._$Co = []))[e] = i : t._$Cl = i), i !== void 0 && (s = It(r, i._$AS(r, s.values), i, e)), s;
}
a(It, "M");
const _i = class _i {
  constructor(s, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = s, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(s) {
    const { el: { content: t }, parts: e } = this._$AD, i = ((s == null ? void 0 : s.creationScope) ?? Bs).importNode(t, !0);
    Qs.currentNode = i;
    let M = Qs.nextNode(), n = 0, L = 0, d = e[0];
    for (; d !== void 0; ) {
      if (n === d.index) {
        let l;
        d.type === 2 ? l = new Pt(M, M.nextSibling, this, s) : d.type === 1 ? l = new d.ctor(M, d.name, d.strings, this, s) : d.type === 6 && (l = new ei(M, this, s)), this._$AV.push(l), d = e[++L];
      }
      n !== (d == null ? void 0 : d.index) && (M = Qs.nextNode(), n++);
    }
    return Qs.currentNode = Bs, i;
  }
  p(s) {
    let t = 0;
    for (const e of this._$AV) e !== void 0 && (e.strings !== void 0 ? (e._$AI(s, e, t), t += e.strings.length - 2) : e._$AI(s[t])), t++;
  }
};
a(_i, "R");
let qe = _i;
const Oe = class Oe {
  get _$AU() {
    var s;
    return ((s = this._$AM) == null ? void 0 : s._$AU) ?? this._$Cv;
  }
  constructor(s, t, e, i) {
    this.type = 2, this._$AH = F, this._$AN = void 0, this._$AA = s, this._$AB = t, this._$AM = e, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let s = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (s == null ? void 0 : s.nodeType) === 11 && (s = t.parentNode), s;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(s, t = this) {
    s = It(this, s, t), $t(s) ? s === F || s == null || s === "" ? (this._$AH !== F && this._$AR(), this._$AH = F) : s !== this._$AH && s !== pt && this._(s) : s._$litType$ !== void 0 ? this.$(s) : s.nodeType !== void 0 ? this.T(s) : Ar(s) ? this.k(s) : this._(s);
  }
  O(s) {
    return this._$AA.parentNode.insertBefore(s, this._$AB);
  }
  T(s) {
    this._$AH !== s && (this._$AR(), this._$AH = this.O(s));
  }
  _(s) {
    this._$AH !== F && $t(this._$AH) ? this._$AA.nextSibling.data = s : this.T(Bs.createTextNode(s)), this._$AH = s;
  }
  $(s) {
    var M;
    const { values: t, _$litType$: e } = s, i = typeof e == "number" ? this._$AC(s) : (e.el === void 0 && (e.el = Zt.createElement(sr(e.h, e.h[0]), this.options)), e);
    if (((M = this._$AH) == null ? void 0 : M._$AD) === i) this._$AH.p(t);
    else {
      const n = new qe(i, this), L = n.u(this.options);
      n.p(t), this.T(L), this._$AH = n;
    }
  }
  _$AC(s) {
    let t = aM.get(s.strings);
    return t === void 0 && aM.set(s.strings, t = new Zt(s)), t;
  }
  k(s) {
    gi(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let e, i = 0;
    for (const M of s) i === t.length ? t.push(e = new Oe(this.O(Rt()), this.O(Rt()), this, this.options)) : e = t[i], e._$AI(M), i++;
    i < t.length && (this._$AR(e && e._$AB.nextSibling, i), t.length = i);
  }
  _$AR(s = this._$AA.nextSibling, t) {
    var e;
    for ((e = this._$AP) == null ? void 0 : e.call(this, !1, !0, t); s !== this._$AB; ) {
      const i = tM(s).nextSibling;
      tM(s).remove(), s = i;
    }
  }
  setConnected(s) {
    var t;
    this._$AM === void 0 && (this._$Cv = s, (t = this._$AP) == null || t.call(this, s));
  }
};
a(Oe, "k");
let Pt = Oe;
const Ui = class Ui {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(s, t, e, i, M) {
    this.type = 1, this._$AH = F, this._$AN = void 0, this.element = s, this.name = t, this._$AM = i, this.options = M, e.length > 2 || e[0] !== "" || e[1] !== "" ? (this._$AH = Array(e.length - 1).fill(new String()), this.strings = e) : this._$AH = F;
  }
  _$AI(s, t = this, e, i) {
    const M = this.strings;
    let n = !1;
    if (M === void 0) s = It(this, s, t, 0), n = !$t(s) || s !== this._$AH && s !== pt, n && (this._$AH = s);
    else {
      const L = s;
      let d, l;
      for (s = M[0], d = 0; d < M.length - 1; d++) l = It(this, L[e + d], t, d), l === pt && (l = this._$AH[d]), n || (n = !$t(l) || l !== this._$AH[d]), l === F ? s = F : s !== F && (s += (l ?? "") + M[d + 1]), this._$AH[d] = l;
    }
    n && !i && this.j(s);
  }
  j(s) {
    s === F ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, s ?? "");
  }
};
a(Ui, "H");
let Wt = Ui;
const Vi = class Vi extends Wt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(s) {
    this.element[this.name] = s === F ? void 0 : s;
  }
};
a(Vi, "I");
let Ke = Vi;
const Ai = class Ai extends Wt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(s) {
    this.element.toggleAttribute(this.name, !!s && s !== F);
  }
};
a(Ai, "L");
let si = Ai;
const Qi = class Qi extends Wt {
  constructor(s, t, e, i, M) {
    super(s, t, e, i, M), this.type = 5;
  }
  _$AI(s, t = this) {
    if ((s = It(this, s, t, 0) ?? F) === pt) return;
    const e = this._$AH, i = s === F && e !== F || s.capture !== e.capture || s.once !== e.once || s.passive !== e.passive, M = s !== F && (e === F || i);
    i && this.element.removeEventListener(this.name, this, e), M && this.element.addEventListener(this.name, this, s), this._$AH = s;
  }
  handleEvent(s) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, s) : this._$AH.handleEvent(s);
  }
};
a(Qi, "z");
let ti = Qi;
const ki = class ki {
  constructor(s, t, e) {
    this.element = s, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = e;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(s) {
    It(this, s);
  }
};
a(ki, "Z");
let ei = ki;
const Ue = Bt.litHtmlPolyfillSupport;
Ue == null || Ue(Zt, Pt), (Bt.litHtmlVersions ?? (Bt.litHtmlVersions = [])).push("3.3.2");
const kr = /* @__PURE__ */ a((r, s, t) => {
  const e = (t == null ? void 0 : t.renderBefore) ?? s;
  let i = e._$litPart$;
  if (i === void 0) {
    const M = (t == null ? void 0 : t.renderBefore) ?? null;
    e._$litPart$ = i = new Pt(s.insertBefore(Rt(), M), M, void 0, t ?? {});
  }
  return i._$AI(r), i;
}, "D");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ys = globalThis, Yi = class Yi extends et {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const s = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = s.firstChild), s;
  }
  update(s) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(s), this._$Do = kr(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var s;
    super.connectedCallback(), (s = this._$Do) == null || s.setConnected(!0);
  }
  disconnectedCallback() {
    var s;
    super.disconnectedCallback(), (s = this._$Do) == null || s.setConnected(!1);
  }
  render() {
    return pt;
  }
};
a(Yi, "i");
let Q = Yi;
var $M;
Q._$litElement$ = !0, Q.finalized = !0, ($M = Ys.litElementHydrateSupport) == null || $M.call(Ys, { LitElement: Q });
const Ve = Ys.litElementPolyfillSupport;
Ve == null || Ve({ LitElement: Q });
(Ys.litElementVersions ?? (Ys.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ss = /* @__PURE__ */ a((r) => (s, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(r, s);
  }) : customElements.define(r, s);
}, "t");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yr = { attribute: !0, type: String, converter: Se, reflect: !1, hasChanged: fi }, Jr = /* @__PURE__ */ a((r = Yr, s, t) => {
  const { kind: e, metadata: i } = t;
  let M = globalThis.litPropertyMetadata.get(i);
  if (M === void 0 && globalThis.litPropertyMetadata.set(i, M = /* @__PURE__ */ new Map()), e === "setter" && ((r = Object.create(r)).wrapped = !0), M.set(t.name, r), e === "accessor") {
    const { name: n } = t;
    return { set(L) {
      const d = s.get.call(this);
      s.set.call(this, L), this.requestUpdate(n, d, r, !0, L);
    }, init(L) {
      return L !== void 0 && this.C(n, void 0, r, L), L;
    } };
  }
  if (e === "setter") {
    const { name: n } = t;
    return function(L) {
      const d = this[n];
      s.call(this, L), this.requestUpdate(n, d, r, !0, L);
    };
  }
  throw Error("Unsupported decorator location: " + e);
}, "r$1");
function y(r) {
  return (s, t) => typeof t == "object" ? Jr(r, s, t) : ((e, i, M) => {
    const n = i.hasOwnProperty(M);
    return i.constructor.createProperty(M, e), n ? Object.getOwnPropertyDescriptor(i, M) : void 0;
  })(r, s, t);
}
a(y, "n");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function D(r) {
  return y({ ...r, state: !0, attribute: !1 });
}
a(D, "r");
function $(r, s) {
  if (!s || s.trim() === "")
    return r;
  const e = s.replace(/\[(\d+)\]/g, ".$1").split(".");
  let i = r;
  for (const M of e) {
    if (i == null || typeof i != "object")
      return;
    i = i[M];
  }
  return i;
}
a($, "getByPath");
function b0(r, s) {
  return $(r, s) !== void 0;
}
a(b0, "hasPath");
function oM(r, s, t) {
  const i = s.replace(/\[(\d+)\]/g, ".$1").split(".");
  let M = r;
  for (let n = 0; n < i.length - 1; n++) {
    const L = i[n];
    (!(L in M) || typeof M[L] != "object" || M[L] === null) && (M[L] = {}), M = M[L];
  }
  M[i[i.length - 1]] = t;
}
a(oM, "setByPath");
function u0(r, s, t) {
  const e = $(r, s);
  return e !== void 0 ? e : t;
}
a(u0, "getByPathOrDefault");
function ii(r) {
  return r ? String(r).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
}
a(ii, "escapeHtml");
function lM(r, s = !1) {
  if (typeof r == "number")
    return isNaN(r) ? s ? null : 0 : r;
  if (typeof r != "string")
    return s ? null : 0;
  let t = r.trim();
  if (t === "")
    return s ? null : 0;
  t = t.replace(/\s/g, "");
  const e = t.includes(","), i = t.includes(".");
  if (e && i) {
    const n = t.lastIndexOf(","), L = t.lastIndexOf(".");
    n > L ? t = t.replace(/\./g, "").replace(",", ".") : t = t.replace(/,/g, "");
  } else e && (t = t.replace(",", "."));
  const M = parseFloat(t);
  return isNaN(M) ? s ? null : 0 : M;
}
a(lM, "toNumber");
function Br(r) {
  if (typeof r != "string")
    return !1;
  const s = r.trim();
  return s === "" ? !1 : /^-?[\d\s]+([.,]\d+)?$/.test(s);
}
a(Br, "looksLikeNumber");
function Rr(r) {
  return !r || typeof r != "string" || ["N/A", "null", "undefined", "00", ""].includes(r) ? !1 : !!(r === "2A" || r === "2B" || /^97[1-6]$/.test(r) || /^(0[1-9]|[1-8]\d|9[0-5])$/.test(r));
}
a(Rr, "isValidDeptCode");
const Xi = "https://chartsbuilder.matge.com", Ae = {
  baseUrl: Xi,
  endpoints: {
    grist: "/grist-proxy",
    gristGouv: "/grist-gouv-proxy",
    albert: "/albert-proxy",
    tabular: "/tabular-proxy",
    corsProxy: "/cors-proxy"
  }
};
function $r() {
  if (typeof window > "u")
    return !1;
  const { hostname: r, port: s } = window.location;
  return (r === "localhost" || r === "127.0.0.1") && !!s && s !== "80" && s !== "443";
}
a($r, "isViteDevMode");
function Zr() {
  return typeof window < "u" && "__TAURI__" in window;
}
a(Zr, "isTauriMode");
function ji() {
  var e;
  const r = { ...Ae.endpoints };
  return $r() ? { baseUrl: "", endpoints: r } : Zr() ? { baseUrl: Ae.baseUrl, endpoints: r } : {
    baseUrl: ((e = import.meta.env) == null ? void 0 : e.VITE_PROXY_URL) || Ae.baseUrl,
    endpoints: r
  };
}
a(ji, "getProxyConfig");
function Pr(r) {
  if (!r)
    throw new Error("getProxiedUrl: url is required");
  const s = ji();
  return r.includes("tabular-api.data.gouv.fr") ? r.replace("https://tabular-api.data.gouv.fr", `${s.baseUrl}${s.endpoints.tabular}`) : r.includes("docs.getgrist.com") ? r.replace("https://docs.getgrist.com", `${s.baseUrl}${s.endpoints.grist}`) : r.includes("grist.numerique.gouv.fr") ? r.replace("https://grist.numerique.gouv.fr", `${s.baseUrl}${s.endpoints.gristGouv}`) : r.includes("albert.api.etalab.gouv.fr") ? r.replace("https://albert.api.etalab.gouv.fr", `${s.baseUrl}${s.endpoints.albert}`) : r;
}
a(Pr, "getProxiedUrl");
function Gr(r, s) {
  const t = ji();
  return {
    url: `${t.baseUrl}${t.endpoints.corsProxy}`,
    headers: {
      ...s || {},
      "X-Target-URL": r
    }
  };
}
a(Gr, "buildCorsProxyRequest");
const Le = {
  FAVORITES: "gouv-widgets-favorites",
  DASHBOARDS: "gouv-widgets-dashboards",
  CONNECTIONS: "gouv_widgets_connections",
  SOURCES: "gouv_widgets_sources"
};
function ae(r, s) {
  try {
    const t = localStorage.getItem(r);
    return t ? JSON.parse(t) : s;
  } catch {
    return s;
  }
}
a(ae, "loadFromStorage");
const Hr = {
  user: null,
  isAuthenticated: !1,
  isLoading: !0
};
let ft = { ...Hr }, tt = null, oe = null, tr = "";
const Mi = /* @__PURE__ */ new Set();
function qr() {
  for (const r of Mi)
    try {
      r(ft);
    } catch {
    }
}
a(qr, "notify");
function ks(r) {
  ft = { ...ft, ...r }, qr();
}
a(ks, "setState");
async function te(r, s) {
  return fetch(`${tr}${r}`, {
    ...s,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...s == null ? void 0 : s.headers
    }
  });
}
a(te, "apiFetch");
async function er() {
  if (tt !== null)
    return tt;
  try {
    const r = await fetch(`${tr}/api/auth/me`, {
      credentials: "include"
    });
    tt = r.status === 200 || r.status === 401;
  } catch {
    tt = !1;
  }
  return tt && typeof window < "u" && (window.__gwDbMode = !0), tt;
}
a(er, "isDbMode");
async function Kr() {
  return oe || (oe = sn(), oe);
}
a(Kr, "checkAuth");
async function sn() {
  if (!await er())
    return ks({ user: null, isAuthenticated: !1, isLoading: !1 }), ft;
  try {
    const s = await te("/api/auth/me");
    if (s.ok) {
      const t = await s.json();
      ks({ user: t.user, isAuthenticated: !0, isLoading: !1 });
    } else
      ks({ user: null, isAuthenticated: !1, isLoading: !1 });
  } catch {
    ks({ user: null, isAuthenticated: !1, isLoading: !1 });
  }
  return ft;
}
a(sn, "_doCheckAuth");
async function tn(r) {
  try {
    const s = await te("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(r)
    });
    if (!s.ok)
      return { success: !1, error: (await s.json()).error || "Login failed" };
    const t = await s.json();
    return ks({ user: t.user, isAuthenticated: !0, isLoading: !1 }), await ir(), { success: !0 };
  } catch {
    return { success: !1, error: "Network error" };
  }
}
a(tn, "login");
async function en(r) {
  try {
    const s = await te("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(r)
    });
    if (!s.ok)
      return { success: !1, error: (await s.json()).error || "Registration failed" };
    const t = await s.json();
    return ks({ user: t.user, isAuthenticated: !0, isLoading: !1 }), await ir(), { success: !0 };
  } catch {
    return { success: !1, error: "Network error" };
  }
}
a(en, "register");
async function Mn() {
  try {
    await te("/api/auth/logout", { method: "POST" });
  } catch {
  }
  ks({ user: null, isAuthenticated: !1, isLoading: !1 });
}
a(Mn, "logout");
function rn(r) {
  return Mi.add(r), () => {
    Mi.delete(r);
  };
}
a(rn, "onAuthChange");
function le() {
  return ft.isAuthenticated;
}
a(le, "isAuthenticated");
const Qe = "gw-migrated";
async function ir() {
  if (localStorage.getItem(Qe))
    return;
  const r = ae(Le.SOURCES, []), s = ae(Le.CONNECTIONS, []), t = ae(Le.FAVORITES, []), e = ae(Le.DASHBOARDS, []);
  if (!(r.length > 0 || s.length > 0 || t.length > 0 || e.length > 0)) {
    localStorage.setItem(Qe, "1");
    return;
  }
  try {
    (await te("/api/migrate", {
      method: "POST",
      body: JSON.stringify({ sources: r, connections: s, favorites: t, dashboards: e })
    })).ok && (localStorage.setItem(Qe, "1"), console.info("[auth] localStorage data migrated to server"));
  } catch {
    console.warn("[auth] Migration failed, will retry on next login");
  }
}
a(ir, "autoMigrateIfNeeded");
const dM = /\/api\/explore\/v2\.1\/catalog\/datasets\/([^/]+)/, Mr = {
  id: "opendatasoft",
  displayName: "OpenDataSoft",
  urlPatterns: [dM],
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
    aggregationSyntax: "odsql-select",
    searchTemplate: 'search("{q}")'
  },
  facets: {
    defaultMode: "server",
    endpoint: "/facets"
  },
  resource: {
    idFields: ["datasetId"],
    apiPathTemplate: "/api/explore/v2.1/catalog/datasets/{datasetId}/records",
    extractIds: /* @__PURE__ */ a((r) => {
      const s = r.match(dM);
      return s ? { datasetId: s[1] } : null;
    }, "extractIds")
  },
  codeGen: {
    usesGouvSource: !0,
    usesGouvQuery: !0,
    usesGouvNormalize: !1,
    sourceApiType: "opendatasoft",
    fieldPrefix: "",
    dependencies: { dsfr: !0, dsfrChart: !0, gouvWidgets: !0 }
  }
}, cM = /tabular-api\.data\.gouv\.fr\/api\/resources\/([^/]+)/, rr = {
  id: "tabular",
  displayName: "Tabular (data.gouv.fr)",
  urlPatterns: [cM],
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
    pageSize: 50,
    maxPages: 500,
    maxRecords: 25e3,
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
    serverGroupBy: !0,
    serverOrderBy: !0,
    serverAggregation: !0
  },
  query: {
    whereFormat: "colon",
    whereSeparator: ", ",
    aggregationSyntax: "colon-attr",
    searchTemplate: null,
    operatorMapping: {
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
    }
  },
  facets: {
    defaultMode: "static"
  },
  resource: {
    idFields: ["resourceId"],
    apiPathTemplate: "/api/resources/{resourceId}/data/",
    extractIds: /* @__PURE__ */ a((r) => {
      const s = r.match(cM);
      return s ? { resourceId: s[1] } : null;
    }, "extractIds")
  },
  codeGen: {
    usesGouvSource: !0,
    usesGouvQuery: !0,
    usesGouvNormalize: !1,
    sourceApiType: "tabular",
    fieldPrefix: "",
    dependencies: { dsfr: !0, dsfrChart: !0, gouvWidgets: !0 }
  }
}, NM = /\/api\/docs\/([^/]+)\/tables\/([^/]+)/, nr = {
  id: "grist",
  displayName: "Grist",
  urlPatterns: [NM],
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
    type: "offset",
    pageSize: 100,
    maxPages: 0,
    maxRecords: 0,
    params: {
      offset: "offset",
      limit: "limit"
    },
    nextPagePath: null
  },
  capabilities: {
    serverFetch: !0,
    serverFacets: !0,
    serverSearch: !1,
    serverGroupBy: !0,
    serverOrderBy: !0,
    serverAggregation: !0
  },
  query: {
    whereFormat: "colon",
    whereSeparator: ", ",
    aggregationSyntax: "sql",
    searchTemplate: null
  },
  facets: {
    defaultMode: "server"
  },
  resource: {
    idFields: ["documentId", "tableId"],
    apiPathTemplate: "/api/docs/{documentId}/tables/{tableId}/records",
    extractIds: /* @__PURE__ */ a((r) => {
      const s = r.match(NM);
      return s ? { documentId: s[1], tableId: s[2] } : null;
    }, "extractIds")
  },
  codeGen: {
    usesGouvSource: !0,
    usesGouvQuery: !0,
    usesGouvNormalize: !1,
    sourceApiType: "grist",
    fieldPrefix: "",
    dependencies: { dsfr: !0, dsfrChart: !0, gouvWidgets: !0 }
  }
}, Lr = {
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
    aggregationSyntax: "client-only",
    searchTemplate: null
  },
  facets: {
    defaultMode: "client"
  },
  resource: {
    idFields: [],
    apiPathTemplate: "",
    extractIds: /* @__PURE__ */ a(() => null, "extractIds")
  },
  codeGen: {
    usesGouvSource: !0,
    usesGouvQuery: !0,
    usesGouvNormalize: !1,
    sourceApiType: "generic",
    fieldPrefix: "",
    dependencies: { dsfr: !0, dsfrChart: !0, gouvWidgets: !0 }
  }
}, TM = /melodi\/data\/([^?/]+)/, ar = {
  id: "insee",
  displayName: "INSEE (Melodi)",
  urlPatterns: [TM],
  knownHosts: [],
  // CORS enabled, no proxy needed
  defaultBaseUrl: "https://api.insee.fr/melodi",
  defaultAuthType: "none",
  response: {
    dataPath: "observations",
    // { observations: [...] }
    totalCountPath: "paging.count",
    nestedDataKey: null,
    // adapter handles flattening internally
    requiresFlatten: !0
    // observations have nested dimensions/measures/attributes
  },
  pagination: {
    type: "page",
    pageSize: 1e3,
    maxPages: 100,
    maxRecords: 1e5,
    params: {
      page: "page",
      pageSize: "maxResult"
    },
    nextPagePath: "paging.next",
    serverMeta: {
      pagePath: "",
      // not available
      pageSizePath: "",
      // not available
      totalPath: "paging.count"
    }
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
    aggregationSyntax: "client-only",
    searchTemplate: null
  },
  facets: {
    defaultMode: "client"
  },
  resource: {
    idFields: ["datasetId"],
    apiPathTemplate: "/data/{datasetId}",
    extractIds: /* @__PURE__ */ a((r) => {
      const s = r.match(TM);
      return s ? { datasetId: s[1] } : null;
    }, "extractIds")
  },
  codeGen: {
    usesGouvSource: !0,
    usesGouvQuery: !0,
    usesGouvNormalize: !1,
    // adapter flattens observations internally
    sourceApiType: "insee",
    fieldPrefix: "",
    dependencies: {
      dsfr: !0,
      dsfrChart: !0,
      gouvWidgets: !0
    }
  }
}, nn = /* @__PURE__ */ new Map();
function ee(r) {
  nn.set(r.id, r);
}
a(ee, "registerProvider");
ee(Mr);
ee(rr);
ee(nr);
ee(ar);
ee(Lr);
const yM = `${Xi}/beacon`, xM = /* @__PURE__ */ new Set();
function Ss(r, s) {
  const t = `${r}:${s || ""}`;
  if (xM.has(t) || (xM.add(t), typeof window > "u"))
    return;
  const e = window.location.hostname;
  if (e === "localhost" || e === "127.0.0.1" || e === new URL(Xi).hostname)
    return;
  const i = new URLSearchParams();
  if (i.set("c", r), s && i.set("t", s), i.set("r", window.location.origin), typeof window < "u" && window.__gwDbMode === !0)
    try {
      fetch("/api/monitoring/beacon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          component: r,
          chartType: s || null,
          origin: window.location.origin
        })
      }).catch(() => {
        new Image().src = `${yM}?${i.toString()}`;
      });
      return;
    } catch {
    }
  const n = `${yM}?${i.toString()}`;
  try {
    new Image().src = n;
  } catch {
  }
}
a(Ss, "sendWidgetBeacon");
const Ji = class Ji {
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
  validate(s) {
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
  getDefaultSearchTemplate() {
    return null;
  }
  getProviderConfig() {
    return Lr;
  }
  buildFacetWhere(s, t) {
    const e = [];
    for (const [i, M] of Object.entries(s))
      i === t || M.size === 0 || (M.size === 1 ? e.push(`${i}:eq:${[...M][0]}`) : e.push(`${i}:in:${[...M].join("|")}`));
    return e.join(", ");
  }
};
a(Ji, "GenericAdapter");
let ri = Ji;
function ke(r, s) {
  const t = {};
  return s && (t.signal = s), r.headers && Object.keys(r.headers).length > 0 && (t.headers = r.headers), t;
}
a(ke, "buildFetchOptions$3");
const de = 100, Ye = 10, Bi = class Bi {
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
  validate(s) {
    return s.datasetId ? null : 'attribut "dataset-id" requis pour les requetes OpenDataSoft';
  }
  /**
   * Fetch toutes les donnees avec pagination automatique via offset.
   * ODS limite a 100 records par requete.
   *
   * - limit > 0 : fetch exactement ce nombre de records
   * - limit = 0 : fetch TOUS les records disponibles (via total_count)
   */
  async fetchAll(s, t) {
    const i = s.limit <= 0 ? Ye * de : s.limit, M = de;
    let n = [], L = 0, d = -1;
    for (let l = 0; l < Ye; l++) {
      const o = i - n.length;
      if (o <= 0)
        break;
      const c = this.buildUrl(s, Math.min(M, o), L), N = await fetch(c, ke(s, t));
      if (!N.ok)
        throw new Error(`HTTP ${N.status}: ${N.statusText}`);
      const T = await N.json(), x = T.results || [];
      if (n = n.concat(x), typeof T.total_count == "number" && (d = T.total_count), d >= 0 && n.length >= d || x.length < M)
        break;
      L += x.length;
    }
    return d >= 0 && n.length < d && n.length < i && console.warn(`gouv-query: pagination incomplete - ${n.length}/${d} resultats recuperes (limite de securite: ${Ye} pages de ${de})`), {
      data: n,
      totalCount: d >= 0 ? d : n.length,
      needsClientProcessing: !1
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(s, t, e) {
    const i = this.buildServerSideUrl(s, t), M = await fetch(i, ke(s, e));
    if (!M.ok)
      throw new Error(`HTTP ${M.status}: ${M.statusText}`);
    const n = await M.json(), L = n.results || [], d = typeof n.total_count == "number" ? n.total_count : 0;
    return {
      data: L,
      totalCount: d,
      needsClientProcessing: !1,
      rawJson: n
    };
  }
  /**
   * Construit une URL ODS pour le fetch complet (avec pagination).
   * limitOverride et pageOrOffsetOverride controlent la pagination per-page.
   */
  buildUrl(s, t, e) {
    const i = s.baseUrl || "https://data.opendatasoft.com", M = new URL(`${i}/api/explore/v2.1/catalog/datasets/${s.datasetId}/records`);
    s.select ? M.searchParams.set("select", s.select) : s.aggregate && s.groupBy && M.searchParams.set("select", this._buildSelectFromAggregate(s));
    const n = s.where || s.filter;
    if (n && M.searchParams.set("where", n), s.groupBy && M.searchParams.set("group_by", s.groupBy), s.orderBy) {
      const L = s.orderBy.replace(/:(\w+)$/, (d, l) => ` ${l.toUpperCase()}`);
      M.searchParams.set("order_by", L);
    }
    return t !== void 0 ? M.searchParams.set("limit", String(t)) : s.limit > 0 && M.searchParams.set("limit", String(Math.min(s.limit, de))), e && e > 0 && M.searchParams.set("offset", String(e)), M.toString();
  }
  /**
   * Construit l'URL ODS en mode server-side (une seule page).
   */
  buildServerSideUrl(s, t) {
    const e = s.baseUrl || "https://data.opendatasoft.com", i = new URL(`${e}/api/explore/v2.1/catalog/datasets/${s.datasetId}/records`);
    s.select ? i.searchParams.set("select", s.select) : s.aggregate && s.groupBy && i.searchParams.set("select", this._buildSelectFromAggregate(s)), t.effectiveWhere && i.searchParams.set("where", t.effectiveWhere), s.groupBy && i.searchParams.set("group_by", s.groupBy);
    const M = t.orderBy;
    if (M) {
      const L = M.replace(/:(\w+)$/, (d, l) => ` ${l.toUpperCase()}`);
      i.searchParams.set("order_by", L);
    }
    i.searchParams.set("limit", String(s.pageSize));
    const n = (t.page - 1) * s.pageSize;
    return n > 0 && i.searchParams.set("offset", String(n)), i.toString();
  }
  /**
   * Fetch les valeurs de facettes depuis l'endpoint ODS /facets.
   */
  async fetchFacets(s, t, e, i) {
    const M = s.baseUrl || "https://data.opendatasoft.com", n = new URL(`${M}/api/explore/v2.1/catalog/datasets/${s.datasetId}/facets`);
    for (const o of t)
      n.searchParams.append("facet", o);
    e && n.searchParams.set("where", e);
    const L = await fetch(n.toString(), ke(s, i));
    if (!L.ok)
      throw new Error(`HTTP ${L.status}: ${L.statusText}`);
    const d = await L.json(), l = [];
    for (const o of d.facets || [])
      l.push({
        field: o.name,
        values: (o.facets || []).map((c) => ({
          value: c.value,
          count: c.count
        }))
      });
    return l;
  }
  getDefaultSearchTemplate() {
    return 'search("{q}")';
  }
  getProviderConfig() {
    return Mr;
  }
  buildFacetWhere(s, t) {
    const e = [];
    for (const [i, M] of Object.entries(s))
      if (!(i === t || M.size === 0))
        if (M.size === 1) {
          const n = [...M][0].replace(/"/g, '\\"');
          e.push(`${i} = "${n}"`);
        } else {
          const n = [...M].map((L) => `"${L.replace(/"/g, '\\"')}"`).join(", ");
          e.push(`${i} IN (${n})`);
        }
    return e.join(" AND ");
  }
  parseAggregates(s) {
    if (!s)
      return [];
    const t = [], e = s.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of e) {
      const M = i.split(":");
      M.length >= 2 && t.push({
        field: M[0],
        function: M[1],
        alias: M[2]
      });
    }
    return t;
  }
  /**
   * Convertit aggregate="field:func" + group-by en syntaxe ODS select.
   */
  _buildSelectFromAggregate(s) {
    const t = this.parseAggregates(s.aggregate), e = [];
    for (const M of t) {
      const n = M.function === "count" ? "count(*)" : `${M.function}(${M.field})`, L = M.alias || `${M.field}__${M.function}`;
      e.push(`${n} as ${L}`);
    }
    const i = s.groupBy.split(",").map((M) => M.trim()).filter(Boolean);
    for (const M of i)
      e.push(M);
    return e.join(", ");
  }
};
a(Bi, "OpenDataSoftAdapter");
let ni = Bi;
function zM(r, s) {
  const t = {};
  return s && (t.signal = s), r.headers && Object.keys(r.headers).length > 0 && (t.headers = r.headers), t;
}
a(zM, "buildFetchOptions$2");
const ce = 50, Je = 500, Ri = class Ri {
  constructor() {
    this.type = "tabular", this.capabilities = {
      serverFetch: !0,
      serverFacets: !1,
      serverSearch: !1,
      serverGroupBy: !0,
      serverOrderBy: !0,
      whereFormat: "colon"
    };
  }
  validate(s) {
    return s.resource ? null : 'attribut "resource" requis pour les requetes Tabular';
  }
  /**
   * Fetch toutes les donnees avec pagination automatique via links.next.
   * Quand groupBy/aggregate sont presents, l'API Tabular les execute
   * cote serveur et retourne les donnees deja agregees (needsClientProcessing=false).
   */
  async fetchAll(s, t) {
    var l;
    const e = s.limit <= 0, i = e ? Je * ce : s.limit;
    let M = [], n = -1, L = 1;
    for (let o = 0; o < Je && !(i - M.length <= 0); o++) {
      const N = this.buildUrl(s, ce, L), T = await fetch(N, zM(s, t));
      if (!T.ok)
        throw new Error(`HTTP ${T.status}: ${T.statusText}`);
      const x = await T.json(), u = x.data || [];
      M = M.concat(u), x.meta && typeof x.meta.total == "number" && (n = x.meta.total);
      let w = !1;
      if ((l = x.links) != null && l.next)
        try {
          const f = new URL(x.links.next, "https://tabular-api.data.gouv.fr"), h = Number(f.searchParams.get("page"));
          h > 0 && (L = h, w = !0);
        } catch {
        }
      if (!w || n >= 0 && M.length >= n || u.length < ce)
        break;
    }
    !e && M.length > i && (M = M.slice(0, i)), n >= 0 && M.length < n && M.length < i && console.warn(`gouv-query: pagination incomplete - ${M.length}/${n} resultats recuperes (limite de securite: ${Je} pages de ${ce})`);
    const d = !!(s.groupBy || s.aggregate);
    return {
      data: M,
      totalCount: n >= 0 ? n : M.length,
      needsClientProcessing: !d
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(s, t, e) {
    var l;
    const i = this.buildServerSideUrl(s, t), M = await fetch(i, zM(s, e));
    if (!M.ok)
      throw new Error(`HTTP ${M.status}: ${M.statusText}`);
    const n = await M.json(), L = n.data || [], d = ((l = n.meta) == null ? void 0 : l.total) ?? 0;
    return {
      data: L,
      totalCount: d,
      needsClientProcessing: !1,
      rawJson: n
    };
  }
  /**
   * Construit une URL Tabular pour le fetch complet.
   */
  buildUrl(s, t, e) {
    const i = this._getBaseUrl(s), M = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, n = new URL(`${i}/api/resources/${s.resource}/data/`, M), L = s.filter || s.where;
    if (L && this._applyColonFilters(n, L), s.groupBy) {
      const d = s.groupBy.split(",").map((l) => l.trim());
      for (const l of d)
        n.searchParams.append(`${l}__groupby`, "");
    }
    if (s.aggregate) {
      const d = s.aggregate.split(",").map((l) => l.trim());
      for (const l of d) {
        const o = l.split(":");
        if (o.length >= 2) {
          const c = o[0], N = o[1];
          n.searchParams.append(`${c}__${N}`, "");
        }
      }
    }
    if (s.orderBy) {
      const d = s.orderBy.split(":"), l = d[0], o = d[1] || "asc";
      n.searchParams.set(`${l}__sort`, o);
    }
    return t ? n.searchParams.set("page_size", String(t)) : s.limit > 0 && n.searchParams.set("page_size", String(s.limit)), e && n.searchParams.set("page", String(e)), n.toString();
  }
  /**
   * Construit l'URL Tabular en mode server-side (une seule page).
   */
  buildServerSideUrl(s, t) {
    const e = this._getBaseUrl(s), i = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, M = new URL(`${e}/api/resources/${s.resource}/data/`, i), n = t.effectiveWhere || s.filter || s.where;
    n && this._applyColonFilters(M, n);
    const L = t.orderBy;
    if (L) {
      const d = L.split(":"), l = d[0], o = d[1] || "asc";
      M.searchParams.set(`${l}__sort`, o);
    }
    return M.searchParams.set("page_size", String(s.pageSize)), M.searchParams.set("page", String(t.page)), M.toString();
  }
  /**
   * Applique des filtres colon-syntax (field:op:value, ...) comme query params.
   */
  _applyColonFilters(s, t) {
    const e = t.split(",").map((i) => i.trim());
    for (const i of e) {
      const M = i.split(":");
      if (M.length >= 3) {
        const n = M[0], L = this._mapOperator(M[1]), d = M.slice(2).join(":");
        s.searchParams.set(`${n}__${L}`, d);
      }
    }
  }
  /**
   * Mappe les operateurs generiques vers la syntaxe Tabular.
   */
  _mapOperator(s) {
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
    }[s] || s;
  }
  getDefaultSearchTemplate() {
    return null;
  }
  getProviderConfig() {
    return rr;
  }
  buildFacetWhere(s, t) {
    const e = [];
    for (const [i, M] of Object.entries(s))
      i === t || M.size === 0 || (M.size === 1 ? e.push(`${i}:eq:${[...M][0]}`) : e.push(`${i}:in:${[...M].join("|")}`));
    return e.join(", ");
  }
  /**
   * Determine le base URL, avec fallback sur le proxy CORS.
   */
  _getBaseUrl(s) {
    if (s.baseUrl)
      return s.baseUrl;
    const t = ji();
    return `${t.baseUrl}${t.endpoints.tabular}`;
  }
};
a(Ri, "TabularAdapter");
let Li = Ri;
function _t(r, s) {
  const t = {};
  return s && (t.signal = s), r.headers && Object.keys(r.headers).length > 0 && (t.headers = r.headers), t;
}
a(_t, "buildFetchOptions$1");
const $i = class $i {
  constructor() {
    this.type = "grist", this.capabilities = {
      serverFetch: !0,
      serverFacets: !0,
      serverSearch: !1,
      serverGroupBy: !0,
      serverOrderBy: !0,
      whereFormat: "colon"
    }, this._sqlAvailableByHost = /* @__PURE__ */ new Map();
  }
  validate(s) {
    return s.baseUrl ? null : 'attribut "base-url" requis pour les requetes Grist';
  }
  // =========================================================================
  // fetchAll / fetchPage — orchestration Records vs SQL
  // =========================================================================
  async fetchAll(s, t) {
    if (this._needsSqlMode(s) && await this._checkSqlAvailability(s))
      return this._fetchSql(s, void 0, t);
    const e = this.buildUrl(s), i = await fetch(e, _t(s, t));
    if (!i.ok)
      throw new Error(`HTTP ${i.status}: ${i.statusText}`);
    const M = await i.json(), n = this._flattenRecords(M.records || []);
    return {
      data: n,
      totalCount: n.length,
      // Server-side si filter ou sort appliques, sinon client-side
      needsClientProcessing: !s.where && !s.orderBy
    };
  }
  async fetchPage(s, t, e) {
    if (this._needsSqlMode(s, t) && await this._checkSqlAvailability(s))
      return this._fetchSql(s, t, e);
    const i = this.buildServerSideUrl(s, t), M = await fetch(i, _t(s, e));
    if (!M.ok)
      throw new Error(`HTTP ${M.status}: ${M.statusText}`);
    const n = await M.json(), L = this._flattenRecords(n.records || []), d = s.pageSize || L.length, l = L.length < d;
    return {
      data: L,
      totalCount: l ? ((t.page || 1) - 1) * d + L.length : -1,
      needsClientProcessing: !1
    };
  }
  // =========================================================================
  // buildUrl / buildServerSideUrl — Mode Records
  // =========================================================================
  buildUrl(s) {
    const t = new URL(s.baseUrl);
    if (s.where) {
      const e = this._colonWhereToGristFilter(s.where);
      e && t.searchParams.set("filter", JSON.stringify(e));
    }
    return s.orderBy && t.searchParams.set("sort", this._orderByToGristSort(s.orderBy)), s.limit && t.searchParams.set("limit", String(s.limit)), t.toString();
  }
  buildServerSideUrl(s, t) {
    const e = new URL(s.baseUrl), i = t.effectiveWhere || s.where;
    if (i) {
      const n = this._colonWhereToGristFilter(i);
      n && e.searchParams.set("filter", JSON.stringify(n));
    }
    const M = t.orderBy || s.orderBy;
    return M && e.searchParams.set("sort", this._orderByToGristSort(M)), t.page && s.pageSize && (e.searchParams.set("limit", String(s.pageSize)), e.searchParams.set("offset", String((t.page - 1) * s.pageSize))), e.toString();
  }
  // =========================================================================
  // Facettes server-side via SQL GROUP BY + COUNT
  // =========================================================================
  async fetchFacets(s, t, e, i) {
    const M = [], n = s;
    if (!await this._checkSqlAvailability(n))
      return M;
    for (const L of t) {
      const d = this._getTableId(n), l = this._escapeIdentifier(L), o = [];
      let c = `SELECT ${l}, COUNT(*) as cnt FROM ${this._escapeIdentifier(d)}`;
      e && (c += ` WHERE ${this._colonWhereToSql(e, o)}`), c += ` GROUP BY ${l} ORDER BY cnt DESC LIMIT 200`;
      const N = this._getSqlEndpointUrl(n);
      try {
        const T = await fetch(N, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...s.headers || {} },
          body: JSON.stringify({ sql: c, args: o, timeout: 500 }),
          signal: i
        });
        if (!T.ok)
          continue;
        const u = (await T.json()).records || [];
        M.push({
          field: L,
          values: u.map((w) => ({
            value: String(w[0] ?? ""),
            count: Number(w[1]) || 0
          })).filter((w) => w.value !== "")
        });
      } catch {
        continue;
      }
    }
    return M;
  }
  // =========================================================================
  // Search template
  // =========================================================================
  getDefaultSearchTemplate() {
    return null;
  }
  // =========================================================================
  // ProviderConfig + facet where
  // =========================================================================
  getProviderConfig() {
    return nr;
  }
  buildFacetWhere(s, t) {
    const e = [];
    for (const [i, M] of Object.entries(s))
      i === t || M.size === 0 || (M.size === 1 ? e.push(`${i}:eq:${[...M][0]}`) : e.push(`${i}:in:${[...M].join("|")}`));
    return e.join(", ");
  }
  // =========================================================================
  // parseAggregates
  // =========================================================================
  parseAggregates(s) {
    return s.split(",").map((t) => {
      const [e, i, M] = t.trim().split(":");
      return {
        field: e,
        function: i,
        alias: M || `${i}_${e}`
      };
    });
  }
  // =========================================================================
  // Introspection : columns + tables (Etape 3)
  // =========================================================================
  /**
   * Recupere les metadonnees des colonnes d'une table Grist.
   * GET /api/docs/{docId}/tables/{tableId}/columns
   */
  async fetchColumns(s, t) {
    const e = s.baseUrl.replace(/\/records.*$/, "/columns");
    try {
      const i = await fetch(e, _t(s, t));
      return i.ok ? ((await i.json()).columns || []).map((n) => {
        const L = n.fields;
        return {
          id: n.id,
          label: (L == null ? void 0 : L.label) || n.id,
          type: (L == null ? void 0 : L.type) || "Any",
          isFormula: (L == null ? void 0 : L.isFormula) || !1,
          formula: (L == null ? void 0 : L.formula) || ""
        };
      }) : [];
    } catch {
      return [];
    }
  }
  /**
   * Liste les tables d'un document Grist.
   * GET /api/docs/{docId}/tables
   */
  async fetchTables(s, t) {
    const e = s.baseUrl.replace(/\/tables\/[^/]+\/records.*$/, "/tables");
    try {
      const i = await fetch(e, _t(s, t));
      return i.ok ? ((await i.json()).tables || []).map((n) => ({
        id: n.id
      })) : [];
    } catch {
      return [];
    }
  }
  // =========================================================================
  // Mode Records : conversions
  // =========================================================================
  /**
   * Convertit une clause WHERE colon-syntax en objet filtre Grist.
   * Supporte eq et in. Les autres operateurs sont ignores (mode SQL les gere).
   */
  _colonWhereToGristFilter(s) {
    const t = {}, e = s.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of e) {
      const [M, n, ...L] = i.split(":"), d = L.join(":");
      n === "eq" ? t[M] = [d] : n === "in" && (t[M] = d.split("|"));
    }
    return Object.keys(t).length > 0 ? t : null;
  }
  /**
   * Convertit order-by colon-syntax en parametre sort Grist.
   * "population:desc, nom:asc" → "-population,nom"
   */
  _orderByToGristSort(s) {
    return s.split(",").map((t) => {
      const [e, i] = t.trim().split(":");
      return i === "desc" ? `-${e}` : e;
    }).join(",");
  }
  /** Aplatir records[].fields en objets plats */
  _flattenRecords(s) {
    return s.map((t) => {
      const e = t, i = e.fields;
      return i ? { ...i } : e;
    });
  }
  // =========================================================================
  // Mode SQL : detection
  // =========================================================================
  /**
   * Determine si la requete necessite le mode SQL.
   * SQL est active quand group-by, aggregate ou operateurs avances sont demandes.
   */
  _needsSqlMode(s, t) {
    if (s.groupBy || s.aggregate)
      return !0;
    const e = this._mergeWhere(s.where, t == null ? void 0 : t.effectiveWhere);
    return !!(e && this._hasAdvancedOperators(e));
  }
  _hasAdvancedOperators(s) {
    const t = ["gt", "gte", "lt", "lte", "contains", "notcontains", "neq", "isnull", "isnotnull", "notin"];
    return s.split(",").some((e) => {
      const i = e.trim().split(":");
      return i.length >= 2 && t.includes(i[1]);
    });
  }
  _mergeWhere(s, t) {
    return t && s ? `${s}, ${t}` : t || s || "";
  }
  // =========================================================================
  // Mode SQL : execution
  // =========================================================================
  async _fetchSql(s, t, e) {
    const i = this._getTableId(s), { select: M, groupBy: n, where: L, orderBy: d, limit: l, offset: o, args: c } = this._buildSqlQuery(s, t, i), N = [
      `SELECT ${M}`,
      `FROM ${this._escapeIdentifier(i)}`,
      L ? `WHERE ${L}` : "",
      n ? `GROUP BY ${n}` : "",
      d ? `ORDER BY ${d}` : "",
      l ? `LIMIT ${l}` : "",
      o ? `OFFSET ${o}` : ""
    ].filter(Boolean).join(" "), T = this._getSqlEndpointUrl(s), x = await fetch(T, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...s.headers || {}
      },
      body: JSON.stringify({ sql: N, args: c, timeout: 800 }),
      signal: e
    });
    if (!x.ok) {
      if (x.status === 404 || x.status === 403)
        return console.warn("[gouv-widgets] Grist SQL endpoint not available, falling back to client-side processing"), this._sqlAvailableByHost.set(this._extractHostname(s.baseUrl), !1), this._fetchAllRecords(s, e);
      throw new Error(`Grist SQL HTTP ${x.status}: ${x.statusText}`);
    }
    const u = await x.json(), w = this._sqlResultToObjects(u);
    return {
      data: w,
      totalCount: w.length,
      needsClientProcessing: !1
    };
  }
  /** Fetch Records mode (internal fallback) */
  async _fetchAllRecords(s, t) {
    const e = this.buildUrl(s), i = await fetch(e, _t(s, t));
    if (!i.ok)
      throw new Error(`HTTP ${i.status}: ${i.statusText}`);
    const M = await i.json(), n = this._flattenRecords(M.records || []);
    return {
      data: n,
      totalCount: n.length,
      needsClientProcessing: !0
    };
  }
  // =========================================================================
  // Mode SQL : construction de requete
  // =========================================================================
  _buildSqlQuery(s, t, e) {
    const i = [];
    let M = "*", n = "", L = "", d = "", l = "", o = "";
    if (s.groupBy) {
      const T = s.groupBy.split(",").map((x) => this._escapeIdentifier(x.trim()));
      if (n = T.join(", "), s.aggregate) {
        const x = this.parseAggregates(s.aggregate);
        M = [
          ...T,
          ...x.map((w) => `${w.function.toUpperCase()}(${this._escapeIdentifier(w.field)}) as ${this._escapeIdentifier(w.alias || `${w.function}_${w.field}`)}`)
        ].join(", ");
      } else
        M = T.join(", ") + ", COUNT(*) as count";
    }
    const c = this._mergeWhere(s.where, t == null ? void 0 : t.effectiveWhere);
    c && (L = this._colonWhereToSql(c, i));
    const N = (t == null ? void 0 : t.orderBy) || s.orderBy;
    return N && (d = N.split(",").map((T) => {
      const [x, u] = T.trim().split(":");
      return `${this._escapeIdentifier(x)} ${u === "desc" ? "DESC" : "ASC"}`;
    }).join(", ")), t != null && t.page && s.pageSize ? (l = String(s.pageSize), t.page > 1 && (o = String((t.page - 1) * s.pageSize))) : s.limit && (l = String(s.limit)), { select: M, groupBy: n, where: L, orderBy: d, limit: l, offset: o, args: i };
  }
  // =========================================================================
  // Mode SQL : conversion WHERE colon → SQL parametre
  // =========================================================================
  /**
   * Convertit une clause WHERE colon-syntax en SQL parametre.
   * Tous les operateurs sont supportes.
   */
  _colonWhereToSql(s, t) {
    const e = [], i = s.split(",").map((M) => M.trim()).filter(Boolean);
    for (const M of i) {
      const [n, L, ...d] = M.split(":"), l = d.join(":"), o = this._escapeIdentifier(n);
      switch (L) {
        case "eq":
          e.push(`${o} = ?`), t.push(l);
          break;
        case "neq":
          e.push(`${o} != ?`), t.push(l);
          break;
        case "gt":
          e.push(`${o} > ?`), t.push(this._toNumberOrString(l));
          break;
        case "gte":
          e.push(`${o} >= ?`), t.push(this._toNumberOrString(l));
          break;
        case "lt":
          e.push(`${o} < ?`), t.push(this._toNumberOrString(l));
          break;
        case "lte":
          e.push(`${o} <= ?`), t.push(this._toNumberOrString(l));
          break;
        case "contains":
          e.push(`${o} LIKE ?`), t.push(`%${l}%`);
          break;
        case "notcontains":
          e.push(`${o} NOT LIKE ?`), t.push(`%${l}%`);
          break;
        case "in": {
          const c = l.split("|");
          e.push(`${o} IN (${c.map(() => "?").join(",")})`), t.push(...c);
          break;
        }
        case "notin": {
          const c = l.split("|");
          e.push(`${o} NOT IN (${c.map(() => "?").join(",")})`), t.push(...c);
          break;
        }
        case "isnull":
          e.push(`${o} IS NULL`);
          break;
        case "isnotnull":
          e.push(`${o} IS NOT NULL`);
          break;
      }
    }
    return e.join(" AND ");
  }
  // =========================================================================
  // Mode SQL : parsing reponse
  // =========================================================================
  /**
   * Convertit le format reponse SQL Grist en tableau d'objets.
   * Input:  { records: [[v1, v2], [v3, v4]], columns: ["col1", "col2"] }
   * Output: [{ col1: v1, col2: v2 }, { col1: v3, col2: v4 }]
   */
  _sqlResultToObjects(s) {
    const { records: t = [], columns: e = [] } = s;
    return t.map((i) => {
      const M = {};
      return e.forEach((n, L) => {
        M[n] = i[L];
      }), M;
    });
  }
  // =========================================================================
  // Mode SQL : utilitaires
  // =========================================================================
  /**
   * Derive l'URL du endpoint SQL depuis le baseUrl Records.
   * baseUrl : .../api/docs/{docId}/tables/{tableId}/records
   * sqlUrl  : .../api/docs/{docId}/sql
   */
  _getSqlEndpointUrl(s) {
    const t = s.baseUrl;
    if (!t.match(/\/api\/docs\/([^/]+)/))
      throw new Error("Cannot derive SQL endpoint from Grist URL: " + t);
    return t.replace(/\/tables\/[^/]+\/records.*$/, "/sql");
  }
  /**
   * Extrait le nom de la table depuis le baseUrl.
   */
  _getTableId(s) {
    const t = s.baseUrl.match(/\/tables\/([^/]+)/);
    if (!t)
      throw new Error("Cannot extract table ID from Grist URL: " + s.baseUrl);
    return t[1];
  }
  /**
   * Echappe un identifiant SQL avec des guillemets doubles (standard SQLite).
   * Supporte les noms avec espaces et accents.
   */
  _escapeIdentifier(s) {
    const t = s.trim();
    if (!t)
      throw new Error("Empty SQL identifier");
    return `"${t.replace(/"/g, '""')}"`;
  }
  _toNumberOrString(s) {
    const t = Number(s);
    return !isNaN(t) && s.trim() !== "" ? t : s;
  }
  // =========================================================================
  // SQL availability check (per hostname cache)
  // =========================================================================
  async _checkSqlAvailability(s) {
    const t = this._extractHostname(s.baseUrl), e = this._sqlAvailableByHost.get(t);
    if (e !== void 0)
      return e;
    try {
      const i = this._getSqlEndpointUrl(s), n = (await fetch(i + "?q=SELECT%201", {
        method: "GET",
        headers: s.headers || {},
        signal: AbortSignal.timeout(2e3)
      })).ok;
      return this._sqlAvailableByHost.set(t, n), n || console.info(`[gouv-widgets] Grist SQL endpoint not available on ${t} — using client-side processing`), n;
    } catch {
      return this._sqlAvailableByHost.set(t, !1), console.info(`[gouv-widgets] Grist SQL endpoint not available on ${t} — using client-side processing`), !1;
    }
  }
  _extractHostname(s) {
    try {
      return new URL(s).hostname;
    } catch {
      return s;
    }
  }
};
a($i, "GristAdapter");
let ai = $i;
const wM = "https://api.insee.fr/melodi", bM = 1e3, Be = 100;
function uM(r, s) {
  const t = {};
  return s && (t.signal = s), r.headers && Object.keys(r.headers).length > 0 && (t.headers = r.headers), t;
}
a(uM, "buildFetchOptions");
const Zi = class Zi {
  constructor() {
    this.type = "insee", this.capabilities = {
      serverFetch: !0,
      serverFacets: !1,
      serverSearch: !1,
      serverGroupBy: !1,
      serverOrderBy: !1,
      whereFormat: "colon"
    };
  }
  validate(s) {
    return s.datasetId ? null : 'attribut "dataset-id" requis pour les requetes INSEE Melodi';
  }
  /**
   * Fetch all data with automatic page-based pagination.
   *
   * INSEE Melodi uses `page=N` (1-based) and `maxResult=N` for pagination.
   * The `paging.count` field gives total records, `paging.isLast` signals the last page.
   */
  async fetchAll(s, t) {
    var d;
    const e = s.pageSize > 0 ? s.pageSize : bM, M = s.limit <= 0 ? Be * e : s.limit;
    let n = [], L = -1;
    for (let l = 1; l <= Be; l++) {
      const o = M - n.length;
      if (o <= 0)
        break;
      const c = Math.min(e, o), N = this.buildUrl(s, c, l), T = await fetch(N, uM(s, t));
      if (!T.ok)
        throw new Error(`HTTP ${T.status}: ${T.statusText}`);
      const x = await T.json(), u = x.observations || [], w = this._flattenObservations(u);
      if (n = n.concat(w), x.paging && typeof x.paging.count == "number" && (L = x.paging.count), ((d = x.paging) == null ? void 0 : d.isLast) === !0 || L >= 0 && n.length >= L || u.length < c)
        break;
    }
    return L >= 0 && n.length < L && n.length < M && console.warn(`gouv-source[insee]: pagination incomplete - ${n.length}/${L} resultats (limite: ${Be} pages de ${e})`), {
      data: n,
      totalCount: L >= 0 ? L : n.length,
      needsClientProcessing: !0
      // all processing is client-side
    };
  }
  /**
   * Fetch a single page in server-side pagination mode.
   */
  async fetchPage(s, t, e) {
    var o;
    const i = this.buildServerSideUrl(s, t), M = await fetch(i, uM(s, e));
    if (!M.ok)
      throw new Error(`HTTP ${M.status}: ${M.statusText}`);
    const n = await M.json(), L = n.observations || [], d = this._flattenObservations(L), l = ((o = n.paging) == null ? void 0 : o.count) ?? 0;
    return {
      data: d,
      totalCount: l,
      needsClientProcessing: !0,
      rawJson: n
    };
  }
  /**
   * Build a full-fetch URL for INSEE Melodi.
   *
   * URL pattern: https://api.insee.fr/melodi/data/{datasetId}?maxResult=N&page=P&totalCount=TRUE&DIM=VAL
   *
   * Colon-syntax `where` is converted to dimension query params:
   * "TIME_PERIOD:eq:2023, GEO:eq:FRANCE-F" → &TIME_PERIOD=2023&GEO=FRANCE-F
   */
  buildUrl(s, t, e) {
    const i = s.baseUrl || wM, M = new URL(`${i}/data/${s.datasetId}`), n = t ?? (s.limit > 0 ? s.limit : bM);
    M.searchParams.set("maxResult", String(n)), M.searchParams.set("totalCount", "TRUE"), e && e > 0 && M.searchParams.set("page", String(e));
    const L = s.where || s.filter;
    return L && this._applyDimensionFilters(M, L), M.toString();
  }
  /**
   * Build a server-side URL for a single page.
   */
  buildServerSideUrl(s, t) {
    const e = s.baseUrl || wM, i = new URL(`${e}/data/${s.datasetId}`);
    return i.searchParams.set("maxResult", String(s.pageSize)), i.searchParams.set("totalCount", "TRUE"), i.searchParams.set("page", String(t.page)), t.effectiveWhere && this._applyDimensionFilters(i, t.effectiveWhere), i.toString();
  }
  getDefaultSearchTemplate() {
    return null;
  }
  getProviderConfig() {
    return ar;
  }
  buildFacetWhere(s, t) {
    const e = [];
    for (const [i, M] of Object.entries(s))
      i === t || M.size === 0 || (M.size === 1 ? e.push(`${i}:eq:${[...M][0]}`) : e.push(`${i}:in:${[...M].join("|")}`));
    return e.join(", ");
  }
  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------
  /**
   * Flatten INSEE observations into flat objects.
   *
   * Input:  { dimensions: {GEO: "...", FREQ: "A"}, measures: {OBS_VALUE_NIVEAU: {value: 123}}, attributes: {OBS_STATUS: "A"} }
   * Output: { GEO: "...", FREQ: "A", OBS_VALUE: 123, OBS_STATUS: "A" }
   */
  _flattenObservations(s) {
    return s.map((t) => {
      const e = t, i = {}, M = e.dimensions;
      if (M)
        for (const [d, l] of Object.entries(M))
          i[d] = l;
      const n = e.measures;
      if (n)
        for (const [d, l] of Object.entries(n)) {
          const o = l;
          if (o && "value" in o) {
            const c = d.replace(/_NIVEAU$/, "");
            i[c] = o.value;
          }
        }
      const L = e.attributes;
      if (L)
        for (const [d, l] of Object.entries(L))
          i[d] = l;
      return i;
    });
  }
  /**
   * Convert colon-syntax where clause to INSEE dimension query params.
   *
   * "TIME_PERIOD:eq:2023, GEO:eq:FRANCE-F" → url.searchParams.append('TIME_PERIOD', '2023') + url.searchParams.append('GEO', 'FRANCE-F')
   *
   * For multi-value (in operator): "GEO:in:FRANCE-F|FRANCE-M" → append GEO=FRANCE-F and GEO=FRANCE-M
   *
   * INSEE only supports equality filtering via query params,
   * so only `eq` and `in` operators are mapped. Others are ignored
   * (client-side gouv-query handles advanced filtering).
   */
  _applyDimensionFilters(s, t) {
    const e = t.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of e) {
      const M = i.split(":");
      if (M.length < 3) {
        M.length === 2 && s.searchParams.append(M[0], M[1]);
        continue;
      }
      const [n, L, ...d] = M, l = d.join(":");
      switch (L) {
        case "eq":
          s.searchParams.append(n, l);
          break;
        case "in": {
          const o = l.split("|");
          for (const c of o)
            s.searchParams.append(n, c);
          break;
        }
      }
    }
  }
};
a(Zi, "InseeAdapter");
let oi = Zi;
const or = /* @__PURE__ */ new Map([
  ["generic", new ri()],
  ["opendatasoft", new ni()],
  ["tabular", new Li()],
  ["grist", new ai()],
  ["insee", new oi()]
]);
function Ln(r) {
  const s = or.get(r);
  if (!s)
    throw new Error(`Type d'API non supporte: ${r}`);
  return s;
}
a(Ln, "getAdapter");
function S0(r) {
  or.set(r.type, r);
}
a(S0, "registerAdapter");
const cs = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading",
  SOURCE_COMMAND: "gouv-source-command"
}, Ci = /* @__PURE__ */ new Map(), Oi = /* @__PURE__ */ new Map();
function an(r, s) {
  Ci.set(r, s);
}
a(an, "setDataCache");
function Rs(r) {
  return Ci.get(r);
}
a(Rs, "getDataCache");
function ie(r) {
  Ci.delete(r);
}
a(ie, "clearDataCache");
function Js(r, s) {
  Oi.set(r, s);
}
a(Js, "setDataMeta");
function $s(r) {
  return Oi.get(r);
}
a($s, "getDataMeta");
function Ei(r) {
  Oi.delete(r);
}
a(Ei, "clearDataMeta");
function Ns(r, s) {
  an(r, s);
  const t = new CustomEvent(cs.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: r, data: s }
  });
  document.dispatchEvent(t);
}
a(Ns, "dispatchDataLoaded");
function Xs(r, s) {
  const t = new CustomEvent(cs.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: r, error: s }
  });
  document.dispatchEvent(t);
}
a(Xs, "dispatchDataError");
function ms(r) {
  const s = new CustomEvent(cs.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: r }
  });
  document.dispatchEvent(s);
}
a(ms, "dispatchDataLoading");
function zs(r, s) {
  const t = new CustomEvent(cs.SOURCE_COMMAND, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: r, ...s }
  });
  document.dispatchEvent(t);
}
a(zs, "dispatchSourceCommand");
function Ee(r, s) {
  const t = /* @__PURE__ */ a((e) => {
    const i = e;
    if (i.detail.sourceId === r) {
      const { sourceId: M, ...n } = i.detail;
      s(n);
    }
  }, "handler");
  return document.addEventListener(cs.SOURCE_COMMAND, t), () => document.removeEventListener(cs.SOURCE_COMMAND, t);
}
a(Ee, "subscribeToSourceCommands");
function Me(r, s) {
  const t = /* @__PURE__ */ a((M) => {
    const n = M;
    n.detail.sourceId === r && s.onLoaded && s.onLoaded(n.detail.data);
  }, "handleLoaded"), e = /* @__PURE__ */ a((M) => {
    const n = M;
    n.detail.sourceId === r && s.onError && s.onError(n.detail.error);
  }, "handleError"), i = /* @__PURE__ */ a((M) => {
    M.detail.sourceId === r && s.onLoading && s.onLoading();
  }, "handleLoading");
  return document.addEventListener(cs.LOADED, t), document.addEventListener(cs.ERROR, e), document.addEventListener(cs.LOADING, i), () => {
    document.removeEventListener(cs.LOADED, t), document.removeEventListener(cs.ERROR, e), document.removeEventListener(cs.LOADING, i);
  };
}
a(Me, "subscribeToSource");
var U = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, Lt;
let _ = (Lt = class extends Q {
  constructor() {
    super(...arguments), this.url = "", this.method = "GET", this.headers = "", this.params = "", this.refresh = 0, this.transform = "", this.paginate = !1, this.pageSize = 20, this.cacheTtl = 3600, this.useProxy = !1, this.data = "", this.apiType = "generic", this.baseUrl = "", this.datasetId = "", this.resource = "", this.where = "", this.select = "", this.groupBy = "", this.aggregate = "", this.orderBy = "", this.serverSide = !1, this.limit = 0, this._loading = !1, this._error = null, this._data = null, this._currentPage = 1, this._refreshInterval = null, this._abortController = null, this._unsubscribeCommands = null, this._whereOverlays = /* @__PURE__ */ new Map(), this._orderByOverlay = "", this._groupByOverlay = "", this._aggregateOverlay = "", this._adapter = null;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return z``;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-source", this._isAdapterMode() ? this.apiType : void 0), this._setupRefresh(), this._setupCommandListener();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && (ie(this.id), Ei(this.id));
  }
  updated(s) {
    if (s.has("data") && this.data) {
      this._dispatchInlineData();
      return;
    }
    const t = s.has("url") || s.has("params") || s.has("transform"), e = s.has("apiType") || s.has("baseUrl") || s.has("datasetId") || s.has("resource") || s.has("where") || s.has("select") || s.has("groupBy") || s.has("aggregate") || s.has("orderBy") || s.has("limit");
    (t || e) && ((this.paginate || this.serverSide) && (s.has("url") || s.has("params") || e) && (this._currentPage = 1), s.has("apiType") && (this._adapter = null), this._fetchData()), s.has("refresh") && this._setupRefresh(), (s.has("paginate") || s.has("pageSize") || s.has("serverSide") || s.has("apiType")) && this._setupCommandListener();
  }
  // --- Public API ---
  /** Returns the adapter for this source (if in adapter mode) */
  getAdapter() {
    return this._isAdapterMode() ? (this._adapter || (this._adapter = Ln(this.apiType)), this._adapter) : null;
  }
  /** Returns the effective WHERE clause (static + all dynamic overlays merged) */
  getEffectiveWhere(s) {
    const t = [];
    this.where && t.push(this.where);
    for (const [M, n] of this._whereOverlays)
      M !== s && n && t.push(n);
    const e = this.getAdapter(), i = (e == null ? void 0 : e.capabilities.whereFormat) === "odsql" ? " AND " : ", ";
    return t.join(i);
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
  // --- Private methods ---
  _dispatchInlineData() {
    if (!this.id) {
      console.warn('gouv-source: attribut "id" requis pour identifier la source');
      return;
    }
    try {
      const s = JSON.parse(this.data);
      this._data = s, Ns(this.id, this._data);
    } catch (s) {
      this._error = new Error("Donnees inline invalides (JSON attendu)"), Xs(this.id, this._error), console.error(`gouv-source[${this.id}]: JSON invalide dans data`, s);
    }
  }
  _isAdapterMode() {
    return this.apiType !== "generic" || this.apiType === "generic" && !this.url && this.baseUrl !== "";
  }
  _cleanup() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = null), this._abortController && (this._abortController.abort(), this._abortController = null), this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null);
  }
  _setupRefresh() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = null), this.refresh > 0 && (this._refreshInterval = window.setInterval(() => {
      this._fetchData();
    }, this.refresh * 1e3));
  }
  _setupCommandListener() {
    this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), !(!this.id || !(this.paginate || this.serverSide || this._isAdapterMode())) && (this._unsubscribeCommands = Ee(this.id, (t) => {
      let e = !1;
      if (t.page !== void 0 && t.page !== this._currentPage && (this._currentPage = t.page, e = !0), t.where !== void 0) {
        const i = t.whereKey || "__default";
        t.where ? this._whereOverlays.set(i, t.where) : this._whereOverlays.delete(i), this._currentPage = 1, e = !0;
      }
      t.orderBy !== void 0 && t.orderBy !== this._orderByOverlay && (this._orderByOverlay = t.orderBy, e = !0), t.groupBy !== void 0 && t.groupBy !== this._groupByOverlay && (this._groupByOverlay = t.groupBy, e = !0), t.aggregate !== void 0 && t.aggregate !== this._aggregateOverlay && (this._aggregateOverlay = t.aggregate, e = !0), e && this._fetchData();
    }));
  }
  async _fetchData() {
    return this._isAdapterMode() ? this._fetchViaAdapter() : this._fetchViaUrl();
  }
  // --- URL mode (legacy, unchanged behavior) ---
  async _fetchViaUrl() {
    var s, t;
    if (this.url) {
      if (!this.id) {
        console.warn('gouv-source: attribut "id" requis pour identifier la source');
        return;
      }
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, ms(this.id);
      try {
        const e = this._buildUrl();
        let i = Pr(e);
        const M = this._buildFetchOptions();
        if (this.useProxy && i === e) {
          const d = Gr(i, M.headers);
          i = d.url, M.headers = d.headers;
        }
        const n = await fetch(i, {
          ...M,
          signal: this._abortController.signal
        });
        if (!n.ok)
          throw new Error(`HTTP ${n.status}: ${n.statusText}`);
        let L;
        try {
          L = await n.json();
        } catch {
          const d = ((t = (s = n.headers) == null ? void 0 : s.get) == null ? void 0 : t.call(s, "content-type")) || "unknown";
          throw new Error(`Reponse non-JSON (content-type: ${d}) — verifiez l'URL ou la configuration du proxy`);
        }
        this.paginate && L.meta && Js(this.id, {
          page: L.meta.page ?? this._currentPage,
          pageSize: L.meta.page_size ?? this.pageSize,
          total: L.meta.total ?? 0
        }), this.transform ? this._data = $(L, this.transform) : this.paginate && L.data && !this.transform ? this._data = L.data : this._data = L, Ns(this.id, this._data), this.cacheTtl > 0 && le() && this._putCache(this._data).catch(() => {
        });
      } catch (e) {
        if (e.name === "AbortError")
          return;
        if (this.cacheTtl > 0 && le()) {
          const i = await this._getCache();
          if (i) {
            this._data = i, Ns(this.id, this._data), this.dispatchEvent(new CustomEvent("cache-fallback", { detail: { sourceId: this.id } }));
            return;
          }
        }
        this._error = e, Xs(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, e);
      } finally {
        this._loading = !1;
      }
    }
  }
  // --- Adapter mode (new) ---
  async _fetchViaAdapter() {
    if (!this.id) {
      console.warn('gouv-source: attribut "id" requis pour identifier la source');
      return;
    }
    const s = this.getAdapter();
    if (!s) {
      console.warn(`gouv-source[${this.id}]: adapter introuvable pour api-type="${this.apiType}"`);
      return;
    }
    const t = this._getAdapterParams(), e = s.validate(t);
    if (e) {
      console.warn(`gouv-source[${this.id}]: ${e}`);
      return;
    }
    this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, ms(this.id);
    try {
      let i;
      if (this.serverSide) {
        const M = {
          page: this._currentPage,
          effectiveWhere: this.getEffectiveWhere(),
          orderBy: this._orderByOverlay || this.orderBy
        };
        i = await s.fetchPage(t, M, this._abortController.signal), Js(this.id, {
          page: this._currentPage,
          pageSize: this.pageSize,
          total: i.totalCount,
          needsClientProcessing: i.needsClientProcessing
        });
      } else
        i = await s.fetchAll(t, this._abortController.signal), Js(this.id, {
          page: 1,
          pageSize: 0,
          total: i.totalCount,
          needsClientProcessing: i.needsClientProcessing
        });
      this._data = i.data, Ns(this.id, this._data), this.cacheTtl > 0 && le() && this._putCache(this._data).catch(() => {
      });
    } catch (i) {
      if (i.name === "AbortError")
        return;
      if (this.cacheTtl > 0 && le()) {
        const M = await this._getCache();
        if (M) {
          this._data = M, Ns(this.id, this._data), this.dispatchEvent(new CustomEvent("cache-fallback", { detail: { sourceId: this.id } }));
          return;
        }
      }
      this._error = i, Xs(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, i);
    } finally {
      this._loading = !1;
    }
  }
  _getAdapterParams() {
    let s;
    if (this.headers)
      try {
        s = JSON.parse(this.headers);
      } catch {
      }
    return {
      baseUrl: this.baseUrl,
      datasetId: this.datasetId,
      resource: this.resource,
      select: this.select,
      where: this.getEffectiveWhere(),
      filter: "",
      groupBy: this._groupByOverlay || this.groupBy,
      aggregate: this._aggregateOverlay || this.aggregate,
      orderBy: this._orderByOverlay || this.orderBy,
      limit: this.limit,
      transform: this.transform,
      pageSize: this.pageSize,
      headers: s
    };
  }
  // --- URL building (legacy mode) ---
  _buildUrl() {
    const s = window.location.origin !== "null" ? window.location.origin : void 0, t = new URL(this.url, s);
    if (this.params && this.method === "GET")
      try {
        const e = JSON.parse(this.params);
        Object.entries(e).forEach(([i, M]) => {
          t.searchParams.set(i, String(M));
        });
      } catch (e) {
        console.warn("gouv-source: params invalides (JSON attendu)", e);
      }
    return this.paginate && (t.searchParams.set("page", String(this._currentPage)), t.searchParams.set("page_size", String(this.pageSize))), t.toString();
  }
  _buildFetchOptions() {
    const s = {
      method: this.method
    };
    if (this.headers)
      try {
        s.headers = JSON.parse(this.headers);
      } catch (t) {
        console.warn("gouv-source: headers invalides (JSON attendu)", t);
      }
    return this.method === "POST" && this.params && (s.headers = {
      "Content-Type": "application/json",
      ...s.headers || {}
    }, s.body = this.params), s;
  }
  // --- Server cache (DB mode) ---
  async _putCache(s) {
    const t = Array.isArray(s) ? s.length : 1;
    await fetch(`/api/cache/${encodeURIComponent(this.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ data: s, recordCount: t, ttlSeconds: this.cacheTtl })
    });
  }
  async _getCache() {
    try {
      const s = await fetch(`/api/cache/${encodeURIComponent(this.id)}`, {
        credentials: "include"
      });
      return s.ok ? (await s.json()).data ?? null : null;
    } catch {
      return null;
    }
  }
}, a(Lt, "GouvSource"), Lt);
U([
  y({ type: String })
], _.prototype, "url", void 0);
U([
  y({ type: String })
], _.prototype, "method", void 0);
U([
  y({ type: String })
], _.prototype, "headers", void 0);
U([
  y({ type: String })
], _.prototype, "params", void 0);
U([
  y({ type: Number })
], _.prototype, "refresh", void 0);
U([
  y({ type: String })
], _.prototype, "transform", void 0);
U([
  y({ type: Boolean })
], _.prototype, "paginate", void 0);
U([
  y({ type: Number, attribute: "page-size" })
], _.prototype, "pageSize", void 0);
U([
  y({ type: Number, attribute: "cache-ttl" })
], _.prototype, "cacheTtl", void 0);
U([
  y({ type: Boolean, attribute: "use-proxy" })
], _.prototype, "useProxy", void 0);
U([
  y({ type: String })
], _.prototype, "data", void 0);
U([
  y({ type: String, attribute: "api-type" })
], _.prototype, "apiType", void 0);
U([
  y({ type: String, attribute: "base-url" })
], _.prototype, "baseUrl", void 0);
U([
  y({ type: String, attribute: "dataset-id" })
], _.prototype, "datasetId", void 0);
U([
  y({ type: String })
], _.prototype, "resource", void 0);
U([
  y({ type: String })
], _.prototype, "where", void 0);
U([
  y({ type: String })
], _.prototype, "select", void 0);
U([
  y({ type: String, attribute: "group-by" })
], _.prototype, "groupBy", void 0);
U([
  y({ type: String })
], _.prototype, "aggregate", void 0);
U([
  y({ type: String, attribute: "order-by" })
], _.prototype, "orderBy", void 0);
U([
  y({ type: Boolean, attribute: "server-side" })
], _.prototype, "serverSide", void 0);
U([
  y({ type: Number })
], _.prototype, "limit", void 0);
U([
  D()
], _.prototype, "_loading", void 0);
U([
  D()
], _.prototype, "_error", void 0);
U([
  D()
], _.prototype, "_data", void 0);
_ = U([
  ss("gouv-source")
], _);
var Ms = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, at;
let ts = (at = class extends Q {
  constructor() {
    super(...arguments), this.source = "", this.where = "", this.filter = "", this.groupBy = "", this.aggregate = "", this.orderBy = "", this.limit = 0, this.transform = "", this.serverSide = !1, this.pageSize = 20, this.refresh = 0, this._loading = !1, this._error = null, this._data = [], this._rawData = [], this._refreshInterval = null, this._unsubscribe = null, this._unsubscribeCommands = null, this._serverDelegated = {
      groupBy: !1,
      aggregate: !1,
      orderBy: !1
    };
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return z``;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-query"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearServerDelegation(), this._cleanup(), this.id && (ie(this.id), Ei(this.id));
  }
  updated(s) {
    [
      "source",
      "where",
      "filter",
      "groupBy",
      "aggregate",
      "orderBy",
      "limit",
      "transform",
      "serverSide",
      "pageSize"
    ].some((e) => s.has(e)) && this._initialize(), s.has("refresh") && this._setupRefresh();
  }
  _cleanup() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null);
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
    if (this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), !this.source) {
      console.warn(`gouv-query[${this.id}]: attribut "source" requis`);
      return;
    }
    this._negotiateServerSide(), this._subscribeToSourceData(this.source), this._setupCommandForwarding();
  }
  // --- Server-side negotiation ---
  /**
   * Check upstream adapter capabilities and delegate operations server-side
   * when possible. Sends commands to gouv-source with groupBy/aggregate/orderBy
   * so the adapter handles them in the API request.
   *
   * Falls back to client-side for operations the adapter can't handle,
   * or when gouv-source already has its own groupBy/aggregate attributes.
   */
  _negotiateServerSide() {
    var d;
    this._serverDelegated = { groupBy: !1, aggregate: !1, orderBy: !1 };
    const s = document.getElementById(this.source);
    if (!s || !("getAdapter" in s))
      return;
    const t = (d = s.getAdapter) == null ? void 0 : d.call(s);
    if (!(t != null && t.capabilities))
      return;
    const e = t.capabilities, i = s.groupBy || "", M = s.aggregate || "", n = {};
    this.groupBy && e.serverGroupBy && !i && !M && (n.groupBy = this.groupBy, this._serverDelegated.groupBy = !0, this.aggregate && (n.aggregate = this.aggregate, this._serverDelegated.aggregate = !0));
    const L = s.orderBy || "";
    this.orderBy && e.serverOrderBy && !L && (n.orderBy = this.orderBy, this._serverDelegated.orderBy = !0), Object.keys(n).length > 0 && zs(this.source, n);
  }
  /**
   * Clear server-side overlays on gouv-source (disconnect cleanup).
   * Sends empty values so gouv-source reverts to its own attributes.
   */
  _clearServerDelegation() {
    if (!this.source || !this._hasServerDelegation())
      return;
    const s = {};
    this._serverDelegated.groupBy && (s.groupBy = ""), this._serverDelegated.aggregate && (s.aggregate = ""), this._serverDelegated.orderBy && (s.orderBy = ""), Object.keys(s).length > 0 && zs(this.source, s), this._serverDelegated = { groupBy: !1, aggregate: !1, orderBy: !1 };
  }
  /**
   * Returns true if we delegated any operation server-side.
   */
  _hasServerDelegation() {
    return this._serverDelegated.groupBy || this._serverDelegated.aggregate || this._serverDelegated.orderBy;
  }
  // --- Source subscription ---
  _subscribeToSourceData(s) {
    if (!this._hasServerDelegation()) {
      const t = Rs(s);
      t !== void 0 && (this._rawData = Array.isArray(t) ? t : [t], this._handleSourceData());
    }
    this._unsubscribe = Me(s, {
      onLoaded: /* @__PURE__ */ a((t) => {
        this._rawData = Array.isArray(t) ? t : [t], this._handleSourceData();
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ a(() => {
        this._loading = !0, ms(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ a((t) => {
        this._error = t, this._loading = !1, Xs(this.id, t);
      }, "onError")
    });
  }
  /**
   * Handle data received from upstream source.
   */
  _handleSourceData() {
    try {
      ms(this.id), this._loading = !0, this._processClientSide();
    } catch (s) {
      this._error = s, Xs(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de traitement`, s);
    } finally {
      this._loading = !1;
    }
  }
  // --- Client-side processing ---
  /**
   * Traitement des donnees : applique client-side uniquement les operations
   * qui n'ont pas ete delegues server-side.
   *
   * Si needsClientProcessing est true dans la meta de la source,
   * ca signifie que l'adapter n'a pas pu traiter server-side (ex: Grist SQL
   * indisponible) — on fait le fallback client-side.
   */
  _processClientSide() {
    let s = [...this._rawData];
    const t = $s(this.source), e = (t == null ? void 0 : t.needsClientProcessing) === !0, i = this.filter || this.where;
    i && (s = this._applyFilters(s, i)), this.groupBy && (!this._serverDelegated.groupBy || e) && (s = this._applyGroupByAndAggregate(s)), this.orderBy && (!this._serverDelegated.orderBy || e) && (s = this._applySort(s)), this.limit > 0 && (s = s.slice(0, this.limit)), this._data = s, Ns(this.id, this._data);
  }
  /**
   * Parse et applique les filtres (format: "field:operator:value")
   */
  _applyFilters(s, t) {
    const e = this._parseFilters(t);
    return s.filter((i) => e.every((M) => this._matchesFilter(i, M)));
  }
  _parseFilters(s) {
    const t = [], e = s.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of e) {
      const M = i.split(":");
      if (M.length >= 2) {
        const n = M[0], L = M[1];
        let d;
        if (M.length > 2) {
          const l = M.slice(2).join(":");
          L === "in" || L === "notin" ? d = l.split("|").map((o) => {
            const c = this._parseValue(o);
            return typeof c == "boolean" ? String(c) : c;
          }) : d = this._parseValue(l);
        }
        t.push({ field: n, operator: L, value: d });
      }
    }
    return t;
  }
  _parseValue(s) {
    return s === "true" ? !0 : s === "false" ? !1 : !isNaN(Number(s)) && s !== "" ? Number(s) : s;
  }
  _matchesFilter(s, t) {
    const e = $(s, t.field);
    switch (t.operator) {
      case "eq":
        return e == t.value;
      case "neq":
        return e != t.value;
      case "gt":
        return Number(e) > Number(t.value);
      case "gte":
        return Number(e) >= Number(t.value);
      case "lt":
        return Number(e) < Number(t.value);
      case "lte":
        return Number(e) <= Number(t.value);
      case "contains":
        return String(e).toLowerCase().includes(String(t.value).toLowerCase());
      case "notcontains":
        return !String(e).toLowerCase().includes(String(t.value).toLowerCase());
      case "in":
        return Array.isArray(t.value) && t.value.includes(e);
      case "notin":
        return Array.isArray(t.value) && !t.value.includes(e);
      case "isnull":
        return e == null;
      case "isnotnull":
        return e != null;
      default:
        return !0;
    }
  }
  /**
   * Applique le GROUP BY et les agregations
   */
  _applyGroupByAndAggregate(s) {
    const t = this.groupBy.split(",").map((n) => n.trim()).filter(Boolean), e = this._parseAggregates(this.aggregate), i = /* @__PURE__ */ new Map();
    for (const n of s) {
      const L = t.map((d) => String($(n, d) ?? "")).join("|||");
      i.has(L) || i.set(L, []), i.get(L).push(n);
    }
    const M = [];
    for (const [n, L] of i) {
      const d = {}, l = n.split("|||");
      t.forEach((o, c) => {
        oM(d, o, l[c]);
      });
      for (const o of e) {
        const c = o.alias || `${o.field}__${o.function}`;
        oM(d, c, this._computeAggregate(L, o));
      }
      M.push(d);
    }
    return M;
  }
  _parseAggregates(s) {
    if (!s)
      return [];
    const t = [], e = s.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of e) {
      const M = i.split(":");
      M.length >= 2 && t.push({
        field: M[0],
        function: M[1],
        alias: M[2]
      });
    }
    return t;
  }
  _computeAggregate(s, t) {
    const e = s.map((i) => Number($(i, t.field))).filter((i) => !isNaN(i));
    switch (t.function) {
      case "count":
        return s.length;
      case "sum":
        return e.reduce((i, M) => i + M, 0);
      case "avg":
        return e.length > 0 ? e.reduce((i, M) => i + M, 0) / e.length : 0;
      case "min":
        return e.length > 0 ? Math.min(...e) : 0;
      case "max":
        return e.length > 0 ? Math.max(...e) : 0;
      default:
        return 0;
    }
  }
  /**
   * Applique le tri
   */
  _applySort(s) {
    const t = this.orderBy.split(":");
    if (t.length < 1)
      return s;
    const e = t[0], i = (t[1] || "asc").toLowerCase();
    return [...s].sort((M, n) => {
      const L = $(M, e), d = $(n, e), l = Number(L), o = Number(d);
      if (!isNaN(l) && !isNaN(o))
        return i === "desc" ? o - l : l - o;
      const c = String(L ?? ""), N = String(d ?? "");
      return i === "desc" ? N.localeCompare(c) : c.localeCompare(N);
    });
  }
  // --- Command forwarding ---
  /**
   * Forward commands from downstream components to the upstream source.
   * In server-side mode, datalist/search/facets send commands to this query;
   * we forward them to the actual gouv-source.
   */
  _setupCommandForwarding() {
    this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), !(!this.id || !this.serverSide) && this.source && (this._unsubscribeCommands = Ee(this.id, (s) => {
      zs(this.source, s);
    }));
  }
  // --- Public API ---
  /**
   * Retourne le where effectif complet (statique + dynamique).
   * Delegue a la source amont si disponible.
   */
  getEffectiveWhere(s) {
    if (this.source) {
      const t = document.getElementById(this.source);
      if (t && "getEffectiveWhere" in t)
        return t.getEffectiveWhere(s);
    }
    return this.where || this.filter || "";
  }
  /**
   * Retourne l'adapter courant (delegue a la source amont)
   */
  getAdapter() {
    if (this.source) {
      const s = document.getElementById(this.source);
      if (s && "getAdapter" in s)
        return s.getAdapter();
    }
    return null;
  }
  /**
   * Force le rechargement des donnees
   */
  reload() {
    if (this.source) {
      const s = Rs(this.source);
      s !== void 0 && (this._rawData = Array.isArray(s) ? s : [s], this._handleSourceData());
    }
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
}, a(at, "GouvQuery"), at);
Ms([
  y({ type: String })
], ts.prototype, "source", void 0);
Ms([
  y({ type: String })
], ts.prototype, "where", void 0);
Ms([
  y({ type: String })
], ts.prototype, "filter", void 0);
Ms([
  y({ type: String, attribute: "group-by" })
], ts.prototype, "groupBy", void 0);
Ms([
  y({ type: String })
], ts.prototype, "aggregate", void 0);
Ms([
  y({ type: String, attribute: "order-by" })
], ts.prototype, "orderBy", void 0);
Ms([
  y({ type: Number })
], ts.prototype, "limit", void 0);
Ms([
  y({ type: String })
], ts.prototype, "transform", void 0);
Ms([
  y({ type: Boolean, attribute: "server-side" })
], ts.prototype, "serverSide", void 0);
Ms([
  y({ type: Number, attribute: "page-size" })
], ts.prototype, "pageSize", void 0);
Ms([
  y({ type: Number })
], ts.prototype, "refresh", void 0);
Ms([
  D()
], ts.prototype, "_loading", void 0);
Ms([
  D()
], ts.prototype, "_error", void 0);
Ms([
  D()
], ts.prototype, "_data", void 0);
Ms([
  D()
], ts.prototype, "_rawData", void 0);
ts = Ms([
  ss("gouv-query")
], ts);
var hs = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, ot;
let ws = (ot = class extends Q {
  constructor() {
    super(...arguments), this.source = "", this.numeric = "", this.numericAuto = !1, this.rename = "", this.trim = !1, this.stripHtml = !1, this.replace = "", this.replaceFields = "", this.flatten = "", this.lowercaseKeys = !1, this._unsubscribe = null, this._unsubscribePageRequests = null;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return z``;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-normalize"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null), this.id && (ie(this.id), Ei(this.id));
  }
  updated(s) {
    if (super.updated(s), s.has("source")) {
      this._initialize();
      return;
    }
    if (["flatten", "numeric", "numericAuto", "rename", "trim", "stripHtml", "replace", "replaceFields", "lowercaseKeys"].some((i) => s.has(i))) {
      const i = this.source ? Rs(this.source) : void 0;
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
    const s = Rs(this.source);
    s !== void 0 && this._processData(s), this._unsubscribe = Me(this.source, {
      onLoaded: /* @__PURE__ */ a((t) => {
        this._processData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ a(() => {
        ms(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ a((t) => {
        Xs(this.id, t);
      }, "onError")
    }), this._unsubscribePageRequests = Ee(this.id, (t) => {
      zs(this.source, t);
    });
  }
  _processData(s) {
    try {
      ms(this.id);
      let t = Array.isArray(s) ? s : [s];
      this.flatten && (t = t.map((l) => l == null || typeof l != "object" || Array.isArray(l) ? l : this._flattenRow(l, this.flatten)));
      const e = this._parseNumericFields(), i = this._parsePipeMap(this.rename), M = this._parsePipeMap(this.replace), n = this._parseReplaceFields(this.replaceFields), L = t.map((l) => l == null || typeof l != "object" ? l : this._normalizeRow(l, e, i, M, n));
      Ns(this.id, L);
      const d = $s(this.source);
      d && Js(this.id, d);
    } catch (t) {
      Xs(this.id, t), console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`, t);
    }
  }
  _normalizeRow(s, t, e, i, M) {
    const n = {};
    for (const [L, d] of Object.entries(s)) {
      const l = this.trim ? L.trim() : L;
      let o = d;
      if (this.trim && typeof o == "string" && (o = o.trim()), this.stripHtml && typeof o == "string" && (o = o.replace(/<[^>]*>/g, "")), M.size > 0 && typeof o == "string") {
        const T = M.get(l);
        if (T) {
          for (const [x, u] of T)
            if (o === x) {
              o = u;
              break;
            }
        }
      }
      if (i.size > 0 && typeof o == "string") {
        for (const [T, x] of i)
          if (o === T) {
            o = x;
            break;
          }
      }
      if (t.has(l))
        o = lM(o);
      else if (this.numericAuto && typeof o == "string" && Br(o)) {
        const T = lM(o, !0);
        T !== null && (o = T);
      }
      const c = e.get(l) ?? l, N = this.lowercaseKeys ? c.toLowerCase() : c;
      n[N] = o;
    }
    return n;
  }
  /** Aplatit un sous-objet au premier niveau d'un enregistrement */
  _flattenRow(s, t) {
    const e = this._resolvePath(s, t);
    if (e && typeof e == "object" && !Array.isArray(e)) {
      const i = { ...s };
      return this._deleteByPath(i, t), Object.assign(i, e), i;
    }
    return s;
  }
  /** Resout un chemin en dot notation sur un objet */
  _resolvePath(s, t) {
    return t.split(".").reduce((e, i) => e != null && typeof e == "object" ? e[i] : void 0, s);
  }
  /** Supprime une cle par chemin dot notation (supprime aussi la racine du chemin) */
  _deleteByPath(s, t) {
    const e = t.split(".");
    delete s[e[0]];
  }
  /** Parse l'attribut numeric en Set de noms de champs */
  _parseNumericFields() {
    return this.numeric ? new Set(this.numeric.split(",").map((s) => s.trim()).filter(Boolean)) : /* @__PURE__ */ new Set();
  }
  /** Parse l'attribut replace-fields en Map<champ, Map<pattern, remplacement>> */
  _parseReplaceFields(s) {
    const t = /* @__PURE__ */ new Map();
    if (!s)
      return t;
    const e = s.split("|");
    for (const i of e) {
      const M = i.trim(), n = M.indexOf(":");
      if (n === -1)
        continue;
      const L = M.indexOf(":", n + 1);
      if (L === -1)
        continue;
      const d = M.substring(0, n).trim(), l = M.substring(n + 1, L).trim(), o = M.substring(L + 1).trim();
      !d || !l || (t.has(d) || t.set(d, /* @__PURE__ */ new Map()), t.get(d).set(l, o));
    }
    return t;
  }
  /** Parse un attribut pipe-separe en Map cle:valeur */
  _parsePipeMap(s) {
    const t = /* @__PURE__ */ new Map();
    if (!s)
      return t;
    const e = s.split("|");
    for (const i of e) {
      const M = i.indexOf(":");
      if (M === -1)
        continue;
      const n = i.substring(0, M).trim(), L = i.substring(M + 1).trim();
      n && t.set(n, L);
    }
    return t;
  }
}, a(ot, "GouvNormalize"), ot);
hs([
  y({ type: String })
], ws.prototype, "source", void 0);
hs([
  y({ type: String })
], ws.prototype, "numeric", void 0);
hs([
  y({ type: Boolean, attribute: "numeric-auto" })
], ws.prototype, "numericAuto", void 0);
hs([
  y({ type: String })
], ws.prototype, "rename", void 0);
hs([
  y({ type: Boolean })
], ws.prototype, "trim", void 0);
hs([
  y({ type: Boolean, attribute: "strip-html" })
], ws.prototype, "stripHtml", void 0);
hs([
  y({ type: String })
], ws.prototype, "replace", void 0);
hs([
  y({ type: String, attribute: "replace-fields" })
], ws.prototype, "replaceFields", void 0);
hs([
  y({ type: String })
], ws.prototype, "flatten", void 0);
hs([
  y({ type: Boolean, attribute: "lowercase-keys" })
], ws.prototype, "lowercaseKeys", void 0);
ws = hs([
  ss("gouv-normalize")
], ws);
var J = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, lt;
let k = (lt = class extends Q {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.labels = "", this.maxValues = 6, this.disjunctive = "", this.sort = "count", this.searchable = "", this.hideEmpty = !1, this.display = "", this.urlParams = !1, this.urlParamMap = "", this.urlSync = !1, this.serverFacets = !1, this.staticValues = "", this.hideCounts = !1, this.cols = "", this._rawData = [], this._facetGroups = [], this._activeSelections = {}, this._expandedFacets = /* @__PURE__ */ new Set(), this._searchQueries = {}, this._openMultiselectField = null, this._unsubscribe = null, this._unsubscribeCommands = null, this._popstateHandler = null, this._urlParamsApplied = !1, this._onClickOutsideMultiselect = (s) => {
      if (!this._openMultiselectField)
        return;
      const t = s.target, e = this.querySelector(`[data-multiselect="${this._openMultiselectField}"]`);
      e && !e.contains(t) && (this._openMultiselectField = null);
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
    super.connectedCallback(), Ss("gouv-facets"), this._initialize(), document.addEventListener("click", this._onClickOutsideMultiselect), this.urlSync && (this._popstateHandler = () => {
      this._applyUrlParams(), this._buildFacetGroups(), this._applyFilters();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._onClickOutsideMultiselect), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), this.id && ie(this.id);
  }
  updated(s) {
    if (super.updated(s), s.has("source")) {
      this._initialize();
      return;
    }
    if (s.has("serverFacets") || s.has("staticValues")) {
      this._initialize();
      return;
    }
    ["fields", "labels", "sort", "hideEmpty", "maxValues", "disjunctive", "searchable", "display", "cols"].some((i) => s.has(i)) && this._rawData.length > 0 && (this.serverFacets ? this._fetchServerFacets() : this.staticValues ? this._buildStaticFacetGroups() : (this._buildFacetGroups(), this._applyFilters()));
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
    this._unsubscribe && this._unsubscribe(), this._activeSelections = {}, this._expandedFacets = /* @__PURE__ */ new Set(), this._searchQueries = {}, (this.serverFacets || !!this.staticValues) && this.urlParams && !this._urlParamsApplied && (this._applyUrlParams(), this._urlParamsApplied = !0, this._hasActiveSelections() && this._dispatchFacetCommand());
    const t = Rs(this.source);
    t !== void 0 && this._onData(t), this._unsubscribe = Me(this.source, {
      onLoaded: /* @__PURE__ */ a((e) => {
        this._onData(e);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ a(() => {
        ms(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ a((e) => {
        Xs(this.id, e);
      }, "onError")
    }), this._unsubscribeCommands && this._unsubscribeCommands(), this._unsubscribeCommands = Ee(this.id, (e) => {
      zs(this.source, e);
    });
  }
  _onData(s) {
    this._rawData = Array.isArray(s) ? s : [];
    const t = this.serverFacets || !!this.staticValues;
    if (this.urlParams && !this._urlParamsApplied && (this._applyUrlParams(), this._urlParamsApplied = !0, t && this._hasActiveSelections())) {
      this._dispatchFacetCommand();
      return;
    }
    if (this.serverFacets) {
      if (this._fetchServerFacets(), this.id) {
        const e = $s(this.source);
        e && Js(this.id, e), Ns(this.id, this._rawData);
      }
    } else if (this.staticValues) {
      if (this._buildStaticFacetGroups(), this.id) {
        const e = $s(this.source);
        e && Js(this.id, e), Ns(this.id, this._rawData);
      }
    } else
      this._buildFacetGroups(), this._applyFilters();
  }
  // --- Facet index building ---
  _buildFacetGroups() {
    const s = this._getFields(), t = this._parseLabels();
    this._facetGroups = s.map((e) => {
      const i = this._computeFacetValues(e);
      return {
        field: e,
        label: t.get(e) ?? e,
        values: i
      };
    }).filter((e) => this.hideEmpty && e.values.length <= 1 ? !1 : e.values.length > 0);
  }
  /**
   * Build facet groups from static-values attribute (pre-computed values).
   * Values are displayed without counts (count=0, hidden via hideCounts).
   */
  _buildStaticFacetGroups() {
    if (this.staticValues)
      try {
        const s = JSON.parse(this.staticValues), t = this._parseLabels(), e = this.fields ? Ut(this.fields) : Object.keys(s);
        this._facetGroups = e.filter((i) => s[i] && s[i].length > 0).map((i) => ({
          field: i,
          label: t.get(i) ?? i,
          values: s[i].map((M) => ({ value: M, count: 0 }))
        })).filter((i) => !(this.hideEmpty && i.values.length <= 1));
      } catch {
        console.warn("gouv-facets: static-values invalide (JSON attendu)");
      }
  }
  /**
   * Build facet WHERE clause, delegating to the upstream source's adapter.
   * Falls back to colon syntax if no adapter is available.
   */
  _buildFacetWhere(s) {
    var M;
    const t = document.getElementById(this.source), e = (M = t == null ? void 0 : t.getAdapter) == null ? void 0 : M.call(t);
    if (e != null && e.buildFacetWhere)
      return e.buildFacetWhere(this._activeSelections, s);
    const i = [];
    for (const [n, L] of Object.entries(this._activeSelections))
      n === s || L.size === 0 || (L.size === 1 ? i.push(`${n}:eq:${[...L][0]}`) : i.push(`${n}:in:${[...L].join("|")}`));
    return i.join(", ");
  }
  /** Resolve a possibly dotted field path on a row (e.g. "fields.Region") */
  _resolveValue(s, t) {
    if (!t.includes("."))
      return s[t];
    const e = t.split(".");
    let i = s;
    for (const M of e) {
      if (i == null || typeof i != "object")
        return;
      i = i[M];
    }
    return i;
  }
  /** Get fields to use as facets — explicit or auto-detected */
  _getFields() {
    return this.fields ? Ut(this.fields) : this._autoDetectFields();
  }
  /** Auto-detect categorical fields: string type, 2-50 unique values, not all unique (ID-like) */
  _autoDetectFields() {
    if (this._rawData.length === 0)
      return [];
    const s = [], t = this._rawData[0];
    for (const e of Object.keys(t)) {
      const i = /* @__PURE__ */ new Set();
      let M = !0;
      for (const n of this._rawData) {
        const L = n[e];
        if (!(L == null || L === "")) {
          if (typeof L != "string") {
            M = !1;
            break;
          }
          if (i.add(L), i.size > 50)
            break;
        }
      }
      M && (i.size <= 1 || i.size > 50 || i.size !== this._rawData.length && s.push(e));
    }
    return s;
  }
  /** Compute facet values with counts, applying cross-facet filtering for dynamic counts */
  _computeFacetValues(s) {
    const t = this._getDataFilteredExcluding(s), e = /* @__PURE__ */ new Map();
    for (const M of t) {
      const n = this._resolveValue(M, s);
      if (n == null || n === "")
        continue;
      const L = String(n);
      e.set(L, (e.get(L) ?? 0) + 1);
    }
    const i = [];
    for (const [M, n] of e)
      i.push({ value: M, count: n });
    return this._sortValues(i);
  }
  /** Filter data by all active selections EXCEPT the given field */
  _getDataFilteredExcluding(s) {
    const t = Object.keys(this._activeSelections).filter((e) => e !== s && this._activeSelections[e].size > 0);
    return t.length === 0 ? this._rawData : this._rawData.filter((e) => t.every((i) => {
      const M = this._activeSelections[i], n = this._resolveValue(e, i);
      return n == null ? !1 : M.has(String(n));
    }));
  }
  _sortValues(s) {
    const t = [...s];
    switch (this.sort) {
      case "count":
        t.sort((e, i) => i.count - e.count);
        break;
      case "-count":
        t.sort((e, i) => e.count - i.count);
        break;
      case "alpha":
        t.sort((e, i) => e.value.localeCompare(i.value, "fr"));
        break;
      case "-alpha":
        t.sort((e, i) => i.value.localeCompare(e.value, "fr"));
        break;
      default:
        t.sort((e, i) => i.count - e.count);
    }
    return t;
  }
  // --- Server-facets ---
  /** Check if there are any active selections */
  _hasActiveSelections() {
    return Object.keys(this._activeSelections).some((s) => this._activeSelections[s].size > 0);
  }
  /** Fetch facet values from server API with cross-facet counts */
  async _fetchServerFacets() {
    var c, N;
    const s = document.getElementById(this.source);
    if (!s)
      return;
    const t = (c = s.getAdapter) == null ? void 0 : c.call(s);
    if (!(t != null && t.capabilities.serverFacets) || !t.fetchFacets) {
      this._buildFacetGroups(), this._applyFilters();
      return;
    }
    const e = s.baseUrl || s.getAttribute("base-url") || "", i = s.datasetId || s.getAttribute("dataset-id") || "";
    if (!i)
      return;
    let M;
    const n = s.headers || s.getAttribute("headers") || "";
    if (n)
      try {
        M = JSON.parse(n);
      } catch {
      }
    const L = Ut(this.fields);
    if (L.length === 0)
      return;
    const d = this._parseLabels(), l = /* @__PURE__ */ new Map();
    for (const T of L) {
      const x = ((N = s.getEffectiveWhere) == null ? void 0 : N.call(s, this.id)) || "", u = this._buildFacetWhere(T), w = [x, u].filter(Boolean).join(" AND ");
      l.has(w) || l.set(w, []), l.get(w).push(T);
    }
    const o = [];
    for (const [T, x] of l)
      try {
        const u = await t.fetchFacets({ baseUrl: e, datasetId: i, headers: M }, x, T);
        for (const w of u)
          o.push({
            field: w.field,
            label: d.get(w.field) ?? w.field,
            values: this._sortValues(w.values)
          });
      } catch {
      }
    this._facetGroups = L.map((T) => o.find((x) => x.field === T)).filter((T) => !!T).filter((T) => !(this.hideEmpty && T.values.length <= 1));
  }
  /** Dispatch facet where command to upstream gouv-query */
  _dispatchFacetCommand() {
    const s = this._buildFacetWhere();
    zs(this.source, { where: s, whereKey: this.id });
  }
  // --- Filtering ---
  _applyFilters() {
    const s = Object.keys(this._activeSelections).filter((e) => this._activeSelections[e].size > 0);
    let t;
    s.length === 0 ? t = this._rawData : t = this._rawData.filter((e) => s.every((i) => {
      const M = this._activeSelections[i], n = this._resolveValue(e, i);
      return n == null ? !1 : M.has(String(n));
    })), Ns(this.id, t);
  }
  // --- Parsing helpers ---
  _parseLabels() {
    const s = /* @__PURE__ */ new Map();
    if (!this.labels)
      return s;
    const t = this.labels.split("|");
    for (const e of t) {
      const i = e.indexOf(":");
      if (i === -1)
        continue;
      const M = e.substring(0, i).trim(), n = e.substring(i + 1).trim();
      M && s.set(M, n);
    }
    return s;
  }
  /** Parse display attribute into per-field mode map */
  _parseDisplayModes() {
    const s = /* @__PURE__ */ new Map();
    if (!this.display)
      return s;
    const t = this.display.split("|");
    for (const e of t) {
      const i = e.indexOf(":");
      if (i === -1)
        continue;
      const M = e.substring(0, i).trim(), n = e.substring(i + 1).trim();
      M && (n === "checkbox" || n === "select" || n === "multiselect" || n === "radio") && s.set(M, n);
    }
    return s;
  }
  /** Get the display mode for a specific field */
  _getDisplayMode(s) {
    return this._parseDisplayModes().get(s) ?? "checkbox";
  }
  /** Parse cols attribute: returns global col size or per-field map */
  _parseCols() {
    if (!this.cols)
      return null;
    const s = this.cols.trim();
    if (/^\d+$/.test(s))
      return { global: parseInt(s, 10) };
    const t = /* @__PURE__ */ new Map(), e = s.split("|");
    for (const i of e) {
      const M = i.indexOf(":");
      if (M === -1)
        continue;
      const n = i.substring(0, M).trim(), L = parseInt(i.substring(M + 1).trim(), 10);
      n && !isNaN(L) && t.set(n, L);
    }
    return t.size > 0 ? { map: t, fallback: 6 } : null;
  }
  /** Get DSFR col class for a specific field */
  _getColClass(s) {
    const t = this._parseCols();
    return t ? "global" in t ? `fr-col-${t.global}` : `fr-col-${t.map.get(s) ?? t.fallback}` : "";
  }
  // --- User interaction ---
  _toggleValue(s, t) {
    const e = { ...this._activeSelections }, i = new Set(e[s] ?? []), M = this._getDisplayMode(s), n = Ut(this.disjunctive), L = M === "multiselect" || M === "checkbox" && n.includes(s);
    i.has(t) ? i.delete(t) : (L || i.clear(), i.add(t)), i.size === 0 ? delete e[s] : e[s] = i, this._activeSelections = e, this._afterSelectionChange();
  }
  _handleSelectChange(s, t) {
    const i = t.target.value, M = { ...this._activeSelections };
    i ? M[s] = /* @__PURE__ */ new Set([i]) : delete M[s], this._activeSelections = M, this._afterSelectionChange();
  }
  _clearFieldSelections(s) {
    const t = { ...this._activeSelections };
    delete t[s], this._activeSelections = t, this._afterSelectionChange();
  }
  _selectAllValues(s) {
    const t = this._facetGroups.find((i) => i.field === s);
    if (!t)
      return;
    const e = { ...this._activeSelections };
    e[s] = new Set(t.values.map((i) => i.value)), this._activeSelections = e, this._afterSelectionChange();
  }
  _toggleMultiselectDropdown(s) {
    this._openMultiselectField === s ? this._openMultiselectField = null : (this._openMultiselectField = s, this.updateComplete.then(() => {
      const t = this.querySelector(`[data-multiselect="${s}"] .gouv-facets__multiselect-panel`), e = t == null ? void 0 : t.querySelector("button, input, select, [tabindex]");
      e == null || e.focus();
    }));
  }
  _handleMultiselectKeydown(s, t) {
    if (t.key === "Escape") {
      this._openMultiselectField = null;
      const e = this.querySelector(`[data-multiselect="${s}"] .gouv-facets__multiselect-trigger`);
      e == null || e.focus();
    }
  }
  _handleMultiselectFocusout(s, t) {
    if (this._openMultiselectField !== s)
      return;
    const e = t.relatedTarget;
    if (!e)
      return;
    const i = this.querySelector(`[data-multiselect="${s}"]`);
    i != null && i.contains(e) || (this._openMultiselectField = null);
  }
  _toggleExpand(s) {
    const t = new Set(this._expandedFacets);
    t.has(s) ? t.delete(s) : t.add(s), this._expandedFacets = t;
  }
  _handleSearch(s, t) {
    const e = t.target;
    this._searchQueries = { ...this._searchQueries, [s]: e.value };
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
    const s = /* @__PURE__ */ new Map();
    if (!this.urlParamMap)
      return s;
    const t = this.urlParamMap.split("|");
    for (const e of t) {
      const i = e.indexOf(":");
      if (i === -1)
        continue;
      const M = e.substring(0, i).trim(), n = e.substring(i + 1).trim();
      M && n && s.set(M, n);
    }
    return s;
  }
  /** Read URL search params and apply as facet pre-selections */
  _applyUrlParams() {
    const s = new URLSearchParams(window.location.search), t = this._parseUrlParamMap(), e = {};
    for (const [i, M] of s.entries()) {
      const n = t.size > 0 ? t.get(i) ?? null : i;
      if (!n)
        continue;
      const L = M.split(",").map((d) => d.trim()).filter(Boolean);
      e[n] || (e[n] = /* @__PURE__ */ new Set());
      for (const d of L)
        e[n].add(d);
    }
    Object.keys(e).length > 0 && (this._activeSelections = e);
  }
  /** Sync current facet selections back to URL (replaceState) */
  _syncUrl() {
    const s = new URLSearchParams(), t = this._parseUrlParamMap(), e = /* @__PURE__ */ new Map();
    for (const [n, L] of t)
      e.set(L, n);
    for (const [n, L] of Object.entries(this._activeSelections)) {
      if (L.size === 0)
        continue;
      const d = e.get(n) ?? n;
      s.set(d, [...L].join(","));
    }
    const i = s.toString(), M = i ? `${window.location.pathname}?${i}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", M);
  }
  // --- Rendering ---
  render() {
    if (this._rawData.length === 0 || this._facetGroups.length === 0)
      return F;
    const s = Object.keys(this._activeSelections).some((e) => this._activeSelections[e].size > 0), t = !!this.cols;
    return z`
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
        ${s ? z`
          <div class="gouv-facets__header">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line" type="button" @click="${this._clearAll}">
              Reinitialiser les filtres
            </button>
          </div>
        ` : F}
        ${t ? z`
          <div class="fr-grid-row fr-grid-row--gutters">
            ${this._facetGroups.map((e) => z`
              <div class="${this._getColClass(e.field)}">
                ${this._renderFacetGroup(e)}
              </div>
            `)}
          </div>
        ` : z`
          <div class="gouv-facets__groups">
            ${this._facetGroups.map((e) => this._renderFacetGroup(e))}
          </div>
        `}
      </div>
    `;
  }
  _renderFacetGroup(s) {
    switch (this._getDisplayMode(s.field)) {
      case "select":
        return this._renderSelectGroup(s);
      case "multiselect":
        return this._renderMultiselectGroup(s);
      case "radio":
        return this._renderRadioGroup(s);
      default:
        return this._renderCheckboxGroup(s);
    }
  }
  _renderCheckboxGroup(s) {
    const e = Ut(this.searchable).includes(s.field), i = (this._searchQueries[s.field] ?? "").toLowerCase(), M = this._expandedFacets.has(s.field), n = this._activeSelections[s.field] ?? /* @__PURE__ */ new Set();
    let L = s.values;
    e && i && (L = L.filter((c) => c.value.toLowerCase().includes(i)));
    const d = M ? L : L.slice(0, this.maxValues), l = L.length > this.maxValues, o = `facet-${this.id}-${s.field}`;
    return z`
      <fieldset class="fr-fieldset gouv-facets__group" aria-labelledby="${o}-legend">
        <legend class="fr-fieldset__legend fr-text--bold" id="${o}-legend">${s.label}</legend>
        ${e ? z`
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[s.field] ?? ""}"
                @input="${(c) => this._handleSearch(s.field, c)}"
                aria-label="Rechercher dans ${s.label}">
            </div>
          </div>
        ` : F}
        ${d.map((c) => {
      const N = `${o}-${c.value.replace(/[^a-zA-Z0-9]/g, "_")}`, T = n.has(c.value);
      return z`
            <div class="fr-fieldset__element">
              <div class="fr-checkbox-group fr-checkbox-group--sm">
                <input type="checkbox" id="${N}"
                  .checked="${T}"
                  @change="${() => this._toggleValue(s.field, c.value)}">
                <label class="fr-label" for="${N}">
                  ${c.value}${this._effectiveHideCounts ? F : z` <span class="gouv-facets__count">${c.count}</span>`}
                </label>
              </div>
            </div>
          `;
    })}
        ${l ? z`
          <div class="fr-fieldset__element">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm" type="button"
              @click="${() => this._toggleExpand(s.field)}">
              ${M ? "Voir moins" : `Voir plus (${L.length - this.maxValues})`}
            </button>
          </div>
        ` : F}
      </fieldset>
    `;
  }
  _renderSelectGroup(s) {
    const t = `facet-${this.id}-${s.field}`, e = this._activeSelections[s.field], i = e ? [...e][0] ?? "" : "";
    return z`
      <div class="gouv-facets__group fr-select-group" data-field="${s.field}">
        <label class="fr-label" for="${t}-select">${s.label}</label>
        <select class="fr-select" id="${t}-select"
          @change="${(M) => this._handleSelectChange(s.field, M)}">
          <option value="" ?selected="${!i}">Tous</option>
          ${s.values.map((M) => z`
            <option value="${M.value}" ?selected="${M.value === i}">
              ${this._effectiveHideCounts ? M.value : `${M.value} (${M.count})`}
            </option>
          `)}
        </select>
      </div>
    `;
  }
  _renderMultiselectGroup(s) {
    const t = `facet-${this.id}-${s.field}`, e = this._activeSelections[s.field] ?? /* @__PURE__ */ new Set(), i = this._openMultiselectField === s.field, M = (this._searchQueries[s.field] ?? "").toLowerCase();
    let n = s.values;
    M && (n = n.filter((d) => d.value.toLowerCase().includes(M)));
    const L = e.size > 0 ? `${e.size} option${e.size > 1 ? "s" : ""} selectionnee${e.size > 1 ? "s" : ""}` : "Selectionnez des options";
    return z`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${s.field}"
           data-field="${s.field}"
           @keydown="${(d) => this._handleMultiselectKeydown(s.field, d)}"
           @focusout="${(d) => this._handleMultiselectFocusout(s.field, d)}">
        <label class="fr-label" id="${t}-legend">${s.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${i}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          @click="${(d) => {
      d.stopPropagation(), this._toggleMultiselectDropdown(s.field);
    }}">
          ${L}
        </button>
        ${i ? z`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-label="${s.label}"
               @click="${(d) => d.stopPropagation()}">
            <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left ${e.size > 0 ? "fr-icon-close-circle-line" : "fr-icon-check-line"} gouv-facets__multiselect-toggle"
              type="button"
              @click="${() => e.size > 0 ? this._clearFieldSelections(s.field) : this._selectAllValues(s.field)}">
              ${e.size > 0 ? "Tout deselectionner" : "Tout selectionner"}
            </button>
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${s.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[s.field] ?? ""}"
                @input="${(d) => this._handleSearch(s.field, d)}">
              <button class="fr-btn" type="button" title="Rechercher" aria-label="Rechercher">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${s.label}">
              ${n.map((d) => {
      const l = `${t}-${d.value.replace(/[^a-zA-Z0-9]/g, "_")}`, o = e.has(d.value);
      return z`
                  <div class="fr-fieldset__element">
                    <div class="fr-checkbox-group fr-checkbox-group--sm">
                      <input type="checkbox" id="${l}"
                        .checked="${o}"
                        @change="${() => this._toggleValue(s.field, d.value)}">
                      <label class="fr-label" for="${l}">
                        ${d.value}${this._effectiveHideCounts ? F : z` <span class="gouv-facets__count">${d.count}</span>`}
                      </label>
                    </div>
                  </div>
                `;
    })}
            </fieldset>
          </div>
        ` : F}
      </div>
    `;
  }
  _renderRadioGroup(s) {
    const t = `facet-${this.id}-${s.field}`, e = this._activeSelections[s.field] ?? /* @__PURE__ */ new Set(), i = this._openMultiselectField === s.field, M = (this._searchQueries[s.field] ?? "").toLowerCase();
    let n = s.values;
    M && (n = n.filter((l) => l.value.toLowerCase().includes(M)));
    const L = e.size > 0 ? [...e][0] : null, d = L ?? "Selectionnez une option";
    return z`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${s.field}"
           data-field="${s.field}"
           @keydown="${(l) => this._handleMultiselectKeydown(s.field, l)}"
           @focusout="${(l) => this._handleMultiselectFocusout(s.field, l)}">
        <label class="fr-label" id="${t}-legend">${s.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${i}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          @click="${(l) => {
      l.stopPropagation(), this._toggleMultiselectDropdown(s.field);
    }}">
          ${d}
        </button>
        ${i ? z`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-label="${s.label}"
               @click="${(l) => l.stopPropagation()}">
            ${L ? z`
              <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line gouv-facets__multiselect-toggle"
                type="button"
                @click="${() => this._clearFieldSelections(s.field)}">
                Reinitialiser
              </button>
            ` : F}
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${s.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[s.field] ?? ""}"
                @input="${(l) => this._handleSearch(s.field, l)}">
              <button class="fr-btn" type="button" title="Rechercher" aria-label="Rechercher">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${s.label}">
              ${n.map((l) => {
      const o = `${t}-${l.value.replace(/[^a-zA-Z0-9]/g, "_")}`, c = e.has(l.value);
      return z`
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-group--sm">
                      <input type="radio" id="${o}" name="${t}-radio"
                        .checked="${c}"
                        @change="${() => this._toggleValue(s.field, l.value)}">
                      <label class="fr-label" for="${o}">
                        ${l.value}${this._effectiveHideCounts ? F : z` <span class="gouv-facets__count">${l.count}</span>`}
                      </label>
                    </div>
                  </div>
                `;
    })}
            </fieldset>
          </div>
        ` : F}
      </div>
    `;
  }
}, a(lt, "GouvFacets"), lt);
J([
  y({ type: String })
], k.prototype, "source", void 0);
J([
  y({ type: String })
], k.prototype, "fields", void 0);
J([
  y({ type: String })
], k.prototype, "labels", void 0);
J([
  y({ type: Number, attribute: "max-values" })
], k.prototype, "maxValues", void 0);
J([
  y({ type: String })
], k.prototype, "disjunctive", void 0);
J([
  y({ type: String })
], k.prototype, "sort", void 0);
J([
  y({ type: String })
], k.prototype, "searchable", void 0);
J([
  y({ type: Boolean, attribute: "hide-empty" })
], k.prototype, "hideEmpty", void 0);
J([
  y({ type: String })
], k.prototype, "display", void 0);
J([
  y({ type: Boolean, attribute: "url-params" })
], k.prototype, "urlParams", void 0);
J([
  y({ type: String, attribute: "url-param-map" })
], k.prototype, "urlParamMap", void 0);
J([
  y({ type: Boolean, attribute: "url-sync" })
], k.prototype, "urlSync", void 0);
J([
  y({ type: Boolean, attribute: "server-facets" })
], k.prototype, "serverFacets", void 0);
J([
  y({ type: String, attribute: "static-values" })
], k.prototype, "staticValues", void 0);
J([
  y({ type: Boolean, attribute: "hide-counts" })
], k.prototype, "hideCounts", void 0);
J([
  y({ type: String })
], k.prototype, "cols", void 0);
J([
  D()
], k.prototype, "_rawData", void 0);
J([
  D()
], k.prototype, "_facetGroups", void 0);
J([
  D()
], k.prototype, "_activeSelections", void 0);
J([
  D()
], k.prototype, "_expandedFacets", void 0);
J([
  D()
], k.prototype, "_searchQueries", void 0);
J([
  D()
], k.prototype, "_openMultiselectField", void 0);
k = J([
  ss("gouv-facets")
], k);
function Ut(r) {
  return r ? r.split(",").map((s) => s.trim()).filter(Boolean) : [];
}
a(Ut, "_parseCSV");
var q = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, dt;
let G = (dt = class extends Q {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.placeholder = "Rechercher…", this.label = "Rechercher", this.debounce = 300, this.minLength = 0, this.highlight = !1, this.operator = "contains", this.srLabel = !1, this.count = !1, this.urlSearchParam = "", this.urlSync = !1, this.serverSearch = !1, this.searchTemplate = "", this._allData = [], this._filteredData = [], this._term = "", this._resultCount = 0, this._debounceTimer = null, this._unsubscribe = null, this._urlParamApplied = !1;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-search"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._debounceTimer !== null && (clearTimeout(this._debounceTimer), this._debounceTimer = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && ie(this.id);
  }
  updated(s) {
    if (super.updated(s), s.has("source")) {
      this._initialize();
      return;
    }
    ["fields", "operator", "minLength", "highlight"].some((i) => s.has(i)) && this._allData.length > 0 && this._applyFilter();
  }
  // --- Public methods ---
  /** Efface le champ et restaure toutes les donnees */
  clear() {
    this._term = "";
    const s = this.querySelector("input");
    s && (s.value = ""), this._applyFilter();
  }
  /** Declenche une recherche programmatique */
  search(s) {
    this._term = s;
    const t = this.querySelector("input");
    t && (t.value = s), this._applyFilter();
  }
  /** Retourne les donnees actuellement filtrees */
  getData() {
    return this._filteredData;
  }
  /** Remplace le jeu de donnees source */
  setData(s) {
    this._allData = Array.isArray(s) ? s : [], this._applyFilter();
  }
  // --- Private implementation ---
  _initialize() {
    var t;
    if (!this.id) {
      console.warn('gouv-search: attribut "id" requis');
      return;
    }
    if (!this.source) {
      console.warn('gouv-search: attribut "source" requis');
      return;
    }
    if (this._unsubscribe && this._unsubscribe(), this.serverSearch && !this.searchTemplate) {
      const e = document.getElementById(this.source), i = (t = e == null ? void 0 : e.getAdapter) == null ? void 0 : t.call(e);
      i != null && i.getDefaultSearchTemplate && (this.searchTemplate = i.getDefaultSearchTemplate() || "");
    }
    this.serverSearch && this.urlSearchParam && !this._urlParamApplied && (this._applyUrlSearchParam(), this._urlParamApplied = !0, this._term && this._applyServerSearch());
    const s = Rs(this.source);
    s !== void 0 && this._onData(s), this._unsubscribe = Me(this.source, {
      onLoaded: /* @__PURE__ */ a((e) => {
        this._onData(e);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ a(() => {
        ms(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ a((e) => {
        Xs(this.id, e);
      }, "onError")
    });
  }
  _onData(s) {
    const t = Array.isArray(s) ? s : [];
    if (this.serverSearch) {
      this._allData = t, this._filteredData = t;
      const e = $s(this.source);
      this._resultCount = e ? e.total : t.length, this.id && (e && Js(this.id, e), Ns(this.id, t)), this.urlSearchParam && !this._urlParamApplied && (this._applyUrlSearchParam(), this._urlParamApplied = !0, this._term && this._applyServerSearch());
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
    const s = this._term;
    if (!s || s.length < this.minLength)
      this._filteredData = [...this._allData];
    else {
      const t = this._getFields(), e = this.operator || "contains", i = this._normalize(s);
      this._filteredData = this._allData.filter((M) => this._matchRecord(M, i, t, e));
    }
    this.highlight && s && s.length >= this.minLength && (this._filteredData = this._filteredData.map((t) => this._addHighlight(t, s))), this._resultCount = this._filteredData.length, this._dispatch();
  }
  /**
   * Server-search: envoie une commande { where } au source upstream
   * au lieu de filtrer localement.
   */
  _applyServerSearch() {
    const s = this._term;
    let t = "";
    if (s && s.length >= this.minLength) {
      const e = s.replace(/"/g, '\\"');
      t = this.searchTemplate.replace(/\{q\}/g, e);
    }
    zs(this.source, { where: t, whereKey: this.id }), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
      bubbles: !0,
      composed: !0,
      detail: {
        sourceId: this.id,
        term: this._term,
        count: this._resultCount
      }
    }));
  }
  _matchRecord(s, t, e, i) {
    const M = e.length > 0 ? e : Object.keys(s).filter((n) => !n.startsWith("_"));
    switch (i) {
      case "starts":
        return M.some((n) => this._normalize(String(s[n] ?? "")).split(/\s+/).some((d) => d.startsWith(t)));
      case "words":
        return t.split(/\s+/).filter(Boolean).every((L) => M.some((d) => this._normalize(String(s[d] ?? "")).includes(L)));
      case "contains":
      default:
        return M.some((n) => this._normalize(String(s[n] ?? "")).includes(t));
    }
  }
  _normalize(s) {
    return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }
  _getFields() {
    return this.fields ? this.fields.split(",").map((s) => s.trim()).filter(Boolean) : [];
  }
  _addHighlight(s, t) {
    const e = { ...s }, i = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), M = new RegExp("(" + i + ")", "gi"), n = this._getFields(), L = n.length > 0 ? n : Object.keys(s).filter((l) => typeof s[l] == "string"), d = [];
    return L.forEach((l) => {
      typeof s[l] == "string" && d.push(s[l].replace(M, "<mark>$1</mark>"));
    }), e._highlight = d.join(" … "), e;
  }
  _onInput(s) {
    this._term = s, this._debounceTimer !== null && clearTimeout(this._debounceTimer), this._debounceTimer = setTimeout(() => {
      this._debounceTimer = null, this._applyFilter();
    }, this.debounce);
  }
  _onSubmit() {
    this._debounceTimer !== null && (clearTimeout(this._debounceTimer), this._debounceTimer = null), this._applyFilter();
  }
  _dispatch() {
    this.id && (Ns(this.id, this._filteredData), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
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
    const s = new URLSearchParams(window.location.search);
    this._term ? s.set(this.urlSearchParam, this._term) : s.delete(this.urlSearchParam);
    const t = s.toString(), e = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", e);
  }
  render() {
    const s = this.id || "search", t = this.srLabel ? "fr-label sr-only" : "fr-label";
    return z`
      <div class="fr-search-bar" role="search" aria-label="${this.getAttribute("aria-label") || this.label}">
        <label class="${t}" for="gouv-search-${s}">${this.label}</label>
        <input class="fr-input"
          type="search"
          id="gouv-search-${s}"
          placeholder="${this.placeholder}"
          autocomplete="off"
          .value="${this._term}"
          @input="${(e) => this._onInput(e.target.value)}"
          @search="${(e) => {
      this._term = e.target.value, this._onSubmit();
    }}"
          @keydown="${(e) => {
      e.key === "Enter" && (e.preventDefault(), this._onSubmit());
    }}">
        <button class="fr-btn" title="Rechercher" type="button"
          @click="${(e) => {
      e.preventDefault(), this._onSubmit();
    }}">
          Rechercher
        </button>
      </div>
      ${this.count ? z`
        <p class="fr-text--sm fr-mt-1v gouv-search-count" aria-live="polite">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      ` : z`
        <p class="fr-sr-only" aria-live="polite">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      `}
    `;
  }
}, a(dt, "GouvSearch"), dt);
q([
  y({ type: String })
], G.prototype, "source", void 0);
q([
  y({ type: String })
], G.prototype, "fields", void 0);
q([
  y({ type: String })
], G.prototype, "placeholder", void 0);
q([
  y({ type: String })
], G.prototype, "label", void 0);
q([
  y({ type: Number })
], G.prototype, "debounce", void 0);
q([
  y({ type: Number, attribute: "min-length" })
], G.prototype, "minLength", void 0);
q([
  y({ type: Boolean })
], G.prototype, "highlight", void 0);
q([
  y({ type: String })
], G.prototype, "operator", void 0);
q([
  y({ type: Boolean, attribute: "sr-label" })
], G.prototype, "srLabel", void 0);
q([
  y({ type: Boolean })
], G.prototype, "count", void 0);
q([
  y({ type: String, attribute: "url-search-param" })
], G.prototype, "urlSearchParam", void 0);
q([
  y({ type: Boolean, attribute: "url-sync" })
], G.prototype, "urlSync", void 0);
q([
  y({ type: Boolean, attribute: "server-search" })
], G.prototype, "serverSearch", void 0);
q([
  y({ type: String, attribute: "search-template" })
], G.prototype, "searchTemplate", void 0);
q([
  D()
], G.prototype, "_allData", void 0);
q([
  D()
], G.prototype, "_filteredData", void 0);
q([
  D()
], G.prototype, "_term", void 0);
q([
  D()
], G.prototype, "_resultCount", void 0);
G = q([
  ss("gouv-search")
], G);
function Ct(r) {
  const t = class t extends r {
    constructor() {
      super(...arguments), this._sourceLoading = !1, this._sourceData = null, this._sourceError = null, this._unsubscribeSource = null;
    }
    /**
     * Hook appelé quand de nouvelles données arrivent.
     * À surcharger dans le composant hôte.
     */
    onSourceData(i) {
    }
    /**
     * Hook appelé quand une erreur survient.
     * À surcharger pour gérer les erreurs (ex: revert pagination).
     */
    onSourceError(i) {
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
      const M = Rs(i);
      M !== void 0 && (this._sourceData = M, this.onSourceData(M)), this._unsubscribeSource = Me(i, {
        onLoaded: /* @__PURE__ */ a((n) => {
          this._sourceData = n, this._sourceLoading = !1, this._sourceError = null, this.onSourceData(n), this.requestUpdate();
        }, "onLoaded"),
        onLoading: /* @__PURE__ */ a(() => {
          this._sourceLoading = !0, this.requestUpdate();
        }, "onLoading"),
        onError: /* @__PURE__ */ a((n) => {
          this._sourceError = n, this._sourceLoading = !1, this.onSourceError(n), this.requestUpdate();
        }, "onError")
      });
    }
    _cleanupSubscription() {
      this._unsubscribeSource && (this._unsubscribeSource(), this._unsubscribeSource = null);
    }
  };
  a(t, "SourceSubscriberElement");
  let s = t;
  return s;
}
a(Ct, "SourceSubscriberMixin");
function SM(r, s = "nombre") {
  if (r == null || r === "")
    return "—";
  const t = typeof r == "string" ? parseFloat(r) : r;
  if (isNaN(t))
    return "—";
  switch (s) {
    case "nombre":
      return hM(t);
    case "pourcentage":
      return on(t);
    case "euro":
      return ln(t);
    case "decimal":
      return dn(t);
    default:
      return hM(t);
  }
}
a(SM, "formatValue");
function hM(r) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(r));
}
a(hM, "formatNumber");
function on(r) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(r / 100);
}
a(on, "formatPercentage");
function ln(r) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(r);
}
a(ln, "formatCurrency");
function dn(r) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(r);
}
a(dn, "formatDecimal");
function h0(r) {
  const s = typeof r == "string" ? new Date(r) : r;
  return isNaN(s.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(s);
}
a(h0, "formatDate");
function cn(r, s, t) {
  return s !== void 0 && r >= s ? "vert" : t !== void 0 && r >= t ? "orange" : s !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
a(cn, "getColorBySeuil");
function Nn(r) {
  const s = r.split(":");
  if (s.length === 1)
    return s[0] === "count" ? { type: "count", field: "" } : { type: "direct", field: s[0] };
  const t = s[0], e = s[1];
  if (s.length === 3) {
    let i = s[2];
    return i === "true" ? i = !0 : i === "false" ? i = !1 : isNaN(Number(i)) || (i = Number(i)), { type: t, field: e, filterField: e, filterValue: i };
  }
  return { type: t, field: e };
}
a(Nn, "parseExpression");
function FM(r, s) {
  const t = Nn(s);
  if (t.type === "direct" && !Array.isArray(r))
    return r[t.field];
  if (!Array.isArray(r))
    return null;
  const e = r;
  switch (t.type) {
    case "direct":
    case "first":
      return e.length > 0 ? e[0][t.field] : null;
    case "last":
      return e.length > 0 ? e[e.length - 1][t.field] : null;
    case "count":
      return t.filterValue !== void 0 ? e.filter((M) => M[t.field] === t.filterValue).length : e.length;
    case "sum":
      return e.reduce((M, n) => {
        const L = Number(n[t.field]);
        return M + (isNaN(L) ? 0 : L);
      }, 0);
    case "avg":
      return e.length === 0 ? null : e.reduce((M, n) => {
        const L = Number(n[t.field]);
        return M + (isNaN(L) ? 0 : L);
      }, 0) / e.length;
    case "min":
      return e.length === 0 ? null : Math.min(...e.map((M) => Number(M[t.field])).filter((M) => !isNaN(M)));
    case "max":
      return e.length === 0 ? null : Math.max(...e.map((M) => Number(M[t.field])).filter((M) => !isNaN(M)));
    default:
      return null;
  }
}
a(FM, "computeAggregation");
var Fs = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
};
const DM = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
var ct;
let os = (ct = class extends Ct(Q) {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "";
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-kpi");
  }
  _computeValue() {
    return !this._sourceData || !this.valeur ? null : FM(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const s = this._computeValue();
    return typeof s != "number" ? "bleu" : cn(s, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const s = FM(this._sourceData, this.tendance);
    return typeof s != "number" ? null : {
      value: s,
      direction: s > 0 ? "up" : s < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const s = this._computeValue(), t = SM(s, this.format);
    let e = `${this.label}: ${t}`;
    if (typeof s == "number" && (this.seuilVert !== void 0 || this.seuilOrange !== void 0)) {
      const i = this._getColor(), n = { vert: "bon", orange: "attention", rouge: "critique", bleu: "" }[i];
      n && (e += `, etat ${n}`);
    }
    return e;
  }
  render() {
    const s = this._computeValue(), t = SM(s, this.format), e = DM[this._getColor()] || DM.bleu, i = this._getTendanceInfo();
    return z`
      <div
        class="gouv-kpi ${e}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._sourceLoading ? z`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? z`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : z`
          <div class="gouv-kpi__content">
            ${this.icone ? z`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            ` : ""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${t}</span>
              ${i ? z`
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
}, a(ct, "GouvKpi"), ct);
os.styles = PM``;
Fs([
  y({ type: String })
], os.prototype, "source", void 0);
Fs([
  y({ type: String })
], os.prototype, "valeur", void 0);
Fs([
  y({ type: String })
], os.prototype, "label", void 0);
Fs([
  y({ type: String })
], os.prototype, "description", void 0);
Fs([
  y({ type: String })
], os.prototype, "icone", void 0);
Fs([
  y({ type: String })
], os.prototype, "format", void 0);
Fs([
  y({ type: String })
], os.prototype, "tendance", void 0);
Fs([
  y({ type: Number, attribute: "seuil-vert" })
], os.prototype, "seuilVert", void 0);
Fs([
  y({ type: Number, attribute: "seuil-orange" })
], os.prototype, "seuilOrange", void 0);
Fs([
  y({ type: String })
], os.prototype, "couleur", void 0);
os = Fs([
  ss("gouv-kpi")
], os);
var es = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, Nt;
let H = (Nt = class extends Ct(Q) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this.urlSync = !1, this.urlPageParam = "page", this.serverTri = !1, this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._previousPage = 1, this._popstateHandler = null;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-datalist"), this._initSort(), this.urlSync && (this._applyUrlPage(), this._popstateHandler = () => {
      this._applyUrlPage(), this.requestUpdate();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null);
  }
  updated(s) {
    super.updated(s), s.has("tri") && this._initSort();
  }
  onSourceError(s) {
    this._serverPagination && this._data.length > 0 && (this._currentPage = this._previousPage);
  }
  onSourceData(s) {
    this._data = Array.isArray(s) ? s : [];
    const t = this.source ? $s(this.source) : void 0;
    t && t.total > 0 ? (this._serverPagination = !0, this._serverTotal = t.total, this._serverPageSize = t.pageSize, this._currentPage = t.page) : (this._serverPagination = !1, this._currentPage = 1);
  }
  // --- Parsing ---
  parseColumns() {
    return this.colonnes ? this.colonnes.split(",").map((s) => {
      const [t, e] = s.trim().split(":");
      return { key: t.trim(), label: (e == null ? void 0 : e.trim()) || t.trim() };
    }) : [];
  }
  _getFilterableColumns() {
    return this.filtres ? this.filtres.split(",").map((s) => s.trim()) : [];
  }
  _initSort() {
    if (this.tri) {
      const [s, t] = this.tri.split(":");
      this._sort = { key: s, direction: t || "asc" };
    }
  }
  // --- Data processing ---
  _getUniqueValues(s) {
    const t = /* @__PURE__ */ new Set();
    return this._data.forEach((e) => {
      const i = e[s];
      i != null && t.add(String(i));
    }), Array.from(t).sort();
  }
  getFilteredData() {
    let s = [...this._data];
    if (this._searchQuery) {
      const t = this._searchQuery.toLowerCase();
      s = s.filter((e) => Object.values(e).some((i) => String(i).toLowerCase().includes(t)));
    }
    if (Object.entries(this._activeFilters).forEach(([t, e]) => {
      e && (s = s.filter((i) => String(i[t]) === e));
    }), this._sort && !this.serverTri) {
      const { key: t, direction: e } = this._sort;
      s.sort((i, M) => {
        const n = i[t], L = M[t];
        if (n === L)
          return 0;
        if (n == null)
          return 1;
        if (L == null)
          return -1;
        const d = typeof n == "number" && typeof L == "number" ? n - L : String(n).localeCompare(String(L), "fr");
        return e === "desc" ? -d : d;
      });
    }
    return s;
  }
  _getPaginatedData() {
    const s = this.getFilteredData();
    if (this._serverPagination || !this.pagination || this.pagination <= 0)
      return s;
    const t = (this._currentPage - 1) * this.pagination;
    return s.slice(t, t + this.pagination);
  }
  _getTotalPages() {
    return this._serverPagination ? Math.ceil(this._serverTotal / this._serverPageSize) : !this.pagination || this.pagination <= 0 ? 1 : Math.ceil(this.getFilteredData().length / this.pagination);
  }
  // --- Event handlers ---
  /** Read page number from URL and apply */
  _applyUrlPage() {
    const t = new URLSearchParams(window.location.search).get(this.urlPageParam);
    if (t) {
      const e = parseInt(t, 10);
      !isNaN(e) && e >= 1 && (this._currentPage = e, this.source && zs(this.source, { page: e }));
    }
  }
  /** Sync current page to URL via replaceState */
  _syncPageUrl() {
    const s = new URLSearchParams(window.location.search);
    this._currentPage > 1 ? s.set(this.urlPageParam, String(this._currentPage)) : s.delete(this.urlPageParam);
    const t = s.toString(), e = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", e);
  }
  _handleSearch(s) {
    this._searchQuery = s.target.value, this._currentPage = 1, this.urlSync && this._syncPageUrl();
  }
  _handleFilter(s, t) {
    this._activeFilters = { ...this._activeFilters, [s]: t.target.value }, this._currentPage = 1, this.urlSync && this._syncPageUrl();
  }
  _handleSort(s) {
    var t;
    ((t = this._sort) == null ? void 0 : t.key) === s ? this._sort = { key: s, direction: this._sort.direction === "asc" ? "desc" : "asc" } : this._sort = { key: s, direction: "asc" }, this.serverTri && this.source && zs(this.source, {
      orderBy: `${this._sort.key}:${this._sort.direction}`
    });
  }
  _handlePageChange(s) {
    this._previousPage = this._currentPage, this._currentPage = s, this._serverPagination && this.source && zs(this.source, { page: s }), this.urlSync && this._syncPageUrl();
  }
  // --- Export ---
  _exportCsv() {
    const s = this.parseColumns(), t = this.getFilteredData(), e = s.map((l) => l.label).join(";"), i = t.map((l) => s.map((o) => {
      const c = String(l[o.key] ?? "");
      return c.includes(";") || c.includes('"') ? `"${c.replace(/"/g, '""')}"` : c;
    }).join(";")), M = [e, ...i].join(`
`), n = new Blob([M], { type: "text/csv;charset=utf-8;" }), L = URL.createObjectURL(n), d = document.createElement("a");
    d.href = L, d.download = "export.csv", d.click(), URL.revokeObjectURL(L);
  }
  _exportHtml() {
    const s = this.parseColumns(), t = this.getFilteredData(), e = s.map((l) => `<th>${ii(l.label)}</th>`).join(""), i = t.map((l) => `<tr>${s.map((c) => {
      const N = l[c.key];
      return `<td>${N == null ? "" : ii(String(N))}</td>`;
    }).join("")}</tr>`).join(`
`), M = `<!DOCTYPE html>
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
<thead><tr>${e}</tr></thead>
<tbody>
${i}
</tbody>
</table>
</body>
</html>`, n = new Blob([M], { type: "text/html;charset=utf-8;" }), L = URL.createObjectURL(n), d = document.createElement("a");
    d.href = L, d.download = "export.html", d.click(), URL.revokeObjectURL(L);
  }
  // --- Cell formatting ---
  formatCellValue(s) {
    return s == null ? "—" : typeof s == "boolean" ? s ? "Oui" : "Non" : String(s);
  }
  // --- Render sub-templates ---
  _renderFilters(s, t) {
    return t.length === 0 ? "" : z`
      <div class="gouv-datalist__filters">
        ${t.map((e) => {
      const i = s.find((L) => L.key === e), M = (i == null ? void 0 : i.label) || e, n = this._getUniqueValues(e);
      return z`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${e}">${M}</label>
              <select
                class="fr-select"
                id="filter-${e}"
                @change="${(L) => this._handleFilter(e, L)}"
              >
                <option value="">Tous</option>
                ${n.map((L) => z`
                  <option value="${L}" ?selected="${this._activeFilters[e] === L}">${L}</option>
                `)}
              </select>
            </div>
          `;
    })}
      </div>
    `;
  }
  _renderToolbar() {
    var t, e, i, M;
    const s = ((t = this.export) == null ? void 0 : t.includes("csv")) || ((e = this.export) == null ? void 0 : e.includes("html"));
    return !this.recherche && !s ? "" : z`
      <div class="gouv-datalist__toolbar">
        ${this.recherche ? z`
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
        ` : z`<div></div>`}

        <div class="gouv-datalist__export-buttons">
          ${(i = this.export) != null && i.includes("csv") ? z`
            <button
              class="fr-btn fr-btn--secondary fr-btn--sm"
              @click="${this._exportCsv}"
              type="button"
            >
              <span class="fr-icon-download-line fr-icon--sm" aria-hidden="true"></span>
              Exporter CSV
            </button>
          ` : ""}

          ${(M = this.export) != null && M.includes("html") ? z`
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
  _renderTable(s, t) {
    return z`
      <div class="fr-table fr-table--bordered">
        <table>
          <caption class="fr-sr-only">Liste des données</caption>
          <thead>
            <tr>
              ${s.map((e) => {
      var d;
      const i = ((d = this._sort) == null ? void 0 : d.key) === e.key, M = i ? this._sort.direction : null, n = M === "asc" ? "ascending" : M === "desc" ? "descending" : "none", L = i ? `Trier par ${e.label}, actuellement tri ${M === "asc" ? "croissant" : "decroissant"}` : `Trier par ${e.label}`;
      return z`
                <th scope="col" aria-sort="${n}">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${() => this._handleSort(e.key)}"
                    aria-label="${L}"
                    type="button"
                  >
                    ${e.label}
                    ${i ? z`
                      <span aria-hidden="true">${M === "asc" ? "↑" : "↓"}</span>
                    ` : ""}
                  </button>
                </th>
              `;
    })}
            </tr>
          </thead>
          <tbody>
            ${t.length === 0 ? z`
              <tr>
                <td colspan="${s.length}" class="gouv-datalist__empty">
                  Aucune donnée à afficher
                </td>
              </tr>
            ` : t.map((e) => z`
              <tr>
                ${s.map((i) => z`
                  <td>${this.formatCellValue(e[i.key])}</td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
  _renderPagination(s) {
    if (this.pagination <= 0 || s <= 1)
      return "";
    const t = [];
    for (let e = Math.max(1, this._currentPage - 2); e <= Math.min(s, this._currentPage + 2); e++)
      t.push(e);
    return z`
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
          ${t.map((e) => z`
            <li>
              <button
                class="fr-pagination__link ${e === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(e)}"
                aria-current="${e === this._currentPage ? "page" : "false"}"
                aria-label="Page ${e}"
                type="button"
              >${e}</button>
            </li>
          `)}
          <li>
            <button class="fr-pagination__link fr-pagination__link--next"
              ?disabled="${this._currentPage === s}"
              @click="${() => this._handlePageChange(this._currentPage + 1)}"
              aria-label="Page suivante" type="button">Page suivante</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--last"
              ?disabled="${this._currentPage === s}"
              @click="${() => this._handlePageChange(s)}"
              aria-label="Derniere page" type="button">Derniere page</button>
          </li>
        </ul>
      </nav>
    `;
  }
  // --- Main render ---
  render() {
    const s = this.parseColumns(), t = this._getFilterableColumns(), e = this._getPaginatedData(), i = this._getTotalPages(), M = this._serverPagination ? this._serverTotal : this.getFilteredData().length;
    return z`
      <div class="gouv-datalist" role="region" aria-label="${this.getAttribute("aria-label") || "Liste de donnees"}">
        ${this._renderFilters(s, t)}
        ${this._renderToolbar()}

        ${this._sourceLoading ? z`
          <div class="gouv-datalist__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement des données...
          </div>
        ` : this._sourceError && !(this._serverPagination && this._data.length > 0) ? z`
          <div class="gouv-datalist__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur: ${this._sourceError.message}
          </div>
        ` : z`
          <p class="fr-text--sm" aria-live="polite">
            ${M} résultat${M > 1 ? "s" : ""}
            ${!this._serverPagination && (this._searchQuery || Object.values(this._activeFilters).some((n) => n)) ? " (filtré)" : ""}
          </p>
          ${this._renderTable(s, e)}
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
}, a(Nt, "GouvDatalist"), Nt);
H.styles = PM``;
es([
  y({ type: String })
], H.prototype, "source", void 0);
es([
  y({ type: String })
], H.prototype, "colonnes", void 0);
es([
  y({ type: Boolean })
], H.prototype, "recherche", void 0);
es([
  y({ type: String })
], H.prototype, "filtres", void 0);
es([
  y({ type: String })
], H.prototype, "tri", void 0);
es([
  y({ type: Number })
], H.prototype, "pagination", void 0);
es([
  y({ type: String })
], H.prototype, "export", void 0);
es([
  y({ type: Boolean, attribute: "url-sync" })
], H.prototype, "urlSync", void 0);
es([
  y({ type: String, attribute: "url-page-param" })
], H.prototype, "urlPageParam", void 0);
es([
  y({ type: Boolean, attribute: "server-tri" })
], H.prototype, "serverTri", void 0);
es([
  D()
], H.prototype, "_data", void 0);
es([
  D()
], H.prototype, "_searchQuery", void 0);
es([
  D()
], H.prototype, "_activeFilters", void 0);
es([
  D()
], H.prototype, "_sort", void 0);
es([
  D()
], H.prototype, "_currentPage", void 0);
es([
  D()
], H.prototype, "_serverPagination", void 0);
H = es([
  ss("gouv-datalist")
], H);
var us = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, Tt;
let ls = (Tt = class extends Ct(Q) {
  constructor() {
    super(...arguments), this.source = "", this.cols = 1, this.pagination = 0, this.empty = "Aucun resultat", this.gap = "fr-grid-row--gutters", this.uidField = "", this.urlSync = !1, this.urlPageParam = "page", this._data = [], this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._templateContent = "", this._hashScrollDone = !1, this._popstateHandler = null;
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-display"), this._captureTemplate(), this.urlSync && (this._applyUrlPage(), this._popstateHandler = () => {
      this._applyUrlPage(), this.requestUpdate();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null);
  }
  onSourceData(s) {
    this._data = Array.isArray(s) ? s : [], this._hashScrollDone = !1;
    const t = this.source ? $s(this.source) : void 0;
    t && t.total > 0 ? (this._serverPagination = !0, this._serverTotal = t.total, this._serverPageSize = t.pageSize, this._currentPage = t.page) : (this._serverPagination = !1, this._currentPage = 1);
  }
  updated(s) {
    if (super.updated(s), !this._hashScrollDone && this._data.length > 0 && window.location.hash) {
      this._hashScrollDone = !0;
      const t = window.location.hash.substring(1);
      requestAnimationFrame(() => {
        const e = this.querySelector(`#${CSS.escape(t)}`);
        e && e.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }
  _captureTemplate() {
    const s = this.querySelector("template");
    s && (this._templateContent = s.innerHTML);
  }
  /** Remplace les placeholders dans le template pour un item donne */
  _renderItem(s, t) {
    if (!this._templateContent)
      return "";
    let e = this._templateContent;
    return e = e.replace(/\{\{\{([^}]+)\}\}\}/g, (i, M) => this._resolveExpression(s, M.trim(), t)), e = e.replace(/\{\{([^}]+)\}\}/g, (i, M) => {
      const n = this._resolveExpression(s, M.trim(), t);
      return ii(n);
    }), e;
  }
  /** Resout une expression : champ, champ.nested, champ|defaut, $index, $uid */
  _resolveExpression(s, t, e) {
    if (t === "$index")
      return String(e);
    if (t === "$uid")
      return this._getItemUid(s, e);
    let i = t, M = "";
    const n = t.indexOf("|");
    n !== -1 && (i = t.substring(0, n).trim(), M = t.substring(n + 1).trim());
    const L = $(s, i);
    return L == null ? M : String(L);
  }
  // --- Pagination ---
  _getPaginatedData() {
    if (this._serverPagination)
      return this._data;
    if (!this.pagination || this.pagination <= 0)
      return this._data;
    const s = (this._currentPage - 1) * this.pagination;
    return this._data.slice(s, s + this.pagination);
  }
  _getTotalPages() {
    return this._serverPagination ? Math.ceil(this._serverTotal / this._serverPageSize) : !this.pagination || this.pagination <= 0 ? 1 : Math.ceil(this._data.length / this.pagination);
  }
  /** Read page number from URL and apply */
  _applyUrlPage() {
    const t = new URLSearchParams(window.location.search).get(this.urlPageParam);
    if (t) {
      const e = parseInt(t, 10);
      !isNaN(e) && e >= 1 && (this._currentPage = e, this.source && zs(this.source, { page: e }));
    }
  }
  /** Sync current page to URL via replaceState */
  _syncPageUrl() {
    const s = new URLSearchParams(window.location.search);
    this._currentPage > 1 ? s.set(this.urlPageParam, String(this._currentPage)) : s.delete(this.urlPageParam);
    const t = s.toString(), e = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", e);
  }
  _handlePageChange(s) {
    this._currentPage = s, this._serverPagination && this.source && zs(this.source, { page: s }), this.urlSync && this._syncPageUrl();
  }
  // --- Grid ---
  _getColClass() {
    const s = Math.max(1, Math.min(6, this.cols));
    return `fr-col-12 fr-col-md-${Math.floor(12 / s)}`;
  }
  // --- Render ---
  /** Generate the unique ID string for an item */
  _getItemUid(s, t) {
    if (this.uidField) {
      const e = $(s, this.uidField);
      if (e != null && e !== "")
        return `item-${String(e).replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    }
    return `item-${t}`;
  }
  _renderGrid(s) {
    const t = this._getColClass(), e = this.pagination > 0 ? (this._currentPage - 1) * this.pagination : 0, i = s.map((n, L) => {
      const d = e + L, l = this._renderItem(n, d), o = this._getItemUid(n, d);
      return `<div class="${t}" id="${o}">${l}</div>`;
    }).join(""), M = `<div class="fr-grid-row ${this.gap}">${i}</div>`;
    return z`<div .innerHTML="${M}"></div>`;
  }
  _renderPagination(s) {
    if (this.pagination <= 0 || s <= 1)
      return "";
    const t = [];
    for (let e = Math.max(1, this._currentPage - 2); e <= Math.min(s, this._currentPage + 2); e++)
      t.push(e);
    return z`
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
          ${t.map((e) => z`
            <li>
              <button
                class="fr-pagination__link ${e === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(e)}"
                aria-current="${e === this._currentPage ? "page" : "false"}"
                aria-label="Page ${e}"
                type="button"
              >${e}</button>
            </li>
          `)}
          <li>
            <button class="fr-pagination__link fr-pagination__link--next"
              ?disabled="${this._currentPage === s}"
              @click="${() => this._handlePageChange(this._currentPage + 1)}"
              aria-label="Page suivante" type="button">Page suivante</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--last"
              ?disabled="${this._currentPage === s}"
              @click="${() => this._handlePageChange(s)}"
              aria-label="Derniere page" type="button">Derniere page</button>
          </li>
        </ul>
      </nav>
    `;
  }
  render() {
    this._templateContent || this._captureTemplate();
    const s = this._getPaginatedData(), t = this._getTotalPages(), e = this._serverPagination ? this._serverTotal : this._data.length;
    return z`
      <div class="gouv-display" role="region" aria-label="${this.getAttribute("aria-label") || "Liste de resultats"}">
        ${this._sourceLoading ? z`
          <div class="gouv-display__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? z`
          <div class="gouv-display__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : e === 0 ? z`
          <div class="gouv-display__empty" aria-live="polite">
            ${this.empty}
          </div>
        ` : z`
          <p class="fr-text--sm fr-mb-1w" aria-live="polite">
            ${e} resultat${e > 1 ? "s" : ""}
          </p>
          ${this._renderGrid(s)}
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
}, a(Tt, "GouvDisplay"), Tt);
us([
  y({ type: String })
], ls.prototype, "source", void 0);
us([
  y({ type: Number })
], ls.prototype, "cols", void 0);
us([
  y({ type: Number })
], ls.prototype, "pagination", void 0);
us([
  y({ type: String })
], ls.prototype, "empty", void 0);
us([
  y({ type: String })
], ls.prototype, "gap", void 0);
us([
  y({ type: String, attribute: "uid-field" })
], ls.prototype, "uidField", void 0);
us([
  y({ type: Boolean, attribute: "url-sync" })
], ls.prototype, "urlSync", void 0);
us([
  y({ type: String, attribute: "url-page-param" })
], ls.prototype, "urlPageParam", void 0);
us([
  D()
], ls.prototype, "_data", void 0);
us([
  D()
], ls.prototype, "_currentPage", void 0);
us([
  D()
], ls.prototype, "_serverPagination", void 0);
ls = us([
  ss("gouv-display")
], ls);
var B = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
};
const Tn = {
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
var yt;
let Y = (yt = class extends Ct(Q) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.codeField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._data = [];
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-dsfr-chart", this.type);
  }
  onSourceData(s) {
    this._data = Array.isArray(s) ? s : [];
  }
  // --- Data processing ---
  _processData() {
    if (!this._data || this._data.length === 0)
      return { x: "[[]]", y: "[[]]", labels: [], values: [], values2: [] };
    const s = [], t = [], e = [];
    for (const i of this._data)
      s.push(String($(i, this.labelField) ?? "N/A")), t.push(Number($(i, this.valueField)) || 0), this.valueField2 && e.push(Number($(i, this.valueField2)) || 0);
    return {
      x: JSON.stringify([s]),
      y: JSON.stringify([t]),
      y2: this.valueField2 ? JSON.stringify([e]) : void 0,
      // Combined y with both series for multi-series charts (bar, line, radar)
      yMulti: this.valueField2 ? JSON.stringify([t, e]) : void 0,
      labels: s,
      values: t,
      values2: e
    };
  }
  _processMapData() {
    if (!this._data || this._data.length === 0)
      return "{}";
    const s = this.codeField || this.labelField, t = {};
    for (const e of this._data) {
      let i = String($(e, s) ?? "").trim();
      /^\d+$/.test(i) && i.length < 3 && (i = i.padStart(2, "0"));
      const M = Number($(e, this.valueField)) || 0;
      (this.type === "map" ? Rr(i) : i !== "") && (t[i] = Math.round(M * 100) / 100);
    }
    return JSON.stringify(t);
  }
  // --- Attribute builders ---
  _getCommonAttributes() {
    const s = {};
    if (this.selectedPalette && (s["selected-palette"] = this.selectedPalette), this.unitTooltip && (s["unit-tooltip"] = this.unitTooltip), this.xMin && (s["x-min"] = this.xMin), this.xMax && (s["x-max"] = this.xMax), this.yMin && (s["y-min"] = this.yMin), this.yMax && (s["y-max"] = this.yMax), this.name) {
      const t = this.name.trim(), e = this.type === "map" || this.type === "map-reg";
      s.name = e || t.startsWith("[") ? t : JSON.stringify([t]);
    } else if (this.valueField)
      if (this.type === "map" || this.type === "map-reg")
        s.name = this.valueField;
      else {
        const e = this.valueField2 ? [this.valueField, this.valueField2] : [this.valueField];
        s.name = JSON.stringify(e);
      }
    return s;
  }
  _getTypeSpecificAttributes() {
    const { x: s, y: t, yMulti: e, labels: i, values: M, values2: n } = this._processData(), L = {}, d = {};
    switch (this.type) {
      case "gauge": {
        const l = this.gaugeValue ?? (this._data.length > 0 && Number($(this._data[0], this.valueField)) || 0);
        L.percent = String(Math.round(l)), L.init = "0", L.target = "100";
        break;
      }
      case "pie":
        L.x = s, L.y = t, !this.name && i.length > 0 && (L.name = JSON.stringify(i));
        break;
      case "bar-line": {
        if (L.x = JSON.stringify(i), L["y-bar"] = JSON.stringify(M), L["y-line"] = JSON.stringify(n.length ? n : M), this.name)
          try {
            const l = this.name.trim(), o = l.startsWith("[") ? JSON.parse(l) : [l];
            o[0] && (L["name-bar"] = o[0]), o[1] && (L["name-line"] = o[1]);
          } catch {
          }
        this.unitTooltipBar && (L["unit-tooltip-bar"] = this.unitTooltipBar), this.unitTooltip && (L["unit-tooltip-line"] = this.unitTooltip);
        break;
      }
      case "map":
      case "map-reg": {
        if (L.data = this._processMapData(), this._data.length > 0) {
          let l = 0, o = 0;
          for (const c of this._data) {
            const N = Number($(c, this.valueField));
            isNaN(N) || (l += N, o++);
          }
          if (o > 0) {
            const c = Math.round(l / o * 100) / 100;
            d.value = String(c);
          }
        }
        d.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        break;
      }
      default:
        L.x = s, L.y = e || t;
        break;
    }
    return this.type === "bar" && (this.horizontal && (L.horizontal = "true"), this.stacked && (L.stacked = "true"), this.highlightIndex && (L["highlight-index"] = this.highlightIndex)), this.type === "pie" && this.fill && (L.fill = "true"), (this.type === "map" || this.type === "map-reg") && this.mapHighlight && (L.highlight = this.mapHighlight), { attrs: L, deferred: d };
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
    }[this.type] || this.type, e = this._data.length;
    return `Graphique ${t}, ${e} valeurs`;
  }
  _createChartElement(s, t, e = {}) {
    const i = document.createElement(s);
    for (const [n, L] of Object.entries(t))
      L !== void 0 && L !== "" && i.setAttribute(n, L);
    Object.keys(e).length > 0 && setTimeout(() => {
      for (const [n, L] of Object.entries(e))
        i.setAttribute(n, L);
    }, 500);
    const M = document.createElement("div");
    return M.className = "gouv-dsfr-chart__wrapper", M.setAttribute("role", "img"), M.setAttribute("aria-label", this._getAriaLabel()), M.appendChild(i), M;
  }
  _renderChart() {
    const s = Tn[this.type];
    if (!s)
      return z`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const { attrs: t, deferred: e } = this._getTypeSpecificAttributes(), i = {
      ...this._getCommonAttributes(),
      ...t
    };
    this.type === "bar-line" && (delete i.name, delete i["unit-tooltip"]);
    const M = this._createChartElement(s, i, e), n = this.querySelector(".gouv-dsfr-chart__wrapper");
    return n && n.remove(), z`${M}`;
  }
  render() {
    return this._sourceLoading ? z`
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
      ` : this._sourceError ? z`
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
      ` : !this._data || this._data.length === 0 ? z`
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
}, a(yt, "GouvDsfrChart"), yt);
B([
  y({ type: String })
], Y.prototype, "source", void 0);
B([
  y({ type: String })
], Y.prototype, "type", void 0);
B([
  y({ type: String, attribute: "label-field" })
], Y.prototype, "labelField", void 0);
B([
  y({ type: String, attribute: "code-field" })
], Y.prototype, "codeField", void 0);
B([
  y({ type: String, attribute: "value-field" })
], Y.prototype, "valueField", void 0);
B([
  y({ type: String, attribute: "value-field-2" })
], Y.prototype, "valueField2", void 0);
B([
  y({ type: String })
], Y.prototype, "name", void 0);
B([
  y({ type: String, attribute: "selected-palette" })
], Y.prototype, "selectedPalette", void 0);
B([
  y({ type: String, attribute: "unit-tooltip" })
], Y.prototype, "unitTooltip", void 0);
B([
  y({ type: String, attribute: "unit-tooltip-bar" })
], Y.prototype, "unitTooltipBar", void 0);
B([
  y({ type: Boolean })
], Y.prototype, "horizontal", void 0);
B([
  y({ type: Boolean })
], Y.prototype, "stacked", void 0);
B([
  y({ type: Boolean })
], Y.prototype, "fill", void 0);
B([
  y({ type: String, attribute: "highlight-index" })
], Y.prototype, "highlightIndex", void 0);
B([
  y({ type: String, attribute: "x-min" })
], Y.prototype, "xMin", void 0);
B([
  y({ type: String, attribute: "x-max" })
], Y.prototype, "xMax", void 0);
B([
  y({ type: String, attribute: "y-min" })
], Y.prototype, "yMin", void 0);
B([
  y({ type: String, attribute: "y-max" })
], Y.prototype, "yMax", void 0);
B([
  y({ type: Number, attribute: "gauge-value" })
], Y.prototype, "gaugeValue", void 0);
B([
  y({ type: String, attribute: "map-highlight" })
], Y.prototype, "mapHighlight", void 0);
B([
  D()
], Y.prototype, "_data", void 0);
Y = B([
  ss("gouv-dsfr-chart")
], Y);
const Pi = class Pi {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(s) {
    const t = this._partials;
    let e = 0;
    for (let i = 0; i < this._n && i < 32; i++) {
      const M = t[i], n = s + M, L = Math.abs(s) < Math.abs(M) ? s - (n - M) : M - (n - s);
      L && (t[e++] = L), s = n;
    }
    return t[e] = s, this._n = e + 1, this;
  }
  valueOf() {
    const s = this._partials;
    let t = this._n, e, i, M, n = 0;
    if (t > 0) {
      for (n = s[--t]; t > 0 && (e = n, i = s[--t], n = e + i, M = i - (n - e), !M); )
        ;
      t > 0 && (M < 0 && s[t - 1] < 0 || M > 0 && s[t - 1] > 0) && (i = M * 2, e = n + i, i == e - n && (n = e));
    }
    return n;
  }
};
a(Pi, "Adder");
let js = Pi;
function* yn(r) {
  for (const s of r)
    yield* s;
}
a(yn, "flatten");
function lr(r) {
  return Array.from(yn(r));
}
a(lr, "merge");
var v = 1e-6, j = Math.PI, ys = j / 2, pM = j / 4, bs = j * 2, fs = 180 / j, as = j / 180, A = Math.abs, xn = Math.atan, Gt = Math.atan2, Z = Math.cos, P = Math.sin, zn = Math.sign || function(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0;
}, Hs = Math.sqrt;
function wn(r) {
  return r > 1 ? 0 : r < -1 ? j : Math.acos(r);
}
a(wn, "acos");
function Ht(r) {
  return r > 1 ? ys : r < -1 ? -ys : Math.asin(r);
}
a(Ht, "asin");
function xs() {
}
a(xs, "noop");
function Fe(r, s) {
  r && WM.hasOwnProperty(r.type) && WM[r.type](r, s);
}
a(Fe, "streamGeometry");
var IM = {
  Feature: /* @__PURE__ */ a(function(r, s) {
    Fe(r.geometry, s);
  }, "Feature"),
  FeatureCollection: /* @__PURE__ */ a(function(r, s) {
    for (var t = r.features, e = -1, i = t.length; ++e < i; ) Fe(t[e].geometry, s);
  }, "FeatureCollection")
}, WM = {
  Sphere: /* @__PURE__ */ a(function(r, s) {
    s.sphere();
  }, "Sphere"),
  Point: /* @__PURE__ */ a(function(r, s) {
    r = r.coordinates, s.point(r[0], r[1], r[2]);
  }, "Point"),
  MultiPoint: /* @__PURE__ */ a(function(r, s) {
    for (var t = r.coordinates, e = -1, i = t.length; ++e < i; ) r = t[e], s.point(r[0], r[1], r[2]);
  }, "MultiPoint"),
  LineString: /* @__PURE__ */ a(function(r, s) {
    li(r.coordinates, s, 0);
  }, "LineString"),
  MultiLineString: /* @__PURE__ */ a(function(r, s) {
    for (var t = r.coordinates, e = -1, i = t.length; ++e < i; ) li(t[e], s, 0);
  }, "MultiLineString"),
  Polygon: /* @__PURE__ */ a(function(r, s) {
    fM(r.coordinates, s);
  }, "Polygon"),
  MultiPolygon: /* @__PURE__ */ a(function(r, s) {
    for (var t = r.coordinates, e = -1, i = t.length; ++e < i; ) fM(t[e], s);
  }, "MultiPolygon"),
  GeometryCollection: /* @__PURE__ */ a(function(r, s) {
    for (var t = r.geometries, e = -1, i = t.length; ++e < i; ) Fe(t[e], s);
  }, "GeometryCollection")
};
function li(r, s, t) {
  var e = -1, i = r.length - t, M;
  for (s.lineStart(); ++e < i; ) M = r[e], s.point(M[0], M[1], M[2]);
  s.lineEnd();
}
a(li, "streamLine");
function fM(r, s) {
  var t = -1, e = r.length;
  for (s.polygonStart(); ++t < e; ) li(r[t], s, 1);
  s.polygonEnd();
}
a(fM, "streamPolygon");
function it(r, s) {
  r && IM.hasOwnProperty(r.type) ? IM[r.type](r, s) : Fe(r, s);
}
a(it, "geoStream");
function di(r) {
  return [Gt(r[1], r[0]), Ht(r[2])];
}
a(di, "spherical");
function gt(r) {
  var s = r[0], t = r[1], e = Z(t);
  return [e * Z(s), e * P(s), P(t)];
}
a(gt, "cartesian");
function Ne(r, s) {
  return r[0] * s[0] + r[1] * s[1] + r[2] * s[2];
}
a(Ne, "cartesianDot");
function De(r, s) {
  return [r[1] * s[2] - r[2] * s[1], r[2] * s[0] - r[0] * s[2], r[0] * s[1] - r[1] * s[0]];
}
a(De, "cartesianCross");
function Re(r, s) {
  r[0] += s[0], r[1] += s[1], r[2] += s[2];
}
a(Re, "cartesianAddInPlace");
function Te(r, s) {
  return [r[0] * s, r[1] * s, r[2] * s];
}
a(Te, "cartesianScale");
function ci(r) {
  var s = Hs(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
  r[0] /= s, r[1] /= s, r[2] /= s;
}
a(ci, "cartesianNormalizeInPlace");
function Ni(r, s) {
  function t(e, i) {
    return e = r(e, i), s(e[0], e[1]);
  }
  return a(t, "compose"), r.invert && s.invert && (t.invert = function(e, i) {
    return e = s.invert(e, i), e && r.invert(e[0], e[1]);
  }), t;
}
a(Ni, "compose");
function Ti(r, s) {
  return A(r) > j && (r -= Math.round(r / bs) * bs), [r, s];
}
a(Ti, "rotationIdentity");
Ti.invert = Ti;
function bn(r, s, t) {
  return (r %= bs) ? s || t ? Ni(XM(r), jM(s, t)) : XM(r) : s || t ? jM(s, t) : Ti;
}
a(bn, "rotateRadians");
function gM(r) {
  return function(s, t) {
    return s += r, A(s) > j && (s -= Math.round(s / bs) * bs), [s, t];
  };
}
a(gM, "forwardRotationLambda");
function XM(r) {
  var s = gM(r);
  return s.invert = gM(-r), s;
}
a(XM, "rotationLambda");
function jM(r, s) {
  var t = Z(r), e = P(r), i = Z(s), M = P(s);
  function n(L, d) {
    var l = Z(d), o = Z(L) * l, c = P(L) * l, N = P(d), T = N * t + o * e;
    return [
      Gt(c * i - T * M, o * t - N * e),
      Ht(T * i + c * M)
    ];
  }
  return a(n, "rotation"), n.invert = function(L, d) {
    var l = Z(d), o = Z(L) * l, c = P(L) * l, N = P(d), T = N * i - c * M;
    return [
      Gt(c * i + N * M, o * t + T * e),
      Ht(T * t - o * e)
    ];
  }, n;
}
a(jM, "rotationPhiGamma");
function un(r, s, t, e, i, M) {
  if (t) {
    var n = Z(s), L = P(s), d = e * t;
    i == null ? (i = s + e * bs, M = s - d / 2) : (i = CM(n, i), M = CM(n, M), (e > 0 ? i < M : i > M) && (i += e * bs));
    for (var l, o = i; e > 0 ? o > M : o < M; o -= d)
      l = di([n, -L * Z(o), -L * P(o)]), r.point(l[0], l[1]);
  }
}
a(un, "circleStream");
function CM(r, s) {
  s = gt(s), s[0] -= r, ci(s);
  var t = wn(-s[1]);
  return ((-s[2] < 0 ? -t : t) + bs - v) % bs;
}
a(CM, "circleRadius");
function dr() {
  var r = [], s;
  return {
    point: /* @__PURE__ */ a(function(t, e, i) {
      s.push([t, e, i]);
    }, "point"),
    lineStart: /* @__PURE__ */ a(function() {
      r.push(s = []);
    }, "lineStart"),
    lineEnd: xs,
    rejoin: /* @__PURE__ */ a(function() {
      r.length > 1 && r.push(r.pop().concat(r.shift()));
    }, "rejoin"),
    result: /* @__PURE__ */ a(function() {
      var t = r;
      return r = [], s = null, t;
    }, "result")
  };
}
a(dr, "clipBuffer");
function ue(r, s) {
  return A(r[0] - s[0]) < v && A(r[1] - s[1]) < v;
}
a(ue, "pointEqual");
function ye(r, s, t, e) {
  this.x = r, this.z = s, this.o = t, this.e = e, this.v = !1, this.n = this.p = null;
}
a(ye, "Intersection");
function cr(r, s, t, e, i) {
  var M = [], n = [], L, d;
  if (r.forEach(function(x) {
    if (!((u = x.length - 1) <= 0)) {
      var u, w = x[0], f = x[u], h;
      if (ue(w, f)) {
        if (!w[2] && !f[2]) {
          for (i.lineStart(), L = 0; L < u; ++L) i.point((w = x[L])[0], w[1]);
          i.lineEnd();
          return;
        }
        f[0] += 2 * v;
      }
      M.push(h = new ye(w, x, null, !0)), n.push(h.o = new ye(w, null, h, !1)), M.push(h = new ye(f, x, null, !1)), n.push(h.o = new ye(f, null, h, !0));
    }
  }), !!M.length) {
    for (n.sort(s), OM(M), OM(n), L = 0, d = n.length; L < d; ++L)
      n[L].e = t = !t;
    for (var l = M[0], o, c; ; ) {
      for (var N = l, T = !0; N.v; ) if ((N = N.n) === l) return;
      o = N.z, i.lineStart();
      do {
        if (N.v = N.o.v = !0, N.e) {
          if (T)
            for (L = 0, d = o.length; L < d; ++L) i.point((c = o[L])[0], c[1]);
          else
            e(N.x, N.n.x, 1, i);
          N = N.n;
        } else {
          if (T)
            for (o = N.p.z, L = o.length - 1; L >= 0; --L) i.point((c = o[L])[0], c[1]);
          else
            e(N.x, N.p.x, -1, i);
          N = N.p;
        }
        N = N.o, o = N.z, T = !T;
      } while (!N.v);
      i.lineEnd();
    }
  }
}
a(cr, "clipRejoin");
function OM(r) {
  if (s = r.length) {
    for (var s, t = 0, e = r[0], i; ++t < s; )
      e.n = i = r[t], i.p = e, e = i;
    e.n = i = r[0], i.p = e;
  }
}
a(OM, "link");
function $e(r) {
  return A(r[0]) <= j ? r[0] : zn(r[0]) * ((A(r[0]) + j) % bs - j);
}
a($e, "longitude");
function Sn(r, s) {
  var t = $e(s), e = s[1], i = P(e), M = [P(t), -Z(t), 0], n = 0, L = 0, d = new js();
  i === 1 ? e = ys + v : i === -1 && (e = -ys - v);
  for (var l = 0, o = r.length; l < o; ++l)
    if (N = (c = r[l]).length)
      for (var c, N, T = c[N - 1], x = $e(T), u = T[1] / 2 + pM, w = P(u), f = Z(u), h = 0; h < N; ++h, x = S, w = g, f = E, T = I) {
        var I = c[h], S = $e(I), W = I[1] / 2 + pM, g = P(W), E = Z(W), C = S - x, O = C >= 0 ? 1 : -1, V = O * C, p = V > j, ns = w * g;
        if (d.add(Gt(ns * O * P(V), f * E + ns * Z(V))), n += p ? C + O * bs : C, p ^ x >= t ^ S >= t) {
          var R = De(gt(T), gt(I));
          ci(R);
          var m = De(M, R);
          ci(m);
          var b = (p ^ C >= 0 ? -1 : 1) * Ht(m[2]);
          (e > b || e === b && (R[0] || R[1])) && (L += p ^ C >= 0 ? 1 : -1);
        }
      }
  return (n < -v || n < v && d < -1e-12) ^ L & 1;
}
a(Sn, "polygonContains");
function Nr(r, s, t, e) {
  return function(i) {
    var M = s(i), n = dr(), L = s(n), d = !1, l, o, c, N = {
      point: T,
      lineStart: u,
      lineEnd: w,
      polygonStart: /* @__PURE__ */ a(function() {
        N.point = f, N.lineStart = h, N.lineEnd = I, o = [], l = [];
      }, "polygonStart"),
      polygonEnd: /* @__PURE__ */ a(function() {
        N.point = T, N.lineStart = u, N.lineEnd = w, o = lr(o);
        var S = Sn(l, e);
        o.length ? (d || (i.polygonStart(), d = !0), cr(o, Fn, S, t, i)) : S && (d || (i.polygonStart(), d = !0), i.lineStart(), t(null, null, 1, i), i.lineEnd()), d && (i.polygonEnd(), d = !1), o = l = null;
      }, "polygonEnd"),
      sphere: /* @__PURE__ */ a(function() {
        i.polygonStart(), i.lineStart(), t(null, null, 1, i), i.lineEnd(), i.polygonEnd();
      }, "sphere")
    };
    function T(S, W) {
      r(S, W) && i.point(S, W);
    }
    a(T, "point");
    function x(S, W) {
      M.point(S, W);
    }
    a(x, "pointLine");
    function u() {
      N.point = x, M.lineStart();
    }
    a(u, "lineStart");
    function w() {
      N.point = T, M.lineEnd();
    }
    a(w, "lineEnd");
    function f(S, W) {
      c.push([S, W]), L.point(S, W);
    }
    a(f, "pointRing");
    function h() {
      L.lineStart(), c = [];
    }
    a(h, "ringStart");
    function I() {
      f(c[0][0], c[0][1]), L.lineEnd();
      var S = L.clean(), W = n.result(), g, E = W.length, C, O, V;
      if (c.pop(), l.push(c), c = null, !!E) {
        if (S & 1) {
          if (O = W[0], (C = O.length - 1) > 0) {
            for (d || (i.polygonStart(), d = !0), i.lineStart(), g = 0; g < C; ++g) i.point((V = O[g])[0], V[1]);
            i.lineEnd();
          }
          return;
        }
        E > 1 && S & 2 && W.push(W.pop().concat(W.shift())), o.push(W.filter(hn));
      }
    }
    return a(I, "ringEnd"), N;
  };
}
a(Nr, "clip");
function hn(r) {
  return r.length > 1;
}
a(hn, "validSegment");
function Fn(r, s) {
  return ((r = r.x)[0] < 0 ? r[1] - ys - v : ys - r[1]) - ((s = s.x)[0] < 0 ? s[1] - ys - v : ys - s[1]);
}
a(Fn, "compareIntersection");
const EM = Nr(
  function() {
    return !0;
  },
  Dn,
  In,
  [-j, -ys]
);
function Dn(r) {
  var s = NaN, t = NaN, e = NaN, i;
  return {
    lineStart: /* @__PURE__ */ a(function() {
      r.lineStart(), i = 1;
    }, "lineStart"),
    point: /* @__PURE__ */ a(function(M, n) {
      var L = M > 0 ? j : -j, d = A(M - s);
      A(d - j) < v ? (r.point(s, t = (t + n) / 2 > 0 ? ys : -ys), r.point(e, t), r.lineEnd(), r.lineStart(), r.point(L, t), r.point(M, t), i = 0) : e !== L && d >= j && (A(s - e) < v && (s -= e * v), A(M - L) < v && (M -= L * v), t = pn(s, t, M, n), r.point(e, t), r.lineEnd(), r.lineStart(), r.point(L, t), i = 0), r.point(s = M, t = n), e = L;
    }, "point"),
    lineEnd: /* @__PURE__ */ a(function() {
      r.lineEnd(), s = t = NaN;
    }, "lineEnd"),
    clean: /* @__PURE__ */ a(function() {
      return 2 - i;
    }, "clean")
  };
}
a(Dn, "clipAntimeridianLine");
function pn(r, s, t, e) {
  var i, M, n = P(r - t);
  return A(n) > v ? xn((P(s) * (M = Z(e)) * P(t) - P(e) * (i = Z(s)) * P(r)) / (i * M * n)) : (s + e) / 2;
}
a(pn, "clipAntimeridianIntersect");
function In(r, s, t, e) {
  var i;
  if (r == null)
    i = t * ys, e.point(-j, i), e.point(0, i), e.point(j, i), e.point(j, 0), e.point(j, -i), e.point(0, -i), e.point(-j, -i), e.point(-j, 0), e.point(-j, i);
  else if (A(r[0] - s[0]) > v) {
    var M = r[0] < s[0] ? j : -j;
    i = t * M / 2, e.point(-M, i), e.point(0, i), e.point(M, i);
  } else
    e.point(s[0], s[1]);
}
a(In, "clipAntimeridianInterpolate");
function Wn(r) {
  var s = Z(r), t = 2 * as, e = s > 0, i = A(s) > v;
  function M(o, c, N, T) {
    un(T, r, t, N, o, c);
  }
  a(M, "interpolate");
  function n(o, c) {
    return Z(o) * Z(c) > s;
  }
  a(n, "visible");
  function L(o) {
    var c, N, T, x, u;
    return {
      lineStart: /* @__PURE__ */ a(function() {
        x = T = !1, u = 1;
      }, "lineStart"),
      point: /* @__PURE__ */ a(function(w, f) {
        var h = [w, f], I, S = n(w, f), W = e ? S ? 0 : l(w, f) : S ? l(w + (w < 0 ? j : -j), f) : 0;
        if (!c && (x = T = S) && o.lineStart(), S !== T && (I = d(c, h), (!I || ue(c, I) || ue(h, I)) && (h[2] = 1)), S !== T)
          u = 0, S ? (o.lineStart(), I = d(h, c), o.point(I[0], I[1])) : (I = d(c, h), o.point(I[0], I[1], 2), o.lineEnd()), c = I;
        else if (i && c && e ^ S) {
          var g;
          !(W & N) && (g = d(h, c, !0)) && (u = 0, e ? (o.lineStart(), o.point(g[0][0], g[0][1]), o.point(g[1][0], g[1][1]), o.lineEnd()) : (o.point(g[1][0], g[1][1]), o.lineEnd(), o.lineStart(), o.point(g[0][0], g[0][1], 3)));
        }
        S && (!c || !ue(c, h)) && o.point(h[0], h[1]), c = h, T = S, N = W;
      }, "point"),
      lineEnd: /* @__PURE__ */ a(function() {
        T && o.lineEnd(), c = null;
      }, "lineEnd"),
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: /* @__PURE__ */ a(function() {
        return u | (x && T) << 1;
      }, "clean")
    };
  }
  a(L, "clipLine");
  function d(o, c, N) {
    var T = gt(o), x = gt(c), u = [1, 0, 0], w = De(T, x), f = Ne(w, w), h = w[0], I = f - h * h;
    if (!I) return !N && o;
    var S = s * f / I, W = -s * h / I, g = De(u, w), E = Te(u, S), C = Te(w, W);
    Re(E, C);
    var O = g, V = Ne(E, O), p = Ne(O, O), ns = V * V - p * (Ne(E, E) - 1);
    if (!(ns < 0)) {
      var R = Hs(ns), m = Te(O, (-V - R) / p);
      if (Re(m, E), m = di(m), !N) return m;
      var b = o[0], X = c[0], K = o[1], Ls = c[1], ds;
      X < b && (ds = b, b = X, X = ds);
      var mt = X - b, Is = A(mt - j) < v, Vs = Is || mt < v;
      if (!Is && Ls < K && (ds = K, K = Ls, Ls = ds), Vs ? Is ? K + Ls > 0 ^ m[1] < (A(m[0] - b) < v ? K : Ls) : K <= m[1] && m[1] <= Ls : mt > j ^ (b <= m[0] && m[0] <= X)) {
        var Ws = Te(O, (-V + R) / p);
        return Re(Ws, E), [m, di(Ws)];
      }
    }
  }
  a(d, "intersect");
  function l(o, c) {
    var N = e ? r : j - r, T = 0;
    return o < -N ? T |= 1 : o > N && (T |= 2), c < -N ? T |= 4 : c > N && (T |= 8), T;
  }
  return a(l, "code"), Nr(n, L, M, e ? [0, -r] : [-j, r - j]);
}
a(Wn, "clipCircle");
function fn(r, s, t, e, i, M) {
  var n = r[0], L = r[1], d = s[0], l = s[1], o = 0, c = 1, N = d - n, T = l - L, x;
  if (x = t - n, !(!N && x > 0)) {
    if (x /= N, N < 0) {
      if (x < o) return;
      x < c && (c = x);
    } else if (N > 0) {
      if (x > c) return;
      x > o && (o = x);
    }
    if (x = i - n, !(!N && x < 0)) {
      if (x /= N, N < 0) {
        if (x > c) return;
        x > o && (o = x);
      } else if (N > 0) {
        if (x < o) return;
        x < c && (c = x);
      }
      if (x = e - L, !(!T && x > 0)) {
        if (x /= T, T < 0) {
          if (x < o) return;
          x < c && (c = x);
        } else if (T > 0) {
          if (x > c) return;
          x > o && (o = x);
        }
        if (x = M - L, !(!T && x < 0)) {
          if (x /= T, T < 0) {
            if (x > c) return;
            x > o && (o = x);
          } else if (T > 0) {
            if (x < o) return;
            x < c && (c = x);
          }
          return o > 0 && (r[0] = n + o * N, r[1] = L + o * T), c < 1 && (s[0] = n + c * N, s[1] = L + c * T), !0;
        }
      }
    }
  }
}
a(fn, "clipLine");
var Vt = 1e9, xe = -Vt;
function gn(r, s, t, e) {
  function i(l, o) {
    return r <= l && l <= t && s <= o && o <= e;
  }
  a(i, "visible");
  function M(l, o, c, N) {
    var T = 0, x = 0;
    if (l == null || (T = n(l, c)) !== (x = n(o, c)) || d(l, o) < 0 ^ c > 0)
      do
        N.point(T === 0 || T === 3 ? r : t, T > 1 ? e : s);
      while ((T = (T + c + 4) % 4) !== x);
    else
      N.point(o[0], o[1]);
  }
  a(M, "interpolate");
  function n(l, o) {
    return A(l[0] - r) < v ? o > 0 ? 0 : 3 : A(l[0] - t) < v ? o > 0 ? 2 : 1 : A(l[1] - s) < v ? o > 0 ? 1 : 0 : o > 0 ? 3 : 2;
  }
  a(n, "corner");
  function L(l, o) {
    return d(l.x, o.x);
  }
  a(L, "compareIntersection");
  function d(l, o) {
    var c = n(l, 1), N = n(o, 1);
    return c !== N ? c - N : c === 0 ? o[1] - l[1] : c === 1 ? l[0] - o[0] : c === 2 ? l[1] - o[1] : o[0] - l[0];
  }
  return a(d, "comparePoint"), function(l) {
    var o = l, c = dr(), N, T, x, u, w, f, h, I, S, W, g, E = {
      point: C,
      lineStart: ns,
      lineEnd: R,
      polygonStart: V,
      polygonEnd: p
    };
    function C(b, X) {
      i(b, X) && o.point(b, X);
    }
    a(C, "point");
    function O() {
      for (var b = 0, X = 0, K = T.length; X < K; ++X)
        for (var Ls = T[X], ds = 1, mt = Ls.length, Is = Ls[0], Vs, Ws, ne = Is[0], st = Is[1]; ds < mt; ++ds)
          Vs = ne, Ws = st, Is = Ls[ds], ne = Is[0], st = Is[1], Ws <= e ? st > e && (ne - Vs) * (e - Ws) > (st - Ws) * (r - Vs) && ++b : st <= e && (ne - Vs) * (e - Ws) < (st - Ws) * (r - Vs) && --b;
      return b;
    }
    a(O, "polygonInside");
    function V() {
      o = c, N = [], T = [], g = !0;
    }
    a(V, "polygonStart");
    function p() {
      var b = O(), X = g && b, K = (N = lr(N)).length;
      (X || K) && (l.polygonStart(), X && (l.lineStart(), M(null, null, 1, l), l.lineEnd()), K && cr(N, L, b, M, l), l.polygonEnd()), o = l, N = T = x = null;
    }
    a(p, "polygonEnd");
    function ns() {
      E.point = m, T && T.push(x = []), W = !0, S = !1, h = I = NaN;
    }
    a(ns, "lineStart");
    function R() {
      N && (m(u, w), f && S && c.rejoin(), N.push(c.result())), E.point = C, S && o.lineEnd();
    }
    a(R, "lineEnd");
    function m(b, X) {
      var K = i(b, X);
      if (T && x.push([b, X]), W)
        u = b, w = X, f = K, W = !1, K && (o.lineStart(), o.point(b, X));
      else if (K && S) o.point(b, X);
      else {
        var Ls = [h = Math.max(xe, Math.min(Vt, h)), I = Math.max(xe, Math.min(Vt, I))], ds = [b = Math.max(xe, Math.min(Vt, b)), X = Math.max(xe, Math.min(Vt, X))];
        fn(Ls, ds, r, s, t, e) ? (S || (o.lineStart(), o.point(Ls[0], Ls[1])), o.point(ds[0], ds[1]), K || o.lineEnd(), g = !1) : K && (o.lineStart(), o.point(b, X), g = !1);
      }
      h = b, I = X, S = K;
    }
    return a(m, "linePoint"), E;
  };
}
a(gn, "clipRectangle");
const yi = /* @__PURE__ */ a((r) => r, "identity$1");
var Ze = new js(), xi = new js(), Tr, yr, zi, wi, gs = {
  point: xs,
  lineStart: xs,
  lineEnd: xs,
  polygonStart: /* @__PURE__ */ a(function() {
    gs.lineStart = Xn, gs.lineEnd = Cn;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ a(function() {
    gs.lineStart = gs.lineEnd = gs.point = xs, Ze.add(A(xi)), xi = new js();
  }, "polygonEnd"),
  result: /* @__PURE__ */ a(function() {
    var r = Ze / 2;
    return Ze = new js(), r;
  }, "result")
};
function Xn() {
  gs.point = jn;
}
a(Xn, "areaRingStart");
function jn(r, s) {
  gs.point = xr, Tr = zi = r, yr = wi = s;
}
a(jn, "areaPointFirst");
function xr(r, s) {
  xi.add(wi * r - zi * s), zi = r, wi = s;
}
a(xr, "areaPoint");
function Cn() {
  xr(Tr, yr);
}
a(Cn, "areaRingEnd");
var Xt = 1 / 0, pe = Xt, qt = -Xt, Ie = qt, We = {
  point: On,
  lineStart: xs,
  lineEnd: xs,
  polygonStart: xs,
  polygonEnd: xs,
  result: /* @__PURE__ */ a(function() {
    var r = [[Xt, pe], [qt, Ie]];
    return qt = Ie = -(pe = Xt = 1 / 0), r;
  }, "result")
};
function On(r, s) {
  r < Xt && (Xt = r), r > qt && (qt = r), s < pe && (pe = s), s > Ie && (Ie = s);
}
a(On, "boundsPoint");
var bi = 0, ui = 0, At = 0, fe = 0, ge = 0, Mt = 0, Si = 0, hi = 0, Qt = 0, zr, wr, Ds, ps, Ts = {
  point: Zs,
  lineStart: mM,
  lineEnd: vM,
  polygonStart: /* @__PURE__ */ a(function() {
    Ts.lineStart = vn, Ts.lineEnd = _n;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ a(function() {
    Ts.point = Zs, Ts.lineStart = mM, Ts.lineEnd = vM;
  }, "polygonEnd"),
  result: /* @__PURE__ */ a(function() {
    var r = Qt ? [Si / Qt, hi / Qt] : Mt ? [fe / Mt, ge / Mt] : At ? [bi / At, ui / At] : [NaN, NaN];
    return bi = ui = At = fe = ge = Mt = Si = hi = Qt = 0, r;
  }, "result")
};
function Zs(r, s) {
  bi += r, ui += s, ++At;
}
a(Zs, "centroidPoint");
function mM() {
  Ts.point = En;
}
a(mM, "centroidLineStart");
function En(r, s) {
  Ts.point = mn, Zs(Ds = r, ps = s);
}
a(En, "centroidPointFirstLine");
function mn(r, s) {
  var t = r - Ds, e = s - ps, i = Hs(t * t + e * e);
  fe += i * (Ds + r) / 2, ge += i * (ps + s) / 2, Mt += i, Zs(Ds = r, ps = s);
}
a(mn, "centroidPointLine");
function vM() {
  Ts.point = Zs;
}
a(vM, "centroidLineEnd");
function vn() {
  Ts.point = Un;
}
a(vn, "centroidRingStart");
function _n() {
  br(zr, wr);
}
a(_n, "centroidRingEnd");
function Un(r, s) {
  Ts.point = br, Zs(zr = Ds = r, wr = ps = s);
}
a(Un, "centroidPointFirstRing");
function br(r, s) {
  var t = r - Ds, e = s - ps, i = Hs(t * t + e * e);
  fe += i * (Ds + r) / 2, ge += i * (ps + s) / 2, Mt += i, i = ps * r - Ds * s, Si += i * (Ds + r), hi += i * (ps + s), Qt += i * 3, Zs(Ds = r, ps = s);
}
a(br, "centroidPointRing");
function ur(r) {
  this._context = r;
}
a(ur, "PathContext");
ur.prototype = {
  _radius: 4.5,
  pointRadius: /* @__PURE__ */ a(function(r) {
    return this._radius = r, this;
  }, "pointRadius"),
  polygonStart: /* @__PURE__ */ a(function() {
    this._line = 0;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ a(function() {
    this._line = NaN;
  }, "polygonEnd"),
  lineStart: /* @__PURE__ */ a(function() {
    this._point = 0;
  }, "lineStart"),
  lineEnd: /* @__PURE__ */ a(function() {
    this._line === 0 && this._context.closePath(), this._point = NaN;
  }, "lineEnd"),
  point: /* @__PURE__ */ a(function(r, s) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(r, s), this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(r, s);
        break;
      }
      default: {
        this._context.moveTo(r + this._radius, s), this._context.arc(r, s, this._radius, 0, bs);
        break;
      }
    }
  }, "point"),
  result: xs
};
var Fi = new js(), Pe, Sr, hr, kt, Yt, Kt = {
  point: xs,
  lineStart: /* @__PURE__ */ a(function() {
    Kt.point = Vn;
  }, "lineStart"),
  lineEnd: /* @__PURE__ */ a(function() {
    Pe && Fr(Sr, hr), Kt.point = xs;
  }, "lineEnd"),
  polygonStart: /* @__PURE__ */ a(function() {
    Pe = !0;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ a(function() {
    Pe = null;
  }, "polygonEnd"),
  result: /* @__PURE__ */ a(function() {
    var r = +Fi;
    return Fi = new js(), r;
  }, "result")
};
function Vn(r, s) {
  Kt.point = Fr, Sr = kt = r, hr = Yt = s;
}
a(Vn, "lengthPointFirst");
function Fr(r, s) {
  kt -= r, Yt -= s, Fi.add(Hs(kt * kt + Yt * Yt)), kt = r, Yt = s;
}
a(Fr, "lengthPoint");
let _M, Xe, UM, VM;
const Gi = class Gi {
  constructor(s) {
    this._append = s == null ? Dr : An(s), this._radius = 4.5, this._ = "";
  }
  pointRadius(s) {
    return this._radius = +s, this;
  }
  polygonStart() {
    this._line = 0;
  }
  polygonEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    this._line === 0 && (this._ += "Z"), this._point = NaN;
  }
  point(s, t) {
    switch (this._point) {
      case 0: {
        this._append`M${s},${t}`, this._point = 1;
        break;
      }
      case 1: {
        this._append`L${s},${t}`;
        break;
      }
      default: {
        if (this._append`M${s},${t}`, this._radius !== UM || this._append !== Xe) {
          const e = this._radius, i = this._;
          this._ = "", this._append`m0,${e}a${e},${e} 0 1,1 0,${-2 * e}a${e},${e} 0 1,1 0,${2 * e}z`, UM = e, Xe = this._append, VM = this._, this._ = i;
        }
        this._ += VM;
        break;
      }
    }
  }
  result() {
    const s = this._;
    return this._ = "", s.length ? s : null;
  }
};
a(Gi, "PathString");
let je = Gi;
function Dr(r) {
  let s = 1;
  this._ += r[0];
  for (const t = r.length; s < t; ++s)
    this._ += arguments[s] + r[s];
}
a(Dr, "append");
function An(r) {
  const s = Math.floor(r);
  if (!(s >= 0)) throw new RangeError(`invalid digits: ${r}`);
  if (s > 15) return Dr;
  if (s !== _M) {
    const t = 10 ** s;
    _M = s, Xe = /* @__PURE__ */ a(function(i) {
      let M = 1;
      this._ += i[0];
      for (const n = i.length; M < n; ++M)
        this._ += Math.round(arguments[M] * t) / t + i[M];
    }, "append");
  }
  return Xe;
}
a(An, "appendRound");
function Qn(r, s) {
  let t = 3, e = 4.5, i, M;
  function n(L) {
    return L && (typeof e == "function" && M.pointRadius(+e.apply(this, arguments)), it(L, i(M))), M.result();
  }
  return a(n, "path"), n.area = function(L) {
    return it(L, i(gs)), gs.result();
  }, n.measure = function(L) {
    return it(L, i(Kt)), Kt.result();
  }, n.bounds = function(L) {
    return it(L, i(We)), We.result();
  }, n.centroid = function(L) {
    return it(L, i(Ts)), Ts.result();
  }, n.projection = function(L) {
    return arguments.length ? (i = L == null ? (r = null, yi) : (r = L).stream, n) : r;
  }, n.context = function(L) {
    return arguments.length ? (M = L == null ? (s = null, new je(t)) : new ur(s = L), typeof e != "function" && M.pointRadius(e), n) : s;
  }, n.pointRadius = function(L) {
    return arguments.length ? (e = typeof L == "function" ? L : (M.pointRadius(+L), +L), n) : e;
  }, n.digits = function(L) {
    if (!arguments.length) return t;
    if (L == null) t = null;
    else {
      const d = Math.floor(L);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${L}`);
      t = d;
    }
    return s === null && (M = new je(t)), n;
  }, n.projection(r).digits(t).context(s);
}
a(Qn, "geoPath");
function mi(r) {
  return function(s) {
    var t = new Di();
    for (var e in r) t[e] = r[e];
    return t.stream = s, t;
  };
}
a(mi, "transformer");
function Di() {
}
a(Di, "TransformStream");
Di.prototype = {
  constructor: Di,
  point: /* @__PURE__ */ a(function(r, s) {
    this.stream.point(r, s);
  }, "point"),
  sphere: /* @__PURE__ */ a(function() {
    this.stream.sphere();
  }, "sphere"),
  lineStart: /* @__PURE__ */ a(function() {
    this.stream.lineStart();
  }, "lineStart"),
  lineEnd: /* @__PURE__ */ a(function() {
    this.stream.lineEnd();
  }, "lineEnd"),
  polygonStart: /* @__PURE__ */ a(function() {
    this.stream.polygonStart();
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ a(function() {
    this.stream.polygonEnd();
  }, "polygonEnd")
};
function vi(r, s, t) {
  var e = r.clipExtent && r.clipExtent();
  return r.scale(150).translate([0, 0]), e != null && r.clipExtent(null), it(t, r.stream(We)), s(We.result()), e != null && r.clipExtent(e), r;
}
a(vi, "fit");
function pr(r, s, t) {
  return vi(r, function(e) {
    var i = s[1][0] - s[0][0], M = s[1][1] - s[0][1], n = Math.min(i / (e[1][0] - e[0][0]), M / (e[1][1] - e[0][1])), L = +s[0][0] + (i - n * (e[1][0] + e[0][0])) / 2, d = +s[0][1] + (M - n * (e[1][1] + e[0][1])) / 2;
    r.scale(150 * n).translate([L, d]);
  }, t);
}
a(pr, "fitExtent");
function kn(r, s, t) {
  return pr(r, [[0, 0], s], t);
}
a(kn, "fitSize");
function Yn(r, s, t) {
  return vi(r, function(e) {
    var i = +s, M = i / (e[1][0] - e[0][0]), n = (i - M * (e[1][0] + e[0][0])) / 2, L = -M * e[0][1];
    r.scale(150 * M).translate([n, L]);
  }, t);
}
a(Yn, "fitWidth");
function Jn(r, s, t) {
  return vi(r, function(e) {
    var i = +s, M = i / (e[1][1] - e[0][1]), n = -M * e[0][0], L = (i - M * (e[1][1] + e[0][1])) / 2;
    r.scale(150 * M).translate([n, L]);
  }, t);
}
a(Jn, "fitHeight");
var AM = 16, Bn = Z(30 * as);
function QM(r, s) {
  return +s ? $n(r, s) : Rn(r);
}
a(QM, "resample");
function Rn(r) {
  return mi({
    point: /* @__PURE__ */ a(function(s, t) {
      s = r(s, t), this.stream.point(s[0], s[1]);
    }, "point")
  });
}
a(Rn, "resampleNone");
function $n(r, s) {
  function t(e, i, M, n, L, d, l, o, c, N, T, x, u, w) {
    var f = l - e, h = o - i, I = f * f + h * h;
    if (I > 4 * s && u--) {
      var S = n + N, W = L + T, g = d + x, E = Hs(S * S + W * W + g * g), C = Ht(g /= E), O = A(A(g) - 1) < v || A(M - c) < v ? (M + c) / 2 : Gt(W, S), V = r(O, C), p = V[0], ns = V[1], R = p - e, m = ns - i, b = h * R - f * m;
      (b * b / I > s || A((f * R + h * m) / I - 0.5) > 0.3 || n * N + L * T + d * x < Bn) && (t(e, i, M, n, L, d, p, ns, O, S /= E, W /= E, g, u, w), w.point(p, ns), t(p, ns, O, S, W, g, l, o, c, N, T, x, u, w));
    }
  }
  return a(t, "resampleLineTo"), function(e) {
    var i, M, n, L, d, l, o, c, N, T, x, u, w = {
      point: f,
      lineStart: h,
      lineEnd: S,
      polygonStart: /* @__PURE__ */ a(function() {
        e.polygonStart(), w.lineStart = W;
      }, "polygonStart"),
      polygonEnd: /* @__PURE__ */ a(function() {
        e.polygonEnd(), w.lineStart = h;
      }, "polygonEnd")
    };
    function f(C, O) {
      C = r(C, O), e.point(C[0], C[1]);
    }
    a(f, "point");
    function h() {
      c = NaN, w.point = I, e.lineStart();
    }
    a(h, "lineStart");
    function I(C, O) {
      var V = gt([C, O]), p = r(C, O);
      t(c, N, o, T, x, u, c = p[0], N = p[1], o = C, T = V[0], x = V[1], u = V[2], AM, e), e.point(c, N);
    }
    a(I, "linePoint");
    function S() {
      w.point = f, e.lineEnd();
    }
    a(S, "lineEnd");
    function W() {
      h(), w.point = g, w.lineEnd = E;
    }
    a(W, "ringStart");
    function g(C, O) {
      I(i = C, O), M = c, n = N, L = T, d = x, l = u, w.point = I;
    }
    a(g, "ringPoint");
    function E() {
      t(c, N, o, T, x, u, M, n, i, L, d, l, AM, e), w.lineEnd = S, S();
    }
    return a(E, "ringEnd"), w;
  };
}
a($n, "resample$1");
var Zn = mi({
  point: /* @__PURE__ */ a(function(r, s) {
    this.stream.point(r * as, s * as);
  }, "point")
});
function Pn(r) {
  return mi({
    point: /* @__PURE__ */ a(function(s, t) {
      var e = r(s, t);
      return this.stream.point(e[0], e[1]);
    }, "point")
  });
}
a(Pn, "transformRotate");
function Gn(r, s, t, e, i) {
  function M(n, L) {
    return n *= e, L *= i, [s + r * n, t - r * L];
  }
  return a(M, "transform"), M.invert = function(n, L) {
    return [(n - s) / r * e, (t - L) / r * i];
  }, M;
}
a(Gn, "scaleTranslate");
function kM(r, s, t, e, i, M) {
  if (!M) return Gn(r, s, t, e, i);
  var n = Z(M), L = P(M), d = n * r, l = L * r, o = n / r, c = L / r, N = (L * t - n * s) / r, T = (L * s + n * t) / r;
  function x(u, w) {
    return u *= e, w *= i, [d * u - l * w + s, t - l * u - d * w];
  }
  return a(x, "transform"), x.invert = function(u, w) {
    return [e * (o * u - c * w + N), i * (T - c * u - o * w)];
  }, x;
}
a(kM, "scaleTranslateRotate");
function Hn(r) {
  return qn(function() {
    return r;
  })();
}
a(Hn, "projection");
function qn(r) {
  var s, t = 150, e = 480, i = 250, M = 0, n = 0, L = 0, d = 0, l = 0, o, c = 0, N = 1, T = 1, x = null, u = EM, w = null, f, h, I, S = yi, W = 0.5, g, E, C, O, V;
  function p(b) {
    return C(b[0] * as, b[1] * as);
  }
  a(p, "projection");
  function ns(b) {
    return b = C.invert(b[0], b[1]), b && [b[0] * fs, b[1] * fs];
  }
  a(ns, "invert"), p.stream = function(b) {
    return O && V === b ? O : O = Zn(Pn(o)(u(g(S(V = b)))));
  }, p.preclip = function(b) {
    return arguments.length ? (u = b, x = void 0, m()) : u;
  }, p.postclip = function(b) {
    return arguments.length ? (S = b, w = f = h = I = null, m()) : S;
  }, p.clipAngle = function(b) {
    return arguments.length ? (u = +b ? Wn(x = b * as) : (x = null, EM), m()) : x * fs;
  }, p.clipExtent = function(b) {
    return arguments.length ? (S = b == null ? (w = f = h = I = null, yi) : gn(w = +b[0][0], f = +b[0][1], h = +b[1][0], I = +b[1][1]), m()) : w == null ? null : [[w, f], [h, I]];
  }, p.scale = function(b) {
    return arguments.length ? (t = +b, R()) : t;
  }, p.translate = function(b) {
    return arguments.length ? (e = +b[0], i = +b[1], R()) : [e, i];
  }, p.center = function(b) {
    return arguments.length ? (M = b[0] % 360 * as, n = b[1] % 360 * as, R()) : [M * fs, n * fs];
  }, p.rotate = function(b) {
    return arguments.length ? (L = b[0] % 360 * as, d = b[1] % 360 * as, l = b.length > 2 ? b[2] % 360 * as : 0, R()) : [L * fs, d * fs, l * fs];
  }, p.angle = function(b) {
    return arguments.length ? (c = b % 360 * as, R()) : c * fs;
  }, p.reflectX = function(b) {
    return arguments.length ? (N = b ? -1 : 1, R()) : N < 0;
  }, p.reflectY = function(b) {
    return arguments.length ? (T = b ? -1 : 1, R()) : T < 0;
  }, p.precision = function(b) {
    return arguments.length ? (g = QM(E, W = b * b), m()) : Hs(W);
  }, p.fitExtent = function(b, X) {
    return pr(p, b, X);
  }, p.fitSize = function(b, X) {
    return kn(p, b, X);
  }, p.fitWidth = function(b, X) {
    return Yn(p, b, X);
  }, p.fitHeight = function(b, X) {
    return Jn(p, b, X);
  };
  function R() {
    var b = kM(t, 0, 0, N, T, c).apply(null, s(M, n)), X = kM(t, e - b[0], i - b[1], N, T, c);
    return o = bn(L, d, l), E = Ni(s, X), C = Ni(o, E), g = QM(E, W), m();
  }
  a(R, "recenter");
  function m() {
    return O = V = null, p;
  }
  return a(m, "reset"), function() {
    return s = r.apply(this, arguments), p.invert = s.invert && ns, R();
  };
}
a(qn, "projectionMutator");
function Ir(r, s) {
  var t = s * s, e = t * t;
  return [
    r * (0.8707 - 0.131979 * t + e * (-0.013791 + e * (3971e-6 * t - 1529e-6 * e))),
    s * (1.007226 + t * (0.015085 + e * (-0.044475 + 0.028874 * t - 5916e-6 * e)))
  ];
}
a(Ir, "naturalEarth1Raw");
Ir.invert = function(r, s) {
  var t = s, e = 25, i;
  do {
    var M = t * t, n = M * M;
    t -= i = (t * (1.007226 + M * (0.015085 + n * (-0.044475 + 0.028874 * M - 5916e-6 * n))) - s) / (1.007226 + M * (0.015085 * 3 + n * (-0.044475 * 7 + 0.028874 * 9 * M - 5916e-6 * 11 * n)));
  } while (A(i) > v && --e > 0);
  return [
    r / (0.8707 + (M = t * t) * (-0.131979 + M * (-0.013791 + M * M * M * (3971e-6 - 1529e-6 * M)))),
    t
  ];
};
function Kn() {
  return Hn(Ir).scale(175.295);
}
a(Kn, "geoNaturalEarth1");
function s0(r) {
  return r;
}
a(s0, "identity");
function t0(r) {
  if (r == null) return s0;
  var s, t, e = r.scale[0], i = r.scale[1], M = r.translate[0], n = r.translate[1];
  return function(L, d) {
    d || (s = t = 0);
    var l = 2, o = L.length, c = new Array(o);
    for (c[0] = (s += L[0]) * e + M, c[1] = (t += L[1]) * i + n; l < o; ) c[l] = L[l], ++l;
    return c;
  };
}
a(t0, "transform");
function e0(r, s) {
  for (var t, e = r.length, i = e - s; i < --e; ) t = r[i], r[i++] = r[e], r[e] = t;
}
a(e0, "reverse");
function i0(r, s) {
  return typeof s == "string" && (s = r.objects[s]), s.type === "GeometryCollection" ? { type: "FeatureCollection", features: s.geometries.map(function(t) {
    return YM(r, t);
  }) } : YM(r, s);
}
a(i0, "feature");
function YM(r, s) {
  var t = s.id, e = s.bbox, i = s.properties == null ? {} : s.properties, M = Wr(r, s);
  return t == null && e == null ? { type: "Feature", properties: i, geometry: M } : e == null ? { type: "Feature", id: t, properties: i, geometry: M } : { type: "Feature", id: t, bbox: e, properties: i, geometry: M };
}
a(YM, "feature$1");
function Wr(r, s) {
  var t = t0(r.transform), e = r.arcs;
  function i(o, c) {
    c.length && c.pop();
    for (var N = e[o < 0 ? ~o : o], T = 0, x = N.length; T < x; ++T)
      c.push(t(N[T], T));
    o < 0 && e0(c, x);
  }
  a(i, "arc");
  function M(o) {
    return t(o);
  }
  a(M, "point");
  function n(o) {
    for (var c = [], N = 0, T = o.length; N < T; ++N) i(o[N], c);
    return c.length < 2 && c.push(c[0]), c;
  }
  a(n, "line");
  function L(o) {
    for (var c = n(o); c.length < 4; ) c.push(c[0]);
    return c;
  }
  a(L, "ring");
  function d(o) {
    return o.map(L);
  }
  a(d, "polygon");
  function l(o) {
    var c = o.type, N;
    switch (c) {
      case "GeometryCollection":
        return { type: c, geometries: o.geometries.map(l) };
      case "Point":
        N = M(o.coordinates);
        break;
      case "MultiPoint":
        N = o.coordinates.map(M);
        break;
      case "LineString":
        N = n(o.arcs);
        break;
      case "MultiLineString":
        N = o.arcs.map(n);
        break;
      case "Polygon":
        N = d(o.arcs);
        break;
      case "MultiPolygon":
        N = o.arcs.map(d);
        break;
      default:
        return null;
    }
    return { type: c, coordinates: N };
  }
  return a(l, "geometry"), l(s);
}
a(Wr, "object");
function M0(r, s) {
  var t = {}, e = {}, i = {}, M = [], n = -1;
  s.forEach(function(l, o) {
    var c = r.arcs[l < 0 ? ~l : l], N;
    c.length < 3 && !c[1][0] && !c[1][1] && (N = s[++n], s[n] = l, s[o] = N);
  }), s.forEach(function(l) {
    var o = L(l), c = o[0], N = o[1], T, x;
    if (T = i[c])
      if (delete i[T.end], T.push(l), T.end = N, x = e[N]) {
        delete e[x.start];
        var u = x === T ? T : T.concat(x);
        e[u.start = T.start] = i[u.end = x.end] = u;
      } else
        e[T.start] = i[T.end] = T;
    else if (T = e[N])
      if (delete e[T.start], T.unshift(l), T.start = c, x = i[c]) {
        delete i[x.end];
        var w = x === T ? T : x.concat(T);
        e[w.start = x.start] = i[w.end = T.end] = w;
      } else
        e[T.start] = i[T.end] = T;
    else
      T = [l], e[T.start = c] = i[T.end = N] = T;
  });
  function L(l) {
    var o = r.arcs[l < 0 ? ~l : l], c = o[0], N;
    return r.transform ? (N = [0, 0], o.forEach(function(T) {
      N[0] += T[0], N[1] += T[1];
    })) : N = o[o.length - 1], l < 0 ? [N, c] : [c, N];
  }
  a(L, "ends");
  function d(l, o) {
    for (var c in l) {
      var N = l[c];
      delete o[N.start], delete N.start, delete N.end, N.forEach(function(T) {
        t[T < 0 ? ~T : T] = 1;
      }), M.push(N);
    }
  }
  return a(d, "flush"), d(i, e), d(e, i), s.forEach(function(l) {
    t[l < 0 ? ~l : l] || M.push([l]);
  }), M;
}
a(M0, "stitch");
function r0(r) {
  return Wr(r, n0.apply(this, arguments));
}
a(r0, "mesh");
function n0(r, s, t) {
  var e, i, M;
  if (arguments.length > 1) e = L0(r, s, t);
  else for (i = 0, e = new Array(M = r.arcs.length); i < M; ++i) e[i] = i;
  return { type: "MultiLineString", arcs: M0(r, e) };
}
a(n0, "meshArcs");
function L0(r, s, t) {
  var e = [], i = [], M;
  function n(c) {
    var N = c < 0 ? ~c : c;
    (i[N] || (i[N] = [])).push({ i: c, g: M });
  }
  a(n, "extract0");
  function L(c) {
    c.forEach(n);
  }
  a(L, "extract1");
  function d(c) {
    c.forEach(L);
  }
  a(d, "extract2");
  function l(c) {
    c.forEach(d);
  }
  a(l, "extract3");
  function o(c) {
    switch (M = c, c.type) {
      case "GeometryCollection":
        c.geometries.forEach(o);
        break;
      case "LineString":
        L(c.arcs);
        break;
      case "MultiLineString":
      case "Polygon":
        d(c.arcs);
        break;
      case "MultiPolygon":
        l(c.arcs);
        break;
    }
  }
  return a(o, "geometry"), o(s), i.forEach(t == null ? function(c) {
    e.push(c[0].i);
  } : function(c) {
    t(c[0].g, c[c.length - 1].g) && e.push(c[0].i);
  }), e;
}
a(L0, "extractArcs");
const JM = {
  // Africa
  "012": "Africa",
  "024": "Africa",
  "072": "Africa",
  "084": "Africa",
  108: "Africa",
  120: "Africa",
  140: "Africa",
  148: "Africa",
  178: "Africa",
  180: "Africa",
  204: "Africa",
  226: "Africa",
  231: "Africa",
  232: "Africa",
  260: "Africa",
  262: "Africa",
  266: "Africa",
  270: "Africa",
  288: "Africa",
  324: "Africa",
  384: "Africa",
  404: "Africa",
  426: "Africa",
  430: "Africa",
  434: "Africa",
  450: "Africa",
  454: "Africa",
  466: "Africa",
  478: "Africa",
  504: "Africa",
  508: "Africa",
  516: "Africa",
  562: "Africa",
  566: "Africa",
  624: "Africa",
  646: "Africa",
  686: "Africa",
  694: "Africa",
  706: "Africa",
  710: "Africa",
  716: "Africa",
  728: "Africa",
  729: "Africa",
  732: "Africa",
  748: "Africa",
  768: "Africa",
  788: "Africa",
  800: "Africa",
  834: "Africa",
  854: "Africa",
  894: "Africa",
  // Europe
  "008": "Europe",
  "040": "Europe",
  "056": "Europe",
  "070": "Europe",
  100: "Europe",
  112: "Europe",
  191: "Europe",
  196: "Europe",
  203: "Europe",
  208: "Europe",
  233: "Europe",
  246: "Europe",
  250: "Europe",
  268: "Europe",
  276: "Europe",
  300: "Europe",
  348: "Europe",
  352: "Europe",
  372: "Europe",
  380: "Europe",
  428: "Europe",
  440: "Europe",
  442: "Europe",
  498: "Europe",
  499: "Europe",
  528: "Europe",
  578: "Europe",
  616: "Europe",
  620: "Europe",
  642: "Europe",
  643: "Europe",
  688: "Europe",
  703: "Europe",
  705: "Europe",
  724: "Europe",
  752: "Europe",
  756: "Europe",
  804: "Europe",
  807: "Europe",
  826: "Europe",
  // Asia
  "004": "Asia",
  "031": "Asia",
  "048": "Asia",
  "050": "Asia",
  "051": "Asia",
  "064": "Asia",
  "096": "Asia",
  104: "Asia",
  116: "Asia",
  144: "Asia",
  156: "Asia",
  158: "Asia",
  275: "Asia",
  356: "Asia",
  360: "Asia",
  364: "Asia",
  368: "Asia",
  376: "Asia",
  392: "Asia",
  398: "Asia",
  400: "Asia",
  408: "Asia",
  410: "Asia",
  414: "Asia",
  417: "Asia",
  418: "Asia",
  422: "Asia",
  458: "Asia",
  496: "Asia",
  512: "Asia",
  524: "Asia",
  586: "Asia",
  608: "Asia",
  626: "Asia",
  634: "Asia",
  682: "Asia",
  702: "Asia",
  704: "Asia",
  760: "Asia",
  762: "Asia",
  764: "Asia",
  784: "Asia",
  792: "Asia",
  795: "Asia",
  860: "Asia",
  887: "Asia",
  // North America
  "044": "North America",
  124: "North America",
  188: "North America",
  192: "North America",
  214: "North America",
  222: "North America",
  320: "North America",
  332: "North America",
  340: "North America",
  388: "North America",
  484: "North America",
  558: "North America",
  591: "North America",
  630: "North America",
  780: "North America",
  840: "North America",
  // South America
  "032": "South America",
  "068": "South America",
  "076": "South America",
  152: "South America",
  170: "South America",
  218: "South America",
  238: "South America",
  328: "South America",
  600: "South America",
  604: "South America",
  740: "South America",
  858: "South America",
  862: "South America",
  // Oceania
  "010": "Oceania",
  "036": "Oceania",
  "090": "Oceania",
  242: "Oceania",
  540: "Oceania",
  548: "Oceania",
  554: "Oceania",
  598: "Oceania",
  // Antarctica
  304: "Oceania"
  // Greenland → grouped with Oceania for map zoom
}, a0 = {
  AF: "004",
  AL: "008",
  AQ: "010",
  DZ: "012",
  AO: "024",
  AZ: "031",
  AR: "032",
  AU: "036",
  AT: "040",
  BS: "044",
  BD: "050",
  AM: "051",
  BE: "056",
  BT: "064",
  BO: "068",
  BA: "070",
  BW: "072",
  BZ: "084",
  BR: "076",
  BN: "096",
  BG: "100",
  MM: "104",
  BI: "108",
  BY: "112",
  KH: "116",
  CM: "120",
  CA: "124",
  CF: "140",
  LK: "144",
  TD: "148",
  CL: "152",
  CN: "156",
  TW: "158",
  CO: "170",
  CG: "178",
  CD: "180",
  CR: "188",
  HR: "191",
  CU: "192",
  CY: "196",
  CZ: "203",
  BJ: "204",
  DK: "208",
  DO: "214",
  EC: "218",
  SV: "222",
  GQ: "226",
  ER: "232",
  EE: "233",
  ET: "231",
  FK: "238",
  FJ: "242",
  FI: "246",
  FR: "250",
  DJ: "262",
  GA: "266",
  GE: "268",
  GM: "270",
  PS: "275",
  DE: "276",
  GH: "288",
  GR: "300",
  GL: "304",
  GT: "320",
  GN: "324",
  GY: "328",
  HT: "332",
  HN: "340",
  HU: "348",
  IS: "352",
  IN: "356",
  ID: "360",
  IR: "364",
  IQ: "368",
  IE: "372",
  IL: "376",
  IT: "380",
  CI: "384",
  JM: "388",
  JP: "392",
  KZ: "398",
  JO: "400",
  KE: "404",
  KP: "408",
  KR: "410",
  KW: "414",
  KG: "417",
  LA: "418",
  LB: "422",
  LS: "426",
  LV: "428",
  LR: "430",
  LY: "434",
  LT: "440",
  LU: "442",
  MG: "450",
  MW: "454",
  MY: "458",
  ML: "466",
  MR: "478",
  MX: "484",
  MN: "496",
  MD: "498",
  ME: "499",
  MA: "504",
  MZ: "508",
  OM: "512",
  NA: "516",
  NP: "524",
  NL: "528",
  NC: "540",
  VU: "548",
  NZ: "554",
  NI: "558",
  NE: "562",
  NG: "566",
  NO: "578",
  PK: "586",
  PA: "591",
  PG: "598",
  PY: "600",
  PE: "604",
  PH: "608",
  PL: "616",
  PT: "620",
  GW: "624",
  TL: "626",
  PR: "630",
  QA: "634",
  RO: "642",
  RU: "643",
  RW: "646",
  SA: "682",
  SN: "686",
  RS: "688",
  SL: "694",
  SK: "703",
  VN: "704",
  SI: "705",
  SO: "706",
  ZA: "710",
  ZW: "716",
  SS: "728",
  SD: "729",
  EH: "732",
  SR: "740",
  SZ: "748",
  SE: "752",
  CH: "756",
  SY: "760",
  TJ: "762",
  TH: "764",
  TG: "768",
  TT: "780",
  AE: "784",
  TN: "788",
  TR: "792",
  TM: "795",
  UG: "800",
  UA: "804",
  MK: "807",
  EG: "818",
  GB: "826",
  TZ: "834",
  US: "840",
  BF: "854",
  UY: "858",
  UZ: "860",
  VE: "862",
  YE: "887",
  ZM: "894",
  // Missing from initial mapping
  ES: "724",
  SG: "702",
  BH: "048",
  // SB missing in 110m but keep for completeness
  SB: "090",
  GD: "308"
}, o0 = {
  AFG: "004",
  ALB: "008",
  ATA: "010",
  DZA: "012",
  AGO: "024",
  AZE: "031",
  ARG: "032",
  AUS: "036",
  AUT: "040",
  BHS: "044",
  BGD: "050",
  ARM: "051",
  BEL: "056",
  BTN: "064",
  BOL: "068",
  BIH: "070",
  BWA: "072",
  BLZ: "084",
  BRA: "076",
  BRN: "096",
  BGR: "100",
  MMR: "104",
  BDI: "108",
  BLR: "112",
  KHM: "116",
  CMR: "120",
  CAN: "124",
  CAF: "140",
  LKA: "144",
  TCD: "148",
  CHL: "152",
  CHN: "156",
  TWN: "158",
  COL: "170",
  COG: "178",
  COD: "180",
  CRI: "188",
  HRV: "191",
  CUB: "192",
  CYP: "196",
  CZE: "203",
  BEN: "204",
  DNK: "208",
  DOM: "214",
  ECU: "218",
  SLV: "222",
  GNQ: "226",
  ERI: "232",
  EST: "233",
  ETH: "231",
  FLK: "238",
  FJI: "242",
  FIN: "246",
  FRA: "250",
  DJI: "262",
  GAB: "266",
  GEO: "268",
  GMB: "270",
  PSE: "275",
  DEU: "276",
  GHA: "288",
  GRC: "300",
  GRL: "304",
  GTM: "320",
  GIN: "324",
  GUY: "328",
  HTI: "332",
  HND: "340",
  HUN: "348",
  ISL: "352",
  IND: "356",
  IDN: "360",
  IRN: "364",
  IRQ: "368",
  IRL: "372",
  ISR: "376",
  ITA: "380",
  CIV: "384",
  JAM: "388",
  JPN: "392",
  KAZ: "398",
  JOR: "400",
  KEN: "404",
  PRK: "408",
  KOR: "410",
  KWT: "414",
  KGZ: "417",
  LAO: "418",
  LBN: "422",
  LSO: "426",
  LVA: "428",
  LBR: "430",
  LBY: "434",
  LTU: "440",
  LUX: "442",
  MDG: "450",
  MWI: "454",
  MYS: "458",
  MLI: "466",
  MRT: "478",
  MEX: "484",
  MNG: "496",
  MDA: "498",
  MNE: "499",
  MAR: "504",
  MOZ: "508",
  OMN: "512",
  NAM: "516",
  NPL: "524",
  NLD: "528",
  NCL: "540",
  VUT: "548",
  NZL: "554",
  NIC: "558",
  NER: "562",
  NGA: "566",
  NOR: "578",
  PAK: "586",
  PAN: "591",
  PNG: "598",
  PRY: "600",
  PER: "604",
  PHL: "608",
  POL: "616",
  PRT: "620",
  GNB: "624",
  TLS: "626",
  PRI: "630",
  QAT: "634",
  ROU: "642",
  RUS: "643",
  RWA: "646",
  SAU: "682",
  SEN: "686",
  SRB: "688",
  SLE: "694",
  SVK: "703",
  VNM: "704",
  SVN: "705",
  SOM: "706",
  ZAF: "710",
  ZWE: "716",
  SSD: "728",
  SDN: "729",
  ESH: "732",
  SUR: "740",
  SWZ: "748",
  SWE: "752",
  CHE: "756",
  SYR: "760",
  TJK: "762",
  THA: "764",
  TGO: "768",
  TTO: "780",
  ARE: "784",
  TUN: "788",
  TUR: "792",
  TKM: "795",
  UGA: "800",
  UKR: "804",
  MKD: "807",
  EGY: "818",
  GBR: "826",
  TZA: "834",
  USA: "840",
  BFA: "854",
  URY: "858",
  UZB: "860",
  VEN: "862",
  YEM: "887",
  ZMB: "894",
  // Missing from initial mapping
  ESP: "724",
  SGP: "702",
  BHR: "048",
  SLB: "090"
};
function l0(r, s) {
  const t = r.trim().toUpperCase();
  switch (s) {
    case "iso-a2":
      return a0[t] || "";
    case "iso-a3":
      return o0[t] || "";
    case "iso-num":
      return t.padStart(3, "0");
  }
}
a(l0, "toIsoNumeric");
const d0 = {
  "004": "Afghanistan",
  "008": "Albanie",
  "010": "Antarctique",
  "012": "Algerie",
  "024": "Angola",
  "031": "Azerbaidjan",
  "032": "Argentine",
  "036": "Australie",
  "040": "Autriche",
  "044": "Bahamas",
  "050": "Bangladesh",
  "051": "Armenie",
  "056": "Belgique",
  "064": "Bhoutan",
  "068": "Bolivie",
  "070": "Bosnie-Herzegovine",
  "072": "Botswana",
  "076": "Bresil",
  "084": "Belize",
  "090": "Iles Salomon",
  "096": "Brunei",
  100: "Bulgarie",
  104: "Myanmar",
  108: "Burundi",
  112: "Bielorussie",
  116: "Cambodge",
  120: "Cameroun",
  124: "Canada",
  140: "Republique centrafricaine",
  144: "Sri Lanka",
  148: "Tchad",
  152: "Chili",
  156: "Chine",
  158: "Taiwan",
  170: "Colombie",
  178: "Congo",
  180: "Republique democratique du Congo",
  188: "Costa Rica",
  191: "Croatie",
  192: "Cuba",
  196: "Chypre",
  203: "Republique tcheque",
  204: "Benin",
  208: "Danemark",
  214: "Republique dominicaine",
  218: "Equateur",
  222: "Salvador",
  226: "Guinee equatoriale",
  231: "Ethiopie",
  232: "Erythree",
  233: "Estonie",
  238: "Iles Malouines",
  242: "Fidji",
  246: "Finlande",
  250: "France",
  260: "Terres australes francaises",
  262: "Djibouti",
  266: "Gabon",
  268: "Georgie",
  270: "Gambie",
  275: "Palestine",
  276: "Allemagne",
  288: "Ghana",
  300: "Grece",
  304: "Groenland",
  320: "Guatemala",
  324: "Guinee",
  328: "Guyana",
  332: "Haiti",
  340: "Honduras",
  348: "Hongrie",
  352: "Islande",
  356: "Inde",
  360: "Indonesie",
  364: "Iran",
  368: "Irak",
  372: "Irlande",
  376: "Israel",
  380: "Italie",
  384: "Cote d'Ivoire",
  388: "Jamaique",
  392: "Japon",
  398: "Kazakhstan",
  400: "Jordanie",
  404: "Kenya",
  408: "Coree du Nord",
  410: "Coree du Sud",
  414: "Koweit",
  417: "Kirghizistan",
  418: "Laos",
  422: "Liban",
  426: "Lesotho",
  428: "Lettonie",
  430: "Liberia",
  434: "Libye",
  440: "Lituanie",
  442: "Luxembourg",
  450: "Madagascar",
  454: "Malawi",
  458: "Malaisie",
  466: "Mali",
  478: "Mauritanie",
  484: "Mexique",
  496: "Mongolie",
  498: "Moldavie",
  499: "Montenegro",
  504: "Maroc",
  508: "Mozambique",
  512: "Oman",
  516: "Namibie",
  524: "Nepal",
  528: "Pays-Bas",
  540: "Nouvelle-Caledonie",
  548: "Vanuatu",
  554: "Nouvelle-Zelande",
  558: "Nicaragua",
  562: "Niger",
  566: "Nigeria",
  578: "Norvege",
  586: "Pakistan",
  591: "Panama",
  598: "Papouasie-Nouvelle-Guinee",
  600: "Paraguay",
  604: "Perou",
  608: "Philippines",
  616: "Pologne",
  620: "Portugal",
  624: "Guinee-Bissau",
  626: "Timor oriental",
  630: "Porto Rico",
  634: "Qatar",
  642: "Roumanie",
  643: "Russie",
  646: "Rwanda",
  682: "Arabie saoudite",
  686: "Senegal",
  688: "Serbie",
  694: "Sierra Leone",
  703: "Slovaquie",
  704: "Vietnam",
  705: "Slovenie",
  706: "Somalie",
  710: "Afrique du Sud",
  716: "Zimbabwe",
  724: "Espagne",
  728: "Soudan du Sud",
  729: "Soudan",
  732: "Sahara occidental",
  740: "Suriname",
  748: "Eswatini",
  752: "Suede",
  756: "Suisse",
  760: "Syrie",
  762: "Tadjikistan",
  764: "Thailande",
  768: "Togo",
  780: "Trinite-et-Tobago",
  784: "Emirats arabes unis",
  788: "Tunisie",
  792: "Turquie",
  795: "Turkmenistan",
  800: "Ouganda",
  804: "Ukraine",
  807: "Macedoine du Nord",
  818: "Egypte",
  826: "Royaume-Uni",
  834: "Tanzanie",
  840: "Etats-Unis",
  854: "Burkina Faso",
  858: "Uruguay",
  860: "Ouzbekistan",
  862: "Venezuela",
  887: "Yemen",
  894: "Zambie"
};
var rs = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
};
let ze = null;
async function c0() {
  if (ze)
    return ze;
  const r = new URL("data:application/json;base64,eyJ0eXBlIjoiVG9wb2xvZ3kiLCJvYmplY3RzIjp7ImNvdW50cmllcyI6eyJ0eXBlIjoiR2VvbWV0cnlDb2xsZWN0aW9uIiwiZ2VvbWV0cmllcyI6W3sidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWzBdXSxbWzFdXV0sImlkIjoiMjQyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiRmlqaSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1syLDMsNCw1LDYsNyw4LDksMTBdXSwiaWQiOiI4MzQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJUYW56YW5pYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1sxMSwxMiwxMywxNF1dLCJpZCI6IjczMiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlcuIFNhaGFyYSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1sxNSwxNiwxNywxOF1dLFtbMTldXSxbWzIwXV0sW1syMV1dLFtbMjJdXSxbWzIzXV0sW1syNF1dLFtbMjVdXSxbWzI2XV0sW1syN11dLFtbMjhdXSxbWzI5XV0sW1szMF1dLFtbMzFdXSxbWzMyXV0sW1szM11dLFtbMzRdXSxbWzM1XV0sW1szNl1dLFtbMzddXSxbWzM4XV0sW1szOV1dLFtbNDBdXSxbWzQxXV0sW1s0Ml1dLFtbNDNdXSxbWzQ0XV0sW1s0NV1dLFtbNDZdXSxbWzQ3XV1dLCJpZCI6IjEyNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkNhbmFkYSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1stMTksNDgsNDksNTBdXSxbWzUxXV0sW1s1Ml1dLFtbNTNdXSxbWzU0XV0sW1s1NV1dLFtbNTZdXSxbWzU3XV0sW1stMTcsNThdXSxbWzU5XV1dLCJpZCI6Ijg0MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlVuaXRlZCBTdGF0ZXMgb2YgQW1lcmljYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1s2MCw2MSw2Miw2Myw2NCw2NV1dLCJpZCI6IjM5OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkthemFraHN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTYzLDY2LDY3LDY4LDY5XV0sImlkIjoiODYwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiVXpiZWtpc3RhbiJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1s3MCw3MV1dLFtbNzJdXSxbWzczXV0sW1s3NF1dXSwiaWQiOiI1OTgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJQYXB1YSBOZXcgR3VpbmVhIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWy03Miw3NV1dLFtbNzYsNzddXSxbWzc4XV0sW1s3OSw4MF1dLFtbODFdXSxbWzgyXV0sW1s4M11dLFtbODRdXSxbWzg1XV0sW1s4Nl1dLFtbODddXSxbWzg4XV0sW1s4OV1dXSwiaWQiOiIzNjAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJJbmRvbmVzaWEifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbOTAsOTFdXSxbWzkyLDkzLDk0LDk1LDk2LDk3XV1dLCJpZCI6IjAzMiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkFyZ2VudGluYSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1stOTIsOThdXSxbWzk5LC05NSwxMDAsMTAxXV1dLCJpZCI6IjE1MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkNoaWxlIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy04LDEwMiwxMDMsMTA0LDEwNSwxMDYsMTA3LDEwOCwxMDksMTEwLDExMV1dLCJpZCI6IjE4MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkRlbS4gUmVwLiBDb25nbyJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1sxMTIsMTEzLDExNCwxMTVdXSwiaWQiOiI3MDYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJTb21hbGlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zLDExNiwxMTcsMTE4LC0xMTMsMTE5XV0sImlkIjoiNDA0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiS2VueWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMTIwLDEyMSwxMjIsMTIzLDEyNCwxMjUsMTI2LDEyN11dLCJpZCI6IjcyOSIsInByb3BlcnRpZXMiOnsibmFtZSI6IlN1ZGFuIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xMjIsMTI4LDEyOSwxMzAsMTMxXV0sImlkIjoiMTQ4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQ2hhZCJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1sxMzIsMTMzXV0sImlkIjoiMzMyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiSGFpdGkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEzMywxMzRdXSwiaWQiOiIyMTQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJEb21pbmljYW4gUmVwLiJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1sxMzVdXSxbWzEzNl1dLFtbMTM3XV0sW1sxMzhdXSxbWzEzOV1dLFtbMTQwXV0sW1sxNDEsMTQyLDE0M11dLFtbMTQ0XV0sW1sxNDVdXSxbWzE0NiwxNDcsMTQ4LDE0OSwtNjYsMTUwLDE1MSwxNTIsMTUzLDE1NCwxNTUsMTU2LDE1NywxNTgsMTU5LDE2MCwxNjFdXSxbWzE2Ml1dLFtbMTYzLDE2NF1dXSwiaWQiOiI2NDMiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJSdXNzaWEifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbMTY1XV0sW1sxNjZdXSxbWzE2N11dXSwiaWQiOiIwNDQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJCYWhhbWFzIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzE2OF1dLCJpZCI6IjIzOCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkZhbGtsYW5kIElzLiJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1sxNjldXSxbWy0xNjEsMTcwLDE3MSwxNzJdXSxbWzE3M11dLFtbMTc0XV1dLCJpZCI6IjU3OCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5vcndheSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1sxNzVdXSwiaWQiOiIzMDQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJHcmVlbmxhbmQifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMTc2XV0sImlkIjoiMjYwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiRnIuIFMuIEFudGFyY3RpYyBMYW5kcyJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1sxNzcsLTc3XV0sImlkIjoiNjI2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiVGltb3ItTGVzdGUifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMTc4LDE3OSwxODAsMTgxLDE4MiwxODMsMTg0XSxbMTg1XV0sImlkIjoiNzEwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiU291dGggQWZyaWNhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xODZdXSwiaWQiOiI0MjYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJMZXNvdGhvIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy01MCwxODYsMTg3LDE4OCwxODldXSwiaWQiOiI0ODQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJNZXhpY28ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMTkwLDE5MSwtOTNdXSwiaWQiOiI4NTgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJVcnVndWF5In19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xOTEsLTk4LDE5MiwxOTMsMTk0LDE5NSwxOTYsMTk3LDE5OCwxOTksMjAwXV0sImlkIjoiMDc2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQnJhemlsIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xOTQsMjAxLC05NiwtMTAwLDIwMl1dLCJpZCI6IjA2OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJvbGl2aWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE5NSwtMjAzLC0xMDIsMjAzLDIwNCwyMDVdXSwiaWQiOiI2MDQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJQZXJ1In19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xOTYsLTIwNiwyMDYsMjA3LDIwOCwyMDksMjEwXV0sImlkIjoiMTcwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiQ29sb21iaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTIwOSwyMTEsMjEyLDIxM11dLCJpZCI6IjU5MSIsInByb3BlcnRpZXMiOnsibmFtZSI6IlBhbmFtYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjEzLDIxNCwyMTUsMjE2XV0sImlkIjoiMTg4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQ29zdGEgUmljYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjE2LDIxNywyMTgsMjE5XV0sImlkIjoiNTU4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTmljYXJhZ3VhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0yMTksMjIwLDIyMSwyMjIsMjIzXV0sImlkIjoiMzQwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiSG9uZHVyYXMifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTIyMiwyMjQsMjI1XV0sImlkIjoiMjIyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiRWwgU2FsdmFkb3IifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE4OSwyMjYsMjI3LC0yMjMsLTIyNiwyMjhdXSwiaWQiOiIzMjAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJHdWF0ZW1hbGEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE4OCwyMjksLTIyN11dLCJpZCI6IjA4NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJlbGl6ZSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTk3LC0yMTEsMjMwLDIzMV1dLCJpZCI6Ijg2MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlZlbmV6dWVsYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTk4LC0yMzIsMjMyLDIzM11dLCJpZCI6IjMyOCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ikd1eWFuYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTk5LC0yMzQsMjM0LDIzNV1dLCJpZCI6Ijc0MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlN1cmluYW1lIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWy0yMDAsLTIzNiwyMzZdXSxbWzIzNywyMzgsMjM5LDI0MCwyNDEsMjQyLDI0MywyNDRdXSxbWzI0NV1dXSwiaWQiOiIyNTAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJGcmFuY2UifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTIwNSwyNDYsLTIwN11dLCJpZCI6IjIxOCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkVjdWFkb3IifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMjQ3XV0sImlkIjoiNjMwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiUHVlcnRvIFJpY28ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMjQ4XV0sImlkIjoiMzg4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiSmFtYWljYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1syNDldXSwiaWQiOiIxOTIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJDdWJhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xODEsMjUwLDI1MSwyNTJdXSwiaWQiOiI3MTYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJaaW1iYWJ3ZSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTgwLDI1MywyNTQsLTI1MV1dLCJpZCI6IjA3MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJvdHN3YW5hIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xNzksMjU1LDI1NiwyNTcsLTI1NF1dLCJpZCI6IjUxNiIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5hbWliaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMjU4LDI1OSwyNjAsMjYxLDI2MiwyNjMsMjY0XV0sImlkIjoiNjg2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiU2VuZWdhbCJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjYxLDI2NSwyNjYsMjY3LDI2OCwyNjksMjcwXV0sImlkIjoiNDY2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTWFsaSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTMsMjcxLC0yNjYsLTI2MCwyNzJdXSwiaWQiOiI0NzgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJNYXVyaXRhbmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzI3MywyNzQsMjc1LDI3NiwyNzddXSwiaWQiOiIyMDQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJCZW5pbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTMxLDI3OCwyNzksLTI3NywyODAsLTI2OCwyODEsMjgyXV0sImlkIjoiNTYyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiTmlnZXIifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTI3OCwtMjgwLDI4MywyODRdXSwiaWQiOiI1NjYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJOaWdlcmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xMzAsMjg1LDI4NiwyODcsMjg4LDI4OSwtMjg0LC0yNzldXSwiaWQiOiIxMjAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJDYW1lcm9vbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjc1LDI5MCwyOTEsMjkyXV0sImlkIjoiNzY4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiVG9nbyJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjkyLDI5MywyOTQsMjk1XV0sImlkIjoiMjg4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiR2hhbmEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTI3MCwyOTYsLTI5NSwyOTcsMjk4LDI5OV1dLCJpZCI6IjM4NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkPDtHRlIGQnSXZvaXJlIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0yNjIsLTI3MSwtMzAwLDMwMCwzMDEsMzAyLDMwM11dLCJpZCI6IjMyNCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ikd1aW5lYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjYzLC0zMDQsMzA0XV0sImlkIjoiNjI0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiR3VpbmVhLUJpc3NhdSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjk5LDMwNSwzMDYsLTMwMV1dLCJpZCI6IjQzMCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkxpYmVyaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTMwMiwtMzA3LDMwN11dLCJpZCI6IjY5NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlNpZXJyYSBMZW9uZSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjY5LC0yODEsLTI3NiwtMjkzLC0yOTYsLTI5N11dLCJpZCI6Ijg1NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJ1cmtpbmEgRmFzbyJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTA4LDMwOCwtMjg2LC0xMjksLTEyMSwzMDldXSwiaWQiOiIxNDAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJDZW50cmFsIEFmcmljYW4gUmVwLiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTA3LDMxMCwzMTEsMzEyLC0yODcsLTMwOV1dLCJpZCI6IjE3OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkNvbmdvIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0yODgsLTMxMywzMTMsMzE0XV0sImlkIjoiMjY2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiR2Fib24ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTI4OSwtMzE1LDMxNV1dLCJpZCI6IjIyNiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkVxLiBHdWluZWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTcsMzE2LDMxNywtMjUyLC0yNTUsLTI1OCwzMTgsLTEwM11dLCJpZCI6Ijg5NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlphbWJpYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNiwzMTksLTMxN11dLCJpZCI6IjQ1NCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik1hbGF3aSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNSwzMjAsLTE4NCwzMjEsLTE4MiwtMjUzLC0zMTgsLTMyMF1dLCJpZCI6IjUwOCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik1vemFtYmlxdWUifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE4MywtMzIyXV0sImlkIjoiNzQ4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiZVN3YXRpbmkifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbLTEwNiwzMjIsLTMxMV1dLFtbLTEwNCwtMzE5LC0yNTcsMzIzXV1dLCJpZCI6IjAyNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkFuZ29sYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stOSwtMTEyLDMyNF1dLCJpZCI6IjEwOCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJ1cnVuZGkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMzI1LDMyNiwzMjcsMzI4LDMyOSwzMzAsMzMxXV0sImlkIjoiMzc2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiSXNyYWVsIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zMzEsMzMyLDMzM11dLCJpZCI6IjQyMiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkxlYmFub24ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMzM0XV0sImlkIjoiNDUwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiTWFkYWdhc2NhciJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzI3LDMzNV1dLCJpZCI6IjI3NSIsInByb3BlcnRpZXMiOnsibmFtZSI6IlBhbGVzdGluZSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjY1LDMzNl1dLCJpZCI6IjI3MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkdhbWJpYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1szMzcsMzM4LDMzOV1dLCJpZCI6Ijc4OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlR1bmlzaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEyLDM0MCwzNDEsLTMzOCwzNDIsLTI4MiwtMjY3LC0yNzJdXSwiaWQiOiIwMTIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJBbGdlcmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zMjYsMzQzLDM0NCwzNDUsMzQ2LC0zMjgsLTMzNl1dLCJpZCI6IjQwMCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkpvcmRhbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1szNDcsMzQ4LDM0OSwzNTAsMzUxXV0sImlkIjoiNzg0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiVW5pdGVkIEFyYWIgRW1pcmF0ZXMifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMzUyLDM1M11dLCJpZCI6IjYzNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlFhdGFyIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzM1NCwzNTUsMzU2XV0sImlkIjoiNDE0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiS3V3YWl0In19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zNDUsMzU3LDM1OCwzNTksMzYwLC0zNTcsMzYxXV0sImlkIjoiMzY4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiSXJhcSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1stMzUxLDM2MiwzNjMsMzY0XV0sW1stMzQ5LDM2NV1dXSwiaWQiOiI1MTIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJPbWFuIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWzM2Nl1dLFtbMzY3XV1dLCJpZCI6IjU0OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlZhbnVhdHUifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMzY4LDM2OSwzNzAsMzcxXV0sImlkIjoiMTE2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQ2FtYm9kaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTM2OSwzNzIsMzczLDM3NCwzNzUsMzc2XV0sImlkIjoiNzY0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiVGhhaWxhbmQifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTM3MCwtMzc3LDM3NywzNzgsMzc5XV0sImlkIjoiNDE4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTGFvcyJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzc2LDM4MCwzODEsMzgyLDM4MywtMzc4XV0sImlkIjoiMTA0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTXlhbm1hciJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzcxLC0zODAsMzg0LDM4NV1dLCJpZCI6IjcwNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlZpZXRuYW0ifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbMzg2LDM4NiwzODZdXSxbWy0xNDcsMzg3LDM4OCwzODksMzkwXV1dLCJpZCI6IjQwOCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5vcnRoIEtvcmVhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zODksMzkxXV0sImlkIjoiNDEwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiU291dGggS29yZWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE0OSwzOTJdXSwiaWQiOiI0OTYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJNb25nb2xpYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzgzLDM5MywzOTQsMzk1LDM5NiwzOTcsMzk4LDM5OSw0MDBdXSwiaWQiOiIzNTYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJJbmRpYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzgyLDQwMSwtMzk0XV0sImlkIjoiMDUwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiQmFuZ2xhZGVzaCJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNDAwLDQwMl1dLCJpZCI6IjA2NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJodXRhbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzk4LDQwM11dLCJpZCI6IjUyNCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5lcGFsIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zOTYsNDA0LDQwNSw0MDYsNDA3XV0sImlkIjoiNTg2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiUGFraXN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTY5LDQwOCw0MDksLTQwNyw0MTAsNDExXV0sImlkIjoiMDA0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQWZnaGFuaXN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTY4LDQxMiw0MTMsLTQwOV1dLCJpZCI6Ijc2MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlRhamlraXN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTYyLDQxNCwtNDEzLC02N11dLCJpZCI6IjQxNyIsInByb3BlcnRpZXMiOnsibmFtZSI6Ikt5cmd5enN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTY0LC03MCwtNDEyLDQxNSw0MTZdXSwiaWQiOiI3OTUiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJUdXJrbWVuaXN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTM2MCw0MTcsNDE4LDQxOSw0MjAsNDIxLC00MTYsLTQxMSwtNDA2LDQyMl1dLCJpZCI6IjM2NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IklyYW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTMzMiwtMzM0LDQyMyw0MjQsLTM1OCwtMzQ0XV0sImlkIjoiNzYwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiU3lyaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQyMCw0MjUsNDI2LDQyNyw0MjhdXSwiaWQiOiIwNTEiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJBcm1lbmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xNzIsNDI5LDQzMF1dLCJpZCI6Ijc1MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlN3ZWRlbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTU2LDQzMSw0MzIsNDMzLDQzNF1dLCJpZCI6IjExMiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJlbGFydXMifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE1NSw0MzUsLTE2NCw0MzYsNDM3LDQzOCw0MzksNDQwLDQ0MSw0NDIsLTQzMl1dLCJpZCI6IjgwNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlVrcmFpbmUifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQzMywtNDQzLDQ0Myw0NDQsNDQ1LDQ0NiwtMTQyLDQ0N11dLCJpZCI6IjYxNiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlBvbGFuZCJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1s0NDgsNDQ5LDQ1MCw0NTEsNDUyLDQ1Myw0NTRdXSwiaWQiOiIwNDAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJBdXN0cmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00NDEsNDU1LDQ1Niw0NTcsNDU4LC00NDksNDU5XV0sImlkIjoiMzQ4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiSHVuZ2FyeSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNDM5LDQ2MF1dLCJpZCI6IjQ5OCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik1vbGRvdmEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQzOCw0NjEsNDYyLDQ2MywtNDU2LC00NDAsLTQ2MV1dLCJpZCI6IjY0MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlJvbWFuaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQzNCwtNDQ4LC0xNDQsNDY0LDQ2NV1dLCJpZCI6IjQ0MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkxpdGh1YW5pYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTU3LC00MzUsLTQ2Niw0NjYsNDY3XV0sImlkIjoiNDI4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTGF0dmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xNTgsLTQ2OCw0NjhdXSwiaWQiOiIyMzMiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJFc3RvbmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00NDYsNDY5LC00NTMsNDcwLC0yMzgsNDcxLDQ3Miw0NzMsNDc0LDQ3NSw0NzZdXSwiaWQiOiIyNzYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJHZXJtYW55In19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00NjMsNDc3LDQ3OCw0NzksNDgwLDQ4MV1dLCJpZCI6IjEwMCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJ1bGdhcmlhIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWzQ4Ml1dLFtbLTQ4MCw0ODMsNDg0LDQ4NSw0ODZdXV0sImlkIjoiMzAwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiR3JlZWNlIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWy0zNTksLTQyNSw0ODcsNDg4LC00MjcsLTQxOF1dLFtbLTQ3OSw0ODksLTQ4NF1dXSwiaWQiOiI3OTIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJUdXJrZXkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ4Niw0OTAsNDkxLDQ5Miw0OTNdXSwiaWQiOiIwMDgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJBbGJhbmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00NTgsNDk0LDQ5NSw0OTYsNDk3LDQ5OF1dLCJpZCI6IjE5MSIsInByb3BlcnRpZXMiOnsibmFtZSI6IkNyb2F0aWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ1Miw0OTksLTIzOSwtNDcxXV0sImlkIjoiNzU2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiU3dpdHplcmxhbmQifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ3MiwtMjQ1LDUwMF1dLCJpZCI6IjQ0MiIsInByb3BlcnRpZXMiOnsibmFtZSI6Ikx1eGVtYm91cmcifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ3MywtNTAxLC0yNDQsNTAxLDUwMl1dLCJpZCI6IjA1NiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJlbGdpdW0ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ3NCwtNTAzLDUwM11dLCJpZCI6IjUyOCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5ldGhlcmxhbmRzIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzUwNCw1MDVdXSwiaWQiOiI2MjAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJQb3J0dWdhbCJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNTA1LDUwNiwtMjQyLDUwN11dLCJpZCI6IjcyNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlNwYWluIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzUwOCw1MDldXSwiaWQiOiIzNzIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJJcmVsYW5kIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzUxMF1dLCJpZCI6IjU0MCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5ldyBDYWxlZG9uaWEifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbNTExXV0sW1s1MTJdXSxbWzUxM11dLFtbNTE0XV0sW1s1MTVdXV0sImlkIjoiMDkwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiU29sb21vbiBJcy4ifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbNTE2XV0sW1s1MTddXV0sImlkIjoiNTU0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTmV3IFplYWxhbmQifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbNTE4XV0sW1s1MTldXV0sImlkIjoiMDM2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQXVzdHJhbGlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzUyMF1dLCJpZCI6IjE0NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlNyaSBMYW5rYSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1s1MjFdXSxbWy02MSwtMTUwLC0zOTMsLTE0OCwtMzkxLDUyMiwtMzg1LC0zNzksLTM4NCwtNDAxLC00MDMsLTM5OSwtNDA0LC0zOTcsLTQwOCwtNDEwLC00MTQsLTQxNV1dXSwiaWQiOiIxNTYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJDaGluYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1s1MjNdXSwiaWQiOiIxNTgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJUYWl3YW4ifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbLTQ1MSw1MjQsNTI1LC0yNDAsLTUwMF1dLFtbNTI2XV0sW1s1MjddXV0sImlkIjoiMzgwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiSXRhbHkifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbLTQ3Niw1MjhdXSxbWzUyOV1dXSwiaWQiOiIyMDgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJEZW5tYXJrIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWy01MTAsNTMwXV0sW1s1MzFdXV0sImlkIjoiODI2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiVW5pdGVkIEtpbmdkb20ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbNTMyXV0sImlkIjoiMzUyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiSWNlbGFuZCJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1stMTUyLDUzMywtNDIxLC00MjksNTM0XV0sW1stNDE5LC00MjZdXV0sImlkIjoiMDMxIiwicHJvcGVydGllcyI6eyJuYW1lIjoiQXplcmJhaWphbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTUzLC01MzUsLTQyOCwtNDg5LDUzNV1dLCJpZCI6IjI2OCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ikdlb3JnaWEifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbNTM2XV0sW1s1MzddXSxbWzUzOF1dLFtbNTM5XV0sW1s1NDBdXSxbWzU0MV1dLFtbNTQyXV1dLCJpZCI6IjYwOCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlBoaWxpcHBpbmVzIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWy0zNzQsNTQzXV0sW1stODEsNTQ0LDU0NSw1NDZdXV0sImlkIjoiNDU4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTWFsYXlzaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTU0Niw1NDddXSwiaWQiOiIwOTYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJCcnVuZWkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ1MCwtNDU5LC00OTksNTQ4LC01MjVdXSwiaWQiOiI3MDUiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJTbG92ZW5pYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTYwLDU0OSwtNDMwLC0xNzFdXSwiaWQiOiIyNDYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJGaW5sYW5kIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00NDIsLTQ2MCwtNDU1LDU1MCwtNDQ0XV0sImlkIjoiNzAzIiwicHJvcGVydGllcyI6eyJuYW1lIjoiU2xvdmFraWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ0NSwtNTUxLC00NTQsLTQ3MF1dLCJpZCI6IjIwMyIsInByb3BlcnRpZXMiOnsibmFtZSI6IkN6ZWNoaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEyNiw1NTEsNTUyLDU1M11dLCJpZCI6IjIzMiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkVyaXRyZWEifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbNTU0XV0sW1s1NTVdXSxbWzU1Nl1dXSwiaWQiOiIzOTIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJKYXBhbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTkzLC05NywtMjAyXV0sImlkIjoiNjAwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiUGFyYWd1YXkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTM2NCw1NTcsNTU4XV0sImlkIjoiODg3IiwicHJvcGVydGllcyI6eyJuYW1lIjoiWWVtZW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTM0NiwtMzYyLC0zNTYsNTU5LC0zNTQsNTYwLC0zNTIsLTM2NSwtNTU5LDU2MV1dLCJpZCI6IjY4MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlNhdWRpIEFyYWJpYSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1s1NjJdXSxbWzU2M11dLFtbNTY0XV0sW1s1NjVdXSxbWzU2Nl1dLFtbNTY3XV0sW1s1NjhdXSxbWzU2OV1dXSwiaWQiOiIwMTAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJBbnRhcmN0aWNhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzU3MCw1NzFdXSwicHJvcGVydGllcyI6eyJuYW1lIjoiTi4gQ3lwcnVzIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy01NzIsNTcyXV0sImlkIjoiMTk2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQ3lwcnVzIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zNDEsLTE1LDU3M11dLCJpZCI6IjUwNCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik1vcm9jY28ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEyNCw1NzQsNTc1LC0zMjksNTc2XV0sImlkIjoiODE4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiRWd5cHQifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEyMywtMTMyLC0yODMsLTM0MywtMzQwLDU3NywtNTc1XV0sImlkIjoiNDM0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTGlieWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTExNCwtMTE5LDU3OCwtMTI3LC01NTQsNTc5LDU4MF1dLCJpZCI6IjIzMSIsInByb3BlcnRpZXMiOnsibmFtZSI6IkV0aGlvcGlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy01NTMsNTgxLDU4MiwtNTgwXV0sImlkIjoiMjYyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiRGppYm91dGkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTExNSwtNTgxLC01ODMsNTgzXV0sInByb3BlcnRpZXMiOnsibmFtZSI6IlNvbWFsaWxhbmQifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTExLDU4NCwtMTEwLDU4NSwtMTE3XV0sImlkIjoiODAwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiVWdhbmRhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xMCwtMzI1LC0xMTEsLTU4NV1dLCJpZCI6IjY0NiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlJ3YW5kYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNDk2LDU4Niw1ODddXSwiaWQiOiIwNzAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJCb3NuaWEgYW5kIEhlcnouIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00ODEsLTQ4NywtNDk0LDU4OCw1ODldXSwiaWQiOiI4MDciLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJNYWNlZG9uaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ1NywtNDY0LC00ODIsLTU5MCw1OTAsNTkxLC01ODcsLTQ5NV1dLCJpZCI6IjY4OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlNlcmJpYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNDkyLDU5MiwtNDk3LC01ODgsLTU5Miw1OTNdXSwiaWQiOiI0OTkiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJNb250ZW5lZ3JvIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00OTMsLTU5NCwtNTkxLC01ODldXSwicHJvcGVydGllcyI6eyJuYW1lIjoiS29zb3ZvIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzU5NF1dLCJpZCI6Ijc4MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlRyaW5pZGFkIGFuZCBUb2JhZ28ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEwOSwtMzEwLC0xMjgsLTU3OSwtMTE4LC01ODZdXSwiaWQiOiI3MjgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJTLiBTdWRhbiJ9fV19LCJsYW5kIjp7InR5cGUiOiJHZW9tZXRyeUNvbGxlY3Rpb24iLCJnZW9tZXRyaWVzIjpbeyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbMF1dLFtbMV1dLFtbMywzMjAsMTg0LDI1NSwzMjMsMTA0LDMyMiwzMTEsMzEzLDMxNSwyODksMjg0LDI3MywyOTAsMjkzLDI5NywzMDUsMzA3LDMwMiwzMDQsMjYzLDMzNiwyNTgsMjcyLDEzLDU3MywzNDEsMzM4LDU3Nyw1NzUsMzI5LDMzMiw0MjMsNDg3LDUzNSwxNTMsNDM1LDE2NCw0MzYsNDYxLDQ3Nyw0ODksNDg0LDQ5MCw1OTIsNDk3LDU0OCw1MjUsMjQwLDUwNyw1MDUsNTA2LDI0Miw1MDEsNTAzLDQ3NCw1MjgsNDc2LDQ0NiwxNDIsNDY0LDQ2Niw0NjgsMTU4LDU0OSw0MzAsMTcyLDE2MSwzODcsMzkxLDM4OSw1MjIsMzg1LDM3MSwzNzIsNTQzLDM3NCwzODAsNDAxLDM5NCw0MDQsNDIyLDM2MCwzNTQsNTU5LDM1Miw1NjAsMzQ3LDM2NSwzNDksMzYyLDU1Nyw1NjEsMzQ2LDU3NiwxMjQsNTUxLDU4MSw1ODMsMTE1LDExOV0sWzQyMSw0MTYsNjQsMTUwLDUzM11dLFtbMTcsNDgsMTg2LDIyOSwyMjcsMjIzLDIxOSwyMTYsMjEzLDIwOSwyMzAsMjMyLDIzNCwyMzYsMjAwLDE5MSw5MywxMDAsMjAzLDI0NiwyMDcsMjExLDIxNCwyMTcsMjIwLDIyNCwyMjgsMTg5LDUwLDE1LDU4XV0sW1sxOV1dLFtbMjBdXSxbWzIxXV0sW1syMl1dLFtbMjNdXSxbWzI0XV0sW1syNV1dLFtbMjZdXSxbWzI3XV0sW1syOF1dLFtbMjldXSxbWzMwXV0sW1szMV1dLFtbMzJdXSxbWzMzXV0sW1szNF1dLFtbMzVdXSxbWzM2XV0sW1szN11dLFtbMzhdXSxbWzM5XV0sW1s0MF1dLFtbNDFdXSxbWzQyXV0sW1s0M11dLFtbNDRdXSxbWzQ1XV0sW1s0Nl1dLFtbNDddXSxbWzUxXV0sW1s1Ml1dLFtbNTNdXSxbWzU0XV0sW1s1NV1dLFtbNTZdXSxbWzU3XV0sW1s1OV1dLFtbNzAsNzVdXSxbWzcyXV0sW1s3M11dLFtbNzRdXSxbWzc3LDE3N11dLFtbNzhdXSxbWzU0Niw3OSw1NDQsNTQ3XV0sW1s4MV1dLFtbODJdXSxbWzgzXV0sW1s4NF1dLFtbODVdXSxbWzg2XV0sW1s4N11dLFtbODhdXSxbWzg5XV0sW1s5MCw5OF1dLFtbMTMzLDEzNF1dLFtbMTM1XV0sW1sxMzZdXSxbWzEzN11dLFtbMTM4XV0sW1sxMzldXSxbWzE0MF1dLFtbMTQ0XV0sW1sxNDVdXSxbWzE2Ml1dLFtbMTY1XV0sW1sxNjZdXSxbWzE2N11dLFtbMTY4XV0sW1sxNjldXSxbWzE3M11dLFtbMTc0XV0sW1sxNzVdXSxbWzE3Nl1dLFtbMjQ1XV0sW1syNDddXSxbWzI0OF1dLFtbMjQ5XV0sW1szMzRdXSxbWzM2Nl1dLFtbMzY3XV0sW1s0ODJdXSxbWzUwOCw1MzBdXSxbWzUxMF1dLFtbNTExXV0sW1s1MTJdXSxbWzUxM11dLFtbNTE0XV0sW1s1MTVdXSxbWzUxNl1dLFtbNTE3XV0sW1s1MThdXSxbWzUxOV1dLFtbNTIwXV0sW1s1MjFdXSxbWzUyM11dLFtbNTI2XV0sW1s1MjddXSxbWzUyOV1dLFtbNTMxXV0sW1s1MzJdXSxbWzUzNl1dLFtbNTM3XV0sW1s1MzhdXSxbWzUzOV1dLFtbNTQwXV0sW1s1NDFdXSxbWzU0Ml1dLFtbNTU0XV0sW1s1NTVdXSxbWzU1Nl1dLFtbNTYyXV0sW1s1NjNdXSxbWzU2NF1dLFtbNTY1XV0sW1s1NjZdXSxbWzU2N11dLFtbNTY4XV0sW1s1NjldXSxbWzU3MCw1NzJdXSxbWzU5NF1dXX1dfX0sImFyY3MiOltbWzk5NDc4LDQwMjM3XSxbNjksOThdLFs5NiwtMTcxXSxbLTQ2LC0zMDhdLFstMTcyLC04MV0sWy0xNTMsNzNdLFstMjcsMjYwXSxbMTA3LDIwM10sWzEyNiwtNzRdXSxbWzAsNDEwODddLFs1NywyN10sWy0zNCwtMjg0XSxbLTIzLC0zMl0sWzk5ODIyLC0xNDVdLFstMTc3LC0xMjRdLFstMzYsMjIwXSxbMTM5LDEyMV0sWzg4LDMzXSxbMTYzLDE4NF0sWy05OTk5OSwwXV0sW1s1OTQxNyw1MDAxOF0sWzQ3LC02NV0sWzEwMDcsLTEyMDNdLFsxOSwtMzQzXSxbMzk5LC01OTBdXSxbWzYwODg5LDQ3ODE3XSxbLTEyOCwtNzI4XSxbMTYsLTMzNV0sWzE3OCwtMjE2XSxbOCwtMTUzXSxbLTc2LC0zNTddLFsxNiwtMTgwXSxbLTE4LC0yODJdLFs5NywtMzcwXSxbMTE1LC01ODNdLFsxMDEsLTEyOV1dLFtbNjExOTgsNDQ0ODRdLFstMjIxLC0zNDJdLFstMzAzLC0yMzBdLFstMTY3LDEwXSxbLTk5LC0xNzddLFstMTkzLC0xNl0sWy03MywtNzRdLFstMzM0LDE2Nl0sWy0yMDksLTQ4XV0sW1s1OTU5OSw0Mzc3M10sWy03Nyw4MDRdLFstOTUsMjc1XSxbLTU1LDE2NF0sWy0yNzMsMTEwXV0sW1s1OTA5OSw0NTEyNl0sWy0xNTcsMTc3XSxbLTE3NywxMDBdLFstMTExLDk5XSxbLTExNiwxNTBdXSxbWzU4NTM4LDQ1NjUyXSxbLTE1MCw3NDVdLFstMTYxLDMzMF0sWy01NSwzNDNdLFsyNywzMDddLFstNTAsNTQ0XV0sW1s1ODE0OSw0NzkyMV0sWzExNSwyOF0sWzEwMSwyMTRdLFsxMDgsMzA4XSxbNjksMTI0XSxbLTMsMTkyXSxbLTYwLDEzNF0sWy0xNiwyMzNdXSxbWzU4NDYzLDQ5MTU0XSxbODAsNzRdLFsxNiwzNDhdLFstMTEwLDMzM11dLFtbNTg0NDksNDk5MDldLFs5OCw3MV0sWzMwNCwtN10sWzU2Niw0NV1dLFtbNDc1OTIsNjY5MjBdLFsxLC00MF0sWy02LC0xMTRdXSxbWzQ3NTg3LDY2NzY2XSxbLTEsLTg5NV0sWy05MTEsMzFdLFs5LC0xNTEyXSxbLTI2MSwtNTNdLFstNjgsLTMwNF0sWzUzLC04NTNdLFstMTA4OCw0XSxbLTYwLC0xOTddXSxbWzQ1MjYwLDYyOTg3XSxbMTIsMjQ5XV0sW1s0NTI3Miw2MzIzNl0sWzUsLTFdLFs2MjUsNDhdLFszMywyMTNdLFsxMTQsMjY1XSxbOTIsODE2XSxbMzg2LDYzN10sWzEzMSw3NDVdLFs4Niw0NF0sWzkxLDQ2MF0sWzIzNCw2M10sWzEwMCwtNzZdLFsxMjYsMF0sWzkwLDEzNF0sWzE3MiwxOV0sWy03LDMxN10sWzQyLDBdXSxbWzE1ODc4LDc5NTMwXSxbLTM4LDFdLFstNTM3LDU4MV0sWy0xOTksMjU1XSxbLTUwMywyNDRdLFstMTU1LDUyM10sWzQwLDM2M10sWy0zNTYsMjUyXSxbLTQ4LDQ3Nl0sWy0zMzYsNDI5XSxbLTYsMzA0XV0sW1sxMzc0MCw4Mjk1OF0sWzE1NCwyODVdLFstNywzNzNdLFstNDczLDM3Nl0sWy0yODQsNjc0XSxbLTE3Myw0MjRdLFstMjU1LDI2Nl0sWy0xODcsMjQyXSxbLTE0NywzMDZdLFstMjc5LC0xOTJdLFstMjcwLC0zMzBdLFstMjQ3LDM4OF0sWy0xOTQsMjU5XSxbLTI3MSwxNjRdLFstMjczLDE3XSxbMSwzMzY0XSxbMiwyMTkzXV0sW1sxMDgzNyw5MTc2N10sWzUxOCwtMTQyXSxbNDM4LC0yODVdLFsyODksLTU0XSxbMjQ0LDI0N10sWzMzNiwxODRdLFs0MTMsLTcyXSxbNDE2LDI1OV0sWzQ1NSwxNDhdLFsxOTEsLTI0NV0sWzIwNywxMzhdLFs2MiwyNzhdLFsxOTIsLTYzXSxbNDcwLC01MzBdLFszNjksNDAxXSxbMzgsLTQ0OV0sWzM0MSw5N10sWzEwNSwxNzNdLFszMzcsLTM0XSxbNDI0LC0yNDhdLFs2NTAsLTIxN10sWzM4MywtMTAwXSxbMjcyLDM4XSxbMzc0LC0zMDBdLFstMzkwLC0yOTNdLFs1MDIsLTEyN10sWzc1MCw3MF0sWzIzNiwxMDNdLFsyOTYsLTM1NF0sWzMwMiwyOTldLFstMjgzLDI1MV0sWzE3OSwyMDJdLFszMzgsMjddLFsyMjMsNTldLFsyMjQsLTE0MV0sWzI3OSwtMzIxXSxbMzEwLDQ3XSxbNDkxLC0yNjZdLFs0MzEsOTRdLFs0MDUsLTE0XSxbLTMyLDM2N10sWzI0NywxMDNdLFs0MzEsLTIwMF0sWy0yLC01NTldLFsxNzcsNDcxXSxbMjIzLC0xNl0sWzEyNiw1OTRdLFstMjk4LDM2NF0sWy0zMjQsMjM5XSxbMjIsNjUzXSxbMzI5LDQyOV0sWzM2NiwtOTVdLFsyODEsLTI2MV0sWzM3OCwtNjY2XSxbLTI0NywtMjkwXSxbNTE3LC0xMjBdLFstMSwtNjA0XSxbMzcxLDQ2M10sWzMzMiwtMzgwXSxbLTgzLC00MzhdLFsyNjksLTM5OV0sWzI5MCw0MjddLFsyMDIsNTEwXSxbMTYsNjQ5XSxbMzk0LC00Nl0sWzQxMSwtODddLFszNzMsLTI5M10sWzE3LC0yOTNdLFstMjA3LC0zMTVdLFsxOTYsLTMxNl0sWy0zNiwtMjg4XSxbLTU0NCwtNDEzXSxbLTM4NiwtOTFdLFstMjg3LDE3OF0sWy04MywtMjk3XSxbLTI2OCwtNDk4XSxbLTgxLC0yNTldLFstMzIyLC0zOTldLFstMzk3LC0zOV0sWy0yMjAsLTI1MF0sWy0xOCwtMzg0XSxbLTMyMywtNzRdLFstMzQwLC00NzldLFstMzAxLC02NjVdLFstMTA4LC00NjZdLFstMTYsLTY4Nl0sWzQwOSwtOTldLFsxMjUsLTU1M10sWzEzMCwtNDQ4XSxbMzg4LDExN10sWzUxNywtMjU2XSxbMjc3LC0yMjVdLFsxOTksLTI3OV0sWzM0OCwtMTYzXSxbMjk0LC0yNDhdLFs0NTksLTM0XSxbMzAyLC01OF0sWy00NSwtNTExXSxbODYsLTU5NF0sWzIwMSwtNjYxXSxbNDE0LC01NjFdLFsyMTQsMTkyXSxbMTUwLDYwN10sWy0xNDUsOTM0XSxbLTE5NiwzMTFdLFs0NDUsMjc2XSxbMzE0LDQxNV0sWzE1NCw0MTFdLFstMjMsMzk1XSxbLTE4OCw1MDJdLFstMzM4LDQ0NV0sWzMyOCw2MTldLFstMTIxLDUzNV0sWy05Myw5MjJdLFsxOTQsMTM3XSxbNDc2LC0xNjFdLFsyODYsLTU3XSxbMjMwLDE1NV0sWzI1OCwtMjAwXSxbMzQyLC0zNDNdLFs4NSwtMjI5XSxbNDk1LC00NV0sWy04LC00OTZdLFs5MiwtNzQ3XSxbMjU0LC05Ml0sWzIwMSwtMzQ4XSxbNDAyLDMyOF0sWzI2Niw2NTJdLFsxODQsMjc0XSxbMjE2LC01MjddLFszNjIsLTc1NF0sWzMwNywtNzA5XSxbLTExMiwtMzcxXSxbMzcwLC0zMzNdLFsyNTAsLTMzOF0sWzQ0MiwtMTUyXSxbMTc5LC0xODldLFsxMTAsLTUwMF0sWzIxNiwtNzhdLFsxMTIsLTIyM10sWzIwLC02NjRdLFstMjAyLC0yMjJdLFstMTk5LC0yMDddLFstNDU4LC0yMTBdLFstMzQ5LC00ODZdLFstNDcwLC05Nl0sWy01OTQsMTI1XSxbLTQxNyw0XSxbLTI4NywtNDFdLFstMjMzLC00MjRdLFstMzU0LC0yNjJdLFstNDAxLC03ODJdLFstMzIwLC01NDVdLFsyMzYsOTddLFs0NDYsNzc2XSxbNTgzLDQ5M10sWzQxNSw1OF0sWzI0NiwtMjg5XSxbLTI2MiwtMzk3XSxbODgsLTYzN10sWzkxLC00NDZdLFszNjEsLTI5NV0sWzQ1OSw4Nl0sWzI3OCw2NjRdLFsxOSwtNDI5XSxbMTgwLC0yMTRdLFstMzQ0LC0zODddLFstNjE1LC0zNTFdLFstMjc2LC0yMzldLFstMzEwLC00MjZdLFstMjExLDQ0XSxbLTExLDUwMF0sWzQ4Myw0ODhdLFstNDQ1LC0xOV0sWy0zMDksLTcyXV0sW1szMTM1MCw3NzI0OF0sWy0xODEsMzM0XSxbMCw4MDVdLFstMTIzLDE3MV0sWy0xODcsLTEwMF0sWy05MiwxNTVdLFstMjEyLC00NDZdLFstODQsLTQ2MF0sWy05OSwtMjY5XSxbLTExOCwtOTFdLFstODksLTMwXSxbLTI4LC0xNDZdLFstNTEyLDBdLFstNDIyLC00XSxbLTEyNSwtMTA5XSxbLTI5NCwtNDI1XSxbLTM0LC00Nl0sWy04OSwtMjMxXSxbLTI1NSwxXSxbLTI3MywtM10sWy0xMjUsLTkzXSxbNDQsLTExNl0sWzI1LC0xODFdLFstNSwtNjBdLFstMzYzLC0yOTNdLFstMjg2LC05M10sWy0zMjMsLTMxNl0sWy03MCwwXSxbLTk0LDkzXSxbLTMxLDg1XSxbNiw2MV0sWzYxLDIwN10sWzEzMSwzMjVdLFs4MSwzNDldLFstNTYsNTE0XSxbLTU5LDUzNl0sWy0yOTAsMjc3XSxbMzUsMTA1XSxbLTQxLDczXSxbLTc2LDBdLFstNTYsOTNdLFstMTQsMTQwXSxbLTU0LC02MV0sWy03NSwxOF0sWzE3LDU5XSxbLTY1LDU4XSxbLTI3LDE1NV0sWy0yMTYsMTg5XSxbLTIyNCwxOTddLFstMjcyLDIyOV0sWy0yNjEsMjE0XSxbLTI0OCwtMTY3XSxbLTkxLC02XSxbLTM0MiwxNTRdLFstMjI1LC03N10sWy0yNjksMTgzXSxbLTI4NCw5NF0sWy0xOTQsMzZdLFstODYsMTAwXSxbLTQ5LDMyNV0sWy05NCwtM10sWy0xLC0yMjddLFstNTc1LDBdLFstOTUxLDBdLFstOTQ0LDBdLFstODMzLDBdLFstODM0LDBdLFstODE5LDBdLFstODQ3LDBdLFstMjczLDBdLFstODI0LDBdLFstNzg5LDBdXSxbWzI2NjY4LDg3NDc4XSxbMjA3LDI3M10sWzM4MSwtNl0sWy02LC0xMTRdLFstMzI1LC0zMjZdLFstMTk2LDEzXSxbLTYxLDE2MF1dLFtbMjc4NDAsOTM1OTNdLFstMzA2LDMxM10sWzEyLDIxM10sWzEzMywzOV0sWzYzNiwtNjNdLFs0NzksLTMyNV0sWzI1LC0xNjNdLFstMjk2LDE3XSxbLTI5OSwxM10sWy0zMDQsLTgwXSxbLTgwLDM2XV0sW1syNzY5MCw4NzI2MV0sWzEwNywxNzddLFsxMTQsLTEzXSxbNzAsLTEyMV0sWy0xMDgsLTMxMF0sWy0xMjMsNTBdLFstNzMsMTc2XSxbMTMsNDFdXSxbWzIzOTk2LDk0ODc5XSxbLTE1MSwtMjI5XSxbLTQwMyw0NF0sWy0zMzcsMTU1XSxbMTQ4LDI2Nl0sWzM5OSwxNTldLFsyNDMsLTIwOF0sWzEwMSwtMTg3XV0sW1syMzkzMyw5NjM4MF0sWy0xMjYsLTE3XSxbLTUyMSwzOF0sWy03NCwxNjVdLFs1NTksLTldLFsxOTUsLTEwOV0sWy0zMywtNjhdXSxbWzIzMTI0LDk3MTE2XSxbMzMyLC0yMDVdLFstNzYsLTIxNF0sWy00MTEsLTEyMl0sWy0yMjYsMTM4XSxbLTExOSwyMjFdLFstMjIsMjQ1XSxbMzYwLC0yNF0sWzE2MiwtMzldXSxbWzI1NTE0LDk0NTMyXSxbLTQ0OSw3M10sWy03MzgsMTkwXSxbLTk2LDMyNV0sWy0zNCwyOTNdLFstMjc5LDI1OF0sWy01NzQsNzJdLFstMzIyLDE4M10sWzEwNCwyNDJdLFs1NzMsLTM3XSxbMzA4LC0xOTBdLFs1NDcsMV0sWzI0MCwtMTk0XSxbLTY0LC0yMjJdLFszMTksLTEzNF0sWzE3NywtMTQwXSxbMzc0LC0yNl0sWzQwNiwtNTBdLFs0NDEsMTI4XSxbNTY2LDUxXSxbNDUxLC00Ml0sWzI5OCwtMjIzXSxbNjIsLTI0NF0sWy0xNzQsLTE1N10sWy00MTQsLTEyN10sWy0zNTUsNzJdLFstNzk3LC05MV0sWy01NzAsLTExXV0sW1sxOTA5Myw5Njc1NF0sWzM5MiwtOTJdLFstOTMsLTE3N10sWy01MTgsLTE3MF0sWy00MTEsMTkxXSxbMjI0LDE4OF0sWzQwNiw2MF1dLFtbMTkxNzcsOTcxMzldLFszNjEsLTEyMF0sWy0zMzksLTExNV0sWy00NjEsMV0sWzUsODRdLFsyODUsMTc3XSxbMTQ5LC0yN11dLFtbMzQ1NTUsODA4OTldLFstMTQ4LC0zNzJdLFstMTg0LC01MTddLFsxODEsMTk5XSxbMTg3LC0xMjZdLFstOTgsLTIwNl0sWzI0NywtMTYyXSxbMTI4LDE0NF0sWzI3NywtMTgyXSxbLTg2LC00MzNdLFsxOTQsMTAxXSxbMzYsLTMxM10sWzg2LC0zNjddLFstMTE3LC01MjBdLFstMTI1LC0yMl0sWy0xODMsMTExXSxbNjAsNDg0XSxbLTc3LDc1XSxbLTMyMiwtNTEzXSxbLTE2NiwyMV0sWzE5NiwyNzddLFstMjY3LDE0NF0sWy0yOTgsLTM1XSxbLTUzOSwxOF0sWy00MywxNzVdLFsxNzMsMjA4XSxbLTEyMSwxNjBdLFsyMzQsMzU2XSxbMjg3LDk0MV0sWzE3MiwzMzZdLFsyNDEsMjA0XSxbMTI5LC0yNl0sWy01NCwtMTYwXV0sW1syNjY5OSw4OTA0OF0sWzMwNCwtMjAzXSxbMzE4LC0xODRdLFsyNSwtMjgxXSxbMjA0LDQ2XSxbMTk5LC0xOTZdLFstMjQ3LC0xODZdLFstNDMyLDE0Ml0sWy0xNTYsMjY2XSxbLTI3NSwtMzE0XSxbLTM5NiwtMzA2XSxbLTk1LDM0Nl0sWy0zNzcsLTU3XSxbMjQyLDI5Ml0sWzM1LDQ2NV0sWzk1LDU0Ml0sWzIwMSwtNDldLFs1MSwtMjU5XSxbMTQzLDkxXSxbMTYxLC0xNTVdXSxbWzI4MTE5LDkzMzI3XSxbMjYzLDIzNV0sWzYxNiwtMjk5XSxbMzgzLC0yODJdLFszNiwtMjU4XSxbNTE1LDEzNF0sWzI5MCwtMzc2XSxbNjcwLC0yMzRdLFsyNDIsLTIzOF0sWzI2MywtNTUzXSxbLTUxMCwtMjc1XSxbNjU0LC0zODZdLFs0NDEsLTEzMF0sWzQwMCwtNTQzXSxbNDM3LC0zOV0sWy04NywtNDE0XSxbLTQ4NywtNjg3XSxbLTM0MiwyNTNdLFstNDM3LDU2OF0sWy0zNTksLTc0XSxbLTM1LC0zMzhdLFsyOTIsLTM0NF0sWzM3NywtMjcyXSxbMTE0LC0xNTddLFsxODEsLTU4NF0sWy05NiwtNDI1XSxbLTM1MCwxNjBdLFstNjk3LDQ3M10sWzM5MywtNTA5XSxbMjg5LC0zNTddLFs0NSwtMjA2XSxbLTc1MywyMzZdLFstNTk2LDM0M10sWy0zMzcsMjg3XSxbOTcsMTY3XSxbLTQxNCwzMDRdLFstNDA1LDI4Nl0sWzUsLTE3MV0sWy04MDMsLTk0XSxbLTIzNSwyMDNdLFsxODMsNDM1XSxbNTIyLDEwXSxbNTcxLDc2XSxbLTkyLDIxMV0sWzk2LDI5NF0sWzM2MCw1NzZdLFstNzcsMjYxXSxbLTEwNywyMDNdLFstNDI1LDI4Nl0sWy01NjMsMjAxXSxbMTc4LDE1MF0sWy0yOTQsMzY3XSxbLTI0NSwzNF0sWy0yMTksMjAxXSxbLTE0OSwtMTc1XSxbLTUwMywtNzZdLFstMTAxMSwxMzJdLFstNTg4LDE3NF0sWy00NTAsODldLFstMjMxLDIwN10sWzI5MCwyNzBdLFstMzk0LDJdLFstODgsNTk5XSxbMjEzLDUyOF0sWzI4NiwyNDFdLFs3MTcsMTU4XSxbLTIwNCwtMzgyXSxbMjE5LC0zNjldLFsyNTYsNDc3XSxbNzA0LDI0Ml0sWzQ3NywtNjExXSxbLTQyLC0zODddLFs1NTAsMTcyXV0sW1syMzc0OSw5NDM4MF0sWzU3OSwtMjBdLFs1MzAsLTE0NF0sWy00MTUsLTUyNl0sWy0zMzEsLTExNV0sWy0yOTgsLTQ0Ml0sWy0zMTcsMjJdLFstMTczLDUxOV0sWzQsMjk0XSxbMTQ1LDI1MV0sWzI3NiwxNjFdXSxbWzE1ODczLDk1NTUxXSxbNDcyLDQ0Ml0sWzU3MCwzODNdLFs0MjYsLTldLFszODEsODddLFstMzgsLTQ1NF0sWy0yMTQsLTIwNV0sWy0yNTksLTI5XSxbLTUxNywtMjUyXSxbLTQ0NCwtOTFdLFstMzc3LDEyOF1dLFtbMTMxMzYsODI1MDhdLFsyNjcsNDddLFstODQsLTY3MV0sWzI0MiwtNDc1XSxbLTExMSwxXSxbLTE2NywyNzBdLFstMTAzLDI3Ml0sWy0xNDAsMTg0XSxbLTUxLDI2MF0sWzE2LDE4OF0sWzEzMSwtNzZdXSxbWzIwNjk2LDk3NDMzXSxbNTQ2LC04MV0sWzc1MSwtMjE1XSxbMjEyLC0yODFdLFsxMDgsLTI0N10sWy00NTMsNjZdLFstNDU3LDE5Ml0sWy02MTksMjFdLFsyNjgsMTc2XSxbLTMzNSwxNDJdLFstMjEsMjI3XV0sW1sxNTY5Miw3OTI0MF0sWy0xNDAsLTgyXSxbLTQ1NiwyNjldLFstODQsMjA5XSxbLTI0OCwyMDddLFstNTAsMTY4XSxbLTI4NiwxMDddLFstMTA3LDMyMV0sWzI0LDEzN10sWzI5MSwtMTI5XSxbMTcxLC04OV0sWzI2MSwtNjNdLFs5NCwtMjA0XSxbMTM4LC0yODBdLFsyNzcsLTI0NF0sWzExNSwtMzI3XV0sW1sxNjIzOSw5NDU2Nl0sWzM5NywtMTIzXSxbNzA5LC0zM10sWzI3MCwtMTcxXSxbMjk4LC0yNDldLFstMzQ5LC0xNDldLFstNjgxLC00MTVdLFstMzQ0LC00MTRdLFswLC0yNTddLFstNzMxLC0yODVdLFstMTQ3LDI1OV0sWy02NDEsMzEyXSxbMTE5LDI1MF0sWzE5Miw0MzJdLFsyNDEsMzg4XSxbLTI3MiwzNjJdLFs5MzksOTNdXSxbWzIwMDUwLDk1MzkxXSxbMjQ3LDk5XSxbMjkxLC0yNl0sWzQ5LC0yODldLFstMTY5LC0yODFdLFstOTQwLC05MV0sWy03MDEsLTI1Nl0sWy00MjMsLTE0XSxbLTM1LDE5M10sWzU3NywyNjFdLFstMTI1NSwtNzBdLFstMzg5LDEwNl0sWzM3OSw1NzddLFsyNjIsMTY1XSxbNzgyLC0xOTldLFs0OTMsLTM1MF0sWzQ4NSwtNDVdLFstMzk3LDU2NV0sWzI1NSwyMTVdLFsyODYsLTY4XSxbOTQsLTI4Ml0sWzEwOSwtMjEwXV0sW1syMDQxMCw5Mzc1NV0sWzMxMSwtMjM5XSxbMTc1LC01NzVdLFs4NiwtNDE3XSxbNDY2LC0yOTNdLFs1MDIsLTI3OV0sWy0zMSwtMjYwXSxbLTQ1NiwtNDhdLFsxNzgsLTIyN10sWy05NCwtMjE3XSxbLTUwMyw5M10sWy00NzgsMTYwXSxbLTMyMiwtMzZdLFstNTIyLC0yMDFdLFstNzA0LC04OF0sWy00OTQsLTU2XSxbLTE1MSwyNzldLFstMzc5LDE2MV0sWy0yNDYsLTY2XSxbLTM0Myw0NjhdLFsxODUsNjJdLFs0MjksMTAxXSxbMzkyLC0yNl0sWzM2MiwxMDNdLFstNTM3LDEzOF0sWy01OTQsLTQ3XSxbLTM5NCwxMl0sWy0xNDYsMjE3XSxbNjQ0LDIzN10sWy00MjgsLTldLFstNDg1LDE1Nl0sWzIzMyw0NDNdLFsxOTMsMjM1XSxbNzQ0LDM1OV0sWzI4NCwtMTE0XSxbLTEzOSwtMjc3XSxbNjE4LDE3OV0sWzM4NiwtMjk4XSxbMzE0LDMwMl0sWzI1NCwtMTk0XSxbMjI3LC01ODBdLFsxNDAsMjQ0XSxbLTE5Nyw2MDZdLFsyNDQsODZdLFsyNzYsLTk0XV0sW1syMjEwMCw5MzUzNl0sWy0zMDYsMzg2XSxbMzI5LDI4Nl0sWzMzMSwtMTI0XSxbNDk2LDc1XSxbNzIsLTE3Ml0sWy0yNTksLTI4M10sWzQyMCwtMjU0XSxbLTUwLC01MzJdLFstNDU1LC0yMjldLFstMjY4LDUwXSxbLTE5MiwyMjVdLFstNjkwLDQ1Nl0sWzUsMTg5XSxbNTY3LC03M11dLFtbMjAzODksOTQwNjRdLFszNzIsMjRdLFsyMTEsLTEzMF0sWy0yNDQsLTM5MF0sWy00MzQsNDEzXSxbOTUsODNdXSxbWzIyNjM5LDk1OTA3XSxbMjEyLC0yNzNdLFs5LC0zMDNdLFstMTI3LC00NDBdLFstNDU4LC02MF0sWy0yOTgsOTRdLFs1LDM0NV0sWy00NTUsLTQ2XSxbLTE4LDQ1N10sWzI5OSwtMThdLFs0MTksMjAxXSxbMzkwLC0zNF0sWzIyLDc3XV0sW1syMzMyOSw5ODIwMV0sWzE5MiwxODBdLFsyODUsNDJdLFstMTIyLDEzNV0sWzY0NiwzMF0sWzM1NSwtMzE1XSxbNDY4LC0xMjddLFs0NTUsLTExMl0sWzIyMCwtMzkwXSxbMzM0LC0xOTBdLFstMzgxLC0xNzZdLFstNTEzLC00NDVdLFstNDkyLC00Ml0sWy01NzUsNzZdLFstMjk5LDI0MF0sWzQsMjE1XSxbMjIwLDE1N10sWy01MDgsLTRdLFstMzA2LDE5Nl0sWy0xNzYsMjY4XSxbMTkzLDI2Ml1dLFtbMjQ1NTksOTg5NjVdLFs0MTMsMTEyXSxbMzI0LDE5XSxbNTQ1LDk2XSxbNDA5LDIyMF0sWzM0NCwtMzBdLFszMDAsLTE2Nl0sWzIxMSwzMTldLFszNjcsOTVdLFs0OTgsNjVdLFs4NDksMjRdLFsxNDgsLTYzXSxbODAyLDEwMF0sWzYwMSwtMzhdLFs2MDIsLTM3XSxbNzQyLC00N10sWzU5NywtNzVdLFs1MDgsLTE2MV0sWy0xMiwtMTU3XSxbLTY3OCwtMjU3XSxbLTY3MiwtMTE5XSxbLTI1MSwtMTMzXSxbNjA1LDNdLFstNjU2LC0zNThdLFstNDUyLC0xNjddLFstNDc2LC00ODNdLFstNTczLC05OF0sWy0xNzcsLTEyMF0sWy04NDEsLTY0XSxbMzgzLC03NF0sWy0xOTIsLTEwNV0sWzIzMCwtMjkyXSxbLTI2NCwtMjAyXSxbLTQyOSwtMTY3XSxbLTEzMiwtMjMyXSxbLTM4OCwtMTc2XSxbMzksLTEzNF0sWzQ3NSwyM10sWzYsLTE0NF0sWy03NDIsLTM1NV0sWy03MjYsMTYzXSxbLTgxNiwtOTFdLFstNDE0LDcxXSxbLTUyNSwzMV0sWy0zNSwyODRdLFs1MTQsMTMzXSxbLTEzNyw0MjddLFsxNzAsNDFdLFs3NDIsLTI1NV0sWy0zNzksMzc5XSxbLTQ1MCwxMTNdLFsyMjUsMjI5XSxbNDkyLDE0MV0sWzc5LDIwNl0sWy0zOTIsMjMxXSxbLTExOCwzMDRdLFs3NTksLTI2XSxbMjIwLC02NF0sWzQzMywyMTZdLFstNjI1LDY4XSxbLTk3MiwtMzhdLFstNDkxLDIwMV0sWy0yMzIsMjM5XSxbLTMyNCwxNzNdLFstNjEsMjAyXV0sW1syOTEwNiw5MDQyN10sWy0xODAsLTE3NF0sWy0zMTIsLTMwXSxbLTY5LDI4OV0sWzExOCwzMzFdLFsyNTUsODJdLFsyMTcsLTE2M10sWzMsLTI1M10sWy0zMiwtODJdXSxbWzIzMjYyLDkxNjM2XSxbMTY5LC0yMjZdLFstMTczLC0yMDddLFstMzc0LDE3OV0sWy0yMjYsLTY1XSxbLTM4MCwyNjZdLFsyNDUsMTgzXSxbMTk0LDI1Nl0sWzI5NSwtMTY4XSxbMTY2LC0xMDZdLFs4NCwtMTEyXV0sW1szMjA3OCw4MDA0Nl0sWzk2LDQ5XSxbMzY1LC0xNDhdLFsyODQsLTI0N10sWzgsLTEwOF0sWy0xMzUsLTExXSxbLTM2MCwxODZdLFstMjU4LDI3OV1dLFtbMzIyMTgsNzgzNzBdLFs5NywtMjg4XSxbMjAyLC03OV0sWzI1NywxNl0sWy0xMzcsLTI0Ml0sWy0xMDIsLTM4XSxbLTM1MywyNTBdLFstNjksMTk4XSxbMTA1LDE4M11dLFtbMzEzNTAsNzcyNDhdLFs0OCwtMTk0XSxbLTI5NiwtMjg2XSxbLTI4NiwtMjA0XSxbLTI5MywtMTc1XSxbLTE0NywtMzUxXSxbLTQ3LC0xMzNdLFstMywtMzEzXSxbOTIsLTMxM10sWzExNSwtMTVdLFstMjksMjE2XSxbODMsLTEzMV0sWy0yMiwtMTY5XSxbLTE4OCwtOTZdLFstMTMzLDExXSxbLTIwNSwtMTAzXSxbLTEyMSwtMjldLFstMTYyLC0yOV0sWy0yMzEsLTE3MV0sWzQwOCwxMTFdLFs4MiwtMTEyXSxbLTM4OSwtMTc3XSxbLTE3NywtMV0sWzgsNzJdLFstODQsLTE2NF0sWzgyLC0yN10sWy02MCwtNDI0XSxbLTIwMywtNDU1XSxbLTIwLDE1Ml0sWy02MSwzMF0sWy05MSwxNDhdLFs1NywtMzE4XSxbNjksLTEwNV0sWzUsLTIyM10sWy04OSwtMjMwXSxbLTE1NywtNDcyXSxbLTI1LDI0XSxbODYsNDAyXSxbLTE0MiwyMjVdLFstMzMsNDkxXSxbLTUzLC0yNTVdLFs1OSwtMzc1XSxbLTE4Myw5M10sWzE5MSwtMTkxXSxbMTIsLTU2Ml0sWzc5LC00MV0sWzI5LC0yMDRdLFszOSwtNTkxXSxbLTE3NiwtNDM5XSxbLTI4OCwtMTc1XSxbLTE4MiwtMzQ2XSxbLTEzOSwtMzhdLFstMTQxLC0yMTddLFstMzksLTE5OV0sWy0zMDUsLTM4M10sWy0xNTcsLTI4MV0sWy0xMzEsLTM1MV0sWy00MywtNDE5XSxbNTAsLTQxMV0sWzkyLC01MDVdLFsxMjQsLTQxOF0sWzEsLTI1Nl0sWzEzMiwtNjg1XSxbLTksLTM5OF0sWy0xMiwtMjMwXSxbLTY5LC0zNjFdLFstODMsLTc1XSxbLTEzNyw3Ml0sWy00NCwyNTldLFstMTA1LDEzNl0sWy0xNDgsNTA4XSxbLTEyOSw0NTJdLFstNDIsMjMxXSxbNTcsMzkzXSxbLTc3LDMyNV0sWy0yMTcsNDk0XSxbLTEwOCw5MF0sWy0yODEsLTI2OF0sWy00OSwzMF0sWy0xMzUsMjc1XSxbLTE3NCwxNDddLFstMzE0LC03NV0sWy0yNDcsNjZdLFstMjEyLC00MV0sWy0xMTQsLTkyXSxbNTAsLTE1N10sWy01LC0yNDBdLFs1OSwtMTE3XSxbLTUzLC03N10sWy0xMDMsODddLFstMTA0LC0xMTJdLFstMjAyLDE4XSxbLTIwNywzMTJdLFstMjQyLC03M10sWy0yMDIsMTM3XSxbLTE3MywtNDJdLFstMjM0LC0xMzhdLFstMjUzLC00MzhdLFstMjc2LC0yNTVdLFstMTUyLC0yODJdLFstNjMsLTI2Nl0sWy0zLC00MDddLFsxNCwtMjg0XSxbNTIsLTIwMV1dLFtbMjMwMTYsNjU4NjRdLFstMTA4LC0xOF0sWy0xOTcsMTMwXSxbLTIxNywxODRdLFstNzgsMjc3XSxbLTYxLDQxNF0sWy0xNjQsMzM3XSxbLTk2LDM0Nl0sWy0xMzksNDA0XSxbLTE5NiwyMzZdLFstMjI3LC0xMV0sWy0xNzUsLTQ2N10sWy0yMzAsMTc3XSxbLTE0NCwxNzhdLFstNjksMzI1XSxbLTkyLDMwOV0sWy0xNjUsMjYwXSxbLTE0MiwxODZdLFstMTAyLDIxMF0sWy00ODEsMF0sWzAsLTI0NF0sWy0yMjEsMF0sWy01NTIsLTRdLFstNjM0LDQxNl0sWy00MTksMjg3XSxbMjYsMTE2XSxbLTM1MywtNjRdLFstMzE2LC00Nl1dLFtbMTc0NjQsNjk4MDJdLFstNDYsMzAyXSxbLTE4MCwzNDBdLFstMTMwLDcxXSxbLTMwLDE2OV0sWy0xNTYsMzBdLFstMTAwLDE1OV0sWy0yNTgsNTldLFstNzEsOTVdLFstMzMsMzI0XSxbLTI3MCw1OTRdLFstMjMxLDgyMV0sWzEwLDEzN10sWy0xMjMsMTk1XSxbLTIxNSw0OTVdLFstMzgsNDgyXSxbLTE0OCwzMjNdLFs2MSw0ODldLFstMTAsNTA3XSxbLTg5LDQ1M10sWzEwOSw1NTddLFszNCw1MzZdLFszMyw1MzZdLFstNTAsNzkyXSxbLTg4LDUwNl0sWy04MCwyNzRdLFszMywxMTVdLFs0MDIsLTIwMF0sWzE0OCwtNTU4XSxbNjksMTU2XSxbLTQ1LDQ4NF0sWy05NCw0ODVdXSxbWzY4MzMsNjI0NDNdLFs0OSwtNTFdLFs0NSwtNzldLFs3MSwtMjA3XSxbLTcsLTMzXSxbLTEwOCwtMTI2XSxbLTg5LC05Ml0sWy00MSwtOTldLFstNjksODRdLFs4LDE2NV0sWy00NiwyMTZdLFsxNCw2NV0sWzQ4LDk3XSxbLTE5LDExNl0sWzE2LDU1XSxbMjEsLTExXSxbMTA3LC0xMDBdXSxbWzY2NjgsNjI4NDhdLFstMjMsLTcxXSxbLTk0LC00M10sWy00NywxMjVdLFstMzIsNDhdLFstMywzN10sWzI3LDUwXSxbOTksLTU2XSxbNzMsLTkwXV0sW1s2NDU2LDYzMDkxXSxbLTksLTYzXSxbLTE0OSwxN10sWzIxLDcyXSxbMTM3LC0yNl1dLFtbNjEwNCw2MzQxMV0sWzIzLC0zOF0sWzgwLC0xOTZdLFstMTUsLTM0XSxbLTE5LDhdLFstOTcsMjFdLFstMzUsMTMzXSxbLTExLDI0XSxbNzQsODJdXSxbWzU3MzIsNjM3MDVdLFs1LC0xMzhdLFstMzMsLTU4XSxbLTkzLDEwN10sWzE0LDQzXSxbNDMsNThdLFs2NCwtMTJdXSxbWzM3NTksODYyNTZdLFsyMjAsLTU0XSxbMjcsLTIyNl0sWy0xNzEsLTkyXSxbLTE4MiwxMTBdLFstMTY4LDE2MV0sWzI3NCwxMDFdXSxbWzc0MzYsODQ4MjldLFsxODUsLTQwXSxbMTE3LC0xODNdLFstMjQwLC0yODFdLFstMjc3LC0yMjVdLFstMTQyLDE1Ml0sWy00MywyNzddLFsyNTIsMjEwXSxbMTQ4LDkwXV0sW1sxMzc0MCw4Mjk1OF0sWy0xNTMsMjIzXSxbLTI0NSwxODhdLFstNzgsNTE1XSxbLTM1OCw0NzhdLFstMTUwLDU1OF0sWy0yNjcsMzhdLFstNDQxLDE1XSxbLTMyNiwxNzBdLFstNTc0LDYxM10sWy0yNjYsMTEyXSxbLTQ4NiwyMTFdLFstMzg1LC01MV0sWy01NDYsMjcyXSxbLTMzMCwyNTJdLFstMzA5LC0xMjVdLFs1OCwtNDExXSxbLTE1NCwtMzhdLFstMzIxLC0xMjNdLFstMjQ1LC0xOTldLFstMzA4LC0xMjZdLFstMzksMzQ4XSxbMTI1LDU4MF0sWzI5NSwxODJdLFstNzYsMTQ4XSxbLTM1NCwtMzI5XSxbLTE5MCwtMzk0XSxbLTQwMCwtNDIwXSxbMjAzLC0yODddLFstMjYyLC00MjRdLFstMjk5LC0yNDhdLFstMjc4LC0xODBdLFstNjksLTI2MV0sWy00MzQsLTMwNV0sWy04NywtMjc4XSxbLTMyNSwtMjUyXSxbLTE5MSw0NV0sWy0yNTksLTE2NV0sWy0yODIsLTIwMV0sWy0yMzEsLTE5N10sWy00NzcsLTE2OV0sWy00Myw5OV0sWzMwNCwyNzZdLFsyNzEsMTgyXSxbMjk2LDMyNF0sWzM0NSw2Nl0sWzEzNywyNDNdLFszODUsMzUzXSxbNjIsMTE5XSxbMjA1LDIwOF0sWzQ4LDQ0OF0sWzE0MSwzNDldLFstMzIwLC0xNzldLFstOTAsMTAyXSxbLTE1MCwtMjE1XSxbLTE4MSwzMDBdLFstNzUsLTIxMl0sWy0xMDQsMjk0XSxbLTI3OCwtMjM2XSxbLTE3MCwwXSxbLTI0LDM1Ml0sWzUwLDIxNl0sWy0xNzksMjExXSxbLTM2MSwtMTEzXSxbLTIzNSwyNzddLFstMTkwLDE0Ml0sWy0xLDMzNF0sWy0yMTQsMjUyXSxbMTA4LDM0MF0sWzIyNiwzMzBdLFs5OSwzMDNdLFsyMjUsNDNdLFsxOTEsLTk0XSxbMjI0LDI4NV0sWzIwMSwtNTFdLFsyMTIsMTgzXSxbLTUyLDI3MF0sWy0xNTUsMTA2XSxbMjA1LDIyOF0sWy0xNzAsLTddLFstMjk1LC0xMjhdLFstODUsLTEzMV0sWy0yMTksMTMxXSxbLTM5MiwtNjddLFstNDA3LDE0Ml0sWy0xMTcsMjM4XSxbLTM1MSwzNDNdLFszOTAsMjQ3XSxbNjIwLDI4OV0sWzIyOCwwXSxbLTM4LC0yOTZdLFs1ODYsMjNdLFstMjI1LDM2Nl0sWy0zNDIsMjI1XSxbLTE5NywyOTZdLFstMjY3LDI1Ml0sWy0zODEsMTg3XSxbMTU1LDMwOV0sWzQ5MywxOV0sWzM1MCwyNzBdLFs2NiwyODddLFsyODQsMjgxXSxbMjcxLDY4XSxbNTI2LDI2Ml0sWzI1NiwtNDBdLFs0MjcsMzE1XSxbNDIxLC0xMjRdLFsyMDEsLTI2Nl0sWzEyMywxMTRdLFs0NjksLTM1XSxbLTE2LC0xMzZdLFs0MjUsLTEwMV0sWzI4Myw1OV0sWzU4NSwtMTg2XSxbNTM0LC01Nl0sWzIxNCwtNzddLFszNzAsOTZdLFs0MjEsLTE3N10sWzMwMiwtODNdXSxbWzIyOTcsODgyNjRdLFsxNzEsLTExM10sWzE3Myw2MV0sWzIyNSwtMTU2XSxbMjc2LC03OV0sWy0yMywtNjRdLFstMjExLC0xMjVdLFstMjExLDEyOF0sWy0xMDYsMTA3XSxbLTI0NSwtMzRdLFstNjYsNTJdLFsxNywyMjNdXSxbWzc0MjY2LDc5NjU3XSxbLTIxMiwtMzkzXSxbLTIzMCwtNTZdLFstMTMsLTU5Ml0sWy0xNTUsLTI2N10sWy01NTEsMTk0XSxbLTIwMCwtMTA1OF0sWy0xNDMsLTEzMV0sWy01NTAsLTIzNl0sWzI1MCwtMTAyNl0sWy0xOTAsLTE1NF0sWzIyLC0zMzddXSxbWzcyMjk0LDc1NjAxXSxbLTE3MSw4N10sWy0xNDAsMjEyXSxbLTQxMiw2Ml0sWy00NjEsMTZdLFstMTAwLC02NV0sWy0zOTYsMjQ4XSxbLTE1OCwtMTIyXSxbLTQzLC0zNDldLFstNDU3LDIwNF0sWy0xODMsLTg0XSxbLTYyLC0yNTldXSxbWzY5NzExLDc1NTUxXSxbLTE1OSwtMTA5XSxbLTM2NywtNDEyXSxbLTEyMSwtNDIyXSxbLTEwNCwtNF0sWy03NiwyODBdLFstMzUzLDE5XSxbLTU3LDQ4NF0sWy0xMzUsNF0sWzIxLDU5M10sWy0zMzMsNDMxXSxbLTQ3NiwtNDZdLFstMzI2LC04Nl0sWy0yNjUsNTMzXSxbLTIyNywyMjNdLFstNDMxLDQyM10sWy01Miw1MV0sWy03MTUsLTM0OV0sWzExLC0yMTc4XV0sW1s2NTU0Niw3NDk4Nl0sWy0xNDIsLTI5XSxbLTE5NSw0NjNdLFstMTg4LDE2Nl0sWy0zMTUsLTEyM10sWy0xMjMsLTE5N11dLFtbNjQ1ODMsNzUyNjZdLFstMTUsMTQ0XSxbNjgsMjQ2XSxbLTUzLDIwNl0sWy0zMjIsMjAyXSxbLTEyNSw1MzBdLFstMTU0LDE1MF0sWy05LDE5Ml0sWzI3MCwtNTZdLFsxMSw0MzJdLFsyMzYsOTZdLFsyNDMsLTg4XSxbNTAsNTc2XSxbLTUwLDM2NV0sWy0yNzgsLTI4XSxbLTIzNiwxNDRdLFstMzIxLC0yNjBdLFstMjU5LC0xMjRdXSxbWzYzNjM5LDc3OTkzXSxbLTE0Miw5Nl0sWzI5LDMwNF0sWy0xNzcsMzk1XSxbLTIwNywtMTddLFstMjM1LDQwMV0sWzE2MCw0NDhdLFstODEsMTIwXSxbMjIyLDY0OV0sWzI4NSwtMzQyXSxbMzUsNDMxXSxbNTczLDY0M10sWzQzNCwxNV0sWzYxMiwtNDA5XSxbMzI5LC0yMzldLFsyOTUsMjQ5XSxbNDQwLDEyXSxbMzU2LC0zMDZdLFs4MCwxNzVdLFszOTEsLTI1XSxbNjksMjgwXSxbLTQ1MCw0MDZdLFsyNjcsMjg4XSxbLTUyLDE2MV0sWzI2NiwxNTNdLFstMjAwLDQwNV0sWzEyNywyMDJdLFsxMDM5LDIwNV0sWzEzNiwxNDZdLFs2OTUsMjE4XSxbMjUwLDI0NV0sWzQ5OSwtMTI3XSxbODgsLTYxMl0sWzI5MCwxNDRdLFszNTYsLTIwMl0sWy0yMywtMzIyXSxbMjY3LDMzXSxbNjk2LDU1OF0sWy0xMDIsLTE4NV0sWzM1NSwtNDU3XSxbNjIwLC0xNTAwXSxbMTQ4LDMwOV0sWzM4MywtMzQwXSxbMzk5LDE1MV0sWzE1NCwtMTA2XSxbMTMzLC0zNDFdLFsxOTQsLTExNV0sWzExOSwtMjUxXSxbMzU4LDc5XSxbMTQ3LC0zNjFdXSxbWzY5NzExLDc1NTUxXSxbODMsLTU4XSxbLTIzNCwtMzgyXSxbMjA1LC0yMjNdLFsxOTgsMTQ3XSxbMzI5LC0zMTFdLFstMzU1LC00MjVdLFstMjEyLDU4XV0sW1s2OTcyNSw3NDM1N10sWy0xMTQsLTE1XSxbLTQwLDE2NF0sWzU4LDI3NF0sWy0zNzEsLTEzN10sWy04OSwtMzgwXSxbLTEzMiwtMzI2XSxbLTIzMiwyOF0sWy03MiwtMjYxXSxbMjA0LC0xNDBdLFs2MCwtNDQwXSxbLTE1NiwtNTk4XV0sW1s2ODg0MSw3MjUyNl0sWy0yMTAsMTI0XSxbLTE1NCw0XV0sW1s2ODQ3Nyw3MjY1NF0sWzcsMzYyXSxbLTM2OSwyNTNdLFstMjkxLDI4OV0sWy0xODEsMjc4XSxbLTMxNyw0MDhdLFstMTM3LDYwOV0sWy05MywxMDhdLFstMzAxLC0yN10sWy0xMDYsMTIxXSxbLTMwLDQ3MV0sWy0zNzQsMzEyXSxbLTIzNCwtMzQzXSxbLTIzNywtMjA0XSxbNDUsLTI5N10sWy0zMTMsLThdXSxbWzg5MTY2LDQ5MDQzXSxbNDgyLC00MDddLFs1MTMsLTMzOF0sWzE5MiwtMzAyXSxbMTU0LC0yOTddLFs0MywtMzQ5XSxbNDYyLC0zNjVdLFs2OCwtMzEzXSxbLTI1NiwtNjRdLFs2MiwtMzkzXSxbMjQ4LC0zODhdLFsxODAsLTYyN10sWzE1OSwyMF0sWy0xMSwtMjYyXSxbMjE1LC0xMDBdLFstODQsLTExMV0sWzI5NSwtMjQ5XSxbLTMwLC0xNzFdLFstMTg0LC00MV0sWy02OSwxNTNdLFstMjM4LDY2XSxbLTI4MSw4OV0sWy0yMTYsMzc3XSxbLTE1OCwzMjVdLFstMTQ0LDUxN10sWy0zNjIsMjU5XSxbLTIzNSwtMTY5XSxbLTE3MCwtMTk1XSxbMzUsLTQzNl0sWy0yMTgsLTIwM10sWy0xNTUsOTldLFstMjg4LDI1XV0sW1s4OTE3NSw0NTE5M10sWy00LDE5MjVdLFstNSwxOTI1XV0sW1s5MjM5OSw0ODQxN10sWzEwNiwtMTg5XSxbMzMsLTMwN10sWy04NywtMTU3XSxbLTUyLDM0OF0sWy02NSwyMjldLFstMTI2LDE5M10sWy0xNTgsMjUyXSxbLTIwMCwxNzRdLFs3NywxNDNdLFsxNTAsLTE2Nl0sWzk0LC0xMzBdLFsxMTcsLTE0Ml0sWzExMSwtMjQ4XV0sW1s5MjAyNyw0NzEyOV0sWy0xNTIsLTE0NF0sWy0xNDIsLTEzOF0sWy0xNDgsMV0sWy0yMjgsMTcxXSxbLTE1OCwxNjVdLFsyMywxODNdLFsyNDksLTg2XSxbMTUyLDQ2XSxbNDIsMjgzXSxbNDAsMTVdLFsyNywtMzE0XSxbMTU4LDQ1XSxbNzgsMjAyXSxbMTU1LDIxMV0sWy0zMCwzNDhdLFsxNjYsMTFdLFs1NiwtOTddLFstNSwtMzI3XSxbLTkzLC0zNjFdLFstMTQ2LC00OF0sWy00NCwtMTY2XV0sW1s5Mjk4OCw0NzQyNV0sWzg0LC0xMzRdLFsxMzUsLTM3NV0sWzEzMSwtMjAwXSxbLTM5LC0xNjZdLFstNzgsLTU5XSxbLTEyMCwyMjddLFstMTIyLDM3NV0sWy01OSw0NTBdLFszOCw1N10sWzMwLC0xNzVdXSxbWzg5MTc1LDQ1MTkzXSxbLTI0Nyw0ODVdLFstMjgyLDExOF0sWy02OSwtMTY4XSxbLTM1MiwtMThdLFsxMTgsNDgxXSxbMTc1LDE2NF0sWy03Miw2NDJdLFstMTM0LDQ5Nl0sWy01MzgsNTAwXSxbLTIyOSw1MF0sWy00MTcsNTQ2XSxbLTgyLC0yODddLFstMTA3LC01Ml0sWy02MywyMTZdLFstMSwyNTddLFstMjEyLDI5MF0sWzI5OSwyMTNdLFsxOTgsLTExXSxbLTIzLDE1Nl0sWy00MDcsMV0sWy0xMTAsMzUyXSxbLTI0OCwxMDldLFstMTE3LDI5M10sWzM3NCwxNDNdLFsxNDIsMTkyXSxbNDQ2LC0yNDJdLFs0NCwtMjIwXSxbNzgsLTk1NV0sWzI4NywtMzU0XSxbMjMyLDYyN10sWzMxOSwzNTZdLFsyNDcsMV0sWzIzOCwtMjA2XSxbMjA2LC0yMTJdLFsyOTgsLTExM11dLFtbODQ3MTMsNDUzMjZdLFsyOCwtMTE3XSxbNSwtMTc5XV0sW1s4NDc0Niw0NTAzMF0sWy0xODEsLTQ0MV0sWy0yMzgsLTEzMF0sWy0zMyw3MV0sWzI1LDIwMV0sWzExOSwzNjBdLFsyNzUsMjM1XV0sW1s4NzI4MCw0NjUwNl0sWy0yNyw0NDVdLFs0OSwyMTJdLFs1OCwyMDBdLFs2MywtMTczXSxbMCwtMjgyXSxbLTE0MywtNDAyXV0sW1s4Mjc0NCw1MzAyNF0sWy0xNTgsLTUzM10sWzIwNCwtNTYwXSxbLTQ4LC0yNzJdLFszMTIsLTU0Nl0sWy0zMjksLTcwXSxbLTkzLC00MDNdLFsxMiwtNTM1XSxbLTI2NywtNDA0XSxbLTcsLTU4OV0sWy0xMDcsLTkwM10sWy00MSwyMTBdLFstMzE2LC0yNjZdLFstMTEwLDM2MV0sWy0xOTgsMzRdLFstMTM5LDE4OV0sWy0zMzAsLTIxMl0sWy0xMDEsMjg1XSxbLTE4MiwtMzJdLFstMjI5LDY4XSxbLTQzLDc5M10sWy0xMzgsMTY0XSxbLTEzNCw1MDVdLFstMzgsNTE3XSxbMzIsNTQ4XSxbMTY1LDM5Ml1dLFtbODA0NjEsNTE3NjVdLFs0NywtMzk1XSxbMTkwLC0zMzRdLFsxNzksMTIxXSxbMTc3LC00M10sWzE2MiwyOTldLFsxMzMsNTJdLFsyNjMsLTE2Nl0sWzIyNiwxMjZdLFsxNDMsODIyXSxbMTA3LDIwNV0sWzk2LDY3Ml0sWzMxOSwwXSxbMjQxLC0xMDBdXSxbWzg1OTM2LDQ4OTI0XSxbMzA1LC0xNzJdLFsxMDEsLTQ1Ml0sWy0yMzQsMjQ0XSxbLTIzMiw0OV0sWy0xNTcsLTM5XSxbLTE5MiwyMV0sWzY1LDMyNV0sWzM0NCwyNF1dLFtbODUyNDIsNDgzNDBdLFstMTkyLDEwOF0sWy01NCwyNTRdLFsyODEsMjldLFs2OSwtMTk1XSxbLTEwNCwtMTk2XV0sW1s4NTUzNiw1MTg2NF0sWzIwLC0zMjJdLFsxNjQsLTUyXSxbMjYsLTI0MV0sWy0xNSwtNTE3XSxbLTE0Myw1OF0sWy00MiwtMzU5XSxbMTE0LC0zMTJdLFstNzgsLTcxXSxbLTExMiwzNzRdLFstODIsNzU1XSxbNTYsNDcyXSxbOTIsMjE1XV0sW1s4NDE0Niw1MTA5N10sWzMxOSwyNV0sWzI3NSw0MjldLFs0OCwtMTMyXSxbLTIyMywtNTg3XSxbLTIwOSwtMTEzXSxbLTI2NywxMTVdLFstNDYzLC0yOV0sWy0yNDMsLTg1XSxbLTM5LC00NDddLFsyNDgsLTUyNl0sWzE1MCwyNjhdLFs1MTgsMjAxXSxbLTIyLC0yNzJdLFstMTIxLDg2XSxbLTEyMSwtMzQ3XSxbLTI0NSwtMjI5XSxbMjYzLC03NTddLFstNTAsLTIwM10sWzI0OSwtNjgyXSxbLTIsLTM4OF0sWy0xNDgsLTE3M10sWy0xMDksMjA3XSxbMTM0LDQ4NF0sWy0yNzMsLTIyOV0sWy02OSwxNjRdLFszNiwyMjhdLFstMjAwLDM0Nl0sWzIxLDU3Nl0sWy0xODYsLTE3OV0sWzI0LC02ODldLFsxMSwtODQ2XSxbLTE3NiwtODVdLFstMTE5LDE3M10sWzc5LDU0NF0sWy00Myw1NzBdLFstMTE3LDRdLFstODYsNDA1XSxbMTE1LDM4N10sWzQwLDQ2OV0sWzEzOSw4OTFdLFs1OCwyNDNdLFsyMzcsNDM5XSxbMjE3LC0xNzRdLFszNTAsLTgyXV0sW1s4MzQxNCw0NDUxOV0sWy0zNjgsNDE0XSxbMjU5LDExNl0sWzE0NiwtMTgwXSxbOTcsLTE4MF0sWy0xNywtMTU5XSxbLTExNywtMTFdXSxbWzgzNzA1LDQ1NTM2XSxbMTg1LDQ1XSxbMjQ5LDIxNl0sWy00MSwtMzI4XSxbLTQxNywtMTY4XSxbLTM3MCw3M10sWzAsMjE2XSxbMjIwLDEyM10sWzE3NCwtMTc3XV0sW1s4Mjg0OSw0NTYzOV0sWzE3Miw0OF0sWzY5LC0yNTFdLFstMzIxLC0xMTldLFstMTkzLC03OV0sWy0xNDksNV0sWzk1LDM0MF0sWzE1Myw1XSxbNzQsMjA5XSxbMTAwLC0xNThdXSxbWzgwMTM0LDQ2Nzg1XSxbMzgsLTIxMF0sWzUzMywtNTldLFs2MSwyNDRdLFs1MTUsLTI4NF0sWzEwMSwtMzgzXSxbNDE3LC0xMDhdLFszNDEsLTM1MV0sWy0zMTcsLTIyNV0sWy0zMDYsMjM4XSxbLTI1MSwtMTZdLFstMjg4LDQ0XSxbLTI2MCwxMDZdLFstMzIyLDIyNV0sWy0yMDQsNTldLFstMTE2LC03NF0sWy01MDYsMjQzXSxbLTQ4LDI1NF0sWy0yNTUsNDRdLFsxOTEsNTY0XSxbMzM3LC0zNV0sWzIyNCwtMjMxXSxbMTE1LC00NV1dLFtbNzg5OTEsNDk5MzldLFs0NywtNDEyXSxbOTcsLTMzMF0sWzIwNCwtNTJdLFsxMzUsLTM3NF0sWy03MCwtNzM1XSxbLTExLC05MTRdLFstMzA4LC0xMl0sWy0yMzQsNDk0XSxbLTM1Niw0ODJdLFstMTE5LDM1OF0sWy0yMTAsNDgxXSxbLTEzOCw0NDNdLFstMjEyLDgyN10sWy0yNDQsNDkzXSxbLTgxLDUwOF0sWy0xMDMsNDYxXSxbLTI1MCwzNzJdLFstMTQ1LDUwNl0sWy0yMDksMzMwXSxbLTI5MCw2NTJdLFstMjQsMzAwXSxbMTc4LC0yNF0sWzQzMCwtMTE0XSxbMjQ2LC01NzddLFsyMTUsLTQwMV0sWzE1MywtMjQ2XSxbMjYzLC02MzVdLFsyODMsLTldLFsyMzMsLTQwNV0sWzE2MSwtNDk1XSxbMjExLC0yNzBdLFstMTExLC00ODJdLFsxNTksLTIwNV0sWzEwMCwtMTVdXSxbWzMwOTM1LDE5NDgxXSxbMTA2LC0yNzRdLFsxMzksLTQ0M10sWzM2MSwtMzU1XSxbMzg5LC0xNDddLFstMTI1LC0yOTZdLFstMjY0LC0yOV0sWy0xNDEsMjA4XV0sW1szMTQwMCwxODE0NV0sWy0xNjgsMTZdLFstMjk3LDFdLFswLDEzMTldXSxbWzMzOTkzLDMyNzI3XSxbLTcwLC00NzNdLFstNzQsLTYwN10sWzMsLTU4OF0sWy02MSwtMTMyXSxbLTIxLC0zODJdXSxbWzMzNzcwLDMwNTQ1XSxbLTE5LC0zMDhdLFszNTMsLTUwNl0sWy0zOCwtNDA4XSxbMTczLC0yNTddLFstMTQsLTI4OV0sWy0yNjcsLTc1N10sWy00MTIsLTMxN10sWy01NTcsLTEyM10sWy0zMDUsNTldLFs1OSwtMzUyXSxbLTU3LC00NDJdLFs1MSwtMjk4XSxbLTE2NywtMjA4XSxbLTI4NCwtODJdLFstMjY3LDIxNl0sWy0xMDgsLTE1NV0sWzM5LC01ODddLFsxODgsLTE3OF0sWzE1MiwxODZdLFs4MiwtMzA3XSxbLTI1NSwtMTgzXSxbLTIyMywtMzY3XSxbLTQxLC01OTVdLFstNjYsLTMxNl0sWy0yNjIsLTJdLFstMjE4LC0zMDJdLFstODAsLTQ0M10sWzI3MywtNDMzXSxbMjY2LC0xMTldLFstOTYsLTUzMV0sWy0zMjgsLTMzM10sWy0xODAsLTY5Ml0sWy0yNTQsLTIzNF0sWy0xMTMsLTI3Nl0sWzg5LC02MTRdLFsxODUsLTM0Ml0sWy0xMTcsMzBdXSxbWzMwOTUyLDE5NjgwXSxbLTI1Nyw5M10sWy02NzIsNzldLFstMTE1LDM0NF0sWzYsNDQzXSxbLTE4NSwtMzhdLFstOTgsMjE0XSxbLTI0LDYyNl0sWzIxMywyNjBdLFs4OCwzNzVdLFstMzMsMjk5XSxbMTQ4LDUwNF0sWzEwMSw3ODJdLFstMzAsMzQ3XSxbMTIyLDExMl0sWy0zMCwyMjNdLFstMTI5LDExOF0sWzkyLDI0OF0sWy0xMjYsMjI0XSxbLTY1LDY4Ml0sWzExMiwxMjBdLFstNDcsNzIwXSxbNjUsNjA1XSxbNzUsNTI3XSxbMTY2LDIxNV0sWy04NCw1NzZdLFstMSw1NDNdLFsyMTAsMzg2XSxbLTcsNDk0XSxbMTU5LDU3Nl0sWzEsNTQ0XSxbLTcyLDEwOF0sWy0xMjgsMTAyMF0sWzE3MSw2MDddLFstMjcsNTcyXSxbMTAwLDUzN10sWzE4Miw1NTVdLFsxOTYsMzY3XSxbLTgzLDIzMl0sWzU4LDE5MF0sWy05LDk4NV0sWzMwMiwyOTFdLFs5Niw2MTRdLFstMzQsMTQ4XV0sW1szMTM1OSwzNzE0N10sWzIzMSw1MzRdLFszNjQsLTE0NF0sWzE2MywtNDI3XSxbMTA5LDQ3NV0sWzMxNiwtMjRdLFs0NSwtMTI3XV0sW1szMjU4NywzNzQzNF0sWzUxMSwtOTY0XSxbMjI3LC04OV0sWzMzOSwtNDM3XSxbMjg2LC0yMzFdLFs0MCwtMjYxXSxbLTI3MywtODk4XSxbMjgwLC0xNjBdLFszMTIsLTkxXSxbMjIwLDk1XSxbMjUyLDQ1M10sWzQ1LDUyMV1dLFtbMzQ4MjYsMzUzNzJdLFsxMzgsMTE0XSxbMTM5LC0zNDFdLFstNiwtNDcyXSxbLTIzNCwtMzI2XSxbLTE4NiwtMjQxXSxbLTMxNCwtNTczXSxbLTM3MCwtODA2XV0sW1szMTQwMCwxODE0NV0sWy05MiwtMjM5XSxbLTIzOCwtMTgzXSxbLTEzNywxOV0sWy0xNjQsNDhdLFstMjAyLDE3N10sWy0yOTEsODZdLFstMzUwLDMzMF0sWy0yODMsMzE3XSxbLTM4Myw2NjJdLFsyMjksLTEyNF0sWzM5MCwtMzk1XSxbMzY5LC0yMTJdLFsxNDMsMjcxXSxbOTAsNDA1XSxbMjU2LDI0NF0sWzE5OCwtNzBdXSxbWzMwNjY5LDQwMTkzXSxbMTM2LC00MDJdLFszNywtNDI2XSxbMTQ2LC0yNTBdLFstODgsLTU3Ml0sWzE1MCwtNjYzXSxbMTA5LC04MTRdLFsyMDAsODFdXSxbWzMwOTUyLDE5NjgwXSxbLTI0Nyw0XSxbLTEzNCwtMTQ1XSxbLTI1MCwtMjEzXSxbLTQ1LC01NTJdLFstMTE4LC0xNF0sWy0zMTMsMTkyXSxbLTMxOCw0MTJdLFstMzQ2LDMzOF0sWy04NywzNzRdLFs3OSwzNDZdLFstMTQwLDM5M10sWy0zNiwxMDA3XSxbMTE5LDU2OF0sWzI5Myw0NTddLFstNDIyLDE3Ml0sWzI2NSw1MjJdLFs5NCw5ODJdLFszMDksLTIwOF0sWzE0NSwxMjI0XSxbLTE4NiwxNTddLFstODcsLTczOF0sWy0xNzUsODNdLFs4Nyw4NDVdLFs5NSwxMDk1XSxbMTI3LDQwNF0sWy04MCw1NzZdLFstMjIsNjY2XSxbMTE3LDE5XSxbMTcwLDk1NF0sWzE5Miw5NDVdLFsxMTgsODgxXSxbLTY0LDg4NV0sWzgzLDQ4N10sWy0zNCw3MzBdLFsxNjMsNzIxXSxbNTAsMTE0M10sWzg5LDEyMjddLFs4NywxMzIxXSxbLTIwLDk2N10sWy01OCw4MzJdXSxbWzMwNDUyLDM5NzM5XSxbMTQzLDE1MV0sWzc0LDMwM11dLFtbNTg1MzgsNDU2NTJdLFstMTA5LDYwXSxbLTM3MywtOTldLFstNzUsLTcxXSxbLTc5LC0zNzddLFs2MiwtMjYxXSxbLTQ5LC02OTldLFstMzQsLTU5M10sWzc1LC0xMDVdLFsxOTQsLTIzMF0sWzc2LDEwN10sWzIzLC02MzddLFstMjEyLDVdLFstMTE0LDMyNV0sWy0xMDMsMjUyXSxbLTIxMyw4Ml0sWy02MiwzMTBdLFstMTcwLC0xODddLFstMjIyLDgzXSxbLTkzLDI2OF0sWy0xNzYsNTVdLFstMTMxLC0xNV0sWy0xNSwxODRdLFstOTYsMTVdXSxbWzU2NjQyLDQ0MTI0XSxbLTEyNywzNV0sWy0xNzIsLTg5XSxbLTEyMSwxNV0sWy02OCwtNTRdLFsxNSw3MDNdLFstOTMsMjE5XSxbLTIxLDM2M10sWzQxLDM1Nl0sWy01NiwyMjhdLFstNSwzNzJdLFstMzM3LC01XSxbMjQsMjEzXSxbLTE0MiwtMl0sWy0xNSwtMTAzXSxbLTE3MiwtMjNdLFstNjksLTM0NF0sWy00MiwtMTQ4XSxbLTE1NCw4M10sWy05MSwtODNdLFstMTg0LC00N10sWy0xMDYsMzA5XSxbLTY0LDE5MV0sWy04MCwzNTRdLFstNjgsNDQwXSxbLTgyMCw4XSxbLTk4LC03MV0sWy04MCwxMV0sWy0xMTUsLTc5XV0sW1s1MzQyMiw0Njk3Nl0sWy0zOSwxODNdXSxbWzUzMzgzLDQ3MTU5XSxbNzEsNjJdLFs5LDI1OF0sWzQ1LDE1Ml0sWzEwMSwxMjRdXSxbWzUzNjA5LDQ3NzU1XSxbNzMsLTYwXSxbOTUsMjI2XSxbMTUyLC02XSxbMTcsLTE2N10sWzEwNCwtMTA1XSxbMTY0LDM3MF0sWzE2MSwyODldLFs3MSwxODldLFstMTAsNDg2XSxbMTIxLDU3NF0sWzEyNywzMDRdLFsxODMsMjg1XSxbMzIsMTg5XSxbNywyMTZdLFs0NSwyMDVdLFstMTQsMzM1XSxbMzQsNTI0XSxbNTUsMzY4XSxbODMsMzE2XSxbMTYsMzU3XV0sW1s1NTEyNSw1MjY1MF0sWzI1LDQxMl0sWzEwOCwzMDBdLFsxNDksMTkwXSxbMjI5LC0yMDBdLFsxNzcsLTIxOF0sWzIwMywtNTldLFsyMDcsLTExNV0sWzgzLDM1N10sWzM4LDQ2XSxbMTI3LC02MF0sWzMwOSwyOTVdLFsxMTAsLTEyNV0sWzkwLDE4XSxbNDEsMTQzXSxbMTA0LDUxXSxbMjA5LC02Ml0sWzE3OCwtMTRdLFs5MSw2M11dLFtbNTc2MDMsNTM2NzJdLFsxNjksLTQ4OF0sWzEyNCwtNzFdLFs3NSw5OV0sWzEyOCwtMzldLFsxNTUsMTI1XSxbNjYsLTI1Ml0sWzI0NCwtMzkzXV0sW1s1ODU2NCw1MjY1M10sWy0xNiwtNjkxXSxbMTExLC04MF0sWy04OSwtMjEwXSxbLTEwNywtMTU3XSxbLTEwNiwtMzA4XSxbLTU5LC0yNzRdLFstMTUsLTQ3NV0sWy02NSwtMjI1XSxbLTIsLTQ0Nl1dLFtbNTgyMTYsNDk3ODddLFstODAsLTE2NV0sWy0xMCwtMzUxXSxbLTM4LC00Nl0sWy0yNiwtMzIzXV0sW1s1ODA2Miw0ODkwMl0sWzcwLC0yNjhdLFsxNywtNzEzXV0sW1s2MTU1MSw0OTU4NV0sWy0xNjUsNDg4XSxbLTMsMjE1Ml0sWzI0Myw2NzBdXSxbWzYxNjI2LDUyODk1XSxbNzYsMTg2XSxbMTc4LDExXSxbMjQ3LDQxN10sWzM2MiwyNl0sWzc4NSwxNzczXV0sW1s2MzI3NCw1NTMwOF0sWzE5NCw0OTNdLFsxMjUsMzYzXSxbMCwzMDhdLFswLDU5Nl0sWzEsMjQ0XSxbMiw5XV0sW1s2MzU5Niw1NzMyMV0sWzg5LDEyXSxbMTI4LDg4XSxbMTQ3LDU5XSxbMTMyLDIwMl0sWzEwNSwyXSxbNiwtMTYzXSxbLTI1LC0zNDRdLFsxLC0zMTBdLFstNTksLTIxNF0sWy03OCwtNjM5XSxbLTEzNCwtNjU5XSxbLTE3MiwtNzU1XSxbLTIzOCwtODY2XSxbLTIzNywtNjYxXSxbLTMyNywtODA2XSxbLTI3OCwtNDc5XSxbLTQxNSwtNTg2XSxbLTI1OSwtNDUwXSxbLTMwNCwtNzE1XSxbLTY0LC0zMTJdLFstNjMsLTE0MF1dLFtbNTk0MTcsNTAwMThdLFstMyw2MjddLFs4MCwyMzldLFsxMzcsMzkxXSxbMTAxLDQzMV0sWy0xMjMsNjc4XSxbLTMyLDI5Nl0sWy0xMzIsNDExXV0sW1s1OTQ0NSw1MzA5MV0sWzE3MSwzNTJdLFsxODgsMzkwXV0sW1s1OTgwNCw1MzgzM10sWzE0NSwtOTldLFswLC0zMzJdLFs5NSwtMTk0XSxbMTkzLDBdLFszNTIsLTUwMl0sWzg3LC02XSxbNjUsMTZdLFs2MiwtNjhdLFsxODUsLTQ3XSxbODIsMjQ3XSxbMjU0LDI0N10sWzExMiwtMjAwXSxbMTkwLDBdXSxbWzYxNTUxLDQ5NTg1XSxbLTE5NSwtMjM2XSxbLTY4LC0yNDZdLFstMTA0LC00NF0sWy00MCwtNDE2XSxbLTg5LC0yMzhdLFstNTQsLTM5M10sWy0xMTIsLTE5NV1dLFtbNTY4MjQsNTU0NDJdLFstMjEyLDI1OF0sWy05NiwxNzBdLFstMTgsMTg0XSxbNDUsMjQ2XSxbLTEsMjQxXSxbLTE2MCwzNjldLFstMzEsMjUzXV0sW1s1NjM1MSw1NzE2M10sWzMsMTQzXSxbLTEwMiwxNzRdLFstMywzNDNdLFstNTgsMjI4XSxbLTk4LC0zNF0sWzI4LDIxN10sWzcyLDI0Nl0sWy0zMiwyNDVdLFs5MiwxODFdLFstNTgsMTM4XSxbNzMsMzY1XSxbMTI3LDQzNV0sWzI0MCwtNDFdLFstMTQsMjM0NV1dLFtbNTY2MjEsNjIxNDhdLFszLDI0OF0sWzMyMCwyXSxbMCwxMTgwXV0sW1s1Njk0NCw2MzU3OF0sWzExMTcsMF0sWzEwNzcsMF0sWzExMDIsMF1dLFtbNjAyNDAsNjM1NzhdLFs5MCwtNTgwXSxbLTYxLC0xMDddLFs0MCwtNjA4XSxbMTAyLC03MDZdLFsxMDYsLTE0NV0sWzE1MiwtMjE5XV0sW1s2MDY2OSw2MTIxM10sWy0xNDEsLTMzN10sWy0yMDQsLTk3XSxbLTg4LC0xODFdLFstMjcsLTM5M10sWy0xMjAsLTg2OF0sWzMwLC0yMzZdXSxbWzYwMTE5LDU5MTAxXSxbLTQ1LC01MDhdLFstMTEyLC01ODJdLFstMTY4LC0yOTNdLFstMTE5LC00NTFdLFstMjgsLTI0MV0sWy0xMzIsLTE2Nl0sWy04MiwtNjE4XSxbNCwtNTMxXV0sW1s1OTQzNyw1NTcxMV0sWy0zLDQ2MF0sWy0zOSwxMl0sWzUsMjk0XSxbLTMzLDIwM10sWy0xNDMsMjMzXSxbLTM0LDQyNl0sWzM0LDQzNl0sWy0xMjksNDFdLFstMTksLTEzMl0sWy0xNjcsLTMwXSxbNjcsLTE3M10sWzIzLC0zNTVdLFstMTUyLC0zMjRdLFstMTM4LC00MjZdLFstMTQ0LC02MV0sWy0yMzMsMzQ1XSxbLTEwNSwtMTIyXSxbLTI5LC0xNzJdLFstMTQzLC0xMTJdLFstOSwtMTIyXSxbLTI3NywwXSxbLTM4LDEyMl0sWy0yMDAsMjBdLFstMTAwLC0xMDFdLFstNzcsNTFdLFstMTQzLDM0NF0sWy00OCwxNjNdLFstMjAwLC04MV0sWy03NiwtMjc0XSxbLTcyLC01MjhdLFstOTUsLTExMV0sWy04NSwtNjVdLFsxODksLTIzMF1dLFtbNTYzNTEsNTcxNjNdLFstMTc2LC0xMDFdLFstMTQxLC0yMzldLFstMjAxLC02NDVdLFstMjYxLC0yNzNdLFstMjY5LDM2XSxbLTc4LC01NF0sWzI4LC0yMDhdLFstMTQ1LC0yMDddLFstMTE4LC0yMzBdLFstMzUwLC0yMjZdLFstNjksMTM0XSxbLTQ2LDExXSxbLTUyLC0xNTJdLFstMjI5LC00NF1dLFtbNTQyNDQsNTQ5NjVdLFs0MywxNjBdLFstODcsNDA3XSxbLTM5LDI0NV0sWy0xMjEsMTAwXSxbLTE2NCwzNDVdLFs2MCwyNzldLFsxMjcsLTYwXSxbNzgsNDJdLFsxNTUsLTZdLFstMTUxLDUzN10sWzEwLDM5M10sWy0xOCwzOTJdLFstMTExLDM3OF1dLFtbNTQwMjYsNTgxNzddLFsyOCwyNzldLFstMTc4LDEzXSxbMCwzODBdLFstMTE1LDIxOV0sWzEyMCw3NzhdLFszNTQsNTU3XSxbMTUsNzY5XSxbMTA3LDExOTldLFs2MCwyNTRdLFstMTE2LDIwM10sWy00LDE4OF0sWy0xMDQsMTUzXSxbLTY4LDkxOV1dLFtbNTQxMjUsNjQwODhdLFsyODAsMzIzXSxbMTEwOCwtMTEzMl0sWzExMDgsLTExMzFdXSxbWzMwMDgwLDYyMjI3XSxbMjQsLTMyMV0sWy0yMSwtMjI4XSxbLTY4LC05OV0sWzcxLC0xNzddLFstNSwtMTYxXV0sW1szMDA4MSw2MTI0MV0sWy0xODUsMTAwXSxbLTEzMSwtNDFdLFstMTY5LDQzXSxbLTEzMCwtMTEwXSxbLTE0OSwxODRdLFsyNCwxOTBdLFsyNTYsLTgyXSxbMjEwLC00N10sWzEwMCwxMzFdLFstMTI3LDI1Nl0sWzIsMjI2XSxbLTE3NSw5Ml0sWzYyLDE2M10sWzE3MCwtMjZdLFsyNDEsLTkzXV0sW1szMDA4MCw2MjIyN10sWzM0LDEwMV0sWzIxNywtM10sWzE2NSwtMTUyXSxbNzMsMTVdLFs1MCwtMjA5XSxbMTUyLDExXSxbLTksLTE3Nl0sWzEyNCwtMjFdLFsxMzYsLTIxN10sWy0xMDMsLTI0MF0sWy0xMzIsMTI4XSxbLTEyNywtMjVdLFstOTIsMjhdLFstNTAsLTEwN10sWy0xMDYsLTM3XSxbLTQzLDE0NF0sWy05MiwtODVdLFstMTExLC00MDVdLFstNzEsOTRdLFstMTQsMTcwXV0sW1s3NjA0OSw5ODQ1MV0sWzYwMCwxMzNdLFs1NDAsLTI5N10sWzY0MCwtNTcyXSxbLTY5LC01MzFdLFstNjA2LC03M10sWy03NzMsMTcwXSxbLTQ2MiwyMjZdLFstMjEzLDQyM10sWy0zNzksMTE3XSxbNzIyLDQwNF1dLFtbNzg1NjUsOTc0MjFdLFs3MDQsLTMzNl0sWy04MiwtMjQwXSxbLTE1NjYsLTIyOF0sWzUwNyw3NzZdLFsyMjksNjZdLFsyMDgsLTM4XV0sW1s4ODU2Myw5NTU2M10sWzczNCwtMjZdLFsxMDA0LC0zMTNdLFstMjE5LC00MzldLFstMTAyMywxNl0sWy00NjEsLTEzOV0sWy01NTAsMzg0XSxbMTQ5LDQwNl0sWzM2NiwxMTFdXSxbWzkxMTcyLDk1MDk2XSxbNjk3LC0xNTVdLFstMzIxLC0yMzRdLFstNDQ0LDUzXSxbLTUxNiwyMzNdLFs2NiwxOTJdLFs1MTgsLTg5XV0sW1s4ODg1MCw5MzkyOF0sWzI2MywyMzRdLFszNDgsNTRdLFszOTQsLTIyNl0sWzM0LC0xNTVdLFstNDIxLC00XSxbLTU2OSw2Nl0sWy00OSwzMV1dLFtbNjI0NTcsOTgxOTRdLFs1NDIsMTA3XSxbNDIyLDhdLFs1NywtMTYwXSxbMTU5LDE0Ml0sWzI2Miw5N10sWzQxMiwtMTI5XSxbLTEwNywtOTBdLFstMzczLC03OF0sWy0yNTAsLTQ1XSxbLTM5LC05N10sWy0zMjQsLTk4XSxbLTMwMSwxNDBdLFsxNTgsMTg1XSxbLTYxOCwxOF1dLFtbNTYzMTQsODI2NzhdLFstNTExLC05XSxbLTM0Miw2N11dLFtbNTU0NjEsODI3MzZdLFs2MywyNjBdLFszODMsMTkxXV0sW1s1NTkwNyw4MzE4N10sWzI5MSwtMTAzXSxbMTIzLC05NF0sWy0zMCwtMTYyXSxbMjMsLTE1MF1dLFtbNjQ4NjMsOTQxNTNdLFs2NjUsNTE4XSxbLTc1LDI2OF0sWzYyMSwzMTJdLFs5MTcsMzgwXSxbOTI1LDExMF0sWzQ3NSwyMjBdLFs1NDEsNzZdLFsxOTMsLTIzM10sWy0xODcsLTE4NF0sWy05ODQsLTI5M10sWy04NDgsLTI4Ml0sWy04NjMsLTU2Ml0sWy00MTQsLTU3N10sWy00MzUsLTU2OF0sWzU2LC00OTFdLFs1MzEsLTQ4NF0sWy0xNjQsLTUyXSxbLTkwNyw3N10sWy03NCwyNjJdLFstNTAzLDE1OF0sWy00MCwzMjBdLFsyODQsMTI2XSxbLTEwLDMyM10sWzU1MSw1MDNdLFstMjU1LDczXV0sW1s4OTY5OCw4MjMwOV0sWzk2LC01NjldLFstNywtNTgxXSxbMTE0LC01OTddLFsyODAsLTEwNDZdLFstNDExLDE5NV0sWy0xNzEsLTg1NF0sWzI3MSwtNjA1XSxbLTgsLTQxM10sWy0yMTEsMzU2XSxbLTE4MiwtNDU3XSxbLTUxLDQ5Nl0sWzMxLDU3NV0sWy0zMiw2MzhdLFs2NCw0NDZdLFsxMyw3OTBdLFstMTYzLDU4MV0sWzI0LDgwOF0sWzI1NywyNzFdLFstMTEwLDI3NF0sWzEyMyw4M10sWzczLC0zOTFdXSxbWzg2MzI3LDc1NTI0XSxbLTM5LDEwNF1dLFtbODYyODgsNzU2MjhdLFstMiwzMDBdLFsxNDIsMTZdLFs0MCw2OThdLFstNzMsNTA2XSxbMjM4LDIwOF0sWzMzOCwtMTA0XSxbMTg2LDU3NV0sWzk2LDY0N10sWzEwNywyMTZdLFsxNDYsNTMyXSxbLTQ1OSwtMTc1XSxbLTI0MCwtMjMzXSxbLTQyMywxXSxbLTExMiw1NTVdLFstMzI5LDQyMF0sWy00ODMsMTg5XSxbLTEwMyw1NzldLFstOTcsMzYzXSxbLTEwNCwyNTRdLFstMTcyLDU5Nl0sWy0yNDQsMjE3XSxbLTQxNSwxNzZdLFstMzY5LC0xNl0sWy0zNDUsLTEwNl0sWy0yMjksLTI5NF0sWzE1MiwtMTQxXSxbNCwtMzI2XSxbLTE1NSwtMTg5XSxbLTI1MSwtNjI3XSxbMywtMjYwXSxbLTM5MiwtMzczXSxbLTMzMywyMjNdXSxbWzgyNDEwLDgwMDU1XSxbLTMzMSwtNDldLFstMTQ2LDE5OF0sWy0xNjYsNjNdLFstNDA3LC00MTZdLFstMzY2LC05OF0sWy0yNTUsLTE0Nl0sWy0zNTAsOTZdLFstMjU4LC02XSxbLTE2OCwzMDJdLFstMjcyLDI4NF0sWy0yNzksNzhdLFstMzUxLC03OF0sWy0yNjMsLTEwOV0sWy0zOTQsMjQ4XSxbLTUzLDQ0M10sWy0zMjcsMTUyXSxbLTI1Miw2OV0sWy0zMTEsMjQ0XSxbLTI4OCwtNjEyXSxbMTEzLC0zNDhdLFstMjcwLC00MTFdLFstNDAyLDE0OF0sWy0yNzcsMjJdLFstMTg2LDI3Nl0sWy0yODksOF0sWy0yNDIsMTgyXSxbLTQyMywtMjc4XSxbLTUzMCwtNTA5XSxbLTI5MiwtMTAyXV0sW1s3NDM3NSw3OTcwNl0sWy0xMDksLTQ5XV0sW1s2MzYzOSw3Nzk5M10sWy0xMjcsLTM1MF0sWy0yNjksLTk3XSxbLTI3NiwtNjEwXSxbMjUyLC01NjFdLFstMjcsLTM5OF0sWzMwMywtNjk2XV0sW1s2MzQ5NSw3NTI4MV0sWy0xNjYsLTIzOF0sWy00OCwtMTUwXSxbLTEyMiw0MF0sWy0xOTEsMzU5XSxbLTc4LDIwXV0sW1s2Mjg5MCw3NTMxMl0sWy0xNzUsMTM3XSxbLTg1LDI0Ml0sWy0yNTksMTI0XSxbLTE2OSwtOTNdLFstNDgsMTEwXSxbLTM3OCwyODNdLFstNDA5LDk2XSxbLTIzNSwxMDFdLFstMzQsLTcwXV0sW1s2MTA5OCw3NjI0Ml0sWy0zNTQsNDk5XSxbLTMxNywyMjNdLFstMjQwLDM0N10sWzIwMiw5NV0sWzIzMSw0OTRdLFstMTU2LDIzNF0sWzQxMCwyNDFdLFstOCwxMjldLFstMjQ5LC05NV1dLFtbNjA2MTcsNzg0MDldLFs5LDI2Ml0sWzE0MywxNjVdLFsyNjksNDNdLFs0NCwxOTddLFstNjIsMzI2XSxbMTEzLDMxMF0sWy0zLDE3M10sWy00MTAsMTkyXSxbLTE2MiwtNl0sWy0xNzIsMjc3XSxbLTIxMywtOTRdLFstMzUyLDIwOF0sWzYsMTE2XSxbLTk5LDI1Nl0sWy0yMjIsMjldLFstMjMsMTgzXSxbNzAsMTIwXSxbLTE3OCwzMzRdLFstMjg4LC01N10sWy04NCwzMF0sWy03MCwtMTM0XSxbLTEwNCwyM11dLFtbNTg4MjksODEzNjJdLFstNjgsMzc5XSxbLTY2LDE5Nl0sWzU0LDU1XSxbMjI0LC0yMF0sWzEwOCwxMjldLFstODAsMTU3XSxbLTE4NywxMDRdLFsxNiwxMDddLFstMTEzLDEwOF0sWy0xNzQsMzg3XSxbNjAsMTU5XSxbLTI3LDI3N10sWy0yNzIsMTQxXSxbLTE0NiwtNzBdLFstMzksMTQ2XSxbLTI5MywxNDldXSxbWzU3ODI2LDgzNzY2XSxbLTg5LDM0OF0sWy0yNCwyODddLFstMTM0LDEzNl1dLFtbNTc1NzksODQ1MzddLFsxMjAsMTg3XSxbLTgzLDU1MV0sWzE5OCwzNDFdLFstNDIsMTAzXV0sW1s1Nzc3Miw4NTcxOV0sWzMxNiwzMjddLFstMjkxLDI4MF1dLFtbNTc3OTcsODYzMjZdLFs1OTQsNzU1XSxbMjU4LDM0MV0sWzEwNSwzMDFdLFstNDExLDQwNV0sWzExMywzODVdLFstMjUwLDQ0MF0sWzE4Nyw1MDZdLFstMzIzLDY3M10sWzI1Niw0NDVdLFstNDI1LDM5NF0sWzQxLDQxNF1dLFtbNTc5NDIsOTEzODVdLFsyMjQsNTRdLFs0NzMsMjM3XV0sW1s1ODYzOSw5MTY3Nl0sWzI4NiwyMDZdLFs0NTYsLTM1OF0sWzc2MSwtMTQwXSxbMTA1MCwtNjY4XSxbMjEzLC0yODFdLFsxOCwtMzkzXSxbLTMwOCwtMzExXSxbLTQ1NCwtMTU3XSxbLTEyNDAsNDQ5XSxbLTIwNCwtNzVdLFs0NTMsLTQzM10sWzE4LC0yNzRdLFsxOCwtNjA0XSxbMzU4LC0xODBdLFsyMTcsLTE1M10sWzM2LDI4Nl0sWy0xNjgsMjU0XSxbMTc3LDIyNF0sWzY3MiwtMzY4XSxbMjMzLDE0NF0sWy0xODYsNDMzXSxbNjQ3LDU3OF0sWzI1NiwtMzRdLFsyNjAsLTIwNl0sWzE2MSw0MDZdLFstMjMxLDM1Ml0sWzEzNiwzNTNdLFstMjA0LDM2N10sWzc3NywtMTkwXSxbMTU4LC0zMzFdLFstMzUxLC03M10sWzEsLTMyOF0sWzIxOSwtMjAzXSxbNDI5LDEyOF0sWzY4LDM3N10sWzU4MCwyODJdLFs5NzAsNTA3XSxbMjA5LC0yOV0sWy0yNzMsLTM1OV0sWzM0NCwtNjFdLFsxOTksMjAyXSxbNTIxLDE2XSxbNDEyLDI0NV0sWzMxNywtMzU2XSxbMzE1LDM5MV0sWy0yOTEsMzQzXSxbMTQ1LDE5NV0sWzgyMCwtMTc5XSxbMzg1LC0xODVdLFsxMDA2LC02NzVdLFsxODYsMzA5XSxbLTI4MiwzMTNdLFstOCwxMjVdLFstMzM1LDU4XSxbOTIsMjgwXSxbLTE0OSw0NjFdLFstOCwxODldLFs1MTIsNTM1XSxbMTgzLDUzN10sWzIwNiwxMTZdLFs3MzYsLTE1Nl0sWzU3LC0zMjhdLFstMjYzLC00NzldLFsxNzMsLTE4OV0sWzg5LC00MTNdLFstNjMsLTgwOV0sWzMwNywtMzYyXSxbLTEyMCwtMzk1XSxbLTU0NCwtODM5XSxbMzE4LC04N10sWzExMCwyMTNdLFszMDYsMTUxXSxbNzQsMjkzXSxbMjQwLDI4MV0sWy0xNjIsMzM2XSxbMTMwLDM5MF0sWy0zMDQsNDldLFstNjcsMzI4XSxbMjIyLDU5M10sWy0zNjEsNDgyXSxbNDk3LDM5OF0sWy02NCw0MjFdLFsxMzksMTNdLFsxNDUsLTMyOF0sWy0xMDksLTU3MF0sWzI5NywtMTA4XSxbLTEyNyw0MjZdLFs0NjUsMjMzXSxbNTc3LDMxXSxbNTEzLC0zMzddLFstMjQ3LDQ5Ml0sWy0yOCw2MzBdLFs0ODMsMTE5XSxbNjY5LC0yNl0sWzYwMiw3N10sWy0yMjYsMzA5XSxbMzIxLDM4OF0sWzMxOSwxNl0sWzU0MCwyOTNdLFs3MzQsNzldLFs5MywxNjJdLFs3MjksNTVdLFsyMjcsLTEzM10sWzYyNCwzMTRdLFs1MTAsLTEwXSxbNzcsMjU1XSxbMjY1LDI1Ml0sWzY1NiwyNDJdLFs0NzYsLTE5MV0sWy0zNzgsLTE0Nl0sWzYyOSwtOTBdLFs3NSwtMjkyXSxbMjU0LDE0M10sWzgxMiwtN10sWzYyNiwtMjg5XSxbMjIzLC0yMjFdLFstNjksLTMwN10sWy0zMDcsLTE3NV0sWy03MzAsLTMyOF0sWy0yMDksLTE3NV0sWzM0NSwtODNdLFs0MTAsLTE0OV0sWzI1MSwxMTJdLFsxNDEsLTM3OV0sWzEyMiwxNTNdLFs0NDQsOTNdLFs4OTIsLTk3XSxbNjcsLTI3Nl0sWzExNjIsLTg4XSxbMTUsNDUxXSxbNTkwLC0xMDRdLFs0NDMsNF0sWzQ0OSwtMzEyXSxbMTI4LC0zNzhdLFstMTY1LC0yNDddLFszNDksLTQ2NV0sWzQzNywtMjQwXSxbMjY4LDYyMF0sWzQ0NiwtMjY2XSxbNDczLDE1OV0sWzUzOCwtMTgyXSxbMjA0LDE2Nl0sWzQ1NSwtODNdLFstMjAxLDU0OV0sWzM2NywyNTZdLFsyNTA5LC0zODRdLFsyMzYsLTM1MV0sWzcyNywtNDUxXSxbMTEyMiwxMTJdLFs1NTMsLTk4XSxbMjMxLC0yNDRdLFstMzMsLTQzMl0sWzM0MiwtMTY4XSxbMzcyLDEyMV0sWzQ5MiwxNV0sWzUyNSwtMTE2XSxbNTI2LDY2XSxbNDg0LC01MjZdLFszNDQsMTg5XSxbLTIyNCwzNzhdLFsxMjMsMjYyXSxbODg2LC0xNjVdLFs1NzgsMzZdLFs3OTksLTI4Ml0sWy05OTYxMCwtMjU4XSxbNjgxLC00NTFdLFs3MjgsLTU4OF0sWy0yNCwtMzY3XSxbMTg3LC0xNDddLFstNjQsNDI5XSxbNzU0LC04OF0sWzU0NCwtNTUzXSxbLTI3NiwtMjU3XSxbLTQ1NSwtNjFdLFstNywtNTc4XSxbLTExMSwtMTIyXSxbLTI2MCwxN10sWy0yMTIsMjA2XSxbLTM2OSwxNzJdLFstNjIsMjU3XSxbLTI4Myw5Nl0sWy0zMTUsLTc2XSxbLTE1MSwyMDddLFs2MCwyMTldLFstMzMzLC0xNDBdLFsxMjYsLTI3OF0sWy0xNTgsLTI1MV0sWzk5OTk3LC0zXSxbLTM1NywtMjYwXSxbLTM2MCw0NF0sWzI1MCwtMzE1XSxbMTY2LC00ODddLFsxMjgsLTE1OV0sWzMyLC0yNDRdLFstNzEsLTE1N10sWy01MTgsMTI5XSxbLTc3NywtNDQ1XSxbLTI0NywtNjldLFstNDI1LC00MTVdLFstNDAzLC0zNjJdLFstMTAyLC0yNjldLFstMzk3LDQwOV0sWy03MjQsLTQ2NF0sWy0xMjYsMjE5XSxbLTI2OCwtMjUzXSxbLTM3MSw4MV0sWy05MCwtMzg4XSxbLTMzMywtNTcyXSxbMTAsLTIzOV0sWzMxNiwtMTMyXSxbLTM3LC04NjBdLFstMjU4LC0yMl0sWy0xMTksLTQ5NF0sWzExNiwtMjU1XSxbLTQ4NiwtMzAyXSxbLTk2LC02NzRdLFstNDE1LC0xNDRdLFstODMsLTYwMF0sWy00MDAsLTU1MV0sWy0xMDMsNDA3XSxbLTExOSw4NjJdLFstMTU1LDEzMTNdLFsxMzQsODE5XSxbMjM0LDM1M10sWzE0LDI3Nl0sWzQzMiwxMzJdLFs0OTYsNzQ0XSxbNDc5LDYwOF0sWzQ5OSw0NzFdLFsyMjMsODMzXSxbLTMzNywtNTBdLFstMTY3LC00ODddLFstNzA1LC02NDldLFstMjI3LDcyN10sWy03MTcsLTIwMV0sWy02OTYsLTk5MF0sWzIzMCwtMzYyXSxbLTYyMCwtMTU0XSxbLTQzMCwtNjFdLFsyMCw0MjddLFstNDMxLDkwXSxbLTM0NCwtMjkxXSxbLTg1MCwxMDJdLFstOTE0LC0xNzVdLFstODk5LC0xMTUzXSxbLTEwNjUsLTEzOTRdLFs0MzgsLTc0XSxbMTM2LC0zNzBdLFsyNzAsLTEzMl0sWzE3OCwyOTVdLFszMDUsLTM4XSxbNDAxLC02NTBdLFs5LC01MDNdLFstMjE3LC01OTBdLFstMjMsLTcwNV0sWy0xMjYsLTk0NV0sWy00MTgsLTg1NV0sWy05NCwtNDA5XSxbLTM3NywtNjg4XSxbLTM3NCwtNjgyXSxbLTE3OSwtMzQ5XSxbLTM3MCwtMzQ2XSxbLTE3NSwtOF0sWy0xNzUsMjg3XSxbLTM3MywtNDMyXSxbLTQzLC0xOTddXSxbWzAsOTI4MzNdLFszNiwyNF0sWzIzNSwtMV0sWzQwMiwtMTY5XSxbLTI0LC04MV0sWy0yODYsLTE0MV0sWy0zNjMsLTM2XSxbOTk2OTQsLTMwXSxbLTQ5LDE4N10sWy05OTY0NSwyNDddXSxbWzU5Mjg3LDc3NzQxXSxbNzMsMTQ2XSxbMTk4LC0xMjddLFs4OSwtMjNdLFszNiwtMTE3XSxbNDIsLTE4XV0sW1s1OTcyNSw3NzYwMl0sWzIsLTUxXSxbMTM2LC0xNDJdLFsyODQsMzVdLFstNTUsLTIxMF0sWy0zMDQsLTEwM10sWy0zNzcsLTM0Ml0sWy0xNTQsMTIxXSxbNjEsMjc3XSxbLTMwNCwxNzNdLFs1MCwxMTNdLFsyNjUsMTk3XSxbLTQyLDcxXV0sW1syODA2MSw2NjQwOF0sWzEzMCw0N10sWzE4NCwtMThdLFs4LC0xNTNdLFstMzAzLC05NV0sWy0xOSwyMTldXSxbWzI4MzkxLDY2NTU1XSxbMjIwLC0yNjVdLFstNDgsLTQyMF0sWy01MSw3NV0sWzQsMzA5XSxbLTEyNCwyMzRdLFstMSw2N11dLFtbMjgyODAsNjU0NzRdLFs4NCwtMjNdLFs5NywtNDkxXSxbMSwtMzQzXSxbLTY4LC0yOV0sWy03MCwzNDBdLFstMTA0LDE3MV0sWzYwLDM3NV1dLFtbMzMwMDAsMTk5NDZdLFszMzMsMzU0XSxbMjM2LC0xNDhdLFsxNjcsMjM3XSxbMjIyLC0yNjZdLFstODMsLTIwN10sWy0zNzUsLTE3N10sWy0xMjUsMjA3XSxbLTIzNiwtMjY2XSxbLTEzOSwyNjZdXSxbWzU0MjA2LDk3NjUzXSxbMTA1LDIwMl0sWzQwOCwyMF0sWzM1MCwtMjA2XSxbOTE1LC00NDBdLFstNjk5LC0yMzNdLFstMTU1LC00MzVdLFstMjQzLC0xMTFdLFstMTMyLC00OTBdLFstMzM1LC0yM10sWy01OTgsMzYxXSxbMjUyLDIxMF0sWy00MTYsMTcwXSxbLTU0MSw0OTldLFstMjE2LDQ2M10sWzc1NywyMTJdLFsxNTIsLTIwN10sWzM5Niw4XV0sW1s1Nzk0Miw5MTM4NV0sWzExNyw0MTRdLFstMzU2LDIzNV0sWy00MzEsLTIwMF0sWy0xMzcsLTQzM10sWy0yNjUsLTI2Ml0sWy0yOTgsMTQzXSxbLTM2MiwtMjldLFstMzA5LDMxMl0sWy0xNjcsLTE1Nl1dLFtbNTU3MzQsOTE0MDldLFstMTcyLC0yNF0sWy00MSwtMzg5XSxbLTUyMyw5NV0sWy03NCwtMzI5XSxbLTI2NywyXSxbLTE4MywtNDIxXSxbLTI3OCwtNjU1XSxbLTQzMSwtODMxXSxbMTAxLC0yMDJdLFstOTcsLTIzNF0sWy0yNzUsMTBdLFstMTgwLC01NTRdLFsxNywtNzg0XSxbMTc3LC0zMDBdLFstOTIsLTY5NF0sWy0yMzEsLTQwNV0sWy0xMjIsLTM0MV1dLFtbNTMwNjMsODUzNTNdLFstMTg3LDM2M10sWy01NDgsLTY4NF0sWy0zNzEsLTEzOF0sWy0zODQsMzAxXSxbLTk5LDYzNV0sWy04OCwxMzYzXSxbMjU2LDM4MV0sWzczMyw0OTZdLFs1NDksNjA5XSxbNTA4LDgyNF0sWzY2OCwxMTQxXSxbNDY1LDQ0NF0sWzc2Myw3NDFdLFs2MTAsMjU5XSxbNDU3LC0zMV0sWzQyMyw0ODldLFs1MDYsLTI2XSxbNDk5LDExOF0sWzg2OSwtNDMzXSxbLTM1OCwtMTU4XSxbMzA1LC0zNzFdXSxbWzU3NjEzLDk3ODc5XSxbLTQxMiwtMzE4XSxbLTgwNiwtNzBdLFstODE5LDk4XSxbLTUwLDE2M10sWy0zOTgsMTFdLFstMzA0LDI3MV0sWzg1OCwxNjVdLFs0MDMsLTE0Ml0sWzI4MSwxNzddLFs3MDIsLTE0OF0sWzU0NSwtMjA3XV0sW1s1Njg2Nyw5NjU3N10sWy02MjAsLTI0MV0sWy00OTAsMTM3XSxbMTkxLDE1Ml0sWy0xNjcsMTg5XSxbNTc1LDExOV0sWzExMCwtMjIyXSxbNDAxLC0xMzRdXSxbWzM3MDEwLDk5Mzk4XSxbOTMyLDM1M10sWzk3NSwtMjddLFszNTQsMjE4XSxbOTgyLDU3XSxbMjIxOSwtNzRdLFsxNzM3LC00NjldLFstNTEzLC0yMjddLFstMTA2MiwtMjZdLFstMTQ5NiwtNThdLFsxNDAsLTEwNV0sWzk4NCw2NV0sWzgzNiwtMjA0XSxbNTQwLDE4MV0sWzIzMSwtMjEyXSxbLTMwNSwtMzQ0XSxbNzA3LDIyMF0sWzEzNDgsMjI5XSxbODMzLC0xMTRdLFsxNTYsLTI1M10sWy0xMTMyLC00MjBdLFstMTU3LC0xMzZdLFstODg4LC0xMDJdLFs2NDMsLTI4XSxbLTMyNCwtNDMxXSxbLTIyNCwtMzgzXSxbOSwtNjU4XSxbMzMzLC0zODZdLFstNDM0LC0yNF0sWy00NTcsLTE4N10sWzUxMywtMzEzXSxbNjUsLTUwMl0sWy0yOTcsLTU1XSxbMzYwLC01MDhdLFstNjE3LC00Ml0sWzMyMiwtMjQxXSxbLTkxLC0yMDhdLFstMzkxLC05MV0sWy0zODgsLTJdLFszNDgsLTQwMF0sWzQsLTI2M10sWy01NDksMjQ0XSxbLTE0MywtMTU4XSxbMzc1LC0xNDhdLFszNjQsLTM2MV0sWzEwNSwtNDc2XSxbLTQ5NSwtMTE0XSxbLTIxNCwyMjhdLFstMzQ0LDM0MF0sWzk1LC00MDFdLFstMzIyLC0zMTFdLFs3MzIsLTI1XSxbMzgzLC0zMl0sWy03NDUsLTUxNV0sWy03NTUsLTQ2Nl0sWy04MTMsLTIwNF0sWy0zMDYsLTJdLFstMjg4LC0yMjhdLFstMzg2LC02MjRdLFstNTk3LC00MTRdLFstMTkyLC0yNF0sWy0zNzAsLTE0NV0sWy0zOTksLTEzOF0sWy0yMzgsLTM2NV0sWy00LC00MTVdLFstMTQxLC0zODhdLFstNDUzLC00NzJdLFsxMTIsLTQ2Ml0sWy0xMjUsLTQ4OF0sWy0xNDIsLTU3N10sWy0zOTEsLTM2XSxbLTQxMCw0ODJdLFstNTU2LDNdLFstMjY5LDMyNF0sWy0xODYsNTc3XSxbLTQ4MSw3MzVdLFstMTQxLDM4NV0sWy0zOCw1MzBdLFstMzg0LDU0Nl0sWzEwMCw0MzVdLFstMTg2LDIwOF0sWzI3NSw2OTFdLFs0MTgsMjIwXSxbMTEwLDI0N10sWzU4LDQ2MV0sWy0zMTgsLTIwOV0sWy0xNTEsLTg4XSxbLTI0OSwtODRdLFstMzQxLDE5M10sWy0xOSw0MDFdLFsxMDksMzE0XSxbMjU4LDldLFs1NjcsLTE1N10sWy00NzgsMzc1XSxbLTI0OSwyMDJdLFstMjc2LC04M10sWy0yMzIsMTQ3XSxbMzEwLDU1MF0sWy0xNjksMjIwXSxbLTIyMCw0MDldLFstMzM1LDYyNl0sWy0zNTMsMjMwXSxbMywyNDddLFstNzQ1LDM0Nl0sWy01OTAsNDNdLFstNzQzLC0yNF0sWy02NzcsLTQ0XSxbLTMyMywxODhdLFstNDgyLDM3Ml0sWzcyOSwxODZdLFs1NTksMzFdLFstMTE4OCwxNTRdLFstNjI3LDI0MV0sWzM5LDIyOV0sWzEwNTEsMjg1XSxbMTAxOCwyODRdLFsxMDcsMjE0XSxbLTc1MCwyMTNdLFsyNDMsMjM1XSxbOTYxLDQxM10sWzQwNCw2M10sWy0xMTUsMjY1XSxbNjU4LDE1Nl0sWzg1NCw5M10sWzg1Myw1XSxbMzAzLC0xODRdLFs3MzcsMzI1XSxbNjYzLC0yMjFdLFszOTAsLTQ2XSxbNTc3LC0xOTJdLFstNjYwLDMxOF0sWzM4LDI1M11dLFtbNjkxNDgsMjE4NTFdLFsxNzksLTE4Nl0sWzI2MywtNzRdLFs5LC0xMTJdLFstNzcsLTI2OV0sWy00MjcsLTM4XSxbLTcsMzE0XSxbNDEsMjQ0XSxbMTksMTIxXV0sW1s4NDcxMyw0NTMyNl0sWzMyLDEzOV0sWzIzOSwxMzNdLFsxOTQsMjBdLFs4Nyw3NF0sWzEwNSwtNzRdLFstMTAyLC0xNjBdLFstMjg5LC0yNThdLFstMjMzLC0xNzBdXSxbWzU0NTQwLDMzNjk2XSxbMTMzLDI5Ml0sWzEwOSwtMTYyXSxbNDcsLTI1Ml0sWzEyNSwtNDNdLFsxNzUsLTExMl0sWzE0OSw0M10sWzI0OCwzMDJdLFswLDIxODJdXSxbWzU1NTI2LDM1OTQ2XSxbNzUsLTg4XSxbMTY1LC01NjJdLFstMjYsLTM2MF0sWzYyLC0yMDddLFsxOTksNjBdLFsxMzksMjY0XSxbMTMyLDE3N10sWzY4LDI4M10sWzEzNSwxMzddLFsxMTcsLTcxXSxbMTMzLC0xNjZdLFsyMjYsLTI5XSxbMTc4LDEzOF0sWzI4LDE4NF0sWzQ4LDI4M10sWzE1Miw0N10sWzgzLDIyMl0sWzkzLDM5M10sWzI0OSw0NDJdLFszOTMsNDM1XV0sW1s1ODE3NSwzNzUyOF0sWzExMywtN10sWzEzNCwtMTAwXSxbOTQsNzFdLFsxNDgsLTU5XV0sW1s1ODY2NCwzNzQzM10sWzEzMywtODMyXSxbNzIsLTQxOV0sWy00OSwtNjU5XSxbMjMsLTIxMl1dLFtbNTg4NDMsMzUzMTFdLFstMTQwLDEwOF0sWy04MCwtNDJdLFstMjYsLTE3Ml0sWy03NiwtMjIyXSxbMiwtMjA0XSxbMTY2LC0zMjBdLFsxNjMsNjNdLFs1NiwyNjNdXSxbWzU4OTA4LDM0Nzg1XSxbMjExLC01XV0sW1s1OTExOSwzNDc4MF0sWy03MCwtNDMwXSxbLTMyLC00OTFdLFstNzIsLTI2N10sWy0xOTAsLTI5OF0sWy01NCwtODZdLFstMTE4LC0zMDBdLFstNzcsLTMwM10sWy0xNTgsLTQyNF0sWy0zMTQsLTYwOV0sWy0xOTYsLTM1NV0sWy0yMTAsLTI2OV0sWy0yOTAsLTIyOV0sWy0xNDEsLTMxXSxbLTM2LC0xNjRdLFstMTY5LDg4XSxbLTEzOCwtMTEzXSxbLTMwMSwxMTRdLFstMTY4LC03Ml0sWy0xMTUsMzFdLFstMjg2LC0yMzNdLFstMjM4LC05NF0sWy0xNzEsLTIyM10sWy0xMjcsLTE0XSxbLTExNywyMTBdLFstOTQsMTFdLFstMTIwLDI2NF0sWy0xMywtODJdLFstMzcsMTU5XSxbMiwzNDZdLFstOTAsMzk2XSxbODksMTA4XSxbLTcsNDUzXSxbLTE4Miw1NTNdLFstMTM5LDUwMV0sWy0xLDFdLFstMTk5LDc2OF1dLFtbNTgwNDksMzM0NzJdLFstMTIxLDE4Ml0sWy0xMzAsLTEyMF0sWy0xNTEsLTIzMl0sWy0xNDgsLTM3NF0sWzIwOSwtNDU0XSxbOTksNTldLFs1MSwxODhdLFsxNTUsOTNdLFs0NywxOTJdLFs4NSwyODhdLFstOTYsMTc4XV0sW1syMzAxNiw2NTg2NF0sWy0xMDcsLTUxOF0sWy00OSwtNDI2XSxbLTIwLC03OTFdLFstMjcsLTI4OV0sWzQ4LC0zMjJdLFs4NiwtMjg4XSxbNTYsLTQ1OF0sWzE4NCwtNDQwXSxbNjUsLTMzN10sWzEwOSwtMjkxXSxbMjk1LC0xNTddLFsxMTQsLTI0N10sWzI0NCwxNjVdLFsyMTIsNjBdLFsyMDgsMTA2XSxbMTc1LDEwMV0sWzE3NiwyNDFdLFs2NywzNDVdLFsyMiw0OTZdLFs0OCwxNzNdLFsxODgsMTU1XSxbMjk0LDEzN10sWzI0NiwtMjFdLFsxNjksNTBdLFs2NiwtMTI1XSxbLTksLTI4NV0sWy0xNDksLTM1MV0sWy02NiwtMzYwXSxbNTEsLTEwM10sWy00MiwtMjU1XSxbLTY5LC00NjFdLFstNzEsMTUyXSxbLTU4LC0xMF1dLFtbMjU0NzIsNjE1MTBdLFstNTMsLThdLFstOTksLTM1N10sWy01MSw3MF0sWy0zMywtMjddLFsyLC04N11dLFtbMjUyMzgsNjExMDFdLFstMjU3LDddLFstMjU5LC0xXSxbLTEsLTMzM10sWy0xMjUsLTFdLFsxMDMsLTE5OF0sWzEwMywtMTM2XSxbMzEsLTEyOF0sWzQ1LC0zNl0sWy03LC0yMDFdLFstMzU3LC0yXSxbLTEzMywtNDgxXSxbMzksLTExMV0sWy0zMiwtMTM4XSxbLTcsLTE3Ml1dLFtbMjQzODEsNTkxNzBdLFstMzE0LDYzNl0sWy0xNDQsMTkxXSxbLTIyNiwxNTVdLFstMTU2LC00M10sWy0yMjMsLTIyM10sWy0xNDAsLTU4XSxbLTE5NiwxNTZdLFstMjA4LDExMl0sWy0yNjAsMjcxXSxbLTIwOCw4M10sWy0zMTQsMjc1XSxbLTIzMywyODJdLFstNzAsMTU4XSxbLTE1NSwzNV0sWy0yODQsMTg3XSxbLTExNiwyNzBdLFstMjk5LDMzNV0sWy0xMzksMzczXSxbLTY2LDI4OF0sWzkzLDU3XSxbLTI5LDE2OV0sWzY0LDE1M10sWzEsMjA0XSxbLTkzLDI2Nl0sWy0yNSwyMzVdLFstOTQsMjk4XSxbLTI0NCw1ODddLFstMjgwLDQ2Ml0sWy0xMzUsMzY4XSxbLTIzOCwyNDFdLFstNTEsMTQ1XSxbNDIsMzY1XSxbLTE0MiwxMzhdLFstMTY0LDI4N10sWy02OSw0MTJdLFstMTQ5LDQ4XSxbLTE2MiwzMTFdLFstMTMwLDI4OF0sWy0xMiwxODRdLFstMTQ5LDQ0Nl0sWy05OSw0NTJdLFs1LDIyN10sWy0yMDEsMjM0XSxbLTkzLC0yNV0sWy0xNTksMTYzXSxbLTQ0LC0yNDBdLFs0NiwtMjg0XSxbMjcsLTQ0NF0sWzk1LC0yNDNdLFsyMDYsLTQwN10sWzQ2LC0xMzldLFs0MiwtNDJdLFszNywtMjAzXSxbNDksOF0sWzU2LC0zODFdLFs4NSwtMTUwXSxbNTksLTIxMF0sWzE3NCwtMzAwXSxbOTIsLTU1MF0sWzgzLC0yNTldLFs3NywtMjc3XSxbMTUsLTMxMV0sWzEzNCwtMjBdLFsxMTIsLTI2OF0sWzEwMCwtMjY0XSxbLTYsLTEwNl0sWy0xMTcsLTIxN10sWy00OSwzXSxbLTc0LDM1OV0sWy0xODEsMzM3XSxbLTIwMSwyODZdLFstMTQyLDE1MF0sWzksNDMyXSxbLTQyLDMyMF0sWy0xMzIsMTgzXSxbLTE5MSwyNjRdLFstMzcsLTc2XSxbLTcwLDE1NF0sWy0xNzEsMTQzXSxbLTE2NCwzNDNdLFsyMCw0NF0sWzExNSwtMzNdLFsxMDMsMjIxXSxbMTAsMjY2XSxbLTIxNCw0MjJdLFstMTYzLDE2M10sWy0xMDIsMzY5XSxbLTEwMywzODhdLFstMTI5LDQ3Ml0sWy0xMTMsNTMxXV0sW1szMzk5MywzMjcyN10sWzE4MCw2M10sWzI3OSwtNDU3XSxbMTAzLDE4XSxbMjg2LC0zNzldLFsyMTgsLTMyN10sWzE2MCwtNDAyXSxbLTEyMiwtMjgwXSxbNzcsLTMzNF1dLFtbMzUxNzQsMzA2MjldLFstMTIxLC0zNzJdLFstMzEzLC0zMjhdLFstMjA1LDExOF0sWy0xNTEsLTYzXSxbLTI1NiwyNTNdLFstMTg5LC0xOV0sWy0xNjksMzI3XV0sW1szNDgyNiwzNTM3Ml0sWzU0LDM0MV0sWzM4LDM1MF0sWzAsMzI1XSxbLTEwMCwxMDddLFstMTA0LC05Nl0sWy0xMDMsMjZdLFstMzMsMjI4XSxbLTI2LDU0MV0sWy01MiwxNzddLFstMTg3LDE2MF0sWy0xMTQsLTExNl0sWy0yOTMsMTEzXSxbMTgsODAyXSxbLTgyLDMyOV1dLFtbMzM4NDIsMzg2NTldLFs4NywxMjJdLFstMjcsMzM3XSxbNzcsMjU5XSxbNDksNDY1XSxbLTY2LDM2N10sWy0xNTEsMTY2XSxbLTMwLDIzM10sWzQxLDM0Ml0sWy01MzMsMjRdLFstMTA3LDY4OF0sWzgxLDEwXSxbLTMsMjU1XSxbLTU1LDE3Ml0sWy0xMiwzNDJdLFstMTYxLDE3NV0sWy0xNzUsLTZdLFstMTE1LDE3Ml0sWy0xODgsMTE3XSxbLTEwOSwyMjBdLFstMzExLDk4XSxbLTMwMiw1MjldLFsyMywzOTZdLFstMzQsMjI3XSxbMjksNDQzXSxbLTM2MywtMTAwXSxbLTE0NywtMjIyXSxbLTI0MywtMjM5XSxbLTYyLC0xNzldLFstMTQzLC0xM10sWy0yMDYsNTBdXSxbWzMwNjg2LDQ0MTA5XSxbLTE1NywtMTAyXSxbLTEyNiw2OF0sWzE4LDg5OF0sWy0yMjgsLTM0OF0sWy0yNDUsMTVdLFstMTA1LDMxNV0sWy0xODQsMzRdLFs1OSwyNTRdLFstMTU1LDM1OV0sWy0xMTUsNTMyXSxbNzMsMTA4XSxbMCwyNTBdLFsxNjgsMTcxXSxbLTI4LDMxOV0sWzcxLDIwNl0sWzIwLDI3NV0sWzMxOCw0MDJdLFsyMjcsMTE0XSxbMzcsODldLFsyNTEsLTI4XV0sW1szMDU4NSw0ODA0MF0sWzEyNSwxNjIwXSxbNiwyNTZdLFstNDMsMzM5XSxbLTEyMywyMTVdLFsxLDQzMF0sWzE1Niw5N10sWzU2LC02MV0sWzksMjI2XSxbLTE2Miw2MV0sWy00LDM3MF0sWzU0MSwtMTNdLFs5MiwyMDNdLFs3NywtMTg3XSxbNTUsLTM0OV0sWzUyLDczXV0sW1szMTQyMyw1MTMyMF0sWzE1MywtMzEyXSxbMjE2LDM4XSxbNTQsMTgxXSxbMjA2LDEzOF0sWzExNSw5N10sWzMyLDI1MF0sWzE5OCwxNjhdLFstMTUsMTI0XSxbLTIzNSw1MV0sWy0zOSwzNzJdLFsxMiwzOTZdLFstMTI1LDE1M10sWzUyLDU1XSxbMjA2LC03Nl0sWzIyMSwtMTQ4XSxbODAsMTQwXSxbMjAwLDkyXSxbMzEwLDIyMV0sWzEwMiwyMjVdLFstMzcsMTY3XV0sW1szMzEyOSw1MzY1Ml0sWzE0NSwyNl0sWzY0LC0xMzZdLFstMzYsLTI1OV0sWzk2LC05MF0sWzYzLC0yNzRdLFstNzcsLTIwOV0sWy00NCwtNTAyXSxbNzEsLTI5OV0sWzIwLC0yNzRdLFsxNzEsLTI3N10sWzEzNywtMjldLFszMCwxMTZdLFs4OCwyNV0sWzEyNiwxMDRdLFs5MCwxNTddLFsxNTQsLTUwXSxbNjcsMjFdXSxbWzM0Mjk0LDUxNzAyXSxbMTUxLC00OF0sWzI1LDEyMF0sWy00NiwxMThdLFsyOCwxNzFdLFsxMTIsLTUzXSxbMTMxLDYxXSxbMTU5LC0xMjVdXSxbWzM0ODU0LDUxOTQ2XSxbMTIxLC0xMjJdLFs4NiwxNjBdLFs2MiwtMjVdLFszOCwtMTY2XSxbMTMzLDQyXSxbMTA3LDIyNF0sWzg1LDQzNl0sWzE2NCw1NDBdXSxbWzM1NjUwLDUzMDM1XSxbOTUsMjhdLFs2OSwtMzI3XSxbMTU1LC0xMDMzXSxbMTQ5LC05N10sWzcsLTQwOF0sWy0yMDgsLTQ4N10sWzg2LC0xNzhdLFs0OTEsLTkyXSxbMTAsLTU5M10sWzIxMSwzODhdLFszNDksLTIxMl0sWzQ2MiwtMzYxXSxbMTM1LC0zNDZdLFstNDUsLTMyN10sWzMyMywxODJdLFs1NDAsLTMxM10sWzQxNSwyM10sWzQxMSwtNDg5XSxbMzU1LC02NjJdLFsyMTQsLTE3MF0sWzIzNywtMjRdLFsxMDEsLTE4Nl0sWzk0LC03NTJdLFs0NiwtMzU4XSxbLTExMCwtOTc3XSxbLTE0MiwtMzg1XSxbLTM5MSwtODIyXSxbLTE3NywtNjY4XSxbLTIwNiwtNTEzXSxbLTY5LC0xMV0sWy03OCwtNDM1XSxbMjAsLTExMDddLFstNzcsLTkxMF0sWy0zMCwtMzkwXSxbLTg4LC0yMzNdLFstNDksLTc5MF0sWy0yODIsLTc3MV0sWy00NywtNjEwXSxbLTIyNSwtMjU2XSxbLTY1LC0zNTVdLFstMzAyLDJdLFstNDM3LC0yMjddLFstMTk1LC0yNjNdLFstMzExLC0xNzNdLFstMzI3LC00NzBdLFstMjM1LC01ODZdLFstNDEsLTQ0MV0sWzQ2LC0zMjZdLFstNTEsLTU5N10sWy02MywtMjg5XSxbLTE5NSwtMzI1XSxbLTMwOCwtMTA0MF0sWy0yNDQsLTQ2OF0sWy0xODksLTI3N10sWy0xMjcsLTU2Ml0sWy0xODMsLTMzN11dLFtbMzM4NDIsMzg2NTldLFstNCwxODJdLFstMjU5LDMwMl0sWy0yNTgsOV0sWy00ODQsLTE3Ml0sWy0xMzMsLTUyMF0sWy03LC0zMThdLFstMTEwLC03MDhdXSxbWzMwNjY5LDQwMTkzXSxbMTc1LDYzOF0sWy0xMTksNDk2XSxbNjMsMTk5XSxbLTQ5LDIxOV0sWzEwOCwyOTVdLFs2LDUwM10sWzEzLDQxNV0sWzYwLDIwMF0sWy0yNDAsOTUxXV0sW1szMDQ1MiwzOTczOV0sWy0yNzksMzQwXSxbLTI0LDI0Ml0sWy01NTEsNTkzXSxbLTQ5OCw2NDZdLFstMjE0LDM2NV0sWy0xMTUsNDg4XSxbNDYsMTcwXSxbLTIzNiw3NzVdLFstMjc0LDEwOTBdLFstMjYyLDExNzddLFstMTE0LDI2OV0sWy04Nyw0MzVdLFstMjE2LDM4Nl0sWy0xOTgsMjM5XSxbOTAsMjY0XSxbLTEzNCw1NjNdLFs4Niw0MTRdLFsyMjEsMzczXV0sW1syNzY5Myw0ODU2OF0sWzMzLC0yNDZdLFstNzksLTE0MV0sWzgsLTIxNl0sWzExNCw0N10sWzExMywtNjRdLFsxMTYsLTI5OF0sWzE1NywyNDNdLFs1MywzOThdLFsxNzAsNTE0XSxbMzM0LDIzM10sWzMwMyw2MTldLFs4NiwzODRdLFstMzgsNDQ5XV0sW1syOTA2Myw1MDQ5MF0sWzc0LDU2XSxbMTg0LC0yODBdLFs4OSwtMjc5XSxbMTI5LC0xNTJdLFsxNjMsLTYyMF0sWzIwNywtNzRdLFsxNTMsMTU3XSxbMTAxLC0xMDNdLFsxNjYsNTFdLFsyMTMsLTI3Nl0sWy0xNzksLTYwMl0sWzgzLC0xNF0sWzEzOSwtMzE0XV0sW1syOTA2Myw1MDQ5MF0sWy0xMTksMTQwXSxbLTEzNywxOTVdLFstNzksLTk0XSxbLTIzNSw4Ml0sWy02OCwyNTVdLFstNTIsLTEwXSxbLTI3OCwzMzhdXSxbWzI4MDk1LDUxMzk2XSxbLTM3LDE4M10sWzEwMyw0NF0sWy0xMiwyOTZdLFs2NSwyMTRdLFsxMzgsNDBdLFsxMTcsMzcxXSxbMTA2LDMxMF0sWy0xMDIsMTQxXSxbNTIsMzQzXSxbLTYyLDU0MF0sWzU5LDE1NV0sWy00NCw1MDBdLFstMTEyLDMxNV1dLFtbMjgzNjYsNTQ4NDhdLFszNiwyODddLFs4OSwtNDNdLFs1MiwxNzZdLFstNjQsMzQ4XSxbMzQsODZdXSxbWzI4NTEzLDU1NzAyXSxbMTQzLC0xOF0sWzIwOSw0MTJdLFsxMTQsNjNdLFszLDE5NV0sWzUxLDUwMF0sWzE1OSwyNzRdLFsxNzUsMTFdLFsyMiwxMjNdLFsyMTgsLTQ5XSxbMjE4LDI5OF0sWzEwOSwxMzJdLFsxMzQsMjg1XSxbOTgsLTM2XSxbNzMsLTE1Nl0sWy01NCwtMTk5XV0sW1szMDE4NSw1NzUzN10sWy0xNzgsLTk5XSxbLTcxLC0yOTVdLFstMTA3LC0xNjldLFstODEsLTIyMF0sWy0zNCwtNDIyXSxbLTc3LC0zNDVdLFsxNDQsLTQwXSxbMzUsLTI3MV0sWzYyLC0xMzBdLFsyMSwtMjM4XSxbLTMzLC0yMTldLFsxMCwtMTIzXSxbNjksLTQ5XSxbNjYsLTIwN10sWzM1Nyw1N10sWzE2MSwtNzVdLFsxOTYsLTUwOF0sWzExMiw2M10sWzIwMCwtMzJdLFsxNTgsNjhdLFs5OSwtMTAyXSxbLTUwLC0zMThdLFstNjIsLTE5OV0sWy0yMiwtNDIzXSxbNTYsLTM5M10sWzc5LC0xNzVdLFs5LC0xMzNdLFstMTQwLC0yOTRdLFsxMDAsLTEzMF0sWzc0LC0yMDddLFs4NSwtNTg5XV0sW1syODM2Niw1NDg0OF0sWy05MywxNzBdLFstNTksMzE5XSxbNjgsMTU4XSxbLTcwLDQwXSxbLTUyLDE5Nl0sWy0xMzgsMTY0XSxbLTEyMiwtMzhdLFstNTYsLTIwNV0sWy0xMTIsLTE0OV0sWy02MSwtMjBdLFstMjcsLTEyM10sWzEzMiwtMzIxXSxbLTc1LC03Nl0sWy00MCwtODddLFstMTMwLC0zMF0sWy00OCwzNTNdLFstMzYsLTEwMV0sWy05MiwzNV0sWy01NiwyMzhdLFstMTE0LDM5XSxbLTcyLDY5XSxbLTExOSwtMV0sWy04LC0xMjhdLFstMzIsODldXSxbWzI2OTU0LDU1NDM5XSxbMTQsMTE3XSxbMjMsMTIwXSxbLTEwLDEwN10sWzQxLDcwXSxbLTU4LDg4XSxbLTEsMjM4XSxbMTA3LDUzXV0sW1syNzA3MCw1NjIzMl0sWzEwMCwtMjEyXSxbLTYsLTEyNl0sWzExMSwtMjZdLFsyNiw0OF0sWzc3LC0xNDVdLFsxMzYsNDJdLFsxMTksMTUwXSxbMTY4LDExOV0sWzk1LDE3Nl0sWzE1MywtMzRdLFstMTAsLTU4XSxbMTU1LC0yMV0sWzEyNCwtMTAyXSxbOTAsLTE3N10sWzEwNSwtMTY0XV0sW1syNjk1NCw1NTQzOV0sWy0xNTEsMTMxXSxbLTU2LDEyNF0sWzMyLDEwM10sWy0xMSwxMzBdLFstNzcsMTQyXSxbLTEwOSwxMTZdLFstOTUsNzZdLFstMTksMTczXSxbLTczLDEwNV0sWzE4LC0xNzJdLFstNTUsLTE0MV0sWy02NCwxNjRdLFstODksNThdLFstMzgsMTIwXSxbMiwxNzldLFszNiwxODddLFstNzgsODNdLFs2NCwxMTRdXSxbWzI2MTkxLDU3MTMxXSxbNDIsNzZdLFsxODMsLTE1Nl0sWzYzLDc3XSxbODksLTUwXSxbNDYsLTEyMV0sWzgyLC00MF0sWzY2LDEyNl1dLFtbMjY3NjIsNTcwNDNdLFs3MCwtMzIxXSxbMTA4LC0yMzhdLFsxMzAsLTI1Ml1dLFtbMjYxOTEsNTcxMzFdLFstOTYsMTg2XSxbLTEzMCwyMzhdLFstNjEsMjAwXSxbLTExNywxODVdLFstMTQwLDI2N10sWzMxLDkxXSxbNDYsLTg4XSxbMjEsNDFdXSxbWzI1NzQ1LDU4MjUxXSxbODYsMjVdLFszNSwxMzVdLFs0MSw1XSxbLTYsMjkwXSxbNjUsMTRdLFs1OCwtNF0sWzYwLDE1OF0sWzgyLC0xMjBdLFsyOSw3NF0sWzUxLDcwXSxbOTcsMTYzXSxbNCwxMjFdLFsyNywtNV0sWzM2LDE0MV0sWzI5LDE3XSxbNDcsLTkwXSxbNTYsLTI3XSxbNjEsNzZdLFs3MCwwXSxbOTcsNzddLFszOCw4MV0sWzk1LC0xMl1dLFtbMjY5MDMsNTk0NDBdLFstMjQsLTU3XSxbLTE0LC0xMzJdLFsyOSwtMjE2XSxbLTY0LC0yMDJdLFstMzAsLTIzN10sWy05LC0yNjFdLFsxNSwtMTUyXSxbNywtMjY2XSxbLTQzLC01OF0sWy0yNiwtMjUzXSxbMTksLTE1Nl0sWy01NiwtMTUxXSxbMTIsLTE1OV0sWzQzLC05N11dLFtbMjU3NDUsNTgyNTFdLFstNDgsMTg1XSxbLTg0LDUxXV0sW1syNTYxMyw1ODQ4N10sWzE5LDIzN10sWy0zOCw2NF0sWy01Nyw0Ml0sWy0xMjIsLTcwXSxbLTEwLDc5XSxbLTg0LDk1XSxbLTYwLDExOF0sWy04Miw1MF1dLFtbMjUxNzksNTkxMDJdLFs1OCwxNTBdLFstMjIsMTE2XSxbMjAsMTEzXSxbMTMxLDE2Nl0sWzEyNywyMjVdXSxbWzI1NDkzLDU5ODcyXSxbMjksLTIzXSxbNjEsMTA0XSxbNzksOF0sWzI2LC00OF0sWzQzLDI5XSxbMTI5LC01M10sWzEyOCwxNV0sWzkwLDY2XSxbMzIsNjZdLFs4OSwtMzFdLFs2NiwtNDBdLFs3MywxNF0sWzU1LDUxXSxbMTI3LC04Ml0sWzQ0LC0xM10sWzg1LC0xMTBdLFs4MCwtMTMyXSxbMTAxLC05MV0sWzczLC0xNjJdXSxbWzI1NjEzLDU4NDg3XSxbLTMxLC0xMzldLFstMTYxLDldLFstMTAwLDU3XSxbLTExNSwxMTddLFstMTU0LDM3XSxbLTc5LDEyN11dLFtbMjQ5NzMsNTg2OTVdLFs5LDg2XSxbOTUsMTQ5XSxbNTIsNjZdLFstMTUsNjldLFs2NSwzN11dLFtbMjUyMzgsNjExMDFdLFstMiwtNDY4XSxbLTIyLC02NjddLFs4MywwXV0sW1syNTI5Nyw1OTk2Nl0sWzkwLC0xMDddLFsyNCw4OF0sWzgyLC03NV1dLFtbMjQ5NzMsNTg2OTVdLFstMTQyLDEwM10sWy0xNzQsMTFdLFstMTI3LDExN10sWy0xNDksMjQ0XV0sW1syNTQ3Miw2MTUxMF0sWzEsLTg3XSxbNTMsLTNdLFstNSwtMTYwXSxbLTQ1LC0yNTZdLFsyNCwtOTFdLFstMjksLTIxMl0sWzE4LC01Nl0sWy0zMiwtMjk5XSxbLTU1LC0xNTZdLFstNTAsLTE5XSxbLTU1LC0yMDVdXSxbWzMwMTg1LDU3NTM3XSxbLTgsLTEzOV0sWy0xNjMsLTY5XSxbOTEsLTI2OF0sWy0zLC0zMDldLFstMTIzLC0zNDRdLFsxMDUsLTQ2OF0sWzEyMCwzOF0sWzYyLDQyN10sWy04NiwyMDhdLFstMTQsNDQ3XSxbMzQ2LDI0MV0sWy0zOCwyNzhdLFs5NywxODZdLFsxMDAsLTQxNV0sWzE5NSwtOV0sWzE4MCwtMzMwXSxbMTEsLTE5NV0sWzI0OSwtNl0sWzI5Nyw2MV0sWzE1OSwtMjY0XSxbMjEzLC03NF0sWzE1NSwxODVdLFs0LDE0OV0sWzM0NCwzNV0sWzMzMyw5XSxbLTIzNiwtMTc1XSxbOTUsLTI3OV0sWzIyMiwtNDRdLFsyMTAsLTI5MV0sWzQ1LC00NzNdLFsxNDQsMTNdLFsxMDksLTEzOV1dLFtbMzM0MDAsNTU1MjNdLFstMjIwLC0zNDddLFstMjQsLTIxNV0sWzk1LC0yMjBdLFstNjksLTExMF0sWy0xNzEsLTk1XSxbNSwtMjczXSxbLTc1LC0xNjNdLFsxODgsLTQ0OF1dLFtbMzM0MDAsNTU1MjNdLFsxODMsLTIxN10sWzE3MSwtMzg1XSxbOCwtMzA0XSxbMTA1LC0xNF0sWzE0OSwtMjg5XSxbMTA5LC0yMDVdXSxbWzM0MTI1LDU0MTA5XSxbLTQ0LC01MzJdLFstMTY5LC0xNTRdLFsxNSwtMTM5XSxbLTUxLC0zMDVdLFsxMjMsLTQyOV0sWzg5LC0xXSxbMzcsLTMzM10sWzE2OSwtNTE0XV0sW1szNDEyNSw1NDEwOV0sWzMzMywtMTE5XSxbMzAsMTA3XSxbMjI1LDQzXSxbMjk4LC0xNTldXSxbWzM1MDExLDUzOTgxXSxbLTE0NCwtNTA4XSxbMjIsLTQwNF0sWzEwOSwtMzUxXSxbLTQ5LC0yNTRdLFstMjQsLTI3MF0sWy03MSwtMjQ4XV0sW1szNTAxMSw1Mzk4MV0sWzk1LC02NV0sWzIwNCwtMTQwXSxbMjk0LC00OTldLFs0NiwtMjQyXV0sW1s1MTcxOCw3OTgwNF0sWzEzMSwtMTU1XSxbNDAwLC0xMDldLFstMTQwLC00MDRdLFstMzUsLTQyMV1dLFtbNTIwNzQsNzg3MTVdLFstNzcsLTEwMV0sWy0xMjYsNTRdLFs5LC0xNTBdLFstMjAzLC0zMzJdLFstNSwtMjY3XSxbMTMzLDkyXSxbOTUsLTI1OV1dLFtbNTE5MDAsNzc3NTJdLFstMTEsLTE2N10sWzgyLC0yMjJdLFstOTcsLTE4MF0sWzcyLC00NTddLFsxNTEsLTc1XSxbLTMyLC0yNTZdXSxbWzUyMDY1LDc2Mzk1XSxbLTI1MiwtMzM0XSxbLTU0OCwxNjBdLFstNDA0LC0xOTJdLFstMzIsLTM1NV1dLFtbNTA4MjksNzU2NzRdLFstMzIyLC03N10sWy0zMTMsMjY3XSxbLTEwMSwtMTI3XSxbLTUxMSwyNjhdLFstMTExLDIzMF1dLFtbNDk0NzEsNzYyMzVdLFsxNDQsMzU0XSxbNTMsMTE3N10sWy0yODcsNjIwXSxbLTIwNSwyOTldLFstNDI0LDIyN10sWy0yOCw0MzFdLFszNjAsMTI5XSxbNDY2LC0xNTJdLFstODgsNjY5XSxbMjYzLC0yNTRdLFs2NDYsNDYxXSxbODQsNDg0XSxbMjQzLDExOV1dLFtbNTA2OTgsODA3OTldLFs0MCwtMjA3XSxbMTI5LC0xMF0sWzEyOSwtMjM3XSxbMTk0LC0yNzldLFsxNDMsNDZdLFsyNDMsLTI2OV1dLFtbNTE1NzYsNzk4NDNdLFs2MiwtNTJdLFs4MCwxM11dLFtbNTI0MjksNzU3NjVdLFsxNzksMjI2XSxbNDcsLTUwN10sWy05MiwtNDU2XSxbLTEyNiwxMjBdLFstNjQsMzk4XSxbNTYsMjE5XV0sW1syNzY5Myw0ODU2OF0sWzE0OCw0NDJdLFstNjAsMjU4XSxbLTEwNiwtMjc1XSxbLTE2NiwyNTldLFs1NiwxNjddLFstNDcsNTM2XSxbOTcsODldLFs1MiwzNjhdLFsxMDUsMzgxXSxbLTIwLDI0MV0sWzE1MywxMjZdLFsxOTAsMjM2XV0sW1szMTU4OCw2MTUxOV0sWzE0MiwtNTJdLFs1MCwtMTE4XSxbLTcxLC0xNDldLFstMjA5LDRdLFstMTYzLC0yMV0sWy0xNiwyNTNdLFs0MCw4Nl0sWzIyNywtM11dLFtbMjg0NTMsNjE1MDRdLFsxODcsLTUzXSxbMTQ3LC0xNDJdLFs0NiwtMTYxXSxbLTE5NSwtMTFdLFstODQsLTk5XSxbLTE1Niw5NV0sWy0xNTksMjE1XSxbMzQsMTM1XSxbMTE2LDQxXSxbNjQsLTIwXV0sW1syNzE0Nyw2NDI4MF0sWzI0MCwtNDJdLFsyMTksLTddLFsyNjEsLTIwMV0sWzExMCwtMjE2XSxbMjYwLDY2XSxbOTgsLTEzOF0sWzIzNSwtMzY2XSxbMTczLC0yNjddLFs5Miw4XSxbMTY1LC0xMjBdLFstMjAsLTE2N10sWzIwNSwtMjRdLFsyMTAsLTI0Ml0sWy0zMywtMTM4XSxbLTE4NSwtNzVdLFstMTg3LC0yOV0sWy0xOTEsNDZdLFstMzk4LC01N10sWzE4NiwzMjldLFstMTEzLDE1NF0sWy0xNzksMzldLFstOTYsMTcxXSxbLTY2LDMzNl0sWy0xNTcsLTIzXSxbLTI1OSwxNTldLFstODMsMTI0XSxbLTM2Miw5MV0sWy05NywxMTVdLFsxMDQsMTQ4XSxbLTI3MywzMF0sWy0xOTksLTMwN10sWy0xMTUsLThdLFstNDAsLTE0NF0sWy0xMzgsLTY1XSxbLTExOCw1Nl0sWzE0NiwxODNdLFs2MCwyMTNdLFsxMjYsMTMxXSxbMTQyLDExNl0sWzIxMCw1Nl0sWzY3LDY1XV0sW1s1ODE3NSwzNzUyOF0sWy0xNzcsMjY3XSxbLTIxNSw5MF0sWy04MiwzNzVdLFswLDIwOF0sWy0xMTksNjRdLFstMzE1LDY0OV0sWy04NywzNDJdLFstNTYsMTA1XSxbLTEwNyw0NzNdXSxbWzU3MDE3LDQwMTAxXSxbMzExLC02NV0sWzkwLC02OF0sWzk0LDEzXSxbMTU0LDM4M10sWzI0MSw0ODZdLFsxMDAsNDZdLFszMywyMDVdLFsxNTksMjM1XSxbMjEwLDgxXV0sW1s1ODQwOSw0MTQxN10sWzE4LC0yMjBdLFsyMzIsMTJdLFsxMjgsLTEyNV0sWzYwLC0xNDZdLFsxMzIsLTQzXSxbMTQ1LC0xOTBdLFswLC03NDhdLFstNTQsLTQwOV0sWy0xMiwtNDQyXSxbNDUsLTE3NV0sWy0zMSwtMzQ4XSxbLTQyLC01M10sWy03NCwtNDI2XSxbLTI5MiwtNjcxXV0sW1s1NTUyNiwzNTk0Nl0sWzAsMTcyNV0sWzI3NCwyMF0sWzgsMjEwNV0sWzIwNywxOV0sWzQyOCwyMDddLFsxMDYsLTI0M10sWzE3NywyMzFdLFs4NSwyXSxbMTU2LDEzM11dLFtbNTY5NjcsNDAxNDVdLFs1MCwtNDRdXSxbWzU0NTQwLDMzNjk2XSxbLTIwNyw0NDZdLFstMTA4LDQzMl0sWy02Miw1NzVdLFstNjgsNDI4XSxbLTkzLDkxMF0sWy03LDcwN10sWy0zNSwzMjJdLFstMTA4LDI0M10sWy0xNDQsNDg5XSxbLTE0Niw3MDhdLFstNjAsMzcxXSxbLTIyNiw1NzddLFstMTcsNDUzXV0sW1s1MzI1OSw0MDM1N10sWzEzNCwxMTNdLFsxNjYsMTAwXSxbMTgwLC0xN10sWzE2NiwtMjY3XSxbNDIsNDFdLFsxMTI2LDI2XSxbMTkyLC0yODRdLFs2NzMsLTgzXSxbNTEwLDI0MV1dLFtbNTY0NDgsNDAyMjddLFsyMjgsMTM0XSxbMTgwLC0zNF0sWzEwOSwtMTMzXSxbMiwtNDldXSxbWzQ1MzU3LDU4NjEyXSxbLTExNSw0NjBdLFstMTM4LDIxMF0sWzEyMiwxMTJdLFsxMzQsNDE1XSxbNjYsMzA0XV0sW1s0NTQyNiw2MDExM10sWzk2LDE4OV0sWzEzOCwtNTFdLFsxMzUsMTI5XSxbMTU1LDZdLFsxMzMsLTE3M10sWzE4NCwtMTU3XSxbMTY4LC00MzVdLFsxODQsLTQwNV1dLFtbNDY2MTksNTkyMTZdLFsxMywtMzY4XSxbNTQsLTMzOF0sWzEwNCwtMTY2XSxbMjQsLTIyOV0sWy0xMywtMTg0XV0sW1s0NjgwMSw1NzkzMV0sWy00MCwtMzNdLFstMTUxLDQ3XSxbLTIxLC02Nl0sWy02MSwtMTNdLFstMjAwLDE0NF0sWy0xMzQsNl1dLFtbNDYxOTQsNTgwMTZdLFstNTEzLDI1XSxbLTc1LC02N10sWy05MiwxOV0sWy0xNDcsLTk2XV0sW1s0NTM2Nyw1Nzg5N10sWy00Niw0NTNdXSxbWzQ1MzIxLDU4MzUwXSxbMjUzLC0xM10sWzY3LDgzXSxbNTAsNV0sWzEwMywxMzZdLFsxMTksLTEyNF0sWzEyMSwtMTFdLFsxMjAsMTMzXSxbLTU2LDE3MF0sWy05MiwtOTldLFstODYsM10sWy0xMTAsMTQ1XSxbLTg4LC05XSxbLTYzLC0xNDBdLFstMzAyLC0xN11dLFtbNDY2MTksNTkyMTZdLFs5MywxMDddLFs0NywzNDhdLFs4OCwxNF0sWzE5NCwtMTY1XSxbMTU3LDExN10sWzEwNywtMzldLFs0MiwxMzFdLFsxMTE0LDldLFs2Miw0MTRdLFstNDgsNzNdLFstMTM0LDI1NTBdLFstMTM0LDI1NTBdLFs0MjUsMTBdXSxbWzQ4NjMyLDY1MzM1XSxbOTM3LC0xMjg5XSxbOTM3LC0xMjg5XSxbNjYsLTI3N10sWzE3MywtMTY5XSxbMTI5LC05Nl0sWzMsLTM3Nl0sWzMwOCw1OF1dLFtbNTExODUsNjE4OTddLFsxLC0xMzYxXSxbLTE1MiwtMzk0XSxbLTI0LC0zNjRdLFstMjQ3LC05NF0sWy0zNzksLTUxXSxbLTEwMiwtMjEwXSxbLTE3OCwtMjNdXSxbWzUwMTA0LDU5NDAwXSxbLTE3OCwtM10sWy03MCwxMTRdLFstMTUzLC04NF0sWy0yNTksLTI0Nl0sWy01MywtMTg0XSxbLTIxNiwtMjY1XSxbLTM4LC0xNTJdLFstMTE2LC0xMjBdLFstMTM0LDc5XSxbLTc2LC0xNDRdLFstNDEsLTQwNV0sWy0yMjEsLTQ5MF0sWzcsLTIwMF0sWy03NiwtMjUwXSxbMTgsLTM0M11dLFtbNDg0OTgsNTY3MDddLFstMTE0LC04OF0sWy02NSwtNzRdLFstNDMsMjUzXSxbLTgwLC02N10sWy00OCwxMV0sWy01MSwtMTcyXSxbLTIxNSw1XSxbLTc3LDg5XSxbLTM2LC01NF1dLFtbNDc3NjksNTY2MTBdLFstODUsMTcwXSxbMTUsMTc2XSxbLTM1LDY5XSxbLTU5LC01OF0sWzExLDE5Ml0sWzU3LDE1Ml0sWy0xMTQsMjQ4XSxbLTMzLDE2M10sWy02MiwxMzBdLFstNTUsMTVdLFstNjcsLTgzXSxbLTkwLC03OV0sWy03NiwtMTI4XSxbLTExOSw0OF0sWy03NywxNTBdLFstNDYsMTldLFstNzMsLTc4XSxbLTQ0LC0xXSxbLTE2LDIxNl1dLFtbNDc1ODcsNjY3NjZdLFsxMDQ1LC0xNDMxXV0sW1s0NTQyNiw2MDExM10sWy0yNCwzMThdLFs3OCwyOTFdLFszNCw1NTddLFstMzAsNTgzXSxbLTM0LDI5NF0sWzI4LDI5NV0sWy03MiwyODFdLFstMTQ2LDI1NV1dLFtbNTA3NDcsNTQyNzhdLFstMjI5LC02OV1dLFtbNTA1MTgsNTQyMDldLFstNjksNDA3XSxbMTMsMTM1N10sWy01NiwxMjJdLFstMTEsMjkwXSxbLTk2LDIwN10sWy04NSwxNzRdLFszNSwzMTFdXSxbWzUwMjQ5LDU3MDc3XSxbOTYsNjddLFs1NiwyNThdLFsxMzYsNTZdLFs2MSwxNzZdXSxbWzUwNTk4LDU3NjM0XSxbOTMsMTczXSxbMTAwLDJdLFsyMTIsLTM0MF1dLFtbNTEwMDMsNTc0NjldLFstMTEsLTE5N10sWzYyLC0zNTBdLFstNTQsLTIzOF0sWzI5LC0xNTldLFstMTM1LC0zNjZdLFstODYsLTE4MV0sWy01MiwtMzcyXSxbNywtMzc2XSxbLTE2LC05NTJdXSxbWzU0MDI2LDU4MTc3XSxbLTc4LC0zNF0sWy05LC0xODhdXSxbWzUzOTM5LDU3OTU1XSxbLTUyLC0xM10sWy0xODgsNjQ3XSxbLTY1LDI0XSxbLTIxNywtMzMxXSxbLTIxNSwxNzNdLFstMTUwLDM0XSxbLTgwLC04M10sWy0xNjMsMThdLFstMTY0LC0yNTJdLFstMTQxLC0xNF0sWy0zMzcsMzA1XSxbLTEzMSwtMTQ1XSxbLTE0MiwxMF0sWy0xMDQsMjIzXSxbLTI3OSwyMjFdLFstMjk4LC03MF0sWy03MiwtMTI4XSxbLTM5LC0zNDBdLFstODAsLTIzOF0sWy0xOSwtNTI3XV0sW1s1MDU5OCw1NzYzNF0sWzYsNDA1XSxbLTMyMCwxMzRdLFstOSwyODZdLFstMTU2LDM4Nl0sWy0zNywyNjldLFsyMiwyODZdXSxbWzUxMTg1LDYxODk3XSxbMzkyLDI2M10sWzgwNCwxMTYxXSxbOTUyLDExMjZdXSxbWzUzMzMzLDY0NDQ3XSxbNDM5LC0yNTVdLFsxNTYsLTMyNF0sWzE5NywyMjBdXSxbWzUzOTM5LDU3OTU1XSxbMTEwLC0yMzVdLFstMzEsLTEwN10sWy0xNCwtMTk2XSxbLTIzNCwtNDU3XSxbLTc0LC0zNzddLFstMzksLTMwN10sWy01OSwtMTMyXSxbLTU2LC00MTRdLFstMTQ4LC0yNDNdLFstNDMsLTI5OV0sWy02MywtMjM4XSxbLTI2LC0yNDZdLFstMTkxLC0xOTldLFstMTU2LDI0M10sWy0xMDUsLTEwXSxbLTE2NSwtMzQ1XSxbLTgxLC02XSxbLTEzMiwtNTcwXSxbLTcxLC00MThdXSxbWzUyMzYxLDUzMzk5XSxbLTI4OSwtMjEzXSxbLTEwNSwzMV0sWy0xMDcsLTEzMl0sWy0yMjIsMTNdLFstMTQ5LDM3MF0sWy05MSw0MjddLFstMTk3LDM4OV0sWy0yMDksLTddLFstMjQ1LDFdXSxbWzU0MjQ0LDU0OTY1XSxbLTE0MCwtNTk5XSxbLTY3LC0xMDddLFstMjEsLTQ1OF0sWzI4LC0yNDldLFstMjMsLTE3Nl0sWzEzMiwtMzA5XSxbMjMsLTIxMl0sWzEwMywtMzA1XSxbMTI3LC0xOTBdLFsxMiwtMjY5XSxbMjksLTE3Ml1dLFtbNTQ0NDcsNTE5MTldLFstMjAsLTMxOV0sWy0yMjAsMTQwXSxbLTIyNSwxNTZdLFstMzUwLDIzXV0sW1s1MzYzMiw1MTkxOV0sWy0zNSwzMl0sWy0xNjQsLTc2XSxbLTE2OSw3OV0sWy0xMzIsLTM4XV0sW1s1MzEzMiw1MTkxNl0sWy00NTIsMTNdXSxbWzUyNjgwLDUxOTI5XSxbNDAsNDY2XSxbLTEwOCwzOTFdLFstMTI3LDEwMF0sWy01NiwyNjVdLFstNzIsODVdLFs0LDE2M11dLFtbNTA1MTgsNTQyMDldLFstMjI0LC0xMjZdXSxbWzUwMjk0LDU0MDgzXSxbLTYyLDIwN10sWy03NCwzNzVdLFstMjIsMjk0XSxbNjEsNTMyXSxbLTY5LDIxNV0sWy0yNyw0NjZdLFsxLDQyOV0sWy0xMTYsMzA1XSxbMjAsMTg0XV0sW1s1MDAwNiw1NzA5MF0sWzI0MywtMTNdXSxbWzUwMjk0LDU0MDgzXSxbLTQzNiwtMzQ2XSxbLTE1NCwtMjAzXSxbLTI1MCwtMTcxXSxbLTI0OCwxNjhdXSxbWzQ5MjA2LDUzNTMxXSxbMTMsMjMzXSxbLTEyMSw1MDldLFs3Myw2NjddLFsxMTcsNDk2XSxbLTc0LDg0MV1dLFtbNDkyMTQsNTYyNzddLFstMzgsNDQ0XSxbNywzMzZdLFs0ODIsMjddLFsxMjMsLTQzXSxbOTAsOTZdLFsxMjgsLTQ3XV0sW1s0ODQ5OCw1NjcwN10sWzEyNSwtMTI5XSxbNDksLTE5NV0sWzEyNSwtMTI1XSxbOTcsMTQ5XSxbMTMwLDIyXSxbMTkwLC0xNTJdXSxbWzQ5MjA2LDUzNTMxXSxbLTEyNiwtN10sWy0xOTQsMTE2XSxbLTE3OCwtN10sWy0zMjksLTEwM10sWy0xOTMsLTE3MF0sWy0yNzUsLTIxN10sWy01NCwxNV1dLFtbNDc4NTcsNTMxNThdLFsyMiw0ODddLFsyNiw3NF0sWy04LDIzM10sWy0xMTgsMjQ3XSxbLTg4LDQwXSxbLTgxLDE2Ml0sWzYwLDI2Ml0sWy0yOCwyODZdLFsxMywxNzJdXSxbWzQ3NjU1LDU1MTIxXSxbNDQsMF0sWzE3LDI1OF0sWy0yMiwxMTRdLFsyNyw4Ml0sWzEwMyw3MV0sWy02OSw0NzNdLFstNjQsMjQ1XSxbMjMsMjAwXSxbNTUsNDZdXSxbWzQ3NjU1LDU1MTIxXSxbLTc4LDE1XSxbLTU3LC0yMzhdLFstNzgsM10sWy01NSwxMjZdLFsxOSwyMzddLFstMTE2LDM2Ml0sWy03MywtNjddLFstNTksLTEzXV0sW1s0NzE1OCw1NTU0Nl0sWy03NywtMzRdLFszLDIxN10sWy00NCwxNTVdLFs5LDE3MV0sWy02MCwyNDldLFstNzgsMjExXSxbLTIyMiwxXSxbLTY1LC0xMTJdLFstNzYsLTEzXSxbLTQ4LC0xMjhdLFstMzIsLTE2M10sWy0xNDgsLTI2MF1dLFtbNDYzMjAsNTU4NDBdLFstMTIyLDM0OV0sWy0xMDgsMjMyXSxbLTcxLDc2XSxbLTY5LDExOF0sWy0zMiwyNjFdLFstNDEsMTMwXSxbLTgwLDk3XV0sW1s0NTc5Nyw1NzEwM10sWzEyMywyODhdLFs4NCwtMTFdLFs3Myw5OV0sWzYxLDFdLFs0NCw3OF0sWy0yNCwxOTZdLFszMSw2Ml0sWzUsMjAwXV0sW1s0NTc5Nyw1NzEwM10sWy0xNDksMjQ3XSxbLTExNywzOV0sWy02MywxNjZdLFsxLDkwXSxbLTg0LDEyNV0sWy0xOCwxMjddXSxbWzQ3ODU3LDUzMTU4XSxbLTczLC01XSxbLTI4NiwyODJdLFstMjUyLDQ0OV0sWy0yMzcsMzI0XSxbLTE4NywzODFdXSxbWzQ2ODIyLDU0NTg5XSxbNjYsMTg5XSxbMTUsMTcyXSxbMTI2LDMyMF0sWzEyOSwyNzZdXSxbWzQ2ODIyLDU0NTg5XSxbLTc1LDQ0XSxbLTIwMCwyMzhdLFstMTQ0LDMxNl0sWy00OSwyMTZdLFstMzQsNDM3XV0sW1s1NTEyNSw1MjY1MF0sWy0xNzgsMzNdLFstMTg4LDk5XSxbLTE2NiwtMzEzXSxbLTE0NiwtNTUwXV0sW1s1NjgyNCw1NTQ0Ml0sWzE1MiwtMjM5XSxbMiwtMTkyXSxbMTg3LC0zMDhdLFsxMTYsLTI1NV0sWzcwLC0zNTVdLFsyMDgsLTIzNF0sWzQ0LC0xODddXSxbWzUzNjA5LDQ3NzU1XSxbLTEwNCwyMDNdLFstODQsLTEwMF0sWy0xMTIsLTI1NV1dLFtbNTMzMDksNDc2MDNdLFstMjI4LDYyNl1dLFtbNTMwODEsNDgyMjldLFsyMTIsMzI2XSxbLTEwNSwzOTFdLFs5NSwxNDhdLFsxODcsNzNdLFsyMywyNjFdLFsxNDgsLTI4M10sWzI0NSwtMjVdLFs4NSwyNzldLFszNiwzOTNdLFstMzEsNDYxXSxbLTEzMSwzNTBdLFsxMjAsNjg0XSxbLTY5LDExN10sWy0yMDcsLTQ4XSxbLTc4LDMwNV0sWzIxLDI1OF1dLFtbNTMwODEsNDgyMjldLFstMjg1LDU5Nl0sWy0xODQsNDg4XSxbLTE2OSw2MTBdLFs5LDE5Nl0sWzYxLDE4OV0sWzY3LDQzMF0sWzU2LDQzOF1dLFtbNTI2MzYsNTExNzZdLFs5NCwzNV0sWzQwNCwtNl0sWy0yLDcxMV1dLFtbNTI2MzYsNTExNzZdLFstNTIsOTBdLFs5Niw2NjNdXSxbWzU5MDk5LDQ1MTI2XSxbMTMxLC0yNjRdLFs3MSwtNTAxXSxbLTQ3LC0xNjBdLFstNTYsLTQ3OV0sWzUzLC00OTBdLFstODcsLTIwNV0sWy04NSwtNTQ5XSxbMTQ3LC0xNTNdXSxbWzU5MjI2LDQyMzI1XSxbLTg0MywtNDg3XSxbMjYsLTQyMV1dLFtbNTY0NDgsNDAyMjddLFstMTgxLDM2OV0sWy0xODgsNDgzXSxbMTMsMTg4MF0sWzU3OSwtN10sWy0yNCwyMDNdLFs0MSwyMjJdLFstNDksMjc3XSxbMzIsMjg2XSxbLTI5LDE4NF1dLFtbNTk1OTksNDM3NzNdLFstNzcsLTQ0OV0sWzc3LC03NjhdLFs5Nyw5XSxbMTAwLC0xOTFdLFsxMTYsLTQyN10sWzI0LC03NjBdLFstMTIwLC0xMjRdLFstODUsLTQxMF0sWy0xODEsMzY1XSxbLTIxLDQxN10sWzU5LDI3NF0sWy0xNiwyMzddLFstMTEwLDE0OV0sWy03NywtNTRdLFstMTU5LDI4NF1dLFtbNjExOTgsNDQ0ODRdLFs0NSwtMjY1XSxbLTExLC01ODhdLFszNCwtNTE5XSxbMTEsLTkyM10sWzQ5LC0yOTBdLFstODMsLTQyMl0sWy0xMDgsLTQxMF0sWy0xNzcsLTM2Nl0sWy0yNTQsLTIyNV0sWy0zMTMsLTI4N10sWy0zMTMsLTYzNF0sWy0xMDcsLTEwOF0sWy0xOTQsLTQyMF0sWy0xMTUsLTEzNl0sWy0yMywtNDIxXSxbMTMyLC00NDhdLFs1NCwtMzQ2XSxbNCwtMTc3XSxbNDksMjldLFstOCwtNTc5XSxbLTQ1LC0yNzVdLFs2NSwtMTAxXSxbLTQxLC0yNDVdLFstMTE2LC0yMTFdLFstMjI5LC0xOTldLFstMzM0LC0zMjBdLFstMTIyLC0yMTldLFsyNCwtMjQ4XSxbNzEsLTQwXSxbLTI0LC0zMTFdXSxbWzU4OTA4LDM0Nzg1XSxbLTI0LDI2MV0sWy00MSwyNjVdXSxbWzUzMzgzLDQ3MTU5XSxbLTc0LDQ0NF1dLFtbNTMyNTksNDAzNTddLFstMjYsMzcyXSxbMzgsNTE5XSxbOTYsNTQxXSxbMTUsMjU0XSxbOTAsNTMyXSxbNjYsMjQzXSxbMTU5LDM4Nl0sWzkwLDI2M10sWzI5LDQzOF0sWy0xNSwzMzVdLFstODMsMjExXSxbLTc0LDM1OF0sWy02OCwzNTVdLFsxNSwxMjJdLFs4NSwyMzVdLFstODQsNTcwXSxbLTU3LDM5Nl0sWy0xMzksMzc0XSxbMjYsMTE1XV0sW1s1ODA2Miw0ODkwMl0sWzE2OSwtNDZdLFs4NSwzMzZdLFsxNDcsLTM4XV0sW1s1OTkyMiw2OTkwNV0sWy00OSwtMTg2XV0sW1s1OTg3Myw2OTcxOV0sWy0xMDAsODJdLFstNTgsLTM5NF0sWzY5LC02Nl0sWy03MSwtODFdLFstMTIsLTE1Nl0sWzEzMSw4MF1dLFtbNTk4MzIsNjkxODRdLFs3LC0yMzBdLFstMTM5LC05NDRdXSxbWzU5NzAwLDY4MDEwXSxbLTI3LDE1M10sWy0xNTUsODYyXV0sW1s1OTUxOCw2OTAyNV0sWzgwLDE5NF0sWy0xOSwzNF0sWzc0LDI3Nl0sWzU2LDQ0Nl0sWzQwLDE0OV0sWzgsNl1dLFtbNTk3NTcsNzAxMzBdLFs5MywtMV0sWzI1LDEwNF0sWzc1LDhdXSxbWzU5OTUwLDcwMjQxXSxbNCwtMjQyXSxbLTM4LC05MF0sWzYsLTRdXSxbWzU5NzU3LDcwMTMwXSxbOTksNDgyXSxbMTM4LDQxNl0sWzUsMjFdXSxbWzU5OTk5LDcxMDQ5XSxbMTI1LC0zMV0sWzQ1LC0yMzFdLFstMTUxLC0yMjNdLFstNjgsLTMyM11dLFtbNjM3NjEsNDMyMTJdLFs3NCwtMjUxXSxbNjksLTM5MF0sWzQ1LC03MTFdLFs3MiwtMjc2XSxbLTI4LC0yODRdLFstNDksLTE3NF0sWy05NCwzNDddLFstNTMsLTE3NV0sWzUzLC00MzhdLFstMjQsLTI1MF0sWy03NywtMTM3XSxbLTE4LC01MDBdLFstMTA5LC02ODldLFstMTM3LC04MTRdLFstMTcyLC0xMTIwXSxbLTEwNiwtODIxXSxbLTEyNSwtNjg1XSxbLTIyNiwtMTQwXSxbLTI0MywtMjUwXSxbLTE2MCwxNTFdLFstMjIwLDIxMV0sWy03NywzMTJdLFstMTgsNTI0XSxbLTk4LDQ3MV0sWy0yNiw0MjVdLFs1MCw0MjZdLFsxMjgsMTAyXSxbMSwxOTddLFsxMzMsNDQ3XSxbMjUsMzc3XSxbLTY1LDI4MF0sWy01MiwzNzJdLFstMjMsNTQ0XSxbOTcsMzMxXSxbMzgsMzc1XSxbMTM4LDIyXSxbMTU1LDEyMV0sWzEwMywxMDddLFsxMjIsN10sWzE1OCwzMzddLFsyMjksMzY0XSxbODMsMjk3XSxbLTM4LDI1M10sWzExOCwtNzFdLFsxNTMsNDEwXSxbNiwzNTZdLFs5MiwyNjRdLFs5NiwtMjU0XV0sW1s1OTg3Myw2OTcxOV0sWzAsLTM2Ml0sWy00MSwtMTczXV0sW1s0NTMyMSw1ODM1MF0sWzM2LDI2Ml1dLFtbNTI2MzMsNjg0ODZdLFstMTE4LDEwNjFdLFstMTcxLDIzOF0sWy0zLDE0M10sWy0yMjcsMzUyXSxbLTI0LDQ0NV0sWzE3MSwzMzBdLFs2NSw0ODddLFstNDQsNTYzXSxbNTcsMzAzXV0sW1s1MjMzOSw3MjQwOF0sWzMwMiwyMzldLFsxOTUsLTcxXSxbLTksLTI5OV0sWzIzNiwyMTddLFsyMCwtMTEzXSxbLTEzOSwtMjkwXSxbLTIsLTI3M10sWzk2LC0xNDddLFstMzYsLTUxMV0sWy0xODMsLTI5N10sWzUzLC0zMjJdLFsxNDMsLTEwXSxbNzAsLTI4MV0sWzEwNiwtOTJdXSxbWzUzMTkxLDcwMTU4XSxbLTE2LC00NTRdLFstMTM1LC0xNzBdLFstODYsLTE4OV0sWy0xOTEsLTIyOF0sWzMwLC0yNDRdLFstMjQsLTI1MF0sWy0xMzYsLTEzN11dLFtbNDc1OTIsNjY5MjBdLFstMiw3MDBdLFs0NDksNDM2XSxbMjc3LDkwXSxbMjI3LDE1OV0sWzEwNywyOTVdLFszMjQsMjM0XSxbMTIsNDM4XSxbMTYxLDUxXSxbMTI2LDIxOV0sWzM2Myw5OV0sWzUxLDIzMF0sWy03MywxMjVdLFstOTYsNjI0XSxbLTE3LDM1OV0sWy0xMDQsMzc5XV0sW1s0OTM5Nyw3MTM1OF0sWzI2NywzMjNdLFszMDAsMTAyXSxbMTc1LDI0NF0sWzI2OCwxODBdLFs0NzEsMTA1XSxbNDU5LDQ4XSxbMTQwLC04N10sWzI2MiwyMzJdLFsyOTcsNV0sWzExMywtMTM3XSxbMTkwLDM1XV0sW1s1MjYzMyw2ODQ4Nl0sWzkwLC01MjJdLFsxNSwtMjc0XSxbLTQ5LC00ODJdLFsyMSwtMjcwXSxbLTM2LC0zMjNdLFsyNCwtMzcxXSxbLTExMCwtMjQ3XSxbMTY0LC00MzFdLFsxMSwtMjUzXSxbOTksLTMzMF0sWzEzMCwxMDldLFsyMTksLTI3NV0sWzEyMiwtMzcwXV0sW1s1OTkyMiw2OTkwNV0sWzMwOSwtMjM0XSxbNTQ0LDYzMF1dLFtbNjA3NzUsNzAzMDFdLFsxMTIsLTcyMF1dLFtbNjA4ODcsNjk1ODFdLFstNTMsLTg5XSxbLTU1NiwtMjk2XSxbMjc3LC01OTFdLFstOTIsLTEwMV0sWy00NiwtMTk3XSxbLTIxMiwtODJdLFstNjYsLTIxM10sWy0xMjAsLTE4Ml0sWy0zMTAsOTRdXSxbWzU5NzA5LDY3OTI0XSxbLTksODZdXSxbWzY0MzI3LDY0OTA0XSxbNDksMjldLFsxMSwtMTYyXSxbMjE3LDkzXSxbMjMwLC0xNV0sWzE2OCwtMThdLFsxOTAsNDAwXSxbMjA3LDM3OV0sWzE3NiwzNjRdXSxbWzY1NTc1LDY1OTc0XSxbNTIsLTIwMl1dLFtbNjU2MjcsNjU3NzJdLFszOCwtNDY2XV0sW1s2NTY2NSw2NTMwNl0sWy0xNDIsLTNdLFstMjMsLTM4NF0sWzUwLC04Ml0sWy0xMjYsLTExN10sWy0xLC0yNDFdLFstODEsLTI0NV0sWy03LC0yMzhdXSxbWzY1MzM1LDYzOTk2XSxbLTU2LC0xMjVdLFstODM1LDI5OF0sWy0xMDYsNTk5XSxbLTExLDEzNl1dLFtbNjQxMTMsNjUyMDVdLFstMTgsNDMwXSxbNzUsMzEwXSxbNzYsNjRdLFs4NCwtMTg1XSxbNSwtMzQ2XSxbLTYxLC0zNDhdXSxbWzY0Mjc0LDY1MTMwXSxbLTc3LC00Ml0sWy04NCwxMTddXSxbWzYzMzI2LDY4MjkwXSxbNTgsLTI2MV0sWy0yNSwtMTM1XSxbODksLTQ0NV1dLFtbNjM0NDgsNjc0NDldLFstMTk2LC0xNl0sWy02OSwyODJdLFstMjQ4LDU3XV0sW1s2MjkzNSw2Nzc3Ml0sWzIwNCw1NjddLFsxODcsLTQ5XV0sW1s2MDc3NSw3MDMwMV0sWzYxNSw2MTRdLFsxMDUsNzE1XSxbLTI2LDQzMV0sWzE1MiwxNDZdLFsxNDIsMzY5XV0sW1s2MTc2Myw3MjU3Nl0sWzExOSw5Ml0sWzMyNCwtNzddLFs5NywtMTUwXSxbMTMzLDEwMF1dLFtbNjI0MzYsNzI1NDFdLFsxODAsLTcwNV0sWzE4MiwtMTc3XSxbMjEsLTM0NV0sWy0xMzksLTIwNF0sWy02NSwtNDYxXSxbMTkzLC01NjJdLFszNDAsLTMyNF0sWzE0MywtNDQ5XSxbLTQ2LC00MjhdLFs4OSwwXSxbMywtMzE0XSxbMTUzLC0zMTFdXSxbWzYzNDkwLDY4MjYxXSxbLTE2NCwyOV1dLFtbNjI5MzUsNjc3NzJdLFstNTE2LDQ3XSxbLTc4NCwxMTg4XSxbLTQxMyw0MTRdLFstMzM1LDE2MF1dLFtbNjU2NjUsNjUzMDZdLFsxMjUsLTQwNF0sWzE1NSwtMjE0XSxbMjAzLC03OF0sWzE2NSwtMTA3XSxbMTI1LC0zMzldLFs3NSwtMTk2XSxbMTAwLC03NV0sWy0xLC0xMzJdLFstMTAxLC0zNTJdLFstNDQsLTE2Nl0sWy0xMTcsLTE4OV0sWy0xMDQsLTQwNF0sWy0xMjYsMzFdLFstNTgsLTE0MV0sWy00NCwtMzAwXSxbMzQsLTM5NV0sWy0yNiwtNzJdLFstMTI4LDJdLFstMTc0LC0yMjFdLFstMjcsLTI4OF0sWy02MywtMTI1XSxbLTE3Myw1XSxbLTEwOSwtMTQ5XSxbMSwtMjM4XSxbLTEzNCwtMTY1XSxbLTE1Myw1Nl0sWy0xODYsLTE5OV0sWy0xMjgsLTM0XV0sW1s2NDc1Miw2MDQxN10sWy05MSw0MTNdLFstMjE3LDk3NV1dLFtbNjQ0NDQsNjE4MDVdLFs4MzMsNTkxXSxbMTg1LDExODJdLFstMTI3LDQxOF1dLFtbNjU1NzUsNjU5NzRdLFs4MCwyMDFdLFszNSwtNTFdLFstMjYsLTI0NF0sWy0zNywtMTA4XV0sW1s5NjQ0OCw0MTE5MF0sWzE3NSwtMzM5XSxbLTkyLC03OF0sWy05MywyNTldLFsxMCwxNThdXSxbWzk2MzMwLDQxMzIyXSxbLTM5LDE2M10sWy02LDQ1M10sWzEzMywtMTgyXSxbNDUsLTQ3Nl0sWy03NSw3NF0sWy01OCwtMzJdXSxbWzc4NDk1LDU3NzgwXSxbLTY2LDcxM10sWzE3OCw0OTJdLFszNTksMTEyXSxbMjYxLC04NF1dLFtbNzkyMjcsNTkwMTNdLFsyMjksLTIzMl0sWzEyNiw0MDddLFsyNDYsLTIxN11dLFtbNzk4MjgsNTg5NzFdLFs2NCwtMzk0XSxbLTM0LC03MDhdLFstNDY3LC00NTVdLFsxMjIsLTM1OF0sWy0yOTIsLTQzXSxbLTI0MCwtMjM4XV0sW1s3ODk4MSw1Njc3NV0sWy0yMzMsODddLFstMTEyLDMwN10sWy0xNDEsNjExXV0sW1s3ODQ5NSw1Nzc4MF0sWy0yNDksMjcxXSxbLTIzOCwtMTFdLFs0MSw0NjRdLFstMjQ1LC0zXSxbLTIyLC02NTBdLFstMTUwLC04NjNdLFstOTAsLTUyMl0sWzE5LC00MjhdLFsxODEsLTE4XSxbMTEzLC01MzldLFs1MCwtNTEyXSxbMTU1LC0zMzhdLFsxNjgsLTY5XSxbMTQ0LC0zMDZdXSxbWzc4MzcyLDU0MjU2XSxbLTkxLC0yNDNdLFstMTgzLC03MV0sWy0yMiwzMDRdLFstMjI3LDI1OF0sWy00OCwtMTA1XV0sW1s3NzgwMSw1NDM5OV0sWy0xMTAsMjI3XSxbLTQ3LDI5Ml0sWy0xNDgsMzM0XSxbLTEzNSwyODBdLFstNDUsLTM0N10sWy01MywzMjhdLFszMCwzNjldLFs4Miw1NjZdXSxbWzc3Mzc1LDU2NDQ4XSxbMTM1LDYwN10sWzE1Miw1NTFdLFstMTA4LDUzOV0sWzQsMjc0XSxbLTMyLDMzMF0sWy0xODUsNDcwXSxbLTY2LDI5Nl0sWzk2LDEwOV0sWzEwMSw1MTRdLFstMTEzLDM5MF0sWy0xNzcsNDMxXSxbLTEzNCw1MTldLFsxMTcsMTA3XSxbMTI3LDYzOV0sWzE5NiwyNl0sWzE2MiwyNTZdLFsxNTksMTM3XV0sW1s3NzgwOSw2MjY0M10sWzEyMCwtMTgyXSxbMTYsLTM1NV0sWzE4OCwtMjddLFstNjgsLTYyM10sWzYsLTUzMF0sWzI5MywzNTNdLFs4MywtMTA0XSxbMTYzLDE3XSxbNTYsMjA1XSxbMjEwLC00MF0sWzIxMSwtNDgwXSxbMTgsLTU4M10sWzIyNCwtNTE1XSxbLTEyLC01MDBdLFstOTAsLTI2Nl1dLFtbNzc4MDksNjI2NDNdLFs1OSwyMThdLFsyMzcsMzg0XV0sW1s3ODEwNSw2MzI0NV0sWzI1LC0xMzldLFsxNDgsLTE2XSxbLTQyLDY3Nl0sWzE0NCw4Nl1dLFtbNzgzODAsNjM4NTJdLFsxNjIsLTQ2Nl0sWzEyNSwtNTM3XSxbMzQyLC01XSxbMTA4LC01MTVdLFstMTc4LC0xNTVdLFstODAsLTIxMl0sWzMzMywtMzUzXSxbMjMxLC02OTldLFsxNzUsLTUyMF0sWzIxMCwtNDExXSxbNzAsLTQxOF0sWy01MCwtNTkwXV0sW1s3NzM3NSw1NjQ0OF0sWy0yNyw0MzldLFs4Niw0NTJdLFstOTQsMzUwXSxbMjMsNjQ0XSxbLTExMywzMDZdLFstOTAsNzA3XSxbLTUwLDc0Nl0sWy0xMjEsNDkwXSxbLTE4MywtMjk3XSxbLTMxNSwtNDIxXSxbLTE1Niw1M10sWy0xNzIsMTM4XSxbOTYsNzMyXSxbLTU4LDU1NF0sWy0yMTgsNjgxXSxbMzQsMjEzXSxbLTE2Myw3Nl0sWy0xOTcsNDgxXV0sW1s3NTY1Nyw2Mjc5Ml0sWy0xOCw0NzZdLFs5NywtOTBdLFs2LDQyNF1dLFtbNzU3NDIsNjM2MDJdLFsxMzcsMTQwXSxbLTMwLDI1MV0sWzYzLDIwMV0sWzExLDYxMl0sWzIxNywtMTM1XSxbMTI0LDQ4N10sWzE0LDI4OF0sWzE1Myw0OTZdLFstOCwzMzhdLFszNTksNDA4XSxbMTk5LC0xMDddLFstMjMsMzY0XSxbOTcsMTA4XSxbLTIwLDIyNF1dLFtbNzcwMzUsNjcyNzddLFsxNjIsNDRdLFs5MywtMzQ4XSxbMTIxLC0xNDFdLFs4LC00NTJdLFstMTEsLTQ4N10sWy0yNjMsLTQ5M10sWy0zMywtNzAxXSxbMjkzLDk4XSxbNjYsLTU0NF0sWzE3NiwtMTE1XSxbLTgxLC00OTBdLFsyMDYsLTIyMl0sWzEyMSwtMTA5XSxbMjAzLDE3Ml0sWzksLTI0NF1dLFtbNzgzODAsNjM4NTJdLFsxNDksMTQ1XSxbMjIxLC0zXSxbMjcxLDY4XSxbMjM2LDMxNV0sWzEzNCwtMjIyXSxbMjU0LC0xMDhdLFstNDQsLTM0MF0sWzEzMiwtMjQwXSxbMjgwLC0xNTRdXSxbWzgwMDEzLDYzMzEzXSxbLTM3MSwtNTA1XSxbLTIzMSwtNTU4XSxbLTYxLC00MTBdLFsyMTIsLTYyM10sWzI2MCwtNzcyXSxbMjUyLC0zNjVdLFsxNjksLTQ3NV0sWzEyNywtMTA5M10sWy0zNywtMTAzOV0sWy0yMzIsLTM4OV0sWy0zMTgsLTM4MV0sWy0yMjcsLTQ5Ml0sWy0zNDYsLTU1MF0sWy0xMDEsMzc4XSxbNzgsNDAxXSxbLTIwNiwzMzVdXSxbWzg2MzI3LDc1NTI0XSxbMCwwXV0sW1s4NjMyNyw3NTUyNF0sWy0xMDYsMzZdLFstMTIwLC0yMDBdLFstODMsLTIwMl0sWzEwLC00MjRdLFstMTQzLC0xMzBdLFstNTAsLTEwNV0sWy0xMDQsLTE3NF0sWy0xODUsLTk3XSxbLTEyMSwtMTU5XSxbLTksLTI1Nl0sWy0zMiwtNjVdLFsxMTEsLTk2XSxbMTU3LC0yNTldXSxbWzg1NjUyLDczMzkzXSxbLTQwLC0xNDNdLFstMTE4LC0zOV0sWy0xOTcsLTI5XSxbLTEwOCwtMjY2XSxbLTEyNCwyMV0sWy0xNywtNTRdXSxbWzg1MDQ4LDcyODgzXSxbLTEzNSwxMTJdLFstMzQsLTExMV0sWy04MSwtNDldLFstMTAsMTEyXSxbLTcyLDU0XSxbLTc1LDk0XSxbNzYsMjYwXSxbNjYsNjldLFstMjUsMTA4XSxbNzEsMzE5XSxbLTE4LDk2XSxbLTE2Myw2NV0sWy0xMzEsMTU4XV0sW1s4NDUxNyw3NDE3MF0sWzIyNywzNzldLFszMDYsMzE4XSxbMTkxLDQxOV0sWzEzMSwtMTg1XSxbMjQxLC0yMl0sWy00NCwzMTJdLFs0MjksMjU0XSxbMTExLDMzMV0sWzE3OSwtMzQ4XV0sW1s4NTY1Miw3MzM5M10sWzI0MCwtNjk3XSxbNjgsLTM4M10sWzMsLTY4MV0sWy0xMDUsLTMyNV0sWy0yNTIsLTExM10sWy0yMjIsLTI0NV0sWy0yNTAsLTUxXSxbLTMxLDMyMl0sWzUxLDQ0M10sWy0xMjIsNjE1XSxbMjA2LDk5XSxbLTE5MCw1MDZdXSxbWzgyNDEwLDgwMDU1XSxbLTEzNSwtNDQ2XSxbLTE5NywtNTkwXSxbNzIsLTI0MV0sWzE1Nyw3NF0sWzI3NCwtOTJdLFsyMTQsMjE5XSxbMjIzLC0xODldLFsyNTEsLTQxM10sWy0zMCwtMjEwXSxbLTIxOSw2Nl0sWy00MDQsLTc4XSxbLTE5NSwtMTY4XSxbLTIwNCwtMzkxXSxbLTQyMywtMjI5XSxbLTI3NywtMzEzXSxbLTI4NiwxMjBdLFstMTU2LDUzXSxbLTE0NiwtMzgxXSxbODksLTIyN10sWzQ1LC0xOTVdLFstMTk0LC0xOTldLFstMjAwLC0zMTZdLFstMzI0LC0yMDhdLFstNDE3LC0yMl0sWy00NDgsLTIwNV0sWy0zMjQsLTMxOF0sWy0xMjMsMTg0XSxbLTMzNiwtMV0sWy00MTEsMzU5XSxbLTI3NCw4OF0sWy0zNjksLTgyXSxbLTU3NCwxMzNdLFstMzA2LC0xNF0sWy0xNjMsMzUxXSxbLTEyNyw1NDRdLFstMTcxLDY2XSxbLTMzNiwzNjhdLFstMzc0LDgzXSxbLTMzMCwxMDFdLFstMTAwLDI1Nl0sWzEwNyw2OTBdLFstMTkyLDQ3Nl0sWy0zOTYsMjIyXSxbLTIzMywzMTNdLFstNzMsNDEzXV0sW1s3NTc0Miw2MzYwMl0sWy0xNDcsOTM3XSxbLTc2LC0yXSxbLTQ2LC0zNzddLFstMTUyLDMwNl0sWzg2LDMzNl0sWzEyNCwzNF0sWzEyOCw1MDBdLFstMTYwLDEwMV0sWy0yNTcsLThdLFstMjY1LDgxXSxbLTI0LDQxMF0sWy0xMzMsMzBdLFstMjIwLDI1NV0sWy05OCwtNDAxXSxbMjAwLC0zMTNdLFstMTczLC0yMjBdLFstNjIsLTIxNV0sWzE3MSwtMTU5XSxbLTQ3LC0zNTZdLFs5NiwtNDQ0XSxbNDMsLTQ4Nl1dLFtbNzQ3MzAsNjM2MTFdLFstMzksLTIxNl0sWy0xODksN10sWy0zNDMsLTEyMl0sWzE2LC00NDVdLFstMTQ4LC0zNDldLFstNDAwLC0zOThdLFstMzExLC02OTVdLFstMjA5LC0zNzNdLFstMjc2LC0zODddLFstMSwtMjcxXSxbLTEzOCwtMTQ2XSxbLTI1MSwtMjEyXSxbLTEyOSwtMzFdLFstODQsLTQ1MF0sWzU4LC03NjldLFsxNSwtNDkwXSxbLTExOCwtNTYxXSxbLTEsLTEwMDRdLFstMTQ0LC0yOV0sWy0xMjYsLTQ1MF0sWzg0LC0xOTVdLFstMjUzLC0xNjhdLFstOTMsLTQwMV0sWy0xMTIsLTE3MF0sWy0yNjMsNTUyXSxbLTEyOCw4MjddLFstMTA3LDU5Nl0sWy05NywyNzldLFstMTQ4LDU2OF0sWy02OSw3MzldLFstNDgsMzY5XSxbLTI1Myw4MTFdLFstMTE1LDExNDVdLFstODMsNzU2XSxbMSw3MTZdLFstNTQsNTUzXSxbLTQwNCwtMzUzXSxbLTE5Niw3MF0sWy0zNjIsNzE2XSxbMTMzLDIxNF0sWy04MiwyMzJdLFstMzI2LDUwMV1dLFtbNjg5MzcsNjQ1NzddLFsxODUsMzk1XSxbNjEyLC0yXSxbLTU2LDUwN10sWy0xNTYsMzAwXSxbLTMxLDQ1NV0sWy0xODIsMjY1XSxbMzA2LDYxOV0sWzMyMywtNDVdLFsyOTAsNjIwXSxbMTc0LDU5OV0sWzI3MCw1OTNdLFstNCw0MjFdLFsyMzYsMzQyXSxbLTIyNCwyOTJdLFstOTYsNDAwXSxbLTk5LDUxN10sWzEzNywyNTVdLFs0MjEsLTE0NF0sWzMxMCw4OF0sWzI2OCw0OTZdXSxbWzcxNjIxLDcxNTUwXSxbMjk4LC02OTJdLFstMjgsLTQ4Ml0sWzExMSwtMzAzXSxbLTksLTMwMV0sWy0yMDAsNzldLFs3OCwtNjUxXSxbMjczLC0zNzRdLFszODYsLTQxM11dLFtbNzI1MzAsNjg0MTNdLFstMTc2LC0yNjhdLFstMTA4LC01NTNdLFsyNjksLTIyNF0sWzI2MiwtMjg5XSxbMzYyLC0zMzJdLFszODEsLTc2XSxbMTYwLC0zMDFdLFsyMTUsLTU2XSxbMzM0LC0xMzhdLFsyMzEsMTBdLFszMiwyMzRdLFstMzYsMzc1XSxbMjEsMjU1XV0sW1s3NDQ3Nyw2NzA1MF0sWzE3MCwxMjRdLFsyMywtNDY1XV0sW1s3NDY3MCw2NjcwOV0sWzYsLTExOV0sWzI1MiwtMjI0XSxbMTc1LDkyXSxbMjM0LC0zOV0sWzIyNywxN10sWzIwLDM2M10sWy0xMTMsMTg5XV0sW1s3NTQ3MSw2Njk4OF0sWzIyNCw3NF0sWzI1Miw0MzldLFszMjEsMzc2XSxbMjMzLC0xNDVdLFsxOTgsMjQ5XSxbMTMwLC0zNjddLFstOTQsLTI0OF0sWzMwMCwtODldXSxbWzc1NjU3LDYyNzkyXSxbLTc5LDMwOF0sWy0xNiwzMDFdLFstNTMsMjg1XSxbLTExNiwzNDRdLFstMjU2LDIzXSxbMjUsLTI0M10sWy04NywtMzI5XSxbLTExOCwxMjBdLFstNDEsLTEwOF0sWy03OCw2NV0sWy0xMDgsNTNdXSxbWzc0NjcwLDY2NzA5XSxbMTg0LDQzOV0sWzE1MCwxNTBdLFsxOTgsLTEzN10sWzE0NywtMTRdLFsxMjIsLTE1OV1dLFtbNzI1MzAsNjg0MTNdLFsxMTUsMTQxXSxbMjIzLC0xODJdLFsyODAsLTM4NV0sWzE1NywtODRdLFs5MywtMjg0XSxbMjE2LC0xMTddLFsyMjUsLTI1OV0sWzMxNCwtMTM2XSxbMzI0LC01N11dLFtbNjg5MzcsNjQ1NzddLFstMjAzLDE1MF0sWy04Myw0MjRdLFstMjE1LDQ1MF0sWy01MTIsLTExMV0sWy00NTEsLTExXSxbLTM5MSwtODNdXSxbWzY3MDgyLDY1Mzk2XSxbMTA1LDY4N10sWzQwMCwzMDVdLFstMjMsMjcyXSxbLTEzMyw5Nl0sWy03LDUyMF0sWy0yNjYsMjYwXSxbLTExMiwzNTddLFstMTM3LDMxMF1dLFtbNjY5MDksNjgyMDNdLFs0NjUsLTMwMV0sWzI3OCw4OF0sWzE2NiwtNzVdLFs1NiwxMjldLFsxOTQsLTUyXSxbMzYxLDI0Nl0sWzEwLDUwM10sWzE1NCwzMzRdLFsyMDcsLTFdLFszMSwxNjZdLFsyMTIsNzddLFsxMDMsLTU1XSxbMTA4LDE2Nl0sWy0xNSwzNTVdLFsxMTgsMzU2XSxbMTc3LDE1MF0sWy0xMTAsMzkwXSxbMjY1LC0xOF0sWzc2LDIxM10sWy0xMiwyMjddLFsxMzksMjQ4XSxbLTMyLDI5NF0sWy02NiwyNTBdLFsxNjMsMjU4XSxbMjk4LDEyNF0sWzMxOSw2OF0sWzE0MSwxMDldLFsxNjIsNjddXSxbWzcwODc3LDcyNTE5XSxbMjA1LC0yNzZdLFs4MiwtNDU0XSxbNDU3LC0yMzldXSxbWzY4ODQxLDcyNTI2XSxbODUsLTcyXSxbMjAxLDE4OV0sWzkzLC0xMTRdLFs5MCwyNzFdLFsxNjYsLTEyXSxbNDMsODZdLFsyOSwyMzldLFsxMjAsMjA1XSxbMTUwLC0xMzRdLFstMzAsLTE4MV0sWzg0LC0yOF0sWy0yNiwtNDk2XSxbMTEwLC0xOTRdLFs5NywxMjVdLFsxMjMsNThdLFsxNzMsMjY1XSxbMTkyLC00NF0sWzI4NiwtMV1dLFtbNzA4MjcsNzI2ODhdLFs1MCwtMTY5XV0sW1s2NjkwOSw2ODIwM10sWzI1Miw1MzZdLFstMjMsMzgwXSxbLTIxMCwxMDBdLFstMjIsMzc1XSxbLTkxLDQ3Ml0sWzExOSwzMjNdLFstMTIxLDg3XSxbNzYsNDMwXSxbMTEzLDczNl1dLFtbNjcwMDIsNzE2NDJdLFsyODQsLTIyNF0sWzIwOSw3OV0sWzU4LDI2OF0sWzIxOSw4OV0sWzE1NywxODBdLFs1NSw0NzJdLFsyMzQsMTE0XSxbNDQsMjExXSxbMTMxLC0xNThdLFs4NCwtMTldXSxbWzY5NzI1LDc0MzU3XSxbLTEwMSwtMTgyXSxbLTMwMyw5OF0sWy0yNiwtMzQwXSxbMzAxLDQ2XSxbMzQzLC0xOTJdLFs1MjYsODldXSxbWzcwNDY1LDczODc2XSxbNzAsLTU0Nl0sWzkxLDU5XSxbMTY5LC0xMzRdLFstMTAsLTIzMF0sWzQyLC0zMzddXSxbWzcyMjk0LDc1NjAxXSxbLTM5LC0xMzRdLFstNDM4LC0zMjBdLFstOTksLTIzNF0sWy0zNTYsLTcwXSxbLTEwNSwtMzc4XSxbLTI5NCw4MF0sWy0xOTIsLTExNl0sWy0yNjYsLTI3OV0sWzM5LC0xMzhdLFstNzksLTEzNl1dLFtbNjcwMDIsNzE2NDJdLFstMjQsNDk4XSxbLTIwNywyMV0sWy0zMTgsNTIzXSxbLTIyMSw2NV0sWy0zMDgsMjk5XSxbLTE5Nyw1NV0sWy0xMjIsLTExMF0sWy0xODYsMTddLFstMTk3LC0zMzhdLFstMjQ0LC0xMTRdXSxbWzY0OTc4LDcyNTU4XSxbLTUyLDQxN10sWzQwLDYxOF0sWy0yMTYsMjAwXSxbNzEsNDA1XSxbLTE4NCwzNF0sWzYxLDQ5OF0sWzI2MiwtMTQ1XSxbMjQ0LDE4OV0sWy0yMDIsMzU1XSxbLTgwLDMzOF0sWy0yMjQsLTE1MV0sWy0yOCwtNDMzXSxbLTg3LDM4M11dLFtbNjI0MzYsNzI1NDFdLFstMTUyLDQ3M10sWzU1LDE4M10sWy04Nyw2NzhdLFsxOTAsMTY4XV0sW1s2MjQ0Miw3NDA0M10sWzQ0LC0yMjNdLFsxNDEsLTI3M10sWzE5MCwtNzhdXSxbWzYyODE3LDczNDY5XSxbMTAxLDE3XV0sW1s2MjkxOCw3MzQ4Nl0sWzMyNyw0MzZdLFsxMDQsNDRdLFs4MiwtMTc0XSxbLTk1LC0yOTJdLFsxNzMsLTMwOV0sWzY5LDI5XV0sW1s2MzU3OCw3MzIyMF0sWzg4LC00MzZdLFsyNjMsLTEyM10sWzE5MywtMjk2XSxbMzk1LC0xMDJdLFs0MzQsMTU2XSxbMjcsMTM5XV0sW1s2NzA4Miw2NTM5Nl0sWy01MjMsMTc5XSxbLTMwMywxMzZdLFstMzEzLDc2XSxbLTExOCw3MjVdLFstMTMzLDEwNV0sWy0yMTQsLTEwNl0sWy0yODAsLTI4Nl0sWy0zMzksMTk2XSxbLTI4MSw0NTRdLFstMjY3LDE2OF0sWy0xODYsNTYxXSxbLTIwNSw3ODhdLFstMTQ5LC05Nl0sWy0xNzcsMTk2XSxbLTEwNCwtMjMxXV0sW1s1OTk5OSw3MTA0OV0sWy0yNiw0NTJdLFs2OCwyNDNdXSxbWzYwMDQxLDcxNzQ0XSxbNzQsMTI5XSxbNzUsMTMwXSxbMTUsMzI5XSxbOTEsLTExNV0sWzMwNiwxNjVdLFsxNDcsLTExMl0sWzIyOSwyXSxbMzIwLDIyMl0sWzE0OSwtMTBdLFszMTYsOTJdXSxbWzYyODE3LDczNDY5XSxbLTExMywzNDJdLFsxLDkxXSxbLTEyMywtMl0sWy04MiwxNTldLFstNTgsLTE2XV0sW1s2MjQ0Miw3NDA0M10sWy0xMDksMTcyXSxbLTIwNywxNDddLFsyNywyODhdLFstNDcsMjA4XV0sW1s2MjEwNiw3NDg1OF0sWzM4Niw5Ml1dLFtbNjI0OTIsNzQ5NTBdLFs1NywtMTU1XSxbMTA2LC0xMDNdLFstNTYsLTE0OF0sWzE0OCwtMjAyXSxbLTc4LC0xODldLFsxMTgsLTE2MF0sWzEyNCwtOTddLFs3LC00MTBdXSxbWzU1NzM0LDkxNDA5XSxbMzcxLC0yODldLFs0MzMsLTQwMl0sWzgsLTkxMF0sWzkzLC0yMzBdXSxbWzU2NjM5LDg5NTc4XSxbLTQ3OCwtMTY3XSxbLTI2OSwtNDEzXSxbNDMsLTM2MV0sWy00NDEsLTQ3NV0sWy01MzcsLTUwOV0sWy0yMDIsLTgzMl0sWzE5OCwtNDE2XSxbMjY1LC0zMjhdLFstMjU1LC02NjZdLFstMjg5LC0xMzhdLFstMTA2LC05OTJdLFstMTU3LC01NTRdLFstMzM3LDU3XSxbLTE1OCwtNDY4XSxbLTMyMSwtMjddLFstODksNTU4XSxbLTIzMiw2NzFdLFstMjExLDgzNV1dLFtbNTg4MjksODEzNjJdLFstMjM5LC0zNV0sWy04NSwtMTI5XSxbLTE4LC0yOThdLFstMTExLDU3XSxbLTI1MCwtMjhdLFstNzMsMTM4XSxbLTEwNCwtMTAzXSxbLTEwNSw4Nl0sWy0yMTgsMTJdLFstMzEwLDE0MV0sWy0yODEsNDddLFstMjE1LC0xNF0sWy0xNTIsLTE2MF0sWy0xMzMsLTIzXV0sW1s1NjUzNSw4MTA1M10sWy02LDI2M10sWy04NSwyNzRdLFsxNjYsMTIxXSxbMiwyMzVdLFstNzcsMjI1XSxbLTEyLDI2MV1dLFtbNTY1MjMsODI0MzJdLFsyNjgsLTRdLFszMDIsMjIzXSxbNjQsMzMzXSxbMjI4LDE5MF0sWy0yNiwyNjRdXSxbWzU3MzU5LDgzNDM4XSxbMTY5LDEwMF0sWzI5OCwyMjhdXSxbWzYwNjE3LDc4NDA5XSxbLTIyMiwtNDhdLFstMTg1LC0xOTFdLFstMjYwLC0zMV0sWy0yMzksLTIyMF0sWzE0LC0zMTddXSxbWzU5Mjg3LDc3NzQxXSxbLTM4LDY0XSxbLTQzMiwxNDldLFstMTksMjIxXSxbLTI1NywtNzNdLFstMTAzLC0zMjVdLFstMjE1LC00MzddXSxbWzU4MjIzLDc3MzQwXSxbLTEyNiwxMDFdLFstMTMxLC05NV0sWy0xMjQsMTA5XV0sW1s1Nzg0Miw3NzQ1NV0sWzcwLDY0XSxbNDksMjAzXSxbNzYsMTg4XSxbLTIwLDEwNl0sWzU4LDQ3XSxbMjcsLTgxXSxbMTY0LC0xOF0sWzc0LDQ0XSxbLTUyLDYwXSxbMTksODhdLFstOTcsMTUwXSxbLTQwLDI0N10sWy0xMDEsOTddLFsyMCwyMDBdLFstMTI1LDE1OV0sWy0xMTUsMjJdLFstMjA0LDE4NF0sWy0xODUsLTU4XSxbLTY2LC04N11dLFtbNTczOTQsNzkwNzBdLFstMTE4LDBdLFstNjksLTEzOV0sWy0yMDUsLTU2XSxbLTk1LC05MV0sWy0xMjksMTQ0XSxbLTE3OCwzXSxbLTE3Miw2NV0sWy0xMjAsLTEyN11dLFtbNTYzMDgsNzg4NjldLFstMTksMTU5XSxbLTE1NSwxNjFdXSxbWzU2MTM0LDc5MTg5XSxbNTUsMjM4XSxbNzcsMTU0XV0sW1s1NjI2Niw3OTU4MV0sWzYwLC0zNV0sWy03MSwyNjZdLFsyNTIsNDkxXSxbMTM4LDY5XSxbMjksMTY2XSxbLTEzOSw1MTVdXSxbWzU2MjY2LDc5NTgxXSxbLTI2NCwyMjddLFstMjAwLC04NF0sWy0xMzEsNjFdLFstMTY1LC0xMjddLFstMTQwLDIxMF0sWy0xMTQsLTgxXSxbLTE2LDM2XV0sW1s1NTIzNiw3OTgyM10sWy0xMjcsMjkxXSxbLTIwNywzNl0sWy0yNiwxODVdLFstMTkxLDY2XSxbLTQxLC0xNTNdLFstMTUxLDEyMl0sWzE3LDE2M10sWy0yMDcsNTFdLFstMTMyLDE5MV1dLFtbNTQxNzEsODA3NzVdLFstMTE0LDM3N10sWzIyLDIwNF0sWy02OSwzMTZdLFstMTAxLDIxMF0sWzc3LDE1OF0sWy02NCwzMDBdXSxbWzUzOTIyLDgyMzQwXSxbMTg5LDE3NF0sWzQzNCwyNzNdLFszNTAsMjAwXSxbMjc3LC0xMDBdLFsyMSwtMTQ0XSxbMjY4LC03XV0sW1s1NjMxNCw4MjY3OF0sWzE0MiwtNjRdLFs2NywtMTgyXV0sW1s1NDcxNiw3OTAxMl0sWy0yMSwtMjQxXSxbLTE1NiwtMl0sWzUzLC0xMjhdLFstOTIsLTM4MF1dLFtbNTQ1MDAsNzgyNjFdLFstNTMsLTEwMF0sWy0yNDMsLTE0XSxbLTE0MCwtMTM0XSxbLTIyOSw0NV1dLFtbNTM4MzUsNzgwNThdLFstMzk4LDE1M10sWy02MiwyMDVdLFstMjc0LC0xMDJdLFstMzIsLTExM10sWy0xNjksODRdXSxbWzUyOTAwLDc4Mjg1XSxbLTE0MiwxNl0sWy0xMjUsMTA4XSxbNDIsMTQ1XSxbLTEwLDEwNF1dLFtbNTI2NjUsNzg2NThdLFs4MywzM10sWzE0MSwtMTY0XSxbMzksMTU2XSxbMjQ1LC0yNV0sWzE5OSwxMDZdLFsxMzMsLTE4XSxbODcsLTEyMV0sWzI2LDEwMF0sWy00MCwzODVdLFsxMDAsNzVdLFs5OCwyNzJdXSxbWzUzNzc2LDc5NDU3XSxbMjA2LC0xOTBdLFsxNTcsMjQyXSxbOTgsNDRdLFsyMTUsLTE4MF0sWzEzMSwzMF0sWzEyOCwtMTExXV0sW1s1NDcxMSw3OTI5Ml0sWy0yMywtNzVdLFsyOCwtMjA1XV0sW1s1NjMwOCw3ODg2OV0sWy0xNzAsLTEyM10sWy0xMzEsLTQwMV0sWy0xNjgsLTQwMV0sWy0yMjMsLTExMV1dLFtbNTU2MTYsNzc4MzNdLFstMTczLDI2XSxbLTIxMywtMTU1XV0sW1s1NTIzMCw3NzcwNF0sWy0xMDQsLTg5XSxbLTIyOSwxMTRdLFstMjA4LDI1M10sWy04OCw3M11dLFtbNTQ2MDEsNzgwNTVdLFstNTQsMjAwXSxbLTQ3LDZdXSxbWzU0NzE2LDc5MDEyXSxbMTQxLC0xNTFdLFsxMDMsLTY1XSxbMjMzLDczXSxbMjIsMTE4XSxbMTExLDE4XSxbMTM1LDkyXSxbMzAsLTM4XSxbMTMwLDc0XSxbNjYsMTM5XSxbOTEsMzZdLFsyOTcsLTE4MF0sWzU5LDYxXV0sW1s1Nzg0Miw3NzQ1NV0sWy01MCwyNzBdLFszMCwyNTJdLFstOSwyNTldLFstMTYwLDM1Ml0sWy04OSwyNDldLFstODYsMTc1XSxbLTg0LDU4XV0sW1s1ODIyMyw3NzM0MF0sWzYsLTE1Ml0sWy0xMzUsLTEyOF0sWy04NCw1Nl0sWy03OCwtNzEzXV0sW1s1NzkzMiw3NjQwM10sWy0xNjMsNjJdLFstMjAyLDIxNV0sWy0zMjcsLTEzOF0sWy0xMzgsLTE1MF0sWy00MDgsMzFdLFstMjEzLDkyXSxbLTEwOCwtNDNdLFstODAsMjQzXV0sW1s1NjI5Myw3NjcxNV0sWy01MSwxMDNdLFs2NSw5OV0sWy02OSw3NF0sWy04NywtMTMzXSxbLTE2MiwxNzJdLFstMjIsMjQ0XSxbLTE2OSwxMzldLFstMzEsMTg4XSxbLTE1MSwyMzJdXSxbWzU1OTA3LDgzMTg3XSxbLTU5LDQ5N11dLFtbNTU4NDgsODM2ODRdLFszMTgsMTgxXSxbNDY2LC0zOF0sWzI3Myw1OV0sWzM5LC0xMjNdLFsxNDgsLTM4XSxbMjY3LC0yODddXSxbWzU1ODQ4LDgzNjg0XSxbMTAsNDQ1XSxbMTM2LDM3MV0sWzI2MiwyMDJdLFsyMjEsLTQ0Ml0sWzIyMywxMl0sWzUzLDQ1M11dLFtbNTY3NTMsODQ3MjVdLFsyMzcsMTA1XSxbMTIxLC03M10sWzIzOSwtMjE5XSxbMjI5LC0xXV0sW1s1Njc1Myw4NDcyNV0sWzMyLDM0OV0sWy0xMDIsLTc1XSxbLTE3NiwyMTBdLFstMjQsMzQwXSxbMzUxLDE2NF0sWzM1MCw4Nl0sWzMwMSwtOTddLFsyODcsMTddXSxbWzU0MTcxLDgwNzc1XSxbLTEyNCwtNjJdLFstNzMsNjhdLFstNzAsLTExM10sWy0yMDAsLTExNF0sWy0xMDMsLTE0N10sWy0yMDIsLTEyOV0sWzQ5LC0xNzZdLFszMCwtMjQ5XSxbMTQxLC0xNDJdLFsxNTcsLTI1NF1dLFtbNTI2NjUsNzg2NThdLFstMjk4LDE4MV0sWy01NywtMTI4XSxbLTIzNiw0XV0sW1s1MTcxOCw3OTgwNF0sWzE2LDI1OV0sWy01NiwxMzNdXSxbWzUxNjc4LDgwMTk2XSxbMzIsNDAwXV0sW1s1MTcxMCw4MDU5Nl0sWy00Nyw2MTldLFsxNjcsMF0sWzcwLDIyMl0sWzY5LDU0MV0sWy01MSwyMDBdXSxbWzUxOTE4LDgyMTc4XSxbNTQsMTI1XSxbMjMyLDMyXSxbNTIsLTEzMF0sWzE4OCwyOTFdLFstNjMsMjIyXSxbLTEzLDMzNV1dLFtbNTIzNjgsODMwNTNdLFsyMTAsLTc4XSxbMTc4LDkwXV0sW1s1Mjc1Niw4MzA2NV0sWzQsLTIyOF0sWzI4MSwtMTM4XSxbLTMsLTIxMF0sWzI4MywxMTFdLFsxNTYsMTYyXSxbMzEzLC0yMzNdLFsxMzIsLTE4OV1dLFtbNTc5MzIsNzY0MDNdLFstMTQ0LC0yNDVdLFstMTAxLC00MjJdLFs4OSwtMzM3XV0sW1s1Nzc3Niw3NTM5OV0sWy0yMzksNzldLFstMjgzLC0xODZdXSxbWzU3MjU0LDc1MjkyXSxbLTMsLTI5NF0sWy0yNTIsLTU2XSxbLTE5NiwyMDZdLFstMjIyLC0xNjJdLFstMjA2LDE3XV0sW1s1NjM3NSw3NTAwM10sWy0yMCwzOTFdLFstMTM5LDE4OV1dLFtbNTYyMTYsNzU1ODNdLFs0Niw4NF0sWy0zMCw3MF0sWzQ3LDE4OF0sWzEwNSwxODVdLFstMTM1LDI1NV0sWy0yNCwyMTZdLFs2OCwxMzRdXSxbWzU3MzAyLDcxNDM2XSxbLTM1LC0xNzVdLFstNDAwLC01MF0sWzMsOThdLFstMzM5LDExNV0sWzUyLDI1MV0sWzE1MiwtMTk5XSxbMjE2LDM0XSxbMjA3LC00Ml0sWy03LC0xMDNdLFsxNTEsNzFdXSxbWzU3MjU0LDc1MjkyXSxbMTM1LC0xNTddLFstODYsLTM2OV0sWy02NiwtNjddXSxbWzU3MjM3LDc0Njk5XSxbLTE2OSwxN10sWy0xNDUsNTZdLFstMzM2LC0xNTRdLFsxOTIsLTMzMl0sWy0xNDEsLTk2XSxbLTE1NCwtMV0sWy0xNDcsMzA1XSxbLTUyLC0xMzBdLFs2MiwtMzUzXSxbMTM5LC0yNzddLFstMTA1LC0xMjldLFsxNTUsLTI3M10sWzEzNywtMTcxXSxbNCwtMzM0XSxbLTI1NywxNTddLFs4MiwtMzAyXSxbLTE3NiwtNjJdLFsxMDUsLTUyMV0sWy0xODQsLThdLFstMjI4LDI1N10sWy0xMDQsNDczXSxbLTQ5LDM5M10sWy0xMDgsMjcyXSxbLTE0MywzMzddLFstMTgsMTY4XV0sW1s1NTU5Nyw3Mzk5MV0sWzEyOSwyODddLFsxNiwxOTJdLFs5MSw4NV0sWzUsMTU1XV0sW1s1NTgzOCw3NDcxMF0sWzE4Miw1M10sWzEwNiwxMjldLFsxNTAsLTEyXSxbNDYsMTAzXSxbNTMsMjBdXSxbWzYwMDQxLDcxNzQ0XSxbLTEwMiwyNjhdLFsxMDUsMjIyXSxbLTE2OSwtNTFdLFstMjMzLDEzNl0sWy0xOTEsLTM0MF0sWy00MjEsLTY2XSxbLTIyNSwzMTddLFstMzAwLDIwXSxbLTY0LC0yNDVdLFstMTkyLC03MF0sWy0yNjgsMzE0XSxbLTMwMywtMTFdLFstMTY1LDU4OF0sWy0yMDMsMzI4XSxbMTM1LDQ1OV0sWy0xNzYsMjgzXSxbMzA4LDU2NV0sWzQyOCwyM10sWzExNyw0NDldLFs1MjksLTc4XSxbMzM0LDM4M10sWzMyNCwxNjddLFs0NTksMTNdLFs0ODUsLTQxN10sWzM5OSwtMjI4XSxbMzIzLDkxXSxbMjM5LC01M10sWzMyOCwzMDldXSxbWzYxNTQyLDc1MTIwXSxbMjk2LDI4XSxbMjY4LC0yOTBdXSxbWzU3Nzc2LDc1Mzk5XSxbMzMsLTIyOF0sWzI0MywtMTkwXSxbLTUxLC0xNDVdLFstMzMwLC0zM10sWy0xMTgsLTE4Ml0sWy0yMzIsLTMxOV0sWy04NywyNzZdLFszLDEyMV1dLFtbNTU1OTcsNzM5OTFdLFstNDgsNDFdLFstNSwxMzBdLFstMTU0LDE5OV0sWy0yNCwyODFdLFsyMyw0MDNdLFszOCwxODRdLFstNDcsOTNdXSxbWzU1MzgwLDc1MzIyXSxbLTE4LDE4OF0sWzEyMCwyOTFdLFsxOCwtMTExXSxbNzUsNTJdXSxbWzU1NTc1LDc1NzQyXSxbNTksLTE1OV0sWzY2LC02MF0sWzE5LC0yMTRdXSxbWzU1NzE5LDc1MzA5XSxbLTM1LC0yMDFdLFszOSwtMjU0XSxbMTE1LC0xNDRdXSxbWzU1MjMwLDc3NzA0XSxbNjcsLTIyOV0sWzg5LC0xNjldLFstMTA3LC0yMjJdXSxbWzU1Mjc5LDc3MDg0XSxbLTEyNiwxMzFdLFstMTkyLC04XSxbLTIzOSw5OF0sWy0xMzAsLTEzXSxbLTYwLC0xMjNdLFstOTksMTM2XSxbLTU5LC0yNDVdLFsxMzYsLTI3N10sWzYxLC0xODNdLFsxMjcsLTIyMV0sWzEwNiwtMTMwXSxbMTA1LC0yNDddLFsyNDYsLTIyNF1dLFtbNTUxNTUsNzU3NzhdLFstMzEsLTEwMF1dLFtbNTUxMjQsNzU2NzhdLFstMjYxLDIxOF0sWy0xNjEsMjEzXSxbLTI1NCwxNzZdLFstMjMzLDQzNF0sWzU2LDQ1XSxbLTEyNywyNDhdLFstNSwyMDBdLFstMTc5LDkzXSxbLTg1LC0yNTVdLFstODIsMTk4XSxbNiwyMDVdLFsxMCw5XV0sW1s1MzgwOSw3NzQ2Ml0sWzE5NCwtMjBdLFs1MSwxMDBdLFs5NCwtOTddLFsxMDksLTExXSxbLTEsMTY1XSxbOTcsNjBdLFsyNywyMzldLFsyMjEsMTU3XV0sW1s1MjkwMCw3ODI4NV0sWy0yMiwtMjQyXSxbLTEyMiwtMTAwXSxbLTIwNiw3NV0sWy02MCwtMjM5XSxbLTEzMiwtMTldLFstNDgsOTRdLFstMTU2LC0yMDBdLFstMTM0LC0yOF0sWy0xMjAsMTI2XV0sW1s1MTU3Niw3OTg0M10sWzMwLDMzMV0sWzcyLDIyXV0sW1s1MDY5OCw4MDc5OV0sWzIyMiwxMTddXSxbWzUwOTIwLDgwOTE2XSxbMjA0LC00N10sWzI1NywxMjNdLFsxNzYsLTI1OF0sWzE1MywtMTM4XV0sW1s1MDkyMCw4MDkxNl0sWzE0MywxNjJdLFsyNDQsODY5XSxbMzgwLDI0OF0sWzIzMSwtMTddXSxbWzQ3NDkwLDc1MzI0XSxbMTAxLDE1MF0sWzExMyw4Nl0sWzcwLC0yODldLFsxNjQsMF0sWzQ3LDc1XSxbMTYyLC0yMV0sWzc4LC0yOTZdLFstMTI5LC0xNjBdLFstMywtNDYxXSxbLTQ1LC04Nl0sWy0xMSwtMjgwXSxbLTEyMCwtNDhdLFsxMTEsLTM1NV0sWy03NywtMzg4XSxbOTYsLTE3NV0sWy0zOCwtMTYxXSxbLTEwMywtMjIyXSxbMjMsLTE5NV1dLFtbNDc5MjksNzI0OThdLFstMTEyLC0xNTNdLFstMTQ2LDgzXSxbLTE0MywtNjVdLFs0Miw0NjJdLFstMjYsMzYzXSxbLTEyNCw1NV0sWy02NywyMjRdLFsyMiwzODZdLFsxMTEsMjE1XSxbMjAsMjM5XSxbNTgsMzU1XSxbLTYsMjUwXSxbLTU2LDIxMl0sWy0xMiwyMDBdXSxbWzQ3NDkwLDc1MzI0XSxbMTQsNDIwXSxbLTExNCwyNTddLFszOTMsNDI2XSxbMzQwLC0xMDZdLFszNzMsM10sWzI5NiwtMTAxXSxbMjMwLDMxXSxbNDQ5LC0xOV1dLFtbNTA4MjksNzU2NzRdLFsxNSwtMzQ0XSxbLTI2MywtMzkzXSxbLTM1NiwtMTI1XSxbLTI1LC0xOTldLFstMTcxLC0zMjddLFstMTA3LC00ODFdLFsxMDgsLTMzOF0sWy0xNjAsLTI2M10sWy02MCwtMzg0XSxbLTIxMCwtMTE4XSxbLTE5NywtNDU0XSxbLTM1MiwtOV0sWy0yNjUsMTFdLFstMTc0LC0yMDldLFstMTA2LC0yMjNdLFstMTM2LDQ5XSxbLTEwMywxOTldLFstNzksMzQwXSxbLTI1OSw5Ml1dLFtbNDgyNzgsODI0MDZdLFs0NiwtNDIyXSxbLTIxMCwtNTI4XSxbLTQ5MywtMzQ5XSxbLTM5Myw4OV0sWzIyNSw2MTddLFstMTQ1LDYwMV0sWzM3OCw0NjNdLFsyMTAsMjc2XV0sW1s0Nzg5Niw4MzE1M10sWzU3LC0zMTddLFstNTcsLTMxN10sWzE3Miw5XSxbMjEwLC0xMjJdXSxbWzk2MDQ5LDM4MTI1XSxbMjI4LC0zNjZdLFsxNDQsLTI3Ml0sWy0xMDUsLTE0Ml0sWy0xNTMsMTYwXSxbLTE5OSwyNjZdLFstMTc5LDMxM10sWy0xODQsNDE2XSxbLTM4LDIwMV0sWzExOSwtOV0sWzE1NiwtMjAxXSxbMTIyLC0yMDBdLFs4OSwtMTY2XV0sW1s5NTAzMiw0NDM4Nl0sWzc4LC0yMDNdLFstMTk0LDRdLFstMTA2LDM2M10sWzE2NiwtMTQyXSxbNTYsLTIyXV0sW1s5NDkxMCw0NDkwOF0sWy00MiwtMTA5XSxbLTIwNiw1MTJdLFstNTcsMzUzXSxbOTQsMF0sWzEwMCwtNDczXSxbMTExLC0yODNdXSxbWzk0NjgwLDQ0NzQ3XSxbLTEwOCwtMTRdLFstMTcwLDYwXSxbLTU4LDkxXSxbMTcsMjM1XSxbMTgzLC05M10sWzkxLC0xMjRdLFs0NSwtMTU1XV0sW1s5NDM0NCw0NTg0MV0sWzY1LC0xODddLFsxMiwtMTE5XSxbLTIxOCwyNTFdLFstMTUyLDIxMl0sWy0xMDQsMTk3XSxbNDEsNjBdLFsxMjgsLTE0Ml0sWzIyOCwtMjcyXV0sW1s5MzY0OSw0NjQzMV0sWzExMSwtMTkzXSxbLTU2LC0zM10sWy0xMjEsMTM0XSxbLTExNCwyNDNdLFsxNCw5OV0sWzE2NiwtMjUwXV0sW1s5OTEzNCwyNjkwOF0sWy0xMDUsLTMxOV0sWy0xMzgsLTQwNF0sWy0yMTQsLTIzNl0sWy00OCwxNTVdLFstMTE2LDg1XSxbMTYwLDQ4Nl0sWy05MSwzMjZdLFstMjk5LDIzNl0sWzgsMjE0XSxbMjAxLDIwNl0sWzQ3LDQ1NV0sWy0xMywzODJdLFstMTEzLDM5Nl0sWzgsMTA0XSxbLTEzMywyNDRdLFstMjE4LDUyM10sWy0xMTcsNDE4XSxbMTA0LDQ2XSxbMTUxLC0zMjhdLFsyMTYsLTE1M10sWzc4LC01MjZdLFsyMDIsLTYyMl0sWzUsNDAzXSxbMTI2LC0xNjFdLFs0MSwtNDQ3XSxbMjI0LC0xOTJdLFsxODgsLTQ4XSxbMTU4LDIyNl0sWzE0MSwtNjldLFstNjcsLTUyNF0sWy04NSwtMzQ1XSxbLTIxMiwxMl0sWy03NCwtMTc5XSxbMjYsLTI1NF0sWy00MSwtMTEwXV0sW1s5NzEyOSwyNDg0Nl0sWzIzOCwzMTBdLFsxNjcsMzA2XSxbMTIzLDQ0MV0sWzEwNiwxNDldLFs0MSwzMzBdLFsxOTUsMjczXSxbNjEsLTI1MV0sWzYzLC0yNDRdLFsxOTgsMjM5XSxbODAsLTI0OV0sWzAsLTI0OV0sWy0xMDMsLTI3NF0sWy0xODIsLTQzNV0sWy0xNDIsLTIzOF0sWzEwMywtMjg0XSxbLTIxNCwtN10sWy0yMzgsLTIyM10sWy03NSwtMzg3XSxbLTE1NywtNTk3XSxbLTIxOSwtMjY0XSxbLTEzOCwtMTY5XSxbLTI1NiwxM10sWy0xODAsMTk0XSxbLTMwMiw0Ml0sWy00NiwyMTddLFsxNDksNDM4XSxbMzQ5LDU4M10sWzE3OSwxMTFdLFsyMDAsMjI1XV0sW1s5MTAyNCwyNjQ2OV0sWzE2NiwtMzldLFsyMCwtNzAyXSxbLTk1LC0yMDNdLFstMjksLTQ3Nl0sWy05NywxNjJdLFstMTkzLC00MTJdLFstNTcsMzJdLFstMTcxLDE5XSxbLTE3MSw1MDVdLFstMzgsMzkwXSxbLTE2MCw1MTVdLFs3LDI3MV0sWzE4MSwtNTJdLFsyNjksLTIwNF0sWzE1MSw4MV0sWzIxNywxMTNdXSxbWzg1MDQwLDMxNTQ2XSxbLTI5NCwtMzAzXSxbLTI0MSwtMTM3XSxbLTUzLC0zMDldLFstMTAzLC0yNDBdLFstMjM2LC0xNV0sWy0xNzQsLTUyXSxbLTI0NiwxMDddLFstMTk5LC02NF0sWy0xOTEsLTI3XSxbLTE2NSwtMzE1XSxbLTgxLDI2XSxbLTE0MCwtMTY3XSxbLTEzMywtMTg3XSxbLTIwMywyM10sWy0xODYsMF0sWy0yOTUsMzc3XSxbLTE0OSwxMTNdLFs2LDMzOF0sWzEzOCw4MV0sWzQ3LDEzNF0sWy0xMCwyMTJdLFszNCw0MTFdLFstMzEsMzUwXSxbLTE0Nyw1OThdLFstNDUsMzM3XSxbMTIsMzM2XSxbLTExMSwzODVdLFstNywxNzRdLFstMTIzLDIzNV0sWy0zNSw0NjNdLFstMTU4LDQ2N10sWy0zOSwyNTJdLFsxMjIsLTI1NV0sWy05Myw1NDhdLFsxMzcsLTE3MV0sWzgzLC0yMjldLFstNSwzMDNdLFstMTM4LDQ2NV0sWy0yNiwxODZdLFstNjUsMTc3XSxbMzEsMzQxXSxbNTYsMTQ2XSxbMzgsMjk1XSxbLTI5LDM0Nl0sWzExNCw0MjVdLFsyMSwtNDUwXSxbMTE4LDQwNl0sWzIyNSwxOThdLFsxMzYsMjUyXSxbMjEyLDIxN10sWzEyNiw0Nl0sWzc3LC03M10sWzIxOSwyMjBdLFsxNjgsNjZdLFs0MiwxMjldLFs3NCw1NF0sWzE1MywtMTRdLFsyOTIsMTczXSxbMTUxLDI2Ml0sWzcxLDMxNl0sWzE2MywzMDBdLFsxMywyMzZdLFs3LDMyMV0sWzE5NCw1MDJdLFsxMTcsLTUxMF0sWzExOSwxMThdLFstOTksMjc5XSxbODcsMjg3XSxbMTIyLC0xMjhdLFszNCw0NDldLFsxNTIsMjkxXSxbNjcsMjMzXSxbMTQwLDEwMV0sWzQsMTY1XSxbMTIyLC02OV0sWzUsMTQ4XSxbMTIyLDg1XSxbMTM0LDgwXSxbMjA1LC0yNzFdLFsxNTUsLTM1MF0sWzE3MywtNF0sWzE3NywtNTZdLFstNTksMzI1XSxbMTMzLDQ3M10sWzEyNiwxNTVdLFstNDQsMTQ3XSxbMTIxLDMzOF0sWzE2OCwyMDhdLFsxNDIsLTcwXSxbMjM0LDExMV0sWy01LDMwMl0sWy0yMDQsMTk1XSxbMTQ4LDg2XSxbMTg0LC0xNDddLFsxNDgsLTI0Ml0sWzIzNCwtMTUxXSxbNzksNjBdLFsxNzIsLTE4Ml0sWzE2MiwxNjldLFsxMDUsLTUxXSxbNjUsMTEzXSxbMTI3LC0yOTJdLFstNzQsLTMxNl0sWy0xMDUsLTIzOV0sWy05NiwtMjBdLFszMiwtMjM2XSxbLTgxLC0yOTVdLFstOTksLTI5MV0sWzIwLC0xNjZdLFsyMjEsLTMyN10sWzIxNCwtMTg5XSxbMTQzLC0yMDRdLFsyMDEsLTM1MF0sWzc4LDFdLFsxNDUsLTE1MV0sWzQzLC0xODNdLFsyNjUsLTIwMF0sWzE4MywyMDJdLFs1NSwzMTddLFs1NiwyNjJdLFszNCwzMjRdLFs4NSw0NzBdLFstMzksMjg2XSxbMjAsMTcxXSxbLTMyLDMzOV0sWzM3LDQ0NV0sWzUzLDEyMF0sWy00MywxOTddLFs2NywzMTNdLFs1MiwzMjVdLFs3LDE2OF0sWzEwNCwyMjJdLFs3OCwtMjg5XSxbMTksLTM3MV0sWzcwLC03MV0sWzExLC0yNDldLFsxMDEsLTMwMF0sWzIxLC0zMzVdLFstMTAsLTIxNF0sWzEwMCwtNDY0XSxbMTc5LDIyM10sWzkyLC0yNTBdLFsxMzMsLTIzMV0sWy0yOSwtMjYyXSxbNjAsLTUwNl0sWzQyLC0yOTVdLFs3MCwtNzJdLFs3NSwtNTA1XSxbLTI3LC0zMDddLFs5MCwtNDAwXSxbMzAxLC0zMDldLFsxOTcsLTI4MV0sWzE4NiwtMjU3XSxbLTM3LC0xNDNdLFsxNTksLTM3MV0sWzEwOCwtNjM5XSxbMTExLDEzMF0sWzExMywtMjU2XSxbNjgsOTFdLFs0OCwtNjI2XSxbMTk3LC0zNjNdLFsxMjksLTIyNl0sWzIxNywtNDc4XSxbNzgsLTQ3NV0sWzcsLTMzN10sWy0xOSwtMzY1XSxbMTMyLC01MDJdLFstMTYsLTUyM10sWy00OCwtMjc0XSxbLTc1LC01MjddLFs2LC0zMzldLFstNTUsLTQyM10sWy0xMjMsLTUzOF0sWy0yMDUsLTI5MF0sWy0xMDIsLTQ1OF0sWy05MywtMjkyXSxbLTgyLC01MTBdLFstMTA3LC0yOTRdLFstNzAsLTQ0Ml0sWy0zNiwtNDA3XSxbMTQsLTE4N10sWy0xNTksLTIwNV0sWy0zMTEsLTIyXSxbLTI1NywtMjQyXSxbLTEyNywtMjI5XSxbLTE2OCwtMjU0XSxbLTIzMCwyNjJdLFstMTcwLDEwNF0sWzQzLDMwOF0sWy0xNTIsLTExMl0sWy0yNDMsLTQyOF0sWy0yNDAsMTYwXSxbLTE1OCw5NF0sWy0xNTksNDJdLFstMjY5LDE3MV0sWy0xNzksMzY0XSxbLTUyLDQ0OV0sWy02NCwyOThdLFstMTM3LDI0MF0sWy0yNjcsNzFdLFs5MSwyODddLFstNjcsNDM4XSxbLTEzNiwtNDA4XSxbLTI0NywtMTA5XSxbMTQ2LDMyN10sWzQyLDM0MV0sWzEwNywyODldLFstMjIsNDM4XSxbLTIyNiwtNTA0XSxbLTE3NCwtMjAyXSxbLTEwNiwtNDcwXSxbLTIxNywyNDNdLFs5LDMxM10sWy0xNzQsNDI5XSxbLTE0NywyMjFdLFs1MiwxMzddLFstMzU2LDM1OF0sWy0xOTUsMTddLFstMjY3LDI4N10sWy00OTgsLTU2XSxbLTM1OSwtMjExXSxbLTMxNywtMTk3XSxbLTI2NSwzOV1dLFtbNzI3MTgsNTUwMjRdLFstNDIsLTYxNV0sWy0xMTYsLTE2OF0sWy0yNDIsLTEzNV0sWy0xMzIsNDcwXSxbLTQ5LDg0OV0sWzEyNiw5NTldLFsxOTIsLTMyOF0sWzEyOSwtNDE2XSxbMTM0LC02MTZdXSxbWzgwNDA5LDYxMzMxXSxbLTIyOCwxODNdLFstOCw1MDldLFsxMzcsMjY3XSxbMzA0LDE2Nl0sWzE1OSwtMTRdLFs2MiwtMjI2XSxbLTEyMiwtMjYwXSxbLTY0LC0zNDFdLFstMjQwLC0yODRdXSxbWzg0NTE3LDc0MTcwXSxbLTM4OCwtMTcxXSxbLTIwNCwtMjc3XSxbLTMwMCwtMTYxXSxbMTQ4LDI3NF0sWy01OCwyMzBdLFsyMjAsMzk3XSxbLTE0NywzMTBdLFstMjQyLC0yMDldLFstMzE0LC00MTFdLFstMTcxLC0zODFdLFstMjcyLC0yOV0sWy0xNDIsLTI3NV0sWzE0NywtNDAwXSxbMjI3LC05N10sWzksLTI2NV0sWzIyMCwtMTczXSxbMzExLDQyMl0sWzI0NywtMjMwXSxbMTc5LC0xNV0sWzQ1LC0zMTBdLFstMzkzLC0xNjVdLFstMTMwLC0zMTldLFstMjcwLC0yOTZdLFstMTQyLC00MTRdLFsyOTksLTMyNV0sWzEwOSwtNTgxXSxbMTY5LC01NDFdLFsxODksLTQ1NF0sWy01LC00MzldLFstMTc0LC0xNjFdLFs2NiwtMzE1XSxbMTY0LC0xODRdLFstNDMsLTQ4MV0sWy03MSwtNDY4XSxbLTE1NSwtNTNdLFstMjAzLC02NDBdLFstMjI1LC03NzVdLFstMjU4LC03MDVdLFstMzgyLC01NDVdLFstMzg2LC00OThdLFstMzEzLC02OF0sWy0xNzAsLTI2Ml0sWy05NiwxOTJdLFstMTU3LC0yOTRdLFstMzg4LC0yOTZdLFstMjk0LC05MF0sWy05NSwtNjI0XSxbLTE1NCwtMzVdLFstNzMsNDI5XSxbNjYsMjI4XSxbLTM3MywxODldLFstMTMxLC05Nl1dLFtbODM4MjYsNjQ5OTJdLFstMTY3LC05NDddLFstMTE5LC00ODVdLFstMTQ2LDQ5OV0sWy0zMiw0MzhdLFsxNjMsNTgxXSxbMjIzLDQ0N10sWzEyNywtMTc2XSxbLTQ5LC0zNTddXSxbWzUzODM1LDc4MDU4XSxbLTMxLC0yOTFdLFs2NywtMjUxXV0sW1s1Mzg3MSw3NzUxNl0sWy0yMjEsODZdLFstMjI2LC0yMTBdLFsxNSwtMjkzXSxbLTM0LC0xNjhdLFs5MSwtMzAxXSxbMjYxLC0yOThdLFsxNDAsLTQ4OF0sWzMwOSwtNDc2XSxbMjE3LDNdLFs2OCwtMTMwXSxbLTc4LC0xMThdLFsyNDksLTIxNF0sWzIwNCwtMTc4XSxbMjM4LC0zMDhdLFsyOSwtMTExXSxbLTUyLC0yMTFdLFstMTU0LDI3Nl0sWy0yNDIsOTddLFstMTE2LC0zODJdLFsyMDAsLTIxOV0sWy0zMywtMzA5XSxbLTExNiwtMzVdLFstMTQ4LC01MDZdLFstMTE2LC00Nl0sWzEsMTgxXSxbNTcsMzE3XSxbNjAsMTI2XSxbLTEwOCwzNDJdLFstODUsMjk4XSxbLTExNSw3NF0sWy04MiwyNTVdLFstMTc5LDEwN10sWy0xMjAsMjM4XSxbLTIwNiwzOF0sWy0yMTcsMjY3XSxbLTI1NCwzODRdLFstMTg5LDM0MF0sWy04Niw1ODVdLFstMTM4LDY4XSxbLTIyNiwxOTVdLFstMTI4LC04MF0sWy0xNjEsLTI3NF0sWy0xMTUsLTQzXV0sW1s1NDEwMCw3MzExNl0sWzIxMSw1MV0sWy0xMDAsLTQ2NV0sWzQxLC0xODNdLFstNTgsLTMwM10sWy0yMTMsMjIyXSxbLTE0MSw2NF0sWy0zODcsMzAwXSxbMzgsMzA0XSxbMzI1LC01NF0sWzI4NCw2NF1dLFtbNTI0MTksNzQ3NDRdLFsxMzksMTgzXSxbMTY2LC00MTldLFstMzksLTc4Ml0sWy0xMjYsMzhdLFstMTEzLC0xOTddLFstMTA1LDE1Nl0sWy0xMSw3MTNdLFstNjQsMzM4XSxbMTUzLC0zMF1dLFtbNTIzNjgsODMwNTNdLFstMTEzLDMyOF0sWy04LDYwNF0sWzQ2LDE1OV0sWzgwLDE3N10sWzI0NCwzN10sWzk4LDE2M10sWzIyMywxNjddLFstOSwtMzA0XSxbLTgyLC0xOTJdLFszMywtMTY2XSxbMTUxLC04OV0sWy02OCwtMjIzXSxbLTgzLDY0XSxbLTIwMCwtNDI1XSxbNzYsLTI4OF1dLFtbNTM0MzYsODM3MzFdLFs4OCwtMjk2XSxbLTE2NiwtNDc4XSxbLTI5MSwzMzNdLFstMzksMjQ2XSxbNDA4LDE5NV1dLFtbNDc4OTYsODMxNTNdLFsyMzMsMjRdLFsyOTgsLTM2NV0sWy0xNDksLTQwNl1dLFtbNDkxNDAsODIxMzJdLFsxLDBdLFs0MCwzNDNdLFstMTg2LDM2NF0sWy00LDhdLFstMzM3LDEwNF0sWy02NiwxNjBdLFsxMDEsMjY0XSxbLTkyLDE2M10sWy0xNDksLTI3OV0sWy0xNyw1NjldLFstMTQwLDMwMV0sWzEwMSw2MTFdLFsyMTYsNDgwXSxbMjIyLC00N10sWzMzNSw0OV0sWy0yOTcsLTYzOV0sWzI4Myw4MV0sWzMwNCwtM10sWy03MiwtNDgxXSxbLTI1MCwtNTMwXSxbMjg3LC0zOF0sWzIyLC02Ml0sWzI0OCwtNjk3XSxbMTkwLC05NV0sWzE3MSwtNjczXSxbNzksLTIzM10sWzMzNywtMTEzXSxbLTM0LC0zNzhdLFstMTQyLC0xNzNdLFsxMTEsLTMwNV0sWy0yNTAsLTMxMF0sWy0zNzEsNl0sWy00NzMsLTE2M10sWy0xMzAsMTE2XSxbLTE4MywtMjc2XSxbLTI1Nyw2N10sWy0xOTUsLTIyNl0sWy0xNDgsMTE4XSxbNDA3LDYyMV0sWzI0OSwxMjddLFstMiwxXSxbLTQzNCw5OF0sWy03OSwyMzVdLFsyOTEsMTgzXSxbLTE1MiwzMTldLFs1MiwzODddLFs0MTMsLTU0XV0sW1s0NTk2OSw4OTg0M10sWy02NCwtMzgyXSxbMzE0LC00MDNdLFstMzYxLC00NTFdLFstODAxLC00MDVdLFstMjQwLC0xMDddLFstMzY1LDg3XSxbLTc3NSwxODddLFsyNzMsMjYxXSxbLTYwNSwyODldLFs0OTIsMTE0XSxbLTEyLDE3NF0sWy01ODMsMTM3XSxbMTg4LDM4NV0sWzQyMSw4N10sWzQzMywtNDAwXSxbNDIyLDMyMV0sWzM0OSwtMTY3XSxbNDUzLDMxNV0sWzQ2MSwtNDJdXSxbWzYzNDk1LDc1MjgxXSxbMTQ2LC0zMTFdLFsxNDEsLTQxOV0sWzEzMCwtMjhdLFs4NSwtMTU5XSxbLTIyOCwtNDddLFstNDksLTQ1OV0sWy00OCwtMjA3XSxbLTEwMSwtMTM4XSxbNywtMjkzXV0sW1s2MjQ5Miw3NDk1MF0sWzY4LDk2XSxbMjA3LC0xNjldLFsxNDksLTM2XSxbMzgsNzBdLFstMTM2LDMxOV0sWzcyLDgyXV0sW1s2MTU0Miw3NTEyMF0sWzQyLDI1Ml0sWy03MCw0MDNdLFstMTYwLDIxOF0sWy0xNTQsNjhdLFstMTAyLDE4MV1dLFtbODM1NjQsNTgwODZdLFstMTQyLDQ1MF0sWzIzOCwtMjJdLFs5NywtMjEzXSxbLTc0LC01MTBdLFstMTE5LDI5NV1dLFtbODQwNTEsNTY0NzddLFs3MCwxNjVdLFszMCwzNjddLFsxNTMsMzVdLFstNDQsLTM5OF0sWzIwNSw1NzBdLFstMjYsLTU2M10sWy0xMDAsLTE5NV0sWy04NywtMzczXSxbLTg3LC0xNzVdLFstMTcxLDQwOV0sWzU3LDE1OF1dLFtbODUxMDQsNTU1NTFdLFsyOCwtMzkyXSxbMTYsLTMzMl0sWy05NCwtNTQwXSxbLTEwMiw2MDJdLFstMTMwLC0zMDBdLFs4OSwtNDM1XSxbLTc5LC0yNzddLFstMzI3LDM0M10sWy03OCw0MjhdLFs4NCwyODBdLFstMTc2LDI4MF0sWy04NywtMjQ1XSxbLTEzMSwyM10sWy0yMDUsLTMzMF0sWy00NiwxNzNdLFsxMDksNDk4XSxbMTc1LDE2Nl0sWzE1MSwyMjNdLFs5OCwtMjY4XSxbMjEyLDE2Ml0sWzQ1LDI2NF0sWzE5NiwxNV0sWy0xNiw0NTddLFsyMjUsLTI4MF0sWzIzLC0yOTddLFsyMCwtMjE4XV0sW1s4MjkxNyw1NjA4NF0sWy0zNjksLTU2MV0sWzEzNiw0MTRdLFsyMDAsMzY0XSxbMTY3LDQwOV0sWzE0Niw1ODddLFs0OSwtNDgyXSxbLTE4MywtMzI1XSxbLTE0NiwtNDA2XV0sW1s4Mzk4Miw2MTM0N10sWy00NiwtMjQ1XSxbOTUsLTQyM10sWy03MywtNDkxXSxbLTE2NCwtMTk2XSxbLTQzLC00NzZdLFs2MiwtNDcxXSxbMTQ3LC02NV0sWzEyMyw3MF0sWzM0NywtMzI4XSxbLTI3LC0zMjFdLFs5MSwtMTQyXSxbLTI5LC0yNzJdLFstMjE2LDI5MF0sWy0xMDMsMzEwXSxbLTcxLC0yMTddLFstMTc3LDM1NF0sWy0yNTMsLTg3XSxbLTEzOCwxMzBdLFsxNCwyNDRdLFs4NywxNTFdLFstODMsMTM2XSxbLTM2LC0yMTNdLFstMTM3LDM0MF0sWy00MSwyNTddLFstMTEsNTY2XSxbMTEyLC0xOTVdLFsyOSw5MjVdLFs5MCw1MzVdLFsxNjksLTFdLFsxNzEsLTE2OF0sWzg1LDE1M10sWzI2LC0xNTBdXSxbWzgzODk5LDU3MzI0XSxbLTQzLDI4Ml0sWzE2NiwtMTgzXSxbMTc3LDFdLFstNSwtMjQ3XSxbLTEyOSwtMjUxXSxbLTE3NiwtMTc4XSxbLTEwLDI3NV0sWzIwLDMwMV1dLFtbODQ4NjEsNTc3NjZdLFs3OCwtNjYwXSxbLTIxNCwxNTddLFs1LC0xOTldLFs2OCwtMzY0XSxbLTEzMiwtMTMzXSxbLTExLDQxNl0sWy04NCwzMV0sWy00MywzNTddLFsxNjMsLTQ3XSxbLTQsMjI0XSxbLTE2OSw0NTFdLFsyNjYsLTEzXSxbNzcsLTIyMF1dLFtbNzgzNzIsNTQyNTZdLFs2NCwtNTZdLFsxNjQsLTM1Nl0sWzExNiwtMzk2XSxbMTYsLTM5OF0sWy0yOSwtMjY5XSxbMjcsLTIwM10sWzIwLC0zNDldLFs5OCwtMTYzXSxbMTA5LC01MjNdLFstNSwtMTk5XSxbLTE5NywtNDBdLFstMjYzLDQzOF0sWy0zMjksNDY5XSxbLTMyLDMwMV0sWy0xNjEsMzk1XSxbLTM4LDQ4OV0sWy0xMDAsMzIyXSxbMzAsNDMxXSxbLTYxLDI1MF1dLFtbODA0NjEsNTE3NjVdLFsyMDQsLTIwMl0sWzIxNCwxMTBdLFs1Niw1MDBdLFsxMTksMTEyXSxbMzMzLDEyOF0sWzE5OSw0NjddLFsxMzcsMzc0XV0sW1s4MTcyMyw1MzI1NF0sWzEyNiwtMzA3XSxbNTgsMjAyXSxbMTMzLC0xOV0sWzE2LDM3N10sWzEzLDI5MV1dLFtbODIwNjksNTM3OThdLFsyMTQsNDExXSxbMTQwLDQ2Ml0sWzExMiwyXSxbMTQzLC0yOTldLFsxMywtMjU3XSxbMTgzLC0xNjVdLFsyMzEsLTE3N10sWy0yMCwtMjMyXSxbLTE4NiwtMjldLFs1MCwtMjg5XSxbLTIwNSwtMjAxXV0sW1s4MTcyMyw1MzI1NF0sWzExMCwyMjFdLFsyMzYsMzIzXV0sW1s1MzgwOSw3NzQ2Ml0sWzYyLDU0XV0sW1s1Nzc5Nyw4NjMyNl0sWy01MDQsLTQ3XSxbLTQ4OSwtMjE2XSxbLTQ1MiwtMTI1XSxbLTE2MSwzMjNdLFstMjY5LDE5M10sWzYyLDU4Ml0sWy0xMzUsNTMzXSxbMTMzLDM0NV0sWzI1MiwzNzFdLFs2MzUsNjQwXSxbMTg1LDEyNF0sWy0yOCwyNTBdLFstMzg3LDI3OV1dLFtbNTQ3MTEsNzkyOTJdLFszOSwxMzBdLFsxMjMsLTEwXSxbOTUsNjFdLFs3LDU1XSxbNTQsMjhdLFsxOCwxMzRdLFs2NCwyNl0sWzQzLDEwNl0sWzgyLDFdXSxbWzYwNjY5LDYxMjEzXSxbMTYxLC02ODRdLFs3NywtNTQyXSxbMTUyLC0yODhdLFszNzksLTU1OF0sWzE1NCwtMzM2XSxbMTUxLC0zNDFdLFs4NywtMjAzXSxbMTM2LC0xNzhdXSxbWzYxOTY2LDU4MDgzXSxbLTgzLC0xNDRdLFstMTE5LDUxXV0sW1s2MTc2NCw1Nzk5MF0sWy05NSwxOTFdLFstMTE0LDM0Nl0sWy0xMjQsMTkwXSxbLTcxLDIwNF0sWy0yNDIsMjM3XSxbLTE5MSw3XSxbLTY3LDEyNF0sWy0xNjMsLTEzOV0sWy0xNjgsMjY4XSxbLTg3LC00NDFdLFstMzIzLDEyNF1dLFtbODk0MTEsNzM3MjldLFstMjU2LC01OTVdLFs0LC02MTBdLFstMTA0LC00NzJdLFs0OCwtMjk2XSxbLTE0NSwtNDE2XSxbLTM1NSwtMjc4XSxbLTQ4OCwtMzZdLFstMzk2LC02NzVdLFstMTg2LDIyN10sWy0xMiw0NDJdLFstNDgzLC0xMzBdLFstMzI5LC0yNzldLFstMzI1LC0xMV0sWzI4MiwtNDM1XSxbLTE4NiwtMTAwNF0sWy0xNzksLTI0OF0sWy0xMzUsMjI5XSxbNjksNTMzXSxbLTE3NiwxNzJdLFstMTEzLDQwNV0sWzI2MywxODJdLFsxNDUsMzcxXSxbMjgwLDMwNl0sWzIwMyw0MDNdLFs1NTMsMTc3XSxbMjk3LC0xMjFdLFsyOTEsMTA1MF0sWzE4NSwtMjgyXSxbNDA4LDU5MV0sWzE1OCwyMjldLFsxNzQsNzIzXSxbLTQ3LDY2NF0sWzExNywzNzRdLFsyOTUsMTA4XSxbMTUyLC04MTldLFstOSwtNDc5XV0sW1s5MDE2OSw3NjU1M10sWzE5NywyNTBdLFs2MiwtNjYzXSxbLTQxMiwtMTYyXSxbLTI0NCwtNTg3XSxbLTQzNiw0MDRdLFstMTUyLC02NDZdLFstMzA4LC05XSxbLTM5LDU4N10sWzEzOCw0NTVdLFsyOTYsMzNdLFs4MSw4MTddLFs4Myw0NjBdLFszMjYsLTYxNV0sWzIxMywtMTk4XSxbMTk1LC0xMjZdXSxbWzg2NzY5LDcwMzUxXSxbMTU0LDM1Ml0sWzE1OCwtNjhdLFsxMTQsMjQ4XSxbMjA0LC0xMjddLFszNSwtMjAzXSxbLTE1NiwtMzU3XSxbLTExNCwxODldLFstMTQzLC0xMzddLFstNzMsLTM0Nl0sWy0xODEsMTY4XSxbMiwyODFdXSxbWzY0NzUyLDYwNDE3XSxbLTIwMSwtMTU4XSxbLTU0LC0yNjNdLFstNiwtMjAxXSxbLTI3NywtMjQ5XSxbLTQ0NCwtMjc2XSxbLTI0OSwtNDE3XSxbLTEyMiwtMzNdLFstODMsMzVdLFstMTYzLC0yNDVdLFstMTc3LC0xMTRdLFstMjMzLC0zMF0sWy03MCwtMzRdLFstNjEsLTE1Nl0sWy03MywtNDNdLFstNDMsLTE1MF0sWy0xMzcsMTNdLFstODksLTgwXSxbLTE5MiwzMF0sWy03MiwzNDVdLFs4LDMyM10sWy00NiwxNzRdLFstNTQsNDM3XSxbLTgwLDI0M10sWzU2LDI5XSxbLTI5LDI3MF0sWzM0LDExNF0sWy0xMiwyNTddXSxbWzYxODgzLDYwMjM4XSxbMTIxLDE4OV0sWy0yOCwyNDldLFs3NCwyOTBdLFsxMTQsLTE1M10sWzc1LDUzXSxbMzIxLDE0XSxbNTAsLTU5XSxbMjY5LC02MF0sWzEwNiwzMF0sWzcwLC0xOTddLFsxMzAsOTldLFsxOTksNjIwXSxbMjU5LDI2Nl0sWzgwMSwyMjZdXSxbWzYzNDQ4LDY3NDQ5XSxbMTA5LC01MTBdLFsxMzcsLTEzNV0sWzQ3LC0yMDddLFsxOTAsLTI0OV0sWzE2LC0yNDNdLFstMjcsLTE5N10sWzM1LC0xOTldLFs4MCwtMTY1XSxbMzcsLTE5NF0sWzQxLC0xNDVdXSxbWzY0Mjc0LDY1MTMwXSxbNTMsLTIyNl1dLFtbNjE4ODMsNjAyMzhdLFstMzcsMjUyXSxbLTgzLDE3OF0sWy0yMiwyMzZdLFstMTQzLDIxMl0sWy0xNDgsNDk1XSxbLTc5LDQ4Ml0sWy0xOTIsNDA2XSxbLTEyNCw5N10sWy0xODQsNTYzXSxbLTMyLDQxMV0sWzEyLDM1MF0sWy0xNTksNjU1XSxbLTEzMCwyMzFdLFstMTUwLDEyMl0sWy05MiwzMzldLFsxNSwxMzNdLFstNzcsMzA2XSxbLTgxLDEzMl0sWy0xMDgsNDQwXSxbLTE3MCw0NzZdLFstMTQxLDQwNl0sWy0xMzksLTNdLFs0NCwzMjVdLFsxMiwyMDZdLFszNCwyMzZdXSxbWzM2NDgzLDQ0NjhdLFsxNDEsMF0sWzQxNCwxMjddLFs0MTksLTEyN10sWzM0MiwtMjU1XSxbMTIwLC0zNTldLFszMywtMjU0XSxbMTEsLTMwMV0sWy00MzAsLTE4Nl0sWy00NTIsLTE1MF0sWy01MjIsLTEzOV0sWy01ODIsLTExNl0sWy02NTgsMzVdLFstMzY1LDE5N10sWzQ5LDI0M10sWzU5MywxNjJdLFsyMzksMTk3XSxbMTc0LDI1NF0sWzEyNiwyMjBdLFsxNjgsMjA5XSxbMTgwLDI0M11dLFtbMzE1ODYsMzE2M10sWzYyNSwtMjNdLFs1OTksLTU4XSxbMjA3LDI0M10sWzE0NywyMDhdLFsyODgsLTI0M10sWy04MiwtMzAxXSxbLTgxLC0yNjZdLFstNTgyLDgxXSxbLTYyMSwtMzVdLFstMzQ4LDE5N10sWzAsMjNdLFstMTUyLDE3NF1dLFtbMjk0NjgsODQ3Ml0sWzE5MCw3MF0sWzMyMSwtMjNdLFs4MiwzMDFdLFsxNiwyMTldLFstNiw0NzVdLFsxNTgsMjc4XSxbMjU2LDkzXSxbMTQ3LC0yMjBdLFs2NSwtMjIwXSxbMTIwLC0yNjddLFs5MiwtMjU0XSxbNzYsLTI2N10sWzMzLC0yNjZdLFstNDksLTIzMV0sWy03NiwtMjIwXSxbLTMyNiwtODFdLFstMzExLC0xMTZdLFstMzY0LDExXSxbMTM2LDIzMl0sWy0zMjcsLTgxXSxbLTMxMCwtODFdLFstMjEyLDE3NF0sWy0xNiwyNDNdLFszMDUsMjMxXV0sW1syMTU3NSw4MTAzXSxbMTc0LDEwNF0sWzM1MywtODFdLFs0MDMsLTQ2XSxbMzA1LC04MV0sWzMwNCw2OV0sWzE2MywtMzM1XSxbLTIxNyw0Nl0sWy0zMzcsLTIzXSxbLTM0MywyM10sWy0zNzYsLTM1XSxbLTI4MywxMTZdLFstMTQ2LDI0M11dLFtbMTU5MzgsNzA2MV0sWzYwLDE5N10sWzMzMiwtMTA0XSxbMzU5LC05M10sWzMzMiwxMDRdLFstMTU4LC0yMDhdLFstMjYxLC0xNTFdLFstMzg2LDQ3XSxbLTI3OCwyMDhdXSxbWzE0NjQzLDcxNzddLFsyMDIsMTI3XSxbMjc3LC0xMzldLFs0MjUsLTIzMV0sWy0xNjQsMjNdLFstMzU5LDU4XSxbLTM4MSwxNjJdXSxbWzQ1MjQsNDE0NF0sWzE2OSwyMjBdLFs1MTcsLTkzXSxbMjc3LC0xODVdLFsyMTIsLTIwOV0sWzc2LC0yNjZdLFstNTMzLC04MV0sWy0zNjQsMjA4XSxbLTE2MywyMDldLFstMTEsMzVdLFstMTgwLDE2Ml1dLFtbMCw1MjldLFsxNiwtNV0sWzI0NSwzNDRdLFs1MDEsLTE4NV0sWzMyLDIxXSxbMjk0LDE4OF0sWzM4LC03XSxbMzIsLTRdLFs0MDIsLTI0Nl0sWzM1MiwyNDZdLFs2MywzNF0sWzgxNiwxMDRdLFsyNjUsLTEzOF0sWzEzMCwtNzFdLFs0MTksLTE5Nl0sWzc4OSwtMTUxXSxbNjI1LC0xODVdLFsxMDcyLC0xMzldLFs4MDAsMTYyXSxbMTE4MSwtMTE2XSxbNjY5LC0xODVdLFs3MzQsMTc0XSxbNzczLDE2Ml0sWzYwLDI3OF0sWy0xMDk0LDIzXSxbLTg5OCwxMzldLFstMjM0LDIzMV0sWy03NDUsMTI4XSxbNDksMjY2XSxbMTAzLDI0M10sWzEwNCwyMjBdLFstNTUsMjQzXSxbLTQ2MiwxNjJdLFstMjEyLDIwOV0sWy00MzAsMTg1XSxbNjc1LC0zNV0sWzY0Miw5M10sWzQwMiwtMTk3XSxbNDk1LDE3M10sWzQ1NywyMjBdLFsyMjMsMTk3XSxbLTk4LDI0M10sWy0zNTksMTYyXSxbLTQwOCwxNzRdLFstNTcxLDM1XSxbLTUwMCw4MV0sWy01MzksNThdLFstMTgwLDIyMF0sWy0zNTksMTg1XSxbLTIxNywyMDhdLFstODcsNjcyXSxbMTM2LC01OF0sWzI1MCwtMTg1XSxbNDU3LDU4XSxbNDQxLDgxXSxbMjI4LC0yNTVdLFs0NDEsNThdLFszNzAsMTI3XSxbMzQ4LDE2Ml0sWzMxNSwxOTddLFs0MTksNThdLFstMTEsMjIwXSxbLTk3LDIyMF0sWzgxLDIwOF0sWzM1OSwxMDRdLFsxNjMsLTE5Nl0sWzQyNSwxMTVdLFszMjEsMTUxXSxbMzk3LDEyXSxbMzc1LDU3XSxbMzc2LDEzOV0sWzI5OSwxMjhdLFszMzcsMTI3XSxbMjE4LC0zNV0sWzE5MCwtNDZdLFs0MTQsODFdLFszNzAsLTEwNF0sWzM4MSwxMV0sWzM2NCw4MV0sWzM3NSwtNTddLFs0MTQsLTU4XSxbMzg2LDIzXSxbNDAzLC0xMl0sWzQxMywtMTFdLFszODEsMjNdLFsyODMsMTc0XSxbMzM3LDkyXSxbMzQ5LC0xMjddLFszMzEsMTA0XSxbMzAwLDIwOF0sWzE3OSwtMTg1XSxbOTgsLTIwOF0sWzE4MCwtMTk3XSxbMjg4LDE3NF0sWzMzMiwtMjIwXSxbMzc1LC03MF0sWzMyMSwtMTYyXSxbMzkyLDM1XSxbMzU0LDEwNF0sWzQxOCwtMjNdLFszNzYsLTgxXSxbMzgxLC0xMDRdLFsxNDcsMjU0XSxbLTE4MCwxOTddLFstMTM2LDIwOV0sWy0zNTksNDZdLFstMTU4LDIyMF0sWy02MCwyMjBdLFstOTgsNDQwXSxbMjEzLC04MV0sWzM2NCwtMzVdLFszNTksMzVdLFszMjcsLTkzXSxbMjgzLC0xNzRdLFsxMTksLTIwOF0sWzM3NiwtMzVdLFszNTksODFdLFszODEsMTE2XSxbMzQyLDcwXSxbMjgzLC0xMzldLFszNzAsNDZdLFsyMzksNDUxXSxbMjI0LC0yNjZdLFszMjEsLTEwNF0sWzM0OCw1OF0sWzIyOCwtMjMyXSxbMzY1LC0yM10sWzMzNywtNjldLFszMzIsLTEyOF0sWzIxOCwyMjBdLFsxMDgsMjA5XSxbMjc4LC0yMzJdLFszODEsNThdLFsyODMsLTEyN10sWzE5MCwtMTk3XSxbMzcwLDU4XSxbMjg4LDEyN10sWzI4MywxNTFdLFszMzcsODFdLFszOTIsNjldLFszNTQsODFdLFsyNzIsMTI3XSxbMTYzLDE4Nl0sWzY1LDI1NF0sWy0zMiwyNDRdLFstODcsMjMxXSxbLTk4LDIzMl0sWy04NywyMzFdLFstNzEsMjA5XSxbLTE2LDIzMV0sWzI3LDIzMl0sWzEzMCwyMjBdLFsxMDksMjQzXSxbNDQsMjMxXSxbLTU1LDI1NV0sWy0zMiwyMzJdLFsxMzYsMjY2XSxbMTUyLDE3M10sWzE4MCwyMjBdLFsxOTAsMTg2XSxbMjIzLDE3M10sWzEwOSwyNTVdLFsxNTIsMTYyXSxbMTc0LDE1MV0sWzI2NywzNF0sWzE3NCwxODZdLFsxOTYsMTE1XSxbMjI4LDcwXSxbMjAyLDE1MF0sWzE1NywxODZdLFsyMTgsNjldLFsxNjMsLTE1MV0sWy0xMDMsLTE5Nl0sWy0yODMsLTE3NF0sWy0xMjAsLTEyN10sWy0yMDYsOTJdLFstMjI5LC01OF0sWy0xOTAsLTEzOV0sWy0yMDIsLTE1MF0sWy0xMzYsLTE3NF0sWy0zOCwtMjMxXSxbMTcsLTIyMF0sWzEzMCwtMTk3XSxbLTE5MCwtMTM5XSxbLTI2MSwtNDZdLFstMTUzLC0xOTddLFstMTYzLC0xODVdLFstMTc0LC0yNTVdLFstNDQsLTIyMF0sWzk4LC0yNDNdLFsxNDcsLTE4NV0sWzIyOSwtMTM5XSxbMjEyLC0xODVdLFsxMTQsLTIzMl0sWzYwLC0yMjBdLFs4MiwtMjMyXSxbMTMwLC0xOTZdLFs4MiwtMjIwXSxbMzgsLTU0NF0sWzgxLC0yMjBdLFsyMiwtMjMyXSxbODcsLTIzMV0sWy0zOCwtMzEzXSxbLTE1MiwtMjQzXSxbLTE2MywtMTk3XSxbLTM3MCwtODFdLFstMTI1LC0yMDhdLFstMTY5LC0xOTddLFstNDE5LC0yMjBdLFstMzcwLC05M10sWy0zNDgsLTEyN10sWy0zNzYsLTEyOF0sWy0yMjMsLTI0M10sWy00NDYsLTIzXSxbLTQ4OSwyM10sWy00NDEsLTQ2XSxbLTQ2OCwwXSxbODcsLTIzMl0sWzQyNCwtMTA0XSxbMzExLC0xNjJdLFsxNzQsLTIwOF0sWy0zMTAsLTE4NV0sWy00NzksNThdLFstMzk3LC0xNTFdLFstMTcsLTI0M10sWy0xMSwtMjMyXSxbMzI3LC0xOTZdLFs2MCwtMjIwXSxbMzUzLC0yMjBdLFs1ODgsLTkzXSxbNTAwLC0xNjJdLFszOTgsLTE4NV0sWzUwNiwtMTg2XSxbNjkwLC05Ml0sWzY4MSwtMTYyXSxbNDczLC0xNzRdLFs1MTcsLTE5N10sWzI3MiwtMjc4XSxbMTM2LC0yMjBdLFszMzcsMjA5XSxbNDU3LDE3M10sWzQ4NCwxODZdLFs1NzcsMTUwXSxbNDk1LDE2Ml0sWzY5MSwxMl0sWzY4MCwtODFdLFs1NjAsLTEzOV0sWzE4MCwyNTVdLFszODYsMTczXSxbNzAyLDEyXSxbNTUwLDEyN10sWzUyMiwxMjhdLFs1NzcsODFdLFs2MTQsMTA0XSxbNDMwLDE1MF0sWy0xOTYsMjA5XSxbLTExOSwyMDhdLFswLDIyMF0sWy01MzksLTIzXSxbLTU3MSwtOTNdLFstNTQ0LDBdLFstNzcsMjIwXSxbMzksNDQwXSxbMTI1LDEyOF0sWzM5NywxMzhdLFs0NjgsMTM5XSxbMzM3LDE3NF0sWzMzNywxNzRdLFsyNTEsMjMxXSxbMzgwLDEwNF0sWzM3Niw4MV0sWzE5MCw0N10sWzQzMCwyM10sWzQwOCw4MV0sWzM0MywxMTZdLFszMzcsMTM5XSxbMzA1LDEzOV0sWzM4NiwxODVdLFsyNDUsMTk3XSxbMjYxLDE3M10sWzgyLDIzMl0sWy0yOTQsMTM5XSxbOTgsMjQzXSxbMTg1LDE4NV0sWzI4OCwxMTZdLFszMDUsMTM5XSxbMjgzLDE4NV0sWzIxNywyMzJdLFsxMzYsMjc3XSxbMjAyLDE2M10sWzMzMSwtMzVdLFsxMzYsLTE5N10sWzMzMiwtMjNdLFsxMSwyMjBdLFsxNDIsMjMxXSxbMjk5LC01OF0sWzcxLC0yMjBdLFszMzEsLTM0XSxbMzYwLDEwNF0sWzM0OCw2OV0sWzMxNSwtMzRdLFsxMjAsLTI0M10sWzMwNSwxOTZdLFsyODMsMTA1XSxbMzE1LDgxXSxbMzEwLDgxXSxbMjgzLDEzOV0sWzMxMCw5Ml0sWzI0MCwxMjhdLFsxNjgsMjA4XSxbMjA3LC0xNTFdLFsyODgsODFdLFsyMDIsLTI3N10sWzE1NywtMjA5XSxbMzE2LDExNl0sWzEyNSwyMzJdLFsyODMsMTYyXSxbMzY1LC0zNV0sWzEwOCwtMjIwXSxbMjI5LDIyMF0sWzI5OSw2OV0sWzMyNiwyM10sWzI5NCwtMTFdLFszMTAsLTcwXSxbMzAwLC0zNF0sWzEzMCwtMTk3XSxbMTgwLC0xNzRdLFszMDQsMTA0XSxbMzI3LDI0XSxbMzE1LDBdLFszMTAsMTFdLFsyNzgsODFdLFsyOTQsNzBdLFsyNDUsMTYyXSxbMjYxLDEwNF0sWzI4Myw1OF0sWzIxMiwxNjJdLFsxNTIsMzI0XSxbMTU4LDE5N10sWzI4OCwtOTNdLFsxMDksLTIwOF0sWzIzOSwtMTM5XSxbMjg5LDQ2XSxbMTk2LC0yMDhdLFsyMDYsLTE1MV0sWzI4MywxMzldLFs5OCwyNTVdLFsyNTAsMTA0XSxbMjg5LDE5N10sWzI3Miw4MV0sWzMyNiwxMTZdLFsyMTgsMTI3XSxbMjI4LDEzOV0sWzIxOCwxMjddLFsyNjEsLTY5XSxbMjUwLDIwOF0sWzE4MCwxNjJdLFsyNjEsLTExXSxbMjI5LDEzOV0sWzU0LDIwOF0sWzIzNCwxNjJdLFsyMjgsMTE2XSxbMjc4LDkzXSxbMjU2LDQ2XSxbMjQ0LC0zNV0sWzI2MiwtNThdLFsyMjMsLTE2Ml0sWzI3LC0yNTRdLFsyNDUsLTE5N10sWzE2OCwtMTYyXSxbMzMyLC03MF0sWzE4NSwtMTYyXSxbMjI5LC0xNjJdLFsyNjYsLTM1XSxbMjIzLDExNl0sWzI0MCwyNDNdLFsyNjEsLTEyN10sWzI3MiwtNzBdLFsyNjEsLTY5XSxbMjcyLC00Nl0sWzI3NywwXSxbMjI5LC02MTRdLFstMTEsLTE1MF0sWy0zMywtMjY3XSxbLTI2NiwtMTUwXSxbLTIxOCwtMjIwXSxbMzgsLTIzMl0sWzMxMCwxMl0sWy0zOCwtMjMyXSxbLTE0MSwtMjIwXSxbLTEzMSwtMjQzXSxbMjEyLC0xODVdLFszMjEsLTU4XSxbMzIxLDEwNF0sWzE1MywyMzJdLFs5MiwyMjBdLFsxNTMsMTg1XSxbMTc0LDE3NF0sWzcwLDIwOF0sWzE0NywyODldLFsxNzQsNThdLFszMTYsMjRdLFsyNzcsNjldLFsyODMsOTNdLFsxMzYsMjMxXSxbODIsMjIwXSxbMTkwLDIyMF0sWzI3MiwxNTFdLFsyMzQsMTE1XSxbMTUzLDE5N10sWzE1NywxMDRdLFsyMDIsOTNdLFsyNzcsLTU4XSxbMjUwLDU4XSxbMjcyLDY5XSxbMzA1LC0zNF0sWzIwMSwxNjJdLFsxNDIsMzkzXSxbMTAzLC0xNjJdLFsxMzEsLTI3OF0sWzIzNCwtMTE1XSxbMjY2LC00N10sWzI2Nyw3MF0sWzI4MywtNDZdLFsyNjEsLTEyXSxbMTc0LDU4XSxbMjM0LC0zNV0sWzIxMiwtMTI3XSxbMjUwLDgxXSxbMzAwLDBdLFsyNTUsODFdLFsyODksLTgxXSxbMTg1LDE5N10sWzE0MSwxOTZdLFsxOTEsMTYzXSxbMzQ4LDQzOV0sWzE3OSwtODFdLFsyMTIsLTE2Ml0sWzE4NSwtMjA4XSxbMzU0LC0zNTldLFsyNzIsLTEyXSxbMjU2LDBdLFsyOTksNzBdLFsyOTksODFdLFsyMjksMTYyXSxbMTkwLDE3NF0sWzMxMCwyM10sWzIwNywxMjddLFsyMTgsLTExNl0sWzE0MSwtMTg1XSxbMTk2LC0xODVdLFszMDUsMjNdLFsxOTAsLTE1MF0sWzMzMiwtMTUxXSxbMzQ4LC01OF0sWzI4OCw0N10sWzIxOCwxODVdLFsxODUsMTg1XSxbMjUwLDQ2XSxbMjUxLC04MV0sWzI4OCwtNThdLFsyNjEsOTNdLFsyNTAsMF0sWzI0NSwtNThdLFsyNTYsLTU4XSxbMjUwLDEwNF0sWzI5OSw5M10sWzI4MywyM10sWzMxNiwwXSxbMjU1LDU4XSxbMjUxLDQ2XSxbNzYsMjkwXSxbMTEsMjQzXSxbMTc0LC0xNjJdLFs0OSwtMjY2XSxbOTIsLTI0NF0sWzExNSwtMTk2XSxbMjM0LC0xMDVdLFszMTUsMzVdLFszNjUsMTJdLFsyNTAsMzVdLFszNjQsMF0sWzI2MiwxMV0sWzM2NCwtMjNdLFszMTAsLTQ2XSxbMTk2LC0xODZdLFstNTQsLTIyMF0sWzE3OSwtMTczXSxbMjk5LC0xMzldLFszMTAsLTE1MV0sWzM2MCwtMTA0XSxbMzc1LC05Ml0sWzI4MywtOTNdLFszMTUsLTEyXSxbMTgwLDE5N10sWzI0NSwtMTYyXSxbMjEyLC0xODVdLFsyNDUsLTEzOV0sWzMzNywtNThdLFszMjEsLTY5XSxbMTM2LC0yMzJdLFszMTYsLTEzOV0sWzIxMiwtMjA4XSxbMzEwLC05M10sWzMyMSwxMl0sWzI5OSwtMzVdLFszMzIsMTJdLFszMzIsLTQ3XSxbMzEwLC04MV0sWzI4OCwtMTM5XSxbMjg5LC0xMTZdLFsxOTUsLTE3M10sWy0zMiwtMjMyXSxbLTE0NywtMjA4XSxbLTEyNSwtMjY2XSxbLTk4LC0yMDldLFstMTMxLC0yNDNdLFstMzY0LC05M10sWy0xNjMsLTIwOF0sWy0zNjAsLTEyN10sWy0xMjUsLTIzMl0sWy0xOTAsLTIyMF0sWy0yMDEsLTE4NV0sWy0xMTUsLTI0M10sWy03MCwtMjIwXSxbLTI4LC0yNjZdLFs2LC0yMjBdLFsxNTgsLTIzMl0sWzYwLC0yMjBdLFsxMzAsLTIwOF0sWzUxNywtODFdLFsxMDksLTI1NV0sWy01MDEsLTkzXSxbLTQyNCwtMTI3XSxbLTUyOCwtMjNdLFstMjM0LC0zMzZdLFstNDksLTI3OF0sWy0xMTksLTIyMF0sWy0xNDcsLTIyMF0sWzM3MCwtMTk2XSxbMTQxLC0yNDRdLFsyMzksLTIxOV0sWzMzOCwtMTk3XSxbMzg2LC0xODZdLFs0MTksLTE4NV0sWzYzNiwtMTg1XSxbMTQyLC0yODldLFs4MDAsLTEyOF0sWzUzLC00NV0sWzIwOCwtMTc1XSxbNzY3LDE1MV0sWzYzNiwtMTg2XSxbNDc5LC0xNDJdLFstOTk5OTksMF1dLFtbNTkwOTIsNzEzNDFdLFsxOSwzXSxbNDAsMTQzXSxbMjAwLC04XSxbMjUzLDE3Nl0sWy0xODgsLTI1MV0sWzIxLC0xMTFdXSxbWzU5NDM3LDcxMjkzXSxbLTMwLDIxXSxbLTUzLC00NV0sWy00MiwxMl0sWy0xNCwtMjJdLFstNSw1OV0sWy0yMCwzN10sWy01NCw2XSxbLTc1LC01MV0sWy01MiwzMV1dLFtbNTk0MzcsNzEyOTNdLFs4LC00OF0sWy0yODUsLTI0MF0sWy0xMzYsNzddLFstNjQsMjM3XSxbMTMyLDIyXV0sW1s0NTI3Miw2MzIzNl0sWzEzLDI3NF0sWzEwNiwxNjFdLFs5MSwzMDhdLFstMTgsMjAwXSxbOTYsNDE3XSxbMTU1LDM3Nl0sWzkzLDk1XSxbNzQsMzQ0XSxbNiwzMTVdLFsxMDAsMzY1XSxbMTg1LDIxNl0sWzE3Nyw2MDNdLFs1LDhdLFsxMzksMjI3XSxbMjU5LDY1XSxbMjE4LDQwNF0sWzE0MCwxNThdLFsyMzIsNDkzXSxbLTcwLDczNV0sWzEwNiw1MDhdLFszNywzMTJdLFsxNzksMzk5XSxbMjc4LDI3MF0sWzIwNiwyNDRdLFsxODYsNjEyXSxbODcsMzYyXSxbMjA1LC0yXSxbMTY3LC0yNTFdLFsyNjQsNDFdLFsyODgsLTEzMV0sWzEyMSwtNl1dLFtbNTY5NDQsNjM1NzhdLFswLDIxNzVdLFswLDIxMDFdLFstODMsNDc2XSxbNzEsMzY1XSxbLTQzLDI1M10sWzEwMSwyODNdXSxbWzU2OTkwLDY5MjMxXSxbMzY5LDEwXSxbMjY4LC0xNTZdLFsyNzUsLTE3NV0sWzEyOSwtOTJdLFsyMTQsMTg4XSxbMTE0LDE2OV0sWzI0NSw0OV0sWzE5OCwtNzVdLFs3NSwtMjkzXSxbNjUsMTkzXSxbMjIyLC0xNDBdLFsyMTcsLTMzXSxbMTM3LDE0OV1dLFtbNTk3MDAsNjgwMTBdLFstNzgsLTIzOF0sWy02MCwtNDQ2XSxbLTc1LC0zMDhdLFstNjUsLTEwM10sWy05MywxOTFdLFstMTI1LDI2M10sWy0xOTgsODQ3XSxbLTI5LC01M10sWzExNSwtNjI0XSxbMTcxLC01OTRdLFsyMTAsLTkyMF0sWzEwMiwtMzIxXSxbOTAsLTMzNF0sWzI0OSwtNjU0XSxbLTU1LC0xMDNdLFs5LC0zODRdLFszMjMsLTUzMF0sWzQ5LC0xMjFdXSxbWzUzMTkxLDcwMTU4XSxbMzI2LC0yMDRdLFsxMTcsNTFdLFsyMzIsLTk4XSxbMzY4LC0yNjRdLFsxMzAsLTUyNl0sWzI1MCwtMTE0XSxbMzkxLC0yNDhdLFsyOTYsLTI5M10sWzEzNiwxNTNdLFsxMzMsMjcyXSxbLTY1LDQ1Ml0sWzg3LDI4OF0sWzIwMCwyNzddLFsxOTIsODBdLFszNzUsLTEyMV0sWzk1LC0yNjRdLFsxMDQsLTJdLFs4OCwtMTAxXSxbMjc2LC03MF0sWzY4LC0xOTVdXSxbWzU5ODA0LDUzODMzXSxbLTE2NCw2NDNdLFstMTI3LDEzN10sWy00OCwyMzZdLFstMTQxLDI4OF0sWy0xNzEsNDJdLFs5NSwzMzddLFsxNDcsMTRdLFs0MiwxODFdXSxbWzYxNzY0LDU3OTkwXSxbLTk4LC0yNjFdLFstOTQsLTI3N10sWzIyLC0xNjNdLFs0LC0xODBdLFsxNTUsLTEwXSxbNjcsNDJdLFs2MiwtMTA2XV0sW1s2MTg4Miw1NzAzNV0sWy02MSwtMjA5XSxbMTAzLC0zMjVdLFsxMDIsLTI4NV0sWzEwNiwtMjEwXSxbOTA5LC03MDJdLFsyMzMsNF1dLFtbNjE5NjYsNTgwODNdLFs2NiwtMTgzXSxbLTksLTI0NV0sWy0xNTgsLTE0Ml0sWzExOSwtMTYxXV0sW1s2MTk4NCw1NzM1Ml0sWy0xMDIsLTMxN11dLFtbNjE5ODQsNTczNTJdLFs5MSwtMTA5XSxbNTQsLTI0NV0sWzEyNSwtMjQ3XSxbMTM4LC0yXSxbMjYyLDE1MV0sWzMwMiw3MF0sWzI0NSwxODRdLFsxMzgsMzldLFs5OSwxMDhdLFsxNTgsMjBdXSxbWzU4NDQ5LDQ5OTA5XSxbLTE2NiwtMTgyXSxbLTY3LDYwXV0sW1s1ODU2NCw1MjY1M10sWzExNSwxNjFdLFsxNzYsLTEzMl0sWzIyNCwxMzhdLFsxOTUsLTFdLFsxNzEsMjcyXV0sW1s1NTI3OSw3NzA4NF0sWzEwMCwyXSxbLTY5LC0yNjBdLFsxMzQsLTIyN10sWy00MSwtMjc4XSxbLTY1LC0yN11dLFtbNTUzMzgsNzYyOTRdLFstNTIsLTUzXSxbLTkwLC0xMzhdLFstNDEsLTMyNV1dLFtbNTU3MTksNzUzMDldLFszNSwtNV0sWzEzLDEyMV0sWzE2NCw5MV0sWzYyLDIzXV0sW1s1NTk5Myw3NTUzOV0sWzk1LDM1XSxbMTI4LDldXSxbWzU1OTkzLDc1NTM5XSxbLTksNDRdLFszMyw3MV0sWzMxLDE0NF0sWy0zOSwtNF0sWy01NCwxMTBdLFstNDYsMjhdLFstMzYsOTRdLFstNTIsMzZdLFstNDAsODRdLFstNTAsLTMzXSxbLTM4LC0xOTZdLFstNjYsLTQzXV0sW1s1NTYyNyw3NTg3NF0sWzIyLDUxXSxbLTEwNiwxMjNdLFstOTEsNjNdLFstNDAsODJdLFstNzQsMTAxXV0sW1s1NTM4MCw3NTMyMl0sWy01OCw0Nl0sWy03OCwxOTJdLFstMTIwLDExOF1dLFtbNTU2MjcsNzU4NzRdLFstNTIsLTEzMl1dLFtbMzI4NjYsNTY5MzddLFsxNjAsNzddLFs1OCwtMjFdLFstMTEsLTQ0MF0sWy0yMzIsLTY1XSxbLTUwLDUzXSxbODEsMTYzXSxbLTYsMjMzXV1dLCJiYm94IjpbLTE4MCwtODUuNjA5MDM3Nzc0NTk3NzEsMTgwLDgzLjY0NTEzMDAwMDAwMDAxXSwidHJhbnNmb3JtIjp7InNjYWxlIjpbMC4wMDM2MDAwMzYwMDAzNjAwMDM3LDAuMDAxNjkyNTU4NjAzMzMyMDEwNV0sInRyYW5zbGF0ZSI6Wy0xODAsLTg1LjYwOTAzNzc3NDU5NzcxXX19Cg==", import.meta.url).href;
  return ze = await (await fetch(r)).json(), ze;
}
a(c0, "loadTopology");
const Ge = 960, He = 500, we = 20, BM = {
  sequentialAscending: [
    "#F5F5FE",
    "#E3E3FD",
    "#C1C1FB",
    "#A1A1F8",
    "#8585F6",
    "#6A6AF4",
    "#4747E5",
    "#2323B4",
    "#000091"
  ],
  sequentialDescending: [
    "#000091",
    "#2323B4",
    "#4747E5",
    "#6A6AF4",
    "#8585F6",
    "#A1A1F8",
    "#C1C1FB",
    "#E3E3FD",
    "#F5F5FE"
  ],
  divergentAscending: [
    "#000091",
    "#4747E5",
    "#8585F6",
    "#C1C1FB",
    "#F5F5F5",
    "#FCC0B4",
    "#F58050",
    "#E3541C",
    "#C9191E"
  ],
  divergentDescending: [
    "#C9191E",
    "#E3541C",
    "#F58050",
    "#FCC0B4",
    "#F5F5F5",
    "#C1C1FB",
    "#8585F6",
    "#4747E5",
    "#000091"
  ],
  neutral: [
    "#F6F6F6",
    "#E5E5E5",
    "#CECECE",
    "#B5B5B5",
    "#929292",
    "#777777",
    "#666666",
    "#3A3A3A",
    "#161616"
  ],
  default: [
    "#F5F5FE",
    "#E3E3FD",
    "#C1C1FB",
    "#A1A1F8",
    "#8585F6",
    "#6A6AF4",
    "#4747E5",
    "#2323B4",
    "#000091"
  ],
  categorical: [
    "#000091",
    "#6A6AF4",
    "#009081",
    "#C9191E",
    "#FF9940",
    "#A558A0",
    "#417DC4",
    "#716043",
    "#18753C"
  ]
}, RM = {
  Africa: "Afrique",
  Europe: "Europe",
  Asia: "Asie",
  "North America": "Amerique du Nord",
  "South America": "Amerique du Sud",
  Oceania: "Oceanie"
};
var xt;
let is = (xt = class extends Ct(Q) {
  constructor() {
    super(...arguments), this.source = "", this.codeField = "", this.valueField = "", this.codeFormat = "iso-a2", this.name = "", this.selectedPalette = "sequentialAscending", this.unitTooltip = "", this.zoom = "continent", this._data = [], this._topology = null, this._zoomedContinent = null, this._hoveredCountryId = null, this._tooltipX = 0, this._tooltipY = 0;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-world-map"), this._loadMap();
  }
  onSourceData(s) {
    this._data = Array.isArray(s) ? s : [];
  }
  async _loadMap() {
    try {
      this._topology = await c0(), this.requestUpdate();
    } catch (s) {
      console.error("gouv-world-map: failed to load topology", s);
    }
  }
  // --- Data processing ---
  _buildValueMap() {
    const s = /* @__PURE__ */ new Map();
    if (!this._data.length || !this.codeField || !this.valueField)
      return s;
    for (const t of this._data) {
      const e = String($(t, this.codeField) ?? "").trim();
      if (!e)
        continue;
      const i = l0(e, this.codeFormat);
      if (!i)
        continue;
      const M = Number($(t, this.valueField));
      isNaN(M) || s.set(i, Math.round(M * 100) / 100);
    }
    return s;
  }
  _getChoroplethPalette() {
    return BM[this.selectedPalette] || BM.sequentialAscending;
  }
  _getColorScale(s) {
    if (s.length === 0)
      return () => "#E5E5F4";
    const t = this._getChoroplethPalette(), e = [...s].sort((M, n) => M - n), i = [];
    for (let M = 1; M < t.length; M++)
      i.push(e[Math.floor(M / t.length * e.length)]);
    return (M) => {
      let n = 0;
      for (let L = 0; L < i.length; L++)
        M >= i[L] && (n = L + 1);
      return t[Math.min(n, t.length - 1)];
    };
  }
  // --- Geo helpers ---
  _getFeatures() {
    if (!this._topology)
      return [];
    const s = this._topology.objects.countries;
    return i0(this._topology, s).features;
  }
  _getBorders() {
    if (!this._topology)
      return null;
    const s = this._topology.objects.countries;
    return r0(this._topology, s, (t, e) => t !== e);
  }
  _getProjection() {
    const s = Kn().translate([Ge / 2, He / 2]).scale(153);
    if (this._zoomedContinent) {
      const t = this._getFeatures().filter((e) => JM[e.id] === this._zoomedContinent);
      if (t.length > 0) {
        const e = { type: "FeatureCollection", features: t };
        s.fitExtent([[we, we], [Ge - we, He - we]], e);
      }
    }
    return s;
  }
  // --- Event handlers ---
  _onCountryClick(s) {
    if (this.zoom !== "none")
      if (this._zoomedContinent)
        this._zoomedContinent = null;
      else {
        const t = JM[s];
        t && (this._zoomedContinent = t);
      }
  }
  _onCountryHover(s, t) {
    if (this._hoveredCountryId = t, t) {
      const e = this.getBoundingClientRect();
      this._tooltipX = s.clientX - e.left + 12, this._tooltipY = s.clientY - e.top - 8;
    }
  }
  _onBackClick() {
    this._zoomedContinent = null;
  }
  // --- Render ---
  _renderMap() {
    const s = this._getFeatures(), t = this._getBorders(), e = this._getProjection(), i = Qn(e), M = this._buildValueMap(), n = [...M.values()], L = this._getColorScale(n), d = "#F0F0F0", l = s.map((c) => {
      const N = i(c.geometry) || "", T = M.get(c.id), x = T !== void 0 ? L(T) : d, u = this._hoveredCountryId === c.id;
      return LM`<path
        class="gouv-world-map__country"
        d=${N}
        fill=${x}
        stroke=${u ? "#000091" : "none"}
        stroke-width=${u ? "1.5" : "0"}
        data-id=${c.id}
        style="cursor: ${this.zoom !== "none" ? "pointer" : "default"}"
        @click=${() => this._onCountryClick(c.id)}
        @mouseenter=${(w) => this._onCountryHover(w, c.id)}
        @mousemove=${(w) => this._onCountryHover(w, c.id)}
        @mouseleave=${(w) => this._onCountryHover(w, null)}
      />`;
    }), o = t && i(t) || "";
    return z`
      <div class="gouv-world-map__container" style="position: relative;">
        ${this._zoomedContinent ? z`
          <button
            class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
            style="position: absolute; top: 8px; left: 8px; z-index: 2;"
            @click=${this._onBackClick}
            aria-label="Revenir a la vue monde">
            <span class="fr-icon-arrow-left-line" aria-hidden="true"></span>
            ${RM[this._zoomedContinent] || this._zoomedContinent}
          </button>
        ` : F}

        <svg
          viewBox="0 0 ${Ge} ${He}"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label=${this._getAriaLabel()}
          style="width: 100%; height: auto; display: block;">
          <g class="gouv-world-map__countries">
            ${l}
          </g>
          ${o ? LM`<path
            class="gouv-world-map__borders"
            d=${o}
            fill="none"
            stroke="#fff"
            stroke-width="0.5"
            stroke-linejoin="round"
            pointer-events="none"
          />` : F}
        </svg>

        ${this._renderTooltip(M)}
        ${this._renderLegend(n, L)}
      </div>
    `;
  }
  _renderTooltip(s) {
    var M, n;
    if (!this._hoveredCountryId)
      return F;
    const t = d0[this._hoveredCountryId] || ((n = (M = this._getFeatures().find((L) => L.id === this._hoveredCountryId)) == null ? void 0 : M.properties) == null ? void 0 : n.name) || this._hoveredCountryId, e = s.get(this._hoveredCountryId), i = e !== void 0 ? `${e.toLocaleString("fr-FR")}${this.unitTooltip ? " " + this.unitTooltip : ""}` : "Pas de donnees";
    return z`
      <div class="gouv-world-map__tooltip"
        style="position: absolute; left: ${this._tooltipX}px; top: ${this._tooltipY}px;
          pointer-events: none; z-index: 10;
          background: var(--background-default-grey, #fff);
          color: var(--text-default-grey, #161616);
          border: 1px solid var(--border-default-grey, #ddd);
          border-radius: 4px; padding: 4px 8px; font-size: 0.8125rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15); white-space: nowrap;">
        <strong>${t}</strong><br/>
        ${i}
      </div>
    `;
  }
  _renderLegend(s, t) {
    if (s.length === 0)
      return F;
    const e = this._getChoroplethPalette(), i = [...s].sort((L, d) => L - d), M = i[0], n = i[i.length - 1];
    return z`
      <div class="gouv-world-map__legend" style="display: flex; align-items: center; gap: 4px;
        margin-top: 8px; font-size: 0.75rem; color: var(--text-mention-grey, #666);">
        ${this.name ? z`<span style="margin-right: 4px; font-weight: 500;">${this.name}</span>` : F}
        <span>${M.toLocaleString("fr-FR")}</span>
        <div style="display: flex; height: 12px; border-radius: 2px; overflow: hidden;">
          ${e.map((L) => z`<div style="width: 20px; background: ${L};"></div>`)}
        </div>
        <span>${n.toLocaleString("fr-FR")}</span>
        ${this.unitTooltip ? z`<span>${this.unitTooltip}</span>` : F}
      </div>
    `;
  }
  _getAriaLabel() {
    const s = this._data.length;
    return `Carte ${this._zoomedContinent ? RM[this._zoomedContinent] || this._zoomedContinent : "monde"}, ${s} valeurs`;
  }
  render() {
    return this._sourceLoading ? z`
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
      ` : this._sourceError ? z`
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
      ` : this._topology ? !this._data || this._data.length === 0 ? this._renderMap() : this._renderMap() : z`
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
      `;
  }
}, a(xt, "GouvWorldMap"), xt);
rs([
  y({ type: String })
], is.prototype, "source", void 0);
rs([
  y({ type: String, attribute: "code-field" })
], is.prototype, "codeField", void 0);
rs([
  y({ type: String, attribute: "value-field" })
], is.prototype, "valueField", void 0);
rs([
  y({ type: String, attribute: "code-format" })
], is.prototype, "codeFormat", void 0);
rs([
  y({ type: String })
], is.prototype, "name", void 0);
rs([
  y({ type: String, attribute: "selected-palette" })
], is.prototype, "selectedPalette", void 0);
rs([
  y({ type: String, attribute: "unit-tooltip" })
], is.prototype, "unitTooltip", void 0);
rs([
  y({ type: String })
], is.prototype, "zoom", void 0);
rs([
  D()
], is.prototype, "_data", void 0);
rs([
  D()
], is.prototype, "_topology", void 0);
rs([
  D()
], is.prototype, "_zoomedContinent", void 0);
rs([
  D()
], is.prototype, "_hoveredCountryId", void 0);
rs([
  D()
], is.prototype, "_tooltipX", void 0);
rs([
  D()
], is.prototype, "_tooltipY", void 0);
is = rs([
  ss("gouv-world-map")
], is);
var qs = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
};
let N0 = 0;
var zt;
let vs = (zt = class extends Ct(Q) {
  constructor() {
    super(...arguments), this.source = "", this.for = "", this.filename = "donnees.csv", this.label = "Telecharger les donnees (CSV)", this.buttonLabel = "", this.noAutoAria = !1, this._previousForTarget = null;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-raw-data"), this._ensureId(), this._applyAria();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._removeAria();
  }
  updated(s) {
    super.updated(s), (s.has("for") || s.has("noAutoAria")) && (this._removeAria(), this._applyAria());
  }
  _ensureId() {
    this.id || (this.id = `gouv-raw-data-${++N0}`);
  }
  _applyAria() {
    if (this.noAutoAria || !this.for)
      return;
    const s = document.getElementById(this.for);
    if (!s)
      return;
    this._previousForTarget = s;
    const t = s.getAttribute("aria-describedby") || "";
    if (!t.split(/\s+/).includes(this.id)) {
      const e = t ? `${t} ${this.id}` : this.id;
      s.setAttribute("aria-describedby", e);
    }
  }
  _removeAria() {
    if (!this._previousForTarget)
      return;
    const s = this._previousForTarget, e = (s.getAttribute("aria-describedby") || "").split(/\s+/).filter((i) => i !== this.id);
    e.length > 0 ? s.setAttribute("aria-describedby", e.join(" ")) : s.removeAttribute("aria-describedby"), this._previousForTarget = null;
  }
  _handleDownload() {
    const s = this._sourceData;
    if (!s || !Array.isArray(s) || s.length === 0)
      return;
    const t = this._buildCsv(s);
    this._triggerDownload(t);
  }
  _buildCsv(s) {
    const t = Object.keys(s[0]), e = t.join(";"), i = s.map((M) => t.map((n) => {
      const L = String(M[n] ?? "");
      return L.includes(";") || L.includes('"') ? `"${L.replace(/"/g, '""')}"` : L;
    }).join(";"));
    return [e, ...i].join(`
`);
  }
  _triggerDownload(s) {
    const t = new Blob([s], { type: "text/csv;charset=utf-8;" }), e = URL.createObjectURL(t), i = document.createElement("a");
    i.href = e, i.download = this.filename, i.click(), URL.revokeObjectURL(e);
  }
  render() {
    const s = Array.isArray(this._sourceData) && this._sourceData.length > 0, t = this._sourceLoading, e = this.buttonLabel ? "fr-btn fr-btn--secondary fr-btn--sm fr-btn--icon-left fr-icon-download-line" : "fr-btn fr-btn--secondary fr-btn--sm fr-icon-download-line";
    return z`
      <div class="gouv-raw-data" role="complementary"
           aria-label="${this.label}">
        <button
          class="${e}"
          @click="${this._handleDownload}"
          ?disabled="${!s || t}"
          title="${this.label}"
        >
          ${this.buttonLabel || this.label}
        </button>
      </div>
      <style>
        .gouv-raw-data {
          margin-top: 0.5rem;
        }
      </style>
    `;
  }
}, a(zt, "GouvRawData"), zt);
qs([
  y({ type: String })
], vs.prototype, "source", void 0);
qs([
  y({ type: String, attribute: "for" })
], vs.prototype, "for", void 0);
qs([
  y({ type: String })
], vs.prototype, "filename", void 0);
qs([
  y({ type: String })
], vs.prototype, "label", void 0);
qs([
  y({ type: String, attribute: "button-label" })
], vs.prototype, "buttonLabel", void 0);
qs([
  y({ type: Boolean, attribute: "no-auto-aria" })
], vs.prototype, "noAutoAria", void 0);
vs = qs([
  ss("gouv-raw-data")
], vs);
var Us = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, wt;
let Cs = (wt = class extends Q {
  constructor() {
    super(...arguments), this._open = !1, this._tab = "login", this._error = "", this._loading = !1, this._email = "", this._password = "", this._displayName = "";
  }
  // Light DOM for DSFR
  createRenderRoot() {
    return this;
  }
  open(s = "login") {
    this._tab = s, this._error = "", this._email = "", this._password = "", this._displayName = "", this._open = !0;
  }
  close() {
    this._open = !1;
  }
  async _handleSubmit(s) {
    s.preventDefault(), this._error = "", this._loading = !0;
    try {
      if (this._tab === "login") {
        const t = await tn({ email: this._email, password: this._password });
        if (!t.success) {
          this._error = t.error || "Identifiants incorrects";
          return;
        }
      } else {
        if (!this._displayName.trim()) {
          this._error = "Le nom est requis";
          return;
        }
        const t = await en({
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
  _switchTab(s) {
    this._tab = s, this._error = "";
  }
  render() {
    if (!this._open)
      return F;
    const s = this._tab === "login";
    return z`
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
                    ${s ? "Connexion" : "Inscription"}
                  </h1>

                  <!-- Tabs -->
                  <div class="fr-tabs" style="margin-bottom:1rem">
                    <ul class="fr-tabs__list" role="tablist">
                      <li role="presentation">
                        <button class="fr-tabs__tab ${s ? "fr-tabs__tab--selected" : ""}"
                                role="tab" aria-selected="${s}"
                                @click=${() => this._switchTab("login")}>
                          Connexion
                        </button>
                      </li>
                      <li role="presentation">
                        <button class="fr-tabs__tab ${s ? "" : "fr-tabs__tab--selected"}"
                                role="tab" aria-selected="${!s}"
                                @click=${() => this._switchTab("register")}>
                          Inscription
                        </button>
                      </li>
                    </ul>
                  </div>

                  ${this._error ? z`
                    <div class="fr-alert fr-alert--error fr-alert--sm" style="margin-bottom:1rem">
                      <p>${this._error}</p>
                    </div>
                  ` : F}

                  <form @submit=${this._handleSubmit}>
                    ${s ? F : z`
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
                             autocomplete="${s ? "current-password" : "new-password"}"
                             minlength="6"
                             .value=${this._password}
                             @input=${(t) => {
      this._password = t.target.value;
    }}
                             required>
                      ${s ? F : z`<p class="fr-hint-text">6 caracteres minimum</p>`}
                    </div>

                    <div class="fr-input-group" style="margin-top:1.5rem">
                      <button class="fr-btn" type="submit" ?disabled=${this._loading}
                              style="width:100%">
                        ${this._loading ? "Chargement..." : s ? "Se connecter" : "S'inscrire"}
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
}, a(wt, "AuthModal"), wt);
Us([
  D()
], Cs.prototype, "_open", void 0);
Us([
  D()
], Cs.prototype, "_tab", void 0);
Us([
  D()
], Cs.prototype, "_error", void 0);
Us([
  D()
], Cs.prototype, "_loading", void 0);
Us([
  D()
], Cs.prototype, "_email", void 0);
Us([
  D()
], Cs.prototype, "_password", void 0);
Us([
  D()
], Cs.prototype, "_displayName", void 0);
Cs = Us([
  ss("auth-modal")
], Cs);
var Ot = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, bt;
let Ps = (bt = class extends Q {
  constructor() {
    super(...arguments), this.currentPage = "", this.basePath = "", this._favCount = 0, this._user = null, this._dbMode = !1;
  }
  // Light DOM pour hériter des styles DSFR
  createRenderRoot() {
    return this;
  }
  /** Normalized base path with trailing slash */
  get _base() {
    const s = this.basePath;
    return s ? s.endsWith("/") ? s : s + "/" : "";
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const s = JSON.parse(localStorage.getItem("gouv-widgets-favorites") || "[]");
      this._favCount = Array.isArray(s) ? s.length : 0;
    } catch {
    }
    if (!document.getElementById("app-header-active-style")) {
      const s = document.createElement("style");
      s.id = "app-header-active-style", s.textContent = '.fr-nav__link[aria-current="page"]{font-weight:700;border-bottom:2px solid var(--border-action-high-blue-france);color:var(--text-action-high-blue-france)}', document.head.appendChild(s);
    }
    this._initAuth();
  }
  disconnectedCallback() {
    var s;
    super.disconnectedCallback(), (s = this._unsubAuth) == null || s.call(this);
  }
  async _initAuth() {
    try {
      const s = await Kr();
      this._dbMode = await er(), this._user = s.user, this._unsubAuth = rn((t) => {
        this._user = t.user;
      });
    } catch {
    }
  }
  _openAuthModal() {
    const s = this.querySelector("auth-modal");
    s == null || s.open("login");
  }
  async _handleLogout() {
    await Mn(), window.location.reload();
  }
  _getNavItems() {
    return [
      { id: "accueil", label: "Accueil", href: "index.html" },
      { id: "composants", label: "Composants", href: "specs/index.html" },
      { id: "sources", label: "Sources", href: "apps/sources/index.html" },
      { id: "builder", label: "Builder", href: "apps/builder/index.html" },
      { id: "builder-ia", label: "Builder IA", href: "apps/builder-ia/index.html" },
      { id: "playground", label: "Playground", href: "apps/playground/index.html" },
      { id: "dashboard", label: "Dashboard", href: "apps/dashboard/index.html" },
      { id: "monitoring", label: "Monitoring", href: "apps/monitoring/index.html" }
    ];
  }
  _renderAuthButton() {
    return this._dbMode ? this._user ? z`
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
      ` : z`
      <li>
        <button class="fr-btn fr-btn--tertiary-no-outline fr-icon-account-circle-line"
                @click=${this._openAuthModal}>
          Connexion
        </button>
      </li>
    ` : F;
  }
  render() {
    const s = this._getNavItems();
    return z`
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
                        Favoris${this._favCount > 0 ? z` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>` : F}
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
                ${s.map((t) => z`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this._base}${t.href}"
                       ${this.currentPage === t.id ? z`aria-current="page"` : ""}>
                      ${t.label}
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      ${this._dbMode ? z`<auth-modal></auth-modal>` : F}
    `;
  }
}, a(bt, "AppHeader"), bt);
Ot([
  y({ type: String, attribute: "current-page" })
], Ps.prototype, "currentPage", void 0);
Ot([
  y({ type: String, attribute: "base-path" })
], Ps.prototype, "basePath", void 0);
Ot([
  D()
], Ps.prototype, "_favCount", void 0);
Ot([
  D()
], Ps.prototype, "_user", void 0);
Ot([
  D()
], Ps.prototype, "_dbMode", void 0);
Ps = Ot([
  ss("app-header")
], Ps);
var fr = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, ut;
let pi = (ut = class extends Q {
  constructor() {
    super(...arguments), this.basePath = "";
  }
  get _base() {
    const s = this.basePath;
    return s ? s.endsWith("/") ? s : s + "/" : "";
  }
  // Light DOM pour hériter des styles DSFR
  createRenderRoot() {
    return this;
  }
  render() {
    return z`
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
}, a(ut, "AppFooter"), ut);
fr([
  y({ type: String, attribute: "base-path" })
], pi.prototype, "basePath", void 0);
pi = fr([
  ss("app-footer")
], pi);
var Et = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, St;
let Gs = (St = class extends Q {
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
    const s = this.querySelector(".builder-layout-left"), t = this.querySelector(".builder-layout-right");
    s && t && (this._leftContent.forEach((e) => s.appendChild(e)), this._rightContent.forEach((e) => t.appendChild(e)), this._contentMoved = !0);
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
  _handleMouseDown(s) {
    s.preventDefault(), this._isResizing = !0, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none", this._boundMouseMove && document.addEventListener("mousemove", this._boundMouseMove), this._boundMouseUp && document.addEventListener("mouseup", this._boundMouseUp);
  }
  _handleMouseMove(s) {
    if (!this._isResizing)
      return;
    const t = this.querySelector(".builder-layout-container");
    if (!t)
      return;
    const e = t.getBoundingClientRect(), i = e.width;
    let M = s.clientX - e.left;
    M = Math.max(this.minLeftWidth, Math.min(M, i - this.minRightWidth)), this._currentLeftRatio = M / i * 100, this.requestUpdate();
  }
  _handleMouseUp() {
    this._isResizing && (this._isResizing = !1, document.body.style.cursor = "", document.body.style.userSelect = "", this._boundMouseMove && document.removeEventListener("mousemove", this._boundMouseMove), this._boundMouseUp && document.removeEventListener("mouseup", this._boundMouseUp));
  }
  render() {
    return z`
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
    `;
  }
}, a(St, "AppLayoutBuilder"), St);
Et([
  y({ type: Number, attribute: "left-ratio" })
], Gs.prototype, "leftRatio", void 0);
Et([
  y({ type: Number, attribute: "min-left-width" })
], Gs.prototype, "minLeftWidth", void 0);
Et([
  y({ type: Number, attribute: "min-right-width" })
], Gs.prototype, "minRightWidth", void 0);
Et([
  D()
], Gs.prototype, "_isResizing", void 0);
Et([
  D()
], Gs.prototype, "_currentLeftRatio", void 0);
Gs = Et([
  ss("app-layout-builder")
], Gs);
var re = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, ht;
let jt = (ht = class extends Q {
  constructor() {
    super(...arguments), this.title = "", this.icon = "", this.activePath = "", this.basePath = "", this._contentElements = [], this._contentMoved = !1;
  }
  get _base() {
    const s = this.basePath;
    return s ? s.endsWith("/") ? s : s + "/" : "";
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
    const s = this.querySelector(".demo-content-slot");
    s && (this._contentElements.forEach((t) => s.appendChild(t)), this._contentMoved = !0);
  }
  _getMenuStructure() {
    return [
      { id: "overview", label: "Vue d'ensemble", href: "index.html" },
      {
        id: "apis",
        label: "API supportees",
        href: "#",
        children: [
          { id: "apis/opendatasoft", label: "OpenDataSoft", href: "apis/opendatasoft.html" },
          { id: "apis/tabular", label: "Tabular", href: "apis/tabular.html" },
          { id: "apis/grist", label: "Grist", href: "apis/grist.html" },
          { id: "apis/insee", label: "INSEE (Melodi)", href: "apis/insee.html" },
          { id: "apis/generic", label: "Generique (REST)", href: "apis/generic.html" }
        ]
      },
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
          { id: "components/gouv-world-map", label: "gouv-world-map", href: "components/gouv-world-map.html" },
          { id: "components/gouv-raw-data", label: "gouv-raw-data", href: "components/gouv-raw-data.html" },
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
  _isActive(s) {
    return this.activePath === s;
  }
  _isParentActive(s) {
    return s.children ? s.children.some((t) => this._isActive(t.id)) : !1;
  }
  _renderMenuItem(s) {
    const t = this._isActive(s.id), e = this._isParentActive(s);
    if (s.children) {
      const i = `fr-sidemenu-${s.id}`, M = e;
      return z`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${M}"
                  aria-controls="${i}">
            ${s.label}
          </button>
          <div class="fr-collapse ${M ? "fr-collapse--expanded" : ""}" id="${i}">
            <ul class="fr-sidemenu__list">
              ${s.children.map((n) => this._renderMenuItem(n))}
            </ul>
          </div>
        </li>
      `;
    } else
      return z`
        <li class="fr-sidemenu__item ${t ? "fr-sidemenu__item--active" : ""}">
          <a class="fr-sidemenu__link"
             href="${this._base}${s.href}"
             ${t ? z`aria-current="page"` : ""}>
            ${s.label}
          </a>
        </li>
      `;
  }
  _renderBreadcrumb() {
    if (!this.activePath || this.activePath === "overview")
      return "";
    const s = this.activePath.split("/"), t = [
      { label: "Composants", href: `${this._base}index.html` }
    ];
    if (s.length > 1) {
      const e = s[0] === "components" ? "Composants gouv-widgets" : "Composants dsfr-charts";
      t.push({ label: e, href: "#" });
    }
    return t.push({ label: this.title, href: "" }), z`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((e, i) => z`
              <li>
                ${i === t.length - 1 ? z`<a class="fr-breadcrumb__link" aria-current="page">${e.label}</a>` : z`<a class="fr-breadcrumb__link" href="${e.href}">${e.label}</a>`}
              </li>
            `)}
          </ol>
        </div>
      </nav>
    `;
  }
  render() {
    const s = this._getMenuStructure();
    return z`
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
                  ${s.map((t) => this._renderMenuItem(t))}
                </ul>
              </div>
            </div>
          </nav>

          <!-- Contenu principal -->
          <div class="demo-content">
            ${this._renderBreadcrumb()}

            ${this.title ? z`
              <h1>
                ${this.icon ? z`<span class="${this.icon} fr-mr-1w" aria-hidden="true"></span>` : ""}
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
}, a(ht, "AppLayoutDemo"), ht);
re([
  y({ type: String })
], jt.prototype, "title", void 0);
re([
  y({ type: String })
], jt.prototype, "icon", void 0);
re([
  y({ type: String, attribute: "active-path" })
], jt.prototype, "activePath", void 0);
re([
  y({ type: String, attribute: "base-path" })
], jt.prototype, "basePath", void 0);
jt = re([
  ss("app-layout-demo")
], jt);
var me = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, Ft;
let se = (Ft = class extends Q {
  constructor() {
    super(...arguments), this.section = "", this.activePath = "", this.basePath = "";
  }
  // Light DOM for DSFR style inheritance
  createRenderRoot() {
    return this;
  }
  get _base() {
    const s = this.basePath;
    return s ? s.endsWith("/") ? s : s + "/" : "";
  }
  _getMenu() {
    var s;
    return ((s = window.__APP_MENUS__) == null ? void 0 : s[this.section]) ?? [];
  }
  _getActivePath() {
    if (this.activePath)
      return this.activePath;
    const t = window.location.pathname.split("/").pop() || "", e = window.location.hash, i = this._getMenu();
    for (const M of i)
      for (const n of M.items) {
        const L = this._findMatchingItem(n, t, e);
        if (L)
          return L;
      }
    return "";
  }
  _findMatchingItem(s, t, e) {
    const i = s.href;
    if (e && i === t + e || i === t || e && i === e)
      return s.id;
    if (s.children) {
      for (const M of s.children) {
        const n = this._findMatchingItem(M, t, e);
        if (n)
          return n;
      }
      if (!e) {
        const M = s.children.find((n) => {
          const [L] = (n.href || "").split("#");
          return L === t;
        });
        if (M)
          return M.id;
      }
    }
    return null;
  }
  _isActive(s, t) {
    return t === s;
  }
  _isParentActive(s, t) {
    return s.children ? s.children.some((e) => this._isActive(e.id, t) || this._isParentActive(e, t)) : !1;
  }
  _renderItem(s, t) {
    const e = this._isActive(s.id, t);
    if (s.children) {
      const i = `fr-sidemenu-${s.id}`, M = this._isParentActive(s, t);
      return z`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${M}"
                  aria-controls="${i}">
            ${s.label}
          </button>
          <div class="fr-collapse ${M ? "fr-collapse--expanded" : ""}" id="${i}">
            <ul class="fr-sidemenu__list">
              ${s.children.map((n) => this._renderItem(n, t))}
            </ul>
          </div>
        </li>
      `;
    }
    return z`
      <li class="fr-sidemenu__item ${e ? "fr-sidemenu__item--active" : ""}">
        <a class="fr-sidemenu__link"
           href="${this._base}${s.href}"
           ${e ? z`aria-current="true"` : F}>
          ${s.label}
        </a>
      </li>
    `;
  }
  render() {
    const s = this._getMenu();
    if (!s.length)
      return F;
    const t = this._getActivePath();
    return z`
      <nav class="fr-sidemenu guide-sidemenu" role="navigation" aria-labelledby="app-sidemenu-title">
        <div class="fr-sidemenu__inner">
          <button class="fr-sidemenu__btn" hidden aria-controls="app-sidemenu-wrapper" aria-expanded="true">Menu</button>
          <div class="fr-collapse" id="app-sidemenu-wrapper">
            ${s.map((e, i) => z`
              ${e.title ? z`
                <div class="fr-sidemenu__title ${i > 0 ? "fr-mt-1w" : ""}"
                     id="${i === 0 ? "app-sidemenu-title" : `app-sidemenu-title-${i}`}">
                  ${e.title}
                </div>
              ` : F}
              <ul class="fr-sidemenu__list">
                ${e.items.map((M) => this._renderItem(M, t))}
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
    `;
  }
}, a(Ft, "AppSidemenu"), Ft);
me([
  y({ type: String })
], se.prototype, "section", void 0);
me([
  y({ type: String, attribute: "active-path" })
], se.prototype, "activePath", void 0);
me([
  y({ type: String, attribute: "base-path" })
], se.prototype, "basePath", void 0);
se = me([
  ss("app-sidemenu")
], se);
var Ks = function(r, s, t, e) {
  var i = arguments.length, M = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") M = Reflect.decorate(r, s, t, e);
  else for (var L = r.length - 1; L >= 0; L--) (n = r[L]) && (M = (i < 3 ? n(M) : i > 3 ? n(s, t, M) : n(s, t)) || M);
  return i > 3 && M && Object.defineProperty(s, t, M), M;
}, Dt;
let _s = (Dt = class extends Q {
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
    const s = this.querySelector("#tab-preview"), t = this.querySelector("#tab-code"), e = this.querySelector("#tab-data");
    s && this._previewContent.forEach((i) => s.appendChild(i)), t && this._codeContent.forEach((i) => t.appendChild(i)), e && this._dataContent.forEach((i) => e.appendChild(i)), this._contentMoved = !0;
  }
  /**
   * Changer l'onglet actif programmatiquement
   */
  setActiveTab(s) {
    this._activeTab = s, this.requestUpdate();
  }
  /**
   * Obtenir l'onglet actif
   */
  getActiveTab() {
    return this._activeTab;
  }
  _handleTabClick(s) {
    this._activeTab = s, this.dispatchEvent(new CustomEvent("tab-change", {
      detail: { tab: s },
      bubbles: !0,
      composed: !0
    })), this.requestUpdate();
  }
  _getTabLabels() {
    return this.tabLabels.split(",").map((s) => s.trim());
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
    const s = this._getTabLabels(), [t, e, i] = s;
    return z`
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
            ${e || "Code"}
          </button>
          ${this.showDataTab ? z`
            <button
              class="preview-panel-tab ${this._activeTab === "data" ? "active" : ""}"
              data-tab="data"
              @click="${() => this._handleTabClick("data")}">
              ${i || "Données"}
            </button>
          ` : F}
          ${this.showPlaygroundButton ? z`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          ` : F}
          ${this.showSaveButton ? z`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          ` : F}
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
}, a(Dt, "AppPreviewPanel"), Dt);
Ks([
  y({ type: Boolean, attribute: "show-data-tab" })
], _s.prototype, "showDataTab", void 0);
Ks([
  y({ type: Boolean, attribute: "show-save-button" })
], _s.prototype, "showSaveButton", void 0);
Ks([
  y({ type: Boolean, attribute: "show-playground-button" })
], _s.prototype, "showPlaygroundButton", void 0);
Ks([
  y({ type: String, attribute: "tab-labels" })
], _s.prototype, "tabLabels", void 0);
Ks([
  y({ type: String, attribute: "active-tab" })
], _s.prototype, "activeTab", void 0);
Ks([
  D()
], _s.prototype, "_activeTab", void 0);
_s = Ks([
  ss("app-preview-panel")
], _s);
function T0(r, s, t) {
  return r.map((e) => ({
    label: String($(e, s) ?? "N/A"),
    value: Number($(e, t)) || 0
  }));
}
a(T0, "extractLabelValues");
function y0(r, s) {
  if (s === "none")
    return r;
  const t = /* @__PURE__ */ new Map();
  for (const i of r) {
    const M = t.get(i.label) || [];
    M.push(i.value), t.set(i.label, M);
  }
  const e = [];
  for (const [i, M] of t)
    e.push({ label: i, value: x0(M, s) });
  return e;
}
a(y0, "aggregateByLabel");
function x0(r, s) {
  switch (s) {
    case "sum":
      return r.reduce((t, e) => t + e, 0);
    case "avg":
      return r.reduce((t, e) => t + e, 0) / r.length;
    case "count":
      return r.length;
    case "min":
      return Math.min(...r);
    case "max":
      return Math.max(...r);
    default:
      return r[0] || 0;
  }
}
a(x0, "computeGroupValue");
function z0(r, s) {
  return s === "none" ? r : [...r].sort((t, e) => s === "desc" ? e.value - t.value : t.value - e.value);
}
a(z0, "sortByValue");
function F0(r, s, t, e = "none", i = "none", M = 0) {
  if (!r || r.length === 0)
    return { labels: [], values: [] };
  let n = T0(r, s, t);
  return n = y0(n, e), n = z0(n, i), M > 0 && (n = n.slice(0, M)), {
    labels: n.map((L) => L.label),
    values: n.map((L) => Math.round(L.value * 100) / 100)
  };
}
a(F0, "processChartData");
export {
  pi as AppFooter,
  Ps as AppHeader,
  Gs as AppLayoutBuilder,
  jt as AppLayoutDemo,
  cs as DATA_EVENTS,
  H as GouvDatalist,
  ls as GouvDisplay,
  Y as GouvDsfrChart,
  k as GouvFacets,
  os as GouvKpi,
  ws as GouvNormalize,
  ts as GouvQuery,
  vs as GouvRawData,
  G as GouvSearch,
  _ as GouvSource,
  is as GouvWorldMap,
  Ct as SourceSubscriberMixin,
  y0 as aggregateByLabel,
  FM as computeAggregation,
  Xs as dispatchDataError,
  Ns as dispatchDataLoaded,
  ms as dispatchDataLoading,
  T0 as extractLabelValues,
  ln as formatCurrency,
  h0 as formatDate,
  hM as formatNumber,
  on as formatPercentage,
  SM as formatValue,
  Ln as getAdapter,
  $ as getByPath,
  u0 as getByPathOrDefault,
  Rs as getDataCache,
  b0 as hasPath,
  Nn as parseExpression,
  F0 as processChartData,
  S0 as registerAdapter,
  z0 as sortByValue,
  Me as subscribeToSource
};
