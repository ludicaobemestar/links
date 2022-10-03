let module, moduleSuccess
try{
    module = await import('./firebase.js')
    moduleSuccess = true;
}catch(e){
    moduleSuccess = false
}

function closeModal(modal, email = false){
    modal.addEventListener('click',({target, currentTarget})=>{
        if(target === currentTarget){
            if(email){
                checkboxesChecked['email-open-close'].checked = false
                return
            } 
            resetOptions()
            if(response === "done"){
                console.log(response) // Enviar outra mensagem?
            } 
        }
    })
}

function resetOptions(email = false){
    for(let item in checkboxesChecked){
        checkboxesChecked[item].checked = false
    }
}


// ATENDIMENTO MODAL
const modalAtend = document.querySelector('.atendimento-modal')
// const checkboxes = document.querySelectorAll('.check-modal')
const checkboxes = document.querySelectorAll('input[type="checkbox"]')

console.log('check:',checkboxes)

const checkboxesChecked = {}
checkboxes.forEach((item)=>{
    checkboxesChecked[item.id] = item
})

checkboxesChecked['atendimento-open-close'].addEventListener('click',({target})=>{
    if(!target.checked) resetOptions() 
})

closeModal(modalAtend)

// FIM ATENDIMENTO MODAL


console.log(checkboxesChecked)

// EMAIL MODAL
const modalEmail = document.querySelector('.email-modal')
closeModal(modalEmail, true)
//FIM EMAIL MODAL

// Caso firebase esteja fora do ar, modal de formulário desativado
    if(!moduleSuccess) modalEmail.children[0].classList.add('inativo')
// Caso firebase esteja fora do ar

// COPY TO CLIPBOARD
(()=>{
    const btnCopiar = document.querySelector('.copiar');
    const email = document.querySelector('.email-endereco');
    const toast = document.querySelector('.toast-copied');

    btnCopiar?.addEventListener('click',()=> {
        window.navigator.clipboard.writeText(email.innerText);
        toast.classList.add('active')
        btnCopiar.classList.add('copied')
        setTimeout(()=>{
            toast.classList.remove('active')  
            btnCopiar.classList.remove('copied')
        }, 1500) 
    });
})()
// FIM COPY TO CLIPBOARD

// FORMULÁRIO DE MSG
const btnEnviar = document.getElementById('btnEnviar')
const form = document.getElementById('mensagem')
const loading = document.querySelector('.loading')
let response = null

form.addEventListener('submit',async e=>{
    e.preventDefault();
    const nome = DOMPurify.sanitize(document.getElementById('nome').value)
    const email = DOMPurify.sanitize(document.getElementById('email').value)
    const msg = DOMPurify.sanitize(document.getElementById('msg').value)

    if(nome && email && msg.trim().replaceAll(' ','').length !== 0){
        loading.classList.add('active')
        response = await enviarMensagem(nome, email, msg)
        loading.classList.remove('active')
        loading.classList.add(response)
    }else{
        form.classList.add('error')
        window.setTimeout(()=>form.classList.remove('error'), 2500)
    }
})
 

 async function enviarMensagem(nome, email, msg){
     try {
        const {addDoc, collection, db} = module //await import('./firebase.js')
        const data = new Date();
        const hora = String(data.getHours()+"h"+data.getMinutes()+"m");
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = dia + '/' + mes + '/' + ano + ' ' + hora;
        const docRef = await addDoc(collection(db, "Mensagens"), {
            Nome: nome,
            Email: email,
            Mensagem: msg,
            DataDeEnvio: dataAtual
        });
        console.log("Mensagem enviada com ID: ", docRef.id);
        return 'done'
     } catch (e) {
        console.error("Erro ao enviar mensagem: ", e);
        return 'error'
     } 
 }

// FIM FORMULÁRIO DE MSG
