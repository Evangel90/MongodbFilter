const User = require('./User');

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
        return await collection.find({ [dateField]: { $gte: start, $lt: end } });
      }
      case "week": {
        // Adjust to start on Sunday and end on Saturday
        const weekday = filterDateObj.getDay();
        const weekStart = new Date(filterDateObj.getFullYear(), filterDateObj.getMonth(), filterDateObj.getDate() - weekday);
        const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000); // 6 days for Sunday to Saturday
        return await collection.find({ [dateField]: { $gte: weekStart, $lt: weekEnd } });
      }
      case "year": {
        // Adjust to start on Jan 1st and end on Dec 31st
        const yearStart = new Date(filterDateObj.getFullYear(), 0, 1);
        const yearEnd = new Date(filterDateObj.getFullYear() + 1, 0, 0); // 0th day of next year is Dec 31st
        return await collection.find({ [dateField]: { $gte: yearStart, $lt: yearEnd } });
      }
      default:
        throw new Error("Invalid filter type");
    }
}

console.log(filterByDate(User, 'registrationDate', '2024-01-01', 'year'));
// console.log(User)