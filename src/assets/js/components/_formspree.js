//----------------------------------------------
// Formspree
//---------------------------------------------- 
const Formspree = (() => {
  let s;

  return {
    settings() {
      return {
        body: document.body,
        // ajax: document.getElementsByClassName('ajax')[0],
        // ajaxMessage: document.getElementsByClassName('ajax__message')[0],
        // ajaxClose: document.getElementsByClassName('ajax__close')[0],
        input: document.getElementsByTagName('input'),
        textarea: document.getElementsByTagName('textarea'),
        formActive: 'js-form-active',
        ajaxPopup: 'js-ajax',
        ajaxError: 'js-ajax-error',
        overflow: 'js-overflow'
      };
    },

    init() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents() {
      // this.focus();
      this.ajax();
      // this.ajaxClose();
    },

    // focus() {
    //   [].forEach.call(s.input, input => {
    //     input.addEventListener('focus', e => {
    //       e.target.parentNode.classList.add(s.formActive);
    //     });
    //     input.addEventListener('blur', e => {
    //       e.target.parentNode.classList.remove(s.formActive);
    //     });
    //   });

    //   [].forEach.call(s.textarea, textarea => {
    //     textarea.addEventListener('focus', e => {
    //       e.target.parentNode.classList.add(s.formActive);
    //     });
    //     textarea.addEventListener('blur', e => {
    //       e.target.parentNode.classList.remove(s.formActive);
    //     });
    //   });
    // },

    ajax() {
      const form = document.getElementById('form');

      form.addEventListener('submit', e => {
        e.preventDefault();

        s.ajaxClose.classList.remove(s.ajaxError);

        const request = new XMLHttpRequest();

        request.open('POST', 'https://formspree.io/mmilloway87@gmail.com', true);
        request.setRequestHeader('accept', 'application/json');

        const formData = new FormData(form);

        request.send(formData);

        request.onreadystatechange = () => {
          if (request.readyState < 4) {
            s.body.classList.add(s.ajaxPopup);
            s.ajaxMessage.classList.remove('fade-in');
          } else if (request.readyState === 4) {
            if (request.status === 200 && request.status < 300) {
              setTimeout(() => {
                s.ajaxMessage.classList.add('fade-in');
                s.ajaxMessage.innerHTML = 'Message Sent';
              }, 1000);

              setTimeout(() => {
                form.reset();
                s.body.classList.remove(s.overflow, s.ajaxPopup);
              }, 3000);
            } else {
              setTimeout(() => {
                s.ajaxClose.classList.add(s.ajaxError);
                s.ajaxMessage.classList.add('fade-in');
                s.ajaxMessage.innerHTML = 'Something Went Wrong';
              }, 1000);
            }
          }
        };
      });
    },

    ajaxClose() {
      s.ajaxClose.addEventListener('click', () => {
        s.body.classList.remove(s.ajaxPopup);
        s.ajaxClose.classList.remove(s.ajaxError);
      });

      document.addEventListener('keyup', e => {
        if (s.ajaxClose.classList.contains(s.ajaxError) && e.which === 27) {
          s.body.classList.toggle(s.ajaxPopup);
          s.ajaxClose.classList.toggle(s.ajaxPopup);
        }
      });
    }
  };
})();

//----------------------------------------------
// Exports
//----------------------------------------------
export default Formspree;
