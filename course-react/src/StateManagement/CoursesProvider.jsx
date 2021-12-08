import React, { createContext, useContext, useEffect, useReducer } from 'react';

const coursesUrl = `http://localhost:4000/courses`;

const CoursesContext = createContext();
const DispatchContext = createContext();

const coursesReducer = (state, action) => {

    switch (action.type) {
        case `getCourses`:
            return { ...state, courses: action.payload };
        case `addCourse`:
            addCourse(action.payload);
            return { state };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const addCourse = async payload => {
    const { name, category, price, advanced } = payload;
    // Remember to validate values somewhere!
    const body = JSON.stringify({ name, category, price: parseInt(price), advanced });
    const requestOptions = {
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body
    };
    const response = await fetch(coursesUrl, requestOptions);
    const result = await response.json();
    // Should do error checking and perhaps display success/failure 
    // message to user 
    console.log(result);
}

export const getCourses = async () => {
    let response;
    let payload;

    try {
        response = await fetch(coursesUrl);

        if (response.status === 200) {
            payload = await response.json();
        }
        else {
            payload = [{ status: response.status, message: response.message }];
        }
    } catch (error) {
        payload = [{ status: 503, message: `The data service is not available` }];
    }
    return payload;
};

const CoursesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(coursesReducer, { courses: [] });

    useEffect(() => {
        const getCoursesData = async () => {
            const payload = await getCourses();
            dispatch({ type: `getCourses`, payload });
        }
        setTimeout(() => {
            getCoursesData();
        }, 3000);
    }, []);

    return (
        <CoursesContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </CoursesContext.Provider>
    );
};

export function useCoursesContext() {
    const context = useContext(CoursesContext);

    if (context === undefined) {
        throw new Error(`useCoursesContext must be used inside a CoursesProvider`);
    }

    return context;
}

export function useDispatchContext() {
    const context = useContext(DispatchContext);

    if (context === undefined) {
        throw new Error(`useDispatchContext must be used inside a CoursesProvider`);
    }

    return context;
}

export default CoursesProvider;