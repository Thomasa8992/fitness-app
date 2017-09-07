angular.module('controllers')
    .controller('calendarController', function (calendarService, $scope, $http) {
        var cal = calendarService.initialize('#calendar');
        var calendar;
        
        $http.get('http://localhost:3000/api/user')
        .then(function (success) {
            var events = success.data['Joe Blowe'].events;      

            calendar = cal({ events: events, eventClick: function(calEvent, jsEvent, view) {
                var toDelete = confirm('Are you sure you wish to delete this event?');

                if (toDelete) {
                    $(this).css({ "display": "none"});
                    
                    $http({
                        method: 'DELETE',
                        url: 'http://localhost:3000/api/user',
                        data: {
                            title: calEvent.title,
                            start: calEvent.start
                        },
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    })
                    .then(function() {
                        alert('event has been deleted');
                    });
                }
            }});
        }, function (err) {
            console.log(err);
        });

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
            return (config) => {
                calendarObject = $(selector);
                $(selector).fullCalendar(config);
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

