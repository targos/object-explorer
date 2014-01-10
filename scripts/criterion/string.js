define(["criterion/base","jquery/jquery"],function(BaseCriterion){
    function StringCriterion() {}
    $.extend(StringCriterion.prototype, BaseCriterion.prototype);
    
    StringCriterion.prototype.comparators = {
        contains : function(value) {
            return -1 !== String.prototype.indexOf.call(value, this.ref);
        },
        nocontains : function(value) {
            return -1 === String.prototype.indexOf.call(value, this.ref);
        }
    }
    
    StringCriterion.prototype.config = function(options) {
        switch(options.comparator) {
            case "contains":
                this.comparator = this.comparators.contains;
                break;
            case "nocontains":
                this.comparator = this.comparators.nocontains;
                break;
        }
        this.ignoreCase = options.ignoreCase;
        this.ref = options.ref;
    };
    
    StringCriterion.prototype.eval = function(value) {
        if(typeof value !== 'string') return false;
        if(this.ignoreCase) {
            value = value.toLowerCase();
            this.ref = this.ref.toLowerCase();
        }
        
        return this.comparator(value);
    };
    return StringCriterion;
});