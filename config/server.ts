export default ({ env }) => {
  const publicUrl = env('PUBLIC_URL');
  const uploadsPublicBaseUrl = env(
    'UPLOADS_PUBLIC_BASE_URL',
    publicUrl ? `${publicUrl.replace(/\/+$/, '')}/uploads` : undefined
  );

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1338),
    url: publicUrl,
    uploadsPublicBaseUrl,
    app: {
      keys: env.array('APP_KEYS'),
    },
  };
};
