import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function TeacherRegister() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  let content;

  const checkEmail = async (e)=>{
    try {
      const email = e.target.parentElement.querySelector("input").value;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        throw new Error("Enter a valid email id.")
      }

      const response = await 
        fetch(`${API_URL}/teacher/register/verifyEmail?email=${encodeURIComponent(email)}`, 
        {method: "get"}
      );

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || "Something went wrong.");
      }

      console.log(data);
      setStep(2);
    } 
    catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  const confirmPassword = async (e)=>{
    try {
      console.log(e.target.parentElement);
      
    } 
    catch (error) {
      console.log(error);
    }
  }

  if(step===1){
    content = (
      <>
        <div>hello</div>
        <input name='email' type="email" placeholder='email' key="email" required={true} />
        <p>{error}</p>
        <button onClick={checkEmail}>Verify</button>
      </>
    )
  }
  else if(step===2){
    content = (
      <>
        <div>hello2</div>
        <input placeholder='Set password' key="password" />
        <input type='password' placeholder='Confirm password' />
        <button onClick={confirmPassword}>Next</button>
      </>
    )
  }
  else if(step===3){
    content = (
      <div>hello3</div>
    )
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("Submit button clicked");
  }


  return (
    <>
      <div>TeacherRegister</div>
      <form onSubmit={handleSubmit}>
        {content}
      </form>
    </>
  )
}

export default TeacherRegister