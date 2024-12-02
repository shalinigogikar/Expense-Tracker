document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const descriptionInput = document.getElementById('description');
    const categoryInput = document.getElementById('category');
    const addExpenseButton = document.getElementById('addExpense');
    const expenseList = document.getElementById('expenseList');
    
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    

        const renderExpenses = () => {
            expenseList.innerHTML = '';
            expenses.forEach((expense, index) => {
              const div = document.createElement('div');
              div.className = 'expense-item';
              div.innerHTML = `
                 ${expense.amount}-
                 ${expense.description}-
                 ${expense.category} 
                  <button onclick="editExpense(${index})">Edit Expenses</button>
                  <button onclick="deleteExpense(${index})">Delete Expenses</button>
              `;
              expenseList.appendChild(div);
            });
    };
    
    window.editExpense = (index) => {
      const expense = expenses[index];
      amountInput.value = expense.amount;
      descriptionInput.value = expense.description;
      categoryInput.value = expense.category;
      
      addExpenseButton.textContent = 'Update Expense';
      
      addExpenseButton.onclick = () => {
        expenses[index] = {
          amount: amountInput.value,
          description: descriptionInput.value,
          category: categoryInput.value,
        };
        localStorage.setItem('expenses', JSON.stringify(expenses));
        resetForm();
        renderExpenses();
      };
    };
    
    window.deleteExpense = (index) => {
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses();
    };
    
    const resetForm = () => {
      amountInput.value = '';
      descriptionInput.value = '';
      categoryInput.value = 'Food';
      addExpenseButton.textContent = 'Add Expense';
      addExpenseButton.onclick = addExpense;
    };
    
    const addExpense = () => {
      const expense = {
        amount: amountInput.value,
        description: descriptionInput.value,
        category: categoryInput.value
      };
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      resetForm();
      renderExpenses();
    };
    
    addExpenseButton.onclick = addExpense;
    
    renderExpenses();
  });
  