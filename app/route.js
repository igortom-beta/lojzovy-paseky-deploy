import OpenAI from "openai";

export async function POST(req) {
    try {
        const { message } = await req.json();

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Jsi AI asistent projektu Lojzovy Paseky." },
                { role: "user", content: message }
            ]
        });

        return Response.json({
            text: completion.choices[0].message.content
        });

    } catch (err) {
        console.error(err);
        return Response.json({ text: "Chyba serveru." }, { status: 500 });
    }
}