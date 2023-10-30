document.addEventListener("DOMContentLoaded", function () {
    const formBox = document.getElementById("form-box");
    const userCard = document.getElementById("user-card");
    const userForm = document.getElementById("user-form");
    const resetButton = document.getElementById("reset-button");
    const newuserButton = document.getElementById("new-user-button");
    const historyButton = document.getElementById("history-button");
    const themeSelect = document.getElementById("theme-select");

    const historyDisplay = document.getElementById("history-display");
    const userDetailsDisplay = document.getElementById("user-details-display");
    const backButton = document.getElementById("back-button");

    formBox.style.display = "block";
    backButton.style.display = "none";
    historyDisplay.style.display = "none";
    newuserButton.style.display = "none";
    historyButton.style.display = "block";


    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
        themeSelect.value = savedTheme;
        // Apply the selected theme on page load.
        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
        }
    }

    userForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Capture user input
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const country = document.getElementById("country").value;
        const mobile = document.getElementById("mobile").value;
        const state = document.getElementById("state").value;
        const city = document.getElementById("city").value;
        const village = document.getElementById("village").value;
        const pinCode = document.getElementById("pin-code").value;

        // Create a user object
        const user = {
            firstName,
            lastName,
            country,
            mobile,
            state,
            city,
            village,
            pinCode,
        };

        // Store the user object in an array in local storage
        let users = JSON.parse(localStorage.getItem("userHistory")) || [];
        users.push(user);
        localStorage.setItem("userHistory", JSON.stringify(users));

        // Create the user info card
        const userInfoHTML = `
            <h2>User Information</h2>
            <p>First Name: ${firstName}</p>
            <p>Last Name: ${lastName}</p>
            <p>Country: ${country}</p>
            <p>Mobile: ${mobile}</p>
            <p>State: ${state}</p>
            <p>City: ${city}</p>
            <p>Village: ${village}</p>
            <p>Pin Code: ${pinCode}</p>
        `;

        // Update the user card and hide the form
        userCard.innerHTML = userInfoHTML;
        formBox.style.display = "none";
        userCard.style.display = "block";
    });

    resetButton.addEventListener("click", function () {
        // Reset the form and hide the user card
        userForm.reset();
        formBox.style.display = "block";
        userCard.style.display = "none";
    });

    newuserButton.addEventListener("click", function () {
        // Hide history and user details, show the form
        formBox.style.display = "block";
        userCard.style.display = "none";
        historyDisplay.style.display = "none";
        userDetailsDisplay.style.display = "none";
        backButton.style.display = "none";
        newuserButton.style.display = "none";
        historyButton.style.display = "block";
    });

    historyButton.addEventListener("click", function () {
        // Hide form, user card, and user details, show user history
        formBox.style.display = "none";
        userCard.style.display = "none";
        historyDisplay.style.display = "block";
        userDetailsDisplay.style.display = "none";
        backButton.style.display = "none";
        newuserButton.style.display = "block";
        historyButton.style.display = "none";

        const users = JSON.parse(localStorage.getItem("userHistory")) || [];
        if (users.length === 0) {
            alert("No user history available.");
        } else {
            let historyHTML = "<h2>User History</h2>";
            users.forEach((user, index) => {
                historyHTML += `
                    <div class="user-entry">
                        <p>User ${index + 1}:</p>
                        <p>${user.firstName} ${user.lastName}</p>
                        <button class="view-button" data-index="${index}">View</button>
                    </div>
                `;
            });
            historyDisplay.innerHTML = historyHTML;
        }
    });

    historyDisplay.addEventListener("click", function (e) {
        if (e.target.classList.contains("view-button")) {
            // Show user details when the "View" button is clicked
            const index = e.target.getAttribute("data-index");
            const users = JSON.parse(localStorage.getItem("userHistory")) || [];
            if (users[index]) {
                const user = users[index];
                const userDetailsHTML = `
                    <h2>User Details</h2>
                    <p>First Name: ${user.firstName}</p>
                    <p>Last Name: ${user.lastName}</p>
                    <p>Country: ${user.country}</p>
                    <p>Mobile: ${user.mobile}</p>
                    <p>State: ${user.state}</p>
                    <p>City: ${user.city}</p>
                    <p>Village: ${user.village}</p>
                    <p>Pin Code: ${user.pinCode}</p>
                `;
                userDetailsDisplay.innerHTML = userDetailsHTML;
                historyDisplay.style.display = "none";
                userDetailsDisplay.style.display = "block";
                backButton.style.display = "block";
                newuserButton.style.display = "block";
                historyButton.style.display = "none";
            }
        }
    });

    backButton.addEventListener("click", function () {
        // Return to the user history view
        historyDisplay.style.display = "block";
        userDetailsDisplay.style.display = "none";
        backButton.style.display = "none";
        newuserButton.style.display = "block";
        historyButton.style.display = "none";
    });

    themeSelect.addEventListener("change", function () {
        const selectedTheme = themeSelect.value;
        // Apply different CSS classes based on the selected theme.
        if (selectedTheme === "dark") {
            document.body.classList.add("dark-theme");
            document.getElementsByClassName("card").classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }

        localStorage.setItem("selectedTheme", selectedTheme);
    });
});