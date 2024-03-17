import { getDataForm } from "../modules/getDataform.js";
import {validateDataRegister} from "../modules/validateDataRegister.js";
import endpoints from "../services/data.js";
import {sendUserRegister,getUser,updateUser} from "../services/userServices.js";
import { alertModal,valuesAlert } from '../modules/alert.js';
import { validateDataLogin } from '../modules/validateDataLogin.js';
import backgroudLogin from '../assets/images/backgroundLogin.png';

import '../styles/style.scss';

document.body.style.backgroundImage=`url(${backgroudLogin})`;
document.body.style.backgroundSize="cover";
document.body.style.backgroundPosition="center";
document.body.style.backgroundRepeat="no-repeat";

document.addEventListener("DOMContentLoaded", () => {
    const contentMain= document.getElementById("content");
    chargeLogin(contentMain);
   
});

const chargeLogin=(contentMain)=>{
    contentMain.innerHTML=`
    <div class="container__form init">                  
        <h1> Sing in</h1>        

        <form id="myForm" >
            <div class="form-group">
                <label for="userPhone">Phone:</label>
                <input type="number" id="userPhone" name="phone">
                <span id="errorPhone" class="alert"></span>
            </div>
            <div class="form-group">
                <label for="userPassword">Password:</label>
                <input type="password" id="userPassword" name="password">
                <span id="errorPassword" class="alert"></span>
            </div>
            <div class="form-group">
                <button id="button" type="submit">Log in</button>
            </div>
        </form>
        <p>
            You don't have an account yet!<br> Join our community by clicking 
            <a id="register">here!</a>
        </p>
    </div>
    `;
    const register=document.getElementById("register");
    register.addEventListener("click", (event) => {
        event.preventDefault();
        chargeRegister(contentMain)
    });
    const form = document.getElementById("myForm");
    form.addEventListener("submit", async(event) => {
        event.preventDefault();
        const data = getDataForm(form);
        const userLogin= await validateDataLogin(data);
        if(userLogin){
            localStorage.setItem("id_userLogin", userLogin.id);
            valuesAlert.title=`Welcome ${userLogin.name}`;
            valuesAlert.didClose=()=>{window.location.href = '"../../pages/home.html';}
            form.reset();
            userLogin.online=true;
            updateUser(endpoints.putAnUser(userLogin.id),userLogin);
            setTimeout(function() {
                alertModal(valuesAlert);
            }, 500);
        }
    });
}

const chargeRegister= (contentMain)=>{
    contentMain.innerHTML=`
    <div class="container__form">                  
        <h1> Register</h1>        
        <form id="form" >
            <div class="form-group">
                <label for="userName">Name:</label>
                <input type="text" id="userName" name="name">
                <span id="errorName" class="alert"></span>
            </div>
            <div class="form-group">
                <label for="userImage">Profile picture:</label>
                <input type="url" id="userImage" name="image" >
                <span id="errorImage" class="alert"></span>
            </div>
            <div class="form-group">
                <label for="userPhone">Phone:</label>
                <input type="number" id="userPhone" name="phone">
                <span id="errorPhone" class="alert"></span>
            </div>
            <div class="form-group">
                <label for="userPassword">Password:</label>
                <input type="password" id="userPassword" name="password">
                <span id="errorPassword" class="alert"></span>
            </div>
            <div class="form-group">
                <label for="userInfo">Info:</label>
                <textarea id="userInfo" name="info" rows="4" cols="50">
                </textarea>
                <span id="errorInfo" class="alert"></span>
            </div>           
            <div class="form-group">
                <button id="button" type="submit">Sing in</button>
            </div>
        </form>
    </div>
    `;
    const form = document.getElementById("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = getDataForm(form);
        const validated= validateDataRegister(data);
        if(validated){
            const existPhone= await getUser(endpoints.getAnUserByPhone(data.phone));
            if(existPhone){
                valuesAlert.title="Error registering";
                valuesAlert.text="Phone number is alredy registered"
                valuesAlert.icon="error";
                valuesAlert.showConfirmButton=true;
                alertModal(valuesAlert);
            }
            else{
                data.online=false;
                data.info=data.info.trim();
                await sendUserRegister(endpoints.users,data);
                valuesAlert.icon="success";
                valuesAlert.timer=2000;
                valuesAlert.title="Successfully registered";
                form.reset();
                setTimeout(function() {
                    alertModal(valuesAlert);
                }, 500);
                setTimeout(function() {
                    chargeLogin(contentMain);
                }, 2500);

            }
        }
        else{
            console.error("Invalid data")
        }
    });
}