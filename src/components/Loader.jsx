import React from 'react'
import loaderAnimation from "../assets/loader.mp4"

const Loader = () => {
  return (
    <div>
      <div className=' fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-[#ffffff] flex flex-col justify-center items-center'>
        <div className=' w-[250px]'>
            <video src={loaderAnimation} autoPlay loop muted className='mix-blend-multiply' type="video/mp4">
                                    
            </video>
        </div>
      </div>
    </div>
  )
}

export default Loader
