import React, { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    }

    marvelService = new MarvelService();

    UNSAFE_componentWillMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            error: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }


    focusOnItem = (id) => {
        // this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        // this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    renderItems(arr) {
        const items = arr.map((item, index) => {
            let clazz = 'char__name';
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                clazz = clazz + ' noneimg';
            }

            return (
                <li
                    tabIndex={0}
                    ref={this.setRef}
                    key={item.id}
                    onClick={() => {
                        this.props.onSelectChar(item.id)
                        this.focusOnItem(index)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            this.props.onSelectChar(item.id)
                            // this.focusOnItem(index)
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

    render() {
        const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;
        const char = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spiner /> : null;
        const content = !(error || spinner) ? char : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
