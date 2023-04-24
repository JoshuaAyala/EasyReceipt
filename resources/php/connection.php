<?php
// Declaración de variables para la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "easyreceipt";

// Crear conexión a la base de datos utilizando la clase mysqli de PHP
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar si la conexión se realizó correctamente
if ($conn->connect_error) {
  die("La conexión a la base de datos falló: " . $conn->connect_error);
}

?>