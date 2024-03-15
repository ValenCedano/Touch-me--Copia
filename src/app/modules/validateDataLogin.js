import endpoints from "../services/data.js";
import { getUser } from "../services/userServices.js";
import {validateEmptyData} from "./validateEmpyData.js"

export const validateDataLogin = async(jsonData) => {
    const empty=validateEmptyData(jsonData);
    let errorFields = [];
    if (empty==false){
        const alerts=document.querySelectorAll(".alert");
        alerts.forEach(alert => {
            alert.textContent = "";
        });
        const existPhone= await getUser(endpoints.getAnUserByPhone(jsonData.phone));
        console.log("existPhone",existPhone);
        if(existPhone){
            if(!(jsonData.password ==existPhone.password)){
                const alert=document.getElementById("errorPassword");
                alert.innerHTML=`Incorrect password`
                errorFields.push("userPassword");
            }
        }
        else{
            const alert=document.getElementById("errorPhone");
            alert.innerHTML=` Unregistered phone`
            errorFields.push("userPhone");
        }  
        
        return errorFields.length > 0 ? false :existPhone ;
    }else{
        return !empty;
    }

};