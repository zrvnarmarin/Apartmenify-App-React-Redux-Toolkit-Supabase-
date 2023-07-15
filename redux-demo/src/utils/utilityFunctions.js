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

export function compareObjects(obj1, obj2, props) {
  for (let prop of props) {
    if (obj1[prop] !== obj2[prop]) {
      return false;
    }
  }
  return true;
}

export function generateRatingGrade (rating) {
  switch (rating) {
    case 1: 
      return 'Very poor'   
    case 2: 
      return 'Poor'   
    case 3: 
      return 'Good'   
    case 4: 
      return 'Very good'   
    case 5: 
      return 'Excellent'   
  }
}

export function formatDate(date) {
  const options = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  
  return date.toLocaleString('en-US', options);
}