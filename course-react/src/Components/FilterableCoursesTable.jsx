import React, { useState, useEffect } from 'react';
import CourseTable from './CourseTable';
import SearchBar from './SearchBar';

const coursesUrl = `http://localhost:4000/courses`;

const FilterableCoursesTable = () => {

    const [searchText, setSearchText] = useState(``);
    const [advanced, setAdvanced] = useState(false);
    const [courses, setCourses] = useState([]);
    const [courseID, setCourseID] = useState(0)

    const getCourses = async query => {
        const response = await fetch(`${coursesUrl}${query}`);
        const returnedCourses = await response.json();
        returnedCourses.length ? setCourses(returnedCourses) : setCourses([returnedCourses]);
    }

    useEffect(() => {
        const query = courseID === 0 ? `` : `/${courseID}`;
        setTimeout(() => {
            getCourses(query);
        }, 3000);
    }, [courseID]);

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
        <div id="table-wrapper">
            <label htmlFor="courseID">Choose a courseID:&nbsp;</label>
            <select name="courseId" value={courseID} onChange={event => setCourseID(event.target.value)}>
                {renderOptions()}
            </select>
            <hr />
            <SearchBar
                searchText={searchText}
                advanced={advanced}
                handleChange={handleChange}
            />
            {Array.isArray(courses) && courses.length > 0 ?
                <CourseTable
                    courses={courses}
                    searchText={searchText}
                    advanced={advanced}
                />
                :
                <h4>Course Data is Loading</h4>
            }
        </div>
    );
};

export default FilterableCoursesTable;