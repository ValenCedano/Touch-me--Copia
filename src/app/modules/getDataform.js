export const getDataForm = (form) => {
    const formData = new FormData(form);
    const jsonData = {};
    console.log("formData.entries", formData.entries);
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }
    return jsonData;
};