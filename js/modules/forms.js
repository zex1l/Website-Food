import {closeModal, showModal} from './modal';
import{postData} from '../services/services';


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
            postData('http://localhost:3000/requests',json )
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
        showModal('.modal', modalTimerId);

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

            closeModal('.modal');
        }, 4000);
    }


    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

export default forms;