import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home/home";
import { STier } from "./pages/S-Tier/stier";
import { AIMasterClass } from "./pages/AI-MasterClass/AIMasterClass";
import { ESPresence } from "./pages/ESPresence/ESPresence";
import { ChildGuardAutomation } from "./pages/ChildGuard/childGuard";
import { AIIntent } from "./pages/AI-Intent/aiIntent";
import { GlobalContext } from "./pages/GlobalContext/globalContext";
import { BatteryStatus } from "./pages/BatteryStatus/batteryStatus";
import classnames from "classnames";
import logo from "./images/Chaperone-splash.png";
import "./App.scss";

enum URLRoutes {
  Home = "/",
  AI_MasterClass = "ai-master-class",
  S_Tier = "stier",
  ESPresence = "espresence",
  ChildGuard = "childGuard",
  GlobalContext = "globalContext",
  AI_Intent = "aiIntent",
  Battery_Status = "batteryStatus",
}

// Create a condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia("(min-width: 768px)");

// // Initial check
// handleTabletChange(mediaQuery);

const App = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navClass = classnames({ "app__left-nav--open": isMenuVisible });

  useEffect(() => {
    mediaQuery.addEventListener("change", handleTabletChange);
  }, []);

  const handleTabletChange = (e: any) => {
    // Check if the media query is true
    if (!e.matches) {
      setIsMenuVisible(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="app text-slate-100">
      <header className="app__header bg-slate-700 justify-between flex">
        <a href="/" className="uppercase text-l font-sans font-extrabold ">
          <img
            className="app__logo"
            src={logo}
            alt="Technithusiast Chaperone."
          />
        </a>
        <button className="app__menu-btn" onClick={toggleMenu}>
          Menu
        </button>
      </header>

      <div className="app__container">
        <div className={`app__left-nav ${navClass}`}>
          <ul className="rounded border border-slate-600 bg-slate-700">
            <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
              <Link
                to={URLRoutes.AI_MasterClass}
                className="hover:text-rose-500"
              >
                AI Master Class Series
              </Link>
            </li>
            <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
              <Link to={URLRoutes.S_Tier} className="hover:text-rose-500">
                Avoid this lame trigger and use this one instead
              </Link>
            </li>
            <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
              <Link to={URLRoutes.ESPresence} className="hover:text-rose-500">
                ESPresence Automations
              </Link>
            </li>
            <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
              <Link to={URLRoutes.ChildGuard} className="hover:text-rose-500">
                Child Guard Automation
              </Link>
            </li>
            <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
              <Link to={URLRoutes.AI_Intent} className="hover:text-rose-500">
                AI Intent Plugin
              </Link>
            </li>
            <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
              <Link
                to={URLRoutes.GlobalContext}
                className="hover:text-rose-500"
              >
                Global Context
              </Link>
            </li>
            <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
              <Link
                to={URLRoutes.Battery_Status}
                className="hover:text-rose-500"
              >
                Battery Status
              </Link>
            </li>
            {/* <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
              <Link to="/webhook-master-class">Webhook Master Class</Link>
            </li> */}
          </ul>
        </div>

        <div className="app__right-nav content-center">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route
                path={URLRoutes.AI_MasterClass}
                element={<AIMasterClass />}
              />
              <Route path={URLRoutes.S_Tier} element={<STier />} />
              <Route path={URLRoutes.Home} element={<Home />} />
              <Route path={URLRoutes.ESPresence} element={<ESPresence />} />
              <Route
                path={URLRoutes.Battery_Status}
                element={<BatteryStatus />}
              />
              <Route
                path={URLRoutes.GlobalContext}
                element={<GlobalContext />}
              />
              <Route path={URLRoutes.AI_Intent} element={<AIIntent />} />
              <Route
                path={URLRoutes.ChildGuard}
                element={<ChildGuardAutomation />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
