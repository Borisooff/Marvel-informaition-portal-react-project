import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

import ErrorBoundaries from "../errorBoundaries/errorBoundaries";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of comics"
                />
                <title>Marvel Comics</title>
            </Helmet>
            <AppBanner />
            <ErrorBoundaries>
                <ComicsList />
            </ErrorBoundaries>
        </>
    )
}

export default ComicsPage;