// parsing JSON to a JS object
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json'));

const workers = data.workers
const shifts = data.shifts

// mapping over the workers and shift arrays to determine total number of shifts for each worker and total price
const priceInfo = workers.map(oneWorker => {
  // define a temporary price variable to sum total price
  let priceTemp = 0
  shifts.forEach(oneShift=>{
     if(oneShift.user_id === oneWorker.id){
      return priceTemp += oneWorker.price_per_shift;
  }})
  return {
    id: oneWorker.id,
    price: priceTemp
  }
})

// place the result of the price calculation in the output object under "workers"
const output = { "workers": priceInfo };
  
// convert to output.json file
const json = JSON.stringify(output);
fs.writeFileSync('output1.json', json);