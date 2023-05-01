import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

import useMarvelService from '../../../services/MarvelService';
import AppBanner from '../../appBanner/AppBanner';
import setContent from '../../../utils/setContent';

import './singleCharPage.scss';

const SingleCharPage = () => {
    const { charId } = useParams();
    const [char, setComic] = useState(null);

    const { process, setProcess, getCharacter, clearError } = useMarvelService();

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
            .then(() => setProcess('confirmed'))
    }

    return (
        <>
            <AppBanner />
            {setContent(process, View, char)}
        </>
    );
}

const View = ({ data }) => {
    const { name, description, thumbnail } = data;

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
