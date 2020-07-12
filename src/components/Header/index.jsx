import React from "react";

import { Link } from "react-router-dom";
require("./style.css");

/* eslint-disable*/
const Header = (props) => {
  /** */
  const User = "John Doe";
  const relance = 1;
  let disabled = true;
  let notif;

  /** */
  if (relance >= 1) {
    notif = (
      <>
        <i class="fas fa-bell bell-red"></i>{" "}
        <span className="relance">{relance}</span>
      </>
    );
    disabled = false;
  } else {
    notif = <i class="fas fa-bell-slash"></i>;
    disabled = true;
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="d-flex justify-content-between">
        <a class="navbar-brand">{User}</a>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div></div>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <Link class="nav-link" to="/account">
              <i class="fas fa-user"></i>
              <span>Mon compte</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={disabled ? "" : "/relance"}>
              {notif}
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/login">
              <i class="fas fa-power-off fa-lg"></i>
              <span>Me déconnecter</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
