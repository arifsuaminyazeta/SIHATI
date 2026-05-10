var SESSION_KEY   = "sihati_user";
var SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; 

function sessionSave(email, username) {
  var data = {
    email:     email,
    username:  username,
    loginTime: Date.now()
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

function sessionGet() {
  var raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  var user = JSON.parse(raw);
 
  if (Date.now() - user.loginTime > SESSION_DURATION) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
  return user;
}

function sessionClear() {
  localStorage.removeItem(SESSION_KEY);
}

function isLoggedIn() {
  return sessionGet() !== null;
}

function requireLogin() {
  if (!isLoggedIn()) {
    localStorage.setItem("sihati_redirect", window.location.href);
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function renderNavbar() {
  var authDiv = document.getElementById("nav-auth-area");
  if (!authDiv) return;

  var user = sessionGet();
  if (user) {
    
    authDiv.innerHTML =
      '<div class="nav-user">' +
        '<span class="nav-username">Halo, ' + user.username + '</span>' +
        '<button class="btn btn-outline btn-sm" onclick="doLogout()">Keluar</button>' +
      '</div>';
  } else {
   
    authDiv.innerHTML =
      '<div class="nav-auth">' +
        '<a href="login.html" class="btn btn-outline">Masuk</a>' +
        '<a href="register.html" class="btn btn-solid">Daftar</a>' +
      '</div>';
  }
}

function doLogout() {
  sessionClear();
  showToast("Kamu berhasil keluar.");
  setTimeout(function () {
    window.location.href = "index.html";
  }, 800);
}

function goProtected(url) {
  if (isLoggedIn()) {
    window.location.href = url;
  } else {
    localStorage.setItem("sihati_redirect", url);
    window.location.href = "login.html";
  }
}

function showToast(msg) {
  var toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 2800);
}

function setActiveNav() {
  var page = window.location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll(".nav-link");
  links.forEach(function (link) {
    var href = link.getAttribute("href") || "";
    if (href === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderNavbar();
  setActiveNav();
});
