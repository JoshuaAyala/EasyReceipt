// Obtener los datos del formulario
const name = document.getElementById("name").value;
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const phone = document.getElementById("phone").value;

// Crear un objeto JSON con los datos del nuevo usuario
const nuevoUsuario = {
    name: name,
    username: username,
    password: password,
    phone: phone
};

// Enviar el objeto JSON al servidor utilizando fetch()
fetch('crearUsuario.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error(error);
});
