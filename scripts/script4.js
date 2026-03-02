const menu = document.querySelector(".menu-block");
const menuStatic = document.querySelector(".menu-static");
const burger = document.querySelector(".burger");
const rulesList = document.querySelector(".rules-list");
const rulesBtn = document.querySelector(".menu__button");
const rulesClose = document.querySelector(".rules-list__close");

const slider = document.querySelector(".slider");
const sliderNext = slider.querySelector(".arrow__right");
const sliderPrev = slider.querySelector(".arrow__left");
const sliderWrapper = slider.querySelector(".slider__wrapper");
const sliderItems = slider.querySelectorAll(".slider__img");
const menuList = document.querySelector(".menu-list");
const linkMenu = document.querySelectorAll(".menu-list__paragraph");
let imageCount = sliderItems.length;
let currentPosition = 0;
let imageWidth = slider.clientWidth;
let disabledClass = "disabled";





//открытие и скрытие верхнего меню
window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    menu.classList.add("menu-block_active");
  } else {
    menu.classList.remove("menu-block_active");
    menuList.classList.remove("menu-list_active");
    burger.classList.remove("burger_active");
  }
});

//открытие выпадающего меню
burger.addEventListener("click", () => {
  burger.classList.toggle("burger_active");
  menuList.classList.toggle("menu-list_active");
});


//открытие правил аренды
rulesBtn.addEventListener("click", () => {
  rulesList.classList.add("rules-list_active")
})


//закрытие правил аренды
rulesClose.addEventListener("click", () => {
  rulesList.classList.remove("rules-list_active")
})

linkMenu.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("menu-block_active");
    menuList.classList.remove("menu-list_active");
    burger.classList.remove("burger_active");
  });
});



//реализация выбора блоков min
const minBtn = document.querySelectorAll(".service__button-min");
const itemsBlock = document.querySelectorAll(".service__items");
const photoBlock = document.querySelectorAll(".service__photos");

minBtn.forEach((button) => {
  button.addEventListener("click", function () {
    const number = this.dataset.number;

    minBtn.forEach((btn) => {
      btn.classList.remove("service__button-min_active");
    });
    this.classList.add("service__button-min_active");

    itemsBlock.forEach((block) => {
      if (block.dataset.number === number) {
        block.classList.add("service__items_active");
      } else {
        block.classList.remove("service__items_active");
      }
    });

    photoBlock.forEach((block) => {
      if (block.dataset.number === number) {
        block.classList.add("service__photos_active");
      } else {
        block.classList.remove("service__photos_active");
      }
    });
  });
});

//реализация выбора блоков max
const maxBtn = document.querySelectorAll(".service__button");
const wrapperBlock = document.querySelectorAll(".service__wrapper");

maxBtn.forEach((button) => {
  button.addEventListener("click", function () {
    const target = this.dataset.target;

    maxBtn.forEach((btn) => {
      btn.classList.remove("service__button_active");
    });
    this.classList.add("service__button_active");

    wrapperBlock.forEach((block) => {
      if (block.dataset.target === target) {
        block.classList.add("service__wrapper_active");
        block
          .querySelector(".service__button-min")
          .classList.add("service__button-min_active");
        block
          .querySelector(".service__items")
          .classList.add("service__items_active");
        block
          .querySelector(".service__photos")
          .classList.add("service__photos_active");
      } else {
        block.classList.remove("service__wrapper_active");
        block.querySelectorAll(".service__button-min").forEach((item) => {
          item.classList.remove("service__button-min_active");
        });
        block.querySelectorAll(".service__items").forEach((item) => {
          item.classList.remove("service__items_active");
        });
        block.querySelectorAll(".service__photos").forEach((item) => {
          item.classList.remove("service__photos_active");
        });
      }
    });
  });
});

//элементы для анимации
const elements = document.querySelectorAll(".animated-element");

// функция для проверки видимости элемента
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// функция, которая будет вызываться при прокрутке страницы
function handleScroll() {
  for (let i = 0; i < elements.length; i++) {
    if (isElementInViewport(elements[i])) {
      elements[i].classList.add("fade-in");
    }
  }
}

// Нобработчик событий для прокрутки
window.addEventListener("scroll", handleScroll);



function setupSlider(sliderElement) {
    let sliderImages = Array.from(sliderElement.querySelectorAll('.slider__img'));
    let sliderDots = Array.from(sliderElement.querySelectorAll('.slider__dot'));
    let currentSlide = 0;
    let touchStartX = null;

    function showSlide(slideIndex) {
        sliderImages.forEach((img, index) => {
            img.style.display = index === slideIndex ? 'block' : 'none';
            img.style.opacity = index === slideIndex ? '1' : '0';
        });

        sliderDots.forEach((dot, index) => {
            dot.classList.toggle('slider__dot_active', index === slideIndex);
        });
    }

    sliderElement.querySelector('.arrow__left').addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : sliderImages.length - 1;
        showSlide(currentSlide);
    });

    sliderElement.querySelector('.arrow__right').addEventListener('click', () => {
        currentSlide = (currentSlide < sliderImages.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    });

    sliderElement.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    });

    sliderElement.addEventListener('touchend', (event) => {
        let touchEndX = event.changedTouches[0].clientX;
        let diffX = touchStartX - touchEndX;

        if (Math.abs(diffX) > 50) { // минимальное расстояние для свайпа
            if (diffX > 0) {
                // свайп влево
                currentSlide = (currentSlide < sliderImages.length - 1) ? currentSlide + 1 : 0;
            } else {
                // свайп вправо
                currentSlide = (currentSlide > 0) ? currentSlide - 1 : sliderImages.length - 1;
            }
            showSlide(currentSlide);
        }
    });

    showSlide(currentSlide);
}

window.onload = () => {
    let sliders = Array.from(document.querySelectorAll('.slider'));
    sliders.forEach(setupSlider);
}
