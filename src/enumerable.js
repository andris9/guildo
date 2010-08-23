

// ENUMERABLE

/*
 * Enumerates all members of an array or object properties
 * 
 * Usage: 
 *     $G([1,2,3,4,5]).forEach(function(value, index){
 *         alert(index+': '+value);
 *     }); 
 */

$G.extended.prototype.forEach = function(callback){
    var i, len;

    if(typeof callback!="function" || !this.value)
        return this;

    if($G.isArray(this.value)){
        for(i=0, len=this.value.length; i<len; i++){
            if(callback(this.value[i], i)===false)
                break;
        }
    }else if(typeof this.value=="object"){
        for(i in this.value){
            if(this.value.hasOwnProperty(i)){
                if(callback(this.value[i], i)===false)
                    break;
            }
        }
    }
    return this;
}

/*
 * Finds all members from an array that meet the conditions
 * 
 * Usage: 
 *     result = $G([1,2,3,4,5]).findAll(function(value, index){
 *         return value>3;
 *     }); -> [4,5]
 */

$G.extended.prototype.findAll = function(callback, justFirst){
    if(typeof callback!="function" || !$G.isArray(this.value))
        return false;
    
    var ret = !justFirst?[]:undefined;
    this.forEach(function(value, i){
        if(callback(value,i)){
            if(justFirst){
                ret = value;
                return false;
            }else
                ret.push(value);
        }
    });

    return ret;
}

/*
 * Finds the first member from the array that meets the conditions
 * 
 * Usage: 
 *     $G([1,2,3,4,5]).find(function(value, index){
 *         return value>2;
 *     }); -> 3
 */

$G.extended.prototype.find = function(callback){
    return this.findAll(callback, true);
}

/*
 * Enumerates all array members and chages their values
 * 
 * Usage:
 *     $G([1,2,3,4,5]).map(function(value, index){
 *         return value*value;
 *     }); -> [1,4,9,16,25]
 * 
 */

$G.extended.prototype.map = function(callback /*, thisp*/){
    if(typeof callback!="function" || !$G.isArray(this.value))
        return false;
        
    var len = this.value.length >>> 0,
        res = new Array(len),
        thisp = arguments[1],
        i;

    for (i = 0; i < len; i++){
        if (i in this.value){
            if(thisp)
                res[i] = callback.call(thisp, this.value[i], i, this.value);
            else
                res[i] = callback(this.value[i], i, this.value);
        }
    }
    return res;
}

/*
 * Reduces an array
 * 
 * Usage:
 *     $([1,2,3,4,5]).reduce(function(current, total){
 *         return total+current;
 *     }); -> 15 ((((1+2)+3)+4)+5)
 * 
 */

$G.extended.prototype.reduce = function(callback /*, initial*/){
    if(typeof callback!="function" || !$G.isArray(this.value))
        return false;
        
    var len = this.value.length >>> 0, i=0, rv;

    if (len == 0 && arguments.length == 1){
        return false;
    }

    if (arguments.length >= 2){
        rv = arguments[1];
    }else{
        do{
            if (i in this.value){
                rv = this.value[i++];
                break;
            }
            if (++i >= len){
                return false;
            }
        }while(true);
    }

    for (; i < len; i++){
        if (i in this.value){
            rv = callback(rv, this.value[i], i, this.value);
        }
    }
    return rv;
};