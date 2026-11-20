// Cloudflare Pages Function: sends every duplicate address of the site to the one real domain with a permanent (301) redirect.
// Needed for product-house-site.pages.dev, which Cloudflare serves as a full copy of the site and cannot be redirected from _redirects.
const CANONICAL = "producthousesa.com";
const DUPLICATE_HOSTS = new Set([
  "product-house-site.pages.dev",
  "www.producthousesa.com",
  "producthousetrading.com",
  "www.producthousetrading.com",
]);

export const onRequest = async ({ request, next }: { request: Request; next: () => Promise<Response> }) => {
  const url = new URL(request.url);
  if (DUPLICATE_HOSTS.has(url.hostname)) {
    return Response.redirect(`https://${CANONICAL}${url.pathname}${url.search}`, 301);
  }
  return next();
};
