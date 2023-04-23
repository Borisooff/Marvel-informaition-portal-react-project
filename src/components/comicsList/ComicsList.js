import React, { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComicses } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllComicses(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);

        setNewItemsLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    function renderComicsList(comicsList) {
        const items = comicsList.map((item, index) => {
            // let clazz = 'char__name';
            // if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            //     clazz = clazz + ' noneimg';
            // }

            return (
                <li className="comics__item" key={item.id}>
                    <a href="#">
                        <img src={item.thumbnail} 
                        alt={item.title} 
                        className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const comicses = renderComicsList(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemsLoading ? <Spiner /> : null;

    return (
        <div className="comics__list">
            {comicses}
            {spinner}
            {errorMessage}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;