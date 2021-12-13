let perfilGlobal;

const cargarPerfil = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    perfilGlobal = user;
    console.log(user);

    const perfil = user.type === 'ASE' ? 'Asesor Comercial' :
        user.type === 'COORD' ? 'Coordinador de Zona' : 'Administrador';

    const tabla = `
        <table class="table">
            <tr><th>Identificacion</th><th>Nombres</th><th>Email</th>
            <th>Perfil</th><th>Zona</th></tr>
            <body>
                <tr>
                    <td>${user.identification}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${perfil}</td>
                    <td>${user.zone}</td>
                </tr>
            </body>
        </table>
    `;

    $("#perfil").html(tabla);
    mostrarMensaje('Perfil', 'Se ha cargado el perfil');

}

$(document).ready(() => {
    cargarPerfil();
})

const mostrarMensaje = (titulo, cuerpo, error) => {
    document.getElementById("titulomensaje").innerHTML = titulo;
    $("#cuerpomensaje").html(cuerpo);
    $("#myToast").removeClass();
    if (error) {
        $("#myToast").addClass("toast bg-danger")
    } else {
        $("#myToast").addClass("toast bg-primary")
    }

    $("#myToast").toast("show");
}

const buscarProductos = () => {
    const urlbase = 'http://localhost:8080/api/gadget';

    $.ajax({
        url: `${urlbase}/all`,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            llenarTablaProductos(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            mostrarMensaje('Error', 'Error al validar', true);
        }
    });
}

const detalle = [];
let productos = [];

const llenarTablaProductos = (respuesta) => {
    productos = respuesta;

    let tabla = `
        <table class="table">
        <tr><th>Id</th><th>Brand</th><th>Category</th>
        <th>Name</th><th>Price</th></tr>
        <body>
    `;

    for(let i = 0; i<productos.length; i++){
        tabla += `
            <tr>
                <td>${productos[i].id}</td>
                <td>${productos[i].brand}</td>
                <td>${productos[i].category}</td>
                <td>${productos[i].name}</td>
                <td>${productos[i].price}</td>
                <td><button onclick="seleccionarProducto(${i})">Seleccionar</button></td>
            </tr>
        `;
    }

    tabla += `</body></table>`;
    $("#modal-body").html(tabla);
    $("#myModal").modal('show');
}

const seleccionarProducto = (indexProducto)=>{
    detalle.push(productos[indexProducto]);
    $("#myModal").modal('hide');
    actualizarTablaPedido();
}

const actualizarTablaPedido = ()=>{
    let tabla = `
        <table class="table">
            <tr><th>Nombre</th><th>Precio</th><th>Foto</th><th>Cantidad</th><tr>
        <body>
    `;

    for(let i = 0; i<detalle.length; i++){
        tabla += `
        <tr>
            <td>${detalle[i].name}</td>
            <td>${detalle[i].price}</td>
            <td><img src="${detalle[i].photography}" height="50"></td>
            <td><input type="number"></td>
        </tr>`;
    }
    tabla += `</body></table>`;
    $("#pedido").html(tabla);
}


const guardar = ()=>{
    let pedido = {
        id:1,
        status:'Pendiente',
        salesMan: perfilGlobal,
        products: {}
    };

    for(let i = 0; i<detalle.length; i++){
        pedido.products[i+1] = detalle[i]; 
    }

    console.log(pedido);

}

