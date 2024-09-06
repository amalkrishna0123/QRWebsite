import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Category from './Category';
import UploadImages from './UploadImages';
import { Outlet } from 'react-router-dom';
import { auth, db, storage } from "./Firebase";
import { ref, onValue, remove } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { onAuthStateChanged } from 'firebase/auth';
import { FaUserAltSlash } from "react-icons/fa";
import wildScoop from "../assets/wild scoops.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom"


const Home = () => {
  const [posters, setPosters] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  useEffect(() => {
    const dbRef = ref(db, 'offerbanners');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedPosters = [];
      for (let key in data) {
        if (key !== 'latest') {
          fetchedPosters.push({ key, ...data[key] });
        }
      }
      setPosters(fetchedPosters);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (key, url) => {
    try {
      await remove(ref(db, `offerbanners/${key}`));
      const postersRef = storageRef(storage, `offerbanners/${url.split('/').pop().split('?')[0]}`);
      await deleteObject(postersRef);
      setPosters(posters.filter(poster => poster.key !== key));
    } catch (error) {
      console.error("Error deleting Poster:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
  };

  // Logout

  async function handleLogout() {
    try {
        await auth.signOut();
        window.location.href = "/";
        console.log('Admin Logout successfully');
    } catch (error) {
        console.error("Error Logging Out:", error.message);
    }
  }

  return (
    <div>
      {/* Navbar */}
      <header className='  p-5 w-full bg-[#fff] shadow-2xl rounded-b-3xl fixed z-[999] top-0 left-0'>
        <nav className=' flex justify-between'>
          <div className=' w-[150px]'>
            <img src={wildScoop} alt="" />
          </div>
          {user ? (<FaUserAltSlash onClick={handleLogout} className=' text-[#921A40] text-2xl drop-shadow-sm cursor-pointer'/>) : (<Link to='/AdminLogin'>
            <div className='text-[#921A40] text-2xl drop-shadow-sm cursor-pointer'><FaUser/></div></Link>)}
        </nav>
      </header>
      {/* Carousel Slider */}
      <section className='mt-24  overflow-hidden mb-5'>
        <div>
          <Slider {...settings} className='mx-auto'>
            {posters.length > 0 ? (
              posters.map((poster, index) => (
                <div key={index} className='w-full relative h-[200px] px-2 rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:h-[400px] dlg:h-[550px]'>
                  <img
                    src={poster.url}
                    className='w-full h-full rounded-3xl object-cover'
                    alt={`offer-poster-${index + 1}`}
                  />
                  {user && (
                    <div className="flex justify-center items-center absolute bottom-10 left-[50%] translate-x-[-50%]">
                      <button onClick={() => handleDelete(poster.key, poster.url)} className='px-8 py-1 mt-1 rounded-3xl bg-[#ff2020] font-bold text-[#fff] drop-shadow-md'>Delete</button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="grid place-items-center">Loading...</div>
            )}
          </Slider>
        </div>

        {/* Offer Poster Upload Section */}
        
          { user && (
            <div>
              <UploadImages storagePath="offerbanners" dbPath="offerbanners" />
            </div>
          )}
   
      </section>

      {/* Category Section */}
      <section className='mb-5'>
        <div className='px-6'>
          { user ? (
            <div className='text-[22px] font-bold text-[#fff] mb-5 BoldText drop-shadow-md'>Add Category</div>
          ) : (
            <div className='text-[22px] font-bold text-[#fff] mb-5 BoldText drop-shadow-md'>Categories</div>
          )}
          
          <div className='mb-5'>
            <Category /> {/* Category List */}
          </div>

          {/* Dynamic Items Display */}
          <div className=''>
            <Outlet /> {/* Will display category-specific content */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
