export function setPagination(state,data){
  state.pagination = data
}

export function onInit(state,data){
  state.pagination.page = data.current_page
  state.pagination.rowsPerPage = data.per_page
  state.pagination.rowsNumber = data.total
  state.pagination.pageNumber = Math.ceil(data.total / data.per_page)
  state.pagination.totalRows = data.data.length
  state.rows = data.data
}