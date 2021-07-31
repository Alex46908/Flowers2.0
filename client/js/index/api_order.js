function SendForm(){
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    let content = '';
    for (let i = 0; i < localStorage.length - 1; i++) {
        content += `${localStorage.getItem('' + i)},`
    }
    fetch(`./api/create_user/${name}/${phone}/${content}`);
    localStorage.clear()
    BasketContent();
    CloseForm()

}