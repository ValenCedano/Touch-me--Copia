
const URL_BASE = "https://minibackend-touchworld-dev-xpgm.3.us-1.fl0.io/";

const endpoints = {
    user:`${URL_BASE}users`,
    chats: `${URL_BASE}messages`,
    getAnUserByPhone:(phone) => `${URL_BASE}users?phone=${phone}`,
    getAnUserLogin:(phone,password) => `${URL_BASE}users?phone=${phone}&password=${password}`,
    putAnUser:(idUser)=>`${URL_BASE}users/${idUser}`
};


export default endpoints;