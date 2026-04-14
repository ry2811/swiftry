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
      return () => iframeRef.current?.removeEventListener("load", handleLoad);
    }
  }, [code]);

  if (!projectId)
    return <div className="p-20 text-center text-xl">Vui lòng nhập ID dự án trên URL</div>;
  if (!code)
    return <div className="p-20 text-center animate-pulse text-gray-400 text-xl">Đang nạp dự án AI...</div>;

  // ============================================================
  // CHIẾN LƯỢC MỚI: UMD GLOBALS + BABEL (không dùng import map)
  // - React/ReactDOM/Lucide nạp qua CDN dưới dạng biến global
  // - Babel chỉ lo transform JSX/TypeScript
  // - Xóa TOÀN BỘ import/export trước khi chạy
  // - Dùng Proxy để bắt icon lạ, không bao giờ bị ReferenceError
  // ============================================================
  const iframeDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"><\/script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"><\/script>
  <script src="https://unpkg.com/lucide-react@0.446.0/dist/umd/lucide-react.min.js"><\/script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <style>body { margin:0; padding:0; font-family:sans-serif; }<\/style>
</head>
<body>
  <div id="root"></div>
  <script>
    window.addEventListener("message", function(e) {
      if (e.data.type !== "RENDER_CODE") return;

      try {
        var aiCode = e.data.code;

        // 1. XÓA TOÀN BỘ IMPORT/EXPORT (không cần vì mọi thứ đã là global)
        var clean = aiCode
          .replace(/import\\s+[\\s\\S]*?from\\s+['"][^'"]+['"]\\s*;?/g, "")
          .replace(/export\\s+default\\s+function/g, "function")
          .replace(/export\\s+default\\s+/g, "")
          .replace(/export\\s+/g, "");

        // 2. BIÊN DỊCH JSX + TYPESCRIPT QUA BABEL
        var compiled = Babel.transform(clean, {
          presets: [
            ["react", { pragma: "React.createElement", pragmaFrag: "React.Fragment" }],
            ["typescript", { allExtensions: true, isTSX: true }]
          ]
        }).code;

        // 3. CÀI ĐẶT GLOBALS AN TOÀN CHO CODE AI
        var setupGlobals = function() {
          // React hooks
          var useState = React.useState;
          var useEffect = React.useEffect;
          var useRef = React.useRef;
          var useMemo = React.useMemo;
          var useCallback = React.useCallback;
          var useContext = React.useContext;
          var useReducer = React.useReducer;

          // Lucide Proxy - bắt MỌI icon kể cả icon lạ
          var LucideProxy = new Proxy(LucideReact, {
            get: function(target, prop) {
              return target[prop] || target["Star"];
            }
          });

          // Phá vỡ destructure để AI dùng trực tiếp
          var allIcons = Object.keys(LucideReact);
          allIcons.forEach(function(name) {
            if (typeof name === "string" && /^[A-Z]/.test(name)) {
              window[name] = LucideProxy[name];
            }
          });

          // Eval code đã biên dịch
          eval(compiled);

          // 4. RENDER
          var root = ReactDOM.createRoot(document.getElementById("root"));
          root.render(React.createElement(App));
        };

        setupGlobals();

      } catch(err) {
        document.getElementById("root").innerHTML =
          '<div style="padding:40px;color:red;font-family:monospace"><b>Lỗi:</b><br>' + err.message + '<\/div>';
      }
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
        sandbox="allow-scripts"
      />
    </div>
  );
}
