import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import useMarvelService from '../../services/MarvelService';
import setContentList from '../../utils/setContentList';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { process, setProcess, getAllComicses } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllComicses(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
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

            return (
                <li className="comics__item"
                    key={index}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail}
                            alt={item.title}
                            className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContentList(process, () => renderComicsList(comicsList), newItemsLoading)}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                disabled={newItemsLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;