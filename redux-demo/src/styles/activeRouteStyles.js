export const activeRouteStylesAdmin = ({ isActive, isPending }) => {
    return {
      backgroundColor: isActive ? '#0C768A' : '',
      padding: isActive ? '4px 8px  4px 8px' : '',
      borderRadius: isActive ? '1px' : ''
    }
}

export const activeRouteStylesUser = ({ isActive, isPending }) => {
  return {
    borderBottom: isActive ? '2px solid #FF385C' : ''
  }
}