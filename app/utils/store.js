export const biomesForRealm = (biomes, realm) =>
  biomes && biomes.filter(b => b.realm === realm);

export const groupsForBiome = (groups, biome) =>
  groups && groups.filter(g => g.biome === biome);

export const groupsForBiomes = (groups, biomes) =>
  groups &&
  biomes &&
  groups.filter(g => biomes.map(b => b.id).indexOf(g.biome) > -1);

// export const sortGroups = groups =>
//   groups &&
//   groups.sort((a, b) => {
//     const aTrueId =
//       a.id.indexOf('.') > -1 ? parseInt(a.id.split('.')[1], 0) : a.id;
//     const bTrueId =
//       b.id.indexOf('.') > -1 ? parseInt(b.id.split('.')[1], 0) : a.id;
//     return aTrueId > bTrueId ? 1 : -1;
//   });

export const sortGroups = (groups, biomes, realms) =>
  groups &&
  groups.sort((a, b) => {
    const biomeA = biomes && biomes.find(biome => biome.id === a.biome);
    const realmA = realms && realms.find(r => r.id === biomeA.realm);
    const biomeB = biomes && biomes.find(biome => biome.id === b.biome);
    const realmB = realms && realms.find(r => r.id === biomeB.realm);
    // if same biome or unspcified, go by group id
    if (!biomes || !realms || biomeA.id === biomeB.id) {
      const aTrueId =
        a.id.indexOf('.') > -1 ? parseInt(a.id.split('.')[1], 0) : a.id;
      const bTrueId =
        b.id.indexOf('.') > -1 ? parseInt(b.id.split('.')[1], 0) : a.id;
      return aTrueId > bTrueId ? 1 : -1;
    }
    // if different biome but same realm go by biome id
    if (realmA.id === realmB.id) {
      return biomeA.id > biomeB.id ? 1 : -1;
    }
    // if different realm but same type, go by realm id
    if (realmA.type === realmB.type) {
      return realmA.id > realmB.id ? 1 : -1;
    }
    // if different realm and different type, go by type
    return realmA.type === 'core' ? -1 : 1;
  });
