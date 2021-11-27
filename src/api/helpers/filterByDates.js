const moment = require('moment');

const filterByDates = (data, start, end)=> {
    return data.filter(item => {
        let date = moment(item.updatedAt).format();
        return (date >= start && date <= end);
    })
}

module.exports = { filterByDates };


