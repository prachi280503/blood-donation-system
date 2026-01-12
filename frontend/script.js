const BASE_URL = "http://localhost:5000/api";

// LOGIN FUNCTION
function login() {
    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Login Successful");
            window.location.href = "search.html";
        } else {
            alert("Login Failed");
        }
    });
}

// SEARCH DONOR FUNCTION
function search() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    fetch(`${BASE_URL}/donors/search/${document.getElementById("searchGroup").value}`, {
        headers: {
            "Authorization": token
        }
    })
    .then(res => res.json())
    .then(data => {
        const result = document.getElementById("result");
        result.innerHTML = data.map(d =>
            `<p><b>${d.name}</b> | ${d.phone} | ${d.city}</p>`
        ).join("");
    });
}

// LOGOUT
function logout() {
    localStorage.removeItem("token");
    alert("Logged out");
    window.location.href = "login.html";
}
