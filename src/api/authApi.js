import axios from "axios";

const authApi = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
    params: {
        key: "AIzaSyCJzTVkTsZvggPOmznbnRpwpV52t7bVQTU",
    },
});

// console.log(process.env.NODE_ENV);
// variable de entorno que indica desde donde se esta ejecutando

export default authApi;