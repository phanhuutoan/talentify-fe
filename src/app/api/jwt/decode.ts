function decodeBearerToken(token: string) {
    try {
      if (!token.startsWith("Bearer ")) {
        throw new Error("Invalid Bearer token format");
      }
  
      const jwt = token.slice(7); // Remove "Bearer " prefix
      const payloadBase64 = jwt.split(".")[1]; // Extract the payload part
      if (!payloadBase64) {
        throw new Error("Invalid JWT format");
      }
  
      const decodedPayload = JSON.parse(atob(payloadBase64)); // Decode Base64 and parse JSON
      return decodedPayload;
    } catch (error) {
      console.error("Failed to decode Bearer token:", error);
      return null;
    }
  }