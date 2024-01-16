import { useRef, useState } from "react";

const ChipInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [availableItems, setAvailableItems] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      imageUrl: "/KO.png",
    },
    {
      id: "2",
      name: "Ja Smith",
      email: "jane@example.com",
      imageUrl: "/KO.png",
    },
    {
      id: "3",
      name: "Jamith",
      email: "jane@example.com",
      imageUrl: "/KO.png",
    },
    {
      id: "4",
      name: "Janmith",
      email: "jane@example.com",
      imageUrl: "/KO.png",
    },
    {
      id: "5",
      name: "Ja Sith",
      email: "jane@example.com",
      imageUrl: "/KO.png",
    },
    {
      id: "6",
      name: "JSmith",
      email: "jane@example.com",
      imageUrl: "/KO.png",
    },
    {
      id: "7",
      name: "Jath",
      email: "jane@example.com",
      imageUrl: "/KO.png",
    },
    // Add more items here
  ]);
  const inputRef = useRef(null);
  const [highlightedChip, setHighlightedChip] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === "") {
      setHighlightedChip(null); // Clear highlighted chip when input is empty
    }
  };

  const handleItemClick = (item) => {
    setChips((prevChips) => [...prevChips, item]);
    setAvailableItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    setInputValue("");
    inputRef.current.focus();
  };

  const handleChipDelete = (chip) => {
    setChips((prevChips) => prevChips.filter((c) => c.id !== chip.id));
    setAvailableItems((prevItems) => [...prevItems, chip]);
  };
  const handleBackspace = (e) => {
    if (e.key === "Backspace" && inputValue === "") {
      if (highlightedChip) {
        handleChipDelete(highlightedChip);
        setHighlightedChip(null);
      } else {
        const lastChip = chips[chips.length - 1];
        if (lastChip) {
          setHighlightedChip(lastChip);
        }
      }
      inputRef.current.focus();
    } else {
      if (highlightedChip) {
        setHighlightedChip(null);
      }
    }
  };
   const splitMatchedText = (text) => {
    const regExp = new RegExp(inputValue, 'gi');
    const renderedHTML =  text.replace(regExp, (match) => `<span style="color: gray;">${match}</span>`);
    return {__html: renderedHTML}
   }
  return (
    <div className="chip-input-container">
      <div onClick={() => inputRef.current.focus()} className="chips-container">
        {chips.map((chip) => (
          <button
            key={chip.id}
            className={`chip-button ${
              highlightedChip === chip ? "highlighted" : ""
            }`}
          >
            <img src={chip.imageUrl} />
            {chip.name}
            <span
              className="delete-icon"
              onClick={() => handleChipDelete(chip)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-x"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />{" "}
              </svg>
            </span>
          </button>
        ))}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleBackspace}
            onBlur={() => setHighlightedChip(null)} // Clear highlighted chip on blur
            //   placeholder="Type to filter items..."
            className="input-field"
          />
          {inputValue && (
            <ul className="available-items-list">
              {availableItems
                .filter(
                  (item) =>
                    item.name
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                )
                .map((item) => (
                  <li key={item.id} onClick={() => handleItemClick(item)}>
                    <span>
                      <img src={item.imageUrl} />
                      <span dangerouslySetInnerHTML={splitMatchedText(item.name)}></span>
                    </span>
                    <span>({item.email})</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipInput;
