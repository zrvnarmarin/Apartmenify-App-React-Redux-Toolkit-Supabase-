export const activeRouteStyles = ({ isActive, isPending }) => {
    return {
      textDecoration: isActive ? 'underline' : '',
      textDecorationThickness: isActive ? '1px' : '',
      textUnderlineOffset: isActive ? '6px' : '',
      textDecorationColor: isActive ? '#f0223d' : '',
    }
}