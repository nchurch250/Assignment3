import React, { useEffect, useState, useCallback} from "react";


function App() {
  const [viewer, setViewer] = useState(0);
  const [products, setProducts] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: ''
    }
  });

  const setView = (view) => {
    setViewer(view)

    switch (view) {
      case 0:

        break;

      case 1:
        getAllProducts();
        break;

      case 2:

        break;

      case 3:

        break;
    }
  }


  function getAllProducts() {
    fetch("http://localhost:8081/read", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setProducts(data);
      });
  }













  function View1() {

    const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));

    });

    const handleSubmit = (e) => {
      e.preventDefault();

      fetch("http://localhost:8081/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
    };

    return (<div>
      <h1>Add Products</h1>

      <p>Complete the form to add a product</p>
      <form onSubmit={handleSubmit}>
        <p>ID: <input type="text" name="id" value={formData.id} onChange={handleChange} /></p>
        <p>Title: <input type="text" name="title" value={formData.title} onChange={handleChange} /></p>
        <p>Price: <input type="number" name="price" value={formData.price} onChange={handleChange} /></p>
        <p>Description: <input type="text" name="description" value={formData.description} onChange={handleChange} /></p>
        <p>Category: <input type="text" name="category" value={formData.category} onChange={handleChange} /></p>
        <p>Image: <input type="text" name="image" value={formData.image} onChange={handleChange} /></p>
        <p>Rating: <input type="number" name="rating.rate" value={formData.rating.rate} onChange={handleChange} /></p>
        <p>Review Count: <input type="number" name="rating.count" value={formData.rating.count} onChange={handleChange} /></p>
        <button type="submit">Add Product</button>
      </form>
    </div>);
  }







  function View2() {
      var cards = [];

      for (let i = 0; i < products.length; i++) {
        const product = products[i]
  
        cards.push(
          <div className="productCard" key={i}>
            <div id="products" className="card shadow-sm">
              <img src={product.image} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <p className="card-text"> {product.id} <strong>{product.title}</strong> ${product.price}</p>
                <p className="card-text">Rating: {product.rating.rate} out of {product.rating.count} reviews</p>
                <p className="card-text"> <strong>Category: {product.category}</strong></p>
                <p className="card-text">{product.description}</p>
                <small className="text-body-secondary"></small>
              </div>
            </div>
          </div>
        );
      }


    return (<div>
      <h1>View Products</h1>
      <div id="products">{cards}</div>
    </div>);
  }



















  function View3() {



    function getOneProduct(id) {


      fetch("http://localhost:8081/read/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then((data) => {
      console.log("Show one product :", id);
      console.log(data);
      setOneProduct(data);
      });
      }

      function updateOneProduct(id, price) {

        fetch("http://localhost:8081/update/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"price": price})
      })
        .then(response => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setOneProduct(data);
      });
    }

  const showOneItem = oneProduct.map((el) => (
      <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating.rate} <br />
      Rating Count: {el.rating.count} <br />
      </div>
      ));

      const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.price.value.length == 0) {
          getOneProduct(e.target.id.value);
        } else {
          updateOneProduct(e.target.id.value,e.target.price.value);
        }
      }

        return (<div>
      <h3>Show one Product by Id:</h3>
      <form onSubmit={handleSubmit}>
      <input
      type="number" name="id" placeholder="id" value={oneProduct.id} />
      <input
      type="number" name="price" placeholder="price" value={oneProduct.price} />
      <button type="submit">Submit</button>
      </form>
      {showOneItem}
      </div>);
    
  }



























  function View4() {
    function getOneProduct(id) {


      fetch("http://localhost:8081/read/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then((data) => {
      console.log("Show one product :", id);
      console.log(data);
      setOneProduct(data);
      });
      }

      function deleteOneProduct(id) {
        fetch("http://localhost:8081/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setOneProduct(data);
      });
    }

  const showOneItem = oneProduct.map((el) => (
      <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating.rate} <br />
      Rating Count: {el.rating.count} <br />
      </div>
      ));

      const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.confirmation.value.length == 0) {
          getOneProduct(e.target.id.value);
        } else {
          deleteOneProduct(e.target.id.value);
        }
      }

        return (<div>
      <h3>Show one Product by Id:</h3>
      <form onSubmit={handleSubmit}>
      <input
      type="number" name="id" placeholder="id" value={oneProduct.id} />
      <input
      type="text" name="confirmation" placeholder="Are you sure?" />
      <button type="submit">Submit</button>
      </form>
      {showOneItem}
      </div>);
  }

  function View5() {


    return (<div>
      <h1>Student Info</h1>
      <div>
        <h4>Nathan Church</h4>
        <p>nchurch@iastate.edu</p>
      </div>
      <div>
        <h4>Dalton Clark</h4>
        <p>dbclark@iastate.edu</p>
      </div>
      <div>
        <p>Course Number: COM S 319</p>
        <p>Course Name: Construction of User Interfaces</p>
        <p>Date: 4/26/2024</p>
        <p>Instructor: Abraham Aldaco</p>
      </div>
    </div>);
  }

  return (<div>
    <button onClick={() => setView(0)}>Add Products</button>
    <button onClick={() => setView(1)}>View Products</button>
    <button onClick={() => setView(2)}>Update Products</button>
    <button onClick={() => setView(3)}>Delete Products</button>
    <button onClick={() => setView(4)}>Authors</button>

    {viewer === 0 && <View1 />}
    {viewer === 1 && <View2 />}
    {viewer === 2 && <View3 />}
    {viewer === 3 && <View4 />}
    {viewer === 4 && <View5 />}
  </div>);
}

export default App;

