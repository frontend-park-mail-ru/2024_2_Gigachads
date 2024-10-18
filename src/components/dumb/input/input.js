/**
 * @description - Функция для фильтрации ввода в поля input, разрешая только цифры, английские буквы и специальные символы (_@ и т.д.)
 */
function filterInput() {
    const inputs = document.getElementsByTagName('input');

    Array.from(inputs).forEach(input => {
        input.addEventListener('keypress', function (e) {
            const char = String.fromCharCode(e.which);
            const regex = /^[A-Za-z0-9_!#$%^&*()+=?.,;:`~]+$/;
            if (!regex.test(char)) {
                e.preventDefault();
            }
        });

        // Дополнительная проверка на вставку текста
        input.addEventListener('paste', function (e) {
            const pasteData = e.clipboardData.getData('text');
                const regex = /^[A-Za-z0-9_!#$%^&*()+=?.,;:`~]+$/;
                if (!regex.test(pasteData)) {
                    e.preventDefault();
                }
        });

         
    });
}

export { filterInput };