const lang = localStorage.getItem('lang');
const h0 = document.getElementById('product');
const Btns = document.getElementsByClassName('PBuyBtn');
fetch(`./api/langstatic/${lang}`)
    .then(response => response.json())
    .then(data => {
        for (btn of Btns){
            btn.innerHTML = data[0].product.Buy;
            }
        h0.innerHTML = data[0].product.h0;
    });
