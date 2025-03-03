document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let fullMessage = {
        id: Date.now(),
        text: `From: ${name} (${email}) - ${message}`
    };

    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(fullMessage);
    localStorage.setItem("messages", JSON.stringify(messages));

    alert("Message Sent Successfully!");
    document.getElementById("contactForm").reset();
});

document.getElementById("viewMessages").addEventListener("click", function() {
    let password = prompt("Enter Manager Password:");
    
    if (password === "TECH@54321") {
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        let messagesList = document.getElementById("messagesList");

        // 🔥 पहले लिस्ट क्लियर कर दो ताकि डुप्लिकेट न बने
        messagesList.innerHTML = ""; 

        messages.forEach(msg => {
            let li = document.createElement("li");
            li.textContent = msg.text;

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";

            deleteBtn.addEventListener("click", function() {
                deleteMessage(msg.id);
            });

            li.appendChild(deleteBtn);
            messagesList.appendChild(li);
        });

        document.getElementById("messagesBox").classList.remove("hidden");
    } else {
        alert("Incorrect Password!");
    }
});

document.getElementById("closeMessages").addEventListener("click", function() {
    document.getElementById("messagesBox").classList.add("hidden");
});

function deleteMessage(id) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages = messages.filter(msg => msg.id !== id);
    localStorage.setItem("messages", JSON.stringify(messages));
    alert("Message Deleted!");
    document.getElementById("viewMessages").click();
}
