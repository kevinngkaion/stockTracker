import {useEffect, useState} from 'react';
import {useOutletContext} from 'react-router-dom';
import api from './api/axios'
import ListItem from './components/ListItem';

const List = () => {
  const [list, setList] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [apiFetch] = useOutletContext();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect (() => {
    const fetchData = async () => {
      const response = await apiFetch('grouplist')
      setList(response.data[0])
      setListItems(response.data[0].items);
    }
    fetchData();
  }, [])

  const apiPut = async(path, data) => {
    try{
      const response = await api.put(path, data);
      return response;
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if (isUpdated) {
      const data = {
        "name": list.name,
        "group": list.group,
        "items": list.items
      }
      console.log(data)
      apiPut(`/grouplist/${list._id}`, data)
    }
    setIsUpdated(false);
  }, [isUpdated])

  const handleCheck = (name) => {
    const items = listItems.map((item) => item.name === name ? {...item, is_purchased: !item.is_purchased} : item);

    const updatedList = {...list, items: items}
    setList(updatedList)
    setListItems(items)
    setIsUpdated(true)
  }

  return (
    <main className="List">
      <h2>{list.name}</h2>
      <ul className='"container'>
        {listItems.map((item, index) => (
          <ListItem item={item} index={index} handleCheck={handleCheck}/>
        ))}
      </ul>
    </main>
  )
}

export default List