/**
 * Class for generating prompts for the LLM.
 * Each method uses a different style of prompting and encorporates the user's prompt.
 * The use of multiple methods allows for testing as LLMs develop, and for automation
 * of testing to determine which method generates the most usable result.
 */
const TreePrompts = {
  /**
   * Generate a prompt using the COSTAR method.
   *
   * @param prompt The user's prompt
   * @returns The COSTAR prompt for the LLM
   */
  costar(prompt: string): string {
    return `
    # CONTEXT #
    I am a student looking to learn about a new skill. I am building a tree to
    organize the information I need to learn. I am looking for a JSON object that
    I will use to construct this tree.

    #######

    # Objective #
    Your task is to build the JSON object that I will use to construct my tree.
    The first key should be the subject name. The value should be an object with
    subtopic keys. Each subtopic key should have an array of areas to study.

    #######

    # Style #
    There should be no extra information in the JSON object. Only the structure.

    #######

    # Tone #
    By curt and to the point. I am a student looking for information.

    #######

    # Audience #
    A computer that will parse the JSON object to build a tree.

    #######

    # Response Format #
    JSON.

    #######

    Goal: ${prompt}
    `;
  },
};

export default TreePrompts;
