import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://gfahvcwxxihkunxugiel.supabase.co', 'sb_publishable_1WedncdpW2OEpoIYooUX8w_ov3Fmstq')

export default function Shell() {
  const [projectId, setProjectId] = useState<string | null>(null)
  const [code, setCode] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

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

  useEffect(() => {
    if (code && iframeRef.current) {
      const handleLoad = () => {
        iframeRef.current?.contentWindow?.postMessage({ type: 'RENDER_CODE', code }, '*')
      }
      iframeRef.current.addEventListener('load', handleLoad)
      return () => iframeRef.current?.removeEventListener('load', handleLoad)
    }
  }, [code])

  if (!projectId) return <div className="p-20 text-center font-sans tracking-tight text-xl">Vui lòng nhập ID dự án trên URL</div>
  if (!code) return <div className="p-20 text-center font-sans animate-pulse text-gray-400 text-xl">Đang nạp dự án AI...</div>

  return (
    <div className="min-h-screen bg-white">
       <iframe 
          ref={iframeRef}
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
                      "lucide-react": "https://esm.sh/lucide-react@0.446.0?deps=react@18.3.1",
                      "sucrase": "https://esm.sh/sucrase@3.35.0"
                    }
                  }
                </script>
                <style>body { margin: 0; padding: 0; font-family: sans-serif; }</style>
              </head>
              <body>
                <div id="root"></div>
                <script type="module">
                  import { transform } from 'sucrase';
                  import React from 'react';
                  import ReactDOM from 'react-dom/client';
                  import * as Lucide from 'lucide-react';
                  
                  window.addEventListener('message', async (event) => {
                    if (event.data.type === 'RENDER_CODE') {
                      const aiCode = event.data.code;
                      try {
                        // 1. BIÊN DỊCH SANG DẠNG CJS (DÙNG REQUIRE ĐỂ TRÁNH TRÙNG KHAI BÁO)
                        const rawCleaned = aiCode.replace(/export default function/g, 'function');
                        const compiled = transform(rawCleaned, {
                          transforms: ['typescript', 'jsx', 'imports'],
                          production: true
                        }).code;

                        // 2. CÀI ĐẶT BỘ CẦU NỐI BRIDGING (SMART REQUIRE)
                        const finalCode = 
                          "(function() {\\n" +
                          "  const exports = {};\\n" +
                          "  const React = window.React;\\n" +
                          "  const ReactDOM = window.ReactDOM;\\n" +
                          "  const Lucide = window.Lucide;\\n" +
                          "  const ProxiedIcons = new Proxy(Lucide, {\\n" +
                          "    get: (target, prop) => target[prop] || target.Sparkles || target.Star\\n" +
                          "  });\\n" +
                          "  const require = (name) => {\\n" +
                          "    if (name === 'react') return React;\\n" +
                          "    if (name === 'react-dom' || name === 'react-dom/client') return ReactDOM;\\n" +
                          "    if (name === 'lucide-react') return ProxiedIcons;\\n" +
                          "    return {};\\n" +
                          "  };\\n" +
                          "  const { useState, useEffect, useMemo, useCallback, useRef } = React;\\n" +
                          compiled + "\\n" +
                          "  const root = ReactDOM.createRoot(document.getElementById('root'));\\n" +
                          "  root.render(React.createElement(App));\\n" +
                          "})();";

                        // Đưa thư viện lên window để require dùng
                        window.React = React;
                        window.ReactDOM = ReactDOM;
                        window.Lucide = Lucide;

                        const script = document.createElement('script');
                        script.text = finalCode;
                        document.body.appendChild(script);

                      } catch (e) {
                         document.getElementById('root').innerHTML = '<div style=\"padding:40px;color:red;font-family:sans-serif;\"><b>Lỗi hệ thống:</b><br/>' + e.message + '</div>';
                      }
                    }
                  });
                </script>
              </body>
            </html>
          `}
          className="w-full h-screen border-none"
       />
    </div>
  )
}