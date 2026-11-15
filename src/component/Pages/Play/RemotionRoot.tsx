import type { FC } from "react";
import { Composition } from "remotion";
import { playCompositions } from "./playCompositions";

export const RemotionRoot: FC = () => {
  return (
    <>
      {playCompositions.map((composition) => (
        <Composition key={composition.id} {...composition} />
      ))}
    </>
  );
};
