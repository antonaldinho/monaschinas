let fotos_promos_div = document.getElementById('fotos-promos-div');

const placeImages = (products)=>{
    let div_class = 'carousel-item';
    let img_class = 'd-block w-100';
    let img_alt = 'slide-';
    let html ='' ;
    let image_name; 
    for(let n = 0; n<products.length; n++){
        fetch(base+`/api/images/getImage?image_id=${products[n].imagen_id}`)
        .then(response =>response.json())
        .then(data => {image_name = data[0].nombre_imagen;
            if (n == 0)
                html += `<div class = 'carousel-item active'>`;
            else
                html += `<div calss='${div_class}'>`;
            if (products[n].imagen_id != undefined)
                html += `<img class='${img_class}' src='..\\images\\${image_name}' alt = '${img_alt}${n}'>`;
            else
                html += `<img class='${img_class}' src='..\\images\\640x360.png' alt = '${img_alt}${n}'>`;
            html += `</div>`
            fotos_promos_div.innerHTML = html; 
        })
        .catch(error => {if (error) throw error;});
    }
}

fetch(base+'/api/products/getProductsWithDiscount')
    .then(response => response.json())
    .then(placeImages)
    .catch( error => {throw error;});
