export default function feednami() {
    !function (e) {
        var n = {};

        function t(o) {
            if (n[o]) return n[o].exports;
            var r = n[o] = {i: o, l: !1, exports: {}};
            return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports
        }

        t.m = e, t.c = n, t.d = function (e, n, o) {
            t.o(e, n) || Object.defineProperty(e, n, {enumerable: !0, get: o})
        }, t.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, t.t = function (e, n) {
            if (1 & n && (e = t(e)), 8 & n) return e;
            if (4 & n && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if (t.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e) for (var r in e) t.d(o, r, function (n) {
                return e[n]
            }.bind(null, r));
            return o
        }, t.n = function (e) {
            var n = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function (e, n) {
            return Object.prototype.hasOwnProperty.call(e, n)
        }, t.p = "", t(t.s = 1)
    }([, function (e, n) {
        function t(e) {
            return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function o(e, n) {
            if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function")
        }

        function r(e, n) {
            for (var t = 0; t < n.length; t++) {
                var o = n[t];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        function i(e, n, t) {
            return n && r(e.prototype, n), t && r(e, t), e
        }

        var l, a;
        l = function () {
            function e(n, t, r, i) {
                o(this, e), this.client = n, this.url = t, this.options = r || {}, this.callback = i
            }

            return i(e, [{
                key: "run", value: function () {
                    var e = this;
                    if (!this.callback) return "fetch" in window ? this.send().then(function (e) {
                        if (e.error) {
                            var n = new Error(e.error.message);
                            return n.code = e.error.code, Promise.reject(n)
                        }
                        return e.feed
                    }) : new Promise(function (n, t) {
                        e.send(function (e) {
                            if (e.error) {
                                var o = new Error(e.error.message);
                                o.code = e.error.code, t(o)
                            } else n(e.feed)
                        })
                    });
                    this.send(this.callback)
                }
            }, {
                key: "send", value: function (e) {
                    var n = window.feednamiEndpoint || "https://api.sekandocdn.net", t = "".concat(n, "/api/v1.1"),
                        o = this.url, r = this.options, i = "url=" + encodeURIComponent(o);
                    this.client.publicApiKey && (i += "&public_api_key=" + this.client.publicApiKey), r.format && (i += "&include_xml_document&format=" + r.format), r.includeXml && (i += "&include_xml_document");
                    var l = t + "/feeds/load?" + i;
                    if ("fetch" in window) return fetch(l).then(function (e) {
                        return e.json()
                    }).then(function (n) {
                        return e && e(n), n
                    });
                    if (window.XDomainRequest) {
                        var a = document.createElement("script"),
                            u = "jsonp_callback_" + (new Date).getTime() + "_" + Math.round(1e6 * Math.random());
                        l += "&jsonp_callback=" + u, window[u] = function (n) {
                            e(n), document.body.removeChild(a), window[u] = null;
                            try {
                                delete window[u]
                            } catch (e) {
                            }
                        }, a.src = l, document.body.appendChild(a)
                    } else {
                        var c = new XMLHttpRequest;
                        c.onreadystatechange = function () {
                            4 == c.readyState && e(JSON.parse(c.responseText))
                        }, c.open("GET", l), c.send()
                    }
                }
            }]), e
        }(), a = function () {
            function e() {
                o(this, e), this.promisePolyfillCallbacks = [], this.promiseLoaded = "Promise" in window
            }

            return i(e, [{
                key: "loadPolyfills", value: function (e) {
                    if (this.promiseLoaded) e(); else if (this.promisePolyfillCallbacks.push(e), !this.polyfillScriptsAdded) {
                        this.polyfillScriptsAdded = !0;
                        var n = document.createElement("script");
                        n.src = "https://feednami-static.storage.googleapis.com/js/v1.1/promise.js", document.head.appendChild(n)
                    }
                }
            }, {
                key: "loadPromiseCallback", value: function () {
                    this.promiseLoaded = !0;
                    var e = !0, n = !1, t = void 0;
                    try {
                        for (var o, r = this.promisePolyfillCallbacks[Symbol.iterator](); !(e = (o = r.next()).done); e = !0) {
                            var i = o.value;
                            console.log(i), i()
                        }
                    } catch (e) {
                        n = !0, t = e
                    } finally {
                        try {
                            e || null == r.return || r.return()
                        } finally {
                            if (n) throw t
                        }
                    }
                }
            }, {
                key: "load", value: function (e, n, o) {
                    return "object" == t(e) ? this.load(n.url, n, o) : "function" == typeof n ? this.load(e, {}, n) : new l(this, e, n, o).run()
                }
            }, {
                key: "loadGoogleFormat", value: function (e, n) {
                    return window.feednami.load(e, {format: "google", includeXml: !0}, n)
                }
            }, {
                key: "setPublicApiKey", value: function (e) {
                    this.publicApiKey = e
                }
            }]), e
        }(), window.feednami = new a
    }]);
}