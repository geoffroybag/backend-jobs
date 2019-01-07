const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json'));

const workers = data.workers
const shifts = data.shifts

function weekendFinder(oneDate){
  const date = new Date(oneDate)
  if(date.getDay() === 0 || date.getDay() === 6){
    return true
  }
  else {
    return false
  }
}

const interimShifts = []
// function to determine number of interim shifts and calculate fees
function interimFees(){
    // first lets calculate the number of interim shifts
    workers.forEach(oneWorker=>{
        if(oneWorker.status === "interim"){
            shifts.forEach(oneShift=>{
                if(oneShift.user_id === oneWorker.id){
                    interimShifts.push(oneShift)
                }
            })
        }
    })
    // return the price of interim fees
    return interimShifts.length * 80 
}

// calculate regular fees (5% of all shifts)
function regularFees() {
    let feeTemp = 0
    priceInfo.forEach(oneInfo=>{
        feeTemp +=oneInfo.price
    })
    return feeTemp * 0.05
}

// calculate all fees
function totalFees(){
    return interimFees() + regularFees();
}


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
        case "interim":
        price_per_shift = 480
        break;
    }

    shifts.forEach(oneShift=>{
        if(oneShift.user_id === oneWorker.id){
        if(weekendFinder(oneShift.start_date)){
            priceTemp += price_per_shift*2;
        }
        else{
            priceTemp += price_per_shift;
        }
  }})
  return {
    id: oneWorker.id,
    price: priceTemp
  }
})

const output = { "workers": priceInfo, "commission":{"pdg_fee": totalFees(),"interim_shifts":interimShifts.length} };

const json = JSON.stringify(output);
fs.writeFileSync('output1.json', json);