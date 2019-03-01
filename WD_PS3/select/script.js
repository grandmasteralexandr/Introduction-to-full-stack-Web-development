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

/* JQuery Code */
$(document).ready(() => {

    /* Add data */
    $("body").append(WRAPPER);
    $(".wrapper").append(DROPDOWN);
    const selectDropdown = $(".dropdown");

    for (let item of NAMES) {
        selectDropdown.append($(DROPDOWN_OPTION).text(item));
    }

    const selectDropdownOptions = $(".dropdown-option");
    selectDropdown.prepend($(DROPDOWN_OPTION).text("Select friend").addClass("selected default-option"));
    let selectedOption = $(".dropdown-option.selected");
    let visibleOption = $(".dropdown li:first-child");
    $(".dropdown li:last-child").addClass("last-option");
    selectDropdownOptions.hide();

    /* Handlers */
    selectDropdown.click(() => {
        selectDropdownOptions.toggle();
    });

    selectDropdownOptions.click((event) => {
        selectedOption.removeClass("selected");
        selectedOption = $(event.target);
        visibleOption.remove();
        selectDropdown.prepend(selectedOption.removeClass("hover").clone());
        visibleOption = $(".dropdown li:first-child");
        selectedOption.addClass("selected");
    });

    selectDropdownOptions.hover(
        (event) => {
            $(event.target).addClass("hover");
        },
        (event) => {
            $(event.target).removeClass("hover");
        }
    );

    /* Close dropdown if click in another element */
    $(document).click((event) => {
        if (!selectDropdown.is(event.target) && selectDropdown.has(event.target).length === 0) {
            selectDropdownOptions.hide();
        }
    });
});
