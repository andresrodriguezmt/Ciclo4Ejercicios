
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

const iniciarSesion = ()=>{
    const email = $("#txtEmail").val();
    const clave = $("#txtClave").val();

    if (email.length===0 || clave.length===0){
        mostrarMensaje('Error', 'Debe proporcionar email/password', true);
        return;
    }

    const urlbase = 'http://localhost:8080/api/user';

    $.ajax({
        url: `${urlbase}/${email}/${clave}`,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            if (respuesta===null || respuesta.id===null){
                mostrarMensaje('Error', 'Usuario y/o clave incorrectos', true);
            }else if (respuesta.id!==null){
                mostrarMensaje('Confirmacion', 'Autenticacion correcta', false);
                //sesionStorage
                //localStorage
                const objetocomotexto = JSON.stringify(respuesta);
                console.log(objetocomotexto);
                sessionStorage.setItem("user", objetocomotexto);
                window.location.href = 'nuevopedido.html';
            }
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            mostrarMensaje('Error', 'Error al validar', true);
        }
    });

}