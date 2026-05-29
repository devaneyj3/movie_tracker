const sortByDate = (data = [], descending = true) => {
  if (!Array.isArray(data)) return data;

  const movies = [...data];

  return movies.sort((a, b) => {
    const dateA = new Date(a.release_date || 0).getTime();
    const dateB = new Date(b.release_date || 0).getTime();
    return descending ? dateB - dateA : dateA - dateB;
  });
};

export default sortByDate;
