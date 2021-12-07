export default function compare(courseA, courseB) {
    const catA = courseA.category.toLowerCase();
    const catB = courseB.category.toLowerCase();

    let comparison = 0;
    if (catA > catB) {
        comparison = 1;
    }
    if (catA < catB) {
        comparison = -1;
    }

    return comparison;
}