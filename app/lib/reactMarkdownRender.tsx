import React from "react"
import ReactMarkdown from "react-markdown"

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      className="prose prose-lg max-w-none" // Default Tailwind styling for Markdown content
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold border-b-2 mt-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-semibold border-b-2 mt-4" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="text-base my-4 leading-relaxed" {...props} />
        ),
        a: ({ node, ...props }) => (
          <a className="text-blue-500 hover:underline" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="list-disc list-inside ml-4" {...props} />
        ),
        // Customize other elements like images, code blocks, blockquotes, etc.
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}

export default MarkdownRenderer
