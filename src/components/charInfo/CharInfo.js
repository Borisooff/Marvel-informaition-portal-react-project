import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const { process, getCharacter, clearError, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.selectedCharId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const { selectedCharId } = props;
        if (!selectedCharId) {
            return;
        }

        clearError();

        getCharacter(selectedCharId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
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
                        <a target='_blank' href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a target='_blank' href={wiki} className="button button__secondary">
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