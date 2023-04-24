let ticket
function createTicket() {
    const no_client = document.getElementById("no_client").value;
    const date = new Date().toISOString().slice(0, 10);
    const username = '<?php echo $activeUser ?>';
    const serie = document.getElementById("serie").value;
    const folio = document.getElementById("folio").value;
    const serv_no = document.getElementById("serv_no").value;
    const price = document.getElementById("price").value;
    const hour = document.getElementById("hour").value;
    const quantity = document.getElementById("quantity").value;
    const importe = document.getElementById("importe").value;
    const importe_text = NumeroALetras(importe);
    const regimen_fiscal = document.getElementById("regimen_fiscal").value;

    // Hacer una solicitud POST al archivo PHP para obtener los datos del cliente
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Convertir la respuesta del servidor de JSON a un objeto JavaScript
            const cliente = JSON.parse(this.responseText);

            // Crear un objeto ticket con los datos del cliente
            let ticket = {
                no_client: no_client,
                eco_contr: cliente.eco_contr,
                name: cliente.name,
                username: username,
                serie: serie,
                folio: folio,
                serv_no: serv_no,
                date: date,
                price: price,
                hour: hour,
                quantity: quantity,
                descripcion: "GAS LP",
                importe: importe,
                importe_text: importe_text,
                regimen_fiscal: regimen_fiscal
            };
            // Hacer una solicitud POST al archivo PHP para guardar el ticket en la base de datos
            const xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // La respuesta del servidor es la ID del nuevo ticket creado en la base de datos
                    const ticketID = this.responseText;
                    console.log(`Ticket guardado en la base de datos con ID: ${ticketID}`);
                }
            };
            xhttp2.open("POST", "guardarTicket.php", true);
            xhttp2.setRequestHeader("Content-type", "application/json");
            xhttp2.send(JSON.stringify(ticket));
        }
    };
    xhttp.open("POST", "../EasyReceipt/resources/searchClient.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("no_client=" + no_client);
}

function Unidades(num){
    switch(num)
    {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }
    return "";
}

function Decenas(num){
    decena = Math.floor(num/10);
    unidad = num - (decena * 10);
    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch(unidad)
            {
                case 0: return "VEINTE";
                default: return "VEINTI" + Unidades(unidad);
            }
        case 3: return DecenasY("TREINTA", unidad);
        case 4: return DecenasY("CUARENTA", unidad);
        case 5: return DecenasY("CINCUENTA", unidad);
        case 6: return DecenasY("SESENTA", unidad);
        case 7: return DecenasY("SETENTA", unidad);
        case 8: return DecenasY("OCHENTA", unidad);
        case 9: return DecenasY("NOVENTA", unidad);
        case 0: return Unidades(unidad);
    }
}

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)
    return strSin;
}

function Centenas(num) {
    centenas = Math.floor(num / 100);
    decenas = num - (centenas * 100);
    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }
    return Decenas(decenas);
}

function Seccion(num, divisor, strSingular, strPlural) {
    var cientos = Math.floor(num / divisor);
    var resto = num - (cientos * divisor);

    var letras = "";

    if (cientos > 0) {
        if (cientos > 1) {
            letras = Centenas(cientos) + " " + strPlural;
        } else {
            letras = strSingular;
        }
    }

    if (resto > 0) {
        letras += "";
    }

    return letras;
}

function Miles(num) {
    var divisor = 1000;
    var cientos = Math.floor(num / divisor);
    var resto = num - (cientos * divisor);

    var strMiles = Seccion(num, divisor, "UN MIL", "MIL");
    var strCentenas = Centenas(resto);

    if (strMiles == "") {
        return strCentenas;
    }

    return strMiles + " " + strCentenas;
}

function Millones(num) {
    var divisor = 1000000;
    var cientos = Math.floor(num / divisor);
    var resto = num - (cientos * divisor);

    var strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    var strMiles = Miles(resto);

    if (strMillones == "") {
        return strMiles;
    }

    return strMillones + " " + strMiles;
}

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: 'PESOS', // "PESOS", "Dólares", "Bolívares", etc.
        letrasMonedaSingular: 'PESO', // "PESO", "Dólar", "Bolivar", etc.

        letrasMonedaCentavoPlural: "CENTAVOS",
        letrasMonedaCentavoSingular: "CENTAVO"
    };

    if (data.centavos > 0) {
        data.letrasCentavos = " " + data.centavos.toString().padStart(2, '0') + "/" + "100";
    }

    if (data.enteros == 0) {
        return "CERO " + data.letrasMonedaPlural + data.letrasCentavos + " M.N.";
    } else if (data.enteros == 1) {
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + data.letrasCentavos + " M.N.";
    } else {
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + data.letrasCentavos + " M.N.";
    }
}
