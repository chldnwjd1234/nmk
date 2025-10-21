// GSAP ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// 페이지 로드 후 실행
window.addEventListener('DOMContentLoaded', function() {
    
    // flower2 스크롤 애니메이션
    gsap.to('.flower2', {
        rotation: 40,  // 시계방향 40도
        scrollTrigger: {
            trigger: '.Welcome',  // 트리거 요소
            start: 'top bottom',  // Welcome 섹션 상단이 화면 하단에 닿을 때 시작
            end: 'bottom top',    // Welcome 섹션 하단이 화면 상단에 닿을 때 끝
            scrub: 1,  // 스크롤과 동기화 (1은 1초 지연)
            // markers: true  // 디버깅용 (나중에 삭제)
        }
    });
    
    // flower3 스크롤 애니메이션
    gsap.to('.flower3', {
        rotation: 40,
        scrollTrigger: {
            trigger: '.Welcome',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
});