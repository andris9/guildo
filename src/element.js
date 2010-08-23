


// ELEMENT

/*
 * Performs a DOM query based on a selector (depends on Sizzle)
 * 
 * Usage:
 *     $G(document.body).querySelectorAll("h1") -> [all h1 elements]
 * 
 */

$G.extended.prototype.querySelectorAll = function(selector){
    if(!$G.isElement(this.value) || !window.Sizzle || typeof selector!="string")
        return false;
    return Sizzle(selector, this.value);
}

/*
 * Adds an event listener to a DOM element
 * 
 * Usage:
 *     $G(document.body).addEventListener("click", function(event){
 *         alert("clicked document body!");
 *     });
 * 
 */

$G.extended.prototype.addEventListener = function(evt, callback /*, useCapture*/){
    if(!$G.isElement(this.value))
        return this;

    if ("addEventListener" in this.value){
        this.value.addEventListener(evt, callback, false); 
    } else if ("attachEvent" in this.value){
        this.value.attachEvent('on'+evt, callback);
    }
    // skip DOM level 0 events
    
    return this;
}

/*
 * Removes a previously set event listener from a DOM element
 * 
 * Usage:
 *     $G(document.body).removeEventListener("click", eventlistener);
 * 
 */
$G.extended.prototype.removeEventListener = function(evt, callback /*, useCapture*/){
    if(!$G.isElement(this.value))
        return this;

    if ("removeEventListener" in this.value){
        this.value.removeEventListener(evt, callback, false); 
    } else if ("detachEvent" in this.value){
        this.value.detachEvent('on'+evt, callback);
    }
    // skip DOM level 0 events
    
    return this;    
}
