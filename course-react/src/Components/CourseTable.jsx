import React from 'react';
import PropTypes from 'prop-types';
import CourseCategoryRow from './CourseCategoryRow';
import CourseRow from './CourseRow';
import compare from './utilities/compare';

const CourseTable = ({ courses, searchText, advanced }) => {

    const makeCourseData = () => {

        let courseCategory = ``;
        const courseData = [];
        if (Array.isArray(courses) && courses.length > 0) {
            courses.sort(compare);
        }

        const filteredCourses = courses.filter(course => {
            const courseNameLowerCase = course.name?.toLowerCase();
            const searchTextMatch = searchText ? courseNameLowerCase?.indexOf(searchText) : -1;
            if (!searchText && !advanced) {
                return courseNameLowerCase ? course : null;
            }
            else if (searchText && searchTextMatch !== -1 && !advanced) {
                return course;
            }
            else if (!searchText && advanced && course.advanced) {
                return course;
            }
            else if (searchText && searchTextMatch !== -1 && advanced && course.advanced) {
                return course;
            }
            return null;
        });

        filteredCourses.forEach((course, index) => {
            if (course?.category === courseCategory) {
                courseData.push(<CourseRow course={course} key={index} />);
            } else {
                courseCategory = course?.category;
                courseData.push(<CourseCategoryRow category={course.category} key={course.category} />);
                courseData.push(<CourseRow course={course} key={index} />);
            }
        });

        return courseData;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {makeCourseData()}
            </tbody>
        </table>
    );

};

CourseTable.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            advanced: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    searchText: PropTypes.string.isRequired,
    advanced: PropTypes.bool.isRequired
};

export default CourseTable;