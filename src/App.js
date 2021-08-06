
import { BrowserRouter, Switch } from 'react-router-dom';
import {Route} from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from "./components/headercomponent/Header"
import SimpleBottomNavigation from './components/MainNav';
import { Container } from '@material-ui/core';
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Search from './pages/Search/Search';
function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
       <Header />
    <div className="App">
          <Container>
            <Switch>
              <Route path='/' component={Trending} exact/>
              <Route path='/movies' component={Movies} />
              <Route path='/series' component={Series} />
              <Route path='/search' component={Search}/>
            </Switch>
          </Container>
      </div>
      <SimpleBottomNavigation />
      </React.Fragment>
      </BrowserRouter>
  )
}

export default App;
