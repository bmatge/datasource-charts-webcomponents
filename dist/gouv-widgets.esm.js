/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, Z = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), st = /* @__PURE__ */ new WeakMap();
let bt = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = st.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && st.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pt = (s) => new bt(typeof s == "string" ? s : s + "", void 0, X), $t = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((r, i, n) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[n + 1], s[0]);
  return new bt(e, s, X);
}, xt = (s, t) => {
  if (Z) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), i = z.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = e.cssText, s.appendChild(r);
  }
}, nt = Z ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return Pt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: kt, defineProperty: Ot, getOwnPropertyDescriptor: Rt, getOwnPropertyNames: Dt, getOwnPropertySymbols: Nt, getPrototypeOf: Tt } = Object, w = globalThis, ot = w.trustedTypes, Lt = ot ? ot.emptyScript : "", W = w.reactiveElementPolyfillSupport, U = (s, t) => s, B = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Lt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, Y = (s, t) => !kt(s, t), at = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: Y };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let D = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, e);
      i !== void 0 && Ot(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: i, set: n } = Rt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Tt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, r = [...Dt(e), ...Nt(e)];
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
      for (const i of r) e.unshift(nt(i));
    } else t !== void 0 && e.push(nt(t));
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
    return xt(t, this.constructor.elementStyles), t;
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
    var n;
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : B).toAttribute(e, r.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : B;
      this._$Em = i;
      const h = l.fromAttribute(e, a.type);
      this[i] = h ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, i = !1, n) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), r ?? (r = a.getPropertyOptions(t)), !((r.hasChanged ?? Y)(n, e) || r.useDefault && r.reflect && n === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: i, wrapped: n }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: a } = o, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (r = this._$EO) == null || r.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
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
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[U("elementProperties")] = /* @__PURE__ */ new Map(), D[U("finalized")] = /* @__PURE__ */ new Map(), W == null || W({ ReactiveElement: D }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, lt = (s) => s, q = M.trustedTypes, ct = q ? q.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, yt = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, At = "?" + C, Ut = `<${At}>`, R = document, j = () => R.createComment(""), F = (s) => s === null || typeof s != "object" && typeof s != "function", tt = Array.isArray, Mt = (s) => tt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ht = /-->/g, ut = />/g, P = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), dt = /'/g, pt = /"/g, Et = /^(?:script|style|textarea|title)$/i, jt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), d = jt(1), N = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), x = R.createTreeWalker(R, 129);
function St(s, t) {
  if (!tt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ct !== void 0 ? ct.createHTML(t) : t;
}
const Ft = (s, t) => {
  const e = s.length - 1, r = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = L;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let h, p, c = -1, v = 0;
    for (; v < l.length && (o.lastIndex = v, p = o.exec(l), p !== null); ) v = o.lastIndex, o === L ? p[1] === "!--" ? o = ht : p[1] !== void 0 ? o = ut : p[2] !== void 0 ? (Et.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = P) : p[3] !== void 0 && (o = P) : o === P ? p[0] === ">" ? (o = i ?? L, c = -1) : p[1] === void 0 ? c = -2 : (c = o.lastIndex - p[2].length, h = p[1], o = p[3] === void 0 ? P : p[3] === '"' ? pt : dt) : o === pt || o === dt ? o = P : o === ht || o === ut ? o = L : (o = P, i = void 0);
    const S = o === P && s[a + 1].startsWith("/>") ? " " : "";
    n += o === L ? l + Ut : c >= 0 ? (r.push(h), l.slice(0, c) + yt + l.slice(c) + C + S) : l + C + (c === -2 ? a : S);
  }
  return [St(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class H {
  constructor({ strings: t, _$litType$: e }, r) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, l = this.parts, [h, p] = Ft(t, e);
    if (this.el = H.createElement(h, r), x.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = x.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(yt)) {
          const v = p[o++], S = i.getAttribute(c).split(C), V = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: n, name: V[2], strings: S, ctor: V[1] === "." ? It : V[1] === "?" ? Vt : V[1] === "@" ? zt : G }), i.removeAttribute(c);
        } else c.startsWith(C) && (l.push({ type: 6, index: n }), i.removeAttribute(c));
        if (Et.test(i.tagName)) {
          const c = i.textContent.split(C), v = c.length - 1;
          if (v > 0) {
            i.textContent = q ? q.emptyScript : "";
            for (let S = 0; S < v; S++) i.append(c[S], j()), x.nextNode(), l.push({ type: 2, index: ++n });
            i.append(c[v], j());
          }
        }
      } else if (i.nodeType === 8) if (i.data === At) l.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(C, c + 1)) !== -1; ) l.push({ type: 7, index: n }), c += C.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const r = R.createElement("template");
    return r.innerHTML = t, r;
  }
}
function T(s, t, e = s, r) {
  var o, a;
  if (t === N) return t;
  let i = r !== void 0 ? (o = e._$Co) == null ? void 0 : o[r] : e._$Cl;
  const n = F(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), n === void 0 ? i = void 0 : (i = new n(s), i._$AT(s, e, r)), r !== void 0 ? (e._$Co ?? (e._$Co = []))[r] = i : e._$Cl = i), i !== void 0 && (t = T(s, i._$AS(s, t.values), i, r)), t;
}
class Ht {
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
    const { el: { content: e }, parts: r } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? R).importNode(e, !0);
    x.currentNode = i;
    let n = x.nextNode(), o = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let h;
        l.type === 2 ? h = new I(n, n.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (h = new Bt(n, this, t)), this._$AV.push(h), l = r[++a];
      }
      o !== (l == null ? void 0 : l.index) && (n = x.nextNode(), o++);
    }
    return x.currentNode = R, i;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class I {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, r, i) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = T(this, t, e), F(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== N && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Mt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && F(this._$AH) ? this._$AA.nextSibling.data = t : this.T(R.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = H.createElement(St(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new Ht(i, this), a = o.u(this.options);
      o.p(e), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, i = 0;
    for (const n of t) i === e.length ? e.push(r = new I(this.O(j()), this.O(j()), this, this.options)) : r = e[i], r._$AI(n), i++;
    i < e.length && (this._$AR(r && r._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = lt(t).nextSibling;
      lt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class G {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, i, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = f;
  }
  _$AI(t, e = this, r, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = T(this, t, e, 0), o = !F(t) || t !== this._$AH && t !== N, o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = n[0], l = 0; l < n.length - 1; l++) h = T(this, a[r + l], e, l), h === N && (h = this._$AH[l]), o || (o = !F(h) || h !== this._$AH[l]), h === f ? t = f : t !== f && (t += (h ?? "") + n[l + 1]), this._$AH[l] = h;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class It extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Vt extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class zt extends G {
  constructor(t, e, r, i, n) {
    super(t, e, r, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = T(this, t, e, 0) ?? f) === N) return;
    const r = this._$AH, i = t === f && r !== f || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== f && (r === f || i);
    i && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Bt {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    T(this, t);
  }
}
const J = M.litHtmlPolyfillSupport;
J == null || J(H, I), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.2");
const qt = (s, t, e) => {
  const r = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    r._$litPart$ = i = new I(t.insertBefore(j(), n), n, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis;
class O extends D {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qt(e, this.renderRoot, this.renderOptions);
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
    return N;
  }
}
var vt;
O._$litElement$ = !0, O.finalized = !0, (vt = k.litElementHydrateSupport) == null || vt.call(k, { LitElement: O });
const K = k.litElementPolyfillSupport;
K == null || K({ LitElement: O });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: Y }, Wt = (s = Gt, t, e) => {
  const { kind: r, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), r === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (r === "setter") {
    const { name: o } = e;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function u(s) {
  return (t, e) => typeof e == "object" ? Wt(s, t, e) : ((r, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $(s) {
  return u({ ...s, state: !0, attribute: !1 });
}
function rt(s, t) {
  if (!t || t.trim() === "")
    return s;
  const r = t.replace(/\[(\d+)\]/g, ".$1").split(".");
  let i = s;
  for (const n of r) {
    if (i == null || typeof i != "object")
      return;
    i = i[n];
  }
  return i;
}
function oe(s, t) {
  return rt(s, t) !== void 0;
}
function ae(s, t, e) {
  const r = rt(s, t);
  return r !== void 0 ? r : e;
}
const E = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading"
}, it = /* @__PURE__ */ new Map();
function Qt(s, t) {
  it.set(s, t);
}
function Ct(s) {
  return it.get(s);
}
function Jt(s) {
  it.delete(s);
}
function Kt(s, t) {
  Qt(s, t);
  const e = new CustomEvent(E.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, data: t }
  });
  document.dispatchEvent(e);
}
function Zt(s, t) {
  const e = new CustomEvent(E.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, error: t }
  });
  document.dispatchEvent(e);
}
function Xt(s) {
  const t = new CustomEvent(E.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s }
  });
  document.dispatchEvent(t);
}
function wt(s, t) {
  const e = (n) => {
    const o = n;
    o.detail.sourceId === s && t.onLoaded && t.onLoaded(o.detail.data);
  }, r = (n) => {
    const o = n;
    o.detail.sourceId === s && t.onError && t.onError(o.detail.error);
  }, i = (n) => {
    n.detail.sourceId === s && t.onLoading && t.onLoading();
  };
  return document.addEventListener(E.LOADED, e), document.addEventListener(E.ERROR, r), document.addEventListener(E.LOADING, i), () => {
    document.removeEventListener(E.LOADED, e), document.removeEventListener(E.ERROR, r), document.removeEventListener(E.LOADING, i);
  };
}
var A = function(s, t, e, r) {
  var i = arguments.length, n = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, t, e, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(t, e, n) : o(t, e)) || n);
  return i > 3 && n && Object.defineProperty(t, e, n), n;
};
let y = class extends O {
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
    super.disconnectedCallback(), this._cleanup(), this.id && Jt(this.id);
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
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, Xt(this.id);
      try {
        const t = this._buildUrl(), e = this._buildFetchOptions(), r = await fetch(t, {
          ...e,
          signal: this._abortController.signal
        });
        if (!r.ok)
          throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        const i = await r.json();
        this._data = this.transform ? rt(i, this.transform) : i, Kt(this.id, this._data);
      } catch (t) {
        if (t.name === "AbortError")
          return;
        this._error = t, Zt(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, t);
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
A([
  u({ type: String })
], y.prototype, "url", void 0);
A([
  u({ type: String })
], y.prototype, "method", void 0);
A([
  u({ type: String })
], y.prototype, "headers", void 0);
A([
  u({ type: String })
], y.prototype, "params", void 0);
A([
  u({ type: Number })
], y.prototype, "refresh", void 0);
A([
  u({ type: String })
], y.prototype, "transform", void 0);
A([
  $()
], y.prototype, "_loading", void 0);
A([
  $()
], y.prototype, "_error", void 0);
A([
  $()
], y.prototype, "_data", void 0);
y = A([
  et("gouv-source")
], y);
function _t(s, t = "nombre") {
  if (s == null || s === "")
    return "—";
  const e = typeof s == "string" ? parseFloat(s) : s;
  if (isNaN(e))
    return "—";
  switch (t) {
    case "nombre":
      return gt(e);
    case "pourcentage":
      return Yt(e);
    case "euro":
      return te(e);
    case "decimal":
      return ee(e);
    default:
      return gt(e);
  }
}
function gt(s) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(s));
}
function Yt(s) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(s / 100);
}
function te(s) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(s);
}
function ee(s) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(s);
}
function ce(s) {
  const t = typeof s == "string" ? new Date(s) : s;
  return isNaN(t.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(t);
}
function re(s, t, e) {
  return t !== void 0 && s >= t ? "vert" : e !== void 0 && s >= e ? "orange" : t !== void 0 || e !== void 0 ? "rouge" : "bleu";
}
function ie(s) {
  const t = s.split(":");
  if (t.length === 1)
    return { type: "direct", field: t[0] };
  const e = t[0], r = t[1];
  if (t.length === 3) {
    let i = t[2];
    return i === "true" ? i = !0 : i === "false" ? i = !1 : isNaN(Number(i)) || (i = Number(i)), { type: e, field: r, filterField: r, filterValue: i };
  }
  return { type: e, field: r };
}
function mt(s, t) {
  const e = ie(t);
  if (e.type === "direct" && !Array.isArray(s))
    return s[e.field];
  if (!Array.isArray(s))
    return null;
  const r = s;
  switch (e.type) {
    case "direct":
    case "first":
      return r.length > 0 ? r[0][e.field] : null;
    case "last":
      return r.length > 0 ? r[r.length - 1][e.field] : null;
    case "count":
      return e.filterValue !== void 0 ? r.filter((n) => n[e.field] === e.filterValue).length : r.length;
    case "sum":
      return r.reduce((n, o) => {
        const a = Number(o[e.field]);
        return n + (isNaN(a) ? 0 : a);
      }, 0);
    case "avg":
      return r.length === 0 ? null : r.reduce((n, o) => {
        const a = Number(o[e.field]);
        return n + (isNaN(a) ? 0 : a);
      }, 0) / r.length;
    case "min":
      return r.length === 0 ? null : Math.min(...r.map((n) => Number(n[e.field])).filter((n) => !isNaN(n)));
    case "max":
      return r.length === 0 ? null : Math.max(...r.map((n) => Number(n[e.field])).filter((n) => !isNaN(n)));
    default:
      return null;
  }
}
var b = function(s, t, e, r) {
  var i = arguments.length, n = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, t, e, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(t, e, n) : o(t, e)) || n);
  return i > 3 && n && Object.defineProperty(t, e, n), n;
};
let g = class extends O {
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
    const t = Ct(this.source);
    t !== void 0 && (this._data = t), this._unsubscribe = wt(this.source, {
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
    return !this._data || !this.valeur ? null : mt(this._data, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const t = this._computeValue();
    return typeof t != "number" ? "bleu" : re(t, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._data)
      return null;
    const t = mt(this._data, this.tendance);
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
    const t = this._computeValue(), e = _t(t, this.format);
    return `${this.label}: ${e}`;
  }
  render() {
    const t = this._computeValue(), e = _t(t, this.format), r = this._getColorClass(), i = this._getTendanceInfo();
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
              <span class="gouv-kpi__value">${e}</span>
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
          padding: 1.5rem;
          background: var(--background-default-grey);
          border-radius: 0.25rem;
          border-left: 4px solid var(--border-default-grey);
          min-height: 120px;
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
g.styles = $t`
    /* Styles injectés via Light DOM, utilise les classes DSFR */
  `;
b([
  u({ type: String })
], g.prototype, "source", void 0);
b([
  u({ type: String })
], g.prototype, "valeur", void 0);
b([
  u({ type: String })
], g.prototype, "label", void 0);
b([
  u({ type: String })
], g.prototype, "description", void 0);
b([
  u({ type: String })
], g.prototype, "icone", void 0);
b([
  u({ type: String })
], g.prototype, "format", void 0);
b([
  u({ type: String })
], g.prototype, "tendance", void 0);
b([
  u({ type: Number, attribute: "seuil-vert" })
], g.prototype, "seuilVert", void 0);
b([
  u({ type: Number, attribute: "seuil-orange" })
], g.prototype, "seuilOrange", void 0);
b([
  u({ type: String })
], g.prototype, "couleur", void 0);
b([
  $()
], g.prototype, "_loading", void 0);
b([
  $()
], g.prototype, "_data", void 0);
b([
  $()
], g.prototype, "_error", void 0);
g = b([
  et("gouv-kpi")
], g);
var m = function(s, t, e, r) {
  var i = arguments.length, n = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, t, e, r);
  else for (var a = s.length - 1; a >= 0; a--) (o = s[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(t, e, n) : o(t, e)) || n);
  return i > 3 && n && Object.defineProperty(t, e, n), n;
};
let _ = class extends O {
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
    const t = Ct(this.source);
    Array.isArray(t) && (this._data = t), this._unsubscribe = wt(this.source, {
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
      t.sort((i, n) => {
        const o = i[e], a = n[e];
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
    const t = this._parseColumns(), e = this._getFilteredData(), r = t.map((h) => h.label).join(";"), i = e.map((h) => t.map((p) => {
      const c = h[p.key], v = String(c ?? "");
      return v.includes(";") || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v;
    }).join(";")), n = [r, ...i].join(`
`), o = new Blob([n], { type: "text/csv;charset=utf-8;" }), a = URL.createObjectURL(o), l = document.createElement("a");
    l.href = a, l.download = "export.csv", l.click(), URL.revokeObjectURL(a);
  }
  _formatCellValue(t) {
    return t == null ? "—" : typeof t == "boolean" ? t ? "Oui" : "Non" : String(t);
  }
  render() {
    var o;
    const t = this._parseColumns(), e = this._getFilterableColumns(), r = this._getPaginatedData(), i = this._getTotalPages(), n = this._getFilteredData().length;
    return d`
      <div class="gouv-datalist" role="region" aria-label="Liste de données">
        <!-- Barre de recherche et filtres -->
        <div class="gouv-datalist__controls">
          ${this.recherche ? d`
            <div class="fr-search-bar" role="search">
              <label class="fr-label" for="search-${this.source}">Rechercher</label>
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
          ` : ""}

          ${e.map((a) => {
      const l = t.find((c) => c.key === a), h = (l == null ? void 0 : l.label) || a, p = this._getUniqueValues(a);
      return d`
              <div class="fr-select-group">
                <label class="fr-label" for="filter-${a}">${h}</label>
                <select
                  class="fr-select"
                  id="filter-${a}"
                  @change="${(c) => this._handleFilter(a, c)}"
                >
                  <option value="">Tous</option>
                  ${p.map((c) => d`
                    <option value="${c}" ?selected="${this._activeFilters[a] === c}">${c}</option>
                  `)}
                </select>
              </div>
            `;
    })}

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
            ${n} résultat${n > 1 ? "s" : ""}
            ${this._searchQuery || Object.values(this._activeFilters).some((a) => a) ? " (filtré)" : ""}
          </p>

          <!-- Tableau -->
          <div class="fr-table fr-table--bordered">
            <table>
              <caption class="fr-sr-only">Liste des données</caption>
              <thead>
                <tr>
                  ${t.map((a) => {
      var l;
      return d`
                    <th scope="col">
                      <button
                        class="gouv-datalist__sort-btn"
                        @click="${() => this._handleSort(a.key)}"
                        aria-label="Trier par ${a.label}"
                        type="button"
                      >
                        ${a.label}
                        ${((l = this._sort) == null ? void 0 : l.key) === a.key ? d`
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
                    <td colspan="${t.length}" class="gouv-datalist__empty">
                      Aucune donnée à afficher
                    </td>
                  </tr>
                ` : r.map((a) => d`
                  <tr>
                    ${t.map((l) => d`
                      <td>${this._formatCellValue(a[l.key])}</td>
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
        .gouv-datalist__controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: flex-end;
          margin-bottom: 1rem;
        }

        .gouv-datalist__controls .fr-search-bar {
          flex: 1;
          min-width: 200px;
        }

        .gouv-datalist__controls .fr-select-group {
          min-width: 150px;
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
    return e.map((i) => d`
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
_.styles = $t``;
m([
  u({ type: String })
], _.prototype, "source", void 0);
m([
  u({ type: String })
], _.prototype, "colonnes", void 0);
m([
  u({ type: Boolean })
], _.prototype, "recherche", void 0);
m([
  u({ type: String })
], _.prototype, "filtres", void 0);
m([
  u({ type: String })
], _.prototype, "tri", void 0);
m([
  u({ type: Number })
], _.prototype, "pagination", void 0);
m([
  u({ type: String })
], _.prototype, "export", void 0);
m([
  $()
], _.prototype, "_loading", void 0);
m([
  $()
], _.prototype, "_data", void 0);
m([
  $()
], _.prototype, "_error", void 0);
m([
  $()
], _.prototype, "_searchQuery", void 0);
m([
  $()
], _.prototype, "_activeFilters", void 0);
m([
  $()
], _.prototype, "_sort", void 0);
m([
  $()
], _.prototype, "_currentPage", void 0);
_ = m([
  et("gouv-datalist")
], _);
export {
  E as DATA_EVENTS,
  _ as GouvDatalist,
  g as GouvKpi,
  y as GouvSource,
  mt as computeAggregation,
  Zt as dispatchDataError,
  Kt as dispatchDataLoaded,
  Xt as dispatchDataLoading,
  te as formatCurrency,
  ce as formatDate,
  gt as formatNumber,
  Yt as formatPercentage,
  _t as formatValue,
  rt as getByPath,
  ae as getByPathOrDefault,
  Ct as getDataCache,
  oe as hasPath,
  ie as parseExpression,
  wt as subscribeToSource
};
