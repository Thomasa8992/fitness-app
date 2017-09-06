angular.module('controllers')
    .controller('calendarController', function (calendarService, $scope) {
        var cal = calendarService.initialize('#calendar');

        var calendar = cal([{title:'event1', start: '2017-09-11'}]);

        $scope.next = function() {
            calendar.fullCalendar('next');
        };

        $scope.previous = function() {
            calendar.fullCalendar('prev');
        };
    });

angular.module('factories')
    .service('calendarService', function() {
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

