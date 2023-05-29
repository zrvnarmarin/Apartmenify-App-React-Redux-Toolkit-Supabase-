export const activeRouteStyles = ({ isActive, isPending }) => {
    return {
      backgroundColor: isActive ? '#f0223d' : '',
      padding: isActive ? '4px 8px  4px 8px' : '',
      borderRadius: isActive ? '6px' : ''
    }
}