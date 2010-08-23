// NATIVE

/*
 * Add a bind method to function prototype
 * 
 * Usage:
 *     var context = {
 *         a: 1,
 *         b: 2,
 *         c: function(){
 *             alert(this.a + this.b);
 *         }
 *     },
 *     func = context.c.bind(context);
 *     func(); -> 3 (1+2)
 */

if(!("bind" in function(){})){
    Function.prototype.bind = function(){
        var that = this,
            params = Array.prototype.slice.call(arguments),
            obj = params.shift();
        return function(){
            // event handler has 1 param or window.event
            var evt = arguments.length==1 && arguments[0];
            if(evt && ("cancelBubble" in evt || "stopPropagation" in evt)){
                that.apply(obj, [evt].concat(params));
            }else{
                that.apply(obj, params.concat(Array.prototype.slice.call(arguments)));
            }
        }
    }
}


/**
 * XMLHttpRequest
 **/
if (typeof XMLHttpRequest == "undefined"){
    XMLHttpRequest = function(){
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0");
        }catch(E1){};
        try{
            return new ActiveXObject("Msxml2.XMLHTTP.3.0");
        }catch(E2){};
        try{
            return new ActiveXObject("Msxml2.XMLHTTP");
        }catch(E3){};
        try{
            return new ActiveXObject("Microsoft.XMLHTTP");
        }catch(E4){};
        throw new Error("This browser does not support XMLHttpRequest.");
    }
}