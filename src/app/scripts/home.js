import '../styles/home.scss';
import Swal from 'sweetalert2';
const axios = require('axios');
import endpoints from '../services/data';
import {
    getUser,
    getUserChat,
}from "../services/getInfoUser";

import {
    toggleModal,
}from "../services/modalEdition";



const { DateTime } = require("luxon");

//const idProducto = JSON.parse(localStorage.getItem("idProduct"))
let user;
let chat;
let selectedConversation;
const idUser = "13e45i";

const image_profile = document.querySelector(".image_profile");
const section_chats = document.querySelector(".section_contenido");
const modal = document.querySelector(".modalCart");
const closeButton = document.getElementById("closeModal");
const editarTexto = document.querySelector(".modificarNombre");
const editarFotoUsuario= document.getElementById("editarImagenPerfil");
const buscador = document.getElementsByClassName("search");
const inputBusqueda = document.querySelector('.chat-input');
const conversationContainer = document.getElementById("chatMessages");
const menu = document.getElementById("message-menu");
const messageForm = document.getElementById("sendMessage");
console.log(inputBusqueda)
console.log(buscador[0].children)


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
    
    listaChats.forEach(element => {
        let idSendUser = element.sendUser;
        user = Array.from(listaUsuarios);
        let index = listaUsuarios.findIndex((item) => {
            return item.id === idSendUser;
        });
        const ultimoMensaje = element.conversations[element.conversations.length - 1];
        const fechaHoraUltimoMensaje = `${ultimoMensaje.date}`;
        
        // Parsea la fecha y hora utilizando Luxo
        
        const dateTimeUltimoMensaje = DateTime.fromISO(fechaHoraUltimoMensaje);
                // Obtiene el nombre del día de la semana del último mensaj
        const diaSemana = dateTimeUltimoMensaje.toLocaleString({ weekday: "long" });
        const flag = ultimoMensaje.flag ? "true" : "false";

        contenedor.innerHTML = ` <figure>
        <img 
        src="${user[index].image}"
        width="50"
        height="50"/>
        </figure>
        <div class ="contenedor2">
        <div class="informacionPersona">
        <p style="width:76%;" ><strong> ${user[index].name}</strong> </p> 
        <h6> <b>${fechaHoraUltimoMensaje}</b> <h6>
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
        </div>
        `
    });
};

const actualizarDatos = async (url, objeto) => {
    try {
        const { data } = await axios.put(url, objeto);
        return data;
    } catch (error) {
        // Manejo de errores
        console.error('Error al actualizar los datos:', error);
        
    }
};

const imprimirConversacion = ({ container, listaConversaciones, userId }) => {
  container.innerHTML = "";
  listaConversaciones.forEach((item, index) => {
    container.innerHTML += `
    ${
      index > 0 && item.date == listaConversaciones[index - 1].date
        ? ""
        : `
      <div>   
        <h4>${item.date}</h4>
      </div>
      `
    }
    
    <div class=${item.sendBy == userId ? "message-sent" : "message-received"}>
      ${item.message}
      ${
        item.sendBy == userId
          ? `<button name=${index} class='actions'>^</button>`
          : ""
      }           
    </div>
    `;
  });
};

let messageToEdit = "";

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newMessageInput = document.getElementById("newMessage");
  if (newMessageInput.value.trim() !== "") {
    selectedConversation.conversations.push({
      sendBy: idUser,
      date: new Date().toLocaleDateString(),
      hour: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      message: newMessageInput.value,
      flag: false,
    });
    await sendAMessage(
      selectedConversation.id,
      selectedConversation.conversations
    );

    imprimirConversacion({
      container: conversationContainer,
      listaConversaciones: selectedConversation.conversations,
      userId: idUser,
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("actions")) {
    console.log("Se debe mostrar la lista de opciones");
    const indexMessage = event.target.getAttribute("name");

    // // Calcula la posición  del menú basada en la posición del click y el contenedor del chat
    const chatContainerRect = document
      .querySelector(".chat-container")
      .getBoundingClientRect();

    const relativeX = event.clientX - chatContainerRect.left;
    const relativeY = event.clientY - chatContainerRect.top;

    // // Muestra el menú y lo posiciona
    // menu.style.display = "block";
    menu.style.left = `${relativeX}px`;
    menu.style.top = `${relativeY}px`;
    menu.classList.toggle("hidden");

    // Guarda la referencia del mensaje a editar
    messageToEdit = selectedConversation.conversations[indexMessage].message;
  }

  //Para editar el mensaje
  if (event.target.getAttribute("data-action") == "edit") {
    console.log("Quiero editar");
    console.log(messageToEdit);
  }
});


const form =Array.from( buscador[0].children);
const botonBuscador = form[0].children;
const buscadorBoton = botonBuscador[1];


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
  const Swal = require('sweetalert2');
  insertarImagenPerfil(user2[index].image);
  buscadorBoton.addEventListener("click", (event) => {
    event.preventDefault(); 
    const valorBusqueda = inputBusqueda.value;
    console.log(valorBusqueda);

    let usuarioEncontrado = false; // Variable para verificar si el usuario fue encontrado

    user2.forEach((elemento) => {

      if (elemento.name === valorBusqueda) {
        console.log("miau");
        console.log(elemento.id);
        const indexUser = user2.findIndex(user => user.id === elemento.id);
        const indexMessages = chat2.findIndex(chat => chat.sendUser === elemento.id);
        const ultimoMensaje = chat2[indexMessages].conversations[chat2[indexMessages].conversations.length - 1];
        console.log(indexMessages)
        const fechaHoraUltimoMensaje = `${ultimoMensaje.date}`;
        const flag = ultimoMensaje.flag ? "true" : "false";


        section_chats.innerHTML = `<figure>
        <img src="${user2[indexUser].image}" 
        width="50" height="50"/>
        </figure>
        <div class ="contenedor2">
        <div class="informacionPersona">
        <p style="width:76%;" ><strong>${user2[indexUser].name}</strong></p> 
        <h6><b>${fechaHoraUltimoMensaje}</b></h6>
        </div>
        <div class="informacionChat">
            <figure class="check-figure" data-flag="${flag}">
                <i class="fa-solid fa-check"></i>
            </figure>
            <figure class="check-figure" data-flag="${flag}">
                <i class="fa-solid fa-check"></i>
            </figure>
            <h6>${ultimoMensaje.message}</h6>
        </div>
        </div>`;
        usuarioEncontrado = true; // Establecer la bandera de usuario encontrado a true

      }
    });
    // Si el usuario no se encuentra, mostrar un mensaje de alert
    if (!usuarioEncontrado) {
      Swal.fire("Usuario no encontrado");

    }
  });
    
    
  const image_profile2= Array.from((document.getElementsByClassName("image_profile")));
  const editarNombre = document.getElementsByClassName("botonEditarNombre");
  const imagenPerfil = image_profile2[0].firstChild;
  
  seccionTexto(editarTexto,user2);
  toggleModal(imagenPerfil,modal);
  toggleModal(closeButton, modal);
  
  const botonEdicionNombre = editarNombre[0];
  const nombreEdicion = document.getElementById("nombreUsuario");
  
  botonEdicionNombre.addEventListener("click", async () => {
      
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
      user2[index].name= text;
      
      actualizarDatos(`${endpoints.user}/${idUser}`, user2[index]);

  });


    //Editar foto de perfil

  editarFotoUsuario.addEventListener("click", async () => {
    
   
    const { value: text } = await Swal.fire({
        input: "text",
        inputLabel: "Ruta de Imagen",
        inputPlaceholder: "Ingrese su nuevo imagen de perfil...",
        inputAttributes: {
          "aria-label": "Ingrese su nuevo imagen de perfil"
        },
        showCancelButton: true
    });
    if (text) {
        Swal.fire(text);
    };
    editarNombre.textContent= text;
    user2[index].image= text;
    
    editarFotoUsuario.src = text;
    actualizarDatos(`${endpoints.user}/${idUser}`, user2[index]);
  });
  editarFotoUsuario.src = user2[index].image;

  if (chat ==[]){
      section_chats.innerHTML = "No hay chats";
  }else {
      insertarChats(section_chats,chat2,user2);
  };

 
    
    
});


section_chats.addEventListener("click", async (event) => {
  // Poner aquí para que aparezca los datos del chat..

  if (event.target.getAttribute("data-conversation")) {
    //Obtener el id de la conversación
    const conversationId = event.target.getAttribute("data-conversation");
    //Obtener toda la conversación
    selectedConversation = await getAConversation(conversationId);
    // console.log(selectedConversation.conversations);
    imprimirConversacion({
      container: conversationContainer,
      listaConversaciones: selectedConversation.conversations,
      userId: idUser,
    });
  }
});




////// Parte sara ////
document.addEventListener("DOMContentLoaded", () => {
  // Agregar evento  al icono de lupa para mostrar el chat-detail-container
  const searchIcon = document.querySelector(".img-chat-container");
  const chatDetailContainer = document.querySelector(".chat-detail-container");

  searchIcon.addEventListener("click", () => {
    // Mostrar chat-detail-container
    chatDetailContainer.style.display = "flex";
  });

  // Agregar event listener al botón de cierre del chat-detail-container para ocultarlo
  const closeButton = document.querySelector(".chat-close-button");
  closeButton.addEventListener("click", () => {
    // Ocultar chat-detail-container
    chatDetailContainer.style.display = "none";
  });
});

//codigo de modal eliminar

document.addEventListener("DOMContentLoaded", () => {
  let messageToDelete = null;

  // Selecciona el modal y los botones
  const deleteModal = document.getElementById("delete-message-modal");
  const deleteButton = document.getElementById("delete-for-everyone"); // Suponiendo que este es el botón de eliminar
  const cancelButton = document.getElementById("cancel-delete");

  // Asigna evento a cada mensaje para el botón eliminar
  document
    .querySelectorAll('.message-menu li[data-action="delete"]')
    .forEach((deleteOption) => {
      deleteOption.addEventListener("click", function () {
        messageToDelete = this.closest(".message"); // Encuentra el mensaje correspondiente al menú
        deleteModal.style.display = "block"; // Muestra el modal de confirmación
      });
    });

  // Evento  para el botón de eliminar en el modal
  deleteButton.addEventListener("click", () => {
    if (messageToDelete) {
      messageToDelete.remove(); // Elimina el mensaje del DOM
      // Aquí podrías agregar lógica adicional para manejar la eliminación del mensaje en el backend
    }
    deleteModal.style.display = "none"; // Cierra el modal de confirmación
  });

  // Disque Evento para el botón de cancelar en el modal
  cancelButton.addEventListener("click", () => {
    deleteModal.style.display = "none"; // Simplemente cierra el modal sin eliminar nada
  });
});


//Evento para buscar los mensajes en el boton del chat