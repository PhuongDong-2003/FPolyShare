import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from '@mui/x-data-grid'
// ICONS
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Header from "../../components/Header";
import { StatItem } from "../../components/StatItem";


const columns = [
    {field: 'id', headerName:'ID', width: 70},
    {field: 'projectName', headerName:'Tiêu đề sản phẩm dự án', width: 300},
    {field: 'major', headerName:'Chuyên ngành', width: 150},
    {field: 'owner', headerName:'Tác giả', width: 150},
    {field: 'timesView', headerName:'Số lượng truy cập', type: 'number', width: 170},
    {field: 'timesDown', headerName:'Số lượng tải xuống', type: 'number', width: 170},   
] 

const rows = [
    {id:1, projectName: "App thời tiết (Weather App) Android",major: "SOF",owner: "user1",timesView: "932414",timesDown: "7643"},
    {id:2, projectName: "Website code bán thực phẩm",major: "WEB",owner: "user2",timesView: "890065",timesDown: "45674"},
    {id:3, projectName: "Full code wordpress giới thiệu công ty máy lọc nước",major: "MARK",owner: "user3",timesView: "875645",timesDown: "4323"},
    {id:4, projectName: "Soucre code unity game pikachu",major: "MOB",owner: "user2",timesView: "675345",timesDown: "76464"},
    {id:5, projectName: "Full code website phimnetfree",major: "WEB",owner: "user5",timesView: "543464",timesDown: "5365"},
    {id:6, projectName: "Phần mềm quản lý nhân sự",major: "SOF",owner: "user1",timesView: "505764",timesDown: "97603"},
    {id:7, projectName: "Soucre Java quản lý cửa hàng điện tử",major: "SOF",owner: "user7",timesView: "344523",timesDown: "3256"},
    {id:8, projectName: "Phần mềm quản lý tạo đề thi sinh viên",major: "SOF",owner: "user8",timesView: "123003",timesDown: "6531"},

]

export const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center"> 
                {/* HEADER LINE */}
                <Header title="THỐNG KÊ TỔNG QUÁT" subtitle="Chào mừng bạn trở lại!"/>

                {/* BUTTON DOWN */}
                <Box>
                    <Button 
                        sx={{backgroundColor:colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px"}}
                    >
                        <DownloadOutlinedIcon/> Tải bản báo cáo
                    </Button>
                </Box>
            </Box>
            {/* BIEU DO & DATA */}
            <Box 
                display="grid" 
                gridTemplateColumns="repeat(12, 1fr)" 
                gridAutoRows="140px" gap="20px">
                    {/* CHARTS */}
                    <Box    
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">
                            <StatItem
                                title="12,361"
                                subtitle="Mentors thêm mới"
                                progress="0.75"
                                increase="+14%"
                                icon={
                                <PersonAddAltIcon
                                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                />
                                }
                            />
                    </Box>
                    <Box    
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">
                            <StatItem
                                title="32,441"
                                subtitle="Sinh viên thêm mới"
                                progress="0.30"
                                increase="+5%"
                                icon={
                                <PersonAddIcon
                                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                />
                                }
                            />
                    </Box>
                    <Box    
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">
                            <StatItem
                                title="431,225"
                                subtitle="Sản phẩm đăng tải mới"
                                progress="0.50"
                                increase="+21%"
                                icon={
                                <VideoCallIcon
                                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                />
                                }
                            />
                    </Box>
                    <Box    
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center">
                            <StatItem
                                title="1,325,134"
                                subtitle="Lượt tải xuống"
                                progress="0.80"
                                increase="+43%"
                                icon={
                                <FileDownloadIcon
                                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                />
                                }
                            />
                    </Box>
                    {/* DATA TABLE */}
                    <Box 
                        gridColumn="span 12"
                        gridRow="span 3"
                        backgroundColor={colors.primary[400]}
                        p="30px"
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: colors.blueAccent[700],
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "none",
                                backgroundColor: colors.blueAccent[700],
                            },
                        }}
                    >
                        <Typography variant="h5" fontWeight="600" paddingBottom={2}>
                            Danh sách sản phẩm có lượt truy cập nhiều nhất
                        </Typography>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </Box>

            </Box>

        </Box>
    )
}