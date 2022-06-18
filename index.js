// Your code here
let array=["Gray", "Worm", "Security", 1]

let twoRows = [
     ["moe", "sizlak", "barkeep", 2],
     ["bartholomew", "simpson", "scamp", 3]
   ]

function createEmployeeRecord(employee) {
     
     return {firstName : employee[0],
            familyName  : employee[1],
            title : employee[2],
            payPerHour : employee[3],
            timeInEvents: [],
            timeOutEvents:[]
     }
    
}

function createEmployeeRecords(records) {
    return records.map((record) => createEmployeeRecord(record))  
}


function createTimeInEvent(employeeRecord,time) {
     const hour = time.slice(11,15)
     const mdydate = time.slice(0,10)
     const timeInEmployee = {
       type: "TimeIn",
       hour: parseInt(hour, 10),
       date: mdydate
     }
     employeeRecord.timeInEvents.push(timeInEmployee)
     return employeeRecord  
}

function createTimeOutEvent(employeeRecord,time){
     const hour = time.slice(11,15)
     const mdydate = time.slice(0,10)
     const timeOutEmployee = {
       type: "TimeOut",
       hour: parseInt(hour, 10),
       date: mdydate
     }
     employeeRecord.timeOutEvents.push(timeOutEmployee)
     return employeeRecord;
}


function hoursWorkedOnDate(employeeRecord,date) {
     let timeInRecord = employeeRecord.timeInEvents.filter(timeIn => timeIn.date === date)
    let timeOutRecord = employeeRecord.timeOutEvents.filter(timeOut => timeOut.date === date)

    return (timeOutRecord[0].hour - timeInRecord[0].hour) / 100
}

function wagesEarnedOnDate(employeeRecord,date) {
     let hourly = employeeRecord.payPerHour;
     return hourly*hoursWorkedOnDate(employeeRecord,date);
}

function allWagesFor(employeeRecord){
     let dates = employeeRecord.timeInEvents.map(timeIn => timeIn.date)
 
     return dates.reduce((total,date) => {
         total = total + wagesEarnedOnDate(employeeRecord, date)
         return total
     }, 0)
 }



function calculatePayroll(employeeArray) {
     let total = 0
     employeeArray.forEach(employee => {
       total = total + allWagesFor(employee)
     })
     return total
   }


