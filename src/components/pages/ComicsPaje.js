import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

import ErrorBoundaries from "../errorBoundaries/errorBoundaries";

const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <ErrorBoundaries>
                <ComicsList />
            </ErrorBoundaries>
        </>
    )
}

export default ComicsPage;