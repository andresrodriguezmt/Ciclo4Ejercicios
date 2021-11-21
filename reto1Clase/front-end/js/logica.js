const urlbase = 'http://localhost:8080/api/empresa';

const crear = () => {
    //document.getElementById('txtNombre').value;
    const nombre = $('#txtNombre').val();
    const nit = $('#txtNit').val();
    const clave = $('#txtClave').val();
    const confirmar = $('#txtConfirmarClave').val();

    if (clave !== confirmar) {
        mostrarMensaje('Error', 'Las claves no coinciden', true);
        return;
    } else if (clave.length < 6) {
        mostrarMensaje('Error', 'La clave debe tener minimo 6 caracteres', true);
        return;
    }

    const payload = {
        nombre: nombre,
        nit: nit,
        clave: clave
    };

    $.ajax({
        url: `${urlbase}/new`,
        type: "POST",
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(payload),
        statusCode: {
            201: function () {
                mostrarMensaje('Confirmacion', 'Empresa Creada');
                //alert('Empresa Creada');
            }
        },
    });
}

const mostrarMensaje = (titulo, cuerpo, error) => {
    //console.log("error",error);
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

const iniciarSesion = () => {
    const loading = '<img src="images/spinner.gif">';
    $("#loading").html(loading);

    setTimeout(()=>{
        autenticar();
    }, 2000);
}

const autenticar = ()=>{
    const nit = $("#txtNit").val();
    const clave = $("#txtClave").val();

    if (nit.length === 0 || clave.length === 0) {
        mostrarMensaje('Error', 'Debe escribir el nit y la clave para ingresar', true);
        $("#loading").html("");
        return;
    }

    $.ajax({
        url: `${urlbase}/${nit}/${clave}`,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            $("#loading").html("");
            console.log(respuesta);
            if (respuesta.id===null){
                mostrarMensaje('Error', 'Usuario y/o clave incorrectos', true);
            }else{
                mostrarMensaje('Error', 'Ingreso Correcto');

                setTimeout(()=>{
                    window.location.href = 'menu.html';
                }, 1000);
                
            }
        },
        error: function (xhr, status) {
            $("#loading").html("");
            console.log(xhr);
            console.log(status);
            mostrarMensaje('Error', 'Error al validar', true);
        }
    });

}


