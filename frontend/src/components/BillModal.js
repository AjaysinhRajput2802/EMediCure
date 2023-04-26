import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { Fragment } from "react";
import Table from "react-bootstrap/Table";

function BillModal({ handleClose, show }) {
  const bill = show.data;
  return (
    <>
      <Modal
        show={show.show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <Table borderless>
              <thead>
                <tr>
                  <th scope="col">Bill Id: {bill.pk}</th>
                  <th scope="col">Customer Name : {bill.custName} </th>
                  <th scope="col">Bill Date:{(bill.generatedDate)} </th>
                </tr>
              </thead>
            </Table>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table borderless>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Medicine Name</th>
                <th scope="col">Quantity </th>
                <th scope="col">Price </th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bill.BillItems &&
                bill.BillItems.map((item, index) => {
                  return (
                    <Fragment key={index + 1}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.medName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{(item.price * item.quantity).toLocaleString('us-US', { style: 'currency', currency: 'IND' })}</td>
                      </tr>
                    </Fragment>
                  );
                })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <p>Total Payable Amount : <b>{Number(bill.totalAmount).toLocaleString('us-US', { style: 'currency', currency: 'IND' })}</b></p>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default BillModal;
