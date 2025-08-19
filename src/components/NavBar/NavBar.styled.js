import { Link } from "react-router-dom";
import { styled } from "styled-components";
export const NavBarContainer = styled.nav`
  display: flex;
  //   gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #333;
`;
export const NavBarLink = styled(Link)`
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export const NavBarContetnsUser = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavBarButton = styled.button`
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;

  .theme-toggle {
    width: 100px;
  }
`;

export const NavBarButtonTheme = styled.button`
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 100px;
`;

export const NavBarBtnLangs = styled.div`
  display: flex;
  gap: 0.5rem;
`;
export const NavBarContetns = styled.div`
  display: flex;
  align-items: center;
`;
// .navbar {
//
// }

// .navbar a, .navbar button {
//   color: white;
//   text-decoration: none;
//   background: none;
//   border: none;
//   cursor: pointer;
// }

// .navbar button:hover {
//   text-decoration: underline;
// }
