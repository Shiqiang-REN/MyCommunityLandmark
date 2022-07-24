import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddNotes = (props) => {

  const [note, setNote] = useState({username: "", note: ""})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelFormInputChange = (type) => (event) => {
    switch (type) {
      case 'username':
        setNote({...note, username: event.target.value})
        break
      case 'note':
        setNote({...note, note: event.target.value})
        break
      default:
        break
    }
  }

  const handleFormSubmit = () => {
    props.handleAddNotesToCurrentPosition(note)
    handleClose()
  }

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Add a Note +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Note to your current Position!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="input" placeholder="Enter your username" onChange={handelFormInputChange('username')}/>
          <Form.Control type="input" placeholder="Enter your note" onChange={handelFormInputChange('note')}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddNotes;
