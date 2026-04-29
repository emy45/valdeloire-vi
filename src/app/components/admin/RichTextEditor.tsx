import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useState, useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Code2,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from "lucide-react";
import { MediaLibraryModal } from "./MediaLibraryModal";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      disabled={disabled}
      className={`p-1.5 rounded transition-colors text-sm ${
        active
          ? "bg-[#001e40] text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      } disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

function Separator() {
  return <div className="w-px h-5 bg-slate-200 mx-1" />;
}

export function RichTextEditor({ value, onChange }: Props) {
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [sourceContent, setSourceContent] = useState("");
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: false,
        underline: false,
      }),
      Underline,
      ImageExtension.configure({
        HTMLAttributes: { class: "w-full rounded-xl my-4 shadow" },
      }),
      LinkExtension.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Rédigez votre article ici…" }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      if (!isSourceMode) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: "article-content outline-none min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  // Sync incoming value (e.g. on initial article load)
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() === value) return;
    editor.commands.setContent(value || "");
  }, [value]);

  const handleEnterSource = useCallback(() => {
    if (!editor) return;
    setSourceContent(editor.getHTML());
    setIsSourceMode(true);
  }, [editor]);

  const handleExitSource = useCallback(() => {
    if (!editor) return;
    editor.commands.setContent(sourceContent);
    onChange(sourceContent);
    setIsSourceMode(false);
  }, [editor, sourceContent, onChange]);

  const handleInsertImage = useCallback(
    (url: string) => {
      editor?.chain().focus().setImage({ src: url }).run();
      setIsMediaModalOpen(false);
    },
    [editor]
  );

  const handleSetLink = useCallback(() => {
    if (!editor) return;
    const current = editor.getAttributes("link").href || "";
    const url = window.prompt("URL du lien", current);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#001e40]">
      {/* Toolbar */}
      <div className="flex items-center flex-wrap gap-0.5 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
        {/* Headings */}
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor?.isActive("heading", { level: 2 })}
          title="Titre H2"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor?.isActive("heading", { level: 3 })}
          title="Titre H3"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          active={editor?.isActive("bold")}
          title="Gras (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          active={editor?.isActive("italic")}
          title="Italique (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          active={editor?.isActive("underline")}
          title="Souligné (Ctrl+U)"
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          active={editor?.isActive("bulletList")}
          title="Liste à puces"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          active={editor?.isActive("orderedList")}
          title="Liste numérotée"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Blocks */}
        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          active={editor?.isActive("blockquote")}
          title="Citation"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          title="Séparateur horizontal"
        >
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Link & Image */}
        <ToolbarButton
          onClick={handleSetLink}
          active={editor?.isActive("link")}
          title="Insérer / modifier un lien"
        >
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setIsMediaModalOpen(true)}
          title="Insérer une image"
        >
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* History */}
        <ToolbarButton
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
          title="Annuler (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
          title="Rétablir (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <div className="ml-auto">
          {isSourceMode ? (
            <button
              type="button"
              onClick={handleExitSource}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#001e40] text-white text-xs font-medium rounded hover:bg-[#001429] transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              Visuel
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEnterSource}
              className="flex items-center gap-1.5 px-3 py-1 border border-slate-300 text-slate-600 text-xs font-medium rounded hover:bg-slate-100 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              HTML
            </button>
          )}
        </div>
      </div>

      {/* Editor area */}
      {isSourceMode ? (
        <textarea
          value={sourceContent}
          onChange={(e) => setSourceContent(e.target.value)}
          className="w-full min-h-[400px] p-4 font-mono text-sm text-slate-700 bg-slate-950 text-green-400 resize-none focus:outline-none"
          spellCheck={false}
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={handleInsertImage}
      />
    </div>
  );
}
