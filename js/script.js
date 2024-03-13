// NAVIGATION MENU
const hamburger = document.querySelector(".nav-menu");
const navList = document.querySelector(".nav-links");
// WRAPPER CLASSES
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
// TOGGLE BUTTONS
const buttons = document.querySelectorAll(".toggle-btn");
// 
// SIDE MENU
// 
function openSideMenu() {
    navList.classList.toggle('open')
}


// 
// FEATURED EVENTS CARD
// 
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;

    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// 
// TOGGLE BUTTONS
// 

buttons.forEach((button) => {
    button.addEventListener('click', function () {
        buttons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
    });
});



function openGoogleCalendar() {
    // Event details
    var eventName = 'Your Event Name';
    var eventLocation = 'Event Location';
    var eventStartDate = '2023-12-25 12:00:00'; // Format: YYYY-MM-DDTHH:mm:ss
    var eventEndDate = '2023-12-25 14:00:00';   // Format: YYYY-MM-DDTHH:mm:ss

    // Google Calendar URL with parameters
    var googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + encodeURIComponent(eventName) +
        '&details=' + encodeURIComponent('Location: ' + eventLocation) +
        '&dates=' + encodeURIComponent(eventStartDate + '/' + eventEndDate);

    // Open the Google Calendar link in a new tab/window
    window.open(googleCalendarUrl, '_blank');
}

// 
// TAB PAGE
// 
// Function to open a specific tab content
function openTab(evt, tabName) {
    // Hide all tab contents
    const tabcontents = document.getElementsByClassName('tabcontent');
    for (const tabcontent of tabcontents) {
        tabcontent.classList.remove('active');
    }

    // Deactivate all tabs
    const tablinks = document.getElementsByClassName('tab-page-btn');
    for (const tablink of tablinks) {
        tablink.classList.remove('current');
    }

    // Show the specific tab content and mark the button as active
    document.getElementById(tabName).classList.add('active');
    console.log(tabName.cl);
    evt.currentTarget.classList.add('current');
}

// By default, open the first tab
document.querySelector('.tab-page-btn').classList.add('current');
document.getElementById('presentation').classList.add('active');
document.getElementById('overview').classList.add('active');
document.getElementById('guests').classList.add('active');

