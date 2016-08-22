//client/scripts/TopicsCtrl.js User Topics View Controller
(function() ***REMOVED***
    'use strict';

    angular.module('exportsNavigator').controller('TopicsCtrl', TopicsCtrl);
    TopicsCtrl.$inject = ['$state', 'topicsService', 'topics', 'topic'];

    function TopicsCtrl(Topic) ***REMOVED***
        var vm = this;


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
            ***REMOVED***);
    ***REMOVED***;

    this.searchTopics = function(query) ***REMOVED***
        if (!query.length) return $state.go('topics');

        $state.go('search', ***REMOVED***query: query***REMOVED***);
    ***REMOVED***;

***REMOVED***
