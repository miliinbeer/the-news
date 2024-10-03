import styled from "styled-components";

export const Root = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: red;
  }
`;

export const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Icon = styled.img`
  width: 100px;
  height: 100px;
`;

export const Message = styled.p`
  font-size: 20px;
`;
