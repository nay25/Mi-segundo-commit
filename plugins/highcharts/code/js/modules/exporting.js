/*
 Highcharts JS v6.1.1 (2018-06-27)
 Exporting module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(q) {
    "object" === typeof module && module.exports ? module.exports = q : q(Highcharts)
})(function(q) {
    (function(f) {
        var q = f.defaultOptions,
            r = f.doc,
            x = f.Chart,
            p = f.addEvent,
            K = f.removeEvent,
            E = f.fireEvent,
            v = f.createElement,
            F = f.discardElement,
            G = f.css,
            y = f.merge,
            C = f.pick,
            w = f.each,
            H = f.objectEach,
            A = f.extend,
            z = f.win,
            J = z.navigator.userAgent,
            I = f.SVGRenderer,
            L = f.Renderer.prototype.symbols,
            M = /Edge\/|Trident\/|MSIE /.test(J),
            N = /firefox/i.test(J);
        A(q.lang, {
            printChart: "Print chart",
            downloadPNG: "Download PNG image",
            downloadJPEG: "Download JPEG image",
            downloadPDF: "Download PDF document",
            downloadSVG: "Download SVG vector image",
            contextButtonTitle: "Chart context menu"
        });
        q.navigation = {
            buttonOptions: {
                theme: {},
                symbolSize: 14,
                symbolX: 12.5,
                symbolY: 10.5,
                align: "right",
                buttonSpacing: 3,
                height: 22,
                verticalAlign: "top",
                width: 24
            }
        };
        q.exporting = {
            type: "image/png",
            url: "https://export.highcharts.com/",
            printMaxWidth: 780,
            scale: 2,
            buttons: {
                contextButton: {
                    className: "highcharts-contextbutton",
                    menuClassName: "highcharts-contextmenu",
                    symbol: "menu",
                    _titleKey: "contextButtonTitle",
                    menuItems: "printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")
                }
            },
            menuItemDefinitions: {
                printChart: {
                    textKey: "printChart",
                    onclick: function() {
                        this.print()
                    }
                },
                separator: {
                    separator: !0
                },
                downloadPNG: {
                    textKey: "downloadPNG",
                    onclick: function() {
                        this.exportChart()
                    }
                },
                downloadJPEG: {
                    textKey: "downloadJPEG",
                    onclick: function() {
                        this.exportChart({
                            type: "image/jpeg"
                        })
                    }
                },
                downloadPDF: {
                    textKey: "downloadPDF",
                    onclick: function() {
                        this.exportChart({
                            type: "application/pdf"
                        })
                    }
                },
                downloadSVG: {
                    textKey: "downloadSVG",
                    onclick: function() {
                        this.exportChart({
                            type: "image/svg+xml"
                        })
                    }
                }
            }
        };
        f.post = function(a, b, c) {
            var d = v("form", y({
                method: "post",
                action: a,
                enctype: "multipart/form-data"
            }, c), {
                display: "none"
            }, r.body);
            H(b, function(a, b) {
                v("input", {
                    type: "hidden",
                    name: b,
                    value: a
                }, null, d)
            });
            d.submit();
            F(d)
        };
        A(x.prototype, {
            sanitizeSVG: function(a, b) {
                if (b && b.exporting && b.exporting.allowHTML) {
                    var c = a.match(/<\/svg>(.*?$)/);
                    c && c[1] && (c = '\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"' + b.chart.width + '" height\x3d"' + b.chart.height + '"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e' +
                        c[1] + "\x3c/body\x3e\x3c/foreignObject\x3e", a = a.replace("\x3c/svg\x3e", c + "\x3c/svg\x3e"))
                }
                return a = a.replace(/zIndex="[^"]+"/g, "").replace(/isShadow="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g, "url($2)").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (|NS[0-9]+\:)href=/g, " xlink:href\x3d").replace(/\n/, " ").replace(/<\/svg>.*?$/, "\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,
                    '$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g, "\u00a0").replace(/&shy;/g, "\u00ad")
            },
            getChartHTML: function() {
                this.inlineStyles();
                return this.container.innerHTML
            },
            getSVG: function(a) {
                var b, c, d, t, h, g = y(this.options, a);
                c = v("div", null, {
                    position: "absolute",
                    top: "-9999em",
                    width: this.chartWidth + "px",
                    height: this.chartHeight + "px"
                }, r.body);
                d = this.renderTo.style.width;
                h = this.renderTo.style.height;
                d = g.exporting.sourceWidth || g.chart.width || /px$/.test(d) && parseInt(d, 10) || 600;
                h = g.exporting.sourceHeight ||
                    g.chart.height || /px$/.test(h) && parseInt(h, 10) || 400;
                A(g.chart, {
                    animation: !1,
                    renderTo: c,
                    forExport: !0,
                    renderer: "SVGRenderer",
                    width: d,
                    height: h
                });
                g.exporting.enabled = !1;
                delete g.data;
                g.series = [];
                w(this.series, function(a) {
                    t = y(a.userOptions, {
                        animation: !1,
                        enableMouseTracking: !1,
                        showCheckbox: !1,
                        visible: a.visible
                    });
                    t.isInternal || g.series.push(t)
                });
                w(this.axes, function(a) {
                    a.userOptions.internalKey || (a.userOptions.internalKey = f.uniqueKey())
                });
                b = new f.Chart(g, this.callback);
                a && w(["xAxis", "yAxis", "series"], function(d) {
                    var c = {};
                    a[d] && (c[d] = a[d], b.update(c))
                });
                w(this.axes, function(a) {
                    var d = f.find(b.axes, function(b) {
                            return b.options.internalKey === a.userOptions.internalKey
                        }),
                        c = a.getExtremes(),
                        e = c.userMin,
                        c = c.userMax;
                    d && (void 0 !== e && e !== d.min || void 0 !== c && c !== d.max) && d.setExtremes(e, c, !0, !1)
                });
                d = b.getChartHTML();
                E(this, "getSVG", {
                    chartCopy: b
                });
                d = this.sanitizeSVG(d, g);
                g = null;
                b.destroy();
                F(c);
                return d
            },
            getSVGForExport: function(a, b) {
                var c = this.options.exporting;
                return this.getSVG(y({
                    chart: {
                        borderRadius: 0
                    }
                }, c.chartOptions, b, {
                    exporting: {
                        sourceWidth: a &&
                            a.sourceWidth || c.sourceWidth,
                        sourceHeight: a && a.sourceHeight || c.sourceHeight
                    }
                }))
            },
            exportChart: function(a, b) {
                b = this.getSVGForExport(a, b);
                a = y(this.options.exporting, a);
                f.post(a.url, {
                    filename: a.filename || "chart",
                    type: a.type,
                    width: a.width || 0,
                    scale: a.scale,
                    svg: b
                }, a.formAttributes)
            },
            print: function() {
                var a = this,
                    b = a.container,
                    c = [],
                    d = b.parentNode,
                    f = r.body,
                    h = f.childNodes,
                    g = a.options.exporting.printMaxWidth,
                    e, k;
                if (!a.isPrinting) {
                    a.isPrinting = !0;
                    a.pointer.reset(null, 0);
                    E(a, "beforePrint");
                    if (k = g && a.chartWidth >
                        g) e = [a.options.chart.width, void 0, !1], a.setSize(g, void 0, !1);
                    w(h, function(a, b) {
                        1 === a.nodeType && (c[b] = a.style.display, a.style.display = "none")
                    });
                    f.appendChild(b);
                    z.focus();
                    z.print();
                    setTimeout(function() {
                        d.appendChild(b);
                        w(h, function(a, b) {
                            1 === a.nodeType && (a.style.display = c[b])
                        });
                        a.isPrinting = !1;
                        k && a.setSize.apply(a, e);
                        E(a, "afterPrint")
                    }, 1E3)
                }
            },
            contextMenu: function(a, b, c, d, t, h, g) {
                var e = this,
                    k = e.chartWidth,
                    n = e.chartHeight,
                    u = "cache-" + a,
                    l = e[u],
                    m = Math.max(t, h),
                    D, B;
                l || (e[u] = l = v("div", {
                    className: a
                }, {
                    position: "absolute",
                    zIndex: 1E3,
                    padding: m + "px",
                    pointerEvents: "auto"
                }, e.fixedDiv || e.container), D = v("div", {
                    className: "highcharts-menu"
                }, null, l), B = function() {
                    G(l, {
                        display: "none"
                    });
                    g && g.setState(0);
                    e.openMenu = !1
                }, e.exportEvents.push(p(l, "mouseleave", function() {
                    l.hideTimer = setTimeout(B, 500)
                }), p(l, "mouseenter", function() {
                    f.clearTimeout(l.hideTimer)
                }), p(r, "mouseup", function(b) {
                    e.pointer.inClass(b.target, a) || B()
                }), p(l, "click", function() {
                    e.openMenu && B()
                })), w(b, function(a) {
                    "string" === typeof a && (a = e.options.exporting.menuItemDefinitions[a]);
                    if (f.isObject(a, !0)) {
                        var b;
                        b = a.separator ? v("hr", null, null, D) : v("div", {
                            className: "highcharts-menu-item",
                            onclick: function(b) {
                                b && b.stopPropagation();
                                B();
                                a.onclick && a.onclick.apply(e, arguments)
                            },
                            innerHTML: a.text || e.options.lang[a.textKey]
                        }, null, D);
                        e.exportDivElements.push(b)
                    }
                }), e.exportDivElements.push(D, l), e.exportMenuWidth = l.offsetWidth, e.exportMenuHeight = l.offsetHeight);
                b = {
                    display: "block"
                };
                c + e.exportMenuWidth > k ? b.right = k - c - t - m + "px" : b.left = c - m + "px";
                d + h + e.exportMenuHeight > n && "top" !== g.alignOptions.verticalAlign ?
                    b.bottom = n - d - m + "px" : b.top = d + h - m + "px";
                G(l, b);
                e.openMenu = !0
            },
            addButton: function(a) {
                var b = this,
                    c = b.renderer,
                    d = y(b.options.navigation.buttonOptions, a),
                    f = d.onclick,
                    h = d.menuItems,
                    g, e, k = d.symbolSize || 12;
                b.btnCount || (b.btnCount = 0);
                b.exportDivElements || (b.exportDivElements = [], b.exportSVGElements = []);
                if (!1 !== d.enabled) {
                    var n = d.theme,
                        u = n.states,
                        l = u && u.hover,
                        u = u && u.select,
                        m;
                    delete n.states;
                    f ? m = function(a) {
                        a.stopPropagation();
                        f.call(b, a)
                    } : h && (m = function() {
                        b.contextMenu(e.menuClassName, h, e.translateX, e.translateY,
                            e.width, e.height, e);
                        e.setState(2)
                    });
                    d.text && d.symbol ? n.paddingLeft = C(n.paddingLeft, 25) : d.text || A(n, {
                        width: d.width,
                        height: d.height,
                        padding: 0
                    });
                    e = c.button(d.text, 0, 0, m, n, l, u).addClass(a.className).attr({
                        title: C(b.options.lang[d._titleKey], "")
                    });
                    e.menuClassName = a.menuClassName || "highcharts-menu-" + b.btnCount++;
                    d.symbol && (g = c.symbol(d.symbol, d.symbolX - k / 2, d.symbolY - k / 2, k, k, {
                        width: k,
                        height: k
                    }).addClass("highcharts-button-symbol").attr({
                        zIndex: 1
                    }).add(e));
                    e.add(b.exportingGroup).align(A(d, {
                        width: e.width,
                        x: C(d.x, b.buttonOffset)
                    }), !0, "spacingBox");
                    b.buttonOffset += (e.width + d.buttonSpacing) * ("right" === d.align ? -1 : 1);
                    b.exportSVGElements.push(e, g)
                }
            },
            destroyExport: function(a) {
                var b = a ? a.target : this;
                a = b.exportSVGElements;
                var c = b.exportDivElements,
                    d = b.exportEvents,
                    t;
                a && (w(a, function(a, d) {
                    a && (a.onclick = a.ontouchstart = null, t = "cache-" + a.menuClassName, b[t] && delete b[t], b.exportSVGElements[d] = a.destroy())
                }), a.length = 0);
                b.exportingGroup && (b.exportingGroup.destroy(), delete b.exportingGroup);
                c && (w(c, function(a, d) {
                    f.clearTimeout(a.hideTimer);
                    K(a, "mouseleave");
                    b.exportDivElements[d] = a.onmouseout = a.onmouseover = a.ontouchstart = a.onclick = null;
                    F(a)
                }), c.length = 0);
                d && (w(d, function(a) {
                    a()
                }), d.length = 0)
            }
        });
        I.prototype.inlineToAttributes = "fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");
        I.prototype.inlineBlacklist = [/-/, /^(clipPath|cssText|d|height|width)$/, /^font$/, /[lL]ogical(Width|Height)$/, /perspective/, /TapHighlightColor/, /^transition/, /^length$/];
        I.prototype.unstyledElements = ["clipPath", "defs", "desc"];
        x.prototype.inlineStyles =
            function() {
                function a(a) {
                    return a.replace(/([A-Z])/g, function(a, b) {
                        return "-" + b.toLowerCase()
                    })
                }

                function b(c) {
                    function l(b, g) {
                        p = v = !1;
                        if (h) {
                            for (r = h.length; r-- && !v;) v = h[r].test(g);
                            p = !v
                        }
                        "transform" === g && "none" === b && (p = !0);
                        for (r = f.length; r-- && !p;) p = f[r].test(g) || "function" === typeof b;
                        p || t[g] === b && "svg" !== c.nodeName || e[c.nodeName][g] === b || (-1 !== d.indexOf(g) ? c.setAttribute(a(g), b) : u += a(g) + ":" + b + ";")
                    }
                    var m, t, u = "",
                        q, p, v, r;
                    if (1 === c.nodeType && -1 === g.indexOf(c.nodeName)) {
                        m = z.getComputedStyle(c, null);
                        t = "svg" ===
                            c.nodeName ? {} : z.getComputedStyle(c.parentNode, null);
                        e[c.nodeName] || (k = n.getElementsByTagName("svg")[0], q = n.createElementNS(c.namespaceURI, c.nodeName), k.appendChild(q), e[c.nodeName] = y(z.getComputedStyle(q, null)), "text" === c.nodeName && delete e.text.fill, k.removeChild(q));
                        if (N || M)
                            for (var x in m) l(m[x], x);
                        else H(m, l);
                        u && (m = c.getAttribute("style"), c.setAttribute("style", (m ? m + ";" : "") + u));
                        "svg" === c.nodeName && c.setAttribute("stroke-width", "1px");
                        "text" !== c.nodeName && w(c.children || c.childNodes, b)
                    }
                }
                var c = this.renderer,
                    d = c.inlineToAttributes,
                    f = c.inlineBlacklist,
                    h = c.inlineWhitelist,
                    g = c.unstyledElements,
                    e = {},
                    k, n, c = r.createElement("iframe");
                G(c, {
                    width: "1px",
                    height: "1px",
                    visibility: "hidden"
                });
                r.body.appendChild(c);
                n = c.contentWindow.document;
                n.open();
                n.write('\x3csvg xmlns\x3d"http://www.w3.org/2000/svg"\x3e\x3c/svg\x3e');
                n.close();
                b(this.container.querySelector("svg"));
                k.parentNode.removeChild(k)
            };
        L.menu = function(a, b, c, d) {
            return ["M", a, b + 2.5, "L", a + c, b + 2.5, "M", a, b + d / 2 + .5, "L", a + c, b + d / 2 + .5, "M", a, b + d - 1.5, "L", a + c, b + d - 1.5]
        };
        x.prototype.renderExporting = function() {
            var a = this,
                b = a.options.exporting,
                c = b.buttons,
                d = a.isDirtyExporting || !a.exportSVGElements;
            a.buttonOffset = 0;
            a.isDirtyExporting && a.destroyExport();
            d && !1 !== b.enabled && (a.exportEvents = [], a.exportingGroup = a.exportingGroup || a.renderer.g("exporting-group").attr({
                zIndex: 3
            }).add(), H(c, function(b) {
                a.addButton(b)
            }), a.isDirtyExporting = !1);
            p(a, "destroy", a.destroyExport)
        };
        p(x, "init", function() {
            var a = this;
            w(["exporting", "navigation"], function(b) {
                a[b] = {
                    update: function(c, d) {
                        a.isDirtyExporting = !0;
                        y(!0, a.options[b], c);
                        C(d, !0) && a.redraw()
                    }
                }
            })
        });
        x.prototype.callbacks.push(function(a) {
            a.renderExporting();
            p(a, "redraw", a.renderExporting)
        })
    })(q)
});