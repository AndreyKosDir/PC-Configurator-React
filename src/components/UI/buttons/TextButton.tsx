import './buttons.css';
import {MouseEventHandler, ReactElement} from "react";

interface IProps {
  caption: string;
  tooltip?: string;
  onlyText?: boolean;
  onClick?: MouseEventHandler;
  className?: string;
}

/**
 * Кнопка с текстом
 * @param caption - Текст внутри кнопки
 * @param tooltip - Текст всплывающей подсказки при наведении на кнопку
 * @param onlyText - Отображать только текст кнопки
 * @param onClick - Обработчик клика по кнопке
 * @param className - Дополнительный класс
 * @constructor
 */
export default function TextButton(
  {
    caption,
    tooltip = '',
    onlyText = false,
    onClick,
    className = ''
  }: IProps): ReactElement {
  return (
    <button
      title={tooltip}
      className={`text-button${onlyText ? '-raw' : ''} ${className}`}
      onClick={onClick}
    >
      {caption}
    </button>
  );
}