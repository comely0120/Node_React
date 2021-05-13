import {useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../Home.css';
import parse from 'html-react-parser';
import Axios from 'axios';

function Home() {
  const [toContent, setToContent] = useState({
    title: '',
    content: ''
  })
  // eslint-disable-next-line
  const [viewContent, setViewContent] = useState([]); 
  
  useEffect(()=>{
    Axios.get('http://localhost:8000/api/get').then((response)=>{
      setViewContent(response.data);
    })
  },[viewContent])


  const submitReview = ()=>{
    Axios.post('http://localhost:8000/api/insert', {
      title: toContent.title,
      content: toContent.title
    }).then(()=>{
      alert('등록 완료!');
    })
  };

  const getValue = e => {
    const { name, value } = e.target;
    setToContent({
      ...toContent,
      [name]: value
    })
  };

  return (
    <div className="Home">
      <h1>TOGTHER's WORK!</h1>
      <div className='Home-container'>
        {viewContent.map(element =>
          <div>
            <h2>{element.title}</h2>
            <div>
              {parse(element.content)}
            </div>
          </div>
        )}
      
      </div>
      <div className='form-wrapper'>
        <input className="title-input"
          type='text' 
          placeholder='제목'
          onChange={getValue}
          name='title'
         />
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello!</p>"
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setToContent({
              ...toContent,
              content: data
            })
          }}
          
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
      <button 
      onClick= {submitReview}
      >입력</button>
    </div>
  );
}

export default Home;