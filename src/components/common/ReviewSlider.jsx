import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 18;

  const fetchReviews = async () => {
    try {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!reviews.length) {
    return <p className="text-center text-richblack-5">No Reviews Found</p>;
  }

  return (
    <div className="w-full py-10">
      <Swiper
        centeredSlides={true}
        spaceBetween={40}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={i} className="flex justify-center">
            {/* BIGGER CARD */}
            <div className="w-[340px] rounded-xl bg-richblack-800 p-6 text-richblack-25 shadow-lg">
              {/* USER INFO */}
              <div className="mb-4 flex items-center gap-4">
                <img
                  src={
                    review?.user?.image ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  alt="user"
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                  <h1 className="font-semibold text-richblack-5">
                    {review?.user?.firstName} {review?.user?.lastName}
                  </h1>
                  <p className="text-sm text-richblack-400">
                    {review?.course?.courseName}
                  </p>
                </div>
              </div>

              {/* REVIEW TEXT */}
              <p className="mb-4 text-sm leading-relaxed break-words">
                {review?.review?.split(" ").length > truncateWords
                  ? review.review.split(" ").slice(0, truncateWords).join(" ") +
                    " ..."
                  : review.review}
              </p>

              {/* RATING */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-yellow-100">
                  {review?.rating?.toFixed(1)}
                </span>

                <ReactStars
                  count={5}
                  value={review?.rating}
                  size={22}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ReviewSlider;
