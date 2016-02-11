var app = angular.module('news', ['angularUtils.directives.dirPagination']);

app.service('newsService', function($http){
  this.parseNews = function(url){
    return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
  }

})

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    htmlCode = htmlCode.replace(/span style="[a-zA-Z0-9:;&\.\s\(\)\-\,]*"/gi, 'span')
      .replace(/img /gi, 'img class = "img-responsive"');
      // .replace(/[^//](h1|h2|h3)/gi, '')
    return $sce.trustAsHtml(htmlCode);
  }
}]);

app.filter('publicationDate', function () {
    return function (dateString) {
        return new Date(dateString).toLocaleString();
    };
});

app.controller('news-ctrl', function($scope, newsService) {
  // news array
  $scope.news = [];

  newsService.parseNews('http://lowellringel.blogspot.com/feeds/posts/default?alt=rss').then(function(res){
    $scope.news = res.data.responseData.feed.entries;
    console.log(res.data.responseData.feed);
  });


});
