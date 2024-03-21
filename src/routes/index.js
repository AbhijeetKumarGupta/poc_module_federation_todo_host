import React from 'react';
import TodoDetails from "../pages/details";
import Home from "../pages/home";
import { Route, Routes } from "react-router";

const RoutesComp = () => {

    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:todoId" element={<TodoDetails />} />
        </Routes>
    )
}
export default RoutesComp;
