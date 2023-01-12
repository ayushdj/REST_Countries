import React from 'react';
import './countries.css';
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import region_options from '../../util/regions';
import {FaSearch} from 'react-icons/fa';

/**
 * Represents all the countries - makes an API call to the countries API
 * upon loading the page
 * 
 * @returns the Countries object
 */
const Countries = () => {

    /*
        States:
            allCountries: the local representation of the countries
            isLoaded: a boolean flag that gets set to false once the
                      countries have loaded
            error: if there is an error, this will show to the screen
            currSearchText: keeps track of what the user has searched
            currRegion: the currently selected region
            isOpen: boolean representing if the drop down menu is open
            currRegionLabel: the current region label for the dropdown
    */
    const [allCountries, setAllCountries] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState("");
    const [currSearchText, setCurrSearchText] = useState('');
    const [currRegion, setCurrRegion] = useState('');
    const [isOpen, setOpen] = useState(false);
    const [currRegionLabel, setCurrRegionLabel] = useState('Filter by Region');

    /**
     * event handling function to toggle the dropdown
     */
    const handleDropDown = () => {
        setOpen(!isOpen);
    };


    /**
     * Load the initial state of the data from the API
     */
    const retrieveAllData = async () => {
        const response = await fetch(`https://restcountries.com/v2/all`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
             });
        if (!response.ok) {
            setError("There was an error retrieving the data. Please reload the page and try again");
        }
        const countries = await response.json();
        // set the initial state in local storage
        localStorage.setItem("rest_countries_initial_state", JSON.stringify(countries));

        // for (let i = 0; i < countries.length; i++) {
        //     let currCountry = countries[i];
        //     localStorage.setItem(currCountry.alpha3Code, currCountry.name);
        // }

        // set our state variables
        setAllCountries(countries);
        setIsLoaded(true);
    }


    /*
        gets called upon loading the page
    */
    useEffect(() => {
        retrieveAllData();
    },[]);

    /**
     * The call back function that gets executed whenever the user
     * filters countries by region.
     * @param {} selectedRegion 
     * @returns N/A
     */
    const getCountriesByRegion = async (selectedRegion) => {
        // If we have selected an actual region, then we make the async call
        if (selectedRegion !== 'all') {

            // access data from local storage
            let lowerCaseRegion = selectedRegion.toLowerCase();
            let initialState = localStorage.getItem("rest_countries_initial_state");
            let actualInitialState = JSON.parse(initialState);
            let filteredCountriesByRegion = [];

            // loop over the initial state 
            for (let i = 0; i < actualInitialState.length; i++){
                let currCountry = actualInitialState[i];
                // if we have a previous search filter and we change the region, thn we need to let the user know
                if (currSearchText !== '') {
                    if (currCountry.region.toLowerCase() === lowerCaseRegion && currCountry.name.toLowerCase().includes(currSearchText)) {
                        filteredCountriesByRegion.push(currCountry);
                    }
                } 
                // if the search bar is empty, then we just need to check the region
                else {
                    if (currCountry.region.toLowerCase() === lowerCaseRegion) {
                        filteredCountriesByRegion.push(currCountry);
                    }
                }

            }
            // if there is a previous search bar word that isn't a valid country,
            // then we have to let the user know
            if (filteredCountriesByRegion.length === 0) {
                setError("Invalid search - Please try again");
                setIsLoaded(true);
            } 
            // 
            else {
                setAllCountries(filteredCountriesByRegion);
                setError("");
                setIsLoaded(true);
                setCurrRegion(selectedRegion);
            }

        } 
        // If the user selects all, then we just retrieve all the data again.
        else {
            // retrieveAllData();
            setCurrRegion('');
            let initialState = localStorage.getItem("rest_countries_initial_state");
            let actualInitialState = JSON.parse(initialState);
            let filteredCountriesByRegion = [];
            if (currSearchText !== '') {
                for (let i = 0; i < actualInitialState.length; i++) {
                    if (actualInitialState[i].name.toLowerCase().includes(currSearchText.toLowerCase())) {
                        filteredCountriesByRegion.push(actualInitialState[i]);
                    }
                }
                setAllCountries(filteredCountriesByRegion);
                setError("");
            } else {
                setAllCountries(actualInitialState);
                setError("");
                setIsLoaded(true);
            }
        }
    }

    /**
     * The call back function that gets executed whenever
     * a new character is being typed in the search bar 
     * @param searchVal the country we are searching for
     */
    const getCountriesBySearch = (searchVal) => {

        // only if we have typed something do we execute the code
        if (searchVal !== '') {
            let lowerCaseSearchVal = searchVal.toLowerCase();
            let initialState = localStorage.getItem("rest_countries_initial_state");
            let actualInitialState = JSON.parse(initialState);
            const filteredCountries = [];
            for (let i = 0; i < actualInitialState.length; i++) {
                let currCountry = actualInitialState[i];
                if (currRegion.toLowerCase() !== 'all' && currRegion !== '') {
                    if (currCountry.region.toLowerCase() === currRegion.toLowerCase()) {
                        if (currCountry.name.toLowerCase().includes(lowerCaseSearchVal)) {
                            filteredCountries.push(currCountry);
                        }
                    }
                } else if (currRegion.toLowerCase() === 'all' || currRegion === '') {
                    if (currCountry.name.toLowerCase().includes(lowerCaseSearchVal)) {
                        filteredCountries.push(currCountry);
                    }
                }
            }
            // If we haven't found any countries, then we need to 
            // let the user know.
            if (filteredCountries.length === 0) {
                setError("Invalid search. Please try again.");
                setIsLoaded(true);
            } 
            // If we have found countries, then we set the error to be empty.
            else {
                setError("");
                setIsLoaded(true);
                setAllCountries(filteredCountries);
            }
        } 
        // if there is nothing in the search bar, then we simply retrieve the countries
        // from local storage
        else {
            let initialState = localStorage.getItem("rest_countries_initial_state");
            let actualInitialState = JSON.parse(initialState);
            if (currRegion !== '') {
                let filteredByCountries = [];
                for (let i = 0; i < actualInitialState.length; i++) {
                    if (actualInitialState[i].region.toLowerCase() === currRegion.toLowerCase()) {
                        filteredByCountries.push(actualInitialState[i]);
                    }
                }
                setAllCountries(filteredByCountries);
            } else {
                setAllCountries(actualInitialState);
            }
        }
    }

    /**
     * Close the dropdown if its open and the user clicks somewhere else
     */
    const closeDropDown = () => {
        if (isOpen) {
            setOpen(!isOpen);
        }
    }
  
    /**
     * If we have an error we need to let the user know
     */
    if (error !== "") {
        return (
            <div className="global flex flex-col">
                <div class="flex  flex-row justify-between search_bar_and_filter flex-wrap">
                    <div class="xxs:pt-[120px] xs:pt-[50px] sm:inline-block md:inline-block sm:w-full xs:w-full xxs:w-full md:w-[40%] z-1">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div class="relative z-1">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-2 dark:text-black">
                                    <i class="fal mt-12 dark:text-black"><FaSearch/></i>
                                </span>
                            </div>
                            <input placeholder='Search for a country...' onChange={(e) => {
                                    const val = document.getElementById("actual_search_bar").value;
                                    setCurrSearchText(val);
                                    getCountriesBySearch(val);
                                }} name="search" type="text" id="actual_search_bar" value={currSearchText} class="h-12 w-full shadow-xl dark:bg-white dark:placeholder:text-black rounded-sm border-none search_bar_color pl-[30px] focus:text-white dark:focus:text-black">
                            </input>
                        </form>
                    </div>

                    <div class="z-1 xxs:w-full xs:w-full sm:w-full md:w-auto sm:inline-block md:inline-block region_filter">
                        <div className="flex flex-row justify-between">
                            <button onClick={handleDropDown} type="button" class="text-white dark:text-black inline-flex xxs:w-full xs:w-full sm:w-full md:w-44 dark:bg-white rounded-sm bg-[hsl(209,23%,22%)] px-4 py-2 text-sm font-medium  shadow-sm  focus:outline-none focus:ring-2 focus:shadow-[0_0_40px_rgba(0,0,0,0.2)]" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                {currRegionLabel}
                                <svg class="-mr-1 xxs:ml-auto md:ml-19 h-5 w-5 float-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>


                        {isOpen ?   <div class="absolute xxs:mr-[5%] xxs:ml-[5%] xs:mr-[5%] xs:ml-[5%] sm:mr-[5%] sm:ml-[5%] md:mr-[5%] xxs:w-[90%] xs:w-[90%] sm:w-[90%] md:w-44 right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="relative rounded-md" role="none">
                                {region_options.map((each) => {
                                    return (
                                        <>
                                            <li onClick={() => {
                                                setCurrRegionLabel(each.label);
                                                setCurrRegion(each.value);
                                                getCountriesByRegion(each.value);
                                                }} class="dropdown_li text-white dark:bg-white dark:text-black block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">{each.label}    
                                            </li>
                                        </>
                                    )
                                })}
                            
                            </div>
                        </div> : ""}
                        
                    </div>
                </div>
                <div className="loading_msg text-3xl flex justify-center dark:text-black place-items-center">
                    <center>{error}</center>
                </div>
            </div>
        )
    } 
    /**
     * skeleton loading - need to let the user know that the data is
     * on its way, so the user isn't left sitting with an empty screen
     * wondering what is going on.
     */
    else if (!isLoaded) {
        return (
            <div className="global flex flex-col">
                <div className="loading_msg text-3xl flex justify-center dark:text-black place-items-center"><center>Loading...</center></div>
            </div>
        )
        
    } 
    /**
     * If everything works correctly, then we load the countries.
     */
    else {
        return (
            <>
            <div className="global flex flex-col" onClick={() => closeDropDown()}>

                <div class="flex  flex-row justify-between search_bar_and_filter flex-wrap">
                    <div class="xxs:pt-[120px] xs:pt-[50px] sm:inline-block md:inline-block sm:w-full xs:w-full xxs:w-full md:w-[40%] z-1">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div class="relative z-1">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-2 dark:text-black">
                                    <i class="fal mt-12 dark:text-black"><FaSearch/></i>
                                </span>
                            </div>
                            <input placeholder='Search for a country...' onChange={(e) => {
                                    const val = document.getElementById("actual_search_bar").value;
                                    setCurrSearchText(val);
                                    getCountriesBySearch(val);
                                }} name="search" type="text" id="actual_search_bar" value={currSearchText} class="h-12 w-full shadow-xl dark:bg-white dark:placeholder:text-black rounded-sm border-none search_bar_color pl-[30px] focus:text-white dark:focus:text-black">
                            </input>
                        </form>
                    </div>

                    <div class="z-1 xxs:w-full xs:w-full sm:w-full md:w-auto sm:inline-block md:inline-block region_filter">
                        <div className="flex flex-row justify-between">
                            <button onClick={handleDropDown} type="button" class="text-white dark:text-black inline-flex xxs:w-full xs:w-full sm:w-full md:w-44 dark:bg-white rounded-sm bg-[hsl(209,23%,22%)] px-4 py-2 text-sm font-medium  shadow-sm  focus:outline-none focus:ring-2 focus:shadow-[0_0_40px_rgba(0,0,0,0.2)]" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                {currRegionLabel}
                                <svg class="-mr-1 xxs:ml-auto md:ml-19 h-5 w-5 float-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>


                        {isOpen ?   <div class="absolute xxs:mr-[5%] xxs:ml-[5%] xs:mr-[5%] xs:ml-[5%] sm:mr-[5%] sm:ml-[5%] md:mr-[5%] xxs:w-[90%] xs:w-[90%] sm:w-[90%] md:w-44 right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="relative rounded-md" role="none">
                                {region_options.map((each) => {
                                    return (
                                        <>
                                            <li onClick={() => {
                                                setCurrRegionLabel(each.label);
                                                setCurrRegion(each.value);
                                                getCountriesByRegion(each.value);
                                                }} class="dropdown_li text-white dark:bg-white dark:text-black block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">{each.label}    
                                            </li>
                                        </>
                                    )
                                })}
                            
                            </div>
                        </div> : ""}
                        
                    </div>
                </div>

                <div class="flex items-center justify-center max-w-full">

                    
                    <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-5"> 
                        {allCountries.map((each, idx) => (
                            <Link to={`/specificCountry/${each.name}`} style={{textDecoration:'none', color:'white'}}>
                                <div class="overflow-hidden rounded shadow-xl h-full cursor-pointer hover:scale-105 hover:z-1 duration-300 mb-8 
                                card_body dark:bg-white">
                                    <img src={each.flags.png} alt="country_image" class="w-full h-40 object-cover"/>
                                    <div className='pl-4 flex flex-col'>
                                        <h5 class="font-bold mt-4 card_title dark:text-black">{each.name}</h5>
                                        <span class="block actual_population dark:text-black">Population: {each.population.toLocaleString()}</span>
                                        <span class="block actual_region dark:text-black" >Region: {each.region}</span> 
                                        <span class="block actual_capital dark:text-black">Capital: {each.capital}</span>
                                    </div>

                                </div>
                            </Link>
                        ))}
                        </div>
                    </div>
                 </div>
            </>
        )
    }
}

export default Countries;