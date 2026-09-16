class ProviderError extends Error {

  constructor(
    message,
    code = "PROVIDER_ERROR",
    retryable = false
  ) {

    super(message);

    this.name =
      "ProviderError";

    this.code =
      code;

    this.retryable =
      retryable;
  }

}


module.exports = {
  ProviderError
};