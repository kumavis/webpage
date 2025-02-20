import type { ComponentProcessProps } from "components/system/Apps/RenderComponent";
import StyledPeekViewport from "components/system/Taskbar/TaskbarEntry/Peek/StyledPeekViewport";
import RndWindow from "components/system/Window/RndWindow";
import useFocusable from "components/system/Window/useFocusable";
import useWindowTransitions from "components/system/Window/useWindowTransitions";
import { useProcesses } from "contexts/process";
import { useSession } from "contexts/session";
import { useCallback } from "react";
import StyledWindow from "./StyledWindow";
import Titlebar from "./Titlebar";

const Window: FC<ComponentProcessProps> = ({ children, id }) => {
  const {
    linkElement,
    processes: { [id]: process },
  } = useProcesses();
  const { Component, peekElement } = process || {};
  const { foregroundId } = useSession();
  const isForeground = id === foregroundId;
  const { zIndex, ...focusableProps } = useFocusable(id);
  const windowTransitions = useWindowTransitions(id);
  const linkViewportEntry = useCallback(
    (viewportEntry: HTMLDivElement) =>
      Component &&
      !peekElement &&
      viewportEntry &&
      linkElement(id, "peekElement", viewportEntry),
    [Component, id, linkElement, peekElement]
  );

  return (
    <RndWindow id={id} zIndex={zIndex}>
      <StyledWindow
        $isForeground={isForeground}
        {...focusableProps}
        {...windowTransitions}
      >
        <StyledPeekViewport ref={linkViewportEntry}>
          <Titlebar id={id} />
          {children}
        </StyledPeekViewport>
      </StyledWindow>
    </RndWindow>
  );
};

export default Window;
