// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert'

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap'

'use strict'

function drawPost(response) {
    var date = new Date(Date.parse(response['date'])); 
    let post = `
    <div class="post container border border-light rounded mb-3">
        <div class="autor-nickname-img container pb-3 border-bottom border-light">
            <div class="img-container">
                <img class="profile-photo border border-light mt-1" src="#" alt="Профиль">
            </div>
            <span class="nickname">
                <a href="#" class="text-reset">${response['autor']}</a>
            </span>
        </div>
        <span class="title container ml-3 fs-5 fw-bolder">
            <a href="#" class="text-reset">${response['title']}</a>
        </span>
        <div class="text-post container-sm text-truncate mb-3 mt-3">
            ${response['text']}
        </div>
        <button type="button" class="read-next-btn btn btn-outline-primary">Читать далее</button>
        <div class="time text-sm-end"> ${date.toLocaleString().slice(0,10)} </div>
    </div>`;

    let postList = document.querySelector('.posts-list');

    postList.insertAdjacentHTML('beforeend', post);
}


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
    drawPost(result);
}

function createPost(modal) {
    let form = modal.querySelector('form');
    let closeBtn = form.querySelector('.close-btn');
    let close = modal.querySelector('.close-top-btn');
    let submitForm = modal.querySelector('.save-btn')
    closeBtn.addEventListener('click', ()=> {
        form.classList.remove('was-validated');
        form.reset();
    })

    close.addEventListener('click', ()=> {
        form.classList.remove('was-validated');
        form.reset();
    })

    submitForm.addEventListener('click', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
          let autor = form.querySelector('#post-autor');
          let title = form.querySelector('#post-title');
          let text = form.querySelector('#post-text'); 
          sendRequest(autor.value, title.value, text.value);
          closeBtn.click();
        }
        });

}

let createBtn = document.querySelector('.create-post');

createBtn.addEventListener('click', b => {
    let modal = document.querySelector('.modal');
    createPost(modal);
})



async function setPosts() {
    let response = await fetch('http://127.0.0.1:8000/api/v1/posts/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },

    });
    let result = await response.json();
    console.log(result);
    for (const res of result) {
        drawPost(res);
    }
}

setPosts();

