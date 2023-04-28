import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import Paginations from "./Paginations";

let pagination_size = 5;

const Stocktable = ({ userData, shopId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(pagination_size);
  const [currentStock, setCurrentStock] = useState([]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = currentStock.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(currentStock.length / recordsPerPage);

  const FetchStock = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/stockItem/?medShop=${shopId}`,
      { method: "GET" }
    ).catch((e) => {
      console.log(e);
    });

    const data = await response.json();

    if (response.status >= 200 && response.status < 300) {
      setCurrentStock(data);
    } else {
      alert(response.statusText);
    }
  };

  useEffect(() => {
    FetchStock();
  }, [userData]);

  const [Clicked, setClicked] = useState(false);
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="dynamic-form-headings">
        <h3 style={{ color: "#5e9693" }}>Old </h3>
        <h3 style={{ color: "#fff" }}> Stock Details</h3>
          <Button
            onClick={() => {
              setClicked(!Clicked);
            }}
          >
            {Clicked ? <>Hide </> : <>Show </>}
            Data
          </Button>
        </Col>

        {Clicked ? (
          <div style={{padding:"10px"}}>
            {currentRecords.map((stockitem, index1) => {
              return (
                <div className="accordion accordion-flush" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2
                      className="accordion-header"
                      id={"flush-heading" + index1}
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#flush-collapse" + index1}
                        aria-expanded="false"
                        aria-controls={"flush-collapse" + index1}
                      >
                        <table className="table table-striped">
                          <tbody>
                            <tr>
                              <th scope="col">Id : {stockitem.id}</th>
                              <th scope="col">
                                Arrival Date :{" "}
                                {stockitem.arrivalDate.slice(0, 10)}
                              </th>
                              <th scope="col">
                                Medicine Name : {stockitem.medName}
                              </th>
                              <th scope="col">
                                Supplier Name : {stockitem.companyName}
                              </th>

                              <th>
                                <Button
                                  className="float-end"
                                  variant="danger"
                                  onClick={(e) => {
                                    alert("delete clicked");
                                    //   HandleDelete(e, bill.pk);
                                  }}
                                >
                                  Delete
                                </Button>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </button>
                    </h2>
                    <div
                      id={"flush-collapse" + index1}
                      className="accordion-collapse collapse hide"
                      aria-labelledby={"flush-heading" + index1}
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <table className="table table-striped">
                          <tbody>
                            <tr>
                              <th scope="col">Medicine Name</th>
                              <td><b>{stockitem.medName}</b></td>
                            </tr>
                            <tr>
                              <th scope="col">Medicine Price</th>
                              <td><b>{Number(stockitem.price).toLocaleString('us-US', { style: 'currency', currency: 'IND' })}</b></td>
                            </tr>
                            <tr>
                              <th scope="col">Medicine Expiry Date</th>
                              <td>{stockitem.expiryDate}</td>
                            </tr>
                            <tr>
                              <th scope="col">Ordered Quantity</th>
                              <td><b>{stockitem.orderedQuantity}</b></td>
                            </tr>
                            <tr>
                              <th scope="col">Stock Arrival Date</th>
                              <td>{stockitem.arrivalDate.slice(0, 10)}</td>
                            </tr>
                            <tr>
                              <th scope="col">Stock Arrival Time :</th>
                              <td>{stockitem.arrivalDate.slice(11, 19)}</td>
                            </tr>
                            <tr>
                              <th scope="col"> </th>
                              <td> </td>
                            </tr>
                            <tr>
                              <th scope="col">Total Stock Price</th>
                              <td><b>
                                {(stockitem.orderedQuantity * stockitem.price).toLocaleString('us-US', { style: 'currency', currency: 'IND' })}
                                </b>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="content" style={{padding:"10px"}}>
            <Paginations
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            </div>
          </div>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
};

export default Stocktable;
