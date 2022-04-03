import {FC} from "react";
import styled from "styled-components";
import {ConnectionResult} from "./ConnectionResult";
import {ConnectionOption} from "./ConnectionOption";

export const Connections: FC<{ result: ConnectionResult, date: string, time: string }> = ({result, date, time}) => {
    if (result.connections.length === 0) {
        return (<Host>No connections available</Host>)
    }

    return (
        <Host>
            <div>{`${result.from.name} to ${result.to.name} on ${date} departing at ${time}`}</div>
            {result.connections.map(c => (
                <ConnectionOption connection={c}/>
            ))}
        </Host>
    )
}

const Host = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgb(50, 49, 48);
  font-family: Roboto;
  overflow-y: auto;
  width: 100%
`;