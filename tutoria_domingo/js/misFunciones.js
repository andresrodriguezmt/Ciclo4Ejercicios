function traerProductos(){
    console.log("test funcion")
    $.ajax({
        url:"http://localhost:8080/api/fragance/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    })

}
function pintarRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].reference+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td>"+respuesta[i].photography+"</td>";
        myTable+="<td> <button onclick='editarProducto("+JSON.stringify(respuesta[i].reference)+")'>Editar</button>";
        myTable+="<td> <button onclick='borrarProducto("+JSON.stringify(respuesta[i].reference)+")'>Eliminar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);   

}

function borrarProducto(referencia){
console.log(referencia)

       Swal
        .fire({
            title: "Esta seguro de eliminar el producto "+referencia,
            text: "¿Eliminar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
                // Hicieron click en "Sí"
                $.ajax({
                    url:"http://localhost:8080/api/fragance/"+referencia,
                    type:"DELETE",
                    contentType:"application/JSON",
                    datatype:"JSON",
                    success:function(respuesta){
                        $("#resultado").empty();
                        traerProductos();
                    }
                });      
                
                console.log("*se elimina la venta*");
            } else {
                // Dijeron que no
                console.log("*NO se elimina la venta*");
            }
        });
}

function editarProducto(referencia){
    console.log(referencia);
const { value: formValues } = Swal.fire({
    title: 'Actualice el Producto',
    html:
      '<input id="reference" class="swal2-input" placeholder="Referencia">' +
      '<input id="category" class="swal2-input" placeholder="Categoría">' +
      '<input id="description" class="swal2-input" placeholder="Descripción">' +
      '<input id="availability" class="swal2-input" placeholder="Disponibilidad">' +
      '<input id="price" class="swal2-input" placeholder="Precio">' +
      '<input id="quantity" class="swal2-input" placeholder="Cantidad">' +
      '<input id="photography" class="swal2-input" placeholder="URL Imagen">',
      
    focusConfirm: false,
    preConfirm: () => {
      return [
          document.getElementById('reference').value,
          document.getElementById('category').value,
          document.getElementById('description').value,
          document.getElementById('availability').value,
          document.getElementById('price').value,
          document.getElementById('quantity').value,
          document.getElementById('photography').value
          
]
}
})

if (formValues) {
Swal.fire(JSON.stringify(formValues))
}
}

function agregarProducto(){
console.log("funcion agregar")

}