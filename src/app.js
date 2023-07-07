import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

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
              <span>${item.price.toFixed(2)}</span>
            </div>
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
      image: "https://example.com/product1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      image: "https://example.com/product2.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      image: "https://example.com/product3.jpg",
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

const Home = () => (
  <div className="home-container">
    <h2>Welcome to the React App!</h2>
    <p>This is a simple to-do list and shopping cart application.</p>
  </div>
);

const About = () => (
  <div className="about-container">
    <h2>About</h2>
    <p>Information about the company, team, or project goes here.</p>
  </div>
);

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
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/todo-list">Todo List</Link>
              </li>
              <li>
                <Link to="/shop">Shopping</Link>
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

          {/* <APIIntegration /> */}
        </div>
      </AppProvider>
    </Router>
  );
};

export default App;
