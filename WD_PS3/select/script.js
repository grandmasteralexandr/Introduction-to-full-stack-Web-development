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
    selectDropdown.append($(DROPDOWN_OPTION).text("Select friend").addClass("selected"));

    for (let item of NAMES) {
        selectDropdown.append($(DROPDOWN_OPTION).text(item));
    }

    const selectDropdownOptions = $(".dropdown-option");
    let selectedOption = $(".dropdown-option.selected");

    selectDropdown.prepend(selectedOption.clone());
    selectDropdownOptions.hide();

    selectDropdown.click(() => {
        selectDropdownOptions.toggle();
    });

    selectDropdownOptions.click((event) => {
        $(event.currentTarget).addClass("selected");
    })
});
