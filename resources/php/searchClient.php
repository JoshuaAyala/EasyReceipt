<?php

include_once("connection.php");

// Obtener el valor de no_client proporcionado por el usuario
$no_client = $_POST['no_client'];

// Consultar la tabla cliente utilizando el valor de no_client
$sql = "SELECT * FROM cliente WHERE no_client = $no_client";
$result = $conn->query($sql);

// Verificar si se encontró algún resultado
if ($result->num_rows > 0) {
  // Obtener el registro
  $row = $result->fetch_assoc();
  // Devolver el resultado como JSON
  header('Content-Type: application/json');
  echo json_encode($row);
} else {
  // No se encontró ningún resultado para el no_client proporcionado
  echo "No se encontró ningún cliente con el número de cliente proporcionado.";
}

// Cerrar conexión
$conn->close();
?>