let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

function applyFilter() {
  let status = document.getElementById("statusFilter").value;
  let search = document.getElementById("searchBar").value.toLowerCase();

  let list = document.getElementById("adminComplaintList");
  list.innerHTML = "";

  complaints
    .filter(c => (status === "All" || c.status === status))
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

applyFilter();
