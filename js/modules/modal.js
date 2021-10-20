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

export default modal;
export {closeModal};
export{showModal};