import React from 'react';
import PropTypes from 'prop-types';

const CourseCategoryRow = ({ category }) => {
    return (
        <tr>
            <td colSpan="2">{category}</td>
        </tr>
    );
};

CourseCategoryRow.propTypes = {
    category: PropTypes.string.isRequired
};

export default CourseCategoryRow;
