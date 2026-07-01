import fs from "fs";
import path from "path";

const baseUrl = "https://www.sbce.ac.in";
const appDir = path.join(process.cwd(), "src", "app");

// Directories that exist under src/app but are not public routes
const EXCLUDED_SEGMENTS = new Set(["fonts", "test_home"]);

function isExcludedSegment(segment) {
  // Dynamic routes ([id]), route groups ((group)), and private folders (_lib)
  // don't correspond to a single crawlable URL, so they're left out of the
  // static sitemap.
  return (
    segment.startsWith("[") ||
    segment.startsWith("(") ||
    segment.startsWith("_") ||
    EXCLUDED_SEGMENTS.has(segment)
  );
}

function findPageFile(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .find((entry) => entry.isFile() && /^page\.(jsx|tsx|js|ts)$/.test(entry.name))
    ?.name;
}

function collectRoutes(dir, segments = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes = [];

  const pageFile = findPageFile(dir);
  if (pageFile) {
    routes.push({
      route: segments.length ? `/${segments.join("/")}` : "/",
      pageFilePath: path.join(dir, pageFile),
    });
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || isExcludedSegment(entry.name)) continue;
    routes.push(...collectRoutes(path.join(dir, entry.name), [...segments, entry.name]));
  }

  return routes;
}

export default function sitemap() {
  const routes = collectRoutes(appDir);

  return routes.map(({ route, pageFilePath }) => {
    const depth = route === "/" ? 0 : route.split("/").filter(Boolean).length;

    return {
      url: `${baseUrl}${route}`,
      lastModified: fs.statSync(pageFilePath).mtime,
      changeFrequency: depth <= 1 ? "weekly" : "monthly",
      priority: depth === 0 ? 1 : depth === 1 ? 0.8 : depth === 2 ? 0.6 : 0.4,
    };
  });
}
