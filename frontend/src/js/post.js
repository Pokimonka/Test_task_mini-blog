'use strict'

async function getComments(comments) {
    let com = document.querySelector(".comments-list");
    let commentsList = '';
    for (const comment of comments) {
        commentsList += 
        `<div class="comment d-flex mb-3 border-bottom">
            <div class="p-2">
                <span class = "autor">
                    <a href="#" class="text-reset">${comment['autor']}</a>
                </span>
                <div class="text text-wrap">
                    ${comment['text']}
                </div>
            </div>
        </div>`;
    }
    com.insertAdjacentHTML('afterbegin', commentsList);
}

function drawPost(response) {
    let card = document.querySelector('.card');
    console.log(card);
    let comments = response['comments'];
    card.insertAdjacentHTML('afterbegin', 
        `<div class="card-header">
            <a href="#" class="text-reset">${response['autor']}</a>
        </div>
        <div class="card-body">
            <h5 class="card-title">${response['title']}</h5>
            <p class="card-text">
                ${response['text']}
            </p>
            <button type="button" class="comments_btn btn btn-outline-dark w-25 p-1">
                Comments:
            </button>
        </div>
        <div class="comments-list invisible d-flex flex-column p-2">
        </div>`
    );

    getComments(comments);

    let commentBtn = document.querySelector(".comments_btn");
    commentBtn.addEventListener('click', () => {
        let com = document.querySelector(".comments-list");
        com.classList.toggle('invisible');
    });
}

async function getPost() {
    let id = localStorage.getItem('id');
    console.log(id);
    let response = await fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },

    });
    let result = await response.json();
    console.log(result);
    drawPost(result);
}


getPost();