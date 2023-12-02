import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Checkbox, FormControl, FormControlLabel, TextField, Typography } from "@mui/material";
import Header from "./Header";

export const EditUserPage = () => {
  const { userId } = useParams();
  const [userToEdit, setUserToEdit] = useState(null);
  const [studentPermission, setStudentPermission] = useState(false);
  const [mentorPermission, setMentorPermission] = useState(false);
  const [adminPermission, setAdminPermission] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserToEdit(userData);

        setStudentPermission(userData.role === "student");
        setMentorPermission(userData.role === "mentor");
        setAdminPermission(userData.role === "admin");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleStudentPermissionChange = (event) => {
    setStudentPermission(event.target.checked);
    // Additional logic for handling permission change
  };

  const handleMentorPermissionChange = (event) => {
    setMentorPermission(event.target.checked);
    // Additional logic for handling permission change
  };

  const handleAdminPermissionChange = (event) => {
    setAdminPermission(event.target.checked);
    // Additional logic for handling permission change
  };

  const handleSaveChanges = () => {
    // Logic to save changes, update user data, etc.
    // This function should send updated data to the server or perform necessary actions to update user data
    // For example, make a PATCH request to update user data
  };

  return (
    <>
      <Box m="20px">
        <Box display={"flex"} justifyContent={"space-between"}>
          <Header
            title="CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG"
            subtitle="Chỉnh sửa hồ sơ người dùng"
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Box>
        </Box>
        {userToEdit && (
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: "span 2" },
              margin: "30px 70px 0 70px"
            }}
          >
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <TextField
                label="Họ và tên"
                defaultValue={userToEdit.fullname}
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <TextField
                label="Email"
                defaultValue={userToEdit.email}
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <TextField
                label="Tài khoản"
                defaultValue={(userToEdit.username || "")}
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <TextField
                label="Mật khẩu"
                defaultValue={userToEdit.password}
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <TextField
                label="Chuyên ngành"
                defaultValue={userToEdit.major}
                fullWidth
                variant="outlined"
              />
            </FormControl>
            {/* Other text fields for user information */}
            {/* ... */}
            <FormControl sx={{ marginBottom: "20px" }}>
              <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
                Permissions
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={studentPermission}
                    onChange={handleStudentPermissionChange}
                    name="studentPermission"
                  />
                }
                label="Student"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mentorPermission}
                    onChange={handleMentorPermissionChange}
                    name="mentorPermission"
                  />
                }
                label="Mentor"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={adminPermission}
                    onChange={handleAdminPermissionChange}
                    name="adminPermission"
                  />
                }
                label="Admin"
              />
            </FormControl>
          </Box>
        )}
      </Box>
    </>
  );
};
