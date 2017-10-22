var email = generateEmail();

function generateEmail() {
  var num = Math.floor(Math.random() * 5000) + 1;
  var str = 'tester' + num + '@test.com';

  return str;
}

// xAPI Launcher
function launchXAPICourse() {
  console.log('Something');
  var auth = 'Basic OTVkNWI4ZjNmNjhkYzQ5NjM3MmNjYjNhNTYzNGQxYjkxMDY2MzkwYmE5YmViOWU5OjFlODQzZjRjNWU5N2VjOWNiYjNlNjI5ZTlkMDk3NzUzZTY4NDQxYjQ4NTU5YTEwMzNmYjFiNjdiZTVjYmY1MGM=';
  var launchUrl = './seattle-vr.html'; // Location of the file.

  launchUrl += '?endpoint=https://trial-lrs.yetanalytics.io/xapi';
  launchUrl += '&auth=' + auth;
  // launchUrl += '&actor=' + JSON.stringify({"mbox": ["mailto:" + email]});
  launchUrl += '&activity_id=http://virtual-reality-seattle.com/'; 

  window.location = encodeURI(launchUrl);
}
    