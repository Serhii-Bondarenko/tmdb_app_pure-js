import React, {useEffect, useState} from 'react';


import './slider.css';
import {cinemaService} from "../../services";
import {Movie} from "../Movie/Movie";

const Slider = () => {

    const [slides, setSlides] = useState([]);

    const fetchData = async () => {
        try {
            const data = await cinemaService.getByValue(1, 'popular');
            setSlides([...data.results]);

        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        fetchData();
        return () => {
           setSlides([]);
        }
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