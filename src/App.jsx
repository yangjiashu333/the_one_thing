import React, { useState, useEffect, useRef } from "react";
import styles from "./App.module.css";

function App() {
  const [blocks, setBlocks] = useState([{ id: 1, text: "THE ONE THING" }]);

  const [selectedId, setSelectedId] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const addBlock = (index) => {
    const newId =
      blocks.length > 0 ? Math.max(...blocks.map((b) => b.id)) + 1 : 1;
    const newBlock = { id: newId, text: "" };

    if (index === -1) {
      // Add at the end
      setBlocks([...blocks, newBlock]);
    } else {
      // Add at specific index
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, newBlock);
      setBlocks(newBlocks);
    }

    setSelectedId(newId);
    setIsEditing(true);
    setEditText(newBlock.text);
  };

  const deleteBlocks = (indexList) => {
    if (indexList.length === 0) return;

    // Don't allow deleting the first block
    if (indexList.includes(0)) return;

    // Don't allow deleting all blocks
    if (indexList.length >= blocks.length) return;

    const newBlocks = blocks.filter((_, index) => !indexList.includes(index));
    setBlocks(newBlocks);

    // Select the next block, or the previous one if we're at the end
    const currentIndex = blocks.findIndex((block) => block.id === selectedId);
    const nextIndex = Math.min(currentIndex, newBlocks.length - 1);
    setSelectedId(newBlocks[nextIndex].id);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isEditing) {
        if (e.key === "Enter" || e.key === "Escape") {
          // Save changes
          setBlocks(
            blocks.map((block) =>
              block.id === selectedId ? { ...block, text: editText } : block
            )
          );
          setIsEditing(false);
        }
        return;
      }

      const currentIndex = blocks.findIndex((block) => block.id === selectedId);

      switch (e.key.toLowerCase()) {
        case "tab":
          if (e.shiftKey) {
            if (currentIndex > 0) {
              setSelectedId(blocks[currentIndex - 1].id);
            }
          } else {
            e.preventDefault();
            if (currentIndex < blocks.length - 1) {
              setSelectedId(blocks[currentIndex + 1].id);
            } else {
              // Add new block at the end when reaching the last block
              addBlock(-1);
            }
          }
          break;
        case "h":
          if (currentIndex > 0) {
            setSelectedId(blocks[currentIndex - 1].id);
          }
          break;
        case "l":
          e.preventDefault();
          if (currentIndex < blocks.length - 1) {
            setSelectedId(blocks[currentIndex + 1].id);
          } else {
            // Add new block at the end when reaching the last block
            addBlock(-1);
          }
          break;
        case "enter":
          setIsEditing(true);
          setEditText(blocks[currentIndex].text);
          break;
        case "backspace":
          if (currentIndex > 0) {
            // Delete the selected block and all blocks after it
            const indicesToDelete = Array.from(
              { length: blocks.length - currentIndex },
              (_, i) => currentIndex + i
            );
            deleteBlocks(indicesToDelete);
          }
          break;
        case "x":
        case "d":
          if (blocks.length > 1 && currentIndex > 0) {
            // Delete only the selected block
            deleteBlocks([currentIndex]);
          }
          break;
        case "a":
          e.preventDefault();
          if (e.shiftKey) {
            // Add at the end
            addBlock(-1);
          } else {
            // Add after selected block
            addBlock(currentIndex);
          }
          break;
        case "i":
          e.preventDefault();
          // Add before selected block
          if (currentIndex !== 0) {
            addBlock(currentIndex - 1);
          }
          break;
        case "s":
          e.preventDefault();
          setIsEditing(true);
          setEditText("");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, blocks, isEditing, editText]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (wrapperRef.current) {
      const selectedBlock = wrapperRef.current.querySelector(
        `.${styles.selected}`
      );
      if (selectedBlock) {
        const containerWidth = wrapperRef.current.parentElement.offsetWidth;
        const blockLeft = selectedBlock.offsetLeft;
        const blockWidth = selectedBlock.offsetWidth;
        const translateX = -(blockLeft - (containerWidth - blockWidth) / 2);
        wrapperRef.current.style.transform = `translateX(${translateX}px)`;
      }
    }
  }, [selectedId]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} ref={wrapperRef}>
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`${styles.block} ${
              block.id === selectedId ? styles.selected : ""
            }`}
          >
            {isEditing && block.id === selectedId ? (
              <input
                ref={inputRef}
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className={styles.editInput}
              />
            ) : (
              block.text
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
