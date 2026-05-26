export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Method not allowed"
    });

  }

  try {

    const response = await fetch(

      "https://api.sambanova.ai/v1/chat/completions",

      {

        method: "POST",

        headers: {

          "Authorization":
            `Bearer ${process.env.SAMBANOVA_API_KEY}`,

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          model: "Meta-Llama-3.1-70B-Instruct",

          messages: req.body.messages,

          temperature: 0.7

        })

      }

    );

    const data = await response.json();

    res.status(200).json(data);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Server error"
    });

  }

}