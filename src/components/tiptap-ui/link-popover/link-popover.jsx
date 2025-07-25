import * as React from "react"
import { isNodeSelection } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "../../../hooks/use-tiptap-editor"

// --- Icons ---
import { CornerDownLeftIcon } from "../../tiptap-icons/corner-down-left-icon"
import { ExternalLinkIcon } from "../../tiptap-icons/external-link-icon"
import { LinkIcon } from "../../tiptap-icons/link-icon"
import { TrashIcon } from "../../tiptap-icons/trash-icon"

// --- Lib ---
import { isMarkInSchema } from "../../../lib/tiptap-utils"

import { Button } from "../../tiptap-ui-primitive/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../tiptap-ui-primitive/popover"
import { Separator } from "../../tiptap-ui-primitive/separator"

// --- Styles ---
import "./link-popover.scss"

export const useLinkHandler = (props) => {
  const { editor, onSetLink, onLinkActive } = props
  const [url, setUrl] = React.useState("")

  React.useEffect(() => {
    if (!editor) return

    // Get URL immediately on mount
    const { href } = editor.getAttributes("link")

    if (editor.isActive("link") && !url) {
      setUrl(href || "")
      onLinkActive?.()
    }
  }, [editor, onLinkActive, url])

  React.useEffect(() => {
    if (!editor) return

    const updateLinkState = () => {
      const { href } = editor.getAttributes("link")
      setUrl(href || "")

      if (editor.isActive("link") && !url) {
        onLinkActive?.()
      }
    }

    editor.on("selectionUpdate", updateLinkState)
    return () => {
      editor.off("selectionUpdate", updateLinkState)
    };
  }, [editor, onLinkActive, url])

  const setLink = React.useCallback(() => {
    if (!url || !editor) return

    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to)

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .insertContent({
        type: "text",
        text: text || url,
        marks: [{ type: "link", attrs: { href: url } }],
      })
      .run()

    onSetLink?.()
  }, [editor, onSetLink, url])

  const removeLink = React.useCallback(() => {
    if (!editor) return
    editor
      .chain()
      .focus()
      .unsetMark("link", { extendEmptyMarkRange: true })
      .setMeta("preventAutolink", true)
      .run()
    setUrl("")
  }, [editor])

  return {
    url,
    setUrl,
    setLink,
    removeLink,
    isActive: editor?.isActive("link") || false,
  };
}

export const LinkButton = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <Button
      type="button"
      className={className}
      data-style="ghost"
      role="button"
      tabIndex={-1}
      aria-label="Link"
      tooltip="Link"
      ref={ref}
      {...props}>
      {children || <LinkIcon className="tiptap-button-icon" />}
    </Button>
  );
})

export const LinkContent = ({ editor: providedEditor }) => {
  const editor = useTiptapEditor(providedEditor)

  const linkHandler = useLinkHandler({
    editor: editor,
  })

  return <LinkMain {...linkHandler} />;
}

const LinkMain = ({
  url,
  setUrl,
  setLink,
  removeLink,
  isActive,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      setLink()
    }
  }

  return (
    <>
      <input
        type="url"
        placeholder="Paste a link..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        className="tiptap-input tiptap-input-clamp" />
      <div className="tiptap-button-group" data-orientation="horizontal">
        <Button
          type="button"
          onClick={setLink}
          title="Apply link"
          disabled={!url && !isActive}
          data-style="ghost">
          <CornerDownLeftIcon className="tiptap-button-icon" />
        </Button>
      </div>
      <Separator />
      <div className="tiptap-button-group" data-orientation="horizontal">
        <Button
          type="button"
          onClick={() => window.open(url, "_blank")}
          title="Open in new window"
          disabled={!url && !isActive}
          data-style="ghost">
          <ExternalLinkIcon className="tiptap-button-icon" />
        </Button>

        <Button
          type="button"
          onClick={removeLink}
          title="Remove link"
          disabled={!url && !isActive}
          data-style="ghost">
          <TrashIcon className="tiptap-button-icon" />
        </Button>
      </div>
    </>
  );
}

export function LinkPopover({
  editor: providedEditor,
  hideWhenUnavailable = false,
  onOpenChange,
  autoOpenOnLinkActive = true,
  ...props
}) {
  const editor = useTiptapEditor(providedEditor)

  const linkInSchema = isMarkInSchema("link", editor)

  const [isOpen, setIsOpen] = React.useState(false)

  const onSetLink = () => {
    setIsOpen(false)
  }

  const onLinkActive = () => setIsOpen(autoOpenOnLinkActive)

  const linkHandler = useLinkHandler({
    editor: editor,
    onSetLink,
    onLinkActive,
  })

  const isDisabled = React.useMemo(() => {
    if (!editor) return true
    if (editor.isActive("codeBlock")) return true
    return !editor.can().setLink?.({ href: "" });
  }, [editor])

  const canSetLink = React.useMemo(() => {
    if (!editor) return false
    try {
      return editor.can().setMark("link");
    } catch {
      return false
    }
  }, [editor])

  const isActive = editor?.isActive("link") ?? false

  const handleOnOpenChange = React.useCallback((nextIsOpen) => {
    setIsOpen(nextIsOpen)
    onOpenChange?.(nextIsOpen)
  }, [onOpenChange])

  const show = React.useMemo(() => {
    if (!linkInSchema || !editor) {
      return false
    }

    if (hideWhenUnavailable) {
      if (isNodeSelection(editor.state.selection) || !canSetLink) {
        return false
      }
    }

    return true
  }, [linkInSchema, hideWhenUnavailable, editor, canSetLink])

  if (!show || !editor || !editor.isEditable) {
    return null
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOnOpenChange}>
      <PopoverTrigger asChild>
        <LinkButton
          disabled={isDisabled}
          data-active-state={isActive ? "on" : "off"}
          data-disabled={isDisabled}
          {...props} />
      </PopoverTrigger>
      <PopoverContent>
        <LinkMain {...linkHandler} />
      </PopoverContent>
    </Popover>
  );
}

LinkButton.displayName = "LinkButton"
