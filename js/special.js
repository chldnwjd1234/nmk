document.addEventListener('DOMContentLoaded', () => {
    const total_width = () => {
        const wrap = document.querySelector(".horizontal_section");
        const track = document.querySelector(".track");
        return track.scrollWidth - wrap.clientWidth;
    };

    gsap.to(".track", {
        x: () => -total_width(),
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal_section",
            start: "top top",
            end: () => "+=" + (total_width() + window.innerWidth),
            scrub: true,
            pin: true,
            anticipatePin: 1,
            toggleActions: "play none none reset",
        },
    });
    window.addEventListener("resize", () => ScrollTrigger.refresh());
})