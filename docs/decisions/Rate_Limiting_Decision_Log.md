# Rate Limiting Implementation

Status: **proposed** | rejected | accepted | deprecated | … | superseded by [Link](put down the link here)

***

## Goal
The goal of this spike is to evaluate and decide on a rate limiting implementation strategy for Linkta and to outline the steps needed for moving forward. 

Rate limiting is an integral part of modern applications that helps prevent malicious use such as Denial of Service (DoS) attacks and ensures fair use of our services. It is crucial to strike a balance between protecting our users and not overloading our servers with too many requests.

## How is Rate Limiting Typically Implemented? 
Rate limiting is typically implemented using a combination of techniques such as IP-based blocking, token-based authentication, and request-based throttling.

Common rate limiting algorithms include:
- [**Leaky Bucket**](https://en.wikipedia.org/wiki/Leaky_bucket): An algorithm that is considered the canonical way to implement rate limiting limits the number of requests a user can make within a certain time period.
- **Token Bucket**: A more advanced algorithm that uses tokens to track the number of requests a user can make within a certain time period.
- **Fixed Window**: A technique that limits the number of requests a user can make within a fixed time window.
- **Sliding Window**: A technique that limits the number of requests a user can make within a sliding time window.

## What do we need to rate limit in Linkta?
Rate limiting should impose reasonable limits on a user’s ability to send initial queries to create new learning flows.

## Options Explored
The primary decision is to reach for a service that implements a rate limiting algorithm that is easy to integrate with our existing infrastructure or to implement our own. Four services often used for rate limiting are (1) Redis, (2) NGINX, (3) Upstash, and (4) Express Rate Limit npm package.


### Redis
[Redis](https://redis.io/learn/howtos/ratelimiting/) is a popular choice for rate limiting due to its speed and efficiency in handling large volumes of requests. It uses in-memory data structures to store rate limit data, allowing for quick access and updates. Redis supports various rate limiting algorithms and can be easily integrated with Node.js applications. Redis can be installed and run natively or within Docker for simplified management and isolation. Introducting Redis directly would add complexity to the existing infrastructure and would require additional resources to manage the Redis instance.


### NGINX
NGINX is a high-performance web server and reverse proxy server that can be configured to handle rate limiting at the edge. By using NGINX, rate limiting can be enforced before requests reach the application server, reducing the load on the backend. It supports various rate limiting algorithms and is highly configurable. [Setting up NGINX  correctly can be complex](https://www.freecodecamp.org/news/nginx-rate-limiting-in-a-nutshell-128fe9e0126c/), but [research](https://stackoverflow.com/questions/50347618/express-rate-limit-vs-nginx-in-a-node-server) indicates that adding rate limiting is approximately 2 lines of code. 

### Upstash
Upstash provides a serverless, pay-per-use Redis service that simplifies the deployment and management of Redis instances.  The [free tier](https://upstash.com/pricing) seems generous and offers a pay-as-you-go model when usage scales. It offers built-in rate limiting features with different algorithms (fixed window, sliding window, token bucket) and additional functionalities like caching, optional timeouts, traffic protection, deny lists, and an analytics dashboard. Upstash is easy to integrate with Node.js applications and scales automatically. Its pay-per-use pricing model can be cost-effective for low-level usage, but costs may increase with higher traffic. While it offers many benefits, reliance on a third-party service introduces potential latency and dependency risks.

### Express Rate Limit
[Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) is a middleware for Express applications that provides simple and configurable rate limiting. It can be easily added to the existing Node.js and Express setup without the need for additional infrastructure. Express Rate Limit supports fixed window and sliding window algorithms and can be customized to suit various needs. However, it operates within the application layer, potentially adding overhead to the server and being less efficient for handling high volumes of requests compared to external solutions like Redis or NGINX.

## Considerations
We want to implement rate limiting in a manner that makes sense for Linkta. The considerations invovled in this decision include the following:
- Are we implementing a rate limiting solution that fits the needs of our application? 
- Is the chosen solution scalable and efficient for our needs?
- What is the complexity and additional cost of the proposed solution? 
  

## Challenges and Limitations
- Internal rate limiting solutions may struggle to handle high traffic efficiently.
- External rate limiting services may introduce latency and require additional maintenance.
- Cost considerations for external services like Upstash, especially with increasing usage.


## Decision
After evaluating the options, Express Rate Limit offers a straightforward setup to implement a standard rate limiting solution for Linkta. While some consider handling rate limiting within the application layer not to be ideal due to the potential overhead of handling large amounts of requests internally, the ease of use and minimal overhead make it an ideal option for now.  If/when Linkta scales to handle more traffic, the decision to move to a more robust rate limiting solution like Upstash can be considered at that time. 

***

## Resources and Updates
- [Rate Limiting Defined](https://redis.io/glossary/rate-limiting/)
- [Express vs. NGINX in a Node Server](https://stackoverflow.com/questions/50347618/express-rate-limit-vs-nginx-in-a-node-server)
