import axios from "axios";

const journalApi = axios.create({
    baseURL: "https://vue-demos-f699a-default-rtdb.firebaseio.com",
});

export default journalApi;