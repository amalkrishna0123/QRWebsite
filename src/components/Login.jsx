import React from 'react'
import introImg from "../assets/intro-img.jpg"


const Login = () => {
  return (
    <div className=' overflow-hidden'>
      <div className=' fixed top-0 bottom-0 left-0 right-0 w-full h-full'>
        <div className='w-full h-full'>
            <img src={introImg} className=' w-full h-full object-cover' alt="" />
        </div>

        <div className=' flex justify-center items-center w-[90%] mx-auto'>
            {/* Login */}
            <div className=' absolute w-[90%] mx-auto h-[400px] bg-[#ffffff55] bottom-[100px] rounded-3xl GlassBg'>
                <div className=' text-center pt-5 text-[32px] font-bold text-[#2e2e2e] mb-10'>
                    Login
                </div>
                <form action="" className=' px-6'>
                    <input type="text" className='py-4 outline-none border-none w-full pl-5 rounded-3xl mb-10 GlassBg' placeholder='Enter Your User Name inputLogin' />

                    <input type="text" className='py-4 outline-none border-none w-full pl-5 rounded-3xl GlassBg mb-10' placeholder='Enter Your Password inputLogin' />

                    <div className=' flex justify-center items-center'>
                        <button className='px-10 py-3 rounded-3xl bg-[#921A40] GlassBg text-[#fff] font-bold'>Login</button>
                    </div>
                </form>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Login
