import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import DraggableCard from "./Components/DragabbleCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const toDos = ["a", "b", "c", "d", "e", "f"];
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if(!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // 같은 보드내에서의 드래그
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]
        const taskObj = boardCopy[source.index]
        // 1. source.index 애서 item 삭제하기(내가 드래그 선택한 부분)
        boardCopy.splice(source.index, 1);
        // 2. 삭제한 item을 destination.index로 돌려주기(재정렬)
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId] : boardCopy,
        };
      });
    }
    if(destination.droppableId !== source.droppableId){
      // 서로 다른 보드에서의 드래그
      setToDos((allBoards) =>{
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return{
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        }
      })
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
