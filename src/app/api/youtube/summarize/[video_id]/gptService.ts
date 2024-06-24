// Assuming you have the necessary environment variables set up for your OpenAI API key

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCommentsSummary(system: string, user: string) : Promise<any> {
  const systemMessage = `f
Your job is to summarize YouTube video comments. You receive comments from YouTube videos in this format:
comment = {'commentText': 'textDisplay', 'likeCount': likeCount}
Your input is an array with multiple comments. You need to summarize the comments to understand the community feedback to the video. The higher the number of likeCount a comment gets, the more weight you need to give it in the summary.
You must adhere to the following:
1. Summary must not be more than 3 rows max.
2. Summary must cover 3 different aspects.
3. You MUST NOT write an intro like 'the YouTube video' or 'the commenters'.
4. Be casual - don't sound like a typical language model.
5. Summary must be returned as a JSON array, with each item as a different bullet.
6. Add a fun emoji to the start of each row that describes it.
7. if there are no comments, return empty.
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: system || systemMessage },
        { role: "user", content: user },
      ],
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error("Error generating comments summary:", error.message);
    return ""; // Handle the error as needed
  }
}

// Example usage

// const userMessage = 'Summarize the comments for a YouTube video about cats.';

// generateCommentsSummary(systemMessage, userMessage)
//   .then((summary) => {
//     console.log('Generated summary:', summary);
//   })
//   .catch((err) => {
//     console.error('Error:', err);
//   });
