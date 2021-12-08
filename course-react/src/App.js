import React from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import FilterableCoursesTable from './Components/FilterableCoursesTable3';
import AddCourseForm from './Components/AddCourseForm2';
import Course from './Components/Course';
import CoursesProvider from './StateManagement/CoursesProvider';

function App() {
    return (
        <Router>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Search</NavLink>
                        </li>
                        <li>
                            <NavLink to="/add">Add</NavLink>
                        </li>
                        <li>
                            <NavLink to="/someunmatchableroute">
                                Unmatchable Route
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>

            <Switch>
                <CoursesProvider>
                    <Route path="/" exact>
                        <FilterableCoursesTable />
                    </Route>
                    <Route path="/courses">
                        <FilterableCoursesTable />
                    </Route>
                    <Route path="/add">
                        <AddCourseForm />
                    </Route>
                </CoursesProvider>
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
