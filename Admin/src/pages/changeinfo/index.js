import { Avatar, Box, Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, useMediaQuery } from "@mui/material"
import Header from "../../components/Header"
import { useState } from "react"
import { Formik } from "formik";

export const ChangeInfo = () => {

    const [password, setPassword] = useState('Username_123');
    const [confirm, setConfirm] = useState("")
    
    const resetForm = () =>[
        setPassword(''),
        setConfirm(''),
        console.log("cleaned")
    

    ]
    const handleFormSubmit = () =>{}
    // RESPONSIVE FORM
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    return (
        <Box m="20px">
            <Header title={"ĐỔI MẬT KHẨU"} subtitle={"Lưu ý cập nhật bổ sung \"EMAIL CÁ NHÂN\" và thay đổi mật khẩu bảo mật lần đầu."}/>
            <Box m="20px" p="20px" >
                {/* FORM */}
                <Formik>
                    {({
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {/* FORM */}
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    margin:"0 80px 0 80px"
                                }}
                            >
                                {/* PASSWORD */}
                                <TextField
                                    fullWidth
                                    variant='filled'
                                    // type='password'
                                    type='text'
                                    label="Mật khẩu"
                                    name='password'
                                    value={password}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant='filled'
                                    // type='password'
                                    type='text'
                                    label="Nhập lại mật khẩu"
                                    name='password'
                                    value={confirm}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </Box>
                        </form>
                    )}
                </Formik>
                {/* BUTTON CREATE */}
                <Box display="flex" justifyContent="center" marginTop={"30px"} >
                    <Button type="reset" onClick={resetForm} variant='contained' size='large'  sx={{fontWeight:"bold", marginRight:"20px"}}>
                        Làm trống
                    </Button>
                    <Button type="submit" onClick={handleFormSubmit}  variant='contained' size='large' color='secondary' sx={{fontWeight:"bold"}}>
                        Đổi mật khẩu
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}