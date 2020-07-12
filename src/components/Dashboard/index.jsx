import React from "react";
import { Link } from "react-router-dom";
require("./style.css");
const plusCircle = (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    fill-rule="evenodd"
    clip-rule="evenodd"
    className="plusCircle"
  >
    <path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z" />
  </svg>
);
const Dashboard = () => {
  return (
    <aside className="dashboard">
      <h2 className="text-center">Tableau de bord</h2>
      <nav>
        <Link to="/account" class="asideNavItem text-lg-center">
          <i class="fas fa-user-circle fa-fw"></i>
          <span>Mon compte</span>
        </Link>
        <Link to="/" class="asideNavItem">
          <i class="far fa-envelope-open fa-fw"></i>
          <span>Les annonces</span>
        </Link>
        <Link to="/application" class="asideNavItem">
          {plusCircle}
          <span>J'ai postulé</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Dashboard;
