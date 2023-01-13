import React from 'react';
import './specificCountry.css';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SpecificCountry = () => {

    const obj = useParams();
    const [currentCountryName, setCurrentCountryName] = useState(obj.specificCountryName);
    const [currCountryBorders, setCurrCountryBorders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState("");
    const [currCountryObj, setCurrCountryObject] = useState({});
    const navigate = useNavigate();
    const [currLanguages, setCurrLanguages] = useState('');

    /**
     * If the user presses back, then we need to go back
     */
    const navigateBack = () => {
        navigate(-1);
    }

    /**
     * This hook runs when first loading the page
     */
    useEffect(() => {
    /**
     * This retrieves the country's data
     * @param {*} countryName 
     */
    const retrieveSpecificCountryData = async (countryName) => {
        // make the API call
        const response = await fetch(`https://restcountries.com/v2/name/${countryName}/?fullText=true`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
             });
        // if we get don't get a 200 response we need to let the user know
        if (!response.ok) {
            setError("Unable to load the data for " + obj.specificCountryName + ". Please reload the page and try again");
            return;
        } 
        const specificCountryData = await response.json();
        // set the languages as one large string
        let languages = '';
        for (let i = 0; i < specificCountryData[0].languages.length; i++) {
            languages = languages + specificCountryData[0].languages[i].name + ', '
        }
        languages = languages.substring(0, languages.length - 2);
        setCurrLanguages(languages);   

        setCurrCountryObject(specificCountryData[0]);
        setError('');
        setIsLoaded(true);
        
        // if the country actually has borders, then we set the borders array
        if (specificCountryData[0].borders !== undefined) {

            // the borders are strings in an array so we need to join them and make the API call
            // to get the list of countries
            let joinedCodes = specificCountryData[0].borders.join();
            const response1 = await fetch(`https://restcountries.com/v2/alpha?codes=${joinedCodes}`);

            // again if we get anything but a 200 response, we need to let the user know
            if (!response1.ok) {
                setError("Unable to load border information. Please reload the page and try again");
                return;
            } 
            
            else {

                // await the data 
                const jsonData = await response1.json();
                let names = [];
                for (let i = 0; i < jsonData.length; i++) {
                    names.push(jsonData[i].name);
                }
                setIsLoaded(true);
                setCurrCountryBorders(names);
            }            
        }
    }
    retrieveSpecificCountryData(currentCountryName);
    }, [currentCountryName, obj.specificCountryName]);

    if (error !== '') {
        return (
        <div className='parent'>
            <div className="pt-[150px] text-3xl flex justify-center dark:text-black place-items-center">
                    <center>{error}</center>
            </div>

        </div>
        )

    } 
    else if (!isLoaded) {
        return (<div className='parent'>
        <div className="pt-[150px] text-3xl flex justify-center dark:text-black place-items-center">
                <center>{error}</center>
        </div>

    </div>)
    }
    
    else {
        return (
            <div className="parent">
                <div className="back_button pt-[150px]">
                    <button className="back_button_color shadow-[0_0_40px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-105 hover:z-1 duration-300 dark:text-black dark:bg-white pl-6 pr-6 pt-2 pb-2" uppercase="false" onClick={() => navigateBack()}><i class="fas fa-arrow-left"></i> Back</button>
                </div>
                <div className="flags_and_stats">
                    <div className="flag_left md:inline-block md:w-[50%]">
                        <img src={currCountryObj.flag} className="country_flag w-full object-cover h-full" alt="country flag"/>
                    </div>
                    <div className="information_right md:inline-block md:w-[50%]">
                        <div>
                            <h5 className="country_name dark:text-black">{currCountryObj.name}</h5>
                        </div>
                        <div className='stats_div flex flex-row' style={{color:'white'}}>
                            <div className='top_stats'>
                                <div className="dark:text-black"> Native Name: {currCountryObj.nativeName}</div>
                                {currCountryObj.population === undefined ? <div></div> : <div className="dark:text-black">Population: {currCountryObj.population.toLocaleString()}</div>}
                                <div className="dark:text-black">Region: {currCountryObj.region}</div>
                                <div className="dark:text-black">Sub Region: {currCountryObj.subregion}</div>
                                <div className="dark:text-black">Capital: {currCountryObj.capital}</div>
                            </div>
                            <div className='bottom_stats'>
                                {currCountryObj.topLevelDomain === undefined ? <div></div> : <div className="dark:text-black">Top Level Domain: {currCountryObj.topLevelDomain[0]}</div>}
                                {currCountryObj.currencies === undefined ? <div></div> : <div className="dark:text-black"> Currencies: {currCountryObj.currencies.map((each) => each.name)}</div>}    
                                {currCountryObj.languages === undefined ? <div></div> : <div className="dark:text-black">Languages: {currLanguages}</div>}    
                            </div>
                        </div>

                        <div style={{color:'white'}} className="sm:flex-wrap flex flex-row">
                            
                            {currCountryBorders.length === 0 ?  <span> </span> : <><span className="dark:text-black" style={{ color: 'white' }}> Borders: &nbsp; </span> <span id="borders">
                                {currCountryBorders.map((each) => (
                                    <button onClick={() => setCurrentCountryName(each)} className="back_button_color dark:text-black cursor-pointer hover:scale-105 hover:z-1 duration-300 dark:bg-white shadow-[0_0_40px_rgba(0,0,0,0.2)] mr-2 pl-4 pr-4 pt-2 pb-2 mb-2" value={each}>{each}</button>))}
                            </span></>}

                            
                            
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

export default SpecificCountry;