import { useState, useEffect } from 'react';

import MarvelService from '../../services/MarvelService';
import Spiner from '../spiner/spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    // state = {
    //     char: null,
    //     loading: false,
    //     error: false,
    // }

    useEffect(() => {
        updateChar();
    }, [props.selectedCharId])

    // componentDidMount() {
    //     this.updateChar()
    // }

    // useEffect((prevProps) => {
    //     if (props.selectedCharId !== prevProps.selectedCharId) {
    //         updateChar()
    //     }
    // }, [char])

    // componentDidUpdate(prevProps) {
    //     if (this.props.selectedCharId !== prevProps.selectedCharId) {
    //         this.updateChar()
    //     }
    // }

    const onLoading = () => {
        setLoading(true);
    }

    const onCharLoaded = (char) => {

        setChar(char);
        setLoading(false);
        setError(false);

        // this.setState({
        //     char: char,
        //     loading: false,
        //     error: false,
        // })
    }

    const onError = () => {
        setError(true);
        setLoading(false);

        // this.setState({
        //     error: true,
        //     loading: false,
        // })
    }

    const updateChar = () => {
        const { selectedCharId } = props;
        if (!selectedCharId) {
            return;
        }

        onLoading();

        marvelService.getCharacter(selectedCharId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const skeleton = error || loading || char ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(error || spinner || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let clazz = '';
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        clazz = clazz + 'noImg';
    }

    return (
        <>
            <div className="char__basics">
                <img className={clazz} src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Sorry, comics with this character have not been added yet'}
                {
                    comics.map((item, i) => {
                        if (i > 9) return
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;