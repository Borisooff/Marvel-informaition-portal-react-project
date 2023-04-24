import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import ErrorBoundaries from "../errorBoundaries/errorBoundaries";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedCharId, setSelectedCharId] = useState(null);

    const onSelectChar = (id) => {
        setSelectedCharId(id);
    }

    return (
        <>
            <ErrorBoundaries>
                <RandomChar />
            </ErrorBoundaries>
            <div className="char__content">
                <ErrorBoundaries>
                    <CharList onSelectChar={onSelectChar} />
                </ErrorBoundaries>
                <ErrorBoundaries >
                    <CharInfo selectedCharId={selectedCharId} />
                </ErrorBoundaries>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;