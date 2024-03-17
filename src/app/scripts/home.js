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
const idUser = "13e45i";

const image_profile = document.querySelector(".image_profile");
const section_chats = document.querySelector(".section_contenido");
const modal = document.querySelector(".modalCart");
const closeButton = document.getElementById("closeModal");
const editarTexto = document.querySelector(".modificarNombre");
const editarFotoUsuario= document.getElementById("editarImagenPerfil");


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

const actualizarDatos = async (url, objeto) => {
    try {
        const { data } = await axios.put(url, objeto);
        return data;
    } catch (error) {
        // Manejo de errores
        console.error('Error al actualizar los datos:', error);
        throw error;
    }
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
      user2[index].name= text;
      
      actualizarDatos(`${endpoints.user}/${idUser}`, user2[index]);


  });


 


    //Editar foto de perfil

  editarFotoUsuario.addEventListener("click", async () => {
    
    console.log("Miau");
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


section_chats.addEventListener("click", () => {
  // Poner aquí para que aparezca los datos del chat..

})




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


////// Parte sara ////
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los elementos de mensaje
    const messages = document.querySelectorAll('.message-sent');
  
    // Variable global para el mensaje actual a editar
    let messageToEdit = null;
  
    messages.forEach(message => {
      // Agrega un evento de clic a cada mensaje para mostrar el menú contextual
      message.addEventListener('click', (event) => {
        // Impide que se cierre el menú contextual inmediatamente debido al evento de click del window
        event.stopPropagation();
  
        const menu = document.getElementById('message-menu');
  
        // Calcula la posición  del menú basada en la posición del click y el contenedor del chat
        const chatContainerRect = document.querySelector('.chat-container').getBoundingClientRect();
  
        const relativeX = event.clientX - chatContainerRect.left;
        const relativeY = event.clientY - chatContainerRect.top;
  
        // Muestra el menú y lo posiciona
        menu.style.display = 'block';
        menu.style.left = `${relativeX}px`;
        menu.style.top = `${relativeY}px`;
  
        // Guarda la referencia del mensaje a editar
        messageToEdit = message;
      });
    });
  
    // Evento para el botón editar en el menú contextual
    document.querySelector('li[data-action="edit"]').addEventListener('click', () => {
      // Muestra la ventana modal para editar
      const modal = document.getElementById('edit-message-modal');
      modal.style.display = 'block';
  
      // Llena el textarea con el contenido actual del mensaje
      const textarea = document.getElementById('message-to-edit');
      textarea.value = messageToEdit.textContent.trim();
  
      // Cierra el menú contextual
      document.getElementById('message-menu').style.display = 'none';
    });
  
    // Evento para el botón guardar en la ventana modal
    document.getElementById('save-message').addEventListener('click', () => {
      // Actualiza el contenido del mensaje y cierra la ventana modal
      if (messageToEdit) {
        messageToEdit.textContent = document.getElementById('message-to-edit').value.trim();
        document.getElementById('edit-message-modal').style.display = 'none';
      }
    });
  
    // Cierra la ventana modal al hacer clic en el botón de cerrar
    document.querySelector('.close-button').addEventListener('click', () => {
      document.getElementById('edit-message-modal').style.display = 'none';
    });
  
    // Evento para cerrar la ventana modal si se hace clic fuera de ella
    window.addEventListener('click', (event) => {
      const modal = document.getElementById('edit-message-modal');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Evento para cerrar el menú contextual si se hace clic fuera de él
    window.addEventListener('click', () => {
      const menu = document.getElementById('message-menu');
      if (menu.style.display === 'block') {
        menu.style.display = 'none';
      }
    });
  });
  
  
  document.addEventListener('DOMContentLoaded', () => {
    
    // Agregar evento  al icono de lupa para mostrar el chat-detail-container
    const searchIcon = document.querySelector('.img-chat-container');
    const chatDetailContainer = document.querySelector('.chat-detail-container');
  
    searchIcon.addEventListener('click', () => {
      // Mostrar chat-detail-container
      chatDetailContainer.style.display = 'flex';
    });
  
    // Agregar event listener al botón de cierre del chat-detail-container para ocultarlo
    const closeButton = document.querySelector('.chat-close-button');
    closeButton.addEventListener('click', () => {
      // Ocultar chat-detail-container
      chatDetailContainer.style.display = 'none';
    });
  
  });
  
  //codigo de modal eliminar
  
  document.addEventListener('DOMContentLoaded', () => {
    let messageToDelete = null; 
  
    // Selecciona el modal y los botones
    const deleteModal = document.getElementById('delete-message-modal');
    const deleteButton = document.getElementById('delete-for-everyone'); // Suponiendo que este es el botón de eliminar
    const cancelButton = document.getElementById('cancel-delete');
  
    // Asigna evento a cada mensaje para el botón eliminar
    document.querySelectorAll('.message-menu li[data-action="delete"]').forEach(deleteOption => {
      deleteOption.addEventListener('click', function() {
        messageToDelete = this.closest('.message'); // Encuentra el mensaje correspondiente al menú
        deleteModal.style.display = 'block'; // Muestra el modal de confirmación
      });
    });
  
    // Evento  para el botón de eliminar en el modal
    deleteButton.addEventListener('click', () => {
      if (messageToDelete) {
        messageToDelete.remove(); // Elimina el mensaje del DOM
        // Aquí podrías agregar lógica adicional para manejar la eliminación del mensaje en el backend
      }
      deleteModal.style.display = 'none'; // Cierra el modal de confirmación
    });
  
    // Disque Evento para el botón de cancelar en el modal
    cancelButton.addEventListener('click', () => {
      deleteModal.style.display = 'none'; // Simplemente cierra el modal sin eliminar nada
    });
  });
