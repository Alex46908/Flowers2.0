const product_el = document.getElementById('product_content');

fetch('/api/flowers')
    .then((response) => response.json())
    .then((json) => {
        for ( let flower of json ) {
            product_el.innerHTML += `
    <div  class="card" style="width: 80%; margin-top: 10px; margin-bottom: 10px;">
  <img class="card-img-top" src="./img/card/${flower.img}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${flower.title}</h5>
    <p class="card-text">${flower.description}</p>
    <button onclick="BasketSave('${flower.title}')" class="btn btn-primary" type="button">Купить</button>
  </div>
</div>`
        }
    });