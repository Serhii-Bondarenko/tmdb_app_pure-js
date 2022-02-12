import {useSearchParams} from "react-router-dom";

import {Button} from "../Button/Button";
import css from './paginator.module.css';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPageArr} from "../../store";


const Paginator = ({totalPages}) => {
    const [searchParams] = useSearchParams();
    const currentPage = +searchParams.get('page');
    const query = searchParams.get('query');
    const dispatch = useDispatch();
    const {pageArr} = useSelector(state => state['movieReducer']);

    useEffect(() => {
        if (currentPage <= 5) {
            dispatch(setPageArr({array: [2, 3, 4, 5]}));
        } else if (!pageArr.length && currentPage > 5) {
            dispatch(setPageArr({array: [currentPage - 4, currentPage - 3, currentPage - 2, currentPage - 1, currentPage]}))
        }
    }, [currentPage]);

    const back = () => {
        const array = [];
        if (currentPage >= 5 && currentPage % 5 === 0) {
            for (let i = currentPage - 5; i <= currentPage; i++) {
                array.push(i);
            }
            dispatch(setPageArr({array}));
        }
    }
    // //
    const forward = () => {
        const array= [];
        if (currentPage >= 5 && currentPage % 5 === 0) {
            for (let i = currentPage; i <= currentPage + 5; i++) {
                array.push(i);
            }

            dispatch(setPageArr({array}));
        }
    }

    return (
        <>
            <div className={css.paginator}>
                <Button onClick={back} disabled={currentPage === 1}
                        to={!query ? `?page=${+searchParams.get('page') - 1}` :
                            `?query=${query}&page=${+searchParams.get('page') - 1}`
                        }>
                    <i className="fas fa-chevron-left"/>
                </Button>
                <div className={css.arr}>
                    <Button isNav={true} to={!query ? `?page=1` : `?query=${query}&page=1`}>1</Button>
                    {pageArr.map(page => <Button disabled={page > totalPages} key={page}
                                               to={!query ? `?page=${page}` : `?query=${query}&page=${page}`}
                                               isNav={true}>{page}</Button>)}
                </div>
                <Button onClick={forward} disabled={currentPage === totalPages}
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
