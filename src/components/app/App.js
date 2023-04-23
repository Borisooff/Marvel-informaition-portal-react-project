import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundaries from "../errorBoundaries/errorBoundaries";

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectedCharId, setSelectedCharId] = useState(null);

    const onSelectChar = (id) => {
        setSelectedCharId(id);
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                {/* <ErrorBoundaries>
                    <RandomChar />
                </ErrorBoundaries>
                <div className="char__content">
                    <ErrorBoundaries>
                        <CharList onSelectChar={onSelectChar} />
                    </ErrorBoundaries>
                    <ErrorBoundaries >
                        <CharInfo selectedCharId={selectedCharId} />
                    </ErrorBoundaries>
                </div> */}
                {/* <img className="bg-decoration" src={decoration} alt="vision" /> */}
                <ErrorBoundaries>
                    <ComicsList />
                </ErrorBoundaries>
            </main>
        </div>
    )

}

export default App;