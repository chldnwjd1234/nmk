document.addEventListener('DOMContentLoaded', () => {
    // fade-up 애니메이션
    gsap.utils.toArray(".articles_all article").forEach((el, i) => {
        gsap.from(el, {
            y: 80,              // 아래에서 위로
            opacity: 0,         // 투명 → 보이게
            duration: 1,        // 애니메이션 시간
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // 뷰포트 아래 85% 지점에서 시작
                toggleActions: "play none none reverse",
                once: false,      // true로 하면 1회만 실행
            },
            delay: i * 0.1,     // 살짝 순차 등장 효과
        });
    });
    const total_width = () => {
        const wrap = document.querySelector(".horizontal_section");
        const track = document.querySelector(".track");
        return track.scrollWidth - wrap.clientWidth;
    };

    // matchMedia로 반응형 제어
    ScrollTrigger.matchMedia({

        // ✅ 데스크탑/태블릿 이상 (415px 이상)
        "(min-width: 415px)": function () {
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
                },
            });
        },

        // ✅ 모바일 (414px 이하)
        "(max-width: 414px)": function () {
            // 모바일에서는 pin 효과 제거 (track은 원래대로)
            gsap.set(".track", { clearProps: "all" });
            ScrollTrigger.refresh(); // 레이아웃 새로고침
        }

    });
    window.addEventListener("resize", () => ScrollTrigger.refresh());

    let Recommendedswiper = new Swiper(".Recommended", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
    });

            //SHARE
        document.querySelector('.reserve_btn').addEventListener('click', async (e) => {
            e.preventDefault();
            if (navigator.share) {
                await navigator.share({
                    title: document.title,
                    text: '이 페이지를 공유합니다',
                    url: window.location.href
                });
            } else {
                // 공유 미지원 시 링크 복사 fallback
                await navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!');
            }
        });
})