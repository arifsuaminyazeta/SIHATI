function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if(user){
        alert("Login berhasil");
        window.location.href = "../views/index.html";
    } else {
        alert("Email atau password salah");
    }
}

function register() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email === "" || password === ""){
        alert("Semua field wajib diisi");
        return;
    }

    users.push({
        email: email,
        password: password
    });

    alert("Register berhasil");
}
