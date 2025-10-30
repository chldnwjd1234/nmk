document.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {
    const grid = new Isotope('.card_wrap2 ul', {
      itemSelector: '.card_wrap2 ul li',
      columnWidth: '.card_wrap2 ul li',
      transitionDuration: '0.5s',
    });

    const filterBtns = document.querySelectorAll('.txt_btn button');
    const searchInput = document.querySelector('.search_bar input');
    const viewBtnsContainer = document.querySelector('.view_btns');
    const resultCount = document.querySelector('.results b'); // 결과 숫자 요소

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 이미 active인 버튼을 다시 클릭한 경우
        if (btn.classList.contains('active')) {
          // active 제거
          btn.classList.remove('active');
          // 검색창 비우기
          searchInput.value = '';
          // 전체 보기
          grid.arrange({
            filter: '*'
          });
          // view_btns 다시 보이기
          viewBtnsContainer.style.display = 'flex';
          // 전체 카드 개수로 업데이트
          const totalCards = document.querySelectorAll('.card_wrap2 ul li').length;
          resultCount.textContent = totalCards;
        } else {
          // 다른 버튼 클릭한 경우
          // 모든 버튼에서 active 제거
          filterBtns.forEach(b => b.classList.remove('active'));
          // 클릭한 버튼에 active 추가
          btn.classList.add('active');
          // 검색창에 버튼 텍스트 표시
          searchInput.value = btn.textContent;
          // 필터링
          const filterValue = btn.getAttribute('data-href');
          grid.arrange({
            filter: filterValue
          });
          // view_btns 숨기기
          viewBtnsContainer.style.display = 'none';
          
          // 필터링된 카드 개수 계산
          const filteredCards = document.querySelectorAll('.card_wrap2 ul li' + filterValue);
          resultCount.textContent = filteredCards.length;
        }
      });
    });
  });

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
    card.style.transitionDelay = `${0.01 * (index % 10)}s`;
    observer.observe(card);
  });

});