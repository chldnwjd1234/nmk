/* dropdown */
document.addEventListener('DOMContentLoaded', function() {
    // 기존 가격 계산 코드...
    
    // Visitor Information 드롭다운 기능
    const labButton = document.querySelector('.lab_t');
    const labContent = document.querySelector('.lab_txt');

    if (labButton && labContent) {
        labButton.addEventListener('click', function() {
            // active 클래스 토글
            labButton.classList.toggle('active');
            labContent.classList.toggle('active');
        });
    }

    // 기존 updatePrice 함수와 버튼 이벤트들...
});
                        // 인원 수 카운터 기능
                        document.querySelectorAll('.counter').forEach(counter => {
                            const minusBtn = counter.querySelector('.counter_btn.minus');
                            const plusBtn = counter.querySelector('.counter_btn.plus');
                            const inputField = counter.querySelector('.counter_input');

                            minusBtn.addEventListener('click', () => {
                                let currentValue = parseInt(inputField.value);
                                if (currentValue > parseInt(inputField.min)) {
                                    inputField.value = currentValue - 1;
                                }
                            });

                            plusBtn.addEventListener('click', () => {
                                let currentValue = parseInt(inputField.value);
                                if (currentValue < parseInt(inputField.max)) {
                                    inputField.value = currentValue + 1;
                                }
                            });
                        });
                    
// reservation.js

document.addEventListener('DOMContentLoaded', function() {
    // 가격 설정
    const PRICE_ADULT = 5000;
    const PRICE_CHILD = 3000;

    // 요소 선택
    const adultCounterInput = document.querySelector('.visitor_row:nth-child(1) .counter_input');
    const childCounterInput = document.querySelector('.visitor_row:nth-child(2) .counter_input');
    const adultMinusBtn = document.querySelector('.visitor_row:nth-child(1) .counter_btn.minus');
    const adultPlusBtn = document.querySelector('.visitor_row:nth-child(1) .counter_btn.plus');
    const childMinusBtn = document.querySelector('.visitor_row:nth-child(2) .counter_btn.minus');
    const childPlusBtn = document.querySelector('.visitor_row:nth-child(2) .counter_btn.plus');

    // Total Amount 영역 요소들
    const totalPrice = document.querySelector('.total_amount .price');
    
    // Adult 관련
    const adultMany = document.querySelector('.price_row:nth-child(1) .many');
    const adultResultNumber = document.querySelector('.price_row:nth-child(1) .price_label_3 .number');
    
    // Child 관련
    const childMany = document.querySelector('.price_row:nth-child(2) .many');
    const childResultNumber = document.querySelector('.price_row:nth-child(2) .price_label_3 .number');

    // 가격 계산 및 업데이트 함수
    function updatePrice() {
        const adultCount = parseInt(adultCounterInput.value) || 0;
        const childCount = parseInt(childCounterInput.value) || 0;

        // 각 항목 계산
        const adultTotal = adultCount * PRICE_ADULT;
        const childTotal = childCount * PRICE_CHILD;
        const totalAmount = adultTotal + childTotal;

        // Adult 업데이트
        adultMany.textContent = adultCount;
        adultResultNumber.textContent = adultTotal.toLocaleString();

        // Child 업데이트
        childMany.textContent = childCount;
        childResultNumber.textContent = childTotal.toLocaleString();

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
});