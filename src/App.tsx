import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home/home";
import { STier } from "./pages/S-Tier/stier";
import logo from "./images/Chaperone-splash.png";
import "./App.scss";
import { AIMasterClass } from "./pages/AI-MasterClass/AIMasterClass";

enum URLRoutes {
  Home = "/",
  AI_MasterClass = "ai-master-class",
  S_Tier = "stier",
}

function App() {
  return (
    <div className="app text-slate-100">
      <header className="app__header bg-slate-700">
        <a href="/" className="uppercase text-l font-sans font-extrabold">
          <img
            className="max-w-xs"
            src={logo}
            alt="Technithusiast Chaperone."
          />
        </a>
      </header>

      <div className="app__container">
        <div className="app__left-nav">
          <h3 className="text-lg mb-2">Navigation</h3>
          <ul className="rounded border border-slate-600 bg-slate-700">
            <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
              <Link to={URLRoutes.AI_MasterClass}>AI Master Class</Link>
            </li>
            <li className="w-full bg-slate-600 hover:bg-slate-500 active:bg-slate-800 border-b-s;-500">
              <Link to={URLRoutes.S_Tier}>
                Avoid this lame trigger and use this one instead
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
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
