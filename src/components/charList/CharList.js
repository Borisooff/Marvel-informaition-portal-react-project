import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }

    updateCharList = () => {
        this.marvelService.getAllCharacters().then(res => {
            this.onCharListLoaded(res);
        }).catch(
            this.onError
        )
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList: charList,
            loading: false,
            error: false,
        });
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let clazz = 'char__name';
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                clazz = clazz + ' noneimg';
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}>
                        <img src={item.thumbnail} alt={item.name} />
                        <div className={clazz}>{item.name}</div>
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
        const { charList, loading, error } = this.state;
        const char = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spiner /> : null;
        const content = !(error || spinner) ? char : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
