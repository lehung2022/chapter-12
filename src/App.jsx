import AddItem from "./components/AddItem";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import './index.css';
import { useEffect, useState } from 'react';



function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  useEffect(() => {
    localStorage.setItem('shoppinglist', JSON.stringify(items));
  }, [items])

  // The fault was fixed, by adding an empty array
  const addItem = (item) => {
    const id = items?.length ? items[items?.length - 1]?.id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  }
  // The fault is Uncaught TypeError: items is not iterable
  // The fault was fixed, by adding an empty array



  const handleCheck = (id) => {
    const listItems = items?.map((item) => item?.id === id ? { ...item, checked: !item.checked } : item);
    setAndSaveItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items?.filter((item) => item?.id !== id);
    setAndSaveItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <>
      <div className="App">
        <Header 
        />
        <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem
          search={search}
          setSearch={setSearch}
        />
        <Content
          items={items?.filter(item => ((item?.item)?.toLowerCase())?.includes(search?.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        <Footer
          length={items?.length}
        />
      </div>
    </>
  )
}

export default App
