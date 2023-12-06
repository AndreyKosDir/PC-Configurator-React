import {ReactElement} from "react";
import './buttons.css';

type TButtonSize = 'default' | 'small';

interface ICloseButton {
  onClick: Function;
  className?: string;
  size?: TButtonSize;
  tooltip?: string;
}

/**
 * Кнопка закрытия
 * @param onClick - Обработчик клика на кнопку закрытия
 * @param className - Дополнительный класс
 * @param buttonSize - Размер кнопки
 * @param tooltip - Текст всплывающей подсказки
 * @constructor
 */
export default function CloseButton({onClick, className = '', size, tooltip}: ICloseButton): ReactElement {
  return (
    <button
      className={`close-button ${className} ${size || 'default'}`}
      onClick={(event) => onClick(event)}
      title={tooltip || 'Закрыть'}
      type="button"
    >
    </button>
  );
}