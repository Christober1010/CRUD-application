import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='text-center'><nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Student Management</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link to={'/'}> <a class="nav-link">Add Student</a></Link>
                        <Link to={'/list'}> <a class="nav-link">View List</a></Link>
                    </div>
                </div>
            </div>
        </nav></div>
    )
}

export default Navbar