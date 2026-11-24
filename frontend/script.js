const API_URL = "http://localhost:5000/api/users";
// Fetch User Data
async function fetchUser(userId) {
    const loading = document.getElementById("loading");
    const userData = document.getElementById("userData");
    const errorMessage = document.getElementById("errorMessage");
    loading.classList.remove("d-none");
    userData.classList.add("d-none");
    errorMessage.classList.add("d-none");
    try {
        const response = await fetch(`${API_URL}/${userId}`);
        if (!response.ok) {
            throw new Error("User not found");
        }
        const user = await response.json();
        document.getElementById("userName").textContent =
            user.name;
        document.getElementById("userEmail").textContent =
            user.email;
        loading.classList.add("d-none");
        userData.classList.remove("d-none");
    } catch (error) {
        loading.classList.add("d-none");
        errorMessage.textContent =
            "Error: " + error.message;
        errorMessage.classList.remove("d-none");}}
// Update User Name
document.getElementById("updateForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();
        const userId =
            document.getElementById("userId").value;
        const newName =
            document.getElementById("newName").value;
        const successMessage =
            document.getElementById("successMessage");
        try {
            const response = await fetch(
                `${API_URL}/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: newName
                    })});
            if (!response.ok) {
                throw new Error("Failed to update user");}
            const data = await response.json();
                  successMessage.textContent =
                data.message;
            successMessage.classList.remove("d-none");
            // Re-fetch updated data
            await fetchUser(userId);
        } catch (error) {
            successMessage.classList.remove("d-none");
            successMessage.classList.remove("alert-success");
            successMessage.classList.add("alert-danger");
            successMessage.textContent =
                "Error: " + error.message;}});