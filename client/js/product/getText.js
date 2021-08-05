const lang = localStorage.getItem('lang');
const h0 = document.getElementById('product');
fetch(`./api/langstatic/${lang}`)
    .then(response => response.json())
    .then(data => {
       h0.innerHTML = data[0].product.h0;
        });
