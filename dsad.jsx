<Box
              key={box.id}
              {...box}
              isSelected={selectedBoxes.includes(box.id)}

              onClick={handleBoxClick}
              position={[box.id * 2, 0, 0]} 
            />