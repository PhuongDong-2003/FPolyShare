import React from "react";
import BarChart from "../../components/BarChart";
import { Box, Button, Alert } from "@mui/material";
import Header from "../../components/Header";
// import { useTheme } from "@mui/material";
// import { tokens } from "../../theme";
// DATE
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
// ICONS
// import CachedIcon from "@mui/icons-material/Cached";

export const Bar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
  const [cleared, setCleared] = React.useState(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);
  return (
    <Box m="20px" height="75vh">
      <Box display="flex" justifyContent={"space-between"}>
        <Header
          title="BÁO CÁO THỐNG KÊ"
          subtitle="Thống kê thông tin các sản phẩm được đăng."
        />
        {/* MONTH-YEAR */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
            }}
          >
            <DemoItem label='Chọn "tháng" - "năm"'>
              <DatePicker
                views={["month", "year"]}
                sx={{ width: '190px',  }}
                slotProps={{
                  field: { clearable: true, onClear: () => setCleared(true) },
                }}
              />
            </DemoItem>

            {cleared && (
              <Alert
                sx={{ position: "absolute", top: 170, right: 0 }}
                severity="success"
              >
                Đã xóa!
              </Alert>
            )}
          </Box>
        </LocalizationProvider>
      </Box>
      <BarChart />
    </Box>
  );
};
