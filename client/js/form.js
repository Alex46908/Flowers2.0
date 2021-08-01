function OpenForm(){
    const el = document.getElementById('form')
    el.style.display = 'block'
}
function CloseForm(){
    const el = document.getElementById('form')
    el.style.display = 'none'
}
function SendForm(){
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    let content = '';
    for (let i = 0; i < localStorage.length - 1; i++) {
        if (localStorage.getItem('' + i) !== null) {
            content += `${localStorage.getItem('' + i)},`
        }
    }
    fetch(`./api/create_user/${name}/${phone}/${content}`);
    localStorage.clear()
    BasketContent();
    CloseForm()

}