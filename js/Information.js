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
});