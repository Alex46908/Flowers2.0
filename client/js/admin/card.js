function Update(img){
    const title = document.getElementById(`${img}title`).value;
    const description = document.getElementById(`${img}description`).value;
    fetch(`/api/flupdate/${title}/${description}/${img}`)
    Content()
}
function Delete(img){
    fetch(`/api/delcard/${img}`)
    Content()
}
