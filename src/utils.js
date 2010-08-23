


// UTILS

/*
 * Detects if a value is an array
 * 
 * Usage:
 *     $G.isArray([1,2,3]) -> true
 * 
 */

$G.isArray = function(object){
    return !!object && Object.prototype.toString.call(object) == "[object Array]";
}

/*
 * Detects if a value is a DOM node
 * 
 * Usage:
 *     $G.isElement(document.createElement("div")) -> true
 * 
 */

$G.isElement = function(object) {
    return !!object && object.nodeType == 1;
}

/*
 * Merges two objects, uses the values from 'defaults' if the
 * 'original' object lacks this particular property
 * 
 * Usage:
 *     $G.setDefaults({a:1, b:2}, {b:3, c:4}) -> {a:1, b:2, c:4}
 */

$G.setDefaults = function(original, defaults){
    original = original || {};
    for(var i in defaults){
        if(defaults.hasOwnProperty(i) && typeof original[i]=="undefined"){
            original[i] = defaults[i];
        }
    }
    return original;
}