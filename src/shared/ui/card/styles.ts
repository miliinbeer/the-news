import styled from "styled-components";

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
`;

export const CardTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  height: 30px;
  overflow: hidden;
`;

export const CardLink = styled.a`
  color: #212529;
  text-decoration: none;
  transition: all 0.5s;
  &:hover {
    transition: all 0.5s;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
