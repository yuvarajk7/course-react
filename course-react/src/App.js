import React from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route, Navigate } from 'react-router-dom'; //6.0 - Redirect to Navigate, Switch becomes Routes
import './App.css';
import FilterableCoursesTable from './Components/FilterableCoursesTable';
import AddCourseForm from './Components/AddCourseForm';

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
            <Routes>
                <Route path="/" exact element={<FilterableCoursesTable />} />
                <Route path="/courses" element={<FilterableCoursesTable />} />
                <Route path="/add" element={<AddCourseForm />} />
                <Route path="*" element={<FilterableCoursesTable />}></Route>
                {/*<Route>*/}
                {/*    <Navigate to="/" />*/}
                {/*</Route>*/}
            </Routes>
        </Router>
    );
}

export default App;
