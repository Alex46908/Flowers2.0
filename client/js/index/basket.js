function BasketContent(){
    const el = document.getElementById('basket');
    // const AllFlowers = localStorage.getItem('flowers').replace(',', '').split(',');
    el.innerHTML = '';
    for (let i = 0; i < localStorage.length - 1; i++) {
        el.innerHTML += `<h6 class="dropdown-item">${localStorage.getItem('' + i)}<span onclick="BasketDelete(${i})"><img src="./img/icon/delete.svg" alt=""></span></h6>`
    }
    el.innerHTML += `<h6 class="dropdown-item bg-dark text-white" onclick="OpenForm()" >Купить</h6>`;
}
BasketContent();
function BasketSave(flname, isBouquet){
    if(localStorage.getItem('length') == null) {
        localStorage.setItem('length', '0')
    }
    const length = localStorage.getItem('length');
    if (isBouquet == true){
        localStorage.setItem(length, flname + ' (Букет)')
    }else{
        localStorage.setItem(length, flname)
    }
    localStorage.setItem('length', +localStorage.getItem('length') + 1);
    BasketContent()
}
function BasketDelete(delete_value){
    while(delete_value < localStorage.getItem('length') - 1){
        localStorage.setItem(delete_value, localStorage.getItem(`${delete_value + 1}`))
        console.log('alex')
        delete_value++
    }
    localStorage.removeItem(localStorage.getItem('length')-1);
    localStorage.setItem('length', +localStorage.getItem('length') - 1)
    BasketContent()
}