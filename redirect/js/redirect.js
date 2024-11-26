// Function to get URL parameters
function getQueryParam(param) {
  let params = new URLSearchParams(window.location.search);
  let value = params.get(param);
  return value;
}

function getQueryParamInt(param) {
  return parseInt(getQueryParam(param), 10);
}

// Format date as YYYY-MM-DD
function formatDaysSince(days) {
  let today = new Date();
  let targetDate = new Date();
  targetDate.setDate(today.getDate() - days);
  let year = targetDate.getFullYear();
  let month = ("0" + (targetDate.getMonth() + 1)).slice(-2);
  let day = ("0" + targetDate.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

export function extract(args) {
  let results = {};
  for (let key of Object.keys(args)) {
    if (args[key].type === "number") {
      results[key] = getQueryParamInt(key);
    } else if (args[key].type === "boolean") {
      results[key] = getQueryParam(key) !== "false";
    } else {
      results[key] = getQueryParam(key);
    }
  }
  return results;
};

// Construct the URL with the dynamic date and parameters
export function createRedirUrl(type, params) {
  // Get the current date
  let query = filter("is", type);
  query += "+" + filter("is", params["is-open"] ? "open" : "closed");
  if (params["tag"]) {
    query += "+" + filter("label", params["tag"]);
  }

  query += filterDate("created", params["created-since-days"], ">");
  query += filterDate("updated", params["updated-since-days"], ">");
  query += filterDate("merged", params["merged-since-days"], ">");
  query += filterDate("closed", params["closed-since-days"], ">");

  let redirectUrl = `https://github.com/${params["owner"]}/${params["repo"]}/issues?q=${query}`;
  return redirectUrl;
};

function filterDate(verb, value, op) {
  if (isNaN(value)) {
    return "";
  }
  return "+" + filter(verb, formatDaysSince(value), op);
}

function filter(name, value, op) {
  let urlEncodedGreaterThan = "%3E";
  let urlEncodedColon = "%3A";
  let opStr;
  switch (op) {
    case ">":
      opStr = urlEncodedGreaterThan;
      break;
    case undefined:
      opStr = "";
      break;
    default:
      throw "Unexpected operation " + op;
  }
  return `${name}${urlEncodedColon}${opStr}${value}`;
}

export function generateParamsHTML(params) {
  let html = "<ul>\n";
  for (let paramName in params) {
    let param = params[paramName];
    let desc = param.description || "";
    let exampleValue = param.exampleValue || "";
    let optionalText = param.optional ? " (optional" : "";
    if (param.defaultValue) {
      optionalText += `, defaults to ${param.defaultValue}`;
    }
    if (optionalText) {
      optionalText += ")";
    }

    // Build the example text
    let exampleText = exampleValue
      ? `<i>Example: ${paramName}=${exampleValue}</i>`
      : "";

    // Combine description and example
    let paramText = `  <li><b>${paramName}</b>: ${desc}`;
    if (exampleText || optionalText) {
      paramText += " ";
    }
    if (exampleText) {
      paramText += `${exampleText}`;
    }
    if (optionalText) {
      paramText += ` ${optionalText}`;
    }
    paramText += `</li>\n`;

    html += paramText;
  }
  html += "</ul>";

  let headerElement = document.querySelector("#Parameters");
  if (headerElement) {
    // Create a temporary container to hold the HTML
    let tempContainer = document.createElement("div");
    tempContainer.innerHTML = html;

    // Insert the new elements after the header
    headerElement.parentNode.insertBefore(
      tempContainer,
      headerElement.nextSibling
    );
  }
}