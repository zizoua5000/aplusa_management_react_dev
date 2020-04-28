import React from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <ul className="navbar-nav bg-dark sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        <span className="text-info">A+A Security</span>
                        <br/>
                        Management
                    </div>
                </a>
                <hr className="sidebar-divider my-0"></hr>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="User" data-toggle="collapse" data-target="#collapseUser" aria-expanded="true" aria-controls="collapseUser">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>User</span>
                    </a>
                    <div id="collapseUser" className="collapse" aria-labelledby="headingUser" data-parent="#accordionSidebar">
                        <div className="bg-dark py-2 collapse-inner rounded">
                            <NavLink to="/profile" className="collapse-item bg-dark text-light">Profile</NavLink>
                            <NavLink to="/logout" className="collapse-item bg-dark text-light">Logout</NavLink>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="Vehicle" data-toggle="collapse" data-target="#collapseVehicle" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Vehicle</span>
                    </a>
                    <div id="collapseVehicle" className="collapse" aria-labelledby="headingVehicle" data-parent="#accordionSidebar">
                        <div className="bg-dark py-2 collapse-inner">
                            <NavLink to="/vehicle" className="collapse-item bg-dark text-light">Vehicle</NavLink>
                            <NavLink to="/vehicle_mark" className="collapse-item bg-dark text-light">Vehicle mark</NavLink>
                            <NavLink to="/vehicle_model" className="collapse-item bg-dark text-light">Vehicle model</NavLink>
                            <NavLink to="/vehicle_type" className="collapse-item bg-dark text-light">Vehicle type</NavLink>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="Simcard" data-toggle="collapse" data-target="#collapseSimcard" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Simcard</span>
                    </a>
                    <div id="collapseSimcard" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-dark py-2 collapse-inner rounded">
                            <NavLink to="/simcard" className="collapse-item bg-dark text-light">Simcard</NavLink>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="JobTitle" data-toggle="collapse" data-target="#collapseJobTitle" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>JobTitle</span>
                    </a>
                    <div id="collapseJobTitle" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-dark py-2 collapse-inner rounded">
                            <NavLink to="/job_title" className="collapse-item bg-dark text-light">JobTitle</NavLink>
                        </div>
                    </div>
                </li>
            </ul>
        )
    }
}

export default Navbar