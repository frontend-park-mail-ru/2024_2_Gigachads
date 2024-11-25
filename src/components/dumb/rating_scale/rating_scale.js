export function ItemButton() {
    const items = document.querySelectorAll('.rating-scale__item');
    items.forEach(currentItem => {
        currentItem.addEventListener('click', () => {
            items.forEach(item => {
                starItemButton(currentItem, item);
                numberItemButton(currentItem, item);
            });
        });
    });
}

export function GetValue() {
    const items = document.querySelectorAll('.rating-scale__item');
    let maxValue = 0;
    items.forEach(item => {
        if (item.classList.contains('active') && Number(item.dataset.value) > maxValue) {
            maxValue = Number(item.dataset.value);
        }
    });
    return maxValue;
}

function starItemButton(currentItem, item) {
    const starImg = item.querySelectorAll('.icon');
    if (Number(item.dataset.value) <= Number(currentItem.dataset.value)) {
        starImg.forEach(img => img.src = '/icons/logo.png');
    }
    else {
        starImg.forEach(img => img.src = '/icons/logo2.png');
    }
}

function numberItemButton(currentItem, item) {
    if (Number(item.dataset.value) <= Number(currentItem.dataset.value)) {
        item.classList.add('active');
    }
    else {
        item.classList.remove('active');
    }
}
