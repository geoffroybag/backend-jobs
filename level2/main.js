const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json'));

const workers = data.workers
const shifts = data.shifts



const priceInfo = workers.map(oneWorker => {
    let priceTemp = 0
    let price_per_shift = 0

    // switch statement to determine price_per_shift according to worker status
    switch (oneWorker.status) {
        case "medic":
        price_per_shift = 270
            break;
        case "interne":
        price_per_shift = 126
            break;
    }

    shifts.forEach(oneShift=>{
     if(oneShift.user_id === oneWorker.id){
      return priceTemp += price_per_shift;
  }})
  return {
    id: oneWorker.id,
    price: priceTemp
  }
})

const output = { "workers": priceInfo };
  
const json = JSON.stringify(output);
fs.writeFileSync('output1.json', json);