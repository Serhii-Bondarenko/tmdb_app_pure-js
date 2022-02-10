import React, {useEffect, useState} from 'react';


import './slider.css';
import {cinemaService} from "../../services";
import {Movie} from "../Movie/Movie";

const Slider = () => {

    const [slides, setSlides] = useState([]);

    useEffect(() => {
        cinemaService.getByValue(1, 'popular')
            .then(response => setSlides([...response.results]));
    }, []);

    return (
        <div className='slider'>
            <div className='slider-track'>
                {slides.map(slide => <Movie key={slide.id} movie={slide}/>)}
            </div>
        </div>
    );
};

export {Slider};