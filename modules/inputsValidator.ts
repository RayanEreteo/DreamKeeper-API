interface ValidationResult {
  success: boolean;
  message?: string
}

/**
 * Verifie si les inputs de formulaire d'authentification sont correctes.
 * 
 * @param email 
 * @param password
 * @param dreamMemory
 */


// TODO : Ajouter la verification de dreamMemory
export function areInputsValid(email: string, password: string, dreamMemory?: string): ValidationResult {
  if (email == "" || password == "" || email == null || password == null || dreamMemory == null) return {success: false, message: "Please fill all the fields."}
  if (!email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")) return { success: false, message: "Invalid email, please try again."}
  if (password.length > 40 || email.length > 40) return {success: false,message: "Please respect the inputs max length.",}

  return {success: true}
}