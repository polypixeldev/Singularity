import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; 

/*
Root of react site 
- Imports Helment provider for the page head
- And App which defines the content and navigation
*/

// Render the site https://reactjs.org/docs/react-dom.html#render
ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById("root")
);
