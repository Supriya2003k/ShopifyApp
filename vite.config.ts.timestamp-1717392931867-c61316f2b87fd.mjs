// vite.config.ts
import { vitePlugin as remix } from "file:///C:/Users/HP/Desktop/Internship/eShipz_cancellation/node_modules/@remix-run/dev/dist/index.js";
import { defineConfig } from "file:///C:/Users/HP/Desktop/Internship/eShipz_cancellation/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///C:/Users/HP/Desktop/Internship/eShipz_cancellation/node_modules/vite-tsconfig-paths/dist/index.mjs";
if (process.env.HOST && (!process.env.SHOPIFY_APP_URL || process.env.SHOPIFY_APP_URL === process.env.HOST)) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}
var host = new URL(process.env.SHOPIFY_APP_URL || "http://localhost").hostname;
var hmrConfig;
if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host,
    port: parseInt(process.env.FRONTEND_PORT) || 8002,
    clientPort: 443
  };
}
var vite_config_default = defineConfig({
  server: {
    port: Number(process.env.PORT || 3e3),
    hmr: hmrConfig,
    fs: {
      // See https://vitejs.dev/config/server-options.html#server-fs-allow for more information
      allow: ["app", "node_modules"]
    }
  },
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"]
    }),
    tsconfigPaths()
  ],
  build: {
    assetsInlineLimit: 0
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxEZXNrdG9wXFxcXEludGVybnNoaXBcXFxcZVNoaXB6X2NhbmNlbGxhdGlvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcRGVza3RvcFxcXFxJbnRlcm5zaGlwXFxcXGVTaGlwel9jYW5jZWxsYXRpb25cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0hQL0Rlc2t0b3AvSW50ZXJuc2hpcC9lU2hpcHpfY2FuY2VsbGF0aW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgdml0ZVBsdWdpbiBhcyByZW1peCB9IGZyb20gXCJAcmVtaXgtcnVuL2RldlwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgVXNlckNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XHJcblxyXG4vLyBSZWxhdGVkOiBodHRwczovL2dpdGh1Yi5jb20vcmVtaXgtcnVuL3JlbWl4L2lzc3Vlcy8yODM1I2lzc3VlY29tbWVudC0xMTQ0MTAyMTc2XHJcbi8vIFJlcGxhY2UgdGhlIEhPU1QgZW52IHZhciB3aXRoIFNIT1BJRllfQVBQX1VSTCBzbyB0aGF0IGl0IGRvZXNuJ3QgYnJlYWsgdGhlIHJlbWl4IHNlcnZlci4gVGhlIENMSSB3aWxsIGV2ZW50dWFsbHlcclxuLy8gc3RvcCBwYXNzaW5nIGluIEhPU1QsIHNvIHdlIGNhbiByZW1vdmUgdGhpcyB3b3JrYXJvdW5kIGFmdGVyIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXHJcbmlmIChcclxuICBwcm9jZXNzLmVudi5IT1NUICYmXHJcbiAgKCFwcm9jZXNzLmVudi5TSE9QSUZZX0FQUF9VUkwgfHxcclxuICAgIHByb2Nlc3MuZW52LlNIT1BJRllfQVBQX1VSTCA9PT0gcHJvY2Vzcy5lbnYuSE9TVClcclxuKSB7XHJcbiAgcHJvY2Vzcy5lbnYuU0hPUElGWV9BUFBfVVJMID0gcHJvY2Vzcy5lbnYuSE9TVDtcclxuICBkZWxldGUgcHJvY2Vzcy5lbnYuSE9TVDtcclxufVxyXG5cclxuY29uc3QgaG9zdCA9IG5ldyBVUkwocHJvY2Vzcy5lbnYuU0hPUElGWV9BUFBfVVJMIHx8IFwiaHR0cDovL2xvY2FsaG9zdFwiKVxyXG4gIC5ob3N0bmFtZTtcclxuXHJcbmxldCBobXJDb25maWc7XHJcbmlmIChob3N0ID09PSBcImxvY2FsaG9zdFwiKSB7XHJcbiAgaG1yQ29uZmlnID0ge1xyXG4gICAgcHJvdG9jb2w6IFwid3NcIixcclxuICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXHJcbiAgICBwb3J0OiA2NDk5OSxcclxuICAgIGNsaWVudFBvcnQ6IDY0OTk5LFxyXG4gIH07XHJcbn0gZWxzZSB7XHJcbiAgaG1yQ29uZmlnID0ge1xyXG4gICAgcHJvdG9jb2w6IFwid3NzXCIsXHJcbiAgICBob3N0OiBob3N0LFxyXG4gICAgcG9ydDogcGFyc2VJbnQocHJvY2Vzcy5lbnYuRlJPTlRFTkRfUE9SVCEpIHx8IDgwMDIsXHJcbiAgICBjbGllbnRQb3J0OiA0NDMsXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IE51bWJlcihwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDApLFxyXG4gICAgaG1yOiBobXJDb25maWcsXHJcbiAgICBmczoge1xyXG4gICAgICAvLyBTZWUgaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9zZXJ2ZXItb3B0aW9ucy5odG1sI3NlcnZlci1mcy1hbGxvdyBmb3IgbW9yZSBpbmZvcm1hdGlvblxyXG4gICAgICBhbGxvdzogW1wiYXBwXCIsIFwibm9kZV9tb2R1bGVzXCJdLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlbWl4KHtcclxuICAgICAgaWdub3JlZFJvdXRlRmlsZXM6IFtcIioqLy4qXCJdLFxyXG4gICAgfSksXHJcbiAgICB0c2NvbmZpZ1BhdGhzKCksXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDAsXHJcbiAgfSxcclxufSkgc2F0aXNmaWVzIFVzZXJDb25maWc7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1YsU0FBUyxjQUFjLGFBQWE7QUFDeFgsU0FBUyxvQkFBcUM7QUFDOUMsT0FBTyxtQkFBbUI7QUFLMUIsSUFDRSxRQUFRLElBQUksU0FDWCxDQUFDLFFBQVEsSUFBSSxtQkFDWixRQUFRLElBQUksb0JBQW9CLFFBQVEsSUFBSSxPQUM5QztBQUNBLFVBQVEsSUFBSSxrQkFBa0IsUUFBUSxJQUFJO0FBQzFDLFNBQU8sUUFBUSxJQUFJO0FBQ3JCO0FBRUEsSUFBTSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksbUJBQW1CLGtCQUFrQixFQUNuRTtBQUVILElBQUk7QUFDSixJQUFJLFNBQVMsYUFBYTtBQUN4QixjQUFZO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsRUFDZDtBQUNGLE9BQU87QUFDTCxjQUFZO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0EsTUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFjLEtBQUs7QUFBQSxJQUM5QyxZQUFZO0FBQUEsRUFDZDtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTSxPQUFPLFFBQVEsSUFBSSxRQUFRLEdBQUk7QUFBQSxJQUNyQyxLQUFLO0FBQUEsSUFDTCxJQUFJO0FBQUE7QUFBQSxNQUVGLE9BQU8sQ0FBQyxPQUFPLGNBQWM7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLG1CQUFtQixDQUFDLE9BQU87QUFBQSxJQUM3QixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
