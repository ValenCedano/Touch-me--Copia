import axios from "axios";

export const getUser = async (url)=>{
    try {
        const {data}= await axios.get(url);
        // console.log(data)
        return data[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const sendUserRegister = async (url, user) => {
    try {
        const {data}= await axios.post(url,user)
        console.log('Respuesta del servidor:', data);
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

export const updateUser= async(url,user)=>{
    try {
        const {data}= await axios.put(url,user);
        console.log("Actualizado:", data);
    } catch (error) {
        console.error("Error actualizando",error);
    }
}

export const updateUserStatus= async(url,userStatus)=>{
    try {
        const {data}= await axios.patch(url,{online:userStatus});
        console.log("Actualizado:", data);
    } catch (error) {
        console.error("Error actualizando",error);
    }
}