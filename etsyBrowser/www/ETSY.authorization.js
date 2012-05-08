function locChanged(loc) {
  console.log('in locChanged');
    // The supplied oauth_callback_url for this session is being loaded
    if (loc.indexOf("http://www.etsy.com/?") >= 0 && !GLOBAL.signed_in_flag) {
        completeAuthorization(loc);
        GLOBAL.signed_in_flag = true;
    }
}

function completeAuthorization(loc) {
  console.log("GLOBAL.signed_in_flag: " + GLOBAL.signed_in_flag);
  if(GLOBAL.signed_in_flag){
    return false;
  }
    window.plugins.childBrowser.close();
    var mask = Ext.Viewport.add({
        masked: {
            xtype: 'loadmask',
            message: 'Getting User Info',
            zIndex: 10000,
        }
    });
    mask.show();

    console.log('in completeAuthorization\n\n\n\n\n\n\n\n');
    var index,
    verifier = '';
    var params = loc.substr(loc.indexOf('?') + 1);
    var parsedParams = $.deparam(params);
    // console.log('params are', parsedParams);
    var oauth;
    var options = {
        consumerKey: 'tia49fh9iqjcrukurpbyqtv5',
        consumerSecret: '2dvoqadnxo',
        accessTokenKey: parsedParams.oauth_token,
        accessTokenSecret: GLOBAL.params.oauth_token_secret
    };

    oauth = OAuth(options);
    oauth.setAccessToken([parsedParams.oauth_token, GLOBAL.params.oauth_token_secret]);

    verifier = parsedParams.oauth_verifier;
    console.log('error');
    // Exchange request token for access token
    var url = 'http://openapi.etsy.com/v2/oauth/access_token?oauth_verifier=' + verifier;
    console.log('verifier'+ verifier);
    oauth.get(url,
            function(data) {
                  console.log('error 2');
                window.accessParams = accessParams = {};
                var qvars_tmp = data.text.split('&');
                for (var i = 0; i < qvars_tmp.length; i++) {
                    var y = qvars_tmp[i].split('=');
                    accessParams[y[0]] = decodeURIComponent(y[1]);
                }
        
                    console.log('error 3');
                // Save access token/key in localStorage
                localStorage['accessTokenKey'] = accessParams.oauth_token;
                localStorage['accessTokenSecret'] = accessParams.oauth_token_secret;
        
                // cordova.exec("ChildBrowserCommand.close");
                oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                    console.log('error4');
                oauth.get('http://openapi.etsy.com/v2/users/__SELF__?includes=Profile',
                function(data) {
                    console.log('inside the oauth');
                    window.info = JSON.parse(data.text);
                    if (info.results[0].Profile.first_name) {
                        name = info.results[0].Profile.first_name + " " + info.results[0].Profile.last_name;
                    } else {
                        name = info.results[0].login_name;
                    }
        
                    localStorage.setItem('name', name);
                    if (info.results[0].Profile.image_url_75x75) {
                        localStorage.setItem('avatar', info.results[0].Profile.image_url_75x75);
                    }
        
                    ETSY.toggleSignIn();
                    ETSY.alert('You have successfully signed in,\n' + name + '!', 'Welcome');
                    mask.destroy();
                    
                },
                function(data) {
                  ETSY.alert('There was an error connecting with Etsy, please try again later!', 'Error');
                });
        
            },
            function(data) {
              ETSY.alert('There was an error connecting with Etsy, please try again later!', 'Error');
              });
}