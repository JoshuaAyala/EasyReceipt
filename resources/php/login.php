<?php
session_start();

// Obtener los datos del usuario enviados por AJAX
$userdata = json_decode(file_get_contents("php://input"));

if ($userdata == null || json_last_error() !== JSON_ERROR_NONE) {
    // Enviar respuesta de error al usuario en formato JSON
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(array("error" => "Los datos enviados no son válidos."));
    exit();
}

// Verificar que los campos requeridos estén definidos y no estén vacíos
if (!isset($userdata->username) || empty($userdata->username) || !isset($userdata->password) || empty($userdata->password)) {
    $error = "Los campos no pueden estar vacíos";
    echo json_encode(array("success" => false, "message" => $error));
    exit();
}


require_once('connection.php');

$query = "SELECT * FROM usuarios WHERE username = '$userdata->username'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);

    if (password_verify($userdata->password, $row['password'])) {
        $_SESSION['username'] = $row['username'];
        $_SESSION['name'] = $row['name'];
        $activeUser = $_SESSION['username'];
        echo json_encode(array("success" => true));
        exit();
    }
}

$error = "Credenciales no válidas";
echo json_encode(array("success" => false, "message" => $error));
