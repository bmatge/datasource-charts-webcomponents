var EM = Object.defineProperty;
var o = (M, s) => EM(M, "name", { value: s, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he = globalThis, gi = he.ShadowRoot && (he.ShadyCSS === void 0 || he.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Xi = Symbol(), er = /* @__PURE__ */ new WeakMap();
var nt;
let sM = (nt = class {
  constructor(s, t, e) {
    if (this._$cssResult$ = !0, e !== Xi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = s, this.t = t;
  }
  get styleSheet() {
    let s = this.o;
    const t = this.t;
    if (gi && s === void 0) {
      const e = t !== void 0 && t.length === 1;
      e && (s = er.get(t)), s === void 0 && ((this.o = s = new CSSStyleSheet()).replaceSync(this.cssText), e && er.set(t, s));
    }
    return s;
  }
  toString() {
    return this.cssText;
  }
}, o(nt, "n"), nt);
const mM = /* @__PURE__ */ o((M) => new sM(typeof M == "string" ? M : M + "", void 0, Xi), "r$4"), ji = /* @__PURE__ */ o((M, ...s) => {
  const t = M.length === 1 ? M[0] : s.reduce((e, i, r) => e + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + M[r + 1], M[0]);
  return new sM(t, M, Xi);
}, "i$3"), vM = /* @__PURE__ */ o((M, s) => {
  if (gi) M.adoptedStyleSheets = s.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of s) {
    const e = document.createElement("style"), i = he.litNonce;
    i !== void 0 && e.setAttribute("nonce", i), e.textContent = t.cssText, M.appendChild(e);
  }
}, "S$1"), ir = gi ? (M) => M : (M) => M instanceof CSSStyleSheet ? ((s) => {
  let t = "";
  for (const e of s.cssRules) t += e.cssText;
  return mM(t);
})(M) : M;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _M, defineProperty: UM, getOwnPropertyDescriptor: VM, getOwnPropertyNames: AM, getOwnPropertySymbols: QM, getPrototypeOf: kM } = Object, _s = globalThis, rr = _s.trustedTypes, YM = rr ? rr.emptyScript : "", Ue = _s.reactiveElementPolyfillSupport, Rt = /* @__PURE__ */ o((M, s) => M, "d$1"), Fe = { toAttribute(M, s) {
  switch (s) {
    case Boolean:
      M = M ? YM : null;
      break;
    case Object:
    case Array:
      M = M == null ? M : JSON.stringify(M);
  }
  return M;
}, fromAttribute(M, s) {
  let t = M;
  switch (s) {
    case Boolean:
      t = M !== null;
      break;
    case Number:
      t = M === null ? null : Number(M);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(M);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ci = /* @__PURE__ */ o((M, s) => !_M(M, s), "f$1"), Mr = { attribute: !0, type: String, converter: Fe, reflect: !1, useDefault: !1, hasChanged: Ci };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _s.litPropertyMetadata ?? (_s.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var at;
let it = (at = class extends HTMLElement {
  static addInitializer(s) {
    this._$Ei(), (this.l ?? (this.l = [])).push(s);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(s, t = Mr) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(s) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(s, t), !t.noAccessor) {
      const e = Symbol(), i = this.getPropertyDescriptor(s, e, t);
      i !== void 0 && UM(this.prototype, s, i);
    }
  }
  static getPropertyDescriptor(s, t, e) {
    const { get: i, set: r } = VM(this.prototype, s) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: i, set(n) {
      const a = i == null ? void 0 : i.call(this);
      r == null || r.call(this, n), this.requestUpdate(s, a, e);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(s) {
    return this.elementProperties.get(s) ?? Mr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Rt("elementProperties"))) return;
    const s = kM(this);
    s.finalize(), s.l !== void 0 && (this.l = [...s.l]), this.elementProperties = new Map(s.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Rt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Rt("properties"))) {
      const t = this.properties, e = [...AM(t), ...QM(t)];
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
      for (const i of e) t.unshift(ir(i));
    } else s !== void 0 && t.push(ir(s));
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
    return vM(s, this.constructor.elementStyles), s;
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
    var r;
    const e = this.constructor.elementProperties.get(s), i = this.constructor._$Eu(s, e);
    if (i !== void 0 && e.reflect === !0) {
      const n = (((r = e.converter) == null ? void 0 : r.toAttribute) !== void 0 ? e.converter : Fe).toAttribute(t, e.type);
      this._$Em = s, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(s, t) {
    var r, n;
    const e = this.constructor, i = e._$Eh.get(s);
    if (i !== void 0 && this._$Em !== i) {
      const a = e.getPropertyOptions(i), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : Fe;
      this._$Em = i;
      const d = c.fromAttribute(t, a.type);
      this[i] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(s, t, e, i = !1, r) {
    var n;
    if (s !== void 0) {
      const a = this.constructor;
      if (i === !1 && (r = this[s]), e ?? (e = a.getPropertyOptions(s)), !((e.hasChanged ?? Ci)(r, t) || e.useDefault && e.reflect && r === ((n = this._$Ej) == null ? void 0 : n.get(s)) && !this.hasAttribute(a._$Eu(s, e)))) return;
      this.C(s, t, e);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(s, t, { useDefault: e, reflect: i, wrapped: r }, n) {
    e && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(s) && (this._$Ej.set(s, n ?? t ?? this[s]), r !== !0 || n !== void 0) || (this._$AL.has(s) || (this.hasUpdated || e || (t = void 0), this._$AL.set(s, t)), i === !0 && this._$Em !== s && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(s));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: a } = n, c = this[r];
        a !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
      }
    }
    let s = !1;
    const t = this._$AL;
    try {
      s = this.shouldUpdate(t), s ? (this.willUpdate(t), (e = this._$EO) == null || e.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
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
}, o(at, "y"), at);
it.elementStyles = [], it.shadowRootOptions = { mode: "open" }, it[Rt("elementProperties")] = /* @__PURE__ */ new Map(), it[Rt("finalized")] = /* @__PURE__ */ new Map(), Ue == null || Ue({ ReactiveElement: it }), (_s.reactiveElementVersions ?? (_s.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = globalThis, nr = /* @__PURE__ */ o((M) => M, "i$1"), De = Bt.trustedTypes, ar = De ? De.createPolicy("lit-html", { createHTML: /* @__PURE__ */ o((M) => M, "createHTML") }) : void 0, tM = "$lit$", vs = `lit$${Math.random().toFixed(9).slice(2)}$`, eM = "?" + vs, JM = `<${eM}>`, Zs = document, Zt = /* @__PURE__ */ o(() => Zs.createComment(""), "c"), Pt = /* @__PURE__ */ o((M) => M === null || typeof M != "object" && typeof M != "function", "a"), Oi = Array.isArray, $M = /* @__PURE__ */ o((M) => Oi(M) || typeof (M == null ? void 0 : M[Symbol.iterator]) == "function", "d"), Ve = `[ 	
\f\r]`, _t = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, or = /-->/g, Lr = />/g, Ys = RegExp(`>|${Ve}(?:([^\\s"'>=/]+)(${Ve}*=${Ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), lr = /'/g, dr = /"/g, iM = /^(?:script|style|textarea|title)$/i, rM = /* @__PURE__ */ o((M) => (s, ...t) => ({ _$litType$: M, strings: s, values: t }), "x"), z = rM(1), cr = rM(2), Wt = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), Nr = /* @__PURE__ */ new WeakMap(), Js = Zs.createTreeWalker(Zs, 129);
function MM(M, s) {
  if (!Oi(M) || !M.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ar !== void 0 ? ar.createHTML(s) : s;
}
o(MM, "V");
const RM = /* @__PURE__ */ o((M, s) => {
  const t = M.length - 1, e = [];
  let i, r = s === 2 ? "<svg>" : s === 3 ? "<math>" : "", n = _t;
  for (let a = 0; a < t; a++) {
    const c = M[a];
    let d, L, l = -1, N = 0;
    for (; N < c.length && (n.lastIndex = N, L = n.exec(c), L !== null); ) N = n.lastIndex, n === _t ? L[1] === "!--" ? n = or : L[1] !== void 0 ? n = Lr : L[2] !== void 0 ? (iM.test(L[2]) && (i = RegExp("</" + L[2], "g")), n = Ys) : L[3] !== void 0 && (n = Ys) : n === Ys ? L[0] === ">" ? (n = i ?? _t, l = -1) : L[1] === void 0 ? l = -2 : (l = n.lastIndex - L[2].length, d = L[1], n = L[3] === void 0 ? Ys : L[3] === '"' ? dr : lr) : n === dr || n === lr ? n = Ys : n === or || n === Lr ? n = _t : (n = Ys, i = void 0);
    const T = n === Ys && M[a + 1].startsWith("/>") ? " " : "";
    r += n === _t ? c + JM : l >= 0 ? (e.push(d), c.slice(0, l) + tM + c.slice(l) + vs + T) : c + vs + (l === -2 ? a : T);
  }
  return [MM(M, r + (M[t] || "<?>") + (s === 2 ? "</svg>" : s === 3 ? "</math>" : "")), e];
}, "N"), Ee = class Ee {
  constructor({ strings: s, _$litType$: t }, e) {
    let i;
    this.parts = [];
    let r = 0, n = 0;
    const a = s.length - 1, c = this.parts, [d, L] = RM(s, t);
    if (this.el = Ee.createElement(d, e), Js.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = Js.nextNode()) !== null && c.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(tM)) {
          const N = L[n++], T = i.getAttribute(l).split(vs), x = /([.?@])?(.*)/.exec(N);
          c.push({ type: 1, index: r, name: x[2], strings: T, ctor: x[1] === "." ? ei : x[1] === "?" ? ii : x[1] === "@" ? ri : gt }), i.removeAttribute(l);
        } else l.startsWith(vs) && (c.push({ type: 6, index: r }), i.removeAttribute(l));
        if (iM.test(i.tagName)) {
          const l = i.textContent.split(vs), N = l.length - 1;
          if (N > 0) {
            i.textContent = De ? De.emptyScript : "";
            for (let T = 0; T < N; T++) i.append(l[T], Zt()), Js.nextNode(), c.push({ type: 2, index: ++r });
            i.append(l[N], Zt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === eM) c.push({ type: 2, index: r });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(vs, l + 1)) !== -1; ) c.push({ type: 7, index: r }), l += vs.length - 1;
      }
      r++;
    }
  }
  static createElement(s, t) {
    const e = Zs.createElement("template");
    return e.innerHTML = s, e;
  }
};
o(Ee, "S");
let Gt = Ee;
function ft(M, s, t = M, e) {
  var n, a;
  if (s === Wt) return s;
  let i = e !== void 0 ? (n = t._$Co) == null ? void 0 : n[e] : t._$Cl;
  const r = Pt(s) ? void 0 : s._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), r === void 0 ? i = void 0 : (i = new r(M), i._$AT(M, t, e)), e !== void 0 ? (t._$Co ?? (t._$Co = []))[e] = i : t._$Cl = i), i !== void 0 && (s = ft(M, i._$AS(M, s.values), i, e)), s;
}
o(ft, "M");
const ki = class ki {
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
    const { el: { content: t }, parts: e } = this._$AD, i = ((s == null ? void 0 : s.creationScope) ?? Zs).importNode(t, !0);
    Js.currentNode = i;
    let r = Js.nextNode(), n = 0, a = 0, c = e[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let d;
        c.type === 2 ? d = new Ht(r, r.nextSibling, this, s) : c.type === 1 ? d = new c.ctor(r, c.name, c.strings, this, s) : c.type === 6 && (d = new Mi(r, this, s)), this._$AV.push(d), c = e[++a];
      }
      n !== (c == null ? void 0 : c.index) && (r = Js.nextNode(), n++);
    }
    return Js.currentNode = Zs, i;
  }
  p(s) {
    let t = 0;
    for (const e of this._$AV) e !== void 0 && (e.strings !== void 0 ? (e._$AI(s, e, t), t += e.strings.length - 2) : e._$AI(s[t])), t++;
  }
};
o(ki, "R");
let ti = ki;
const me = class me {
  get _$AU() {
    var s;
    return ((s = this._$AM) == null ? void 0 : s._$AU) ?? this._$Cv;
  }
  constructor(s, t, e, i) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = s, this._$AB = t, this._$AM = e, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    s = ft(this, s, t), Pt(s) ? s === h || s == null || s === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : s !== this._$AH && s !== Wt && this._(s) : s._$litType$ !== void 0 ? this.$(s) : s.nodeType !== void 0 ? this.T(s) : $M(s) ? this.k(s) : this._(s);
  }
  O(s) {
    return this._$AA.parentNode.insertBefore(s, this._$AB);
  }
  T(s) {
    this._$AH !== s && (this._$AR(), this._$AH = this.O(s));
  }
  _(s) {
    this._$AH !== h && Pt(this._$AH) ? this._$AA.nextSibling.data = s : this.T(Zs.createTextNode(s)), this._$AH = s;
  }
  $(s) {
    var r;
    const { values: t, _$litType$: e } = s, i = typeof e == "number" ? this._$AC(s) : (e.el === void 0 && (e.el = Gt.createElement(MM(e.h, e.h[0]), this.options)), e);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(t);
    else {
      const n = new ti(i, this), a = n.u(this.options);
      n.p(t), this.T(a), this._$AH = n;
    }
  }
  _$AC(s) {
    let t = Nr.get(s.strings);
    return t === void 0 && Nr.set(s.strings, t = new Gt(s)), t;
  }
  k(s) {
    Oi(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let e, i = 0;
    for (const r of s) i === t.length ? t.push(e = new me(this.O(Zt()), this.O(Zt()), this, this.options)) : e = t[i], e._$AI(r), i++;
    i < t.length && (this._$AR(e && e._$AB.nextSibling, i), t.length = i);
  }
  _$AR(s = this._$AA.nextSibling, t) {
    var e;
    for ((e = this._$AP) == null ? void 0 : e.call(this, !1, !0, t); s !== this._$AB; ) {
      const i = nr(s).nextSibling;
      nr(s).remove(), s = i;
    }
  }
  setConnected(s) {
    var t;
    this._$AM === void 0 && (this._$Cv = s, (t = this._$AP) == null || t.call(this, s));
  }
};
o(me, "k");
let Ht = me;
const Yi = class Yi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(s, t, e, i, r) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = s, this.name = t, this._$AM = i, this.options = r, e.length > 2 || e[0] !== "" || e[1] !== "" ? (this._$AH = Array(e.length - 1).fill(new String()), this.strings = e) : this._$AH = h;
  }
  _$AI(s, t = this, e, i) {
    const r = this.strings;
    let n = !1;
    if (r === void 0) s = ft(this, s, t, 0), n = !Pt(s) || s !== this._$AH && s !== Wt, n && (this._$AH = s);
    else {
      const a = s;
      let c, d;
      for (s = r[0], c = 0; c < r.length - 1; c++) d = ft(this, a[e + c], t, c), d === Wt && (d = this._$AH[c]), n || (n = !Pt(d) || d !== this._$AH[c]), d === h ? s = h : s !== h && (s += (d ?? "") + r[c + 1]), this._$AH[c] = d;
    }
    n && !i && this.j(s);
  }
  j(s) {
    s === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, s ?? "");
  }
};
o(Yi, "H");
let gt = Yi;
const Ji = class Ji extends gt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(s) {
    this.element[this.name] = s === h ? void 0 : s;
  }
};
o(Ji, "I");
let ei = Ji;
const $i = class $i extends gt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(s) {
    this.element.toggleAttribute(this.name, !!s && s !== h);
  }
};
o($i, "L");
let ii = $i;
const Ri = class Ri extends gt {
  constructor(s, t, e, i, r) {
    super(s, t, e, i, r), this.type = 5;
  }
  _$AI(s, t = this) {
    if ((s = ft(this, s, t, 0) ?? h) === Wt) return;
    const e = this._$AH, i = s === h && e !== h || s.capture !== e.capture || s.once !== e.once || s.passive !== e.passive, r = s !== h && (e === h || i);
    i && this.element.removeEventListener(this.name, this, e), r && this.element.addEventListener(this.name, this, s), this._$AH = s;
  }
  handleEvent(s) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, s) : this._$AH.handleEvent(s);
  }
};
o(Ri, "z");
let ri = Ri;
const Bi = class Bi {
  constructor(s, t, e) {
    this.element = s, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = e;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(s) {
    ft(this, s);
  }
};
o(Bi, "Z");
let Mi = Bi;
const Ae = Bt.litHtmlPolyfillSupport;
Ae == null || Ae(Gt, Ht), (Bt.litHtmlVersions ?? (Bt.litHtmlVersions = [])).push("3.3.2");
const BM = /* @__PURE__ */ o((M, s, t) => {
  const e = (t == null ? void 0 : t.renderBefore) ?? s;
  let i = e._$litPart$;
  if (i === void 0) {
    const r = (t == null ? void 0 : t.renderBefore) ?? null;
    e._$litPart$ = i = new Ht(s.insertBefore(Zt(), r), r, void 0, t ?? {});
  }
  return i._$AI(M), i;
}, "D");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rs = globalThis, Zi = class Zi extends it {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(s), this._$Do = BM(t, this.renderRoot, this.renderOptions);
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
    return Wt;
  }
};
o(Zi, "i");
let V = Zi;
var Kr;
V._$litElement$ = !0, V.finalized = !0, (Kr = Rs.litElementHydrateSupport) == null || Kr.call(Rs, { LitElement: V });
const Qe = Rs.litElementPolyfillSupport;
Qe == null || Qe({ LitElement: V });
(Rs.litElementVersions ?? (Rs.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = /* @__PURE__ */ o((M) => (s, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(M, s);
  }) : customElements.define(M, s);
}, "t");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ZM = { attribute: !0, type: String, converter: Fe, reflect: !1, hasChanged: Ci }, PM = /* @__PURE__ */ o((M = ZM, s, t) => {
  const { kind: e, metadata: i } = t;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), e === "setter" && ((M = Object.create(M)).wrapped = !0), r.set(t.name, M), e === "accessor") {
    const { name: n } = t;
    return { set(a) {
      const c = s.get.call(this);
      s.set.call(this, a), this.requestUpdate(n, c, M, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, M, a), a;
    } };
  }
  if (e === "setter") {
    const { name: n } = t;
    return function(a) {
      const c = this[n];
      s.call(this, a), this.requestUpdate(n, c, M, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + e);
}, "r$1");
function y(M) {
  return (s, t) => typeof t == "object" ? PM(M, s, t) : ((e, i, r) => {
    const n = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, e), n ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(M, s, t);
}
o(y, "n");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(M) {
  return y({ ...M, state: !0, attribute: !1 });
}
o(F, "r");
function B(M, s) {
  if (!s || s.trim() === "")
    return M;
  const e = s.replace(/\[(\d+)\]/g, ".$1").split(".");
  let i = M;
  for (const r of e) {
    if (i == null || typeof i != "object")
      return;
    i = i[r];
  }
  return i;
}
o(B, "getByPath");
function Wa(M, s) {
  return B(M, s) !== void 0;
}
o(Wa, "hasPath");
function Tr(M, s, t) {
  const i = s.replace(/\[(\d+)\]/g, ".$1").split(".");
  let r = M;
  for (let n = 0; n < i.length - 1; n++) {
    const a = i[n];
    (!(a in r) || typeof r[a] != "object" || r[a] === null) && (r[a] = {}), r = r[a];
  }
  r[i[i.length - 1]] = t;
}
o(Tr, "setByPath");
function fa(M, s, t) {
  const e = B(M, s);
  return e !== void 0 ? e : t;
}
o(fa, "getByPathOrDefault");
function ni(M) {
  return M ? String(M).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
}
o(ni, "escapeHtml");
function yr(M, s = !1) {
  if (typeof M == "number")
    return isNaN(M) ? s ? null : 0 : M;
  if (typeof M != "string")
    return s ? null : 0;
  let t = M.trim();
  if (t === "")
    return s ? null : 0;
  t = t.replace(/\s/g, "");
  const e = t.includes(","), i = t.includes(".");
  if (e && i) {
    const n = t.lastIndexOf(","), a = t.lastIndexOf(".");
    n > a ? t = t.replace(/\./g, "").replace(",", ".") : t = t.replace(/,/g, "");
  } else e && (t = t.replace(",", "."));
  const r = parseFloat(t);
  return isNaN(r) ? s ? null : 0 : r;
}
o(yr, "toNumber");
function GM(M) {
  if (typeof M != "string")
    return !1;
  const s = M.trim();
  return s === "" ? !1 : /^-?[\d\s]+([.,]\d+)?$/.test(s);
}
o(GM, "looksLikeNumber");
function HM(M) {
  return !M || typeof M != "string" || ["N/A", "null", "undefined", "00", ""].includes(M) ? !1 : !!(M === "2A" || M === "2B" || /^97[1-6]$/.test(M) || /^(0[1-9]|[1-8]\d|9[0-5])$/.test(M));
}
o(HM, "isValidDeptCode");
const Ei = "https://chartsbuilder.matge.com", ke = {
  baseUrl: Ei,
  endpoints: {
    grist: "/grist-proxy",
    gristGouv: "/grist-gouv-proxy",
    albert: "/albert-proxy",
    tabular: "/tabular-proxy",
    corsProxy: "/cors-proxy"
  }
};
function qM() {
  if (typeof window > "u")
    return !1;
  const { hostname: M, port: s } = window.location;
  return (M === "localhost" || M === "127.0.0.1") && !!s && s !== "80" && s !== "443";
}
o(qM, "isViteDevMode");
function KM() {
  return typeof window < "u" && "__TAURI__" in window;
}
o(KM, "isTauriMode");
function mi() {
  var e;
  const M = { ...ke.endpoints };
  return qM() ? { baseUrl: "", endpoints: M } : KM() ? { baseUrl: ke.baseUrl, endpoints: M } : {
    baseUrl: ((e = import.meta.env) == null ? void 0 : e.VITE_PROXY_URL) || ke.baseUrl,
    endpoints: M
  };
}
o(mi, "getProxyConfig");
function sn(M) {
  if (!M)
    throw new Error("getProxiedUrl: url is required");
  const s = mi();
  return M.includes("tabular-api.data.gouv.fr") ? M.replace("https://tabular-api.data.gouv.fr", `${s.baseUrl}${s.endpoints.tabular}`) : M.includes("docs.getgrist.com") ? M.replace("https://docs.getgrist.com", `${s.baseUrl}${s.endpoints.grist}`) : M.includes("grist.numerique.gouv.fr") ? M.replace("https://grist.numerique.gouv.fr", `${s.baseUrl}${s.endpoints.gristGouv}`) : M.includes("albert.api.etalab.gouv.fr") ? M.replace("https://albert.api.etalab.gouv.fr", `${s.baseUrl}${s.endpoints.albert}`) : M;
}
o(sn, "getProxiedUrl");
function tn(M, s) {
  const t = mi();
  return {
    url: `${t.baseUrl}${t.endpoints.corsProxy}`,
    headers: {
      ...s || {},
      "X-Target-URL": M
    }
  };
}
o(tn, "buildCorsProxyRequest");
const le = {
  FAVORITES: "gouv-widgets-favorites",
  DASHBOARDS: "gouv-widgets-dashboards",
  CONNECTIONS: "gouv_widgets_connections",
  SOURCES: "gouv_widgets_sources"
};
function de(M, s) {
  try {
    const t = localStorage.getItem(M);
    return t ? JSON.parse(t) : s;
  } catch {
    return s;
  }
}
o(de, "loadFromStorage");
let en = "idle", rn = 0, xr = /* @__PURE__ */ new Set();
function Mn(M) {
  xr.add(M);
  try {
    M(en, rn);
  } catch {
  }
  return () => {
    xr.delete(M);
  };
}
o(Mn, "onSyncStatusChange");
const zr = /\/api\/explore\/v2\.1\/catalog\/datasets\/([^/]+)/, nM = {
  id: "opendatasoft",
  displayName: "OpenDataSoft",
  urlPatterns: [zr],
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
    extractIds: /* @__PURE__ */ o((M) => {
      const s = M.match(zr);
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
}, ur = /tabular-api\.data\.gouv\.fr\/api\/resources\/([^/]+)/, aM = {
  id: "tabular",
  displayName: "Tabular (data.gouv.fr)",
  urlPatterns: [ur],
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
    extractIds: /* @__PURE__ */ o((M) => {
      const s = M.match(ur);
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
}, wr = /\/api\/docs\/([^/]+)\/tables\/([^/]+)/, oM = {
  id: "grist",
  displayName: "Grist",
  urlPatterns: [wr],
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
    extractIds: /* @__PURE__ */ o((M) => {
      const s = M.match(wr);
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
}, LM = {
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
    extractIds: /* @__PURE__ */ o(() => null, "extractIds")
  },
  codeGen: {
    usesGouvSource: !0,
    usesGouvQuery: !0,
    usesGouvNormalize: !1,
    sourceApiType: "generic",
    fieldPrefix: "",
    dependencies: { dsfr: !0, dsfrChart: !0, gouvWidgets: !0 }
  }
}, br = /melodi\/data\/([^?/]+)/, lM = {
  id: "insee",
  displayName: "INSEE (Melodi)",
  urlPatterns: [br],
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
    extractIds: /* @__PURE__ */ o((M) => {
      const s = M.match(br);
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
function re(M) {
  nn.set(M.id, M);
}
o(re, "registerProvider");
re(nM);
re(aM);
re(oM);
re(lM);
re(LM);
const an = {
  user: null,
  isAuthenticated: !1,
  isLoading: !0
};
let Xt = { ...an }, et = null, At = null, dM = "";
const ai = /* @__PURE__ */ new Set();
function on() {
  for (const M of ai)
    try {
      M(Xt);
    } catch {
    }
}
o(on, "notify");
function $s(M) {
  Xt = { ...Xt, ...M }, on();
}
o($s, "setState");
async function Me(M, s) {
  return fetch(`${dM}${M}`, {
    ...s,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...s == null ? void 0 : s.headers
    }
  });
}
o(Me, "apiFetch");
async function cM() {
  if (et !== null)
    return et;
  try {
    const M = await fetch(`${dM}/api/auth/me`, {
      credentials: "include"
    });
    et = M.status === 200 || M.status === 401;
  } catch {
    et = !1;
  }
  return et && typeof window < "u" && (window.__gwDbMode = !0), et;
}
o(cM, "isDbMode");
async function Ln() {
  return At || (At = ln(), At);
}
o(Ln, "checkAuth");
async function ln() {
  try {
    if (!await cM())
      return $s({ user: null, isAuthenticated: !1, isLoading: !1 }), Xt;
    const s = await Me("/api/auth/me");
    if (s.ok) {
      const t = await s.json();
      $s({ user: t.user, isAuthenticated: !0, isLoading: !1 });
    } else
      $s({ user: null, isAuthenticated: !1, isLoading: !1 });
  } catch {
    At = null, $s({ user: null, isAuthenticated: !1, isLoading: !1 });
  }
  return Xt;
}
o(ln, "_doCheckAuth");
async function dn(M) {
  try {
    const s = await Me("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(M)
    });
    if (!s.ok)
      return { success: !1, error: (await s.json()).error || "Login failed" };
    const t = await s.json();
    return $s({ user: t.user, isAuthenticated: !0, isLoading: !1 }), await NM(), { success: !0 };
  } catch {
    return { success: !1, error: "Network error" };
  }
}
o(dn, "login");
async function cn(M) {
  try {
    const s = await Me("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(M)
    });
    if (!s.ok)
      return { success: !1, error: (await s.json()).error || "Registration failed" };
    const t = await s.json();
    return $s({ user: t.user, isAuthenticated: !0, isLoading: !1 }), await NM(), { success: !0 };
  } catch {
    return { success: !1, error: "Network error" };
  }
}
o(cn, "register");
async function Nn() {
  try {
    await Me("/api/auth/logout", { method: "POST" });
  } catch {
  }
  $s({ user: null, isAuthenticated: !1, isLoading: !1 });
}
o(Nn, "logout");
function Tn(M) {
  return ai.add(M), () => {
    ai.delete(M);
  };
}
o(Tn, "onAuthChange");
function ce() {
  return Xt.isAuthenticated;
}
o(ce, "isAuthenticated");
const Ye = "gw-migrated";
async function NM() {
  if (localStorage.getItem(Ye))
    return;
  const M = de(le.SOURCES, []), s = de(le.CONNECTIONS, []), t = de(le.FAVORITES, []), e = de(le.DASHBOARDS, []);
  if (!(M.length > 0 || s.length > 0 || t.length > 0 || e.length > 0)) {
    localStorage.setItem(Ye, "1");
    return;
  }
  try {
    (await Me("/api/migrate", {
      method: "POST",
      body: JSON.stringify({ sources: M, connections: s, favorites: t, dashboards: e })
    })).ok && (localStorage.setItem(Ye, "1"), console.info("[auth] localStorage data migrated to server"));
  } catch {
    console.warn("[auth] Migration failed, will retry on next login");
  }
}
o(NM, "autoMigrateIfNeeded");
const hr = `${Ei}/beacon`, Sr = /* @__PURE__ */ new Set();
function Ss(M, s) {
  const t = `${M}:${s || ""}`;
  if (Sr.has(t) || (Sr.add(t), typeof window > "u"))
    return;
  const e = window.location.hostname;
  if (e === "localhost" || e === "127.0.0.1" || e === new URL(Ei).hostname)
    return;
  const i = new URLSearchParams();
  if (i.set("c", M), s && i.set("t", s), i.set("r", window.location.origin), typeof window < "u" && window.__gwDbMode === !0)
    try {
      fetch("/api/monitoring/beacon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          component: M,
          chartType: s || null,
          origin: window.location.origin
        })
      }).catch(() => {
        new Image().src = `${hr}?${i.toString()}`;
      });
      return;
    } catch {
    }
  const n = `${hr}?${i.toString()}`;
  try {
    new Image().src = n;
  } catch {
  }
}
o(Ss, "sendWidgetBeacon");
const Pi = class Pi {
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
    return LM;
  }
  buildFacetWhere(s, t) {
    const e = [];
    for (const [i, r] of Object.entries(s))
      i === t || r.size === 0 || (r.size === 1 ? e.push(`${i}:eq:${[...r][0]}`) : e.push(`${i}:in:${[...r].join("|")}`));
    return e.join(", ");
  }
};
o(Pi, "GenericAdapter");
let oi = Pi;
function Je(M, s) {
  const t = {};
  return s && (t.signal = s), M.headers && Object.keys(M.headers).length > 0 && (t.headers = M.headers), t;
}
o(Je, "buildFetchOptions$3");
const Ne = 100, $e = 10, Gi = class Gi {
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
    const i = s.limit <= 0 ? $e * Ne : s.limit, r = Ne;
    let n = [], a = 0, c = -1;
    for (let d = 0; d < $e; d++) {
      const L = i - n.length;
      if (L <= 0)
        break;
      const l = this.buildUrl(s, Math.min(r, L), a), N = await fetch(l, Je(s, t));
      if (!N.ok)
        throw new Error(`HTTP ${N.status}: ${N.statusText}`);
      const T = await N.json(), x = T.results || [];
      if (n = n.concat(x), typeof T.total_count == "number" && (c = T.total_count), c >= 0 && n.length >= c || x.length < r)
        break;
      a += x.length;
    }
    return c >= 0 && n.length < c && n.length < i && console.warn(`gouv-query: pagination incomplete - ${n.length}/${c} resultats recuperes (limite de securite: ${$e} pages de ${Ne})`), {
      data: n,
      totalCount: c >= 0 ? c : n.length,
      needsClientProcessing: !1
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(s, t, e) {
    const i = this.buildServerSideUrl(s, t), r = await fetch(i, Je(s, e));
    if (!r.ok)
      throw new Error(`HTTP ${r.status}: ${r.statusText}`);
    const n = await r.json(), a = n.results || [], c = typeof n.total_count == "number" ? n.total_count : 0;
    return {
      data: a,
      totalCount: c,
      needsClientProcessing: !1,
      rawJson: n
    };
  }
  /**
   * Construit une URL ODS pour le fetch complet (avec pagination).
   * limitOverride et pageOrOffsetOverride controlent la pagination per-page.
   */
  buildUrl(s, t, e) {
    const i = s.baseUrl || "https://data.opendatasoft.com", r = new URL(`${i}/api/explore/v2.1/catalog/datasets/${s.datasetId}/records`);
    s.select ? r.searchParams.set("select", s.select) : s.aggregate && s.groupBy && r.searchParams.set("select", this._buildSelectFromAggregate(s));
    const n = s.where || s.filter;
    if (n && r.searchParams.set("where", n), s.groupBy && r.searchParams.set("group_by", s.groupBy), s.orderBy) {
      const a = s.orderBy.replace(/:(\w+)$/, (c, d) => ` ${d.toUpperCase()}`);
      r.searchParams.set("order_by", a);
    }
    return t !== void 0 ? r.searchParams.set("limit", String(t)) : s.limit > 0 && r.searchParams.set("limit", String(Math.min(s.limit, Ne))), e && e > 0 && r.searchParams.set("offset", String(e)), r.toString();
  }
  /**
   * Construit l'URL ODS en mode server-side (une seule page).
   */
  buildServerSideUrl(s, t) {
    const e = s.baseUrl || "https://data.opendatasoft.com", i = new URL(`${e}/api/explore/v2.1/catalog/datasets/${s.datasetId}/records`);
    s.select ? i.searchParams.set("select", s.select) : s.aggregate && s.groupBy && i.searchParams.set("select", this._buildSelectFromAggregate(s)), t.effectiveWhere && i.searchParams.set("where", t.effectiveWhere), s.groupBy && i.searchParams.set("group_by", s.groupBy);
    const r = t.orderBy;
    if (r) {
      const a = r.replace(/:(\w+)$/, (c, d) => ` ${d.toUpperCase()}`);
      i.searchParams.set("order_by", a);
    }
    i.searchParams.set("limit", String(s.pageSize));
    const n = (t.page - 1) * s.pageSize;
    return n > 0 && i.searchParams.set("offset", String(n)), i.toString();
  }
  /**
   * Fetch les valeurs de facettes depuis l'endpoint ODS /facets.
   */
  async fetchFacets(s, t, e, i) {
    const r = s.baseUrl || "https://data.opendatasoft.com", n = new URL(`${r}/api/explore/v2.1/catalog/datasets/${s.datasetId}/facets`);
    for (const L of t)
      n.searchParams.append("facet", L);
    e && n.searchParams.set("where", e);
    const a = await fetch(n.toString(), Je(s, i));
    if (!a.ok)
      throw new Error(`HTTP ${a.status}: ${a.statusText}`);
    const c = await a.json(), d = [];
    for (const L of c.facets || [])
      d.push({
        field: L.name,
        values: (L.facets || []).map((l) => ({
          value: l.value,
          count: l.count
        }))
      });
    return d;
  }
  getDefaultSearchTemplate() {
    return 'search("{q}")';
  }
  getProviderConfig() {
    return nM;
  }
  buildFacetWhere(s, t) {
    const e = [];
    for (const [i, r] of Object.entries(s))
      if (!(i === t || r.size === 0))
        if (r.size === 1) {
          const n = [...r][0].replace(/"/g, '\\"');
          e.push(`${i} = "${n}"`);
        } else {
          const n = [...r].map((a) => `"${a.replace(/"/g, '\\"')}"`).join(", ");
          e.push(`${i} IN (${n})`);
        }
    return e.join(" AND ");
  }
  parseAggregates(s) {
    if (!s)
      return [];
    const t = [], e = s.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of e) {
      const r = i.split(":");
      r.length >= 2 && t.push({
        field: r[0],
        function: r[1],
        alias: r[2]
      });
    }
    return t;
  }
  /**
   * Convertit aggregate="field:func" + group-by en syntaxe ODS select.
   */
  _buildSelectFromAggregate(s) {
    const t = this.parseAggregates(s.aggregate), e = [];
    for (const r of t) {
      const n = r.function === "count" ? "count(*)" : `${r.function}(${r.field})`, a = r.alias || `${r.field}__${r.function}`;
      e.push(`${n} as ${a}`);
    }
    const i = s.groupBy.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i)
      e.push(r);
    return e.join(", ");
  }
};
o(Gi, "OpenDataSoftAdapter");
let Li = Gi;
function Fr(M, s) {
  const t = {};
  return s && (t.signal = s), M.headers && Object.keys(M.headers).length > 0 && (t.headers = M.headers), t;
}
o(Fr, "buildFetchOptions$2");
const Te = 50, Re = 500, Hi = class Hi {
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
    var d;
    const e = s.limit <= 0, i = e ? Re * Te : s.limit;
    let r = [], n = -1, a = 1;
    for (let L = 0; L < Re && !(i - r.length <= 0); L++) {
      const N = this.buildUrl(s, Te, a), T = await fetch(N, Fr(s, t));
      if (!T.ok)
        throw new Error(`HTTP ${T.status}: ${T.statusText}`);
      const x = await T.json(), b = x.data || [];
      r = r.concat(b), x.meta && typeof x.meta.total == "number" && (n = x.meta.total);
      let u = !1;
      if ((d = x.links) != null && d.next)
        try {
          const f = new URL(x.links.next, "https://tabular-api.data.gouv.fr"), D = Number(f.searchParams.get("page"));
          D > 0 && (a = D, u = !0);
        } catch {
        }
      if (!u || n >= 0 && r.length >= n || b.length < Te)
        break;
    }
    !e && r.length > i && (r = r.slice(0, i)), n >= 0 && r.length < n && r.length < i && console.warn(`gouv-query: pagination incomplete - ${r.length}/${n} resultats recuperes (limite de securite: ${Re} pages de ${Te})`);
    const c = !!(s.groupBy || s.aggregate);
    return {
      data: r,
      totalCount: n >= 0 ? n : r.length,
      needsClientProcessing: !c
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(s, t, e) {
    var d;
    const i = this.buildServerSideUrl(s, t), r = await fetch(i, Fr(s, e));
    if (!r.ok)
      throw new Error(`HTTP ${r.status}: ${r.statusText}`);
    const n = await r.json(), a = n.data || [], c = ((d = n.meta) == null ? void 0 : d.total) ?? 0;
    return {
      data: a,
      totalCount: c,
      needsClientProcessing: !1,
      rawJson: n
    };
  }
  /**
   * Construit une URL Tabular pour le fetch complet.
   */
  buildUrl(s, t, e) {
    const i = this._getBaseUrl(s), r = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, n = new URL(`${i}/api/resources/${s.resource}/data/`, r), a = s.filter || s.where;
    if (a && this._applyColonFilters(n, a), s.groupBy) {
      const c = s.groupBy.split(",").map((d) => d.trim());
      for (const d of c)
        n.searchParams.append(`${d}__groupby`, "");
    }
    if (s.aggregate) {
      const c = s.aggregate.split(",").map((d) => d.trim());
      for (const d of c) {
        const L = d.split(":");
        if (L.length >= 2) {
          const l = L[0], N = L[1];
          n.searchParams.append(`${l}__${N}`, "");
        }
      }
    }
    if (s.orderBy) {
      const c = s.orderBy.split(":"), d = c[0], L = c[1] || "asc";
      n.searchParams.set(`${d}__sort`, L);
    }
    return t ? n.searchParams.set("page_size", String(t)) : s.limit > 0 && n.searchParams.set("page_size", String(s.limit)), e && n.searchParams.set("page", String(e)), n.toString();
  }
  /**
   * Construit l'URL Tabular en mode server-side (une seule page).
   */
  buildServerSideUrl(s, t) {
    const e = this._getBaseUrl(s), i = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, r = new URL(`${e}/api/resources/${s.resource}/data/`, i), n = t.effectiveWhere || s.filter || s.where;
    n && this._applyColonFilters(r, n);
    const a = t.orderBy;
    if (a) {
      const c = a.split(":"), d = c[0], L = c[1] || "asc";
      r.searchParams.set(`${d}__sort`, L);
    }
    return r.searchParams.set("page_size", String(s.pageSize)), r.searchParams.set("page", String(t.page)), r.toString();
  }
  /**
   * Applique des filtres colon-syntax (field:op:value, ...) comme query params.
   */
  _applyColonFilters(s, t) {
    const e = t.split(",").map((i) => i.trim());
    for (const i of e) {
      const r = i.split(":");
      if (r.length >= 3) {
        const n = r[0], a = this._mapOperator(r[1]), c = r.slice(2).join(":");
        s.searchParams.set(`${n}__${a}`, c);
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
    return aM;
  }
  buildFacetWhere(s, t) {
    const e = [];
    for (const [i, r] of Object.entries(s))
      i === t || r.size === 0 || (r.size === 1 ? e.push(`${i}:eq:${[...r][0]}`) : e.push(`${i}:in:${[...r].join("|")}`));
    return e.join(", ");
  }
  /**
   * Determine le base URL, avec fallback sur le proxy CORS.
   */
  _getBaseUrl(s) {
    if (s.baseUrl)
      return s.baseUrl;
    const t = mi();
    return `${t.baseUrl}${t.endpoints.tabular}`;
  }
};
o(Hi, "TabularAdapter");
let li = Hi;
function Ut(M, s) {
  const t = {};
  return s && (t.signal = s), M.headers && Object.keys(M.headers).length > 0 && (t.headers = M.headers), t;
}
o(Ut, "buildFetchOptions$1");
const qi = class qi {
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
    const e = this.buildUrl(s), i = await fetch(e, Ut(s, t));
    if (!i.ok)
      throw new Error(`HTTP ${i.status}: ${i.statusText}`);
    const r = await i.json(), n = this._flattenRecords(r.records || []);
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
    const i = this.buildServerSideUrl(s, t), r = await fetch(i, Ut(s, e));
    if (!r.ok)
      throw new Error(`HTTP ${r.status}: ${r.statusText}`);
    const n = await r.json(), a = this._flattenRecords(n.records || []), c = s.pageSize || a.length, d = a.length < c;
    return {
      data: a,
      totalCount: d ? ((t.page || 1) - 1) * c + a.length : -1,
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
    const r = t.orderBy || s.orderBy;
    return r && e.searchParams.set("sort", this._orderByToGristSort(r)), t.page && s.pageSize && (e.searchParams.set("limit", String(s.pageSize)), e.searchParams.set("offset", String((t.page - 1) * s.pageSize))), e.toString();
  }
  // =========================================================================
  // Facettes server-side via SQL GROUP BY + COUNT
  // =========================================================================
  async fetchFacets(s, t, e, i) {
    const r = [], n = s;
    if (!await this._checkSqlAvailability(n))
      return r;
    for (const a of t) {
      const c = this._getTableId(n), d = this._escapeIdentifier(a), L = [];
      let l = `SELECT ${d}, COUNT(*) as cnt FROM ${this._escapeIdentifier(c)}`;
      e && (l += ` WHERE ${this._colonWhereToSql(e, L)}`), l += ` GROUP BY ${d} ORDER BY cnt DESC LIMIT 200`;
      const N = this._getSqlEndpointUrl(n);
      try {
        const T = await fetch(N, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...s.headers || {} },
          body: JSON.stringify({ sql: l, args: L, timeout: 500 }),
          signal: i
        });
        if (!T.ok)
          continue;
        const b = (await T.json()).records || [];
        r.push({
          field: a,
          values: b.map((u) => ({
            value: String(u[0] ?? ""),
            count: Number(u[1]) || 0
          })).filter((u) => u.value !== "")
        });
      } catch {
        continue;
      }
    }
    return r;
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
    return oM;
  }
  buildFacetWhere(s, t) {
    const e = [];
    for (const [i, r] of Object.entries(s))
      i === t || r.size === 0 || (r.size === 1 ? e.push(`${i}:eq:${[...r][0]}`) : e.push(`${i}:in:${[...r].join("|")}`));
    return e.join(", ");
  }
  // =========================================================================
  // parseAggregates
  // =========================================================================
  parseAggregates(s) {
    return s.split(",").map((t) => {
      const [e, i, r] = t.trim().split(":");
      return {
        field: e,
        function: i,
        alias: r || `${i}_${e}`
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
      const i = await fetch(e, Ut(s, t));
      return i.ok ? ((await i.json()).columns || []).map((n) => {
        const a = n.fields;
        return {
          id: n.id,
          label: (a == null ? void 0 : a.label) || n.id,
          type: (a == null ? void 0 : a.type) || "Any",
          isFormula: (a == null ? void 0 : a.isFormula) || !1,
          formula: (a == null ? void 0 : a.formula) || ""
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
      const i = await fetch(e, Ut(s, t));
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
      const [r, n, ...a] = i.split(":"), c = a.join(":");
      n === "eq" ? t[r] = [c] : n === "in" && (t[r] = c.split("|"));
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
    const i = this._getTableId(s), { select: r, groupBy: n, where: a, orderBy: c, limit: d, offset: L, args: l } = this._buildSqlQuery(s, t, i), N = [
      `SELECT ${r}`,
      `FROM ${this._escapeIdentifier(i)}`,
      a ? `WHERE ${a}` : "",
      n ? `GROUP BY ${n}` : "",
      c ? `ORDER BY ${c}` : "",
      d ? `LIMIT ${d}` : "",
      L ? `OFFSET ${L}` : ""
    ].filter(Boolean).join(" "), T = this._getSqlEndpointUrl(s), x = await fetch(T, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...s.headers || {}
      },
      body: JSON.stringify({ sql: N, args: l, timeout: 800 }),
      signal: e
    });
    if (!x.ok) {
      if (x.status === 404 || x.status === 403)
        return console.warn("[gouv-widgets] Grist SQL endpoint not available, falling back to client-side processing"), this._sqlAvailableByHost.set(this._extractHostname(s.baseUrl), !1), this._fetchAllRecords(s, e);
      throw new Error(`Grist SQL HTTP ${x.status}: ${x.statusText}`);
    }
    const b = await x.json(), u = this._sqlResultToObjects(b);
    return {
      data: u,
      totalCount: u.length,
      needsClientProcessing: !1
    };
  }
  /** Fetch Records mode (internal fallback) */
  async _fetchAllRecords(s, t) {
    const e = this.buildUrl(s), i = await fetch(e, Ut(s, t));
    if (!i.ok)
      throw new Error(`HTTP ${i.status}: ${i.statusText}`);
    const r = await i.json(), n = this._flattenRecords(r.records || []);
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
    let r = "*", n = "", a = "", c = "", d = "", L = "";
    if (s.groupBy) {
      const T = s.groupBy.split(",").map((x) => this._escapeIdentifier(x.trim()));
      if (n = T.join(", "), s.aggregate) {
        const x = this.parseAggregates(s.aggregate);
        r = [
          ...T,
          ...x.map((u) => `${u.function.toUpperCase()}(${this._escapeIdentifier(u.field)}) as ${this._escapeIdentifier(u.alias || `${u.function}_${u.field}`)}`)
        ].join(", ");
      } else
        r = T.join(", ") + ", COUNT(*) as count";
    }
    const l = this._mergeWhere(s.where, t == null ? void 0 : t.effectiveWhere);
    l && (a = this._colonWhereToSql(l, i));
    const N = (t == null ? void 0 : t.orderBy) || s.orderBy;
    return N && (c = N.split(",").map((T) => {
      const [x, b] = T.trim().split(":");
      return `${this._escapeIdentifier(x)} ${b === "desc" ? "DESC" : "ASC"}`;
    }).join(", ")), t != null && t.page && s.pageSize ? (d = String(s.pageSize), t.page > 1 && (L = String((t.page - 1) * s.pageSize))) : s.limit && (d = String(s.limit)), { select: r, groupBy: n, where: a, orderBy: c, limit: d, offset: L, args: i };
  }
  // =========================================================================
  // Mode SQL : conversion WHERE colon → SQL parametre
  // =========================================================================
  /**
   * Convertit une clause WHERE colon-syntax en SQL parametre.
   * Tous les operateurs sont supportes.
   */
  _colonWhereToSql(s, t) {
    const e = [], i = s.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const [n, a, ...c] = r.split(":"), d = c.join(":"), L = this._escapeIdentifier(n);
      switch (a) {
        case "eq":
          e.push(`${L} = ?`), t.push(d);
          break;
        case "neq":
          e.push(`${L} != ?`), t.push(d);
          break;
        case "gt":
          e.push(`${L} > ?`), t.push(this._toNumberOrString(d));
          break;
        case "gte":
          e.push(`${L} >= ?`), t.push(this._toNumberOrString(d));
          break;
        case "lt":
          e.push(`${L} < ?`), t.push(this._toNumberOrString(d));
          break;
        case "lte":
          e.push(`${L} <= ?`), t.push(this._toNumberOrString(d));
          break;
        case "contains":
          e.push(`${L} LIKE ?`), t.push(`%${d}%`);
          break;
        case "notcontains":
          e.push(`${L} NOT LIKE ?`), t.push(`%${d}%`);
          break;
        case "in": {
          const l = d.split("|");
          e.push(`${L} IN (${l.map(() => "?").join(",")})`), t.push(...l);
          break;
        }
        case "notin": {
          const l = d.split("|");
          e.push(`${L} NOT IN (${l.map(() => "?").join(",")})`), t.push(...l);
          break;
        }
        case "isnull":
          e.push(`${L} IS NULL`);
          break;
        case "isnotnull":
          e.push(`${L} IS NOT NULL`);
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
      const r = {};
      return e.forEach((n, a) => {
        r[n] = i[a];
      }), r;
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
o(qi, "GristAdapter");
let di = qi;
const Dr = "https://api.insee.fr/melodi", pr = 1e3, Be = 100;
function Ir(M, s) {
  const t = {};
  return s && (t.signal = s), M.headers && Object.keys(M.headers).length > 0 && (t.headers = M.headers), t;
}
o(Ir, "buildFetchOptions");
const Ki = class Ki {
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
    var c;
    const e = s.pageSize > 0 ? s.pageSize : pr, r = s.limit <= 0 ? Be * e : s.limit;
    let n = [], a = -1;
    for (let d = 1; d <= Be; d++) {
      const L = r - n.length;
      if (L <= 0)
        break;
      const l = Math.min(e, L), N = this.buildUrl(s, l, d), T = await fetch(N, Ir(s, t));
      if (!T.ok)
        throw new Error(`HTTP ${T.status}: ${T.statusText}`);
      const x = await T.json(), b = x.observations || [], u = this._flattenObservations(b);
      if (n = n.concat(u), x.paging && typeof x.paging.count == "number" && (a = x.paging.count), ((c = x.paging) == null ? void 0 : c.isLast) === !0 || a >= 0 && n.length >= a || b.length < l)
        break;
    }
    return a >= 0 && n.length < a && n.length < r && console.warn(`gouv-source[insee]: pagination incomplete - ${n.length}/${a} resultats (limite: ${Be} pages de ${e})`), {
      data: n,
      totalCount: a >= 0 ? a : n.length,
      needsClientProcessing: !0
      // all processing is client-side
    };
  }
  /**
   * Fetch a single page in server-side pagination mode.
   */
  async fetchPage(s, t, e) {
    var L;
    const i = this.buildServerSideUrl(s, t), r = await fetch(i, Ir(s, e));
    if (!r.ok)
      throw new Error(`HTTP ${r.status}: ${r.statusText}`);
    const n = await r.json(), a = n.observations || [], c = this._flattenObservations(a), d = ((L = n.paging) == null ? void 0 : L.count) ?? 0;
    return {
      data: c,
      totalCount: d,
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
    const i = s.baseUrl || Dr, r = new URL(`${i}/data/${s.datasetId}`), n = t ?? (s.limit > 0 ? s.limit : pr);
    r.searchParams.set("maxResult", String(n)), r.searchParams.set("totalCount", "TRUE"), e && e > 0 && r.searchParams.set("page", String(e));
    const a = s.where || s.filter;
    return a && this._applyDimensionFilters(r, a), r.toString();
  }
  /**
   * Build a server-side URL for a single page.
   */
  buildServerSideUrl(s, t) {
    const e = s.baseUrl || Dr, i = new URL(`${e}/data/${s.datasetId}`);
    return i.searchParams.set("maxResult", String(s.pageSize)), i.searchParams.set("totalCount", "TRUE"), i.searchParams.set("page", String(t.page)), t.effectiveWhere && this._applyDimensionFilters(i, t.effectiveWhere), i.toString();
  }
  getDefaultSearchTemplate() {
    return null;
  }
  getProviderConfig() {
    return lM;
  }
  buildFacetWhere(s, t) {
    const e = [];
    for (const [i, r] of Object.entries(s))
      i === t || r.size === 0 || (r.size === 1 ? e.push(`${i}:eq:${[...r][0]}`) : e.push(`${i}:in:${[...r].join("|")}`));
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
      const e = t, i = {}, r = e.dimensions;
      if (r)
        for (const [c, d] of Object.entries(r))
          i[c] = d;
      const n = e.measures;
      if (n)
        for (const [c, d] of Object.entries(n)) {
          const L = d;
          if (L && "value" in L) {
            const l = c.replace(/_NIVEAU$/, "");
            i[l] = L.value;
          }
        }
      const a = e.attributes;
      if (a)
        for (const [c, d] of Object.entries(a))
          i[c] = d;
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
      const r = i.split(":");
      if (r.length < 3) {
        r.length === 2 && s.searchParams.append(r[0], r[1]);
        continue;
      }
      const [n, a, ...c] = r, d = c.join(":");
      switch (a) {
        case "eq":
          s.searchParams.append(n, d);
          break;
        case "in": {
          const L = d.split("|");
          for (const l of L)
            s.searchParams.append(n, l);
          break;
        }
      }
    }
  }
};
o(Ki, "InseeAdapter");
let ci = Ki;
const TM = /* @__PURE__ */ new Map([
  ["generic", new oi()],
  ["opendatasoft", new Li()],
  ["tabular", new li()],
  ["grist", new di()],
  ["insee", new ci()]
]);
function yn(M) {
  const s = TM.get(M);
  if (!s)
    throw new Error(`Type d'API non supporte: ${M}`);
  return s;
}
o(yn, "getAdapter");
function ga(M) {
  TM.set(M.type, M);
}
o(ga, "registerAdapter");
const Ts = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading",
  SOURCE_COMMAND: "gouv-source-command"
}, vi = /* @__PURE__ */ new Map(), _i = /* @__PURE__ */ new Map();
function xn(M, s) {
  vi.set(M, s);
}
o(xn, "setDataCache");
function Ps(M) {
  return vi.get(M);
}
o(Ps, "getDataCache");
function ne(M) {
  vi.delete(M);
}
o(ne, "clearDataCache");
function Bs(M, s) {
  _i.set(M, s);
}
o(Bs, "setDataMeta");
function Gs(M) {
  return _i.get(M);
}
o(Gs, "getDataMeta");
function Ui(M) {
  _i.delete(M);
}
o(Ui, "clearDataMeta");
function ys(M, s) {
  xn(M, s);
  const t = new CustomEvent(Ts.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: M, data: s }
  });
  document.dispatchEvent(t);
}
o(ys, "dispatchDataLoaded");
function Cs(M, s) {
  const t = new CustomEvent(Ts.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: M, error: s }
  });
  document.dispatchEvent(t);
}
o(Cs, "dispatchDataError");
function Us(M) {
  const s = new CustomEvent(Ts.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: M }
  });
  document.dispatchEvent(s);
}
o(Us, "dispatchDataLoading");
function ws(M, s) {
  const t = new CustomEvent(Ts.SOURCE_COMMAND, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: M, ...s }
  });
  document.dispatchEvent(t);
}
o(ws, "dispatchSourceCommand");
function ve(M, s) {
  const t = /* @__PURE__ */ o((e) => {
    const i = e;
    if (i.detail.sourceId === M) {
      const { sourceId: r, ...n } = i.detail;
      s(n);
    }
  }, "handler");
  return document.addEventListener(Ts.SOURCE_COMMAND, t), () => document.removeEventListener(Ts.SOURCE_COMMAND, t);
}
o(ve, "subscribeToSourceCommands");
function ae(M, s) {
  const t = /* @__PURE__ */ o((r) => {
    const n = r;
    n.detail.sourceId === M && s.onLoaded && s.onLoaded(n.detail.data);
  }, "handleLoaded"), e = /* @__PURE__ */ o((r) => {
    const n = r;
    n.detail.sourceId === M && s.onError && s.onError(n.detail.error);
  }, "handleError"), i = /* @__PURE__ */ o((r) => {
    r.detail.sourceId === M && s.onLoading && s.onLoading();
  }, "handleLoading");
  return document.addEventListener(Ts.LOADED, t), document.addEventListener(Ts.ERROR, e), document.addEventListener(Ts.LOADING, i), () => {
    document.removeEventListener(Ts.LOADED, t), document.removeEventListener(Ts.ERROR, e), document.removeEventListener(Ts.LOADING, i);
  };
}
o(ae, "subscribeToSource");
var U = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, ot;
let _ = (ot = class extends V {
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
    super.disconnectedCallback(), this._cleanup(), this.id && (ne(this.id), Ui(this.id));
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
    return this._isAdapterMode() ? (this._adapter || (this._adapter = yn(this.apiType)), this._adapter) : null;
  }
  /** Returns the effective WHERE clause (static + all dynamic overlays merged) */
  getEffectiveWhere(s) {
    const t = [];
    this.where && t.push(this.where);
    for (const [r, n] of this._whereOverlays)
      r !== s && n && t.push(n);
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
      this._data = s, ys(this.id, this._data);
    } catch (s) {
      this._error = new Error("Donnees inline invalides (JSON attendu)"), Cs(this.id, this._error), console.error(`gouv-source[${this.id}]: JSON invalide dans data`, s);
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
    this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), !(!this.id || !(this.paginate || this.serverSide || this._isAdapterMode())) && (this._unsubscribeCommands = ve(this.id, (t) => {
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
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, Us(this.id);
      try {
        const e = this._buildUrl();
        let i = sn(e);
        const r = this._buildFetchOptions();
        if (this.useProxy && i === e) {
          const c = tn(i, r.headers);
          i = c.url, r.headers = c.headers;
        }
        const n = await fetch(i, {
          ...r,
          signal: this._abortController.signal
        });
        if (!n.ok)
          throw new Error(`HTTP ${n.status}: ${n.statusText}`);
        let a;
        try {
          a = await n.json();
        } catch {
          const c = ((t = (s = n.headers) == null ? void 0 : s.get) == null ? void 0 : t.call(s, "content-type")) || "unknown";
          throw new Error(`Reponse non-JSON (content-type: ${c}) — verifiez l'URL ou la configuration du proxy`);
        }
        this.paginate && a.meta && Bs(this.id, {
          page: a.meta.page ?? this._currentPage,
          pageSize: a.meta.page_size ?? this.pageSize,
          total: a.meta.total ?? 0
        }), this.transform ? this._data = B(a, this.transform) : this.paginate && a.data && !this.transform ? this._data = a.data : this._data = a, ys(this.id, this._data), this.cacheTtl > 0 && ce() && this._putCache(this._data).catch(() => {
        });
      } catch (e) {
        if (e.name === "AbortError")
          return;
        if (this.cacheTtl > 0 && ce()) {
          const i = await this._getCache();
          if (i) {
            this._data = i, ys(this.id, this._data), this.dispatchEvent(new CustomEvent("cache-fallback", { detail: { sourceId: this.id } }));
            return;
          }
        }
        this._error = e, Cs(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, e);
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
    this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, Us(this.id);
    try {
      let i;
      if (this.serverSide) {
        const r = {
          page: this._currentPage,
          effectiveWhere: this.getEffectiveWhere(),
          orderBy: this._orderByOverlay || this.orderBy
        };
        i = await s.fetchPage(t, r, this._abortController.signal), Bs(this.id, {
          page: this._currentPage,
          pageSize: this.pageSize,
          total: i.totalCount,
          needsClientProcessing: i.needsClientProcessing
        });
      } else
        i = await s.fetchAll(t, this._abortController.signal), Bs(this.id, {
          page: 1,
          pageSize: 0,
          total: i.totalCount,
          needsClientProcessing: i.needsClientProcessing
        });
      this._data = i.data, ys(this.id, this._data), this.cacheTtl > 0 && ce() && this._putCache(this._data).catch(() => {
      });
    } catch (i) {
      if (i.name === "AbortError")
        return;
      if (this.cacheTtl > 0 && ce()) {
        const r = await this._getCache();
        if (r) {
          this._data = r, ys(this.id, this._data), this.dispatchEvent(new CustomEvent("cache-fallback", { detail: { sourceId: this.id } }));
          return;
        }
      }
      this._error = i, Cs(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, i);
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
        Object.entries(e).forEach(([i, r]) => {
          t.searchParams.set(i, String(r));
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
}, o(ot, "GouvSource"), ot);
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
  F()
], _.prototype, "_loading", void 0);
U([
  F()
], _.prototype, "_error", void 0);
U([
  F()
], _.prototype, "_data", void 0);
_ = U([
  q("gouv-source")
], _);
var rs = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, Lt;
let es = (Lt = class extends V {
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
    super.disconnectedCallback(), this._clearServerDelegation(), this._cleanup(), this.id && (ne(this.id), Ui(this.id));
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
    var c;
    this._serverDelegated = { groupBy: !1, aggregate: !1, orderBy: !1 };
    const s = document.getElementById(this.source);
    if (!s || !("getAdapter" in s))
      return;
    const t = (c = s.getAdapter) == null ? void 0 : c.call(s);
    if (!(t != null && t.capabilities))
      return;
    const e = t.capabilities, i = s.groupBy || "", r = s.aggregate || "", n = {};
    this.groupBy && e.serverGroupBy && !i && !r && (n.groupBy = this.groupBy, this._serverDelegated.groupBy = !0, this.aggregate && (n.aggregate = this.aggregate, this._serverDelegated.aggregate = !0));
    const a = s.orderBy || "";
    this.orderBy && e.serverOrderBy && !a && (n.orderBy = this.orderBy, this._serverDelegated.orderBy = !0), Object.keys(n).length > 0 && ws(this.source, n);
  }
  /**
   * Clear server-side overlays on gouv-source (disconnect cleanup).
   * Sends empty values so gouv-source reverts to its own attributes.
   */
  _clearServerDelegation() {
    if (!this.source || !this._hasServerDelegation())
      return;
    const s = {};
    this._serverDelegated.groupBy && (s.groupBy = ""), this._serverDelegated.aggregate && (s.aggregate = ""), this._serverDelegated.orderBy && (s.orderBy = ""), Object.keys(s).length > 0 && ws(this.source, s), this._serverDelegated = { groupBy: !1, aggregate: !1, orderBy: !1 };
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
      const t = Ps(s);
      t !== void 0 && (this._rawData = Array.isArray(t) ? t : [t], this._handleSourceData());
    }
    this._unsubscribe = ae(s, {
      onLoaded: /* @__PURE__ */ o((t) => {
        this._rawData = Array.isArray(t) ? t : [t], this._handleSourceData();
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ o(() => {
        this._loading = !0, Us(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ o((t) => {
        this._error = t, this._loading = !1, Cs(this.id, t);
      }, "onError")
    });
  }
  /**
   * Handle data received from upstream source.
   */
  _handleSourceData() {
    try {
      Us(this.id), this._loading = !0, this._processClientSide();
    } catch (s) {
      this._error = s, Cs(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de traitement`, s);
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
    const t = Gs(this.source), e = (t == null ? void 0 : t.needsClientProcessing) === !0, i = this.filter || this.where;
    i && (s = this._applyFilters(s, i)), this.groupBy && (!this._serverDelegated.groupBy || e) && (s = this._applyGroupByAndAggregate(s)), this.orderBy && (!this._serverDelegated.orderBy || e) && (s = this._applySort(s)), this.limit > 0 && (s = s.slice(0, this.limit)), this._data = s, ys(this.id, this._data);
  }
  /**
   * Parse et applique les filtres (format: "field:operator:value")
   */
  _applyFilters(s, t) {
    const e = this._parseFilters(t);
    return s.filter((i) => e.every((r) => this._matchesFilter(i, r)));
  }
  _parseFilters(s) {
    const t = [], e = s.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of e) {
      const r = i.split(":");
      if (r.length >= 2) {
        const n = r[0], a = r[1];
        let c;
        if (r.length > 2) {
          const d = r.slice(2).join(":");
          a === "in" || a === "notin" ? c = d.split("|").map((L) => {
            const l = this._parseValue(L);
            return typeof l == "boolean" ? String(l) : l;
          }) : c = this._parseValue(d);
        }
        t.push({ field: n, operator: a, value: c });
      }
    }
    return t;
  }
  _parseValue(s) {
    return s === "true" ? !0 : s === "false" ? !1 : !isNaN(Number(s)) && s !== "" ? Number(s) : s;
  }
  _matchesFilter(s, t) {
    const e = B(s, t.field);
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
      const a = t.map((c) => String(B(n, c) ?? "")).join("|||");
      i.has(a) || i.set(a, []), i.get(a).push(n);
    }
    const r = [];
    for (const [n, a] of i) {
      const c = {}, d = n.split("|||");
      t.forEach((L, l) => {
        Tr(c, L, d[l]);
      });
      for (const L of e) {
        const l = L.alias || `${L.field}__${L.function}`;
        Tr(c, l, this._computeAggregate(a, L));
      }
      r.push(c);
    }
    return r;
  }
  _parseAggregates(s) {
    if (!s)
      return [];
    const t = [], e = s.split(",").map((i) => i.trim()).filter(Boolean);
    for (const i of e) {
      const r = i.split(":");
      r.length >= 2 && t.push({
        field: r[0],
        function: r[1],
        alias: r[2]
      });
    }
    return t;
  }
  _computeAggregate(s, t) {
    const e = s.map((i) => Number(B(i, t.field))).filter((i) => !isNaN(i));
    switch (t.function) {
      case "count":
        return s.length;
      case "sum":
        return e.reduce((i, r) => i + r, 0);
      case "avg":
        return e.length > 0 ? e.reduce((i, r) => i + r, 0) / e.length : 0;
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
    return [...s].sort((r, n) => {
      const a = B(r, e), c = B(n, e), d = Number(a), L = Number(c);
      if (!isNaN(d) && !isNaN(L))
        return i === "desc" ? L - d : d - L;
      const l = String(a ?? ""), N = String(c ?? "");
      return i === "desc" ? N.localeCompare(l) : l.localeCompare(N);
    });
  }
  // --- Command forwarding ---
  /**
   * Forward commands from downstream components to the upstream source.
   * In server-side mode, datalist/search/facets send commands to this query;
   * we forward them to the actual gouv-source.
   */
  _setupCommandForwarding() {
    this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), !(!this.id || !this.serverSide) && this.source && (this._unsubscribeCommands = ve(this.id, (s) => {
      ws(this.source, s);
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
      const s = Ps(this.source);
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
}, o(Lt, "GouvQuery"), Lt);
rs([
  y({ type: String })
], es.prototype, "source", void 0);
rs([
  y({ type: String })
], es.prototype, "where", void 0);
rs([
  y({ type: String })
], es.prototype, "filter", void 0);
rs([
  y({ type: String, attribute: "group-by" })
], es.prototype, "groupBy", void 0);
rs([
  y({ type: String })
], es.prototype, "aggregate", void 0);
rs([
  y({ type: String, attribute: "order-by" })
], es.prototype, "orderBy", void 0);
rs([
  y({ type: Number })
], es.prototype, "limit", void 0);
rs([
  y({ type: String })
], es.prototype, "transform", void 0);
rs([
  y({ type: Boolean, attribute: "server-side" })
], es.prototype, "serverSide", void 0);
rs([
  y({ type: Number, attribute: "page-size" })
], es.prototype, "pageSize", void 0);
rs([
  y({ type: Number })
], es.prototype, "refresh", void 0);
rs([
  F()
], es.prototype, "_loading", void 0);
rs([
  F()
], es.prototype, "_error", void 0);
rs([
  F()
], es.prototype, "_data", void 0);
rs([
  F()
], es.prototype, "_rawData", void 0);
es = rs([
  q("gouv-query")
], es);
var Fs = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, lt;
let ds = (lt = class extends V {
  constructor() {
    super(...arguments), this.source = "", this.numeric = "", this.numericAuto = !1, this.rename = "", this.trim = !1, this.stripHtml = !1, this.replace = "", this.replaceFields = "", this.flatten = "", this.round = "", this.lowercaseKeys = !1, this._unsubscribe = null, this._unsubscribePageRequests = null;
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
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null), this.id && (ne(this.id), Ui(this.id));
  }
  updated(s) {
    if (super.updated(s), s.has("source")) {
      this._initialize();
      return;
    }
    if (["flatten", "numeric", "numericAuto", "round", "rename", "trim", "stripHtml", "replace", "replaceFields", "lowercaseKeys"].some((i) => s.has(i))) {
      const i = this.source ? Ps(this.source) : void 0;
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
    const s = Ps(this.source);
    s !== void 0 && this._processData(s), this._unsubscribe = ae(this.source, {
      onLoaded: /* @__PURE__ */ o((t) => {
        this._processData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ o(() => {
        Us(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ o((t) => {
        Cs(this.id, t);
      }, "onError")
    }), this._unsubscribePageRequests = ve(this.id, (t) => {
      ws(this.source, t);
    });
  }
  _processData(s) {
    try {
      Us(this.id);
      let t = Array.isArray(s) ? s : [s];
      this.flatten && (t = t.map((L) => L == null || typeof L != "object" || Array.isArray(L) ? L : this._flattenRow(L, this.flatten)));
      const e = this._parseNumericFields(), i = this._parseRoundFields(), r = this._parsePipeMap(this.rename), n = this._parsePipeMap(this.replace), a = this._parseReplaceFields(this.replaceFields), c = t.map((L) => L == null || typeof L != "object" ? L : this._normalizeRow(L, e, i, r, n, a));
      ys(this.id, c);
      const d = Gs(this.source);
      d && Bs(this.id, d);
    } catch (t) {
      Cs(this.id, t), console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`, t);
    }
  }
  _normalizeRow(s, t, e, i, r, n) {
    const a = {};
    for (const [c, d] of Object.entries(s)) {
      const L = this.trim ? c.trim() : c;
      let l = d;
      if (this.trim && typeof l == "string" && (l = l.trim()), this.stripHtml && typeof l == "string" && (l = l.replace(/<[^>]*>/g, "")), n.size > 0 && typeof l == "string") {
        const x = n.get(L);
        if (x) {
          for (const [b, u] of x)
            if (l === b) {
              l = u;
              break;
            }
        }
      }
      if (r.size > 0 && typeof l == "string") {
        for (const [x, b] of r)
          if (l === x) {
            l = b;
            break;
          }
      }
      if (t.has(L))
        l = yr(l);
      else if (this.numericAuto && typeof l == "string" && GM(l)) {
        const x = yr(l, !0);
        x !== null && (l = x);
      }
      if (e.has(L) && typeof l == "number" && isFinite(l)) {
        const x = e.get(L);
        if (x === 0)
          l = Math.round(l);
        else {
          const b = 10 ** x;
          l = Math.round(l * b) / b;
        }
      }
      const N = i.get(L) ?? L, T = this.lowercaseKeys ? N.toLowerCase() : N;
      a[T] = l;
    }
    return a;
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
  /** Parse l'attribut round en Map<champ, decimales>. Format: "champ1, champ2" (0 decimales) ou "champ1:2, champ2:1" */
  _parseRoundFields() {
    const s = /* @__PURE__ */ new Map();
    if (!this.round)
      return s;
    for (const t of this.round.split(",")) {
      const e = t.trim();
      if (!e)
        continue;
      const i = e.indexOf(":");
      if (i === -1)
        s.set(e, 0);
      else {
        const r = e.substring(0, i).trim(), n = parseInt(e.substring(i + 1).trim(), 10);
        r && s.set(r, isNaN(n) ? 0 : n);
      }
    }
    return s;
  }
  /** Parse l'attribut replace-fields en Map<champ, Map<pattern, remplacement>> */
  _parseReplaceFields(s) {
    const t = /* @__PURE__ */ new Map();
    if (!s)
      return t;
    const e = s.split("|");
    for (const i of e) {
      const r = i.trim(), n = r.indexOf(":");
      if (n === -1)
        continue;
      const a = r.indexOf(":", n + 1);
      if (a === -1)
        continue;
      const c = r.substring(0, n).trim(), d = r.substring(n + 1, a).trim(), L = r.substring(a + 1).trim();
      !c || !d || (t.has(c) || t.set(c, /* @__PURE__ */ new Map()), t.get(c).set(d, L));
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
      const r = i.indexOf(":");
      if (r === -1)
        continue;
      const n = i.substring(0, r).trim(), a = i.substring(r + 1).trim();
      n && t.set(n, a);
    }
    return t;
  }
}, o(lt, "GouvNormalize"), lt);
Fs([
  y({ type: String })
], ds.prototype, "source", void 0);
Fs([
  y({ type: String })
], ds.prototype, "numeric", void 0);
Fs([
  y({ type: Boolean, attribute: "numeric-auto" })
], ds.prototype, "numericAuto", void 0);
Fs([
  y({ type: String })
], ds.prototype, "rename", void 0);
Fs([
  y({ type: Boolean })
], ds.prototype, "trim", void 0);
Fs([
  y({ type: Boolean, attribute: "strip-html" })
], ds.prototype, "stripHtml", void 0);
Fs([
  y({ type: String })
], ds.prototype, "replace", void 0);
Fs([
  y({ type: String, attribute: "replace-fields" })
], ds.prototype, "replaceFields", void 0);
Fs([
  y({ type: String })
], ds.prototype, "flatten", void 0);
Fs([
  y({ type: String })
], ds.prototype, "round", void 0);
Fs([
  y({ type: Boolean, attribute: "lowercase-keys" })
], ds.prototype, "lowercaseKeys", void 0);
ds = Fs([
  q("gouv-normalize")
], ds);
var Y = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, dt;
let A = (dt = class extends V {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.labels = "", this.maxValues = 6, this.disjunctive = "", this.sort = "count", this.searchable = "", this.hideEmpty = !1, this.display = "", this.urlParams = !1, this.urlParamMap = "", this.urlSync = !1, this.serverFacets = !1, this.staticValues = "", this.hideCounts = !1, this.cols = "", this._rawData = [], this._facetGroups = [], this._activeSelections = {}, this._expandedFacets = /* @__PURE__ */ new Set(), this._searchQueries = {}, this._openMultiselectField = null, this._liveAnnouncement = "", this._unsubscribe = null, this._unsubscribeCommands = null, this._popstateHandler = null, this._urlParamsApplied = !1, this._onClickOutsideMultiselect = (s) => {
      if (!this._openMultiselectField)
        return;
      const t = s.target, e = this.querySelector(`[data-multiselect="${this._openMultiselectField}"]`);
      e && !e.contains(t) && (this._openMultiselectField = null);
    }, this._searchDebounceTimer = null;
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
    super.disconnectedCallback(), document.removeEventListener("click", this._onClickOutsideMultiselect), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), this.id && ne(this.id);
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
    const t = Ps(this.source);
    t !== void 0 && this._onData(t), this._unsubscribe = ae(this.source, {
      onLoaded: /* @__PURE__ */ o((e) => {
        this._onData(e);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ o(() => {
        Us(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ o((e) => {
        Cs(this.id, e);
      }, "onError")
    }), this._unsubscribeCommands && this._unsubscribeCommands(), this._unsubscribeCommands = ve(this.id, (e) => {
      ws(this.source, e);
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
        const e = Gs(this.source);
        e && Bs(this.id, e), ys(this.id, this._rawData);
      }
    } else if (this.staticValues) {
      if (this._buildStaticFacetGroups(), this.id) {
        const e = Gs(this.source);
        e && Bs(this.id, e), ys(this.id, this._rawData);
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
        const s = JSON.parse(this.staticValues), t = this._parseLabels(), e = this.fields ? Vt(this.fields) : Object.keys(s);
        this._facetGroups = e.filter((i) => s[i] && s[i].length > 0).map((i) => ({
          field: i,
          label: t.get(i) ?? i,
          values: s[i].map((r) => ({ value: r, count: 0 }))
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
    var r;
    const t = document.getElementById(this.source), e = (r = t == null ? void 0 : t.getAdapter) == null ? void 0 : r.call(t);
    if (e != null && e.buildFacetWhere)
      return e.buildFacetWhere(this._activeSelections, s);
    const i = [];
    for (const [n, a] of Object.entries(this._activeSelections))
      n === s || a.size === 0 || (a.size === 1 ? i.push(`${n}:eq:${[...a][0]}`) : i.push(`${n}:in:${[...a].join("|")}`));
    return i.join(", ");
  }
  /** Resolve a possibly dotted field path on a row (e.g. "fields.Region") */
  _resolveValue(s, t) {
    if (!t.includes("."))
      return s[t];
    const e = t.split(".");
    let i = s;
    for (const r of e) {
      if (i == null || typeof i != "object")
        return;
      i = i[r];
    }
    return i;
  }
  /** Get fields to use as facets — explicit or auto-detected */
  _getFields() {
    return this.fields ? Vt(this.fields) : this._autoDetectFields();
  }
  /** Auto-detect categorical fields: string type, 2-50 unique values, not all unique (ID-like) */
  _autoDetectFields() {
    if (this._rawData.length === 0)
      return [];
    const s = [], t = this._rawData[0];
    for (const e of Object.keys(t)) {
      const i = /* @__PURE__ */ new Set();
      let r = !0;
      for (const n of this._rawData) {
        const a = n[e];
        if (!(a == null || a === "")) {
          if (typeof a != "string") {
            r = !1;
            break;
          }
          if (i.add(a), i.size > 50)
            break;
        }
      }
      r && (i.size <= 1 || i.size > 50 || i.size !== this._rawData.length && s.push(e));
    }
    return s;
  }
  /** Compute facet values with counts, applying cross-facet filtering for dynamic counts */
  _computeFacetValues(s) {
    const t = this._getDataFilteredExcluding(s), e = /* @__PURE__ */ new Map();
    for (const r of t) {
      const n = this._resolveValue(r, s);
      if (n == null || n === "")
        continue;
      const a = String(n);
      e.set(a, (e.get(a) ?? 0) + 1);
    }
    const i = [];
    for (const [r, n] of e)
      i.push({ value: r, count: n });
    return this._sortValues(i);
  }
  /** Filter data by all active selections EXCEPT the given field */
  _getDataFilteredExcluding(s) {
    const t = Object.keys(this._activeSelections).filter((e) => e !== s && this._activeSelections[e].size > 0);
    return t.length === 0 ? this._rawData : this._rawData.filter((e) => t.every((i) => {
      const r = this._activeSelections[i], n = this._resolveValue(e, i);
      return n == null ? !1 : r.has(String(n));
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
    var l, N;
    const s = document.getElementById(this.source);
    if (!s)
      return;
    const t = (l = s.getAdapter) == null ? void 0 : l.call(s);
    if (!(t != null && t.capabilities.serverFacets) || !t.fetchFacets) {
      this._buildFacetGroups(), this._applyFilters();
      return;
    }
    const e = s.baseUrl || s.getAttribute("base-url") || "", i = s.datasetId || s.getAttribute("dataset-id") || "";
    if (!i)
      return;
    let r;
    const n = s.headers || s.getAttribute("headers") || "";
    if (n)
      try {
        r = JSON.parse(n);
      } catch {
      }
    const a = Vt(this.fields);
    if (a.length === 0)
      return;
    const c = this._parseLabels(), d = /* @__PURE__ */ new Map();
    for (const T of a) {
      const x = ((N = s.getEffectiveWhere) == null ? void 0 : N.call(s, this.id)) || "", b = this._buildFacetWhere(T), u = [x, b].filter(Boolean).join(" AND ");
      d.has(u) || d.set(u, []), d.get(u).push(T);
    }
    const L = [];
    for (const [T, x] of d)
      try {
        const b = await t.fetchFacets({ baseUrl: e, datasetId: i, headers: r }, x, T);
        for (const u of b)
          L.push({
            field: u.field,
            label: c.get(u.field) ?? u.field,
            values: this._sortValues(u.values)
          });
      } catch {
      }
    this._facetGroups = a.map((T) => L.find((x) => x.field === T)).filter((T) => !!T).filter((T) => !(this.hideEmpty && T.values.length <= 1));
  }
  /** Dispatch facet where command to upstream gouv-query */
  _dispatchFacetCommand() {
    const s = this._buildFacetWhere();
    ws(this.source, { where: s, whereKey: this.id });
  }
  // --- Filtering ---
  _applyFilters() {
    const s = Object.keys(this._activeSelections).filter((e) => this._activeSelections[e].size > 0);
    let t;
    s.length === 0 ? t = this._rawData : t = this._rawData.filter((e) => s.every((i) => {
      const r = this._activeSelections[i], n = this._resolveValue(e, i);
      return n == null ? !1 : r.has(String(n));
    })), ys(this.id, t);
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
      const r = e.substring(0, i).trim(), n = e.substring(i + 1).trim();
      r && s.set(r, n);
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
      const r = e.substring(0, i).trim(), n = e.substring(i + 1).trim();
      r && (n === "checkbox" || n === "select" || n === "multiselect" || n === "radio") && s.set(r, n);
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
      const r = i.indexOf(":");
      if (r === -1)
        continue;
      const n = i.substring(0, r).trim(), a = parseInt(i.substring(r + 1).trim(), 10);
      n && !isNaN(a) && t.set(n, a);
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
    const e = { ...this._activeSelections }, i = new Set(e[s] ?? []), r = this._getDisplayMode(s), n = Vt(this.disjunctive), a = r === "multiselect" || r === "checkbox" && n.includes(s), c = i.has(t);
    if (c ? i.delete(t) : (a || i.clear(), i.add(t)), i.size === 0 ? delete e[s] : e[s] = i, this._activeSelections = e, this._afterSelectionChange(), r === "multiselect" || r === "radio" || r === "checkbox") {
      const d = c ? "deselectionnee" : "selectionnee";
      this._announce(`${t} ${d}, ${i.size} option${i.size > 1 ? "s" : ""} selectionnee${i.size > 1 ? "s" : ""}`);
    }
  }
  _handleSelectChange(s, t) {
    const i = t.target.value, r = { ...this._activeSelections };
    i ? r[s] = /* @__PURE__ */ new Set([i]) : delete r[s], this._activeSelections = r, this._afterSelectionChange();
  }
  _clearFieldSelections(s) {
    const t = { ...this._activeSelections };
    delete t[s], this._activeSelections = t, this._afterSelectionChange(), this._announce("Aucune option selectionnee");
  }
  _selectAllValues(s) {
    const t = this._facetGroups.find((i) => i.field === s);
    if (!t)
      return;
    const e = { ...this._activeSelections };
    e[s] = new Set(t.values.map((i) => i.value)), this._activeSelections = e, this._afterSelectionChange(), this._announce(`${t.values.length} options selectionnees`);
  }
  _toggleMultiselectDropdown(s) {
    this._openMultiselectField === s ? this._openMultiselectField = null : (this._openMultiselectField = s, this.updateComplete.then(() => {
      const t = this.querySelector(`[data-multiselect="${s}"] .gouv-facets__multiselect-panel`), e = t == null ? void 0 : t.querySelector("button, input, select, [tabindex]");
      e == null || e.focus();
      const i = this._facetGroups.find((r) => r.field === s);
      if (i) {
        const r = this._activeSelections[s] ?? /* @__PURE__ */ new Set();
        this._announce(`${i.label}, ${i.values.length} options disponibles, ${r.size} selectionnee${r.size > 1 ? "s" : ""}`);
      }
    }));
  }
  _announce(s) {
    this._liveAnnouncement = "", requestAnimationFrame(() => {
      this._liveAnnouncement = s;
    });
  }
  _handleMultiselectKeydown(s, t) {
    if (t.key === "Escape") {
      this._openMultiselectField = null;
      const e = this.querySelector(`[data-multiselect="${s}"] .gouv-facets__multiselect-trigger`);
      e == null || e.focus();
      return;
    }
    if (t.key === "Tab") {
      const e = this.querySelector(`[data-multiselect="${s}"] .gouv-facets__multiselect-panel`);
      if (!e)
        return;
      const i = [...e.querySelectorAll('button:not([tabindex="-1"]), input, select, [tabindex]:not([tabindex="-1"])')];
      if (i.length === 0)
        return;
      const r = i[0], n = i[i.length - 1];
      t.shiftKey && document.activeElement === r ? (t.preventDefault(), n.focus()) : !t.shiftKey && document.activeElement === n && (t.preventDefault(), r.focus());
      return;
    }
    if (t.key === "ArrowDown" || t.key === "ArrowUp" || t.key === "Home" || t.key === "End") {
      const e = this.querySelector(`[data-multiselect="${s}"] .gouv-facets__multiselect-panel`);
      if (!e)
        return;
      const i = [...e.querySelectorAll('input[type="checkbox"], input[type="radio"]')];
      if (i.length === 0)
        return;
      const r = i.indexOf(t.target);
      if (r === -1 && t.key !== "ArrowDown")
        return;
      t.preventDefault();
      let n;
      t.key === "ArrowDown" ? n = r === -1 ? 0 : Math.min(r + 1, i.length - 1) : t.key === "ArrowUp" ? n = Math.max(r - 1, 0) : t.key === "Home" ? n = 0 : n = i.length - 1, i[n].focus();
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
    this._searchQueries = { ...this._searchQueries, [s]: e.value }, this._searchDebounceTimer && clearTimeout(this._searchDebounceTimer), this._searchDebounceTimer = setTimeout(() => {
      const i = this._facetGroups.find((a) => a.field === s);
      if (!i)
        return;
      const r = e.value.toLowerCase(), n = r ? i.values.filter((a) => a.value.toLowerCase().includes(r)).length : i.values.length;
      this._announce(n === 0 ? "Aucune option trouvee" : `${n} option${n > 1 ? "s" : ""} disponible${n > 1 ? "s" : ""}`);
    }, 300);
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
      const r = e.substring(0, i).trim(), n = e.substring(i + 1).trim();
      r && n && s.set(r, n);
    }
    return s;
  }
  /** Read URL search params and apply as facet pre-selections */
  _applyUrlParams() {
    const s = new URLSearchParams(window.location.search), t = this._parseUrlParamMap(), e = {};
    for (const [i, r] of s.entries()) {
      const n = t.size > 0 ? t.get(i) ?? null : i;
      if (!n)
        continue;
      const a = r.split(",").map((c) => c.trim()).filter(Boolean);
      e[n] || (e[n] = /* @__PURE__ */ new Set());
      for (const c of a)
        e[n].add(c);
    }
    Object.keys(e).length > 0 && (this._activeSelections = e);
  }
  /** Sync current facet selections back to URL (replaceState) */
  _syncUrl() {
    const s = new URLSearchParams(), t = this._parseUrlParamMap(), e = /* @__PURE__ */ new Map();
    for (const [n, a] of t)
      e.set(a, n);
    for (const [n, a] of Object.entries(this._activeSelections)) {
      if (a.size === 0)
        continue;
      const c = e.get(n) ?? n;
      s.set(c, [...a].join(","));
    }
    const i = s.toString(), r = i ? `${window.location.pathname}?${i}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", r);
  }
  // --- Rendering ---
  render() {
    if (this._rawData.length === 0 || this._facetGroups.length === 0)
      return h;
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
        ` : h}
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
    const e = Vt(this.searchable).includes(s.field), i = (this._searchQueries[s.field] ?? "").toLowerCase(), r = this._expandedFacets.has(s.field), n = this._activeSelections[s.field] ?? /* @__PURE__ */ new Set();
    let a = s.values;
    e && i && (a = a.filter((l) => l.value.toLowerCase().includes(i)));
    const c = r ? a : a.slice(0, this.maxValues), d = a.length > this.maxValues, L = `facet-${this.id}-${s.field}`;
    return z`
      <fieldset class="fr-fieldset gouv-facets__group" aria-labelledby="${L}-legend">
        <legend class="fr-fieldset__legend fr-text--bold" id="${L}-legend">${s.label}</legend>
        <div aria-live="polite" class="fr-sr-only">${this._liveAnnouncement}</div>
        ${e ? z`
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[s.field] ?? ""}"
                @input="${(l) => this._handleSearch(s.field, l)}"
                aria-label="Rechercher dans ${s.label}">
            </div>
          </div>
        ` : h}
        ${c.map((l) => {
      const N = `${L}-${l.value.replace(/[^a-zA-Z0-9]/g, "_")}`, T = n.has(l.value);
      return z`
            <div class="fr-fieldset__element">
              <div class="fr-checkbox-group fr-checkbox-group--sm">
                <input type="checkbox" id="${N}"
                  .checked="${T}"
                  @change="${() => this._toggleValue(s.field, l.value)}">
                <label class="fr-label" for="${N}">
                  ${l.value}${this._effectiveHideCounts ? h : z`<span class="gouv-facets__count" aria-hidden="true">${l.count}</span><span class="fr-sr-only">, ${l.count} resultat${l.count > 1 ? "s" : ""}</span>`}
                </label>
              </div>
            </div>
          `;
    })}
        ${d ? z`
          <div class="fr-fieldset__element">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm" type="button"
              @click="${() => this._toggleExpand(s.field)}">
              ${r ? "Voir moins" : `Voir plus (${a.length - this.maxValues})`}
            </button>
          </div>
        ` : h}
      </fieldset>
    `;
  }
  _renderSelectGroup(s) {
    const t = `facet-${this.id}-${s.field}`, e = this._activeSelections[s.field], i = e ? [...e][0] ?? "" : "";
    return z`
      <div class="gouv-facets__group fr-select-group" data-field="${s.field}">
        <label class="fr-label" for="${t}-select">${s.label}</label>
        <select class="fr-select" id="${t}-select"
          @change="${(r) => this._handleSelectChange(s.field, r)}">
          <option value="" ?selected="${!i}">Tous</option>
          ${s.values.map((r) => z`
            <option value="${r.value}" ?selected="${r.value === i}">
              ${this._effectiveHideCounts ? r.value : `${r.value} (${r.count})`}
            </option>
          `)}
        </select>
      </div>
    `;
  }
  _renderMultiselectGroup(s) {
    const t = `facet-${this.id}-${s.field}`, e = this._activeSelections[s.field] ?? /* @__PURE__ */ new Set(), i = this._openMultiselectField === s.field, r = (this._searchQueries[s.field] ?? "").toLowerCase();
    let n = s.values;
    r && (n = n.filter((d) => d.value.toLowerCase().includes(r)));
    const a = e.size > 0 ? `${e.size} option${e.size > 1 ? "s" : ""} selectionnee${e.size > 1 ? "s" : ""}` : "Selectionnez des options", c = e.size > 0 ? [...e].join(", ") : "";
    return z`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${s.field}"
           data-field="${s.field}"
           @keydown="${(d) => this._handleMultiselectKeydown(s.field, d)}"
           @focusout="${(d) => this._handleMultiselectFocusout(s.field, d)}">
        <label class="fr-label" id="${t}-legend">${s.label}</label>
        ${c ? z`<span class="fr-sr-only" id="${t}-desc">${c}</span>` : h}
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${i}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          aria-describedby="${c ? `${t}-desc` : h}"
          @click="${(d) => {
      d.stopPropagation(), this._toggleMultiselectDropdown(s.field);
    }}">
          ${a}
        </button>
        ${i ? z`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-label="${s.label}"
               @click="${(d) => d.stopPropagation()}">
            <div aria-live="polite" class="fr-sr-only">${this._liveAnnouncement}</div>
            <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left ${e.size > 0 ? "fr-icon-close-circle-line" : "fr-icon-check-line"} gouv-facets__multiselect-toggle"
              type="button"
              aria-label="${e.size > 0 ? `Tout deselectionner pour ${s.label}` : `Tout selectionner pour ${s.label}`}"
              @click="${() => e.size > 0 ? this._clearFieldSelections(s.field) : this._selectAllValues(s.field)}">
              ${e.size > 0 ? "Tout deselectionner" : "Tout selectionner"}
            </button>
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${s.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                aria-describedby="${t}-search-hint"
                .value="${this._searchQueries[s.field] ?? ""}"
                @input="${(d) => this._handleSearch(s.field, d)}">
              <span class="fr-sr-only" id="${t}-search-hint">Les resultats se mettent a jour automatiquement</span>
              <button class="fr-btn" type="button" title="Rechercher" aria-hidden="true" tabindex="-1">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${s.label}">
              ${n.map((d) => {
      const L = `${t}-${d.value.replace(/[^a-zA-Z0-9]/g, "_")}`, l = e.has(d.value);
      return z`
                  <div class="fr-fieldset__element">
                    <div class="fr-checkbox-group fr-checkbox-group--sm">
                      <input type="checkbox" id="${L}"
                        .checked="${l}"
                        @change="${() => this._toggleValue(s.field, d.value)}">
                      <label class="fr-label" for="${L}">
                        ${d.value}${this._effectiveHideCounts ? h : z`<span class="gouv-facets__count" aria-hidden="true">${d.count}</span><span class="fr-sr-only">, ${d.count} resultat${d.count > 1 ? "s" : ""}</span>`}
                      </label>
                    </div>
                  </div>
                `;
    })}
            </fieldset>
          </div>
        ` : h}
      </div>
    `;
  }
  _renderRadioGroup(s) {
    const t = `facet-${this.id}-${s.field}`, e = this._activeSelections[s.field] ?? /* @__PURE__ */ new Set(), i = this._openMultiselectField === s.field, r = (this._searchQueries[s.field] ?? "").toLowerCase();
    let n = s.values;
    r && (n = n.filter((d) => d.value.toLowerCase().includes(r)));
    const a = e.size > 0 ? [...e][0] : null, c = a ?? "Selectionnez une option";
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
          ${c}
        </button>
        ${i ? z`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-label="${s.label}"
               @click="${(d) => d.stopPropagation()}">
            <div aria-live="polite" class="fr-sr-only">${this._liveAnnouncement}</div>
            ${a ? z`
              <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line gouv-facets__multiselect-toggle"
                type="button"
                aria-label="Reinitialiser ${s.label}"
                @click="${() => this._clearFieldSelections(s.field)}">
                Reinitialiser
              </button>
            ` : h}
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${s.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                aria-describedby="${t}-search-hint"
                .value="${this._searchQueries[s.field] ?? ""}"
                @input="${(d) => this._handleSearch(s.field, d)}">
              <span class="fr-sr-only" id="${t}-search-hint">Les resultats se mettent a jour automatiquement</span>
              <button class="fr-btn" type="button" title="Rechercher" aria-hidden="true" tabindex="-1">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${s.label}">
              ${n.map((d) => {
      const L = `${t}-${d.value.replace(/[^a-zA-Z0-9]/g, "_")}`, l = e.has(d.value);
      return z`
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-group--sm">
                      <input type="radio" id="${L}" name="${t}-radio"
                        .checked="${l}"
                        @change="${() => this._toggleValue(s.field, d.value)}">
                      <label class="fr-label" for="${L}">
                        ${d.value}${this._effectiveHideCounts ? h : z`<span class="gouv-facets__count" aria-hidden="true">${d.count}</span><span class="fr-sr-only">, ${d.count} resultat${d.count > 1 ? "s" : ""}</span>`}
                      </label>
                    </div>
                  </div>
                `;
    })}
            </fieldset>
          </div>
        ` : h}
      </div>
    `;
  }
}, o(dt, "GouvFacets"), dt);
Y([
  y({ type: String })
], A.prototype, "source", void 0);
Y([
  y({ type: String })
], A.prototype, "fields", void 0);
Y([
  y({ type: String })
], A.prototype, "labels", void 0);
Y([
  y({ type: Number, attribute: "max-values" })
], A.prototype, "maxValues", void 0);
Y([
  y({ type: String })
], A.prototype, "disjunctive", void 0);
Y([
  y({ type: String })
], A.prototype, "sort", void 0);
Y([
  y({ type: String })
], A.prototype, "searchable", void 0);
Y([
  y({ type: Boolean, attribute: "hide-empty" })
], A.prototype, "hideEmpty", void 0);
Y([
  y({ type: String })
], A.prototype, "display", void 0);
Y([
  y({ type: Boolean, attribute: "url-params" })
], A.prototype, "urlParams", void 0);
Y([
  y({ type: String, attribute: "url-param-map" })
], A.prototype, "urlParamMap", void 0);
Y([
  y({ type: Boolean, attribute: "url-sync" })
], A.prototype, "urlSync", void 0);
Y([
  y({ type: Boolean, attribute: "server-facets" })
], A.prototype, "serverFacets", void 0);
Y([
  y({ type: String, attribute: "static-values" })
], A.prototype, "staticValues", void 0);
Y([
  y({ type: Boolean, attribute: "hide-counts" })
], A.prototype, "hideCounts", void 0);
Y([
  y({ type: String })
], A.prototype, "cols", void 0);
Y([
  F()
], A.prototype, "_rawData", void 0);
Y([
  F()
], A.prototype, "_facetGroups", void 0);
Y([
  F()
], A.prototype, "_activeSelections", void 0);
Y([
  F()
], A.prototype, "_expandedFacets", void 0);
Y([
  F()
], A.prototype, "_searchQueries", void 0);
Y([
  F()
], A.prototype, "_openMultiselectField", void 0);
Y([
  F()
], A.prototype, "_liveAnnouncement", void 0);
A = Y([
  q("gouv-facets")
], A);
function Vt(M) {
  return M ? M.split(",").map((s) => s.trim()).filter(Boolean) : [];
}
o(Vt, "_parseCSV");
var K = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, ct;
let G = (ct = class extends V {
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
    super.disconnectedCallback(), this._debounceTimer !== null && (clearTimeout(this._debounceTimer), this._debounceTimer = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && ne(this.id);
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
    s && (s.value = "", s.focus()), this._applyFilter();
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
    const s = Ps(this.source);
    s !== void 0 && this._onData(s), this._unsubscribe = ae(this.source, {
      onLoaded: /* @__PURE__ */ o((e) => {
        this._onData(e);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ o(() => {
        Us(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ o((e) => {
        Cs(this.id, e);
      }, "onError")
    });
  }
  _onData(s) {
    const t = Array.isArray(s) ? s : [];
    if (this.serverSearch) {
      this._allData = t, this._filteredData = t;
      const e = Gs(this.source);
      this._resultCount = e ? e.total : t.length, this.id && (e && Bs(this.id, e), ys(this.id, t)), this.urlSearchParam && !this._urlParamApplied && (this._applyUrlSearchParam(), this._urlParamApplied = !0, this._term && this._applyServerSearch());
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
      this._filteredData = this._allData.filter((r) => this._matchRecord(r, i, t, e));
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
    ws(this.source, { where: t, whereKey: this.id }), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
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
    const r = e.length > 0 ? e : Object.keys(s).filter((n) => !n.startsWith("_"));
    switch (i) {
      case "starts":
        return r.some((n) => this._normalize(String(s[n] ?? "")).split(/\s+/).some((c) => c.startsWith(t)));
      case "words":
        return t.split(/\s+/).filter(Boolean).every((a) => r.some((c) => this._normalize(String(s[c] ?? "")).includes(a)));
      case "contains":
      default:
        return r.some((n) => this._normalize(String(s[n] ?? "")).includes(t));
    }
  }
  _normalize(s) {
    return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }
  _getFields() {
    return this.fields ? this.fields.split(",").map((s) => s.trim()).filter(Boolean) : [];
  }
  _addHighlight(s, t) {
    const e = { ...s }, i = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), r = new RegExp("(" + i + ")", "gi"), n = this._getFields(), a = n.length > 0 ? n : Object.keys(s).filter((d) => typeof s[d] == "string"), c = [];
    return a.forEach((d) => {
      typeof s[d] == "string" && c.push(s[d].replace(r, "<mark>$1</mark>"));
    }), e._highlight = c.join(" … "), e;
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
    this.id && (ys(this.id, this._filteredData), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
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
      e.key === "Enter" && (e.preventDefault(), this._onSubmit()), e.key === "Escape" && this.clear();
    }}">
        <button class="fr-btn" title="Rechercher" type="button"
          @click="${(e) => {
      e.preventDefault(), this._onSubmit();
    }}">
          Rechercher
        </button>
      </div>
      ${this.count ? z`
        <p class="fr-text--sm fr-mt-1v gouv-search-count" aria-live="polite" aria-atomic="true" role="status">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      ` : z`
        <p class="fr-sr-only" aria-live="polite" aria-atomic="true" role="status">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      `}
    `;
  }
}, o(ct, "GouvSearch"), ct);
K([
  y({ type: String })
], G.prototype, "source", void 0);
K([
  y({ type: String })
], G.prototype, "fields", void 0);
K([
  y({ type: String })
], G.prototype, "placeholder", void 0);
K([
  y({ type: String })
], G.prototype, "label", void 0);
K([
  y({ type: Number })
], G.prototype, "debounce", void 0);
K([
  y({ type: Number, attribute: "min-length" })
], G.prototype, "minLength", void 0);
K([
  y({ type: Boolean })
], G.prototype, "highlight", void 0);
K([
  y({ type: String })
], G.prototype, "operator", void 0);
K([
  y({ type: Boolean, attribute: "sr-label" })
], G.prototype, "srLabel", void 0);
K([
  y({ type: Boolean })
], G.prototype, "count", void 0);
K([
  y({ type: String, attribute: "url-search-param" })
], G.prototype, "urlSearchParam", void 0);
K([
  y({ type: Boolean, attribute: "url-sync" })
], G.prototype, "urlSync", void 0);
K([
  y({ type: Boolean, attribute: "server-search" })
], G.prototype, "serverSearch", void 0);
K([
  y({ type: String, attribute: "search-template" })
], G.prototype, "searchTemplate", void 0);
K([
  F()
], G.prototype, "_allData", void 0);
K([
  F()
], G.prototype, "_filteredData", void 0);
K([
  F()
], G.prototype, "_term", void 0);
K([
  F()
], G.prototype, "_resultCount", void 0);
G = K([
  q("gouv-search")
], G);
function Et(M) {
  const t = class t extends M {
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
      const r = Ps(i);
      r !== void 0 && (this._sourceData = r, this.onSourceData(r)), this._unsubscribeSource = ae(i, {
        onLoaded: /* @__PURE__ */ o((n) => {
          this._sourceData = n, this._sourceLoading = !1, this._sourceError = null, this.onSourceData(n), this.requestUpdate();
        }, "onLoaded"),
        onLoading: /* @__PURE__ */ o(() => {
          this._sourceLoading = !0, this.requestUpdate();
        }, "onLoading"),
        onError: /* @__PURE__ */ o((n) => {
          this._sourceError = n, this._sourceLoading = !1, this.onSourceError(n), this.requestUpdate();
        }, "onError")
      });
    }
    _cleanupSubscription() {
      this._unsubscribeSource && (this._unsubscribeSource(), this._unsubscribeSource = null);
    }
  };
  o(t, "SourceSubscriberElement");
  let s = t;
  return s;
}
o(Et, "SourceSubscriberMixin");
function Wr(M, s = "nombre") {
  if (M == null || M === "")
    return "—";
  const t = typeof M == "string" ? parseFloat(M) : M;
  if (isNaN(t))
    return "—";
  switch (s) {
    case "nombre":
      return fr(t);
    case "pourcentage":
      return zn(t);
    case "euro":
      return un(t);
    case "decimal":
      return wn(t);
    default:
      return fr(t);
  }
}
o(Wr, "formatValue");
function fr(M) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(M));
}
o(fr, "formatNumber");
function zn(M) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(M / 100);
}
o(zn, "formatPercentage");
function un(M) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(M);
}
o(un, "formatCurrency");
function wn(M) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(M);
}
o(wn, "formatDecimal");
function Xa(M) {
  const s = typeof M == "string" ? new Date(M) : M;
  return isNaN(s.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(s);
}
o(Xa, "formatDate");
function bn(M, s, t) {
  return s !== void 0 && M >= s ? "vert" : t !== void 0 && M >= t ? "orange" : s !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
o(bn, "getColorBySeuil");
function hn(M) {
  const s = M.split(":");
  if (s.length === 1)
    return s[0] === "count" ? { type: "count", field: "" } : { type: "direct", field: s[0] };
  const t = s[0], e = s[1];
  if (s.length === 3) {
    let i = s[2];
    return i === "true" ? i = !0 : i === "false" ? i = !1 : isNaN(Number(i)) || (i = Number(i)), { type: t, field: e, filterField: e, filterValue: i };
  }
  return { type: t, field: e };
}
o(hn, "parseExpression");
function gr(M, s) {
  const t = hn(s);
  if (t.type === "direct" && !Array.isArray(M))
    return M[t.field];
  if (!Array.isArray(M))
    return null;
  const e = M;
  switch (t.type) {
    case "direct":
    case "first":
      return e.length > 0 ? e[0][t.field] : null;
    case "last":
      return e.length > 0 ? e[e.length - 1][t.field] : null;
    case "count":
      return t.filterValue !== void 0 ? e.filter((r) => r[t.field] === t.filterValue).length : e.length;
    case "sum":
      return e.reduce((r, n) => {
        const a = Number(n[t.field]);
        return r + (isNaN(a) ? 0 : a);
      }, 0);
    case "avg":
      return e.length === 0 ? null : e.reduce((r, n) => {
        const a = Number(n[t.field]);
        return r + (isNaN(a) ? 0 : a);
      }, 0) / e.length;
    case "min":
      return e.length === 0 ? null : Math.min(...e.map((r) => Number(r[t.field])).filter((r) => !isNaN(r)));
    case "max":
      return e.length === 0 ? null : Math.max(...e.map((r) => Number(r[t.field])).filter((r) => !isNaN(r)));
    default:
      return null;
  }
}
o(gr, "computeAggregation");
var Ds = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
};
const Xr = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
var Nt;
let os = (Nt = class extends Et(V) {
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
    return !this._sourceData || !this.valeur ? null : gr(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const s = this._computeValue();
    return typeof s != "number" ? "bleu" : bn(s, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const s = gr(this._sourceData, this.tendance);
    return typeof s != "number" ? null : {
      value: s,
      direction: s > 0 ? "up" : s < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const s = this._computeValue(), t = Wr(s, this.format);
    let e = `${this.label}: ${t}`;
    if (typeof s == "number" && (this.seuilVert !== void 0 || this.seuilOrange !== void 0)) {
      const i = this._getColor(), n = { vert: "bon", orange: "attention", rouge: "critique", bleu: "" }[i];
      n && (e += `, etat ${n}`);
    }
    return e;
  }
  render() {
    const s = this._computeValue(), t = Wr(s, this.format), e = Xr[this._getColor()] || Xr.bleu, i = this._getTendanceInfo();
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
}, o(Nt, "GouvKpi"), Nt);
os.styles = ji``;
Ds([
  y({ type: String })
], os.prototype, "source", void 0);
Ds([
  y({ type: String })
], os.prototype, "valeur", void 0);
Ds([
  y({ type: String })
], os.prototype, "label", void 0);
Ds([
  y({ type: String })
], os.prototype, "description", void 0);
Ds([
  y({ type: String })
], os.prototype, "icone", void 0);
Ds([
  y({ type: String })
], os.prototype, "format", void 0);
Ds([
  y({ type: String })
], os.prototype, "tendance", void 0);
Ds([
  y({ type: Number, attribute: "seuil-vert" })
], os.prototype, "seuilVert", void 0);
Ds([
  y({ type: Number, attribute: "seuil-orange" })
], os.prototype, "seuilOrange", void 0);
Ds([
  y({ type: String })
], os.prototype, "couleur", void 0);
Ds([
  y({ type: Number, reflect: !0 })
], os.prototype, "col", void 0);
os = Ds([
  q("gouv-kpi")
], os);
var Vi = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, Tt;
let qt = (Tt = class extends V {
  constructor() {
    super(...arguments), this.cols = 3, this.gap = "md";
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-kpi-group"), this.hasAttribute("role") || this.setAttribute("role", "group");
  }
  updated(s) {
    if (super.updated(s), s.has("cols")) {
      const t = Math.max(1, Math.min(12, this.cols)), e = Math.max(1, Math.floor(12 / t));
      this.style.setProperty("--_kpi-default-span", String(e));
    }
  }
  render() {
    const s = Math.max(1, Math.floor(12 / Math.max(1, Math.min(12, this.cols))));
    return z`
      <style>
        ::slotted(*:not([col])) {
          grid-column: span ${s};
        }
      </style>
      <slot></slot>
    `;
  }
}, o(Tt, "GouvKpiGroup"), Tt);
qt.styles = ji`
    :host {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--gouv-kpi-group-gap, 1rem);
    }

    :host([gap="sm"]) { --gouv-kpi-group-gap: 0.5rem; }
    :host([gap="md"]) { --gouv-kpi-group-gap: 1rem; }
    :host([gap="lg"]) { --gouv-kpi-group-gap: 1.5rem; }

    /* Per-KPI col overrides (1-12) */
    ::slotted([col="1"])  { grid-column: span 1; }
    ::slotted([col="2"])  { grid-column: span 2; }
    ::slotted([col="3"])  { grid-column: span 3; }
    ::slotted([col="4"])  { grid-column: span 4; }
    ::slotted([col="5"])  { grid-column: span 5; }
    ::slotted([col="6"])  { grid-column: span 6; }
    ::slotted([col="7"])  { grid-column: span 7; }
    ::slotted([col="8"])  { grid-column: span 8; }
    ::slotted([col="9"])  { grid-column: span 9; }
    ::slotted([col="10"]) { grid-column: span 10; }
    ::slotted([col="11"]) { grid-column: span 11; }
    ::slotted([col="12"]) { grid-column: span 12; }

    /* Responsive: stack on mobile */
    @media (max-width: 767px) {
      :host {
        grid-template-columns: 1fr;
      }
      ::slotted(*) {
        grid-column: span 1 !important;
      }
    }
  `;
Vi([
  y({ type: Number })
], qt.prototype, "cols", void 0);
Vi([
  y({ type: String })
], qt.prototype, "gap", void 0);
qt = Vi([
  q("gouv-kpi-group")
], qt);
var ts = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, yt;
let H = (yt = class extends Et(V) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this.urlSync = !1, this.urlPageParam = "page", this.serverTri = !1, this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._previousPage = 1, this._popstateHandler = null, this._liveAnnouncement = "";
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
    const t = this.source ? Gs(this.source) : void 0;
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
      s.sort((i, r) => {
        const n = i[t], a = r[t];
        if (n === a)
          return 0;
        if (n == null)
          return 1;
        if (a == null)
          return -1;
        const c = typeof n == "number" && typeof a == "number" ? n - a : String(n).localeCompare(String(a), "fr");
        return e === "desc" ? -c : c;
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
      !isNaN(e) && e >= 1 && (this._currentPage = e, this.source && ws(this.source, { page: e }));
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
  _announce(s) {
    this._liveAnnouncement = "", requestAnimationFrame(() => {
      this._liveAnnouncement = s;
    });
  }
  _handleSort(s) {
    var i, r;
    const e = ((i = this.parseColumns().find((n) => n.key === s)) == null ? void 0 : i.label) ?? s;
    ((r = this._sort) == null ? void 0 : r.key) === s ? this._sort = { key: s, direction: this._sort.direction === "asc" ? "desc" : "asc" } : this._sort = { key: s, direction: "asc" }, this._announce(`Tri par ${e}, ordre ${this._sort.direction === "asc" ? "croissant" : "decroissant"}`), this.serverTri && this.source && ws(this.source, {
      orderBy: `${this._sort.key}:${this._sort.direction}`
    });
  }
  _handlePageChange(s) {
    this._previousPage = this._currentPage, this._currentPage = s;
    const t = this._getTotalPages();
    this._announce(`Page ${s} sur ${t}`), this._serverPagination && this.source && ws(this.source, { page: s }), this.urlSync && this._syncPageUrl();
  }
  // --- Export ---
  _exportCsv() {
    const s = this.parseColumns(), t = this.getFilteredData(), e = s.map((d) => d.label).join(";"), i = t.map((d) => s.map((L) => {
      const l = String(d[L.key] ?? "");
      return l.includes(";") || l.includes('"') ? `"${l.replace(/"/g, '""')}"` : l;
    }).join(";")), r = [e, ...i].join(`
`), n = new Blob([r], { type: "text/csv;charset=utf-8;" }), a = URL.createObjectURL(n), c = document.createElement("a");
    c.href = a, c.download = "export.csv", c.click(), URL.revokeObjectURL(a);
  }
  _exportHtml() {
    const s = this.parseColumns(), t = this.getFilteredData(), e = s.map((d) => `<th>${ni(d.label)}</th>`).join(""), i = t.map((d) => `<tr>${s.map((l) => {
      const N = d[l.key];
      return `<td>${N == null ? "" : ni(String(N))}</td>`;
    }).join("")}</tr>`).join(`
`), r = `<!DOCTYPE html>
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
</html>`, n = new Blob([r], { type: "text/html;charset=utf-8;" }), a = URL.createObjectURL(n), c = document.createElement("a");
    c.href = a, c.download = "export.html", c.click(), URL.revokeObjectURL(a);
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
      const i = s.find((a) => a.key === e), r = (i == null ? void 0 : i.label) || e, n = this._getUniqueValues(e);
      return z`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${e}">${r}</label>
              <select
                class="fr-select"
                id="filter-${e}"
                @change="${(a) => this._handleFilter(e, a)}"
              >
                <option value="">Tous</option>
                ${n.map((a) => z`
                  <option value="${a}" ?selected="${this._activeFilters[e] === a}">${a}</option>
                `)}
              </select>
            </div>
          `;
    })}
      </div>
    `;
  }
  _renderToolbar() {
    var t, e, i, r;
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

          ${(r = this.export) != null && r.includes("html") ? z`
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
      var c;
      const i = ((c = this._sort) == null ? void 0 : c.key) === e.key, r = i ? this._sort.direction : null, n = r === "asc" ? "ascending" : r === "desc" ? "descending" : "none", a = i ? `Trier par ${e.label}, actuellement tri ${r === "asc" ? "croissant" : "decroissant"}` : `Trier par ${e.label}`;
      return z`
                <th scope="col" aria-sort="${n}">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${() => this._handleSort(e.key)}"
                    aria-label="${a}"
                    type="button"
                  >
                    ${e.label}
                    ${i ? z`
                      <span aria-hidden="true">${r === "asc" ? "↑" : "↓"}</span>
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
                <td colspan="${s.length}" class="gouv-datalist__empty" role="status">
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
              aria-label="Premi\u00e8re page" type="button">Premi\u00e8re page</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--prev"
              ?disabled="${this._currentPage === 1}"
              @click="${() => this._handlePageChange(this._currentPage - 1)}"
              aria-label="Page pr\u00e9c\u00e9dente" type="button">Page pr\u00e9c\u00e9dente</button>
          </li>
          ${t.map((e) => z`
            <li>
              <button
                class="fr-pagination__link ${e === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(e)}"
                aria-current="${e === this._currentPage ? "page" : h}"
                aria-label="Page ${e} sur ${s}"
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
              aria-label="Derni\u00e8re page" type="button">Derni\u00e8re page</button>
          </li>
        </ul>
      </nav>
    `;
  }
  // --- Main render ---
  render() {
    const s = this.parseColumns(), t = this._getFilterableColumns(), e = this._getPaginatedData(), i = this._getTotalPages(), r = this._serverPagination ? this._serverTotal : this.getFilteredData().length;
    return z`
      <div class="gouv-datalist" role="region" aria-label="${this.getAttribute("aria-label") || "Liste de donnees"}">
        ${this._renderFilters(s, t)}
        ${this._renderToolbar()}

        <div aria-live="polite" aria-atomic="true" class="fr-sr-only">${this._liveAnnouncement}</div>
        ${this._sourceLoading ? z`
          <div class="gouv-datalist__loading" aria-live="polite" aria-busy="true">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement des données...
          </div>
        ` : this._sourceError && !(this._serverPagination && this._data.length > 0) ? z`
          <div class="gouv-datalist__error" aria-live="assertive" role="alert">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur: ${this._sourceError.message}
          </div>
        ` : z`
          <p class="fr-text--sm" aria-live="polite" aria-atomic="true" role="status">
            ${r} résultat${r > 1 ? "s" : ""}
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
}, o(yt, "GouvDatalist"), yt);
H.styles = ji``;
ts([
  y({ type: String })
], H.prototype, "source", void 0);
ts([
  y({ type: String })
], H.prototype, "colonnes", void 0);
ts([
  y({ type: Boolean })
], H.prototype, "recherche", void 0);
ts([
  y({ type: String })
], H.prototype, "filtres", void 0);
ts([
  y({ type: String })
], H.prototype, "tri", void 0);
ts([
  y({ type: Number })
], H.prototype, "pagination", void 0);
ts([
  y({ type: String })
], H.prototype, "export", void 0);
ts([
  y({ type: Boolean, attribute: "url-sync" })
], H.prototype, "urlSync", void 0);
ts([
  y({ type: String, attribute: "url-page-param" })
], H.prototype, "urlPageParam", void 0);
ts([
  y({ type: Boolean, attribute: "server-tri" })
], H.prototype, "serverTri", void 0);
ts([
  F()
], H.prototype, "_data", void 0);
ts([
  F()
], H.prototype, "_searchQuery", void 0);
ts([
  F()
], H.prototype, "_activeFilters", void 0);
ts([
  F()
], H.prototype, "_sort", void 0);
ts([
  F()
], H.prototype, "_currentPage", void 0);
ts([
  F()
], H.prototype, "_serverPagination", void 0);
ts([
  F()
], H.prototype, "_liveAnnouncement", void 0);
H = ts([
  q("gouv-datalist")
], H);
var cs = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, xt;
let Ls = (xt = class extends Et(V) {
  constructor() {
    super(...arguments), this.source = "", this.cols = 1, this.pagination = 0, this.empty = "Aucun resultat", this.gap = "fr-grid-row--gutters", this.uidField = "", this.urlSync = !1, this.urlPageParam = "page", this._data = [], this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._templateContent = "", this._hashScrollDone = !1, this._popstateHandler = null, this._liveAnnouncement = "";
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
    const t = this.source ? Gs(this.source) : void 0;
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
    return e = e.replace(/\{\{\{([^}]+)\}\}\}/g, (i, r) => this._resolveExpression(s, r.trim(), t)), e = e.replace(/\{\{([^}]+)\}\}/g, (i, r) => {
      const n = this._resolveExpression(s, r.trim(), t);
      return ni(n);
    }), e;
  }
  /** Resout une expression : champ, champ:format, champ|defaut, champ:format|defaut, $index, $uid */
  _resolveExpression(s, t, e) {
    if (t === "$index")
      return String(e);
    if (t === "$uid")
      return this._getItemUid(s, e);
    let i = t, r = "";
    const n = t.indexOf("|");
    n !== -1 && (i = t.substring(0, n).trim(), r = t.substring(n + 1).trim());
    let a = "";
    const c = i.indexOf(":");
    c !== -1 && (a = i.substring(c + 1).trim(), i = i.substring(0, c).trim());
    const d = B(s, i);
    return d == null ? r : a ? this._formatValue(d, a) : String(d);
  }
  /** Applique un format a une valeur. Formats supportes : number */
  _formatValue(s, t) {
    if (t === "number") {
      const e = typeof s == "number" ? s : parseFloat(String(s));
      if (!isNaN(e))
        return e.toLocaleString("fr-FR");
    }
    return String(s);
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
      !isNaN(e) && e >= 1 && (this._currentPage = e, this.source && ws(this.source, { page: e }));
    }
  }
  /** Sync current page to URL via replaceState */
  _syncPageUrl() {
    const s = new URLSearchParams(window.location.search);
    this._currentPage > 1 ? s.set(this.urlPageParam, String(this._currentPage)) : s.delete(this.urlPageParam);
    const t = s.toString(), e = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", e);
  }
  _announce(s) {
    this._liveAnnouncement = "", requestAnimationFrame(() => {
      this._liveAnnouncement = s;
    });
  }
  _handlePageChange(s) {
    this._currentPage = s;
    const t = this._getTotalPages();
    this._announce(`Page ${s} sur ${t}`), this._serverPagination && this.source && ws(this.source, { page: s }), this.urlSync && this._syncPageUrl();
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
      const e = B(s, this.uidField);
      if (e != null && e !== "")
        return `item-${String(e).replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    }
    return `item-${t}`;
  }
  _renderGrid(s) {
    const t = this._getColClass(), e = this.pagination > 0 ? (this._currentPage - 1) * this.pagination : 0, i = s.map((n, a) => {
      const c = e + a, d = this._renderItem(n, c), L = this._getItemUid(n, c);
      return `<div class="${t}" id="${L}">${d}</div>`;
    }).join(""), r = `<div class="fr-grid-row ${this.gap}">${i}</div>`;
    return z`<div .innerHTML="${r}"></div>`;
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
              aria-label="Premi\u00e8re page" type="button">Premi\u00e8re page</button>
          </li>
          <li>
            <button class="fr-pagination__link fr-pagination__link--prev"
              ?disabled="${this._currentPage === 1}"
              @click="${() => this._handlePageChange(this._currentPage - 1)}"
              aria-label="Page pr\u00e9c\u00e9dente" type="button">Page pr\u00e9c\u00e9dente</button>
          </li>
          ${t.map((e) => z`
            <li>
              <button
                class="fr-pagination__link ${e === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(e)}"
                aria-current="${e === this._currentPage ? "page" : h}"
                aria-label="Page ${e} sur ${s}"
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
              aria-label="Derni\u00e8re page" type="button">Derni\u00e8re page</button>
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
        <div aria-live="polite" aria-atomic="true" class="fr-sr-only">${this._liveAnnouncement}</div>
        ${this._sourceLoading ? z`
          <div class="gouv-display__loading" aria-live="polite" aria-busy="true">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? z`
          <div class="gouv-display__error" aria-live="assertive" role="alert">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : e === 0 ? z`
          <div class="gouv-display__empty" aria-live="polite" role="status">
            ${this.empty}
          </div>
        ` : z`
          <p class="fr-text--sm fr-mb-1w" aria-live="polite" aria-atomic="true" role="status">
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
}, o(xt, "GouvDisplay"), xt);
cs([
  y({ type: String })
], Ls.prototype, "source", void 0);
cs([
  y({ type: Number })
], Ls.prototype, "cols", void 0);
cs([
  y({ type: Number })
], Ls.prototype, "pagination", void 0);
cs([
  y({ type: String })
], Ls.prototype, "empty", void 0);
cs([
  y({ type: String })
], Ls.prototype, "gap", void 0);
cs([
  y({ type: String, attribute: "uid-field" })
], Ls.prototype, "uidField", void 0);
cs([
  y({ type: Boolean, attribute: "url-sync" })
], Ls.prototype, "urlSync", void 0);
cs([
  y({ type: String, attribute: "url-page-param" })
], Ls.prototype, "urlPageParam", void 0);
cs([
  F()
], Ls.prototype, "_data", void 0);
cs([
  F()
], Ls.prototype, "_currentPage", void 0);
cs([
  F()
], Ls.prototype, "_serverPagination", void 0);
cs([
  F()
], Ls.prototype, "_liveAnnouncement", void 0);
Ls = cs([
  q("gouv-display")
], Ls);
var $ = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
};
const Sn = {
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
var zt;
let J = (zt = class extends Et(V) {
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
      s.push(String(B(i, this.labelField) ?? "N/A")), t.push(Number(B(i, this.valueField)) || 0), this.valueField2 && e.push(Number(B(i, this.valueField2)) || 0);
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
      let i = String(B(e, s) ?? "").trim();
      /^\d+$/.test(i) && i.length < 3 && (i = i.padStart(2, "0"));
      const r = Number(B(e, this.valueField)) || 0;
      (this.type === "map" ? HM(i) : i !== "") && (t[i] = Math.round(r * 100) / 100);
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
    const { x: s, y: t, yMulti: e, labels: i, values: r, values2: n } = this._processData(), a = {}, c = {};
    switch (this.type) {
      case "gauge": {
        const d = this.gaugeValue ?? (this._data.length > 0 && Number(B(this._data[0], this.valueField)) || 0);
        a.percent = String(Math.round(d)), a.init = "0", a.target = "100";
        break;
      }
      case "pie":
        a.x = s, a.y = t, !this.name && i.length > 0 && (a.name = JSON.stringify(i));
        break;
      case "bar-line": {
        if (a.x = JSON.stringify(i), a["y-bar"] = JSON.stringify(r), a["y-line"] = JSON.stringify(n.length ? n : r), this.name)
          try {
            const d = this.name.trim(), L = d.startsWith("[") ? JSON.parse(d) : [d];
            L[0] && (a["name-bar"] = L[0]), L[1] && (a["name-line"] = L[1]);
          } catch {
          }
        this.unitTooltipBar && (a["unit-tooltip-bar"] = this.unitTooltipBar), this.unitTooltip && (a["unit-tooltip-line"] = this.unitTooltip);
        break;
      }
      case "map":
      case "map-reg": {
        if (a.data = this._processMapData(), this._data.length > 0) {
          let d = 0, L = 0;
          for (const l of this._data) {
            const N = Number(B(l, this.valueField));
            isNaN(N) || (d += N, L++);
          }
          if (L > 0) {
            const l = Math.round(d / L * 100) / 100;
            c.value = String(l);
          }
        }
        c.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        break;
      }
      default:
        a.x = s, a.y = e || t;
        break;
    }
    return this.type === "bar" && (this.horizontal && (a.horizontal = "true"), this.stacked && (a.stacked = "true"), this.highlightIndex && (a["highlight-index"] = this.highlightIndex)), this.type === "pie" && this.fill && (a.fill = "true"), (this.type === "map" || this.type === "map-reg") && this.mapHighlight && (a.highlight = this.mapHighlight), { attrs: a, deferred: c };
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
    for (const [n, a] of Object.entries(t))
      a !== void 0 && a !== "" && i.setAttribute(n, a);
    Object.keys(e).length > 0 && setTimeout(() => {
      for (const [n, a] of Object.entries(e))
        i.setAttribute(n, a);
    }, 500);
    const r = document.createElement("div");
    return r.className = "gouv-dsfr-chart__wrapper", r.setAttribute("role", "img"), r.setAttribute("aria-label", this._getAriaLabel()), r.appendChild(i), r;
  }
  _renderChart() {
    const s = Sn[this.type];
    if (!s)
      return z`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const { attrs: t, deferred: e } = this._getTypeSpecificAttributes(), i = {
      ...this._getCommonAttributes(),
      ...t
    };
    this.type === "bar-line" && (delete i.name, delete i["unit-tooltip"]);
    const r = this._createChartElement(s, i, e), n = this.querySelector(".gouv-dsfr-chart__wrapper");
    return n && n.remove(), z`${r}`;
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
}, o(zt, "GouvDsfrChart"), zt);
$([
  y({ type: String })
], J.prototype, "source", void 0);
$([
  y({ type: String })
], J.prototype, "type", void 0);
$([
  y({ type: String, attribute: "label-field" })
], J.prototype, "labelField", void 0);
$([
  y({ type: String, attribute: "code-field" })
], J.prototype, "codeField", void 0);
$([
  y({ type: String, attribute: "value-field" })
], J.prototype, "valueField", void 0);
$([
  y({ type: String, attribute: "value-field-2" })
], J.prototype, "valueField2", void 0);
$([
  y({ type: String })
], J.prototype, "name", void 0);
$([
  y({ type: String, attribute: "selected-palette" })
], J.prototype, "selectedPalette", void 0);
$([
  y({ type: String, attribute: "unit-tooltip" })
], J.prototype, "unitTooltip", void 0);
$([
  y({ type: String, attribute: "unit-tooltip-bar" })
], J.prototype, "unitTooltipBar", void 0);
$([
  y({ type: Boolean })
], J.prototype, "horizontal", void 0);
$([
  y({ type: Boolean })
], J.prototype, "stacked", void 0);
$([
  y({ type: Boolean })
], J.prototype, "fill", void 0);
$([
  y({ type: String, attribute: "highlight-index" })
], J.prototype, "highlightIndex", void 0);
$([
  y({ type: String, attribute: "x-min" })
], J.prototype, "xMin", void 0);
$([
  y({ type: String, attribute: "x-max" })
], J.prototype, "xMax", void 0);
$([
  y({ type: String, attribute: "y-min" })
], J.prototype, "yMin", void 0);
$([
  y({ type: String, attribute: "y-max" })
], J.prototype, "yMax", void 0);
$([
  y({ type: Number, attribute: "gauge-value" })
], J.prototype, "gaugeValue", void 0);
$([
  y({ type: String, attribute: "map-highlight" })
], J.prototype, "mapHighlight", void 0);
$([
  F()
], J.prototype, "_data", void 0);
J = $([
  q("gouv-dsfr-chart")
], J);
const sr = class sr {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(s) {
    const t = this._partials;
    let e = 0;
    for (let i = 0; i < this._n && i < 32; i++) {
      const r = t[i], n = s + r, a = Math.abs(s) < Math.abs(r) ? s - (n - r) : r - (n - s);
      a && (t[e++] = a), s = n;
    }
    return t[e] = s, this._n = e + 1, this;
  }
  valueOf() {
    const s = this._partials;
    let t = this._n, e, i, r, n = 0;
    if (t > 0) {
      for (n = s[--t]; t > 0 && (e = n, i = s[--t], n = e + i, r = i - (n - e), !r); )
        ;
      t > 0 && (r < 0 && s[t - 1] < 0 || r > 0 && s[t - 1] > 0) && (i = r * 2, e = n + i, i == e - n && (n = e));
    }
    return n;
  }
};
o(sr, "Adder");
let Os = sr;
function* Fn(M) {
  for (const s of M)
    yield* s;
}
o(Fn, "flatten");
function yM(M) {
  return Array.from(Fn(M));
}
o(yM, "merge");
var v = 1e-6, j = Math.PI, zs = j / 2, jr = j / 4, bs = j * 2, Xs = 180 / j, ls = j / 180, k = Math.abs, Dn = Math.atan, Kt = Math.atan2, Z = Math.cos, P = Math.sin, pn = Math.sign || function(M) {
  return M > 0 ? 1 : M < 0 ? -1 : 0;
}, Ks = Math.sqrt;
function In(M) {
  return M > 1 ? 0 : M < -1 ? j : Math.acos(M);
}
o(In, "acos");
function se(M) {
  return M > 1 ? zs : M < -1 ? -zs : Math.asin(M);
}
o(se, "asin");
function us() {
}
o(us, "noop");
function pe(M, s) {
  M && Or.hasOwnProperty(M.type) && Or[M.type](M, s);
}
o(pe, "streamGeometry");
var Cr = {
  Feature: /* @__PURE__ */ o(function(M, s) {
    pe(M.geometry, s);
  }, "Feature"),
  FeatureCollection: /* @__PURE__ */ o(function(M, s) {
    for (var t = M.features, e = -1, i = t.length; ++e < i; ) pe(t[e].geometry, s);
  }, "FeatureCollection")
}, Or = {
  Sphere: /* @__PURE__ */ o(function(M, s) {
    s.sphere();
  }, "Sphere"),
  Point: /* @__PURE__ */ o(function(M, s) {
    M = M.coordinates, s.point(M[0], M[1], M[2]);
  }, "Point"),
  MultiPoint: /* @__PURE__ */ o(function(M, s) {
    for (var t = M.coordinates, e = -1, i = t.length; ++e < i; ) M = t[e], s.point(M[0], M[1], M[2]);
  }, "MultiPoint"),
  LineString: /* @__PURE__ */ o(function(M, s) {
    Ni(M.coordinates, s, 0);
  }, "LineString"),
  MultiLineString: /* @__PURE__ */ o(function(M, s) {
    for (var t = M.coordinates, e = -1, i = t.length; ++e < i; ) Ni(t[e], s, 0);
  }, "MultiLineString"),
  Polygon: /* @__PURE__ */ o(function(M, s) {
    Er(M.coordinates, s);
  }, "Polygon"),
  MultiPolygon: /* @__PURE__ */ o(function(M, s) {
    for (var t = M.coordinates, e = -1, i = t.length; ++e < i; ) Er(t[e], s);
  }, "MultiPolygon"),
  GeometryCollection: /* @__PURE__ */ o(function(M, s) {
    for (var t = M.geometries, e = -1, i = t.length; ++e < i; ) pe(t[e], s);
  }, "GeometryCollection")
};
function Ni(M, s, t) {
  var e = -1, i = M.length - t, r;
  for (s.lineStart(); ++e < i; ) r = M[e], s.point(r[0], r[1], r[2]);
  s.lineEnd();
}
o(Ni, "streamLine");
function Er(M, s) {
  var t = -1, e = M.length;
  for (s.polygonStart(); ++t < e; ) Ni(M[t], s, 1);
  s.polygonEnd();
}
o(Er, "streamPolygon");
function rt(M, s) {
  M && Cr.hasOwnProperty(M.type) ? Cr[M.type](M, s) : pe(M, s);
}
o(rt, "geoStream");
function Ti(M) {
  return [Kt(M[1], M[0]), se(M[2])];
}
o(Ti, "spherical");
function jt(M) {
  var s = M[0], t = M[1], e = Z(t);
  return [e * Z(s), e * P(s), P(t)];
}
o(jt, "cartesian");
function ye(M, s) {
  return M[0] * s[0] + M[1] * s[1] + M[2] * s[2];
}
o(ye, "cartesianDot");
function Ie(M, s) {
  return [M[1] * s[2] - M[2] * s[1], M[2] * s[0] - M[0] * s[2], M[0] * s[1] - M[1] * s[0]];
}
o(Ie, "cartesianCross");
function Ze(M, s) {
  M[0] += s[0], M[1] += s[1], M[2] += s[2];
}
o(Ze, "cartesianAddInPlace");
function xe(M, s) {
  return [M[0] * s, M[1] * s, M[2] * s];
}
o(xe, "cartesianScale");
function yi(M) {
  var s = Ks(M[0] * M[0] + M[1] * M[1] + M[2] * M[2]);
  M[0] /= s, M[1] /= s, M[2] /= s;
}
o(yi, "cartesianNormalizeInPlace");
function xi(M, s) {
  function t(e, i) {
    return e = M(e, i), s(e[0], e[1]);
  }
  return o(t, "compose"), M.invert && s.invert && (t.invert = function(e, i) {
    return e = s.invert(e, i), e && M.invert(e[0], e[1]);
  }), t;
}
o(xi, "compose");
function zi(M, s) {
  return k(M) > j && (M -= Math.round(M / bs) * bs), [M, s];
}
o(zi, "rotationIdentity");
zi.invert = zi;
function Wn(M, s, t) {
  return (M %= bs) ? s || t ? xi(vr(M), _r(s, t)) : vr(M) : s || t ? _r(s, t) : zi;
}
o(Wn, "rotateRadians");
function mr(M) {
  return function(s, t) {
    return s += M, k(s) > j && (s -= Math.round(s / bs) * bs), [s, t];
  };
}
o(mr, "forwardRotationLambda");
function vr(M) {
  var s = mr(M);
  return s.invert = mr(-M), s;
}
o(vr, "rotationLambda");
function _r(M, s) {
  var t = Z(M), e = P(M), i = Z(s), r = P(s);
  function n(a, c) {
    var d = Z(c), L = Z(a) * d, l = P(a) * d, N = P(c), T = N * t + L * e;
    return [
      Kt(l * i - T * r, L * t - N * e),
      se(T * i + l * r)
    ];
  }
  return o(n, "rotation"), n.invert = function(a, c) {
    var d = Z(c), L = Z(a) * d, l = P(a) * d, N = P(c), T = N * i - l * r;
    return [
      Kt(l * i + N * r, L * t + T * e),
      se(T * t - L * e)
    ];
  }, n;
}
o(_r, "rotationPhiGamma");
function fn(M, s, t, e, i, r) {
  if (t) {
    var n = Z(s), a = P(s), c = e * t;
    i == null ? (i = s + e * bs, r = s - c / 2) : (i = Ur(n, i), r = Ur(n, r), (e > 0 ? i < r : i > r) && (i += e * bs));
    for (var d, L = i; e > 0 ? L > r : L < r; L -= c)
      d = Ti([n, -a * Z(L), -a * P(L)]), M.point(d[0], d[1]);
  }
}
o(fn, "circleStream");
function Ur(M, s) {
  s = jt(s), s[0] -= M, yi(s);
  var t = In(-s[1]);
  return ((-s[2] < 0 ? -t : t) + bs - v) % bs;
}
o(Ur, "circleRadius");
function xM() {
  var M = [], s;
  return {
    point: /* @__PURE__ */ o(function(t, e, i) {
      s.push([t, e, i]);
    }, "point"),
    lineStart: /* @__PURE__ */ o(function() {
      M.push(s = []);
    }, "lineStart"),
    lineEnd: us,
    rejoin: /* @__PURE__ */ o(function() {
      M.length > 1 && M.push(M.pop().concat(M.shift()));
    }, "rejoin"),
    result: /* @__PURE__ */ o(function() {
      var t = M;
      return M = [], s = null, t;
    }, "result")
  };
}
o(xM, "clipBuffer");
function Se(M, s) {
  return k(M[0] - s[0]) < v && k(M[1] - s[1]) < v;
}
o(Se, "pointEqual");
function ze(M, s, t, e) {
  this.x = M, this.z = s, this.o = t, this.e = e, this.v = !1, this.n = this.p = null;
}
o(ze, "Intersection");
function zM(M, s, t, e, i) {
  var r = [], n = [], a, c;
  if (M.forEach(function(x) {
    if (!((b = x.length - 1) <= 0)) {
      var b, u = x[0], f = x[b], D;
      if (Se(u, f)) {
        if (!u[2] && !f[2]) {
          for (i.lineStart(), a = 0; a < b; ++a) i.point((u = x[a])[0], u[1]);
          i.lineEnd();
          return;
        }
        f[0] += 2 * v;
      }
      r.push(D = new ze(u, x, null, !0)), n.push(D.o = new ze(u, null, D, !1)), r.push(D = new ze(f, x, null, !1)), n.push(D.o = new ze(f, null, D, !0));
    }
  }), !!r.length) {
    for (n.sort(s), Vr(r), Vr(n), a = 0, c = n.length; a < c; ++a)
      n[a].e = t = !t;
    for (var d = r[0], L, l; ; ) {
      for (var N = d, T = !0; N.v; ) if ((N = N.n) === d) return;
      L = N.z, i.lineStart();
      do {
        if (N.v = N.o.v = !0, N.e) {
          if (T)
            for (a = 0, c = L.length; a < c; ++a) i.point((l = L[a])[0], l[1]);
          else
            e(N.x, N.n.x, 1, i);
          N = N.n;
        } else {
          if (T)
            for (L = N.p.z, a = L.length - 1; a >= 0; --a) i.point((l = L[a])[0], l[1]);
          else
            e(N.x, N.p.x, -1, i);
          N = N.p;
        }
        N = N.o, L = N.z, T = !T;
      } while (!N.v);
      i.lineEnd();
    }
  }
}
o(zM, "clipRejoin");
function Vr(M) {
  if (s = M.length) {
    for (var s, t = 0, e = M[0], i; ++t < s; )
      e.n = i = M[t], i.p = e, e = i;
    e.n = i = M[0], i.p = e;
  }
}
o(Vr, "link");
function Pe(M) {
  return k(M[0]) <= j ? M[0] : pn(M[0]) * ((k(M[0]) + j) % bs - j);
}
o(Pe, "longitude");
function gn(M, s) {
  var t = Pe(s), e = s[1], i = P(e), r = [P(t), -Z(t), 0], n = 0, a = 0, c = new Os();
  i === 1 ? e = zs + v : i === -1 && (e = -zs - v);
  for (var d = 0, L = M.length; d < L; ++d)
    if (N = (l = M[d]).length)
      for (var l, N, T = l[N - 1], x = Pe(T), b = T[1] / 2 + jr, u = P(b), f = Z(b), D = 0; D < N; ++D, x = S, u = g, f = E, T = I) {
        var I = l[D], S = Pe(I), W = I[1] / 2 + jr, g = P(W), E = Z(W), C = S - x, O = C >= 0 ? 1 : -1, Q = O * C, p = Q > j, ns = u * g;
        if (c.add(Kt(ns * O * P(Q), f * E + ns * Z(Q))), n += p ? C + O * bs : C, p ^ x >= t ^ S >= t) {
          var R = Ie(jt(T), jt(I));
          yi(R);
          var m = Ie(r, R);
          yi(m);
          var w = (p ^ C >= 0 ? -1 : 1) * se(m[2]);
          (e > w || e === w && (R[0] || R[1])) && (a += p ^ C >= 0 ? 1 : -1);
        }
      }
  return (n < -v || n < v && c < -1e-12) ^ a & 1;
}
o(gn, "polygonContains");
function uM(M, s, t, e) {
  return function(i) {
    var r = s(i), n = xM(), a = s(n), c = !1, d, L, l, N = {
      point: T,
      lineStart: b,
      lineEnd: u,
      polygonStart: /* @__PURE__ */ o(function() {
        N.point = f, N.lineStart = D, N.lineEnd = I, L = [], d = [];
      }, "polygonStart"),
      polygonEnd: /* @__PURE__ */ o(function() {
        N.point = T, N.lineStart = b, N.lineEnd = u, L = yM(L);
        var S = gn(d, e);
        L.length ? (c || (i.polygonStart(), c = !0), zM(L, jn, S, t, i)) : S && (c || (i.polygonStart(), c = !0), i.lineStart(), t(null, null, 1, i), i.lineEnd()), c && (i.polygonEnd(), c = !1), L = d = null;
      }, "polygonEnd"),
      sphere: /* @__PURE__ */ o(function() {
        i.polygonStart(), i.lineStart(), t(null, null, 1, i), i.lineEnd(), i.polygonEnd();
      }, "sphere")
    };
    function T(S, W) {
      M(S, W) && i.point(S, W);
    }
    o(T, "point");
    function x(S, W) {
      r.point(S, W);
    }
    o(x, "pointLine");
    function b() {
      N.point = x, r.lineStart();
    }
    o(b, "lineStart");
    function u() {
      N.point = T, r.lineEnd();
    }
    o(u, "lineEnd");
    function f(S, W) {
      l.push([S, W]), a.point(S, W);
    }
    o(f, "pointRing");
    function D() {
      a.lineStart(), l = [];
    }
    o(D, "ringStart");
    function I() {
      f(l[0][0], l[0][1]), a.lineEnd();
      var S = a.clean(), W = n.result(), g, E = W.length, C, O, Q;
      if (l.pop(), d.push(l), l = null, !!E) {
        if (S & 1) {
          if (O = W[0], (C = O.length - 1) > 0) {
            for (c || (i.polygonStart(), c = !0), i.lineStart(), g = 0; g < C; ++g) i.point((Q = O[g])[0], Q[1]);
            i.lineEnd();
          }
          return;
        }
        E > 1 && S & 2 && W.push(W.pop().concat(W.shift())), L.push(W.filter(Xn));
      }
    }
    return o(I, "ringEnd"), N;
  };
}
o(uM, "clip");
function Xn(M) {
  return M.length > 1;
}
o(Xn, "validSegment");
function jn(M, s) {
  return ((M = M.x)[0] < 0 ? M[1] - zs - v : zs - M[1]) - ((s = s.x)[0] < 0 ? s[1] - zs - v : zs - s[1]);
}
o(jn, "compareIntersection");
const Ar = uM(
  function() {
    return !0;
  },
  Cn,
  En,
  [-j, -zs]
);
function Cn(M) {
  var s = NaN, t = NaN, e = NaN, i;
  return {
    lineStart: /* @__PURE__ */ o(function() {
      M.lineStart(), i = 1;
    }, "lineStart"),
    point: /* @__PURE__ */ o(function(r, n) {
      var a = r > 0 ? j : -j, c = k(r - s);
      k(c - j) < v ? (M.point(s, t = (t + n) / 2 > 0 ? zs : -zs), M.point(e, t), M.lineEnd(), M.lineStart(), M.point(a, t), M.point(r, t), i = 0) : e !== a && c >= j && (k(s - e) < v && (s -= e * v), k(r - a) < v && (r -= a * v), t = On(s, t, r, n), M.point(e, t), M.lineEnd(), M.lineStart(), M.point(a, t), i = 0), M.point(s = r, t = n), e = a;
    }, "point"),
    lineEnd: /* @__PURE__ */ o(function() {
      M.lineEnd(), s = t = NaN;
    }, "lineEnd"),
    clean: /* @__PURE__ */ o(function() {
      return 2 - i;
    }, "clean")
  };
}
o(Cn, "clipAntimeridianLine");
function On(M, s, t, e) {
  var i, r, n = P(M - t);
  return k(n) > v ? Dn((P(s) * (r = Z(e)) * P(t) - P(e) * (i = Z(s)) * P(M)) / (i * r * n)) : (s + e) / 2;
}
o(On, "clipAntimeridianIntersect");
function En(M, s, t, e) {
  var i;
  if (M == null)
    i = t * zs, e.point(-j, i), e.point(0, i), e.point(j, i), e.point(j, 0), e.point(j, -i), e.point(0, -i), e.point(-j, -i), e.point(-j, 0), e.point(-j, i);
  else if (k(M[0] - s[0]) > v) {
    var r = M[0] < s[0] ? j : -j;
    i = t * r / 2, e.point(-r, i), e.point(0, i), e.point(r, i);
  } else
    e.point(s[0], s[1]);
}
o(En, "clipAntimeridianInterpolate");
function mn(M) {
  var s = Z(M), t = 2 * ls, e = s > 0, i = k(s) > v;
  function r(L, l, N, T) {
    fn(T, M, t, N, L, l);
  }
  o(r, "interpolate");
  function n(L, l) {
    return Z(L) * Z(l) > s;
  }
  o(n, "visible");
  function a(L) {
    var l, N, T, x, b;
    return {
      lineStart: /* @__PURE__ */ o(function() {
        x = T = !1, b = 1;
      }, "lineStart"),
      point: /* @__PURE__ */ o(function(u, f) {
        var D = [u, f], I, S = n(u, f), W = e ? S ? 0 : d(u, f) : S ? d(u + (u < 0 ? j : -j), f) : 0;
        if (!l && (x = T = S) && L.lineStart(), S !== T && (I = c(l, D), (!I || Se(l, I) || Se(D, I)) && (D[2] = 1)), S !== T)
          b = 0, S ? (L.lineStart(), I = c(D, l), L.point(I[0], I[1])) : (I = c(l, D), L.point(I[0], I[1], 2), L.lineEnd()), l = I;
        else if (i && l && e ^ S) {
          var g;
          !(W & N) && (g = c(D, l, !0)) && (b = 0, e ? (L.lineStart(), L.point(g[0][0], g[0][1]), L.point(g[1][0], g[1][1]), L.lineEnd()) : (L.point(g[1][0], g[1][1]), L.lineEnd(), L.lineStart(), L.point(g[0][0], g[0][1], 3)));
        }
        S && (!l || !Se(l, D)) && L.point(D[0], D[1]), l = D, T = S, N = W;
      }, "point"),
      lineEnd: /* @__PURE__ */ o(function() {
        T && L.lineEnd(), l = null;
      }, "lineEnd"),
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: /* @__PURE__ */ o(function() {
        return b | (x && T) << 1;
      }, "clean")
    };
  }
  o(a, "clipLine");
  function c(L, l, N) {
    var T = jt(L), x = jt(l), b = [1, 0, 0], u = Ie(T, x), f = ye(u, u), D = u[0], I = f - D * D;
    if (!I) return !N && L;
    var S = s * f / I, W = -s * D / I, g = Ie(b, u), E = xe(b, S), C = xe(u, W);
    Ze(E, C);
    var O = g, Q = ye(E, O), p = ye(O, O), ns = Q * Q - p * (ye(E, E) - 1);
    if (!(ns < 0)) {
      var R = Ks(ns), m = xe(O, (-Q - R) / p);
      if (Ze(m, E), m = Ti(m), !N) return m;
      var w = L[0], X = l[0], ss = L[1], as = l[1], Ns;
      X < w && (Ns = w, w = X, X = Ns);
      var vt = X - w, fs = k(vt - j) < v, ks = fs || vt < v;
      if (!fs && as < ss && (Ns = ss, ss = as, as = Ns), ks ? fs ? ss + as > 0 ^ m[1] < (k(m[0] - w) < v ? ss : as) : ss <= m[1] && m[1] <= as : vt > j ^ (w <= m[0] && m[0] <= X)) {
        var gs = xe(O, (-Q + R) / p);
        return Ze(gs, E), [m, Ti(gs)];
      }
    }
  }
  o(c, "intersect");
  function d(L, l) {
    var N = e ? M : j - M, T = 0;
    return L < -N ? T |= 1 : L > N && (T |= 2), l < -N ? T |= 4 : l > N && (T |= 8), T;
  }
  return o(d, "code"), uM(n, a, r, e ? [0, -M] : [-j, M - j]);
}
o(mn, "clipCircle");
function vn(M, s, t, e, i, r) {
  var n = M[0], a = M[1], c = s[0], d = s[1], L = 0, l = 1, N = c - n, T = d - a, x;
  if (x = t - n, !(!N && x > 0)) {
    if (x /= N, N < 0) {
      if (x < L) return;
      x < l && (l = x);
    } else if (N > 0) {
      if (x > l) return;
      x > L && (L = x);
    }
    if (x = i - n, !(!N && x < 0)) {
      if (x /= N, N < 0) {
        if (x > l) return;
        x > L && (L = x);
      } else if (N > 0) {
        if (x < L) return;
        x < l && (l = x);
      }
      if (x = e - a, !(!T && x > 0)) {
        if (x /= T, T < 0) {
          if (x < L) return;
          x < l && (l = x);
        } else if (T > 0) {
          if (x > l) return;
          x > L && (L = x);
        }
        if (x = r - a, !(!T && x < 0)) {
          if (x /= T, T < 0) {
            if (x > l) return;
            x > L && (L = x);
          } else if (T > 0) {
            if (x < L) return;
            x < l && (l = x);
          }
          return L > 0 && (M[0] = n + L * N, M[1] = a + L * T), l < 1 && (s[0] = n + l * N, s[1] = a + l * T), !0;
        }
      }
    }
  }
}
o(vn, "clipLine");
var Qt = 1e9, ue = -Qt;
function _n(M, s, t, e) {
  function i(d, L) {
    return M <= d && d <= t && s <= L && L <= e;
  }
  o(i, "visible");
  function r(d, L, l, N) {
    var T = 0, x = 0;
    if (d == null || (T = n(d, l)) !== (x = n(L, l)) || c(d, L) < 0 ^ l > 0)
      do
        N.point(T === 0 || T === 3 ? M : t, T > 1 ? e : s);
      while ((T = (T + l + 4) % 4) !== x);
    else
      N.point(L[0], L[1]);
  }
  o(r, "interpolate");
  function n(d, L) {
    return k(d[0] - M) < v ? L > 0 ? 0 : 3 : k(d[0] - t) < v ? L > 0 ? 2 : 1 : k(d[1] - s) < v ? L > 0 ? 1 : 0 : L > 0 ? 3 : 2;
  }
  o(n, "corner");
  function a(d, L) {
    return c(d.x, L.x);
  }
  o(a, "compareIntersection");
  function c(d, L) {
    var l = n(d, 1), N = n(L, 1);
    return l !== N ? l - N : l === 0 ? L[1] - d[1] : l === 1 ? d[0] - L[0] : l === 2 ? d[1] - L[1] : L[0] - d[0];
  }
  return o(c, "comparePoint"), function(d) {
    var L = d, l = xM(), N, T, x, b, u, f, D, I, S, W, g, E = {
      point: C,
      lineStart: ns,
      lineEnd: R,
      polygonStart: Q,
      polygonEnd: p
    };
    function C(w, X) {
      i(w, X) && L.point(w, X);
    }
    o(C, "point");
    function O() {
      for (var w = 0, X = 0, ss = T.length; X < ss; ++X)
        for (var as = T[X], Ns = 1, vt = as.length, fs = as[0], ks, gs, Le = fs[0], tt = fs[1]; Ns < vt; ++Ns)
          ks = Le, gs = tt, fs = as[Ns], Le = fs[0], tt = fs[1], gs <= e ? tt > e && (Le - ks) * (e - gs) > (tt - gs) * (M - ks) && ++w : tt <= e && (Le - ks) * (e - gs) < (tt - gs) * (M - ks) && --w;
      return w;
    }
    o(O, "polygonInside");
    function Q() {
      L = l, N = [], T = [], g = !0;
    }
    o(Q, "polygonStart");
    function p() {
      var w = O(), X = g && w, ss = (N = yM(N)).length;
      (X || ss) && (d.polygonStart(), X && (d.lineStart(), r(null, null, 1, d), d.lineEnd()), ss && zM(N, a, w, r, d), d.polygonEnd()), L = d, N = T = x = null;
    }
    o(p, "polygonEnd");
    function ns() {
      E.point = m, T && T.push(x = []), W = !0, S = !1, D = I = NaN;
    }
    o(ns, "lineStart");
    function R() {
      N && (m(b, u), f && S && l.rejoin(), N.push(l.result())), E.point = C, S && L.lineEnd();
    }
    o(R, "lineEnd");
    function m(w, X) {
      var ss = i(w, X);
      if (T && x.push([w, X]), W)
        b = w, u = X, f = ss, W = !1, ss && (L.lineStart(), L.point(w, X));
      else if (ss && S) L.point(w, X);
      else {
        var as = [D = Math.max(ue, Math.min(Qt, D)), I = Math.max(ue, Math.min(Qt, I))], Ns = [w = Math.max(ue, Math.min(Qt, w)), X = Math.max(ue, Math.min(Qt, X))];
        vn(as, Ns, M, s, t, e) ? (S || (L.lineStart(), L.point(as[0], as[1])), L.point(Ns[0], Ns[1]), ss || L.lineEnd(), g = !1) : ss && (L.lineStart(), L.point(w, X), g = !1);
      }
      D = w, I = X, S = ss;
    }
    return o(m, "linePoint"), E;
  };
}
o(_n, "clipRectangle");
const ui = /* @__PURE__ */ o((M) => M, "identity$1");
var Ge = new Os(), wi = new Os(), wM, bM, bi, hi, js = {
  point: us,
  lineStart: us,
  lineEnd: us,
  polygonStart: /* @__PURE__ */ o(function() {
    js.lineStart = Un, js.lineEnd = An;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ o(function() {
    js.lineStart = js.lineEnd = js.point = us, Ge.add(k(wi)), wi = new Os();
  }, "polygonEnd"),
  result: /* @__PURE__ */ o(function() {
    var M = Ge / 2;
    return Ge = new Os(), M;
  }, "result")
};
function Un() {
  js.point = Vn;
}
o(Un, "areaRingStart");
function Vn(M, s) {
  js.point = hM, wM = bi = M, bM = hi = s;
}
o(Vn, "areaPointFirst");
function hM(M, s) {
  wi.add(hi * M - bi * s), bi = M, hi = s;
}
o(hM, "areaPoint");
function An() {
  hM(wM, bM);
}
o(An, "areaRingEnd");
var Ct = 1 / 0, We = Ct, te = -Ct, fe = te, ge = {
  point: Qn,
  lineStart: us,
  lineEnd: us,
  polygonStart: us,
  polygonEnd: us,
  result: /* @__PURE__ */ o(function() {
    var M = [[Ct, We], [te, fe]];
    return te = fe = -(We = Ct = 1 / 0), M;
  }, "result")
};
function Qn(M, s) {
  M < Ct && (Ct = M), M > te && (te = M), s < We && (We = s), s > fe && (fe = s);
}
o(Qn, "boundsPoint");
var Si = 0, Fi = 0, kt = 0, Xe = 0, je = 0, Mt = 0, Di = 0, pi = 0, Yt = 0, SM, FM, Is, Ws, xs = {
  point: Hs,
  lineStart: Qr,
  lineEnd: kr,
  polygonStart: /* @__PURE__ */ o(function() {
    xs.lineStart = Jn, xs.lineEnd = $n;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ o(function() {
    xs.point = Hs, xs.lineStart = Qr, xs.lineEnd = kr;
  }, "polygonEnd"),
  result: /* @__PURE__ */ o(function() {
    var M = Yt ? [Di / Yt, pi / Yt] : Mt ? [Xe / Mt, je / Mt] : kt ? [Si / kt, Fi / kt] : [NaN, NaN];
    return Si = Fi = kt = Xe = je = Mt = Di = pi = Yt = 0, M;
  }, "result")
};
function Hs(M, s) {
  Si += M, Fi += s, ++kt;
}
o(Hs, "centroidPoint");
function Qr() {
  xs.point = kn;
}
o(Qr, "centroidLineStart");
function kn(M, s) {
  xs.point = Yn, Hs(Is = M, Ws = s);
}
o(kn, "centroidPointFirstLine");
function Yn(M, s) {
  var t = M - Is, e = s - Ws, i = Ks(t * t + e * e);
  Xe += i * (Is + M) / 2, je += i * (Ws + s) / 2, Mt += i, Hs(Is = M, Ws = s);
}
o(Yn, "centroidPointLine");
function kr() {
  xs.point = Hs;
}
o(kr, "centroidLineEnd");
function Jn() {
  xs.point = Rn;
}
o(Jn, "centroidRingStart");
function $n() {
  DM(SM, FM);
}
o($n, "centroidRingEnd");
function Rn(M, s) {
  xs.point = DM, Hs(SM = Is = M, FM = Ws = s);
}
o(Rn, "centroidPointFirstRing");
function DM(M, s) {
  var t = M - Is, e = s - Ws, i = Ks(t * t + e * e);
  Xe += i * (Is + M) / 2, je += i * (Ws + s) / 2, Mt += i, i = Ws * M - Is * s, Di += i * (Is + M), pi += i * (Ws + s), Yt += i * 3, Hs(Is = M, Ws = s);
}
o(DM, "centroidPointRing");
function pM(M) {
  this._context = M;
}
o(pM, "PathContext");
pM.prototype = {
  _radius: 4.5,
  pointRadius: /* @__PURE__ */ o(function(M) {
    return this._radius = M, this;
  }, "pointRadius"),
  polygonStart: /* @__PURE__ */ o(function() {
    this._line = 0;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ o(function() {
    this._line = NaN;
  }, "polygonEnd"),
  lineStart: /* @__PURE__ */ o(function() {
    this._point = 0;
  }, "lineStart"),
  lineEnd: /* @__PURE__ */ o(function() {
    this._line === 0 && this._context.closePath(), this._point = NaN;
  }, "lineEnd"),
  point: /* @__PURE__ */ o(function(M, s) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(M, s), this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(M, s);
        break;
      }
      default: {
        this._context.moveTo(M + this._radius, s), this._context.arc(M, s, this._radius, 0, bs);
        break;
      }
    }
  }, "point"),
  result: us
};
var Ii = new Os(), He, IM, WM, Jt, $t, ee = {
  point: us,
  lineStart: /* @__PURE__ */ o(function() {
    ee.point = Bn;
  }, "lineStart"),
  lineEnd: /* @__PURE__ */ o(function() {
    He && fM(IM, WM), ee.point = us;
  }, "lineEnd"),
  polygonStart: /* @__PURE__ */ o(function() {
    He = !0;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ o(function() {
    He = null;
  }, "polygonEnd"),
  result: /* @__PURE__ */ o(function() {
    var M = +Ii;
    return Ii = new Os(), M;
  }, "result")
};
function Bn(M, s) {
  ee.point = fM, IM = Jt = M, WM = $t = s;
}
o(Bn, "lengthPointFirst");
function fM(M, s) {
  Jt -= M, $t -= s, Ii.add(Ks(Jt * Jt + $t * $t)), Jt = M, $t = s;
}
o(fM, "lengthPoint");
let Yr, Ce, Jr, $r;
const tr = class tr {
  constructor(s) {
    this._append = s == null ? gM : Zn(s), this._radius = 4.5, this._ = "";
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
        if (this._append`M${s},${t}`, this._radius !== Jr || this._append !== Ce) {
          const e = this._radius, i = this._;
          this._ = "", this._append`m0,${e}a${e},${e} 0 1,1 0,${-2 * e}a${e},${e} 0 1,1 0,${2 * e}z`, Jr = e, Ce = this._append, $r = this._, this._ = i;
        }
        this._ += $r;
        break;
      }
    }
  }
  result() {
    const s = this._;
    return this._ = "", s.length ? s : null;
  }
};
o(tr, "PathString");
let Oe = tr;
function gM(M) {
  let s = 1;
  this._ += M[0];
  for (const t = M.length; s < t; ++s)
    this._ += arguments[s] + M[s];
}
o(gM, "append");
function Zn(M) {
  const s = Math.floor(M);
  if (!(s >= 0)) throw new RangeError(`invalid digits: ${M}`);
  if (s > 15) return gM;
  if (s !== Yr) {
    const t = 10 ** s;
    Yr = s, Ce = /* @__PURE__ */ o(function(i) {
      let r = 1;
      this._ += i[0];
      for (const n = i.length; r < n; ++r)
        this._ += Math.round(arguments[r] * t) / t + i[r];
    }, "append");
  }
  return Ce;
}
o(Zn, "appendRound");
function Pn(M, s) {
  let t = 3, e = 4.5, i, r;
  function n(a) {
    return a && (typeof e == "function" && r.pointRadius(+e.apply(this, arguments)), rt(a, i(r))), r.result();
  }
  return o(n, "path"), n.area = function(a) {
    return rt(a, i(js)), js.result();
  }, n.measure = function(a) {
    return rt(a, i(ee)), ee.result();
  }, n.bounds = function(a) {
    return rt(a, i(ge)), ge.result();
  }, n.centroid = function(a) {
    return rt(a, i(xs)), xs.result();
  }, n.projection = function(a) {
    return arguments.length ? (i = a == null ? (M = null, ui) : (M = a).stream, n) : M;
  }, n.context = function(a) {
    return arguments.length ? (r = a == null ? (s = null, new Oe(t)) : new pM(s = a), typeof e != "function" && r.pointRadius(e), n) : s;
  }, n.pointRadius = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : (r.pointRadius(+a), +a), n) : e;
  }, n.digits = function(a) {
    if (!arguments.length) return t;
    if (a == null) t = null;
    else {
      const c = Math.floor(a);
      if (!(c >= 0)) throw new RangeError(`invalid digits: ${a}`);
      t = c;
    }
    return s === null && (r = new Oe(t)), n;
  }, n.projection(M).digits(t).context(s);
}
o(Pn, "geoPath");
function Ai(M) {
  return function(s) {
    var t = new Wi();
    for (var e in M) t[e] = M[e];
    return t.stream = s, t;
  };
}
o(Ai, "transformer");
function Wi() {
}
o(Wi, "TransformStream");
Wi.prototype = {
  constructor: Wi,
  point: /* @__PURE__ */ o(function(M, s) {
    this.stream.point(M, s);
  }, "point"),
  sphere: /* @__PURE__ */ o(function() {
    this.stream.sphere();
  }, "sphere"),
  lineStart: /* @__PURE__ */ o(function() {
    this.stream.lineStart();
  }, "lineStart"),
  lineEnd: /* @__PURE__ */ o(function() {
    this.stream.lineEnd();
  }, "lineEnd"),
  polygonStart: /* @__PURE__ */ o(function() {
    this.stream.polygonStart();
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ o(function() {
    this.stream.polygonEnd();
  }, "polygonEnd")
};
function Qi(M, s, t) {
  var e = M.clipExtent && M.clipExtent();
  return M.scale(150).translate([0, 0]), e != null && M.clipExtent(null), rt(t, M.stream(ge)), s(ge.result()), e != null && M.clipExtent(e), M;
}
o(Qi, "fit");
function XM(M, s, t) {
  return Qi(M, function(e) {
    var i = s[1][0] - s[0][0], r = s[1][1] - s[0][1], n = Math.min(i / (e[1][0] - e[0][0]), r / (e[1][1] - e[0][1])), a = +s[0][0] + (i - n * (e[1][0] + e[0][0])) / 2, c = +s[0][1] + (r - n * (e[1][1] + e[0][1])) / 2;
    M.scale(150 * n).translate([a, c]);
  }, t);
}
o(XM, "fitExtent");
function Gn(M, s, t) {
  return XM(M, [[0, 0], s], t);
}
o(Gn, "fitSize");
function Hn(M, s, t) {
  return Qi(M, function(e) {
    var i = +s, r = i / (e[1][0] - e[0][0]), n = (i - r * (e[1][0] + e[0][0])) / 2, a = -r * e[0][1];
    M.scale(150 * r).translate([n, a]);
  }, t);
}
o(Hn, "fitWidth");
function qn(M, s, t) {
  return Qi(M, function(e) {
    var i = +s, r = i / (e[1][1] - e[0][1]), n = -r * e[0][0], a = (i - r * (e[1][1] + e[0][1])) / 2;
    M.scale(150 * r).translate([n, a]);
  }, t);
}
o(qn, "fitHeight");
var Rr = 16, Kn = Z(30 * ls);
function Br(M, s) {
  return +s ? ta(M, s) : sa(M);
}
o(Br, "resample");
function sa(M) {
  return Ai({
    point: /* @__PURE__ */ o(function(s, t) {
      s = M(s, t), this.stream.point(s[0], s[1]);
    }, "point")
  });
}
o(sa, "resampleNone");
function ta(M, s) {
  function t(e, i, r, n, a, c, d, L, l, N, T, x, b, u) {
    var f = d - e, D = L - i, I = f * f + D * D;
    if (I > 4 * s && b--) {
      var S = n + N, W = a + T, g = c + x, E = Ks(S * S + W * W + g * g), C = se(g /= E), O = k(k(g) - 1) < v || k(r - l) < v ? (r + l) / 2 : Kt(W, S), Q = M(O, C), p = Q[0], ns = Q[1], R = p - e, m = ns - i, w = D * R - f * m;
      (w * w / I > s || k((f * R + D * m) / I - 0.5) > 0.3 || n * N + a * T + c * x < Kn) && (t(e, i, r, n, a, c, p, ns, O, S /= E, W /= E, g, b, u), u.point(p, ns), t(p, ns, O, S, W, g, d, L, l, N, T, x, b, u));
    }
  }
  return o(t, "resampleLineTo"), function(e) {
    var i, r, n, a, c, d, L, l, N, T, x, b, u = {
      point: f,
      lineStart: D,
      lineEnd: S,
      polygonStart: /* @__PURE__ */ o(function() {
        e.polygonStart(), u.lineStart = W;
      }, "polygonStart"),
      polygonEnd: /* @__PURE__ */ o(function() {
        e.polygonEnd(), u.lineStart = D;
      }, "polygonEnd")
    };
    function f(C, O) {
      C = M(C, O), e.point(C[0], C[1]);
    }
    o(f, "point");
    function D() {
      l = NaN, u.point = I, e.lineStart();
    }
    o(D, "lineStart");
    function I(C, O) {
      var Q = jt([C, O]), p = M(C, O);
      t(l, N, L, T, x, b, l = p[0], N = p[1], L = C, T = Q[0], x = Q[1], b = Q[2], Rr, e), e.point(l, N);
    }
    o(I, "linePoint");
    function S() {
      u.point = f, e.lineEnd();
    }
    o(S, "lineEnd");
    function W() {
      D(), u.point = g, u.lineEnd = E;
    }
    o(W, "ringStart");
    function g(C, O) {
      I(i = C, O), r = l, n = N, a = T, c = x, d = b, u.point = I;
    }
    o(g, "ringPoint");
    function E() {
      t(l, N, L, T, x, b, r, n, i, a, c, d, Rr, e), u.lineEnd = S, S();
    }
    return o(E, "ringEnd"), u;
  };
}
o(ta, "resample$1");
var ea = Ai({
  point: /* @__PURE__ */ o(function(M, s) {
    this.stream.point(M * ls, s * ls);
  }, "point")
});
function ia(M) {
  return Ai({
    point: /* @__PURE__ */ o(function(s, t) {
      var e = M(s, t);
      return this.stream.point(e[0], e[1]);
    }, "point")
  });
}
o(ia, "transformRotate");
function ra(M, s, t, e, i) {
  function r(n, a) {
    return n *= e, a *= i, [s + M * n, t - M * a];
  }
  return o(r, "transform"), r.invert = function(n, a) {
    return [(n - s) / M * e, (t - a) / M * i];
  }, r;
}
o(ra, "scaleTranslate");
function Zr(M, s, t, e, i, r) {
  if (!r) return ra(M, s, t, e, i);
  var n = Z(r), a = P(r), c = n * M, d = a * M, L = n / M, l = a / M, N = (a * t - n * s) / M, T = (a * s + n * t) / M;
  function x(b, u) {
    return b *= e, u *= i, [c * b - d * u + s, t - d * b - c * u];
  }
  return o(x, "transform"), x.invert = function(b, u) {
    return [e * (L * b - l * u + N), i * (T - l * b - L * u)];
  }, x;
}
o(Zr, "scaleTranslateRotate");
function Ma(M) {
  return na(function() {
    return M;
  })();
}
o(Ma, "projection");
function na(M) {
  var s, t = 150, e = 480, i = 250, r = 0, n = 0, a = 0, c = 0, d = 0, L, l = 0, N = 1, T = 1, x = null, b = Ar, u = null, f, D, I, S = ui, W = 0.5, g, E, C, O, Q;
  function p(w) {
    return C(w[0] * ls, w[1] * ls);
  }
  o(p, "projection");
  function ns(w) {
    return w = C.invert(w[0], w[1]), w && [w[0] * Xs, w[1] * Xs];
  }
  o(ns, "invert"), p.stream = function(w) {
    return O && Q === w ? O : O = ea(ia(L)(b(g(S(Q = w)))));
  }, p.preclip = function(w) {
    return arguments.length ? (b = w, x = void 0, m()) : b;
  }, p.postclip = function(w) {
    return arguments.length ? (S = w, u = f = D = I = null, m()) : S;
  }, p.clipAngle = function(w) {
    return arguments.length ? (b = +w ? mn(x = w * ls) : (x = null, Ar), m()) : x * Xs;
  }, p.clipExtent = function(w) {
    return arguments.length ? (S = w == null ? (u = f = D = I = null, ui) : _n(u = +w[0][0], f = +w[0][1], D = +w[1][0], I = +w[1][1]), m()) : u == null ? null : [[u, f], [D, I]];
  }, p.scale = function(w) {
    return arguments.length ? (t = +w, R()) : t;
  }, p.translate = function(w) {
    return arguments.length ? (e = +w[0], i = +w[1], R()) : [e, i];
  }, p.center = function(w) {
    return arguments.length ? (r = w[0] % 360 * ls, n = w[1] % 360 * ls, R()) : [r * Xs, n * Xs];
  }, p.rotate = function(w) {
    return arguments.length ? (a = w[0] % 360 * ls, c = w[1] % 360 * ls, d = w.length > 2 ? w[2] % 360 * ls : 0, R()) : [a * Xs, c * Xs, d * Xs];
  }, p.angle = function(w) {
    return arguments.length ? (l = w % 360 * ls, R()) : l * Xs;
  }, p.reflectX = function(w) {
    return arguments.length ? (N = w ? -1 : 1, R()) : N < 0;
  }, p.reflectY = function(w) {
    return arguments.length ? (T = w ? -1 : 1, R()) : T < 0;
  }, p.precision = function(w) {
    return arguments.length ? (g = Br(E, W = w * w), m()) : Ks(W);
  }, p.fitExtent = function(w, X) {
    return XM(p, w, X);
  }, p.fitSize = function(w, X) {
    return Gn(p, w, X);
  }, p.fitWidth = function(w, X) {
    return Hn(p, w, X);
  }, p.fitHeight = function(w, X) {
    return qn(p, w, X);
  };
  function R() {
    var w = Zr(t, 0, 0, N, T, l).apply(null, s(r, n)), X = Zr(t, e - w[0], i - w[1], N, T, l);
    return L = Wn(a, c, d), E = xi(s, X), C = xi(L, E), g = Br(E, W), m();
  }
  o(R, "recenter");
  function m() {
    return O = Q = null, p;
  }
  return o(m, "reset"), function() {
    return s = M.apply(this, arguments), p.invert = s.invert && ns, R();
  };
}
o(na, "projectionMutator");
function jM(M, s) {
  var t = s * s, e = t * t;
  return [
    M * (0.8707 - 0.131979 * t + e * (-0.013791 + e * (3971e-6 * t - 1529e-6 * e))),
    s * (1.007226 + t * (0.015085 + e * (-0.044475 + 0.028874 * t - 5916e-6 * e)))
  ];
}
o(jM, "naturalEarth1Raw");
jM.invert = function(M, s) {
  var t = s, e = 25, i;
  do {
    var r = t * t, n = r * r;
    t -= i = (t * (1.007226 + r * (0.015085 + n * (-0.044475 + 0.028874 * r - 5916e-6 * n))) - s) / (1.007226 + r * (0.015085 * 3 + n * (-0.044475 * 7 + 0.028874 * 9 * r - 5916e-6 * 11 * n)));
  } while (k(i) > v && --e > 0);
  return [
    M / (0.8707 + (r = t * t) * (-0.131979 + r * (-0.013791 + r * r * r * (3971e-6 - 1529e-6 * r)))),
    t
  ];
};
function aa() {
  return Ma(jM).scale(175.295);
}
o(aa, "geoNaturalEarth1");
function oa(M) {
  return M;
}
o(oa, "identity");
function La(M) {
  if (M == null) return oa;
  var s, t, e = M.scale[0], i = M.scale[1], r = M.translate[0], n = M.translate[1];
  return function(a, c) {
    c || (s = t = 0);
    var d = 2, L = a.length, l = new Array(L);
    for (l[0] = (s += a[0]) * e + r, l[1] = (t += a[1]) * i + n; d < L; ) l[d] = a[d], ++d;
    return l;
  };
}
o(La, "transform");
function la(M, s) {
  for (var t, e = M.length, i = e - s; i < --e; ) t = M[i], M[i++] = M[e], M[e] = t;
}
o(la, "reverse");
function da(M, s) {
  return typeof s == "string" && (s = M.objects[s]), s.type === "GeometryCollection" ? { type: "FeatureCollection", features: s.geometries.map(function(t) {
    return Pr(M, t);
  }) } : Pr(M, s);
}
o(da, "feature");
function Pr(M, s) {
  var t = s.id, e = s.bbox, i = s.properties == null ? {} : s.properties, r = CM(M, s);
  return t == null && e == null ? { type: "Feature", properties: i, geometry: r } : e == null ? { type: "Feature", id: t, properties: i, geometry: r } : { type: "Feature", id: t, bbox: e, properties: i, geometry: r };
}
o(Pr, "feature$1");
function CM(M, s) {
  var t = La(M.transform), e = M.arcs;
  function i(L, l) {
    l.length && l.pop();
    for (var N = e[L < 0 ? ~L : L], T = 0, x = N.length; T < x; ++T)
      l.push(t(N[T], T));
    L < 0 && la(l, x);
  }
  o(i, "arc");
  function r(L) {
    return t(L);
  }
  o(r, "point");
  function n(L) {
    for (var l = [], N = 0, T = L.length; N < T; ++N) i(L[N], l);
    return l.length < 2 && l.push(l[0]), l;
  }
  o(n, "line");
  function a(L) {
    for (var l = n(L); l.length < 4; ) l.push(l[0]);
    return l;
  }
  o(a, "ring");
  function c(L) {
    return L.map(a);
  }
  o(c, "polygon");
  function d(L) {
    var l = L.type, N;
    switch (l) {
      case "GeometryCollection":
        return { type: l, geometries: L.geometries.map(d) };
      case "Point":
        N = r(L.coordinates);
        break;
      case "MultiPoint":
        N = L.coordinates.map(r);
        break;
      case "LineString":
        N = n(L.arcs);
        break;
      case "MultiLineString":
        N = L.arcs.map(n);
        break;
      case "Polygon":
        N = c(L.arcs);
        break;
      case "MultiPolygon":
        N = L.arcs.map(c);
        break;
      default:
        return null;
    }
    return { type: l, coordinates: N };
  }
  return o(d, "geometry"), d(s);
}
o(CM, "object");
function ca(M, s) {
  var t = {}, e = {}, i = {}, r = [], n = -1;
  s.forEach(function(d, L) {
    var l = M.arcs[d < 0 ? ~d : d], N;
    l.length < 3 && !l[1][0] && !l[1][1] && (N = s[++n], s[n] = d, s[L] = N);
  }), s.forEach(function(d) {
    var L = a(d), l = L[0], N = L[1], T, x;
    if (T = i[l])
      if (delete i[T.end], T.push(d), T.end = N, x = e[N]) {
        delete e[x.start];
        var b = x === T ? T : T.concat(x);
        e[b.start = T.start] = i[b.end = x.end] = b;
      } else
        e[T.start] = i[T.end] = T;
    else if (T = e[N])
      if (delete e[T.start], T.unshift(d), T.start = l, x = i[l]) {
        delete i[x.end];
        var u = x === T ? T : x.concat(T);
        e[u.start = x.start] = i[u.end = T.end] = u;
      } else
        e[T.start] = i[T.end] = T;
    else
      T = [d], e[T.start = l] = i[T.end = N] = T;
  });
  function a(d) {
    var L = M.arcs[d < 0 ? ~d : d], l = L[0], N;
    return M.transform ? (N = [0, 0], L.forEach(function(T) {
      N[0] += T[0], N[1] += T[1];
    })) : N = L[L.length - 1], d < 0 ? [N, l] : [l, N];
  }
  o(a, "ends");
  function c(d, L) {
    for (var l in d) {
      var N = d[l];
      delete L[N.start], delete N.start, delete N.end, N.forEach(function(T) {
        t[T < 0 ? ~T : T] = 1;
      }), r.push(N);
    }
  }
  return o(c, "flush"), c(i, e), c(e, i), s.forEach(function(d) {
    t[d < 0 ? ~d : d] || r.push([d]);
  }), r;
}
o(ca, "stitch");
function Na(M) {
  return CM(M, Ta.apply(this, arguments));
}
o(Na, "mesh");
function Ta(M, s, t) {
  var e, i, r;
  if (arguments.length > 1) e = ya(M, s, t);
  else for (i = 0, e = new Array(r = M.arcs.length); i < r; ++i) e[i] = i;
  return { type: "MultiLineString", arcs: ca(M, e) };
}
o(Ta, "meshArcs");
function ya(M, s, t) {
  var e = [], i = [], r;
  function n(l) {
    var N = l < 0 ? ~l : l;
    (i[N] || (i[N] = [])).push({ i: l, g: r });
  }
  o(n, "extract0");
  function a(l) {
    l.forEach(n);
  }
  o(a, "extract1");
  function c(l) {
    l.forEach(a);
  }
  o(c, "extract2");
  function d(l) {
    l.forEach(c);
  }
  o(d, "extract3");
  function L(l) {
    switch (r = l, l.type) {
      case "GeometryCollection":
        l.geometries.forEach(L);
        break;
      case "LineString":
        a(l.arcs);
        break;
      case "MultiLineString":
      case "Polygon":
        c(l.arcs);
        break;
      case "MultiPolygon":
        d(l.arcs);
        break;
    }
  }
  return o(L, "geometry"), L(s), i.forEach(t == null ? function(l) {
    e.push(l[0].i);
  } : function(l) {
    t(l[0].g, l[l.length - 1].g) && e.push(l[0].i);
  }), e;
}
o(ya, "extractArcs");
const Gr = {
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
}, xa = {
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
}, za = {
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
function ua(M, s) {
  const t = M.trim().toUpperCase();
  switch (s) {
    case "iso-a2":
      return xa[t] || "";
    case "iso-a3":
      return za[t] || "";
    case "iso-num":
      return t.padStart(3, "0");
  }
}
o(ua, "toIsoNumeric");
const wa = {
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
var Ms = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
};
let we = null;
async function ba() {
  if (we)
    return we;
  const M = new URL("data:application/json;base64,eyJ0eXBlIjoiVG9wb2xvZ3kiLCJvYmplY3RzIjp7ImNvdW50cmllcyI6eyJ0eXBlIjoiR2VvbWV0cnlDb2xsZWN0aW9uIiwiZ2VvbWV0cmllcyI6W3sidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWzBdXSxbWzFdXV0sImlkIjoiMjQyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiRmlqaSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1syLDMsNCw1LDYsNyw4LDksMTBdXSwiaWQiOiI4MzQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJUYW56YW5pYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1sxMSwxMiwxMywxNF1dLCJpZCI6IjczMiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlcuIFNhaGFyYSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1sxNSwxNiwxNywxOF1dLFtbMTldXSxbWzIwXV0sW1syMV1dLFtbMjJdXSxbWzIzXV0sW1syNF1dLFtbMjVdXSxbWzI2XV0sW1syN11dLFtbMjhdXSxbWzI5XV0sW1szMF1dLFtbMzFdXSxbWzMyXV0sW1szM11dLFtbMzRdXSxbWzM1XV0sW1szNl1dLFtbMzddXSxbWzM4XV0sW1szOV1dLFtbNDBdXSxbWzQxXV0sW1s0Ml1dLFtbNDNdXSxbWzQ0XV0sW1s0NV1dLFtbNDZdXSxbWzQ3XV1dLCJpZCI6IjEyNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkNhbmFkYSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1stMTksNDgsNDksNTBdXSxbWzUxXV0sW1s1Ml1dLFtbNTNdXSxbWzU0XV0sW1s1NV1dLFtbNTZdXSxbWzU3XV0sW1stMTcsNThdXSxbWzU5XV1dLCJpZCI6Ijg0MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlVuaXRlZCBTdGF0ZXMgb2YgQW1lcmljYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1s2MCw2MSw2Miw2Myw2NCw2NV1dLCJpZCI6IjM5OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkthemFraHN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTYzLDY2LDY3LDY4LDY5XV0sImlkIjoiODYwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiVXpiZWtpc3RhbiJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1s3MCw3MV1dLFtbNzJdXSxbWzczXV0sW1s3NF1dXSwiaWQiOiI1OTgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJQYXB1YSBOZXcgR3VpbmVhIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWy03Miw3NV1dLFtbNzYsNzddXSxbWzc4XV0sW1s3OSw4MF1dLFtbODFdXSxbWzgyXV0sW1s4M11dLFtbODRdXSxbWzg1XV0sW1s4Nl1dLFtbODddXSxbWzg4XV0sW1s4OV1dXSwiaWQiOiIzNjAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJJbmRvbmVzaWEifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbOTAsOTFdXSxbWzkyLDkzLDk0LDk1LDk2LDk3XV1dLCJpZCI6IjAzMiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkFyZ2VudGluYSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1stOTIsOThdXSxbWzk5LC05NSwxMDAsMTAxXV1dLCJpZCI6IjE1MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkNoaWxlIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy04LDEwMiwxMDMsMTA0LDEwNSwxMDYsMTA3LDEwOCwxMDksMTEwLDExMV1dLCJpZCI6IjE4MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkRlbS4gUmVwLiBDb25nbyJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1sxMTIsMTEzLDExNCwxMTVdXSwiaWQiOiI3MDYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJTb21hbGlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zLDExNiwxMTcsMTE4LC0xMTMsMTE5XV0sImlkIjoiNDA0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiS2VueWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMTIwLDEyMSwxMjIsMTIzLDEyNCwxMjUsMTI2LDEyN11dLCJpZCI6IjcyOSIsInByb3BlcnRpZXMiOnsibmFtZSI6IlN1ZGFuIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xMjIsMTI4LDEyOSwxMzAsMTMxXV0sImlkIjoiMTQ4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQ2hhZCJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1sxMzIsMTMzXV0sImlkIjoiMzMyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiSGFpdGkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEzMywxMzRdXSwiaWQiOiIyMTQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJEb21pbmljYW4gUmVwLiJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1sxMzVdXSxbWzEzNl1dLFtbMTM3XV0sW1sxMzhdXSxbWzEzOV1dLFtbMTQwXV0sW1sxNDEsMTQyLDE0M11dLFtbMTQ0XV0sW1sxNDVdXSxbWzE0NiwxNDcsMTQ4LDE0OSwtNjYsMTUwLDE1MSwxNTIsMTUzLDE1NCwxNTUsMTU2LDE1NywxNTgsMTU5LDE2MCwxNjFdXSxbWzE2Ml1dLFtbMTYzLDE2NF1dXSwiaWQiOiI2NDMiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJSdXNzaWEifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbMTY1XV0sW1sxNjZdXSxbWzE2N11dXSwiaWQiOiIwNDQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJCYWhhbWFzIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzE2OF1dLCJpZCI6IjIzOCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkZhbGtsYW5kIElzLiJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1sxNjldXSxbWy0xNjEsMTcwLDE3MSwxNzJdXSxbWzE3M11dLFtbMTc0XV1dLCJpZCI6IjU3OCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5vcndheSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1sxNzVdXSwiaWQiOiIzMDQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJHcmVlbmxhbmQifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMTc2XV0sImlkIjoiMjYwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiRnIuIFMuIEFudGFyY3RpYyBMYW5kcyJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1sxNzcsLTc3XV0sImlkIjoiNjI2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiVGltb3ItTGVzdGUifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMTc4LDE3OSwxODAsMTgxLDE4MiwxODMsMTg0XSxbMTg1XV0sImlkIjoiNzEwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiU291dGggQWZyaWNhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xODZdXSwiaWQiOiI0MjYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJMZXNvdGhvIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy01MCwxODYsMTg3LDE4OCwxODldXSwiaWQiOiI0ODQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJNZXhpY28ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMTkwLDE5MSwtOTNdXSwiaWQiOiI4NTgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJVcnVndWF5In19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xOTEsLTk4LDE5MiwxOTMsMTk0LDE5NSwxOTYsMTk3LDE5OCwxOTksMjAwXV0sImlkIjoiMDc2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQnJhemlsIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xOTQsMjAxLC05NiwtMTAwLDIwMl1dLCJpZCI6IjA2OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJvbGl2aWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE5NSwtMjAzLC0xMDIsMjAzLDIwNCwyMDVdXSwiaWQiOiI2MDQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJQZXJ1In19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xOTYsLTIwNiwyMDYsMjA3LDIwOCwyMDksMjEwXV0sImlkIjoiMTcwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiQ29sb21iaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTIwOSwyMTEsMjEyLDIxM11dLCJpZCI6IjU5MSIsInByb3BlcnRpZXMiOnsibmFtZSI6IlBhbmFtYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjEzLDIxNCwyMTUsMjE2XV0sImlkIjoiMTg4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQ29zdGEgUmljYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjE2LDIxNywyMTgsMjE5XV0sImlkIjoiNTU4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTmljYXJhZ3VhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0yMTksMjIwLDIyMSwyMjIsMjIzXV0sImlkIjoiMzQwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiSG9uZHVyYXMifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTIyMiwyMjQsMjI1XV0sImlkIjoiMjIyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiRWwgU2FsdmFkb3IifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE4OSwyMjYsMjI3LC0yMjMsLTIyNiwyMjhdXSwiaWQiOiIzMjAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJHdWF0ZW1hbGEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE4OCwyMjksLTIyN11dLCJpZCI6IjA4NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJlbGl6ZSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTk3LC0yMTEsMjMwLDIzMV1dLCJpZCI6Ijg2MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlZlbmV6dWVsYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTk4LC0yMzIsMjMyLDIzM11dLCJpZCI6IjMyOCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ikd1eWFuYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTk5LC0yMzQsMjM0LDIzNV1dLCJpZCI6Ijc0MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlN1cmluYW1lIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWy0yMDAsLTIzNiwyMzZdXSxbWzIzNywyMzgsMjM5LDI0MCwyNDEsMjQyLDI0MywyNDRdXSxbWzI0NV1dXSwiaWQiOiIyNTAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJGcmFuY2UifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTIwNSwyNDYsLTIwN11dLCJpZCI6IjIxOCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkVjdWFkb3IifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMjQ3XV0sImlkIjoiNjMwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiUHVlcnRvIFJpY28ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMjQ4XV0sImlkIjoiMzg4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiSmFtYWljYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1syNDldXSwiaWQiOiIxOTIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJDdWJhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xODEsMjUwLDI1MSwyNTJdXSwiaWQiOiI3MTYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJaaW1iYWJ3ZSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTgwLDI1MywyNTQsLTI1MV1dLCJpZCI6IjA3MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJvdHN3YW5hIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xNzksMjU1LDI1NiwyNTcsLTI1NF1dLCJpZCI6IjUxNiIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5hbWliaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMjU4LDI1OSwyNjAsMjYxLDI2MiwyNjMsMjY0XV0sImlkIjoiNjg2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiU2VuZWdhbCJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjYxLDI2NSwyNjYsMjY3LDI2OCwyNjksMjcwXV0sImlkIjoiNDY2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTWFsaSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTMsMjcxLC0yNjYsLTI2MCwyNzJdXSwiaWQiOiI0NzgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJNYXVyaXRhbmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzI3MywyNzQsMjc1LDI3NiwyNzddXSwiaWQiOiIyMDQiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJCZW5pbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTMxLDI3OCwyNzksLTI3NywyODAsLTI2OCwyODEsMjgyXV0sImlkIjoiNTYyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiTmlnZXIifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTI3OCwtMjgwLDI4MywyODRdXSwiaWQiOiI1NjYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJOaWdlcmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xMzAsMjg1LDI4NiwyODcsMjg4LDI4OSwtMjg0LC0yNzldXSwiaWQiOiIxMjAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJDYW1lcm9vbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjc1LDI5MCwyOTEsMjkyXV0sImlkIjoiNzY4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiVG9nbyJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjkyLDI5MywyOTQsMjk1XV0sImlkIjoiMjg4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiR2hhbmEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTI3MCwyOTYsLTI5NSwyOTcsMjk4LDI5OV1dLCJpZCI6IjM4NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkPDtHRlIGQnSXZvaXJlIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0yNjIsLTI3MSwtMzAwLDMwMCwzMDEsMzAyLDMwM11dLCJpZCI6IjMyNCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ikd1aW5lYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjYzLC0zMDQsMzA0XV0sImlkIjoiNjI0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiR3VpbmVhLUJpc3NhdSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjk5LDMwNSwzMDYsLTMwMV1dLCJpZCI6IjQzMCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkxpYmVyaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTMwMiwtMzA3LDMwN11dLCJpZCI6IjY5NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlNpZXJyYSBMZW9uZSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjY5LC0yODEsLTI3NiwtMjkzLC0yOTYsLTI5N11dLCJpZCI6Ijg1NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJ1cmtpbmEgRmFzbyJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTA4LDMwOCwtMjg2LC0xMjksLTEyMSwzMDldXSwiaWQiOiIxNDAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJDZW50cmFsIEFmcmljYW4gUmVwLiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTA3LDMxMCwzMTEsMzEyLC0yODcsLTMwOV1dLCJpZCI6IjE3OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkNvbmdvIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0yODgsLTMxMywzMTMsMzE0XV0sImlkIjoiMjY2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiR2Fib24ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTI4OSwtMzE1LDMxNV1dLCJpZCI6IjIyNiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkVxLiBHdWluZWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTcsMzE2LDMxNywtMjUyLC0yNTUsLTI1OCwzMTgsLTEwM11dLCJpZCI6Ijg5NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlphbWJpYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNiwzMTksLTMxN11dLCJpZCI6IjQ1NCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik1hbGF3aSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNSwzMjAsLTE4NCwzMjEsLTE4MiwtMjUzLC0zMTgsLTMyMF1dLCJpZCI6IjUwOCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik1vemFtYmlxdWUifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE4MywtMzIyXV0sImlkIjoiNzQ4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiZVN3YXRpbmkifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbLTEwNiwzMjIsLTMxMV1dLFtbLTEwNCwtMzE5LC0yNTcsMzIzXV1dLCJpZCI6IjAyNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkFuZ29sYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stOSwtMTEyLDMyNF1dLCJpZCI6IjEwOCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJ1cnVuZGkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMzI1LDMyNiwzMjcsMzI4LDMyOSwzMzAsMzMxXV0sImlkIjoiMzc2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiSXNyYWVsIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zMzEsMzMyLDMzM11dLCJpZCI6IjQyMiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkxlYmFub24ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMzM0XV0sImlkIjoiNDUwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiTWFkYWdhc2NhciJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzI3LDMzNV1dLCJpZCI6IjI3NSIsInByb3BlcnRpZXMiOnsibmFtZSI6IlBhbGVzdGluZSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMjY1LDMzNl1dLCJpZCI6IjI3MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkdhbWJpYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1szMzcsMzM4LDMzOV1dLCJpZCI6Ijc4OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlR1bmlzaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEyLDM0MCwzNDEsLTMzOCwzNDIsLTI4MiwtMjY3LC0yNzJdXSwiaWQiOiIwMTIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJBbGdlcmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zMjYsMzQzLDM0NCwzNDUsMzQ2LC0zMjgsLTMzNl1dLCJpZCI6IjQwMCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkpvcmRhbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1szNDcsMzQ4LDM0OSwzNTAsMzUxXV0sImlkIjoiNzg0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiVW5pdGVkIEFyYWIgRW1pcmF0ZXMifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMzUyLDM1M11dLCJpZCI6IjYzNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlFhdGFyIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzM1NCwzNTUsMzU2XV0sImlkIjoiNDE0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiS3V3YWl0In19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zNDUsMzU3LDM1OCwzNTksMzYwLC0zNTcsMzYxXV0sImlkIjoiMzY4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiSXJhcSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1stMzUxLDM2MiwzNjMsMzY0XV0sW1stMzQ5LDM2NV1dXSwiaWQiOiI1MTIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJPbWFuIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWzM2Nl1dLFtbMzY3XV1dLCJpZCI6IjU0OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlZhbnVhdHUifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbMzY4LDM2OSwzNzAsMzcxXV0sImlkIjoiMTE2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQ2FtYm9kaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTM2OSwzNzIsMzczLDM3NCwzNzUsMzc2XV0sImlkIjoiNzY0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiVGhhaWxhbmQifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTM3MCwtMzc3LDM3NywzNzgsMzc5XV0sImlkIjoiNDE4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTGFvcyJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzc2LDM4MCwzODEsMzgyLDM4MywtMzc4XV0sImlkIjoiMTA0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTXlhbm1hciJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzcxLC0zODAsMzg0LDM4NV1dLCJpZCI6IjcwNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlZpZXRuYW0ifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbMzg2LDM4NiwzODZdXSxbWy0xNDcsMzg3LDM4OCwzODksMzkwXV1dLCJpZCI6IjQwOCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5vcnRoIEtvcmVhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zODksMzkxXV0sImlkIjoiNDEwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiU291dGggS29yZWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE0OSwzOTJdXSwiaWQiOiI0OTYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJNb25nb2xpYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzgzLDM5MywzOTQsMzk1LDM5NiwzOTcsMzk4LDM5OSw0MDBdXSwiaWQiOiIzNTYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJJbmRpYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzgyLDQwMSwtMzk0XV0sImlkIjoiMDUwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiQmFuZ2xhZGVzaCJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNDAwLDQwMl1dLCJpZCI6IjA2NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJodXRhbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMzk4LDQwM11dLCJpZCI6IjUyNCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5lcGFsIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zOTYsNDA0LDQwNSw0MDYsNDA3XV0sImlkIjoiNTg2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiUGFraXN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTY5LDQwOCw0MDksLTQwNyw0MTAsNDExXV0sImlkIjoiMDA0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQWZnaGFuaXN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTY4LDQxMiw0MTMsLTQwOV1dLCJpZCI6Ijc2MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlRhamlraXN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTYyLDQxNCwtNDEzLC02N11dLCJpZCI6IjQxNyIsInByb3BlcnRpZXMiOnsibmFtZSI6Ikt5cmd5enN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTY0LC03MCwtNDEyLDQxNSw0MTZdXSwiaWQiOiI3OTUiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJUdXJrbWVuaXN0YW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTM2MCw0MTcsNDE4LDQxOSw0MjAsNDIxLC00MTYsLTQxMSwtNDA2LDQyMl1dLCJpZCI6IjM2NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IklyYW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTMzMiwtMzM0LDQyMyw0MjQsLTM1OCwtMzQ0XV0sImlkIjoiNzYwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiU3lyaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQyMCw0MjUsNDI2LDQyNyw0MjhdXSwiaWQiOiIwNTEiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJBcm1lbmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xNzIsNDI5LDQzMF1dLCJpZCI6Ijc1MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlN3ZWRlbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTU2LDQzMSw0MzIsNDMzLDQzNF1dLCJpZCI6IjExMiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJlbGFydXMifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTE1NSw0MzUsLTE2NCw0MzYsNDM3LDQzOCw0MzksNDQwLDQ0MSw0NDIsLTQzMl1dLCJpZCI6IjgwNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlVrcmFpbmUifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQzMywtNDQzLDQ0Myw0NDQsNDQ1LDQ0NiwtMTQyLDQ0N11dLCJpZCI6IjYxNiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlBvbGFuZCJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1s0NDgsNDQ5LDQ1MCw0NTEsNDUyLDQ1Myw0NTRdXSwiaWQiOiIwNDAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJBdXN0cmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00NDEsNDU1LDQ1Niw0NTcsNDU4LC00NDksNDU5XV0sImlkIjoiMzQ4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiSHVuZ2FyeSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNDM5LDQ2MF1dLCJpZCI6IjQ5OCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik1vbGRvdmEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQzOCw0NjEsNDYyLDQ2MywtNDU2LC00NDAsLTQ2MV1dLCJpZCI6IjY0MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlJvbWFuaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQzNCwtNDQ4LC0xNDQsNDY0LDQ2NV1dLCJpZCI6IjQ0MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkxpdGh1YW5pYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTU3LC00MzUsLTQ2Niw0NjYsNDY3XV0sImlkIjoiNDI4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTGF0dmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xNTgsLTQ2OCw0NjhdXSwiaWQiOiIyMzMiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJFc3RvbmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00NDYsNDY5LC00NTMsNDcwLC0yMzgsNDcxLDQ3Miw0NzMsNDc0LDQ3NSw0NzZdXSwiaWQiOiIyNzYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJHZXJtYW55In19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00NjMsNDc3LDQ3OCw0NzksNDgwLDQ4MV1dLCJpZCI6IjEwMCIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJ1bGdhcmlhIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWzQ4Ml1dLFtbLTQ4MCw0ODMsNDg0LDQ4NSw0ODZdXV0sImlkIjoiMzAwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiR3JlZWNlIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWy0zNTksLTQyNSw0ODcsNDg4LC00MjcsLTQxOF1dLFtbLTQ3OSw0ODksLTQ4NF1dXSwiaWQiOiI3OTIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJUdXJrZXkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ4Niw0OTAsNDkxLDQ5Miw0OTNdXSwiaWQiOiIwMDgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJBbGJhbmlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00NTgsNDk0LDQ5NSw0OTYsNDk3LDQ5OF1dLCJpZCI6IjE5MSIsInByb3BlcnRpZXMiOnsibmFtZSI6IkNyb2F0aWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ1Miw0OTksLTIzOSwtNDcxXV0sImlkIjoiNzU2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiU3dpdHplcmxhbmQifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ3MiwtMjQ1LDUwMF1dLCJpZCI6IjQ0MiIsInByb3BlcnRpZXMiOnsibmFtZSI6Ikx1eGVtYm91cmcifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ3MywtNTAxLC0yNDQsNTAxLDUwMl1dLCJpZCI6IjA1NiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkJlbGdpdW0ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ3NCwtNTAzLDUwM11dLCJpZCI6IjUyOCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5ldGhlcmxhbmRzIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzUwNCw1MDVdXSwiaWQiOiI2MjAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJQb3J0dWdhbCJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNTA1LDUwNiwtMjQyLDUwN11dLCJpZCI6IjcyNCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlNwYWluIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzUwOCw1MDldXSwiaWQiOiIzNzIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJJcmVsYW5kIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzUxMF1dLCJpZCI6IjU0MCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik5ldyBDYWxlZG9uaWEifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbNTExXV0sW1s1MTJdXSxbWzUxM11dLFtbNTE0XV0sW1s1MTVdXV0sImlkIjoiMDkwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiU29sb21vbiBJcy4ifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbNTE2XV0sW1s1MTddXV0sImlkIjoiNTU0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTmV3IFplYWxhbmQifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbNTE4XV0sW1s1MTldXV0sImlkIjoiMDM2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQXVzdHJhbGlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzUyMF1dLCJpZCI6IjE0NCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlNyaSBMYW5rYSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1s1MjFdXSxbWy02MSwtMTUwLC0zOTMsLTE0OCwtMzkxLDUyMiwtMzg1LC0zNzksLTM4NCwtNDAxLC00MDMsLTM5OSwtNDA0LC0zOTcsLTQwOCwtNDEwLC00MTQsLTQxNV1dXSwiaWQiOiIxNTYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJDaGluYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1s1MjNdXSwiaWQiOiIxNTgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJUYWl3YW4ifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbLTQ1MSw1MjQsNTI1LC0yNDAsLTUwMF1dLFtbNTI2XV0sW1s1MjddXV0sImlkIjoiMzgwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiSXRhbHkifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbLTQ3Niw1MjhdXSxbWzUyOV1dXSwiaWQiOiIyMDgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJEZW5tYXJrIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWy01MTAsNTMwXV0sW1s1MzFdXV0sImlkIjoiODI2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiVW5pdGVkIEtpbmdkb20ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbNTMyXV0sImlkIjoiMzUyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiSWNlbGFuZCJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1stMTUyLDUzMywtNDIxLC00MjksNTM0XV0sW1stNDE5LC00MjZdXV0sImlkIjoiMDMxIiwicHJvcGVydGllcyI6eyJuYW1lIjoiQXplcmJhaWphbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTUzLC01MzUsLTQyOCwtNDg5LDUzNV1dLCJpZCI6IjI2OCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ikdlb3JnaWEifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbNTM2XV0sW1s1MzddXSxbWzUzOF1dLFtbNTM5XV0sW1s1NDBdXSxbWzU0MV1dLFtbNTQyXV1dLCJpZCI6IjYwOCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlBoaWxpcHBpbmVzIn19LHsidHlwZSI6Ik11bHRpUG9seWdvbiIsImFyY3MiOltbWy0zNzQsNTQzXV0sW1stODEsNTQ0LDU0NSw1NDZdXV0sImlkIjoiNDU4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTWFsYXlzaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTU0Niw1NDddXSwiaWQiOiIwOTYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJCcnVuZWkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ1MCwtNDU5LC00OTksNTQ4LC01MjVdXSwiaWQiOiI3MDUiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJTbG92ZW5pYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTYwLDU0OSwtNDMwLC0xNzFdXSwiaWQiOiIyNDYiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJGaW5sYW5kIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00NDIsLTQ2MCwtNDU1LDU1MCwtNDQ0XV0sImlkIjoiNzAzIiwicHJvcGVydGllcyI6eyJuYW1lIjoiU2xvdmFraWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ0NSwtNTUxLC00NTQsLTQ3MF1dLCJpZCI6IjIwMyIsInByb3BlcnRpZXMiOnsibmFtZSI6IkN6ZWNoaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEyNiw1NTEsNTUyLDU1M11dLCJpZCI6IjIzMiIsInByb3BlcnRpZXMiOnsibmFtZSI6IkVyaXRyZWEifX0seyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbNTU0XV0sW1s1NTVdXSxbWzU1Nl1dXSwiaWQiOiIzOTIiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJKYXBhbiJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stMTkzLC05NywtMjAyXV0sImlkIjoiNjAwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiUGFyYWd1YXkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTM2NCw1NTcsNTU4XV0sImlkIjoiODg3IiwicHJvcGVydGllcyI6eyJuYW1lIjoiWWVtZW4ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTM0NiwtMzYyLC0zNTYsNTU5LC0zNTQsNTYwLC0zNTIsLTM2NSwtNTU5LDU2MV1dLCJpZCI6IjY4MiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlNhdWRpIEFyYWJpYSJ9fSx7InR5cGUiOiJNdWx0aVBvbHlnb24iLCJhcmNzIjpbW1s1NjJdXSxbWzU2M11dLFtbNTY0XV0sW1s1NjVdXSxbWzU2Nl1dLFtbNTY3XV0sW1s1NjhdXSxbWzU2OV1dXSwiaWQiOiIwMTAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJBbnRhcmN0aWNhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzU3MCw1NzFdXSwicHJvcGVydGllcyI6eyJuYW1lIjoiTi4gQ3lwcnVzIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy01NzIsNTcyXV0sImlkIjoiMTk2IiwicHJvcGVydGllcyI6eyJuYW1lIjoiQ3lwcnVzIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0zNDEsLTE1LDU3M11dLCJpZCI6IjUwNCIsInByb3BlcnRpZXMiOnsibmFtZSI6Ik1vcm9jY28ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEyNCw1NzQsNTc1LC0zMjksNTc2XV0sImlkIjoiODE4IiwicHJvcGVydGllcyI6eyJuYW1lIjoiRWd5cHQifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEyMywtMTMyLC0yODMsLTM0MywtMzQwLDU3NywtNTc1XV0sImlkIjoiNDM0IiwicHJvcGVydGllcyI6eyJuYW1lIjoiTGlieWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTExNCwtMTE5LDU3OCwtMTI3LC01NTQsNTc5LDU4MF1dLCJpZCI6IjIzMSIsInByb3BlcnRpZXMiOnsibmFtZSI6IkV0aGlvcGlhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy01NTMsNTgxLDU4MiwtNTgwXV0sImlkIjoiMjYyIiwicHJvcGVydGllcyI6eyJuYW1lIjoiRGppYm91dGkifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTExNSwtNTgxLC01ODMsNTgzXV0sInByb3BlcnRpZXMiOnsibmFtZSI6IlNvbWFsaWxhbmQifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTExLDU4NCwtMTEwLDU4NSwtMTE3XV0sImlkIjoiODAwIiwicHJvcGVydGllcyI6eyJuYW1lIjoiVWdhbmRhIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy0xMCwtMzI1LC0xMTEsLTU4NV1dLCJpZCI6IjY0NiIsInByb3BlcnRpZXMiOnsibmFtZSI6IlJ3YW5kYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNDk2LDU4Niw1ODddXSwiaWQiOiIwNzAiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJCb3NuaWEgYW5kIEhlcnouIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00ODEsLTQ4NywtNDk0LDU4OCw1ODldXSwiaWQiOiI4MDciLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJNYWNlZG9uaWEifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTQ1NywtNDY0LC00ODIsLTU5MCw1OTAsNTkxLC01ODcsLTQ5NV1dLCJpZCI6IjY4OCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlNlcmJpYSJ9fSx7InR5cGUiOiJQb2x5Z29uIiwiYXJjcyI6W1stNDkyLDU5MiwtNDk3LC01ODgsLTU5Miw1OTNdXSwiaWQiOiI0OTkiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJNb250ZW5lZ3JvIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWy00OTMsLTU5NCwtNTkxLC01ODldXSwicHJvcGVydGllcyI6eyJuYW1lIjoiS29zb3ZvIn19LHsidHlwZSI6IlBvbHlnb24iLCJhcmNzIjpbWzU5NF1dLCJpZCI6Ijc4MCIsInByb3BlcnRpZXMiOnsibmFtZSI6IlRyaW5pZGFkIGFuZCBUb2JhZ28ifX0seyJ0eXBlIjoiUG9seWdvbiIsImFyY3MiOltbLTEwOSwtMzEwLC0xMjgsLTU3OSwtMTE4LC01ODZdXSwiaWQiOiI3MjgiLCJwcm9wZXJ0aWVzIjp7Im5hbWUiOiJTLiBTdWRhbiJ9fV19LCJsYW5kIjp7InR5cGUiOiJHZW9tZXRyeUNvbGxlY3Rpb24iLCJnZW9tZXRyaWVzIjpbeyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiYXJjcyI6W1tbMF1dLFtbMV1dLFtbMywzMjAsMTg0LDI1NSwzMjMsMTA0LDMyMiwzMTEsMzEzLDMxNSwyODksMjg0LDI3MywyOTAsMjkzLDI5NywzMDUsMzA3LDMwMiwzMDQsMjYzLDMzNiwyNTgsMjcyLDEzLDU3MywzNDEsMzM4LDU3Nyw1NzUsMzI5LDMzMiw0MjMsNDg3LDUzNSwxNTMsNDM1LDE2NCw0MzYsNDYxLDQ3Nyw0ODksNDg0LDQ5MCw1OTIsNDk3LDU0OCw1MjUsMjQwLDUwNyw1MDUsNTA2LDI0Miw1MDEsNTAzLDQ3NCw1MjgsNDc2LDQ0NiwxNDIsNDY0LDQ2Niw0NjgsMTU4LDU0OSw0MzAsMTcyLDE2MSwzODcsMzkxLDM4OSw1MjIsMzg1LDM3MSwzNzIsNTQzLDM3NCwzODAsNDAxLDM5NCw0MDQsNDIyLDM2MCwzNTQsNTU5LDM1Miw1NjAsMzQ3LDM2NSwzNDksMzYyLDU1Nyw1NjEsMzQ2LDU3NiwxMjQsNTUxLDU4MSw1ODMsMTE1LDExOV0sWzQyMSw0MTYsNjQsMTUwLDUzM11dLFtbMTcsNDgsMTg2LDIyOSwyMjcsMjIzLDIxOSwyMTYsMjEzLDIwOSwyMzAsMjMyLDIzNCwyMzYsMjAwLDE5MSw5MywxMDAsMjAzLDI0NiwyMDcsMjExLDIxNCwyMTcsMjIwLDIyNCwyMjgsMTg5LDUwLDE1LDU4XV0sW1sxOV1dLFtbMjBdXSxbWzIxXV0sW1syMl1dLFtbMjNdXSxbWzI0XV0sW1syNV1dLFtbMjZdXSxbWzI3XV0sW1syOF1dLFtbMjldXSxbWzMwXV0sW1szMV1dLFtbMzJdXSxbWzMzXV0sW1szNF1dLFtbMzVdXSxbWzM2XV0sW1szN11dLFtbMzhdXSxbWzM5XV0sW1s0MF1dLFtbNDFdXSxbWzQyXV0sW1s0M11dLFtbNDRdXSxbWzQ1XV0sW1s0Nl1dLFtbNDddXSxbWzUxXV0sW1s1Ml1dLFtbNTNdXSxbWzU0XV0sW1s1NV1dLFtbNTZdXSxbWzU3XV0sW1s1OV1dLFtbNzAsNzVdXSxbWzcyXV0sW1s3M11dLFtbNzRdXSxbWzc3LDE3N11dLFtbNzhdXSxbWzU0Niw3OSw1NDQsNTQ3XV0sW1s4MV1dLFtbODJdXSxbWzgzXV0sW1s4NF1dLFtbODVdXSxbWzg2XV0sW1s4N11dLFtbODhdXSxbWzg5XV0sW1s5MCw5OF1dLFtbMTMzLDEzNF1dLFtbMTM1XV0sW1sxMzZdXSxbWzEzN11dLFtbMTM4XV0sW1sxMzldXSxbWzE0MF1dLFtbMTQ0XV0sW1sxNDVdXSxbWzE2Ml1dLFtbMTY1XV0sW1sxNjZdXSxbWzE2N11dLFtbMTY4XV0sW1sxNjldXSxbWzE3M11dLFtbMTc0XV0sW1sxNzVdXSxbWzE3Nl1dLFtbMjQ1XV0sW1syNDddXSxbWzI0OF1dLFtbMjQ5XV0sW1szMzRdXSxbWzM2Nl1dLFtbMzY3XV0sW1s0ODJdXSxbWzUwOCw1MzBdXSxbWzUxMF1dLFtbNTExXV0sW1s1MTJdXSxbWzUxM11dLFtbNTE0XV0sW1s1MTVdXSxbWzUxNl1dLFtbNTE3XV0sW1s1MThdXSxbWzUxOV1dLFtbNTIwXV0sW1s1MjFdXSxbWzUyM11dLFtbNTI2XV0sW1s1MjddXSxbWzUyOV1dLFtbNTMxXV0sW1s1MzJdXSxbWzUzNl1dLFtbNTM3XV0sW1s1MzhdXSxbWzUzOV1dLFtbNTQwXV0sW1s1NDFdXSxbWzU0Ml1dLFtbNTU0XV0sW1s1NTVdXSxbWzU1Nl1dLFtbNTYyXV0sW1s1NjNdXSxbWzU2NF1dLFtbNTY1XV0sW1s1NjZdXSxbWzU2N11dLFtbNTY4XV0sW1s1NjldXSxbWzU3MCw1NzJdXSxbWzU5NF1dXX1dfX0sImFyY3MiOltbWzk5NDc4LDQwMjM3XSxbNjksOThdLFs5NiwtMTcxXSxbLTQ2LC0zMDhdLFstMTcyLC04MV0sWy0xNTMsNzNdLFstMjcsMjYwXSxbMTA3LDIwM10sWzEyNiwtNzRdXSxbWzAsNDEwODddLFs1NywyN10sWy0zNCwtMjg0XSxbLTIzLC0zMl0sWzk5ODIyLC0xNDVdLFstMTc3LC0xMjRdLFstMzYsMjIwXSxbMTM5LDEyMV0sWzg4LDMzXSxbMTYzLDE4NF0sWy05OTk5OSwwXV0sW1s1OTQxNyw1MDAxOF0sWzQ3LC02NV0sWzEwMDcsLTEyMDNdLFsxOSwtMzQzXSxbMzk5LC01OTBdXSxbWzYwODg5LDQ3ODE3XSxbLTEyOCwtNzI4XSxbMTYsLTMzNV0sWzE3OCwtMjE2XSxbOCwtMTUzXSxbLTc2LC0zNTddLFsxNiwtMTgwXSxbLTE4LC0yODJdLFs5NywtMzcwXSxbMTE1LC01ODNdLFsxMDEsLTEyOV1dLFtbNjExOTgsNDQ0ODRdLFstMjIxLC0zNDJdLFstMzAzLC0yMzBdLFstMTY3LDEwXSxbLTk5LC0xNzddLFstMTkzLC0xNl0sWy03MywtNzRdLFstMzM0LDE2Nl0sWy0yMDksLTQ4XV0sW1s1OTU5OSw0Mzc3M10sWy03Nyw4MDRdLFstOTUsMjc1XSxbLTU1LDE2NF0sWy0yNzMsMTEwXV0sW1s1OTA5OSw0NTEyNl0sWy0xNTcsMTc3XSxbLTE3NywxMDBdLFstMTExLDk5XSxbLTExNiwxNTBdXSxbWzU4NTM4LDQ1NjUyXSxbLTE1MCw3NDVdLFstMTYxLDMzMF0sWy01NSwzNDNdLFsyNywzMDddLFstNTAsNTQ0XV0sW1s1ODE0OSw0NzkyMV0sWzExNSwyOF0sWzEwMSwyMTRdLFsxMDgsMzA4XSxbNjksMTI0XSxbLTMsMTkyXSxbLTYwLDEzNF0sWy0xNiwyMzNdXSxbWzU4NDYzLDQ5MTU0XSxbODAsNzRdLFsxNiwzNDhdLFstMTEwLDMzM11dLFtbNTg0NDksNDk5MDldLFs5OCw3MV0sWzMwNCwtN10sWzU2Niw0NV1dLFtbNDc1OTIsNjY5MjBdLFsxLC00MF0sWy02LC0xMTRdXSxbWzQ3NTg3LDY2NzY2XSxbLTEsLTg5NV0sWy05MTEsMzFdLFs5LC0xNTEyXSxbLTI2MSwtNTNdLFstNjgsLTMwNF0sWzUzLC04NTNdLFstMTA4OCw0XSxbLTYwLC0xOTddXSxbWzQ1MjYwLDYyOTg3XSxbMTIsMjQ5XV0sW1s0NTI3Miw2MzIzNl0sWzUsLTFdLFs2MjUsNDhdLFszMywyMTNdLFsxMTQsMjY1XSxbOTIsODE2XSxbMzg2LDYzN10sWzEzMSw3NDVdLFs4Niw0NF0sWzkxLDQ2MF0sWzIzNCw2M10sWzEwMCwtNzZdLFsxMjYsMF0sWzkwLDEzNF0sWzE3MiwxOV0sWy03LDMxN10sWzQyLDBdXSxbWzE1ODc4LDc5NTMwXSxbLTM4LDFdLFstNTM3LDU4MV0sWy0xOTksMjU1XSxbLTUwMywyNDRdLFstMTU1LDUyM10sWzQwLDM2M10sWy0zNTYsMjUyXSxbLTQ4LDQ3Nl0sWy0zMzYsNDI5XSxbLTYsMzA0XV0sW1sxMzc0MCw4Mjk1OF0sWzE1NCwyODVdLFstNywzNzNdLFstNDczLDM3Nl0sWy0yODQsNjc0XSxbLTE3Myw0MjRdLFstMjU1LDI2Nl0sWy0xODcsMjQyXSxbLTE0NywzMDZdLFstMjc5LC0xOTJdLFstMjcwLC0zMzBdLFstMjQ3LDM4OF0sWy0xOTQsMjU5XSxbLTI3MSwxNjRdLFstMjczLDE3XSxbMSwzMzY0XSxbMiwyMTkzXV0sW1sxMDgzNyw5MTc2N10sWzUxOCwtMTQyXSxbNDM4LC0yODVdLFsyODksLTU0XSxbMjQ0LDI0N10sWzMzNiwxODRdLFs0MTMsLTcyXSxbNDE2LDI1OV0sWzQ1NSwxNDhdLFsxOTEsLTI0NV0sWzIwNywxMzhdLFs2MiwyNzhdLFsxOTIsLTYzXSxbNDcwLC01MzBdLFszNjksNDAxXSxbMzgsLTQ0OV0sWzM0MSw5N10sWzEwNSwxNzNdLFszMzcsLTM0XSxbNDI0LC0yNDhdLFs2NTAsLTIxN10sWzM4MywtMTAwXSxbMjcyLDM4XSxbMzc0LC0zMDBdLFstMzkwLC0yOTNdLFs1MDIsLTEyN10sWzc1MCw3MF0sWzIzNiwxMDNdLFsyOTYsLTM1NF0sWzMwMiwyOTldLFstMjgzLDI1MV0sWzE3OSwyMDJdLFszMzgsMjddLFsyMjMsNTldLFsyMjQsLTE0MV0sWzI3OSwtMzIxXSxbMzEwLDQ3XSxbNDkxLC0yNjZdLFs0MzEsOTRdLFs0MDUsLTE0XSxbLTMyLDM2N10sWzI0NywxMDNdLFs0MzEsLTIwMF0sWy0yLC01NTldLFsxNzcsNDcxXSxbMjIzLC0xNl0sWzEyNiw1OTRdLFstMjk4LDM2NF0sWy0zMjQsMjM5XSxbMjIsNjUzXSxbMzI5LDQyOV0sWzM2NiwtOTVdLFsyODEsLTI2MV0sWzM3OCwtNjY2XSxbLTI0NywtMjkwXSxbNTE3LC0xMjBdLFstMSwtNjA0XSxbMzcxLDQ2M10sWzMzMiwtMzgwXSxbLTgzLC00MzhdLFsyNjksLTM5OV0sWzI5MCw0MjddLFsyMDIsNTEwXSxbMTYsNjQ5XSxbMzk0LC00Nl0sWzQxMSwtODddLFszNzMsLTI5M10sWzE3LC0yOTNdLFstMjA3LC0zMTVdLFsxOTYsLTMxNl0sWy0zNiwtMjg4XSxbLTU0NCwtNDEzXSxbLTM4NiwtOTFdLFstMjg3LDE3OF0sWy04MywtMjk3XSxbLTI2OCwtNDk4XSxbLTgxLC0yNTldLFstMzIyLC0zOTldLFstMzk3LC0zOV0sWy0yMjAsLTI1MF0sWy0xOCwtMzg0XSxbLTMyMywtNzRdLFstMzQwLC00NzldLFstMzAxLC02NjVdLFstMTA4LC00NjZdLFstMTYsLTY4Nl0sWzQwOSwtOTldLFsxMjUsLTU1M10sWzEzMCwtNDQ4XSxbMzg4LDExN10sWzUxNywtMjU2XSxbMjc3LC0yMjVdLFsxOTksLTI3OV0sWzM0OCwtMTYzXSxbMjk0LC0yNDhdLFs0NTksLTM0XSxbMzAyLC01OF0sWy00NSwtNTExXSxbODYsLTU5NF0sWzIwMSwtNjYxXSxbNDE0LC01NjFdLFsyMTQsMTkyXSxbMTUwLDYwN10sWy0xNDUsOTM0XSxbLTE5NiwzMTFdLFs0NDUsMjc2XSxbMzE0LDQxNV0sWzE1NCw0MTFdLFstMjMsMzk1XSxbLTE4OCw1MDJdLFstMzM4LDQ0NV0sWzMyOCw2MTldLFstMTIxLDUzNV0sWy05Myw5MjJdLFsxOTQsMTM3XSxbNDc2LC0xNjFdLFsyODYsLTU3XSxbMjMwLDE1NV0sWzI1OCwtMjAwXSxbMzQyLC0zNDNdLFs4NSwtMjI5XSxbNDk1LC00NV0sWy04LC00OTZdLFs5MiwtNzQ3XSxbMjU0LC05Ml0sWzIwMSwtMzQ4XSxbNDAyLDMyOF0sWzI2Niw2NTJdLFsxODQsMjc0XSxbMjE2LC01MjddLFszNjIsLTc1NF0sWzMwNywtNzA5XSxbLTExMiwtMzcxXSxbMzcwLC0zMzNdLFsyNTAsLTMzOF0sWzQ0MiwtMTUyXSxbMTc5LC0xODldLFsxMTAsLTUwMF0sWzIxNiwtNzhdLFsxMTIsLTIyM10sWzIwLC02NjRdLFstMjAyLC0yMjJdLFstMTk5LC0yMDddLFstNDU4LC0yMTBdLFstMzQ5LC00ODZdLFstNDcwLC05Nl0sWy01OTQsMTI1XSxbLTQxNyw0XSxbLTI4NywtNDFdLFstMjMzLC00MjRdLFstMzU0LC0yNjJdLFstNDAxLC03ODJdLFstMzIwLC01NDVdLFsyMzYsOTddLFs0NDYsNzc2XSxbNTgzLDQ5M10sWzQxNSw1OF0sWzI0NiwtMjg5XSxbLTI2MiwtMzk3XSxbODgsLTYzN10sWzkxLC00NDZdLFszNjEsLTI5NV0sWzQ1OSw4Nl0sWzI3OCw2NjRdLFsxOSwtNDI5XSxbMTgwLC0yMTRdLFstMzQ0LC0zODddLFstNjE1LC0zNTFdLFstMjc2LC0yMzldLFstMzEwLC00MjZdLFstMjExLDQ0XSxbLTExLDUwMF0sWzQ4Myw0ODhdLFstNDQ1LC0xOV0sWy0zMDksLTcyXV0sW1szMTM1MCw3NzI0OF0sWy0xODEsMzM0XSxbMCw4MDVdLFstMTIzLDE3MV0sWy0xODcsLTEwMF0sWy05MiwxNTVdLFstMjEyLC00NDZdLFstODQsLTQ2MF0sWy05OSwtMjY5XSxbLTExOCwtOTFdLFstODksLTMwXSxbLTI4LC0xNDZdLFstNTEyLDBdLFstNDIyLC00XSxbLTEyNSwtMTA5XSxbLTI5NCwtNDI1XSxbLTM0LC00Nl0sWy04OSwtMjMxXSxbLTI1NSwxXSxbLTI3MywtM10sWy0xMjUsLTkzXSxbNDQsLTExNl0sWzI1LC0xODFdLFstNSwtNjBdLFstMzYzLC0yOTNdLFstMjg2LC05M10sWy0zMjMsLTMxNl0sWy03MCwwXSxbLTk0LDkzXSxbLTMxLDg1XSxbNiw2MV0sWzYxLDIwN10sWzEzMSwzMjVdLFs4MSwzNDldLFstNTYsNTE0XSxbLTU5LDUzNl0sWy0yOTAsMjc3XSxbMzUsMTA1XSxbLTQxLDczXSxbLTc2LDBdLFstNTYsOTNdLFstMTQsMTQwXSxbLTU0LC02MV0sWy03NSwxOF0sWzE3LDU5XSxbLTY1LDU4XSxbLTI3LDE1NV0sWy0yMTYsMTg5XSxbLTIyNCwxOTddLFstMjcyLDIyOV0sWy0yNjEsMjE0XSxbLTI0OCwtMTY3XSxbLTkxLC02XSxbLTM0MiwxNTRdLFstMjI1LC03N10sWy0yNjksMTgzXSxbLTI4NCw5NF0sWy0xOTQsMzZdLFstODYsMTAwXSxbLTQ5LDMyNV0sWy05NCwtM10sWy0xLC0yMjddLFstNTc1LDBdLFstOTUxLDBdLFstOTQ0LDBdLFstODMzLDBdLFstODM0LDBdLFstODE5LDBdLFstODQ3LDBdLFstMjczLDBdLFstODI0LDBdLFstNzg5LDBdXSxbWzI2NjY4LDg3NDc4XSxbMjA3LDI3M10sWzM4MSwtNl0sWy02LC0xMTRdLFstMzI1LC0zMjZdLFstMTk2LDEzXSxbLTYxLDE2MF1dLFtbMjc4NDAsOTM1OTNdLFstMzA2LDMxM10sWzEyLDIxM10sWzEzMywzOV0sWzYzNiwtNjNdLFs0NzksLTMyNV0sWzI1LC0xNjNdLFstMjk2LDE3XSxbLTI5OSwxM10sWy0zMDQsLTgwXSxbLTgwLDM2XV0sW1syNzY5MCw4NzI2MV0sWzEwNywxNzddLFsxMTQsLTEzXSxbNzAsLTEyMV0sWy0xMDgsLTMxMF0sWy0xMjMsNTBdLFstNzMsMTc2XSxbMTMsNDFdXSxbWzIzOTk2LDk0ODc5XSxbLTE1MSwtMjI5XSxbLTQwMyw0NF0sWy0zMzcsMTU1XSxbMTQ4LDI2Nl0sWzM5OSwxNTldLFsyNDMsLTIwOF0sWzEwMSwtMTg3XV0sW1syMzkzMyw5NjM4MF0sWy0xMjYsLTE3XSxbLTUyMSwzOF0sWy03NCwxNjVdLFs1NTksLTldLFsxOTUsLTEwOV0sWy0zMywtNjhdXSxbWzIzMTI0LDk3MTE2XSxbMzMyLC0yMDVdLFstNzYsLTIxNF0sWy00MTEsLTEyMl0sWy0yMjYsMTM4XSxbLTExOSwyMjFdLFstMjIsMjQ1XSxbMzYwLC0yNF0sWzE2MiwtMzldXSxbWzI1NTE0LDk0NTMyXSxbLTQ0OSw3M10sWy03MzgsMTkwXSxbLTk2LDMyNV0sWy0zNCwyOTNdLFstMjc5LDI1OF0sWy01NzQsNzJdLFstMzIyLDE4M10sWzEwNCwyNDJdLFs1NzMsLTM3XSxbMzA4LC0xOTBdLFs1NDcsMV0sWzI0MCwtMTk0XSxbLTY0LC0yMjJdLFszMTksLTEzNF0sWzE3NywtMTQwXSxbMzc0LC0yNl0sWzQwNiwtNTBdLFs0NDEsMTI4XSxbNTY2LDUxXSxbNDUxLC00Ml0sWzI5OCwtMjIzXSxbNjIsLTI0NF0sWy0xNzQsLTE1N10sWy00MTQsLTEyN10sWy0zNTUsNzJdLFstNzk3LC05MV0sWy01NzAsLTExXV0sW1sxOTA5Myw5Njc1NF0sWzM5MiwtOTJdLFstOTMsLTE3N10sWy01MTgsLTE3MF0sWy00MTEsMTkxXSxbMjI0LDE4OF0sWzQwNiw2MF1dLFtbMTkxNzcsOTcxMzldLFszNjEsLTEyMF0sWy0zMzksLTExNV0sWy00NjEsMV0sWzUsODRdLFsyODUsMTc3XSxbMTQ5LC0yN11dLFtbMzQ1NTUsODA4OTldLFstMTQ4LC0zNzJdLFstMTg0LC01MTddLFsxODEsMTk5XSxbMTg3LC0xMjZdLFstOTgsLTIwNl0sWzI0NywtMTYyXSxbMTI4LDE0NF0sWzI3NywtMTgyXSxbLTg2LC00MzNdLFsxOTQsMTAxXSxbMzYsLTMxM10sWzg2LC0zNjddLFstMTE3LC01MjBdLFstMTI1LC0yMl0sWy0xODMsMTExXSxbNjAsNDg0XSxbLTc3LDc1XSxbLTMyMiwtNTEzXSxbLTE2NiwyMV0sWzE5NiwyNzddLFstMjY3LDE0NF0sWy0yOTgsLTM1XSxbLTUzOSwxOF0sWy00MywxNzVdLFsxNzMsMjA4XSxbLTEyMSwxNjBdLFsyMzQsMzU2XSxbMjg3LDk0MV0sWzE3MiwzMzZdLFsyNDEsMjA0XSxbMTI5LC0yNl0sWy01NCwtMTYwXV0sW1syNjY5OSw4OTA0OF0sWzMwNCwtMjAzXSxbMzE4LC0xODRdLFsyNSwtMjgxXSxbMjA0LDQ2XSxbMTk5LC0xOTZdLFstMjQ3LC0xODZdLFstNDMyLDE0Ml0sWy0xNTYsMjY2XSxbLTI3NSwtMzE0XSxbLTM5NiwtMzA2XSxbLTk1LDM0Nl0sWy0zNzcsLTU3XSxbMjQyLDI5Ml0sWzM1LDQ2NV0sWzk1LDU0Ml0sWzIwMSwtNDldLFs1MSwtMjU5XSxbMTQzLDkxXSxbMTYxLC0xNTVdXSxbWzI4MTE5LDkzMzI3XSxbMjYzLDIzNV0sWzYxNiwtMjk5XSxbMzgzLC0yODJdLFszNiwtMjU4XSxbNTE1LDEzNF0sWzI5MCwtMzc2XSxbNjcwLC0yMzRdLFsyNDIsLTIzOF0sWzI2MywtNTUzXSxbLTUxMCwtMjc1XSxbNjU0LC0zODZdLFs0NDEsLTEzMF0sWzQwMCwtNTQzXSxbNDM3LC0zOV0sWy04NywtNDE0XSxbLTQ4NywtNjg3XSxbLTM0MiwyNTNdLFstNDM3LDU2OF0sWy0zNTksLTc0XSxbLTM1LC0zMzhdLFsyOTIsLTM0NF0sWzM3NywtMjcyXSxbMTE0LC0xNTddLFsxODEsLTU4NF0sWy05NiwtNDI1XSxbLTM1MCwxNjBdLFstNjk3LDQ3M10sWzM5MywtNTA5XSxbMjg5LC0zNTddLFs0NSwtMjA2XSxbLTc1MywyMzZdLFstNTk2LDM0M10sWy0zMzcsMjg3XSxbOTcsMTY3XSxbLTQxNCwzMDRdLFstNDA1LDI4Nl0sWzUsLTE3MV0sWy04MDMsLTk0XSxbLTIzNSwyMDNdLFsxODMsNDM1XSxbNTIyLDEwXSxbNTcxLDc2XSxbLTkyLDIxMV0sWzk2LDI5NF0sWzM2MCw1NzZdLFstNzcsMjYxXSxbLTEwNywyMDNdLFstNDI1LDI4Nl0sWy01NjMsMjAxXSxbMTc4LDE1MF0sWy0yOTQsMzY3XSxbLTI0NSwzNF0sWy0yMTksMjAxXSxbLTE0OSwtMTc1XSxbLTUwMywtNzZdLFstMTAxMSwxMzJdLFstNTg4LDE3NF0sWy00NTAsODldLFstMjMxLDIwN10sWzI5MCwyNzBdLFstMzk0LDJdLFstODgsNTk5XSxbMjEzLDUyOF0sWzI4NiwyNDFdLFs3MTcsMTU4XSxbLTIwNCwtMzgyXSxbMjE5LC0zNjldLFsyNTYsNDc3XSxbNzA0LDI0Ml0sWzQ3NywtNjExXSxbLTQyLC0zODddLFs1NTAsMTcyXV0sW1syMzc0OSw5NDM4MF0sWzU3OSwtMjBdLFs1MzAsLTE0NF0sWy00MTUsLTUyNl0sWy0zMzEsLTExNV0sWy0yOTgsLTQ0Ml0sWy0zMTcsMjJdLFstMTczLDUxOV0sWzQsMjk0XSxbMTQ1LDI1MV0sWzI3NiwxNjFdXSxbWzE1ODczLDk1NTUxXSxbNDcyLDQ0Ml0sWzU3MCwzODNdLFs0MjYsLTldLFszODEsODddLFstMzgsLTQ1NF0sWy0yMTQsLTIwNV0sWy0yNTksLTI5XSxbLTUxNywtMjUyXSxbLTQ0NCwtOTFdLFstMzc3LDEyOF1dLFtbMTMxMzYsODI1MDhdLFsyNjcsNDddLFstODQsLTY3MV0sWzI0MiwtNDc1XSxbLTExMSwxXSxbLTE2NywyNzBdLFstMTAzLDI3Ml0sWy0xNDAsMTg0XSxbLTUxLDI2MF0sWzE2LDE4OF0sWzEzMSwtNzZdXSxbWzIwNjk2LDk3NDMzXSxbNTQ2LC04MV0sWzc1MSwtMjE1XSxbMjEyLC0yODFdLFsxMDgsLTI0N10sWy00NTMsNjZdLFstNDU3LDE5Ml0sWy02MTksMjFdLFsyNjgsMTc2XSxbLTMzNSwxNDJdLFstMjEsMjI3XV0sW1sxNTY5Miw3OTI0MF0sWy0xNDAsLTgyXSxbLTQ1NiwyNjldLFstODQsMjA5XSxbLTI0OCwyMDddLFstNTAsMTY4XSxbLTI4NiwxMDddLFstMTA3LDMyMV0sWzI0LDEzN10sWzI5MSwtMTI5XSxbMTcxLC04OV0sWzI2MSwtNjNdLFs5NCwtMjA0XSxbMTM4LC0yODBdLFsyNzcsLTI0NF0sWzExNSwtMzI3XV0sW1sxNjIzOSw5NDU2Nl0sWzM5NywtMTIzXSxbNzA5LC0zM10sWzI3MCwtMTcxXSxbMjk4LC0yNDldLFstMzQ5LC0xNDldLFstNjgxLC00MTVdLFstMzQ0LC00MTRdLFswLC0yNTddLFstNzMxLC0yODVdLFstMTQ3LDI1OV0sWy02NDEsMzEyXSxbMTE5LDI1MF0sWzE5Miw0MzJdLFsyNDEsMzg4XSxbLTI3MiwzNjJdLFs5MzksOTNdXSxbWzIwMDUwLDk1MzkxXSxbMjQ3LDk5XSxbMjkxLC0yNl0sWzQ5LC0yODldLFstMTY5LC0yODFdLFstOTQwLC05MV0sWy03MDEsLTI1Nl0sWy00MjMsLTE0XSxbLTM1LDE5M10sWzU3NywyNjFdLFstMTI1NSwtNzBdLFstMzg5LDEwNl0sWzM3OSw1NzddLFsyNjIsMTY1XSxbNzgyLC0xOTldLFs0OTMsLTM1MF0sWzQ4NSwtNDVdLFstMzk3LDU2NV0sWzI1NSwyMTVdLFsyODYsLTY4XSxbOTQsLTI4Ml0sWzEwOSwtMjEwXV0sW1syMDQxMCw5Mzc1NV0sWzMxMSwtMjM5XSxbMTc1LC01NzVdLFs4NiwtNDE3XSxbNDY2LC0yOTNdLFs1MDIsLTI3OV0sWy0zMSwtMjYwXSxbLTQ1NiwtNDhdLFsxNzgsLTIyN10sWy05NCwtMjE3XSxbLTUwMyw5M10sWy00NzgsMTYwXSxbLTMyMiwtMzZdLFstNTIyLC0yMDFdLFstNzA0LC04OF0sWy00OTQsLTU2XSxbLTE1MSwyNzldLFstMzc5LDE2MV0sWy0yNDYsLTY2XSxbLTM0Myw0NjhdLFsxODUsNjJdLFs0MjksMTAxXSxbMzkyLC0yNl0sWzM2MiwxMDNdLFstNTM3LDEzOF0sWy01OTQsLTQ3XSxbLTM5NCwxMl0sWy0xNDYsMjE3XSxbNjQ0LDIzN10sWy00MjgsLTldLFstNDg1LDE1Nl0sWzIzMyw0NDNdLFsxOTMsMjM1XSxbNzQ0LDM1OV0sWzI4NCwtMTE0XSxbLTEzOSwtMjc3XSxbNjE4LDE3OV0sWzM4NiwtMjk4XSxbMzE0LDMwMl0sWzI1NCwtMTk0XSxbMjI3LC01ODBdLFsxNDAsMjQ0XSxbLTE5Nyw2MDZdLFsyNDQsODZdLFsyNzYsLTk0XV0sW1syMjEwMCw5MzUzNl0sWy0zMDYsMzg2XSxbMzI5LDI4Nl0sWzMzMSwtMTI0XSxbNDk2LDc1XSxbNzIsLTE3Ml0sWy0yNTksLTI4M10sWzQyMCwtMjU0XSxbLTUwLC01MzJdLFstNDU1LC0yMjldLFstMjY4LDUwXSxbLTE5MiwyMjVdLFstNjkwLDQ1Nl0sWzUsMTg5XSxbNTY3LC03M11dLFtbMjAzODksOTQwNjRdLFszNzIsMjRdLFsyMTEsLTEzMF0sWy0yNDQsLTM5MF0sWy00MzQsNDEzXSxbOTUsODNdXSxbWzIyNjM5LDk1OTA3XSxbMjEyLC0yNzNdLFs5LC0zMDNdLFstMTI3LC00NDBdLFstNDU4LC02MF0sWy0yOTgsOTRdLFs1LDM0NV0sWy00NTUsLTQ2XSxbLTE4LDQ1N10sWzI5OSwtMThdLFs0MTksMjAxXSxbMzkwLC0zNF0sWzIyLDc3XV0sW1syMzMyOSw5ODIwMV0sWzE5MiwxODBdLFsyODUsNDJdLFstMTIyLDEzNV0sWzY0NiwzMF0sWzM1NSwtMzE1XSxbNDY4LC0xMjddLFs0NTUsLTExMl0sWzIyMCwtMzkwXSxbMzM0LC0xOTBdLFstMzgxLC0xNzZdLFstNTEzLC00NDVdLFstNDkyLC00Ml0sWy01NzUsNzZdLFstMjk5LDI0MF0sWzQsMjE1XSxbMjIwLDE1N10sWy01MDgsLTRdLFstMzA2LDE5Nl0sWy0xNzYsMjY4XSxbMTkzLDI2Ml1dLFtbMjQ1NTksOTg5NjVdLFs0MTMsMTEyXSxbMzI0LDE5XSxbNTQ1LDk2XSxbNDA5LDIyMF0sWzM0NCwtMzBdLFszMDAsLTE2Nl0sWzIxMSwzMTldLFszNjcsOTVdLFs0OTgsNjVdLFs4NDksMjRdLFsxNDgsLTYzXSxbODAyLDEwMF0sWzYwMSwtMzhdLFs2MDIsLTM3XSxbNzQyLC00N10sWzU5NywtNzVdLFs1MDgsLTE2MV0sWy0xMiwtMTU3XSxbLTY3OCwtMjU3XSxbLTY3MiwtMTE5XSxbLTI1MSwtMTMzXSxbNjA1LDNdLFstNjU2LC0zNThdLFstNDUyLC0xNjddLFstNDc2LC00ODNdLFstNTczLC05OF0sWy0xNzcsLTEyMF0sWy04NDEsLTY0XSxbMzgzLC03NF0sWy0xOTIsLTEwNV0sWzIzMCwtMjkyXSxbLTI2NCwtMjAyXSxbLTQyOSwtMTY3XSxbLTEzMiwtMjMyXSxbLTM4OCwtMTc2XSxbMzksLTEzNF0sWzQ3NSwyM10sWzYsLTE0NF0sWy03NDIsLTM1NV0sWy03MjYsMTYzXSxbLTgxNiwtOTFdLFstNDE0LDcxXSxbLTUyNSwzMV0sWy0zNSwyODRdLFs1MTQsMTMzXSxbLTEzNyw0MjddLFsxNzAsNDFdLFs3NDIsLTI1NV0sWy0zNzksMzc5XSxbLTQ1MCwxMTNdLFsyMjUsMjI5XSxbNDkyLDE0MV0sWzc5LDIwNl0sWy0zOTIsMjMxXSxbLTExOCwzMDRdLFs3NTksLTI2XSxbMjIwLC02NF0sWzQzMywyMTZdLFstNjI1LDY4XSxbLTk3MiwtMzhdLFstNDkxLDIwMV0sWy0yMzIsMjM5XSxbLTMyNCwxNzNdLFstNjEsMjAyXV0sW1syOTEwNiw5MDQyN10sWy0xODAsLTE3NF0sWy0zMTIsLTMwXSxbLTY5LDI4OV0sWzExOCwzMzFdLFsyNTUsODJdLFsyMTcsLTE2M10sWzMsLTI1M10sWy0zMiwtODJdXSxbWzIzMjYyLDkxNjM2XSxbMTY5LC0yMjZdLFstMTczLC0yMDddLFstMzc0LDE3OV0sWy0yMjYsLTY1XSxbLTM4MCwyNjZdLFsyNDUsMTgzXSxbMTk0LDI1Nl0sWzI5NSwtMTY4XSxbMTY2LC0xMDZdLFs4NCwtMTEyXV0sW1szMjA3OCw4MDA0Nl0sWzk2LDQ5XSxbMzY1LC0xNDhdLFsyODQsLTI0N10sWzgsLTEwOF0sWy0xMzUsLTExXSxbLTM2MCwxODZdLFstMjU4LDI3OV1dLFtbMzIyMTgsNzgzNzBdLFs5NywtMjg4XSxbMjAyLC03OV0sWzI1NywxNl0sWy0xMzcsLTI0Ml0sWy0xMDIsLTM4XSxbLTM1MywyNTBdLFstNjksMTk4XSxbMTA1LDE4M11dLFtbMzEzNTAsNzcyNDhdLFs0OCwtMTk0XSxbLTI5NiwtMjg2XSxbLTI4NiwtMjA0XSxbLTI5MywtMTc1XSxbLTE0NywtMzUxXSxbLTQ3LC0xMzNdLFstMywtMzEzXSxbOTIsLTMxM10sWzExNSwtMTVdLFstMjksMjE2XSxbODMsLTEzMV0sWy0yMiwtMTY5XSxbLTE4OCwtOTZdLFstMTMzLDExXSxbLTIwNSwtMTAzXSxbLTEyMSwtMjldLFstMTYyLC0yOV0sWy0yMzEsLTE3MV0sWzQwOCwxMTFdLFs4MiwtMTEyXSxbLTM4OSwtMTc3XSxbLTE3NywtMV0sWzgsNzJdLFstODQsLTE2NF0sWzgyLC0yN10sWy02MCwtNDI0XSxbLTIwMywtNDU1XSxbLTIwLDE1Ml0sWy02MSwzMF0sWy05MSwxNDhdLFs1NywtMzE4XSxbNjksLTEwNV0sWzUsLTIyM10sWy04OSwtMjMwXSxbLTE1NywtNDcyXSxbLTI1LDI0XSxbODYsNDAyXSxbLTE0MiwyMjVdLFstMzMsNDkxXSxbLTUzLC0yNTVdLFs1OSwtMzc1XSxbLTE4Myw5M10sWzE5MSwtMTkxXSxbMTIsLTU2Ml0sWzc5LC00MV0sWzI5LC0yMDRdLFszOSwtNTkxXSxbLTE3NiwtNDM5XSxbLTI4OCwtMTc1XSxbLTE4MiwtMzQ2XSxbLTEzOSwtMzhdLFstMTQxLC0yMTddLFstMzksLTE5OV0sWy0zMDUsLTM4M10sWy0xNTcsLTI4MV0sWy0xMzEsLTM1MV0sWy00MywtNDE5XSxbNTAsLTQxMV0sWzkyLC01MDVdLFsxMjQsLTQxOF0sWzEsLTI1Nl0sWzEzMiwtNjg1XSxbLTksLTM5OF0sWy0xMiwtMjMwXSxbLTY5LC0zNjFdLFstODMsLTc1XSxbLTEzNyw3Ml0sWy00NCwyNTldLFstMTA1LDEzNl0sWy0xNDgsNTA4XSxbLTEyOSw0NTJdLFstNDIsMjMxXSxbNTcsMzkzXSxbLTc3LDMyNV0sWy0yMTcsNDk0XSxbLTEwOCw5MF0sWy0yODEsLTI2OF0sWy00OSwzMF0sWy0xMzUsMjc1XSxbLTE3NCwxNDddLFstMzE0LC03NV0sWy0yNDcsNjZdLFstMjEyLC00MV0sWy0xMTQsLTkyXSxbNTAsLTE1N10sWy01LC0yNDBdLFs1OSwtMTE3XSxbLTUzLC03N10sWy0xMDMsODddLFstMTA0LC0xMTJdLFstMjAyLDE4XSxbLTIwNywzMTJdLFstMjQyLC03M10sWy0yMDIsMTM3XSxbLTE3MywtNDJdLFstMjM0LC0xMzhdLFstMjUzLC00MzhdLFstMjc2LC0yNTVdLFstMTUyLC0yODJdLFstNjMsLTI2Nl0sWy0zLC00MDddLFsxNCwtMjg0XSxbNTIsLTIwMV1dLFtbMjMwMTYsNjU4NjRdLFstMTA4LC0xOF0sWy0xOTcsMTMwXSxbLTIxNywxODRdLFstNzgsMjc3XSxbLTYxLDQxNF0sWy0xNjQsMzM3XSxbLTk2LDM0Nl0sWy0xMzksNDA0XSxbLTE5NiwyMzZdLFstMjI3LC0xMV0sWy0xNzUsLTQ2N10sWy0yMzAsMTc3XSxbLTE0NCwxNzhdLFstNjksMzI1XSxbLTkyLDMwOV0sWy0xNjUsMjYwXSxbLTE0MiwxODZdLFstMTAyLDIxMF0sWy00ODEsMF0sWzAsLTI0NF0sWy0yMjEsMF0sWy01NTIsLTRdLFstNjM0LDQxNl0sWy00MTksMjg3XSxbMjYsMTE2XSxbLTM1MywtNjRdLFstMzE2LC00Nl1dLFtbMTc0NjQsNjk4MDJdLFstNDYsMzAyXSxbLTE4MCwzNDBdLFstMTMwLDcxXSxbLTMwLDE2OV0sWy0xNTYsMzBdLFstMTAwLDE1OV0sWy0yNTgsNTldLFstNzEsOTVdLFstMzMsMzI0XSxbLTI3MCw1OTRdLFstMjMxLDgyMV0sWzEwLDEzN10sWy0xMjMsMTk1XSxbLTIxNSw0OTVdLFstMzgsNDgyXSxbLTE0OCwzMjNdLFs2MSw0ODldLFstMTAsNTA3XSxbLTg5LDQ1M10sWzEwOSw1NTddLFszNCw1MzZdLFszMyw1MzZdLFstNTAsNzkyXSxbLTg4LDUwNl0sWy04MCwyNzRdLFszMywxMTVdLFs0MDIsLTIwMF0sWzE0OCwtNTU4XSxbNjksMTU2XSxbLTQ1LDQ4NF0sWy05NCw0ODVdXSxbWzY4MzMsNjI0NDNdLFs0OSwtNTFdLFs0NSwtNzldLFs3MSwtMjA3XSxbLTcsLTMzXSxbLTEwOCwtMTI2XSxbLTg5LC05Ml0sWy00MSwtOTldLFstNjksODRdLFs4LDE2NV0sWy00NiwyMTZdLFsxNCw2NV0sWzQ4LDk3XSxbLTE5LDExNl0sWzE2LDU1XSxbMjEsLTExXSxbMTA3LC0xMDBdXSxbWzY2NjgsNjI4NDhdLFstMjMsLTcxXSxbLTk0LC00M10sWy00NywxMjVdLFstMzIsNDhdLFstMywzN10sWzI3LDUwXSxbOTksLTU2XSxbNzMsLTkwXV0sW1s2NDU2LDYzMDkxXSxbLTksLTYzXSxbLTE0OSwxN10sWzIxLDcyXSxbMTM3LC0yNl1dLFtbNjEwNCw2MzQxMV0sWzIzLC0zOF0sWzgwLC0xOTZdLFstMTUsLTM0XSxbLTE5LDhdLFstOTcsMjFdLFstMzUsMTMzXSxbLTExLDI0XSxbNzQsODJdXSxbWzU3MzIsNjM3MDVdLFs1LC0xMzhdLFstMzMsLTU4XSxbLTkzLDEwN10sWzE0LDQzXSxbNDMsNThdLFs2NCwtMTJdXSxbWzM3NTksODYyNTZdLFsyMjAsLTU0XSxbMjcsLTIyNl0sWy0xNzEsLTkyXSxbLTE4MiwxMTBdLFstMTY4LDE2MV0sWzI3NCwxMDFdXSxbWzc0MzYsODQ4MjldLFsxODUsLTQwXSxbMTE3LC0xODNdLFstMjQwLC0yODFdLFstMjc3LC0yMjVdLFstMTQyLDE1Ml0sWy00MywyNzddLFsyNTIsMjEwXSxbMTQ4LDkwXV0sW1sxMzc0MCw4Mjk1OF0sWy0xNTMsMjIzXSxbLTI0NSwxODhdLFstNzgsNTE1XSxbLTM1OCw0NzhdLFstMTUwLDU1OF0sWy0yNjcsMzhdLFstNDQxLDE1XSxbLTMyNiwxNzBdLFstNTc0LDYxM10sWy0yNjYsMTEyXSxbLTQ4NiwyMTFdLFstMzg1LC01MV0sWy01NDYsMjcyXSxbLTMzMCwyNTJdLFstMzA5LC0xMjVdLFs1OCwtNDExXSxbLTE1NCwtMzhdLFstMzIxLC0xMjNdLFstMjQ1LC0xOTldLFstMzA4LC0xMjZdLFstMzksMzQ4XSxbMTI1LDU4MF0sWzI5NSwxODJdLFstNzYsMTQ4XSxbLTM1NCwtMzI5XSxbLTE5MCwtMzk0XSxbLTQwMCwtNDIwXSxbMjAzLC0yODddLFstMjYyLC00MjRdLFstMjk5LC0yNDhdLFstMjc4LC0xODBdLFstNjksLTI2MV0sWy00MzQsLTMwNV0sWy04NywtMjc4XSxbLTMyNSwtMjUyXSxbLTE5MSw0NV0sWy0yNTksLTE2NV0sWy0yODIsLTIwMV0sWy0yMzEsLTE5N10sWy00NzcsLTE2OV0sWy00Myw5OV0sWzMwNCwyNzZdLFsyNzEsMTgyXSxbMjk2LDMyNF0sWzM0NSw2Nl0sWzEzNywyNDNdLFszODUsMzUzXSxbNjIsMTE5XSxbMjA1LDIwOF0sWzQ4LDQ0OF0sWzE0MSwzNDldLFstMzIwLC0xNzldLFstOTAsMTAyXSxbLTE1MCwtMjE1XSxbLTE4MSwzMDBdLFstNzUsLTIxMl0sWy0xMDQsMjk0XSxbLTI3OCwtMjM2XSxbLTE3MCwwXSxbLTI0LDM1Ml0sWzUwLDIxNl0sWy0xNzksMjExXSxbLTM2MSwtMTEzXSxbLTIzNSwyNzddLFstMTkwLDE0Ml0sWy0xLDMzNF0sWy0yMTQsMjUyXSxbMTA4LDM0MF0sWzIyNiwzMzBdLFs5OSwzMDNdLFsyMjUsNDNdLFsxOTEsLTk0XSxbMjI0LDI4NV0sWzIwMSwtNTFdLFsyMTIsMTgzXSxbLTUyLDI3MF0sWy0xNTUsMTA2XSxbMjA1LDIyOF0sWy0xNzAsLTddLFstMjk1LC0xMjhdLFstODUsLTEzMV0sWy0yMTksMTMxXSxbLTM5MiwtNjddLFstNDA3LDE0Ml0sWy0xMTcsMjM4XSxbLTM1MSwzNDNdLFszOTAsMjQ3XSxbNjIwLDI4OV0sWzIyOCwwXSxbLTM4LC0yOTZdLFs1ODYsMjNdLFstMjI1LDM2Nl0sWy0zNDIsMjI1XSxbLTE5NywyOTZdLFstMjY3LDI1Ml0sWy0zODEsMTg3XSxbMTU1LDMwOV0sWzQ5MywxOV0sWzM1MCwyNzBdLFs2NiwyODddLFsyODQsMjgxXSxbMjcxLDY4XSxbNTI2LDI2Ml0sWzI1NiwtNDBdLFs0MjcsMzE1XSxbNDIxLC0xMjRdLFsyMDEsLTI2Nl0sWzEyMywxMTRdLFs0NjksLTM1XSxbLTE2LC0xMzZdLFs0MjUsLTEwMV0sWzI4Myw1OV0sWzU4NSwtMTg2XSxbNTM0LC01Nl0sWzIxNCwtNzddLFszNzAsOTZdLFs0MjEsLTE3N10sWzMwMiwtODNdXSxbWzIyOTcsODgyNjRdLFsxNzEsLTExM10sWzE3Myw2MV0sWzIyNSwtMTU2XSxbMjc2LC03OV0sWy0yMywtNjRdLFstMjExLC0xMjVdLFstMjExLDEyOF0sWy0xMDYsMTA3XSxbLTI0NSwtMzRdLFstNjYsNTJdLFsxNywyMjNdXSxbWzc0MjY2LDc5NjU3XSxbLTIxMiwtMzkzXSxbLTIzMCwtNTZdLFstMTMsLTU5Ml0sWy0xNTUsLTI2N10sWy01NTEsMTk0XSxbLTIwMCwtMTA1OF0sWy0xNDMsLTEzMV0sWy01NTAsLTIzNl0sWzI1MCwtMTAyNl0sWy0xOTAsLTE1NF0sWzIyLC0zMzddXSxbWzcyMjk0LDc1NjAxXSxbLTE3MSw4N10sWy0xNDAsMjEyXSxbLTQxMiw2Ml0sWy00NjEsMTZdLFstMTAwLC02NV0sWy0zOTYsMjQ4XSxbLTE1OCwtMTIyXSxbLTQzLC0zNDldLFstNDU3LDIwNF0sWy0xODMsLTg0XSxbLTYyLC0yNTldXSxbWzY5NzExLDc1NTUxXSxbLTE1OSwtMTA5XSxbLTM2NywtNDEyXSxbLTEyMSwtNDIyXSxbLTEwNCwtNF0sWy03NiwyODBdLFstMzUzLDE5XSxbLTU3LDQ4NF0sWy0xMzUsNF0sWzIxLDU5M10sWy0zMzMsNDMxXSxbLTQ3NiwtNDZdLFstMzI2LC04Nl0sWy0yNjUsNTMzXSxbLTIyNywyMjNdLFstNDMxLDQyM10sWy01Miw1MV0sWy03MTUsLTM0OV0sWzExLC0yMTc4XV0sW1s2NTU0Niw3NDk4Nl0sWy0xNDIsLTI5XSxbLTE5NSw0NjNdLFstMTg4LDE2Nl0sWy0zMTUsLTEyM10sWy0xMjMsLTE5N11dLFtbNjQ1ODMsNzUyNjZdLFstMTUsMTQ0XSxbNjgsMjQ2XSxbLTUzLDIwNl0sWy0zMjIsMjAyXSxbLTEyNSw1MzBdLFstMTU0LDE1MF0sWy05LDE5Ml0sWzI3MCwtNTZdLFsxMSw0MzJdLFsyMzYsOTZdLFsyNDMsLTg4XSxbNTAsNTc2XSxbLTUwLDM2NV0sWy0yNzgsLTI4XSxbLTIzNiwxNDRdLFstMzIxLC0yNjBdLFstMjU5LC0xMjRdXSxbWzYzNjM5LDc3OTkzXSxbLTE0Miw5Nl0sWzI5LDMwNF0sWy0xNzcsMzk1XSxbLTIwNywtMTddLFstMjM1LDQwMV0sWzE2MCw0NDhdLFstODEsMTIwXSxbMjIyLDY0OV0sWzI4NSwtMzQyXSxbMzUsNDMxXSxbNTczLDY0M10sWzQzNCwxNV0sWzYxMiwtNDA5XSxbMzI5LC0yMzldLFsyOTUsMjQ5XSxbNDQwLDEyXSxbMzU2LC0zMDZdLFs4MCwxNzVdLFszOTEsLTI1XSxbNjksMjgwXSxbLTQ1MCw0MDZdLFsyNjcsMjg4XSxbLTUyLDE2MV0sWzI2NiwxNTNdLFstMjAwLDQwNV0sWzEyNywyMDJdLFsxMDM5LDIwNV0sWzEzNiwxNDZdLFs2OTUsMjE4XSxbMjUwLDI0NV0sWzQ5OSwtMTI3XSxbODgsLTYxMl0sWzI5MCwxNDRdLFszNTYsLTIwMl0sWy0yMywtMzIyXSxbMjY3LDMzXSxbNjk2LDU1OF0sWy0xMDIsLTE4NV0sWzM1NSwtNDU3XSxbNjIwLC0xNTAwXSxbMTQ4LDMwOV0sWzM4MywtMzQwXSxbMzk5LDE1MV0sWzE1NCwtMTA2XSxbMTMzLC0zNDFdLFsxOTQsLTExNV0sWzExOSwtMjUxXSxbMzU4LDc5XSxbMTQ3LC0zNjFdXSxbWzY5NzExLDc1NTUxXSxbODMsLTU4XSxbLTIzNCwtMzgyXSxbMjA1LC0yMjNdLFsxOTgsMTQ3XSxbMzI5LC0zMTFdLFstMzU1LC00MjVdLFstMjEyLDU4XV0sW1s2OTcyNSw3NDM1N10sWy0xMTQsLTE1XSxbLTQwLDE2NF0sWzU4LDI3NF0sWy0zNzEsLTEzN10sWy04OSwtMzgwXSxbLTEzMiwtMzI2XSxbLTIzMiwyOF0sWy03MiwtMjYxXSxbMjA0LC0xNDBdLFs2MCwtNDQwXSxbLTE1NiwtNTk4XV0sW1s2ODg0MSw3MjUyNl0sWy0yMTAsMTI0XSxbLTE1NCw0XV0sW1s2ODQ3Nyw3MjY1NF0sWzcsMzYyXSxbLTM2OSwyNTNdLFstMjkxLDI4OV0sWy0xODEsMjc4XSxbLTMxNyw0MDhdLFstMTM3LDYwOV0sWy05MywxMDhdLFstMzAxLC0yN10sWy0xMDYsMTIxXSxbLTMwLDQ3MV0sWy0zNzQsMzEyXSxbLTIzNCwtMzQzXSxbLTIzNywtMjA0XSxbNDUsLTI5N10sWy0zMTMsLThdXSxbWzg5MTY2LDQ5MDQzXSxbNDgyLC00MDddLFs1MTMsLTMzOF0sWzE5MiwtMzAyXSxbMTU0LC0yOTddLFs0MywtMzQ5XSxbNDYyLC0zNjVdLFs2OCwtMzEzXSxbLTI1NiwtNjRdLFs2MiwtMzkzXSxbMjQ4LC0zODhdLFsxODAsLTYyN10sWzE1OSwyMF0sWy0xMSwtMjYyXSxbMjE1LC0xMDBdLFstODQsLTExMV0sWzI5NSwtMjQ5XSxbLTMwLC0xNzFdLFstMTg0LC00MV0sWy02OSwxNTNdLFstMjM4LDY2XSxbLTI4MSw4OV0sWy0yMTYsMzc3XSxbLTE1OCwzMjVdLFstMTQ0LDUxN10sWy0zNjIsMjU5XSxbLTIzNSwtMTY5XSxbLTE3MCwtMTk1XSxbMzUsLTQzNl0sWy0yMTgsLTIwM10sWy0xNTUsOTldLFstMjg4LDI1XV0sW1s4OTE3NSw0NTE5M10sWy00LDE5MjVdLFstNSwxOTI1XV0sW1s5MjM5OSw0ODQxN10sWzEwNiwtMTg5XSxbMzMsLTMwN10sWy04NywtMTU3XSxbLTUyLDM0OF0sWy02NSwyMjldLFstMTI2LDE5M10sWy0xNTgsMjUyXSxbLTIwMCwxNzRdLFs3NywxNDNdLFsxNTAsLTE2Nl0sWzk0LC0xMzBdLFsxMTcsLTE0Ml0sWzExMSwtMjQ4XV0sW1s5MjAyNyw0NzEyOV0sWy0xNTIsLTE0NF0sWy0xNDIsLTEzOF0sWy0xNDgsMV0sWy0yMjgsMTcxXSxbLTE1OCwxNjVdLFsyMywxODNdLFsyNDksLTg2XSxbMTUyLDQ2XSxbNDIsMjgzXSxbNDAsMTVdLFsyNywtMzE0XSxbMTU4LDQ1XSxbNzgsMjAyXSxbMTU1LDIxMV0sWy0zMCwzNDhdLFsxNjYsMTFdLFs1NiwtOTddLFstNSwtMzI3XSxbLTkzLC0zNjFdLFstMTQ2LC00OF0sWy00NCwtMTY2XV0sW1s5Mjk4OCw0NzQyNV0sWzg0LC0xMzRdLFsxMzUsLTM3NV0sWzEzMSwtMjAwXSxbLTM5LC0xNjZdLFstNzgsLTU5XSxbLTEyMCwyMjddLFstMTIyLDM3NV0sWy01OSw0NTBdLFszOCw1N10sWzMwLC0xNzVdXSxbWzg5MTc1LDQ1MTkzXSxbLTI0Nyw0ODVdLFstMjgyLDExOF0sWy02OSwtMTY4XSxbLTM1MiwtMThdLFsxMTgsNDgxXSxbMTc1LDE2NF0sWy03Miw2NDJdLFstMTM0LDQ5Nl0sWy01MzgsNTAwXSxbLTIyOSw1MF0sWy00MTcsNTQ2XSxbLTgyLC0yODddLFstMTA3LC01Ml0sWy02MywyMTZdLFstMSwyNTddLFstMjEyLDI5MF0sWzI5OSwyMTNdLFsxOTgsLTExXSxbLTIzLDE1Nl0sWy00MDcsMV0sWy0xMTAsMzUyXSxbLTI0OCwxMDldLFstMTE3LDI5M10sWzM3NCwxNDNdLFsxNDIsMTkyXSxbNDQ2LC0yNDJdLFs0NCwtMjIwXSxbNzgsLTk1NV0sWzI4NywtMzU0XSxbMjMyLDYyN10sWzMxOSwzNTZdLFsyNDcsMV0sWzIzOCwtMjA2XSxbMjA2LC0yMTJdLFsyOTgsLTExM11dLFtbODQ3MTMsNDUzMjZdLFsyOCwtMTE3XSxbNSwtMTc5XV0sW1s4NDc0Niw0NTAzMF0sWy0xODEsLTQ0MV0sWy0yMzgsLTEzMF0sWy0zMyw3MV0sWzI1LDIwMV0sWzExOSwzNjBdLFsyNzUsMjM1XV0sW1s4NzI4MCw0NjUwNl0sWy0yNyw0NDVdLFs0OSwyMTJdLFs1OCwyMDBdLFs2MywtMTczXSxbMCwtMjgyXSxbLTE0MywtNDAyXV0sW1s4Mjc0NCw1MzAyNF0sWy0xNTgsLTUzM10sWzIwNCwtNTYwXSxbLTQ4LC0yNzJdLFszMTIsLTU0Nl0sWy0zMjksLTcwXSxbLTkzLC00MDNdLFsxMiwtNTM1XSxbLTI2NywtNDA0XSxbLTcsLTU4OV0sWy0xMDcsLTkwM10sWy00MSwyMTBdLFstMzE2LC0yNjZdLFstMTEwLDM2MV0sWy0xOTgsMzRdLFstMTM5LDE4OV0sWy0zMzAsLTIxMl0sWy0xMDEsMjg1XSxbLTE4MiwtMzJdLFstMjI5LDY4XSxbLTQzLDc5M10sWy0xMzgsMTY0XSxbLTEzNCw1MDVdLFstMzgsNTE3XSxbMzIsNTQ4XSxbMTY1LDM5Ml1dLFtbODA0NjEsNTE3NjVdLFs0NywtMzk1XSxbMTkwLC0zMzRdLFsxNzksMTIxXSxbMTc3LC00M10sWzE2MiwyOTldLFsxMzMsNTJdLFsyNjMsLTE2Nl0sWzIyNiwxMjZdLFsxNDMsODIyXSxbMTA3LDIwNV0sWzk2LDY3Ml0sWzMxOSwwXSxbMjQxLC0xMDBdXSxbWzg1OTM2LDQ4OTI0XSxbMzA1LC0xNzJdLFsxMDEsLTQ1Ml0sWy0yMzQsMjQ0XSxbLTIzMiw0OV0sWy0xNTcsLTM5XSxbLTE5MiwyMV0sWzY1LDMyNV0sWzM0NCwyNF1dLFtbODUyNDIsNDgzNDBdLFstMTkyLDEwOF0sWy01NCwyNTRdLFsyODEsMjldLFs2OSwtMTk1XSxbLTEwNCwtMTk2XV0sW1s4NTUzNiw1MTg2NF0sWzIwLC0zMjJdLFsxNjQsLTUyXSxbMjYsLTI0MV0sWy0xNSwtNTE3XSxbLTE0Myw1OF0sWy00MiwtMzU5XSxbMTE0LC0zMTJdLFstNzgsLTcxXSxbLTExMiwzNzRdLFstODIsNzU1XSxbNTYsNDcyXSxbOTIsMjE1XV0sW1s4NDE0Niw1MTA5N10sWzMxOSwyNV0sWzI3NSw0MjldLFs0OCwtMTMyXSxbLTIyMywtNTg3XSxbLTIwOSwtMTEzXSxbLTI2NywxMTVdLFstNDYzLC0yOV0sWy0yNDMsLTg1XSxbLTM5LC00NDddLFsyNDgsLTUyNl0sWzE1MCwyNjhdLFs1MTgsMjAxXSxbLTIyLC0yNzJdLFstMTIxLDg2XSxbLTEyMSwtMzQ3XSxbLTI0NSwtMjI5XSxbMjYzLC03NTddLFstNTAsLTIwM10sWzI0OSwtNjgyXSxbLTIsLTM4OF0sWy0xNDgsLTE3M10sWy0xMDksMjA3XSxbMTM0LDQ4NF0sWy0yNzMsLTIyOV0sWy02OSwxNjRdLFszNiwyMjhdLFstMjAwLDM0Nl0sWzIxLDU3Nl0sWy0xODYsLTE3OV0sWzI0LC02ODldLFsxMSwtODQ2XSxbLTE3NiwtODVdLFstMTE5LDE3M10sWzc5LDU0NF0sWy00Myw1NzBdLFstMTE3LDRdLFstODYsNDA1XSxbMTE1LDM4N10sWzQwLDQ2OV0sWzEzOSw4OTFdLFs1OCwyNDNdLFsyMzcsNDM5XSxbMjE3LC0xNzRdLFszNTAsLTgyXV0sW1s4MzQxNCw0NDUxOV0sWy0zNjgsNDE0XSxbMjU5LDExNl0sWzE0NiwtMTgwXSxbOTcsLTE4MF0sWy0xNywtMTU5XSxbLTExNywtMTFdXSxbWzgzNzA1LDQ1NTM2XSxbMTg1LDQ1XSxbMjQ5LDIxNl0sWy00MSwtMzI4XSxbLTQxNywtMTY4XSxbLTM3MCw3M10sWzAsMjE2XSxbMjIwLDEyM10sWzE3NCwtMTc3XV0sW1s4Mjg0OSw0NTYzOV0sWzE3Miw0OF0sWzY5LC0yNTFdLFstMzIxLC0xMTldLFstMTkzLC03OV0sWy0xNDksNV0sWzk1LDM0MF0sWzE1Myw1XSxbNzQsMjA5XSxbMTAwLC0xNThdXSxbWzgwMTM0LDQ2Nzg1XSxbMzgsLTIxMF0sWzUzMywtNTldLFs2MSwyNDRdLFs1MTUsLTI4NF0sWzEwMSwtMzgzXSxbNDE3LC0xMDhdLFszNDEsLTM1MV0sWy0zMTcsLTIyNV0sWy0zMDYsMjM4XSxbLTI1MSwtMTZdLFstMjg4LDQ0XSxbLTI2MCwxMDZdLFstMzIyLDIyNV0sWy0yMDQsNTldLFstMTE2LC03NF0sWy01MDYsMjQzXSxbLTQ4LDI1NF0sWy0yNTUsNDRdLFsxOTEsNTY0XSxbMzM3LC0zNV0sWzIyNCwtMjMxXSxbMTE1LC00NV1dLFtbNzg5OTEsNDk5MzldLFs0NywtNDEyXSxbOTcsLTMzMF0sWzIwNCwtNTJdLFsxMzUsLTM3NF0sWy03MCwtNzM1XSxbLTExLC05MTRdLFstMzA4LC0xMl0sWy0yMzQsNDk0XSxbLTM1Niw0ODJdLFstMTE5LDM1OF0sWy0yMTAsNDgxXSxbLTEzOCw0NDNdLFstMjEyLDgyN10sWy0yNDQsNDkzXSxbLTgxLDUwOF0sWy0xMDMsNDYxXSxbLTI1MCwzNzJdLFstMTQ1LDUwNl0sWy0yMDksMzMwXSxbLTI5MCw2NTJdLFstMjQsMzAwXSxbMTc4LC0yNF0sWzQzMCwtMTE0XSxbMjQ2LC01NzddLFsyMTUsLTQwMV0sWzE1MywtMjQ2XSxbMjYzLC02MzVdLFsyODMsLTldLFsyMzMsLTQwNV0sWzE2MSwtNDk1XSxbMjExLC0yNzBdLFstMTExLC00ODJdLFsxNTksLTIwNV0sWzEwMCwtMTVdXSxbWzMwOTM1LDE5NDgxXSxbMTA2LC0yNzRdLFsxMzksLTQ0M10sWzM2MSwtMzU1XSxbMzg5LC0xNDddLFstMTI1LC0yOTZdLFstMjY0LC0yOV0sWy0xNDEsMjA4XV0sW1szMTQwMCwxODE0NV0sWy0xNjgsMTZdLFstMjk3LDFdLFswLDEzMTldXSxbWzMzOTkzLDMyNzI3XSxbLTcwLC00NzNdLFstNzQsLTYwN10sWzMsLTU4OF0sWy02MSwtMTMyXSxbLTIxLC0zODJdXSxbWzMzNzcwLDMwNTQ1XSxbLTE5LC0zMDhdLFszNTMsLTUwNl0sWy0zOCwtNDA4XSxbMTczLC0yNTddLFstMTQsLTI4OV0sWy0yNjcsLTc1N10sWy00MTIsLTMxN10sWy01NTcsLTEyM10sWy0zMDUsNTldLFs1OSwtMzUyXSxbLTU3LC00NDJdLFs1MSwtMjk4XSxbLTE2NywtMjA4XSxbLTI4NCwtODJdLFstMjY3LDIxNl0sWy0xMDgsLTE1NV0sWzM5LC01ODddLFsxODgsLTE3OF0sWzE1MiwxODZdLFs4MiwtMzA3XSxbLTI1NSwtMTgzXSxbLTIyMywtMzY3XSxbLTQxLC01OTVdLFstNjYsLTMxNl0sWy0yNjIsLTJdLFstMjE4LC0zMDJdLFstODAsLTQ0M10sWzI3MywtNDMzXSxbMjY2LC0xMTldLFstOTYsLTUzMV0sWy0zMjgsLTMzM10sWy0xODAsLTY5Ml0sWy0yNTQsLTIzNF0sWy0xMTMsLTI3Nl0sWzg5LC02MTRdLFsxODUsLTM0Ml0sWy0xMTcsMzBdXSxbWzMwOTUyLDE5NjgwXSxbLTI1Nyw5M10sWy02NzIsNzldLFstMTE1LDM0NF0sWzYsNDQzXSxbLTE4NSwtMzhdLFstOTgsMjE0XSxbLTI0LDYyNl0sWzIxMywyNjBdLFs4OCwzNzVdLFstMzMsMjk5XSxbMTQ4LDUwNF0sWzEwMSw3ODJdLFstMzAsMzQ3XSxbMTIyLDExMl0sWy0zMCwyMjNdLFstMTI5LDExOF0sWzkyLDI0OF0sWy0xMjYsMjI0XSxbLTY1LDY4Ml0sWzExMiwxMjBdLFstNDcsNzIwXSxbNjUsNjA1XSxbNzUsNTI3XSxbMTY2LDIxNV0sWy04NCw1NzZdLFstMSw1NDNdLFsyMTAsMzg2XSxbLTcsNDk0XSxbMTU5LDU3Nl0sWzEsNTQ0XSxbLTcyLDEwOF0sWy0xMjgsMTAyMF0sWzE3MSw2MDddLFstMjcsNTcyXSxbMTAwLDUzN10sWzE4Miw1NTVdLFsxOTYsMzY3XSxbLTgzLDIzMl0sWzU4LDE5MF0sWy05LDk4NV0sWzMwMiwyOTFdLFs5Niw2MTRdLFstMzQsMTQ4XV0sW1szMTM1OSwzNzE0N10sWzIzMSw1MzRdLFszNjQsLTE0NF0sWzE2MywtNDI3XSxbMTA5LDQ3NV0sWzMxNiwtMjRdLFs0NSwtMTI3XV0sW1szMjU4NywzNzQzNF0sWzUxMSwtOTY0XSxbMjI3LC04OV0sWzMzOSwtNDM3XSxbMjg2LC0yMzFdLFs0MCwtMjYxXSxbLTI3MywtODk4XSxbMjgwLC0xNjBdLFszMTIsLTkxXSxbMjIwLDk1XSxbMjUyLDQ1M10sWzQ1LDUyMV1dLFtbMzQ4MjYsMzUzNzJdLFsxMzgsMTE0XSxbMTM5LC0zNDFdLFstNiwtNDcyXSxbLTIzNCwtMzI2XSxbLTE4NiwtMjQxXSxbLTMxNCwtNTczXSxbLTM3MCwtODA2XV0sW1szMTQwMCwxODE0NV0sWy05MiwtMjM5XSxbLTIzOCwtMTgzXSxbLTEzNywxOV0sWy0xNjQsNDhdLFstMjAyLDE3N10sWy0yOTEsODZdLFstMzUwLDMzMF0sWy0yODMsMzE3XSxbLTM4Myw2NjJdLFsyMjksLTEyNF0sWzM5MCwtMzk1XSxbMzY5LC0yMTJdLFsxNDMsMjcxXSxbOTAsNDA1XSxbMjU2LDI0NF0sWzE5OCwtNzBdXSxbWzMwNjY5LDQwMTkzXSxbMTM2LC00MDJdLFszNywtNDI2XSxbMTQ2LC0yNTBdLFstODgsLTU3Ml0sWzE1MCwtNjYzXSxbMTA5LC04MTRdLFsyMDAsODFdXSxbWzMwOTUyLDE5NjgwXSxbLTI0Nyw0XSxbLTEzNCwtMTQ1XSxbLTI1MCwtMjEzXSxbLTQ1LC01NTJdLFstMTE4LC0xNF0sWy0zMTMsMTkyXSxbLTMxOCw0MTJdLFstMzQ2LDMzOF0sWy04NywzNzRdLFs3OSwzNDZdLFstMTQwLDM5M10sWy0zNiwxMDA3XSxbMTE5LDU2OF0sWzI5Myw0NTddLFstNDIyLDE3Ml0sWzI2NSw1MjJdLFs5NCw5ODJdLFszMDksLTIwOF0sWzE0NSwxMjI0XSxbLTE4NiwxNTddLFstODcsLTczOF0sWy0xNzUsODNdLFs4Nyw4NDVdLFs5NSwxMDk1XSxbMTI3LDQwNF0sWy04MCw1NzZdLFstMjIsNjY2XSxbMTE3LDE5XSxbMTcwLDk1NF0sWzE5Miw5NDVdLFsxMTgsODgxXSxbLTY0LDg4NV0sWzgzLDQ4N10sWy0zNCw3MzBdLFsxNjMsNzIxXSxbNTAsMTE0M10sWzg5LDEyMjddLFs4NywxMzIxXSxbLTIwLDk2N10sWy01OCw4MzJdXSxbWzMwNDUyLDM5NzM5XSxbMTQzLDE1MV0sWzc0LDMwM11dLFtbNTg1MzgsNDU2NTJdLFstMTA5LDYwXSxbLTM3MywtOTldLFstNzUsLTcxXSxbLTc5LC0zNzddLFs2MiwtMjYxXSxbLTQ5LC02OTldLFstMzQsLTU5M10sWzc1LC0xMDVdLFsxOTQsLTIzMF0sWzc2LDEwN10sWzIzLC02MzddLFstMjEyLDVdLFstMTE0LDMyNV0sWy0xMDMsMjUyXSxbLTIxMyw4Ml0sWy02MiwzMTBdLFstMTcwLC0xODddLFstMjIyLDgzXSxbLTkzLDI2OF0sWy0xNzYsNTVdLFstMTMxLC0xNV0sWy0xNSwxODRdLFstOTYsMTVdXSxbWzU2NjQyLDQ0MTI0XSxbLTEyNywzNV0sWy0xNzIsLTg5XSxbLTEyMSwxNV0sWy02OCwtNTRdLFsxNSw3MDNdLFstOTMsMjE5XSxbLTIxLDM2M10sWzQxLDM1Nl0sWy01NiwyMjhdLFstNSwzNzJdLFstMzM3LC01XSxbMjQsMjEzXSxbLTE0MiwtMl0sWy0xNSwtMTAzXSxbLTE3MiwtMjNdLFstNjksLTM0NF0sWy00MiwtMTQ4XSxbLTE1NCw4M10sWy05MSwtODNdLFstMTg0LC00N10sWy0xMDYsMzA5XSxbLTY0LDE5MV0sWy04MCwzNTRdLFstNjgsNDQwXSxbLTgyMCw4XSxbLTk4LC03MV0sWy04MCwxMV0sWy0xMTUsLTc5XV0sW1s1MzQyMiw0Njk3Nl0sWy0zOSwxODNdXSxbWzUzMzgzLDQ3MTU5XSxbNzEsNjJdLFs5LDI1OF0sWzQ1LDE1Ml0sWzEwMSwxMjRdXSxbWzUzNjA5LDQ3NzU1XSxbNzMsLTYwXSxbOTUsMjI2XSxbMTUyLC02XSxbMTcsLTE2N10sWzEwNCwtMTA1XSxbMTY0LDM3MF0sWzE2MSwyODldLFs3MSwxODldLFstMTAsNDg2XSxbMTIxLDU3NF0sWzEyNywzMDRdLFsxODMsMjg1XSxbMzIsMTg5XSxbNywyMTZdLFs0NSwyMDVdLFstMTQsMzM1XSxbMzQsNTI0XSxbNTUsMzY4XSxbODMsMzE2XSxbMTYsMzU3XV0sW1s1NTEyNSw1MjY1MF0sWzI1LDQxMl0sWzEwOCwzMDBdLFsxNDksMTkwXSxbMjI5LC0yMDBdLFsxNzcsLTIxOF0sWzIwMywtNTldLFsyMDcsLTExNV0sWzgzLDM1N10sWzM4LDQ2XSxbMTI3LC02MF0sWzMwOSwyOTVdLFsxMTAsLTEyNV0sWzkwLDE4XSxbNDEsMTQzXSxbMTA0LDUxXSxbMjA5LC02Ml0sWzE3OCwtMTRdLFs5MSw2M11dLFtbNTc2MDMsNTM2NzJdLFsxNjksLTQ4OF0sWzEyNCwtNzFdLFs3NSw5OV0sWzEyOCwtMzldLFsxNTUsMTI1XSxbNjYsLTI1Ml0sWzI0NCwtMzkzXV0sW1s1ODU2NCw1MjY1M10sWy0xNiwtNjkxXSxbMTExLC04MF0sWy04OSwtMjEwXSxbLTEwNywtMTU3XSxbLTEwNiwtMzA4XSxbLTU5LC0yNzRdLFstMTUsLTQ3NV0sWy02NSwtMjI1XSxbLTIsLTQ0Nl1dLFtbNTgyMTYsNDk3ODddLFstODAsLTE2NV0sWy0xMCwtMzUxXSxbLTM4LC00Nl0sWy0yNiwtMzIzXV0sW1s1ODA2Miw0ODkwMl0sWzcwLC0yNjhdLFsxNywtNzEzXV0sW1s2MTU1MSw0OTU4NV0sWy0xNjUsNDg4XSxbLTMsMjE1Ml0sWzI0Myw2NzBdXSxbWzYxNjI2LDUyODk1XSxbNzYsMTg2XSxbMTc4LDExXSxbMjQ3LDQxN10sWzM2MiwyNl0sWzc4NSwxNzczXV0sW1s2MzI3NCw1NTMwOF0sWzE5NCw0OTNdLFsxMjUsMzYzXSxbMCwzMDhdLFswLDU5Nl0sWzEsMjQ0XSxbMiw5XV0sW1s2MzU5Niw1NzMyMV0sWzg5LDEyXSxbMTI4LDg4XSxbMTQ3LDU5XSxbMTMyLDIwMl0sWzEwNSwyXSxbNiwtMTYzXSxbLTI1LC0zNDRdLFsxLC0zMTBdLFstNTksLTIxNF0sWy03OCwtNjM5XSxbLTEzNCwtNjU5XSxbLTE3MiwtNzU1XSxbLTIzOCwtODY2XSxbLTIzNywtNjYxXSxbLTMyNywtODA2XSxbLTI3OCwtNDc5XSxbLTQxNSwtNTg2XSxbLTI1OSwtNDUwXSxbLTMwNCwtNzE1XSxbLTY0LC0zMTJdLFstNjMsLTE0MF1dLFtbNTk0MTcsNTAwMThdLFstMyw2MjddLFs4MCwyMzldLFsxMzcsMzkxXSxbMTAxLDQzMV0sWy0xMjMsNjc4XSxbLTMyLDI5Nl0sWy0xMzIsNDExXV0sW1s1OTQ0NSw1MzA5MV0sWzE3MSwzNTJdLFsxODgsMzkwXV0sW1s1OTgwNCw1MzgzM10sWzE0NSwtOTldLFswLC0zMzJdLFs5NSwtMTk0XSxbMTkzLDBdLFszNTIsLTUwMl0sWzg3LC02XSxbNjUsMTZdLFs2MiwtNjhdLFsxODUsLTQ3XSxbODIsMjQ3XSxbMjU0LDI0N10sWzExMiwtMjAwXSxbMTkwLDBdXSxbWzYxNTUxLDQ5NTg1XSxbLTE5NSwtMjM2XSxbLTY4LC0yNDZdLFstMTA0LC00NF0sWy00MCwtNDE2XSxbLTg5LC0yMzhdLFstNTQsLTM5M10sWy0xMTIsLTE5NV1dLFtbNTY4MjQsNTU0NDJdLFstMjEyLDI1OF0sWy05NiwxNzBdLFstMTgsMTg0XSxbNDUsMjQ2XSxbLTEsMjQxXSxbLTE2MCwzNjldLFstMzEsMjUzXV0sW1s1NjM1MSw1NzE2M10sWzMsMTQzXSxbLTEwMiwxNzRdLFstMywzNDNdLFstNTgsMjI4XSxbLTk4LC0zNF0sWzI4LDIxN10sWzcyLDI0Nl0sWy0zMiwyNDVdLFs5MiwxODFdLFstNTgsMTM4XSxbNzMsMzY1XSxbMTI3LDQzNV0sWzI0MCwtNDFdLFstMTQsMjM0NV1dLFtbNTY2MjEsNjIxNDhdLFszLDI0OF0sWzMyMCwyXSxbMCwxMTgwXV0sW1s1Njk0NCw2MzU3OF0sWzExMTcsMF0sWzEwNzcsMF0sWzExMDIsMF1dLFtbNjAyNDAsNjM1NzhdLFs5MCwtNTgwXSxbLTYxLC0xMDddLFs0MCwtNjA4XSxbMTAyLC03MDZdLFsxMDYsLTE0NV0sWzE1MiwtMjE5XV0sW1s2MDY2OSw2MTIxM10sWy0xNDEsLTMzN10sWy0yMDQsLTk3XSxbLTg4LC0xODFdLFstMjcsLTM5M10sWy0xMjAsLTg2OF0sWzMwLC0yMzZdXSxbWzYwMTE5LDU5MTAxXSxbLTQ1LC01MDhdLFstMTEyLC01ODJdLFstMTY4LC0yOTNdLFstMTE5LC00NTFdLFstMjgsLTI0MV0sWy0xMzIsLTE2Nl0sWy04MiwtNjE4XSxbNCwtNTMxXV0sW1s1OTQzNyw1NTcxMV0sWy0zLDQ2MF0sWy0zOSwxMl0sWzUsMjk0XSxbLTMzLDIwM10sWy0xNDMsMjMzXSxbLTM0LDQyNl0sWzM0LDQzNl0sWy0xMjksNDFdLFstMTksLTEzMl0sWy0xNjcsLTMwXSxbNjcsLTE3M10sWzIzLC0zNTVdLFstMTUyLC0zMjRdLFstMTM4LC00MjZdLFstMTQ0LC02MV0sWy0yMzMsMzQ1XSxbLTEwNSwtMTIyXSxbLTI5LC0xNzJdLFstMTQzLC0xMTJdLFstOSwtMTIyXSxbLTI3NywwXSxbLTM4LDEyMl0sWy0yMDAsMjBdLFstMTAwLC0xMDFdLFstNzcsNTFdLFstMTQzLDM0NF0sWy00OCwxNjNdLFstMjAwLC04MV0sWy03NiwtMjc0XSxbLTcyLC01MjhdLFstOTUsLTExMV0sWy04NSwtNjVdLFsxODksLTIzMF1dLFtbNTYzNTEsNTcxNjNdLFstMTc2LC0xMDFdLFstMTQxLC0yMzldLFstMjAxLC02NDVdLFstMjYxLC0yNzNdLFstMjY5LDM2XSxbLTc4LC01NF0sWzI4LC0yMDhdLFstMTQ1LC0yMDddLFstMTE4LC0yMzBdLFstMzUwLC0yMjZdLFstNjksMTM0XSxbLTQ2LDExXSxbLTUyLC0xNTJdLFstMjI5LC00NF1dLFtbNTQyNDQsNTQ5NjVdLFs0MywxNjBdLFstODcsNDA3XSxbLTM5LDI0NV0sWy0xMjEsMTAwXSxbLTE2NCwzNDVdLFs2MCwyNzldLFsxMjcsLTYwXSxbNzgsNDJdLFsxNTUsLTZdLFstMTUxLDUzN10sWzEwLDM5M10sWy0xOCwzOTJdLFstMTExLDM3OF1dLFtbNTQwMjYsNTgxNzddLFsyOCwyNzldLFstMTc4LDEzXSxbMCwzODBdLFstMTE1LDIxOV0sWzEyMCw3NzhdLFszNTQsNTU3XSxbMTUsNzY5XSxbMTA3LDExOTldLFs2MCwyNTRdLFstMTE2LDIwM10sWy00LDE4OF0sWy0xMDQsMTUzXSxbLTY4LDkxOV1dLFtbNTQxMjUsNjQwODhdLFsyODAsMzIzXSxbMTEwOCwtMTEzMl0sWzExMDgsLTExMzFdXSxbWzMwMDgwLDYyMjI3XSxbMjQsLTMyMV0sWy0yMSwtMjI4XSxbLTY4LC05OV0sWzcxLC0xNzddLFstNSwtMTYxXV0sW1szMDA4MSw2MTI0MV0sWy0xODUsMTAwXSxbLTEzMSwtNDFdLFstMTY5LDQzXSxbLTEzMCwtMTEwXSxbLTE0OSwxODRdLFsyNCwxOTBdLFsyNTYsLTgyXSxbMjEwLC00N10sWzEwMCwxMzFdLFstMTI3LDI1Nl0sWzIsMjI2XSxbLTE3NSw5Ml0sWzYyLDE2M10sWzE3MCwtMjZdLFsyNDEsLTkzXV0sW1szMDA4MCw2MjIyN10sWzM0LDEwMV0sWzIxNywtM10sWzE2NSwtMTUyXSxbNzMsMTVdLFs1MCwtMjA5XSxbMTUyLDExXSxbLTksLTE3Nl0sWzEyNCwtMjFdLFsxMzYsLTIxN10sWy0xMDMsLTI0MF0sWy0xMzIsMTI4XSxbLTEyNywtMjVdLFstOTIsMjhdLFstNTAsLTEwN10sWy0xMDYsLTM3XSxbLTQzLDE0NF0sWy05MiwtODVdLFstMTExLC00MDVdLFstNzEsOTRdLFstMTQsMTcwXV0sW1s3NjA0OSw5ODQ1MV0sWzYwMCwxMzNdLFs1NDAsLTI5N10sWzY0MCwtNTcyXSxbLTY5LC01MzFdLFstNjA2LC03M10sWy03NzMsMTcwXSxbLTQ2MiwyMjZdLFstMjEzLDQyM10sWy0zNzksMTE3XSxbNzIyLDQwNF1dLFtbNzg1NjUsOTc0MjFdLFs3MDQsLTMzNl0sWy04MiwtMjQwXSxbLTE1NjYsLTIyOF0sWzUwNyw3NzZdLFsyMjksNjZdLFsyMDgsLTM4XV0sW1s4ODU2Myw5NTU2M10sWzczNCwtMjZdLFsxMDA0LC0zMTNdLFstMjE5LC00MzldLFstMTAyMywxNl0sWy00NjEsLTEzOV0sWy01NTAsMzg0XSxbMTQ5LDQwNl0sWzM2NiwxMTFdXSxbWzkxMTcyLDk1MDk2XSxbNjk3LC0xNTVdLFstMzIxLC0yMzRdLFstNDQ0LDUzXSxbLTUxNiwyMzNdLFs2NiwxOTJdLFs1MTgsLTg5XV0sW1s4ODg1MCw5MzkyOF0sWzI2MywyMzRdLFszNDgsNTRdLFszOTQsLTIyNl0sWzM0LC0xNTVdLFstNDIxLC00XSxbLTU2OSw2Nl0sWy00OSwzMV1dLFtbNjI0NTcsOTgxOTRdLFs1NDIsMTA3XSxbNDIyLDhdLFs1NywtMTYwXSxbMTU5LDE0Ml0sWzI2Miw5N10sWzQxMiwtMTI5XSxbLTEwNywtOTBdLFstMzczLC03OF0sWy0yNTAsLTQ1XSxbLTM5LC05N10sWy0zMjQsLTk4XSxbLTMwMSwxNDBdLFsxNTgsMTg1XSxbLTYxOCwxOF1dLFtbNTYzMTQsODI2NzhdLFstNTExLC05XSxbLTM0Miw2N11dLFtbNTU0NjEsODI3MzZdLFs2MywyNjBdLFszODMsMTkxXV0sW1s1NTkwNyw4MzE4N10sWzI5MSwtMTAzXSxbMTIzLC05NF0sWy0zMCwtMTYyXSxbMjMsLTE1MF1dLFtbNjQ4NjMsOTQxNTNdLFs2NjUsNTE4XSxbLTc1LDI2OF0sWzYyMSwzMTJdLFs5MTcsMzgwXSxbOTI1LDExMF0sWzQ3NSwyMjBdLFs1NDEsNzZdLFsxOTMsLTIzM10sWy0xODcsLTE4NF0sWy05ODQsLTI5M10sWy04NDgsLTI4Ml0sWy04NjMsLTU2Ml0sWy00MTQsLTU3N10sWy00MzUsLTU2OF0sWzU2LC00OTFdLFs1MzEsLTQ4NF0sWy0xNjQsLTUyXSxbLTkwNyw3N10sWy03NCwyNjJdLFstNTAzLDE1OF0sWy00MCwzMjBdLFsyODQsMTI2XSxbLTEwLDMyM10sWzU1MSw1MDNdLFstMjU1LDczXV0sW1s4OTY5OCw4MjMwOV0sWzk2LC01NjldLFstNywtNTgxXSxbMTE0LC01OTddLFsyODAsLTEwNDZdLFstNDExLDE5NV0sWy0xNzEsLTg1NF0sWzI3MSwtNjA1XSxbLTgsLTQxM10sWy0yMTEsMzU2XSxbLTE4MiwtNDU3XSxbLTUxLDQ5Nl0sWzMxLDU3NV0sWy0zMiw2MzhdLFs2NCw0NDZdLFsxMyw3OTBdLFstMTYzLDU4MV0sWzI0LDgwOF0sWzI1NywyNzFdLFstMTEwLDI3NF0sWzEyMyw4M10sWzczLC0zOTFdXSxbWzg2MzI3LDc1NTI0XSxbLTM5LDEwNF1dLFtbODYyODgsNzU2MjhdLFstMiwzMDBdLFsxNDIsMTZdLFs0MCw2OThdLFstNzMsNTA2XSxbMjM4LDIwOF0sWzMzOCwtMTA0XSxbMTg2LDU3NV0sWzk2LDY0N10sWzEwNywyMTZdLFsxNDYsNTMyXSxbLTQ1OSwtMTc1XSxbLTI0MCwtMjMzXSxbLTQyMywxXSxbLTExMiw1NTVdLFstMzI5LDQyMF0sWy00ODMsMTg5XSxbLTEwMyw1NzldLFstOTcsMzYzXSxbLTEwNCwyNTRdLFstMTcyLDU5Nl0sWy0yNDQsMjE3XSxbLTQxNSwxNzZdLFstMzY5LC0xNl0sWy0zNDUsLTEwNl0sWy0yMjksLTI5NF0sWzE1MiwtMTQxXSxbNCwtMzI2XSxbLTE1NSwtMTg5XSxbLTI1MSwtNjI3XSxbMywtMjYwXSxbLTM5MiwtMzczXSxbLTMzMywyMjNdXSxbWzgyNDEwLDgwMDU1XSxbLTMzMSwtNDldLFstMTQ2LDE5OF0sWy0xNjYsNjNdLFstNDA3LC00MTZdLFstMzY2LC05OF0sWy0yNTUsLTE0Nl0sWy0zNTAsOTZdLFstMjU4LC02XSxbLTE2OCwzMDJdLFstMjcyLDI4NF0sWy0yNzksNzhdLFstMzUxLC03OF0sWy0yNjMsLTEwOV0sWy0zOTQsMjQ4XSxbLTUzLDQ0M10sWy0zMjcsMTUyXSxbLTI1Miw2OV0sWy0zMTEsMjQ0XSxbLTI4OCwtNjEyXSxbMTEzLC0zNDhdLFstMjcwLC00MTFdLFstNDAyLDE0OF0sWy0yNzcsMjJdLFstMTg2LDI3Nl0sWy0yODksOF0sWy0yNDIsMTgyXSxbLTQyMywtMjc4XSxbLTUzMCwtNTA5XSxbLTI5MiwtMTAyXV0sW1s3NDM3NSw3OTcwNl0sWy0xMDksLTQ5XV0sW1s2MzYzOSw3Nzk5M10sWy0xMjcsLTM1MF0sWy0yNjksLTk3XSxbLTI3NiwtNjEwXSxbMjUyLC01NjFdLFstMjcsLTM5OF0sWzMwMywtNjk2XV0sW1s2MzQ5NSw3NTI4MV0sWy0xNjYsLTIzOF0sWy00OCwtMTUwXSxbLTEyMiw0MF0sWy0xOTEsMzU5XSxbLTc4LDIwXV0sW1s2Mjg5MCw3NTMxMl0sWy0xNzUsMTM3XSxbLTg1LDI0Ml0sWy0yNTksMTI0XSxbLTE2OSwtOTNdLFstNDgsMTEwXSxbLTM3OCwyODNdLFstNDA5LDk2XSxbLTIzNSwxMDFdLFstMzQsLTcwXV0sW1s2MTA5OCw3NjI0Ml0sWy0zNTQsNDk5XSxbLTMxNywyMjNdLFstMjQwLDM0N10sWzIwMiw5NV0sWzIzMSw0OTRdLFstMTU2LDIzNF0sWzQxMCwyNDFdLFstOCwxMjldLFstMjQ5LC05NV1dLFtbNjA2MTcsNzg0MDldLFs5LDI2Ml0sWzE0MywxNjVdLFsyNjksNDNdLFs0NCwxOTddLFstNjIsMzI2XSxbMTEzLDMxMF0sWy0zLDE3M10sWy00MTAsMTkyXSxbLTE2MiwtNl0sWy0xNzIsMjc3XSxbLTIxMywtOTRdLFstMzUyLDIwOF0sWzYsMTE2XSxbLTk5LDI1Nl0sWy0yMjIsMjldLFstMjMsMTgzXSxbNzAsMTIwXSxbLTE3OCwzMzRdLFstMjg4LC01N10sWy04NCwzMF0sWy03MCwtMTM0XSxbLTEwNCwyM11dLFtbNTg4MjksODEzNjJdLFstNjgsMzc5XSxbLTY2LDE5Nl0sWzU0LDU1XSxbMjI0LC0yMF0sWzEwOCwxMjldLFstODAsMTU3XSxbLTE4NywxMDRdLFsxNiwxMDddLFstMTEzLDEwOF0sWy0xNzQsMzg3XSxbNjAsMTU5XSxbLTI3LDI3N10sWy0yNzIsMTQxXSxbLTE0NiwtNzBdLFstMzksMTQ2XSxbLTI5MywxNDldXSxbWzU3ODI2LDgzNzY2XSxbLTg5LDM0OF0sWy0yNCwyODddLFstMTM0LDEzNl1dLFtbNTc1NzksODQ1MzddLFsxMjAsMTg3XSxbLTgzLDU1MV0sWzE5OCwzNDFdLFstNDIsMTAzXV0sW1s1Nzc3Miw4NTcxOV0sWzMxNiwzMjddLFstMjkxLDI4MF1dLFtbNTc3OTcsODYzMjZdLFs1OTQsNzU1XSxbMjU4LDM0MV0sWzEwNSwzMDFdLFstNDExLDQwNV0sWzExMywzODVdLFstMjUwLDQ0MF0sWzE4Nyw1MDZdLFstMzIzLDY3M10sWzI1Niw0NDVdLFstNDI1LDM5NF0sWzQxLDQxNF1dLFtbNTc5NDIsOTEzODVdLFsyMjQsNTRdLFs0NzMsMjM3XV0sW1s1ODYzOSw5MTY3Nl0sWzI4NiwyMDZdLFs0NTYsLTM1OF0sWzc2MSwtMTQwXSxbMTA1MCwtNjY4XSxbMjEzLC0yODFdLFsxOCwtMzkzXSxbLTMwOCwtMzExXSxbLTQ1NCwtMTU3XSxbLTEyNDAsNDQ5XSxbLTIwNCwtNzVdLFs0NTMsLTQzM10sWzE4LC0yNzRdLFsxOCwtNjA0XSxbMzU4LC0xODBdLFsyMTcsLTE1M10sWzM2LDI4Nl0sWy0xNjgsMjU0XSxbMTc3LDIyNF0sWzY3MiwtMzY4XSxbMjMzLDE0NF0sWy0xODYsNDMzXSxbNjQ3LDU3OF0sWzI1NiwtMzRdLFsyNjAsLTIwNl0sWzE2MSw0MDZdLFstMjMxLDM1Ml0sWzEzNiwzNTNdLFstMjA0LDM2N10sWzc3NywtMTkwXSxbMTU4LC0zMzFdLFstMzUxLC03M10sWzEsLTMyOF0sWzIxOSwtMjAzXSxbNDI5LDEyOF0sWzY4LDM3N10sWzU4MCwyODJdLFs5NzAsNTA3XSxbMjA5LC0yOV0sWy0yNzMsLTM1OV0sWzM0NCwtNjFdLFsxOTksMjAyXSxbNTIxLDE2XSxbNDEyLDI0NV0sWzMxNywtMzU2XSxbMzE1LDM5MV0sWy0yOTEsMzQzXSxbMTQ1LDE5NV0sWzgyMCwtMTc5XSxbMzg1LC0xODVdLFsxMDA2LC02NzVdLFsxODYsMzA5XSxbLTI4MiwzMTNdLFstOCwxMjVdLFstMzM1LDU4XSxbOTIsMjgwXSxbLTE0OSw0NjFdLFstOCwxODldLFs1MTIsNTM1XSxbMTgzLDUzN10sWzIwNiwxMTZdLFs3MzYsLTE1Nl0sWzU3LC0zMjhdLFstMjYzLC00NzldLFsxNzMsLTE4OV0sWzg5LC00MTNdLFstNjMsLTgwOV0sWzMwNywtMzYyXSxbLTEyMCwtMzk1XSxbLTU0NCwtODM5XSxbMzE4LC04N10sWzExMCwyMTNdLFszMDYsMTUxXSxbNzQsMjkzXSxbMjQwLDI4MV0sWy0xNjIsMzM2XSxbMTMwLDM5MF0sWy0zMDQsNDldLFstNjcsMzI4XSxbMjIyLDU5M10sWy0zNjEsNDgyXSxbNDk3LDM5OF0sWy02NCw0MjFdLFsxMzksMTNdLFsxNDUsLTMyOF0sWy0xMDksLTU3MF0sWzI5NywtMTA4XSxbLTEyNyw0MjZdLFs0NjUsMjMzXSxbNTc3LDMxXSxbNTEzLC0zMzddLFstMjQ3LDQ5Ml0sWy0yOCw2MzBdLFs0ODMsMTE5XSxbNjY5LC0yNl0sWzYwMiw3N10sWy0yMjYsMzA5XSxbMzIxLDM4OF0sWzMxOSwxNl0sWzU0MCwyOTNdLFs3MzQsNzldLFs5MywxNjJdLFs3MjksNTVdLFsyMjcsLTEzM10sWzYyNCwzMTRdLFs1MTAsLTEwXSxbNzcsMjU1XSxbMjY1LDI1Ml0sWzY1NiwyNDJdLFs0NzYsLTE5MV0sWy0zNzgsLTE0Nl0sWzYyOSwtOTBdLFs3NSwtMjkyXSxbMjU0LDE0M10sWzgxMiwtN10sWzYyNiwtMjg5XSxbMjIzLC0yMjFdLFstNjksLTMwN10sWy0zMDcsLTE3NV0sWy03MzAsLTMyOF0sWy0yMDksLTE3NV0sWzM0NSwtODNdLFs0MTAsLTE0OV0sWzI1MSwxMTJdLFsxNDEsLTM3OV0sWzEyMiwxNTNdLFs0NDQsOTNdLFs4OTIsLTk3XSxbNjcsLTI3Nl0sWzExNjIsLTg4XSxbMTUsNDUxXSxbNTkwLC0xMDRdLFs0NDMsNF0sWzQ0OSwtMzEyXSxbMTI4LC0zNzhdLFstMTY1LC0yNDddLFszNDksLTQ2NV0sWzQzNywtMjQwXSxbMjY4LDYyMF0sWzQ0NiwtMjY2XSxbNDczLDE1OV0sWzUzOCwtMTgyXSxbMjA0LDE2Nl0sWzQ1NSwtODNdLFstMjAxLDU0OV0sWzM2NywyNTZdLFsyNTA5LC0zODRdLFsyMzYsLTM1MV0sWzcyNywtNDUxXSxbMTEyMiwxMTJdLFs1NTMsLTk4XSxbMjMxLC0yNDRdLFstMzMsLTQzMl0sWzM0MiwtMTY4XSxbMzcyLDEyMV0sWzQ5MiwxNV0sWzUyNSwtMTE2XSxbNTI2LDY2XSxbNDg0LC01MjZdLFszNDQsMTg5XSxbLTIyNCwzNzhdLFsxMjMsMjYyXSxbODg2LC0xNjVdLFs1NzgsMzZdLFs3OTksLTI4Ml0sWy05OTYxMCwtMjU4XSxbNjgxLC00NTFdLFs3MjgsLTU4OF0sWy0yNCwtMzY3XSxbMTg3LC0xNDddLFstNjQsNDI5XSxbNzU0LC04OF0sWzU0NCwtNTUzXSxbLTI3NiwtMjU3XSxbLTQ1NSwtNjFdLFstNywtNTc4XSxbLTExMSwtMTIyXSxbLTI2MCwxN10sWy0yMTIsMjA2XSxbLTM2OSwxNzJdLFstNjIsMjU3XSxbLTI4Myw5Nl0sWy0zMTUsLTc2XSxbLTE1MSwyMDddLFs2MCwyMTldLFstMzMzLC0xNDBdLFsxMjYsLTI3OF0sWy0xNTgsLTI1MV0sWzk5OTk3LC0zXSxbLTM1NywtMjYwXSxbLTM2MCw0NF0sWzI1MCwtMzE1XSxbMTY2LC00ODddLFsxMjgsLTE1OV0sWzMyLC0yNDRdLFstNzEsLTE1N10sWy01MTgsMTI5XSxbLTc3NywtNDQ1XSxbLTI0NywtNjldLFstNDI1LC00MTVdLFstNDAzLC0zNjJdLFstMTAyLC0yNjldLFstMzk3LDQwOV0sWy03MjQsLTQ2NF0sWy0xMjYsMjE5XSxbLTI2OCwtMjUzXSxbLTM3MSw4MV0sWy05MCwtMzg4XSxbLTMzMywtNTcyXSxbMTAsLTIzOV0sWzMxNiwtMTMyXSxbLTM3LC04NjBdLFstMjU4LC0yMl0sWy0xMTksLTQ5NF0sWzExNiwtMjU1XSxbLTQ4NiwtMzAyXSxbLTk2LC02NzRdLFstNDE1LC0xNDRdLFstODMsLTYwMF0sWy00MDAsLTU1MV0sWy0xMDMsNDA3XSxbLTExOSw4NjJdLFstMTU1LDEzMTNdLFsxMzQsODE5XSxbMjM0LDM1M10sWzE0LDI3Nl0sWzQzMiwxMzJdLFs0OTYsNzQ0XSxbNDc5LDYwOF0sWzQ5OSw0NzFdLFsyMjMsODMzXSxbLTMzNywtNTBdLFstMTY3LC00ODddLFstNzA1LC02NDldLFstMjI3LDcyN10sWy03MTcsLTIwMV0sWy02OTYsLTk5MF0sWzIzMCwtMzYyXSxbLTYyMCwtMTU0XSxbLTQzMCwtNjFdLFsyMCw0MjddLFstNDMxLDkwXSxbLTM0NCwtMjkxXSxbLTg1MCwxMDJdLFstOTE0LC0xNzVdLFstODk5LC0xMTUzXSxbLTEwNjUsLTEzOTRdLFs0MzgsLTc0XSxbMTM2LC0zNzBdLFsyNzAsLTEzMl0sWzE3OCwyOTVdLFszMDUsLTM4XSxbNDAxLC02NTBdLFs5LC01MDNdLFstMjE3LC01OTBdLFstMjMsLTcwNV0sWy0xMjYsLTk0NV0sWy00MTgsLTg1NV0sWy05NCwtNDA5XSxbLTM3NywtNjg4XSxbLTM3NCwtNjgyXSxbLTE3OSwtMzQ5XSxbLTM3MCwtMzQ2XSxbLTE3NSwtOF0sWy0xNzUsMjg3XSxbLTM3MywtNDMyXSxbLTQzLC0xOTddXSxbWzAsOTI4MzNdLFszNiwyNF0sWzIzNSwtMV0sWzQwMiwtMTY5XSxbLTI0LC04MV0sWy0yODYsLTE0MV0sWy0zNjMsLTM2XSxbOTk2OTQsLTMwXSxbLTQ5LDE4N10sWy05OTY0NSwyNDddXSxbWzU5Mjg3LDc3NzQxXSxbNzMsMTQ2XSxbMTk4LC0xMjddLFs4OSwtMjNdLFszNiwtMTE3XSxbNDIsLTE4XV0sW1s1OTcyNSw3NzYwMl0sWzIsLTUxXSxbMTM2LC0xNDJdLFsyODQsMzVdLFstNTUsLTIxMF0sWy0zMDQsLTEwM10sWy0zNzcsLTM0Ml0sWy0xNTQsMTIxXSxbNjEsMjc3XSxbLTMwNCwxNzNdLFs1MCwxMTNdLFsyNjUsMTk3XSxbLTQyLDcxXV0sW1syODA2MSw2NjQwOF0sWzEzMCw0N10sWzE4NCwtMThdLFs4LC0xNTNdLFstMzAzLC05NV0sWy0xOSwyMTldXSxbWzI4MzkxLDY2NTU1XSxbMjIwLC0yNjVdLFstNDgsLTQyMF0sWy01MSw3NV0sWzQsMzA5XSxbLTEyNCwyMzRdLFstMSw2N11dLFtbMjgyODAsNjU0NzRdLFs4NCwtMjNdLFs5NywtNDkxXSxbMSwtMzQzXSxbLTY4LC0yOV0sWy03MCwzNDBdLFstMTA0LDE3MV0sWzYwLDM3NV1dLFtbMzMwMDAsMTk5NDZdLFszMzMsMzU0XSxbMjM2LC0xNDhdLFsxNjcsMjM3XSxbMjIyLC0yNjZdLFstODMsLTIwN10sWy0zNzUsLTE3N10sWy0xMjUsMjA3XSxbLTIzNiwtMjY2XSxbLTEzOSwyNjZdXSxbWzU0MjA2LDk3NjUzXSxbMTA1LDIwMl0sWzQwOCwyMF0sWzM1MCwtMjA2XSxbOTE1LC00NDBdLFstNjk5LC0yMzNdLFstMTU1LC00MzVdLFstMjQzLC0xMTFdLFstMTMyLC00OTBdLFstMzM1LC0yM10sWy01OTgsMzYxXSxbMjUyLDIxMF0sWy00MTYsMTcwXSxbLTU0MSw0OTldLFstMjE2LDQ2M10sWzc1NywyMTJdLFsxNTIsLTIwN10sWzM5Niw4XV0sW1s1Nzk0Miw5MTM4NV0sWzExNyw0MTRdLFstMzU2LDIzNV0sWy00MzEsLTIwMF0sWy0xMzcsLTQzM10sWy0yNjUsLTI2Ml0sWy0yOTgsMTQzXSxbLTM2MiwtMjldLFstMzA5LDMxMl0sWy0xNjcsLTE1Nl1dLFtbNTU3MzQsOTE0MDldLFstMTcyLC0yNF0sWy00MSwtMzg5XSxbLTUyMyw5NV0sWy03NCwtMzI5XSxbLTI2NywyXSxbLTE4MywtNDIxXSxbLTI3OCwtNjU1XSxbLTQzMSwtODMxXSxbMTAxLC0yMDJdLFstOTcsLTIzNF0sWy0yNzUsMTBdLFstMTgwLC01NTRdLFsxNywtNzg0XSxbMTc3LC0zMDBdLFstOTIsLTY5NF0sWy0yMzEsLTQwNV0sWy0xMjIsLTM0MV1dLFtbNTMwNjMsODUzNTNdLFstMTg3LDM2M10sWy01NDgsLTY4NF0sWy0zNzEsLTEzOF0sWy0zODQsMzAxXSxbLTk5LDYzNV0sWy04OCwxMzYzXSxbMjU2LDM4MV0sWzczMyw0OTZdLFs1NDksNjA5XSxbNTA4LDgyNF0sWzY2OCwxMTQxXSxbNDY1LDQ0NF0sWzc2Myw3NDFdLFs2MTAsMjU5XSxbNDU3LC0zMV0sWzQyMyw0ODldLFs1MDYsLTI2XSxbNDk5LDExOF0sWzg2OSwtNDMzXSxbLTM1OCwtMTU4XSxbMzA1LC0zNzFdXSxbWzU3NjEzLDk3ODc5XSxbLTQxMiwtMzE4XSxbLTgwNiwtNzBdLFstODE5LDk4XSxbLTUwLDE2M10sWy0zOTgsMTFdLFstMzA0LDI3MV0sWzg1OCwxNjVdLFs0MDMsLTE0Ml0sWzI4MSwxNzddLFs3MDIsLTE0OF0sWzU0NSwtMjA3XV0sW1s1Njg2Nyw5NjU3N10sWy02MjAsLTI0MV0sWy00OTAsMTM3XSxbMTkxLDE1Ml0sWy0xNjcsMTg5XSxbNTc1LDExOV0sWzExMCwtMjIyXSxbNDAxLC0xMzRdXSxbWzM3MDEwLDk5Mzk4XSxbOTMyLDM1M10sWzk3NSwtMjddLFszNTQsMjE4XSxbOTgyLDU3XSxbMjIxOSwtNzRdLFsxNzM3LC00NjldLFstNTEzLC0yMjddLFstMTA2MiwtMjZdLFstMTQ5NiwtNThdLFsxNDAsLTEwNV0sWzk4NCw2NV0sWzgzNiwtMjA0XSxbNTQwLDE4MV0sWzIzMSwtMjEyXSxbLTMwNSwtMzQ0XSxbNzA3LDIyMF0sWzEzNDgsMjI5XSxbODMzLC0xMTRdLFsxNTYsLTI1M10sWy0xMTMyLC00MjBdLFstMTU3LC0xMzZdLFstODg4LC0xMDJdLFs2NDMsLTI4XSxbLTMyNCwtNDMxXSxbLTIyNCwtMzgzXSxbOSwtNjU4XSxbMzMzLC0zODZdLFstNDM0LC0yNF0sWy00NTcsLTE4N10sWzUxMywtMzEzXSxbNjUsLTUwMl0sWy0yOTcsLTU1XSxbMzYwLC01MDhdLFstNjE3LC00Ml0sWzMyMiwtMjQxXSxbLTkxLC0yMDhdLFstMzkxLC05MV0sWy0zODgsLTJdLFszNDgsLTQwMF0sWzQsLTI2M10sWy01NDksMjQ0XSxbLTE0MywtMTU4XSxbMzc1LC0xNDhdLFszNjQsLTM2MV0sWzEwNSwtNDc2XSxbLTQ5NSwtMTE0XSxbLTIxNCwyMjhdLFstMzQ0LDM0MF0sWzk1LC00MDFdLFstMzIyLC0zMTFdLFs3MzIsLTI1XSxbMzgzLC0zMl0sWy03NDUsLTUxNV0sWy03NTUsLTQ2Nl0sWy04MTMsLTIwNF0sWy0zMDYsLTJdLFstMjg4LC0yMjhdLFstMzg2LC02MjRdLFstNTk3LC00MTRdLFstMTkyLC0yNF0sWy0zNzAsLTE0NV0sWy0zOTksLTEzOF0sWy0yMzgsLTM2NV0sWy00LC00MTVdLFstMTQxLC0zODhdLFstNDUzLC00NzJdLFsxMTIsLTQ2Ml0sWy0xMjUsLTQ4OF0sWy0xNDIsLTU3N10sWy0zOTEsLTM2XSxbLTQxMCw0ODJdLFstNTU2LDNdLFstMjY5LDMyNF0sWy0xODYsNTc3XSxbLTQ4MSw3MzVdLFstMTQxLDM4NV0sWy0zOCw1MzBdLFstMzg0LDU0Nl0sWzEwMCw0MzVdLFstMTg2LDIwOF0sWzI3NSw2OTFdLFs0MTgsMjIwXSxbMTEwLDI0N10sWzU4LDQ2MV0sWy0zMTgsLTIwOV0sWy0xNTEsLTg4XSxbLTI0OSwtODRdLFstMzQxLDE5M10sWy0xOSw0MDFdLFsxMDksMzE0XSxbMjU4LDldLFs1NjcsLTE1N10sWy00NzgsMzc1XSxbLTI0OSwyMDJdLFstMjc2LC04M10sWy0yMzIsMTQ3XSxbMzEwLDU1MF0sWy0xNjksMjIwXSxbLTIyMCw0MDldLFstMzM1LDYyNl0sWy0zNTMsMjMwXSxbMywyNDddLFstNzQ1LDM0Nl0sWy01OTAsNDNdLFstNzQzLC0yNF0sWy02NzcsLTQ0XSxbLTMyMywxODhdLFstNDgyLDM3Ml0sWzcyOSwxODZdLFs1NTksMzFdLFstMTE4OCwxNTRdLFstNjI3LDI0MV0sWzM5LDIyOV0sWzEwNTEsMjg1XSxbMTAxOCwyODRdLFsxMDcsMjE0XSxbLTc1MCwyMTNdLFsyNDMsMjM1XSxbOTYxLDQxM10sWzQwNCw2M10sWy0xMTUsMjY1XSxbNjU4LDE1Nl0sWzg1NCw5M10sWzg1Myw1XSxbMzAzLC0xODRdLFs3MzcsMzI1XSxbNjYzLC0yMjFdLFszOTAsLTQ2XSxbNTc3LC0xOTJdLFstNjYwLDMxOF0sWzM4LDI1M11dLFtbNjkxNDgsMjE4NTFdLFsxNzksLTE4Nl0sWzI2MywtNzRdLFs5LC0xMTJdLFstNzcsLTI2OV0sWy00MjcsLTM4XSxbLTcsMzE0XSxbNDEsMjQ0XSxbMTksMTIxXV0sW1s4NDcxMyw0NTMyNl0sWzMyLDEzOV0sWzIzOSwxMzNdLFsxOTQsMjBdLFs4Nyw3NF0sWzEwNSwtNzRdLFstMTAyLC0xNjBdLFstMjg5LC0yNThdLFstMjMzLC0xNzBdXSxbWzU0NTQwLDMzNjk2XSxbMTMzLDI5Ml0sWzEwOSwtMTYyXSxbNDcsLTI1Ml0sWzEyNSwtNDNdLFsxNzUsLTExMl0sWzE0OSw0M10sWzI0OCwzMDJdLFswLDIxODJdXSxbWzU1NTI2LDM1OTQ2XSxbNzUsLTg4XSxbMTY1LC01NjJdLFstMjYsLTM2MF0sWzYyLC0yMDddLFsxOTksNjBdLFsxMzksMjY0XSxbMTMyLDE3N10sWzY4LDI4M10sWzEzNSwxMzddLFsxMTcsLTcxXSxbMTMzLC0xNjZdLFsyMjYsLTI5XSxbMTc4LDEzOF0sWzI4LDE4NF0sWzQ4LDI4M10sWzE1Miw0N10sWzgzLDIyMl0sWzkzLDM5M10sWzI0OSw0NDJdLFszOTMsNDM1XV0sW1s1ODE3NSwzNzUyOF0sWzExMywtN10sWzEzNCwtMTAwXSxbOTQsNzFdLFsxNDgsLTU5XV0sW1s1ODY2NCwzNzQzM10sWzEzMywtODMyXSxbNzIsLTQxOV0sWy00OSwtNjU5XSxbMjMsLTIxMl1dLFtbNTg4NDMsMzUzMTFdLFstMTQwLDEwOF0sWy04MCwtNDJdLFstMjYsLTE3Ml0sWy03NiwtMjIyXSxbMiwtMjA0XSxbMTY2LC0zMjBdLFsxNjMsNjNdLFs1NiwyNjNdXSxbWzU4OTA4LDM0Nzg1XSxbMjExLC01XV0sW1s1OTExOSwzNDc4MF0sWy03MCwtNDMwXSxbLTMyLC00OTFdLFstNzIsLTI2N10sWy0xOTAsLTI5OF0sWy01NCwtODZdLFstMTE4LC0zMDBdLFstNzcsLTMwM10sWy0xNTgsLTQyNF0sWy0zMTQsLTYwOV0sWy0xOTYsLTM1NV0sWy0yMTAsLTI2OV0sWy0yOTAsLTIyOV0sWy0xNDEsLTMxXSxbLTM2LC0xNjRdLFstMTY5LDg4XSxbLTEzOCwtMTEzXSxbLTMwMSwxMTRdLFstMTY4LC03Ml0sWy0xMTUsMzFdLFstMjg2LC0yMzNdLFstMjM4LC05NF0sWy0xNzEsLTIyM10sWy0xMjcsLTE0XSxbLTExNywyMTBdLFstOTQsMTFdLFstMTIwLDI2NF0sWy0xMywtODJdLFstMzcsMTU5XSxbMiwzNDZdLFstOTAsMzk2XSxbODksMTA4XSxbLTcsNDUzXSxbLTE4Miw1NTNdLFstMTM5LDUwMV0sWy0xLDFdLFstMTk5LDc2OF1dLFtbNTgwNDksMzM0NzJdLFstMTIxLDE4Ml0sWy0xMzAsLTEyMF0sWy0xNTEsLTIzMl0sWy0xNDgsLTM3NF0sWzIwOSwtNDU0XSxbOTksNTldLFs1MSwxODhdLFsxNTUsOTNdLFs0NywxOTJdLFs4NSwyODhdLFstOTYsMTc4XV0sW1syMzAxNiw2NTg2NF0sWy0xMDcsLTUxOF0sWy00OSwtNDI2XSxbLTIwLC03OTFdLFstMjcsLTI4OV0sWzQ4LC0zMjJdLFs4NiwtMjg4XSxbNTYsLTQ1OF0sWzE4NCwtNDQwXSxbNjUsLTMzN10sWzEwOSwtMjkxXSxbMjk1LC0xNTddLFsxMTQsLTI0N10sWzI0NCwxNjVdLFsyMTIsNjBdLFsyMDgsMTA2XSxbMTc1LDEwMV0sWzE3NiwyNDFdLFs2NywzNDVdLFsyMiw0OTZdLFs0OCwxNzNdLFsxODgsMTU1XSxbMjk0LDEzN10sWzI0NiwtMjFdLFsxNjksNTBdLFs2NiwtMTI1XSxbLTksLTI4NV0sWy0xNDksLTM1MV0sWy02NiwtMzYwXSxbNTEsLTEwM10sWy00MiwtMjU1XSxbLTY5LC00NjFdLFstNzEsMTUyXSxbLTU4LC0xMF1dLFtbMjU0NzIsNjE1MTBdLFstNTMsLThdLFstOTksLTM1N10sWy01MSw3MF0sWy0zMywtMjddLFsyLC04N11dLFtbMjUyMzgsNjExMDFdLFstMjU3LDddLFstMjU5LC0xXSxbLTEsLTMzM10sWy0xMjUsLTFdLFsxMDMsLTE5OF0sWzEwMywtMTM2XSxbMzEsLTEyOF0sWzQ1LC0zNl0sWy03LC0yMDFdLFstMzU3LC0yXSxbLTEzMywtNDgxXSxbMzksLTExMV0sWy0zMiwtMTM4XSxbLTcsLTE3Ml1dLFtbMjQzODEsNTkxNzBdLFstMzE0LDYzNl0sWy0xNDQsMTkxXSxbLTIyNiwxNTVdLFstMTU2LC00M10sWy0yMjMsLTIyM10sWy0xNDAsLTU4XSxbLTE5NiwxNTZdLFstMjA4LDExMl0sWy0yNjAsMjcxXSxbLTIwOCw4M10sWy0zMTQsMjc1XSxbLTIzMywyODJdLFstNzAsMTU4XSxbLTE1NSwzNV0sWy0yODQsMTg3XSxbLTExNiwyNzBdLFstMjk5LDMzNV0sWy0xMzksMzczXSxbLTY2LDI4OF0sWzkzLDU3XSxbLTI5LDE2OV0sWzY0LDE1M10sWzEsMjA0XSxbLTkzLDI2Nl0sWy0yNSwyMzVdLFstOTQsMjk4XSxbLTI0NCw1ODddLFstMjgwLDQ2Ml0sWy0xMzUsMzY4XSxbLTIzOCwyNDFdLFstNTEsMTQ1XSxbNDIsMzY1XSxbLTE0MiwxMzhdLFstMTY0LDI4N10sWy02OSw0MTJdLFstMTQ5LDQ4XSxbLTE2MiwzMTFdLFstMTMwLDI4OF0sWy0xMiwxODRdLFstMTQ5LDQ0Nl0sWy05OSw0NTJdLFs1LDIyN10sWy0yMDEsMjM0XSxbLTkzLC0yNV0sWy0xNTksMTYzXSxbLTQ0LC0yNDBdLFs0NiwtMjg0XSxbMjcsLTQ0NF0sWzk1LC0yNDNdLFsyMDYsLTQwN10sWzQ2LC0xMzldLFs0MiwtNDJdLFszNywtMjAzXSxbNDksOF0sWzU2LC0zODFdLFs4NSwtMTUwXSxbNTksLTIxMF0sWzE3NCwtMzAwXSxbOTIsLTU1MF0sWzgzLC0yNTldLFs3NywtMjc3XSxbMTUsLTMxMV0sWzEzNCwtMjBdLFsxMTIsLTI2OF0sWzEwMCwtMjY0XSxbLTYsLTEwNl0sWy0xMTcsLTIxN10sWy00OSwzXSxbLTc0LDM1OV0sWy0xODEsMzM3XSxbLTIwMSwyODZdLFstMTQyLDE1MF0sWzksNDMyXSxbLTQyLDMyMF0sWy0xMzIsMTgzXSxbLTE5MSwyNjRdLFstMzcsLTc2XSxbLTcwLDE1NF0sWy0xNzEsMTQzXSxbLTE2NCwzNDNdLFsyMCw0NF0sWzExNSwtMzNdLFsxMDMsMjIxXSxbMTAsMjY2XSxbLTIxNCw0MjJdLFstMTYzLDE2M10sWy0xMDIsMzY5XSxbLTEwMywzODhdLFstMTI5LDQ3Ml0sWy0xMTMsNTMxXV0sW1szMzk5MywzMjcyN10sWzE4MCw2M10sWzI3OSwtNDU3XSxbMTAzLDE4XSxbMjg2LC0zNzldLFsyMTgsLTMyN10sWzE2MCwtNDAyXSxbLTEyMiwtMjgwXSxbNzcsLTMzNF1dLFtbMzUxNzQsMzA2MjldLFstMTIxLC0zNzJdLFstMzEzLC0zMjhdLFstMjA1LDExOF0sWy0xNTEsLTYzXSxbLTI1NiwyNTNdLFstMTg5LC0xOV0sWy0xNjksMzI3XV0sW1szNDgyNiwzNTM3Ml0sWzU0LDM0MV0sWzM4LDM1MF0sWzAsMzI1XSxbLTEwMCwxMDddLFstMTA0LC05Nl0sWy0xMDMsMjZdLFstMzMsMjI4XSxbLTI2LDU0MV0sWy01MiwxNzddLFstMTg3LDE2MF0sWy0xMTQsLTExNl0sWy0yOTMsMTEzXSxbMTgsODAyXSxbLTgyLDMyOV1dLFtbMzM4NDIsMzg2NTldLFs4NywxMjJdLFstMjcsMzM3XSxbNzcsMjU5XSxbNDksNDY1XSxbLTY2LDM2N10sWy0xNTEsMTY2XSxbLTMwLDIzM10sWzQxLDM0Ml0sWy01MzMsMjRdLFstMTA3LDY4OF0sWzgxLDEwXSxbLTMsMjU1XSxbLTU1LDE3Ml0sWy0xMiwzNDJdLFstMTYxLDE3NV0sWy0xNzUsLTZdLFstMTE1LDE3Ml0sWy0xODgsMTE3XSxbLTEwOSwyMjBdLFstMzExLDk4XSxbLTMwMiw1MjldLFsyMywzOTZdLFstMzQsMjI3XSxbMjksNDQzXSxbLTM2MywtMTAwXSxbLTE0NywtMjIyXSxbLTI0MywtMjM5XSxbLTYyLC0xNzldLFstMTQzLC0xM10sWy0yMDYsNTBdXSxbWzMwNjg2LDQ0MTA5XSxbLTE1NywtMTAyXSxbLTEyNiw2OF0sWzE4LDg5OF0sWy0yMjgsLTM0OF0sWy0yNDUsMTVdLFstMTA1LDMxNV0sWy0xODQsMzRdLFs1OSwyNTRdLFstMTU1LDM1OV0sWy0xMTUsNTMyXSxbNzMsMTA4XSxbMCwyNTBdLFsxNjgsMTcxXSxbLTI4LDMxOV0sWzcxLDIwNl0sWzIwLDI3NV0sWzMxOCw0MDJdLFsyMjcsMTE0XSxbMzcsODldLFsyNTEsLTI4XV0sW1szMDU4NSw0ODA0MF0sWzEyNSwxNjIwXSxbNiwyNTZdLFstNDMsMzM5XSxbLTEyMywyMTVdLFsxLDQzMF0sWzE1Niw5N10sWzU2LC02MV0sWzksMjI2XSxbLTE2Miw2MV0sWy00LDM3MF0sWzU0MSwtMTNdLFs5MiwyMDNdLFs3NywtMTg3XSxbNTUsLTM0OV0sWzUyLDczXV0sW1szMTQyMyw1MTMyMF0sWzE1MywtMzEyXSxbMjE2LDM4XSxbNTQsMTgxXSxbMjA2LDEzOF0sWzExNSw5N10sWzMyLDI1MF0sWzE5OCwxNjhdLFstMTUsMTI0XSxbLTIzNSw1MV0sWy0zOSwzNzJdLFsxMiwzOTZdLFstMTI1LDE1M10sWzUyLDU1XSxbMjA2LC03Nl0sWzIyMSwtMTQ4XSxbODAsMTQwXSxbMjAwLDkyXSxbMzEwLDIyMV0sWzEwMiwyMjVdLFstMzcsMTY3XV0sW1szMzEyOSw1MzY1Ml0sWzE0NSwyNl0sWzY0LC0xMzZdLFstMzYsLTI1OV0sWzk2LC05MF0sWzYzLC0yNzRdLFstNzcsLTIwOV0sWy00NCwtNTAyXSxbNzEsLTI5OV0sWzIwLC0yNzRdLFsxNzEsLTI3N10sWzEzNywtMjldLFszMCwxMTZdLFs4OCwyNV0sWzEyNiwxMDRdLFs5MCwxNTddLFsxNTQsLTUwXSxbNjcsMjFdXSxbWzM0Mjk0LDUxNzAyXSxbMTUxLC00OF0sWzI1LDEyMF0sWy00NiwxMThdLFsyOCwxNzFdLFsxMTIsLTUzXSxbMTMxLDYxXSxbMTU5LC0xMjVdXSxbWzM0ODU0LDUxOTQ2XSxbMTIxLC0xMjJdLFs4NiwxNjBdLFs2MiwtMjVdLFszOCwtMTY2XSxbMTMzLDQyXSxbMTA3LDIyNF0sWzg1LDQzNl0sWzE2NCw1NDBdXSxbWzM1NjUwLDUzMDM1XSxbOTUsMjhdLFs2OSwtMzI3XSxbMTU1LC0xMDMzXSxbMTQ5LC05N10sWzcsLTQwOF0sWy0yMDgsLTQ4N10sWzg2LC0xNzhdLFs0OTEsLTkyXSxbMTAsLTU5M10sWzIxMSwzODhdLFszNDksLTIxMl0sWzQ2MiwtMzYxXSxbMTM1LC0zNDZdLFstNDUsLTMyN10sWzMyMywxODJdLFs1NDAsLTMxM10sWzQxNSwyM10sWzQxMSwtNDg5XSxbMzU1LC02NjJdLFsyMTQsLTE3MF0sWzIzNywtMjRdLFsxMDEsLTE4Nl0sWzk0LC03NTJdLFs0NiwtMzU4XSxbLTExMCwtOTc3XSxbLTE0MiwtMzg1XSxbLTM5MSwtODIyXSxbLTE3NywtNjY4XSxbLTIwNiwtNTEzXSxbLTY5LC0xMV0sWy03OCwtNDM1XSxbMjAsLTExMDddLFstNzcsLTkxMF0sWy0zMCwtMzkwXSxbLTg4LC0yMzNdLFstNDksLTc5MF0sWy0yODIsLTc3MV0sWy00NywtNjEwXSxbLTIyNSwtMjU2XSxbLTY1LC0zNTVdLFstMzAyLDJdLFstNDM3LC0yMjddLFstMTk1LC0yNjNdLFstMzExLC0xNzNdLFstMzI3LC00NzBdLFstMjM1LC01ODZdLFstNDEsLTQ0MV0sWzQ2LC0zMjZdLFstNTEsLTU5N10sWy02MywtMjg5XSxbLTE5NSwtMzI1XSxbLTMwOCwtMTA0MF0sWy0yNDQsLTQ2OF0sWy0xODksLTI3N10sWy0xMjcsLTU2Ml0sWy0xODMsLTMzN11dLFtbMzM4NDIsMzg2NTldLFstNCwxODJdLFstMjU5LDMwMl0sWy0yNTgsOV0sWy00ODQsLTE3Ml0sWy0xMzMsLTUyMF0sWy03LC0zMThdLFstMTEwLC03MDhdXSxbWzMwNjY5LDQwMTkzXSxbMTc1LDYzOF0sWy0xMTksNDk2XSxbNjMsMTk5XSxbLTQ5LDIxOV0sWzEwOCwyOTVdLFs2LDUwM10sWzEzLDQxNV0sWzYwLDIwMF0sWy0yNDAsOTUxXV0sW1szMDQ1MiwzOTczOV0sWy0yNzksMzQwXSxbLTI0LDI0Ml0sWy01NTEsNTkzXSxbLTQ5OCw2NDZdLFstMjE0LDM2NV0sWy0xMTUsNDg4XSxbNDYsMTcwXSxbLTIzNiw3NzVdLFstMjc0LDEwOTBdLFstMjYyLDExNzddLFstMTE0LDI2OV0sWy04Nyw0MzVdLFstMjE2LDM4Nl0sWy0xOTgsMjM5XSxbOTAsMjY0XSxbLTEzNCw1NjNdLFs4Niw0MTRdLFsyMjEsMzczXV0sW1syNzY5Myw0ODU2OF0sWzMzLC0yNDZdLFstNzksLTE0MV0sWzgsLTIxNl0sWzExNCw0N10sWzExMywtNjRdLFsxMTYsLTI5OF0sWzE1NywyNDNdLFs1MywzOThdLFsxNzAsNTE0XSxbMzM0LDIzM10sWzMwMyw2MTldLFs4NiwzODRdLFstMzgsNDQ5XV0sW1syOTA2Myw1MDQ5MF0sWzc0LDU2XSxbMTg0LC0yODBdLFs4OSwtMjc5XSxbMTI5LC0xNTJdLFsxNjMsLTYyMF0sWzIwNywtNzRdLFsxNTMsMTU3XSxbMTAxLC0xMDNdLFsxNjYsNTFdLFsyMTMsLTI3Nl0sWy0xNzksLTYwMl0sWzgzLC0xNF0sWzEzOSwtMzE0XV0sW1syOTA2Myw1MDQ5MF0sWy0xMTksMTQwXSxbLTEzNywxOTVdLFstNzksLTk0XSxbLTIzNSw4Ml0sWy02OCwyNTVdLFstNTIsLTEwXSxbLTI3OCwzMzhdXSxbWzI4MDk1LDUxMzk2XSxbLTM3LDE4M10sWzEwMyw0NF0sWy0xMiwyOTZdLFs2NSwyMTRdLFsxMzgsNDBdLFsxMTcsMzcxXSxbMTA2LDMxMF0sWy0xMDIsMTQxXSxbNTIsMzQzXSxbLTYyLDU0MF0sWzU5LDE1NV0sWy00NCw1MDBdLFstMTEyLDMxNV1dLFtbMjgzNjYsNTQ4NDhdLFszNiwyODddLFs4OSwtNDNdLFs1MiwxNzZdLFstNjQsMzQ4XSxbMzQsODZdXSxbWzI4NTEzLDU1NzAyXSxbMTQzLC0xOF0sWzIwOSw0MTJdLFsxMTQsNjNdLFszLDE5NV0sWzUxLDUwMF0sWzE1OSwyNzRdLFsxNzUsMTFdLFsyMiwxMjNdLFsyMTgsLTQ5XSxbMjE4LDI5OF0sWzEwOSwxMzJdLFsxMzQsMjg1XSxbOTgsLTM2XSxbNzMsLTE1Nl0sWy01NCwtMTk5XV0sW1szMDE4NSw1NzUzN10sWy0xNzgsLTk5XSxbLTcxLC0yOTVdLFstMTA3LC0xNjldLFstODEsLTIyMF0sWy0zNCwtNDIyXSxbLTc3LC0zNDVdLFsxNDQsLTQwXSxbMzUsLTI3MV0sWzYyLC0xMzBdLFsyMSwtMjM4XSxbLTMzLC0yMTldLFsxMCwtMTIzXSxbNjksLTQ5XSxbNjYsLTIwN10sWzM1Nyw1N10sWzE2MSwtNzVdLFsxOTYsLTUwOF0sWzExMiw2M10sWzIwMCwtMzJdLFsxNTgsNjhdLFs5OSwtMTAyXSxbLTUwLC0zMThdLFstNjIsLTE5OV0sWy0yMiwtNDIzXSxbNTYsLTM5M10sWzc5LC0xNzVdLFs5LC0xMzNdLFstMTQwLC0yOTRdLFsxMDAsLTEzMF0sWzc0LC0yMDddLFs4NSwtNTg5XV0sW1syODM2Niw1NDg0OF0sWy05MywxNzBdLFstNTksMzE5XSxbNjgsMTU4XSxbLTcwLDQwXSxbLTUyLDE5Nl0sWy0xMzgsMTY0XSxbLTEyMiwtMzhdLFstNTYsLTIwNV0sWy0xMTIsLTE0OV0sWy02MSwtMjBdLFstMjcsLTEyM10sWzEzMiwtMzIxXSxbLTc1LC03Nl0sWy00MCwtODddLFstMTMwLC0zMF0sWy00OCwzNTNdLFstMzYsLTEwMV0sWy05MiwzNV0sWy01NiwyMzhdLFstMTE0LDM5XSxbLTcyLDY5XSxbLTExOSwtMV0sWy04LC0xMjhdLFstMzIsODldXSxbWzI2OTU0LDU1NDM5XSxbMTQsMTE3XSxbMjMsMTIwXSxbLTEwLDEwN10sWzQxLDcwXSxbLTU4LDg4XSxbLTEsMjM4XSxbMTA3LDUzXV0sW1syNzA3MCw1NjIzMl0sWzEwMCwtMjEyXSxbLTYsLTEyNl0sWzExMSwtMjZdLFsyNiw0OF0sWzc3LC0xNDVdLFsxMzYsNDJdLFsxMTksMTUwXSxbMTY4LDExOV0sWzk1LDE3Nl0sWzE1MywtMzRdLFstMTAsLTU4XSxbMTU1LC0yMV0sWzEyNCwtMTAyXSxbOTAsLTE3N10sWzEwNSwtMTY0XV0sW1syNjk1NCw1NTQzOV0sWy0xNTEsMTMxXSxbLTU2LDEyNF0sWzMyLDEwM10sWy0xMSwxMzBdLFstNzcsMTQyXSxbLTEwOSwxMTZdLFstOTUsNzZdLFstMTksMTczXSxbLTczLDEwNV0sWzE4LC0xNzJdLFstNTUsLTE0MV0sWy02NCwxNjRdLFstODksNThdLFstMzgsMTIwXSxbMiwxNzldLFszNiwxODddLFstNzgsODNdLFs2NCwxMTRdXSxbWzI2MTkxLDU3MTMxXSxbNDIsNzZdLFsxODMsLTE1Nl0sWzYzLDc3XSxbODksLTUwXSxbNDYsLTEyMV0sWzgyLC00MF0sWzY2LDEyNl1dLFtbMjY3NjIsNTcwNDNdLFs3MCwtMzIxXSxbMTA4LC0yMzhdLFsxMzAsLTI1Ml1dLFtbMjYxOTEsNTcxMzFdLFstOTYsMTg2XSxbLTEzMCwyMzhdLFstNjEsMjAwXSxbLTExNywxODVdLFstMTQwLDI2N10sWzMxLDkxXSxbNDYsLTg4XSxbMjEsNDFdXSxbWzI1NzQ1LDU4MjUxXSxbODYsMjVdLFszNSwxMzVdLFs0MSw1XSxbLTYsMjkwXSxbNjUsMTRdLFs1OCwtNF0sWzYwLDE1OF0sWzgyLC0xMjBdLFsyOSw3NF0sWzUxLDcwXSxbOTcsMTYzXSxbNCwxMjFdLFsyNywtNV0sWzM2LDE0MV0sWzI5LDE3XSxbNDcsLTkwXSxbNTYsLTI3XSxbNjEsNzZdLFs3MCwwXSxbOTcsNzddLFszOCw4MV0sWzk1LC0xMl1dLFtbMjY5MDMsNTk0NDBdLFstMjQsLTU3XSxbLTE0LC0xMzJdLFsyOSwtMjE2XSxbLTY0LC0yMDJdLFstMzAsLTIzN10sWy05LC0yNjFdLFsxNSwtMTUyXSxbNywtMjY2XSxbLTQzLC01OF0sWy0yNiwtMjUzXSxbMTksLTE1Nl0sWy01NiwtMTUxXSxbMTIsLTE1OV0sWzQzLC05N11dLFtbMjU3NDUsNTgyNTFdLFstNDgsMTg1XSxbLTg0LDUxXV0sW1syNTYxMyw1ODQ4N10sWzE5LDIzN10sWy0zOCw2NF0sWy01Nyw0Ml0sWy0xMjIsLTcwXSxbLTEwLDc5XSxbLTg0LDk1XSxbLTYwLDExOF0sWy04Miw1MF1dLFtbMjUxNzksNTkxMDJdLFs1OCwxNTBdLFstMjIsMTE2XSxbMjAsMTEzXSxbMTMxLDE2Nl0sWzEyNywyMjVdXSxbWzI1NDkzLDU5ODcyXSxbMjksLTIzXSxbNjEsMTA0XSxbNzksOF0sWzI2LC00OF0sWzQzLDI5XSxbMTI5LC01M10sWzEyOCwxNV0sWzkwLDY2XSxbMzIsNjZdLFs4OSwtMzFdLFs2NiwtNDBdLFs3MywxNF0sWzU1LDUxXSxbMTI3LC04Ml0sWzQ0LC0xM10sWzg1LC0xMTBdLFs4MCwtMTMyXSxbMTAxLC05MV0sWzczLC0xNjJdXSxbWzI1NjEzLDU4NDg3XSxbLTMxLC0xMzldLFstMTYxLDldLFstMTAwLDU3XSxbLTExNSwxMTddLFstMTU0LDM3XSxbLTc5LDEyN11dLFtbMjQ5NzMsNTg2OTVdLFs5LDg2XSxbOTUsMTQ5XSxbNTIsNjZdLFstMTUsNjldLFs2NSwzN11dLFtbMjUyMzgsNjExMDFdLFstMiwtNDY4XSxbLTIyLC02NjddLFs4MywwXV0sW1syNTI5Nyw1OTk2Nl0sWzkwLC0xMDddLFsyNCw4OF0sWzgyLC03NV1dLFtbMjQ5NzMsNTg2OTVdLFstMTQyLDEwM10sWy0xNzQsMTFdLFstMTI3LDExN10sWy0xNDksMjQ0XV0sW1syNTQ3Miw2MTUxMF0sWzEsLTg3XSxbNTMsLTNdLFstNSwtMTYwXSxbLTQ1LC0yNTZdLFsyNCwtOTFdLFstMjksLTIxMl0sWzE4LC01Nl0sWy0zMiwtMjk5XSxbLTU1LC0xNTZdLFstNTAsLTE5XSxbLTU1LC0yMDVdXSxbWzMwMTg1LDU3NTM3XSxbLTgsLTEzOV0sWy0xNjMsLTY5XSxbOTEsLTI2OF0sWy0zLC0zMDldLFstMTIzLC0zNDRdLFsxMDUsLTQ2OF0sWzEyMCwzOF0sWzYyLDQyN10sWy04NiwyMDhdLFstMTQsNDQ3XSxbMzQ2LDI0MV0sWy0zOCwyNzhdLFs5NywxODZdLFsxMDAsLTQxNV0sWzE5NSwtOV0sWzE4MCwtMzMwXSxbMTEsLTE5NV0sWzI0OSwtNl0sWzI5Nyw2MV0sWzE1OSwtMjY0XSxbMjEzLC03NF0sWzE1NSwxODVdLFs0LDE0OV0sWzM0NCwzNV0sWzMzMyw5XSxbLTIzNiwtMTc1XSxbOTUsLTI3OV0sWzIyMiwtNDRdLFsyMTAsLTI5MV0sWzQ1LC00NzNdLFsxNDQsMTNdLFsxMDksLTEzOV1dLFtbMzM0MDAsNTU1MjNdLFstMjIwLC0zNDddLFstMjQsLTIxNV0sWzk1LC0yMjBdLFstNjksLTExMF0sWy0xNzEsLTk1XSxbNSwtMjczXSxbLTc1LC0xNjNdLFsxODgsLTQ0OF1dLFtbMzM0MDAsNTU1MjNdLFsxODMsLTIxN10sWzE3MSwtMzg1XSxbOCwtMzA0XSxbMTA1LC0xNF0sWzE0OSwtMjg5XSxbMTA5LC0yMDVdXSxbWzM0MTI1LDU0MTA5XSxbLTQ0LC01MzJdLFstMTY5LC0xNTRdLFsxNSwtMTM5XSxbLTUxLC0zMDVdLFsxMjMsLTQyOV0sWzg5LC0xXSxbMzcsLTMzM10sWzE2OSwtNTE0XV0sW1szNDEyNSw1NDEwOV0sWzMzMywtMTE5XSxbMzAsMTA3XSxbMjI1LDQzXSxbMjk4LC0xNTldXSxbWzM1MDExLDUzOTgxXSxbLTE0NCwtNTA4XSxbMjIsLTQwNF0sWzEwOSwtMzUxXSxbLTQ5LC0yNTRdLFstMjQsLTI3MF0sWy03MSwtMjQ4XV0sW1szNTAxMSw1Mzk4MV0sWzk1LC02NV0sWzIwNCwtMTQwXSxbMjk0LC00OTldLFs0NiwtMjQyXV0sW1s1MTcxOCw3OTgwNF0sWzEzMSwtMTU1XSxbNDAwLC0xMDldLFstMTQwLC00MDRdLFstMzUsLTQyMV1dLFtbNTIwNzQsNzg3MTVdLFstNzcsLTEwMV0sWy0xMjYsNTRdLFs5LC0xNTBdLFstMjAzLC0zMzJdLFstNSwtMjY3XSxbMTMzLDkyXSxbOTUsLTI1OV1dLFtbNTE5MDAsNzc3NTJdLFstMTEsLTE2N10sWzgyLC0yMjJdLFstOTcsLTE4MF0sWzcyLC00NTddLFsxNTEsLTc1XSxbLTMyLC0yNTZdXSxbWzUyMDY1LDc2Mzk1XSxbLTI1MiwtMzM0XSxbLTU0OCwxNjBdLFstNDA0LC0xOTJdLFstMzIsLTM1NV1dLFtbNTA4MjksNzU2NzRdLFstMzIyLC03N10sWy0zMTMsMjY3XSxbLTEwMSwtMTI3XSxbLTUxMSwyNjhdLFstMTExLDIzMF1dLFtbNDk0NzEsNzYyMzVdLFsxNDQsMzU0XSxbNTMsMTE3N10sWy0yODcsNjIwXSxbLTIwNSwyOTldLFstNDI0LDIyN10sWy0yOCw0MzFdLFszNjAsMTI5XSxbNDY2LC0xNTJdLFstODgsNjY5XSxbMjYzLC0yNTRdLFs2NDYsNDYxXSxbODQsNDg0XSxbMjQzLDExOV1dLFtbNTA2OTgsODA3OTldLFs0MCwtMjA3XSxbMTI5LC0xMF0sWzEyOSwtMjM3XSxbMTk0LC0yNzldLFsxNDMsNDZdLFsyNDMsLTI2OV1dLFtbNTE1NzYsNzk4NDNdLFs2MiwtNTJdLFs4MCwxM11dLFtbNTI0MjksNzU3NjVdLFsxNzksMjI2XSxbNDcsLTUwN10sWy05MiwtNDU2XSxbLTEyNiwxMjBdLFstNjQsMzk4XSxbNTYsMjE5XV0sW1syNzY5Myw0ODU2OF0sWzE0OCw0NDJdLFstNjAsMjU4XSxbLTEwNiwtMjc1XSxbLTE2NiwyNTldLFs1NiwxNjddLFstNDcsNTM2XSxbOTcsODldLFs1MiwzNjhdLFsxMDUsMzgxXSxbLTIwLDI0MV0sWzE1MywxMjZdLFsxOTAsMjM2XV0sW1szMTU4OCw2MTUxOV0sWzE0MiwtNTJdLFs1MCwtMTE4XSxbLTcxLC0xNDldLFstMjA5LDRdLFstMTYzLC0yMV0sWy0xNiwyNTNdLFs0MCw4Nl0sWzIyNywtM11dLFtbMjg0NTMsNjE1MDRdLFsxODcsLTUzXSxbMTQ3LC0xNDJdLFs0NiwtMTYxXSxbLTE5NSwtMTFdLFstODQsLTk5XSxbLTE1Niw5NV0sWy0xNTksMjE1XSxbMzQsMTM1XSxbMTE2LDQxXSxbNjQsLTIwXV0sW1syNzE0Nyw2NDI4MF0sWzI0MCwtNDJdLFsyMTksLTddLFsyNjEsLTIwMV0sWzExMCwtMjE2XSxbMjYwLDY2XSxbOTgsLTEzOF0sWzIzNSwtMzY2XSxbMTczLC0yNjddLFs5Miw4XSxbMTY1LC0xMjBdLFstMjAsLTE2N10sWzIwNSwtMjRdLFsyMTAsLTI0Ml0sWy0zMywtMTM4XSxbLTE4NSwtNzVdLFstMTg3LC0yOV0sWy0xOTEsNDZdLFstMzk4LC01N10sWzE4NiwzMjldLFstMTEzLDE1NF0sWy0xNzksMzldLFstOTYsMTcxXSxbLTY2LDMzNl0sWy0xNTcsLTIzXSxbLTI1OSwxNTldLFstODMsMTI0XSxbLTM2Miw5MV0sWy05NywxMTVdLFsxMDQsMTQ4XSxbLTI3MywzMF0sWy0xOTksLTMwN10sWy0xMTUsLThdLFstNDAsLTE0NF0sWy0xMzgsLTY1XSxbLTExOCw1Nl0sWzE0NiwxODNdLFs2MCwyMTNdLFsxMjYsMTMxXSxbMTQyLDExNl0sWzIxMCw1Nl0sWzY3LDY1XV0sW1s1ODE3NSwzNzUyOF0sWy0xNzcsMjY3XSxbLTIxNSw5MF0sWy04MiwzNzVdLFswLDIwOF0sWy0xMTksNjRdLFstMzE1LDY0OV0sWy04NywzNDJdLFstNTYsMTA1XSxbLTEwNyw0NzNdXSxbWzU3MDE3LDQwMTAxXSxbMzExLC02NV0sWzkwLC02OF0sWzk0LDEzXSxbMTU0LDM4M10sWzI0MSw0ODZdLFsxMDAsNDZdLFszMywyMDVdLFsxNTksMjM1XSxbMjEwLDgxXV0sW1s1ODQwOSw0MTQxN10sWzE4LC0yMjBdLFsyMzIsMTJdLFsxMjgsLTEyNV0sWzYwLC0xNDZdLFsxMzIsLTQzXSxbMTQ1LC0xOTBdLFswLC03NDhdLFstNTQsLTQwOV0sWy0xMiwtNDQyXSxbNDUsLTE3NV0sWy0zMSwtMzQ4XSxbLTQyLC01M10sWy03NCwtNDI2XSxbLTI5MiwtNjcxXV0sW1s1NTUyNiwzNTk0Nl0sWzAsMTcyNV0sWzI3NCwyMF0sWzgsMjEwNV0sWzIwNywxOV0sWzQyOCwyMDddLFsxMDYsLTI0M10sWzE3NywyMzFdLFs4NSwyXSxbMTU2LDEzM11dLFtbNTY5NjcsNDAxNDVdLFs1MCwtNDRdXSxbWzU0NTQwLDMzNjk2XSxbLTIwNyw0NDZdLFstMTA4LDQzMl0sWy02Miw1NzVdLFstNjgsNDI4XSxbLTkzLDkxMF0sWy03LDcwN10sWy0zNSwzMjJdLFstMTA4LDI0M10sWy0xNDQsNDg5XSxbLTE0Niw3MDhdLFstNjAsMzcxXSxbLTIyNiw1NzddLFstMTcsNDUzXV0sW1s1MzI1OSw0MDM1N10sWzEzNCwxMTNdLFsxNjYsMTAwXSxbMTgwLC0xN10sWzE2NiwtMjY3XSxbNDIsNDFdLFsxMTI2LDI2XSxbMTkyLC0yODRdLFs2NzMsLTgzXSxbNTEwLDI0MV1dLFtbNTY0NDgsNDAyMjddLFsyMjgsMTM0XSxbMTgwLC0zNF0sWzEwOSwtMTMzXSxbMiwtNDldXSxbWzQ1MzU3LDU4NjEyXSxbLTExNSw0NjBdLFstMTM4LDIxMF0sWzEyMiwxMTJdLFsxMzQsNDE1XSxbNjYsMzA0XV0sW1s0NTQyNiw2MDExM10sWzk2LDE4OV0sWzEzOCwtNTFdLFsxMzUsMTI5XSxbMTU1LDZdLFsxMzMsLTE3M10sWzE4NCwtMTU3XSxbMTY4LC00MzVdLFsxODQsLTQwNV1dLFtbNDY2MTksNTkyMTZdLFsxMywtMzY4XSxbNTQsLTMzOF0sWzEwNCwtMTY2XSxbMjQsLTIyOV0sWy0xMywtMTg0XV0sW1s0NjgwMSw1NzkzMV0sWy00MCwtMzNdLFstMTUxLDQ3XSxbLTIxLC02Nl0sWy02MSwtMTNdLFstMjAwLDE0NF0sWy0xMzQsNl1dLFtbNDYxOTQsNTgwMTZdLFstNTEzLDI1XSxbLTc1LC02N10sWy05MiwxOV0sWy0xNDcsLTk2XV0sW1s0NTM2Nyw1Nzg5N10sWy00Niw0NTNdXSxbWzQ1MzIxLDU4MzUwXSxbMjUzLC0xM10sWzY3LDgzXSxbNTAsNV0sWzEwMywxMzZdLFsxMTksLTEyNF0sWzEyMSwtMTFdLFsxMjAsMTMzXSxbLTU2LDE3MF0sWy05MiwtOTldLFstODYsM10sWy0xMTAsMTQ1XSxbLTg4LC05XSxbLTYzLC0xNDBdLFstMzAyLC0xN11dLFtbNDY2MTksNTkyMTZdLFs5MywxMDddLFs0NywzNDhdLFs4OCwxNF0sWzE5NCwtMTY1XSxbMTU3LDExN10sWzEwNywtMzldLFs0MiwxMzFdLFsxMTE0LDldLFs2Miw0MTRdLFstNDgsNzNdLFstMTM0LDI1NTBdLFstMTM0LDI1NTBdLFs0MjUsMTBdXSxbWzQ4NjMyLDY1MzM1XSxbOTM3LC0xMjg5XSxbOTM3LC0xMjg5XSxbNjYsLTI3N10sWzE3MywtMTY5XSxbMTI5LC05Nl0sWzMsLTM3Nl0sWzMwOCw1OF1dLFtbNTExODUsNjE4OTddLFsxLC0xMzYxXSxbLTE1MiwtMzk0XSxbLTI0LC0zNjRdLFstMjQ3LC05NF0sWy0zNzksLTUxXSxbLTEwMiwtMjEwXSxbLTE3OCwtMjNdXSxbWzUwMTA0LDU5NDAwXSxbLTE3OCwtM10sWy03MCwxMTRdLFstMTUzLC04NF0sWy0yNTksLTI0Nl0sWy01MywtMTg0XSxbLTIxNiwtMjY1XSxbLTM4LC0xNTJdLFstMTE2LC0xMjBdLFstMTM0LDc5XSxbLTc2LC0xNDRdLFstNDEsLTQwNV0sWy0yMjEsLTQ5MF0sWzcsLTIwMF0sWy03NiwtMjUwXSxbMTgsLTM0M11dLFtbNDg0OTgsNTY3MDddLFstMTE0LC04OF0sWy02NSwtNzRdLFstNDMsMjUzXSxbLTgwLC02N10sWy00OCwxMV0sWy01MSwtMTcyXSxbLTIxNSw1XSxbLTc3LDg5XSxbLTM2LC01NF1dLFtbNDc3NjksNTY2MTBdLFstODUsMTcwXSxbMTUsMTc2XSxbLTM1LDY5XSxbLTU5LC01OF0sWzExLDE5Ml0sWzU3LDE1Ml0sWy0xMTQsMjQ4XSxbLTMzLDE2M10sWy02MiwxMzBdLFstNTUsMTVdLFstNjcsLTgzXSxbLTkwLC03OV0sWy03NiwtMTI4XSxbLTExOSw0OF0sWy03NywxNTBdLFstNDYsMTldLFstNzMsLTc4XSxbLTQ0LC0xXSxbLTE2LDIxNl1dLFtbNDc1ODcsNjY3NjZdLFsxMDQ1LC0xNDMxXV0sW1s0NTQyNiw2MDExM10sWy0yNCwzMThdLFs3OCwyOTFdLFszNCw1NTddLFstMzAsNTgzXSxbLTM0LDI5NF0sWzI4LDI5NV0sWy03MiwyODFdLFstMTQ2LDI1NV1dLFtbNTA3NDcsNTQyNzhdLFstMjI5LC02OV1dLFtbNTA1MTgsNTQyMDldLFstNjksNDA3XSxbMTMsMTM1N10sWy01NiwxMjJdLFstMTEsMjkwXSxbLTk2LDIwN10sWy04NSwxNzRdLFszNSwzMTFdXSxbWzUwMjQ5LDU3MDc3XSxbOTYsNjddLFs1NiwyNThdLFsxMzYsNTZdLFs2MSwxNzZdXSxbWzUwNTk4LDU3NjM0XSxbOTMsMTczXSxbMTAwLDJdLFsyMTIsLTM0MF1dLFtbNTEwMDMsNTc0NjldLFstMTEsLTE5N10sWzYyLC0zNTBdLFstNTQsLTIzOF0sWzI5LC0xNTldLFstMTM1LC0zNjZdLFstODYsLTE4MV0sWy01MiwtMzcyXSxbNywtMzc2XSxbLTE2LC05NTJdXSxbWzU0MDI2LDU4MTc3XSxbLTc4LC0zNF0sWy05LC0xODhdXSxbWzUzOTM5LDU3OTU1XSxbLTUyLC0xM10sWy0xODgsNjQ3XSxbLTY1LDI0XSxbLTIxNywtMzMxXSxbLTIxNSwxNzNdLFstMTUwLDM0XSxbLTgwLC04M10sWy0xNjMsMThdLFstMTY0LC0yNTJdLFstMTQxLC0xNF0sWy0zMzcsMzA1XSxbLTEzMSwtMTQ1XSxbLTE0MiwxMF0sWy0xMDQsMjIzXSxbLTI3OSwyMjFdLFstMjk4LC03MF0sWy03MiwtMTI4XSxbLTM5LC0zNDBdLFstODAsLTIzOF0sWy0xOSwtNTI3XV0sW1s1MDU5OCw1NzYzNF0sWzYsNDA1XSxbLTMyMCwxMzRdLFstOSwyODZdLFstMTU2LDM4Nl0sWy0zNywyNjldLFsyMiwyODZdXSxbWzUxMTg1LDYxODk3XSxbMzkyLDI2M10sWzgwNCwxMTYxXSxbOTUyLDExMjZdXSxbWzUzMzMzLDY0NDQ3XSxbNDM5LC0yNTVdLFsxNTYsLTMyNF0sWzE5NywyMjBdXSxbWzUzOTM5LDU3OTU1XSxbMTEwLC0yMzVdLFstMzEsLTEwN10sWy0xNCwtMTk2XSxbLTIzNCwtNDU3XSxbLTc0LC0zNzddLFstMzksLTMwN10sWy01OSwtMTMyXSxbLTU2LC00MTRdLFstMTQ4LC0yNDNdLFstNDMsLTI5OV0sWy02MywtMjM4XSxbLTI2LC0yNDZdLFstMTkxLC0xOTldLFstMTU2LDI0M10sWy0xMDUsLTEwXSxbLTE2NSwtMzQ1XSxbLTgxLC02XSxbLTEzMiwtNTcwXSxbLTcxLC00MThdXSxbWzUyMzYxLDUzMzk5XSxbLTI4OSwtMjEzXSxbLTEwNSwzMV0sWy0xMDcsLTEzMl0sWy0yMjIsMTNdLFstMTQ5LDM3MF0sWy05MSw0MjddLFstMTk3LDM4OV0sWy0yMDksLTddLFstMjQ1LDFdXSxbWzU0MjQ0LDU0OTY1XSxbLTE0MCwtNTk5XSxbLTY3LC0xMDddLFstMjEsLTQ1OF0sWzI4LC0yNDldLFstMjMsLTE3Nl0sWzEzMiwtMzA5XSxbMjMsLTIxMl0sWzEwMywtMzA1XSxbMTI3LC0xOTBdLFsxMiwtMjY5XSxbMjksLTE3Ml1dLFtbNTQ0NDcsNTE5MTldLFstMjAsLTMxOV0sWy0yMjAsMTQwXSxbLTIyNSwxNTZdLFstMzUwLDIzXV0sW1s1MzYzMiw1MTkxOV0sWy0zNSwzMl0sWy0xNjQsLTc2XSxbLTE2OSw3OV0sWy0xMzIsLTM4XV0sW1s1MzEzMiw1MTkxNl0sWy00NTIsMTNdXSxbWzUyNjgwLDUxOTI5XSxbNDAsNDY2XSxbLTEwOCwzOTFdLFstMTI3LDEwMF0sWy01NiwyNjVdLFstNzIsODVdLFs0LDE2M11dLFtbNTA1MTgsNTQyMDldLFstMjI0LC0xMjZdXSxbWzUwMjk0LDU0MDgzXSxbLTYyLDIwN10sWy03NCwzNzVdLFstMjIsMjk0XSxbNjEsNTMyXSxbLTY5LDIxNV0sWy0yNyw0NjZdLFsxLDQyOV0sWy0xMTYsMzA1XSxbMjAsMTg0XV0sW1s1MDAwNiw1NzA5MF0sWzI0MywtMTNdXSxbWzUwMjk0LDU0MDgzXSxbLTQzNiwtMzQ2XSxbLTE1NCwtMjAzXSxbLTI1MCwtMTcxXSxbLTI0OCwxNjhdXSxbWzQ5MjA2LDUzNTMxXSxbMTMsMjMzXSxbLTEyMSw1MDldLFs3Myw2NjddLFsxMTcsNDk2XSxbLTc0LDg0MV1dLFtbNDkyMTQsNTYyNzddLFstMzgsNDQ0XSxbNywzMzZdLFs0ODIsMjddLFsxMjMsLTQzXSxbOTAsOTZdLFsxMjgsLTQ3XV0sW1s0ODQ5OCw1NjcwN10sWzEyNSwtMTI5XSxbNDksLTE5NV0sWzEyNSwtMTI1XSxbOTcsMTQ5XSxbMTMwLDIyXSxbMTkwLC0xNTJdXSxbWzQ5MjA2LDUzNTMxXSxbLTEyNiwtN10sWy0xOTQsMTE2XSxbLTE3OCwtN10sWy0zMjksLTEwM10sWy0xOTMsLTE3MF0sWy0yNzUsLTIxN10sWy01NCwxNV1dLFtbNDc4NTcsNTMxNThdLFsyMiw0ODddLFsyNiw3NF0sWy04LDIzM10sWy0xMTgsMjQ3XSxbLTg4LDQwXSxbLTgxLDE2Ml0sWzYwLDI2Ml0sWy0yOCwyODZdLFsxMywxNzJdXSxbWzQ3NjU1LDU1MTIxXSxbNDQsMF0sWzE3LDI1OF0sWy0yMiwxMTRdLFsyNyw4Ml0sWzEwMyw3MV0sWy02OSw0NzNdLFstNjQsMjQ1XSxbMjMsMjAwXSxbNTUsNDZdXSxbWzQ3NjU1LDU1MTIxXSxbLTc4LDE1XSxbLTU3LC0yMzhdLFstNzgsM10sWy01NSwxMjZdLFsxOSwyMzddLFstMTE2LDM2Ml0sWy03MywtNjddLFstNTksLTEzXV0sW1s0NzE1OCw1NTU0Nl0sWy03NywtMzRdLFszLDIxN10sWy00NCwxNTVdLFs5LDE3MV0sWy02MCwyNDldLFstNzgsMjExXSxbLTIyMiwxXSxbLTY1LC0xMTJdLFstNzYsLTEzXSxbLTQ4LC0xMjhdLFstMzIsLTE2M10sWy0xNDgsLTI2MF1dLFtbNDYzMjAsNTU4NDBdLFstMTIyLDM0OV0sWy0xMDgsMjMyXSxbLTcxLDc2XSxbLTY5LDExOF0sWy0zMiwyNjFdLFstNDEsMTMwXSxbLTgwLDk3XV0sW1s0NTc5Nyw1NzEwM10sWzEyMywyODhdLFs4NCwtMTFdLFs3Myw5OV0sWzYxLDFdLFs0NCw3OF0sWy0yNCwxOTZdLFszMSw2Ml0sWzUsMjAwXV0sW1s0NTc5Nyw1NzEwM10sWy0xNDksMjQ3XSxbLTExNywzOV0sWy02MywxNjZdLFsxLDkwXSxbLTg0LDEyNV0sWy0xOCwxMjddXSxbWzQ3ODU3LDUzMTU4XSxbLTczLC01XSxbLTI4NiwyODJdLFstMjUyLDQ0OV0sWy0yMzcsMzI0XSxbLTE4NywzODFdXSxbWzQ2ODIyLDU0NTg5XSxbNjYsMTg5XSxbMTUsMTcyXSxbMTI2LDMyMF0sWzEyOSwyNzZdXSxbWzQ2ODIyLDU0NTg5XSxbLTc1LDQ0XSxbLTIwMCwyMzhdLFstMTQ0LDMxNl0sWy00OSwyMTZdLFstMzQsNDM3XV0sW1s1NTEyNSw1MjY1MF0sWy0xNzgsMzNdLFstMTg4LDk5XSxbLTE2NiwtMzEzXSxbLTE0NiwtNTUwXV0sW1s1NjgyNCw1NTQ0Ml0sWzE1MiwtMjM5XSxbMiwtMTkyXSxbMTg3LC0zMDhdLFsxMTYsLTI1NV0sWzcwLC0zNTVdLFsyMDgsLTIzNF0sWzQ0LC0xODddXSxbWzUzNjA5LDQ3NzU1XSxbLTEwNCwyMDNdLFstODQsLTEwMF0sWy0xMTIsLTI1NV1dLFtbNTMzMDksNDc2MDNdLFstMjI4LDYyNl1dLFtbNTMwODEsNDgyMjldLFsyMTIsMzI2XSxbLTEwNSwzOTFdLFs5NSwxNDhdLFsxODcsNzNdLFsyMywyNjFdLFsxNDgsLTI4M10sWzI0NSwtMjVdLFs4NSwyNzldLFszNiwzOTNdLFstMzEsNDYxXSxbLTEzMSwzNTBdLFsxMjAsNjg0XSxbLTY5LDExN10sWy0yMDcsLTQ4XSxbLTc4LDMwNV0sWzIxLDI1OF1dLFtbNTMwODEsNDgyMjldLFstMjg1LDU5Nl0sWy0xODQsNDg4XSxbLTE2OSw2MTBdLFs5LDE5Nl0sWzYxLDE4OV0sWzY3LDQzMF0sWzU2LDQzOF1dLFtbNTI2MzYsNTExNzZdLFs5NCwzNV0sWzQwNCwtNl0sWy0yLDcxMV1dLFtbNTI2MzYsNTExNzZdLFstNTIsOTBdLFs5Niw2NjNdXSxbWzU5MDk5LDQ1MTI2XSxbMTMxLC0yNjRdLFs3MSwtNTAxXSxbLTQ3LC0xNjBdLFstNTYsLTQ3OV0sWzUzLC00OTBdLFstODcsLTIwNV0sWy04NSwtNTQ5XSxbMTQ3LC0xNTNdXSxbWzU5MjI2LDQyMzI1XSxbLTg0MywtNDg3XSxbMjYsLTQyMV1dLFtbNTY0NDgsNDAyMjddLFstMTgxLDM2OV0sWy0xODgsNDgzXSxbMTMsMTg4MF0sWzU3OSwtN10sWy0yNCwyMDNdLFs0MSwyMjJdLFstNDksMjc3XSxbMzIsMjg2XSxbLTI5LDE4NF1dLFtbNTk1OTksNDM3NzNdLFstNzcsLTQ0OV0sWzc3LC03NjhdLFs5Nyw5XSxbMTAwLC0xOTFdLFsxMTYsLTQyN10sWzI0LC03NjBdLFstMTIwLC0xMjRdLFstODUsLTQxMF0sWy0xODEsMzY1XSxbLTIxLDQxN10sWzU5LDI3NF0sWy0xNiwyMzddLFstMTEwLDE0OV0sWy03NywtNTRdLFstMTU5LDI4NF1dLFtbNjExOTgsNDQ0ODRdLFs0NSwtMjY1XSxbLTExLC01ODhdLFszNCwtNTE5XSxbMTEsLTkyM10sWzQ5LC0yOTBdLFstODMsLTQyMl0sWy0xMDgsLTQxMF0sWy0xNzcsLTM2Nl0sWy0yNTQsLTIyNV0sWy0zMTMsLTI4N10sWy0zMTMsLTYzNF0sWy0xMDcsLTEwOF0sWy0xOTQsLTQyMF0sWy0xMTUsLTEzNl0sWy0yMywtNDIxXSxbMTMyLC00NDhdLFs1NCwtMzQ2XSxbNCwtMTc3XSxbNDksMjldLFstOCwtNTc5XSxbLTQ1LC0yNzVdLFs2NSwtMTAxXSxbLTQxLC0yNDVdLFstMTE2LC0yMTFdLFstMjI5LC0xOTldLFstMzM0LC0zMjBdLFstMTIyLC0yMTldLFsyNCwtMjQ4XSxbNzEsLTQwXSxbLTI0LC0zMTFdXSxbWzU4OTA4LDM0Nzg1XSxbLTI0LDI2MV0sWy00MSwyNjVdXSxbWzUzMzgzLDQ3MTU5XSxbLTc0LDQ0NF1dLFtbNTMyNTksNDAzNTddLFstMjYsMzcyXSxbMzgsNTE5XSxbOTYsNTQxXSxbMTUsMjU0XSxbOTAsNTMyXSxbNjYsMjQzXSxbMTU5LDM4Nl0sWzkwLDI2M10sWzI5LDQzOF0sWy0xNSwzMzVdLFstODMsMjExXSxbLTc0LDM1OF0sWy02OCwzNTVdLFsxNSwxMjJdLFs4NSwyMzVdLFstODQsNTcwXSxbLTU3LDM5Nl0sWy0xMzksMzc0XSxbMjYsMTE1XV0sW1s1ODA2Miw0ODkwMl0sWzE2OSwtNDZdLFs4NSwzMzZdLFsxNDcsLTM4XV0sW1s1OTkyMiw2OTkwNV0sWy00OSwtMTg2XV0sW1s1OTg3Myw2OTcxOV0sWy0xMDAsODJdLFstNTgsLTM5NF0sWzY5LC02Nl0sWy03MSwtODFdLFstMTIsLTE1Nl0sWzEzMSw4MF1dLFtbNTk4MzIsNjkxODRdLFs3LC0yMzBdLFstMTM5LC05NDRdXSxbWzU5NzAwLDY4MDEwXSxbLTI3LDE1M10sWy0xNTUsODYyXV0sW1s1OTUxOCw2OTAyNV0sWzgwLDE5NF0sWy0xOSwzNF0sWzc0LDI3Nl0sWzU2LDQ0Nl0sWzQwLDE0OV0sWzgsNl1dLFtbNTk3NTcsNzAxMzBdLFs5MywtMV0sWzI1LDEwNF0sWzc1LDhdXSxbWzU5OTUwLDcwMjQxXSxbNCwtMjQyXSxbLTM4LC05MF0sWzYsLTRdXSxbWzU5NzU3LDcwMTMwXSxbOTksNDgyXSxbMTM4LDQxNl0sWzUsMjFdXSxbWzU5OTk5LDcxMDQ5XSxbMTI1LC0zMV0sWzQ1LC0yMzFdLFstMTUxLC0yMjNdLFstNjgsLTMyM11dLFtbNjM3NjEsNDMyMTJdLFs3NCwtMjUxXSxbNjksLTM5MF0sWzQ1LC03MTFdLFs3MiwtMjc2XSxbLTI4LC0yODRdLFstNDksLTE3NF0sWy05NCwzNDddLFstNTMsLTE3NV0sWzUzLC00MzhdLFstMjQsLTI1MF0sWy03NywtMTM3XSxbLTE4LC01MDBdLFstMTA5LC02ODldLFstMTM3LC04MTRdLFstMTcyLC0xMTIwXSxbLTEwNiwtODIxXSxbLTEyNSwtNjg1XSxbLTIyNiwtMTQwXSxbLTI0MywtMjUwXSxbLTE2MCwxNTFdLFstMjIwLDIxMV0sWy03NywzMTJdLFstMTgsNTI0XSxbLTk4LDQ3MV0sWy0yNiw0MjVdLFs1MCw0MjZdLFsxMjgsMTAyXSxbMSwxOTddLFsxMzMsNDQ3XSxbMjUsMzc3XSxbLTY1LDI4MF0sWy01MiwzNzJdLFstMjMsNTQ0XSxbOTcsMzMxXSxbMzgsMzc1XSxbMTM4LDIyXSxbMTU1LDEyMV0sWzEwMywxMDddLFsxMjIsN10sWzE1OCwzMzddLFsyMjksMzY0XSxbODMsMjk3XSxbLTM4LDI1M10sWzExOCwtNzFdLFsxNTMsNDEwXSxbNiwzNTZdLFs5MiwyNjRdLFs5NiwtMjU0XV0sW1s1OTg3Myw2OTcxOV0sWzAsLTM2Ml0sWy00MSwtMTczXV0sW1s0NTMyMSw1ODM1MF0sWzM2LDI2Ml1dLFtbNTI2MzMsNjg0ODZdLFstMTE4LDEwNjFdLFstMTcxLDIzOF0sWy0zLDE0M10sWy0yMjcsMzUyXSxbLTI0LDQ0NV0sWzE3MSwzMzBdLFs2NSw0ODddLFstNDQsNTYzXSxbNTcsMzAzXV0sW1s1MjMzOSw3MjQwOF0sWzMwMiwyMzldLFsxOTUsLTcxXSxbLTksLTI5OV0sWzIzNiwyMTddLFsyMCwtMTEzXSxbLTEzOSwtMjkwXSxbLTIsLTI3M10sWzk2LC0xNDddLFstMzYsLTUxMV0sWy0xODMsLTI5N10sWzUzLC0zMjJdLFsxNDMsLTEwXSxbNzAsLTI4MV0sWzEwNiwtOTJdXSxbWzUzMTkxLDcwMTU4XSxbLTE2LC00NTRdLFstMTM1LC0xNzBdLFstODYsLTE4OV0sWy0xOTEsLTIyOF0sWzMwLC0yNDRdLFstMjQsLTI1MF0sWy0xMzYsLTEzN11dLFtbNDc1OTIsNjY5MjBdLFstMiw3MDBdLFs0NDksNDM2XSxbMjc3LDkwXSxbMjI3LDE1OV0sWzEwNywyOTVdLFszMjQsMjM0XSxbMTIsNDM4XSxbMTYxLDUxXSxbMTI2LDIxOV0sWzM2Myw5OV0sWzUxLDIzMF0sWy03MywxMjVdLFstOTYsNjI0XSxbLTE3LDM1OV0sWy0xMDQsMzc5XV0sW1s0OTM5Nyw3MTM1OF0sWzI2NywzMjNdLFszMDAsMTAyXSxbMTc1LDI0NF0sWzI2OCwxODBdLFs0NzEsMTA1XSxbNDU5LDQ4XSxbMTQwLC04N10sWzI2MiwyMzJdLFsyOTcsNV0sWzExMywtMTM3XSxbMTkwLDM1XV0sW1s1MjYzMyw2ODQ4Nl0sWzkwLC01MjJdLFsxNSwtMjc0XSxbLTQ5LC00ODJdLFsyMSwtMjcwXSxbLTM2LC0zMjNdLFsyNCwtMzcxXSxbLTExMCwtMjQ3XSxbMTY0LC00MzFdLFsxMSwtMjUzXSxbOTksLTMzMF0sWzEzMCwxMDldLFsyMTksLTI3NV0sWzEyMiwtMzcwXV0sW1s1OTkyMiw2OTkwNV0sWzMwOSwtMjM0XSxbNTQ0LDYzMF1dLFtbNjA3NzUsNzAzMDFdLFsxMTIsLTcyMF1dLFtbNjA4ODcsNjk1ODFdLFstNTMsLTg5XSxbLTU1NiwtMjk2XSxbMjc3LC01OTFdLFstOTIsLTEwMV0sWy00NiwtMTk3XSxbLTIxMiwtODJdLFstNjYsLTIxM10sWy0xMjAsLTE4Ml0sWy0zMTAsOTRdXSxbWzU5NzA5LDY3OTI0XSxbLTksODZdXSxbWzY0MzI3LDY0OTA0XSxbNDksMjldLFsxMSwtMTYyXSxbMjE3LDkzXSxbMjMwLC0xNV0sWzE2OCwtMThdLFsxOTAsNDAwXSxbMjA3LDM3OV0sWzE3NiwzNjRdXSxbWzY1NTc1LDY1OTc0XSxbNTIsLTIwMl1dLFtbNjU2MjcsNjU3NzJdLFszOCwtNDY2XV0sW1s2NTY2NSw2NTMwNl0sWy0xNDIsLTNdLFstMjMsLTM4NF0sWzUwLC04Ml0sWy0xMjYsLTExN10sWy0xLC0yNDFdLFstODEsLTI0NV0sWy03LC0yMzhdXSxbWzY1MzM1LDYzOTk2XSxbLTU2LC0xMjVdLFstODM1LDI5OF0sWy0xMDYsNTk5XSxbLTExLDEzNl1dLFtbNjQxMTMsNjUyMDVdLFstMTgsNDMwXSxbNzUsMzEwXSxbNzYsNjRdLFs4NCwtMTg1XSxbNSwtMzQ2XSxbLTYxLC0zNDhdXSxbWzY0Mjc0LDY1MTMwXSxbLTc3LC00Ml0sWy04NCwxMTddXSxbWzYzMzI2LDY4MjkwXSxbNTgsLTI2MV0sWy0yNSwtMTM1XSxbODksLTQ0NV1dLFtbNjM0NDgsNjc0NDldLFstMTk2LC0xNl0sWy02OSwyODJdLFstMjQ4LDU3XV0sW1s2MjkzNSw2Nzc3Ml0sWzIwNCw1NjddLFsxODcsLTQ5XV0sW1s2MDc3NSw3MDMwMV0sWzYxNSw2MTRdLFsxMDUsNzE1XSxbLTI2LDQzMV0sWzE1MiwxNDZdLFsxNDIsMzY5XV0sW1s2MTc2Myw3MjU3Nl0sWzExOSw5Ml0sWzMyNCwtNzddLFs5NywtMTUwXSxbMTMzLDEwMF1dLFtbNjI0MzYsNzI1NDFdLFsxODAsLTcwNV0sWzE4MiwtMTc3XSxbMjEsLTM0NV0sWy0xMzksLTIwNF0sWy02NSwtNDYxXSxbMTkzLC01NjJdLFszNDAsLTMyNF0sWzE0MywtNDQ5XSxbLTQ2LC00MjhdLFs4OSwwXSxbMywtMzE0XSxbMTUzLC0zMTFdXSxbWzYzNDkwLDY4MjYxXSxbLTE2NCwyOV1dLFtbNjI5MzUsNjc3NzJdLFstNTE2LDQ3XSxbLTc4NCwxMTg4XSxbLTQxMyw0MTRdLFstMzM1LDE2MF1dLFtbNjU2NjUsNjUzMDZdLFsxMjUsLTQwNF0sWzE1NSwtMjE0XSxbMjAzLC03OF0sWzE2NSwtMTA3XSxbMTI1LC0zMzldLFs3NSwtMTk2XSxbMTAwLC03NV0sWy0xLC0xMzJdLFstMTAxLC0zNTJdLFstNDQsLTE2Nl0sWy0xMTcsLTE4OV0sWy0xMDQsLTQwNF0sWy0xMjYsMzFdLFstNTgsLTE0MV0sWy00NCwtMzAwXSxbMzQsLTM5NV0sWy0yNiwtNzJdLFstMTI4LDJdLFstMTc0LC0yMjFdLFstMjcsLTI4OF0sWy02MywtMTI1XSxbLTE3Myw1XSxbLTEwOSwtMTQ5XSxbMSwtMjM4XSxbLTEzNCwtMTY1XSxbLTE1Myw1Nl0sWy0xODYsLTE5OV0sWy0xMjgsLTM0XV0sW1s2NDc1Miw2MDQxN10sWy05MSw0MTNdLFstMjE3LDk3NV1dLFtbNjQ0NDQsNjE4MDVdLFs4MzMsNTkxXSxbMTg1LDExODJdLFstMTI3LDQxOF1dLFtbNjU1NzUsNjU5NzRdLFs4MCwyMDFdLFszNSwtNTFdLFstMjYsLTI0NF0sWy0zNywtMTA4XV0sW1s5NjQ0OCw0MTE5MF0sWzE3NSwtMzM5XSxbLTkyLC03OF0sWy05MywyNTldLFsxMCwxNThdXSxbWzk2MzMwLDQxMzIyXSxbLTM5LDE2M10sWy02LDQ1M10sWzEzMywtMTgyXSxbNDUsLTQ3Nl0sWy03NSw3NF0sWy01OCwtMzJdXSxbWzc4NDk1LDU3NzgwXSxbLTY2LDcxM10sWzE3OCw0OTJdLFszNTksMTEyXSxbMjYxLC04NF1dLFtbNzkyMjcsNTkwMTNdLFsyMjksLTIzMl0sWzEyNiw0MDddLFsyNDYsLTIxN11dLFtbNzk4MjgsNTg5NzFdLFs2NCwtMzk0XSxbLTM0LC03MDhdLFstNDY3LC00NTVdLFsxMjIsLTM1OF0sWy0yOTIsLTQzXSxbLTI0MCwtMjM4XV0sW1s3ODk4MSw1Njc3NV0sWy0yMzMsODddLFstMTEyLDMwN10sWy0xNDEsNjExXV0sW1s3ODQ5NSw1Nzc4MF0sWy0yNDksMjcxXSxbLTIzOCwtMTFdLFs0MSw0NjRdLFstMjQ1LC0zXSxbLTIyLC02NTBdLFstMTUwLC04NjNdLFstOTAsLTUyMl0sWzE5LC00MjhdLFsxODEsLTE4XSxbMTEzLC01MzldLFs1MCwtNTEyXSxbMTU1LC0zMzhdLFsxNjgsLTY5XSxbMTQ0LC0zMDZdXSxbWzc4MzcyLDU0MjU2XSxbLTkxLC0yNDNdLFstMTgzLC03MV0sWy0yMiwzMDRdLFstMjI3LDI1OF0sWy00OCwtMTA1XV0sW1s3NzgwMSw1NDM5OV0sWy0xMTAsMjI3XSxbLTQ3LDI5Ml0sWy0xNDgsMzM0XSxbLTEzNSwyODBdLFstNDUsLTM0N10sWy01MywzMjhdLFszMCwzNjldLFs4Miw1NjZdXSxbWzc3Mzc1LDU2NDQ4XSxbMTM1LDYwN10sWzE1Miw1NTFdLFstMTA4LDUzOV0sWzQsMjc0XSxbLTMyLDMzMF0sWy0xODUsNDcwXSxbLTY2LDI5Nl0sWzk2LDEwOV0sWzEwMSw1MTRdLFstMTEzLDM5MF0sWy0xNzcsNDMxXSxbLTEzNCw1MTldLFsxMTcsMTA3XSxbMTI3LDYzOV0sWzE5NiwyNl0sWzE2MiwyNTZdLFsxNTksMTM3XV0sW1s3NzgwOSw2MjY0M10sWzEyMCwtMTgyXSxbMTYsLTM1NV0sWzE4OCwtMjddLFstNjgsLTYyM10sWzYsLTUzMF0sWzI5MywzNTNdLFs4MywtMTA0XSxbMTYzLDE3XSxbNTYsMjA1XSxbMjEwLC00MF0sWzIxMSwtNDgwXSxbMTgsLTU4M10sWzIyNCwtNTE1XSxbLTEyLC01MDBdLFstOTAsLTI2Nl1dLFtbNzc4MDksNjI2NDNdLFs1OSwyMThdLFsyMzcsMzg0XV0sW1s3ODEwNSw2MzI0NV0sWzI1LC0xMzldLFsxNDgsLTE2XSxbLTQyLDY3Nl0sWzE0NCw4Nl1dLFtbNzgzODAsNjM4NTJdLFsxNjIsLTQ2Nl0sWzEyNSwtNTM3XSxbMzQyLC01XSxbMTA4LC01MTVdLFstMTc4LC0xNTVdLFstODAsLTIxMl0sWzMzMywtMzUzXSxbMjMxLC02OTldLFsxNzUsLTUyMF0sWzIxMCwtNDExXSxbNzAsLTQxOF0sWy01MCwtNTkwXV0sW1s3NzM3NSw1NjQ0OF0sWy0yNyw0MzldLFs4Niw0NTJdLFstOTQsMzUwXSxbMjMsNjQ0XSxbLTExMywzMDZdLFstOTAsNzA3XSxbLTUwLDc0Nl0sWy0xMjEsNDkwXSxbLTE4MywtMjk3XSxbLTMxNSwtNDIxXSxbLTE1Niw1M10sWy0xNzIsMTM4XSxbOTYsNzMyXSxbLTU4LDU1NF0sWy0yMTgsNjgxXSxbMzQsMjEzXSxbLTE2Myw3Nl0sWy0xOTcsNDgxXV0sW1s3NTY1Nyw2Mjc5Ml0sWy0xOCw0NzZdLFs5NywtOTBdLFs2LDQyNF1dLFtbNzU3NDIsNjM2MDJdLFsxMzcsMTQwXSxbLTMwLDI1MV0sWzYzLDIwMV0sWzExLDYxMl0sWzIxNywtMTM1XSxbMTI0LDQ4N10sWzE0LDI4OF0sWzE1Myw0OTZdLFstOCwzMzhdLFszNTksNDA4XSxbMTk5LC0xMDddLFstMjMsMzY0XSxbOTcsMTA4XSxbLTIwLDIyNF1dLFtbNzcwMzUsNjcyNzddLFsxNjIsNDRdLFs5MywtMzQ4XSxbMTIxLC0xNDFdLFs4LC00NTJdLFstMTEsLTQ4N10sWy0yNjMsLTQ5M10sWy0zMywtNzAxXSxbMjkzLDk4XSxbNjYsLTU0NF0sWzE3NiwtMTE1XSxbLTgxLC00OTBdLFsyMDYsLTIyMl0sWzEyMSwtMTA5XSxbMjAzLDE3Ml0sWzksLTI0NF1dLFtbNzgzODAsNjM4NTJdLFsxNDksMTQ1XSxbMjIxLC0zXSxbMjcxLDY4XSxbMjM2LDMxNV0sWzEzNCwtMjIyXSxbMjU0LC0xMDhdLFstNDQsLTM0MF0sWzEzMiwtMjQwXSxbMjgwLC0xNTRdXSxbWzgwMDEzLDYzMzEzXSxbLTM3MSwtNTA1XSxbLTIzMSwtNTU4XSxbLTYxLC00MTBdLFsyMTIsLTYyM10sWzI2MCwtNzcyXSxbMjUyLC0zNjVdLFsxNjksLTQ3NV0sWzEyNywtMTA5M10sWy0zNywtMTAzOV0sWy0yMzIsLTM4OV0sWy0zMTgsLTM4MV0sWy0yMjcsLTQ5Ml0sWy0zNDYsLTU1MF0sWy0xMDEsMzc4XSxbNzgsNDAxXSxbLTIwNiwzMzVdXSxbWzg2MzI3LDc1NTI0XSxbMCwwXV0sW1s4NjMyNyw3NTUyNF0sWy0xMDYsMzZdLFstMTIwLC0yMDBdLFstODMsLTIwMl0sWzEwLC00MjRdLFstMTQzLC0xMzBdLFstNTAsLTEwNV0sWy0xMDQsLTE3NF0sWy0xODUsLTk3XSxbLTEyMSwtMTU5XSxbLTksLTI1Nl0sWy0zMiwtNjVdLFsxMTEsLTk2XSxbMTU3LC0yNTldXSxbWzg1NjUyLDczMzkzXSxbLTQwLC0xNDNdLFstMTE4LC0zOV0sWy0xOTcsLTI5XSxbLTEwOCwtMjY2XSxbLTEyNCwyMV0sWy0xNywtNTRdXSxbWzg1MDQ4LDcyODgzXSxbLTEzNSwxMTJdLFstMzQsLTExMV0sWy04MSwtNDldLFstMTAsMTEyXSxbLTcyLDU0XSxbLTc1LDk0XSxbNzYsMjYwXSxbNjYsNjldLFstMjUsMTA4XSxbNzEsMzE5XSxbLTE4LDk2XSxbLTE2Myw2NV0sWy0xMzEsMTU4XV0sW1s4NDUxNyw3NDE3MF0sWzIyNywzNzldLFszMDYsMzE4XSxbMTkxLDQxOV0sWzEzMSwtMTg1XSxbMjQxLC0yMl0sWy00NCwzMTJdLFs0MjksMjU0XSxbMTExLDMzMV0sWzE3OSwtMzQ4XV0sW1s4NTY1Miw3MzM5M10sWzI0MCwtNjk3XSxbNjgsLTM4M10sWzMsLTY4MV0sWy0xMDUsLTMyNV0sWy0yNTIsLTExM10sWy0yMjIsLTI0NV0sWy0yNTAsLTUxXSxbLTMxLDMyMl0sWzUxLDQ0M10sWy0xMjIsNjE1XSxbMjA2LDk5XSxbLTE5MCw1MDZdXSxbWzgyNDEwLDgwMDU1XSxbLTEzNSwtNDQ2XSxbLTE5NywtNTkwXSxbNzIsLTI0MV0sWzE1Nyw3NF0sWzI3NCwtOTJdLFsyMTQsMjE5XSxbMjIzLC0xODldLFsyNTEsLTQxM10sWy0zMCwtMjEwXSxbLTIxOSw2Nl0sWy00MDQsLTc4XSxbLTE5NSwtMTY4XSxbLTIwNCwtMzkxXSxbLTQyMywtMjI5XSxbLTI3NywtMzEzXSxbLTI4NiwxMjBdLFstMTU2LDUzXSxbLTE0NiwtMzgxXSxbODksLTIyN10sWzQ1LC0xOTVdLFstMTk0LC0xOTldLFstMjAwLC0zMTZdLFstMzI0LC0yMDhdLFstNDE3LC0yMl0sWy00NDgsLTIwNV0sWy0zMjQsLTMxOF0sWy0xMjMsMTg0XSxbLTMzNiwtMV0sWy00MTEsMzU5XSxbLTI3NCw4OF0sWy0zNjksLTgyXSxbLTU3NCwxMzNdLFstMzA2LC0xNF0sWy0xNjMsMzUxXSxbLTEyNyw1NDRdLFstMTcxLDY2XSxbLTMzNiwzNjhdLFstMzc0LDgzXSxbLTMzMCwxMDFdLFstMTAwLDI1Nl0sWzEwNyw2OTBdLFstMTkyLDQ3Nl0sWy0zOTYsMjIyXSxbLTIzMywzMTNdLFstNzMsNDEzXV0sW1s3NTc0Miw2MzYwMl0sWy0xNDcsOTM3XSxbLTc2LC0yXSxbLTQ2LC0zNzddLFstMTUyLDMwNl0sWzg2LDMzNl0sWzEyNCwzNF0sWzEyOCw1MDBdLFstMTYwLDEwMV0sWy0yNTcsLThdLFstMjY1LDgxXSxbLTI0LDQxMF0sWy0xMzMsMzBdLFstMjIwLDI1NV0sWy05OCwtNDAxXSxbMjAwLC0zMTNdLFstMTczLC0yMjBdLFstNjIsLTIxNV0sWzE3MSwtMTU5XSxbLTQ3LC0zNTZdLFs5NiwtNDQ0XSxbNDMsLTQ4Nl1dLFtbNzQ3MzAsNjM2MTFdLFstMzksLTIxNl0sWy0xODksN10sWy0zNDMsLTEyMl0sWzE2LC00NDVdLFstMTQ4LC0zNDldLFstNDAwLC0zOThdLFstMzExLC02OTVdLFstMjA5LC0zNzNdLFstMjc2LC0zODddLFstMSwtMjcxXSxbLTEzOCwtMTQ2XSxbLTI1MSwtMjEyXSxbLTEyOSwtMzFdLFstODQsLTQ1MF0sWzU4LC03NjldLFsxNSwtNDkwXSxbLTExOCwtNTYxXSxbLTEsLTEwMDRdLFstMTQ0LC0yOV0sWy0xMjYsLTQ1MF0sWzg0LC0xOTVdLFstMjUzLC0xNjhdLFstOTMsLTQwMV0sWy0xMTIsLTE3MF0sWy0yNjMsNTUyXSxbLTEyOCw4MjddLFstMTA3LDU5Nl0sWy05NywyNzldLFstMTQ4LDU2OF0sWy02OSw3MzldLFstNDgsMzY5XSxbLTI1Myw4MTFdLFstMTE1LDExNDVdLFstODMsNzU2XSxbMSw3MTZdLFstNTQsNTUzXSxbLTQwNCwtMzUzXSxbLTE5Niw3MF0sWy0zNjIsNzE2XSxbMTMzLDIxNF0sWy04MiwyMzJdLFstMzI2LDUwMV1dLFtbNjg5MzcsNjQ1NzddLFsxODUsMzk1XSxbNjEyLC0yXSxbLTU2LDUwN10sWy0xNTYsMzAwXSxbLTMxLDQ1NV0sWy0xODIsMjY1XSxbMzA2LDYxOV0sWzMyMywtNDVdLFsyOTAsNjIwXSxbMTc0LDU5OV0sWzI3MCw1OTNdLFstNCw0MjFdLFsyMzYsMzQyXSxbLTIyNCwyOTJdLFstOTYsNDAwXSxbLTk5LDUxN10sWzEzNywyNTVdLFs0MjEsLTE0NF0sWzMxMCw4OF0sWzI2OCw0OTZdXSxbWzcxNjIxLDcxNTUwXSxbMjk4LC02OTJdLFstMjgsLTQ4Ml0sWzExMSwtMzAzXSxbLTksLTMwMV0sWy0yMDAsNzldLFs3OCwtNjUxXSxbMjczLC0zNzRdLFszODYsLTQxM11dLFtbNzI1MzAsNjg0MTNdLFstMTc2LC0yNjhdLFstMTA4LC01NTNdLFsyNjksLTIyNF0sWzI2MiwtMjg5XSxbMzYyLC0zMzJdLFszODEsLTc2XSxbMTYwLC0zMDFdLFsyMTUsLTU2XSxbMzM0LC0xMzhdLFsyMzEsMTBdLFszMiwyMzRdLFstMzYsMzc1XSxbMjEsMjU1XV0sW1s3NDQ3Nyw2NzA1MF0sWzE3MCwxMjRdLFsyMywtNDY1XV0sW1s3NDY3MCw2NjcwOV0sWzYsLTExOV0sWzI1MiwtMjI0XSxbMTc1LDkyXSxbMjM0LC0zOV0sWzIyNywxN10sWzIwLDM2M10sWy0xMTMsMTg5XV0sW1s3NTQ3MSw2Njk4OF0sWzIyNCw3NF0sWzI1Miw0MzldLFszMjEsMzc2XSxbMjMzLC0xNDVdLFsxOTgsMjQ5XSxbMTMwLC0zNjddLFstOTQsLTI0OF0sWzMwMCwtODldXSxbWzc1NjU3LDYyNzkyXSxbLTc5LDMwOF0sWy0xNiwzMDFdLFstNTMsMjg1XSxbLTExNiwzNDRdLFstMjU2LDIzXSxbMjUsLTI0M10sWy04NywtMzI5XSxbLTExOCwxMjBdLFstNDEsLTEwOF0sWy03OCw2NV0sWy0xMDgsNTNdXSxbWzc0NjcwLDY2NzA5XSxbMTg0LDQzOV0sWzE1MCwxNTBdLFsxOTgsLTEzN10sWzE0NywtMTRdLFsxMjIsLTE1OV1dLFtbNzI1MzAsNjg0MTNdLFsxMTUsMTQxXSxbMjIzLC0xODJdLFsyODAsLTM4NV0sWzE1NywtODRdLFs5MywtMjg0XSxbMjE2LC0xMTddLFsyMjUsLTI1OV0sWzMxNCwtMTM2XSxbMzI0LC01N11dLFtbNjg5MzcsNjQ1NzddLFstMjAzLDE1MF0sWy04Myw0MjRdLFstMjE1LDQ1MF0sWy01MTIsLTExMV0sWy00NTEsLTExXSxbLTM5MSwtODNdXSxbWzY3MDgyLDY1Mzk2XSxbMTA1LDY4N10sWzQwMCwzMDVdLFstMjMsMjcyXSxbLTEzMyw5Nl0sWy03LDUyMF0sWy0yNjYsMjYwXSxbLTExMiwzNTddLFstMTM3LDMxMF1dLFtbNjY5MDksNjgyMDNdLFs0NjUsLTMwMV0sWzI3OCw4OF0sWzE2NiwtNzVdLFs1NiwxMjldLFsxOTQsLTUyXSxbMzYxLDI0Nl0sWzEwLDUwM10sWzE1NCwzMzRdLFsyMDcsLTFdLFszMSwxNjZdLFsyMTIsNzddLFsxMDMsLTU1XSxbMTA4LDE2Nl0sWy0xNSwzNTVdLFsxMTgsMzU2XSxbMTc3LDE1MF0sWy0xMTAsMzkwXSxbMjY1LC0xOF0sWzc2LDIxM10sWy0xMiwyMjddLFsxMzksMjQ4XSxbLTMyLDI5NF0sWy02NiwyNTBdLFsxNjMsMjU4XSxbMjk4LDEyNF0sWzMxOSw2OF0sWzE0MSwxMDldLFsxNjIsNjddXSxbWzcwODc3LDcyNTE5XSxbMjA1LC0yNzZdLFs4MiwtNDU0XSxbNDU3LC0yMzldXSxbWzY4ODQxLDcyNTI2XSxbODUsLTcyXSxbMjAxLDE4OV0sWzkzLC0xMTRdLFs5MCwyNzFdLFsxNjYsLTEyXSxbNDMsODZdLFsyOSwyMzldLFsxMjAsMjA1XSxbMTUwLC0xMzRdLFstMzAsLTE4MV0sWzg0LC0yOF0sWy0yNiwtNDk2XSxbMTEwLC0xOTRdLFs5NywxMjVdLFsxMjMsNThdLFsxNzMsMjY1XSxbMTkyLC00NF0sWzI4NiwtMV1dLFtbNzA4MjcsNzI2ODhdLFs1MCwtMTY5XV0sW1s2NjkwOSw2ODIwM10sWzI1Miw1MzZdLFstMjMsMzgwXSxbLTIxMCwxMDBdLFstMjIsMzc1XSxbLTkxLDQ3Ml0sWzExOSwzMjNdLFstMTIxLDg3XSxbNzYsNDMwXSxbMTEzLDczNl1dLFtbNjcwMDIsNzE2NDJdLFsyODQsLTIyNF0sWzIwOSw3OV0sWzU4LDI2OF0sWzIxOSw4OV0sWzE1NywxODBdLFs1NSw0NzJdLFsyMzQsMTE0XSxbNDQsMjExXSxbMTMxLC0xNThdLFs4NCwtMTldXSxbWzY5NzI1LDc0MzU3XSxbLTEwMSwtMTgyXSxbLTMwMyw5OF0sWy0yNiwtMzQwXSxbMzAxLDQ2XSxbMzQzLC0xOTJdLFs1MjYsODldXSxbWzcwNDY1LDczODc2XSxbNzAsLTU0Nl0sWzkxLDU5XSxbMTY5LC0xMzRdLFstMTAsLTIzMF0sWzQyLC0zMzddXSxbWzcyMjk0LDc1NjAxXSxbLTM5LC0xMzRdLFstNDM4LC0zMjBdLFstOTksLTIzNF0sWy0zNTYsLTcwXSxbLTEwNSwtMzc4XSxbLTI5NCw4MF0sWy0xOTIsLTExNl0sWy0yNjYsLTI3OV0sWzM5LC0xMzhdLFstNzksLTEzNl1dLFtbNjcwMDIsNzE2NDJdLFstMjQsNDk4XSxbLTIwNywyMV0sWy0zMTgsNTIzXSxbLTIyMSw2NV0sWy0zMDgsMjk5XSxbLTE5Nyw1NV0sWy0xMjIsLTExMF0sWy0xODYsMTddLFstMTk3LC0zMzhdLFstMjQ0LC0xMTRdXSxbWzY0OTc4LDcyNTU4XSxbLTUyLDQxN10sWzQwLDYxOF0sWy0yMTYsMjAwXSxbNzEsNDA1XSxbLTE4NCwzNF0sWzYxLDQ5OF0sWzI2MiwtMTQ1XSxbMjQ0LDE4OV0sWy0yMDIsMzU1XSxbLTgwLDMzOF0sWy0yMjQsLTE1MV0sWy0yOCwtNDMzXSxbLTg3LDM4M11dLFtbNjI0MzYsNzI1NDFdLFstMTUyLDQ3M10sWzU1LDE4M10sWy04Nyw2NzhdLFsxOTAsMTY4XV0sW1s2MjQ0Miw3NDA0M10sWzQ0LC0yMjNdLFsxNDEsLTI3M10sWzE5MCwtNzhdXSxbWzYyODE3LDczNDY5XSxbMTAxLDE3XV0sW1s2MjkxOCw3MzQ4Nl0sWzMyNyw0MzZdLFsxMDQsNDRdLFs4MiwtMTc0XSxbLTk1LC0yOTJdLFsxNzMsLTMwOV0sWzY5LDI5XV0sW1s2MzU3OCw3MzIyMF0sWzg4LC00MzZdLFsyNjMsLTEyM10sWzE5MywtMjk2XSxbMzk1LC0xMDJdLFs0MzQsMTU2XSxbMjcsMTM5XV0sW1s2NzA4Miw2NTM5Nl0sWy01MjMsMTc5XSxbLTMwMywxMzZdLFstMzEzLDc2XSxbLTExOCw3MjVdLFstMTMzLDEwNV0sWy0yMTQsLTEwNl0sWy0yODAsLTI4Nl0sWy0zMzksMTk2XSxbLTI4MSw0NTRdLFstMjY3LDE2OF0sWy0xODYsNTYxXSxbLTIwNSw3ODhdLFstMTQ5LC05Nl0sWy0xNzcsMTk2XSxbLTEwNCwtMjMxXV0sW1s1OTk5OSw3MTA0OV0sWy0yNiw0NTJdLFs2OCwyNDNdXSxbWzYwMDQxLDcxNzQ0XSxbNzQsMTI5XSxbNzUsMTMwXSxbMTUsMzI5XSxbOTEsLTExNV0sWzMwNiwxNjVdLFsxNDcsLTExMl0sWzIyOSwyXSxbMzIwLDIyMl0sWzE0OSwtMTBdLFszMTYsOTJdXSxbWzYyODE3LDczNDY5XSxbLTExMywzNDJdLFsxLDkxXSxbLTEyMywtMl0sWy04MiwxNTldLFstNTgsLTE2XV0sW1s2MjQ0Miw3NDA0M10sWy0xMDksMTcyXSxbLTIwNywxNDddLFsyNywyODhdLFstNDcsMjA4XV0sW1s2MjEwNiw3NDg1OF0sWzM4Niw5Ml1dLFtbNjI0OTIsNzQ5NTBdLFs1NywtMTU1XSxbMTA2LC0xMDNdLFstNTYsLTE0OF0sWzE0OCwtMjAyXSxbLTc4LC0xODldLFsxMTgsLTE2MF0sWzEyNCwtOTddLFs3LC00MTBdXSxbWzU1NzM0LDkxNDA5XSxbMzcxLC0yODldLFs0MzMsLTQwMl0sWzgsLTkxMF0sWzkzLC0yMzBdXSxbWzU2NjM5LDg5NTc4XSxbLTQ3OCwtMTY3XSxbLTI2OSwtNDEzXSxbNDMsLTM2MV0sWy00NDEsLTQ3NV0sWy01MzcsLTUwOV0sWy0yMDIsLTgzMl0sWzE5OCwtNDE2XSxbMjY1LC0zMjhdLFstMjU1LC02NjZdLFstMjg5LC0xMzhdLFstMTA2LC05OTJdLFstMTU3LC01NTRdLFstMzM3LDU3XSxbLTE1OCwtNDY4XSxbLTMyMSwtMjddLFstODksNTU4XSxbLTIzMiw2NzFdLFstMjExLDgzNV1dLFtbNTg4MjksODEzNjJdLFstMjM5LC0zNV0sWy04NSwtMTI5XSxbLTE4LC0yOThdLFstMTExLDU3XSxbLTI1MCwtMjhdLFstNzMsMTM4XSxbLTEwNCwtMTAzXSxbLTEwNSw4Nl0sWy0yMTgsMTJdLFstMzEwLDE0MV0sWy0yODEsNDddLFstMjE1LC0xNF0sWy0xNTIsLTE2MF0sWy0xMzMsLTIzXV0sW1s1NjUzNSw4MTA1M10sWy02LDI2M10sWy04NSwyNzRdLFsxNjYsMTIxXSxbMiwyMzVdLFstNzcsMjI1XSxbLTEyLDI2MV1dLFtbNTY1MjMsODI0MzJdLFsyNjgsLTRdLFszMDIsMjIzXSxbNjQsMzMzXSxbMjI4LDE5MF0sWy0yNiwyNjRdXSxbWzU3MzU5LDgzNDM4XSxbMTY5LDEwMF0sWzI5OCwyMjhdXSxbWzYwNjE3LDc4NDA5XSxbLTIyMiwtNDhdLFstMTg1LC0xOTFdLFstMjYwLC0zMV0sWy0yMzksLTIyMF0sWzE0LC0zMTddXSxbWzU5Mjg3LDc3NzQxXSxbLTM4LDY0XSxbLTQzMiwxNDldLFstMTksMjIxXSxbLTI1NywtNzNdLFstMTAzLC0zMjVdLFstMjE1LC00MzddXSxbWzU4MjIzLDc3MzQwXSxbLTEyNiwxMDFdLFstMTMxLC05NV0sWy0xMjQsMTA5XV0sW1s1Nzg0Miw3NzQ1NV0sWzcwLDY0XSxbNDksMjAzXSxbNzYsMTg4XSxbLTIwLDEwNl0sWzU4LDQ3XSxbMjcsLTgxXSxbMTY0LC0xOF0sWzc0LDQ0XSxbLTUyLDYwXSxbMTksODhdLFstOTcsMTUwXSxbLTQwLDI0N10sWy0xMDEsOTddLFsyMCwyMDBdLFstMTI1LDE1OV0sWy0xMTUsMjJdLFstMjA0LDE4NF0sWy0xODUsLTU4XSxbLTY2LC04N11dLFtbNTczOTQsNzkwNzBdLFstMTE4LDBdLFstNjksLTEzOV0sWy0yMDUsLTU2XSxbLTk1LC05MV0sWy0xMjksMTQ0XSxbLTE3OCwzXSxbLTE3Miw2NV0sWy0xMjAsLTEyN11dLFtbNTYzMDgsNzg4NjldLFstMTksMTU5XSxbLTE1NSwxNjFdXSxbWzU2MTM0LDc5MTg5XSxbNTUsMjM4XSxbNzcsMTU0XV0sW1s1NjI2Niw3OTU4MV0sWzYwLC0zNV0sWy03MSwyNjZdLFsyNTIsNDkxXSxbMTM4LDY5XSxbMjksMTY2XSxbLTEzOSw1MTVdXSxbWzU2MjY2LDc5NTgxXSxbLTI2NCwyMjddLFstMjAwLC04NF0sWy0xMzEsNjFdLFstMTY1LC0xMjddLFstMTQwLDIxMF0sWy0xMTQsLTgxXSxbLTE2LDM2XV0sW1s1NTIzNiw3OTgyM10sWy0xMjcsMjkxXSxbLTIwNywzNl0sWy0yNiwxODVdLFstMTkxLDY2XSxbLTQxLC0xNTNdLFstMTUxLDEyMl0sWzE3LDE2M10sWy0yMDcsNTFdLFstMTMyLDE5MV1dLFtbNTQxNzEsODA3NzVdLFstMTE0LDM3N10sWzIyLDIwNF0sWy02OSwzMTZdLFstMTAxLDIxMF0sWzc3LDE1OF0sWy02NCwzMDBdXSxbWzUzOTIyLDgyMzQwXSxbMTg5LDE3NF0sWzQzNCwyNzNdLFszNTAsMjAwXSxbMjc3LC0xMDBdLFsyMSwtMTQ0XSxbMjY4LC03XV0sW1s1NjMxNCw4MjY3OF0sWzE0MiwtNjRdLFs2NywtMTgyXV0sW1s1NDcxNiw3OTAxMl0sWy0yMSwtMjQxXSxbLTE1NiwtMl0sWzUzLC0xMjhdLFstOTIsLTM4MF1dLFtbNTQ1MDAsNzgyNjFdLFstNTMsLTEwMF0sWy0yNDMsLTE0XSxbLTE0MCwtMTM0XSxbLTIyOSw0NV1dLFtbNTM4MzUsNzgwNThdLFstMzk4LDE1M10sWy02MiwyMDVdLFstMjc0LC0xMDJdLFstMzIsLTExM10sWy0xNjksODRdXSxbWzUyOTAwLDc4Mjg1XSxbLTE0MiwxNl0sWy0xMjUsMTA4XSxbNDIsMTQ1XSxbLTEwLDEwNF1dLFtbNTI2NjUsNzg2NThdLFs4MywzM10sWzE0MSwtMTY0XSxbMzksMTU2XSxbMjQ1LC0yNV0sWzE5OSwxMDZdLFsxMzMsLTE4XSxbODcsLTEyMV0sWzI2LDEwMF0sWy00MCwzODVdLFsxMDAsNzVdLFs5OCwyNzJdXSxbWzUzNzc2LDc5NDU3XSxbMjA2LC0xOTBdLFsxNTcsMjQyXSxbOTgsNDRdLFsyMTUsLTE4MF0sWzEzMSwzMF0sWzEyOCwtMTExXV0sW1s1NDcxMSw3OTI5Ml0sWy0yMywtNzVdLFsyOCwtMjA1XV0sW1s1NjMwOCw3ODg2OV0sWy0xNzAsLTEyM10sWy0xMzEsLTQwMV0sWy0xNjgsLTQwMV0sWy0yMjMsLTExMV1dLFtbNTU2MTYsNzc4MzNdLFstMTczLDI2XSxbLTIxMywtMTU1XV0sW1s1NTIzMCw3NzcwNF0sWy0xMDQsLTg5XSxbLTIyOSwxMTRdLFstMjA4LDI1M10sWy04OCw3M11dLFtbNTQ2MDEsNzgwNTVdLFstNTQsMjAwXSxbLTQ3LDZdXSxbWzU0NzE2LDc5MDEyXSxbMTQxLC0xNTFdLFsxMDMsLTY1XSxbMjMzLDczXSxbMjIsMTE4XSxbMTExLDE4XSxbMTM1LDkyXSxbMzAsLTM4XSxbMTMwLDc0XSxbNjYsMTM5XSxbOTEsMzZdLFsyOTcsLTE4MF0sWzU5LDYxXV0sW1s1Nzg0Miw3NzQ1NV0sWy01MCwyNzBdLFszMCwyNTJdLFstOSwyNTldLFstMTYwLDM1Ml0sWy04OSwyNDldLFstODYsMTc1XSxbLTg0LDU4XV0sW1s1ODIyMyw3NzM0MF0sWzYsLTE1Ml0sWy0xMzUsLTEyOF0sWy04NCw1Nl0sWy03OCwtNzEzXV0sW1s1NzkzMiw3NjQwM10sWy0xNjMsNjJdLFstMjAyLDIxNV0sWy0zMjcsLTEzOF0sWy0xMzgsLTE1MF0sWy00MDgsMzFdLFstMjEzLDkyXSxbLTEwOCwtNDNdLFstODAsMjQzXV0sW1s1NjI5Myw3NjcxNV0sWy01MSwxMDNdLFs2NSw5OV0sWy02OSw3NF0sWy04NywtMTMzXSxbLTE2MiwxNzJdLFstMjIsMjQ0XSxbLTE2OSwxMzldLFstMzEsMTg4XSxbLTE1MSwyMzJdXSxbWzU1OTA3LDgzMTg3XSxbLTU5LDQ5N11dLFtbNTU4NDgsODM2ODRdLFszMTgsMTgxXSxbNDY2LC0zOF0sWzI3Myw1OV0sWzM5LC0xMjNdLFsxNDgsLTM4XSxbMjY3LC0yODddXSxbWzU1ODQ4LDgzNjg0XSxbMTAsNDQ1XSxbMTM2LDM3MV0sWzI2MiwyMDJdLFsyMjEsLTQ0Ml0sWzIyMywxMl0sWzUzLDQ1M11dLFtbNTY3NTMsODQ3MjVdLFsyMzcsMTA1XSxbMTIxLC03M10sWzIzOSwtMjE5XSxbMjI5LC0xXV0sW1s1Njc1Myw4NDcyNV0sWzMyLDM0OV0sWy0xMDIsLTc1XSxbLTE3NiwyMTBdLFstMjQsMzQwXSxbMzUxLDE2NF0sWzM1MCw4Nl0sWzMwMSwtOTddLFsyODcsMTddXSxbWzU0MTcxLDgwNzc1XSxbLTEyNCwtNjJdLFstNzMsNjhdLFstNzAsLTExM10sWy0yMDAsLTExNF0sWy0xMDMsLTE0N10sWy0yMDIsLTEyOV0sWzQ5LC0xNzZdLFszMCwtMjQ5XSxbMTQxLC0xNDJdLFsxNTcsLTI1NF1dLFtbNTI2NjUsNzg2NThdLFstMjk4LDE4MV0sWy01NywtMTI4XSxbLTIzNiw0XV0sW1s1MTcxOCw3OTgwNF0sWzE2LDI1OV0sWy01NiwxMzNdXSxbWzUxNjc4LDgwMTk2XSxbMzIsNDAwXV0sW1s1MTcxMCw4MDU5Nl0sWy00Nyw2MTldLFsxNjcsMF0sWzcwLDIyMl0sWzY5LDU0MV0sWy01MSwyMDBdXSxbWzUxOTE4LDgyMTc4XSxbNTQsMTI1XSxbMjMyLDMyXSxbNTIsLTEzMF0sWzE4OCwyOTFdLFstNjMsMjIyXSxbLTEzLDMzNV1dLFtbNTIzNjgsODMwNTNdLFsyMTAsLTc4XSxbMTc4LDkwXV0sW1s1Mjc1Niw4MzA2NV0sWzQsLTIyOF0sWzI4MSwtMTM4XSxbLTMsLTIxMF0sWzI4MywxMTFdLFsxNTYsMTYyXSxbMzEzLC0yMzNdLFsxMzIsLTE4OV1dLFtbNTc5MzIsNzY0MDNdLFstMTQ0LC0yNDVdLFstMTAxLC00MjJdLFs4OSwtMzM3XV0sW1s1Nzc3Niw3NTM5OV0sWy0yMzksNzldLFstMjgzLC0xODZdXSxbWzU3MjU0LDc1MjkyXSxbLTMsLTI5NF0sWy0yNTIsLTU2XSxbLTE5NiwyMDZdLFstMjIyLC0xNjJdLFstMjA2LDE3XV0sW1s1NjM3NSw3NTAwM10sWy0yMCwzOTFdLFstMTM5LDE4OV1dLFtbNTYyMTYsNzU1ODNdLFs0Niw4NF0sWy0zMCw3MF0sWzQ3LDE4OF0sWzEwNSwxODVdLFstMTM1LDI1NV0sWy0yNCwyMTZdLFs2OCwxMzRdXSxbWzU3MzAyLDcxNDM2XSxbLTM1LC0xNzVdLFstNDAwLC01MF0sWzMsOThdLFstMzM5LDExNV0sWzUyLDI1MV0sWzE1MiwtMTk5XSxbMjE2LDM0XSxbMjA3LC00Ml0sWy03LC0xMDNdLFsxNTEsNzFdXSxbWzU3MjU0LDc1MjkyXSxbMTM1LC0xNTddLFstODYsLTM2OV0sWy02NiwtNjddXSxbWzU3MjM3LDc0Njk5XSxbLTE2OSwxN10sWy0xNDUsNTZdLFstMzM2LC0xNTRdLFsxOTIsLTMzMl0sWy0xNDEsLTk2XSxbLTE1NCwtMV0sWy0xNDcsMzA1XSxbLTUyLC0xMzBdLFs2MiwtMzUzXSxbMTM5LC0yNzddLFstMTA1LC0xMjldLFsxNTUsLTI3M10sWzEzNywtMTcxXSxbNCwtMzM0XSxbLTI1NywxNTddLFs4MiwtMzAyXSxbLTE3NiwtNjJdLFsxMDUsLTUyMV0sWy0xODQsLThdLFstMjI4LDI1N10sWy0xMDQsNDczXSxbLTQ5LDM5M10sWy0xMDgsMjcyXSxbLTE0MywzMzddLFstMTgsMTY4XV0sW1s1NTU5Nyw3Mzk5MV0sWzEyOSwyODddLFsxNiwxOTJdLFs5MSw4NV0sWzUsMTU1XV0sW1s1NTgzOCw3NDcxMF0sWzE4Miw1M10sWzEwNiwxMjldLFsxNTAsLTEyXSxbNDYsMTAzXSxbNTMsMjBdXSxbWzYwMDQxLDcxNzQ0XSxbLTEwMiwyNjhdLFsxMDUsMjIyXSxbLTE2OSwtNTFdLFstMjMzLDEzNl0sWy0xOTEsLTM0MF0sWy00MjEsLTY2XSxbLTIyNSwzMTddLFstMzAwLDIwXSxbLTY0LC0yNDVdLFstMTkyLC03MF0sWy0yNjgsMzE0XSxbLTMwMywtMTFdLFstMTY1LDU4OF0sWy0yMDMsMzI4XSxbMTM1LDQ1OV0sWy0xNzYsMjgzXSxbMzA4LDU2NV0sWzQyOCwyM10sWzExNyw0NDldLFs1MjksLTc4XSxbMzM0LDM4M10sWzMyNCwxNjddLFs0NTksMTNdLFs0ODUsLTQxN10sWzM5OSwtMjI4XSxbMzIzLDkxXSxbMjM5LC01M10sWzMyOCwzMDldXSxbWzYxNTQyLDc1MTIwXSxbMjk2LDI4XSxbMjY4LC0yOTBdXSxbWzU3Nzc2LDc1Mzk5XSxbMzMsLTIyOF0sWzI0MywtMTkwXSxbLTUxLC0xNDVdLFstMzMwLC0zM10sWy0xMTgsLTE4Ml0sWy0yMzIsLTMxOV0sWy04NywyNzZdLFszLDEyMV1dLFtbNTU1OTcsNzM5OTFdLFstNDgsNDFdLFstNSwxMzBdLFstMTU0LDE5OV0sWy0yNCwyODFdLFsyMyw0MDNdLFszOCwxODRdLFstNDcsOTNdXSxbWzU1MzgwLDc1MzIyXSxbLTE4LDE4OF0sWzEyMCwyOTFdLFsxOCwtMTExXSxbNzUsNTJdXSxbWzU1NTc1LDc1NzQyXSxbNTksLTE1OV0sWzY2LC02MF0sWzE5LC0yMTRdXSxbWzU1NzE5LDc1MzA5XSxbLTM1LC0yMDFdLFszOSwtMjU0XSxbMTE1LC0xNDRdXSxbWzU1MjMwLDc3NzA0XSxbNjcsLTIyOV0sWzg5LC0xNjldLFstMTA3LC0yMjJdXSxbWzU1Mjc5LDc3MDg0XSxbLTEyNiwxMzFdLFstMTkyLC04XSxbLTIzOSw5OF0sWy0xMzAsLTEzXSxbLTYwLC0xMjNdLFstOTksMTM2XSxbLTU5LC0yNDVdLFsxMzYsLTI3N10sWzYxLC0xODNdLFsxMjcsLTIyMV0sWzEwNiwtMTMwXSxbMTA1LC0yNDddLFsyNDYsLTIyNF1dLFtbNTUxNTUsNzU3NzhdLFstMzEsLTEwMF1dLFtbNTUxMjQsNzU2NzhdLFstMjYxLDIxOF0sWy0xNjEsMjEzXSxbLTI1NCwxNzZdLFstMjMzLDQzNF0sWzU2LDQ1XSxbLTEyNywyNDhdLFstNSwyMDBdLFstMTc5LDkzXSxbLTg1LC0yNTVdLFstODIsMTk4XSxbNiwyMDVdLFsxMCw5XV0sW1s1MzgwOSw3NzQ2Ml0sWzE5NCwtMjBdLFs1MSwxMDBdLFs5NCwtOTddLFsxMDksLTExXSxbLTEsMTY1XSxbOTcsNjBdLFsyNywyMzldLFsyMjEsMTU3XV0sW1s1MjkwMCw3ODI4NV0sWy0yMiwtMjQyXSxbLTEyMiwtMTAwXSxbLTIwNiw3NV0sWy02MCwtMjM5XSxbLTEzMiwtMTldLFstNDgsOTRdLFstMTU2LC0yMDBdLFstMTM0LC0yOF0sWy0xMjAsMTI2XV0sW1s1MTU3Niw3OTg0M10sWzMwLDMzMV0sWzcyLDIyXV0sW1s1MDY5OCw4MDc5OV0sWzIyMiwxMTddXSxbWzUwOTIwLDgwOTE2XSxbMjA0LC00N10sWzI1NywxMjNdLFsxNzYsLTI1OF0sWzE1MywtMTM4XV0sW1s1MDkyMCw4MDkxNl0sWzE0MywxNjJdLFsyNDQsODY5XSxbMzgwLDI0OF0sWzIzMSwtMTddXSxbWzQ3NDkwLDc1MzI0XSxbMTAxLDE1MF0sWzExMyw4Nl0sWzcwLC0yODldLFsxNjQsMF0sWzQ3LDc1XSxbMTYyLC0yMV0sWzc4LC0yOTZdLFstMTI5LC0xNjBdLFstMywtNDYxXSxbLTQ1LC04Nl0sWy0xMSwtMjgwXSxbLTEyMCwtNDhdLFsxMTEsLTM1NV0sWy03NywtMzg4XSxbOTYsLTE3NV0sWy0zOCwtMTYxXSxbLTEwMywtMjIyXSxbMjMsLTE5NV1dLFtbNDc5MjksNzI0OThdLFstMTEyLC0xNTNdLFstMTQ2LDgzXSxbLTE0MywtNjVdLFs0Miw0NjJdLFstMjYsMzYzXSxbLTEyNCw1NV0sWy02NywyMjRdLFsyMiwzODZdLFsxMTEsMjE1XSxbMjAsMjM5XSxbNTgsMzU1XSxbLTYsMjUwXSxbLTU2LDIxMl0sWy0xMiwyMDBdXSxbWzQ3NDkwLDc1MzI0XSxbMTQsNDIwXSxbLTExNCwyNTddLFszOTMsNDI2XSxbMzQwLC0xMDZdLFszNzMsM10sWzI5NiwtMTAxXSxbMjMwLDMxXSxbNDQ5LC0xOV1dLFtbNTA4MjksNzU2NzRdLFsxNSwtMzQ0XSxbLTI2MywtMzkzXSxbLTM1NiwtMTI1XSxbLTI1LC0xOTldLFstMTcxLC0zMjddLFstMTA3LC00ODFdLFsxMDgsLTMzOF0sWy0xNjAsLTI2M10sWy02MCwtMzg0XSxbLTIxMCwtMTE4XSxbLTE5NywtNDU0XSxbLTM1MiwtOV0sWy0yNjUsMTFdLFstMTc0LC0yMDldLFstMTA2LC0yMjNdLFstMTM2LDQ5XSxbLTEwMywxOTldLFstNzksMzQwXSxbLTI1OSw5Ml1dLFtbNDgyNzgsODI0MDZdLFs0NiwtNDIyXSxbLTIxMCwtNTI4XSxbLTQ5MywtMzQ5XSxbLTM5Myw4OV0sWzIyNSw2MTddLFstMTQ1LDYwMV0sWzM3OCw0NjNdLFsyMTAsMjc2XV0sW1s0Nzg5Niw4MzE1M10sWzU3LC0zMTddLFstNTcsLTMxN10sWzE3Miw5XSxbMjEwLC0xMjJdXSxbWzk2MDQ5LDM4MTI1XSxbMjI4LC0zNjZdLFsxNDQsLTI3Ml0sWy0xMDUsLTE0Ml0sWy0xNTMsMTYwXSxbLTE5OSwyNjZdLFstMTc5LDMxM10sWy0xODQsNDE2XSxbLTM4LDIwMV0sWzExOSwtOV0sWzE1NiwtMjAxXSxbMTIyLC0yMDBdLFs4OSwtMTY2XV0sW1s5NTAzMiw0NDM4Nl0sWzc4LC0yMDNdLFstMTk0LDRdLFstMTA2LDM2M10sWzE2NiwtMTQyXSxbNTYsLTIyXV0sW1s5NDkxMCw0NDkwOF0sWy00MiwtMTA5XSxbLTIwNiw1MTJdLFstNTcsMzUzXSxbOTQsMF0sWzEwMCwtNDczXSxbMTExLC0yODNdXSxbWzk0NjgwLDQ0NzQ3XSxbLTEwOCwtMTRdLFstMTcwLDYwXSxbLTU4LDkxXSxbMTcsMjM1XSxbMTgzLC05M10sWzkxLC0xMjRdLFs0NSwtMTU1XV0sW1s5NDM0NCw0NTg0MV0sWzY1LC0xODddLFsxMiwtMTE5XSxbLTIxOCwyNTFdLFstMTUyLDIxMl0sWy0xMDQsMTk3XSxbNDEsNjBdLFsxMjgsLTE0Ml0sWzIyOCwtMjcyXV0sW1s5MzY0OSw0NjQzMV0sWzExMSwtMTkzXSxbLTU2LC0zM10sWy0xMjEsMTM0XSxbLTExNCwyNDNdLFsxNCw5OV0sWzE2NiwtMjUwXV0sW1s5OTEzNCwyNjkwOF0sWy0xMDUsLTMxOV0sWy0xMzgsLTQwNF0sWy0yMTQsLTIzNl0sWy00OCwxNTVdLFstMTE2LDg1XSxbMTYwLDQ4Nl0sWy05MSwzMjZdLFstMjk5LDIzNl0sWzgsMjE0XSxbMjAxLDIwNl0sWzQ3LDQ1NV0sWy0xMywzODJdLFstMTEzLDM5Nl0sWzgsMTA0XSxbLTEzMywyNDRdLFstMjE4LDUyM10sWy0xMTcsNDE4XSxbMTA0LDQ2XSxbMTUxLC0zMjhdLFsyMTYsLTE1M10sWzc4LC01MjZdLFsyMDIsLTYyMl0sWzUsNDAzXSxbMTI2LC0xNjFdLFs0MSwtNDQ3XSxbMjI0LC0xOTJdLFsxODgsLTQ4XSxbMTU4LDIyNl0sWzE0MSwtNjldLFstNjcsLTUyNF0sWy04NSwtMzQ1XSxbLTIxMiwxMl0sWy03NCwtMTc5XSxbMjYsLTI1NF0sWy00MSwtMTEwXV0sW1s5NzEyOSwyNDg0Nl0sWzIzOCwzMTBdLFsxNjcsMzA2XSxbMTIzLDQ0MV0sWzEwNiwxNDldLFs0MSwzMzBdLFsxOTUsMjczXSxbNjEsLTI1MV0sWzYzLC0yNDRdLFsxOTgsMjM5XSxbODAsLTI0OV0sWzAsLTI0OV0sWy0xMDMsLTI3NF0sWy0xODIsLTQzNV0sWy0xNDIsLTIzOF0sWzEwMywtMjg0XSxbLTIxNCwtN10sWy0yMzgsLTIyM10sWy03NSwtMzg3XSxbLTE1NywtNTk3XSxbLTIxOSwtMjY0XSxbLTEzOCwtMTY5XSxbLTI1NiwxM10sWy0xODAsMTk0XSxbLTMwMiw0Ml0sWy00NiwyMTddLFsxNDksNDM4XSxbMzQ5LDU4M10sWzE3OSwxMTFdLFsyMDAsMjI1XV0sW1s5MTAyNCwyNjQ2OV0sWzE2NiwtMzldLFsyMCwtNzAyXSxbLTk1LC0yMDNdLFstMjksLTQ3Nl0sWy05NywxNjJdLFstMTkzLC00MTJdLFstNTcsMzJdLFstMTcxLDE5XSxbLTE3MSw1MDVdLFstMzgsMzkwXSxbLTE2MCw1MTVdLFs3LDI3MV0sWzE4MSwtNTJdLFsyNjksLTIwNF0sWzE1MSw4MV0sWzIxNywxMTNdXSxbWzg1MDQwLDMxNTQ2XSxbLTI5NCwtMzAzXSxbLTI0MSwtMTM3XSxbLTUzLC0zMDldLFstMTAzLC0yNDBdLFstMjM2LC0xNV0sWy0xNzQsLTUyXSxbLTI0NiwxMDddLFstMTk5LC02NF0sWy0xOTEsLTI3XSxbLTE2NSwtMzE1XSxbLTgxLDI2XSxbLTE0MCwtMTY3XSxbLTEzMywtMTg3XSxbLTIwMywyM10sWy0xODYsMF0sWy0yOTUsMzc3XSxbLTE0OSwxMTNdLFs2LDMzOF0sWzEzOCw4MV0sWzQ3LDEzNF0sWy0xMCwyMTJdLFszNCw0MTFdLFstMzEsMzUwXSxbLTE0Nyw1OThdLFstNDUsMzM3XSxbMTIsMzM2XSxbLTExMSwzODVdLFstNywxNzRdLFstMTIzLDIzNV0sWy0zNSw0NjNdLFstMTU4LDQ2N10sWy0zOSwyNTJdLFsxMjIsLTI1NV0sWy05Myw1NDhdLFsxMzcsLTE3MV0sWzgzLC0yMjldLFstNSwzMDNdLFstMTM4LDQ2NV0sWy0yNiwxODZdLFstNjUsMTc3XSxbMzEsMzQxXSxbNTYsMTQ2XSxbMzgsMjk1XSxbLTI5LDM0Nl0sWzExNCw0MjVdLFsyMSwtNDUwXSxbMTE4LDQwNl0sWzIyNSwxOThdLFsxMzYsMjUyXSxbMjEyLDIxN10sWzEyNiw0Nl0sWzc3LC03M10sWzIxOSwyMjBdLFsxNjgsNjZdLFs0MiwxMjldLFs3NCw1NF0sWzE1MywtMTRdLFsyOTIsMTczXSxbMTUxLDI2Ml0sWzcxLDMxNl0sWzE2MywzMDBdLFsxMywyMzZdLFs3LDMyMV0sWzE5NCw1MDJdLFsxMTcsLTUxMF0sWzExOSwxMThdLFstOTksMjc5XSxbODcsMjg3XSxbMTIyLC0xMjhdLFszNCw0NDldLFsxNTIsMjkxXSxbNjcsMjMzXSxbMTQwLDEwMV0sWzQsMTY1XSxbMTIyLC02OV0sWzUsMTQ4XSxbMTIyLDg1XSxbMTM0LDgwXSxbMjA1LC0yNzFdLFsxNTUsLTM1MF0sWzE3MywtNF0sWzE3NywtNTZdLFstNTksMzI1XSxbMTMzLDQ3M10sWzEyNiwxNTVdLFstNDQsMTQ3XSxbMTIxLDMzOF0sWzE2OCwyMDhdLFsxNDIsLTcwXSxbMjM0LDExMV0sWy01LDMwMl0sWy0yMDQsMTk1XSxbMTQ4LDg2XSxbMTg0LC0xNDddLFsxNDgsLTI0Ml0sWzIzNCwtMTUxXSxbNzksNjBdLFsxNzIsLTE4Ml0sWzE2MiwxNjldLFsxMDUsLTUxXSxbNjUsMTEzXSxbMTI3LC0yOTJdLFstNzQsLTMxNl0sWy0xMDUsLTIzOV0sWy05NiwtMjBdLFszMiwtMjM2XSxbLTgxLC0yOTVdLFstOTksLTI5MV0sWzIwLC0xNjZdLFsyMjEsLTMyN10sWzIxNCwtMTg5XSxbMTQzLC0yMDRdLFsyMDEsLTM1MF0sWzc4LDFdLFsxNDUsLTE1MV0sWzQzLC0xODNdLFsyNjUsLTIwMF0sWzE4MywyMDJdLFs1NSwzMTddLFs1NiwyNjJdLFszNCwzMjRdLFs4NSw0NzBdLFstMzksMjg2XSxbMjAsMTcxXSxbLTMyLDMzOV0sWzM3LDQ0NV0sWzUzLDEyMF0sWy00MywxOTddLFs2NywzMTNdLFs1MiwzMjVdLFs3LDE2OF0sWzEwNCwyMjJdLFs3OCwtMjg5XSxbMTksLTM3MV0sWzcwLC03MV0sWzExLC0yNDldLFsxMDEsLTMwMF0sWzIxLC0zMzVdLFstMTAsLTIxNF0sWzEwMCwtNDY0XSxbMTc5LDIyM10sWzkyLC0yNTBdLFsxMzMsLTIzMV0sWy0yOSwtMjYyXSxbNjAsLTUwNl0sWzQyLC0yOTVdLFs3MCwtNzJdLFs3NSwtNTA1XSxbLTI3LC0zMDddLFs5MCwtNDAwXSxbMzAxLC0zMDldLFsxOTcsLTI4MV0sWzE4NiwtMjU3XSxbLTM3LC0xNDNdLFsxNTksLTM3MV0sWzEwOCwtNjM5XSxbMTExLDEzMF0sWzExMywtMjU2XSxbNjgsOTFdLFs0OCwtNjI2XSxbMTk3LC0zNjNdLFsxMjksLTIyNl0sWzIxNywtNDc4XSxbNzgsLTQ3NV0sWzcsLTMzN10sWy0xOSwtMzY1XSxbMTMyLC01MDJdLFstMTYsLTUyM10sWy00OCwtMjc0XSxbLTc1LC01MjddLFs2LC0zMzldLFstNTUsLTQyM10sWy0xMjMsLTUzOF0sWy0yMDUsLTI5MF0sWy0xMDIsLTQ1OF0sWy05MywtMjkyXSxbLTgyLC01MTBdLFstMTA3LC0yOTRdLFstNzAsLTQ0Ml0sWy0zNiwtNDA3XSxbMTQsLTE4N10sWy0xNTksLTIwNV0sWy0zMTEsLTIyXSxbLTI1NywtMjQyXSxbLTEyNywtMjI5XSxbLTE2OCwtMjU0XSxbLTIzMCwyNjJdLFstMTcwLDEwNF0sWzQzLDMwOF0sWy0xNTIsLTExMl0sWy0yNDMsLTQyOF0sWy0yNDAsMTYwXSxbLTE1OCw5NF0sWy0xNTksNDJdLFstMjY5LDE3MV0sWy0xNzksMzY0XSxbLTUyLDQ0OV0sWy02NCwyOThdLFstMTM3LDI0MF0sWy0yNjcsNzFdLFs5MSwyODddLFstNjcsNDM4XSxbLTEzNiwtNDA4XSxbLTI0NywtMTA5XSxbMTQ2LDMyN10sWzQyLDM0MV0sWzEwNywyODldLFstMjIsNDM4XSxbLTIyNiwtNTA0XSxbLTE3NCwtMjAyXSxbLTEwNiwtNDcwXSxbLTIxNywyNDNdLFs5LDMxM10sWy0xNzQsNDI5XSxbLTE0NywyMjFdLFs1MiwxMzddLFstMzU2LDM1OF0sWy0xOTUsMTddLFstMjY3LDI4N10sWy00OTgsLTU2XSxbLTM1OSwtMjExXSxbLTMxNywtMTk3XSxbLTI2NSwzOV1dLFtbNzI3MTgsNTUwMjRdLFstNDIsLTYxNV0sWy0xMTYsLTE2OF0sWy0yNDIsLTEzNV0sWy0xMzIsNDcwXSxbLTQ5LDg0OV0sWzEyNiw5NTldLFsxOTIsLTMyOF0sWzEyOSwtNDE2XSxbMTM0LC02MTZdXSxbWzgwNDA5LDYxMzMxXSxbLTIyOCwxODNdLFstOCw1MDldLFsxMzcsMjY3XSxbMzA0LDE2Nl0sWzE1OSwtMTRdLFs2MiwtMjI2XSxbLTEyMiwtMjYwXSxbLTY0LC0zNDFdLFstMjQwLC0yODRdXSxbWzg0NTE3LDc0MTcwXSxbLTM4OCwtMTcxXSxbLTIwNCwtMjc3XSxbLTMwMCwtMTYxXSxbMTQ4LDI3NF0sWy01OCwyMzBdLFsyMjAsMzk3XSxbLTE0NywzMTBdLFstMjQyLC0yMDldLFstMzE0LC00MTFdLFstMTcxLC0zODFdLFstMjcyLC0yOV0sWy0xNDIsLTI3NV0sWzE0NywtNDAwXSxbMjI3LC05N10sWzksLTI2NV0sWzIyMCwtMTczXSxbMzExLDQyMl0sWzI0NywtMjMwXSxbMTc5LC0xNV0sWzQ1LC0zMTBdLFstMzkzLC0xNjVdLFstMTMwLC0zMTldLFstMjcwLC0yOTZdLFstMTQyLC00MTRdLFsyOTksLTMyNV0sWzEwOSwtNTgxXSxbMTY5LC01NDFdLFsxODksLTQ1NF0sWy01LC00MzldLFstMTc0LC0xNjFdLFs2NiwtMzE1XSxbMTY0LC0xODRdLFstNDMsLTQ4MV0sWy03MSwtNDY4XSxbLTE1NSwtNTNdLFstMjAzLC02NDBdLFstMjI1LC03NzVdLFstMjU4LC03MDVdLFstMzgyLC01NDVdLFstMzg2LC00OThdLFstMzEzLC02OF0sWy0xNzAsLTI2Ml0sWy05NiwxOTJdLFstMTU3LC0yOTRdLFstMzg4LC0yOTZdLFstMjk0LC05MF0sWy05NSwtNjI0XSxbLTE1NCwtMzVdLFstNzMsNDI5XSxbNjYsMjI4XSxbLTM3MywxODldLFstMTMxLC05Nl1dLFtbODM4MjYsNjQ5OTJdLFstMTY3LC05NDddLFstMTE5LC00ODVdLFstMTQ2LDQ5OV0sWy0zMiw0MzhdLFsxNjMsNTgxXSxbMjIzLDQ0N10sWzEyNywtMTc2XSxbLTQ5LC0zNTddXSxbWzUzODM1LDc4MDU4XSxbLTMxLC0yOTFdLFs2NywtMjUxXV0sW1s1Mzg3MSw3NzUxNl0sWy0yMjEsODZdLFstMjI2LC0yMTBdLFsxNSwtMjkzXSxbLTM0LC0xNjhdLFs5MSwtMzAxXSxbMjYxLC0yOThdLFsxNDAsLTQ4OF0sWzMwOSwtNDc2XSxbMjE3LDNdLFs2OCwtMTMwXSxbLTc4LC0xMThdLFsyNDksLTIxNF0sWzIwNCwtMTc4XSxbMjM4LC0zMDhdLFsyOSwtMTExXSxbLTUyLC0yMTFdLFstMTU0LDI3Nl0sWy0yNDIsOTddLFstMTE2LC0zODJdLFsyMDAsLTIxOV0sWy0zMywtMzA5XSxbLTExNiwtMzVdLFstMTQ4LC01MDZdLFstMTE2LC00Nl0sWzEsMTgxXSxbNTcsMzE3XSxbNjAsMTI2XSxbLTEwOCwzNDJdLFstODUsMjk4XSxbLTExNSw3NF0sWy04MiwyNTVdLFstMTc5LDEwN10sWy0xMjAsMjM4XSxbLTIwNiwzOF0sWy0yMTcsMjY3XSxbLTI1NCwzODRdLFstMTg5LDM0MF0sWy04Niw1ODVdLFstMTM4LDY4XSxbLTIyNiwxOTVdLFstMTI4LC04MF0sWy0xNjEsLTI3NF0sWy0xMTUsLTQzXV0sW1s1NDEwMCw3MzExNl0sWzIxMSw1MV0sWy0xMDAsLTQ2NV0sWzQxLC0xODNdLFstNTgsLTMwM10sWy0yMTMsMjIyXSxbLTE0MSw2NF0sWy0zODcsMzAwXSxbMzgsMzA0XSxbMzI1LC01NF0sWzI4NCw2NF1dLFtbNTI0MTksNzQ3NDRdLFsxMzksMTgzXSxbMTY2LC00MTldLFstMzksLTc4Ml0sWy0xMjYsMzhdLFstMTEzLC0xOTddLFstMTA1LDE1Nl0sWy0xMSw3MTNdLFstNjQsMzM4XSxbMTUzLC0zMF1dLFtbNTIzNjgsODMwNTNdLFstMTEzLDMyOF0sWy04LDYwNF0sWzQ2LDE1OV0sWzgwLDE3N10sWzI0NCwzN10sWzk4LDE2M10sWzIyMywxNjddLFstOSwtMzA0XSxbLTgyLC0xOTJdLFszMywtMTY2XSxbMTUxLC04OV0sWy02OCwtMjIzXSxbLTgzLDY0XSxbLTIwMCwtNDI1XSxbNzYsLTI4OF1dLFtbNTM0MzYsODM3MzFdLFs4OCwtMjk2XSxbLTE2NiwtNDc4XSxbLTI5MSwzMzNdLFstMzksMjQ2XSxbNDA4LDE5NV1dLFtbNDc4OTYsODMxNTNdLFsyMzMsMjRdLFsyOTgsLTM2NV0sWy0xNDksLTQwNl1dLFtbNDkxNDAsODIxMzJdLFsxLDBdLFs0MCwzNDNdLFstMTg2LDM2NF0sWy00LDhdLFstMzM3LDEwNF0sWy02NiwxNjBdLFsxMDEsMjY0XSxbLTkyLDE2M10sWy0xNDksLTI3OV0sWy0xNyw1NjldLFstMTQwLDMwMV0sWzEwMSw2MTFdLFsyMTYsNDgwXSxbMjIyLC00N10sWzMzNSw0OV0sWy0yOTcsLTYzOV0sWzI4Myw4MV0sWzMwNCwtM10sWy03MiwtNDgxXSxbLTI1MCwtNTMwXSxbMjg3LC0zOF0sWzIyLC02Ml0sWzI0OCwtNjk3XSxbMTkwLC05NV0sWzE3MSwtNjczXSxbNzksLTIzM10sWzMzNywtMTEzXSxbLTM0LC0zNzhdLFstMTQyLC0xNzNdLFsxMTEsLTMwNV0sWy0yNTAsLTMxMF0sWy0zNzEsNl0sWy00NzMsLTE2M10sWy0xMzAsMTE2XSxbLTE4MywtMjc2XSxbLTI1Nyw2N10sWy0xOTUsLTIyNl0sWy0xNDgsMTE4XSxbNDA3LDYyMV0sWzI0OSwxMjddLFstMiwxXSxbLTQzNCw5OF0sWy03OSwyMzVdLFsyOTEsMTgzXSxbLTE1MiwzMTldLFs1MiwzODddLFs0MTMsLTU0XV0sW1s0NTk2OSw4OTg0M10sWy02NCwtMzgyXSxbMzE0LC00MDNdLFstMzYxLC00NTFdLFstODAxLC00MDVdLFstMjQwLC0xMDddLFstMzY1LDg3XSxbLTc3NSwxODddLFsyNzMsMjYxXSxbLTYwNSwyODldLFs0OTIsMTE0XSxbLTEyLDE3NF0sWy01ODMsMTM3XSxbMTg4LDM4NV0sWzQyMSw4N10sWzQzMywtNDAwXSxbNDIyLDMyMV0sWzM0OSwtMTY3XSxbNDUzLDMxNV0sWzQ2MSwtNDJdXSxbWzYzNDk1LDc1MjgxXSxbMTQ2LC0zMTFdLFsxNDEsLTQxOV0sWzEzMCwtMjhdLFs4NSwtMTU5XSxbLTIyOCwtNDddLFstNDksLTQ1OV0sWy00OCwtMjA3XSxbLTEwMSwtMTM4XSxbNywtMjkzXV0sW1s2MjQ5Miw3NDk1MF0sWzY4LDk2XSxbMjA3LC0xNjldLFsxNDksLTM2XSxbMzgsNzBdLFstMTM2LDMxOV0sWzcyLDgyXV0sW1s2MTU0Miw3NTEyMF0sWzQyLDI1Ml0sWy03MCw0MDNdLFstMTYwLDIxOF0sWy0xNTQsNjhdLFstMTAyLDE4MV1dLFtbODM1NjQsNTgwODZdLFstMTQyLDQ1MF0sWzIzOCwtMjJdLFs5NywtMjEzXSxbLTc0LC01MTBdLFstMTE5LDI5NV1dLFtbODQwNTEsNTY0NzddLFs3MCwxNjVdLFszMCwzNjddLFsxNTMsMzVdLFstNDQsLTM5OF0sWzIwNSw1NzBdLFstMjYsLTU2M10sWy0xMDAsLTE5NV0sWy04NywtMzczXSxbLTg3LC0xNzVdLFstMTcxLDQwOV0sWzU3LDE1OF1dLFtbODUxMDQsNTU1NTFdLFsyOCwtMzkyXSxbMTYsLTMzMl0sWy05NCwtNTQwXSxbLTEwMiw2MDJdLFstMTMwLC0zMDBdLFs4OSwtNDM1XSxbLTc5LC0yNzddLFstMzI3LDM0M10sWy03OCw0MjhdLFs4NCwyODBdLFstMTc2LDI4MF0sWy04NywtMjQ1XSxbLTEzMSwyM10sWy0yMDUsLTMzMF0sWy00NiwxNzNdLFsxMDksNDk4XSxbMTc1LDE2Nl0sWzE1MSwyMjNdLFs5OCwtMjY4XSxbMjEyLDE2Ml0sWzQ1LDI2NF0sWzE5NiwxNV0sWy0xNiw0NTddLFsyMjUsLTI4MF0sWzIzLC0yOTddLFsyMCwtMjE4XV0sW1s4MjkxNyw1NjA4NF0sWy0zNjksLTU2MV0sWzEzNiw0MTRdLFsyMDAsMzY0XSxbMTY3LDQwOV0sWzE0Niw1ODddLFs0OSwtNDgyXSxbLTE4MywtMzI1XSxbLTE0NiwtNDA2XV0sW1s4Mzk4Miw2MTM0N10sWy00NiwtMjQ1XSxbOTUsLTQyM10sWy03MywtNDkxXSxbLTE2NCwtMTk2XSxbLTQzLC00NzZdLFs2MiwtNDcxXSxbMTQ3LC02NV0sWzEyMyw3MF0sWzM0NywtMzI4XSxbLTI3LC0zMjFdLFs5MSwtMTQyXSxbLTI5LC0yNzJdLFstMjE2LDI5MF0sWy0xMDMsMzEwXSxbLTcxLC0yMTddLFstMTc3LDM1NF0sWy0yNTMsLTg3XSxbLTEzOCwxMzBdLFsxNCwyNDRdLFs4NywxNTFdLFstODMsMTM2XSxbLTM2LC0yMTNdLFstMTM3LDM0MF0sWy00MSwyNTddLFstMTEsNTY2XSxbMTEyLC0xOTVdLFsyOSw5MjVdLFs5MCw1MzVdLFsxNjksLTFdLFsxNzEsLTE2OF0sWzg1LDE1M10sWzI2LC0xNTBdXSxbWzgzODk5LDU3MzI0XSxbLTQzLDI4Ml0sWzE2NiwtMTgzXSxbMTc3LDFdLFstNSwtMjQ3XSxbLTEyOSwtMjUxXSxbLTE3NiwtMTc4XSxbLTEwLDI3NV0sWzIwLDMwMV1dLFtbODQ4NjEsNTc3NjZdLFs3OCwtNjYwXSxbLTIxNCwxNTddLFs1LC0xOTldLFs2OCwtMzY0XSxbLTEzMiwtMTMzXSxbLTExLDQxNl0sWy04NCwzMV0sWy00MywzNTddLFsxNjMsLTQ3XSxbLTQsMjI0XSxbLTE2OSw0NTFdLFsyNjYsLTEzXSxbNzcsLTIyMF1dLFtbNzgzNzIsNTQyNTZdLFs2NCwtNTZdLFsxNjQsLTM1Nl0sWzExNiwtMzk2XSxbMTYsLTM5OF0sWy0yOSwtMjY5XSxbMjcsLTIwM10sWzIwLC0zNDldLFs5OCwtMTYzXSxbMTA5LC01MjNdLFstNSwtMTk5XSxbLTE5NywtNDBdLFstMjYzLDQzOF0sWy0zMjksNDY5XSxbLTMyLDMwMV0sWy0xNjEsMzk1XSxbLTM4LDQ4OV0sWy0xMDAsMzIyXSxbMzAsNDMxXSxbLTYxLDI1MF1dLFtbODA0NjEsNTE3NjVdLFsyMDQsLTIwMl0sWzIxNCwxMTBdLFs1Niw1MDBdLFsxMTksMTEyXSxbMzMzLDEyOF0sWzE5OSw0NjddLFsxMzcsMzc0XV0sW1s4MTcyMyw1MzI1NF0sWzEyNiwtMzA3XSxbNTgsMjAyXSxbMTMzLC0xOV0sWzE2LDM3N10sWzEzLDI5MV1dLFtbODIwNjksNTM3OThdLFsyMTQsNDExXSxbMTQwLDQ2Ml0sWzExMiwyXSxbMTQzLC0yOTldLFsxMywtMjU3XSxbMTgzLC0xNjVdLFsyMzEsLTE3N10sWy0yMCwtMjMyXSxbLTE4NiwtMjldLFs1MCwtMjg5XSxbLTIwNSwtMjAxXV0sW1s4MTcyMyw1MzI1NF0sWzExMCwyMjFdLFsyMzYsMzIzXV0sW1s1MzgwOSw3NzQ2Ml0sWzYyLDU0XV0sW1s1Nzc5Nyw4NjMyNl0sWy01MDQsLTQ3XSxbLTQ4OSwtMjE2XSxbLTQ1MiwtMTI1XSxbLTE2MSwzMjNdLFstMjY5LDE5M10sWzYyLDU4Ml0sWy0xMzUsNTMzXSxbMTMzLDM0NV0sWzI1MiwzNzFdLFs2MzUsNjQwXSxbMTg1LDEyNF0sWy0yOCwyNTBdLFstMzg3LDI3OV1dLFtbNTQ3MTEsNzkyOTJdLFszOSwxMzBdLFsxMjMsLTEwXSxbOTUsNjFdLFs3LDU1XSxbNTQsMjhdLFsxOCwxMzRdLFs2NCwyNl0sWzQzLDEwNl0sWzgyLDFdXSxbWzYwNjY5LDYxMjEzXSxbMTYxLC02ODRdLFs3NywtNTQyXSxbMTUyLC0yODhdLFszNzksLTU1OF0sWzE1NCwtMzM2XSxbMTUxLC0zNDFdLFs4NywtMjAzXSxbMTM2LC0xNzhdXSxbWzYxOTY2LDU4MDgzXSxbLTgzLC0xNDRdLFstMTE5LDUxXV0sW1s2MTc2NCw1Nzk5MF0sWy05NSwxOTFdLFstMTE0LDM0Nl0sWy0xMjQsMTkwXSxbLTcxLDIwNF0sWy0yNDIsMjM3XSxbLTE5MSw3XSxbLTY3LDEyNF0sWy0xNjMsLTEzOV0sWy0xNjgsMjY4XSxbLTg3LC00NDFdLFstMzIzLDEyNF1dLFtbODk0MTEsNzM3MjldLFstMjU2LC01OTVdLFs0LC02MTBdLFstMTA0LC00NzJdLFs0OCwtMjk2XSxbLTE0NSwtNDE2XSxbLTM1NSwtMjc4XSxbLTQ4OCwtMzZdLFstMzk2LC02NzVdLFstMTg2LDIyN10sWy0xMiw0NDJdLFstNDgzLC0xMzBdLFstMzI5LC0yNzldLFstMzI1LC0xMV0sWzI4MiwtNDM1XSxbLTE4NiwtMTAwNF0sWy0xNzksLTI0OF0sWy0xMzUsMjI5XSxbNjksNTMzXSxbLTE3NiwxNzJdLFstMTEzLDQwNV0sWzI2MywxODJdLFsxNDUsMzcxXSxbMjgwLDMwNl0sWzIwMyw0MDNdLFs1NTMsMTc3XSxbMjk3LC0xMjFdLFsyOTEsMTA1MF0sWzE4NSwtMjgyXSxbNDA4LDU5MV0sWzE1OCwyMjldLFsxNzQsNzIzXSxbLTQ3LDY2NF0sWzExNywzNzRdLFsyOTUsMTA4XSxbMTUyLC04MTldLFstOSwtNDc5XV0sW1s5MDE2OSw3NjU1M10sWzE5NywyNTBdLFs2MiwtNjYzXSxbLTQxMiwtMTYyXSxbLTI0NCwtNTg3XSxbLTQzNiw0MDRdLFstMTUyLC02NDZdLFstMzA4LC05XSxbLTM5LDU4N10sWzEzOCw0NTVdLFsyOTYsMzNdLFs4MSw4MTddLFs4Myw0NjBdLFszMjYsLTYxNV0sWzIxMywtMTk4XSxbMTk1LC0xMjZdXSxbWzg2NzY5LDcwMzUxXSxbMTU0LDM1Ml0sWzE1OCwtNjhdLFsxMTQsMjQ4XSxbMjA0LC0xMjddLFszNSwtMjAzXSxbLTE1NiwtMzU3XSxbLTExNCwxODldLFstMTQzLC0xMzddLFstNzMsLTM0Nl0sWy0xODEsMTY4XSxbMiwyODFdXSxbWzY0NzUyLDYwNDE3XSxbLTIwMSwtMTU4XSxbLTU0LC0yNjNdLFstNiwtMjAxXSxbLTI3NywtMjQ5XSxbLTQ0NCwtMjc2XSxbLTI0OSwtNDE3XSxbLTEyMiwtMzNdLFstODMsMzVdLFstMTYzLC0yNDVdLFstMTc3LC0xMTRdLFstMjMzLC0zMF0sWy03MCwtMzRdLFstNjEsLTE1Nl0sWy03MywtNDNdLFstNDMsLTE1MF0sWy0xMzcsMTNdLFstODksLTgwXSxbLTE5MiwzMF0sWy03MiwzNDVdLFs4LDMyM10sWy00NiwxNzRdLFstNTQsNDM3XSxbLTgwLDI0M10sWzU2LDI5XSxbLTI5LDI3MF0sWzM0LDExNF0sWy0xMiwyNTddXSxbWzYxODgzLDYwMjM4XSxbMTIxLDE4OV0sWy0yOCwyNDldLFs3NCwyOTBdLFsxMTQsLTE1M10sWzc1LDUzXSxbMzIxLDE0XSxbNTAsLTU5XSxbMjY5LC02MF0sWzEwNiwzMF0sWzcwLC0xOTddLFsxMzAsOTldLFsxOTksNjIwXSxbMjU5LDI2Nl0sWzgwMSwyMjZdXSxbWzYzNDQ4LDY3NDQ5XSxbMTA5LC01MTBdLFsxMzcsLTEzNV0sWzQ3LC0yMDddLFsxOTAsLTI0OV0sWzE2LC0yNDNdLFstMjcsLTE5N10sWzM1LC0xOTldLFs4MCwtMTY1XSxbMzcsLTE5NF0sWzQxLC0xNDVdXSxbWzY0Mjc0LDY1MTMwXSxbNTMsLTIyNl1dLFtbNjE4ODMsNjAyMzhdLFstMzcsMjUyXSxbLTgzLDE3OF0sWy0yMiwyMzZdLFstMTQzLDIxMl0sWy0xNDgsNDk1XSxbLTc5LDQ4Ml0sWy0xOTIsNDA2XSxbLTEyNCw5N10sWy0xODQsNTYzXSxbLTMyLDQxMV0sWzEyLDM1MF0sWy0xNTksNjU1XSxbLTEzMCwyMzFdLFstMTUwLDEyMl0sWy05MiwzMzldLFsxNSwxMzNdLFstNzcsMzA2XSxbLTgxLDEzMl0sWy0xMDgsNDQwXSxbLTE3MCw0NzZdLFstMTQxLDQwNl0sWy0xMzksLTNdLFs0NCwzMjVdLFsxMiwyMDZdLFszNCwyMzZdXSxbWzM2NDgzLDQ0NjhdLFsxNDEsMF0sWzQxNCwxMjddLFs0MTksLTEyN10sWzM0MiwtMjU1XSxbMTIwLC0zNTldLFszMywtMjU0XSxbMTEsLTMwMV0sWy00MzAsLTE4Nl0sWy00NTIsLTE1MF0sWy01MjIsLTEzOV0sWy01ODIsLTExNl0sWy02NTgsMzVdLFstMzY1LDE5N10sWzQ5LDI0M10sWzU5MywxNjJdLFsyMzksMTk3XSxbMTc0LDI1NF0sWzEyNiwyMjBdLFsxNjgsMjA5XSxbMTgwLDI0M11dLFtbMzE1ODYsMzE2M10sWzYyNSwtMjNdLFs1OTksLTU4XSxbMjA3LDI0M10sWzE0NywyMDhdLFsyODgsLTI0M10sWy04MiwtMzAxXSxbLTgxLC0yNjZdLFstNTgyLDgxXSxbLTYyMSwtMzVdLFstMzQ4LDE5N10sWzAsMjNdLFstMTUyLDE3NF1dLFtbMjk0NjgsODQ3Ml0sWzE5MCw3MF0sWzMyMSwtMjNdLFs4MiwzMDFdLFsxNiwyMTldLFstNiw0NzVdLFsxNTgsMjc4XSxbMjU2LDkzXSxbMTQ3LC0yMjBdLFs2NSwtMjIwXSxbMTIwLC0yNjddLFs5MiwtMjU0XSxbNzYsLTI2N10sWzMzLC0yNjZdLFstNDksLTIzMV0sWy03NiwtMjIwXSxbLTMyNiwtODFdLFstMzExLC0xMTZdLFstMzY0LDExXSxbMTM2LDIzMl0sWy0zMjcsLTgxXSxbLTMxMCwtODFdLFstMjEyLDE3NF0sWy0xNiwyNDNdLFszMDUsMjMxXV0sW1syMTU3NSw4MTAzXSxbMTc0LDEwNF0sWzM1MywtODFdLFs0MDMsLTQ2XSxbMzA1LC04MV0sWzMwNCw2OV0sWzE2MywtMzM1XSxbLTIxNyw0Nl0sWy0zMzcsLTIzXSxbLTM0MywyM10sWy0zNzYsLTM1XSxbLTI4MywxMTZdLFstMTQ2LDI0M11dLFtbMTU5MzgsNzA2MV0sWzYwLDE5N10sWzMzMiwtMTA0XSxbMzU5LC05M10sWzMzMiwxMDRdLFstMTU4LC0yMDhdLFstMjYxLC0xNTFdLFstMzg2LDQ3XSxbLTI3OCwyMDhdXSxbWzE0NjQzLDcxNzddLFsyMDIsMTI3XSxbMjc3LC0xMzldLFs0MjUsLTIzMV0sWy0xNjQsMjNdLFstMzU5LDU4XSxbLTM4MSwxNjJdXSxbWzQ1MjQsNDE0NF0sWzE2OSwyMjBdLFs1MTcsLTkzXSxbMjc3LC0xODVdLFsyMTIsLTIwOV0sWzc2LC0yNjZdLFstNTMzLC04MV0sWy0zNjQsMjA4XSxbLTE2MywyMDldLFstMTEsMzVdLFstMTgwLDE2Ml1dLFtbMCw1MjldLFsxNiwtNV0sWzI0NSwzNDRdLFs1MDEsLTE4NV0sWzMyLDIxXSxbMjk0LDE4OF0sWzM4LC03XSxbMzIsLTRdLFs0MDIsLTI0Nl0sWzM1MiwyNDZdLFs2MywzNF0sWzgxNiwxMDRdLFsyNjUsLTEzOF0sWzEzMCwtNzFdLFs0MTksLTE5Nl0sWzc4OSwtMTUxXSxbNjI1LC0xODVdLFsxMDcyLC0xMzldLFs4MDAsMTYyXSxbMTE4MSwtMTE2XSxbNjY5LC0xODVdLFs3MzQsMTc0XSxbNzczLDE2Ml0sWzYwLDI3OF0sWy0xMDk0LDIzXSxbLTg5OCwxMzldLFstMjM0LDIzMV0sWy03NDUsMTI4XSxbNDksMjY2XSxbMTAzLDI0M10sWzEwNCwyMjBdLFstNTUsMjQzXSxbLTQ2MiwxNjJdLFstMjEyLDIwOV0sWy00MzAsMTg1XSxbNjc1LC0zNV0sWzY0Miw5M10sWzQwMiwtMTk3XSxbNDk1LDE3M10sWzQ1NywyMjBdLFsyMjMsMTk3XSxbLTk4LDI0M10sWy0zNTksMTYyXSxbLTQwOCwxNzRdLFstNTcxLDM1XSxbLTUwMCw4MV0sWy01MzksNThdLFstMTgwLDIyMF0sWy0zNTksMTg1XSxbLTIxNywyMDhdLFstODcsNjcyXSxbMTM2LC01OF0sWzI1MCwtMTg1XSxbNDU3LDU4XSxbNDQxLDgxXSxbMjI4LC0yNTVdLFs0NDEsNThdLFszNzAsMTI3XSxbMzQ4LDE2Ml0sWzMxNSwxOTddLFs0MTksNThdLFstMTEsMjIwXSxbLTk3LDIyMF0sWzgxLDIwOF0sWzM1OSwxMDRdLFsxNjMsLTE5Nl0sWzQyNSwxMTVdLFszMjEsMTUxXSxbMzk3LDEyXSxbMzc1LDU3XSxbMzc2LDEzOV0sWzI5OSwxMjhdLFszMzcsMTI3XSxbMjE4LC0zNV0sWzE5MCwtNDZdLFs0MTQsODFdLFszNzAsLTEwNF0sWzM4MSwxMV0sWzM2NCw4MV0sWzM3NSwtNTddLFs0MTQsLTU4XSxbMzg2LDIzXSxbNDAzLC0xMl0sWzQxMywtMTFdLFszODEsMjNdLFsyODMsMTc0XSxbMzM3LDkyXSxbMzQ5LC0xMjddLFszMzEsMTA0XSxbMzAwLDIwOF0sWzE3OSwtMTg1XSxbOTgsLTIwOF0sWzE4MCwtMTk3XSxbMjg4LDE3NF0sWzMzMiwtMjIwXSxbMzc1LC03MF0sWzMyMSwtMTYyXSxbMzkyLDM1XSxbMzU0LDEwNF0sWzQxOCwtMjNdLFszNzYsLTgxXSxbMzgxLC0xMDRdLFsxNDcsMjU0XSxbLTE4MCwxOTddLFstMTM2LDIwOV0sWy0zNTksNDZdLFstMTU4LDIyMF0sWy02MCwyMjBdLFstOTgsNDQwXSxbMjEzLC04MV0sWzM2NCwtMzVdLFszNTksMzVdLFszMjcsLTkzXSxbMjgzLC0xNzRdLFsxMTksLTIwOF0sWzM3NiwtMzVdLFszNTksODFdLFszODEsMTE2XSxbMzQyLDcwXSxbMjgzLC0xMzldLFszNzAsNDZdLFsyMzksNDUxXSxbMjI0LC0yNjZdLFszMjEsLTEwNF0sWzM0OCw1OF0sWzIyOCwtMjMyXSxbMzY1LC0yM10sWzMzNywtNjldLFszMzIsLTEyOF0sWzIxOCwyMjBdLFsxMDgsMjA5XSxbMjc4LC0yMzJdLFszODEsNThdLFsyODMsLTEyN10sWzE5MCwtMTk3XSxbMzcwLDU4XSxbMjg4LDEyN10sWzI4MywxNTFdLFszMzcsODFdLFszOTIsNjldLFszNTQsODFdLFsyNzIsMTI3XSxbMTYzLDE4Nl0sWzY1LDI1NF0sWy0zMiwyNDRdLFstODcsMjMxXSxbLTk4LDIzMl0sWy04NywyMzFdLFstNzEsMjA5XSxbLTE2LDIzMV0sWzI3LDIzMl0sWzEzMCwyMjBdLFsxMDksMjQzXSxbNDQsMjMxXSxbLTU1LDI1NV0sWy0zMiwyMzJdLFsxMzYsMjY2XSxbMTUyLDE3M10sWzE4MCwyMjBdLFsxOTAsMTg2XSxbMjIzLDE3M10sWzEwOSwyNTVdLFsxNTIsMTYyXSxbMTc0LDE1MV0sWzI2NywzNF0sWzE3NCwxODZdLFsxOTYsMTE1XSxbMjI4LDcwXSxbMjAyLDE1MF0sWzE1NywxODZdLFsyMTgsNjldLFsxNjMsLTE1MV0sWy0xMDMsLTE5Nl0sWy0yODMsLTE3NF0sWy0xMjAsLTEyN10sWy0yMDYsOTJdLFstMjI5LC01OF0sWy0xOTAsLTEzOV0sWy0yMDIsLTE1MF0sWy0xMzYsLTE3NF0sWy0zOCwtMjMxXSxbMTcsLTIyMF0sWzEzMCwtMTk3XSxbLTE5MCwtMTM5XSxbLTI2MSwtNDZdLFstMTUzLC0xOTddLFstMTYzLC0xODVdLFstMTc0LC0yNTVdLFstNDQsLTIyMF0sWzk4LC0yNDNdLFsxNDcsLTE4NV0sWzIyOSwtMTM5XSxbMjEyLC0xODVdLFsxMTQsLTIzMl0sWzYwLC0yMjBdLFs4MiwtMjMyXSxbMTMwLC0xOTZdLFs4MiwtMjIwXSxbMzgsLTU0NF0sWzgxLC0yMjBdLFsyMiwtMjMyXSxbODcsLTIzMV0sWy0zOCwtMzEzXSxbLTE1MiwtMjQzXSxbLTE2MywtMTk3XSxbLTM3MCwtODFdLFstMTI1LC0yMDhdLFstMTY5LC0xOTddLFstNDE5LC0yMjBdLFstMzcwLC05M10sWy0zNDgsLTEyN10sWy0zNzYsLTEyOF0sWy0yMjMsLTI0M10sWy00NDYsLTIzXSxbLTQ4OSwyM10sWy00NDEsLTQ2XSxbLTQ2OCwwXSxbODcsLTIzMl0sWzQyNCwtMTA0XSxbMzExLC0xNjJdLFsxNzQsLTIwOF0sWy0zMTAsLTE4NV0sWy00NzksNThdLFstMzk3LC0xNTFdLFstMTcsLTI0M10sWy0xMSwtMjMyXSxbMzI3LC0xOTZdLFs2MCwtMjIwXSxbMzUzLC0yMjBdLFs1ODgsLTkzXSxbNTAwLC0xNjJdLFszOTgsLTE4NV0sWzUwNiwtMTg2XSxbNjkwLC05Ml0sWzY4MSwtMTYyXSxbNDczLC0xNzRdLFs1MTcsLTE5N10sWzI3MiwtMjc4XSxbMTM2LC0yMjBdLFszMzcsMjA5XSxbNDU3LDE3M10sWzQ4NCwxODZdLFs1NzcsMTUwXSxbNDk1LDE2Ml0sWzY5MSwxMl0sWzY4MCwtODFdLFs1NjAsLTEzOV0sWzE4MCwyNTVdLFszODYsMTczXSxbNzAyLDEyXSxbNTUwLDEyN10sWzUyMiwxMjhdLFs1NzcsODFdLFs2MTQsMTA0XSxbNDMwLDE1MF0sWy0xOTYsMjA5XSxbLTExOSwyMDhdLFswLDIyMF0sWy01MzksLTIzXSxbLTU3MSwtOTNdLFstNTQ0LDBdLFstNzcsMjIwXSxbMzksNDQwXSxbMTI1LDEyOF0sWzM5NywxMzhdLFs0NjgsMTM5XSxbMzM3LDE3NF0sWzMzNywxNzRdLFsyNTEsMjMxXSxbMzgwLDEwNF0sWzM3Niw4MV0sWzE5MCw0N10sWzQzMCwyM10sWzQwOCw4MV0sWzM0MywxMTZdLFszMzcsMTM5XSxbMzA1LDEzOV0sWzM4NiwxODVdLFsyNDUsMTk3XSxbMjYxLDE3M10sWzgyLDIzMl0sWy0yOTQsMTM5XSxbOTgsMjQzXSxbMTg1LDE4NV0sWzI4OCwxMTZdLFszMDUsMTM5XSxbMjgzLDE4NV0sWzIxNywyMzJdLFsxMzYsMjc3XSxbMjAyLDE2M10sWzMzMSwtMzVdLFsxMzYsLTE5N10sWzMzMiwtMjNdLFsxMSwyMjBdLFsxNDIsMjMxXSxbMjk5LC01OF0sWzcxLC0yMjBdLFszMzEsLTM0XSxbMzYwLDEwNF0sWzM0OCw2OV0sWzMxNSwtMzRdLFsxMjAsLTI0M10sWzMwNSwxOTZdLFsyODMsMTA1XSxbMzE1LDgxXSxbMzEwLDgxXSxbMjgzLDEzOV0sWzMxMCw5Ml0sWzI0MCwxMjhdLFsxNjgsMjA4XSxbMjA3LC0xNTFdLFsyODgsODFdLFsyMDIsLTI3N10sWzE1NywtMjA5XSxbMzE2LDExNl0sWzEyNSwyMzJdLFsyODMsMTYyXSxbMzY1LC0zNV0sWzEwOCwtMjIwXSxbMjI5LDIyMF0sWzI5OSw2OV0sWzMyNiwyM10sWzI5NCwtMTFdLFszMTAsLTcwXSxbMzAwLC0zNF0sWzEzMCwtMTk3XSxbMTgwLC0xNzRdLFszMDQsMTA0XSxbMzI3LDI0XSxbMzE1LDBdLFszMTAsMTFdLFsyNzgsODFdLFsyOTQsNzBdLFsyNDUsMTYyXSxbMjYxLDEwNF0sWzI4Myw1OF0sWzIxMiwxNjJdLFsxNTIsMzI0XSxbMTU4LDE5N10sWzI4OCwtOTNdLFsxMDksLTIwOF0sWzIzOSwtMTM5XSxbMjg5LDQ2XSxbMTk2LC0yMDhdLFsyMDYsLTE1MV0sWzI4MywxMzldLFs5OCwyNTVdLFsyNTAsMTA0XSxbMjg5LDE5N10sWzI3Miw4MV0sWzMyNiwxMTZdLFsyMTgsMTI3XSxbMjI4LDEzOV0sWzIxOCwxMjddLFsyNjEsLTY5XSxbMjUwLDIwOF0sWzE4MCwxNjJdLFsyNjEsLTExXSxbMjI5LDEzOV0sWzU0LDIwOF0sWzIzNCwxNjJdLFsyMjgsMTE2XSxbMjc4LDkzXSxbMjU2LDQ2XSxbMjQ0LC0zNV0sWzI2MiwtNThdLFsyMjMsLTE2Ml0sWzI3LC0yNTRdLFsyNDUsLTE5N10sWzE2OCwtMTYyXSxbMzMyLC03MF0sWzE4NSwtMTYyXSxbMjI5LC0xNjJdLFsyNjYsLTM1XSxbMjIzLDExNl0sWzI0MCwyNDNdLFsyNjEsLTEyN10sWzI3MiwtNzBdLFsyNjEsLTY5XSxbMjcyLC00Nl0sWzI3NywwXSxbMjI5LC02MTRdLFstMTEsLTE1MF0sWy0zMywtMjY3XSxbLTI2NiwtMTUwXSxbLTIxOCwtMjIwXSxbMzgsLTIzMl0sWzMxMCwxMl0sWy0zOCwtMjMyXSxbLTE0MSwtMjIwXSxbLTEzMSwtMjQzXSxbMjEyLC0xODVdLFszMjEsLTU4XSxbMzIxLDEwNF0sWzE1MywyMzJdLFs5MiwyMjBdLFsxNTMsMTg1XSxbMTc0LDE3NF0sWzcwLDIwOF0sWzE0NywyODldLFsxNzQsNThdLFszMTYsMjRdLFsyNzcsNjldLFsyODMsOTNdLFsxMzYsMjMxXSxbODIsMjIwXSxbMTkwLDIyMF0sWzI3MiwxNTFdLFsyMzQsMTE1XSxbMTUzLDE5N10sWzE1NywxMDRdLFsyMDIsOTNdLFsyNzcsLTU4XSxbMjUwLDU4XSxbMjcyLDY5XSxbMzA1LC0zNF0sWzIwMSwxNjJdLFsxNDIsMzkzXSxbMTAzLC0xNjJdLFsxMzEsLTI3OF0sWzIzNCwtMTE1XSxbMjY2LC00N10sWzI2Nyw3MF0sWzI4MywtNDZdLFsyNjEsLTEyXSxbMTc0LDU4XSxbMjM0LC0zNV0sWzIxMiwtMTI3XSxbMjUwLDgxXSxbMzAwLDBdLFsyNTUsODFdLFsyODksLTgxXSxbMTg1LDE5N10sWzE0MSwxOTZdLFsxOTEsMTYzXSxbMzQ4LDQzOV0sWzE3OSwtODFdLFsyMTIsLTE2Ml0sWzE4NSwtMjA4XSxbMzU0LC0zNTldLFsyNzIsLTEyXSxbMjU2LDBdLFsyOTksNzBdLFsyOTksODFdLFsyMjksMTYyXSxbMTkwLDE3NF0sWzMxMCwyM10sWzIwNywxMjddLFsyMTgsLTExNl0sWzE0MSwtMTg1XSxbMTk2LC0xODVdLFszMDUsMjNdLFsxOTAsLTE1MF0sWzMzMiwtMTUxXSxbMzQ4LC01OF0sWzI4OCw0N10sWzIxOCwxODVdLFsxODUsMTg1XSxbMjUwLDQ2XSxbMjUxLC04MV0sWzI4OCwtNThdLFsyNjEsOTNdLFsyNTAsMF0sWzI0NSwtNThdLFsyNTYsLTU4XSxbMjUwLDEwNF0sWzI5OSw5M10sWzI4MywyM10sWzMxNiwwXSxbMjU1LDU4XSxbMjUxLDQ2XSxbNzYsMjkwXSxbMTEsMjQzXSxbMTc0LC0xNjJdLFs0OSwtMjY2XSxbOTIsLTI0NF0sWzExNSwtMTk2XSxbMjM0LC0xMDVdLFszMTUsMzVdLFszNjUsMTJdLFsyNTAsMzVdLFszNjQsMF0sWzI2MiwxMV0sWzM2NCwtMjNdLFszMTAsLTQ2XSxbMTk2LC0xODZdLFstNTQsLTIyMF0sWzE3OSwtMTczXSxbMjk5LC0xMzldLFszMTAsLTE1MV0sWzM2MCwtMTA0XSxbMzc1LC05Ml0sWzI4MywtOTNdLFszMTUsLTEyXSxbMTgwLDE5N10sWzI0NSwtMTYyXSxbMjEyLC0xODVdLFsyNDUsLTEzOV0sWzMzNywtNThdLFszMjEsLTY5XSxbMTM2LC0yMzJdLFszMTYsLTEzOV0sWzIxMiwtMjA4XSxbMzEwLC05M10sWzMyMSwxMl0sWzI5OSwtMzVdLFszMzIsMTJdLFszMzIsLTQ3XSxbMzEwLC04MV0sWzI4OCwtMTM5XSxbMjg5LC0xMTZdLFsxOTUsLTE3M10sWy0zMiwtMjMyXSxbLTE0NywtMjA4XSxbLTEyNSwtMjY2XSxbLTk4LC0yMDldLFstMTMxLC0yNDNdLFstMzY0LC05M10sWy0xNjMsLTIwOF0sWy0zNjAsLTEyN10sWy0xMjUsLTIzMl0sWy0xOTAsLTIyMF0sWy0yMDEsLTE4NV0sWy0xMTUsLTI0M10sWy03MCwtMjIwXSxbLTI4LC0yNjZdLFs2LC0yMjBdLFsxNTgsLTIzMl0sWzYwLC0yMjBdLFsxMzAsLTIwOF0sWzUxNywtODFdLFsxMDksLTI1NV0sWy01MDEsLTkzXSxbLTQyNCwtMTI3XSxbLTUyOCwtMjNdLFstMjM0LC0zMzZdLFstNDksLTI3OF0sWy0xMTksLTIyMF0sWy0xNDcsLTIyMF0sWzM3MCwtMTk2XSxbMTQxLC0yNDRdLFsyMzksLTIxOV0sWzMzOCwtMTk3XSxbMzg2LC0xODZdLFs0MTksLTE4NV0sWzYzNiwtMTg1XSxbMTQyLC0yODldLFs4MDAsLTEyOF0sWzUzLC00NV0sWzIwOCwtMTc1XSxbNzY3LDE1MV0sWzYzNiwtMTg2XSxbNDc5LC0xNDJdLFstOTk5OTksMF1dLFtbNTkwOTIsNzEzNDFdLFsxOSwzXSxbNDAsMTQzXSxbMjAwLC04XSxbMjUzLDE3Nl0sWy0xODgsLTI1MV0sWzIxLC0xMTFdXSxbWzU5NDM3LDcxMjkzXSxbLTMwLDIxXSxbLTUzLC00NV0sWy00MiwxMl0sWy0xNCwtMjJdLFstNSw1OV0sWy0yMCwzN10sWy01NCw2XSxbLTc1LC01MV0sWy01MiwzMV1dLFtbNTk0MzcsNzEyOTNdLFs4LC00OF0sWy0yODUsLTI0MF0sWy0xMzYsNzddLFstNjQsMjM3XSxbMTMyLDIyXV0sW1s0NTI3Miw2MzIzNl0sWzEzLDI3NF0sWzEwNiwxNjFdLFs5MSwzMDhdLFstMTgsMjAwXSxbOTYsNDE3XSxbMTU1LDM3Nl0sWzkzLDk1XSxbNzQsMzQ0XSxbNiwzMTVdLFsxMDAsMzY1XSxbMTg1LDIxNl0sWzE3Nyw2MDNdLFs1LDhdLFsxMzksMjI3XSxbMjU5LDY1XSxbMjE4LDQwNF0sWzE0MCwxNThdLFsyMzIsNDkzXSxbLTcwLDczNV0sWzEwNiw1MDhdLFszNywzMTJdLFsxNzksMzk5XSxbMjc4LDI3MF0sWzIwNiwyNDRdLFsxODYsNjEyXSxbODcsMzYyXSxbMjA1LC0yXSxbMTY3LC0yNTFdLFsyNjQsNDFdLFsyODgsLTEzMV0sWzEyMSwtNl1dLFtbNTY5NDQsNjM1NzhdLFswLDIxNzVdLFswLDIxMDFdLFstODMsNDc2XSxbNzEsMzY1XSxbLTQzLDI1M10sWzEwMSwyODNdXSxbWzU2OTkwLDY5MjMxXSxbMzY5LDEwXSxbMjY4LC0xNTZdLFsyNzUsLTE3NV0sWzEyOSwtOTJdLFsyMTQsMTg4XSxbMTE0LDE2OV0sWzI0NSw0OV0sWzE5OCwtNzVdLFs3NSwtMjkzXSxbNjUsMTkzXSxbMjIyLC0xNDBdLFsyMTcsLTMzXSxbMTM3LDE0OV1dLFtbNTk3MDAsNjgwMTBdLFstNzgsLTIzOF0sWy02MCwtNDQ2XSxbLTc1LC0zMDhdLFstNjUsLTEwM10sWy05MywxOTFdLFstMTI1LDI2M10sWy0xOTgsODQ3XSxbLTI5LC01M10sWzExNSwtNjI0XSxbMTcxLC01OTRdLFsyMTAsLTkyMF0sWzEwMiwtMzIxXSxbOTAsLTMzNF0sWzI0OSwtNjU0XSxbLTU1LC0xMDNdLFs5LC0zODRdLFszMjMsLTUzMF0sWzQ5LC0xMjFdXSxbWzUzMTkxLDcwMTU4XSxbMzI2LC0yMDRdLFsxMTcsNTFdLFsyMzIsLTk4XSxbMzY4LC0yNjRdLFsxMzAsLTUyNl0sWzI1MCwtMTE0XSxbMzkxLC0yNDhdLFsyOTYsLTI5M10sWzEzNiwxNTNdLFsxMzMsMjcyXSxbLTY1LDQ1Ml0sWzg3LDI4OF0sWzIwMCwyNzddLFsxOTIsODBdLFszNzUsLTEyMV0sWzk1LC0yNjRdLFsxMDQsLTJdLFs4OCwtMTAxXSxbMjc2LC03MF0sWzY4LC0xOTVdXSxbWzU5ODA0LDUzODMzXSxbLTE2NCw2NDNdLFstMTI3LDEzN10sWy00OCwyMzZdLFstMTQxLDI4OF0sWy0xNzEsNDJdLFs5NSwzMzddLFsxNDcsMTRdLFs0MiwxODFdXSxbWzYxNzY0LDU3OTkwXSxbLTk4LC0yNjFdLFstOTQsLTI3N10sWzIyLC0xNjNdLFs0LC0xODBdLFsxNTUsLTEwXSxbNjcsNDJdLFs2MiwtMTA2XV0sW1s2MTg4Miw1NzAzNV0sWy02MSwtMjA5XSxbMTAzLC0zMjVdLFsxMDIsLTI4NV0sWzEwNiwtMjEwXSxbOTA5LC03MDJdLFsyMzMsNF1dLFtbNjE5NjYsNTgwODNdLFs2NiwtMTgzXSxbLTksLTI0NV0sWy0xNTgsLTE0Ml0sWzExOSwtMTYxXV0sW1s2MTk4NCw1NzM1Ml0sWy0xMDIsLTMxN11dLFtbNjE5ODQsNTczNTJdLFs5MSwtMTA5XSxbNTQsLTI0NV0sWzEyNSwtMjQ3XSxbMTM4LC0yXSxbMjYyLDE1MV0sWzMwMiw3MF0sWzI0NSwxODRdLFsxMzgsMzldLFs5OSwxMDhdLFsxNTgsMjBdXSxbWzU4NDQ5LDQ5OTA5XSxbLTE2NiwtMTgyXSxbLTY3LDYwXV0sW1s1ODU2NCw1MjY1M10sWzExNSwxNjFdLFsxNzYsLTEzMl0sWzIyNCwxMzhdLFsxOTUsLTFdLFsxNzEsMjcyXV0sW1s1NTI3OSw3NzA4NF0sWzEwMCwyXSxbLTY5LC0yNjBdLFsxMzQsLTIyN10sWy00MSwtMjc4XSxbLTY1LC0yN11dLFtbNTUzMzgsNzYyOTRdLFstNTIsLTUzXSxbLTkwLC0xMzhdLFstNDEsLTMyNV1dLFtbNTU3MTksNzUzMDldLFszNSwtNV0sWzEzLDEyMV0sWzE2NCw5MV0sWzYyLDIzXV0sW1s1NTk5Myw3NTUzOV0sWzk1LDM1XSxbMTI4LDldXSxbWzU1OTkzLDc1NTM5XSxbLTksNDRdLFszMyw3MV0sWzMxLDE0NF0sWy0zOSwtNF0sWy01NCwxMTBdLFstNDYsMjhdLFstMzYsOTRdLFstNTIsMzZdLFstNDAsODRdLFstNTAsLTMzXSxbLTM4LC0xOTZdLFstNjYsLTQzXV0sW1s1NTYyNyw3NTg3NF0sWzIyLDUxXSxbLTEwNiwxMjNdLFstOTEsNjNdLFstNDAsODJdLFstNzQsMTAxXV0sW1s1NTM4MCw3NTMyMl0sWy01OCw0Nl0sWy03OCwxOTJdLFstMTIwLDExOF1dLFtbNTU2MjcsNzU4NzRdLFstNTIsLTEzMl1dLFtbMzI4NjYsNTY5MzddLFsxNjAsNzddLFs1OCwtMjFdLFstMTEsLTQ0MF0sWy0yMzIsLTY1XSxbLTUwLDUzXSxbODEsMTYzXSxbLTYsMjMzXV1dLCJiYm94IjpbLTE4MCwtODUuNjA5MDM3Nzc0NTk3NzEsMTgwLDgzLjY0NTEzMDAwMDAwMDAxXSwidHJhbnNmb3JtIjp7InNjYWxlIjpbMC4wMDM2MDAwMzYwMDAzNjAwMDM3LDAuMDAxNjkyNTU4NjAzMzMyMDEwNV0sInRyYW5zbGF0ZSI6Wy0xODAsLTg1LjYwOTAzNzc3NDU5NzcxXX19Cg==", import.meta.url).href;
  return we = await (await fetch(M)).json(), we;
}
o(ba, "loadTopology");
const qe = 960, Ke = 500, be = 20, Hr = {
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
}, qr = {
  Africa: "Afrique",
  Europe: "Europe",
  Asia: "Asie",
  "North America": "Amerique du Nord",
  "South America": "Amerique du Sud",
  Oceania: "Oceanie"
};
var ut;
let is = (ut = class extends Et(V) {
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
      this._topology = await ba(), this.requestUpdate();
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
      const e = String(B(t, this.codeField) ?? "").trim();
      if (!e)
        continue;
      const i = ua(e, this.codeFormat);
      if (!i)
        continue;
      const r = Number(B(t, this.valueField));
      isNaN(r) || s.set(i, Math.round(r * 100) / 100);
    }
    return s;
  }
  _getChoroplethPalette() {
    return Hr[this.selectedPalette] || Hr.sequentialAscending;
  }
  _getColorScale(s) {
    if (s.length === 0)
      return () => "#E5E5F4";
    const t = this._getChoroplethPalette(), e = [...s].sort((r, n) => r - n), i = [];
    for (let r = 1; r < t.length; r++)
      i.push(e[Math.floor(r / t.length * e.length)]);
    return (r) => {
      let n = 0;
      for (let a = 0; a < i.length; a++)
        r >= i[a] && (n = a + 1);
      return t[Math.min(n, t.length - 1)];
    };
  }
  // --- Geo helpers ---
  _getFeatures() {
    if (!this._topology)
      return [];
    const s = this._topology.objects.countries;
    return da(this._topology, s).features;
  }
  _getBorders() {
    if (!this._topology)
      return null;
    const s = this._topology.objects.countries;
    return Na(this._topology, s, (t, e) => t !== e);
  }
  _getProjection() {
    const s = aa().translate([qe / 2, Ke / 2]).scale(153);
    if (this._zoomedContinent) {
      const t = this._getFeatures().filter((e) => Gr[e.id] === this._zoomedContinent);
      if (t.length > 0) {
        const e = { type: "FeatureCollection", features: t };
        s.fitExtent([[be, be], [qe - be, Ke - be]], e);
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
        const t = Gr[s];
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
    const s = this._getFeatures(), t = this._getBorders(), e = this._getProjection(), i = Pn(e), r = this._buildValueMap(), n = [...r.values()], a = this._getColorScale(n), c = "#F0F0F0", d = s.map((l) => {
      const N = i(l.geometry) || "", T = r.get(l.id), x = T !== void 0 ? a(T) : c, b = this._hoveredCountryId === l.id;
      return cr`<path
        class="gouv-world-map__country"
        d=${N}
        fill=${x}
        stroke=${b ? "#000091" : "none"}
        stroke-width=${b ? "1.5" : "0"}
        data-id=${l.id}
        style="cursor: ${this.zoom !== "none" ? "pointer" : "default"}"
        @click=${() => this._onCountryClick(l.id)}
        @mouseenter=${(u) => this._onCountryHover(u, l.id)}
        @mousemove=${(u) => this._onCountryHover(u, l.id)}
        @mouseleave=${(u) => this._onCountryHover(u, null)}
      />`;
    }), L = t && i(t) || "";
    return z`
      <div class="gouv-world-map__container" style="position: relative;">
        ${this._zoomedContinent ? z`
          <button
            class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
            style="position: absolute; top: 8px; left: 8px; z-index: 2;"
            @click=${this._onBackClick}
            aria-label="Revenir a la vue monde">
            <span class="fr-icon-arrow-left-line" aria-hidden="true"></span>
            ${qr[this._zoomedContinent] || this._zoomedContinent}
          </button>
        ` : h}

        <svg
          viewBox="0 0 ${qe} ${Ke}"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label=${this._getAriaLabel()}
          style="width: 100%; height: auto; display: block;">
          <g class="gouv-world-map__countries">
            ${d}
          </g>
          ${L ? cr`<path
            class="gouv-world-map__borders"
            d=${L}
            fill="none"
            stroke="#fff"
            stroke-width="0.5"
            stroke-linejoin="round"
            pointer-events="none"
          />` : h}
        </svg>

        ${this._renderTooltip(r)}
        ${this._renderLegend(n, a)}
      </div>
    `;
  }
  _renderTooltip(s) {
    var r, n;
    if (!this._hoveredCountryId)
      return h;
    const t = wa[this._hoveredCountryId] || ((n = (r = this._getFeatures().find((a) => a.id === this._hoveredCountryId)) == null ? void 0 : r.properties) == null ? void 0 : n.name) || this._hoveredCountryId, e = s.get(this._hoveredCountryId), i = e !== void 0 ? `${e.toLocaleString("fr-FR")}${this.unitTooltip ? " " + this.unitTooltip : ""}` : "Pas de donnees";
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
      return h;
    const e = this._getChoroplethPalette(), i = [...s].sort((a, c) => a - c), r = i[0], n = i[i.length - 1];
    return z`
      <div class="gouv-world-map__legend" style="display: flex; align-items: center; gap: 4px;
        margin-top: 8px; font-size: 0.75rem; color: var(--text-mention-grey, #666);">
        ${this.name ? z`<span style="margin-right: 4px; font-weight: 500;">${this.name}</span>` : h}
        <span>${r.toLocaleString("fr-FR")}</span>
        <div style="display: flex; height: 12px; border-radius: 2px; overflow: hidden;">
          ${e.map((a) => z`<div style="width: 20px; background: ${a};"></div>`)}
        </div>
        <span>${n.toLocaleString("fr-FR")}</span>
        ${this.unitTooltip ? z`<span>${this.unitTooltip}</span>` : h}
      </div>
    `;
  }
  _getAriaLabel() {
    const s = this._data.length;
    return `Carte ${this._zoomedContinent ? qr[this._zoomedContinent] || this._zoomedContinent : "monde"}, ${s} valeurs`;
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
}, o(ut, "GouvWorldMap"), ut);
Ms([
  y({ type: String })
], is.prototype, "source", void 0);
Ms([
  y({ type: String, attribute: "code-field" })
], is.prototype, "codeField", void 0);
Ms([
  y({ type: String, attribute: "value-field" })
], is.prototype, "valueField", void 0);
Ms([
  y({ type: String, attribute: "code-format" })
], is.prototype, "codeFormat", void 0);
Ms([
  y({ type: String })
], is.prototype, "name", void 0);
Ms([
  y({ type: String, attribute: "selected-palette" })
], is.prototype, "selectedPalette", void 0);
Ms([
  y({ type: String, attribute: "unit-tooltip" })
], is.prototype, "unitTooltip", void 0);
Ms([
  y({ type: String })
], is.prototype, "zoom", void 0);
Ms([
  F()
], is.prototype, "_data", void 0);
Ms([
  F()
], is.prototype, "_topology", void 0);
Ms([
  F()
], is.prototype, "_zoomedContinent", void 0);
Ms([
  F()
], is.prototype, "_hoveredCountryId", void 0);
Ms([
  F()
], is.prototype, "_tooltipX", void 0);
Ms([
  F()
], is.prototype, "_tooltipY", void 0);
is = Ms([
  q("gouv-world-map")
], is);
var ps = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
};
let ha = 0;
const si = 100;
var wt;
let hs = (wt = class extends Et(V) {
  constructor() {
    super(...arguments), this.source = "", this.for = "", this.table = !1, this.download = !1, this.filename = "donnees.csv", this.description = "", this.labelField = "", this.valueField = "", this.label = "", this.noAutoAria = !1, this._previousForTarget = null, this._injectedSkipLink = null;
  }
  createRenderRoot() {
    return this;
  }
  /** If none of the 3 features is explicitly set, show all available */
  get _showAll() {
    return !this.table && !this.download && !this.description;
  }
  get _showTable() {
    return this.table || this._showAll;
  }
  get _showDownload() {
    return this.download || this._showAll;
  }
  get _showDescription() {
    return !!this.description;
  }
  connectedCallback() {
    super.connectedCallback(), Ss("gouv-chart-a11y"), this._ensureId(), this._injectSkipLink(), this._applyAria();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._removeSkipLink(), this._removeAria();
  }
  updated(s) {
    super.updated(s), (s.has("for") || s.has("noAutoAria")) && (this._removeSkipLink(), this._removeAria(), this._injectSkipLink(), this._applyAria());
  }
  // ---------------------------------------------------------------------------
  // ID management
  // ---------------------------------------------------------------------------
  _ensureId() {
    this.id || (this.id = `gouv-chart-a11y-${++ha}`);
  }
  // ---------------------------------------------------------------------------
  // Skip link injection
  // ---------------------------------------------------------------------------
  _injectSkipLink() {
    if (this.noAutoAria || !this.for)
      return;
    const s = document.getElementById(this.for);
    if (!s)
      return;
    const t = document.createElement("a");
    t.href = `#${this.id}`, t.className = "gouv-chart-a11y__skiplink", t.textContent = "Voir les donnees accessibles", t.setAttribute("data-gouv-a11y-link", this.id), s.insertBefore(t, s.firstChild), this._injectedSkipLink = t;
  }
  _removeSkipLink() {
    this._injectedSkipLink && (this._injectedSkipLink.remove(), this._injectedSkipLink = null);
  }
  // ---------------------------------------------------------------------------
  // ARIA management
  // ---------------------------------------------------------------------------
  _applyAria() {
    if (this.noAutoAria || !this.for)
      return;
    const s = document.getElementById(this.for);
    if (!s)
      return;
    this._previousForTarget = s;
    const t = `${this.id}-desc`, e = s.getAttribute("aria-describedby") || "";
    if (!e.split(/\s+/).includes(t)) {
      const i = e ? `${e} ${t}` : t;
      s.setAttribute("aria-describedby", i);
    }
    this._showTable && s.setAttribute("aria-details", `${this.id}-table`);
  }
  _removeAria() {
    if (!this._previousForTarget)
      return;
    const s = this._previousForTarget, t = `${this.id}-desc`, i = (s.getAttribute("aria-describedby") || "").split(/\s+/).filter((r) => r !== t);
    i.length > 0 ? s.setAttribute("aria-describedby", i.join(" ")) : s.removeAttribute("aria-describedby"), s.getAttribute("aria-details") === `${this.id}-table` && s.removeAttribute("aria-details"), this._previousForTarget = null;
  }
  // ---------------------------------------------------------------------------
  // CSV generation (ported from gouv-raw-data)
  // ---------------------------------------------------------------------------
  _handleDownload() {
    const s = this._sourceData;
    if (!s || !Array.isArray(s) || s.length === 0)
      return;
    const t = this._buildCsv(s);
    this._triggerDownload(t);
  }
  _buildCsv(s) {
    const t = Object.keys(s[0]), e = t.join(";"), i = s.map((r) => t.map((n) => {
      const a = String(r[n] ?? "");
      return a.includes(";") || a.includes('"') ? `"${a.replace(/"/g, '""')}"` : a;
    }).join(";"));
    return [e, ...i].join(`
`);
  }
  _triggerDownload(s) {
    const t = new Blob([s], { type: "text/csv;charset=utf-8;" }), e = URL.createObjectURL(t), i = document.createElement("a");
    i.href = e, i.download = this.filename, i.click(), URL.revokeObjectURL(e);
  }
  // ---------------------------------------------------------------------------
  // Table columns
  // ---------------------------------------------------------------------------
  _getColumns(s) {
    if (this.labelField || this.valueField) {
      const t = [];
      if (this.labelField && t.push(this.labelField), this.valueField)
        for (const e of this.valueField.split(",").map((i) => i.trim()))
          e && t.push(e);
      return t;
    }
    return s.length === 0 ? [] : Object.keys(s[0]);
  }
  // ---------------------------------------------------------------------------
  // Auto-generated description for aria-describedby
  // ---------------------------------------------------------------------------
  _getAutoDescription(s, t) {
    if (!s)
      return "Aucune donnee disponible.";
    const i = [`Donnees du graphique : ${t.length} lignes.`];
    return this.description && i.push(this.description), this._showDownload && i.push("Telechargement CSV disponible."), this._showTable && i.push("Tableau de donnees disponible."), i.join(" ");
  }
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  render() {
    const s = this._sourceData, t = Array.isArray(s) && s.length > 0, e = this.label || "Accessibilite : donnees et description", i = `${this.id}-desc`, r = `${this.id}-table`, n = t ? s : [], a = t ? this._getColumns(n) : [], c = n.slice(0, si), d = n.length > si;
    return z`
      <section class="gouv-chart-a11y"
               role="complementary"
               aria-label="${e}">

        <!-- Concise description for aria-describedby (sr-only) -->
        <p id="${i}" class="gouv-chart-a11y__sr-only">
          ${this._getAutoDescription(t, s)}
        </p>

        <details class="fr-accordion">
          <summary class="fr-accordion__btn">${e}</summary>
          <div class="fr-accordion__content">

            ${this._showDescription ? z`
              <div class="fr-mb-2w">
                <p class="fr-text--sm">${this.description}</p>
              </div>
            ` : h}

            ${this._showTable && t ? z`
              <div class="fr-table fr-mb-2w" id="${r}">
                <table>
                  <caption class="gouv-chart-a11y__sr-only">Donnees du graphique</caption>
                  <thead>
                    <tr>
                      ${a.map((L) => z`<th scope="col">${L}</th>`)}
                    </tr>
                  </thead>
                  <tbody>
                    ${c.map((L) => z`
                      <tr>
                        ${a.map((l) => z`<td>${L[l] ?? ""}</td>`)}
                      </tr>
                    `)}
                  </tbody>
                </table>
                ${d ? z`
                  <p class="fr-text--xs fr-mt-1w">
                    Affichage limite aux ${si} premieres lignes.
                    ${this._showDownload ? "Telechargez le CSV pour les donnees completes." : ""}
                  </p>
                ` : h}
              </div>
            ` : h}

            ${this._showDownload ? z`
              <button
                class="fr-btn fr-btn--secondary fr-btn--sm fr-btn--icon-left fr-icon-download-line"
                @click="${this._handleDownload}"
                ?disabled="${!t || this._sourceLoading}"
                title="Telecharger les donnees (CSV)">
                Telecharger en CSV
              </button>
            ` : h}

          </div>
        </details>
      </section>

      <style>
        .gouv-chart-a11y {
          margin-top: 0.5rem;
        }
        .gouv-chart-a11y__sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          margin: -1px;
          padding: 0;
          border: 0;
        }
        .gouv-chart-a11y__skiplink {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          margin: -1px;
          padding: 0;
          border: 0;
        }
        .gouv-chart-a11y__skiplink:focus {
          position: static;
          width: auto;
          height: auto;
          overflow: visible;
          clip: auto;
          white-space: normal;
          margin: 0;
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: var(--background-default-grey, #fff);
          color: var(--text-action-high-blue-france, #000091);
          text-decoration: underline;
          font-size: 0.875rem;
          z-index: 1;
        }
      </style>
    `;
  }
}, o(wt, "GouvChartA11y"), wt);
ps([
  y({ type: String })
], hs.prototype, "source", void 0);
ps([
  y({ type: String, attribute: "for" })
], hs.prototype, "for", void 0);
ps([
  y({ type: Boolean })
], hs.prototype, "table", void 0);
ps([
  y({ type: Boolean })
], hs.prototype, "download", void 0);
ps([
  y({ type: String })
], hs.prototype, "filename", void 0);
ps([
  y({ type: String })
], hs.prototype, "description", void 0);
ps([
  y({ type: String, attribute: "label-field" })
], hs.prototype, "labelField", void 0);
ps([
  y({ type: String, attribute: "value-field" })
], hs.prototype, "valueField", void 0);
ps([
  y({ type: String })
], hs.prototype, "label", void 0);
ps([
  y({ type: Boolean, attribute: "no-auto-aria" })
], hs.prototype, "noAutoAria", void 0);
hs = ps([
  q("gouv-chart-a11y")
], hs);
var As = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, bt;
let Es = (bt = class extends V {
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
        const t = await dn({ email: this._email, password: this._password });
        if (!t.success) {
          this._error = t.error || "Identifiants incorrects";
          return;
        }
      } else {
        if (!this._displayName.trim()) {
          this._error = "Le nom est requis";
          return;
        }
        const t = await cn({
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
      return h;
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
                  ` : h}

                  <form @submit=${this._handleSubmit}>
                    ${s ? h : z`
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
                      ${s ? h : z`<p class="fr-hint-text">6 caracteres minimum</p>`}
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
}, o(bt, "AuthModal"), bt);
As([
  F()
], Es.prototype, "_open", void 0);
As([
  F()
], Es.prototype, "_tab", void 0);
As([
  F()
], Es.prototype, "_error", void 0);
As([
  F()
], Es.prototype, "_loading", void 0);
As([
  F()
], Es.prototype, "_email", void 0);
As([
  F()
], Es.prototype, "_password", void 0);
As([
  F()
], Es.prototype, "_displayName", void 0);
Es = As([
  q("auth-modal")
], Es);
var Qs = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, ht;
let ms = (ht = class extends V {
  constructor() {
    super(...arguments), this.currentPage = "", this.basePath = "", this._favCount = 0, this._user = null, this._dbMode = !1, this._syncStatus = "idle", this._syncErrorCount = 0;
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
      s.id = "app-header-active-style", s.textContent = '.fr-nav__link[aria-current="page"]{font-weight:700;border-bottom:2px solid var(--border-action-high-blue-france);color:var(--text-action-high-blue-france)}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}', document.head.appendChild(s);
    }
    this._initAuth(), this._unsubSync = Mn((s, t) => {
      this._syncStatus = s, this._syncErrorCount = t;
    });
  }
  disconnectedCallback() {
    var s, t;
    super.disconnectedCallback(), (s = this._unsubAuth) == null || s.call(this), (t = this._unsubSync) == null || t.call(this);
  }
  async _initAuth() {
    try {
      const s = await Ln();
      this._dbMode = await cM(), this._user = s.user, this._unsubAuth = Tn((t) => {
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
    await Nn(), window.location.reload();
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
  _renderSyncStatus() {
    return !this._dbMode || this._syncStatus === "idle" && this._syncErrorCount === 0 ? h : this._syncStatus === "syncing" ? z`
        <li>
          <span class="fr-btn fr-btn--tertiary-no-outline" style="pointer-events:none;color:var(--text-mention-grey);" title="Synchronisation en cours...">
            <i class="ri-refresh-line" style="animation:spin 1s linear infinite;"></i>
          </span>
        </li>
      ` : this._syncStatus === "error" || this._syncErrorCount > 0 ? z`
        <li>
          <span class="fr-btn fr-btn--tertiary-no-outline" style="pointer-events:none;color:var(--text-default-warning);" title="Erreurs de synchronisation (${this._syncErrorCount})">
            <i class="ri-error-warning-line"></i>
          </span>
        </li>
      ` : h;
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
    ` : h;
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
                        Favoris${this._favCount > 0 ? z` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>` : h}
                      </a>
                    </li>
                    ${this._renderSyncStatus()}
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
      ${this._dbMode ? z`<auth-modal></auth-modal>` : h}
    `;
  }
}, o(ht, "AppHeader"), ht);
Qs([
  y({ type: String, attribute: "current-page" })
], ms.prototype, "currentPage", void 0);
Qs([
  y({ type: String, attribute: "base-path" })
], ms.prototype, "basePath", void 0);
Qs([
  F()
], ms.prototype, "_favCount", void 0);
Qs([
  F()
], ms.prototype, "_user", void 0);
Qs([
  F()
], ms.prototype, "_dbMode", void 0);
Qs([
  F()
], ms.prototype, "_syncStatus", void 0);
Qs([
  F()
], ms.prototype, "_syncErrorCount", void 0);
ms = Qs([
  q("app-header")
], ms);
var OM = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, St;
let fi = (St = class extends V {
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
}, o(St, "AppFooter"), St);
OM([
  y({ type: String, attribute: "base-path" })
], fi.prototype, "basePath", void 0);
fi = OM([
  q("app-footer")
], fi);
var mt = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, Ft;
let qs = (Ft = class extends V {
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
    let r = s.clientX - e.left;
    r = Math.max(this.minLeftWidth, Math.min(r, i - this.minRightWidth)), this._currentLeftRatio = r / i * 100, this.requestUpdate();
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
}, o(Ft, "AppLayoutBuilder"), Ft);
mt([
  y({ type: Number, attribute: "left-ratio" })
], qs.prototype, "leftRatio", void 0);
mt([
  y({ type: Number, attribute: "min-left-width" })
], qs.prototype, "minLeftWidth", void 0);
mt([
  y({ type: Number, attribute: "min-right-width" })
], qs.prototype, "minRightWidth", void 0);
mt([
  F()
], qs.prototype, "_isResizing", void 0);
mt([
  F()
], qs.prototype, "_currentLeftRatio", void 0);
qs = mt([
  q("app-layout-builder")
], qs);
var oe = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, Dt;
let Ot = (Dt = class extends V {
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
          { id: "components/gouv-chart-a11y", label: "gouv-chart-a11y", href: "components/gouv-chart-a11y.html" },
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
      const i = `fr-sidemenu-${s.id}`, r = e;
      return z`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${r}"
                  aria-controls="${i}">
            ${s.label}
          </button>
          <div class="fr-collapse ${r ? "fr-collapse--expanded" : ""}" id="${i}">
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
}, o(Dt, "AppLayoutDemo"), Dt);
oe([
  y({ type: String })
], Ot.prototype, "title", void 0);
oe([
  y({ type: String })
], Ot.prototype, "icon", void 0);
oe([
  y({ type: String, attribute: "active-path" })
], Ot.prototype, "activePath", void 0);
oe([
  y({ type: String, attribute: "base-path" })
], Ot.prototype, "basePath", void 0);
Ot = oe([
  q("app-layout-demo")
], Ot);
var _e = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, pt;
let ie = (pt = class extends V {
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
    for (const r of i)
      for (const n of r.items) {
        const a = this._findMatchingItem(n, t, e);
        if (a)
          return a;
      }
    return "";
  }
  _findMatchingItem(s, t, e) {
    const i = s.href;
    if (e && i === t + e || i === t || e && i === e)
      return s.id;
    if (s.children) {
      for (const r of s.children) {
        const n = this._findMatchingItem(r, t, e);
        if (n)
          return n;
      }
      if (!e) {
        const r = s.children.find((n) => {
          const [a] = (n.href || "").split("#");
          return a === t;
        });
        if (r)
          return r.id;
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
      const i = `fr-sidemenu-${s.id}`, r = this._isParentActive(s, t);
      return z`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${r}"
                  aria-controls="${i}">
            ${s.label}
          </button>
          <div class="fr-collapse ${r ? "fr-collapse--expanded" : ""}" id="${i}">
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
           ${e ? z`aria-current="true"` : h}>
          ${s.label}
        </a>
      </li>
    `;
  }
  render() {
    const s = this._getMenu();
    if (!s.length)
      return h;
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
              ` : h}
              <ul class="fr-sidemenu__list">
                ${e.items.map((r) => this._renderItem(r, t))}
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
}, o(pt, "AppSidemenu"), pt);
_e([
  y({ type: String })
], ie.prototype, "section", void 0);
_e([
  y({ type: String, attribute: "active-path" })
], ie.prototype, "activePath", void 0);
_e([
  y({ type: String, attribute: "base-path" })
], ie.prototype, "basePath", void 0);
ie = _e([
  q("app-sidemenu")
], ie);
var st = function(M, s, t, e) {
  var i = arguments.length, r = i < 3 ? s : e === null ? e = Object.getOwnPropertyDescriptor(s, t) : e, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(M, s, t, e);
  else for (var a = M.length - 1; a >= 0; a--) (n = M[a]) && (r = (i < 3 ? n(r) : i > 3 ? n(s, t, r) : n(s, t)) || r);
  return i > 3 && r && Object.defineProperty(s, t, r), r;
}, It;
let Vs = (It = class extends V {
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
          ` : h}
          ${this.showPlaygroundButton ? z`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          ` : h}
          ${this.showSaveButton ? z`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          ` : h}
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
}, o(It, "AppPreviewPanel"), It);
st([
  y({ type: Boolean, attribute: "show-data-tab" })
], Vs.prototype, "showDataTab", void 0);
st([
  y({ type: Boolean, attribute: "show-save-button" })
], Vs.prototype, "showSaveButton", void 0);
st([
  y({ type: Boolean, attribute: "show-playground-button" })
], Vs.prototype, "showPlaygroundButton", void 0);
st([
  y({ type: String, attribute: "tab-labels" })
], Vs.prototype, "tabLabels", void 0);
st([
  y({ type: String, attribute: "active-tab" })
], Vs.prototype, "activeTab", void 0);
st([
  F()
], Vs.prototype, "_activeTab", void 0);
Vs = st([
  q("app-preview-panel")
], Vs);
function Sa(M, s, t) {
  return M.map((e) => ({
    label: String(B(e, s) ?? "N/A"),
    value: Number(B(e, t)) || 0
  }));
}
o(Sa, "extractLabelValues");
function Fa(M, s) {
  if (s === "none")
    return M;
  const t = /* @__PURE__ */ new Map();
  for (const i of M) {
    const r = t.get(i.label) || [];
    r.push(i.value), t.set(i.label, r);
  }
  const e = [];
  for (const [i, r] of t)
    e.push({ label: i, value: Da(r, s) });
  return e;
}
o(Fa, "aggregateByLabel");
function Da(M, s) {
  switch (s) {
    case "sum":
      return M.reduce((t, e) => t + e, 0);
    case "avg":
      return M.reduce((t, e) => t + e, 0) / M.length;
    case "count":
      return M.length;
    case "min":
      return Math.min(...M);
    case "max":
      return Math.max(...M);
    default:
      return M[0] || 0;
  }
}
o(Da, "computeGroupValue");
function pa(M, s) {
  return s === "none" ? M : [...M].sort((t, e) => s === "desc" ? e.value - t.value : t.value - e.value);
}
o(pa, "sortByValue");
function ja(M, s, t, e = "none", i = "none", r = 0) {
  if (!M || M.length === 0)
    return { labels: [], values: [] };
  let n = Sa(M, s, t);
  return n = Fa(n, e), n = pa(n, i), r > 0 && (n = n.slice(0, r)), {
    labels: n.map((a) => a.label),
    values: n.map((a) => Math.round(a.value * 100) / 100)
  };
}
o(ja, "processChartData");
export {
  fi as AppFooter,
  ms as AppHeader,
  qs as AppLayoutBuilder,
  Ot as AppLayoutDemo,
  Ts as DATA_EVENTS,
  hs as GouvChartA11y,
  H as GouvDatalist,
  Ls as GouvDisplay,
  J as GouvDsfrChart,
  A as GouvFacets,
  os as GouvKpi,
  qt as GouvKpiGroup,
  ds as GouvNormalize,
  es as GouvQuery,
  G as GouvSearch,
  _ as GouvSource,
  is as GouvWorldMap,
  Et as SourceSubscriberMixin,
  Fa as aggregateByLabel,
  gr as computeAggregation,
  Cs as dispatchDataError,
  ys as dispatchDataLoaded,
  Us as dispatchDataLoading,
  Sa as extractLabelValues,
  un as formatCurrency,
  Xa as formatDate,
  fr as formatNumber,
  zn as formatPercentage,
  Wr as formatValue,
  yn as getAdapter,
  B as getByPath,
  fa as getByPathOrDefault,
  Ps as getDataCache,
  Wa as hasPath,
  hn as parseExpression,
  ja as processChartData,
  ga as registerAdapter,
  pa as sortByValue,
  ae as subscribeToSource
};
