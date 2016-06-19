function twitch() {
  var table = document.getElementById("list"),
      users = ["ogamingsc2", "freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404"];
  table.innerHTML = "";
  users.forEach(function(user) {
    var streamURL = "https://api.twitch.tv/kraken/streams/" + user + "?callback=?",
		userURL = "https://api.twitch.tv/kraken/users/" + user + "?callback=?",
    	status, username, logo, online, showStatus;

    ///// GET RESULTS
    $.getJSON(streamURL, function(result) {
      /// DONE
      if (result.error) {
        status = "user does not exist";
        online = false;
      } else {
        if (result.stream === null) {
          status = "offline";
          online = false;
        } else {
          status = result.stream.game;
          online = true;
        }
      }
      ///
      $.getJSON(userURL, function(result) {
        username = "<a href=\"https://twitch.tv/" + result.name + "\">" + result.display_name + "</a>";
        if (result.logo === null) {
          logo = "<img src=\"http://www.geektechsquadllc.com/images/team2.jpg\">";
        } else {
          logo = "<img src=\"" + result.logo + "\">";
        }

        var showLogo = document.createElement("div");
        showLogo.setAttribute("id", "showLogo");
        showLogo.innerHTML = logo;

        var showName = document.createElement("div");
        showName.setAttribute("id", "showName");
        showName.innerHTML = username;

        var showStatus = document.createElement("div");
        showStatus.setAttribute("id", "showStatus");
        showStatus.innerHTML = status;

        var entry = document.createElement("div");

        if (online === true) {
          entry.className = "online user";
        } else {
          entry.className = "offline user";
        }

        function showAll(e) {
          entry.appendChild(showLogo);
          entry.appendChild(showName);
          entry.appendChild(showStatus);
          table.appendChild(entry);
        }

        showAll(entry);
        
        var sortOffline = document.getElementById("sortOffline");
        var sortOnline = document.getElementById("sortOnline");
        var sortAll = document.getElementById("sortAll");

        var onlineEntries = Array.from(document.getElementsByClassName("online"));
        var offlineEntries = Array.from(document.getElementsByClassName("offline"));
        var allEntries = Array.from(document.getElementsByClassName("user"));

        sortOffline.addEventListener("click", function() {
          table.innerHTML = "";
          sortAll.className = "sortStatus inactive";
          sortOnline.className = "sortStatus inactive";
          sortOffline.className = "sortStatus active";
          table.setAttribute("id", "listOffline");
          offlineEntries.forEach(function(en) {
            table.appendChild(en);
          });
        });

        sortOnline.addEventListener("click", function() {
          table.innerHTML = "";
          sortAll.className = "sortStatus inactive";
          sortOnline.className = "sortStatus active";
          sortOffline.className = "sortStatus inactive";
          table.setAttribute("id", "listOnline");
          onlineEntries.forEach(function(en) {
          table.appendChild(en);
          });
        });

        sortAll.addEventListener("click", function() {
          table.innerHTML = "";
          sortAll.className = "sortStatus active";
          sortOnline.className = "sortStatus inactive";
          sortOffline.className = "sortStatus inactive";
          table.setAttribute("id", "listAll");
          sortOnline.setAttribute("id", "active");
          allEntries.forEach(function(en) {
            table.appendChild(en);
          });
        });
      });
    });
  });
}
twitch();