import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useCoursesContext } from '../StateManagement/CoursesProvider';

import CourseTable from './CourseTable';
import SearchBar from './SearchBar';
import Four0FourComponent from './Four0FourComponent';
import ErrorComponent from './ErrorComponent';
import Course from './Course';

const FilterableCoursesTable = () => {

    const [searchText, setSearchText] = useState(``);
    const [advanced, setAdvanced] = useState(false);

    const { courses } = useCoursesContext();

    const errors = [];

    if (courses.length && courses[0].hasOwnProperty(`status`)) {
        const { status, message } = courses[0];
        if (status === 404) {
            errors.push(<Four0FourComponent key={status} />);
        } else {
            errors.push(<ErrorComponent key={status} error={status} message={message} />);
        }
    }

    const handleChange = event => {
        if (event.target.type === `search`) {
            setSearchText(event.target.value);
        }

        if (event.target.type === `checkbox`) {
            setAdvanced(event.target.checked);
        }
    }

    // NEW VERSION OF FilterableCoursesTable - using Context

    return (
        <>
            <div id="table-wrapper">
                <SearchBar
                    searchText={searchText}
                    advanced={advanced}
                    handleChange={handleChange}
                />
                {errors.length > 0 && errors}
                {courses.length > 0 && !errors.length &&
                    <CourseTable
                        courses={courses}
                        searchText={searchText}
                        advanced={advanced}
                    />
                }
                {!errors.length && courses.length === 0 && <h4>Course Data is Loading</h4>}
            </div>
            {courses.length > 0 && !errors.length &&
                <Switch>
                    <Route path={`/courses/:id`}>
                        <Course courses={courses} />
                    </Route>
                </Switch>
            }
        </>
    );
};

export default FilterableCoursesTable;
