import {ReactElement} from "react";
import './buttons.css';

/**
 * Кнопка закрытия
 * @param onClick - Обработчик клика на кнопку закрытия
 * @param className - Дополнительный класс
 * @constructor
 */
export default function CloseButton({onClick, className = ''}: {onClick: Function, className: string}): ReactElement {
  return (
    <button className={`close-button ${className}`} onClick={() => onClick()}></button>
  );
}