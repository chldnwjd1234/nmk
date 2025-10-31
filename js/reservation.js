document.addEventListener('DOMContentLoaded', function() {
    // ===== 1. Time Button 클릭 이벤트 =====
    const timeButtons = document.querySelectorAll('.time_btn');
    
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 모든 버튼에서 active 클래스 제거
            timeButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 클릭한 버튼에만 active 클래스 추가
            this.classList.add('active');
        });
    });

    // ===== 2. Visitor Information 드롭다운 =====
    const labButton = document.querySelector('.lab_t');
    const labContent = document.querySelector('.lab_txt');

    if (labButton && labContent) {
        labButton.addEventListener('click', function() {
            labButton.classList.toggle('active');
            labContent.classList.toggle('active');
        });
    }

    // ===== 3. 가격 계산 기능 =====
    const PRICE_ADULT = 5000;
    const PRICE_CHILD = 3000;

    // 요소 선택 - Counter Input
    const adultCounterInput = document.querySelector('.visitor_row:nth-child(1) .counter_input');
    const childCounterInput = document.querySelector('.visitor_row:nth-child(2) .counter_input');
    const adultMinusBtn = document.querySelector('.visitor_row:nth-child(1) .counter_btn.minus');
    const adultPlusBtn = document.querySelector('.visitor_row:nth-child(1) .counter_btn.plus');
    const childMinusBtn = document.querySelector('.visitor_row:nth-child(2) .counter_btn.minus');
    const childPlusBtn = document.querySelector('.visitor_row:nth-child(2) .counter_btn.plus');

    // Total Amount 영역 요소들 (ID로 선택)
    const totalPrice = document.getElementById('total_price');
    const adultHow = document.getElementById('how_1');
    const childHow = document.getElementById('how_2');
    const adultPriceTotal = document.getElementById('adult_price_total');
    const childPriceTotal = document.getElementById('child_price_total');

    // 가격 계산 및 업데이트 함수
    function updatePrice() {
        const adultCount = parseInt(adultCounterInput.value) || 0;
        const childCount = parseInt(childCounterInput.value) || 0;

        // 각 항목 계산
        const adultTotal = adultCount * PRICE_ADULT;
        const childTotal = childCount * PRICE_CHILD;
        const totalAmount = adultTotal + childTotal;

        // Adult 업데이트
        adultHow.textContent = adultCount;
        adultPriceTotal.textContent = adultTotal.toLocaleString();

        // Child 업데이트
        childHow.textContent = childCount;
        childPriceTotal.textContent = childTotal.toLocaleString();

        // Total 업데이트
        totalPrice.textContent = `₩ ${totalAmount.toLocaleString()}`;
    }

    // Adult + 버튼 클릭
    adultPlusBtn.addEventListener('click', function() {
        let value = parseInt(adultCounterInput.value) || 0;
        const max = parseInt(adultCounterInput.max) || 5;
        if (value < max) {
            adultCounterInput.value = value + 1;
            updatePrice();
        }
    });

    // Adult - 버튼 클릭
    adultMinusBtn.addEventListener('click', function() {
        let value = parseInt(adultCounterInput.value) || 0;
        const min = parseInt(adultCounterInput.min) || 0;
        if (value > min) {
            adultCounterInput.value = value - 1;
            updatePrice();
        }
    });

    // Child + 버튼
    childPlusBtn.addEventListener('click', function() {
        let value = parseInt(childCounterInput.value) || 0;
        const max = parseInt(childCounterInput.max) || 5;
        if (value < max) {
            childCounterInput.value = value + 1;
            updatePrice();
        }
    });

    // Child - 버튼
    childMinusBtn.addEventListener('click', function() {
        let value = parseInt(childCounterInput.value) || 0;
        const min = parseInt(childCounterInput.min) || 0;
        if (value > min) {
            childCounterInput.value = value - 1;
            updatePrice();
        }
    });

    // 직접 입력 시 업데이트
    adultCounterInput.addEventListener('input', updatePrice);
    childCounterInput.addEventListener('input', updatePrice);

    // 초기 가격 계산
    updatePrice();

    // ===== 4. 리사이징 시 새로고침 =====
    let resizeTimer;
    let lastWidth = window.innerWidth;

    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        
        resizeTimer = setTimeout(function() {
            const currentWidth = window.innerWidth;
            
            // 너비가 변경되었을 때만 새로고침
            if (currentWidth !== lastWidth) {
                location.reload();
            }
            
            lastWidth = currentWidth;
        }, 300); // 300ms 지연 후 새로고침 (리사이징이 끝난 후)
    });
});