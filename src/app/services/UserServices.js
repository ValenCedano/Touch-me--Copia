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
        // console.log(error);
        // return null
    }
}