// Переключение городов
var currentCity = 'Санкт-Петербург';
var currentAddress = 'ул. Предпортовая 6, к 14';

function toggleDropdown() {
    var dropdown = document.querySelector('.dropdown-contact');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function changeAddress(city, address) {
    var dropdownContent = document.querySelector('.dropdown-contact-content');

    if (!dropdownContent.innerHTML.includes('>' + currentCity + '<')) {
        var previousCityHtml = '<a href="#" onclick="changeAddress(\'' + currentCity + '\', \'' + currentAddress + '\')">' + currentCity + '</a>';
        dropdownContent.innerHTML = previousCityHtml + dropdownContent.innerHTML;
    }

    currentCity = city;
    currentAddress = address;

    var locationElement = document.querySelector('.company-location address');
    locationElement.innerHTML = city + '<span class="arrow-down" onclick="toggleDropdown()"></span> ' + address;

    toggleDropdown();
}

// Модальное окно Заказать звонок
function showCallOrderModal() {
    document.getElementById('callOrderModal').style.display = 'block';
}

function closeCallOrderModal() {
    document.getElementById('callOrderModal').style.display = 'none';
}

var closeButton = document.getElementsByClassName('close-button')[0];

closeButton.onclick = function () {
    closeCallOrderModal();
};

window.onclick = function (event) {
    if (event.target == document.getElementById('callOrderModal')) {
        closeCallOrderModal();
    }
};

// Добавляем обработчик событий для формы, чтобы проверять номер телефона и отправлять данные на сервер
document.getElementById('callOrderForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var phoneInput = document.getElementById('phone');
    var phone = phoneInput.value;

    // Регулярное выражение для проверки номера телефона
    var phonePattern = /^(8|\+7)[- ]?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/;

    if (!phonePattern.test(phone)) {
        alert("Пожалуйста, введите корректный номер телефона в формате 8___ ___ __ __ или +7___ ___ __ __");
        return;
    }

    document.getElementById('orderForm').style.display = 'none';
    document.getElementById('thankYouMessage').style.display = 'block';

    console.log("Телефон для обратного звонка: " + phone);
});

// Всплывающая навигация
function toggleMenu() {
    var extraNav = document.querySelector('.extra-navigation');

    if (extraNav.style.display === 'block') {
        extraNav.style.display = 'none';
    } else {
        extraNav.style.display = 'block';
    }
}

//Меню на мобильном
function toggleMobileMenu() {
    var extraNav = document.querySelector('.navigation');

    // Проверяем, виден ли раздел с дополнительной навигацией
    if (extraNav.style.display === 'block') {
        // Если виден, то скрываем его
        extraNav.style.display = 'none';
    } else {
        // Если не виден, то делаем его видимым
        extraNav.style.display = 'block';
    }
}

// Слайдер
function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');

    updateControlPanelPosition();
}

function changeSlide(step) {
    const slides = document.querySelectorAll('.slide');
    const currentSlideIndex = [...slides].findIndex(slide => slide.classList.contains('active'));
    const newSlideIndex = (currentSlideIndex + step + slides.length) % slides.length;

    goToSlide(newSlideIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelectorAll('.slide').length > 0) {
        goToSlide(1);
    }
});

document.querySelector('.slider-prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.slider-next').addEventListener('click', () => changeSlide(1));

//
function updateControlPanelPosition() {
    const activeSlide = document.querySelector('.slide.active');
    const sliderControls = document.querySelector('.slider-controls');
    if (activeSlide && sliderControls) {
        const slideHeight = activeSlide.offsetHeight; 
        sliderControls.style.bottom = -`${slideHeight}px`;
    }
}

// Запрещает перетаскивание картинок
let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0;
const slider = document.querySelector('.slider');

slider.addEventListener('mousedown', startDrag);
document.addEventListener('mouseup', endDrag);
document.addEventListener('mousemove', drag);

function startDrag(e) {
    isDragging = true;
    startPos = getPositionX(e);
    prevTranslate = currentTranslate;
    slider.classList.add('grabbing');
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    slider.classList.remove('grabbing');
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100) changeSlide(1);
    else if (movedBy > 100) changeSlide(-1);

    currentTranslate = 0;
}

function drag(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

// Видео
document.addEventListener('DOMContentLoaded', function () {
    var videoBtn = document.querySelector('.js-video-btn'),
        video = document.querySelector('.js-video'),
        backgroundImg = document.querySelector('.background-img'),
        foregroundImg = document.querySelector('.foreground-img');

    videoBtn.addEventListener('click', function () {
        backgroundImg.classList.add('rotate');
        foregroundImg.classList.add('rotate');

        setTimeout(function () {
            video.play();
            videoBtn.classList.add('hide'); 
            backgroundImg.classList.remove('rotate');
            foregroundImg.classList.remove('rotate');
        }, 2000); 
    });

    video.addEventListener('ended', function () {
        videoBtn.classList.remove('hide'); 
    });
});

// Блок с партнерами
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.customers-nav button');
    const tabs = document.querySelectorAll('.customers-items > div');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[index].classList.add('active');
        });
    });

    buttons[0].classList.add('active');
    tabs[0].classList.add('active');
});

// footer
document.addEventListener('DOMContentLoaded', function () {
    // Находим родительский элемент, в который хотим переместить блок
    var footerWrapper = document.querySelector('.footer-wrapper');

    // Находим блок, который хотим переместить
    var footerNavColumn = document.querySelector('.footer-nav-item.footer-nav-item-column');

    // Убеждаемся, что оба элемента существуют, прежде чем продолжить
    if (footerWrapper && footerNavColumn) {
        // Перемещаем блок в конец родительского элемента
        footerWrapper.appendChild(footerNavColumn);
    }
});