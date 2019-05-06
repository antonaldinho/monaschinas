let series_div = document.getElementById('lista-de-series-div');
let base = 'http://localhost:3000';
let loadNavData = (method, url, callback)=>{
    let request = new XMLHttpRequest(); 
    request.onreadystatechange = ()=>{
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status == 200)
                callback(JSON.parse(request.responseText));
        }
    }

    request.open(method, url, true);
    request.send(); 
}

let writeNavData = (series_array)=>{
    let html = ''; 
    for(let serie of series_array){
       html += `<li><a href="/#">${serie.nombre} </a></li>`;
    }
    series_div.innerHTML = html;
}

document.onload = loadNavData('GET',base+'/api/series/getSeries', writeNavData);