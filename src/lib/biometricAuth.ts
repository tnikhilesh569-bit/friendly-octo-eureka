// WebAuthn API wrapper for Native Biometric Authentication (Touch ID / Face ID / Windows Hello)

export const isBiometricSupported = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  return window.PublicKeyCredential && 
    await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
};

/**
 * Register a new biometric credential for the user
 */
export async function registerBiometricDevice(userId: string, username: string) {
  try {
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
      challenge,
      rp: {
        name: "Lumi Luxury App",
        id: window.location.hostname,
      },
      user: {
        id: Uint8Array.from(userId, c => c.charCodeAt(0)),
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }, { alg: -257, type: "public-key" }],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
        residentKey: "preferred",
      },
      timeout: 60000,
      attestation: "direct"
    };

    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    }) as PublicKeyCredential;

    return { success: true, credentialId: credential.id };
  } catch (error) {
    console.error("Biometric Registration Failed:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Authenticate existing user via Biometrics
 */
export async function authenticateWithBiometric() {
  try {
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
      challenge,
      timeout: 60000,
      userVerification: "required",
      rpId: window.location.hostname,
    };

    const assertion = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions
    }) as PublicKeyCredential;

    if (assertion) {
      return { success: true, message: "Biometric authentication verified successfully." };
    }
    return { success: false, message: "Authentication failed." };
  } catch (error) {
    console.error("Biometric Login Failed:", error);
    return { success: false, error: error instanceof Error ? error.message : "Authentication cancelled or failed" };
  }
}
