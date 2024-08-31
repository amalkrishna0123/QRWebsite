import React, {useState} from 'react'
import rice from "../assets/rice.jpg"
import biriyani from "../assets/biriyani.png"
import chicken from "../assets/chicken.png"
import beef from "../assets/beef.png"
import fish from "../assets/fish.png"
import vegetable from "../assets/vegetable.png"
import drinks from "../assets/drinks.jpg"
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Filter from './Filter'
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion"

const Category = () => {

    const [filterMenu, setFilterMenu] = useState(false)
    const [sortMenu, setSortMenu] = useState(false)

    const openFilterMenu = () => {
        setFilterMenu(!filterMenu)
    }

    const openSortMenu = () =>{
        setSortMenu(!sortMenu)
    }


    const categories = [
        { name : 'Rice', img : rice },
        { name : 'Biriyani', img : biriyani },
        { name : 'Vegetable', img : vegetable },
        { name : 'Chicken', img : chicken },
        { name : 'Beef', img : beef },
        { name : 'Fish', img : fish },
        { name : 'Drinks', img : drinks },
    ]

  return (
    <div className='w-full   scroll-smooth'>
        {filterMenu ? (
            <Filter setFilterMenu = {setFilterMenu} filterMenu = {filterMenu} />
        ): (
            <div>
                <div className='flex justify-start items-center gap-10 ScrollBarHidden overflow-x-auto'>
            {categories.map((item, index)=>(
                <div className=' cursor-pointer'>
                    <div key={index} className='w-[70px] h-[70px] rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  flex-shrink-0 bg-[#fff]'>
                        <img src={item.img} className='w-full h-full object-cover rounded-full' alt={item.name} />
                    </div>
                    <div className='text-center mt-2 font-bold text-[#fff] BoldText'>{item.name}</div>
                </div>
            ))}
          </div>
          <div className=' flex justify-start items-center mt-10 gap-10'>
                <div className=' rounded-3xl bg-[#ffffff47] px-6 py-2 font-bold GlassBg text-[#fff] flex justify-center items-center gap-2 cursor-pointer ' onClick={openFilterMenu}>Filter <span className='text-2xl'><HiOutlineAdjustmentsHorizontal/></span></div>
                <div className=' rounded-3xl bg-[#ffffff47] px-4 py-2 font-bold GlassBg text-[#fff] flex justify-center items-center gap-1 cursor-pointer  relative z-[100]' onClick={openSortMenu}>Sort by <span className='text-xl'><MdKeyboardArrowDown/></span></div>
            </div>
            {sortMenu && (
                <div className=' flex justify-center items-center mt-1'>
                <motion.div
                initial={{height:0,opacity:0}}
                animate={{ height:'auto',opacity:1,transition:{duration:.5,ease:'backInOut'}}}
                className=' w-[200px] h-[150px] rounded-3xl bg-[#ffffff2a] relative shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] GlassBg'>
                    <IoCloseSharp className=' absolute right-5 top-5 cursor-pointer text-[#ffffff]' onClick={()=>setSortMenu(false)}/>

                    {/* Sorting Box */}
                    <div className='py-12'>
                        <div className='flex flex-col gap-5'>
                            <div className=' flex justify-evenly cursor-pointer font-bold text-[#ffffff]'>Low to High
                                <span><input type="radio" className='text-[#ffffff]' /></span>
                            </div>
                            <div className=' flex justify-evenly cursor-pointer font-bold text-[#ffffff]'>Hight to Low
                                <span><input type="radio" /></span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            )}
            </div>
        )}
        
     
    </div>
  )
}

export default Category