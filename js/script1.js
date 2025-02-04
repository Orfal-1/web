// script.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("presupuestoForm");

    // Validación de datos de contacto
    form.addEventListener("input", function (event) {
        const target = event.target;

        if (target.id === "nombre") {
            validateText(target, /^[A-Za-z]+$/, 15);
        } else if (target.id === "apellidos") {
            validateText(target, /^[A-Za-z\s]+$/, 40);
        } else if (target.id === "telefono") {
            validateText(target, /^[0-9]+$/, 9);
        } else if (target.id === "email") {
            validateEmail(target);
        }

        // Calcular presupuesto en tiempo real
        calculateTotal();
    });

    function validateText(input, regex, maxLength) {
        const isValid = regex.test(input.value) && input.value.length <= maxLength;
        input.setCustomValidity(isValid ? "" : "Valor no válido");
    }

    function validateEmail(input) {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const isValid = regex.test(input.value);
        input.setCustomValidity(isValid ? "" : "Correo electrónico no válido");
    }

    // Calcular el presupuesto total
    function calculateTotal() {
        let total = 0;

        // Obtener precio del producto seleccionado
        const producto = document.getElementById("producto");
        if (producto.value) {
            total += parseInt(producto.value);
        }

        // Calcular descuento por plazo
        const plazo = document.getElementById("plazo").value;
        if (plazo) {
            const descuento = Math.max(0, Math.min(20, plazo * 2)); // Descuento del 2% por mes, hasta un máximo de 20%
            total -= (total * descuento) / 100;
        }

        // Sumar los extras seleccionados
        const extras = document.querySelectorAll('input[name="extras"]:checked');
        extras.forEach(extra => {
            total += parseInt(extra.value);
        });

        // Mostrar el total en el campo de presupuesto
        document.getElementById("total").value = `$${total.toFixed(2)}`;
    }

    // Validar y enviar formulario
    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            alert("Por favor, complete correctamente todos los campos.");
        }
    });
});
