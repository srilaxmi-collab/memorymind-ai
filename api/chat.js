export default async function handler(req, res) {

  try {

    if (req.method !== "POST") {

      return res.status(405).json({
        error: "Method not allowed"
      });

    }

    const { messages } = req.body;

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

          messages: messages,

          temperature: 0.7,

          top_p: 0.9

        })

      }

    );

    const data = await response.json();

    console.log(data);

    return res.status(200).json(data);

  }

  catch (error) {

    console.error(error);

    return res.status(500).json({

      error: error.message

    });

  }

}