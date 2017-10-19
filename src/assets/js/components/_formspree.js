//----------------------------------------------
// Formspree
//---------------------------------------------- 
const Formspree = (() => {
  let s;

  return {
    settings() {
      return {
        body: document.body,
        formMessage: document.getElementsByClassName('contact__message')[0]
      };
    },

    init() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents() {
      this.ajax();
    },

    ajax() {
      const form = document.getElementById('form');

      form.addEventListener('submit', e => {
        e.preventDefault();

        const request = new XMLHttpRequest();

        request.open('POST', 'https://formspree.io/mmilloway87@gmail.com', true);
        request.setRequestHeader('accept', 'application/json');

        const formData = new FormData(form);

        request.send(formData);

        request.onreadystatechange = () => {
          if (request.readyState < 4) {
            s.formMessage.classList.remove('fade-in');
          } else if (request.readyState === 4) {
            if (request.status === 200 && request.status < 300) {
              setTimeout(() => {
                s.formMessage.classList.add('fade-in');
                s.formMessage.innerHTML = 'Message Sent';

                form.reset();
              }, 1000);
            } else {
              setTimeout(() => {
                s.formMessage.classList.add('fade-in');
                s.formMessage.innerHTML = 'Something Went Wrong';
              }, 1000);
            }
          }
        };
      });
    }
  };
})();

//----------------------------------------------
// Exports
//----------------------------------------------
export default Formspree;
