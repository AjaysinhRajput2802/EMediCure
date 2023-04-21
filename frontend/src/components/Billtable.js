import React from "react";
import { useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";

import Paginations from './Paginations';

let pagination_size = 5;

const Billtable = ({ currentBill }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(pagination_size);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = currentBill.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(currentBill.length / recordsPerPage)

  const HandleDelete = async (event, id) => {
    let res = window.confirm("Are You sure want to delete this Bill : " + id);
    if(res === true){
      const response = await fetch(
        `http://127.0.0.1:8000/api/bill/`+id,
        {
          method: "DELETE",
        }
      ).catch((e) => console.log(e));

      alert("Bill Id : " + id + " Deleted Successfully.")
      window.location.reload();
    }

  };

  return (
     <Container>
      <Row className="justify-content-center">
        <Col className="dynamic-form-headings">
          <h3>All Bill Details</h3>
        </Col>
      
        <Paginations
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
        />
        <br/>

        {currentRecords.map((bill, index1) => {
          const billItem = bill.BillItems;
          return (
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id={"heading" + bill.pk}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#collapse" + bill.pk}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <th scope="col">Bill Id : {bill.pk}</th>
                          <th scope="col">Customer Name : {bill.custName}</th>
                          <th scope="col">Bill Date : {bill.generatedDate}</th>
                          <th scope="col">Total Payable Amount : {bill.totalAmount}</th>
                          <th><Button className="float-end" variant="danger" onClick={(e)=>{HandleDelete(e, bill.pk)}}>Delete</Button></th>
                        </tr>
                      </tbody>
                    </table>
                  </button>
                </h2>
                <div
                  id={"collapse" + bill.pk}
                  className="accordion-collapse collapse hide"
                  aria-labelledby={"heading" + bill.pk}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Medicine Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price/Item</th>
                          <th scope="col">Total Price</th>
                        </tr>
                      </thead>
                      {billItem.map((item, index) => {
                        return (
                          <>
                            <tbody>
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.medName}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.price * item.quantity}</td>
                              </tr>
                            </tbody>
                          </>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </Row>
        
    </Container>
  );
};

export default Billtable;
