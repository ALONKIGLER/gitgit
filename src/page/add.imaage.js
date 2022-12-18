import React, { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
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
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Spinner from "react-bootstrap/Spinner";
import "./css.css";
import Header from "../comp/header/header";

/**
 * @author
 * @function
 **/

export const Product = (props) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState([]);
  const [description, setDescription] = useState();
  const [description_page, setDescription_page] = useState("");
  const [URL, setURL] = useState([]);
  const [image, setImage] = useState({});
  const [spiner, setSpiner] = useState(100);
  const [select, setSelect] = useState("country");
  const [category, setCategory] = useState("");

  const [kit1, setkiki1] = useState("");
  const [kit2, setkiki2] = useState("");
  const [kit11, setkiki11] = useState("");
  const [kit22, setkiki22] = useState("");

  const collectionRefProduct = collection(
    database,
    `product/by_catagory/${select}`
  );

  // ============================================= image database ============================================

  const handelim = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `productImage/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",

      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
        setSpiner(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setURL([...URL, downloadURL]);
          console.log(URL);
          alert("התמונה הראשונה הועלתה בהצלחה");
        });
      }
    );
  };

  useEffect(() => {
    console.log(URL);
  }, [URL]);

  //=========================================== add data =====================================
  const handel = (e) => {
    e.preventDefault();

    // dispatch(addCategory(name));
    addDoc(collectionRefProduct, {
      //   _id: uniqid(),
      price: price,
      name: name,
      img: URL,
      description: description,
      description_page: description_page,
      kit1: kit1,
      kit2: kit2,
      kit22: kit22,
      kit11: kit11,
    })
      .then(() => {
        alert("data add");
        setURL([]);
      })
      .catch((err) => {
        alert("noo add");
      });

    // console.log(
    //   "kiki1",
    //   price,
    //   name,
    //   URL,
    //   description,
    //   description_page,
    //   kiki1,
    //   kiki2,
    //   kiki2,
    //   kiki1
    // );
  };

  const selectf = () => {
    console.log(select);
  };

  const handleChange = (event) => {
    console.log("Label 👉️", event.target.selectedOptions[0].label);
    console.log(event.target.value);
    setSelect(event.target.value);
  };

  const kit111 = (e) => {
    setkiki1("1");
    setkiki11(e);
  };
  const kit222 = (e) => {
    setkiki2("2");
    setkiki22(e);
  };

  return (
    <div className="main">
      <Header></Header>

      <h1>הוספת מוצר </h1>

      <Form onSubmit={handelim}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="file"
            placeholder="שם "
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="text-center">
          העלה תמונה
        </Button>
      </Form>

      {/* <p>{url}</p> */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Form onSubmit={handel}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="שם מוצר"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>בחירת קטגוריה</Form.Label>
          <Form.Select
            onClick={selectf}
            onChange={handleChange}
            aria-label="Default select example"
          >
            <option>Open this select menu</option>
            <option value="country">מדינות</option>
            <option value="door">שלטים לדלט</option>
            <option value="family_name">שמות משפחה</option>
            <option value="קבוצות כדורגל ">קבוצות כדורגל </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="מחיר"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="תיאור המוצר"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="תיאור מפורט של המוצר"
            value={description_page}
            onChange={(e) => setDescription_page(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="בחירת קטגוריה"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group> */}

        <Form.Label>במידה ויש צורך, הכיתוב הראשון</Form.Label>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            // placeholder="בחירת קטגוריה"
            onChange={(e) => setkiki11(e.target.value)}
          />
        </Form.Group>

        <Form.Label>במידה ויש צורך, הכיתוב השני</Form.Label>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            // placeholder="בחירת קטגוריה"
            onChange={(e) => setkiki22(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="text-center">
          הוסף
        </Button>
      </Form>
    </div>
  );
};
