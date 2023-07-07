import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import homeImage from "./home-image.jpg";

const AppContext = createContext();

// Custom hook to access the context
const useAppContext = () => useContext(AppContext);

// API endpoint for fetching data
const API_ENDPOINT = "https://api.example.com/data";

// Components

const TodoList = () => {
  const { tasks, completedTasks, addTask, completeTask, removeTask } =
    useAppContext();
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div className="todo-list-container">
      <h2>To-Do List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="todo-input"
        />
        <button type="submit" className="add-task-button">
          Add Task
        </button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span className="task-title">{task.title}</span>
            <button onClick={() => completeTask(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total tasks: {tasks.length}</p>
      <p>Completed tasks: {completedTasks.length}</p>
    </div>
  );
};

const ShoppingCart = () => {
  const { cartItems, removeItem } = useAppContext();

  const calculateSubtotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    return subtotal.toFixed(2);
  };

  const itemCount = cartItems.length;

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <p>Items: {itemCount}</p>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div className="product-info">
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
            </div>
            <span>${item.price.toFixed(2)}</span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="subtotal">
        <span>Subtotal:</span>
        <span>${calculateSubtotal()}</span>
      </div>
    </div>
  );
};

const OnlineShoppingStore = () => {
  const { addItem } = useAppContext();
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZHVjdCUyMGluJTIwc2hvcHBpbmclMjBjYXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdCUyMGluJTIwc2hvcHBpbmclMjBjYXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      image:
        "https://plus.unsplash.com/premium_photo-1683288401601-0d6066aaef51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2R1Y3QlMjBpbiUyMHNob3BwaW5nJTIwY2FydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    },
    // Add more products as needed
  ];

  return (
    <div className="shopping-store-container">
      <h2>Online Shopping Store</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addItem(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const APIIntegration = () => {
  const { data, loading, error, setLoading, setData, setError } =
    useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>API Integration</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to the React Todo Cart App!</h2>
      <div className="home-content">
        <p className="home-description">
          We are a team of dedicated developers who have created this app to
          help you stay organized and manage your tasks and shopping needs
          efficiently. With our intuitive interface and powerful features, you
          can easily manage your to-do list, keep track of completed tasks, and
          have a seamless shopping experience. Our goal is to simplify your life
          and enhance your productivity with the React Todo Cart App.
        </p>
        <img src={homeImage} alt="Company Logo" className="home-image" />
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About</h2>
      <p className="about-description">
        Welcome to the React Todo Cart App! This application is designed to help
        you manage your tasks and shopping list in an organized way. With the
        Todo List feature, you can create and manage your daily tasks, mark them
        as completed, and stay on top of your priorities. The Shopping Cart
        feature allows you to add items to your cart, keep track of the products
        you want to purchase, and easily manage your shopping experience. Our
        app aims to simplify your life by bringing together your to-do list and
        shopping needs in one place.
      </p>
      <p className="about-description">
        Whether you need to stay organized or make sure you don't forget any
        items while shopping, the React Todo Cart App has got you covered. With
        a user-friendly interface and intuitive design, managing your tasks and
        shopping list has never been easier. Experience the convenience and
        efficiency of our app and start organizing your life today!
      </p>
    </div>
  );
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
  };

  return (
    <div className="contact-container">
      <h2>Contact</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="contact-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="contact-input"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="contact-textarea"
        />
        <button type="submit" className="contact-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};
const calculateSubtotal = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const completeTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const addItem = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        completedTasks,
        addTask,
        completeTask,
        removeTask,
        cartItems,
        addItem,
        removeItem,
        data,
        loading,
        error,
        setLoading,
        setData,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const App = () => {
  return (
    <Router>
      <AppProvider>
        <div className="app-container">
          <nav className="navbar">
            <ul className="navbar-list">
              <li className="navbar-item">
                <Link to="/" className="navbar-link">
                  Home
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/about" className="navbar-link">
                  About
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/contact" className="navbar-link">
                  Contact
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/todo-list" className="navbar-link">
                  Todo List
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/shop" className="navbar-link">
                  Shopping
                </Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/todo-list">
              <TodoList />
            </Route>
            <Route path="/shop">
              <OnlineShoppingStore />
              <ShoppingCart />
            </Route>
          </Switch>
        </div>
      </AppProvider>
    </Router>
  );
};

export default App;
