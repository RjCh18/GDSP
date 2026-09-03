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
}, h = (e, t) => !l(e, t), g = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	useDefault: !1,
	hasChanged: h
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var _ = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = g) {
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
		return this.elementProperties.get(e) ?? g;
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
_.elementStyles = [], _.shadowRootOptions = { mode: "open" }, _[p("elementProperties")] = /* @__PURE__ */ new Map(), _[p("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: _ }), (f.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var v = globalThis, y = (e) => e, b = v.trustedTypes, oe = b ? b.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, se = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, ce = "?" + x, le = `<${ce}>`, S = document, C = () => S.createComment(""), w = (e) => e === null || typeof e != "object" && typeof e != "function", T = Array.isArray, ue = (e) => T(e) || typeof e?.[Symbol.iterator] == "function", E = "[ 	\n\f\r]", D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, de = /-->/g, O = />/g, k = RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), fe = /'/g, A = /"/g, j = /^(?:script|style|textarea|title)$/i, M = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), N = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), pe = /* @__PURE__ */ new WeakMap(), F = S.createTreeWalker(S, 129);
function I(e, t) {
	if (!T(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return oe === void 0 ? t : oe.createHTML(t);
}
var me = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = D;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === D ? c[1] === "!--" ? o = de : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = k) : (j.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = k) : o = O : o === k ? c[0] === ">" ? (o = i ?? D, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? k : c[3] === "\"" ? A : fe) : o === A || o === fe ? o = k : o === de || o === O ? o = D : (o = k, i = void 0);
		let d = o === k && e[t + 1].startsWith("/>") ? " " : "";
		a += o === D ? n + le : l >= 0 ? (r.push(s), n.slice(0, l) + se + n.slice(l) + x + d) : n + x + (l === -2 ? t : d);
	}
	return [I(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, L = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = me(t, n);
		if (this.el = e.createElement(l, r), F.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = F.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(se)) {
					let t = u[o++], n = i.getAttribute(e).split(x), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? ge : r[1] === "?" ? _e : r[1] === "@" ? ve : B
					}), i.removeAttribute(e);
				} else e.startsWith(x) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (j.test(i.tagName)) {
					let e = i.textContent.split(x), t = e.length - 1;
					if (t > 0) {
						i.textContent = b ? b.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], C()), F.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], C());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === ce) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(x, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += x.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = S.createElement("template");
		return n.innerHTML = e, n;
	}
};
function R(e, t, n = e, r) {
	if (t === N) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = w(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = R(e, i._$AS(e, t.values), i, r)), t;
}
var he = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? S).importNode(t, !0);
		F.currentNode = r;
		let i = F.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new z(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new ye(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = F.nextNode(), a++);
		}
		return F.currentNode = S, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, z = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = R(this, e, t), w(e) ? e === P || e == null || e === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : e !== this._$AH && e !== N && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ue(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== P && w(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = L.createElement(I(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new he(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = pe.get(e.strings);
		return t === void 0 && pe.set(e.strings, t = new L(e)), t;
	}
	k(t) {
		T(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(C()), this.O(C()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = y(e).nextSibling;
			y(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, B = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = P, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = P;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = R(this, e, t, 0), a = !w(e) || e !== this._$AH && e !== N, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = R(this, r[n + o], t, o), s === N && (s = this._$AH[o]), a ||= !w(s) || s !== this._$AH[o], s === P ? e = P : e !== P && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, ge = class extends B {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === P ? void 0 : e;
	}
}, _e = class extends B {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== P);
	}
}, ve = class extends B {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = R(this, e, t, 0) ?? P) === N) return;
		let n = this._$AH, r = e === P && n !== P || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== P && (n === P || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, ye = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		R(this, e);
	}
}, be = v.litHtmlPolyfillSupport;
be?.(L, z), (v.litHtmlVersions ??= []).push("3.3.3");
var xe = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new z(t.insertBefore(C(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, V = globalThis, H = class extends _ {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = xe(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return N;
	}
};
H._$litElement$ = !0, H.finalized = !0, V.litElementHydrateSupport?.({ LitElement: H });
var Se = V.litElementPolyfillSupport;
Se?.({ LitElement: H }), (V.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var U = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Ce = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	hasChanged: h
}, we = (e = Ce, t, n) => {
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
function W(e) {
	return (t, n) => typeof n == "object" ? we(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function G(e) {
	return W({
		...e,
		state: !0,
		attribute: !1
	});
}
var K = new class {
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
		let t = {
			identifier: this.employees.reduce((e, t) => Math.max(e, t.identifier), 0) + 1,
			fullName: e.fullName,
			department: e.department,
			designation: e.designation || "",
			emailAddress: e.emailAddress
		};
		return this.employees = [...this.employees, t], this.notify(), t;
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
	save(e) {
		return e.identifier === 0 ? {
			employee: this.add(e),
			isNew: !0
		} : {
			employee: this.update(e) ?? e,
			isNew: !1
		};
	}
	clear() {
		this.employees = [], this.notify();
	}
}();
//#endregion
//#region \0@oxc-project+runtime@0.146.0/helpers/esm/decorate.js
function q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/ui/ui-input.ts
var J = class extends H {
	constructor(...e) {
		super(...e), this.label = "", this.name = "", this.type = "text", this.value = "", this.placeholder = "", this.required = !1, this.errorMessage = "";
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
      font-size: 0.9rem;
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
      font-size: 0.95rem;
    }

    input::placeholder {
      color: var(--color-text-secondary, #64748b);
    }

    .error-text {
      margin: 0;
      font-size: 0.8rem;
      color: var(--color-danger, #dc2626);
    }
  `;
	}
	render() {
		return M`
      ${this.renderLabel()}
      ${this.renderInputField()}
      ${this.renderErrorText()}
    `;
	}
	renderLabel() {
		return this.label === "" ? P : M`
      <label for="input-field">
        ${this.label}${this.required ? M`<span class="required-marker"> *</span>` : P}
      </label>
    `;
	}
	renderInputField() {
		return M`
      <div class="input-wrapper ${this.errorMessage === "" ? "" : "invalid"}">
        <slot name="icon"></slot>
        <input
          id="input-field"
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.handleInput}
        />
      </div>
    `;
	}
	renderErrorText() {
		return this.errorMessage === "" ? P : M`<p class="error-text">${this.errorMessage}</p>`;
	}
	handleInput(e) {
		let t = e.target;
		this.value = t.value, this.dispatchEvent(new CustomEvent("value-changed", {
			detail: {
				name: this.name,
				value: t.value
			},
			bubbles: !0,
			composed: !0
		}));
	}
};
q([W({ type: String })], J.prototype, "label", void 0), q([W({ type: String })], J.prototype, "name", void 0), q([W({ type: String })], J.prototype, "type", void 0), q([W({ type: String })], J.prototype, "value", void 0), q([W({ type: String })], J.prototype, "placeholder", void 0), q([W({ type: Boolean })], J.prototype, "required", void 0), q([W({
	type: String,
	attribute: "error-message"
})], J.prototype, "errorMessage", void 0), J = q([U("ui-input")], J);
//#endregion
//#region src/ui/ui-button.ts
var Y = class extends H {
	constructor(...e) {
		super(...e), this.variant = "primary", this.small = !1, this.pill = !1, this.iconOnly = !1, this.disabled = !1;
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
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease, border-color 0.15s ease;
    }

    button.small {
      padding: 6px 12px;
      font-size: 0.85rem;
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
		return M`
      <button type="button" class=${[
			this.variant,
			this.small ? "small" : "",
			this.pill ? "pill" : "",
			this.iconOnly ? "icon-only" : ""
		].filter((e) => e !== "").join(" ")} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
	}
};
q([W({ type: String })], Y.prototype, "variant", void 0), q([W({ type: Boolean })], Y.prototype, "small", void 0), q([W({ type: Boolean })], Y.prototype, "pill", void 0), q([W({
	type: Boolean,
	attribute: "icon-only"
})], Y.prototype, "iconOnly", void 0), q([W({ type: Boolean })], Y.prototype, "disabled", void 0), Y = q([U("ui-button")], Y);
//#endregion
//#region src/components/employee-form.ts
var X = class extends H {
	constructor(...e) {
		super(...e), this.employeeToEdit = null, this.draftFullName = "", this.draftDepartment = "", this.draftDesignation = "", this.draftEmailAddress = "", this.errorMessages = {
			fullName: "",
			department: "",
			emailAddress: ""
		};
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
		e.has("employeeToEdit") && this.employeeToEdit !== null && (this.draftFullName = this.employeeToEdit.fullName, this.draftDepartment = this.employeeToEdit.department, this.draftDesignation = this.employeeToEdit.designation, this.draftEmailAddress = this.employeeToEdit.emailAddress, this.errorMessages = {
			fullName: "",
			department: "",
			emailAddress: ""
		});
	}
	render() {
		return M`
      ${this.renderFormFields()}
      ${this.renderFormActions()}
    `;
	}
	renderFormFields() {
		return M`
      <div class="form-fields">
        <ui-input
          name="fullName"
          placeholder="Full Name"
          required
          .value=${this.draftFullName}
          error-message=${this.errorMessages.fullName}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderPersonIcon()}
        </ui-input>
        <ui-input
          name="department"
          placeholder="Department"
          required
          .value=${this.draftDepartment}
          error-message=${this.errorMessages.department}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderBuildingIcon()}
        </ui-input>
        <ui-input
          name="designation"
          placeholder="Designation"
          .value=${this.draftDesignation}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderBadgeIcon()}
        </ui-input>
        <ui-input
          name="emailAddress"
          type="email"
          placeholder="Email"
          required
          .value=${this.draftEmailAddress}
          error-message=${this.errorMessages.emailAddress}
          @value-changed=${this.handleFieldValueChanged}
        >
          ${this.renderMailIcon()}
        </ui-input>
      </div>
    `;
	}
	renderFormActions() {
		return M`
      <div class="form-actions">
        <ui-button variant="primary" @click=${this.handleSaveClick}>
          ${this.employeeToEdit === null ? "Save" : "Update"}
        </ui-button>
        <ui-button variant="secondary" @click=${this.handleClearClick}>
          Clear
        </ui-button>
      </div>
    `;
	}
	renderPersonIcon() {
		return M`
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
		return M`
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
		return M`
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
		return M`
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
		let { name: t, value: n } = e.detail;
		t === "fullName" ? this.draftFullName = n : t === "department" ? this.draftDepartment = n : t === "designation" ? this.draftDesignation = n : t === "emailAddress" && (this.draftEmailAddress = n);
	}
	handleSaveClick() {
		if (!this.validateForm()) return;
		let e = {
			identifier: this.employeeToEdit === null ? 0 : this.employeeToEdit.identifier,
			fullName: this.draftFullName.trim(),
			department: this.draftDepartment.trim(),
			designation: this.draftDesignation.trim(),
			emailAddress: this.draftEmailAddress.trim()
		}, { employee: t, isNew: n } = K.save(e);
		this.dispatchEvent(new CustomEvent("employee-save", {
			detail: { employee: t },
			bubbles: !0,
			composed: !0
		})), this.dispatchEvent(new CustomEvent(n ? "employee-added" : "employee-updated", {
			detail: { employee: t },
			bubbles: !0,
			composed: !0
		})), this.employeeToEdit = null, this.clearFormFields();
	}
	handleClearClick() {
		this.clearFormFields(), this.dispatchEvent(new CustomEvent("form-cleared", {
			bubbles: !0,
			composed: !0
		}));
	}
	clearFormFields() {
		this.draftFullName = "", this.draftDepartment = "", this.draftDesignation = "", this.draftEmailAddress = "", this.errorMessages = {
			fullName: "",
			department: "",
			emailAddress: ""
		};
	}
	validateForm() {
		let e = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, t = {
			fullName: "",
			department: "",
			emailAddress: ""
		};
		return this.draftFullName.trim() === "" && (t.fullName = "Name is required"), this.draftDepartment.trim() === "" && (t.department = "Department is required"), this.draftEmailAddress.trim() === "" ? t.emailAddress = "Email is required" : e.test(this.draftEmailAddress.trim()) || (t.emailAddress = "Enter a valid email"), this.errorMessages = t, t.fullName === "" && t.department === "" && t.emailAddress === "";
	}
};
q([W({ attribute: !1 })], X.prototype, "employeeToEdit", void 0), q([G()], X.prototype, "draftFullName", void 0), q([G()], X.prototype, "draftDepartment", void 0), q([G()], X.prototype, "draftDesignation", void 0), q([G()], X.prototype, "draftEmailAddress", void 0), q([G()], X.prototype, "errorMessages", void 0), X = q([U("employee-form")], X);
//#endregion
//#region src/ui/ui-dialog.ts
var Z = class extends H {
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
      font-size: 1.15rem;
      color: var(--color-text-primary, #111111);
    }

    .dialog-close-button {
      border: none;
      background: none;
      padding: 4px;
      font-size: 1.1rem;
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
		return this.open ? M`
      <div class="dialog-backdrop" @click=${this.handleCancel}>
        <div class="dialog-panel" @click=${this.handlePanelClick}>
          ${this.renderDialogHeader()}
          <div class="dialog-body"><slot></slot></div>
          ${this.renderDialogActions()}
        </div>
      </div>
    ` : P;
	}
	renderDialogHeader() {
		return M`
      <div class="dialog-header">
        <h2 class="dialog-heading">${this.heading}</h2>
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
		return M`
      <div class="dialog-actions">
        <ui-button variant="secondary" @click=${this.handleCancel}>
          ${this.cancelLabel}
        </ui-button>
        <ui-button variant="danger" @click=${this.handleConfirm}>
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
q([W({ type: Boolean })], Z.prototype, "open", void 0), q([W({ type: String })], Z.prototype, "heading", void 0), q([W({
	type: String,
	attribute: "confirm-label"
})], Z.prototype, "confirmLabel", void 0), q([W({
	type: String,
	attribute: "cancel-label"
})], Z.prototype, "cancelLabel", void 0), Z = q([U("ui-dialog")], Z);
//#endregion
//#region src/components/employee-table.ts
var Q = class extends H {
	constructor(...e) {
		super(...e), this.employees = null, this.serviceEmployees = [], this.searchTerm = "", this.currentPageNumber = 1, this.employeePendingDeletion = null, this.pageSize = 5;
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
      font-size: 0.9rem;
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
      font-size: 0.72rem;
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
      font-size: 2.4rem;
    }

    .empty-state-title {
      margin: 0;
      font-size: 1.05rem;
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
      font-size: 0.9rem;
    }

    .pagination-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback(), this.unsubscribeService = K.subscribe((e) => {
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
		return M`
      ${this.renderTableToolbar()}
      ${this.renderTableBody(e)}
      ${this.renderDeleteConfirmationDialog()}
    `;
	}
	renderTableToolbar() {
		return M`
      <div class="table-toolbar">
        <ui-input
          class="search-field"
          name="searchTerm"
          placeholder="Search employees..."
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
		return M`
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
		return M`
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
		return M`
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
            variant="outline-primary"
            small
            icon-only
            aria-label="Edit employee"
            @click=${() => this.handleEditClick(e)}
          >
            ${this.renderPencilIcon()}
          </ui-button>
          <ui-button
            variant="outline-danger"
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
		return M`
      <div class="empty-state">
        <span class="empty-state-icon">📁</span>
        <h3 class="empty-state-title">No employees found</h3>
        <p class="empty-state-description">
          Add your first employee to get started.
        </p>
        <ui-button variant="primary" @click=${this.handleAddEmployeeClick}>
          + Add Employee
        </ui-button>
      </div>
    `;
	}
	renderNoSearchMatches() {
		return M`
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
		return M`
      <div class="table-footer">
        <span>
          Showing ${t + 1} to ${t + n}
          of ${e} employees
        </span>
        <span class="pagination-controls">
          <ui-button
            variant="secondary"
            small
            pill
            .disabled=${i === 1}
            @click=${() => this.handlePageChange(i - 1)}
          >
            ‹
          </ui-button>
          ${Array.from({ length: r }, (e, t) => t + 1).map((e) => M`
              <ui-button
                variant=${e === i ? "primary" : "secondary"}
                small
                pill
                @click=${() => this.handlePageChange(e)}
              >
                ${e}
              </ui-button>
            `)}
          <ui-button
            variant="secondary"
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
		return M`
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
		return M`
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
		return M`
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
		e !== null && (this.employeePendingDeletion = null, K.delete(e.identifier), this.dispatchEvent(new CustomEvent("employee-delete", {
			detail: { employee: e },
			bubbles: !0,
			composed: !0
		})), this.dispatchEvent(new CustomEvent("employee-deleted", {
			detail: { employee: e },
			bubbles: !0,
			composed: !0
		})));
	}
	handleDeleteCancelled() {
		this.employeePendingDeletion = null;
	}
	renderDeleteConfirmationDialog() {
		return M`
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
};
q([W({ attribute: !1 })], Q.prototype, "employees", void 0), q([G()], Q.prototype, "serviceEmployees", void 0), q([G()], Q.prototype, "searchTerm", void 0), q([G()], Q.prototype, "currentPageNumber", void 0), q([G()], Q.prototype, "employeePendingDeletion", void 0), Q = q([U("employee-table")], Q);
//#endregion
//#region src/app-shell.ts
var $ = class extends H {
	constructor(...e) {
		super(...e), this.toastMessage = "", this.lastEmittedEventName = "";
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
      font-size: 1.6rem;
    }

    .header-subtitle {
      margin: 4px 0 0;
      font-size: 0.95rem;
      opacity: 0.85;
    }

    .content-card {
      width: 100%;
      max-width: 960px;
      box-sizing: border-box;
      padding: 24px;
      background-color: var(--color-surface, #ffffff);
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 10px;
    }

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
      font-size: 0.95rem;
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
      font-size: 0.85rem;
    }

    .last-event {
      color: var(--color-primary, #2563eb);
      font-weight: 600;
    }
  `;
	}
	render() {
		return M`
      ${this.renderToast()}
      ${this.renderApplicationHeader()}
      ${this.renderFormCard()}
      ${this.renderTableCard()}
      ${this.renderEventsStrip()}
    `;
	}
	renderApplicationHeader() {
		return M`
      <header class="application-header">
        <div>
          <h1 class="header-title">Employee Management</h1>
          <p class="header-subtitle">Manage your organization employees</p>
        </div>
        <ui-button variant="contrast" @click=${this.handleAddEmployeeRequest}>
          + Add Employee
        </ui-button>
      </header>
    `;
	}
	renderFormCard() {
		return M`
      <section class="content-card">
        <employee-form
          @employee-added=${this.handleEmployeeAdded}
          @employee-updated=${this.handleEmployeeUpdated}
          @form-cleared=${this.handleFormCleared}
        ></employee-form>
      </section>
    `;
	}
	renderTableCard() {
		return M`
      <section class="content-card">
        <employee-table
          @employee-edit-request=${this.handleEmployeeEditRequest}
          @employee-deleted=${this.handleEmployeeDeleted}
          @employee-add-request=${this.handleAddEmployeeRequest}
        ></employee-table>
      </section>
    `;
	}
	renderEventsStrip() {
		return M`
      <footer class="events-strip">
        <span>
          Events: employee-added, employee-updated, employee-deleted
        </span>
        ${this.lastEmittedEventName === "" ? P : M`<span class="last-event">
              Last event: ${this.lastEmittedEventName}
            </span>`}
      </footer>
    `;
	}
	renderToast() {
		return this.toastMessage === "" ? P : M`
      <div class="toast" role="status">
        <span class="toast-icon">✓</span>
        <span>${this.toastMessage}</span>
        <button
          type="button"
          class="toast-close-button"
          aria-label="Dismiss notification"
          @click=${this.handleToastClose}
        >
          ✕
        </button>
      </div>
    `;
	}
	handleEmployeeAdded(e) {
		this.lastEmittedEventName = "employee-added", this.showToast("Employee added successfully!");
	}
	handleEmployeeUpdated(e) {
		this.lastEmittedEventName = "employee-updated", this.showToast("Employee updated successfully!");
	}
	handleEmployeeDeleted(e) {
		this.lastEmittedEventName = "employee-deleted";
		let t = this.getFormElement();
		t && t.employeeToEdit?.identifier === e.detail.employee.identifier && (t.employeeToEdit = null), this.showToast("Employee deleted successfully!");
	}
	handleEmployeeEditRequest(e) {
		let t = this.getFormElement();
		t && (t.employeeToEdit = e.detail.employee), this.scrollFormIntoView();
	}
	handleFormCleared() {
		let e = this.getFormElement();
		e && (e.employeeToEdit = null);
	}
	handleAddEmployeeRequest() {
		let e = this.getFormElement();
		e && (e.employeeToEdit = null), this.scrollFormIntoView();
	}
	getFormElement() {
		return this.renderRoot.querySelector("employee-form");
	}
	handleToastClose() {
		this.toastMessage = "", window.clearTimeout(this.toastTimeoutIdentifier);
	}
	scrollFormIntoView() {
		this.getFormElement()?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
	showToast(e) {
		this.toastMessage = e, window.clearTimeout(this.toastTimeoutIdentifier), this.toastTimeoutIdentifier = window.setTimeout(() => {
			this.toastMessage = "";
		}, 3e3);
	}
};
//#endregion
//#region src/employee-app.ts
q([G()], $.prototype, "toastMessage", void 0), q([G()], $.prototype, "lastEmittedEventName", void 0), $ = q([U("app-shell")], $), customElements.get("employee-app") || customElements.define("employee-app", class extends $ {});
//#endregion
export { $ as AppShell, $ as EmployeeApp };
