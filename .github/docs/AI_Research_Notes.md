# Initial Research for LLM Selection
#### This research was conducted February 24th - 26th, 2024

## Goal
Find an LLM that we can prompt is order to build a study guide for our users.

We will want to build a tree with nodes relating to parts of the subject to study from the result of the LLM prompt.


## Limitations
1. The LLM must have a free tier.
2. The LLM should ideally have an API.
3. If there is a library we can use, JavaScript is the preferred language.

## Other Considerations
1. The number of daily/hourly tokens/requests available
2. If the LLM is not an API, the system requirements
3. Size of data training set
4. Is the LLM actively managed

## LLMs considered
1. Gemma
2. Gemini
3. ChatGPT (OpenAI)
4. Custom GPTs
5. LLaMa 2
6. Zephyr 7B
9. Falcon 180B

### Other LLMs briefly researched
1. BLOOM
2. BERT
3. OPT 175B
4. XGen 7B
5. GPT-NeoX
6. GPT-J
7. Vicuna-13B
8. MPT-7B
9. LAION

## Research Notes Summary
The first stage was to collect a number of LLMs to further research, which yielded the above results.

Gemma, much like the other LLMs I decided to research (there were over 100,000 models listed on HuggingFace,) wanted to be hosted locally or through HuggingFace.co. It was also written in Python, which would have required a Python back end.

Our team is more familiar with JavaScript, so this was a detraction from Gemma.

Gemini had a free tier, with 60 requests a minute per API key. It also had libraries for handling the API interface written for Node.js. This immediately moved Gemini to the top of the list.

ChatGPT, especially older models, had a small charge for ever 1,000 tokens. While cheap, it did not meet the requirements for a free tier. This could be more competitive when moving out of free tiers.

Custom GPTs are specialized models, specific to a task. They require a higher tier of ChatGPT than free in order to create. This violated the free requirement, but could also be useful in creating something more specific later.

LLaMa 2 is a model that needs to be deployed. This was the first introduction to LLM hosting. One of the largest hosting option, with over 100,000 models available, is HuggingFace. The model could also be hosted on AWS (Bedrock, EC2 Instance), Cloudflare (Workers AI), GCP (Model Garden), Kaggle, and a number of MS Azure options. Unfortunately, all of these options have associated costs.

It quickly became clear once I had moved through Zephyr 7B and Falcon 180B that the remaining LLMs were the same: either used through a hosting service, or deployed locally. Since locally deployed LLMs are hardware dependent, this greatly affected the free tier requirement. 

As far as hosting locally, since the speed of the generated text is tied to hardware, this would require higher server resources. When looking at Falcon-180B they had a line in their description stating "You will need <b>at least 400GB of memory</b> to switfly run inference with Falcon-180B" (emphasis theirs).

While other models may require fewer resources, it was clear at this point that good models would require more system resources than we were prepared to procure at this point.

Furthermore, many models are available as libraries written in Python. This would have required a Python back end in order to make use of these models locally.

## Final Decision

During our team discussion, we considered locally hosting a LLM model. As mentioned above, since locally deployed LLMs are hardware dependent, this increases the server costs and moves these models from being "free".

Since Gemini satisfied the requirements (currently free, used through an API, has JS library), this was easily the top contender. 

There weren't any other contenders at this time that satisfied all the requirements. In the event that Gemini begins having an associated cost, all of these options should be revisited. The landscape is changing rapidly at this time. Even if intense research were conducted at this time, by the time we need to consider moving to a different LLM option, the options and their associated costs will likely be very different.