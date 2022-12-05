import React from "react";

import MenuBar from "../composants/MenuBar";
import logo1 from '../pictures/img1Welcome.jpg';
import logo2 from '../pictures/img2Welcome.jpg';
import logo3 from '../pictures/img3Welcome.jpg';

export default function WelcomePage() {
    
    return (
        <div>
            <MenuBar/>
            <div className="core">
                <div className="container_test">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={logo1} className="d-block w-100" alt="image1"/>
                            </div>
                            <div className="carousel-item">
                                <img src={logo2} className="d-block w-100" alt="image2"/>
                            </div>
                            <div className="carousel-item">
                                <img src={logo3} className="d-block w-100" alt="image3"/>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <h1>WhatToCook c’est quoi ?</h1>
                <p>Siquis enim militarium vel honoratorum aut nobilis inter suos 
                rumore tenus esset insimulatus fovisse partes hostiles, 
                iniecto onere catenarum in modum beluae trahebatur et inimico urgente 
                vel nullo, quasi sufficiente hoc solo, quod
                nominatus esset aut delatus 
                aut postulatus, capite vel multatione bonorum aut insulari solitudine damnabatur.</p>
            </div>
        </div>
    );
};
