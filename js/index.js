$(document).ready(function(){
    
    loadNews("lviv");
    loadRecipes("shredded%20chicken");
    
    function addItem(selector, url, title, img_url, desc) {
        $(selector).append(
           "<article class='news-item col-12 col-sm-6 col-lg-4'><a href='"+url+"'><h3>" + title + "</h3>"+
            "<img src=\"" + img_url + "\" /><p>" + desc + "</p></a></article>"
        );
    }
            
    function loadNews(about) {
        $.ajax({url: "https://newsapi.org/v2/everything?q=" + about + "&language=uk&from=2018-08-01&apiKey=c82dd1db265e4e06a92deefffcf65c71", success: function(result){
            if (result.status == "ok") {
                for (let i = 0; i < result.articles.length; i++) {
                let item = result.articles[i];
                addItem("#news", item.url, item.title, item.urlToImage, item.description);
                }
            }
        }});
    }
    
    
    function loadRecipes(about) {
        $.ajax({url: "https://food2fork.com/api/search?key=94d213211ca9519693f21abf7ff525d0&q=" + about, success: function(result){
            let json = JSON.parse(result);
            for (let i = 0; i < json.recipes.length; i++) {
            let item = json.recipes[i];
            addItem("#recipes", item.source_url, item.title, item.image_url, "Rating: " + item.social_rank);
            }
        }});
    }
});