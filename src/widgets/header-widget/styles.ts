import styled from "styled-components";

export const Root = styled.div`
  margin: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px rgba(0, 0, 0, 0.175) solid;
  border-radius: 20px;
  background-color: white;
`;

export const Logotype = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #ff6c15;
  text-decoration: none;
  font-weight: 700;
  font-size: 30px;
  span {
    color: #4c7aff;
  }
`;

export const Icon = styled.img`
  width: 45px;
  height: 45px;
`;

export const UserPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Descriptions = styled.div`
  margin: 5px 0 15px 10px;
  font-size: 13px;
`;

export const ErrorMessage = styled.div`
  color: red;
`;

export const Description = styled.div`
  color: #0d6efd;
`;

export const Input = styled.input`
  padding: 10px 15px;
  width: 100%;
`;

export const Password = styled.div`
  position: relative;
  display: flex;
`;

export const Eye = styled.img`
  cursor: pointer;
  position: absolute;
  top: 13px;
  right: 20px;
`;
