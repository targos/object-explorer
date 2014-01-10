define(function(){
    function BaseCriterion() {}
    BaseCriterion.prototype = {
        init : function(jpath,options) {
            this.config(options);
            this.jpath = jpath;
            this.canMiss = (typeof options.canMiss === 'boolean') ? options.canMiss : false;
        },
        find : function(object) {
            for(var i = 0,path = this.jpath.split('.'),len = path.length; i < len; i++){
                if(!object || typeof object !== 'object') return;
                object = object[path[i]];
            }
            return object;
        },
        evaluate : function(object) {
            var value = this.find(object);
            if(value===undefined) return this.canMiss;
            return this.eval(value);
        },
        config : function(options) {},
        eval : function(value) { return true; }
    }
    return BaseCriterion;
});