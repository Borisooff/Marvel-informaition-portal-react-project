import React, { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        console.log('load')
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);

        setLoading(false);
        setError(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, index) => {
            let clazz = 'char__name';
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                clazz = clazz + ' noneimg';
            }

            return (
                <li
                    tabIndex={0}
                    ref={el => itemRefs.current[index] = el}
                    key={item.id}
                    onClick={() => {
                        props.onSelectChar(item.id);
                        focusOnItem(index);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onSelectChar(item.id)
                        }
                    }}
                    className="char__item">
                    <img className={clazz} src={item.thumbnail} alt={item.name} />
                    <div className='char__name'>{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const char = renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(error || spinner) ? char : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;
