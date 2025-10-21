document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        disable: false, // aos 끄지 않기 -> 애니메이션 작동하게 두기
        startEvent: 'DOMContentLoaded', // html이 다 불러와지면 바로 aos 시작
        initClassName: 'aos-init', // aos가 준비 됐다는 표시 클래스 (자동 붙음)
        animatedClassName: 'aos-animate', // 애니메이션이 실행될때 붙는 클래스 이름
        useClassNames: false, // html에 data-aos값 그대로 클래스 안붙이기 적용
        disableMutationObserver: false, // 새로생긴 요소도 자동으로 감지해서 애니메이션 적용
        debounceDelay: 50, // 창크기 바꿀때 0.05초 기다렸다가 계산 (너무 자주 안하게)
        throttleDelay: 99, // 스크롤 할때 0.099초 마다 한번씩 체크 (성능 좋게)

    });
})