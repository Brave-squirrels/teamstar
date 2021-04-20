import React from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const content = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default content;
