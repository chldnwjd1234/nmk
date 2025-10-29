document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ✅ 모든 애니메이션을 한 함수로 묶기
    function createAnimations() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // 완전 리셋

        // 🌸 flower 회전
        const flowerTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".Welcome",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });
        flowerTl.to(".flower2", { rotation: 30 }, 0)
            .to(".flower3", { rotation: 40 }, 0);

        // 🌙 moon 반응형 radius
        let radiusValue;
        if (window.innerWidth <= 414) {
            radiusValue = "0 0 800px 800px";
        } else if (window.innerWidth <= 1024) {
            radiusValue = "0 0 1200px 1200px";
        } else {
            radiusValue = "0 0 2000px 2000px";
        }
        gsap.fromTo(".moon",
            {
                filter: "saturate(0.5) brightness(1.2)"  // 시작: 연하고 밝게
            },
            {
                borderRadius: radiusValue,
                filter: "saturate(1.5) brightness(0.8)",  // 끝: 채도 높이고 어둡게
                scrollTrigger: {
                    trigger: ".moon",
                    start: "top 20%",
                    end: "bottom top",
                    scrub: 1,
                }
            }
        );

        // ✨ 텍스트 fade-in
        const textTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".Welcome",
                start: "top 80%",
                end: "bottom bottom",
                scrub: 1,
            }
        });
        textTl
            .from(".txt_box .big", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" })
            .from(".txt_box .living_space", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "+=0.2")
            .from(".txt_box .bottom p", { opacity: 0, y: 30, duration: 0.6, ease: "power2.out", stagger: 0.15 }, "+=0.2");

        // 🎴 카드 순차 등장
        const cardTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".visions",
                start: "top 80%",
                end: "bottom bottom",
                scrub: 1,
            }
        });
        cardTl
            .fromTo(".card1", { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
            .fromTo(".card2", { opacity: 0, x: "-50%", xPercent: -100 }, { opacity: 1, x: "-50%", xPercent: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
            .fromTo(".card3", { opacity: 0, x: -600 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

        // 🏛️ Architecture 섹션
        const archTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".Architecture",
                start: "top 80%",
                end: "bottom bottom",
                scrub: 1,
            }
        });
        archTl
            .fromTo(".Architecture .txt_box", { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
            .fromTo(".Architecture .architecture_img", { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");

        // 🧱 Collection Storage
        initCollectionStorage();

        ScrollTrigger.refresh(); // 새로 생성된 트리거 반영
    }

    // ✅ Collection_Storage 부분 따로 함수화
    function initCollectionStorage() {
        const lines = document.querySelectorAll('.Collection_Storage .collection_label ul.line li');
        const labels = document.querySelectorAll('.Collection_Storage .collection_label ul.labels li');
        const totalSteps = lines.length;
        lines.forEach(l => l.classList.remove('on', 'animated'));
        labels.forEach(l => l.classList.remove('on', 'animated'));

        const isMobile = window.innerWidth <= 414;

        // 🎨 muk.svg 애니메이션 추가 (모바일/데스크탑 공통)
        gsap.fromTo(".Collection_Storage .bg img",
            {
                x: -200,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".Collection_Storage",
                    start: "top 20%",      // 변경: 80% → 20% (더 늦게 시작)
                    end: "center center",   // 변경: top 50% → center center (첫 번째 원이 나올 즈음 완료)
                    scrub: 1,
                }
            }
        );

        if (isMobile) {
            // 모바일에서는 Collection Storage의 ScrollTrigger를 생성하지 않음
            return;
        } else {
            ScrollTrigger.create({
                trigger: ".Collection_Storage",
                start: "center center",
                end: `+=${totalSteps * 100}%`,
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const currentIndex = Math.floor(progress * totalSteps);
                    lines.forEach((line, index) => {
                        if (index < currentIndex) {
                            line.classList.add('animated'); line.classList.remove('on');
                            labels[index]?.classList.add('animated'); labels[index]?.classList.remove('on');
                        } else if (index === currentIndex) {
                            line.classList.add('on'); line.classList.remove('animated');
                            labels[index]?.classList.add('on'); labels[index]?.classList.remove('animated');
                        } else {
                            line.classList.remove('on', 'animated');
                            labels[index]?.classList.remove('on', 'animated');
                        }
                    });
                }
            });
        }
    }

    // ✅ 초기 실행
    createAnimations();

    // ✅ 리사이즈 시 페이지 새로고침
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            location.reload(); // 페이지 새로고침
        }, 400);
    });
});