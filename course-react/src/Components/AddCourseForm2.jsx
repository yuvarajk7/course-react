import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatchContext, getCourses } from '../StateManagement/CoursesProvider';

const AddCourseForm = () => {

    const [name, setName] = useState(``);
    const [category, setCategory] = useState(``);
    const [price, setPrice] = useState(0);
    const [advanced, setAdvanced] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    const dispatch = useDispatchContext();

    const resetStates = () => {
        setName(``);
        setCategory(``);
        setPrice(0)
        setAdvanced(false);
    }

    const submitForm = async event => {
        event.preventDefault();
        let payload = { name, price: parseInt(price), category, advanced };

        dispatch({ type: `addCourse`, payload });
        payload = await getCourses();
        dispatch({ type: `getCourses`, payload });

        resetStates();
        setSubmitted(true);
    }

    return (
        <>
            {submitted && <Redirect to="/" />}
            <h3>Add a course:</h3>
            <form id="table-wrapper" onSubmit={submitForm}>
                <fieldset>
                    <label htmlFor="name">Course Name:&nbsp;</label>
                    <input type="text" name="name" value={name} onChange={event => setName(event.target.value)} />
                </fieldset>
                <fieldset>
                    <label htmlFor="category">Course Category:&nbsp;</label>
                    <select name="category" value={category} onChange={event => setCategory(event.target.value)}>
                        <option value="" disabled default>-- Please choose --</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Project Management">Project Management</option>
                        <option value="Other">Other</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="price">Course Price £:&nbsp;</label>
                    <input type="text" name="price" value={price} onChange={event => setPrice(event.target.value)} />
                </fieldset>
                <fieldset>
                    <label htmlFor="advanced">Is course advanced?</label>
                    <input type="checkbox" name="advanced" checked={advanced} onChange={event => setAdvanced(event.target.checked)} />
                </fieldset>
                <fieldset>
                    <input type="submit" value="Submit" />
                </fieldset>
            </form>
        </>
    );
};

export default AddCourseForm;