import React from "react";
import "./HeaderOptions.css";
import { useNavigate } from "react-router-dom";
function HeaderOptions({ Icon, name, id, onItemClicked, link, active }) {
  const navigate = useNavigate();
  const handleClick = () => {
    onItemClicked(id);
    navigate(`${link}`);
  };
  return (
    <div
      className={`header__options ${active && "header__options"}`}
      onClick={handleClick}
    >
      <Icon />
      <p className="icon__name">{name}</p>
    </div>
  );
}

export default HeaderOptions;
