document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

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

    // ✨ 텍스트 순차 fade-in
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
        .from(".txt_box .bottom p", {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15
        }, "+=0.2");

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
        .fromTo(".card1",
            { opacity: 0, x: -200 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        )
        .fromTo(".card2",
            { opacity: 0, x: "-50%", xPercent: -100 },
            { opacity: 1, x: "-50%", xPercent: 0, duration: 0.8, ease: "power2.out" },
            "-=0.6"
        )
        .fromTo(".card3",
            { opacity: 0, x: -600 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
            "-=0.6"
        );

    // 🏛️ Architecture 섹션 애니메이션
    const archTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".Architecture",
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
        }
    });

    archTl
        .fromTo(".Architecture .txt_box",
            { opacity: 0, x: -200 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        )
        .fromTo(".Architecture .architecture_img",
            { opacity: 0, x: 200 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
            "-=0.4"
        );

// 📦 Collection Storage 섹션 애니메이션
const lines = document.querySelectorAll('.Collection_Storage .collection_label ul.line li');
const labels = document.querySelectorAll('.Collection_Storage .collection_label ul.labels li');
const totalSteps = lines.length;

// 초기 상태: 모든 항목의 클래스 제거
lines.forEach(line => {
    line.classList.remove('on', 'animated');
});
labels.forEach(label => {
    label.classList.remove('on', 'animated');
});

ScrollTrigger.create({
    trigger: ".Collection_Storage",
    start: "center center",
    end: `+=${totalSteps * 100}%`,
    pin: true,
    pinSpacing: true,
    scrub: true,
    // markers: true,
    onUpdate: (self) => {
        const progress = self.progress;
        
        // progress가 0에 가까우면 아무것도 활성화하지 않음
        if (progress < 0.01) {
            lines.forEach((line, index) => {
                line.classList.remove('on', 'animated');
                if (labels[index]) {
                    labels[index].classList.remove('on', 'animated');
                }
            });
            return;
        }
        
        const currentIndex = Math.floor(progress * totalSteps);
        
        lines.forEach((line, index) => {
            if (index < currentIndex) {
                line.classList.remove('on');
                line.classList.add('animated');
                if (labels[index]) {
                    labels[index].classList.remove('on');
                    labels[index].classList.add('animated');
                }
            } else if (index === currentIndex && progress < 1) {
                line.classList.add('on');
                line.classList.remove('animated');
                if (labels[index]) {
                    labels[index].classList.add('on');
                    labels[index].classList.remove('animated');
                }
            } else {
                line.classList.remove('on', 'animated');
                if (labels[index]) {
                    labels[index].classList.remove('on', 'animated');
                }
            }
        });
        
        if (progress >= 0.99) {
            lines.forEach((line, index) => {
                line.classList.remove('on');
                line.classList.add('animated');
                if (labels[index]) {
                    labels[index].classList.remove('on');
                    labels[index].classList.add('animated');
                }
            });
        }
    }
});
    // 반응형 대응
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
});