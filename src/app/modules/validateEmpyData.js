 export const validateEmptyData =(jsonData) => {
    let emptyfields = [];
    for (const key in jsonData) {
        if (jsonData[key].trim() == "") {
        emptyfields.push(key);
        }
    }

    if (Object.keys(jsonData).length==emptyfields.length){
        const alerts=document.querySelectorAll(".alert");
        alerts.forEach(alert => {
            alert.textContent = "empty field";
        });
        return true;
    }else if(emptyfields.length>0){
        const alerts=document.querySelectorAll(".alert");
        alerts.forEach(alert => {
            alert.textContent = "";
        });
        emptyfields.forEach((field)=>{
            console.log(field);
            const alertEmpty=document.getElementById(`error${field.charAt(0).toUpperCase() + field.slice(1)}`);
            alertEmpty.innerHTML=`empty field`
        })
        return true;
    }
    else{
        return false;
    }
}