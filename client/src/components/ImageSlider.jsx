import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "../styles/ImageSlider.css";

const ImageSlider = () => {
  const images = [
    "https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2020/03/brown-mushroom-53494-scaled.jpg",
    "https://www.thespruceeats.com/thmb/PDnFtFMkfMsRBC1XqhCv0OP-J6I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-are-button-mushrooms-5197530-hero-06-3d46a10b9e924f67849d5e7a049a6a2d.jpg",
    "https://dam.northwell.edu/m/58134fe13e76c0dd/Drupal-TheWell_raw-mushrooms_AS_383699935.jpg",
    "https://media.npr.org/assets/img/2018/02/02/enoki-promo_wide-c92847a3158972da9e6d65447a4f6355a9a465fa.jpg?s=1100&c=85&f=jpeg",
  ];

  return (
    <div className="slider-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="swiper-wrapper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="slide">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="slide-image object-cover w-full h-full"
              />
              <div className="slide-overlay" />
              <div className="slide-text">Up to 10% off Voucher</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
