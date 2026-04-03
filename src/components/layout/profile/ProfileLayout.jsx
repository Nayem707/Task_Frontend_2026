import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../feed/Navbar";
import BottomNav from "../feed/BottomNav";

const ProfileLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <BottomNav />
    </>
  );
};

export default ProfileLayout;
