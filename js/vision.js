// 페이지 로드 후 실행
window.addEventListener('DOMContentLoaded', function() {
    
    // flower2 애니메이션
    gsap.to('.flower2', {
        x: 50,  // 오른쪽으로 50px 이동
        y: 30,  // 아래로 30px 이동
        rotation: 10,  // 10도 회전
        duration: 3,  // 3초 동안
        ease: 'power1.inOut',  // 부드러운 움직임
        repeat: -1,  // 무한 반복
        yoyo: true  // 왕복 운동
    });
    
    // flower3 애니메이션 (nth-child(2))
    gsap.to('.Welcome img:nth-child(2)', {
        x: -30,
        y: 50,
        rotation: -15,
        duration: 4,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5  // 0.5초 후 시작
    });
});