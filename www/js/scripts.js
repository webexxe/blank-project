$(function(){var t=/iphone|ipod|ipad|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());t?$("body").addClass("mobil"):($("body").addClass("desktop"),smothScroll()),$.scrollgoto=function(t,e,i,n){e=void 0==e?0:e,i=void 0==i?300:i,n=void 0==n?0:n,setTimeout(function(){$("html, body").animate({scrollTop:$(t).offset().top-e},i)},n)},$('a[href*="#"]:not([href="#"]):not(.t-menu)').click(function(){var t=$(this.hash),e=$(this).attr("data-top"),i=$(this).attr("data-speed"),n=$(this).attr("data-delay");return e=void 0==e?0:e,i=void 0==i?300:i,n=void 0==n?0:n,i=parseInt(i),t.length?(setTimeout(function(){$("html, body").animate({scrollTop:$(t).offset().top-e},i)},n),!1):void 0});var e=$(".toggleBtn");e.on("click",function(){$(this).toggleClass("active");var t=$(this).attr("data-target");$(t).slideToggle(300)});var i=$(".toggleActiveBtn");i.on("click",function(){var t=$(this).attr("data-target");$(t).toggleClass("active")});var n=$(".tab-menu .t-menu");n.on("click",function(){var t=$(this).parents(".tab-menu"),e=$(this).parents(".tab-menu").attr("data-tab-target"),i=$(this).attr("data-target");e=$(".tab-content#"+e),t.find(".t-menu").removeClass("active"),$(this).addClass("active"),e.find(".t-content").removeClass("active"),e.find("#"+i+".t-content").addClass("active")});var o=window.location.href.slice(window.location.href.indexOf("#"));$(".tab-menu .t-menu[href='"+o+"']").click(),$.js_include=function(t){var e=$("head"),i="<script src='"+t+"'></script>";e.append(i)};var a,r=50,s=1e3,c={down:0,up:0,suAn:0},u={ilk:{x:0,y:0},suAn:{x:0,y:0}},l=!1,d={};Array.prototype.tumu=function(){return this.every(function(t){return t})},Array.prototype.biri=function(){return this.some(function(t){return t})};var m=function(){var t=[l,Math.abs(u.ilk.x-u.suAn.x)<r,Math.abs(u.ilk.y-u.suAn.y)<r,(new Date).getTime()-c.down>=s];t.tumu()&&$(a).trigger("hold",[d])},g=function(t){l||(l=!0,c.down=t.timeStamp,c.suAn=t.timeStamp,u.ilk.x=t.clientX||t.originalEvent.touches[0].clientX,u.ilk.y=t.clientY||t.originalEvent.touches[0].clientY,u.suAn.x=t.clientX||t.originalEvent.touches[0].clientX,u.suAn.y=t.clientY||t.originalEvent.touches[0].clientY,a=t.target,d.time=c,d.pos=u,d.lastTarget=a,$(t.target).trigger("swipeStart",[d]),setTimeout(m,s))},h=function(t){l&&(c.suAn=t.timeStamp,u.suAn.x=t.clientX||t.originalEvent.touches[0].clientX,u.suAn.y=t.clientY||t.originalEvent.touches[0].clientY,d.time=c,$(a).trigger("swipe",[d]))},v=function(t){if(l){l=!1,c.up=t.timeStamp,c.suAn=t.timeStamp;var e=Math.abs(u.ilk.x-u.suAn.x),i=Math.abs(u.ilk.y-u.suAn.y);d.time=c,$(a).trigger("swipeEnd",[d]);var n=[e>r,i>r];if(n.biri()){var o=e>i;o?u.ilk.x<u.suAn.x?$(a).trigger("swipeRight",[d]):$(a).trigger("swipeLeft",[d]):u.ilk.y<u.suAn.y?$(a).trigger("swipeDown",[d]):$(a).trigger("swipeUp",[d])}}},p=function(){l=!1};"undefined"==typeof $d&&($d=$(document)),$d.on("mousedown",g),$d.on("touchstart",g),$d.on("mousemove",h),$d.on("touchmove",h),$("html").on("mouseout",p),$d.on("mouseup",v),$d.on("touchend",v),$d.on("touchcancel",v)});
$(function(){var o=$(window).width(),n=$(window).height();$(window).on("genDegisti",function(){console.log(o)}),$(window).on("yukDegisti",function(){console.log(n)});var i=$("body.mobil");i.on("swipeLeft",function(){console.log("swipe Left")}),i.on("swipeRight",function(){console.log("swipe Right")})});