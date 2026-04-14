import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://gfahvcwxxihkunxugiel.supabase.co', 'sb_publishable_1WedncdpW2OEpoIYooUX8w_ov3Fmstq')

export default function Shell() {
  const [projectId, setProjectId] = useState<string | null>(null)
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    const id = window.location.pathname.split('/').filter(Boolean).pop()
    if (id && id.length > 20) {
      setProjectId(id)
      fetchProject(id)
    }
  }, [])

  async function fetchProject(id: string) {
    const { data } = await supabase.from('projects').select('files').eq('id', id).single()
    if (data?.files && data.files['/App.tsx']) {
      setCode(data.files['/App.tsx'])
    }
  }

  if (!projectId) return <div className="p-20 text-center font-sans tracking-tight">Vui lòng nhập ID dự án trên URL</div>
  if (!code) return <div className="p-20 text-center font-sans animate-pulse text-gray-400">Đang nạp dự án AI...</div>

  // Chuẩn hóa code AI để dùng Import Map
  const cleanCode = code
    .replace(/'lucide-react'/g, '"lucide-react"')
    .replace(/'react'/g, '"react"')
    .replace(/'react-dom\/client'/g, '"react-dom/client"')
    .replace(/export default function/g, 'function')

  return (
    <div className="min-h-screen bg-white">
       <iframe 
          srcDoc={`
            <html>
              <head>
                <script src="https://cdn.tailwindcss.com"></script>
                <script type="importmap">
                  {
                    "imports": {
                      "react": "https://esm.sh/react@18.3.1",
                      "react-dom": "https://esm.sh/react-dom@18.3.1",
                      "react-dom/client": "https://esm.sh/react-dom@18.3.1/client",
                      "lucide-react": "https://esm.sh/lucide-react@0.446.0?deps=react@18.3.1"
                    }
                  }
                </script>
                <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                <style>body { margin: 0; padding: 0; }</style>
              </head>
              <body>
                <div id="root"></div>
                <script type="text/babel" data-type="module" data-presets="react,typescript">
                  import React from 'react';
                  import ReactDOM from 'react-dom/client';
                  
                  // Code AI (TypeScript + React)
                  ${cleanCode}

                  // Render App
                  const root = ReactDOM.createRoot(document.getElementById('root'));
                  root.render(<App />);
                </script>
              </body>
            </html>
          `}
          className="w-full h-screen border-none"
       />
       <div className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-[10px] z-50 font-mono opacity-50">
          ID: ${projectId}
       </div>
    </div>
  )
}