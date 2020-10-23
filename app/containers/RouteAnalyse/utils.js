export const testArea = area => {
  const points = area.trim().split(',');
  return (
    points.length > 2 && points[0].trim(0) === points[points.length - 1].trim()
  );
};

export const getOpenArea = area => {
  const hasArea = area && area.trim() !== '' && testArea(area);
  // but we want an open area in the text area
  // prettier-ignore
  return hasArea
    ? area
      .trim()
      .split(',')
      .slice(0, -1)
      .join(',')
    : '';
};

export const getRealmOptions = (realms, biomeObject) =>
  realms && realms.filter(r => !biomeObject || biomeObject.realm === r.id);

export const getBiomeOptions = (realms, biomes, realmObject) =>
  realms &&
  biomes &&
  biomes
    .filter(b => !realmObject || b.realm === realmObject.id)
    .sort((a, b) => {
      const aRealmIndex = realms.findIndex(r => a.realm === r.id);
      const bRealmIndex = realms.findIndex(r => b.realm === r.id);
      if (aRealmIndex === bRealmIndex) {
        return a.id > b.id ? 1 : -1;
      }
      return aRealmIndex < bRealmIndex ? -1 : 1;
    });
