import { NavLink } from "react-router-dom";

function Header_student() {
  return (
    <header>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-red-600 font-bold" : "text-gray-700"
        }
      >
        Back
      </NavLink>

      <NavLink
        to="/student"
        end
        className={({ isActive }) =>
          isActive ? "text-red-600 font-bold" : "text-gray-700"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/student/profile"
        className={({ isActive }) =>
          isActive ? "text-red-600 font-bold" : "text-gray-700"
        }
      >
        Profile
      </NavLink>
    </header>
  );
}

export default Header_student