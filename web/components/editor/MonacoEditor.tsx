'use client'

import { Editor } from '@monaco-editor/react'
import { Loader2 } from 'lucide-react'

interface MonacoEditorProps {
  value: string
  onChange?: (value: string | undefined) => void
  language?: string
  height?: string
  readOnly?: boolean
  theme?: string
}

export function MonacoEditor({
  value,
  onChange,
  language = 'solidity',
  height = '500px',
  readOnly = false,
  theme = 'vs-dark',
}: MonacoEditorProps) {
  return (
    <Editor
      height={height}
      language={language}
      value={value}
      onChange={onChange}
      theme={theme}
      options={{
        readOnly,
        minimap: { enabled: !readOnly },
        fontSize: 14,
        fontFamily: 'JetBrains Mono, monospace',
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        bracketPairColorization: { enabled: true },
      }}
      loading={
        <div className="flex items-center justify-center h-full bg-forge-bg-tertiary">
          <Loader2 className="w-8 h-8 animate-spin text-forge-accent-cyan" />
        </div>
      }
    />
  )
}
