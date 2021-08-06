import { TextField, ThemeProvider,createMuiTheme, Button } from "@material-ui/core";
import { useState, useEffect } from "react"
import SearchIcon from "@material-ui/icons/Search"
import { Tabs, Tab } from "@material-ui/core"
import SingleContent from "../../components/singleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";
import axios from "axios";
const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [numofPages,setNumOfPages] = useState();
    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main:"#fff",
            },
        },
    });
     const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    //   console.log(data);
    } catch (error) {
      console.error(error);
    }
    };
      useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{display:'flex',margin:'15px 0'}}>
            <TextField
                style={{ flex: 1 }}
                className="searchBox"
                label="Search"
                        varient="filled"
                        onChange={(e)=>setSearchText(e.target.value)}
            >
                    </TextField>
                    <Button varient='contained' style={{marginLeft:10}} onclick={fetchSearch}><SearchIcon /></Button>
                </div>
                <Tabs value={type} indicatorColor='primary' textColor='primary'
                    onChange={(event, newValue) => {
                        setType(newValue);
                        
                    }}
                    style={{paddingBottom:5}}
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                        <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
             <div className="trending">
                {
                    content && content.map((c) => (
                        <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type?"tv":"movie"} vote_average={c.vote_average}
                            original_language={ c.original_language}/>
                    ))
                }
                {
                    searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
                }
            </div>
            {numofPages > 1 && (
               <CustomPagination setPage={setPage} numofPages={ numofPages}/>
            )}
        </div>
    )
}

export default Search;
