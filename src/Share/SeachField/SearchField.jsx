import axios from "axios";
import { useEffect, useState } from "react";

const SearchField = ({ setDolls, setLoading, setSearch, setTotalDolls }) => {
  const [inputValue, setInputValue] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://khelagorbackend.vercel.app/api/dolls?search=${inputValue}`
        );
        setSearch(inputValue);
        setTotalDolls(response.data.totalDolls);
        // console.log(response.data); // Handle the response data as needed
        setDolls(response.data.dolls);
        setLoading(false);
      } catch (error) {
        console.error("Error sending request:", error);
      }
    };

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (inputValue) {
      setTypingTimeout(setTimeout(sendRequest, 2000));
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <div className="text-center my-8 group relative">
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-1/2 text-gray-500 text-sm"
        />
        <h5 className="group-hover:block hidden w-fit whitespace-nowrap font-bold absolute -top-[calc(70%+10px)] left-1/2 -translate-x-1/2 p-2 text-info transition-all duration-200 z-50 rounded">
          wait 2 seconds after end your typing
        </h5>
      </div>
    </div>
  );
};

export default SearchField;
