import {ChangeEvent, FormEvent, FormEventHandler, ReactElement, useState, useRef} from "react";
import './SearchPanel.css';
import TextButton from "./buttons/TextButton";
import CloseButton from "./buttons/CloseButton";

interface IProps {
  makeSearchQuery: (inputValue: string) => void;
}

/**
 * Панель поиска с поисковой строкой и кнопкой
 * @param onSubmitForm - Обработчик выполнения поискового запроса
 * @constructor
 */
export default function SearchPanel({makeSearchQuery}: IProps): ReactElement {
  const [inputValue, setInputValue] = useState<string>('');
  const [resetButtonVisibility, setResetButtonVisibility] = useState<boolean>(false);
  const formRef = useRef(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setResetButtonVisibility(!!event.target.value)
    setInputValue(event.target.value);
  };

  const handleResetInput = (event: MouseEvent) => {
    makeSearchQuery('');
    setInputValue('');
    setResetButtonVisibility(false);
  }

  return (
    <form action="" ref={formRef}
          onSubmit={(event) => {
            event.stopPropagation();
            event.preventDefault();
            makeSearchQuery(inputValue);
          }}
    >
      <input
        type="text"
        placeholder="Поиск..."
        onChange={handleInputChange}
        value={inputValue}
      />
      {resetButtonVisibility &&
          <CloseButton
              onClick={handleResetInput}
              size={'small'}
              className="reset-button"
          />
      }
      <TextButton caption="Найти"/>
    </form>
  );
}