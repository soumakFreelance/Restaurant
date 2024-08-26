import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Carousell() {
    // Define your carousel images here (replace with actual image URLs)
    const images = [
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHRpa2thfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHRpa2thfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      // 'https://images.unsplash.com/photo-1473106328154-ae21d6ff7836?vib=100&con=35',
    ];

    return (

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
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={image}
              alt={"rrore"}
              className="carousel-image"
            />
            <div className="search-overlay">
              <input type="text" placeholder="Search..." className="search-field" />
              <button variant='contained' color='success' size="small">Ok</button>
            </div>
           
          </div>
        ))}
      </Carousel>
    </div>
    );
  };
