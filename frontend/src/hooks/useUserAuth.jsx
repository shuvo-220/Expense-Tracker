import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";

export const useUserAuth=()=>{
    const{user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();
}