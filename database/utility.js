module.exports = {
	daysPerMonth: {
		1: 31,
		2: 28,
		3: 31,
		4: 30,
		5: 31,
		6: 30,
		7: 31,
		8: 31,
		9: 30,
		10: 31,
		11: 30,
		12: 31
	},
	parseToCalendarDays: function(tasksArray, month) {
		var indexedTasksForMonth = [];
		for (var i = 1; i <= module.exports.daysPerMonth[month]; i++) {
			var day = [{calendarDate: i}];
			for (var j = 0; j < tasksArray.length; j++ ) {
				var task = tasksArray[j];
				var start = parseInt(task.StartMonth)*100 + parseInt(task.StartDate);
				var end =  parseInt(task.DueMonth)*100 + parseInt(task.DueDate);
				var date = parseInt(month)*100 + i;
				if (  start <= date &&  date <= end ) {
					var task = task.toObject();
					task.brief = task.Name+' begin '+task.StartMonth+'/'+task.StartDate+' end '+task.DueMonth+'/'+task.DueDate;
					day.push(task);
				}
			}
			indexedTasksForMonth.push(day);
		}
		return indexedTasksForMonth;
	},
	parseDependenciesShow: function(tasksFlatArray) {
		var eventsFlatReturnArray = [];
		for (var i = 0; i < tasksFlatArray.length; i++) {
			var task = tasksFlatArray[i].toObject();
			task.brief = task.Name+' begin '+task.StartMonth+'/'+task.StartDate+' end '+task.DueMonth+'/'+task.DueDate;
			eventsFlatReturnArray.push(task);
		}
		return eventsFlatReturnArray;
	}
}