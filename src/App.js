import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RoutesComp from "./routes";

function App() {

  const router = createBrowserRouter([
    { path: "*", Component: RoutesComp },
  ]); 
  
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
