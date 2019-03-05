const NAMES = [
    "John Snow",
    "Alisa Steel",
    "King Artur",
    "Sara Konnor",
    "Frodo Beggins",
];

const wrapper = "<div class='wrapper'></div>";
const dropdown = "<ul class='dropdown'></ul>";
const dropdownOption = "<li class='dropdown-option'></li>";

/* JQuery Code */
$(document).ready(() => {

    /* Add data */
    $("body").append(wrapper);
    $(".wrapper").append(dropdown);
    const selectDropdown = $(".dropdown");

    for (let item of NAMES) {
        selectDropdown.append($(dropdownOption).html(`<img src="avatars/${item}.png" alt="${item}">${item}`));
    }

    const selectDropdownOptions = $(".dropdown-option");
    selectDropdown.prepend($(dropdownOption).html("Select friend<span>▼</span>").addClass("selected default-option"));
    let selectedOption = $(".dropdown-option.selected");
    let visibleOption = $(".dropdown li:first-child");
    $(".dropdown li:last-child").addClass("last-option");
    selectDropdownOptions.hide();

    /* Handlers */

    /* Click on dropdown */
    selectDropdown.click(() => {
        selectDropdownOptions.toggle();
    });

    /* Click on option */
    selectDropdownOptions.click((event) => {
        selectedOption = $(event.target);
        visibleOption.remove();
        selectDropdown.prepend(selectedOption.removeClass("hover").clone());
        visibleOption = $(".dropdown li:first-child");
        visibleOption.addClass("selected").append("<span>▼</span>");
    });

    /* Hover option */
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
