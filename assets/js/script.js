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
const checkboxesAndRadios = document.querySelectorAll('.check-modal')
const checkboxes = Array.from(checkboxesAndRadios).filter((e)=>e.type === "checkbox")
const radios = Array.from(checkboxesAndRadios).filter((e)=>e.type === "radio")

const checkboxesChecked = {}
checkboxes.forEach((item)=>{
    checkboxesChecked[item.id] = item
})

checkboxesChecked['atendimento-open-close'].addEventListener('click',({target})=>{
    if(!target.checked) resetOptions() 
})

closeModal(modalAtend)

// FIM ATENDIMENTO MODAL

// EMAIL MODAL
const modalEmail = document.querySelector('.email-modal')
closeModal(modalEmail, true)
//FIM EMAIL MODAL

// Caso firebase esteja fora do ar, modal de formulário desativado
function desativarMensagem(){
    const contatoForm = radios.find((e)=>e.id === "check-mensagem")
    const contatoFormBtn = document.querySelector('.mensagem-btn')
    const contatoEmail = radios.find((e)=>e.id === "check-email")
    contatoForm.checked = false
    contatoEmail.checked = true
    contatoFormBtn.classList.add('disable')
}

    if(!moduleSuccess){
        desativarMensagem()
        modalEmail.children[0].classList.add('inativo')
    } 
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
let response = null;

form.addEventListener('submit',async e=>{
    e.preventDefault();
    const nome = DOMPurify.sanitize(document.getElementById('nome').value)
    const email = DOMPurify.sanitize(document.getElementById('email').value)
    const msg = DOMPurify.sanitize(document.getElementById('msg').value)

    if(nome && email && msg.trim().replaceAll(' ','').length !== 0){
        loading.classList.add('active')
        console.log(email.toLowerCase())
        response = await enviarMensagem(nome, email.toLowerCase(), msg)
        loading.classList.remove('active')
        loading.classList.add(response)
        if(response === 'error'){
            desativarMensagem()
        }
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
        const dataDMA = dia + '/' + mes + '/' + ano;
        const time = String(data.getHours()+":"+data.getMinutes());
        const dataAtual = dia + '/' + mes + '/' + ano + ' ' + hora;
        const docRef = await addDoc(collection(db, "Mensagens"), {
            Nome: nome,
            Email: email,
            Mensagem: msg,
            DataDeEnvio: dataAtual,
            Data: dataDMA,
            Hora: time,
            Star: false,
            New: true,
            Trash: false,
            Archive: false,
            Timestamp: module.Timestamp.now()
        });
        console.log("Mensagem enviada com ID: ", docRef.id);
        return 'done'
     } catch (e) {
        console.error("Erro ao enviar mensagem: ", e);
        return 'error'
     } 
 }

// FIM FORMULÁRIO DE MSG
