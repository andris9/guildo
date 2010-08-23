


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