import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import carousel1 from "../assets/carousel1.jpg"
import carousel2 from "../assets/carousel2.jpg"
import carousel3 from "../assets/carousel3.jpg"
import carousel4 from "../assets/carousel4.jpg"
import Category from './Category';
import FoodList from './FoodList';


const Home = () => {
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
  return (
    <div className=''>
      
      {/* Carousel Slider */}
        <section className='mt-5 mb-10 overflow-hidden'>
            <div>
                <Slider {...settings} className=' px-2'>

                    <div className=' w-full mx-auto h-[200px] rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <img src={carousel1} className='h-full w-full object-cover rounded-3xl' alt="" /> 
                    </div>

                    <div className=' w-full mx-auto h-[200px] rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <img src={carousel2} className='h-full w-full object-cover rounded-3xl' alt="" />
                    </div>

                    <div className=' w-full mx-auto h-[200px] rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <img src={carousel3} className='h-full w-full object-cover rounded-3xl' alt="" />
                    </div>

                    <div className=' w-full mx-auto h-[200px] rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <img src={carousel4} className='h-full w-full object-cover rounded-3xl' alt="" />
                    </div>

                </Slider>
            </div>
        </section>

      {/*  Category Section */}
        <section className='mb-10'>
            <div className=' px-6'>
                <div className='text-[22px] font-bold text-[#fff] mb-5 BoldText'>Category</div>
                <div className=' mb-10'>
                    <Category/>
                </div>
                {/* Items Display */}
                <div>
                    <FoodList/>
                </div>
            </div>
        </section>

        {/* Footer */}
        <section>

        </section>

    </div>
  )
}

export default Home
