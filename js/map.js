// 층 탭 클릭 이벤트
const floorTabs = document.querySelectorAll('.floor_tabs .tab');
const artLists = document.querySelectorAll('.artall > li');
const selects = document.querySelectorAll('.dropdown select');
const articles = document.querySelectorAll('.content article');
const infoBoxes = document.querySelectorAll('.content article .info');
const mapBoxes = document.querySelectorAll('.map_right ul');
const mapLis = document.querySelectorAll('.map_right ul li');

// select 변경 이벤트
selects.forEach((select, index) => {
    select.addEventListener('change', () => {
        const selectedValue = select.value;
        console.log('Selected Value:', selectedValue);
        
        // 모든 아트 리스트 숨기기
        artLists.forEach((art, i) => {
            articles[i].classList.remove('active');
            infoBoxes[i].classList.remove('active');
        });
        
        let subIndex = null;
        switch (selectedValue) {
            case 'content11': subIndex = 0; break;
            case 'content12': subIndex = 1; break;
            case 'content21': subIndex = 0; break;
            case 'content22': subIndex = 1; break;
            case 'content23': subIndex = 2; break;
            case 'content31': subIndex = 0; break;
            case 'content32': subIndex = 1; break;
        }
        
        articles[index].classList.add('active');
        
        // info 박스 활성화
        if (subIndex !== null) {
            const infoBoxesInArticle = articles[index].querySelectorAll('.info');
            infoBoxesInArticle.forEach((infoBox, i) => {
                infoBox.classList.remove('active');
                if (i === subIndex) {
                    infoBox.classList.add('active');
                }
            });
        }
        
        // ✅ 지도 변경 함수 호출
        changeMap(selectedValue);
    });
});

// ✅ 지도 변경 함수
function changeMap(contentValue) {
    // 모든 지도 li 숨기기
    mapLis.forEach(li => li.classList.remove('active'));
    
    // 선택된 content에 맞는 지도 표시
    let mapBoxIndex = 0; // img_box1, img_box2, img_box3
    let liIndex = 0;      // li 번호 (0부터 시작)
    
    switch(contentValue) {
        case 'content11':
            mapBoxIndex = 0; // img_box1
            liIndex = 0;     // 첫 번째 li
            break;
        case 'content12':
            mapBoxIndex = 0; // img_box1
            liIndex = 1;     // 두 번째 li
            break;
        case 'content21':
            mapBoxIndex = 1; // img_box2
            liIndex = 0;     // 첫 번째 li
            break;
        case 'content22':
            mapBoxIndex = 1; // img_box2
            liIndex = 1;     // 두 번째 li
            break;
        case 'content23':
            mapBoxIndex = 1; // img_box2
            liIndex = 2;     // 세 번째 li
            break;
        case 'content31':
            mapBoxIndex = 2; // img_box3
            liIndex = 0;     // 첫 번째 li
            break;
        case 'content32':
            mapBoxIndex = 2; // img_box3
            liIndex = 1;     // 두 번째 li
            break;
    }
    
    // 선택된 지도 박스의 특정 li만 활성화
    const targetMapBox = mapBoxes[mapBoxIndex];
    const targetLi = targetMapBox.querySelectorAll('li')[liIndex];
    
    if (targetLi) {
        targetLi.classList.add('active');
    }
}

infoBoxes.forEach((info, index) => {
    info.addEventListener('click', (e) => {
        e.stopPropagation();
        
        infoBoxes.forEach((box) => {
            box.classList.remove('active');
        });
        
        info.classList.add('active');
    });
});

// 층 탭 클릭 이벤트
floorTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // 모든 것 초기화
        artLists.forEach((art, i) => {
            artLists[i].classList.remove('active');
            floorTabs[i].classList.remove('active');
            selects[i].classList.remove('active');
            articles[i].classList.remove('active');
            infoBoxes[i].classList.remove('active');
            mapBoxes[i].classList.remove('active'); // ✅ 지도 박스도 초기화
        });
        
        // 모든 지도 li 숨기기
        mapLis.forEach(li => li.classList.remove('active'));
        
        // 선택된 층 활성화
        artLists[index].classList.add('active');
        tab.classList.add('active');
        selects[index].classList.add('active');
        articles[index].classList.add('active');
        articles[index].querySelector('.info').classList.add('active');
        mapBoxes[index].classList.add('active'); // ✅ 해당 층의 지도 박스 활성화
        
        // ✅ 해당 층의 첫 번째 지도 표시
        const firstLi = mapBoxes[index].querySelector('li:first-child');
        if (firstLi) {
            firstLi.classList.add('active');
        }
    });
});

