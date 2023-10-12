var nombre = document.getElementById("nombreLugar");
        const mostrarTablaButton = document.getElementById('mostrarTablaButton');
        const popup = document.getElementById('popup');
        const cerrarPopup = document.getElementById('cerrarPopup');
        const tablaClima = document.getElementById('tablaClima');
        const enviarPopup = document.getElementById('enviarPopup');
        const editableCells = document.getElementsByClassName('editable-cell');
        const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        let climaData = [];

        const ciudad = document.getElementById("ciudades");
        const opcionesCiudad = document.getElementById("opcionesCiudad");

        ciudad.addEventListener("change", function () {
            const ciudadActual = ciudad.value;

            opcionesCiudad.getElementsByTagName("h4")[0].textContent = "Clima en: " + ciudadActual;
        });

        mostrarTablaButton.addEventListener('click', function () {
            // Abre la ventana emergente
            popup.style.display = 'block';

            // Llena la tabla con los días de la semana
            for (let i = 0; i < diasSemana.length; i++) {
                const fila = tablaClima.insertRow(-1);
                const celdaDia = fila.insertCell(0);
                const celdaManana = fila.insertCell(1);
                const celdaTarde = fila.insertCell(2);
                const celdaNoche = fila.insertCell(3);

                celdaDia.innerHTML = diasSemana[i];
                celdaManana.innerHTML = '<input type="text" class="editable-cell" placeholder = "ej. 35.5 ">';
                celdaTarde.innerHTML = '<input type="text" class="editable-cell">';
                celdaNoche.innerHTML = '<input type="text" class="editable-cell">';
            }
        });

        cerrarPopup.addEventListener('click', function () {
            // Cierra la ventana emergente
            popup.style.display = 'none';
        });

        enviarPopup.addEventListener('click', function () {
            // Guardar los valores ingresados en una matriz
            climaData = [];
            for (let i = 0; i < editableCells.length; i++) {
                climaData.push(parseFloat(editableCells[i].value));
            }

            //calcular el promedio de los datos
            const climaPromedio = climaData.reduce((acc, val) => acc + val, 0) / climaData.length;

            //encontrar el valor mas bajo
            const climaMenor = Math.min(...climaData);

            //encontrar el valor mayor
            const climaMayor = Math.max(...climaData);

            //console.log(climaPromedio.toFixed(1));
            //console.log(climaMayor);
            //console.log(climaMenor);

            opcionesCiudad.getElementsByTagName("h1")[0].textContent = climaPromedio.toFixed(1) + "°C";
            opcionesCiudad.getElementsByTagName("p")[0].textContent = "Max: " + climaMayor + "°C";
            opcionesCiudad.getElementsByTagName("p")[1].textContent = "Min: " + climaMenor + "°C";



            // Mostrar un mensaje de valores guardados
            alert('Valores de clima guardados: ');

            // Cierra la ventana emergente
            popup.style.display = 'none';

            // Reiniciar los valores de las celdas
            for (let i = 0; i < editableCells.length; i++) {
                editableCells[i].value = '';
            }
        });
