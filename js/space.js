
const button = document.getElementById("btnBuscar");
const container = document.getElementById("contenedor");

button.addEventListener("click", () =>{
    const input = document.getElementById("inputBuscar");
    const inputValue = input.value;
    const DATA_URL = `https://images-api.nasa.gov/search?q=${inputValue}`;
    const showElements = (data) =>{
      container.innerHTML = '';
  
      for (const item of data) {
          container.innerHTML += `
          <div class="card" style="">
            <img src="${item.links[0].href}" class="card-img-top" alt="...">
            <div class="card-body">
              <h1 class="card-title">${item.data[0].title}</h1>
              <p class="card-text">${item.data[0].description}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${item.data[0].date_created}</li>
            </ul>
          </div>`; 
        }
  
  }
  
    fetch(DATA_URL)
    .then(response =>{
          if (!response.ok){
            throw new Error('Error en la busqueda: ' + response.status);
          }
          return response.json();

        })

    .then(data => {
        showElements(data.collection.items);
        console.log(data.collection.items);
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud:', error);
    });

})
