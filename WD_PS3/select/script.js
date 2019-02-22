const NAMES = [
    "John Snow",
    "Alisa Steel",
    "King Artur",
    "Sara Konnor",
    "Frodo Beggins",
];

const WRAPPER = "<div class='wrapper'></div>";
const DROPDOWN = "<ul class='dropdown'></ul>";
const DROPDOWN_OPTION = "<li class='dropdown-option'></li>";
const SELECT_DROPDOWN = ".dropdown";
const SELECT_DROPDOWN_OPTIONS = ".dropdown-option";

/* JQuery Code */
$(document).ready(() => {

    /* Add data */
    $("body").append(WRAPPER);
    $(".wrapper").append(DROPDOWN);
    $(SELECT_DROPDOWN).append($(DROPDOWN_OPTION).text("Select friend"));
    for (let item of NAMES) {
        $(SELECT_DROPDOWN).append($(DROPDOWN_OPTION).text(item));
    }

    $(SELECT_DROPDOWN_OPTIONS).hide();

    $(SELECT_DROPDOWN).click(() => {
        $(SELECT_DROPDOWN_OPTIONS).toggle();
    });
});
