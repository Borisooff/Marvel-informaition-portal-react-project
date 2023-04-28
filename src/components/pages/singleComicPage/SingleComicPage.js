import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import useMarvelService from '../../../services/MarvelService';
import Spiner from '../../spiner/spiner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from '../../appBanner/AppBanner';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [ comic, setComic ] = useState(null);

    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spiner /> : null;
    const content = !(loading || spinner || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
}

const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, language, price } = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;
