document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        disable: false, // aos를 끄지 않기 -> 애니메이션 작동하게 두기
        startEvent: 'DOMContentLoaded', // html이 다 불러와지면 바로 aos 시작
        initClassName: 'aos-init', // aos가 준비됐다는 표시 클래스(자동 붙음)
        animatedClassName: 'aos-animate', // 애니메이션이 실행될 때 붙는 클래스 이름
        useClassNames: false, // HTML에 data-aos값 그대로 클래스 안 붙이기 적용
        disableMutationObserver: false, // 새로 생긴 요소도 자동으로 감지해서 애니메이션 적용
        debounceDelay: 50, // 창크기 바꿀 때 0.05초 기다렸다가 계산 (너무 자주 안 하게)
        throttleDelay: 99, // 스크롤할 때 0.099초마다 한 번씩 체크 (성능 좋게)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
})