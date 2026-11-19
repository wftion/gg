document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("repairForm");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        const name = document.getElementById("name");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const brand = document.getElementById("brand");
        const model = document.getElementById("model");
        const problem = document.getElementById("problem");
        const agreement = document.getElementById("agreement");

        clearErrors();

        if (name.value.trim() === "") {
            showError(name, "error-name", "Введите ваше имя");
            isValid = false;
        }

        const phoneRegex = /^\+?[0-9\s\-\(\)]{10,18}$/;
        if (phone.value.trim() === "") {
            showError(phone, "error-phone", "Введите номер телефона");
            isValid = false;
        } else if (!phoneRegex.test(phone.value.trim())) {
            showError(phone, "error-phone", "Некорректный формат телефона");
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === "") {
            showError(email, "error-email", "Введите email");
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, "error-email", "Некорректный формат email");
            isValid = false;
        }

        if (brand.value === "") {
            showError(brand, "error-brand", "Выберите марку ноутбука");
            isValid = false;
        }

        if (model.value.trim() === "") {
            showError(model, "error-model", "Введите модель ноутбука");
            isValid = false;
        }

        if (problem.value.trim().length < 10) {
            showError(problem, "error-problem", "Опишите проблему подробнее (минимум 10 символов)");
            isValid = false;
        }

        if (!agreement.checked) {
            showError(agreement, "error-agreement", "Необходимо согласие на обработку данных");
            isValid = false;
        }

        if (isValid) {
            displaySuccessData(name.value, phone.value, email.value, brand.value, model.value, problem.value);
            form.reset();
        }
    });

    function showError(inputElement, errorId, message) {
        inputElement.classList.add("input-error");
        document.getElementById(errorId).textContent = message;
    }

    function clearErrors() {
        const inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach(input => input.classList.remove("input-error"));

        const errorTexts = form.querySelectorAll(".error-text");
        errorTexts.forEach(error => error.textContent = "");

        successMessage.style.display = "none";
        successMessage.innerHTML = "";
    }

    function displaySuccessData(name, phone, email, brand, model, problem) {
        const urgency = document.querySelector('input[name="urgency"]:checked').value;
        
        successMessage.innerHTML = `
            <h3>Заявка успешно отправлена!</h3>
            <p><b>Имя:</b> ${name}</p>
            <p><b>Телефон:</b> ${phone}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Ноутбук:</b> ${brand} ${model}</p>
            <p><b>Срочность:</b> ${urgency}</p>
            <p><b>Описание:</b> ${problem}</p>
        `;
        successMessage.style.display = "block";
    }
});