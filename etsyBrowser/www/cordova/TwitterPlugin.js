var Twitter = function(){};

Twitter.prototype.isTwitterAvailable = function(response){
    cordova.exec(response, null, "org.apache.cordova.twitter", "isTwitterAvailable", []);
};

Twitter.prototype.isTwitterSetup = function(response){
    cordova.exec(response, null, "org.apache.cordova.twitter", "isTwitterSetup", []);
};

Twitter.prototype.composeTweet = function(success, failure, tweetText, options){
    options = options || {};
    options.text = tweetText;
    cordova.exec(success, failure, "org.apache.cordova.twitter", "composeTweet", [options]);
};

Twitter.prototype.getPublicTimeline = function(success, failure){
    cordova.exec(success, failure, "org.apache.cordova.twitter", "getPublicTimeline", []);
};

Twitter.prototype.getMentions = function(success, failure){
    cordova.exec(success, failure, "org.apache.cordova.twitter", "getMentions", []);
};

Cordova.addConstructor(function() {
    if(!window.plugins) window.plugins = {};
    window.plugins.twitter = new Twitter();
});

