import { createRedirUrl, extract, generateParamsHTML } from "./redirect.js";

let defaultParams = {
  owner: {
    description:
      "The GitHub username or organization that owns the repository.",
    exampleValue: "opensearch-project",
    type: "string",
  },
  repo: {
    description: "The name of the GitHub repository.",
    exampleValue: "OpenSearch",
    type: "string",
  },
  tag: {
    description: "The label used to filter issues.",
    exampleValue: "untriaged",
    optional: true,
    type: "string",
  },
  "created-since-days": {
    description:
      "The number of days back from today to filter by creation date.",
    exampleValue: "14",
    type: "number",
  },
  "updated-since-days": {
    description:
      "The number of days back from today to filter by last update date.",
    exampleValue: "14",
    type: "number",
  },
  "merged-since-days": {
    description:
      "The number of days back from today to filter by merged date. ",
    exampleValue: "14",
    type: "number",
  },
  "closed-since-days": {
    description: "The number of days back from today to filter by closed date.",
    exampleValue: "14",
    type: "number",
  },
  "is-open": {
    description: "",
    exampleValue: "",
    optional: true,
    type: "boolean",
  },
};

export function createUrl(params) {
  return createRedirUrl("pr", params);
}

export function prCheckAndRedirect() {
  let params = extract(defaultParams);
  // Check for required parameters
  if (!params["owner"]) {
    console.warn("No owner found");
    return;
  }
  if (!params["repo"]) {
    console.warn("No repo found");
    return;
  }
  if (
    isNaN(params["created-since-days"]) &&
    isNaN(params["updated-since-days"]) &&
    isNaN(params["merged-since-days"]) &&
    isNaN(params["closed-since-days"])
  ) {
    console.warn("No *-since-days found");
    return;
  }
  let url = createUrl(params);
  if (url) {
    window.location.href = url;
  }
  return url;
};

document.addEventListener("DOMContentLoaded", () => {
  prCheckAndRedirect();
  generateParamsHTML(defaultParams);
});
