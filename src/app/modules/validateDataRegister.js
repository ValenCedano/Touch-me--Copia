import {validateEmptyData} from "./validateEmpyData.js"

export const validateDataRegister = (jsonData) => {
    const empty=validateEmptyData(jsonData);
    // console.log("empty",empty);
    const linkRegex = /^(https?:\/\/)?[\da-z.-]+/;
    let errorFields = [];
    if (empty==false){
        const alerts=document.querySelectorAll(".alert");
        alerts.forEach(alert => {
            alert.textContent = "";
        });
        if(jsonData.phone.length < 10  ){
            const alert=document.getElementById("errorPhone");
            alert.innerHTML=`Phone must be more than 10 characters `
            errorFields.push("userPhone");
        }
        if(!linkRegex.test(jsonData.image)){
            const alert=document.getElementById("errorImage");
            alert.innerHTML=`the image must be a link`
            errorFields.push("userImage");
        }
        if(jsonData.password.length <= 8  ){
            const alert=document.getElementById("errorPassword");
            alert.innerHTML=`Password too short`
            errorFields.push("userPassword");
        }

        return errorFields.length > 0 ? false : true;
    }else{
        return !empty;
    }

};


