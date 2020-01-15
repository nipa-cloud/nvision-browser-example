# nvision-browser-example
> An example on how to integrate `@nipacloud/nvision` SDK to the frontend app.

Nvision: Nipa.Cloud Visual-based Machine Learning Services

Nvision enables machine learning services to extract insightful information from images with simple and easy to use APIs. Provide real-time video analysis with stream processing service. Get the most out of your visual information with the help of Nipa.Cloud experts. Offer fully customized algorithms to your specifications. [Learn more](https://docs.nipa.cloud/article-categories/nvision/).

Nvision image processing is synchronous. The input requests and output responses are structured in JSON format. You can make a RESTful API call by sending the image as a base64 encoded string in the body of your request, see RESTful and WebSocket API concepts.

## How to run this project
```
yarn install
yarn serve
```

## TypesScript
Nvision SDK comes with built-in TypeScript definition 

## To setup the SDK with webpack
1. install the SDK from NPM
```bash
npm install @nipacloud/nvision # or
yarn add @nipacloud/nvision 
```
2. Configure webpack alias to point to the browser variant of the library
```js
{
  ...
  resolve: {
    alias: {
      "@nipacloud/nvision": "@nipacloud/nvision/dist/browser/nvision.js"
    }
  }
  ...
}
```