import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const [NewDescription, setNewDescription]= useState('');
  const [NewImage, setNewImage] = useState('');

  const addItem = (event) => {
    event.preventDefault();
    console.log('adding an item')

  axios({
    method: 'POST',
    url: '/api/shelf',
    data:{
     description: NewDescription,
     NewImage: NewImage
    }
  }). then ((response) => {
    console.log('post success:', response);
    fetchShelf();
    setNewDescription('');
    setNewImage('');
  }).catch((error) =>{
    console.log('post failed:', error);
  })
}

const deleteItem = (id) => {
  axios.delete(`/api/shelf/${id}`)
  .then((response) => {
  console.log('deleting item worked:', response)
  fetchShelf();
}).catch(function(error) {
  console.log(error)
})
}

  return (
    <div className="container">
      <h2>Add to shelf</h2>
      <form onSubmit={addItem}> 
        <label>Picture</label>
        <input onChange={(event) => setNewImage(event.target.value)} value={NewImage}/>

        <label>Description</label>
        <input onChange={(event) => setNewDescriptionha(event.target.value)} value={NewDescription}/>

        <button> Add </button>
      </form>
      
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div className="userName">added by: {item.username}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button onClick ={() => deleteItem(item.id)}  style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
