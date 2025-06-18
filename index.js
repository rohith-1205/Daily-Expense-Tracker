var transactions = JSON.parse(localStorage.getItem("transactions")) || [];

var form = document.getElementById("transactionform");
var list = document.getElementById("transactionlist");
var totalIncome = document.getElementById("totalincome");
var totalExpenses = document.getElementById("totalexpenses");
var netBalance = document.getElementById("netbalance");
var errorMsg = document.getElementById("errormsg");

function updateUI() {
  list.innerHTML = "";
  var income = 0;
  var expenses = 0;

  for (var i = 0; i < transactions.length; i++) {
    var tx = transactions[i];

    var li = document.createElement("li");
    li.className = "transaction-item " + tx.type.toLowerCase();

    li.innerHTML =
      "<span><strong>" + tx.description + "</strong><br/>₹" +
      tx.amount + " - " + tx.category + " (" + tx.date + ")</span>" +
      "<button class='delete-btn' onclick='deleteTransaction(" + i + ")'>Delete</button>";

    list.appendChild(li);

    if (tx.type === "Income") {
      income += tx.amount;
    } else {
      expenses += tx.amount;
    }
  }

  totalIncome.textContent = income;
  totalExpenses.textContent = expenses;
  netBalance.textContent = income - expenses;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.onsubmit = function (e) {
  e.preventDefault();
  errorMsg.textContent = "";

  var date = document.getElementById("date").value;
  var description = document.getElementById("description").value.trim();
  var category = document.getElementById("category").value;
  var amount = parseFloat(document.getElementById("amount").value);
  var type = document.getElementById("type").value;

  if (!date || !description || !category || isNaN(amount) || amount <= 0 || !type) {
    errorMsg.textContent = "Please enter valid data in all fields.";
    return;
  }

  var transaction = {
    date: date,
    description: description,
    category: category,
    amount: amount,
    type: type
  };

  transactions.push(transaction);
  form.reset();
  updateUI();
};

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

window.onload = updateUI;
