define(["criterion/base","jquery/jquery"],function(BaseCriterion){
    function NumberCriterion() {}
    $.extend(NumberCriterion.prototype, BaseCriterion.prototype);

    NumberCriterion.prototype.comparators = {
        less : function(value) { return (value < this.ref); },
        greater : function(value) { return (value > this.ref); },
        lessOrEqual : function(value) { return (value <= this.ref); },
        greaterOrEqual : function(value) { return (value >= this.ref); },
        between : function(value) {
            if(this.include) return (value >= this.lower && value <= this.upper);
            else return (value > this.lower && value < this.upper);
        },
        outside : function(value) {
            if(this.include) return (value <= this.lower || value >= this.upper);
            else return (value < this.lower || value > this.upper);
        },
        equal : function(value) { return value===this.ref; },
        notEqual : function(value) { return value!==this.ref; }
    };
    NumberCriterion.prototype.config = function(options) {
        switch(options.comparator) {
            case "<":
                this.comparator = this.comparators.less;
                break;
            case ">":
                this.comparator = this.comparators.greater;
                break;
            case "<=":
                this.comparator = this.comparators.lessOrEqual;
                break;
            case ">=":
                this.comparator = this.comparators.greaterOrEqual;
                break;
            case "btw":
            case "between":
            case "out":
            case "outside":
                this.lower = options.lower;
                this.upper = options.upper;
                this.include = options.include;
                this.comparator = (options.comparator=="outside"||options.comparator=="out") ? this.comparators.outside : this.comparators.between;
                break;
            case "=":
            case "eq":
                this.comparator = this.comparators.equal;
                break;
            case "!=":
                this.comparator = this.comparators.notEqual;
                break;
        }
        this.ref = options.ref;
    };
    NumberCriterion.prototype.eval = function(value) {
        value = parseFloat(value);
        if(Number.isNaN(value)) return false;
        return this.comparator(value);
    };
    return NumberCriterion;
});