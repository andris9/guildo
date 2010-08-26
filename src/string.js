


// STRING
/*
 * Trims whitespaces from the beginning and the end of a string
 * 
 * Usage:
 *     $G("  this is a string ").trim() -> "this is a string"
 * 
 */ 

$G.extended.prototype.trim = function(){
    if(typeof this.value=="string")
        return this.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    else
        return false;
}

/*
 * Converts a hyphenized string into camel case
 *
 * Usage:
 *     $G("background-color").toCamelCase() -> backgroundColor
 *
 */

$G.extended.prototype.toCamelCase = function(){
    if(!this.value)
        return false;
    return (typeof this.value=="string" && this.value || String(this.value)).
        replace(/\-(.)/g,function(a,b){return b.toUpperCase()});
}