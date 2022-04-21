class Connector {
  constructor(baseUrl) {
    this._baseUrl = baseUrl || "";
    this._successHandler = null;
    this._onRequestStart = null;
    this._onRequestEnd = null;
    this._headers = null;
    this._fetch = fetch || (window && window.fetch);
    this.Connector = this;
    this.joinWithBase = this.joinWithBase.bind(this);
    this._onRequestStartDelay = 0;
    this._runningRequest = false;
  }

  set fetch(fn) {
    this._fetch = fn;
    this._onRequestStartDelay = 0;
    this._runningRequest = false;
  }

  set onRequestStartDelay(time) {
    this._onRequestStartDelay = time;
  }

  set baseUrl(url) {
    this._baseUrl = url;
  }

  get baseUrl() {
    return this._baseUrl;
  }

  set headers(obj) {
    this._headers = obj;
  }

  get headers() {
    return this._headers;
  }

  async _handle404(response) {
    return response;
  }

  set handle404(fn) {
    this._handle404 = fn;
  }

  async _handle401(response) {
    return response;
  }

  set handle401(fn) {
    this._handle401 = fn;
  }

  async _handle403(response) {
    return response;
  }

  set handle403(fn) {
    this._handle403 = fn;
  }

  async _handleBadReq(response) {
    let errorResponse = await response.json();
    console.log(Object.values(errorResponse).join(", "));
  }

  set handleBadReq(fn) {
    this._handleBadReq = fn;
  }

  async _handle500() {
    console.log("Internal Server Error");
  }

  set handle500(fn) {
    this._handle500 = fn;
  }

  async _onNetworkError() {
    console.log("Network Error");
  }

  set onNetworkError(fn) {
    this._onNetworkError = fn;
  }

  async _handleNetworkError(options = {}) {
    if (options.onNetworkError) {
      return await options.onNetworkError();
    } else if (this._onNetworkError) {
      return await this._onNetworkError();
    }
  }

  async _errorHandler(response, options) {
    if (response.status === 404) {
      if (options.handle404) {
        return await options.handle404(response);
      } else {
        return await this._handle404(response);
      }
    }
    if (response.status === 403) {
      if (options.handle403) {
        return await options.handle403(response);
      } else {
        return await this._handle403(response);
      }
    }
    if (response.status === 401) {
      if (options.handle401) {
        return await options.handle401(response);
      } else {
        return await this._handle401(response);
      }
    } else if (response.status >= 400 && response.status < 500) {
      if (options.handleBadReq) {
        return await options.handleBadReq(response);
      } else {
        return await this._handleBadReq(response);
      }
    } else if (response >= 500) {
      if (options.handle500) {
        return await options.handle500(response);
      } else {
        return await this._handle500(response);
      }
    }
  }

  set errorHandler(fn) {
    this._errorHandler = fn;
  }

  set successHandler(fn) {
    this._successHandler = fn;
  }

  async _handleRequestStart(options) {
    this._runningRequest = true;

    setTimeout(async () => {
      if (this._runningRequest) {
        if (options.onRequestStart) {
          return await options.onRequestStart();
        } else if (this._onRequestStart) {
          return await this._onRequestStart();
        }
      }
    }, this._onRequestStartDelay);
  }

  set onRequestStart(fn) {
    this._onRequestStart = fn;
  }

  async _handleRequestEnd(options) {
    this._runningRequest = false;
    if (options.onRequestEnd) {
      return await options.onRequestEnd();
    } else if (this._onRequestEnd) {
      return await this._onRequestEnd();
    }
  }

  set onRequestEnd(fn) {
    this._onRequestEnd = fn;
  }

  async _handleResponse(response, options) {
    await this._handleRequestEnd(options);
    if (response.ok) {
      if (options.successHandler) {
        return await options.successHandler(response);
      } else if (this._successHandler) {
        return await this._successHandler(response);
      }

      return await response.json();
    } else {
      if (options.errorHandler && typeof options.errorHandler == "function") {
        return await options.errorHandler(response, options);
      } else if (this._errorHandler) {
        return await this._errorHandler(response, options);
      }
    }
  }

  /**
   *
   * @callback requestCallback
   * @param {Promise<object>} response
   */

  /**
   * send get request
   * @param {string} url - requset url, merges with base url property
   * @param {object} [options]
   * @param {object} [options.headers] - request headers, merges with existing headers
   * @param {boolean} options.removeContentType - remove content-type property from request headers
   * @param {requestCallback} options.successHandler - function to execute on success, default returns response.json();
   * @param {requestCallback} options.onRequestEnd - side effect to execute on request end
   * @param {requestCallback} options.errorHandler - function to execute on error
   * @param {requestCallback} options.handle500 - function to execute on 500 error
   * @param {requestCallback} options.handle404 - function to execute on 404 error
   * @param {requestCallback} options.handle401 - function to execute on 401 authorization error
   * @param {requestCallback} options.handle403 - function to execute on 403 authorization error
   * @param {requestCallback} options.handleBadReq - function to execute on error response between 400 to 499 excluding 404 and 401
   * @param {requestCallback} options.onNetworkError - function to execute on network error
   *
   * @return {Promise<object> | *} - fetch response object if success handler not passed, otherwise return from success handler
   */

  async get(url, options = {}) {
    await this._handleRequestStart(options);
    try {
      const response = await fetch(this.joinWithBase(url), {
        headers: {
          ...this._headers,
          ...options.headers,
          ...{
            "Content-type": "application/json",
            "Accept": "application/json",
          },
        },
      });

      return this._handleResponse(response, options);
    } catch (error) {
      this._handleNetworkError(options);
    }
  }

  async post(url, payload, options = {}) {
    await this._handleRequestStart(options);

    const reqOptions = {
      method: "POST",
      body: (options.encoder && options.encoder(payload)) ||
      JSON.stringify(payload),
      mode: "cors",
      headers: {
        ...this._headers,
        ...options.headers,
        ...{
          "Content-type": "application/json",
          "Accept": "application/json",
        },
      },
    };

    const response = await fetch(this.joinWithBase(url), reqOptions);

    return this._handleResponse(response, options);
  }

  async put(url, payload, options = {}) {
    await this._handleRequestStart(options);

    const reqOptions = {
      method: "PUT",
      body:
        (options.encoder && options.encoder(payload)) ||
        JSON.stringify(payload),
      mode: "cors",
      headers: {
        ...this._headers,
        ...options.headers,
        ...{
          "Content-type": "application/json",
          "Accept": "application/json",
        },
      },
    };

    if (options.removeContentType) delete reqOptions.headers["Content-type"];

    const response = await fetch(this.joinWithBase(url), reqOptions);

    return this._handleResponse(response, options);
  }

  async delete(url, options = {}) {
    await this._handleRequestStart(options);

    const reqOptions = {
      method: "DELETE",
      headers: {
        ...this._headers,
        ...options.headers,
        ...{
          "Content-type": "application/json",
          "Accept": "application/json",
        },
      },
    };

    const response = await fetch(this.joinWithBase(url), reqOptions);

    return this._handleResponse(response, options);
  }

  joinWithBase(url) {
    return Connector.joinUrl(this._baseUrl, url);
  }

  static joinUrl(baseUrl, relativeUrl) {
    console.log(baseUrl);
    return concatAndResolveUrl(baseUrl, relativeUrl);
  }
}

/**
 * remove trailing slash from url path
 * @param { string | Array<string> } url
 *
 *  @return { string | Array<string> } if array supplied as param will return array otherwise string
 */

function removeTrailingSlash(url) {
  let urlParts = Array.isArray(url) ? url : url.split("/");

  if (urlParts[urlParts.length - 1] !== "") {
    return Array.isArray(url) ? urlParts : urlParts.join("/");
  }

  urlParts.pop();

  let recResult = removeTrailingSlash(urlParts);

  return Array.isArray(url) ? recResult : recResult.join("/");
}

/**
 * remove leading slash from url path
 * @param { string | Array<string> } url
 *
 * @return { string | Array<string> } if array supplied as param will return array otherwise string
 */

function removeLeadingSlash(url) {
  let urlParts = Array.isArray(url) ? url : url.split("/");

  if (urlParts[0] !== "") {
    return Array.isArray(url) ? urlParts : urlParts.join("/");
  }

  urlParts.shift();

  let recResult = removeTrailingSlash(urlParts);

  return Array.isArray(url) ? recResult : recResult.join("/");
}

function concatAndResolveUrl(base, relative) {
  let baseParts = removeTrailingSlash(base.split("/"));
  let relativeParts = removeLeadingSlash(relative.split("/"));

  let url = [...baseParts, ...relativeParts];

  url.forEach((item, index) => {
    if (item === "..") {
      // abcd.com/../anything
      url.splice(index - 1, 1);
      url.splice(index - 1, 1);
    } else if (item === ".") {
      // abcd.com/./anything
      url.splice(index, 1);
    }
  });
  return url.join("/");
}

export default new Connector();
