$(document).ready(function() {
  // Popup Email
  var email;

  $('.popup__skip, .popup__submit').on('click', function() {
    $('.popup').fadeOut();
  });

  $('.popup__skip').on('click', function() {
    email = generateEmail();
    xapistatement('experienced','http://virtual-reality-seattle.com/water-front/landing','what it is like','in Waterfront');
  });

  $('.popup__submit').on('click', function() {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var input = $('.popup__input').val();

    email = regex.test(input) ? input : generateEmail();
    xapistatement('experienced','http://virtual-reality-seattle.com/water-front/landing','what it is like','in Waterfront');
  });

  function generateEmail() {
    var num = Math.floor(Math.random() * 5000) + 1;
    var str = 'tester' + num + '@test.com';

    return str;
  }

  // A-Frame
  var scene = document.querySelector('a-scene');
  var fuse = document.querySelector('#fuse-cursor');
  var fuseProgress = document.querySelector('#fuse-progress');

  var tipOneVisited = false;
  var tipTwoVisited = false;
  var tipThreeVisited = false;

  var factCount = 0;
  $('#facts').html(factCount);

  scene.addEventListener('loaded', function() {
    $('#preloader').hide();
  });

  fuse.addEventListener('fusing', function() {
    fuseProgress.emit('fusing');
  });

  $('#tip-1').on('click', function() {
    document.querySelector('#tip-1-text').emit('trigger-clicked');
    document.querySelector('#tip-1-background').emit('trigger-clicked');

    if (!tipOneVisited) {
      factCount++;
      $('#facts').html(factCount);

     xapistatement('viewed','http://virtual-reality-seattle.com/water-front/1','fact 1','in Waterfront');

      tipOneVisited = true;
    }
  });
  
  $('#tip-2').on('click', function() {
    document.querySelector('#tip-2-text').emit('trigger-clicked');
    document.querySelector('#tip-2-background').emit('trigger-clicked');

    if (!tipTwoVisited) {
      factCount++;
      $('#facts').html(factCount);

      xapistatement('viewed','http://virtual-reality-seattle.com/water-front/2','fact 2','in Waterfront');

      tipTwoVisited = true;
    }
  });

  $('#tip-3').on('click', function() {
    document.querySelector('#tip-3-text').emit('trigger-clicked');
    document.querySelector('#tip-3-background').emit('trigger-clicked');

    if (!tipThreeVisited) {
      factCount++;
      $('#facts').html(factCount);

      xapistatement('viewed','http://virtual-reality-seattle.com/water-front/3','fact 3','in Waterfront');

      tipThreeVisited = true;
    }
  });

  // xAPI Statements
  function xapistatement(verb,activityid,shortdesc,longdesc) { 
    var stmt= {
      "object": {
        "id": activityid,
        "objectType": "Activity",
        "definition": {
          "name": {
            "en-US": shortdesc
          },
          "description": {
            "en-US": longdesc
          }
        }
      }
    };
      
    stmt.verb=ADL.verbs[verb];

    stmt.actor = {'mbox': 'mailto:' + email}; 
    var randomString = generateUUID();
    var request = new XMLHttpRequest();
    request.open('PUT', "https://trial-lrs.yetanalytics.io/xapi/statements?statementId="+randomString);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('X-Experience-API-Version','1.0.0');
    request.setRequestHeader('Authorization',"Basic OTVkNWI4ZjNmNjhkYzQ5NjM3MmNjYjNhNTYzNGQxYjkxMDY2MzkwYmE5YmViOWU5OjFlODQzZjRjNWU5N2VjOWNiYjNlNjI5ZTlkMDk3NzUzZTY4NDQxYjQ4NTU5YTEwMzNmYjFiNjdiZTVjYmY1MGM=");
    var body = stmt;
    request.send(JSON.stringify(body));     
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  }

  function generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); // Use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d / 16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }
});

(function(ADL){
  ADL.verbs = {
    "abandoned" : {
       "id" : "https://w3id.org/xapi/adl/verbs/abandoned",
       "display" : {"en-US" : "abandoned"}
    },
    "answered" : {
       "id" : "http://adlnet.gov/expapi/verbs/answered",
       "display" : {"de-DE" : "beantwortete",
                    "en-US" : "answered",
                    "fr-FR" : "a répondu",
                    "es-ES" : "contestó"}
    },
    "asked" : {
       "id" : "http://adlnet.gov/expapi/verbs/asked",
       "display" : {"de-DE" : "fragte",
                    "en-US" : "asked",
                    "fr-FR" : "a demandé",
                    "es-ES" : "preguntó"}
    },
    "attempted" : {
       "id" : "http://adlnet.gov/expapi/verbs/attempted",
       "display" : {"de-DE" : "versuchte",
                    "en-US" : "attempted",
                    "fr-FR" : "a essayé",
                    "es-ES" : "intentó"}
    },
    "attended" : {
       "id" : "http://adlnet.gov/expapi/verbs/attended",
       "display" : {"de-DE" : "nahm teil an",
                    "en-US" : "attended",
                    "fr-FR" : "a suivi",
                    "es-ES" : "asistió"}
    },
    "commented" : {
       "id" : "http://adlnet.gov/expapi/verbs/commented",
       "display" : {"de-DE" : "kommentierte",
                    "en-US" : "commented",
                    "fr-FR" : "a commenté",
                    "es-ES" : "comentó"}
    },
    "completed" : {
       "id" : "http://adlnet.gov/expapi/verbs/completed",
       "display" : {"de-DE" : "beendete",
                    "en-US" : "completed",
                    "fr-FR" : "a terminé",
                    "es-ES" : "completó"}
    },
    "exited" : {
       "id" : "http://adlnet.gov/expapi/verbs/exited",
       "display" : {"de-DE" : "verließ",
                    "en-US" : "exited",
                    "fr-FR" : "a quitté",
                    "es-ES" : "salió"}
    },
    "experienced" : {
       "id" : "http://adlnet.gov/expapi/verbs/experienced",
       "display" : {"de-DE" : "erlebte",
                    "en-US" : "experienced",
                    "fr-FR" : "a éprouvé",
                    "es-ES" : "experimentó"}
    },
    "failed" : {
       "id" : "http://adlnet.gov/expapi/verbs/failed",
       "display" : {"de-DE" : "verfehlte",
                    "en-US" : "failed",
                    "fr-FR" : "a échoué",
                    "es-ES" : "fracasó"}
    },
    "imported" : {
       "id" : "http://adlnet.gov/expapi/verbs/imported",
       "display" : {"de-DE" : "importierte",
                    "en-US" : "imported",
                    "fr-FR" : "a importé",
                    "es-ES" : "importó"}
    },
    "initialized" : {
       "id" : "http://adlnet.gov/expapi/verbs/initialized",
       "display" : {"de-DE" : "initialisierte",
                    "en-US" : "initialized",
                    "fr-FR" : "a initialisé",
                    "es-ES" : "inicializó"}
    },
    "interacted" : {
       "id" : "http://adlnet.gov/expapi/verbs/interacted",
       "display" : {"de-DE" : "interagierte",
                    "en-US" : "interacted",
                    "fr-FR" : "a interagi",
                    "es-ES" : "interactuó"}
    },
    "launched" : {
       "id" : "http://adlnet.gov/expapi/verbs/launched",
       "display" : {"de-DE" : "startete",
                    "en-US" : "launched",
                    "fr-FR" : "a lancé",
                    "es-ES" : "lanzó"}
    },
    "mastered" : {
       "id" : "http://adlnet.gov/expapi/verbs/mastered",
       "display" : {"de-DE" : "meisterte",
                    "en-US" : "mastered",
                    "fr-FR" : "a maîtrisé",
                    "es-ES" : "dominó"}
    },
    "passed" : {
       "id" : "http://adlnet.gov/expapi/verbs/passed",
       "display" : {"de-DE" : "bestand",
                    "en-US" : "passed",
                    "fr-FR" : "a réussi",
                    "es-ES" : "aprobó"}
    },
    "preferred" : {
       "id" : "http://adlnet.gov/expapi/verbs/preferred",
       "display" : {"de-DE" : "bevorzugte",
                    "en-US" : "preferred",
                    "fr-FR" : "a préféré",
                    "es-ES" : "prefirió"}
    },
    "progressed" : {
       "id" : "http://adlnet.gov/expapi/verbs/progressed",
       "display" : {"de-DE" : "machte Fortschritt mit",
                    "en-US" : "progressed",
                    "fr-FR" : "a progressé",
                    "es-ES" : "progresó"}
    },
    "registered" : {
       "id" : "http://adlnet.gov/expapi/verbs/registered",
       "display" : {"de-DE" : "registrierte",
                    "en-US" : "registered",
                    "fr-FR" : "a enregistré",
                    "es-ES" : "registró"}
    },
    "responded" : {
       "id" : "http://adlnet.gov/expapi/verbs/responded",
       "display" : {"de-DE" : "reagierte",
                    "en-US" : "responded",
                    "fr-FR" : "a répondu",
                    "es-ES" : "respondió"}
    },
    "resumed" : {
       "id" : "http://adlnet.gov/expapi/verbs/resumed",
       "display" : {"de-DE" : "setzte fort",
                    "en-US" : "resumed",
                    "fr-FR" : "a repris",
                    "es-ES" : "continuó"}
    },
    "satisfied" : {
       "id" : "https://w3id.org/xapi/adl/verbs/satisfied",
       "display" : {"en-US" : "satisfied"}
    },
    "scored" : {
       "id" : "http://adlnet.gov/expapi/verbs/scored",
       "display" : {"de-DE" : "erreichte",
                    "en-US" : "scored",
                    "fr-FR" : "a marqué",
                    "es-ES" : "anotó"}
    },
    "shared" : {
       "id" : "http://adlnet.gov/expapi/verbs/shared",
       "display" : {"de-DE" : "teilte",
                    "en-US" : "shared",
                    "fr-FR" : "a partagé",
                    "es-ES" : "compartió"}
    },
    "suspended" : {
       "id" : "http://adlnet.gov/expapi/verbs/suspended",
       "display" : {"de-DE" : "pausierte",
                    "en-US" : "suspended",
                    "fr-FR" : "a suspendu",
                    "es-ES" : "aplazó"}
    },
    "terminated" : {
       "id" : "http://adlnet.gov/expapi/verbs/terminated",
       "display" : {"de-DE" : "beendete",
                    "en-US" : "terminated",
                    "fr-FR" : "a terminé",
                    "es-ES" : "terminó"}
    },
    "viewed" : {
       "id" : "http://adlnet.gov/expapi/verbs/viewed",
       "display" : {"en-US" : "viewed"}
    },
    "voided" : {
       "id" : "http://adlnet.gov/expapi/verbs/voided",
       "display" : {"de-DE" : "entwertete",
                    "en-US" : "voided",
                    "fr-FR" : "a annulé",
                    "es-ES" : "anuló"}
    },
    "waived" : {
       "id" : "https://w3id.org/xapi/adl/verbs/waived",
       "display" : {"en-US" : "waived"}
    }
  };
}(window.ADL = window.ADL || {}));
