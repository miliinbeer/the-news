import styled from "styled-components";

export const Card = styled.div`
  cursor: pointer;
  max-width: 300px;
  padding: 20px;
  border: 1px rgba(0, 0, 0, 0.175) solid;
  border-radius: 15px;
  background-color: #fff;
  transition: 0.3s all;

  &:hover {
    border: 1px #4c7aff solid;
    transition: 0.3s all;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
`;

export const Title = styled.p`
  margin: 0.5rem 0;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
`;

export const Content = styled.p`
  width: 100%;
  height: 70px;
  word-break: break-all;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const Source = styled.p`
  padding: 0.5rem 0;
  color: #4c7aff;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Form = styled.div`
  margin: -1rem 0 1rem 0;
`;

export const FormTitle = styled.p`
  margin: 0 0 1rem 0;
  font-size: 20px;
  font-weight: 600;
  word-break: break-all;
`;

export const FormText = styled.p`
  margin: 1rem 0;
  word-break: break-all;
`;
