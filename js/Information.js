document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".top_btn button");
    const sections = document.querySelectorAll(".tab");
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("on"));
            sections.forEach(sec => sec.classList.remove("on"));
            button.classList.add("on");
            sections[index].classList.add("on");
        });
    });

    const buttons2 = document.querySelectorAll(".Directions_btn button");
    const sections2 = document.querySelectorAll(".bottom_tab_con");
    buttons2.forEach((button, index) => {
        button.addEventListener("click", () => {
            buttons2.forEach(btn => btn.classList.remove("on"));
            sections2.forEach(sec => sec.classList.remove("on"));
            button.classList.add("on");
            sections2[index].classList.add("on");
        });
    });

});