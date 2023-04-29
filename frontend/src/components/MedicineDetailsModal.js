import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { Fragment } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, ModalHeader } from "react-bootstrap";

function MedicineDetailsModal({ handleDetailsClose, detailsShow }) {
  const medicine = detailsShow.data;
  console.log(medicine);
  return (
    <>
      <Modal
        show={detailsShow.show}
        onHide={handleDetailsClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       <Modal.Header closeButton><Modal.Title>Medicine Details</Modal.Title></Modal.Header>
        <Modal.Body>
          <div className="row p-1 m-1 align-items-center bg-light">
            <div className="col text-center">
              <img
                style={{
                  width: "240px",
                  height: "250px",
                  "object-fit": "contain",
                }}
                src={medicine.medImage}
                alt="medicinePhoto"
                className="img-responsive"
              />
            </div>
            <div className="col text-center">
              <p className="m-4">
                {medicine.medName} | {medicine.medType}
              </p>
              <p className="m-4"> Price : &#8377; {medicine.medPrice}</p>
              <p className="m-4">Supplier : {medicine.medCompany}</p>
              <p className="m-4"> Stock :{medicine.currentQuantity}</p>
            </div>
          </div>
          <div className="row p-1 m-1 align-items-center bg-light">
            <div className="text-center">Description</div>
            <hr />
            <div>{medicine.medDes}</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default MedicineDetailsModal;
