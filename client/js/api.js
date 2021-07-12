const content = document.getElementById('product_content');
fetch('/api/flowers')
    .then((response) => response.json())
    .then((json) => {
        for ( let flower of json ) {
            content.innerHTML += `     <div class="card">
                <img class="card_img" src="./img/card/${flower.img}" alt="">
                <div class="card_txt">
                    <p align="center" class="card_title">${flower.title}</p>
                    <p class="card_description">${flower.description}</p>
                </div>
            </div>`
        }
    });