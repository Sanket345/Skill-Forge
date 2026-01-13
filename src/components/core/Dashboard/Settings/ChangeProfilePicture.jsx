import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { LuUpload } from "react-icons/lu";
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewSource(URL.createObjectURL(file));
  };

  const handleUplod = () => {
    const formData = new FormData();
    formData.append("displayPicture", imageFile);
    dispatch(updateDisplayPicture(token, formData));
  };

  return (
    <div className="flex items-center gap-6 rounded-lg bg-richblack-800 p-6">
      {/* PROFILE IMAGE */}
      <img
        src={previewSource || user.image}
        alt="profile"
        className="h-20 w-20 rounded-full object-cover"
      />

      {/* RIGHT CONTENT */}
      <div className="flex flex-col gap-3">
        <p className="text-lg font-semibold text-richblack-5">
          Change Profile Picture
        </p>

        <div className="flex gap-3">
          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* SELECT BUTTON */}
          <button
            onClick={handleSelectClick}
            className="cursor-pointer rounded-md bg-richblack-700 px-5 py-2 text-sm font-semibold text-richblack-50 hover:bg-richblack-600"
          >
            Select
          </button>

          {/* UPLOAD BUTTON (NO LOGIC ATTACHED) */}
          <IconBtn text="Upload" onclick={handleUplod}>
            <LuUpload />
          </IconBtn>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
