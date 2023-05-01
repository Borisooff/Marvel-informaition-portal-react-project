import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

import useMarvelService from '../../../services/MarvelService';
import Spiner from '../../spiner/spiner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from '../../appBanner/AppBanner';

import './singleCharPage.scss';

const SingleCharPage = () => {
    const { charId } = useParams();
    const [char, setComic] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [charId])

    const onCharLoaded = (char) => {
        setComic(char);
    }

    const updateComic = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(loading || spinner || !char) ? <View char={char} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
}

const View = ({ char }) => {
    const { name, description, thumbnail } = char;

    return (
        <div className="single-char">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character description`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-char__img" />
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to='/' className="single-char__back">Back to main</Link>
        </div>
    )
}

export default SingleCharPage;
