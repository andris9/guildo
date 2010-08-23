


$G = typeof $G!="undefined"?$G:function(value){
    return new $G.extended(value);
};


$G.extended = function(value){this.value=value;}
