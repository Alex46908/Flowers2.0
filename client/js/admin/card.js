function Update(img){
    const titleRu = document.getElementById(`${img}titleRu`).value;
    const descriptionRu = document.getElementById(`${img}descriptionRu`).value;
    const titleEn = document.getElementById(`${img}titleEn`).value;
    const descriptionEn = document.getElementById(`${img}descriptionEn`).value;
    fetch(`/api/flupdate/${titleRu}/${titleEn}/${descriptionRu}/${descriptionEn}/${img}`)
    Content()
}
function Delete(img){
    fetch(`/api/delcard/${img}`)
    Content()
}
