$(document).ready(() => {
    const page = $("html");
    const minScrollOffset = 50;

    /* Stop all animated on scroll */
    page.on("mousewheel", () => $(":animated").stop());

    /* Button to top */
    $("body").append("<button class='button button-to-top'>To Top</button>");
    let buttonToTop = $(".button-to-top");
    buttonToTop.hide();

    $(document).scroll(() => {
        if ($(document).scrollTop() > minScrollOffset) {
            buttonToTop.show();
        } else {
            buttonToTop.hide();
        }
    });

    buttonToTop.click(() => {
        page.animate({scrollTop: 0}, 1000);
    });


});