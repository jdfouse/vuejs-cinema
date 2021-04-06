function checkFilter(category, title, checked) {
    // adds to correct array by passing the passed category (genre || time)
    // else
    if (checked) {
        this[category].push(title);
    } else {
        let index = this[category].indexOf(title);
        if (index > -1) {
            this[category].splice(index, 1);
        }
    }
}

export { checkFilter };