const URL_BASE="http://localhost:3000/";

const endpoints={
    users:`${URL_BASE}users/`,
    getAnUserByPhone:(phone) => `${URL_BASE}users?phone=${phone}`,
    getAnUserLogin:(phone,password) => `${URL_BASE}users?phone=${phone}&password=${password}`,
    putAnUser:(idUser)=>`${URL_BASE}users/${idUser}`
}

export default endpoints;