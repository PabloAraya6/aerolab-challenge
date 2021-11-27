const formatCategories = (categories, parent_id = null) => {
    return categories.reduce((acc, element) => {
        let obj = { ...element };
        if (parent_id == element.parent_id) {
            let subcategories = formatCategories(categories, element.id);
            if (subcategories.length)
                obj.subcategories = subcategories;
            acc.push(obj)
        }
        return acc;
    }, []);
}

module.exports = { formatCategories };
