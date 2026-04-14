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
                  
                  const aiCode = ${JSON.stringify(code)};

                  try {
                    const fullCode = aiCode
                      .replace(/import.*from.*'react'/g, '')
                      .replace(/import.*from.*'lucide-react'/g, '')
                      .replace(/export default function/g, 'function');

                    const compiled = transform(fullCode, {
                      transforms: ['typescript', 'jsx'],
                      production: true
                    }).code;

                    // Bản FIX: Ép nạp mọi Hooks của React và mọi Icon của Lucide
                    const finalCode = 
                      "import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';\n" +
                      "import * as LucideIcons from 'lucide-react';\n" +
                      "const { Mail, Palette, BookOpen, Music, Star, ChevronLeft, ChevronRight, Instagram, Facebook, Youtube, Heart, Trash, Send, User, Check, Clock, Sparkles, Activity, Code, MessageSquare, Zap, Target, Layout, Phone, Globe, Shield, Rocket, Smartphone, Search, Monitor, Laptop, Desktop, Terminal } = LucideIcons;\n" +
                      compiled + 
                      "\nconst root = ReactDOM.createRoot(document.getElementById('root')); root.render(React.createElement(App));";

                    const blob = new Blob([finalCode], { type: 'text/javascript' });
                    const url = URL.createObjectURL(blob);
                    const script = document.createElement('script');
                    script.type = 'module';
                    script.src = url;
                    document.body.appendChild(script);
                  } catch (e) {
                    document.getElementById('root').innerHTML = '<div style="padding:40px;color:red;">Lỗi hệ thống: ' + e.message + '</div>';
                  }
                </script>
              </body>
            </html>
          `}
          className="w-full h-screen border-none"
       />
    </div>
  )
}