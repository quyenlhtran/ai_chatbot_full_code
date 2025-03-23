import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "Empty message received."}), 400

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                {"role": "system", "content": "You are a helpful shopping assistant."},
                {"role": "user", "content": user_message}
            ]
        )

        reply = response.choices[0].message["content"].strip()
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)