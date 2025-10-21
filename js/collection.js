const viewBtns = document.querySelectorAll('.view_btns button');

viewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    viewBtns.forEach(b => {
      b.classList.remove('on');
    });

    btn.classList.add('on');
  });
});

let colSwiper = new Swiper(".card_wrap .swiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
});