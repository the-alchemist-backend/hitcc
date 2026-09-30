// Club object
var club = { name: "HIT Coding Club", founded: 2025 };

// Arrays of objects / arrays
var events = [
  { title: "Intro to HTML & CSS", type: "Workshop", date: "2026-10-10", venue: "Lab 2", info: "Build your first web page from scratch." },
  { title: "JavaScript Bootcamp", type: "Workshop", date: "2026-10-24", venue: "Lab 1", info: "Variables, loops, functions and DOM events." },
  { title: "HIT Hackathon 2026", type: "Competition", date: "2026-11-14", venue: "Main Hall", info: "24-hour team challenge with prizes." },
  { title: "Code & Braai Social", type: "Social", date: "2026-11-28", venue: "Campus Grounds", info: "Meet members and share project ideas." }
];
var committee = [
  ["Chairperson", "Tinashe Moyo", "Software Engineering"],
  ["Vice Chairperson", "Rudo Chikwanha", "Information Systems"],
  ["Secretary", "Tafadzwa Ncube", "Software Engineering"],
  ["Treasurer", "Chipo Dube", "Computer Science"]
];
var photos = [
  ["g1.jpg", "Workshop session"], ["g2.jpg", "Hackathon team"], ["g3.jpg", "Award ceremony"],
  ["g4.jpg", "Code & Braai"], ["g5.jpg", "Lab practice"], ["g6.jpg", "Committee meeting"]
];

function init() {
  if (document.getElementById("next-event")) showNextEvent();
  if (document.getElementById("committee")) showCommittee();
  if (document.getElementById("event-list")) showEvents("All");
  if (document.getElementById("gallery")) showGallery();
}

function showNextEvent() {
  var e = events[0];
  document.getElementById("next-event").innerHTML = "<h3>" + e.title + "</h3><p>" + e.date + " &middot; " + e.venue + "</p><p>" + e.info + "</p>";
}

function showCommittee() {
  var rows = "";
  for (var i = 0; i < committee.length; i++) {
    rows += "<tr><td>" + committee[i][0] + "</td><td>" + committee[i][1] + "</td><td>" + committee[i][2] + "</td></tr>";
  }
  document.getElementById("committee").innerHTML = rows;
}

function showEvents(type) {
  var html = "";
  events.forEach(function (e) {
    if (type === "All" || e.type === type) {
      html += "<div class='card' onclick='toggleMore(this)'><h3>" + e.title + "</h3><p><strong>" + e.type + "</strong> &middot; " + e.date + "</p><p class='more'>" + e.venue + " &mdash; " + e.info + "</p></div>";
    }
  });
  document.getElementById("event-list").innerHTML = html || "<p>No events found.</p>";
}

function toggleMore(card) {
  var m = card.querySelector(".more");
  m.style.display = (m.style.display === "block") ? "none" : "block";
}

function showGallery() {
  var g = document.getElementById("gallery");
  photos.forEach(function (p) {
    var t = document.createElement("div");
    t.className = "tile";
    t.innerHTML = "<img src='images/" + p[0] + "' alt='" + p[1] + "'><span>" + p[1] + "</span>";
    t.querySelector("img").onerror = function () { this.style.display = "none"; };
    t.onmouseover = function () { t.style.outline = "2px solid #22d3ee"; };
    t.onmouseout = function () { t.style.outline = "none"; };
    t.onclick = function () {
      document.getElementById("lb-content").innerHTML = "<img src='images/" + p[0] + "' alt=''><p>" + p[1] + "</p>";
      document.getElementById("lightbox").style.display = "flex";
    };
    g.appendChild(t);
  });
}

function validateForm() {
  var name = document.getElementById("name").value.trim();
  var reg = document.getElementById("reg").value.trim();
  var email = document.getElementById("email").value.trim();
  var msg = document.getElementById("message").value.trim();
  var errors = [];
  if (name.length < 3) errors.push("Enter your full name (at least 3 characters).");
  if (!/^H\d{6}[A-Z]$/i.test(reg)) errors.push("Student ID must look like H250510T.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push("Enter a valid email address.");
  if (msg.length < 10) errors.push("Message must be at least 10 characters.");
  document.getElementById("errors").innerHTML = errors.join("<br>");
  return errors.length === 0;
}
