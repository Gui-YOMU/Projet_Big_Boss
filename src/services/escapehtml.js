export function escapehtml(string) {
  let map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039",
    '"': "&quot;",
  };
  return string.replace(/[&<>"']/g, function(m) {return map[m];});
}