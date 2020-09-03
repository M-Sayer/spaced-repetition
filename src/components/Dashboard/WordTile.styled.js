import styled from 'styled-components';

export const StyledWordTile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  background: rgba(20, 40, 40, .8);
  margin: 5px 0;
  padding-bottom: 10px;

  .count {
    display: flex;
    flex-direction: row;
    
    span {
      padding: 0 20px;
    }
  }

  .correctCount {
    color: green;

  }

  .incorrectCount {
    color: red;
  }
`