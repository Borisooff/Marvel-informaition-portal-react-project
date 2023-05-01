import Spiner from '../components/spiner/spiner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContentList = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spiner />;
        case 'loading':
            return newItemLoading ? <Component /> : <Spiner />;
        case 'confirmed':
            return <Component />
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContentList;