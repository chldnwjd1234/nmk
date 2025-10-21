document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    window.addEventListener('scroll', () => {
        const topBtn = document.querySelector('.top-btn');
        if (window.scrollY > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    // 클릭 시 부드럽게 맨 위로
    document.querySelector('.top-btn').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const total_width = () => {
        const wrap = document.querySelector(".horizontal_all");
        const track = document.querySelector(".track");
        return track.scrollWidth - wrap.clientWidth;
    };


    gsap.to(".track", {
        x: () => total_width(),
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal_all",
            start: "top top",
            end: () => "+=" + (total_width() + window.innerWidth),
            scrub: true,
            marker: true,
            pin: true,
            anticipatePin: 1,
            toggleActions: "play none none reset",
        },
    });
    window.addEventListener("resize", () => ScrollTrigger.refresh());
})