const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenuBtn = document.getElementById("close-menu-btn");


menuBtn.addEventListener("click", function () {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.remove("opacity-0");
    mobileMenu.classList.remove("translate-x-full");
});

closeMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.add("opacity-0");
    mobileMenu.classList.add("translate-x-full");
});



const mobileLinks = document.querySelectorAll(".mobile-link");

mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.add("opacity-0");
        mobileMenu.classList.add("translate-x-full");
    });
});


const agendamientoActivo = true;

const formulario = document.getElementById("formulario-agendamiento");

const mensajeAgendamientoCerrado = document.getElementById("mensaje-agendamiento-cerrado");
const botonAgendamiento = document.getElementById("boton-agendamiento");
const mensajeAgendamiento = document.getElementById("mensaje-agendamiento");

if (!agendamientoActivo) {
    mensajeAgendamientoCerrado.classList.remove("hidden");
    botonAgendamiento.disabled = true;
    botonAgendamiento.classList.add("opacity-50", "cursor-not-allowed");
}


formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!agendamientoActivo) {
        alert("El agendamiento se encuentra temporalmente cerrado.");
        return;
    }
    botonAgendamiento.disabled = true;
    botonAgendamiento.textContent = "Enviando solicitud...";
    const datos = new FormData(formulario);

    const datosObjeto = Object.fromEntries(datos);
    const urlGoogleSheets = "https://script.google.com/macros/s/AKfycbwT27KMQ3b9LEbCuBKBzPAqqB4x-g_1OIbsyExaBVRDhCJIVuy5k2QfMCTTjedwXg/exec";

fetch(urlGoogleSheets, {
    method: "POST",
    headers: {
        "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(datosObjeto)
})
    .then(function () {
        formulario.reset();

        botonAgendamiento.disabled = false;
        botonAgendamiento.textContent = "Enviar Solicitud de Agendamiento";

        mensajeAgendamiento.textContent =
            "Solicitud recibida correctamente. Nos pondremos en contacto contigo para confirmar la atención.";

        mensajeAgendamiento.classList.remove("hidden");
    })
    .catch(function () {
        botonAgendamiento.disabled = false;
        botonAgendamiento.textContent = "Enviar Solicitud de Agendamiento";

        mensajeAgendamiento.textContent =
            "No pudimos enviar la solicitud. Por favor, inténtalo nuevamente.";

        mensajeAgendamiento.classList.remove("hidden");
    });
    
});
