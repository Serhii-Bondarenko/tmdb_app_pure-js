import {useParams, useSearchParams} from "react-router-dom";

import {Button} from "../Button/Button";
import css from './paginator.module.css';
import React, {useEffect, useState} from "react";

const Paginator = ({totalPages}) => {
    const [searchParams] = useSearchParams();
    const currentPage = +searchParams.get('page');
    const query = searchParams.get('query');
    const [chunk, setChunk] = useState([currentPage - 1, currentPage, currentPage + 1]);

    useEffect(() => {
        currentPage < 3 && setChunk([2, 3]);
    }, [currentPage]);

    const back = () => {
        let subArr = [];
        if (currentPage >= 3 && currentPage % 3 === 0) {
            for (let i = currentPage - 3; i <= currentPage; i++) {
                subArr.push(i);
            }
            setChunk(subArr);
        }
    }

    const forward = () => {
        let subArr = [];
        if (currentPage >= 3 && currentPage % 3 === 0) {
            for (let i = currentPage; i <= currentPage + 3; i++) {
                subArr.push(i);
            }
            setChunk(subArr);
        }
    }

    return (
        <>
            <div className={css.paginator}>
                <Button onClick={() => back()} disabled={currentPage === 1}
                        to={!query ? `?page=${+searchParams.get('page') - 1}` :
                            `?query=${query}&page=${+searchParams.get('page') - 1}`
                        }>
                    <i className="fas fa-chevron-left"/>
                </Button>
                <div className={css.arr}>
                    <Button isNav={true} to={!query ?`?page=1` : `?query=${query}&page=1`}>1</Button>
                    {chunk.map(page => <Button disabled={page > totalPages} key={page}
                                               to={!query ? `?page=${page}` : `?query=${query}&page=${page}`}
                                               isNav={true}>{page}</Button>)}
                </div>
                <Button onClick={() => forward()} disabled={currentPage === totalPages}
                        to={!query ? `?page=${+searchParams.get('page') + 1}` :
                            `?query=${query}&page=${+searchParams.get('page') + 1}`
                        }>
                    <i className="fas fa-chevron-right"/>
                </Button>
            </div>
        </>
    );
};

export {Paginator};
