const product_el = document.getElementById('product_content');

fetch('/api/flowers')
    .then((response) => response.json())
    .then((json) => {
        for ( let flower of json ) {
            if (localStorage.getItem('lang') == 'ru'){
                product_el.innerHTML += `
    <div  class="card">
  <img class="card-img-top" src="./img/card/${flower.img}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${flower.titleRu}</h5>
    <p class="card-text">${flower.descriptionRu}</p>
    <button onclick="BasketSave('${flower.titleRu}')" class="btn btn-primary PBuyBtn" type="button"></button>
  </div>
</div>`
            }else if (localStorage.getItem('lang') == 'en'){
                product_el.innerHTML += `
    <div  class="card">
  <img class="card-img-top" src="./img/card/${flower.img}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${flower.titleEn}</h5>
    <p class="card-text">${flower.descriptionEn}</p>
    <button onclick="BasketSave('${flower.titleEn}')" class="btn btn-primary PBuyBtn" type="button"></button>
  </div>
</div>`
            }
        }
    });