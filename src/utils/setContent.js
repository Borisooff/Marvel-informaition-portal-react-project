import Spiner from '../components/spiner/spiner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />
        case 'loading':
            return <Spiner />;
        case 'confirmed':
            return <Component data={data} />
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;