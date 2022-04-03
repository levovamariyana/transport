import {FC, useState} from "react";
import styled from "styled-components";
import {Connection} from "./ConnectionResult";
import {getTimeFromDate} from "./utils";
import {ActionButton} from "office-ui-fabric-react";

export const ConnectionOption: FC<{ connection: Connection; }> = ({connection}) => {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <Option onClick={() => setShowDetail(!showDetail)}>
                <Detail>
                    <div>Depart</div>
                    <div>{getTimeFromDate(new Date(connection.from.departure))}</div>
                </Detail>
                <Detail>
                    <div>Arrive</div>
                    <div>{getTimeFromDate(new Date(connection.to.arrival))}</div>
                </Detail>
                <Detail>
                    <div>Duration</div>
                    <div>{connection.duration.slice(3, 8)}</div>
                </Detail>
                <Detail>
                    <div>Stops</div>
                    <div>{connection.sections.length - 1}</div>
                </Detail>
                <Detail>
                    <div>Services</div>
                    <Services>{connection.products.map(p => <span>{p}</span>)}</Services>
                </Detail>
            </Option>

            {showDetail && (
                <>
                    {connection.sections.map(s => (
                        <Section>
                            <Detail>
                                <div>
                                    <div>From</div>
                                    {s.departure.station.name}
                                </div>
                            </Detail>
                            <Detail>
                                <div>
                                    <div>Depart</div>
                                    {getTimeFromDate(new Date(s.departure.departure))}
                                </div>
                            </Detail>
                            <Detail>
                                <div>
                                    <div>To</div>
                                    {s.arrival.station.name}
                                </div>
                            </Detail>
                            <Detail>
                                <div>
                                    <div>Arrive</div>
                                    {getTimeFromDate(new Date(s.arrival.arrival))}
                                </div>
                            </Detail>
                            <Detail>
                                <div>
                                    <div>Service</div>
                                    {s.journey.category}
                                </div>
                            </Detail>
                        </Section>
                    ))}
                </>
            )}
        </>
    )
}

const Option = styled(ActionButton)`
  padding: 20px;
  margin: 20px 10px;
  width: 90%;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  background: white;
    
  span {
    justify-content: space-around;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-around; 
  border-bottom: 1px solid black;
  padding-bottom: 5px;
`;

const Services = styled.div`
  span {
    :not(:last-child) {
      &::after {
        content: ',';
        display: inline-block;
        padding-right: 5px;
      }
    }
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  min-width: 80px;
`