export const formatMinutes = (minutes = 0) => {
  const h = (minutes / 60) | 0;
  const m = minutes % 60;

  return `${h ? `${h}h ` : ""}${m || !h ? `${m}m` : ""}`.trim();
};
