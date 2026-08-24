import {NavLink} from "react-router-dom"

function Teacher_LoginOrRegister() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
            Teacher
          </h1>

          <NavLink
            to="/teacher/login"
            className="block w-full text-center bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-base sm:text-lg hover:bg-blue-700 active:bg-blue-800 transition"
          >
            Log In
          </NavLink>

          <div className="flex justify-center items-center gap-2 mt-6 text-sm sm:text-base">
            <p className="text-gray-500">
              Don't have an account?
            </p>

            <NavLink
              to="/teacher/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </NavLink>
          </div>

        </div>
      </div>

    </>
  )
}

export default Teacher_LoginOrRegister;