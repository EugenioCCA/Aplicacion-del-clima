const mostrarTablaButton = document.querySelector('#principal input[type="submit"]');
    const popup = document.getElementById('popup');
    const cerrarPopup = document.getElementById('cerrarPopup');

    mostrarTablaButton.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    cerrarPopup.addEventListener('click', function() {
        popup.style.display = 'none';
    });