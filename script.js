document.addEventListener("DOMContentLoaded", function () {
    const chatButton = document.getElementById("chat-button");
    const chatContainer = document.getElementById("chat-container");
    const chatWindow = document.getElementById("chat-window");
    const inputField = document.getElementById("user-input");
    const sendButton = document.getElementById("send-message");
    const closeBtn = document.getElementById("close-chat");
    const minimizeBtn = document.getElementById("minimize-chat");

    let chatHistory = "";

    function renderWelcomeMessage() {
        return `
            <div class="bot-welcome">
                <strong>Hi, I can help with your shopping questions or connect you to a support agent.</strong>
            </div>
            ${renderSuggestionButtons([
                "🛍 I want to see best deals",
                "📦 I need help with an order",
                "💬 Talk to a human"
            ])}
        `;
    }

    function renderSuggestionButtons(options) {
        return `
            <div class="suggestion-buttons">
                ${options.map(text => `<button class="suggestion">${text}</button>`).join("")}
            </div>
        `;
    }

    function openChat(fresh = false) {
        chatContainer.style.display = "flex";
        inputField.value = "";

        if (fresh || chatHistory === "") {
            const welcomeBlock = renderWelcomeMessage();
            chatWindow.innerHTML = welcomeBlock;
            chatHistory = welcomeBlock;
        } else {
            chatWindow.innerHTML = chatHistory;
        }
    }

    function sendMessage() {
        const userInput = inputField.value.trim();
        if (!userInput) return;

        const userMessage = `<div><strong>You:</strong> ${userInput}</div>`;
        const typingId = `typing-${Date.now()}`;
        const typingMessage = `<div id="${typingId}"><em>Bot is typing...</em></div>`;

        chatWindow.innerHTML += userMessage + typingMessage;
        chatWindow.scrollTop = chatWindow.scrollHeight;

        fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById(typingId)?.remove();
                const reply = data.reply || data.error || "Hmm... no reply received.";
                const botMessage = `<div><strong>Bot:</strong> ${reply}</div>`;
                chatWindow.innerHTML += botMessage;
                chatWindow.scrollTop = chatWindow.scrollHeight;
                chatHistory = chatWindow.innerHTML;
            })
            .catch(err => {
                document.getElementById(typingId)?.remove();
                const errorMessage = `<div><strong>Bot:</strong> Error: ${err.message}</div>`;
                chatWindow.innerHTML += errorMessage;
                chatWindow.scrollTop = chatWindow.scrollHeight;
                chatHistory = chatWindow.innerHTML;
            });

        inputField.value = "";
    }

    // Suggestion button handling
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("suggestion")) {
            document.querySelector(".suggestion-buttons")?.remove();
            inputField.value = e.target.textContent;
            sendMessage();
        }
    });

    sendButton.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", e => {
        if (e.key === "Enter") sendMessage();
    });

    chatButton.addEventListener("click", () => openChat(false));

    minimizeBtn.addEventListener("click", () => {
        chatContainer.style.display = "none";
    });

    closeBtn.addEventListener("click", () => {
        chatContainer.style.display = "none";
        chatHistory = "";
    });
});
