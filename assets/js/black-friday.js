const BlackFriday = () => {
  const blackFridayModal = document.querySelector('.black-friday');
  const blackFridayHeader = document.querySelector('.black-friday-header');
  const classCloseModal = ['black-friday','close-black-friday'];

  const showBlackFridayModal = () => blackFridayModal.style.display = 'flex';
  window.addEventListener('load', () => setTimeout(showBlackFridayModal,1000))

  const closeBlackFridayModal = ({target: {classList : [classeCSS]}}) => {
    if(classCloseModal.some( (item) => item === classeCSS )) {
      blackFridayModal.style.display = 'none';
      blackFridayHeader.style.display = 'block';
    }
  }
  blackFridayModal.addEventListener('click', closeBlackFridayModal)

  const btnComprar = document.querySelectorAll('[data-btn-link]');
  const handleClickBtnComprar = (btn) => {
    btn.addEventListener('click', () => window.open(btn.dataset.btnLink))
  }
  Array.from(btnComprar, handleClickBtnComprar)
  
  


  const currentYear = new Date().getFullYear();
  const blackFriday = new Date(`26 November ${currentYear} 23:59:59 GMT-0300`);
  const daysContainer = document.querySelectorAll('[data-days]')
  const hoursContainer = document.querySelectorAll('[data-hours]')
  const minutesContainer = document.querySelectorAll('[data-minutes]')
  const secondsContainer = document.querySelectorAll('[data-seconds]')

  function formatDate(unit){
    return unit > 9 ? unit : '0' + unit;
  }

  function updateTimer({days, hours, minutes, seconds}){
    Array.from(daysContainer,(c) => {
      c.textContent = days;
    })
    Array.from(hoursContainer,(c) => {
      c.textContent = formatDate(hours);
    })
    Array.from(minutesContainer,(c) => {
      c.textContent = formatDate(minutes);
    })
    Array.from(secondsContainer,(c) => {
      c.textContent = formatDate(seconds);
    })
  }

  function updateCountdown() {
    const currentTime = new  Date();
    const difference = blackFriday - currentTime;

    const days = Math.floor(difference / 1000 / 60 / 60 / 24);
    const hours = Math.floor(difference / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(difference / 1000 / 60 ) % 60;
    const seconds = Math.floor(difference / 1000) % 60;

    updateTimer({days, hours, minutes, seconds})
  }

  setInterval(updateCountdown, 1000);

  return blackFridayModal
}

export default BlackFriday;