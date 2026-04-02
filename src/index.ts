import type { Core } from '@strapi/strapi';
import { async as strapiAsync, traverseEntity } from '@strapi/utils';

const FILE_MODEL_UID = 'plugin::upload.file';
const LOCAL_UPLOADS_PREFIX = '/uploads';

type UploadFile = {
  url?: string;
  formats?: Record<string, UploadFile>;
};

const isAbsoluteUrl = (value: string) => /^(?:https?:)?\/\//i.test(value);

const normalizeUploadsPublicBaseUrl = (value: string) => value.replace(/\/+$/, '');

const buildPublicUploadUrl = (baseUrl: string, fileUrl?: string) => {
  if (!fileUrl || isAbsoluteUrl(fileUrl)) {
    return fileUrl;
  }

  const normalizedBaseUrl = normalizeUploadsPublicBaseUrl(baseUrl);

  if (fileUrl.startsWith(LOCAL_UPLOADS_PREFIX)) {
    return `${normalizedBaseUrl}${fileUrl.slice(LOCAL_UPLOADS_PREFIX.length)}`;
  }

  return `${normalizedBaseUrl}${fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`}`;
};

const rewriteUploadUrls = (file: UploadFile | null | undefined, baseUrl: string) => {
  if (!file) {
    return file;
  }

  if (file.url) {
    file.url = buildPublicUploadUrl(baseUrl, file.url);
  }

  if (file.formats) {
    Object.values(file.formats).forEach((format) => rewriteUploadUrls(format, baseUrl));
  }

  return file;
};

const rewriteEntityMedia = async (strapi: Core.Strapi, entity: unknown, uid: string) => {
  if (!entity) {
    return entity;
  }

  const fileService = strapi.plugin('upload').service('file') as any;

  if (uid === FILE_MODEL_UID) {
    return fileService.signFileUrls(entity);
  }

  const model = strapi.getModel(uid as any);

  return traverseEntity(
    async ({ key, value, attribute }, { set }) => {
      if (!attribute || attribute.type !== 'media' || !value) {
        return;
      }

      if (attribute.multiple) {
        const signedFiles = await strapiAsync.map(value, fileService.signFileUrls);
        set(key, signedFiles);
        return;
      }

      const signedFile = await fileService.signFileUrls(value);
      set(key, signedFile);
    },
    {
      schema: model,
      getModel: strapi.getModel.bind(strapi),
    },
    entity as any
  );
};

const rewriteDocumentResult = async (strapi: Core.Strapi, result: unknown, uid: string) => {
  if (!result) {
    return result;
  }

  if (Array.isArray(result)) {
    return strapiAsync.map(result, (entry) => rewriteEntityMedia(strapi, entry, uid));
  }

  if (
    typeof result === 'object' &&
    result !== null &&
    'entries' in result &&
    Array.isArray((result as { entries?: unknown[] }).entries)
  ) {
    return {
      ...(result as Record<string, unknown>),
      entries: await strapiAsync.map(
        (result as { entries: unknown[] }).entries,
        (entry) => rewriteEntityMedia(strapi, entry, uid)
      ),
    };
  }

  return rewriteEntityMedia(strapi, result, uid);
};

export default {
  register() {},

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const uploadsPublicBaseUrl = strapi.config.get<string>('server.uploadsPublicBaseUrl');

    if (!uploadsPublicBaseUrl) {
      return;
    }

    const provider = strapi.plugin('upload').provider as any;
    const fileService = strapi.plugin('upload').service('file') as any;

    if (provider.upload) {
      const originalUpload = provider.upload.bind(provider);

      provider.upload = async (file: UploadFile, options?: unknown) => {
        await originalUpload(file, options);
        rewriteUploadUrls(file, uploadsPublicBaseUrl);
      };
    }

    if (provider.uploadStream) {
      const originalUploadStream = provider.uploadStream.bind(provider);

      provider.uploadStream = async (file: UploadFile, options?: unknown) => {
        await originalUploadStream(file, options);
        rewriteUploadUrls(file, uploadsPublicBaseUrl);
      };
    }

    const originalSignFileUrls = fileService.signFileUrls.bind(fileService);

    fileService.signFileUrls = async (file: UploadFile) => {
      const signedFile = await originalSignFileUrls(file);
      return rewriteUploadUrls(signedFile, uploadsPublicBaseUrl);
    };

    strapi.documents.use(async (ctx, next) => {
      const result = await next();
      return rewriteDocumentResult(strapi, result, ctx.uid);
    });
  },
};
