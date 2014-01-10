define(["criterion/base","jquery/jquery"],function(BaseCriterion){
    function NumberCriterion() {}
    $.extend(NumberCriterion.prototype, BaseCriterion.prototype);

    NumberCriterion.prototype.comparators = {
        less : function(value, options) { return (value < options.ref); },
        greater : function(value, options) { return (value > options.ref); },
        lessOrEqual : function(value, options) { return (value <= options.ref); },
        greaterOrEqual : function(value, options) { return (value >= options.ref); },
        between : function(value, options) {
            if(options.include) return (value >= options.lower && value <= options.upper);
            else return (value > options.lower && value < options.upper);
        },
        outside : function(value, options) {
            if(options.include) return (value <= options.lower || value >= options.upper);
            else return (value < options.lower || value > options.upper);
        },
        equal : function(value, options) { return value===options.ref; },
        notEqual : function(value, options) { return value!==options.ref; }
    };
    NumberCriterion.prototype.config = {
        comparators : {
            less : {
                identifiers : ["<"],
            },
            greater : {
                identifiers : [">"]
            },
            lessOrEqual : {
                identifiers : ["<="]
            },
            greaterOrEqual : {
                identifiers : [">="]
            },
            between : {
                identifiers : ["between","btw"],
                variables : ["lower","upper","include"]
            },
            outside : {
                identifiers : ["between","btw"],
                variables : ["lower","upper","include"]
            },
            equal : {
                identifiers : ["eq","=","==","==="]
            },
            notEqual : {
                identifiers : ["neq","!=","!=="]
            }
        },
        defaults : {
            ref : 0,
            lower : 0,
            upper : 0,
            include : false
        }
    };
    /*NumberCriterion.prototype.config = function(options) {
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
    };*/
    NumberCriterion.prototype.eval = function(value,options) {
        value = parseFloat(value);
        if(Number.isNaN(value)) return false;
        return this.comparator(value,options);
    };
    return NumberCriterion;
});