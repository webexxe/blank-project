$(function () {

    //----------------------------------------------------------------------------------------------------------------//
    // MOBIL - DESKTOP

    var mobile = (/iphone|ipod|ipad|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) {
        $("body").addClass("mobil");
    } else {
        $("body").addClass("desktop");
        smothScroll();
    }

    //----------------------------------------------------------------------------------------------------------------//
    //SCROLL GO TO

    // DIV BUTTON
    $.scrollgoto = function (target, top, speed, delay) {
        top = top == undefined ? 0 : top;
        speed = speed == undefined ? 300 : speed;
        delay = delay == undefined ? 0 : delay;
        setTimeout(function () {
            $('html, body').animate({
                scrollTop: $(target).offset().top - top
            }, speed);
        }, delay);
    };

    // A HREF
    $('a[href*="#"]:not([href="#"]):not(.t-menu)').click(function () {
        var target = $(this.hash),
            top = $(this).attr("data-top"),
            speed = $(this).attr("data-speed"),
            delay = $(this).attr("data-delay");
        top = top == undefined ? 0 : top;
        speed = speed == undefined ? 300 : speed;
        delay = delay == undefined ? 0 : delay;
        speed = parseInt(speed);

        if (target.length) {
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: $(target).offset().top - top
                }, speed);
            }, delay);
            return false;
        }
    });

    //----------------------------------------------------------------------------------------------------------------//
    //TOOGLE BTN OLAYLARI

    $(".toggleBtn").on("click", function () {
        $(this).toggleClass("active");
        var target = $(this).attr("data-target");
        $(target).slideToggle(300);
    });

    //----------------------------------------------------------------------------------------------------------------//
    //TOOGLE BTN CLASLI OLAYLAR

    $(".toggleActiveBtn").on("click", function () {
        var target = $(this).attr("data-target");
        $(target).toggleClass("active");
    });

    //----------------------------------------------------------------------------------------------------------------//
    //TAB SYSTEM
    $(".tab-menu .t-menu").on("click", function () {
        var tabMenu = $(this).parents(".tab-menu");
        var tabTarget = $(this).parents(".tab-menu").attr("data-tab-target");
        var target = $(this).attr("data-target");
        tabTarget = $(".tab-content#" + tabTarget);

        //MENU ACTIVE SELECT
        tabMenu.find(".t-menu").removeClass("active");
        $(this).addClass("active");

        //CONTENT ACTIVE SELECT
        tabTarget.find(".t-content").removeClass("active");
        tabTarget.find("#" + target + ".t-content").addClass("active");
    });

    // URL #name CONTENT ACTIVE SELECT
    var tabName = window.location.href.slice(window.location.href.indexOf('#'));
    $(".tab-menu .t-menu[href='" + tabName + "']").click();

    //----------------------------------------------------------------------------------------------------------------//
    //POPUPA OLAYLARI

    //READY ACILAN
    if ($(".popupA[data-ready]").length) {
        //POZISYON HESAPLAMA
        var target = $(".popupA[data-ready]").attr("data-target");
        var yuksek = $(".popupA[data-target=" + target + "]").outerHeight() / 2;
        $(".popupA[data-target=" + target + "]").css("margin-top", "-" + yuksek + "px")
        // POPUP ISLEMI
        $(".popupA[data-target=" + target + "]").fadeToggle(200);
        $(".popupA[data-target=" + target + "]").find(".kapat").attr("data-target", target);
        $(".maske").fadeToggle(200);
        $(".maske").attr("data-target", target);
    }

    //ALERT STILI ACILAN
    var alertClass = "pAlert";
    $.popupAlert = function (alertMessage, title, maske) {
        var alertMessage = typeof alertMessage === 'undefined' ? "Bir hata oluştu!" : alertMessage;
        var title = typeof title === 'undefined' ? null : title;
        var maske = typeof maske === 'undefined' ? true : typeof maske !== 'boolean' ? true : maske; // ture - false
        var target = "alert";
        //TEKRAR
        if ($(".popupA[data-target='" + target + "']").length) $(".popupA[data-target='" + target + "']").find(".kapat").click();

        $("body").prepend("<div class='popupA " + alertClass + "' data-target='" + target + "'><div class='kapat flaticon-close47'></div><div class='icerik'>" + alertMessage + "</div></div>")
        if (title) $(".popupA[data-target=" + target + "]").prepend("<div class='baslik'>" + title + "</div>")

        $(".popupA[data-target=" + target + "]").fadeIn(200);
        if (maske == true) {
            $(".maske").fadeIn(200);
            $(".maske").attr("data-target", target);
        }
    };

    //TETIKLEYEREK ACILAN
    $.popupA = function (target) {
        $(".popupA[data-target=" + target + "]").fadeToggle(200);
        $(".maske").fadeToggle(200);
        $(".maske").attr("data-target", target);
    };
    $.popupAin = function (target) {
        $(".popupA[data-target=" + target + "]").fadeIn(200);
        $(".maske").fadeIn(200);
        $(".maske").attr("data-target", target);
    };
    $.popupAout = function (target) {
        $(".popupA[data-target=" + target + "]").fadeOut(200);
        $(".maske").fadeOut(200);
        $(".maske").removeAttr("data-target");
    };

    //$.popup("hataAlert");
    //$.popupAin("hataAlert");
    //$.popupAout("hataAlert");

    //CLICK ACILAN
    $(document).delegate(".popupAbtn", "click", function () {
        //POZISYON HESAPLAMA
        var target = $(this).attr("data-target");
        var yuksek = $(".popupA[data-target=" + target + "]").outerHeight() / 2;
        $(".popupA[data-target=" + target + "]").css("margin-top", "-" + yuksek + "px")

        // POPUP ISLEMI
        $(".popupA[data-target=" + target + "]").fadeToggle(200);
        $(".popupA[data-target=" + target + "]").find(".kapat").attr("data-target", target);
        $(".maske").fadeToggle(200);
        $(".maske").attr("data-target", target);
    });

    $(document).delegate(".popupA .kapat", "click", function () {
        var target = $(this).parents(".popupA").attr("data-target");
        $(".popupA[data-target=" + target + "]").fadeOut(200);
        $(".maske").fadeOut(200);
        $(".maske").removeAttr("data-target");

        // popupAlert ILE OLUSTURULAN ISKELETI SILER
        if ($(".popupA[data-target='" + target + "']").hasClass(alertClass)) $(".popupA[data-target=" + target + "]").remove();

    });

    $(document).delegate(".maske", "click", function () {
        if ($(this).attr("data-target")) {
            var target = $(this).attr("data-target");
            $(".popupA[data-target=" + target + "]").fadeToggle(200);
            $(".maske").fadeToggle(200);
            $(".maske").removeAttr("data-target");

            // popupAlert ILE OLUSTURULAN ISKELETI SILER
            if ($(".popupA[data-target='" + target + "']").hasClass(alertClass)) $(".popupA[data-target=" + target + "]").remove();
        }
    });


    //----------------------------------------------------------------------------------------------------------------//
    //GENISLIK YUKSEKLIK DEGISTIGINDE

    (function ($) {
        var a = {}, c = "doTimeout", d = Array.prototype.slice;
        $[c] = function () {
            return b.apply(window, [0].concat(d.call(arguments)))
        };
        $.fn[c] = function () {
            var f = d.call(arguments), e = b.apply(this, [c + f[0]].concat(f));
            return typeof f[0] === "number" || typeof f[1] === "number" ? this : e
        };
        function b(l) {
            var m = this, h, k = {}, g = l ? $.fn : $, n = arguments, i = 4, f = n[1], j = n[2], p = n[3];
            if (typeof f !== "string") {
                i--;
                f = l = 0;
                j = n[1];
                p = n[2]
            }
            if (l) {
                h = m.eq(0);
                h.data(l, k = h.data(l) || {})
            } else {
                if (f) {
                    k = a[f] || (a[f] = {})
                }
            }
            k.id && clearTimeout(k.id);
            delete k.id;
            function e() {
                if (l) {
                    h.removeData(l)
                } else {
                    if (f) {
                        delete a[f]
                    }
                }
            }

            function o() {
                k.id = setTimeout(function () {
                    k.fn()
                }, j)
            }

            if (p) {
                k.fn = function (q) {
                    if (typeof p === "string") {
                        p = g[p]
                    }
                    p.apply(m, d.call(n, i)) === true && !q ? o() : e()
                };
                o()
            } else {
                if (k.fn) {
                    j === undefined ? e() : k.fn(j === false);
                    return true
                } else {
                    e()
                }
            }
        }
    })(jQuery);
    $w = $(window),
        $d = $(document),
        $ww = $w.width(),
        $wh = $w.height(),
        $wt = $w.scrollTop(),
        $wb = $wt + $wh;

    var resizedevam = false;
    $w.on("resize", function () {
        if (!resizedevam) {
            $w.trigger("resizeBasinda");
            resizedevam = true;
        }

        $.doTimeout("resizebitir", 190, function () {
            $(window).trigger("resizeSonunda");
            resizedevam = false;
        })
    });
    var ilkWw = 0, ilkWh = 0;
    $w.on("resizeBasinda", function () {
        ilkWw = $ww;
        ilkWh = $wh;
    });
    $w.on("resizeSonunda", function () {
        $ww = $w.width(),
            $wh = $w.height(),
            $wb = $wt + $wh;

        if (ilkWw != $ww) {
            $w.trigger("genDegisti");

            if (ilkWw < $ww)
                $w.trigger("genisledi");
            else
                $w.trigger("daraldi");
        }
        if (ilkWh != $wh) {
            $w.trigger("yukDegisti");

            if (ilkWh < $wh)
                $w.trigger("uzadi");
            else
                $w.trigger("kisaldi");
        }
    });

    //----------------------------------------------------------------------------------------------------------------//
    //SWIPE PARMAK KAYDIRMA HAREKETLERI

    var swipeDeadZone = 50,
        holdTime = 1000;

    var time = {
            down: 0,
            up: 0,
            suAn: 0
        },
        pos = {
            ilk: {x: 0, y: 0},
            suAn: {x: 0, y: 0}
        },
        mouseDown = false,
        lastTarget,
        data = {};

    Array.prototype.tumu = function () {
        return this.every(function (el) {
            return el
        })
    };

    Array.prototype.biri = function () {
        return this.some(function (el) {
            return el
        })
    };

    var holdTimeOutHandler = function () {

        var sartlar = [
            mouseDown,
            Math.abs(pos.ilk.x - pos.suAn.x) < swipeDeadZone,
            Math.abs(pos.ilk.y - pos.suAn.y) < swipeDeadZone,
            new Date().getTime() - time.down >= holdTime
        ];

        if (sartlar.tumu())
            $(lastTarget).trigger("hold", [data]);

    };

    var downHandler = function (e) {

        if (!mouseDown) {

            mouseDown = true;

            time.down = e.timeStamp;
            time.suAn = e.timeStamp;

            pos.ilk.x = e.clientX || e.originalEvent.touches[0].clientX;
            pos.ilk.y = e.clientY || e.originalEvent.touches[0].clientY;
            pos.suAn.x = e.clientX || e.originalEvent.touches[0].clientX;
            pos.suAn.y = e.clientY || e.originalEvent.touches[0].clientY;

            lastTarget = e.target;

            data.time = time;
            data.pos = pos;
            data.lastTarget = lastTarget;

            $(e.target).trigger("swipeStart", [data]);

            setTimeout(holdTimeOutHandler, holdTime);
        }
    };

    var moveHandler = function (e) {

        if (mouseDown) {

            time.suAn = e.timeStamp;

            pos.suAn.x = e.clientX || e.originalEvent.touches[0].clientX;
            pos.suAn.y = e.clientY || e.originalEvent.touches[0].clientY;

            data.time = time;

            $(lastTarget).trigger("swipe", [data]);

        }
    };

    var upHandler = function (e) {
        if (mouseDown) {

            mouseDown = false;

            time.up = e.timeStamp;
            time.suAn = e.timeStamp;

            var farkX = Math.abs(pos.ilk.x - pos.suAn.x),
                farkY = Math.abs(pos.ilk.y - pos.suAn.y);

            data.time = time;

            $(lastTarget).trigger("swipeEnd", [data]);

            var sartlar = [
                farkX > swipeDeadZone,
                farkY > swipeDeadZone
            ];

            if (sartlar.biri()) {

                // TRUE = X; FALSE = Y
                var eksenX = farkX > farkY;

                if (eksenX) {

                    if (pos.ilk.x < pos.suAn.x)
                        $(lastTarget).trigger("swipeRight", [data]);
                    else
                        $(lastTarget).trigger("swipeLeft", [data]);

                } else {

                    if (pos.ilk.y < pos.suAn.y)
                        $(lastTarget).trigger("swipeDown", [data]);
                    else
                        $(lastTarget).trigger("swipeUp", [data]);

                }

            }

        }
    };

    var errorHandler = function () {
        mouseDown = false;
    };

    if (typeof $d === 'undefined')
        $d = $(document);

    $d.on("mousedown", downHandler);
    $d.on("touchstart", downHandler);

    $d.on("mousemove", moveHandler);
    $d.on("touchmove", moveHandler);

    $("html").on("mouseout", errorHandler);

    $d.on("mouseup", upHandler);
    $d.on("touchend", upHandler);
    $d.on("touchcancel", upHandler);


    //----------------------------------------------------------------------------------------------------------------//

});