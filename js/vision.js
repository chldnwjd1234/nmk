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
            scrub: 1, // ✅ 스크롤 진행률 기반 (자동 역방향 포함)
        }
    });

    // 순차 등장
    textTl
        .from(".txt_box .big", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" })
        .from(".txt_box .living_space", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "+=0.2")
        .from(".txt_box .bottom p", {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15 // ✅ p 세 개 순차 fade-in
        }, "+=0.2");
});
