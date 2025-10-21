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



    // ==================== Showcase stack ====================
    const pin_bg = document.getElementById("pin_bg");
    const photos = gsap.utils.toArray(".ex_card");

    const pinTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".pin_scene",
            start: "top top",
            end: "+=1800",
            pin: true,
            scrub: true,
            anticipatePin: 1,
            toggleActions: "play none none reset",
        },
    });

    pinTl.to(pin_bg, { filter: "blur(12px)", scale: 1.06, duration: 1, ease: "none" }, 0);
    photos.forEach((el, i) => {
        pinTl.add(() => {
            el.style.zIndex = String(100 + i);
            el.classList.add("glitch");
            gsap.delayedCall(0.4, () => el.classList.remove("glitch"));
        }, i * 0.22);
        pinTl.fromTo(
            el,
            { opacity: 0, y: 1080, scale: 0.4, filter: "blur(6px)", rotate: i % 2 ? 4 : -4 },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotate: i % 2 ? 5 : -5, duration: 0.85, ease: "power3.out" },
            i * 0.22
        );
    });
    pinTl.to(".float_wrap", { yPercent: -6, duration: 0.8, ease: "none" }, ">0.1");


    window.addEventListener("resize", () => ScrollTrigger.refresh());
})