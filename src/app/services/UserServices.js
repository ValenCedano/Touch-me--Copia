
export const getUser = async (url)=>{
    try {
        const {data}= await axios.get(url);
        // console.log(data)
        return data[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}