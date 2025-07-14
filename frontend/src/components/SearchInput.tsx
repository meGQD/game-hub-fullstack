import useGameQueryStore from "@/store";
import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { LuSearch } from "react-icons/lu";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useGameQueryStore((s) => s.setSearchText);

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) setSearchText(ref.current.value);
        }}
      >
        <InputGroup startElement={<LuSearch />}>
          <Input ref={ref} borderRadius={20} placeholder="Search Games..." />
        </InputGroup>
      </form>
    </div>
  );
};

export default SearchInput;
