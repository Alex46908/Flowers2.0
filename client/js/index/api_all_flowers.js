const content = document.getElementById('product_content');
fetch('/api/flowers')
    .then((response) => response.json())
    .then((json) => {
        for ( let flower of json ) {
            content.innerHTML += `
    <div  class="card" style="width: 80%; margin-top: 10px; margin-bottom: 10px;">
  <img class="card-img-top" src="./img/card/${flower.img}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${flower.title}</h5>
    <p class="card-text">${flower.description}</p>
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Добавить в Корзину
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <h6 onclick="BasketSave('${flower.title}', false)" class="dropdown-item">Один цветок</h6>
    <h6 onclick="BasketSave('${flower.title}', true)" class="dropdown-item">Букет</h6>
  </div>
</div>
  </div>
</div>`
        }
    });