$(document).ready(() => {
    const page = $("html");
    const minScrollOffset = 50;
    const scrollSpeed = 1000;

    /* Stop all animated on user scroll */
    page.on("mousewheel", animationStop);

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
        animationStop();
        page.animate({scrollTop: 0}, scrollSpeed);
    });

    /* Product button scroll */
    const productButton = $("#product-menu-button");
    const productBlock = $(".main-block");

    productButton.click(() => scrollToBlock(productBlock));

    /* About button scroll */
    const aboutButton = $("#about-menu-button");
    const aboutBlock = $(".features-block");

    aboutButton.click(() => scrollToBlock(aboutBlock));

    /* Contact us button scroll */
    const contactButton = $("#contact-menu-button");
    const contactBlock = $(".footer");

    contactButton.click(() => scrollToBlock(contactBlock));

    /**
     * Stop current animation
     */
    function animationStop() {
        $(":animated").stop();
    }

    /**
     * Scroll to the middle of the block
     * or to the top of the block if block is more than window size
     *
     * @param block Element to be scroll
     */
    function scrollToBlock(block) {
        animationStop();
        let offsetFromTop = ($(window).height() - block.outerHeight(true)) / 2;

        if (offsetFromTop < 0) {
            offsetFromTop = 0;
        }

        page.animate({scrollTop: block.offset().top - offsetFromTop}, scrollSpeed);
    }
});