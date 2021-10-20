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

export default tabs;