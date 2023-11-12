import { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Sidebar } from "./pages/global/Sidebar";
import { Topbar } from "./pages/global/Topbar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { FAQ } from "./pages/faq";
import { Form } from "./pages/form";
import { List } from "./pages/list";
import { Mentors } from "./pages/mentors";
import { Students } from "./pages/students";
import { Chart } from "./pages/chart";
import { Profile } from "./pages/profile";
import { ChangeInfo } from "./pages/changeinfo";
import { Auth } from "./components/Auth";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="app">
            <Sidebar isSidebar={isSidebar}/>
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar}/>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/list" element={<List />} />
                <Route path="/mentors" element={<Mentors />} />
                <Route path="/students" element={<Students />} />
                <Route path="/form" element={<Form />} />
                <Route path="/chart" element={<Chart />} />
                <Route path="/faq" element={<FAQ />} />
                {/* drop down */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/change" element={<ChangeInfo />} />
                <Route path="/logout" element={<Auth />} />
              </Routes>
            </main>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
