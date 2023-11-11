import './buttons.css';
import {MouseEventHandler, ReactElement} from "react";

interface IProps {
  caption: string;
  tooltip?: string;
  onlyText?: boolean;
  onClick?: MouseEventHandler;
}

/**
 * Кнопка с текстом
 * @param caption - Текст внутри кнопки
 * @param tooltip - Текст всплывающей подсказки при наведении на кнопку
 * @param onlyText - Отображать только текст кнопки
 * @constructor
 */
export default function TextButton({caption, tooltip = '', onlyText = false, onClick}: IProps): ReactElement {
  return (
    <button
      title={tooltip}
      className={`text-button${onlyText ? '-raw' : ''}`}
      onClick={onClick}
    >
      {caption}
    </button>
  );
}