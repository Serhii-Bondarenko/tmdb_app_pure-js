import {useSearchParams} from "react-router-dom";

import {Button} from "../Button/Button";
import css from './paginator.module.css';
import React, {useEffect, useState} from "react";

const Paginator = ({totalPages}) => {
    const [params] = useSearchParams();
    const currentPage = +params.get('page');
    const [chunk, setChunk] = useState([currentPage + 1, currentPage + 2, currentPage + 3, currentPage + 4]);

    useEffect(() => {
        let subArr = [];

        if (currentPage >= 5) {
            if (currentPage % 5 === 0 && currentPage === subArr[subArr.length - 1]) {
                // for (let i = currentPage; i < currentPage + 5; i++) {
                // }
                setChunk(subArr);
            } else if (currentPage % 5 === 0 && currentPage === subArr[0]) {
                for (let i = currentPage - 5; i < currentPage; i++) {
                    subArr.push(i);
                }
                setChunk(subArr);
            }
            // else if (currentPage) {
            //     for (let i = currentPage - 4; i < currentPage; i++) {
            //         subArr.push(i);
            //     }
            //     setChunk(subArr);
            // }
        } else {
            for (let i = 2; i <= 5; i++) {
                subArr.push(i);
            }
            console.log(subArr);
            console.log(subArr[subArr.length - 1]);
            console.log(currentPage, 'caea');
            console.log(currentPage + 1 === subArr[subArr.length - 1]);
            setChunk(subArr);
        }
    }, [currentPage]);

    return (
        <div className={css.paginator}>
            <Button disabled={currentPage === 1}
                    to={`?with_genres=${+params.get('with_genres')}&page=${+params.get('page') - 1}`}>
                <i className="fas fa-chevron-left"/>
            </Button>
            <div className={css.arr}>
                <Button isNav={true} to={`?with_genres=${+params.get('with_genres')}&page=1`}>1</Button>
                {chunk.map(page => <Button disabled={page > totalPages} key={page}
                                           to={`?with_genres=${+params.get('with_genres')}&page=${page}`}
                                           isNav={true}>{page}</Button>)}
            </div>
            <Button disabled={currentPage === totalPages}
                    to={`?with_genres=${+params.get('with_genres')}&page=${+params.get('page') + 1}`}>
                <i className="fas fa-chevron-right"/>
            </Button>
        </div>
    );
};

export {Paginator};
