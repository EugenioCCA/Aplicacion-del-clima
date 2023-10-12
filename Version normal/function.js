class AplicacionClima {
    constructor() {
        this.climaData = [];
        this.diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        this.ciudad = document.getElementById("ciudades");
        this.opcionesCiudad = document.getElementById("opcionesCiudad");
        this.mostrarTablaButton = document.getElementById('mostrarTablaButton');
        this.popup = document.getElementById('popup');
        this.tablaClima = document.getElementById('tablaClima');
        this.editableCells = document.getElementsByClassName('editable-cell');
        this.cerrarPopup = document.getElementById('cerrarPopup');
        this.enviarPopup = document.getElementById('enviarPopup');

        this.ciudad.addEventListener("change", () => {
            const ciudadActual = this.ciudad.value;
            this.opcionesCiudad.getElementsByTagName("h4")[0].textContent = "Clima en: " + ciudadActual;
        });

        this.mostrarTablaButton.addEventListener('click', () => this.mostrarTabla());

        this.cerrarPopup.addEventListener('click', () => this.cerrarVentanaEmergente());

        this.enviarPopup.addEventListener('click', () => this.calcularClima());
    }

    mostrarTabla() {
        // Abre la ventana emergente
        this.popup.style.display = 'block';

        while (this.tablaClima.rows.length > 1) {
            this.tablaClima.deleteRow(1);
        }

        // Llena la tabla con los días de la semana
        for (let i = 0; i < this.diasSemana.length; i++) {
            const fila = this.tablaClima.insertRow(-1);
            const celdaDia = fila.insertCell(0);
            const celdaManana = fila.insertCell(1);
            const celdaTarde = fila.insertCell(2);
            const celdaNoche = fila.insertCell(3);

            celdaDia.innerHTML = this.diasSemana[i];
            celdaManana.innerHTML = '<input type="text" class="editable-cell" placeholder = "ej. 35.5 ">';
            celdaTarde.innerHTML = '<input type="text" class="editable-cell">';
            celdaNoche.innerHTML = '<input type="text" class="editable-cell">';
        }
    }

    cerrarVentanaEmergente() {
        // Cierra la ventana emergente
        this.popup.style.display = 'none';
    }

    calcularClima() {
        this.climaData = [];
        for (let i = 0; i < this.editableCells.length; i++) {
            const valor = parseFloat(this.editableCells[i].value);
            if (isNaN(valor)) {
                alert('Hay celdas vacías, por favor rellene todas las celdas');
                return;
            }
            this.climaData.push(valor);
        }

        const climaPromedio = this.climaData.reduce((acc, val) => acc + val, 0) / this.climaData.length;
        const climaMenor = Math.min(...this.climaData);
        const climaMayor = Math.max(...this.climaData);

        this.opcionesCiudad.getElementsByTagName("h1")[0].textContent = climaPromedio.toFixed(1) + "°C";
        this.opcionesCiudad.getElementsByTagName("p")[0].textContent = "Max: " + climaMayor + "°C";
        this.opcionesCiudad.getElementsByTagName("p")[1].textContent = "Min: " + climaMenor + "°C";

        if (climaPromedio < 25) {
            document.body.style.backgroundImage = "url('imagenes/nublado.jpg')";
            document.body.style.backgroundSize = "cover";
            document.getElementById("principal").style.backgroundColor = "rgba(78, 92, 105, 0.4)";
        } else {
            document.body.style.backgroundImage = "url('imagenes/soleado.jpeg')";
            document.body.style.backgroundSize = "cover";
            document.getElementById("principal").style.backgroundColor = "rgba(104, 158, 212, 0.7)";
            document.getElementById("principal").style.color = "black";
        }

        alert('Valores de clima guardados: ');
        this.popup.style.display = 'none';

        for (let i = 0; i < this.editableCells.length; i++) {
            this.editableCells[i].value = '';
        }
    }
}

// Crea una instancia de la clase AplicacionClima para iniciar la aplicación
const aplicacionClima = new AplicacionClima();
