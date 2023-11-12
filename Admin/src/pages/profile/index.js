import { Avatar, Box, Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, useMediaQuery } from "@mui/material"
import Header from "../../components/Header"
import { useState } from "react"
import { Formik } from "formik";

export const Profile = () => {
    const [avatar, setAvatar] = useState(null);
    const [code, setCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('Username_123');
    const [email, setEmail] = useState('');
    const [subEmail, setSubEmail] = useState('');
    const [major, setMajor] = useState('');
    const onImageChange = (e) =>{
        if(e.target.files && e.target.files[0]){
            setAvatar(URL.createObjectURL(e.target.files[0]))
        }
    }
    const resetForm = () =>[
        setAvatar(null),
        setCode(''),
        setFirstName(''),
        setLastName(''),
        setUserName(''),
        // setPassword(''),
        setEmail(''),
        setSubEmail(''),
        setMajor(''),
        console.log("cleaned")
    

    ]
    const handleFormSubmit = () =>{}
    // RESPONSIVE FORM
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    return (
        <Box m="20px">
            <Header title={"THÔNG TIN CÁ NHÂN"} subtitle={"Chi tiết thông tin tài khoản của bạn."}/>
            <Box m="20px" p="20px" >
                {/* AVATAR */}  
                <Box display="flex" justifyContent="space-between" margin={"0 30px 30px 30px"}>
                    <Box display="flex">
                        <Avatar variant="rounded"
                        alt="img_avatar" 
                        sx={{width: 100, height: 100}}
                        src={avatar}>
                        </Avatar>
                        <Button sx={{marginLeft:"40px"}} variant="">
                            <Input type="file" onChange={onImageChange} className="filetype"/>
                        </Button>
                    </Box>
                    
                    {/* BUTTON CREATE */}
                    <Box display="flex" justifyContent="center" marginTop={"30px"} >

                        <Button type="reset" onClick={resetForm} variant='contained' size='large'  sx={{fontWeight:"bold", marginRight:"20px"}}>
                            Làm trống
                        </Button>
                        <Button type="submit" onClick={handleFormSubmit}  variant='contained' size='large' color='secondary' sx={{fontWeight:"bold"}}>
                            Tạo mới
                        </Button>
                    </Box>
                </Box>
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
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    margin:"0 30px 0 30px"
                                }}
                            >
                                {/* STUDENT CODE */}
                                <TextField
                                    fullWidth
                                    disabled
                                    variant='filled'
                                    type='text'
                                    label="Mã sinh viên"
                                    // onChange={(e) => setcode(e.target.value)}
                                    value={code}
                                    name='code'
                                    
                                    // error={!!touched.code && !! errors.code}
                                    // helperText={touched.code && errors.code}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                {/* USER NAME */}
                                <TextField
                                    fullWidth
                                    disabled
                                    variant='filled'
                                    type='text'
                                    label="Tài khoản"
                                    // onChange={(e) => setUserName(e.target.value)}
                                    value={userName}
                                    name='userName'
                                    sx={{ gridColumn: "span 2" }}
                                />
                                {/* FIRST NAME */}
                                <TextField
                                    fullWidth
                                    disabled
                                    variant='filled'
                                    type='text'
                                    label="Tên"
                                    // onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    name='firstName'
                                    sx={{ gridColumn: "span 2" }}
                                />
                                {/* LÁT NAME */}
                                <TextField
                                    fullWidth
                                    disabled
                                    variant='filled'
                                    type='text'
                                    label="Họ và Tên lót"
                                    // onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    name='lastName'
                                    sx={{ gridColumn: "span 2" }}
                                />
                                
                                {/* EMAIL */}
                                <TextField
                                    fullWidth
                                    disabled
                                    variant='filled'
                                    type='text'
                                    label="Email nội bộ"
                                    // onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    name='email'
                                    sx={{ gridColumn: "span 2" }}
                                />
                                {/* MAJOR */}
                                <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                                    <InputLabel id="demo-simple-select-filled-label">Chuyên ngành</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    // onChange={(e) => setMajor(e.target.value)}
                                    value={major}
                                    name='major'
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>SOF</MenuItem>
                                        <MenuItem value={2}>WEB</MenuItem>
                                        <MenuItem value={3}>MOB</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* SUBEMAIL */}
                                <TextField
                                    fullWidth
                                    variant='filled'
                                    type='text'
                                    label="Email cá nhân"
                                    name='subEmail'
                                    value={subEmail}
                                    sx={{ gridColumn: "span 2" }}
                                />
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
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}