// 드롭다운 토글
const dropdownTitle = document.querySelector('.dropdown > .b_title');
const dropdownMenu = document.querySelector('.dropdown_menu');

dropdownTitle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
    dropdownTitle.classList.toggle('active');
});

// 메뉴 아이템 클릭
const menuItems = document.querySelectorAll('.dropdown_menu .b_title');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // 선택된 제목으로 변경
        const titleText = item.textContent.trim();
        dropdownTitle.innerHTML = `${titleText} <i class="fa-solid fa-chevron-down"></i>`;
        
        // 드롭다운 닫기
        dropdownMenu.classList.remove('show');
        dropdownTitle.classList.remove('active');
        
        // 내용 변경
        const contentId = item.getAttribute('data-content');
        
        // 모든 내용 숨기기
        document.querySelectorAll('.content-wrapper .info').forEach(info => {
            info.classList.remove('active');
        });
        
        // 선택된 내용만 표시
        document.getElementById(contentId).classList.add('active');
    });
});

// 외부 클릭시 드롭다운 닫기
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdownMenu.classList.remove('show');
        dropdownTitle.classList.remove('active');
    }
});