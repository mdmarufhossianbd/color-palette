import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const initialColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#FF8833', '#333AFF'];

const ColorPalette = () => {
  const [colors, setColors] = useState(initialColors);

  const handleColorChange = (index, newColor) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newColors = [...colors];
    const [reorderedColor] = newColors.splice(result.source.index, 1);
    newColors.splice(result.destination.index, 0, reorderedColor);
    setColors(newColors);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="colors">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {colors.map((color, index) => (
              <Draggable key={color} draggableId={color} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '8px',
                      backgroundColor: '#f0f0f0',
                      padding: '8px',
                      ...provided.draggableProps.style
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: color,
                        marginRight: '8px'
                      }}
                    />
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColorPalette;
