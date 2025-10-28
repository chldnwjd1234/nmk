document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelector('header').classList.add('maintop');
    window.addEventListener('scroll', () => {
        const topBtn = document.querySelector('.top-btn');
        const topBtnQr = document.querySelector('.top-btn_qr');

        if (window.scrollY > 0) {
            document.querySelector('header').classList.remove('maintop');
        } else {
            document.querySelector('header').classList.add('maintop');
        }

        if (window.scrollY > 300) {
            topBtn.classList.add('show');
            if (topBtnQr) topBtnQr.classList.add('show');
        } else {
            topBtn.classList.remove('show');
            if (topBtnQr) topBtnQr.classList.remove('show');
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

    // ==================== Museum CTA Animation ====================
    if (window.innerWidth > 1024) {
        // 데스크탑: 초기 슬라이드 애니메이션
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

        // highlight 상단 도달 시 CTA 전환
        const desktopCta = document.querySelector(".museum_cta");
        const mobileCta = document.querySelector(".museum_cta_mobile");

        if (desktopCta && mobileCta) {
            ScrollTrigger.create({
                trigger: ".highlight",
                start: "top top",
                end: "bottom bottom",
                invalidateOnRefresh: false,
                onEnter: () => {
                    desktopCta.classList.add("hide");
                    mobileCta.classList.add("on");
                },
                onLeaveBack: () => {
                    desktopCta.classList.remove("hide");
                    mobileCta.classList.remove("on");
                }
            });
        }

    } else {
        // 1024px 이하: highlight 도달 시 하단 fixed
        const mobileCta = document.querySelector(".museum_cta_mobile");

        if (mobileCta) {
            ScrollTrigger.create({
                trigger: ".highlight",
                start: "top 80%",
                end: "bottom top",
                onEnter: () => {
                    mobileCta.classList.add("on");
                },
                onLeaveBack: () => {
                    mobileCta.classList.remove("on");
                }
            });
        }
    }
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
                scrub: 1,
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
    if (window.innerWidth >= 1025) {
        const total_width = () => {
            const wrap = document.querySelector(".horizontal_all");
            const track = document.querySelector(".track");
            return track.scrollWidth - wrap.clientWidth;
        };

        const visionCards = document.querySelectorAll(".v_card .card_item");


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
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const totalCards = visionCards.length;

                    visionCards.forEach((card, index) => {
                        const cardStart = index / totalCards;
                        const cardEnd = (index + 1) / totalCards;
                        const cardMid = (cardStart + cardEnd) / 2;

                        const distanceFromCenter = Math.abs(progress - cardMid);
                        const threshold = 0.2;

                        if (distanceFromCenter < threshold) {
                            card.classList.add('active');
                        } else {
                            card.classList.remove('active');
                        }
                    });
                }
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
    if (window.innerWidth > 1024) {
        // 데스크탑: 스크롤 애니메이션
        const mudsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".muds",
                start: "top top",
                end: "+=4000",
                scrub: 2,
                pin: true,
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

    } else {
        // 1024px 이하: 쇽쇽 애니메이션
        ScrollTrigger.create({
            trigger: ".muds",
            start: "top 70%",
            once: true,
            onEnter: () => {
                const mobileTimeline = gsap.timeline();

                mobileTimeline
                    .to(".muds_content", {
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out"
                    })
                    .to(".muds_bg .title", {
                        opacity: 1,
                        x: "0%",
                        duration: 0.8,
                        ease: "power2.out"
                    }, "-=0.3")
                    .to(".cloud_bg", {
                        opacity: 1,
                        x: "0%",
                        duration: 0.8,
                        ease: "power2.out"
                    }, "-=0.5")
                    .to(".content_text", {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out"
                    }, "-=0.4");
            }
        });
    }

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

    // ==================== 반응형 1024 js ====================
    if (window.innerWidth <= 1024 && window.innerWidth > 412) {
        // vision 카드 펼치기
        ScrollTrigger.create({
            trigger: ".vision .horizontal_all",
            start: "top 40%",
            onEnter: () => {
                setTimeout(() => {
                    document.querySelector(".v_card").classList.add("spread");
                }, 300);
            },
            onLeaveBack: () => {
                document.querySelector(".v_card").classList.remove("spread");
            }
        });

        // 카드 클릭 이벤트
        const cardItems = document.querySelectorAll('.v_card .card_item');
        cardItems.forEach((card, index) => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function () {
                // 모든 카드 원상복구
                cardItems.forEach((item, idx) => {
                    item.classList.remove('active');
                    item.style.transform = ''; // 인라인 스타일 제거하여 원래 CSS로 돌아감
                    item.style.zIndex = '';
                });

                // 클릭한 카드만 확대 - 현재 위치에서 scale만 적용
                this.classList.add('active');

                // 각 카드의 원래 transform 값을 가져와서 scale만 추가
                const currentTransform = window.getComputedStyle(this).transform;

                if (index === 0) {
                    // 첫 번째 카드 (가운데 위)
                    this.style.transform = 'translate(-50%, 0) scale(1.35)';
                } else if (index === 1) {
                    // 두 번째 카드 (오른쪽)
                    this.style.transform = 'translate(0, 0) scale(1.35)';
                } else if (index === 2) {
                    // 세 번째 카드 (왼쪽)
                    this.style.transform = 'translate(0, 0) scale(1.35)';
                }

                this.style.zIndex = '100';
            });
        });
    }

    // ==================== 모바일 Vision 슬라이더 ====================
    setTimeout(() => {
        const cards = document.querySelectorAll('.mobile_slider_wrap .mobile_card');
        const slider = document.querySelector('.mobile_slider_wrap .mobile_slider');

        console.log('카드 개수:', cards.length);
        console.log('슬라이더:', slider);

        if (cards.length === 0 || !slider) return;

        let currentIndex = 0;
        let startX = 0;

        function updateSlider(newIndex) {
            if (newIndex < 0) newIndex = cards.length - 1;
            if (newIndex >= cards.length) newIndex = 0;

            currentIndex = newIndex;
            console.log('카드 전환:', currentIndex);

            cards.forEach(card => card.classList.remove('active'));
            cards[currentIndex].classList.add('active');

            cards.forEach((card, index) => {
                if (index === currentIndex) {
                    card.style.transform = 'translate(-50%, -50%) scale(1)';
                    card.style.zIndex = '3';
                    card.style.opacity = '1';
                } else if (index === (currentIndex + 1) % cards.length) {
                    card.style.transform = 'translate(-10%, -50%) scale(0.75)';
                    card.style.zIndex = '1';
                    card.style.opacity = '0.8';
                } else {
                    card.style.transform = 'translate(-90%, -50%) scale(0.75)';
                    card.style.zIndex = '1';
                    card.style.opacity = '0.8';
                }
            });
        }

        // 마우스 드래그
        slider.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            console.log('마우스 다운:', startX);
        });

        slider.addEventListener('mouseup', (e) => {
            const endX = e.clientX;
            const diff = startX - endX;
            console.log('마우스 업:', endX, '차이:', diff);

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    updateSlider(currentIndex + 1);
                } else {
                    updateSlider(currentIndex - 1);
                }
            }
        });

        // 터치 이벤트
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    updateSlider(currentIndex + 1);
                } else {
                    updateSlider(currentIndex - 1);
                }
            }
        });

        updateSlider(0);
    }, 100);

    window.addEventListener("resize", () => ScrollTrigger.refresh());
});