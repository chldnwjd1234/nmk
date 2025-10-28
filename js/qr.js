const html5QrCode = new Html5Qrcode("reader");
let isScanning = false;

// ✅ 스캔 성공 시
function onScanSuccess(decodedText) {
    document.getElementById("status").textContent = "QR recognition success: " + decodedText;

    if (decodedText.startsWith("http")) {
        window.location.href = decodedText;
    } else {
        window.location.href = "./result.html";
    }
}

// ❌ 스캔 실패 시 (로그만 출력)
function onScanFailure(error) {
    console.log("Recognition failed:", error);
}

// 📷 카메라 시작 함수
function startCamera() {
    if (isScanning) return;

    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length) {
            const cameraId = cameras.length > 1 ? cameras[1].id : cameras[0].id;
            html5QrCode.start(
                cameraId,
                { fps: 10, qrbox: { width: 250, height: 250 } },
                onScanSuccess,
                onScanFailure
            ).then(() => {
                isScanning = true;
                document.getElementById("status").textContent = "Camera running... Please point to the QR code..";
            });
        } else {
            document.getElementById("status").textContent = "Camera not found.";
        }
    }).catch(err => {
        document.getElementById("status").textContent = "Camera launch failed: " + err;
    });
}

// 📷 카메라 중지 함수
function stopCamera() {
    if (!isScanning) return;

    html5QrCode.stop().then(() => {
        isScanning = false;
        document.getElementById("status").textContent = "QR scanner is available on screens 1024px and wider.";
    }).catch(err => {
        console.error("Camera stop failed:", err);
    });
}

// 📷 초기 실행 (1024px 이상에서만)
if (window.innerWidth >= 1024) {
    startCamera();
} else {
    document.getElementById("status").textContent = "QR scanner is available on screens 1024px and wider.";
}

// 📱 화면 크기 변경 감지
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && !isScanning) {
        startCamera();
    } else if (window.innerWidth < 1024 && isScanning) {
        stopCamera();
    }
});