import React, {useEffect, useMemo, useRef, useState} from 'react';

import './slider.css';
import {cinemaService} from '../../services';
import {Movie} from '../Movie/Movie';

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
    let numberOfSlides = slides.length;
    let slideOffsetWidth = 300;
    const end = useMemo(() => {
        return numberOfSlides / (window.screen.width / slideOffsetWidth) * window.screen.width - (window.screen.width - 150);
    }, [window.screen.width, numberOfSlides])

    const prev = () => {
        offset -= slideOffsetWidth;
        if (offset < 0) offset = end;
        sliderLine.current.style.left = `-${offset}px`;
    }

    const next = () => {
        offset += slideOffsetWidth;
        if (offset - 150 > end) offset = start;
        sliderLine.current.style.left = `-${offset}px`;
    }

    return (
        <>
            {
                !!slides.length && <div className='carousel'>
                    <button onClick={prev}><i className="fas fa-chevron-left"/></button>
                    <div className='slider'>
                        <div ref={sliderLine} className='slider-track'>
                            {slides.map(slide => <Movie key={slide.id} movie={slide}/>)}
                        </div>
                    </div>
                    <button onClick={next}><i className="fas fa-chevron-right"/></button>
                </div>
            }
        </>
    );
};

export {Slider};