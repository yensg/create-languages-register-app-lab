import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import LanguageDisplay from "./components/LanguageDisplay";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserDisplay from "./components/UserDisplay";
import UpdateModal from "./components/UpdateModal";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <br />
      <div className="container order ">
        <NavBar />
        <div className="container border border-white">
          <Routes>
            <Route path="languages" element={<LanguageDisplay />} />
            <Route path="users" element={<UserDisplay />} />
            <Route path="updateModal" element={<UpdateModal />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
