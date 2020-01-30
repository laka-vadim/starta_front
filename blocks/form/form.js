window.addEventListener("DOMContentLoaded", function() {
    calendar = document.getElementById("calendar");
    phoneForm = document.forms.callback;

    function renderChoose(elem) {
        const checkOther = document.querySelector("li.calendar__day_choosen");
        if (checkOther) {
            checkOther.classList.toggle("calendar__day_choosen");
            elem.classList.toggle("calendar__day_choosen");
        } else {
            elem.classList.toggle("calendar__day_choosen");
        }
    }

    function chooseDate(event) {
        if (event.target.tagName == "LI") {
            const day = event.target.innerText;
            const month = event.target.parentNode.dataset.month;
            renderChoose(event.target);
            window.choosenDate = { day, month };
            console.log(window.choosenDate);
        };
    };

    function validatePhone(phoneInput) {
        regExp = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        if (regExp.exec(phoneInput.value)) {
            return true;
        }
    };

    function sendForm(event) {
        event.preventDefault();
        if (validatePhone(phoneForm.elements.phone)) {
            console.log("true");
        }
    };

    phoneForm.addEventListener("submit", sendForm);
    calendar.addEventListener("click", chooseDate);
});
