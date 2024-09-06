import React, { useState, useEffect, useRef } from 'react';
import { ref, set, push, remove, onValue } from 'firebase/database';
import { db, storage, auth } from './Firebase'; // import firebase instance
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { onAuthStateChanged } from 'firebase/auth';
import { FiSearch } from "react-icons/fi";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemImage, setItemImage] = useState(null);
    const [categoryItems, setCategoryItems] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [editItemName, setEditItemName] = useState('');
    const [editItemPrice, setEditItemPrice] = useState('');
    const [editItemImage, setEditItemImage] = useState(null);
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const inRef1 = useRef();
    const inRef2 = useRef();
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Fetch categories from Firebase
    useEffect(() => {
        const categoryRef = ref(db, 'categories/');
        onValue(categoryRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const categoryList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setCategories(categoryList);

                // Set default category if categories exist
                if (categoryList.length > 0) {
                    const defaultCategory = categoryList[0].id;
                    setSelectedCategory(defaultCategory);
                }
            }
        });
    }, []);

    // Fetch items for the selected category
    useEffect(() => {
        if (selectedCategory) {
            fetchCategoryItems(selectedCategory);
        }
    }, [selectedCategory]);

    const fetchCategoryItems = (categoryId) => {
        const itemsRef = ref(db, `categories/${categoryId}/items`);
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const itemList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setCategoryItems(itemList);
            } else {
                setCategoryItems([]);
            }
        });
    };

    const handleFileInput = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    const handleItemFileInput = (e) => {
        console.log("HandleItem Input",e.target.files)
        setItemImage(e.target.files[0]);
        e.target.value = null;
    };

    const uploadCategory = () => {
        if (categoryName && categoryImage) {
            const newCategoryRef = push(ref(db, 'categories/'));
            const imageRef = storageRef(storage, `categories/${newCategoryRef.key}`);
            uploadBytes(imageRef, categoryImage).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    set(newCategoryRef, {
                        name: categoryName,
                        imageUrl: url,
                        link: categoryName.toLowerCase(),
                    });
                    setCategoryName('');
                    setCategoryImage(null);
                });
            });
        }
    };

    const uploadItem = async () => {
        console.log(selectedCategory,itemName,itemPrice,itemImage)
        if (selectedCategory && itemName && itemPrice && itemImage) {
            setIsLoading(true); // Set loading state to true
        
            try {
                const newItemRef = push(ref(db, `categories/${selectedCategory}/items`));
                const imageRef = storageRef(storage, `items/${newItemRef.key}`);
                
                // Upload the image and get the download URL
                const snapshot = await uploadBytes(imageRef, itemImage);
                const url = await getDownloadURL(snapshot.ref);
                
                // Store item data in the database
                await set(newItemRef, {
                    name: itemName,
                    price: itemPrice,
                    imageUrl: url,
                });
                
                // Reset the form
                setItemName('');
                setItemPrice('');
                setItemImage(null);
                setShowSuccess(true); // Show success message
                setTimeout(() => setShowSuccess(false), 5000); // Hide success message after 5 seconds
            } catch (error) {
                console.error('Upload error:', error);
            } finally {
                setIsLoading(false); // Turn off loading state
            }
        }
    };
    
    const saveItem = async () => {
        if (editItemId) {
            setIsLoading(true); // Set loading state to true
            try {
                const itemRef = ref(db, `categories/${selectedCategory}/items/${editItemId}`);
        
                if (editItemImage) {
                    const imageRef = storageRef(storage, `items/${editItemId}`);
                    
                    // Upload the image and get the download URL
                    const snapshot = await uploadBytes(imageRef, editItemImage);
                    const url = await getDownloadURL(snapshot.ref);
                    
                    // Update item data in the database
                    await set(itemRef, {
                        name: editItemName,
                        price: editItemPrice,
                        imageUrl: url,
                    });
                } else {
                    // Update item data in the database without image
                    await set(itemRef, {
                        name: editItemName,
                        price: editItemPrice,
                    });
                }
                
                // Reset the edit state
                resetEditState();
                setShowSuccess(true); // Show success message
                setTimeout(() => setShowSuccess(false), 5000); // Hide success message after 5 seconds
            } catch (error) {
                console.error('Update error:', error);
            } finally {
                setIsLoading(false); // Turn off loading state
            }
        }
    };
    
    

    const deleteItem = (itemId) => {
        const itemRef = ref(db, `categories/${selectedCategory}/items/${itemId}`);
        remove(itemRef);
    };

    const deleteCategory = (categoryId) => {
        const categoryRef = ref(db, `categories/${categoryId}`);
        remove(categoryRef)
            .then(() => {
                console.log('Category and all associated items deleted successfully.');
                // Optionally, reset the selected category or handle any UI updates here
                if (selectedCategory === categoryId) {
                    setSelectedCategory('');  // Reset selected category if the deleted one was selected
                    setCategoryItems([]);  // Clear the items list
                }
            })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });
    };

    const resetEditState = () => {
        setEditItemId(null);
        setEditItemName('');
        setEditItemPrice('');
        setEditItemImage(null);
    };

    const handleCategorySelectImage = () => {
        inRef1.current.click();
    };

    const handleItemsSelectImage = () => {
        console.log("Inref2",inRef2)
        inRef2.current.click();
    };

    return (
        <div className='w-full scroll-smooth'>
            {/* Category Adding */}
            {user && (
                <div className='flex flex-col justify-center items-center gap-5 w-full mb-10'>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder='Enter Category Name'
                        className='w-full py-3 rounded-xl pl-3 border-none outline-none'
                    />
                    <div className='flex justify-center items-center gap-10'>
                        <input type="file" ref={inRef1} accept='image/*' onChange={handleFileInput} className='cursor-pointer hidden' />
                        <div onClick={handleCategorySelectImage} className='px-8 py-2 rounded-xl GlassBg bg-[#ffffff4a] text-[#ffff] font-bold cursor-pointer'>
                            Select
                        </div>
                        <div onClick={uploadCategory} className='px-8 py-2 rounded-xl GlassBg bg-[#ffffff4a] text-[#ffff] font-bold cursor-pointer'>
                            Upload
                        </div>
                    </div>
                </div>
            )}

            {/* Display Categories */}
            <div className='mb-10'>
                <div className='flex justify-start items-start gap-10 ScrollBarHidden overflow-x-auto'>
                    {categories.map((item) => (
                        <div
                            key={item.id}
                            className='cursor-pointer'
                            onClick={() => setSelectedCategory(item.id)}
                        >
                            <div className='w-[70px] h-[70px] rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex-shrink-0 bg-[#fff]'>
                                <img src={item.imageUrl} className='w-full h-full object-cover rounded-full' alt={item.name} />
                            </div>
                            <div className='text-center mt-2 font-bold text-[#fff] BoldText'>{item.name}</div>
                            { user && (
                                <div className=' text-[#f00] flex justify-center cursor-pointer text-2xl' onClick={() => deleteCategory(item.id)}><MdDelete/></div>
                            )}
                            
                        </div>
                    ))}
                </div>
            </div>

            {/* { confirmDelete && ( */}
                
            {/* )} */}

            {/* Items Adding */}
            {user && (
                <div className='mb-10 flex justify-center items-center'>
                    <form className='flex flex-col justify-center items-center gap-5 w-full'>
                        <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            placeholder='Item Name'
                            className='w-full py-3 pl-3 border-none outline-none rounded-xl'
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className='w-full p-3 rounded-xl outline-none border-none'
                        >
                            <option disabled value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            placeholder='Item Price'
                            className='w-full py-3 pl-3 rounded-xl border-none outline-none'
                        />
                        <div className='flex items-center justify-center gap-10'>
                            <input type="file" ref={inRef2} accept='image/*' className='hidden' onChange={handleItemFileInput} />
                            <div onClick={handleItemsSelectImage} className='px-8 py-2 rounded-xl GlassBg bg-[#ffffff4a] text-[#ffff] font-bold cursor-pointer'>
                                Select Image
                            </div>
                            <div onClick={uploadItem} className='px-8 py-2 rounded-xl GlassBg bg-[#ffffff4a] text-[#ffff] font-bold cursor-pointer'>
                                Upload
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Items Display */}
            <div className='mb-10'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='outline-none border-none relative w-full py-3 pl-5 rounded-xl'
                    placeholder='Search'
                />
                <div className='flex flex-col gap-5 mt-5'>
                    {categoryItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                        categoryItems
                            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((item) => (
                                <div key={item.id} className='GlassBg rounded-xl bg-[#ffffff3e] w-full h-[80px] flex justify-between items-center px-2'>
                                    <div className='w-[60px] overflow-hidden GlassBg rounded-xl'>
                                        <img src={item.imageUrl} className='w-full h-full object-contain' alt={item.name} />
                                    </div>
                                    <div className='text-[#fff] flex items-center gap-2 text-xl'>
                                        {user && (
                                            <div
                                                className='cursor-pointer'
                                                onClick={() => handleEditClick(item)}
                                            >
                                                <MdEdit />
                                            </div>
                                        )}
                                        {user && (
                                            <div
                                                className='cursor-pointer'
                                                onClick={() => deleteItem(item.id)}
                                            >
                                                <MdDelete />
                                            </div>
                                        )}
                                        <div className='flex flex-col items-end justify-end'>
                                            <div className='BoldText'>{item.name}</div>
                                            <div className='flex items-center gap-2 BoldText'>
                                                <FaIndianRupeeSign className='text-[#ffffff] text-lg ' />
                                                {item.price}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className='text-[#fff]'>No items available in this category</div>
                    )}
                </div>
            </div>

            {/* Edit Item */}
            {editItemId && (
                <div className=' fixed top-0 bottom-0 left-0 right-0 flex justify-center flex-col bg-[#ffffffd0]'>
                    <div className=' bg-[#000] p-5 w-[90%] mx-auto rounded-3xl'>
                        <div className='flex flex-col items-center justify-center gap-5 mb-5'>
                            <input
                                type="text"
                                value={editItemName}
                                onChange={(e) => setEditItemName(e.target.value)}
                                placeholder='Edit Item Name'
                                className='w-full py-3 pl-3 rounded-xl border-none outline-none'
                            />
                            <input
                                type="number"
                                value={editItemPrice}
                                onChange={(e) => setEditItemPrice(e.target.value)}
                                placeholder='Edit Item Price'
                                className='w-full py-3 pl-3 rounded-xl border-none outline-none'
                            />
                            <input
                                type="file"
                                onChange={(e) => setEditItemImage(e.target.files[0])}
                                className='hidden'
                                ref={inRef2}
                            />
                            <div className='flex gap-10'>
                                <div
                                    onClick={() => inRef2.current.click()}
                                    className='px-8 py-2 rounded-xl GlassBg bg-[#ffffff4a] text-[#ffff] font-bold cursor-pointer'
                                >
                                    Select Image
                                </div>
                                
                            </div>
                        </div>
                    <div className=' flex justify-center items-center gap-10'>
                        <div
                            onClick={() => setEditItemId(null)}
                            className='px-8 py-2 rounded-xl GlassBg bg-[#ff000086] text-[#ffff] font-bold cursor-pointer'
                        >
                            Cancel
                        </div>
                        <div
                            onClick={saveItem}
                            className='px-8 py-2 rounded-xl GlassBg bg-[#00f2ff97] text-[#ffffff] font-bold cursor-pointer'
                        >
                            Save
                        </div>
                        
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default Category;
