    // DOM Elements
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expensesContainer = document.getElementById('expenses-container');
    const totalAmountElement = document.getElementById('total-amount');
    const summaryTotalElement = document.getElementById('summary-total');
    const summaryCountElement = document.getElementById('summary-count');
    
    // Load expenses from localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    // Format amount to rupees
    function formatAmount(amount) {
        return '₹' + parseFloat(amount).toFixed(2);
    }
    
    // Update the UI with all expenses
    function updateUI() {
        expensesContainer.innerHTML = ''; // Clear previous content
    
        if (expenses.length === 0) {
            const noExpenseMsg = document.createElement('p');
            noExpenseMsg.className = 'no-expenses';
            noExpenseMsg.textContent = 'No expenses added yet.';
            expensesContainer.appendChild(noExpenseMsg);
    
            totalAmountElement.textContent = '₹0.00';
            summaryTotalElement.textContent = '₹0.00';
            summaryCountElement.textContent = '0';
            return;
        }
    
        let totalAmount = 0;
    
        expenses.forEach((expense, index) => {
            totalAmount += parseFloat(expense.amount);
    
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.innerHTML = `
                <span class="expense-name">${expense.name}</span>
                <div>
                    <span class="expense-amount">${formatAmount(expense.amount)}</span>
                    <button class="expense-delete" data-index="${index}">Delete</button>
                </div>
            `;
    
            expensesContainer.appendChild(expenseItem);
        });
    
        totalAmountElement.textContent = formatAmount(totalAmount);
        summaryTotalElement.textContent = formatAmount(totalAmount);
        summaryCountElement.textContent = expenses.length;
    
        // Add event listeners to all delete buttons
        document.querySelectorAll('.expense-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deleteExpense(index);
            });
        });
    }
    
    // Add a new expense
    function addExpense(name, amount) {
        expenses.push({ name, amount: parseFloat(amount) });
        saveExpenses();
        updateUI();
    }
    
    // Delete an expense
    function deleteExpense(index) {
        expenses.splice(index, 1);
        saveExpenses();
        updateUI();
    }
    
    // Save expenses to localStorage
    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
    
    // Handle form submission
    expenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());
    
        if (name === '' || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid expense name and amount.');
            return;
        }
    
        addExpense(name, amount);
    
        // Reset form
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    });
    
    // Initialize
    updateUI();