export const isOnList = (list, id) => {
  return list.some(
    (w) => String(w.movieId) === String(id),
  );
}