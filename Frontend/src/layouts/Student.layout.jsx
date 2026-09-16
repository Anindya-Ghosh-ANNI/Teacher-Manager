import { Header_student } from "../index.js";
import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <>
      <Header_student />
      <Outlet />
    </>
  );
}

export default StudentLayout;
