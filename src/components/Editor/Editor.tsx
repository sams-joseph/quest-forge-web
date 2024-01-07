import React, { forwardRef, useMemo } from "react";
import {
  MDXEditor,
  markdownShortcutPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
  linkDialogPlugin,
} from "@mdxeditor/editor";
import { headingsPlugin } from "@mdxeditor/editor/plugins/headings";
import { quotePlugin } from "@mdxeditor/editor/plugins/quote";
import { listsPlugin } from "@mdxeditor/editor/plugins/lists";
import { linkPlugin } from "@mdxeditor/editor/plugins/link";

import "@mdxeditor/editor/style.css";

const Editor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => {
  const plugins = useMemo(() => {
    return [
      headingsPlugin(),
      markdownShortcutPlugin(),
      linkDialogPlugin(),
      quotePlugin(),
      listsPlugin(),
      linkPlugin(),
    ];
  }, [props]);

  return (
    <MDXEditor
      ref={ref}
      className="dark-theme dark-editor"
      contentEditableClassName="prose dark:prose-invert max-w-none"
      plugins={plugins}
      {...props}
    />
  );
});

export default Editor;
