object-explorer
===============

##Library for exploration and validation of JSON objects

### Define a simple criterion
In this example, the criterion is a number. It evaluates to true if the value at property "a" is less than 5. It also evaluates to true if the property does not exist

    var options = {
        type: "number",
        comparator: "<",
        reference: 5,
        jpath: "a",
        optional: true
    };
    var crit = new Criterion(options);

### How to apply a criterion on a single object

    var obj = {a:1, b:"hello"};
    var result = crit.evaluate(obj); // true

### How to apply a criterion on an array of objects to filter it

    var arr = [{a:1,b:"hello"},{a:9,b:"hi"},{c:"ho"}];
    var result = crit.filter(arr); // [{a:1,b:"hello"},{c:"ho"}]

### How to combine criterions

    var crit1 = new Criterion(/* Any basic criterion */);
    var crit2 = new Criterion(/* Any other basic criterion */);

#### Logical operators

    var crit3 = crit1.and(crit2); // Both criterions must be true
    var crit4 = crit1.or(crit2); // Any criterion must be true
    var crit5 = crit1.not() // Criterion must be false
    var crit6 = crit1.eqv(crit2); // Criterions must return the same value
    var crit7 = crit1.neqv(crit2); // Criterions must return a different value
