import '../styles/home.scss';

import {
    getUser,
    //getUserChat,
}from "../services/getInfoUser";

//const idProducto = JSON.parse(localStorage.getItem("idProduct"))
let user;
const idUser = "13e45i";
const image_profile = document.querySelector(".image_profile");
console.log(image_profile);

const insertarImagenPerfil= (url) => {
    const figura = document.createElement('figure');
    figura.id = 'btnCard';
    const imagen = document.createElement('img');
    imagen.src = url;
    imagen.alt = 'Imagen secundaria';
    figura.appendChild(imagen);
    image_profile.appendChild(figura);
};

document.addEventListener("DOMContentLoaded", async () => {
    user = await getUser();
    console.log(user);
    const user2= Array.from(user)
    let index = user2.findIndex((item) => {
        return item.id === idUser;
    });

    
    console.log(user2[0].image);
    insertarImagenPerfil(user2[0].image);
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
