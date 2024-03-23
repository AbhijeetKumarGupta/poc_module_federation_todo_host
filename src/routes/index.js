import React from 'react';
import TodoDetails from "../pages/details";
import Home from "../pages/home";
import { Route, Routes } from "react-router";

const RoutesComp = () => {

    return(
        <Routes>
            <Route path="/poc_module_federation_todo_host" element={<Home />} />
            <Route path="/poc_module_federation_todo_host/:todoId" element={<TodoDetails />} />
            <Route path="*" element={
                <h1 style={{display:'flex', width:'100%', justifyContent:'center', color:'white'}}>404 Not Found</h1>
            } />
        </Routes>
    )
}
export default RoutesComp;
