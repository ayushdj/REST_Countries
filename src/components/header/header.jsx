import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import '@fortawesome/free-solid-svg-icons'
import {useState, useEffect} from 'react';

const Header = () => {

    let currTheme = localStorage.getItem("countries_theme_mode");


    const [theme, setTheme] = useState(currTheme !== undefined ? currTheme : "light");
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add("dark");
            document.body.style.backgroundColor = "white"
            localStorage.setItem("countries_theme_mode", "dark");

        } else {
            document.documentElement.classList.remove("dark");
            document.body.style.backgroundColor = "hsl(207, 26%, 17%)"
            localStorage.setItem("countries_theme_mode", "light");

        }
    }, [theme])

    const handleThemeSwitch = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    return (
        <>
            <div class="nav navbar-expanded-lg">
                <div className="flex flex-row shadow-xl justify-between w-full pt-4 pb-4 custom-background dark:bg-white fixed z-10">
                    <div className="sm:inline-block global md:inline-block sm:w-full xs:w-full xxs:w-full md:w-[40%]">
                        <a className="text text-white" style={{textDecoration:'none'}} href="/"><span className="dark:text-black">Where in the world?</span></a>
                    </div>

                    <div className="sm:inline-block md:inline-block right-0 mr-[5%] pt-2 whitespace-wrap"><span className="dm-text text-white " 
                        onClick={() => handleThemeSwitch()}> {theme==='dark' ? <i class="fa-solid dark:text-black fa-sun"></i> : <i class="fa-solid fa-moon dark:text-black"></i> }
                        <span className="dark:text-black">{theme === 'dark' ? <span> Light Mode</span> : <span> Dark Mode</span>}</span></span>
                    </div>
                </div>
            </div>
        </>
    
    )
}

export default Header;