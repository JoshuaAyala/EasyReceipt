<?php

require_once('connection.php');

// Obtener los datos enviados desde JavaScript
$newUser = json_decode(file_get_contents("php://input"));

// Obtener los datos del usuario enviados por AJAX
$newUser = json_decode(file_get_contents("php://input"));

if ($newUser == null || json_last_error() !== JSON_ERROR_NONE) {
    // Enviar respuesta de error al usuario en formato JSON
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(array("error" => "Los datos enviados no son válidos."));
    exit();
}

// Verificar que los campos requeridos estén definidos y no estén vacíos
if (!isset($newUser->username) || empty($newUser->username) || !isset($newUser->password) || empty($newUser->password)) {
    $error = "Los campos no pueden estar vacíos";
    echo json_encode(array("success" => false, "message" => $error));
    exit();
}

// Obtener los datos del objeto JSON
$name = $newUser->name;
$username = $newUser->username;
$password = $newUser->password;
$phone = $newUser->phone;

// Encriptar la contraseña
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Preparar la consulta SQL para insertar un nuevo usuario
$sql = "INSERT INTO Usuarios (name, username, password, phone) VALUES ('$name', '$username', '$hashedPassword', '$phone')";

// Ejecutar la consulta y verificar si se insertó el nuevo usuario correctamente
if (mysqli_query($conn, $sql)) {
    $response = array("success" => true);
} else {
    $response = array("success" => false, "message" => mysqli_error($conn));
}

// Devolver la respuesta como un objeto JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
