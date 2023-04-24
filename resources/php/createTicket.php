<?php

require_once('connection.php');

// Recibe los datos del ticket en formato JSON
$ticket = json_decode(file_get_contents('php://input'), true);

// Verificar si se pudo decodificar correctamente el JSON
if ($ticket === null && json_last_error() !== JSON_ERROR_NONE) {
    // Enviar respuesta de error al cliente en formato JSON
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(array("error" => "Los datos enviados no son válidos."));
    exit();
}


// Inserta los datos del ticket en la tabla correspondiente de la base de datos
$sql = "INSERT INTO tickets (no_client, eco_contr, name, username, serie, folio, serv_no, date, price, hour, quantity, descripcion, importe, importe_text, regimen_fiscal)
VALUES ('" . $ticket['no_client'] . "', '" . $ticket['eco_contr'] . "', '" . $ticket['name'] . "', '" . $ticket['username'] . "', '" . $ticket['serie'] . "', '" . $ticket['folio'] . "', '" . $ticket['serv_no'] . "', '" . $ticket['date'] . "', '" . $ticket['price'] . "', '" . $ticket['hour'] . "', '" . $ticket['quantity'] . "', '" . $ticket['descripcion'] . "', '" . $ticket['importe'] . "', '" . $ticket['importe_text'] . "', '" . $ticket['regimen_fiscal'] . "')";

if ($conn->query($sql) === TRUE) {
  echo "Ticket guardado correctamente";
} else {
  echo "Error al guardar el ticket: " . $conn->error;
}

$conn->close();

?>
