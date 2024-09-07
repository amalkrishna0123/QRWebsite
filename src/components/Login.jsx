import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Make sure to import the CSS
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import introImg from "../assets/intro-img.jpg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Admin Logged Successfully');
      window.location.href = "/";
      toast.success("Admin Logged Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Incorrect Username or Password", {
        position: "top-center",
      });
    }
  };

  const showHidePassword = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  return (
    <div className='overflow-hidden'>
      <ToastContainer />  {/* Ensure the ToastContainer is added */}
      <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full'>
        <div className='w-full h-full'>
          <img src="https://res.cloudinary.com/dqydgc2ky/image/upload/v1725617306/2151535189_umqcrd.jpg" className=' w-full h-full object-cover' alt="" />
        </div>

        <div className='flex justify-center items-center w-[90%] mx-auto'>
          <div className='absolute w-[90%] mx-auto h-[400px] bg-[#ffffff55] bottom-[100px] rounded-3xl GlassBg'>
            <div className='text-center pt-5 text-[32px] font-bold mb-10 text-[#fff]'>
              Login
            </div>
            <form action="" className='px-6' autoComplete="off" onSubmit={handleSubmit}>
              <input type="text" className='py-4 outline-none border-none w-full pl-5 rounded-3xl mb-10 GlassBg' placeholder='Enter Your User Name ' required autoComplete='off' onChange={(e) => setEmail(e.target.value)} />

              <div className='w-full relative flex flex-col justify-center items-center'>
                <input
                  type={showPassword ? "text" : "password"} placeholder='Password' className='w-full py-3 outline-none border-none rounded-3xl mb-5 InputStyle px-5 GlassBg lg:mx-auto lg:w-[600px]' autoComplete='off' required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className='absolute right-5 cursor-pointer top-4' onClick={showHidePassword}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <div className='flex justify-center items-center gap-5'>
                <Link to="/">
                  <button className='px-10 py-3 rounded-3xl bg-[#921A40] GlassBg text-[#fff] font-bold'>Home</button>
                </Link>
                <button className='px-10 py-3 rounded-3xl bg-[#921A40] GlassBg text-[#fff] font-bold' type='submit'>Login</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
