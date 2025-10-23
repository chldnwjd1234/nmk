let hasAnimated = false;

// 스크롤 이벤트 리스너
window.addEventListener('scroll', () => {
    if (!hasAnimated && window.scrollY > 50) {
        console.log('스크롤 감지 - 애니메이션 시작');
        hasAnimated = true;
        startLoadingAnimation();
    }
});

function startLoadingAnimation() {
    console.log('애니메이션 시작');

    const doorLeft = document.querySelector('.door_left');
    const doorRight = document.querySelector('.door_right');
    const logo = document.querySelector('.logo');
    const loadingScreen = document.getElementById('loading_screen');

    // console.log('요소들:', doorLeft, doorRight, logo, loadingScreen);

    // 1단계: 문 열리기 시작
    doorLeft.classList.add('open');
    doorRight.classList.add('open');

    // 2단계: 로고 페이드인 (문이 열리는 중간 시점)
    setTimeout(() => {
        console.log('로고 표시');
        logo.classList.add('show');
    }, 0);

    // 3단계: 전체 화면 페이드아웃
    setTimeout(() => {
        console.log('페이드아웃 시작');
        loadingScreen.classList.add('fade-out');
        // loadingScreen.style.display = 'none';
    }, 2000);
    setTimeout(() => {
        location.href = '/html/main.html';
    }, 2800);
}