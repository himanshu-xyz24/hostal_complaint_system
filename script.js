// Common data
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

// Views
const loginView = document.getElementById("loginView");
const studentView = document.getElementById("studentView");
const adminView = document.getElementById("adminView");

// --- LOGIN ---
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let role = document.getElementById("role").value;
  login(role);
});

function login(role) {
  loginView.style.display = "none";
  if (role === "student") {
    studentView.style.display = "block";
    displayComplaints();
  } else {
    adminView.style.display = "block";
    applyFilter();
  }
}

function logout() {
  studentView.style.display = "none";
  adminView.style.display = "none";
  loginView.style.display = "block";
}

// --- STUDENT DASHBOARD ---
document.getElementById("complaintForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let complaint = {
    id: Date.now(),
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    status: "Pending",
    createdAt: new Date().toLocaleString()
  };
  complaints.push(complaint);
  localStorage.setItem("complaints", JSON.stringify(complaints));
  displayComplaints();
  this.reset();
});

function displayComplaints() {
  let list = document.getElementById("complaintList");
  list.innerHTML = "";
  complaints.forEach(c => {
    let li = document.createElement("li");
    let statusClass = c.status === "Pending" ? "status-pending" :
                      c.status === "In Progress" ? "status-progress" : "status-resolved";
    li.innerHTML = `
      <strong>${c.title}</strong> (${c.category})<br>
      <span class="${statusClass}">Status: ${c.status}</span><br>
      <small>${c.description}</small><br>
      <em>Submitted on: ${c.createdAt}</em>
    `;
    list.appendChild(li);
  });
}

// --- ADMIN DASHBOARD ---
function applyFilter() {
  let status = document.getElementById("statusFilter").value;
  let search = document.getElementById("searchBar").value.toLowerCase();
  let list = document.getElementById("adminComplaintList");
  list.innerHTML = "";

  complaints
    .filter(c => status === "All" || c.status === status)
    .filter(c => c.title.toLowerCase().includes(search))
    .forEach((c, index) => {
      let li = document.createElement("li");
      li.innerHTML = `
        <strong>${c.title}</strong> (${c.category})<br>
        <small>${c.description}</small><br>
        <span>Status: <b>${c.status}</b></span><br>
        <em>Submitted on: ${c.createdAt}</em><br><br>
        <button onclick="updateStatus(${index}, 'In Progress')">In Progress</button>
        <button onclick="updateStatus(${index}, 'Resolved')">Resolved</button>
      `;
      list.appendChild(li);
    });
}

function updateStatus(index, newStatus) {
  complaints[index].status = newStatus;
  localStorage.setItem("complaints", JSON.stringify(complaints));
  applyFilter();
}

