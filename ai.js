const sendBtn =
  document.getElementById("sendBtn");

const userInput =
  document.getElementById("userInput");

const chatBox =
  document.getElementById("chatBox");

sendBtn.addEventListener("click", async () => {

  const message =
    userInput.value.trim();

  if (!message) return;

  addMessage(message, "user");

  userInput.value = "";

  try {

    const response = await fetch(

      "/api/chat",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          messages: [

            {

              role: "user",

              content: message

            }

          ]

        })

      }

    );

    const data =
      await response.json();

    console.log(data);

    if (data.error) {

      addMessage(
        "Error: " + data.error,
        "ai"
      );

      return;

    }

    const aiReply =

      data.choices[0]
      .message.content;

    addMessage(aiReply, "ai");

  }

  catch (error) {

    console.error(error);

    addMessage(
      "AI request failed",
      "ai"
    );

  }

});

function addMessage(text, sender) {

  const div =
    document.createElement("div");

  div.style.padding = "15px";

  div.style.margin = "10px";

  div.style.borderRadius = "12px";

  div.style.whiteSpace =
    "pre-wrap";

  div.style.color = "white";

  div.style.background =

    sender === "user"

      ? "#20304d"

      : "#17382d";

  div.innerText = text;

  chatBox.appendChild(div);

  chatBox.scrollTop =
    chatBox.scrollHeight;

}