const URL_BASE="http://localhost:3000/";

const endpoints={
    getAnUser:(email,password) => `${URL_BASE}users?email=${email}&password=${password}`,
    users:`${URL_BASE}users/`,
    getAnUserByPhone:(phone) => `${URL_BASE}users?phone=${phone}`,
}

export default endpoints;