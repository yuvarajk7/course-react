import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseRow = ({ course }) => {

    const { name, advanced, price, id } = course;

    return (
        <tr>
            <td className={advanced ? `advanced` : ``}>
                <Link to={`/courses/${id}`}>{name}</Link>
            </td>
            <td>${price}</td>
        </tr>

    );
};

CourseRow.propTypes = {
    course: PropTypes.shape({
        price: PropTypes.number.isRequired,
        advanced: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })
};

export default CourseRow;
