import {ChangeEvent, FormEvent, FormEventHandler, ReactElement, useState} from "react";
import './SearchPanel.css';
import TextButton from "./buttons/TextButton";

interface IProps {
  onSubmitForm: (event: FormEvent<HTMLElement>, inputValue: string) => void;
}

/**
 * Панель поиска с поисковой строкой и кнопкой
 * @param onSubmitForm - Обработчик выполнения поискового запроса
 * @constructor
 */
export default function SearchPanel({onSubmitForm}: IProps): ReactElement {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // useEffect();

  return (
    <form action="" onSubmit={(event) => onSubmitForm(event, inputValue)}>
      <input
        type="text"
        placeholder="Поиск..."
        onChange={handleInputChange}
        value={inputValue}
      />
      <TextButton caption="Найти"/>
    </form>
  );
}