function login(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMsg = document.querySelector('#error-msg');
    const userdata = {
        username: usernameInput,
        password: passwordInput
    };

    fetch('../easyreceipt/resources/php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '../easyreceipt/home.php';
            } else {
                console.log(userdata);
                errorMsg.style.display = 'block';
                errorMsg.textContent = data.message;
                usernameInput.value = '';
                passwordInput.value = '';
                

                // Ocultar mensaje de error después de 3 segundos
                setTimeout(() => {
                    errorMsg.style.display = 'none';
                }, 3000);
            }
        })
        .catch(error => console.error(error));
}
