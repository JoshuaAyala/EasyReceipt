<?php

include_once("connection.php");

$username = $_GET['username'];

// Realizar la consulta en la tabla usuarios
$sql = "SELECT * FROM usuarios WHERE username = '$username'";
$result = $conn->query($sql);

// Devolver la respuesta como un objeto JSON
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Devolver el resultado como JSON
    header('Content-Type: application/json');
    echo json_encode($row);
} else {
    echo json_encode(array("exists" => false));
}

$conn->close();
?>