define(function(){
    function BaseCriterion() {}
    BaseCriterion.prototype = {
        init : function(jpath,options) {
            this.configurate(options);
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
        configurate : function(options) {
            var config = this.config;
            var comparator = options.comparator, comp, variables;
            if(options.hasOwnProperty(comparator)) {
                comp = options[comparator];
                if(comp.variables)
                    variables = comp.variables;
                else
                    variables = ["ref"]
            }
        },
        config : {},
        eval : function(value) { return true; }
    }
    return BaseCriterion;
});