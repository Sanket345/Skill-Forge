import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { NavLink, useNavigate } from "react-router-dom";
import * as LuIcons from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../common/ConfirmationModal";
import { logout } from "../../../services/operations/authAPI";
import { AiOutlineLogout } from "react-icons/ai";
const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const [modalData, setModalData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = () => {
    setModalData({
      text1: "Are you sure?",
      text2: "You will be logged out of your account",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(logout(navigate)),
      btn2Handler: () => setModalData(null),
    });
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r border-r-richblack-700 bg-richblack-800 py-10">
      {/* MAIN LINKS */}
      <div className="flex flex-col">
        {sidebarLinks
          .filter((link) => !link.type || link.type === user.accountType)
          .map((link) => {
            const Icon = LuIcons[link.icon];

            return (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-8 py-2 text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-yellow-900/40 text-yellow-300 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-yellow-400"
                      : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
                  }`
                }
              >
                <div className="flex items-center gap-x-2">
                  {Icon && <Icon className="text-lg" />}
                  <span>{link.name}</span>
                </div>
              </NavLink>
            );
          })}
      </div>

      {/* DIVIDER */}
      <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700" />

      {/* BOTTOM LINKS */}
      <div className="flex flex-col">
        {/* SETTINGS (NavLink now) */}
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `relative px-8 py-2 text-sm font-medium transition-all
            ${
              isActive
                ? "bg-yellow-900/40 text-yellow-300 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-yellow-400"
                : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
            }`
          }
        >
          <div className="flex items-center gap-x-2">
            <LuIcons.LuSettings className="text-lg" />
            <span>Settings</span>
          </div>
        </NavLink>

        <button
          onClick={showModal}
          className="px-8 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
        >
          <div className="flex items-center gap-x-2">
            <AiOutlineLogout className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>

      {modalData && <ConfirmationModal modalData={modalData} />}
    </div>
  );
};

export default Sidebar;
