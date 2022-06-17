import { useState } from "react";
import axios from 'axios';

const AutoComplete = ({ suggestions }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const  onChange = async(e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    // const unLinked = suggestions.filter(
    //   (suggestion) =>
    //     suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // );
    const unLinked =  await axios.get(`http://localhost:3001/stock/${userInput}`)
    console.log(unLinked);

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };
  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };
  
   return (
    <>
      <input
        type="text"
        onChange={onChange}
        // onKeyDown={onKeyDown}
        value={input}
      />
      {showSuggestions && input && <SuggestionsListComponent setInput={setInput} setShowSuggestions ={setShowSuggestions}/>}
    </>
  );
};
const SuggestionsListComponent = (props) => {
    const {setInput , setShowSuggestions} = props;
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const onClick = (e) => {
        setFilteredSuggestions([]);
        setInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
      };
    return filteredSuggestions.length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
           return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };
export default AutoComplete;