define(function(){
    function ObjectExplorer() {
        this.criteria = [];
    }

    ObjectExplorer.prototype = {
        addCriterion : function(type, jpath, options) {
            var that = this;
            require(["criterion/"+type],function(Criterion) {
                var criterion;
                criterion = new Criterion();
                if(criterion) {
                    criterion.init(jpath, options);
                    that.criteria.push(criterion);
                }
                else
                    console.log("unknown criterion");
            });
        },
        explore : function(obj) {
            var crit = this.criteria, i = 0, l = crit.length;
            for(; i < l; i++) {
                if(!(crit[i].evaluate(obj))) return false;
            }
            return true;
        },
        filter : function(obj) {
            var result = [];
            for(var i = 0, ii = obj.length; i < ii; i++) {
                if(this.explore(obj[i]))
                    result.push(obj[i]);
            }
            return result;
        }
    };
    return ObjectExplorer;
});