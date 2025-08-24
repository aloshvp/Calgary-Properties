document.addEventListener("DOMContentLoaded", function () {
    // --- Initialize AOS ---
    AOS.init({
        duration: 1000,
        offset: 100,
        // once: true
    });

    // --- HERO SLIDER ---
    const heroSwiper = new Swiper('.discoverWrap .swiper', {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        navigation: {
            nextEl: '.discoverWrap .swiper-button-next',
            prevEl: '.discoverWrap .swiper-button-prev'
        },
        pagination: {
            el: '.discoverWrap .swiper-pagination',
            clickable: true
        },
        on: {
            init: function () {
                const realSlides = this.slides.filter(slide => !slide.classList.contains('swiper-slide-duplicate'));
                document.querySelector('.discoverWrap .swiper-counter .total').textContent = realSlides.length;
                document.querySelector('.discoverWrap .swiper-counter .current').textContent = this.realIndex + 1;
            },
            slideChange: function () {
                document.querySelector('.discoverWrap .swiper-counter .current').textContent = this.realIndex + 1;
            }
        }
    });

    // --- UNMATCHED CRAFTING VERTICAL SLIDER ---
    const unmatchedContainer = document.querySelector('.unmatchedCraftingImg');

    if (unmatchedContainer) {
        const unmatchedImages = unmatchedContainer.querySelectorAll('img');
        let loadedCount = 0;

        unmatchedImages.forEach(img => {
            if (img.complete) loadedCount++;
            else img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === unmatchedImages.length) initUnmatchedSwiper();
            });
        });

        if (loadedCount === unmatchedImages.length) initUnmatchedSwiper();
    }

    function initUnmatchedSwiper() {
        const unmatchedSwiper = new Swiper(unmatchedContainer, {
            direction: 'vertical',
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: { delay: 4000, disableOnInteraction: false },
            effect: 'slide',
            pagination: {
                el: unmatchedContainer.querySelector('.swiper-pagination'),
                clickable: true,
                type: 'bullets'
            },
            observer: true,
            observeParents: true,
            preloadImages: true,
            updateOnImagesReady: true,
        });

        // Force Swiper to render pagination after images load
        unmatchedSwiper.update();
        unmatchedSwiper.pagination.render();
        unmatchedSwiper.pagination.update();
    }
});
