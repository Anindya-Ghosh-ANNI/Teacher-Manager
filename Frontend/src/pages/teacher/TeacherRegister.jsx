import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function TeacherRegister() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    nickname: "",
    about: "",
    photo: "",  // ****
    gender: "male",
    address: "",
    phone: "",
    totalSubjects: "",
    subjects: [],
    mode: "offline",
  })
  const [pass2, setPass2] = useState("");
  let content;
  const navigate = useNavigate();

  useEffect(()=>{
    console.log("Number of subjects changed.");
  },[formData.subjects])

  // Functions
  const checkEmail = async (e)=>{
    try {
      setError("");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!emailRegex.test(formData.email)){
        throw new Error("Enter a valid email id.")
      }

      const response = await 
        fetch(`${API_URL}/teacher/register/verifyEmail?email=${encodeURIComponent(formData.email)}`, 
        {method: "get"}
      );

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || "Something went wrong.");
      }

      console.log(data.message);
      setError("");
      setStep(2);
    } 
    catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  const confirmPassword = async (e)=>{
    try {
      setError("")
      if(formData.password.length<8){
        throw new Error("Password must be of 8 characters.")
      }
      if(pass2!=formData.password){
        throw new Error("Passwords must match eachother.")
      }      

      console.log("Password set successfully.");
      setError("")
      setStep(3);
    }
    catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  const handleChange = (e)=>{
      const {name, value} = e.target;
  
      setFormData({
        ...formData,
        [name]: value
      })
  }

  const handleSubjectChange = (index, value)=> {
    formData.subjects[index]
    setFormData((prev)=>{
      const s = [...prev.subjects];
      s[index] = value;
      
      return{
        ...prev,
        subjects: s,
      }
    })
  }
  
  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();
      setError("");

      const response = await fetch(`${API_URL}/teacher/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })

      const data = await response.json();      

      if(!response.ok){
        throw new Error(data.message || "Something went wrong.")
      }
      
      console.log(data)
      toast.success("Teacher created successfully.")
      setError("");
      navigate("/teacher/home");
    }
    catch (error) {
      console.log(error);
      setError(error.message);
    }
  }


  // Conditional Rendering Logic
  if(step===1){
    content = (
      <>
        <div className="space-y-6">

          {/* Heading */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Enter your email.
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              
            </p>
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg
                      outline-none focus:ring-2 focus:ring-blue-500
                      focus:border-blue-500"
          />

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Verify */}
          <button
            type="button"
            onClick={checkEmail}
            className="w-full py-3 bg-blue-600 text-white font-medium
                      rounded-lg hover:bg-blue-700 transition
                      active:scale-[0.99]"
          >
            Verify Email
          </button>

        </div>
      </>
    )
  }
  else if(step===2){
    content = (
      <>
        <div className="space-y-6">

          {/* Heading */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Create Password
            </h2>
          </div>

          {/* Password fields */}
          <div className="space-y-4">

            <input
              placeholder="Set password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg
                        outline-none focus:ring-2 focus:ring-blue-500
                        focus:border-blue-500"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg
                        outline-none focus:ring-2 focus:ring-blue-500
                        focus:border-blue-500"
            />

          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Next button */}
          <button
            type="button"
            onClick={confirmPassword}
            className="w-full py-3 bg-blue-600 text-white font-medium
                      rounded-lg hover:bg-blue-700 transition
                      active:scale-[0.99]"
          >
            Next
          </button>

        </div>
      </>
    )
  }
  else if(step===3){
    content = (
      <>
        <div className="space-y-6">

          {/* Heading */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Teacher Details
            </h2>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-700">
              Basic Information
            </h3>

            <input
              type="text"
              placeholder="Full Name"
              required={true}
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Nickname (Optional)"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Tell students about yourself (Optional)"
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-3">
              Gender
            </p>

            <div className="flex gap-6">
              {["Male", "Female", "Other"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center gap-2 text-slate-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender.toLowerCase()}
                    required={true}
                    checked={formData.gender === gender.toLowerCase()}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-700">
              Contact Information
            </h3>

            <input
              type="text"
              placeholder="Address (Optional)"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              placeholder="Contact Number "
              name="phone"
              required={true}
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Teaching Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-700">
              Teaching Preferences
            </h3>

            <div>
              <p className="text-sm font-medium text-slate-700 mb-3">
                Teaching Mode
              </p>

              <div className="flex gap-6">
                {["Offline", "Online"].map((mode) => (
                  <label
                    key={mode}
                    className="flex items-center gap-2 text-slate-600 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="mode"
                      required={true}
                      value={mode.toLowerCase()}
                      checked={formData.mode === mode.toLowerCase()}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            <input
              type="number"
              placeholder="Number of Subjects"
              name="totalSubjects"
              required={true}
              value={formData.totalSubjects}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Subjects */}
            {Array.from(
              { length: Number(formData.totalSubjects) || 0 },
              (_, index) => (
                <input
                  key={index}
                  type="text"
                  required
                  value={formData.subjects[index] || ""}
                  onChange={(e)=> handleSubjectChange(index, e.target.value)}
                  placeholder={`Subject ${index + 1}`}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              )
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>

        </div>
      </>
    )
  }


  // Main page
  return (
    <>
      <div className="min-h-dvh bg-slate-100 flex items-center justify-center px-4 py-8">
        
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Teacher Registration
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            {content}
          </form>

        </div>

      </div>
    </>
  )
}

export default TeacherRegister