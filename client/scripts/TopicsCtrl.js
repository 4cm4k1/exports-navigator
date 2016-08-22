//client/scripts/TopicsCtrl.js User Topics View Controller
(function() ***REMOVED***
    'use strict';

    angular.module('exportsNavigator').controller('TopicsCtrl', TopicsCtrl);
    TopicsCtrl.$inject = ['$state', 'topicsService', 'topics', 'topic'];

    function TopicsCtrl(Topic) ***REMOVED***
        var vm = this;
        console.log('Injeting some stuff.');
    ***REMOVED***
***REMOVED***)();

    function topicsData($state, topicsService, topics, topic) ***REMOVED***

    this.topic = topics.data;

    this.topicQuery = $state.params.query;

    this.topics = topics.data;

    this.saveTopics = function() ***REMOVED***
        topicsService.saveTopics(this.topic)
            .then(function() ***REMOVED***
                $state.go('topics');
                console.log('Test Topics Save.');
            ***REMOVED***);
    ***REMOVED***;

    this.searchTopics = function(query) ***REMOVED***
        if (!query.length) return $state.go('topics');

        $state.go('search', ***REMOVED***query: query***REMOVED***);
        console.log('Searching Topics!');
    ***REMOVED***;

***REMOVED***
