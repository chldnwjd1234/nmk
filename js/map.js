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
const mapFloors = document.querySelectorAll('.map_right .floor > li');
const mapImages = document.querySelectorAll('.map_right .floor > li .img_box li');
const svgItems = document.querySelectorAll('.map_right .product_svg li');

// ============================
// 🎨 SVG Path 애니메이션 함수 (단순 라인만)
// ============================
function animateSVGPath(svgElement) {
  const svg = svgElement.querySelector('svg');
  if (!svg) return;
  
  // animated-line 클래스만 애니메이션
  const path = svg.querySelector('.animated-line');
  if (!path) return;

  const length = path.getTotalLength();

  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.style.transition = 'none';

  requestAnimationFrame(() => {
    path.style.transition = 'stroke-dashoffset 0.5s linear';
    path.style.strokeDashoffset = '0';
  });
}

// ============================
// 🧭 select 변경 시 콘텐츠 + 지도 교체
// ============================
selects.forEach((select, index) => {
    select.addEventListener('change', () => {
        const val = select.value;

        articles.forEach(a => a.classList.remove('active'));
        infoBoxes.forEach(i => i.classList.remove('active'));
        articles[index].classList.add('active');

        const infos = articles[index].querySelectorAll('.info');
        infos.forEach((info, i) => {
            info.classList.toggle('active', val.endsWith((i + 1).toString()));
        });

        updateMapBySelect(val);
    });
});

// ============================
// 🗺️ 지도 표시 변경 함수 (반응형 애니메이션 추가)
// ============================
function updateMapBySelect(value) {
    const currentMap = document.querySelector('.map_right .floor > li .img_box li.active');
    
    if (currentMap) {
        currentMap.style.transition = 'opacity 0.3s ease-out';
        currentMap.style.opacity = '0';
        
        setTimeout(() => {
            changeMap(value);
        }, 300);
    } else {
        changeMap(value);
    }
}

// 지도 교체 함수
function changeMap(value) {
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
        targetMaps[mapIndex].style.opacity = '0';
        targetMaps[mapIndex].style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            targetMaps[mapIndex].style.opacity = '1';
        }, 50);
    }
}

// ============================
// 🏢 층 탭 전환 (반응형 애니메이션 추가)
// ============================
floorTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        const currentFloor = document.querySelector('.map_right .floor > li.active');
        
        if (currentFloor) {
            currentFloor.style.transition = 'opacity 0.3s ease-out';
            currentFloor.style.opacity = '0';
            
            setTimeout(() => {
                updateFloorContent(index);
            }, 300);
        } else {
            updateFloorContent(index);
        }
    });
});

// 층 콘텐츠 업데이트 함수
function updateFloorContent(index) {
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
    if (firstMap) {
        firstMap.classList.add('active');
    }
    
    const newFloor = mapFloors[index];
    if (newFloor) {
        newFloor.style.opacity = '0';
        newFloor.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            newFloor.style.opacity = '1';
        }, 50);
    }
}

// ============================
// 🖼️ Highlighted Artifact 클릭 → 해당 SVG 표시
// ============================
const artImgsGroup = document.querySelectorAll(".highlighted_artifact .artall > li");
const svgFloors = document.querySelectorAll(".map_right .product_svg");

svgFloors.forEach(floor => {
    const svgs = floor.querySelectorAll("li");
    svgs.forEach(svg => (svg.style.display = "none"));
});

artImgsGroup.forEach((floorGroup, floorIndex) => {
    const imgs = floorGroup.querySelectorAll("img");
    const svgItems = svgFloors[floorIndex]?.querySelectorAll("li") || [];

    imgs.forEach((img, artIndex) => {
        img.addEventListener("click", () => {
            svgItems.forEach(svg => (svg.style.display = "none"));
            if (svgItems[artIndex]) {
                svgItems[artIndex].style.display = "block";
                animateSVGPath(svgItems[artIndex]);
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

/* GPS 토글 */
const gpsToggle = document.getElementById('gps');
const gpsMarker = document.querySelector('.gps_marker');

if (gpsToggle && gpsMarker) {
    gpsToggle.addEventListener('change', () => {
        if (gpsToggle.checked) {
            gpsMarker.classList.add('on');
        } else {
            gpsMarker.classList.remove('on');
        }
    });
}