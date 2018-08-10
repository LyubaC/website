$(document).ready(function(){
    
    loadNews("lviv");
            
    function addNews(item) {
        $("#news").append(
           "<article class='news-item col-12 col-sm-6 col-lg-4 col-xl-3'><a href='"+item.url+"'><h3>"+ item.title +"</h3>"+
            "<img src=\"" + item.urlToImage + "\" /><p>"+ item.description +"</p></a></article>"
        ); 
    }
    function loadNews(about) {
        $.ajax({url: "https://newsapi.org/v2/everything?q=" + about + "&language=uk&from=2018-08-01&apiKey=c82dd1db265e4e06a92deefffcf65c71", success: function(result){
            //$("#news").html(result);
            let newsJSON = result;
            if (newsJSON.status == "ok") {
                for (let i = 0; i < newsJSON.articles.length; i++) {
                   addNews(newsJSON.articles[i]);
                }
            }
        }});
        
    }
});