// Your code here
function createEmployeeRecord([str1, str2, str3, num]){
    let obj = {
        firstName : str1,
        familyName : str2,
        title : str3,
        payPerHour : num,
        timeInEvents : [],
        timeOutEvents : []
    }
    return obj
}

function createEmployeeRecords(arrayOfArray){
    let returnArr = []
	for (const array of arrayOfArray) {
        returnArr.push((createEmployeeRecord(array)));
      } 
	return returnArr
}

function createTimeInEvent(employeeRecord, dateStamp){
    const words = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(words[1]),
        date: words[0]
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const words = dateStamp.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(words[1]),
        date: words[0]
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    
	let timeOut = employeeRecord.timeOutEvents.find(e =>
		e.date === dateStamp)
	let timeOutHour = (timeOut.hour)
													
    let timeIn = employeeRecord.timeInEvents.find(e =>
		e.date === dateStamp)
	let timeInHour = (timeIn.hour)

	return((timeOutHour - timeInHour)/100)
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
	let hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp)
    let salary = employeeRecord.payPerHour
    return (hoursWorked * salary)
}


function allWagesFor(employeeRecord){
    
	let workDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })
	console.log(workDates)
	//console.log(workDates.length)
	//console.log('here')

    let payable = workDates.reduce((acc, dataStamp) => {
        return acc + wagesEarnedOnDate(employeeRecord, dataStamp)
    }, 0)

    return payable
}

function calculatePayroll(employeeRecordArr){
    let payable = employeeRecordArr.reduce((acc, employeeRecord) => {
        return acc + allWagesFor(employeeRecord)
    }, 0)

    return payable
}
