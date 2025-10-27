// ============================
// 🏛 NMK Museum Map JS (HTML 구조 완전 대응)
// ============================

// 층 탭, 선택, 설명, 지도, 아트리스트 등 선택
const floorTabs = document.querySelectorAll('.floor_tabs .tab');
const artLists = document.querySelectorAll('.highlighted_artifact .artall > li');
const selects = document.querySelectorAll('.dropdown select');
const articles = document.querySelectorAll('.content article');
const infoBoxes = document.querySelectorAll('.content article .info');

// ✅ 지도 관련 요소 (층 기준)
const mapFloors = document.querySelectorAll('.map_right .floor > li'); // f1, f2, f3
const mapImages = document.querySelectorAll('.map_right .floor > li .img_box li'); // 지도 이미지 li
const svgItems = document.querySelectorAll('.map_right .product_svg li'); // SVG 전체

// ============================
// 🎨 SVG Path 애니메이션 함수
// ============================
function animateSVGPath(svgElement) {
  const svg = svgElement.querySelector('svg');
  if (!svg) return;
  const path = svg.querySelector('path');
  if (!path) return;

  const length = path.getTotalLength();
  const isReverse = svg.dataset.direction === "reverse"; // ✅ 방향 체크

  // 초기 설정
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = isReverse ? -length : length; // ✅ 방향 반전
  path.style.transition = 'none';
  path.style.stroke = '#9F140B';
  path.style.strokeWidth = '2';
  path.style.fill = 'none';

  // 애니메이션 실행
  requestAnimationFrame(() => {
    path.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
    path.style.strokeDashoffset = '0';
  });
}

// ============================
// 🧭 select 변경 시 콘텐츠 + 지도 교체
// ============================
selects.forEach((select, index) => {
    select.addEventListener('change', () => {
        const val = select.value;

        // 모든 article, info 초기화
        articles.forEach(a => a.classList.remove('active'));
        infoBoxes.forEach(i => i.classList.remove('active'));
        articles[index].classList.add('active');

        // 세부 info 선택
        const infos = articles[index].querySelectorAll('.info');
        infos.forEach((info, i) => {
            info.classList.toggle('active', val.endsWith((i + 1).toString()));
        });

        // 지도 변경
        updateMapBySelect(val);
    });
});

// ============================
// 🗺️ 지도 표시 변경 함수
// ============================
function updateMapBySelect(value) {
    // 전체 지도/ SVG 숨김
    mapImages.forEach(img => img.classList.remove('active'));
    svgItems.forEach(svg => svg.classList.remove('active'));

    // value에 따라 해당 층, 인덱스 선택
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

    // 해당 층 안의 지도 li 활성화
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
        // 전체 초기화
        floorTabs.forEach(t => t.classList.remove('active'));
        artLists.forEach(a => a.classList.remove('active'));
        selects.forEach(s => s.classList.remove('active'));
        articles.forEach(a => a.classList.remove('active'));
        infoBoxes.forEach(i => i.classList.remove('active'));
        mapFloors.forEach(f => f.classList.remove('active'));
        mapImages.forEach(li => li.classList.remove('active'));
        svgItems.forEach(svg => svg.classList.remove('active'));

        // 클릭한 층만 활성화
        tab.classList.add('active');
        artLists[index].classList.add('active');
        selects[index].classList.add('active');
        articles[index].classList.add('active');
        articles[index].querySelector('.info').classList.add('active');
        mapFloors[index].classList.add('active');

        // 첫 지도 이미지 표시
        const firstMap = mapFloors[index].querySelector('.img_box li:first-child');
        if (firstMap) firstMap.classList.add('active');
    });
});

// ============================
// 🖼️ Highlighted Artifact 클릭 → 해당 SVG 표시
// ============================

const artImgsGroup = document.querySelectorAll(".highlighted_artifact .artall > li"); // 층별 아트리스트 그룹
const svgFloors = document.querySelectorAll(".map_right .product_svg"); // 각 층의 SVG 그룹 컨테이너

// 모든 SVG 숨김
svgFloors.forEach(floor => {
    const svgs = floor.querySelectorAll("li");
    svgs.forEach(svg => (svg.style.display = "none"));
});

// 각 층별 아트리스트 세트에 클릭 이벤트 연결
artImgsGroup.forEach((floorGroup, floorIndex) => {
    const imgs = floorGroup.querySelectorAll("img");
    const svgItems = svgFloors[floorIndex]?.querySelectorAll("li") || [];

    imgs.forEach((img, artIndex) => {
        img.addEventListener("click", () => {
            // 현재 층 SVG만 갱신
            svgItems.forEach(svg => (svg.style.display = "none"));
            if (svgItems[artIndex]) {
                svgItems[artIndex].style.display = "block";
                animateSVGPath(svgItems[artIndex]); // 애니메이션 실행
            }
        });
    });
});

// ============================
// 🚀 초기 로드 시 1층 표시
// ============================
window.addEventListener("DOMContentLoaded", () => {
    floorTabs[0].click();
});

/* gps 토글 클릭시 파란색 위치 표시 */
const gpsToggle = document.getElementById('gps');
const gpsMarker = document.querySelector('.gps_marker');

gpsToggle.addEventListener('change', () => {
    if (gpsToggle.checked) {
        gpsMarker.classList.add('on')
    } else {
        gpsMarker.classList.remove('on');
    }
});