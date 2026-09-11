import {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {SubmitBtn} from "../../index.js"

function TeacherLogin() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();
      setLoader(true);      
  
      const formData = new FormData(e.target);
  
      const email = formData.get("email");
      const password = formData.get("password");
  
      const response = await fetch(`${API_URL}/teacher/login`, {
        method: "POST",
        headers: {    
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({email, password})
      });
      
      const data = await response.json();

      if(!response.ok){ 
        console.log(data);       
        throw new Error(data.message || "Login failed.");
      }

      toast.success("Login Successfull.");
      navigate(`/teacher/home`);
      
      console.log(data); // For success 
    } 
    catch (error) {
      console.log(error.message);
      setError(error.message);
    }
    finally{
      setLoader(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Teacher Login
            </h1>
            <p className="text-slate-500 mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email" name="email" placeholder="Enter your email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password" name="password" placeholder="Enter your password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <p className="text-red-500 text-sm">{error}</p>

            <SubmitBtn title="Login" type="submit" loader={loader} />

          </form>
        </div>
      </div> 
    </>
  )
}

export default TeacherLogin