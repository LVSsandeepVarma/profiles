import { useEffect, useState } from 'react'
import { Card, Button, Container, Col, Row } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';


export default function CardComponent() {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [formatedData, setFormatedData] = useState([])
    const [page, setPage] = useState(0)
    const [loadMoreData, setLoadMoreData] = useState(true)
    const [name, setName] = useState()
    const [userName, setUserName] = useState()
    const [errors, setErrors] = useState({});
    const newUser = [{
        "id": data.length + 1,
        "name": name,
        "username": userName,
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    }]
    // related to fetching users data
    
    const fetchDataAPI = async () => {
        const apiData = await fetch("https://jsonplaceholder.typicode.com/users/")
        const formated = await apiData.json()
        setFormatedData([...formated])
        setData([...data, ...formated.slice(page, page + 10)])
    }

    useEffect(() => {
        fetchDataAPI()
    }, [])

    const fetchData = () => {
        console.log(data)
        if (data.length < 5000) {
            setData([...data, ...formatedData.slice(page, page + 10)])
            console.log(data)
        }

        if (data.length >= 5000) {
            console.log("hello")
            setLoadMoreData(false)
            return
        }

    }

    // form related state updates and functions 
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleNameChange = (e) => {
        if (e.target.value !== "") {
            setErrors({ name: null })
        }
        setName(e.target.value)
    }
    const handleUserNameChange = (e) => {
        if (e.target.value !== "") {
            setErrors({ userName: null })
        }
        setUserName(e.target.value)
    }

    const handleSubmit = () => {
        if (name === "" || name === undefined) { setErrors({ name: "name field is mandatory" }) }
        else if (userName === "" || userName === undefined) { setErrors({ userName: "userName field is mandatory" }) }
        else if (name !== "" && userName !== "") {
            const newuserData = [...newUser]
            newuserData[0].name = name
            newuserData[0].username = userName
            setData([...newuserData, ...data])
            console.log(newuserData[0].name)
            setErrors({ name: null, userName: null })
            setShow(false)
            setName("")
            setUserName("")
            alert("added at top")
        }
    }

    return (
        <Container>
            <InfiniteScroll
                dataLength={data.length}
                next={fetchData}
                hasMore={loadMoreData}
                loader={
                    <div style={{height:"98vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center", overflow:'hidden'}} className="loader" key={0}>
                        Loading<Spinner style={{dispaly:"flex",justifyContent:"center"}} animation="border" variant="success" />
                    </div>
                    }
            >
                {/* card component containing data related to users */}
                <Row>
                    {data.map((val, key) => (
                        <Col key={key} md={4} style={{marginBottom:"5%", marginTop:"5%"}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={`https://avatars.dicebear.com/api/avataaars/${val.name}.svg`} />
                                <Card.Body>
                                    <Card.Title>{val?.name}</Card.Title>
                                    <Card.Text>
                                        {val?.username}
                                    </Card.Text>
                                    <Button onClick={handleShow} variant="primary">Add new user</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </InfiniteScroll>
            {/* modal for adding new user */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Form>
                            <Form.Group>
                                <Form.Label >Your Name</Form.Label>
                                <Form.Control isInvalid={!!errors.name} Feedback="Error" onChange={handleNameChange} placeholder='entre your name' id="name" required />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                <Form.Label >Your UserName</Form.Label>
                                <Form.Control isInvalid={!!errors.userName} Feedback="Error" onChange={handleUserNameChange} placeholder='entre your name' id="userName" required />
                                <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}