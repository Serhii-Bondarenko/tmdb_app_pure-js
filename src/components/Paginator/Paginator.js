import {useSearchParams} from "react-router-dom";

import {Button} from "../Button/Button";
import css from './paginator.module.css';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPages} from "../../store";
import {leafFunction} from "../../activeFunction";


const Paginator = ({totalPages}) => {
    const [searchParams] = useSearchParams();
    const currentPage = +searchParams.get('page');
    const query = searchParams.get('query');
    const dispatch = useDispatch();
    const {pages} = useSelector(state => state['movieReducer']);

    useEffect(() => {
        if (currentPage <= 5) {
            dispatch(setPages({pages: [2, 3, 4, 5]}));
        } else if (!pages.length && currentPage > 5) {
            dispatch(setPages({pages: [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]}))
        }
    }, [currentPage]);

    const back = () => {
        const pages = [];
        if (currentPage >= 5 && currentPage % 5 === 0) {
            for (let i = currentPage - 5; i <= currentPage; i++) {
                pages.push(i);
            }
            dispatch(setPages({pages}));
        }
    }
// //
    const forward = () => {
        const pages = [];
        if (currentPage >= 5 && currentPage % 5 === 0) {
            for (let i = currentPage; i <= currentPage + 5; i++) {
                pages.push(i);
            }

            dispatch(setPages({pages}));
        }
    }

    return (
        <>
            <div className={css.paginator}>
                <Button onClick={back}
                        disabled={currentPage === 1}
                        to={!query ? `?page=${+searchParams.get('page') - 1}` :
                            `?query=${query}&page=${+searchParams.get('page') - 1}`
                        }>

                    <i className="fas fa-chevron-left"/>
                </Button>

                <div className={css.arr}>
                    <Button isNav={true}
                            to={!query ? `?page=1` : `?query=${query}&page=1`}>1
                    </Button>

                    {pages.map(page => <Button disabled={page > totalPages}
                                               key={page}
                                               to={!query ? `?page=${page}` : `?query=${query}&page=${page}`}
                                               isNav={true}>{page}
                    </Button>)}
                </div>

                <Button onClick={forward}
                        disabled={currentPage === totalPages}
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
