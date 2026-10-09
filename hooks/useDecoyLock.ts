import { useState } from 'react';

export function useDecoyLock() {
  const [isLocked, setIsLocked] = useState(true);
  const [isDecoyMode, setIsDecoyMode] = useState(false);

  const unlock = (pin: string) => {
    if (pin === '1234') { // Master PIN
      setIsDecoyMode(false);
      setIsLocked(false);
      return true;
    } else if (pin === '9999') { // Decoy PIN
      setIsDecoyMode(true);
      setIsLocked(false);
      return true;
    }
    return false;
  };

  const lock = () => setIsLocked(true);

  return { isLocked, isDecoyMode, unlock, lock };
}
