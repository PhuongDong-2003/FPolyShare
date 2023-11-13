import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
//ICONS
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';

export const FAQ =()=> {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <Box m="20px">
            <Box>
                <Header title="FAQ" subtitle="Trang câu hỏi thường gặp" />
    
                <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{backgroundColor:colors.grey[900]}}>
                        <Typography variant="h5" color={colors.greenAccent[400]}>
                            Chuyển đổi mail trường thành mail cá nhân
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Trước khi chuyển đổi, hãy sao lưu dữ liệu.<br/>
                        Cập nhật thông tin liên hệ ở mục cài đặt(Setting) và sửa đổi email trường thành email cá nhân.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/*  */}
                <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{backgroundColor:colors.grey[900]}}>
                        <Typography variant="h5" color={colors.greenAccent[400]}>
                            Cách để lấy lại mật khẩu email FPT
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Nếu User đang trong thời gian học quên MK - Gửi thông tin của User cho IT để đặt lại mật khẩu cho SV.<br/>
                        Nếu User thôi học thì làm hoàn tất thủ tục NHTL để được mở lại tài khoản email.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/*  */}
                <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{backgroundColor:colors.grey[900]}}>
                        <Typography variant="h5" color={colors.greenAccent[400]}>
                            Hướng dẫn dùng website quản trị
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Trong buổi train các quản trị viên sẽ được hướng dẫn sử dụng các chức năng.<br/>
                        Trong quá trình học tập, các bạn có thắc mắc hoặc gặp sự cố sẽ được Cán bộ IT tại cơ sở hỗ trợ xử lý.<br/>
                        Khi quản trị viên không truy cập được hệ thống codepolyadmin.fpt.vn cần kiểm tra việc sử dụng chính xác email được cấp và phải đặt lại mật khẩu cho lần đầu đăng nhập.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/*  */}
                <Accordion defaultExpanded={false}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{backgroundColor:colors.grey[900]}}>
                        <Typography variant="h5" color={colors.greenAccent[400]}>
                            Đăng nhập và quản trị tại nhà không được
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Quản trị viên cần kết nối mạng nội bộ để sử dụng chức năng.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box sx={{marginTop:"60px"}}>
                <Header title="THÔNG TIN LIÊN HỆ" subtitle="Ý kiến đóng góp chung gửi về ykien.poly@fpt.edu.vn bằng email @fpt.edu.vn" />
                {/* SDT */}
                <Box display="flex" sx={{m:"0 30px 10px "}}>
                    <CallIcon sx={{marginRight: "10px"}}/>
                    <Typography sx={{marginRight: "5px"}}>
                        Số điện thoại liên hệ giải đáp ý kiến sinh viên:
                    </Typography>
                    <Typography fontWeight="bold" sx={{cursor:"pointer"}} color={colors.greenAccent[500]}>
                        02873088800
                    </Typography>
                </Box>
                {/* EMAIL */}
                <Box display="flex" sx={{m:"0 30px 10px "}}>
                    <EmailIcon sx={{marginRight: "10px"}}/>
                    <Typography sx={{marginRight: "5px"}}>
                        Địa chỉ email phòng ban Kĩ thuật IT:
                    </Typography>
                    <Typography fontWeight="bold" sx={{cursor:"pointer"}} color={colors.greenAccent[500]}>
                        kithuat.fplhcm@fe.edu.vn
                    </Typography>
                </Box>
                {/* ADDRESS */}
                <Box display="flex" sx={{m:"0 30px 10px "}}>
                    <ApartmentIcon sx={{marginRight: "10px"}}/>
                    <Typography sx={{marginRight: "5px"}}>
                        Văn phòng Kĩ thuật IT:
                    </Typography>
                    <Typography fontWeight="bold" sx={{cursor:"pointer"}} color={colors.greenAccent[500]}>
                        778/B1 Nguyễn Kiệm, P.4, Q. Phú Nhuận, TP. Hồ Chí Minh.
                    </Typography>
                </Box>
            </Box>
            

        </Box>
    )
}