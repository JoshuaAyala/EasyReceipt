// Se buscan todos los elementos del documento que contengan la clase ".nav-link"
const navLinks = document.querySelectorAll('.nav-link');

// Añadir un event listener a cada botón
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remover la clase active de todos los botones
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        // Agregar la clase active al botón clickeado
        link.classList.add('active');
    });
});

// Cuando el documento esté listo, se ejecutará la siguiente función
$(document).ready(function (e) {

    // Al hacer clic en el botón "Inicio", se cargará la página "home.html" en el elemento con ID "content"
    $('#tickets').click(function () {
        $('#content').attr('src', 'tickets.html');
    });

    // Al hacer clic en el botón "Factura", se cargará la página "facturas.html" en el elemento con ID "content"
    $('#clientes').click(function () {
        $('#content').attr('src', 'clientes.html');
    });

    // Al hacer clic en el botón "Alta Factura", se cargará la página "altafacturas.html" en el elemento con ID "content"
    $('#configuracion').click(function () {
        $('#content').attr('src', 'configuracion.html');
    });
});
