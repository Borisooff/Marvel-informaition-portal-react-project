import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundaries from "../errorBoundaries/errorBoundaries";


import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedCharId: null,
    }

    onSelectChar = (id) => {
        this.setState({
            selectedCharId: id,
        })
    }


    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundaries>
                        <RandomChar />
                    </ErrorBoundaries>
                    <div className="char__content">
                        <ErrorBoundaries>
                            <CharList onSelectChar={this.onSelectChar} />
                        </ErrorBoundaries>
                        <ErrorBoundaries >
                            <CharInfo selectedCharId={this.state.selectedCharId} />
                        </ErrorBoundaries>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;