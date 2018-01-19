require.config({
    paths:{
        //'jquery':'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/jquery/jquery-1.10.2.min_65682a2.js'
    }
});
require(['jquery','a','b'],function($,a,b){

    alert(a.callcountnum(4,5));
    b.clickbbtn();

});