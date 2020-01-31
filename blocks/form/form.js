window.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const phoneForm = document.forms.callback;
    const errBlock = document.getElementById("err-block");

    let bookDate;

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
        if (event.target.tagName == "LI" & !event.target.classList.contains("calendar__day_isBook")) {
            const day = event.target.innerText;
            const month = event.target.parentNode.dataset.month;
            renderChoose(event.target);
            bookDate = { day, month };
        };
    };

    function validatePhone(phoneInput) {
        regExp = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        if (regExp.exec(phoneInput.value)) {
            return true;
        }
    };

    function errRender(text) {
        errBlock.innerText = text;
    }

    function sendToServer(bookInfo) {
        fetch("http://localhost:3000/book", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookInfo)
        })
        .then((res) => {
            if (res.ok) alert("Бронь успешна");
            else alert("Ошибка брони");
        })
        .catch(err => alert(`Ошибкa ${err.message}`));
    };

    function sendForm(event) {
        event.preventDefault();
        if (validatePhone(phoneForm.elements.phone)) {
            if (bookDate) {
                console.log(bookDate);
                const bookInfo = {
                    phone: phoneForm.elements.phone.value,
                    day: bookDate.day,
                    month: bookDate.month
                }
                sendToServer(bookInfo);
                errRender("");
            } else {
                errRender("Дата не выбрана!");
            }
        } else {
            errRender("Некорректно введен номер телефона!");
        }
    };

    phoneForm.addEventListener("submit", sendForm);
    calendar.addEventListener("click", chooseDate);
});
