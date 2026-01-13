import React from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";

function CourseDetailsCard({ course, isEnrolled, onBuy, onAddToCart }) {
  const thumbnail = course.thumbnail;
  const price = course.price;
  const instructions = course.instructions || [];

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="flex w-[400px] flex-col gap-5 rounded-xl bg-richblack-800 p-5 text-richblack-5 shadow-lg">
      <img
        src={thumbnail}
        alt={course.courseName}
        className="h-[220px] w-full rounded-xl object-cover"
      />

      <div className="flex flex-col gap-5 px-2">
        <p className="text-3xl font-bold text-richblack-5">₹ {price}</p>

        <div className="flex flex-col gap-3">
          <button className="yellowButton w-full" onClick={onBuy}>
            {isEnrolled ? "Go To Course" : "Buy Now"}
          </button>

          {!isEnrolled && (
            <button className="blackButton w-full" onClick={onAddToCart}>
              Add to Cart
            </button>
          )}
        </div>

        <p className="text-center text-sm text-richblack-300">
          30-Day Money-Back Guarantee
        </p>

        <div className="border-t border-richblack-600 pt-4">
          <p className="mb-3 text-lg font-semibold">This Course Includes</p>

          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {instructions.map((item, index) => (
              <div className="flex items-start gap-2" key={index}>
                <BsFillCaretRightFill className="mt-[2px]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="mx-auto flex items-center gap-2 pt-4 text-sm font-medium text-yellow-100 hover:text-yellow-50"
          onClick={handleShare}
        >
          <FaShareSquare size={14} />
          Share
        </button>
      </div>
    </div>
  );
}

export default CourseDetailsCard;
