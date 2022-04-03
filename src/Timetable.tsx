import React, {FC, useState} from "react";
import styled from 'styled-components';
import {DatePicker, IconButton, PrimaryButton, Spinner, TextField} from "office-ui-fabric-react";
import {ConnectionResult} from "./ConnectionResult";
import { getTimeFromDate, getConnections} from "./utils";
import {Connections} from "./Connections";

export const Timetable: FC = () => {
    const [connectionResult, setConnectionResult] = useState<ConnectionResult>();
    const [isLoading, setIsLoading] = useState(false);
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');

    const today = new Date()
    const [date, setDate] = useState(today);
    const [time, setTime] = useState(getTimeFromDate(today));

    return (
        <Host>
            <FirstRow>
                <TextField
                    placeholder="From"
                    value={fromLocation}
                    label="From"
                    onChange={(_, v) => setFromLocation(v!)}
                />
                <SwitchLocationsButton iconProps={{iconName: 'Switch'}} onClick={switchLocations}/>
                <TextField
                    placeholder="To"
                    value={toLocation}
                    label="To"
                    onChange={(_, v) => setToLocation(v!)}
                />
            </FirstRow>

            <SecondRow>
                <DateControls>
                    <Calendar
                        label="Date"
                        value={date}
                        onSelectDate={(newDate) => setDate(newDate!)}
                        minDate={today}
                        isMonthPickerVisible={false}
                    />
                    <TextField
                        placeholder="Time"
                        value={time}
                        label="Time"
                        onChange={(_, v) => setTime(v!)}
                    />
                </DateControls>

                <SearchButton
                    disabled={!fromLocation.trim() || !toLocation.trim()}
                    onClick={handleSearch}
                >
                    Search
                </SearchButton>
            </SecondRow>

            {isLoading && <Spinner/>}
            {!isLoading && connectionResult && <Connections result={connectionResult} date={date.toLocaleDateString()} time={time}/>}
        </Host>
    );

    function switchLocations() {
        const newFromLocation = toLocation;
        const newToLocation = fromLocation;

        setFromLocation(newFromLocation);
        setToLocation(newToLocation);
    }

    async function handleSearch() {
        setIsLoading(true)
        const result = await getConnections(fromLocation, toLocation, date.toDateString(), time);
        setConnectionResult(result);
        setIsLoading(false)
    }
}

const Host = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  margin: 50px;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(248,248,248);
  
  @media (max-width: 768px) {
    padding: 20px;
    margin: 0;
    box-shadow: unset;
  }
`;

const DateControls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const SwitchLocationsButton = styled(IconButton)`
  margin: auto 20px 0;
`;

const Calendar = styled(DatePicker)`
  margin-right: 20px;
    .ms-TextField-field {
      width: 175px;
    }
    
  @media (max-width: 768px) {
    .ms-TextField-field {
      width: 150px;
    }
  }
`;

const FirstRow = styled.div`
  display: flex;
  align-items: center;
`;

const SecondRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const SearchButton = styled(PrimaryButton)`
    margin-left: 20px;
    margin-top: auto;
`;