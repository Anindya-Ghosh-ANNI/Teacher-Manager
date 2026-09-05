import { useEffect, useState } from 'react'
import {AddStudentForm, StudentCard, StudentDetail} from "../../index.js"

function TeacherHome() {
  const [student, setStudent] = useState([])
  const [teacherData, setTeacherData] = useState({})
  const [page, setPage] = useState("empty")
  const [error, setError] = useState("")
  const [reload, setReload] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const [showstudentForm, setShowStudentForm] = useState(false);
  const [studentIdx, setStudentIdx] = useState("");

  useEffect( ()=>{
    ;(async ()=>{
      try{
        if(!reload) return;
        setError("");

        
        // Fetching Students 
        const response = await fetch(`${API_URL}/teacher/find/active`, {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        
        
        if(!response.ok){
          throw new Error(data.message || "Failed to fetch students.");
        }
        
        console.log("Students: ", data);
        setStudent(data.data);        
        
        if(data.data.length) setPage("success");
        else setPage("empty");

        // Fetching Teacher
        const teacherResponse = await fetch(`${API_URL}/teacher/getTeacher`, {
          method: "GET",
          credentials: "include"
        });
        const data2 = await teacherResponse.json();

        if(!teacherResponse){
          throw new Error(data.message || "Failed to fetch teacher.")
        }

        console.log("Teacher: ", data2.data);
        setTeacherData(data2.data);
      }                         
      catch(error){
        setPage("error");
        console.log(error.message);
        setError(error.message)
      }
      finally{
        setReload(false);
      }
    })()
  }, [reload])


  let content;

  if(page==="error"){
    content = (
      <>
        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

            {/* Error Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <span className="text-2xl text-red-600">!</span>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-800">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error || "We couldn't load your students. Please try again."}
            </p>

            <button
              onClick={() => setReload(true)}
              className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Try Again
            </button>

          </div>
        </div>
      </>
    )
  }
  else if(page==="empty"){
    content = (
      <>
        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm relative">

            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2
                    M9 11a4 4 0 100-8 4 4 0 000 8z
                    M19 8v6
                    M22 11h-6"
                />
              </svg>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-800">
              No Students Yet
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add your first student to get started.
            </p>

            <button
              onClick={()=> setShowStudentForm(true)}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              Add Student
            </button>

            {showstudentForm && 
              <AddStudentForm 
                setShowStudentForm={setShowStudentForm}
                setReload={setReload}
              />
            }

          </div>
        </div>
      </>
    )
  }
  else if(page==="success"){
    content = (
      <>
        <div className="min-h-screen bg-slate-50 px-6 py-8">
          <div className=" mx-auto max-w-7xl">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">
                Students
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage and view your active students
              </p>
            </div>

            {/* Student count */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-700">
                Active Students
              </h2>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {student.length} Students
              </span>
            </div>

            {/* Students */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {student.map((ele, idx) => {
                return (
                  <div key={ele._id}>

                    {/* Individual Student Card */}
                    <StudentCard  name={ele.name} studentIdx={idx} setStudentIdx={setStudentIdx} />

                    {/* Student Detail */}
                    {idx===studentIdx && 
                      <StudentDetail 
                        studentData={student[idx]} 
                        setStudentIdx={setStudentIdx} 
                      />
                    }
                  </div>
                ) 
              })}
            </div>

            
            {/* Add Student Form */}
            {showstudentForm && 
              <AddStudentForm 
                setShowStudentForm={setShowStudentForm}
                setReload={setReload}
              />
            }
            
            {/* Add Student Buttom */}
            <button
              onClick={()=> setShowStudentForm(true)}
              className="fixed bottom-6 right-6 z-40 rounded-full bg-green-600 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-green-400 active:scale-95"
            >
              + Add Student
            </button>

          </div>          
        </div>
      </>
    )
  }

  return (
    <>
      {/* Full window */}
      <div className="min-h-screen bg-slate-50">
        {/* Header part */}
        <div className="border-b border-slate-200 px-6 py-4 flex justify-between">
          <h1 className="text-xl font-bold text-slate-800">
            Teacher Dashboard
          </h1>
          <div>
            <p className='font-semibold text-slate-700'>{teacherData.fullname}</p>
          </div>
        </div>

        {content}
      </div>
    </>
  )
}

export default TeacherHome          