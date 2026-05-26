const API_KEY = "1a44091d-e580-43e1-b810-6174ab18a38b";

const sendBtn = document.getElementById("sendBtn");

const userInput = document.getElementById("userInput");

const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", async () => {

  const message = userInput.value;

  if (!message) return;

  addMessage(message, "user");

  userInput.value = "";

  try {

    const response = await fetch(
      "https://api.sambanova.ai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },

        body: JSON.stringify({

          model: "Meta-Llama-3.1-8B-Instruct",

          messages: [
            {
              role: "user",
              content: message
            }
          ],

          temperature: 0.7,

          top_p: 0.9

        })

      }
    );

    const data = await response.json();

    const aiReply =
      data.choices[0].message.content;

    addMessage(aiReply, "ai");

  }

  catch (error) {

    console.error(error);

    addMessage("Error connecting AI", "ai");

  }

});

function addMessage(text, sender) {

  const div = document.createElement("div");

  div.className = sender;

  div.style.margin = "10px";

  div.style.padding = "15px";

  div.style.borderRadius = "10px";

  div.style.background =
    sender === "user"
      ? "#20304d"
      : "#13392f";

  div.innerText = text;

  chatBox.appendChild(div);

}