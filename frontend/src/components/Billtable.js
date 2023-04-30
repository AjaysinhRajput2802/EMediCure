import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Paginations from "./Paginations";
import Table from "react-bootstrap/Table";
import BillModal from "./BillModal";
import searchIcon from "../images/search-icon.svg";

let pagination_size = 5;

const Billtable = ({ currentBill, updateCurrentBill, shopId }) => {
  // USE STATES AND VARIABLE DEFINITION
  const [show, setShow] = useState({ show: false, data: [] });
  const [Clicked, setClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(pagination_size);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = currentBill.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(currentBill.length / recordsPerPage);

  // USE EFFECTS
  useEffect(() => {
    filterBills();
  }, [searchTerm]);

  // API CALLS
  const HandleDelete = async (event, id) => {
    let res = window.confirm("Are You sure want to delete this Bill : " + id);
    if (res === true) {
      const response = await fetch(`${process.env.API_URL}api/bill/` + id, {
        method: "DELETE",
      }).catch((e) => console.log(e));

      alert("Bill Id : " + id + " Deleted Successfully.");
      window.location.reload();
    }
  };

  const filterBills = async () => {
    console.log(shopId);

    const response = await fetch(
      `${process.env.API_URL}api/bill/?medShop=${shopId}&search=${searchTerm}`,
      {
        method: "GET",
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let data = await response.json();
      console.log(data);
      updateCurrentBill(data);
    } else {
      alert(response.statusText);
    }
  };

  // HELPER FUNCTIONS
  const handleClose = () => {
    setShow({ show: false, data: [] });
  };
  const handleShow = (show, data) => setShow({ show: show, data: data });

  return (
    <Container>
      <BillModal show={show} handleClose={handleClose} />
      <Row className="justify-content-center">
        <Col xs={2} className="dynamic-form-headings">
          <h3 style={{ color: "#5e9693"}}>All </h3>
          <h3 style={{ color: "#fff"}}>Bill Details</h3>
        </Col>
        <Col>
            <br />
          <Button
            onClick={() => {
              setClicked(!Clicked);
            }}
            style={{ display: "inline", float: "left", marginTop:"11px",backgroundColor:"#10454F",borderColor:"#10454F" }}
          >
          
            {Clicked ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i> }
          </Button>
        </Col>
        <Col>
          {Clicked ? (
            <div className="Content" style={{width:"45rem"}}>
              <img src={searchIcon} alt="search-icon" />
              <input
                type="text"
                placeholder="Search Bill by Customer Name"
                id="searchbar"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
          ) : (
            <></>
          )}
        </Col>
        

        {Clicked ? (
          <>
            <div className="container" style={{ padding: "10px" }}>
              <Table borderless striped hover variant="light">
                <thead className="table bg-secondary">
                  <tr>
                    <th scope="col">Bill Id</th>
                    <th scope="col">Customer Name </th>
                    <th scope="col">Bill Date </th>
                    <th scope="col">Total Payable Amount</th>
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((bill) => {
                    console.log(bill.BillItems);
                    return (
                      <tr key={bill.pk}>
                        <td>{bill.pk}</td>
                        <td> {bill.custName}</td>
                        <td>
                          {" "}
                          {bill.generatedDate.slice(0, 10)}{" "}
                          {bill.generatedDate.slice(11, 16)}{" "}
                        </td>
                        <td>{bill.totalAmount}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => handleShow(true, bill)}
                          >
                            view
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={(e) => {
                              HandleDelete(e, bill.pk);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <Paginations
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default Billtable;
