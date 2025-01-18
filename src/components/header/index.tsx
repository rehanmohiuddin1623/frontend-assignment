import React from "react"
import MainLogo from "../../assets/icons/logo.svg"
import "./style.css"

const Header = () => {
    return (
        <header className="flex-row home-header">
            <a className="cursor-pointer" href="/">
                <MainLogo />
            </a>
            <h3 className="">Project Labs</h3>
        </header>

    )
}

export default Header