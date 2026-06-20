/**
 * Fallback image pool for blog posts that don't have a featured_image set.
 *
 * All images are from Pexels (free, no attribution required under Pexels licence).
 * The pool covers a variety of automotive subjects: SUVs, sedans, interiors,
 * engine bays, traffic, roads, workshops, and dashboards — suitable for a
 * Nigerian automotive editorial context.
 *
 * Images are assigned deterministically from the post slug so the same post
 * always gets the same image, and different posts get different images.
 */

const FALLBACK_IMAGES = [
  'https://images.pexels.com/photos/12681060/pexels-photo-12681060.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/8498039/pexels-photo-8498039.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/16775823/pexels-photo-16775823.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/29352868/pexels-photo-29352868.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/8586689/pexels-photo-8586689.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/25637367/pexels-photo-25637367.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/5374428/pexels-photo-5374428.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/36542646/pexels-photo-36542646.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/35828311/pexels-photo-35828311.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/26834313/pexels-photo-26834313.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/16505294/pexels-photo-16505294.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/3264504/pexels-photo-3264504.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/18352737/pexels-photo-18352737.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/18254981/pexels-photo-18254981.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/12161799/pexels-photo-12161799.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/6870324/pexels-photo-6870324.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/16350113/pexels-photo-16350113.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/12565887/pexels-photo-12565887.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/9702356/pexels-photo-9702356.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/19316821/pexels-photo-19316821.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/31732759/pexels-photo-31732759.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/14359158/pexels-photo-14359158.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

/**
 * Returns a fallback image URL for a given post slug.
 * The same slug always resolves to the same image (deterministic),
 * but different slugs will typically resolve to different images.
 */
function slugToIndex(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0; // unsigned 32-bit
  }
  return hash % FALLBACK_IMAGES.length;
}

export function getBlogFallbackImage(slug: string): string {
  return FALLBACK_IMAGES[slugToIndex(slug)];
  }
  
