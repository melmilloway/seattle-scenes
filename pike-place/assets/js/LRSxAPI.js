var email = generateEmail();

function generateEmail() {
  var num = Math.floor(Math.random() * 5000) + 1;
  var str = 'tester' + num + '@test.com';

  return str;
}

// xAPI Launcher
function launchXAPICourse() {
  console.log('Something');
  var auth = 'Basic YWU0MjU0ZjJjZWNkMDljYmQ0NGQyOTc3NTYzZDVlYTUyZGU0YjY0OTJkODk1ZGRlOmFlNmRmOTI2ODNmNmI2MzBjNzRiY2U2YWRmOWNlYWMzZTE2MzMzODBjYjc0NmRjYTllM2EzNmJkMmRkMmI5NTY=';
  var launchUrl = './seattle-vr.html'; // Location of the file.

  launchUrl += '?endpoint=https://trial-lrs.yetanalytics.io/xapi';
  launchUrl += '&auth=' + auth;
  // launchUrl += '&actor=' + JSON.stringify({"mbox": ["mailto:" + email]});
  launchUrl += '&activity_id=http://virtual-reality-seattle.com/'; 

  window.location = encodeURI(launchUrl);
}
    