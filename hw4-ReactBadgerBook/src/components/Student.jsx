const Student = (props) => {
    const interests = props.interests;
    var count = 1; // will be our key for each interest
    const fromWisco = props.fromWisconsin ? "are from Wisconsin":"are not from Wisconsin"
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p>They're in {props.numCredits} credits this semester</p>
        <p>They {fromWisco}</p>
        <p>They study {props.major} and have {interests.length} interest(s)</p>
        <ul>
            {props.interests.map(i => <li key={count++}>{i}</li>)}
        </ul>
        
    </div>
}

export default Student;