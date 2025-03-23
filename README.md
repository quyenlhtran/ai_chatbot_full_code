# 🧠 AI Chatbot Integration Full Code 

This is the **complete code** for the workshop **"AI Workshop - Build your own Chatbot"**  

It includes a **basic AI chatbot** built with HTML/CSS/JS and a Python Flask backend that connects to OpenAI's API.  

Use this project to learn how to enhance any website with an intelligent chat assistant.

---

## 📁 Project Structure
```
├── .env           # Contains your OpenAI API key (keep this secret)
├── README.md      # Project documentation
├── index.html     # Main front-end HTML file
├── script.js      # JavaScript for chatbot interaction
├── server.py      # Flask back-end server
├── style.css      # CSS styles for the site and chatbot
├── test.py        # (Optional) Script to list available OpenAI models
```

---

## 🧰 Tech Stack

**Front-End:**
- HTML
- CSS
- JavaScript

**Back-End:**
- Python
- Flask
- OpenAI API

**Other Tools:**
- Dotenv (for environment variables)
- Flask-CORS (to allow communication between front-end and back-end)
- Git
- VS Code

## ✅ How to Use This Code

1. Make sure you have Python, Git, and a code editor (like VS Code) installed.
2. Create an OpenAI account and get your API key.
3. Add your API key to a `.env` file in the root directory
4. Install the required Python libraries:
```pip install flask openai python-dotenv flask-cors ```
5. Run the front-end:
``` python -m http.server 8000 ```
6. In a separate terminal, run the Flask server:
``` python server.py ```

7. Open your browser to `http://localhost:8000` and start chatting!

---

Feel free to modify and build upon this project for your own use cases!
