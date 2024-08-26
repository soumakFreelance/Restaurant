import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import MediaCard from '../Components/Card';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

  const images = [
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHRpa2thfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://media.istockphoto.com/photos/chinese-food-veg-pizza-picture-id1341905237?k=20&m=1341905237&s=612x612&w=0&h=Lbuza1Ig5cC1PwQhqTsq-Uac8hg1W-V0Wx4d4lqDeB0=',
    'https://media.istockphoto.com/photos/king-fish-biryani-with-raita-served-in-a-golden-dish-isolated-on-dark-picture-id1409942571?b=1&k=20&m=1409942571&s=170667a&w=0&h=ozlMJf5hsDmS2sSdEdBWnoSZOEITef4qGMeWeq2lyTc=',
  ];

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch(
      // "http://localhost:5000/api/foodData"
      `${window.location.origin}/api/foodData`      
      , {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <Navbar />
      <div className="carousel-container">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          width="100%"
          dynamicHeight
          interval={3000} // Optional: Adjust autoplay interval (in ms)
          renderIndicator={() => null} // Hide default indicators if not needed
        >
          {images.map((picture, index) => (
            <div key={picture} className="carousel-slide">
              <img
                src={picture}
                alt={`I ${index + 1}`}
                className="carousel-image"
              />
              <div className="search-overlay">
                <input
                  type="search"
                  placeholder="Search..."
                  className="search-field"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="container">
        {
          foodCat.length > 0 ? foodCat.map((data) => (
            <div key={data._id} className='row mb-3'>
              <div className='categoryName'>{data.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? foodItem
                .filter((item) =>
                  (item.CategoryName === data.CategoryName) &&
                  (item.name.toLowerCase().includes(search.toLowerCase()))
                )
                .map(filterItems => (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <MediaCard 
                      foodItem={filterItems}
                      options={filterItems.options[0]}
                    />
                  </div>
                )) : "No such Data"}
            </div>
          )) : "Hii"
        }
        <MediaCard />
      </div>
      <Footer />
    </div>
  )
}
