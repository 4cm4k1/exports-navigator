//client/scripts/TopicsCtrl.js User Topics View Controller
(function() {
    'use strict';

    angular.module('exportsNavigator').controller('TopicsCtrl', TopicsCtrl);
    TopicsCtrl.$inject = ['$state', 'topicsService', 'topics', 'topic'];

    function TopicsCtrl(Topic) {
        var vm = this;
        console.log('Injecting some stuff.');
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
                console.log('Test Topics Save.');
            });
    };

    this.searchTopics = function(query) {
        if (!query.length) return $state.go('topics');

        $state.go('search', {query: query});
        console.log('Searching Topics!');
    };

}
