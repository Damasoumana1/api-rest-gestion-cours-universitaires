class ApiResponse {
  static success(res, message, data = null, statusCode = 200) {
    const response = {
      success: true,
      message
    };
    if (data !== null) {
      response.data = data;
    }
    return res.status(statusCode).json(response);
  }

  // Format d'erreur standard conforme au TP (RFC / bonnes pratiques REST)
  static error(res, message, statusCode = 400) {
    return res.status(statusCode).json({
      error: message,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = ApiResponse;
