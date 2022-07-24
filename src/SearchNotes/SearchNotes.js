import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const SearchNotes = (props) => {

  const [searchWords, setSearchWords] = useState("")

  const handelSaveSearchWords = (event) => {
    setSearchWords(event.target.value)
  }

  const handleSearchedNotes = () => {
    props.handelSearchNotesResults(searchWords)
  }

  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="notes or name"
          className="me-2"
          aria-label="Search"
          onChange={handelSaveSearchWords}
        />
        <Button variant="outline-success" onClick={handleSearchedNotes}>Search</Button>
      </Form>
    </div>
  )
}

export default SearchNotes;
