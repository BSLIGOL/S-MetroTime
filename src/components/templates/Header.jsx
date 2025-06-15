import React from 'react'
import { Link } from 'react-router-dom'
import MetroLogo from '../../assets/MetroLogo.png'

function Header() {
    return (
        <Link to="/" className="flex items-center justify-center p-4 shadow-md">
            <img src={MetroLogo} alt="MetroLogo" className="h-8 w-auto mr-2"/>
            <h1 className="text-2xl font-bold">MetroTime</h1>
        </Link>
    )
}

export default Header