import { useHttp } from "../hooks/http.hook";

const  useMarvelService = ()=>  {

    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2fdb77ab84d2903988cce35b70301cf6';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'You can read the description of the character in homepage',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    const getAllComicses = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const _transformComics = (comics) => {
        return{
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price !== 0 ? comics.prices[0].price : 'NOT AVAILABLE',
            thumbnail: comics.thumbnail.path +  '.' + comics.thumbnail.extension,
        }
    }

    return{loading, error, request,  clearError, getAllCharacters, getCharacter, getAllComicses}
}

export default useMarvelService;
