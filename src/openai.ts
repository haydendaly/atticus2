const { Configuration, OpenAIApi } = require("openai");

// TODO: move this somewhere else (before pushing @HAYDEN)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

enum SupportedModels {
  DAVINCI = "text-davinci-003",
  CODEX = "code-davinci-002",
}

const _generateGpt3Completion = async (
  prompt: string,
  model = SupportedModels.DAVINCI,
  retries = 0
): Promise<{
  allContinuations: string[];
  continuation: string;
}> => {
  try {
    const completion = await openAi.createCompletion({
      model,
      prompt,
      temperature: 0.75,
      max_tokens: 2048,
    });
    const allContinuations = completion.data.choices
      .map((choice: any) => choice.text)
      .filter((text: string | undefined) => text !== undefined && text !== "");
    return { allContinuations, continuation: allContinuations[0] };
  } catch (error) {
    // if (error.status === 400) {
    console.log("Please try again");
    console.error(error);
    // } else {
    //   console.error(error);
    // }
  }
  return { allContinuations: [], continuation: "" };
};

module.exports = {
  generateGpt3Completion: _generateGpt3Completion,
};
