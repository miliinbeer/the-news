import styled from "styled-components";

export const Root = styled.div`
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px rgba(0, 0, 0, 0.175) solid;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  a {
    text-decoration: none;
  }
`;
