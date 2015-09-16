var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

EmployeeProvider = function(host, port) {
  this.db= new Db('node-mongo-employee', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


EmployeeProvider.prototype.getCollection= function(callback) {
  this.db.collection('employees', function(error, employee_collection) {
    console.log("getting collection");

    if( error ){
      callback(error);
      console.log("Error getting collection "+error);

    }
    else{
      console.log("Got Collection "+employee_collection);
      callback(null, employee_collection);

    }
  });
};

//find all employees
EmployeeProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        employee_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//find an employee by ID
EmployeeProvider.prototype.findById = function(id, callback) {
  console.log("Finding byID: "+id);
    this.getCollection(function(error, employee_collection) {

      console.log("About to try/execpt");

      if( error ){ callback(error)
        console.log("Error "+error);
      }

      else {
        console.log("Finding: "+id);

        var employeeIdObject = new ObjectID.createFromHexString(id)
        employee_collection.findOne({_id: employeeIdObject}, function(error, result) {
          if( error ){
            console.log("Error finding : "+id);
            callback(error)
          }
          else {
            console.log("Result : "+result);

            callback(null, result)
          }
        });

      }
    });
};


//save new employee
EmployeeProvider.prototype.save = function(employees, callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        if( typeof(employees.length)=="undefined")
          employees = [employees];

        for( var i =0;i< employees.length;i++ ) {
          employee = employees[i];
          employee.created_at = new Date();
        }

        employee_collection.insert(employees, function() {
          callback(null, employees);
        });
      }
    });
};

// update an employee
EmployeeProvider.prototype.update = function(employeeId, employees, callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error);
      else {
        var employeeIdObject = new ObjectID.createFromHexString(employeeId);

        employee_collection.update(
            {_id: employeeIdObject},
					employees,
					function(error, employees) {
						if(error) callback(error);
						else callback(null, employees)       
					});
      }
    });
};

//delete employee
EmployeeProvider.prototype.delete = function(employeeId, callback) {
	this.getCollection(function(error, employee_collection) {
		if(error) callback(error);
		else {
          var employeeIdObject = new ObjectID.createFromHexString(employeeId);

          employee_collection.remove(
				{_id: employeeIdObject},
				function(error, employee){
					if(error) callback(error);
					else callback(null, employee)
				});
			}
	});
};

exports.EmployeeProvider = EmployeeProvider;