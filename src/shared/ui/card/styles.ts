import styled from "styled-components";

export const Root = styled.div`
  padding: 20px;
  border: 1px rgba(0, 0, 0, 0.175) solid;
  border-radius: 15px;
  background-color: #fff;
  transition: 0.3s all;
  a {
    color: #212529;
    text-decoration: none;
  }
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
  opacity: 0.9;
`;

export const Title = styled.p`
  margin: 0 auto;
  padding: 0.5rem 0;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
`;

export const Content = styled.div`
  height: 70px;
  overflow: hidden;
`;

export const Source = styled.div`
  padding: 0.5rem 0;
  color: #4c7aff;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
