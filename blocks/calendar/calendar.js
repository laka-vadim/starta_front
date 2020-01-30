window.addEventListener("DOMContentLoaded", function() {

    const months = document.querySelectorAll(".calendar__days");
    
    function getDayOfWeek(year, month) {
        return new Date(year, month, 0).getDay()
    }
    
    function daysInMonth(year, month) {
        return 33 - new Date(year, month, 33).getDate();
    };
    
    function initYear(year) {
        [].forEach.call(months, (element, index) => {
            for (let i = 0; i < getDayOfWeek(year, index); i++) {
                element.appendChild(document.createElement("span"))
            }
            for (let i = 1; i <= daysInMonth(year, index); i++) {
                const date = document.createElement("li");
                date.innerText = i;
                element.appendChild(date);
            }
    
        })
    }
    
    function syncData() {
        fetch("http://localhost:3000/init", {
            method: "GET",
        })
        .then((res) => {
            if (res.ok) return res.json();
            else console.log("err");
        })
        .then(res => initYear(res.date))
        .catch(err => console.log(err.message));
    }
    
    syncData();
});