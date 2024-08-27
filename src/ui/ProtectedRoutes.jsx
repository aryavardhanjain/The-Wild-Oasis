import { useEffect } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100%;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated, isLoading]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;

  // Add this fallback return to avoid rendering issues
  return null;
}

export default ProtectedRoutes;
