import { API } from "../api/tmdb";

export const homeLoader = async () => {
  const upcoming = await API.getUpcoming();
  const trending = await API.getTrending();
  return { upcoming: upcoming || [], trending: trending || [] };
};
