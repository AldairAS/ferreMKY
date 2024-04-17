// hook para el manejo de la paginación desde la url

const useQuery = (page: number) => {
  const query = new URLSearchParams(window.location.search);
  const queryPage = query.get("page");
  return queryPage ? parseInt(queryPage) : page;
};

export default useQuery;
