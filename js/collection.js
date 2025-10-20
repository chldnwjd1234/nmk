const viewBtns = document.querySelectorAll('.view_btns button');

viewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // 모든 버튼 초기화
    viewBtns.forEach(b => {
      b.classList.remove('on');
    });

    // 클릭한 버튼 활성화(on 이미지로 변경)
    btn.classList.add('on');
  });
});

let colSwiper = new Swiper(".card_wrap .swiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
});