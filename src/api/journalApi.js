import axios from "axios";

const journalApi = axios.create({
    baseURL: "https://vue-demos-f699a-default-rtdb.firebaseio.com",
});

// console.log(process.env.NODE_ENV);
// variable de entorno que indica desde donde se esta ejecutando

export default journalApi;