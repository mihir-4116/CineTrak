import { useState, useEffect } from "react";
import SingleContent from "../../components/singleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";
import axios from "axios";
import Genres from '../../components/Genres'
import useGenre from '../../hooks/useGenre'
const Series = () => {
     const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numofPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);
    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
        setContent(data.results);
        setNumOfPages(data.total_pages);
        
    };
    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    },[page,genreforURL])
    return (
        <div>
            <span className='pageTitle'>TV Series</span>
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                genres={genres}
                setGenres={setGenres}
                setSelectedGenres={setSelectedGenres}
                setPage = {setPage}
                
            />
             <div className="trending">
                {
                    content && content.map((c) => (
                        <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="tv" vote_average={c.vote_average}
                            original_language={ c.original_language}/>
                    ))
                }
            </div>
            {numofPages > 1 && (
               <CustomPagination setPage={setPage} numofPages={ numofPages}/>
            )}
        </div>
    )
}

export default Series
