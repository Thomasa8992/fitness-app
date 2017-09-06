angular.module('controllers')
    .controller('calendarController', function (calendarService) {
        var cal = calendarService.initialize('#calendar');

        cal([{title:'event1', start: '2017-09-11'}]);
    });

angular.module('factories')
    .service('calendarService', function() {
        var calendarObject;

        this.initialize = function(selector) {
            return (events) => {
                calendarObject = $(selector);
                $(selector).fullCalendar({ events });
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

