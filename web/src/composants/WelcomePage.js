import React from "react";

import MenuBar from "./MenuBar";
import logo1 from '../pictures/img1Welcome.jpg';
import logo2 from '../pictures/img2Welcome.jpg';
import logo3 from '../pictures/img3Welcome.jpg';

export default function WelcomePage() {
    
    return (
        <body>
            <MenuBar/>
            <div className="core">
                <div className="carousel" id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={logo1} class="d-block w-100 redim" alt="image1"/>
                        </div>
                        <div class="carousel-item">
                            <img src={logo2} class="d-block w-100 redim" alt="image2"/>
                        </div>
                        <div class="carousel-item">
                            <img src={logo3} class="d-block w-100 redim" alt="image3"/>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <h1>WhatToCook c’est quoi ?</h1>
                <p>Siquis enim militarium vel honoratorum aut nobilis inter suos 
                rumore tenus esset insimulatus fovisse partes hostiles, 
                iniecto onere catenarum in modum beluae trahebatur et inimico urgente 
                vel nullo, quasi sufficiente hoc solo, quod
                nominatus esset aut delatus 
                aut postulatus, capite vel multatione bonorum aut insulari solitudine damnabatur.</p>
            </div>
        </body>
    );
}
