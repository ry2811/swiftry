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

  if (!projectId) return <div className="p-20 text-center font-sans">Vui lòng nhập ID dự án trên URL</div>
  if (!code) return <div className="p-20 text-center font-sans animate-pulse text-gray-400">Đang nạp dự án AI...</div>

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
                  
                  window.addEventListener('message', async (event) => {
                    if (event.data.type === 'RENDER_CODE') {
                      const aiCode = event.data.code;
                      try {
                        const compiled = transform(aiCode, {
                          transforms: ['typescript', 'jsx'],
                          production: true
                        }).code;

                        // CHIẾN THUẬT QUY ĐỔI NĂNG ĐỘNG (DYNAMIC MAPPING)
                        // Bắt mọi icon AI yêu cầu và đưa vào Proxy
                        const finalCode = 
                          "import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';\\n" +
                          "import ReactDOM from 'react-dom/client';\\n" +
                          "import * as LucideIcons from 'lucide-react';\\n" +
                          "const ProxiedIcons = new Proxy(LucideIcons, {\\n" +
                          "  get: (target, prop) => {\\n" +
                          "    if (typeof prop === 'string' && !target[prop]) return target.Sparkles || target.Star || target.Activity;\\n" +
                          "    return target[prop];\\n" +
                          "  }\\n" +
                          "});\\n" +
                          compiled.replace(/export default function/g, 'function')
                                  .replace(/import\\s+{([^}]*)}\\s+from\\s+['\"]lucide-react['\"]/g, 'const {$1} = ProxiedIcons;')
                                  .replace(/import\\s+[^;]*from\\s+['\"]lucide-react['\"];?/g, '') // Xóa nốt các kiểu import lucide khác
                                  .replace(/import\\s+[^;]*from\\s+['\"]react['\"];?/g, '')
                                  .replace(/import\\s+[^;]*from\\s+['\"]react-dom[^'\"]*['\"];?/g, '') +
                          "\\nconst root = ReactDOM.createRoot(document.getElementById('root')); root.render(React.createElement(App));";

                        const blob = new Blob([finalCode], { type: 'text/javascript' });
                        const url = URL.createObjectURL(blob);
                        const script = document.createElement('script');
                        script.type = 'module';
                        script.src = url;
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