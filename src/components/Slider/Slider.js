import React, {useEffect, useReducer, useRef, useState} from 'react';


import './slider.css';
import {cinemaService} from "../../services";
import {Movie} from "../Movie/Movie";

const Slider = () => {

    const [slides, setSlides] = useState([]);

    const sliderLine = useRef();

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

    let offset = 0;
    const start = 0;
    const end = 4500;

    const prev = () => {
        offset -= 250;

        if (offset < start) {
            offset = end;
        }

        for (const element of sliderLine.current.children) {
            element.style.left = `-${offset}px`;
        }
    }

    const next = () => {
        offset += 250;

        if (offset > end) {
            offset = start;
        }

        for (const element of sliderLine.current.children) {
            element.style.left = `-${offset}px`;
        }
    }


    return (
        <div className='carousel'>
            <div className='slider'>
                <button onClick={() => prev()}>prev</button>
                <div ref={sliderLine} className='slider-track'>
                    {slides.map(slide => <Movie key={slide.id} movie={slide}/>)}
                </div>
                <button onClick={() => next()}>next</button>
            </div>
        </div>
    );
};

export {Slider};