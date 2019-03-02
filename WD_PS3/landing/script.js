$(document).ready(() => {
    /* Button to top */
    $("body").append("<button class='button button-to-top'>To Top</button>");
    let buttonToTop = $(".button-to-top");
    buttonToTop.hide();

    $(document).scroll(() => {
        if ($(document).scrollTop() > 50) {
            buttonToTop.show();
        } else {
            buttonToTop.hide();
        }
    });

    buttonToTop.click(() => {
        $("html").animate({scrollTop: 0}, 800);
    });


});