import '../styles/style.scss';

import { getDataForm } from "../modules/getDataform.js";
import {validateDataRegister} from "../modules/validateDataRegister.js";
import endpoints from "../services/data.js";
import {sendUserRegister} from "../services/userServices.js";

// document.addEventListener("DOMContentLoaded", () => {
    let  contentMain= document.getElementById("content");
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
    const form = document.getElementById("myForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = getDataForm(form);
        console.log("data",data);
        // const validated= validateDataLogin(data);
        // console.log("validation",validated);
        // contentMain.innerHTML=`<p>Home</p>`
    });
    const register=document.getElementById("register");
    register.addEventListener("click", (event) => {
        event.preventDefault();
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
                data.online=false;
                data.info=data.info.trim();
                console.log("data post",data)
                const url=endpoints.users;
                await sendUserRegister(url,data );
                //aqui se hace el post
                form.reset()
            }
        });
    });
//  });