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
    const documento = document.getElementById("documento").value.trim();
    const terminos = document.getElementById("terminos").checked;

    const P = email.toLowerCase().endsWith("@cun.edu.co");
    const Q = /^[0-9]{8,10}$/.test(documento);
    const R = terminos;

    const S = P && Q && R;

    mostrarTabla(
        "resultado",
        ["P", "Q", "R"],
        [
            "Correo institucional",
            "Número de documento válido",
            "Términos aceptados"
        ],
        [P, Q, R, S],
        "Registrar cuenta"
    );

    if(S){

        localStorage.setItem("correo", email);
        localStorage.setItem("documento", documento);

        document.getElementById("btnModulo2").disabled = false;

    }
    else{

        document.getElementById("btnModulo2").disabled = true;

    }

}

// ===============================
// MÓDULO 2
// S ↔ ((P ∧ Q) ∧ (R ∨ T))
// ===============================

function validarModulo2() {

    const password = document.getElementById("password").value;

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
        localStorage.setItem("password", password);

        document.getElementById("btnModulo3").disabled = false;
    }
    else{
        document.getElementById("btnModulo3").disabled = true;
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

        document.getElementById("btnModulo4").disabled = false;

    }
    else{

        document.getElementById("btnModulo4").disabled = true;

    }

}

// ===============================
// MÓDULO 4
// S ↔ ((P → Q) ∧ (R ∨ T))
// ===============================

function validarModulo4(){

    const P = document.getElementById("p").value === "true";
    const Q = document.getElementById("q").value === "true";
    const R = document.getElementById("r").value === "true";
    const T = document.getElementById("t").value === "true";

    const implicacion = (!P || Q);
    const S = implicacion && (R && T);

    mostrarTabla(
        "resultado",
        ["P","Q","R","T"],
        [
            "Solicita acceso al panel",
            "Tiene permisos de administrador",
            "Cuenta activa",
            "Inicio de sesión correcto"
        ],
        [P,Q,R,T,S],
        "Acceso al panel autorizado"
    );

    if(S){
        document.getElementById("btnFinalizar").disabled = false;
    }else{
        document.getElementById("btnFinalizar").disabled = true;
    }

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