import React, { useState, useEffect } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { db } from "../components/Firebase";
import { ref as dbRef, push, set, onValue, remove } from "firebase/database";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { motion } from "framer-motion";
import Filter from '../components/Filter';
import { IoCloseSharp } from "react-icons/io5";
import biriyani from "../../src/assets/biriyani.png"


const Rice = () => {
  const [foodLists, setFoodLists] = useState([]);
  const [filteredFoodLists, setFilteredFoodLists] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemSubtitle, setItemSubtitle] = useState('');
  const [itemParagraph, setItemParagraph] = useState('');
  const [price, setPrice] = useState('');
  const [vegOption, setVegOption] = useState('Veg');
  const [filterMenu, setFilterMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);

  // Filter states
  const [sortOption, setSortOption] = useState(null); // 'Low to High' or 'High to Low'
  const [vegFilter, setVegFilter] = useState(null); // 'Veg' or 'Non-Veg'
  const [priceFilter, setPriceFilter] = useState(null); // 'Less than 100' or 'Greater than 100'

  // Fetch food items from Firebase
  useEffect(() => {
    const itemsRef = dbRef(db, 'riceItems');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemList = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        setFoodLists(itemList);
        setFilteredFoodLists(itemList); // Initialize filtered list
      }
    });
  }, []);

  // Handle adding new item
  const handleAddItem = (e) => {
    e.preventDefault();
    const newItemRef = push(dbRef(db, 'riceItems'));
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
    const itemRef = dbRef(db, `riceItems/${id}`);
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

  // Apply filter and sorting
  const applyFilter = () => {
    let filteredData = [...foodLists];

    // Apply Veg/Non-Veg filter
    if (vegFilter) {
      filteredData = filteredData.filter(item => item.vegOption === vegFilter);
    }

    // Apply price filter
    if (priceFilter === 'Less than 100') {
      filteredData = filteredData.filter(item => parseInt(item.price) < 100);
    } else if (priceFilter === 'Greater than 100') {
      filteredData = filteredData.filter(item => parseInt(item.price) >= 100);
    }

    // Apply sorting
    if (sortOption === 'Low to High') {
      filteredData.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (sortOption === 'High to Low') {
      filteredData.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    }

    setFilteredFoodLists(filteredData);
  };

  // Clear all filters
  const clearFilter = () => {
    setFilteredFoodLists(foodLists);
    setSortOption(null);
    setVegFilter(null);
    setPriceFilter(null);
  };

  // Toggle menus
  const openFilterMenu = () => setFilterMenu(!filterMenu);
  const openSortMenu = () => setSortMenu(!sortMenu);

  // Disable / Enable Button
  function toggleSwitch() {
    const toggleButton = document.querySelector('.DisableIcon');
    toggleButton.classList.toggle('active');
  }


  return (
    <div>
      {/* Displaying Items */}
      <div className='flex flex-col gap-5 justify-center items-center'>
        {foodLists.map((item) => (
          <div key={item.id} className='w-full h-[100px] bg-[#ffffff25] rounded-3xl GlassBg flex justify-between items-center gap-5 px-5'>
            <div className=' rounded-xl GlassBg overflow-hidden'>
              <div className=' w-[60px] h-auto  rounded-xl'>
                <img src={biriyani} className=' w-full h-full rounded-xl ' alt="" />
              </div>
            </div>
            <div>

              <div>
                <div className='text-[#fff] font-bold text-lg BoldText text-[16px] leading-tight'>{item.name}</div>
                <div className='text-[#fff] font-bold flex justify-center items-center gap-1 text-lg BoldText'>
                  <FaIndianRupeeSign />{item.price}
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-5'>
              <div className='cursor-pointer text-[#fff] text-2xl' onClick={() => handleDelete(item.id)}><MdDelete /></div>
            </div>
            {/* Price */}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rice;
