// 페이지 로드 후 실행
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    const sliderContainer = document.querySelector('.slider_container');
    console.log('sliderContainer:', sliderContainer);
    
    if (!sliderContainer) {
        console.error('slider_container를 찾을 수 없습니다!');
        return;
    }
    
    function goToSlide(slideNum) {
        const slide1 = document.querySelector('.slide');
        const slide2 = document.querySelector('.slide2');
        const dots = document.querySelectorAll('.dot');
        
        if (!slide1 || !slide2 || !dots.length) {
            console.log('슬라이드 요소를 찾을 수 없음');
            return;
        }
        
        if (slideNum === 1) {
            slide1.classList.add('active');
            slide2.classList.remove('active');
            if (dots.length >= 2) {
                dots[0].classList.add('active');
                dots[1].classList.remove('active');
            }
        } else {
            slide1.classList.remove('active');
            slide2.classList.add('active');
            if (dots.length >= 2) {
                dots[0].classList.remove('active');
                dots[1].classList.add('active');
            }
        }
    }
    
    // HTML에서 호출 가능하도록 전역으로 설정
    window.goToSlide = goToSlide;
    
    function nextSlide() {
        goToSlide(2);
    }
    
    function prevSlide() {
        goToSlide(1);
    }
    
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    
    // 스와이프 기능
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleSwipe() {
        console.log('스와이프 감지:', touchStartX, touchEndX);
        if (touchEndX < touchStartX - 50) {
            console.log('왼쪽 스와이프 - 다음 슬라이드');
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            console.log('오른쪽 스와이프 - 이전 슬라이드');
            prevSlide();
        }
    }
    
    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        console.log('터치 시작:', touchStartX);
    });
    
    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        console.log('터치 끝:', touchEndX);
        handleSwipe();
    });
    
    console.log('스와이프 이벤트 리스너 등록 완료');
});