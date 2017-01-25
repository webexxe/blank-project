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
    //STRING CONVERTER (TR SUPPORT)
    String.prototype.strToUpper = function () {
        var string = this;
        var letters = {
            "i": "İ",
            "ı": "I",
            "ş": "Ş",
            "ğ": "Ğ",
            "ü": "Ü",
            "ö": "Ö",
            "ç": "Ç"
        };
        string = string.replace(/(([iışğüçö]))+/g, function (letter) {
            return letters[letter];
        });
        return string.toUpperCase();
    };
    String.prototype.strToLower = function () {
        var string = this;
        var letters = {
            "İ": "i",
            "I": "ı",
            "Ş": "ş",
            "Ğ": "ğ",
            "Ü": "ü",
            "Ö": "ö",
            "Ç": "ç"
        };
        string = string.replace(/(([İIŞĞÜÇÖ]))+/g, function (letter) {
            return letters[letter];
        });
        return string.toLowerCase();
    };
    String.prototype.strToCapitalize = function (all) {
        var string = this;
        if (all == true) {
            return string.split(" ").map(function (i) {return i[0].strToUpper() + i.substring(1)}).join(" ");
        } else {
            return string.charAt(0).strToUpper() + string.slice(1);
        }
    };
    String.prototype.strToUrl = function () {
        var string = this;
        string = string.replace(/ /g, "-");
        string = string.replace(/İ/g, "i");
        string = string.replace(/I/g, "i");
        string = string.replace(/ı/g, "i");
        string = string.replace(/ğ/g, "g");
        string = string.replace(/Ğ/g, "g");
        string = string.replace(/ü/g, "u");
        string = string.replace(/Ü/g, "u");
        string = string.replace(/ş/g, "s");
        string = string.replace(/Ş/g, "s");
        string = string.replace(/ö/g, "o");
        string = string.replace(/Ö/g, "o");
        string = string.replace(/ç/g, "c");
        string = string.replace(/Ç/g, "c");
        string = string.replace(/[^a-z0-9-]/gi, '');
        return string.toLowerCase();

    };

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
    //TOOGLE BTN ACTION

    var toggle_btn = $(".toggleBtn");

    toggle_btn.on("click", function () {
        $(this).toggleClass("active");
        var target = $(this).attr("data-target");
        $(target).slideToggle(300);
    });

    //----------------------------------------------------------------------------------------------------------------//
    //TOOGLE BTN CLASLI ACTION
    var toggle_active_btn = $(".toggleActiveBtn");

    toggle_active_btn.on("click", function () {
        var target = $(this).attr("data-target");
        $(target).toggleClass("active");
    });

    //----------------------------------------------------------------------------------------------------------------//
    //TAB SYSTEM
    var tab_system = $(".tab-menu .t-menu");

    tab_system.on("click", function () {
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
    //JS INCLUDE FUNCTION

    $.js_include = function (jsname) {
        var head = $("head");
        var script = "<script src='" + jsname + "'></script>";
        head.append(script);
    };

    //----------------------------------------------------------------------------------------------------------------//
    //SWIPE ACTION

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