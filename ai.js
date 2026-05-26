const API_KEY = "1a44091d-e580-43e1-b810-6174ab18a38b";

const sendBtn = document.getElementById("sendBtn");

const userInput = document.getElementById("userInput");

const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", async () => {

  const message = userInput.value.trim();

  if (!message) return;

  addMessage(message, "user");

  userInput.value = "";

  try {

    const response = await fetch(

      "https://api.sambanova.ai/v1/chat/completions",

      {

        method: "POST",

        headers: {

          "Authorization": `Bearer ${API_KEY}`,

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          model: "Meta-Llama-3.1-70B-Instruct",

          messages: [

            {

              role: "system",

              content: "You are a helpful AI assistant."

            },

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

    const text = await response.text();

    console.log(text);

    const data = JSON.parse(text);

    if (data.error) {

      addMessage(data.error.message, "ai");

      return;

    }

    const aiReply =
      data.choices[0].message.content;

    addMessage(aiReply, "ai");

  }

  catch (error) {

    console.error(error);

    addMessage("AI request failed", "ai");

  }

});

function addMessage(text, sender) {

  const div = document.createElement("div");

  div.style.padding = "15px";

  div.style.margin = "10px";

  div.style.borderRadius = "12px";

  div.style.whiteSpace = "pre-wrap";

  div.style.color = "white";

  div.style.background =
    sender === "user"
      ? "#20304d"
      : "#17382d";

  div.innerText = text;

  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;

}