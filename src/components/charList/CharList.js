import React, { useState, useEffect, useRef, useMemo } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContentList from '../../utils/setContentList';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { process, setProcess, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);

        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
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

    const elements = useMemo(()=>{
        return setContentList(process, () => renderItems(charList), newItemLoading)
    }, [process]);

    return (
        <div className="char__list">
            {elements}
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
