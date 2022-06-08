import axios from "axios";
import { HOMEAPI } from "./courseUrl";
function getCourse(){
    return axios.get(`${HOMEAPI}courses/`)
}
function addUsers(state){
    return axios.post(`${HOMEAPI}users/`,state)
}
function getUserdetails(){
    return axios.get(`${HOMEAPI}users/`)
}
export {getCourse,addUsers,getUserdetails}