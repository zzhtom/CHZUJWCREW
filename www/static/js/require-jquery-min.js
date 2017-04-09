﻿/*
 RequireJS 2.1.9 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,
require,
define;
(function (Z) {
    function H(b) {
        return '[object Function]' === L.call(b)
    }
    function I(b) {
        return '[object Array]' === L.call(b)
    }
    function y(b, c) {
        if (b) {
            var e;
            for (e = 0; e < b.length && (!b[e] || !c(b[e], e, b)); e += 1);
        }
    }
    function M(b, c) {
        if (b) {
            var e;
            for (e = b.length - 1; - 1 < e && (!b[e] || !c(b[e], e, b)); e -= 1);
        }
    }
    function t(b, c) {
        return ga.call(b, c)
    }
    function l(b, c) {
        return t(b, c) && b[c]
    }
    function F(b, c) {
        for (var e in b) if (t(b, e) && c(b[e], e)) break
    }
    function Q(b, c, e, h) {
        c && F(c, function (c, j) {
            if (e || !t(b, j)) h && 'string' !== typeof c ? (b[j] || (b[j] = {
            }), Q(b[j], c, e, h))  : b[j] = c
        });
        return b
    }
    function u(b, c) {
        return function () {
            return c.apply(b, arguments)
        }
    }
    function aa(b) {
        throw b;
    }
    function ba(b) {
        if (!b) return b;
        var c = Z;
        y(b.split('.'), function (b) {
            c = c[b]
        });
        return c
    }
    function A(b, c, e, h) {
        c = Error(c + '\nhttp://requirejs.org/docs/errors.html#' + b);
        c.requireType = b;
        c.requireModules = h;
        e && (c.originalError = e);
        return c
    }
    function ha(b) {
        function c(a, f, b) {
            var d,
            m,
            c,
            g,
            e,
            h,
            j,
            i = f && f.split('/');
            d = i;
            var n = k.map,
            p = n && n['*'];
            if (a && '.' === a.charAt(0)) if (f) {
                d = l(k.pkgs, f) ? i = [
                    f
                ] : i.slice(0, i.length -
                1);
                f = a = d.concat(a.split('/'));
                for (d = 0; f[d]; d += 1) if (m = f[d], '.' === m) f.splice(d, 1),
                d -= 1;
                 else if ('..' === m) if (1 === d && ('..' === f[2] || '..' === f[0])) break;
                 else 0 < d && (f.splice(d - 1, 2), d -= 2);
                d = l(k.pkgs, f = a[0]);
                a = a.join('/');
                d && a === f + '/' + d.main && (a = f)
            } else 0 === a.indexOf('./') && (a = a.substring(2));
            if (b && n && (i || p)) {
                f = a.split('/');
                for (d = f.length; 0 < d; d -= 1) {
                    c = f.slice(0, d).join('/');
                    if (i) for (m = i.length; 0 < m; m -= 1) if (b = l(n, i.slice(0, m).join('/'))) if (b = l(b, c)) {
                        g = b;
                        e = d;
                        break
                    }
                    if (g) break;
                    !h && (p && l(p, c)) && (h = l(p, c), j = d)
                }
                !g &&
                h && (g = h, e = j);
                g && (f.splice(0, e, g), a = f.join('/'))
            }
            return a
        }
        function e(a) {
            z && y(document.getElementsByTagName('script'), function (f) {
                if (f.getAttribute('data-requiremodule') === a && f.getAttribute('data-requirecontext') === i.contextName) return f.parentNode.removeChild(f),
                !0
            })
        }
        function h(a) {
            var f = l(k.paths, a);
            if (f && I(f) && 1 < f.length) return f.shift(),
            i.require.undef(a),
            i.require([a]),
            !0
        }
        function $(a) {
            var f,
            b = a ? a.indexOf('!')  : - 1;
            - 1 < b && (f = a.substring(0, b), a = a.substring(b + 1, a.length));
            return [f,
            a]
        }
        function n(a, f, b, d) {
            var m,
            B,
            g = null,
            e = f ? f.name : null,
            h = a,
            j = !0,
            k = '';
            a || (j = !1, a = '_@r' + (L += 1));
            a = $(a);
            g = a[0];
            a = a[1];
            g && (g = c(g, e, d), B = l(r, g));
            a && (g ? k = B && B.normalize ? B.normalize(a, function (a) {
                return c(a, e, d)
            })  : c(a, e, d)  : (k = c(a, e, d), a = $(k), g = a[0], k = a[1], b = !0, m = i.nameToUrl(k)));
            b = g && !B && !b ? '_unnormalized' + (M += 1)  : '';
            return {
                prefix: g,
                name: k,
                parentMap: f,
                unnormalized: !!b,
                url: m,
                originalName: h,
                isDefine: j,
                id: (g ? g + '!' + k : k) + b
            }
        }
        function q(a) {
            var f = a.id,
            b = l(p, f);
            b || (b = p[f] = new i.Module(a));
            return b
        }
        function s(a, f, b) {
            var d = a.id,
            m = l(p, d);
            if (t(r, d) && (!m || m.defineEmitComplete)) 'defined' === f && b(r[d]);
             else if (m = q(a), m.error && 'error' === f) b(m.error);
             else m.on(f, b)
        }
        function v(a, f) {
            var b = a.requireModules,
            d = !1;
            if (f) f(a);
             else if (y(b, function (f) {
                if (f = l(p, f)) f.error = a,
                f.events.error && (d = !0, f.emit('error', a))
            }), !d) j.onError(a)
        }
        function w() {
            R.length && (ia.apply(G, [
                G.length - 1,
                0
            ].concat(R)), R = [
            ])
        }
        function x(a) {
            delete p[a];
            delete T[a]
        }
        function E(a, f, b) {
            var d = a.map.id;
            a.error ? a.emit('error', a.error)  : (f[d] = !0, y(a.depMaps, function (d, c) {
                var g = d.id,
                e = l(p, g);
                e && (!a.depMatched[c] && !b[g]) && (l(f, g) ? (a.defineDep(c, r[g]), a.check())  : E(e, f, b))
            }), b[d] = !0)
        }
        function C() {
            var a,
            f,
            b,
            d,
            m = (b = 1000 * k.waitSeconds) && i.startTime + b < (new Date).getTime(),
            c = [
            ],
            g = [
            ],
            j = !1,
            l = !0;
            if (!U) {
                U = !0;
                F(T, function (b) {
                    a = b.map;
                    f = a.id;
                    if (b.enabled && (a.isDefine || g.push(b), !b.error)) if (!b.inited && m) h(f) ? j = d = !0 : (c.push(f), e(f));
                     else if (!b.inited && (b.fetched && a.isDefine) && (j = !0, !a.prefix)) return l = !1
                });
                if (m && c.length) return b = A('timeout', 'Load timeout for modules: ' + c, null, c),
                b.contextName =
                i.contextName,
                v(b);
                l && y(g, function (a) {
                    E(a, {
                    }, {
                    })
                });
                if ((!m || d) && j) if ((z || da) && !V) V = setTimeout(function () {
                    V = 0;
                    C()
                }, 50);
                U = !1
            }
        }
        function D(a) {
            t(r, a[0]) || q(n(a[0], null, !0)).init(a[1], a[2])
        }
        function J(a) {
            var a = a.currentTarget || a.srcElement,
            b = i.onScriptLoad;
            a.detachEvent && !W ? a.detachEvent('onreadystatechange', b)  : a.removeEventListener('load', b, !1);
            b = i.onScriptError;
            (!a.detachEvent || W) && a.removeEventListener('error', b, !1);
            return {
                node: a,
                id: a && a.getAttribute('data-requiremodule')
            }
        }
        function K() {
            var a;
            for (w(); G.length; ) {
                a =
                G.shift();
                if (null === a[0]) return v(A('mismatch', 'Mismatched anonymous define() module: ' + a[a.length - 1]));
                D(a)
            }
        }
        var U,
        X,
        i,
        N,
        V,
        k = {
            waitSeconds: 7,
            baseUrl: './',
            paths: {
            },
            pkgs: {
            },
            shim: {
            },
            config: {
            }
        },
        p = {
        },
        T = {
        },
        Y = {
        },
        G = [
        ],
        r = {
        },
        S = {
        },
        L = 1,
        M = 1;
        N = {
            require: function (a) {
                return a.require ? a.require : a.require = i.makeRequire(a.map)
            },
            exports: function (a) {
                a.usingExports = !0;
                if (a.map.isDefine) return a.exports ? a.exports : a.exports = r[a.map.id] = {
                }
            },
            module: function (a) {
                return a.module ? a.module : a.module = {
                    id: a.map.id,
                    uri: a.map.url,
                    config: function () {
                        var b =
                        l(k.pkgs, a.map.id);
                        return (b ? l(k.config, a.map.id + '/' + b.main)  : l(k.config, a.map.id)) || {
                        }
                    },
                    exports: r[a.map.id]
                }
            }
        };
        X = function (a) {
            this.events = l(Y, a.id) || {
            };
            this.map = a;
            this.shim = l(k.shim, a.id);
            this.depExports = [
            ];
            this.depMaps = [
            ];
            this.depMatched = [
            ];
            this.pluginMaps = {
            };
            this.depCount = 0
        };
        X.prototype = {
            init: function (a, b, c, d) {
                d = d || {
                };
                if (!this.inited) {
                    this.factory = b;
                    if (c) this.on('error', c);
                     else this.events.error && (c = u(this, function (a) {
                        this.emit('error', a)
                    }));
                    this.depMaps = a && a.slice(0);
                    this.errback = c;
                    this.inited = !0;
                    this.ignore = d.ignore;
                    d.enabled || this.enabled ? this.enable()  : this.check()
                }
            },
            defineDep: function (a, b) {
                this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b)
            },
            fetch: function () {
                if (!this.fetched) {
                    this.fetched = !0;
                    i.startTime = (new Date).getTime();
                    var a = this.map;
                    if (this.shim) i.makeRequire(this.map, {
                        enableBuildCallback: !0
                    }) (this.shim.deps || [], u(this, function () {
                        return a.prefix ? this.callPlugin()  : this.load()
                    }));
                     else return a.prefix ? this.callPlugin()  : this.load()
                }
            },
            load: function () {
                var a =
                this.map.url;
                S[a] || (S[a] = !0, i.load(this.map.id, a))
            },
            check: function () {
                if (this.enabled && !this.enabling) {
                    var a,
                    b,
                    c = this.map.id;
                    b = this.depExports;
                    var d = this.exports,
                    m = this.factory;
                    if (this.inited) if (this.error) this.emit('error', this.error);
                     else {
                        if (!this.defining) {
                            this.defining = !0;
                            if (1 > this.depCount && !this.defined) {
                                if (H(m)) {
                                    if (this.events.error && this.map.isDefine || j.onError !== aa) try {
                                        d = i.execCb(c, m, b, d)
                                    } catch (e) {
                                        a = e
                                    } else d = i.execCb(c, m, b, d);
                                    this.map.isDefine && ((b = this.module) && void 0 !== b.exports && b.exports !==
                                    this.exports ? d = b.exports : void 0 === d && this.usingExports && (d = this.exports));
                                    if (a) return a.requireMap = this.map,
                                    a.requireModules = this.map.isDefine ? [
                                        this.map.id
                                    ] : null,
                                    a.requireType = this.map.isDefine ? 'define' : 'require',
                                    v(this.error = a)
                                } else d = m;
                                this.exports = d;
                                if (this.map.isDefine && !this.ignore && (r[c] = d, j.onResourceLoad)) j.onResourceLoad(i, this.map, this.depMaps);
                                x(c);
                                this.defined = !0
                            }
                            this.defining = !1;
                            this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit('defined', this.exports), this.defineEmitComplete =
                            !0)
                        }
                    } else this.fetch()
                }
            },
            callPlugin: function () {
                var a = this.map,
                b = a.id,
                e = n(a.prefix);
                this.depMaps.push(e);
                s(e, 'defined', u(this, function (d) {
                    var m,
                    e;
                    e = this.map.name;
                    var g = this.map.parentMap ? this.map.parentMap.name : null,
                    h = i.makeRequire(a.parentMap, {
                        enableBuildCallback: !0
                    });
                    if (this.map.unnormalized) {
                        if (d.normalize && (e = d.normalize(e, function (a) {
                            return c(a, g, !0)
                        }) || ''), d = n(a.prefix + '!' + e, this.map.parentMap), s(d, 'defined', u(this, function (a) {
                            this.init([], function () {
                                return a
                            }, null, {
                                enabled: !0,
                                ignore: !0
                            })
                        })), e = l(p, d.id)) {
                            this.depMaps.push(d);
                            if (this.events.error) e.on('error', u(this, function (a) {
                                this.emit('error', a)
                            }));
                            e.enable()
                        }
                    } else m = u(this, function (a) {
                        this.init([], function () {
                            return a
                        }, null, {
                            enabled: !0
                        })
                    }),
                    m.error = u(this, function (a) {
                        this.inited = !0;
                        this.error = a;
                        a.requireModules = [
                            b
                        ];
                        F(p, function (a) {
                            0 === a.map.id.indexOf(b + '_unnormalized') && x(a.map.id)
                        });
                        v(a)
                    }),
                    m.fromText = u(this, function (d, c) {
                        var e = a.name,
                        g = n(e),
                        B = O;
                        c && (d = c);
                        B && (O = !1);
                        q(g);
                        t(k.config, b) && (k.config[e] = k.config[b]);
                        try {
                            j.exec(d)
                        } catch (ca) {
                            return v(A('fromtexteval', 'fromText eval for ' + b + ' failed: ' + ca, ca, [
                                b
                            ]))
                        }
                        B && (O = !0);
                        this.depMaps.push(g);
                        i.completeLoad(e);
                        h([e], m)
                    }),
                    d.load(a.name, h, m, k)
                }));
                i.enable(e, this);
                this.pluginMaps[e.id] = e
            },
            enable: function () {
                T[this.map.id] = this;
                this.enabling = this.enabled = !0;
                y(this.depMaps, u(this, function (a, b) {
                    var c,
                    d;
                    if ('string' === typeof a) {
                        a = n(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap);
                        this.depMaps[b] = a;
                        if (c = l(N, a.id)) {
                            this.depExports[b] = c(this);
                            return
                        }
                        this.depCount += 1;
                        s(a, 'defined', u(this, function (a) {
                            this.defineDep(b, a);
                            this.check()
                        }));
                        this.errback && s(a, 'error', u(this, this.errback))
                    }
                    c = a.id;
                    d = p[c];
                    !t(N, c) && (d && !d.enabled) && i.enable(a, this)
                }));
                F(this.pluginMaps, u(this, function (a) {
                    var b = l(p, a.id);
                    b && !b.enabled && i.enable(a, this)
                }));
                this.enabling = !1;
                this.check()
            },
            on: function (a, b) {
                var c = this.events[a];
                c || (c = this.events[a] = [
                ]);
                c.push(b)
            },
            emit: function (a, b) {
                y(this.events[a], function (a) {
                    a(b)
                });
                'error' === a && delete this.events[a]
            }
        };
        i = {
            config: k,
            contextName: b,
            registry: p,
            defined: r,
            urlFetched: S,
            defQueue: G,
            Module: X,
            makeModuleMap: n,
            nextTick: j.nextTick,
            onError: v,
            configure: function (a) {
                a.baseUrl && '/' !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += '/');
                var b = k.pkgs,
                c = k.shim,
                d = {
                    paths: !0,
                    config: !0,
                    map: !0
                };
                F(a, function (a, b) {
                    d[b] ? 'map' === b ? (k.map || (k.map = {
                    }), Q(k[b], a, !0, !0))  : Q(k[b], a, !0)  : k[b] = a
                });
                a.shim && (F(a.shim, function (a, b) {
                    I(a) && (a = {
                        deps: a
                    });
                    if ((a.exports || a.init) && !a.exportsFn) a.exportsFn = i.makeShimExports(a);
                    c[b] = a
                }), k.shim = c);
                a.packages && (y(a.packages, function (a) {
                    a = 'string' === typeof a ? {
                        name: a
                    }
                     : a;
                    b[a.name] = {
                        name: a.name,
                        location: a.location || a.name,
                        main: (a.main || 'main').replace(ja, '').replace(ea, '')
                    }
                }), k.pkgs = b);
                F(p, function (a, b) {
                    !a.inited && !a.map.unnormalized && (a.map = n(b))
                });
                if (a.deps || a.callback) i.require(a.deps || [], a.callback)
            },
            makeShimExports: function (a) {
                return function () {
                    var b;
                    a.init && (b = a.init.apply(Z, arguments));
                    return b || a.exports && ba(a.exports)
                }
            },
            makeRequire: function (a, f) {
                function h(d, c, e) {
                    var g,
                    k;
                    f.enableBuildCallback && (c && H(c)) && (c.__requireJsBuild = !0);
                    if ('string' === typeof d) {
                        if (H(c)) return v(A('requireargs', 'Invalid require call'), e);
                        if (a && t(N, d)) return N[d](p[a.id]);
                        if (j.get) return j.get(i, d, a, h);
                        g = n(d, a, !1, !0);
                        g = g.id;
                        return !t(r, g) ? v(A('notloaded', 'Module name "' + g + '" has not been loaded yet for context: ' + b + (a ? '' : '. Use require([])')))  : r[g]
                    }
                    K();
                    i.nextTick(function () {
                        K();
                        k = q(n(null, a));
                        k.skipMap = f.skipMap;
                        k.init(d, c, e, {
                            enabled: !0
                        });
                        C()
                    });
                    return h
                }
                f = f || {
                };
                Q(h, {
                    isBrowser: z,
                    toUrl: function (b) {
                        var f,
                        e = b.lastIndexOf('.'),
                        g = b.split('/') [0];
                        if ( - 1 !== e && (!('.' === g || '..' === g) || 1 < e)) f = b.substring(e, b.length),
                        b =
                        b.substring(0, e);
                        return i.nameToUrl(c(b, a && a.id, !0), f, !0)
                    },
                    defined: function (b) {
                        return t(r, n(b, a, !1, !0).id)
                    },
                    specified: function (b) {
                        b = n(b, a, !1, !0).id;
                        return t(r, b) || t(p, b)
                    }
                });
                a || (h.undef = function (b) {
                    w();
                    var c = n(b, a, !0),
                    f = l(p, b);
                    e(b);
                    delete r[b];
                    delete S[c.url];
                    delete Y[b];
                    f && (f.events.defined && (Y[b] = f.events), x(b))
                });
                return h
            },
            enable: function (a) {
                l(p, a.id) && q(a).enable()
            },
            completeLoad: function (a) {
                jQuery(document).trigger('loader-complete', [
                    a
                ]); ///发布完成事件
                var b,
                c,
                d = l(k.shim, a) || {
                },
                e = d.exports;
                for (w(); G.length; ) {
                    c = G.shift();
                    if (null === c[0]) {
                        c[0] = a;
                        if (b) break;
                        b =
                        !0
                    } else c[0] === a && (b = !0);
                    D(c)
                }
                c = l(p, a);
                if (!b && !t(r, a) && c && !c.inited) {
                    if (k.enforceDefine && (!e || !ba(e))) return h(a) ? void 0 : v(A('nodefine', 'No define call for ' + a, null, [
                        a
                    ]));
                    D([a,
                    d.deps || [],
                    d.exportsFn])
                }
                C()
            },
            nameToUrl: function (a, b, c) {
                var d,
                e,
                h,
                g,
                i,
                n;
                if (j.jsExtRegExp.test(a)) g = a + (b || '');
                 else {
                    d = k.paths;
                    e = k.pkgs;
                    g = a.split('/');
                    for (i = g.length; 0 < i; i -= 1) if (n = g.slice(0, i).join('/'), h = l(e, n), n = l(d, n)) {
                        I(n) && (n = n[0]);
                        g.splice(0, i, n);
                        break
                    } else if (h) {
                        a = a === h.name ? h.location + '/' + h.main : h.location;
                        g.splice(0, i, a);
                        break
                    }
                    g = g.join('/');
                    g += b || (/^data\:|\?/.test(g) || c ? '' : '.js');
                    g = ('/' === g.charAt(0) || g.match(/^[\w\+\.\-]+:/) ? '' : k.baseUrl) + g
                }
                return k.urlArgs ? g + (( - 1 === g.indexOf('?') ? '?' : '&') + k.urlArgs)  : g
            },
            load: function (a, b) {
                j.load(i, a, b)
            },
            execCb: function (a, b, c, d) {
                return b.apply(d, c)
            },
            onScriptLoad: function (a) {
                if ('load' === a.type || ka.test((a.currentTarget || a.srcElement).readyState)) P = null,
                a = J(a),
                i.completeLoad(a.id)
            },
            onScriptError: function (a) {
                var b = J(a);
                if (!h(b.id)) return v(A('scripterror', 'Script error for: ' + b.id, a, [
                    b.id
                ]))
            }
        };
        i.require = i.makeRequire();
        return i
    }
    var j,
    w,
    x,
    C,
    J,
    D,
    P,
    K,
    q,
    fa,
    la = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
    ma = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
    ea = /\.js$/,
    ja = /^\.\//;
    w = Object.prototype;
    var L = w.toString,
    ga = w.hasOwnProperty,
    ia = Array.prototype.splice,
    z = !!('undefined' !== typeof window && 'undefined' !== typeof navigator && window.document),
    da = !z && 'undefined' !== typeof importScripts,
    ka = z && 'PLAYSTATION 3' === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
    W = 'undefined' !== typeof opera &&
    '[object Opera]' === opera.toString(),
    E = {
    },
    s = {
    },
    R = [
    ],
    O = !1;
    if ('undefined' === typeof define) {
        if ('undefined' !== typeof requirejs) {
            if (H(requirejs)) return;
            s = requirejs;
            requirejs = void 0
        }
        'undefined' !== typeof require && !H(require) && (s = require, require = void 0);
        j = requirejs = function (b, c, e, h) {
            var q,
            n = '_';
            !I(b) && 'string' !== typeof b && (q = b, I(c) ? (b = c, c = e, e = h)  : b = [
            ]);
            q && q.context && (n = q.context);
            (h = l(E, n)) || (h = E[n] = j.s.newContext(n));
            q && h.configure(q);
            return h.require(b, c, e)
        };
        j.config = function (b) {
            return j(b)
        };
        j.nextTick = 'undefined' !==
        typeof setTimeout ? function (b) {
            setTimeout(b, 4)
        }
         : function (b) {
            b()
        };
        require || (require = j);
        j.version = '2.1.9';
        j.jsExtRegExp = /^\/|:|\?|\.js$/;
        j.isBrowser = z;
        w = j.s = {
            contexts: E,
            newContext: ha
        };
        j({
        });
        y(['toUrl',
        'undef',
        'defined',
        'specified'], function (b) {
            j[b] = function () {
                var c = E._;
                return c.require[b].apply(c, arguments)
            }
        });
        if (z && (x = w.head = document.getElementsByTagName('head') [0], C = document.getElementsByTagName('base') [0])) x = w.head = C.parentNode;
        j.onError = aa;
        j.createNode = function (b) {
            var c = b.xhtml ? document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script')  : document.createElement('script');
            c.type = b.scriptType || 'text/javascript';
            c.charset = 'utf-8';
            c.async = !0;
            return c
        };
        j.load = function (b, c, e) {
            var h = b && b.config || {
            };
            if (z) return h = j.createNode(h, c, e),
            h.setAttribute('data-requirecontext', b.contextName),
            h.setAttribute('data-requiremodule', c),
            h.attachEvent && !(h.attachEvent.toString && 0 > h.attachEvent.toString().indexOf('[native code')) && !W ? (O = !0, h.attachEvent('onreadystatechange', b.onScriptLoad))  : (h.addEventListener('load', b.onScriptLoad, !1), h.addEventListener('error', b.onScriptError, !1)),
            h.src = e,
            K = h,
            C ? x.insertBefore(h, C)  : x.appendChild(h),
            K = null,
            h;
            if (da) try {
                importScripts(e),
                b.completeLoad(c)
            } catch (l) {
                b.onError(A('importscripts', 'importScripts failed for ' + c + ' at ' + e, l, [
                    c
                ]))
            }
        };
        z && !s.skipDataMain && M(document.getElementsByTagName('script'), function (b) {
            x || (x = b.parentNode);
            if (J = b.getAttribute('data-main')) return q = J,
            s.baseUrl || (D = q.split('/'), q = D.pop(), fa = D.length ? D.join('/') + '/' : './', s.baseUrl = fa),
            q = q.replace(ea, ''),
            j.jsExtRegExp.test(q) && (q = J),
            s.deps = s.deps ? s.deps.concat(q)  :
            [
                q
            ],
            !0
        });
        define = function (b, c, e) {
            var h,
            j;
            'string' !== typeof b && (e = c, c = b, b = null);
            I(c) || (e = c, c = null);
            !c && H(e) && (c = [
            ], e.length && (e.toString().replace(la, '').replace(ma, function (b, e) {
                c.push(e)
            }), c = (1 === e.length ? [
                'require'
            ] : [
                'require',
                'exports',
                'module'
            ]).concat(c)));
            if (O) {
                if (!(h = K)) P && 'interactive' === P.readyState || M(document.getElementsByTagName('script'), function (b) {
                    if ('interactive' === b.readyState) return P = b
                }),
                h = P;
                h && (b || (b = h.getAttribute('data-requiremodule')), j = E[h.getAttribute('data-requirecontext')])
            }(j ?
            j.defQueue : R).push([b,
            c,
            e])
        };
        define.amd = {
            jQuery: !0
        };
        j.exec = function (b) {
            return eval(b)
        };
        j(s)
    }
}) (this);
/*! jQuery v1.11.0-beta2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license */
!function (a, b) {
    'object' == typeof module && 'object' == typeof module.exports ? module.exports = function (c) {
        if (c = c || a, !c.document) throw new Error('jQuery requires a window with a document');
        return b(c)
    }
     : b(a)
}(this, function (a) {
    var b = [
    ],
    c = b.slice,
    d = b.concat,
    e = b.push,
    f = b.indexOf,
    g = {
    },
    h = g.toString,
    i = g.hasOwnProperty,
    j = ''.trim,
    k = {
    },
    l = a.jQuery,
    m = a.$,
    n = '1.11.0-beta2',
    o = function (a, b) {
        return new o.fn.init(a, b)
    },
    p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    q = /^-ms-/,
    r = /-([\da-z])/gi,
    s = function (a, b) {
        return b.toUpperCase()
    };
    o.fn = o.prototype = {
        jquery: n,
        constructor: o,
        selector: '',
        length: 0,
        toArray: function () {
            return c.call(this)
        },
        get: function (a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : c.call(this)
        },
        pushStack: function (a) {
            var b = o.merge(this.constructor(), a);
            return b.prevObject = this,
            b.context = this.context,
            b
        },
        each: function (a, b) {
            return o.each(this, a, b)
        },
        map: function (a) {
            return this.pushStack(o.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function () {
            return this.pushStack(c.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq( - 1)
        },
        eq: function (a) {
            var b = this.length,
            c = + a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [
                this[c]
            ] : [
            ])
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: e,
        sort: b.sort,
        splice: b.splice
    },
    o.extend = o.fn.extend = function () {
        var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {
        },
        h = 1,
        i = arguments.length,
        j = !1;
        for ('boolean' == typeof g && (j = g, g = arguments[h] || {
        }, h++), 'object' == typeof g || o.isFunction(g) || (g = {
        }), h === i && (g = this, h--); i > h; h++) if (null != (e = arguments[h])) for (d in e) a = g[d],
        c = e[d],
        g !== c && (j && c && (o.isPlainObject(c) || (b = o.isArray(c))) ? (b ? (b = !1, f = a && o.isArray(a) ? a : [
        ])  : f = a && o.isPlainObject(a) ? a : {
        }, g[d] = o.extend(j, f, c))  : void 0 !== c && (g[d] = c));
        return g
    },
    o.extend({
        expando: 'jQuery' + (n + Math.random()).replace(/\D/g, ''),
        isReady: !0,
        error: function (a) {
            throw new Error(a)
        },
        noop: function () {
        },
        noConflict: function (b) {
            return a.$ === o && (a.$ = m),
            b && a.jQuery === o && (a.jQuery = l),
            o
        },
        isFunction: function (a) {
            return 'function' === o.type(a)
        },
        isArray: Array.isArray || function (a) {
            return 'array' === o.type(a)
        },
        isWindow: function (a) {
            return null != a && a == a.window
        },
        isNumeric: function (a) {
            return a - parseFloat(a) >= 0
        },
        isEmptyObject: function (a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        isPlainObject: function (a) {
            var b;
            if (!a || 'object' !== o.type(a) || a.nodeType || o.isWindow(a)) return !1;
            try {
                if (a.constructor && !i.call(a, 'constructor') && !i.call(a.constructor.prototype, 'isPrototypeOf')) return !1
            } catch (c) {
                return !1
            }
            if (k.ownLast) for (b in a) return i.call(a, b);
            for (b in a);
            return void 0 === b || i.call(a, b)
        },
        type: function (a) {
            return null == a ? a + '' : 'object' == typeof a || 'function' == typeof a ? g[h.call(a)] || 'object' : typeof a
        },
        globalEval: function (b) {
            b && o.trim(b) && (a.execScript || function (b) {
                a.eval.call(a, b)
            }) (b)
        },
        camelCase: function (a) {
            return a.replace(q, 'ms-').replace(r, s)
        },
        nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function (a, b, c) {
            var d,
            e = 0,
            f = a.length,
            g = t(a);
            if (c) {
                if (g) {
                    for (; f > e; e++) if (d = b.apply(a[e], c), d === !1) break
                } else for (e in a) if (d = b.apply(a[e], c), d === !1) break
            } else if (g) {
                for (; f > e; e++) if (d = b.call(a[e], e, a[e]), d === !1) break
            } else for (e in a) if (d = b.call(a[e], e, a[e]), d === !1) break;
            return a
        },
        trim: j && !j.call('? ') ? function (a) {
            return null == a ? '' : j.call(a)
        }
         : function (a) {
            return null == a ? '' : (a + '').replace(p, '')
        },
        makeArray: function (a, b) {
            var c = b || [];
            return null != a && (t(Object(a)) ? o.merge(c, 'string' == typeof a ? [
                a
            ] : a)  : e.call(c, a)),
            c
        },
        inArray: function (a, b, c) {
            var d;
            if (b) {
                if (f) return f.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c)  : c : 0; d > c; c++) if (c in b && b[c] === a) return c
            }
            return - 1
        },
        merge: function (a, b) {
            var c = + b.length,
            d = 0,
            e = a.length;
            while (c > d) a[e++] = b[d++];
            if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
            return a.length = e,
            a
        },
        grep: function (a, b, c) {
            for (var d, e = [
            ], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f),
            d !== h && e.push(a[f]);
            return e
        },
        map: function (a, b, c) {
            var e,
            f = 0,
            g = a.length,
            h = t(a),
            i = [
            ];
            if (h) for (; g > f; f++) e = b(a[f], f, c),
            null != e && i.push(e);
             else for (f in a) e = b(a[f], f, c),
            null != e && i.push(e);
            return d.apply([], i)
        },
        guid: 1,
        proxy: function (a, b) {
            var d,
            e,
            f;
            return 'string' == typeof b && (f = a[b], b = a, a = f),
            o.isFunction(a) ? (d = c.call(arguments, 2), e = function () {
                return a.apply(b || this, d.concat(c.call(arguments)))
            }, e.guid = a.guid = a.guid || o.guid++, e)  : void 0
        },
        now: function () {
            return + new Date
        },
        support: k
    }),
    o.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function (a, b) {
        g['[object ' + b + ']'] = b.toLowerCase()
    });
    function t(a) {
        var b = a.length,
        c = o.type(a);
        return 'function' === c || o.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : 'array' === c || 0 === b || 'number' == typeof b && b > 0 && b - 1 in a
    }
    var u = function (a) {
        var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t = 'sizzle' + - new Date,
        u = a.document,
        v = 0,
        w = 0,
        x = fb(),
        y = fb(),
        z = fb(),
        A = function (a, b) {
            return a === b && (k = !0),
            0
        },
        B = 'undefined',
        C = 1 << 31,
        D = {
        }.hasOwnProperty,
        E = [
        ],
        F = E.pop,
        G = E.push,
        H = E.push,
        I = E.slice,
        J = E.indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++) if (this[b] === a) return b;
            return - 1
        },
        K = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
        L = '[\\x20\\t\\r\\n\\f]',
        M = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
        N = M.replace('w', 'w#'),
        O = '\\[' + L + '*(' + M + ')' + L + '*(?:([*^$|!~]?=)' + L + '*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + N + ')|)|)' + L + '*\\]',
        P = ':(' + M + ')(?:\\((([\'"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|' + O.replace(3, 8) + ')*)|.*)\\)|)',
        Q = new RegExp('^' + L + '+|((?:^|[^\\\\])(?:\\\\.)*)' + L + '+$', 'g'),
        R = new RegExp('^' + L + '*,' + L + '*'),
        S = new RegExp('^' + L + '*([>+~]|' + L + ')' + L + '*'),
        T = new RegExp('=' + L + '*([^\\]\'"]*)' + L + '*\\]', 'g'),
        U = new RegExp(P),
        V = new RegExp('^' + N + '$'),
        W = {
            ID: new RegExp('^#(' + M + ')'),
            CLASS: new RegExp('^\\.(' + M + ')'),
            TAG: new RegExp('^(' + M.replace('w', 'w*') + ')'),
            ATTR: new RegExp('^' + O),
            PSEUDO: new RegExp('^' + P),
            CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + L + '*(even|odd|(([+-]|)(\\d*)n|)' + L + '*(?:([+-]|)' + L + '*(\\d+)|))' + L + '*\\)|)', 'i'),
            bool: new RegExp('^(?:' + K + ')$', 'i'),
            needsContext: new RegExp('^' + L + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + L + '*((?:-\\d)?\\d*)' + L + '*\\)|)(?=[^-]|$)', 'i')
        },
        X = /^(?:input|select|textarea|button)$/i,
        Y = /^h\d$/i,
        Z = /^[^{]+\{\s*\[native \w/,
        $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        _ = /[+~]/,
        ab = /'|\\/g,
        bb = new RegExp('\\\\([\\da-f]{1,6}' + L + '?|(' + L + ')|.)', 'ig'),
        cb = function (a, b, c) {
            var d = '0x' + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536)  : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
        };
        try {
            H.apply(E = I.call(u.childNodes), u.childNodes),
            E[u.childNodes.length].nodeType
        } catch (db) {
            H = {
                apply: E.length ? function (a, b) {
                    G.apply(a, I.call(b))
                }
                 : function (a, b) {
                    var c = a.length,
                    d = 0;
                    while (a[c++] = b[d++]);
                    a.length = c - 1
                }
            }
        }
        function eb(a, b, d, e) {
            var f,
            g,
            h,
            i,
            j,
            k,
            n,
            q,
            r,
            v;
            if ((b ? b.ownerDocument || b : u) !== m && l(b), b = b || m, d = d || [], !a || 'string' != typeof a) return d;
            if (1 !== (i = b.nodeType) && 9 !== i) return [];
            if (o && !e) {
                if (f = $.exec(a)) if (h = f[1]) {
                    if (9 === i) {
                        if (g = b.getElementById(h), !g || !g.parentNode) return d;
                        if (g.id === h) return d.push(g),
                        d
                    } else if (b.ownerDocument && (g = b.ownerDocument.getElementById(h)) && s(b, g) && g.id === h) return d.push(g),
                    d
                } else {
                    if (f[2]) return H.apply(d, b.getElementsByTagName(a)),
                    d;
                    if ((h = f[3]) && c.getElementsByClassName && b.getElementsByClassName) return H.apply(d, b.getElementsByClassName(h)),
                    d
                }
                if (c.qsa && (!p || !p.test(a))) {
                    if (q = n = t, r = b, v = 9 === i && a, 1 === i && 'object' !== b.nodeName.toLowerCase()) {
                        k = pb(a),
                        (n = b.getAttribute('id')) ? q = n.replace(ab, '\\$&')  : b.setAttribute('id', q),
                        q = '[id=\'' + q + '\'] ',
                        j = k.length;
                        while (j--) k[j] = q + qb(k[j]);
                        r = _.test(a) && nb(b.parentNode) || b,
                        v = k.join(',')
                    }
                    if (v) try {
                        return H.apply(d, r.querySelectorAll(v)),
                        d
                    } catch (w) {
                    } finally {
                        n || b.removeAttribute('id')
                    }
                }
            }
            return yb(a.replace(Q, '$1'), b, d, e)
        }
        function fb() {
            var a = [
            ];
            function b(c, d) {
                return a.push(c + ' ') > e.cacheLength && delete b[a.shift()],
                b[c + ' '] = d
            }
            return b
        }
        function gb(a) {
            return a[t] = !0,
            a
        }
        function hb(a) {
            var b = m.createElement('div');
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b),
                b = null
            }
        }
        function ib(a, b) {
            var c = a.split('|'),
            d = a.length;
            while (d--) e.attrHandle[c[d]] = b
        }
        function jb(a, b) {
            var c = b && a,
            d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d) return d;
            if (c) while (c = c.nextSibling) if (c === b) return - 1;
            return a ? 1 : - 1
        }
        function kb(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return 'input' === c && b.type === a
            }
        }
        function lb(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ('input' === c || 'button' === c) && b.type === a
            }
        }
        function mb(a) {
            return gb(function (b) {
                return b = + b,
                gb(function (c, d) {
                    var e,
                    f = a([], c.length, b),
                    g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }
        function nb(a) {
            return a && typeof a.getElementsByTagName !== B && a
        }
        c = eb.support = {
        },
        g = eb.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? 'HTML' !== b.nodeName : !1
        },
        l = eb.setDocument = function (a) {
            var b,
            d = a ? a.ownerDocument || a : u,
            f = d.defaultView;
            return d !== m && 9 === d.nodeType && d.documentElement ? (m = d, n = d.documentElement, o = !g(d), f && f.attachEvent && f !== f.top && f.attachEvent('onbeforeunload', function () {
                l()
            }), c.attributes = hb(function (a) {
                return a.className = 'i',
                !a.getAttribute('className')
            }), c.getElementsByTagName = hb(function (a) {
                return a.appendChild(d.createComment('')),
                !a.getElementsByTagName('*').length
            }), c.getElementsByClassName = Z.test(d.getElementsByClassName) && hb(function (a) {
                return a.innerHTML = '<div class=\'a\'></div><div class=\'a i\'></div>',
                a.firstChild.className = 'i',
                2 === a.getElementsByClassName('i').length
            }), c.getById = hb(function (a) {
                return n.appendChild(a).id = t,
                !d.getElementsByName || !d.getElementsByName(t).length
            }), c.getById ? (e.find.ID = function (a, b) {
                if (typeof b.getElementById !== B && o) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [
                        c
                    ] : [
                    ]
                }
            }, e.filter.ID = function (a) {
                var b = a.replace(bb, cb);
                return function (a) {
                    return a.getAttribute('id') === b
                }
            })  : (delete e.find.ID, e.filter.ID = function (a) {
                var b = a.replace(bb, cb);
                return function (a) {
                    var c = typeof a.getAttributeNode !== B && a.getAttributeNode('id');
                    return c && c.value === b
                }
            }), e.find.TAG = c.getElementsByTagName ? function (a, b) {
                return typeof b.getElementsByTagName !== B ? b.getElementsByTagName(a)  : void 0
            }
             : function (a, b) {
                var c,
                d = [
                ],
                e = 0,
                f = b.getElementsByTagName(a);
                if ('*' === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, e.find.CLASS = c.getElementsByClassName && function (a, b) {
                return typeof b.getElementsByClassName !== B && o ? b.getElementsByClassName(a)  : void 0
            }, q = [
            ], p = [
            ], (c.qsa = Z.test(d.querySelectorAll)) && (hb(function (a) {
                a.innerHTML = '<select><option selected=\'\'></option></select>',
                a.querySelectorAll('[selected]').length || p.push('\\[' + L + '*(?:value|' + K + ')'),
                a.querySelectorAll(':checked').length || p.push(':checked')
            }), hb(function (a) {
                var b = d.createElement('input');
                b.setAttribute('type', 'hidden'),
                a.appendChild(b).setAttribute('t', ''),
                a.querySelectorAll('[t^=\'\']').length && p.push('[*^$]=' + L + '*(?:\'\'|"")'),
                a.querySelectorAll(':enabled').length || p.push(':enabled', ':disabled'),
                a.querySelectorAll('*,:x'),
                p.push(',.*:')
            })), (c.matchesSelector = Z.test(r = n.webkitMatchesSelector || n.mozMatchesSelector || n.oMatchesSelector || n.msMatchesSelector)) && hb(function (a) {
                c.disconnectedMatch = r.call(a, 'div'),
                r.call(a, '[s!=\'\']:x'),
                q.push('!=', P)
            }), p = p.length && new RegExp(p.join('|')), q = q.length && new RegExp(q.join('|')), b = Z.test(n.compareDocumentPosition), s = b || Z.test(n.contains) ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d)  : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            }
             : function (a, b) {
                if (b) while (b = b.parentNode) if (b === a) return !0;
                return !1
            }, A = b ? function (a, b) {
                if (a === b) return k = !0,
                0;
                var e = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return e ? e : (e = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b)  : 1, 1 & e || !c.sortDetached && b.compareDocumentPosition(a) === e ? a === d || a.ownerDocument === u && s(u, a) ? - 1 : b === d || b.ownerDocument === u && s(u, b) ? 1 : j ? J.call(j, a) - J.call(j, b)  : 0 : 4 & e ? - 1 : 1)
            }
             : function (a, b) {
                if (a === b) return k = !0,
                0;
                var c,
                e = 0,
                f = a.parentNode,
                g = b.parentNode,
                h = [
                    a
                ],
                i = [
                    b
                ];
                if (!f || !g) return a === d ? - 1 : b === d ? 1 : f ? - 1 : g ? 1 : j ? J.call(j, a) - J.call(j, b)  : 0;
                if (f === g) return jb(a, b);
                c = a;
                while (c = c.parentNode) h.unshift(c);
                c = b;
                while (c = c.parentNode) i.unshift(c);
                while (h[e] === i[e]) e++;
                return e ? jb(h[e], i[e])  : h[e] === u ? - 1 : i[e] === u ? 1 : 0
            }, d)  : m
        },
        eb.matches = function (a, b) {
            return eb(a, null, null, b)
        },
        eb.matchesSelector = function (a, b) {
            if ((a.ownerDocument || a) !== m && l(a), b = b.replace(T, '=\'$1\']'), !(!c.matchesSelector || !o || q && q.test(b) || p && p.test(b))) try {
                var d = r.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {
            }
            return eb(b, m, null, [
                a
            ]).length > 0
        },
        eb.contains = function (a, b) {
            return (a.ownerDocument || a) !== m && l(a),
            s(a, b)
        },
        eb.attr = function (a, b) {
            (a.ownerDocument || a) !== m && l(a);
            var d = e.attrHandle[b.toLowerCase()],
            f = d && D.call(e.attrHandle, b.toLowerCase()) ? d(a, b, !o)  : void 0;
            return void 0 !== f ? f : c.attributes || !o ? a.getAttribute(b)  : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        },
        eb.error = function (a) {
            throw new Error('Syntax error, unrecognized expression: ' + a)
        },
        eb.uniqueSort = function (a) {
            var b,
            d = [
            ],
            e = 0,
            f = 0;
            if (k = !c.detectDuplicates, j = !c.sortStable && a.slice(0), a.sort(A), k) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return j = null,
            a
        },
        f = eb.getText = function (a) {
            var b,
            c = '',
            d = 0,
            e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ('string' == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += f(a)
                } else if (3 === e || 4 === e) return a.nodeValue
            } else while (b = a[d++]) c += f(b);
            return c
        },
        e = eb.selectors = {
            cacheLength: 50,
            createPseudo: gb,
            match: W,
            attrHandle: {
            },
            find: {
            },
            relative: {
                '>': {
                    dir: 'parentNode',
                    first: !0
                },
                ' ': {
                    dir: 'parentNode'
                },
                '+': {
                    dir: 'previousSibling',
                    first: !0
                },
                '~': {
                    dir: 'previousSibling'
                }
            },
            preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(bb, cb),
                    a[3] = (a[4] || a[5] || '').replace(bb, cb),
                    '~=' === a[2] && (a[3] = ' ' + a[3] + ' '),
                    a.slice(0, 4)
                },
                CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(),
                    'nth' === a[1].slice(0, 3) ? (a[3] || eb.error(a[0]), a[4] = + (a[4] ? a[5] + (a[6] || 1)  : 2 * ('even' === a[3] || 'odd' === a[3])), a[5] = + (a[7] + a[8] || 'odd' === a[3]))  : a[3] && eb.error(a[0]),
                    a
                },
                PSEUDO: function (a) {
                    var b,
                    c = !a[5] && a[2];
                    return W.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && U.test(c) && (b = pb(c, !0)) && (b = c.indexOf(')', c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function (a) {
                    var b = a.replace(bb, cb).toLowerCase();
                    return '*' === a ? function () {
                        return !0
                    }
                     : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function (a) {
                    var b = x[a + ' '];
                    return b || (b = new RegExp('(^|' + L + ')' + a + '(' + L + '|$)')) && x(a, function (a) {
                        return b.test('string' == typeof a.className && a.className || typeof a.getAttribute !== B && a.getAttribute('class') || '')
                    })
                },
                ATTR: function (a, b, c) {
                    return function (d) {
                        var e = eb.attr(d, a);
                        return null == e ? '!=' === b : b ? (e += '', '=' === b ? e === c : '!=' === b ? e !== c : '^=' === b ? c && 0 === e.indexOf(c)  : '*=' === b ? c && e.indexOf(c) > - 1 : '$=' === b ? c && e.slice( - c.length) === c : '~=' === b ? (' ' + e + ' ').indexOf(c) > - 1 : '|=' === b ? e === c || e.slice(0, c.length + 1) === c + '-' : !1)  : !0
                    }
                },
                CHILD: function (a, b, c, d, e) {
                    var f = 'nth' !== a.slice(0, 3),
                    g = 'last' !== a.slice( - 4),
                    h = 'of-type' === b;
                    return 1 === d && 0 === e ? function (a) {
                        return !!a.parentNode
                    }
                     : function (b, c, i) {
                        var j,
                        k,
                        l,
                        m,
                        n,
                        o,
                        p = f !== g ? 'nextSibling' : 'previousSibling',
                        q = b.parentNode,
                        r = h && b.nodeName.toLowerCase(),
                        s = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p]) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = 'only' === a && !o && 'nextSibling'
                                }
                                return !0
                            }
                            if (o = [
                                g ? q.firstChild : q.lastChild
                            ], g && s) {
                                k = q[t] || (q[t] = {
                                }),
                                j = k[a] || [],
                                n = j[0] === v && j[1],
                                m = j[0] === v && j[2],
                                l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if (1 === l.nodeType && ++m && l === b) {
                                    k[a] = [
                                        v,
                                        n,
                                        m
                                    ];
                                    break
                                }
                            } else if (s && (j = (b[t] || (b[t] = {
                            })) [a]) && j[0] === v) m = j[1];
                             else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[t] || (l[t] = {
                            })) [a] = [
                                v,
                                m
                            ]), l === b)) break;
                            return m -= e,
                            m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function (a, b) {
                    var c,
                    d = e.pseudos[a] || e.setFilters[a.toLowerCase()] || eb.error('unsupported pseudo: ' + a);
                    return d[t] ? d(b)  : d.length > 1 ? (c = [
                        a,
                        a,
                        '',
                        b
                    ], e.setFilters.hasOwnProperty(a.toLowerCase()) ? gb(function (a, c) {
                        var e,
                        f = d(a, b),
                        g = f.length;
                        while (g--) e = J.call(a, f[g]),
                        a[e] = !(c[e] = f[g])
                    })  : function (a) {
                        return d(a, 0, c)
                    })  : d
                }
            },
            pseudos: {
                not: gb(function (a) {
                    var b = [
                    ],
                    c = [
                    ],
                    d = h(a.replace(Q, '$1'));
                    return d[t] ? gb(function (a, b, c, e) {
                        var f,
                        g = d(a, null, e, [
                        ]),
                        h = a.length;
                        while (h--) (f = g[h]) && (a[h] = !(b[h] = f))
                    })  : function (a, e, f) {
                        return b[0] = a,
                        d(b, null, f, c),
                        !c.pop()
                    }
                }),
                has: gb(function (a) {
                    return function (b) {
                        return eb(a, b).length > 0
                    }
                }),
                contains: gb(function (a) {
                    return function (b) {
                        return (b.textContent || b.innerText || f(b)).indexOf(a) > - 1
                    }
                }),
                lang: gb(function (a) {
                    return V.test(a || '') || eb.error('unsupported lang: ' + a),
                    a = a.replace(bb, cb).toLowerCase(),
                    function (b) {
                        var c;
                        do if (c = o ? b.lang : b.getAttribute('xml:lang') || b.getAttribute('lang')) return c = c.toLowerCase(),
                        c === a || 0 === c.indexOf(a + '-');
                        while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }),
                target: function (b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function (a) {
                    return a === n
                },
                focus: function (a) {
                    return a === m.activeElement && (!m.hasFocus || m.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function (a) {
                    return a.disabled === !1
                },
                disabled: function (a) {
                    return a.disabled === !0
                },
                checked: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return 'input' === b && !!a.checked || 'option' === b && !!a.selected
                },
                selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0
                },
                empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;

                    return !0
                },
                parent: function (a) {
                    return !e.pseudos.empty(a)
                },
                header: function (a) {
                    return Y.test(a.nodeName)
                },
                input: function (a) {
                    return X.test(a.nodeName)
                },
                button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return 'input' === b && 'button' === a.type || 'button' === b
                },
                text: function (a) {
                    var b;
                    return 'input' === a.nodeName.toLowerCase() && 'text' === a.type && (null == (b = a.getAttribute('type')) || 'text' === b.toLowerCase())
                },
                first: mb(function () {
                    return [0]
                }),
                last: mb(function (a, b) {
                    return [b - 1]
                }),
                eq: mb(function (a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: mb(function (a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: mb(function (a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: mb(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                    return a
                }),
                gt: mb(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
                    return a
                })
            }
        },
        e.pseudos.nth = e.pseudos.eq;
        for (b in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) e.pseudos[b] = kb(b);
        for (b in {
            submit: !0,
            reset: !0
        }) e.pseudos[b] = lb(b);
        function ob() {
        }
        ob.prototype = e.filters = e.pseudos,
        e.setFilters = new ob;
        function pb(a, b) {
            var c,
            d,
            f,
            g,
            h,
            i,
            j,
            k = y[a + ' '];
            if (k) return b ? 0 : k.slice(0);
            h = a,
            i = [
            ],
            j = e.preFilter;
            while (h) {
                (!c || (d = R.exec(h))) && (d && (h = h.slice(d[0].length) || h), i.push(f = [
                ])),
                c = !1,
                (d = S.exec(h)) && (c = d.shift(), f.push({
                    value: c,
                    type: d[0].replace(Q, ' ')
                }), h = h.slice(c.length));
                for (g in e.filter) !(d = W[g].exec(h)) || j[g] && !(d = j[g](d)) || (c = d.shift(), f.push({
                    value: c,
                    type: g,
                    matches: d
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? eb.error(a)  : y(a, i).slice(0)
        }
        function qb(a) {
            for (var b = 0, c = a.length, d = ''; c > b; b++) d += a[b].value;
            return d
        }
        function rb(a, b, c) {
            var e = b.dir,
            f = c && 'parentNode' === e,
            g = w++;
            return b.first ? function (b, c, d) {
                while (b = b[e]) if (1 === b.nodeType || f) return a(b, c, d)
            }
             : function (b, c, h) {
                var i,
                j,
                k,
                l = v + ' ' + g;
                if (h) {
                    while (b = b[e]) if ((1 === b.nodeType || f) && a(b, c, h)) return !0
                } else while (b = b[e]) if (1 === b.nodeType || f) if (k = b[t] || (b[t] = {
                }), (j = k[e]) && j[0] === l) {
                    if ((i = j[1]) === !0 || i === d) return i === !0
                } else if (j = k[e] = [
                    l
                ], j[1] = a(b, c, h) || d, j[1] === !0) return !0
            }
        }
        function sb(a) {
            return a.length > 1 ? function (b, c, d) {
                var e = a.length;
                while (e--) if (!a[e](b, c, d)) return !1;
                return !0
            }
             : a[0]
        }
        function tb(a, b, c, d, e) {
            for (var f, g = [
            ], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }
        function ub(a, b, c, d, e, f) {
            return d && !d[t] && (d = ub(d)),
            e && !e[t] && (e = ub(e, f)),
            gb(function (f, g, h, i) {
                var j,
                k,
                l,
                m = [
                ],
                n = [
                ],
                o = g.length,
                p = f || xb(b || '*', h.nodeType ? [
                    h
                ] : h, [
                ]),
                q = !a || !f && b ? p : tb(p, m, a, h, i),
                r = c ? e || (f ? a : o || d) ? [
                ] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = tb(r, n),
                    d(j, [
                    ], h, i),
                    k = j.length;
                    while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [
                            ],
                            k = r.length;
                            while (k--) (l = r[k]) && j.push(q[k] = l);
                            e(null, r = [
                            ], j, i)
                        }
                        k = r.length;
                        while (k--) (l = r[k]) && (j = e ? J.call(f, l)  : m[k]) > - 1 && (f[j] = !(g[j] = l))
                    }
                } else r = tb(r === g ? r.splice(o, r.length)  : r),
                e ? e(null, g, r, i)  : H.apply(g, r)
            })
        }
        function vb(a) {
            for (var b, c, d, f = a.length, g = e.relative[a[0].type], h = g || e.relative[' '], j = g ? 1 : 0, k = rb(function (a) {
                return a === b
            }, h, !0), l = rb(function (a) {
                return J.call(b, a) > - 1
            }, h, !0), m = [
                function (a, c, d) {
                    return !g && (d || c !== i) || ((b = c).nodeType ? k(a, c, d)  : l(a, c, d))
                }
            ]; f > j; j++) if (c = e.relative[a[j].type]) m = [
                rb(sb(m), c)
            ];
             else {
                if (c = e.filter[a[j].type].apply(null, a[j].matches), c[t]) {
                    for (d = ++j; f > d; d++) if (e.relative[a[d].type]) break;
                    return ub(j > 1 && sb(m), j > 1 && qb(a.slice(0, j - 1).concat({
                        value: ' ' === a[j - 2].type ? '*' : ''
                    })).replace(Q, '$1'), c, d > j && vb(a.slice(j, d)), f > d && vb(a = a.slice(d)), f > d && qb(a))
                }
                m.push(c)
            }
            return sb(m)
        }
        function wb(a, b) {
            var c = 0,
            f = b.length > 0,
            g = a.length > 0,
            h = function (h, j, k, l, n) {
                var o,
                p,
                q,
                r = 0,
                s = '0',
                t = h && [],
                u = [
                ],
                w = i,
                x = h || g && e.find.TAG('*', n),
                y = v += null == w ? 1 : Math.random() || 0.1,
                z = x.length;
                for (n && (i = j !== m && j, d = c); s !== z && null != (o = x[s]); s++) {
                    if (g && o) {
                        p = 0;
                        while (q = a[p++]) if (q(o, j, k)) {
                            l.push(o);
                            break
                        }
                        n && (v = y, d = ++c)
                    }
                    f && ((o = !q && o) && r--, h && t.push(o))
                }
                if (r += s, f && s !== r) {
                    p = 0;
                    while (q = b[p++]) q(t, u, j, k);
                    if (h) {
                        if (r > 0) while (s--) t[s] || u[s] || (u[s] = F.call(l));
                        u = tb(u)
                    }
                    H.apply(l, u),
                    n && !h && u.length > 0 && r + b.length > 1 && eb.uniqueSort(l)
                }
                return n && (v = y, i = w),
                t
            };
            return f ? gb(h)  : h
        }
        h = eb.compile = function (a, b) {
            var c,
            d = [
            ],
            e = [
            ],
            f = z[a + ' '];
            if (!f) {
                b || (b = pb(a)),
                c = b.length;
                while (c--) f = vb(b[c]),
                f[t] ? d.push(f)  : e.push(f);
                f = z(a, wb(e, d))
            }
            return f
        };
        function xb(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) eb(a, b[d], c);
            return c
        }
        function yb(a, b, d, f) {
            var g,
            i,
            j,
            k,
            l,
            m = pb(a);
            if (!f && 1 === m.length) {
                if (i = m[0] = m[0].slice(0), i.length > 2 && 'ID' === (j = i[0]).type && c.getById && 9 === b.nodeType && o && e.relative[i[1].type]) {
                    if (b = (e.find.ID(j.matches[0].replace(bb, cb), b) || []) [0], !b) return d;
                    a = a.slice(i.shift().value.length)
                }
                g = W.needsContext.test(a) ? 0 : i.length;
                while (g--) {
                    if (j = i[g], e.relative[k = j.type]) break;
                    if ((l = e.find[k]) && (f = l(j.matches[0].replace(bb, cb), _.test(i[0].type) && nb(b.parentNode) || b))) {
                        if (i.splice(g, 1), a = f.length && qb(i), !a) return H.apply(d, f),
                        d;
                        break
                    }
                }
            }
            return h(a, m) (f, b, !o, d, _.test(a) && nb(b.parentNode) || b),
            d
        }
        return c.sortStable = t.split('').sort(A).join('') === t,
        c.detectDuplicates = !!k,
        l(),
        c.sortDetached = hb(function (a) {
            return 1 & a.compareDocumentPosition(m.createElement('div'))
        }),
        hb(function (a) {
            return a.innerHTML = '<a href=\'#\'></a>',
            '#' === a.firstChild.getAttribute('href')
        }) || ib('type|href|height|width', function (a, b, c) {
            return c ? void 0 : a.getAttribute(b, 'type' === b.toLowerCase() ? 1 : 2)
        }),
        c.attributes && hb(function (a) {
            return a.innerHTML = '<input/>',
            a.firstChild.setAttribute('value', ''),
            '' === a.firstChild.getAttribute('value')
        }) || ib('value', function (a, b, c) {
            return c || 'input' !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }),
        hb(function (a) {
            return null == a.getAttribute('disabled')
        }) || ib(K, function (a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase()  : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }),
        eb
    }(a);
    o.find = u,
    o.expr = u.selectors,
    o.expr[':'] = o.expr.pseudos,
    o.unique = u.uniqueSort,
    o.text = u.getText,
    o.isXMLDoc = u.isXML,
    o.contains = u.contains;
    var v = o.expr.match.needsContext,
    w = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    x = /^.[^:#\[\.,]*$/;
    function y(a, b, c) {
        if (o.isFunction(b)) return o.grep(a, function (a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return o.grep(a, function (a) {
            return a === b !== c
        });
        if ('string' == typeof b) {
            if (x.test(b)) return o.filter(b, a, c);
            b = o.filter(b, a)
        }
        return o.grep(a, function (a) {
            return o.inArray(a, b) >= 0 !== c
        })
    }
    o.filter = function (a, b, c) {
        var d = b[0];
        return c && (a = ':not(' + a + ')'),
        1 === b.length && 1 === d.nodeType ? o.find.matchesSelector(d, a) ? [
            d
        ] : [
        ] : o.find.matches(a, o.grep(b, function (a) {
            return 1 === a.nodeType
        }))
    },
    o.fn.extend({
        find: function (a) {
            var b,
            c = [
            ],
            d = this,
            e = d.length;
            if ('string' != typeof a) return this.pushStack(o(a).filter(function () {
                for (b = 0; e > b; b++) if (o.contains(d[b], this)) return !0
            }));
            for (b = 0; e > b; b++) o.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? o.unique(c)  : c),
            c.selector = this.selector ? this.selector + ' ' + a : a,
            c
        },
        filter: function (a) {
            return this.pushStack(y(this, a || [], !1))
        },
        not: function (a) {
            return this.pushStack(y(this, a || [], !0))
        },
        is: function (a) {
            return !!y(this, 'string' == typeof a && v.test(a) ? o(a)  : a || [], !1).length
        }
    });
    var z,
    A = a.document,
    B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    C = o.fn.init = function (a, b) {
        var c,
        d;
        if (!a) return this;
        if ('string' == typeof a) {
            if (c = '<' === a.charAt(0) && '>' === a.charAt(a.length - 1) && a.length >= 3 ? [
                null,
                a,
                null
            ] : B.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || z).find(a)  : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof o ? b[0] : b, o.merge(this, o.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : A, !0)), w.test(c[1]) && o.isPlainObject(b)) for (c in b) o.isFunction(this[c]) ? this[c](b[c])  : this.attr(c, b[c]);
                return this
            }
            if (d = A.getElementById(c[2]), d && d.parentNode) {
                if (d.id !== c[2]) return z.find(a);
                this.length = 1,
                this[0] = d
            }
            return this.context = A,
            this.selector = a,
            this
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this)  : o.isFunction(a) ? 'undefined' != typeof z.ready ? z.ready(a)  : a(o)  : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), o.makeArray(a, this))
    };
    C.prototype = o.fn,
    z = o(A);
    var D = /^(?:parents|prev(?:Until|All))/,
    E = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    o.extend({
        dir: function (a, b, c) {
            var d = [
            ],
            e = a[b];
            while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !o(e).is(c))) 1 === e.nodeType && d.push(e),
            e = e[b];
            return d
        },
        sibling: function (a, b) {
            for (var c = [
            ]; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }),
    o.fn.extend({
        has: function (a) {
            var b,
            c = o(a, this),
            d = c.length;
            return this.filter(function () {
                for (b = 0; d > b; b++) if (o.contains(this, c[b])) return !0
            })
        },
        closest: function (a, b) {
            for (var c, d = 0, e = this.length, f = [
            ], g = v.test(a) || 'string' != typeof a ? o(a, b || this.context)  : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > - 1 : 1 === c.nodeType && o.find.matchesSelector(c, a))) {
                f.push(c);
                break
            }
            return this.pushStack(f.length > 1 ? o.unique(f)  : f)
        },
        index: function (a) {
            return a ? 'string' == typeof a ? o.inArray(this[0], o(a))  : o.inArray(a.jquery ? a[0] : a, this)  : this[0] && this[0].parentNode ? this.first().prevAll().length : - 1
        },
        add: function (a, b) {
            var c = 'string' == typeof a ? o(a, b)  : o.makeArray(a && a.nodeType ? [
                a
            ] : a),
            d = o.merge(this.get(), c);
            return this.pushStack(o.unique(d))
        },
        addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });
    function F(a, b) {
        do a = a[b];
        while (a && 1 !== a.nodeType);
        return a
    }
    o.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function (a) {
            return o.dir(a, 'parentNode')
        },
        parentsUntil: function (a, b, c) {
            return o.dir(a, 'parentNode', c)
        },
        next: function (a) {
            return F(a, 'nextSibling')
        },
        prev: function (a) {
            return F(a, 'previousSibling')
        },
        nextAll: function (a) {
            return o.dir(a, 'nextSibling')
        },
        prevAll: function (a) {
            return o.dir(a, 'previousSibling')
        },
        nextUntil: function (a, b, c) {
            return o.dir(a, 'nextSibling', c)
        },
        prevUntil: function (a, b, c) {
            return o.dir(a, 'previousSibling', c)
        },
        siblings: function (a) {
            return o.sibling((a.parentNode || {
            }).firstChild, a)
        },
        children: function (a) {
            return o.sibling(a.firstChild)
        },
        contents: function (a) {
            return o.nodeName(a, 'iframe') ? a.contentDocument || a.contentWindow.document : o.merge([], a.childNodes)
        }
    }, function (a, b) {
        o.fn[a] = function (c, d) {
            var e = o.map(this, b, c);
            return 'Until' !== a.slice( - 5) && (d = c),
            d && 'string' == typeof d && (e = o.filter(d, e)),
            this.length > 1 && (E[a] || (e = o.unique(e)), D.test(a) && (e = e.reverse())),
            this.pushStack(e)
        }
    });
    var G = /\S+/g,
    H = {
    };
    function I(a) {
        var b = H[a] = {
        };
        return o.each(a.match(G) || [], function (a, c) {
            b[c] = !0
        }),
        b
    }
    o.Callbacks = function (a) {
        a = 'string' == typeof a ? H[a] || I(a)  : o.extend({
        }, a);
        var b,
        c,
        d,
        e,
        f,
        g,
        h = [
        ],
        i = !a.once && [],
        j = function (l) {
            for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++) if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                c = !1;
                break
            }
            b = !1,
            h && (i ? i.length && j(i.shift())  : c ? h = [
            ] : k.disable())
        },
        k = {
            add: function () {
                if (h) {
                    var d = h.length;
                    !function f(b) {
                        o.each(b, function (b, c) {
                            var d = o.type(c);
                            'function' === d ? a.unique && k.has(c) || h.push(c)  : c && c.length && 'string' !== d && f(c)
                        })
                    }(arguments),
                    b ? e = h.length : c && (g = d, j(c))
                }
                return this
            },
            remove: function () {
                return h && o.each(arguments, function (a, c) {
                    var d;
                    while ((d = o.inArray(c, h, d)) > - 1) h.splice(d, 1),
                    b && (e >= d && e--, f >= d && f--)
                }),
                this
            },
            has: function (a) {
                return a ? o.inArray(a, h) > - 1 : !(!h || !h.length)
            },
            empty: function () {
                return h = [
                ],
                e = 0,
                this
            },
            disable: function () {
                return h = i = c = void 0,
                this
            },
            disabled: function () {
                return !h
            },
            lock: function () {
                return i = void 0,
                c || k.disable(),
                this
            },
            locked: function () {
                return !i
            },
            fireWith: function (a, c) {
                return !h || d && !i || (c = c || [], c = [
                    a,
                    c.slice ? c.slice()  : c
                ], b ? i.push(c)  : j(c)),
                this
            },
            fire: function () {
                return k.fireWith(this, arguments),
                this
            },
            fired: function () {
                return !!d
            }
        };
        return k
    },
    o.extend({
        Deferred: function (a) {
            var b = [
                ['resolve',
                'done',
                o.Callbacks('once memory'),
                'resolved'],
                [
                    'reject',
                    'fail',
                    o.Callbacks('once memory'),
                    'rejected'
                ],
                [
                    'notify',
                    'progress',
                    o.Callbacks('memory')
                ]
            ],
            c = 'pending',
            d = {
                state: function () {
                    return c
                },
                always: function () {
                    return e.done(arguments).fail(arguments),
                    this
                },
                then: function () {
                    var a = arguments;
                    return o.Deferred(function (c) {
                        o.each(b, function (b, f) {
                            var g = o.isFunction(a[b]) && a[b];
                            e[f[1]](function () {
                                var a = g && g.apply(this, arguments);
                                a && o.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify)  : c[f[0] + 'With'](this === d ? c.promise()  : this, g ? [
                                    a
                                ] : arguments)
                            })
                        }),
                        a = null
                    }).promise()
                },
                promise: function (a) {
                    return null != a ? o.extend(a, d)  : d
                }
            },
            e = {
            };
            return d.pipe = d.then,
            o.each(b, function (a, f) {
                var g = f[2],
                h = f[3];
                d[f[1]] = g.add,
                h && g.add(function () {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock),
                e[f[0]] = function () {
                    return e[f[0] + 'With'](this === e ? d : this, arguments),
                    this
                },
                e[f[0] + 'With'] = g.fireWith
            }),
            d.promise(e),
            a && a.call(e, e),
            e
        },
        when: function (a) {
            var b = 0,
            d = c.call(arguments),
            e = d.length,
            f = 1 !== e || a && o.isFunction(a.promise) ? e : 0,
            g = 1 === f ? a : o.Deferred(),
            h = function (a, b, d) {
                return function (e) {
                    b[a] = this,
                    d[a] = arguments.length > 1 ? c.call(arguments)  : e,
                    d === i ? g.notifyWith(b, d)  : --f || g.resolveWith(b, d)
                }
            },
            i,
            j,
            k;
            if (e > 1) for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) d[b] && o.isFunction(d[b].promise) ? d[b].promise().done(h(b, k, d)).fail(g.reject).progress(h(b, j, i))  : --f;
            return f || g.resolveWith(k, d),
            g.promise()
        }
    });
    var J;
    o.fn.ready = function (a) {
        return o.ready.promise().done(a),
        this
    },
    o.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function (a) {
            a ? o.readyWait++ : o.ready(!0)
        },
        ready: function (a) {
            if (a === !0 ? !--o.readyWait : !o.isReady) {
                if (!A.body) return setTimeout(o.ready);
                o.isReady = !0,
                a !== !0 && --o.readyWait > 0 || (J.resolveWith(A, [
                    o
                ]), o.fn.trigger && o(A).trigger('ready').off('ready'))
            }
        }
    });
    function K() {
        A.addEventListener ? (A.removeEventListener('DOMContentLoaded', L, !1), a.removeEventListener('load', L, !1))  : (A.detachEvent('onreadystatechange', L), a.detachEvent('onload', L))
    }
    function L() {
        (A.addEventListener || 'load' === event.type || 'complete' === A.readyState) && (K(), o.ready())
    }
    o.ready.promise = function (b) {
        if (!J) if (J = o.Deferred(), 'complete' === A.readyState) setTimeout(o.ready);
         else if (A.addEventListener) A.addEventListener('DOMContentLoaded', L, !1),
        a.addEventListener('load', L, !1);
         else {
            A.attachEvent('onreadystatechange', L),
            a.attachEvent('onload', L);
            var c = !1;
            try {
                c = null == a.frameElement && A.documentElement
            } catch (d) {
            }
            c && c.doScroll && !function e() {
                if (!o.isReady) {
                    try {
                        c.doScroll('left')
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    K(),
                    o.ready()
                }
            }()
        }
        return J.promise(b)
    };
    var M = 'undefined',
    N;
    for (N in o(k)) break;
    k.ownLast = '0' !== N,
    k.inlineBlockNeedsLayout = !1,
    o(function () {
        var a,
        b,
        c = A.getElementsByTagName('body') [0];
        c && (a = A.createElement('div'), a.style.cssText = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px', b = A.createElement('div'), c.appendChild(a).appendChild(b), typeof b.style.zoom !== M && (b.style.cssText = 'border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1', (k.inlineBlockNeedsLayout = 3 === b.offsetWidth) && (c.style.zoom = 1)), c.removeChild(a), a = b = null)
    }),
    function () {
        var a = A.createElement('div');
        if (null == k.deleteExpando) {
            k.deleteExpando = !0;
            try {
                delete a.test
            } catch (b) {
                k.deleteExpando = !1
            }
        }
        a = null
    }(),
    o.acceptData = function (a) {
        var b = o.noData[(a.nodeName + ' ').toLowerCase()],
        c = + a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute('classid') === b
    };
    var O = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    P = /([A-Z])/g;
    function Q(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = 'data-' + b.replace(P, '-$1').toLowerCase();
            if (c = a.getAttribute(d), 'string' == typeof c) {
                try {
                    c = 'true' === c ? !0 : 'false' === c ? !1 : 'null' === c ? null : + c + '' === c ? + c : O.test(c) ? o.parseJSON(c)  : c
                } catch (e) {
                }
                o.data(a, b, c)
            } else c = void 0
        }
        return c
    }
    function R(a) {
        var b;
        for (b in a) if (('data' !== b || !o.isEmptyObject(a[b])) && 'toJSON' !== b) return !1;
        return !0
    }
    function S(a, c, d, e) {
        if (o.acceptData(a)) {
            var f,
            g,
            h = o.expando,
            i = a.nodeType,
            j = i ? o.cache : a,
            k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || 'string' != typeof c) return k || (k = i ? a[h] = b.pop() || o.guid++ : h),
            j[k] || (j[k] = i ? {
            }
             : {
                toJSON: o.noop
            }),
            ('object' == typeof c || 'function' == typeof c) && (e ? j[k] = o.extend(j[k], c)  : j[k].data = o.extend(j[k].data, c)),
            g = j[k],
            e || (g.data || (g.data = {
            }), g = g.data),
            void 0 !== d && (g[o.camelCase(c)] = d),
            'string' == typeof c ? (f = g[c], null == f && (f = g[o.camelCase(c)]))  : f = g,
            f
        }
    }
    function T(a, b, c) {
        if (o.acceptData(a)) {
            var d,
            e,
            f = a.nodeType,
            g = f ? o.cache : a,
            h = f ? a[o.expando] : o.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    o.isArray(b) ? b = b.concat(o.map(b, o.camelCase))  : b in d ? b = [
                        b
                    ] : (b = o.camelCase(b), b = b in d ? [
                        b
                    ] : b.split(' ')),
                    e = b.length;
                    while (e--) delete d[b[e]];
                    if (c ? !R(d)  : !o.isEmptyObject(d)) return
                }(c || (delete g[h].data, R(g[h]))) && (f ? o.cleanData([a], !0)  : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
            }
        }
    }
    o.extend({
        cache: {
        },
        noData: {
            'applet ': !0,
            'embed ': !0,
            'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'
        },
        hasData: function (a) {
            return a = a.nodeType ? o.cache[a[o.expando]] : a[o.expando],
            !!a && !R(a)
        },
        data: function (a, b, c) {
            return S(a, b, c)
        },
        removeData: function (a, b) {
            return T(a, b)
        },
        _data: function (a, b, c) {
            return S(a, b, c, !0)
        },
        _removeData: function (a, b) {
            return T(a, b, !0)
        }
    }),
    o.fn.extend({
        data: function (a, b) {
            var c,
            d,
            e,
            f = this[0],
            g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = o.data(f), 1 === f.nodeType && !o._data(f, 'parsedAttrs'))) {
                    c = g.length;
                    while (c--) d = g[c].name,
                    0 === d.indexOf('data-') && (d = o.camelCase(d.slice(5)), Q(f, d, e[d]));
                    o._data(f, 'parsedAttrs', !0)
                }
                return e
            }
            return 'object' == typeof a ? this.each(function () {
                o.data(this, a)
            })  : arguments.length > 1 ? this.each(function () {
                o.data(this, a, b)
            })  : f ? Q(f, a, o.data(f, a))  : void 0
        },
        removeData: function (a) {
            return this.each(function () {
                o.removeData(this, a)
            })
        }
    }),
    o.extend({
        queue: function (a, b, c) {
            var d;
            return a ? (b = (b || 'fx') + 'queue', d = o._data(a, b), c && (!d || o.isArray(c) ? d = o._data(a, b, o.makeArray(c))  : d.push(c)), d || [])  : void 0
        },
        dequeue: function (a, b) {
            b = b || 'fx';
            var c = o.queue(a, b),
            d = c.length,
            e = c.shift(),
            f = o._queueHooks(a, b),
            g = function () {
                o.dequeue(a, b)
            };
            'inprogress' === e && (e = c.shift(), d--),
            e && ('fx' === b && c.unshift('inprogress'), delete f.stop, e.call(a, g, f)),
            !d && f && f.empty.fire()
        },
        _queueHooks: function (a, b) {
            var c = b + 'queueHooks';
            return o._data(a, c) || o._data(a, c, {
                empty: o.Callbacks('once memory').add(function () {
                    o._removeData(a, b + 'queue'),
                    o._removeData(a, c)
                })
            })
        }
    }),
    o.fn.extend({
        queue: function (a, b) {
            var c = 2;
            return 'string' != typeof a && (b = a, a = 'fx', c--),
            arguments.length < c ? o.queue(this[0], a)  : void 0 === b ? this : this.each(function () {
                var c = o.queue(this, a, b);
                o._queueHooks(this, a),
                'fx' === a && 'inprogress' !== c[0] && o.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                o.dequeue(this, a)
            })
        },
        clearQueue: function (a) {
            return this.queue(a || 'fx', [
            ])
        },
        promise: function (a, b) {
            var c,
            d = 1,
            e = o.Deferred(),
            f = this,
            g = this.length,
            h = function () {
                --d || e.resolveWith(f, [
                    f
                ])
            };
            'string' != typeof a && (b = a, a = void 0),
            a = a || 'fx';
            while (g--) c = o._data(f[g], a + 'queueHooks'),
            c && c.empty && (d++, c.empty.add(h));
            return h(),
            e.promise(b)
        }
    });
    var U = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    V = [
        'Top',
        'Right',
        'Bottom',
        'Left'
    ],
    W = function (a, b) {
        return a = b || a,
        'none' === o.css(a, 'display') || !o.contains(a.ownerDocument, a)
    },
    X = o.access = function (a, b, c, d, e, f, g) {
        var h = 0,
        i = a.length,
        j = null == c;
        if ('object' === o.type(c)) {
            e = !0;
            for (h in c) o.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, o.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null)  : (j = b, b = function (a, b, c) {
            return j.call(o(a), c)
        })), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a)  : i ? b(a[0], c)  : f
    },
    Y = /^(?:checkbox|radio)$/i;
    !function () {
        var a = A.createDocumentFragment(),
        b = A.createElement('div'),
        c = A.createElement('input');
        if (c.type = 'checkbox', b.setAttribute('className', 't'), b.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a>', k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName('tbody').length, k.htmlSerialize = !!b.getElementsByTagName('link').length, k.html5Clone = '<:nav></:nav>' !== A.createElement('nav').cloneNode(!0).outerHTML, c.checked = !0, k.noCloneChecked = c.cloneNode(!0).checked, a.appendChild(c), k.appendChecked = c.checked, a.appendChild(b), b.innerHTML = '<input type=\'radio\' checked=\'checked\' name=\'t\'/>', k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent('onclick', function () {
            k.noCloneEvent = !1
        }), b.cloneNode(!0).click()), null == k.deleteExpando) {
            k.deleteExpando = !0;
            try {
                delete b.test
            } catch (d) {
                k.deleteExpando = !1
            }
        }
        a = b = c = null
    }(),
    function () {
        var b,
        c,
        d = A.createElement('div');
        for (b in {
            submit: !0,
            change: !0,
            focusin: !0
        }) c = 'on' + b,
        (k[b + 'Bubbles'] = c in a) || (d.setAttribute(c, 't'), k[b + 'Bubbles'] = d.attributes[c].expando === !1);
        d = null
    }();
    var Z = /^(?:input|select|textarea)$/i,
    $ = /^key/,
    _ = /^(?:mouse|contextmenu)|click/,
    ab = /^(?:focusinfocus|focusoutblur)$/,
    bb = /^([^.]*)(?:\.(.+)|)$/;
    function cb() {
        return !0
    }
    function db() {
        return !1
    }
    function eb() {
        try {
            return A.activeElement
        } catch (a) {
        }
    }
    o.event = {
        global: {
        },
        add: function (a, b, c, d, e) {
            var f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            p,
            q,
            r = o._data(a);
            if (r) {
                c.handler && (i = c, c = i.handler, e = i.selector),
                c.guid || (c.guid = o.guid++),
                (g = r.events) || (g = r.events = {
                }),
                (k = r.handle) || (k = r.handle = function (a) {
                    return typeof o === M || a && o.event.triggered === a.type ? void 0 : o.event.dispatch.apply(k.elem, arguments)
                }, k.elem = a),
                b = (b || '').match(G) || [''],
                h = b.length;
                while (h--) f = bb.exec(b[h]) || [],
                n = q = f[1],
                p = (f[2] || '').split('.').sort(),
                n && (j = o.event.special[n] || {
                }, n = (e ? j.delegateType : j.bindType) || n, j = o.event.special[n] || {
                }, l = o.extend({
                    type: n,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && o.expr.match.needsContext.test(e),
                    namespace: p.join('.')
                }, i), (m = g[n]) || (m = g[n] = [
                ], m.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1)  : a.attachEvent && a.attachEvent('on' + n, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l)  : m.push(l), o.event.global[n] = !0);
                a = null
            }
        },
        remove: function (a, b, c, d, e) {
            var f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            p,
            q,
            r = o.hasData(a) && o._data(a);
            if (r && (k = r.events)) {
                b = (b || '').match(G) || [''],
                j = b.length;
                while (j--) if (h = bb.exec(b[j]) || [], n = q = h[1], p = (h[2] || '').split('.').sort(), n) {
                    l = o.event.special[n] || {
                    },
                    n = (d ? l.delegateType : l.bindType) || n,
                    m = k[n] || [],
                    h = h[2] && new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                    i = f = m.length;
                    while (f--) g = m[f],
                    !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ('**' !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                    i && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || o.removeEvent(a, n, r.handle), delete k[n])
                } else for (n in k) o.event.remove(a, n + b[j], c, d, !0);
                o.isEmptyObject(k) && (delete r.handle, o._removeData(a, 'events'))
            }
        },
        trigger: function (b, c, d, e) {
            var f,
            g,
            h,
            j,
            k,
            l,
            m,
            n = [
                d || A
            ],
            p = i.call(b, 'type') ? b.type : b,
            q = i.call(b, 'namespace') ? b.namespace.split('.')  : [
            ];
            if (h = l = d = d || A, 3 !== d.nodeType && 8 !== d.nodeType && !ab.test(p + o.event.triggered) && (p.indexOf('.') >= 0 && (q = p.split('.'), p = q.shift(), q.sort()), g = p.indexOf(':') < 0 && 'on' + p, b = b[o.expando] ? b : new o.Event(p, 'object' == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join('.'), b.namespace_re = b.namespace ? new RegExp('(^|\\.)' + q.join('\\.(?:.*\\.|)') + '(\\.|$)')  : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [
                b
            ] : o.makeArray(c, [
                b
            ]), k = o.event.special[p] || {
            }, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
                if (!e && !k.noBubble && !o.isWindow(d)) {
                    for (j = k.delegateType || p, ab.test(j + p) || (h = h.parentNode); h; h = h.parentNode) n.push(h),
                    l = h;
                    l === (d.ownerDocument || A) && n.push(l.defaultView || l.parentWindow || a)
                }
                m = 0;
                while ((h = n[m++]) && !b.isPropagationStopped()) b.type = m > 1 ? j : k.bindType || p,
                f = (o._data(h, 'events') || {
                }) [b.type] && o._data(h, 'handle'),
                f && f.apply(h, c),
                f = g && h[g],
                f && f.apply && o.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(n.pop(), c) === !1) && o.acceptData(d) && g && d[p] && !o.isWindow(d)) {
                    l = d[g],
                    l && (d[g] = null),
                    o.event.triggered = p;
                    try {
                        d[p]()
                    } catch (r) {
                    }
                    o.event.triggered = void 0,
                    l && (d[g] = l)
                }
                return b.result
            }
        },
        dispatch: function (a) {
            a = o.event.fix(a);
            var b,
            d,
            e,
            f,
            g,
            h = [
            ],
            i = c.call(arguments),
            j = (o._data(this, 'events') || {
            }) [a.type] || [],
            k = o.event.special[a.type] || {
            };
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = o.event.handlers.call(this, a, j),
                b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem,
                    g = 0;
                    while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped()) (!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, d = ((o.event.special[e.origType] || {
                    }).handle || e.handler).apply(f.elem, i), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a),
                a.result
            }
        },
        handlers: function (a, b) {
            var c,
            d,
            e,
            f,
            g = [
            ],
            h = b.delegateCount,
            i = a.target;
            if (h && i.nodeType && (!a.button || 'click' !== a.type)) for (; i != this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || 'click' !== a.type)) {
                for (e = [
                ], f = 0; h > f; f++) d = b[f],
                c = d.selector + ' ',
                void 0 === e[c] && (e[c] = d.needsContext ? o(c, this).index(i) >= 0 : o.find(c, this, null, [
                    i
                ]).length),
                e[c] && e.push(d);
                e.length && g.push({
                    elem: i,
                    handlers: e
                })
            }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }),
            g
        },
        fix: function (a) {
            if (a[o.expando]) return a;
            var b,
            c,
            d,
            e = a.type,
            f = a,
            g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = _.test(e) ? this.mouseHooks : $.test(e) ? this.keyHooks : {
            }),
            d = g.props ? this.props.concat(g.props)  : this.props,
            a = new o.Event(f),
            b = d.length;
            while (b--) c = d[b],
            a[c] = f[c];
            return a.target || (a.target = f.srcElement || A),
            3 === a.target.nodeType && (a.target = a.target.parentNode),
            a.metaKey = !!a.metaKey,
            g.filter ? g.filter(a, f)  : a
        },
        props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
        fixHooks: {
        },
        keyHooks: {
            props: 'char charCode key keyCode'.split(' '),
            filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
                a
            }
        },
        mouseHooks: {
            props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
            filter: function (a, b) {
                var c,
                d,
                e,
                f = b.button,
                g = b.fromElement;
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || A, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)),
                !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g),
                a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
                a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    if (this !== eb() && this.focus) try {
                        return this.focus(),
                        !1
                    } catch (a) {
                    }
                },
                delegateType: 'focusin'
            },
            blur: {
                trigger: function () {
                    return this === eb() && this.blur ? (this.blur(), !1)  : void 0
                },
                delegateType: 'focusout'
            },
            click: {
                trigger: function () {
                    return o.nodeName(this, 'input') && 'checkbox' === this.type && this.click ? (this.click(), !1)  : void 0
                },
                _default: function (a) {
                    return o.nodeName(a.target, 'a')
                }
            },
            beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = o.extend(new o.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {
                }
            });
            d ? o.event.trigger(e, null, b)  : o.event.dispatch.call(b, e),
            e.isDefaultPrevented() && c.preventDefault()
        }
    },
    o.removeEvent = A.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }
     : function (a, b, c) {
        var d = 'on' + b;
        a.detachEvent && (typeof a[d] === M && (a[d] = null), a.detachEvent(d, c))
    },
    o.Event = function (a, b) {
        return this instanceof o.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && (a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault()) ? cb : db)  : this.type = a, b && o.extend(this, b), this.timeStamp = a && a.timeStamp || o.now(), this[o.expando] = !0, void 0)  : new o.Event(a, b)
    },
    o.Event.prototype = {
        isDefaultPrevented: db,
        isPropagationStopped: db,
        isImmediatePropagationStopped: db,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = cb,
            a && (a.preventDefault ? a.preventDefault()  : a.returnValue = !1)
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = cb,
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = cb,
            this.stopPropagation()
        }
    },
    o.each({
        mouseenter: 'mouseover',
        mouseleave: 'mouseout'
    }, function (a, b) {
        o.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
                var c,
                d = this,
                e = a.relatedTarget,
                f = a.handleObj;
                return (!e || e !== d && !o.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b),
                c
            }
        }
    }),
    k.submitBubbles || (o.event.special.submit = {
        setup: function () {
            return o.nodeName(this, 'form') ? !1 : (o.event.add(this, 'click._submit keypress._submit', function (a) {
                var b = a.target,
                c = o.nodeName(b, 'input') || o.nodeName(b, 'button') ? b.form : void 0;
                c && !o._data(c, 'submitBubbles') && (o.event.add(c, 'submit._submit', function (a) {
                    a._submit_bubble = !0
                }), o._data(c, 'submitBubbles', !0))
            }), void 0)
        },
        postDispatch: function (a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && o.event.simulate('submit', this.parentNode, a, !0))
        },
        teardown: function () {
            return o.nodeName(this, 'form') ? !1 : (o.event.remove(this, '._submit'), void 0)
        }
    }),
    k.changeBubbles || (o.event.special.change = {
        setup: function () {
            return Z.test(this.nodeName) ? (('checkbox' === this.type || 'radio' === this.type) && (o.event.add(this, 'propertychange._change', function (a) {
                'checked' === a.originalEvent.propertyName && (this._just_changed = !0)
            }), o.event.add(this, 'click._change', function (a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1),
                o.event.simulate('change', this, a, !0)
            })), !1)  : (o.event.add(this, 'beforeactivate._change', function (a) {
                var b = a.target;
                Z.test(b.nodeName) && !o._data(b, 'changeBubbles') && (o.event.add(b, 'change._change', function (a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || o.event.simulate('change', this.parentNode, a, !0)
                }), o._data(b, 'changeBubbles', !0))
            }), void 0)
        },
        handle: function (a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || 'radio' !== b.type && 'checkbox' !== b.type ? a.handleObj.handler.apply(this, arguments)  : void 0
        },
        teardown: function () {
            return o.event.remove(this, '._change'),
            !Z.test(this.nodeName)
        }
    }),
    k.focusinBubbles || o.each({
        focus: 'focusin',
        blur: 'focusout'
    }, function (a, b) {
        var c = function (a) {
            o.event.simulate(b, a.target, o.event.fix(a), !0)
        };
        o.event.special[b] = {
            setup: function () {
                var d = this.ownerDocument || this,
                e = o._data(d, b);
                e || d.addEventListener(a, c, !0),
                o._data(d, b, (e || 0) + 1)
            },
            teardown: function () {
                var d = this.ownerDocument || this,
                e = o._data(d, b) - 1;
                e ? o._data(d, b, e)  : (d.removeEventListener(a, c, !0), o._removeData(d, b))
            }
        }
    }),
    o.fn.extend({
        on: function (a, b, c, d, e) {
            var f,
            g;
            if ('object' == typeof a) {
                'string' != typeof b && (c = c || b, b = void 0);
                for (f in a) this.on(f, b, c, a[f], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0)  : null == d && ('string' == typeof b ? (d = c, c = void 0)  : (d = c, c = b, b = void 0)), d === !1) d = db;
             else if (!d) return this;
            return 1 === e && (g = d, d = function (a) {
                return o().off(a),
                g.apply(this, arguments)
            }, d.guid = g.guid || (g.guid = o.guid++)),
            this.each(function () {
                o.event.add(this, a, d, c, b)
            })
        },
        one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function (a, b, c) {
            var d,
            e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj,
            o(a.delegateTarget).off(d.namespace ? d.origType + '.' + d.namespace : d.origType, d.selector, d.handler),
            this;
            if ('object' == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || 'function' == typeof b) && (c = b, b = void 0),
            c === !1 && (c = db),
            this.each(function () {
                o.event.remove(this, a, c, b)
            })
        },
        trigger: function (a, b) {
            return this.each(function () {
                o.event.trigger(a, b, this)
            })
        },
        triggerHandler: function (a, b) {
            var c = this[0];
            return c ? o.event.trigger(a, b, c, !0)  : void 0
        }
    });
    function fb(a) {
        var b = gb.split('|'),
        c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c
    }
    var gb = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video',
    hb = / jQuery\d+="(?:null|\d+)"/g,
    ib = new RegExp('<(?:' + gb + ')[\\s/>]', 'i'),
    jb = /^\s+/,
    kb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    lb = /<([\w:]+)/,
    mb = /<tbody/i,
    nb = /<|&#?\w+;/,
    ob = /<(?:script|style|link)/i,
    pb = /checked\s*(?:[^=]|=\s*.checked.)/i,
    qb = /^$|\/(?:java|ecma)script/i,
    rb = /^true\/(.*)/,
    sb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    tb = {
        option: [
            1,
            '<select multiple=\'multiple\'>',
            '</select>'
        ],
        legend: [
            1,
            '<fieldset>',
            '</fieldset>'
        ],
        area: [
            1,
            '<map>',
            '</map>'
        ],
        param: [
            1,
            '<object>',
            '</object>'
        ],
        thead: [
            1,
            '<table>',
            '</table>'
        ],
        tr: [
            2,
            '<table><tbody>',
            '</tbody></table>'
        ],
        col: [
            2,
            '<table><tbody></tbody><colgroup>',
            '</colgroup></table>'
        ],
        td: [
            3,
            '<table><tbody><tr>',
            '</tr></tbody></table>'
        ],
        _default: k.htmlSerialize ? [
            0,
            '',
            ''
        ] : [
            1,
            'X<div>',
            '</div>'
        ]
    },
    ub = fb(A),
    vb = ub.appendChild(A.createElement('div'));
    tb.optgroup = tb.option,
    tb.tbody = tb.tfoot = tb.colgroup = tb.caption = tb.thead,
    tb.th = tb.td;
    function wb(a, b) {
        var c,
        d,
        e = 0,
        f = typeof a.getElementsByTagName !== M ? a.getElementsByTagName(b || '*')  : typeof a.querySelectorAll !== M ? a.querySelectorAll(b || '*')  : void 0;
        if (!f) for (f = [
        ], c = a.childNodes || a; null != (d = c[e]); e++) !b || o.nodeName(d, b) ? f.push(d)  : o.merge(f, wb(d, b));
        return void 0 === b || b && o.nodeName(a, b) ? o.merge([a], f)  : f
    }
    function xb(a) {
        Y.test(a.type) && (a.defaultChecked = a.checked)
    }
    function yb(a, b) {
        return o.nodeName(a, 'table') && o.nodeName(11 !== b.nodeType ? b : b.firstChild, 'tr') ? a.getElementsByTagName('tbody') [0] || a.appendChild(a.ownerDocument.createElement('tbody'))  : a
    }
    function zb(a) {
        return a.type = (null !== o.find.attr(a, 'type')) + '/' + a.type,
        a
    }
    function Ab(a) {
        var b = rb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute('type'),
        a
    }
    function Bb(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) o._data(c, 'globalEval', !b || o._data(b[d], 'globalEval'))
    }
    function Cb(a, b) {
        if (1 === b.nodeType && o.hasData(a)) {
            var c,
            d,
            e,
            f = o._data(a),
            g = o._data(b, f),
            h = f.events;
            if (h) {
                delete g.handle,
                g.events = {
                };
                for (c in h) for (d = 0, e = h[c].length; e > d; d++) o.event.add(b, c, h[c][d])
            }
            g.data && (g.data = o.extend({
            }, g.data))
        }
    }
    function Db(a, b) {
        var c,
        d,
        e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[o.expando]) {
                e = o._data(b);
                for (d in e.events) o.removeEvent(b, d, e.handle);
                b.removeAttribute(o.expando)
            }
            'script' === c && b.text !== a.text ? (zb(b).text = a.text, Ab(b))  : 'object' === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !o.trim(b.innerHTML) && (b.innerHTML = a.innerHTML))  : 'input' === c && Y.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value))  : 'option' === c ? b.defaultSelected = b.selected = a.defaultSelected : ('input' === c || 'textarea' === c) && (b.defaultValue = a.defaultValue)
        }
    }
    o.extend({
        clone: function (a, b, c) {
            var d,
            e,
            f,
            g,
            h,
            i = o.contains(a.ownerDocument, a);
            if (k.html5Clone || o.isXMLDoc(a) || !ib.test('<' + a.nodeName + '>') ? f = a.cloneNode(!0)  : (vb.innerHTML = a.outerHTML, vb.removeChild(f = vb.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || o.isXMLDoc(a))) for (d = wb(f), h = wb(a), g = 0; null != (e = h[g]); ++g) d[g] && Db(e, d[g]);
            if (b) if (c) for (h = h || wb(a), d = d || wb(f), g = 0; null != (e = h[g]); g++) Cb(e, d[g]);
             else Cb(a, f);
            return d = wb(f, 'script'),
            d.length > 0 && Bb(d, !i && wb(a, 'script')),
            d = h = e = null,
            f
        },
        buildFragment: function (a, b, c, d) {
            for (var e, f, g, h, i, j, l, m = a.length, n = fb(b), p = [
            ], q = 0; m > q; q++) if (f = a[q], f || 0 === f) if ('object' === o.type(f)) o.merge(p, f.nodeType ? [
                f
            ] : f);
             else if (nb.test(f)) {
                h = h || n.appendChild(b.createElement('div')),
                i = (lb.exec(f) || ['',
                '']) [1].toLowerCase(),
                l = tb[i] || tb._default,
                h.innerHTML = l[1] + f.replace(kb, '<$1></$2>') + l[2],
                e = l[0];
                while (e--) h = h.lastChild;
                if (!k.leadingWhitespace && jb.test(f) && p.push(b.createTextNode(jb.exec(f) [0])), !k.tbody) {
                    f = 'table' !== i || mb.test(f) ? '<table>' !== l[1] || mb.test(f) ? 0 : h : h.firstChild,
                    e = f && f.childNodes.length;
                    while (e--) o.nodeName(j = f.childNodes[e], 'tbody') && !j.childNodes.length && f.removeChild(j)
                }
                o.merge(p, h.childNodes),
                h.textContent = '';
                while (h.firstChild) h.removeChild(h.firstChild);
                h = n.lastChild
            } else p.push(b.createTextNode(f));
            h && n.removeChild(h),
            k.appendChecked || o.grep(wb(p, 'input'), xb),
            q = 0;
            while (f = p[q++]) if ((!d || - 1 === o.inArray(f, d)) && (g = o.contains(f.ownerDocument, f), h = wb(n.appendChild(f), 'script'), g && Bb(h), c)) {
                e = 0;
                while (f = h[e++]) qb.test(f.type || '') && c.push(f)
            }
            return h = null,
            n
        },
        cleanData: function (a, c) {
            for (var d, e, f, g, h = 0, i = o.expando, j = o.cache, l = k.deleteExpando, m = o.event.special; null != (d = a[h]); h++) if ((c || o.acceptData(d)) && (f = d[i], g = f && j[f])) {
                if (g.events) for (e in g.events) m[e] ? o.event.remove(d, e)  : o.removeEvent(d, e, g.handle);
                j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== M ? d.removeAttribute(i)  : d[i] = null, b.push(f))
            }
        }
    }),
    o.fn.extend({
        text: function (a) {
            return X(this, function (a) {
                return void 0 === a ? o.text(this)  : this.empty().append((this[0] && this[0].ownerDocument || A).createTextNode(a))
            }, null, a, arguments.length)
        },
        append: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = yb(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = yb(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function (a, b) {
            for (var c, d = a ? o.filter(a, this)  : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || o.cleanData(wb(c)),
            c.parentNode && (b && o.contains(c.ownerDocument, c) && Bb(wb(c, 'script')), c.parentNode.removeChild(c));
            return this
        },
        empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++) {
                1 === a.nodeType && o.cleanData(wb(a, !1));
                while (a.firstChild) a.removeChild(a.firstChild);
                a.options && o.nodeName(a, 'select') && (a.options.length = 0)
            }
            return this
        },
        clone: function (a, b) {
            return a = null == a ? !1 : a,
            b = null == b ? a : b,
            this.map(function () {
                return o.clone(this, a, b)
            })
        },
        html: function (a) {
            return X(this, function (a) {
                var b = this[0] || {
                },
                c = 0,
                d = this.length;
                if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(hb, '')  : void 0;
                if (!('string' != typeof a || ob.test(a) || !k.htmlSerialize && ib.test(a) || !k.leadingWhitespace && jb.test(a) || tb[(lb.exec(a) || ['',
                '']) [1].toLowerCase()])) {
                    a = a.replace(kb, '<$1></$2>');
                    try {
                        for (; d > c; c++) b = this[c] || {
                        },
                        1 === b.nodeType && (o.cleanData(wb(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {
                    }
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function () {
            var a = arguments[0];
            return this.domManip(arguments, function (b) {
                a = this.parentNode,
                o.cleanData(wb(this)),
                a && a.replaceChild(b, this)
            }),
            a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function (a) {
            return this.remove(a, !0)
        },
        domManip: function (a, b) {
            a = d.apply([], a);
            var c,
            e,
            f,
            g,
            h,
            i,
            j = 0,
            l = this.length,
            m = this,
            n = l - 1,
            p = a[0],
            q = o.isFunction(p);
            if (q || l > 1 && 'string' == typeof p && !k.checkClone && pb.test(p)) return this.each(function (c) {
                var d = m.eq(c);
                q && (a[0] = p.call(this, c, d.html())),
                d.domManip(a, b)
            });
            if (l && (i = o.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
                for (g = o.map(wb(i, 'script'), zb), f = g.length; l > j; j++) e = i,
                j !== n && (e = o.clone(e, !0, !0), f && o.merge(g, wb(e, 'script'))),
                b.call(this[j], e, j);
                if (f) for (h = g[g.length - 1].ownerDocument, o.map(g, Ab), j = 0; f > j; j++) e = g[j],
                qb.test(e.type || '') && !o._data(e, 'globalEval') && o.contains(h, e) && (e.src ? o._evalUrl && o._evalUrl(e.src)  : o.globalEval((e.text || e.textContent || e.innerHTML || '').replace(sb, '')));
                i = c = null
            }
            return this
        }
    }),
    o.each({
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith'
    }, function (a, b) {
        o.fn[a] = function (a) {
            for (var c, d = 0, f = [
            ], g = o(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0),
            o(g[d]) [b](c),
            e.apply(f, c.get());
            return this.pushStack(f)
        }
    });
    var Eb,
    Fb = {
    };
    function Gb(b, c) {
        var d = o(c.createElement(b)).appendTo(c.body),
        e = a.getDefaultComputedStyle ? a.getDefaultComputedStyle(d[0]).display : o.css(d[0], 'display');
        return d.detach(),
        e
    }
    function Hb(a) {
        var b = A,
        c = Fb[a];
        return c || (c = Gb(a, b), 'none' !== c && c || (Eb = (Eb || o('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>')).appendTo(b.documentElement), b = (Eb[0].contentWindow || Eb[0].contentDocument).document, b.write(), b.close(), c = Gb(a, b), Eb.detach()), Fb[a] = c),
        c
    }
    !function () {
        var a,
        b,
        c = A.createElement('div'),
        d = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0';
        c.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>',
        a = c.getElementsByTagName('a') [0],
        a.style.cssText = 'float:left;opacity:.5',
        k.opacity = /^0.5/.test(a.style.opacity),
        k.cssFloat = !!a.style.cssFloat,
        c.style.backgroundClip = 'content-box',
        c.cloneNode(!0).style.backgroundClip = '',
        k.clearCloneStyle = 'content-box' === c.style.backgroundClip,
        a = c = null,
        k.shrinkWrapBlocks = function () {
            var a,
            c,
            e,
            f;
            if (null == b) {
                if (a = A.getElementsByTagName('body') [0], !a) return;
                f = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px',
                c = A.createElement('div'),
                e = A.createElement('div'),
                a.appendChild(c).appendChild(e),
                b = !1,
                typeof e.style.zoom !== M && (e.style.cssText = d + ';width:1px;padding:1px;zoom:1', e.innerHTML = '<div></div>', e.firstChild.style.width = '5px', b = 3 !== e.offsetWidth),
                a.removeChild(c),
                a = c = e = null
            }
            return b
        }
    }();
    var Ib = /^margin/,
    Jb = new RegExp('^(' + U + ')(?!px)[a-z%]+$', 'i'),
    Kb,
    Lb,
    Mb = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Kb = function (a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null)
    }, Lb = function (a, b, c) {
        var d,
        e,
        f,
        g,
        h = a.style;
        return c = c || Kb(a),
        g = c ? c.getPropertyValue(b) || c[b] : void 0,
        c && ('' !== g || o.contains(a.ownerDocument, a) || (g = o.style(a, b)), Jb.test(g) && Ib.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)),
        void 0 === g ? g : g + ''
    })  : A.documentElement.currentStyle && (Kb = function (a) {
        return a.currentStyle
    }, Lb = function (a, b, c) {
        var d,
        e,
        f,
        g,
        h = a.style;
        return c = c || Kb(a),
        g = c ? c[b] : void 0,
        null == g && h && h[b] && (g = h[b]),
        Jb.test(g) && !Mb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = 'fontSize' === b ? '1em' : g, g = h.pixelLeft + 'px', h.left = d, f && (e.left = f)),
        void 0 === g ? g : g + '' || 'auto'
    });
    function Nb(a, b) {
        return {
            get: function () {
                var c = a();
                if (null != c) return c ? (delete this.get, void 0)  : (this.get = b).apply(this, arguments)
            }
        }
    }
    !function () {
        var b,
        c,
        d,
        e,
        f,
        g,
        h = A.createElement('div'),
        i = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px',
        j = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0';
        h.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>',
        b = h.getElementsByTagName('a') [0],
        b.style.cssText = 'float:left;opacity:.5',
        k.opacity = /^0.5/.test(b.style.opacity),
        k.cssFloat = !!b.style.cssFloat,
        h.style.backgroundClip = 'content-box',
        h.cloneNode(!0).style.backgroundClip = '',
        k.clearCloneStyle = 'content-box' === h.style.backgroundClip,
        b = h = null,
        o.extend(k, {
            reliableHiddenOffsets: function () {
                if (null != c) return c;
                var a,
                b,
                d,
                e = A.createElement('div'),
                f = A.getElementsByTagName('body') [0];
                if (f) return e.setAttribute('className', 't'),
                e.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>',
                a = A.createElement('div'),
                a.style.cssText = i,
                f.appendChild(a).appendChild(e),
                e.innerHTML = '<table><tr><td></td><td>t</td></tr></table>',
                b = e.getElementsByTagName('td'),
                b[0].style.cssText = 'padding:0;margin:0;border:0;display:none',
                d = 0 === b[0].offsetHeight,
                b[0].style.display = '',
                b[1].style.display = 'none',
                c = d && 0 === b[0].offsetHeight,
                f.removeChild(a),
                e = f = null,
                c
            },
            boxSizing: function () {
                return null == d && l(),
                d
            },
            boxSizingReliable: function () {
                return null == e && l(),
                e
            },
            pixelPosition: function () {
                return null == f && l(),
                f
            },
            reliableMarginRight: function () {
                var b,
                c,
                d,
                e;
                if (null == g && a.getComputedStyle) {
                    if (b = A.getElementsByTagName('body') [0], !b) return;
                    c = A.createElement('div'),
                    d = A.createElement('div'),
                    c.style.cssText = i,
                    b.appendChild(c).appendChild(d),
                    e = d.appendChild(A.createElement('div')),
                    e.style.cssText = d.style.cssText = j,
                    e.style.marginRight = e.style.width = '0',
                    d.style.width = '1px',
                    g = !parseFloat((a.getComputedStyle(e, null) || {
                    }).marginRight),
                    b.removeChild(c)
                }
                return g
            }
        });
        function l() {
            var b,
            c,
            h = A.getElementsByTagName('body') [0];
            h && (b = A.createElement('div'), c = A.createElement('div'), b.style.cssText = i, h.appendChild(b).appendChild(c), c.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%', o.swap(h, null != h.style.zoom ? {
                zoom: 1
            }
             : {
            }, function () {
                d = 4 === c.offsetWidth
            }), e = !0, f = !1, g = !0, a.getComputedStyle && (f = '1%' !== (a.getComputedStyle(c, null) || {
            }).top, e = '4px' === (a.getComputedStyle(c, null) || {
                width: '4px'
            }).width), h.removeChild(b), c = h = null)
        }
    }(),
    o.swap = function (a, b, c, d) {
        var e,
        f,
        g = {
        };
        for (f in b) g[f] = a.style[f],
        a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var Ob = /alpha\([^)]*\)/i,
    Pb = /opacity\s*=\s*([^)]*)/,
    Qb = /^(none|table(?!-c[ea]).+)/,
    Rb = new RegExp('^(' + U + ')(.*)$', 'i'),
    Sb = new RegExp('^([+-])=(' + U + ')', 'i'),
    Tb = {
        position: 'absolute',
        visibility: 'hidden',
        display: 'block'
    },
    Ub = {
        letterSpacing: 0,
        fontWeight: 400
    },
    Vb = [
        'Webkit',
        'O',
        'Moz',
        'ms'
    ];
    function Wb(a, b) {
        if (b in a) return b;
        var c = b.charAt(0).toUpperCase() + b.slice(1),
        d = b,
        e = Vb.length;
        while (e--) if (b = Vb[e] + c, b in a) return b;
        return d
    }
    function Xb(a, b) {
        for (var c, d, e, f = [
        ], g = 0, h = a.length; h > g; g++) d = a[g],
        d.style && (f[g] = o._data(d, 'olddisplay'), c = d.style.display, b ? (f[g] || 'none' !== c || (d.style.display = ''), '' === d.style.display && W(d) && (f[g] = o._data(d, 'olddisplay', Hb(d.nodeName))))  : f[g] || (e = W(d), (c && 'none' !== c || !e) && o._data(d, 'olddisplay', e ? c : o.css(d, 'display'))));
        for (g = 0; h > g; g++) d = a[g],
        d.style && (b && 'none' !== d.style.display && '' !== d.style.display || (d.style.display = b ? f[g] || '' : 'none'));
        return a
    }
    function Yb(a, b, c) {
        var d = Rb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || 'px')  : b
    }
    function Zb(a, b, c, d, e) {
        for (var f = c === (d ? 'border' : 'content') ? 4 : 'width' === b ? 1 : 0, g = 0; 4 > f; f += 2) 'margin' === c && (g += o.css(a, c + V[f], !0, e)),
        d ? ('content' === c && (g -= o.css(a, 'padding' + V[f], !0, e)), 'margin' !== c && (g -= o.css(a, 'border' + V[f] + 'Width', !0, e)))  : (g += o.css(a, 'padding' + V[f], !0, e), 'padding' !== c && (g += o.css(a, 'border' + V[f] + 'Width', !0, e)));
        return g
    }
    function $b(a, b, c) {
        var d = !0,
        e = 'width' === b ? a.offsetWidth : a.offsetHeight,
        f = Kb(a),
        g = k.boxSizing() && 'border-box' === o.css(a, 'boxSizing', !1, f);
        if (0 >= e || null == e) {
            if (e = Lb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Jb.test(e)) return e;
            d = g && (k.boxSizingReliable() || e === a.style[b]),
            e = parseFloat(e) || 0
        }
        return e + Zb(a, b, c || (g ? 'border' : 'content'), d, f) + 'px'
    }
    o.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = Lb(a, 'opacity');
                        return '' === c ? '1' : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            'float': k.cssFloat ? 'cssFloat' : 'styleFloat'
        },
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e,
                f,
                g,
                h = o.camelCase(b),
                i = a.style;
                if (b = o.cssProps[h] || (o.cssProps[h] = Wb(i, h)), g = o.cssHooks[b] || o.cssHooks[h], void 0 === c) return g && 'get' in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, 'string' === f && (e = Sb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(o.css(a, b)), f = 'number'), null != c && c === c && ('number' !== f || o.cssNumber[h] || (c += 'px'), k.clearCloneStyle || '' !== c || 0 !== b.indexOf('background') || (i[b] = 'inherit'), !(g && 'set' in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = '',
                    i[b] = c
                } catch (j) {
                }
            }
        },
        css: function (a, b, c, d) {
            var e,
            f,
            g,
            h = o.camelCase(b);
            return b = o.cssProps[h] || (o.cssProps[h] = Wb(a.style, h)),
            g = o.cssHooks[b] || o.cssHooks[h],
            g && 'get' in g && (f = g.get(a, !0, c)),
            void 0 === f && (f = Lb(a, b, d)),
            'normal' === f && b in Ub && (f = Ub[b]),
            '' === c || c ? (e = parseFloat(f), c === !0 || o.isNumeric(e) ? e || 0 : f)  : f
        }
    }),
    o.each(['height',
    'width'], function (a, b) {
        o.cssHooks[b] = {
            get: function (a, c, d) {
                return c ? 0 === a.offsetWidth && Qb.test(o.css(a, 'display')) ? o.swap(a, Tb, function () {
                    return $b(a, b, d)
                })  : $b(a, b, d)  : void 0
            },
            set: function (a, c, d) {
                var e = d && Kb(a);
                return Yb(a, c, d ? Zb(a, b, d, k.boxSizing() && 'border-box' === o.css(a, 'boxSizing', !1, e), e)  : 0)
            }
        }
    }),
    k.opacity || (o.cssHooks.opacity = {
        get: function (a, b) {
            return Pb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : b ? '1' : ''
        },
        set: function (a, b) {
            var c = a.style,
            d = a.currentStyle,
            e = o.isNumeric(b) ? 'alpha(opacity=' + 100 * b + ')' : '',
            f = d && d.filter || c.filter || '';
            c.zoom = 1,
            (b >= 1 || '' === b) && '' === o.trim(f.replace(Ob, '')) && c.removeAttribute && (c.removeAttribute('filter'), '' === b || d && !d.filter) || (c.filter = Ob.test(f) ? f.replace(Ob, e)  : f + ' ' + e)
        }
    }),
    o.cssHooks.marginRight = Nb(k.reliableMarginRight, function (a, b) {
        return b ? o.swap(a, {
            display: 'inline-block'
        }, Lb, [
            a,
            'marginRight'
        ])  : void 0
    }),
    o.each({
        margin: '',
        padding: '',
        border: 'Width'
    }, function (a, b) {
        o.cssHooks[a + b] = {
            expand: function (c) {
                for (var d = 0, e = {
                }, f = 'string' == typeof c ? c.split(' ')  : [
                    c
                ]; 4 > d; d++) e[a + V[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        },
        Ib.test(a) || (o.cssHooks[a + b].set = Yb)
    }),
    o.fn.extend({
        css: function (a, b) {
            return X(this, function (a, b, c) {
                var d,
                e,
                f = {
                },
                g = 0;
                if (o.isArray(b)) {
                    for (d = Kb(a), e = b.length; e > g; g++) f[b[g]] = o.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? o.style(a, b, c)  : o.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function () {
            return Xb(this, !0)
        },
        hide: function () {
            return Xb(this)
        },
        toggle: function (a) {
            return 'boolean' == typeof a ? a ? this.show()  : this.hide()  : this.each(function () {
                W(this) ? o(this).show()  : o(this).hide()
            })
        }
    });
    function _b(a, b, c, d, e) {
        return new _b.prototype.init(a, b, c, d, e)
    }
    o.Tween = _b,
    _b.prototype = {
        constructor: _b,
        init: function (a, b, c, d, e, f) {
            this.elem = a,
            this.prop = c,
            this.easing = e || 'swing',
            this.options = b,
            this.start = this.now = this.cur(),
            this.end = d,
            this.unit = f || (o.cssNumber[c] ? '' : 'px')
        },
        cur: function () {
            var a = _b.propHooks[this.prop];
            return a && a.get ? a.get(this)  : _b.propHooks._default.get(this)
        },
        run: function (a) {
            var b,
            c = _b.propHooks[this.prop];
            return this.pos = b = this.options.duration ? o.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration)  : a,
            this.now = (this.end - this.start) * b + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this)  : _b.propHooks._default.set(this),
            this
        }
    },
    _b.prototype.init.prototype = _b.prototype,
    _b.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = o.css(a.elem, a.prop, ''), b && 'auto' !== b ? b : 0)  : a.elem[a.prop]
            },
            set: function (a) {
                o.fx.step[a.prop] ? o.fx.step[a.prop](a)  : a.elem.style && (null != a.elem.style[o.cssProps[a.prop]] || o.cssHooks[a.prop]) ? o.style(a.elem, a.prop, a.now + a.unit)  : a.elem[a.prop] = a.now
            }
        }
    },
    _b.propHooks.scrollTop = _b.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    },
    o.easing = {
        linear: function (a) {
            return a
        },
        swing: function (a) {
            return 0.5 - Math.cos(a * Math.PI) / 2
        }
    },
    o.fx = _b.prototype.init,
    o.fx.step = {
    };
    var ac,
    bc,
    cc = /^(?:toggle|show|hide)$/,
    dc = new RegExp('^(?:([+-])=|)(' + U + ')([a-z%]*)$', 'i'),
    ec = /queueHooks$/,
    fc = [
        kc
    ],
    gc = {
        '*': [
            function (a, b) {
                var c = this.createTween(a, b),
                d = c.cur(),
                e = dc.exec(b),
                f = e && e[3] || (o.cssNumber[a] ? '' : 'px'),
                g = (o.cssNumber[a] || 'px' !== f && + d) && dc.exec(o.css(c.elem, a)),
                h = 1,
                i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3],
                    e = e || [],
                    g = + d || 1;
                    do h = h || '.5',
                    g /= h,
                    o.style(c.elem, a, g + f);
                    while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = + g || + d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : + e[2]),
                c
            }
        ]
    };
    function hc() {
        return setTimeout(function () {
            ac = void 0
        }),
        ac = o.now()
    }
    function ic(a, b) {
        var c,
        d = {
            height: a
        },
        e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = V[e],
        d['margin' + c] = d['padding' + c] = a;
        return b && (d.opacity = d.width = a),
        d
    }
    function jc(a, b, c) {
        for (var d, e = (gc[b] || []).concat(gc['*']), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d
    }
    function kc(a, b, c) {
        var d,
        e,
        f,
        g,
        h,
        i,
        j,
        l,
        m = this,
        n = {
        },
        p = a.style,
        q = a.nodeType && W(a),
        r = o._data(a, 'fxshow');
        c.queue || (h = o._queueHooks(a, 'fx'), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
            h.unqueued || i()
        }), h.unqueued++, m.always(function () {
            m.always(function () {
                h.unqueued--,
                o.queue(a, 'fx').length || h.empty.fire()
            })
        })),
        1 === a.nodeType && ('height' in b || 'width' in b) && (c.overflow = [
            p.overflow,
            p.overflowX,
            p.overflowY
        ], j = o.css(a, 'display'), l = Hb(a.nodeName), 'none' === j && (j = l), 'inline' === j && 'none' === o.css(a, 'float') && (k.inlineBlockNeedsLayout && 'inline' !== l ? p.zoom = 1 : p.display = 'inline-block')),
        c.overflow && (p.overflow = 'hidden', k.shrinkWrapBlocks() || m.always(function () {
            p.overflow = c.overflow[0],
            p.overflowX = c.overflow[1],
            p.overflowY = c.overflow[2]
        }));
        for (d in b) if (e = b[d], cc.exec(e)) {
            if (delete b[d], f = f || 'toggle' === e, e === (q ? 'hide' : 'show')) {
                if ('show' !== e || !r || void 0 === r[d]) continue;
                q = !0
            }
            n[d] = r && r[d] || o.style(a, d)
        }
        if (!o.isEmptyObject(n)) {
            r ? 'hidden' in r && (q = r.hidden)  : r = o._data(a, 'fxshow', {
            }),
            f && (r.hidden = !q),
            q ? o(a).show()  : m.done(function () {
                o(a).hide()
            }),
            m.done(function () {
                var b;
                o._removeData(a, 'fxshow');
                for (b in n) o.style(a, b, n[b])
            });
            for (d in n) g = jc(q ? r[d] : 0, d, m),
            d in r || (r[d] = g.start, q && (g.end = g.start, g.start = 'width' === d || 'height' === d ? 1 : 0))
        }
    }
    function lc(a, b) {
        var c,
        d,
        e,
        f,
        g;
        for (c in a) if (d = o.camelCase(c), e = b[d], f = a[c], o.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = o.cssHooks[d], g && 'expand' in g) {
            f = g.expand(f),
            delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }
    function mc(a, b, c) {
        var d,
        e,
        f = 0,
        g = fc.length,
        h = o.Deferred().always(function () {
            delete i.elem
        }),
        i = function () {
            if (e) return !1;
            for (var b = ac || hc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [
                j,
                f,
                c
            ]),
            1 > f && i ? c : (h.resolveWith(a, [
                j
            ]), !1)
        },
        j = h.promise({
            elem: a,
            props: o.extend({
            }, b),
            opts: o.extend(!0, {
                specialEasing: {
                }
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: ac || hc(),
            duration: c.duration,
            tweens: [
            ],
            createTween: function (b, c) {
                var d = o.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d),
                d
            },
            stop: function (b) {
                var c = 0,
                d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [
                    j,
                    b
                ])  : h.rejectWith(a, [
                    j,
                    b
                ]),
                this
            }
        }),
        k = j.props;
        for (lc(k, j.opts.specialEasing); g > f; f++) if (d = fc[f].call(j, a, k, j.opts)) return d;
        return o.map(k, jc, j),
        o.isFunction(j.opts.start) && j.opts.start.call(a, j),
        o.fx.timer(o.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })),
        j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    o.Animation = o.extend(mc, {
        tweener: function (a, b) {
            o.isFunction(a) ? (b = a, a = [
                '*'
            ])  : a = a.split(' ');
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d],
            gc[c] = gc[c] || [],
            gc[c].unshift(b)
        },
        prefilter: function (a, b) {
            b ? fc.unshift(a)  : fc.push(a)
        }
    }),
    o.speed = function (a, b, c) {
        var d = a && 'object' == typeof a ? o.extend({
        }, a)  : {
            complete: c || !c && b || o.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !o.isFunction(b) && b
        };
        return d.duration = o.fx.off ? 0 : 'number' == typeof d.duration ? d.duration : d.duration in o.fx.speeds ? o.fx.speeds[d.duration] : o.fx.speeds._default,
        (null == d.queue || d.queue === !0) && (d.queue = 'fx'),
        d.old = d.complete,
        d.complete = function () {
            o.isFunction(d.old) && d.old.call(this),
            d.queue && o.dequeue(this, d.queue)
        },
        d
    },
    o.fn.extend({
        fadeTo: function (a, b, c, d) {
            return this.filter(W).css('opacity', 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function (a, b, c, d) {
            var e = o.isEmptyObject(a),
            f = o.speed(b, c, d),
            g = function () {
                var b = mc(this, o.extend({
                }, a), f);
                (e || o._data(this, 'finish')) && b.stop(!0)
            };
            return g.finish = g,
            e || f.queue === !1 ? this.each(g)  : this.queue(f.queue, g)
        },
        stop: function (a, b, c) {
            var d = function (a) {
                var b = a.stop;
                delete a.stop,
                b(c)
            };
            return 'string' != typeof a && (c = b, b = a, a = void 0),
            b && a !== !1 && this.queue(a || 'fx', [
            ]),
            this.each(function () {
                var b = !0,
                e = null != a && a + 'queueHooks',
                f = o.timers,
                g = o._data(this);
                if (e) g[e] && g[e].stop && d(g[e]);
                 else for (e in g) g[e] && g[e].stop && ec.test(e) && d(g[e]);
                for (e = f.length; e--; ) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                (b || !c) && o.dequeue(this, a)
            })
        },
        finish: function (a) {
            return a !== !1 && (a = a || 'fx'),
            this.each(function () {
                var b,
                c = o._data(this),
                d = c[a + 'queue'],
                e = c[a + 'queueHooks'],
                f = o.timers,
                g = d ? d.length : 0;
                for (c.finish = !0, o.queue(this, a, [
                ]), e && e.stop && e.stop.call(this, !0), b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }),
    o.each(['toggle',
    'show',
    'hide'], function (a, b) {
        var c = o.fn[b];
        o.fn[b] = function (a, d, e) {
            return null == a || 'boolean' == typeof a ? c.apply(this, arguments)  : this.animate(ic(b, !0), a, d, e)
        }
    }),
    o.each({
        slideDown: ic('show'),
        slideUp: ic('hide'),
        slideToggle: ic('toggle'),
        fadeIn: {
            opacity: 'show'
        },
        fadeOut: {
            opacity: 'hide'
        },
        fadeToggle: {
            opacity: 'toggle'
        }
    }, function (a, b) {
        o.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }),
    o.timers = [
    ],
    o.fx.tick = function () {
        var a,
        b = o.timers,
        c = 0;
        for (ac = o.now(); c < b.length; c++) a = b[c],
        a() || b[c] !== a || b.splice(c--, 1);
        b.length || o.fx.stop(),
        ac = void 0
    },
    o.fx.timer = function (a) {
        a() && o.timers.push(a) && o.fx.start()
    },
    o.fx.interval = 13,
    o.fx.start = function () {
        bc || (bc = setInterval(o.fx.tick, o.fx.interval))
    },
    o.fx.stop = function () {
        clearInterval(bc),
        bc = null
    },
    o.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    o.fn.delay = function (a, b) {
        return a = o.fx ? o.fx.speeds[a] || a : a,
        b = b || 'fx',
        this.queue(b, function (b, c) {
            var d = setTimeout(b, a);
            c.stop = function () {
                clearTimeout(d)
            }
        })
    },
    function () {
        var a,
        b,
        c,
        d,
        e = A.createElement('div');
        e.setAttribute('className', 't'),
        e.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>',
        a = e.getElementsByTagName('a') [0],
        c = A.createElement('select'),
        d = c.appendChild(A.createElement('option')),
        b = e.getElementsByTagName('input') [0],
        a.style.cssText = 'top:1px',
        k.getSetAttribute = 't' !== e.className,
        k.style = /top/.test(a.getAttribute('style')),
        k.hrefNormalized = '/a' === a.getAttribute('href'),
        k.checkOn = !!b.value,
        k.optSelected = d.selected,
        k.enctype = !!A.createElement('form').enctype,
        c.disabled = !0,
        k.optDisabled = !d.disabled,
        b = A.createElement('input'),
        b.setAttribute('value', ''),
        k.input = '' === b.getAttribute('value'),
        b.value = 't',
        b.setAttribute('type', 'radio'),
        k.radioValue = 't' === b.value,
        a = b = c = d = e = null
    }();
    var nc = /\r/g;
    o.fn.extend({
        val: function (a) {
            var b,
            c,
            d,
            e = this[0];
            {
                if (arguments.length) return d = o.isFunction(a),
                this.each(function (c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, o(this).val())  : a, null == e ? e = '' : 'number' == typeof e ? e += '' : o.isArray(e) && (e = o.map(e, function (a) {
                        return null == a ? '' : a + ''
                    })), b = o.valHooks[this.type] || o.valHooks[this.nodeName.toLowerCase()], b && 'set' in b && void 0 !== b.set(this, e, 'value') || (this.value = e))
                });
                if (e) return b = o.valHooks[e.type] || o.valHooks[e.nodeName.toLowerCase()],
                b && 'get' in b && void 0 !== (c = b.get(e, 'value')) ? c : (c = e.value, 'string' == typeof c ? c.replace(nc, '')  : null == c ? '' : c)
            }
        }
    }),
    o.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = o.find.attr(a, 'value');
                    return null != b ? b : a.text
                }
            },
            select: {
                get: function (a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = 'select-one' === a.type || 0 > e, g = f ? null : [
                    ], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute('disabled')) || c.parentNode.disabled && o.nodeName(c.parentNode, 'optgroup'))) {
                        if (b = o(c).val(), f) return b;
                        g.push(b)
                    }
                    return g
                },
                set: function (a, b) {
                    var c,
                    d,
                    e = a.options,
                    f = o.makeArray(b),
                    g = e.length;
                    while (g--) d = e[g],
                    (d.selected = o.inArray(o(d).val(), f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = - 1),
                    f
                }
            }
        }
    }),
    o.each(['radio',
    'checkbox'], function () {
        o.valHooks[this] = {
            set: function (a, b) {
                return o.isArray(b) ? a.checked = o.inArray(o(a).val(), b) >= 0 : void 0
            }
        },
        k.checkOn || (o.valHooks[this].get = function (a) {
            return null === a.getAttribute('value') ? 'on' : a.value
        })
    });
    var oc,
    pc,
    qc = o.expr.attrHandle,
    rc = /^(?:checked|selected)$/i,
    sc = k.getSetAttribute,
    tc = k.input;
    o.fn.extend({
        attr: function (a, b) {
            return X(this, o.attr, a, b, arguments.length > 1)
        },
        removeAttr: function (a) {
            return this.each(function () {
                o.removeAttr(this, a)
            })
        }
    }),
    o.extend({
        attr: function (a, b, c) {
            var d,
            e,
            f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === M ? o.prop(a, b, c)  : (1 === f && o.isXMLDoc(a) || (b = b.toLowerCase(), d = o.attrHooks[b] || (o.expr.match.bool.test(b) ? pc : oc)), void 0 === c ? d && 'get' in d && null !== (e = d.get(a, b)) ? e : (e = o.find.attr(a, b), null == e ? void 0 : e)  : null !== c ? d && 'set' in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ''), c)  : (o.removeAttr(a, b), void 0))
        },
        removeAttr: function (a, b) {
            var c,
            d,
            e = 0,
            f = b && b.match(G);
            if (f && 1 === a.nodeType) while (c = f[e++]) d = o.propFix[c] || c,
            o.expr.match.bool.test(c) ? tc && sc || !rc.test(c) ? a[d] = !1 : a[o.camelCase('default-' + c)] = a[d] = !1 : o.attr(a, c, ''),
            a.removeAttribute(sc ? c : d)
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (!k.radioValue && 'radio' === b && o.nodeName(a, 'input')) {
                        var c = a.value;
                        return a.setAttribute('type', b),
                        c && (a.value = c),
                        b
                    }
                }
            }
        }
    }),
    pc = {
        set: function (a, b, c) {
            return b === !1 ? o.removeAttr(a, c)  : tc && sc || !rc.test(c) ? a.setAttribute(!sc && o.propFix[c] || c, c)  : a[o.camelCase('default-' + c)] = a[c] = !0,
            c
        }
    },
    o.each(o.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = qc[b] || o.find.attr;
        qc[b] = tc && sc || !rc.test(b) ? function (a, b, d) {
            var e,
            f;
            return d || (f = qc[b], qc[b] = e, e = null != c(a, b, d) ? b.toLowerCase()  : null, qc[b] = f),
            e
        }
         : function (a, b, c) {
            return c ? void 0 : a[o.camelCase('default-' + b)] ? b.toLowerCase()  : null
        }
    }),
    tc && sc || (o.attrHooks.value = {
        set: function (a, b, c) {
            return o.nodeName(a, 'input') ? (a.defaultValue = b, void 0)  : oc && oc.set(a, b, c)
        }
    }),
    sc || (oc = {
        set: function (a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)),
            d.value = b += '',
            'value' === c || b === a.getAttribute(c) ? b : void 0
        }
    }, qc.id = qc.name = qc.coords = function (a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && '' !== d.value ? d.value : null
    }, o.valHooks.button = {
        get: function (a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0
        },
        set: oc.set
    }, o.attrHooks.contenteditable = {
        set: function (a, b, c) {
            oc.set(a, '' === b ? !1 : b, c)
        }
    }, o.each(['width',
    'height'], function (a, b) {
        o.attrHooks[b] = {
            set: function (a, c) {
                return '' === c ? (a.setAttribute(b, 'auto'), c)  : void 0
            }
        }
    })),
    k.style || (o.attrHooks.style = {
        get: function (a) {
            return a.style.cssText || void 0
        },
        set: function (a, b) {
            return a.style.cssText = b + ''
        }
    });
    var uc = /^(?:input|select|textarea|button|object)$/i,
    vc = /^(?:a|area)$/i;
    o.fn.extend({
        prop: function (a, b) {
            return X(this, o.prop, a, b, arguments.length > 1)
        },
        removeProp: function (a) {
            return a = o.propFix[a] || a,
            this.each(function () {
                try {
                    this[a] = void 0,
                    delete this[a]
                } catch (b) {
                }
            })
        }
    }),
    o.extend({
        propFix: {
            'for': 'htmlFor',
            'class': 'className'
        },
        prop: function (a, b, c) {
            var d,
            e,
            f,
            g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !o.isXMLDoc(a),
            f && (b = o.propFix[b] || b, e = o.propHooks[b]),
            void 0 !== c ? e && 'set' in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && 'get' in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var b = o.find.attr(a, 'tabindex');
                    return b ? parseInt(b, 10)  : uc.test(a.nodeName) || vc.test(a.nodeName) && a.href ? 0 : - 1
                }
            }
        }
    }),
    k.hrefNormalized || o.each(['href',
    'src'], function (a, b) {
        o.propHooks[b] = {
            get: function (a) {
                return a.getAttribute(b, 4)
            }
        }
    }),
    k.optSelected || (o.propHooks.selected = {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex),
            null
        }
    }),
    o.each(['tabIndex',
    'readOnly',
    'maxLength',
    'cellSpacing',
    'cellPadding',
    'rowSpan',
    'colSpan',
    'useMap',
    'frameBorder',
    'contentEditable'], function () {
        o.propFix[this.toLowerCase()] = this
    }),
    k.enctype || (o.propFix.enctype = 'encoding');
    var wc = /[\t\r\n\f]/g;
    o.fn.extend({
        addClass: function (a) {
            var b,
            c,
            d,
            e,
            f,
            g,
            h = 0,
            i = this.length,
            j = 'string' == typeof a && a;
            if (o.isFunction(a)) return this.each(function (b) {
                o(this).addClass(a.call(this, b, this.className))
            });
            if (j) for (b = (a || '').match(G) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (' ' + c.className + ' ').replace(wc, ' ')  : ' ')) {
                f = 0;
                while (e = b[f++]) d.indexOf(' ' + e + ' ') < 0 && (d += e + ' ');
                g = o.trim(d),
                c.className !== g && (c.className = g)
            }
            return this
        },
        removeClass: function (a) {
            var b,
            c,
            d,
            e,
            f,
            g,
            h = 0,
            i = this.length,
            j = 0 === arguments.length || 'string' == typeof a && a;
            if (o.isFunction(a)) return this.each(function (b) {
                o(this).removeClass(a.call(this, b, this.className))
            });
            if (j) for (b = (a || '').match(G) || []; i > h; h++) if (c = this[h], d = 1 === c.nodeType && (c.className ? (' ' + c.className + ' ').replace(wc, ' ')  : '')) {
                f = 0;
                while (e = b[f++]) while (d.indexOf(' ' + e + ' ') >= 0) d = d.replace(' ' + e + ' ', ' ');
                g = a ? o.trim(d)  : '',
                c.className !== g && (c.className = g)
            }
            return this
        },
        toggleClass: function (a, b) {
            var c = typeof a;
            return 'boolean' == typeof b && 'string' === c ? b ? this.addClass(a)  : this.removeClass(a)  : o.isFunction(a) ? this.each(function (c) {
                o(this).toggleClass(a.call(this, c, this.className, b), b)
            })  : this.each(function () {
                if ('string' === c) {
                    var b,
                    d = 0,
                    e = o(this),
                    f = a.match(G) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b)  : e.addClass(b)
                } else (c === M || 'boolean' === c) && (this.className && o._data(this, '__className__', this.className), this.className = this.className || a === !1 ? '' : o._data(this, '__className__') || '')
            })
        },
        hasClass: function (a) {
            for (var b = ' ' + a + ' ', c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (' ' + this[c].className + ' ').replace(wc, ' ').indexOf(b) >= 0) return !0;
            return !1
        }
    }),
    o.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function (a, b) {
        o.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c)  : this.trigger(b)
        }
    }),
    o.fn.extend({
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function (a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function (a, b) {
            return this.off(a, null, b)
        },
        delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, '**')  : this.off(b, a || '**', c)
        }
    });
    var xc = o.now(),
    yc = /\?/,
    zc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    o.parseJSON = function (b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + '');
        var c,
        d = null,
        e = o.trim(b + '');
        return e && !o.trim(e.replace(zc, function (a, b, e, f) {
            return c && b && (d = 0),
            0 === d ? a : (c = e || b, d += !f - !e, '')
        })) ? Function('return ' + e) ()  : o.error('Invalid JSON: ' + b)
    },
    o.parseXML = function (b) {
        var c,
        d;
        if (!b || 'string' != typeof b) return null;
        try {
            a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, 'text/xml'))  : (c = new ActiveXObject('Microsoft.XMLDOM'), c.async = 'false', c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName('parsererror').length || o.error('Invalid XML: ' + b),
        c
    };
    var Ac,
    Bc,
    Cc = /#.*$/,
    Dc = /([?&])_=[^&]*/,
    Ec = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Fc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Gc = /^(?:GET|HEAD)$/,
    Hc = /^\/\//,
    Ic = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Jc = {
    },
    Kc = {
    },
    Lc = '*/'.concat('*');
    try {
        Bc = location.href
    } catch (Mc) {
        Bc = A.createElement('a'),
        Bc.href = '',
        Bc = Bc.href
    }
    Ac = Ic.exec(Bc.toLowerCase()) || [];
    function Nc(a) {
        return function (b, c) {
            'string' != typeof b && (c = b, b = '*');
            var d,
            e = 0,
            f = b.toLowerCase().match(G) || [];
            if (o.isFunction(c)) while (d = f[e++]) '+' === d.charAt(0) ? (d = d.slice(1) || '*', (a[d] = a[d] || []).unshift(c))  : (a[d] = a[d] || []).push(c)
        }
    }
    function Oc(a, b, c, d) {
        var e = {
        },
        f = a === Kc;
        function g(h) {
            var i;
            return e[h] = !0,
            o.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return 'string' != typeof j || f || e[j] ? f ? !(i = j)  : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }),
            i
        }
        return g(b.dataTypes[0]) || !e['*'] && g('*')
    }
    function Pc(a, b) {
        var c,
        d,
        e = o.ajaxSettings.flatOptions || {
        };
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {
        })) [d] = b[d]);
        return c && o.extend(!0, a, c),
        a
    }
    function Qc(a, b, c) {
        var d,
        e,
        f,
        g,
        h = a.contents,
        i = a.dataTypes;
        while ('*' === i[0]) i.shift(),
        void 0 === e && (e = a.mimeType || b.getResponseHeader('Content-Type'));
        if (e) for (g in h) if (h[g] && h[g].test(e)) {
            i.unshift(g);
            break
        }
        if (i[0] in c) f = i[0];
         else {
            for (g in c) {
                if (!i[0] || a.converters[g + ' ' + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f), c[f])  : void 0
    }
    function Rc(a, b, c, d) {
        var e,
        f,
        g,
        h,
        i,
        j = {
        },
        k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ('*' === f) f = i;
         else if ('*' !== i && i !== f) {
            if (g = j[i + ' ' + f] || j['* ' + f], !g) for (e in j) if (h = e.split(' '), h[1] === f && (g = j[i + ' ' + h[0]] || j['* ' + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break
            }
            if (g !== !0) if (g && a['throws']) b = g(b);
             else try {
                b = g(b)
            } catch (l) {
                return {
                    state: 'parsererror',
                    error: g ? l : 'No conversion from ' + i + ' to ' + f
                }
            }
        }
        return {
            state: 'success',
            data: b
        }
    }
    o.extend({
        active: 0,
        lastModified: {
        },
        etag: {
        },
        ajaxSettings: {
            url: Bc,
            type: 'GET',
            isLocal: Fc.test(Ac[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            accepts: {
                '*': Lc,
                text: 'text/plain',
                html: 'text/html',
                xml: 'application/xml, text/xml',
                json: 'application/json, text/javascript'
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: 'responseXML',
                text: 'responseText',
                json: 'responseJSON'
            },
            converters: {
                '* text': String,
                'text html': !0,
                'text json': o.parseJSON,
                'text xml': o.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (a, b) {
            return b ? Pc(Pc(a, o.ajaxSettings), b)  : Pc(o.ajaxSettings, a)
        },
        ajaxPrefilter: Nc(Jc),
        ajaxTransport: Nc(Kc),
        ajax: function (a, b) {
            'object' == typeof a && (b = a, a = void 0),
            b = b || {
            };
            var c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k = o.ajaxSetup({
            }, b),
            l = k.context || k,
            m = k.context && (l.nodeType || l.jquery) ? o(l)  : o.event,
            n = o.Deferred(),
            p = o.Callbacks('once memory'),
            q = k.statusCode || {
            },
            r = {
            },
            s = {
            },
            t = 0,
            u = 'canceled',
            v = {
                readyState: 0,
                getResponseHeader: function (a) {
                    var b;
                    if (2 === t) {
                        if (!j) {
                            j = {
                            };
                            while (b = Ec.exec(f)) j[b[1].toLowerCase()] = b[2]
                        }
                        b = j[a.toLowerCase()]
                    }
                    return null == b ? null : b
                },
                getAllResponseHeaders: function () {
                    return 2 === t ? f : null
                },
                setRequestHeader: function (a, b) {
                    var c = a.toLowerCase();
                    return t || (a = s[c] = s[c] || a, r[a] = b),
                    this
                },
                overrideMimeType: function (a) {
                    return t || (k.mimeType = a),
                    this
                },
                statusCode: function (a) {
                    var b;
                    if (a) if (2 > t) for (b in a) q[b] = [
                        q[b],
                        a[b]
                    ];
                     else v.always(a[v.status]);
                    return this
                },
                abort: function (a) {
                    var b = a || u;
                    return i && i.abort(b),
                    x(0, b),
                    this
                }
            };
            if (n.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || Bc) + '').replace(Cc, '').replace(Hc, Ac[1] + '//'), k.type = b.method || b.type || k.method || k.type, k.dataTypes = o.trim(k.dataType || '*').toLowerCase().match(G) || [''], null == k.crossDomain && (c = Ic.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === Ac[1] && c[2] === Ac[2] && (c[3] || ('http:' === c[1] ? '80' : '443')) === (Ac[3] || ('http:' === Ac[1] ? '80' : '443')))), k.data && k.processData && 'string' != typeof k.data && (k.data = o.param(k.data, k.traditional)), Oc(Jc, k, b, v), 2 === t) return v;
            h = k.global,
            h && 0 === o.active++ && o.event.trigger('ajaxStart'),
            k.type = k.type.toUpperCase(),
            k.hasContent = !Gc.test(k.type),
            e = k.url,
            k.hasContent || (k.data && (e = k.url += (yc.test(e) ? '&' : '?') + k.data, delete k.data), k.cache === !1 && (k.url = Dc.test(e) ? e.replace(Dc, '$1_=' + xc++)  : e + (yc.test(e) ? '&' : '?') + '_=' + xc++)),
            k.ifModified && (o.lastModified[e] && v.setRequestHeader('If-Modified-Since', o.lastModified[e]), o.etag[e] && v.setRequestHeader('If-None-Match', o.etag[e])),
            (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader('Content-Type', k.contentType),
            v.setRequestHeader('Accept', k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ('*' !== k.dataTypes[0] ? ', ' + Lc + '; q=0.01' : '')  : k.accepts['*']);
            for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
            u = 'abort';
            for (d in {
                success: 1,
                error: 1,
                complete: 1
            }) v[d](k[d]);
            if (i = Oc(Kc, k, b, v)) {
                v.readyState = 1,
                h && m.trigger('ajaxSend', [
                    v,
                    k
                ]),
                k.async && k.timeout > 0 && (g = setTimeout(function () {
                    v.abort('timeout')
                }, k.timeout));
                try {
                    t = 1,
                    i.send(r, x)
                } catch (w) {
                    if (!(2 > t)) throw w;
                    x( - 1, w)
                }
            } else x( - 1, 'No Transport');
            function x(a, b, c, d) {
                var j,
                r,
                s,
                u,
                w,
                x = b;
                2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || '', v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Qc(k, v, c)), u = Rc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader('Last-Modified'), w && (o.lastModified[e] = w), w = v.getResponseHeader('etag'), w && (o.etag[e] = w)), 204 === a || 'HEAD' === k.type ? x = 'nocontent' : 304 === a ? x = 'notmodified' : (x = u.state, r = u.data, s = u.error, j = !s))  : (s = x, (a || !x) && (x = 'error', 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + '', j ? n.resolveWith(l, [
                    r,
                    x,
                    v
                ])  : n.rejectWith(l, [
                    v,
                    x,
                    s
                ]), v.statusCode(q), q = void 0, h && m.trigger(j ? 'ajaxSuccess' : 'ajaxError', [
                    v,
                    k,
                    j ? r : s
                ]), p.fireWith(l, [
                    v,
                    x
                ]), h && (m.trigger('ajaxComplete', [
                    v,
                    k
                ]), --o.active || o.event.trigger('ajaxStop')))
            }
            return v
        },
        getJSON: function (a, b, c) {
            return o.get(a, b, c, 'json')
        },
        getScript: function (a, b) {
            return o.get(a, void 0, b, 'script')
        }
    }),
    o.each(['get',
    'post'], function (a, b) {
        o[b] = function (a, c, d, e) {
            return o.isFunction(c) && (e = e || d, d = c, c = void 0),
            o.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }),
    o.each(['ajaxStart',
    'ajaxStop',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess',
    'ajaxSend'], function (a, b) {
        o.fn[b] = function (a) {
            return this.on(b, a)
        }
    }),
    o._evalUrl = function (a) {
        return o.ajax({
            url: a,
            type: 'GET',
            dataType: 'script',
            async: !1,
            global: !1,
            'throws': !0
        })
    },
    o.fn.extend({
        wrapAll: function (a) {
            if (o.isFunction(a)) return this.each(function (b) {
                o(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = o(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]),
                b.map(function () {
                    var a = this;
                    while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            return o.isFunction(a) ? this.each(function (b) {
                o(this).wrapInner(a.call(this, b))
            })  : this.each(function () {
                var b = o(this),
                c = b.contents();
                c.length ? c.wrapAll(a)  : b.append(a)
            })
        },
        wrap: function (a) {
            var b = o.isFunction(a);
            return this.each(function (c) {
                o(this).wrapAll(b ? a.call(this, c)  : a)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                o.nodeName(this, 'body') || o(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    o.expr.filters.hidden = function (a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && 'none' === (a.style && a.style.display || o.css(a, 'display'))
    },
    o.expr.filters.visible = function (a) {
        return !o.expr.filters.hidden(a)
    };
    var Sc = /%20/g,
    Tc = /\[\]$/,
    Uc = /\r?\n/g,
    Vc = /^(?:submit|button|image|reset|file)$/i,
    Wc = /^(?:input|select|textarea|keygen)/i;
    function Xc(a, b, c, d) {
        var e;
        if (o.isArray(b)) o.each(b, function (b, e) {
            c || Tc.test(a) ? d(a, e)  : Xc(a + '[' + ('object' == typeof e ? b : '') + ']', e, c, d)
        });
         else if (c || 'object' !== o.type(b)) d(a, b);
         else for (e in b) Xc(a + '[' + e + ']', b[e], c, d)
    }
    o.param = function (a, b) {
        var c,
        d = [
        ],
        e = function (a, b) {
            b = o.isFunction(b) ? b()  : null == b ? '' : b,
            d[d.length] = encodeURIComponent(a) + '=' + encodeURIComponent(b)
        };
        if (void 0 === b && (b = o.ajaxSettings && o.ajaxSettings.traditional), o.isArray(a) || a.jquery && !o.isPlainObject(a)) o.each(a, function () {
            e(this.name, this.value)
        });
         else for (c in a) Xc(c, a[c], b, e);
        return d.join('&').replace(Sc, '+')
    },
    o.fn.extend({
        serialize: function () {
            return o.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var a = o.prop(this, 'elements');
                return a ? o.makeArray(a)  : this
            }).filter(function () {
                var a = this.type;
                return this.name && !o(this).is(':disabled') && Wc.test(this.nodeName) && !Vc.test(a) && (this.checked || !Y.test(a))
            }).map(function (a, b) {
                var c = o(this).val();
                return null == c ? null : o.isArray(c) ? o.map(c, function (a) {
                    return {
                        name: b.name,
                        value: a.replace(Uc, '\r\n')
                    }
                })  : {
                    name: b.name,
                    value: c.replace(Uc, '\r\n')
                }
            }).get()
        }
    }),
    o.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
        return !this.isLocal && _c() || ad()
    }
     : _c;
    var Yc = 0,
    Zc = {
    },
    $c = o.ajaxSettings.xhr();
    a.ActiveXObject && o(a).on('unload', function () {
        for (var a in Zc) Zc[a](void 0, !0)
    }),
    k.cors = !!$c && 'withCredentials' in $c,
    $c = k.ajax = !!$c,
    $c && o.ajaxTransport(function (a) {
        if (!a.crossDomain || k.cors) {
            var b;
            return {
                send: function (c, d) {
                    var e,
                    f = a.xhr(),
                    g = ++Yc;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType),
                    a.crossDomain || c['X-Requested-With'] || (c['X-Requested-With'] = 'XMLHttpRequest');
                    for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + '');
                    f.send(a.hasContent && a.data || null),
                    b = function (c, e) {
                        var h,
                        i,
                        j;
                        if (b && (e || 4 === f.readyState)) if (delete Zc[g], b = void 0, f.onreadystatechange = o.noop, e) 4 !== f.readyState && f.abort();
                         else {
                            j = {
                            },
                            h = f.status,
                            'string' == typeof f.responseText && (j.text = f.responseText);
                            try {
                                i = f.statusText
                            } catch (k) {
                                i = ''
                            }
                            h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204)  : h = j.text ? 200 : 404
                        }
                        j && d(h, i, j, f.getAllResponseHeaders())
                    },
                    a.async ? 4 === f.readyState ? setTimeout(b)  : f.onreadystatechange = Zc[g] = b : b()
                },
                abort: function () {
                    b && b(void 0, !0)
                }
            }
        }
    });
    function _c() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }
    function ad() {
        try {
            return new a.ActiveXObject('Microsoft.XMLHTTP')
        } catch (b) {
        }
    }
    o.ajaxSetup({
        accepts: {
            script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            'text script': function (a) {
                return o.globalEval(a),
                a
            }
        }
    }),
    o.ajaxPrefilter('script', function (a) {
        void 0 === a.cache && (a.cache = !1),
        a.crossDomain && (a.type = 'GET', a.global = !1)
    }),
    o.ajaxTransport('script', function (a) {
        if (a.crossDomain) {
            var b,
            c = A.head || o('head') [0] || A.documentElement;
            return {
                send: function (d, e) {
                    b = A.createElement('script'),
                    b.async = !0,
                    a.scriptCharset && (b.charset = a.scriptCharset),
                    b.src = a.url,
                    b.onload = b.onreadystatechange = function (a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, 'success'))
                    },
                    c.insertBefore(b, c.firstChild)
                },
                abort: function () {
                    b && b.onload(void 0, !0)
                }
            }
        }
    });
    var bd = [
    ],
    cd = /(=)\?(?=&|$)|\?\?/;
    o.ajaxSetup({
        jsonp: 'callback',
        jsonpCallback: function () {
            var a = bd.pop() || o.expando + '_' + xc++;
            return this[a] = !0,
            a
        }
    }),
    o.ajaxPrefilter('json jsonp', function (b, c, d) {
        var e,
        f,
        g,
        h = b.jsonp !== !1 && (cd.test(b.url) ? 'url' : 'string' == typeof b.data && !(b.contentType || '').indexOf('application/x-www-form-urlencoded') && cd.test(b.data) && 'data');
        return h || 'jsonp' === b.dataTypes[0] ? (e = b.jsonpCallback = o.isFunction(b.jsonpCallback) ? b.jsonpCallback()  : b.jsonpCallback, h ? b[h] = b[h].replace(cd, '$1' + e)  : b.jsonp !== !1 && (b.url += (yc.test(b.url) ? '&' : '?') + b.jsonp + '=' + e), b.converters['script json'] = function () {
            return g || o.error(e + ' was not called'),
            g[0]
        }, b.dataTypes[0] = 'json', f = a[e], a[e] = function () {
            g = arguments
        }, d.always(function () {
            a[e] = f,
            b[e] && (b.jsonpCallback = c.jsonpCallback, bd.push(e)),
            g && o.isFunction(f) && f(g[0]),
            g = f = void 0
        }), 'script')  : void 0
    }),
    o.parseHTML = function (a, b, c) {
        if (!a || 'string' != typeof a) return null;
        'boolean' == typeof b && (c = b, b = !1),
        b = b || A;
        var d = w.exec(a),
        e = !c && [];
        return d ? [
            b.createElement(d[1])
        ] : (d = o.buildFragment([a], b, e), e && e.length && o(e).remove(), o.merge([], d.childNodes))
    };
    var dd = o.fn.load;
    o.fn.load = function (a, b, c) {
        if ('string' != typeof a && dd) return dd.apply(this, arguments);
        var d,
        e,
        f,
        g = this,
        h = a.indexOf(' ');
        return h >= 0 && (d = a.slice(h, a.length), a = a.slice(0, h)),
        o.isFunction(b) ? (c = b, b = void 0)  : b && 'object' == typeof b && (f = 'POST'),
        g.length > 0 && o.ajax({
            url: a,
            type: f,
            dataType: 'html',
            data: b
        }).done(function (a) {
            e = arguments,
            g.html(d ? o('<div>').append(o.parseHTML(a)).find(d)  : a)
        }).complete(c && function (a, b) {
            g.each(c, e || [a.responseText,
            b,
            a])
        }),
        this
    },
    o.expr.filters.animated = function (a) {
        return o.grep(o.timers, function (b) {
            return a === b.elem
        }).length
    };
    var ed = a.document.documentElement;
    function fd(a) {
        return o.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    return o.offset = {
        setOffset: function (a, b, c) {
            var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k = o.css(a, 'position'),
            l = o(a),
            m = {
            };
            'static' === k && (a.style.position = 'relative'),
            h = l.offset(),
            f = o.css(a, 'top'),
            i = o.css(a, 'left'),
            j = ('absolute' === k || 'fixed' === k) && o.inArray('auto', [
                f,
                i
            ]) > - 1,
            j ? (d = l.position(), g = d.top, e = d.left)  : (g = parseFloat(f) || 0, e = parseFloat(i) || 0),
            o.isFunction(b) && (b = b.call(a, c, h)),
            null != b.top && (m.top = b.top - h.top + g),
            null != b.left && (m.left = b.left - h.left + e),
            'using' in b ? b.using.call(a, m)  : l.css(m)
        }
    },
    o.fn.extend({
        offset: function (a) {
            if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                o.offset.setOffset(this, a, b)
            });
            var b,
            c,
            d = {
                top: 0,
                left: 0
            },
            e = this[0],
            f = e && e.ownerDocument;
            if (f) return b = f.documentElement,
            o.contains(b, e) ? (typeof e.getBoundingClientRect !== M && (d = e.getBoundingClientRect()), c = fd(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            })  : d
        },
        position: function () {
            if (this[0]) {
                var a,
                b,
                c = {
                    top: 0,
                    left: 0
                },
                d = this[0];
                return 'fixed' === o.css(d, 'position') ? b = d.getBoundingClientRect()  : (a = this.offsetParent(), b = this.offset(), o.nodeName(a[0], 'html') || (c = a.offset()), c.top += o.css(a[0], 'borderTopWidth', !0), c.left += o.css(a[0], 'borderLeftWidth', !0)),
                {
                    top: b.top - c.top - o.css(d, 'marginTop', !0),
                    left: b.left - c.left - o.css(d, 'marginLeft', !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || ed;
                while (a && !o.nodeName(a, 'html') && 'static' === o.css(a, 'position')) a = a.offsetParent;
                return a || ed
            })
        }
    }),
    o.each({
        scrollLeft: 'pageXOffset',
        scrollTop: 'pageYOffset'
    }, function (a, b) {
        var c = /Y/.test(b);
        o.fn[a] = function (d) {
            return X(this, function (a, d, e) {
                var f = fd(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : (f ? f.scrollTo(c ? o(f).scrollLeft()  : e, c ? e : o(f).scrollTop())  : a[d] = e, void 0)
            }, a, d, arguments.length, null)
        }
    }),
    o.each(['top',
    'left'], function (a, b) {
        o.cssHooks[b] = Nb(k.pixelPosition, function (a, c) {
            return c ? (c = Lb(a, b), Jb.test(c) ? o(a).position() [b] + 'px' : c)  : void 0
        })
    }),
    o.each({
        Height: 'height',
        Width: 'width'
    }, function (a, b) {
        o.each({
            padding: 'inner' + a,
            content: b,
            '': 'outer' + a
        }, function (c, d) {
            o.fn[d] = function (d, e) {
                var f = arguments.length && (c || 'boolean' != typeof d),
                g = c || (d === !0 || e === !0 ? 'margin' : 'border');
                return X(this, function (b, c, d) {
                    var e;
                    return o.isWindow(b) ? b.document.documentElement['client' + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body['scroll' + a], e['scroll' + a], b.body['offset' + a], e['offset' + a], e['client' + a]))  : void 0 === d ? o.css(b, c, g)  : o.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }),
    o.fn.size = function () {
        return this.length
    },
    o.fn.andSelf = o.fn.addBack,
    'function' == typeof define && define.amd && define('jquery', [
    ], function () {
        return o
    }),
    a.jQuery = a.$ = o
});
