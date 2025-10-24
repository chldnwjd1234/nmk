
// 슬라이드 전환 상태
let currentSlide = 1; // 처음엔 상세뷰(1)

function showSlide(n) {
  const slides = document.querySelectorAll('[data-slide]');
  slides.forEach(s => s.classList.remove('active'));
  const target = document.querySelector(`[data-slide="${n}"]`);
  if (target) target.classList.add('active');
  updateDots(n);
  currentSlide = n;
}

function nextSlide() {
  // 상세 → 관련유물
  showSlide(2);
}

function prevSlide() {
  // 관련유물 → 상세
  showSlide(1);
}

function goToSlide(n) {
  // 하단 점 클릭
  showSlide(n);
}

function updateDots(n) {
  const dots = document.querySelectorAll('.pagination .dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === n - 1);
  });
}

// 초기 상태 세팅
document.addEventListener('DOMContentLoaded', () => {
  showSlide(1); // 시작은 slide(상세)
});

