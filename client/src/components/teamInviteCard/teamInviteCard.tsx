import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  teamName: string;
}

const teamInviteCard = (props: Props) => {
  return (
    <div>
      {props.teamName}
      <Button variant="danger" onClick={() => console.log("canceled")}>
        Cancel
      </Button>
      <Button onClick={() => console.log("Accepted")}>Accept</Button>
    </div>
  );
};

export default teamInviteCard;
