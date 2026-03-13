var oa = Object.defineProperty;
var l = (s, e) => oa(s, "name", { value: e, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pi = globalThis, Gr = Pi.ShadowRoot && (Pi.ShadyCSS === void 0 || Pi.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Vr = Symbol(), Sn = /* @__PURE__ */ new WeakMap(), sn = class sn {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Vr)
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this._strings = t;
  }
  // This is a getter so that it's lazy. In practice, this means stylesheets
  // are not created until the first element instance is made.
  get styleSheet() {
    let e = this._styleSheet;
    const t = this._strings;
    if (Gr && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Sn.get(t)), e === void 0 && ((this._styleSheet = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Sn.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
l(sn, "CSSResult");
let Ri = sn;
const la = /* @__PURE__ */ l((s) => {
  if (s._$cssResult$ === !0)
    return s.cssText;
  if (typeof s == "number")
    return s;
  throw new Error(`Value passed to 'css' function must be a 'css' function result: ${s}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`);
}, "textFromCSSResult"), ca = /* @__PURE__ */ l((s) => new Ri(typeof s == "string" ? s : String(s), void 0, Vr), "unsafeCSS"), Hr = /* @__PURE__ */ l((s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, r, n) => i + la(r) + s[n + 1], s[0]);
  return new Ri(t, s, Vr);
}, "css"), ua = /* @__PURE__ */ l((s, e) => {
  if (Gr)
    s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else
    for (const t of e) {
      const i = document.createElement("style"), r = Pi.litNonce;
      r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, s.appendChild(i);
    }
}, "adoptStyles"), da = /* @__PURE__ */ l((s) => {
  let e = "";
  for (const t of s.cssRules)
    e += t.cssText;
  return ca(e);
}, "cssResultFromStyleSheet"), wn = Gr ? (s) => s : (s) => s instanceof CSSStyleSheet ? da(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ha, defineProperty: pa, getOwnPropertyDescriptor: $n, getOwnPropertyNames: fa, getOwnPropertySymbols: ga, getPrototypeOf: An } = Object, ie = globalThis;
let Re;
const Cn = ie.trustedTypes, ma = Cn ? Cn.emptyScript : "", Ei = ie.reactiveElementPolyfillSupportDevMode;
ie.litIssuedWarnings ?? (ie.litIssuedWarnings = /* @__PURE__ */ new Set()), Re = /* @__PURE__ */ l((s, e) => {
  e += ` See https://lit.dev/msg/${s} for more information.`, !ie.litIssuedWarnings.has(e) && !ie.litIssuedWarnings.has(s) && (console.warn(e), ie.litIssuedWarnings.add(e));
}, "issueWarning$3"), queueMicrotask(() => {
  var s;
  Re("dev-mode", "Lit is in dev mode. Not recommended for production!"), (s = ie.ShadyDOM) != null && s.inUse && Ei === void 0 && Re("polyfill-support-missing", "Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded.");
});
const Ji = /* @__PURE__ */ l((s) => {
  ie.emitLitDebugLogEvents && ie.dispatchEvent(new CustomEvent("lit-debug", {
    detail: s
  }));
}, "debugLogEvent$1"), dt = /* @__PURE__ */ l((s, e) => s, "JSCompiler_renameProperty$1"), ki = {
  toAttribute(s, e) {
    switch (e) {
      case Boolean:
        s = s ? ma : null;
        break;
      case Object:
      case Array:
        s = s == null ? s : JSON.stringify(s);
        break;
    }
    return s;
  },
  fromAttribute(s, e) {
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
        break;
    }
    return t;
  }
}, Wr = /* @__PURE__ */ l((s, e) => !ha(s, e), "notEqual"), Pn = {
  attribute: !0,
  type: String,
  converter: ki,
  reflect: !1,
  useDefault: !1,
  hasChanged: Wr
};
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata"));
ie.litPropertyMetadata ?? (ie.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
const an = class an extends HTMLElement {
  /**
   * Adds an initializer function to the class that is called during instance
   * construction.
   *
   * This is useful for code that runs against a `ReactiveElement`
   * subclass, such as a decorator, that needs to do work for each
   * instance, such as setting up a `ReactiveController`.
   *
   * ```ts
   * const myDecorator = (target: typeof ReactiveElement, key: string) => {
   *   target.addInitializer((instance: ReactiveElement) => {
   *     // This is run during construction of the element
   *     new MyController(instance);
   *   });
   * }
   * ```
   *
   * Decorating a field will then cause each instance to run an initializer
   * that adds a controller:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   @myDecorator foo;
   * }
   * ```
   *
   * Initializers are stored per-constructor. Adding an initializer to a
   * subclass does not add it to a superclass. Since initializers are run in
   * constructors, initializers will run in order of the class hierarchy,
   * starting with superclasses and progressing to the instance's class.
   *
   * @nocollapse
   */
  static addInitializer(e) {
    this.__prepare(), (this._initializers ?? (this._initializers = [])).push(e);
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   * @category attributes
   */
  static get observedAttributes() {
    return this.finalize(), this.__attributeToPropertyMap && [...this.__attributeToPropertyMap.keys()];
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist
   * and stores a {@linkcode PropertyDeclaration} for the property with the
   * given options. The property setter calls the property's `hasChanged`
   * property option or uses a strict identity check to determine whether or not
   * to request an update.
   *
   * This method may be overridden to customize properties; however,
   * when doing so, it's important to call `super.createProperty` to ensure
   * the property is setup correctly. This method calls
   * `getPropertyDescriptor` internally to get a descriptor to install.
   * To customize what properties do when they are get or set, override
   * `getPropertyDescriptor`. To customize the options for a property,
   * implement `createProperty` like this:
   *
   * ```ts
   * static createProperty(name, options) {
   *   options = Object.assign(options, {myOption: true});
   *   super.createProperty(name, options);
   * }
   * ```
   *
   * @nocollapse
   * @category properties
   */
  static createProperty(e, t = Pn) {
    if (t.state && (t.attribute = !1), this.__prepare(), this.prototype.hasOwnProperty(e) && (t = Object.create(t), t.wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = (
        // Use Symbol.for in dev mode to make it easier to maintain state
        // when doing HMR.
        Symbol.for(`${String(e)} (@property() cache)`)
      ), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && pa(this.prototype, e, r);
    }
  }
  /**
   * Returns a property descriptor to be defined on the given named property.
   * If no descriptor is returned, the property will not become an accessor.
   * For example,
   *
   * ```ts
   * class MyElement extends LitElement {
   *   static getPropertyDescriptor(name, key, options) {
   *     const defaultDescriptor =
   *         super.getPropertyDescriptor(name, key, options);
   *     const setter = defaultDescriptor.set;
   *     return {
   *       get: defaultDescriptor.get,
   *       set(value) {
   *         setter.call(this, value);
   *         // custom action.
   *       },
   *       configurable: true,
   *       enumerable: true
   *     }
   *   }
   * }
   * ```
   *
   * @nocollapse
   * @category properties
   */
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: n } = $n(this.prototype, e) ?? {
      get() {
        return this[t];
      },
      set(a) {
        this[t] = a;
      }
    };
    if (r == null) {
      if ("value" in ($n(this.prototype, e) ?? {}))
        throw new Error(`Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it's actually declared as a value on the prototype. Usually this is due to using @property or @state on a method.`);
      Re("reactive-property-without-getter", `Field ${JSON.stringify(String(e))} on ${this.name} was declared as a reactive property but it does not have a getter. This will be an error in a future version of Lit.`);
    }
    return {
      get: r,
      set(a) {
        const o = r == null ? void 0 : r.call(this);
        n == null || n.call(this, a), this.requestUpdate(e, o, i);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  /**
   * Returns the property options associated with the given property.
   * These options are defined with a `PropertyDeclaration` via the `properties`
   * object or the `@property` decorator and are registered in
   * `createProperty(...)`.
   *
   * Note, this method should be considered "final" and not overridden. To
   * customize the options for a given property, override
   * {@linkcode createProperty}.
   *
   * @nocollapse
   * @final
   * @category properties
   */
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Pn;
  }
  /**
   * Initializes static own properties of the class used in bookkeeping
   * for element properties, initializers, etc.
   *
   * Can be called multiple times by code that needs to ensure these
   * properties exist before using them.
   *
   * This method ensures the superclass is finalized so that inherited
   * property metadata can be copied down.
   * @nocollapse
   */
  static __prepare() {
    if (this.hasOwnProperty(dt("elementProperties")))
      return;
    const e = An(this);
    e.finalize(), e._initializers !== void 0 && (this._initializers = [...e._initializers]), this.elementProperties = new Map(e.elementProperties);
  }
  /**
   * Finishes setting up the class so that it's ready to be registered
   * as a custom element and instantiated.
   *
   * This method is called by the ReactiveElement.observedAttributes getter.
   * If you override the observedAttributes getter, you must either call
   * super.observedAttributes to trigger finalization, or call finalize()
   * yourself.
   *
   * @nocollapse
   */
  static finalize() {
    if (this.hasOwnProperty(dt("finalized")))
      return;
    if (this.finalized = !0, this.__prepare(), this.hasOwnProperty(dt("properties"))) {
      const t = this.properties, i = [
        ...fa(t),
        ...ga(t)
      ];
      for (const r of i)
        this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0)
        for (const [i, r] of t)
          this.elementProperties.set(i, r);
    }
    this.__attributeToPropertyMap = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const r = this.__attributeNameForProperty(t, i);
      r !== void 0 && this.__attributeToPropertyMap.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles), this.hasOwnProperty("createProperty") && Re("no-override-create-property", "Overriding ReactiveElement.createProperty() is deprecated. The override will not be called with standard decorators"), this.hasOwnProperty("getPropertyDescriptor") && Re("no-override-get-property-descriptor", "Overriding ReactiveElement.getPropertyDescriptor() is deprecated. The override will not be called with standard decorators");
  }
  /**
   * Takes the styles the user supplied via the `static styles` property and
   * returns the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * Styles are deduplicated preserving the _last_ instance in the list. This
   * is a performance optimization to avoid duplicated styles that can occur
   * especially when composing via subclassing. The last item is kept to try
   * to preserve the cascade order with the assumption that it's most important
   * that last added styles override previous styles.
   *
   * @nocollapse
   * @category styles
   */
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i)
        t.unshift(wn(r));
    } else e !== void 0 && t.push(wn(e));
    return t;
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */
  static __attributeNameForProperty(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this.__instanceProperties = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this.__reflectingProperty = null, this.__initialize();
  }
  /**
   * Internal only override point for customizing work done when elements
   * are constructed.
   */
  __initialize() {
    var e;
    this.__updatePromise = new Promise((t) => this.enableUpdating = t), this._$changedProperties = /* @__PURE__ */ new Map(), this.__saveInstanceProperties(), this.requestUpdate(), (e = this.constructor._initializers) == null || e.forEach((t) => t(this));
  }
  /**
   * Registers a `ReactiveController` to participate in the element's reactive
   * update cycle. The element automatically calls into any registered
   * controllers during its lifecycle callbacks.
   *
   * If the element is connected when `addController()` is called, the
   * controller's `hostConnected()` callback will be immediately called.
   * @category controllers
   */
  addController(e) {
    var t;
    (this.__controllers ?? (this.__controllers = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  /**
   * Removes a `ReactiveController` from the element.
   * @category controllers
   */
  removeController(e) {
    var t;
    (t = this.__controllers) == null || t.delete(e);
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs.
   */
  __saveInstanceProperties() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys())
      this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this.__instanceProperties = e);
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   *
   * @return Returns a node into which to render.
   * @category rendering
   */
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ua(e, this.constructor.elementStyles), e;
  }
  /**
   * On first connection, creates the element's renderRoot, sets up
   * element styling, and enables updating.
   * @category lifecycle
   */
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this.__controllers) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  /**
   * Note, this method should be considered final and not overridden. It is
   * overridden on the element instance with a function that triggers the first
   * update.
   * @category updates
   */
  enableUpdating(e) {
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   * @category lifecycle
   */
  disconnectedCallback() {
    var e;
    (e = this.__controllers) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  /**
   * Synchronizes property values when attributes change.
   *
   * Specifically, when an attribute is set, the corresponding property is set.
   * You should rarely need to implement this callback. If this method is
   * overridden, `super.attributeChangedCallback(name, _old, value)` must be
   * called.
   *
   * See [responding to attribute changes](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes)
   * on MDN for more information about the `attributeChangedCallback`.
   * @category attributes
   */
  attributeChangedCallback(e, t, i) {
    this._$attributeToProperty(e, i);
  }
  __propertyToAttribute(e, t) {
    var a;
    const r = this.constructor.elementProperties.get(e), n = this.constructor.__attributeNameForProperty(e, r);
    if (n !== void 0 && r.reflect === !0) {
      const h = (((a = r.converter) == null ? void 0 : a.toAttribute) !== void 0 ? r.converter : ki).toAttribute(t, r.type);
      this.constructor.enabledWarnings.includes("migration") && h === void 0 && Re("undefined-attribute-value", `The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`), this.__reflectingProperty = e, h == null ? this.removeAttribute(n) : this.setAttribute(n, h), this.__reflectingProperty = null;
    }
  }
  /** @internal */
  _$attributeToProperty(e, t) {
    var n, a;
    const i = this.constructor, r = i.__attributeToPropertyMap.get(e);
    if (r !== void 0 && this.__reflectingProperty !== r) {
      const o = i.getPropertyOptions(r), h = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((n = o.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? o.converter : ki;
      this.__reflectingProperty = r;
      const u = h.fromAttribute(t, o.type);
      this[r] = u ?? ((a = this.__defaultValues) == null ? void 0 : a.get(r)) ?? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      u, this.__reflectingProperty = null;
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should be called
   * when an element should update based on some state not triggered by setting
   * a reactive property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored.
   *
   * @param name name of requesting property
   * @param oldValue old value of requesting property
   * @param options property options to use instead of the previously
   *     configured options
   * @param useNewValue if true, the newValue argument is used instead of
   *     reading the property value. This is important to use if the reactive
   *     property is a standard private accessor, as opposed to a plain
   *     property, since private members can't be dynamically read by name.
   * @param newValue the new value of the property. This is only used if
   *     `useNewValue` is true.
   * @category updates
   */
  requestUpdate(e, t, i, r = !1, n) {
    var a;
    if (e !== void 0) {
      e instanceof Event && Re("", "The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()");
      const o = this.constructor;
      if (r === !1 && (n = this[e]), i ?? (i = o.getPropertyOptions(e)), (i.hasChanged ?? Wr)(n, t) || // When there is no change, check a corner case that can occur when
      // 1. there's a initial value which was not reflected
      // 2. the property is subsequently set to this value.
      // For example, `prop: {useDefault: true, reflect: true}`
      // and el.prop = 'foo'. This should be considered a change if the
      // attribute is not set because we will now reflect the property to the attribute.
      i.useDefault && i.reflect && n === ((a = this.__defaultValues) == null ? void 0 : a.get(e)) && !this.hasAttribute(o.__attributeNameForProperty(e, i)))
        this._$changeProperty(e, t, i);
      else
        return;
    }
    this.isUpdatePending === !1 && (this.__updatePromise = this.__enqueueUpdate());
  }
  /**
   * @internal
   */
  _$changeProperty(e, t, { useDefault: i, reflect: r, wrapped: n }, a) {
    i && !(this.__defaultValues ?? (this.__defaultValues = /* @__PURE__ */ new Map())).has(e) && (this.__defaultValues.set(e, a ?? t ?? this[e]), n !== !0 || a !== void 0) || (this._$changedProperties.has(e) || (!this.hasUpdated && !i && (t = void 0), this._$changedProperties.set(e, t)), r === !0 && this.__reflectingProperty !== e && (this.__reflectingProperties ?? (this.__reflectingProperties = /* @__PURE__ */ new Set())).add(e));
  }
  /**
   * Sets up the element to asynchronously update.
   */
  async __enqueueUpdate() {
    this.isUpdatePending = !0;
    try {
      await this.__updatePromise;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  /**
   * Schedules an element update. You can override this method to change the
   * timing of updates by returning a Promise. The update will await the
   * returned Promise, and you should resolve the Promise to allow the update
   * to proceed. If this method is overridden, `super.scheduleUpdate()`
   * must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```ts
   * override protected async scheduleUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.scheduleUpdate();
   * }
   * ```
   * @category updates
   */
  scheduleUpdate() {
    const e = this.performUpdate();
    return this.constructor.enabledWarnings.includes("async-perform-update") && typeof (e == null ? void 0 : e.then) == "function" && Re("async-perform-update", `Element ${this.localName} returned a Promise from performUpdate(). This behavior is deprecated and will be removed in a future version of ReactiveElement.`), e;
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * Call `performUpdate()` to immediately process a pending update. This should
   * generally not be needed, but it can be done in rare cases when you need to
   * update synchronously.
   *
   * @category updates
   */
  performUpdate() {
    var i;
    if (!this.isUpdatePending)
      return;
    if (Ji == null || Ji({ kind: "update" }), !this.hasUpdated) {
      this.renderRoot ?? (this.renderRoot = this.createRenderRoot());
      {
        const a = [...this.constructor.elementProperties.keys()].filter((o) => this.hasOwnProperty(o) && o in An(this));
        if (a.length)
          throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${a.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`);
      }
      if (this.__instanceProperties) {
        for (const [n, a] of this.__instanceProperties)
          this[n] = a;
        this.__instanceProperties = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0)
        for (const [n, a] of r) {
          const { wrapped: o } = a, h = this[n];
          o === !0 && !this._$changedProperties.has(n) && h !== void 0 && this._$changeProperty(n, void 0, a, h);
        }
    }
    let e = !1;
    const t = this._$changedProperties;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this.__controllers) == null || i.forEach((r) => {
        var n;
        return (n = r.hostUpdate) == null ? void 0 : n.call(r);
      }), this.update(t)) : this.__markUpdated();
    } catch (r) {
      throw e = !1, this.__markUpdated(), r;
    }
    e && this._$didUpdate(t);
  }
  /**
   * Invoked before `update()` to compute values needed during the update.
   *
   * Implement `willUpdate` to compute property values that depend on other
   * properties and are used in the rest of the update process.
   *
   * ```ts
   * willUpdate(changedProperties) {
   *   // only need to check changed properties for an expensive computation.
   *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
   *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
   *   }
   * }
   *
   * render() {
   *   return html`SHA: ${this.sha}`;
   * }
   * ```
   *
   * @category updates
   */
  willUpdate(e) {
  }
  // Note, this is an override point for polyfill-support.
  // @internal
  _$didUpdate(e) {
    var t;
    (t = this.__controllers) == null || t.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e), this.isUpdatePending && this.constructor.enabledWarnings.includes("change-in-update") && Re("change-in-update", `Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`);
  }
  __markUpdated() {
    this._$changedProperties = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * To await additional asynchronous work, override the `getUpdateComplete`
   * method. For example, it is sometimes useful to await a rendered element
   * before fulfilling this Promise. To do this, first await
   * `super.getUpdateComplete()`, then any subsequent state.
   *
   * @return A promise of a boolean that resolves to true if the update completed
   *     without triggering another update.
   * @category updates
   */
  get updateComplete() {
    return this.getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   override async getUpdateComplete() {
   *     const result = await super.getUpdateComplete();
   *     await this._myChild.updateComplete;
   *     return result;
   *   }
   * }
   * ```
   *
   * @return A promise of a boolean that resolves to true if the update completed
   *     without triggering another update.
   * @category updates
   */
  getUpdateComplete() {
    return this.__updatePromise;
  }
  /**
   * Controls whether or not `update()` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  shouldUpdate(e) {
    return !0;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  update(e) {
    this.__reflectingProperties && (this.__reflectingProperties = this.__reflectingProperties.forEach((t) => this.__propertyToAttribute(t, this[t]))), this.__markUpdated();
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  updated(e) {
  }
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * ```ts
   * firstUpdated() {
   *   this.renderRoot.getElementById('my-text-area').focus();
   * }
   * ```
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  firstUpdated(e) {
  }
};
l(an, "ReactiveElement");
let ke = an;
ke.elementStyles = [];
ke.shadowRootOptions = { mode: "open" };
ke[dt("elementProperties")] = /* @__PURE__ */ new Map();
ke[dt("finalized")] = /* @__PURE__ */ new Map();
Ei == null || Ei({ ReactiveElement: ke });
{
  ke.enabledWarnings = [
    "change-in-update",
    "async-perform-update"
  ];
  const s = /* @__PURE__ */ l(function(e) {
    e.hasOwnProperty(dt("enabledWarnings")) || (e.enabledWarnings = e.enabledWarnings.slice());
  }, "ensureOwnWarnings");
  ke.enableWarning = function(e) {
    s(this), this.enabledWarnings.includes(e) || this.enabledWarnings.push(e);
  }, ke.disableWarning = function(e) {
    s(this);
    const t = this.enabledWarnings.indexOf(e);
    t >= 0 && this.enabledWarnings.splice(t, 1);
  };
}
(ie.reactiveElementVersions ?? (ie.reactiveElementVersions = [])).push("2.1.2");
ie.reactiveElementVersions.length > 1 && queueMicrotask(() => {
  Re("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = globalThis, M = /* @__PURE__ */ l((s) => {
  ne.emitLitDebugLogEvents && ne.dispatchEvent(new CustomEvent("lit-debug", {
    detail: s
  }));
}, "debugLogEvent");
let _a = 0, Qt;
ne.litIssuedWarnings ?? (ne.litIssuedWarnings = /* @__PURE__ */ new Set()), Qt = /* @__PURE__ */ l((s, e) => {
  e += s ? ` See https://lit.dev/msg/${s} for more information.` : "", !ne.litIssuedWarnings.has(e) && !ne.litIssuedWarnings.has(s) && (console.warn(e), ne.litIssuedWarnings.add(e));
}, "issueWarning$2"), queueMicrotask(() => {
  Qt("dev-mode", "Lit is in dev mode. Not recommended for production!");
});
var Ss, ws;
const Te = (Ss = ne.ShadyDOM) != null && Ss.inUse && ((ws = ne.ShadyDOM) == null ? void 0 : ws.noPatch) === !0 ? ne.ShadyDOM.wrap : (s) => s, Mi = ne.trustedTypes, En = Mi ? Mi.createPolicy("lit-html", {
  createHTML: /* @__PURE__ */ l((s) => s, "createHTML")
}) : void 0, ba = /* @__PURE__ */ l((s) => s, "identityFunction"), Hi = /* @__PURE__ */ l((s, e, t) => ba, "noopSanitizer"), va = /* @__PURE__ */ l((s) => {
  if (et !== Hi)
    throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");
  et = s;
}, "setSanitizer"), ya = /* @__PURE__ */ l(() => {
  et = Hi;
}, "_testOnlyClearSanitizerFactoryDoNotCallOrElse"), fr = /* @__PURE__ */ l((s, e, t) => et(s, e, t), "createSanitizer"), Cs = "$lit$", Be = `lit$${Math.random().toFixed(9).slice(2)}$`, Ps = "?" + Be, Sa = `<${Ps}>`, Xe = document, Yt = /* @__PURE__ */ l(() => Xe.createComment(""), "createMarker"), Zt = /* @__PURE__ */ l((s) => s === null || typeof s != "object" && typeof s != "function", "isPrimitive"), Kr = Array.isArray, wa = /* @__PURE__ */ l((s) => Kr(s) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", "isIterable"), Qi = `[ 	
\f\r]`, $a = `[^ 	
\f\r"'\`<>=]`, Aa = `[^\\s"'>=/]`, zt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xn = 1, Yi = 2, Ca = 3, Tn = /-->/g, Rn = />/g, Je = new RegExp(`>|${Qi}(?:(${Aa}+)(${Qi}*=${Qi}*(?:${$a}|("|')|))|$)`, "g"), Pa = 0, kn = 1, Ea = 2, Mn = 3, Zi = /'/g, Xi = /"/g, Es = /^(?:script|style|textarea|title)$/i, xa = 1, Ni = 2, gr = 3, Jr = 1, Fi = 2, Ta = 3, Ra = 4, ka = 5, Qr = 6, Ma = 7, xs = /* @__PURE__ */ l((s) => (e, ...t) => (e.some((i) => i === void 0) && console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`), t.some((i) => i == null ? void 0 : i._$litStatic$) && Qt("", `Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.
Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`), {
  // This property needs to remain unminified.
  _$litType$: s,
  strings: e,
  values: t
}), "tag"), _ = xs(xa), Nn = xs(Ni), kt = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), Fn = /* @__PURE__ */ new WeakMap(), Qe = Xe.createTreeWalker(
  Xe,
  129
  /* NodeFilter.SHOW_{ELEMENT|COMMENT} */
);
let et = Hi;
function Ts(s, e) {
  if (!Kr(s) || !s.hasOwnProperty("raw")) {
    let t = "invalid template strings array";
    throw t = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g, `
`), new Error(t);
  }
  return En !== void 0 ? En.createHTML(e) : e;
}
l(Ts, "trustFromTemplateString");
const Na = /* @__PURE__ */ l((s, e) => {
  const t = s.length - 1, i = [];
  let r = e === Ni ? "<svg>" : e === gr ? "<math>" : "", n, a = zt;
  for (let h = 0; h < t; h++) {
    const u = s[h];
    let c = -1, d, p = 0, f;
    for (; p < u.length && (a.lastIndex = p, f = a.exec(u), f !== null); )
      if (p = a.lastIndex, a === zt) {
        if (f[xn] === "!--")
          a = Tn;
        else if (f[xn] !== void 0)
          a = Rn;
        else if (f[Yi] !== void 0)
          Es.test(f[Yi]) && (n = new RegExp(`</${f[Yi]}`, "g")), a = Je;
        else if (f[Ca] !== void 0)
          throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions");
      } else a === Je ? f[Pa] === ">" ? (a = n ?? zt, c = -1) : f[kn] === void 0 ? c = -2 : (c = a.lastIndex - f[Ea].length, d = f[kn], a = f[Mn] === void 0 ? Je : f[Mn] === '"' ? Xi : Zi) : a === Xi || a === Zi ? a = Je : a === Tn || a === Rn ? a = zt : (a = Je, n = void 0);
    console.assert(c === -1 || a === Je || a === Zi || a === Xi, "unexpected parse state B");
    const m = a === Je && s[h + 1].startsWith("/>") ? " " : "";
    r += a === zt ? u + Sa : c >= 0 ? (i.push(d), u.slice(0, c) + Cs + u.slice(c) + Be + m) : u + Be + (c === -2 ? h : m);
  }
  const o = r + (s[t] || "<?>") + (e === Ni ? "</svg>" : e === gr ? "</math>" : "");
  return [Ts(s, o), i];
}, "getTemplateHtml"), Gi = class Gi {
  constructor({ strings: e, ["_$litType$"]: t }, i) {
    this.parts = [];
    let r, n = 0, a = 0;
    const o = e.length - 1, h = this.parts, [u, c] = Na(e, t);
    if (this.el = Gi.createElement(u, i), Qe.currentNode = this.el.content, t === Ni || t === gr) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = Qe.nextNode()) !== null && h.length < o; ) {
      if (r.nodeType === 1) {
        {
          const d = r.localName;
          if (/^(?:textarea|template)$/i.test(d) && r.innerHTML.includes(Be)) {
            const p = `Expressions are not supported inside \`${d}\` elements. See https://lit.dev/msg/expression-in-${d} for more information.`;
            if (d === "template")
              throw new Error(p);
            Qt("", p);
          }
        }
        if (r.hasAttributes())
          for (const d of r.getAttributeNames())
            if (d.endsWith(Cs)) {
              const p = c[a++], m = r.getAttribute(d).split(Be), y = /([.?@])?(.*)/.exec(p);
              h.push({
                type: Jr,
                index: n,
                name: y[2],
                strings: m,
                ctor: y[1] === "." ? _r : y[1] === "?" ? br : y[1] === "@" ? vr : Nt
              }), r.removeAttribute(d);
            } else d.startsWith(Be) && (h.push({
              type: Qr,
              index: n
            }), r.removeAttribute(d));
        if (Es.test(r.tagName)) {
          const d = r.textContent.split(Be), p = d.length - 1;
          if (p > 0) {
            r.textContent = Mi ? Mi.emptyScript : "";
            for (let f = 0; f < p; f++)
              r.append(d[f], Yt()), Qe.nextNode(), h.push({ type: Fi, index: ++n });
            r.append(d[p], Yt());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === Ps)
          h.push({ type: Fi, index: n });
        else {
          let p = -1;
          for (; (p = r.data.indexOf(Be, p + 1)) !== -1; )
            h.push({ type: Ma, index: n }), p += Be.length - 1;
        }
      n++;
    }
    if (c.length !== a)
      throw new Error('Detected duplicate attribute bindings. This occurs if your template has duplicate attributes on an element tag. For example "<input ?disabled=${true} ?disabled=${false}>" contains a duplicate "disabled" attribute. The error was detected in the following template: \n`' + e.join("${...}") + "`");
    M && M({
      kind: "template prep",
      template: this,
      clonableTemplate: this.el,
      parts: this.parts,
      strings: e
    });
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @nocollapse */
  static createElement(e, t) {
    const i = Xe.createElement("template");
    return i.innerHTML = e, i;
  }
};
l(Gi, "Template");
let Xt = Gi;
function Mt(s, e, t = s, i) {
  var a, o;
  if (e === kt)
    return e;
  let r = i !== void 0 ? (a = t.__directives) == null ? void 0 : a[i] : t.__directive;
  const n = Zt(e) ? void 0 : (
    // This property needs to remain unminified.
    e._$litDirective$
  );
  return (r == null ? void 0 : r.constructor) !== n && ((o = r == null ? void 0 : r._$notifyDirectiveConnectionChanged) == null || o.call(r, !1), n === void 0 ? r = void 0 : (r = new n(s), r._$initialize(s, t, i)), i !== void 0 ? (t.__directives ?? (t.__directives = []))[i] = r : t.__directive = r), r !== void 0 && (e = Mt(s, r._$resolve(s, e.values), r, i)), e;
}
l(Mt, "resolveDirective");
const on = class on {
  constructor(e, t) {
    this._$parts = [], this._$disconnectableChildren = void 0, this._$template = e, this._$parent = t;
  }
  // Called by ChildPart parentNode getter
  get parentNode() {
    return this._$parent.parentNode;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  // This method is separate from the constructor because we need to return a
  // DocumentFragment and we don't want to hold onto it with an instance field.
  _clone(e) {
    const { el: { content: t }, parts: i } = this._$template, r = ((e == null ? void 0 : e.creationScope) ?? Xe).importNode(t, !0);
    Qe.currentNode = r;
    let n = Qe.nextNode(), a = 0, o = 0, h = i[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let u;
        h.type === Fi ? u = new ei(n, n.nextSibling, this, e) : h.type === Jr ? u = new h.ctor(n, h.name, h.strings, this, e) : h.type === Qr && (u = new yr(n, this, e)), this._$parts.push(u), h = i[++o];
      }
      a !== (h == null ? void 0 : h.index) && (n = Qe.nextNode(), a++);
    }
    return Qe.currentNode = Xe, r;
  }
  _update(e) {
    let t = 0;
    for (const i of this._$parts)
      i !== void 0 && (M && M({
        kind: "set part",
        part: i,
        value: e[t],
        valueIndex: t,
        values: e,
        templateInstance: this
      }), i.strings !== void 0 ? (i._$setValue(e, i, t), t += i.strings.length - 2) : i._$setValue(e[t])), t++;
  }
};
l(on, "TemplateInstance");
let mr = on;
const Vi = class Vi {
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    var e;
    return ((e = this._$parent) == null ? void 0 : e._$isConnected) ?? this.__isConnected;
  }
  constructor(e, t, i, r) {
    this.type = Fi, this._$committedValue = S, this._$disconnectableChildren = void 0, this._$startNode = e, this._$endNode = t, this._$parent = i, this.options = r, this.__isConnected = (r == null ? void 0 : r.isConnected) ?? !0, this._textSanitizer = void 0;
  }
  /**
   * The parent node into which the part renders its content.
   *
   * A ChildPart's content consists of a range of adjacent child nodes of
   * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
   * `.endNode`).
   *
   * - If both `.startNode` and `.endNode` are non-null, then the part's content
   * consists of all siblings between `.startNode` and `.endNode`, exclusively.
   *
   * - If `.startNode` is non-null but `.endNode` is null, then the part's
   * content consists of all siblings following `.startNode`, up to and
   * including the last child of `.parentNode`. If `.endNode` is non-null, then
   * `.startNode` will always be non-null.
   *
   * - If both `.endNode` and `.startNode` are null, then the part's content
   * consists of all child nodes of `.parentNode`.
   */
  get parentNode() {
    let e = Te(this._$startNode).parentNode;
    const t = this._$parent;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  /**
   * The part's leading marker node, if any. See `.parentNode` for more
   * information.
   */
  get startNode() {
    return this._$startNode;
  }
  /**
   * The part's trailing marker node, if any. See `.parentNode` for more
   * information.
   */
  get endNode() {
    return this._$endNode;
  }
  _$setValue(e, t = this) {
    var i;
    if (this.parentNode === null)
      throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");
    if (e = Mt(this, e, t), Zt(e))
      e === S || e == null || e === "" ? (this._$committedValue !== S && (M && M({
        kind: "commit nothing to child",
        start: this._$startNode,
        end: this._$endNode,
        parent: this._$parent,
        options: this.options
      }), this._$clear()), this._$committedValue = S) : e !== this._$committedValue && e !== kt && this._commitText(e);
    else if (e._$litType$ !== void 0)
      this._commitTemplateResult(e);
    else if (e.nodeType !== void 0) {
      if (((i = this.options) == null ? void 0 : i.host) === e) {
        this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"), console.warn("Attempted to render the template host", e, "inside itself. This is almost always a mistake, and in dev mode ", "we render some warning text. In production however, we'll ", "render it, which will usually result in an error, and sometimes ", "in the element disappearing from the DOM.");
        return;
      }
      this._commitNode(e);
    } else wa(e) ? this._commitIterable(e) : this._commitText(e);
  }
  _insert(e) {
    return Te(Te(this._$startNode).parentNode).insertBefore(e, this._$endNode);
  }
  _commitNode(e) {
    var t;
    if (this._$committedValue !== e) {
      if (this._$clear(), et !== Hi) {
        const i = (t = this._$startNode.parentNode) == null ? void 0 : t.nodeName;
        if (i === "STYLE" || i === "SCRIPT") {
          let r = "Forbidden";
          throw i === "STYLE" ? r = "Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets." : r = "Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.", new Error(r);
        }
      }
      M && M({
        kind: "commit node",
        start: this._$startNode,
        parent: this._$parent,
        value: e,
        options: this.options
      }), this._$committedValue = this._insert(e);
    }
  }
  _commitText(e) {
    if (this._$committedValue !== S && Zt(this._$committedValue)) {
      const t = Te(this._$startNode).nextSibling;
      this._textSanitizer === void 0 && (this._textSanitizer = fr(t, "data", "property")), e = this._textSanitizer(e), M && M({
        kind: "commit text",
        node: t,
        value: e,
        options: this.options
      }), t.data = e;
    } else {
      const t = Xe.createTextNode("");
      this._commitNode(t), this._textSanitizer === void 0 && (this._textSanitizer = fr(t, "data", "property")), e = this._textSanitizer(e), M && M({
        kind: "commit text",
        node: t,
        value: e,
        options: this.options
      }), t.data = e;
    }
    this._$committedValue = e;
  }
  _commitTemplateResult(e) {
    var n;
    const { values: t, ["_$litType$"]: i } = e, r = typeof i == "number" ? this._$getTemplate(e) : (i.el === void 0 && (i.el = Xt.createElement(Ts(i.h, i.h[0]), this.options)), i);
    if (((n = this._$committedValue) == null ? void 0 : n._$template) === r)
      M && M({
        kind: "template updating",
        template: r,
        instance: this._$committedValue,
        parts: this._$committedValue._$parts,
        options: this.options,
        values: t
      }), this._$committedValue._update(t);
    else {
      const a = new mr(r, this), o = a._clone(this.options);
      M && M({
        kind: "template instantiated",
        template: r,
        instance: a,
        parts: a._$parts,
        options: this.options,
        fragment: o,
        values: t
      }), a._update(t), M && M({
        kind: "template instantiated and updated",
        template: r,
        instance: a,
        parts: a._$parts,
        options: this.options,
        fragment: o,
        values: t
      }), this._commitNode(o), this._$committedValue = a;
    }
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @internal */
  _$getTemplate(e) {
    let t = Fn.get(e.strings);
    return t === void 0 && Fn.set(e.strings, t = new Xt(e)), t;
  }
  _commitIterable(e) {
    Kr(this._$committedValue) || (this._$committedValue = [], this._$clear());
    const t = this._$committedValue;
    let i = 0, r;
    for (const n of e)
      i === t.length ? t.push(r = new Vi(this._insert(Yt()), this._insert(Yt()), this, this.options)) : r = t[i], r._$setValue(n), i++;
    i < t.length && (this._$clear(r && Te(r._$endNode).nextSibling, i), t.length = i);
  }
  /**
   * Removes the nodes contained within this Part from the DOM.
   *
   * @param start Start node to clear from, for clearing a subset of the part's
   *     DOM (used when truncating iterables)
   * @param from  When `start` is specified, the index within the iterable from
   *     which ChildParts are being removed, used for disconnecting directives
   *     in those Parts.
   *
   * @internal
   */
  _$clear(e = Te(this._$startNode).nextSibling, t) {
    var i;
    for ((i = this._$notifyConnectionChanged) == null || i.call(this, !1, !0, t); e !== this._$endNode; ) {
      const r = Te(e).nextSibling;
      Te(e).remove(), e = r;
    }
  }
  /**
   * Implementation of RootPart's `isConnected`. Note that this method
   * should only be called on `RootPart`s (the `ChildPart` returned from a
   * top-level `render()` call). It has no effect on non-root ChildParts.
   * @param isConnected Whether to set
   * @internal
   */
  setConnected(e) {
    var t;
    if (this._$parent === void 0)
      this.__isConnected = e, (t = this._$notifyConnectionChanged) == null || t.call(this, e);
    else
      throw new Error("part.setConnected() may only be called on a RootPart returned from render().");
  }
};
l(Vi, "ChildPart");
let ei = Vi;
const ln = class ln {
  get tagName() {
    return this.element.tagName;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  constructor(e, t, i, r, n) {
    this.type = Jr, this._$committedValue = S, this._$disconnectableChildren = void 0, this.element = e, this.name = t, this._$parent = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$committedValue = new Array(i.length - 1).fill(new String()), this.strings = i) : this._$committedValue = S, this._sanitizer = void 0;
  }
  /**
   * Sets the value of this part by resolving the value from possibly multiple
   * values and static strings and committing it to the DOM.
   * If this part is single-valued, `this._strings` will be undefined, and the
   * method will be called with a single value argument. If this part is
   * multi-value, `this._strings` will be defined, and the method is called
   * with the value array of the part's owning TemplateInstance, and an offset
   * into the value array from which the values should be read.
   * This method is overloaded this way to eliminate short-lived array slices
   * of the template instance values, and allow a fast-path for single-valued
   * parts.
   *
   * @param value The part value, or an array of values for multi-valued parts
   * @param valueIndex the index to start reading values from. `undefined` for
   *   single-valued parts
   * @param noCommit causes the part to not commit its value to the DOM. Used
   *   in hydration to prime attribute parts with their first-rendered value,
   *   but not set the attribute, and in SSR to no-op the DOM operation and
   *   capture the value for serialization.
   *
   * @internal
   */
  _$setValue(e, t = this, i, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0)
      e = Mt(this, e, t, 0), a = !Zt(e) || e !== this._$committedValue && e !== kt, a && (this._$committedValue = e);
    else {
      const o = e;
      e = n[0];
      let h, u;
      for (h = 0; h < n.length - 1; h++)
        u = Mt(this, o[i + h], t, h), u === kt && (u = this._$committedValue[h]), a || (a = !Zt(u) || u !== this._$committedValue[h]), u === S ? e = S : e !== S && (e += (u ?? "") + n[h + 1]), this._$committedValue[h] = u;
    }
    a && !r && this._commitValue(e);
  }
  /** @internal */
  _commitValue(e) {
    e === S ? Te(this.element).removeAttribute(this.name) : (this._sanitizer === void 0 && (this._sanitizer = et(this.element, this.name, "attribute")), e = this._sanitizer(e ?? ""), M && M({
      kind: "commit attribute",
      element: this.element,
      name: this.name,
      value: e,
      options: this.options
    }), Te(this.element).setAttribute(this.name, e ?? ""));
  }
};
l(ln, "AttributePart");
let Nt = ln;
const cn = class cn extends Nt {
  constructor() {
    super(...arguments), this.type = Ta;
  }
  /** @internal */
  _commitValue(e) {
    this._sanitizer === void 0 && (this._sanitizer = et(this.element, this.name, "property")), e = this._sanitizer(e), M && M({
      kind: "commit property",
      element: this.element,
      name: this.name,
      value: e,
      options: this.options
    }), this.element[this.name] = e === S ? void 0 : e;
  }
};
l(cn, "PropertyPart");
let _r = cn;
const un = class un extends Nt {
  constructor() {
    super(...arguments), this.type = Ra;
  }
  /** @internal */
  _commitValue(e) {
    M && M({
      kind: "commit boolean attribute",
      element: this.element,
      name: this.name,
      value: !!(e && e !== S),
      options: this.options
    }), Te(this.element).toggleAttribute(this.name, !!e && e !== S);
  }
};
l(un, "BooleanAttributePart");
let br = un;
const dn = class dn extends Nt {
  constructor(e, t, i, r, n) {
    if (super(e, t, i, r, n), this.type = ka, this.strings !== void 0)
      throw new Error(`A \`<${e.localName}>\` has a \`@${t}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`);
  }
  // EventPart does not use the base _$setValue/_resolveValue implementation
  // since the dirty checking is more complex
  /** @internal */
  _$setValue(e, t = this) {
    if (e = Mt(this, e, t, 0) ?? S, e === kt)
      return;
    const i = this._$committedValue, r = e === S && i !== S || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== S && (i === S || r);
    M && M({
      kind: "commit event listener",
      element: this.element,
      name: this.name,
      value: e,
      options: this.options,
      removeListener: r,
      addListener: n,
      oldListener: i
    }), r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$committedValue = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$committedValue == "function" ? this._$committedValue.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$committedValue.handleEvent(e);
  }
};
l(dn, "EventPart");
let vr = dn;
const hn = class hn {
  constructor(e, t, i) {
    this.element = e, this.type = Qr, this._$disconnectableChildren = void 0, this._$parent = t, this.options = i;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(e) {
    M && M({
      kind: "commit to element binding",
      element: this.element,
      value: e,
      options: this.options
    }), Mt(this, e);
  }
};
l(hn, "ElementPart");
let yr = hn;
const er = ne.litHtmlPolyfillSupportDevMode;
er == null || er(Xt, ei);
(ne.litHtmlVersions ?? (ne.litHtmlVersions = [])).push("3.3.2");
ne.litHtmlVersions.length > 1 && queueMicrotask(() => {
  Qt("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
});
const xi = /* @__PURE__ */ l((s, e, t) => {
  if (e == null)
    throw new TypeError(`The container to render into may not be ${e}`);
  const i = _a++, r = (t == null ? void 0 : t.renderBefore) ?? e;
  let n = r._$litPart$;
  if (M && M({
    kind: "begin render",
    id: i,
    value: s,
    container: e,
    options: t,
    part: n
  }), n === void 0) {
    const a = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = n = new ei(e.insertBefore(Yt(), a), a, void 0, t ?? {});
  }
  return n._$setValue(s), M && M({
    kind: "end render",
    id: i,
    value: s,
    container: e,
    options: t,
    part: n
  }), n;
}, "render");
xi.setSanitizer = va, xi.createSanitizer = fr, xi._testOnlyClearSanitizerFactoryDoNotCallOrElse = ya;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fa = /* @__PURE__ */ l((s, e) => s, "JSCompiler_renameProperty"), de = globalThis;
let Rs;
de.litIssuedWarnings ?? (de.litIssuedWarnings = /* @__PURE__ */ new Set()), Rs = /* @__PURE__ */ l((s, e) => {
  e += ` See https://lit.dev/msg/${s} for more information.`, !de.litIssuedWarnings.has(e) && !de.litIssuedWarnings.has(s) && (console.warn(e), de.litIssuedWarnings.add(e));
}, "issueWarning$1");
const pn = class pn extends ke {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.__childPart = void 0;
  }
  /**
   * @category rendering
   */
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * @param changedProperties Map of changed properties with old values
   * @category updates
   */
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this.__childPart = xi(t, this.renderRoot, this.renderOptions);
  }
  /**
   * Invoked when the component is added to the document's DOM.
   *
   * In `connectedCallback()` you should setup tasks that should only occur when
   * the element is connected to the document. The most common of these is
   * adding event listeners to nodes external to the element, like a keydown
   * event handler added to the window.
   *
   * ```ts
   * connectedCallback() {
   *   super.connectedCallback();
   *   addEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * Typically, anything done in `connectedCallback()` should be undone when the
   * element is disconnected, in `disconnectedCallback()`.
   *
   * @category lifecycle
   */
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this.__childPart) == null || e.setConnected(!0);
  }
  /**
   * Invoked when the component is removed from the document's DOM.
   *
   * This callback is the main signal to the element that it may no longer be
   * used. `disconnectedCallback()` should ensure that nothing is holding a
   * reference to the element (such as event listeners added to nodes external
   * to the element), so that it is free to be garbage collected.
   *
   * ```ts
   * disconnectedCallback() {
   *   super.disconnectedCallback();
   *   window.removeEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * An element may be re-connected after being disconnected.
   *
   * @category lifecycle
   */
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.__childPart) == null || e.setConnected(!1);
  }
  /**
   * Invoked on each update to perform rendering tasks. This method may return
   * any value renderable by lit-html's `ChildPart` - typically a
   * `TemplateResult`. Setting properties inside this method will *not* trigger
   * the element to update.
   * @category rendering
   */
  render() {
    return kt;
  }
};
l(pn, "LitElement");
let U = pn;
U._$litElement$ = !0;
U[Fa("finalized")] = !0;
var $s;
($s = de.litElementHydrateSupport) == null || $s.call(de, { LitElement: U });
const tr = de.litElementPolyfillSupportDevMode;
tr == null || tr({ LitElement: U });
(de.litElementVersions ?? (de.litElementVersions = [])).push("4.2.2");
de.litElementVersions.length > 1 && queueMicrotask(() => {
  Rs("multiple-versions", "Multiple versions of Lit loaded. Loading multiple versions is not recommended.");
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = /* @__PURE__ */ l((s) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(s, e);
  }) : customElements.define(s, e);
}, "customElement");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let ks;
globalThis.litIssuedWarnings ?? (globalThis.litIssuedWarnings = /* @__PURE__ */ new Set()), ks = /* @__PURE__ */ l((s, e) => {
  e += ` See https://lit.dev/msg/${s} for more information.`, !globalThis.litIssuedWarnings.has(e) && !globalThis.litIssuedWarnings.has(s) && (console.warn(e), globalThis.litIssuedWarnings.add(e));
}, "issueWarning");
const Oa = /* @__PURE__ */ l((s, e, t) => {
  const i = e.hasOwnProperty(t);
  return e.constructor.createProperty(t, s), i ? Object.getOwnPropertyDescriptor(e, t) : void 0;
}, "legacyProperty"), Da = {
  attribute: !0,
  type: String,
  converter: ki,
  reflect: !1,
  hasChanged: Wr
}, La = /* @__PURE__ */ l((s = Da, e, t) => {
  const { kind: i, metadata: r } = t;
  r == null && ks("missing-class-metadata", `The class ${e} is missing decorator metadata. This could mean that you're using a compiler that supports decorators but doesn't support decorator metadata, such as TypeScript 5.1. Please update your compiler.`);
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && (s = Object.create(s), s.wrapped = !0), n.set(t.name, s), i === "accessor") {
    const { name: a } = t;
    return {
      set(o) {
        const h = e.get.call(this);
        e.set.call(this, o), this.requestUpdate(a, h, s, !0, o);
      },
      init(o) {
        return o !== void 0 && this._$changeProperty(a, void 0, s, o), o;
      }
    };
  } else if (i === "setter") {
    const { name: a } = t;
    return function(o) {
      const h = this[a];
      e.call(this, o), this.requestUpdate(a, h, s, !0, o);
    };
  }
  throw new Error(`Unsupported decorator location: ${i}`);
}, "standardProperty");
function g(s) {
  return (e, t) => typeof t == "object" ? La(s, e, t) : Oa(s, e, t);
}
l(g, "property");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $(s) {
  return g({
    ...s,
    // Add both `state` and `attribute` because we found a third party
    // controller that is keying off of PropertyOptions.state to determine
    // whether a field is a private internal property or not.
    state: !0,
    attribute: !1
  });
}
l($, "state");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
globalThis.litIssuedWarnings ?? (globalThis.litIssuedWarnings = /* @__PURE__ */ new Set());
function K(s, e) {
  if (!e || e.trim() === "")
    return s;
  const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let r = s;
  for (const n of i) {
    if (r == null || typeof r != "object")
      return;
    r = r[n];
  }
  return r;
}
l(K, "getByPath");
function ml(s, e) {
  return K(s, e) !== void 0;
}
l(ml, "hasPath");
function On(s, e, t) {
  const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
  let n = s;
  for (let a = 0; a < r.length - 1; a++) {
    const o = r[a];
    (!(o in n) || typeof n[o] != "object" || n[o] === null) && (n[o] = {}), n = n[o];
  }
  n[r[r.length - 1]] = t;
}
l(On, "setByPath");
function _l(s, e, t) {
  const i = K(s, e);
  return i !== void 0 ? i : t;
}
l(_l, "getByPathOrDefault");
function Sr(s) {
  return s ? String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
}
l(Sr, "escapeHtml");
function Dn(s, e = !1) {
  if (typeof s == "number")
    return isNaN(s) ? e ? null : 0 : s;
  if (typeof s != "string")
    return e ? null : 0;
  let t = s.trim();
  if (t === "")
    return e ? null : 0;
  t = t.replace(/\s/g, "");
  const i = t.includes(","), r = t.includes(".");
  if (i && r) {
    const a = t.lastIndexOf(","), o = t.lastIndexOf(".");
    a > o ? t = t.replace(/\./g, "").replace(",", ".") : t = t.replace(/,/g, "");
  } else i && (t = t.replace(",", "."));
  const n = parseFloat(t);
  return isNaN(n) ? e ? null : 0 : n;
}
l(Dn, "toNumber");
function Ba(s) {
  if (typeof s != "string")
    return !1;
  const e = s.trim();
  return e === "" ? !1 : /^-?[\d\s]+([.,]\d+)?$/.test(e);
}
l(Ba, "looksLikeNumber");
function Ia(s) {
  return !s || typeof s != "string" || ["N/A", "null", "undefined", "00", ""].includes(s) ? !1 : !!(s === "2A" || s === "2B" || /^97[1-6]$/.test(s) || /^(0[1-9]|[1-8]\d|9[0-5])$/.test(s));
}
l(Ia, "isValidDeptCode");
const Ms = import.meta;
var As;
const oi = ((As = Ms.env) == null ? void 0 : As.VITE_PROXY_URL) || "https://chartsbuilder.matge.com";
function Ua() {
  var e;
  const s = ((e = Ms.env) == null ? void 0 : e.VITE_LIB_URL) || "";
  return s ? s === "unpkg" ? "https://unpkg.com/gouv-widgets/dist" : s === "jsdelivr" ? "https://cdn.jsdelivr.net/npm/gouv-widgets/dist" : s : `${oi}/dist`;
}
l(Ua, "resolveLibUrl");
Ua();
const Ln = {
  baseUrl: oi,
  endpoints: {
    grist: "/grist-proxy",
    gristGouv: "/grist-gouv-proxy",
    albert: "/albert-proxy",
    tabular: "/tabular-proxy",
    corsProxy: "/cors-proxy"
  }
};
function za() {
  if (typeof window > "u")
    return !1;
  const { hostname: s, port: e } = window.location;
  return (s === "localhost" || s === "127.0.0.1") && !!e && e !== "80" && e !== "443";
}
l(za, "isViteDevMode");
function ja() {
  return typeof window < "u" && "__TAURI__" in window;
}
l(ja, "isTauriMode");
function Yr() {
  const s = { ...Ln.endpoints };
  return za() ? { baseUrl: "", endpoints: s } : ja() ? { baseUrl: Ln.baseUrl, endpoints: s } : {
    baseUrl: oi,
    endpoints: s
  };
}
l(Yr, "getProxyConfig");
function qa(s) {
  if (!s)
    throw new Error("getProxiedUrl: url is required");
  const e = Yr();
  return s.includes("tabular-api.data.gouv.fr") ? s.replace("https://tabular-api.data.gouv.fr", `${e.baseUrl}${e.endpoints.tabular}`) : s.includes("docs.getgrist.com") ? s.replace("https://docs.getgrist.com", `${e.baseUrl}${e.endpoints.grist}`) : s.includes("grist.numerique.gouv.fr") ? s.replace("https://grist.numerique.gouv.fr", `${e.baseUrl}${e.endpoints.gristGouv}`) : s.includes("albert.api.etalab.gouv.fr") ? s.replace("https://albert.api.etalab.gouv.fr", `${e.baseUrl}${e.endpoints.albert}`) : s;
}
l(qa, "getProxiedUrl");
function Ga(s, e) {
  const t = Yr();
  return {
    url: `${t.baseUrl}${t.endpoints.corsProxy}`,
    headers: {
      ...e || {},
      "X-Target-URL": s
    }
  };
}
l(Ga, "buildCorsProxyRequest");
const fi = {
  FAVORITES: "gouv-widgets-favorites",
  DASHBOARDS: "gouv-widgets-dashboards",
  CONNECTIONS: "gouv_widgets_connections",
  SOURCES: "gouv_widgets_sources"
};
function gi(s, e) {
  try {
    const t = localStorage.getItem(s);
    return t ? JSON.parse(t) : e;
  } catch {
    return e;
  }
}
l(gi, "loadFromStorage");
let Va = "idle", Ha = 0, Bn = /* @__PURE__ */ new Set();
function Wa(s) {
  Bn.add(s);
  try {
    s(Va, Ha);
  } catch {
  }
  return () => {
    Bn.delete(s);
  };
}
l(Wa, "onSyncStatusChange");
const In = /\/api\/explore\/v2\.1\/catalog\/datasets\/([^/]+)/, Ns = {
  id: "opendatasoft",
  displayName: "OpenDataSoft",
  urlPatterns: [In],
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
    extractIds: /* @__PURE__ */ l((s) => {
      const e = s.match(In);
      return e ? { datasetId: e[1] } : null;
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
}, Un = /tabular-api\.data\.gouv\.fr\/api\/resources\/([^/]+)/, Fs = {
  id: "tabular",
  displayName: "Tabular (data.gouv.fr)",
  urlPatterns: [Un],
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
    extractIds: /* @__PURE__ */ l((s) => {
      const e = s.match(Un);
      return e ? { resourceId: e[1] } : null;
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
}, zn = /\/api\/docs\/([^/]+)\/tables\/([^/]+)/, Os = {
  id: "grist",
  displayName: "Grist",
  urlPatterns: [zn],
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
    extractIds: /* @__PURE__ */ l((s) => {
      const e = s.match(zn);
      return e ? { documentId: e[1], tableId: e[2] } : null;
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
}, Ds = {
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
    extractIds: /* @__PURE__ */ l(() => null, "extractIds")
  },
  codeGen: {
    usesGouvSource: !0,
    usesGouvQuery: !0,
    usesGouvNormalize: !1,
    sourceApiType: "generic",
    fieldPrefix: "",
    dependencies: { dsfr: !0, dsfrChart: !0, gouvWidgets: !0 }
  }
}, jn = /melodi\/data\/([^?/]+)/, Ls = {
  id: "insee",
  displayName: "INSEE (Melodi)",
  urlPatterns: [jn],
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
    extractIds: /* @__PURE__ */ l((s) => {
      const e = s.match(jn);
      return e ? { datasetId: e[1] } : null;
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
}, Ka = /* @__PURE__ */ new Map();
function li(s) {
  Ka.set(s.id, s);
}
l(li, "registerProvider");
li(Ns);
li(Fs);
li(Os);
li(Ls);
li(Ds);
const Ja = {
  user: null,
  isAuthenticated: !1,
  isLoading: !0
};
let Ft = { ...Ja }, lt = null, Gt = null, Bs = "";
const wr = /* @__PURE__ */ new Set();
function Qa() {
  for (const s of wr)
    try {
      s(Ft);
    } catch {
    }
}
l(Qa, "notify");
function Ye(s) {
  Ft = { ...Ft, ...s }, Qa();
}
l(Ye, "setState");
async function ci(s, e) {
  return fetch(`${Bs}${s}`, {
    ...e,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...e == null ? void 0 : e.headers
    }
  });
}
l(ci, "apiFetch");
async function Is() {
  if (lt !== null)
    return lt;
  try {
    const s = await fetch(`${Bs}/api/auth/me`, {
      credentials: "include"
    });
    lt = s.status === 200 || s.status === 401;
  } catch {
    lt = !1;
  }
  return lt && typeof window < "u" && (window.__gwDbMode = !0), lt;
}
l(Is, "isDbMode");
async function Ya() {
  return Gt || (Gt = Za(), Gt);
}
l(Ya, "checkAuth");
async function Za() {
  try {
    if (!await Is())
      return Ye({ user: null, isAuthenticated: !1, isLoading: !1 }), Ft;
    const e = await ci("/api/auth/me");
    if (e.ok) {
      const t = await e.json();
      Ye({ user: t.user, isAuthenticated: !0, isLoading: !1 });
    } else
      Ye({ user: null, isAuthenticated: !1, isLoading: !1 });
  } catch {
    Gt = null, Ye({ user: null, isAuthenticated: !1, isLoading: !1 });
  }
  return Ft;
}
l(Za, "_doCheckAuth");
async function Xa(s) {
  try {
    const e = await ci("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(s)
    });
    if (!e.ok)
      return { success: !1, error: (await e.json()).error || "Login failed" };
    const t = await e.json();
    return Ye({ user: t.user, isAuthenticated: !0, isLoading: !1 }), await Us(), { success: !0 };
  } catch {
    return { success: !1, error: "Network error" };
  }
}
l(Xa, "login");
async function eo(s) {
  try {
    const e = await ci("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(s)
    });
    if (!e.ok)
      return { success: !1, error: (await e.json()).error || "Registration failed" };
    const t = await e.json();
    return Ye({ user: t.user, isAuthenticated: !0, isLoading: !1 }), await Us(), { success: !0 };
  } catch {
    return { success: !1, error: "Network error" };
  }
}
l(eo, "register");
async function to() {
  try {
    await ci("/api/auth/logout", { method: "POST" });
  } catch {
  }
  Ye({ user: null, isAuthenticated: !1, isLoading: !1 });
}
l(to, "logout");
function io(s) {
  return wr.add(s), () => {
    wr.delete(s);
  };
}
l(io, "onAuthChange");
function mi() {
  return Ft.isAuthenticated;
}
l(mi, "isAuthenticated");
const ir = "gw-migrated";
async function Us() {
  if (localStorage.getItem(ir))
    return;
  const s = gi(fi.SOURCES, []), e = gi(fi.CONNECTIONS, []), t = gi(fi.FAVORITES, []), i = gi(fi.DASHBOARDS, []);
  if (!(s.length > 0 || e.length > 0 || t.length > 0 || i.length > 0)) {
    localStorage.setItem(ir, "1");
    return;
  }
  try {
    (await ci("/api/migrate", {
      method: "POST",
      body: JSON.stringify({ sources: s, connections: e, favorites: t, dashboards: i })
    })).ok && (localStorage.setItem(ir, "1"), console.info("[auth] localStorage data migrated to server"));
  } catch {
    console.warn("[auth] Migration failed, will retry on next login");
  }
}
l(Us, "autoMigrateIfNeeded");
const qn = `${oi}/beacon`, Gn = /* @__PURE__ */ new Set();
function Pe(s, e) {
  const t = `${s}:${e || ""}`;
  if (Gn.has(t) || (Gn.add(t), typeof window > "u"))
    return;
  const i = window.location.hostname;
  if (i === "localhost" || i === "127.0.0.1" || i === new URL(oi).hostname)
    return;
  const r = new URLSearchParams();
  if (r.set("c", s), e && r.set("t", e), r.set("r", window.location.origin), typeof window < "u" && window.__gwDbMode === !0)
    try {
      fetch("/api/monitoring/beacon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          component: s,
          chartType: e || null,
          origin: window.location.origin
        })
      }).catch(() => {
        new Image().src = `${qn}?${r.toString()}`;
      });
      return;
    } catch {
    }
  const a = `${qn}?${r.toString()}`;
  try {
    new Image().src = a;
  } catch {
  }
}
l(Pe, "sendWidgetBeacon");
const fn = class fn {
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
  getDefaultSearchTemplate() {
    return null;
  }
  getProviderConfig() {
    return Ds;
  }
  buildFacetWhere(e, t) {
    const i = [];
    for (const [r, n] of Object.entries(e))
      r === t || n.size === 0 || (n.size === 1 ? i.push(`${r}:eq:${[...n][0]}`) : i.push(`${r}:in:${[...n].join("|")}`));
    return i.join(", ");
  }
};
l(fn, "GenericAdapter");
let $r = fn;
function rr(s, e) {
  const t = {};
  return e && (t.signal = e), s.headers && Object.keys(s.headers).length > 0 && (t.headers = s.headers), t;
}
l(rr, "buildFetchOptions$3");
const _i = 100, nr = 10, gn = class gn {
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
    const r = e.limit <= 0 ? nr * _i : e.limit, n = _i;
    let a = [], o = 0, h = -1;
    for (let u = 0; u < nr; u++) {
      const c = r - a.length;
      if (c <= 0)
        break;
      const d = this.buildUrl(e, Math.min(n, c), o), p = await fetch(d, rr(e, t));
      if (!p.ok)
        throw new Error(`HTTP ${p.status}: ${p.statusText}`);
      const f = await p.json(), m = f.results || [];
      if (a = a.concat(m), typeof f.total_count == "number" && (h = f.total_count), h >= 0 && a.length >= h || m.length < n)
        break;
      o += m.length;
    }
    return h >= 0 && a.length < h && a.length < r && console.warn(`gouv-query: pagination incomplete - ${a.length}/${h} resultats recuperes (limite de securite: ${nr} pages de ${_i})`), {
      data: a,
      totalCount: h >= 0 ? h : a.length,
      needsClientProcessing: !1
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(e, t, i) {
    const r = this.buildServerSideUrl(e, t), n = await fetch(r, rr(e, i));
    if (!n.ok)
      throw new Error(`HTTP ${n.status}: ${n.statusText}`);
    const a = await n.json(), o = a.results || [], h = typeof a.total_count == "number" ? a.total_count : 0;
    return {
      data: o,
      totalCount: h,
      needsClientProcessing: !1,
      rawJson: a
    };
  }
  /**
   * Construit une URL ODS pour le fetch complet (avec pagination).
   * limitOverride et pageOrOffsetOverride controlent la pagination per-page.
   */
  buildUrl(e, t, i) {
    const r = e.baseUrl || "https://data.opendatasoft.com", n = new URL(`${r}/api/explore/v2.1/catalog/datasets/${e.datasetId}/records`);
    e.select ? n.searchParams.set("select", e.select) : e.aggregate && e.groupBy && n.searchParams.set("select", this._buildSelectFromAggregate(e));
    const a = e.where || e.filter;
    if (a && n.searchParams.set("where", a), e.groupBy && n.searchParams.set("group_by", e.groupBy), e.orderBy) {
      const o = e.orderBy.replace(/:(\w+)$/, (h, u) => ` ${u.toUpperCase()}`);
      n.searchParams.set("order_by", o);
    }
    return t !== void 0 ? n.searchParams.set("limit", String(t)) : e.limit > 0 && n.searchParams.set("limit", String(Math.min(e.limit, _i))), i && i > 0 && n.searchParams.set("offset", String(i)), n.toString();
  }
  /**
   * Construit l'URL ODS en mode server-side (une seule page).
   */
  buildServerSideUrl(e, t) {
    const i = e.baseUrl || "https://data.opendatasoft.com", r = new URL(`${i}/api/explore/v2.1/catalog/datasets/${e.datasetId}/records`);
    e.select ? r.searchParams.set("select", e.select) : e.aggregate && e.groupBy && r.searchParams.set("select", this._buildSelectFromAggregate(e)), t.effectiveWhere && r.searchParams.set("where", t.effectiveWhere), e.groupBy && r.searchParams.set("group_by", e.groupBy);
    const n = t.orderBy;
    if (n) {
      const o = n.replace(/:(\w+)$/, (h, u) => ` ${u.toUpperCase()}`);
      r.searchParams.set("order_by", o);
    }
    r.searchParams.set("limit", String(e.pageSize));
    const a = (t.page - 1) * e.pageSize;
    return a > 0 && r.searchParams.set("offset", String(a)), r.toString();
  }
  /**
   * Fetch les valeurs de facettes depuis l'endpoint ODS /facets.
   */
  async fetchFacets(e, t, i, r) {
    const n = e.baseUrl || "https://data.opendatasoft.com", a = new URL(`${n}/api/explore/v2.1/catalog/datasets/${e.datasetId}/facets`);
    for (const c of t)
      a.searchParams.append("facet", c);
    i && a.searchParams.set("where", i);
    const o = await fetch(a.toString(), rr(e, r));
    if (!o.ok)
      throw new Error(`HTTP ${o.status}: ${o.statusText}`);
    const h = await o.json(), u = [];
    for (const c of h.facets || [])
      u.push({
        field: c.name,
        values: (c.facets || []).map((d) => ({
          value: d.value,
          count: d.count
        }))
      });
    return u;
  }
  getDefaultSearchTemplate() {
    return 'search("{q}")';
  }
  getProviderConfig() {
    return Ns;
  }
  buildFacetWhere(e, t) {
    const i = [];
    for (const [r, n] of Object.entries(e))
      if (!(r === t || n.size === 0))
        if (n.size === 1) {
          const a = [...n][0].replace(/"/g, '\\"');
          i.push(`${r} = "${a}"`);
        } else {
          const a = [...n].map((o) => `"${o.replace(/"/g, '\\"')}"`).join(", ");
          i.push(`${r} IN (${a})`);
        }
    return i.join(" AND ");
  }
  parseAggregates(e) {
    if (!e)
      return [];
    const t = [], i = e.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const n = r.split(":");
      n.length >= 2 && t.push({
        field: n[0],
        function: n[1],
        alias: n[2]
      });
    }
    return t;
  }
  /**
   * Convertit aggregate="field:func" + group-by en syntaxe ODS select.
   */
  _buildSelectFromAggregate(e) {
    const t = this.parseAggregates(e.aggregate), i = [];
    for (const n of t) {
      const a = n.function === "count" ? "count(*)" : `${n.function}(${n.field})`, o = n.alias || `${n.field}__${n.function}`;
      i.push(`${a} as ${o}`);
    }
    const r = e.groupBy.split(",").map((n) => n.trim()).filter(Boolean);
    for (const n of r)
      i.push(n);
    return i.join(", ");
  }
};
l(gn, "OpenDataSoftAdapter");
let Ar = gn;
function Vn(s, e) {
  const t = {};
  return e && (t.signal = e), s.headers && Object.keys(s.headers).length > 0 && (t.headers = s.headers), t;
}
l(Vn, "buildFetchOptions$2");
const bi = 50, sr = 500, mn = class mn {
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
  validate(e) {
    return e.resource ? null : 'attribut "resource" requis pour les requetes Tabular';
  }
  /**
   * Fetch toutes les donnees avec pagination automatique via links.next.
   * Quand groupBy/aggregate sont presents, l'API Tabular les execute
   * cote serveur et retourne les donnees deja agregees (needsClientProcessing=false).
   */
  async fetchAll(e, t) {
    var u;
    const i = e.limit <= 0, r = i ? sr * bi : e.limit;
    let n = [], a = -1, o = 1;
    for (let c = 0; c < sr && !(r - n.length <= 0); c++) {
      const p = this.buildUrl(e, bi, o), f = await fetch(p, Vn(e, t));
      if (!f.ok)
        throw new Error(`HTTP ${f.status}: ${f.statusText}`);
      const m = await f.json(), y = m.data || [];
      n = n.concat(y), m.meta && typeof m.meta.total == "number" && (a = m.meta.total);
      let b = !1;
      if ((u = m.links) != null && u.next)
        try {
          const x = new URL(m.links.next, "https://tabular-api.data.gouv.fr"), A = Number(x.searchParams.get("page"));
          A > 0 && (o = A, b = !0);
        } catch {
        }
      if (!b || a >= 0 && n.length >= a || y.length < bi)
        break;
    }
    !i && n.length > r && (n = n.slice(0, r)), a >= 0 && n.length < a && n.length < r && console.warn(`gouv-query: pagination incomplete - ${n.length}/${a} resultats recuperes (limite de securite: ${sr} pages de ${bi})`);
    const h = !!(e.groupBy || e.aggregate);
    return {
      data: n,
      totalCount: a >= 0 ? a : n.length,
      needsClientProcessing: !h
    };
  }
  /**
   * Fetch une seule page en mode server-side.
   */
  async fetchPage(e, t, i) {
    var u;
    const r = this.buildServerSideUrl(e, t), n = await fetch(r, Vn(e, i));
    if (!n.ok)
      throw new Error(`HTTP ${n.status}: ${n.statusText}`);
    const a = await n.json(), o = a.data || [], h = ((u = a.meta) == null ? void 0 : u.total) ?? 0;
    return {
      data: o,
      totalCount: h,
      needsClientProcessing: !1,
      rawJson: a
    };
  }
  /**
   * Construit une URL Tabular pour le fetch complet.
   */
  buildUrl(e, t, i) {
    const r = this._getBaseUrl(e), n = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, a = new URL(`${r}/api/resources/${e.resource}/data/`, n), o = e.filter || e.where;
    if (o && this._applyColonFilters(a, o), e.groupBy) {
      const h = e.groupBy.split(",").map((u) => u.trim());
      for (const u of h)
        a.searchParams.append(`${u}__groupby`, "");
    }
    if (e.aggregate) {
      const h = e.aggregate.split(",").map((u) => u.trim());
      for (const u of h) {
        const c = u.split(":");
        if (c.length >= 2) {
          const d = c[0], p = c[1];
          a.searchParams.append(`${d}__${p}`, "");
        }
      }
    }
    if (e.orderBy) {
      const h = e.orderBy.split(":"), u = h[0], c = h[1] || "asc";
      a.searchParams.set(`${u}__sort`, c);
    }
    return t ? a.searchParams.set("page_size", String(t)) : e.limit > 0 && a.searchParams.set("page_size", String(e.limit)), i && a.searchParams.set("page", String(i)), a.toString();
  }
  /**
   * Construit l'URL Tabular en mode server-side (une seule page).
   */
  buildServerSideUrl(e, t) {
    const i = this._getBaseUrl(e), r = typeof window < "u" && window.location.origin !== "null" ? window.location.origin : void 0, n = new URL(`${i}/api/resources/${e.resource}/data/`, r), a = t.effectiveWhere || e.filter || e.where;
    a && this._applyColonFilters(n, a);
    const o = t.orderBy;
    if (o) {
      const h = o.split(":"), u = h[0], c = h[1] || "asc";
      n.searchParams.set(`${u}__sort`, c);
    }
    return n.searchParams.set("page_size", String(e.pageSize)), n.searchParams.set("page", String(t.page)), n.toString();
  }
  /**
   * Applique des filtres colon-syntax (field:op:value, ...) comme query params.
   */
  _applyColonFilters(e, t) {
    const i = t.split(",").map((r) => r.trim());
    for (const r of i) {
      const n = r.split(":");
      if (n.length >= 3) {
        const a = n[0], o = this._mapOperator(n[1]), h = n.slice(2).join(":");
        e.searchParams.set(`${a}__${o}`, h);
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
  getDefaultSearchTemplate() {
    return null;
  }
  getProviderConfig() {
    return Fs;
  }
  buildFacetWhere(e, t) {
    const i = [];
    for (const [r, n] of Object.entries(e))
      r === t || n.size === 0 || (n.size === 1 ? i.push(`${r}:eq:${[...n][0]}`) : i.push(`${r}:in:${[...n].join("|")}`));
    return i.join(", ");
  }
  /**
   * Determine le base URL, avec fallback sur le proxy CORS.
   */
  _getBaseUrl(e) {
    if (e.baseUrl)
      return e.baseUrl;
    const t = Yr();
    return `${t.baseUrl}${t.endpoints.tabular}`;
  }
};
l(mn, "TabularAdapter");
let Cr = mn;
function jt(s, e) {
  const t = {};
  return e && (t.signal = e), s.headers && Object.keys(s.headers).length > 0 && (t.headers = s.headers), t;
}
l(jt, "buildFetchOptions$1");
const _n = class _n {
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
  validate(e) {
    return e.baseUrl ? null : 'attribut "base-url" requis pour les requetes Grist';
  }
  // =========================================================================
  // fetchAll / fetchPage — orchestration Records vs SQL
  // =========================================================================
  async fetchAll(e, t) {
    if (this._needsSqlMode(e) && await this._checkSqlAvailability(e))
      return this._fetchSql(e, void 0, t);
    const i = this.buildUrl(e), r = await fetch(i, jt(e, t));
    if (!r.ok)
      throw new Error(`HTTP ${r.status}: ${r.statusText}`);
    const n = await r.json(), a = this._flattenRecords(n.records || []);
    return {
      data: a,
      totalCount: a.length,
      // Server-side si filter ou sort appliques, sinon client-side
      needsClientProcessing: !e.where && !e.orderBy
    };
  }
  async fetchPage(e, t, i) {
    if (this._needsSqlMode(e, t) && await this._checkSqlAvailability(e))
      return this._fetchSql(e, t, i);
    const r = this.buildServerSideUrl(e, t), n = await fetch(r, jt(e, i));
    if (!n.ok)
      throw new Error(`HTTP ${n.status}: ${n.statusText}`);
    const a = await n.json(), o = this._flattenRecords(a.records || []), h = e.pageSize || o.length, u = o.length < h;
    return {
      data: o,
      totalCount: u ? ((t.page || 1) - 1) * h + o.length : -1,
      needsClientProcessing: !1
    };
  }
  // =========================================================================
  // buildUrl / buildServerSideUrl — Mode Records
  // =========================================================================
  buildUrl(e) {
    const t = new URL(e.baseUrl);
    if (e.where) {
      const i = this._colonWhereToGristFilter(e.where);
      i && t.searchParams.set("filter", JSON.stringify(i));
    }
    return e.orderBy && t.searchParams.set("sort", this._orderByToGristSort(e.orderBy)), e.limit && t.searchParams.set("limit", String(e.limit)), t.toString();
  }
  buildServerSideUrl(e, t) {
    const i = new URL(e.baseUrl), r = t.effectiveWhere || e.where;
    if (r) {
      const a = this._colonWhereToGristFilter(r);
      a && i.searchParams.set("filter", JSON.stringify(a));
    }
    const n = t.orderBy || e.orderBy;
    return n && i.searchParams.set("sort", this._orderByToGristSort(n)), t.page && e.pageSize && (i.searchParams.set("limit", String(e.pageSize)), i.searchParams.set("offset", String((t.page - 1) * e.pageSize))), i.toString();
  }
  // =========================================================================
  // Facettes server-side via SQL GROUP BY + COUNT
  // =========================================================================
  async fetchFacets(e, t, i, r) {
    const n = [], a = e;
    if (!await this._checkSqlAvailability(a))
      return n;
    for (const o of t) {
      const h = this._getTableId(a), u = this._escapeIdentifier(o), c = [];
      let d = `SELECT ${u}, COUNT(*) as cnt FROM ${this._escapeIdentifier(h)}`;
      i && (d += ` WHERE ${this._colonWhereToSql(i, c)}`), d += ` GROUP BY ${u} ORDER BY cnt DESC LIMIT 200`;
      const p = this._getSqlEndpointUrl(a);
      try {
        const f = await fetch(p, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...e.headers || {} },
          body: JSON.stringify({ sql: d, args: c, timeout: 500 }),
          signal: r
        });
        if (!f.ok)
          continue;
        const y = (await f.json()).records || [];
        n.push({
          field: o,
          values: y.map((b) => ({
            value: String(b[0] ?? ""),
            count: Number(b[1]) || 0
          })).filter((b) => b.value !== "")
        });
      } catch {
        continue;
      }
    }
    return n;
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
    return Os;
  }
  buildFacetWhere(e, t) {
    const i = [];
    for (const [r, n] of Object.entries(e))
      r === t || n.size === 0 || (n.size === 1 ? i.push(`${r}:eq:${[...n][0]}`) : i.push(`${r}:in:${[...n].join("|")}`));
    return i.join(", ");
  }
  // =========================================================================
  // parseAggregates
  // =========================================================================
  parseAggregates(e) {
    return e.split(",").map((t) => {
      const [i, r, n] = t.trim().split(":");
      return {
        field: i,
        function: r,
        alias: n || `${r}_${i}`
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
  async fetchColumns(e, t) {
    const i = e.baseUrl.replace(/\/records.*$/, "/columns");
    try {
      const r = await fetch(i, jt(e, t));
      return r.ok ? ((await r.json()).columns || []).map((a) => {
        const o = a.fields;
        return {
          id: a.id,
          label: (o == null ? void 0 : o.label) || a.id,
          type: (o == null ? void 0 : o.type) || "Any",
          isFormula: (o == null ? void 0 : o.isFormula) || !1,
          formula: (o == null ? void 0 : o.formula) || ""
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
  async fetchTables(e, t) {
    const i = e.baseUrl.replace(/\/tables\/[^/]+\/records.*$/, "/tables");
    try {
      const r = await fetch(i, jt(e, t));
      return r.ok ? ((await r.json()).tables || []).map((a) => ({
        id: a.id
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
  _colonWhereToGristFilter(e) {
    const t = {}, i = e.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const [n, a, ...o] = r.split(":"), h = o.join(":");
      a === "eq" ? t[n] = [h] : a === "in" && (t[n] = h.split("|"));
    }
    return Object.keys(t).length > 0 ? t : null;
  }
  /**
   * Convertit order-by colon-syntax en parametre sort Grist.
   * "population:desc, nom:asc" → "-population,nom"
   */
  _orderByToGristSort(e) {
    return e.split(",").map((t) => {
      const [i, r] = t.trim().split(":");
      return r === "desc" ? `-${i}` : i;
    }).join(",");
  }
  /** Aplatir records[].fields en objets plats */
  _flattenRecords(e) {
    return e.map((t) => {
      const i = t, r = i.fields;
      return r ? { ...r } : i;
    });
  }
  // =========================================================================
  // Mode SQL : detection
  // =========================================================================
  /**
   * Determine si la requete necessite le mode SQL.
   * SQL est active quand group-by, aggregate ou operateurs avances sont demandes.
   */
  _needsSqlMode(e, t) {
    if (e.groupBy || e.aggregate)
      return !0;
    const i = this._mergeWhere(e.where, t == null ? void 0 : t.effectiveWhere);
    return !!(i && this._hasAdvancedOperators(i));
  }
  _hasAdvancedOperators(e) {
    const t = ["gt", "gte", "lt", "lte", "contains", "notcontains", "neq", "isnull", "isnotnull", "notin"];
    return e.split(",").some((i) => {
      const r = i.trim().split(":");
      return r.length >= 2 && t.includes(r[1]);
    });
  }
  _mergeWhere(e, t) {
    return t && e ? `${e}, ${t}` : t || e || "";
  }
  // =========================================================================
  // Mode SQL : execution
  // =========================================================================
  async _fetchSql(e, t, i) {
    const r = this._getTableId(e), { select: n, groupBy: a, where: o, orderBy: h, limit: u, offset: c, args: d } = this._buildSqlQuery(e, t, r), p = [
      `SELECT ${n}`,
      `FROM ${this._escapeIdentifier(r)}`,
      o ? `WHERE ${o}` : "",
      a ? `GROUP BY ${a}` : "",
      h ? `ORDER BY ${h}` : "",
      u ? `LIMIT ${u}` : "",
      c ? `OFFSET ${c}` : ""
    ].filter(Boolean).join(" "), f = this._getSqlEndpointUrl(e), m = await fetch(f, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...e.headers || {}
      },
      body: JSON.stringify({ sql: p, args: d, timeout: 800 }),
      signal: i
    });
    if (!m.ok) {
      if (m.status === 404 || m.status === 403)
        return console.warn("[gouv-widgets] Grist SQL endpoint not available, falling back to client-side processing"), this._sqlAvailableByHost.set(this._extractHostname(e.baseUrl), !1), this._fetchAllRecords(e, i);
      throw new Error(`Grist SQL HTTP ${m.status}: ${m.statusText}`);
    }
    const y = await m.json(), b = this._sqlResultToObjects(y);
    return {
      data: b,
      totalCount: b.length,
      needsClientProcessing: !1
    };
  }
  /** Fetch Records mode (internal fallback) */
  async _fetchAllRecords(e, t) {
    const i = this.buildUrl(e), r = await fetch(i, jt(e, t));
    if (!r.ok)
      throw new Error(`HTTP ${r.status}: ${r.statusText}`);
    const n = await r.json(), a = this._flattenRecords(n.records || []);
    return {
      data: a,
      totalCount: a.length,
      needsClientProcessing: !0
    };
  }
  // =========================================================================
  // Mode SQL : construction de requete
  // =========================================================================
  _buildSqlQuery(e, t, i) {
    const r = [];
    let n = "*", a = "", o = "", h = "", u = "", c = "";
    if (e.groupBy) {
      const f = e.groupBy.split(",").map((m) => this._escapeIdentifier(m.trim()));
      if (a = f.join(", "), e.aggregate) {
        const m = this.parseAggregates(e.aggregate);
        n = [
          ...f,
          ...m.map((b) => `${b.function.toUpperCase()}(${this._escapeIdentifier(b.field)}) as ${this._escapeIdentifier(b.alias || `${b.function}_${b.field}`)}`)
        ].join(", ");
      } else
        n = f.join(", ") + ", COUNT(*) as count";
    }
    const d = this._mergeWhere(e.where, t == null ? void 0 : t.effectiveWhere);
    d && (o = this._colonWhereToSql(d, r));
    const p = (t == null ? void 0 : t.orderBy) || e.orderBy;
    return p && (h = p.split(",").map((f) => {
      const [m, y] = f.trim().split(":");
      return `${this._escapeIdentifier(m)} ${y === "desc" ? "DESC" : "ASC"}`;
    }).join(", ")), t != null && t.page && e.pageSize ? (u = String(e.pageSize), t.page > 1 && (c = String((t.page - 1) * e.pageSize))) : e.limit && (u = String(e.limit)), { select: n, groupBy: a, where: o, orderBy: h, limit: u, offset: c, args: r };
  }
  // =========================================================================
  // Mode SQL : conversion WHERE colon → SQL parametre
  // =========================================================================
  /**
   * Convertit une clause WHERE colon-syntax en SQL parametre.
   * Tous les operateurs sont supportes.
   */
  _colonWhereToSql(e, t) {
    const i = [], r = e.split(",").map((n) => n.trim()).filter(Boolean);
    for (const n of r) {
      const [a, o, ...h] = n.split(":"), u = h.join(":"), c = this._escapeIdentifier(a);
      switch (o) {
        case "eq":
          i.push(`${c} = ?`), t.push(u);
          break;
        case "neq":
          i.push(`${c} != ?`), t.push(u);
          break;
        case "gt":
          i.push(`${c} > ?`), t.push(this._toNumberOrString(u));
          break;
        case "gte":
          i.push(`${c} >= ?`), t.push(this._toNumberOrString(u));
          break;
        case "lt":
          i.push(`${c} < ?`), t.push(this._toNumberOrString(u));
          break;
        case "lte":
          i.push(`${c} <= ?`), t.push(this._toNumberOrString(u));
          break;
        case "contains":
          i.push(`${c} LIKE ?`), t.push(`%${u}%`);
          break;
        case "notcontains":
          i.push(`${c} NOT LIKE ?`), t.push(`%${u}%`);
          break;
        case "in": {
          const d = u.split("|");
          i.push(`${c} IN (${d.map(() => "?").join(",")})`), t.push(...d);
          break;
        }
        case "notin": {
          const d = u.split("|");
          i.push(`${c} NOT IN (${d.map(() => "?").join(",")})`), t.push(...d);
          break;
        }
        case "isnull":
          i.push(`${c} IS NULL`);
          break;
        case "isnotnull":
          i.push(`${c} IS NOT NULL`);
          break;
      }
    }
    return i.join(" AND ");
  }
  // =========================================================================
  // Mode SQL : parsing reponse
  // =========================================================================
  /**
   * Convertit le format reponse SQL Grist en tableau d'objets.
   * Input:  { records: [[v1, v2], [v3, v4]], columns: ["col1", "col2"] }
   * Output: [{ col1: v1, col2: v2 }, { col1: v3, col2: v4 }]
   */
  _sqlResultToObjects(e) {
    const { records: t = [], columns: i = [] } = e;
    return t.map((r) => {
      const n = {};
      return i.forEach((a, o) => {
        n[a] = r[o];
      }), n;
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
  _getSqlEndpointUrl(e) {
    const t = e.baseUrl;
    if (!t.match(/\/api\/docs\/([^/]+)/))
      throw new Error("Cannot derive SQL endpoint from Grist URL: " + t);
    return t.replace(/\/tables\/[^/]+\/records.*$/, "/sql");
  }
  /**
   * Extrait le nom de la table depuis le baseUrl.
   */
  _getTableId(e) {
    const t = e.baseUrl.match(/\/tables\/([^/]+)/);
    if (!t)
      throw new Error("Cannot extract table ID from Grist URL: " + e.baseUrl);
    return t[1];
  }
  /**
   * Echappe un identifiant SQL avec des guillemets doubles (standard SQLite).
   * Supporte les noms avec espaces et accents.
   */
  _escapeIdentifier(e) {
    const t = e.trim();
    if (!t)
      throw new Error("Empty SQL identifier");
    return `"${t.replace(/"/g, '""')}"`;
  }
  _toNumberOrString(e) {
    const t = Number(e);
    return !isNaN(t) && e.trim() !== "" ? t : e;
  }
  // =========================================================================
  // SQL availability check (per hostname cache)
  // =========================================================================
  async _checkSqlAvailability(e) {
    const t = this._extractHostname(e.baseUrl), i = this._sqlAvailableByHost.get(t);
    if (i !== void 0)
      return i;
    try {
      const r = this._getSqlEndpointUrl(e), a = (await fetch(r + "?q=SELECT%201", {
        method: "GET",
        headers: e.headers || {},
        signal: AbortSignal.timeout(2e3)
      })).ok;
      return this._sqlAvailableByHost.set(t, a), a || console.info(`[gouv-widgets] Grist SQL endpoint not available on ${t} — using client-side processing`), a;
    } catch {
      return this._sqlAvailableByHost.set(t, !1), console.info(`[gouv-widgets] Grist SQL endpoint not available on ${t} — using client-side processing`), !1;
    }
  }
  _extractHostname(e) {
    try {
      return new URL(e).hostname;
    } catch {
      return e;
    }
  }
};
l(_n, "GristAdapter");
let Pr = _n;
const Hn = "https://api.insee.fr/melodi", Wn = 1e3, ar = 100;
function Kn(s, e) {
  const t = {};
  return e && (t.signal = e), s.headers && Object.keys(s.headers).length > 0 && (t.headers = s.headers), t;
}
l(Kn, "buildFetchOptions");
const bn = class bn {
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
  validate(e) {
    return e.datasetId ? null : 'attribut "dataset-id" requis pour les requetes INSEE Melodi';
  }
  /**
   * Fetch all data with automatic page-based pagination.
   *
   * INSEE Melodi uses `page=N` (1-based) and `maxResult=N` for pagination.
   * The `paging.count` field gives total records, `paging.isLast` signals the last page.
   */
  async fetchAll(e, t) {
    var h;
    const i = e.pageSize > 0 ? e.pageSize : Wn, n = e.limit <= 0 ? ar * i : e.limit;
    let a = [], o = -1;
    for (let u = 1; u <= ar; u++) {
      const c = n - a.length;
      if (c <= 0)
        break;
      const d = Math.min(i, c), p = this.buildUrl(e, d, u), f = await fetch(p, Kn(e, t));
      if (!f.ok)
        throw new Error(`HTTP ${f.status}: ${f.statusText}`);
      const m = await f.json(), y = m.observations || [], b = this._flattenObservations(y);
      if (a = a.concat(b), m.paging && typeof m.paging.count == "number" && (o = m.paging.count), ((h = m.paging) == null ? void 0 : h.isLast) === !0 || o >= 0 && a.length >= o || y.length < d)
        break;
    }
    return o >= 0 && a.length < o && a.length < n && console.warn(`gouv-source[insee]: pagination incomplete - ${a.length}/${o} resultats (limite: ${ar} pages de ${i})`), {
      data: a,
      totalCount: o >= 0 ? o : a.length,
      needsClientProcessing: !0
      // all processing is client-side
    };
  }
  /**
   * Fetch a single page in server-side pagination mode.
   */
  async fetchPage(e, t, i) {
    var c;
    const r = this.buildServerSideUrl(e, t), n = await fetch(r, Kn(e, i));
    if (!n.ok)
      throw new Error(`HTTP ${n.status}: ${n.statusText}`);
    const a = await n.json(), o = a.observations || [], h = this._flattenObservations(o), u = ((c = a.paging) == null ? void 0 : c.count) ?? 0;
    return {
      data: h,
      totalCount: u,
      needsClientProcessing: !0,
      rawJson: a
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
  buildUrl(e, t, i) {
    const r = e.baseUrl || Hn, n = new URL(`${r}/data/${e.datasetId}`), a = t ?? (e.limit > 0 ? e.limit : Wn);
    n.searchParams.set("maxResult", String(a)), n.searchParams.set("totalCount", "TRUE"), i && i > 0 && n.searchParams.set("page", String(i));
    const o = e.where || e.filter;
    return o && this._applyDimensionFilters(n, o), n.toString();
  }
  /**
   * Build a server-side URL for a single page.
   */
  buildServerSideUrl(e, t) {
    const i = e.baseUrl || Hn, r = new URL(`${i}/data/${e.datasetId}`);
    return r.searchParams.set("maxResult", String(e.pageSize)), r.searchParams.set("totalCount", "TRUE"), r.searchParams.set("page", String(t.page)), t.effectiveWhere && this._applyDimensionFilters(r, t.effectiveWhere), r.toString();
  }
  getDefaultSearchTemplate() {
    return null;
  }
  getProviderConfig() {
    return Ls;
  }
  buildFacetWhere(e, t) {
    const i = [];
    for (const [r, n] of Object.entries(e))
      r === t || n.size === 0 || (n.size === 1 ? i.push(`${r}:eq:${[...n][0]}`) : i.push(`${r}:in:${[...n].join("|")}`));
    return i.join(", ");
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
  _flattenObservations(e) {
    return e.map((t) => {
      const i = t, r = {}, n = i.dimensions;
      if (n)
        for (const [h, u] of Object.entries(n))
          r[h] = u;
      const a = i.measures;
      if (a)
        for (const [h, u] of Object.entries(a)) {
          const c = u;
          if (c && "value" in c) {
            const d = h.replace(/_NIVEAU$/, "");
            r[d] = c.value;
          }
        }
      const o = i.attributes;
      if (o)
        for (const [h, u] of Object.entries(o))
          r[h] = u;
      return r;
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
  _applyDimensionFilters(e, t) {
    const i = t.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const n = r.split(":");
      if (n.length < 3) {
        n.length === 2 && e.searchParams.append(n[0], n[1]);
        continue;
      }
      const [a, o, ...h] = n, u = h.join(":");
      switch (o) {
        case "eq":
          e.searchParams.append(a, u);
          break;
        case "in": {
          const c = u.split("|");
          for (const d of c)
            e.searchParams.append(a, d);
          break;
        }
      }
    }
  }
};
l(bn, "InseeAdapter");
let Er = bn;
const zs = /* @__PURE__ */ new Map([
  ["generic", new $r()],
  ["opendatasoft", new Ar()],
  ["tabular", new Cr()],
  ["grist", new Pr()],
  ["insee", new Er()]
]);
function ro(s) {
  const e = zs.get(s);
  if (!e)
    throw new Error(`Type d'API non supporte: ${s}`);
  return e;
}
l(ro, "getAdapter");
function bl(s) {
  zs.set(s.type, s);
}
l(bl, "registerAdapter");
const be = {
  LOADED: "gouv-data-loaded",
  ERROR: "gouv-data-error",
  LOADING: "gouv-data-loading",
  SOURCE_COMMAND: "gouv-source-command"
}, Zr = /* @__PURE__ */ new Map(), Xr = /* @__PURE__ */ new Map();
function no(s, e) {
  Zr.set(s, e);
}
l(no, "setDataCache");
function tt(s) {
  return Zr.get(s);
}
l(tt, "getDataCache");
function ui(s) {
  Zr.delete(s);
}
l(ui, "clearDataCache");
function Ze(s, e) {
  Xr.set(s, e);
}
l(Ze, "setDataMeta");
function it(s) {
  return Xr.get(s);
}
l(it, "getDataMeta");
function en(s) {
  Xr.delete(s);
}
l(en, "clearDataMeta");
function ve(s, e) {
  no(s, e);
  const t = new CustomEvent(be.LOADED, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, data: e }
  });
  document.dispatchEvent(t);
}
l(ve, "dispatchDataLoaded");
function Ue(s, e) {
  const t = new CustomEvent(be.ERROR, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, error: e }
  });
  document.dispatchEvent(t);
}
l(Ue, "dispatchDataError");
function Ge(s) {
  const e = new CustomEvent(be.LOADING, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s }
  });
  document.dispatchEvent(e);
}
l(Ge, "dispatchDataLoading");
function $e(s, e) {
  const t = new CustomEvent(be.SOURCE_COMMAND, {
    bubbles: !0,
    composed: !0,
    detail: { sourceId: s, ...e }
  });
  document.dispatchEvent(t);
}
l($e, "dispatchSourceCommand");
function Wi(s, e) {
  const t = /* @__PURE__ */ l((i) => {
    const r = i;
    if (r.detail.sourceId === s) {
      const { sourceId: n, ...a } = r.detail;
      e(a);
    }
  }, "handler");
  return document.addEventListener(be.SOURCE_COMMAND, t), () => document.removeEventListener(be.SOURCE_COMMAND, t);
}
l(Wi, "subscribeToSourceCommands");
function di(s, e) {
  const t = /* @__PURE__ */ l((n) => {
    const a = n;
    a.detail.sourceId === s && e.onLoaded && e.onLoaded(a.detail.data);
  }, "handleLoaded"), i = /* @__PURE__ */ l((n) => {
    const a = n;
    a.detail.sourceId === s && e.onError && e.onError(a.detail.error);
  }, "handleError"), r = /* @__PURE__ */ l((n) => {
    n.detail.sourceId === s && e.onLoading && e.onLoading();
  }, "handleLoading");
  return document.addEventListener(be.LOADED, t), document.addEventListener(be.ERROR, i), document.addEventListener(be.LOADING, r), () => {
    document.removeEventListener(be.LOADED, t), document.removeEventListener(be.ERROR, i), document.removeEventListener(be.LOADING, r);
  };
}
l(di, "subscribeToSource");
var I = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, ht;
let B = (ht = class extends U {
  constructor() {
    super(...arguments), this.url = "", this.method = "GET", this.headers = "", this.params = "", this.refresh = 0, this.transform = "", this.paginate = !1, this.pageSize = 20, this.cacheTtl = 3600, this.useProxy = !1, this.data = "", this.apiType = "generic", this.baseUrl = "", this.datasetId = "", this.resource = "", this.where = "", this.select = "", this.groupBy = "", this.aggregate = "", this.orderBy = "", this.serverSide = !1, this.limit = 0, this._loading = !1, this._error = null, this._data = null, this._currentPage = 1, this._refreshInterval = null, this._abortController = null, this._unsubscribeCommands = null, this._whereOverlays = /* @__PURE__ */ new Map(), this._orderByOverlay = "", this._groupByOverlay = "", this._aggregateOverlay = "", this._adapter = null;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return _``;
  }
  connectedCallback() {
    super.connectedCallback(), Pe("gouv-source", this._isAdapterMode() ? this.apiType : void 0), this._setupRefresh(), this._setupCommandListener();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanup(), this.id && (ui(this.id), en(this.id));
  }
  updated(e) {
    if (e.has("data") && this.data) {
      this._dispatchInlineData();
      return;
    }
    const t = e.has("url") || e.has("params") || e.has("transform"), i = e.has("apiType") || e.has("baseUrl") || e.has("datasetId") || e.has("resource") || e.has("where") || e.has("select") || e.has("groupBy") || e.has("aggregate") || e.has("orderBy") || e.has("limit");
    (t || i) && ((this.paginate || this.serverSide) && (e.has("url") || e.has("params") || i) && (this._currentPage = 1), e.has("apiType") && (this._adapter = null), this._fetchData()), e.has("refresh") && this._setupRefresh(), (e.has("paginate") || e.has("pageSize") || e.has("serverSide") || e.has("apiType")) && this._setupCommandListener();
  }
  // --- Public API ---
  /** Returns the adapter for this source (if in adapter mode) */
  getAdapter() {
    return this._isAdapterMode() ? (this._adapter || (this._adapter = ro(this.apiType)), this._adapter) : null;
  }
  /** Returns the effective WHERE clause (static + all dynamic overlays merged) */
  getEffectiveWhere(e) {
    const t = [];
    this.where && t.push(this.where);
    for (const [n, a] of this._whereOverlays)
      n !== e && a && t.push(a);
    const i = this.getAdapter(), r = (i == null ? void 0 : i.capabilities.whereFormat) === "odsql" ? " AND " : ", ";
    return t.join(r);
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
      const e = JSON.parse(this.data);
      this._data = e, ve(this.id, this._data);
    } catch (e) {
      this._error = new Error("Donnees inline invalides (JSON attendu)"), Ue(this.id, this._error), console.error(`gouv-source[${this.id}]: JSON invalide dans data`, e);
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
    this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), !(!this.id || !(this.paginate || this.serverSide || this._isAdapterMode())) && (this._unsubscribeCommands = Wi(this.id, (t) => {
      let i = !1;
      if (t.page !== void 0 && t.page !== this._currentPage && (this._currentPage = t.page, i = !0), t.where !== void 0) {
        const r = t.whereKey || "__default";
        t.where ? this._whereOverlays.set(r, t.where) : this._whereOverlays.delete(r), this._currentPage = 1, i = !0;
      }
      t.orderBy !== void 0 && t.orderBy !== this._orderByOverlay && (this._orderByOverlay = t.orderBy, i = !0), t.groupBy !== void 0 && t.groupBy !== this._groupByOverlay && (this._groupByOverlay = t.groupBy, i = !0), t.aggregate !== void 0 && t.aggregate !== this._aggregateOverlay && (this._aggregateOverlay = t.aggregate, i = !0), i && this._fetchData();
    }));
  }
  async _fetchData() {
    return this._isAdapterMode() ? this._fetchViaAdapter() : this._fetchViaUrl();
  }
  // --- URL mode (legacy, unchanged behavior) ---
  async _fetchViaUrl() {
    var e, t;
    if (this.url) {
      if (!this.id) {
        console.warn('gouv-source: attribut "id" requis pour identifier la source');
        return;
      }
      this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, Ge(this.id);
      try {
        const i = this._buildUrl();
        let r = qa(i);
        const n = this._buildFetchOptions();
        if (this.useProxy && r === i) {
          const h = Ga(r, n.headers);
          r = h.url, n.headers = h.headers;
        }
        const a = await fetch(r, {
          ...n,
          signal: this._abortController.signal
        });
        if (!a.ok)
          throw new Error(`HTTP ${a.status}: ${a.statusText}`);
        let o;
        try {
          o = await a.json();
        } catch {
          const h = ((t = (e = a.headers) == null ? void 0 : e.get) == null ? void 0 : t.call(e, "content-type")) || "unknown";
          throw new Error(`Reponse non-JSON (content-type: ${h}) — verifiez l'URL ou la configuration du proxy`);
        }
        this.paginate && o.meta && Ze(this.id, {
          page: o.meta.page ?? this._currentPage,
          pageSize: o.meta.page_size ?? this.pageSize,
          total: o.meta.total ?? 0
        }), this.transform ? this._data = K(o, this.transform) : this.paginate && o.data && !this.transform ? this._data = o.data : this._data = o, ve(this.id, this._data), this.cacheTtl > 0 && mi() && this._putCache(this._data).catch(() => {
        });
      } catch (i) {
        if (i.name === "AbortError")
          return;
        if (this.cacheTtl > 0 && mi()) {
          const r = await this._getCache();
          if (r) {
            this._data = r, ve(this.id, this._data), this.dispatchEvent(new CustomEvent("cache-fallback", { detail: { sourceId: this.id } }));
            return;
          }
        }
        this._error = i, Ue(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, i);
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
    const e = this.getAdapter();
    if (!e) {
      console.warn(`gouv-source[${this.id}]: adapter introuvable pour api-type="${this.apiType}"`);
      return;
    }
    const t = this._getAdapterParams(), i = e.validate(t);
    if (i) {
      console.warn(`gouv-source[${this.id}]: ${i}`);
      return;
    }
    this._abortController && this._abortController.abort(), this._abortController = new AbortController(), this._loading = !0, this._error = null, Ge(this.id);
    try {
      let r;
      if (this.serverSide) {
        const n = {
          page: this._currentPage,
          effectiveWhere: this.getEffectiveWhere(),
          orderBy: this._orderByOverlay || this.orderBy
        };
        r = await e.fetchPage(t, n, this._abortController.signal), Ze(this.id, {
          page: this._currentPage,
          pageSize: this.pageSize,
          total: r.totalCount,
          needsClientProcessing: r.needsClientProcessing
        });
      } else
        r = await e.fetchAll(t, this._abortController.signal), Ze(this.id, {
          page: 1,
          pageSize: 0,
          total: r.totalCount,
          needsClientProcessing: r.needsClientProcessing
        });
      this._data = r.data, ve(this.id, this._data), this.cacheTtl > 0 && mi() && this._putCache(this._data).catch(() => {
      });
    } catch (r) {
      if (r.name === "AbortError")
        return;
      if (this.cacheTtl > 0 && mi()) {
        const n = await this._getCache();
        if (n) {
          this._data = n, ve(this.id, this._data), this.dispatchEvent(new CustomEvent("cache-fallback", { detail: { sourceId: this.id } }));
          return;
        }
      }
      this._error = r, Ue(this.id, this._error), console.error(`gouv-source[${this.id}]: Erreur de chargement`, r);
    } finally {
      this._loading = !1;
    }
  }
  _getAdapterParams() {
    let e;
    if (this.headers)
      try {
        e = JSON.parse(this.headers);
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
      headers: e
    };
  }
  // --- URL building (legacy mode) ---
  _buildUrl() {
    const e = window.location.origin !== "null" ? window.location.origin : void 0, t = new URL(this.url, e);
    if (this.params && this.method === "GET")
      try {
        const i = JSON.parse(this.params);
        Object.entries(i).forEach(([r, n]) => {
          t.searchParams.set(r, String(n));
        });
      } catch (i) {
        console.warn("gouv-source: params invalides (JSON attendu)", i);
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
  // --- Server cache (DB mode) ---
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
}, l(ht, "GouvSource"), ht);
I([
  g({ type: String })
], B.prototype, "url", void 0);
I([
  g({ type: String })
], B.prototype, "method", void 0);
I([
  g({ type: String })
], B.prototype, "headers", void 0);
I([
  g({ type: String })
], B.prototype, "params", void 0);
I([
  g({ type: Number })
], B.prototype, "refresh", void 0);
I([
  g({ type: String })
], B.prototype, "transform", void 0);
I([
  g({ type: Boolean })
], B.prototype, "paginate", void 0);
I([
  g({ type: Number, attribute: "page-size" })
], B.prototype, "pageSize", void 0);
I([
  g({ type: Number, attribute: "cache-ttl" })
], B.prototype, "cacheTtl", void 0);
I([
  g({ type: Boolean, attribute: "use-proxy" })
], B.prototype, "useProxy", void 0);
I([
  g({ type: String })
], B.prototype, "data", void 0);
I([
  g({ type: String, attribute: "api-type" })
], B.prototype, "apiType", void 0);
I([
  g({ type: String, attribute: "base-url" })
], B.prototype, "baseUrl", void 0);
I([
  g({ type: String, attribute: "dataset-id" })
], B.prototype, "datasetId", void 0);
I([
  g({ type: String })
], B.prototype, "resource", void 0);
I([
  g({ type: String })
], B.prototype, "where", void 0);
I([
  g({ type: String })
], B.prototype, "select", void 0);
I([
  g({ type: String, attribute: "group-by" })
], B.prototype, "groupBy", void 0);
I([
  g({ type: String })
], B.prototype, "aggregate", void 0);
I([
  g({ type: String, attribute: "order-by" })
], B.prototype, "orderBy", void 0);
I([
  g({ type: Boolean, attribute: "server-side" })
], B.prototype, "serverSide", void 0);
I([
  g({ type: Number })
], B.prototype, "limit", void 0);
I([
  $()
], B.prototype, "_loading", void 0);
I([
  $()
], B.prototype, "_error", void 0);
I([
  $()
], B.prototype, "_data", void 0);
B = I([
  X("gouv-source")
], B);
var oe = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, pt;
let se = (pt = class extends U {
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
    return _``;
  }
  connectedCallback() {
    super.connectedCallback(), Pe("gouv-query"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._clearServerDelegation(), this._cleanup(), this.id && (ui(this.id), en(this.id));
  }
  updated(e) {
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
    ].some((i) => e.has(i)) && this._initialize(), e.has("refresh") && this._setupRefresh();
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
    var h;
    this._serverDelegated = { groupBy: !1, aggregate: !1, orderBy: !1 };
    const e = document.getElementById(this.source);
    if (!e || !("getAdapter" in e))
      return;
    const t = (h = e.getAdapter) == null ? void 0 : h.call(e);
    if (!(t != null && t.capabilities))
      return;
    const i = t.capabilities, r = e.groupBy || "", n = e.aggregate || "", a = {};
    this.groupBy && i.serverGroupBy && !r && !n && (a.groupBy = this.groupBy, this._serverDelegated.groupBy = !0, this.aggregate && (a.aggregate = this.aggregate, this._serverDelegated.aggregate = !0));
    const o = e.orderBy || "";
    this.orderBy && i.serverOrderBy && !o && (a.orderBy = this.orderBy, this._serverDelegated.orderBy = !0), Object.keys(a).length > 0 && $e(this.source, a);
  }
  /**
   * Clear server-side overlays on gouv-source (disconnect cleanup).
   * Sends empty values so gouv-source reverts to its own attributes.
   */
  _clearServerDelegation() {
    if (!this.source || !this._hasServerDelegation())
      return;
    const e = {};
    this._serverDelegated.groupBy && (e.groupBy = ""), this._serverDelegated.aggregate && (e.aggregate = ""), this._serverDelegated.orderBy && (e.orderBy = ""), Object.keys(e).length > 0 && $e(this.source, e), this._serverDelegated = { groupBy: !1, aggregate: !1, orderBy: !1 };
  }
  /**
   * Returns true if we delegated any operation server-side.
   */
  _hasServerDelegation() {
    return this._serverDelegated.groupBy || this._serverDelegated.aggregate || this._serverDelegated.orderBy;
  }
  // --- Source subscription ---
  _subscribeToSourceData(e) {
    if (!this._hasServerDelegation()) {
      const t = tt(e);
      t !== void 0 && (this._rawData = Array.isArray(t) ? t : [t], this._handleSourceData());
    }
    this._unsubscribe = di(e, {
      onLoaded: /* @__PURE__ */ l((t) => {
        this._rawData = Array.isArray(t) ? t : [t], this._handleSourceData();
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ l(() => {
        this._loading = !0, Ge(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ l((t) => {
        this._error = t, this._loading = !1, Ue(this.id, t);
      }, "onError")
    });
  }
  /**
   * Handle data received from upstream source.
   */
  _handleSourceData() {
    try {
      Ge(this.id), this._loading = !0, this._processClientSide();
    } catch (e) {
      this._error = e, Ue(this.id, this._error), console.error(`gouv-query[${this.id}]: Erreur de traitement`, e);
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
    let e = [...this._rawData];
    const t = it(this.source), i = (t == null ? void 0 : t.needsClientProcessing) === !0, r = this.filter || this.where;
    r && (e = this._applyFilters(e, r)), this.groupBy && (!this._serverDelegated.groupBy || i) && (e = this._applyGroupByAndAggregate(e)), this.orderBy && (!this._serverDelegated.orderBy || i) && (e = this._applySort(e)), this.limit > 0 && (e = e.slice(0, this.limit)), this._data = e, ve(this.id, this._data);
  }
  /**
   * Parse et applique les filtres (format: "field:operator:value")
   */
  _applyFilters(e, t) {
    const i = this._parseFilters(t);
    return e.filter((r) => i.every((n) => this._matchesFilter(r, n)));
  }
  _parseFilters(e) {
    const t = [], i = e.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const n = r.split(":");
      if (n.length >= 2) {
        const a = n[0], o = n[1];
        let h;
        if (n.length > 2) {
          const u = n.slice(2).join(":");
          o === "in" || o === "notin" ? h = u.split("|").map((c) => {
            const d = this._parseValue(c);
            return typeof d == "boolean" ? String(d) : d;
          }) : h = this._parseValue(u);
        }
        t.push({ field: a, operator: o, value: h });
      }
    }
    return t;
  }
  _parseValue(e) {
    return e === "true" ? !0 : e === "false" ? !1 : !isNaN(Number(e)) && e !== "" ? Number(e) : e;
  }
  _matchesFilter(e, t) {
    const i = K(e, t.field);
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
   * Applique le GROUP BY et les agregations
   */
  _applyGroupByAndAggregate(e) {
    const t = this.groupBy.split(",").map((a) => a.trim()).filter(Boolean), i = this._parseAggregates(this.aggregate), r = /* @__PURE__ */ new Map();
    for (const a of e) {
      const o = t.map((h) => String(K(a, h) ?? "")).join("|||");
      r.has(o) || r.set(o, []), r.get(o).push(a);
    }
    const n = [];
    for (const [a, o] of r) {
      const h = {}, u = a.split("|||");
      t.forEach((c, d) => {
        On(h, c, u[d]);
      });
      for (const c of i) {
        const d = c.alias || `${c.field}__${c.function}`;
        On(h, d, this._computeAggregate(o, c));
      }
      n.push(h);
    }
    return n;
  }
  _parseAggregates(e) {
    if (!e)
      return [];
    const t = [], i = e.split(",").map((r) => r.trim()).filter(Boolean);
    for (const r of i) {
      const n = r.split(":");
      n.length >= 2 && t.push({
        field: n[0],
        function: n[1],
        alias: n[2]
      });
    }
    return t;
  }
  _computeAggregate(e, t) {
    const i = e.map((r) => Number(K(r, t.field))).filter((r) => !isNaN(r));
    switch (t.function) {
      case "count":
        return e.length;
      case "sum":
        return i.reduce((r, n) => r + n, 0);
      case "avg":
        return i.length > 0 ? i.reduce((r, n) => r + n, 0) / i.length : 0;
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
    return [...e].sort((n, a) => {
      const o = K(n, i), h = K(a, i), u = Number(o), c = Number(h);
      if (!isNaN(u) && !isNaN(c))
        return r === "desc" ? c - u : u - c;
      const d = String(o ?? ""), p = String(h ?? "");
      return r === "desc" ? p.localeCompare(d) : d.localeCompare(p);
    });
  }
  // --- Command forwarding ---
  /**
   * Forward commands from downstream components to the upstream source.
   * In server-side mode, datalist/search/facets send commands to this query;
   * we forward them to the actual gouv-source.
   */
  _setupCommandForwarding() {
    this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), !(!this.id || !this.serverSide) && this.source && (this._unsubscribeCommands = Wi(this.id, (e) => {
      $e(this.source, e);
    }));
  }
  // --- Public API ---
  /**
   * Retourne le where effectif complet (statique + dynamique).
   * Delegue a la source amont si disponible.
   */
  getEffectiveWhere(e) {
    if (this.source) {
      const t = document.getElementById(this.source);
      if (t && "getEffectiveWhere" in t)
        return t.getEffectiveWhere(e);
    }
    return this.where || this.filter || "";
  }
  /**
   * Retourne l'adapter courant (delegue a la source amont)
   */
  getAdapter() {
    if (this.source) {
      const e = document.getElementById(this.source);
      if (e && "getAdapter" in e)
        return e.getAdapter();
    }
    return null;
  }
  /**
   * Force le rechargement des donnees
   */
  reload() {
    if (this.source) {
      const e = tt(this.source);
      e !== void 0 && (this._rawData = Array.isArray(e) ? e : [e], this._handleSourceData());
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
}, l(pt, "GouvQuery"), pt);
oe([
  g({ type: String })
], se.prototype, "source", void 0);
oe([
  g({ type: String })
], se.prototype, "where", void 0);
oe([
  g({ type: String })
], se.prototype, "filter", void 0);
oe([
  g({ type: String, attribute: "group-by" })
], se.prototype, "groupBy", void 0);
oe([
  g({ type: String })
], se.prototype, "aggregate", void 0);
oe([
  g({ type: String, attribute: "order-by" })
], se.prototype, "orderBy", void 0);
oe([
  g({ type: Number })
], se.prototype, "limit", void 0);
oe([
  g({ type: String })
], se.prototype, "transform", void 0);
oe([
  g({ type: Boolean, attribute: "server-side" })
], se.prototype, "serverSide", void 0);
oe([
  g({ type: Number, attribute: "page-size" })
], se.prototype, "pageSize", void 0);
oe([
  g({ type: Number })
], se.prototype, "refresh", void 0);
oe([
  $()
], se.prototype, "_loading", void 0);
oe([
  $()
], se.prototype, "_error", void 0);
oe([
  $()
], se.prototype, "_data", void 0);
oe([
  $()
], se.prototype, "_rawData", void 0);
se = oe([
  X("gouv-query")
], se);
var Ee = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, ft;
let ge = (ft = class extends U {
  constructor() {
    super(...arguments), this.source = "", this.numeric = "", this.numericAuto = !1, this.rename = "", this.trim = !1, this.stripHtml = !1, this.replace = "", this.replaceFields = "", this.flatten = "", this.round = "", this.lowercaseKeys = !1, this._unsubscribe = null, this._unsubscribePageRequests = null;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return _``;
  }
  connectedCallback() {
    super.connectedCallback(), Pe("gouv-normalize"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null), this.id && (ui(this.id), en(this.id));
  }
  updated(e) {
    if (super.updated(e), e.has("source")) {
      this._initialize();
      return;
    }
    if (["flatten", "numeric", "numericAuto", "round", "rename", "trim", "stripHtml", "replace", "replaceFields", "lowercaseKeys"].some((r) => e.has(r))) {
      const r = this.source ? tt(this.source) : void 0;
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
    this._unsubscribe && this._unsubscribe(), this._unsubscribePageRequests && (this._unsubscribePageRequests(), this._unsubscribePageRequests = null);
    const e = tt(this.source);
    e !== void 0 && this._processData(e), this._unsubscribe = di(this.source, {
      onLoaded: /* @__PURE__ */ l((t) => {
        this._processData(t);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ l(() => {
        Ge(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ l((t) => {
        Ue(this.id, t);
      }, "onError")
    }), this._unsubscribePageRequests = Wi(this.id, (t) => {
      $e(this.source, t);
    });
  }
  _processData(e) {
    try {
      Ge(this.id);
      let t = Array.isArray(e) ? e : [e];
      this.flatten && (t = t.map((c) => c == null || typeof c != "object" || Array.isArray(c) ? c : this._flattenRow(c, this.flatten)));
      const i = this._parseNumericFields(), r = this._parseRoundFields(), n = this._parsePipeMap(this.rename), a = this._parsePipeMap(this.replace), o = this._parseReplaceFields(this.replaceFields), h = t.map((c) => c == null || typeof c != "object" ? c : this._normalizeRow(c, i, r, n, a, o));
      ve(this.id, h);
      const u = it(this.source);
      u && Ze(this.id, u);
    } catch (t) {
      Ue(this.id, t), console.error(`gouv-normalize[${this.id}]: Erreur de normalisation`, t);
    }
  }
  _normalizeRow(e, t, i, r, n, a) {
    const o = {};
    for (const [h, u] of Object.entries(e)) {
      const c = this.trim ? h.trim() : h;
      let d = u;
      if (this.trim && typeof d == "string" && (d = d.trim()), this.stripHtml && typeof d == "string" && (d = d.replace(/<[^>]*>/g, "")), a.size > 0 && typeof d == "string") {
        const m = a.get(c);
        if (m) {
          for (const [y, b] of m)
            if (d === y) {
              d = b;
              break;
            }
        }
      }
      if (n.size > 0 && typeof d == "string") {
        for (const [m, y] of n)
          if (d === m) {
            d = y;
            break;
          }
      }
      if (t.has(c))
        d = Dn(d);
      else if (this.numericAuto && typeof d == "string" && Ba(d)) {
        const m = Dn(d, !0);
        m !== null && (d = m);
      }
      if (i.has(c) && typeof d == "number" && isFinite(d)) {
        const m = i.get(c);
        if (m === 0)
          d = Math.round(d);
        else {
          const y = 10 ** m;
          d = Math.round(d * y) / y;
        }
      }
      const p = r.get(c) ?? c, f = this.lowercaseKeys ? p.toLowerCase() : p;
      o[f] = d;
    }
    return o;
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
  /** Parse l'attribut round en Map<champ, decimales>. Format: "champ1, champ2" (0 decimales) ou "champ1:2, champ2:1" */
  _parseRoundFields() {
    const e = /* @__PURE__ */ new Map();
    if (!this.round)
      return e;
    for (const t of this.round.split(",")) {
      const i = t.trim();
      if (!i)
        continue;
      const r = i.indexOf(":");
      if (r === -1)
        e.set(i, 0);
      else {
        const n = i.substring(0, r).trim(), a = parseInt(i.substring(r + 1).trim(), 10);
        n && e.set(n, isNaN(a) ? 0 : a);
      }
    }
    return e;
  }
  /** Parse l'attribut replace-fields en Map<champ, Map<pattern, remplacement>> */
  _parseReplaceFields(e) {
    const t = /* @__PURE__ */ new Map();
    if (!e)
      return t;
    const i = e.split("|");
    for (const r of i) {
      const n = r.trim(), a = n.indexOf(":");
      if (a === -1)
        continue;
      const o = n.indexOf(":", a + 1);
      if (o === -1)
        continue;
      const h = n.substring(0, a).trim(), u = n.substring(a + 1, o).trim(), c = n.substring(o + 1).trim();
      !h || !u || (t.has(h) || t.set(h, /* @__PURE__ */ new Map()), t.get(h).set(u, c));
    }
    return t;
  }
  /** Parse un attribut pipe-separe en Map cle:valeur */
  _parsePipeMap(e) {
    const t = /* @__PURE__ */ new Map();
    if (!e)
      return t;
    const i = e.split("|");
    for (const r of i) {
      const n = r.indexOf(":");
      if (n === -1)
        continue;
      const a = r.substring(0, n).trim(), o = r.substring(n + 1).trim();
      a && t.set(a, o);
    }
    return t;
  }
}, l(ft, "GouvNormalize"), ft);
Ee([
  g({ type: String })
], ge.prototype, "source", void 0);
Ee([
  g({ type: String })
], ge.prototype, "numeric", void 0);
Ee([
  g({ type: Boolean, attribute: "numeric-auto" })
], ge.prototype, "numericAuto", void 0);
Ee([
  g({ type: String })
], ge.prototype, "rename", void 0);
Ee([
  g({ type: Boolean })
], ge.prototype, "trim", void 0);
Ee([
  g({ type: Boolean, attribute: "strip-html" })
], ge.prototype, "stripHtml", void 0);
Ee([
  g({ type: String })
], ge.prototype, "replace", void 0);
Ee([
  g({ type: String, attribute: "replace-fields" })
], ge.prototype, "replaceFields", void 0);
Ee([
  g({ type: String })
], ge.prototype, "flatten", void 0);
Ee([
  g({ type: String })
], ge.prototype, "round", void 0);
Ee([
  g({ type: Boolean, attribute: "lowercase-keys" })
], ge.prototype, "lowercaseKeys", void 0);
ge = Ee([
  X("gouv-normalize")
], ge);
var G = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, gt;
let z = (gt = class extends U {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.labels = "", this.maxValues = 6, this.disjunctive = "", this.sort = "count", this.searchable = "", this.hideEmpty = !1, this.display = "", this.urlParams = !1, this.urlParamMap = "", this.urlSync = !1, this.serverFacets = !1, this.staticValues = "", this.hideCounts = !1, this.cols = "", this._rawData = [], this._facetGroups = [], this._activeSelections = {}, this._expandedFacets = /* @__PURE__ */ new Set(), this._searchQueries = {}, this._openMultiselectField = null, this._liveAnnouncement = "", this._unsubscribe = null, this._unsubscribeCommands = null, this._popstateHandler = null, this._urlParamsApplied = !1, this._onClickOutsideMultiselect = (e) => {
      if (!this._openMultiselectField)
        return;
      const t = e.target, i = this.querySelector(`[data-multiselect="${this._openMultiselectField}"]`);
      i && !i.contains(t) && (this._openMultiselectField = null, this._setBackgroundInert(!1));
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
    super.connectedCallback(), Pe("gouv-facets"), this._initialize(), document.addEventListener("click", this._onClickOutsideMultiselect), this.urlSync && (this._popstateHandler = () => {
      this._applyUrlParams(), this._buildFacetGroups(), this._applyFilters();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._setBackgroundInert(!1), document.removeEventListener("click", this._onClickOutsideMultiselect), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this._unsubscribeCommands && (this._unsubscribeCommands(), this._unsubscribeCommands = null), this.id && ui(this.id);
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
    ["fields", "labels", "sort", "hideEmpty", "maxValues", "disjunctive", "searchable", "display", "cols"].some((r) => e.has(r)) && this._rawData.length > 0 && (this.serverFacets ? this._fetchServerFacets() : this.staticValues ? this._buildStaticFacetGroups() : (this._buildFacetGroups(), this._applyFilters()));
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
    const t = tt(this.source);
    t !== void 0 && this._onData(t), this._unsubscribe = di(this.source, {
      onLoaded: /* @__PURE__ */ l((i) => {
        this._onData(i);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ l(() => {
        Ge(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ l((i) => {
        Ue(this.id, i);
      }, "onError")
    }), this._unsubscribeCommands && this._unsubscribeCommands(), this._unsubscribeCommands = Wi(this.id, (i) => {
      $e(this.source, i);
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
        const i = it(this.source);
        i && Ze(this.id, i), ve(this.id, this._rawData);
      }
    } else if (this.staticValues) {
      if (this._buildStaticFacetGroups(), this.id) {
        const i = it(this.source);
        i && Ze(this.id, i), ve(this.id, this._rawData);
      }
    } else
      this._buildFacetGroups(), this._applyFilters();
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
  /**
   * Build facet groups from static-values attribute (pre-computed values).
   * Values are displayed without counts (count=0, hidden via hideCounts).
   */
  _buildStaticFacetGroups() {
    if (this.staticValues)
      try {
        const e = JSON.parse(this.staticValues), t = this._parseLabels(), i = this.fields ? qt(this.fields) : Object.keys(e);
        this._facetGroups = i.filter((r) => e[r] && e[r].length > 0).map((r) => ({
          field: r,
          label: t.get(r) ?? r,
          values: e[r].map((n) => ({ value: n, count: 0 }))
        })).filter((r) => !(this.hideEmpty && r.values.length <= 1));
      } catch {
        console.warn("gouv-facets: static-values invalide (JSON attendu)");
      }
  }
  /**
   * Build facet WHERE clause, delegating to the upstream source's adapter.
   * Falls back to colon syntax if no adapter is available.
   */
  _buildFacetWhere(e) {
    var n;
    const t = document.getElementById(this.source), i = (n = t == null ? void 0 : t.getAdapter) == null ? void 0 : n.call(t);
    if (i != null && i.buildFacetWhere)
      return i.buildFacetWhere(this._activeSelections, e);
    const r = [];
    for (const [a, o] of Object.entries(this._activeSelections))
      a === e || o.size === 0 || (o.size === 1 ? r.push(`${a}:eq:${[...o][0]}`) : r.push(`${a}:in:${[...o].join("|")}`));
    return r.join(", ");
  }
  /** Resolve a possibly dotted field path on a row (e.g. "fields.Region") */
  _resolveValue(e, t) {
    if (!t.includes("."))
      return e[t];
    const i = t.split(".");
    let r = e;
    for (const n of i) {
      if (r == null || typeof r != "object")
        return;
      r = r[n];
    }
    return r;
  }
  /** Get fields to use as facets — explicit or auto-detected */
  _getFields() {
    return this.fields ? qt(this.fields) : this._autoDetectFields();
  }
  /** Auto-detect categorical fields: string type, 2-50 unique values, not all unique (ID-like) */
  _autoDetectFields() {
    if (this._rawData.length === 0)
      return [];
    const e = [], t = this._rawData[0];
    for (const i of Object.keys(t)) {
      const r = /* @__PURE__ */ new Set();
      let n = !0;
      for (const a of this._rawData) {
        const o = a[i];
        if (!(o == null || o === "")) {
          if (typeof o != "string") {
            n = !1;
            break;
          }
          if (r.add(o), r.size > 50)
            break;
        }
      }
      n && (r.size <= 1 || r.size > 50 || r.size !== this._rawData.length && e.push(i));
    }
    return e;
  }
  /** Compute facet values with counts, applying cross-facet filtering for dynamic counts */
  _computeFacetValues(e) {
    const t = this._getDataFilteredExcluding(e), i = /* @__PURE__ */ new Map();
    for (const n of t) {
      const a = this._resolveValue(n, e);
      if (a == null || a === "")
        continue;
      const o = String(a);
      i.set(o, (i.get(o) ?? 0) + 1);
    }
    const r = [];
    for (const [n, a] of i)
      r.push({ value: n, count: a });
    return this._sortValues(r);
  }
  /** Filter data by all active selections EXCEPT the given field */
  _getDataFilteredExcluding(e) {
    const t = Object.keys(this._activeSelections).filter((i) => i !== e && this._activeSelections[i].size > 0);
    return t.length === 0 ? this._rawData : this._rawData.filter((i) => t.every((r) => {
      const n = this._activeSelections[r], a = this._resolveValue(i, r);
      return a == null ? !1 : n.has(String(a));
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
  // --- Server-facets ---
  /** Check if there are any active selections */
  _hasActiveSelections() {
    return Object.keys(this._activeSelections).some((e) => this._activeSelections[e].size > 0);
  }
  /** Fetch facet values from server API with cross-facet counts */
  async _fetchServerFacets() {
    var d, p;
    const e = document.getElementById(this.source);
    if (!e)
      return;
    const t = (d = e.getAdapter) == null ? void 0 : d.call(e);
    if (!(t != null && t.capabilities.serverFacets) || !t.fetchFacets) {
      this._buildFacetGroups(), this._applyFilters();
      return;
    }
    const i = e.baseUrl || e.getAttribute("base-url") || "", r = e.datasetId || e.getAttribute("dataset-id") || "";
    if (!r)
      return;
    let n;
    const a = e.headers || e.getAttribute("headers") || "";
    if (a)
      try {
        n = JSON.parse(a);
      } catch {
      }
    const o = qt(this.fields);
    if (o.length === 0)
      return;
    const h = this._parseLabels(), u = /* @__PURE__ */ new Map();
    for (const f of o) {
      const m = ((p = e.getEffectiveWhere) == null ? void 0 : p.call(e, this.id)) || "", y = this._buildFacetWhere(f), b = [m, y].filter(Boolean).join(" AND ");
      u.has(b) || u.set(b, []), u.get(b).push(f);
    }
    const c = [];
    for (const [f, m] of u)
      try {
        const y = await t.fetchFacets({ baseUrl: i, datasetId: r, headers: n }, m, f);
        for (const b of y)
          c.push({
            field: b.field,
            label: h.get(b.field) ?? b.field,
            values: this._sortValues(b.values)
          });
      } catch {
      }
    this._facetGroups = o.map((f) => c.find((m) => m.field === f)).filter((f) => !!f).filter((f) => !(this.hideEmpty && f.values.length <= 1));
  }
  /** Dispatch facet where command to upstream gouv-query */
  _dispatchFacetCommand() {
    const e = this._buildFacetWhere();
    $e(this.source, { where: e, whereKey: this.id });
  }
  // --- Filtering ---
  _applyFilters() {
    const e = Object.keys(this._activeSelections).filter((i) => this._activeSelections[i].size > 0);
    let t;
    e.length === 0 ? t = this._rawData : t = this._rawData.filter((i) => e.every((r) => {
      const n = this._activeSelections[r], a = this._resolveValue(i, r);
      return a == null ? !1 : n.has(String(a));
    })), ve(this.id, t);
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
      const n = i.substring(0, r).trim(), a = i.substring(r + 1).trim();
      n && e.set(n, a);
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
      const n = i.substring(0, r).trim(), a = i.substring(r + 1).trim();
      n && (a === "checkbox" || a === "select" || a === "multiselect" || a === "radio") && e.set(n, a);
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
    const t = /* @__PURE__ */ new Map(), i = e.split("|");
    for (const r of i) {
      const n = r.indexOf(":");
      if (n === -1)
        continue;
      const a = r.substring(0, n).trim(), o = parseInt(r.substring(n + 1).trim(), 10);
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
    const i = { ...this._activeSelections }, r = new Set(i[e] ?? []), n = this._getDisplayMode(e), a = qt(this.disjunctive), o = n === "multiselect" || n === "checkbox" && a.includes(e), h = r.has(t);
    if (h ? r.delete(t) : (o || r.clear(), r.add(t)), r.size === 0 ? delete i[e] : i[e] = r, this._activeSelections = i, this._afterSelectionChange(), n === "multiselect" || n === "radio" || n === "checkbox") {
      const u = h ? "deselectionnee" : "selectionnee";
      this._announce(`${t} ${u}, ${r.size} option${r.size > 1 ? "s" : ""} selectionnee${r.size > 1 ? "s" : ""}`);
    }
  }
  _handleSelectChange(e, t) {
    const r = t.target.value, n = { ...this._activeSelections };
    r ? n[e] = /* @__PURE__ */ new Set([r]) : delete n[e], this._activeSelections = n, this._afterSelectionChange();
  }
  _clearFieldSelections(e) {
    const t = { ...this._activeSelections };
    delete t[e], this._activeSelections = t, this._afterSelectionChange(), this._announce("Aucune option selectionnee");
  }
  _selectAllValues(e) {
    const t = this._facetGroups.find((r) => r.field === e);
    if (!t)
      return;
    const i = { ...this._activeSelections };
    i[e] = new Set(t.values.map((r) => r.value)), this._activeSelections = i, this._afterSelectionChange(), this._announce(`${t.values.length} options selectionnees`);
  }
  _toggleMultiselectDropdown(e) {
    this._openMultiselectField === e ? (this._openMultiselectField = null, this._setBackgroundInert(!1)) : (this._openMultiselectField = e, this._setBackgroundInert(!0), this.updateComplete.then(() => {
      const t = this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-panel`), i = t == null ? void 0 : t.querySelector("button, input, select, [tabindex]");
      i == null || i.focus();
      const r = this._facetGroups.find((n) => n.field === e);
      if (r) {
        const n = this._activeSelections[e] ?? /* @__PURE__ */ new Set();
        this._announce(`${r.label}, ${r.values.length} options disponibles, ${n.size} selectionnee${n.size > 1 ? "s" : ""}`);
      }
    }));
  }
  _announce(e) {
    this._liveAnnouncement = "", requestAnimationFrame(() => {
      this._liveAnnouncement = e;
    });
  }
  /**
   * Set or remove the `inert` attribute on background content when a dialog opens/closes.
   * This confines NVDA's virtual cursor to the dialog, preventing it from reading
   * page content behind the panel (complements aria-modal="true").
   */
  _setBackgroundInert(e) {
    const t = this.closest("gouv-facets") ?? this;
    document.querySelectorAll("body > *").forEach((i) => {
      i.contains(t) || (e ? i.setAttribute("inert", "") : i.removeAttribute("inert"));
    });
  }
  _handleMultiselectKeydown(e, t) {
    if (t.key === "Escape") {
      this._openMultiselectField = null, this._setBackgroundInert(!1);
      const i = this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-trigger`);
      i == null || i.focus();
      return;
    }
    if (t.key === "Tab") {
      const i = this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-panel`);
      if (!i)
        return;
      const r = [...i.querySelectorAll('button:not([tabindex="-1"]), input, select, [tabindex]:not([tabindex="-1"])')];
      if (r.length === 0)
        return;
      const n = r[0], a = r[r.length - 1];
      t.shiftKey && document.activeElement === n ? (t.preventDefault(), a.focus()) : !t.shiftKey && document.activeElement === a && (t.preventDefault(), n.focus());
      return;
    }
    if (t.key === "ArrowDown" || t.key === "ArrowUp" || t.key === "Home" || t.key === "End") {
      const i = this.querySelector(`[data-multiselect="${e}"] .gouv-facets__multiselect-panel`);
      if (!i)
        return;
      const r = [...i.querySelectorAll('input[type="checkbox"], input[type="radio"]')];
      if (r.length === 0)
        return;
      const n = r.indexOf(t.target);
      if (n === -1 && t.key !== "ArrowDown")
        return;
      t.preventDefault();
      let a;
      t.key === "ArrowDown" ? a = n === -1 ? 0 : Math.min(n + 1, r.length - 1) : t.key === "ArrowUp" ? a = Math.max(n - 1, 0) : t.key === "Home" ? a = 0 : a = r.length - 1, r[a].focus();
    }
  }
  _handleMultiselectFocusout(e, t) {
    if (this._openMultiselectField !== e)
      return;
    const i = t.relatedTarget;
    if (!i)
      return;
    const r = this.querySelector(`[data-multiselect="${e}"]`);
    r != null && r.contains(i) || (this._openMultiselectField = null, this._setBackgroundInert(!1));
  }
  _toggleExpand(e) {
    const t = new Set(this._expandedFacets);
    t.has(e) ? t.delete(e) : t.add(e), this._expandedFacets = t;
  }
  _handleSearch(e, t) {
    const i = t.target;
    this._searchQueries = { ...this._searchQueries, [e]: i.value }, this._searchDebounceTimer && clearTimeout(this._searchDebounceTimer), this._searchDebounceTimer = setTimeout(() => {
      const r = this._facetGroups.find((o) => o.field === e);
      if (!r)
        return;
      const n = i.value.toLowerCase(), a = n ? r.values.filter((o) => o.value.toLowerCase().includes(n)).length : r.values.length;
      this._announce(a === 0 ? "Aucune option trouvee" : `${a} option${a > 1 ? "s" : ""} disponible${a > 1 ? "s" : ""}`);
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
    const e = /* @__PURE__ */ new Map();
    if (!this.urlParamMap)
      return e;
    const t = this.urlParamMap.split("|");
    for (const i of t) {
      const r = i.indexOf(":");
      if (r === -1)
        continue;
      const n = i.substring(0, r).trim(), a = i.substring(r + 1).trim();
      n && a && e.set(n, a);
    }
    return e;
  }
  /** Read URL search params and apply as facet pre-selections */
  _applyUrlParams() {
    const e = new URLSearchParams(window.location.search), t = this._parseUrlParamMap(), i = {};
    for (const [r, n] of e.entries()) {
      const a = t.size > 0 ? t.get(r) ?? null : r;
      if (!a)
        continue;
      const o = n.split(",").map((h) => h.trim()).filter(Boolean);
      i[a] || (i[a] = /* @__PURE__ */ new Set());
      for (const h of o)
        i[a].add(h);
    }
    Object.keys(i).length > 0 && (this._activeSelections = i);
  }
  /** Sync current facet selections back to URL (replaceState) */
  _syncUrl() {
    const e = new URLSearchParams(), t = this._parseUrlParamMap(), i = /* @__PURE__ */ new Map();
    for (const [a, o] of t)
      i.set(o, a);
    for (const [a, o] of Object.entries(this._activeSelections)) {
      if (o.size === 0)
        continue;
      const h = i.get(a) ?? a;
      e.set(h, [...o].join(","));
    }
    const r = e.toString(), n = r ? `${window.location.pathname}?${r}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", n);
  }
  // --- Rendering ---
  render() {
    if (this._rawData.length === 0 || this._facetGroups.length === 0)
      return S;
    const e = Object.keys(this._activeSelections).some((i) => this._activeSelections[i].size > 0), t = !!this.cols;
    return _`
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
        ${e ? _`
          <div class="gouv-facets__header">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line" type="button" @click="${this._clearAll}">
              Reinitialiser les filtres
            </button>
          </div>
        ` : S}
        ${t ? _`
          <div class="fr-grid-row fr-grid-row--gutters">
            ${this._facetGroups.map((i) => _`
              <div class="${this._getColClass(i.field)}">
                ${this._renderFacetGroup(i)}
              </div>
            `)}
          </div>
        ` : _`
          <div class="gouv-facets__groups">
            ${this._facetGroups.map((i) => this._renderFacetGroup(i))}
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
    const i = qt(this.searchable).includes(e.field), r = (this._searchQueries[e.field] ?? "").toLowerCase(), n = this._expandedFacets.has(e.field), a = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set();
    let o = e.values;
    i && r && (o = o.filter((d) => d.value.toLowerCase().includes(r)));
    const h = n ? o : o.slice(0, this.maxValues), u = o.length > this.maxValues, c = `facet-${this.id}-${e.field}`;
    return _`
      <fieldset class="fr-fieldset gouv-facets__group" aria-labelledby="${c}-legend">
        <legend class="fr-fieldset__legend fr-text--bold" id="${c}-legend">${e.label}</legend>
        <div aria-live="polite" class="fr-sr-only">${this._liveAnnouncement}</div>
        ${i ? _`
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <input class="fr-input fr-input--sm" type="search"
                placeholder="Rechercher..."
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(d) => this._handleSearch(e.field, d)}"
                aria-label="Rechercher dans ${e.label}">
            </div>
          </div>
        ` : S}
        ${h.map((d) => {
      const p = `${c}-${d.value.replace(/[^a-zA-Z0-9]/g, "_")}`, f = a.has(d.value);
      return _`
            <div class="fr-fieldset__element">
              <div class="fr-checkbox-group fr-checkbox-group--sm">
                <input type="checkbox" id="${p}"
                  .checked="${f}"
                  @change="${() => this._toggleValue(e.field, d.value)}">
                <label class="fr-label" for="${p}">
                  ${d.value}${this._effectiveHideCounts ? S : _`<span class="gouv-facets__count" aria-hidden="true">${d.count}</span><span class="fr-sr-only">, ${d.count} resultat${d.count > 1 ? "s" : ""}</span>`}
                </label>
              </div>
            </div>
          `;
    })}
        ${u ? _`
          <div class="fr-fieldset__element">
            <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm" type="button"
              @click="${() => this._toggleExpand(e.field)}">
              ${n ? "Voir moins" : `Voir plus (${o.length - this.maxValues})`}
            </button>
          </div>
        ` : S}
      </fieldset>
    `;
  }
  _renderSelectGroup(e) {
    const t = `facet-${this.id}-${e.field}`, i = this._activeSelections[e.field], r = i ? [...i][0] ?? "" : "";
    return _`
      <div class="gouv-facets__group fr-select-group" data-field="${e.field}">
        <label class="fr-label" for="${t}-select">${e.label}</label>
        <select class="fr-select" id="${t}-select"
          @change="${(n) => this._handleSelectChange(e.field, n)}">
          <option value="" ?selected="${!r}">Tous</option>
          ${e.values.map((n) => _`
            <option value="${n.value}" ?selected="${n.value === r}">
              ${this._effectiveHideCounts ? n.value : `${n.value} (${n.count})`}
            </option>
          `)}
        </select>
      </div>
    `;
  }
  _renderMultiselectGroup(e) {
    const t = `facet-${this.id}-${e.field}`, i = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set(), r = this._openMultiselectField === e.field, n = (this._searchQueries[e.field] ?? "").toLowerCase();
    let a = e.values;
    n && (a = a.filter((u) => u.value.toLowerCase().includes(n)));
    const o = i.size > 0 ? `${i.size} option${i.size > 1 ? "s" : ""} selectionnee${i.size > 1 ? "s" : ""}` : "Selectionnez des options", h = i.size > 0 ? [...i].join(", ") : "";
    return _`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}"
           @keydown="${(u) => this._handleMultiselectKeydown(e.field, u)}"
           @focusout="${(u) => this._handleMultiselectFocusout(e.field, u)}">
        <label class="fr-label" id="${t}-legend">${e.label}</label>
        ${h ? _`<span class="fr-sr-only" id="${t}-desc">${h}</span>` : S}
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${r}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          aria-describedby="${h ? `${t}-desc` : S}"
          @click="${(u) => {
      u.stopPropagation(), this._toggleMultiselectDropdown(e.field);
    }}">
          ${o}
        </button>
        ${r ? _`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-modal="true" aria-label="${e.label}"
               @click="${(u) => u.stopPropagation()}">
            <div aria-live="polite" class="fr-sr-only">${this._liveAnnouncement}</div>
            <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left ${i.size > 0 ? "fr-icon-close-circle-line" : "fr-icon-check-line"} gouv-facets__multiselect-toggle"
              type="button"
              aria-label="${i.size > 0 ? `Tout deselectionner pour ${e.label}` : `Tout selectionner pour ${e.label}`}"
              @click="${() => i.size > 0 ? this._clearFieldSelections(e.field) : this._selectAllValues(e.field)}">
              ${i.size > 0 ? "Tout deselectionner" : "Tout selectionner"}
            </button>
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${e.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                aria-describedby="${t}-search-hint"
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(u) => this._handleSearch(e.field, u)}">
              <span class="fr-sr-only" id="${t}-search-hint">Les resultats se mettent a jour automatiquement</span>
              <button class="fr-btn" type="button" title="Rechercher" aria-hidden="true" tabindex="-1">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${e.label}">
              ${a.map((u) => {
      const c = `${t}-${u.value.replace(/[^a-zA-Z0-9]/g, "_")}`, d = i.has(u.value);
      return _`
                  <div class="fr-fieldset__element">
                    <div class="fr-checkbox-group fr-checkbox-group--sm">
                      <input type="checkbox" id="${c}"
                        .checked="${d}"
                        @change="${() => this._toggleValue(e.field, u.value)}">
                      <label class="fr-label" for="${c}">
                        ${u.value}${this._effectiveHideCounts ? S : _`<span class="gouv-facets__count" aria-hidden="true">${u.count}</span><span class="fr-sr-only">, ${u.count} resultat${u.count > 1 ? "s" : ""}</span>`}
                      </label>
                    </div>
                  </div>
                `;
    })}
            </fieldset>
          </div>
        ` : S}
      </div>
    `;
  }
  _renderRadioGroup(e) {
    const t = `facet-${this.id}-${e.field}`, i = this._activeSelections[e.field] ?? /* @__PURE__ */ new Set(), r = this._openMultiselectField === e.field, n = (this._searchQueries[e.field] ?? "").toLowerCase();
    let a = e.values;
    n && (a = a.filter((u) => u.value.toLowerCase().includes(n)));
    const o = i.size > 0 ? [...i][0] : null, h = o ?? "Selectionnez une option";
    return _`
      <div class="fr-select-group gouv-facets__group gouv-facets__multiselect"
           data-multiselect="${e.field}"
           data-field="${e.field}"
           @keydown="${(u) => this._handleMultiselectKeydown(e.field, u)}"
           @focusout="${(u) => this._handleMultiselectFocusout(e.field, u)}">
        <label class="fr-label" id="${t}-legend">${e.label}</label>
        <button class="fr-select gouv-facets__multiselect-trigger"
          type="button"
          aria-expanded="${r}"
          aria-controls="${t}-panel"
          aria-labelledby="${t}-legend"
          aria-haspopup="dialog"
          @click="${(u) => {
      u.stopPropagation(), this._toggleMultiselectDropdown(e.field);
    }}">
          ${h}
        </button>
        ${r ? _`
          <div class="gouv-facets__multiselect-panel" id="${t}-panel"
               role="dialog" aria-modal="true" aria-label="${e.label}"
               @click="${(u) => u.stopPropagation()}">
            <div aria-live="polite" class="fr-sr-only">${this._liveAnnouncement}</div>
            ${o ? _`
              <button class="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left fr-icon-close-circle-line gouv-facets__multiselect-toggle"
                type="button"
                aria-label="Reinitialiser ${e.label}"
                @click="${() => this._clearFieldSelections(e.field)}">
                Reinitialiser
              </button>
            ` : S}
            <div class="fr-search-bar" role="search">
              <label class="fr-label fr-sr-only" for="${t}-search">Rechercher dans ${e.label}</label>
              <input class="fr-input" type="search" id="${t}-search"
                placeholder="Rechercher..."
                aria-describedby="${t}-search-hint"
                .value="${this._searchQueries[e.field] ?? ""}"
                @input="${(u) => this._handleSearch(e.field, u)}">
              <span class="fr-sr-only" id="${t}-search-hint">Les resultats se mettent a jour automatiquement</span>
              <button class="fr-btn" type="button" title="Rechercher" aria-hidden="true" tabindex="-1">
                Rechercher
              </button>
            </div>
            <fieldset class="fr-fieldset gouv-facets__dropdown-fieldset" aria-label="${e.label}">
              ${a.map((u) => {
      const c = `${t}-${u.value.replace(/[^a-zA-Z0-9]/g, "_")}`, d = i.has(u.value);
      return _`
                  <div class="fr-fieldset__element">
                    <div class="fr-radio-group fr-radio-group--sm">
                      <input type="radio" id="${c}" name="${t}-radio"
                        .checked="${d}"
                        @change="${() => this._toggleValue(e.field, u.value)}">
                      <label class="fr-label" for="${c}">
                        ${u.value}${this._effectiveHideCounts ? S : _`<span class="gouv-facets__count" aria-hidden="true">${u.count}</span><span class="fr-sr-only">, ${u.count} resultat${u.count > 1 ? "s" : ""}</span>`}
                      </label>
                    </div>
                  </div>
                `;
    })}
            </fieldset>
          </div>
        ` : S}
      </div>
    `;
  }
}, l(gt, "GouvFacets"), gt);
G([
  g({ type: String })
], z.prototype, "source", void 0);
G([
  g({ type: String })
], z.prototype, "fields", void 0);
G([
  g({ type: String })
], z.prototype, "labels", void 0);
G([
  g({ type: Number, attribute: "max-values" })
], z.prototype, "maxValues", void 0);
G([
  g({ type: String })
], z.prototype, "disjunctive", void 0);
G([
  g({ type: String })
], z.prototype, "sort", void 0);
G([
  g({ type: String })
], z.prototype, "searchable", void 0);
G([
  g({ type: Boolean, attribute: "hide-empty" })
], z.prototype, "hideEmpty", void 0);
G([
  g({ type: String })
], z.prototype, "display", void 0);
G([
  g({ type: Boolean, attribute: "url-params" })
], z.prototype, "urlParams", void 0);
G([
  g({ type: String, attribute: "url-param-map" })
], z.prototype, "urlParamMap", void 0);
G([
  g({ type: Boolean, attribute: "url-sync" })
], z.prototype, "urlSync", void 0);
G([
  g({ type: Boolean, attribute: "server-facets" })
], z.prototype, "serverFacets", void 0);
G([
  g({ type: String, attribute: "static-values" })
], z.prototype, "staticValues", void 0);
G([
  g({ type: Boolean, attribute: "hide-counts" })
], z.prototype, "hideCounts", void 0);
G([
  g({ type: String })
], z.prototype, "cols", void 0);
G([
  $()
], z.prototype, "_rawData", void 0);
G([
  $()
], z.prototype, "_facetGroups", void 0);
G([
  $()
], z.prototype, "_activeSelections", void 0);
G([
  $()
], z.prototype, "_expandedFacets", void 0);
G([
  $()
], z.prototype, "_searchQueries", void 0);
G([
  $()
], z.prototype, "_openMultiselectField", void 0);
G([
  $()
], z.prototype, "_liveAnnouncement", void 0);
z = G([
  X("gouv-facets")
], z);
function qt(s) {
  return s ? s.split(",").map((e) => e.trim()).filter(Boolean) : [];
}
l(qt, "_parseCSV");
var ee = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, mt;
let Y = (mt = class extends U {
  constructor() {
    super(...arguments), this.source = "", this.fields = "", this.placeholder = "Rechercher…", this.label = "Rechercher", this.debounce = 300, this.minLength = 0, this.highlight = !1, this.operator = "contains", this.srLabel = !1, this.count = !1, this.urlSearchParam = "", this.urlSync = !1, this.serverSearch = !1, this.searchTemplate = "", this._allData = [], this._filteredData = [], this._term = "", this._resultCount = 0, this._debounceTimer = null, this._unsubscribe = null, this._urlParamApplied = !1;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Pe("gouv-search"), this._initialize();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._debounceTimer !== null && (clearTimeout(this._debounceTimer), this._debounceTimer = null), this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null), this.id && ui(this.id);
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
    e && (e.value = "", e.focus()), this._applyFilter();
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
      const i = document.getElementById(this.source), r = (t = i == null ? void 0 : i.getAdapter) == null ? void 0 : t.call(i);
      r != null && r.getDefaultSearchTemplate && (this.searchTemplate = r.getDefaultSearchTemplate() || "");
    }
    this.serverSearch && this.urlSearchParam && !this._urlParamApplied && (this._applyUrlSearchParam(), this._urlParamApplied = !0, this._term && this._applyServerSearch());
    const e = tt(this.source);
    e !== void 0 && this._onData(e), this._unsubscribe = di(this.source, {
      onLoaded: /* @__PURE__ */ l((i) => {
        this._onData(i);
      }, "onLoaded"),
      onLoading: /* @__PURE__ */ l(() => {
        Ge(this.id);
      }, "onLoading"),
      onError: /* @__PURE__ */ l((i) => {
        Ue(this.id, i);
      }, "onError")
    });
  }
  _onData(e) {
    const t = Array.isArray(e) ? e : [];
    if (this.serverSearch) {
      this._allData = t, this._filteredData = t;
      const i = it(this.source);
      this._resultCount = i ? i.total : t.length, this.id && (i && Ze(this.id, i), ve(this.id, t)), this.urlSearchParam && !this._urlParamApplied && (this._applyUrlSearchParam(), this._urlParamApplied = !0, this._term && this._applyServerSearch());
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
      const t = this._getFields(), i = this.operator || "contains", r = this._normalize(e);
      this._filteredData = this._allData.filter((n) => this._matchRecord(n, r, t, i));
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
      const i = e.replace(/"/g, '\\"');
      t = this.searchTemplate.replace(/\{q\}/g, i);
    }
    $e(this.source, { where: t, whereKey: this.id }), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
      bubbles: !0,
      composed: !0,
      detail: {
        sourceId: this.id,
        term: this._term,
        count: this._resultCount
      }
    }));
  }
  _matchRecord(e, t, i, r) {
    const n = i.length > 0 ? i : Object.keys(e).filter((a) => !a.startsWith("_"));
    switch (r) {
      case "starts":
        return n.some((a) => this._normalize(String(e[a] ?? "")).split(/\s+/).some((h) => h.startsWith(t)));
      case "words":
        return t.split(/\s+/).filter(Boolean).every((o) => n.some((h) => this._normalize(String(e[h] ?? "")).includes(o)));
      case "contains":
      default:
        return n.some((a) => this._normalize(String(e[a] ?? "")).includes(t));
    }
  }
  _normalize(e) {
    return String(e).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }
  _getFields() {
    return this.fields ? this.fields.split(",").map((e) => e.trim()).filter(Boolean) : [];
  }
  _addHighlight(e, t) {
    const i = { ...e }, r = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), n = new RegExp("(" + r + ")", "gi"), a = this._getFields(), o = a.length > 0 ? a : Object.keys(e).filter((u) => typeof e[u] == "string"), h = [];
    return o.forEach((u) => {
      typeof e[u] == "string" && h.push(e[u].replace(n, "<mark>$1</mark>"));
    }), i._highlight = h.join(" … "), i;
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
    this.id && (ve(this.id, this._filteredData), this.urlSync && this.urlSearchParam && this._syncUrl(), document.dispatchEvent(new CustomEvent("gouv-search-change", {
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
    return _`
      <div class="fr-search-bar" role="search" aria-label="${this.getAttribute("aria-label") || this.label}">
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
      i.key === "Enter" && (i.preventDefault(), this._onSubmit()), i.key === "Escape" && this.clear();
    }}">
        <button class="fr-btn" title="Rechercher" type="button"
          @click="${(i) => {
      i.preventDefault(), this._onSubmit();
    }}">
          Rechercher
        </button>
      </div>
      ${this.count ? _`
        <p class="fr-text--sm fr-mt-1v gouv-search-count" aria-live="polite" aria-atomic="true" role="status">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      ` : _`
        <p class="fr-sr-only" aria-live="polite" aria-atomic="true" role="status">
          ${this._resultCount} resultat${this._resultCount !== 1 ? "s" : ""}
        </p>
      `}
    `;
  }
}, l(mt, "GouvSearch"), mt);
ee([
  g({ type: String })
], Y.prototype, "source", void 0);
ee([
  g({ type: String })
], Y.prototype, "fields", void 0);
ee([
  g({ type: String })
], Y.prototype, "placeholder", void 0);
ee([
  g({ type: String })
], Y.prototype, "label", void 0);
ee([
  g({ type: Number })
], Y.prototype, "debounce", void 0);
ee([
  g({ type: Number, attribute: "min-length" })
], Y.prototype, "minLength", void 0);
ee([
  g({ type: Boolean })
], Y.prototype, "highlight", void 0);
ee([
  g({ type: String })
], Y.prototype, "operator", void 0);
ee([
  g({ type: Boolean, attribute: "sr-label" })
], Y.prototype, "srLabel", void 0);
ee([
  g({ type: Boolean })
], Y.prototype, "count", void 0);
ee([
  g({ type: String, attribute: "url-search-param" })
], Y.prototype, "urlSearchParam", void 0);
ee([
  g({ type: Boolean, attribute: "url-sync" })
], Y.prototype, "urlSync", void 0);
ee([
  g({ type: Boolean, attribute: "server-search" })
], Y.prototype, "serverSearch", void 0);
ee([
  g({ type: String, attribute: "search-template" })
], Y.prototype, "searchTemplate", void 0);
ee([
  $()
], Y.prototype, "_allData", void 0);
ee([
  $()
], Y.prototype, "_filteredData", void 0);
ee([
  $()
], Y.prototype, "_term", void 0);
ee([
  $()
], Y.prototype, "_resultCount", void 0);
Y = ee([
  X("gouv-search")
], Y);
function Bt(s) {
  const t = class t extends s {
    constructor() {
      super(...arguments), this._sourceLoading = !1, this._sourceData = null, this._sourceError = null, this._unsubscribeSource = null;
    }
    /**
     * Hook appelé quand de nouvelles données arrivent.
     * À surcharger dans le composant hôte.
     */
    onSourceData(r) {
    }
    /**
     * Hook appelé quand une erreur survient.
     * À surcharger pour gérer les erreurs (ex: revert pagination).
     */
    onSourceError(r) {
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
      const n = tt(r);
      n !== void 0 && (this._sourceData = n, this.onSourceData(n)), this._unsubscribeSource = di(r, {
        onLoaded: /* @__PURE__ */ l((a) => {
          this._sourceData = a, this._sourceLoading = !1, this._sourceError = null, this.onSourceData(a), this.requestUpdate();
        }, "onLoaded"),
        onLoading: /* @__PURE__ */ l(() => {
          this._sourceLoading = !0, this.requestUpdate();
        }, "onLoading"),
        onError: /* @__PURE__ */ l((a) => {
          this._sourceError = a, this._sourceLoading = !1, this.onSourceError(a), this.requestUpdate();
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
l(Bt, "SourceSubscriberMixin");
function Jn(s, e = "nombre") {
  if (s == null || s === "")
    return "—";
  const t = typeof s == "string" ? parseFloat(s) : s;
  if (isNaN(t))
    return "—";
  switch (e) {
    case "nombre":
      return Qn(t);
    case "pourcentage":
      return so(t);
    case "euro":
      return ao(t);
    case "decimal":
      return oo(t);
    default:
      return Qn(t);
  }
}
l(Jn, "formatValue");
function Qn(s) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0
  }).format(Math.round(s));
}
l(Qn, "formatNumber");
function so(s) {
  return new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(s / 100);
}
l(so, "formatPercentage");
function ao(s) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(s);
}
l(ao, "formatCurrency");
function oo(s) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(s);
}
l(oo, "formatDecimal");
function vl(s) {
  const e = typeof s == "string" ? new Date(s) : s;
  return isNaN(e.getTime()) ? "—" : new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(e);
}
l(vl, "formatDate");
function lo(s, e, t) {
  return e !== void 0 && s >= e ? "vert" : t !== void 0 && s >= t ? "orange" : e !== void 0 || t !== void 0 ? "rouge" : "bleu";
}
l(lo, "getColorBySeuil");
function co(s) {
  const e = s.split(":");
  if (e.length === 1)
    return e[0] === "count" ? { type: "count", field: "" } : { type: "direct", field: e[0] };
  const t = e[0], i = e[1];
  if (e.length === 3) {
    let r = e[2];
    return r === "true" ? r = !0 : r === "false" ? r = !1 : isNaN(Number(r)) || (r = Number(r)), { type: t, field: i, filterField: i, filterValue: r };
  }
  return { type: t, field: i };
}
l(co, "parseExpression");
function Yn(s, e) {
  const t = co(e);
  if (t.type === "direct" && !Array.isArray(s))
    return s[t.field];
  if (!Array.isArray(s))
    return null;
  const i = s;
  switch (t.type) {
    case "direct":
    case "first":
      return i.length > 0 ? i[0][t.field] : null;
    case "last":
      return i.length > 0 ? i[i.length - 1][t.field] : null;
    case "count":
      return t.filterValue !== void 0 ? i.filter((n) => n[t.field] === t.filterValue).length : i.length;
    case "sum":
      return i.reduce((n, a) => {
        const o = Number(a[t.field]);
        return n + (isNaN(o) ? 0 : o);
      }, 0);
    case "avg":
      return i.length === 0 ? null : i.reduce((n, a) => {
        const o = Number(a[t.field]);
        return n + (isNaN(o) ? 0 : o);
      }, 0) / i.length;
    case "min":
      return i.length === 0 ? null : Math.min(...i.map((n) => Number(n[t.field])).filter((n) => !isNaN(n)));
    case "max":
      return i.length === 0 ? null : Math.max(...i.map((n) => Number(n[t.field])).filter((n) => !isNaN(n)));
    default:
      return null;
  }
}
l(Yn, "computeAggregation");
var xe = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
};
const Zn = {
  vert: "gouv-kpi--success",
  orange: "gouv-kpi--warning",
  rouge: "gouv-kpi--error",
  bleu: "gouv-kpi--info"
};
var _t;
let he = (_t = class extends Bt(U) {
  constructor() {
    super(...arguments), this.source = "", this.valeur = "", this.label = "", this.description = "", this.icone = "", this.format = "nombre", this.tendance = "", this.couleur = "";
  }
  // Utilise le Light DOM pour bénéficier des styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Pe("gouv-kpi");
  }
  _computeValue() {
    return !this._sourceData || !this.valeur ? null : Yn(this._sourceData, this.valeur);
  }
  _getColor() {
    if (this.couleur)
      return this.couleur;
    const e = this._computeValue();
    return typeof e != "number" ? "bleu" : lo(e, this.seuilVert, this.seuilOrange);
  }
  _getTendanceInfo() {
    if (!this.tendance || !this._sourceData)
      return null;
    const e = Yn(this._sourceData, this.tendance);
    return typeof e != "number" ? null : {
      value: e,
      direction: e > 0 ? "up" : e < 0 ? "down" : "stable"
    };
  }
  _getAriaLabel() {
    if (this.description)
      return this.description;
    const e = this._computeValue(), t = Jn(e, this.format);
    let i = `${this.label}: ${t}`;
    if (typeof e == "number" && (this.seuilVert !== void 0 || this.seuilOrange !== void 0)) {
      const r = this._getColor(), a = { vert: "bon", orange: "attention", rouge: "critique", bleu: "" }[r];
      a && (i += `, etat ${a}`);
    }
    return i;
  }
  render() {
    const e = this._computeValue(), t = Jn(e, this.format), i = Zn[this._getColor()] || Zn.bleu, r = this._getTendanceInfo();
    return _`
      <div
        class="gouv-kpi ${i}"
        role="figure"
        aria-label="${this._getAriaLabel()}"
      >
        ${this._sourceLoading ? _`
          <div class="gouv-kpi__loading" aria-live="polite">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? _`
          <div class="gouv-kpi__error" aria-live="assertive">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : _`
          <div class="gouv-kpi__content">
            ${this.icone ? _`
              <span class="gouv-kpi__icon ${this.icone}" aria-hidden="true"></span>
            ` : ""}
            <div class="gouv-kpi__value-wrapper">
              <span class="gouv-kpi__value">${t}</span>
              ${r ? _`
                <span class="gouv-kpi__tendance gouv-kpi__tendance--${r.direction}" role="img" aria-label="${r.value > 0 ? `en hausse de ${Math.abs(r.value).toFixed(1)}%` : r.value < 0 ? `en baisse de ${Math.abs(r.value).toFixed(1)}%` : "stable"}">
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
}, l(_t, "GouvKpi"), _t);
he.styles = Hr``;
xe([
  g({ type: String })
], he.prototype, "source", void 0);
xe([
  g({ type: String })
], he.prototype, "valeur", void 0);
xe([
  g({ type: String })
], he.prototype, "label", void 0);
xe([
  g({ type: String })
], he.prototype, "description", void 0);
xe([
  g({ type: String })
], he.prototype, "icone", void 0);
xe([
  g({ type: String })
], he.prototype, "format", void 0);
xe([
  g({ type: String })
], he.prototype, "tendance", void 0);
xe([
  g({ type: Number, attribute: "seuil-vert" })
], he.prototype, "seuilVert", void 0);
xe([
  g({ type: Number, attribute: "seuil-orange" })
], he.prototype, "seuilOrange", void 0);
xe([
  g({ type: String })
], he.prototype, "couleur", void 0);
xe([
  g({ type: Number, reflect: !0 })
], he.prototype, "col", void 0);
he = xe([
  X("gouv-kpi")
], he);
var tn = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, bt;
let ti = (bt = class extends U {
  constructor() {
    super(...arguments), this.cols = 3, this.gap = "md";
  }
  connectedCallback() {
    super.connectedCallback(), Pe("gouv-kpi-group"), this.hasAttribute("role") || this.setAttribute("role", "group");
  }
  updated(e) {
    if (super.updated(e), e.has("cols")) {
      const t = Math.max(1, Math.min(12, this.cols)), i = Math.max(1, Math.floor(12 / t));
      this.style.setProperty("--_kpi-default-span", String(i));
    }
  }
  render() {
    const e = Math.max(1, Math.floor(12 / Math.max(1, Math.min(12, this.cols))));
    return _`
      <style>
        ::slotted(*:not([col])) {
          grid-column: span ${e};
        }
      </style>
      <slot></slot>
    `;
  }
}, l(bt, "GouvKpiGroup"), bt);
ti.styles = Hr`
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
tn([
  g({ type: Number })
], ti.prototype, "cols", void 0);
tn([
  g({ type: String })
], ti.prototype, "gap", void 0);
ti = tn([
  X("gouv-kpi-group")
], ti);
var re = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, vt;
let Z = (vt = class extends Bt(U) {
  constructor() {
    super(...arguments), this.source = "", this.colonnes = "", this.recherche = !1, this.filtres = "", this.tri = "", this.pagination = 0, this.export = "", this.urlSync = !1, this.urlPageParam = "page", this.serverTri = !1, this._data = [], this._searchQuery = "", this._activeFilters = {}, this._sort = null, this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._previousPage = 1, this._popstateHandler = null, this._liveAnnouncement = "";
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Pe("gouv-datalist"), this._initSort(), this.urlSync && (this._applyUrlPage(), this._popstateHandler = () => {
      this._applyUrlPage(), this.requestUpdate();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null);
  }
  updated(e) {
    super.updated(e), e.has("tri") && this._initSort();
  }
  onSourceError(e) {
    this._serverPagination && this._data.length > 0 && (this._currentPage = this._previousPage);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [];
    const t = this.source ? it(this.source) : void 0;
    t && t.total > 0 ? (this._serverPagination = !0, this._serverTotal = t.total, this._serverPageSize = t.pageSize, this._currentPage = t.page) : (this._serverPagination = !1, this._currentPage = 1);
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
    }), this._sort && !this.serverTri) {
      const { key: t, direction: i } = this._sort;
      e.sort((r, n) => {
        const a = r[t], o = n[t];
        if (a === o)
          return 0;
        if (a == null)
          return 1;
        if (o == null)
          return -1;
        const h = typeof a == "number" && typeof o == "number" ? a - o : String(a).localeCompare(String(o), "fr");
        return i === "desc" ? -h : h;
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
      const i = parseInt(t, 10);
      !isNaN(i) && i >= 1 && (this._currentPage = i, this.source && $e(this.source, { page: i }));
    }
  }
  /** Sync current page to URL via replaceState */
  _syncPageUrl() {
    const e = new URLSearchParams(window.location.search);
    this._currentPage > 1 ? e.set(this.urlPageParam, String(this._currentPage)) : e.delete(this.urlPageParam);
    const t = e.toString(), i = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", i);
  }
  _handleSearch(e) {
    this._searchQuery = e.target.value, this._currentPage = 1, this.urlSync && this._syncPageUrl();
  }
  _handleFilter(e, t) {
    this._activeFilters = { ...this._activeFilters, [e]: t.target.value }, this._currentPage = 1, this.urlSync && this._syncPageUrl();
  }
  _announce(e) {
    this._liveAnnouncement = "", requestAnimationFrame(() => {
      this._liveAnnouncement = e;
    });
  }
  _handleSort(e) {
    var r, n;
    const i = ((r = this.parseColumns().find((a) => a.key === e)) == null ? void 0 : r.label) ?? e;
    ((n = this._sort) == null ? void 0 : n.key) === e ? this._sort = { key: e, direction: this._sort.direction === "asc" ? "desc" : "asc" } : this._sort = { key: e, direction: "asc" }, this._announce(`Tri par ${i}, ordre ${this._sort.direction === "asc" ? "croissant" : "decroissant"}`), this.serverTri && this.source && $e(this.source, {
      orderBy: `${this._sort.key}:${this._sort.direction}`
    });
  }
  _handlePageChange(e) {
    this._previousPage = this._currentPage, this._currentPage = e;
    const t = this._getTotalPages();
    this._announce(`Page ${e} sur ${t}`), this._serverPagination && this.source && $e(this.source, { page: e }), this.urlSync && this._syncPageUrl();
  }
  // --- Export ---
  _exportCsv() {
    const e = this.parseColumns(), t = this.getFilteredData(), i = e.map((u) => u.label).join(";"), r = t.map((u) => e.map((c) => {
      const d = String(u[c.key] ?? "");
      return d.includes(";") || d.includes('"') ? `"${d.replace(/"/g, '""')}"` : d;
    }).join(";")), n = [i, ...r].join(`
`), a = new Blob([n], { type: "text/csv;charset=utf-8;" }), o = URL.createObjectURL(a), h = document.createElement("a");
    h.href = o, h.download = "export.csv", h.click(), URL.revokeObjectURL(o);
  }
  _exportHtml() {
    const e = this.parseColumns(), t = this.getFilteredData(), i = e.map((u) => `<th>${Sr(u.label)}</th>`).join(""), r = t.map((u) => `<tr>${e.map((d) => {
      const p = u[d.key];
      return `<td>${p == null ? "" : Sr(String(p))}</td>`;
    }).join("")}</tr>`).join(`
`), n = `<!DOCTYPE html>
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
</html>`, a = new Blob([n], { type: "text/html;charset=utf-8;" }), o = URL.createObjectURL(a), h = document.createElement("a");
    h.href = o, h.download = "export.html", h.click(), URL.revokeObjectURL(o);
  }
  // --- Cell formatting ---
  formatCellValue(e) {
    return e == null ? "—" : typeof e == "boolean" ? e ? "Oui" : "Non" : String(e);
  }
  // --- Render sub-templates ---
  _renderFilters(e, t) {
    return t.length === 0 ? "" : _`
      <div class="gouv-datalist__filters">
        ${t.map((i) => {
      const r = e.find((o) => o.key === i), n = (r == null ? void 0 : r.label) || i, a = this._getUniqueValues(i);
      return _`
            <div class="fr-select-group">
              <label class="fr-label" for="filter-${i}">${n}</label>
              <select
                class="fr-select"
                id="filter-${i}"
                @change="${(o) => this._handleFilter(i, o)}"
              >
                <option value="">Tous</option>
                ${a.map((o) => _`
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
    var t, i, r, n;
    const e = ((t = this.export) == null ? void 0 : t.includes("csv")) || ((i = this.export) == null ? void 0 : i.includes("html"));
    return !this.recherche && !e ? "" : _`
      <div class="gouv-datalist__toolbar">
        ${this.recherche ? _`
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
        ` : _`<div></div>`}

        <div class="gouv-datalist__export-buttons">
          ${(r = this.export) != null && r.includes("csv") ? _`
            <button
              class="fr-btn fr-btn--secondary fr-btn--sm"
              @click="${this._exportCsv}"
              type="button"
            >
              <span class="fr-icon-download-line fr-icon--sm" aria-hidden="true"></span>
              Exporter CSV
            </button>
          ` : ""}

          ${(n = this.export) != null && n.includes("html") ? _`
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
    return _`
      <div class="fr-table fr-table--bordered">
        <table>
          <caption class="fr-sr-only">Liste des données</caption>
          <thead>
            <tr>
              ${e.map((i) => {
      var h;
      const r = ((h = this._sort) == null ? void 0 : h.key) === i.key, n = r ? this._sort.direction : null, a = n === "asc" ? "ascending" : n === "desc" ? "descending" : "none", o = r ? `Trier par ${i.label}, actuellement tri ${n === "asc" ? "croissant" : "decroissant"}` : `Trier par ${i.label}`;
      return _`
                <th scope="col" aria-sort="${a}">
                  <button
                    class="gouv-datalist__sort-btn"
                    @click="${() => this._handleSort(i.key)}"
                    aria-label="${o}"
                    type="button"
                  >
                    ${i.label}
                    ${r ? _`
                      <span aria-hidden="true">${n === "asc" ? "↑" : "↓"}</span>
                    ` : ""}
                  </button>
                </th>
              `;
    })}
            </tr>
          </thead>
          <tbody>
            ${t.length === 0 ? _`
              <tr>
                <td colspan="${e.length}" class="gouv-datalist__empty" role="status">
                  Aucune donnée à afficher
                </td>
              </tr>
            ` : t.map((i) => _`
              <tr>
                ${e.map((r) => _`
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
    return _`
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
          ${t.map((i) => _`
            <li>
              <button
                class="fr-pagination__link ${i === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(i)}"
                aria-current="${i === this._currentPage ? "page" : S}"
                aria-label="Page ${i} sur ${e}"
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
              aria-label="Derni\u00e8re page" type="button">Derni\u00e8re page</button>
          </li>
        </ul>
      </nav>
    `;
  }
  // --- Main render ---
  render() {
    const e = this.parseColumns(), t = this._getFilterableColumns(), i = this._getPaginatedData(), r = this._getTotalPages(), n = this._serverPagination ? this._serverTotal : this.getFilteredData().length;
    return _`
      <div class="gouv-datalist" role="region" aria-label="${this.getAttribute("aria-label") || "Liste de donnees"}">
        ${this._renderFilters(e, t)}
        ${this._renderToolbar()}

        <div aria-live="polite" aria-atomic="true" class="fr-sr-only">${this._liveAnnouncement}</div>
        ${this._sourceLoading ? _`
          <div class="gouv-datalist__loading" aria-live="polite" aria-busy="true">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement des données...
          </div>
        ` : this._sourceError && !(this._serverPagination && this._data.length > 0) ? _`
          <div class="gouv-datalist__error" aria-live="assertive" role="alert">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur: ${this._sourceError.message}
          </div>
        ` : _`
          <p class="fr-text--sm" aria-live="polite" aria-atomic="true" role="status">
            ${n} résultat${n > 1 ? "s" : ""}
            ${!this._serverPagination && (this._searchQuery || Object.values(this._activeFilters).some((a) => a)) ? " (filtré)" : ""}
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
}, l(vt, "GouvDatalist"), vt);
Z.styles = Hr``;
re([
  g({ type: String })
], Z.prototype, "source", void 0);
re([
  g({ type: String })
], Z.prototype, "colonnes", void 0);
re([
  g({ type: Boolean })
], Z.prototype, "recherche", void 0);
re([
  g({ type: String })
], Z.prototype, "filtres", void 0);
re([
  g({ type: String })
], Z.prototype, "tri", void 0);
re([
  g({ type: Number })
], Z.prototype, "pagination", void 0);
re([
  g({ type: String })
], Z.prototype, "export", void 0);
re([
  g({ type: Boolean, attribute: "url-sync" })
], Z.prototype, "urlSync", void 0);
re([
  g({ type: String, attribute: "url-page-param" })
], Z.prototype, "urlPageParam", void 0);
re([
  g({ type: Boolean, attribute: "server-tri" })
], Z.prototype, "serverTri", void 0);
re([
  $()
], Z.prototype, "_data", void 0);
re([
  $()
], Z.prototype, "_searchQuery", void 0);
re([
  $()
], Z.prototype, "_activeFilters", void 0);
re([
  $()
], Z.prototype, "_sort", void 0);
re([
  $()
], Z.prototype, "_currentPage", void 0);
re([
  $()
], Z.prototype, "_serverPagination", void 0);
re([
  $()
], Z.prototype, "_liveAnnouncement", void 0);
Z = re([
  X("gouv-datalist")
], Z);
var me = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, yt;
let pe = (yt = class extends Bt(U) {
  constructor() {
    super(...arguments), this.source = "", this.cols = 1, this.pagination = 0, this.empty = "Aucun resultat", this.gap = "fr-grid-row--gutters", this.uidField = "", this.urlSync = !1, this.urlPageParam = "page", this._data = [], this._currentPage = 1, this._serverPagination = !1, this._serverTotal = 0, this._serverPageSize = 0, this._templateContent = "", this._hashScrollDone = !1, this._popstateHandler = null, this._liveAnnouncement = "";
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Pe("gouv-display"), this._captureTemplate(), this.urlSync && (this._applyUrlPage(), this._popstateHandler = () => {
      this._applyUrlPage(), this.requestUpdate();
    }, window.addEventListener("popstate", this._popstateHandler));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._popstateHandler && (window.removeEventListener("popstate", this._popstateHandler), this._popstateHandler = null);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [], this._hashScrollDone = !1;
    const t = this.source ? it(this.source) : void 0;
    t && t.total > 0 ? (this._serverPagination = !0, this._serverTotal = t.total, this._serverPageSize = t.pageSize, this._currentPage = t.page) : (this._serverPagination = !1, this._currentPage = 1);
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
    return i = i.replace(/\{\{\{([^}]+)\}\}\}/g, (r, n) => this._resolveExpression(e, n.trim(), t)), i = i.replace(/\{\{([^}]+)\}\}/g, (r, n) => {
      const a = this._resolveExpression(e, n.trim(), t);
      return Sr(a);
    }), i;
  }
  /** Resout une expression : champ, champ:format, champ|defaut, champ:format|defaut, $index, $uid */
  _resolveExpression(e, t, i) {
    if (t === "$index")
      return String(i);
    if (t === "$uid")
      return this._getItemUid(e, i);
    let r = t, n = "";
    const a = t.indexOf("|");
    a !== -1 && (r = t.substring(0, a).trim(), n = t.substring(a + 1).trim());
    let o = "";
    const h = r.indexOf(":");
    h !== -1 && (o = r.substring(h + 1).trim(), r = r.substring(0, h).trim());
    const u = K(e, r);
    return u == null ? n : o ? this._formatValue(u, o) : String(u);
  }
  /** Applique un format a une valeur. Formats supportes : number */
  _formatValue(e, t) {
    if (t === "number") {
      const i = typeof e == "number" ? e : parseFloat(String(e));
      if (!isNaN(i))
        return i.toLocaleString("fr-FR");
    }
    return String(e);
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
      const i = parseInt(t, 10);
      !isNaN(i) && i >= 1 && (this._currentPage = i, this.source && $e(this.source, { page: i }));
    }
  }
  /** Sync current page to URL via replaceState */
  _syncPageUrl() {
    const e = new URLSearchParams(window.location.search);
    this._currentPage > 1 ? e.set(this.urlPageParam, String(this._currentPage)) : e.delete(this.urlPageParam);
    const t = e.toString(), i = t ? `${window.location.pathname}?${t}${window.location.hash}` : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", i);
  }
  _announce(e) {
    this._liveAnnouncement = "", requestAnimationFrame(() => {
      this._liveAnnouncement = e;
    });
  }
  _handlePageChange(e) {
    this._currentPage = e;
    const t = this._getTotalPages();
    this._announce(`Page ${e} sur ${t}`), this._serverPagination && this.source && $e(this.source, { page: e }), this.urlSync && this._syncPageUrl();
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
      const i = K(e, this.uidField);
      if (i != null && i !== "")
        return `item-${String(i).replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    }
    return `item-${t}`;
  }
  _renderGrid(e) {
    const t = this._getColClass(), i = this.pagination > 0 ? (this._currentPage - 1) * this.pagination : 0, r = e.map((a, o) => {
      const h = i + o, u = this._renderItem(a, h), c = this._getItemUid(a, h);
      return `<div class="${t}" id="${c}">${u}</div>`;
    }).join(""), n = `<div class="fr-grid-row ${this.gap}">${r}</div>`;
    return _`<div .innerHTML="${n}"></div>`;
  }
  _renderPagination(e) {
    if (this.pagination <= 0 || e <= 1)
      return "";
    const t = [];
    for (let i = Math.max(1, this._currentPage - 2); i <= Math.min(e, this._currentPage + 2); i++)
      t.push(i);
    return _`
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
          ${t.map((i) => _`
            <li>
              <button
                class="fr-pagination__link ${i === this._currentPage ? "fr-pagination__link--active" : ""}"
                @click="${() => this._handlePageChange(i)}"
                aria-current="${i === this._currentPage ? "page" : S}"
                aria-label="Page ${i} sur ${e}"
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
              aria-label="Derni\u00e8re page" type="button">Derni\u00e8re page</button>
          </li>
        </ul>
      </nav>
    `;
  }
  render() {
    this._templateContent || this._captureTemplate();
    const e = this._getPaginatedData(), t = this._getTotalPages(), i = this._serverPagination ? this._serverTotal : this._data.length;
    return _`
      <div class="gouv-display" role="region" aria-label="${this.getAttribute("aria-label") || "Liste de resultats"}">
        <div aria-live="polite" aria-atomic="true" class="fr-sr-only">${this._liveAnnouncement}</div>
        ${this._sourceLoading ? _`
          <div class="gouv-display__loading" aria-live="polite" aria-busy="true">
            <span class="fr-icon-loader-4-line" aria-hidden="true"></span>
            Chargement...
          </div>
        ` : this._sourceError ? _`
          <div class="gouv-display__error" aria-live="assertive" role="alert">
            <span class="fr-icon-error-line" aria-hidden="true"></span>
            Erreur de chargement
          </div>
        ` : i === 0 ? _`
          <div class="gouv-display__empty" aria-live="polite" role="status">
            ${this.empty}
          </div>
        ` : _`
          <p class="fr-text--sm fr-mb-1w" aria-live="polite" aria-atomic="true" role="status">
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
}, l(yt, "GouvDisplay"), yt);
me([
  g({ type: String })
], pe.prototype, "source", void 0);
me([
  g({ type: Number })
], pe.prototype, "cols", void 0);
me([
  g({ type: Number })
], pe.prototype, "pagination", void 0);
me([
  g({ type: String })
], pe.prototype, "empty", void 0);
me([
  g({ type: String })
], pe.prototype, "gap", void 0);
me([
  g({ type: String, attribute: "uid-field" })
], pe.prototype, "uidField", void 0);
me([
  g({ type: Boolean, attribute: "url-sync" })
], pe.prototype, "urlSync", void 0);
me([
  g({ type: String, attribute: "url-page-param" })
], pe.prototype, "urlPageParam", void 0);
me([
  $()
], pe.prototype, "_data", void 0);
me([
  $()
], pe.prototype, "_currentPage", void 0);
me([
  $()
], pe.prototype, "_serverPagination", void 0);
me([
  $()
], pe.prototype, "_liveAnnouncement", void 0);
pe = me([
  X("gouv-display")
], pe);
var H = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
};
const uo = {
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
var St;
let V = (St = class extends Bt(U) {
  constructor() {
    super(...arguments), this.source = "", this.type = "bar", this.labelField = "", this.codeField = "", this.valueField = "", this.valueField2 = "", this.name = "", this.selectedPalette = "categorical", this.unitTooltip = "", this.unitTooltipBar = "", this.horizontal = !1, this.stacked = !1, this.fill = !1, this.highlightIndex = "", this.xMin = "", this.xMax = "", this.yMin = "", this.yMax = "", this.gaugeValue = null, this.mapHighlight = "", this._data = [];
  }
  // Light DOM pour les styles DSFR
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Pe("gouv-dsfr-chart", this.type);
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [];
  }
  // --- Data processing ---
  _processData() {
    if (!this._data || this._data.length === 0)
      return { x: "[[]]", y: "[[]]", labels: [], values: [], values2: [] };
    const e = [], t = [], i = [];
    for (const r of this._data)
      e.push(String(K(r, this.labelField) ?? "N/A")), t.push(Number(K(r, this.valueField)) || 0), this.valueField2 && i.push(Number(K(r, this.valueField2)) || 0);
    return {
      x: JSON.stringify([e]),
      y: JSON.stringify([t]),
      y2: this.valueField2 ? JSON.stringify([i]) : void 0,
      // Combined y with both series for multi-series charts (bar, line, radar)
      yMulti: this.valueField2 ? JSON.stringify([t, i]) : void 0,
      labels: e,
      values: t,
      values2: i
    };
  }
  _processMapData() {
    if (!this._data || this._data.length === 0)
      return "{}";
    const e = this.codeField || this.labelField, t = {};
    for (const i of this._data) {
      let r = String(K(i, e) ?? "").trim();
      /^\d+$/.test(r) && r.length < 3 && (r = r.padStart(2, "0"));
      const n = Number(K(i, this.valueField)) || 0;
      (this.type === "map" ? Ia(r) : r !== "") && (t[r] = Math.round(n * 100) / 100);
    }
    return JSON.stringify(t);
  }
  // --- Attribute builders ---
  _getCommonAttributes() {
    const e = {};
    if (this.selectedPalette && (e["selected-palette"] = this.selectedPalette), this.unitTooltip && (e["unit-tooltip"] = this.unitTooltip), this.xMin && (e["x-min"] = this.xMin), this.xMax && (e["x-max"] = this.xMax), this.yMin && (e["y-min"] = this.yMin), this.yMax && (e["y-max"] = this.yMax), this.name) {
      const t = this.name.trim(), i = this.type === "map" || this.type === "map-reg";
      e.name = i || t.startsWith("[") ? t : JSON.stringify([t]);
    } else if (this.valueField)
      if (this.type === "map" || this.type === "map-reg")
        e.name = this.valueField;
      else {
        const i = this.valueField2 ? [this.valueField, this.valueField2] : [this.valueField];
        e.name = JSON.stringify(i);
      }
    return e;
  }
  _getTypeSpecificAttributes() {
    const { x: e, y: t, yMulti: i, labels: r, values: n, values2: a } = this._processData(), o = {}, h = {};
    switch (this.type) {
      case "gauge": {
        const u = this.gaugeValue ?? (this._data.length > 0 && Number(K(this._data[0], this.valueField)) || 0);
        o.percent = String(Math.round(u)), o.init = "0", o.target = "100";
        break;
      }
      case "pie":
        o.x = e, o.y = t, !this.name && r.length > 0 && (o.name = JSON.stringify(r));
        break;
      case "bar-line": {
        if (o.x = JSON.stringify(r), o["y-bar"] = JSON.stringify(n), o["y-line"] = JSON.stringify(a.length ? a : n), this.name)
          try {
            const u = this.name.trim(), c = u.startsWith("[") ? JSON.parse(u) : [u];
            c[0] && (o["name-bar"] = c[0]), c[1] && (o["name-line"] = c[1]);
          } catch {
          }
        this.unitTooltipBar && (o["unit-tooltip-bar"] = this.unitTooltipBar), this.unitTooltip && (o["unit-tooltip-line"] = this.unitTooltip);
        break;
      }
      case "map":
      case "map-reg": {
        if (o.data = this._processMapData(), this._data.length > 0) {
          let u = 0, c = 0;
          for (const d of this._data) {
            const p = Number(K(d, this.valueField));
            isNaN(p) || (u += p, c++);
          }
          if (c > 0) {
            const d = Math.round(u / c * 100) / 100;
            h.value = String(d);
          }
        }
        h.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        break;
      }
      default:
        o.x = e, o.y = i || t;
        break;
    }
    return this.type === "bar" && (this.horizontal && (o.horizontal = "true"), this.stacked && (o.stacked = "true"), this.highlightIndex && (o["highlight-index"] = this.highlightIndex)), this.type === "pie" && this.fill && (o.fill = "true"), (this.type === "map" || this.type === "map-reg") && this.mapHighlight && (o.highlight = this.mapHighlight), { attrs: o, deferred: h };
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
    for (const [a, o] of Object.entries(t))
      o !== void 0 && o !== "" && r.setAttribute(a, o);
    Object.keys(i).length > 0 && setTimeout(() => {
      for (const [a, o] of Object.entries(i))
        r.setAttribute(a, o);
    }, 500);
    const n = document.createElement("div");
    return n.className = "gouv-dsfr-chart__wrapper", n.setAttribute("role", "img"), n.setAttribute("aria-label", this._getAriaLabel()), n.appendChild(r), n;
  }
  _renderChart() {
    const e = uo[this.type];
    if (!e)
      return _`<p class="fr-text--sm fr-text--error">Type de graphique non supporté: ${this.type}</p>`;
    const { attrs: t, deferred: i } = this._getTypeSpecificAttributes(), r = {
      ...this._getCommonAttributes(),
      ...t
    };
    this.type === "bar-line" && (delete r.name, delete r["unit-tooltip"]);
    const n = this._createChartElement(e, r, i), a = this.querySelector(".gouv-dsfr-chart__wrapper");
    return a && a.remove(), _`${n}`;
  }
  render() {
    return this._sourceLoading ? _`
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
      ` : this._sourceError ? _`
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
      ` : !this._data || this._data.length === 0 ? _`
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
}, l(St, "GouvDsfrChart"), St);
H([
  g({ type: String })
], V.prototype, "source", void 0);
H([
  g({ type: String })
], V.prototype, "type", void 0);
H([
  g({ type: String, attribute: "label-field" })
], V.prototype, "labelField", void 0);
H([
  g({ type: String, attribute: "code-field" })
], V.prototype, "codeField", void 0);
H([
  g({ type: String, attribute: "value-field" })
], V.prototype, "valueField", void 0);
H([
  g({ type: String, attribute: "value-field-2" })
], V.prototype, "valueField2", void 0);
H([
  g({ type: String })
], V.prototype, "name", void 0);
H([
  g({ type: String, attribute: "selected-palette" })
], V.prototype, "selectedPalette", void 0);
H([
  g({ type: String, attribute: "unit-tooltip" })
], V.prototype, "unitTooltip", void 0);
H([
  g({ type: String, attribute: "unit-tooltip-bar" })
], V.prototype, "unitTooltipBar", void 0);
H([
  g({ type: Boolean })
], V.prototype, "horizontal", void 0);
H([
  g({ type: Boolean })
], V.prototype, "stacked", void 0);
H([
  g({ type: Boolean })
], V.prototype, "fill", void 0);
H([
  g({ type: String, attribute: "highlight-index" })
], V.prototype, "highlightIndex", void 0);
H([
  g({ type: String, attribute: "x-min" })
], V.prototype, "xMin", void 0);
H([
  g({ type: String, attribute: "x-max" })
], V.prototype, "xMax", void 0);
H([
  g({ type: String, attribute: "y-min" })
], V.prototype, "yMin", void 0);
H([
  g({ type: String, attribute: "y-max" })
], V.prototype, "yMax", void 0);
H([
  g({ type: Number, attribute: "gauge-value" })
], V.prototype, "gaugeValue", void 0);
H([
  g({ type: String, attribute: "map-highlight" })
], V.prototype, "mapHighlight", void 0);
H([
  $()
], V.prototype, "_data", void 0);
V = H([
  X("gouv-dsfr-chart")
], V);
const vn = class vn {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(e) {
    const t = this._partials;
    let i = 0;
    for (let r = 0; r < this._n && r < 32; r++) {
      const n = t[r], a = e + n, o = Math.abs(e) < Math.abs(n) ? e - (a - n) : n - (a - e);
      o && (t[i++] = o), e = a;
    }
    return t[i] = e, this._n = i + 1, this;
  }
  valueOf() {
    const e = this._partials;
    let t = this._n, i, r, n, a = 0;
    if (t > 0) {
      for (a = e[--t]; t > 0 && (i = a, r = e[--t], a = i + r, n = r - (a - i), !n); )
        ;
      t > 0 && (n < 0 && e[t - 1] < 0 || n > 0 && e[t - 1] > 0) && (r = n * 2, i = a + r, r == i - a && (a = i));
    }
    return a;
  }
};
l(vn, "Adder");
let ze = vn;
function* ho(s) {
  for (const e of s)
    yield* e;
}
l(ho, "flatten");
function js(s) {
  return Array.from(ho(s));
}
l(js, "merge");
var L = 1e-6, k = Math.PI, Se = k / 2, Xn = k / 4, Ae = k * 2, Le = 180 / k, fe = k / 180, q = Math.abs, po = Math.atan, ii = Math.atan2, J = Math.cos, Q = Math.sin, fo = Math.sign || function(s) {
  return s > 0 ? 1 : s < 0 ? -1 : 0;
}, st = Math.sqrt;
function go(s) {
  return s > 1 ? 0 : s < -1 ? k : Math.acos(s);
}
l(go, "acos");
function ri(s) {
  return s > 1 ? Se : s < -1 ? -Se : Math.asin(s);
}
l(ri, "asin");
function we() {
}
l(we, "noop");
function Oi(s, e) {
  s && ts.hasOwnProperty(s.type) && ts[s.type](s, e);
}
l(Oi, "streamGeometry");
var es = {
  Feature: /* @__PURE__ */ l(function(s, e) {
    Oi(s.geometry, e);
  }, "Feature"),
  FeatureCollection: /* @__PURE__ */ l(function(s, e) {
    for (var t = s.features, i = -1, r = t.length; ++i < r; ) Oi(t[i].geometry, e);
  }, "FeatureCollection")
}, ts = {
  Sphere: /* @__PURE__ */ l(function(s, e) {
    e.sphere();
  }, "Sphere"),
  Point: /* @__PURE__ */ l(function(s, e) {
    s = s.coordinates, e.point(s[0], s[1], s[2]);
  }, "Point"),
  MultiPoint: /* @__PURE__ */ l(function(s, e) {
    for (var t = s.coordinates, i = -1, r = t.length; ++i < r; ) s = t[i], e.point(s[0], s[1], s[2]);
  }, "MultiPoint"),
  LineString: /* @__PURE__ */ l(function(s, e) {
    xr(s.coordinates, e, 0);
  }, "LineString"),
  MultiLineString: /* @__PURE__ */ l(function(s, e) {
    for (var t = s.coordinates, i = -1, r = t.length; ++i < r; ) xr(t[i], e, 0);
  }, "MultiLineString"),
  Polygon: /* @__PURE__ */ l(function(s, e) {
    is(s.coordinates, e);
  }, "Polygon"),
  MultiPolygon: /* @__PURE__ */ l(function(s, e) {
    for (var t = s.coordinates, i = -1, r = t.length; ++i < r; ) is(t[i], e);
  }, "MultiPolygon"),
  GeometryCollection: /* @__PURE__ */ l(function(s, e) {
    for (var t = s.geometries, i = -1, r = t.length; ++i < r; ) Oi(t[i], e);
  }, "GeometryCollection")
};
function xr(s, e, t) {
  var i = -1, r = s.length - t, n;
  for (e.lineStart(); ++i < r; ) n = s[i], e.point(n[0], n[1], n[2]);
  e.lineEnd();
}
l(xr, "streamLine");
function is(s, e) {
  var t = -1, i = s.length;
  for (e.polygonStart(); ++t < i; ) xr(s[t], e, 1);
  e.polygonEnd();
}
l(is, "streamPolygon");
function ct(s, e) {
  s && es.hasOwnProperty(s.type) ? es[s.type](s, e) : Oi(s, e);
}
l(ct, "geoStream");
function Tr(s) {
  return [ii(s[1], s[0]), ri(s[2])];
}
l(Tr, "spherical");
function Ot(s) {
  var e = s[0], t = s[1], i = J(t);
  return [i * J(e), i * Q(e), Q(t)];
}
l(Ot, "cartesian");
function vi(s, e) {
  return s[0] * e[0] + s[1] * e[1] + s[2] * e[2];
}
l(vi, "cartesianDot");
function Di(s, e) {
  return [s[1] * e[2] - s[2] * e[1], s[2] * e[0] - s[0] * e[2], s[0] * e[1] - s[1] * e[0]];
}
l(Di, "cartesianCross");
function or(s, e) {
  s[0] += e[0], s[1] += e[1], s[2] += e[2];
}
l(or, "cartesianAddInPlace");
function yi(s, e) {
  return [s[0] * e, s[1] * e, s[2] * e];
}
l(yi, "cartesianScale");
function Rr(s) {
  var e = st(s[0] * s[0] + s[1] * s[1] + s[2] * s[2]);
  s[0] /= e, s[1] /= e, s[2] /= e;
}
l(Rr, "cartesianNormalizeInPlace");
function kr(s, e) {
  function t(i, r) {
    return i = s(i, r), e(i[0], i[1]);
  }
  return l(t, "compose"), s.invert && e.invert && (t.invert = function(i, r) {
    return i = e.invert(i, r), i && s.invert(i[0], i[1]);
  }), t;
}
l(kr, "compose");
function Mr(s, e) {
  return q(s) > k && (s -= Math.round(s / Ae) * Ae), [s, e];
}
l(Mr, "rotationIdentity");
Mr.invert = Mr;
function mo(s, e, t) {
  return (s %= Ae) ? e || t ? kr(ns(s), ss(e, t)) : ns(s) : e || t ? ss(e, t) : Mr;
}
l(mo, "rotateRadians");
function rs(s) {
  return function(e, t) {
    return e += s, q(e) > k && (e -= Math.round(e / Ae) * Ae), [e, t];
  };
}
l(rs, "forwardRotationLambda");
function ns(s) {
  var e = rs(s);
  return e.invert = rs(-s), e;
}
l(ns, "rotationLambda");
function ss(s, e) {
  var t = J(s), i = Q(s), r = J(e), n = Q(e);
  function a(o, h) {
    var u = J(h), c = J(o) * u, d = Q(o) * u, p = Q(h), f = p * t + c * i;
    return [
      ii(d * r - f * n, c * t - p * i),
      ri(f * r + d * n)
    ];
  }
  return l(a, "rotation"), a.invert = function(o, h) {
    var u = J(h), c = J(o) * u, d = Q(o) * u, p = Q(h), f = p * r - d * n;
    return [
      ii(d * r + p * n, c * t + f * i),
      ri(f * t - c * i)
    ];
  }, a;
}
l(ss, "rotationPhiGamma");
function _o(s, e, t, i, r, n) {
  if (t) {
    var a = J(e), o = Q(e), h = i * t;
    r == null ? (r = e + i * Ae, n = e - h / 2) : (r = as(a, r), n = as(a, n), (i > 0 ? r < n : r > n) && (r += i * Ae));
    for (var u, c = r; i > 0 ? c > n : c < n; c -= h)
      u = Tr([a, -o * J(c), -o * Q(c)]), s.point(u[0], u[1]);
  }
}
l(_o, "circleStream");
function as(s, e) {
  e = Ot(e), e[0] -= s, Rr(e);
  var t = go(-e[1]);
  return ((-e[2] < 0 ? -t : t) + Ae - L) % Ae;
}
l(as, "circleRadius");
function qs() {
  var s = [], e;
  return {
    point: /* @__PURE__ */ l(function(t, i, r) {
      e.push([t, i, r]);
    }, "point"),
    lineStart: /* @__PURE__ */ l(function() {
      s.push(e = []);
    }, "lineStart"),
    lineEnd: we,
    rejoin: /* @__PURE__ */ l(function() {
      s.length > 1 && s.push(s.pop().concat(s.shift()));
    }, "rejoin"),
    result: /* @__PURE__ */ l(function() {
      var t = s;
      return s = [], e = null, t;
    }, "result")
  };
}
l(qs, "clipBuffer");
function Ti(s, e) {
  return q(s[0] - e[0]) < L && q(s[1] - e[1]) < L;
}
l(Ti, "pointEqual");
function Si(s, e, t, i) {
  this.x = s, this.z = e, this.o = t, this.e = i, this.v = !1, this.n = this.p = null;
}
l(Si, "Intersection");
function Gs(s, e, t, i, r) {
  var n = [], a = [], o, h;
  if (s.forEach(function(m) {
    if (!((y = m.length - 1) <= 0)) {
      var y, b = m[0], x = m[y], A;
      if (Ti(b, x)) {
        if (!b[2] && !x[2]) {
          for (r.lineStart(), o = 0; o < y; ++o) r.point((b = m[o])[0], b[1]);
          r.lineEnd();
          return;
        }
        x[0] += 2 * L;
      }
      n.push(A = new Si(b, m, null, !0)), a.push(A.o = new Si(b, null, A, !1)), n.push(A = new Si(x, m, null, !1)), a.push(A.o = new Si(x, null, A, !0));
    }
  }), !!n.length) {
    for (a.sort(e), os(n), os(a), o = 0, h = a.length; o < h; ++o)
      a[o].e = t = !t;
    for (var u = n[0], c, d; ; ) {
      for (var p = u, f = !0; p.v; ) if ((p = p.n) === u) return;
      c = p.z, r.lineStart();
      do {
        if (p.v = p.o.v = !0, p.e) {
          if (f)
            for (o = 0, h = c.length; o < h; ++o) r.point((d = c[o])[0], d[1]);
          else
            i(p.x, p.n.x, 1, r);
          p = p.n;
        } else {
          if (f)
            for (c = p.p.z, o = c.length - 1; o >= 0; --o) r.point((d = c[o])[0], d[1]);
          else
            i(p.x, p.p.x, -1, r);
          p = p.p;
        }
        p = p.o, c = p.z, f = !f;
      } while (!p.v);
      r.lineEnd();
    }
  }
}
l(Gs, "clipRejoin");
function os(s) {
  if (e = s.length) {
    for (var e, t = 0, i = s[0], r; ++t < e; )
      i.n = r = s[t], r.p = i, i = r;
    i.n = r = s[0], r.p = i;
  }
}
l(os, "link");
function lr(s) {
  return q(s[0]) <= k ? s[0] : fo(s[0]) * ((q(s[0]) + k) % Ae - k);
}
l(lr, "longitude");
function bo(s, e) {
  var t = lr(e), i = e[1], r = Q(i), n = [Q(t), -J(t), 0], a = 0, o = 0, h = new ze();
  r === 1 ? i = Se + L : r === -1 && (i = -Se - L);
  for (var u = 0, c = s.length; u < c; ++u)
    if (p = (d = s[u]).length)
      for (var d, p, f = d[p - 1], m = lr(f), y = f[1] / 2 + Xn, b = Q(y), x = J(y), A = 0; A < p; ++A, m = w, b = T, x = O, f = P) {
        var P = d[A], w = lr(P), E = P[1] / 2 + Xn, T = Q(E), O = J(E), N = w - m, F = N >= 0 ? 1 : -1, j = F * N, C = j > k, ce = b * T;
        if (h.add(ii(ce * F * Q(j), x * O + ce * J(j))), a += C ? N + F * Ae : N, C ^ m >= t ^ w >= t) {
          var W = Di(Ot(f), Ot(P));
          Rr(W);
          var D = Di(n, W);
          Rr(D);
          var v = (C ^ N >= 0 ? -1 : 1) * ri(D[2]);
          (i > v || i === v && (W[0] || W[1])) && (o += C ^ N >= 0 ? 1 : -1);
        }
      }
  return (a < -L || a < L && h < -1e-12) ^ o & 1;
}
l(bo, "polygonContains");
function Vs(s, e, t, i) {
  return function(r) {
    var n = e(r), a = qs(), o = e(a), h = !1, u, c, d, p = {
      point: f,
      lineStart: y,
      lineEnd: b,
      polygonStart: /* @__PURE__ */ l(function() {
        p.point = x, p.lineStart = A, p.lineEnd = P, c = [], u = [];
      }, "polygonStart"),
      polygonEnd: /* @__PURE__ */ l(function() {
        p.point = f, p.lineStart = y, p.lineEnd = b, c = js(c);
        var w = bo(u, i);
        c.length ? (h || (r.polygonStart(), h = !0), Gs(c, yo, w, t, r)) : w && (h || (r.polygonStart(), h = !0), r.lineStart(), t(null, null, 1, r), r.lineEnd()), h && (r.polygonEnd(), h = !1), c = u = null;
      }, "polygonEnd"),
      sphere: /* @__PURE__ */ l(function() {
        r.polygonStart(), r.lineStart(), t(null, null, 1, r), r.lineEnd(), r.polygonEnd();
      }, "sphere")
    };
    function f(w, E) {
      s(w, E) && r.point(w, E);
    }
    l(f, "point");
    function m(w, E) {
      n.point(w, E);
    }
    l(m, "pointLine");
    function y() {
      p.point = m, n.lineStart();
    }
    l(y, "lineStart");
    function b() {
      p.point = f, n.lineEnd();
    }
    l(b, "lineEnd");
    function x(w, E) {
      d.push([w, E]), o.point(w, E);
    }
    l(x, "pointRing");
    function A() {
      o.lineStart(), d = [];
    }
    l(A, "ringStart");
    function P() {
      x(d[0][0], d[0][1]), o.lineEnd();
      var w = o.clean(), E = a.result(), T, O = E.length, N, F, j;
      if (d.pop(), u.push(d), d = null, !!O) {
        if (w & 1) {
          if (F = E[0], (N = F.length - 1) > 0) {
            for (h || (r.polygonStart(), h = !0), r.lineStart(), T = 0; T < N; ++T) r.point((j = F[T])[0], j[1]);
            r.lineEnd();
          }
          return;
        }
        O > 1 && w & 2 && E.push(E.pop().concat(E.shift())), c.push(E.filter(vo));
      }
    }
    return l(P, "ringEnd"), p;
  };
}
l(Vs, "clip");
function vo(s) {
  return s.length > 1;
}
l(vo, "validSegment");
function yo(s, e) {
  return ((s = s.x)[0] < 0 ? s[1] - Se - L : Se - s[1]) - ((e = e.x)[0] < 0 ? e[1] - Se - L : Se - e[1]);
}
l(yo, "compareIntersection");
const ls = Vs(
  function() {
    return !0;
  },
  So,
  $o,
  [-k, -Se]
);
function So(s) {
  var e = NaN, t = NaN, i = NaN, r;
  return {
    lineStart: /* @__PURE__ */ l(function() {
      s.lineStart(), r = 1;
    }, "lineStart"),
    point: /* @__PURE__ */ l(function(n, a) {
      var o = n > 0 ? k : -k, h = q(n - e);
      q(h - k) < L ? (s.point(e, t = (t + a) / 2 > 0 ? Se : -Se), s.point(i, t), s.lineEnd(), s.lineStart(), s.point(o, t), s.point(n, t), r = 0) : i !== o && h >= k && (q(e - i) < L && (e -= i * L), q(n - o) < L && (n -= o * L), t = wo(e, t, n, a), s.point(i, t), s.lineEnd(), s.lineStart(), s.point(o, t), r = 0), s.point(e = n, t = a), i = o;
    }, "point"),
    lineEnd: /* @__PURE__ */ l(function() {
      s.lineEnd(), e = t = NaN;
    }, "lineEnd"),
    clean: /* @__PURE__ */ l(function() {
      return 2 - r;
    }, "clean")
  };
}
l(So, "clipAntimeridianLine");
function wo(s, e, t, i) {
  var r, n, a = Q(s - t);
  return q(a) > L ? po((Q(e) * (n = J(i)) * Q(t) - Q(i) * (r = J(e)) * Q(s)) / (r * n * a)) : (e + i) / 2;
}
l(wo, "clipAntimeridianIntersect");
function $o(s, e, t, i) {
  var r;
  if (s == null)
    r = t * Se, i.point(-k, r), i.point(0, r), i.point(k, r), i.point(k, 0), i.point(k, -r), i.point(0, -r), i.point(-k, -r), i.point(-k, 0), i.point(-k, r);
  else if (q(s[0] - e[0]) > L) {
    var n = s[0] < e[0] ? k : -k;
    r = t * n / 2, i.point(-n, r), i.point(0, r), i.point(n, r);
  } else
    i.point(e[0], e[1]);
}
l($o, "clipAntimeridianInterpolate");
function Ao(s) {
  var e = J(s), t = 2 * fe, i = e > 0, r = q(e) > L;
  function n(c, d, p, f) {
    _o(f, s, t, p, c, d);
  }
  l(n, "interpolate");
  function a(c, d) {
    return J(c) * J(d) > e;
  }
  l(a, "visible");
  function o(c) {
    var d, p, f, m, y;
    return {
      lineStart: /* @__PURE__ */ l(function() {
        m = f = !1, y = 1;
      }, "lineStart"),
      point: /* @__PURE__ */ l(function(b, x) {
        var A = [b, x], P, w = a(b, x), E = i ? w ? 0 : u(b, x) : w ? u(b + (b < 0 ? k : -k), x) : 0;
        if (!d && (m = f = w) && c.lineStart(), w !== f && (P = h(d, A), (!P || Ti(d, P) || Ti(A, P)) && (A[2] = 1)), w !== f)
          y = 0, w ? (c.lineStart(), P = h(A, d), c.point(P[0], P[1])) : (P = h(d, A), c.point(P[0], P[1], 2), c.lineEnd()), d = P;
        else if (r && d && i ^ w) {
          var T;
          !(E & p) && (T = h(A, d, !0)) && (y = 0, i ? (c.lineStart(), c.point(T[0][0], T[0][1]), c.point(T[1][0], T[1][1]), c.lineEnd()) : (c.point(T[1][0], T[1][1]), c.lineEnd(), c.lineStart(), c.point(T[0][0], T[0][1], 3)));
        }
        w && (!d || !Ti(d, A)) && c.point(A[0], A[1]), d = A, f = w, p = E;
      }, "point"),
      lineEnd: /* @__PURE__ */ l(function() {
        f && c.lineEnd(), d = null;
      }, "lineEnd"),
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: /* @__PURE__ */ l(function() {
        return y | (m && f) << 1;
      }, "clean")
    };
  }
  l(o, "clipLine");
  function h(c, d, p) {
    var f = Ot(c), m = Ot(d), y = [1, 0, 0], b = Di(f, m), x = vi(b, b), A = b[0], P = x - A * A;
    if (!P) return !p && c;
    var w = e * x / P, E = -e * A / P, T = Di(y, b), O = yi(y, w), N = yi(b, E);
    or(O, N);
    var F = T, j = vi(O, F), C = vi(F, F), ce = j * j - C * (vi(O, O) - 1);
    if (!(ce < 0)) {
      var W = st(ce), D = yi(F, (-j - W) / C);
      if (or(D, O), D = Tr(D), !p) return D;
      var v = c[0], R = d[0], te = c[1], ue = d[1], _e;
      R < v && (_e = v, v = R, R = _e);
      var Ut = R - v, Oe = q(Ut - k) < L, Ke = Oe || Ut < L;
      if (!Oe && ue < te && (_e = te, te = ue, ue = _e), Ke ? Oe ? te + ue > 0 ^ D[1] < (q(D[0] - v) < L ? te : ue) : te <= D[1] && D[1] <= ue : Ut > k ^ (v <= D[0] && D[0] <= R)) {
        var De = yi(F, (-j + W) / C);
        return or(De, O), [D, Tr(De)];
      }
    }
  }
  l(h, "intersect");
  function u(c, d) {
    var p = i ? s : k - s, f = 0;
    return c < -p ? f |= 1 : c > p && (f |= 2), d < -p ? f |= 4 : d > p && (f |= 8), f;
  }
  return l(u, "code"), Vs(a, o, n, i ? [0, -s] : [-k, s - k]);
}
l(Ao, "clipCircle");
function Co(s, e, t, i, r, n) {
  var a = s[0], o = s[1], h = e[0], u = e[1], c = 0, d = 1, p = h - a, f = u - o, m;
  if (m = t - a, !(!p && m > 0)) {
    if (m /= p, p < 0) {
      if (m < c) return;
      m < d && (d = m);
    } else if (p > 0) {
      if (m > d) return;
      m > c && (c = m);
    }
    if (m = r - a, !(!p && m < 0)) {
      if (m /= p, p < 0) {
        if (m > d) return;
        m > c && (c = m);
      } else if (p > 0) {
        if (m < c) return;
        m < d && (d = m);
      }
      if (m = i - o, !(!f && m > 0)) {
        if (m /= f, f < 0) {
          if (m < c) return;
          m < d && (d = m);
        } else if (f > 0) {
          if (m > d) return;
          m > c && (c = m);
        }
        if (m = n - o, !(!f && m < 0)) {
          if (m /= f, f < 0) {
            if (m > d) return;
            m > c && (c = m);
          } else if (f > 0) {
            if (m < c) return;
            m < d && (d = m);
          }
          return c > 0 && (s[0] = a + c * p, s[1] = o + c * f), d < 1 && (e[0] = a + d * p, e[1] = o + d * f), !0;
        }
      }
    }
  }
}
l(Co, "clipLine");
var Vt = 1e9, wi = -Vt;
function Po(s, e, t, i) {
  function r(u, c) {
    return s <= u && u <= t && e <= c && c <= i;
  }
  l(r, "visible");
  function n(u, c, d, p) {
    var f = 0, m = 0;
    if (u == null || (f = a(u, d)) !== (m = a(c, d)) || h(u, c) < 0 ^ d > 0)
      do
        p.point(f === 0 || f === 3 ? s : t, f > 1 ? i : e);
      while ((f = (f + d + 4) % 4) !== m);
    else
      p.point(c[0], c[1]);
  }
  l(n, "interpolate");
  function a(u, c) {
    return q(u[0] - s) < L ? c > 0 ? 0 : 3 : q(u[0] - t) < L ? c > 0 ? 2 : 1 : q(u[1] - e) < L ? c > 0 ? 1 : 0 : c > 0 ? 3 : 2;
  }
  l(a, "corner");
  function o(u, c) {
    return h(u.x, c.x);
  }
  l(o, "compareIntersection");
  function h(u, c) {
    var d = a(u, 1), p = a(c, 1);
    return d !== p ? d - p : d === 0 ? c[1] - u[1] : d === 1 ? u[0] - c[0] : d === 2 ? u[1] - c[1] : c[0] - u[0];
  }
  return l(h, "comparePoint"), function(u) {
    var c = u, d = qs(), p, f, m, y, b, x, A, P, w, E, T, O = {
      point: N,
      lineStart: ce,
      lineEnd: W,
      polygonStart: j,
      polygonEnd: C
    };
    function N(v, R) {
      r(v, R) && c.point(v, R);
    }
    l(N, "point");
    function F() {
      for (var v = 0, R = 0, te = f.length; R < te; ++R)
        for (var ue = f[R], _e = 1, Ut = ue.length, Oe = ue[0], Ke, De, pi = Oe[0], ot = Oe[1]; _e < Ut; ++_e)
          Ke = pi, De = ot, Oe = ue[_e], pi = Oe[0], ot = Oe[1], De <= i ? ot > i && (pi - Ke) * (i - De) > (ot - De) * (s - Ke) && ++v : ot <= i && (pi - Ke) * (i - De) < (ot - De) * (s - Ke) && --v;
      return v;
    }
    l(F, "polygonInside");
    function j() {
      c = d, p = [], f = [], T = !0;
    }
    l(j, "polygonStart");
    function C() {
      var v = F(), R = T && v, te = (p = js(p)).length;
      (R || te) && (u.polygonStart(), R && (u.lineStart(), n(null, null, 1, u), u.lineEnd()), te && Gs(p, o, v, n, u), u.polygonEnd()), c = u, p = f = m = null;
    }
    l(C, "polygonEnd");
    function ce() {
      O.point = D, f && f.push(m = []), E = !0, w = !1, A = P = NaN;
    }
    l(ce, "lineStart");
    function W() {
      p && (D(y, b), x && w && d.rejoin(), p.push(d.result())), O.point = N, w && c.lineEnd();
    }
    l(W, "lineEnd");
    function D(v, R) {
      var te = r(v, R);
      if (f && m.push([v, R]), E)
        y = v, b = R, x = te, E = !1, te && (c.lineStart(), c.point(v, R));
      else if (te && w) c.point(v, R);
      else {
        var ue = [A = Math.max(wi, Math.min(Vt, A)), P = Math.max(wi, Math.min(Vt, P))], _e = [v = Math.max(wi, Math.min(Vt, v)), R = Math.max(wi, Math.min(Vt, R))];
        Co(ue, _e, s, e, t, i) ? (w || (c.lineStart(), c.point(ue[0], ue[1])), c.point(_e[0], _e[1]), te || c.lineEnd(), T = !1) : te && (c.lineStart(), c.point(v, R), T = !1);
      }
      A = v, P = R, w = te;
    }
    return l(D, "linePoint"), O;
  };
}
l(Po, "clipRectangle");
const Nr = /* @__PURE__ */ l((s) => s, "identity$1");
var cr = new ze(), Fr = new ze(), Hs, Ws, Or, Dr, Ie = {
  point: we,
  lineStart: we,
  lineEnd: we,
  polygonStart: /* @__PURE__ */ l(function() {
    Ie.lineStart = Eo, Ie.lineEnd = To;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ l(function() {
    Ie.lineStart = Ie.lineEnd = Ie.point = we, cr.add(q(Fr)), Fr = new ze();
  }, "polygonEnd"),
  result: /* @__PURE__ */ l(function() {
    var s = cr / 2;
    return cr = new ze(), s;
  }, "result")
};
function Eo() {
  Ie.point = xo;
}
l(Eo, "areaRingStart");
function xo(s, e) {
  Ie.point = Ks, Hs = Or = s, Ws = Dr = e;
}
l(xo, "areaPointFirst");
function Ks(s, e) {
  Fr.add(Dr * s - Or * e), Or = s, Dr = e;
}
l(Ks, "areaPoint");
function To() {
  Ks(Hs, Ws);
}
l(To, "areaRingEnd");
var Dt = 1 / 0, Li = Dt, ni = -Dt, Bi = ni, Ii = {
  point: Ro,
  lineStart: we,
  lineEnd: we,
  polygonStart: we,
  polygonEnd: we,
  result: /* @__PURE__ */ l(function() {
    var s = [[Dt, Li], [ni, Bi]];
    return ni = Bi = -(Li = Dt = 1 / 0), s;
  }, "result")
};
function Ro(s, e) {
  s < Dt && (Dt = s), s > ni && (ni = s), e < Li && (Li = e), e > Bi && (Bi = e);
}
l(Ro, "boundsPoint");
var Lr = 0, Br = 0, Ht = 0, Ui = 0, zi = 0, ut = 0, Ir = 0, Ur = 0, Wt = 0, Js, Qs, Ne, Fe, ye = {
  point: rt,
  lineStart: cs,
  lineEnd: us,
  polygonStart: /* @__PURE__ */ l(function() {
    ye.lineStart = No, ye.lineEnd = Fo;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ l(function() {
    ye.point = rt, ye.lineStart = cs, ye.lineEnd = us;
  }, "polygonEnd"),
  result: /* @__PURE__ */ l(function() {
    var s = Wt ? [Ir / Wt, Ur / Wt] : ut ? [Ui / ut, zi / ut] : Ht ? [Lr / Ht, Br / Ht] : [NaN, NaN];
    return Lr = Br = Ht = Ui = zi = ut = Ir = Ur = Wt = 0, s;
  }, "result")
};
function rt(s, e) {
  Lr += s, Br += e, ++Ht;
}
l(rt, "centroidPoint");
function cs() {
  ye.point = ko;
}
l(cs, "centroidLineStart");
function ko(s, e) {
  ye.point = Mo, rt(Ne = s, Fe = e);
}
l(ko, "centroidPointFirstLine");
function Mo(s, e) {
  var t = s - Ne, i = e - Fe, r = st(t * t + i * i);
  Ui += r * (Ne + s) / 2, zi += r * (Fe + e) / 2, ut += r, rt(Ne = s, Fe = e);
}
l(Mo, "centroidPointLine");
function us() {
  ye.point = rt;
}
l(us, "centroidLineEnd");
function No() {
  ye.point = Oo;
}
l(No, "centroidRingStart");
function Fo() {
  Ys(Js, Qs);
}
l(Fo, "centroidRingEnd");
function Oo(s, e) {
  ye.point = Ys, rt(Js = Ne = s, Qs = Fe = e);
}
l(Oo, "centroidPointFirstRing");
function Ys(s, e) {
  var t = s - Ne, i = e - Fe, r = st(t * t + i * i);
  Ui += r * (Ne + s) / 2, zi += r * (Fe + e) / 2, ut += r, r = Fe * s - Ne * e, Ir += r * (Ne + s), Ur += r * (Fe + e), Wt += r * 3, rt(Ne = s, Fe = e);
}
l(Ys, "centroidPointRing");
function Zs(s) {
  this._context = s;
}
l(Zs, "PathContext");
Zs.prototype = {
  _radius: 4.5,
  pointRadius: /* @__PURE__ */ l(function(s) {
    return this._radius = s, this;
  }, "pointRadius"),
  polygonStart: /* @__PURE__ */ l(function() {
    this._line = 0;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ l(function() {
    this._line = NaN;
  }, "polygonEnd"),
  lineStart: /* @__PURE__ */ l(function() {
    this._point = 0;
  }, "lineStart"),
  lineEnd: /* @__PURE__ */ l(function() {
    this._line === 0 && this._context.closePath(), this._point = NaN;
  }, "lineEnd"),
  point: /* @__PURE__ */ l(function(s, e) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(s, e), this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(s, e);
        break;
      }
      default: {
        this._context.moveTo(s + this._radius, e), this._context.arc(s, e, this._radius, 0, Ae);
        break;
      }
    }
  }, "point"),
  result: we
};
var zr = new ze(), ur, Xs, ea, Kt, Jt, si = {
  point: we,
  lineStart: /* @__PURE__ */ l(function() {
    si.point = Do;
  }, "lineStart"),
  lineEnd: /* @__PURE__ */ l(function() {
    ur && ta(Xs, ea), si.point = we;
  }, "lineEnd"),
  polygonStart: /* @__PURE__ */ l(function() {
    ur = !0;
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ l(function() {
    ur = null;
  }, "polygonEnd"),
  result: /* @__PURE__ */ l(function() {
    var s = +zr;
    return zr = new ze(), s;
  }, "result")
};
function Do(s, e) {
  si.point = ta, Xs = Kt = s, ea = Jt = e;
}
l(Do, "lengthPointFirst");
function ta(s, e) {
  Kt -= s, Jt -= e, zr.add(st(Kt * Kt + Jt * Jt)), Kt = s, Jt = e;
}
l(ta, "lengthPoint");
let ds, ji, hs, ps;
const yn = class yn {
  constructor(e) {
    this._append = e == null ? ia : Lo(e), this._radius = 4.5, this._ = "";
  }
  pointRadius(e) {
    return this._radius = +e, this;
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
  point(e, t) {
    switch (this._point) {
      case 0: {
        this._append`M${e},${t}`, this._point = 1;
        break;
      }
      case 1: {
        this._append`L${e},${t}`;
        break;
      }
      default: {
        if (this._append`M${e},${t}`, this._radius !== hs || this._append !== ji) {
          const i = this._radius, r = this._;
          this._ = "", this._append`m0,${i}a${i},${i} 0 1,1 0,${-2 * i}a${i},${i} 0 1,1 0,${2 * i}z`, hs = i, ji = this._append, ps = this._, this._ = r;
        }
        this._ += ps;
        break;
      }
    }
  }
  result() {
    const e = this._;
    return this._ = "", e.length ? e : null;
  }
};
l(yn, "PathString");
let qi = yn;
function ia(s) {
  let e = 1;
  this._ += s[0];
  for (const t = s.length; e < t; ++e)
    this._ += arguments[e] + s[e];
}
l(ia, "append");
function Lo(s) {
  const e = Math.floor(s);
  if (!(e >= 0)) throw new RangeError(`invalid digits: ${s}`);
  if (e > 15) return ia;
  if (e !== ds) {
    const t = 10 ** e;
    ds = e, ji = /* @__PURE__ */ l(function(r) {
      let n = 1;
      this._ += r[0];
      for (const a = r.length; n < a; ++n)
        this._ += Math.round(arguments[n] * t) / t + r[n];
    }, "append");
  }
  return ji;
}
l(Lo, "appendRound");
function Bo(s, e) {
  let t = 3, i = 4.5, r, n;
  function a(o) {
    return o && (typeof i == "function" && n.pointRadius(+i.apply(this, arguments)), ct(o, r(n))), n.result();
  }
  return l(a, "path"), a.area = function(o) {
    return ct(o, r(Ie)), Ie.result();
  }, a.measure = function(o) {
    return ct(o, r(si)), si.result();
  }, a.bounds = function(o) {
    return ct(o, r(Ii)), Ii.result();
  }, a.centroid = function(o) {
    return ct(o, r(ye)), ye.result();
  }, a.projection = function(o) {
    return arguments.length ? (r = o == null ? (s = null, Nr) : (s = o).stream, a) : s;
  }, a.context = function(o) {
    return arguments.length ? (n = o == null ? (e = null, new qi(t)) : new Zs(e = o), typeof i != "function" && n.pointRadius(i), a) : e;
  }, a.pointRadius = function(o) {
    return arguments.length ? (i = typeof o == "function" ? o : (n.pointRadius(+o), +o), a) : i;
  }, a.digits = function(o) {
    if (!arguments.length) return t;
    if (o == null) t = null;
    else {
      const h = Math.floor(o);
      if (!(h >= 0)) throw new RangeError(`invalid digits: ${o}`);
      t = h;
    }
    return e === null && (n = new qi(t)), a;
  }, a.projection(s).digits(t).context(e);
}
l(Bo, "geoPath");
function rn(s) {
  return function(e) {
    var t = new jr();
    for (var i in s) t[i] = s[i];
    return t.stream = e, t;
  };
}
l(rn, "transformer");
function jr() {
}
l(jr, "TransformStream");
jr.prototype = {
  constructor: jr,
  point: /* @__PURE__ */ l(function(s, e) {
    this.stream.point(s, e);
  }, "point"),
  sphere: /* @__PURE__ */ l(function() {
    this.stream.sphere();
  }, "sphere"),
  lineStart: /* @__PURE__ */ l(function() {
    this.stream.lineStart();
  }, "lineStart"),
  lineEnd: /* @__PURE__ */ l(function() {
    this.stream.lineEnd();
  }, "lineEnd"),
  polygonStart: /* @__PURE__ */ l(function() {
    this.stream.polygonStart();
  }, "polygonStart"),
  polygonEnd: /* @__PURE__ */ l(function() {
    this.stream.polygonEnd();
  }, "polygonEnd")
};
function nn(s, e, t) {
  var i = s.clipExtent && s.clipExtent();
  return s.scale(150).translate([0, 0]), i != null && s.clipExtent(null), ct(t, s.stream(Ii)), e(Ii.result()), i != null && s.clipExtent(i), s;
}
l(nn, "fit");
function ra(s, e, t) {
  return nn(s, function(i) {
    var r = e[1][0] - e[0][0], n = e[1][1] - e[0][1], a = Math.min(r / (i[1][0] - i[0][0]), n / (i[1][1] - i[0][1])), o = +e[0][0] + (r - a * (i[1][0] + i[0][0])) / 2, h = +e[0][1] + (n - a * (i[1][1] + i[0][1])) / 2;
    s.scale(150 * a).translate([o, h]);
  }, t);
}
l(ra, "fitExtent");
function Io(s, e, t) {
  return ra(s, [[0, 0], e], t);
}
l(Io, "fitSize");
function Uo(s, e, t) {
  return nn(s, function(i) {
    var r = +e, n = r / (i[1][0] - i[0][0]), a = (r - n * (i[1][0] + i[0][0])) / 2, o = -n * i[0][1];
    s.scale(150 * n).translate([a, o]);
  }, t);
}
l(Uo, "fitWidth");
function zo(s, e, t) {
  return nn(s, function(i) {
    var r = +e, n = r / (i[1][1] - i[0][1]), a = -n * i[0][0], o = (r - n * (i[1][1] + i[0][1])) / 2;
    s.scale(150 * n).translate([a, o]);
  }, t);
}
l(zo, "fitHeight");
var fs = 16, jo = J(30 * fe);
function gs(s, e) {
  return +e ? Go(s, e) : qo(s);
}
l(gs, "resample");
function qo(s) {
  return rn({
    point: /* @__PURE__ */ l(function(e, t) {
      e = s(e, t), this.stream.point(e[0], e[1]);
    }, "point")
  });
}
l(qo, "resampleNone");
function Go(s, e) {
  function t(i, r, n, a, o, h, u, c, d, p, f, m, y, b) {
    var x = u - i, A = c - r, P = x * x + A * A;
    if (P > 4 * e && y--) {
      var w = a + p, E = o + f, T = h + m, O = st(w * w + E * E + T * T), N = ri(T /= O), F = q(q(T) - 1) < L || q(n - d) < L ? (n + d) / 2 : ii(E, w), j = s(F, N), C = j[0], ce = j[1], W = C - i, D = ce - r, v = A * W - x * D;
      (v * v / P > e || q((x * W + A * D) / P - 0.5) > 0.3 || a * p + o * f + h * m < jo) && (t(i, r, n, a, o, h, C, ce, F, w /= O, E /= O, T, y, b), b.point(C, ce), t(C, ce, F, w, E, T, u, c, d, p, f, m, y, b));
    }
  }
  return l(t, "resampleLineTo"), function(i) {
    var r, n, a, o, h, u, c, d, p, f, m, y, b = {
      point: x,
      lineStart: A,
      lineEnd: w,
      polygonStart: /* @__PURE__ */ l(function() {
        i.polygonStart(), b.lineStart = E;
      }, "polygonStart"),
      polygonEnd: /* @__PURE__ */ l(function() {
        i.polygonEnd(), b.lineStart = A;
      }, "polygonEnd")
    };
    function x(N, F) {
      N = s(N, F), i.point(N[0], N[1]);
    }
    l(x, "point");
    function A() {
      d = NaN, b.point = P, i.lineStart();
    }
    l(A, "lineStart");
    function P(N, F) {
      var j = Ot([N, F]), C = s(N, F);
      t(d, p, c, f, m, y, d = C[0], p = C[1], c = N, f = j[0], m = j[1], y = j[2], fs, i), i.point(d, p);
    }
    l(P, "linePoint");
    function w() {
      b.point = x, i.lineEnd();
    }
    l(w, "lineEnd");
    function E() {
      A(), b.point = T, b.lineEnd = O;
    }
    l(E, "ringStart");
    function T(N, F) {
      P(r = N, F), n = d, a = p, o = f, h = m, u = y, b.point = P;
    }
    l(T, "ringPoint");
    function O() {
      t(d, p, c, f, m, y, n, a, r, o, h, u, fs, i), b.lineEnd = w, w();
    }
    return l(O, "ringEnd"), b;
  };
}
l(Go, "resample$1");
var Vo = rn({
  point: /* @__PURE__ */ l(function(s, e) {
    this.stream.point(s * fe, e * fe);
  }, "point")
});
function Ho(s) {
  return rn({
    point: /* @__PURE__ */ l(function(e, t) {
      var i = s(e, t);
      return this.stream.point(i[0], i[1]);
    }, "point")
  });
}
l(Ho, "transformRotate");
function Wo(s, e, t, i, r) {
  function n(a, o) {
    return a *= i, o *= r, [e + s * a, t - s * o];
  }
  return l(n, "transform"), n.invert = function(a, o) {
    return [(a - e) / s * i, (t - o) / s * r];
  }, n;
}
l(Wo, "scaleTranslate");
function ms(s, e, t, i, r, n) {
  if (!n) return Wo(s, e, t, i, r);
  var a = J(n), o = Q(n), h = a * s, u = o * s, c = a / s, d = o / s, p = (o * t - a * e) / s, f = (o * e + a * t) / s;
  function m(y, b) {
    return y *= i, b *= r, [h * y - u * b + e, t - u * y - h * b];
  }
  return l(m, "transform"), m.invert = function(y, b) {
    return [i * (c * y - d * b + p), r * (f - d * y - c * b)];
  }, m;
}
l(ms, "scaleTranslateRotate");
function Ko(s) {
  return Jo(function() {
    return s;
  })();
}
l(Ko, "projection");
function Jo(s) {
  var e, t = 150, i = 480, r = 250, n = 0, a = 0, o = 0, h = 0, u = 0, c, d = 0, p = 1, f = 1, m = null, y = ls, b = null, x, A, P, w = Nr, E = 0.5, T, O, N, F, j;
  function C(v) {
    return N(v[0] * fe, v[1] * fe);
  }
  l(C, "projection");
  function ce(v) {
    return v = N.invert(v[0], v[1]), v && [v[0] * Le, v[1] * Le];
  }
  l(ce, "invert"), C.stream = function(v) {
    return F && j === v ? F : F = Vo(Ho(c)(y(T(w(j = v)))));
  }, C.preclip = function(v) {
    return arguments.length ? (y = v, m = void 0, D()) : y;
  }, C.postclip = function(v) {
    return arguments.length ? (w = v, b = x = A = P = null, D()) : w;
  }, C.clipAngle = function(v) {
    return arguments.length ? (y = +v ? Ao(m = v * fe) : (m = null, ls), D()) : m * Le;
  }, C.clipExtent = function(v) {
    return arguments.length ? (w = v == null ? (b = x = A = P = null, Nr) : Po(b = +v[0][0], x = +v[0][1], A = +v[1][0], P = +v[1][1]), D()) : b == null ? null : [[b, x], [A, P]];
  }, C.scale = function(v) {
    return arguments.length ? (t = +v, W()) : t;
  }, C.translate = function(v) {
    return arguments.length ? (i = +v[0], r = +v[1], W()) : [i, r];
  }, C.center = function(v) {
    return arguments.length ? (n = v[0] % 360 * fe, a = v[1] % 360 * fe, W()) : [n * Le, a * Le];
  }, C.rotate = function(v) {
    return arguments.length ? (o = v[0] % 360 * fe, h = v[1] % 360 * fe, u = v.length > 2 ? v[2] % 360 * fe : 0, W()) : [o * Le, h * Le, u * Le];
  }, C.angle = function(v) {
    return arguments.length ? (d = v % 360 * fe, W()) : d * Le;
  }, C.reflectX = function(v) {
    return arguments.length ? (p = v ? -1 : 1, W()) : p < 0;
  }, C.reflectY = function(v) {
    return arguments.length ? (f = v ? -1 : 1, W()) : f < 0;
  }, C.precision = function(v) {
    return arguments.length ? (T = gs(O, E = v * v), D()) : st(E);
  }, C.fitExtent = function(v, R) {
    return ra(C, v, R);
  }, C.fitSize = function(v, R) {
    return Io(C, v, R);
  }, C.fitWidth = function(v, R) {
    return Uo(C, v, R);
  }, C.fitHeight = function(v, R) {
    return zo(C, v, R);
  };
  function W() {
    var v = ms(t, 0, 0, p, f, d).apply(null, e(n, a)), R = ms(t, i - v[0], r - v[1], p, f, d);
    return c = mo(o, h, u), O = kr(e, R), N = kr(c, O), T = gs(O, E), D();
  }
  l(W, "recenter");
  function D() {
    return F = j = null, C;
  }
  return l(D, "reset"), function() {
    return e = s.apply(this, arguments), C.invert = e.invert && ce, W();
  };
}
l(Jo, "projectionMutator");
function na(s, e) {
  var t = e * e, i = t * t;
  return [
    s * (0.8707 - 0.131979 * t + i * (-0.013791 + i * (3971e-6 * t - 1529e-6 * i))),
    e * (1.007226 + t * (0.015085 + i * (-0.044475 + 0.028874 * t - 5916e-6 * i)))
  ];
}
l(na, "naturalEarth1Raw");
na.invert = function(s, e) {
  var t = e, i = 25, r;
  do {
    var n = t * t, a = n * n;
    t -= r = (t * (1.007226 + n * (0.015085 + a * (-0.044475 + 0.028874 * n - 5916e-6 * a))) - e) / (1.007226 + n * (0.015085 * 3 + a * (-0.044475 * 7 + 0.028874 * 9 * n - 5916e-6 * 11 * a)));
  } while (q(r) > L && --i > 0);
  return [
    s / (0.8707 + (n = t * t) * (-0.131979 + n * (-0.013791 + n * n * n * (3971e-6 - 1529e-6 * n)))),
    t
  ];
};
function Qo() {
  return Ko(na).scale(175.295);
}
l(Qo, "geoNaturalEarth1");
function Yo(s) {
  return s;
}
l(Yo, "identity");
function Zo(s) {
  if (s == null) return Yo;
  var e, t, i = s.scale[0], r = s.scale[1], n = s.translate[0], a = s.translate[1];
  return function(o, h) {
    h || (e = t = 0);
    var u = 2, c = o.length, d = new Array(c);
    for (d[0] = (e += o[0]) * i + n, d[1] = (t += o[1]) * r + a; u < c; ) d[u] = o[u], ++u;
    return d;
  };
}
l(Zo, "transform");
function Xo(s, e) {
  for (var t, i = s.length, r = i - e; r < --i; ) t = s[r], s[r++] = s[i], s[i] = t;
}
l(Xo, "reverse");
function el(s, e) {
  return typeof e == "string" && (e = s.objects[e]), e.type === "GeometryCollection" ? { type: "FeatureCollection", features: e.geometries.map(function(t) {
    return _s(s, t);
  }) } : _s(s, e);
}
l(el, "feature");
function _s(s, e) {
  var t = e.id, i = e.bbox, r = e.properties == null ? {} : e.properties, n = sa(s, e);
  return t == null && i == null ? { type: "Feature", properties: r, geometry: n } : i == null ? { type: "Feature", id: t, properties: r, geometry: n } : { type: "Feature", id: t, bbox: i, properties: r, geometry: n };
}
l(_s, "feature$1");
function sa(s, e) {
  var t = Zo(s.transform), i = s.arcs;
  function r(c, d) {
    d.length && d.pop();
    for (var p = i[c < 0 ? ~c : c], f = 0, m = p.length; f < m; ++f)
      d.push(t(p[f], f));
    c < 0 && Xo(d, m);
  }
  l(r, "arc");
  function n(c) {
    return t(c);
  }
  l(n, "point");
  function a(c) {
    for (var d = [], p = 0, f = c.length; p < f; ++p) r(c[p], d);
    return d.length < 2 && d.push(d[0]), d;
  }
  l(a, "line");
  function o(c) {
    for (var d = a(c); d.length < 4; ) d.push(d[0]);
    return d;
  }
  l(o, "ring");
  function h(c) {
    return c.map(o);
  }
  l(h, "polygon");
  function u(c) {
    var d = c.type, p;
    switch (d) {
      case "GeometryCollection":
        return { type: d, geometries: c.geometries.map(u) };
      case "Point":
        p = n(c.coordinates);
        break;
      case "MultiPoint":
        p = c.coordinates.map(n);
        break;
      case "LineString":
        p = a(c.arcs);
        break;
      case "MultiLineString":
        p = c.arcs.map(a);
        break;
      case "Polygon":
        p = h(c.arcs);
        break;
      case "MultiPolygon":
        p = c.arcs.map(h);
        break;
      default:
        return null;
    }
    return { type: d, coordinates: p };
  }
  return l(u, "geometry"), u(e);
}
l(sa, "object");
function tl(s, e) {
  var t = {}, i = {}, r = {}, n = [], a = -1;
  e.forEach(function(u, c) {
    var d = s.arcs[u < 0 ? ~u : u], p;
    d.length < 3 && !d[1][0] && !d[1][1] && (p = e[++a], e[a] = u, e[c] = p);
  }), e.forEach(function(u) {
    var c = o(u), d = c[0], p = c[1], f, m;
    if (f = r[d])
      if (delete r[f.end], f.push(u), f.end = p, m = i[p]) {
        delete i[m.start];
        var y = m === f ? f : f.concat(m);
        i[y.start = f.start] = r[y.end = m.end] = y;
      } else
        i[f.start] = r[f.end] = f;
    else if (f = i[p])
      if (delete i[f.start], f.unshift(u), f.start = d, m = r[d]) {
        delete r[m.end];
        var b = m === f ? f : m.concat(f);
        i[b.start = m.start] = r[b.end = f.end] = b;
      } else
        i[f.start] = r[f.end] = f;
    else
      f = [u], i[f.start = d] = r[f.end = p] = f;
  });
  function o(u) {
    var c = s.arcs[u < 0 ? ~u : u], d = c[0], p;
    return s.transform ? (p = [0, 0], c.forEach(function(f) {
      p[0] += f[0], p[1] += f[1];
    })) : p = c[c.length - 1], u < 0 ? [p, d] : [d, p];
  }
  l(o, "ends");
  function h(u, c) {
    for (var d in u) {
      var p = u[d];
      delete c[p.start], delete p.start, delete p.end, p.forEach(function(f) {
        t[f < 0 ? ~f : f] = 1;
      }), n.push(p);
    }
  }
  return l(h, "flush"), h(r, i), h(i, r), e.forEach(function(u) {
    t[u < 0 ? ~u : u] || n.push([u]);
  }), n;
}
l(tl, "stitch");
function il(s) {
  return sa(s, rl.apply(this, arguments));
}
l(il, "mesh");
function rl(s, e, t) {
  var i, r, n;
  if (arguments.length > 1) i = nl(s, e, t);
  else for (r = 0, i = new Array(n = s.arcs.length); r < n; ++r) i[r] = r;
  return { type: "MultiLineString", arcs: tl(s, i) };
}
l(rl, "meshArcs");
function nl(s, e, t) {
  var i = [], r = [], n;
  function a(d) {
    var p = d < 0 ? ~d : d;
    (r[p] || (r[p] = [])).push({ i: d, g: n });
  }
  l(a, "extract0");
  function o(d) {
    d.forEach(a);
  }
  l(o, "extract1");
  function h(d) {
    d.forEach(o);
  }
  l(h, "extract2");
  function u(d) {
    d.forEach(h);
  }
  l(u, "extract3");
  function c(d) {
    switch (n = d, d.type) {
      case "GeometryCollection":
        d.geometries.forEach(c);
        break;
      case "LineString":
        o(d.arcs);
        break;
      case "MultiLineString":
      case "Polygon":
        h(d.arcs);
        break;
      case "MultiPolygon":
        u(d.arcs);
        break;
    }
  }
  return l(c, "geometry"), c(e), r.forEach(t == null ? function(d) {
    i.push(d[0].i);
  } : function(d) {
    t(d[0].g, d[d.length - 1].g) && i.push(d[0].i);
  }), i;
}
l(nl, "extractArcs");
const bs = {
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
}, sl = {
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
}, al = {
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
function ol(s, e) {
  const t = s.trim().toUpperCase();
  switch (e) {
    case "iso-a2":
      return sl[t] || "";
    case "iso-a3":
      return al[t] || "";
    case "iso-num":
      return t.padStart(3, "0");
  }
}
l(ol, "toIsoNumeric");
const ll = {
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
var le = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
};
let $i = null;
const Ai = "world-countries-110m.json";
async function cl() {
  if ($i)
    return $i;
  const s = import.meta.url.replace(/\/[^/]+$/, ""), e = [
    `${s}/data/${Ai}`,
    `${s}/../data/${Ai}`,
    `/data/${Ai}`
  ];
  for (const t of e)
    try {
      const i = await fetch(t);
      if (i.ok)
        return $i = await i.json(), $i;
    } catch {
    }
  throw new Error(`Could not load ${Ai} from any candidate path`);
}
l(cl, "loadTopology");
const dr = 960, hr = 500, Ci = 20, vs = {
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
}, ys = {
  Africa: "Afrique",
  Europe: "Europe",
  Asia: "Asie",
  "North America": "Amerique du Nord",
  "South America": "Amerique du Sud",
  Oceania: "Oceanie"
};
var wt;
let ae = (wt = class extends Bt(U) {
  constructor() {
    super(...arguments), this.source = "", this.codeField = "", this.valueField = "", this.codeFormat = "iso-a2", this.name = "", this.selectedPalette = "sequentialAscending", this.unitTooltip = "", this.zoom = "continent", this._data = [], this._topology = null, this._zoomedContinent = null, this._hoveredCountryId = null, this._tooltipX = 0, this._tooltipY = 0;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), Pe("gouv-world-map"), this._loadMap();
  }
  onSourceData(e) {
    this._data = Array.isArray(e) ? e : [];
  }
  async _loadMap() {
    try {
      this._topology = await cl(), this.requestUpdate();
    } catch (e) {
      console.error("gouv-world-map: failed to load topology", e);
    }
  }
  // --- Data processing ---
  _buildValueMap() {
    const e = /* @__PURE__ */ new Map();
    if (!this._data.length || !this.codeField || !this.valueField)
      return e;
    for (const t of this._data) {
      const i = String(K(t, this.codeField) ?? "").trim();
      if (!i)
        continue;
      const r = ol(i, this.codeFormat);
      if (!r)
        continue;
      const n = Number(K(t, this.valueField));
      isNaN(n) || e.set(r, Math.round(n * 100) / 100);
    }
    return e;
  }
  _getChoroplethPalette() {
    return vs[this.selectedPalette] || vs.sequentialAscending;
  }
  _getColorScale(e) {
    if (e.length === 0)
      return () => "#E5E5F4";
    const t = this._getChoroplethPalette(), i = [...e].sort((n, a) => n - a), r = [];
    for (let n = 1; n < t.length; n++)
      r.push(i[Math.floor(n / t.length * i.length)]);
    return (n) => {
      let a = 0;
      for (let o = 0; o < r.length; o++)
        n >= r[o] && (a = o + 1);
      return t[Math.min(a, t.length - 1)];
    };
  }
  // --- Geo helpers ---
  _getFeatures() {
    if (!this._topology)
      return [];
    const e = this._topology.objects.countries;
    return el(this._topology, e).features;
  }
  _getBorders() {
    if (!this._topology)
      return null;
    const e = this._topology.objects.countries;
    return il(this._topology, e, (t, i) => t !== i);
  }
  _getProjection() {
    const e = Qo().translate([dr / 2, hr / 2]).scale(153);
    if (this._zoomedContinent) {
      const t = this._getFeatures().filter((i) => bs[i.id] === this._zoomedContinent);
      if (t.length > 0) {
        const i = { type: "FeatureCollection", features: t };
        e.fitExtent([[Ci, Ci], [dr - Ci, hr - Ci]], i);
      }
    }
    return e;
  }
  // --- Event handlers ---
  _onCountryClick(e) {
    if (this.zoom !== "none")
      if (this._zoomedContinent)
        this._zoomedContinent = null;
      else {
        const t = bs[e];
        t && (this._zoomedContinent = t);
      }
  }
  _onCountryHover(e, t) {
    if (this._hoveredCountryId = t, t) {
      const i = this.getBoundingClientRect();
      this._tooltipX = e.clientX - i.left + 12, this._tooltipY = e.clientY - i.top - 8;
    }
  }
  _onBackClick() {
    this._zoomedContinent = null;
  }
  // --- Render ---
  _renderMap() {
    const e = this._getFeatures(), t = this._getBorders(), i = this._getProjection(), r = Bo(i), n = this._buildValueMap(), a = [...n.values()], o = this._getColorScale(a), h = "#F0F0F0", u = e.map((d) => {
      const p = r(d.geometry) || "", f = n.get(d.id), m = f !== void 0 ? o(f) : h, y = this._hoveredCountryId === d.id;
      return Nn`<path
        class="gouv-world-map__country"
        d=${p}
        fill=${m}
        stroke=${y ? "#000091" : "none"}
        stroke-width=${y ? "1.5" : "0"}
        data-id=${d.id}
        style="cursor: ${this.zoom !== "none" ? "pointer" : "default"}"
        @click=${() => this._onCountryClick(d.id)}
        @mouseenter=${(b) => this._onCountryHover(b, d.id)}
        @mousemove=${(b) => this._onCountryHover(b, d.id)}
        @mouseleave=${(b) => this._onCountryHover(b, null)}
      />`;
    }), c = t && r(t) || "";
    return _`
      <div class="gouv-world-map__container" style="position: relative;">
        ${this._zoomedContinent ? _`
          <button
            class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
            style="position: absolute; top: 8px; left: 8px; z-index: 2;"
            @click=${this._onBackClick}
            aria-label="Revenir a la vue monde">
            <span class="fr-icon-arrow-left-line" aria-hidden="true"></span>
            ${ys[this._zoomedContinent] || this._zoomedContinent}
          </button>
        ` : S}

        <svg
          viewBox="0 0 ${dr} ${hr}"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label=${this._getAriaLabel()}
          style="width: 100%; height: auto; display: block;">
          <g class="gouv-world-map__countries">
            ${u}
          </g>
          ${c ? Nn`<path
            class="gouv-world-map__borders"
            d=${c}
            fill="none"
            stroke="#fff"
            stroke-width="0.5"
            stroke-linejoin="round"
            pointer-events="none"
          />` : S}
        </svg>

        ${this._renderTooltip(n)}
        ${this._renderLegend(a, o)}
      </div>
    `;
  }
  _renderTooltip(e) {
    var n, a;
    if (!this._hoveredCountryId)
      return S;
    const t = ll[this._hoveredCountryId] || ((a = (n = this._getFeatures().find((o) => o.id === this._hoveredCountryId)) == null ? void 0 : n.properties) == null ? void 0 : a.name) || this._hoveredCountryId, i = e.get(this._hoveredCountryId), r = i !== void 0 ? `${i.toLocaleString("fr-FR")}${this.unitTooltip ? " " + this.unitTooltip : ""}` : "Pas de donnees";
    return _`
      <div class="gouv-world-map__tooltip"
        style="position: absolute; left: ${this._tooltipX}px; top: ${this._tooltipY}px;
          pointer-events: none; z-index: 10;
          background: var(--background-default-grey, #fff);
          color: var(--text-default-grey, #161616);
          border: 1px solid var(--border-default-grey, #ddd);
          border-radius: 4px; padding: 4px 8px; font-size: 0.8125rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15); white-space: nowrap;">
        <strong>${t}</strong><br/>
        ${r}
      </div>
    `;
  }
  _renderLegend(e, t) {
    if (e.length === 0)
      return S;
    const i = this._getChoroplethPalette(), r = [...e].sort((o, h) => o - h), n = r[0], a = r[r.length - 1];
    return _`
      <div class="gouv-world-map__legend" style="display: flex; align-items: center; gap: 4px;
        margin-top: 8px; font-size: 0.75rem; color: var(--text-mention-grey, #666);">
        ${this.name ? _`<span style="margin-right: 4px; font-weight: 500;">${this.name}</span>` : S}
        <span>${n.toLocaleString("fr-FR")}</span>
        <div style="display: flex; height: 12px; border-radius: 2px; overflow: hidden;">
          ${i.map((o) => _`<div style="width: 20px; background: ${o};"></div>`)}
        </div>
        <span>${a.toLocaleString("fr-FR")}</span>
        ${this.unitTooltip ? _`<span>${this.unitTooltip}</span>` : S}
      </div>
    `;
  }
  _getAriaLabel() {
    const e = this._data.length;
    return `Carte ${this._zoomedContinent ? ys[this._zoomedContinent] || this._zoomedContinent : "monde"}, ${e} valeurs`;
  }
  render() {
    return this._sourceLoading ? _`
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
      ` : this._sourceError ? _`
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
      ` : this._topology ? !this._data || this._data.length === 0 ? this._renderMap() : this._renderMap() : _`
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
}, l(wt, "GouvWorldMap"), wt);
le([
  g({ type: String })
], ae.prototype, "source", void 0);
le([
  g({ type: String, attribute: "code-field" })
], ae.prototype, "codeField", void 0);
le([
  g({ type: String, attribute: "value-field" })
], ae.prototype, "valueField", void 0);
le([
  g({ type: String, attribute: "code-format" })
], ae.prototype, "codeFormat", void 0);
le([
  g({ type: String })
], ae.prototype, "name", void 0);
le([
  g({ type: String, attribute: "selected-palette" })
], ae.prototype, "selectedPalette", void 0);
le([
  g({ type: String, attribute: "unit-tooltip" })
], ae.prototype, "unitTooltip", void 0);
le([
  g({ type: String })
], ae.prototype, "zoom", void 0);
le([
  $()
], ae.prototype, "_data", void 0);
le([
  $()
], ae.prototype, "_topology", void 0);
le([
  $()
], ae.prototype, "_zoomedContinent", void 0);
le([
  $()
], ae.prototype, "_hoveredCountryId", void 0);
le([
  $()
], ae.prototype, "_tooltipX", void 0);
le([
  $()
], ae.prototype, "_tooltipY", void 0);
ae = le([
  X("gouv-world-map")
], ae);
var Me = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
};
let ul = 0;
const pr = 100;
var $t;
let Ce = ($t = class extends Bt(U) {
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
    super.connectedCallback(), Pe("gouv-chart-a11y"), this._ensureId(), this._injectSkipLink(), this._applyAria();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._removeSkipLink(), this._removeAria();
  }
  updated(e) {
    super.updated(e), (e.has("for") || e.has("noAutoAria")) && (this._removeSkipLink(), this._removeAria(), this._injectSkipLink(), this._applyAria());
  }
  // ---------------------------------------------------------------------------
  // ID management
  // ---------------------------------------------------------------------------
  _ensureId() {
    this.id || (this.id = `gouv-chart-a11y-${++ul}`);
  }
  // ---------------------------------------------------------------------------
  // Skip link injection
  // ---------------------------------------------------------------------------
  _injectSkipLink() {
    if (this.noAutoAria || !this.for)
      return;
    const e = document.getElementById(this.for);
    if (!e)
      return;
    const t = document.createElement("a");
    t.href = `#${this.id}-section`, t.className = "gouv-chart-a11y__skiplink", t.textContent = "Voir les donnees accessibles", t.setAttribute("data-gouv-a11y-link", this.id), e.insertBefore(t, e.firstChild), this._injectedSkipLink = t;
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
    const e = document.getElementById(this.for);
    if (!e)
      return;
    this._previousForTarget = e;
    const t = `${this.id}-desc`, i = e.getAttribute("aria-describedby") || "";
    if (!i.split(/\s+/).includes(t)) {
      const r = i ? `${i} ${t}` : t;
      e.setAttribute("aria-describedby", r);
    }
    this._showTable && e.setAttribute("aria-details", `${this.id}-table`);
  }
  _removeAria() {
    if (!this._previousForTarget)
      return;
    const e = this._previousForTarget, t = `${this.id}-desc`, r = (e.getAttribute("aria-describedby") || "").split(/\s+/).filter((n) => n !== t);
    r.length > 0 ? e.setAttribute("aria-describedby", r.join(" ")) : e.removeAttribute("aria-describedby"), e.getAttribute("aria-details") === `${this.id}-table` && e.removeAttribute("aria-details"), this._previousForTarget = null;
  }
  // ---------------------------------------------------------------------------
  // CSV generation (ported from gouv-raw-data)
  // ---------------------------------------------------------------------------
  _handleDownload() {
    const e = this._sourceData;
    if (!e || !Array.isArray(e) || e.length === 0)
      return;
    const t = this._buildCsv(e);
    this._triggerDownload(t);
  }
  _buildCsv(e) {
    const t = Object.keys(e[0]), i = t.join(";"), r = e.map((n) => t.map((a) => {
      const o = String(n[a] ?? "");
      return o.includes(";") || o.includes('"') ? `"${o.replace(/"/g, '""')}"` : o;
    }).join(";"));
    return [i, ...r].join(`
`);
  }
  _triggerDownload(e) {
    const t = new Blob([e], { type: "text/csv;charset=utf-8;" }), i = URL.createObjectURL(t), r = document.createElement("a");
    r.href = i, r.download = this.filename, r.click(), URL.revokeObjectURL(i);
  }
  // ---------------------------------------------------------------------------
  // Table columns
  // ---------------------------------------------------------------------------
  _getColumns(e) {
    if (this.labelField || this.valueField) {
      const t = [];
      if (this.labelField && t.push(this.labelField), this.valueField)
        for (const i of this.valueField.split(",").map((r) => r.trim()))
          i && t.push(i);
      return t;
    }
    return e.length === 0 ? [] : Object.keys(e[0]);
  }
  // ---------------------------------------------------------------------------
  // Auto-generated description for aria-describedby
  // ---------------------------------------------------------------------------
  _getAutoDescription(e, t) {
    if (!e)
      return "Aucune donnee disponible.";
    const r = [`Donnees du graphique : ${t.length} lignes.`];
    return this.description && r.push(this.description), this._showDownload && r.push("Telechargement CSV disponible."), this._showTable && r.push("Tableau de donnees disponible."), r.join(" ");
  }
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  render() {
    const e = this._sourceData, t = Array.isArray(e) && e.length > 0, i = this.label || "Accessibilite : donnees et description", r = `${this.id}-desc`, n = `${this.id}-table`, a = t ? e : [], o = t ? this._getColumns(a) : [], h = a.slice(0, pr), u = a.length > pr;
    return _`
      <section class="gouv-chart-a11y"
               id="${this.id}-section"
               role="complementary"
               aria-label="${i}">

        <!-- Concise description for aria-describedby (sr-only) -->
        <p id="${r}" class="gouv-chart-a11y__sr-only">
          ${this._getAutoDescription(t, e)}
        </p>

        <details class="fr-accordion">
          <summary class="fr-accordion__btn">${i}</summary>
          <div class="fr-accordion__content">

            ${this._showDescription ? _`
              <div class="fr-mb-2w">
                <p class="fr-text--sm">${this.description}</p>
              </div>
            ` : S}

            ${this._showTable && t ? _`
              <div class="fr-table fr-mb-2w" id="${n}">
                <table>
                  <caption class="gouv-chart-a11y__sr-only">Donnees du graphique</caption>
                  <thead>
                    <tr>
                      ${o.map((c) => _`<th scope="col">${c}</th>`)}
                    </tr>
                  </thead>
                  <tbody>
                    ${h.map((c) => _`
                      <tr>
                        ${o.map((d) => _`<td>${c[d] ?? ""}</td>`)}
                      </tr>
                    `)}
                  </tbody>
                </table>
                ${u ? _`
                  <p class="fr-text--xs fr-mt-1w">
                    Affichage limite aux ${pr} premieres lignes.
                    ${this._showDownload ? "Telechargez le CSV pour les donnees completes." : ""}
                  </p>
                ` : S}
              </div>
            ` : S}

            ${this._showDownload ? _`
              <button
                class="fr-btn fr-btn--secondary fr-btn--sm fr-btn--icon-left fr-icon-download-line"
                @click="${this._handleDownload}"
                ?disabled="${!t || this._sourceLoading}"
                title="Telecharger les donnees (CSV)">
                Telecharger en CSV
              </button>
            ` : S}

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
}, l($t, "GouvChartA11y"), $t);
Me([
  g({ type: String })
], Ce.prototype, "source", void 0);
Me([
  g({ type: String, attribute: "for" })
], Ce.prototype, "for", void 0);
Me([
  g({ type: Boolean })
], Ce.prototype, "table", void 0);
Me([
  g({ type: Boolean })
], Ce.prototype, "download", void 0);
Me([
  g({ type: String })
], Ce.prototype, "filename", void 0);
Me([
  g({ type: String })
], Ce.prototype, "description", void 0);
Me([
  g({ type: String, attribute: "label-field" })
], Ce.prototype, "labelField", void 0);
Me([
  g({ type: String, attribute: "value-field" })
], Ce.prototype, "valueField", void 0);
Me([
  g({ type: String })
], Ce.prototype, "label", void 0);
Me([
  g({ type: Boolean, attribute: "no-auto-aria" })
], Ce.prototype, "noAutoAria", void 0);
Ce = Me([
  X("gouv-chart-a11y")
], Ce);
var He = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, At;
let je = (At = class extends U {
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
        const t = await Xa({ email: this._email, password: this._password });
        if (!t.success) {
          this._error = t.error || "Identifiants incorrects";
          return;
        }
      } else {
        if (!this._displayName.trim()) {
          this._error = "Le nom est requis";
          return;
        }
        const t = await eo({
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
      return S;
    const e = this._tab === "login";
    return _`
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

                  ${this._error ? _`
                    <div class="fr-alert fr-alert--error fr-alert--sm" style="margin-bottom:1rem">
                      <p>${this._error}</p>
                    </div>
                  ` : S}

                  <form @submit=${this._handleSubmit}>
                    ${e ? S : _`
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
                      ${e ? S : _`<p class="fr-hint-text">6 caracteres minimum</p>`}
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
}, l(At, "AuthModal"), At);
He([
  $()
], je.prototype, "_open", void 0);
He([
  $()
], je.prototype, "_tab", void 0);
He([
  $()
], je.prototype, "_error", void 0);
He([
  $()
], je.prototype, "_loading", void 0);
He([
  $()
], je.prototype, "_email", void 0);
He([
  $()
], je.prototype, "_password", void 0);
He([
  $()
], je.prototype, "_displayName", void 0);
je = He([
  X("auth-modal")
], je);
var We = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, Ct;
let qe = (Ct = class extends U {
  constructor() {
    super(...arguments), this.currentPage = "", this.basePath = "", this._favCount = 0, this._user = null, this._dbMode = !1, this._syncStatus = "idle", this._syncErrorCount = 0;
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
      e.id = "app-header-active-style", e.textContent = '.fr-nav__link[aria-current="page"]{font-weight:700;border-bottom:2px solid var(--border-action-high-blue-france);color:var(--text-action-high-blue-france)}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}', document.head.appendChild(e);
    }
    this._initAuth(), this._unsubSync = Wa((e, t) => {
      this._syncStatus = e, this._syncErrorCount = t;
    });
  }
  disconnectedCallback() {
    var e, t;
    super.disconnectedCallback(), (e = this._unsubAuth) == null || e.call(this), (t = this._unsubSync) == null || t.call(this);
  }
  async _initAuth() {
    try {
      const e = await Ya();
      this._dbMode = await Is(), this._user = e.user, this._unsubAuth = io((t) => {
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
    await to(), window.location.reload();
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
    return !this._dbMode || this._syncStatus === "idle" && this._syncErrorCount === 0 ? S : this._syncStatus === "syncing" ? _`
        <li>
          <span class="fr-btn fr-btn--tertiary-no-outline" style="pointer-events:none;color:var(--text-mention-grey);" title="Synchronisation en cours...">
            <i class="ri-refresh-line" style="animation:spin 1s linear infinite;"></i>
          </span>
        </li>
      ` : this._syncStatus === "error" || this._syncErrorCount > 0 ? _`
        <li>
          <span class="fr-btn fr-btn--tertiary-no-outline" style="pointer-events:none;color:var(--text-default-warning);" title="Erreurs de synchronisation (${this._syncErrorCount})">
            <i class="ri-error-warning-line"></i>
          </span>
        </li>
      ` : S;
  }
  _renderAuthButton() {
    return this._dbMode ? this._user ? _`
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
      ` : _`
      <li>
        <button class="fr-btn fr-btn--tertiary-no-outline fr-icon-account-circle-line"
                @click=${this._openAuthModal}>
          Connexion
        </button>
      </li>
    ` : S;
  }
  render() {
    const e = this._getNavItems();
    return _`
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
                        Favoris${this._favCount > 0 ? _` <span class="fr-badge fr-badge--sm fr-badge--info">${this._favCount}</span>` : S}
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
                ${e.map((t) => _`
                  <li class="fr-nav__item">
                    <a class="fr-nav__link"
                       href="${this._base}${t.href}"
                       ${this.currentPage === t.id ? _`aria-current="page"` : ""}>
                      ${t.label}
                    </a>
                  </li>
                `)}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      ${this._dbMode ? _`<auth-modal></auth-modal>` : S}
    `;
  }
}, l(Ct, "AppHeader"), Ct);
We([
  g({ type: String, attribute: "current-page" })
], qe.prototype, "currentPage", void 0);
We([
  g({ type: String, attribute: "base-path" })
], qe.prototype, "basePath", void 0);
We([
  $()
], qe.prototype, "_favCount", void 0);
We([
  $()
], qe.prototype, "_user", void 0);
We([
  $()
], qe.prototype, "_dbMode", void 0);
We([
  $()
], qe.prototype, "_syncStatus", void 0);
We([
  $()
], qe.prototype, "_syncErrorCount", void 0);
qe = We([
  X("app-header")
], qe);
var aa = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, Pt;
let qr = (Pt = class extends U {
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
    return _`
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
}, l(Pt, "AppFooter"), Pt);
aa([
  g({ type: String, attribute: "base-path" })
], qr.prototype, "basePath", void 0);
qr = aa([
  X("app-footer")
], qr);
var It = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, Et;
let nt = (Et = class extends U {
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
    let n = e.clientX - i.left;
    n = Math.max(this.minLeftWidth, Math.min(n, r - this.minRightWidth)), this._currentLeftRatio = n / r * 100, this.requestUpdate();
  }
  _handleMouseUp() {
    this._isResizing && (this._isResizing = !1, document.body.style.cursor = "", document.body.style.userSelect = "", this._boundMouseMove && document.removeEventListener("mousemove", this._boundMouseMove), this._boundMouseUp && document.removeEventListener("mouseup", this._boundMouseUp));
  }
  render() {
    return _`
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
}, l(Et, "AppLayoutBuilder"), Et);
It([
  g({ type: Number, attribute: "left-ratio" })
], nt.prototype, "leftRatio", void 0);
It([
  g({ type: Number, attribute: "min-left-width" })
], nt.prototype, "minLeftWidth", void 0);
It([
  g({ type: Number, attribute: "min-right-width" })
], nt.prototype, "minRightWidth", void 0);
It([
  $()
], nt.prototype, "_isResizing", void 0);
It([
  $()
], nt.prototype, "_currentLeftRatio", void 0);
nt = It([
  X("app-layout-builder")
], nt);
var hi = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, xt;
let Lt = (xt = class extends U {
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
  _isActive(e) {
    return this.activePath === e;
  }
  _isParentActive(e) {
    return e.children ? e.children.some((t) => this._isActive(t.id)) : !1;
  }
  _renderMenuItem(e) {
    const t = this._isActive(e.id), i = this._isParentActive(e);
    if (e.children) {
      const r = `fr-sidemenu-${e.id}`, n = i;
      return _`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${n}"
                  aria-controls="${r}">
            ${e.label}
          </button>
          <div class="fr-collapse ${n ? "fr-collapse--expanded" : ""}" id="${r}">
            <ul class="fr-sidemenu__list">
              ${e.children.map((a) => this._renderMenuItem(a))}
            </ul>
          </div>
        </li>
      `;
    } else
      return _`
        <li class="fr-sidemenu__item ${t ? "fr-sidemenu__item--active" : ""}">
          <a class="fr-sidemenu__link"
             href="${this._base}${e.href}"
             ${t ? _`aria-current="page"` : ""}>
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
    return t.push({ label: this.title, href: "" }), _`
      <nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
        <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">
          Voir le fil d'Ariane
        </button>
        <div class="fr-collapse" id="breadcrumb">
          <ol class="fr-breadcrumb__list">
            ${t.map((i, r) => _`
              <li>
                ${r === t.length - 1 ? _`<a class="fr-breadcrumb__link" aria-current="page">${i.label}</a>` : _`<a class="fr-breadcrumb__link" href="${i.href}">${i.label}</a>`}
              </li>
            `)}
          </ol>
        </div>
      </nav>
    `;
  }
  render() {
    const e = this._getMenuStructure();
    return _`
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

            ${this.title ? _`
              <h1>
                ${this.icon ? _`<span class="${this.icon} fr-mr-1w" aria-hidden="true"></span>` : ""}
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
}, l(xt, "AppLayoutDemo"), xt);
hi([
  g({ type: String })
], Lt.prototype, "title", void 0);
hi([
  g({ type: String })
], Lt.prototype, "icon", void 0);
hi([
  g({ type: String, attribute: "active-path" })
], Lt.prototype, "activePath", void 0);
hi([
  g({ type: String, attribute: "base-path" })
], Lt.prototype, "basePath", void 0);
Lt = hi([
  X("app-layout-demo")
], Lt);
var Ki = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, Tt;
let ai = (Tt = class extends U {
  constructor() {
    super(...arguments), this.section = "", this.activePath = "", this.basePath = "";
  }
  // Light DOM for DSFR style inheritance
  createRenderRoot() {
    return this;
  }
  get _base() {
    const e = this.basePath;
    return e ? e.endsWith("/") ? e : e + "/" : "";
  }
  _getMenu() {
    var e;
    return ((e = window.__APP_MENUS__) == null ? void 0 : e[this.section]) ?? [];
  }
  _getActivePath() {
    if (this.activePath)
      return this.activePath;
    const t = window.location.pathname.split("/").pop() || "", i = window.location.hash, r = this._getMenu();
    for (const n of r)
      for (const a of n.items) {
        const o = this._findMatchingItem(a, t, i);
        if (o)
          return o;
      }
    return "";
  }
  _findMatchingItem(e, t, i) {
    const r = e.href;
    if (i && r === t + i || r === t || i && r === i)
      return e.id;
    if (e.children) {
      for (const n of e.children) {
        const a = this._findMatchingItem(n, t, i);
        if (a)
          return a;
      }
      if (!i) {
        const n = e.children.find((a) => {
          const [o] = (a.href || "").split("#");
          return o === t;
        });
        if (n)
          return n.id;
      }
    }
    return null;
  }
  _isActive(e, t) {
    return t === e;
  }
  _isParentActive(e, t) {
    return e.children ? e.children.some((i) => this._isActive(i.id, t) || this._isParentActive(i, t)) : !1;
  }
  _renderItem(e, t) {
    const i = this._isActive(e.id, t);
    if (e.children) {
      const r = `fr-sidemenu-${e.id}`, n = this._isParentActive(e, t);
      return _`
        <li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn"
                  aria-expanded="${n}"
                  aria-controls="${r}">
            ${e.label}
          </button>
          <div class="fr-collapse ${n ? "fr-collapse--expanded" : ""}" id="${r}">
            <ul class="fr-sidemenu__list">
              ${e.children.map((a) => this._renderItem(a, t))}
            </ul>
          </div>
        </li>
      `;
    }
    return _`
      <li class="fr-sidemenu__item ${i ? "fr-sidemenu__item--active" : ""}">
        <a class="fr-sidemenu__link"
           href="${this._base}${e.href}"
           ${i ? _`aria-current="true"` : S}>
          ${e.label}
        </a>
      </li>
    `;
  }
  render() {
    const e = this._getMenu();
    if (!e.length)
      return S;
    const t = this._getActivePath();
    return _`
      <nav class="fr-sidemenu guide-sidemenu" role="navigation" aria-labelledby="app-sidemenu-title">
        <div class="fr-sidemenu__inner">
          <button class="fr-sidemenu__btn" hidden aria-controls="app-sidemenu-wrapper" aria-expanded="true">Menu</button>
          <div class="fr-collapse" id="app-sidemenu-wrapper">
            ${e.map((i, r) => _`
              ${i.title ? _`
                <div class="fr-sidemenu__title ${r > 0 ? "fr-mt-1w" : ""}"
                     id="${r === 0 ? "app-sidemenu-title" : `app-sidemenu-title-${r}`}">
                  ${i.title}
                </div>
              ` : S}
              <ul class="fr-sidemenu__list">
                ${i.items.map((n) => this._renderItem(n, t))}
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
}, l(Tt, "AppSidemenu"), Tt);
Ki([
  g({ type: String })
], ai.prototype, "section", void 0);
Ki([
  g({ type: String, attribute: "active-path" })
], ai.prototype, "activePath", void 0);
Ki([
  g({ type: String, attribute: "base-path" })
], ai.prototype, "basePath", void 0);
ai = Ki([
  X("app-sidemenu")
], ai);
var at = function(s, e, t, i) {
  var r = arguments.length, n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") n = Reflect.decorate(s, e, t, i);
  else for (var o = s.length - 1; o >= 0; o--) (a = s[o]) && (n = (r < 3 ? a(n) : r > 3 ? a(e, t, n) : a(e, t)) || n);
  return r > 3 && n && Object.defineProperty(e, t, n), n;
}, Rt;
let Ve = (Rt = class extends U {
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
    return _`
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
          ${this.showDataTab ? _`
            <button
              class="preview-panel-tab ${this._activeTab === "data" ? "active" : ""}"
              data-tab="data"
              @click="${() => this._handleTabClick("data")}">
              ${r || "Données"}
            </button>
          ` : S}
          ${this.showPlaygroundButton ? _`
            <button
              class="preview-panel-action-btn"
              @click="${this._handlePlaygroundClick}"
              title="Ouvrir dans le Playground">
              <i class="ri-play-circle-line" aria-hidden="true"></i>
              <span>Playground</span>
            </button>
          ` : S}
          ${this.showSaveButton ? _`
            <button
              class="preview-panel-action-btn preview-panel-save-btn"
              @click="${this._handleSaveClick}"
              title="Sauvegarder en favoris">
              <i class="ri-star-line" aria-hidden="true"></i>
              <span>Favoris</span>
            </button>
          ` : S}
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
}, l(Rt, "AppPreviewPanel"), Rt);
at([
  g({ type: Boolean, attribute: "show-data-tab" })
], Ve.prototype, "showDataTab", void 0);
at([
  g({ type: Boolean, attribute: "show-save-button" })
], Ve.prototype, "showSaveButton", void 0);
at([
  g({ type: Boolean, attribute: "show-playground-button" })
], Ve.prototype, "showPlaygroundButton", void 0);
at([
  g({ type: String, attribute: "tab-labels" })
], Ve.prototype, "tabLabels", void 0);
at([
  g({ type: String, attribute: "active-tab" })
], Ve.prototype, "activeTab", void 0);
at([
  $()
], Ve.prototype, "_activeTab", void 0);
Ve = at([
  X("app-preview-panel")
], Ve);
function dl(s, e, t) {
  return s.map((i) => ({
    label: String(K(i, e) ?? "N/A"),
    value: Number(K(i, t)) || 0
  }));
}
l(dl, "extractLabelValues");
function hl(s, e) {
  if (e === "none")
    return s;
  const t = /* @__PURE__ */ new Map();
  for (const r of s) {
    const n = t.get(r.label) || [];
    n.push(r.value), t.set(r.label, n);
  }
  const i = [];
  for (const [r, n] of t)
    i.push({ label: r, value: pl(n, e) });
  return i;
}
l(hl, "aggregateByLabel");
function pl(s, e) {
  switch (e) {
    case "sum":
      return s.reduce((t, i) => t + i, 0);
    case "avg":
      return s.reduce((t, i) => t + i, 0) / s.length;
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
l(pl, "computeGroupValue");
function fl(s, e) {
  return e === "none" ? s : [...s].sort((t, i) => e === "desc" ? i.value - t.value : t.value - i.value);
}
l(fl, "sortByValue");
function yl(s, e, t, i = "none", r = "none", n = 0) {
  if (!s || s.length === 0)
    return { labels: [], values: [] };
  let a = dl(s, e, t);
  return a = hl(a, i), a = fl(a, r), n > 0 && (a = a.slice(0, n)), {
    labels: a.map((o) => o.label),
    values: a.map((o) => Math.round(o.value * 100) / 100)
  };
}
l(yl, "processChartData");
export {
  qr as AppFooter,
  qe as AppHeader,
  nt as AppLayoutBuilder,
  Lt as AppLayoutDemo,
  be as DATA_EVENTS,
  Ce as GouvChartA11y,
  Z as GouvDatalist,
  pe as GouvDisplay,
  V as GouvDsfrChart,
  z as GouvFacets,
  he as GouvKpi,
  ti as GouvKpiGroup,
  ge as GouvNormalize,
  se as GouvQuery,
  Y as GouvSearch,
  B as GouvSource,
  ae as GouvWorldMap,
  Bt as SourceSubscriberMixin,
  hl as aggregateByLabel,
  Yn as computeAggregation,
  Ue as dispatchDataError,
  ve as dispatchDataLoaded,
  Ge as dispatchDataLoading,
  dl as extractLabelValues,
  ao as formatCurrency,
  vl as formatDate,
  Qn as formatNumber,
  so as formatPercentage,
  Jn as formatValue,
  ro as getAdapter,
  K as getByPath,
  _l as getByPathOrDefault,
  tt as getDataCache,
  ml as hasPath,
  co as parseExpression,
  yl as processChartData,
  bl as registerAdapter,
  fl as sortByValue,
  di as subscribeToSource
};
