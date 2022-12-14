import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { initMovies } from './redux/reducers/moviesReducer'

import Notification from './components/Notification/Notification';
import NavBar from './components/NavBar/NavBar';

import './sass/main.css'
import NotFound from './components/NotFound/NotFound';
import List from './components/List/List';
import SingleMovie from './components/SingleContent/SingleMovie';
import SinglePerson from './components/SingleContent/SinglePerson';
import DashboardLayout from './components/DashboardLayout/DashboardLayout'
import { initPersons } from './redux/reducers/personsReducer';
import NewMovieForm from './components/Forms/MovieForms/NewMovieForm'
import NewPersonForm from './components/Forms/PersonForms/NewPersonForm';
import EditMovieForm from './components/Forms/MovieForms/EditMovieForm';
import EditPersonForm from './components/Forms/PersonForms/EditPersonForm';
import Home from './components/Home/Home';
import LogIn from './components/Login/LogIn';
import SignIn from './components/SignIn/SignIn';


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initMovies())
    dispatch(initPersons())
  },[dispatch])

  return (
    <Router>
      <header>
        <Notification />
      </header>
      <NavBar/>
      <div className='mainContainer'>

          <Routes>
            <Route exact path='/login' element={<LogIn />}/>
            <Route exact path='/signin' element={<SignIn />}/>

            <Route path='/' element={<Home />} />

            <Route path='/movies' element={<List show='movies' />} /> 
            <Route path='/movies/:id' element={<SingleMovie />} />
            <Route path='/people' element={<List show='people'/>} />
            <Route path='/people/:id' element={<SinglePerson />} />

            <Route path='/dashboard/' element={<DashboardLayout/>}>
              <Route path='new-movie' element={<NewMovieForm />} />
              <Route path='edit-movie/:id' element={<EditMovieForm />} />
              <Route path='new-person' element={<NewPersonForm />} />
              <Route path='edit-person/:id' element={<EditPersonForm />} />
            </Route>

            <Route path='*' element={<NotFound />}/>
          </Routes>

      </div>
      
    </Router>
  )
}


export default App
