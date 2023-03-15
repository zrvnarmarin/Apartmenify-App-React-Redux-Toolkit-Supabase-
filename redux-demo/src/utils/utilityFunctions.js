export const getDatesBetweenIntervals = (startDate, endDate) => {
    // Create an empty array to hold the dates
    var dates = [];
  
    // Set the date to start from the beginning of the starting date
    var currentDate = new Date(startDate);
  
    // Loop through all the dates between the starting and ending dates
    while (currentDate <= endDate) {
      // Add the current date to the array
      dates.push(new Date(currentDate));
  
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    // Return the array of dates
    return dates;
}