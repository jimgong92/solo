angular.module('philotes.input', [])

.controller('InputController', function ($scope, $location, Input){
  $scope.classroom = [];
  //Generate fake dataset for demo
  $scope.genFake = function(numB, numE, numV) {
  	//implement defenders later, for now set all to false
  	for (var b = 0; b < numB; b++) {
  		$scope.classroom.push(new Student('b' + b, 'B', false, 0.5));
  	}
  	for (var e = 0; e < numE; e++) {
  		$scope.classroom.push(new Student('e' + e, 'E', false, 0.5));
  	}
  	for (var v = 0; v < numV; v++) {
  		$scope.classroom.push(new Student('v' + v, 'V', false, 0.25));
  	}
  };
  $scope.initNetwork = function() {
  	for (var i = 0; i < $scope.classroom.length; i++) {
  		var student = $scope.classroom[i];
  		for (var j = 0; j < $scope.classroom.length; j++) {
  			if (i === j) return;
  			var other = $scope.classroom[j];
  			if (Math.random() <= student.charm * other.charm) {
  				student.addFriend(other.name);
  				other.addFriend(student.name);
  			}
  		}
  	}
  }

});

var roles = ['B', 'E', 'V'];

var Student = function(name, role, isDefender, charm) {
	this.name = name;
	this.role = role;
	this.isDefender = isDefender;
	this.charm = charm;
	this.friends = {};
	//anti-social accumulator
	this.asAccum = 0;
};

Student.prototype.setAccum = function(val) {
	this.asAccum += val;
};
Student.prototype.addFriend = function(name) {
	this.friends[name] = true;
};
