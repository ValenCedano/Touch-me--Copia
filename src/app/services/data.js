// const URL_BASE="http://localhost:3000/";
const URL_BASE="https://minibackend-touchworld-dev-xpgm.3.us-1.fl0.io/";

const endpoints={
    users:`${URL_BASE}users/`,
    getAnUserByPhone:(phone) => `${URL_BASE}users?phone=${phone}`,
    getAnUserLogin:(phone,password) => `${URL_BASE}users?phone=${phone}&password=${password}`,
    putAnUser:(idUser)=>`${URL_BASE}users/${idUser}`
}

export default endpoints;