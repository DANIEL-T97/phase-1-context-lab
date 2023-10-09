function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
   function createTimeInEvent(employee, dateStamp) {
     const [date, time] = dateStamp.split(' ');
     const hour = parseInt(time, 10);
     employee.timeInEvents.push({
       type: "TimeIn",
       hour: hour,
       date: date,
     });
     return employee;
   }
   function createTimeOutEvent(employee, dateStamp) {
     const [date, time] = dateStamp.split(' ');
     const hour = parseInt(time, 10);
     employee.timeOutEvents.push({
       type: "TimeOut",
       hour: hour,
       date: date,
     });
     return employee;
   }
   function hoursWorkedOnDate(employee, date) {
     const timeIn = employee.timeInEvents.find(event => event.date === date);
     const timeOut = employee.timeOutEvents.find(event => event.date === date);
    
     if (timeIn && timeOut) {
       const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
       return hoursWorked;
     }
    
     return 0;
   }
   function wagesEarnedOnDate(employee, date) {
     const hoursWorked = hoursWorkedOnDate(employee, date);
     const payRate = employee.payPerHour;
     return hoursWorked * payRate;
   }
   
   function findEmployeeByFirstName(srcArray, firstName) {
     return srcArray.find(employee => employee.firstName === firstName);
   }
   function calculatePayroll(employeeArray) {
     return employeeArray.reduce((totalPayroll, employee) => {
       return totalPayroll + allWagesFor(employee);
     }, 0);
   }
              

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}