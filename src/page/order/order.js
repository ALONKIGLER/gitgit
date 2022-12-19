import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "react-bootstrap/Spinner";
import Header from "../../comp/header/header";
import Table from "react-bootstrap/Table";
import { database } from "../../firebaseConfig";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

/**
 * @author
 * @function
 **/

export const Order = (props) => {
  const [num, setNum] = useState("");
  const [pro, setpro] = useState();
  const collectionRef = collection(database, `order/user_order/1`);
  const [modalShow, setModalShow] = useState(false);

  const doFetch = async () => {
    const data = await getDocs(collectionRef);
    let popo = [];
    popo.push(
      data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      })
    );

    setNum(popo);

    console.log(data);
  };

  //   let popo = [];

  //   if (data.docs > 0) {
  //     popo.push(
  //       data.docs.map((item) => {
  //         return { ...item.data(), id: item.id };
  //       })
  //     );
  //   }

  //   useEffect(() => {
  //     popo.push(
  //       data.docs.map((item) => {
  //         return { ...item.data(), id: item.id };
  //       })
  //     );
  //   }, []);

  useEffect(() => {
    doFetch();
  }, []);

  const popso = () => {
    console.log(num[0]);
  };

  function MydModalWithGrid(props) {
    console.log(props);
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{pro}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={8}>
                .col-xs-12 .col-md-8
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const tete = (pic) => {
    // const pic2 = pic.map((we) => we.we);
    const po = "12";
    setpro(pic.id);
    console.log(pro);
    setModalShow(true);
  };

  return (
    <div className="main">
      <Header></Header>

      <h1>הוספת מוצר </h1>

      <button onClick={popso}></button>

      <Table striped bordered hover>
        {num
          ? num[0].map((nud) => {
              const blot = nud.dettale.price;
              const blot1 = nud.dettale.user_email;
              const blot2 = nud.dettale.user_name;
              const blot3 = nud.dettale.phon;
              return (
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{blot} </th>
                    <th>{blot1} </th>
                    <th>{blot2} </th>
                    <th>{blot3} </th>
                    <th>
                      {" "}
                      <div>
                        <Button
                          variant="secondary"
                          onClick={() => tete(nud)}
                          size="sm"
                        >
                          פרטי הזמנה
                        </Button>
                      </div>{" "}
                    </th>
                  </tr>
                </thead>
              );
            })
          : null}
      </Table>

      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};
