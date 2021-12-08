import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import CourseTable from './CourseTable';
import SearchBar from './SearchBar';
import Four0FourComponent from './Four0FourComponent';
import ErrorComponent from './ErrorComponent';
import Course from './Course';

const coursesUrl = `http://localhost:4000/courses`;

const FilterableCoursesTable = () => {

    const [searchText, setSearchText] = useState(``);
    const [advanced, setAdvanced] = useState(false);
    const [courses, setCourses] = useState([]);
    const [courseID, setCourseID] = useState(0)
    const [errors, setErrors] = useState(null);

    const handleNetworkError = error => {
        setErrors(<ErrorComponent message={error.message} />);
    }

    const getCourses = useCallback(
        async (query) => {
            let response;

            try {
                response = await fetch(`${coursesUrl}${query}`);
            } catch (error) {
                return handleNetworkError(error);
            }

            if (response.status === 200) {
                const returnedCourses = await response.json();
                returnedCourses.length ? setCourses(returnedCourses) : setCourses([returnedCourses]);
            }
            if (response.status === 404) {
                setErrors(<Four0FourComponent />);
                setCourses([]);
            }
            if (response.status > 499 && response.status < 600) {
                setErrors(<ErrorComponent error={response.status} message={response.message} />);
                setCourses([]);
            }
        },
        [],
    );

    useEffect(() => {
        const query = courseID === 0 ? `` : `/${courseID}`;
        setTimeout(() => {
            getCourses(query);
        }, 3000);
    }, [courseID, getCourses]);

    const handleChange = event => {
        if (event.target.type === `search`) {
            setSearchText(event.target.value);
        }

        if (event.target.type === `checkbox`) {
            setAdvanced(event.target.checked);
        }
    }

    const renderOptions = () => {
        const options = [];
        for (let i = 0, j = 8; i < j; i++) {
            options.push(<option value={i} key={i}>{i}</option>);
        }
        return options;
    }

    return (
        <>
            <div id="table-wrapper">
                <SearchBar
                    searchText={searchText}
                    advanced={advanced}
                    handleChange={handleChange}
                />
                {errors && errors}
                {Array.isArray(courses) && courses.length > 0 &&
                    <CourseTable
                        courses={courses}
                        searchText={searchText}
                        advanced={advanced}
                    />
                }
                {!errors && courses.length === 0 && <h4>Course Data is Loading</h4>}
            </div>
            <Routes>
                <Route path={`/courses/:id`} element={<Course courses={courses} />} />
            </Routes>
        </>
    );
};

export default FilterableCoursesTable;
