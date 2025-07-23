import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function App() {
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    content: '',
    public: false
  });

  function handleFormData(e) {
    const key = e.target.name
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value

    setFormData({
      ...formData,
      [key]: val
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const url = "https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts";

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    };

    fetch(url, options)
      .then(response => {
        if (response.status === 201) {
          alert("Post salvato con successo.")
        }
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  return (
    <div className='container'>
      <div className="card bg-light my-4 p-4">
        <form onSubmit={handleSubmit}>
          <h1>Create post</h1>

          {/* Author input */}
          <div className='mb-3'>
            <label htmlFor="author" className="form-label">Author</label>
            <input type="text" className="form-control" id="author" value={formData.author} onChange={handleFormData} name='author'></input>
          </div>

          {/* Post title */}
          <div className='mb-3'>
            <label htmlFor="title" className="form-label">Post title</label>
            <input type="text" className="form-control" id="title" value={formData.title} onChange={handleFormData} name='title'></input>
          </div>

          {/* Post content */}
          <div className='mb-3'>
            <label htmlFor="content" className="form-label">Post content</label>
            <textarea className="form-control" name='content' id='content' value={formData.content} onChange={handleFormData} rows={3}></textarea>
          </div>

          {/* Public checkbox */}
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" name='public' value={formData.public} onChange={handleFormData} id="public" />
            <label className="form-check-label" htmlFor="public">
              Public (make this post visible to everybody)
            </label>
          </div>

          {/* Form submit button */}
          <button type='submit' className='btn btn-primary'>Save</button>

        </form>
      </div>
    </div>
  )
}

export default App
