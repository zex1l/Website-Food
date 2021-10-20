"use strict";
        import tabs  from './modules/tabs';
        import modal  from'./modules/modal';
        import timer  from'./modules/timer';
        import cards from'./modules/cards';
        import calc   from'./modules/calc';
        import forms  from'./modules/forms';
        import slider  from'./modules/slider';
        import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 300000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2021-10-18');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
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