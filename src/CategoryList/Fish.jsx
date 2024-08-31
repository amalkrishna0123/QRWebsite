import React from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";


const Fish = () => {
    const foodLists = [
        { name : 'Fish Fry', sub : 'lorem ipsum color', middle : 'lorem ipsum dolor', price : '40'},
        { name : 'Fish Curry', sub : 'lorem ipsum color', middle : 'lorem ipsum dolor', price : '70'},
        { name : 'Karimeen Pollichath', sub : 'lorem ipsum color', middle : 'lorem ipsum dolor', price : '110'},
        { name : 'Fish Molly', sub : 'lorem ipsum color', middle : 'lorem ipsum dolor', price : '120'},
        { name : 'Avolly Fry', sub : 'lorem ipsum color', middle : 'lorem ipsum dolor', price : '100'},
    ]

  return (
    <div>
      <div className=' flex flex-col gap-5 justify-center items-center'>
        {foodLists.map((item)=>(
            <div className=' w-full h-[100px] bg-[#ffffff25] rounded-3xl GlassBg flex justify-between items-center gap-5 px-5'>
            <div>
                <div className=' text-[#fff] font-bold text-lg BoldText text-[16px] leading-tight'>{item.name}</div>
                <div className=' text-sm text-[#fff]'>{item.sub}</div>
            </div>

            <div>
                <div className=' text-sm text-[#fff]'>{item.middle}</div>
            </div>
            {/* Price */}
            <div>
                <div className='text-[#fff] font-bold flex justify-center items-center gap-1 text-lg BoldText'><span></span><FaIndianRupeeSign/>{item.price}</div>
            </div>
        </div>
        ))}
        
      
      </div>
    </div>
  )
}
export default Fish
