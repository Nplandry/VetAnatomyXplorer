// Seleccionar el div movible
var ventana = document.getElementById('ventana');

// Variables para el seguimiento del movimiento
var isMouseDown = false;
var offsetX, offsetY;

// Función para manejar el clic en la barra de título
document.getElementById('barra-titulo').addEventListener('mousedown', function(e) {
    isMouseDown = true;
    offsetX = e.clientX - ventana.getBoundingClientRect().left;
    offsetY = e.clientY - ventana.getBoundingClientRect().top;
});

// Función para manejar el movimiento del mouse
document.addEventListener('mousemove', function(e) {
    if (isMouseDown) {
        // Mover el div con el mouse
        ventana.style.left = e.clientX - offsetX + 'px';
        ventana.style.top = e.clientY - offsetY + 'px';
    }
});

// Función para manejar la liberación del clic
document.addEventListener('mouseup', function() {
    isMouseDown = false;
});
