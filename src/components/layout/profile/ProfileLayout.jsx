import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../feed/Navbar";

const ProfileLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProfileLayout;
