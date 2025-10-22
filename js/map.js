
// 층 탭 클릭 이벤트
const floorTabs = document.querySelectorAll('.floor_tabs .tab');
const artLists = document.querySelectorAll('.artall > li');

floorTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // 모든 아트 리스트 숨기기
        artLists.forEach(art => art.classList.remove('active'));
        
        // 선택된 층의 아트만 표시
        artLists[index].classList.add('active');
    });
});

