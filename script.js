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

// function copyToClipboard(){
//     const btnCopiar = document.querySelector('.copiar');
//     const email = document.querySelector('.email-endereco');
//     const toast = document.querySelector('.toast-copied');

//     btnCopiar?.addEventListener('click',()=> {
//         window.navigator.clipboard.writeText(email.innerText);
//         toast.classList.add('active')
//         btnCopiar.classList.add('copied')
//         setTimeout(()=>{
//             toast.classList.remove('active')  
//             btnCopiar.classList.remove('copied')
//         }, 1500) 
//     });
// }

// copyToClipboard()

const btnEnviar = document.getElementById('btnEnviar')
btnEnviar.addEventListener('click',e=>{
    e.preventDefault();
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const msg = document.getElementById('msg').value

    if(nome && email && msg){
        enviarMensagem(nome, email, msg)
    } 
})
 
 async function enviarMensagem(nome, email, msg){
     const {addDoc, collection, db} = await import('./firebase.js')
     const data = new Date();
     const hora = String(data.getHours()+"h"+data.getMinutes()+"m");
     const dia = String(data.getDate()).padStart(2, '0');
     const mes = String(data.getMonth() + 1).padStart(2, '0');
     const ano = data.getFullYear();
     const dataAtual = dia + '/' + mes + '/' + ano + ' ' + hora;
     try {
         const docRef = await addDoc(collection(db, "Mensagens"), {
         Nome: nome,
         Email: email,
         Mensagem: msg,
         DataDeEnvio: dataAtual
         });
         console.log("Mensagem enviada com ID: ", docRef.id);
     } catch (e) {
         console.error("Erro ao enviar mensagem: ", e);
     }
 }