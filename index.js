// helper functions
const qs = (selector) => document.querySelector(selector);

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
// DOM elements
const addIncomeDOM = qs("#add-income");
const incomeList = qs("#incomeList");
const addOutcomeDOM = qs("#add-outcome");
const outcomeList = qs("#outcomeList");

// Data(model)
let incomes = [{ id: uuid(), name: "test income", amount: 4, isEdited: false }];

let outcomes = [{ id: uuid(), name: "test outcome", amount: 5, isEdited: false }];

//Update
//dodawanie nowego przychodu
const addNewIncome = (oldIncomes, newIncome) => {
  return [...oldIncomes, newIncome];
};
//dodawanie nowego wydatku
const addNewOutcome = (oldOutcomes, newOutcome) => {
  return [...oldOutcomes, newOutcome];
};

//usuwanie przychodu
const deleteIncome = (oldIncomes, deleteId) => {
  return oldIncomes.filter(({id}) => id !== deleteId);
};

//usuwanie wydatku
const deleteOutcome = (oldOutcomes, deleteId) => {
  return oldOutcomes.filter(({id}) => id !== deleteId);
};

// zmiana informacji czy przychód jest/był edytowany
const toggleIsEditedIncome = (oldIncomes, incomeId) => {
  return oldIncomes.map((income) => {
    return income.id === incomeId
    ? {...income, isEdited: !income.isEdited}
    : income;
  });
};

// zmiana informacji czy wydatek jest/był edytowany
const toggleIsEditedOutcome = (oldOutcomes, outcomeId) => {
  return oldOutcomes.map((outcome) => {
    return outcome.id === outcomeId
    ? {...outcome, isEdited: !outcome.isEdited}
    : outcome;
  });
};
// nadawanie nazwy przychodu
const setIncomeName = (oldIncome,incomeId,newName) =>{
return oldIncome.map((income) => {
  return income.id === incomeId
  ? {...income, name:newName}
  : income;
});
};

// nadawanie nazwy wydatku
const setOutcomeName = (oldOutcome,outcomeId,newName) =>{
  return oldOutcome.map((outcome) => {
    return outcome.id === outcomeId
    ? {...outcome, name:newName}
    : outcome;
  });
  };
// nadawanie wartosci przychodu
const setIncomeAmount =(oldIncome, incomeId, newAmount) => {
  return oldIncome.map((income) => {
    return income.id ===incomeId
    ? {...income, amount: newAmount}
    :income;
  });
};

// nadawanie wartosci wydatku
const setOutcomeAmount =(oldOutcome, outcomeId, newAmount) => {
  return oldOutcome.map((outcome) => {
    return outcome.id ===outcomeId
    ? {...outcome, amount: newAmount}
    :outcome;
  });
};


// View income
const renderIncomes = () => {
  incomeList.innerHTML = ""; //reset listy przychodów

  incomes.forEach((income) => {
    const incomeDOM = document.createElement("li");
    if(income.isEdited) {
      const editFormDOM = document.createElement("form");
      const editFormNameInputDOM = document.createElement("input");
      editFormNameInputDOM.setAttribute("name", "name");
      editFormNameInputDOM.setAttribute("class", "name");
      editFormNameInputDOM.setAttribute("value", income.name);
      editFormDOM.append(editFormNameInputDOM);

      const editFormAmountInputDOM = document.createElement("input");
      editFormAmountInputDOM.setAttribute("name", "amount")
      editFormAmountInputDOM.setAttribute("class", "amount")
      editFormAmountInputDOM.setAttribute("value", income.amount);
      editFormDOM.append(editFormAmountInputDOM);
      incomeDOM.append(editFormDOM);

      //obsługa buttona edit
      editFormDOM.addEventListener("submit" , (e) => {
        e.preventDefault();

        const {name} = e.currentTarget.elements;
        const newName = name.value;

        const {amount} = e.currentTarget.elements;
        const newAmount = amount.value;

        let newIncomesName = setIncomeName(incomes,income.id, newName);
        incomes = toggleIsEditedIncome(newIncomesName, income.id);

        let newIncomesAmount = setIncomeAmount(incomes, income.id, newAmount);
        incomes = toggleIsEditedIncome(newIncomesAmount, income.id);
        
        renderIncomes();
        
        
      });

    } else{
      incomeDOM.textContent = `${income.name}  ${income.amount} zł`;
    }
    //delete button
    const deleteBtnDOM = document.createElement("button");
    deleteBtnDOM.textContent = "usuń";
    // on click, delete chosen income
    deleteBtnDOM.addEventListener("click", (e) => {
      incomes = deleteIncome(incomes, income.id);
      renderIncomes();
  });
  // add income delete btn to income
  incomeDOM.appendChild(deleteBtnDOM);

  const editBtnDOM = document.createElement("button");
    editBtnDOM.textContent = "edytuj";
    editBtnDOM.addEventListener("click", () => {
      incomes = toggleIsEditedIncome(incomes, income.id);
      renderIncomes();
    });
    incomeDOM.appendChild(editBtnDOM);

    if(income.isEdited) {
    // confirme button
    const confirmeBtnDOM = document.createElement("button");
    confirmeBtnDOM.textContent = "potwierdź";
    // obsługa eventu potwoerdź 

    confirmeBtnDOM.addEventListener("click", (e) => {
      e.preventDefault();

      const getActualName = qs(".name");
      const getActualAmount = qs(".amount");
      income.name = getActualName.value;
      income.amount = getActualAmount.value;
     incomes = toggleIsEditedIncome(incomes, income.id);
     renderIncomes();
     
     });
    
       
    incomeDOM.appendChild(confirmeBtnDOM);
  }
     
    // add income to incomes
    incomeList.appendChild(incomeDOM);

    // sumowanie przychodów 
const incomSum = incomes.map(i => i.amount).reduce(function(previousValue, currentValue) {
  return parseInt(previousValue, 10) + parseInt(currentValue, 10);

})
    console.log(incomSum);
    
    const incomeSumDOM = qs(".incomeSum");
    incomeSumDOM.innerHTML = `Przychody wyniosły ${incomSum} zł `
    
    // console.log(incomes[0].amount);
    // console.log(income.name)
    // console.log(income.amount)
  });
// różnica wydartków i przychodów 
const outcomeSumDOM = qs(".outcomeSum");
const incomeSumDOM = qs(".incomeSum");

const outcomSum = outcomeSumDOM.textContent.split(" ");
const incomSum = incomeSumDOM.textContent.split(" ");




let accountBalance = ((incomSum[2] - outcomSum[2]) )
console.log(outcomSum[2]);
console.log(incomSum[2]);
console.log(accountBalance);

const accountBalanceDOM = qs(".acountBalance")

if( parseInt(accountBalance, 10) > 0) {
  accountBalanceDOM.innerHTML = ` Możesz jeszcze wydać: ${accountBalance} zł `

}
else if (parseInt(accountBalance, 10) == 0) {
  accountBalanceDOM.innerHTML = `Bilans wynosi ${accountBalance} zł `
}
else accountBalanceDOM.innerHTML = ` Bilans jest ujemny. Jesteś na minusie ${accountBalance} zł `
 


};

// View outcome
const renderOutcomes = () => {
  outcomeList.innerHTML = ""; //reset listy wydatków

  outcomes.forEach((outcome) => {
    const outcomeDOM = document.createElement("li");
    if(outcome.isEdited) {
      const editFormDOM = document.createElement("form");
      const editFormNameInputDOM = document.createElement("input");
      editFormNameInputDOM.setAttribute("name", "name");
      editFormNameInputDOM.setAttribute("class", "name");
      editFormNameInputDOM.setAttribute("value", outcome.name);
      editFormDOM.append(editFormNameInputDOM);

      const editFormAmountInputDOM = document.createElement("input");
      editFormAmountInputDOM.setAttribute("name", "amount")
      editFormAmountInputDOM.setAttribute("class", "amount")
      editFormAmountInputDOM.setAttribute("value", outcome.amount);
      editFormDOM.append(editFormAmountInputDOM);
      outcomeDOM.append(editFormDOM);

      //obsługa buttona edit
      editFormDOM.addEventListener("submit" , (e) => {
        e.preventDefault();

        const {name} = e.currentTarget.elements;
        const newName = name.value;

        const {amount} = e.currentTarget.elements;
        const newAmount = amount.value;

        let newOutcomesName = setIncomeName(outcomes,outcome.id, newName);
        outcomes = toggleIsEditedOutcome(newOutcomesName, outcome.id);

        let newOutcomesAmount = setOutcomeAmount(outcomes, outcome.id, newAmount);
        outcomes = toggleIsEditedOutcome(newOutcomesAmount, outcome.id);
        
        renderOutcomes();
        
        
      });

    } else{
      outcomeDOM.textContent = `${outcome.name}  ${outcome.amount} zł`;
    }
    //delete button
    const deleteBtnDOM = document.createElement("button");
    deleteBtnDOM.textContent = "usuń";
    // on click, delete chosen income
    deleteBtnDOM.addEventListener("click", (e) => {
      outcomes = deleteOutcome(outcomes, outcome.id);
      renderOutcomes();
      
  });
  // add income delete btn to income
  outcomeDOM.appendChild(deleteBtnDOM);

  const editBtnDOM = document.createElement("button");
    editBtnDOM.textContent = "edytuj";
    editBtnDOM.addEventListener("click", () => {
      outcomes = toggleIsEditedOutcome(outcomes, outcome.id);
      renderOutcomes();
      
    });
    outcomeDOM.appendChild(editBtnDOM);

    if(outcome.isEdited) {
    // confirme button
    const confirmeBtnDOM = document.createElement("button");
    confirmeBtnDOM.textContent = "potwierdź";
    
    
    // obsługa eventu potwoerdź 

    confirmeBtnDOM.addEventListener("click", (e) => {
      e.preventDefault();

      const getActualName = qs(".name");
      const getActualAmount = qs(".amount");
      outcome.name = getActualName.value;
      outcome.amount = getActualAmount.value;
     outcomes = toggleIsEditedOutcome(outcomes, outcome.id);
     renderOutcomes();
     
     });
    
       
    outcomeDOM.appendChild(confirmeBtnDOM);
  }
     
    // add income to incomes
    outcomeList.appendChild(outcomeDOM);

    // sumowanie wydatków
    const outcomSum = outcomes.map(i => i.amount).reduce(function(previousValue, currentValue) {
      return parseInt(previousValue, 10) + parseInt(currentValue, 10)
    })
    console.log(outcomSum);
    
    const outcomeSumDOM = qs(".outcomeSum");
    outcomeSumDOM.innerHTML = `Wydatki wyniosły ${outcomSum} zł `
    
    // console.log(incomes[0].amount);
    // console.log(income.name)
    // console.log(income.amount)
  });



// różnica wydartków i przychodów 
const outcomeSumDOM = qs(".outcomeSum");
const incomeSumDOM = qs(".incomeSum");

const outcomSum = outcomeSumDOM.textContent.split(" ");
const incomSum = incomeSumDOM.textContent.split(" ");




let accountBalance = ((incomSum[2] - outcomSum[2]) )
console.log(outcomSum[2]);
console.log(incomSum[2]);
console.log(accountBalance);

const accountBalanceDOM = qs(".acountBalance")

if( parseInt(accountBalance, 10) > 0) {
  accountBalanceDOM.innerHTML = ` Możesz jeszcze wydać: ${accountBalance} zł `

}
else if (parseInt(accountBalance, 10) == 0) {
  accountBalanceDOM.innerHTML = `Bilans wynosi ${accountBalance} zł `
}
else accountBalanceDOM.innerHTML = ` Bilans jest ujemny. Jesteś na minusie ${accountBalance} zł `
 

;}



//Events income
addIncomeDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name } = e.currentTarget.elements;
  const { amount } = e.currentTarget.elements;

  const newIncome = {
    id: uuid(),
    name: name.value,
    amount: amount.value,
    isEdited: false
  };

  incomes = addNewIncome(incomes, newIncome); // add to data
  renderIncomes();
  
   // render on screen
});

// start app
renderIncomes();



//Events outcome
addOutcomeDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name } = e.currentTarget.elements;
  const { amount } = e.currentTarget.elements;

  const newOutcome = {
    id: uuid(),
    name: name.value,
    amount: amount.value,
    isEdited: false
  };

  outcomes = addNewOutcome(outcomes, newOutcome); // add to data
  renderOutcomes(); // render on screen
});

// start app
renderOutcomes();




