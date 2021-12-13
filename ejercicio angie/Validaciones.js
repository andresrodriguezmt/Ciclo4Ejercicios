$(document).ready(function () {
    $("#BotonBuscar").click(function () {
        fillTable()
    })
})

function fillTable() {
    let zone = $("#zona").val();
    let url = "http://localhost:8080/api/order/zona/"
    $.ajax({
        url: `${url}${zone}`,
        type: "GET",
        success: function (data) {
            $("#TableCoord tbody").empty()


            let fillTable;
            // hara un for each por cada orden dentro de la zona
            //tomamos el id fecha de la orden y lo ponemos en la tabla
            data.forEach(order => {
                
                
                for (let i in order.products) {
                    let idOrder = order.id;
                    let date = order.registerDay;
                    let status = order.status;
                    fillTable += `<tr><td>${idOrder}</td><td>${date}</td><td>${status}</td><td>`;
    
                    delete order.salesMan.id
                    delete order.salesMan.birthDay;
                    delete order.salesMan.monthBirthDay;
                    delete order.salesMan.address;
                    delete order.salesMan.cellPhone;
                    delete order.salesMan.email;
                    delete order.salesMan.password;
                    let name = order.salesMan.name
                    let identity = order.salesMan.identification;
                    let zone = order.salesMan.zone;
                    let type = order.salesMan.type
                    let ase = `${name}, ${identity}, ${zone}, ${type}.`;
                    fillTable += `${ase}</td><td>`;
                    // delete order.products[i]["quantity"];
                    delete order.products[i]["photography"];
                    // delete order.products[i]["availability"];
                    delete order.products[i]["id"];
                    let brand, category, nameProduct, description, precio, availability, quantity;
                    brand = order.products[i].brand;//nombres del back a la derecha
                    nameProduct = order.products[i].name;
                    description = order.products[i].description;
                    category = order.products[i].category;
                    precio = order.products[i].price;
                    availability = order.products[i].availability == true ? "Si" : "No";
                    quantity = order.products[i].quantity;
                    let product = `${brand}, ${nameProduct}, ${category},
                    ${description}, ${availability}, ${quantity} y Precio: ${precio}.`;
                    fillTable += `${product}</td><td>`;


                     
                    fillTable += `${order.quantities[i]}</td><td><button class="btn btn-outline-primary" onclick="editOrder(${idOrder})">Editar</button></td></tr>`;
                    


                }
                //append
                $("#TableCoord tbody").empty()
                $("#TableCoord tbody").append(fillTable)
            })
        }

    })


}

function editOrder(idOrder) {
    let status = $("#status").val()
    let url = "http://localhost:8080/api/order/update"
    let dataToSend = { id: idOrder, status: status }
    dataToSend = JSON.stringify(dataToSend)
    alert(dataToSend)
    $.ajax({
        url: `${url}`,
        type: "PUT",
        data: dataToSend,//convertirlo Json a String
        datatype: "JSON",
        contentType: "application/json",
        success: function (data) {
            alert(JSON.stringify(data))
        }
    })
}