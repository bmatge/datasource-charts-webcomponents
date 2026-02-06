/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, nt = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ot = Symbol(), ct = /* @__PURE__ */ new WeakMap();
let Et = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== ot) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (nt && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = ct.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && ct.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Dt = (n) => new Et(typeof n == "string" ? n : n + "", void 0, ot), wt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((r, i, s) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[s + 1], n[0]);
  return new Et(e, n, ot);
}, Nt = (n, t) => {
  if (nt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), i = Q.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = e.cssText, n.appendChild(r);
  }
}, ut = nt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return Dt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Tt, defineProperty: Ft, getOwnPropertyDescriptor: Mt, getOwnPropertyNames: Lt, getOwnPropertySymbols: jt, getPrototypeOf: Ut } = Object, D = globalThis, dt = D.trustedTypes, Ht = dt ? dt.emptyScript : "", et = D.reactiveElementPolyfillSupport, I = (n, t) => n, K = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Ht : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, at = (n, t) => !Tt(n, t), pt = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: at };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), D.litPropertyMetadata ?? (D.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = pt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, e);
      i !== void 0 && Ft(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: i, set: s } = Mt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      s == null || s.call(this, o), this.requestUpdate(t, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? pt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = Ut(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const e = this.properties, r = [...Lt(e), ...jt(e)];
      for (const i of r) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, i] of e) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const i = this._$Eu(e, r);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) e.unshift(ut(i));
    } else t !== void 0 && e.push(ut(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Nt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostConnected) == null ? void 0 : r.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostDisconnected) == null ? void 0 : r.call(e);
    });
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    var s;
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((s = r.converter) == null ? void 0 : s.toAttribute) !== void 0 ? r.converter : K).toAttribute(e, r.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var s, o;
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : K;
      this._$Em = i;
      const c = l.fromAttribute(e, a.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, i = !1, s) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (s = this[t]), r ?? (r = a.getPropertyOptions(t)), !((r.hasChanged ?? at)(s, e) || r.useDefault && r.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: i, wrapped: s }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), s !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: a } = o, l = this[s];
        a !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, o, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (r = this._$EO) == null || r.forEach((i) => {
        var s;
        return (s = i.hostUpdate) == null ? void 0 : s.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[I("elementProperties")] = /* @__PURE__ */ new Map(), L[I("finalized")] = /* @__PURE__ */ new Map(), et == null || et({ ReactiveElement: L }), (D.reactiveElementVersions ?? (D.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, ft = (n) => n, Z = V.trustedTypes, gt = Z ? Z.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Pt = "$lit$", R = `lit$${Math.random().toFixed(9).slice(2)}$`, Ot = "?" + R, It = `<${Ot}>`, M = document, z = () => M.createComment(""), B = (n) => n === null || typeof n != "object" && typeof n != "function", lt = Array.isArray, Vt = (n) => lt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", rt = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _t = /-->/g, vt = />/g, N = RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mt = /'/g, bt = /"/g, kt = /^(?:script|style|textarea|title)$/i, zt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), u = zt(1), j = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), T = M.createTreeWalker(M, 129);
function Rt(n, t) {
  if (!lt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gt !== void 0 ? gt.createHTML(t) : t;
}
const Bt = (n, t) => {
  const e = n.length - 1, r = [];
  let i, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = H;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let c, g, d = -1, _ = 0;
    for (; _ < l.length && (o.lastIndex = _, g = o.exec(l), g !== null); ) _ = o.lastIndex, o === H ? g[1] === "!--" ? o = _t : g[1] !== void 0 ? o = vt : g[2] !== void 0 ? (kt.test(g[2]) && (i = RegExp("</" + g[2], "g")), o = N) : g[3] !== void 0 && (o = N) : o === N ? g[0] === ">" ? (o = i ?? H, d = -1) : g[1] === void 0 ? d = -2 : (d = o.lastIndex - g[2].length, c = g[1], o = g[3] === void 0 ? N : g[3] === '"' ? bt : mt) : o === bt || o === mt ? o = N : o === _t || o === vt ? o = H : (o = N, i = void 0);
    const k = o === N && n[a + 1].startsWith("/>") ? " " : "";
    s += o === H ? l + It : d >= 0 ? (r.push(c), l.slice(0, d) + Pt + l.slice(d) + R + k) : l + R + (d === -2 ? a : k);
  }
  return [Rt(n, s + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class G {
  constructor({ strings: t, _$litType$: e }, r) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, g] = Bt(t, e);
    if (this.el = G.createElement(c, r), T.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = T.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Pt)) {
          const _ = g[o++], k = i.getAttribute(d).split(R), W = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: s, name: W[2], strings: k, ctor: W[1] === "." ? qt : W[1] === "?" ? Jt : W[1] === "@" ? Wt : X }), i.removeAttribute(d);
        } else d.startsWith(R) && (l.push({ type: 6, index: s }), i.removeAttribute(d));
        if (kt.test(i.tagName)) {
          const d = i.textContent.split(R), _ = d.length - 1;
          if (_ > 0) {
            i.textContent = Z ? Z.emptyScript : "";
            for (let k = 0; k < _; k++) i.append(d[k], z()), T.nextNode(), l.push({ type: 2, index: ++s });
            i.append(d[_], z());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ot) l.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(R, d + 1)) !== -1; ) l.push({ type: 7, index: s }), d += R.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const r = M.createElement("template");
    return r.innerHTML = t, r;
  }
}
function U(n, t, e = n, r) {
  var o, a;
  if (t === j) return t;
  let i = r !== void 0 ? (o = e._$Co) == null ? void 0 : o[r] : e._$Cl;
  const s = B(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), s === void 0 ? i = void 0 : (i = new s(n), i._$AT(n, e, r)), r !== void 0 ? (e._$Co ?? (e._$Co = []))[r] = i : e._$Cl = i), i !== void 0 && (t = U(n, i._$AS(n, t.values), i, r)), t;
}
class Gt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: r } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? M).importNode(e, !0);
    T.currentNode = i;
    let s = T.nextNode(), o = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new q(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new Qt(s, this, t)), this._$AV.push(c), l = r[++a];
      }
      o !== (l == null ? void 0 : l.index) && (s = T.nextNode(), o++);
    }
    return T.currentNode = M, i;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class q {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, r, i) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = U(this, t, e), B(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== j && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && B(this._$AH) ? this._$AA.nextSibling.data = t : this.T(M.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: e, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = G.createElement(Rt(r.h, r.h[0]), this.options)), r);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(e);
    else {
      const o = new Gt(i, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = yt.get(t.strings);
    return e === void 0 && yt.set(t.strings, e = new G(t)), e;
  }
  k(t) {
    lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, i = 0;
    for (const s of t) i === e.length ? e.push(r = new q(this.O(z()), this.O(z()), this, this.options)) : r = e[i], r._$AI(s), i++;
    i < e.length && (this._$AR(r && r._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = ft(t).nextSibling;
      ft(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class X {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, i, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = m;
  }
  _$AI(t, e = this, r, i) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) t = U(this, t, e, 0), o = !B(t) || t !== this._$AH && t !== j, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = U(this, a[r + l], e, l), c === j && (c = this._$AH[l]), o || (o = !B(c) || c !== this._$AH[l]), c === m ? t = m : t !== m && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class qt extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Jt extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class Wt extends X {
  constructor(t, e, r, i, s) {
    super(t, e, r, i, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = U(this, t, e, 0) ?? m) === j) return;
    const r = this._$AH, i = t === m && r !== m || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, s = t !== m && (r === m || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Qt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    U(this, t);
  }
}
const it = V.litHtmlPolyfillSupport;
it == null || it(G, q), (V.litHtmlVersions ?? (V.litHtmlVersions = [])).push("3.3.2");
const Kt = (n, t, e) => {
  const r = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = (e == null ? void 0 : e.renderBefore) ?? null;
    r._$litPart$ = i = new q(t.insertBefore(z(), s), s, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis;
class O extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Kt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return j;
  }
}
var Ct;
O._$litElement$ = !0, O.finalized = !0, (Ct = F.litElementHydrateSupport) == null || Ct.call(F, { LitElement: O });
const st = F.litElementPolyfillSupport;
st == null || st({ LitElement: O });
(F.litElementVersions ?? (F.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = { attribute: !0, type: String, converter: K, reflect: !1, hasChanged: at }, Xt = (n = Zt, t, e) => {
  const { kind: r, metadata: i } = e;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), r === "setter" && ((n = Object.create(n)).wrapped = !0), s.set(e.name, n), r === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, n, a), a;
    } };
  }
  if (r === "setter") {
    const { name: o } = e;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function h(n) {
  return (t, e) => typeof e == "object" ? Xt(n, t, e) : ((r, i, s) => {
    const o = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), o ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function v(n) {
  return h({ ...n, state: !0, attribute: !1 });
}
function P(n, t) {
  if (!t || t.trim() === "")
    return n;
  const r = t.replace(/\[(\d+)\]/g, ".$1").split(".");
  let i = n;
  for (const s of r) {
    if (i == null || typeof i != "object")
      return;
    i = i[s];
  }
  return i;
}
function ue(n, t) {
  return P(n, t) !== void 0;
}
function de(n, t, e) {
  const r = P(n, t);
  return r !== void 0 ? r : e;
}
const w = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading"
}, ht = /* @__PURE__ */ new Map();
function Yt(n, t) {
  ht.set(n, t);
}
function Y(n) {
  return ht.get(n);
}
function te(n) {
  ht.delete(n);
}
function ee(n, t) {
  Yt(n, t);
  const e = new CustomEvent(w.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, data: t }
  });
  document.dispatchEvent(e);
}
function re(n, t) {
  const e = new CustomEvent(w.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n, error: t }
  });
  document.dispatchEvent(e);
}
function ie(n) {
  const t = new CustomEvent(w.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: n }
  });
  document.dispatchEvent(t);
}
function tt(n, t) {
  const e = (s) => {
    const o = s;
    o.detail.sourceId === n && t.onLoaded && t.onLoaded(o.detail.data);
  }, r = (s) => {
    const o = s;
    o.detail.sourceId === n && t.onError && t.onError(o.detail.error);
  }, i = (s) => {
    s.detail.sourceId === n && t.onLoading && t.onLoading();
  };
  return document.addEventListener(w.LOADED, e), document.addEventListener(w.ERROR, r), document.addEventListener(w.LOADING, i), () => {
    document.removeEventListener(w.LOADED, e), document.removeEventListener(w.ERROR, r), document.removeEventListener(w.LOADING, i);
  };
}
var E = function(n, t, e, r) {
  var i = arguments.length, s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, t, e, r);
  else for (var a = n.length - 1; a >= 0; a--) (o = n[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, e, s) : o(t, e)) || s);
  return i > 3 && s && Object.defineProperty(t, e, s), s;
};
let C = class extends O {
  constructor() {
    super(...arguments), this.url = "", this.method = "GET", this.headers = "", this.params = "", this.refresh = 0, this.transform = "", this._loading = !1, this._error = null, this._data = null, this._refreshInterval = null, this._abortController = null;
  }
  // Pas de rendu - composant invisible
  createRenderRoot() {
    return this;
  }
  render() {
    return u``;
  }
  connectedCallback() {
    super.connectedCallback(), this._fetchData(), this._setupRefresh();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && te(this.id);
  }
  updated(t) {
    (t.has("url") || t.has("params") || t.has("transform")) && this._fetchData(), t.has("refresh") && this._setupRefresh();
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
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, ie(this.id);
      try {
        const t = this._buildUrl(), e = this._buildFetchOptions(), r = await fetch(t, {
          ...e,
          signal: this._abortController.signal
        });
        if (!r.ok)
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        const i = await r.json();
        this._data = this.transform ? P(i, this.transform) : i, ee(this.id, this._data);
      } catch (t) {
        if (t.name === "AbortError")
          return;
        this._error = t, re(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, t);
      } finally {
        this._loading = !1;
      }
    }
  }
  _buildUrl() {
    const t = new URL(this.url, window.location.origin);
    if (this.params && this.method === "GET")
      try {
        const e = JSON.parse(this.params);
        Object.entries(e).forEach(([r, i]) => {
          t.searchParams.set(r, String(i));
        });
      } catch (e) {
        console.warn("gouv-source: params invalides (JSON attendu)", e);
      }
    return t.toString();
  }
  _buildFetchOptions() {
    const t = {
      method: this.method
    };
    if (this.headers)
      try {
        t.headers = JSON.parse(this.headers);
      } catch (e) {
        console.warn("gouv-source: headers invalides (JSON attendu)", e);
      }
    return this.method === "POST" && this.params && (t.headers = {
      "Content-Type": "application/json",
      ...t.headers || {}
    }, t.body = this.params), t;
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
  h({ type: String })
], C.prototype, "url", void 0);
E([
  h({ type: String })
], C.prototype, "method", void 0);
E([
  h({ type: String })
], C.prototype, "headers", void 0);
E([
  h({ type: String })
], C.prototype, "params", void 0);
E([
  h({ type: Number })
], C.prototype, "refresh", void 0);
E([
  h({ type: String })
], C.prototype, "transform", void 0);
E([
  v()
], C.prototype, "_loading", void 0);
E([
  v()
], C.prototype, "_error", void 0);
E([
  v()
], C.prototype, "_data", void 0);
C = E([
  J("gouv-source")
], C);
function $t(n, t = "nombre") {
  if (n == null || n === "")
    return "—";
  const e = typeof n == "string" ? parseFloat(n) : n;
  if (isNaN(e))
    return "—";
  switch (t) {
    case "nombre":
      return At(e);
    case "pourcentage":
      return se(e);
    case "euro":
      return ne(e);
    case "decimal":
      return oe(e);
    default:
      return At(e);
  }
}
function At(n) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(n));
}
function se(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(n / 100);
}
function ne(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n);
}
function oe(n) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(n);
}
function fe(n) {
  const t = typeof n == "string" ? new Date(n) : n;
  return isNaN(t.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(t);
}
function ae(n, t, e) {
  return t !== void 0 && n >= t ? "vert" : e !== void 0 && n >= e ? "orange" : t !== void 0 || e !== void 0 ? "rouge" : "bleu";
}
function le(n) {
  const t = n.split(":");
  if (t.length === 1)
    return { type: "direct", field: t[0] };
  const e = t[0], r = t[1];
  if (t.length === 3) {
    let i = t[2];
    return i === "true" ? i = !0 : i === "false" ? i = !1 : isNaN(Number(i)) || (i = Number(i)), { type: e, field: r, filterField: r, filterValue: i };
  }
  return { type: e, field: r };
}
function St(n, t) {
  const e = le(t);
  if (e.type === "direct" && !Array.isArray(n))
    return n[e.field];
  if (!Array.isArray(n))
    return null;
  const r = n;
  switch (e.type) {
    case "direct":
    case "first":
      return r.length > 0 ? r[0][e.field] : null;
    case "last":
      return r.length > 0 ? r[r.length - 1][e.field] : null;
    case "count":
      return e.filterValue !== void 0 ? r.filter((s) => s[e.field] === e.filterValue).length : r.length;
    case "sum":
      return r.reduce((s, o) => {
        const a = Number(o[e.field]);
        return s + (isNaN(a) ? 0 : a);
      }, 0);
    case "avg":
      return r.length === 0 ? null : r.reduce((s, o) => {
        const a = Number(o[e.field]);
        return s + (isNaN(a) ? 0 : a);
      }, 0) / r.length;
    case "min":
      return r.length === 0 ? null : Math.min(...r.map((s) => Number(s[e.field])).filter((s) => !isNaN(s)));
    case "max":
      return r.length === 0 ? null : Math.max(...r.map((s) => Number(s[e.field])).filter((s) => !isNaN(s)));
    default:
      return null;
  }
}
var x = function(n, t, e, r) {
  var i = arguments.length, s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, t, e, r);
  else for (var a = n.length - 1; a >= 0; a--) (o = n[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, e, s) : o(t, e)) || s);
  return i > 3 && s && Object.defineProperty(t, e, s), s;
};
let $ = class extends O {
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
  updated(t) {
    t.has("source") && this._subscribeToSource();
  }
  _subscribeToSource() {
    if (this._unsubscribe && this._unsubscribe(), !this.source)
      return;
    const t = Y(this.source);
    t !== void 0 && (this._data = t), this._unsubscribe = tt(this.source, {
      onLoaded: (e) => {
        this._data = e, this._loading = !1, this._error = null;
      },
      onLoading: () => {
        this._loading = !0;
      },
      onError: (e) => {
        this._error = e, this._loading = !1;
      }
    });
  }
  _computeValue() {
    return !this._data || !this.valeur ? null : St(this._data, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const t = this._computeValue();
    return typeof t != "number" ? "bleu" : ae(t, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._data)
      return null;
    const t = St(this._data, this.tendance);
    return typeof t != "number" ? null : {
      value: t,
      direction: t > 0 ? "up" : t < 0 ? "down" : "stable"
    };
  }
  _getColorClass() {
    const t = this._getColor(), e = {
      vert: "gouv-kpi--success",
      orange: "gouv-kpi--warning",
      rouge: "gouv-kpi--error",
      bleu: "gouv-kpi--info"
    };
    return e[t] || e.bleu;
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const t = this._computeValue(), e = $t(t, this.format);
    return `${this.label}: ${e}`;
  }
  render() {
    const t = this._computeValue(), e = $t(t, this.format), r = this._getColorClass(), i = this._getTendanceInfo();
    return u`
      <div
        class="gouv-kpi ${r}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._loading ? u`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._error ? u`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : u`
          <div class="gouv-kpi__content">
            ${this.icone ? u`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            ` : ""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${e}</span>
              ${i ? u`
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
$.styles = wt`
    /* Styles injectés via Light DOM, utilise les classes DSFR */
  `;
x([
  h({ type: String })
], $.prototype, "source", void 0);
x([
  h({ type: String })
], $.prototype, "valeur", void 0);
x([
  h({ type: String })
], $.prototype, "label", void 0);
x([
  h({ type: String })
], $.prototype, "description", void 0);
x([
  h({ type: String })
], $.prototype, "icone", void 0);
x([
  h({ type: String })
], $.prototype, "format", void 0);
x([
  h({ type: String })
], $.prototype, "tendance", void 0);
x([
  h({ type: Number, attribute: "seuil-vert" })
], $.prototype, "seuilVert", void 0);
x([
  h({ type: Number, attribute: "seuil-orange" })
], $.prototype, "seuilOrange", void 0);
x([
  h({ type: String })
], $.prototype, "couleur", void 0);
x([
  v()
], $.prototype, "_loading", void 0);
x([
  v()
], $.prototype, "_data", void 0);
x([
  v()
], $.prototype, "_error", void 0);
$ = x([
  J("gouv-kpi")
], $);
var S = function(n, t, e, r) {
  var i = arguments.length, s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, t, e, r);
  else for (var a = n.length - 1; a >= 0; a--) (o = n[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, e, s) : o(t, e)) || s);
  return i > 3 && s && Object.defineProperty(t, e, s), s;
};
let b = class extends O {
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
  updated(t) {
    t.has("source") && this._subscribeToSource(), t.has("tri") && this._initSort();
  }
  _initSort() {
    if (this.tri) {
      const [t, e] = this.tri.split(":");
      this._sort = { key: t, direction: e || "asc" };
    }
  }
  _subscribeToSource() {
    if (this._unsubscribe && this._unsubscribe(), !this.source)
      return;
    const t = Y(this.source);
    Array.isArray(t) && (this._data = t), this._unsubscribe = tt(this.source, {
      onLoaded: (e) => {
        this._data = Array.isArray(e) ? e : [], this._loading = !1, this._error = null, this._currentPage = 1;
      },
      onLoading: () => {
        this._loading = !0;
      },
      onError: (e) => {
        this._error = e, this._loading = !1;
      }
    });
  }
  _parseColumns() {
    return this.colonnes ? this.colonnes.split(",").map((t) => {
      const [e, r] = t.trim().split(":");
      return { key: e.trim(), label: (r == null ? void 0 : r.trim()) || e.trim() };
    }) : [];
  }
  _getFilterableColumns() {
    return this.filtres ? this.filtres.split(",").map((t) => t.trim()) : [];
  }
  _getUniqueValues(t) {
    const e = /* @__PURE__ */ new Set();
    return this._data.forEach((r) => {
      const i = r[t];
      i != null && e.add(String(i));
    }), Array.from(e).sort();
  }
  _getFilteredData() {
    let t = [...this._data];
    if (this._searchQuery) {
      const e = this._searchQuery.toLowerCase();
      t = t.filter((r) => Object.values(r).some((i) => String(i).toLowerCase().includes(e)));
    }
    if (Object.entries(this._activeFilters).forEach(([e, r]) => {
      r && (t = t.filter((i) => String(i[e]) === r));
    }), this._sort) {
      const { key: e, direction: r } = this._sort;
      t.sort((i, s) => {
        const o = i[e], a = s[e];
        if (o === a)
          return 0;
        if (o == null)
          return 1;
        if (a == null)
          return -1;
        const l = typeof o == "number" && typeof a == "number" ? o - a : String(o).localeCompare(String(a), "fr");
        return r === "desc" ? -l : l;
      });
    }
    return t;
  }
  _getPaginatedData() {
    const t = this._getFilteredData();
    if (!this.pagination || this.pagination <= 0)
      return t;
    const e = (this._currentPage - 1) * this.pagination;
    return t.slice(e, e + this.pagination);
  }
  _getTotalPages() {
    return !this.pagination || this.pagination <= 0 ? 1 : Math.ceil(this._getFilteredData().length / this.pagination);
  }
  _handleSearch(t) {
    const e = t.target;
    this._searchQuery = e.value, this._currentPage = 1;
  }
  _handleFilter(t, e) {
    const r = e.target;
    this._activeFilters = { ...this._activeFilters, [t]: r.value }, this._currentPage = 1;
  }
  _handleSort(t) {
    var e;
    ((e = this._sort) == null ? void 0 : e.key) === t ? this._sort = {
      key: t,
      direction: this._sort.direction === "asc" ? "desc" : "asc"
    } : this._sort = { key: t, direction: "asc" };
  }
  _handlePageChange(t) {
    this._currentPage = t;
  }
  _exportCsv() {
    const t = this._parseColumns(), e = this._getFilteredData(), r = t.map((c) => c.label).join(";"), i = e.map((c) => t.map((g) => {
      const d = c[g.key], _ = String(d ?? "");
      return _.includes(";") || _.includes('"') ? `"${_.replace(/"/g, '""')}"` : _;
    }).join(";")), s = [r, ...i].join(`
`), o = new Blob([s], { type: "text/csv;charset=utf-8;" }), a = URL.createObjectURL(o), l = document.createElement("a");
    l.href = a, l.download = "export.csv", l.click(), URL.revokeObjectURL(a);
  }
  _formatCellValue(t) {
    return t == null ? "—" : typeof t == "boolean" ? t ? "Oui" : "Non" : String(t);
  }
  render() {
    var o, a;
    const t = this._parseColumns(), e = this._getFilterableColumns(), r = this._getPaginatedData(), i = this._getTotalPages(), s = this._getFilteredData().length;
    return u`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        <!-- Filtres -->
        ${e.length > 0 ? u`
          <div class="gouv-datalist__filters">
            ${e.map((l) => {
      const c = t.find((_) => _.key === l), g = (c == null ? void 0 : c.label) || l, d = this._getUniqueValues(l);
      return u`
                <div class="fr-select-group">
                  <label class="fr-label" for="filter-${l}">${g}</label>
                  <select
                    class="fr-select"
                    id="filter-${l}"
                    @change="${(_) => this._handleFilter(l, _)}"
                  >
                    <option value="">Tous</option>
                    ${d.map((_) => u`
                      <option value="${_}" ?selected="${this._activeFilters[l] === _}">${_}</option>
                    `)}
                  </select>
                </div>
              `;
    })}
          </div>
        ` : ""}

        <!-- Barre de recherche et export -->
        ${this.recherche || (o = this.export) != null && o.includes("csv") ? u`
          <div class="gouv-datalist__toolbar">
            ${this.recherche ? u`
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
            ` : u`<div></div>`}

            ${(a = this.export) != null && a.includes("csv") ? u`
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
        ${this._loading ? u`
          <div class="gouv-datalist__loading" aria-live="polite">
            Chargement des données...
          </div>
        ` : this._error ? u`
          <div class="gouv-datalist__error" aria-live="assertive">
            Erreur: ${this._error.message}
          </div>
        ` : u`
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
                  ${t.map((l) => {
      var c;
      return u`
                    <th scope="col">
                      <button
                        class="gouv-datalist__sort-btn"
                        @click="${() => this._handleSort(l.key)}"
                        aria-label="Trier par ${l.label}"
                        type="button"
                      >
                        ${l.label}
                        ${((c = this._sort) == null ? void 0 : c.key) === l.key ? u`
                          <span aria-hidden="true">${this._sort.direction === "asc" ? "↑" : "↓"}</span>
                        ` : ""}
                      </button>
                    </th>
                  `;
    })}
                </tr>
              </thead>
              <tbody>
                ${r.length === 0 ? u`
                  <tr>
                    <td colspan="${t.length}" class="gouv-datalist__empty">
                      Aucune donnée à afficher
                    </td>
                  </tr>
                ` : r.map((l) => u`
                  <tr>
                    ${t.map((c) => u`
                      <td>${this._formatCellValue(l[c.key])}</td>
                    `)}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          ${this.pagination > 0 && i > 1 ? u`
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
  _renderPageNumbers(t) {
    const e = [], r = this._currentPage;
    for (let i = Math.max(1, r - 2); i <= Math.min(t, r + 2); i++)
      e.push(i);
    return e.map((i) => u`
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
b.styles = wt``;
S([
  h({ type: String })
], b.prototype, "source", void 0);
S([
  h({ type: String })
], b.prototype, "colonnes", void 0);
S([
  h({ type: Boolean })
], b.prototype, "recherche", void 0);
S([
  h({ type: String })
], b.prototype, "filtres", void 0);
S([
  h({ type: String })
], b.prototype, "tri", void 0);
S([
  h({ type: Number })
], b.prototype, "pagination", void 0);
S([
  h({ type: String })
], b.prototype, "export", void 0);
S([
  v()
], b.prototype, "_loading", void 0);
S([
  v()
], b.prototype, "_data", void 0);
S([
  v()
], b.prototype, "_error", void 0);
S([
  v()
], b.prototype, "_searchQuery", void 0);
S([
  v()
], b.prototype, "_activeFilters", void 0);
S([
  v()
], b.prototype, "_sort", void 0);
S([
  v()
], b.prototype, "_currentPage", void 0);
b = S([
  J("gouv-datalist")
], b);
var A = function(n, t, e, r) {
  var i = arguments.length, s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, t, e, r);
  else for (var a = n.length - 1; a >= 0; a--) (o = n[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, e, s) : o(t, e)) || s);
  return i > 3 && s && Object.defineProperty(t, e, s), s;
};
const xt = [
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
let y = class extends O {
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
  updated(t) {
    t.has("source") && this._subscribeToSource(), ["type", "indexAxis", "labelField", "valueField", "aggregation", "limit", "sortOrder", "title", "subtitle", "color", "height"].some((i) => t.has(i)) && this._data.length > 0 && this._renderChart();
  }
  _subscribeToSource() {
    if (this._unsubscribe && this._unsubscribe(), !this.source)
      return;
    const t = Y(this.source);
    t !== void 0 && Array.isArray(t) && (this._data = t, this.updateComplete.then(() => this._renderChart())), this._unsubscribe = tt(this.source, {
      onLoaded: (e) => {
        this._data = Array.isArray(e) ? e : [], this._loading = !1, this._error = null, this.updateComplete.then(() => this._renderChart());
      },
      onLoading: () => {
        this._loading = !0;
      },
      onError: (e) => {
        this._error = e, this._loading = !1;
      }
    });
  }
  _processData() {
    if (!this._data || !Array.isArray(this._data) || this._data.length === 0)
      return { labels: [], values: [] };
    let t = this._data.map((e) => ({
      label: String(P(e, this.labelField) ?? "N/A"),
      value: Number(P(e, this.valueField)) || 0
    }));
    return this.aggregation !== "none" && (t = this._aggregate(t)), this.sortOrder !== "none" && t.sort((e, r) => this.sortOrder === "desc" ? r.value - e.value : e.value - r.value), this.limit > 0 && (t = t.slice(0, this.limit)), {
      labels: t.map((e) => e.label),
      values: t.map((e) => Math.round(e.value * 100) / 100)
    };
  }
  _aggregate(t) {
    const e = /* @__PURE__ */ new Map();
    for (const i of t) {
      const s = e.get(i.label) || [];
      s.push(i.value), e.set(i.label, s);
    }
    const r = [];
    for (const [i, s] of e) {
      let o;
      switch (this.aggregation) {
        case "sum":
          o = s.reduce((a, l) => a + l, 0);
          break;
        case "avg":
          o = s.reduce((a, l) => a + l, 0) / s.length;
          break;
        case "count":
          o = s.length;
          break;
        case "min":
          o = Math.min(...s);
          break;
        case "max":
          o = Math.max(...s);
          break;
        default:
          o = s[0] || 0;
      }
      r.push({ label: i, value: o });
    }
    return r;
  }
  _destroyChart() {
    this._chartInstance && (this._chartInstance.destroy(), this._chartInstance = null);
  }
  _renderChart() {
    const t = this.querySelector(`#${this._canvasId}`);
    if (!t)
      return;
    if (typeof Chart > "u") {
      console.error("gouv-chart: Chart.js non chargé");
      return;
    }
    this._destroyChart();
    const { labels: e, values: r } = this._processData();
    if (e.length === 0)
      return;
    const i = t.getContext("2d");
    if (!i)
      return;
    const s = ["pie", "doughnut", "radar"].includes(this.type), o = s ? e.map((l, c) => xt[c % xt.length]) : this.color, a = {
      type: this.type === "radar" ? "radar" : this.type,
      data: {
        labels: e,
        datasets: [{
          label: this.valueField.split(".").pop() || "Valeur",
          data: r,
          backgroundColor: o,
          borderColor: s ? o : this.color,
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
    this._chartInstance = new Chart(i, a);
  }
  _getAccessibleTableHtml() {
    const { labels: t, values: e } = this._processData();
    if (t.length === 0)
      return "";
    const r = t.map((i, s) => `<tr><td>${this._escapeHtml(i)}</td><td>${e[s]}</td></tr>`).join("");
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
  _escapeHtml(t) {
    const e = document.createElement("div");
    return e.textContent = t, e.innerHTML;
  }
  render() {
    return u`
      <div class="gouv-chart-container" style="height: ${this.height}px;">
        ${this._loading ? u`
          <div class="gouv-chart__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._error ? u`
          <div class="gouv-chart__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement: ${this._error.message}
          </div>
        ` : u`
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
A([
  h({ type: String })
], y.prototype, "source", void 0);
A([
  h({ type: String })
], y.prototype, "type", void 0);
A([
  h({ type: String, attribute: "index-axis" })
], y.prototype, "indexAxis", void 0);
A([
  h({ type: String, attribute: "label-field" })
], y.prototype, "labelField", void 0);
A([
  h({ type: String, attribute: "value-field" })
], y.prototype, "valueField", void 0);
A([
  h({ type: String })
], y.prototype, "aggregation", void 0);
A([
  h({ type: Number })
], y.prototype, "limit", void 0);
A([
  h({ type: String, attribute: "sort-order" })
], y.prototype, "sortOrder", void 0);
A([
  h({ type: String })
], y.prototype, "title", void 0);
A([
  h({ type: String })
], y.prototype, "subtitle", void 0);
A([
  h({ type: String })
], y.prototype, "color", void 0);
A([
  h({ type: Number })
], y.prototype, "height", void 0);
A([
  v()
], y.prototype, "_loading", void 0);
A([
  v()
], y.prototype, "_data", void 0);
A([
  v()
], y.prototype, "_error", void 0);
y = A([
  J("gouv-chart")
], y);
var f = function(n, t, e, r) {
  var i = arguments.length, s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(n, t, e, r);
  else for (var a = n.length - 1; a >= 0; a--) (o = n[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, e, s) : o(t, e)) || s);
  return i > 3 && s && Object.defineProperty(t, e, s), s;
};
let p = class extends O {
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
  updated(t) {
    t.has("source") && this._subscribeToSource();
  }
  _subscribeToSource() {
    if (this._unsubscribe && this._unsubscribe(), !this.source)
      return;
    const t = Y(this.source);
    t !== void 0 && Array.isArray(t) && (this._data = t), this._unsubscribe = tt(this.source, {
      onLoaded: (e) => {
        this._data = Array.isArray(e) ? e : [], this._loading = !1, this._error = null;
      },
      onLoading: () => {
        this._loading = !0;
      },
      onError: (e) => {
        this._error = e, this._loading = !1;
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
    const t = [], e = [], r = [];
    for (const a of this._data) {
      const l = P(a, this.labelField), c = P(a, this.valueField);
      if (t.push(String(l ?? "N/A")), e.push(Number(c) || 0), this.valueField2) {
        const g = P(a, this.valueField2);
        r.push(Number(g) || 0);
      }
    }
    const i = JSON.stringify([t]), s = JSON.stringify([e]), o = this.valueField2 ? JSON.stringify([r]) : void 0;
    return { x: i, y: s, y2: o };
  }
  /**
   * Génère les attributs communs pour tous les types de charts
   */
  _getCommonAttributes() {
    const t = {};
    if (this.selectedPalette && (t["selected-palette"] = this.selectedPalette), this.unitTooltip && (t["unit-tooltip"] = this.unitTooltip), this.xMin && (t["x-min"] = this.xMin), this.xMax && (t["x-max"] = this.xMax), this.yMin && (t["y-min"] = this.yMin), this.yMax && (t["y-max"] = this.yMax), this.name)
      t.name = this.name;
    else if (this.valueField) {
      const e = this.valueField2 ? [this.valueField, this.valueField2] : [this.valueField];
      t.name = JSON.stringify(e);
    }
    return t;
  }
  /**
   * Rend le composant DSFR Chart approprié selon le type
   */
  _renderChart() {
    const { x: t, y: e, y2: r } = this._processData(), i = this._getCommonAttributes();
    switch (this.type) {
      case "line":
        return this._createChartElement("line-chart", { x: t, y: e, ...i });
      case "bar":
        return this._createChartElement("bar-chart", {
          x: t,
          y: e,
          ...i,
          ...this.horizontal ? { horizontal: "true" } : {},
          ...this.stacked ? { stacked: "true" } : {},
          ...this.highlightIndex ? { "highlight-index": this.highlightIndex } : {}
        });
      case "pie":
        return this._createChartElement("pie-chart", {
          x: t,
          y: e,
          ...i,
          ...this.fill ? { fill: "true" } : {}
        });
      case "radar":
        return this._createChartElement("radar-chart", { x: t, y: e, ...i });
      case "scatter":
        return this._createChartElement("scatter-chart", { x: t, y: e, ...i });
      case "gauge":
        const s = this.gaugeValue ?? (this._data.length > 0 && Number(P(this._data[0], this.valueField)) || 0);
        return this._createChartElement("gauge-chart", {
          percent: String(Math.round(s)),
          init: "0",
          target: "100",
          ...i
        });
      case "bar-line":
        return this._createChartElement("bar-line-chart", {
          x: t,
          "y-bar": e,
          "y-line": r || e,
          ...i,
          ...this.unitTooltipBar ? { "unit-tooltip-bar": this.unitTooltipBar } : {}
        });
      case "map":
        return this._createChartElement("map-chart", {
          x: t,
          y: e,
          ...i,
          ...this.mapHighlight ? { highlight: this.mapHighlight } : {}
        });
      case "map-reg":
        return this._createChartElement("map-chart-reg", {
          x: t,
          y: e,
          ...i,
          ...this.mapHighlight ? { highlight: this.mapHighlight } : {}
        });
      default:
        return u`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    }
  }
  /**
   * Crée un élément DSFR Chart avec les attributs spécifiés
   */
  _createChartElement(t, e) {
    const r = document.createElement(t);
    for (const [s, o] of Object.entries(e))
      o !== void 0 && o !== "" && r.setAttribute(s, o);
    const i = Object.entries(e).filter(([, s]) => s !== void 0 && s !== "").map(([s, o]) => `${s}='${o.replace(/'/g, "\\'")}'`).join(" ");
    return u`<div class="gouv-dsfr-chart__wrapper" .innerHTML="${`<${t} ${i}></${t}>`}"></div>`;
  }
  render() {
    return this._loading ? u`
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
      ` : this._error ? u`
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
      ` : !this._data || this._data.length === 0 ? u`
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
  h({ type: String })
], p.prototype, "source", void 0);
f([
  h({ type: String })
], p.prototype, "type", void 0);
f([
  h({ type: String, attribute: "label-field" })
], p.prototype, "labelField", void 0);
f([
  h({ type: String, attribute: "value-field" })
], p.prototype, "valueField", void 0);
f([
  h({ type: String, attribute: "value-field-2" })
], p.prototype, "valueField2", void 0);
f([
  h({ type: String })
], p.prototype, "name", void 0);
f([
  h({ type: String, attribute: "selected-palette" })
], p.prototype, "selectedPalette", void 0);
f([
  h({ type: String, attribute: "unit-tooltip" })
], p.prototype, "unitTooltip", void 0);
f([
  h({ type: String, attribute: "unit-tooltip-bar" })
], p.prototype, "unitTooltipBar", void 0);
f([
  h({ type: Boolean })
], p.prototype, "horizontal", void 0);
f([
  h({ type: Boolean })
], p.prototype, "stacked", void 0);
f([
  h({ type: Boolean })
], p.prototype, "fill", void 0);
f([
  h({ type: String, attribute: "highlight-index" })
], p.prototype, "highlightIndex", void 0);
f([
  h({ type: String, attribute: "x-min" })
], p.prototype, "xMin", void 0);
f([
  h({ type: String, attribute: "x-max" })
], p.prototype, "xMax", void 0);
f([
  h({ type: String, attribute: "y-min" })
], p.prototype, "yMin", void 0);
f([
  h({ type: String, attribute: "y-max" })
], p.prototype, "yMax", void 0);
f([
  h({ type: Number, attribute: "gauge-value" })
], p.prototype, "gaugeValue", void 0);
f([
  h({ type: String, attribute: "map-highlight" })
], p.prototype, "mapHighlight", void 0);
f([
  v()
], p.prototype, "_loading", void 0);
f([
  v()
], p.prototype, "_data", void 0);
f([
  v()
], p.prototype, "_error", void 0);
p = f([
  J("gouv-dsfr-chart")
], p);
export {
  w as DATA_EVENTS,
  y as GouvChart,
  b as GouvDatalist,
  p as GouvDsfrChart,
  $ as GouvKpi,
  C as GouvSource,
  St as computeAggregation,
  re as dispatchDataError,
  ee as dispatchDataLoaded,
  ie as dispatchDataLoading,
  ne as formatCurrency,
  fe as formatDate,
  At as formatNumber,
  se as formatPercentage,
  $t as formatValue,
  P as getByPath,
  de as getByPathOrDefault,
  Y as getDataCache,
  ue as hasPath,
  le as parseExpression,
  tt as subscribeToSource
};
