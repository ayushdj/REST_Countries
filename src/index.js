import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Countries from './components/countries/countries';
import Header from './components/header/header';
import SpecificCountry from './components/specificCountry/specificCountry';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Header/>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={[<Countries/>]} />
            <Route path="/specificCountry/:specificCountryName" element={<SpecificCountry/>}/>
          </Routes>
        </BrowserRouter>
      </div>

  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
