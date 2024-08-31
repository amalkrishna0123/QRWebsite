import React, { useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { motion } from "framer-motion"


const Filter = ({setFilterMenu , filterMenu}) => {
    
    const [selectedFilter, setSelectedFilter] = useState('Sort')

  return (
    <div>
      <motion.div
      initial={{height:0,opacity:0,y:100}}
      animate={{y:0,height:'auto', opacity:1,transition:{duration:.5,ease:'backInOut'}}}
      className='fixed bottom-0 right-0 left-0 top-72 bg-[#fff] z-50  rounded-t-3xl'>
            {/* <div className=' absolute right-10 top-10'>
                <IoCloseCircle className=' text-2xl text-[#921A40]'/>
            </div> */}
            <div className=' flex justify-between px-10 py-5 items-center'>
                <div className=' font-bold text-xl text-[#921A40] BoldText'>Filter</div>
                <div className=' text-xl text-[#921A40] cursor-pointer drop-shadow-sm' onClick={()=>setFilterMenu(!filterMenu)}><IoCloseCircle/></div>
            </div>

            {/* Sort Content */}
            <div className='flex justify-center items-center'>
                {/* Left */}
                <div className={ `flex flex-col justify-start gap-7 border p-5 w-[40%] h-[370px] ${ selectedFilter === 'Sort' && 'text-[#921A40]'}`}>
                    <div className='font-bold text-lg cursor-pointer BoldText text-[#302e2e]' onClick={()=>setSelectedFilter('Sort')}>Sort</div>

                    <div className={`font-bold text-lg cursor-pointer BoldText text-[#302e2e] ${ selectedFilter === 'NonVeg' && 'text-[#921A40]'}`} onClick={()=>setSelectedFilter('NonVeg')}>Veg/Non-Veg</div>

                    <div className={`font-bold text-lg cursor-pointer BoldText text-[#302e2e] ${ selectedFilter === 'CostForTwo' && 'text-[#921A40]' }`} onClick={()=>setSelectedFilter('CostForTwo')}>Cost For Two</div>

                </div>
                {/* Right (1) */}
                { selectedFilter === "Sort" &&(
                    <div className=' w-[60%] border h-[370px] pt-5 pl-8 Right1'>
                        <div className="flex justify-start items-center gap-2 relative">
                            <input
                                type="radio"
                                className="w-4 h-4 border-2 border-[#921A40] appearance-none checked:bg-[#921A40] rounded-none cursor-pointer relative foodType"
                                name="foodType"
                            />
                            <div className="text-lg font-bold BoldText text-[#302e2e]">Low to High</div>
                        </div>
                    
                        <div className=' flex justify-start items-center gap-2 relative'>
                        <input
                            type="radio"
                            className="w-4 h-4 border-2 border-[#921A40]  appearance-none checked:bg-[#921A40] rounded-none cursor-pointer relative foodType"
                            name="foodType"
                        />
                            <div className='text-lg font-bold BoldText text-[#302e2e]'>High to Low</div>
                        </div>
                </div>
                )}

                {/* Right (2) */}
                { selectedFilter === "NonVeg" && (
                    <div className=' w-[60%] border h-[370px] pt-5 pl-8 Right2'>
                        <div className="flex justify-start items-center gap-2 relative">
                            <input
                                type="radio"
                                className="w-4 h-4 border-2 border-[#921A40] appearance-none checked:bg-[#921A40] rounded-none cursor-pointer relative foodType"
                                name="foodType"
                            />
                            <div className="text-lg font-bold BoldText text-[#302e2e]">Non Veg</div>
                        </div>
                    
                        <div className=' flex justify-start items-center gap-2 relative'>
                        <input
                            type="radio"
                            className="w-4 h-4 border-2 border-[#921A40]  appearance-none checked:bg-[#921A40] rounded-none cursor-pointer relative foodType"
                            name="foodType"
                        />
                            <div className='text-lg font-bold BoldText text-[#302e2e]'>Veg</div>
                        </div>
                </div>
                )}
                

                {/* Right (3) */}
                {selectedFilter === "CostForTwo" && (
                    <div className=' w-[60%] border h-[370px] pt-5 pl-8 Right3'>
                        <div className="flex justify-start items-center gap-2 relative">
                            <input
                                type="radio"
                                className="w-4 h-4 border-2 border-[#921A40] appearance-none checked:bg-[#921A40] rounded-none cursor-pointer relative foodType"
                                name="foodType"
                            />
                            <div className="text-lg font-bold BoldText text-[#302e2e]">Less than 100</div>
                        </div>
                    
                        <div className=' flex justify-start items-center gap-2 relative'>
                        <input
                            type="radio"
                            className="w-4 h-4 border-2 border-[#921A40]  appearance-none checked:bg-[#921A40] rounded-none cursor-pointer relative foodType"
                            name="foodType"
                        />
                            <div className='text-lg font-bold BoldText text-[#302e2e]'>Greater than 100</div>
                        </div>
                </div>
                )}
                

            </div>


            {/* Bottom Side */}
            <div className=' absolute h-[100px] bottom-0 left-0 right-0 bg-[#921A40] py-8'>
                <div className=' flex justify-center items-center gap-10'>
                    <div className=' px-8 py-2 rounded-2xl bg-[#fff] font-bold text-[#921A40] cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] BoldText'>Clear Filter</div>
                    <div className='px-8 py-2 rounded-2xl bg-[#ff7700] font-bold text-[#ffffff] cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)] BoldText'>Apply</div>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default Filter