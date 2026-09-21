// Tiny shim so these files can run with macOS's built-in JavaScriptCore
// (which has `print` but no `console`). Not needed once you install Node.
(function () {
  function fmt(v, depth) {
    depth = depth || 0;
    if (typeof v === "string") return depth === 0 ? v : JSON.stringify(v);
    if (typeof v === "function") return "[Function: " + (v.name || "anonymous") + "]";
    if (v === null || v === undefined || typeof v !== "object") return String(v);
    if (Array.isArray(v)) return "[ " + v.map(function (x) { return fmt(x, depth + 1); }).join(", ") + " ]";
    var parts = Object.keys(v).map(function (k) { return k + ": " + fmt(v[k], depth + 1); });
    return "{ " + parts.join(", ") + " }";
  }
  globalThis.console = {
    log: function () {
      print(Array.prototype.map.call(arguments, function (a) { return fmt(a, 0); }).join(" "));
    },
  };
  globalThis.console.error = globalThis.console.log;
  globalThis.console.warn = globalThis.console.log;
})();
