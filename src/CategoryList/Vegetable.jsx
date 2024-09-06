import React, { useState, useEffect } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { db } from "../components/Firebase";
import { ref as dbRef, push, set, onValue, remove } from "firebase/database";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { motion } from "framer-motion"
import Filter from '../components/Filter';
import { IoCloseSharp } from "react-icons/io5";


const Vegetable = () => {
  
  const [foodLists, setFoodLists] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemSubtitle, setItemSubtitle] = useState('');
  const [itemParagraph, setItemParagraph] = useState('');
  const [price, setPrice] = useState('');
  const [vegOption, setVegOption] = useState('Veg');
  const [filterMenu, setFilterMenu] = useState(false)
  const [sortMenu, setSortMenu] = useState(false)


  // Fetch food items from Firebase
  useEffect(() => {
    const itemsRef = dbRef(db, 'vegetableItems');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFoodLists(Object.entries(data).map(([id, value]) => ({ id, ...value })));
      }
    });
  }, []);

  // Handle adding new item
  const handleAddItem = (e) => {
    e.preventDefault();
    const newItemRef = push(dbRef(db, 'vegetableItems'));
    set(newItemRef, {
      name: itemName,
      sub: itemSubtitle,
      middle: itemParagraph,
      price,
      vegOption
    }).then(() => {
      clearForm();
    });
  };

  // Handle deleting item
  const handleDelete = (id) => {
    const itemRef = dbRef(db, `vegetableItems/${id}`);
    remove(itemRef);
  };

  // Clear form after submitting
  const clearForm = () => {
    setItemName('');
    setItemSubtitle('');
    setItemParagraph('');
    setPrice('');
    setVegOption('Veg');
  };

  // Filter 
  const openFilterMenu = () => {
    setFilterMenu(!filterMenu)
  }

  const openSortMenu = () =>{
    setSortMenu(!sortMenu)
  }

// Disable / Enable Button
  function toggleSwitch() {
    const toggleButton = document.querySelector('.DisableIcon');
    toggleButton.classList.toggle('active');
  }

  return (
    <div>
      { filterMenu && (
        <div className=' relative z-[999]'>
          <Filter setFilterMenu = {setFilterMenu} filterMenu = {filterMenu}/>
        </div>
      )}
      <div className=' flex justify-start items-center mt-10 gap-10'>
        <div className=' rounded-3xl bg-[#ffffff47] px-6 py-2 font-bold GlassBg text-[#fff] flex justify-center items-center gap-2 cursor-pointer ' onClick={openFilterMenu}>Filter <span className='text-2xl'><HiOutlineAdjustmentsHorizontal/></span></div>
        <div className=' rounded-3xl bg-[#ffffff47] px-4 py-2 font-bold GlassBg text-[#fff] flex justify-center items-center gap-1 cursor-pointer  relative z-[100]' onClick={openSortMenu}>Sort by <span className='text-xl'><MdKeyboardArrowDown/></span></div>
        {/* Disable / Enable */}
        <div className='DisableIcon cursor-pointer' onClick={toggleSwitch}></div>
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
      {/* Adding Section */}
      <div className='flex justify-center items-center mb-5 w-full mt-10'>
        <form onSubmit={handleAddItem} className='flex flex-col justify-center gap-5 w-full'>
          <input
            type="text"
            placeholder='Enter the name'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className='py-3 pl-3 outline-none border-none rounded-xl InputForm'
          />
          <input
            type="text"
            placeholder='Subtitle'
            value={itemSubtitle}
            onChange={(e) => setItemSubtitle(e.target.value)}
            className='py-3 pl-3 outline-none border-none rounded-xl InputForm'
          />
          <input
            type="text"
            placeholder='Description'
            value={itemParagraph}
            onChange={(e) => setItemParagraph(e.target.value)}
            className='py-3 pl-3 outline-none border-none rounded-xl InputForm'
          />
          <input
            type="number"
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='py-3 pl-3 rounded-xl outline-none border-none InputForm'
          />
          <select
            value={vegOption}
            onChange={(e) => setVegOption(e.target.value)}
            className='py-3 px-3 rounded-xl border-none outline-none InputForm'
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
          <div className='flex justify-center items-center'>
            <button type='submit' className='px-10 py-3 rounded-3xl bg-[rgba(255,255,255,0.2)] text-[#ffffff] font-bold GlassBg'>
              Add Item
            </button>
          </div>
        </form>
      </div>

      {/* Displaying Items */}
      <div className='flex flex-col gap-5 justify-center items-center'>
        {foodLists.map((item) => (
          <div key={item.id} className='w-full h-[100px] bg-[#ffffff25] rounded-3xl GlassBg flex justify-between items-center gap-5 px-5'>
            <div>
              <div className='text-[#fff] font-bold text-lg BoldText text-[16px] leading-tight'>{item.name}</div>
              <div className='text-sm text-[#fff]'>{item.sub}</div>
            </div>
            <div className='flex flex-col justify-center items-center gap-5'>
              <div className='text-sm text-[#fff]'>{item.middle}</div>
              <div className='cursor-pointer text-[#fff] text-2xl' onClick={() => handleDelete(item.id)}><MdDelete /></div>
            </div>
            {/* Price */}
            <div>
              <div className='text-[#fff] font-bold flex justify-center items-center gap-1 text-lg BoldText'>
                <FaIndianRupeeSign />{item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vegetable
