interface ValidationResult {
  success: boolean;
  message?: string
}

/**
 * Vérifie si les inputs de formulaire d'authentification sont correctes.
 * 
 * @param email 
 * @param password
 * @param dreamMemory
 */

export function areLoginInputsValid(email: string, password: string, dreamMemory?: string): ValidationResult {

  if (email == "" || password == "" || email == null || password == null || dreamMemory == null) return {success: false, message: "Please fill all the fields."}
  if (!email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")) return { success: false, message: "Invalid email, please try again."}
  if (password.length < 8 || password.length > 40 || email.length < 2 || email.length > 40) return {success: false,message: "Please respect the inputs length.",}

  return {success: true}
}