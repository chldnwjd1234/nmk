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
// 🎨 SVG Path 애니메이션 함수 (최종 수정)
// ============================
function animateSVGPath(svgElement) {
    const svg = svgElement.querySelector('svg');
    if (!svg) return;
    
    const path = svg.querySelector('path');
    if (!path) return;

    // pathLength를 고정값으로 설정
    path.setAttribute('pathLength', '1');
    
    // 초기 상태
    path.style.strokeDasharray = '1';
    path.style.strokeDashoffset = '1';
    path.style.stroke = '#9F140B';
    path.style.strokeWidth = '2';
    path.style.fill = 'none';
    path.style.transition = 'none';
    
    // 리플로우 강제
    path.getBoundingClientRect();
    
    // 애니메이션 시작
    setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 1.5s linear';
        path.style.strokeDashoffset = '0';
    }, 10);
}

    

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
// 🏢 층 탭 전환 (애니메이션 추가)
// ============================
floorTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // 데스크탑에서만 애니메이션 적용
        const isDesktop = window.innerWidth > 1024;
        
        if (isDesktop) {
            // 현재 활성화된 층 찾기
            const currentFloor = document.querySelector('.map_right .floor > li.active');
            
            if (currentFloor) {
                // 페이드아웃 애니메이션
                currentFloor.style.transition = 'opacity 0.3s ease-out';
                currentFloor.style.opacity = '0';
                
                setTimeout(() => {
                    updateFloorContent(index);
                }, 300);
            } else {
                updateFloorContent(index);
            }
        } else {
            // 모바일에서는 즉시 전환
            updateFloorContent(index);
        }
    });
});

// 층 콘텐츠 업데이트 함수
function updateFloorContent(index) {
    const isDesktop = window.innerWidth > 1024;
    
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
    floorTabs[index].classList.add('active');
    artLists[index].classList.add('active');
    selects[index].classList.add('active');
    articles[index].classList.add('active');
    articles[index].querySelector('.info').classList.add('active');
    mapFloors[index].classList.add('active');

    // 첫 지도 이미지 표시
    const firstMap = mapFloors[index].querySelector('.img_box li:first-child');
    if (firstMap) {
        firstMap.classList.add('active');
    }
    
    // 데스크탑에서 페이드인 애니메이션
    if (isDesktop) {
        const newFloor = mapFloors[index];
        if (newFloor) {
            newFloor.style.opacity = '0';
            newFloor.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(() => {
                newFloor.style.opacity = '1';
            }, 50);
        }
    }
}

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
// 🚀 초기 로드 시 애니메이션
// ============================
window.addEventListener("DOMContentLoaded", () => {
    const leftSection = document.querySelector('.space .left');
    const mapRight = document.querySelector('.space .map_right');
    
    // ✅ 1024px 이상에서만 애니메이션 적용
    if (window.innerWidth > 1024) {
        // 초기 숨김 상태 설정
        if (leftSection) {
            leftSection.style.opacity = '0';
            leftSection.style.transform = 'translateY(30px)';
        }
        
        if (mapRight) {
            mapRight.style.opacity = '0';
            mapRight.style.transform = 'translateY(30px)';
        }
        
        // .left 먼저 나타남 (0.1초 후)
        setTimeout(() => {
            if (leftSection) {
                leftSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                leftSection.style.opacity = '1';
                leftSection.style.transform = 'translateY(0)';
            }
        }, 100);
        
        // .map_right 나중에 나타남 (0.6초 후)
        setTimeout(() => {
            if (mapRight) {
                mapRight.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                mapRight.style.opacity = '1';
                mapRight.style.transform = 'translateY(0)';
            }
        }, 600);
    }
    
    // 1층 탭 활성화
    floorTabs[0].click();
});

/* gps 토글 클릭시 파란색 위치 표시 */
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