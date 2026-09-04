import { Route, Routes } from "react-router-dom";
import {
  Home,
  Student,
  TeacherLogin,
  TeacherRegister,
  TeacherHome,
  Teacher_LoginOrRegister,
  AddStudentForm,
} from "./index";

import UnderConstruction from "./pages/UnderConstruction";

function App() {
  return (
    <>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Teacher routes */}
        <Route path="/teacher/loginOrRegister" element={<Teacher_LoginOrRegister />} />

        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/register" element={<TeacherRegister />} />

        <Route path="/teacher/home" element={<TeacherHome />} />

        <Route path="/test" element={<AddStudentForm />} />
        {/* Student routes */}
        {/* <Route path="/student" element={<Student />} /> */}

        {/* All other routes */}
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </>
  );
}

export default App;
