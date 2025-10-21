document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    const header = document.querySelector('header');
    document.querySelector('header').addEventListener('click', () => {
        header.classList.toggle('on');
        document.body.classList.toggle('no_scroll');
    });

    //스크롤 위치를 마지막에 어디까지 했는지 기억하는 변수
    let lastScrollY = window.scrollY;

    //스크롤 할 때마다 실행되는 이벤트
    window.addEventListener('scroll', () => {
        //지금 현재 스크롤 위치(세로로 얼만큼 내려왔는지) 저장
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            //지금 스크롤이 이전보다 더 아래 -> 즉 사용자가 아래로 내림
            header.style.top = '-80px'
        } else {
            //사용자가 위로 올림
            header.style.top = '0'
        }

        //이번 스크롤 위치를 이전 스크롤 위치로 저장
        lastScrollY = currentScrollY;
    })

    document.querySelectorAll('footer .select_box button').forEach(function (button) {
        button.addEventListener('click', function () {
            this.closest('.select_box').classList.toggle('on');
        });
    });

})

