/* eslint-disable no-restricted-globals */
import { Alert, Box, Button, Checkbox, FormControlLabel, Link, useTheme } from "@mui/material";
import { DataGridPremium, GridToolbar } from "@mui/x-data-grid-premium";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { tokens } from "../../theme";
// import { mockData } from "../../data/mockData";
import Header from "../../components/Header";
import { useState, useEffect } from 'react';
// ICONS
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { DataGrid } from "@mui/x-data-grid";
import EditUserButton from "../../components/EditUserButton";

export const List = () => {


    const [userData, setUserData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                data.data.forEach((user, index) => {
                    user.stt = index + 1; // Tạo trường stt dựa trên index
                });

                console.log(data);
                setUserData(data.data);

                data.data.forEach(async (user) => {
                    const hasAdminRole = await checkUserRole(user.id, 'abe001e7-aae5-4278-84f4-05188c3719f1');
                    const hasStudentRole = await checkUserRole(user.id, 'aed6cd2d-1566-4c60-948d-432901a30e68');
                    const hasMentorRole = await checkUserRole(user.id, '8cca874f-07aa-49b9-8ddc-4bea5bf28bed');

                    user.hasAdminRole = hasAdminRole;
                    user.hasStudentRole = hasStudentRole;
                    user.hasMentorRole = hasMentorRole;
                });

                setUserData([...data.data]);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();
    }, []);


    const handleDeleteUser = async (userId) => {
        // Hiển thị hộp thoại xác nhận trước khi xóa
        const confirmDelete = confirm("Are you sure you want to delete this user?");

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Delete operation was not successful');
                }

                // Alert for successful deletion
                <Alert
                    iconMapping={{
                        success: <CheckCircleOutlineIcon fontSize="inherit" />,
                    }}
                >
                    Xóa thành công!
                </Alert>

                // Fetch updated list of users and update UI
                // const updatedUsers = await fetchUsers(); // Assuming fetchUsers is a function to get updated users
                // Update UI with the updatedUsers data

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error) {
                console.error('There was a problem with the delete operation:', error);
            }
        } else {
            // Xử lý hủy bỏ xóa nếu người dùng chọn cancel
            console.log("Deletion canceled");
        }
    };


    const checkUserRole = async (userId, roleId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/user-roles?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userRoles = await response.json();
                return userRoles.some(role => role.id === roleId);
            } else {
                console.error('Failed to fetch user roles');
                return false;
            }
        } catch (error) {
            console.error('Error checking user roles:', error);
            return false;
        }
    };




    const handleRoleChange = async (userId, roleId, checked) => {
        try {

            const hasRole = await checkUserRole(userId, roleId);

            if (checked && !hasRole) {
                // Gọi API để thêm vai trò cho người dùng
                await fetch(`http://localhost:8080/api/roles/assign-user-from-role?userId=${userId}&roleId=${roleId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                alert('Thêm role thành công!');
            } else if (checked && hasRole) {
                alert('Người dùng đã có vai trò này!');
            } else if (!checked && hasRole) {
                // Gọi API để xóa vai trò của người dùng
                await fetch(`http://localhost:8080/api/roles/remove-user-from-role?userId=${userId}&roleId=${roleId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                alert('Xóa role thành công!');
            }
            // eslint-disable-next-line no-undef
            fetchData();
            // Cập nhật lại dữ liệu người dùng sau khi thay đổi
            // Nếu API của bạn không trả về dữ liệu mới, bạn có thể làm refresh trang hoặc gọi API lấy dữ liệu mới ở đây
        } catch (error) {
            console.error('There was a problem with the role change:', error);
        }
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    const columns = [
        { field: "stt", headerName: "STT", width: 50, },
        { field: "mssv", headerName: "MSSV", width: 100 },
        { field: "fullname", headerName: "Họ và Tên", width: 150 },
        { field: "username", headerName: "Tài khoản", width: 150 },
        { field: "major", headerName: "Chuyên ngành", width: 100 },
        { field: "email", headerName: "Email", width: 200 },

        {
            field: 'roles',
            headerName: 'Role',
            width: 300,
            renderCell: (params) => (
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.value && params.value.some((role) => role.name === 'Student')}
                                onChange={(event) => {
                                    handleRoleChange(params.row.id, '1F5DB339-436A-4E6A-A470-683511DE294A', event.target.checked);
                                }}
                                name="STUDENT"
                            />
                        }
                        label="Student"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.value && params.value.some((role) => role.name === 'Admin')}
                                onChange={(event) => {
                                    handleRoleChange(params.row.id, '6F94AB7B-AA4F-4985-9542-EE9562AACF99', event.target.checked);
                                }}
                                name="ADMIN"
                            />
                        }
                        label="Admin"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.value && params.value.some((role) => role.name === 'Censor')}
                                onChange={(event) => {
                                    handleRoleChange(params.row.id, '261AC8C4-0AC6-456B-BFE9-F5474E441B15', event.target.checked);
                                }}
                                name="MENTOR"
                            />
                        }
                        label="Mentor"
                    />

                </div>
            ),
        },


        {
            field: 'deleteUser',
            headerName: 'Xóa',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(params.row.id)}
                >
                    Xóa
                </Button>
            ),
        },
        {
            headerName: "Edit",
            field: "edit",
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <EditUserButton userId={params.row.id} />
                    </div>
                );
            },
        },
    ];


    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" >
                <Header title="THÔNG TIN TẤT CẢ NGƯỜI DÙNG" subtitle="Quản lý tài khoản User" />
                <Box>
                    <Link href="/" sx={{ margin: "10px" }}>
                        <Button
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px"
                            }}

                        >
                            <DeleteOutlinedIcon /> Xóa
                        </Button>
                    </Link>
                    <Link href="/" sx={{ margin: "10px" }}>
                        <Button
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px"
                            }}

                        >
                            <DriveFileRenameOutlineOutlinedIcon /> Chỉnh sửa
                        </Button>
                    </Link>
                    <Link href="/form" sx={{ margin: "10px" }}>
                        <Button
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px"
                            }}

                        >
                            <PersonAddAltIcon /> Thêm mới
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Box
                // m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    getRowId={(user) => user.id}

                    rows={userData}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};
