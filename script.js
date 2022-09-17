function closeModal(modal, check){
    modal.addEventListener('click',({target, currentTarget})=>{
        if(target === currentTarget) check.checked = false
    })
}

const modalAtend = document.querySelector('.atendimento-modal')
const checkboxModalAtend = document.getElementById('atendimento-open-close')

closeModal(modalAtend, checkboxModalAtend)

const modalEmail = document.querySelector('.email-modal')
const checkboxModalEmail = document.getElementById('email-open-close')

closeModal(modalEmail, checkboxModalEmail)

function copyToClipboard(){
    const btnCopiar = document.querySelector('.copiar');
    const email = document.querySelector('.email-endereco');
    btnCopiar.addEventListener('click',()=> {
        window.navigator.clipboard.writeText(email.innerText);
    });
}

copyToClipboard()