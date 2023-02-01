import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import Georeference from "./scenes/georeference";
import Navigation from "./scenes/navigation";
import ManualControl from "./scenes/consola";
import { useEffect, useState } from "react";
import io from "socket.io-client";
function App() {
  const [theme, colorMode] = useMode();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  console.log("APP");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              {socket ? (
                <>
                  <Route path="/" element={<Dashboard socket={socket} />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route
                    path="/georeference"
                    element={<Georeference socket={socket} />}
                  />
                  <Route
                    path="/navigation"
                    element={<Navigation socket={socket} />}
                  />
                  <Route path="/mancontrol" element={<ManualControl />} />
                </>
              ) : (
                <Route path="/" element={<FAQ />} />
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
