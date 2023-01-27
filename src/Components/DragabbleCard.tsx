import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDragabbleCardProps{
    toDo: string;
    index: number;
}

function DraggableCard({toDo, index}: IDragabbleCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magicDrag) => (
        <Card
          ref={magicDrag.innerRef}
          {...magicDrag.draggableProps}
          {...magicDrag.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
// prop이 변경되지 않았다면 DraggableCard는 다시 렌더링 하지 마라.
