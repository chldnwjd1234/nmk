let hasAnimated = false;

// 화면 크기 체크 함수
function isMobile() {
    return window.innerWidth <= 1024;
}

// 스크롤 이벤트 리스너 (1024px 초과일 때만)
window.addEventListener('scroll', () => {
    if (!isMobile() && !hasAnimated && window.scrollY > 50) {
        console.log('스크롤 감지 - 애니메이션 시작');
        hasAnimated = true;
        startLoadingAnimation();
    }
});

// 클릭 이벤트 리스너 (1024px 이하일 때만)
document.getElementById('loading_screen').addEventListener('click', (e) => {
    // 스킵 버튼 클릭 시에는 반응하지 않음
    if (e.target.id === 'skip_button') return;
    
    if (isMobile() && !hasAnimated) {
        console.log('클릭 감지 - 애니메이션 시작');
        hasAnimated = true;
        startLoadingAnimation();
    }
});

// 스킵 버튼 클릭 이벤트
document.getElementById('skip_button').addEventListener('click', () => {
    console.log('스킵 버튼 클릭 - 즉시 이동');
    location.href = 'html/main.html';
});

function startLoadingAnimation() {
    console.log('애니메이션 시작');

    const doorLeft = document.querySelector('.door_left');
    const doorRight = document.querySelector('.door_right');
    const logo = document.querySelector('.logo');
    const loadingScreen = document.getElementById('loading_screen');

<<<<<<< HEAD
    // console.log('요소들:', doorLeft, doorRight, logo, loadingScreen);

=======
>>>>>>> origin/index
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
<<<<<<< HEAD
        // loadingScreen.style.display = 'none';
    }, 2000);
    setTimeout(() => {
        location.href = '/html/main.html';
=======
    }, 1200);

    setTimeout(() => {
        location.href = 'html/main.html';
>>>>>>> origin/index
    }, 2800);
}