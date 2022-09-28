let module, moduleSuccess
try{
    module = await import('./firebase.js')
    moduleSuccess = true;
}catch(e){
    moduleSuccess = false
}

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

// Caso firebase esteja fora do ar, modal de formulário desativado
    if(!moduleSuccess) modalEmail.children[0].classList.add('inativo')
// Caso firebase esteja fora do ar


closeModal(modalEmail, checkboxModalEmail)

function copyToClipboard(){
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
}

copyToClipboard()

const btnEnviar = document.getElementById('btnEnviar')
const form = document.getElementById('mensagem')

form.addEventListener('submit',async e=>{
    e.preventDefault();
    const loading = document.querySelector('.loading')
    const nome = DOMPurify.sanitize(document.getElementById('nome').value)
    const email = DOMPurify.sanitize(document.getElementById('email').value)
    const msg = DOMPurify.sanitize(document.getElementById('msg').value)

    if(nome && email && msg.trim().replaceAll(' ','').length !== 0){
        loading.classList.add('active')
        const response = await enviarMensagem(nome, email, msg)
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