import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

export function getAvatarUrl(seed: string): string {
  const avatar = createAvatar(avataaars, {
    seed,
    size: 128,
  });
  
  return avatar.toDataUri();
}
