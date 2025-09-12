let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

document.getElementById("complaintForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let complaint = {
    id: Date.now(),
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    status: "Pending",
    createdAt: new Date().toLocaleString() // timestamp
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

displayComplaints();
