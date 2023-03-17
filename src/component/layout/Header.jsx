import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [scroll, setScroll] = useState(0);
  const logit = () => {
    setScroll(window.pageYOffset);
  };
  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    // Remove listener (like componentWillUnmount)
    return () => {
      window.removeEventListener("scroll", logit);
    };
  }, []);
  // ${
  //   scroll > 64.98
  //     ? "fixed inset-x-0 top-0 z-50 bg-slate-900/60 py-5"
  //     : "py-10"
  // }
  return (
    <>
      <header
        className={`header flex items-center justify-center gap-x-5 text-white  py-10`}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          to="/movies"
        >
          Movies
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          to="/moviesV2"
        >
          Movies V2
        </NavLink>
        {/* <NavLink
          className={({ isActive }) => (isActive ? "text-primary" : "")}
          to="/anime"
        >
          Anime
        </NavLink> */}
      </header>
    </>
  );
};

export default Header;
