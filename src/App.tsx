import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://gfahvcwxxihkunxugiel.supabase.co', 'sb_publishable_1WedncdpW2OEpoIYooUX8w_ov3Fmstq')

export default function Shell() {
  const [projectId, setProjectId] = useState<string | null>(null)
  const [code, setCode] = useState<string | null>(null)

  useEffect(() => {
    const id = window.location.pathname.split('/').pop()
    if (id && id.length > 20) {
      setProjectId(id)
      fetchProject(id)
    }
  }, [])

  async function fetchProject(id: string) {
    const { data } = await supabase.from('projects').select('files').eq('id', id).single()
    if (data?.files && data.files['/App.tsx']) {
      // Vì đây là demo nhanh, chúng ta dùng cơ chế đơn giản để render
      // Trong thực tế sẽ dùng Sandpack hoặc Dynamic Import
      setCode(data.files['/App.tsx'])
    }
  }

  if (!projectId) return <div className="p-20 text-center text-xl">Vui lòng nhập ID dự án trên URL (ví dụ: /project-id)</div>
  if (!code) return <div className="p-20 text-center text-xl animate-pulse">Đang tải dự án AI...</div>

  return (
    <div className="min-h-screen">
       {/* Ở đây bạn có thể dùng Sandpack để render code AI một cách hoàn hảo */}
       <iframe 
          srcDoc={`
            <html>
              <head><script src="https://cdn.tailwindcss.com"></script></head>
              <body>
                <div id="root"></div>
                <script type="module">
                  // Đơn giản hóa để chạy trực tiếp code React sinh ra bởi AI
                  console.log("Rendering project...")
                </script>
              </body>
            </html>
          `}
          className="w-full h-screen border-none"
       />
       <div className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-xs">
          Preview Mode: ${projectId}
       </div>
    </div>
  )
}