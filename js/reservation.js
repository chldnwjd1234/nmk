document.addEventListener('DOMContentLoaded', function() {
    // ===== 1. Time Button 클릭 이벤트 =====
    const timeButtons = document.querySelectorAll('.time_btn');
    
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            timeButtons.forEach(btn => {
                btn.classList.remove('active');
            });
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

    const adultCounterInput = document.querySelector('.visitor_row:nth-child(1) .counter_input');
    const childCounterInput = document.querySelector('.visitor_row:nth-child(2) .counter_input');
    const adultMinusBtn = document.querySelector('.visitor_row:nth-child(1) .counter_btn.minus');
    const adultPlusBtn = document.querySelector('.visitor_row:nth-child(1) .counter_btn.plus');
    const childMinusBtn = document.querySelector('.visitor_row:nth-child(2) .counter_btn.minus');
    const childPlusBtn = document.querySelector('.visitor_row:nth-child(2) .counter_btn.plus');

    const totalPrice = document.getElementById('total_price');
    const adultHow = document.getElementById('how_1');
    const childHow = document.getElementById('how_2');
    const adultPriceTotal = document.getElementById('adult_price_total');
    const childPriceTotal = document.getElementById('child_price_total');

    function updatePrice() {
        const adultCount = parseInt(adultCounterInput.value) || 0;
        const childCount = parseInt(childCounterInput.value) || 0;

        const adultTotal = adultCount * PRICE_ADULT;
        const childTotal = childCount * PRICE_CHILD;
        const totalAmount = adultTotal + childTotal;

        adultHow.textContent = adultCount;
        adultPriceTotal.textContent = adultTotal.toLocaleString();

        childHow.textContent = childCount;
        childPriceTotal.textContent = childTotal.toLocaleString();

        totalPrice.textContent = `₩ ${totalAmount.toLocaleString()}`;
    }

    adultPlusBtn.addEventListener('click', function() {
        let value = parseInt(adultCounterInput.value) || 0;
        const max = parseInt(adultCounterInput.max) || 5;
        if (value < max) {
            adultCounterInput.value = value + 1;
            updatePrice();
        }
    });

    adultMinusBtn.addEventListener('click', function() {
        let value = parseInt(adultCounterInput.value) || 0;
        const min = parseInt(adultCounterInput.min) || 0;
        if (value > min) {
            adultCounterInput.value = value - 1;
            updatePrice();
        }
    });

    childPlusBtn.addEventListener('click', function() {
        let value = parseInt(childCounterInput.value) || 0;
        const max = parseInt(childCounterInput.max) || 5;
        if (value < max) {
            childCounterInput.value = value + 1;
            updatePrice();
        }
    });

    childMinusBtn.addEventListener('click', function() {
        let value = parseInt(childCounterInput.value) || 0;
        const min = parseInt(childCounterInput.min) || 0;
        if (value > min) {
            childCounterInput.value = value - 1;
            updatePrice();
        }
    });

    adultCounterInput.addEventListener('input', updatePrice);
    childCounterInput.addEventListener('input', updatePrice);

    updatePrice();

    // ===== 4. 리사이징 시 새로고침 (개선) =====
    let resizeTimer;
    let lastWidth = window.innerWidth;
    const BREAKPOINT = 1024; // ✅ 브레이크포인트 명시

    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        
        resizeTimer = setTimeout(function() {
            const currentWidth = window.innerWidth;
            
            // ✅ 브레이크포인트를 넘나들 때만 새로고침
            const wasDesktop = lastWidth > BREAKPOINT;
            const isDesktop = currentWidth > BREAKPOINT;
            
            if (wasDesktop !== isDesktop) {
                location.reload();
            }
            
            lastWidth = currentWidth;
        }, 500); // ✅ 500ms로 늘림 (안정성 향상)
    });
});