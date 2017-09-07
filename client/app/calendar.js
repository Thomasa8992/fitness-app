angular.module('controllers')
    .controller('calendarController', function (calendarService, $scope, $http) {
        var calendar;
        
        $http.get('http://localhost:3000/api/user')
        .then(function (success) {
            console.log(success);
            var cal = calendarService.initialize('#calendar');
            var events = success.data['Joe Blowe'].events;            
            calendar = cal(events);
        }, function (err) {
            console.log(err);
        })
        

        $scope.next = function() {
            calendar.fullCalendar('next');
        };

        $scope.previous = function() {
            calendar.fullCalendar('prev');
        };
    });

angular.module('factories')
    .service('calendarService', function() {
        console.log('inside calendar service');
        var calendarObject;

        this.initialize = function(selector) {
            return (events) => {
                calendarObject = $(selector);
                $(selector).fullCalendar({ events });
                return $(selector);
            };
            
        };
        
        this.addEvent = function(event) {
            var eventSource = [];
            
            if (typeof event === 'object') {
                eventSource.push(event);
            }

            if (Array.isArray(event)) {
                eventSource = eventSource.concat(event);
            }

            calendarObject.fullCalendar('addEventSource', eventSource);
        };

    });

