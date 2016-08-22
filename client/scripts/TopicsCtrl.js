//client/scripts/TopicsCtrl.js User Topics View Controller
(function() {
    'use strict';

    angular.module('exportsNavigator').controller('TopicsCtrl', TopicsCtrl);
    TopicsCtrl.$inject = ['$state', 'topicsService', 'topics', 'topic'];

    function TopicsCtrl(Topic) {
        var vm = this;


    }
})();

    function topicsData($state, topicsService, topics, topic) {

    this.topic = topics.data;

    this.topicQuery = $state.params.query;

    this.topics = topics.data;

    this.saveTopics = function() {
        topicsService.saveTopics(this.topic)
            .then(function() {
                $state.go('topics');
            });
    };

    this.searchTopics = function(query) {
        if (!query.length) return $state.go('topics');

        $state.go('search', {query: query});
    };

}
