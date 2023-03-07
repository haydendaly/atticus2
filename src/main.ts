const { generateGpt3Completion } = require("./openai");

const main = async () => {
  let name = "Hayden";
  let age = 8;
  let location = "Los Angeles";
  let personality =
    "Hayden is a very curious kid. He loves to build Lego, take things apart, and put them back together. He also likes running.";
  let interests =
    "star wars, lego, pokemon, building things, trucks, trains, etc.";
  let storyFocus =
    "Put Hayden onto the battle of Naboo and have him help the jedi defeat the droids.";

  // name = "Emma";
  // age = 9;
  // location = "the moon";
  // personality = "sad";
  // interests = "bugs";
  // storyFocus = "making friends";

  const prompt = `Generate a kids story surrounding this kid's profile: 

"""
Name: ${name}
Age: ${age}
Location: ${location}
Some personality details: ${personality}
"""

THIS STORY SHOULD BE CLEAN AND READABLE FOR SOMEONE AGE ${age} OR OLDER.

The kid is really interested in """${interests}"""

Create a short story (8 paragraphs) about """${storyFocus}"""
`;

  const { allContinuations } = await generateGpt3Completion(prompt);
  let i = 1;
  for (const continuation of allContinuations) {
    console.log(`# Story ${i}:\n${continuation}\n\n`);
    i += 1;
  }
};

main();

// export {};
