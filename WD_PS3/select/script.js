const NAMES = [
    "John Snow",
    "Alisa Steel",
    "King Artur",
    "Sara Konnor",
    "Frodo Beggins",
];

/* Class names */
const wrapperClass = "wrapper";
const dropdownClass = "dropdown";
const dropdownOptionClass = "dropdown-option";
const selectedClass = "selected";
const selectedOptionClass = "selected-option";
const defaultOptionClass = "default-option";
const lastOptionClass = "last-option";

const wrapper = `<div class='${wrapperClass}'></div>`;
const dropdown = `<ul class='${dropdownClass}'></ul>`;
const dropdownOption = `<li class='${dropdownOptionClass}'></li>`;

/* JQuery Code */
$(document).ready(() => {

    /* Add data */
    $("body").append(wrapper);
    $(`.${wrapperClass}`).append(dropdown);
    const selectDropdown = $(`.${dropdownClass}`);

    for (let item of NAMES) {
        selectDropdown.append($(dropdownOption).html(`<img src="avatars/${item}.png" alt="${item}">${item}`));
    }

    const selectDropdownOptions = $(`.${dropdownOptionClass}`);
    selectDropdown.prepend(
        $(dropdownOption)
            .html("Select friend<span>▼</span>")
            .addClass(`${selectedClass} ${defaultOptionClass}`)
    );
    let selectedOption = $(`.${dropdownOptionClass}.${selectedClass}`);
    let visibleOption = $(`.${dropdownClass} li:first-child`);
    $(`.${dropdownClass} li:last-child`).addClass(lastOptionClass);
    selectDropdownOptions.hide();

    /* Handlers */

    /* Click on dropdown */
    selectDropdown.click(() => {
        selectDropdownOptions.toggle();
    });

    /* Click on option */
    selectDropdownOptions.click((event) => {
        selectedOption.removeClass(selectedOptionClass);
        selectedOption = $(event.currentTarget);
        visibleOption.remove();
        selectDropdown.prepend(selectedOption.clone());
        visibleOption = $(`.${dropdownClass} li:first-child`);
        visibleOption.addClass(selectedClass).append("<span>▼</span>");
        selectedOption.addClass(selectedOptionClass);
    });

    /* Close dropdown if click in another element */
    $(document).click((event) => {
        if (!selectDropdown.is(event.target) && selectDropdown.has(event.target).length === 0) {
            selectDropdownOptions.hide();
        }
    });
});
