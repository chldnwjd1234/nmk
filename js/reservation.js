
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
                    