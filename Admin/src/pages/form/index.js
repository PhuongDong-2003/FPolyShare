import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from 'react';
import { tokens } from '../../theme';
// ICONS
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';

// 
const initialValues = {
    code:"",  //default: ps******
    firstName:"",
    lastName:"",
    userName:"",     //default: lastName + code
    password:"",     //default: user123
    role:"",
    email:"",        //default: "lastName + code" + @fpt.sv.edu.vn
    major:"",        //default: select
    avatar:"",       //default: user.jpg
}
// 
const checkoutForm = yup.object().shape({
    code: yup.string().required("Không được để trống"),
    firstName: yup.string().required("Không được để trống"),
    lastName: yup.string().required("Không được để trống"),
    userName: yup.string().required("Không được để trống"),
    password: yup.string()
                .required("Không được để trống")
                .min(6, "Mật khẩu phải dài từ 8 kí tự")
                .matches(/[0-9]/, "Mật khẩu yêu cầu 1 chữ số")
                .matches(/[a-z]/, "Mật khẩu yêu cầu 1 kí tự thường")
                .matches(/[A-Z]/, "Mật khẩu yêu cầu 1 kí tự hoa")
                .matches(/[^\w]/, "Mật khẩu yêu cầu 1 kí hiệu đặc biệt"),
    role: yup.string()
                .required("Không được để trống")
                .oneOf([yup.ref('password'),null], "Phải khớp với giá trị trường mật khẩu"),
    email: yup.string()
                .email("Email không hợp lệ")
                .required("Không được để trống"),
    major: yup.string().required("Không được để trống"),
    avatar: yup.string().required("Không được để trống"),
});


export const Form = () => {
    // theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // RESPONSIVE FORM
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    // LẤY DATA TỪ BÀN PHÍM FORM
    const [code, setcode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('Username_123');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [major, setMajor] = useState('');
    const [avatar, setAvatar] = useState('');
    
    const handleFormSubmit = (event) => {
        event.preventDefault(); 
        const newFormData = {
            code: code,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            role: role,
            email: email,
            major: major,
            avatar:avatar,
        }
        console.log(newFormData);
        alert('Thêm mới thành công');
    };
    // CLEAN FORM
    const resetForm = () => [
        setcode(""),
        setFirstName(""),
        setLastName(""),
        setUserName(""),
        // setPassword(""),
        setRole(""),
        setEmail(""),
        setMajor("../../assets/user.png"),
        setAvatar(""),
        console.log("cleaned")
    ]
    return (
        <Box m="20px">
            <Box display={"flex"} justifyContent="space-between" alignItems="center">
                <Header title="THÊM MỚI" subtitle="Tạo hồ sơ người dùng mới"/>
                <Button 
                    sx={{background:colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize:"14px",
                        fontWeight:"bold",
                        padding: "10px 20px"
                    }}
                >
                    <UploadOutlinedIcon/>Import excel file
                </Button>
            </Box>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutForm}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
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
                                margin:"30px 70px 0 70px"
                            }}
                        >
                            {/* STUDENT CODE */}
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label="Mã sinh viên"
                                onBlur={handleBlur}
                                // onChange={handleChange}
                                onChange={(e) => setcode(e.target.value)}
                                value={code}
                                name='code'
                                
                                // error={!!touched.code && !! errors.code}
                                // helperText={touched.code && errors.code}
                                sx={{ gridColumn: "span 2" }}
                            />
                            {/* USER NAME */}
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label="Tài khoản"
                                onBlur={handleBlur}
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                                name='userName'
                                sx={{ gridColumn: "span 2" }}
                            />
                            {/* FIRST NAME */}
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label="Tên"
                                onBlur={handleBlur}
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                name='firstName'
                                sx={{ gridColumn: "span 2" }}
                            />
                            {/* LÁT NAME */}
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label="Họ và Tên lót"
                                onBlur={handleBlur}
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                name='lastName'
                                sx={{ gridColumn: "span 2" }}
                            />
                            
                            {/* EMAIL */}
                            <TextField
                                fullWidth
                                variant='filled'
                                type='text'
                                label="Email nội bộ"
                                onBlur={handleBlur}
                                onChange={(e) => setEmail(e.target.value)}
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
                                onBlur={handleBlur}
                                onChange={(e) => setMajor(e.target.value)}
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
                            {/* PASSWORD */}
                            <TextField
                                fullWidth
                                variant='filled'
                                disabled
                                // type='password'
                                type='text'
                                label="Mật khẩu"
                                onBlur={handleBlur}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                name='password'
                                sx={{ gridColumn: "span 2" }}
                            />
                            {/* ROLE */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                                <InputLabel id="demo-simple-select-filled-label">Phân quyền</InputLabel>
                                <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                onBlur={handleBlur}
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                name='role'
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"stu"}>Students</MenuItem>
                                    <MenuItem value={"men"}>Mentors</MenuItem>
                                    <MenuItem value={"adm"}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                            {/* AVATAR */}
                            {/* <TextField
                                fullWidth
                                variant='filled'
                                type='file'
                                label="Avatar"
                                onBlur={handleBlur}
                                onChange={(e) => setAvatar(e.target.value)}
                                value={avatar}
                                name='avatar'
                                sx={{ gridColumn: "span 2" }}
                            /> */}
                        </Box>
                        {/* BUTTON CREATE */}
                        <Box display="flex" justifyContent="center" marginTop={"30px"} >
                            <Button type="reset" onClick={resetForm} variant='contained' size='large' sx={{fontWeight:"bold", marginRight:"30px", width:"120px"}}>
                                Làm trống
                            </Button>
                            <Button type="submit" onClick={handleFormSubmit} validationSchema={checkoutForm} variant='contained' size='large' color='secondary' sx={{fontWeight:"bold", width:"120px"}}>
                                Tạo mới
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}