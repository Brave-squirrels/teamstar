import React from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const main = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default main;
