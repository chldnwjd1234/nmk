document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 🌸 flower 회전 (기존 코드)
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

    // 🎴 카드 순차 등장 (왼쪽에서 오른쪽으로, 역스크롤 시 왼쪽으로 사라짐)
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
            "-=0.6" // 카드1이 절반쯤 왔을 때 시작
        )
        .fromTo(".card3",
            { opacity: 0, x: -600 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
            "-=0.6" // 카드2가 절반쯤 왔을 때 시작
        );
});