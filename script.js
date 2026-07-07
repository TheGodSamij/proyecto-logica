// ===============================
// script.js - Proyecto de Lógica Proposicional
// ===============================

// Genera la tabla de resultados
function mostrarTabla(resultadoId, variables, descripciones, valores, tituloS) {

    const S = valores[valores.length - 1];
    const clase = S ? "tabla tabla-aprobada" : "tabla tabla-rechazada";

    let html = `
    <table class="${clase}">
        <tr>
            <th>Variable</th>
            <th>Descripción</th>
            <th>Valor</th>
        </tr>`;

    for (let i = 0; i < variables.length; i++) {
        html += `
        <tr>
            <td>${variables[i]}</td>
            <td>${descripciones[i]}</td>
            <td><strong>${valores[i] ? "V" : "F"}</strong></td>
        </tr>`;
    }

    html += `
        <tr>
            <td><strong>S</strong></td>
            <td><strong>${tituloS}</strong></td>
            <td><strong>${S ? "V" : "F"}</strong></td>
        </tr>
    </table>`;

    document.getElementById(resultadoId).innerHTML = html;

    return S;
}

// ===============================
// MÓDULO 1
// S ↔ (P ∧ Q ∧ R)
// ===============================

function validarModulo1() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const terminos = document.getElementById("terminos").checked;

    const P = email.toLowerCase().endsWith("@cun.edu.co");
    const Q = password.length >= 8;
    const R = terminos;

    const S = P && Q && R;

    mostrarTabla(
        "resultado",
        ["P", "Q", "R"],
        [
            "Correo institucional",
            "Contraseña válida",
            "Términos aceptados"
        ],
        [P, Q, R, S],
        "Registrar cuenta"
    );

    if (S) {

        localStorage.setItem("correo", email);
        localStorage.setItem("password", password);

        setTimeout(() => {

            window.location.href = "modulo2.html";

        }, 1200);

    }

}

// ===============================
// MÓDULO 2
// S ↔ ((P ∧ Q) ∧ (R ∨ T))
// ===============================

function validarModulo2() {

    const password = localStorage.getItem("password") || "";

    const P = /[A-Z]/.test(password);
    const Q = /\d/.test(password);
    const R = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const T = password.length >= 12;

    const S = (P && Q) && (R || T);

    mostrarTabla(
        "resultado",
        ["P", "Q", "R", "T"],
        [
            "Tiene mayúscula",
            "Tiene número",
            "Tiene símbolo",
            "12 o más caracteres"
        ],
        [P, Q, R, T, S],
        "Contraseña segura"
    );

    if (S) {

        setTimeout(() => {

            window.location.href = "modulo3.html";

        }, 1200);

    }

}

// ===============================
// MÓDULO 3
// S ↔ ((P ∧ Q) ∧ ¬R)
// ===============================

function validarModulo3() {

    const P = document.getElementById("p").value === "true";
    const Q = document.getElementById("q").value === "true";
    const R = document.getElementById("r").value === "true";

    const S = (P && Q) && !R;

    mostrarTabla(
        "resultado",
        ["P", "Q", "R"],
        [
            "Usuario autenticado",
            "Cuenta activa",
            "Cuenta bloqueada"
        ],
        [P, Q, R, S],
        "Acceso autorizado"
    );

    if (S) {

        setTimeout(() => {

            window.location.href = "modulo4.html";

        }, 1200);

    }

}

// ===============================
// MÓDULO 4
// S ↔ ((P → Q) ∧ (R ∨ T))
// ===============================

function validarModulo4(P, Q, R, T) {

    const implicacion = (!P || Q);

    return implicacion && (R || T);

}

// ===============================
// RESUMEN
// ===============================

function cargarResumen() {

    const correo = localStorage.getItem("correo") || "No disponible";

    const elemento = document.getElementById("correo");

    if (elemento) {

        elemento.textContent = correo;

    }

}

function reiniciarSistema() {

    localStorage.clear();

    window.location.href = "index.html";

}