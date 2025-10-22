
// 층 탭 클릭 이벤트
const floorTabs = document.querySelectorAll('.floor_tabs .tab');
const artLists = document.querySelectorAll('.artall > li');
const selects = document.querySelectorAll('.dropdown select');
const articles = document.querySelectorAll('.content article');
const infoBoxes = document.querySelectorAll('.content article .info');
const mapUl = document.querySelector('.map_ul');
const mapLis = document.querySelectorAll('.map_ul li');
selects.forEach((select, index) => {
    select.addEventListener('change', () => {
        const selectedValue = select.value; // 선택된 option의 value 값
        console.log('Selected Value:', selectedValue);
        // 모든 아트 리스트 숨기기
        artLists.forEach((art, i) => {
            articles[i].classList.remove('active');
            infoBoxes[i].classList.remove('active');
        });
        //content11, content12, ...
        // 선택된 값과 일치하는 아트만 표시
        let subIndex = null; //서브인덱스는 아티클의 자식 info 박스 선택용
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
        //articles 자식 info 박스가 subIndex와 맞춰 info active 추가
        if (subIndex !== null) {
            const infoBoxesInArticle = articles[index].querySelectorAll('.info');
            infoBoxesInArticle.forEach((infoBox, i) => {
                infoBox.classList.remove('active');
                if (i === subIndex) {
                    infoBox.classList.add('active');
                }
            });
        }
    });
});
infoBoxes.forEach((info, index) => {
    info.addEventListener('click', (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지  
        // 모든 info 박스 숨기기
        infoBoxes.forEach((box) => {
            box.classList.remove('active');
        });
        // 클릭된 info 박스만 표시
        info.classList.add('active');

    });
})

floorTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // 모든 아트 리스트 숨기기
        artLists.forEach((art, i) => {
            artLists[i].classList.remove('active');
            floorTabs[i].classList.remove('active');
            selects[i].classList.remove('active');
            articles[i].classList.remove('active');
            infoBoxes[i].classList.remove('active');
        });

        // 선택된 층의 아트만 표시
        artLists[index].classList.add('active');
        tab.classList.add('active');
        selects[index].classList.add('active');
        articles[index].classList.add('active');
        articles[index].querySelector('.info').classList.add('active');
    });
});

