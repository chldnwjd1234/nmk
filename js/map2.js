// ============================
// 🏛 NMK Museum Map JS (HTML 구조 완전 대응)
// ============================

// 층 탭, 선택, 설명, 지도, 아트리스트 등 선택
const floorTabs = document.querySelectorAll('.floor_tabs .tab');
const artLists = document.querySelectorAll('.highlighted_artifact .artall > li');
const selects = document.querySelectorAll('.dropdown select');
const articles = document.querySelectorAll('.content article');
const infoBoxes = document.querySelectorAll('.content article .info');

// ✅ 지도 관련 요소
const mapFloors = document.querySelectorAll('.map_right .floor > li');
const mapImages = document.querySelectorAll('.map_right .floor > li .img_box li');
const svgItems = document.querySelectorAll('.map_right .product_svg li');

// ============================
// 🎨 SVG Path 애니메이션 함수 (정상 작동 버전)
// ============================

// path 길이 기반으로 dash 초기화 + 애니메이션
// ============================
// 🎯 SVG Path 애니메이션 (왼→오른쪽, 깜빡임 제거)
// ============================

function animateSVGPath(svgElement) {
    const svg = svgElement.querySelector('svg');
    if (!svg) return;

    const path = svg.querySelector('path');
    if (!path) return;

    const length = path.getTotalLength();

    // fill="none" 및 선 초기화
    path.style.fill = 'none';
    path.style.stroke = '#9F140B';
    path.style.strokeWidth = '2px';
    path.style.vectorEffect = 'non-scaling-stroke';
    path.style.shapeRendering = 'geometricPrecision';

    // 💡 왼쪽 → 오른쪽 방향 설정 (기본 방향 유지)
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // ⚡ 브라우저 렌더링 안정화 (두께 변화 방지)
    path.style.transition = 'none';
    path.getBoundingClientRect(); // 강제 리플로우

    // 🎬 1프레임 뒤에 실행 (깜빡임 제거)
    requestAnimationFrame(() => {
        path.style.transition = 'stroke-dashoffset 1.6s ease-out';
        path.style.strokeDashoffset = 0;
    });
}




// ============================
// 🗺️ 지도 표시 변경 함수
// ============================
function updateMapBySelect(value) {
    mapImages.forEach(img => img.classList.remove('active'));
    svgItems.forEach(svg => svg.classList.remove('active'));

    let floorIndex = 0, mapIndex = 0;

    switch (value) {
        case 'content11': floorIndex = 0; mapIndex = 0; break;
        case 'content12': floorIndex = 0; mapIndex = 1; break;
        case 'content21': floorIndex = 1; mapIndex = 0; break;
        case 'content22': floorIndex = 1; mapIndex = 1; break;
        case 'content23': floorIndex = 1; mapIndex = 2; break;
        case 'content31': floorIndex = 2; mapIndex = 0; break;
        case 'content32': floorIndex = 2; mapIndex = 1; break;
    }

    const targetFloor = mapFloors[floorIndex];
    const targetMaps = targetFloor.querySelectorAll('.img_box li');
    if (targetMaps[mapIndex]) {
        targetMaps[mapIndex].classList.add('active');
    }
}

// ============================
// 🏢 층 탭 전환
// ============================
floorTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        const isDesktop = window.innerWidth > 1024;
        const currentFloor = document.querySelector('.map_right .floor > li.active');

        if (isDesktop && currentFloor) {
            currentFloor.style.transition = 'opacity 0.3s ease-out';
            currentFloor.style.opacity = '0';

            setTimeout(() => updateFloorContent(index), 300);
        } else {
            updateFloorContent(index);
        }
    });
});

function updateFloorContent(index) {
    const isDesktop = window.innerWidth > 1024;

    floorTabs.forEach(t => t.classList.remove('active'));
    artLists.forEach(a => a.classList.remove('active'));
    selects.forEach(s => s.classList.remove('active'));
    articles.forEach(a => a.classList.remove('active'));
    infoBoxes.forEach(i => i.classList.remove('active'));
    mapFloors.forEach(f => f.classList.remove('active'));
    mapImages.forEach(li => li.classList.remove('active'));
    svgItems.forEach(svg => svg.classList.remove('active'));

    floorTabs[index].classList.add('active');
    artLists[index].classList.add('active');
    selects[index].classList.add('active');
    articles[index].classList.add('active');
    articles[index].querySelector('.info').classList.add('active');
    mapFloors[index].classList.add('active');

    const firstMap = mapFloors[index].querySelector('.img_box li:first-child');
    if (firstMap) firstMap.classList.add('active');

    if (isDesktop) {
        const newFloor = mapFloors[index];
        newFloor.style.opacity = '0';
        newFloor.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => newFloor.style.opacity = '1', 50);
    }
}

// ============================
// 🖼️ Highlighted Artifact 클릭 → SVG 표시 + 그리기
// ============================
const artImgsGroup = document.querySelectorAll(".highlighted_artifact .artall > li");
const svgFloors = document.querySelectorAll(".map_right .product_svg");

// 모든 SVG 숨김
svgFloors.forEach(floor => {
    const svgs = floor.querySelectorAll("li");
    svgs.forEach(svg => svg.style.display = "none");
});

artImgsGroup.forEach((floorGroup, floorIndex) => {
    const imgs = floorGroup.querySelectorAll("img");
    const svgList = svgFloors[floorIndex]?.querySelectorAll("li") || [];

    imgs.forEach((img, artIndex) => {
        img.addEventListener("click", () => {
            svgList.forEach(svg => svg.style.display = "none");
            const target = svgList[artIndex];

            if (target) {
                target.style.display = "block";

                requestAnimationFrame(() => animateSVGPath(target));
            }
        });
    });
});

// ============================
// 🚀 초기 로드 시 애니메이션
// ============================
window.addEventListener("DOMContentLoaded", () => {
    const leftSection = document.querySelector('.space .left');
    const mapRight = document.querySelector('.space .map_right');

    if (window.innerWidth > 1024) {
        if (leftSection) {
            leftSection.style.opacity = '0';
            leftSection.style.transform = 'translateY(30px)';
        }
        if (mapRight) {
            mapRight.style.opacity = '0';
            mapRight.style.transform = 'translateY(30px)';
        }

        setTimeout(() => {
            if (leftSection) {
                leftSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                leftSection.style.opacity = '1';
                leftSection.style.transform = 'translateY(0)';
            }
        }, 100);

        setTimeout(() => {
            if (mapRight) {
                mapRight.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                mapRight.style.opacity = '1';
                mapRight.style.transform = 'translateY(0)';
            }
        }, 600);
    }

    floorTabs[0].click();
});

// ============================
// 📍 GPS 토글 (위치 표시)
// ============================
const gpsToggle = document.getElementById('gps');
const gpsMarker = document.querySelector('.gps_marker');

if (gpsToggle && gpsMarker) {
    gpsToggle.addEventListener('change', () => {
        gpsMarker.classList.toggle('on', gpsToggle.checked);
    });
}



document.addEventListener("DOMContentLoaded", () => {
    const paths = document.querySelectorAll(".map_right .product_svg li svg path");

    paths.forEach((path) => {
        const length = path.getTotalLength();

        // 초기 상태
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.transition = "none";
        path.style.strokeWidth = "2px";
        path.style.stroke = "#9F140B";
        path.style.fill = "none";

        // 강제 리플로우
        path.getBoundingClientRect();

        // 애니메이션 실행
        requestAnimationFrame(() => {
            path.style.transition = "stroke-dashoffset 1.5s linear";
            path.style.strokeDashoffset = "0";
        });
    });
});
