const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect( 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.4');


async function filterByDate(collection, dateField, filterDate, filterType) {
    // Validate input
    if (!collection || !dateField || !filterDate || !filterType) {
      throw new Error("Missing required arguments");
    }
  
    // Convert filterDate to a Date object
    const filterDateObj = new Date(filterDate);
  
    // Build filter based on filterType
    switch (filterType) {
      case "day": {
        // Filter documents created on the provided date
        const start = new Date(filterDateObj.getFullYear(), filterDateObj.getMonth(), filterDateObj.getDate());
        const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1); // Adjust end time to 23:59:59
        const day = await collection.find({ [dateField]: { $gte: start, $lt: end } });
        console.log(day)
        return day
      }
      // Adjust to start on Sunday and end on Saturday
      case "week": {
        const weekday = filterDateObj.getDay();
        const weekStart = new Date(filterDateObj.getFullYear(), filterDateObj.getMonth(), filterDateObj.getDate() - weekday);
        const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000); // 6 days for Sunday to Saturday
        const week = await collection.find({ [dateField]: { $gte: weekStart, $lt: weekEnd } });
        console.log(week)
        return week
      }
      case "month": {
        // Filter documents created within the provided month
        const monthStart = new Date(filterDateObj.getFullYear(), filterDateObj.getMonth(), 1);
        const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0); // Last day of the month
        const month = await collection.find({ [dateField]: { $gte: monthStart, $lt: monthEnd } });
        console.log(month);
        return month;
      }
      case "year": {
        // Adjust to start on Jan 1st and end on Dec 31st
        const yearStart = new Date(filterDateObj.getFullYear(), 0, 1);
        const yearEnd = new Date(filterDateObj.getFullYear() + 1, 0, 0); // 0th day of next year is Dec 31st
        const year = await collection.find({ [dateField]: { $gte: yearStart, $lt: yearEnd } });
        console.log(year)
        return year
      }
      default:
        throw new Error("Invalid filter type");
    }
}

console.log(filterByDate(User, 'registrationDate', '2008-12-11', 'month'));
// console.log(User)

// module.exports = { filterByDate }