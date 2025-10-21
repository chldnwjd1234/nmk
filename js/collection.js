document.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {
    const grid = new Isotope('.card_wrap2 ul', { //배치할 요소를 감싸고 있는 부모 요소명
      itemSelector: '.card_wrap2 ul li', //배치할 요소 명
      columnWidth: '.card_wrap2 ul li', //너비 값을 구할 요소 명
      transitionDuration: '0.5s', //화면 재배치시 요소가 움직이는 속도
    });
  })
  const viewBtns = document.querySelectorAll('.view_btns button');
  const card_wraps = document.querySelectorAll('.card_wrap');

  viewBtns.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      viewBtns.forEach(b => {
        b.classList.remove('on');
      });
      card_wraps.forEach(b => {
        b.classList.remove('on');
      });
      btn.classList.add('on');
      card_wraps[i].classList.add('on');
      if (i == 0) {
        grid.arrange({
          filter: '*', // 모든 아이템 보여주기
        });
      }
    });
  });

  let colSwiper = new Swiper(".card_wrap .swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });




});




