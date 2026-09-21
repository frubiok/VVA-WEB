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
const textoBotonAgendamiento = document.getElementById("texto-boton-agendamiento");

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
    textoBotonAgendamiento.textContent = "⏳ Enviando solicitud...";
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
        textoBotonAgendamiento.textContent = "Enviar Solicitud de Agendamiento";

        mensajeAgendamiento.textContent =
            "Solicitud recibida correctamente. Nos pondremos en contacto contigo para confirmar la atención.";

        mensajeAgendamiento.classList.remove("hidden");
    })
    .catch(function () {
        botonAgendamiento.disabled = false;
        textoBotonAgendamiento.textContent = "Enviar Solicitud de Agendamiento";

        mensajeAgendamiento.textContent =
            "No pudimos enviar la solicitud. Por favor, inténtalo nuevamente.";

        mensajeAgendamiento.classList.remove("hidden");
    });
    
});



/* =========================================
   PILA DE FOTOGRAFÍAS VVA
   ========================================= */

/*
 * Fotografías disponibles.
 *
 * Para agregar nuevas fotografías,
 * simplemente agregarlas aquí.
 */
const fotosVVA = [
    "img/animales/vva_imagen01.png",
    "img/animales/vva_imagen02.png",
    "img/animales/vva_imagen03.png",
    "img/animales/vva_imagen04.png",
    "img/animales/vva_imagen05.png",
    "img/animales/vva_imagen06.png",
    "img/animales/vva_imagen07.png",
    "img/animales/vva_imagen08.png",
    "img/animales/vva_imagen09.png",
    

    // Próximamente:
    //"img/animales/coti.png",
    //"img/animales/perro_y_gato.jpeg"
    // "img/animales/foto-04.jpg",
    // "img/animales/foto-05.jpg"
];



const contenedorFotos = document.getElementById("pila-fotografias");

let indiceFoto = 0;
let indicePosicion = 0;



/*
 * Cantidad máxima de fotografías
 * que permanecerán visibles en la pila.
 */
const MAX_FOTOS_VISIBLES = 9;


/*
 * Posiciones controladas.
 *
 * La idea es que parezca una pila real,
 * pero sin que las fotografías se dispersen.
 */
const posicionesFotos = [
    { x: "-40px", y: "0px"   },
    { x: "40px",  y: "0px"   },
    { x: "-20px", y: "-20px" },
    { x: "30px",  y: "-20px" }
];

/*
 * Agrega una fotografía a la pila.
 */
function agregarFotografia() {

    if (!contenedorFotos || fotosVVA.length === 0) {
        return;
    }


    /*
     * Crear el marco de la fotografía.
     */
    const foto = document.createElement("div");

    foto.className = "foto-pila";

    const irregularidad = () => Math.random() * 1 - 0.5;
    const clip = `
        polygon(
            ${irregularidad()}% 1%,
            24% ${irregularidad()}%,
            50% ${irregularidad()}%,
            76% ${irregularidad()}%,
            100% ${irregularidad()}%,

            99% 25%,
            ${100 + irregularidad()}% 50%,
            99% 75%,

            100% 100%,
            75% ${99 + irregularidad()}%,
            50% 100%,
            25% ${99 + irregularidad()}%,
            ${irregularidad()}% 100%,

            1% 75%,
            ${irregularidad()}% 50%,
            1% 25%
        )
    `;

    foto.style.clipPath = clip;


    /*
     * Seleccionar una posición.
     */
    const posicion =
        posicionesFotos[indicePosicion % posicionesFotos.length];

    const rotacion = (Math.random() * 10 - 5).toFixed(2);


    foto.style.setProperty("--foto-x", posicion.x);
    foto.style.setProperty("--foto-y", posicion.y);
    foto.style.setProperty("--foto-rot", `${rotacion}deg`);


    /*
     * La fotografía nueva siempre queda
     * encima de las anteriores.
     */
    foto.style.zIndex = contenedorFotos.children.length + 1;


    /*
     * Crear la imagen.
     */
    //const imagen = document.createElement("img");
    //imagen.src = fotosVVA[indiceFoto];
    //imagen.alt = "Mascota feliz y saludable";

    /*
     * Agregar la imagen al marco.
     */
    //foto.appendChild(imagen);

    foto.style.backgroundImage = `url("${fotosVVA[indiceFoto]}")`;
    foto.style.backgroundSize = "cover";
    foto.style.backgroundPosition = "center";


    /*
     * Agregar la fotografía a la pila.
     */
    contenedorFotos.appendChild(foto);

    foto.classList.add("cayendo");
    
    /*
     * Mantener solamente las últimas
     * cuatro fotografías.
     */
    while (contenedorFotos.children.length > MAX_FOTOS_VISIBLES) {

        contenedorFotos.removeChild(
            contenedorFotos.firstElementChild
        );
    }


    /*
     * Pasar a la siguiente fotografía.
     */
    indiceFoto++;

    if (indiceFoto >= fotosVVA.length) {
        indiceFoto = 0;
    }

    indicePosicion++;

    if (indicePosicion >= posicionesFotos.length) {
        indicePosicion = 0;
    }
}


/*
 * Mostrar la primera fotografía inmediatamente.
 */
agregarFotografia();


/*
 * Cada 5 segundos se deposita
 * una nueva fotografía sobre la pila.
 */
setInterval(() => {

    agregarFotografia();

}, 5000);

