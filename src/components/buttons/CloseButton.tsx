import {ReactElement} from "react";

export default function CloseButton({onClick}: {onClick: Function}): ReactElement {
  return (
    <button onClick={() => onClick()}>
      Кнопка закрыть
    </button>
  );
}