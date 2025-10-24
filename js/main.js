document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelector('header').classList.add('maintop');
    window.addEventListener('scroll', () => {
        const topBtn = document.querySelector('.top-btn');
        if (window.scrollY > 0) {
            document.querySelector('header').classList.remove('maintop');
        } else {
            document.querySelector('header').classList.add('maintop');
        }

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

    // museum_cta 애니메이션 (오른쪽에서 왼쪽으로)
    gsap.fromTo(".museum_cta",
        {
            opacity: 0,
            x: 200
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".museum_cta",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
    // ==================== Highlight Animations ====================
    // 1. 타이틀 먼저
    gsap.fromTo(".highlight .title",
        {
            opacity: 0,
            x: -150
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".highlight .title",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // 2. 사진들 타임라인
    const highlightTL = gsap.timeline({
        scrollTrigger: {
            trigger: ".highlight .contents",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });

    highlightTL
        // 첫 번째 사진
        .fromTo(".highlight .contents .top a:nth-child(2)",
            { opacity: 0, x: -600 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        )

        // 두 번째 사진
        .fromTo(".highlight .contents .top a:nth-child(1)",
            { opacity: 0, x: -150 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
            "-=0.4"
        )

        // 세 번째 사진 - 살짝 늦게
        .fromTo(".highlight .contents .bottom",
            { opacity: 0, x: 150 },
            { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
            "-=0.1"
        );


    // ==================== Ink Effect (backimg) ====================
    gsap.fromTo(".backimg",
        {
            opacity: 0,
            filter: "blur(12px)"
        },
        {
            opacity: 1,
            filter: "blur(0px)",
            scrollTrigger: {
                trigger: ".backimg",
                start: "top 80%",
                end: "bottom 100%",
                scrub: 5,
                markers: false
            }
        }
    );

    // ==================== Vision Title Animation ====================
    gsap.fromTo(".vision .title h2:first-child",
        {
            opacity: 0,
            x: -200
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".vision",
                start: "top 70%",
                toggleActions: "play none none none"
            }
        }
    );

    gsap.fromTo(".vision .title h2:nth-child(2)",
        {
            opacity: 0,
            x: -200
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".vision",
                start: "top 70%",
                toggleActions: "play none none none"
            }
        }
    );

    // ==================== Vision Horizontal Scroll ====================
    if (window.innerWidth >= 1025) {  // 데스크탑에서만
        const total_width = () => {
            const wrap = document.querySelector(".horizontal_all");
            const track = document.querySelector(".track");
            return track.scrollWidth - wrap.clientWidth;
        };

        gsap.to(".track", {
            x: () => -total_width(),
            ease: "expo.out",
            scrollTrigger: {
                trigger: ".horizontal_all",
                start: "top top",
                end: () => "+=" + (total_width() + window.innerWidth),
                scrub: 1.5,
                pin: true,
                anticipatePin: 1,
                toggleActions: "play none none reset",
                invalidateOnRefresh: true
            },
        });

        // SVG Line도 데스크탑에서만
        const svgPath = document.querySelector(".animated_path");
        const pathLength = svgPath.getTotalLength();

        svgPath.style.strokeDasharray = pathLength;
        svgPath.style.strokeDashoffset = pathLength;

        gsap.to(svgPath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal_all",
                start: "top top",
                end: () => "+=" + (total_width() + window.innerWidth),
                scrub: 1,
                pin: false
            }
        });
    }

    // ==================== Exhibition Title Fade ====================
    gsap.to(".exhibition .title", {
        opacity: 0,
        y: -100,
        scrollTrigger: {
            trigger: ".pin_scene",
            start: "top top",
            end: "+=1000",
            scrub: 1,
            markers: false
        }
    });

    // ==================== Showcase stack ====================
    const pin_bg = document.getElementById("pin_bg");
    const photos = gsap.utils.toArray(".ex_card");

    const pinTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".pin_scene",
            start: "top top",
            end: "+=2000",
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

    // ==================== MUDS Cloud Animation ====================
    const mudsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".muds",
            start: "top top",
            end: window.innerWidth <= 1024 ? "+=3000" : "+=4000",
            scrub: 2,
            pin: window.innerWidth >= 1024,  // 조건부 pin
            anticipatePin: 1,
        }
    });

    mudsTimeline
        .fromTo(".cloud_1",
            { left: "-60%", opacity: 0 },
            { left: "0%", opacity: 1, duration: 1.2, ease: "power2.out" }
        )
        .to({}, { duration: 0.2 })

        .fromTo(".cloud_2",
            { right: "-50%", opacity: 0 },
            { right: "0%", opacity: 1, duration: 1.2, ease: "power2.out" }
        )
        .to({}, { duration: 0.2 })

        .fromTo(".cloud_3",
            { left: "-40%", opacity: 0 },
            { left: "0%", opacity: 1, duration: 1.2, ease: "power2.out" }
        )
        .to({}, { duration: 0.2 })

        .fromTo(".cloud_4",
            { right: "-30%", opacity: 0 },
            { right: "0%", opacity: 1, duration: 1.2, ease: "power2.out" }
        )

        .to({}, { duration: 0.8 })

        .to([".cloud_1", ".cloud_3"], {
            left: "-100%",
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut"
        }, "curtain")
        .to([".cloud_2", ".cloud_4"], {
            right: "-100%",
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut"
        }, "curtain")

        .to(".muds_content", {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5")
        .fromTo(".muds_bg .title",
            { opacity: 0, x: "-100%" },
            { opacity: 1, x: "0%", duration: 1, ease: "power2.out" },
            "<"
        )

        .fromTo(".cloud_bg",
            { opacity: 0, x: "100%" },
            { opacity: 1, x: "0%", duration: 1.2, ease: "power2.out" },
            "-=0.3"
        )

        .fromTo(".content_text",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.6"
        )

        .to({}, { duration: 2 });

    // Button underline animation
    const btn = document.querySelector(".discover_btn");
    const underline = btn?.querySelector(".underline");

    if (btn && underline) {
        btn.addEventListener("mouseenter", () => {
            gsap.to(underline, {
                scaleX: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        btn.addEventListener("mouseleave", () => {
            gsap.to(underline, {
                scaleX: 0,
                duration: 0.4,
                ease: "power2.in"
            });
        });
    }

    /* 반응형 1024 js */
    if (window.innerWidth <= 1024) {
        // vision 카드 펼치기
        ScrollTrigger.create({
            trigger: ".vision .horizontal_all",
            start: "top 40%",
            onEnter: () => {
                setTimeout(() => {
                    document.querySelector(".v_card").classList.add("spread");
                }, 900);
            },
            onLeaveBack: () => {
                document.querySelector(".v_card").classList.remove("spread");
            }
        });
    }

    window.addEventListener("resize", () => ScrollTrigger.refresh());
});