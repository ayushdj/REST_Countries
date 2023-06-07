import React from 'react'


const CountryCard = ({each}) => {
    
    return (
        <>
            <div className="overflow-hidden rounded shadow-xl h-full cursor-pointer hover:scale-105 hover:z-1 duration-300 mb-8 
                            card_body dark:bg-white">
                <img src={each.flags.png} alt="country_image" className="w-full h-40 object-cover"/>
                <div className='pl-4 flex flex-col'>
                    <h5 className="font-bold mt-4 card_title dark:text-black">{each.name}</h5>
                    <span className="block card_stats dark:text-black">Population: {each.population.toLocaleString()}</span>
                    <span className="block card_stats dark:text-black" >Region: {each.region}</span> 
                    <span className="block card_stats dark:text-black">Capital: {each.capital}</span>
                </div>

            </div>
        </>
    )
}

export default CountryCard;