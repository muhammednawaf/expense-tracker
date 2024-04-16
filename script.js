document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    let expenses = [];
  
    expenseForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const description = document.getElementById('description').value;
      const amount = parseFloat(document.getElementById('amount').value);
  
      if (description && !isNaN(amount)) {
        const existingExpense = expenses.find(expense => expense.description === description);
        if (existingExpense) {
          editExpense(existingExpense, amount);
        } else {
          addExpense(description, amount);
        }
        expenseForm.reset();
        saveExpenses();
      } else {
        alert('Please enter valid description and amount.');
      }
    });
  
    function addExpense(description, amount) {
      const newExpense = { description, amount };
      expenses.push(newExpense);
      renderExpense(newExpense);
    }
  
    function editExpense(expense, newAmount) {
      expense.amount = newAmount;
      saveExpenses();
      renderExpenses();
    }
  
    function deleteExpense(description) {
      expenses = expenses.filter(expense => expense.description !== description);
      saveExpenses();
      renderExpenses();
    }
  
    function saveExpenses() {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  
    function loadExpenses() {
      expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      renderExpenses();
    }
  
    function renderExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach(renderExpense);
    }
  
    function renderExpense(expense) {
      const li = document.createElement('li');
      li.innerHTML = `
        ${expense.description}: <span>${expense.amount.toFixed(2)}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `;
      expenseList.appendChild(li);
  
      li.querySelector('.edit-btn').addEventListener('click', function () {
        const newAmount = parseFloat(prompt('Enter new amount:', expense.amount.toFixed(2)));
        if (!isNaN(newAmount)) {
          editExpense(expense, newAmount);
        } else {
          alert('Please enter a valid amount.');
        }
      });
  
      li.querySelector('.delete-btn').addEventListener('click', function () {
        deleteExpense(expense.description);
      });
    }
  
    loadExpenses();
  });
  