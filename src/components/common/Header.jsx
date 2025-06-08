import React from 'react'
import MetroLogo from '../../assets/MetroLogo.png'

function Header() {
    return (
        <div className="flex items-center justify-center p-4 shadow-md">
            <img src={MetroLogo} alt="MetroLogo" className="h-8 w-auto mr-2"/>
            <h1 className="text-2xl font-bold">MetroTime</h1>
        </div>
    )
}

export default Header