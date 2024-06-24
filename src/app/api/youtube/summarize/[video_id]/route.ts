// pages/api/summerize/[video_id].ts
"use server";

import { NextResponse, NextRequest } from "next/server";
import { generateCommentsSummary } from "./gptService";
import axios from "axios";
import prisma from "@/app/lib/prisma";

type Comment = {
  commentText: string;
  likeCount: number;
};

type SummaryResponse = {
  commentsSummery: string[];
  topComments: Comment[];
};

// const topCommentsTest = [
//   {
//       "commentText": "Ok, none of these people should be harassed, but naming your cough medicine after the guy is legendary",
//       "likeCount": 9669
//   },
//   {
//       "commentText": "imagine someone in the crowd had allergies and completely messed up his entire plan just by coughing \\ud83d\\ude02",
//       "likeCount": 8252
//   },
//   {
//       "commentText": "that 1 million question is the easiest i have ever seen lmao",
//       "likeCount": 5756
//   },
//   {
//       "commentText": "That was the most brilliant sponsor integration I\'ve seen a while",
//       "likeCount": 5064
//   },
//   {
//       "commentText": "I mean, someone shooting the cat with an airgun is the most unacceptable thing ever, whomever did that can rot in hell... But the cough drops company naming their products after them is absolutely hilarious",
//       "likeCount": 2993
//   },
//   {
//       "commentText": "0:56 in English, they are called \\'lifelines\\' not \\'jokers\\' like in the German version",
//       "likeCount": 2288
//   },
//   {
//       "commentText": "That million pound question was fucking sad tbh lol. Megatron? lmao",
//       "likeCount": 1617
//   },
//   {
//       "commentText": "Possible the most legendary episode was when a guy named John Carpenter competed. At the start, people booed him when he said he worked for the IRS. He got to the 1 million dollar question without using any lifelines, and on the final question he used Phone A Friend... to call his dad and tell him he was gonna win because he already knew the answer. Absolute legend.",
//       "likeCount": 1440
//   },
//   {
//       "commentText": "September 9th 2001? eh, the next tuesday is gonna be crazy",
//       "likeCount": 1101
//   },
//   {
//       "commentText": "10:47 as a Brit who is fluent in \\u201cBri\\u2019ish\\u201d I can confirm the [inaudible] statement is \\u201cI\\u2019m absolutely gobsmacked\\u201d \\ud83d\\ude02",
//       "likeCount": 963
//   },
//   {
//       "commentText": "he had to trademark his name, to stop a company naming cough medicine after hihilarious xD",
//       "likeCount": 846
//   },
//   {
//       "commentText": "Someone killed their family cat?!? That is definitely the worst part of the whole fiasco",
//       "likeCount": 731
//   },
//   {
//       "commentText": "That Brilliant commercial was in fact, Brilliant. I had already named it Brilliant as soon as i saw it, and then realized it was a joke and the advertising to the video. Hilarious.",
//       "likeCount": 714
//   },
//   {
//       "commentText": "This has to be the worst thing to have happened in September, 2001.",
//       "likeCount": 666
//   },
//   {
//       "commentText": "It was a clever plan in a way, but the execution of it was piss poor. By dismissing answers, and then having to backtrack, he just made it so obvious he was cheating. And by going back for confirmatory coughs he just made it even worse.",
//       "likeCount": 335
//   },
//   {
//       "commentText": "The transition into the sponsor was dare i say, brilliant",
//       "likeCount": 257
//   },
//   {
//       "commentText": "Another plausible answer to this mystery could be that every single question was relatable to a specific event in this poor man\\u2019s life.",
//       "likeCount": 154
//   },
//   {
//       "commentText": "I knew about the first group of people you talked about, but I had never heard of the consortium. That is impressive that they were able to do that.",
//       "likeCount": 104
//   },
//   {
//       "commentText": "I thought the phone call with the producers was pretty telling. If you knew you hadn\'t cheated you\'d be asking how long is this going to take to get cleared up? And when am I going to get my money? He didn\'t ask any of those obvious questions, because he knew he\'d been busted.",
//       "likeCount": 60
//   }
// ]

const test = {
  commentsSummery: [
    "👍 Viewers are in awe of the seal's adorable and fluffy nature, comparing it to a mix of a puppy, kitten, and bear cub.",
    "👍 Many find the seal's vocalizations and interactions with humans endearing and entertaining.",
    "👍 Some commenters express admiration for the seal's innocence and curiosity towards its surroundings, finding it heartwarming.",
  ],
  topComments: [
    {
      commentText:
        "Seal: are you my mom?\nMe: I want to be.', 'likeCount': 15981",
    },
    {
      commentText:
        "Basically a puppy, a kitten, and a bear cub all rolled into one adorable fluffball.', 'likeCount': 13122",
    },
  ],
};

// Might want to loop to next page a few times. if so, this is the python code for that
// pageTokenAdded = False
// nextPageToken = True
// i = 4
// while i < 5 and nextPageToken:
//     comments_result = requests.get(api_url).json()
//     # comments_result = load_json('temp.json')
//     if "error" in comments_result:
//         break
//     for commentData in comments_result['items']:
//         textDisplay = commentData['snippet']['topLevelComment']['snippet']['textDisplay']
//         likeCount = commentData['snippet']['topLevelComment']['snippet']['likeCount']
//         comment = {
//             "commentText": textDisplay,
//             "likeCount":likeCount
//         }
//         comments.append(comment)
//     if 'nextPageToken' in comments_result:
//         nextPageToken = comments_result['nextPageToken']
//     else:
//         break
//     if not pageTokenAdded:
//         api_url += "&pageToken="
//         pageTokenAdded = True
//     api_url += nextPageToken
//     i += 1

export async function POST(req: Request, context: any) {
  
  // Test:
  // const { commentsSummery, topComments } = test
  // return NextResponse.json(
  //   { commentsSummery, topComments },
  //   {
  //     status: 200,
  //   }
  // );
  const [pro, proS] = [1,2]
  const { email } = await req.json();
  const { video_id } = context.params;
  try {
    const props = await _getPropsByEmail(email)
    if (!props) {
      return NextResponse.json(
        { responseText: "Please signup to google account to use youtube-comments-summery." },
        {
          status: 401,
        }
      );
    }
    if ((!props.isPayed  && props.videoUsedCount >= 10)) {
      return NextResponse.json(
        { responseText: "You reached your limit. Please buy subscription to keep using youtube-summery." },
        {
          status: 403,
        }
      );
    } else if  (props.isPayed == pro && props.videoUsedCount >= 1000) {
      return NextResponse.json(
        { responseText: "You reached your limit. You can upgrade your subscription." },
        {
          status: 403,
        }
      );
    } else if (props.isPayed == proS && props.videoUsedCount >= 10000) {
      return NextResponse.json(
        { responseText: "You reached your limit. You can upgrade your subscription." },
        {
          status: 403,
        }
      );
    }
    const apiKey = process.env.YOUTUBE_API_KEY;
    const maxResults = 75;

    let apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&maxResults=${maxResults}&order=relevance&part=snippet&videoId=${video_id}`;
    const response = await axios.get(apiUrl);
    const comments = response.data.items.map((item: any) => ({
      commentText: item.snippet.topLevelComment.snippet.textDisplay,
      likeCount: item.snippet.topLevelComment.snippet.likeCount,
    }));
    const topComments = comments
      .sort((a: Comment, b: Comment) => b.likeCount - a.likeCount)
      .slice(0, 2);

    const commentsSummeryString = await generateCommentsSummary(
      "",
      JSON.stringify(topComments)
    );
    const commentsSummery = JSON.parse(commentsSummeryString);

    if(!await _incrementVideoCount(email)) {
      throw new Error("Failed to increment videoUsedCount");
    }
    return NextResponse.json(
      { commentsSummery, topComments },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}

async function _incrementVideoCount(email: string) : Promise<boolean> {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }  // Only fetch the ID
    });

    if (!user) {
      console.error(`User with email ${email} not found.`);
      return false;
    }

    // Update the props for the user
    await prisma.props.update({
      where: { userId: user.id },
      data: {
        videoUsedCount: { increment: 1 },
      },
    });

    console.log(`Props updated successfully for user with email ${email}.`);
  } catch (error) {
    console.error("Error updating props:", error);
  }
  return true
}

async function _getPropsByEmail(email: string): Promise<any> {
  try {
    const userWithProps = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        props: true,  // Include the related props in the result
      },
    });

    if (userWithProps && userWithProps.props) {
      console.log('Props found:', userWithProps.props);
      return userWithProps.props;
    } else {
      console.log('No props found for this user.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user props:', error);
    throw error;
  }
}