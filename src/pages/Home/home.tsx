import React from "react"

import "./home.scss"

export const Home = () => {

    return <div className="home">
       
            <h1 className="text-3xl font-bold underline">
               Welcome to Chaperone!
            </h1>

            <p>
                This companion guide will show you interesting, sometimes complex, node-red configurations
                that can enhance your home assistant automations.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
    </div>
}