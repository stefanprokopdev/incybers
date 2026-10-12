import type { IconName } from '@fortawesome/fontawesome-svg-core';

export type { IconName };

type IconPrefix = 'fas' | 'far' | 'fal' | 'fat' | 'fad' | 'fab' | 'fak';

/**
 * Returns the icon prop for FontAwesomeIcon (solid style).
 * Use as: <FontAwesomeIcon icon={faSolid('chevron-right')} />
 */
export function faSolid(name: IconName): [IconPrefix, IconName] {
  return ['fas', name];
}
