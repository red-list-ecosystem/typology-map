export const biomesForRealm = (biomes, realm) =>
  biomes && biomes.filter(b => b.realm === realm);

export const groupsForBiome = (groups, biome) =>
  groups && groups.filter(g => g.biome === biome);

export const groupsForBiomes = (groups, biomes) =>
  groups &&
  biomes &&
  groups.filter(g => biomes.map(b => b.id).indexOf(g.biome) > -1);
