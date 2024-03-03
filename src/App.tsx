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
import { GPTInspiredAutomations } from "./pages/GPTInspiredAutomations/gptInspiredAutomations";
import classnames from "classnames";
import logo from "./images/Chaperone-splash.png";
import "./App.scss";
import { Mailbox } from "./pages/Mailbox/mailbox";

const URLRoutes = [
  { Component: Home, route: "/", name: "Home" },
  {
    Component: AIMasterClass,
    route: "ai-master-class",
    name: "AI MasterClass",
  },
  {
    Component: ESPresence,
    route: "espresence",
    name: "ESPresence Detection",
  },
  {
    Component: STier,
    route: "stier",
    name: "Avoid this lame trigger and use this one instead",
  },
  {
    Component: ChildGuardAutomation,
    route: "childGuard",
    name: "Child Guard Automations",
  },
  { Component: GlobalContext, route: "globalContext", name: "Global Context" },
  { Component: AIIntent, route: "aiIntent", name: "How to use AI-Intent" },
  {
    Component: BatteryStatus,
    route: "batteryStatus",
    name: "Battery Status Automation",
  },
  {
    Component: GPTInspiredAutomations,
    route: "gptInspired",
    name: "3 GPT-Inspired Automations",
  },
  {
    Component: Mailbox,
    route: "mailbox",
    name: "Mailbox Automation",
  },
];

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
            {URLRoutes.map(({ name, route }) => (
              <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
                <Link to={route} className="hover:text-rose-500">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="app__right-nav content-center">
          <div className="max-w-7xl mx-auto">
            <Routes>
              {URLRoutes.map(({ name, route, Component }) => {
                return <Route path={route} Component={Component} key={name} />;
              })}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
