document.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {
    const grid = new Isotope('.card_wrap2 ul', { //배치할 요소를 감싸고 있는 부모 요소명
      itemSelector: '.card_wrap2 ul li', //배치할 요소 명
      columnWidth: '.card_wrap2 ul li', //너비 값을 구할 요소 명
      transitionDuration: '0.5s', //화면 재배치시 요소가 움직이는 속도
    });
    // 필터 버튼 클릭 시 검색창에 텍스트 표시
    const filterBtns = document.querySelectorAll('.txt_btn button');
    const searchInput = document.querySelector('.search_bar input');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // 버튼 active 상태 변경
        filterBtns.forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        // 검색창에 버튼 텍스트 표시
        searchInput.value = btn.textContent;

        // 필터 값 가져오기
        const filterValue = btn.getAttribute('data-href');

        // Isotope 필터링
        grid.arrange({
          filter: filterValue
        });
      });
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
  const cards = document.querySelectorAll('.card_wrap2 .card');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${0.01 * (index % 10)}s`; // 8개씩 묶음
    observer.observe(card);
  });


});




