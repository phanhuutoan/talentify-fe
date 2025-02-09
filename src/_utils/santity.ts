/* eslint-disable @typescript-eslint/no-explicit-any */
const defaults = { nonTextBehavior: "remove" };

export function blocksToText(blocks: any[], opts = {}) {
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return options.nonTextBehavior === "remove"
          ? ""
          : `[${block._type} block]`;
      }

      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
}
