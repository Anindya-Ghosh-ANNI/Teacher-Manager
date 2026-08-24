import { Route, Routes } from "react-router-dom";
import {
  Home,
  Student,
  TeacherLogin,
  TeacherRegister,
  TeacherHome,
  Teacher_LoginOrRegister,
} from "./index";

import UnderConstruction from "./pages/UnderConstruction";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/student" element={<Student />} /> */}
        <Route path="/teacher/loginOrRegister" element={<Teacher_LoginOrRegister />} />

        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/register" element={<TeacherRegister />} />

        {/* <Route path="/teacher/home" element={<TeacherHome />} /> */}


        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </>
  );
}

export default App;
