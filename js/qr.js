
        const html5QrCode = new Html5Qrcode("reader");

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

        // 📷 카메라 자동 실행 (후면 카메라 우선)
        Html5Qrcode.getCameras().then(cameras => {
            if (cameras && cameras.length) {
                const cameraId = cameras.length > 1 ? cameras[1].id : cameras[0].id;
                html5QrCode.start(
                    cameraId,
                    { fps: 10, qrbox: { width: 250, height: 250 } },
                    onScanSuccess,
                    onScanFailure
                ).then(() => {
                    document.getElementById("status").textContent = "Camera running... Please point to the QR code..";
                });
            } else {
                document.getElementById("status").textContent = "Camera not found.";
            }
        }).catch(err => {
            document.getElementById("status").textContent = "Camera launch failed: " + err;
        });
