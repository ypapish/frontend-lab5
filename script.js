const form = document.getElementById("form");
const fields = {
    fullName: document.getElementById("fullName"),
    phoneNumber: document.getElementById("phoneNumber"),
    idCart: document.getElementById("idCart"),
    faculty: document.getElementById("faculty"),
    birthdayDate: document.getElementById("birthdayDate")
};

const regEx = {
    fullName: /^[А-ЯІЇЄҐ][а-яіїєґ']+\s[А-Я]\.\s?[А-Я]\.$/,
    phoneNumber: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    idCart: /^[А-ЯІЇЄҐ]{2}\s№\d{6}$/,
    faculty: /^[А-ЯІЇЄҐ]{4}$/,
    birthdayDate: /^\d{2}\.\d{2}\.\d{4}$/
};

function validateField(fieldName, value) {
    return regEx[fieldName].test(value);
}

function showError(fieldName) {
    const field = fields[fieldName];
    field.classList.add('error');
}

function clearError(fieldName) {
    const field = fields[fieldName];
    field.classList.remove('error');
}

function displayResults(formData) {
    const resultsTable = document.getElementById('resultsTable');
    
    resultsTable.innerHTML = `
        <table class="data-table">
            <tr>
                <td colspan="2"><strong>Введені дані:</strong></td>
            </tr>
            <tr><td>ПІБ:</td><td>${formData.fullName}</td></tr>
            <tr><td>Телефон:</td><td>${formData.phoneNumber}</td></tr>
            <tr><td>ID картка:</td><td>${formData.idCart}</td></tr>
            <tr><td>Факультет:</td><td>${formData.faculty}</td></tr>
            <tr><td>Дата народження:</td><td>${formData.birthdayDate}</td></tr>
        </table>
    `;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;
    const formData = {};
    
    Object.keys(fields).forEach(fieldName => {
        clearError(fieldName);
    });
    
    Object.entries(fields).forEach(([fieldName, fieldElement]) => {
        const value = fieldElement.value.trim();
        formData[fieldName] = value;
        
        if (!validateField(fieldName, value)) {
            showError(fieldName);
            isValid = false;
        }
    });

    if (isValid) {
        displayResults(formData);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const tableContainer = document.getElementById('tableContainer');
    const colorPicker = document.getElementById('favcolor');

    function getRandomColor() {
        return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;
    }

    const table = document.createElement('table');
    let counter = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement('td');
            cell.textContent = counter;
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.dataset.number = counter;
            
            if (counter === 3) {
                let savedColor = '';

                cell.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = getRandomColor();
                });
                
                cell.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = savedColor || '';
                });
                
                cell.addEventListener('click', function() {
                    savedColor = colorPicker.value;
                    this.style.backgroundColor = savedColor;
                });
                
                cell.addEventListener('dblclick', function() {
                    const currentColor = colorPicker.value;
                    const allCells = table.querySelectorAll('td');
                    allCells.forEach(cell => {
                        const row = parseInt(cell.dataset.row);
                        const col = parseInt(cell.dataset.col);
                        if (row === col) {
                            cell.style.backgroundColor = currentColor;
                        }
                    });
                });
            }
            
            row.appendChild(cell);
            counter++;
        }
        
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
});
