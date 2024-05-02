import React from "react";
import "./LinkWithIcon.css";
import { NavLink } from "react-router-dom";

const LinkWithIcon = ({ title, link, emoji, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_link" : "align_center"}
    >
      {title} <img src={emoji} alt="" className="align_center link_emoji" />
    </NavLink>
  );
};

export default LinkWithIcon;
