import React from 'react';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

const SearchBar = ({ searchText, advanced, handleChange }) => {
    return (
        <form>
            <fieldset>
                <input
                    type="search"
                    name="searchText"
                    placeholder="Search..."
                    value={searchText}
                    onChange={event => handleChange(event)}
                />
                &nbsp;
                <i className="fa fa-search"></i>
            </fieldset>
            <fieldset>
                <label htmlFor="advanced">Show only advanced courses: </label>
                <input
                    type="checkbox"
                    name="advanced"
                    checked={advanced}
                    onChange={event => handleChange(event)}
                />
            </fieldset>
        </form>
    );
};

SearchBar.propTypes = {
    searchText: PropTypes.string.isRequired,
    advanced: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default SearchBar;