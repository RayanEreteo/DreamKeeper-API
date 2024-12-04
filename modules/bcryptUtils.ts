import bcrypt from "bcrypt";

/**
 * Encrypt un mot de passe est retourne le mot de passe hashé
 *
 *  @param {string} plain
 *  @returns {Promise}
*/

export async function encrypt(plain: string): Promise<any> {
  try {
    // Géneration du sel
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(plain, salt)

    return hashedPass;
  } catch (error) {
    console.log(error)
  }
}

/**
 * Verifie si le mot de passe est correct et retourne un boolean
 */
export async function checkHash(plain: string, hash: string): Promise<Boolean>{
  const isPasswordCorrect = await bcrypt.compare(plain, hash).catch((err) => {
    throw err
  })
  
  return isPasswordCorrect
}