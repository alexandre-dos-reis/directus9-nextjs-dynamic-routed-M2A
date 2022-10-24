import Link from "next/link";
import { PageTree } from "src/functions";

interface Props {
  pagesTree: PageTree[];
}

export const Tree = ({ pagesTree }: Props) => {
  return (
    <ul>
      {pagesTree.map((p) => (
        <>
          <li key={p.id}>
            {p.status === "published" ? (
              <Link href={p.paths?.join("/")!}>{p.url}</Link>
            ) : (
              <div>{p.url}</div>
            )}
          </li>
          {p.branches && <Tree pagesTree={p.branches} />}
        </>
      ))}
    </ul>
  );
};
