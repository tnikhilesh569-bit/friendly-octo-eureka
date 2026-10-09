import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true 
});

/**
 * Generates a secure, signed upload timestamp and signature for client-side uploads 
 * ensuring only authenticated app users can push media.
 */
export const generateSecureSignatures = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, source: 'uw' },
    process.env.CLOUDINARY_API_SECRET!
  );
  return { timestamp, signature };
};

/**
 * Generates a private, time-limited authenticated URL for sensitive encrypted media.
 */
export const getSecurePrivateAssetUrl = (publicId: string, resourceType: 'image' | 'video' | 'raw' = 'image') => {
  return cloudinary.url(publicId, {
    resource_type: resourceType,
    secure: true,
    sign_url: true,
    type: 'authenticated',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expire_at: Math.floor(Date.now() / 1000) + 3600 // Valid for 1 hour
  });
};
