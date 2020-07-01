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
                    <a className="nav-link collapsed" href="Region" data-toggle="collapse" data-target="#collapseRegion" aria-expanded="true" aria-controls="collapseRegion">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Region</span>
                    </a>
                    <div id="collapseRegion" className="collapse" aria-labelledby="headingRegion" data-parent="#accordionSidebar">
                        <div className="bg-dark py-2 collapse-inner rounded">
                            <NavLink to="/region" className="collapse-item bg-dark text-light">Region</NavLink>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="Status" data-toggle="collapse" data-target="#collapseStatus" aria-expanded="true" aria-controls="collapseStatus">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Status</span>
                    </a>
                    <div id="collapseStatus" className="collapse" aria-labelledby="headingStatus" data-parent="#accordionSidebar">
                        <div className="bg-dark py-2 collapse-inner rounded">
                            <NavLink to="/status" className="collapse-item bg-dark text-light">Status</NavLink>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="Price" data-toggle="collapse" data-target="#collapsePrice" aria-expanded="true" aria-controls="collapsePrice">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Price</span>
                    </a>
                    <div id="collapsePrice" className="collapse" aria-labelledby="headingPrice" data-parent="#accordionSidebar">
                        <div className="bg-dark py-2 collapse-inner rounded">
                        
                            <NavLink to="/price_type" className="collapse-item bg-dark text-light">Price type</NavLink>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="Project" data-toggle="collapse" data-target="#collapseProject" aria-expanded="true" aria-controls="collapseProject">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Project</span>
                    </a>
                    <div id="collapseProject" className="collapse" aria-labelledby="headingProject" data-parent="#accordionSidebar">
                        <div className="bg-dark py-2 collapse-inner rounded">
                            <NavLink to="/project" className="collapse-item bg-dark text-light">Project</NavLink>
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
                <li className="nav-item">
                    <a className="nav-link collapsed" href="Company" data-toggle="collapse" data-target="#collapseCompany" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Company</span>
                    </a>
                    <div id="collapseCompany" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-dark py-2 collapse-inner rounded">
                            <NavLink to="/company" className="collapse-item bg-dark text-light">Company</NavLink>
                            <NavLink to="/company_type" className="collapse-item bg-dark text-light">Company type</NavLink>
                            <NavLink to="/department" className="collapse-item bg-dark text-light">Department</NavLink>
                            <NavLink to="/user" className="collapse-item bg-dark text-light">User</NavLink>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="Device" data-toggle="collapse" data-target="#collapseDevice" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Device</span>
                    </a>
                    <div id="collapseDevice" className="collapse" aria-labelledby="headingDevice" data-parent="#accordionSidebar">
                        <div className="bg-dark py-2 collapse-inner">
                            <NavLink to="/device" className="collapse-item bg-dark text-light">Device</NavLink>
                            <NavLink to="/device_mark" className="collapse-item bg-dark text-light">Device mark</NavLink>
                            <NavLink to="/device_model" className="collapse-item bg-dark text-light">Device model</NavLink>
                            <NavLink to="/device_type" className="collapse-item bg-dark text-light">Device type</NavLink>
                            <NavLink to="/device_location" className="collapse-item bg-dark text-light">Device location</NavLink>
                            <NavLink to="/configuration" className="collapse-item bg-dark text-light">Cofiguration</NavLink>
                        </div>
                    </div>
                </li>
            </ul>
        )
    }
}

export default Navbar