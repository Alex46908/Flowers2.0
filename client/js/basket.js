function BasketContent(){
    const el = document.getElementById('basket');
    el.innerHTML = '';
    for (let i = 0; i < localStorage.length - 1; i++) {
        if (localStorage.getItem('' + i) !== null) {
            el.innerHTML += `<h6 class="dropdown-item">${localStorage.getItem('' + i)}<span onclick="BasketDelete(${i})"><img src="./img/icon/delete.svg" alt=""></span></h6>`
        }
    }
    el.innerHTML += `<h6 class="dropdown-item bg-dark text-white" onclick="OpenForm()" id="byebtn"></h6>`;
}
BasketContent();
getTextAll();
function BasketSave(flname){
    if(localStorage.getItem('length') == null) {
        localStorage.setItem('length', '0')
    }
    const length = localStorage.getItem('length');
    localStorage.setItem(length, flname)

    localStorage.setItem('length', +localStorage.getItem('length') + 1);
    BasketContent()
    getTextAll()
}
function BasketDelete(delete_value){
    while(delete_value < localStorage.getItem('length') - 1){
        localStorage.setItem(delete_value, localStorage.getItem(`${delete_value + 1}`))
        delete_value++
    }
    localStorage.removeItem(localStorage.getItem('length')-1);
    localStorage.setItem('length', +localStorage.getItem('length') - 1)
    BasketContent()
    getTextAll()
}