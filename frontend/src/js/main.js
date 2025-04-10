// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert'

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap'
'use strict'

let readNextBtn = document.querySelector(".read-next-btn");



async function sendRequest(autor, title, text) {
    const body = {
        "title": title,
        "text": text,
        "autor": autor
    }

    let response = await fetch('http://127.0.0.1:8000/api/v1/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)

    });
    let result = await response.json();
    console.log(result);
}


let createBtn = document.querySelector('.create-post');



function createPost(modal) {
    let form = modal.querySelector('form');
    let closeBtn = form.querySelector('.close-btn');
    let close = modal.querySelector('.close-top-btn');
    closeBtn.addEventListener('click', ()=> {
        form.reset();
    })

    close.addEventListener('click', ()=> {
        form.reset();
    })

    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }else {
          let autor = form.querySelector('#post-autor');
          let title = form.querySelector('#post-title');
          let text = form.querySelector('#post-text'); 
          console.log(autor.value);
          console.log(title.value);
          console.log(text.value);
          sendRequest(autor.value, title.value, text.value);
        }
        form.classList.add('was-validated');

        },false);

}

createBtn.addEventListener('click', b => {
    let modal = document.querySelector('.modal');
    createPost(modal);
})