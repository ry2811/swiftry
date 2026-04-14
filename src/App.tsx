import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gfahvcwxxihkunxugiel.supabase.co",
  "sb_publishable_1WedncdpW2OEpoIYooUX8w_ov3Fmstq"
);

export default function Shell() {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const id = window.location.pathname.split("/").filter(Boolean).pop();
    if (id && id.length > 20) {
      setProjectId(id);
      fetchProject(id);
    }
  }, []);

  async function fetchProject(id: string) {
    const { data } = await supabase
      .from("projects")
      .select("files")
      .eq("id", id)
      .single();
    if (data?.files && data.files["/App.tsx"]) {
      setCode(data.files["/App.tsx"]);
    }
  }

  useEffect(() => {
    if (code && iframeRef.current) {
      const handleLoad = () => {
        iframeRef.current?.contentWindow?.postMessage(
          { type: "RENDER_CODE", code },
          "*"
        );
      };
      iframeRef.current.addEventListener("load", handleLoad);
      return () =>
        iframeRef.current?.removeEventListener("load", handleLoad);
    }
  }, [code]);

  if (!projectId)
    return (
      <div className="p-20 text-center font-sans text-xl">
        Vui lòng nhập ID dự án trên URL
      </div>
    );
  if (!code)
    return (
      <div className="p-20 text-center font-sans animate-pulse text-gray-400 text-xl">
        Đang nạp dự án AI...
      </div>
    );

  const iframeDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@18.3.1",
      "react/jsx-runtime": "https://esm.sh/react@18.3.1/jsx-runtime",
      "react-dom": "https://esm.sh/react-dom@18.3.1",
      "react-dom/client": "https://esm.sh/react-dom@18.3.1/client",
      "lucide-react": "https://esm.sh/lucide-react@0.446.0?deps=react@18.3.1"
    }
  }
  <\/script>
  <style>body { margin: 0; padding: 0; }<\/style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react,typescript" data-type="module">
    import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
    import ReactDOM from "react-dom/client";
    import * as LucideAll from "lucide-react";

    // Proxy: bất kỳ icon nào không tồn tại -> trả về Star
    const LucideProxy = new Proxy(LucideAll, {
      get: (t, p) => (typeof p === "string" && !t[p] ? t.Star : t[p])
    });

    // Override lucide-react globally
    window.__lucide = LucideProxy;

    window.addEventListener("message", (e) => {
      if (e.data.type !== "RENDER_CODE") return;
      const raw = e.data.code;

      // Thay thế import lucide-react -> destructure từ Proxy
      const patched = raw
        .replace(/import\\s+\\*\\s+as\\s+\\w+\\s+from\\s+['"]lucide-react['"]/g, "")
        .replace(
          /import\\s+{([\\s\\S]*?)}\\s+from\\s+['"]lucide-react['"]/g,
          (_, icons) => \`const { \${icons.trim()} } = window.__lucide;\`
        )
        .replace(/from\\s+['"]react['"]/g, 'from "react"')
        .replace(/export\\s+default\\s+function/g, "function");

      const script = document.createElement("script");
      script.type = "text/babel";
      script.setAttribute("data-presets", "react,typescript");
      script.textContent = patched + \`
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(React.createElement(App));
      \`;
      document.body.appendChild(script);
      Babel.transformScriptTags();
    });
  <\/script>
</body>
</html>`;

  return (
    <div className="min-h-screen bg-white">
      <iframe
        ref={iframeRef}
        srcDoc={iframeDoc}
        className="w-full h-screen border-none"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
