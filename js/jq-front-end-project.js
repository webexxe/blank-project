$(function () {

    //----------------------------------------------------------------------------------------------------------------//
    //VARIABLES

    var sizew = $(window).width();
    var sizeh = $(window).height();

    //----------------------------------------------------------------------------------------------------------------//
    //WINDOWS RESIZE

    $(window).on("genDegisti", function () {
        console.log(sizew);
    });
    $(window).on("yukDegisti", function () {
        console.log(sizeh);
    });

    //----------------------------------------------------------------------------------------------------------------//
    //TOUCH SWIPE

    var touchScope = $("body.mobil");

    touchScope.on("swipeLeft", function () {
        console.log("swipe Left");
    });

    touchScope.on("swipeRight", function () {
        console.log("swipe Right");
    });

    //----------------------------------------------------------------------------------------------------------------//
    //------------------------------------------------ START FUNCTIONS -----------------------------------------------//
    //----------------------------------------------------------------------------------------------------------------//

});