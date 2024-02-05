function captureQuery(query) {
  //initialize an array
  const queryArray = [];
  //loop through each key in the query passed into the function
  for (const key in query) {
    //create an object to hold the keys from the query as it loops through
    const condition = {};
    //take the keys out of the query object passed in and set them as keys in condition with 'address.' preceeding each passed in value. 
    //i.e. city: Venice is passed in - 'address.city: Venice' is the result.
    condition[`addresses.${key}`] = query[key];
    //push the new condion object with 'address.x' key into the array that we will be returning before iterating through the next key in query
    queryArray.push(condition);
  }

  return queryArray;
};

module.exports = captureQuery;