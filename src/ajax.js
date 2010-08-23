// AJAX

/*
 * Performs an AJAX request
 * 
 * Usage:
 *     var ajax_request = new $G.Ajax.Request("/api/ajax",{
 *         method: "post",
 *         contentType:"application/json; charset=utf-8",
 *         requestHeaders:{
 *             "X-Requested-With": "Guildo",
 *             "X-Come-Work-For-Us": "Call 555-1234-1234"
 *         },
 *         onComplete: function(response){
 *             if(response.status==200){
 *                 alert(response.responseText);
 *             }else{
 *                 alert("an error seems to be occured");
 *             }
 *         }
 *     });
 * 
 *     // abort the request after 5 seconds on inactivity
 *     window.setTimeout(function(){
 *         if(!ajax_equest.finished)
 *             ajax_request.abort();
 *     }, 5*1000);
 * 
 */

$G.Ajax = {
    Request: function(url, options){
        if(typeof url!="string"){
            throw new ReferenceError("Using 'url' with Ajax.Request is mandatory.");
        }

        this.url = url;
        
        this.options = $G.setDefaults(options,{
            asynchronous: true,
            contentType: 'application/x-www-form-urlencoded',
            method:'post',
            postBody:null,
            parameters:'',
            requestHeaders: [],
            onComplete: function(){}
        });
        
        this.request = new XMLHttpRequest();
        this.request.open(this.options.method, url, true);
        this._setHeaders(this.request, this.options.requestHeaders);
        this.request.onreadystatechange = this._onreadystatechange.bind(this);
        this.request.send(this.options.postBody);
        this._started = true;
    }
}

$G.Ajax.Request.prototype.abort = function(){
    if(this._finished)return false;
    this._aborted = true;
    if("abort" in this.request)
        this.request.abort();
    return true;
}

$G.Ajax.Request.prototype._started = false;
$G.Ajax.Request.prototype._aborted = false;
$G.Ajax.Request.prototype._finished = false;

$G.Ajax.Request.prototype._onreadystatechange = function(){
    if(this._aborted)return;
    if (this.request.readyState == 4) {
        this._finished = true;
        
        if(this.request.getResponseHeader("Content-type").match("^application/json")){
            try{
                this.request.responseJSON = JSON.parse(response.responseText);
            }catch(E){this.request.reponseJSON = null;}
        }
        
        this.options.onComplete(this.request);
    }
};
    
$G.Ajax.Request.prototype._setHeaders = function(){
    var i, len, headers = {};

    headers['content-type'] = this.options.contentType+'; Charset=UTF-8';
    
    if(typeof this.options.requestHeaders=="object" && !$G.isArray(this.options.requestHeaders)){
        $G(this.options.requestHeaders).forEach((function(value, name){
            headers[$G(name.toLowerCase()).trim()] = value;
        }).bind(this));
    }else if($G.isArray(this.options.requestHeaders)){
        for(i=0, len=this.options.requestHeaders.length; i<len; i++){
            if(typeof this.options.requestHeaders[i]=="string"){
                headers[$G(this.options.requestHeaders[i].toLowerCase()).trim()] = this.options.requestHeaders[++i];
            }else if($G.isArray(this.options.requestHeaders[i])){
                headers[$G(this.options.requestHeaders[i][0].toLowerCase()).trim()] = this.options.requestHeaders[i][1];
            }
        }
    }
    
    $G(headers).forEach((function(value, name){
        this.request.setRequestHeader(name, value);
    }).bind(this));
}