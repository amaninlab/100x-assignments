/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let tempArray = [];
  let output = []
  transactions.forEach(element => {
    if (tempArray.includes(element.category)){
      for(i = 0; i < output.length; i++){
        if (output[i].category == element.category){
          output[i].totalSpent = output[i].totalSpent + element.price;
        }
      }
    }
    else{
      tempArray.push(element.category);
      output.push({category : element.category, totalSpent : element.price});
    }
  });
  return output;
}

module.exports = calculateTotalSpentByCategory;
