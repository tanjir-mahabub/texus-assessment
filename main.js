document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('toggle-btn');
    const closeMenu = document.getElementById('close-menu');
    const menu = document.querySelector('.main-menu-container');

    menuToggle.addEventListener('click', function () {
        menu.style.transform = "translateX(0%)";
        menu.style.opacity = "1";
        console.log('menu open');     
    });
   
    closeMenu.addEventListener('click', function () {
        menu.style.transform = "translateX(-100%)";
        menu.style.opacity = "0";
        console.log('closed');
    });


    function initializeSlider(sliderClass, prevBtnId = "prev", nextBtnId = "next", perViewDesktop = 3, perViewTablet = 2.5, perViewMobile = 1.2, delayDefault = 3000) {
        const imageWrapper = document.querySelector(sliderClass);
        const imageItems = document.querySelectorAll(`${sliderClass} > *`);
        const imageLength = imageItems.length;
        let perView = perViewDesktop;
        let totalScroll = 0;
        const delay = delayDefault;
        let autoScroll;
    
        function setPerView() {
            const width = window.innerWidth;
            if (width < 640) {
                perView = perViewMobile;
            } else if (width < 768) {
                perView = perViewTablet;
            } else {
                perView = perViewDesktop;
            }
            imageWrapper.style.setProperty('--per-view', perView);
            const widthEl = document.querySelector(`${sliderClass} > :first-child`).offsetWidth + 24;
            imageWrapper.style.left = `-${totalScroll * widthEl}px`;
        }
    
        function startAutoScroll() {
            stopAutoScroll(); // Ensure no multiple intervals are running
            autoScroll = setInterval(scrolling, delay);
        }
    
        function scrolling() {
            totalScroll++;
            if (totalScroll === imageLength + 1) {
                totalScroll = 1;
                imageWrapper.style.transition = '0s';
                imageWrapper.style.left = '0';
                setTimeout(() => {
                    imageWrapper.style.transition = '.3s';
                    const widthEl = document.querySelector(`${sliderClass} > :first-child`).offsetWidth + 24;
                    imageWrapper.style.left = `-${totalScroll * widthEl}px`;
                }, 50);
            } else {
                const widthEl = document.querySelector(`${sliderClass} > :first-child`).offsetWidth + 24;
                imageWrapper.style.left = `-${totalScroll * widthEl}px`;
                imageWrapper.style.transition = '.3s';
            }
        }
    
        function stopAutoScroll() {
            clearInterval(autoScroll);
        }
    
        // Ensure that multiple event listeners are not added
        document.getElementById(prevBtnId)?.removeEventListener('click', prevBtnClick);
        document.getElementById(nextBtnId)?.removeEventListener('click', nextBtnClick);
    
        function prevBtnClick() {
            stopAutoScroll();
            totalScroll--;
            if (totalScroll < 0) {
                totalScroll = imageLength - 1;
                imageWrapper.style.transition = '0s';
                const widthEl = document.querySelector(`${sliderClass} > :first-child`).offsetWidth + 24;
                imageWrapper.style.left = `-${totalScroll * widthEl}px`;
                setTimeout(() => {
                    imageWrapper.style.transition = '.3s';
                    totalScroll--;
                    const widthEl = document.querySelector(`${sliderClass} > :first-child`).offsetWidth + 24;
                    imageWrapper.style.left = `-${totalScroll * widthEl}px`;
                }, 50);
            } else {
                const widthEl = document.querySelector(`${sliderClass} > :first-child`).offsetWidth + 24;
                imageWrapper.style.left = `-${totalScroll * widthEl}px`;
                imageWrapper.style.transition = '.3s';
            }
            setTimeout(startAutoScroll, delay); // Restart autoplay after a delay
        }
    
        function nextBtnClick() {
            stopAutoScroll();
            totalScroll++;
            if (totalScroll === imageLength + 1) {
                totalScroll = 1;
                imageWrapper.style.transition = '0s';
                imageWrapper.style.left = '0';
                setTimeout(() => {
                    imageWrapper.style.transition = '.3s';
                    const widthEl = document.querySelector(`${sliderClass} > :first-child`).offsetWidth + 24;
                    imageWrapper.style.left = `-${totalScroll * widthEl}px`;
                }, 50);
            } else {
                const widthEl = document.querySelector(`${sliderClass} > :first-child`).offsetWidth + 24;
                imageWrapper.style.left = `-${totalScroll * widthEl}px`;
                imageWrapper.style.transition = '.3s';
            }
            setTimeout(startAutoScroll, delay); // Restart autoplay after a delay
        }
    
        document.getElementById(prevBtnId)?.addEventListener('click', prevBtnClick);
        document.getElementById(nextBtnId)?.addEventListener('click', nextBtnClick);
    
        setPerView();
        window.addEventListener('resize', setPerView);
    
        for (let i = 0; i < perView; i++) {
            imageWrapper.insertAdjacentHTML('beforeend', imageItems[i].outerHTML);
        }
    
        // Initialize autoplay
        startAutoScroll();
    }
    
    // Example usage:
    initializeSlider('.post-slider', 'postPrev', 'postNext');    
    initializeSlider('.icon-slider', prevBtnId = 'iconPrev', nextBtnId = 'iconNext', perViewDesktop = 5, perViewTablet = 4, perViewMobile = 3, delayDefault = 3000)
    
       

});
