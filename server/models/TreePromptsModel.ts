import { InputContent } from '@google/generative-ai';
import { ChainOfThought } from '../types';

/**
 * Class for generating prompts for the LLM.
 * Each method uses a different style of prompting and encorporates the user's prompt.
 * The use of multiple methods allows for testing as LLMs develop, and for automation
 * of testing to determine which method generates the most usable result.
 */
const Prompts = {
  /**
   * Generate a prompt using the one-shot method.
   * Note, I have struggled to engineer a good prompt for this one.
   *
   * @param prompt The user's prompt
   * @return The one-shot prompt for the LLM
   */
  oneShot(prompt: string): string {
    return `
    Skill: {
      "Skill Name": {
        "subtopic1": ["area1", "area2", "area3"],
        "subtopic2": ["area1", "area2", "area3"]
      }
    }
    
    ${prompt}
    `;
  },

  /**
   * Generate a prompt using the zero-shot method.
   *
   * @param prompt The user's prompt
   * @return The zero-shot prompt for the LLM
   */
  zeroShot(prompt: string): string {
    return `
    You are a computer outputting only JSON. You build a JSON file with the first
    key the name of the subject, it's value an object of subtopic keys, and each
    each subtopic key having an array of areas to study. Build this JSON file with the
    following prompt: ${prompt}
    `;
  },

  /**
   * Generate a history and final prompt for use in simulating a conversation.
   *
   * @param prompt The user's prompt
   * @return The history and final prompt for the LLM
   */
  chainOfThought(prompt: string): ChainOfThought {
    const thoughtLine: InputContent[] = [
      {
        role: 'user',
        parts: [
          { text: 'I am a student looking to learn about a new skill.' },
          {
            text: 'I am building a tree to organize the information I need to learn.',
          },
          {
            text: 'That looks good. I just want the JSON object, no extra text.',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          { text: 'I can help you with that.' },
          {
            text: `Does a structure like this work for you? {
             "skill" : { "subtopic1" : ["area1", "area2"], "subtopic2": ["area3", "area4"]`,
          },
          { text: 'Great to hear. What skill are you looking to learn about?' },
        ],
      },
    ];

    return {
      history: thoughtLine,
      prompt: prompt,
    };
  },

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

export default Prompts;
