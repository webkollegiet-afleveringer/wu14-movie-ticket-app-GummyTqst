import { API } from "../api/tmdb";

export const exploreLoader = async () => {
  const [trending, recommended, upcoming] = await Promise.all([
    API.getTrending(),
    API.getRecommended(),
    API.getUpcoming()
  ]);
  return { trending: trending || [], recommended: recommended || [], upcoming: upcoming || [] };
};
