// confirmation.js

// Load car data from cars.json and populate car model select options
function loadCarData() {
    fetch('./assets/data/cars.json')
        .then(response => response.json())
        .then(data => {
            const carSelect = document.getElementById('carSelect');
            const selectedCarModel = localStorage.getItem('selectedCarModel');
            
            data.cars.forEach(car => {
                const option = document.createElement('option');
                option.value = car.model;
                option.text = car.model;
                carSelect.add(option);
            });

            if (selectedCarModel) {
                carSelect.value = selectedCarModel;
                calculateCost(); // Automatically calculate the cost
            }
        })
        .catch(error => console.error('Error loading car data:', error));
}

// Calculate total cost based on selected car and dates
function calculateCost() {
    const carSelect = document.getElementById('carSelect');
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const selectedCarModel = carSelect.value;
    
    if (isNaN(startDate) || isNaN(endDate) || !selectedCarModel) {
        alert("Please select a valid car and date range");
        return;
    }

    const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
    if (days <= 0) {
        alert("End date must be after start date");
        return;
    }

    fetch('./assets/data/cars.json')
        .then(response => response.json())
        .then(data => {
            const car = data.cars.find(car => car.model === selectedCarModel);
            const totalCost = car.price * days;
            document.getElementById('totalDays').textContent = days;
            document.getElementById('totalCost').textContent = totalCost.toFixed(2);
        })
        .catch(error => console.error('Error calculating cost:', error));
}

document.addEventListener('DOMContentLoaded', loadCarData);
