import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import { useEffect, useState } from 'react'
import Student from "./Student";

const Classroom = () => {

    const [students, setStudents] = useState([]);
    const [shownStudents, setShownStudents] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [majorInput, setMajorInput] = useState('');
    const [interestInput, setInterestInput] = useState('');
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw4/students",{
            headers: {
                "X-CS571-ID" : CS571.getBadgerId()
            } 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setStudents(data); // best way to do this because we are alwasys overwriting students rather than updating it like the for loop approach
            setShownStudents(data);
        })
    }, [])
    
    function compName(stud){
		if (nameInput === ""){
			return true;
		}
		return (stud.name.first + " " + stud.name.last).toLowerCase().includes(nameInput.toLowerCase());
	}
	function compMajor(stud){
		if (majorInput === ""){
			return true;
		}
		return (stud.major.toLowerCase().includes(majorInput.toLowerCase()));
	}
	function compInterest(stud){
        if (interestInput === ""){
            return true;
        }
		return stud.interests.some((i) => (i.toLowerCase().includes(interestInput.toLowerCase())));
	}

    useEffect(() => {
        // trim the input, case insensitive, filter array
        var nameInputEdited = nameInput.trim().toLowerCase();
        var majorInputEdited = majorInput.trim().toLowerCase();
        var interestInputEdited = interestInput.trim().toLowerCase();
        console.log(nameInputEdited);
        console.log(majorInputEdited);
        console.log(interestInputEdited);
        setShownStudents(
            students.filter(compName).filter(compMajor).filter(compInterest)
        );
        setActivePage(1);
    }, [nameInput, interestInput, majorInput])

    const reset = () => {
        setNameInput("");
        setMajorInput("");
        setInterestInput("");
    }

    const buildPaginator = () => {
        let pages = [];
        const num_pages = Math.ceil(shownStudents.length / 24);
        for(let i = 1; i <= num_pages; i++) {
            pages.push(
                <Pagination.Item 
                    key={i}
                    active={activePage === i}
                    onClick={() => setActivePage(i)}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages;
    }

    const handlePrev = () => {
        if (activePage > 1){
            setActivePage(n => n-1);
        }
    };
    const handleNext = () => {
        if (activePage < numPages){
            setActivePage(n => n + 1)
        }
    }
    return <div>
        <h1>Badger Book - Fall 2023</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value = {nameInput} onChange={e => setNameInput(e.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value = {majorInput} onChange={e => setMajorInput(e.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value = {interestInput} onChange={e => setInterestInput(e.target.value)}/>
            <br />
            <Button variant="neutral" onClick={reset}>Reset Search</Button>
        </Form>
        <p>There are {shownStudents.length} student(s) matching your search</p>
        <Container fluid>
            <Row>
                { /* TODO Students go here! */ 
                    shownStudents.slice(24*(activePage-1), 24*activePage).map(
                        s => <Col key = {s.id} xs = {12} sm = {6} md = {4} lg = {3} xl = {2}>
                                <Student {...s}/>
                        </Col>)
                }
            </Row>
        </Container>
        <Pagination>
            <Pagination.Item
                key = {0}
                onClick={handlePrev}
                disabled = {activePage === 1}
            >
                Previous
            </Pagination.Item>
            {buildPaginator()}
            <Pagination.Item
                key = {Math.ceil(shownStudents.length / 24)+1}
                onClick = {handleNext}
                disabled = {activePage === Math.ceil(shownStudents.length / 24)}
            >
                Next
            </Pagination.Item>
        </Pagination>
    </div>

}

export default Classroom;