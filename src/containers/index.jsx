import React from "react";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
const Body = () => {
  return (
    <body className="body">
      <Dashboard />
      <div className="container-fluid">
        <Header />
        <div className="flexible-content white-skin">
          <main style={{ margin: "0rem 3% 0rem" }}>
            <h2>Coucou</h2>
          </main>
        </div>
      </div>
    </body>
  );
};

export default Body;
