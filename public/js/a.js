define(function(){
    return {
        showa : function(){
            return 'a.js';
        },
        countnum : function(a,b){
            return a+b;
        },
        callcountnum:function(c,d){
            return this.countnum(c,d);
        }
    }
});