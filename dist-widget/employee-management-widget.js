//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne } = Object, f = globalThis, re = f.trustedTypes, ie = re ? re.emptyScript : "", ae = f.reactiveElementPolyfillSupport, p = (e, t) => e, m = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ie : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, h = (e, t) => !l(e, t), oe = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	useDefault: !1,
	hasChanged: h
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var g = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = oe) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? oe;
	}
	static _$Ei() {
		if (this.hasOwnProperty(p("elementProperties"))) return;
		let e = ne(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(p("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(p("properties"))) {
			let e = this.properties, t = [...ee(e), ...te(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? m : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? m : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? h)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
g.elementStyles = [], g.shadowRootOptions = { mode: "open" }, g[p("elementProperties")] = /* @__PURE__ */ new Map(), g[p("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: g }), (f.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var _ = globalThis, se = (e) => e, v = _.trustedTypes, ce = v ? v.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, le = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, ue = "?" + y, de = `<${ue}>`, b = document, x = () => b.createComment(""), S = (e) => e === null || typeof e != "object" && typeof e != "function", C = Array.isArray, fe = (e) => C(e) || typeof e?.[Symbol.iterator] == "function", w = "[ 	\n\f\r]", T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, me = />/g, E = RegExp(`>|${w}(?:([^\\s"'>=/]+)(${w}*=${w}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), he = /'/g, ge = /"/g, _e = /^(?:script|style|textarea|title)$/i, D = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), O = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), A = b.createTreeWalker(b, 129);
function ye(e, t) {
	if (!C(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ce === void 0 ? t : ce.createHTML(t);
}
var be = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = T;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === T ? c[1] === "!--" ? o = pe : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = E) : (_e.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = E) : o = me : o === E ? c[0] === ">" ? (o = i ?? T, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? E : c[3] === "\"" ? ge : he) : o === ge || o === he ? o = E : o === pe || o === me ? o = T : (o = E, i = void 0);
		let d = o === E && e[t + 1].startsWith("/>") ? " " : "";
		a += o === T ? n + de : l >= 0 ? (r.push(s), n.slice(0, l) + le + n.slice(l) + y + d) : n + y + (l === -2 ? t : d);
	}
	return [ye(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, j = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = be(t, n);
		if (this.el = e.createElement(l, r), A.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = A.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(le)) {
					let t = u[o++], n = i.getAttribute(e).split(y), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Se : r[1] === "?" ? Ce : r[1] === "@" ? we : P
					}), i.removeAttribute(e);
				} else e.startsWith(y) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (_e.test(i.tagName)) {
					let e = i.textContent.split(y), t = e.length - 1;
					if (t > 0) {
						i.textContent = v ? v.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], x()), A.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], x());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === ue) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(y, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += y.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = b.createElement("template");
		return n.innerHTML = e, n;
	}
};
function M(e, t, n = e, r) {
	if (t === O) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = S(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = M(e, i._$AS(e, t.values), i, r)), t;
}
var xe = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? b).importNode(t, !0);
		A.currentNode = r;
		let i = A.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new N(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Te(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = A.nextNode(), a++);
		}
		return A.currentNode = b, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, N = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = M(this, e, t), S(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== O && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? fe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== k && S(this._$AH) ? this._$AA.nextSibling.data = e : this.T(b.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = j.createElement(ye(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new xe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ve.get(e.strings);
		return t === void 0 && ve.set(e.strings, t = new j(e)), t;
	}
	k(t) {
		C(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(x()), this.O(x()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = se(e).nextSibling;
			se(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, P = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = k, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = k;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = M(this, e, t, 0), a = !S(e) || e !== this._$AH && e !== O, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = M(this, r[n + o], t, o), s === O && (s = this._$AH[o]), a ||= !S(s) || s !== this._$AH[o], s === k ? e = k : e !== k && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Se = class extends P {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === k ? void 0 : e;
	}
}, Ce = class extends P {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== k);
	}
}, we = class extends P {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = M(this, e, t, 0) ?? k) === O) return;
		let n = this._$AH, r = e === k && n !== k || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== k && (n === k || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Te = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		M(this, e);
	}
}, Ee = _.litHtmlPolyfillSupport;
Ee?.(j, N), (_.litHtmlVersions ??= []).push("3.3.3");
var De = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new N(t.insertBefore(x(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, F = globalThis, I = class extends g {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = De(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return O;
	}
};
I._$litElement$ = !0, I.finalized = !0, F.litElementHydrateSupport?.({ LitElement: I });
var Oe = F.litElementPolyfillSupport;
Oe?.({ LitElement: I }), (F.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var L = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, ke = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	hasChanged: h
}, Ae = (e = ke, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function R(e) {
	return (t, n) => typeof n == "object" ? Ae(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function z(e) {
	return R({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/base.js
var B = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
//#endregion
//#region node_modules/@lit/reactive-element/decorators/query.js
function je(e, t) {
	return (n, r, i) => {
		let a = (t) => t.renderRoot?.querySelector(e) ?? null;
		if (t) {
			let { get: e, set: t } = typeof r == "object" ? n : i ?? (() => {
				let e = Symbol();
				return {
					get() {
						return this[e];
					},
					set(t) {
						this[e] = t;
					}
				};
			})();
			return B(n, r, { get() {
				let n = e.call(this);
				return n === void 0 && (n = a(this), (n !== null || this.hasUpdated) && t.call(this, n)), n;
			} });
		}
		return B(n, r, { get() {
			return a(this);
		} });
	};
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/query-all.js
var Me;
function Ne(e) {
	return (t, n) => B(t, n, { get() {
		return (this.renderRoot ?? (Me ??= document.createDocumentFragment())).querySelectorAll(e);
	} });
}
//#endregion
//#region src/widgets/employee/employee-service.ts
function Pe(e) {
	return "identifier" in e && typeof e.identifier == "number";
}
var Fe = class {
	constructor(e = []) {
		this.employees = [], this.listeners = /* @__PURE__ */ new Set(), this.employees = [...e];
	}
	subscribe(e) {
		return this.listeners.add(e), e(this.getAll()), () => {
			this.listeners.delete(e);
		};
	}
	notify() {
		let e = this.getAll();
		for (let t of this.listeners) t(e);
	}
	getAll() {
		return [...this.employees];
	}
	getById(e) {
		return this.employees.find((t) => t.identifier === e);
	}
	add(e) {
		let t;
		if ("identifier" in e && typeof e.identifier == "number" && !this.employees.some((t) => t.identifier === e.identifier)) t = e.identifier;
		else {
			let e = this.employees.reduce((e, t) => Math.max(e, t.identifier), 0);
			t = this.employees.length === 0 ? 1 : e + 1;
		}
		let n = {
			identifier: t,
			fullName: e.fullName,
			department: e.department,
			designation: e.designation ?? "",
			emailAddress: e.emailAddress
		};
		return this.employees = [...this.employees, n], this.notify(), n;
	}
	update(e) {
		if (this.employees.findIndex((t) => t.identifier === e.identifier) === -1) return null;
		let t = { ...e };
		return this.employees = this.employees.map((n) => n.identifier === e.identifier ? t : n), this.notify(), t;
	}
	delete(e) {
		let t = this.employees.find((t) => t.identifier === e);
		return t ? (this.employees = this.employees.filter((t) => t.identifier !== e), this.notify(), t) : null;
	}
	save(e, t) {
		return (t === void 0 ? Pe(e) && this.employees.some((t) => t.identifier === e.identifier) : t) && Pe(e) ? {
			employee: this.update(e) ?? e,
			isNew: !1
		} : {
			employee: this.add(e),
			isNew: !0
		};
	}
	clear() {
		this.employees = [], this.notify();
	}
}, Ie = "gdsp-employees";
function Le(e) {
	return Array.isArray(e);
}
function Re() {
	try {
		let e = localStorage.getItem(Ie);
		if (e === null) return [];
		let t = JSON.parse(e);
		return Le(t) ? t : [];
	} catch {
		return [];
	}
}
function ze(e) {
	try {
		localStorage.setItem(Ie, JSON.stringify(e));
	} catch {}
}
var V = new Fe(Re());
V.subscribe(ze);
//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/decorate.js
function H(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/ui/ui-input.ts
var U, W = class extends I {
	static {
		U = this;
	}
	constructor(...e) {
		super(...e), this.label = "", this.name = "", this.type = "text", this.value = "", this.placeholder = "", this.required = !1, this.disabled = !1, this.errorMessage = "", this.ariaLabel = null, this.errorTextId = `ui-input-error-${U.errorTextIdSequence++}`;
	}
	static {
		this.errorTextIdSequence = 0;
	}
	static {
		this.styles = o`
    :host {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    label {
      font-size: 14.4px;
      font-weight: 600;
      color: var(--color-text-primary, #111111);
    }

    .required-marker {
      color: var(--color-danger, #dc2626);
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 8px;
      background-color: var(--color-surface, #ffffff);
    }

    .input-wrapper:focus-within {
      border-color: var(--color-primary, #2563eb);
    }

    .input-wrapper.invalid {
      border-color: var(--color-danger, #dc2626);
    }

    .input-wrapper.disabled {
      background-color: var(--color-background, #f1f5f9);
      opacity: 0.65;
      cursor: not-allowed;
    }

    ::slotted(svg) {
      width: 18px;
      height: 18px;
      color: var(--color-text-secondary, #64748b);
      flex-shrink: 0;
    }

    input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      padding: 0;
      background: transparent;
      color: var(--color-text-primary, #111111);
      font-family: inherit;
      font-size: 15.2px;
    }

    input:disabled {
      cursor: not-allowed;
      color: var(--color-text-secondary, #64748b);
    }

    input::placeholder {
      color: var(--color-text-secondary, #64748b);
    }

    .error-text {
      margin: 0;
      font-size: 12.8px;
      color: var(--color-danger, #dc2626);
    }
  `;
	}
	render() {
		return D`
      ${this.renderLabel()}
      ${this.renderInputField()}
      ${this.renderErrorText()}
    `;
	}
	renderLabel() {
		return this.label === "" ? k : D`
      <label for="input-field">
        ${this.label}${this.required ? D`<span class="required-marker"> *</span>` : k}
      </label>
    `;
	}
	renderInputField() {
		let e = [
			"input-wrapper",
			this.errorMessage === "" ? "" : "invalid",
			this.disabled ? "disabled" : ""
		].filter((e) => e !== "").join(" "), t = this.value == null ? "" : String(this.value);
		return D`
      <div class=${e}>
        <slot name="icon"></slot>
        <input
          id="input-field"
          type=${this.type}
          .value=${t}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-label=${this.ariaLabel ?? k}
          aria-invalid=${this.errorMessage !== ""}
          aria-describedby=${this.errorMessage === "" ? k : this.errorTextId}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        />
      </div>
    `;
	}
	renderErrorText() {
		return this.errorMessage === "" ? k : D`<p class="error-text" id=${this.errorTextId} role="alert">${this.errorMessage}</p>`;
	}
	validate() {
		let e = this.value == null ? "" : String(this.value).trim();
		if (this.required && e === "") {
			let e = this.label === "" ? this.placeholder === "" ? "Field" : this.placeholder : this.label;
			return this.errorMessage = `${e} is required`, !1;
		}
		return this.type === "email" && e !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? (this.errorMessage = "Enter a valid email", !1) : (this.errorMessage = "", !0);
	}
	clear() {
		this.value = "", this.errorMessage = "";
	}
	handleInput(e) {
		if (this.disabled) return;
		let t = e.target;
		if (!(t instanceof HTMLInputElement)) return;
		let n = t.value;
		this.value = n, this.errorMessage !== "" && this.validate(), this.dispatchEvent(new CustomEvent("value-changed", {
			detail: {
				name: this.name,
				value: n
			},
			bubbles: !0,
			composed: !0
		}));
	}
	handleBlur() {
		this.disabled || this.value !== "" && this.value !== null && this.value !== void 0 && this.validate();
	}
};
H([R()], W.prototype, "label", void 0), H([R()], W.prototype, "name", void 0), H([R()], W.prototype, "type", void 0), H([R()], W.prototype, "value", void 0), H([R()], W.prototype, "placeholder", void 0), H([R({
	type: Boolean,
	reflect: !0
})], W.prototype, "required", void 0), H([R({
	type: Boolean,
	reflect: !0
})], W.prototype, "disabled", void 0), H([R({ attribute: "error-message" })], W.prototype, "errorMessage", void 0), H([R({
	type: String,
	attribute: "aria-label"
})], W.prototype, "ariaLabel", void 0), W = U = H([L("ui-input")], W);
//#endregion
//#region src/ui/ui-button.ts
var G = {
	PRIMARY: "primary",
	SECONDARY: "secondary",
	DANGER: "danger",
	CONTRAST: "contrast",
	OUTLINE_PRIMARY: "outline-primary",
	OUTLINE_DANGER: "outline-danger"
}, K = class extends I {
	constructor(...e) {
		super(...e), this.variant = G.PRIMARY, this.small = !1, this.pill = !1, this.iconOnly = !1, this.disabled = !1, this.ariaLabel = null;
	}
	static {
		this.styles = o`
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 18px;
      border-radius: 6px;
      border: 1px solid transparent;
      font-family: inherit;
      font-size: 15.2px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease, border-color 0.15s ease;
    }

    button.small {
      padding: 6px 12px;
      font-size: 13.6px;
    }

    button.pill {
      border-radius: 999px;
    }

    button.icon-only {
      padding: 7px;
    }

    ::slotted(svg) {
      width: 16px;
      height: 16px;
      display: block;
    }

    button:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    button.primary {
      background-color: var(--color-primary, #2563eb);
      color: var(--color-primary-contrast, #ffffff);
    }

    button.primary:hover:enabled {
      background-color: var(--color-primary-hover, #1d4ed8);
    }

    button.secondary {
      background-color: var(--color-surface, #ffffff);
      color: var(--color-text-primary, #111111);
      border-color: var(--color-border, #e2e8f0);
    }

    button.secondary:hover:enabled {
      border-color: var(--color-text-secondary, #64748b);
    }

    button.danger {
      background-color: var(--color-danger, #dc2626);
      color: var(--color-primary-contrast, #ffffff);
    }

    button.danger:hover:enabled {
      background-color: var(--color-danger-hover, #b91c1c);
    }

    button.contrast {
      background-color: var(--color-surface, #ffffff);
      color: var(--color-primary, #2563eb);
    }

    button.contrast:hover:enabled {
      background-color: var(--color-background, #f1f5f9);
    }

    button.outline-primary {
      background-color: var(--color-surface, #ffffff);
      color: var(--color-primary, #2563eb);
      border-color: var(--color-primary, #2563eb);
    }

    button.outline-primary:hover:enabled {
      background-color: var(--color-background, #f1f5f9);
    }

    button.outline-danger {
      background-color: var(--color-surface, #ffffff);
      color: var(--color-danger, #dc2626);
      border-color: var(--color-danger, #dc2626);
    }

    button.outline-danger:hover:enabled {
      background-color: var(--color-background, #f1f5f9);
    }
  `;
	}
	render() {
		return D`
      <button
        type="button"
        class=${[
			this.variant,
			this.small ? "small" : "",
			this.pill ? "pill" : "",
			this.iconOnly ? "icon-only" : ""
		].filter((e) => e !== "").join(" ")}
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel ?? k}
      >
        <slot></slot>
      </button>
    `;
	}
};
H([R({ type: String })], K.prototype, "variant", void 0), H([R({ type: Boolean })], K.prototype, "small", void 0), H([R({ type: Boolean })], K.prototype, "pill", void 0), H([R({
	type: Boolean,
	attribute: "icon-only"
})], K.prototype, "iconOnly", void 0), H([R({
	type: Boolean,
	reflect: !0
})], K.prototype, "disabled", void 0), H([R({
	type: String,
	attribute: "aria-label"
})], K.prototype, "ariaLabel", void 0), K = H([L("ui-button")], K);
//#endregion
//#region src/ui/ui-toast.ts
var Be = 3e3, q = class extends I {
	constructor(...e) {
		super(...e), this.message = "", this.durationMs = Be;
	}
	static {
		this.styles = o`
    .toast {
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 18px;
      border-radius: 8px;
      border: 1px solid var(--color-success, #16a34a);
      background-color: var(--color-success-surface, #f0fdf4);
      color: var(--color-text-primary, #111111);
      z-index: 200;
    }

    .toast-icon {
      color: var(--color-success, #16a34a);
      font-weight: 700;
    }

    .toast-close-button {
      border: none;
      background: none;
      padding: 2px;
      cursor: pointer;
      color: var(--color-text-secondary, #64748b);
      font-size: 15.2px;
    }
  `;
	}
	updated(e) {
		e.has("message") && (window.clearTimeout(this.dismissTimeoutIdentifier), this.message !== "" && (this.dismissTimeoutIdentifier = window.setTimeout(() => {
			this.dispatchDismissed();
		}, this.durationMs)));
	}
	disconnectedCallback() {
		super.disconnectedCallback(), window.clearTimeout(this.dismissTimeoutIdentifier);
	}
	render() {
		return this.message === "" ? k : D`
      <div class="toast" role="status">
        <span class="toast-icon">✓</span>
        <span>${this.message}</span>
        <button
          type="button"
          class="toast-close-button"
          aria-label="Dismiss notification"
          @click=${this.handleCloseClick}
        >
          ✕
        </button>
      </div>
    `;
	}
	handleCloseClick() {
		window.clearTimeout(this.dismissTimeoutIdentifier), this.dispatchDismissed();
	}
	dispatchDismissed() {
		this.dispatchEvent(new CustomEvent("toast-dismissed", {
			bubbles: !0,
			composed: !0
		}));
	}
};
H([R({ type: String })], q.prototype, "message", void 0), H([R({
	type: Number,
	attribute: "duration-ms"
})], q.prototype, "durationMs", void 0), q = H([L("ui-toast")], q);
//#endregion
//#region src/widgets/employee/employee-form.ts
var J = {
	FULL_NAME: "fullName",
	DEPARTMENT: "department",
	DESIGNATION: "designation",
	EMAIL_ADDRESS: "emailAddress"
}, Y = class extends I {
	constructor(...e) {
		super(...e), this.employeeToEdit = null, this.draftFullName = "", this.draftDepartment = "", this.draftDesignation = "", this.draftEmailAddress = "", this.toastMessage = "";
	}
	static {
		this.styles = o`
    :host {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-fields {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .form-fields ui-input {
      flex: 1 1 200px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `;
	}
	willUpdate(e) {
		e.has("employeeToEdit") && this.employeeToEdit !== null && (this.draftFullName = this.employeeToEdit.fullName, this.draftDepartment = this.employeeToEdit.department, this.draftDesignation = this.employeeToEdit.designation, this.draftEmailAddress = this.employeeToEdit.emailAddress);
	}
	render() {
		return D`
      ${this.renderFormFields()}
      ${this.renderFormActions()}
      ${this.renderToast()}
    `;
	}
	renderFormFields() {
		return D`
      <div class="form-fields">
        <ui-input
          name=${J.FULL_NAME}
          placeholder="Full Name"
          required
          .value=${this.draftFullName}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderPersonIcon()}
        </ui-input>
        <ui-input
          name=${J.DEPARTMENT}
          placeholder="Department"
          required
          .value=${this.draftDepartment}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderBuildingIcon()}
        </ui-input>
        <ui-input
          name=${J.DESIGNATION}
          placeholder="Designation"
          .value=${this.draftDesignation}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderBadgeIcon()}
        </ui-input>
        <ui-input
          name=${J.EMAIL_ADDRESS}
          type="email"
          placeholder="Email"
          required
          .value=${this.draftEmailAddress}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderMailIcon()}
        </ui-input>
      </div>
    `;
	}
	renderFormActions() {
		return D`
      <div class="form-actions">
        <ui-button
          .variant=${G.PRIMARY}
          @click=${this.handleSaveClick}
        >
          ${this.employeeToEdit === null ? "Save" : "Update"}
        </ui-button>
        <ui-button
          .variant=${G.SECONDARY}
          @click=${this.handleClearClick}
        >
          Clear
        </ui-button>
      </div>
    `;
	}
	renderToast() {
		return D`
      <ui-toast
        .message=${this.toastMessage}
        @toast-dismissed=${this.handleToastDismissed}
      ></ui-toast>
    `;
	}
	renderPersonIcon() {
		return D`
      <svg
        slot="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    `;
	}
	renderBuildingIcon() {
		return D`
      <svg
        slot="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 10h.01M9 14h.01M15 10h.01M15 14h.01" />
      </svg>
    `;
	}
	renderBadgeIcon() {
		return D`
      <svg
        slot="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M15 8h4M15 12h4M7 16h10" />
      </svg>
    `;
	}
	renderMailIcon() {
		return D`
      <svg
        slot="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    `;
	}
	handleFieldValueChanged(e) {
		let t = e.detail;
		if (!t) return;
		let { name: n, value: r } = t;
		switch (n) {
			case J.FULL_NAME:
				this.draftFullName = r;
				break;
			case J.DEPARTMENT:
				this.draftDepartment = r;
				break;
			case J.DESIGNATION:
				this.draftDesignation = r;
				break;
			case J.EMAIL_ADDRESS: this.draftEmailAddress = r;
		}
	}
	handleSaveClick() {
		if (!this.validateForm()) return;
		let e = this.employeeToEdit, t = e !== null, n = this.draftFullName.trim(), r = this.draftDepartment.trim(), i = this.draftDesignation.trim(), a = this.draftEmailAddress.trim(), o = e === null ? {
			fullName: n,
			department: r,
			designation: i,
			emailAddress: a
		} : {
			identifier: e.identifier,
			fullName: n,
			department: r,
			designation: i,
			emailAddress: a
		}, { employee: s, isNew: c } = V.save(o, t);
		this.dispatchEvent(new CustomEvent("employee-save", {
			detail: { employee: s },
			bubbles: !0,
			composed: !0
		})), this.dispatchEvent(new CustomEvent(c ? "employee-added" : "employee-updated", {
			detail: { employee: s },
			bubbles: !0,
			composed: !0
		})), this.showToast(c ? "Employee added successfully!" : "Employee updated successfully!"), this.employeeToEdit = null, this.clearFormFields();
	}
	handleClearClick() {
		this.clearFormFields(), this.dispatchEvent(new CustomEvent("form-cleared", {
			bubbles: !0,
			composed: !0
		}));
	}
	clearFormFields() {
		if (this.draftFullName = "", this.draftDepartment = "", this.draftDesignation = "", this.draftEmailAddress = "", this.inputElements) for (let e of this.inputElements) e.clear();
	}
	validateForm() {
		if (!this.inputElements || this.inputElements.length === 0) return !0;
		let e = !0;
		for (let t of this.inputElements) t.validate() || (e = !1);
		return e;
	}
	showToast(e) {
		this.toastMessage = e;
	}
	handleToastDismissed() {
		this.toastMessage = "";
	}
};
H([R({ attribute: !1 })], Y.prototype, "employeeToEdit", void 0), H([z()], Y.prototype, "draftFullName", void 0), H([z()], Y.prototype, "draftDepartment", void 0), H([z()], Y.prototype, "draftDesignation", void 0), H([z()], Y.prototype, "draftEmailAddress", void 0), H([z()], Y.prototype, "toastMessage", void 0), H([Ne("ui-input")], Y.prototype, "inputElements", void 0), Y = H([L("employee-form")], Y);
//#endregion
//#region src/ui/ui-dialog.ts
var Ve = "dialog-heading", X = class extends I {
	constructor(...e) {
		super(...e), this.open = !1, this.heading = "", this.confirmLabel = "Confirm", this.cancelLabel = "Cancel";
	}
	static {
		this.styles = o`
    .dialog-backdrop {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background-color: var(--color-backdrop, rgb(0 0 0 / 0.45));
      z-index: 100;
    }

    .dialog-panel {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      max-width: 420px;
      padding: 24px;
      box-sizing: border-box;
      background-color: var(--color-surface, #ffffff);
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 10px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .dialog-heading {
      margin: 0;
      font-size: 18.4px;
      color: var(--color-text-primary, #111111);
    }

    .dialog-close-button {
      border: none;
      background: none;
      padding: 4px;
      font-size: 17.6px;
      cursor: pointer;
      color: var(--color-text-secondary, #64748b);
    }

    .dialog-body {
      color: var(--color-text-secondary, #64748b);
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `;
	}
	render() {
		return this.open ? D`
      <div class="dialog-backdrop" @click=${this.handleCancel}>
        <div
          class="dialog-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby=${Ve}
          @click=${this.handlePanelClick}
        >
          ${this.renderDialogHeader()}
          <div class="dialog-body"><slot></slot></div>
          ${this.renderDialogActions()}
        </div>
      </div>
    ` : k;
	}
	renderDialogHeader() {
		return D`
      <div class="dialog-header">
        <h2 class="dialog-heading" id=${Ve}>${this.heading}</h2>
        <button
          type="button"
          class="dialog-close-button"
          aria-label="Close dialog"
          @click=${this.handleCancel}
        >
          ✕
        </button>
      </div>
    `;
	}
	renderDialogActions() {
		return D`
      <div class="dialog-actions">
        <ui-button
          .variant=${G.SECONDARY}
          @click=${this.handleCancel}
        >
          ${this.cancelLabel}
        </ui-button>
        <ui-button
          .variant=${G.DANGER}
          @click=${this.handleConfirm}
        >
          ${this.confirmLabel}
        </ui-button>
      </div>
    `;
	}
	handlePanelClick(e) {
		e.stopPropagation();
	}
	handleCancel() {
		this.dispatchEvent(new CustomEvent("dialog-cancel", {
			bubbles: !0,
			composed: !0
		}));
	}
	handleConfirm() {
		this.dispatchEvent(new CustomEvent("dialog-confirm", {
			bubbles: !0,
			composed: !0
		}));
	}
};
H([R({ type: Boolean })], X.prototype, "open", void 0), H([R({ type: String })], X.prototype, "heading", void 0), H([R({
	type: String,
	attribute: "confirm-label"
})], X.prototype, "confirmLabel", void 0), H([R({
	type: String,
	attribute: "cancel-label"
})], X.prototype, "cancelLabel", void 0), X = H([L("ui-dialog")], X);
//#endregion
//#region src/widgets/employee/employee-table.ts
var Z = class extends I {
	constructor(...e) {
		super(...e), this.employees = null, this.serviceEmployees = [], this.searchTerm = "", this.currentPageNumber = 1, this.employeePendingDeletion = null, this.toastMessage = "", this.pageSize = 5;
	}
	static {
		this.styles = o`
    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .table-toolbar {
      display: flex;
      justify-content: flex-end;
    }

    .search-field {
      flex: 0 1 260px;
    }

    .table-scroll {
      overflow-x: auto;
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 8px;
    }

    .table-grid {
      display: flex;
      flex-direction: column;
      min-width: 640px;
    }

    .employee-row,
    .employee-header-row {
      display: grid;
      grid-template-columns: 2.2fr 1.5fr 1.5fr 2.2fr 1.2fr;
      gap: 16px;
      align-items: center;
      padding: 12px 16px;
    }

    .employee-header-row {
      font-weight: 600;
      font-size: 14.4px;
      color: var(--color-text-secondary, #64748b);
      background-color: var(--color-background, #f1f5f9);
      border-bottom: 1px solid var(--color-border, #e2e8f0);
    }

    .employee-row {
      background-color: var(--color-surface, #ffffff);
    }

    .employee-row + .employee-row {
      border-top: 1px solid var(--color-border, #e2e8f0);
    }

    .cell-value {
      color: var(--color-text-primary, #111111);
      overflow-wrap: anywhere;
    }

    .employee-identity {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .employee-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: var(--color-primary, #2563eb);
      color: var(--color-primary-contrast, #ffffff);
      font-size: 11.52px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 40px 16px;
      text-align: center;
      border: 1px dashed var(--color-border, #e2e8f0);
      border-radius: 8px;
    }

    .empty-state-icon {
      font-size: 38.4px;
    }

    .empty-state-title {
      margin: 0;
      font-size: 16.8px;
      color: var(--color-text-primary, #111111);
    }

    .empty-state-description {
      margin: 0 0 8px;
      color: var(--color-text-secondary, #64748b);
    }

    .table-footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      color: var(--color-text-secondary, #64748b);
      font-size: 14.4px;
    }

    .pagination-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback(), this.unsubscribeService = V.subscribe((e) => {
			this.serviceEmployees = e;
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribeService && this.unsubscribeService();
	}
	get activeEmployees() {
		return this.employees === null ? this.serviceEmployees : this.employees;
	}
	render() {
		let e = this.computeFilteredEmployees();
		return D`
      ${this.renderTableToolbar()}
      ${this.renderTableBody(e)}
      ${this.renderDeleteConfirmationDialog()}
      ${this.renderToast()}
    `;
	}
	renderTableToolbar() {
		return D`
      <div class="table-toolbar">
        <ui-input
          class="search-field"
          name="searchTerm"
          placeholder="Search employees..."
          aria-label="Search employees"
          .value=${this.searchTerm}
          @value-changed=${this.handleSearchValueChanged}
        >
          ${this.renderSearchIcon()}
        </ui-input>
      </div>
    `;
	}
	renderTableBody(e) {
		if (this.activeEmployees.length === 0) return this.renderEmptyState();
		if (e.length === 0) return this.renderNoSearchMatches();
		let t = Math.max(1, Math.ceil(e.length / this.pageSize)), n = Math.min(this.currentPageNumber, t), r = (n - 1) * this.pageSize, i = e.slice(r, r + this.pageSize);
		return D`
      <div class="table-scroll">
        <div class="table-grid">
          ${this.renderHeaderRow()}
          ${i.map((e) => this.renderEmployeeRow(e))}
        </div>
      </div>
      ${this.renderTableFooter(e.length, r, i.length, t, n)}
    `;
	}
	renderHeaderRow() {
		return D`
      <div class="employee-header-row">
        <span>Name</span>
        <span>Department</span>
        <span>Designation</span>
        <span>Email</span>
        <span>Actions</span>
      </div>
    `;
	}
	renderEmployeeRow(e) {
		return D`
      <div class="employee-row">
        <span class="cell-value employee-identity">
          <span class="employee-avatar">
            ${this.computeInitials(e.fullName)}
          </span>
          ${e.fullName}
        </span>
        <span class="cell-value">${e.department}</span>
        <span class="cell-value">${e.designation}</span>
        <span class="cell-value">${e.emailAddress}</span>
        <span class="action-buttons">
          <ui-button
            .variant=${G.OUTLINE_PRIMARY}
            small
            icon-only
            aria-label="Edit employee"
            @click=${() => this.handleEditClick(e)}
          >
            ${this.renderPencilIcon()}
          </ui-button>
          <ui-button
            .variant=${G.OUTLINE_DANGER}
            small
            icon-only
            aria-label="Delete employee"
            @click=${() => this.handleDeleteClick(e)}
          >
            ${this.renderTrashIcon()}
          </ui-button>
        </span>
      </div>
    `;
	}
	renderEmptyState() {
		return D`
      <div class="empty-state">
        <span class="empty-state-icon">📁</span>
        <h3 class="empty-state-title">No employees found</h3>
        <p class="empty-state-description">
          Add your first employee to get started.
        </p>
        <ui-button
          .variant=${G.PRIMARY}
          @click=${this.handleAddEmployeeClick}
        >
          + Add Employee
        </ui-button>
      </div>
    `;
	}
	renderNoSearchMatches() {
		return D`
      <div class="empty-state">
        <span class="empty-state-icon">🔍</span>
        <h3 class="empty-state-title">No employees match your search</h3>
        <p class="empty-state-description">
          Try a different search term.
        </p>
      </div>
    `;
	}
	renderTableFooter(e, t, n, r, i) {
		return D`
      <div class="table-footer">
        <span>
          Showing ${t + 1} to ${t + n}
          of ${e} employees
        </span>
        <span class="pagination-controls">
          <ui-button
            .variant=${G.SECONDARY}
            small
            pill
            .disabled=${i === 1}
            @click=${() => this.handlePageChange(i - 1)}
          >
            ‹
          </ui-button>
          ${Array.from({ length: r }, (e, t) => t + 1).map((e) => D`
              <ui-button
                .variant=${e === i ? G.PRIMARY : G.SECONDARY}
                small
                pill
                @click=${() => this.handlePageChange(e)}
              >
                ${e}
              </ui-button>
            `)}
          <ui-button
            .variant=${G.SECONDARY}
            small
            pill
            .disabled=${i === r}
            @click=${() => this.handlePageChange(i + 1)}
          >
            ›
          </ui-button>
        </span>
      </div>
    `;
	}
	renderSearchIcon() {
		return D`
      <svg
        slot="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    `;
	}
	renderPencilIcon() {
		return D`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    `;
	}
	renderTrashIcon() {
		return D`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="m19 6-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
      </svg>
    `;
	}
	renderToast() {
		return D`
      <ui-toast
        .message=${this.toastMessage}
        @toast-dismissed=${this.handleToastDismissed}
      ></ui-toast>
    `;
	}
	computeFilteredEmployees() {
		let e = this.searchTerm.trim().toLowerCase();
		return e === "" ? this.activeEmployees : this.activeEmployees.filter((t) => t.fullName.toLowerCase().includes(e) || t.department.toLowerCase().includes(e) || t.designation.toLowerCase().includes(e) || t.emailAddress.toLowerCase().includes(e));
	}
	computeInitials(e) {
		return e.split(" ").filter((e) => e !== "").slice(0, 2).map((e) => e[0].toUpperCase()).join("");
	}
	handleSearchValueChanged(e) {
		this.searchTerm = e.detail.value, this.currentPageNumber = 1;
	}
	handlePageChange(e) {
		this.currentPageNumber = e;
	}
	handleEditClick(e) {
		this.dispatchEvent(new CustomEvent("employee-edit-request", {
			detail: { employee: e },
			bubbles: !0,
			composed: !0
		}));
	}
	handleDeleteClick(e) {
		this.employeePendingDeletion = e;
	}
	handleDeleteConfirmed() {
		let e = this.employeePendingDeletion;
		e !== null && (this.employeePendingDeletion = null, V.delete(e.identifier), this.dispatchEvent(new CustomEvent("employee-delete", {
			detail: { employee: e },
			bubbles: !0,
			composed: !0
		})), this.dispatchEvent(new CustomEvent("employee-deleted", {
			detail: { employee: e },
			bubbles: !0,
			composed: !0
		})), this.showToast("Employee deleted successfully!"));
	}
	handleDeleteCancelled() {
		this.employeePendingDeletion = null;
	}
	renderDeleteConfirmationDialog() {
		return D`
      <ui-dialog
        .open=${this.employeePendingDeletion !== null}
        heading="Delete Employee"
        confirm-label="Delete"
        cancel-label="Cancel"
        @dialog-confirm=${this.handleDeleteConfirmed}
        @dialog-cancel=${this.handleDeleteCancelled}
      >
        Are you sure you want to delete
        <strong>${this.employeePendingDeletion?.fullName}</strong>?
      </ui-dialog>
    `;
	}
	handleAddEmployeeClick() {
		this.dispatchEvent(new CustomEvent("employee-add-request", {
			bubbles: !0,
			composed: !0
		}));
	}
	showToast(e) {
		this.toastMessage = e;
	}
	handleToastDismissed() {
		this.toastMessage = "";
	}
};
H([R({ attribute: !1 })], Z.prototype, "employees", void 0), H([z()], Z.prototype, "serviceEmployees", void 0), H([z()], Z.prototype, "searchTerm", void 0), H([z()], Z.prototype, "currentPageNumber", void 0), H([z()], Z.prototype, "employeePendingDeletion", void 0), H([z()], Z.prototype, "toastMessage", void 0), Z = H([L("employee-table")], Z);
//#endregion
//#region src/widgets/employee/employee-widget.ts
var Q = class extends I {
	static {
		this.styles = o`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 960px;
      box-sizing: border-box;
      gap: 24px;
    }

    .content-card {
      width: 100%;
      box-sizing: border-box;
      padding: 24px;
      background-color: var(--color-surface, #ffffff);
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 10px;
    }
  `;
	}
	render() {
		return D`
      ${this.renderFormCard()}
      ${this.renderTableCard()}
    `;
	}
	renderFormCard() {
		return D`
      <section class="content-card">
        <employee-form @form-cleared=${this.handleFormCleared}></employee-form>
      </section>
    `;
	}
	renderTableCard() {
		return D`
      <section class="content-card">
        <employee-table
          @employee-edit-request=${this.handleEmployeeEditRequest}
          @employee-deleted=${this.handleEmployeeDeleted}
          @employee-add-request=${this.handleAddEmployeeRequest}
        ></employee-table>
      </section>
    `;
	}
	handleEmployeeDeleted(e) {
		this.employeeFormElement.employeeToEdit?.identifier === e.detail.employee.identifier && (this.employeeFormElement.employeeToEdit = null);
	}
	handleEmployeeEditRequest(e) {
		this.employeeFormElement.employeeToEdit = e.detail.employee, this.scrollFormIntoView();
	}
	handleFormCleared() {
		this.employeeFormElement.employeeToEdit = null;
	}
	handleAddEmployeeRequest() {
		this.employeeFormElement.employeeToEdit = null, this.scrollFormIntoView();
	}
	scrollFormIntoView() {
		this.employeeFormElement.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
};
H([je("employee-form")], Q.prototype, "employeeFormElement", void 0), Q = H([L("employee-widget")], Q);
//#endregion
//#region src/app-shell.ts
var $ = class extends I {
	constructor(...e) {
		super(...e), this.lastEmittedEventName = "";
	}
	static {
		this.styles = o`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      padding: 32px 16px;
    }

    .application-header {
      width: 100%;
      max-width: 960px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 24px;
      border-radius: 10px;
      background: linear-gradient(
        135deg,
        var(--color-primary, #2563eb),
        var(--color-primary-hover, #1d4ed8)
      );
      color: var(--color-primary-contrast, #ffffff);
    }

    .header-title {
      margin: 0;
      font-size: 25.6px;
    }

    .header-subtitle {
      margin: 4px 0 0;
      font-size: 15.2px;
      opacity: 0.85;
    }

    .events-strip {
      width: 100%;
      max-width: 960px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px 16px;
      padding: 12px 16px;
      border: 1px dashed var(--color-border, #e2e8f0);
      border-radius: 8px;
      color: var(--color-text-secondary, #64748b);
      font-size: 13.6px;
    }

    .last-event {
      color: var(--color-primary, #2563eb);
      font-weight: 600;
    }
  `;
	}
	render() {
		return D`
      ${this.renderApplicationHeader()}
      ${this.renderWidgets()}
      ${this.renderEventsStrip()}
    `;
	}
	renderApplicationHeader() {
		return D`
      <header class="application-header">
        <div>
          <h1 class="header-title">Employee Management</h1>
          <p class="header-subtitle">Manage your organization employees</p>
        </div>
      </header>
    `;
	}
	renderWidgets() {
		return D`
      <employee-widget
        @employee-added=${this.handleEmployeeAdded}
        @employee-updated=${this.handleEmployeeUpdated}
        @employee-deleted=${this.handleEmployeeDeleted}
      ></employee-widget>
    `;
	}
	renderEventsStrip() {
		return D`
      <footer class="events-strip">
        <span>
          Events: employee-added, employee-updated, employee-deleted
        </span>
        ${this.lastEmittedEventName === "" ? k : D`<span class="last-event">
              Last event: ${this.lastEmittedEventName}
            </span>`}
      </footer>
    `;
	}
	handleEmployeeAdded(e) {
		this.lastEmittedEventName = "employee-added";
	}
	handleEmployeeUpdated(e) {
		this.lastEmittedEventName = "employee-updated";
	}
	handleEmployeeDeleted(e) {
		this.lastEmittedEventName = "employee-deleted";
	}
};
//#endregion
//#region src/employee-app.ts
H([z()], $.prototype, "lastEmittedEventName", void 0), $ = H([L("app-shell")], $), customElements.get("employee-app") || customElements.define("employee-app", class extends $ {});
//#endregion
export { $ as AppShell, $ as EmployeeApp };
