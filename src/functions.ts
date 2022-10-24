import { GetStaticPathsResult } from "next";
import { Page } from "./types";

export interface PageTree extends Page {
  branches?: PageTree[];
  paths?: string[];
}

export function generateTreeAndPaths(
  pages: PageTree[]
): [PageTree[], GetStaticPathsResult["paths"]] {
  const tree: PageTree[] = [];

  pages.forEach((p) => {
    if (p.foreign_key === null) {
      p.paths = [p.url];
      tree.push(p);
    } else {
      const parent = pages.find((x) => x.id === p.foreign_key) as PageTree;
      p.paths = [...(parent.paths || [parent.url]), p.url];
      parent.branches = [...(parent.branches || []), p];
    }
  });

  const paths = pages
    .filter((p) => p.status === "published")
    .map((p) => {
      return { params: { paths: p.paths } };
    });

  return [tree, paths];
}
