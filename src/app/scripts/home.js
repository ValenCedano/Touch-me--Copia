import '../styles/home.scss';
import './modalEdition'
import {
    getUser,
    getUserChat,
}from "../services/getInfoUser";
const { DateTime } = require("luxon");

//const idProducto = JSON.parse(localStorage.getItem("idProduct"))
let user;
let chat;
const idUser = "13e45i";
const image_profile = document.querySelector(".image_profile");
const section_chats = document.querySelector(".section_contenido");
console.log(image_profile);
console.log(section_chats);

const insertarImagenPerfil= (url) => {
    const figura = document.createElement('figure');
    const imagen = document.createElement('img');
    imagen.className = "btnCard";
    imagen.src = url;
    
    imagen.alt = 'Imagen secundaria';
    figura.appendChild(imagen);
    image_profile.appendChild(figura);
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
    
    console.log(chat2);
    console.log(index2);
    console.log(user2[index].image);
    insertarImagenPerfil(user2[index].image);
    

    if (chat ==[]){
        section_chats.innerHTML = "No hay chats";

    }else {
        insertarChats(section_chats,chat2,user2);
    }


    

    



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
