import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function AddStudentForm({setShowStudentForm, setReload}) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [error, setError] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    gender: "female",
    phone: "",
    phone2: "",
    subject: "",
    batch: "",
    joinDate: new Date().toISOString().split("T")[0],
    // email: "",
    // password: "",
    // verified: "",
    // photo: "",
    paymentStyle: "arrears",
    feeAmount: "",
  })  

  const handleChange = (e)=>{
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();
      setError("");

      console.log("heeeee")
      console.log(formData)

      const response = await fetch(`${API_URL}/student/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || "Can't create new student.")
      }

      console.log(data);
      setShowStudentForm(false);
      setReload(true);
      toast.success("New student created.");
    } 
    catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  useEffect(()=>{
    ;(async ()=>{
      try {
        const response = await fetch(`${API_URL}/teacher/getTeacher`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });

        const data = await response.json();

        if(!response.ok){
          throw new Error(data.message || "Can't fetch teacher.");
        }

        console.log("Available subjects fetched successfully.")
        console.log(data.data.subjects);

        setAvailableSubjects(data.data.subjects);
        setFormData((prev)=>({
          ...prev,
          subject: data.data.subjects[0]
        }))
      } 
      catch (error) {
        console.log(error.message);
      }
    })()
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/10 p-4">
        <div className="relative mx-auto my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <button
            onClick={() => setShowStudentForm(false)}
            className="absolute top-4 right-4 rounded-lg px-3 py-1 text-slate-100 bg-red-500 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
          <h2 className="mb-8 text-2xl font-bold text-slate-800">
            Add Student
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Student Name
              </label>
              <input
                required={true}
                type="text"
                placeholder="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700
                          outline-none transition placeholder:text-slate-400
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Gender
              </label>

              <div className="flex flex-wrap gap-6">
                {["Male", "Female", "Other"].map((ele) => (
                  <label
                    key={ele}
                    className="flex cursor-pointer items-center gap-2 text-slate-600"
                  >
                    <input
                      required={true}
                      type="radio"
                      id={ele}
                      name="gender"
                      value={ele.toLowerCase()}
                      checked={formData.gender === ele.toLowerCase()}
                      onChange={handleChange}
                      className="h-4 w-4 accent-blue-600"
                    />
                    {ele}
                  </label>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Contact Number
              </label>
              <input
                required={true}
                type="tel"
                placeholder="Enter contact number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                          outline-none transition placeholder:text-slate-400
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Alternative Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Alternative Contact Number
              </label>
              <input
                type="tel"
                placeholder="(Optional)"
                name="phone2"
                value={formData.phone2}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                          outline-none transition placeholder:text-slate-400
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Subject
              </label>

              <select
                required={true}
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3
                          text-slate-700 outline-none transition
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                {availableSubjects.map((ele) => (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Batch
              </label>
              <input
                type="text"
                placeholder="Enter student's batch"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                          outline-none transition placeholder:text-slate-400
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Joining Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Admission Date
              </label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                          text-slate-700 outline-none transition
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Payment Style */}
            <div>
              <select
                required={true}
                name="paymentStyle"
                value={formData.paymentStyle}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="advance">
                  Advance
                </option>
                <option value="arrears">
                  Arrears-PostPaid
                </option>
              </select>
            </div>

            {/* Fee */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Student Fee
              </label>
              <input
                required={true}
                type="number"
                placeholder="Enter fee amount"
                min="0"
                name="feeAmount"
                value={formData.feeAmount}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                          outline-none transition placeholder:text-slate-400
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold
                        text-white shadow-sm transition
                        hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-300
                        active:scale-[0.98]"
            >
              Add Student
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddStudentForm