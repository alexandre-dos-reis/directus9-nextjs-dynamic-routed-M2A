import { Tree } from "components/Tree";
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { generateTreeAndPaths } from "src/functions";
import { Page } from "src/types";

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pages: Page[] = await fetch("http://localhost:8080/items/page")
    .then((res) => res.json())
    .then((data) => data.data);

  const [, paths] = generateTreeAndPaths(pages);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const pages: Page[] = await fetch("http://localhost:8080/items/page")
    .then((res) => res.json())
    .then((data) => data.data);

  const [tree] = generateTreeAndPaths(pages);

  return {
    props: {
      paths: ctx.params?.paths as string[],
      tree,
    },
  };
};

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ paths, tree }) => {
  return (
    <div>
      <div>{paths.join("/")}</div>
      <Tree pagesTree={tree} />
    </div>
  );
};

export default Index;
