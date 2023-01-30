import base_url from "../util/baseUrl";

/**
 * Gets all country information
 * @returns a Promise
 */
const getAllCountries = () => fetch(base_url + `/all`, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
    },
});

/**
 * Gets information specific to one country
 * @param {*} countryName the name of the country
 * @returns a Promise
 */
const getCountryByName = (countryName) => fetch(base_url + `/name/${countryName}/?fullText=true`, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
    },
})

/**
 * Gets all the countries for a set of country codes
 * @param {*} countryCodes the joined comma separated string with all the country codes
 * @returns a Promise
 */
const getBorderInformation = (countryCodes) => fetch(`https://restcountries.com/v2/alpha?codes=${countryCodes}`);

/**
 * We want to validate the response we get from all these API calls 
 * @param {*} response the response object returned from fetch
 * @returns a string that we need to set for the error
 */
const validateResponse = (response) => {
    if (response.status >= 300 && response.status <= 399) {
        return response.status + " Error: " + response.statusText;
    } else if (response.status >= 400 && response.status <= 499) {
        return response.status + " Client Error: " + response.statusText;
    } else if (response.status >= 500 && response.status <= 599) {
        return response.status + " Server Error: " + response.statusText;
    } else if (response.status >= 100 && response.status <= 199) {
        return response.status + " Information Response: Processing Request";
    } else {
        return '';
    }
}

const functions = {getAllCountries, getCountryByName, getBorderInformation, validateResponse}

export default functions;