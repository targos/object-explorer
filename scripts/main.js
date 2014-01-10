require(["explorer/explorer", "jquery/jquery"], function(OE) {
    var explorer = new OE();

        var defs = [
            explorer.addCriterion("number", "val1", {comparator: "<", ref: 5}),
            explorer.addCriterion("number", "val2", {comparator: ">", ref: 12}),
            explorer.addCriterion("number", "val3.toto", {comparator: "=", ref: 100, canMiss: true}),
            explorer.addCriterion("string", "val4", {comparator: "contains", ignoreCase: true, canMiss: true, ref: "CHOU"}),
            explorer.addCriterion("string", "val5", {comparator: "contains", ignoreCase: false, canMiss: true, ref: "BOUT"})
        ];
        
        var data = [
            {val1: 1, val2: 15, val3: {toto: 100}},
            {val1: 1, val2: 15, val3: {toto: 10}},
            {val1: 1, val2: 14, val3: {toto: 100}},
            {val1: 1, val2: 11, val3: {toto: 100}},
            {val1: 6, val2: 13},
            {val1: 3, val2: 13},
            {val1: 3, val2: 13, val4: "J'aime les choux", val5: "Je te touche le bout"},
            {val1: 3, val2: 13, val4: "J'aime les choux", val5: "Je te touche le BOUT"}
        ];
        
     $.when.apply($, defs).then( function() {
             
            console.log(explorer.filter(data));
     } );
  //  setTimeout(function(){console.log(explorer.filter(data))},500);

});

/**
 * 
 * var OE = new OE();
 * 
 * 
 */