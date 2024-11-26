// Function to get URL parameters
export function getQueryParam(param) {
      var params = new URLSearchParams(window.location.search);
      return params.get(param);
    }

export function getQueryParamInt(param) {
    return parseInt(getQueryParam(param), 10)
}

// Format date as YYYY-MM-DD
export function formatDate(days) {
    var targetDate = new Date(today);
    targetDate.setDate(today.getDate() - days);
    var year = targetDate.getFullYear();
    var month = ("0" + (targetDate.getMonth() + 1)).slice(-2);
    var day = ("0" + targetDate.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}


export function extract(args) {
    results = {};
    for (let key in Object.keys(args)) {
        if (args[key] instanceof Number) {
            results[key] = getQueryParamInt(key);
        } else if (args[key] instanceof Boolean) {
            results[key] = getQueryParam(key) !== 'false';
        } else {
            results[key] = getQueryParam(key);
        }
    }
    return results;
}

export function start() {
    // Get parameters from URL
    var owner = getQueryParam('owner');
    var repo = getQueryParam('repo');
    var tag = getQueryParam('tag');
    var createdDays = parseInt(getQueryParam('created-since-days'), 10);
    var updatedDays = parseInt(getQueryParam('updated-since-days'), 10);
    var closedDays = parseInt(getQueryParam('closed-since-days'), 10);
    var isOpen = getQueryParam('is-open') !== 'false'; // Default to true

    let defaultParams = {
        'owner': undefined,
        'repo': undefined,
        'tag': undefined,
        'created-since-days': 14,
        'updated-since-days': 14,
        'closed-since-days': 14,
        'is-open': false,
    }

    let params = extract(defaultParams);



    // Check for required parameters
    if (!params['owner'] || !params['repo'] || (isNaN(params['created-since-days']) && isNaN(params['updated-since-days']) && isNaN(params['closed-since-days']))) {
      return;
    }

    // Get the current date
    let today = new Date();
    let formattedToday = formatDate(today);

    // Construct the URL with the dynamic date and parameters
    let query = `is%3Aissue+is%3A${isOpen ? 'open' : 'closed'}`;
    if (tag) {
      query += `+label%3A${tag}`;
    }
    let urlEncodedGreaterThan = '%3E';
    if (!isNaN(createdDays)) {
      query += `+created%3A${urlEncodedGreaterThan}${formatDate(createdDays)}`;
    }
    if (!isNaN(updatedDays)) {
      query += `+updated%3A${urlEncodedGreaterThan}${formatDate(updatedDays)}`;
    }
    if (!isNaN(closedDays)) {
      query += `+closed%3A${urlEncodedGreaterThan}${formatDate(closedDays)}`;
    }

    var redirectUrl = `https://github.com/${owner}/${repo}/issues?q=${query}`;
    return redirectUrl;
}