document.addEventListener('DOMContentLoaded', () => {


    const acardeon = () => {
        const acardeonTitle = document.querySelectorAll('.acardeon__title');
        const acardeonBody = document.querySelectorAll('.acardeon__body');
        const acardeonContent = document.querySelectorAll('.acardeon__content');

        function makeAcardeon(header, body, content) {
            body.forEach(item => {
                item.style.maxHeight = '0px'
                item.style.transition = '.5s'
                item.style.overflow = 'hidden'
            })
        
            header.forEach((item, i) => {
                item.addEventListener('click', () => {
                    if (body[i].style.maxHeight == '0px') {
                        body[i].style.maxHeight = content[i].clientHeight + 'px'
                    } else {
                        body[i].style.maxHeight = '0px'
                    }
                })
            })
        }
        
        makeAcardeon(acardeonTitle, acardeonBody, acardeonContent)
    }

    acardeon()



    const tabs = () => {
        const registrationTop = document.querySelector('.registration__top');
        const registrationBtn = document.querySelectorAll('.registration__btn');
        const registrationItem = document.querySelectorAll('.registration__item');

        const addActive = ind => {
            registrationItem.forEach((item, i) => {
                item.classList.remove('registration__item--active');
                if (i === ind){
                    item.classList.add('registration__item--active');
                }
            })
        }

        registrationTop.addEventListener('click', e => {
            const target = e.target;

            registrationBtn.forEach((item, i) => {
                item.classList.remove('registration__btn--active');
                if (target === item){
                    item.classList.add('registration__btn--active');
                    addActive(i);

                }

            })
            
        })
    }

    tabs();


    const sendForm = () => {

        const validte = form => {
            // получаем элементы формы
            const elementsForm = [...form.elements].filter(item => {
                return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
            });
            // хранилище ошибок
            const error = new Set();
            // пробегаемся по элементам
            elementsForm.forEach(elem => {
                if (elem.type === 'text'){
                    if (!elem.value){
                        error.add(elem);
                        elem.classList.add('error');
                        
                    } else {
                        error.delete(elem);
                        elem.classList.remove('error');

                    }
                }

                if (elem.type === 'email'){
                    if (/\w+@\w+\.\w{2,3}/.test(elem.value)){
                        elem.classList.remove('error');
                        error.delete(elem);
                    } else {
                        error.add(elem);
                        elem.classList.add('error');

                    }
                }
            })

            return !error.size ? true : false;
        }

        async function sendUser (form, path) {
            const formData = new FormData(form);
            
            const response = await fetch(path, {
                method: 'POST',
                body: formData
            })

            if (response.ok){
                form.reset();
                const result = response.json();
                console.log('success!');
                // openModal();
            } else {
                alert('ошибка');
                // openModal();
            }
        }

        document.addEventListener('submit', e => {
            e.preventDefault();
            const target = e.target;
            
            if (validte(target)){
                if (target.id === 'user'){
                    sendUser(target, '../sendmailUser.php');
                } else {
                    sendUser(target, '../sendmailComand.php');

                }
            }
        })

    }

    sendForm();
})