export const activeRouteStyles = ({ isActive, isPending }) => {
    return {
      backgroundColor: isActive ? '#F87171' : '',
      padding: isActive ? '4px 8px  4px 8px' : '',
      borderRadius: isActive ? '6px' : ''
    }
}