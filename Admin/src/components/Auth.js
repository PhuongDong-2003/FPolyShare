import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import Header from "./Header";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("")
    console.log(auth?.currentUser?.email);
    const logIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, pass);
            console.log("log in success");
        }
        catch (error) {
            // xác thực
            // console.log(auth?.currentUser?.email);
            console.log(error);
            console.log("log in fail");
        }
        
    }
    const logInGoogle = async() => {
        try {
            await signInWithPopup(auth, googleProvider)
            console.log("log in google success");
        }
        catch (error) {
            // xác thực
            console.log(error);
            console.log("fail");
        }
        
    }
    const logOut = async() => {
        try{
            await signOut(auth);
        }catch(error){
            console.log(error);
        }
        console.log("log out success");
    }
    return(
        <Box m={"20px"}>
            <Header title="ĐĂNG NHẬP TÀI KHOẢN" subtitle="Đăng nhập bằng tài khoản email nội bộ của trường để tiếp tục!"/>
            <Box m="80px 150px 0 150px">
                <form>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="Your Email"
                        onChange={(e)=> setEmail(e.target.value)}
                        sx={{marginBottom:"30px"}}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        type=""
                        label="Your password"
                        onChange={(e)=> setPass(e.target.value)}
                        sx={{marginBottom:"30px"}}
                    />
                </form>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Button sx={{backgroundColor:"blue"}} onClick={logIn} >sign in</Button>
                    <Button sx={{backgroundColor:"yellow"}} onClick={logInGoogle} >sign in with google</Button>
                    <Button sx={{backgroundColor:"red"}} onClick={logOut} >sign out</Button>
                </Box>
            </Box>
        </Box>
    )
}