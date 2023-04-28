import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from 'react-router-dom';

import '../appHeader/appHeader.scss';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p className="app__title" style={{'textAlign': 'center'}}>You are on a page that does not exist</p>
            <Link to='/' 
            className="app__title"
            style={{'display': 'block', 'color': 'blue', 'textAlign': 'center', 'textDecoration': 'underline', 'fontSize': 25 + 'px'}}>
                Back to main page
            </Link>
        </div>
    );
}

export default Page404;
