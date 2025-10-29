document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header')
    
    const hamBtn = document.querySelector('.ham');

    // 햄버거 메뉴 토글
    if (hamBtn) {
        hamBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            header.classList.toggle('on');
            document.body.classList.toggle('no_scroll');
        });
    }

    // 서브메뉴 토글 - 버튼 클릭
    const toggleBtns = document.querySelectorAll('.toggle_btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const parentLi = this.closest('li');
            parentLi.classList.toggle('open');
        });
    });

    // 서브메뉴 토글 - 글씨 클릭
    const hasSubLinks = document.querySelectorAll('.mobile_gnb > li.has_sub > a');
    hasSubLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const parentLi = this.closest('li');
            parentLi.classList.toggle('open');
        });
    });

    // 모바일 메뉴 영역 클릭시 닫히지 않게
    const mobileMenu = document.querySelector('.mobile_menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // 배경 클릭시 메뉴 닫기
    document.addEventListener('click', (e) => {
        if (header.classList.contains('on') && !e.target.closest('header')) {
            header.classList.remove('on');
            document.body.classList.remove('no_scroll');
        }
    });

    // X 버튼 클릭시 메뉴 닫기
    const mobileClose = document.querySelector('.mobile_close');
    if (mobileClose) {
        mobileClose.addEventListener('click', (e) => {
            e.stopPropagation();
            header.classList.remove('on');
            document.body.classList.remove('no_scroll');
        });
    };

    // 오버레이 클릭시 메뉴 닫기
    const mobileOverlay = document.querySelector('.mobile_overlay');
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            header.classList.remove('on');
            document.body.classList.remove('no_scroll');
        });
    }

    // 스크롤 이벤트
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            header.style.top = '-80px'
        } else {
            header.style.top = '0'
        }
        lastScrollY = currentScrollY;
    });

    // 푸터 select box
    document.querySelectorAll('footer .select_box button').forEach(function (button) {
        button.addEventListener('click', function () {
            this.closest('.select_box').classList.toggle('on');
        });
    });
});