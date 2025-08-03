
import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createServerConnection = ()=>{
    return io(BASE_URL);
}