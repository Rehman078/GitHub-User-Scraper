import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FetchUser from "./pages/FetchUser";
import UserList from "./pages/UserList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FetchUser />} />
                <Route path="/all-users" element={<UserList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
