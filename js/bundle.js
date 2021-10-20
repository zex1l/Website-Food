/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio = 1.375;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings ( selector, activeClass)
    {
        const elements = document.querySelectorAll(selector);

        elements.forEach( elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex'))
            {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio'))
            {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal()
    {
        if (!sex || !height || !weight || !age || !ratio)
        {
            result.textContent = '____';
            return;
        }
        
        if (sex == 'female')
        {
            result.textContent = Math.round((447.6 +(9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
        else{
            result.textContent = Math.round((88.36 +(13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

        
    }
    
    calcTotal();

    function getStaticInformation(selector, activeClass)
    {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } 
                else
                {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                //console.log(ratio, sex);
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });


        
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    function getDynamicInformation(selector)
    {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g))
            {
                input.style.border = '1px solid red';
            }
            else{
                input.style.border = 'none';
            }

            switch(input.getAttribute('id'))
            {
                case 'height':
                    height = +input.value;
                    break;

                case 'weight':
                    weight = +input.value;
                    break;

                case 'age':
                   age = +input.value;
                    break;
            }

            calcTotal();
        });

        
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function cards() {
    // Использовать классы для карточек

    class MenuCard{
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
            
        }

        changeToUAH()
        {
            this.price = this.price * this.transfer;
        }
        
        render()
        {
            const element = document.createElement('div');
            if(this.classes.length === 0)
            {
                this.element = "menu__item";
                element.classList.add(this.element);
            }
            else{
                this.classes.forEach(className => {
                    element.classList.add(className);
                });
            }
            element.innerHTML = `
            
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            
            `;
            this.parent.append(element);

        }
    }


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

   /*  axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    }); */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо, мы скоро с вами свяжемся!!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostingData(item);
    });



    function bindPostingData(form)
    {
        form.addEventListener('submit', (e) => {
            e.preventDefault();


            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);

            

            // Сохраняю в переменную данные с формы
            const formData = new FormData(form);

            // Transform formData to JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            

            // Fetch API
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests',json )
            .then(data => {

                console.log(data);
                showModuleAns(message.success);

                statusMessage.remove();
            })
            .catch(() => {
                showModuleAns(message.failure);
            })
            .finally( () => {
                form.reset();
            });

        });
    }


    function showModuleAns(message)
    {
        const modalWin = document.querySelector('.modal__dialog');
        // Убираю весь контент в модальном окне
        modalWin.classList.remove('show');
        modalWin.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);

        const modalAnswer = document.createElement('div');
        modalAnswer.classList.add('modal__dialog');

        // Создаю новый контент
        modalAnswer.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(modalAnswer);

        setTimeout(() => {
            modalAnswer.remove();
            modalWin.classList.add('show');
            modalWin.classList.remove('hide');

            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }


    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function closeModal(modalSelector)
    {
        const modal = document.querySelector(modalSelector);

        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


function showModal(modalSelector, modalTimerId)
{
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if(modalTimerId)
    {
        clearInterval(modalTimerId);
    }
    
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);


    

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => showModal(modalSelector, modalTimerId));
    });



    // Нажатие на пустоту для закрытия
    modal.addEventListener('click', (e) => {
        if(e.target == modal || e.target.getAttribute('data-close') == '')
        {
            closeModal(modalSelector);
        }
    });

    // Эскейп для закрытия
    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show'))
        {
            closeModal(modalSelector);
        }
    });

    //const modalTimer = setTimeout(showModal, 2000);
    
    function showModalByScroll()
    {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-10)
        {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll',showModalByScroll);
        }
    }

    window.addEventListener('scroll',showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
     // Добавляем элементы страницы
     const slides = document.querySelectorAll(slide),
     slider = document.querySelector(container),
     prev = document.querySelector(prevArrow),
     next = document.querySelector(nextArrow),
     total = document.querySelector(totalCounter),
     current = document.querySelector(currentCounter),
     slidesWrapper = document.querySelector(wrapper),
     slidesField = document.querySelector(field),
     width = window.getComputedStyle(slidesWrapper).width;

 // Счетчики
 let slideIndex = 1;
 let offset = 0;

 // Добавление счетчика который показывает сколько слайдов
 if(slides.length < 10)
 {
     total.textContent = `0${slides.length}`;
     current.textContent = `0${slideIndex}`;

 } else{
     total.textContent = slides.length;
     current.textContent = slideIndex;
 }


 // Рсчитываем ширину и добавляем модификации css
 slidesField.style.width = 100 * slides.length + '%';
 slidesField.style.display = 'flex';
 slidesField.style.transition = '0.5s all';

 slidesWrapper.style.overflow = 'hidden';

 slides.forEach(slide => {
     slide.style.width = width;
 });

 slider.style.position = 'relative';

 const indicators = document.createElement('ol'),
       dots = [];
 indicators.classList.add('carousel-indicators');

 indicators.style.cssText = `
     position: absolute;
     right: 0;
     bottom: 0;
     left: 0;
     z-index: 15;
     display: flex;
     justify-content: center;
     margin-right: 15%;
     margin-left: 15%;
     list-style: none;
 `;
 slider.append(indicators);


 // Создаем точки 
 for(let i = 0; i < slides.length; i++)
 {
     const dot = document.createElement('li');
     dot.setAttribute('data-slide-to', i+1);
     dot.style.cssText = `
         box-sizing: content-box;
         flex: 0 1 auto;
         width: 30px;
         height: 6px;
         margin-right: 3px;
         margin-left: 3px;
         cursor: pointer;
         background-color: #fff;
         background-clip: padding-box;
         border-top: 10px solid transparent;
         border-bottom: 10px solid transparent;
         opacity: .5;
         transition: opacity .6s ease;
     `;
     if(i == 0)
     {
         dot.style.opacity = 1;
     }
     indicators.append(dot);
     dots.push(dot);
 }
 
 // Собитие на кнопку след
 next.addEventListener('click', () => {

     // Проверка для счетчика
     // +width.replace(/\D/g, '') - не числа заменяем пустыми строками
     if(offset == +width.replace(/\D/g, '') * (slides.length -1))
     {
         offset = 0;
     }
     else{
         offset += +width.replace(/\D/g, '');
     }
     slidesField.style.transform = `translateX(-${offset}px)`;

     if(slideIndex == slides.length)
     {
         slideIndex = 1;
     }
     else{
         slideIndex++;
     }

     if(slides.length <10)
     {
         current.textContent = `0${slideIndex}`;
     }
     else{
         current.textContent = slideIndex;
     }

     dots.forEach(dot => {
         dot.style.opacity = '0.5';
         dots[slideIndex-1].style.opacity = 1;
     });
 });


 // То же самое что и на next
 prev.addEventListener('click', () => {
     if(offset == 0)
     {
         offset = +width.replace(/\D/g, '') * (slides.length - 1);
     }
     else{
         offset -= +width.replace(/\D/g, '');
     }
     slidesField.style.transform = `translateX(-${offset}px)`;


     if(slideIndex == 1)
     {
         slideIndex = slides.length;
     }
     else{
         slideIndex--;
     }

     if(slides.length <10)
     {
         current.textContent = `0${slideIndex}`;
     }
     else{
         current.textContent = slideIndex;
     }

     dots.forEach(dot => {
         dot.style.opacity = '0.5';
         dots[slideIndex-1].style.opacity = 1;
     });


     // Навигация для слайдов с помощью точек
     dots.forEach(dot => {
         dot.addEventListener('click', (e) => {
             const slideTo = e.target.getAttribute('data-slide-to');
 
             slideIndex = slideTo;
             offset = +width.replace(/\D/g, '') * (slideTo - 1);
 
             slidesField.style.transform = `translateX(-${offset}px)`;
 
             if (slides.length < 10) {
                 current.textContent =  `0${slideIndex}`;
             } else {
                 current.textContent =  slideIndex;
             }
 
             dots.forEach(dot => dot.style.opacity = ".5");
             dots[slideIndex-1].style.opacity = 1;
         });
     });
 });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass)
{
    let   tabs = document.querySelectorAll(tabsSelector), // Список рациона питания
    tabsContent = document.querySelectorAll(tabsContentSelector), // Весь контент который относится к tabs
    tabsParent = document.querySelector(tabsParentSelector); // Родитель tabs

    function hideTabContent() 
    {
    tabsContent.forEach(item => {
        item.style.display = 'none'; // Убираем весь контент
    });

    tabs.forEach(item => {
        item.classList.remove(activeClass); 
    });
    }

    function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    

    if(target && target.classList.contains(tabsSelector.slice(1)))
    {
        tabs.forEach((item, i) => {
            
            // Если элемент на который мы нажали == табу
            if(target == item) 
            {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
    

    function getTimeRemaining(endtime)
    {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60*60*24)),
              hours = Math.floor((t / (1000*60*60)) % 24),
              minutes = Math.floor((t / 1000/60) % 60),
              seconds =  Math.floor((t / 1000)% 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num)
    {
        if(num >=0 && num < 10)
        {
            return `0${num}`;
        }
        else{
            return num;
        }
    }

    function setClocl(selector, endtime)
    {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'), 
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

            function updateClock()
            {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0)
                {
                    clearInterval(timeInterval);
                }
            }
    }

    setClocl(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};


const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok)
    {
        throw new Error(`Coulde not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

        
        
        
        
        
        
        
        

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimerId), 300000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2021-10-18');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });



    // My slider
    /* const parentSlide = document.querySelector('.offer__slider-wrapper'),
          rightSlide = document.querySelector('.offer__slider-next'),
          counter = document.querySelector('#current'),
          leftSlide = document.querySelector('.offer__slider-prev'); 
    
    let numberSlide = 3,
        counterNum = 3;
    
    const slides = ['img/slider/food-12.jpg', 'img/slider/olive-oil.jpg', 'img/slider/paprika.jpg', 'img/slider/pepper.jpg'];

        rightSlide.addEventListener('click', () => {
            parentSlide.innerHTML = '';

            counterNum++;
            if(counterNum === 5)
            {
                counterNum = 1;
            }

            if(numberSlide != 3)
            {
                numberSlide++;
                
            }
            else{
                numberSlide = 0;
            }
            

            counter.textContent = `0${counterNum}`;
            parentSlide.innerHTML = `
                 <div class="offer__slide">
                    <img src=${slides[numberSlide]} alt="pepper">
                </div>
            `;
            
        });

        leftSlide.addEventListener('click', () => {
            parentSlide.innerHTML = '';

            counterNum--;
            if(counterNum === 0)
            {
                counterNum = 4;
            }
            if(numberSlide != 0)
            {
                numberSlide--;
            }
            else{
                numberSlide = 3;
            }
            

            counter.textContent = `0${counterNum}`;
            parentSlide.innerHTML = `
                 <div class="offer__slide">
                    <img src=${slides[numberSlide]} alt="pepper">
                </div>
            `;
            
        }); */
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map