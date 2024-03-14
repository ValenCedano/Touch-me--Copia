import '../styles/home.scss';
import Swal from 'sweetalert2';


import {
    getUser,
    getUserChat,
}from "../services/getInfoUser";

import {
    toggleModal,
}from "../services/modalEdition";
import endpoints from '../services/data';

const { DateTime } = require("luxon");

//const idProducto = JSON.parse(localStorage.getItem("idProduct"))
let user;
let chat;
const idUser = "13e45i";

const image_profile = document.querySelector(".image_profile");
const section_chats = document.querySelector(".section_contenido");
const modal = document.querySelector(".modalCart");
const closeButton = document.getElementById("closeModal");
const editarTexto = document.querySelector(".modificarNombre");

console.log(modal);
console.log(section_chats);

const insertarImagenPerfil= (url) => {
    const figura = document.createElement('figure');
    const imagen = document.createElement('img');
    imagen.src = url;
    imagen.alt = 'Imagen secundaria';
    figura.appendChild(imagen);
    image_profile.appendChild(figura);
};

const seccionTexto = (contenedor,listaUsuarios) => {
    user = Array.from(listaUsuarios);
    let index = listaUsuarios.findIndex((item) => {
        return item.id === idUser;
    });
    contenedor.innerHTML = "";
    contenedor.innerHTML += `
    <h4>Tu nombre</h4>
    <div class="edicion">
    <p id="nombreUsuario">${user[index].name}</p>
    <button class="botonEditarNombre">
    <i class="fa-solid fa-pencil" style="color:black;"></i
    </button>
    </div>`
};

const insertarChats = (contenedor,listaChats, listaUsuarios) => {
    contenedor.innerHTML = "";
    listaChats.forEach(element => {
        let idSendUser = element.sendUser;
        user = Array.from(listaUsuarios);
        let index = listaUsuarios.findIndex((item) => {
            return item.id === idSendUser;
        });
        const ultimoMensaje = element.conversations[element.conversations.length - 1];
        const fechaHoraUltimoMensaje = `${ultimoMensaje.date}T${ultimoMensaje.hour}`;
        
        // Parsea la fecha y hora utilizando Luxo
        
        const dateTimeUltimoMensaje = DateTime.fromISO(fechaHoraUltimoMensaje);
                // Obtiene el nombre del día de la semana del último mensaj
        const diaSemana = dateTimeUltimoMensaje.toLocaleString({ weekday: "long" });
        const flag = ultimoMensaje.flag ? "true" : "false";

        contenedor.innerHTML += `<figure>
        <img 
        src="${user[index].image}"
        width="50"
        height="50"/>
        </figure>
        <div class ="contenedor2">
        <div class="informacionPersona">
        <p style="width:100%;" ><strong> ${user[index].name}</strong> </p> 
        <h6> <b>${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1).toLowerCase()}</b> <h6>
        </div>
        <div class="informacionChat">
        <figure class="check-figure" data-flag="${flag}">
            <i class="fa-solid fa-check"></i>
        </figure>
        <figure class="check-figure" data-flag="${flag}">
            <i class="fa-solid fa-check"></i>
        </figure>
        <h6> ${element.conversations[element.conversations.length - 1].message}<h6>
        </div>
        </div>`
    });
};
    
document.addEventListener("DOMContentLoaded", async () => {
    
    user = await getUser();
    chat = await getUserChat();
    console.log(user);
    const user2= Array.from(user);
    const chat2 = Array.from(chat);
    
    let index = user2.findIndex((item) => {
        return item.id === idUser;
    });

    let index2 = chat2.findIndex((item) => {
        return item.recipientUser === idUser;
    });
    
    insertarImagenPerfil(user2[index].image);

    const image_profile2= Array.from((document.getElementsByClassName("image_profile")));
    const editarNombre = document.getElementsByClassName("botonEditarNombre");
    const imagenPerfil = image_profile2[0].firstChild;
    
    seccionTexto(editarTexto,user2);
    toggleModal(imagenPerfil,modal);
    toggleModal(closeButton, modal);
    
    const botonEdicionNombre = editarNombre[0];
    const nombreEdicion = document.getElementById("nombreUsuario");
    
   
    const Swal = require('sweetalert2');
    
    botonEdicionNombre.addEventListener("click", async () => {
        console.log("Miau");
        const { value: text } = await Swal.fire({
            input: "text",
            inputLabel: "Nombre",
            inputPlaceholder: "Ingrese su nuevo nombre...",
            inputAttributes: {
              "aria-label": "Ingrese su nuevo nombre"
            },
            showCancelButton: true
        });
        if (text) {
            Swal.fire(text);
        };
        nombreEdicion.textContent= text;

    });

    console.log(`${endpoints.user}/${idUser}`);

    fetch(`${endpoints.user}/${idUser}`, {
        method: 'PATH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nombreEdicion
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Objeto actualizado
    })
    .catch(error => {
        console.error('Error al enviar la solicitud:', error);
    });
    
   
   

        
    
    

    
    

    console.log(chat2);
    console.log(index2);
    
    
    

    if (chat ==[]){
        section_chats.innerHTML = "No hay chats";

    }else {
        insertarChats(section_chats,chat2,user2);
    };


    

    



    // Vamos a insertar los chats 
    //insertarImagenPerfil(index.image)
    
    
    
});







//const insertarImagenPerfil = (contenedor, listaUsuarios)




/*
<div class="image_profile">
                <figure id="btnCard">
                    <img
                    src="https://img.freepik.com/foto-gratis/perrito-joven-posando-alegre_155003-28765.jpg"
                    alt = "Imagen_profile"
                    width="50"
                    height="50"/>

                </figure>
            </div>
*/
