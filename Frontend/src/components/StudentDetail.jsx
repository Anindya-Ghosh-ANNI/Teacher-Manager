import { useEffect } from 'react'
import toast from "react-hot-toast"


function StudentDetail({studentData, setStudentIdx}) {
  useEffect(()=>{
    console.log("Student Detail: ", studentData);
  }, [])

  const API_URL = import.meta.env.VITE_API_URL;

  const handlePayment = ()=>{
    async ()=>{
      try {
        const response = await fetch(`${API_URL}/payment/create/${studentData._id}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payment)
        });
        const data = await response.json();

        if(!response){
          throw new Error(data.message || "Process failed. Can't register payment.")
        }

        console.log(data);
        toast.success("New payment registered.")
      } 
      catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-4 backdrop-blur-sm">
        <div className="relative max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">

          {/* Close */}  
          <button
            onClick={() => setStudentIdx("")}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-5 border-b border-slate-200 pb-4 pr-10">
            <h2 className="text-xl font-bold text-slate-800">
              {studentData.name}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Student Details
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3">

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500">Paid upto</span>
              <span className="text-right text-sm font-medium text-slate-800">
                {/* paid date */}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500">Payment Style</span>
              <span className="text-right text-sm font-medium text-slate-800">
                {studentData.paymentStyle}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500">Phone</span>
              <span className="text-right text-sm font-medium text-slate-800">
                {studentData.phone}
              </span>
            </div>

            {studentData.phone2 && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-500">Phone 2</span>
                <span className="text-right text-sm font-medium text-slate-800">
                  {studentData.phone2}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500">Subject</span>
              <span className="text-right text-sm font-medium text-slate-800">
                {studentData.subject}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500">Gender</span>
              <span className="text-right text-sm font-medium capitalize text-slate-800">
                {studentData.gender}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500">Fee Amount</span>
              <span className="text-right text-base font-bold text-green-600">
                ₹{studentData.feeAmount}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-500">Join Date</span>
              <span className="text-right text-sm font-medium text-slate-800">
                {new Date(studentData.joinDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </span>
            </div>

          </div>

          {/* Payment */}
          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Pay fee for
            </label>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="h-11 w-20 rounded-lg border border-slate-300 bg-white
                          px-2 text-center text-base outline-none
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <span className="text-sm text-slate-600">
                month(s)
              </span>
            </div>
          </div>

          {/* Pay */}
          <button
            onClick={handlePayment}
            className="mt-4 h-12 w-full rounded-xl bg-blue-600
                      text-sm font-semibold text-white
                      transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Pay Fee
          </button>

        </div>
      </div>
    </>
  )
}

export default StudentDetail