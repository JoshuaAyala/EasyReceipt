const input = document.getElementById('username');
const passwordinput = document.querySelector("#password")
const errorDiv = document.querySelector("#username-error")
input.addEventListener('input', () => {
    const value = input.value;

    fetch(`../EasyReceipt/resources/php/listenUser.php?username=${value}`)
        .then(response => response.json())
        .then(data => {
            if (!data.username) {
                errorDiv.style.display = 'block';
            } else {
                errorDiv.style.display = 'none';
            }
        })
        .catch(error => console.error(error));
});
