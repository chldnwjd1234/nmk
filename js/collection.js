  const viewBtns = document.querySelectorAll('.view_btns img');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 모든 버튼 초기화
      viewBtns.forEach(b => {
        b.classList.remove('on');
        if (b.dataset.view === 'grid') b.src = '../asset/img/icon1_off.png';
        if (b.dataset.view === 'list') b.src = '../asset/img/icon2_off.png';
      });

      // 클릭한 버튼 활성화(on 이미지로 변경)
      btn.classList.add('on');
      if (btn.dataset.view === 'grid') btn.src = '../asset/img/icon1_on.png';
      if (btn.dataset.view === 'list') btn.src = '../asset/img/icon2_on.png';
    });
  });